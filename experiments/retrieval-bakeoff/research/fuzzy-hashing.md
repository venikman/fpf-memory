# Fuzzy matching, similarity hashing, and production-JS-engine tricks

Research digest for the retrieval bake-off (2026-08-31). Corpus context: 9,155 docs —
311 long `pattern` docs (median ~32 KB), 8,453 tiny `lexeme` alias docs (median ~81
chars), ~388 `preface` sections. Queries: NL questions with typos and paraphrases.
Constraints: pure TS on Bun, zero deps, deterministic, build in seconds, query in ms.

---

## a) Recommended recipe: typo-tolerant n-gram candidate

**Shape: token-level trigram spell-fix feeding a BM25F-lite lexical ranker.** Do NOT
fuzzy-score whole documents; correct query terms against the vocabulary, then rank
with a normal weighted lexical scorer. This is the architecture every production
system converges on (ES/Lucene fuzzy expansion, MiniSearch, Orama).

### Gram size: trigrams, pg_trgm style
- Trigrams are the classic typo-matching gram since Angell/Freund/Willett 1983; 3–5
  char grams are the consensus for noisy text. Bigrams only when strings are very
  short (they survive a typo better but are far less selective).
- Copy pg_trgm's extraction exactly: lowercase, alphanumerics only, **pad each word
  with 2 leading spaces + 1 trailing space**, dedupe the gram set. The asymmetric
  padding yields 2 word-start grams vs 1 word-end gram — free positional/edge
  emphasis (word beginnings count ~2x), matching the empirical fact that typos
  rarely hit the first letters. This substitutes for a separate edge-gram field.
- Similarity: `sim = |Q∩T| / |Q∪T|` (Jaccard over deduped gram sets, what pg_trgm
  computes). Note: **Dice = 2J/(1+J) is a strictly monotone transform of Jaccard**,
  so for a fixed query both produce the identical ranking — the choice only moves
  thresholds. Cosine over gram sets (`|Q∩T| / sqrt(|Q||T|)`) is NOT rank-equivalent:
  it is gentler on length mismatch — prefer it when comparing a query term against
  longer multi-word title strings; use Jaccard for term↔term.
- Thresholds (pg_trgm defaults, battle-tested): 0.3 for whole-string similarity,
  0.5 for word-boundary similarity (`word_similarity_threshold`). Start at 0.3 for
  term correction; calibrate on `gold/dev.json` only.

### Spell-fix stage: yes, with these parameters
1. Build one trigram inverted index over the **vocabulary** (distinct normalized
   terms from title + aliases + text; expect a few 10k terms — sub-second build).
2. Per query term: apply the **ES AUTO fuzziness ladder** — len ≤ 2: exact only;
   3–5: max 1 edit; ≥ 6: max 2 edits. Skip the whole stage when the term exists in
   the vocabulary exactly (exact match beats correction).
3. Candidate terms = those sharing ≥ 1 trigram (count matches `c` while scanning
   postings; Jaccard = `c / (|Qg| + |Tg| − c)`); keep sim ≥ 0.3, cap at ~8 candidates.
4. Verify with **banded Damerau–Levenshtein** (transpositions ON — ~80% of human
   errors are single ins/del/sub/transposition per Damerau 1964; Norvig measured
   76% at d=1 and 98.9% within d=2), band width = maxDist, early-exit when the row
   minimum exceeds maxDist. Require first character equal (ES `prefix_length: 1`)
   to prune hard.
5. Rank corrections: edit distance asc, then collection frequency desc, then
   lexicographic asc (determinism).
6. Weight corrected terms in the ranker with **MiniSearch's decay**:
   `w = 0.45 · len/(len + dist)`; exact terms w = 1; prefix expansions
   `w = 0.375 · len/(len + 0.3·(candidateLen − termLen))`.

**Skip BK-trees and Levenshtein automata.** Garbe's benchmark: SymSpell ~1,870x
faster than a BK-tree at d=3, and BK-trees traverse a large fraction of nodes at
d=2. Levenshtein automata are the right answer inside Lucene's FST term dictionary
but construction cost/complexity in TS is not worth it at this vocab size —
trigram-filter + banded-DL verify touches ~dozens of candidates per term
(microseconds). Optional accelerator if profiling demands: SymSpell delete-index at
d=1 only (~10 deletes/term; d=2 deletes for 100k terms ≈ millions of map entries —
memory-heavy in JS).

