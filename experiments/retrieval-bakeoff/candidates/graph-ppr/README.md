# graph-ppr — lexical seed + Personalized PageRank

Implements the recommended graph recipe of `research/graph-semantics.md`
section (a): fielded-BM25 seeding, HippoRAG-style teleport with node
specificity, α=0.5 damped PPR with exactly 20 iterations, relation-typed edge
weights, lexeme folding, degree-bias defenses, a lexical abstention gate, and
a dev-ablated lexical×walk combination.

Registration line for `harness/registry.ts`:

```ts
'graph-ppr': async () => new (await import('../candidates/graph-ppr/index.js')).default(),
```

Files: `index.ts` (retriever), `bm25f.ts` (self-contained fielded BM25),
`tokenize.ts` (shared tokenizer), `ablation/*.ts` (parameter variants used for
the dev sweeps below; not registered, loaded via `--factory` only).

## Dev results (shipped defaults)

Gold set: `dev-generated` (110 cases: 100 positive across 6 categories + 10
negative). `gold/dev.json` was not materialized at build time;
`gold/dev-generated.json` is the generated dev split and was only ever read by
the harness (`bun harness/run.ts --gold dev-generated ...`) — candidate code
and the author never opened any file under `gold/`, and all tuning below is at
whole-category level (no per-question logic anywhere).

| candidate | R@1 | R@5 | R@10 | MRR@10 | nDCG@10 | neg-clean | p50 ms | p95 ms | build ms | det |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | :-: |
| graph-ppr | 62.0% | 74.0% | 77.0% | 0.677 | 0.700 | 50.0% | 2.29 | 2.68 | 714 | ✓ |

Per category (R@5 / MRR@10): id-lookup 100%/.838 · title 100%/.971 ·
definition 88%/.892 · alias 81%/.758 · typo 53%/.482 · multi-hop 19%/.090.
Index footprint ≈ 14.8 MB. Reproduce:
`bun harness/run.ts --gold dev-generated --factory candidates/graph-ppr/index.ts`.

## Pipeline

1. **Lexical seeding** — internal fielded BM25 ("simple BM25F"):
   `score = Σ_t qtf·idf(t)·tf̃/(k1+tf̃)`, `tf̃ = Σ_f w_f·tf_f/((1−b)+b·len_f/avg_f)`,
   Robertson idf. Fields: title (= doc-id tokens + title tokens, w=4.0),
   aliases (w=3.0), text (w=1.0); k1=1.2, b=0.75. Tokenizer: ASCII lowercase,
   splits camelCase, letter↔digit, and `.`/`-`/`_`/`:` glue, AND emits the
   whole glued run as a compound token (`A.2.3` → `a`,`2`,`3`,`a.2.3`) — the
   compound is the high-idf handle for dotted FPF IDs. No stemming, no
   stopwords. Top-100 kept as the lexical pool, top-32 as PPR seeds.
2. **Abstention gate** — if max BM25F score < τ=5, return `[]` before walking.
3. **Teleport** — `r(v) ∝ lex(v)·spec(v)`, `spec(v)=1/(1+ln(1+degree(v)))`,
   normalized to sum 1 (HippoRAG node specificity, degree-based).
4. **PPR** — `π ← (1−α)·r + α·(Wᵀπ + dangling·r)`, α=0.5, **exactly 20
   iterations** (α^20≈1e-6), dangling mass reinjected into `r` (388 prefaces
   have zero edges). W = row-normalized relation-weighted adjacency.
5. **Fold** — each lexeme's π is *also* credited to its `lexical_match`
   target(s), split evenly. Copy, not move (see lexeme policy).
6. **Degree correction** — `walk(v) = π_folded(v)/pr0_folded(v)^ρ`, with pr0 =
   global PageRank (uniform teleport, same α, fixed 40 iterations at build,
   folded identically). **Dev picked ρ=0** (see below). Degree-0 nodes get no
   walk score (see deviations).
7. **Combine** — convex `λ·n(lex) + (1−λ)·n(walk)` with `n(x)=x/max(x)`
   (theoretical-min–max, min=0 for both sources), λ=0.75, over the union of
   lexical top-100 and walk top-100.
8. Sort (score desc, id asc), slice k.

## Parameters and provenance

