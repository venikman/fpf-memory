import type {
  CompiledNode,
  DocRef,
  LexiconEntry,
  PatternRecord,
  RelationEdge,
  RouteRecord,
  Snapshot,
} from './types.js';
import {
  OPTIONAL_TERM_LINKS,
  resolveOptionalTermPatternId,
} from './optional-term-links.js';
import { normalizeForLookup, unique } from './text.js';

export interface GeneratedDocPage {
  kind: 'pattern' | 'route' | 'preface' | 'index';
  nodeId?: string;
  title: string;
  markdownPath: string;
  staticPath: string;
  markdown: string;
}

export interface DocsProjection {
  pages: GeneratedDocPage[];
  pagesByMarkdownPath: Record<string, GeneratedDocPage>;
}

export interface DocTarget {
  nodeId: string;
  title: string;
  docRef: DocRef;
}

export interface DocsNavLink {
  text: string;
  link: string;
}

export interface DocsNavGroup {
  text: string;
  items: DocsNavLink[];
}

export interface DocsNavigation {
  patterns: DocsNavGroup[];
  routes: DocsNavGroup[];
  preface: DocsNavGroup[];
}

/**
 * Lookup payload for the docs search hook (`src/docs/search-hooks.ts`).
 * Built from the same snapshot as the navigation so exact-ID and
 * `route:<slug>` queries can resolve the canonical page even when
 * FlexSearch's substring index doesn't return it (R4-P1-002, R4-P1-003).
 *
 * Generated at config-load time and written to
 * `src/docs/generated-search-id-registry.ts`, which the bundled hook
 * imports.
 */
export interface SearchIdRegistry {
  /** Canonical pattern pages keyed by exact pattern ID. */
  patterns: Array<{ id: string; title: string; staticPath: string }>;
  /** Canonical route pages keyed by route slug (the `route:` part stripped). */
  routes: Array<{ slug: string; title: string; staticPath: string }>;
}

/**
 * Publication manifest block surfaced on the wiki homepage so readers
 * can tell at a glance which FPF version this build was projected from.
 * Sourced from `published/current/manifest.json` at docs build time.
 */
export interface PublicationManifestSummary {
  channel: string;
  sourceHash: string;
  upstreamRef: string;
  publishedAt: string;
  /** Repository URL the upstream ref lives in (e.g. github.com/ailev/FPF). */
  upstreamRepoUrl?: string;
  /** ISO date the upstream commit was authored — drives "Last Updated". */
  upstreamCommittedAt?: string;
}

const DOCS_ROOT = 'docs';
const GENERATED_ROOT = `${DOCS_ROOT}/generated`;

export function buildDocsProjection(
  snapshot: Snapshot,
  manifest?: PublicationManifestSummary,
): DocsProjection {
  const pages: GeneratedDocPage[] = [
    ...buildPatternPages(snapshot),
    ...buildRoutePages(snapshot),
    ...buildPrefacePages(snapshot),
    buildPatternIndexPage(snapshot),
    buildPatternsAliasPage(snapshot),
    buildRouteIndexPage(snapshot),
    buildPrefaceIndexPage(snapshot),
    buildRootIndexPage(snapshot, manifest),
  ];

  // Stamp every generated page with the truthful last-modified date.
  // For pattern / preface pages, this is the most recent commit that
  // touched THAT section's line range in the upstream spec (if blame
  // data was attached at publish time). For routes, catalogs, and
  // the home page, we fall back to the whole-file upstream commit
  // date from the manifest. Generated pages aren't tracked in git,
  // so rspress's git-based lastUpdated is disabled; we render the
  // date ourselves as a small footer line and also expose it in
  // frontmatter for search/SEO consumers.
  if (manifest) {
    for (const page of pages) {
      const sectionBlame =
        page.nodeId ? sectionBlameForNode(snapshot, page.nodeId) : undefined;
      page.markdown = stampLastUpdated(page.markdown, manifest, sectionBlame);
    }
  }

  return {
    pages,
    pagesByMarkdownPath: Object.fromEntries(
      pages.map((page) => [page.markdownPath, page] as const),
    ),
  };
}

interface SectionBlame {
  lastCommittedAt: string;
  lastCommitSha: string;
}

/**
 * Look up the per-section blame stamp for the page's primary node.
 * Pattern pages and preface pages map directly to an indexMap node
 * (and that node carries the most-recent-commit data attached at
 * publish time). Route pages and lexeme pages don't have an
 * indexMap entry — we return undefined and let the caller fall back
 * to the whole-file manifest date.
 */
function sectionBlameForNode(
  snapshot: Snapshot,
  nodeId: string,
): SectionBlame | undefined {
  const indexEntry = snapshot.indexMap[nodeId];
  if (!indexEntry || !indexEntry.lastCommittedAt || !indexEntry.lastCommitSha) {
    return undefined;
  }
  return {
    lastCommittedAt: indexEntry.lastCommittedAt,
    lastCommitSha: indexEntry.lastCommitSha,
  };
}

function stampLastUpdated(
  markdown: string,
  manifest: PublicationManifestSummary,
  sectionBlame?: SectionBlame,
): string {
  const lastUpdatedIso =
    sectionBlame?.lastCommittedAt
    ?? manifest.upstreamCommittedAt
    ?? manifest.publishedAt;
  return appendLastUpdatedFooter(
    injectLastUpdatedFrontmatter(markdown, lastUpdatedIso),
    manifest,
    sectionBlame,
  );
}

function injectLastUpdatedFrontmatter(
  markdown: string,
  lastUpdatedIso: string,
): string {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return markdown;
  const existingFrontmatter = match[1]!;
  // Don't double-stamp if a builder already set its own value.
  if (/^\s*lastUpdated\s*:/m.test(existingFrontmatter)) {
    return markdown;
  }
  const newFrontmatter = `${existingFrontmatter}\nlastUpdated: ${JSON.stringify(lastUpdatedIso)}`;
  return `---\n${newFrontmatter}\n---\n${markdown.slice(match[0].length)}`;
}

function appendLastUpdatedFooter(
  markdown: string,
  manifest: PublicationManifestSummary,
  sectionBlame?: SectionBlame,
): string {
  const repoUrl = manifest.upstreamRepoUrl;

  // Best case — section-specific blame stamps THIS page's last
  // modification: the date is when ailev last edited the lines
  // covering this section, and the link goes to that exact commit.
  if (sectionBlame && repoUrl) {
    const formatted = formatPublishedDate(sectionBlame.lastCommittedAt);
    const sha = sectionBlame.lastCommitSha;
    const commitUrl = `${repoUrl}/commit/${sha}`;
    return `${markdown.replace(/\n+$/, '')}\n\n---\n\n*Last Updated: [${formatted}](${commitUrl}) — this section last modified in upstream FPF commit \`${sha}\` ([${repoUrl.replace(/^https:\/\//, '')}](${repoUrl}))*\n`;
  }

  // Whole-file fallback — pages without a direct line range (routes,
  // catalogs, home) get the latest commit on the spec file.
  if (manifest.upstreamCommittedAt && repoUrl) {
    const formatted = formatPublishedDate(manifest.upstreamCommittedAt);
    const shortSha = manifest.upstreamRef.slice(0, 8);
    const commitUrl = `${repoUrl}/commit/${manifest.upstreamRef}`;
    return `${markdown.replace(/\n+$/, '')}\n\n---\n\n*Last Updated: [${formatted}](${commitUrl}) — upstream FPF commit \`${shortSha}\` ([${repoUrl.replace(/^https:\/\//, '')}](${repoUrl}))*\n`;
  }

  // Final fallback for older snapshots without upstream metadata.
  const formatted = formatPublishedDate(manifest.publishedAt);
  return `${markdown.replace(/\n+$/, '')}\n\n---\n\n*Last Updated: ${formatted} (FPF snapshot publish date)*\n`;
}

