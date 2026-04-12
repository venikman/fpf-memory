import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import {
  ARTIFACT_FILENAMES,
  DEFAULT_ARTIFACT_DIR,
  DEFAULT_SOURCE_PATH,
} from './constants.js';
import { compileFpfSource } from './compiler.js';
import { createSynthesizerFromEnv } from './lm-studio-synthesizer.js';
import { QueryEngine } from './query-engine.js';
import {
  SessionCache,
  type RetrievalSessionState,
} from './session-cache.js';
import type {
  AnswerMode,
  BuildAudit,
  ExpandCitationsResult,
  InspectAnchorResult,
  InspectResult,
  LocalAnswerSynthesizer,
  QueryResult,
  ReadDocResult,
  RuntimeStatus,
  Snapshot,
  TraceResult,
} from './types.js';
import { getRuntimeObservabilitySummary } from '../observability/runtime-observability.js';

export interface FpfRuntimeOptions {
  sourcePath?: string;
  artifactDir?: string;
  synthesizer?: LocalAnswerSynthesizer;
  maxSessions?: number;
}

export class FpfRuntime {
  private readonly sourcePath: string;
  private readonly artifactDir: string;
  private readonly artifactPaths: Record<keyof typeof ARTIFACT_FILENAMES, string>;
  private readonly synthesizer?: LocalAnswerSynthesizer;
  private readonly sessionCache: SessionCache;

  constructor(options: FpfRuntimeOptions = {}) {
    this.sourcePath = resolve(
      process.cwd(),
      options.sourcePath ?? process.env.FPF_SPEC_SOURCE_PATH ?? DEFAULT_SOURCE_PATH,
    );
    this.artifactDir = resolve(
      process.cwd(),
      options.artifactDir ?? process.env.FPF_RUNTIME_ARTIFACT_DIR ?? DEFAULT_ARTIFACT_DIR,
    );
    this.artifactPaths = Object.fromEntries(
      Object.entries(ARTIFACT_FILENAMES).map(([key, filename]) => [
        key,
        resolve(this.artifactDir, filename),
      ]),
    ) as Record<keyof typeof ARTIFACT_FILENAMES, string>;
    this.synthesizer = options.synthesizer ?? createSynthesizerFromEnv();
    this.sessionCache = new SessionCache(options.maxSessions ?? 50);
  }

  async refresh(force = false): Promise<BuildAudit> {
    await mkdir(this.artifactDir, { recursive: true });
    const currentSourceHash = await hashFile(this.sourcePath);
    const existingSnapshot = await this.loadSnapshot();
    const compatibleSnapshot = existingSnapshot && !snapshotNeedsRebuild(existingSnapshot);

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
      await this.writeArtifacts(existingSnapshot);
      await this.writeAudit(audit);
      return audit;
    }

    const sourceText = await readFile(this.sourcePath, 'utf8');
    const builtAt = new Date().toISOString();
    const { snapshot } = compileFpfSource({
      sourcePath: this.sourcePath,
      sourceHash: currentSourceHash,
      builtAt,
      sourceText,
    });

    await this.writeArtifacts(snapshot);

