/**
 * trigram-fuzzy — typo-tolerant retriever: token-level trigram spell-correction
 * feeding a fielded lite-BM25 (BM25F-lite) ranker.
 *
 * Architecture per research/fuzzy-hashing.md §a ("token-level trigram
 * spell-fix feeding a BM25F-lite lexical ranker — do NOT fuzzy-score whole
 * documents"):
 *
 *   query ─ normalize (§c) ─ per-term: exact | spell-fix ladder (fuzzy.ts)
 *         ─ + prefix expansions ─ BM25F-lite over {title, alias, text}
 *         ─ × matched-distinct-term count ─ exact-ID tier on top
 *         ─ anchor gate + absolute score floor (negative discipline)
 *
 * Scoring constants are MiniSearch's exact source-verified values (§c):
 * BM25+ {k: 1.2, b: 0.7, d: 0.5}; match-type weights fuzzy 0.45 / prefix
 * 0.375 with decays fuzzyW·len/(len+dist) and prefixW·len/(len+0.3·lenDiff)
 * (len = matched vocabulary term's length, as in MiniSearch); final doc score
 * multiplied by the count of distinct query terms matched (MiniSearch's
 * "quality" coordination factor). Field boosts title 4 / alias 3 / text 1
 * (§a), with the exact-ID match handled as a separate additive tier so
 * accumulation can never cross it (§c syslog-ng layered boosts; mirrors the
 * runtime's exact-ID +100).
 *
 * Per-field lengths/averages keep the 324 KB pattern bodies from dominating
 * (§d pitfall: title duplicated inside `text` double-counts — fields are
 * scored separately, never concatenated), and per-(term,doc) tf is capped so
 * body postings stay bounded.
 *
 * Determinism: no randomness, no Date, explicit toLowerCase, stable
 * (score desc, id asc) tie-break, fixed iteration orders.
 */
import type { BuildInfo, CorpusDoc, Retriever, ScoredHit } from '../../harness/types.js';
import { TrigramCorrector } from './fuzzy.js';
import { tokenizeIndex, tokenizeQuery } from './tokenize.js';

