/**
 * fusion — meta-retriever composing the finished sub-candidates.
 *
 * Composes (per config) bm25f, rri, graph-ppr, trigram-fuzzy, and a second
 * graph-ppr instance in its README-documented experimental pure flow-walk
 * configuration ({combine:'pure', walkScore:'flow', rho:0, walkGamma:1,
 * tau:6} — the exact options of candidates/graph-ppr/ablation/puref-r00.ts,
 * the config whose multi-hop recovery the graph-ppr README reports).
 * Importing sibling candidates is explicitly allowed for this candidate;
 * none of them is modified — the flow variant is constructor configuration
 * documented in the sibling's README.
 *
 * Fusion model — one formula covers every rule ablated in the README:
 *
 *   score(d) = Σ_s  w_s · φ_s(d)          over each source's top-`poolK` list
 *
 * where φ_s is the source's per-query normalized contribution:
 *   'minmax' : score / max_score            (theoretical-min–max, min = 0 —
 *              Bruch, Gai & Ingber, TOIS 2023; preserves score margins, e.g.
 *              bm25f's exact-match bonuses)
 *   'rrf'    : (K+1) / (K + rank)           (reciprocal rank, K = rrfK = 60;
 *              rank 1 → 1.0. With every source on 'rrf' this IS weighted
 *              RRF(k=60) — Cormack, Clarke & Büttcher, SIGIR 2009 — up to a
 *              rank-preserving constant factor)
 *   'borda'  : (P − rank + 1) / P           (linear rank decay over the pool)
 *
 * A per-source `norm` override enables the hybrid lane that won the dev
 * ablation: margin-preserving 'minmax' for the score-calibrated lexical
 * sources plus a rank-based 'rrf' term for the flow walk, whose magnitudes
 * are known-uninformative (graph-ppr README: multi-hop answers sit at walk
 * rank 2–5 with small normalized magnitudes — the two-list Condorcet
 * conflict that pure magnitude fusion cannot resolve).
 *
 * Negative discipline: abstain iff the primary lexical source (bm25f)
 * abstains. bm25f is 10/10 clean on dev negatives and never abstains on a
 * dev positive, so the fused candidate inherits that discipline even though
 * graph-ppr/flow leak on negatives solo.
 *
 * Determinism: every sub-candidate is deterministic per its own README; the
 * fusion adds a fixed source iteration order, fixed accumulation order
 * (source order, then rank order), and a (score DESC, id ASC) tie-break.
 * No Date/random/locale ops anywhere in this file.
 */
import type { BuildInfo, CorpusDoc, Retriever, ScoredHit } from '../../harness/types.js';
import Bm25fRetriever from '../bm25f/index.js';
import GraphPprRetriever from '../graph-ppr/index.js';
import RriRetriever from '../rri/index.js';
import TrigramFuzzyRetriever from '../trigram-fuzzy/index.js';

export type FusionSourceId = 'bm25f' | 'rri' | 'graph-ppr' | 'trigram-fuzzy' | 'flow';
export type FusionNorm = 'minmax' | 'rrf' | 'borda';

export interface FusionSourceSpec {
  id: FusionSourceId;
  /** Fusion weight w_s (only ratios matter for the ranking). */
  weight: number;
  /** Per-source normalization override; defaults to the candidate-wide `norm`. */
  norm?: FusionNorm;
  /** Consume only the source's best `pool` hits (≤ poolK); default poolK. */
  pool?: number;
  /** Per-source RRF constant override (used when this source's norm is 'rrf'). */
  rrfK?: number;
}

export interface FusionOptions {
  /** Leaderboard label override (ablation variants only). */
  name?: string;
  /** Sources to compose, with weights (order fixes accumulation order). */
  sources?: FusionSourceSpec[];
  /** Default normalization rule for sources without their own `norm`. */
  norm?: FusionNorm;
  /** RRF constant K (default 60 per Cormack et al.). */
  rrfK?: number;
  /** Depth requested from every sub-candidate (default 30). */
  poolK?: number;
  /** 'primary': return [] when bm25f returns [] (default). 'none': never gate. */
  gate?: 'primary' | 'none';
}

/**
 * Winning dev configuration (README ablation row `w5a-full-f02`): convex
 * combination on min–max-normalized scores over {bm25f 0.7, graph-ppr 0.3,
 * rri 0.1, trigram-fuzzy 0.1} plus the flow-walk multi-hop lane as a
 * rank-based term 0.2·(11/(10+rank)) (norm 'rrf' with K=10 — steeper than
 * the canonical K=60 so only the walk's confident top ranks carry weight),
 * gated on bm25f abstention. Dev: R@5 91.4% · MRR .842 · neg 10/10.
 */
const DEFAULT_SOURCES: FusionSourceSpec[] = [
  { id: 'bm25f', weight: 0.7, norm: 'minmax' },
  { id: 'graph-ppr', weight: 0.3, norm: 'minmax' },
  { id: 'rri', weight: 0.1, norm: 'minmax' },
  { id: 'trigram-fuzzy', weight: 0.1, norm: 'minmax' },
  { id: 'flow', weight: 0.2, norm: 'rrf', rrfK: 10 },
];

