import { copyFile, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';

import {
  renderAskFpfResult,
  resolveDefaultQueryMode,
} from '../src/mcp/tools.js';
import {
  askFpfInputSchema,
  expandFpfCitationsInputSchema,
  getFpfIndexStatusInputSchema,
  queryFpfSpecInputSchema,
} from '../src/mcp/tool-contracts.js';
import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';
import { ARTIFACT_FILENAMES } from '../src/runtime/constants.js';
import { FpfRuntime } from '../src/runtime/runtime.js';

describe('FpfRuntime', () => {
  const canonicalSourcePath = resolve(process.cwd(), DEFAULT_SOURCE_PATH);
  let tempRoot: string;
  let sourcePath: string;
  let artifactDir: string;
  let runtime: FpfRuntime;

  beforeEach(async () => {
    tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-runtime-'));
    artifactDir = resolve(tempRoot, 'artifacts');
    sourcePath = resolve(tempRoot, 'FPF-spec.md');
    await copyFile(canonicalSourcePath, sourcePath);
    runtime = new FpfRuntime({
      artifactDir,
      sourcePath,
    });
  });

  afterEach(async () => {
    await rm(tempRoot, { recursive: true, force: true });
  });

  async function readArtifact<T>(filename: string): Promise<T> {
    return JSON.parse(await readFile(resolve(artifactDir, filename), 'utf8')) as T;
  }

  it('builds a local artifact set and reuses the snapshot when the source hash is unchanged', async () => {
    const first = await runtime.refresh();
    expect(first.rebuilt).toBe(true);
    expect(first.reason).toBe('missing_snapshot');
    expect(first.compiler.mode).toBe('local_vectorless');
    expect(first.validation.parsedPatterns).toBeGreaterThan(50);
    expect(first.validation.parsedRoutes).toBeGreaterThan(0);
    expect(first.validation.parsedLexiconEntries).toBeGreaterThan(0);

    for (const filename of Object.values(ARTIFACT_FILENAMES)) {
      const content = await readFile(resolve(artifactDir, filename), 'utf8');
      expect(content.length).toBeGreaterThan(0);
    }

    const indexMap = await readArtifact<{
      roots: string[];
      nodes: Record<
        string,
        {
          description: string;
          metadata: {
            patternId?: string;
            role: string;
            routeBearing: boolean;
          };
        }
      >;
    }>(ARTIFACT_FILENAMES.indexMap);
    expect(indexMap.nodes['A.1.1']?.description.length).toBeGreaterThan(0);
    expect(indexMap.nodes['A.1.1']?.metadata.patternId).toBe('A.1.1');
    expect(indexMap.nodes['J.4']?.metadata.routeBearing).toBe(true);

    const snapshot = await readArtifact<{
      relationGraph: Array<{ from: string; relation: string; to: string }>;
    }>(ARTIFACT_FILENAMES.snapshot);
    expect(
      snapshot.relationGraph.some(
        (edge) => edge.from === 'A.15' && edge.relation === 'outline_child' && edge.to === 'A.15.2',
      ),
    ).toBe(true);
    expect(
      snapshot.relationGraph.some((edge) => edge.relation === 'explicit_reference'),
    ).toBe(true);

    const second = await runtime.refresh();
    expect(second.rebuilt).toBe(false);
    expect(second.reason).toBe('snapshot_current');

    await rm(resolve(artifactDir, ARTIFACT_FILENAMES.routeGraph), { force: true });
    const backfilled = await runtime.refresh();
    expect(backfilled.rebuilt).toBe(false);
    expect(await readFile(resolve(artifactDir, ARTIFACT_FILENAMES.routeGraph), 'utf8')).toContain(
      '"relations"',
    );

    await writeFile(sourcePath, `${await readFile(sourcePath, 'utf8')}\n<!-- hash-shift -->\n`);
    const third = await runtime.refresh();
    expect(third.rebuilt).toBe(true);
    expect(third.reason).toBe('source_hash_changed');

    const forced = await runtime.refresh(true);
    expect(forced.rebuilt).toBe(true);
    expect(forced.reason).toBe('forced');
  });

  it('does not depend on any remote indexing path', async () => {
    const originalFetch = globalThis.fetch;
    let fetchCalled = false;
    globalThis.fetch = (async () => {
      fetchCalled = true;
      throw new Error('refresh should stay local');
    }) as unknown as typeof fetch;

    try {
      const audit = await runtime.refresh();
      expect(audit.rebuilt).toBe(true);
      expect(fetchCalled).toBe(false);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  // Snapshot construction plus several downstream queries can cross the
  // default 20s timeout on GitHub runners under parallel load.
  it('builds a snapshot and keeps the key use-case IDs queryable', async () => {
    const audit = await runtime.refresh();
    expect(audit.rebuilt).toBe(true);
    expect(audit.validation.parsedPatterns).toBeGreaterThan(50);

    const boundedContext = await runtime.query(
      'What is the authoritative definition of U.BoundedContext and when should it be used?',
      'verbose',
    );
    expect(boundedContext.status).toBe('ok');
    expect(boundedContext.ids).toContain('A.1.1');
    expect(boundedContext.citations.some((citation) => citation.startsWith('A.1.1'))).toBe(true);
    expect(boundedContext.constraints.length).toBeGreaterThanOrEqual(2);

    const roleWorkflow = await runtime.query(
      'How do U.RoleAssignment, U.BoundedContext, and U.RoleStateGraph connect in a lawful workflow?',
      'verbose',
    );
    expect(roleWorkflow.ids).toEqual(
      expect.arrayContaining(['A.2.1', 'A.1.1', 'A.2.5']),
    );

    const projectReview = await runtime.query(
      'Which FPF route or patterns should guide project review work?',
      'compact',
    );
    expect(projectReview.status).toBe('ok');
    expect(projectReview.ids).toEqual(expect.arrayContaining(['E.8', 'A.15', 'E.19']));
    expect(projectReview.answer.length).toBeGreaterThan(0);
    expect(projectReview.citations.length).toBeGreaterThan(0);

    const agentWorkflow = await runtime.query(
      'How should I use FPF for agent workflow adoption without pasting the whole spec?',
      'compact',
    );
    expect(agentWorkflow.status).toBe('ok');
    expect(agentWorkflow.ids).toEqual(expect.arrayContaining(['E.8', 'E.19']));
    expect(agentWorkflow.answer.length).toBeGreaterThan(0);
    expect(agentWorkflow.citations.length).toBeGreaterThan(0);

    const deterministicOnly = new FpfRuntime({
      artifactDir: resolve(tempRoot, 'deterministic-artifacts'),
      sourcePath,
      synthesizer: {
        isAvailable: async () => false,
        synthesize: async () => {
          throw new Error('deterministic fallback should skip unavailable synthesis');
        },
      },
    });
    const deterministicAnswer = await deterministicOnly.query(
      'What is U.BoundedContext?',
      'compact',
    );
    expect(deterministicAnswer.status).toBe('ok');
    expect(deterministicAnswer.ids).toContain('A.1.1');

    const creativity = await runtime.query(
      'How is creativity and open-ended search represented in FPF?',
      'verbose',
    );
    expect(creativity.ids).toEqual(
      expect.arrayContaining(['C.17', 'C.18', 'C.19']),
    );

    const boundedContextTrace = await runtime.trace('What is U.BoundedContext?', 'compact');
    expect(boundedContextTrace.status).toBe('ok');
    expect(boundedContextTrace.selectedNodeIds[0]).toBe('A.1.1');
  }, 40_000);

  it('returns the project-alignment route from the preface and J.4 route surfaces', async () => {
    await runtime.refresh();
    const route = await runtime.query(
      'What is the recommended first route when vocabulary is overloaded across teams?',
      'proof',
    );

    expect(route.status).toBe('ok');
    expect(route.ids[0]).toBe('A.1.1');
    expect(route.ids[1]).toBe('A.15');
    expect(route.ids.slice(0, 5)).toContain('B.5.1');
    expect(route.ids.slice(0, 5).some((id) => id === 'A.15.2' || id === 'A.15.3')).toBe(
      true,
    );
    expect(route.ids).toContain('F.17');
    expect(route.citations).toEqual(
      expect.arrayContaining(['Preface/Where to start', 'J.4']),
    );

    const trace = await runtime.trace(
      'What is the recommended first route when vocabulary is overloaded across teams?',
      'proof',
    );
    expect(trace.selectedNodeIds).toContain('route:project-alignment');
    expect(trace.frontierCandidates.some((candidate) => candidate.origin === 'route_expansion')).toBe(
      true,
    );
    expect(trace.retrievalHops.length).toBeGreaterThan(0);
    expect(trace.sufficient).toBe(true);
  });

  // This test chains `refresh()` (full snapshot build, ~16–18s on GitHub
  // ubuntu-latest runners) with many downstream inspect/readDoc/trace calls.
  // The default 20s global timeout consistently tips over on CI. Give it the
  // same headroom as the other snapshot-building tests in this file.
  it('supports inspect, trace, and status surfaces over the compiled local index', async () => {
    await runtime.refresh();

    const inspectById = await runtime.inspect('A.1.1', 'id');
    expect(inspectById.status).toBe('ok');
    expect(inspectById.resolvedAs).toBe('id');
    expect(inspectById.node?.kind).toBe('pattern');
    expect(inspectById.anchors.length).toBeGreaterThan(0);
    expect(inspectById.docRef).toEqual({
      markdownPath: 'docs/generated/patterns/A.1.1.md',
      staticPath: '/generated/patterns/A.1.1',
    });

    const inspectLexeme = await runtime.inspect('U.BoundedContext', 'lexeme');
    expect(inspectLexeme.status).toBe('ok');
    expect(inspectLexeme.resolvedAs).toBe('lexeme');
    expect(inspectLexeme.node?.kind).toBe('lexeme');
    expect(inspectLexeme.node?.neighborEdges.some((edge) => edge.to === 'A.1.1')).toBe(true);
    expect(inspectLexeme.docRef).toEqual({
      markdownPath: 'docs/generated/patterns/A.1.1.md',
      staticPath: '/generated/patterns/A.1.1',
    });

    const readById = await runtime.readDoc('A.1.1', 'id');
    expect(readById.status).toBe('ok');
    expect(readById.nodeId).toBe('A.1.1');
    expect(readById.docRef?.markdownPath).toBe('docs/generated/patterns/A.1.1.md');
    expect(readById.markdown).toContain('# U.BoundedContext: The Semantic Frame');

    const readByRoute = await runtime.readDoc('project alignment', 'route');
    expect(readByRoute.status).toBe('ok');
    expect(readByRoute.nodeId).toBe('route:project-alignment');
    expect(readByRoute.docRef?.markdownPath).toBe(
      'docs/generated/routes/route_project-alignment.md',
    );
    expect(readByRoute.markdown).toContain('# project alignment');

    const readByLexeme = await runtime.readDoc('U.BoundedContext', 'lexeme');
    expect(readByLexeme.status).toBe('ok');
    expect(readByLexeme.nodeId).toBe('A.1.1');
    expect(readByLexeme.docRef?.markdownPath).toBe('docs/generated/patterns/A.1.1.md');
    expect(readByLexeme.markdown).toContain('# U.BoundedContext: The Semantic Frame');

    const inspectAnchor = await runtime.inspectAnchor(inspectById.anchors[0]!.id);
    expect(inspectAnchor.status).toBe('ok');
    expect(inspectAnchor.anchor?.id).toBe(inspectById.anchors[0]!.id);
    expect(inspectAnchor.ownerNode?.id).toBe('A.1.1');
    expect(inspectAnchor.neighbors).toEqual(inspectById.neighbors);

    const inspectSyntheticAnchor = await runtime.inspectAnchor('Preface/Where to start');
    expect(inspectSyntheticAnchor.status).toBe('ok');
    expect(inspectSyntheticAnchor.ownerNode?.kind).toBe('route');

    const trace = await runtime.trace(
      'How do U.RoleAssignment, U.BoundedContext, and U.RoleStateGraph connect in a lawful workflow?',
      'proof',
    );
    expect(trace.status).toBe('ok');
    expect(trace.selectedNodeIds).toEqual(
      expect.arrayContaining(['A.2.1', 'A.1.1', 'A.2.5']),
    );
    expect(trace.candidateScores.length).toBeGreaterThan(0);
    expect(trace.frontierCandidates.length).toBeGreaterThan(0);
    expect(trace.selectedAnchorIds.length).toBeGreaterThan(0);

    const status = await runtime.status();
    expect(status.snapshotExists).toBe(true);
    expect(status.compilerMode).toBe('local_vectorless');
    expect(status.fresh).toBe(true);
    expect(status.synthesizer.configured).toBe(false);
    expect(status.observability.configured).toBe(false);
    expect(status.observability.filePath).toBe('');
    expect(status.sessionCache.enabled).toBe(true);
    for (const key of Object.keys(ARTIFACT_FILENAMES)) {
      expect(status.artifacts[key]).toBe(true);
    }
  }, 40_000);

  it('expands citations in batch without changing single-anchor semantics', async () => {
    await runtime.refresh();

    const inspectById = await runtime.inspect('A.1.1', 'id');
    const citationId = inspectById.anchors[0]!.id;
    const syntheticCitationId = 'Preface/Where to start';

    const originalRefresh = runtime.refresh.bind(runtime);
    let refreshCalls = 0;
    (runtime as { refresh: typeof runtime.refresh }).refresh = async (...args) => {
      refreshCalls += 1;
      return originalRefresh(...args);
    };
    const expanded = await runtime.expandCitations([
      citationId,
      syntheticCitationId,
      citationId,
      'missing-citation',
    ]);

    expect(refreshCalls).toBe(1);
    expect(expanded.citationIds).toEqual([
      citationId,
      syntheticCitationId,
      citationId,
      'missing-citation',
    ]);
    expect(expanded.items.map((item) => item.citationId)).toEqual(expanded.citationIds);
    expect(expanded.items[0]?.status).toBe('ok');
    expect(expanded.items[1]?.status).toBe('ok');
    expect(expanded.items[2]?.status).toBe('ok');
    expect(expanded.items[3]).toEqual({
      citationId: 'missing-citation',
      status: 'not_found',
      neighbors: [],
    });
    expect(expanded.items[0]).toEqual({
      citationId,
      status: 'ok',
      anchor: expect.objectContaining({ id: citationId }),
      ownerNode: expect.objectContaining({ id: 'A.1.1' }),
      neighbors: inspectById.neighbors,
    });
    expect(expanded.items[1]?.ownerNode?.kind).toBe('route');
    expect(expanded.items[2]).toEqual(expanded.items[0]);
    expect(expanded.snapshot.sourceHash.length).toBeGreaterThan(0);

    const single = await runtime.inspectAnchor(citationId);
    expect(expanded.items[0]).toEqual({
      citationId,
      status: single.status,
      anchor: single.anchor,
      ownerNode: single.ownerNode,
      neighbors: single.neighbors,
    });
  });

  it('exports the batch citation expansion tool with a non-empty citation schema', async () => {
    const empty = expandFpfCitationsInputSchema.safeParse({ citationIds: [] });
    const valid = expandFpfCitationsInputSchema.safeParse({ citationIds: ['A.1.1:4.1'] });
    const validWithRefresh = expandFpfCitationsInputSchema.safeParse({
      citationIds: ['A.1.1:4.1'],
      forceRefresh: true,
    });

    expect(empty.success).toBe(false);
    expect(valid.success).toBe(true);
    expect(valid.data).toEqual({ citationIds: ['A.1.1:4.1'] });
    expect(validWithRefresh.success).toBe(true);
    expect(validWithRefresh.data).toEqual({
      citationIds: ['A.1.1:4.1'],
      forceRefresh: true,
    });
  });

  it('defaults query and ask tools to the configured verbose mode only', async () => {
    const previousDefaultMode = process.env.FPF_QUERY_DEFAULT_MODE;
    delete process.env.FPF_QUERY_DEFAULT_MODE;
    expect(resolveDefaultQueryMode()).toBe('verbose');
    if (previousDefaultMode === undefined) {
      delete process.env.FPF_QUERY_DEFAULT_MODE;
    } else {
      process.env.FPF_QUERY_DEFAULT_MODE = previousDefaultMode;
    }

    expect(resolveDefaultQueryMode({ FPF_QUERY_DEFAULT_MODE: 'proof' } as NodeJS.ProcessEnv)).toBe(
      'proof',
    );
    expect(resolveDefaultQueryMode({ FPF_QUERY_DEFAULT_MODE: 'invalid' } as NodeJS.ProcessEnv)).toBe(
      'verbose',
    );

    const queryInput = queryFpfSpecInputSchema.safeParse({
      question: 'What is U.BoundedContext?',
    });
    const askInput = askFpfInputSchema.safeParse({
      question: 'What is U.BoundedContext?',
    });

    expect(queryInput.success).toBe(true);
    expect(queryInput.data).toEqual({
      question: 'What is U.BoundedContext?',
    });
    expect(askInput.success).toBe(true);
    expect(askInput.data).toEqual({
      question: 'What is U.BoundedContext?',
    });
  });

  it('renders ask_fpf results as markdown with grounding sections', async () => {
    const query = await runtime.query('What is U.BoundedContext?', 'verbose', true);
    const result = renderAskFpfResult(query);

    expect(result.mode).toBe('verbose');
    expect(result.question).toBe(query.question);
    expect(result.markdown).toContain('## Result');
    expect(result.markdown).toContain('## Grounding');
    expect(result.markdown).toContain('`A.1.1`');
    expect(result.ids).toContain('A.1.1');
    expect(result.citations.some((citation) => citation.startsWith('A.1.1'))).toBe(true);
  });

  it('exports the status tool with an explicit object input schema', async () => {
    const empty = getFpfIndexStatusInputSchema.safeParse({});

    expect(empty.success).toBe(true);
    expect(empty.data).toEqual({});
  });

  it('keeps trace mode default compact instead of inheriting the query default', async () => {
    const trace = await runtime.trace('What is U.BoundedContext?', undefined, true);
    expect(trace.mode).toBe('compact');
  });

  it('follows explicit references for same-entity rewrite and comparative reading', async () => {
    await runtime.refresh();

    const query = await runtime.query(
      'How does same-entity rewrite relate to comparative reading?',
      'verbose',
    );
    expect(query.ids).toEqual(
      expect.arrayContaining(['A.6.3.CR', 'A.6.3.RT', 'E.17.ID.CR']),
    );

    const trace = await runtime.trace(
      'How does same-entity rewrite relate to comparative reading?',
      'proof',
    );
    expect(trace.selectedNodeIds).toEqual(
      expect.arrayContaining(['A.6.3.CR', 'A.6.3.RT', 'E.17.ID.CR']),
    );
    expect(
      trace.frontierCandidates.some(
        (candidate) => candidate.targetId === 'E.17.ID.CR' && candidate.origin === 'lexical',
      ),
    ).toBe(true);
  });

  it('reuses short-lived session context for follow-up retrieval without persisting to disk', async () => {
    await runtime.refresh();

    const first = await runtime.trace('What is U.BoundedContext?', 'compact', false, 's1');
    expect(first.selectedNodeIds).toContain('A.1.1');

    const second = await runtime.trace(
      'How does it connect to role assignment?',
      'proof',
      false,
      's1',
    );
    expect(second.sessionApplied).toBe(true);
    expect(second.sessionReusedNodeIds).toContain('A.1.1');
    expect(second.selectedNodeIds).toEqual(
      expect.arrayContaining(['A.1.1', 'A.2.1', 'A.2.5']),
    );
  });

  it('lists every Draft pattern in Part C grouped by cluster', async () => {
    await runtime.refresh();
    const drafts = await runtime.query(
      'List all Draft patterns in Part C and what family each belongs to.',
      'verbose',
    );

    expect(drafts.status).toBe('ok');
    expect(drafts.answer).toContain('Cluster C.I - Core CALs / LOGs / CHRs:');
    expect(drafts.answer).toContain('C.4 - Method‑CAL');
    expect(drafts.answer).toContain('Cluster C.IV - Composite & Macro-Scale:');
    expect(drafts.ids).toContain('C.15');
  });
});
