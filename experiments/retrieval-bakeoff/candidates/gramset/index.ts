/**
 * gramset — EXACT character-trigram set-similarity retriever.
 *
 * Implements recipe (b) of research/fuzzy-hashing.md at its "sharper honesty"
 * conclusion: at 9k docs you do not need MinHash signatures or LSH — exact
 * Jaccard/containment over stored gram sets via a gram inverted index is
 * affordable, deterministic, and estimation-noise-free. This candidate is
 * deliberately the "no tokenizer smarts, no IDF" end of the design space:
 * no token spell-fix stage, no BM25, no stopwords, no stemming — just raw
 * pg_trgm-style gram overlap plus a minimal exact-equality tier.
 *
 * Pipeline (all parameters documented in README.md with provenance):
 * 1. Per doc, build a BOUNDED text: title + aliases + (pattern/preface only)
 *    the first 450 chars of `text` (whole-word trimmed). The digest warns
 *    that a ~100-gram query vs a 32 KB doc has Jaccard ≈ 0 — never gram
 *    full bodies. 450 (vs the digest's ~300 sketch) keeps the pattern's
 *    "Use This When" applicability paragraph inside the bound, which is
 *    what task-style questions actually describe; measured on dev it
 *    doubles paraphrase recall at no cost elsewhere.
 * 2. Extract a DEDUPED trigram set pg_trgm-style: explicit lowercase + NFKD
 *    fold, ASCII-alphanumeric words, each word padded with 2 leading + 1
 *    trailing space (free word-start emphasis), sliding 3-gram window.
 * 3. Inverted index gram -> doc postings. At query time count |Q∩D| per doc
 *    by scanning postings of the query's grams, then score with a WEIGHTED
 *    GEOMETRIC blend  score = C^(1-w) * J^w  (default w = 0.45), where
 *    containment C = |Q∩D| / |Q| (fixes the short-query-vs-doc asymmetry)
 *    and Jaccard J = |Q∩D| / |Q∪D| (size regularizer: among docs covering
 *    the query equally, prefers the one closest in size — the lexeme whose
 *    title IS the query beats a big doc that merely mentions it).
 *    The blend is multiplicative, not additive, on purpose: this corpus has
 *    "hub" lexemes whose alias lists concatenate 100+ pattern titles, so
 *    their gram sets cover much of the (only ~6k-gram) vocabulary and ANY
 *    English query attains high containment against them by chance. An
 *    additive blend leaves such docs an alpha*C floor that outscores real
 *    matches and leaks nonsense; the geometric blend lets their ~0 Jaccard
 *    drag them down proportionally. Monotone in both C and J either way.
 * 4. Exact tier on top (digest's layered-boost pattern): normalized WHOLE
 *    query equal to a doc id / title / alias wins outright at tiered scores
 *    far above the [0,1] gram range.
 * 5. Negative discipline: emit nothing below an absolute blended-score floor
 *    (0.30, pg_trgm's battle-tested `%` threshold) and require >= 2 shared
 *    grams, so nonsense queries return [].
 *
 * Determinism: no randomness, no Date, no locale-dependent string ops;
 * explicit (score desc, id asc) tie-break with code-unit id comparison.
 */
import type { BuildInfo, CorpusDoc, Retriever, ScoredHit } from '../../harness/types.js';

// ---------------------------------------------------------------------------
// Parameters (provenance in README.md)
// ---------------------------------------------------------------------------

export interface GramsetParams {
  /** Bound on how much of a pattern/preface `text` body is grammed (code units). */
  textPrefixChars: number;
  /** Exponent w in the geometric blend score = C^(1−w) · J^w. */
  jaccardWeight: number;
  /** Absolute floor on the blended score — below it a doc is not returned. */
  scoreFloor: number;
  /** Minimum |Q∩D| — a single shared trigram is noise, never evidence. */
  minSharedGrams: number;
}

/** Tuned defaults; provenance in README.md (category-level dev sweep only). */
export const DEFAULT_PARAMS: GramsetParams = {
  textPrefixChars: 450,
  jaccardWeight: 0.45,
  scoreFloor: 0.3,
  minSharedGrams: 2,
};

/** Safety bound on query length; queries are questions, not documents. */
const QUERY_MAX_CHARS = 512;
/** Layered exact tiers, far above the [0,1] gram-score range. */
const TIER_EXACT_ID = 1000;
const TIER_EXACT_TITLE = 900;
const TIER_EXACT_ALIAS = 800;

// ---------------------------------------------------------------------------
// Normalization + gram extraction (identical on both index and query side)
// ---------------------------------------------------------------------------

const COMBINING_MARKS = /[\u0300-\u036f]/g;

