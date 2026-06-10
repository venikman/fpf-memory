import { createHash } from 'node:crypto';
import {
  access,
  constants as fsConstants,
  copyFile,
  mkdir,
  readFile,
  stat,
  writeFile,
} from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { computeCompilerFingerprint } from '../build/compiler-fingerprint.js';
import {
  ARTIFACT_FILENAMES,
  DEFAULT_ARTIFACT_DIR,
  DEFAULT_SOURCE_PATH,
  SESSION_CACHE_FILENAME,
} from './constants.js';
import { compileFpfSource } from './compiler.js';
import { buildIndexingView, classifyChange } from './indexing-view.js';
import { QueryEngine } from './query-engine.js';
import { resolveRuntimePath } from './path-resolution.js';
import {
  SessionCache,
  type RetrievalSessionState,
} from './session-cache.js';
import {
  collapseWhitespace,
  findTokenPosition,
} from './text-scan.js';
import type {
  AnswerMode,
  BrowseCatalogResult,
  BuildAudit,
  CatalogEntry,
  ExpandCitationsResult,
  IndexingView,
  InspectAnchorResult,
  InspectResult,
  NodeKind,
  QueryResult,
  ReadDocResult,
  RuntimeStatus,
  SearchHit,
  SearchResult,
  Snapshot,
  TraceResult,
} from './types.js';
import { normalizeForLookup, tokenize, scoreOverlap, unique } from './text.js';

export interface FpfRuntimeOptions {
  sourcePath?: string;
  artifactDir?: string;
  artifactSeedDir?: string;
  maxSessions?: number;
  persistSessionCache?: boolean;
  /**
   * Pre-computed compiler fingerprint to use instead of attempting to derive
   * one from on-disk source files. Required in bundled environments (e.g. the
   * Vercel function) where the compiler source is not on disk and the default
   * `computeCompilerFingerprint()` path would otherwise fail silently.
   */
  compilerFingerprint?: string;
}

/**
 * Cheap identity for "has this file changed?" checks. (mtime, size) alone
 * can collide when a file is replaced by `cp -p` (preserves mtime) with
 * different bytes of the same length; ctime cannot be forged from userland
 * and the inode changes on rename-replace, so including both closes those
 * holes without reading file bytes.
 */
interface SourceFingerprint {
  mtimeMs: number;
  ctimeMs: number;
  size: number;
  inode: number;
}

export class FpfRuntime {
  private readonly sourcePath: string;
  private readonly artifactDir: string;
  private readonly artifactPaths: Record<keyof typeof ARTIFACT_FILENAMES, string>;
  private readonly artifactSeedPaths?: Record<keyof typeof ARTIFACT_FILENAMES, string>;
  private readonly sessionCache: SessionCache;
  private readonly configuredCompilerFingerprint?: string;
  private snapshotIntegrityVerified = false;
  private cachedSnapshot?: Snapshot;
  private cachedAudit?: BuildAudit;
  private cachedSourceFingerprint?: SourceFingerprint;
  private cachedSourceHash?: { fingerprint: SourceFingerprint; hash: string };
  private compilerFingerprintPromise?: Promise<string | undefined>;
  private sessionCacheLoadedForHash?: string;

  constructor(options: FpfRuntimeOptions = {}) {
    const sourcePath = options.sourcePath ?? DEFAULT_SOURCE_PATH;
    const sourceResolution = resolveRuntimePath(sourcePath, {
      kind: 'file',
    });
    const artifactDir = options.artifactDir ?? DEFAULT_ARTIFACT_DIR;
    const artifactResolution = resolveRuntimePath(
      resolve(sourceResolution.root, artifactDir),
      {
        kind: 'directory',
      },
    );

    this.sourcePath = sourceResolution.path;
    this.artifactDir = artifactResolution.path;
    this.artifactPaths = Object.fromEntries(
      Object.entries(ARTIFACT_FILENAMES).map(([key, filename]) => [
        key,
        resolve(this.artifactDir, filename),
      ]),
    ) as Record<keyof typeof ARTIFACT_FILENAMES, string>;
    const artifactSeedDir = options.artifactSeedDir?.trim();
    if (artifactSeedDir) {
      const seedResolution = resolveRuntimePath(resolve(sourceResolution.root, artifactSeedDir), {
        kind: 'directory',
      });
      if (seedResolution.existed && seedResolution.path !== this.artifactDir) {
        this.artifactSeedPaths = Object.fromEntries(
          Object.entries(ARTIFACT_FILENAMES).map(([key, filename]) => [
            key,
            resolve(seedResolution.path, filename),
          ]),
        ) as Record<keyof typeof ARTIFACT_FILENAMES, string>;
      }
    }
    this.configuredCompilerFingerprint = options.compilerFingerprint;
    const persistSession = options.persistSessionCache ?? false;
    this.sessionCache = new SessionCache({
      maxSessions: options.maxSessions ?? 50,
      persistPath: persistSession
        ? resolve(this.artifactDir, SESSION_CACHE_FILENAME)
        : undefined,
    });
  }

