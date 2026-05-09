import {
  PART_C_CLUSTER_LABELS,
  PREFACE_MARKER,
  PREFACE_ROUTE_CITATION,
} from './constants.js';
import {
  cleanMarkdown,
  extractIds,
  isMarkdownSeparatorRow,
  normalizeForLookup,
  normalizeLabel,
  slugify,
  splitMarkdownRow,
  stripMarkdownToText,
  unique,
} from './text.js';
import {
  isAsciiAlphaNumeric,
  isAsciiDigit,
  isUppercaseAsciiLetter,
  isWhitespaceCharacter,
  skipWhitespace,
  startsWithAsciiIgnoreCase,
  toLowerAscii,
} from './text-scan.js';
import type { AnchorRef, RelationEdge, RelationKind, SectionRole } from './types.js';

export interface HeadingSection extends AnchorRef {
  level: number;
  fullId?: string;
  patternId?: string;
  parentId?: string;
  childIds: string[];
}

export interface PatternMeta {
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

export interface CatalogDescription {
  title: string;
  description: string;
}

export interface SourceIR {
  lines: string[];
  catalogLines: string[];
  sections: HeadingSection[];
  metadata: Record<string, PatternMeta>;
  catalogDescriptions: Record<string, CatalogDescription>;
  anchorMap: Record<string, AnchorRef>;
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

const ORDERED_RELATION_LABELS = Object.keys(RELATION_LABELS).sort(
  (left, right) => right.length - left.length,
);
const RELATION_LABELS_BY_FIRST_CHARACTER = ORDERED_RELATION_LABELS.reduce<
  Record<string, string[]>
>((labelsByFirstCharacter, label) => {
  const firstCharacter = label[0]!;
  labelsByFirstCharacter[firstCharacter] ??= [];
  labelsByFirstCharacter[firstCharacter]!.push(label);
  return labelsByFirstCharacter;
}, {});

const PATTERN_ROW_ID = /^\**[A-Z]\.\d+(?:\.[A-Za-z0-9]+)*\**$/;

interface ParsedHeadingLine {
  level: number;
  title: string;
  fullId?: string;
  patternId?: string;
}

interface RelationLabelMatch {
  start: number;
  label: string;
  contentStart: number;
}

function parseHeadingLine(line: string): ParsedHeadingLine | undefined {
  let index = 0;
  while (index < line.length && line[index] === '#') {
    index += 1;
  }

  if (index === 0 || index > 6 || !isWhitespaceCharacter(line[index])) {
    return undefined;
  }

  const level = index;
  const title = cleanMarkdown(line.slice(skipWhitespace(line, index)));
  const { fullId, patternId } = parseStructuredHeading(title);
  return { level, title, fullId, patternId };
}

function parseStructuredHeading(
  title: string,
): { fullId?: string; patternId?: string } {
  const separatorIndex = findSpacedDashSeparator(title);
  if (separatorIndex < 0) {
    return {};
  }

  const fullId = title.slice(0, separatorIndex).trimEnd();
  const remainder = title.slice(separatorIndex + 1).trimStart();
  if (!remainder || !isStructuredHeadingId(fullId)) {
    return {};
  }

  return {
    fullId,
    patternId: fullId.split(':')[0],
  };
}

function findSpacedDashSeparator(text: string): number {
  for (let index = 1; index < text.length - 1; index += 1) {
    if (
      text[index] === '-' &&
      isWhitespaceCharacter(text[index - 1]) &&
      isWhitespaceCharacter(text[index + 1])
    ) {
      return index;
    }
  }
  return -1;
}

function isStructuredHeadingId(value: string): boolean {
  let index = 0;
  if (!isUppercaseAsciiLetter(value[index])) {
    return false;
  }
  index += 1;

  if (value[index] !== '.') {
    return false;
  }
  index += 1;

  const afterMajor = consumeDigits(value, index);
  if (afterMajor === index) {
    return false;
  }
  index = afterMajor;

  while (value[index] === '.') {
    index += 1;
    const nextIndex = consumeAlphaNumeric(value, index);
    if (nextIndex === index) {
      return false;
    }
    index = nextIndex;
  }

  if (value[index] === ':') {
    index += 1;
    const nextIndex = consumeAlphaNumericOrDots(value, index);
    if (nextIndex === index) {
      return false;
    }
    index = nextIndex;
  }

  return index === value.length;
}

function consumeDigits(text: string, startIndex: number): number {
  let index = startIndex;
  while (isAsciiDigit(text[index])) {
    index += 1;
  }
  return index;
}

function consumeAlphaNumeric(text: string, startIndex: number): number {
  let index = startIndex;
  while (isAsciiAlphaNumeric(text[index])) {
    index += 1;
  }
  return index;
}

function consumeAlphaNumericOrDots(text: string, startIndex: number): number {
  let index = startIndex;
  while (isAsciiAlphaNumeric(text[index]) || text[index] === '.') {
    index += 1;
  }
  return index;
}

function isDashCharacter(character: string | undefined): boolean {
  return character === '-' || character === '–' || character === '—';
}

function parseCatalogPartHeading(line: string): string | undefined {
  if (!line.startsWith('**') || !line.endsWith('**')) {
    return undefined;
  }

  const normalized = normalizeLabel(line.slice(2, -2));
  if (!normalized.startsWith('Part ')) {
    return undefined;
  }

  let index = 'Part '.length;
  const letter = normalized[index];
  if (!isUppercaseAsciiLetter(letter)) {
    return undefined;
  }
  index += 1;
  index = skipWhitespace(normalized, index);

  if (!isDashCharacter(normalized[index])) {
    return undefined;
  }
  index += 1;
  index = skipWhitespace(normalized, index);

  const title = normalized.slice(index).trim();
  if (!title) {
    return undefined;
  }

  return `Part ${letter} - ${title}`;
}

function stripLeadingBlockquoteMarker(line: string): string {
  if (!line.startsWith('>')) {
    return line;
  }
  return line.slice(skipWhitespace(line, 1));
}

function parseLabeledValue(line: string): { key: string; value: string } | undefined {
  const separatorIndex = line.indexOf(':');
  if (separatorIndex <= 0) {
    return undefined;
  }

  const key = line.slice(0, separatorIndex).trim();
  const value = line.slice(separatorIndex + 1).trim();
  if (!key || !value) {
    return undefined;
  }

  return { key, value };
}

function findNextRelationLabel(
  text: string,
  fromIndex: number,
): RelationLabelMatch | undefined {
  for (let index = fromIndex; index < text.length; index += 1) {
    const match = parseRelationLabelAt(text, index);
    if (match) {
      return match;
    }
  }
  return undefined;
}

function parseRelationLabelAt(
  text: string,
  startIndex: number,
): RelationLabelMatch | undefined {
  let index = skipWhitespace(text, startIndex);

  if (text[index] === '-' || (text[index] === '*' && text[index + 1] !== '*')) {
    index += 1;
    index = skipWhitespace(text, index);
  }

  if (text[index] === '*' && text[index + 1] === '*') {
    index += 2;
    index = skipWhitespace(text, index);
  }

  if (!isRelationLabelBoundaryBefore(text, index)) {
    return undefined;
  }

  for (const label of RELATION_LABELS_BY_FIRST_CHARACTER[toLowerAscii(text[index]) ?? ''] ?? []) {
    if (!startsWithAsciiIgnoreCase(text, label, index)) {
      continue;
    }

    let cursor = index + label.length;
    if (text[cursor] !== ':') {
      continue;
    }
    cursor += 1;
    cursor = skipWhitespace(text, cursor);

    if (text[cursor] === '*' && text[cursor + 1] === '*') {
      cursor += 2;
      cursor = skipWhitespace(text, cursor);
    }

    return {
      start: startIndex,
      label,
      contentStart: cursor,
    };
  }

  return undefined;
}

function isRelationLabelBoundaryBefore(text: string, index: number): boolean {
  return index === 0 || !isAsciiAlphaNumeric(text[index - 1]);
}

export function parseSource(sourceText: string): SourceIR {
  const lines = sourceText.split(/\r?\n/);
  const prefaceIndex = lines.findIndex((line) => line.trim() === PREFACE_MARKER);
  const catalogLines = prefaceIndex >= 0 ? lines.slice(0, prefaceIndex) : lines;

  const metadata = parseCatalogMetadata(catalogLines);
  const catalogDescriptions = parseCatalogDescriptions(catalogLines);
  const sections = parseHeadingSections(lines);
  const anchorMap = buildAnchorMap(lines, sections);

  return { lines, catalogLines, sections, metadata, catalogDescriptions, anchorMap };
}

function parseHeadingSections(lines: string[]): HeadingSection[] {
  const headings: Array<{
    lineIndex: number;
    level: number;
    title: string;
    fullId?: string;
    patternId?: string;
  }> = [];

  for (let index = 0; index < lines.length; index += 1) {
    const parsedHeading = parseHeadingLine(lines[index] ?? '');
    if (!parsedHeading) {
      continue;
    }
    headings.push({
      lineIndex: index,
      level: parsedHeading.level,
      title: parsedHeading.title,
      fullId: parsedHeading.fullId,
      patternId: parsedHeading.patternId,
    });
  }

  const sections: HeadingSection[] = [];
  const stack: HeadingSection[] = [];
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
    const section: HeadingSection = {
      id,
      nodeId: current.patternId,
      heading: current.title,
      lineStart,
      lineEnd,
      path,
      text: rawBody,
      plainText: stripMarkdownToText(rawBody),
      role: inferSectionRole(current.title, current.fullId),
      level: current.level,
      fullId: current.fullId,
      patternId: current.patternId,
      parentId,
      childIds: [],
    };
    const parentSection = stack.at(-1);
    if (parentSection) {
      parentSection.childIds.push(id);
    }
    sections.push(section);
    stack.push(section);
  }