### Doc scoring (BM25F-lite)
- Fields with separate per-field lengths/averages: `title` (boost ~4), `aliases`
  (~3, each alias its own field instance), `text` (1). `id` handled as an exact
  tier, not a scored field.
- Per term/field: BM25+ with MiniSearch defaults `k = 1.2, b = 0.7, d = 0.5`:
  `idf = ln(1 + (N − n + 0.5)/(n + 0.5))`,
  `score = idf · (d + tf·(k+1)/(tf + k·(1 − b + b·fieldLen/avgFieldLen)))`.
- Combine: `Σ over matched terms of (termWeight · fieldBoost · bm25)` then multiply
  the doc total by the **count of distinct query terms matched** (MiniSearch's
  "quality" multiplier — a cheap coordination factor that fixes the
  one-term-matched-many-times pathology).
- Exact-ID tier: if the query contains a token equal to a doc id (after
  normalization), that doc wins outright (separate tier or ~1000x multiplier —
  syslog-ng's layered-boost pattern; mirrors the runtime's exact-ID +100).
- IDF for a corrected term = the **vocabulary term's** IDF, not the typo's.
- Negative discipline: return `[]` unless ≥ 1 query term matched exactly OR a
  correction passed sim ≥ 0.3 AND the top score clears an absolute floor
  (calibrate the floor on dev negatives). Fuzz-everything kills negativeCleanRate.

---

## b) Recommended recipe: MinHash/SimHash candidate — and the LSH verdict

### Verdict: brute force wins at 9k docs; LSH is not worth it here
Cost both paths (query-time, JS/Bun):
- **Brute-force signature scan**: k = 128 minhash slots/doc → 9,155 × 128 ≈ 1.17M
  Int32Array equality checks ≈ 1–3 ms. Query-side minhashing (~100 shingles × 128
  perms via one base hash + 128 affine `(a·h + b) >>> shift` re-hashes) ≈ tens of µs.
- **Sparse cosine / Jaccard via a gram inverted index**: only touches docs sharing
  ≥ 1 gram with the query — thousands of accumulator updates, well under 1 ms, and
  **exact**, not estimated. Total gram postings for title+alias shingles ≈ 1M
  entries ≈ single-digit MB. Builds in far under a second.
- **LSH banding** (e.g. 16 bands × 8 rows or 32 × 4 over 128 slots): saves at most
  ~1–2 ms of the scan but adds the S-curve threshold cliff
  (`P(candidate) = 1 − (1 − s^r)^b`, half-power near `(1/b)^(1/r)` ≈ 0.42 for
  32×4) and a pile of code. Practitioner guidance agrees: below ~10M items, exact
  methods usually suffice; LSH pays at 10^5–10^7+ items. **At 9k docs LSH buys
  nothing measurable and costs recall determinism at the threshold cliff.**

Sharper honesty: at this scale you don't even need MinHash **signatures** — exact
Jaccard/containment over stored gram sets via the inverted index is affordable.
Field MinHash only as the *estimation* variant for comparison (or if memory later
matters); rank by estimated Jaccard directly (`Ĵ = matches/k`), never by LSH
bucket membership.

### Parameterization (if fielding the MinHash candidate)
- **Shingle short representations only: title + aliases**, char 3-shingles with
  pg_trgm padding. Do NOT shingle 32 KB pattern bodies for query matching: a
  ~100-shingle query vs a ~30k-shingle doc has Jaccard ≤ ~0.005, and MinHash noise
  (`SE ≈ sqrt(J(1−J)/k)` ≈ 0.009 at J=0.01, k=128) exceeds the signal — the
  estimator is structurally broken for asymmetric sizes.
- Signature k = 128 (standard error at J=0.5 ≈ 0.044; production dedup pipelines
  use 96–128). Deterministic hashing: FNV-1a 32-bit base hash + fixed constant
  tables for the 128 affine permutations. No seeds from time/random.
- Fix length asymmetry by converting to **containment**: exact set sizes are
  known, so `C(Q,D) = Ĵ·(|Q|+|D|) / ((1+Ĵ)·|Q|)` — rank by containment of the
  query in the doc.