    const audit: BuildAudit = {
      sourcePath: this.sourcePath,
      sourceHash: currentSourceHash,
      previousSourceHash: existingSnapshot?.sourceHash,
      builtAt,
        rebuilt: true,
        reason: force
          ? 'forced'
          : existingSnapshot
            ? compatibleSnapshot
              ? 'source_hash_changed'
              : 'missing_snapshot'
            : 'missing_snapshot',
      validation: snapshot.validation,
      compiler: buildCompilerSummary(snapshot),
      artifacts: this.artifactPaths,
    };
    await this.writeAudit(audit);
    return audit;
  }

  async query(
    question: string,
    mode: AnswerMode = 'compact',
    forceRefresh = false,
    sessionId?: string,
  ): Promise<QueryResult> {
    const audit = await this.refresh(forceRefresh);
    const snapshot = await this.requireSnapshot();
    const engine = new QueryEngine(
      snapshot,
      audit.rebuilt,
      this.synthesizer,
      sessionId ? this.sessionCache.get(sessionId) : undefined,
    );
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
    const audit = await this.refresh(forceRefresh);
    const snapshot = await this.requireSnapshot();
    const trace = new QueryEngine(
      snapshot,
      audit.rebuilt,
      this.synthesizer,
      sessionId ? this.sessionCache.get(sessionId) : undefined,
    ).trace(question, mode);
    this.persistSession(sessionId, trace);
    return trace;
  }

  async inspect(
    selector: string,
    kind: 'auto' | 'id' | 'route' | 'lexeme' = 'auto',
    forceRefresh = false,
  ): Promise<InspectResult> {
    await this.refresh(forceRefresh);
    const snapshot = await this.requireSnapshot();
    return new QueryEngine(snapshot, false, this.synthesizer).inspect(selector, kind);
  }

  async readDoc(
    selector: string,
    kind: 'auto' | 'id' | 'route' | 'lexeme' = 'auto',
    forceRefresh = false,
  ): Promise<ReadDocResult> {
    await this.refresh(forceRefresh);
    const snapshot = await this.requireSnapshot();
    return new QueryEngine(snapshot, false, this.synthesizer).readDoc(selector, kind);
  }

  async inspectAnchor(anchorId: string, forceRefresh = false): Promise<InspectAnchorResult> {
    await this.refresh(forceRefresh);
    const snapshot = await this.requireSnapshot();
    return new QueryEngine(snapshot, false, this.synthesizer).inspectAnchor(anchorId);
  }

  async expandCitations(
    citationIds: string[],
    forceRefresh = false,
  ): Promise<ExpandCitationsResult> {
    await this.refresh(forceRefresh);
    const snapshot = await this.requireSnapshot();
    return new QueryEngine(snapshot, false, this.synthesizer).expandCitations(citationIds);
  }

  async status(): Promise<RuntimeStatus> {
    const existingSnapshot = await this.loadSnapshot();
    const currentSourceHash = await hashFile(this.sourcePath);
    return {
      sourcePath: this.sourcePath,
      sourceHash: existingSnapshot?.sourceHash,
      builtAt: existingSnapshot?.builtAt,
      snapshotExists: Boolean(existingSnapshot),
      currentSourceHash,
      fresh: existingSnapshot?.sourceHash === currentSourceHash,
      compilerMode: 'local_vectorless',
      artifacts: await this.getArtifactPresence(),
      synthesizer: this.synthesizer?.describe
        ? {
            configured: true,
            ...this.synthesizer.describe(),
          }
        : { configured: false },
      observability: getRuntimeObservabilitySummary(),
      sessionCache: this.sessionCache.summary(),
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

  private async loadSnapshot(): Promise<Snapshot | undefined> {
    try {
      const content = await readFile(this.artifactPaths.snapshot, 'utf8');
      return JSON.parse(content) as Snapshot;
    } catch {
      return undefined;
    }
  }

  private async requireSnapshot(): Promise<Snapshot> {
    const snapshot = await this.loadSnapshot();
    if (!snapshot) {
      throw new Error('Compiled snapshot is missing after refresh.');
    }
    return snapshot;
  }

  private async writeArtifacts(snapshot: Snapshot): Promise<void> {
    const payloads = {
      snapshot,
      buildAudit: undefined,
      indexMap: {
        roots: snapshot.indexRoots,
        nodes: snapshot.indexMap,
      },
      patternGraph: snapshot.patternGraph,
      routeGraph: snapshot.routeGraph,
      lexicon: snapshot.lexicon,
      anchorMap: snapshot.anchorMap,
    } as const;

    await Promise.all(
      Object.entries(payloads)
        .filter((entry): entry is [keyof typeof payloads, Exclude<(typeof payloads)[keyof typeof payloads], undefined>] => entry[1] !== undefined)
        .map(([key, value]) => this.writeJson(this.artifactPaths[key], value)),
    );
  }

  private async writeAudit(audit: BuildAudit): Promise<void> {
    await this.writeJson(this.artifactPaths.buildAudit, audit);
  }

  private async writeJson(path: string, value: unknown): Promise<void> {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, JSON.stringify(value, null, 2));
  }

  private async getArtifactPresence(): Promise<Record<string, boolean>> {
    const entries = await Promise.all(
      Object.entries(this.artifactPaths).map(async ([key, path]) => {
        try {
          await readFile(path, 'utf8');
          return [key, true] as const;
        } catch {
          return [key, false] as const;
        }
      }),
    );
    return Object.fromEntries(entries);
  }
}

async function hashFile(path: string): Promise<string> {
  const content = await readFile(path);
  return `sha256:${createHash('sha256').update(content).digest('hex')}`;
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

function snapshotNeedsRebuild(snapshot: Snapshot): boolean {
  return Object.values(snapshot.indexMap).some(
    (node) =>
      typeof node.description !== 'string' ||
      !node.metadata ||
      typeof node.metadata.role !== 'string' ||
      typeof node.metadata.routeBearing !== 'boolean',
  );
}
