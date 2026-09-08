/**
 * graph-ppr — lexical seed + Personalized PageRank, per
 * research/graph-semantics.md section (a) (HippoRAG-style seeding + Kurland &
 * Lee re-ranking framing).
 *
 * Pipeline per query:
 *   1. Internal fielded BM25 (bm25f.ts) scores the question; top-100 kept as
 *      the lexical pool, top-32 become PPR seeds.
 *   2. Abstention gate: if the best lexical score < tau, return [] (PPR would
 *      otherwise always return something; the harness rewards empty output on
 *      nonsense).
 *   3. Teleport r(v) ∝ lex(v) · spec(v), spec(v) = 1/(1 + ln(1 + degree(v)))
 *      (HippoRAG node specificity, degree-based), normalized to sum 1.
 *   4. PPR: π ← (1−α)·r + α·(Wᵀπ + danglingMass·r), α = 0.5, EXACTLY 20
 *      iterations (α^20 ≈ 1e-6; fixed count for byte-identical determinism).
 *      W = row-normalized relation-weighted adjacency (weights below).
 *      Dangling mass (388 prefaces have no edges) reinjects into r, not
 *      uniform.
 *   5. Fold: each lexeme's π mass is ALSO credited to its lexical_match
 *      target(s) (split evenly). Lexemes keep their own π and stay rankable —
 *      gold cases may expect lexeme IDs — so the fold is a copy, not a move,
 *      and no kind is filtered out of the results.
 *   6. Degree correction: walk(v) = π_folded(v) / pr0_folded(v)^ρ where pr0 is
 *      global PageRank (uniform teleport, same α, fixed 40 iterations,
 *      folded the same way) — Kloumann–Ugander–Kleinberg π/deg statistic,
 *      partial correction; dev tuning picked ρ = 0 (see README — every
 *      ρ > 0 lost MRR by promoting lexeme leaves over their target
 *      patterns). Degree-0 nodes get NO walk
 *      score by default (see walkForIsolated) — their π is teleport
 *      retention, not graph signal, and the spec/ρ corrections otherwise
 *      compound into a triple boost for them.
 *   7. Combine with lexical (both strategies implemented, ablated on dev):
 *      'convex':  λ·n(lex) + (1−λ)·n(walk) over the union of both top pools,
 *                 n(x) = x / max(x) (theoretical-min–max, min = 0).
 *      'mult':    n(lex)·(1 + β·n(walk)) over lexically-live docs only.
 *      'pure':    n(walk) alone (HippoRAG-style; ablation row).
 *   8. Sort (score desc, id asc), slice k.
 *
 * Determinism: node order fixed by codepoint-ascending id sort at build; fixed
 * iteration counts; f64 accumulators; explicit tie-breaks; no randomness, no
 * Date, no locale-dependent string ops.
 */
import type { BuildInfo, CorpusDoc, Retriever, ScoredHit } from '../../harness/types.js';
import { Bm25f } from './bm25f.js';
import { tokenize } from './tokenize.js';

export type CombineMode = 'convex' | 'mult' | 'pure';