  async refresh(
    force = false,
    options: boolean | { compilerFingerprint?: string; allowMemoryCache?: boolean } = {},
  ): Promise<BuildAudit> {
    const allowMemoryCache =
      typeof options === 'boolean' ? options : options.allowMemoryCache ?? false;
    await mkdir(this.artifactDir, { recursive: true });
    await this.seedArtifactsFromReadOnlyBundle();
    const sourceFingerprint = await fingerprintFile(this.sourcePath);
    if (
      allowMemoryCache &&
      !force &&
      this.cachedSnapshot &&
      this.cachedAudit &&
      this.cachedSourceFingerprint &&
      sourceFingerprintEquals(sourceFingerprint, this.cachedSourceFingerprint) &&
      !snapshotNeedsRebuild(this.cachedSnapshot)
    ) {
      await this.loadSessionCacheOnce(this.cachedSnapshot.sourceHash);
      return this.cachedAudit;
    }

    const currentSourceHash = await hashFile(this.sourcePath);
    const currentCompilerFingerprint =
      typeof options === 'object' && Object.hasOwn(options, 'compilerFingerprint')
        ? options.compilerFingerprint
        : await this.readCurrentCompilerFingerprint();
    await this.loadSessionCacheOnce(currentSourceHash);
    const existingSnapshot = await this.loadSnapshot();
    const staleSnapshotShape = existingSnapshot
      ? snapshotShapeNeedsRebuild(existingSnapshot)
      : false;
    const staleCompilerFingerprint = existingSnapshot
      ? snapshotCompilerFingerprintChanged(existingSnapshot, currentCompilerFingerprint)
      : false;
    const compatibleSnapshot = existingSnapshot && !staleSnapshotShape && !staleCompilerFingerprint;

    if (!force && compatibleSnapshot && existingSnapshot.sourceHash === currentSourceHash) {
      const audit: BuildAudit = {
        sourcePath: this.sourcePath,
        sourceHash: currentSourceHash,
        previousSourceHash: existingSnapshot.sourceHash,
        builtAt: existingSnapshot.builtAt,
        rebuilt: false,
        reason: 'snapshot_current',
        validation: existingSnapshot.validation,
        compiler: buildCompilerSummary(existingSnapshot),
        artifacts: this.artifactPaths,
      };
      const existingView = await this.loadIndexingView();
      if (!existingView) {
        await this.writeJson(this.artifactPaths.indexingView, buildIndexingView(existingSnapshot));
      }
      await this.writeArtifacts(existingSnapshot, true);
      await this.writeAudit(audit);
      this.rememberSnapshot(existingSnapshot, audit, sourceFingerprint);
      return audit;
    }

    const previousIndexingView = await this.loadIndexingView()
      ?? (existingSnapshot ? buildIndexingView(existingSnapshot) : undefined);
    const sourceText = await readFile(this.sourcePath, 'utf8');
    const builtAt = new Date().toISOString();
    const { snapshot } = compileFpfSource({
      sourcePath: this.sourcePath,
      sourceHash: currentSourceHash,
      compilerFingerprint: currentCompilerFingerprint,
      builtAt,
      sourceText,
    });

    const currentIndexingView = buildIndexingView(snapshot);
    const refreshClassification = previousIndexingView
      ? classifyChange(previousIndexingView, currentIndexingView)
      : undefined;

    await this.writeArtifacts(snapshot);
    await this.writeJson(this.artifactPaths.indexingView, currentIndexingView);

    const audit: BuildAudit = {
      sourcePath: this.sourcePath,
      sourceHash: currentSourceHash,
      previousSourceHash: existingSnapshot?.sourceHash,
      builtAt,
      rebuilt: true,
      reason: refreshReasonForRebuild({
        force,
        existingSnapshot,
        staleSnapshotShape,
        staleCompilerFingerprint,
        currentSourceHash,
      }),
      validation: snapshot.validation,
      refreshClassification,
      compiler: buildCompilerSummary(snapshot),
      artifacts: this.artifactPaths,
    };
    await this.writeAudit(audit);
    this.rememberSnapshot(snapshot, audit, sourceFingerprint);
    return audit;
  }

