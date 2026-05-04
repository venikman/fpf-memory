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

  it('injects the canonical pattern page when FlexSearch returns nothing', () => {
    const result: SearchResultGroup[] = [];
    afterSearch('A.1', result);
    expect(result.length).toBeGreaterThanOrEqual(1);
    const top = result[0]!;
    expect(top.group).toBe('FPF Reference');
    expect(top.result?.[0]?.link).toBe('/generated/patterns/A.1');
    expect(top.result?.[0]?.type).toBe('title');
  });

  it('injects compound pattern IDs that FlexSearch substring index misses', () => {
    // E.10.D2 and C.3.A are the two compound IDs the validator flagged
    // as unsearchable in Round 4 — both must inject as a top result.
    for (const id of ['E.10.D2', 'C.3.A']) {
      const result: SearchResultGroup[] = [];
      afterSearch(id, result);
      expect(result[0]?.group).toBe('FPF Reference');
      expect(result[0]?.result?.[0]?.link).toBe(`/generated/patterns/${id}`);
    }
  });

  it('injects route-selector queries with the route slug', () => {
    const result: SearchResultGroup[] = [];
    afterSearch('route:project-alignment', result);
    expect(result[0]?.group).toBe('FPF Reference');
    expect(result[0]?.result?.[0]?.link).toBe(
      '/generated/routes/route_project-alignment',
    );
  });

  it('also handles route-selector queries with case variation', () => {
    const result: SearchResultGroup[] = [];
    afterSearch('Route:Boundary-Burden', result);
    expect(result[0]?.result?.[0]?.link).toBe(
      '/generated/routes/route_boundary-burden',
    );
  });

  it('hoists existing FlexSearch results to position [0] without duplicating', () => {
    // FlexSearch already returned the canonical A.1 page — we should
    // pull it out of the original bucket and reuse it in the synthetic
    // top group so the user sees it once, with FlexSearch's highlight
    // info preserved (the hoisted item is the original).
    const a1Item: SearchResultItem = {
      type: 'title',
      title: 'A.1 Holonic Foundation: Entity → Holon',
      link: '/generated/patterns/A.1',
    };
    const result: SearchResultGroup[] = [
      {
        group: 'Other matches',
        renderType: 'default',
        result: [
          { type: 'content', title: 'Mention of A.1', link: '/generated/patterns/A.2' },
          a1Item,
        ],
      },
    ];
    afterSearch('A.1', result);
    expect(result[0]?.group).toBe('FPF Reference');
    expect(result[0]?.result?.[0]).toBe(a1Item);
    // The original bucket no longer contains the hoisted item.
    const otherBucket = result[1]?.result ?? [];
    expect(otherBucket.find((r) => r.link === '/generated/patterns/A.1')).toBeUndefined();
    // But the unrelated mention stays where it was.
    expect(otherBucket.length).toBe(1);
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
      { group: 'X', renderType: 'default', result: [a1Item] },
    ];
    afterSearch('A.1', result);
    expect(result[0]?.result?.[0]).toBe(a1Item);
    expect(result[1]?.result?.length ?? 0).toBe(0);
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