export interface GraphPprOptions {
  /** Leaderboard label override (ablation variants only). */
  name?: string;
  /** BM25 k1 (default 1.2). */
  k1?: number;
  /** BM25 b (default 0.75). */
  b?: number;
  /** Field weights (defaults title 4.0, alias 3.0, text 1.0). */
  weightTitle?: number;
  weightAlias?: number;
  weightText?: number;
  /** Number of PPR seeds from the lexical top (default 32). */
  seedN?: number;
  /** Lexical pool kept for combination/normalization (default 100). */
  lexPool?: number;
  /** Walk pool kept for combination/normalization (default 100). */
  walkPool?: number;
  /** PPR damping = probability of following an edge (default 0.5). */
  alpha?: number;
  /** PPR iterations (default exactly 20; fixed count, no tolerance loop). */
  iters?: number;
  /** Global-PageRank degree-correction exponent ρ (default 0 per dev sweep). */
  rho?: number;
  /** Combination strategy (default 'convex'). */
  combine?: CombineMode;
  /** Convex weight on the lexical side (default 0.75 per dev sweep). */
  lambda?: number;
  /** Multiplicative boost β (default 1.0). */
  beta?: number;
  /** Abstention gate: return [] when max BM25F score < tau (default 5.0 per dev sweep). */
  tau?: number;
  /**
   * Walk statistic used for ranking (default 'pi' per dev sweep).
   * 'pi'  : degree-corrected folded π as-is.
   * 'flow': same, minus each seed's own teleport retention (the
   *         (1−α+α·dangling)·r(v) term it re-receives every iteration).
   *         Retention is lexical rank re-expressed, not graph evidence; it
   *         drowns 1-hop inflow (a builds_on neighbor of a fan-200 hub gets
   *         ~2% of the seed's mass vs 50% retention), which is what the
   *         multi-hop category needs. Fold contributions received from
   *         lexemes are kept — only the node's own r(v) share is removed.
   *         Ablated on dev (see README).
   */
  walkScore?: 'pi' | 'flow';
  /**
   * Sharpening exponent applied to the max-normalized walk score before
   * combining (default 1, i.e. off, per dev sweep). walkN^γ with γ>1 keeps the walk's confident top
   * (≈1.0) intact while flattening its tail, so a node the walk ranks #1 on
   * pure graph evidence (the multi-hop case) survives fusion against docs
   * that score moderately in BOTH sources. γ=1 recovers the digest's plain
   * convex form; ablated on dev.
   */
  walkGamma?: number;
  /**
   * Multiply teleport weights by the inverse-log-degree specificity term
   * (default true; digest's HippoRAG-style seed-side degree defense).
   * Ablation switch to verify the correction earns its keep on dev.
   */
  useSpec?: boolean;
  /**
   * Ignore the relation-type weight table and treat every edge (incl. rev:*)
   * as weight 1.0 (default false). Ablation switch proving the digest's
   * relation weighting matters.
   */
  uniformEdgeWeights?: boolean;
  /**
   * Give graph-isolated nodes (degree 0 — e.g. all 388 prefaces) a walk score
   * (default false). Their π is pure teleport retention, not graph signal:
   * they can neither spread nor receive mass, they seed at the maximum
   * spec(v)=1 while true answers seed at ~0.15, and the ρ-correction then
   * divides them by the minimum pr0 — three compounding boosts with zero
   * structural evidence (observed on smoke queries: big prefaces outranked
   * the exact-ID pattern). With false they rank on lexical evidence alone,
   * which is the Kurland & Lee re-ranker framing. Ablated on dev.
   */
  walkForIsolated?: boolean;
}

/**
 * Relation weights, mapped from the digest's idealized names onto the actual
 * corpus relations (see README "edge weights"). Digest anchors:
 *   lexeme→node 1.0; builds_on/refines 0.8; relates 0.5;
 *   rev:builds_on/rev:refines 0.4; rev:relates 0.5 (symmetric); rev:lexeme 0.1.
 */
const FORWARD_WEIGHTS: Record<string, number> = {
  lexical_match: 1.0, // lexeme → target node (the alias→pattern bridge)
  builds_on: 0.8,
  refines: 0.8,
  prerequisite_for: 0.4, // "A prerequisite_for B": A→B walks downstream (inverse of builds_on)
  used_by: 0.4, // "A used_by B" ≈ B builds_on A; forward hop is downstream
  explicit_reference: 0.5,
  coordinates_with: 0.5, // symmetric "relates" family
  interacts_with: 0.5,
  constrains: 0.5,
  constrained_by: 0.5,
  informs: 0.5,
  enables: 0.5,
  route_step: 0.5,
  route_hint: 0.3, // duplicates route_step pairs; lower to avoid double-counting
  landing_on: 0.5,
  current_route_surface: 0.5,
  typical_next_owner: 0.5,
  outline_child: 0.5,
  outline_parent: 0.5,
  outline_next_sibling: 0.3,
  outline_prev_sibling: 0.3,
};
const REVERSE_WEIGHTS: Record<string, number> = {
  'rev:lexical_match': 0.1, // node → its alias fan; kept low or hubs spray mass into leaves
  'rev:builds_on': 0.4,
  'rev:refines': 0.4,
  'rev:prerequisite_for': 0.8, // reverse of a downstream edge walks upstream (builds_on-like)
  'rev:used_by': 0.8,
  'rev:coordinates_with': 0.5, // symmetric relations keep forward weight (digest: rev:relates 0.5)
  'rev:interacts_with': 0.5,
  'rev:route_hint': 0.2,
  'rev:outline_child': 0.2, // outline rev edges duplicate the paired forward relation
  'rev:outline_parent': 0.2,
  'rev:outline_next_sibling': 0.15,
  'rev:outline_prev_sibling': 0.15,
};
const DEFAULT_FORWARD_WEIGHT = 0.5;
const DEFAULT_REVERSE_WEIGHT = 0.4;

