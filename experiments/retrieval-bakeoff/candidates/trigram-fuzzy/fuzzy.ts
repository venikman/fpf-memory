/**
 * trigram-fuzzy · vocabulary trigram index + spell-fix ladder.
 *
 * Provenance (research/fuzzy-hashing.md §a "Spell-fix stage"):
 * - One trigram inverted index over the VOCABULARY (distinct normalized terms),
 *   pg_trgm-style extraction: lowercase, pad each word with 2 leading spaces +
 *   1 trailing space, dedupe the gram set (asymmetric padding = free edge
 *   emphasis; word beginnings count ~2x).
 * - ES AUTO fuzziness ladder: len ≤ 2 exact only; 3–5 → max 1 edit; ≥ 6 → max
 *   2 edits. The stage is skipped entirely when the term is in the vocabulary.
 * - Candidates share ≥ 1 trigram; Jaccard = c / (|Qg| + |Tg| − c); keep
 *   sim ≥ 0.3 (pg_trgm default threshold) for terms of length ≥ 5. For terms
 *   of length 3–4 the floor drops to 0.15 — DEVIATION from the flat 0.3,
 *   justified by the digest's own pitfall ("trigram sim on terms < 4 chars:
 *   one typo wipes most grams"): a single mid-word edit on a 3–4 char term
 *   yields J ≈ 0.14–0.33, so a hard 0.3 floor would veto corrections the AUTO
 *   ladder explicitly allows. The banded DL verify remains the true gate.
 * - Verify with banded Damerau–Levenshtein (OSA; transpositions ON — Damerau
 *   1964 / Norvig: ~80% of human errors are 1 ins/del/sub/transposition),
 *   band width = maxDist, early exit when the row minimum exceeds maxDist.
 *   First character must match (ES `prefix_length: 1`).
 * - Rank corrections: edit distance asc, then collection frequency desc, then
 *   lexicographic asc (determinism); cap at 8.
 * - BK-trees / Levenshtein automata / SymSpell deliberately skipped per the
 *   digest's verdict (trigram-filter + banded-DL touches ~dozens of candidates
 *   per term at this vocab size).
 */

export interface Correction {
  term: string;
  dist: number;
  /** Trigram Jaccard similarity of query term vs corrected vocabulary term. */
  sim: number;
}

export interface CorrectorParams {
  /** pg_trgm whole-string default (digest §a step 3 / §c pg_trgm). */
  simFloor: number;
  /** Relaxed floor for 3–4 char terms (digest pitfall: short-term gram wipeout). */
  simFloorShort: number;
  /** Verify at most this many trigram-prefiltered candidates with banded DL. */
  maxVerify: number;
  /** Cap on returned corrections (digest §a step 3: "cap at ~8"). */
  maxCorrections: number;
  /** Skip fuzzy indexing/matching of vocabulary terms longer than this. */
  maxFuzzyTermLen: number;
}

/** ES AUTO fuzziness ladder (digest §a step 2). */
export function maxEditsFor(len: number): number {
  if (len <= 2) return 0;
  if (len <= 5) return 1;
  return 2;
}

/** pg_trgm-style deduped padded trigrams: "  term " → 3-grams. */
export function trigramsOf(term: string): string[] {
  const padded = `  ${term} `;
  const seen = new Set<string>();
  for (let i = 0; i + 3 <= padded.length; i++) seen.add(padded.slice(i, i + 3));
  return [...seen];
}

const ALL_DIGITS = /^[0-9]+$/;

/**
 * Banded restricted Damerau–Levenshtein (optimal string alignment) with early
 * exit. Returns the distance if ≤ maxDist, else maxDist + 1.
 */
export function boundedDamerauLevenshtein(a: string, b: string, maxDist: number): number {
  const la = a.length;
  const lb = b.length;
  if (la === 0 || lb === 0) return Math.max(la, lb) <= maxDist ? Math.max(la, lb) : maxDist + 1;
  if (Math.abs(la - lb) > maxDist) return maxDist + 1;
  const BIG = maxDist + 1;
  let prev2: number[] = new Array<number>(lb + 1).fill(BIG);
  let prev: number[] = new Array<number>(lb + 1);
  let cur: number[] = new Array<number>(lb + 1);
  for (let j = 0; j <= lb; j++) prev[j] = j <= maxDist ? j : BIG;
  for (let i = 1; i <= la; i++) {
    const jStart = Math.max(1, i - maxDist);
    const jEnd = Math.min(lb, i + maxDist);
    cur[0] = i <= maxDist ? i : BIG;
    if (jStart > 1) cur[jStart - 1] = BIG;
    let rowMin = cur[jStart - 1]!;
    const ca = a.charCodeAt(i - 1);
    for (let j = jStart; j <= jEnd; j++) {
      const cb = b.charCodeAt(j - 1);
      const cost = ca === cb ? 0 : 1;
      let v = prev[j - 1]! + cost; // substitute / match
      const del = prev[j]! + 1;
      if (del < v) v = del;
      const ins = cur[j - 1]! + 1;
      if (ins < v) v = ins;
      if (
        i > 1 &&
        j > 1 &&
        ca === b.charCodeAt(j - 2) &&
        a.charCodeAt(i - 2) === cb
      ) {
        const tr = prev2[j - 2]! + 1;
        if (tr < v) v = tr;
      }
      cur[j] = v > BIG ? BIG : v;
      if (v < rowMin) rowMin = v;
    }
    if (jEnd < lb) cur[jEnd + 1] = BIG;
    if (rowMin > maxDist) return BIG; // early exit: band minimum exceeded
    const tmp = prev2;
    prev2 = prev;
    prev = cur;
    cur = tmp;
  }
  const result = prev[lb]!;
  return result > maxDist ? BIG : result;
}

