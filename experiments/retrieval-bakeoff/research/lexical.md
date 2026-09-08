# Lexical ranking done properly — research digest

Scope: classic lexical candidate(s). Corpus: 9,155 docs, extreme length skew
(311 patterns, median 32KB / max 324KB; 8,453 lexeme alias docs, median 81
chars; 388 prefaces; 3 routes). Queries: short NL questions, aliases, typos,
paraphrases; negative category rewards abstention. Constraints: pure TS on
Bun, zero deps, deterministic, index build in seconds.

## (a) Recommended recipe: fielded BM25+ ("bm25f-plus")

### 1. Normalization & tokenization (identical for docs and queries)

1. Unicode-normalize NFC, then `s.toLowerCase()` (spec-defined, locale-independent;
   never `toLocaleLowerCase` — harness rule).
2. Extract spec IDs first with `/\b[a-z]\.\d+(?:\.\d+)*\b/g` (post-lowercase);
   emit the whole ID as one token (`a.2.3`) plus its dotted prefixes (`a.2`).
   Never stem or split IDs further.
3. Split remaining text on `[^a-z0-9]+`; additionally split camelCase /
   digit-letter boundaries and emit BOTH the whole identifier and its parts:
   `BoundedContext` -> `boundedcontext`, `bounded`, `context`. Indexing whole +
   sub-tokens is the documented big win for identifier-heavy corpora (+82%
   nDCG@10 over default tokenization in a BM25 code-retrieval ablation
   [arXiv 2605.18561]; camelCase splitting is standard in code-search IR
   [Enslen et al. 2009; Guerrouj 2013]).
4. Stopwords: hardcode Lucene's 33-word English list; drop them in docs and
   queries. Add a query-side-only interrogative list:
   `what which how why when who whose does do did mean means`. Keep domain
   words like `pattern`, `role`, `context` — they are content here.
5. Stemming: Porter2 (snowball English) on word tokens only (not IDs, not
   whole-identifier tokens). Evidence: stemming reliably beats none on English,
   gains are biggest for short docs (our lexemes) [Krovetz 1993]; Porter(2) vs
   light/Krovetz is a wash overall with Porter slightly ahead on modern
   collections [SST 2019; arXiv 2402.11757]. Porter2 is ~350 lines of
   branchless string logic — deterministic, zero-dep, implement from the
   Snowball spec and freeze with unit vectors. Fallback if implementation risk
   is a concern: minimal S-stemmer (`-ies/-es/-s` rules) loses little on this
   vocabulary and is 20 lines.
6. Typo bridge (cheap, deterministic): for any query term with df=0, generate
   deletion-distance-1 variants (SymSpell-style) against the index vocabulary;
   replace with the candidate of highest collection frequency, ties broken
   lexicographically. Covers the `typo` gold category without fuzzy scoring.

### 2. Fields (BM25F streams)

Per doc build four streams from `CorpusDoc`:

| field     | content                                                        |
|-----------|----------------------------------------------------------------|
| `id`      | doc id tokens (whole + dotted prefixes)                        |
| `title`   | title tokens                                                   |
| `aliases` | `aliases[]` + titles of lexeme docs pointing at this doc via `neighbors` (anchor-text move, see below) |
| `body`    | full `text`                                                    |

Fold each lexeme doc's text into its target pattern's `aliases` stream (follow
`neighbors` edges; deterministic order: sort by lexeme id). This is exactly the
web-search anchor-text pattern — text about a doc stored elsewhere is the
strongest field after title [Robertson & Zaragoza 2009 §3.6]. Keep lexeme docs
in the index as normal (tiny) docs too, since gold may target them directly.

### 3. Scoring formula (code-ready)

Weighted TF must be combined across fields BEFORE saturation — one saturation
per term per doc, not per field (§3.6.3, Eq. 3.19–3.21 of the monograph):

```
Bf(d)      = (1 - b_f) + b_f * len_f(d) / avglen_f          # per-field norm
tfw(t,d)   = sum_f  w_f * tf(t,d,f) / Bf(d)                 # weight BEFORE saturation
idf(t)     = ln( 1 + (N - df_t + 0.5) / (df_t + 0.5) )      # Lucene form, never negative
sat(t,d)   = (k1 + 1) * tfw / (k1 + tfw)  +  delta          # BM25+ lower bound, delta>0 only if tfw>0
S_uni(q,d) = sum_{unique t in q, tfw>0}  idf(t) * sat(t,d)
```