  async query(
    question: string,
    mode: AnswerMode = 'compact',
    forceRefresh = false,
    sessionId?: string,
  ): Promise<QueryResult> {
    const engine = await this.createEngine(forceRefresh, sessionId);
    const trace = engine.trace(question, mode);
    const result = await engine.answerFromTrace(question, mode, trace);
    this.persistSession(sessionId, trace);
    return result;
  }

  async trace(
    question: string,
    mode: AnswerMode = 'compact',
    forceRefresh = false,
    sessionId?: string,
  ): Promise<TraceResult> {
    const trace = (await this.createEngine(forceRefresh, sessionId)).trace(question, mode);
    this.persistSession(sessionId, trace);
    return trace;
  }

  async inspect(
    selector: string,
    kind: 'auto' | 'id' | 'route' | 'lexeme' = 'auto',
    forceRefresh = false,
  ): Promise<InspectResult> {
    return (await this.createEngine(forceRefresh)).inspect(selector, kind);
  }

  async readDoc(
    selector: string,
    kind: 'auto' | 'id' | 'route' | 'lexeme' = 'auto',
    options: { mode?: 'preview' | 'full'; maxChars?: number; forceRefresh?: boolean } = {},
  ): Promise<ReadDocResult> {
    const engine = await this.createEngine(options.forceRefresh ?? false);
    return engine.readDoc(selector, kind, {
      mode: options.mode,
      maxChars: options.maxChars,
    });
  }

  async inspectAnchor(anchorId: string, forceRefresh = false): Promise<InspectAnchorResult> {
    return (await this.createEngine(forceRefresh)).inspectAnchor(anchorId);
  }

  async expandCitations(
    citationIds: string[],
    forceRefresh = false,
  ): Promise<ExpandCitationsResult> {
    return (await this.createEngine(forceRefresh)).expandCitations(citationIds);
  }

  async status(): Promise<RuntimeStatus> {
    const currentCompilerFingerprint = await this.readCurrentCompilerFingerprint();
    const currentSourceHash = await this.hashSourceFile();
    // status() is the documented preflight call, so warm calls must not pay
    // for re-reading the multi-MB artifact set: serve from the in-memory
    // snapshot whenever it is still serviceable AND still matches the
    // on-disk source. On a source-hash mismatch fall through to disk —
    // another process (parallel agent session, spec refresh) may have
    // rebuilt the artifact set since this snapshot was cached.
    let existingSnapshot =
      this.cachedSnapshot &&
      !snapshotNeedsRebuild(this.cachedSnapshot, currentCompilerFingerprint) &&
      this.cachedSnapshot.sourceHash === currentSourceHash
        ? this.cachedSnapshot
        : await this.loadSnapshot();
    if (!existingSnapshot || snapshotNeedsRebuild(existingSnapshot, currentCompilerFingerprint)) {
      await this.refresh(false, { compilerFingerprint: currentCompilerFingerprint }).catch(
        (error) => {
          const message = error instanceof Error ? error.message : String(error);
          console.warn(`[FpfRuntime.status] refresh(false) failed: ${message}`);
        },
      );
      existingSnapshot = this.cachedSnapshot ?? (await this.loadSnapshot());
    }

    if (
      existingSnapshot &&
      existingSnapshot !== this.cachedSnapshot &&
      !snapshotNeedsRebuild(existingSnapshot, currentCompilerFingerprint)
    ) {
      this.cachedSnapshot = existingSnapshot;
    }
    return {
      sourcePath: this.sourcePath,
      sourceHash: existingSnapshot?.sourceHash,
      builtAt: existingSnapshot?.builtAt,
      snapshotExists: Boolean(existingSnapshot),
      currentSourceHash,
      fresh:
        existingSnapshot != null &&
        !snapshotNeedsRebuild(existingSnapshot, currentCompilerFingerprint) &&
        existingSnapshot.sourceHash === currentSourceHash,
      compilerMode: 'local_vectorless',
      artifacts: await this.getArtifactPresence(),
      sessionCache: this.sessionCache.summary(),
    };
  }

