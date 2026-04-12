import {
  PART_C_CLUSTER_LABELS,
  PART_C_LABEL,
  PREFACE_MARKER,
  PREFACE_ROUTE_CITATION,
  ROUTE_INDEX_CITATION,
} from './constants.js';
import {
  cleanMarkdown,
  extractBacktickedTerms,
  extractIds,
  extractQuotedPhrases,
  isMarkdownSeparatorRow,
  normalizeForLookup,
  normalizeLabel,
  scoreOverlap,
  sentenceCandidates,
  slugify,
  splitMarkdownRow,
  stripMarkdownToText,
  tokenize,
  unique,
} from './text.js';
import type {
  AnchorRef,
  BuildValidation,
  CompiledNode,
  IndexMapNode,
  LexiconEntry,
  PatternRecord,
  RelationEdge,
  RelationKind,
  RouteRecord,
  SectionRole,
  Snapshot,
} from './types.js';

interface HeadingSectionInternal extends AnchorRef {
  level: number;
  fullId?: string;
  patternId?: string;
  parentId?: string;
  childIds: string[];
}

interface PatternMeta {
  id: string;
  title: string;
  status: string;
  description?: string;
  keywords: string[];
  queries: string[];
  dependenciesRaw: string;
  part?: string;
  cluster?: string;
  relations: RelationEdge[];
}

interface CatalogDescription {
  title: string;
  description: string;
}

const RELATION_LABELS: Record<string, RelationKind> = {
  'builds on': 'builds_on',
  'prerequisite for': 'prerequisite_for',
  'used by': 'used_by',
  'coordinates with': 'coordinates_with',
  constrains: 'constrains',
  refines: 'refines',
  enables: 'enables',
  informs: 'informs',
  constitutes: 'constitutes',
  'constrained by': 'constrained_by',
  'interacts with': 'interacts_with',
};

const PATTERN_ROW_ID = /^\**[A-Z]\.\d+(?:\.[A-Za-z0-9]+)*\**$/;
const HEADING_ID =
  /^([A-Z]\.\d+(?:\.[A-Za-z0-9]+)*(?::[A-Za-z0-9.]+)?)\s+-\s+(.+)$/;

export interface CompilerOutput {
  snapshot: Snapshot;
  projections: {
    indexMap: {
      roots: string[];
      nodes: Record<string, IndexMapNode>;
    };
    patternGraph: Snapshot['patternGraph'];
    routeGraph: Snapshot['routeGraph'];
    lexicon: Record<string, LexiconEntry>;
    anchorMap: Record<string, AnchorRef>;
  };
}

export function compileFpfSource(params: {
  sourcePath: string;
  sourceHash: string;
  builtAt: string;
  sourceText: string;
}): CompilerOutput {
  const lines = params.sourceText.split(/\r?\n/);
  const prefaceIndex = lines.findIndex((line) => line.trim() === PREFACE_MARKER);
  const catalogLines = prefaceIndex >= 0 ? lines.slice(0, prefaceIndex) : lines;

  const metadata = parseCatalogMetadata(catalogLines);
  const catalogDescriptions = parseCatalogDescriptions(catalogLines);
  const sections = parseHeadingSections(lines);
  const anchorMap = buildAnchorMap(lines, sections);
  const patternGraph = buildPatternGraph(lines, sections, metadata);
  const routeGraph = buildRouteGraph(lines, anchorMap);
  const indexMap = buildIndexMap(
    sections,
    patternGraph.nodes,
    routeGraph.nodes,
    catalogDescriptions,
  );
  const outlineRelations = buildOutlineRelations(patternGraph.nodes);
  const explicitReferenceRelations = buildExplicitReferenceRelations(
    sections,
    patternGraph.nodes,
    routeGraph.nodes,
  );
  const relationGraph = uniqueRelations([
    ...patternGraph.relations,
    ...routeGraph.relations,
    ...outlineRelations,
    ...explicitReferenceRelations,
  ]);
  const lexicon = buildLexicon(patternGraph.nodes, routeGraph.nodes, anchorMap);
  const lexiconRelations = buildLexiconRelations(lexicon);
  const allRelations = uniqueRelations([...relationGraph, ...lexiconRelations]);
  const compiledNodes = buildCompiledNodes(
    patternGraph.nodes,
    routeGraph.nodes,
    lexicon,
    allRelations,
  );
  const indexes = buildIndexes(compiledNodes, patternGraph.nodes, routeGraph.nodes, lexicon);
  const validation = buildValidation(
    compiledNodes,
    patternGraph.nodes,
    routeGraph.nodes,
    lexicon,
    indexMap,
    allRelations,
  );

  const snapshot: Snapshot = {
    sourcePath: params.sourcePath,
    sourceHash: params.sourceHash,
    builtAt: params.builtAt,
    compilerMode: 'local_vectorless',
    indexRoots: indexMap.roots,
    indexMap: indexMap.nodes,
    anchorMap,
    patternGraph: {
      nodes: patternGraph.nodes,
      relations: patternGraph.relations,
    },
    routeGraph: {
      nodes: routeGraph.nodes,
      relations: routeGraph.relations,
    },
    lexicon,
    compiledNodes,
    relationGraph: allRelations,
    indexes,
    validation,
  };

  return {
    snapshot,
    projections: {
      indexMap,
      patternGraph: snapshot.patternGraph,
      routeGraph: snapshot.routeGraph,
      lexicon,
      anchorMap,
    },
  };
}

