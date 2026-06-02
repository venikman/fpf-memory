import {
  scorePatternQuery,
  scoreRouteQuery,
} from './compiler.js';
import type { NormalizedQuery } from './query-normalizer.js';
import { type RetrievalSessionState } from './session-cache.js';
import {
  normalizeForLookup,
  scoreOverlap,
  tokenize,
} from './text.js';
import { BOUNDARY_REVIEW_NEGATIONS } from './spec-heuristics.js';
import type {
  FrontierCandidate,
  FrontierOrigin,
  HeuristicSeedRule,
  Snapshot,
  TraceCandidate,
} from './types.js';

export interface SeedingResult {
  candidateMap: Map<string, TraceCandidate>;
  frontierCandidates: FrontierCandidate[];
  frontierKeys: Set<string>;
  sessionApplied: boolean;
}

export function seedCandidates(
  normalized: NormalizedQuery,
  snapshot: Snapshot,
  sessionState?: RetrievalSessionState,
): SeedingResult {
  const { question, normalizedQuestion, detected, matchedLexemeIds } = normalized;
  const candidateMap = new Map<string, TraceCandidate>();
  const frontierCandidates: FrontierCandidate[] = [];
  const frontierKeys = new Set<string>();

  const addCandidate = (
    nodeId: string,
    delta: number,
    reason: string,
    origin: FrontierOrigin,
  ): void => {
    const node = snapshot.compiledNodes[nodeId];
    if (!node || delta <= 0) {
      return;
    }

    const existing = candidateMap.get(nodeId);
    if (existing) {
      existing.score += delta;
      existing.reasons.push(reason);
    } else {
      candidateMap.set(nodeId, {
        nodeId,
        kind: node.kind,
        score: delta,
        reasons: [reason],
      });
    }

    const frontierKey = `${nodeId}:${origin}:${reason}`;
    if (!frontierKeys.has(frontierKey)) {
      frontierKeys.add(frontierKey);
      frontierCandidates.push({
        targetId: nodeId,
        kind: node.kind,
        reason,
        score: delta,
        origin,
      });
    }
  };

  for (const id of detected.ids) {
    addCandidate(id, 100, 'exact-id', 'exact_match');
  }

  for (const entry of scorePatternQuery(
    question,
    Object.values(snapshot.patternGraph.nodes),
  ).slice(0, 24)) {
    if (entry.score > 0) {
      addCandidate(entry.pattern.id, entry.score, entry.reasons.join(','), 'lexical');
    }
  }

  for (const entry of scoreRouteQuery(
    question,
    Object.values(snapshot.routeGraph.nodes),
  ).slice(0, 12)) {
    if (entry.score > 0) {
      addCandidate(entry.route.id, entry.score, entry.reasons.join(','), 'route_expansion');
    }
  }

  for (const lexemeId of matchedLexemeIds) {
    addCandidate(lexemeId, 45, 'lexeme-match', 'lexical');
    const lexeme = snapshot.lexicon[lexemeId];
    for (const linkedNodeId of lexeme?.linkedNodeIds ?? []) {
      addCandidate(linkedNodeId, 24, `linked-from:${lexeme.canonical}`, 'lexical');
    }
  }

  for (const familyTerm of detected.familyTerms) {
    for (const nodeId of snapshot.indexes.familyIndex[familyTerm] ?? []) {
      addCandidate(nodeId, 12, `family:${familyTerm}`, 'lexical');
    }
  }

  for (const statusTerm of detected.statusTerms) {
    for (const nodeId of snapshot.indexes.statusIndex[statusTerm] ?? []) {
      addCandidate(nodeId, 10, `status:${statusTerm}`, 'lexical');
    }
  }

  addIndexDescriptionCandidates(question, snapshot, addCandidate);
  addHeuristicSeeds(normalizedQuestion, snapshot, addCandidate);

  const sessionApplied = shouldApplySessionContext(normalizedQuestion, detected.ids, sessionState);
  if (sessionApplied) {
    for (const nodeId of sessionState?.lastSelectedNodeIds ?? []) {
      addCandidate(nodeId, 18, 'session:recent-selection', 'session_context');
    }
    if (sessionState?.lastSelectedRouteId) {
      addCandidate(sessionState.lastSelectedRouteId, 20, 'session:recent-route', 'session_context');
    }
    for (const nodeId of sessionState?.recentUnresolvedNodeIds ?? []) {
      addCandidate(nodeId, 8, 'session:unresolved-neighbor', 'session_context');
    }
  }

  return { candidateMap, frontierCandidates, frontierKeys, sessionApplied };
}

