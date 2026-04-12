import {
  findLexemeMatches,
  formatAnchorSentences,
  getPartCDraftsByCluster,
  isPartCDraftQuery,
  scorePatternQuery,
  scoreRouteQuery,
  selectBestAnchors,
} from './compiler.js';
import {
  buildDocsProjection,
  resolveDocTarget,
} from '../docs/projection.js';
import { type RetrievalSessionState } from './session-cache.js';
import {
  extractIds,
  normalizeForLookup,
  scoreOverlap,
  tokenize,
  unique,
} from './text.js';
import type {
  AnchorRef,
  AnswerMode,
  AnswerSlice,
  CompiledNode,
  ExpandedCitation,
  ExpandCitationsResult,
  FollowedReference,
  FrontierCandidate,
  FrontierOrigin,
  GraphExpansion,
  InspectAnchorResult,
  InspectNeighbor,
  InspectResult,
  LocalAnswerSynthesizer,
  QueryResult,
  ReadDocResult,
  RelationEdge,
  RetrievalHop,
  SectionRole,
  Snapshot,
  TraceCandidate,
  TraceResult,
} from './types.js';

const MAX_HOPS = 6;
const MAX_SELECTED_ANCHORS = 12;
const MAX_EXCLUDED = 5;
const MAX_SYNTHESIS_SLICES = 8;

interface FrontierWorkItem extends FrontierCandidate {
  priority: number;
  relation?: RelationEdge;
}

interface GroundingResult {
  selectedNodeIds: string[];
  selectedAnchorIds: string[];
  retrievalHops: RetrievalHop[];
  followedReferences: FollowedReference[];
  sufficient: boolean;
}

export class QueryEngine {
  private anchorOwnerNodeMap?: Map<string, CompiledNode>;

  constructor(
    private readonly snapshot: Snapshot,
    private readonly rebuilt: boolean,
    private readonly synthesizer?: LocalAnswerSynthesizer,
    private readonly sessionState?: RetrievalSessionState,
  ) {}

  async query(question: string, mode: AnswerMode = 'compact'): Promise<QueryResult> {
    const trace = this.trace(question, mode);
    return this.answerFromTrace(question, mode, trace);
  }

