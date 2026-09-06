/**
 * rri — Reflective Random Indexing (model-free semantic candidate).
 *
 * Design source: research/graph-semantics.md §(b) "Recommended semantic
 * candidate: Reflective Random Indexing, d=1024" (Kanerva et al. 2000;
 * Sahlgren; Cohen, Schvaneveldt & Widdows, J. Biomed. Informatics 2010).
 * The digest's LSA verdict was no-go; this is the RI/RRI recipe instead.
 *
 * Core construction:
 *   - Every term gets a deterministic sparse ternary "index vector":
 *     d=1024 dims, s=8 non-zeros (exactly 4 at +1 and 4 at -1), positions and
 *     signs derived from an FNV-1a/xorshift32 hash chain of the term string.
 *     Zero stored randomness — identical across runs and machines.
 *   - Direct channel (pass 0): doc vector = idf- and field-weighted sum of
 *     its terms' index vectors, L2-normalized (f64 accumulation, f32 store).
 *   - Reflective channel (one pass, digest §(b)): term vectors are retrained
 *     as the weighted sum of the pass-0 vectors of the docs containing them,
 *     then doc vectors are rebuilt from those term vectors. This captures
 *     INDIRECT term relations (terms that never co-occur) — the paraphrase /
 *     vocabulary-mismatch case. Per the digest's pitfall list ("tiny alias
 *     docs get junk vectors — exclude them from the factorization and fold
 *     them in as pseudo-queries"), the 8.5k lexeme alias stubs are EXCLUDED
 *     from term training (their text is anchor-folded into their targets
 *     instead, see below); all 9,155 docs are then folded in as pseudo-docs
 *     when the reflective doc matrix is rebuilt.
 *   - Query: two L2-normalized query vectors — index-vector-only for the
 *     direct channel; gamma·index + (1-gamma)·reflective-term-vector for the
 *     reflective channel — then one exact brute-force pass over all docs
 *     scoring lambda·cosDirect + (1-lambda)·cosReflective, top-k. The convex
 *     combination of the two normalized cosine channels follows digest §(c)
 *     (Bruch, Gai & Ingber, ACM TOIS 2023); both channels are RRI cosines in
 *     the same hashed space — there is no BM25/postings ranking here.
 *
 * Anchor fold: each lexeme stub's title (the alias phrase) is folded into its
 * lexical_match target's alias field (anchor-text move, lexical.md §(a).2).
 * This is also what lets alias vocabulary reach the reflective pass after
 * stubs are excluded from training.
 *
 * Hybrid guard (documented, small, non-core — ranking stays the RRI cosine):
 *   - exact-ID tier: real corpus IDs mentioned verbatim in the query pin
 *     those docs first (query appearance order);
 *   - exact title/alias equality: fixed additive bonus when the whole
 *     normalized query equals a doc's title (or a non-lexeme doc's alias); an
 *     exact hit on a lexeme stub title also passes the bonus to the stub's
 *     targets (the digest's "fold lexeme mass into its target" move, §(a).4).
 *
 * Negative gate (digest pitfall: "RI always scores something — gate on
 * lexical evidence first"): [] unless (a) some known query term has idf above
 * tauIdf, (b) at least minCoverage of query tokens are corpus vocabulary, and
 * (c) per doc, the DIRECT channel clears tauCos (or the reflective channel
 * clears the stricter tauSem) — an empty survivor set returns [].
 *
 * Determinism: hashing only, fixed iteration order (corpus order / vocab
 * insertion order / CSR order), fixed pass counts, f64 accumulators with f32
 * storage, ties broken (score desc, id asc). No Date/Math.random/locale ops.
 */
import type { BuildInfo, CorpusDoc, Retriever, ScoredHit } from '../../harness/types.js';
import { idCandidateSpans, normalizeEq, tokenize } from './tokenize.js';