export function resolveDocTarget(
  snapshot: Snapshot,
  resolvedNodeId: string,
): DocTarget | undefined {
  const node = snapshot.compiledNodes[resolvedNodeId];
  if (!node) {
    return undefined;
  }

  if (node.kind === 'pattern') {
    return {
      nodeId: node.id,
      title: node.title,
      docRef: patternDocRef(node.id),
    };
  }

  if (node.kind === 'route') {
    return {
      nodeId: node.id,
      title: node.title,
      docRef: routeDocRef(node.id),
    };
  }

  const preferredNodeId = preferredDocNodeIdForLexeme(snapshot, node);
  if (!preferredNodeId) {
    return undefined;
  }

  const preferredNode = snapshot.compiledNodes[preferredNodeId];
  if (!preferredNode) {
    return undefined;
  }

  return {
    nodeId: preferredNode.id,
    title: preferredNode.title,
    docRef:
      preferredNode.kind === 'route'
        ? routeDocRef(preferredNode.id)
        : patternDocRef(preferredNode.id),
  };
}

export function buildDocsNavigation(snapshot: Snapshot): DocsNavigation {
  const patternGroups = new Map<string, DocsNavLink[]>();
  for (const pattern of sortedPatterns(snapshot)) {
    const groupName = pattern.part ?? pattern.cluster ?? 'Patterns';
    const bucket = patternGroups.get(groupName) ?? [];
    bucket.push({
      text: `${pattern.id} ${pattern.title}`,
      link: patternDocRef(pattern.id).staticPath,
    });
    patternGroups.set(groupName, bucket);
  }

  const prefaceGroups = new Map<string, DocsNavLink[]>();
  for (const section of sortedPrefaceSections(snapshot)) {
    const groupName = section.path[0] ?? 'Preface';
    const bucket = prefaceGroups.get(groupName) ?? [];
    bucket.push({
      text: section.title,
      link: prefaceDocRef(section.id, section.lineStart).staticPath,
    });
    prefaceGroups.set(groupName, bucket);
  }

  return {
    patterns: [...patternGroups.entries()].map(([text, items]) => ({ text, items })),
    routes: [
      {
        text: 'Routes',
        items: Object.values(snapshot.routeGraph.nodes)
          .sort((left, right) => left.name.localeCompare(right.name))
          .map((route) => ({
            text: route.name,
            link: routeDocRef(route.id).staticPath,
          })),
      },
    ],
    preface: [...prefaceGroups.entries()].map(([text, items]) => ({ text, items })),
  };
}

/**
 * Build the lookup registry consumed by the search hook for exact-ID
 * and `route:<slug>` injection. Pattern IDs preserve case (FPF uses
 * uppercase part letters and case-sensitive cluster suffixes), route
 * slugs are stored lowercase to match the URL form.
 *
 * Both arrays are sorted by their stable identifier (pattern ID,
 * route slug) — not by display title — so the serialized registry
 * has a deterministic order independent of cosmetic title edits.
 * That keeps the committed `generated-search-id-registry.ts` diff
 * minimal across spec updates.
 */
export function buildSearchIdRegistry(snapshot: Snapshot): SearchIdRegistry {
  const patterns = sortedPatterns(snapshot).map((pattern) => ({
    id: pattern.id,
    title: pattern.title,
    staticPath: patternDocRef(pattern.id).staticPath,
  }));
  const routes = Object.values(snapshot.routeGraph.nodes)
    .map((route) => ({
      slug: route.id.replace(/^route:/, ''),
      title: route.name,
      staticPath: routeDocRef(route.id).staticPath,
    }))
    .sort((left, right) => left.slug.localeCompare(right.slug));
  return { patterns, routes };
}

/**
 * Render the search-ID registry as a TypeScript module string suitable
 * for writing to `src/docs/generated-search-id-registry.ts`. Used by
 * `rspress.config.ts` (config-load write) and `scripts/generate-docs.ts`
 * (`bun run docs:generate`) so both entry points share an identical
 * serializer and the drift test compares apples to apples.
 */
export function renderSearchIdRegistryModule(registry: SearchIdRegistry): string {
  return `// Auto-generated from published/current/FPF-Spec.md — do not edit by hand.
// Regeneration runs at rspress config load and at \`bun run docs:generate\`.
// A drift test in tests/search-id-registry-drift.test.ts fails if the
// committed file is stale.
import type { SearchIdRegistry } from '../core/documents.js';

export const SEARCH_ID_REGISTRY: SearchIdRegistry = ${JSON.stringify(
    registry,
    null,
    2,
  )};
`;
}

function buildPatternPages(snapshot: Snapshot): GeneratedDocPage[] {
  return sortedPatterns(snapshot).map((pattern) => {
    const docRef = patternDocRef(pattern.id);
    return {
      kind: 'pattern',
      nodeId: pattern.id,
      title: pattern.title,
      markdownPath: docRef.markdownPath,
      staticPath: docRef.staticPath,
      markdown: renderPatternPage(snapshot, pattern),
    };
  });
}

function buildRoutePages(snapshot: Snapshot): GeneratedDocPage[] {
  return Object.values(snapshot.routeGraph.nodes).map((route) => {
    const docRef = routeDocRef(route.id);
    return {
      kind: 'route',
      nodeId: route.id,
      title: route.name,
      markdownPath: docRef.markdownPath,
      staticPath: docRef.staticPath,
      markdown: renderRoutePage(snapshot, route),
    };
  });
}

function buildPrefacePages(snapshot: Snapshot): GeneratedDocPage[] {
  return sortedPrefaceSections(snapshot).map((section) => {
    const docRef = prefaceDocRef(section.id, section.lineStart);
    return {
      kind: 'preface',
      title: section.title,
      markdownPath: docRef.markdownPath,
      staticPath: docRef.staticPath,
      markdown: renderPrefacePage(snapshot, section.id),
    };
  });
}

/**
 * Shared renderer for the pattern catalog markdown body. Consumed by
 * `buildPatternIndexPage` (deep-link at `/generated/patterns/`).
 */
function renderPatternCatalogMarkdown(
  snapshot: Snapshot,
  options: {
    title: string;
    description: string;
    heading?: string;
  },
): string {
  const lines = [
    renderFrontMatter({
      title: options.title,
      description: options.description,
      outline: false,
    }),
    `# ${options.heading ?? options.title}`,
    '',
    'New here? Start at the [orientation page](/) — work packets, MCP recipes, and the right entry point per task. Use this catalog when you need to audit the full FPF reference, open an exact ID, or compare neighboring patterns by Part.',
    '',
    '## What this page is',
    '',
    'This is the full generated catalog of FPF pattern IDs from the published FPF snapshot. It is not the first adoption path and it is not a FPF Reference product feature list.',
    '',
    `Generated pages: ${Object.keys(snapshot.patternGraph.nodes).length}`,
  ];

  appendPatternCatalogChapters(lines, snapshot);

  return `${lines.join('\n')}\n`;
}

/**
 * Append a flat by-Part chapter listing for every compiled pattern. Used by
 * the pattern catalog at `/patterns` and by the site index at `/`, so both
 * surfaces present the same information in the same order. No curation, no
 * mix-and-match — readers can scan a single chapter list and click through
 * to any pattern by ID.
 */