function relationWeight(relation: string): number {
  if (relation.startsWith('rev:')) {
    return REVERSE_WEIGHTS[relation] ?? DEFAULT_REVERSE_WEIGHT;
  }
  return FORWARD_WEIGHTS[relation] ?? DEFAULT_FORWARD_WEIGHT;
}

const PR0_ITERS = 40; // build-time global PageRank; fixed count, ~free at 62k edges

export default class GraphPprRetriever implements Retriever {
  readonly name: string;

  private readonly k1: number;
  private readonly b: number;
  private readonly weightTitle: number;
  private readonly weightAlias: number;
  private readonly weightText: number;
  private readonly seedN: number;
  private readonly lexPool: number;
  private readonly walkPool: number;
  private readonly alpha: number;
  private readonly iters: number;
  private readonly rho: number;
  private readonly combine: CombineMode;
  private readonly lambda: number;
  private readonly beta: number;
  private readonly tau: number;
  private readonly walkForIsolated: boolean;
  private readonly walkScoreMode: 'pi' | 'flow';
  private readonly walkGamma: number;
  private readonly useSpec: boolean;
  private readonly uniformEdgeWeights: boolean;

  private bm25!: Bm25f;
  private ids: string[] = [];
  private n = 0;
  // CSR graph (row-normalized edge weights)
  private edgeOffsets!: Int32Array;
  private edgeTargets!: Int32Array;
  private edgeWeights!: Float64Array;
  private edgeCount = 0;
  // Per-node inverse-specificity teleport factor 1/(1+ln(1+deg))
  private spec!: Float64Array;
  // 1 when the node has at least one edge (in or out), else 0
  private connected!: Uint8Array;
  // Lexeme fold pairs: credit π of foldSrc into foldDst with foldShare
  private foldSrc!: Int32Array;
  private foldDst!: Int32Array;
  private foldShare!: Float64Array;
  // Degree-correction denominators pr0_folded(v)^ρ
  private prDenom!: Float64Array;
  // Reusable walk buffers
  private piA!: Float64Array;
  private piB!: Float64Array;
  private piFolded!: Float64Array;

  constructor(options: GraphPprOptions = {}) {
    this.name = options.name ?? 'graph-ppr';
    this.k1 = options.k1 ?? 1.2;
    this.b = options.b ?? 0.75;
    this.weightTitle = options.weightTitle ?? 4.0;
    this.weightAlias = options.weightAlias ?? 3.0;
    this.weightText = options.weightText ?? 1.0;
    this.seedN = options.seedN ?? 32;
    this.lexPool = options.lexPool ?? 100;
    this.walkPool = options.walkPool ?? 100;
    this.alpha = options.alpha ?? 0.5;
    this.iters = options.iters ?? 20;
    this.rho = options.rho ?? 0;
    this.combine = options.combine ?? 'convex';
    this.lambda = options.lambda ?? 0.75;
    this.beta = options.beta ?? 1.0;
    this.tau = options.tau ?? 5.0;
    this.walkForIsolated = options.walkForIsolated ?? false;
    this.walkScoreMode = options.walkScore ?? 'pi';
    this.walkGamma = options.walkGamma ?? 1;
    this.useSpec = options.useSpec ?? true;
    this.uniformEdgeWeights = options.uniformEdgeWeights ?? false;
  }