  async answerFromTrace(
    question: string,
    mode: AnswerMode,
    trace: TraceResult,
  ): Promise<QueryResult> {
    if (!question.trim()) {
      return this.result(question, mode, {
        answer: 'The runtime needs a non-empty question.',
        ids: [],
        relations: [],
        constraints: [],
        citations: [],
        confidence: 0,
        gaps: ['Question was empty.'],
        status: 'unsupported',
      });
    }

    if (isPartCDraftQuery(question)) {
      return this.answerPartCDrafts(question, mode);
    }

    if (trace.status === 'not_found') {
      return this.result(question, mode, {
        answer: 'No grounded answer was found in the compiled FPF-spec snapshot.',
        ids: [],
        relations: [],
        constraints: [],
        citations: [],
        confidence: 0.12,
        gaps: ['No pattern, route, or lexeme crossed the grounding threshold for this question.'],
        status: 'not_found',
        groundingChain:
          mode === 'proof'
            ? ['No candidate crossed the retrieval threshold for a lawful answer.']
            : undefined,
      });
    }

    const routeNodeId = trace.selectedNodeIds.find(
      (nodeId) => this.snapshot.compiledNodes[nodeId]?.kind === 'route',
    );
    const deterministic = routeNodeId
      ? this.buildRouteAnswer(question, mode, routeNodeId, trace)
      : this.buildPatternAnswer(question, mode, trace);

    if (!this.synthesizer) {
      return deterministic;
    }

    const available = await this.synthesizer.isAvailable();
    if (!available) {
      return deterministic;
    }

    const nodes = trace.selectedNodeIds
      .map((nodeId) => this.snapshot.compiledNodes[nodeId])
      .filter((node): node is CompiledNode => Boolean(node))
      .slice(0, MAX_SYNTHESIS_SLICES);
    const slices = this.prepareSynthesisSlices(trace);

    try {
      const synthesized = await this.synthesizer.synthesize({
        question,
        mode,
        trace,
        nodes,
        slices,
        deterministicResult: deterministic,
      });

      return {
        ...deterministic,
        answer: synthesized.answer ?? deterministic.answer,
        constraints: synthesized.constraints ?? deterministic.constraints,
        confidence: synthesized.confidence ?? deterministic.confidence,
        gaps: synthesized.gaps ?? deterministic.gaps,
        groundingChain: synthesized.groundingChain ?? deterministic.groundingChain,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Local synthesizer failed with an unknown error.';
      return {
        ...deterministic,
        gaps: unique([...deterministic.gaps, `Local synthesis skipped: ${message}`]),
      };
    }
  }

  trace(question: string, mode: AnswerMode = 'compact'): TraceResult {
    const normalizedQuestion = normalizeForLookup(question);
    if (!question.trim()) {
      return {
        mode,
        question,
        normalizedQuestion,
        detected: {
          ids: [],
          lexemes: [],
          routeNames: [],
          familyTerms: [],
          statusTerms: [],
        },
        candidateScores: [],
        frontierCandidates: [],
        graphExpansions: [],
        selectedNodeIds: [],
        selectedAnchorIds: [],
        excludedNodeIds: [],
        followedReferences: [],
        retrievalHops: [],
        sessionApplied: false,
        sessionReusedNodeIds: [],
        sessionMateriallyChanged: false,
        sufficient: false,
        status: 'unsupported',
        snapshot: {
          sourceHash: this.snapshot.sourceHash,
          builtAt: this.snapshot.builtAt,
          rebuilt: this.rebuilt,
        },
      };
    }

    const detectedIds = extractIds(question);
    const matchedLexemeIds = findLexemeMatches(question, this.snapshot.lexicon);
    const matchedRouteNames = Object.values(this.snapshot.routeGraph.nodes)
      .filter((route) => normalizedQuestion.includes(normalizeForLookup(route.name)))
      .map((route) => route.name);
    const familyTerms = Object.keys(this.snapshot.indexes.familyIndex).filter((key) =>
      normalizedQuestion.includes(key),
    );
    const statusTerms = ['draft', 'stable', 'stub', 'transitional'].filter((term) =>
      normalizedQuestion.includes(term),
    );

    const candidateMap = new Map<string, TraceCandidate>();
    const frontierCandidates: FrontierCandidate[] = [];
    const frontierKeys = new Set<string>();
    const graphExpansions: GraphExpansion[] = [];

    const addCandidate = (
      nodeId: string,
      delta: number,
      reason: string,
      origin: FrontierOrigin,
    ): void => {
      const node = this.snapshot.compiledNodes[nodeId];
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

    for (const id of detectedIds) {
      addCandidate(id, 100, 'exact-id', 'exact_match');
    }

    for (const entry of scorePatternQuery(
      question,
      Object.values(this.snapshot.patternGraph.nodes),
    ).slice(0, 24)) {
      if (entry.score > 0) {
        addCandidate(entry.pattern.id, entry.score, entry.reasons.join(','), 'lexical');
      }
    }

    for (const entry of scoreRouteQuery(
      question,
      Object.values(this.snapshot.routeGraph.nodes),
    ).slice(0, 12)) {
      if (entry.score > 0) {
        addCandidate(entry.route.id, entry.score, entry.reasons.join(','), 'route_expansion');
      }
    }

    for (const lexemeId of matchedLexemeIds) {
      addCandidate(lexemeId, 45, 'lexeme-match', 'lexical');
      const lexeme = this.snapshot.lexicon[lexemeId];
      for (const linkedNodeId of lexeme?.linkedNodeIds ?? []) {
        addCandidate(linkedNodeId, 24, `linked-from:${lexeme.canonical}`, 'lexical');
      }
    }

    for (const familyTerm of familyTerms) {
      for (const nodeId of this.snapshot.indexes.familyIndex[familyTerm] ?? []) {
        addCandidate(nodeId, 12, `family:${familyTerm}`, 'lexical');
      }
    }

    for (const statusTerm of statusTerms) {
      for (const nodeId of this.snapshot.indexes.statusIndex[statusTerm] ?? []) {
        addCandidate(nodeId, 10, `status:${statusTerm}`, 'lexical');
      }
    }

    this.addIndexDescriptionCandidates(question, addCandidate);
    this.addHeuristicSeeds(normalizedQuestion, addCandidate);

    const sessionApplied = this.shouldApplySessionContext(normalizedQuestion, detectedIds);
    if (sessionApplied) {
      for (const nodeId of this.sessionState?.lastSelectedNodeIds ?? []) {
        addCandidate(nodeId, 18, 'session:recent-selection', 'session_context');
      }
      if (this.sessionState?.lastSelectedRouteId) {
        addCandidate(this.sessionState.lastSelectedRouteId, 20, 'session:recent-route', 'session_context');
      }
      for (const nodeId of this.sessionState?.recentUnresolvedNodeIds ?? []) {
        addCandidate(nodeId, 8, 'session:unresolved-neighbor', 'session_context');
      }
    }

    const candidates = this.rankCandidates(candidateMap);
    const routeCandidate = candidates.find((candidate) => candidate.kind === 'route');
    const bestPattern = candidates.find((candidate) => candidate.kind === 'pattern');
    const routeWins = this.routeWins(normalizedQuestion, routeCandidate, bestPattern);
    const heuristicInitialNodeIds = this.heuristicInitialNodeIds(normalizedQuestion);
    const initialNodeIds = routeWins
      ? (routeCandidate ? [routeCandidate.nodeId] : [])
      : heuristicInitialNodeIds.length > 0
        ? heuristicInitialNodeIds
        : this.selectInitialPatternNodes(question, candidates, detectedIds);
    const initialAnchorIds = routeWins
      ? this.selectRouteAnchors(routeCandidate?.nodeId)
      : this.selectPatternAnchors(question, initialNodeIds);

    const grounding = this.expandGrounding(
      question,
      candidates,
      initialNodeIds,
      initialAnchorIds,
      frontierCandidates,
      frontierKeys,
      graphExpansions,
    );
    const selectedNodeIds = grounding.selectedNodeIds;
    const selectedAnchorIds = grounding.selectedAnchorIds;
    const excludedNodeIds = candidates
      .map((candidate) => candidate.nodeId)
      .filter((nodeId) => !selectedNodeIds.includes(nodeId))
      .slice(0, MAX_EXCLUDED);
    const sessionReusedNodeIds = this.sessionState
      ? selectedNodeIds.filter((nodeId) => this.sessionState?.lastSelectedNodeIds.includes(nodeId))
      : [];
    const status =
      selectedNodeIds.length === 0
        ? 'not_found'
        : routeWins
          ? 'ok'
          : this.isAmbiguous(question, candidates)
            ? 'ambiguous'
            : 'ok';

    return {
      mode,
      question,
      normalizedQuestion,
      detected: {
        ids: detectedIds,
        lexemes: matchedLexemeIds
          .map((lexemeId) => this.snapshot.lexicon[lexemeId]?.canonical)
          .filter((value): value is string => Boolean(value)),
        routeNames: matchedRouteNames,
        familyTerms,
        statusTerms,
      },
      candidateScores: candidates.slice(0, 16),
      frontierCandidates,
      graphExpansions,
      selectedNodeIds,
      selectedAnchorIds,
      excludedNodeIds,
      followedReferences: grounding.followedReferences,
      retrievalHops: grounding.retrievalHops,
      sessionApplied,
      sessionReusedNodeIds,
      sessionMateriallyChanged:
        sessionApplied && sessionReusedNodeIds.length > 0 && detectedIds.length === 0,
      sufficient: grounding.sufficient,
      status,
      snapshot: {
        sourceHash: this.snapshot.sourceHash,
        builtAt: this.snapshot.builtAt,
        rebuilt: this.rebuilt,
      },
    };
  }

  inspect(selector: string, kind: 'auto' | 'id' | 'route' | 'lexeme' = 'auto'): InspectResult {
    const resolvedId = this.resolveSelector(selector, kind);
    if (!resolvedId) {
      return {
        selector,
        resolvedAs: 'not_found',
        status: 'not_found',
        anchors: [],
        neighbors: [],
        snapshot: {
          sourceHash: this.snapshot.sourceHash,
          builtAt: this.snapshot.builtAt,
        },
      };
    }

    const node = this.snapshot.compiledNodes[resolvedId];
    const anchors = (node.anchorIds ?? [])
      .map((anchorId) => this.snapshot.anchorMap[anchorId])
      .filter((anchor): anchor is Snapshot['anchorMap'][string] => Boolean(anchor));
    const neighbors = node.neighborEdges
      .map((edge): InspectNeighbor | undefined => {
        const target = this.snapshot.compiledNodes[edge.to];
        if (!target) {
          return undefined;
        }
        return {
          id: target.id,
          kind: target.kind,
          title: target.title,
          relation: edge.relation,
        };
      })
      .filter((neighbor): neighbor is InspectNeighbor => Boolean(neighbor));

    return {
      selector,
      resolvedAs: node.kind === 'route' ? 'route' : node.kind === 'lexeme' ? 'lexeme' : 'id',
      status: 'ok',
      node,
      anchors,
      neighbors,
      docRef: resolveDocTarget(this.snapshot, node.id)?.docRef,
      snapshot: {
        sourceHash: this.snapshot.sourceHash,
        builtAt: this.snapshot.builtAt,
      },
    };
  }

  readDoc(
    selector: string,
    kind: 'auto' | 'id' | 'route' | 'lexeme' = 'auto',
  ): ReadDocResult {
    const resolvedNodeId = this.resolveSelector(selector, kind);
    if (!resolvedNodeId) {
      return {
        selector,
        resolvedAs: 'not_found',
        status: 'not_found',
        snapshot: {
          sourceHash: this.snapshot.sourceHash,
          builtAt: this.snapshot.builtAt,
        },
      };
    }

    const resolvedNode = this.snapshot.compiledNodes[resolvedNodeId];
    if (!resolvedNode) {
      return {
        selector,
        resolvedAs: 'not_found',
        status: 'not_found',
        snapshot: {
          sourceHash: this.snapshot.sourceHash,
          builtAt: this.snapshot.builtAt,
        },
      };
    }

    const docTarget = resolveDocTarget(this.snapshot, resolvedNodeId);
    if (!docTarget) {
      return {
        selector,
        resolvedAs:
          resolvedNode.kind === 'route'
            ? 'route'
            : resolvedNode.kind === 'lexeme'
              ? 'lexeme'
              : 'id',
        status: 'not_found',
        snapshot: {
          sourceHash: this.snapshot.sourceHash,
          builtAt: this.snapshot.builtAt,
        },
      };
    }

    const projection = buildDocsProjection(this.snapshot);
    const page = projection.pagesByMarkdownPath[docTarget.docRef.markdownPath];
    if (!page) {
      return {
        selector,
        resolvedAs:
          resolvedNode.kind === 'route'
            ? 'route'
            : resolvedNode.kind === 'lexeme'
              ? 'lexeme'
              : 'id',
        status: 'not_found',
        snapshot: {
          sourceHash: this.snapshot.sourceHash,
          builtAt: this.snapshot.builtAt,
        },
      };
    }

    return {
      selector,
      resolvedAs:
        resolvedNode.kind === 'route'
          ? 'route'
          : resolvedNode.kind === 'lexeme'
            ? 'lexeme'
            : 'id',
      status: 'ok',
      nodeId: docTarget.nodeId,
      title: docTarget.title,
      docRef: docTarget.docRef,
      markdown: page.markdown,
      snapshot: {
        sourceHash: this.snapshot.sourceHash,
        builtAt: this.snapshot.builtAt,
      },
    };
  }

  inspectAnchor(anchorId: string): InspectAnchorResult {
    const expanded = this.expandCitation(anchorId);
    return {
      anchorId,
      status: expanded.status,
      anchor: expanded.anchor,
      ownerNode: expanded.ownerNode,
      neighbors: expanded.neighbors,
      snapshot: {
        sourceHash: this.snapshot.sourceHash,
        builtAt: this.snapshot.builtAt,
      },
    };
  }

  expandCitations(citationIds: string[]): ExpandCitationsResult {
    return {
      citationIds,
      items: citationIds.map((citationId) => this.expandCitation(citationId)),
      snapshot: {
        sourceHash: this.snapshot.sourceHash,
        builtAt: this.snapshot.builtAt,
      },
    };
  }

  private addIndexDescriptionCandidates(
    question: string,
    addCandidate: (nodeId: string, delta: number, reason: string, origin: FrontierOrigin) => void,
  ): void {
    const queryTokens = tokenize(question);
    const bestByTarget = new Map<string, { score: number; reason: string }>();
    for (const indexNode of Object.values(this.snapshot.indexMap)) {
      const targetId = indexNode.metadata?.patternId;
      if (!targetId || !this.snapshot.compiledNodes[targetId]) {
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
        normalizeForLookup(question).includes(normalizedDescription)
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

  private addHeuristicSeeds(
    normalizedQuestion: string,
    addCandidate: (nodeId: string, delta: number, reason: string, origin: FrontierOrigin) => void,
  ): void {
    if (
      (normalizedQuestion.includes('creativity') || normalizedQuestion.includes('creative')) &&
      (normalizedQuestion.includes('open-ended') ||
        normalizedQuestion.includes('open ended') ||
        normalizedQuestion.includes('search'))
    ) {
      for (const nodeId of ['C.17', 'C.18', 'C.19', 'B.5.2.1', 'A.0']) {
        addCandidate(nodeId, 64, 'creative-search-heuristic', 'lexical');
      }
    }

    if (
      normalizedQuestion.includes('vocabulary') &&
      (normalizedQuestion.includes('overloaded') ||
        normalizedQuestion.includes('across teams') ||
        normalizedQuestion.includes('across contexts'))
    ) {
      addCandidate('route:project-alignment', 80, 'burden:project-alignment', 'route_expansion');
      for (const nodeId of ['A.1.1', 'A.15', 'B.5.1', 'F.17']) {
        addCandidate(nodeId, 20, 'project-alignment-route-surface', 'route_expansion');
      }
    }

    if (
      normalizedQuestion.includes('role assignment') &&
      (normalizedQuestion.includes('connect') || normalizedQuestion.includes('relation'))
    ) {
      for (const nodeId of ['A.1.1', 'A.2.1', 'A.2.5']) {
        addCandidate(nodeId, 36, 'role-assignment-connection', 'lexical');
      }
    }

    if (
      (normalizedQuestion.includes('same entity') || normalizedQuestion.includes('same-entity')) &&
      (normalizedQuestion.includes('rewrite') || normalizedQuestion.includes('comparative'))
    ) {
      for (const nodeId of ['A.6.3.CR', 'A.6.3.RT', 'E.17.ID.CR']) {
        addCandidate(nodeId, 40, 'same-entity-comparative-reading', 'lexical');
      }
    }
  }

  private heuristicInitialNodeIds(normalizedQuestion: string): string[] {
    if (
      (normalizedQuestion.includes('creativity') || normalizedQuestion.includes('creative')) &&
      (normalizedQuestion.includes('open-ended') ||
        normalizedQuestion.includes('open ended') ||
        normalizedQuestion.includes('search'))
    ) {
      return ['C.17', 'C.18', 'C.19'].filter((nodeId) => Boolean(this.snapshot.patternGraph.nodes[nodeId]));
    }

    if (
      (normalizedQuestion.includes('same entity') || normalizedQuestion.includes('same-entity')) &&
      (normalizedQuestion.includes('rewrite') || normalizedQuestion.includes('comparative'))
    ) {
      return ['A.6.3.CR', 'A.6.3.RT', 'E.17.ID.CR'].filter((nodeId) =>
        Boolean(this.snapshot.patternGraph.nodes[nodeId]),
      );
    }

    return [];
  }

  private shouldApplySessionContext(
    normalizedQuestion: string,
    detectedIds: string[],
  ): boolean {
    if (!this.sessionState || this.sessionState.lastSelectedNodeIds.length === 0) {
      return false;
    }

    if (detectedIds.length === 0) {
      return true;
    }

    return /\bit\b|\bthat\b|\bthose\b|\bthem\b|\bconnect\b|\brelate\b|\balso\b/.test(
      normalizedQuestion,
    );
  }

  private rankCandidates(candidateMap: Map<string, TraceCandidate>): TraceCandidate[] {
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

  private routeWins(
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

    if (routeIntent) {
      return routeCandidate.score >= (bestPattern?.score ?? 0) - 4;
    }

    return routeCandidate.score >= (bestPattern?.score ?? 0) + 10;
  }

  private selectInitialPatternNodes(
    question: string,
    candidates: TraceCandidate[],
    detectedIds: string[],
  ): string[] {
    const explicitPatterns = detectedIds.filter((id) => this.snapshot.patternGraph.nodes[id]);
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

  private selectRouteAnchors(routeNodeId?: string): string[] {
    if (!routeNodeId) {
      return [];
    }
    const route = this.snapshot.routeGraph.nodes[routeNodeId];
    return route ? unique(route.anchorIds).slice(0, MAX_SELECTED_ANCHORS) : [];
  }

  private selectPatternAnchors(question: string, nodeIds: string[]): string[] {
    const anchorIds: string[] = [];
    for (const nodeId of nodeIds) {
      const pattern = this.snapshot.patternGraph.nodes[nodeId];
      if (!pattern) {
        continue;
      }
      anchorIds.push(
        ...selectBestAnchors(question, pattern, this.snapshot.anchorMap).map((anchor) => anchor.id),
      );
    }
    return unique(anchorIds).slice(0, MAX_SELECTED_ANCHORS);
  }

  private expandGrounding(
    question: string,
    candidates: TraceCandidate[],
    initialNodeIds: string[],
    initialAnchorIds: string[],
    frontierCandidates: FrontierCandidate[],
    frontierKeys: Set<string>,
    graphExpansions: GraphExpansion[],
  ): GroundingResult {
    const selectedNodeIds = unique(initialNodeIds);
    const selectedAnchorIds = unique(initialAnchorIds).slice(0, MAX_SELECTED_ANCHORS);
    const retrievalHops: RetrievalHop[] = [];
    const followedReferences: FollowedReference[] = [];
    const candidateScoreById = new Map(
      candidates.map((candidate) => [candidate.nodeId, candidate.score] as const),
    );

    let sufficient = this.isGroundingSufficient(question, selectedNodeIds, selectedAnchorIds);

    for (let iteration = 1; iteration <= MAX_HOPS && !sufficient; iteration += 1) {
      const missingRoles = this.missingRoles(question, selectedAnchorIds);
      const frontier = this.buildFrontier(
        question,
        selectedNodeIds,
        selectedAnchorIds,
        candidateScoreById,
        missingRoles,
        frontierCandidates,
        frontierKeys,
      );
      const picked = frontier[0];
      if (!picked) {
        break;
      }

      const addedNodeIds = selectedNodeIds.includes(picked.targetId) ? [] : [picked.targetId];
      const addedAnchorIds = this.anchorIdsForNode(question, picked.targetId, missingRoles).filter(
        (anchorId) => !selectedAnchorIds.includes(anchorId),
      );

      if (addedNodeIds.length === 0 && addedAnchorIds.length === 0) {
        continue;
      }

      selectedNodeIds.push(...addedNodeIds);
      selectedAnchorIds.push(...addedAnchorIds);

      if (picked.relation) {
        graphExpansions.push({
          from: picked.relation.from,
          relation: picked.relation.relation,
          to: picked.relation.to,
          reason: picked.reason,
        });
        if (picked.relation.relation === 'explicit_reference') {
          followedReferences.push({
            from: picked.relation.from,
            to: picked.relation.to,
            relation: picked.relation.relation,
            source: picked.relation.source,
          });
        }
      }

      sufficient = this.isGroundingSufficient(
        question,
        unique(selectedNodeIds),
        unique(selectedAnchorIds),
      );
      retrievalHops.push({
        iteration,
        reason: picked.reason,
        addedNodeIds,
        addedAnchorIds,
        sufficientAfter: sufficient,
      });
    }

    return {
      selectedNodeIds: unique(selectedNodeIds),
      selectedAnchorIds: unique(selectedAnchorIds).slice(0, MAX_SELECTED_ANCHORS),
      retrievalHops,
      followedReferences,
      sufficient,
    };
  }

  private buildFrontier(
    question: string,
    selectedNodeIds: string[],
    selectedAnchorIds: string[],
    candidateScoreById: Map<string, number>,
    missingRoles: SectionRole[],
    frontierCandidates: FrontierCandidate[],
    frontierKeys: Set<string>,
  ): FrontierWorkItem[] {
    const selected = new Set(selectedNodeIds);
    const queue = new Map<string, FrontierWorkItem>();

    const register = (
      item: FrontierWorkItem,
      appendFrontier = true,
    ): void => {
      const node = this.snapshot.compiledNodes[item.targetId];
      if (!node || selected.has(item.targetId)) {
        return;
      }

      const existing = queue.get(item.targetId);
      if (
        existing &&
        (existing.priority < item.priority ||
          (existing.priority === item.priority && existing.score >= item.score))
      ) {
        return;
      }
      queue.set(item.targetId, item);

      if (appendFrontier) {
        const frontierKey = `${item.targetId}:${item.origin}:${item.reason}`;
        if (!frontierKeys.has(frontierKey)) {
          frontierKeys.add(frontierKey);
          frontierCandidates.push({
            targetId: item.targetId,
            kind: item.kind,
            reason: item.reason,
            score: item.score,
            origin: item.origin,
          });
        }
      }
    };

    for (const nodeId of selectedNodeIds) {
      for (const edge of this.snapshot.relationGraph) {
        if (edge.from !== nodeId) {
          continue;
        }
        const target = this.snapshot.compiledNodes[edge.to];
        if (!target || target.kind === 'lexeme') {
          continue;
        }

        const baseScore = candidateScoreById.get(edge.to) ?? 0;
        if (edge.relation === 'explicit_reference') {
          register({
            targetId: edge.to,
            kind: target.kind,
            reason: `explicit reference from ${edge.from}`,
            score: 90 + baseScore,
            origin: 'reference_follow',
            priority: 1,
            relation: edge,
          });
          continue;
        }

        if (
          ['route_hint', 'route_step', 'landing_on', 'current_route_surface', 'typical_next_owner'].includes(
            edge.relation,
          )
        ) {
          register({
            targetId: edge.to,
            kind: target.kind,
            reason: `route expansion via ${edge.relation}`,
            score: 70 + baseScore,
            origin: 'route_expansion',
            priority: 2,
            relation: edge,
          });
          continue;
        }

        if (
          [
            'builds_on',
            'prerequisite_for',
            'used_by',
            'coordinates_with',
            'constrains',
            'refines',
            'enables',
            'informs',
            'constitutes',
            'constrained_by',
            'interacts_with',
          ].includes(edge.relation)
        ) {
          const coverage = this.anchorIdsForNode(question, edge.to, missingRoles).length;
          register({
            targetId: edge.to,
            kind: target.kind,
            reason:
              coverage > 0
                ? `role coverage via ${edge.relation}`
                : `graph neighbor via ${edge.relation}`,
            score: 50 + coverage * 4 + baseScore,
            origin: 'reference_follow',
            priority: coverage > 0 ? 3 : 5,
            relation: edge,
          });
          continue;
        }

        if (
          [
            'outline_parent',
            'outline_child',
            'outline_prev_sibling',
            'outline_next_sibling',
          ].includes(edge.relation)
        ) {
          register({
            targetId: edge.to,
            kind: target.kind,
            reason: `outline adjacency via ${edge.relation}`,
            score: 34 + baseScore,
            origin: 'adjacency',
            priority: 4,
            relation: edge,
          });
        }
      }
    }

    for (const [nodeId, score] of candidateScoreById.entries()) {
      if (selected.has(nodeId)) {
        continue;
      }
      const node = this.snapshot.compiledNodes[nodeId];
      if (!node || node.kind === 'lexeme') {
        continue;
      }

      const coverage = this.anchorIdsForNode(question, nodeId, missingRoles).length;
      if (coverage > 0) {
        register({
          targetId: nodeId,
          kind: node.kind,
          reason: `missing role coverage (${missingRoles.join(', ')})`,
          score: score + coverage * 6,
          origin: 'lexical',
          priority: 3,
        });
      } else {
        register({
          targetId: nodeId,
          kind: node.kind,
          reason: 'lexical fallback',
          score,
          origin: 'lexical',
          priority: 6,
        });
      }
    }

    return Array.from(queue.values()).sort((left, right) => {
      if (left.priority !== right.priority) {
        return left.priority - right.priority;
      }
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      return left.targetId.localeCompare(right.targetId);
    });
  }

  private anchorIdsForNode(
    question: string,
    nodeId: string,
    preferredRoles: SectionRole[],
  ): string[] {
    const node = this.snapshot.compiledNodes[nodeId];
    if (!node) {
      return [];
    }

    if (node.kind === 'route') {
      const route = this.snapshot.routeGraph.nodes[nodeId];
      return route ? unique(route.anchorIds) : [];
    }

    if (node.kind !== 'pattern') {
      return [];
    }

    return this.collectAnchorsForNode(question, nodeId, preferredRoles).map((anchor) => anchor.id);
  }

  private collectAnchorsForNode(
    question: string,
    nodeId: string,
    preferredRoles: SectionRole[],
  ): AnchorRef[] {
    const pattern = this.snapshot.patternGraph.nodes[nodeId];
    if (!pattern) {
      return [];
    }

    const ranked = selectBestAnchors(question, pattern, this.snapshot.anchorMap);
    if (preferredRoles.length === 0) {
      return ranked.slice(0, 4);
    }

    return unique([
      ...ranked.filter((anchor) => preferredRoles.includes(anchor.role)),
      ...ranked.filter((anchor) => !preferredRoles.includes(anchor.role)),
    ]).slice(0, 4);
  }

  private selectedAnchorsForPatternFromTrace(
    patternId: string,
    question: string,
    trace: TraceResult,
  ): AnchorRef[] {
    const fromTrace = trace.selectedAnchorIds
      .map((anchorId) => this.snapshot.anchorMap[anchorId])
      .filter(
        (anchor): anchor is Snapshot['anchorMap'][string] =>
          Boolean(anchor) && anchor.nodeId === patternId,
      );
    if (fromTrace.length > 0) {
      return fromTrace;
    }

    const pattern = this.snapshot.patternGraph.nodes[patternId];
    return pattern ? selectBestAnchors(question, pattern, this.snapshot.anchorMap) : [];
  }

  private missingRoles(question: string, anchorIds: string[]): SectionRole[] {
    const rolesPresent = new Set(
      anchorIds
        .map((anchorId) => this.snapshot.anchorMap[anchorId]?.role)
        .filter((role): role is SectionRole => Boolean(role)),
    );
    return this.requiredRolesForQuestion(question).filter((role) => !rolesPresent.has(role));
  }

  private requiredRolesForQuestion(question: string): SectionRole[] {
    const normalized = normalizeForLookup(question);
    const roles = new Set<SectionRole>();

    if (
      normalized.includes('connect') ||
      normalized.includes('workflow') ||
      normalized.includes('relation')
    ) {
      roles.add('relations');
    }
    if (
      normalized.includes('must') ||
      normalized.includes('shall') ||
      normalized.includes('checklist') ||
      normalized.includes('conformance')
    ) {
      roles.add('conformance');
    }
    if (normalized.includes('why') || normalized.includes('problem')) {
      roles.add('problem');
    }
    if (normalized.includes('force')) {
      roles.add('forces');
    }
    if (
      roles.size === 0 ||
      normalized.includes('what is') ||
      normalized.includes('definition') ||
      normalized.includes('use')
    ) {
      roles.add('definition');
      roles.add('solution');
    }

    return Array.from(roles);
  }

  private isGroundingSufficient(
    question: string,
    nodeIds: string[],
    anchorIds: string[],
  ): boolean {
    if (nodeIds.length === 0 || anchorIds.length === 0) {
      return false;
    }

    const anchors = anchorIds
      .map((anchorId) => this.snapshot.anchorMap[anchorId])
      .filter((anchor): anchor is AnchorRef => Boolean(anchor));
    const normalized = normalizeForLookup(question);
    const patternNodeIds = nodeIds.filter((nodeId) => this.snapshot.patternGraph.nodes[nodeId]);
    const hasRoute = nodeIds.some((nodeId) => this.snapshot.routeGraph.nodes[nodeId]);
    const roleSet = new Set(anchors.map((anchor) => anchor.role));

    if (
      normalized.includes('connect') ||
      normalized.includes('workflow') ||
      normalized.includes('relation')
    ) {
      return patternNodeIds.length >= 2 && roleSet.has('relations');
    }

    if (
      normalized.includes('must') ||
      normalized.includes('shall') ||
      normalized.includes('checklist') ||
      normalized.includes('conformance')
    ) {
      return roleSet.has('conformance');
    }

    if (
      normalized.includes('route') ||
      normalized.includes('where to start') ||
      normalized.includes('first route') ||
      normalized.includes('overloaded') ||
      normalized.includes('across teams')
    ) {
      return hasRoute && patternNodeIds.length >= 3;
    }

    return roleSet.has('definition') || roleSet.has('solution');
  }

  private answerPartCDrafts(question: string, mode: AnswerMode): QueryResult {
    const grouped = getPartCDraftsByCluster(this.snapshot.patternGraph.nodes);
    const ids = Object.values(grouped).flatMap((patterns) => patterns.map((pattern) => pattern.id));
    const answerLines = Object.entries(grouped).flatMap(([cluster, patterns]) => {
      const rows = patterns.map((pattern) => `- ${pattern.id} - ${pattern.title}`);
      return rows.length > 0 ? [`${cluster}:`, ...rows] : [`${cluster}:`, '- none'];
    });
    return this.result(question, mode, {
      answer: answerLines.join('\n'),
      ids,
      relations: [],
      constraints: [
        'Only rows whose Part is Part C and whose status is Draft are included.',
        'Cluster labels come from the top-of-file catalog and stay local to the source monolith.',
      ],
      citations: ['Part C catalog'],
      confidence: 0.95,
      gaps: [],
      status: 'ok',
      groundingChain:
        mode === 'proof'
          ? [
              'Matched the structured Part C Draft listing route.',
              'Filtered the compiled pattern graph by Part C plus status Draft, then grouped by cluster label.',
            ]
          : undefined,
    });
  }

  private buildRouteAnswer(
    question: string,
    mode: AnswerMode,
    routeNodeId: string,
    trace: TraceResult,
  ): QueryResult {
    const route = this.snapshot.routeGraph.nodes[routeNodeId]!;
    const ids = unique([...route.orderedIds, ...route.optionalIds, ...route.landingIds]);
    const relations = this.snapshot.relationGraph
      .filter((edge) => ids.includes(edge.from) && ids.includes(edge.to))
      .map((edge) => ({ from: edge.from, relation: edge.relation, to: edge.to }));
    const constraints = [
      route.firstHonestBurden
        ? `First honest burden: ${route.firstHonestBurden}.`
        : 'Choose this route only when the stated burden matches the present problem.',
    ];
    if (route.name.toLowerCase() === 'project alignment') {
      constraints.push(
        'Add F.11 and F.9 only when method/work vocabulary itself must be aligned across contexts.',
      );
      constraints.push(
        'Land on F.17 early rather than escalating directly into heavier governance or assurance surfaces.',
      );
    }
    const answer = [
      `${route.name} is the matched first-practical route.`,
      route.firstHonestBurden ? `Burden: ${route.firstHonestBurden}.` : '',
      route.orderedIds.length > 0
        ? `Ordered entry IDs: ${route.orderedIds.join(' -> ')}.`
        : '',
      route.optionalIds.length > 0
        ? `Conditional additions: ${route.optionalIds.join(', ')}.`
        : '',
      route.landingIds.length > 0 ? `Landing surface: ${route.landingIds.join(', ')}.` : '',
      route.routeSurfaces.length > 0
        ? `Route-bearing surfaces: ${route.routeSurfaces.join(', ')}.`
        : '',
    ]
      .filter(Boolean)
      .join(' ');

    return this.result(question, mode, {
      answer,
      ids,
      relations,
      constraints,
      citations: unique(route.citations),
      confidence: 0.92,
      gaps: [],
      status: 'ok',
      groundingChain:
        mode === 'proof'
          ? [
              `Selected ${route.name} because route-bearing surfaces and burden terms dominated the frontier.`,
              ...trace.frontierCandidates
                .slice(0, 8)
                .map(
                  (candidate) =>
                    `${candidate.origin}: ${candidate.targetId} (${candidate.score}) ${candidate.reason}`,
                ),
              ...trace.retrievalHops.map(
                (hop) =>
                  `hop ${hop.iteration}: ${hop.reason}; nodes=${hop.addedNodeIds.join(', ') || 'none'}; anchors=${hop.addedAnchorIds.join(', ') || 'none'}`,
              ),
            ]
          : undefined,
    });
  }

  private buildPatternAnswer(
    question: string,
    mode: AnswerMode,
    trace: TraceResult,
  ): QueryResult {
    const patternIds = trace.selectedNodeIds.filter(
      (nodeId) => this.snapshot.compiledNodes[nodeId]?.kind === 'pattern',
    );
    const patterns = patternIds
      .map((patternId) => this.snapshot.patternGraph.nodes[patternId])
      .filter((pattern): pattern is Snapshot['patternGraph']['nodes'][string] => Boolean(pattern));

    const citations = unique(trace.selectedAnchorIds);
    const answer = patterns
      .map((pattern) => {
        const anchors = this.selectedAnchorsForPatternFromTrace(pattern.id, question, trace);
        const sentences = anchors.flatMap((anchor) =>
          formatAnchorSentences(anchor, question, mode === 'compact' ? 1 : 2),
        );
        const summary = unique(sentences).slice(0, mode === 'compact' ? 2 : 4).join(' ');
        return `- ${pattern.id}: ${summary || pattern.title}`;
      })
      .join('\n');

    const constraints = unique(
      patterns.flatMap((pattern) => {
        const anchors = this.selectedAnchorsForPatternFromTrace(pattern.id, question, trace).filter(
          (anchor) =>
            ['solution', 'relations', 'conformance', 'definition'].includes(anchor.role),
        );
        const constrained = anchors.flatMap((anchor) =>
          formatAnchorSentences(anchor, question, 2).filter((sentence) =>
            /(must|shall|should|when|avoid|do not|never|only)/i.test(sentence),
          ),
        );
        return constrained.length > 0
          ? constrained
          : anchors[0]
            ? formatAnchorSentences(anchors[0], question, 1)
            : [`Keep ${pattern.id} local to its bounded context and cited source text.`];
      }),
    ).slice(0, mode === 'compact' ? 3 : 6);

    const relations = this.snapshot.relationGraph
      .filter((edge) => patternIds.includes(edge.from) && patternIds.includes(edge.to))
      .map((edge) => ({ from: edge.from, relation: edge.relation, to: edge.to }));

    return this.result(question, mode, {
      answer,
      ids: patternIds,
      relations,
      constraints,
      citations,
      confidence: this.confidenceFromTrace(trace),
      gaps: this.gapsFromTrace(trace),
      status: trace.status,
      groundingChain:
        mode === 'proof'
          ? [
              ...trace.frontierCandidates
                .slice(0, 10)
                .map(
                  (candidate) =>
                    `${candidate.origin}: ${candidate.targetId} (${candidate.score}) ${candidate.reason}`,
                ),
              ...trace.graphExpansions.map(
                (expansion) =>
                  `${expansion.from} --${expansion.relation}--> ${expansion.to}: ${expansion.reason}`,
              ),
              ...trace.followedReferences.map(
                (edge) => `followed reference ${edge.from} -> ${edge.to} from ${edge.source}`,
              ),
              ...trace.retrievalHops.map(
                (hop) =>
                  `hop ${hop.iteration}: ${hop.reason}; nodes=${hop.addedNodeIds.join(', ') || 'none'}; anchors=${hop.addedAnchorIds.join(', ') || 'none'}`,
              ),
              ...(trace.sessionApplied
                ? [
                    `session reused nodes: ${trace.sessionReusedNodeIds.join(', ') || 'none'}`,
                    `session materially changed result: ${String(trace.sessionMateriallyChanged)}`,
                  ]
                : []),
            ]
          : undefined,
    });
  }

  private gapsFromTrace(trace: TraceResult): string[] {
    const gaps: string[] = [];
    if (trace.status === 'ambiguous') {
      gaps.push('Nearby candidates remained close in score; inspect the returned IDs together.');
    }
    if (!trace.sufficient) {
      gaps.push('Retrieval stopped at the bounded hop budget before every requested role was fully covered.');
    }
    return gaps;
  }

  private prepareSynthesisSlices(trace: TraceResult): AnswerSlice[] {
    return trace.selectedAnchorIds
      .map((anchorId) => this.snapshot.anchorMap[anchorId])
      .filter((anchor): anchor is Snapshot['anchorMap'][string] => Boolean(anchor))
      .slice(0, MAX_SYNTHESIS_SLICES)
      .map<AnswerSlice>((anchor) => ({
        anchorId: anchor.id,
        nodeId: anchor.nodeId,
        heading: anchor.heading,
        role: anchor.role,
        lineStart: anchor.lineStart,
        lineEnd: anchor.lineEnd,
        text: anchor.text,
        plainText: anchor.plainText,
      }));
  }

  private resolveSelector(
    selector: string,
    kind: 'auto' | 'id' | 'route' | 'lexeme',
  ): string | undefined {
    const normalizedSelector = normalizeForLookup(selector);

    if (kind === 'id' || kind === 'auto') {
      if (this.snapshot.compiledNodes[selector]) {
        return selector;
      }
      const idMatch = this.snapshot.indexes.idIndex[normalizedSelector]?.[0];
      if (idMatch) {
        return idMatch;
      }
    }

    if (kind === 'route' || kind === 'auto') {
      const routeMatch = this.snapshot.indexes.routeNameIndex[normalizedSelector]?.[0];
      if (routeMatch) {
        return routeMatch;
      }
    }

    if (kind === 'lexeme' || kind === 'auto') {
      const lexemeMatch = this.bestLexemeSelectorMatch(normalizedSelector);
      if (lexemeMatch) {
        return lexemeMatch;
      }
    }

    if (kind === 'auto') {
      const aliasMatch = this.snapshot.indexes.aliasIndex[normalizedSelector]?.[0];
      if (aliasMatch) {
        return aliasMatch;
      }
      const titleMatch = this.snapshot.indexes.titleIndex[normalizedSelector]?.[0];
      if (titleMatch) {
        return titleMatch;
      }
    }

    return undefined;
  }

  private bestLexemeSelectorMatch(normalizedSelector: string): string | undefined {
    const candidates = this.snapshot.indexes.lexiconIndex[normalizedSelector] ?? [];
    return candidates
      .map((nodeId) => this.snapshot.compiledNodes[nodeId])
      .filter((node): node is CompiledNode => Boolean(node) && node.kind === 'lexeme')
      .map((node) => ({
        nodeId: node.id,
        score: this.scoreLexemeSelectorMatch(normalizedSelector, node),
      }))
      .sort((left, right) => {
        if (right.score !== left.score) {
          return right.score - left.score;
        }
        return left.nodeId.localeCompare(right.nodeId);
      })[0]?.nodeId;
  }

  private scoreLexemeSelectorMatch(normalizedSelector: string, node: CompiledNode): number {
    if (node.kind !== 'lexeme') {
      return Number.NEGATIVE_INFINITY;
    }

    const canonical = normalizeForLookup(node.title);
    const details = node.details;
    const aliases = 'aliases' in details ? details.aliases : [];
    const symbolForms = 'symbolForms' in details ? details.symbolForms : [];
    const normalizedKeys = 'normalizedKeys' in details ? details.normalizedKeys : [];

    let score = 0;
    if (canonical === normalizedSelector) {
      score += 40;
    }
    if (normalizedKeys.includes(normalizedSelector)) {
      score += 20;
    }
    if (symbolForms.some((value) => normalizeForLookup(value) === normalizedSelector)) {
      score += 12;
    }
    if (aliases.some((value) => normalizeForLookup(value) === normalizedSelector)) {
      score += 8;
    }
    if (canonical.includes(normalizedSelector)) {
      score += 4;
    }
    if (symbolForms.some((value) => normalizeForLookup(value).includes(normalizedSelector))) {
      score += 2;
    }
    return score;
  }

  private findOwnerNodeForAnchor(anchor: AnchorRef): CompiledNode | undefined {
    if (anchor.nodeId && this.snapshot.compiledNodes[anchor.nodeId]) {
      return this.snapshot.compiledNodes[anchor.nodeId];
    }

    return this.getAnchorOwnerNodeMap().get(anchor.id);
  }

  private getAnchorOwnerNodeMap(): Map<string, CompiledNode> {
    if (this.anchorOwnerNodeMap) {
      return this.anchorOwnerNodeMap;
    }

    const ownerMap = new Map<string, CompiledNode>();
    for (const node of Object.values(this.snapshot.compiledNodes)) {
      for (const anchorId of node.anchorIds) {
        if (!ownerMap.has(anchorId)) {
          ownerMap.set(anchorId, node);
        }
      }
    }

    this.anchorOwnerNodeMap = ownerMap;
    return ownerMap;
  }

  private expandCitation(citationId: string): ExpandedCitation {
    const anchor = this.snapshot.anchorMap[citationId];
    if (!anchor) {
      return {
        citationId,
        status: 'not_found',
        neighbors: [],
      };
    }

    const ownerNode = this.findOwnerNodeForAnchor(anchor);
    return {
      citationId,
      status: 'ok',
      anchor,
      ownerNode,
      neighbors: this.neighborsForNode(ownerNode),
    };
  }

  private neighborsForNode(node?: CompiledNode): InspectNeighbor[] {
    if (!node) {
      return [];
    }

    return node.neighborEdges
      .map((edge): InspectNeighbor | undefined => {
        const target = this.snapshot.compiledNodes[edge.to];
        if (!target) {
          return undefined;
        }
        return {
          id: target.id,
          kind: target.kind,
          title: target.title,
          relation: edge.relation,
        };
      })
      .filter((neighbor): neighbor is InspectNeighbor => Boolean(neighbor));
  }

  private isAmbiguous(question: string, candidates: TraceCandidate[]): boolean {
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

  private confidenceFromTrace(trace: TraceResult): number {
    const top = trace.candidateScores[0]?.score ?? 0;
    const ambiguous = trace.status === 'ambiguous';
    const base = Math.min(0.98, 0.45 + top / 20);
    const adjusted = trace.sufficient ? base : base - 0.1;
    return ambiguous ? Math.max(0.35, adjusted - 0.2) : Math.max(0.3, adjusted);
  }

  private result(
    question: string,
    mode: AnswerMode,
    payload: Omit<QueryResult, 'mode' | 'question' | 'snapshot'>,
  ): QueryResult {
    return {
      ...payload,
      mode,
      question,
      snapshot: {
        sourceHash: this.snapshot.sourceHash,
        builtAt: this.snapshot.builtAt,
        rebuilt: this.rebuilt,
      },
    };
  }
}