function appendPatternCatalogChapters(
  lines: string[],
  snapshot: Snapshot,
): void {
  const groups = new Map<string, PatternRecord[]>();
  for (const pattern of sortedPatterns(snapshot)) {
    const key = pattern.part ?? pattern.cluster ?? 'Ungrouped';
    const bucket = groups.get(key) ?? [];
    bucket.push(pattern);
    groups.set(key, bucket);
  }
  for (const [group, patterns] of groups.entries()) {
    lines.push('', `## ${group}`, '');
    for (const pattern of patterns) {
      const docRef = patternDocRef(pattern.id);
      lines.push(`- [${pattern.id} - ${pattern.title}](${docRef.staticPath})`);
    }
  }
}

/**
 * The Pattern Catalog at `/generated/patterns/index` — the canonical
 * deep-link URL inside the generated reference tree. Also surfaced at the
 * shorter `/patterns` URL so it is discoverable from the top nav without
 * exposing the `generated/` implementation detail.
 */
function buildPatternIndexPage(snapshot: Snapshot): GeneratedDocPage {
  return {
    kind: 'index',
    title: 'Pattern Catalog',
    markdownPath: `${GENERATED_ROOT}/patterns/index.md`,
    staticPath: '/generated/patterns/index',
    markdown: renderPatternCatalogMarkdown(snapshot, {
      title: 'Pattern Catalog',
      description: 'Generated pattern pages from the compiler snapshot.',
    }),
  };
}

/**
 * The Pattern Catalog at the short URL `/patterns`. Same content as
 * `/generated/patterns/index`; both URLs work so existing deep-links keep
 * resolving while the top nav uses the cleaner short form.
 */
function buildPatternsAliasPage(snapshot: Snapshot): GeneratedDocPage {
  return {
    kind: 'index',
    title: 'Pattern Catalog',
    markdownPath: `${DOCS_ROOT}/patterns.md`,
    staticPath: '/patterns',
    markdown: renderPatternCatalogMarkdown(snapshot, {
      title: 'Pattern Catalog',
      description: 'Generated pattern pages from the compiler snapshot.',
      heading: 'Pattern Catalog',
    }),
  };
}

/**
 * The site root (`/`) is the orientation/welcome surface. It now reads as a
 * plain chapter list: a slim header (title, intro line, three CTAs, the
 * provenance line), followed by the same Part-by-Part chapter listing as
 * `/patterns`. Same information, no curation — visitors scan one list and
 * click straight through to any pattern.
 */
function buildRootIndexPage(
  snapshot: Snapshot,
  manifest?: PublicationManifestSummary,
): GeneratedDocPage {
  return {
    kind: 'index',
    title: 'FPF Reference',
    markdownPath: `${DOCS_ROOT}/index.md`,
    staticPath: '/',
    markdown: renderHomeMarkdown(snapshot, manifest),
  };
}

function renderHomeMarkdown(
  snapshot: Snapshot,
  manifest?: PublicationManifestSummary,
): string {
  const patternCount = Object.keys(snapshot.patternGraph.nodes).length;
  const routeCount = Object.keys(snapshot.routeGraph.nodes).length;
  const provenanceDetail = renderHomeProvenanceDetail(manifest);

  const lines: string[] = [
    renderFrontMatter({
      title: 'FPF Reference',
      description:
        'Hosted FPF Reference MCP server + slim wiki projection of the First Principles Framework (FPF) by Anatoly Levenchuk.',
      outline: false,
    }),
    '',
    '# FPF Reference',
    '',
    `Hosted **FPF Reference** MCP server + slim wiki projection of the **First Principles Framework (FPF)**. ${patternCount} pattern pages, ${routeCount} working routes, and the preface — addressable by stable FPF IDs, browsable here and queryable through MCP.`,
    '',
    '## Navigate',
    '',
    renderHomeNavigateLine(snapshot),
    '',
    '## Published from',
    '',
    provenanceDetail,
    '',
    'Production readiness is checked with hosted status, MCP smoke, Q&A benchmark, and Vercel bundle-size gates.',
    '',
    '## FPF Reference MCP — what this server does',
    '',
    'A hosted MCP endpoint that exposes the compiled FPF index to any MCP-aware client (ChatGPT, Claude, VS Code, Zed, Codex). Reads are deterministic graph traversals over named IDs, not embedding similarity — so answers cite exact patterns and routes you can audit.',
    '',
    'Six public tools:',
    '',
    '- `browse_fpf_catalog` — paginate patterns, routes, lexemes, preface',
    '- `search_fpf` — ranked text search across the compiled index',
    '- `query_fpf_spec` — bounded answer with IDs, citations, constraints',
    '- `ask_fpf` — same plus rendered markdown for chat surfaces',
    '- `read_fpf_doc` — exact canonical page for a selector (preview + full modes)',
    '- `get_fpf_index_status` — snapshot freshness, source hash, build time',
    '',
    'Endpoint: `https://mcp.fpf.sh/api/mcp/fpf_reference/mcp` · Legacy blocked during May 2026 mitigation: `https://mcp.fpf.sh/api/mcp/fpf_memory/mcp` · Status: [`mcp.fpf.sh/api/fpf/status`](https://mcp.fpf.sh/api/fpf/status) · [Connect setup →](/connect-mcp)',
    '',
    '## FPF — the framework this server projects',
    '',
    '> FPF helps when raw insight is not enough: meanings, claims, alternatives, evidence, boundaries, and outputs must remain stable across contexts, time, people, tools, or AI agents.',
    '',
    'The **First Principles Framework (FPF)** is a structured framework for thinking and coordinating work. It reads like a technical specification rather than a management book — named patterns, definitions, and review rules — with the goal of helping teams model complex work, make reasoning inspectable, and keep decisions stable across engineering, research, and management.',
    '',
    'FPF is authored by [Anatoly Levenchuk](https://github.com/ailev). The upstream publication source this runtime tracks is [`github.com/ailev/FPF`](https://github.com/ailev/FPF), specifically `FPF-Spec.md` on `main` by default. This site is a wiki projection; the MCP server above is a programmatic projection.',
    '',
    '> **Cite this spec.** If you use FPF, please cite: Levenchuk, Anatoly. *First Principles Framework (FPF).* GitHub repository: <https://github.com/ailev/FPF>',
  ];

  appendPatternCatalogChapters(lines, snapshot);

  return `${lines.join('\n')}\n`;
}

function renderHomeNavigateLine(snapshot: Snapshot): string {
  const links: DocsNavLink[] = [
    { text: 'Start here', link: '/start-here' },
    { text: 'Connect MCP', link: '/connect-mcp' },
    { text: 'Patterns', link: '/generated/patterns/index' },
    { text: 'Routes', link: '/generated/routes/index' },
  ];

  const orderedPatterns = sortedPatterns(snapshot);
  for (const candidate of OPTIONAL_TERM_LINKS) {
    const patternId = resolveOptionalTermPatternId(orderedPatterns, candidate.key);
    const pattern = patternId ? snapshot.patternGraph.nodes[patternId] : undefined;
    if (pattern) {
      links.push({
        text: candidate.label,
        link: patternDocRef(pattern.id).staticPath,
      });
    }
  }

  return links.map((link) => `[${link.text}](${link.link})`).join(' · ');
}

