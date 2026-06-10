import { describe, expect, it } from '@rstest/core';

import { renderToolContent } from '../src/adapters/mcp/tool-text.js';

/**
 * Text-content fallback rendering for MCP tool results.
 *
 * Text-only MCP clients render only the `content` blocks of a tool result.
 * Every public tool must therefore produce a human-readable text block that
 * mirrors the structured payload instead of the old
 * "<tool> returned structured content." placeholder.
 */
describe('renderToolContent', () => {
  const snapshot = { sourceHash: 'sha256:abc123', builtAt: '2026-06-01T10:00:00.000Z' };

  it('renders a readable index status summary', () => {
    const text = renderToolContent('get_fpf_index_status', {
      sourcePath: '/srv/FPF-Spec.md',
      sourceHash: 'sha256:abc123',
      builtAt: '2026-06-01T10:00:00.000Z',
      snapshotExists: true,
      currentSourceHash: 'sha256:abc123',
      fresh: true,
      compilerMode: 'local_vectorless',
      artifacts: {
        snapshot: true,
        buildAudit: true,
        indexMap: true,
        patternGraph: true,
        routeGraph: true,
        lexicon: true,
        anchorMap: true,
        indexingView: true,
      },
      sessionCache: { enabled: true, maxSessions: 50, activeSessions: 3, persistent: false },
    });

    expect(text).not.toContain('returned structured content');
    expect(text).toContain('fresh');
    expect(text).toContain('sha256:abc123');
    expect(text).toContain('8/8');
    expect(text).toContain('2026-06-01T10:00:00.000Z');
  });

  it('flags a stale index status', () => {
    const text = renderToolContent('get_fpf_index_status', {
      sourcePath: '/srv/FPF-Spec.md',
      sourceHash: 'sha256:old',
      builtAt: '2026-05-01T10:00:00.000Z',
      snapshotExists: true,
      currentSourceHash: 'sha256:new',
      fresh: false,
      compilerMode: 'local_vectorless',
      artifacts: { snapshot: true, buildAudit: false },
      sessionCache: { enabled: false, maxSessions: 0, activeSessions: 0, persistent: false },
    });

    expect(text).toContain('stale');
    expect(text).toContain('1/2');
  });

  it('renders catalog entries with paging hints', () => {
    const text = renderToolContent('browse_fpf_catalog', {
      entries: [
        {
          id: 'A.1.1',
          kind: 'pattern',
          title: 'U.BoundedContext',
          status: 'STABLE',
          part: 'Part A',
          description: 'The semantic frame.',
        },
        {
          id: 'route:project-alignment',
          kind: 'route',
          title: 'project alignment',
          description: 'Route for project alignment.',
        },
      ],
      total: 8643,
      offset: 50,
      nextOffset: 52,
      filters: {},
      snapshot,
    });

    expect(text).not.toContain('returned structured content');
    expect(text).toContain('A.1.1');
    expect(text).toContain('U.BoundedContext');
    expect(text).toContain('route:project-alignment');
    expect(text).toContain('8643');
    // The reader must learn how to fetch the next page.
    expect(text).toContain('offset: 52');
  });

  it('renders search hits with snippets', () => {
    const text = renderToolContent('search_fpf', {
      query: 'bounded context',
      hits: [
        {
          id: 'A.1.1',
          kind: 'pattern',
          title: 'U.BoundedContext',
          score: 42,
          snippet: '…the semantic frame within which terms hold stable meaning…',
        },
      ],
      total: 17,
      snapshot,
    });

    expect(text).not.toContain('returned structured content');
    expect(text).toContain('A.1.1');
    expect(text).toContain('semantic frame');
    expect(text).toContain('17');
  });

  it('renders an inspect summary with anchors and neighbors', () => {
    const text = renderToolContent('inspect_fpf_node', {
      selector: 'A.1.1',
      resolvedAs: 'id',
      status: 'ok',
      node: { id: 'A.1.1', kind: 'pattern', title: 'U.BoundedContext' },
      anchors: [
        { id: 'A.1.1#definition', heading: 'Definition', role: 'definition' },
        { id: 'A.1.1#solution', heading: 'Solution', role: 'solution' },
      ],
      neighbors: [
        { id: 'A.1.2', kind: 'pattern', title: 'U.Role', relation: 'refines' },
      ],
      snapshot,
    });

    expect(text).not.toContain('returned structured content');
    expect(text).toContain('A.1.1');
    expect(text).toContain('U.BoundedContext');
    expect(text).toContain('A.1.1#definition');
    expect(text).toContain('A.1.2');
  });

  it('renders anchor text for inspect_fpf_anchor', () => {
    const text = renderToolContent('inspect_fpf_anchor', {
      anchorId: 'A.1.1#definition',
      status: 'ok',
      anchor: {
        id: 'A.1.1#definition',
        heading: 'Definition',
        role: 'definition',
        plainText: 'A bounded context is the semantic frame within which terms hold meaning.',
      },
      ownerNode: { id: 'A.1.1', kind: 'pattern', title: 'U.BoundedContext' },
      neighbors: [],
      snapshot,
    });

    expect(text).toContain('A.1.1#definition');
    expect(text).toContain('semantic frame');
    expect(text).toContain('U.BoundedContext');
  });

  it('renders one line per expanded citation', () => {
    const text = renderToolContent('expand_fpf_citations', {
      citationIds: ['A.1.1#definition', 'Z.9#missing'],
      items: [
        {
          citationId: 'A.1.1#definition',
          status: 'ok',
          anchor: {
            id: 'A.1.1#definition',
            heading: 'Definition',
            role: 'definition',
            plainText: 'A bounded context is the semantic frame.',
          },
          ownerNode: { id: 'A.1.1', kind: 'pattern', title: 'U.BoundedContext' },
          neighbors: [],
        },
        { citationId: 'Z.9#missing', status: 'not_found', neighbors: [] },
      ],
      snapshot,
    });

    expect(text).toContain('A.1.1#definition');
    expect(text).toContain('semantic frame');
    expect(text).toContain('Z.9#missing');
    expect(text).toContain('not_found');
  });

  it('renders a trace summary', () => {
    const text = renderToolContent('trace_fpf_path', {
      mode: 'compact',
      question: 'What is U.BoundedContext?',
      normalizedQuestion: 'what is u.boundedcontext',
      selectedNodeIds: ['A.1.1', 'A.1.2'],
      selectedAnchorIds: ['A.1.1#definition'],
      candidateScores: [],
      status: 'ok',
      sufficient: true,
      snapshot,
    });

    expect(text).not.toContain('returned structured content');
    expect(text).toContain('A.1.1');
    expect(text).toContain('ok');
  });

  it('mirrors candidate scores and graph expansions in the trace text', () => {
    const text = renderToolContent('trace_fpf_path', {
      mode: 'compact',
      question: 'boundary unpacking',
      normalizedQuestion: 'boundary unpacking',
      selectedNodeIds: ['A.2.3'],
      selectedAnchorIds: [],
      candidateScores: [
        { nodeId: 'A.2.3', kind: 'pattern', score: 14, reasons: ['title match'] },
        { nodeId: 'route:claim-decomposition', kind: 'route', score: 9, reasons: ['route alias'] },
      ],
      graphExpansions: [
        { from: 'A.2.3', relation: 'refines', to: 'A.2.1', reason: 'parent pattern' },
      ],
      status: 'ok',
      sufficient: true,
      snapshot,
    });

    // The tool description promises candidate scores and graph expansion —
    // the diagnostic core must reach text-only clients.
    expect(text).toContain('score 14');
    expect(text).toContain('title match');
    expect(text).toContain('route:claim-decomposition');
    expect(text).toContain('A.2.3 -[refines]-> A.2.1');
  });

  it('carries the markdown body for read_fpf_doc full mode', () => {
    const text = renderToolContent('read_fpf_doc', {
      selector: 'A.1.1',
      resolvedAs: 'id',
      status: 'ok',
      nodeId: 'A.1.1',
      title: 'U.BoundedContext',
      markdown: '# U.BoundedContext\n\nA bounded context is the semantic frame.',
      markdownChars: 58,
      truncated: false,
      headings: ['Definition'],
      snapshot,
    });

    // The exact page wording is the tool's primary deliverable; text-only
    // clients cannot reach structuredContent.markdown.
    expect(text).toContain('A bounded context is the semantic frame.');
    expect(text).not.toContain('Full markdown is in');
  });

  it('renders a refresh audit summary', () => {
    const text = renderToolContent('refresh_fpf_index', {
      sourcePath: '/srv/FPF-Spec.md',
      sourceHash: 'sha256:abc123',
      builtAt: '2026-06-01T10:00:00.000Z',
      rebuilt: true,
      reason: 'source_hash_changed',
      validation: {},
      compiler: { mode: 'local_vectorless', compiledNodes: 8643, anchorCount: 31000 },
      artifacts: {},
    });

    expect(text).toContain('rebuilt');
    expect(text).toContain('source_hash_changed');
    expect(text).toContain('8643');
  });

  it('passes ask_fpf markdown through unchanged', () => {
    expect(
      renderToolContent('ask_fpf', { markdown: '## Result\n\nAnswer body' }),
    ).toBe('## Result\n\nAnswer body');
  });

  it('mirrors query_fpf_spec grounding fields after the answer', () => {
    const text = renderToolContent('query_fpf_spec', {
      mode: 'compact',
      question: 'how do I decompose a claim?',
      answer: 'The answer.',
      ids: ['A.2.3'],
      relations: [],
      constraints: ['Keep claims bounded.'],
      citations: ['A.2.3#definition'],
      confidence: 0.82,
      gaps: [],
      status: 'ok',
      snapshot,
    });

    // The contract promises a bounded answer *with IDs, citations, and
    // constraints* — a text-only client must be able to chain into
    // read_fpf_doc / expand_fpf_citations from the text block alone.
    expect(text.startsWith('The answer.')).toBe(true);
    expect(text).toContain('A.2.3');
    expect(text).toContain('A.2.3#definition');
    expect(text).toContain('Keep claims bounded.');
    expect(text).toContain('confidence 0.82');
  });
});