function makeSource(id: FusionSourceId): Retriever {
  switch (id) {
    case 'bm25f':
      return new Bm25fRetriever();
    case 'rri':
      return new RriRetriever();
    case 'graph-ppr':
      return new GraphPprRetriever();
    case 'trigram-fuzzy':
      return new TrigramFuzzyRetriever();
    case 'flow':
      // The sibling README's documented experimental pure flow-walk options
      // (= ablation/puref-r00.ts). Configuration only; sibling code untouched.
      return new GraphPprRetriever({
        name: 'graph-ppr-flow',
        combine: 'pure',
        walkScore: 'flow',
        rho: 0,
        walkGamma: 1,
        tau: 6,
      });
  }
}

export default class FusionRetriever implements Retriever {
  readonly name: string;

  private readonly specs: FusionSourceSpec[];
  private readonly retrievers: Retriever[];
  private readonly norm: FusionNorm;
  private readonly rrfK: number;
  private readonly poolK: number;
  private readonly gate: 'primary' | 'none';
  private readonly primaryIndex: number;
  private built = false;

  constructor(options: FusionOptions = {}) {
    this.name = options.name ?? 'fusion';
    this.specs = options.sources ?? DEFAULT_SOURCES;
    if (this.specs.length === 0) throw new Error('fusion: at least one source required');
    this.retrievers = this.specs.map((s) => makeSource(s.id));
    this.norm = options.norm ?? 'minmax';
    this.rrfK = options.rrfK ?? 60;
    this.poolK = options.poolK ?? 30;
    this.gate = options.gate ?? 'primary';
    const primary = this.specs.findIndex((s) => s.id === 'bm25f');
    this.primaryIndex = primary >= 0 ? primary : 0;
  }

  async build(docs: CorpusDoc[]): Promise<BuildInfo> {
    const start = performance.now();
    const parts: string[] = [];
    let approxIndexBytes = 0;
    // Sequential on purpose: sub-candidates are memory-heavy at build time and
    // their own buildMs numbers stay attributable.
    for (const retriever of this.retrievers) {
      const subStart = performance.now();
      const info = await retriever.build(docs);
      const subMs = info.buildMs || performance.now() - subStart;
      approxIndexBytes += info.approxIndexBytes ?? 0;
      parts.push(`${retriever.name}=${Math.round(subMs)}ms`);
    }
    this.built = true;
    return {
      buildMs: performance.now() - start,
      docCount: docs.length,
      approxIndexBytes,
      notes:
        `sub-builds: ${parts.join(', ')}; rule=${this.norm} rrfK=${this.rrfK} poolK=${this.poolK} ` +
        `gate=${this.gate} sources=[${this.specs
          .map(
            (s) =>
              `${s.id}:${s.weight}${s.norm ? `(${s.norm}${s.rrfK !== undefined ? ` K=${s.rrfK}` : ''}${s.pool !== undefined ? ` pool=${s.pool}` : ''})` : ''}`,
          )
          .join(', ')}]`,
    };
  }

  async query(question: string, k: number): Promise<ScoredHit[]> {
    try {
      return await this.queryInner(question, k);
    } catch {
      return []; // contract: never throw on weird input
    }
  }

  private async queryInner(question: string, k: number): Promise<ScoredHit[]> {
    const limit = Math.floor(k);
    if (!this.built || typeof question !== 'string' || !Number.isFinite(limit) || limit <= 0) {
      return [];
    }

    // 1) Query every source at pool depth (latency ≈ sum of sub-latencies).
    const lists: ScoredHit[][] = [];
    for (const retriever of this.retrievers) {
      lists.push(await retriever.query(question, this.poolK));
    }

    // 2) Abstention gate: the primary lexical source decides negatives.
    if (this.gate === 'primary' && lists[this.primaryIndex]!.length === 0) return [];

    // 3) Fuse. Accumulation order is fixed (source order, then rank order).
    const fused = new Map<string, number>();
    for (let s = 0; s < this.specs.length; s++) {
      const spec = this.specs[s]!;
      const hits = lists[s]!;
      if (hits.length === 0 || spec.weight === 0) continue;
      const norm = spec.norm ?? this.norm;
      const max = hits[0]!.score; // contract: best first
      const pool = spec.pool !== undefined ? Math.min(spec.pool, hits.length) : hits.length;
      for (let r = 0; r < pool; r++) {
        const hit = hits[r]!;
        let phi: number;
        if (norm === 'minmax') {
          phi = max > 0 ? hit.score / max : 0;
        } else if (norm === 'rrf') {
          const kk = spec.rrfK ?? this.rrfK;
          phi = (kk + 1) / (kk + r + 1);
        } else {
          phi = (pool - r) / pool;
        }
        if (phi <= 0) continue;
        fused.set(hit.id, (fused.get(hit.id) ?? 0) + spec.weight * phi);
      }
    }

    // 4) Sort (score DESC, id ASC) and slice.
    const out: ScoredHit[] = [];
    for (const [id, score] of fused) out.push({ id, score });
    out.sort((a, b) => (b.score !== a.score ? b.score - a.score : a.id < b.id ? -1 : 1));
    return out.length > limit ? out.slice(0, limit) : out;
  }
}