function renderHomeProvenanceDetail(manifest?: PublicationManifestSummary): string {
  if (!manifest) {
    return 'Generated reference pages, route IDs, and source status remain discoverable in the site chrome and reference catalog.';
  }

  const shortRef = manifest.upstreamRef.slice(0, 8);

  // Prefer upstream commit metadata when present: link the date to the
  // exact upstream commit and the short SHA to the same URL so the
  // reader can open the diff this snapshot was projected from.
  if (manifest.upstreamCommittedAt && manifest.upstreamRepoUrl) {
    const upstreamDate = formatPublishedDate(manifest.upstreamCommittedAt);
    const commitUrl = `${manifest.upstreamRepoUrl}/commit/${manifest.upstreamRef}`;
    const repoLabel = manifest.upstreamRepoUrl.replace(/^https:\/\/github\.com\//, '');
    return `Upstream FPF commit [${upstreamDate}](${commitUrl}) (\`${shortRef}\`) in [${repoLabel}](${manifest.upstreamRepoUrl}) · source hash \`${manifest.sourceHash}\`.`;
  }

  // Fallback for older snapshots without upstream commit metadata.
  const publishedAt = formatPublishedDate(manifest.publishedAt);
  return `Published ${publishedAt} · upstream ${shortRef} · source hash \`${manifest.sourceHash}\`.`;
}

function formatPublishedDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  const year = parsed.getUTCFullYear();
  const month = `${parsed.getUTCMonth() + 1}`.padStart(2, '0');
  const day = `${parsed.getUTCDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function buildRouteIndexPage(snapshot: Snapshot): GeneratedDocPage {
  const routes = Object.values(snapshot.routeGraph.nodes);
  const lines = [
    renderFrontMatter({
      title: 'Route Catalog',
      description: 'Generated route pages from the compiler snapshot.',
      outline: false,
    }),
    '# Route Catalog',
    '',
    '## What this page is',
    '',
    'Routes are generated FPF working paths through pattern IDs. They are not website routes, app routes, or navigation implementation details.',
    '',
    '## Methodology',
    '',
    'Use a route when the work shape is known but the exact patterns are not. Follow ordered steps first, use optional and landing points only when the task needs them, then open individual pattern pages for exact wording or audit evidence.',
    '',
    `Generated pages: ${routes.length}`,
  ];

  for (const route of routes) {
    const docRef = routeDocRef(route.id);
    lines.push(
      '',
      `## [${route.name}](${docRef.staticPath})`,
      '',
      `- **Route ID:** \`${route.id}\``,
      `- **Steps:** ${route.orderedIds.length}`,
    );
    if (route.firstHonestBurden) {
      lines.push(`- **First Honest Burden:** ${route.firstHonestBurden}`);
    }
    if (route.description) {
      lines.push('', route.description);
    }
  }

  return {
    kind: 'index',
    title: 'Route Catalog',
    markdownPath: `${GENERATED_ROOT}/routes/index.md`,
    staticPath: '/generated/routes/index',
    markdown: `${lines.join('\n')}\n`,
  };
}

function buildPrefaceIndexPage(snapshot: Snapshot): GeneratedDocPage {
  const sections = sortedPrefaceSections(snapshot);
  const groups = new Map<string, typeof sections>();

  for (const section of sections) {
    const group = section.path[0] ?? 'Preface';
    const bucket = groups.get(group) ?? [];
    bucket.push(section);
    groups.set(group, bucket);
  }

  const lines = [
    renderFrontMatter({
      title: 'Preface Catalog',
      description: 'Generated non-pattern reference pages from the compiler snapshot.',
      outline: false,
    }),
    '# Preface Catalog',
    '',
    '## What this page is',
    '',
    'This catalog lists generated reference pages from FPF preface and supporting sections. These pages explain how to read the specification; they are not FPF Reference product documentation.',
    '',
    '## Methodology',
    '',
    autolinkCanonicalPhrases(
      'Use these pages when you need interpretation guidance before applying a route or pattern. For active work, return to Start Here, a route, or a work packet after the reading burden is clear.',
    ),
  ];

  for (const [group, items] of groups.entries()) {
    lines.push('', `## ${group}`, '');
    for (const item of items) {
      const docRef = prefaceDocRef(item.id, item.lineStart);
      // The published spec authors some preface section titles with bracket
      // labels like "[I]" / "[A/I]" inside the heading. Markdown's link-text
      // grammar can't nest unescaped brackets, so the catalog rendered those
      // rows as literal text instead of clickable links. Escape both delimiters
      // in the link text so the parser still sees a single anchor.
      lines.push(`- [${escapeMarkdownLinkText(item.title)}](${docRef.staticPath})`);
    }
  }

  return {
    kind: 'index',
    title: 'Preface Catalog',
    markdownPath: `${GENERATED_ROOT}/preface/index.md`,
    staticPath: '/generated/preface/index',
    markdown: `${lines.join('\n')}\n`,
  };
}

function renderPatternPage(snapshot: Snapshot, pattern: PatternRecord): string {
  const rootAnchor = snapshot.anchorMap[pattern.id];
  const rootIndexNode = snapshot.indexMap[pattern.id];
  const aliases = unique(pattern.aliases).filter(
    (alias) => normalizeForLookup(alias) !== normalizeForLookup(pattern.title),
  );
  const keywords = unique(pattern.keywords);
  const relations = dedupeRelations(
    snapshot.compiledNodes[pattern.id]?.neighborEdges ?? pattern.relations,
  );
  const introText = stripRepeatedLeadMetadata(rootAnchor?.text ?? '');
  const leadExcerpt = firstChildExcerpt(snapshot, pattern.id);
  const catalogReminder = normalizedCatalogReminder(
    pattern.description ?? rootIndexNode?.description,
    pattern,
    introText,
    leadExcerpt,
  );
  // Title prefixes the pattern ID so rspress's search ranks exact-ID
  // queries onto the canonical page. Without the ID in the title field,
  // searching `A.1` matched bodies that mention `A.1` more often than
  // the actual A.1 page (FU-P2-008). The H1 stays as the title alone.
  //
  // ONE byline directly under the H1 carries chip + status/type/
  // normativity + cluster + part, all on one mono line. Replaces the
  // previous double-take treatment (eyebrow chip ABOVE the H1 +
  // separate status byline BELOW) per PR #72 design review — chip and
  // status form a single identifying signature, not two stacked items.
  const bylineMeta = [
    pattern.cluster,
    pattern.status,
    pattern.type,
    pattern.normativity,
    pattern.part,
  ].filter((part): part is string => Boolean(part));
  const bylineMetaHtml = bylineMeta.length > 0
    ? bylineMeta.map((part) => escapeHtml(part)).join(' · ')
    : '';
  const lines = [
    renderFrontMatter({
      title: `${pattern.id} ${pattern.title}`,
      description: pattern.part ?? pattern.cluster ?? 'Generated pattern page from the compiler snapshot.',
    }),
    renderBreadcrumb(buildPatternBreadcrumb(pattern)),
    '',
    `# ${pattern.title}`,
    `<p class="fpf-pattern-byline">${patternIdChip(pattern.id)}${bylineMetaHtml ? ` <span class="fpf-pattern-byline__meta">· ${bylineMetaHtml}</span>` : ''}</p>`,
  ];

  appendPatternContext(lines, pattern);

  if (introText) {
    lines.push(
      '',
      autolinkCanonicalPhrases(autolinkPatternIds(snapshot, introText)),
    );
  }

  if (leadExcerpt) {
    lines.push(
      '',
      autolinkCanonicalPhrases(autolinkPatternIds(snapshot, leadExcerpt)),
    );
  }

  if (catalogReminder) {
    lines.push('', catalogReminder);
  }

  if (aliases.length > 0) {
    lines.push('', '## Aliases', '');
    for (const alias of aliases) {
      lines.push(`- ${alias}`);
    }
  }

  if (keywords.length > 0) {
    lines.push('', '## Keywords', '');
    for (const keyword of keywords) {
      lines.push(`- ${keyword}`);
    }
  }

  if (relations.length > 0) {
    lines.push('', '## Relations', '', '<div class="fpf-relations">');
    for (const relation of relations) {
      lines.push(formatRelation(snapshot, relation));
    }
    lines.push('</div>');
  }

  const sectionLines = renderSectionTree(snapshot, pattern.id);
  if (sectionLines.length > 0) {
    lines.push('', '## Content');
    lines.push('', ...sectionLines);
  }

  return `${lines.join('\n')}\n`;
}

