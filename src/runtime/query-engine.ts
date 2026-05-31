/**
 * query-engine.ts — QueryEngine orchestrator.
 *
 * Delegates to six focused stage modules:
 *   1. query-normalizer.ts   (QueryNormalizer)
 *   2. candidate-seeder.ts   (CandidateSeeder)
 *   3. candidate-ranker.ts   (CandidateRanker)
 *   4. frontier-expander.ts  (FrontierExpander)
 *   5. answer-projector.ts   (AnswerProjector)
 *
 * This file wires the stages together and exposes query(), trace(),
 * inspect(), readDoc(), inspectAnchor(), and expandCitations().
 */

import {
  isPartCDraftQuery,
  selectFastRouteMatch,
} from './compiler.js';
import {
  MAX_EXCLUDED,
  MAX_SELECTED_ANCHORS,
} from './constants.js';
import {
  buildDocsProjection,
  resolveDocTarget,
} from '../core/documents.js';
import { normalizeQuery } from './query-normalizer.js';
import { seedCandidates } from './candidate-seeder.js';
import { isAmbiguous, rankCandidates } from './candidate-ranker.js';
import { expandGrounding } from './frontier-expander.js';
import {
  answerPartCDrafts,
  buildPatternAnswer,
  buildRouteAnswer,
} from './answer-projector.js';
import { type RetrievalSessionState } from './session-cache.js';
import {
  extractIds,
  normalizeForLookup,
  unique,
} from './text.js';
import type {
  AnswerMode,
  CompiledNode,
  ExpandedCitation,
  ExpandCitationsResult,
  InspectAnchorResult,
  InspectNeighbor,
  InspectResult,
  QueryResult,
  ReadDocResult,
  Snapshot,
  TraceResult,
} from './types.js';

export class QueryEngine {
  private anchorOwnerNodeMap?: Map<string, CompiledNode>;

  constructor(
    private readonly snapshot: Snapshot,
    private readonly rebuilt: boolean,
    private readonly sessionState?: RetrievalSessionState,
  ) {}

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
      return answerPartCDrafts(question, mode, this.snapshot, this.rebuilt);
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

    // Thin / vague query (audit item #3): the trace flagged the
    // question as too tiny to express clear intent. Don't ride a
    // high retrieval score into a confident answer; surface a
    // clarification gap and the candidate IDs the retriever guessed
    // at, so the caller can either refine or pick from those.
    if (trace.status === 'unsupported') {
      const candidateIds = trace.selectedNodeIds.slice(0, 5);
      return this.result(question, mode, {
        answer:
          'The question is too short or generic to ground a confident answer. Add an FPF pattern ID, route name, or topic word, or pick a candidate ID below.',
        ids: [],
        relations: [],
        constraints: [],
        citations: [],
        confidence: 0.2,
        candidateIds,
        gaps: [
          candidateIds.length > 0
            ? `Closest retrieval candidates: ${candidateIds.join(', ')}. Re-ask with one of these IDs or with a route / topic word.`
            : 'Re-ask with an FPF pattern ID, route name, or topic word.',
        ],
        status: 'unsupported',
      });
    }

    const routeNodeId = trace.routeWins
      ? trace.selectedNodeIds.find(
          (nodeId) => this.snapshot.compiledNodes[nodeId]?.kind === 'route',
        )
      : undefined;
    const deterministic = routeNodeId
      ? buildRouteAnswer(question, mode, routeNodeId, trace, this.snapshot, this.rebuilt)
      : buildPatternAnswer(question, mode, trace, this.snapshot, this.rebuilt);