  async browse(
    options: {
      part?: string;
      status?: string;
      kind?: NodeKind;
      limit?: number;
      offset?: number;
      forceRefresh?: boolean;
    } = {},
  ): Promise<BrowseCatalogResult> {
    // allowMemoryCache, like createEngine(): the memo path still re-stats
    // the source per call, so freshness on spec edits is preserved without
    // re-reading the multi-MB artifact set on every catalog page.
    await this.refresh(options.forceRefresh ?? false, true);
    const snapshot = await this.requireSnapshot();

    const partFilter = resolvePartFilter(options.part, snapshot);
    const partLower = partFilter.value?.toLowerCase();
    const statusLower = options.status?.toLowerCase();
    const limit = Math.min(options.limit ?? DEFAULT_BROWSE_LIMIT, 500);
    const offset = Math.max(options.offset ?? 0, 0);

    const entries = Object.values(snapshot.compiledNodes)
      .filter((node) => {
        if (options.kind && node.kind !== options.kind) return false;
        if (partLower && node.part?.toLowerCase() !== partLower) return false;
        if (statusLower && node.status?.toLowerCase() !== statusLower) return false;
        return true;
      })
      .map((node) => nodeToCatalogEntry(node, snapshot));

    entries.sort((a, b) => a.id.localeCompare(b.id));

    // Canonical paging order. When no kind filter is active, interleave
    // kinds so every page shows a representative mix of patterns, routes,
    // and lexemes instead of burying routes/lexemes thousands of entries
    // deep. The ordering is independent of limit/offset, so consecutive
    // pages tile the catalog without duplicates or gaps.
    const ordered = options.kind ? entries : interleaveBrowseEntries(entries);
    const page = ordered.slice(offset, offset + limit);
    // Present each page sorted by ID; paging position is carried by offset.
    page.sort((a, b) => a.id.localeCompare(b.id));
    const nextOffset = offset + page.length < entries.length
      ? offset + page.length
      : undefined;

    const didYouMean =
      entries.length === 0 && partFilter.suggestion
        ? { part: partFilter.suggestion }
        : undefined;

    return {
      entries: page,
      total: entries.length,
      offset,
      ...(nextOffset !== undefined ? { nextOffset } : {}),
      filters: {
        part: partFilter.value ?? options.part,
        status: options.status,
        kind: options.kind,
      },
      ...(didYouMean ? { didYouMean } : {}),
      snapshot: { sourceHash: snapshot.sourceHash, builtAt: snapshot.builtAt },
    };
  }

  async search(
    query: string,
    options: { kind?: NodeKind; limit?: number; forceRefresh?: boolean } = {},
  ): Promise<SearchResult> {
    await this.refresh(options.forceRefresh ?? false, true);
    const snapshot = await this.requireSnapshot();

    // Tokenize the raw query first so camelCase splits (e.g. BoundedContext →
    // bounded + context) are preserved; tokenize() handles lowercasing internally.
    // Cap the token count so a pathological query can't drive scoreOverlap into
    // O(tokens × nodes × textLen) on the public unauthenticated endpoint.
    const queryTokens = tokenize(query).slice(0, SEARCH_MAX_QUERY_TOKENS);
    const limit = Math.min(options.limit ?? 20, 100);

    const hits: SearchHit[] = [];
    for (const node of Object.values(snapshot.compiledNodes)) {
      if (options.kind && node.kind !== options.kind) {
        continue;
      }

      const rawScore =
        scoreOverlap(queryTokens, node.searchableText)
        + scoreOverlap(queryTokens, node.title) * SEARCH_TITLE_TOKEN_WEIGHT;
      if (rawScore <= 0) {
        continue;
      }
      const score =
        node.kind === 'lexeme' && options.kind !== 'lexeme'
          ? rawScore * SEARCH_LEXEME_DEFAULT_PENALTY
          : rawScore;

      // Lexeme hits expose the linked pattern/route IDs so a reader
      // who lands on a vocabulary entry can jump to the actionable
      // page. Pattern/route hits don't need this — the hit ID is
      // already the actionable target.
      const linkedNodeIds =
        node.kind === 'lexeme'
          ? (node.details as { linkedNodeIds?: string[] }).linkedNodeIds
          : undefined;

      hits.push({
        id: node.id,
        kind: node.kind,
        title: node.title,
        status: node.status,
        part: node.part,
        score,
        snippet: extractSnippet(node.searchableText, queryTokens),
        ...(linkedNodeIds && linkedNodeIds.length > 0
          ? { linkedNodeIds }
          : {}),
      });
    }

    // Boost exact ID and exact title matches so precise selector queries
    // rank the target node first, ahead of broader prefix matches.
    const normalizedQuery = normalizeForLookup(query);
    for (const hit of hits) {
      if (hit.id === query || normalizeForLookup(hit.id) === normalizedQuery) {
        hit.score += 200;
      } else if (normalizeForLookup(hit.title) === normalizedQuery) {
        hit.score += 150;
      }
    }

    hits.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
    const trimmed = hits.slice(0, limit);

    return {
      query,
      hits: trimmed,
      total: hits.length,
      snapshot: { sourceHash: snapshot.sourceHash, builtAt: snapshot.builtAt },
    };
  }

