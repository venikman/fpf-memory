/**
 * Rspress search hooks — wired via `themeConfig.searchHooks` in rspress.config.ts.
 *
 * Exports an `afterSearch` function that runs after rspress's default
 * FlexSearch query and reorders results in place so exact FPF pattern-ID
 * queries (e.g. `A.1`, `E.10.D2`, `route:project-alignment`) rank the
 * canonical page first.
 *
 * Without this, FlexSearch's `tokenize: 'full'` substring index ranks
 * every page that mentions `A.1.x` ahead of the actual `A.1` page when
 * the user types `A.1` — descendants accumulate more substring hits than
 * the parent (R3-P2-002, FU-P2-008).
 */

interface SearchResultItem {
  routePath?: string;
  link?: string;
  group?: string;
  title?: string;
  hits?: Array<{ link?: string; title?: string }>;
}

interface SearchResultGroup {
  group?: string;
  result?: SearchResultItem[];
  list?: SearchResultItem[];
  hits?: SearchResultItem[];
  // Some shapes wrap the hits under `result.list` or `result.hits` — we
  // walk all candidate fields to stay forward-compatible with rspress
  // result shape changes.
  [key: string]: unknown;
}

const FPF_ID_PATTERN = /^[A-K](?:\.[A-Z0-9]+)+(?::[A-Za-z0-9.]+)?$|^route:[a-z0-9-]+$/u;

function isExactIdQuery(query: string): boolean {
  return FPF_ID_PATTERN.test(query.trim());
}

function exactIdRouteForQuery(query: string): string | null {
  const trimmed = query.trim();
  if (!isExactIdQuery(trimmed)) return null;
  if (trimmed.startsWith('route:')) {
    const slug = trimmed.replace(/^route:/, '');
    return `/generated/routes/route_${slug}`;
  }
  return `/generated/patterns/${trimmed}`;
}

function pageMatchesExactRoute(item: SearchResultItem, route: string): boolean {
  const candidate = item.routePath || item.link || (item.hits && item.hits[0]?.link) || '';
  if (!candidate) return false;
  // Normalise: strip base prefix (rspress applies it inconsistently) +
  // trailing slash + .html, then exact compare.
  const norm = candidate
    .replace(/^\/fpf-memory/, '')
    .replace(/\.html$/, '')
    .replace(/\/$/, '');
  return norm === route;
}

function reorderArray<T extends SearchResultItem>(items: T[], route: string): void {
  const idx = items.findIndex((it) => pageMatchesExactRoute(it, route));
  if (idx > 0) {
    const [hit] = items.splice(idx, 1);
    items.unshift(hit);
  }
}

export function afterSearch(
  query: string,
  searchResult: SearchResultGroup[],
): void {
  const route = exactIdRouteForQuery(query);
  if (!route) return;

  for (const group of searchResult) {
    // The group may carry results under `result`, `list`, or `hits`
    // depending on the rspress version. Walk each shape we know.
    const buckets: SearchResultItem[][] = [];
    if (Array.isArray(group.result)) buckets.push(group.result);
    if (Array.isArray(group.list)) buckets.push(group.list);
    if (Array.isArray(group.hits)) buckets.push(group.hits);
    if (buckets.length === 0 && Array.isArray((group as unknown as { items?: unknown }).items)) {
      buckets.push((group as unknown as { items: SearchResultItem[] }).items);
    }
    for (const bucket of buckets) reorderArray(bucket, route);
  }
}