Notes: `df_t` and `N` are computed over whole docs ignoring fields (what the
authors did in practice, §3.6.3); `avglen_f` is the corpus mean of `len_f`.
There is no `dl/avgdl` in the denominator of `sat` — length norm already
happened per field inside `tfw`.

Parameters (all sweepable on dev; provenance in brackets):

| param       | value | provenance |
|-------------|-------|------------|
| `k1`        | 1.5   | canonical range 1.2 < k1 < 2 [R&Z 2009 §3.4.4]; MUST re-sweep upward if field weights grow — TREC-13 BM25F used k1=27.5 with v_title=38 because weighted tfw inflates with w_f [R&Z 2009 Table 3.1] |
| `delta`     | 1.0   | BM25+ default; lower-bounds the reward for a term merely occurring, fixing over-penalization of very long docs [Lv & Zhai CIKM 2011] |
| `w_id`      | 10    | id hit should dominate; cf. runtime's exact-ID heuristic |
| `w_title`   | 6     | title/anchor weights 10–40x body in TREC BM25F; scaled down since our k1 stays small [R&Z 2009 Table 3.1] |
| `w_aliases` | 5     | anchor-text analog [R&Z 2009 §3.6] |
| `w_body`    | 1     | reference weight |
| `b_id`      | 0     | fixed-length field, no norm |
| `b_title`   | 0.6   | TREC-13 NP task b_title [R&Z 2009 Table 3.1] |
| `b_aliases` | 0.6   | TREC anchor b [ibid.] |
| `b_body`    | 0.5   | canonical range 0.5 < b < 0.8 [R&Z 2009]; start LOW end — short NL queries over long docs behave like MS MARCO, where Anserini tunes to b=0.4, k1=0.9. Sweep {0.3, 0.4, 0.5, 0.65, 0.75} |