| parameter | value | provenance |
| --- | --- | --- |
| k1, b | 1.2, 0.75 | task/digest standard BM25 defaults; not swept |
| field weights title/alias/text | 4.0 / 3.0 / 1.0 | a-priori "title/aliases over text"; not swept (title+alias already solve title/id-lookup on dev) |
| seedN | 32 | digest §a.1; dev sweep on the shipped base {8,16,32,64} → MRR .664/.670/**.677**/.654 |
| α (damping) | 0.5 | digest §a (HippoRAG2 convention, ~2-hop mass) |
| PPR iterations | 20 fixed | digest §a.3 (α^K ≤ 1e-6; fixed count for determinism) |
| pr0 iterations | 40 fixed | build-time, digest leaves count open; 2× query K for safety, still <15 ms |
| dangling mass | → r | digest §d ("uniform leaks mass to hubs") |
| edge weights | table below | digest §a.2 mapped onto real relation names |
| spec(v) | on | digest §a.1; dev check: off = −.003 MRR (flow base .652 vs .655) — small but kept |
| ρ | **0** | dev sweep {0, .25, .5, 1} → MRR .670/.631/.604/.444 (convex λ=.7, pi): every ρ>0 promotes lexeme leaves and isolated nodes over target patterns (id-lookup MRR .81→.51 at ρ=.5). Digest predicted a ρ≈.5 sweet spot; dev evidence says otherwise on this corpus — documented deviation |
| λ | 0.75 | dev sweep {.3,.5,.6,.7,.75,.8,.9} → .611/.639/.663/.670/.677/.673/.653 (plateau .67+ across .7–.8) |
| τ (gate) | 5.0 | dev sweep {0,3,4,5,6,9,12} → neg-clean 40/50/50/50/50/70/100% with positive MRR flat through τ=5, −.003 at τ=6, −.016 at τ=9, −.25 at τ=12. τ=5 = largest gate that loses no positive case |
| walkScore | 'pi' | see flow experiment below |
| walkGamma | 1 (off) | sharpening probe failed (below) |
| walkForIsolated | false | dev: keeping isolated nodes in the walk = −.107 MRR at ρ=.5 (.497 vs .604); ≈ neutral in flow mode, kept off as the safe default |

## Edge weights (digest names → corpus relations)

The corpus's ~62k edges use different relation names than the digest's
idealized list; mapping (forward / `rev:`):

| corpus relation | w fwd | w rev | digest anchor |
| --- | ---: | ---: | --- |
| lexical_match (lexeme→node) | 1.0 | 0.1 | "lexeme→node 1.0", "rev:lexeme 0.1" (alias-fan defense) |
| builds_on, refines | 0.8 | 0.4 | "builds_on/refines 0.8", rev 0.4 |
| prerequisite_for, used_by | 0.4 | 0.8 | semantic inverses of builds_on (A prerequisite_for B ⇒ B depends on A), so fwd/rev swapped |
| coordinates_with, interacts_with | 0.5 | 0.5 | symmetric "relates" (digest: rev:relates 0.5) |
| explicit_reference, constrains, constrained_by, informs, enables, route_step, landing_on, current_route_surface, typical_next_owner | 0.5 | 0.4 | directional "relates", reverses lower |
| route_hint | 0.3 | 0.2 | duplicates route_step pairs — halved to avoid double-counting |
| outline_child, outline_parent | 0.5 | 0.2 | hierarchy; rev:* duplicates the paired forward relation |
| outline_next/prev_sibling | 0.3 | 0.15 | weak topical adjacency |
| (unknown future relation) | 0.5 | 0.4 | digest "relates" default |

Dev check: replacing the whole table with uniform 1.0 weights costs only
−.001 MRR at the winning config (.672 vs .673 at λ=.8) — the fold + lexical
convex term dominate once ρ=0. The typed table is kept (a-priori structure,
no dev evidence against it, and it is the documented digest recipe).

## Combination-strategy ablation (required)

All at ρ=0, τ=5, γ=1, walkScore='pi' unless noted
(`results/graph-ppr-ablation{2,3,4}.json`):

| strategy | R@1 | R@5 | R@10 | MRR@10 | nDCG@10 |
| --- | ---: | ---: | ---: | ---: | ---: |
| **convex λ=0.75 (winner, shipped)** | **62%** | **74%** | **77%** | **0.677** | **0.700** |
| convex λ=0.8 | 62% | 74% | 77% | 0.673 | 0.697 |
| multiplicative β=0.5 | 62% | 74% | 77% | 0.675 | 0.698 |
| multiplicative β=1.0 | 61% | 75% | 78% | 0.673 | 0.699 |
| multiplicative β=1.5 | 58% | 75% | 78% | 0.660 | 0.690 |
| pure π (HippoRAG-style; τ=6) | 54% | 78% | 82% | 0.635 | 0.680 |

