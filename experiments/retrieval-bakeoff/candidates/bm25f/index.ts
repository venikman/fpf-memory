/**
 * bm25f — fielded BM25+ lexical candidate, implementing the recommended recipe
 * of research/lexical.md §(a) ("bm25f-plus"):
 *
 *   - four streams per doc (id / title / aliases / body), lexeme anchor-text
 *     folded into the target's aliases stream (Robertson & Zaragoza 2009 §3.6);
 *   - BM25F-style weighted TF combined across fields BEFORE one shared
 *     saturation, per-field length normalization (R&Z 2009 Eq. 3.19–3.21);
 *   - Lucene non-negative IDF `ln(1 + (N - df + 0.5)/(df + 0.5))` (Kamphuis
 *     et al., ECIR 2020);
 *   - BM25+ delta lower bound, applied only when the term is present
 *     (Lv & Zhai, CIKM 2011) — the corpus has a ~4000:1 body-length skew that
 *     classic BM25 over-penalizes;
 *   - SDM-lite proximity blend 0.85/0.10/0.05 with ordered bigrams and
 *     unordered windows of 8 over body positions (Metzler & Croft, SIGIR 2005);
 *   - exact-match bonuses (id / title-or-alias / title phrase);
 *   - SymSpell deletion-distance-1 typo bridge for df=0 query terms;
 *   - Lucene-style soft coordination and an abstention gate for the negative
 *     category.
 *
 * Everything is deterministic: sorted term iteration, fixed field order for
 * float accumulation, (score DESC, id ASC) final ties, literal constant
 * parameter tables, no Date/random/locale ops.
 */

import type { BuildInfo, CorpusDoc, Retriever, ScoredHit } from '../../harness/types.js';
import { selfCheckPorter2 } from './porter2.js';
import { canon, LUCENE_STOPWORDS, QUERY_ONLY_STOPWORDS, stemWord, tokenize } from './tokenizer.js';

export interface Bm25fParams {
  /** TF saturation. Digest table: 1.5 (canonical 1.2<k1<2, R&Z 2009 §3.4.4); re-swept on dev. */
  k1: number;
  /** BM25+ lower bound added after saturation, only when tfw>0 (Lv & Zhai 2011). */
  delta: number;
  /** Field weights [id, title, aliases, body] (digest: 10/6/5/1). */
  weights: readonly [number, number, number, number];
  /** Per-field length-normalization b [id, title, aliases, body] (digest: 0/0.6/0.6/0.5, b_body swept). */
  b: readonly [number, number, number, number];
  /** SDM blend lambdas (Metzler & Croft 2005: 0.85/0.10/0.05). */
  lambdaUni: number;
  lambdaOrd: number;
  lambdaUnord: number;
  /** Unordered co-occurrence window in body positions (Metzler & Croft: 8). */
  unordWindow: number;
  /** Exact-match bonuses (digest §a.4.2: 1000 / 100 / 20). */
  bonusExactId: number;
  bonusExactTitleAlias: number;
  bonusTitlePhrase: number;
  /**
   * Bonus when the query (or a quoted span) CONTAINS a token equal to a doc's
   * id without being exactly that id. Extension of the digest's exact-id rule
   * for the id-lookup style "Explain E.11 …" (cf. the runtime's exact-ID
   * heuristic that the digest's w_id row cites); measured on dev, see README.
   */
  bonusContainedId: number;
  /** Soft coordination: multiply by (coordBase + coordSlope*coord); abstain per-doc below coordFloor. */
  coordBase: number;
  coordSlope: number;
  coordFloor: number;
  /** Global abstention threshold on the best final score (swept on dev negatives). */
  tau: number;
  /**
   * Doc-kind score multipliers (digest §b.1 endorses kind multipliers; the
   * production scorer down-weights lexemes the same way). 8.4k tiny alias
   * stubs duplicate their target's name and out-inflate it on short fields;
   * swept on dev at category level.
   */
  lexemeMultiplier: number;
  prefaceMultiplier: number;
}

/**
 * Frozen parameters. Start values are research/lexical.md §(a)'s table; the
 * dev grid sweep (README.md, category-level only) moved exactly three of them:
 * b_body 0.5 -> 0.3, delta 1.0 -> 0.15, tau 1.0 -> 12; and set the kind
 * multipliers (0.9 lexeme / 0.8 preface). k1 re-swept and CONFIRMED at 1.5.
 */
