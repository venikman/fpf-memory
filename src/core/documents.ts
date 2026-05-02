import type {
  CompiledNode,
  DocRef,
  LexiconEntry,
  PatternRecord,
  RelationEdge,
  RouteRecord,
  Snapshot,
} from './types.js';
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
  options: { title: string; description: string; heading?: string },
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
 * The site home. Intentionally short: one-sentence framing, a manifest
 * block so readers can tell which FPF snapshot this build is projected
 * from, a pointer to the hosted MCP endpoint, and links to adoption,
 * demonstration, and reference surfaces. The pattern catalog itself
 * still lives at `/generated/patterns/index`.
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

const HOSTED_MCP_ENDPOINT =
  'https://fpf-memory.server.mastra.cloud/api/mcp/fpf_memory/mcp';

function renderHomeMarkdown(
  snapshot: Snapshot,
  manifest?: PublicationManifestSummary,
): string {
  const patternCount = Object.keys(snapshot.patternGraph.nodes).length;
  const routeCount = Object.keys(snapshot.routeGraph.nodes).length;

  const lines: string[] = [
    renderFrontMatter({
      title: 'FPF Reference',
      description:
        'Compiler-backed reference for the latest published FPF, projected as a slim wiki.',
      outline: false,
    }),
    '# FPF Reference',
    '',
    'Use the full First Principles Framework through small, grounded entry points instead of pasting the whole specification into every conversation.',
    '',
    '## Start here',
    '',
    '- [Adoption guide](/start-here) — choose the first FPF path for a person, team, or agent.',
    '- [Work packets](/work-packets) — use FPF in project review, PR review, specification work, role/promise/capability analysis, and agent workflows.',
    '- [MCP recipes](/mcp-recipes) — retrieve compact grounded slices from the hosted or local MCP server.',
    '- [Demo videos](/use-case-videos) — record CSS-rendered walkthroughs that show how people and agents use FPF without a full-spec paste.',
    '',
    '## Navigate',
    '',
    `- [Patterns](/generated/patterns/index) — ${patternCount} patterns across parts A–K`,
    `- [Routes](/generated/routes/index) — ${routeCount} routes`,
    '- [Glossary](/generated/patterns/H.1)',
    '- [Change log](/generated/patterns/I.3)',
    '',
    '## MCP endpoint',
    '',
    '```',
    HOSTED_MCP_ENDPOINT,
    '```',
    '',
    'Tool catalog and local-surface setup: [README on GitHub](https://github.com/venikman/fpf-memory#run-and-test-mcp).',
  ];

  if (manifest) {
    lines.push(
      '',
      '## Published from',
      '',
      `- **Channel:** \`${manifest.channel}\``,
      `- **Source hash:** \`${manifest.sourceHash}\``,
      `- **Upstream ref:** \`${manifest.upstreamRef}\``,
      `- **Published at:** ${manifest.publishedAt}`,
    );
  }

  return `${lines.join('\n')}\n`;
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
  const lines = [
    renderFrontMatter({
      title: pattern.title,
      description: pattern.part ?? pattern.cluster ?? 'Generated pattern page from the compiler snapshot.',
    }),
    renderBreadcrumb(buildPatternBreadcrumb(pattern)),
    '',
    `# ${pattern.title}`,
    `> Pattern ${patternIdChip(pattern.id)} · ${pattern.status}${pattern.type ? ` · ${pattern.type}` : ''}${pattern.normativity ? ` · ${pattern.normativity}` : ''}`,
  ];

  if (pattern.part) {
    lines.push(`> ${pattern.part}`);
  } else if (pattern.cluster) {
    lines.push(`> ${pattern.cluster}`);
  }

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
  return inlineCode(nodeId);
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