Convex λ=0.75 and mult β=0.5 are statistically indistinguishable on 100
positives (~1 case apart); convex wins the headline MRR/nDCG and is the
digest's primary recommendation (Bruch et al.), so it ships. Pure walk has
the best deep recall (R@10 82%) but poor top-1 — kept as an ablation row.

## The multi-hop finding (honest limitation)

The walk *does* solve multi-hop: a pure **flow** walk (π minus each seed's own
teleport retention — implemented as `walkScore:'flow'`) reaches **81% R@5 on
multi-hop** (vs 19% shipped) because 1-hop inflow is no longer drowned by the
(1−α) self-retention of seeds. But those answers sit at walk rank 2–5 with
small normalized magnitudes, and every magnitude fusion tried (λ down to 0.3,
walkN^γ sharpening γ∈{1.5,2,3}, mult β up to 2) lets docs that score
moderately in *both* lists leapfrog docs that only the walk finds:
category-level dev results — multi-hop never exceeded 31% R@5 in any combined
mode, while id-lookup/definition degrade quickly below λ≈0.7. It is a
two-list Condorcet conflict, not a tuning gap. The shipped config takes the
overall-MRR optimum; `ablation/puref-r00.ts` documents the multi-hop ceiling.
(A future candidate could union a small quota of walk-only hits into the tail
of the top-10.)

## Lexeme policy

The digest suggests folding lexeme mass into targets and returning only
pattern/route/preface. Tempered here because gold may expect lexeme IDs:

- lexeme π mass **is** folded into `lexical_match` targets (evenly split), so
  alias→pattern bridging works as designed;
- the fold is a **copy, not a move** — lexemes keep their own π and their own
  BM25F score, remain fully rankable, and **no kind is filtered** from output.

## Negative gate

`max lex < τ ⇒ []`, checked before the walk (digest §a.6 — PPR otherwise
always returns something). τ=5 keeps every dev positive while cleaning 5/10
dev negatives; the remaining 5 contain real spec vocabulary and score well
above any τ that doesn't also gate typo/definition positives (τ=12 reaches
100% clean at −.256 MRR). Chosen trade-off: never sacrifice positives.

## Deviations from the digest (all evidence-backed, none per-question)

1. **ρ=0** instead of ρ≈0.5 — full sweep above; the π/pr0^ρ quotient
   over-promotes lexeme leaves and isolated nodes on this corpus (the digest
   itself warns partial correction can over-promote obscure leaves and says
   tune on dev).
2. **Degree-0 nodes excluded from walk scoring** (`walkForIsolated:false`) —
   388 prefaces have no edges at all; their π is teleport retention, they
   seed at spec=1.0, and ρ>0 divides them by the minimum pr0: a triple boost
   with zero structural evidence (smoke: giant prefaces outranked the
   exact-ID pattern; dev: −.107 MRR when kept, at ρ=.5). They still rank via
   the lexical term — the Kurland & Lee re-ranker framing.
3. **Relation-name mapping** — the digest's builds_on/refines/relates names
   were mapped onto the 40+ real corpus relations (table above), including
   direction flips for `prerequisite_for`/`used_by` and de-duplication
   down-weights for `route_hint`/`outline rev` pairs.
4. **pr0 iteration count 40** (digest leaves it open; fixed, build-time).
5. `walkScore:'flow'` and `walkGamma` exist as documented experimental
   options (defaults off) — kept because the flow result is the interesting
   negative finding above.

## Constraints checklist

- Pure TypeScript, zero npm deps, no imports from `src/` or other candidates.
- Build ≈ 0.7–0.9 s (budget 5 s); query p50 2.3 ms, p95 2.7 ms (budget 30 ms).
- Deterministic: codepoint-sorted node order (no localeCompare), fixed
  iteration counts, f64 accumulators, (score desc, id asc) ties, no
  randomness/Date/locale ops; harness determinism check ✓.
- `query()` never throws (defensive try/catch → `[]`).
- No gold reads by candidate code; tuning via harness runs only,
  category-level only.
