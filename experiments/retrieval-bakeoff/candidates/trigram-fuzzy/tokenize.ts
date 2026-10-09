/**
 * trigram-fuzzy · normalization + tokenization.
 *
 * Provenance (research/fuzzy-hashing.md §c "Query normalization that pays off"):
 * - Explicit lowercase + NFKD, then strip combining marks U+0300–U+036F
 *   (diacritics folding). Plain `toLowerCase`, never `toLocaleLowerCase`.
 * - Lucene-WDGF-style word-delimiter splitting: case transitions
 *   (`BoundedContext` → `bounded`,`context`), letter↔digit transitions
 *   (`SD500` → `sd`,`500`), plus any punctuation as separators. The catenated
 *   original (`wi-fi` → `wifi`) is kept at INDEX time only; query side is
 *   split-only.
 * - Dotted/id-like tokens are kept whole (lowercased) AND dot-split. The
 *   digest's id shape `/^[a-z]+(\.\d+)+$/i` is broadened to the real corpus id
 *   shapes (`A.1.CSD`, `E.24.UK`, `A.19a`, `lex:bounded-context`,
 *   `route:boundary-unpacking`, `heading:…:1268`): letter-initial, segments of
 *   ASCII alnum/hyphen joined by `.` or `:` — a concrete corpus fact the
 *   digest's narrower regex would miss.
 * - No stemming (digest: stemming breaks prefix/fuzzy on spec vocabulary).
 * - Astral-safe: iterates by code point (digest pitfalls: `.split('')` vs
 *   astral chars).
 */

export interface QueryTokens {
  /** Deduped normalized terms in first-occurrence order (split-only). */
  terms: string[];
  /** Lowercased whole id-like tokens (`a.2.3`, `lex:foo`) for the exact-ID tier. */
  idTokens: string[];
}

const COMBINING_MARKS = /[\u0300-\u036f]/g;
const HAS_LETTER = /\p{L}/u;
const RE_DIGIT = /\p{N}/u;
const RE_LETTER = /\p{L}/u;
const RE_UPPER = /\p{Lu}/u;
const RE_WS = /\s/;

/** Truncation bound for pathological unbroken tokens (deterministic). Long
 * enough that every real corpus id (`heading:…` ≈ 80 chars) stays intact. */
const MAX_TERM_LEN = 160;

const enum Cls {
  Sep = 0,
  Lower = 1,
  Upper = 2,
  Digit = 3,
}

/** Per-code-point class memo so exotic chars cost one regex test ever. */
const clsMemo = new Map<number, Cls>();

function clsOf(cp: number): Cls {
  if (cp < 128) {
    if (cp >= 97 && cp <= 122) return Cls.Lower;
    if (cp >= 65 && cp <= 90) return Cls.Upper;
    if (cp >= 48 && cp <= 57) return Cls.Digit;
    return Cls.Sep;
  }
  let cls = clsMemo.get(cp);
  if (cls === undefined) {
    const ch = String.fromCodePoint(cp);
    if (RE_DIGIT.test(ch)) cls = Cls.Digit;
    else if (RE_LETTER.test(ch)) cls = RE_UPPER.test(ch) ? Cls.Upper : Cls.Lower;
    else cls = Cls.Sep;
    clsMemo.set(cp, cls);
  }
  return cls;
}

const wsMemo = new Map<number, boolean>();

/** Whitespace test on a UTF-16 code unit (all whitespace chars are BMP). */
function isWsCode(cu: number): boolean {
  if (cu === 32 || (cu >= 9 && cu <= 13)) return true;
  if (cu < 128) return false;
  let ws = wsMemo.get(cu);
  if (ws === undefined) {
    ws = RE_WS.test(String.fromCharCode(cu));
    wsMemo.set(cu, ws);
  }
  return ws;
}

/** Scratch for single-allocation string building (single-threaded). */
const strScratch: number[] = [];

/** Code-point lowercase. ASCII fast path; memoized 1:1 mapping otherwise
 * (multi-char lowercase expansions cannot survive the upstream NFKD +
 * combining-mark strip, so first-code-point is exact here). Explicit,
 * locale-free. */
const lowerMemo = new Map<number, number>();
function lowerCp(cp: number): number {
  if (cp < 128) return cp >= 65 && cp <= 90 ? cp | 32 : cp;
  let lc = lowerMemo.get(cp);
  if (lc === undefined) {
    lc = String.fromCodePoint(cp).toLowerCase().codePointAt(0)!;
    lowerMemo.set(cp, lc);
  }
  return lc;
}

/** Build the LOWERCASED token in one allocation (apply on a reused scratch
 * instead of a rope-growing += loop, and no separate toLowerCase pass) —
 * tokenization of the 15MB corpus stays allocation-light. */
function fromCpsLower(cps: number[], a: number, b: number): string {
  const len = Math.min(b - a, MAX_TERM_LEN);
  strScratch.length = len;
  for (let i = 0; i < len; i++) strScratch[i] = lowerCp(cps[a + i]!);
  return String.fromCodePoint.apply(String, strScratch);
}

/**
 * Id-like = ASCII-letter-initial, ASCII alnum/hyphen segments joined by `.`
 * or `:` (at least one `.`/`:`), no doubled separators. Matches every real
 * corpus id shape; rejects plain hyphenations (`wi-fi`) and numerics (`4.1`).
 */