function parseHeadingSections(lines: string[]): HeadingSectionInternal[] {
  const headings: Array<{
    lineIndex: number;
    level: number;
    title: string;
    fullId?: string;
    patternId?: string;
  }> = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const match = line.match(/^(#{1,6})\s+(.*)$/);
    if (!match) {
      continue;
    }
    const level = match[1].length;
    const title = cleanMarkdown(match[2]);
    const idMatch = title.match(HEADING_ID);
    const fullId = idMatch?.[1];
    const patternId = fullId ? fullId.split(':')[0] : undefined;
    headings.push({
      lineIndex: index,
      level,
      title,
      fullId,
      patternId,
    });
  }

  const sections: HeadingSectionInternal[] = [];
  const stack: HeadingSectionInternal[] = [];
  for (let index = 0; index < headings.length; index += 1) {
    const current = headings[index]!;
    const next = headings[index + 1];
    const lineStart = current.lineIndex + 1;
    const lineEnd = next ? next.lineIndex : lines.length;
    const rawBody = lines.slice(current.lineIndex + 1, lineEnd).join('\n').trimEnd();
    const id = current.fullId
      ? current.fullId
      : `heading:${slugify(current.title)}:${lineStart}`;

    while (stack.length > 0 && stack.at(-1)!.level >= current.level) {
      stack.pop();
    }

    const path = [...stack.map((item) => item.heading), current.title];
    const parentId = stack.at(-1)?.id;
    const section: HeadingSectionInternal = {
      id,
      nodeId: current.patternId,
      heading: current.title,
      lineStart,
      lineEnd,
      path,
      text: rawBody,
      plainText: stripMarkdownToText(rawBody),
      role: inferSectionRole(current.title, undefined),
      level: current.level,
      fullId: current.fullId,
      patternId: current.patternId,
      parentId,
      childIds: [],
    };
    if (parentId) {
      const parent = sections.find((candidate) => candidate.id === parentId);
      parent?.childIds.push(id);
    }
    sections.push(section);
    stack.push(section);
  }

  return sections;
}

function buildAnchorMap(
  lines: string[],
  sections: HeadingSectionInternal[],
): Record<string, AnchorRef> {
  const anchorMap: Record<string, AnchorRef> = {};
  for (const section of sections) {
    anchorMap[section.id] = {
      id: section.id,
      nodeId: section.patternId,
      heading: section.heading,
      lineStart: section.lineStart,
      lineEnd: section.lineEnd,
      path: section.path,
      text: section.text,
      plainText: section.plainText,
      role: inferSectionRole(section.heading, section.fullId),
    };
  }

  const prefaceRouteAnchor = buildSyntheticAnchor(
    lines,
    '**Where to start**',
    'Everything in the Core',
    PREFACE_ROUTE_CITATION,
    ['Preface', 'Where to start'],
    'Where to start',
    'route_surface',
  );
  if (prefaceRouteAnchor) {
    anchorMap[prefaceRouteAnchor.id] = prefaceRouteAnchor;
  }

  return anchorMap;
}

function buildSyntheticAnchor(
  lines: string[],
  startMarker: string,
  endMarker: string,
  id: string,
  path: string[],
  heading: string,
  role: SectionRole,
): AnchorRef | undefined {
  const startIndex = lines.findIndex((line) => line.includes(startMarker));
  if (startIndex < 0) {
    return undefined;
  }
  let endIndex = lines.findIndex((line, index) => index > startIndex && line.includes(endMarker));
  if (endIndex < 0) {
    endIndex = lines.length;
  }
  const text = lines.slice(startIndex, endIndex).join('\n').trimEnd();
  return {
    id,
    heading,
    lineStart: startIndex + 1,
    lineEnd: endIndex,
    path,
    text,
    plainText: stripMarkdownToText(text),
    role,
  };
}

function buildIndexMap(
  sections: HeadingSectionInternal[],
  patternNodes: Record<string, PatternRecord>,
  routeNodes: Record<string, RouteRecord>,
  catalogDescriptions: Record<string, CatalogDescription>,
): {
  roots: string[];
  nodes: Record<string, IndexMapNode>;
} {
  const nodes: Record<string, IndexMapNode> = {};
  const roots: string[] = [];
  const routeBearingPatternIds = new Set(
    Object.values(routeNodes).flatMap((route) => [
      ...route.orderedIds,
      ...route.optionalIds,
      ...route.landingIds,
      ...route.routeSurfaces,
      ...route.nextOwners,
      ...route.reroutes,
    ]),
  );
  for (const section of sections) {
    const pattern = section.patternId ? patternNodes[section.patternId] : undefined;
    const description = describeIndexNode(section, catalogDescriptions, pattern);
    nodes[section.id] = {
      id: section.id,
      title: section.heading,
      description,
      level: section.level,
      lineStart: section.lineStart,
      lineEnd: section.lineEnd,
      path: section.path,
      parentId: section.parentId,
      childIds: [...section.childIds],
      anchorId: section.id,
      metadata: {
        patternId: section.patternId,
        part: pattern?.part,
        cluster: pattern?.cluster,
        role: section.role,
        routeBearing:
          section.role === 'route_surface' ||
          section.id === PREFACE_ROUTE_CITATION ||
          section.id === ROUTE_INDEX_CITATION ||
          Boolean(section.patternId && routeBearingPatternIds.has(section.patternId)),
      },
    };
    if (!section.parentId) {
      roots.push(section.id);
    }
  }
  return { roots, nodes };
}

function parseCatalogDescriptions(lines: string[]): Record<string, CatalogDescription> {
  const descriptions: Record<string, CatalogDescription> = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|')) {
      continue;
    }

    const cells = splitMarkdownRow(trimmed);
    if (cells.length < 3 || isMarkdownSeparatorRow(cells)) {
      continue;
    }

    const firstCell = normalizeLabel((cells[0] ?? '').replace(/\*/g, ''));
    const secondCell = normalizeLabel(cells[1] ?? '');
    const thirdCell = normalizeLabel(cells[2] ?? '');
    if (!firstCell || !secondCell || !thirdCell) {
      continue;
    }

    if (PATTERN_ROW_ID.test(firstCell) || normalizeForLookup(firstCell) === 'id & title') {
      continue;
    }

    descriptions[normalizeForLookup(firstCell)] = {
      title: firstCell,
      description: thirdCell,
    };
    descriptions[normalizeForLookup(secondCell)] = {
      title: secondCell,
      description: thirdCell,
    };
  }
  return descriptions;
}

