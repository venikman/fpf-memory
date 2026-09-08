/**
 * Shared tokenizer for the bm25f candidate — one pipeline for documents and
 * queries (research/lexical.md §a.1):
 *
 *   1. NFC-normalize, then spec `toLowerCase()` per token (never
 *      toLocaleLowerCase — harness rule).
 *   2. Dotted spec IDs are matched first and kept whole (`a.2.3`), emitting
 *      dotted prefixes (`a.2`) as extra tokens at the same position. IDs are
 *      never stemmed or split. The digest's regex required digit segments
 *      (`a.2.3`); this corpus also has alpha segments (97 of 311 pattern ids:
 *      `A.1.CSD`, `A.19.SOURCE`) and namespaced ids (`lex:0-1-mm`,
 *      `route:boundary-unpacking`, `heading:…:1268`), so the ID grammar is
 *      generalized to cover them — a corpus-measured extension, documented in
 *      the candidate README.
 *   3. Remaining text splits on non-alphanumerics plus camelCase/digit-letter
 *      boundaries, emitting BOTH the whole identifier and its parts
 *      (`BoundedContext` -> `boundedcontext` + `bounded`, `context`).
 *   4. Stopwords: Lucene's classic 33-word list (docs + queries) plus a
 *      query-side-only interrogative list.
 *   5. Porter2 stemming on word tokens only — never IDs, never
 *      whole-identifier tokens.
 *
 * Positions are "compressed": they advance only when a primary token is
 * emitted, so stopword removal cannot break adjacency ("quality of service"
 * -> quality@p, service@p+1). Synthetic tokens (whole identifiers, ID
 * prefixes) share the position of their primary counterpart and are excluded
 * from the primary sequence used for proximity and phrase checks.
 */

import { porter2 } from './porter2.js';

/** Lucene StandardAnalyzer's classic 33-word English stopword list (hardcoded, digest §a.1.4). */
export const LUCENE_STOPWORDS: ReadonlySet<string> = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if',
  'in', 'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such',
  'that', 'the', 'their', 'then', 'there', 'these', 'they', 'this',
  'to', 'was', 'will', 'with',
]);

/** Query-side-only additions (digest §a.1.4): interrogatives and copular filler. */
export const QUERY_ONLY_STOPWORDS: ReadonlySet<string> = new Set([
  'what', 'which', 'how', 'why', 'when', 'who', 'whose', 'does', 'do', 'did', 'mean', 'means',
]);

export interface EmittedToken {
  term: string;
  /** Compressed position (body proximity); synthetic tokens share their primary's position. */
  pos: number;
  /** Primary tokens form the linear sequence (parts, IDs); synthetic = whole-identifier extras & ID prefixes. */
  primary: boolean;
  /** Ordinal of the originating surface chunk (coordination groups). */
  chunk: number;
  /**
   * Pre-stem lowercase surface form (equals `term` for unstemmed tokens).
   * The typo bridge runs on raw forms: a misspelling can derail the stemmer
   * ("dcision" keeps its suffix while "decision" -> "decis"), so
   * deletion-distance-1 must be measured in raw space, then re-stemmed.
   */
  raw: string;
}

export interface TokenStream {
  tokens: EmittedToken[];
  /** Number of surface chunks that emitted at least one token. */
  chunkCount: number;
}

/**
 * Master chunk scanner. Alternatives in priority order at each position:
 *   1. namespaced id  — `lex:0-1-mm`, `heading:a-19…:29697` (colon segments end alnum)
 *   2. dotted id      — single letter + dotted alnum segments: `A.2.3`, `A.1.CSD`, `e.g`
 *   3. word run       — [A-Za-z0-9]+ (camel/digit split happens afterwards)
 */
const CHUNK_RE =
  /([A-Za-z][A-Za-z0-9]*(?::[A-Za-z0-9._-]*[A-Za-z0-9])+)|([A-Za-z](?:\.[A-Za-z0-9]+)+)(?![A-Za-z0-9])|([A-Za-z0-9]+)/g;

