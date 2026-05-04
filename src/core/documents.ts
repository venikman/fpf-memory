import type {
  CompiledNode,
  DocRef,
  LexiconEntry,
  PatternRecord,
  RelationEdge,
  RouteRecord,
  Snapshot,
} from './types.js';
import { HOSTED_MCP_ENDPOINT } from './constants.js';
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

  return {
    pages,
    pagesByMarkdownPath: Object.fromEntries(
      pages.map((page) => [page.markdownPath, page] as const),
    ),
  };
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
  const groups = new Map<string, PatternRecord[]>();
  for (const pattern of sortedPatterns(snapshot)) {
    const key = pattern.part ?? pattern.cluster ?? 'Ungrouped';
    const bucket = groups.get(key) ?? [];
    bucket.push(pattern);
    groups.set(key, bucket);
  }

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
    'This is the full generated catalog of FPF pattern IDs from the published FPF snapshot. It is not the first adoption path and it is not a fpf-memory product feature list.',
    '',
    `Generated pages: ${Object.keys(snapshot.patternGraph.nodes).length}`,
  ];

  for (const [group, patterns] of groups.entries()) {
    lines.push('', `## ${group}`, '');
    for (const pattern of patterns) {
      const docRef = patternDocRef(pattern.id);
      lines.push(`- [${pattern.id} - ${pattern.title}](${docRef.staticPath})`);
    }
  }

  return `${lines.join('\n')}\n`;
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
 * The site root (`/`) is the orientation/welcome surface. First-time
 * visitors land here and choose a path; the full Pattern Catalog lives one
 * click away at `/patterns`. Rendered with Rspress's `pageType: home`
 * layout (hero + 4-up feature grid).
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
  // The manifest parameter is intentionally unused since rspress's
  // home layout drops body markdown — provenance now renders via
  // the inline shim reading <meta> tags. Kept on the signature so
  // call sites in `buildDocsProjection` don't need to change shape.
  _manifest?: PublicationManifestSummary,
): string {
  const patternCount = Object.keys(snapshot.patternGraph.nodes).length;

  const lines: string[] = [renderHomeFrontMatter(patternCount)];

  // The "Published from" provenance line is injected client-side by the
  // a11y shim in rspress.config.ts (PR #72 design review). We can't put
  // it in this markdown body because rspress's `pageType: home` layout
  // drops body content entirely — only the frontmatter (hero + features)
  // renders. The shim reads `<meta name="fpf-source-hash">` etc. and
  // injects a `.fpf-home-byline` element directly under the hero.
  // The body markdown below is kept for non-home tooling that consumes
  // the projection (search index, MCP, etc.) and harmless on the home
  // page itself since the layout ignores it.

  lines.push(
    '',
    '## Methodology',
    '',
    'Name the work first, choose the smallest matching route or packet, then open generated pattern pages only when exact wording matters. Keep the full FPF intact as the canonical source while retrieving only the slice needed for the task.',
    '',
    '## MCP endpoint',
    '',
    'Point an MCP-aware client at the hosted endpoint to retrieve compact grounded slices on demand. See [Connect MCP](/connect-mcp) for client-by-client setup, and [MCP recipes](/mcp-recipes) for ready-made retrieval patterns.',
    '',
    '```text',
    HOSTED_MCP_ENDPOINT,
    '```',
    '',
    'Tool catalog and local-surface setup: [README on GitHub](https://github.com/venikman/fpf-memory#run-and-test-mcp).',
  );

  return `${lines.join('\n')}\n`;
}