/** Explicit lowercase + NFKD + strip combining marks. Never locale-dependent. */
function fold(s: string): string {
  return s.toLowerCase().normalize('NFKD').replace(COMBINING_MARKS, '');
}

/** ASCII [0-9a-z] test on a char code; NaN (out of range) is safely false. */
function isWordCode(code: number): boolean {
  return (code >= 48 && code <= 57) || (code >= 97 && code <= 122);
}

/** ASCII [0-9A-Za-z] test on raw (pre-fold) char codes, for the bound trim. */
function isRawWordCode(code: number): boolean {
  return (
    (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122)
  );
}

/**
 * pg_trgm-style trigrams of one word: pad "  word " (2 front, 1 back), slide
 * a 3-wide window. "a" -> {"  a", " a "}; "ab" -> {"  a", " ab", "ab "}.
 */
function addWordGrams(word: string, out: Set<string>): void {
  const padded = `  ${word} `;
  for (let i = 0; i + 3 <= padded.length; i++) {
    out.add(padded.slice(i, i + 3));
  }
}

/** Fold `raw`, split into ASCII-alnum runs, add each word's trigrams to `out`. */
function addTextGrams(raw: string, out: Set<string>): void {
  const folded = fold(raw);
  let wordStart = -1;
  for (let i = 0; i <= folded.length; i++) {
    // charCodeAt(length) is NaN -> isWordCode false -> flushes the last word.
    const inWord = isWordCode(folded.charCodeAt(i));
    if (inWord && wordStart < 0) {
      wordStart = i;
    } else if (!inWord && wordStart >= 0) {
      addWordGrams(folded.slice(wordStart, i), out);
      wordStart = -1;
    }
  }
}

/**
 * First `maxChars` code units of `text`; if the cut lands mid-word
 * (ASCII-alnum on both sides of the boundary) the trailing fragment word is
 * dropped, so the bound never manufactures grams of a word that isn't there.
 * A pathological single over-long word keeps the raw slice (never empty).
 */
function textPrefix(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const slice = text.slice(0, maxChars);
  if (
    !isRawWordCode(text.charCodeAt(maxChars)) ||
    !isRawWordCode(slice.charCodeAt(slice.length - 1))
  ) {
    return slice;
  }
  let end = slice.length;
  while (end > 0 && isRawWordCode(slice.charCodeAt(end - 1))) end--;
  return end > 0 ? slice.slice(0, end) : slice;
}

/**
 * The exact BOUNDED text a doc is grammed over:
 *   title + aliases                             (lexeme, route)
 *   title + aliases + textPrefix(text, bound)   (pattern, preface)
 * Duplication of the title inside `text` is harmless: gram SETS dedupe.
 */
function boundedTextOf(doc: CorpusDoc, textPrefixChars: number): string {
  const parts: string[] = [doc.title];
  for (const alias of doc.aliases) parts.push(alias);
  if (doc.kind === 'pattern' || doc.kind === 'preface') {
    parts.push(textPrefix(doc.text, textPrefixChars));
  }
  return parts.join(' ');
}

/** Whole-string key for the exact tier: fold + collapse whitespace + trim. */
function exactKeyOf(raw: string): string {
  return fold(raw).replace(/\s+/g, ' ').trim();
}

function addExact(map: Map<string, number[]>, key: string, docIdx: number): void {
  if (key.length === 0) return;
  const existing = map.get(key);
  if (existing) {
    if (!existing.includes(docIdx)) existing.push(docIdx);
  } else {
    map.set(key, [docIdx]);
  }
}

// ---------------------------------------------------------------------------
// Retriever
// ---------------------------------------------------------------------------

export default class GramsetRetriever implements Retriever {
  readonly name = 'gramset';
  private readonly params: GramsetParams;

  private docIds: string[] = [];
  private docGramCounts = new Int32Array(0);
  /** gram -> ascending doc indices that contain it. */
  private postings = new Map<string, number[]>();
  private byExactId = new Map<string, number[]>();
  private byExactTitle = new Map<string, number[]>();
  private byExactAlias = new Map<string, number[]>();
  /** Scratch accumulator for |Q∩D| counts, reset via the touched list. */
  private acc = new Int32Array(0);

  /** Overrides exist for parameter sweeps; the registry always uses defaults. */
  constructor(overrides?: Partial<GramsetParams>) {
    this.params = { ...DEFAULT_PARAMS, ...overrides };
  }

  build(docs: CorpusDoc[]): BuildInfo {
    const start = performance.now();

    this.docIds = new Array<string>(docs.length);
    this.docGramCounts = new Int32Array(docs.length);
    this.postings = new Map();
    this.byExactId = new Map();
    this.byExactTitle = new Map();
    this.byExactAlias = new Map();
    this.acc = new Int32Array(docs.length);

    let totalPostings = 0;
    const gramSet = new Set<string>();
    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i]!;
      this.docIds[i] = doc.id;