  build(docs: CorpusDoc[]): BuildInfo {
    const start = performance.now();

    // Fixed node order: codepoint-ascending id (NOT localeCompare).
    const sorted = [...docs].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
    const n = sorted.length;
    this.n = n;
    this.ids = sorted.map((d) => d.id);
    const idToIdx = new Map<string, number>();
    for (let i = 0; i < n; i++) idToIdx.set(this.ids[i]!, i);

    // ---- Lexical index -------------------------------------------------
    const fielded = sorted.map((d) => {
      const title = tokenize(d.id);
      tokenize(d.title, title);
      const alias: string[] = [];
      for (const a of d.aliases) tokenize(a, alias);
      const text = tokenize(d.text);
      return { title, alias, text };
    });
    this.bm25 = new Bm25f({
      k1: this.k1,
      b: this.b,
      weightTitle: this.weightTitle,
      weightAlias: this.weightAlias,
      weightText: this.weightText,
    });
    this.bm25.build(fielded);

    // ---- Graph (CSR, row-normalized relation weights) ------------------
    const degree = new Float64Array(n);
    let edgeCount = 0;
    for (let u = 0; u < n; u++) {
      const doc = sorted[u]!;
      degree[u] = doc.neighbors.length;
      for (const e of doc.neighbors) {
        if (idToIdx.has(e.to)) edgeCount++;
      }
    }
    const offsets = new Int32Array(n + 1);
    const targets = new Int32Array(edgeCount);
    const weights = new Float64Array(edgeCount);
    {
      let cursor = 0;
      for (let u = 0; u < n; u++) {
        offsets[u] = cursor;
        const doc = sorted[u]!;
        let rowSum = 0;
        const rowStart = cursor;
        for (const e of doc.neighbors) {
          const v = idToIdx.get(e.to);
          if (v === undefined) continue;
          const w = this.uniformEdgeWeights ? 1.0 : relationWeight(e.relation);
          targets[cursor] = v;
          weights[cursor] = w;
          rowSum += w;
          cursor++;
        }
        if (rowSum > 0) {
          for (let e = rowStart; e < cursor; e++) weights[e]! /= rowSum;
        }
      }
      offsets[n] = cursor;
    }
    this.edgeOffsets = offsets;
    this.edgeTargets = targets;
    this.edgeWeights = weights;
    this.edgeCount = edgeCount;

    this.spec = new Float64Array(n);
    this.connected = new Uint8Array(n);
    for (let u = 0; u < n; u++) {
      this.spec[u] = 1 / (1 + Math.log(1 + degree[u]!));
      this.connected[u] = degree[u]! > 0 ? 1 : 0;
    }

    // ---- Lexeme fold pairs (lexeme π also credited to its targets) -----
    const fSrc: number[] = [];
    const fDst: number[] = [];
    const fShare: number[] = [];
    for (let u = 0; u < n; u++) {
      const doc = sorted[u]!;
      if (doc.kind !== 'lexeme') continue;
      const targetsOfLexeme: number[] = [];
      for (const e of doc.neighbors) {
        if (e.relation !== 'lexical_match') continue;
        const v = idToIdx.get(e.to);
        if (v !== undefined) targetsOfLexeme.push(v);
      }
      if (targetsOfLexeme.length === 0) continue;
      const share = 1 / targetsOfLexeme.length;
      for (const v of targetsOfLexeme) {
        fSrc.push(u);
        fDst.push(v);
        fShare.push(share);
      }
    }
    this.foldSrc = Int32Array.from(fSrc);
    this.foldDst = Int32Array.from(fDst);
    this.foldShare = Float64Array.from(fShare);

    // ---- Walk buffers + global PageRank for degree correction ----------
    this.piA = new Float64Array(n);
    this.piB = new Float64Array(n);
    this.piFolded = new Float64Array(n);

    const pr0 = this.globalPageRank(PR0_ITERS);
    const pr0Folded = this.fold(pr0, new Float64Array(n));
    this.prDenom = new Float64Array(n);
    for (let v = 0; v < n; v++) {
      this.prDenom[v] = this.rho === 0 ? 1 : Math.pow(pr0Folded[v]!, this.rho);
    }

    const buildMs = performance.now() - start;
    return {
      buildMs,
      docCount: n,
      approxIndexBytes:
        this.bm25.approxBytes + edgeCount * 12 + n * 8 * 6 + this.foldSrc.length * 20,
      notes:
        `bm25f(k1=${this.k1},b=${this.b},wT=${this.weightTitle},wA=${this.weightAlias},wX=${this.weightText},` +
        `terms=${this.bm25.termCount}) + ppr(alpha=${this.alpha},iters=${this.iters},seeds=${this.seedN},` +
        `rho=${this.rho},edges=${edgeCount},foldPairs=${this.foldSrc.length}) ` +
        `combine=${this.combine}(lambda=${this.lambda},beta=${this.beta},gamma=${this.walkGamma}) tau=${this.tau} ` +
        `walkScore=${this.walkScoreMode} useSpec=${this.useSpec} ` +
        `uniformEdges=${this.uniformEdgeWeights} walkForIsolated=${this.walkForIsolated}`,
    };
  }

