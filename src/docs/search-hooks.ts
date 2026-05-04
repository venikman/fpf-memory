/**
 * Rspress search hooks — wired via `themeConfig.searchHooks` in rspress.config.ts.
 *
 * Exports an `afterSearch` function that runs after rspress's default
 * FlexSearch query and ensures exact FPF pattern-ID and route-selector
 * queries land on the canonical page first.
 *
 * Two scenarios:
 *   1. The query matches a known pattern ID (e.g. `A.1`, `E.10.D2`,
 *      `C.3.A`) or a route selector (e.g. `route:project-alignment`)
 *      AND FlexSearch's substring index already returned the canonical
 *      page — we hoist that result to position [0][0] and pin its
 *      group at the top.
 *   2. Same query type, but FlexSearch did NOT return the canonical
 *      page (compound IDs like `E.10.D2` and `C.3.A` reliably miss in
 *      FlexSearch's `tokenize: 'full'` index, R4-P1-002/003) — we
 *      synthesize a TitleMatch and prepend it as a new top group so
 *      the user always lands on the exact page they typed.
 *
 * The lookup table is generated from the spec snapshot at config-load
 * time and bundled in via `generated-search-id-registry.ts`.
 */

import { SEARCH_ID_REGISTRY } from './generated-search-id-registry.js';

interface SearchResultItem {
  type?: 'title' | 'header' | 'content';
  title?: string;
  header?: string;
  link?: string;
  query?: string;
  routePath?: string;
  group?: string;
  hits?: Array<{ link?: string; title?: string }>;
  highlightInfoList?: Array<{ start: number; length: number }>;
  statement?: string;
}

interface SearchResultGroup {
  group?: string;
  renderType?: string;
  result?: SearchResultItem[];
  list?: SearchResultItem[];
  hits?: SearchResultItem[];
  // Some shapes wrap the hits under `result.list` or `result.hits` — we
  // walk all candidate fields to stay forward-compatible with rspress
  // result shape changes.
  [key: string]: unknown;
}

// Lookup tables built once on module load. The pattern table is keyed
// by the canonical ID (case-sensitive — FPF uses uppercase part letters
// and case-sensitive cluster suffixes like `C.3.A` vs `C.3.a`). The
// route table is keyed by the lowercased slug to make `route:` queries
// case-insensitive.
const PATTERN_BY_ID = new Map(
  SEARCH_ID_REGISTRY.patterns.map((entry) => [entry.id, entry]),
);
const ROUTE_BY_SLUG = new Map(
  SEARCH_ID_REGISTRY.routes.map((entry) => [entry.slug.toLowerCase(), entry]),
);

const ROUTE_QUERY_PATTERN = /^route:([a-z0-9-]+)$/iu;

interface CanonicalEntry {
  /** Display title shown to the user in the suggestion list. */
  title: string;
  /** Page path (without base prefix — rspress's Link component prepends it). */
  link: string;
  /** Suggestion-list group label. */
  group: string;
}

function findCanonicalEntry(query: string): CanonicalEntry | null {
  const trimmed = query.trim();
  if (!trimmed) return null;

  const pattern = PATTERN_BY_ID.get(trimmed);
  if (pattern) {
    return {
      title: `${pattern.id} — ${pattern.title}`,
      link: pattern.staticPath,
      group: 'FPF Reference',
    };
  }

  const routeMatch = ROUTE_QUERY_PATTERN.exec(trimmed);
  if (routeMatch) {
    const route = ROUTE_BY_SLUG.get(routeMatch[1].toLowerCase());
    if (route) {
      return {
        title: `route: ${route.title}`,
        link: route.staticPath,
        group: 'FPF Reference',
      };
    }
  }

  return null;
}

function pageMatchesLink(item: SearchResultItem, link: string): boolean {
  const candidate = item.link || item.routePath || (item.hits && item.hits[0]?.link) || '';
  if (!candidate) return false;
  // Normalise: strip base prefix (rspress applies it inconsistently),
  // hash, trailing `.html`, and trailing slash, then exact-compare.
  const norm = candidate
    .replace(/^\/fpf-memory/, '')
    .replace(/#.*$/, '')
    .replace(/\.html$/, '')
    .replace(/\/$/, '');
  return norm === link;
}

function buckets(group: SearchResultGroup): SearchResultItem[][] {
  const collected: SearchResultItem[][] = [];
  if (Array.isArray(group.result)) collected.push(group.result);
  if (Array.isArray(group.list)) collected.push(group.list);
  if (Array.isArray(group.hits)) collected.push(group.hits);
  if (collected.length === 0) {
    const items = (group as unknown as { items?: unknown }).items;
    if (Array.isArray(items)) collected.push(items as SearchResultItem[]);
  }
  return collected;
}

function removeMatchingFromAllBuckets(
  searchResult: SearchResultGroup[],
  link: string,
): SearchResultItem | null {
  let removed: SearchResultItem | null = null;
  for (const group of searchResult) {
    for (const bucket of buckets(group)) {
      const idx = bucket.findIndex((item) => pageMatchesLink(item, link));
      if (idx >= 0) {
        const [hit] = bucket.splice(idx, 1);
        if (!removed) removed = hit;
      }
    }
  }
  return removed;
}

function synthesizeCanonicalResult(
  entry: CanonicalEntry,
  query: string,
): SearchResultItem {
  return {
    type: 'title',
    title: entry.title,
    header: entry.title,
    link: entry.link,
    query,
    highlightInfoList: [],
  };
}

export function afterSearch(
  query: string,
  searchResult: SearchResultGroup[],
): void {
  const canonical = findCanonicalEntry(query);
  if (!canonical) return;

  // Pull any existing FlexSearch result for this exact page out of every
  // bucket so the synthetic injection doesn't show duplicates. Use the
  // pulled item if present (it has FlexSearch's highlight info), or
  // synthesize a fresh TitleMatch otherwise.
  const existing = removeMatchingFromAllBuckets(searchResult, canonical.link);
  const canonicalItem =
    existing ?? synthesizeCanonicalResult(canonical, query);

  // Prepend a new group at index 0 so the canonical match is always
  // the first thing the user sees. This works even when FlexSearch
  // returned zero results for compound IDs like `C.3.A`.
  searchResult.unshift({
    group: canonical.group,
    renderType: 'default',
    result: [canonicalItem],
  });
}