function parseCatalogMetadata(lines: string[]): Record<string, PatternMeta> {
  const metadata: Record<string, PatternMeta> = {};
  let currentPart: string | undefined;
  let currentCluster: string | undefined;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|')) {
      const partMatch = trimmed.match(/^\*\*Part\s+([A-Z])\s*[–—-]\s*(.+)\*\*$/);
      if (partMatch) {
        currentPart = normalizeLabel(`Part ${partMatch[1]} - ${partMatch[2]}`);
        currentCluster = undefined;
      }
      continue;
    }

    const cells = splitMarkdownRow(trimmed);
    if (cells.length < 3 || isMarkdownSeparatorRow(cells)) {
      continue;
    }

    const firstCell = normalizeLabel((cells[0] ?? '').replace(/\*/g, ''));
    if (firstCell.includes('Cluster C.')) {
      currentCluster = normalizeClusterLabel(firstCell);
      continue;
    }

    if (!PATTERN_ROW_ID.test(firstCell)) {
      continue;
    }

    const title = cleanMarkdown(cells[1] ?? '');
    const status = normalizeLabel(cells[2] ?? '');
    const keywordsCell = cleanMarkdown(cells[3] ?? '');
    const dependenciesRaw = cleanMarkdown(cells[4] ?? '');
    const description =
      !dependenciesRaw &&
      keywordsCell &&
      !/\*keywords:\*|\*queries:\*/i.test(keywordsCell)
        ? keywordsCell
        : undefined;

    metadata[firstCell] = {
      id: firstCell,
      title,
      status,
      description,
      keywords: parseKeywords(keywordsCell),
      queries: parseQueries(keywordsCell),
      dependenciesRaw,
      part: currentPart,
      cluster: currentCluster,
      relations: parseLabeledRelations(firstCell, dependenciesRaw, `${firstCell}:catalog`),
    };
  }

  return metadata;
}

function buildPatternGraph(
  lines: string[],
  sections: HeadingSectionInternal[],
  metadata: Record<string, PatternMeta>,
): Snapshot['patternGraph'] {
  const topLevelPatterns = sections.filter(
    (section) => section.level === 2 && section.fullId && !section.fullId.includes(':'),
  );
  const nodes: Record<string, PatternRecord> = {};
  const relations: RelationEdge[] = [];

  for (const patternSection of topLevelPatterns) {
    const id = patternSection.fullId!;
    const meta = metadata[id];
    const subSections = sections.filter(
      (section) => section.patternId === id && section.id !== patternSection.id,
    );
    const headerMeta = parseHeadingMetadata(lines, patternSection.lineStart + 1, patternSection.lineEnd);
    const nodeRelations = uniqueRelations([
      ...(meta?.relations ?? []),
      ...parseRelationSection(subSections.find((section) =>
        section.heading.toLowerCase().includes('relations'),
      )),
    ]);
    const title = meta?.title ?? cleanMarkdown(patternSection.heading.replace(/^.+?\s+-\s+/, ''));
    const keywords = meta?.keywords ?? [];
    const queries = meta?.queries ?? [];
    const aliases = deriveAliases(title, patternSection.heading);
    nodes[id] = {
      id,
      title,
      status: meta?.status ?? headerMeta.status ?? 'Unknown',
      description: meta?.description,
      part: meta?.part,
      cluster: meta?.cluster,
      type: headerMeta.type,
      normativity: headerMeta.normativity,
      keywords,
      queries,
      aliases,
      dependenciesRaw: meta?.dependenciesRaw ?? '',
      sectionIds: subSections.map((section) => section.id),
      relations: nodeRelations,
      searchableText: unique([
        id,
        title,
        meta?.description,
        ...keywords,
        ...queries,
        ...aliases,
        ...subSections.map((section) => `${section.heading} ${section.plainText}`),
      ]).join(' '),
    };
    relations.push(...nodeRelations);
  }

  for (const [id, meta] of Object.entries(metadata)) {
    if (nodes[id]) {
      continue;
    }
    nodes[id] = {
      id,
      title: meta.title,
      status: meta.status,
      description: meta.description,
      part: meta.part,
      cluster: meta.cluster,
      keywords: meta.keywords,
      queries: meta.queries,
      aliases: deriveAliases(meta.title, meta.title),
      dependenciesRaw: meta.dependenciesRaw,
      sectionIds: [],
      relations: meta.relations,
      searchableText: unique([
        id,
        meta.title,
        meta.description,
        ...meta.keywords,
        ...meta.queries,
      ]).join(' '),
    };
    relations.push(...meta.relations);
  }

  return {
    nodes,
    relations: uniqueRelations(relations),
  };
}

function buildRouteGraph(
  lines: string[],
  anchorMap: Record<string, AnchorRef>,
): Snapshot['routeGraph'] {
  const routes = new Map<string, RouteRecord>();

  for (const route of parsePrefaceRoutes(lines, anchorMap)) {
    routes.set(route.id, route);
  }

  for (const route of parseJ4Routes(lines, anchorMap)) {
    const existing = routes.get(route.id);
    if (!existing) {
      routes.set(route.id, route);
      continue;
    }
    routes.set(route.id, {
      ...existing,
      description: unique([existing.description, route.description]).join(' '),
      firstHonestBurden: route.firstHonestBurden ?? existing.firstHonestBurden,
      routeSurfaces: unique([...existing.routeSurfaces, ...route.routeSurfaces]),
      nextOwners: unique([...existing.nextOwners, ...route.nextOwners]),
      reroutes: unique([...existing.reroutes, ...route.reroutes]),
      citations: unique([...existing.citations, ...route.citations]),
      anchorIds: unique([...existing.anchorIds, ...route.anchorIds]),
      searchableText: unique([existing.searchableText, route.searchableText]).join(' '),
    });
  }

  return {
    nodes: Object.fromEntries(routes.entries()),
    relations: buildRouteRelations(Object.fromEntries(routes.entries())),
  };
}