function addIndexDescriptionCandidates(
  question: string,
  snapshot: Snapshot,
  addCandidate: (nodeId: string, delta: number, reason: string, origin: FrontierOrigin) => void,
): void {
  const queryTokens = tokenize(question);
  const normalizedQ = normalizeForLookup(question);
  const bestByTarget = new Map<string, { score: number; reason: string }>();
  for (const indexNode of Object.values(snapshot.indexMap)) {
    const targetId = indexNode.metadata?.patternId;
    if (!targetId || !snapshot.compiledNodes[targetId]) {
      continue;
    }

    let score = scoreOverlap(
      queryTokens,
      `${indexNode.title} ${indexNode.description} ${indexNode.path.join(' ')}`,
    );
    const normalizedDescription = normalizeForLookup(indexNode.description);
    if (
      normalizedDescription &&
      normalizedDescription.length > 8 &&
      normalizedQ.includes(normalizedDescription)
    ) {
      score += 18;
    }
    if (indexNode.metadata.routeBearing) {
      score += 2;
    }
    if (score <= 0) {
      continue;
    }

    const existing = bestByTarget.get(targetId);
    if (!existing || score > existing.score) {
      bestByTarget.set(targetId, {
        score,
        reason: `index:${indexNode.id}`,
      });
    }
  }

  for (const [targetId, best] of bestByTarget.entries()) {
    addCandidate(targetId, best.score, best.reason, 'lexical');
  }
}

function matchesSeedRule(normalizedQuestion: string, rule: HeuristicSeedRule): boolean {
  const queryTokens = new Set(tokenize(normalizedQuestion));
  const matchesTerm = (term: string): boolean => {
    const termTokens = tokenize(term);
    if (termTokens.length > 0) {
      return termTokens.every((token) => queryTokens.has(token));
    }
    return term.length > 0 && normalizedQuestion.includes(term);
  };
  const matchesGroup = (alternatives: string[]): boolean => alternatives.some(matchesTerm);
  return (
    rule.allOf.every(matchesGroup) &&
    rule.anyOf.some(matchesGroup)
  );
}

function hasBoundaryReviewNegation(normalizedQuestion: string): boolean {
  return BOUNDARY_REVIEW_NEGATIONS.some((phrase) => normalizedQuestion.includes(phrase));
}

function addHeuristicSeeds(
  normalizedQuestion: string,
  snapshot: Snapshot,
  addCandidate: (nodeId: string, delta: number, reason: string, origin: FrontierOrigin) => void,
): void {
  for (const rule of snapshot.heuristicSeedRules ?? []) {
    if (rule.name === 'boundary-review' && hasBoundaryReviewNegation(normalizedQuestion)) {
      continue;
    }
    if (!matchesSeedRule(normalizedQuestion, rule)) {
      continue;
    }
    if (rule.routeId !== undefined && rule.routeScore !== undefined) {
      addCandidate(rule.routeId, rule.routeScore, `burden:${rule.name}`, 'route_expansion');
    }
    for (const nodeId of rule.seedNodeIds) {
      addCandidate(nodeId, rule.seedScore, rule.name, rule.seedOrigin);
    }
  }
}

function shouldApplySessionContext(
  normalizedQuestion: string,
  detectedIds: string[],
  sessionState?: RetrievalSessionState,
): boolean {
  if (!sessionState) {
    return false;
  }

  const hasPriorSelection =
    sessionState.lastSelectedNodeIds.length > 0;
  if (!hasPriorSelection) {
    return false;
  }

  if (/\bit\b|\bthat\b|\bthose\b|\bthem\b/.test(normalizedQuestion)) {
    return true;
  }

  return detectedIds.length === 0 && isImplicitSessionFollowUp(normalizedQuestion);
}

const IMPLICIT_FOLLOW_UP_TOKENS = new Set([
  'about',
  'also',
  'clarify',
  'continue',
  'definition',
  'detail',
  'details',
  'elaborate',
  'example',
  'examples',
  'explain',
  'me',
  'more',
  'show',
  'summarize',
  'summary',
  'tell',
]);

function isImplicitSessionFollowUp(normalizedQuestion: string): boolean {
  const tokens = tokenize(normalizedQuestion);
  return (
    tokens.length > 0 &&
    tokens.length <= 4 &&
    tokens.every((token) => IMPLICIT_FOLLOW_UP_TOKENS.has(token))
  );
}