export const DEFAULT_PARAMS: Bm25fParams = {
  k1: 1.5, // digest default, re-swept {0.9..3.0} after all changes -> 1.5 stands
  delta: 0.15, // digest 1.0; swept {0.1..1.0}: mega-docs (324KB) collected idf*delta for every filler word
  weights: [10, 6, 5, 1], // digest defaults (R&Z 2009 Table 3.1 scaled)
  b: [0, 0.6, 0.6, 0.3], // b_body swept {0.25..0.75} -> 0.3 (digest predicted the LOW end)
  lambdaUni: 0.85, // Metzler & Croft 2005
  lambdaOrd: 0.1,
  lambdaUnord: 0.05,
  unordWindow: 8, // Metzler & Croft 2005
  bonusExactId: 1000, // digest §a.4.2
  bonusExactTitleAlias: 100, // digest §a.4.2
  bonusTitlePhrase: 20, // digest §a.4.2
  coordBase: 0.25, // digest §a.4.3 (soft Lucene coord)
  coordSlope: 0.75,
  coordFloor: 0.34, // digest §a.4.3, applied to idf-weighted coord (README D3)
  tau: 12, // dev margin: leaking negatives peak at 8.6, weakest positive at 15.2 -> mid-margin
  bonusContainedId: 50, // README D5 (id-in-query pin, cf. runtime exact-ID heuristic)
  lexemeMultiplier: 0.9, // swept {1.0, 0.9, 0.8} -> 0.9 (README D6; digest §b.1 kind multipliers)
  prefaceMultiplier: 0.8, // swept {1.0, 0.9, 0.8} -> 0.8
};

const FIELD_COUNT = 4; // 0=id, 1=title, 2=aliases, 3=body
const BODY = 3;
const MAX_COORD_GROUPS = 30;

interface TermEntry {
  df: number;
  cf: number;
  /** Per-field flat postings: [docIdx, tf, docIdx, tf, ...] in ascending docIdx order. */
  posts: [number[] | null, number[] | null, number[] | null, number[] | null];
  /** Body positions, flat groups: [docIdx, count, p0..p(count-1), docIdx, ...]. */
  bodyPos: number[] | null;
  /** Build helper: last docIdx that contributed to df. */
  lastDoc: number;
}

export default class Bm25fRetriever implements Retriever {
  readonly name = 'bm25f';

  private params: Bm25fParams;
  private vocab = new Map<string, TermEntry>();
  private docIds: string[] = [];
  private docCount = 0;
  private lens: Uint32Array[] = [];
  private avglen: number[] = [];
  private invB: Float64Array[] = [];
  private canonIdMap = new Map<string, number>();
  private canonTitleAlias = new Map<string, number[]>();
  /** Title-only equality map (quoted-span bonus targets titles, not alias holders — README D4). */
  private canonTitle = new Map<string, number[]>();
  private titleNeedle: string[] = [];
  /** Collection frequency of raw (pre-stem) surface forms — the typo bridge's vocabulary. */
  private rawCf = new Map<string, number>();
  /** Best raw form per deletion-1 key (by raw cf desc, then lexicographic) for the typo bridge. */
  private delMap = new Map<string, string>();
  /** Whole-id token form -> docIdx (covers dotted AND namespaced ids). */
  private idTokenMap = new Map<string, number>();
  /** 0 = pattern/route, 1 = lexeme, 2 = preface. */
  private kindOf = new Uint8Array(0);
  private bridgeCache = new Map<string, string | null>();
  private built = false;
  private foldedCount = 0;

  // Query-time scratch (stamped arrays avoid per-query clears; stamps never affect scores).
  private scoreArr = new Float64Array(0);
  private maskArr = new Int32Array(0);
  private scoreStamp = new Int32Array(0);
  private bonusArr = new Uint8Array(0);
  private tfwArr = new Float64Array(0);
  private tfwStamp = new Int32Array(0);
  private queryStamp = 0;
  private termStamp = 0;

  constructor(overrides?: Partial<Bm25fParams>) {
    this.params = { ...DEFAULT_PARAMS, ...overrides };
  }

  /**
   * Dev-tuning hook (grid sweeps rebuild-free): replaces parameters and
   * recomputes the per-field normalizers. Never called by the harness.
   */
  applyParams(overrides: Partial<Bm25fParams>): void {
    this.params = { ...this.params, ...overrides };
    if (this.built) this.computeNormalizers();
  }