  private persistSession(sessionId: string | undefined, trace: TraceResult): void {
    if (!sessionId) {
      return;
    }

    const lastSelectedRouteId = trace.selectedNodeIds.find(
      (nodeId) => trace.candidateScores.find((candidate) => candidate.nodeId === nodeId)?.kind === 'route',
    );
    const nextState: RetrievalSessionState = {
      lastNormalizedQuestion: trace.normalizedQuestion,
      lastSelectedNodeIds: trace.selectedNodeIds,
      lastSelectedRouteId,
      recentUnresolvedNodeIds: trace.excludedNodeIds,
      updatedAt: new Date().toISOString(),
    };
    this.sessionCache.set(sessionId, nextState);
  }

  private async createEngine(forceRefresh = false, sessionId?: string): Promise<QueryEngine> {
    const audit = await this.refresh(forceRefresh, true);
    return new QueryEngine(
      await this.requireSnapshot(),
      audit.rebuilt,
      sessionId ? this.sessionCache.get(sessionId) : undefined,
    );
  }

  private loadSnapshot(): Promise<Snapshot | undefined> {
    return this.readJsonFile(this.artifactPaths.snapshot);
  }

  private loadIndexingView(): Promise<IndexingView | undefined> {
    return this.readJsonFile(this.artifactPaths.indexingView);
  }

  private async readCurrentCompilerFingerprint(): Promise<string | undefined> {
    if (this.configuredCompilerFingerprint) {
      return this.configuredCompilerFingerprint;
    }
    // The fingerprint describes the compiler code this process is running,
    // which cannot change mid-process — compute it once per runtime instance.
    this.compilerFingerprintPromise ??= readSourceCompilerFingerprint();
    // Await the captured promise (not the mutable field) and only clear the
    // memo if it still holds that promise, so a concurrent caller's fresh
    // retry is never awaited as undefined or clobbered by a stale failure.
    const currentPromise = this.compilerFingerprintPromise;
    const fingerprint = await currentPromise;
    if (fingerprint === undefined && this.compilerFingerprintPromise === currentPromise) {
      // readSourceCompilerFingerprint resolves undefined on read errors;
      // drop the memo so one transient failure doesn't disable
      // compiler-change detection for the rest of the process.
      this.compilerFingerprintPromise = undefined;
    }
    return fingerprint;
  }

  /**
   * SHA-256 of the spec source, memoized by the full stat fingerprint
   * (mtime, ctime, size, inode) so repeated status() calls do not re-hash
   * an unchanged multi-MB source file.
   */
  private async hashSourceFile(): Promise<string> {
    const fingerprint = await fingerprintFile(this.sourcePath);
    if (
      this.cachedSourceHash &&
      sourceFingerprintEquals(this.cachedSourceHash.fingerprint, fingerprint)
    ) {
      return this.cachedSourceHash.hash;
    }
    const hash = await hashFile(this.sourcePath);
    this.cachedSourceHash = { fingerprint, hash };
    return hash;
  }

  private async requireSnapshot(): Promise<Snapshot> {
    if (this.cachedSnapshot && !snapshotNeedsRebuild(this.cachedSnapshot)) {
      return this.cachedSnapshot;
    }
    const snapshot = await this.loadSnapshot();
    if (!snapshot) {
      throw new Error('Compiled snapshot is missing after refresh.');
    }
    this.assertSnapshotMatchesConfiguredFingerprint(snapshot);
    this.cachedSnapshot = snapshot;
    return snapshot;
  }

  private assertSnapshotMatchesConfiguredFingerprint(snapshot: Snapshot): void {
    if (
      this.snapshotIntegrityVerified ||
      !this.configuredCompilerFingerprint ||
      !snapshot.compilerFingerprint
    ) {
      return;
    }
    if (snapshot.compilerFingerprint !== this.configuredCompilerFingerprint) {
      throw new Error(
        `Compiled snapshot compilerFingerprint ${snapshot.compilerFingerprint} does not match the configured fingerprint ${this.configuredCompilerFingerprint}. Refusing to serve a snapshot built by a different compiler.`,
      );
    }
    this.snapshotIntegrityVerified = true;
  }

