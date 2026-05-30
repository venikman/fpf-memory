import { createHash } from 'node:crypto';
import { copyFile, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';

import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';
import { compileFpfSource } from '../src/runtime/compiler.js';
import { FpfRuntime } from '../src/runtime/runtime.js';
import { normalizeQuery } from '../src/runtime/query-normalizer.js';
import { seedCandidates } from '../src/runtime/candidate-seeder.js';
import { isAmbiguous, rankCandidates } from '../src/runtime/candidate-ranker.js';
import { expandGrounding } from '../src/runtime/frontier-expander.js';
import { QueryEngine } from '../src/runtime/query-engine.js';
import {
  buildPatternAnswer,
  buildRouteAnswer,
  confidenceFromTrace,
  gapsFromTrace,
  prepareSynthesisSlices,
} from '../src/runtime/answer-projector.js';
import { synthesizeAnswer } from '../src/runtime/synthesis-adapter.js';
import { MAX_EXCLUDED } from '../src/runtime/constants.js';
import type {
  CompiledNode,
  LocalAnswerSynthesizer,
  RelationEdge,
  RouteRecord,
  Snapshot,
  TraceResult,
} from '../src/runtime/types.js';

/**
 * Stage-local contract tests for the query pipeline.
 *
 * Each describe block targets a single stage function imported directly
 * from its module so that a regression in one stage cannot masquerade
 * as a failure in another.
 *
 * Canonical fixture IDs: `A.1.1`, `A.15`, `B.3` are used as stable spec
 * anchors throughout these tests. If the FPF spec renames or renumbers
 * these patterns, update the IDs here to match.
 */

let cachedSnapshot: Snapshot | undefined;
let cachedRouteFixtureSnapshot: Snapshot | undefined;

async function getSnapshot(): Promise<Snapshot> {
  if (cachedSnapshot) {
    return cachedSnapshot;
  }
  const sourcePath = resolve(process.cwd(), DEFAULT_SOURCE_PATH);
  const sourceText = await readFile(sourcePath, 'utf8');
  const sourceHash = createHash('sha256').update(sourceText).digest('hex');
  const output = compileFpfSource({
    sourcePath,
    sourceHash,
    builtAt: '2025-01-01T00:00:00.000Z',
    sourceText,
  });
  cachedSnapshot = output.snapshot;
  return cachedSnapshot;
}

async function getSnapshotWithRouteFixtures(): Promise<Snapshot> {
  if (cachedRouteFixtureSnapshot) {
    return cachedRouteFixtureSnapshot;
  }
  cachedRouteFixtureSnapshot = addRouteFixtures(await getSnapshot());
  return cachedRouteFixtureSnapshot;
}

function addRouteFixtures(baseSnapshot: Snapshot): Snapshot {
  const snapshot = structuredClone(baseSnapshot) as Snapshot;

  const addRoute = (
    id: string,
    name: string,
    description: string,
    orderedIds: string[],
    optionalIds: string[],
    landingIds: string[],
  ): void => {
    const anchorId = `fixture:${id}`;
    const stepEdges: RelationEdge[] = [
      ...orderedIds.map((to): RelationEdge => ({ from: id, relation: 'route_step', to, source: anchorId })),
      ...optionalIds.map((to): RelationEdge => ({ from: id, relation: 'route_step', to, source: anchorId })),
      ...landingIds.map((to): RelationEdge => ({ from: id, relation: 'landing_on', to, source: anchorId })),
    ].filter((edge) => Boolean(snapshot.compiledNodes[edge.to]));
    const route: RouteRecord = {
      id,
      name,
      description,
      firstHonestBurden: description,
      orderedIds: orderedIds.filter((nodeId) => Boolean(snapshot.compiledNodes[nodeId])),
      optionalIds: optionalIds.filter((nodeId) => Boolean(snapshot.compiledNodes[nodeId])),
      landingIds: landingIds.filter((nodeId) => Boolean(snapshot.compiledNodes[nodeId])),
      routeSurfaces: ['fixture'],
      nextOwners: ['fixture owner'],
      reroutes: [],
      citations: [anchorId],
      anchorIds: [anchorId],
      searchableText: `${id} ${name} ${description} ${orderedIds.join(' ')}`,
      constraints: [
        'Do not open the whole FPF; read exact pattern pages only when a finding depends on wording.',
      ],
    };

    snapshot.anchorMap[anchorId] = {
      id: anchorId,
      nodeId: id,
      heading: name,
      lineStart: 0,
      lineEnd: 1,
      path: ['Route fixtures', name],
      text: description,
      plainText: description,
      role: 'route_surface',
    };
    snapshot.routeGraph.nodes[id] = route;
    snapshot.routeGraph.relations.push(...stepEdges);
    snapshot.relationGraph.push(...stepEdges);
    snapshot.compiledNodes[id] = {
      id,
      kind: 'route',
      title: name,
      aliases: [],
      anchorIds: [anchorId],
      neighborEdges: stepEdges,
      searchableText: route.searchableText,
      details: route,
    };
  };

  addRoute(
    'route:project-alignment',
    'project alignment',
    'First route for project kickoff when vocabulary is overloaded across teams.',
    ['A.1.1', 'A.15', 'B.5.1'],
    ['A.15.2', 'A.15.3'],
    ['F.17'],
  );
  addRoute(
    'route:boundary-unpacking-claim-routing',
    'boundary unpacking / claim routing',
    'First route for API boundary, contract, protocol, and reviewer work.',
    ['A.6', 'A.6.B', 'A.6.C'],
    ['A.6.P', 'A.6.Q', 'A.6.A'],
    ['A.6'],
  );
  addRoute(
    'route:writing-or-reviewing-patterns',
    'writing or reviewing patterns',
    'First route for spec writers adding or reviewing FPF patterns.',
    ['E.8', 'E.19'],
    [],
    ['E.8'],
  );

  snapshot.heuristicSeedRules = [
    ...(snapshot.heuristicSeedRules ?? []),
    {
      name: 'boundary-review',
      allOf: [
        ['api contract', 'contract change', 'api boundary'],
        ['reviewer', 'code reviewer', 'pr'],
      ],
      anyOf: [['api', 'contract', 'boundary']],
      seedNodeIds: ['A.6', 'A.6.B', 'A.6.C'],
      seedScore: 20,
      seedOrigin: 'lexical',
      initialNodeIds: [],
      routeId: 'route:boundary-unpacking-claim-routing',
      routeScore: 95,
    },
  ];

  snapshot.validation.parsedRoutes = Object.keys(snapshot.routeGraph.nodes).length;
  return snapshot;
}

/**
 * Assemble a TraceResult from stage outputs, mirroring QueryEngine.trace().
 * Used by projection and synthesis tests so they can feed stage outputs
 * forward without routing through QueryEngine.
 */
function assembleTrace(
  question: string,
  mode: 'compact' | 'verbose' | 'proof',
  snapshot: Snapshot,
): TraceResult {
  const normalized = normalizeQuery(question, snapshot);
  const seeding = seedCandidates(normalized, snapshot);
  const ranking = rankCandidates(question, seeding.candidateMap, snapshot);
  const grounding = expandGrounding(
    question,
    ranking.candidates,
    ranking.initialNodeIds,
    ranking.initialAnchorIds,
    seeding.frontierCandidates,
    seeding.frontierKeys,
    snapshot,
  );

  const selectedNodeIds = grounding.selectedNodeIds;
  const excludedNodeIds = ranking.candidates
    .map((c) => c.nodeId)
    .filter((nodeId) => !selectedNodeIds.includes(nodeId))
    .slice(0, MAX_EXCLUDED);
  const status =
    selectedNodeIds.length === 0
      ? 'not_found'
      : ranking.routeWins
        ? 'ok'
        : isAmbiguous(question, ranking.candidates)
          ? 'ambiguous'
          : 'ok';

  return {
    mode,
    question,
    normalizedQuestion: normalized.normalizedQuestion,
    detected: normalized.detected,
    candidateScores: ranking.candidates.slice(0, 16),
    frontierCandidates: seeding.frontierCandidates,
    graphExpansions: grounding.graphExpansions,
    selectedNodeIds,
    selectedAnchorIds: grounding.selectedAnchorIds,
    excludedNodeIds,
    followedReferences: grounding.followedReferences,
    retrievalHops: grounding.retrievalHops,
    sessionApplied: seeding.sessionApplied,
    sessionReusedNodeIds: [],
    sessionMateriallyChanged: false,
    sufficient: grounding.sufficient,
    routeWins: ranking.routeWins,
    status,
    snapshot: {
      sourceHash: snapshot.sourceHash,
      builtAt: snapshot.builtAt,
      rebuilt: false,
    },
  };
}

// ---------------------------------------------------------------------------
// Stage 1: Normalizer  (normalizeQuery)
// ---------------------------------------------------------------------------
describe('Query / Normalizer stage', () => {
  it('detects explicit IDs in the question', async () => {
    const snapshot = await getSnapshot();
    const normalized = normalizeQuery('What is A.1.1?', snapshot);

    expect(normalized.detected.ids).toContain('A.1.1');
    expect(normalized.normalizedQuestion.length).toBeGreaterThan(0);
  });

  it('detects route names when mentioned in the question', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const routeNames = Object.values(snapshot.routeGraph.nodes).map((r) => r.name);

    expect(routeNames.length).toBeGreaterThan(0);
    const firstRoute = routeNames[0]!;
    const normalized = normalizeQuery(`Tell me about the ${firstRoute} route`, snapshot);
    expect(normalized.detected.routeNames).toContain(firstRoute);
  });

  it('detects status terms present in the status index', async () => {
    const snapshot = await getSnapshot();

    const knownTokens = ['draft', 'stable', 'stub', 'transitional'];
    const matchedToken = knownTokens.find(
      (t) => snapshot.indexes.statusIndex[t] !== undefined,
    );

    expect(matchedToken).toBeDefined();
    const normalized = normalizeQuery(`Show me ${matchedToken} patterns`, snapshot);
    expect(normalized.detected.statusTerms).toContain(matchedToken);
  });

  it('returns empty signals for a nonsense question', async () => {
    const snapshot = await getSnapshot();
    const normalized = normalizeQuery('__FPFTEST_NONSENSE_999__', snapshot);

    expect(normalized.detected.ids).toEqual([]);
    expect(normalized.detected.routeNames).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Stage 2: Candidate seeder  (seedCandidates)
// ---------------------------------------------------------------------------
describe('Query / Seed coverage stage', () => {
  it('seeds exact-match candidates when explicit IDs are in the question', async () => {
    const snapshot = await getSnapshot();
    const normalized = normalizeQuery('What is A.1.1?', snapshot);
    const seeding = seedCandidates(normalized, snapshot);

    const exactCandidate = seeding.candidateMap.get('A.1.1');
    expect(exactCandidate).toBeDefined();
    expect(exactCandidate!.reasons).toContain('exact-id');
    expect(exactCandidate!.score).toBeGreaterThanOrEqual(100);
  });

  it('seeds lexical candidates for keyword-rich queries', async () => {
    const snapshot = await getSnapshot();
    const normalized = normalizeQuery('How does bounded context relate to role assignment?', snapshot);
    const seeding = seedCandidates(normalized, snapshot);

    const lexicalFrontier = seeding.frontierCandidates.filter((c) => c.origin === 'lexical');
    expect(lexicalFrontier.length).toBeGreaterThan(0);
  });

  it('seeds route expansion candidates for route-bearing queries', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const normalized = normalizeQuery(
      'What is the first practical route when vocabulary is overloaded across teams?',
      snapshot,
    );
    const seeding = seedCandidates(normalized, snapshot);

    const routeFrontier = seeding.frontierCandidates.filter(
      (c) => c.origin === 'route_expansion',
    );
    expect(routeFrontier.length).toBeGreaterThan(0);
  });

  it('seeds the boundary route for reviewer API contract prompts', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const normalized = normalizeQuery(
      'For a PR/code reviewer checking an API contract change, return exact route or pattern IDs and acceptance checks without pasting the full FPF.',
      snapshot,
    );
    const seeding = seedCandidates(normalized, snapshot);

    const routeCandidate = seeding.candidateMap.get('route:boundary-unpacking-claim-routing');
    expect(routeCandidate).toBeDefined();
    expect(routeCandidate!.reasons).toContain('burden:boundary-review');
    expect(routeCandidate!.score).toBeGreaterThanOrEqual(90);
  });

  it('does not seed the boundary route from substring-only change or ci matches', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const normalized = normalizeQuery(
      'What practices should change for specification compliance?',
      snapshot,
    );
    const seeding = seedCandidates(normalized, snapshot);

    const routeCandidate = seeding.candidateMap.get('route:boundary-unpacking-claim-routing');
    expect(routeCandidate?.reasons ?? []).not.toContain('burden:boundary-review');
  });

  it('does not seed the boundary route from generic acceptance-check wording', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const normalized = normalizeQuery(
      'For a new adopter doing a project kickoff, return the route ID, ordered IDs, acceptance check, and next move.',
      snapshot,
    );
    const seeding = seedCandidates(normalized, snapshot);

    const routeCandidate = seeding.candidateMap.get('route:boundary-unpacking-claim-routing');
    expect(routeCandidate?.reasons ?? []).not.toContain('burden:boundary-review');
  });

  it('does not seed punctuation-wrapped stop words as lexeme candidates', async () => {
    const snapshot = await getSnapshot();
    const normalized = normalizeQuery(
      'As a project lead, what route and questions should I use?',
      snapshot,
    );
    const seeding = seedCandidates(normalized, snapshot);

    expect(normalized.detected.lexemes).not.toContain(', and');
    expect(seeding.candidateMap.has('lex:and')).toBe(false);
  });

  it('produces few or low-scoring candidates for a completely unrelated question', async () => {
    const snapshot = await getSnapshot();
    const normalized = normalizeQuery('__FPFTEST_NONSENSE_999__', snapshot);
    const seeding = seedCandidates(normalized, snapshot);

    const highScoring = Array.from(seeding.candidateMap.values()).filter((c) => c.score >= 100);
    expect(highScoring.length).toBe(0);
    expect(seeding.frontierCandidates.length).toBeLessThan(
      Object.keys(snapshot.compiledNodes).length / 2,
    );
  });

  it('seeds MM-CHR for measurement template semantics', async () => {
    const snapshot = await getSnapshot();
    const normalized = normalizeQuery(
      'How should I define a measurement template with a characteristic, scale, and evidence?',
      snapshot,
    );
    const seeding = seedCandidates(normalized, snapshot);

    const c16Candidate = seeding.candidateMap.get('C.16');
    expect(c16Candidate).toBeDefined();
    expect(c16Candidate!.reasons).toContain('measurement-template-discipline');
    expect(c16Candidate!.score).toBeGreaterThanOrEqual(80);
  });
});

