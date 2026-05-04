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
 *      page — we hoist that result to position [0] of the first group.
 *   2. Same query type, but FlexSearch did NOT return the canonical
 *      page (compound IDs like `E.10.D2` and `C.3.A` reliably miss in
 *      FlexSearch's `tokenize: 'full'` index, R4-P1-002/003) — we
 *      synthesize a TitleMatch and prepend it to the first group's
 *      result list so the user always lands on the exact page they
 *      typed.
 *
 * The canonical entry merges into rspress's existing first group
 * rather than introducing a new one. Rspress's PageSearcher always
 * returns at least one group keyed by `siteTitle` (here
 * "FPF Reference"); a second group with the same name would create
 * duplicate React keys AND render two adjacent tabs with the same
 * label (PR #72 review feedback).
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

// Accept optional whitespace and a stray quotes wrapper after `route:`
// because users naturally type `route: project-alignment` (with a space)
// and the FPF spec text often uses backticks/quotes around route IDs.
// The slug match itself still requires the canonical `kebab-case` form.
const ROUTE_QUERY_PATTERN = /^route\s*:\s*['"`]?([a-z0-9-]+)['"`]?$/iu;

interface CanonicalEntry {
  /** Display title shown to the user in the suggestion list. */
  title: string;
  /** Page path (without base prefix — rspress's Link component prepends it). */
  link: string;
}

/**
 * Strip a single matching pair of wrapping quotes/backticks from a
 * trimmed query so users can paste `` `A.1` ``, `"A.1"`, or `'A.1'`
 * (the most common copy/paste shapes from docs and prompts) and still
 * hit the canonical-page lookup. Only strips when the open and close
 * characters match — `"foo'` is left alone.
 */
function stripWrappingQuotes(value: string): string {
  if (value.length < 2) return value;
  const first = value[0]!;
  const last = value[value.length - 1]!;
  if ((first === '`' || first === '"' || first === "'") && first === last) {
    return value.slice(1, -1).trim();
  }
  return value;
}

function findCanonicalEntry(query: string): CanonicalEntry | null {
  const trimmed = stripWrappingQuotes(query.trim());
  if (!trimmed) return null;

  const pattern = PATTERN_BY_ID.get(trimmed);
  if (pattern) {
    return {
      title: `${pattern.id} — ${pattern.title}`,
      link: pattern.staticPath,
    };
  }

  const routeMatch = ROUTE_QUERY_PATTERN.exec(trimmed);
  if (routeMatch) {
    const slug = routeMatch[1].toLowerCase();
    const route = ROUTE_BY_SLUG.get(slug);
    if (route) {
      // Always include the canonical selector in the displayed title so
      // the user can copy the exact `route:slug` string from the search
      // result (R5-P2-005). The display name follows for readability.
      return {
        title: `route:${slug} — ${route.title}`,
        link: route.staticPath,
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

/**
 * Return every result-bucket on a group. Different rspress versions wrap
 * the result list under different keys; we walk all of them so the hook
 * stays forward-compatible.
 */
function bucketsOf(group: SearchResultGroup): SearchResultItem[][] {
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
    for (const bucket of bucketsOf(group)) {
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
  // bucket so the canonical entry doesn't appear twice. The pulled item
  // (if found) already has FlexSearch's highlight info; otherwise we
  // synthesize a fresh TitleMatch.
  const existing = removeMatchingFromAllBuckets(searchResult, canonical.link);
  const canonicalItem =
    existing ?? synthesizeCanonicalResult(canonical, query);

  // Merge into the existing first group rather than prepending a new
  // one. See module docstring for why.
  if (searchResult.length > 0) {
    const top = searchResult[0]!;
    const bucket = bucketsOf(top)[0];
    if (bucket) {
      bucket.unshift(canonicalItem);
    } else {
      top.result = [canonicalItem];
    }
    return;
  }

  // FlexSearch returned no groups at all (extreme edge — rspress almost
  // always returns at least the empty siteTitle group). Synthesize one,
  // labeled with the canonical page title so it can never collide with
  // the siteTitle label even if rspress later prepends one.
  searchResult.push({
    group: canonical.title,
    renderType: 'default',
    result: [canonicalItem],
  });
}