function isIdLike(cps: number[], st: number, en: number): boolean {
  if (en - st < 3 || en - st > MAX_TERM_LEN) return false;
  const first = cps[st]!;
  const firstIsLetter = (first >= 65 && first <= 90) || (first >= 97 && first <= 122);
  if (!firstIsLetter) return false;
  let hasDotColon = false;
  let prevSep = false;
  for (let i = st; i < en; i++) {
    const cp = cps[i]!;
    const alnum =
      (cp >= 48 && cp <= 57) || (cp >= 65 && cp <= 90) || (cp >= 97 && cp <= 122);
    if (alnum) {
      prevSep = false;
    } else if (cp === 46 || cp === 58) {
      // '.' or ':'
      if (prevSep) return false;
      hasDotColon = true;
      prevSep = true;
    } else if (cp === 45) {
      // '-' allowed inside segments but does not satisfy the dot/colon requirement
      if (prevSep) return false;
      prevSep = true;
    } else {
      return false;
    }
  }
  return hasDotColon && !prevSep;
}

/**
 * Word-delimiter split of one alphanumeric run [from, en): case transitions
 * (`fooBar`, `FPFSpec` → `fpf`,`spec`) and letter↔digit transitions. Emits
 * lowercased parts.
 */
function wdgfSplit(cps: number[], cls: Cls[], from: number, en: number, out: string[]): void {
  let start = from;
  for (let i = from + 1; i < en; i++) {
    const p = cls[i - 1]!;
    const c = cls[i]!;
    let cutAt = -1;
    if (p === Cls.Lower && c === Cls.Upper) cutAt = i;
    else if (p === Cls.Upper && c === Cls.Lower && i - 1 > start && cls[i - 2] === Cls.Upper)
      cutAt = i - 1; // ABCdef → AB|Cdef
    else if ((p === Cls.Lower || p === Cls.Upper) && c === Cls.Digit) cutAt = i;
    else if (p === Cls.Digit && (c === Cls.Lower || c === Cls.Upper)) cutAt = i;
    if (cutAt > start) {
      out.push(fromCpsLower(cps, start, cutAt));
      start = cutAt;
    }
  }
  out.push(fromCpsLower(cps, start, en));
}

/** Reusable per-chunk scratch buffers (single-threaded; avoids ~2 array
 * allocations per chunk × millions of chunks at index build time). */
const scratchCps: number[] = [];
const scratchCls: Cls[] = [];
const scratchParts: string[] = [];

function tokenizeChunk(
  s: string,
  a: number,
  b: number,
  forIndex: boolean,
  out: string[],
  idTokens: string[] | null,
): void {
  // Decode the chunk into code points + classes (astral-safe).
  const cps = scratchCps;
  const cls = scratchCls;
  cps.length = 0;
  cls.length = 0;
  for (let i = a; i < b; ) {
    const cp = s.codePointAt(i)!;
    cps.push(cp);
    cls.push(clsOf(cp));
    i += cp > 0xffff ? 2 : 1;
  }
  // Trim surrounding separators ("(A.7)?" → "A.7").
  let st = 0;
  let en = cps.length;
  while (st < en && cls[st] === Cls.Sep) st++;
  while (en > st && cls[en - 1] === Cls.Sep) en--;
  if (st >= en) return;

  let emittedWhole = false;
  if (isIdLike(cps, st, en)) {
    const whole = fromCpsLower(cps, st, en);
    out.push(whole); // whole id token is an exact-tier term on both sides
    idTokens?.push(whole);
    emittedWhole = true;
  }

  // Alphanumeric runs → WDGF parts.
  const parts = scratchParts;
  parts.length = 0;
  let r = st;
  while (r < en) {
    while (r < en && cls[r] === Cls.Sep) r++;
    let e = r;
    while (e < en && cls[e] !== Cls.Sep) e++;
    if (e > r) wdgfSplit(cps, cls, r, e, parts);
    r = e;
  }
  for (const p of parts) out.push(p);

  // Catenated original at index time only (digest §c: `wi-fi` → `wifi`).
  if (forIndex && !emittedWhole && parts.length > 1) {
    const cat = parts.join('');
    if (cat.length >= 3 && cat.length <= MAX_TERM_LEN && HAS_LETTER.test(cat)) out.push(cat);
  }
}

/** Index-side tokenization: parts + catenated originals + whole id tokens. */
export function tokenizeIndex(raw: string, out: string[]): void {
  tokenizeField(raw, true, out, null);
}

/** Query-side tokenization: split-only, deduped, id-like tokens surfaced. */
export function tokenizeQuery(raw: string, maxTerms: number): QueryTokens {
  const all: string[] = [];
  const idTokens: string[] = [];
  tokenizeField(raw, false, all, idTokens);
  const seen = new Set<string>();
  const terms: string[] = [];
  for (const t of all) {
    if (!seen.has(t)) {
      seen.add(t);
      terms.push(t);
      if (terms.length >= maxTerms) break;
    }
  }
  const idSeen = new Set<string>();
  const ids: string[] = [];
  for (const t of idTokens) {
    if (!idSeen.has(t)) {
      idSeen.add(t);
      ids.push(t);
    }
  }
  return { terms, idTokens: ids };
}

function tokenizeField(
  raw: string,
  forIndex: boolean,
  out: string[],
  idTokens: string[] | null,
): void {
  if (!raw) return;
  const s = raw.normalize('NFKD').replace(COMBINING_MARKS, '');
  const n = s.length;
  let i = 0;
  while (i < n) {
    while (i < n && isWsCode(s.charCodeAt(i))) i++;
    let j = i;
    while (j < n && !isWsCode(s.charCodeAt(j))) j++;
    if (j > i) tokenizeChunk(s, i, j, forIndex, out, idTokens);
    i = j;
  }
}