  query(question: string, k: number): ScoredHit[] {
    try {
      return this.queryInner(question, k);
    } catch {
      // Contract: never throw on weird input — abstain instead.
      return [];
    }
  }

  private queryInner(question: string, k: number): ScoredHit[] {
    const limit = Math.floor(k);
    if (!Number.isFinite(limit) || limit <= 0 || this.n === 0 || typeof question !== 'string') {
      return [];
    }

    // 1) Lexical stage.
    const qTokens = tokenize(question);
    if (qTokens.length === 0) return [];
    const lexHits = this.bm25.search(qTokens, this.lexPool);
    if (lexHits.length === 0) return [];

    // 2) Abstention gate BEFORE walking (negative queries).
    const maxLex = lexHits[0]!.score;
    if (maxLex < this.tau) return [];

    // 3) Teleport vector over top seedN seeds: r ∝ lex · spec.
    const seedCount = Math.min(this.seedN, lexHits.length);
    const seedIdx = new Int32Array(seedCount);
    const seedR = new Float64Array(seedCount);
    let rSum = 0;
    for (let i = 0; i < seedCount; i++) {
      const hit = lexHits[i]!;
      seedIdx[i] = hit.doc;
      const w = hit.score * (this.useSpec ? this.spec[hit.doc]! : 1);
      seedR[i] = w;
      rSum += w;
    }
    if (rSum <= 0) return [];
    for (let i = 0; i < seedCount; i++) seedR[i]! /= rSum;

    // 4) Personalized PageRank, fixed iteration count.
    const { pi, reinject } = this.personalizedPageRank(seedIdx, seedR);

    // 5) Fold lexeme mass into targets (copy, not move).
    const folded = this.fold(pi, this.piFolded);

    // 5b) 'flow' walk statistic: drop each seed's own teleport retention so
    // the walk ranks received graph evidence, not re-expressed lexical rank.
    if (this.walkScoreMode === 'flow') {
      for (let i = 0; i < seedIdx.length; i++) {
        const v = seedIdx[i]!;
        const flow = folded[v]! - reinject * seedR[i]!;
        folded[v] = flow > 0 ? flow : 0;
      }
    }

    // 6) Degree-corrected walk scores; keep top walkPool.
    const walkHits: Array<{ doc: number; score: number }> = [];
    for (let v = 0; v < this.n; v++) {
      const mass = folded[v]!;
      if (mass <= 1e-12) continue;
      if (!this.walkForIsolated && this.connected[v] === 0) continue;
      walkHits.push({ doc: v, score: mass / this.prDenom[v]! });
    }
    walkHits.sort((a, b) => (b.score !== a.score ? b.score - a.score : a.doc - b.doc));
    const walkTop = walkHits.length > this.walkPool ? walkHits.slice(0, this.walkPool) : walkHits;

    // 7) Combine (theoretical-min–max normalization: x / max, min = 0).
    const maxWalk = walkTop.length > 0 ? walkTop[0]!.score : 0;
    const combined = new Map<number, number>();
    const gamma = this.walkGamma;
    const sharpen = (x: number): number => (gamma === 1 ? x : Math.pow(x, gamma));
    if (this.combine === 'convex') {
      for (const h of lexHits) {
        combined.set(h.doc, (this.lambda * h.score) / maxLex);
      }
      if (maxWalk > 0) {
        for (const h of walkTop) {
          const add = (1 - this.lambda) * sharpen(h.score / maxWalk);
          combined.set(h.doc, (combined.get(h.doc) ?? 0) + add);
        }
      }
    } else if (this.combine === 'mult') {
      const walkByDoc = new Map<number, number>();
      if (maxWalk > 0) {
        for (const h of walkTop) walkByDoc.set(h.doc, sharpen(h.score / maxWalk));
      }
      for (const h of lexHits) {
        const wn = walkByDoc.get(h.doc) ?? 0;
        combined.set(h.doc, (h.score / maxLex) * (1 + this.beta * wn));
      }
    } else {
      // 'pure': walk score only (lexical only in the teleport + gate).
      if (maxWalk > 0) {
        for (const h of walkTop) combined.set(h.doc, h.score / maxWalk);
      }
    }

    // 8) Sort (score desc, id asc) and slice.
    const results: ScoredHit[] = [];
    for (const [doc, score] of combined) results.push({ id: this.ids[doc]!, score });
    results.sort((a, b) => (b.score !== a.score ? b.score - a.score : a.id < b.id ? -1 : 1));
    return results.length > limit ? results.slice(0, limit) : results;
  }