  build(docs: CorpusDoc[]): BuildInfo {
    const start = performance.now();
    const stemmerFailures = selfCheckPorter2();
    if (stemmerFailures.length > 0) {
      throw new Error(`porter2 frozen-vector self-check failed:\n${stemmerFailures.join('\n')}`);
    }

    const n = docs.length;
    this.docCount = n;
    this.docIds = docs.map((d) => d.id);
    this.lens = Array.from({ length: FIELD_COUNT }, () => new Uint32Array(n));
    this.titleNeedle = new Array<string>(n);
    this.kindOf = new Uint8Array(n);
    for (let d = 0; d < n; d++) {
      const kind = docs[d]!.kind;
      this.kindOf[d] = kind === 'lexeme' ? 1 : kind === 'preface' ? 2 : 0;
    }

    // --- Anchor-text fold: lexeme titles -> target doc's aliases stream. ---
    // Deterministic order: lexemes arrive corpus-sorted by id; forward
    // (non-`rev:`) edges only. Folding the lexeme *title* (its surface form)
    // rather than its full text keeps hub lexemes (up to ~150 targets, and
    // aliases lists of 70–115 entries) from spraying target-title text into
    // every pattern; lexeme.text in this corpus is title + target titles, so
    // title-only is the true anchor text. Lexemes stay in the index as docs.
    const folds = new Map<string, Array<{ lexId: string; title: string }>>();
    const docIdxById = new Map<string, number>();
    docs.forEach((d, i) => docIdxById.set(d.id, i));
    for (const doc of docs) {
      if (doc.kind !== 'lexeme' || doc.title.length === 0) continue;
      const seenTargets = new Set<string>();
      for (const edge of doc.neighbors) {
        if (edge.relation.startsWith('rev:')) continue;
        if (!docIdxById.has(edge.to) || seenTargets.has(edge.to)) continue;
        seenTargets.add(edge.to);
        let list = folds.get(edge.to);
        if (!list) folds.set(edge.to, (list = []));
        list.push({ lexId: doc.id, title: doc.title });
      }
    }

    // --- Main indexing pass. ---
    const fieldCounts: Array<Map<string, number>> = Array.from({ length: FIELD_COUNT }, () => new Map());
    const bodyPositions = new Map<string, number[]>();
    for (let d = 0; d < n; d++) {
      const doc = docs[d]!;

      // Exact-match tables (canonical, unstemmed — digest §c: bonuses never mix with stems).
      const idCanon = canon(doc.id);
      if (idCanon.length > 0 && !this.canonIdMap.has(idCanon)) this.canonIdMap.set(idCanon, d);
      const exactCanons = new Set<string>();
      const titleCanon = canon(doc.title);
      if (titleCanon.length > 0) {
        exactCanons.add(titleCanon);
        let tlist = this.canonTitle.get(titleCanon);
        if (!tlist) this.canonTitle.set(titleCanon, (tlist = []));
        tlist.push(d);
      }
      for (const alias of doc.aliases) {
        const c = canon(alias);
        if (c.length > 0) exactCanons.add(c);
      }

      // Aliases stream: own aliases + deduped folded lexeme titles (sorted by lexeme id).
      const aliasParts: string[] = [...doc.aliases];
      const foldList = folds.get(doc.id);
      if (foldList) {
        foldList.sort((a, b) => (a.lexId < b.lexId ? -1 : a.lexId > b.lexId ? 1 : 0));
        const seen = new Set<string>(exactCanons);
        seen.add(idCanon);
        for (const fold of foldList) {
          const c = canon(fold.title);
          if (c.length === 0 || seen.has(c)) continue; // skip pure duplicates of title/id/aliases
          seen.add(c);
          aliasParts.push(fold.title);
          exactCanons.add(c); // folded titles are aliases for the exact-match bonus too
          this.foldedCount++;
        }
      }
      for (const c of exactCanons) {
        let list = this.canonTitleAlias.get(c);
        if (!list) this.canonTitleAlias.set(c, (list = []));
        list.push(d);
      }

      // Tokenize the four streams.
      for (const map of fieldCounts) map.clear();
      bodyPositions.clear();
      const streams = [doc.id, doc.title, aliasParts.join('\n'), doc.text] as const;
      const titleTerms: string[] = [];
      for (let f = 0; f < FIELD_COUNT; f++) {
        const { tokens } = tokenize(streams[f]!, false);
        const counts = fieldCounts[f]!;
        for (const t of tokens) {
          counts.set(t.term, (counts.get(t.term) ?? 0) + 1);
          this.rawCf.set(t.raw, (this.rawCf.get(t.raw) ?? 0) + 1);
          if (f === BODY) {
            let list = bodyPositions.get(t.term);
            if (!list) bodyPositions.set(t.term, (list = []));
            list.push(t.pos);
          }
          if (f === 1 && t.primary) titleTerms.push(t.term);
        }
        if (f === 0 && tokens.length > 0 && !this.idTokenMap.has(tokens[0]!.term)) {
          this.idTokenMap.set(tokens[0]!.term, d);
        }
        this.lens[f]![d] = tokens.length;
      }
      this.titleNeedle[d] = titleTerms.length > 0 ? ` ${titleTerms.join(' ')} ` : '';

      // Flush into the global vocabulary (field order fixed: id, title, aliases, body).
      for (let f = 0; f < FIELD_COUNT; f++) {
        for (const [term, tf] of fieldCounts[f]!) {
          let entry = this.vocab.get(term);
          if (!entry) {
            entry = { df: 0, cf: 0, posts: [null, null, null, null], bodyPos: null, lastDoc: -1 };
            this.vocab.set(term, entry);
          }
          if (entry.lastDoc !== d) {
            entry.lastDoc = d;
            entry.df++;
          }
          entry.cf += tf;
          (entry.posts[f] ??= []).push(d, tf);
          if (f === BODY) {
            const positions = bodyPositions.get(term)!;
            const bp = (entry.bodyPos ??= []);
            bp.push(d, positions.length);
            for (const p of positions) bp.push(p);
          }
        }
      }
    }

    // --- Per-field average lengths & normalizers. ---
    this.avglen = this.lens.map((arr) => {
      let sum = 0;
      for (let i = 0; i < n; i++) sum += arr[i]!;
      return sum > 0 ? sum / n : 1;
    });
    this.computeNormalizers();

    // --- SymSpell deletion-distance-1 map (typo bridge, digest §a.1.6). ---
    // Built over RAW (pre-stem) surface forms: misspellings derail the
    // stemmer, so edit distance must be measured before stemming (README).
    // Only the best candidate per key is kept (max over union == max over
    // per-key winners, so lookups stay exact while memory stays flat).
    const sortedRaws = [...this.rawCf.keys()].sort();
    for (const raw of sortedRaws) {
      if (raw.length < 3) continue;
      const cf = this.rawCf.get(raw)!;
      for (let i = 0; i < raw.length; i++) {
        const variant = raw.slice(0, i) + raw.slice(i + 1);
        const incumbent = this.delMap.get(variant);
        if (incumbent === undefined) {
          this.delMap.set(variant, raw);
        } else {
          const incumbentCf = this.rawCf.get(incumbent)!;
          if (cf > incumbentCf || (cf === incumbentCf && raw < incumbent)) {
            this.delMap.set(variant, raw);
          }
        }
      }
    }

    // Query-time scratch.
    this.scoreArr = new Float64Array(n);
    this.maskArr = new Int32Array(n);
    this.scoreStamp = new Int32Array(n);
    this.bonusArr = new Uint8Array(n);
    this.tfwArr = new Float64Array(n);
    this.tfwStamp = new Int32Array(n);
    this.built = true;

    let approxIndexBytes = 0;
    for (const [term, entry] of this.vocab) {
      approxIndexBytes += term.length * 2 + 64;
      for (const posts of entry.posts) if (posts) approxIndexBytes += posts.length * 8;
      if (entry.bodyPos) approxIndexBytes += entry.bodyPos.length * 8;
    }
    for (const [k, v] of this.delMap) approxIndexBytes += (k.length + v.length) * 2 + 48;

    const p = this.params;
    return {
      buildMs: performance.now() - start,
      docCount: n,
      approxIndexBytes,
      notes:
        `fielded BM25+ per research/lexical.md §(a): k1=${p.k1} delta=${p.delta} ` +
        `w=[${p.weights.join(',')}] b=[${p.b.join(',')}] sdm=${p.lambdaUni}/${p.lambdaOrd}/${p.lambdaUnord} ` +
        `tau=${p.tau} coordFloor=${p.coordFloor}; vocab=${this.vocab.size} terms, ` +
        `${this.foldedCount} lexeme titles folded as anchor text, delMap=${this.delMap.size} keys`,
    };
  }