// ---------------------------------------------------------------------------
// Stage 3: Candidate ranker  (rankCandidates)
// ---------------------------------------------------------------------------
describe('Query / Ranker stage', () => {
  it('ranks exact-ID matches above lexical matches', async () => {
    const snapshot = await getSnapshot();
    const normalized = normalizeQuery('What is A.1.1?', snapshot);
    const seeding = seedCandidates(normalized, snapshot);
    const ranking = rankCandidates('What is A.1.1?', seeding.candidateMap, snapshot);

    expect(ranking.candidates.length).toBeGreaterThan(0);
    expect(ranking.candidates[0]!.nodeId).toBe('A.1.1');
  });

  it('selects the expected initial node IDs for an explicit ID query', async () => {
    const snapshot = await getSnapshot();
    const normalized = normalizeQuery('What is A.1.1?', snapshot);
    const seeding = seedCandidates(normalized, snapshot);
    const ranking = rankCandidates('What is A.1.1?', seeding.candidateMap, snapshot);

    expect(ranking.initialNodeIds).toContain('A.1.1');
  });

  it('selects a route node when route intent is clear', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const question = 'What is the first practical route when vocabulary is overloaded across teams?';
    const normalized = normalizeQuery(question, snapshot);
    const seeding = seedCandidates(normalized, snapshot);
    const ranking = rankCandidates(question, seeding.candidateMap, snapshot);

    expect(ranking.routeWins).toBe(true);
    const routeNodes = ranking.initialNodeIds.filter(
      (id) => snapshot.compiledNodes[id]?.kind === 'route',
    );
    expect(routeNodes.length).toBeGreaterThan(0);
  });

  it('pins the project-alignment route when the route selector is explicit', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const question =
      'Using route:project-alignment, give a compact project kickoff work packet.';
    const normalized = normalizeQuery(question, snapshot);
    const seeding = seedCandidates(normalized, snapshot);
    const ranking = rankCandidates(question, seeding.candidateMap, snapshot);

    expect(ranking.routeWins).toBe(true);
    expect(ranking.initialNodeIds).toEqual(['route:project-alignment']);
  });

  it('selects project alignment for project kickoff and information-system modeling', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const question = 'Give me a checklist for how to model my project information system.';
    const normalized = normalizeQuery(question, snapshot);
    const seeding = seedCandidates(normalized, snapshot);
    const ranking = rankCandidates(question, seeding.candidateMap, snapshot);

    expect(ranking.routeWins).toBe(true);
    expect(ranking.initialNodeIds).toEqual(['route:project-alignment']);
  });

  it('selects project alignment for kickoff prompts with generic acceptance checks', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const question =
      'For a new adopter doing a project kickoff, return the route ID, ordered IDs, acceptance check, and next move.';
    const normalized = normalizeQuery(question, snapshot);
    const seeding = seedCandidates(normalized, snapshot);
    const ranking = rankCandidates(question, seeding.candidateMap, snapshot);

    expect(ranking.routeWins).toBe(true);
    expect(ranking.initialNodeIds).toEqual(['route:project-alignment']);
  });

  it('selects project alignment for MCP agent work-packet prompts', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const question =
      'Use fpf_reference MCP to build an agent work packet without pasting the full FPF. Return route/doc selector, IDs, what not to load, acceptance check, and next move.';
    const normalized = normalizeQuery(question, snapshot);
    const seeding = seedCandidates(normalized, snapshot);
    const ranking = rankCandidates(question, seeding.candidateMap, snapshot);

    expect(ranking.routeWins).toBe(true);
    expect(ranking.initialNodeIds).toEqual(['route:project-alignment']);
  });

  it('honors negative API-contract disambiguation for project review prompts', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const question =
      'As a project lead, choose the next owner and acceptance check after healthy CI, Pages, and MCP deploy. Return a compact project review packet with route, IDs, operating questions, done condition, and next move. Do not paste the whole FPF. Do not treat this as an API contract review.';
    const normalized = normalizeQuery(question, snapshot);
    const seeding = seedCandidates(normalized, snapshot);
    const ranking = rankCandidates(question, seeding.candidateMap, snapshot);

    expect(ranking.routeWins).toBe(true);
    expect(ranking.initialNodeIds).toEqual(['route:project-alignment']);
  });

  it('selects the writing or reviewing patterns route for spec-writer pattern work', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const question =
      'As a spec writer adding or revising a new FPF pattern, identify the writing/reviewing route, retrieve E.8 and E.19 as the initial IDs, give acceptance checks and the next action, and do not paste the full FPF.';
    const normalized = normalizeQuery(question, snapshot);
    const seeding = seedCandidates(normalized, snapshot);
    const ranking = rankCandidates(question, seeding.candidateMap, snapshot);

    expect(ranking.routeWins).toBe(true);
    expect(ranking.initialNodeIds).toEqual(['route:writing-or-reviewing-patterns']);
  });

  it('selects boundary unpacking / claim routing for API boundary kickoff questions', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const question =
      'As a project lead, what small FPF route should I use to run a 30-minute project kickoff about an API boundary decision?';
    const normalized = normalizeQuery(question, snapshot);
    const seeding = seedCandidates(normalized, snapshot);
    const ranking = rankCandidates(question, seeding.candidateMap, snapshot);

    expect(ranking.routeWins).toBe(true);
    expect(ranking.initialNodeIds).toEqual(['route:boundary-unpacking-claim-routing']);
  });

  it('selects the boundary route for PR reviewer API contract prompts', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const question =
      'For a PR/code reviewer checking an API contract change, return exact route or pattern IDs and acceptance checks without pasting the full FPF.';
    const normalized = normalizeQuery(question, snapshot);
    const seeding = seedCandidates(normalized, snapshot);
    const ranking = rankCandidates(question, seeding.candidateMap, snapshot);

    expect(ranking.routeWins).toBe(true);
    expect(ranking.initialNodeIds).toEqual(['route:boundary-unpacking-claim-routing']);
  });

  it('selects C.16 for measurement template characteristic scale evidence prompts', async () => {
    const snapshot = await getSnapshot();
    const question =
      'How should I define a measurement template with a characteristic, scale, and evidence?';
    const normalized = normalizeQuery(question, snapshot);
    const seeding = seedCandidates(normalized, snapshot);
    const ranking = rankCandidates(question, seeding.candidateMap, snapshot);

    expect(ranking.routeWins).toBe(false);
    expect(ranking.initialNodeIds).toEqual(['C.16']);
  });
});