function parsePrefaceRoutes(
  lines: string[],
  anchorMap: Record<string, AnchorRef>,
): RouteRecord[] {
  const routes: RouteRecord[] = [];
  let inPrefaceRouteList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '**Where to start**') {
      inPrefaceRouteList = true;
      continue;
    }
    if (!inPrefaceRouteList) {
      continue;
    }
    if (trimmed.startsWith('Everything in the Core')) {
      break;
    }
    if (!trimmed.startsWith('- ')) {
      continue;
    }
    if (!trimmed.includes('start with')) {
      continue;
    }

    const routeName = derivePrefaceRouteName(trimmed);
    if (!routeName) {
      continue;
    }

    const id = routeKey(routeName);
    const orderedIds = extractOrderedIds(trimmed);
    const landingIds = extractLandingIds(trimmed);
    const allIds = extractIds(trimmed);
    routes.push({
      id,
      name: routeName,
      description: cleanMarkdown(trimmed.replace(/^- /, '')),
      firstHonestBurden: undefined,
      orderedIds,
      optionalIds: allIds.filter(
        (candidate) => !orderedIds.includes(candidate) && !landingIds.includes(candidate),
      ),
      landingIds,
      routeSurfaces: [],
      nextOwners: [],
      reroutes: [],
      citations: [PREFACE_ROUTE_CITATION],
      anchorIds: anchorMap[PREFACE_ROUTE_CITATION] ? [PREFACE_ROUTE_CITATION] : [],
      searchableText: cleanMarkdown(trimmed),
    });
  }

  return routes;
}

function parseJ4Routes(
  lines: string[],
  anchorMap: Record<string, AnchorRef>,
): RouteRecord[] {
  const headingIndex = lines.findIndex((line) =>
    line.trim().startsWith('## J.4 - First Practical Entry Route Index'),
  );
  if (headingIndex < 0) {
    return [];
  }

  const tableLines: string[] = [];
  for (let index = headingIndex + 1; index < lines.length; index += 1) {
    const line = lines[index]!.trim();
    if (!line) {
      if (tableLines.length > 0) {
        break;
      }
      continue;
    }
    if (line.startsWith('|')) {
      tableLines.push(line);
      continue;
    }
    if (tableLines.length > 0) {
      break;
    }
  }

  const routes: RouteRecord[] = [];
  for (const line of tableLines) {
    const cells = splitMarkdownRow(line);
    if (cells.length < 6 || isMarkdownSeparatorRow(cells)) {
      continue;
    }
    if (normalizeForLookup(cells[0] ?? '') === 'route') {
      continue;
    }
    const name = normalizeLabel(cells[0] ?? '');
    const id = routeKey(name);
    routes.push({
      id,
      name,
      description: normalizeLabel(cells[3] ?? ''),
      firstHonestBurden: normalizeLabel(cells[1] ?? ''),
      orderedIds: [],
      optionalIds: [],
      landingIds: [],
      routeSurfaces: extractIds(cells[2] ?? ''),
      nextOwners: extractIds(cells[4] ?? ''),
      reroutes: extractIds(cells[5] ?? ''),
      citations: [ROUTE_INDEX_CITATION],
      anchorIds: anchorMap[ROUTE_INDEX_CITATION] ? [ROUTE_INDEX_CITATION] : [],
      searchableText: cleanMarkdown(cells.join(' ')),
    });
  }
  return routes;
}

function buildRouteRelations(routeNodes: Record<string, RouteRecord>): RelationEdge[] {
  const relations: RelationEdge[] = [];
  for (const route of Object.values(routeNodes)) {
    for (const orderedId of route.orderedIds) {
      relations.push({
        from: route.id,
        relation: 'route_step',
        to: orderedId,
        source: route.citations[0] ?? route.id,
      });
      relations.push({
        from: route.id,
        relation: 'route_hint',
        to: orderedId,
        source: route.citations[0] ?? route.id,
      });
    }
    for (let index = 0; index < route.orderedIds.length - 1; index += 1) {
      relations.push({
        from: route.orderedIds[index]!,
        relation: 'route_step',
        to: route.orderedIds[index + 1]!,
        source: route.citations[0] ?? route.id,
      });
    }
    for (const surfaceId of route.routeSurfaces) {
      relations.push({
        from: route.id,
        relation: 'current_route_surface',
        to: surfaceId,
        source: route.citations[0] ?? route.id,
      });
      relations.push({
        from: route.id,
        relation: 'route_hint',
        to: surfaceId,
        source: route.citations[0] ?? route.id,
      });
    }
    for (const landingId of route.landingIds) {
      relations.push({
        from: route.id,
        relation: 'landing_on',
        to: landingId,
        source: route.citations[0] ?? route.id,
      });
      relations.push({
        from: route.id,
        relation: 'route_hint',
        to: landingId,
        source: route.citations[0] ?? route.id,
      });
    }
    for (const nextOwnerId of route.nextOwners) {
      relations.push({
        from: route.id,
        relation: 'typical_next_owner',
        to: nextOwnerId,
        source: route.citations[0] ?? route.id,
      });
    }
    for (const optionalId of route.optionalIds) {
      relations.push({
        from: route.id,
        relation: 'route_hint',
        to: optionalId,
        source: route.citations[0] ?? route.id,
      });
    }
    for (const rerouteId of route.reroutes) {
      relations.push({
        from: route.id,
        relation: 'common_wrong_reroute',
        to: rerouteId,
        source: route.citations[0] ?? route.id,
      });
    }
  }
  return uniqueRelations(relations);
}

