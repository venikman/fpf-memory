import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';
import { compileFpfSource } from '../src/runtime/compiler.js';
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
import type { CompiledNode, LocalAnswerSynthesizer, Snapshot, TraceResult } from '../src/runtime/types.js';

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
    const snapshot = await getSnapshot();
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
    const snapshot = await getSnapshot();
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
    const snapshot = await getSnapshot();
    const normalized = normalizeQuery(
      'For a PR/code reviewer checking an API contract change, return exact route or pattern IDs and acceptance checks without pasting the full FPF.',
      snapshot,
    );
    const seeding = seedCandidates(normalized, snapshot);

    const routeCandidate = seeding.candidateMap.get('route:boundary-burden');
    expect(routeCandidate).toBeDefined();
    expect(routeCandidate!.reasons).toContain('burden:boundary-review');
    expect(routeCandidate!.score).toBeGreaterThanOrEqual(90);
  });

  it('does not seed the boundary route from substring-only change or ci matches', async () => {
    const snapshot = await getSnapshot();
    const normalized = normalizeQuery(
      'What practices should change for specification compliance?',
      snapshot,
    );
    const seeding = seedCandidates(normalized, snapshot);

    const routeCandidate = seeding.candidateMap.get('route:boundary-burden');
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
    const snapshot = await getSnapshot();
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
    const snapshot = await getSnapshot();
    const question =
      'Using route:project-alignment, give a compact project kickoff work packet.';
    const normalized = normalizeQuery(question, snapshot);
    const seeding = seedCandidates(normalized, snapshot);
    const ranking = rankCandidates(question, seeding.candidateMap, snapshot);

    expect(ranking.routeWins).toBe(true);
    expect(ranking.initialNodeIds).toEqual(['route:project-alignment']);
  });

  it('selects project alignment for project kickoff and information-system modeling', async () => {
    const snapshot = await getSnapshot();
    const question = 'Give me a checklist for how to model my project information system.';
    const normalized = normalizeQuery(question, snapshot);
    const seeding = seedCandidates(normalized, snapshot);
    const ranking = rankCandidates(question, seeding.candidateMap, snapshot);

    expect(ranking.routeWins).toBe(true);
    expect(ranking.initialNodeIds).toEqual(['route:project-alignment']);
  });

  it('selects boundary burden for API boundary kickoff questions', async () => {
    const snapshot = await getSnapshot();
    const question =
      'As a project lead, what small FPF route should I use to run a 30-minute project kickoff about an API boundary decision?';
    const normalized = normalizeQuery(question, snapshot);
    const seeding = seedCandidates(normalized, snapshot);
    const ranking = rankCandidates(question, seeding.candidateMap, snapshot);

    expect(ranking.routeWins).toBe(true);
    expect(ranking.initialNodeIds).toEqual(['route:boundary-burden']);
  });

  it('selects the boundary route for PR reviewer API contract prompts', async () => {
    const snapshot = await getSnapshot();
    const question =
      'For a PR/code reviewer checking an API contract change, return exact route or pattern IDs and acceptance checks without pasting the full FPF.';
    const normalized = normalizeQuery(question, snapshot);
    const seeding = seedCandidates(normalized, snapshot);
    const ranking = rankCandidates(question, seeding.candidateMap, snapshot);

    expect(ranking.routeWins).toBe(true);
    expect(ranking.initialNodeIds).toEqual(['route:boundary-burden']);
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
    const snapshot = await getSnapshot();
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
    const snapshot = await getSnapshot();
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
  it('returns deterministic answer when synthesizer is unavailable', async () => {
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

    expect(result.status).toBe('ok');
    expect(result.ids).toContain('A.1.1');
    expect(result.answer.length).toBeGreaterThan(0);
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

    expect(result.status).toBe('ok');
    expect(result.ids).toContain('A.1.1');
    expect(result.gaps.some((gap) => gap.includes('synthesis skipped') || gap.includes('synthesizer crashed'))).toBe(true);
  });

  it('does not alter deterministic IDs or citations when synthesis fails', async () => {
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

    expect(failedSynthResult.ids).toEqual(deterministicResult.ids);
    expect(failedSynthResult.citations).toEqual(deterministicResult.citations);
    expect(failedSynthResult.relations).toEqual(deterministicResult.relations);
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
    const snapshot = await getSnapshot();
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
    const snapshot = await getSnapshot();
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
