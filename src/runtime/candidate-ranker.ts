import {
  selectBestAnchors,
} from './compiler.js';
import {
  extractIds,
  normalizeForLookup,
  unique,
} from './text.js';
import type {
  HeuristicSeedRule,
  Snapshot,
  TraceCandidate,
} from './types.js';

export interface RankingResult {
  candidates: TraceCandidate[];
  routeWins: boolean;
  initialNodeIds: string[];
  initialAnchorIds: string[];
}

import { MAX_SELECTED_ANCHORS } from './constants.js';

export function rankCandidates(
  question: string,
  candidateMap: Map<string, TraceCandidate>,
  snapshot: Snapshot,
): RankingResult {
  const normalizedQuestion = normalizeForLookup(question);
  const detectedIds = extractIds(question);
  const candidates = sortCandidates(candidateMap);

  const routeCandidate = candidates.find((candidate) => candidate.kind === 'route');
  const bestPattern = candidates.find((candidate) => candidate.kind === 'pattern');
  const routeWins = doesRouteWin(normalizedQuestion, routeCandidate, bestPattern);
  const heuristicIds = heuristicInitialNodeIds(normalizedQuestion, snapshot);
  const initialNodeIds = routeWins
    ? (routeCandidate ? [routeCandidate.nodeId] : [])
    : heuristicIds.length > 0
      ? heuristicIds
      : selectInitialPatternNodes(question, candidates, detectedIds, snapshot);
  const initialAnchorIds = routeWins
    ? selectRouteAnchors(routeCandidate?.nodeId, snapshot)
    : selectPatternAnchors(question, initialNodeIds, snapshot);

  return { candidates, routeWins, initialNodeIds, initialAnchorIds };
}

export function isAmbiguous(question: string, candidates: TraceCandidate[]): boolean {
  const explicitIds = extractIds(question);
  if (explicitIds.length > 0) {
    return false;
  }
  const patterns = candidates.filter((candidate) => candidate.kind === 'pattern');
  if (patterns.length < 2) {
    return false;
  }
  const top = patterns[0]!;
  const runnerUp = patterns[1]!;
  return top.score - runnerUp.score <= 1;
}

function sortCandidates(candidateMap: Map<string, TraceCandidate>): TraceCandidate[] {
  return Array.from(candidateMap.values()).sort((left, right) => {
    if (right.score !== left.score) {
      return right.score - left.score;
    }
    if (left.kind !== right.kind) {
      if (left.kind === 'pattern') {
        return -1;
      }
      if (right.kind === 'pattern') {
        return 1;
      }
    }
    return left.nodeId.localeCompare(right.nodeId);
  });
}

function doesRouteWin(
  normalizedQuestion: string,
  routeCandidate?: TraceCandidate,
  bestPattern?: TraceCandidate,
): boolean {
  if (!routeCandidate) {
    return false;
  }

  const routeIntent =
    normalizedQuestion.includes('route') ||
    normalizedQuestion.includes('where to start') ||
    normalizedQuestion.includes('first route') ||
    normalizedQuestion.includes('overloaded') ||
    normalizedQuestion.includes('across teams') ||
    normalizedQuestion.includes('burden');

  const routeHasAdoptionIntent = routeCandidate.reasons.some((reason) =>
    reason.includes('adoption-route-intent'),
  );
  if (routeIntent && routeHasAdoptionIntent && routeCandidate.score >= 80) {
    return true;
  }

  if (routeIntent) {
    return routeCandidate.score >= (bestPattern?.score ?? 0) - 4;
  }

  return routeCandidate.score >= (bestPattern?.score ?? 0) + 10;
}

function matchesSeedRule(normalizedQuestion: string, rule: HeuristicSeedRule): boolean {
  const matchesGroup = (alternatives: string[]): boolean =>
    alternatives.some((term) => term.length > 0 && normalizedQuestion.includes(term));
  return (
    rule.allOf.every(matchesGroup) &&
    rule.anyOf.some(matchesGroup)
  );
}

function heuristicInitialNodeIds(normalizedQuestion: string, snapshot: Snapshot): string[] {
  for (const rule of snapshot.heuristicSeedRules ?? []) {
    if (rule.initialNodeIds.length === 0) {
      continue;
    }
    if (!matchesSeedRule(normalizedQuestion, rule)) {
      continue;
    }
    return rule.initialNodeIds.filter((nodeId) =>
      Boolean(snapshot.patternGraph.nodes[nodeId]),
    );
  }
  return [];
}

function selectInitialPatternNodes(
  question: string,
  candidates: TraceCandidate[],
  detectedIds: string[],
  snapshot: Snapshot,
): string[] {
  const explicitPatterns = detectedIds.filter((id) => snapshot.patternGraph.nodes[id]);
  if (explicitPatterns.length > 0) {
    return unique(explicitPatterns);
  }

  const selected: string[] = [];
  const normalizedQuestion = normalizeForLookup(question);
  const questionWantsRelations =
    normalizedQuestion.includes('workflow') ||
    normalizedQuestion.includes('connect') ||
    normalizedQuestion.includes('relation');
  const budget = questionWantsRelations || detectedIds.length > 1 ? 3 : 2;
  for (const candidate of candidates) {
    if (candidate.kind !== 'pattern') {
      continue;
    }
    selected.push(candidate.nodeId);
    if (selected.length >= budget) {
      break;
    }
  }

  return unique(selected);
}

function selectRouteAnchors(routeNodeId: string | undefined, snapshot: Snapshot): string[] {
  if (!routeNodeId) {
    return [];
  }
  const route = snapshot.routeGraph.nodes[routeNodeId];
  return route ? unique(route.anchorIds).slice(0, MAX_SELECTED_ANCHORS) : [];
}

function selectPatternAnchors(question: string, nodeIds: string[], snapshot: Snapshot): string[] {
  const anchorIds: string[] = [];
  for (const nodeId of nodeIds) {
    const pattern = snapshot.patternGraph.nodes[nodeId];
    if (!pattern) {
      continue;
    }
    anchorIds.push(
      ...selectBestAnchors(question, pattern, snapshot.anchorMap).map((anchor) => anchor.id),
    );
  }
  return unique(anchorIds).slice(0, MAX_SELECTED_ANCHORS);
}