  private rememberSnapshot(
    snapshot: Snapshot,
    audit: BuildAudit,
    sourceFingerprint: SourceFingerprint,
  ): void {
    this.cachedSnapshot = snapshot;
    this.cachedAudit = audit;
    this.cachedSourceFingerprint = sourceFingerprint;
  }

  private async loadSessionCacheOnce(sourceHash: string): Promise<void> {
    if (this.sessionCacheLoadedForHash === sourceHash) {
      return;
    }
    await this.sessionCache.load(sourceHash);
    this.sessionCacheLoadedForHash = sourceHash;
  }

  private async writeArtifacts(snapshot: Snapshot, onlyMissing = false): Promise<void> {
    const payloads = {
      snapshot,
      indexMap: {
        roots: snapshot.indexRoots,
        nodes: snapshot.indexMap,
      },
      patternGraph: snapshot.patternGraph,
      routeGraph: snapshot.routeGraph,
      lexicon: snapshot.lexicon,
      anchorMap: snapshot.anchorMap,
    } as const;

    const entries = Object.entries(payloads) as Array<
      [keyof typeof payloads, (typeof payloads)[keyof typeof payloads]]
    >;
    await Promise.all(
      entries.map(async ([key, value]) => {
        if (onlyMissing && (await this.pathExists(this.artifactPaths[key]))) {
          return;
        }
        await this.writeJson(this.artifactPaths[key], value);
      }),
    );
  }

  private async writeAudit(audit: BuildAudit): Promise<void> {
    await this.writeJson(this.artifactPaths.buildAudit, audit);
  }

  private async seedArtifactsFromReadOnlyBundle(): Promise<void> {
    if (!this.artifactSeedPaths) {
      return;
    }

    await Promise.all(
      Object.entries(this.artifactSeedPaths).map(async ([key, sourcePath]) => {
        const targetPath = this.artifactPaths[key as keyof typeof ARTIFACT_FILENAMES];
        if ((await this.pathExists(targetPath)) || !(await this.pathExists(sourcePath))) {
          return;
        }
        await mkdir(dirname(targetPath), { recursive: true });
        await copyFile(sourcePath, targetPath);
      }),
    );
  }

  private async writeJson(path: string, value: unknown): Promise<void> {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, JSON.stringify(value, null, 2));
  }

  private async readJsonFile<T>(path: string): Promise<T | undefined> {
    try {
      return JSON.parse(await readFile(path, 'utf8')) as T;
    } catch {
      return undefined;
    }
  }

  private async pathExists(path: string): Promise<boolean> {
    try {
      // stat + access, not readFile: presence checks run against multi-MB
      // artifacts on every status() call and must not read the file bodies.
      // isFile() + R_OK keep the old readFile semantics — a directory
      // shadowing an artifact path or an unreadable file counts as missing,
      // so the only-missing/seed passes repair it and the status gate does
      // not report unreadable artifacts as present.
      const stats = await stat(path);
      if (!stats.isFile()) {
        return false;
      }
      await access(path, fsConstants.R_OK);
      return true;
    } catch {
      return false;
    }
  }

  private async getArtifactPresence(): Promise<Record<string, boolean>> {
    const entries = await Promise.all(
      Object.entries(this.artifactPaths).map(async ([key, path]) => [key, await this.pathExists(path)] as const),
    );
    return Object.fromEntries(entries);
  }
}

async function hashFile(path: string): Promise<string> {
  const content = await readFile(path);
  return `sha256:${createHash('sha256').update(content).digest('hex')}`;
}

async function fingerprintFile(path: string): Promise<SourceFingerprint> {
  const fileStat = await stat(path);
  return {
    mtimeMs: fileStat.mtimeMs,
    ctimeMs: fileStat.ctimeMs,
    size: fileStat.size,
    inode: fileStat.ino,
  };
}

function sourceFingerprintEquals(left: SourceFingerprint, right: SourceFingerprint): boolean {
  return (
    left.mtimeMs === right.mtimeMs &&
    left.ctimeMs === right.ctimeMs &&
    left.size === right.size &&
    left.inode === right.inode
  );
}

function buildCompilerSummary(snapshot: Snapshot): BuildAudit['compiler'] {
  return {
    mode: 'local_vectorless',
    compiledNodes: Object.keys(snapshot.compiledNodes).length,
    patternNodes: Object.keys(snapshot.patternGraph.nodes).length,
    routeNodes: Object.keys(snapshot.routeGraph.nodes).length,
    lexiconEntries: Object.keys(snapshot.lexicon).length,
    indexMapNodes: Object.keys(snapshot.indexMap).length,
    anchorCount: Object.keys(snapshot.anchorMap).length,
  };
}