- **SimHash**: 64-bit, IDF-weighted token features, Hamming ≤ 3 for near-duplicate
  (Manku/Google WWW'07 recommends 64-bit + k=3 for web pages). Brute-force
  XOR+popcount over 9,155 fingerprints is trivial (< 0.5 ms) — again no LSH/
  permutation tables needed. But 64 bits is far too coarse to *rank* 9k docs for a
  query; use SimHash only for doc↔doc dedup/clustering of the 311 patterns or a
  "related nodes" signal (multi-hop), not as a retrieval scorer.
- Expectation to state in the candidate README: this candidate exists as a
  measured baseline; the n-gram/BM25F candidate should beat it on every category
  except possibly near-duplicate-ish multi-hop cases.

---

## c) "Steal this" list from production JS engines

- **MiniSearch** (exact source-verified values):
  - BM25+ params `{k: 1.2, b: 0.7, d: 0.5}`; the `d` additive term keeps long-doc
    matches from zeroing out.
  - Match-type weights `{fuzzy: 0.45, prefix: 0.375}` with decays
    `fuzzyW·len/(len+editDist)` and `prefixW·len/(len+0.3·lenDiff)`.
  - Fractional fuzziness `maxDist = min(maxFuzzy=6, round(0.2·termLen))` — an
    AUTO-ladder equivalent; 0.2 is their community-recommended tolerance.
  - Final score `termWeight · termBoost · fieldBoost · docBoost · bm25`, summed
    over terms/fields, times `matchedTermCount`.
  - Tokenize on Unicode space-or-punctuation; explicit `toLowerCase()`.
- **Lucene/Elasticsearch**: AUTO fuzz ladder (≤2 exact / 3–5 → 1 / ≥6 → 2 edits);
  Damerau transpositions on by default; `prefix_length ≥ 1` to prune expansions;
  cap expansions (`max_expansions` ~50). Edge n-grams at **index time only** — never
  gram the query side.
- **FlexSearch**: (1) *scoring resolution* — quantize term position into R (default
  9) buckets; earlier occurrence = higher bucket = cheap proximity-to-start prior,
  ideal for titles; (2) *contextual index* — postings keyed by term pairs within a
  `depth` window gives phrase-ish precision without storing positions; (3) the
  forward tokenizer is just eagerly-stored edge grams — their memory table shows why
  you keep it to short fields only.
- **Orama**: radix-tree term dictionary; typo tolerance = bounded-Levenshtein walk
  of the tree, default `tolerance: 0` (opt-in 1–2) — fuzzy is a fallback, not the
  default path; numeric internal doc IDs instead of strings in postings (memory).
- **Lunr**: field-scoped terms, `+`/`-` presence modifiers, trailing wildcard =
  prefix. Its documented failures are the real lesson (see pitfalls).
- **syslog-ng-on-lunr layering**: multiplicative tiers ~1000/100/10/5/0.01 for
  exact-compound / exact / prefix / fuzzy / penalty — tiers so far apart that
  accumulation can't cross them. Right pattern for id-lookup ≻ title ≻ alias ≻
  fuzzy on this corpus.
- **pg_trgm**: deduped-set Jaccard, `%` threshold 0.3, `word_similarity` 0.5,
  2-front/1-back padding (edge emphasis for free), "more grams in the query = more
  selective index probe".
- **Query normalization that pays off** (section 5 of the brief):
  - Explicit lowercase + NFKD then strip combining marks (U+0300–U+036F) for
    diacritics folding. Never `toLocaleLowerCase` (determinism).
  - Word-delimiter splitting à la Lucene WDGF: split on case transitions
    (`BoundedContext` → `bounded`,`context`), letter↔digit transitions
    (`SD500` → `sd`,`500`), hyphens/dots — and **keep the catenated original too**
    (`wi-fi` → `wi`,`fi`,`wifi`) at index time; split-only at query time.
  - Dotted IDs `A.2.3`: index the whole lowercased token as one exact-tier term
    AND the dot-split parts; same treatment for query tokens that look id-like
    (`/^[a-z]+(\.\d+)+$/i`).
  - Don't stem at all on this corpus (spec vocabulary, IDs, camelCase terms) —
    stemming is what breaks prefix/fuzzy in lunr deployments.

---

## d) Pitfalls checklist

- [ ] Fuzzy match scoring equal to exact (lunr #383: `beans`~3 scores `bran` = `beans`).
      Always decay by edit distance (MiniSearch formula above).
- [ ] Fuzzy+prefix double-count exceeding exact (historical MiniSearch bug): take
      max of match-type weights per (term, candidate), don't sum them.
- [ ] Stemming vs prefix/wildcard interaction (lunr #256: `module*` finds nothing
      because the index holds `modul`). Don't stem; or apply identical pipeline to both sides.
- [ ] Gramming both index and query sides → relevance destroyed, token explosion
      (bigdataboutique's "don't use n-gram" warning); `max_gram` shorter than query
      term → silent zero matches.
- [ ] Trigram sim on terms < 4 chars: one typo wipes most grams — the AUTO ladder's
      "≤ 2 chars exact-only" exists for this; consider bigrams only there.
- [ ] Dice/Jaccard multiset bug: dedupe consistently or `"ggggg" vs "gg"` scores 1
      (Wikibooks warning). pg_trgm dedupes; do the same everywhere.
- [ ] MinHash on asymmetric sizes (short query vs long doc): Jaccard ≈ 0 and noise
      > signal; use containment correction or shingle short fields only.
- [ ] LSH threshold cliff `(1/b)^(1/r)`: pairs just under it silently vanish;
      results spike near the threshold. At 9k docs just don't use LSH.
- [ ] Determinism: fixed hash-seed constants, no `Math.random`/`Date.now`, stable
      sort with `(score desc, id asc)` tie-break, explicit (non-locale) casing.
- [ ] Negative cases: any always-return-something scorer tanks negativeCleanRate —
      absolute score floor + "≥1 strong anchor term" gate before emitting results.
- [ ] Corrected-term IDF must come from the corrected vocabulary term; and cap
      corrections per term (~8) or rare-typo queries scan huge candidate unions.
- [ ] Title text duplicated inside `text` double-counts — score fields separately
      (BM25F), don't concat.
- [ ] JS `.split('')`/`charCodeAt` vs astral chars: iterate by code point or
      normalize away; keep gram extraction byte-stable across Bun versions.

---

## e) Sources

- pg_trgm docs (extraction, Jaccard scoring, 0.3/0.5 thresholds): https://www.postgresql.org/docs/current/pgtrgm.html
- MiniSearch source (weights, BM25+ params, decay formulas): https://github.com/lucaong/minisearch/blob/master/src/MiniSearch.ts and design doc: https://github.com/lucaong/minisearch/blob/master/DESIGN_DOCUMENT.md
- Elasticsearch fuzzy query / AUTO / prefix_length: https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-fuzzy-query
- Edge n-gram tokenizer + caveats: https://www.elastic.co/docs/reference/text-analysis/analysis-edgengram-tokenizer ; n-gram warning: https://bigdataboutique.com/blog/dont-use-n-gram-in-elasticsearch-and-opensearch-6f0b48
- Lunr searching guide: https://lunrjs.com/guides/searching.html ; no-decay fuzzy bug: https://github.com/olivernn/lunr.js/issues/383 ; wildcard-vs-stemming: https://github.com/olivernn/lunr.js/issues/256 ; layered boosts atop lunr: https://syslog-ng.github.io/lunr_search_help
- FlexSearch (contextual index, resolution, tokenizers): https://github.com/nextapps-de/flexsearch ; tokenizer memory deep-dive: https://schalkneethling.com/posts/flexsearch-tokenizers-learning-through-writing-tests/
- Orama internals (BM25 + radix tree) and typo tolerance: https://docs.orama.com/open-source/internals/components ; https://www.mintlify.com/oramasearch/orama/search/typo-tolerance
- SymSpell vs BK-tree benchmarks (Garbe): https://seekstorm.com/blog/symspell-vs-bk-tree/ ; https://github.com/wolfgarbe/SymSpell
- Levenshtein automata: http://blog.notdot.net/2010/07/Damn-Cool-Algorithms-Levenshtein-Automata ; construction-cost caveats: https://andrewjsaid.com/2025/8/8/under-the-hood-of-fuzzy-search-constructing-levenshtein-automata
- Norvig spell corrector (76% d=1, 98.9% d≤2): https://norvig.com/spell-correct.html ; Stanford CS276 spelling lecture (80% rule, DL edits): https://web.stanford.edu/class/cs276/19handouts/lecture5-spell_correction-6per.pdf
- SimHash near-dup, 64-bit + Hamming ≤ 3 (Manku, Jain, Sarma, WWW'07): https://research.google.com/pubs/archive/33026.pdf
- MinHash LSH banding math and tuning: https://skeptric.com/minhash-lsh/ ; parameter surveys in production dedup pipelines: https://medium.com/@vidya_manti/detecting-near-duplicate-documents-with-locality-sensitive-hashing-lsh-18f109b55e44
- Lucene WordDelimiterGraphFilter (camelCase/digit splits, catenate): https://lucene.apache.org/core/9_12_0/analysis/common/org/apache/lucene/analysis/miscellaneous/WordDelimiterGraphFilter.html
- Dice coefficient implementations + multiset caveat: https://github.com/words/dice-coefficient ; https://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Dice's_coefficient