export const PARAMS = {
  /** BM25+ constants — MiniSearch defaults (digest §c). */
  k1: 1.2,
  b: 0.7,
  d: 0.5,
  /** Field boosts title/alias/text (digest §a "Doc scoring"). */
  fieldBoosts: [4, 3, 1] as const,
  /** Exact-ID tier: additive bonus no lexical accumulation can cross (§c syslog-ng). */
  idTierBonus: 1e9,
  /** Match-type weights + decay shapes (digest §c MiniSearch). */
  fuzzyWeight: 0.45,
  prefixWeight: 0.375,
  prefixLenDiffFactor: 0.3,
  /** Prefix expansion only for query terms of at least this length. */
  prefixMinTermLen: 4,
  /** ES `max_expansions` analogue for prefix, ranked (collection freq desc, lex asc). */
  maxPrefixExpansions: 20,
  /** Hard bound on the sorted-vocab range scanned per prefix lookup. */
  maxPrefixScan: 500,
  /** Spell-fix ladder (digest §a; see fuzzy.ts for provenance). */
  maxCorrections: 8,
  /**
   * Trigram PREFILTER floors (the banded-DL verify remains the true gate).
   * DEVIATION from the digest's flat 0.3 (pg_trgm's default): measured on
   * this corpus, a single mid-word transposition on a 6-char word ("Visoin")
   * gives J = 3/11 ≈ 0.27, so 0.3 vetoes d=1 corrections the verifier would
   * accept — pg_trgm uses 0.3 as its MATCH criterion with no verifier behind
   * it; as a prefilter in front of banded DL it is redundantly strict.
   * Corrections still only count as negative-gate ANCHORS at sim ≥ 0.3
   * (anchorMinCorrectionSim, per the digest's rule).
   */
  trigramSimFloor: 0.2,
  trigramSimFloorShort: 0.15,
  maxDLVerifications: 200,
  maxFuzzyTermLen: 40,
  /** Bounded postings: per-(term,doc,field) tf cap (§d "cap per-doc term contribution"). */
  tfCap: 255,
  /**
   * Corpus-derived auto-stop set: terms appearing in more than this fraction
   * of ALL docs are treated as glue ("a", "the", "use", "pattern", "fpf", …)
   * and excluded from scoring and the coordination multiplier whenever the
   * query has at least one content term. DEVIATION from the digest (which is
   * silent on stopwords): measured on this corpus, raw df cannot separate
   * glue from concepts for the anchor gate ("is" 8.8% ≈ "context" 8.5%
   * because 8.4k tiny lexeme docs dilute df), and question-style queries
   * ("What is …") let glue terms inflate the matched-term multiplier, burying
   * title hits. The set is derived deterministically from corpus df — no
   * hardcoded word list.
   */
  stopDfRatio: 0.1,
  /** Negative discipline (digest §a last bullet): anchor gate + absolute floor. */
  anchorMinCorrectionSim: 0.3,
  anchorMinCorrectionTermLen: 4,
  scoreFloor: 2.0,
  /** Stricter floor when the only anchors are fuzzy corrections. */
  fuzzyOnlyScoreFloor: 40,
  /**
   * Floor for a top doc whose match is BODY-ONLY (no content term touched its
   * title or alias field). Calibrated on dev CATEGORY score distributions:
   * body-matched answers for task/paraphrase queries score ≥ ~780 while
   * off-domain negatives that happen to co-locate everyday words in some
   * pattern body top out ≈ 350; title/alias-matched positives (definition,
   * alias, typo → lexeme titles) live at 120–370 and are exempt via the
   * ta-count rule. 400 clears every dev negative while sparing alias-category
   * tops in the 400–600 band (dev category sweep).
   */
  bodyOnlyFloor: 400,
  /**
   * When the query holds ≥ 2 content terms (exact-in-vocab or corrected), the
   * top doc must match at least this many of them or the result set is
   * discarded (negative discipline: off-domain word salads match scattered
   * docs one incidental term each; real queries co-locate content terms).
   */
  minTopContentMatched: 2,
  /**
   * Per-kind doc boost (MiniSearch final score = termWeight · fieldBoost ·
   * docBoost · bm25, digest §c). Lexeme stubs mirror pattern titles in their
   * alias/text fields and, being tiny, win BM25 length normalization; a mild
   * demotion keeps the substantive node above its own alias wall. With the
   * contextual pair field carrying alias/definition lookups, a 5% nudge
   * orders a pattern above its identical-titled mirror lexeme without
   * demoting lexemes below anything else. Tuned on dev CATEGORY metrics only.
   */
  lexemeBoost: 0.95,
  /**
   * Contextual term-pair field over title/alias (FlexSearch "contextual
   * index", digest §c steal-this #3: postings keyed by term pairs give
   * phrase-ish precision without positions). Adjacent content-term pairs of
   * the query (using exact terms or their top corrections) that appear as
   * adjacent pairs in a doc's title or alias act as a strong phrase signal —
   * this is what lets a quoted (possibly typo'd) title/alias beat long
   * pattern bodies that merely mention all the words. Boost tuned on dev
   * CATEGORY metrics.
   */
  pairBoost: 18,
  /** Corrections per side considered when forming query pairs. */
  maxPairCorrections: 2,
  /**
   * Cap on the matched-distinct-term multiplier. MiniSearch's raw count lets
   * chatty framing words ("explain", "say", "about", "spec") quadruple long
   * pattern-body scores and bury short title/alias answers; capping keeps the
   * coordination reward while bounding that amplification. Tuned on dev
   * CATEGORY metrics.
   */
  maxMatchedMultiplier: 32,
  /** Defensive cap on distinct query terms processed. */
  maxQueryTerms: 48,
} as const;