function appendPatternContext(lines: string[], pattern: PatternRecord): void {
  const context = patternPageContext(pattern);
  // Heading is "About this pattern" on pattern pages (PR #72 design
  // review) — the "What this page is" wording felt boilerplate when
  // it appeared on every page with identical phrasing. Pattern pages
  // are visibly about a pattern, so the heading should say so.
  lines.push(
    '',
    '## About this pattern',
    '',
    context.what,
    '',
    '## How to use this pattern',
    '',
    context.methodology,
  );
}

function patternPageContext(pattern: PatternRecord): { what: string; methodology: string } {
  if (pattern.id === 'H.1') {
    return {
      what:
        'This is the FPF glossary generated from the published FPF source. It defines framework terms; it is not a glossary of FPF Reference UI, repository, or deployment terms.',
      methodology:
        'Use it to normalize terms before route or pattern work. When a term changes a decision, follow its linked or cited pattern ID instead of treating the glossary entry as a whole-task answer.',
    };
  }

  if (pattern.id === 'I.3') {
    return {
      what:
        'This is the FPF specification change log generated from the published FPF source. It is not the FPF Reference product changelog, product release notes, or GitHub history.',
      methodology:
        'Use it to understand semantic changes inside FPF itself. Use repository PRs, commits, or releases for product changes, and cite I.3 only when the specification evolution matters to the work.',
    };
  }

  return {
    what:
      'This is a generated FPF pattern page projected from the published FPF source. It is canonical FPF content for this ID; it is not a FPF Reference product feature page.',
    methodology:
      'Read the ID, status, type, and normativity first. Use the content for exact wording, the relations for adjacent concepts, and citations to keep active work grounded without pasting the whole specification.',
  };
}

function normalizedCatalogReminder(
  description: string | undefined,
  pattern: PatternRecord,
  introText: string,
  leadExcerpt: string | undefined,
): string {
  const candidate = description?.trim();
  if (!candidate || introText || leadExcerpt) {
    return '';
  }

  const normalizedCandidate = normalizeForLookup(candidate);
  const blockedValues = [
    pattern.title,
    pattern.part,
    pattern.cluster,
    introText,
    leadExcerpt,
  ]
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
    .map((value) => normalizeForLookup(value));

  if (blockedValues.includes(normalizedCandidate)) {
    return '';
  }

  return candidate;
}

function renderRoutePage(snapshot: Snapshot, route: RouteRecord): string {
  const lines = [
    renderFrontMatter({
      title: route.name,
      description: route.description,
    }),
    renderBreadcrumb([
      { text: 'Routes', link: '/generated/routes/index' },
      { text: route.name },
    ]),
    '',
    `# ${route.name}`,
    `> Route ${inlineCode(route.id)}`,
    '',
    '## What this page is',
    '',
    'This is an FPF route: a curated working path through pattern IDs. It is not a website route or application navigation route.',
    '',
    '## Methodology',
    '',
    'Use the ordered steps as the first path through the framework. Treat optional steps, landing points, route surfaces, and reroutes as controls for scope, ownership, and common wrong turns. Open exact pattern pages only when the work depends on their wording.',
  ];

  if (route.firstHonestBurden) {
    lines.push(`- **First Honest Burden:** ${route.firstHonestBurden}`);
  }

  if (route.description) {
    lines.push(
      '',
      autolinkCanonicalPhrases(autolinkPatternIds(snapshot, route.description)),
    );
  }

  appendNodeIdList(lines, snapshot, 'Ordered steps', route.orderedIds, true);
  appendNodeIdList(lines, snapshot, 'Optional steps', route.optionalIds);
  appendNodeIdList(lines, snapshot, 'Landing points', route.landingIds);
  appendNodeIdList(lines, snapshot, 'Route surfaces', route.routeSurfaces);
  appendNodeIdList(lines, snapshot, 'Typical next owners', route.nextOwners);
  appendNodeIdList(lines, snapshot, 'Common wrong reroutes', route.reroutes);

  if (route.citations.length > 0) {
    lines.push('', '## Citations', '');
    for (const citation of route.citations) {
      lines.push(`- ${inlineCode(citation)}`);
    }
  }

  return `${lines.join('\n')}\n`;
}

function renderPrefacePage(snapshot: Snapshot, sectionId: string): string {
  const section = snapshot.indexMap[sectionId];
  const anchor = snapshot.anchorMap[sectionId];
  if (!section || !anchor) {
    return '';
  }

  const lines = [
    renderFrontMatter({
      title: section.title,
      description: `Generated reference page for ${sectionId}.`,
    }),
    renderBreadcrumb([
      { text: 'Preface', link: '/generated/preface/index' },
      ...(section.path[0] && section.path[0] !== section.title ? [{ text: section.path[0] }] : []),
      { text: section.title },
    ]),
    '',
    `# ${section.title}`,
    `> Preface node ${inlineCode(sectionId)}`,
    '',
    '## What this page is',
    '',
    'This is generated FPF reference text from the specification preface or supporting sections. It helps interpret FPF; it is not FPF Reference product documentation.',
    '',
    '## Methodology',
    '',
    'Use it to understand how the specification wants to be read, then return to a route, pattern, or work packet for active work. Cite generated IDs only when the wording changes the task decision.',
  ];

  if (anchor.text.trim() || section.childIds.length > 0) {
    lines.push('', '## Content');
    if (anchor.text.trim()) {
      const linked = autolinkPatternIdsInTableCells(
        snapshot,
        autolinkCanonicalPhrases(
          autolinkPatternIds(snapshot, anchor.text.trim()),
        ),
      );
      lines.push('', linked);
    }
    const childLines = renderSectionTree(snapshot, sectionId);
    if (childLines.length > 0) {
      lines.push('', ...childLines);
    }
  }

  return `${lines.join('\n')}\n`;
}

function renderSectionTree(snapshot: Snapshot, rootSectionId: string): string[] {
  const root = snapshot.indexMap[rootSectionId];
  if (!root) {
    return [];
  }

  const lines: string[] = [];
  for (const childId of root.childIds) {
    renderSection(snapshot, root.level, childId, lines);
  }
  return lines;
}

function renderSection(
  snapshot: Snapshot,
  baseLevel: number,
  sectionId: string,
  lines: string[],
): void {
  const section = snapshot.indexMap[sectionId];
  const anchor = snapshot.anchorMap[sectionId];
  if (!section || !anchor) {
    return;
  }

  const headingLevel = Math.max(2, section.level - baseLevel + 1);
  lines.push(`${'#'.repeat(headingLevel)} ${displaySectionTitle(section.title)}`, '');
  if (anchor.text.trim()) {
    const linked = autolinkPatternIdsInTableCells(
      snapshot,
      autolinkCanonicalPhrases(
        autolinkPatternIds(snapshot, anchor.text.trim()),
      ),
    );
    lines.push(linked, '');
  }

  for (const childId of section.childIds) {
    renderSection(snapshot, baseLevel, childId, lines);
  }

  while (lines.at(-1) === '') {
    lines.pop();
  }
}