      gramSet.clear();
      addTextGrams(boundedTextOf(doc, this.params.textPrefixChars), gramSet);
      this.docGramCounts[i] = gramSet.size;
      for (const gram of gramSet) {
        const list = this.postings.get(gram);
        if (list) list.push(i);
        else this.postings.set(gram, [i]);
      }
      totalPostings += gramSet.size;

      addExact(this.byExactId, exactKeyOf(doc.id), i);
      addExact(this.byExactTitle, exactKeyOf(doc.title), i);
      for (const alias of doc.aliases) {
        addExact(this.byExactAlias, exactKeyOf(alias), i);
      }
    }

    return {
      buildMs: performance.now() - start,
      docCount: docs.length,
      // Rough: postings entries (~8B each in a number[]) + per-gram Map/key
      // overhead + doc id strings/count array + exact-tier maps.
      approxIndexBytes:
        totalPostings * 8 +
        this.postings.size * 48 +
        docs.length * 72 +
        (this.byExactId.size + this.byExactTitle.size + this.byExactAlias.size) * 64,
      notes:
        `exact trigram-set index: ${this.postings.size} distinct grams, ` +
        `${totalPostings} postings; bound = title+aliases` +
        `+first ${this.params.textPrefixChars} chars of text (pattern/preface only, whole-word trimmed); ` +
        `score = containment^${1 - this.params.jaccardWeight} * Jaccard^${this.params.jaccardWeight}, ` +
        `floor ${this.params.scoreFloor}, min shared grams ${this.params.minSharedGrams}; ` +
        `exact tiers id/title/alias = ${TIER_EXACT_ID}/${TIER_EXACT_TITLE}/${TIER_EXACT_ALIAS}`,
    };
  }

  query(question: string, k: number): ScoredHit[] {
    // Contract: never throw on weird input — abstain instead.
    try {
      return this.rank(question, k);
    } catch {
      return [];
    }
  }

  private rank(question: string, k: number): ScoredHit[] {
    if (typeof question !== 'string') return [];
    const limit = Math.floor(k);
    if (!Number.isFinite(limit) || limit <= 0) return [];
    const raw = question.length > QUERY_MAX_CHARS ? question.slice(0, QUERY_MAX_CHARS) : question;

    const results: ScoredHit[] = [];
    const emitted = new Set<string>();

    // ---- Exact tier: whole query equals a doc id / title / alias ----
    const exactKey = exactKeyOf(raw);
    if (exactKey.length > 0) {
      const tiers: Array<[number, Map<string, number[]>]> = [
        [TIER_EXACT_ID, this.byExactId],
        [TIER_EXACT_TITLE, this.byExactTitle],
        [TIER_EXACT_ALIAS, this.byExactAlias],
      ];
      for (const [tierScore, map] of tiers) {
        const docIdxs = map.get(exactKey);
        if (!docIdxs) continue;
        const ids = docIdxs
          .map((idx) => this.docIds[idx]!)
          .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
        for (const id of ids) {
          if (emitted.has(id)) continue;
          emitted.add(id);
          results.push({ id, score: tierScore });
        }
      }
    }
    if (results.length >= limit) return results.slice(0, limit);

    // ---- Gram tier: exact containment/Jaccard over the inverted index ----
    const qGrams = new Set<string>();
    addTextGrams(raw, qGrams);
    const qSize = qGrams.size;
    if (qSize === 0) return results;

    const acc = this.acc;
    const touched: number[] = [];
    for (const gram of qGrams) {
      const docIdxs = this.postings.get(gram);
      if (!docIdxs) continue;
      for (const docIdx of docIdxs) {
        if (acc[docIdx] === 0) touched.push(docIdx);
        acc[docIdx]!++;
      }
    }

    const { jaccardWeight, scoreFloor, minSharedGrams } = this.params;
    const containmentWeight = 1 - jaccardWeight;
    const scored: ScoredHit[] = [];
    for (const docIdx of touched) {
      const shared = acc[docIdx]!;
      acc[docIdx] = 0; // reset scratch before any early-continue
      if (shared < minSharedGrams) continue;
      const dSize = this.docGramCounts[docIdx]!;
      const containment = shared / qSize;
      const jaccard = shared / (qSize + dSize - shared);
      const score = Math.pow(containment, containmentWeight) * Math.pow(jaccard, jaccardWeight);
      if (score < scoreFloor) continue;
      const id = this.docIds[docIdx]!;
      if (emitted.has(id)) continue;
      scored.push({ id, score });
    }
    scored.sort((a, b) => (b.score - a.score) || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

    for (const hit of scored) {
      if (results.length >= limit) break;
      results.push(hit);
    }
    return results;
  }
}
