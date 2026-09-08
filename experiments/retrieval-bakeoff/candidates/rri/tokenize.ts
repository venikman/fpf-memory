/**
 * Deterministic tokenization for the `rri` candidate.
 *
 * The recipe mirrors the shared normalization contract in
 * `research/lexical.md` §(a).1 so the semantic candidate sees the same token
 * stream a lexical candidate would:
 *   1. NFC + `toLowerCase()` (never `toLocaleLowerCase` — harness rule).
 *   2. Spec-ID extraction first (`a.2.3`-style, whole token + dotted
 *      prefixes), never stemmed.
 *   3. Alphanumeric-run splitting; runs mixing digits and letters emit the
 *      whole run plus digit/letter sub-tokens (identifier-aware tokenization).
 *   4. Lucene's 33-word English stopword list; query side additionally drops
 *      the interrogative list from lexical.md.
 *   5. Minimal S-stemmer (Harman 1991) on pure-alpha tokens — the explicit
 *      low-risk fallback lexical.md §(a).1.5 endorses instead of Porter2.
 *      RRI's reflective pass supplies the remaining morphological smoothing.
 *
 * Everything here is a pure function of its inputs: no Date, no randomness,
 * no locale-dependent string ops.
 */

/** Lucene EnglishAnalyzer default stopword list (33 words). */
const BASE_STOPWORDS: ReadonlySet<string> = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in',
  'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the',
  'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was', 'will',
  'with',
]);

/**
 * Query-side-only additions: the interrogative list from research/lexical.md
 * §(a).1.4, plus English pronouns/auxiliaries/politeness words. The latter are
 * needed because they are RARE in spec prose but common in questions, so they
 * would otherwise get high idf and dominate the query vector (measured on
 * dev: "me" idf 6.0, "my" idf 7.9 vs content words at 2-4). Applied to
 * queries only; documents keep every non-Lucene-stopword token.
 */
const QUERY_STOPWORDS: ReadonlySet<string> = new Set([
  ...BASE_STOPWORDS,
  'what', 'which', 'how', 'why', 'when', 'who', 'whose', 'does', 'do', 'did',
  'mean', 'means',
  'me', 'my', 'mine', 'your', 'yours', 'our', 'ours', 'we', 'you', 'he',
  'she', 'him', 'his', 'her', 'hers', 'them', 'us', 'am', 'been', 'being',
  'have', 'has', 'had', 'would', 'could', 'should', 'can', 'may', 'might',
  'must', 'shall', 'please', 'tell', 'show',
]);

/** Spec-ID-shaped spans: `a.1.stm`, `e.18.1`, `lex:0-1-mm`, `heading:...`. */
const ID_RE = /[a-z][a-z0-9]*(?:[.:][a-z0-9-]+)+/g;
const RUN_RE = /[a-z0-9]+/g;
const DIGIT_LETTER_BOUNDARY = /(?<=[0-9])(?=[a-z])|(?<=[a-z])(?=[0-9])/g;

/**
 * Normalized string equality key for the exact tier: lowercase NFC with every
 * non-alphanumeric run collapsed to a single space.
 */
export function normalizeEq(raw: string): string {
  return raw
    .normalize('NFC')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/**
 * Harman's minimal S-stemmer (plural conflation only). Applied to pure-alpha
 * tokens; IDs and digit-bearing tokens are never stemmed.
 */
export function sStem(word: string): string {
  const n = word.length;
  if (n > 4 && word.endsWith('ies') && !word.endsWith('eies') && !word.endsWith('aies')) {
    return `${word.slice(0, -3)}y`;
  }
  if (
    n > 3 &&
    word.endsWith('es') &&
    !word.endsWith('aes') &&
    !word.endsWith('ees') &&
    !word.endsWith('oes')
  ) {
    return word.slice(0, -1);
  }
  if (n > 3 && word.endsWith('s') && !word.endsWith('us') && !word.endsWith('ss')) {
    return word.slice(0, -1);
  }
  return word;
}

/**
 * Tokenize a document field or a query into the shared term space.
 * Repeats are preserved (callers count tf).
 */
export function tokenize(raw: string, forQuery = false): string[] {
  const stop = forQuery ? QUERY_STOPWORDS : BASE_STOPWORDS;
  const s = raw.normalize('NFC').toLowerCase();
  const out: string[] = [];

  // 1) spec-ID tokens: whole ID + dotted prefixes (a.1.stm -> a.1.stm, a.1).
  for (const m of s.matchAll(ID_RE)) {
    const id = m[0];
    out.push(id);
    const parts = id.split('.');
    for (let i = 2; i < parts.length; i++) {
      out.push(parts.slice(0, i).join('.'));
    }
  }

  // 2) plain alphanumeric runs (IDs above also shed their word parts here,
  //    which is intentional: self-describing IDs contribute their words).
  for (const m of s.matchAll(RUN_RE)) {
    const run = m[0];
    if (run.length < 2 || stop.has(run)) continue;
    if (/[0-9]/.test(run)) {
      out.push(run);
      for (const seg of run.split(DIGIT_LETTER_BOUNDARY)) {
        if (seg.length >= 2 && seg !== run) out.push(seg);
      }
    } else {
      out.push(sStem(run));
    }
  }
  return out;
}

/**
 * Extract candidate corpus-ID mentions from a query, in appearance order.
 * Chunks are whitespace/punctuation-delimited spans with surrounding `.`/`:`/
 * `-` trimmed; the caller checks them against the real corpus-ID map.
 */
export function idCandidateSpans(raw: string): string[] {
  const s = raw.normalize('NFC').toLowerCase();
  const spans: string[] = [];
  for (const chunk of s.split(/[\s,;!?()[\]{}<>"'`|]+/)) {
    const trimmed = chunk.replace(/^[.:\-–—]+|[.:\-–—]+$/g, '');
    if (trimmed.length >= 3 && /[.:]/.test(trimmed)) spans.push(trimmed);
  }
  return spans;
}