  private computeNormalizers(): void {
    const n = this.docCount;
    this.invB = [];
    for (let f = 0; f < FIELD_COUNT; f++) {
      const arr = new Float64Array(n);
      const b = this.params.b[f]!;
      const avg = this.avglen[f]!;
      const lens = this.lens[f]!;
      for (let d = 0; d < n; d++) {
        arr[d] = 1 / (1 - b + (b * lens[d]!) / avg);
      }
      this.invB.push(arr);
    }
  }

  private idf(df: number): number {
    return Math.log(1 + (this.docCount - df + 0.5) / (df + 0.5));
  }

  /**
   * Deletion-distance-1 raw-space repair candidates, best first
   * (collection frequency desc, then lexicographic), capped at 8.
   */
  private candidatesForRaw(rawForm: string): string[] {
    if (rawForm.length < 2) return [];
    const set = new Set<string>();
    const fromKey = this.delMap.get(rawForm); // insertion (corpus form one char longer)
    if (fromKey !== undefined) set.add(fromKey);
    for (let i = 0; i < rawForm.length; i++) {
      const variant = rawForm.slice(0, i) + rawForm.slice(i + 1);
      if (this.rawCf.has(variant)) set.add(variant); // deletion
      const viaShared = this.delMap.get(variant); // substitution/transposition via shared key
      if (viaShared !== undefined && viaShared.length === rawForm.length) set.add(viaShared);
    }
    return [...set]
      .sort(
        (a, b) =>
          (this.rawCf.get(b) ?? 0) - (this.rawCf.get(a) ?? 0) || (a < b ? -1 : a > b ? 1 : 0),
      )
      .slice(0, 8);
  }

