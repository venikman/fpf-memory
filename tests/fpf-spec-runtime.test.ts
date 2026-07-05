import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
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

const SNAPSHOT_REUSE_TEST_TIMEOUT_MS = 70_000;

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

  // This exercises initial build, current-snapshot reuse, artifact backfill,
  // source-hash rebuild, and forced rebuild. Large upstream specs can push the
  // chain past Rstest's default 20s timeout on GitHub runners.
  it(
    'builds a local artifact set and reuses the snapshot when the source hash is unchanged',
    async () => {
      const first = await runtime.refresh();
      expect(first.rebuilt).toBe(true);
      expect(first.reason).toBe('missing_snapshot');
      expect(first.compiler.mode).toBe('local_vectorless');
      expect(first.validation.parsedPatterns).toBeGreaterThan(50);
      expect(first.validation.parsedRoutes).toBe(first.compiler.routeNodes);
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

      const snapshot = await readArtifact<{
        relationGraph: Array<{ from: string; relation: string; to: string }>;
      }>(ARTIFACT_FILENAMES.snapshot);
      expect(
        snapshot.relationGraph.some(
          (edge) =>
            edge.from === 'A.15' && edge.relation === 'outline_child' && edge.to === 'A.15.2',
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
    },
    SNAPSHOT_REUSE_TEST_TIMEOUT_MS,
  );

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

  it('seeds a writable artifact directory from a staged read-only snapshot', async () => {
    const seededArtifactDir = resolve(tempRoot, 'seeded-artifacts');
    const artifactSeedDir = resolve(tempRoot, 'hosted/fpf-index');
    await mkdir(artifactSeedDir, { recursive: true });
    await copyFile(
      resolve(process.cwd(), 'published/current/fpf-index/snapshot.json'),
      resolve(artifactSeedDir, ARTIFACT_FILENAMES.snapshot),
    );

    const seededRuntime = new FpfRuntime({
      sourcePath: DEFAULT_SOURCE_PATH,
      artifactDir: seededArtifactDir,
      artifactSeedDir,
    });
    const audit = await seededRuntime.refresh();

    expect(audit.rebuilt).toBe(false);
    expect(audit.reason).toBe('snapshot_current');
    expect(await readFile(resolve(seededArtifactDir, ARTIFACT_FILENAMES.snapshot), 'utf8')).toContain(
      '"sourceHash"',
    );
    expect(await readFile(resolve(seededArtifactDir, ARTIFACT_FILENAMES.indexingView), 'utf8')).toContain(
      '"patterns"',
    );
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

    // Upstream (2026-07-03 sync) renamed A.2.5 from "U.RoleStateGraph" to
    // "RoleStateRelation@BoundedContext", so the exact-lexeme query above no
    // longer surfaces it. Use the natural-language phrasing so retrieval still
    // recovers all three lawful-workflow role patterns.
    const roleWorkflow = await runtime.query(
      'How do role assignment, bounded context, and role state relations connect in a lawful workflow?',
      'verbose',
    );
    expect(roleWorkflow.ids).toEqual(
      expect.arrayContaining(['A.2.1', 'A.1.1', 'A.2.5']),
    );

    const routes = await runtime.browse({ kind: 'route' });
    const projectReview = await runtime.query(
      'Which FPF route or patterns should guide project review work?',
      'compact',
    );
    expect(projectReview.status).toBe('ok');
    const routeIds = new Set(routes.entries.map((entry) => entry.id));
    if (routeIds.has('route:project-alignment')) {
      expect(projectReview.ids).toEqual(
        expect.arrayContaining(['route:project-alignment', 'A.1.1', 'A.15']),
      );
    } else {
      expect(projectReview.ids.every((id) => !id.startsWith('route:'))).toBe(true);
    }
    expect(projectReview.answer.length).toBeGreaterThan(0);
    expect(projectReview.citations.length).toBeGreaterThan(0);

    const agentWorkflow = await runtime.query(
      'How should I use FPF for agent workflow adoption without pasting the whole spec?',
      'compact',
    );
    if (routeIds.has('route:project-alignment')) {
      expect(agentWorkflow.status).toBe('ok');
      expect(agentWorkflow.ids).toEqual(
        expect.arrayContaining(['route:project-alignment', 'A.1.1', 'A.15']),
      );
      expect(agentWorkflow.answer).toContain('route:project-alignment');
    } else {
      expect(['ok', 'ambiguous']).toContain(agentWorkflow.status);
      expect(agentWorkflow.ids.every((id) => !id.startsWith('route:'))).toBe(true);
    }
    expect(agentWorkflow.answer.length).toBeGreaterThan(0);
    expect(agentWorkflow.citations.length).toBeGreaterThan(0);

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

  it('returns the project-alignment route from the public adoption overlay', async () => {
    await runtime.refresh();
    const routes = await runtime.browse({ kind: 'route' });
    const routeIds = new Set(routes.entries.map((entry) => entry.id));
    if (!routeIds.has('route:project-alignment')) {
      const missing = await runtime.readDoc('route:project-alignment', 'route');
      expect(missing.status).toBe('not_found');
      expect(missing.resolvedAs).toBe('not_found');
      return;
    }
    const route = await runtime.query(
      'What is the recommended first route when vocabulary is overloaded across teams?',
      'proof',
    );

    expect(route.status).toBe('ok');
    expect(route.ids[0]).toBe('route:project-alignment');
    expect(route.ids[1]).toBe('A.1.1');
    expect(route.ids[2]).toBe('A.15');
    expect(route.ids.slice(1, 6)).toContain('B.5.1');
    expect(route.ids.slice(1, 6).some((id) => id === 'A.15.2' || id === 'A.15.3')).toBe(
      true,
    );
    expect(route.ids).toContain('F.17');
    expect(route.answer).toContain('Acceptance check:');
    expect(route.answer).toContain('Next move:');
    expect(route.citations).toContain('fpf-reference-adoption-overlay:project-alignment');

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

  it('returns the boundary unpacking route for PR reviewer API contract prompts', async () => {
    await runtime.refresh();
    const routes = await runtime.browse({ kind: 'route' });
    const routeIds = new Set(routes.entries.map((entry) => entry.id));
    const question =
      'For a PR/code reviewer checking an API contract change, return exact route or pattern IDs and acceptance checks without pasting the full FPF.';
    const route = await runtime.query(question, 'compact');

    if (!routeIds.has('route:boundary-unpacking')) {
      expect(['ok', 'ambiguous']).toContain(route.status);
      expect(route.ids.every((id) => !id.startsWith('route:'))).toBe(true);
      expect(route.ids).toContain('A.6');
      expect(route.answer.length).toBeGreaterThan(0);
      const trace = await runtime.trace(question, 'compact');
      expect(trace.routeWins).toBe(false);
      expect(trace.selectedNodeIds.every((id) => !id.startsWith('route:'))).toBe(true);
      return;
    }

    expect(route.status).toBe('ok');
    expect(route.ids.slice(0, 4)).toEqual([
      'route:boundary-unpacking',
      'A.6',
      'A.6.B',
      'A.6.C',
    ]);
    // The boundary route lands the full A.6 claim-unpacking family as
    // structured IDs, including the conditional adds A.6.P / C.16.Q / A.6.A.
    expect(route.ids).toContain('C.16.Q');
    expect(route.answer).toContain('route:boundary-unpacking');
    expect(route.constraints).toContain(
      'Do not open the whole FPF; read exact pattern pages only when a finding depends on wording.',
    );

    const ask = renderAskFpfResult(route);
    expect(ask.ids.slice(0, 4)).toEqual([
      'route:boundary-unpacking',
      'A.6',
      'A.6.B',
      'A.6.C',
    ]);
    expect(ask.markdown).toContain('route:boundary-unpacking');

    const trace = await runtime.trace(question, 'compact');
    expect(trace.status).toBe('ok');
    expect(trace.routeWins).toBe(true);
    expect(trace.selectedNodeIds).toContain('route:boundary-unpacking');
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
    expect(readById.markdown).toContain('# U.BoundedContext Semantic Frame');
    // Default-mode response carries metadata so callers can decide
    // whether to re-fetch with maxChars or follow the docRef link.
    expect(readById.markdownChars).toBe(readById.markdown!.length);
    expect(Array.isArray(readById.headings)).toBe(true);
    expect(readById.headings!.length).toBeGreaterThan(0);

    // Preview mode omits the full body, exposes a short text snippet
    // and the same headings outline.
    const previewById = await runtime.readDoc('A.1.1', 'id', { mode: 'preview' });
    expect(previewById.status).toBe('ok');
    expect(previewById.markdown).toBeUndefined();
    expect(previewById.markdownChars).toBe(readById.markdownChars);
    expect(previewById.headings).toEqual(readById.headings);
    expect(typeof previewById.preview).toBe('string');
    expect(previewById.preview!.length).toBeGreaterThan(0);
    expect(previewById.preview!.length).toBeLessThanOrEqual(400);

    // maxChars truncates the body, signals truncation, and keeps
    // markdownChars as the FULL pre-truncation size.
    const cappedById = await runtime.readDoc('A.1.1', 'id', { maxChars: 500 });
    expect(cappedById.status).toBe('ok');
    expect(cappedById.markdown!.length).toBeLessThanOrEqual(550);
    expect(cappedById.truncated).toBe(true);
    expect(cappedById.markdownChars).toBe(readById.markdown!.length);

    const routes = await runtime.browse({ kind: 'route' });
    const routeIds = new Set(routes.entries.map((entry) => entry.id));
    if (routeIds.has('route:project-alignment')) {
      const readByRoute = await runtime.readDoc('project alignment', 'route');
      expect(readByRoute.status).toBe('ok');
      expect(readByRoute.nodeId).toBe('route:project-alignment');
      expect(readByRoute.docRef?.markdownPath).toBe(
        'docs/generated/routes/route_project-alignment.md',
      );
      expect(readByRoute.markdown).toContain('# project alignment');

      const readByRouteId = await runtime.readDoc('route:project-alignment', 'route');
      expect(readByRouteId.status).toBe('ok');
      expect(readByRouteId.resolvedAs).toBe('route');
      expect(readByRouteId.nodeId).toBe('route:project-alignment');
      expect(readByRouteId.docRef?.markdownPath).toBe(
        'docs/generated/routes/route_project-alignment.md',
      );
    } else {
      const readByRouteId = await runtime.readDoc('route:project-alignment', 'route');
      expect(readByRouteId.status).toBe('not_found');
      expect(readByRouteId.resolvedAs).toBe('not_found');
    }

    const readByLexeme = await runtime.readDoc('U.BoundedContext', 'lexeme');
    expect(readByLexeme.status).toBe('ok');
    expect(readByLexeme.nodeId).toBe('A.1.1');
    expect(readByLexeme.docRef?.markdownPath).toBe('docs/generated/patterns/A.1.1.md');
    expect(readByLexeme.markdown).toContain('# U.BoundedContext Semantic Frame');

    const inspectAnchor = await runtime.inspectAnchor(inspectById.anchors[0]!.id);
    expect(inspectAnchor.status).toBe('ok');
    expect(inspectAnchor.anchor?.id).toBe(inspectById.anchors[0]!.id);
    expect(inspectAnchor.ownerNode?.id).toBe('A.1.1');
    expect(inspectAnchor.neighbors).toEqual(inspectById.neighbors);

    if (routeIds.has('route:project-alignment')) {
      const inspectSyntheticAnchor = await runtime.inspectAnchor(
        'fpf-reference-adoption-overlay:project-alignment',
      );
      expect(inspectSyntheticAnchor.status).toBe('ok');
      expect(inspectSyntheticAnchor.ownerNode?.kind).toBe('route');
    }

    // A.2.5 was renamed away from "U.RoleStateGraph" in the 2026-07-03 sync;
    // use the natural-language phrasing so all three role patterns are
    // recovered (see the query-based test above).
    const trace = await runtime.trace(
      'How do role assignment, bounded context, and role state relations connect in a lawful workflow?',
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
    expect(status.sessionCache.enabled).toBe(true);
    for (const key of Object.keys(ARTIFACT_FILENAMES)) {
      expect(status.artifacts[key]).toBe(true);
    }
  }, 40_000);

  it('expands citations in batch without changing single-anchor semantics', async () => {
    await runtime.refresh();

    const inspectById = await runtime.inspect('A.1.1', 'id');
    const citationId = inspectById.anchors[0]!.id;
    const syntheticCitationId = 'fpf-reference-adoption-overlay:project-alignment';
    const routes = await runtime.browse({ kind: 'route' });
    const routeIds = new Set(routes.entries.map((entry) => entry.id));
    const citationIds =
      routeIds.has('route:project-alignment')
        ? [citationId, syntheticCitationId, citationId, 'missing-citation']
        : [citationId, citationId, 'missing-citation'];

    const originalRefresh = runtime.refresh.bind(runtime);
    let refreshCalls = 0;
    (runtime as { refresh: typeof runtime.refresh }).refresh = async (...args) => {
      refreshCalls += 1;
      return originalRefresh(...args);
    };
    const expanded = await runtime.expandCitations(citationIds);

    expect(refreshCalls).toBe(1);
    expect(expanded.citationIds).toEqual(citationIds);
    expect(expanded.items.map((item) => item.citationId)).toEqual(expanded.citationIds);
    expect(expanded.items[0]?.status).toBe('ok');
    const hasProjectAlignmentRoute = routeIds.has('route:project-alignment');
    const duplicateIndex = hasProjectAlignmentRoute ? 2 : 1;
    const missingIndex = hasProjectAlignmentRoute ? 3 : 2;
    if (hasProjectAlignmentRoute) {
      expect(expanded.items[1]?.status).toBe('ok');
    }
    expect(expanded.items[duplicateIndex]?.status).toBe('ok');
    expect(expanded.items[missingIndex]).toEqual({
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
    if (hasProjectAlignmentRoute) {
      expect(expanded.items[1]?.ownerNode?.kind).toBe('route');
    }
    expect(expanded.items[duplicateIndex]).toEqual(expanded.items[0]);
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

  it('reuses session context for low-information implicit follow-up prompts', async () => {
    await runtime.refresh();

    const sessionId = 's-implicit-followup';
    const first = await runtime.trace('What is U.BoundedContext?', 'compact', false, sessionId);
    expect(first.selectedNodeIds).toContain('A.1.1');

    const followup = await runtime.trace('Show examples', 'proof', false, sessionId);

    expect(followup.sessionApplied).toBe(true);
    expect(followup.sessionReusedNodeIds).toContain('A.1.1');
    expect(followup.selectedNodeIds).toContain('A.1.1');
  });

  it('does not let unrelated session context change top retrieval IDs', async () => {
    await runtime.refresh();

    const sessionId = 's-unrelated';
    await runtime.query('What is C.16 measurement template discipline?', 'compact', false, sessionId);

    const questions = [
      'How does evidence graph preserve provenance?',
      'Also, what is a holon?',
      'How does evidence graph connect to provenance?',
    ];

    for (const question of questions) {
      const fresh = await runtime.trace(question, 'verbose');
      const sessioned = await runtime.trace(question, 'verbose', false, sessionId);

      expect(sessioned.sessionApplied).toBe(false);
      expect(sessioned.selectedNodeIds).toEqual(fresh.selectedNodeIds);
      expect(sessioned.candidateScores.map((candidate) => candidate.nodeId)).toEqual(
        fresh.candidateScores.map((candidate) => candidate.nodeId),
      );
    }
  });

  it('answers the Part C Draft listing route grouped by cluster', async () => {
    await runtime.refresh();
    const drafts = await runtime.query(
      'List all Draft patterns in Part C and what family each belongs to.',
      'verbose',
    );

    // The structured Part C Draft listing route still resolves and groups by
    // cluster. Upstream (2026-07-03 sync, ref f7c7e93f) retired the "Draft"
    // status vocabulary entirely — every published pattern is now "Stable" or
    // "Planned" — so the route correctly reports no members under each
    // cluster instead of the former C.4 / C.15 Draft rows.
    expect(drafts.status).toBe('ok');
    expect(drafts.answer).toContain('Cluster C.I - Core CALs / LOGs / CHRs:');
    expect(drafts.answer).toContain('Cluster C.IV - Composite & Macro-Scale:');
    expect(drafts.answer).toContain('- none');
    expect(drafts.ids).toHaveLength(0);
  });
});