/** Split an identifier chunk at camelCase and letter/digit boundaries (`HTTPServer2` -> HTTP, Server, 2). */
export function splitIdentifier(chunk: string): string[] {
  const parts: string[] = [];
  let start = 0;
  for (let i = 1; i < chunk.length; i++) {
    const prev = chunk.charCodeAt(i - 1);
    const cur = chunk.charCodeAt(i);
    const prevLower = prev >= 97 && prev <= 122;
    const prevUpper = prev >= 65 && prev <= 90;
    const prevDigit = prev >= 48 && prev <= 57;
    const curLower = cur >= 97 && cur <= 122;
    const curUpper = cur >= 65 && cur <= 90;
    const curDigit = cur >= 48 && cur <= 57;
    let boundary = false;
    if (prevLower && curUpper) boundary = true;
    else if (prevDigit && (curLower || curUpper)) boundary = true;
    else if ((prevLower || prevUpper) && curDigit) boundary = true;
    else if (prevUpper && curUpper && i + 1 < chunk.length) {
      const next = chunk.charCodeAt(i + 1);
      if (next >= 97 && next <= 122) boundary = true;
    }
    if (boundary) {
      parts.push(chunk.slice(start, i));
      start = i;
    }
  }
  parts.push(chunk.slice(start));
  return parts;
}

const stemCache = new Map<string, string>();

/** Memoized Porter2 for external callers (typo-bridge re-stemming of repaired raw forms). */
export function stemWord(word: string): string {
  return stem(word);
}

function stem(word: string): string {
  let s = stemCache.get(word);
  if (s === undefined) {
    s = porter2(word);
    stemCache.set(word, s);
  }
  return s;
}

export function tokenize(text: string, forQuery: boolean): TokenStream {
  const tokens: EmittedToken[] = [];
  let pos = 0;
  let chunkCount = 0;
  if (!text) return { tokens, chunkCount };

  const normalized = text.normalize('NFC');
  const stopwords = forQuery ? QUERY_ONLY_STOPWORDS : null;
  CHUNK_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = CHUNK_RE.exec(normalized)) !== null) {
    const before = tokens.length;
    if (m[1] !== undefined) {
      // Namespaced id: whole (primary, unstemmed) + interior word parts (synthetic).
      const whole = m[1].toLowerCase();
      const chunk = chunkCount;
      tokens.push({ term: whole, pos, primary: true, chunk, raw: whole });
      for (const rawPart of m[1].split(/[^A-Za-z0-9]+/)) {
        if (rawPart.length === 0) continue;
        for (const sub of splitIdentifier(rawPart)) {
          const lc = sub.toLowerCase();
          if (LUCENE_STOPWORDS.has(lc) || stopwords?.has(lc)) continue;
          tokens.push({ term: stem(lc), pos, primary: false, chunk, raw: lc });
        }
      }
      pos += 1;
      chunkCount += 1;
    } else if (m[2] !== undefined) {
      // Dotted id: whole (primary) + dotted prefixes (synthetic), never stemmed/split further.
      const whole = m[2].toLowerCase();
      const chunk = chunkCount;
      tokens.push({ term: whole, pos, primary: true, chunk, raw: whole });
      const segments = whole.split('.');
      for (let i = 2; i < segments.length; i++) {
        const prefix = segments.slice(0, i).join('.');
        tokens.push({ term: prefix, pos, primary: false, chunk, raw: prefix });
      }
      pos += 1;
      chunkCount += 1;
    } else {
      // Word run: camel/digit split; whole + parts when the split is non-trivial.
      const raw = m[3]!;
      const parts = splitIdentifier(raw);
      const chunk = chunkCount;
      if (parts.length === 1) {
        const lc = raw.toLowerCase();
        if (LUCENE_STOPWORDS.has(lc) || stopwords?.has(lc)) continue; // no emission, no position slot
        tokens.push({ term: stem(lc), pos, primary: true, chunk, raw: lc });
        pos += 1;
      } else {
        const whole = raw.toLowerCase();
        const startPos = pos;
        let emitted = 0;
        for (const part of parts) {
          const lc = part.toLowerCase();
          if (LUCENE_STOPWORDS.has(lc) || stopwords?.has(lc)) continue;
          tokens.push({ term: stem(lc), pos: startPos + emitted, primary: true, chunk, raw: lc });
          emitted += 1;
        }
        // Whole-identifier token rides along at the first part's position.
        tokens.push({ term: whole, pos: startPos, primary: false, chunk, raw: whole });
        pos += Math.max(emitted, 1);
      }
    }
    if (tokens.length > before) chunkCount = tokens[tokens.length - 1]!.chunk + 1;
  }
  return { tokens, chunkCount };
}

/**
 * Canonical string form for exact-equality bonuses (unstemmed, digest §a.4.2):
 * NFC + lowercase, non-alphanumerics (except dots, which distinguish spec IDs)
 * collapse to single spaces.
 */
export function canon(text: string): string {
  if (!text) return '';
  return text
    .normalize('NFC')
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, ' ')
    .replace(/(^| )\.+(?=[a-z0-9])|\.+( |$)/g, '$1$2') // strip leading/trailing dots per word
    .trim();
}