  return sections;
}

function buildAnchorMap(
  lines: string[],
  sections: HeadingSection[],
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
      role: section.role,
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
      const partHeading = parseCatalogPartHeading(trimmed);
      if (partHeading) {
        currentPart = partHeading;
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
    const normalizedKeywordsCell = normalizeForLookup(keywordsCell);
    const description =
      !dependenciesRaw &&
      keywordsCell &&
      !normalizedKeywordsCell.includes('keywords:') &&
      !normalizedKeywordsCell.includes('queries:')
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

export function parseHeadingMetadata(
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
    const cleanLine = cleanMarkdown(stripLeadingBlockquoteMarker(line));
    const labeledValue = parseLabeledValue(cleanLine);
    if (!labeledValue) {
      continue;
    }
    const key = normalizeForLookup(labeledValue.key);
    if (key === 'type') {
      result.type = labeledValue.value;
    } else if (key === 'status') {
      result.status = labeledValue.value;
    } else if (key === 'normativity') {
      result.normativity = labeledValue.value;
    }
  }
  return result;
}

export function parseRelationSection(section?: HeadingSection): RelationEdge[] {
  if (!section) {
    return [];
  }
  return parseLabeledRelations(section.patternId ?? section.id, section.text, section.id);
}

export function parseLabeledRelations(
  sourceId: string,
  text: string,
  sourceCitation: string,
): RelationEdge[] {
  const relationEdges: RelationEdge[] = [];

  let current = findNextRelationLabel(text, 0);
  while (current) {
    const next = findNextRelationLabel(text, current.contentStart);
    const rawTargets = text.slice(current.contentStart, next?.start ?? text.length);
    pushRelationEdges(relationEdges, sourceId, current.label, rawTargets, sourceCitation);
    current = next;
  }

  return relationEdges;
}

function pushRelationEdges(
  edges: RelationEdge[],
  sourceId: string,
  rawLabel: string,
  rawTargets: string,
  sourceCitation: string,
): void {
  const label = normalizeForLookup(rawLabel);
  const relation = RELATION_LABELS[label];
  if (!relation) {
    return;
  }
  for (const target of extractIds(rawTargets)) {
    edges.push({
      from: sourceId,
      relation,
      to: target,
      source: sourceCitation,
    });
  }
}

export function inferSectionRole(heading: string, fullId?: string): SectionRole {
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

function parseKeywords(cell: string): string[] {
  const keywordsIndex = indexOfIgnoreCase(cell, 'Keywords:');
  if (keywordsIndex < 0) {
    return [];
  }

  const valueStart = keywordsIndex + 'Keywords:'.length;
  const queriesIndex = indexOfIgnoreCase(cell, 'Queries:', valueStart);
  const segment = cell.slice(valueStart, queriesIndex >= 0 ? queriesIndex : undefined).trim();
  if (!segment) {
    return [];
  }

  return segment
    .split(',')
    .map((entry) => normalizeLabel(entry))
    .filter(Boolean);
}

function parseQueries(cell: string): string[] {
  const queriesIndex = indexOfIgnoreCase(cell, 'Queries:');
  if (queriesIndex < 0) {
    return [];
  }

  const segment = cell.slice(queriesIndex + 'Queries:'.length);
  return extractDoubleQuotedSegments(segment)
    .map((entry) => normalizeLabel(entry))
    .filter(Boolean);
}

function indexOfIgnoreCase(text: string, search: string, fromIndex = 0): number {
  return text.toLowerCase().indexOf(search.toLowerCase(), fromIndex);
}

function extractDoubleQuotedSegments(text: string): string[] {
  const matches: string[] = [];
  let current = '';
  let inQuotes = false;

  for (const character of text) {
    if (character === '"') {
      if (inQuotes && current.trim()) {
        matches.push(current.trim());
      }
      current = '';
      inQuotes = !inQuotes;
      continue;
    }
    if (inQuotes) {
      current += character;
    }
  }

  return matches;
}

function normalizeClusterLabel(label: string): string {
  const normalized = normalizeLabel(label);
  const matched = PART_C_CLUSTER_LABELS.find(
    (candidate) => normalizeForLookup(candidate) === normalizeForLookup(normalized),
  );
  return matched ?? normalized;
}


export function deriveAliases(title: string, rawHeading: string): string[] {
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

export function primarySymbolFromTitle(title: string): string | undefined {
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

export function derivePrefaceRouteName(line: string): string | undefined {
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

// Recent FPF spec revisions renamed the preface verbs ("start with" →
// "inspect") and route-table heading ("Route Index" → "Neighborhood Index").
// The compiler accepts both wordings so route extraction survives spec
// vocabulary churn. If the upstream phrasing changes again, extend these
// arrays rather than swapping them — the older form may still appear in
// archived snapshots that get replayed for drift checks.
const ORDERED_LIST_VERBS = ['inspect', 'start with'];
const ADDITIONAL_LIST_VERBS = ['Consider', 'Land on'];

function findFirstIndex(line: string, needles: string[]): number {
  let earliest = -1;
  for (const needle of needles) {
    const index = line.indexOf(needle);
    if (index < 0) continue;
    if (earliest < 0 || index < earliest) earliest = index;
  }
  return earliest;
}

export function extractOrderedIds(line: string): string[] {
  const startIndex = findFirstIndex(line, ORDERED_LIST_VERBS);
  if (startIndex < 0) {
    return [];
  }
  const endIndex = findFirstIndex(line, ADDITIONAL_LIST_VERBS);
  const segment = line.slice(startIndex, endIndex > startIndex ? endIndex : undefined);
  return extractIds(segment);
}

export function extractLandingIds(line: string): string[] {
  const landingIndex = findFirstIndex(line, ADDITIONAL_LIST_VERBS);
  if (landingIndex < 0) {
    return [];
  }
  return extractIds(line.slice(landingIndex));
}

export function routeKey(name: string): string {
  return `route:${slugify(name)}`;
}

// Re-export helpers needed by downstream modules
export {
  cleanMarkdown,
  extractIds,
  normalizeForLookup,
  normalizeLabel,
  slugify,
} from './text.js';
