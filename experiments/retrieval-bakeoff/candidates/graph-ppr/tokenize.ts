/**
 * Deterministic tokenizer shared by the indexing and query paths of the
 * graph-ppr candidate.
 *
 * Rules (ASCII-only, locale-independent):
 * - A raw run is a maximal sequence of [A-Za-z0-9] plus the "glue" characters
 *   `.` `-` `_` `:` (so `A.2.3`, `route:boundary-unpacking`, `builds_on` stay
 *   together). Any other character (whitespace, punctuation, non-ASCII such as
 *   U+2011 non-breaking hyphen) is a separator.
 * - Glue is trimmed from both ends of a run (`end.` -> `end`).
 * - Each run emits its sub-parts: split at glue characters, at lower->UPPER
 *   camelCase boundaries, and at letter<->digit boundaries
 *   (`SearchSpaceRef` -> search, space, ref; `A.2.3` -> a, 2, 3;
 *   `P2W` -> p, 2, w).
 * - When a run has more than one part, the whole run (lowercased, glue kept)
 *   is ALSO emitted as a compound token (`a.2.3`, `searchspaceref` — note the
 *   compound keeps glue exactly as written, lowercased). Compound tokens are
 *   the high-idf handles for dotted FPF IDs and camelCase identifiers.
 * - Everything is lowercased via ASCII arithmetic (no toLowerCase, so no
 *   locale surprises whatsoever).
 * - No stemming, no stopword list (BM25 idf handles frequent terms).
 */

const MAX_COMPOUND_LEN = 80;
const MAX_PART_LEN = 40;

const enum CharClass {
  Sep = 0,
  Lower = 1,
  Upper = 2,
  Digit = 3,
  Glue = 4,
}

function classify(code: number): CharClass {
  if (code >= 97 && code <= 122) return CharClass.Lower; // a-z
  if (code >= 65 && code <= 90) return CharClass.Upper; // A-Z
  if (code >= 48 && code <= 57) return CharClass.Digit; // 0-9
  // '.' 46, '-' 45, '_' 95, ':' 58
  if (code === 46 || code === 45 || code === 95 || code === 58) return CharClass.Glue;
  return CharClass.Sep;
}

/** Lowercase an ASCII slice without locale-dependent string ops. */
function asciiLower(s: string): string {
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    out += c >= 65 && c <= 90 ? String.fromCharCode(c + 32) : s[i]!;
  }
  return out;
}

/** Tokenize `raw` into `out` (appended); returns `out`. */
export function tokenize(raw: string, out: string[] = []): string[] {
  const n = raw.length;
  let runStart = -1;
  for (let i = 0; i <= n; i++) {
    const cls = i < n ? classify(raw.charCodeAt(i)) : CharClass.Sep;
    if (cls !== CharClass.Sep) {
      if (runStart < 0) runStart = i;
      continue;
    }
    if (runStart >= 0) {
      emitRun(raw, runStart, i, out);
      runStart = -1;
    }
  }
  return out;
}

function emitRun(raw: string, start: number, end: number, out: string[]): void {
  // Trim glue from both ends.
  while (start < end && classify(raw.charCodeAt(start)) === CharClass.Glue) start++;
  while (end > start && classify(raw.charCodeAt(end - 1)) === CharClass.Glue) end--;
  if (start >= end) return;

  // Split into parts at glue, camelCase (lower->Upper), and letter<->digit
  // boundaries; count parts to decide whether to emit the compound.
  let parts = 0;
  let partStart = start;
  let prev = classify(raw.charCodeAt(start));
  for (let i = start + 1; i <= end; i++) {
    const cls = i < end ? classify(raw.charCodeAt(i)) : CharClass.Sep;
    let boundary = false;
    if (i === end || cls === CharClass.Glue) boundary = true;
    else if (prev === CharClass.Glue) {
      // new part begins after glue; previous part already flushed
      partStart = i;
      prev = cls;
      continue;
    } else if (prev === CharClass.Lower && cls === CharClass.Upper) boundary = true;
    else if (
      (prev === CharClass.Digit && (cls === CharClass.Lower || cls === CharClass.Upper)) ||
      ((prev === CharClass.Lower || prev === CharClass.Upper) && cls === CharClass.Digit)
    ) {
      boundary = true;
    }
    if (boundary) {
      if (partStart < i && prev !== CharClass.Glue) {
        const len = i - partStart;
        if (len <= MAX_PART_LEN) out.push(asciiLower(raw.slice(partStart, i)));
        parts++;
      }
      partStart = i; // camel/digit boundaries: current char starts the next part
      if (i < end && cls === CharClass.Glue) prev = CharClass.Glue;
      else prev = cls;
      continue;
    }
    prev = cls;
  }

  if (parts > 1 && end - start <= MAX_COMPOUND_LEN) {
    out.push(asciiLower(raw.slice(start, end)));
  }
}
