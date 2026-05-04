import { createHash } from 'node:crypto';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
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
  LocalAnswerSynthesizer,
  NodeKind,
  QueryResult,
  ReadDocResult,
  RuntimeStatus,
  SearchHit,
  SearchResult,
  Snapshot,
  TraceResult,
} from './types.js';
import { normalizeForLookup, tokenize, scoreOverlap } from './text.js';

export interface FpfRuntimeOptions {
  sourcePath?: string;
  artifactDir?: string;
  synthesizer?: LocalAnswerSynthesizer;
  maxSessions?: number;
  persistSessionCache?: boolean;
  observability?: RuntimeStatus['observability'];
}

interface SourceFingerprint {
  mtimeMs: number;
  size: number;
}

export class FpfRuntime {
  private readonly sourcePath: string;
  private readonly artifactDir: string;
  private readonly artifactPaths: Record<keyof typeof ARTIFACT_FILENAMES, string>;
  private readonly synthesizer?: LocalAnswerSynthesizer;
  private readonly sessionCache: SessionCache;
  private readonly observabilitySummary: RuntimeStatus['observability'];
  private cachedSnapshot?: Snapshot;
  private cachedAudit?: BuildAudit;
  private cachedSourceFingerprint?: SourceFingerprint;
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
    this.synthesizer = options.synthesizer;
    this.observabilitySummary =
      options.observability ?? {
        configured: false,
        filePath: '',
        format: 'flat',
        includeInternalSpans: false,
        logLevel: 'info',
        excludeModelChunks: true,
      };
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
        : await readCurrentCompilerFingerprint();
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
    forceRefresh = false,
  ): Promise<ReadDocResult> {
    return (await this.createEngine(forceRefresh)).readDoc(selector, kind);
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
    let existingSnapshot = await this.loadSnapshot();
    const currentCompilerFingerprint = await readCurrentCompilerFingerprint();
    if (!existingSnapshot || snapshotNeedsRebuild(existingSnapshot, currentCompilerFingerprint)) {
      await this.refresh(false, { compilerFingerprint: currentCompilerFingerprint }).catch(
        (error) => {
          const message = error instanceof Error ? error.message : String(error);
          console.warn(`[FpfRuntime.status] refresh(false) failed: ${message}`);
        },
      );
      existingSnapshot = await this.loadSnapshot();
    }

    const currentSourceHash = await hashFile(this.sourcePath);
    const synthesizer = await this.synthesizerStatus();
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
      synthesizer,
      observability: this.observabilitySummary,
      sessionCache: this.sessionCache.summary(),
    };
  }

  private async synthesizerStatus(): Promise<RuntimeStatus['synthesizer']> {
    if (!this.synthesizer) {
      return {
        configured: false,
        availability: 'not_configured',
      };
    }

    const base = this.synthesizer.describe
      ? {
          configured: true,
          ...this.synthesizer.describe(),
        }
      : { configured: true };

    if (!this.synthesizer.checkAvailability) {
      const available = await this.synthesizer.isAvailable();
      return {
        ...base,
        availability: available ? 'unknown' : 'unavailable',
        checkedAt: new Date().toISOString(),
      };
    }

    try {
      return {
        ...base,
        ...(await this.synthesizer.checkAvailability()),
      };
    } catch (error) {
      return {
        ...base,
        availability: 'unknown',
        checkedAt: new Date().toISOString(),
        failure: {
          message:
            error instanceof Error
              ? error.message
              : 'Synthesizer availability check failed with an unknown error.',
        },
      };
    }
  }

  async browse(
    options: { part?: string; status?: string; kind?: NodeKind; limit?: number; forceRefresh?: boolean } = {},
  ): Promise<BrowseCatalogResult> {
    await this.refresh(options.forceRefresh ?? false);
    const snapshot = await this.requireSnapshot();

    const partLower = options.part?.toLowerCase();
    const statusLower = options.status?.toLowerCase();
    const limit = Math.min(options.limit ?? 200, 500);

    const entries = Object.values(snapshot.compiledNodes)
      .filter((node) => {
        if (options.kind && node.kind !== options.kind) return false;
        if (partLower && node.part?.toLowerCase() !== partLower) return false;
        if (statusLower && node.status?.toLowerCase() !== statusLower) return false;
        return true;
      })
      .map((node) => nodeToCatalogEntry(node, snapshot));

    entries.sort((a, b) => a.id.localeCompare(b.id));

    // When no kind filter is active, interleave kinds so the default page
    // shows a representative mix of patterns, routes, and lexemes instead
    // of burying routes/lexemes past the limit cutoff.
    const trimmed = options.kind
      ? entries.slice(0, limit)
      : interleaveBrowseEntries(entries, limit);

    return {
      entries: trimmed,
      total: entries.length,
      filters: {
        part: options.part,
        status: options.status,
        kind: options.kind,
      },
      snapshot: { sourceHash: snapshot.sourceHash, builtAt: snapshot.builtAt },
    };
  }

  async search(
    query: string,
    options: { kind?: NodeKind; limit?: number; forceRefresh?: boolean } = {},
  ): Promise<SearchResult> {
    await this.refresh(options.forceRefresh ?? false);
    const snapshot = await this.requireSnapshot();

    // Tokenize the raw query first so camelCase splits (e.g. BoundedContext →
    // bounded + context) are preserved; tokenize() handles lowercasing internally.
    const queryTokens = tokenize(query);
    const limit = Math.min(options.limit ?? 20, 100);

    const hits: SearchHit[] = [];
    for (const node of Object.values(snapshot.compiledNodes)) {
      if (options.kind && node.kind !== options.kind) {
        continue;
      }

      const score = scoreOverlap(queryTokens, node.searchableText);
      if (score <= 0) {
        continue;
      }

      hits.push({
        id: node.id,
        kind: node.kind,
        title: node.title,
        status: node.status,
        part: node.part,
        score,
        snippet: extractSnippet(node.searchableText, queryTokens),
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
      this.synthesizer,
      sessionId ? this.sessionCache.get(sessionId) : undefined,
    );
  }

  private loadSnapshot(): Promise<Snapshot | undefined> {
    return this.readJsonFile(this.artifactPaths.snapshot);
  }

  private loadIndexingView(): Promise<IndexingView | undefined> {
    return this.readJsonFile(this.artifactPaths.indexingView);
  }

  private async requireSnapshot(): Promise<Snapshot> {
    if (this.cachedSnapshot && !snapshotNeedsRebuild(this.cachedSnapshot)) {
      return this.cachedSnapshot;
    }
    const snapshot = await this.loadSnapshot();
    if (!snapshot) {
      throw new Error('Compiled snapshot is missing after refresh.');
    }
    this.cachedSnapshot = snapshot;
    return snapshot;
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
      await readFile(path, 'utf8');
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
    size: fileStat.size,
  };
}

function sourceFingerprintEquals(left: SourceFingerprint, right: SourceFingerprint): boolean {
  return left.mtimeMs === right.mtimeMs && left.size === right.size;
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

async function readCurrentCompilerFingerprint(): Promise<string | undefined> {
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
 * Interleave entries by kind so the default browse page shows a
 * representative mix of patterns, routes, and lexemes.  Each kind
 * gets a fair share of the limit, and leftover slots are filled by
 * whichever kinds have entries remaining.
 */
function interleaveBrowseEntries(entries: CatalogEntry[], limit: number): CatalogEntry[] {
  const byKind = new Map<string, CatalogEntry[]>();
  for (const entry of entries) {
    const bucket = byKind.get(entry.kind) ?? [];
    bucket.push(entry);
    byKind.set(entry.kind, bucket);
  }

  const kinds = [...byKind.keys()].sort();
  const perKind = Math.max(1, Math.floor(limit / kinds.length));
  const result: CatalogEntry[] = [];

  // First pass: take up to perKind from each bucket.
  for (const kind of kinds) {
    const bucket = byKind.get(kind)!;
    result.push(...bucket.splice(0, perKind));
  }

  // Second pass: fill remaining slots round-robin.
  let remaining = limit - result.length;
  while (remaining > 0) {
    let added = false;
    for (const kind of kinds) {
      if (remaining <= 0) break;
      const bucket = byKind.get(kind)!;
      if (bucket.length > 0) {
        result.push(bucket.shift()!);
        remaining -= 1;
        added = true;
      }
    }
    if (!added) break;
  }

  // Enforce the limit — the first pass may overshoot when limit < kindCount.
  const capped = result.slice(0, limit);

  // Sort the interleaved result by ID for stable output.
  capped.sort((a, b) => a.id.localeCompare(b.id));
  return capped;
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