function appendNodeIdList(
  lines: string[],
  snapshot: Snapshot,
  heading: string,
  nodeIds: string[],
  ordered = false,
): void {
  if (nodeIds.length === 0) {
    return;
  }

  lines.push('', `## ${heading}`, '');
  for (const nodeId of nodeIds) {
    const prefix = ordered ? '1.' : '-';
    const chip = isPatternIdShape(nodeId) ? `${patternIdChip(nodeId)} ` : '';
    lines.push(`${prefix} ${chip}${formatNodeReference(snapshot, nodeId)}`);
  }
}

// Keep this anchored regex aligned with `ID_PATTERN` in `src/core/text.ts` so
// the generator only renders pattern-ID chips for strings the compiler itself
// treats as valid IDs.
function isPatternIdShape(nodeId: string): boolean {
  return /^[A-Z]\.\d+(?:\.[A-Za-z0-9]+)*(?::[A-Za-z0-9.]+)?$/u.test(nodeId);
}

// Same shape as `ID_PATTERN`/`isPatternIdShape`, but global so we can rewrite
// every match inside body markdown.
const PATTERN_ID_TOKEN_PATTERN =
  /\b[A-Z]\.\d+(?:\.[A-Za-z0-9]+)*(?::[A-Za-z0-9.]+)?\b/g;

/**
 * Replace each bare pattern-ID token (`A.6.9`, `B.1.2`, etc.) in a markdown
 * body with a link to its canonical generated page, while leaving IDs that
 * are already inside code, an existing markdown link, or an HTML attribute
 * untouched.
 *
 * Pattern-only by design: route IDs like `route:project-alignment` and
 * lexicon IDs are handled elsewhere (relations panels, structured lists),
 * and lookalike strings that aren't compiled patterns are passed through
 * unchanged so we never link to a 404.
 */
function autolinkPatternIds(snapshot: Snapshot, body: string): string {
  if (!body || !body.includes('.')) {
    return body;
  }

  const guards: Array<[number, number]> = [];
  const guardSources: RegExp[] = [
    /```[\s\S]*?```/g, // fenced code blocks
    // Inline code spans. CommonMark allows code-span content to span
    // newlines (newlines render as spaces inside the span); the source
    // spec uses this pattern frequently, e.g.
    //   `F.17 / F.18 /\n  E.10`
    // The `[^`]+?` body catches these multi-line spans so pattern IDs
    // inside intended-code text aren't autolinked. Single-line spans
    // are still matched as a strict subset.
    /`[^`]+?`/g,
    /\[[^\]]+\]\([^)]+\)/g, // existing markdown links [text](url)
    /<[^>]+>/g, // HTML tags (don't link inside attributes)
  ];
  for (const re of guardSources) {
    for (const match of body.matchAll(re)) {
      const start = match.index ?? 0;
      guards.push([start, start + match[0].length]);
    }
  }
  const isGuarded = (offset: number): boolean =>
    guards.some(([start, end]) => offset >= start && offset < end);

  return body.replace(PATTERN_ID_TOKEN_PATTERN, (match: string, offset: number) => {
    if (typeof offset !== 'number' || isGuarded(offset)) {
      return match;
    }
    const node = snapshot.compiledNodes[match];
    if (node && node.kind === 'pattern') {
      return `[${match}](${patternDocRef(match).staticPath})`;
    }
    // Section-level IDs (e.g. `A.19:0`, `I.2.1`) aren't first-class
    // pattern nodes, but they live in the indexMap under a parent
    // pattern. Render them as deep links into that parent's page so
    // body prose like "see A.19:0 for the engineer-manager reading"
    // is navigable instead of a dead string.
    const sectionUrl = resolveSectionAnchorUrl(snapshot, match);
    if (sectionUrl) {
      return `[${match}](${sectionUrl.url})`;
    }
    return match;
  });
}

/**
 * Same auto-link semantics as `autolinkPatternIds`, but inside markdown
 * tables: code-spanned IDs like `\`A.6.9\`` ARE rewritten to
 * `[\`A.6.9\`](url)`. The J.4 entry-point table renders one inline-code
 * pattern ID per cell — auto-linking those is exactly the navigability
 * the original auto-linker skipped because of the prose-code-span guard.
 *
 * Triggered only on lines that begin with `|` (after optional leading
 * whitespace) and pre-skipped on markdown-table-separator rows so the
 * `|---|---|` lines stay untouched.
 */
function autolinkPatternIdsInTableCells(
  snapshot: Snapshot,
  body: string,
): string {
  const lines = body.split('\n');
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]!;
    if (!line.trimStart().startsWith('|')) continue;
    if (/^\s*\|?(?:\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?\s*$/.test(line)) continue;
    lines[index] = line.replace(
      /`([A-Z]\.\d+(?:\.[A-Za-z0-9]+)*(?::[A-Za-z0-9.]+)?)`/g,
      (match, id: string) => {
        const node = snapshot.compiledNodes[id];
        if (node && node.kind === 'pattern') {
          return `[\`${id}\`](${patternDocRef(id).staticPath})`;
        }
        const sectionUrl = resolveSectionAnchorUrl(snapshot, id);
        if (sectionUrl) {
          return `[\`${id}\`](${sectionUrl.url})`;
        }
        return match;
      },
    );
  }
  return lines.join('\n');
}

/**
 * Bare canonical phrases in prose that point to handwritten FPF Reference
 * docs pages (those under `docs/`, not the spec-derived `/generated/`
 * tree). Multi-word and case-sensitive on purpose: matching exactly the
 * canonical capitalization keeps "you can start here…" prose untouched
 * and only links references to the page by its proper name.
 *
 * Single-word matches like "Routes" are deliberately excluded — too
 * many false-positive surfaces in pattern descriptions and headings.
 */
const CANONICAL_PHRASE_LINKS: ReadonlyArray<{ phrase: string; url: string }> = [
  { phrase: 'Start Here', url: '/start-here' },
  { phrase: 'Connect MCP', url: '/connect-mcp' },
  { phrase: 'Pattern Catalog', url: '/patterns' },
  { phrase: 'MCP Recipes', url: '/mcp-recipes' },
  { phrase: 'Automation Playbook', url: '/automation-playbook' },
  { phrase: 'Work Packets', url: '/work-packets' },
];

const CANONICAL_PHRASE_TOKEN_PATTERN = new RegExp(
  `\\b(?:${CANONICAL_PHRASE_LINKS.map(({ phrase }) =>
    phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
  ).join('|')})\\b`,
  'g',
);

/**
 * Link the FIRST occurrence of each allow-listed canonical phrase in a
 * markdown body to its docs page, while honoring the same guards as
 * `autolinkPatternIds` (no rewriting inside code, existing links, or
 * HTML attributes).
 *
 * First-occurrence-only — repeated mentions of the same phrase in one
 * body skip linking so the second-and-later instances don't add link
 * noise to prose that already pointed the reader at the page.
 */