Why BM25+ here: Kamphuis et al. (ECIR 2020) found variants (Robertson, Lucene,
ATIRE, BM25L, BM25+) statistically indistinguishable on *newswire* — i.e., do
not expect magic — but newswire has mild length variance. Our body-length ratio
is ~4,000:1 and avglen_body is dragged to ~tens of tokens by 8.4k tiny docs, so
32KB patterns get `Bf ~ 100+`: classic over-penalization, the exact failure
mode BM25+/BM25L target [Lv & Zhai 2011, "When Documents Are Very Long, BM25
Fails!" SIGIR 2011]. BM25+ (delta added after saturation, delta=1) is preferred
over BM25L (delta=0.5 added to ctd before saturation) because it gives a hard
occurrence floor independent of length — the right shape when a 324KB doc must
still beat empty for a single strong term hit. Formulas per Kamphuis Table 1.

### 4. Cheap boosts on top (no models)

Blend, SDM-style — weights are Metzler & Croft's recommended lambdas
(0.85/0.10/0.05) [SIGIR 2005]:

```
score = 0.85*S_uni + 0.10*S_ord + 0.05*S_unord + exactBonus
```

1. `S_ord` / `S_unord`: for each adjacent query-term pair (after stopword
   removal), count occurrences in `body` of the exact bigram (`S_ord`) and of
   both terms within an unordered window of 8 (`S_unord`) [Metzler & Croft
   2005]. Score each pair as a pseudo-term through the same `sat()` with
   `idf_pair = min(idf(t1), idf(t2))`. Needs a positions index for body only;
   store positions of each term, intersect at query time.
   Cheaper substitute if positions feel heavy: Tao & Zhai's min-cover span —
   smallest window containing all matched query terms; add
   `ln(alpha + exp(-mincover))` per doc, alpha=1 [Tao & Zhai SIGIR 2007].
2. `exactBonus`:
   - query (normalized, unstemmed) equals a doc's id -> +1000 (rank-pinning);
   - equals title or one alias exactly -> +100;
   - all query terms appear as a contiguous phrase in title -> +20.
   Fixed constants, documented; they only fire on exact string equality so
   they cannot reorder among themselves nondeterministically.
3. Coordination + abstention (serves the `negative` category):
   `coord = matchedUniqueQueryTerms / uniqueQueryTerms`.
   Multiply final score by `(0.25 + 0.75*coord)` (soft Lucene-classic coord),
   and return `[]` when `coord < 0.34` for multi-term queries OR
   `bestScore < tau` (sweep tau on dev negatives; start tau = 1.0).
   Title-hit boosting per se is NOT needed — the title field weight already is
   the boost; fielded structure also implicitly rewards proximity in short
   fields [R&Z 2009 §3.8].

### 5. Determinism spec

- Fixed iteration order everywhere: sort query terms lexicographically before
  scoring; accumulate per-doc scores in that order (float addition is
  order-sensitive); JS `Map` iterates in insertion order — insert doc ids in
  corpus order at build.
- Final ranking: sort by `(score DESC, id ASC)` — explicit id tiebreak, never
  rely on sort stability alone.
- No `Date.now`, no `Math.random`, no locale string ops; all parameter tables
  are literal constants in source.
- Dev tuning = exhaustive small grid (b_body x k1 x tau, <100 combos, seconds
  at this scale), pick by nDCG@10 then MRR@10, ties by smaller b_body; record
  the grid in the candidate README (bake-off rule 3).

### 6. Index build sketch (fits "seconds" easily)

One pass: tokenize 4 streams per doc -> per-field postings `term -> [(docIdx,
tf)]` + body positions `term -> [(docIdx, [pos...])]` + per-field lengths +
df/cf tables + deletion-variant map for typo bridge. ~9.2MB text, trivial for
Bun; `approxIndexBytes` from summed array lengths.

## (b) Second choices and when they win

1. **Plain single-field BM25+ (k1=1.2, b=0.4) with doc-kind score multipliers**
   (`pattern` x1.0, `lexeme` x0.8, ...). Wins if BM25F field weights prove
   hard to tune on a small dev set — fewer knobs, and Kamphuis says the core
   is robust. Loses alias/anchor folding, likely worse on `alias` category.
2. **BM25L (delta=0.5)** instead of BM25+: theoretically smoother for the
   long-doc tail; pick it if dev shows BM25+ over-rewarding 324KB docs that
   merely mention a term once (delta floor too generous).
3. **Per-kind avglen pools** (compute `avglen_body` separately for
   pattern/lexeme/preface/route): a stronger fix for skew than delta, but
   makes scores less comparable across kinds — only adopt if dev shows
   patterns still buried after the delta+b sweep.
4. **Full SDM as the ranker** (query likelihood + Dirichlet mu=2500): the
   principled proximity model; wins if `paraphrase`/`task` queries dominate
   errors and bigram evidence matters more than field structure. More code,
   needs positions for everything.
5. **RM3 pseudo-relevance feedback: SKIP for v1.** Anserini defaults would be
   fbDocs=10, fbTerms=10, originalQueryWeight=0.5 [Anserini #447 / Indri
   RMExpander]. It IS implementable deterministically (lexicographic
   tie-breaks on term selection). But at this scale: (i) top-10 is typically
   dominated by 81-char near-duplicate lexeme docs -> degenerate feedback
   distributions; (ii) the corpus already ships a *curated* expansion resource
   — the lexeme/alias graph — and deterministic alias expansion strictly
   dominates statistical expansion when a synonym table exists; (iii) query
   drift on `paraphrase`, and it actively poisons the `negative` category
   (expanding nonsense manufactures matches, breaking abstention); (iv) 2x
   query latency. Revisit only if `task`/`multi-hop` recall stays low; then
   restrict the feedback pool to `kind=='pattern' && len>500` and keep
   origWeight >= 0.5.

## (c) Pitfalls checklist

- [ ] Do NOT score each field with BM25 and sum — saturation must apply to the
      cross-field weighted tf, else a term hitting 4 fields quadruple-dips its
      pre-saturation growth (the whole point of BM25F) [R&Z 2009 §3.6.1].
- [ ] Do NOT keep Robertson IDF `ln((N-df+0.5)/(df+0.5))`: negative for
      df > N/2 (plausible here — spec boilerplate terms across 8.4k lexemes).
      Use the Lucene `ln(1 + ...)` form [Kamphuis 2020].
- [ ] Re-sweep k1 whenever field weights change (tfw scale moves with w_f)
      [R&Z 2009 Table 3.1].
- [ ] delta only for terms actually present (tfw > 0), else every doc gets
      `delta * sum(idf)` and ranking degenerates.
- [ ] avglen_body over the mixed corpus is ~meaningless (bimodal); that is
      *why* delta/b tuning matters — do not silently trust b=0.75.
- [ ] Never stem IDs (`a.2.3`), whole-identifier tokens, or alias exact-match
      strings; stem only word tokens.
- [ ] Porter2 must be frozen with test vectors; hand-ported stemmers are the
      classic source of cross-implementation drift.
- [ ] Stopword removal happens BEFORE coordination math, or `what is x`
      queries can never reach coord=1.
- [ ] Exact-phrase/bigram windows computed on the stemmed stream, exact
      bonuses on the unstemmed normalized string — do not mix.
- [ ] Float sum order + tiebreaks fixed (see §5); double-run determinism is a
      scored harness check.
- [ ] Empty/whitespace/emoji-only queries: return `[]`, never throw (contract).
- [ ] No peeking at `gold/` from candidate code; parameters justified in
      candidate README with this digest as provenance.

## (d) Sources

- Robertson & Zaragoza, *The Probabilistic Relevance Framework: BM25 and
  Beyond*, FnTIR 2009 — §3.4–3.6 (params, variants, BM25F), Table 3.1.
  https://www.staff.city.ac.uk/~sbrp622/papers/foundations_bm25_review.pdf
- Robertson, Zaragoza, Taylor, *Simple BM25 extension to multiple weighted
  fields*, CIKM 2004. https://dl.acm.org/doi/10.1145/1031171.1031181
  (per-field-b refinement: Zaragoza et al., TREC-13, 2004; cf. Terrier notes
  http://terrier.org/docs/v5.1/javadoc/org/terrier/matching/models/BM25F.html)
- Lv & Zhai, *Lower-Bounding Term Frequency Normalization* (BM25+), CIKM 2011,
  https://dl.acm.org/doi/10.1145/2063576.2063584 (project:
  http://sifaka.cs.uiuc.edu/~ylv2/pub/lowerbound/LBTF.htm ); and *When
  Documents Are Very Long, BM25 Fails!* (BM25L), SIGIR 2011.
- Kamphuis, de Vries, Boytsov, Lin, *Which BM25 Do You Mean?*, ECIR 2020 —
  Table 1 has all variant formulas used above.
  https://cs.uwaterloo.ca/~jimmylin/publications/Kamphuis_etal_ECIR2020_preprint.pdf
- Metzler & Croft, *A Markov Random Field Model for Term Dependencies*, SIGIR
  2005 — SDM lambdas 0.85/0.10/0.05, window 8.
  http://web.cs.ucla.edu/~yzsun/classes/2014Spring_CS7280/Papers/Probabilistic_Models/A%20Markov%20Random%20Field%20Model%20for%20Term%20Dependencies.pdf
- Tao & Zhai, *An Exploration of Proximity Measures in Information Retrieval*,
  SIGIR 2007 — min-cover span. https://dl.acm.org/doi/10.1145/1277741.1277794
- Elastic, *Practical BM25 Part 3: picking b and k1* — defaults k1=1.2, b=0.75
  "work well for most corpora".
  https://www.elastic.co/blog/practical-bm25-part-3-considerations-for-picking-b-and-k1-in-elasticsearch
- Krovetz, SIGIR 1993 (stemming helps most on short docs); stemmer
  comparisons: https://dl.acm.org/doi/abs/10.1109/SST.2019.00017 ,
  https://arxiv.org/html/2402.11757v1
- Identifier-aware tokenization for BM25 code retrieval (whole + split tokens,
  +82%): https://arxiv.org/pdf/2605.18561 ; Enslen et al., MSR 2009
  https://ieeexplore.ieee.org/document/5069482/
- Anserini RM3 defaults & tuned Robust04 params: GitHub issue #447
  https://github.com/castorini/Anserini/issues/447 ; Rm3Reranker
  https://github.com/castorini/anserini/blob/master/src/main/java/io/anserini/rerank/lib/Rm3Reranker.java
- Proximity + BM25: Rasolofo & Savoy BM25TP (ECIR 2003); Büttcher et al. (SIGIR 2006).
