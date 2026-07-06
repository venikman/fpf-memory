import {
  PREFACE_ROUTE_CITATION,
  ROUTE_INDEX_CITATION,
} from './constants.js';
import type { CatalogDescription, HeadingSection, SourceIR } from './source-parser.js';
import { primarySymbolFromTitle } from './source-parser.js';
import {
  extractBacktickedTerms,
  normalizeForLookup,
  sentenceCandidates,
  slugify,
  unique,
} from './text.js';
import type {
  AnchorRef,
  CompiledNode,
  IndexMapNode,
  LexiconEntry,
  PatternRecord,
  RelationEdge,
  RouteRecord,
  Snapshot,
} from './types.js';

export function buildIndexMap(
  ir: SourceIR,
  patternNodes: Record<string, PatternRecord>,
  routeNodes: Record<string, RouteRecord>,
  lineBlame?: Map<number, { sha: string; committedAt: string }>,
): {
  roots: string[];
  nodes: Record<string, IndexMapNode>;
  duplicateHeadings: string[];
} {
  const { sections, catalogDescriptions } = ir;
  const nodes: Record<string, IndexMapNode> = {};
  const roots: string[] = [];
  const duplicateHeadings = new Set<string>();
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
    if (Object.hasOwn(nodes, section.id)) {
      duplicateHeadings.add(section.id);
    }
    const blameForSection = lineBlame
      ? newestCommitInRange(lineBlame, section.lineStart, section.lineEnd)
      : undefined;
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
      ...(blameForSection
        ? {
            lastCommittedAt: blameForSection.committedAt,
            lastCommitSha: blameForSection.sha,
          }
        : {}),
      metadata: {
        patternId: section.patternId,
        part: pattern?.part,
        cluster: pattern?.cluster,
        role: section.role,
        routeBearing:
          section.id === PREFACE_ROUTE_CITATION ||
          section.id === ROUTE_INDEX_CITATION ||
          Boolean(section.patternId && routeBearingPatternIds.has(section.patternId)),
      },
    };
    if (!section.parentId) {
      roots.push(section.id);
    }
  }
  return { roots, nodes, duplicateHeadings: Array.from(duplicateHeadings) };
}

/**
 * Walk a line range (1-based, inclusive) and return the most recent
 * commit info that touched any line in that range.
 */
function newestCommitInRange(
  blame: Map<number, { sha: string; committedAt: string }>,
  lineStart: number,
  lineEnd: number,
): { sha: string; committedAt: string } | undefined {
  let best: { sha: string; committedAt: string } | undefined;
  for (let line = lineStart; line <= lineEnd; line += 1) {
    const info = blame.get(line);
    if (!info) continue;
    if (!best || info.committedAt > best.committedAt) {
      best = info;
    }
  }
  return best;
}

export function buildLexicon(
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

export function buildCompiledNodes(
  patternNodes: Record<string, PatternRecord>,
  routeNodes: Record<string, RouteRecord>,
  lexicon: Record<string, LexiconEntry>,
  relationGraph: RelationEdge[],
  options: {
    indexMap?: Record<string, IndexMapNode>;
    anchorMap?: Record<string, AnchorRef>;
  } = {},
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

  // Audit follow-up A: top-level preface section nodes (those whose ID
  // starts with `heading:`) carry substantive prose like "Thinking
  // Through Writing" that previously couldn't appear in `search_fpf`
  // because only patterns/routes/lexemes entered `compiledNodes`.
  // Iterate the indexMap once, pick out the heading: rows, attach the
  // anchor's plainText as searchable text, and skip stub headings
  // (< 80 chars of prose) so the search surface doesn't fill up with
  // empty title-only entries.
  const indexMap = options.indexMap;
  const anchorMap = options.anchorMap;
  if (indexMap && anchorMap) {
    for (const node of Object.values(indexMap)) {
      if (!node.id.startsWith('heading:')) continue;
      if (nodes[node.id]) continue; // already covered by another kind
      const anchor = anchorMap[node.id];
      const prose = anchor?.plainText?.trim() ?? '';
      if (prose.length < 80) continue;
      nodes[node.id] = {
        id: node.id,
        kind: 'preface',
        title: node.title,
        aliases: [],
        anchorIds: [node.id],
        neighborEdges: relationGraph.filter((edge) => edge.from === node.id),
        searchableText: `${node.title} ${prose}`,
        // The CompiledNode.details union doesn't yet carry a preface
        // shape; pass the indexMap node so callers that introspect
        // can read line range / parent / path. Cast at the boundary.
        details: node as unknown as PatternRecord,
      };
    }
  }

  return nodes;
}

export function buildIndexes(
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

function describeIndexNode(
  section: HeadingSection,
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

function shouldIndexLexeme(canonical: string): boolean {
  const normalizedCanonical = normalizeForLookup(canonical);
  if (!normalizedCanonical || normalizedCanonical.length < 3) {
    return false;
  }

  // Reject compiler artifacts the source parser mis-files as vocabulary. These
  // are not terms a reader would ever search for, and each one pollutes the
  // lexeme catalog + inherited search aliases. Rules mirror the "hard" band in
  // tools/lexicon-audit so the compiler and that audit agree on the floor.
  const trimmed = canonical.trim();
  if (!/[A-Za-z]/.test(trimmed)) {
    // No Latin letter at all: "{ }", "Δ-0", "[0,1]", "99.9%", bare arXiv ids.
    return false;
  }
  if (!/^[\p{L}\p{N}]/u.test(trimmed)) {
    // Punctuation-led fragment: ", not by the notation.", "{environment, method}".
    // Unicode-aware so a leading operator symbol (e.g. "Γ_time", "Φ_plane") — a
    // legitimate FPF term — is kept; only true punctuation/brackets are dropped.
    return false;
  }
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (trimmed.length > 120 || words.length > 12) {
    // Prose / multi-sentence block split off as a single "term".
    return false;
  }
  if (words.length > 10 && /[.:;]\s+\S/.test(trimmed)) {
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
