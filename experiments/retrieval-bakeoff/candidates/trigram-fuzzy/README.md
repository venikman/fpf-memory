# trigram-fuzzy

Typo-tolerant lexical retriever per `research/fuzzy-hashing.md` §a: token-level
trigram spell-correction feeding a fielded lite-BM25 ranker. No whole-document
fuzzy scoring, no graph use (`neighbors` untouched — multi-hop is deliberately
out of this candidate's lane).

```
query → normalize (§c) → per content term: exact | spell-fix ladder | prefix
      → BM25F-lite over {title, alias, text} + contextual pair field
      → × matched-distinct-term count → exact-ID tier
      → anchor gate + floors (negative discipline)
```

Files: `index.ts` (ranker, gates, params), `tokenize.ts` (normalization/WDGF),
`fuzzy.ts` (trigram index + banded Damerau–Levenshtein ladder).

## Parameters and provenance

| Parameter | Value | Provenance |
| --- | --- | --- |
| BM25+ `{k1, b, d}` | 1.2 / 0.7 / 0.5 | digest §c, MiniSearch source-verified defaults |
| Field boosts title/alias/text | 4 / 3 / 1 | digest §a "Doc scoring" |
| Exact-ID tier | additive 1e9 | digest §a/§c (syslog-ng layered boosts; runtime's exact-ID +100) |
| Fuzzy weight & decay | 0.45 · len/(len+dist) | digest §c MiniSearch (len = matched vocab term) |
| Prefix weight & decay | 0.375 · len/(len+0.3·lenDiff) | digest §c MiniSearch; terms ≥ 4 chars, ≤ 20 expansions by (collection freq desc, lex asc) — ES `max_expansions` analogue |
| Edit-distance ladder | ≤2: 0 / 3–5: 1 / ≥6: 2 | digest §a step 2, ES AUTO |
| `prefix_length` | first char must match | digest §a step 4, ES |
| Damerau–Levenshtein | banded OSA, transpositions on, early exit | digest §a step 4 (Damerau 1964, Norvig) |
| Corrections per term | ≤ 8, ranked (dist, collection freq, lex) | digest §a steps 3+5 |
| Trigram extraction | pg_trgm: lowercase, 2-front/1-back pad, deduped | digest §a/§c |
| Trigram prefilter floor | 0.2 (len ≥ 5), 0.15 (len 3–4) | deviation, see below |
| Correction-anchor sim | ≥ 0.3 | digest §a negative rule (pg_trgm threshold) |
| tf cap per (term,doc,field) | 255 | digest §d "cap per-doc term contribution" |
| Per-field length norm | per-field len/avg over N docs | digest §a/§d (MiniSearch style) |
| Auto-stop set | df ratio > 0.10 (29 terms) + single-char terms | deviation, see below |
| Contextual pair field | title + per-alias adjacent content pairs, boost 18, min(wL,wR) weighting | digest §c "FlexSearch contextual index"; boost tuned on dev category metrics |
| `lexemeBoost` | 0.95 | MiniSearch docBoost slot (digest §c final-score formula); tuned on dev category metrics |
| Floors | scoreFloor 2 / fuzzy-only 40 / body-only 400 | digest §a "absolute floor… calibrate on dev"; calibrated on dev category score distributions |
| Trusted-rescue rule | top-k doc with matched ≥ 2, title/alias hits ≥ 2, pair hit, score ≥ 40 | negative-discipline engineering (see below) |
| Determinism | explicit `toLowerCase`/code-point lowercase, fixed orders, (score desc, id asc) | digest §d + harness contract |

Normalization (digest §c, all implemented): NFKD + combining-mark strip;
Lucene-WDGF case/letter↔digit splitting with catenated originals at index time
only; dotted/id-like tokens kept whole AND split, whole token = exact tier;
no stemming; astral-safe code-point iteration.

## Deviations from the digest (each with the concrete reason)

1. **Id-like token shape broadened** from `/^[a-z]+(\.\d+)+$/i` to
   letter-initial alnum/hyphen segments joined by `.`/`:`. The real corpus ids
   include `A.1.CSD`, `E.24.UK`, `A.19a`, `lex:*`, `route:*`, `heading:*:NNN`
   — the digest's regex matches none of the letter-segment forms.
2. **Trigram prefilter floor 0.2 instead of 0.3** (len ≥ 5; 0.15 for 3–4).
   Measured: a mid-word transposition on a 6-char word ("Visoin"→"vision")
   gives J = 3/11 ≈ 0.27, so the flat 0.3 vetoes d=1 corrections the banded-DL
   verifier accepts. pg_trgm's 0.3 is its *match* criterion with no verifier
   behind it; here the DL verify is the true gate and the trigram sim is only a
   prefilter. Corrections still need sim ≥ 0.3 to count as negative-gate
   anchors, exactly as the digest prescribes.
3. **Corpus-derived auto-stop set** (df ratio > 0.10, plus single-char terms),
   excluded from scoring and the coordination multiplier when the query has any
   content term. The digest is silent on stopwords; on this corpus the 8.4k
   tiny lexeme docs dilute df so badly that glue and concept words are
   indistinguishable ("is" 8.8% ≈ "context" 8.5%), and question-style queries
   ("What is …", "Explain … from the spec") let glue terms multiply chatty
   pattern-body scores past quoted-title answers. No hardcoded word list —
   fully corpus-derived and deterministic.
4. **Aliases indexed as one concatenated field** (per-field stats still
   separate) rather than "each alias its own field instance"; the contextual
   pair field is built per alias instance, which restores the phrase-level
   signal the instance split was for.
5. **Contextual pair field promoted to a scored field** (digest lists it in
   "steal this" but not in recipe (a)). It is what lets a quoted — possibly
   typo'd — title or alias beat 32KB bodies that merely mention all the words:
   dev typo R@5 76→100%, alias 88→100%, definition MRR 0.74→0.84 with no
   negative-rate cost.
6. **Negative discipline extended beyond anchor+floor** (digest §a's floor
   alone could not separate leaks at score ≈ 350 from legit definition hits at
   ≈ 320): three floors (2 exact-anchored / 40 fuzzy-only / 400 body-only-top)
   plus a trusted-rescue scan (a title/alias+pair-matched doc in top-k keeps
   the list when a chatty body doc outranks it). Calibrated on dev **category**
   score distributions only; no per-question logic anywhere.
7. **`lexemeBoost` 0.95**: 311 pattern titles are mirrored verbatim by lexeme
   stub docs; BM25 length normalization always ranks the tiny mirror above the
   real pattern. The 5% docBoost nudge (MiniSearch's docBoost slot) reorders
   only near-ties. Dev sweep showed anything below ~0.9 harms alias/definition
   (gold legitimately expects lexeme docs there).

## Dev results (gold/dev.json, 150 cases, k=10)

Overall: **R@1 60.0% · R@5 78.6% · R@10 84.3% · MRR@10 0.674 · nDCG@10 0.714 ·
negative-clean 10/10 · deterministic ✓**

| category | n | R@5 | MRR@10 |
| --- | ---: | ---: | ---: |
| id-lookup | 17 | 100% | 1.000 |
| title | 17 | 100% | 1.000 |
| alias | 16 | 100% | 0.917 |
| typo | 17 | 100% | 0.931 |
| definition | 17 | 94.1% | 0.843 |
| task | 19 | 52.6% | 0.319 |
| paraphrase | 21 | 61.9% | 0.383 |
| multi-hop | 16 | 25.0% | 0.085 |

Multi-hop is the known ceiling of a purely lexical candidate (it returns the
*mentioned* node; the gold answer is its neighbor) — that category belongs to
the graph candidates. Task/paraphrase are body-match categories where the
ranker has no synonymy signal beyond prefix/fuzzy.

Perf: build ≈ 0.8 s (9,155 docs; 53,718-term vocab; 752k field postings; 701k
trigram entries; 20k pair keys). Query p50 0.41 ms / p95 3.0 ms / mean 0.8 ms.
Retained index ≈ 40 MB JS heap (~19 MB payload estimate; postings compacted
into shared Int32Arrays keyed by numeric term/pair ids). Process rss peaks
around ~600 MB during the 0.8 s build (JSC allocator retention of tokenizer
churn; it is reused, not leaked, and the retained footprint after build is the
~40 MB above).

## Tuning log (category-level only)

r1 anchor gate on all-docs df ratio ≤ 0.05: R@5 67.9, MRR 0.561, neg 3/10 —
gate blanked mid-frequency definition queries. r2 auto-stop + content anchors:
R@5 73.6, MRR 0.617. r3 floors + ta-exemption: neg 10/10. r4 contextual pairs
+ trusted rescue: typo/alias → 100%. r5 lexemeBoost 0.95 + pairBoost 18: MRR
0.674 (title MRR → 1.000). Sweeps rejected: lexemeBoost ≤ 0.9 (alias/definition
drop), matched-multiplier caps (task/paraphrase collapse), fuzzy-only floor ≥
80 (no gain).
