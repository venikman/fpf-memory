/**
 * Retrieval bake-off contract. Every candidate implements `Retriever` and is
 * registered in `harness/registry.ts`. The harness owns corpus loading, gold
 * cases, metrics, and timing — candidates own indexing and ranking only.
 *
 * Hard rules for candidates:
 * - Deterministic: same corpus + same question => byte-identical ranked IDs.
 *   No Date.now()/Math.random() influencing results, no network, no
 *   locale-dependent string ops (use explicit lowercasing, not toLocaleLowerCase).
 * - Self-contained: no new npm dependencies. Plain TypeScript, Bun built-ins ok.
 * - No gold-peeking: candidates never read anything under gold/.
 */

export type NodeKind = 'pattern' | 'route' | 'lexeme' | 'preface';

export interface CorpusDoc {
  id: string;
  kind: NodeKind;
  title: string;
  aliases: string[];
  part?: string;
  status?: string;
  /** Full searchable text of the node as compiled by the runtime. */
  text: string;
  /** Outgoing typed edges (deduped, includes reverse edges tagged with `rev:` prefix). */
  neighbors: Array<{ to: string; relation: string }>;
}

export interface BuildInfo {
  buildMs: number;
  docCount: number;
  /** Rough in-memory footprint of the index if the candidate can estimate it. */
  approxIndexBytes?: number;
  /** Free-form notes: parameter choices, counts, anything worth putting in the report. */
  notes?: string;
}

export interface ScoredHit {
  id: string;
  score: number;
}

export interface Retriever {
  /** Unique kebab-case name; must match the candidate directory name. */
  name: string;
  build(docs: CorpusDoc[]): Promise<BuildInfo> | BuildInfo;
  /** Return the top-k docs, best first. Fewer than k is fine. Never throws on weird input. */
  query(question: string, k: number): Promise<ScoredHit[]> | ScoredHit[];
}

export type GoldCategory =
  | 'id-lookup' // question contains the FPF ID itself
  | 'title' // question quotes or closely mirrors the node title
  | 'alias' // question uses an alias / alternate name, not the title
  | 'definition' // "what is X" style, X being a concept term
  | 'paraphrase' // reworded description, low token overlap with the title
  | 'typo' // deterministic misspellings of otherwise easy queries
  | 'task' // "how do I / which pattern helps with <situation>"
  | 'multi-hop' // needs a related node, not the one literally mentioned
  | 'negative'; // low-signal nonsense; expected = [] (credit for returning weak/no results)

export interface GoldCase {
  id: string;
  question: string;
  /**
   * Acceptable answer IDs (equivalence set). Scoring: a case is "hit at k" when
   * ANY expected ID appears in the top-k. MRR uses the best rank among them.
   * Empty array = negative case (scored separately, not part of recall/MRR).
   */
  expectedIds: string[];
  category: GoldCategory;
  source: 'generated' | 'handcrafted';
  /** Where the case came from (generator rule name, or spec section consulted). */
  provenance?: string;
}

export interface CaseResult {
  caseId: string;
  category: GoldCategory;
  rank: number | null; // best 1-based rank of any expected ID within top-k, null = miss
  latencyMs: number;
  topIds: string[];
}

export interface CandidateReport {
  name: string;
  build: BuildInfo;
  goldSet: string;
  k: number;
  cases: CaseResult[];
  metrics: {
    n: number;
    recallAt1: number;
    recallAt5: number;
    recallAt10: number;
    mrrAt10: number;
    ndcgAt10: number;
    /** Negative-case discipline: fraction of negative cases with empty or sub-threshold results. */
    negativeCleanRate: number | null;
    latency: { p50Ms: number; p95Ms: number; meanMs: number };
    perCategory: Record<string, { n: number; recallAt5: number; mrrAt10: number }>;
  };
  deterministic: boolean;
}