export interface RriConfig {
  /** Vector dimensionality d (digest: 1024). */
  dims: number;
  /** Non-zeros per ternary index vector s (digest: 8; half +1, half -1). */
  seed: number;
  /** 0 = plain Random Indexing only (ablation), 1 = one reflective pass
   * (digest recipe), 2 = second cycle (ablation only). */
  reflectivePasses: 0 | 1 | 2;
  /** Convex combination weight of the direct channel (digest §(c)). */
  lambdaDirect: number;
  /** Reflective-channel query blend: gamma·index + (1-gamma)·term vector. */
  gammaIndex: number;
  /** Field weights for term accumulation (scaled from lexical.md BM25F table). */
  wTitle: number;
  wAlias: number;
  wBody: number;
  /** Reflective-channel field weights (the reflective channel targets
   * body-level situation vocabulary, so it may weight fields differently). */
  wTitleR: number;
  wAliasR: number;
  wBodyR: number;
  /** tf saturation constant: sat(tf) = tf / (tf + k1). */
  k1: number;
  /** Query-side idf exponent (sharpens long NL queries when > 1). */
  queryIdfPow: number;
  /** Kind priors: answer surface is patterns; stubs/prefaces are demoted. */
  lexemeMult: number;
  prefaceMult: number;
  /** Exact-tier additive bonuses (cosine scale). */
  exactBonus: number;
  exactBonusLexeme: number;
  /** Negative gate: direct-channel floor, semantic floor, idf and idf-mass. */
  tauCos: number;
  tauSem: number;
  tauIdf: number;
  /**
   * Minimum fraction of query idf-mass carried by KNOWN terms, where every
   * unknown token counts at the corpus maximum idf. Genuine dev queries are
   * ~100% corpus vocabulary; nonsense carries 3-4 unknown tokens.
   */
  tauMass: number;
  /** SymSpell-style deletion-distance-1 bridge for unknown query terms. */
  typoBridge: boolean;
}

export const DEFAULT_CONFIG: RriConfig = {
  dims: 1024,
  seed: 8,
  reflectivePasses: 1,
  lambdaDirect: 0.5,
  gammaIndex: 0.25,
  wTitle: 6,
  wAlias: 4,
  wBody: 1,
  wTitleR: 2,
  wAliasR: 2,
  wBodyR: 1,
  k1: 1.2,
  queryIdfPow: 1.5,
  lexemeMult: 0.7,
  prefaceMult: 0.85,
  exactBonus: 0.25,
  exactBonusLexeme: 0.15,
  tauCos: 0.25,
  tauSem: 0.5,
  tauIdf: 1.5,
  tauMass: 0.7,
  typoBridge: true,
};