function buildLexicon(
  patternNodes: Record<string, PatternRecord>,
  routeNodes: Record<string, RouteRecord>,
  anchorMap: Record<string, AnchorRef>,
): Record<string, LexiconEntry> {
  const lexiconByKey = new Map<string, LexiconEntry>();

  const addLexeme = (
    canonical: string,
    linkedNodeId: string,
    sourceAnchorIds: string[],
    aliases: string[] = [],
  ): void => {
    const normalizedCanonical = normalizeForLookup(canonical);
    if (!shouldIndexLexeme(canonical)) {
      return;
    }
    const key = `lex:${slugify(normalizedCanonical)}`;
    const existing = lexiconByKey.get(key);
    const symbolForms = unique(
      [canonical, ...aliases].filter((item) => /[A-Z]\.|`|[A-Z][a-z]+/.test(item) || item.includes('.')),
    );
    const next: LexiconEntry = {
      id: key,
      canonical,
      aliases: unique([...(existing?.aliases ?? []), canonical, ...aliases]),
      symbolForms: unique([...(existing?.symbolForms ?? []), ...symbolForms]),
      normalizedKeys: unique([
        ...(existing?.normalizedKeys ?? []),
        normalizedCanonical,
        ...aliases.map(normalizeForLookup),
      ]),
      linkedNodeIds: unique([...(existing?.linkedNodeIds ?? []), linkedNodeId]),
      sourceAnchorIds: unique([...(existing?.sourceAnchorIds ?? []), ...sourceAnchorIds]),
      searchableText: unique([
        ...(existing ? [existing.searchableText] : []),
        canonical,
        ...aliases,
      ]).join(' '),
    };
    lexiconByKey.set(key, next);
  };

  for (const pattern of Object.values(patternNodes)) {
    const anchorIds = pattern.sectionIds.length > 0 ? pattern.sectionIds : [pattern.id];
    const titlePrefix = primarySymbolFromTitle(pattern.title);
    if (titlePrefix) {
      addLexeme(titlePrefix, pattern.id, anchorIds, pattern.aliases);
    }
    for (const alias of pattern.aliases) {
      addLexeme(alias, pattern.id, anchorIds, pattern.aliases);
    }
    for (const anchorId of anchorIds) {
      const anchor = anchorMap[anchorId];
      if (!anchor) {
        continue;
      }
      for (const term of extractBacktickedTerms(`${anchor.heading}\n${anchor.text}`)) {
        addLexeme(term, pattern.id, [anchorId], pattern.aliases);
      }
    }
  }

  for (const route of Object.values(routeNodes)) {
    addLexeme(route.name, route.id, route.anchorIds, []);
  }

  return Object.fromEntries(lexiconByKey.entries());
}

function buildOutlineRelations(
  patternNodes: Record<string, PatternRecord>,
): RelationEdge[] {
  const relations: RelationEdge[] = [];
  const patternIds = Object.keys(patternNodes);
  const orderedPatternIds = [...patternIds];
  const childrenByParent = new Map<string, string[]>();

  for (const patternId of orderedPatternIds) {
    const parentId = directPatternParent(patternId, patternNodes);
    if (!parentId) {
      continue;
    }
    relations.push({
      from: patternId,
      relation: 'outline_parent',
      to: parentId,
      source: patternId,
    });
    relations.push({
      from: parentId,
      relation: 'outline_child',
      to: patternId,
      source: parentId,
    });
    const existing = childrenByParent.get(parentId) ?? [];
    existing.push(patternId);
    childrenByParent.set(parentId, existing);
  }

  for (const siblings of childrenByParent.values()) {
    for (let index = 0; index < siblings.length; index += 1) {
      const current = siblings[index]!;
      const previous = siblings[index - 1];
      const next = siblings[index + 1];
      if (previous) {
        relations.push({
          from: current,
          relation: 'outline_prev_sibling',
          to: previous,
          source: current,
        });
      }
      if (next) {
        relations.push({
          from: current,
          relation: 'outline_next_sibling',
          to: next,
          source: current,
        });
      }
    }
  }

  return uniqueRelations(relations);
}

function buildExplicitReferenceRelations(
  sections: HeadingSectionInternal[],
  patternNodes: Record<string, PatternRecord>,
  routeNodes: Record<string, RouteRecord>,
): RelationEdge[] {
  const relations: RelationEdge[] = [];
  const routeAnchorsById = new Map<string, string[]>();
  for (const route of Object.values(routeNodes)) {
    for (const anchorId of route.anchorIds) {
      const existing = routeAnchorsById.get(anchorId) ?? [];
      existing.push(route.id);
      routeAnchorsById.set(anchorId, existing);
    }
  }

  for (const section of sections) {
    const sourceIds = unique([
      ...(section.patternId ? [section.patternId] : []),
      ...(routeAnchorsById.get(section.id) ?? []),
    ]).filter((sourceId) => Boolean(patternNodes[sourceId] || routeNodes[sourceId]));
    if (sourceIds.length === 0) {
      continue;
    }

    const sentences = sentenceCandidates(`${section.heading}. ${section.plainText}`);
    for (const sentence of sentences) {
      const references = extractIds(sentence).filter(
        (targetId) => patternNodes[targetId] || routeNodes[targetId],
      );
      if (references.length === 0) {
        continue;
      }

      const normalizedSentence = normalizeForLookup(sentence);
      const hasCuePhrase =
        /\bsee\b|\bstart with\b|\bcontinue with\b|\bland on\b|\breroute to\b|\bused by\b|\bbuilds on\b|\bprerequisite for\b|\bcoordinates with\b|\badd\b/.test(
          normalizedSentence,
        );
      if (!hasCuePhrase && references.length < 2) {
        continue;
      }

      for (const sourceId of sourceIds) {
        for (const targetId of references) {
          if (sourceId === targetId) {
            continue;
          }
          relations.push({
            from: sourceId,
            relation: 'explicit_reference',
            to: targetId,
            source: section.id,
          });
        }
      }
    }
  }

  return uniqueRelations(relations);
}

function buildLexiconRelations(
  lexicon: Record<string, LexiconEntry>,
): RelationEdge[] {
  return uniqueRelations(
    Object.values(lexicon).flatMap((entry) =>
      entry.linkedNodeIds.map((linkedNodeId) => ({
        from: entry.id,
        relation: 'lexical_match' as const,
        to: linkedNodeId,
        source: entry.id,
      })),
    ),
  );
}

function buildCompiledNodes(
  patternNodes: Record<string, PatternRecord>,
  routeNodes: Record<string, RouteRecord>,
  lexicon: Record<string, LexiconEntry>,
  relationGraph: RelationEdge[],
): Record<string, CompiledNode> {
  const nodes: Record<string, CompiledNode> = {};

  for (const pattern of Object.values(patternNodes)) {
    nodes[pattern.id] = {
      id: pattern.id,
      kind: 'pattern',
      title: pattern.title,
      status: pattern.status,
      part: pattern.part,
      cluster: pattern.cluster,
      aliases: pattern.aliases,
      anchorIds: pattern.sectionIds,
      neighborEdges: relationGraph.filter((edge) => edge.from === pattern.id),
      searchableText: pattern.searchableText,
      details: pattern,
    };
  }

  for (const route of Object.values(routeNodes)) {
    nodes[route.id] = {
      id: route.id,
      kind: 'route',
      title: route.name,
      aliases: [route.name],
      anchorIds: route.anchorIds,
      neighborEdges: relationGraph.filter((edge) => edge.from === route.id),
      searchableText: route.searchableText,
      details: route,
    };
  }

  for (const entry of Object.values(lexicon)) {
    nodes[entry.id] = {
      id: entry.id,
      kind: 'lexeme',
      title: entry.canonical,
      aliases: entry.aliases,
      anchorIds: entry.sourceAnchorIds,
      neighborEdges: relationGraph.filter((edge) => edge.from === entry.id),
      searchableText: entry.searchableText,
      details: entry,
    };
  }

  return nodes;
}

function buildIndexes(
  compiledNodes: Record<string, CompiledNode>,
  patternNodes: Record<string, PatternRecord>,
  routeNodes: Record<string, RouteRecord>,
  lexicon: Record<string, LexiconEntry>,
): Snapshot['indexes'] {
  const idIndex = buildInvertedIndex(
    Object.keys(compiledNodes).map((id) => [id, id] as const),
  );
  const titleIndex = buildInvertedIndex(
    Object.values(compiledNodes).map((node) => [node.title, node.id] as const),
  );
  const aliasIndex = buildInvertedIndex(
    Object.values(compiledNodes).flatMap((node) =>
      node.aliases.map((alias) => [alias, node.id] as const),
    ),
  );
  const lexiconIndex = buildInvertedIndex(
    Object.values(lexicon).flatMap((entry) =>
      entry.normalizedKeys.map((key) => [key, entry.id] as const),
    ),
  );
  const routeNameIndex = buildInvertedIndex(
    Object.values(routeNodes).map((route) => [route.name, route.id] as const),
  );
  const statusIndex = buildInvertedIndex(
    Object.values(patternNodes).map((pattern) => [pattern.status, pattern.id] as const),
  );
  const familyIndex = buildInvertedIndex(
    Object.values(patternNodes).flatMap((pattern) => {
      const pairs: Array<readonly [string, string]> = [];
      if (pattern.part) {
        pairs.push([pattern.part, pattern.id]);
      }
      if (pattern.cluster) {
        pairs.push([pattern.cluster, pattern.id]);
      }
      return pairs;
    }),
  );

  return {
    idIndex,
    titleIndex,
    aliasIndex,
    lexiconIndex,
    routeNameIndex,
    statusIndex,
    familyIndex,
  };
}

function buildValidation(
  compiledNodes: Record<string, CompiledNode>,
  patternNodes: Record<string, PatternRecord>,
  routeNodes: Record<string, RouteRecord>,
  lexicon: Record<string, LexiconEntry>,
  indexMap: { roots: string[]; nodes: Record<string, IndexMapNode> },
  relationGraph: RelationEdge[],
): BuildValidation {
  const duplicateIds = findDuplicateIds([
    ...Object.keys(compiledNodes),
    ...Object.keys(indexMap.nodes),
  ]);
  const unresolvedReferences = unique(
    relationGraph
      .map((edge) => edge.to)
      .filter((target) => !compiledNodes[target]),
  );
  const missingRequiredFields = Object.values(patternNodes).reduce((count, pattern) => {
    const requiredFields = [
      pattern.title,
      pattern.status,
      pattern.dependenciesRaw,
      pattern.searchableText,
    ];
    return count + requiredFields.filter((value) => !value).length;
  }, 0);
  const brokenRoutes = Object.values(routeNodes)
    .filter(
      (route) =>
        route.orderedIds.length === 0 &&
        route.routeSurfaces.length === 0 &&
        route.nextOwners.length === 0,
    )
    .map((route) => route.id);

  return {
    parsedSections: Object.keys(indexMap.nodes).length,
    parsedPatterns: Object.keys(patternNodes).length,
    parsedRoutes: Object.keys(routeNodes).length,
    parsedLexiconEntries: Object.keys(lexicon).length,
    indexMapNodes: Object.keys(indexMap.nodes).length,
    missingRequiredFields,
    unresolvedReferences,
    duplicateIds,
    brokenRoutes,
  };
}

function parseHeadingMetadata(
  lines: string[],
  startLine: number,
  endLine: number,
): { type?: string; status?: string; normativity?: string } {
  const result: { type?: string; status?: string; normativity?: string } = {};
  for (let index = startLine - 1; index < endLine; index += 1) {
    const line = lines[index]?.trim();
    if (!line?.startsWith('>')) {
      if (line && !line.startsWith('*') && !line.startsWith('>')) {
        break;
      }
      continue;
    }
    const cleanLine = cleanMarkdown(line.replace(/^>\s*/, ''));
    const match = cleanLine.match(/^([^:]+):\s*(.+)$/);
    if (!match) {
      continue;
    }
    const key = normalizeForLookup(match[1] ?? '');
    if (key === 'type') {
      result.type = match[2];
    } else if (key === 'status') {
      result.status = match[2];
    } else if (key === 'normativity') {
      result.normativity = match[2];
    }
  }
  return result;
}

function parseRelationSection(section?: HeadingSectionInternal): RelationEdge[] {
  if (!section) {
    return [];
  }
  return parseLabeledRelations(section.patternId ?? section.id, section.text, section.id);
}

function parseLabeledRelations(
  sourceId: string,
  text: string,
  sourceCitation: string,
): RelationEdge[] {
  const relationEdges: RelationEdge[] = [];
  const relationRegex =
    /\*\*([^:*]+):\*\*\s*([\s\S]*?)(?=(?:\n\s*[*-]\s*\*\*[^:*]+:\*\*|\s+\*\*[^:*]+:\*\*|$))/g;
  for (const match of text.matchAll(relationRegex)) {
    const label = normalizeForLookup(match[1] ?? '');
    const relation = RELATION_LABELS[label];
    if (!relation) {
      continue;
    }
    for (const target of extractIds(match[2] ?? '')) {
      relationEdges.push({
        from: sourceId,
        relation,
        to: target,
        source: sourceCitation,
      });
    }
  }
  return relationEdges;
}

function parseKeywords(cell: string): string[] {
  const match = cell.match(/Keywords:\s*(.+?)(?:Queries:|$)/i);
  if (!match) {
    return [];
  }
  return match[1]!
    .split(',')
    .map((entry) => normalizeLabel(entry))
    .filter(Boolean);
}

function parseQueries(cell: string): string[] {
  const match = cell.match(/Queries:\s*(.+)$/i);
  if (!match) {
    return [];
  }
  return Array.from(match[1]!.matchAll(/"([^"]+)"/g), (item) => normalizeLabel(item[1] ?? ''))
    .filter(Boolean);
}

function deriveAliases(title: string, rawHeading: string): string[] {
  const aliases = new Set<string>([title]);
  const prefix = primarySymbolFromTitle(title);
  if (prefix) {
    aliases.add(prefix);
  }
  for (const source of [title, rawHeading]) {
    for (const match of source.matchAll(/`([^`]+)`/g)) {
      aliases.add(match[1]!);
    }
  }
  return unique(aliases);
}

function primarySymbolFromTitle(title: string): string | undefined {
  const colonPrefix = title.split(':')[0]?.trim();
  if (colonPrefix && /[A-Z]\.[A-Za-z]/.test(colonPrefix)) {
    return colonPrefix;
  }
  const dashPrefix = title.split(' - ')[0]?.trim();
  if (dashPrefix && /[A-Z]\.[A-Za-z]/.test(dashPrefix)) {
    return dashPrefix;
  }
  return undefined;
}

function inferSectionRole(heading: string, fullId?: string): SectionRole {
  const normalized = normalizeForLookup(`${fullId ?? ''} ${heading}`);
  if (normalized.includes('definition')) {
    return 'definition';
  }
  if (normalized.includes('solution')) {
    return 'solution';
  }
  if (normalized.includes('relations')) {
    return 'relations';
  }
  if (normalized.includes('conformance')) {
    return 'conformance';
  }
  if (normalized.includes('problem')) {
    return 'problem';
  }
  if (normalized.includes('forces')) {
    return 'forces';
  }
  return 'other';
}

function derivePrefaceRouteName(line: string): string | undefined {
  const boldMatches = Array.from(line.matchAll(/\*\*([^*]+)\*\*/g), (match) => match[1]!);
  if (boldMatches.length > 0) {
    return normalizeLabel(boldMatches[0]!);
  }
  const afterPrefix = line.replace(/^- /, '');
  const separatorIndex = afterPrefix.indexOf(':');
  if (separatorIndex < 0) {
    return undefined;
  }
  const candidate = afterPrefix
    .slice(0, separatorIndex)
    .replace(/^For\s+/i, '')
    .replace(/^When\s+/i, '');
  return normalizeLabel(candidate);
}

function extractOrderedIds(line: string): string[] {
  const startWithIndex = line.indexOf('start with');
  if (startWithIndex < 0) {
    return [];
  }
  const endIndex = line.indexOf('Land on');
  const segment = line.slice(startWithIndex, endIndex > 0 ? endIndex : undefined);
  return extractIds(segment);
}

function extractLandingIds(line: string): string[] {
  const landingIndex = line.indexOf('Land on');
  if (landingIndex < 0) {
    return [];
  }
  return extractIds(line.slice(landingIndex));
}

function routeKey(name: string): string {
  return `route:${slugify(name)}`;
}

function normalizeClusterLabel(label: string): string {
  const normalized = normalizeLabel(label);
  const matched = PART_C_CLUSTER_LABELS.find(
    (candidate) => normalizeForLookup(candidate) === normalizeForLookup(normalized),
  );
  return matched ?? normalized;
}

function describeIndexNode(
  section: HeadingSectionInternal,
  catalogDescriptions: Record<string, CatalogDescription>,
  pattern?: PatternRecord,
): string {
  const descriptionFromCatalog =
    catalogDescriptions[normalizeForLookup(section.heading)]?.description ??
    (pattern ? catalogDescriptions[normalizeForLookup(pattern.title)]?.description : undefined);
  const fallback = sentenceCandidates(section.plainText).slice(0, 2).join(' ');
  const description = descriptionFromCatalog ?? fallback ?? pattern?.title ?? section.heading;
  return description.slice(0, 320).trim();
}

function directPatternParent(
  patternId: string,
  patternNodes: Record<string, PatternRecord>,
): string | undefined {
  const variants = patternId.includes(':')
    ? [patternId.split(':')[0]!, patternId]
    : [patternId];
  for (const variant of variants) {
    const dotIndex = variant.lastIndexOf('.');
    if (dotIndex <= 0) {
      continue;
    }
    const candidate = variant.slice(0, dotIndex);
    if (patternNodes[candidate]) {
      return candidate;
    }
  }
  return undefined;
}

function uniqueRelations(relations: RelationEdge[]): RelationEdge[] {
  const seen = new Set<string>();
  const uniqueEdges: RelationEdge[] = [];
  for (const relation of relations) {
    const key = `${relation.from}:${relation.relation}:${relation.to}:${relation.source}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    uniqueEdges.push(relation);
  }
  return uniqueEdges;
}

function buildInvertedIndex(
  entries: ReadonlyArray<readonly [string, string]>,
): Record<string, string[]> {
  const index: Record<string, string[]> = Object.create(null) as Record<string, string[]>;
  for (const [rawKey, id] of entries) {
    const key = normalizeForLookup(rawKey);
    if (!key) {
      continue;
    }
    const existing = Array.isArray(index[key]) ? index[key] : [];
    index[key] = unique([...existing, id]);
  }
  return index;
}

function findDuplicateIds(ids: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) {
      duplicates.add(id);
    } else {
      seen.add(id);
    }
  }
  return Array.from(duplicates);
}

export function isPartCDraftQuery(question: string): boolean {
  const normalized = normalizeForLookup(question);
  return normalized.includes('draft') && normalized.includes('part c');
}

export function scorePatternQuery(
  question: string,
  patterns: PatternRecord[],
): Array<{ pattern: PatternRecord; score: number; reasons: string[] }> {
  const queryTokens = tokenize(question);
  const exactIds = new Set(extractIds(question));
  const normalizedQuestion = normalizeForLookup(question);
  return patterns
    .map((pattern) => {
      let score = 0;
      const reasons: string[] = [];
      const overlap = scoreOverlap(queryTokens, pattern.searchableText);
      if (overlap > 0) {
        score += overlap;
        reasons.push(`token-overlap:${overlap}`);
      }
      if (exactIds.has(pattern.id)) {
        score += 100;
        reasons.push('exact-id');
      }
      for (const alias of pattern.aliases) {
        const normalizedAlias = normalizeForLookup(alias);
        if (normalizedAlias && normalizedQuestion.includes(normalizedAlias)) {
          const delta = normalizedAlias.includes(' ') ? 30 : 16;
          score += delta;
          reasons.push(`alias:${alias}`);
        }
      }
      if (normalizedQuestion.includes(normalizeForLookup(pattern.title))) {
        score += 30;
        reasons.push('title');
      }
      return { pattern, score, reasons };
    })
    .sort((left, right) => right.score - left.score);
}

export function scoreRouteQuery(
  question: string,
  routes: RouteRecord[],
): Array<{ route: RouteRecord; score: number; reasons: string[] }> {
  const queryTokens = tokenize(question);
  const normalizedQuestion = normalizeForLookup(question);
  return routes
    .map((route) => {
      let score = 0;
      const reasons: string[] = [];
      const overlap = scoreOverlap(queryTokens, route.searchableText);
      if (overlap > 0) {
        score += overlap;
        reasons.push(`token-overlap:${overlap}`);
      }
      if (normalizedQuestion.includes(normalizeForLookup(route.name))) {
        score += 30;
        reasons.push('route-name');
      }
      if (normalizedQuestion.includes('route')) {
        score += 5;
        reasons.push('route-word');
      }
      return { route, score, reasons };
    })
    .sort((left, right) => right.score - left.score);
}

export function selectBestAnchors(
  question: string,
  pattern: PatternRecord,
  anchorMap: Record<string, AnchorRef>,
): AnchorRef[] {
  const queryTokens = tokenize(question);
  const ranked = pattern.sectionIds
    .map((anchorId) => anchorMap[anchorId])
    .filter((anchor): anchor is AnchorRef => Boolean(anchor))
    .map((anchor) => {
      let score = scoreOverlap(queryTokens, `${anchor.heading} ${anchor.plainText}`);
      if (anchor.role === 'definition' || anchor.role === 'solution') {
        score += 4;
      }
      if (anchor.role === 'relations') {
        score += 2;
      }
      if (anchor.role === 'conformance') {
        score += 1;
      }
      return { anchor, score };
    })
    .sort((left, right) => right.score - left.score);

  const picked: AnchorRef[] = [];
  const byRole = (role: SectionRole) => ranked.find((entry) => entry.anchor.role === role)?.anchor;
  for (const role of ['definition', 'solution', 'relations', 'conformance'] as const) {
    const anchor = byRole(role);
    if (anchor && !picked.some((item) => item.id === anchor.id)) {
      picked.push(anchor);
    }
  }
  for (const entry of ranked) {
    if (picked.some((anchor) => anchor.id === entry.anchor.id)) {
      continue;
    }
    picked.push(entry.anchor);
    if (picked.length >= 4) {
      break;
    }
  }
  return picked;
}

export function formatAnchorSentences(
  anchor: AnchorRef,
  question: string,
  maxSentences: number,
): string[] {
  const queryTokens = tokenize(question);
  const ranked = sentenceCandidates(anchor.plainText)
    .map((sentence) => ({
      sentence,
      score: scoreOverlap(queryTokens, sentence),
    }))
    .sort((left, right) => right.score - left.score)
    .slice(0, maxSentences)
    .map((entry) => entry.sentence);
  return ranked.length > 0 ? ranked : sentenceCandidates(anchor.plainText).slice(0, maxSentences);
}

export function getPartCDraftsByCluster(
  patterns: Record<string, PatternRecord>,
): Record<string, PatternRecord[]> {
  const grouped: Record<string, PatternRecord[]> = {};
  for (const cluster of PART_C_CLUSTER_LABELS) {
    grouped[cluster] = [];
  }
  for (const pattern of Object.values(patterns)) {
    if (pattern.part !== PART_C_LABEL || normalizeForLookup(pattern.status) !== 'draft') {
      continue;
    }
    const cluster = pattern.cluster && grouped[pattern.cluster] ? pattern.cluster : PART_C_CLUSTER_LABELS[0];
    grouped[cluster] = [...(grouped[cluster] ?? []), pattern];
  }
  for (const key of Object.keys(grouped)) {
    grouped[key] = grouped[key].sort((left, right) => left.id.localeCompare(right.id));
  }
  return grouped;
}

export function findLexemeMatches(
  question: string,
  lexicon: Record<string, LexiconEntry>,
): string[] {
  const normalizedQuestion = normalizeForLookup(question);
  const quoted = unique([
    ...extractBacktickedTerms(question),
    ...extractQuotedPhrases(question),
  ]).map(normalizeForLookup);
  const matchedIds: string[] = [];
  for (const entry of Object.values(lexicon)) {
    const matched = entry.normalizedKeys.some(
      (key) =>
        !isLowSignalLexemeKey(key) &&
        (quoted.includes(key) || normalizedQuestion.includes(key)),
    );
    if (matched) {
      matchedIds.push(entry.id);
    }
  }
  return unique(matchedIds);
}

function shouldIndexLexeme(canonical: string): boolean {
  const normalizedCanonical = normalizeForLookup(canonical);
  if (!normalizedCanonical || normalizedCanonical.length < 3) {
    return false;
  }

  const tokens = normalizedCanonical.split(/\s+/).filter(Boolean);
  if (tokens.length === 1) {
    const token = tokens[0]!;
    if (/^[a-z]+$/.test(token)) {
      return false;
    }
    if (/^[A-Z]{1,2}$/.test(canonical.trim())) {
      return false;
    }
  }

  return true;
}

function isLowSignalLexemeKey(key: string): boolean {
  return key.length < 3 || /^[a-z]+$/.test(key);
}