    return deterministic;
  }

  trace(question: string, mode: AnswerMode = 'compact'): TraceResult {
    const fastRouteTrace = mode === 'compact' ? this.fastRouteTrace(question, mode) : undefined;
    if (fastRouteTrace) {
      return fastRouteTrace;
    }

    const normalized = normalizeQuery(question, this.snapshot);
    if (!question.trim()) {
      return {
        mode,
        question,
        normalizedQuestion: normalized.normalizedQuestion,
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
        routeWins: false,
        sufficient: false,
        status: 'unsupported',
        snapshot: {
          sourceHash: this.snapshot.sourceHash,
          builtAt: this.snapshot.builtAt,
          rebuilt: this.rebuilt,
        },
      };
    }

    // Stage 2: Seed candidates
    const seeding = seedCandidates(normalized, this.snapshot, this.sessionState);

    // Stage 3: Rank and select initial nodes
    const ranking = rankCandidates(question, seeding.candidateMap, this.snapshot);

    // Stage 4: Expand grounding via frontier
    const grounding = expandGrounding(
      question,
      ranking.candidates,
      ranking.initialNodeIds,
      ranking.initialAnchorIds,
      seeding.frontierCandidates,
      seeding.frontierKeys,
      this.snapshot,
    );

    const selectedNodeIds = grounding.selectedNodeIds;
    const selectedAnchorIds = grounding.selectedAnchorIds;
    const excludedNodeIds = ranking.candidates
      .map((candidate) => candidate.nodeId)
      .filter((nodeId) => !selectedNodeIds.includes(nodeId))
      .slice(0, MAX_EXCLUDED);
    const sessionReusedNodeIds = this.sessionState
      ? selectedNodeIds.filter((nodeId) => this.sessionState?.lastSelectedNodeIds.includes(nodeId))
      : [];
    // Determine status. Two-token / no-FPF-term queries (e.g. "messy
    // project", "?") shouldn't ride high retrieval scores into a
    // confident "ok"; mark them `unsupported` so callers can ask the
    // user to clarify instead of treating the closest-pattern guess
    // as a real answer.
    const meaningfulTokens = question
      .trim()
      .split(/\s+/)
      .filter((token) => token.length > 1);
    const recognizedFpfTerm =
      normalized.detected.ids.length > 0 ||
      normalized.detected.lexemes.length > 0 ||
      normalized.detected.routeNames.length > 0 ||
      normalized.detected.familyTerms.length > 0 ||
      normalized.detected.statusTerms.length > 0;
    const thinQuery =
      meaningfulTokens.length < 3 ||
      (!recognizedFpfTerm && meaningfulTokens.length < 6);

    const status =
      selectedNodeIds.length === 0
        ? 'not_found'
        : thinQuery
          ? 'unsupported'
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
      selectedAnchorIds,
      excludedNodeIds,
      followedReferences: grounding.followedReferences,
      retrievalHops: grounding.retrievalHops,
      sessionApplied: seeding.sessionApplied,
      sessionReusedNodeIds,
      sessionMateriallyChanged:
        seeding.sessionApplied && sessionReusedNodeIds.length > 0 && normalized.detected.ids.length === 0,
      sufficient: grounding.sufficient,
      routeWins: ranking.routeWins,
      status,
      snapshot: {
        sourceHash: this.snapshot.sourceHash,
        builtAt: this.snapshot.builtAt,
        rebuilt: this.rebuilt,
      },
    };
  }

  private fastRouteTrace(question: string, mode: AnswerMode): TraceResult | undefined {
    if (!question.trim()) {
      return undefined;
    }

    if (extractIds(question).length > 0) {
      return undefined;
    }

    const match = selectFastRouteMatch(question, this.snapshot.routeGraph.nodes);
    if (!match) {
      return undefined;
    }

    const route = this.snapshot.routeGraph.nodes[match.routeId];
    if (!route) {
      return undefined;
    }

    const selectedNodeIds = unique([
      route.id,
      ...route.orderedIds,
      ...route.landingIds,
    ]).filter((nodeId) => Boolean(this.snapshot.compiledNodes[nodeId]));
    const selectedNodeSet = new Set(selectedNodeIds);
    const selectedAnchorIds = unique(route.anchorIds).slice(0, MAX_SELECTED_ANCHORS);
    const graphExpansions = (this.snapshot.compiledNodes[route.id]?.neighborEdges ?? [])
      .filter((edge) => selectedNodeSet.has(edge.to))
      .map((edge) => ({
        from: edge.from,
        relation: edge.relation,
        to: edge.to,
        reason: match.reason,
      }));
    const frontierCandidates = selectedNodeIds.map((nodeId, index) => {
      const node = this.snapshot.compiledNodes[nodeId]!;
      return {
        targetId: nodeId,
        kind: node.kind,
        reason: index === 0 ? match.reason : `fast route expansion from ${route.id}`,
        score: index === 0 ? match.score : Math.max(1, match.score - index),
        origin: 'route_expansion' as const,
      };
    });

    return {
      mode,
      question,
      normalizedQuestion: normalizeForLookup(question),
      detected: {
        ids: extractIds(question),
        lexemes: [],
        routeNames: [route.name],
        familyTerms: [],
        statusTerms: [],
      },
      candidateScores: [
        {
          nodeId: route.id,
          kind: 'route',
          score: match.score,
          reasons: [match.reason],
        },
      ],
      frontierCandidates,
      graphExpansions,
      selectedNodeIds,
      selectedAnchorIds,
      excludedNodeIds: [],
      followedReferences: [],
      retrievalHops: [
        {
          iteration: 1,
          reason: match.reason,
          addedNodeIds: selectedNodeIds.slice(1),
          addedAnchorIds: selectedAnchorIds,
          sufficientAfter: true,
        },
      ],
      sessionApplied: false,
      sessionReusedNodeIds: [],
      sessionMateriallyChanged: false,
      sufficient: true,
      routeWins: true,
      status: 'ok',
      snapshot: {
        sourceHash: this.snapshot.sourceHash,
        builtAt: this.snapshot.builtAt,
        rebuilt: this.rebuilt,
      },
    };
  }

  inspect(selector: string, kind: 'auto' | 'id' | 'route' | 'lexeme' = 'auto'): InspectResult {
    const resolved = this.resolveNode(selector, kind);
    if (!resolved) {
      return this.notFoundInspect(selector);
    }

    const { node, resolvedAs } = resolved;
    return {
      selector,
      resolvedAs,
      status: 'ok',
      node,
      anchors: (node.anchorIds ?? [])
        .map((anchorId) => this.snapshot.anchorMap[anchorId])
        .filter((anchor): anchor is Snapshot['anchorMap'][string] => Boolean(anchor)),
      neighbors: this.neighborsForNode(node),
      docRef: resolveDocTarget(this.snapshot, node.id)?.docRef,
      snapshot: this.snapshotRef(),
    };
  }

  readDoc(
    selector: string,
    kind: 'auto' | 'id' | 'route' | 'lexeme' = 'auto',
    options: { mode?: 'preview' | 'full'; maxChars?: number } = {},
  ): ReadDocResult {
    const resolved = this.resolveNode(selector, kind);
    if (!resolved) {
      return this.notFoundReadDoc(selector);
    }

    const { node, resolvedAs } = resolved;
    const docTarget = resolveDocTarget(this.snapshot, node.id);
    const page = docTarget
      ? buildDocsProjection(this.snapshot).pagesByMarkdownPath[docTarget.docRef.markdownPath]
      : undefined;
    if (!docTarget || !page) {
      return this.notFoundReadDoc(selector, resolvedAs);
    }

    const fullMarkdown = page.markdown;
    const markdownChars = fullMarkdown.length;
    const headings = extractMarkdownHeadings(fullMarkdown);
    const mode = options.mode ?? 'full';

    if (mode === 'preview') {
      return {
        selector,
        resolvedAs,
        status: 'ok',
        nodeId: docTarget.nodeId,
        title: docTarget.title,
        docRef: docTarget.docRef,
        markdownChars,
        headings,
        preview: extractMarkdownPreview(fullMarkdown),
        snapshot: this.snapshotRef(),
      };
    }

    let markdown = fullMarkdown;
    let truncated = false;
    if (typeof options.maxChars === 'number' && options.maxChars < markdownChars) {
      markdown = `${fullMarkdown.slice(0, options.maxChars)}\n\n…`;
      truncated = true;
    }

    return {
      selector,
      resolvedAs,
      status: 'ok',
      nodeId: docTarget.nodeId,
      title: docTarget.title,
      docRef: docTarget.docRef,
      markdown,
      markdownChars,
      ...(truncated ? { truncated: true } : {}),
      headings,
      snapshot: this.snapshotRef(),
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
      snapshot: this.snapshotRef(),
    };
  }

  expandCitations(citationIds: string[]): ExpandCitationsResult {
    return {
      citationIds,
      items: citationIds.map((citationId) => this.expandCitation(citationId)),
      snapshot: this.snapshotRef(),
    };
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
      const routeIdMatch = this.routeIdSelectorMatch(selector, normalizedSelector);
      if (routeIdMatch) {
        return routeIdMatch;
      }

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

  private routeIdSelectorMatch(
    selector: string,
    normalizedSelector: string,
  ): string | undefined {
    const exactNode = this.snapshot.compiledNodes[selector];
    if (exactNode?.kind === 'route') {
      return exactNode.id;
    }

    return this.snapshot.indexes.idIndex[normalizedSelector]?.find(
      (nodeId) => this.snapshot.compiledNodes[nodeId]?.kind === 'route',
    );
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
      .sort((left, right) => right.score - left.score || left.nodeId.localeCompare(right.nodeId))[0]
      ?.nodeId;
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

  private findOwnerNodeForAnchor(anchor: { id: string; nodeId?: string }): CompiledNode | undefined {
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

  private snapshotRef(): { sourceHash: string; builtAt: string } {
    return { sourceHash: this.snapshot.sourceHash, builtAt: this.snapshot.builtAt };
  }

  private resolveNode(
    selector: string,
    kind: 'auto' | 'id' | 'route' | 'lexeme',
  ): { node: CompiledNode; resolvedAs: 'id' | 'route' | 'lexeme' } | undefined {
    const nodeId = this.resolveSelector(selector, kind);
    const node = nodeId ? this.snapshot.compiledNodes[nodeId] : undefined;
    return node ? { node, resolvedAs: this.resolvedAsForNode(node) } : undefined;
  }

  private resolvedAsForNode(node: CompiledNode): 'id' | 'route' | 'lexeme' {
    if (node.kind === 'pattern' || node.kind === 'preface') return 'id';
    return node.kind;
  }

  private notFoundInspect(selector: string): InspectResult {
    return {
      selector,
      resolvedAs: 'not_found',
      status: 'not_found',
      anchors: [],
      neighbors: [],
      snapshot: this.snapshotRef(),
    };
  }

  private notFoundReadDoc(
    selector: string,
    resolvedAs: ReadDocResult['resolvedAs'] = 'not_found',
  ): ReadDocResult {
    return {
      selector,
      resolvedAs,
      status: 'not_found',
      snapshot: this.snapshotRef(),
    };
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
      snapshot: { ...this.snapshotRef(), rebuilt: this.rebuilt },
    };
  }
}

const MARKDOWN_PREVIEW_MAX_CHARS = 320;

/**
 * Walk the markdown body, collecting H2 / H3 heading text in document
 * order. Skips fenced code blocks so a `## Example` line inside a
 * code sample isn't mistaken for a real heading. Stops at the
 * frontmatter block — the page's H1 is its title (returned
 * separately on ReadDocResult.title) so we don't include it here.
 */
function extractMarkdownHeadings(markdown: string): string[] {
  const headings: string[] = [];
  const lines = markdown.split('\n');
  let inFence = false;
  for (const line of lines) {
    if (/^[ ]{0,3}```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    headings.push(match[2]!);
    if (headings.length >= 50) break;
  }
  return headings;
}

/**
 * Build a short text-content preview suitable for an MCP fallback
 * surface or a search-result hover card. Strips frontmatter, the
 * leading H1, breadcrumb / byline HTML, and code fences; flattens
 * whitespace; caps the result around MARKDOWN_PREVIEW_MAX_CHARS at a
 * word boundary so the snippet doesn't end mid-word.
 */
function extractMarkdownPreview(markdown: string): string {
  let text = markdown;
  text = text.replace(/^---\n[\s\S]*?\n---\n/, '');
  text = text.replace(/^<nav[^>]*>[\s\S]*?<\/nav>\n*/m, '');
  text = text.replace(/^# .*\n/m, '');
  text = text.replace(/^<p[^>]*>[\s\S]*?<\/p>\n*/m, '');
  text = text.replace(/^[ ]{0,3}```[\s\S]*?^[ ]{0,3}```/gm, '');
  text = text.replace(/<[^>]+>/g, '');
  text = text.replace(/\s+/g, ' ').trim();

  if (text.length <= MARKDOWN_PREVIEW_MAX_CHARS) {
    return text;
  }
  const cut = text.slice(0, MARKDOWN_PREVIEW_MAX_CHARS);
  const lastSpace = cut.lastIndexOf(' ');
  const trimmed = lastSpace > 0 ? cut.slice(0, lastSpace) : cut;
  return `${trimmed}…`;
}
