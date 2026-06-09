import {
  PREFACE_ROUTE_CITATION,
  ROUTE_INDEX_CITATION,
} from './constants.js';
import type { HeadingSection, SourceIR } from './source-parser.js';
import {
  cleanMarkdown,
  deriveAliases,
  derivePrefaceRouteName,
  extractIds,
  extractLandingIds,
  extractOrderedIds,
  parseHeadingMetadata,
  parseRelationSection,
  routeKey,
} from './source-parser.js';
import {
  isMarkdownSeparatorRow,
  normalizeForLookup,
  normalizeLabel,
  sentenceCandidates,
  splitMarkdownRow,
  unique,
} from './text.js';
import { REFERENCE_ROUTE_DEFS } from './spec-heuristics.js';
import type {
  AnchorRef,
  LexiconEntry,
  PatternRecord,
  RelationEdge,
  RouteRecord,
  Snapshot,
} from './types.js';

export function buildPatternGraph(
  ir: SourceIR,
): Snapshot['patternGraph'] {
  const { lines, sections, metadata } = ir;
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

export function buildRouteGraph(
  ir: SourceIR,
  patternNodes: Record<string, PatternRecord>,
): Snapshot['routeGraph'] {
  const { lines, anchorMap } = ir;
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
      constraints: unique([...existing.constraints, ...route.constraints]),
    });
  }

  for (const route of buildReferenceOverlayRoutes(patternNodes, anchorMap)) {
    if (!routes.has(route.id)) {
      routes.set(route.id, route);
    }
  }

  return {
    nodes: Object.fromEntries(routes.entries()),
    relations: buildRouteRelations(Object.fromEntries(routes.entries())),
  };
}

export function buildOutlineRelations(
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

export function buildExplicitReferenceRelations(
  sections: HeadingSection[],
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

export function buildLexiconRelations(
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

export function uniqueRelations(relations: RelationEdge[]): RelationEdge[] {
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

function parsePrefaceRoutes(
  lines: string[],
  anchorMap: Record<string, AnchorRef>,
): RouteRecord[] {
  const routes: RouteRecord[] = [];
  let inPrefaceRouteList = false;
  let currentBullet: string | null = null;

  const finalizeBullet = (bullet: string | null): void => {
    if (!bullet) return;
    // Accept either legacy ("start with") or current ("inspect") verbs.
    if (!bullet.includes('start with') && !bullet.includes('inspect')) {
      return;
    }
    const routeName = derivePrefaceRouteName(bullet);
    if (!routeName) return;
    const id = routeKey(routeName);
    const orderedIds = extractOrderedIds(bullet);
    const landingIds = extractLandingIds(bullet);
    const allIds = extractIds(bullet);
    routes.push({
      id,
      name: routeName,
      description: cleanMarkdown(bullet.replace(/^- /, '')),
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
      searchableText: cleanMarkdown(bullet),
      constraints: [],
    });
  };

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
      finalizeBullet(currentBullet);
      currentBullet = null;
      break;
    }

    if (trimmed.startsWith('- ')) {
      // New bullet — finalize the previous one (if any) and start collecting.
      finalizeBullet(currentBullet);
      currentBullet = trimmed;
      continue;
    }

    if (currentBullet !== null) {
      // Indented continuation lines belong to the current bullet. The spec
      // wraps long preface bullets across multiple lines (e.g. for "project
      // alignment"), so we need to glue them back together before scanning
      // for the verb / IDs.
      if (line.startsWith(' ') || line.startsWith('\t')) {
        currentBullet = `${currentBullet} ${trimmed}`;
        continue;
      }
      // Blank line or non-indented prose: bullet ended.
      finalizeBullet(currentBullet);
      currentBullet = null;
    }
  }

  // Tail bullet, if the section runs to EOF without the "Everything in the
  // Core" terminator.
  finalizeBullet(currentBullet);

  return routes;
}

// Either heading is valid: the spec was renamed from "Route Index" to
// "Neighborhood Index" but the table shape (≥6 columns, name in cell 0,
// burden in cell 1, candidates in cell 2, description in cell 3) is unchanged.
const J4_HEADING_PREFIXES = [
  '## J.4 - First Practical Entry Route Index',
  '## J.4 - First Practical Entry Neighborhood Index',
];
// Header-row first cells we should skip — both the old "Route" header and
// the new "Entry neighborhood" header. Compared via `normalizeForLookup`
// so casing/whitespace differences don't leak through.
const J4_HEADER_CELL_VALUES = new Set(['route', 'entry neighborhood']);

function parseJ4Routes(
  lines: string[],
  anchorMap: Record<string, AnchorRef>,
): RouteRecord[] {
  const headingIndex = lines.findIndex((line) => {
    const trimmed = line.trim();
    return J4_HEADING_PREFIXES.some((prefix) => trimmed.startsWith(prefix));
  });
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
    if (J4_HEADER_CELL_VALUES.has(normalizeForLookup(cells[0] ?? ''))) {
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
      constraints: [],
    });
  }
  return routes;
}

function buildReferenceOverlayRoutes(
  patternNodes: Record<string, PatternRecord>,
  anchorMap: Record<string, AnchorRef>,
): RouteRecord[] {
  const filterPatternIds = (ids: readonly string[]): string[] =>
    ids.filter((id) => Boolean(patternNodes[id]));

  return REFERENCE_ROUTE_DEFS
    .map((def): RouteRecord | undefined => {
      const id = routeKey(def.name);
      const orderedIds = filterPatternIds(def.orderedIds);
      const optionalIds = filterPatternIds(def.optionalIds);
      const landingIds = filterPatternIds(def.landingIds);
      const routeSurfaces = filterPatternIds(def.routeSurfaces);
      const nextOwners = filterPatternIds(def.nextOwners);
      const reroutes = filterPatternIds(def.reroutes);

      if (
        orderedIds.length === 0 &&
        optionalIds.length === 0 &&
        landingIds.length === 0 &&
        routeSurfaces.length === 0
      ) {
        return undefined;
      }

      const citation = `fpf-reference-adoption-overlay:${id.replace(/^route:/, '')}`;
      anchorMap[citation] = {
        id: citation,
        nodeId: id,
        heading: def.name,
        lineStart: 0,
        lineEnd: 1,
        path: ['FPF Reference adoption overlay', def.name],
        text: def.description,
        plainText: `${def.description} ${def.firstHonestBurden}`,
        role: 'route_surface',
      };
      return {
        id,
        name: def.name,
        description: def.description,
        firstHonestBurden: def.firstHonestBurden,
        orderedIds,
        optionalIds,
        landingIds,
        routeSurfaces,
        nextOwners,
        reroutes,
        citations: [citation],
        anchorIds: [citation],
        searchableText: cleanMarkdown(unique([
          id,
          def.name,
          def.description,
          def.firstHonestBurden,
          ...orderedIds,
          ...optionalIds,
          ...landingIds,
          ...routeSurfaces,
          ...nextOwners,
          ...reroutes,
        ]).join(' ')),
        constraints: [],
      };
    })
    .filter((route): route is RouteRecord => Boolean(route));
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
