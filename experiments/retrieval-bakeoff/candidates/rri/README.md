# rri — Reflective Random Indexing (model-free semantics)

Implements the recommended semantic candidate from
`research/graph-semantics.md` §(b): **Reflective Random Indexing** (Kanerva et
al. 2000; Sahlgren's RI intro; Cohen, Schvaneveldt & Widdows, *Reflective
Random Indexing*, J. Biomed. Informatics 2010). The digest's LSA verdict was
no-go; no SVD is performed anywhere. Pure TypeScript, zero deps, zero stored
randomness — every vector is a pure function of the corpus text.

## Construction

1. **Ternary index vectors** — each term gets d=1024 dims with s=8 non-zeros
   (exactly 4 at +1, 4 at −1). Positions/signs come from a 32-bit FNV-1a hash
   of the term string driven through an xorshift32 chain (duplicate positions
   rejected and redrawn; signs forced to balance). d is a power of two, so
   `hash & 1023` has zero modulo bias. Identical across runs and machines.
2. **Direct channel (pass 0)** — doc vector = Σ over terms of
   `idf(t) · Σ_f w_f · tf_f/(tf_f+k1) · index(t)`, L2-normalized. Per-field
   saturation caps any term's contribution from a 324KB body (the giants
   guard) while preserving title/alias dominance.
3. **Reflective channel (one pass)** — term vectors retrained as the weighted
   sum of the pass-0 vectors of docs containing them; doc vectors rebuilt from
   those term vectors; L2 normalization between passes; f64 accumulators, f32
   storage. This captures *indirect* term relations (terms that never
   co-occur) — the paraphrase / vocabulary-mismatch case the digest targets.
   Term training runs on a CSR transpose in fixed doc order.
4. **Query** — two vectors: index-only (direct channel) and
   `γ·index + (1−γ)·reflective-term` (reflective channel, i8-quantized term
   vectors with per-row scales), idf^1.5-weighted; one brute-force pass over
   all 9,155 docs scores `kindMult · (λ·cosDirect + (1−λ)·cosReflective)`
   plus exact-tier bonuses; ties `(score desc, id asc)`.

Two corpus-shape adaptations, both taken from the digests themselves:

