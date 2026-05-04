import { describe, expect, it } from '@rstest/core';

import { afterSearch } from '../src/docs/search-hooks.js';

/**
 * Regression tests for the search-hooks `afterSearch` injection path.
 *
 * The hook ensures exact-ID and route-selector queries land on the
 * canonical page first, even when FlexSearch's substring index doesn't
 * return that page (R4-P1-002, R4-P1-003).
 *
 * The registry is generated from the real spec snapshot at config-load
 * time and bundled at build time. These tests exercise the hook against
 * the same generated registry — failures here mean the registry shape
 * or the canonical pattern/route IDs the validator depends on have
 * drifted.
 */

// The hook's exported types live inside its module; the public
// signature accepts a structurally compatible array. We mirror the
// shape with an index signature so TypeScript is happy passing our
// fixture through.
interface SearchResultItem {
  type?: 'title' | 'header' | 'content';
  title?: string;
  link?: string;
}
interface SearchResultGroup {
  group?: string;
  renderType?: string;
  result?: SearchResultItem[];
  list?: SearchResultItem[];
  hits?: SearchResultItem[];
  [key: string]: unknown;
}

describe('search-hooks afterSearch', () => {
  it('does nothing for non-ID queries', () => {
    const result: SearchResultGroup[] = [
      { group: 'Some Page', renderType: 'default', result: [{ title: 'foo', link: '/foo' }] },
    ];
    afterSearch('hello world', result);
    expect(result).toHaveLength(1);
    expect(result[0]?.group).toBe('Some Page');
  });

  it('injects the canonical pattern page into the existing first group', () => {
    // Rspress's PageSearcher always returns at least an empty group
    // labelled with `siteTitle` ("FPF Reference") even when FlexSearch
    // returns 0 hits. The hook must merge into THAT group rather than
    // prepend a new one with the same label (would collide on React
    // keys + show two adjacent tabs with the same name).
    const result: SearchResultGroup[] = [
      { group: 'FPF Reference', renderType: 'default', result: [] },
    ];
    afterSearch('A.1', result);
    expect(result).toHaveLength(1);
    const top = result[0]!;
    expect(top.group).toBe('FPF Reference');
    expect(top.result?.[0]?.link).toBe('/generated/patterns/A.1');
    expect(top.result?.[0]?.type).toBe('title');
  });

  it('does not create a duplicate group with the siteTitle label', () => {
    // Regression for PR #72 review: the previous implementation always
    // unshifted a new "FPF Reference" group, so searching `E.10.D2`
    // produced two adjacent tabs with the same label.
    const result: SearchResultGroup[] = [
      { group: 'FPF Reference', renderType: 'default', result: [] },
    ];
    afterSearch('E.10.D2', result);
    const groupNames = result.map((g) => g.group);
    expect(groupNames).toEqual(['FPF Reference']);
    expect(new Set(groupNames).size).toBe(groupNames.length);
  });

  it('injects compound pattern IDs that FlexSearch substring index misses', () => {
    // E.10.D2 and C.3.A are the two compound IDs the validator flagged
    // as unsearchable in Round 4 — both must inject at position [0] of
    // the existing siteTitle group.
    for (const id of ['E.10.D2', 'C.3.A']) {
      const result: SearchResultGroup[] = [
        { group: 'FPF Reference', renderType: 'default', result: [] },
      ];
      afterSearch(id, result);
      expect(result[0]?.result?.[0]?.link).toBe(`/generated/patterns/${id}`);
    }
  });

  it('injects route-selector queries with the route slug', () => {
    const result: SearchResultGroup[] = [
      { group: 'FPF Reference', renderType: 'default', result: [] },
    ];
    afterSearch('route:project-alignment', result);
    expect(result[0]?.result?.[0]?.link).toBe(
      '/generated/routes/route_project-alignment',
    );
  });

  it('also handles route-selector queries with case variation', () => {
    const result: SearchResultGroup[] = [
      { group: 'FPF Reference', renderType: 'default', result: [] },
    ];
    afterSearch('Route:Boundary-Burden', result);
    expect(result[0]?.result?.[0]?.link).toBe(
      '/generated/routes/route_boundary-burden',
    );
  });

  it('tolerates whitespace and quote wrappers after route:', () => {
    // Users naturally type `route: project-alignment` with a space, and
    // the spec sometimes wraps selectors in backticks. Both should
    // resolve to the same canonical page (R5-P2-005).
    for (const query of [
      'route: project-alignment',
      'route :project-alignment',
      'route : project-alignment',
      'route:`project-alignment`',
      'route: "project-alignment"',
    ]) {
      const result: SearchResultGroup[] = [
        { group: 'FPF Reference', renderType: 'default', result: [] },
      ];
      afterSearch(query, result);
      expect(result[0]?.result?.[0]?.link).toBe(
        '/generated/routes/route_project-alignment',
      );
    }
  });

  it('strips wrapping quotes/backticks around pattern IDs (common copy/paste form)', () => {
    // Users paste selectors as `\`A.1\`` (markdown), `"A.1"` (config),
    // or `'A.1'` (prompts). All three should resolve to the canonical
    // page. Mismatched wrappers (`"A.1\`) are left as-is and miss the
    // lookup intentionally.
    for (const query of ['`A.1`', '"A.1"', "'A.1'", '`E.10.D2`', '"C.3.A"']) {
      const result: SearchResultGroup[] = [
        { group: 'FPF Reference', renderType: 'default', result: [] },
      ];
      afterSearch(query, result);
      const id = query.replace(/^[`"']|[`"']$/g, '');
      expect(result[0]?.result?.[0]?.link).toBe(`/generated/patterns/${id}`);
    }
  });

  it('strips wrapping quotes/backticks around route selectors', () => {
    // The ROUTE_QUERY_PATTERN already accepts an inner quote after
    // `route:` (covering `route:"slug"`), but the OUTER wrap
    // (`\`route:slug\``) needs the up-front strip.
    for (const query of [
      '`route:project-alignment`',
      '"route:project-alignment"',
      "'route:project-alignment'",
    ]) {
      const result: SearchResultGroup[] = [
        { group: 'FPF Reference', renderType: 'default', result: [] },
      ];
      afterSearch(query, result);
      expect(result[0]?.result?.[0]?.link).toBe(
        '/generated/routes/route_project-alignment',
      );
    }
  });

  it('leaves mismatched quote pairs alone (does not silently strip)', () => {
    // `"A.1\`` has different opening and closing wrappers — should NOT
    // be stripped. Falls through to no-match → original result intact.
    const result: SearchResultGroup[] = [
      { group: 'FPF Reference', renderType: 'default', result: [] },
    ];
    afterSearch('"A.1`', result);
    // No injection because the lookup didn't match.
    expect(result[0]?.result?.length ?? 0).toBe(0);
  });

  it('synthesized route results include the canonical selector in the title', () => {
    // The display title must contain the exact copyable selector so
    // users see `route:project-alignment` when they search and can grab
    // the canonical string for prompts/configs (R5-P2-005).
    const result: SearchResultGroup[] = [
      { group: 'FPF Reference', renderType: 'default', result: [] },
    ];
    afterSearch('route:project-alignment', result);
    const title = result[0]?.result?.[0]?.title ?? '';
    expect(title).toContain('route:project-alignment');
  });

  it('hoists existing FlexSearch results to position [0] without duplicating', () => {
    // FlexSearch already returned the canonical A.1 page — we should
    // pull it out of its original bucket and prepend it to the first
    // group so the user sees it once, with FlexSearch's highlight info
    // preserved (the hoisted item is the original).
    const a1Item: SearchResultItem = {
      type: 'title',
      title: 'A.1 Holonic Foundation: Entity → Holon',
      link: '/generated/patterns/A.1',
    };
    const result: SearchResultGroup[] = [
      {
        group: 'FPF Reference',
        renderType: 'default',
        result: [
          { type: 'content', title: 'Mention of A.1', link: '/generated/patterns/A.2' },
          a1Item,
        ],
      },
    ];
    afterSearch('A.1', result);
    // Still exactly one group, named FPF Reference (no duplicate label).
    expect(result).toHaveLength(1);
    expect(result[0]?.group).toBe('FPF Reference');
    // Hoisted A.1 is at position [0]; the unrelated mention stays.
    expect(result[0]?.result?.[0]).toBe(a1Item);
    expect(result[0]?.result?.[1]?.link).toBe('/generated/patterns/A.2');
    expect(result[0]?.result?.length).toBe(2);
  });

  it('strips base prefix and trailing junk when matching existing entries', () => {
    // Production links sometimes include the base prefix (`/fpf-memory`)
    // or a trailing `.html`. The hook must dedupe regardless.
    const a1Item: SearchResultItem = {
      type: 'title',
      title: 'A.1',
      link: '/fpf-memory/generated/patterns/A.1.html',
    };
    const result: SearchResultGroup[] = [
      { group: 'FPF Reference', renderType: 'default', result: [a1Item] },
    ];
    afterSearch('A.1', result);
    expect(result).toHaveLength(1);
    expect(result[0]?.result?.[0]).toBe(a1Item);
    expect(result[0]?.result?.length).toBe(1);
  });

  it('falls back to a synthetic group when searchResult is completely empty', () => {
    // Extreme edge — rspress almost always returns at least one group.
    // When it does not, synthesize one labelled with the canonical
    // page title (never the siteTitle, so no future collision risk).
    const result: SearchResultGroup[] = [];
    afterSearch('A.1', result);
    expect(result).toHaveLength(1);
    expect(result[0]?.group).not.toBe('FPF Reference');
    expect(result[0]?.result?.[0]?.link).toBe('/generated/patterns/A.1');
  });

  it('returns synth result for unknown route slugs (no panic)', () => {
    const result: SearchResultGroup[] = [
      { group: 'X', renderType: 'default', result: [{ link: '/start-here', title: 'Start Here' }] },
    ];
    afterSearch('route:does-not-exist', result);
    // No registry hit → no injection. Original result preserved.
    expect(result).toHaveLength(1);
    expect(result[0]?.group).toBe('X');
  });

  it('returns synth result for unknown pattern IDs (no panic)', () => {
    const result: SearchResultGroup[] = [];
    afterSearch('Z.99.NOPE', result);
    expect(result).toHaveLength(0);
  });

  it('handles empty queries safely', () => {
    const result: SearchResultGroup[] = [];
    afterSearch('', result);
    expect(result).toHaveLength(0);
    afterSearch('   ', result);
    expect(result).toHaveLength(0);
  });
});