function autolinkCanonicalPhrases(body: string): string {
  if (!body) {
    return body;
  }

  const guards: Array<[number, number]> = [];
  const guardSources: RegExp[] = [
    /```[\s\S]*?```/g,
    /`[^`]+?`/g, // inline code spans, multi-line allowed
    /\[[^\]]+\]\([^)]+\)/g,
    /<[^>]+>/g,
  ];
  for (const re of guardSources) {
    for (const match of body.matchAll(re)) {
      const start = match.index ?? 0;
      guards.push([start, start + match[0].length]);
    }
  }
  const isGuarded = (offset: number): boolean =>
    guards.some(([start, end]) => offset >= start && offset < end);

  const linked = new Set<string>();
  return body.replace(
    CANONICAL_PHRASE_TOKEN_PATTERN,
    (match: string, offset: number) => {
      if (
        typeof offset !== 'number' ||
        isGuarded(offset) ||
        linked.has(match)
      ) {
        return match;
      }
      const entry = CANONICAL_PHRASE_LINKS.find(
        ({ phrase }) => phrase === match,
      );
      if (!entry) {
        return match;
      }
      linked.add(match);
      return `[${match}](${entry.url})`;
    },
  );
}

function formatRelation(snapshot: Snapshot, relation: RelationEdge): string {
  const target = formatNodeReferenceHtml(snapshot, relation.to);
  const kindLabel = humanizeRelation(relation.relation);
  return `<div class="fpf-relation">${patternIdChip(relation.from)}<span class="fpf-relation-kind">${escapeHtml(kindLabel)}</span>${target}</div>`;
}

function humanizeRelation(kind: RelationEdge['relation']): string {
  return kind.replace(/_/g, ' ');
}

function formatNodeReferenceHtml(snapshot: Snapshot, nodeId: string): string {
  const node = snapshot.compiledNodes[nodeId];
  const docTarget = node ? resolveDocTarget(snapshot, nodeId) : undefined;
  if (docTarget) {
    return `<a class="fpf-relation-target" href="${escapeHtml(docTarget.docRef.staticPath)}">${escapeHtml(docTarget.title)}</a>`;
  }
  return `<code>${escapeHtml(nodeId)}</code>`;
}

// Emit `fpf-pid--<letter>` unconditionally for any leading A–Z. The Part-specific
// palette lives in `src/docs/theme.css` (`.fpf-pid--a` … `.fpf-pid--g`); letters
// without a matching modifier class fall back to the neutral `.fpf-pid` default,
// so the CSS stays the single source of truth for which Parts have colours.
function patternIdChip(id: string): string {
  const first = id.charAt(0);
  const modifier = /^[A-Z]$/u.test(first) ? ` fpf-pid--${first.toLowerCase()}` : '';
  return `<span class="fpf-pid${modifier}">${escapeHtml(id)}</span>`;
}

interface BreadcrumbSegment {
  text: string;
  link?: string;
}

function renderBreadcrumb(segments: BreadcrumbSegment[]): string {
  if (segments.length === 0) {
    return '';
  }
  const parts: string[] = [];
  segments.forEach((segment, index) => {
    if (index > 0) {
      parts.push(`<span class="fpf-breadcrumb-separator" aria-hidden="true">›</span>`);
    }
    if (segment.link && index < segments.length - 1) {
      parts.push(`<a href="${escapeHtml(segment.link)}">${escapeHtml(segment.text)}</a>`);
    } else {
      parts.push(`<span>${escapeHtml(segment.text)}</span>`);
    }
  });
  return `<nav class="fpf-breadcrumb" aria-label="Breadcrumb">${parts.join('')}</nav>`;
}

function buildPatternBreadcrumb(pattern: PatternRecord): BreadcrumbSegment[] {
  const segments: BreadcrumbSegment[] = [
    { text: 'Patterns', link: '/generated/patterns/index' },
  ];

  // Split `pattern.part` into a "Part X" prefix and the cluster name that
  // follows it, but only on the first dash/en-dash/em-dash that has spaces
  // on *both* sides. Requiring surrounding whitespace keeps intra-word
  // hyphens intact — e.g. "Part B — Trans-disciplinary Reasoning" must
  // stay as ("Part B", "Trans-disciplinary Reasoning") instead of being
  // chopped into ("Part B", "Trans", "disciplinary Reasoning").
  const partLabelMatch = pattern.part?.match(/^(.+?)\s+[-–—]\s+(.+)$/u);
  if (partLabelMatch) {
    const head = partLabelMatch[1]!.trim();
    const tail = partLabelMatch[2]!.trim();
    if (head) {
      segments.push({ text: head });
    }
    if (tail) {
      segments.push({ text: tail });
    }
  } else if (pattern.part) {
    segments.push({ text: pattern.part.trim() });
  } else if (pattern.cluster) {
    segments.push({ text: pattern.cluster });
  }
  segments.push({ text: pattern.id });
  return segments;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function dedupeRelations(relations: RelationEdge[]): RelationEdge[] {
  const seen = new Set<string>();
  const uniqueRelations: RelationEdge[] = [];

  for (const relation of relations) {
    const key = `${relation.from}::${relation.relation}::${relation.to}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    uniqueRelations.push(relation);
  }

  return uniqueRelations;
}

function formatNodeReference(snapshot: Snapshot, nodeId: string): string {
  const node = snapshot.compiledNodes[nodeId];
  const docTarget = node ? resolveDocTarget(snapshot, nodeId) : undefined;
  if (docTarget) {
    return `[${docTarget.title}](${docTarget.docRef.staticPath})`;
  }

  const sectionUrl = resolveSectionAnchorUrl(snapshot, nodeId);
  if (sectionUrl) {
    return `[${sectionUrl.title}](${sectionUrl.url})`;
  }

  return inlineCode(nodeId);
}

/**
 * Resolve a section-shaped ID (e.g. `A.19:0`, `I.2.1`, `E.18:5.9`) to a
 * URL that points at the parent pattern's generated page plus the section
 * heading anchor. Returns `undefined` if the ID isn't an indexed section
 * or its parent isn't a generated pattern page.
 *
 * Used by `formatNodeReference` (relations panel) and the body autolinker
 * — sub-anchor IDs render as live links instead of dead `<code>` chips.
 */
function resolveSectionAnchorUrl(
  snapshot: Snapshot,
  nodeId: string,
): { title: string; url: string } | undefined {
  const indexEntry = snapshot.indexMap[nodeId];
  if (!indexEntry || !indexEntry.parentId) return undefined;
  const parent = snapshot.compiledNodes[indexEntry.parentId];
  if (!parent || parent.kind !== 'pattern') return undefined;
  const ref = patternDocRef(parent.id);
  const slug = headingSlug(indexEntry.title);
  return {
    title: indexEntry.title || nodeId,
    url: `${ref.staticPath}#${slug}`,
  };
}

/**
 * Convert a heading text to the slug rspress emits for `<h*>` ids. The
 * generator's `displaySectionTitle` strips the leading FPF-ID prefix
 * (`A.19:0 - `) before rendering the H2, so the slug must be computed
 * AFTER the same strip — otherwise the link target won't exist on the
 * page. Slug rules then mirror GitHub-style slugification (lowercase,
 * keep alphanumerics + dashes, collapse whitespace to single dashes).
 */
export function headingSlug(text: string): string {
  // Mirror rspress / rehype-slug / github-slugger behavior:
  //   1. Lowercase.
  //   2. Strip everything that isn't a Unicode letter, digit, hyphen,
  //      underscore, or whitespace. Underscores are kept (titles like
  //      "Γ_method" preserve `γ_` in the heading id) and \p{L} matches
  //      letters from any script (Latin, Cyrillic, Greek, etc.) so
  //      patterns with Γ-prefixed titles produce working anchor links.
  //   3. Replace each whitespace char (NOT collapsed) with a hyphen.
  //      rspress preserves consecutive spaces as consecutive hyphens —
  //      e.g. " — " (em-dash flanked by spaces) becomes "--" because
  //      the em-dash is stripped and the two surrounding spaces map to
  //      two hyphens individually.
  //
  // The previous regex `[^a-z0-9À-ɏЀ-ӿ\s-]` covered Latin Extended
  // and Cyrillic but had a gap for Greek (U+0370–U+03FF), producing
  // broken `#anchor` links for any pattern whose title started with Γ
  // (PR #72 review feedback).
  return displaySectionTitle(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s\-_]/gu, '')
    .trim()
    .replace(/\s/g, '-');
}