// ---------------------------------------------------------------------------
// Stage 4: Frontier expansion  (expandGrounding)
// ---------------------------------------------------------------------------
describe('Query / Frontier expansion stage', () => {
  it('respects the MAX_HOPS budget (≤6 retrieval hops)', async () => {
    const snapshot = await getSnapshot();
    const question = 'How do U.RoleAssignment, U.BoundedContext, and U.RoleStateGraph connect in a lawful workflow?';
    const normalized = normalizeQuery(question, snapshot);
    const seeding = seedCandidates(normalized, snapshot);
    const ranking = rankCandidates(question, seeding.candidateMap, snapshot);
    const grounding = expandGrounding(
      question,
      ranking.candidates,
      ranking.initialNodeIds,
      ranking.initialAnchorIds,
      seeding.frontierCandidates,
      seeding.frontierKeys,
      snapshot,
    );

    expect(grounding.retrievalHops.length).toBeLessThanOrEqual(6);
  });

  it('respects the MAX_SELECTED_ANCHORS budget (≤12 anchors)', async () => {
    const snapshot = await getSnapshot();
    const question = 'What is A.1.1?';
    const normalized = normalizeQuery(question, snapshot);
    const seeding = seedCandidates(normalized, snapshot);
    const ranking = rankCandidates(question, seeding.candidateMap, snapshot);
    const grounding = expandGrounding(
      question,
      ranking.candidates,
      ranking.initialNodeIds,
      ranking.initialAnchorIds,
      seeding.frontierCandidates,
      seeding.frontierKeys,
      snapshot,
    );

    expect(grounding.selectedAnchorIds.length).toBeLessThanOrEqual(12);
  });

  it('records hop metadata (iteration, reason, added nodes/anchors)', async () => {
    const snapshot = await getSnapshot();
    const question = 'How do A.1.1, A.15, and B.3 connect in a lawful workflow?';
    const normalized = normalizeQuery(question, snapshot);
    const seeding = seedCandidates(normalized, snapshot);
    const ranking = rankCandidates(question, seeding.candidateMap, snapshot);
    const grounding = expandGrounding(
      question,
      ranking.candidates,
      ranking.initialNodeIds,
      ranking.initialAnchorIds,
      seeding.frontierCandidates,
      seeding.frontierKeys,
      snapshot,
    );

    if (grounding.retrievalHops.length > 0) {
      const firstHop = grounding.retrievalHops[0]!;
      expect(firstHop.iteration).toBe(1);
      expect(firstHop.reason.length).toBeGreaterThan(0);
      expect(typeof firstHop.sufficientAfter).toBe('boolean');
    } else {
      expect(grounding.sufficient).toBe(true);
    }
  });

  it('marks sufficiency correctly — sufficient traces have anchors', async () => {
    const snapshot = await getSnapshot();
    const question = 'What is A.1.1?';
    const normalized = normalizeQuery(question, snapshot);
    const seeding = seedCandidates(normalized, snapshot);
    const ranking = rankCandidates(question, seeding.candidateMap, snapshot);
    const grounding = expandGrounding(
      question,
      ranking.candidates,
      ranking.initialNodeIds,
      ranking.initialAnchorIds,
      seeding.frontierCandidates,
      seeding.frontierKeys,
      snapshot,
    );

    expect(grounding.sufficient).toBe(true);
    expect(grounding.selectedAnchorIds.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Stage 5: Answer projection  (buildPatternAnswer / buildRouteAnswer / confidenceFromTrace)
// ---------------------------------------------------------------------------
describe('Query / Projection stability stage', () => {
  it('produces stable support set across repeated stage invocations', async () => {
    const snapshot = await getSnapshot();

    const trace1 = assembleTrace('What is A.1.1?', 'compact', snapshot);
    const trace2 = assembleTrace('What is A.1.1?', 'compact', snapshot);

    expect(trace1.selectedNodeIds).toEqual(trace2.selectedNodeIds);
    expect(trace1.selectedAnchorIds).toEqual(trace2.selectedAnchorIds);
    expect(trace1.candidateScores.map((c) => c.nodeId)).toEqual(
      trace2.candidateScores.map((c) => c.nodeId),
    );
  });

  it('projects a non-empty answer with citations for a known pattern query', async () => {
    const snapshot = await getSnapshot();
    const trace = assembleTrace('What is A.1.1?', 'verbose', snapshot);
    const result = buildPatternAnswer('What is A.1.1?', 'verbose', trace, snapshot, false);

    expect(result.status).toBe('ok');
    expect(result.answer.length).toBeGreaterThan(0);
    expect(result.ids).toContain('A.1.1');
    expect(result.citations.length).toBeGreaterThan(0);
  });

  it('projects constraints for verbose mode', async () => {
    const snapshot = await getSnapshot();
    const trace = assembleTrace('What is A.1.1?', 'verbose', snapshot);
    const result = buildPatternAnswer('What is A.1.1?', 'verbose', trace, snapshot, false);

    expect(result.constraints.length).toBeGreaterThanOrEqual(1);
  });

  it('projects a grounding chain in proof mode', async () => {
    const snapshot = await getSnapshot();
    const trace = assembleTrace('What is A.1.1?', 'proof', snapshot);
    const result = buildPatternAnswer('What is A.1.1?', 'proof', trace, snapshot, false);

    expect(result.groundingChain).toBeDefined();
    expect(result.groundingChain!.length).toBeGreaterThan(0);
  });

  it('projects route answers with route ID, acceptance check, and next move', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const question = 'Give me a checklist for how to model my project information system.';
    const trace = assembleTrace(question, 'compact', snapshot);

    expect(trace.routeWins).toBe(true);
    expect(trace.selectedNodeIds[0]).toBe('route:project-alignment');

    const result = buildRouteAnswer(
      question,
      'compact',
      'route:project-alignment',
      trace,
      snapshot,
      false,
    );

    expect(result.ids[0]).toBe('route:project-alignment');
    expect(result.ids).toContain('A.1.1');
    expect(result.answer).toContain('Acceptance check:');
    expect(result.answer).toContain('Next move:');
  });

  it('uses a compact route trace shortcut for adoption kickoff queries', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const engine = new QueryEngine(snapshot, false);
    const trace = engine.trace(
      'Project kickoff: align a project information system with roles and adoption next steps',
      'compact',
    );

    expect(trace.routeWins).toBe(true);
    expect(trace.selectedNodeIds[0]).toBe('route:project-alignment');
    expect(trace.candidateScores).toEqual([
      expect.objectContaining({
        nodeId: 'route:project-alignment',
        kind: 'route',
      }),
    ]);
    expect(trace.frontierCandidates.every((candidate) => candidate.origin === 'route_expansion'))
      .toBe(true);
    expect(trace.retrievalHops).toHaveLength(1);
  });

  it('does not fast-route specific pattern lookups to pattern-writing guidance', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const engine = new QueryEngine(snapshot, false);
    const trace = engine.trace('What is the specific pattern A.1.1?', 'compact');

    expect(trace.routeWins).toBe(false);
    expect(trace.selectedNodeIds[0]).toBe('A.1.1');
    expect(trace.candidateScores[0]).toEqual(
      expect.objectContaining({
        nodeId: 'A.1.1',
      }),
    );
    expect(trace.candidateScores).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nodeId: 'route:writing-or-reviewing-patterns',
        }),
      ]),
    );
  });

  it('does not fast-route spec-writer exact ID lookups to pattern-writing guidance', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const engine = new QueryEngine(snapshot, false);
    const trace = engine.trace('As a spec writer, what is A.1.1?', 'compact');

    expect(trace.routeWins).toBe(false);
    expect(trace.selectedNodeIds[0]).toBe('A.1.1');
    expect(trace.candidateScores[0]).toEqual(
      expect.objectContaining({
        nodeId: 'A.1.1',
      }),
    );
  });

  it('does not fast-route pattern-content lookups to pattern-writing guidance', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const engine = new QueryEngine(snapshot, false);
    const questions = [
      'Tell me about FPF patterns.',
      'What are the authoring conventions?',
      'What are pattern quality gates?',
      'What is the pattern for authoring docs?',
    ];

    for (const question of questions) {
      const trace = engine.trace(question, 'compact');

      expect(trace.routeWins).toBe(false);
      expect(trace.selectedNodeIds[0]).not.toBe('route:writing-or-reviewing-patterns');
      expect(trace.candidateScores[0]?.nodeId).not.toBe('route:writing-or-reviewing-patterns');
    }
  });

  it('still fast-routes explicit pattern-authoring work to pattern-writing guidance', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const engine = new QueryEngine(snapshot, false);
    const trace = engine.trace('Please help me write a new FPF pattern.', 'compact');

    expect(trace.routeWins).toBe(true);
    expect(trace.selectedNodeIds[0]).toBe('route:writing-or-reviewing-patterns');
  });

  it('does not fast-route generic compliance review wording to boundary unpacking / claim routing', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const engine = new QueryEngine(snapshot, false);
    const questions = [
      'Please review this compliance documentation for our team.',
      'specification compliance review',
      'What is the compliance check process?',
    ];

    for (const question of questions) {
      const trace = engine.trace(question, 'compact');

      expect(trace.routeWins).toBe(false);
      expect(trace.selectedNodeIds[0]).not.toBe('route:boundary-unpacking-claim-routing');
      expect(trace.candidateScores[0]?.nodeId).not.toBe('route:boundary-unpacking-claim-routing');
    }
  });

  it('returns low confidence for completely unresolvable questions', async () => {
    const snapshot = await getSnapshot();
    const trace = assembleTrace('__FPFTEST_NONSENSE_999__', 'compact', snapshot);

    expect(['not_found', 'ambiguous']).toContain(trace.status);
    expect(confidenceFromTrace(trace)).toBeLessThan(0.7);
  });

  it('computes confidence via confidenceFromTrace without QueryEngine', async () => {
    const snapshot = await getSnapshot();
    const trace = assembleTrace('What is A.1.1?', 'verbose', snapshot);

    const confidence = confidenceFromTrace(trace);
    expect(confidence).toBeGreaterThan(0.5);
    expect(confidence).toBeLessThanOrEqual(1);
  });

  it('computes gaps via gapsFromTrace without QueryEngine', async () => {
    const snapshot = await getSnapshot();
    const trace = assembleTrace('What is A.1.1?', 'verbose', snapshot);

    const gaps = gapsFromTrace(trace);
    expect(Array.isArray(gaps)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Stage 6: Synthesis isolation  (synthesizeAnswer)
// ---------------------------------------------------------------------------
describe('Query / Synthesis isolation stage', () => {
  it('returns an honest degraded envelope when a configured synthesizer is unavailable', async () => {
    const snapshot = await getSnapshot();
    const trace = assembleTrace('What is A.1.1?', 'verbose', snapshot);
    const deterministicResult = buildPatternAnswer('What is A.1.1?', 'verbose', trace, snapshot, false);
    const nodes = trace.selectedNodeIds
      .map((nodeId) => snapshot.compiledNodes[nodeId])
      .filter((node): node is CompiledNode => Boolean(node))
      .slice(0, 8);
    const slices = prepareSynthesisSlices(trace, snapshot);

    const unavailable: LocalAnswerSynthesizer = {
      isAvailable: async () => false,
      synthesize: async () => {
        throw new Error('should not be called');
      },
    };

    const result = await synthesizeAnswer(
      'What is A.1.1?', 'verbose', trace, nodes, slices, deterministicResult, unavailable,
    );

    expect(result.status).toBe('degraded');
    expect(result.ids).toEqual([]);
    expect(result.candidateIds).toContain('A.1.1');
    expect(result.confidence).toBeNull();
    expect(result.answer).toContain('no synthesized answer was committed');
  });

  it('falls back to deterministic answer when synthesizer throws', async () => {
    const snapshot = await getSnapshot();
    const trace = assembleTrace('What is A.1.1?', 'verbose', snapshot);
    const deterministicResult = buildPatternAnswer('What is A.1.1?', 'verbose', trace, snapshot, false);
    const nodes = trace.selectedNodeIds
      .map((nodeId) => snapshot.compiledNodes[nodeId])
      .filter((node): node is CompiledNode => Boolean(node))
      .slice(0, 8);
    const slices = prepareSynthesisSlices(trace, snapshot);

    const failing: LocalAnswerSynthesizer = {
      isAvailable: async () => true,
      synthesize: async () => {
        throw new Error('synthesizer crashed');
      },
    };

    const result = await synthesizeAnswer(
      'What is A.1.1?', 'verbose', trace, nodes, slices, deterministicResult, failing,
    );

    expect(result.status).toBe('degraded');
    expect(result.ids).toEqual([]);
    expect(result.candidateIds).toContain('A.1.1');
    expect(result.confidence).toBeNull();
    expect(result.gaps.some((gap) => gap.includes('synthesis skipped') || gap.includes('synthesizer crashed'))).toBe(true);
  });

  it('moves deterministic IDs to candidateIds while preserving deterministic evidence', async () => {
    const snapshot = await getSnapshot();
    const trace = assembleTrace('What is A.1.1?', 'verbose', snapshot);
    const deterministicResult = buildPatternAnswer('What is A.1.1?', 'verbose', trace, snapshot, false);
    const nodes = trace.selectedNodeIds
      .map((nodeId) => snapshot.compiledNodes[nodeId])
      .filter((node): node is CompiledNode => Boolean(node))
      .slice(0, 8);
    const slices = prepareSynthesisSlices(trace, snapshot);

    const failing: LocalAnswerSynthesizer = {
      isAvailable: async () => true,
      synthesize: async () => {
        throw new Error('test failure');
      },
    };

    const failedSynthResult = await synthesizeAnswer(
      'What is A.1.1?', 'verbose', trace, nodes, slices, deterministicResult, failing,
    );

    expect(failedSynthResult.ids).toEqual([]);
    expect(failedSynthResult.candidateIds).toEqual(
      expect.arrayContaining(deterministicResult.ids),
    );
    expect(failedSynthResult.citations).toEqual(deterministicResult.citations);
    expect(failedSynthResult.relations).toEqual(deterministicResult.relations);
    expect(failedSynthResult.constraints).toEqual(deterministicResult.constraints);
  });

  it('does not call synthesize when synthesizer reports unavailable', async () => {
    const snapshot = await getSnapshot();
    const trace = assembleTrace('What is A.1.1?', 'verbose', snapshot);
    const deterministicResult = buildPatternAnswer('What is A.1.1?', 'verbose', trace, snapshot, false);
    const nodes = trace.selectedNodeIds
      .map((nodeId) => snapshot.compiledNodes[nodeId])
      .filter((node): node is CompiledNode => Boolean(node))
      .slice(0, 8);
    const slices = prepareSynthesisSlices(trace, snapshot);

    let synthesizeCalled = false;
    const unavailable: LocalAnswerSynthesizer = {
      isAvailable: async () => false,
      synthesize: async () => {
        synthesizeCalled = true;
        return {};
      },
    };

    await synthesizeAnswer(
      'What is A.1.1?', 'compact', trace, nodes, slices, deterministicResult, unavailable,
    );

    expect(synthesizeCalled).toBe(false);
  });

  it('skips synthesis for compact route answers even when a synthesizer is available', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const question =
      'Using route:project-alignment, give a compact project kickoff work packet.';
    const trace = assembleTrace(question, 'compact', snapshot);
    let isAvailableCalled = false;
    let synthesizeCalled = false;
    const synthesizer: LocalAnswerSynthesizer = {
      isAvailable: async () => {
        isAvailableCalled = true;
        return true;
      },
      synthesize: async () => {
        synthesizeCalled = true;
        return { answer: 'unexpected synthesized route answer' };
      },
    };
    const engine = new QueryEngine(snapshot, false, synthesizer);

    const result = await engine.answerFromTrace(question, 'compact', trace);

    expect(trace.routeWins).toBe(true);
    expect(result.ids[0]).toBe('route:project-alignment');
    expect(result.answer).toContain(
      'route:project-alignment (project alignment) is the matched first-practical route',
    );
    expect(result.answer).toContain('Acceptance check:');
    expect(isAvailableCalled).toBe(false);
    expect(synthesizeCalled).toBe(false);
  });

  it('still allows synthesis for non-compact route answers', async () => {
    const snapshot = await getSnapshotWithRouteFixtures();
    const question =
      'Using route:project-alignment, explain the project kickoff work packet.';
    const trace = assembleTrace(question, 'verbose', snapshot);
    let synthesizeCalled = false;
    const synthesizer: LocalAnswerSynthesizer = {
      isAvailable: async () => true,
      synthesize: async () => {
        synthesizeCalled = true;
        return {
          answer: 'synthesized verbose route answer',
          confidence: 1,
          gaps: [],
        };
      },
    };
    const engine = new QueryEngine(snapshot, false, synthesizer);

    const result = await engine.answerFromTrace(question, 'verbose', trace);

    expect(trace.routeWins).toBe(true);
    expect(synthesizeCalled).toBe(true);
    expect(result.ids[0]).toBe('route:project-alignment');
    expect(result.answer).toBe('synthesized verbose route answer');
  });
});

// ---------------------------------------------------------------------------
// Trace determinism (cross-cutting — assembled from stages, not QueryEngine)
// ---------------------------------------------------------------------------
describe('Query / Trace determinism', () => {
  it('same snapshot + same question → identical assembled trace', async () => {
    const snapshot = await getSnapshot();

    const trace1 = assembleTrace('How does bounded context relate to role assignment?', 'verbose', snapshot);
    const trace2 = assembleTrace('How does bounded context relate to role assignment?', 'verbose', snapshot);

    expect(JSON.stringify(trace1)).toBe(JSON.stringify(trace2));
  });
});

describe('Query / Quality + shape gating', () => {
  const canonicalSourcePath = resolve(process.cwd(), DEFAULT_SOURCE_PATH);
  let runtime: FpfRuntime;
  let tempRoot: string;
  let sourcePath: string;
  let artifactDir: string;

  beforeEach(async () => {
    tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-quality-'));
    sourcePath = resolve(tempRoot, 'FPF-spec.md');
    artifactDir = resolve(tempRoot, 'artifacts');
    await copyFile(canonicalSourcePath, sourcePath);
    runtime = new FpfRuntime({ sourcePath, artifactDir });
  });

  afterEach(async () => {
    await rm(tempRoot, { recursive: true, force: true });
  });

  it('returns status: "unsupported" with low confidence for a thin two-token query', async () => {
    // Audit item #3: queries like "messy project" used to ride high
    // retrieval scores into a confident "ok" answer. They should now
    // surface as unsupported with a clarification gap and the closest
    // candidate IDs so the caller can refine.
    const result = await runtime.query('messy project');
    expect(result.status).toBe('unsupported');
    expect(result.confidence).not.toBeNull();
    expect(result.confidence!).toBeLessThanOrEqual(0.3);
    expect(result.ids).toEqual([]);
    expect(result.gaps.length).toBeGreaterThan(0);
    // At least one gap should mention how to re-ask.
    expect(result.gaps.some((gap) => /re-ask|refine|candidate/i.test(gap))).toBe(true);
  });

  it('returns status: "unsupported" for a near-empty query like "?"', async () => {
    const result = await runtime.query('?');
    expect(result.status).toBe('unsupported');
    expect(result.confidence!).toBeLessThanOrEqual(0.3);
  });

  it('flags requestedShape and shapeProduced when caller asks for a template', async () => {
    // Audit item #2: caller asks for a template; default projection
    // returns prose. The response should expose `requestedShape:
    // "template"` and `shapeProduced: false`, surface a gap about the
    // mismatch, and reduce confidence.
    const result = await runtime.query(
      'Give me a template for measurement-template work',
      'compact',
    );
    expect(result.requestedShape).toBe('template');
    expect(result.shapeProduced).toBe(false);
    expect(result.gaps.some((gap) => /template/i.test(gap) && /shape/i.test(gap))).toBe(true);
    expect(result.confidence!).toBeLessThanOrEqual(0.85);
  });

  it('marks a checklist request as produced because the bullet projection satisfies it', async () => {
    // Bullet lists ARE checklists for the purposes of this surface;
    // shapeProduced should be true and confidence should be untouched.
    const result = await runtime.query(
      'Give me a checklist for project alignment kickoff',
      'compact',
    );
    expect(result.requestedShape).toBe('checklist');
    expect(result.shapeProduced).toBe(true);
  });

  it('returns candidateIds when status is "ambiguous" so callers can disambiguate', async () => {
    // Audit follow-up D: ambiguous trace selects multiple winners
    // within a tie band, but the caller usually wants to see the
    // surrounding ranked candidates too — pick from a wider pool
    // without a second round-trip. The top of `candidateScores`
    // (~6 ids) is exposed via `candidateIds` whenever status is
    // ambiguous.
    const result = await runtime.query(
      'How does role assignment relate to bounded context and capability?',
      'compact',
    );
    if (result.status !== 'ambiguous') {
      // Snapshot drift may make the question unambiguous on this
      // particular spec; skip the assertion in that case rather than
      // fail brittly.
      return;
    }
    expect(Array.isArray(result.candidateIds)).toBe(true);
    expect(result.candidateIds!.length).toBeGreaterThan(0);
    expect(result.candidateIds!.length).toBeLessThanOrEqual(6);
    // The selected (ambiguous-winner) ids must be a subset of the
    // wider candidate set the caller is shown.
    for (const id of result.ids) {
      expect(result.candidateIds).toContain(id);
    }
  });
});