function refreshReasonForRebuild(params: {
  force: boolean;
  existingSnapshot: Snapshot | undefined;
  staleSnapshotShape: boolean;
  staleCompilerFingerprint: boolean;
  currentSourceHash: string;
}): BuildAudit['reason'] {
  if (params.force) {
    return 'forced';
  }
  if (!params.existingSnapshot || params.staleSnapshotShape) {
    return 'missing_snapshot';
  }
  if (params.existingSnapshot.sourceHash !== params.currentSourceHash) {
    return 'source_hash_changed';
  }
  if (params.staleCompilerFingerprint) {
    return 'compiler_changed';
  }
  throw new Error('refreshReasonForRebuild called without a rebuild reason');
}

async function readSourceCompilerFingerprint(): Promise<string | undefined> {
  try {
    return await computeCompilerFingerprint();
  } catch {
    return undefined;
  }
}

function snapshotNeedsRebuild(
  snapshot: Snapshot,
  currentCompilerFingerprint?: string,
): boolean {
  return snapshotShapeNeedsRebuild(snapshot)
    || snapshotCompilerFingerprintChanged(snapshot, currentCompilerFingerprint);
}

function snapshotShapeNeedsRebuild(snapshot: Snapshot): boolean {
  if (!Array.isArray(snapshot.heuristicSeedRules)) {
    return true;
  }
  return Object.values(snapshot.indexMap).some(
    (node) =>
      typeof node.description !== 'string' ||
      !node.metadata ||
      typeof node.metadata.role !== 'string' ||
      typeof node.metadata.routeBearing !== 'boolean',
  );
}

function snapshotCompilerFingerprintChanged(
  snapshot: Snapshot,
  currentCompilerFingerprint?: string,
): boolean {
  return Boolean(
    currentCompilerFingerprint &&
      snapshot.compilerFingerprint !== currentCompilerFingerprint,
  );
}

/**
 * Round-robin the full entry set across kinds (each bucket already sorted
 * by ID) so every browse page carries a representative mix of patterns,
 * routes, and lexemes. The ordering depends only on the filtered entry
 * set — never on the requested page size — so offset paging tiles the
 * catalog without duplicates or gaps.
 */
function interleaveBrowseEntries(entries: CatalogEntry[]): CatalogEntry[] {
  const byKind = new Map<string, CatalogEntry[]>();
  for (const entry of entries) {
    const bucket = byKind.get(entry.kind) ?? [];
    bucket.push(entry);
    byKind.set(entry.kind, bucket);
  }

  const buckets = [...byKind.keys()].sort().map((kind) => byKind.get(kind)!);
  const result: CatalogEntry[] = [];
  for (let round = 0; result.length < entries.length; round += 1) {
    for (const bucket of buckets) {
      if (round < bucket.length) {
        result.push(bucket[round]!);
      }
    }
  }
  return result;
}

interface PartFilterResolution {
  value?: string;
  suggestion?: string;
}

const availablePartsCache = new WeakMap<Snapshot, string[]>();

function resolvePartFilter(part: string | undefined, snapshot: Snapshot): PartFilterResolution {
  if (!part?.trim()) {
    return {};
  }

  const availableParts = resolveAvailableParts(snapshot);
  const inputKey = normalizedCatalogFilterKey(part);
  for (const availablePart of availableParts) {
    if (partFilterKeys(availablePart).includes(inputKey)) {
      return { value: availablePart };
    }
  }

  const suggestion = suggestPartFilter(inputKey, availableParts);
  return { value: part, suggestion };
}

function resolveAvailableParts(snapshot: Snapshot): string[] {
  const cached = availablePartsCache.get(snapshot);
  if (cached) {
    return cached;
  }

  const availableParts = unique(
    Object.values(snapshot.compiledNodes)
      .map((node) => node.part)
      .filter((value): value is string => Boolean(value)),
  ).sort((left, right) => left.localeCompare(right));
  availablePartsCache.set(snapshot, availableParts);
  return availableParts;
}

function partFilterKeys(part: string): string[] {
  const keys = [normalizedCatalogFilterKey(part)];
  const match = /^part\s+([a-z])\b/i.exec(part.trim());
  if (match?.[1]) {
    const letter = match[1].toLowerCase();
    keys.push(letter, `part${letter}`);
  }
  return unique(keys);
}