  /**
   * π ← (1−α)·r + α·(Wᵀπ + danglingMass·r), exactly `iters` iterations.
   * Also returns the final iteration's teleport reinjection factor
   * (1 − α + α·danglingMass), used by the 'flow' walk statistic.
   */
  private personalizedPageRank(
    seedIdx: Int32Array,
    seedR: Float64Array,
  ): { pi: Float64Array; reinject: number } {
    const n = this.n;
    const alpha = this.alpha;
    const offsets = this.edgeOffsets;
    const targets = this.edgeTargets;
    const weights = this.edgeWeights;
    let pi = this.piA;
    let next = this.piB;
    pi.fill(0);
    for (let i = 0; i < seedIdx.length; i++) pi[seedIdx[i]!] = seedR[i]!;

    let lastReinject = 1 - alpha;
    for (let iter = 0; iter < this.iters; iter++) {
      next.fill(0);
      let dangling = 0;
      for (let u = 0; u < n; u++) {
        const mass = pi[u]!;
        if (mass === 0) continue;
        const rowStart = offsets[u]!;
        const rowEnd = offsets[u + 1]!;
        if (rowStart === rowEnd) {
          dangling += mass;
          continue;
        }
        for (let e = rowStart; e < rowEnd; e++) {
          next[targets[e]!]! += mass * weights[e]!;
        }
      }
      for (let v = 0; v < n; v++) next[v]! *= alpha;
      const reinject = 1 - alpha + alpha * dangling;
      lastReinject = reinject;
      for (let i = 0; i < seedIdx.length; i++) {
        next[seedIdx[i]!]! += reinject * seedR[i]!;
      }
      const tmp = pi;
      pi = next;
      next = tmp;
    }
    return { pi, reinject: lastReinject };
  }

  /** Global PageRank: uniform teleport, same α, fixed iteration count. */
  private globalPageRank(iters: number): Float64Array {
    const n = this.n;
    const alpha = this.alpha;
    const offsets = this.edgeOffsets;
    const targets = this.edgeTargets;
    const weights = this.edgeWeights;
    const uniform = 1 / n;
    let pi = new Float64Array(n).fill(uniform);
    let next = new Float64Array(n);

    for (let iter = 0; iter < iters; iter++) {
      next.fill(0);
      let dangling = 0;
      for (let u = 0; u < n; u++) {
        const mass = pi[u]!;
        if (mass === 0) continue;
        const rowStart = offsets[u]!;
        const rowEnd = offsets[u + 1]!;
        if (rowStart === rowEnd) {
          dangling += mass;
          continue;
        }
        for (let e = rowStart; e < rowEnd; e++) {
          next[targets[e]!]! += mass * weights[e]!;
        }
      }
      const base = (1 - alpha + alpha * dangling) * uniform;
      for (let v = 0; v < n; v++) next[v] = base + alpha * next[v]!;
      const tmp = pi;
      pi = next;
      next = tmp;
    }
    return pi;
  }

  /** folded = π plus each lexeme's mass credited to its lexical_match targets. */
  private fold(pi: Float64Array, out: Float64Array): Float64Array {
    out.set(pi);
    const src = this.foldSrc;
    const dst = this.foldDst;
    const share = this.foldShare;
    for (let i = 0; i < src.length; i++) {
      const mass = pi[src[i]!]!;
      if (mass > 0) out[dst[i]!]! += mass * share[i]!;
    }
    return out;
  }
}