/** 32-bit FNV-1a of a string (deterministic, locale-free). */
function fnv1a(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** xorshift32 step (Marsaglia); counter-based mix over the FNV seed. */
function xorshift32(x: number): number {
  x ^= x << 13;
  x >>>= 0;
  x ^= x >>> 17;
  x ^= x << 5;
  return x >>> 0;
}

const TF_CAP = 1023;
const SHIFT_TITLE = 20;
const SHIFT_ALIAS = 10;
const PINNED_BASE_SCORE = 1000;

export default class RriRetriever implements Retriever {
  readonly name: string = 'rri';
  private readonly cfg: RriConfig;

  private n = 0;
  private docIds: string[] = [];
  private kindMult: Float64Array = new Float64Array(0);
  /** lowercased corpus id -> doc indices (exact-ID tier). */
  private idMap = new Map<string, number[]>();
  /** normalizeEq(title/alias) -> doc indices eligible for the exact bonus. */
  private exactSelf = new Map<string, number[]>();
  /** normalizeEq(lexeme stub title) -> lexical_match target doc indices. */
  private exactTarget = new Map<string, number[]>();

  private vocab = new Map<string, number>();
  private termStr: string[] = [];
  private idf: Float64Array = new Float64Array(0);
  private cf: Float64Array = new Float64Array(0);
  /** Ternary index vectors: s positions + s signs per term. */
  private idxPos: Int32Array = new Int32Array(0);
  private idxSign: Int8Array = new Int8Array(0);
  /** Direct channel: L2-normalized pass-0 doc vectors, n x dims f32. */
  private docMat0: Float32Array = new Float32Array(0);
  /** Reflective channel: doc vectors rebuilt from reflective term vectors. */
  private docMatR: Float32Array | null = null;
  /** Reflective term vectors, i8-quantized with a per-term scale. */
  private termQ: Int8Array | null = null;
  private termScale: Float32Array | null = null;
  /** deletion-distance-1 form -> best termId (typo bridge). */
  private delMap: Map<string, number> | null = null;

  constructor(cfg: Partial<RriConfig> = {}) {
    this.cfg = { ...DEFAULT_CONFIG, ...cfg };
    if (this.cfg.reflectivePasses === 0) this.cfg.lambdaDirect = 1;
  }

  build(docs: CorpusDoc[]): BuildInfo {
    const t0 = performance.now();
    const { dims, k1, wTitle, wAlias, wBody } = this.cfg;
    const n = (this.n = docs.length);
    this.docIds = docs.map((d) => d.id);
    this.kindMult = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      const kind = docs[i]!.kind;
      this.kindMult[i] =
        kind === 'lexeme' ? this.cfg.lexemeMult : kind === 'preface' ? this.cfg.prefaceMult : 1;
    }

    // --- exact-tier maps ------------------------------------------------
    const idxById = new Map<string, number>();
    for (let i = 0; i < n; i++) idxById.set(docs[i]!.id, i);
    const pushTo = (map: Map<string, number[]>, key: string, idx: number): void => {
      if (key.length === 0) return;
      const list = map.get(key);
      if (list === undefined) map.set(key, [idx]);
      else if (!list.includes(idx)) list.push(idx);
    };
    for (let i = 0; i < n; i++) {
      const d = docs[i]!;
      pushTo(this.idMap, d.id.toLowerCase(), i);
      pushTo(this.exactSelf, normalizeEq(d.title), i);
      if (d.kind !== 'lexeme') {
        for (const alias of d.aliases) {
          if (alias !== d.title) pushTo(this.exactSelf, normalizeEq(alias), i);
        }
      }
    }

    // --- anchor fold: lexeme stub titles into their targets' alias field
    // (anchor-text move, lexical.md §(a).2); also the alias->pattern bridge
    // that lets the reflective pass see alias vocabulary after stubs are
    // excluded from training. Deterministic: docs iterated in corpus order.
    const folded: Array<string[] | undefined> = new Array<string[] | undefined>(n);
    for (let i = 0; i < n; i++) {
      const d = docs[i]!;
      if (d.kind !== 'lexeme') continue;
      const key = normalizeEq(d.title);
      let tokens: string[] | null = null;
      for (const edge of d.neighbors) {
        if (edge.relation.startsWith('rev:')) continue;
        const target = idxById.get(edge.to);
        if (target === undefined) continue;
        pushTo(this.exactTarget, key, target);
        tokens ??= tokenize(d.title);
        (folded[target] ??= []).push(...tokens);
      }
    }

    // --- pass 1: vocabulary, per-field tf, df ---------------------------
    const df: number[] = [];
    const cf: number[] = [];
    const termStr: string[] = [];
    const vocab = this.vocab;
    const termOf = (t: string): number => {
      let id = vocab.get(t);
      if (id === undefined) {
        id = termStr.length;
        vocab.set(t, id);
        termStr.push(t);
        df.push(0);
        cf.push(0);
      }
      return id;
    };
    const docTermIds: Int32Array[] = new Array<Int32Array>(n);
    const docPacked: Int32Array[] = new Array<Int32Array>(n);
    const tfMap = new Map<number, number>();
    let nnz = 0;
    for (let i = 0; i < n; i++) {
      const d = docs[i]!;
      tfMap.clear();
      const addAll = (tokens: string[], shift: number): void => {
        for (const tok of tokens) {
          const id = termOf(tok);
          const packed = tfMap.get(id) ?? 0;
          if (((packed >>> shift) & TF_CAP) < TF_CAP) tfMap.set(id, packed + (1 << shift));
          else tfMap.set(id, packed);
          cf[id]! += 1;
        }
      };
      addAll(tokenize(d.title), SHIFT_TITLE);
      for (const alias of d.aliases) {
        if (alias !== d.title) addAll(tokenize(alias), SHIFT_ALIAS);
      }
      const anchor = folded[i];
      if (anchor !== undefined) addAll(anchor, SHIFT_ALIAS);
      addAll(tokenize(d.text), 0);

      const size = tfMap.size;
      const ids = new Int32Array(size);
      const packedArr = new Int32Array(size);
      let w = 0;
      for (const [id, packed] of tfMap) {
        ids[w] = id;
        packedArr[w] = packed;
        df[id]! += 1;
        w++;
      }
      docTermIds[i] = ids;
      docPacked[i] = packedArr;
      nnz += size;
    }
    const v = termStr.length;
    this.termStr = termStr;
    this.cf = Float64Array.from(cf);

    // Lucene idf (never negative): ln(1 + (N - df + 0.5) / (df + 0.5)).
    const idf = (this.idf = new Float64Array(v));
    for (let t = 0; t < v; t++) {
      idf[t] = Math.log(1 + (n - df[t]! + 0.5) / (df[t]! + 0.5));
    }

    // --- per-doc weights: idf(t) · Σ_f w_f · sat(tf_f), sat = tf/(tf+k1).
    // Per-field saturation keeps title/alias dominance for tiny fields while
    // capping any single term's contribution from a 324KB body (the giants
    // guard); vector magnitude is irrelevant after L2 normalization.
    const makeWeights = (wT: number, wA: number, wB: number): Float32Array[] => {
      const out: Float32Array[] = new Array<Float32Array>(n);
      for (let i = 0; i < n; i++) {
        const ids = docTermIds[i]!;
        const packed = docPacked[i]!;
        const weights = new Float32Array(ids.length);
        for (let j = 0; j < ids.length; j++) {
          const p = packed[j]!;
          const tfT = (p >>> SHIFT_TITLE) & TF_CAP;
          const tfA = (p >>> SHIFT_ALIAS) & TF_CAP;
          const tfB = p & TF_CAP;
          const sat =
            wT * (tfT / (tfT + k1)) + wA * (tfA / (tfA + k1)) + wB * (tfB / (tfB + k1));
          weights[j] = idf[ids[j]!]! * sat;
        }
        out[i] = weights;
      }
      return out;
    };
    const docW = makeWeights(wTitle, wAlias, wBody);
    const { wTitleR, wAliasR, wBodyR } = this.cfg;
    const sameR = wTitleR === wTitle && wAliasR === wAlias && wBodyR === wBody;
    const docWR = sameR ? docW : makeWeights(wTitleR, wAliasR, wBodyR);

    // --- ternary index vectors (deterministic hash chain) ----------------
    const s = this.cfg.seed;
    const half = s >> 1;
    const idxPos = (this.idxPos = new Int32Array(v * s));
    const idxSign = (this.idxSign = new Int8Array(v * s));
    const mask = dims - 1; // dims is a power of two; 2^32 % dims === 0, no modulo bias
    for (let t = 0; t < v; t++) {
      let x = fnv1a(termStr[t]!);
      if (x === 0) x = 0x9e3779b9;
      let picked = 0;
      let pos = 0;
      let neg = 0;
      const base = t * s;
      while (picked < s) {
        x = xorshift32(x);
        const p = x & mask;
        let dup = false;
        for (let j = 0; j < picked; j++) {
          if (idxPos[base + j] === p) {
            dup = true;
            break;
          }
        }
        if (dup) continue;
        let sign: number;
        if (pos === half) sign = -1;
        else if (neg === half) sign = 1;
        else sign = ((x >>> 16) & 1) === 1 ? 1 : -1;
        if (sign > 0) pos++;
        else neg++;
        idxPos[base + picked] = p;
        idxSign[base + picked] = sign;
        picked++;
      }
    }

    // --- direct channel (pass 0): doc vectors from index vectors ----------
    const docMat0 = (this.docMat0 = new Float32Array(n * dims));
    const buf = new Float64Array(dims);
    for (let i = 0; i < n; i++) {
      buf.fill(0);
      const ids = docTermIds[i]!;
      const weights = docW[i]!;
      for (let j = 0; j < ids.length; j++) {
        const w = weights[j]!;
        const base = ids[j]! * s;
        for (let q = 0; q < s; q++) {
          buf[idxPos[base + q]!]! += w * idxSign[base + q]!;
        }
      }
      storeNormalized(buf, docMat0, i * dims, dims);
    }

    // --- reflective channel (digest: one pass; stubs excluded from training)
    let termBytes = 0;
    let reflBytes = 0;
    let trainNnz = 0;
    if (this.cfg.reflectivePasses >= 1) {
      // CSR transpose over TRAINING docs only (kind !== 'lexeme'), so each
      // term vector accumulates in a single f64 buffer, in doc order.
      const isTrain = new Uint8Array(n);
      for (let i = 0; i < n; i++) isTrain[i] = docs[i]!.kind === 'lexeme' ? 0 : 1;
      const ptr = new Int32Array(v + 1);
      for (let i = 0; i < n; i++) {
        if (isTrain[i] === 0) continue;
        const ids = docTermIds[i]!;
        for (let j = 0; j < ids.length; j++) ptr[ids[j]! + 1]!++;
      }
      for (let t = 0; t < v; t++) ptr[t + 1]! += ptr[t]!;
      trainNnz = ptr[v]!;
      const csrDoc = new Int32Array(trainNnz);
      const csrW = new Float32Array(trainNnz);
      const cursor = ptr.slice(0, v);
      for (let i = 0; i < n; i++) {
        if (isTrain[i] === 0) continue;
        const ids = docTermIds[i]!;
        const weights = docWR[i]!;
        for (let j = 0; j < ids.length; j++) {
          const t = ids[j]!;
          const at = cursor[t]!;
          csrDoc[at] = i;
          csrW[at] = weights[j]!;
          cursor[t] = at + 1;
        }
      }

      const termMat = new Float32Array(v * dims);
      const docMatR = (this.docMatR = new Float32Array(n * dims));
      let trainMat = docMat0; // pass 1 trains from pass-0 vectors
      for (let pass = 0; pass < this.cfg.reflectivePasses; pass++) {
        for (let t = 0; t < v; t++) {
          const from = ptr[t]!;
          const to = ptr[t + 1]!;
          if (from === to) continue; // alias-only term with no trained doc: stays zero
          buf.fill(0);
          for (let e = from; e < to; e++) {
            const w = csrW[e]!;
            const rowBase = csrDoc[e]! * dims;
            for (let q = 0; q < dims; q++) {
              buf[q]! += w * trainMat[rowBase + q]!;
            }
          }
          storeNormalized(buf, termMat, t * dims, dims);
        }

        // Rebuild ALL doc vectors (stubs fold in as pseudo-docs) from the
        // reflective term vectors.
        for (let i = 0; i < n; i++) {
          buf.fill(0);
          const ids = docTermIds[i]!;
          const weights = docWR[i]!;
          for (let j = 0; j < ids.length; j++) {
            const w = weights[j]!;
            const rowBase = ids[j]! * dims;
            for (let q = 0; q < dims; q++) {
              buf[q]! += w * termMat[rowBase + q]!;
            }
          }
          storeNormalized(buf, docMatR, i * dims, dims);
        }
        trainMat = docMatR; // a second cycle retrains from the rebuilt docs
      }
      reflBytes = docMatR.byteLength;

      // Quantize term vectors to i8 (per-row scale) for the query-side blend;
      // deterministic Math.round, ~0.4% max component error on unit vectors.
      const termQ = (this.termQ = new Int8Array(v * dims));
      const termScale = (this.termScale = new Float32Array(v));
      for (let t = 0; t < v; t++) {
        let maxAbs = 0;
        const base = t * dims;
        for (let q = 0; q < dims; q++) {
          const a = Math.abs(termMat[base + q]!);
          if (a > maxAbs) maxAbs = a;
        }
        if (maxAbs === 0) continue;
        termScale[t] = maxAbs / 127;
        const inv = 127 / maxAbs;
        for (let q = 0; q < dims; q++) {
          termQ[base + q] = Math.round(termMat[base + q]! * inv);
        }
      }
      termBytes = termQ.byteLength + termScale.byteLength;
    }

    // --- typo bridge: deletion-distance-1 map (lexical.md §(a).1.6) -------
    let delEntries = 0;
    if (this.cfg.typoBridge) {
      const delMap = (this.delMap = new Map<string, number>());
      const better = (a: number, b: number): number => {
        const ca = this.cf[a]!;
        const cb = this.cf[b]!;
        if (ca !== cb) return ca > cb ? a : b;
        return termStr[a]! < termStr[b]! ? a : b;
      };
      for (let t = 0; t < v; t++) {
        const w = termStr[t]!;
        if (w.length < 4 || w.length > 24 || !/^[a-z]+$/.test(w)) continue;
        for (let i = 0; i < w.length; i++) {
          const variant = w.slice(0, i) + w.slice(i + 1);
          const prev = delMap.get(variant);
          delMap.set(variant, prev === undefined ? t : better(prev, t));
        }
      }
      delEntries = delMap.size;
    }

    const buildMs = performance.now() - t0;
    const approxIndexBytes =
      this.docMat0.byteLength +
      reflBytes +
      termBytes +
      this.idxPos.byteLength +
      this.idxSign.byteLength +
      this.idf.byteLength +
      this.cf.byteLength +
      delEntries * 24; // rough typo-bridge estimate; doc postings are released after build
    return {
      buildMs,
      docCount: n,
      approxIndexBytes,
      notes:
        `RRI d=${dims} s=${this.cfg.seed} reflectivePasses=${this.cfg.reflectivePasses} ` +
        `lambdaDirect=${this.cfg.lambdaDirect} gammaIndex=${this.cfg.gammaIndex} ` +
        `fields(title/alias/body)=${wTitle}/${wAlias}/${wBody} fieldsR=${wTitleR}/${wAliasR}/${wBodyR} ` +
        `k1=${k1} queryIdfPow=${this.cfg.queryIdfPow} ` +
        `kindMult(lexeme/preface)=${this.cfg.lexemeMult}/${this.cfg.prefaceMult} ` +
        `tau(cos/sem/idf/mass)=${this.cfg.tauCos}/${this.cfg.tauSem}/${this.cfg.tauIdf}/${this.cfg.tauMass} ` +
        `V=${v} nnz=${nnz} trainNnz=${trainNnz} typoBridgeEntries=${delEntries}`,
    };
  }

  query(question: string, k: number): ScoredHit[] {
    try {
      return this.queryInner(question, k);
    } catch {
      return []; // contract: never throw on weird input
    }
  }

  private queryInner(question: string, k: number): ScoredHit[] {
    const limit = Math.floor(k);
    if (!Number.isFinite(limit) || limit <= 0 || this.n === 0) return [];
    const raw = String(question ?? '');
    if (raw.length === 0 || raw.length > 4096) return [];

    // --- exact-ID tier: real corpus IDs mentioned verbatim get pinned first.
    const pinned: number[] = [];
    const pinnedSet = new Set<number>();
    for (const span of idCandidateSpans(raw)) {
      const hits = this.idMap.get(span);
      if (hits === undefined) continue;
      for (const idx of hits) {
        if (!pinnedSet.has(idx)) {
          pinnedSet.add(idx);
          pinned.push(idx);
        }
      }
    }

    // --- query terms: known vocab only; unknowns may cross the typo bridge.
    const tokens = tokenize(raw, true);
    const tf = new Map<number, number>();
    let unknownTokens = 0;
    for (const tok of tokens) {
      let id = this.vocab.get(tok);
      if (id === undefined && this.delMap !== null && tok.length >= 5 && /^[a-z]+$/.test(tok)) {
        id = this.bridgeTypo(tok);
      }
      if (id !== undefined) tf.set(id, (tf.get(id) ?? 0) + 1);
      else unknownTokens++;
    }

    // --- negative gates 1+2: an informative known term must exist, and known
    // terms must carry at least tauMass of the query's idf mass (lexical.md's
    // coord<0.34 abstention, idf-weighted; unknown tokens count at max idf).
    const k1 = this.cfg.k1;
    let maxIdf = 0;
    let knownMass = 0;
    for (const [id, count] of tf) {
      const x = this.idf[id]!;
      if (x > maxIdf) maxIdf = x;
      knownMass += x * (count / (count + k1));
    }
    const idfMax = Math.log(1 + (this.n + 0.5) / 0.5);
    const unknownMass = unknownTokens * idfMax * (1 / (1 + k1));
    const massFraction = knownMass + unknownMass === 0 ? 0 : knownMass / (knownMass + unknownMass);
    const gated =
      tf.size === 0 || maxIdf < this.cfg.tauIdf || massFraction < this.cfg.tauMass;
    if (gated && pinned.length === 0) return [];

    const hits: ScoredHit[] = [];
    for (let i = 0; i < pinned.length && hits.length < limit; i++) {
      hits.push({ id: this.docIds[pinned[i]!]!, score: PINNED_BASE_SCORE - i });
    }
    if (gated || hits.length >= limit) return hits;

    // --- query vectors for the two channels -------------------------------
    const { dims, gammaIndex, lambdaDirect, queryIdfPow } = this.cfg;
    const s = this.cfg.seed;
    const reflective = this.docMatR !== null && lambdaDirect < 1;
    const qd = new Float64Array(dims); // direct: index vectors only
    const qr = reflective ? new Float64Array(dims) : null;
    const oneMinus = 1 - gammaIndex;
    for (const [id, count] of tf) {
      const idfw = queryIdfPow === 1 ? this.idf[id]! : Math.pow(this.idf[id]!, queryIdfPow);
      const w = idfw * (count / (count + k1));
      const base = id * s;
      for (let j = 0; j < s; j++) {
        const contrib = w * this.idxSign[base + j]!;
        const at = this.idxPos[base + j]!;
        qd[at]! += contrib;
        if (qr !== null && gammaIndex > 0) qr[at]! += contrib * gammaIndex;
      }
      if (qr !== null && oneMinus > 0 && this.termQ !== null && this.termScale !== null) {
        const scale = this.termScale[id]!;
        if (scale > 0) {
          const wt = w * oneMinus * scale;
          const rowBase = id * dims;
          for (let j = 0; j < dims; j++) {
            qr[j]! += wt * this.termQ[rowBase + j]!;
          }
        }
      }
    }
    if (!normalizeInPlace(qd, dims)) return hits;
    const useRefl = qr !== null && normalizeInPlace(qr, dims);
    const lam = useRefl ? lambdaDirect : 1;

    // --- exact title/alias bonuses on the whole normalized query.
    const bonus = new Map<number, number>();
    const nq = normalizeEq(raw);
    if (nq.length > 0) {
      const self = this.exactSelf.get(nq);
      if (self !== undefined) {
        for (const idx of self) {
          const b =
            this.kindMult[idx]! < 1 && this.docIds[idx]!.startsWith('lex:')
              ? this.cfg.exactBonusLexeme
              : this.cfg.exactBonus;
          if ((bonus.get(idx) ?? 0) < b) bonus.set(idx, b);
        }
      }
      const targets = this.exactTarget.get(nq);
      if (targets !== undefined) {
        for (const idx of targets) {
          if ((bonus.get(idx) ?? 0) < this.cfg.exactBonus) bonus.set(idx, this.cfg.exactBonus);
        }
      }
    }

    // --- brute-force cosine over all docs (f64 accumulators, f32 rows).
    // Admission (negative gate 3): direct evidence >= tauCos, or reflective
    // similarity >= tauSem, or an exact-tier bonus.
    const docMat0 = this.docMat0;
    const docMatR = this.docMatR;
    const { tauCos, tauSem } = this.cfg;
    const scored: Array<{ idx: number; score: number }> = [];
    for (let i = 0; i < this.n; i++) {
      if (pinnedSet.has(i)) continue;
      const base = i * dims;
      let dot0 = 0;
      for (let j = 0; j < dims; j += 4) {
        dot0 +=
          qd[j]! * docMat0[base + j]! +
          qd[j + 1]! * docMat0[base + j + 1]! +
          qd[j + 2]! * docMat0[base + j + 2]! +
          qd[j + 3]! * docMat0[base + j + 3]!;
      }
      let dotR = 0;
      if (useRefl) {
        const qrv = qr!;
        const matR = docMatR!;
        for (let j = 0; j < dims; j += 4) {
          dotR +=
            qrv[j]! * matR[base + j]! +
            qrv[j + 1]! * matR[base + j + 1]! +
            qrv[j + 2]! * matR[base + j + 2]! +
            qrv[j + 3]! * matR[base + j + 3]!;
        }
      }
      const b = bonus.get(i) ?? 0;
      if (dot0 < tauCos && dotR < tauSem && b === 0) continue;
      const score = this.kindMult[i]! * (lam * dot0 + (1 - lam) * dotR) + b;
      scored.push({ idx: i, score });
    }

    scored.sort((a, b) => {
      if (a.score !== b.score) return b.score - a.score;
      return this.docIds[a.idx]! < this.docIds[b.idx]! ? -1 : 1;
    });
    for (let i = 0; i < scored.length && hits.length < limit; i++) {
      hits.push({ id: this.docIds[scored[i]!.idx]!, score: scored[i]!.score });
    }
    return hits;
  }

  /** SymSpell-style distance-1 lookup: deletions cover ins/del/subst/transp. */
  private bridgeTypo(tok: string): number | undefined {
    const delMap = this.delMap!;
    let best: number | undefined = delMap.get(tok); // vocab term = tok + 1 char
    const consider = (candidate: number | undefined): void => {
      if (candidate === undefined) return;
      if (best === undefined) {
        best = candidate;
        return;
      }
      const cb = this.cf[best]!;
      const cc = this.cf[candidate]!;
      if (cc > cb || (cc === cb && this.termStr[candidate]! < this.termStr[best]!)) {
        best = candidate;
      }
    };
    for (let i = 0; i < tok.length; i++) {
      const variant = tok.slice(0, i) + tok.slice(i + 1);
      consider(this.vocab.get(variant)); // vocab term = tok - 1 char
      consider(delMap.get(variant)); // substitution / transposition
    }
    return best;
  }
}

/** L2-normalize an f64 buffer and store as f32 at `out[base..base+dims)`. */
function storeNormalized(buf: Float64Array, out: Float32Array, base: number, dims: number): void {
  let ss = 0;
  for (let q = 0; q < dims; q++) ss += buf[q]! * buf[q]!;
  if (ss <= 0) {
    for (let q = 0; q < dims; q++) out[base + q] = 0;
    return;
  }
  const inv = 1 / Math.sqrt(ss);
  for (let q = 0; q < dims; q++) out[base + q] = buf[q]! * inv;
}

/** L2-normalize in place; returns false when the vector is all zero. */
function normalizeInPlace(vec: Float64Array, dims: number): boolean {
  let ss = 0;
  for (let j = 0; j < dims; j++) ss += vec[j]! * vec[j]!;
  if (ss <= 0) return false;
  const inv = 1 / Math.sqrt(ss);
  for (let j = 0; j < dims; j++) vec[j]! *= inv;
  return true;
}