function normalizedCatalogFilterKey(value: string): string {
  return normalizeForLookup(value).replace(/[^a-z0-9]+/g, '');
}

function suggestPartFilter(inputKey: string, availableParts: string[]): string | undefined {
  if (!inputKey || /^part[a-z]$/i.test(inputKey) || /^[a-z]$/i.test(inputKey)) {
    return undefined;
  }

  let best: { part: string; distance: number } | undefined;
  for (const availablePart of availableParts) {
    const candidateDistance = Math.min(
      ...partFilterKeys(availablePart).map((key) => levenshteinDistance(inputKey, key)),
    );
    if (!best || candidateDistance < best.distance) {
      best = { part: availablePart, distance: candidateDistance };
    }
  }

  return best && best.distance <= 2 ? best.part : undefined;
}

function levenshteinDistance(left: string, right: string): number {
  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  let current = new Array<number>(right.length + 1);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    current[0] = leftIndex;
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const cost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1;
      current[rightIndex] = Math.min(
        current[rightIndex - 1]! + 1,
        previous[rightIndex]! + 1,
        previous[rightIndex - 1]! + cost,
      );
    }
    const nextPrevious = current;
    current = previous;
    previous = nextPrevious;
  }
  return previous[right.length] ?? Math.max(left.length, right.length);
}

function nodeToCatalogEntry(
  node: import('./types.js').CompiledNode,
  snapshot: Snapshot,
): CatalogEntry {
  let description = '';
  if (node.kind === 'pattern') {
    const pattern = snapshot.patternGraph.nodes[node.id];
    description = pattern?.description ?? node.title;
  } else if (node.kind === 'route') {
    const route = snapshot.routeGraph.nodes[node.id];
    description = route?.description ?? node.title;
  } else if (node.kind === 'lexeme') {
    const entry = snapshot.lexicon[node.id];
    description = entry
      ? `Lexicon: ${entry.canonical}${entry.aliases.length > 0 ? ` (${entry.aliases.join(', ')})` : ''}`
      : node.title;
  } else if (node.kind === 'preface') {
    // Preface entries' indexMap node carries the section's description.
    const indexNode = snapshot.indexMap[node.id];
    description = indexNode?.description ?? node.title;
  }
  return {
    id: node.id,
    kind: node.kind,
    title: node.title,
    status: node.status,
    part: node.part,
    cluster: node.cluster,
    description,
  };
}

// The catalog holds thousands of entries; an unpaged browse response is
// tens of KB. Default to one small page and let callers walk `offset`.
const DEFAULT_BROWSE_LIMIT = 50;

const SEARCH_TITLE_TOKEN_WEIGHT = 5;
// Lexemes are vocabulary entries; in default search they kept crowding
// out actionable pattern/route hits because their `searchableText`
// concatenates many usage examples. When the caller hasn't asked for
// lexemes specifically (`kind: "lexeme"`), multiply their score by
// this factor so they rank below pattern/route matches of comparable
// strength but still appear if nothing else matches the query.
const SEARCH_LEXEME_DEFAULT_PENALTY = 0.3;
// Schema caps the query string at 1000 chars; even pathological tokenizations
// won't exceed this token count for a legitimate query.
const SEARCH_MAX_QUERY_TOKENS = 64;
const SNIPPET_RADIUS = 80;

function extractSnippet(searchableText: string, queryTokens: string[]): string {
  let bestPos = 0;
  let bestLen = 0;
  let bestTokenLen = 0;

  for (const token of queryTokens) {
    const hit = findTokenPosition(searchableText, token);
    if (hit && token.length > bestTokenLen) {
      bestPos = hit.pos;
      bestLen = hit.len;
      bestTokenLen = token.length;
    }
  }

  let start = Math.max(0, bestPos - SNIPPET_RADIUS);
  let end = Math.min(searchableText.length, bestPos + bestLen + SNIPPET_RADIUS);

  // Snap to word boundaries to avoid cutting words in half.
  if (start > 0) {
    const nextSpace = searchableText.indexOf(' ', start);
    if (nextSpace !== -1 && nextSpace < bestPos) {
      start = nextSpace + 1;
    }
  }
  if (end < searchableText.length) {
    const prevSpace = searchableText.lastIndexOf(' ', end);
    if (prevSpace > bestPos + bestLen) {
      end = prevSpace;
    }
  }

  let snippet = collapseWhitespace(searchableText.slice(start, end));
  if (start > 0) {
    snippet = `…${snippet}`;
  }
  if (end < searchableText.length) {
    snippet = `${snippet}…`;
  }
  return snippet;
}
