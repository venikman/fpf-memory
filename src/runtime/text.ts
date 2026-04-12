const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'by',
  'for',
  'from',
  'how',
  'if',
  'in',
  'into',
  'is',
  'it',
  'of',
  'on',
  'or',
  'that',
  'the',
  'their',
  'this',
  'to',
  'use',
  'used',
  'using',
  'what',
  'when',
  'where',
  'which',
  'with',
]);

const ID_PATTERN =
  /\b[A-Z]\.\d+(?:\.[A-Za-z0-9]+)*(?::[A-Za-z0-9.]+)?\b/g;

export function cleanMarkdown(text: string): string {
  return text
    .replace(/\\\|/g, '|')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

export function stripMarkdownToText(text: string): string {
  return cleanMarkdown(
    text
      .replace(/^>\s?/gm, '')
      .replace(/^\s*[-*+]\s+/gm, '')
      .replace(/^\s*\d+\.\s+/gm, '')
      .replace(/^#{1,6}\s+/gm, ''),
  )
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokenize(text: string): string[] {
  const normalized = text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[–—‑]/g, '-')
    .replace(/[^A-Za-z0-9./:+-]+/g, ' ')
    .toLowerCase();
  const baseTokens = normalized
    .replace(/[./:+-]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
  const collapsedTokens = Array.from(
    normalized.matchAll(/[a-z0-9]+(?:\.[a-z0-9]+)+/g),
    (match) => match[0].replace(/[^a-z0-9]+/g, ''),
  );
  return unique([...baseTokens, ...collapsedTokens]);
}

export function unique<T>(items: Iterable<T>): T[] {
  return Array.from(new Set(items));
}

export function normalizeLabel(text: string): string {
  return cleanMarkdown(text)
    .replace(/[–—‑]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeForLookup(text: string): string {
  return normalizeLabel(text).toLowerCase();
}

export function slugify(text: string): string {
  return normalizeForLookup(text).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function extractIds(text: string): string[] {
  return unique(Array.from(text.matchAll(ID_PATTERN), (match) => match[0]));
}

export function extractBacktickedTerms(text: string): string[] {
  return unique(
    Array.from(text.matchAll(/`([^`]+)`/g), (match) => normalizeLabel(match[1] ?? '')).filter(
      Boolean,
    ),
  );
}

export function extractQuotedPhrases(text: string): string[] {
  return unique(
    Array.from(
      text.matchAll(/"([^"]+)"|'([^']+)'/g),
      (match) => normalizeLabel(match[1] ?? match[2] ?? ''),
    ).filter(Boolean),
  );
}

export function splitMarkdownRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  const cells: string[] = [];
  let current = '';
  let escaped = false;
  let inCodeSpan = false;

  for (const character of trimmed) {
    if (character === '`' && !escaped) {
      inCodeSpan = !inCodeSpan;
      current += character;
      escaped = false;
      continue;
    }
    if (character === '|' && !escaped && !inCodeSpan) {
      cells.push(current.trim());
      current = '';
      continue;
    }
    escaped = character === '\\' && !escaped;
    current += character;
  }

  cells.push(current.trim());
  return cells;
}

export function isMarkdownSeparatorRow(cells: string[]): boolean {
  return cells.every((cell) => /^:?-{3,}:?$/.test(cell) || cell.length === 0);
}

export function scoreOverlap(queryTokens: string[], searchableText: string): number {
  const searchableTokens = new Set(tokenize(searchableText));
  let score = 0;
  for (const token of queryTokens) {
    if (searchableTokens.has(token)) {
      score += token.length > 6 ? 3 : 2;
    }
  }
  return score;
}

export function sentenceCandidates(text: string): string[] {
  const normalized = cleanMarkdown(text);
  return normalized
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

export function listCandidates(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => /^[-*+]|\d+\./.test(line))
    .map((line) => stripMarkdownToText(line));
}