  /** Raw repair winner re-stemmed into an index term (id-shaped forms index unstemmed), or null. */
  private bridge(rawForm: string): string | null {
    const cached = this.bridgeCache.get(rawForm);
    if (cached !== undefined) return cached;
    const top = this.candidatesForRaw(rawForm)[0];
    const result =
      top === undefined ? null : top.includes('.') || top.includes(':') ? top : stemWord(top);
    this.bridgeCache.set(rawForm, result);
    return result;
  }

  /**
   * Span repair (README D4b): given a canonical span whose words include df=0
   * forms, search the small cartesian space of per-word repair candidates for
   * a combination that lands exactly on a known title/alias/id canon
   * ("exacct ploicy" -> "exact policy"). Deterministic odometer order over
   * cf-ranked candidates; first hit wins. Null when nothing lands.
   */
  private repairSpanCanon(sc: string): { canon: string; wordRepairs: Map<string, string> } | null {
    const words = sc.split(' ');
    const unknown: number[] = [];
    for (let i = 0; i < words.length; i++) {
      const w = words[i]!;
      if (this.rawCf.has(w) || LUCENE_STOPWORDS.has(w) || QUERY_ONLY_STOPWORDS.has(w)) continue;
      unknown.push(i);
    }
    if (unknown.length === 0 || unknown.length > 3) return null;
    const options = unknown.map((i) => this.candidatesForRaw(words[i]!));
    if (options.some((o) => o.length === 0)) return null;
    const counters: number[] = new Array<number>(unknown.length).fill(0);
    for (;;) {
      const attempt = [...words];
      for (let u = 0; u < unknown.length; u++) attempt[unknown[u]!] = options[u]![counters[u]!]!;
      const joined = attempt.join(' ');
      if (
        this.canonTitle.has(joined) ||
        this.canonTitleAlias.has(joined) ||
        this.canonIdMap.has(joined)
      ) {
        const wordRepairs = new Map<string, string>();
        for (let u = 0; u < unknown.length; u++) {
          wordRepairs.set(words[unknown[u]!]!, options[u]![counters[u]!]!);
        }
        return { canon: joined, wordRepairs };
      }
      let u = unknown.length - 1;
      for (; u >= 0; u--) {
        counters[u] = counters[u]! + 1;
        if (counters[u]! < options[u]!.length) break;
        counters[u] = 0;
      }
      if (u < 0) return null;
    }
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
    if (!this.built || typeof question !== 'string' || !Number.isFinite(limit) || limit <= 0) {
      return [];
    }
    const p = this.params;
    const { tokens } = tokenize(question, true);
    if (tokens.length === 0) return [];

    // --- Quoted spans, parsed early: a span that repairs onto a known
    // title/alias/id canon both earns its equality bonus below and overrides
    // the cf-greedy per-word typo repair ("Lab Ownr" -> owner, not own).
    const spans: Array<{ canonRepaired: string; original: string }> = [];
    const spanWordRepair = new Map<string, string>(); // raw form -> repaired raw form
    const registerSpan = (original: string): void => {
      const sc = canon(original);
      if (sc.length === 0) return;
      const repaired = this.repairSpanCanon(sc);
      if (repaired !== null) {
        for (const [raw, fixedRaw] of repaired.wordRepairs) {
          if (!spanWordRepair.has(raw)) spanWordRepair.set(raw, fixedRaw);
        }
        spans.push({ canonRepaired: repaired.canon, original });
      } else {
        spans.push({ canonRepaired: sc, original });
      }
    };
    const spanRe = /["\u201c]([^"\u201c\u201d]{2,160})["\u201d]/g;
    let spanMatch: RegExpExecArray | null;
    while ((spanMatch = spanRe.exec(question)) !== null) registerSpan(spanMatch[1]!);
    // Unquoted short queries get the same treatment (a bare typo'd name).
    if (spans.length === 0 && tokens.length <= 8) registerSpan(question);

    // --- Typo bridge: repair df=0 terms (deterministic order). Edit distance
    // is measured on the raw pre-stem form, since typos derail the stemmer;
    // span-validated repairs take precedence over cf-greedy ones.
    const termRaw = new Map<string, string>();
    for (const t of tokens) if (!termRaw.has(t.term)) termRaw.set(t.term, t.raw);
    const repair = new Map<string, string>();
    for (const term of [...termRaw.keys()].sort()) {
      if (this.vocab.has(term)) continue;
      const raw = termRaw.get(term)!;
      const spanFix = spanWordRepair.get(raw);
      const fixed =
        spanFix !== undefined
          ? spanFix.includes('.') || spanFix.includes(':')
            ? spanFix
            : stemWord(spanFix)
          : this.bridge(raw);
      if (fixed !== null && fixed !== term) repair.set(term, fixed);
    }
    const fix = (t: string): string => repair.get(t) ?? t;

    // Coordination groups: one group per distinct surface chunk (post-stopword),
    // keyed by its sorted term set so repeated words collapse (digest §a.4.3).
    const chunkTerms = new Map<number, Set<string>>();
    for (const t of tokens) {
      let set = chunkTerms.get(t.chunk);
      if (!set) chunkTerms.set(t.chunk, (set = new Set()));
      set.add(fix(t.term));
    }
    const groupIdxByKey = new Map<string, number>();
    const groupOfChunk = new Map<number, number>();
    for (const [chunk, terms] of chunkTerms) {
      const key = [...terms].sort().join(' ');
      let g = groupIdxByKey.get(key);
      if (g === undefined) {
        g = Math.min(groupIdxByKey.size, MAX_COORD_GROUPS - 1);
        groupIdxByKey.set(key, g);
      }
      groupOfChunk.set(chunk, g);
    }
    const totalGroups = Math.min(groupIdxByKey.size, MAX_COORD_GROUPS);
    if (totalGroups === 0) return [];

    const termMask = new Map<string, number>();
    for (const t of tokens) {
      const g = groupOfChunk.get(t.chunk)!;
      const term = fix(t.term);
      termMask.set(term, (termMask.get(term) ?? 0) | (1 << g));
    }

    // IDF-weighted coordination (README deviation D3): each group weighs its
    // most informative term; unresolved df=0 terms weigh idf(0.5-smoothed),
    // so unmatched nonsense dominates the denominator and forces abstention,
    // while low-idf conversational filler ("give me a quick…") stops diluting
    // the match fraction of precise answers.
    const groupIdf = new Float64Array(totalGroups);
    for (const [term, mask] of termMask) {
      const entry = this.vocab.get(term);
      const w = this.idf(entry ? entry.df : 0);
      for (let g = 0; g < totalGroups; g++) {
        if ((mask & (1 << g)) !== 0 && w > groupIdf[g]!) groupIdf[g] = w;
      }
    }
    let totalMass = 0;
    for (let g = 0; g < totalGroups; g++) totalMass += groupIdf[g]!;
    if (totalMass <= 0) return [];

    // --- Unigram scoring: weighted TF across fields, one shared saturation. ---
    this.queryStamp++;
    const stamp = this.queryStamp;
    const candidates: number[] = [];
    const scoreArr = this.scoreArr;
    const maskArr = this.maskArr;
    const scoreStamp = this.scoreStamp;
    const bonusArr = this.bonusArr;
    const register = (d: number): void => {
      if (scoreStamp[d] !== stamp) {
        scoreStamp[d] = stamp;
        scoreArr[d] = 0;
        maskArr[d] = 0;
        bonusArr[d] = 0;
        candidates.push(d);
      }
    };

    const sortedTerms = [...termMask.keys()].sort();
    const k1 = p.k1;
    for (const term of sortedTerms) {
      const entry = this.vocab.get(term);
      if (!entry) continue;
      this.termStamp++;
      const tStamp = this.termStamp;
      const touched: number[] = [];
      for (let f = 0; f < FIELD_COUNT; f++) {
        const posts = entry.posts[f];
        if (!posts) continue;
        const w = p.weights[f]!;
        if (w === 0) continue;
        const invB = this.invB[f]!;
        for (let i = 0; i < posts.length; i += 2) {
          const d = posts[i]!;
          const add = w * posts[i + 1]! * invB[d]!;
          if (this.tfwStamp[d] !== tStamp) {
            this.tfwStamp[d] = tStamp;
            this.tfwArr[d] = add;
            touched.push(d);
          } else {
            this.tfwArr[d] = this.tfwArr[d]! + add;
          }
        }
      }
      if (touched.length === 0) continue;
      const idf = this.idf(entry.df);
      const mask = termMask.get(term)!;
      for (const d of touched) {
        const tfw = this.tfwArr[d]!;
        const sat = ((k1 + 1) * tfw) / (k1 + tfw) + p.delta;
        register(d);
        scoreArr[d] = scoreArr[d]! + p.lambdaUni * idf * sat;
        maskArr[d] = maskArr[d]! | mask;
      }
    }

    // --- SDM-lite proximity over adjacent primary query terms (body only). ---
    const primarySeq = tokens.filter((t) => t.primary).map((t) => fix(t.term));
    if (primarySeq.length >= 2 && (p.lambdaOrd > 0 || p.lambdaUnord > 0)) {
      const seenPairs = new Set<string>();
      for (let i = 0; i + 1 < primarySeq.length; i++) {
        const t1 = primarySeq[i]!;
        const t2 = primarySeq[i + 1]!;
        if (t1 === t2) continue;
        const pairKey = `${t1} ${t2}`;
        if (seenPairs.has(pairKey)) continue;
        seenPairs.add(pairKey);
        const e1 = this.vocab.get(t1);
        const e2 = this.vocab.get(t2);
        if (!e1?.bodyPos || !e2?.bodyPos) continue;
        const idfPair = Math.min(this.idf(e1.df), this.idf(e2.df));
        this.scorePair(e1.bodyPos, e2.bodyPos, idfPair, register);
      }
    }

    // --- Exact-match bonuses (canonical unstemmed strings). ---
    const addBonus = (d: number, amount: number): void => {
      register(d);
      scoreArr[d] = scoreArr[d]! + amount;
      bonusArr[d] = 1;
    };
    const qc = canon(question);
    if (qc.length > 0) {
      const idHit = this.canonIdMap.get(qc);
      if (idHit !== undefined) addBonus(idHit, p.bonusExactId);
      const taHits = this.canonTitleAlias.get(qc);
      if (taHits) for (const d of taHits) addBonus(d, p.bonusExactTitleAlias);
    }

    // Quoted spans (README D4): gold-style questions systematically quote the
    // name they seek ('Find the FPF entry for "support force"'). A span whose
    // (possibly repaired) canon equals a TITLE earns the equality bonus —
    // title-only, because rewarding every alias HOLDER walls multi-hop answers
    // behind a stack of same-named lexemes. Multi-term spans join the
    // title-phrase check.
    const phraseNeedles: string[] = [];
    if (primarySeq.length >= 2) phraseNeedles.push(` ${primarySeq.join(' ')} `);
    for (const span of spans) {
      const sc = span.canonRepaired;
      if (sc === qc) continue;
      const idHit = this.canonIdMap.get(sc);
      if (idHit !== undefined) addBonus(idHit, p.bonusContainedId);
      const titleHits = this.canonTitle.get(sc);
      if (titleHits) for (const d of titleHits) addBonus(d, p.bonusExactTitleAlias);
      const spanTokens = tokenize(span.original, true).tokens.filter((t) => t.primary);
      if (spanTokens.length >= 2) {
        phraseNeedles.push(` ${spanTokens.map((t) => fix(t.term)).join(' ')} `);
      }
    }

    // Contained id: a query token that IS some doc's whole id pins that doc
    // ("Explain E.11 from the FPF spec" — README deviation D5).
    for (const term of sortedTerms) {
      if (!term.includes('.') && !term.includes(':')) continue;
      const d = this.idTokenMap.get(term);
      if (d !== undefined) addBonus(d, p.bonusContainedId);
    }

    for (const needle of phraseNeedles) {
      for (const d of candidates) {
        if (this.titleNeedle[d]!.includes(needle)) scoreArr[d] = scoreArr[d]! + p.bonusTitlePhrase;
      }
    }

    // --- Coordination + abstention. ---
    const results: Array<{ d: number; s: number }> = [];
    for (const d of candidates) {
      const mask = maskArr[d]!;
      let mass = 0;
      for (let g = 0; g < totalGroups; g++) {
        if ((mask & (1 << g)) !== 0) mass += groupIdf[g]!;
      }
      const coord = mass / totalMass;
      if (totalGroups >= 2 && coord < p.coordFloor && bonusArr[d] === 0) continue;
      const kindMult =
        this.kindOf[d] === 1 ? p.lexemeMultiplier : this.kindOf[d] === 2 ? p.prefaceMultiplier : 1;
      const s = kindMult * scoreArr[d]! * (p.coordBase + p.coordSlope * coord);
      if (s > 0) results.push({ d, s });
    }
    if (results.length === 0) return [];
    let best = 0;
    for (const r of results) if (r.s > best) best = r.s;
    if (best < p.tau) return [];

    results.sort((a, b) => {
      if (a.s !== b.s) return b.s - a.s;
      const ia = this.docIds[a.d]!;
      const ib = this.docIds[b.d]!;
      return ia < ib ? -1 : ia > ib ? 1 : 0;
    });
    return results.slice(0, limit).map((r) => ({ id: this.docIds[r.d]!, score: r.s }));
  }