const FIELD_COUNT = 3; // 0 = title, 1 = alias, 2 = text

interface Expansion {
  /** Vocabulary term index. */
  ti: number;
  weight: number;
}

/**
 * Postings compacted into one shared Int32Array per field: numeric key
 * (termIdx, or pair key liV+ri) → slot → [starts[slot], starts[slot+1]) run of
 * [docIdx, tf] pairs in `data`. Avoids ~1M small JS arrays + string keys
 * (memory sanity), preserving iteration order and scores exactly.
 */
interface PackedPostings {
  slots: Map<number, number>;
  starts: Int32Array;
  data: Int32Array;
}

function packPostings(tmp: Map<number, number[]>): PackedPostings {
  let total = 0;
  for (const arr of tmp.values()) total += arr.length;
  const slots = new Map<number, number>();
  const starts = new Int32Array(tmp.size + 1);
  const data = new Int32Array(total);
  let slot = 0;
  let off = 0;
  for (const [key, arr] of tmp) {
    slots.set(key, slot);
    starts[slot] = off;
    for (let i = 0; i < arr.length; i++) data[off++] = arr[i]!;
    slot++;
  }
  starts[slot] = off;
  return { slots, starts, data };
}

export default class TrigramFuzzyRetriever implements Retriever {
  readonly name = 'trigram-fuzzy';

  private built = false;
  private docCount = 0;
  private docIds: string[] = [];
  /** normalized (lowercased) doc id → doc index — the exact-ID tier. */
  private idMap = new Map<string, number>();
  /** Per field: packed postings keyed by termIdx. */
  private postings: PackedPostings[] = [];
  private fieldLens: Float64Array[] = [];
  private avgFieldLen: number[] = [0, 0, 0];
  /** Vocabulary. */
  private termIndex = new Map<string, number>();
  private terms: string[] = [];
  private collectionFreq: number[] = [];
  /** Distinct-doc frequency across all fields (anchor gate). */
  private docDf: number[] = [];
  private sortedTerms: string[] = [];
  /** Corpus-derived glue terms (df ratio > stopDfRatio). */
  private stopSet = new Set<string>();
  /** Contextual pair field over title+alias, keyed by liV + ri. */
  private pairPostings: PackedPostings = packPostings(new Map());
  private pairLens = new Float64Array(0);
  private avgPairLen = 0;
  /** Per-doc boost (kind prior; MiniSearch docBoost slot). */
  private docBoost = new Float64Array(0);
  private corrector: TrigramCorrector | null = null;
  /** Reusable per-query accumulators (reset after every query). */
  private scoreBuf = new Float64Array(0);
  private maskBuf = new Int32Array(0);
  /** Bit per query term that matched the doc's title/alias field this query. */
  private taMaskBuf = new Int32Array(0);
  /** 1 when an adjacent content-term pair hit the doc's title/alias. */
  private pairHitBuf = new Uint8Array(0);

