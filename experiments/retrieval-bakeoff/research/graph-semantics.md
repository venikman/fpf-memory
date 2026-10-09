# Graph-augmented retrieval & model-free semantic similarity — research digest

Scope: candidates for the bake-off corpus (9,155 nodes: 311 patterns, 8,453 lexeme alias
docs, 388 prefaces, 3 routes; ~62k typed edges incl. `rev:` reverses). Constraints: pure
TS/Bun, deterministic, no deps, no weights, build in seconds, query in milliseconds.

## (a) Recommended graph candidate: lexical seed + Personalized PageRank

Modern precedent is HippoRAG (NeurIPS 2024): extract query concepts, seed PPR on a
concept/passage graph with per-seed weights, rank docs by accumulated walk mass. Two of
its choices transfer directly here: **damping 0.5** (HippoRAG2 calls igraph PPR with
damping=0.5, i.e. restart prob 0.5 — keeps mass within ~2 hops, matching our `multi-hop`
gold category which needs exactly one relation hop) and **node specificity** (seed weight
multiplied by an inverse-frequency term so generic hub concepts don't dominate). The
older, purely lexical precedent is Kurland & Lee (SIGIR 2005): PageRank over links induced
between top-retrieved docs improves precision at top ranks — i.e. run the walk as a
*re-ranker over a lexically retrieved set*, not as a standalone retriever.

Recipe (all numbers are starting points; tune only on `gold/dev.json`):

1. **Seeds.** Take top N=32 docs from the lexical stage (BM25F candidate) with scores
   `lex(v)`. Teleport vector `r(v) ∝ lex(v) · spec(v)`, normalized to sum 1, where
   `spec(v) = 1/(1 + ln(1 + degree(v)))` (HippoRAG's node-specificity idea, degree-based
   since we have no passage-frequency). Lexeme docs are fine as seeds — they are exactly
   the alias→pattern bridges the walk should exploit.
2. **Edge weights by relation**, then row-normalize out-edges:
   `lexeme→node 1.0; builds_on 0.8; refines 0.8; relates 0.5; rev:builds_on 0.4;
   rev:refines 0.4; rev:relates 0.5; rev:lexeme (node→its alias fan) 0.1`.
   The `rev:lexeme` down-weight matters: a pattern with 200 aliases would otherwise spray
   half its mass into dead-end lexeme leaves.
3. **PPR iteration.** `π ← (1−α)·r + α·Wᵀπ` with α=0.5, dangling mass reinjected into
   `r` (not uniform). Convergence of power iteration is geometric at rate α (Gleich,
   "PageRank beyond the Web"): error ≤ α^K, so **K=20 fixed iterations** gives ≤1e-6 —
   use a fixed count, not a tolerance loop, for byte-identical determinism. Cost/iter ≈
   62k edge ops + 9k node ops ⇒ ~1.3M ops for the whole walk, well under 1 ms in Bun.
   No precomputation needed; run per query. (If you ever need sparser work, the
   Andersen–Chung–Lang forward-push algorithm computes ε-approximate PPR touching only
   the seed neighborhood, and is also deterministic given a fixed push order.)
4. **Fold + filter.** Add each lexeme node's π mass into its target node(s); return only
   `pattern|route|preface` kinds. Sort by (score desc, id asc) for tie determinism.
5. **Combine with lexical** — see (c).
6. **Abstention gate.** PPR always returns something; the harness rewards empty output on
   nonsense. If `max lex(v) < τ` (tuned on dev negatives), return `[]` before walking.

**Spreading activation as the simpler alternative.** Classic results say it only works
*constrained*: Salton & Buckley (SIGIR 1988) — limit to a few hops with decay < 1;
Crestani's survey (AI Review 1997) — distance, fan-out, path, and activation-threshold
constraints; Berthold et al., "Pure Spreading Activation is Pointless" — unconstrained SA
converges to a query-independent eigenvector. Concrete parameters: 2 pulses; per-hop decay
δ=0.6; spread `A_{h+1}(v) += A_h(u)·w(u,v)·δ / log2(2 + outdeg(u))` (fan-out constraint);
drop activations < 1e-4. Note that constrained SA ≡ a truncated 2-step damped walk, and
full PPR is already <1 ms here, so PPR is the primary; keep SA only as a debuggable
baseline or if PPR shows hub pathologies that constraints fix more surgically.

### Degree bias corrections (needed — alias fans and core patterns are hubs)

- **Seed-side:** the `spec(v)` inverse-log-degree factor above (HippoRAG's fix; without
  it, generic high-frequency concepts dominate their retrieval).
- **Edge-side:** the `rev:lexeme` down-weight, and optionally Adamic–Adar-style
  `1/log(1+deg)` attenuation on edges *into* very high-degree nodes.
- **Post-hoc normalization:** for undirected graphs PageRank ∝ degree, so dividing by
  degree (equivalently by global PageRank) factors popularity out; this is the standard
  correction (PLOS One "Equal Opportunity for Low-Degree Network Nodes"; Kloumann–Ugander–
  Kleinberg show π(v)/deg(v) is the right statistic for seed-based recovery; ACL push
  natively outputs degree-normalized PPR). Recipe: precompute global PageRank `pr0`
  (uniform teleport, same α) at build; rank by `π(v)/pr0(v)^ρ`. Tune ρ ∈ {0, 0.25, 0.5, 1}
  on dev; expect the sweet spot at partial correction (ρ≈0.5) — full ρ=1 over-promotes
  obscure leaves.

## (b) Model-free semantics: LSA go/no-go, and what to build instead

### Pure-TS LSA feasibility (honest numbers)

Matrix: 9,155 docs × V terms, V ≈ 40–120k (single-domain spec; expect the low end).
Non-zeros ≈ 311×~1.6k + 388×~300 + 8,453×~8 ≈ **0.7–1.2M nnz** (~10 MB CSR, f32+u32).
Algorithm: randomized-style subspace iteration (Halko–Martinsson–Tropp), derandomized —
see sketch below. Per pass: two sparse products (nnz·ℓ each) + one tall QR (2·m·ℓ² for
modified Gram–Schmidt, ×2 with re-orthogonalization). Text spectra decay slowly, so q≈4–5
power iterations with QR renormalization is the honest setting (scikit-learn's LSA default
is n_iter=5, n_oversamples=10 for exactly this reason).

| rank k | ℓ=k+32 | sparse FLOPs | QR FLOPs | total | est. wall (Bun, ~0.5–1.5 GFLOP/s scalar) | peak RAM |
|---|---|---|---|---|---|---|
| 128 | 160 | ~1.4 G | ~7.5 G | ~9–10 G | **6–20 s** | ~130 MB (V×ℓ f32 buffer 64 MB + factors) |
| 256 | 288 | ~4.6 G | ~24 G | ~30 G | **20–60+ s** | ~250 MB |

**Verdict: rank 256 is a NO-GO** (blows the "seconds" build budget in single-threaded JS).
**Rank 128 is a marginal GO** (~10 s if V≈50k) — but poor cost/benefit here: 92% of docs
are ~8-term alias stubs whose LSA vectors are near-degenerate; the latent space would be
fit almost entirely to 311 patterns; and ~400 lines of numerically careful linear algebra
is real implementation risk. **Recommendation: do not build LSA first.** Build Random
Indexing (below); revisit LSA rank 128 only if RI shows a semantic gap worth chasing.

Deterministic, stable sketch (if attempted): seed Ω (m×ℓ) with Rademacher ±1 from
`sign(hash64(docId, j))` — no RNG; `Q ← MGS-QR(Ω)`; repeat exactly q=4 times
`{ Z ← AᵀQ (f32 buffer, f64 accumulators); Y ← AZ; Q ← MGS-QR(Y) with one
re-orthogonalization pass ("twice is enough") }`; then `B ← QᵀA` (= last Zᵀ), Gram
`C = BBᵀ` (ℓ×ℓ), eigendecompose C by cyclic Jacobi with a fixed sweep count (~12) —
fully deterministic; doc factors `U_k Σ_k = Q·(eigvecs·Σ)`, term factors
`V_k = Bᵀ·eigvecs·Σ⁻¹`; queries fold in as `q̂ = Σ⁻¹V_kᵀ q`, cosine vs doc factors.
Gram squaring doubles the condition number — acceptable in f64 for top-k of an LSA
spectrum. Fixed iteration/sweep counts + fixed seed ⇒ byte-identical output.

### Recommended semantic candidate: Reflective Random Indexing, d=1024

Random Indexing (Kanerva et al. 2000; Sahlgren's intro): give each term a sparse ternary
"index vector" (d dims, s non-zeros, values ±1, near-orthogonal w.h.p.); a doc vector is
the tf-idf-weighted sum of its terms' index vectors. Reported quality is LSA-class on
TOEFL synonymy: RI 64.5–67% (up to 72% with lemmatization) vs LSA 64.4% (Landauer &
Dumais 1997) — i.e. competitive, at a tiny fraction of the cost, no SVD. Reflective RI
(Cohen, Schvaneveldt & Widdows, J. Biomed. Informatics 2010) adds a second pass (terms ←
docs ← terms) that captures *indirect* term relations (terms that never co-occur), which
is exactly the paraphrase/multi-hop vocabulary-mismatch case; their applied setting used
d=1000, seed length 10.

Deterministic construction for this corpus:
- d=1024, s=8. Index vector of term t: run hash64(t) through a counter-based mix to pick
  8 distinct positions and 8 signs. No stored randomness; identical across runs/machines.
- Pass 0: `docvec(D) = Σ_t tfidf(t,D) · index(t)`, cost nnz·s ≈ 8M scatter-adds (<0.1 s).
  L2-normalize.
- Reflective pass: `termvec(t) = Σ_D tfidf(t,D) · docvec(D)` then re-derive
  `docvec'(D) = Σ_t tfidf(t,D) · termvec(t)`, both L2-normalized; each pass is nnz·d ≈
  1 GFLOP ⇒ **build ~2–5 s total at d=1024** (halve with d=512). RAM: 9,155·1024·4 ≈
  37 MB docs + term table (only for query terms if you stream) — cap ~80 MB.
- Query: sum termvecs of query terms (idf-weighted), cosine against all doc vectors:
  9,155·1024 ≈ 9.4M FMA ≈ **2–8 ms**; restrict the scan to lexical∪graph candidates if
  p95 matters.
- Apply idf when accumulating (else frequent terms swamp the space) and lowercase/stem
  identically to the lexical candidate.

### PMI query expansion — build only as a cheap add-on, eyes open

The literature is *cautionary* about global co-occurrence expansion: Peat & Willett
(JASIS 1991) found expanded queries often no better or worse — co-occurring terms tend to
be frequent, poorly discriminating; Xu & Croft (SIGIR 1996) showed *local* (pseudo-
relevance feedback) beats *global* corpus analysis. So a global PMI expansion is **not a
proven win**; a deterministic **RM3-style pseudo-relevance feedback** is the proven
version of the same idea (Lavrenko & Croft, SIGIR 2001): take top-10 BM25F docs, extract
top-20 terms by relevance-model weight, re-query with interpolation λ=0.5 — fully
deterministic, no new index. If global PMI is still attempted: PPMI weighting (best simple
scheme per Bullinaria & Levy 2007, over HAL-style raw counts; COALS-style normalization
is the fancier variant), min count 5, drop terms with df > 10% of docs, score candidate
terms by *summed* association to all query terms (Qiu & Frei's fix for per-term noise),
add top m=5 with weights damped ×0.3. Note this corpus already has 8,453 curated alias
docs — the graph gives synonym expansion for free, so PMI expansion is the lowest-priority
candidate of this digest.

## (c) Combining scores (lexical × graph × semantic)

- **Primary: tuned convex combination on normalized scores.** Bruch, Gai & Ingber (ACM
  TOIS 2023) show a convex combination `λ·n(lex) + (1−λ)·n(other)` with min-max (or
  theoretical-min-max) normalization outperforms RRF in- and out-of-domain, is largely
  normalization-agnostic once λ is tuned, and needs only a handful of labeled queries —
  we have `gold/dev.json`. Start λ=0.7 lexical / 0.3 walk (graph candidate), λ=0.75 /
  0.25 semantic (RI candidate); tune per candidate on dev. Normalize per query over the
  union of each source's top-100.
- **Fallback / 3+ sources: Reciprocal Rank Fusion**, `Σ 1/(60 + rank_i)` (Cormack, Clarke
  & Büttcher, SIGIR 2009). Scale-free, no tuning, robust — the right tool for a final
  "kitchen-sink" fused candidate; but Bruch et al. show it is *not* parameter-insensitive
  and discards score magnitude, so don't let it be the only fusion tried.
- **Multiplicative gate** for the graph candidate: `lex(v)·(1 + β·π̃(v))`, β≈1. Keeps
  graph influence as re-ranking of lexically-live docs only (the Kurland & Lee framing),
  and automatically returns nothing for negative queries where lex=0. Worth an ablation
  row vs the convex form; HippoRAG-style pure-π ranking (walk score only, lexical only in
  the teleport) is the third ablation.

## (d) Pitfalls checklist

- [ ] Hubs: alias-fan patterns and core builds_on targets dominate the walk — verify the
      spec/rev:lexeme/ρ corrections actually move dev metrics, don't stack all three blindly.
- [ ] Reverse edges double-count a relation; weight `rev:*` below forward, never equal.
- [ ] Dangling nodes: reinject to teleport vector, not uniform (uniform leaks mass to hubs).
- [ ] Determinism: fixed iteration counts (no tolerance loops), fixed node order, ties
      broken by id, no Math.random/Date, f64 accumulators, no locale string ops.
- [ ] Negative queries: PPR/RI always score something — gate on lexical evidence first.
- [ ] Single-seed queries: all teleport mass on one node ⇒ walk = neighborhood dump;
      keep λ high so lexical rank survives.
- [ ] Per-query min-max is outlier-sensitive; prefer theoretical min-max (Bruch et al.).
- [ ] LSA: no re-orthogonalization ⇒ basis collapse in power iterations; tiny alias docs
      get junk vectors — consider excluding lexeme docs from the factorization and folding
      them in as pseudo-queries.
- [ ] RI: too-small d or too-large s ⇒ collision noise (keep d≥512, s≈8); skip idf
      weighting and stopword-like terms eat the space; L2-normalize between reflective passes.
- [ ] PMI: rare-term PMI explodes (min count, PPMI, damping); expansion drift on short
      queries (sum association over all query terms, cap m).
- [ ] Latency: precompute global PageRank and degree tables at build; keep the RI scan on
      f32 typed arrays; PPR per query is ~1 ms — don't precompute per-node PPR matrices.

## (e) Sources

- HippoRAG (PPR seeds, node specificity, damping 0.5): https://arxiv.org/abs/2405.14831 ; damping/seed conventions analysis: https://www.emergentmind.com/topics/hipporag-2
- Gleich, "PageRank beyond the Web" (convergence α^K, damped diffusions): https://arxiv.org/pdf/1407.5107
- Andersen–Chung–Lang push / degree-normalized PPR, and PPR survey: https://arxiv.org/pdf/1109.4680 , https://arxiv.org/html/2403.05198v1
- PageRank/degree quotient correction: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0054204 (see also Kloumann–Ugander–Kleinberg, PNAS 2017, π/deg for seed recovery)
- Kurland & Lee, "PageRank without hyperlinks" (structural re-ranking): https://arxiv.org/pdf/cs/0601045
- Crestani, spreading-activation survey: https://link.springer.com/article/10.1023/A:1006569829653 ; Salton & Buckley, SIGIR 1988 (constrained SA); Berthold et al., "Pure Spreading Activation is Pointless": https://d-nb.info/1114665754/34
- Bruch, Gai & Ingber, "An Analysis of Fusion Functions for Hybrid Retrieval": https://arxiv.org/abs/2210.11934
- Cormack, Clarke & Büttcher, RRF (SIGIR 2009): https://dl.acm.org/doi/10.1145/1571941.1572114
- Halko, Martinsson & Tropp, randomized SVD: https://arxiv.org/abs/0909.4061 ; scikit-learn LSA defaults (n_iter=5): https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.TruncatedSVD.html
- Sahlgren, "An Introduction to Random Indexing" (d, TOEFL numbers): https://www.diva-portal.org/smash/get/diva2:1041127/FULLTEXT01.pdf ; Kanerva et al. 2000 (RI for LSA, TOEFL)
- Cohen, Schvaneveldt & Widdows, Reflective Random Indexing: https://www.sciencedirect.com/science/article/pii/S1532046409001208
- Peat & Willett, limits of co-occurrence expansion: https://ir.webis.de/anthology/1991.jasis_journal-ir0anthology0volumeA42A5.7/
- Xu & Croft, local vs global expansion: https://dl.acm.org/doi/10.1145/243199.243202 ; local context analysis (TOIS 2000): https://dl.acm.org/doi/10.1145/333135.333138
- Lavrenko & Croft, relevance models (RM3 basis): https://dl.acm.org/doi/10.1145/383952.383972
- Bullinaria & Levy, PPMI best simple co-occurrence weighting: https://doi.org/10.3758/BF03193020 (HAL: Lund & Burgess 1996; COALS: Rohde et al. 2006)
