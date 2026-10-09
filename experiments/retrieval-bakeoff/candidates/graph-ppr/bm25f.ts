/**
 * Compact fielded BM25 ("simple BM25F", Zaragoza et al. 2004 flavor) used as
 * the lexical seeding stage of the graph-ppr candidate. Self-contained: no
 * imports from other candidates or src/.
 *
 * Score(d, q) = Σ_t qtf(t) · idf(t) · tf̃(t,d) / (k1 + tf̃(t,d))
 *   tf̃(t,d)  = Σ_f w_f · tf_f(t,d) / B_f(d)
 *   B_f(d)   = (1 − b) + b · len_f(d) / avgLen_f
 *   idf(t)   = ln(1 + (N − df + 0.5) / (df + 0.5))       (Robertson, ≥ ~0)
 *
 * Fields: title (doc id tokens + title tokens), alias (all alias strings),
 * text (full searchable text). df counts a term once per doc across fields.
 *
 * Determinism: postings are built in ascending doc-index order; scoring uses
 * f64 accumulators; ties are broken by ascending doc index by the caller's
 * comparator (doc indices are assigned in ascending id order).
 */

export interface Bm25fParams {
  k1: number;
  b: number;
  weightTitle: number;
  weightAlias: number;
  weightText: number;
}

export interface FieldedDocTokens {
  title: string[];
  alias: string[];
  text: string[];
}

export interface LexHit {
  doc: number;
  score: number;
}

// Packed per-doc term counts: title tf in bits 0-5, alias tf in bits 6-11,
// text tf in bits 12+. Title/alias tfs are clamped at 63, text tf at 2^19-1;
// clamping is deterministic and harmless at these magnitudes.
const TITLE_SHIFT = 0;
const ALIAS_SHIFT = 6;
const TEXT_SHIFT = 12;
const SMALL_MAX = 63;
const TEXT_MAX = (1 << 19) - 1;

interface Posting {
  docs: number[];
  packed: number[];
}

export class Bm25f {
  private readonly params: Bm25fParams;
  private postings = new Map<string, Posting>();
  private docCount = 0;
  private lenTitle!: Float64Array;
  private lenAlias!: Float64Array;
  private lenText!: Float64Array;
  private avgTitle = 1;
  private avgAlias = 1;
  private avgText = 1;
  private scoreBuf!: Float64Array;
  private postingEntries = 0;

  constructor(params: Bm25fParams) {
    this.params = params;
  }

  /** Index the docs; doc index = array position (caller sorts by id first). */
  build(docs: FieldedDocTokens[]): void {
    const n = docs.length;
    this.docCount = n;
    this.lenTitle = new Float64Array(n);
    this.lenAlias = new Float64Array(n);
    this.lenText = new Float64Array(n);
    this.scoreBuf = new Float64Array(n);

    for (let d = 0; d < n; d++) {
      const doc = docs[d]!;
      this.lenTitle[d] = doc.title.length;
      this.lenAlias[d] = doc.alias.length;
      this.lenText[d] = doc.text.length;

      const local = new Map<string, number>();
      for (const t of doc.title) {
        const cur = local.get(t) ?? 0;
        if (((cur >> TITLE_SHIFT) & SMALL_MAX) < SMALL_MAX) local.set(t, cur + (1 << TITLE_SHIFT));
        else local.set(t, cur);
      }
      for (const t of doc.alias) {
        const cur = local.get(t) ?? 0;
        if (((cur >> ALIAS_SHIFT) & SMALL_MAX) < SMALL_MAX) local.set(t, cur + (1 << ALIAS_SHIFT));
        else local.set(t, cur);
      }
      for (const t of doc.text) {
        const cur = local.get(t) ?? 0;
        if (cur >> TEXT_SHIFT < TEXT_MAX) local.set(t, cur + (1 << TEXT_SHIFT));
        else local.set(t, cur);
      }

      for (const [term, packed] of local) {
        let post = this.postings.get(term);
        if (!post) {
          post = { docs: [], packed: [] };
          this.postings.set(term, post);
        }
        post.docs.push(d);
        post.packed.push(packed);
        this.postingEntries++;
      }
    }

    let st = 0;
    let sa = 0;
    let sx = 0;
    for (let d = 0; d < n; d++) {
      st += this.lenTitle[d]!;
      sa += this.lenAlias[d]!;
      sx += this.lenText[d]!;
    }
    this.avgTitle = n > 0 && st > 0 ? st / n : 1;
    this.avgAlias = n > 0 && sa > 0 ? sa / n : 1;
    this.avgText = n > 0 && sx > 0 ? sx / n : 1;
  }

  get approxBytes(): number {
    // postings entries: two JS numbers; term keys ~ 24 bytes avg overhead.
    return this.postingEntries * 16 + this.postings.size * 64 + this.docCount * 8 * 4;
  }

  get termCount(): number {
    return this.postings.size;
  }

  /**
   * Score the query tokens, return top-N hits (score desc, doc index asc).
   * Repeated query terms act as a qtf multiplier.
   */
  search(queryTokens: string[], topN: number): LexHit[] {
    if (this.docCount === 0 || queryTokens.length === 0) return [];
    const { k1, b, weightTitle, weightAlias, weightText } = this.params;
    const n = this.docCount;

    const qtf = new Map<string, number>();
    for (const t of queryTokens) qtf.set(t, (qtf.get(t) ?? 0) + 1);

    const scores = this.scoreBuf;
    const touched: number[] = [];

    for (const [term, tCount] of qtf) {
      const post = this.postings.get(term);
      if (!post) continue;
      const df = post.docs.length;
      const idf = Math.log(1 + (n - df + 0.5) / (df + 0.5));
      if (idf <= 0) continue;
      const w = tCount * idf;
      const docsArr = post.docs;
      const packedArr = post.packed;
      for (let i = 0; i < docsArr.length; i++) {
        const d = docsArr[i]!;
        const packed = packedArr[i]!;
        const tfT = (packed >> TITLE_SHIFT) & SMALL_MAX;
        const tfA = (packed >> ALIAS_SHIFT) & SMALL_MAX;
        const tfX = packed >> TEXT_SHIFT;
        let tf = 0;
        if (tfT > 0) tf += (weightTitle * tfT) / (1 - b + (b * this.lenTitle[d]!) / this.avgTitle);
        if (tfA > 0) tf += (weightAlias * tfA) / (1 - b + (b * this.lenAlias[d]!) / this.avgAlias);
        if (tfX > 0) tf += (weightText * tfX) / (1 - b + (b * this.lenText[d]!) / this.avgText);
        if (scores[d] === 0) touched.push(d);
        scores[d]! += (w * tf) / (k1 + tf);
      }
    }

    const hits: LexHit[] = [];
    for (const d of touched) {
      const s = scores[d]!;
      scores[d] = 0; // reset buffer for the next query
      if (s > 0) hits.push({ doc: d, score: s });
    }
    hits.sort((a, b2) => (b2.score !== a.score ? b2.score - a.score : a.doc - b2.doc));
    return hits.length > topN ? hits.slice(0, topN) : hits;
  }
}