  build(docs: CorpusDoc[]): BuildInfo {
    const start = performance.now();
    const n = docs.length;
    this.docCount = n;
    this.docIds = new Array<string>(n);
    this.idMap = new Map();
    const postingsTmp: Array<Map<number, number[]>> = [new Map(), new Map(), new Map()];
    this.fieldLens = [new Float64Array(n), new Float64Array(n), new Float64Array(n)];
    this.termIndex = new Map();
    this.terms = [];
    this.collectionFreq = [];
    this.docDf = [];

    const totalLen = [0, 0, 0];
    const tokenBuf: string[] = [];
    const tally = new Map<string, number>();
    let postingEntries = 0;
    this.docBoost = new Float64Array(n);

    for (let di = 0; di < n; di++) {
      const doc = docs[di]!;
      this.docIds[di] = doc.id;
      this.docBoost[di] = doc.kind === 'lexeme' ? PARAMS.lexemeBoost : 1;
      this.idMap.set(doc.id.toLowerCase(), di);
      const fieldTexts = [doc.title ?? '', (doc.aliases ?? []).join('\n'), doc.text ?? ''];
      const docTerms = new Set<number>();
      for (let f = 0; f < FIELD_COUNT; f++) {
        tokenBuf.length = 0;
        tokenizeIndex(fieldTexts[f]!, tokenBuf);
        this.fieldLens[f]![di] = tokenBuf.length;
        totalLen[f]! += tokenBuf.length;
        if (tokenBuf.length === 0) continue;
        tally.clear();
        for (const t of tokenBuf) tally.set(t, (tally.get(t) ?? 0) + 1);
        const fieldPostings = postingsTmp[f]!;
        for (const [t, tf] of tally) {
          let ti = this.termIndex.get(t);
          if (ti === undefined) {
            ti = this.terms.length;
            this.termIndex.set(t, ti);
            this.terms.push(t);
            this.collectionFreq.push(0);
            this.docDf.push(0);
          }
          this.collectionFreq[ti]! += tf;
          let plist = fieldPostings.get(ti);
          if (plist === undefined) {
            plist = [];
            fieldPostings.set(ti, plist);
          }
          plist.push(di, Math.min(tf, PARAMS.tfCap));
          postingEntries++;
          docTerms.add(ti);
        }
      }
      for (const ti of docTerms) this.docDf[ti]! += 1;
    }
    for (let f = 0; f < FIELD_COUNT; f++) {
      this.avgFieldLen[f] = n > 0 ? totalLen[f]! / n : 0;
    }

    // Sorted vocabulary for prefix range scans (code-unit order — locale-free).
    this.sortedTerms = [...this.terms].sort();

    // Corpus-derived auto-stop set (see PARAMS.stopDfRatio).
    this.stopSet = new Set();
    const stopDfFloor = PARAMS.stopDfRatio * n;
    for (let ti = 0; ti < this.terms.length; ti++) {
      if (this.docDf[ti]! > stopDfFloor) this.stopSet.add(this.terms[ti]!);
    }

    // Contextual pair field over title + each alias instance (needs stopSet,
    // hence a second, cheap pass over the short fields only). Pair keys are
    // numeric: leftTermIdx · vocabSize + rightTermIdx (< 2^53 at this vocab).
    const vocabSize = this.terms.length;
    const pairTmp = new Map<number, number[]>();
    this.pairLens = new Float64Array(n);
    let totalPairs = 0;
    let pairEntries = 0;
    const pairTally = new Map<number, number>();
    for (let di = 0; di < n; di++) {
      const doc = docs[di]!;
      pairTally.clear();
      let pairCount = 0;
      const sources = [doc.title ?? '', ...(doc.aliases ?? [])];
      for (const src of sources) {
        tokenBuf.length = 0;
        tokenizeIndex(src, tokenBuf);
        let prev = -1;
        for (const t of tokenBuf) {
          if (this.isGlue(t)) continue; // consistent with query-side pairing
          const ti = this.termIndex.get(t);
          if (ti === undefined) continue; // defensive; same tokenizer indexed it
          if (prev >= 0) {
            const key = prev * vocabSize + ti;
            pairTally.set(key, (pairTally.get(key) ?? 0) + 1);
            pairCount++;
          }
          prev = ti;
        }
      }
      this.pairLens[di] = pairCount;
      totalPairs += pairCount;
      for (const [key, tf] of pairTally) {
        let plist = pairTmp.get(key);
        if (plist === undefined) {
          plist = [];
          pairTmp.set(key, plist);
        }
        plist.push(di, Math.min(tf, PARAMS.tfCap));
        pairEntries++;
      }
    }
    this.avgPairLen = n > 0 ? totalPairs / n : 0;

    // Compact everything into shared typed arrays (memory sanity).
    this.postings = [
      packPostings(postingsTmp[0]!),
      packPostings(postingsTmp[1]!),
      packPostings(postingsTmp[2]!),
    ];
    this.pairPostings = packPostings(pairTmp);

    // Trigram index over the vocabulary (digest §a step 1).
    this.corrector = new TrigramCorrector(this.terms, this.collectionFreq, {
      simFloor: PARAMS.trigramSimFloor,
      simFloorShort: PARAMS.trigramSimFloorShort,
      maxVerify: PARAMS.maxDLVerifications,
      maxCorrections: PARAMS.maxCorrections,
      maxFuzzyTermLen: PARAMS.maxFuzzyTermLen,
    });

    this.scoreBuf = new Float64Array(n);
    this.maskBuf = new Int32Array(n);
    this.taMaskBuf = new Int32Array(n);
    this.pairHitBuf = new Uint8Array(n);
    this.built = true;

    let vocabChars = 0;
    for (const t of this.terms) vocabChars += t.length;
    const approxIndexBytes = Math.round(
      postingEntries * 2 * 4 + // packed posting pairs (Int32)
        pairEntries * 2 * 4 + // packed pair postings (Int32)
        this.corrector.gramEntryCount * 8 + // trigram postings
        vocabChars * 2 * 3 + // term strings (vocab + termIndex keys + sorted copy)
        this.terms.length * 48 + // per-term arrays/overheads
        n * FIELD_COUNT * 8 + // field length arrays
        n * 12, // score/mask buffers
    );

    return {
      buildMs: performance.now() - start,
      docCount: n,
      approxIndexBytes,
      notes:
        `vocab ${this.terms.length} terms, ${postingEntries} field postings, ` +
        `${this.corrector.gramEntryCount} trigram entries; BM25+ {k:${PARAMS.k1}, b:${PARAMS.b}, d:${PARAMS.d}}, ` +
        `boosts title/alias/text ${PARAMS.fieldBoosts.join('/')}, fuzzy ${PARAMS.fuzzyWeight}, ` +
        `prefix ${PARAMS.prefixWeight}, ≤${PARAMS.maxCorrections} corrections/term (ES AUTO ladder), ` +
        `auto-stop ${this.stopSet.size} terms (df > ${PARAMS.stopDfRatio}), lexemeBoost ${PARAMS.lexemeBoost}, ` +
        `pair field ${this.pairPostings.slots.size} keys (boost ${PARAMS.pairBoost}), ` +
        `floors ${PARAMS.scoreFloor}/${PARAMS.fuzzyOnlyScoreFloor}, topContentMatched ≥ ${PARAMS.minTopContentMatched}`,
    };
  }