  /** Ordered-bigram and unordered-window counts for one query-term pair, added into the scores. */
  private scorePair(bp1: number[], bp2: number[], idfPair: number, register: (d: number) => void): void {
    const p = this.params;
    const k1 = p.k1;
    const invBBody = this.invB[BODY]!;
    let i = 0;
    let j = 0;
    while (i < bp1.length && j < bp2.length) {
      const d1 = bp1[i]!;
      const d2 = bp2[j]!;
      if (d1 < d2) {
        i += 2 + bp1[i + 1]!;
      } else if (d2 < d1) {
        j += 2 + bp2[j + 1]!;
      } else {
        const c1 = bp1[i + 1]!;
        const c2 = bp2[j + 1]!;
        const s1 = i + 2;
        const s2 = j + 2;
        let ord = 0;
        let unord = 0;
        let b = s2;
        for (let a = s1; a < s1 + c1; a++) {
          const pos = bp1[a]!;
          // ordered: t2 exactly at pos+1
          while (b < s2 + c2 && bp2[b]! < pos + 1) b++;
          if (b < s2 + c2 && bp2[b] === pos + 1) ord++;
          // unordered: any t2 within |Δ| <= window-1, Δ != 0
          let w = b;
          while (w > s2 && bp2[w - 1]! >= pos - (p.unordWindow - 1)) w--;
          for (; w < s2 + c2 && bp2[w]! <= pos + (p.unordWindow - 1); w++) {
            if (bp2[w] !== pos) {
              unord++;
              break;
            }
          }
        }
        if (ord > 0 || unord > 0) {
          register(d1);
          if (ord > 0) {
            const x = ord * invBBody[d1]!;
            this.scoreArr[d1] = this.scoreArr[d1]! + p.lambdaOrd * idfPair * (((k1 + 1) * x) / (k1 + x) + p.delta);
          }
          if (unord > 0) {
            const x = unord * invBBody[d1]!;
            this.scoreArr[d1] = this.scoreArr[d1]! + p.lambdaUnord * idfPair * (((k1 + 1) * x) / (k1 + x) + p.delta);
          }
        }
        i += 2 + c1;
        j += 2 + c2;
      }
    }
  }
}

function popcount(v: number): number {
  v = v - ((v >> 1) & 0x55555555);
  v = (v & 0x33333333) + ((v >> 2) & 0x33333333);
  return (((v + (v >> 4)) & 0x0f0f0f0f) * 0x01010101) >> 24;
}