- **Lexeme stubs are excluded from reflective *training*** and folded back in
  as pseudo-docs when the reflective doc matrix is rebuilt — the digest's own
  pitfall ("tiny alias docs get junk vectors — exclude them from the
  factorization and fold them in as pseudo-queries"). Measured: training on
  all 9,155 docs (8,453 of them 81-char stubs) made reflective doc vectors
  collapse toward hub clusters (single-channel dev MRR 0.177–0.371 depending
  on blend, negatives leaking).
- **Anchor fold** — each stub's alias phrase is tokenized into its
  `lexical_match` target's alias field (lexical.md §(a).2 anchor-text move).
  This is also what carries alias vocabulary into the reflective pass after
  stubs are excluded from training.

## Two channels instead of one blended vector

The digest's base recipe scores one vector space. Measured on dev, a single
space is a forced trade-off: pass-0-only gets alias 94% / definition 100% but
**0%** on paraphrase/task/multi-hop; reflective-only flips the profile and
leaks negatives. Scoring `λ·cos₀ + (1−λ)·cos_R` (convex combination on
same-scale cosines — digest §(c), Bruch, Gai & Ingber, ACM TOIS 2023) keeps
both. Both channels are RRI cosines in the same hashed space; there is no
BM25/postings ranking anywhere in the scorer.

## Exact tier (hybrid guard — documented per the brief)

- **ID pinning**: whitespace/punct-delimited query spans, trimmed of edge
  `.:-`, looked up against lowercased corpus IDs; matches are returned first
  (query appearance order, scores 1000, 999, …). Lowercased IDs are unique in
  this corpus (verified at build would-be collisions are kept as lists).
- **Exact title/alias equality**: if the *whole* normalized query (lowercase,
  non-alnum → space) equals a doc's title (or a non-lexeme doc's alias), that
  doc gets +0.25 (+0.15 if it is a lexeme stub); an exact hit on a stub's
  title also gives its `lexical_match` targets +0.25 (digest §(a).4 "fold
  lexeme mass into its target"). Fires only on full-string equality, so
  near-miss titles still rank purely by RRI cosine.

Core ranking remains the RRI cosine: bonuses are additive constants on a
cosine scale and pinning only fires on verbatim corpus IDs.

## Negative gate

Digest pitfall: "RI always scores something — gate on lexical evidence first."

1. At least one known query term with idf ≥ 1.5.
2. **Known-mass gate**: known terms must carry ≥ 0.7 of the query's idf mass,
   with each unknown token priced at the corpus max idf (≈9.8). Dev
   category-level fact: genuine queries are ~100% corpus vocabulary; nonsense
   carries 3–4 unknown tokens (mass fraction ≈ 0.45). Plain token coverage
   cannot separate NL nonsense ("kayak repair shop … bagpipes") whose filler
   words are real corpus vocabulary with high idf (shop 7.6, festival 8.2).
3. Per-doc admission: `cos₀ ≥ 0.25` or `cos_R ≥ 0.5` or an exact-tier bonus;
   an empty survivor set returns `[]`.

Queries containing a real corpus ID bypass the gates (the pinned docs are
still returned). Query-side stopwords extend the Lucene 33 + interrogative
list (lexical.md §(a).1.4) with pronouns/auxiliaries — they are rare in spec
prose, so they would otherwise get idf 6–8 and dominate query vectors
(measured: "me" 6.0, "my" 7.9 vs content words 2–4).

## Typo bridge

Unknown query tokens (len ≥ 5, alphabetic) are resolved through a SymSpell
deletion-distance-1 map over the vocabulary (lexical.md §(a).1.6): candidates
ranked by collection frequency, ties lexicographic — deterministic. Term-level
substitution only; ranking is untouched.

## Parameters (provenance)

| param | value | provenance |
|---|---|---|
| d | 1024 | graph-semantics.md §(b) recipe |
| s | 8 (4+/4−) | ibid.; balanced signs per Sahlgren |
| reflective passes | 1 | ibid.; a second cycle measured **worse** (dev R@10 70.7% vs 72.9%) |
| λ (direct weight) | 0.5 | dev sweep {0.4,0.5,0.6,0.7,0.8,1.0} → MRR 0.528/0.539/0.489/0.482/0.461/0.421 |
| γ (query blend) | 0.25 | dev sweep {0,0.25,0.5,1.0}; γ=1 with reflective docs collapses (MRR 0.177) |
| direct fields title/alias/body | 6/4/1 | scaled from lexical.md BM25F table (6/5/1); dev: beats 4/3/1 by ~1pt R@5 |
| reflective fields | 2/2/1 | body-heavier for situation vocabulary; dev: paraphrase 43% vs 38%, task 26% vs 21% |
| k1 (tf saturation) | 1.2 | BM25 canonical range (lexical.md §(a).3) |
| queryIdfPow | 1.5 | dev sweep {1,1.5}: sharpens long NL queries; MRR 0.535→0.539, task 21→26% |
| kindMult lexeme/preface | 0.7 / 0.85 | incumbent runtime demotes lexemes; dev category fact: expected IDs are patterns (stubs only ever co-listed); preface=1.0 costs 0.10 MRR |
| exact bonus / stub bonus | 0.25 / 0.15 | fixed constants, fire on full-string equality only |
| τ_cos / τ_sem / τ_idf / τ_mass | 0.25 / 0.5 / 1.5 / 0.7 | dev negatives; τ_mass safe across {0.6,0.7,0.8} (negatives ≈0.45, genuine ≈1.0) |
| stemmer | Harman S-stemmer | lexical.md §(a).1.5 explicit low-risk fallback to Porter2; reflective pass supplies morphological smoothing |

Tuning was coordinate descent on `gold/dev.json` **category-level metrics
only** (per-category R@5/MRR tables from harness runs); no individual dev
question or ID is special-cased anywhere in the code.

## Dev results (solo runs, results/rri-final-solo.json)

Overall: **R@1 45.7% · R@5 65.0% · R@10 72.9% · MRR@10 0.539 · nDCG@10 0.585
· negatives 10/10 clean · p50 6.0ms · p95 7.1ms · build 2.4s · deterministic ✓**

Reflective pass effect (same config, `reflectivePasses: 0`, solo run):

| category | rri | no-reflect |
|---|---|---|
| id-lookup | 100% / 1.00 | 100% / 1.00 |
| title | 88% / 0.61 | 12% / 0.13 |
| alias | 88% / 0.74 | 94% / 0.90 |
| definition | 100% / 0.96 | 100% / 0.97 |
| paraphrase | **43% / 0.27** | 0% / 0.00 |
| typo | 65% / 0.58 | 53% / 0.53 |
| task | **26% / 0.12** | 0% / 0.00 |
| multi-hop | 19% / 0.12 | 0% / 0.00 |
| *overall R@5 / MRR* | **65.0% / 0.539** | 42.9% / 0.421 |

(cells: R@5 / MRR@10; paraphrase & task are this candidate's brief.)

Index: ~115 MB resident (37.5 MB × 2 doc matrices f32, 33 MB i8 term vectors
+ scales, typo map, hash tables). Exceeds the digest's soft ~80 MB note by
the second doc matrix — the price of the two-channel design; term vectors are
i8-quantized (per-row scale, ~0.4% max component error) to pay part of it back.

## Deviations from the digest recipe (all evidence-backed, dev solo runs)

1. **Two-channel convex combination** instead of a single vector space —
   single-space profiles above; digest §(c) endorses the fusion form.
2. **Stubs excluded from reflective training** — digest's own pitfall list;
   single-channel collapse measured before the change.
3. **One reflective pass confirmed, second cycle rejected** (R@10 −2.2pt).
4. **S-stemmer, not Porter2** — lexical.md's own fallback recommendation.
5. **Additions beyond the recipe**: exact tier + negative gates (both
   required by the brief), typo bridge (lexical.md §(a).1.6), kind priors
   (incumbent-runtime precedent), idf^1.5 query weighting (dev-tuned).

## Files

- `index.ts` — the candidate (default export, registered name `rri`)
- `tokenize.ts` — shared normalization/tokenizer/stemmer/ID-span extraction
- `ablations.ts` + `ablate/*.ts` — named variants for `--factory` tuning runs
  (not registered; each moves one knob from the default config)

Run: `bun harness/run.ts --gold dev --factory candidates/rri/index.ts`