  query(question: string, k: number): ScoredHit[] {
    try {
      return this.queryInner(question, k);
    } catch {
      // Contract: never throw on weird input. Also scrub accumulators in case
      // the failure happened mid-accumulation.
      this.scoreBuf.fill(0);
      this.maskBuf.fill(0);
      this.taMaskBuf.fill(0);
      this.pairHitBuf.fill(0);
      return [];
    }
  }

  private queryInner(question: string, k: number): ScoredHit[] {
    if (!this.built || this.corrector === null) return [];
    const kk = Math.floor(k);
    if (!Number.isFinite(kk) || kk <= 0) return [];
    const { terms: queryTerms, idTokens } = tokenizeQuery(
      typeof question === 'string' ? question : String(question ?? ''),
      PARAMS.maxQueryTerms,
    );

    // Exact-ID tier (digest §a: "if the query contains a token equal to a doc
    // id, that doc wins outright").
    const tierDocs: number[] = [];
    for (const t of idTokens) {
      const di = this.idMap.get(t);
      if (di !== undefined) tierDocs.push(di);
    }
    if (queryTerms.length === 0 && tierDocs.length === 0) return [];

    const N = this.docCount;

    // Split query terms into content vs corpus-glue (auto-stop). Glue terms
    // are dropped from scoring and the coordination multiplier whenever at
    // least one content term exists (see PARAMS.stopDfRatio provenance);
    // otherwise fall back to scoring everything.
    let contentTerms = queryTerms.filter((t) => !this.isGlue(t));
    if (contentTerms.length === 0) contentTerms = queryTerms;

    let exactAnchor = false;
    let fuzzyAnchor = false;
    /** Content terms that landed in the vocabulary (exactly or via correction). */
    let contentBearing = 0;

    // Per-term expansions: exact | spell-fix corrections; plus prefix
    // expansions. Deduped per candidate term keeping the MAX weight (digest §d
    // pitfall: never sum fuzzy+prefix for the same candidate).
    const perTerm: Expansion[][] = [];
    const pairCands: Array<Array<{ ti: number; w: number }>> = [];
    for (const qt of contentTerms) {
      const expMap = new Map<number, number>();
      const cands: Array<{ ti: number; w: number }> = [];
      const ti = this.termIndex.get(qt);
      if (ti !== undefined) {
        expMap.set(ti, 1);
        cands.push({ ti, w: 1 });
        contentBearing++;
        if (!this.isGlue(qt)) exactAnchor = true;
      } else {
        let corrected = false;
        for (const c of this.corrector.correct(qt)) {
          const cti = this.termIndex.get(c.term)!; // corrections come from the vocabulary
          const w = PARAMS.fuzzyWeight * (c.term.length / (c.term.length + c.dist));
          if ((expMap.get(cti) ?? 0) < w) expMap.set(cti, w);
          if (cands.length < PARAMS.maxPairCorrections) cands.push({ ti: cti, w });
          corrected = true;
          if (
            c.sim >= PARAMS.anchorMinCorrectionSim &&
            qt.length >= PARAMS.anchorMinCorrectionTermLen &&
            !this.isGlue(c.term)
          ) {
            fuzzyAnchor = true;
          }
        }
        if (corrected) contentBearing++;
      }
      if (qt.length >= PARAMS.prefixMinTermLen) {
        for (const cand of this.prefixExpansions(qt)) {
          const w =
            PARAMS.prefixWeight *
            (cand.term.length /
              (cand.term.length + PARAMS.prefixLenDiffFactor * (cand.term.length - qt.length)));
          if ((expMap.get(cand.ti) ?? 0) < w) expMap.set(cand.ti, w);
        }
      }
      const exps: Expansion[] = [];
      for (const [eti, weight] of expMap) exps.push({ ti: eti, weight });
      perTerm.push(exps);
      pairCands.push(cands);
    }

    // Negative discipline (digest §a): no anchor → abstain outright.
    const idAnchor = tierDocs.length > 0;
    if (!idAnchor && !exactAnchor && !fuzzyAnchor) return [];

    // BM25F-lite accumulation.
    const { k1, b, d } = PARAMS;
    const scoreBuf = this.scoreBuf;
    const maskBuf = this.maskBuf;
    const taMaskBuf = this.taMaskBuf;
    const pairHitBuf = this.pairHitBuf;
    const touched: number[] = [];
    for (let qi = 0; qi < perTerm.length; qi++) {
      const bit = 1 << Math.min(qi, 30);
      for (const exp of perTerm[qi]!) {
        for (let f = 0; f < FIELD_COUNT; f++) {
          const packed = this.postings[f]!;
          const slot = packed.slots.get(exp.ti);
          if (slot === undefined) continue;
          const pStart = packed.starts[slot]!;
          const pEnd = packed.starts[slot + 1]!;
          const df = (pEnd - pStart) >>> 1;
          // BM25+ idf (per-field df, digest §a formula). Corrected terms use
          // the corrected VOCABULARY term's idf, never the typo's.
          const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));
          if (idf <= 0) continue;
          const wf = exp.weight * PARAMS.fieldBoosts[f]! * idf;
          const avg = this.avgFieldLen[f]!;
          if (avg <= 0) continue;
          const lens = this.fieldLens[f]!;
          const data = packed.data;
          const isTitleOrAlias = f < 2 ? 1 : 0;
          for (let p = pStart; p < pEnd; p += 2) {
            const di = data[p]!;
            const tf = data[p + 1]!;
            const norm = 1 - b + (b * lens[di]!) / avg;
            const contrib = wf * (d + (tf * (k1 + 1)) / (tf + k1 * norm));
            if (maskBuf[di] === 0) touched.push(di);
            scoreBuf[di] = scoreBuf[di]! + contrib;
            maskBuf[di] = maskBuf[di]! | bit;
            if (isTitleOrAlias === 1) taMaskBuf[di] = taMaskBuf[di]! | bit;
          }
        }
      }
    }

    // Contextual pair pass: adjacent content-term pairs matching adjacent
    // title/alias pairs are a phrase-grade signal (FlexSearch contextual
    // index, digest §c). A pair hit marks both terms matched AND
    // title/alias-matched.
    if (this.avgPairLen > 0) {
      const vocabSize = this.terms.length;
      for (let i = 0; i + 1 < pairCands.length; i++) {
        const bits = (1 << Math.min(i, 30)) | (1 << Math.min(i + 1, 30));
        for (const L of pairCands[i]!) {
          for (const R of pairCands[i + 1]!) {
            const slot = this.pairPostings.slots.get(L.ti * vocabSize + R.ti);
            if (slot === undefined) continue;
            const pStart = this.pairPostings.starts[slot]!;
            const pEnd = this.pairPostings.starts[slot + 1]!;
            const df = (pEnd - pStart) >>> 1;
            const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));
            if (idf <= 0) continue;
            const w = Math.min(L.w, R.w) * PARAMS.pairBoost * idf;
            const data = this.pairPostings.data;
            for (let p = pStart; p < pEnd; p += 2) {
              const di = data[p]!;
              const tf = data[p + 1]!;
              const norm = 1 - b + (b * this.pairLens[di]!) / this.avgPairLen;
              const contrib = w * (d + (tf * (k1 + 1)) / (tf + k1 * norm));
              if (maskBuf[di] === 0) touched.push(di);
              scoreBuf[di] = scoreBuf[di]! + contrib;
              maskBuf[di] = maskBuf[di]! | bits;
              taMaskBuf[di] = taMaskBuf[di]! | bits;
              pairHitBuf[di] = 1;
            }
          }
        }
      }
    }

    // Make sure tier docs are present even without a lexical match.
    const tierSet = new Set<number>(tierDocs);
    for (const di of tierDocs) {
      if (maskBuf[di] === 0 && scoreBuf[di] === 0) touched.push(di);
    }

    // Finalize: × distinct-matched-term count (MiniSearch "quality"
    // multiplier) × per-doc kind boost (MiniSearch docBoost slot), + exact-ID
    // tier bonus.
    const results: Array<{ di: number; s: number; matched: number; ta: number; ph: number }> = [];
    for (const di of touched) {
      const matched = popcount32(maskBuf[di]!);
      const mult = Math.min(matched, PARAMS.maxMatchedMultiplier);
      let s = scoreBuf[di]! * mult * this.docBoost[di]!;
      if (tierSet.has(di)) s += PARAMS.idTierBonus;
      if (s > 0) {
        results.push({ di, s, matched, ta: popcount32(taMaskBuf[di]!), ph: pairHitBuf[di]! });
      }
      scoreBuf[di] = 0;
      maskBuf[di] = 0;
      taMaskBuf[di] = 0;
      pairHitBuf[di] = 0;
    }

    results.sort((x, y) => {
      if (y.s !== x.s) return y.s - x.s;
      const ix = this.docIds[x.di]!;
      const iy = this.docIds[y.di]!;
      return ix < iy ? -1 : ix > iy ? 1 : 0;
    });
    if (results.length === 0) return [];

    const top = results[0]!;
    const topIsTier = tierSet.has(top.di);

    // Negative discipline, parts 2+3 (list-level). A result is "trusted" when
    // it co-locates ≥ min(contentBearing, 2) content terms AND has that many
    // of them in its title/alias fields at a non-trivial score — a quoted
    // title, alias, or definition phrase produces exactly this; an off-domain
    // word salad grazing one incidental title word (or scattering single
    // words across pattern bodies) does not. The list survives when the top
    // doc is a heavyweight body match (≥ bodyOnlyFloor — task/paraphrase
    // territory, negatives top out far below) or when ANY top-k result is
    // trusted (a chatty body doc outranking the true title-matched answer is
    // a ranking nuisance, not evidence of nonsense).
    if (!topIsTier) {
      const need = Math.min(contentBearing, PARAMS.minTopContentMatched);
      const topSuspicious =
        top.matched < need || (top.ta < need && top.s < PARAMS.bodyOnlyFloor);
      if (topSuspicious) {
        let trusted = false;
        const scan = Math.min(results.length, Math.max(kk, 10));
        for (let i = 0; i < scan; i++) {
          const r = results[i]!;
          // Phrase-grade evidence required: an adjacent pair hit, not just
          // scattered term grazing across a hub doc's many aliases.
          if (
            r.matched >= need &&
            r.ta >= need &&
            r.ph === 1 &&
            r.s >= PARAMS.fuzzyOnlyScoreFloor
          ) {
            trusted = true;
            break;
          }
        }
        if (!trusted) return [];
      }
    }

    // Absolute score floor on the best hit (digest §a: "the top score clears
    // an absolute floor"); stricter when only fuzzy corrections anchor.
    const floor = idAnchor || exactAnchor ? PARAMS.scoreFloor : PARAMS.fuzzyOnlyScoreFloor;
    if (top.s < floor) return [];

    const out: ScoredHit[] = [];
    const limit = Math.min(kk, results.length);
    for (let i = 0; i < limit; i++) {
      const r = results[i]!;
      out.push({ id: this.docIds[r.di]!, score: r.s });
    }
    return out;
  }

  /** Glue = corpus-derived stop term, or a bare single character (id split
   * residue, "I", "a" — no lexical signal). */
  private isGlue(t: string): boolean {
    return t.length < 2 || this.stopSet.has(t);
  }

  /** Vocabulary terms strictly extending `qt`, ranked (collection freq desc,
   * lex asc), capped — ES max_expansions analogue, deterministic. */
  private prefixExpansions(qt: string): Array<{ term: string; ti: number }> {
    const sorted = this.sortedTerms;
    // lower bound
    let lo = 0;
    let hi = sorted.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (sorted[mid]! < qt) lo = mid + 1;
      else hi = mid;
    }
    const candidates: Array<{ term: string; ti: number; freq: number }> = [];
    let scanned = 0;
    for (let i = lo; i < sorted.length && scanned < PARAMS.maxPrefixScan; i++, scanned++) {
      const t = sorted[i]!;
      if (!t.startsWith(qt)) break;
      if (t.length > qt.length) {
        const ti = this.termIndex.get(t)!;
        candidates.push({ term: t, ti, freq: this.collectionFreq[ti]! });
      }
    }
    candidates.sort((x, y) => {
      if (y.freq !== x.freq) return y.freq - x.freq;
      return x.term < y.term ? -1 : x.term > y.term ? 1 : 0;
    });
    return candidates.slice(0, PARAMS.maxPrefixExpansions);
  }
}

function popcount32(x: number): number {
  x = x - ((x >> 1) & 0x55555555);
  x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
  return (((x + (x >> 4)) & 0x0f0f0f0f) * 0x01010101) >> 24;
}
