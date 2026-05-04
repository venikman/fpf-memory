import {
  formatAnchorSentences,
  getPartCDraftsByCluster,
  selectBestAnchors,
} from './compiler.js';
import {
  unique,
} from './text.js';
import type {
  AnchorRef,
  AnswerMode,
  AnswerSlice,
  QueryResult,
  Snapshot,
  TraceResult,
} from './types.js';

import { MAX_SYNTHESIS_SLICES } from './constants.js';

export function buildRouteAnswer(
  question: string,
  mode: AnswerMode,
  routeNodeId: string,
  trace: TraceResult,
  snapshot: Snapshot,
  rebuilt: boolean,
): QueryResult {
  const route = snapshot.routeGraph.nodes[routeNodeId]!;
  const ids = unique([
    routeNodeId,
    ...route.orderedIds,
    ...route.optionalIds,
    ...route.landingIds,
  ]);
  const idSet = new Set(ids);
  const relations = ids.flatMap((id) =>
    (snapshot.compiledNodes[id]?.neighborEdges ?? [])
      .filter((edge) => idSet.has(edge.to))
      .map((edge) => ({ from: edge.from, relation: edge.relation, to: edge.to })),
  );
  const constraints = [
    route.firstHonestBurden
      ? `First honest burden: ${route.firstHonestBurden}.`
      : 'Choose this route only when the stated burden matches the present problem.',
    ...(route.constraints ?? []),
  ];
  const answer = [
    `${route.id} (${route.name}) is the matched first-practical route.`,
    route.firstHonestBurden ? `Burden: ${route.firstHonestBurden}.` : '',
    route.orderedIds.length > 0
      ? `Ordered entry IDs: ${route.orderedIds.join(' -> ')}.`
      : '',
    route.optionalIds.length > 0
      ? `Conditional additions: ${route.optionalIds.join(', ')}.`
      : '',
    route.landingIds.length > 0 ? `Landing surface: ${route.landingIds.join(', ')}.` : '',
    `Acceptance check: ${routeAcceptanceCheck(routeNodeId, route)}.`,
    `Next move: ${routeNextMove(routeNodeId, route)}.`,
    route.routeSurfaces.length > 0
      ? `Route-bearing surfaces: ${route.routeSurfaces.join(', ')}.`
      : '',
  ]
    .filter(Boolean)
    .join(' ');

  return buildResult(question, mode, rebuilt, snapshot, {
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

function routeAcceptanceCheck(
  routeNodeId: string,
  route: Snapshot['routeGraph']['nodes'][string],
): string {
  switch (routeNodeId) {
    case 'route:project-alignment':
      return 'a shared kickoff packet names the bounded context, actor roles, role/method/work split, first work-plan item, evidence to collect, and UTS-ready terms';
    case 'route:boundary-burden':
      return 'the boundary text is decomposed into layer-correct claims with named API/contract/protocol obligations, acceptance evidence, and owner handoff';
    case 'route:boundary-unpacking':
      return 'mixed boundary statements have stable claim IDs in a claim register and each atomic claim routes to one owner layer';
    default:
      return route.landingIds.length > 0
        ? `the packet reaches ${route.landingIds.join(', ')} with one explicit next owner and no full-spec paste`
        : 'the packet names the matched burden, ordered IDs, next owner, and one checkable output';
  }
}

function routeNextMove(
  routeNodeId: string,
  route: Snapshot['routeGraph']['nodes'][string],
): string {
  switch (routeNodeId) {
    case 'route:project-alignment':
      return 'read A.1.1 and A.15 first, draft the kickoff worksheet, then add A.15.2/A.15.3 only when the plan/run split must be made explicit';
    case 'route:boundary-burden':
      return 'read A.6, A.6.B, and A.6.C against the concrete boundary sentence before deciding whether A.6.P/A.6.Q/A.6.A is needed';
    case 'route:boundary-unpacking':
      return 'create the claim register first, then open exact pattern pages only for claims whose owner layer remains unclear';
    default:
      return route.orderedIds.length > 0
        ? `start with ${route.orderedIds[0]} and stop when the first bounded work packet is explicit`
        : 'use the route page as the bounded packet and open exact pattern pages only as needed';
  }
}

export function buildPatternAnswer(
  question: string,
  mode: AnswerMode,
  trace: TraceResult,
  snapshot: Snapshot,
  rebuilt: boolean,
): QueryResult {
  const patternIds = trace.selectedNodeIds.filter(
    (nodeId) => snapshot.compiledNodes[nodeId]?.kind === 'pattern',
  );
  const patterns = patternIds
    .map((patternId) => snapshot.patternGraph.nodes[patternId])
    .filter((pattern): pattern is Snapshot['patternGraph']['nodes'][string] => Boolean(pattern));

  const citations = unique(trace.selectedAnchorIds);
  const answer = patterns
    .map((pattern) => {
      const anchors = selectedAnchorsForPatternFromTrace(pattern.id, question, trace, snapshot);
      const sentences = anchors.flatMap((anchor) =>
        formatAnchorSentences(anchor, question, mode === 'compact' ? 1 : 2),
      );
      const summary = unique(sentences).slice(0, mode === 'compact' ? 2 : 4).join(' ');
      return `- ${pattern.id}: ${summary || pattern.title}`;
    })
    .join('\n');

  const constraints = unique(
    patterns.flatMap((pattern) => {
      const anchors = selectedAnchorsForPatternFromTrace(pattern.id, question, trace, snapshot).filter(
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

  const patternIdSet = new Set(patternIds);
  const relations = patternIds.flatMap((id) =>
    (snapshot.compiledNodes[id]?.neighborEdges ?? [])
      .filter((edge) => patternIdSet.has(edge.to))
      .map((edge) => ({ from: edge.from, relation: edge.relation, to: edge.to })),
  );

  return buildResult(question, mode, rebuilt, snapshot, {
    answer,
    ids: patternIds,
    relations,
    constraints,
    citations,
    confidence: confidenceFromTrace(trace),
    gaps: gapsFromTrace(trace),
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

export function answerPartCDrafts(
  question: string,
  mode: AnswerMode,
  snapshot: Snapshot,
  rebuilt: boolean,
): QueryResult {
  const grouped = getPartCDraftsByCluster(snapshot.patternGraph.nodes);
  const ids = Object.values(grouped).flatMap((patterns) => patterns.map((pattern) => pattern.id));
  const answerLines = Object.entries(grouped).flatMap(([cluster, patterns]) => {
    const rows = patterns.map((pattern) => `- ${pattern.id} - ${pattern.title}`);
    return rows.length > 0 ? [`${cluster}:`, ...rows] : [`${cluster}:`, '- none'];
  });
  return buildResult(question, mode, rebuilt, snapshot, {
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

export function prepareSynthesisSlices(trace: TraceResult, snapshot: Snapshot): AnswerSlice[] {
  return trace.selectedAnchorIds
    .map((anchorId) => snapshot.anchorMap[anchorId])
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

export function confidenceFromTrace(trace: TraceResult): number {
  const top = trace.candidateScores[0]?.score ?? 0;
  const ambiguous = trace.status === 'ambiguous';
  const base = Math.min(0.98, 0.45 + top / 20);
  const adjusted = trace.sufficient ? base : base - 0.1;
  return ambiguous ? Math.max(0.35, adjusted - 0.2) : Math.max(0.3, adjusted);
}

export function gapsFromTrace(trace: TraceResult): string[] {
  const gaps: string[] = [];
  if (trace.status === 'ambiguous') {
    gaps.push('Nearby candidates remained close in score; inspect the returned IDs together.');
  }
  if (!trace.sufficient) {
    gaps.push('Retrieval stopped at the bounded hop budget before every requested role was fully covered.');
  }
  return gaps;
}

function selectedAnchorsForPatternFromTrace(
  patternId: string,
  question: string,
  trace: TraceResult,
  snapshot: Snapshot,
): AnchorRef[] {
  const fromTrace = trace.selectedAnchorIds
    .map((anchorId) => snapshot.anchorMap[anchorId])
    .filter(
      (anchor): anchor is Snapshot['anchorMap'][string] =>
        Boolean(anchor) && anchor.nodeId === patternId,
    );
  if (fromTrace.length > 0) {
    return fromTrace;
  }

  const pattern = snapshot.patternGraph.nodes[patternId];
  return pattern ? selectBestAnchors(question, pattern, snapshot.anchorMap) : [];
}

function buildResult(
  question: string,
  mode: AnswerMode,
  rebuilt: boolean,
  snapshot: Snapshot,
  payload: Omit<QueryResult, 'mode' | 'question' | 'snapshot'>,
): QueryResult {
  return {
    ...payload,
    mode,
    question,
    snapshot: {
      sourceHash: snapshot.sourceHash,
      builtAt: snapshot.builtAt,
      rebuilt,
    },
  };
}