function patternDocRef(nodeId: string): DocRef {
  return {
    markdownPath: `${GENERATED_ROOT}/patterns/${nodeId}.md`,
    staticPath: `/generated/patterns/${nodeId}`,
  };
}

function routeDocRef(routeId: string): DocRef {
  const slug = routeId.replace(/^route:/, '');
  return {
    markdownPath: `${GENERATED_ROOT}/routes/route_${slug}.md`,
    staticPath: `/generated/routes/route_${slug}`,
  };
}

function prefaceDocRef(sectionId: string, lineStart: number): DocRef {
  const slug = sectionId
    .replace(/^heading:/, '')
    .replace(/:\d+$/, '');
  return {
    markdownPath: `${GENERATED_ROOT}/preface/heading_${slug}_${lineStart}.md`,
    staticPath: `/generated/preface/heading_${slug}_${lineStart}`,
  };
}

function sortedPatterns(snapshot: Snapshot): PatternRecord[] {
  return Object.values(snapshot.patternGraph.nodes).sort((left, right) => {
    const leftPart = partOrder(left.part);
    const rightPart = partOrder(right.part);
    if (leftPart !== rightPart) {
      return leftPart - rightPart;
    }
    return compareFpfIds(left.id, right.id);
  });
}

function sortedPrefaceSections(snapshot: Snapshot): Array<{
  id: string;
  title: string;
  path: string[];
  lineStart: number;
}> {
  return Object.values(snapshot.indexMap)
    .filter((node) => node.id.startsWith('heading:'))
    .map((node) => ({
      id: node.id,
      title: node.title,
      path: node.path,
      lineStart: node.lineStart,
    }))
    .sort((left, right) => left.lineStart - right.lineStart);
}

function preferredDocNodeIdForLexeme(
  snapshot: Snapshot,
  node: CompiledNode,
): string | undefined {
  if (node.kind !== 'lexeme') {
    return undefined;
  }

  const entry = node.details as LexiconEntry;
  const candidates = unique([
    ...entry.sourceAnchorIds
      .map((anchorId) => snapshot.anchorMap[anchorId]?.nodeId)
      .filter((candidate): candidate is string => Boolean(candidate)),
    ...entry.linkedNodeIds,
  ]).filter((candidateId) => {
    const candidate = snapshot.compiledNodes[candidateId];
    return candidate?.kind === 'pattern' || candidate?.kind === 'route';
  });

  return candidates
    .map((candidateId) => ({
      candidateId,
      score: scoreLexemeCandidate(snapshot, entry, candidateId),
    }))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      return compareFpfIds(left.candidateId, right.candidateId);
    })[0]?.candidateId;
}

function scoreLexemeCandidate(
  snapshot: Snapshot,
  entry: LexiconEntry,
  candidateId: string,
): number {
  const candidate = snapshot.compiledNodes[candidateId];
  if (!candidate) {
    return Number.NEGATIVE_INFINITY;
  }

  const canonical = normalizeForLookup(entry.canonical);
  let score = candidate.kind === 'pattern' ? 12 : 4;
  if (
    normalizeForLookup(candidate.title).includes(canonical) ||
    candidate.aliases.some((alias) => normalizeForLookup(alias).includes(canonical))
  ) {
    score += 24;
  }
  if (entry.linkedNodeIds[0] === candidateId) {
    score += 6;
  }
  if (
    entry.sourceAnchorIds.some(
      (anchorId) => snapshot.anchorMap[anchorId]?.nodeId === candidateId,
    )
  ) {
    score += 8;
  }
  return score;
}

function compareFpfIds(left: string, right: string): number {
  const leftParts = splitSortableId(left);
  const rightParts = splitSortableId(right);
  const max = Math.max(leftParts.length, rightParts.length);

  for (let index = 0; index < max; index += 1) {
    const leftPart = leftParts[index];
    const rightPart = rightParts[index];
    if (leftPart === undefined) {
      return -1;
    }
    if (rightPart === undefined) {
      return 1;
    }
    if (leftPart === rightPart) {
      continue;
    }
    if (typeof leftPart === 'number' && typeof rightPart === 'number') {
      return leftPart - rightPart;
    }
    if (typeof leftPart === 'number') {
      return -1;
    }
    if (typeof rightPart === 'number') {
      return 1;
    }
    return leftPart.localeCompare(rightPart);
  }

  return 0;
}

function splitSortableId(value: string): Array<number | string> {
  return value
    .replace(/^route:/, 'route.')
    .split('.')
    .map((part) => (/^\d+$/.test(part) ? Number(part) : part));
}

function partOrder(part?: string): number {
  const letter = part?.match(/^Part\s+([A-Z])/u)?.[1];
  return letter ? letter.charCodeAt(0) : Number.MAX_SAFE_INTEGER;
}

function renderFrontMatter(frontmatter: Record<string, string | boolean>): string {
  const lines = ['---'];
  for (const [key, value] of Object.entries(frontmatter)) {
    lines.push(
      typeof value === 'boolean' ? `${key}: ${value ? 'true' : 'false'}` : `${key}: ${JSON.stringify(value)}`,
    );
  }
  lines.push('---', '');
  return lines.join('\n');
}

function inlineCode(value: string): string {
  return `\`${value}\``;
}

// Replace `[` and `]` inside markdown link text with `(` and `)` so
// titles that contain bracket labels (e.g. "C.3.A:Annex A [A/I]")
// render as a single anchor.
//
// Backslash-escapes (`\[`, `\]`) — what CommonMark prescribes — and
// numeric HTML entities (`&#91;` / `&#93;`) both fail to round-trip
// through Rspress's MDX pipeline: the parser breaks the link text at
// the inner `[` (backslash form) or HTML-escapes the leading `&`
// (entity form), each producing visibly broken output. Parens carry
// the same "this is a label" cue, are unambiguous to the markdown
// parser inside link text, and pass through to HTML unchanged.
function escapeMarkdownLinkText(text: string): string {
  return text.replace(/\[/g, '(').replace(/\]/g, ')');
}

function stripRepeatedLeadMetadata(text: string): string {
  return text
    .replace(
      /^>\s+\*\*Type:\*\*.*\n>\s+\*\*Status:\*\*.*\n>\s+\*\*Normativity:\*\*.*(?:\n\s*)*/u,
      '',
    )
    .trim();
}

function firstChildExcerpt(snapshot: Snapshot, nodeId: string): string | undefined {
  const root = snapshot.indexMap[nodeId];
  const firstChildId = root?.childIds[0];
  if (!firstChildId) {
    return undefined;
  }

  const excerpt = snapshot.anchorMap[firstChildId]?.text
    .trim()
    .split(/\n\s*\n/u)[0]
    ?.trim();

  return excerpt || undefined;
}

function displaySectionTitle(title: string): string {
  return title.replace(
    /^([A-Z]\.\d+(?:\.[A-Za-z0-9]+)*(?::[A-Za-z0-9.]+)?)\s+-\s+/u,
    '',
  );
}

export function docsRelativePath(markdownPath: string, docsRoot = DOCS_ROOT): string {
  return markdownPath.replace(new RegExp(`^${escapeRegExp(`${docsRoot}/`)}`), '');
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