/**
 * Trigram index over the vocabulary + correction search. Vocabulary order and
 * all tie-breaks are fixed at build time — fully deterministic.
 */
export class TrigramCorrector {
  private readonly terms: string[];
  private readonly collectionFreq: number[];
  private readonly gramPostings = new Map<string, number[]>();
  private readonly gramCount: Uint16Array;
  private readonly params: CorrectorParams;
  /** Number of gram-postings entries (for the index-size estimate). */
  readonly gramEntryCount: number;

  constructor(terms: string[], collectionFreq: number[], params: CorrectorParams) {
    this.terms = terms;
    this.collectionFreq = collectionFreq;
    this.params = params;
    this.gramCount = new Uint16Array(terms.length);
    let entries = 0;
    for (let idx = 0; idx < terms.length; idx++) {
      const term = terms[idx]!;
      if (term.length < 2 || term.length > params.maxFuzzyTermLen) continue;
      const grams = trigramsOf(term);
      this.gramCount[idx] = grams.length;
      for (const g of grams) {
        let list = this.gramPostings.get(g);
        if (list === undefined) {
          list = [];
          this.gramPostings.set(g, list);
        }
        list.push(idx);
        entries++;
      }
    }
    this.gramEntryCount = entries;
  }

  /**
   * Spell-fix ladder for one out-of-vocabulary query term. Returns ≤
   * maxCorrections corrections ranked (dist asc, collection freq desc, lex asc).
   */
  correct(term: string): Correction[] {
    const maxDist = maxEditsFor(term.length);
    if (maxDist === 0) return [];
    if (term.length > this.params.maxFuzzyTermLen) return [];
    if (ALL_DIGITS.test(term)) return []; // a typo'd number is unrecoverable
    const qGrams = trigramsOf(term);
    const qSize = qGrams.length;
    const first = term.charCodeAt(0);
    const shared = new Map<number, number>();
    for (const g of qGrams) {
      const list = this.gramPostings.get(g);
      if (list === undefined) continue;
      for (const idx of list) shared.set(idx, (shared.get(idx) ?? 0) + 1);
    }
    const floor = term.length >= 5 ? this.params.simFloor : this.params.simFloorShort;
    const prefiltered: Array<{ idx: number; sim: number }> = [];
    for (const [idx, c] of shared) {
      const cand = this.terms[idx]!;
      if (cand.charCodeAt(0) !== first) continue; // ES prefix_length: 1
      if (Math.abs(cand.length - term.length) > maxDist) continue;
      const sim = c / (qSize + this.gramCount[idx]! - c);
      if (sim < floor) continue;
      prefiltered.push({ idx, sim });
    }
    prefiltered.sort((x, y) => {
      if (y.sim !== x.sim) return y.sim - x.sim;
      const fx = this.collectionFreq[x.idx]!;
      const fy = this.collectionFreq[y.idx]!;
      if (fy !== fx) return fy - fx;
      const tx = this.terms[x.idx]!;
      const ty = this.terms[y.idx]!;
      return tx < ty ? -1 : tx > ty ? 1 : 0;
    });
    const verified: Array<Correction & { freq: number }> = [];
    const limit = Math.min(prefiltered.length, this.params.maxVerify);
    for (let i = 0; i < limit; i++) {
      const { idx, sim } = prefiltered[i]!;
      const cand = this.terms[idx]!;
      const dist = boundedDamerauLevenshtein(term, cand, maxDist);
      if (dist > maxDist) continue;
      verified.push({ term: cand, dist, sim, freq: this.collectionFreq[idx]! });
    }
    verified.sort((x, y) => {
      if (x.dist !== y.dist) return x.dist - y.dist;
      if (y.freq !== x.freq) return y.freq - x.freq;
      return x.term < y.term ? -1 : x.term > y.term ? 1 : 0;
    });
    return verified
      .slice(0, this.params.maxCorrections)
      .map(({ term: t, dist, sim }) => ({ term: t, dist, sim }));
  }
}