function renderHomeFrontMatter(patternCount: number): string {
  return [
    '---',
    'pageType: home',
    'title: FPF Reference',
    'description: Compiler-backed reference for the latest published FPF, projected as a slim wiki.',
    'hero:',
    // The "name" slot renders as the small mono kicker above the H1.
    // Extended per PR #72 design review to carry the static framing
    // ("projection of the latest published spec") so the kicker reads
    // as both brand + role.
    '  name: "FPF Reference · Projection of the latest published spec"',
    '  text: Small, grounded entry points to the framework.',
    // Tagline tightened per design review — closes with "the doorways"
    // to forward-link to the index list of stable anchors below.
    '  tagline: Use the full First Principles Framework instead of pasting the whole specification into every conversation. Not the spec, not a release page — the doorways.',
    '  actions:',
    // Primary CTA carries an inline arrow + verb ("Open the adoption
    // guide") so it reads as the action it is. Secondary actions stay
    // as plain text links — the arrow on those was redundant once the
    // primary already had one.
    '    - theme: brand',
    '      text: "→ Open the adoption guide"',
    '      link: /start-here',
    '    - theme: alt',
    '      text: Work packets',
    '      link: /work-packets',
    '    - theme: alt',
    '      text: MCP recipes',
    '      link: /mcp-recipes',
    'features:',
    '  - title: Patterns',
    `    details: ${patternCount} patterns across parts A–K. Open an exact ID, audit the full reference, or compare neighboring patterns by Part.`,
    // Patterns and Routes are categories — using a real ID like `A.1`
    // or `F.1` as the chip (R5-P2-007) misleads users into thinking
    // those IDs *are* "all patterns" or "all routes". Use a category
    // badge instead. H.1 and I.3 chips stay because those IDs *are*
    // the canonical glossary and change-log anchors.
    '    icon: A–K',
    '    link: /patterns',
    '  - title: Routes',
    '    details: Generated working paths through pattern IDs. Use a route when the work shape is known but the exact patterns are not.',
    '    icon: "route:"',
    '    link: /generated/routes/index',
    '  - title: Glossary',
    '    details: H.1 is the published glossary anchor — a stable selector for term lookups. Treat it as a starting point for vocabulary, not a complete A–Z list.',
    '    icon: H.1',
    '    link: /generated/patterns/H.1',
    '  - title: Change log',
    '    details: I.3 is the published change-log anchor — a stable selector for spec version history. Treat it as a starting point, not a release-note feed.',
    '    icon: I.3',
    '    link: /generated/patterns/I.3',
    '---',
    '',
  ].join('\n');
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
    'This catalog lists generated reference pages from FPF preface and supporting sections. These pages explain how to read the specification; they are not fpf-memory product documentation.',
    '',
    '## Methodology',
    '',
    'Use these pages when you need interpretation guidance before applying a route or pattern. For active work, return to Start Here, a route, or a work packet after the reading burden is clear.',
  ];

  for (const [group, items] of groups.entries()) {
    lines.push('', `## ${group}`, '');
    for (const item of items) {
      const docRef = prefaceDocRef(item.id, item.lineStart);
      lines.push(`- [${item.title}](${docRef.staticPath})`);
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
    lines.push('', introText);
  }

  if (leadExcerpt) {
    lines.push('', leadExcerpt);
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
        'This is the FPF glossary generated from the published FPF source. It defines framework terms; it is not a glossary of fpf-memory UI, repository, or deployment terms.',
      methodology:
        'Use it to normalize terms before route or pattern work. When a term changes a decision, follow its linked or cited pattern ID instead of treating the glossary entry as a whole-task answer.',
    };
  }

  if (pattern.id === 'I.3') {
    return {
      what:
        'This is the FPF specification change log generated from the published FPF source. It is not the fpf-memory product changelog, product release notes, or GitHub history.',
      methodology:
        'Use it to understand semantic changes inside FPF itself. Use repository PRs, commits, or releases for product changes, and cite I.3 only when the specification evolution matters to the work.',
    };
  }

  return {
    what:
      'This is a generated FPF pattern page projected from the published FPF source. It is canonical FPF content for this ID; it is not a fpf-memory product feature page.',
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
    lines.push('', route.description);
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
    'This is generated FPF reference text from the specification preface or supporting sections. It helps interpret FPF; it is not fpf-memory product documentation.',
    '',
    '## Methodology',
    '',
    'Use it to understand how the specification wants to be read, then return to a route, pattern, or work packet for active work. Cite generated IDs only when the wording changes the task decision.',
  ];

  if (anchor.text.trim() || section.childIds.length > 0) {
    lines.push('', '## Content');
    if (anchor.text.trim()) {
      lines.push('', anchor.text.trim());
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
    lines.push(anchor.text.trim(), '');
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

  // No standalone compiled node — but the spec may have it as an anchor
  // under a parent pattern (e.g. `A.19:0` lives inside `A.19`). Look it up
  // in the index map and, if its parent resolves to a generated pattern
  // page, emit a link to the parent + heading anchor instead of a dead
  // inline code chip. This unbreaks ordered route steps that reference
  // sub-anchors (FU-P2-004 / DS-P1-006).
  const indexEntry = snapshot.indexMap[nodeId];
  if (indexEntry && indexEntry.parentId) {
    const parent = snapshot.compiledNodes[indexEntry.parentId];
    if (parent && parent.kind === 'pattern') {
      const ref = patternDocRef(parent.id);
      const slug = headingSlug(indexEntry.title);
      const title = indexEntry.title || nodeId;
      return `[${title}](${ref.staticPath}#${slug})`;
    }
  }

  return inlineCode(nodeId);
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
