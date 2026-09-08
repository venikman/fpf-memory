# fusion — meta-retriever over the finished sub-candidates

Composes the four finished candidates (importing sibling candidate dirs is
explicitly allowed for this candidate; **no sibling code is modified**) plus a
second `graph-ppr` instance in its README-documented experimental pure
flow-walk configuration — constructor options only, identical to
`candidates/graph-ppr/ablation/puref-r00.ts`:
`{combine:'pure', walkScore:'flow', rho:0, walkGamma:1, tau:6}`.

Registration line for `harness/registry.ts`:

```ts
'fusion': async () => new (await import('../candidates/fusion/index.js')).default(),
```

Files: `index.ts` (the candidate; default export, name `fusion`),
`ablate/*.ts` (57 parameter variants used for the dev sweeps below; not
registered, loaded via `--factory` only).

## Fusion model

One formula covers every rule ablated: `score(d) = Σ_s w_s · φ_s(d)` over each
source's top-30 list (`poolK=30`), where φ_s is a per-query normalization:

- `minmax` — `score/max` (theoretical-min–max, min=0; Bruch, Gai & Ingber,
  TOIS 2023 — the digest §(c) primary). Preserves score *margins*, e.g.
  bm25f's exact-match bonuses.
- `rrf` — `(K+1)/(K+rank)`; with every source on `rrf` and K=60 this **is**
  weighted RRF(k=60) (Cormack, Clarke & Büttcher, SIGIR 2009) up to a
  rank-preserving constant.
- `borda` — `(P−rank+1)/P`, linear decay over the source's pool P.

A per-source `norm`/`rrfK`/`pool` override enables the hybrid that won:
margin-preserving `minmax` for the score-calibrated sources plus a *rank-based*
term for the flow walk, whose magnitudes are known-uninformative (graph-ppr
README: multi-hop answers sit at walk rank 2–5 with small normalized
magnitudes — magnitude fusion is a two-list Condorcet conflict there).

## Final configuration (dev-ablated, category level only)

| source | weight | φ | provenance |
| --- | ---: | --- | --- |
| bm25f | 0.70 | minmax | digest §(c) "λ lexical 0.7"; sweep {.6,.65,.7,.75,.8} → plateau .7–.8, .7 best with flow lane |
| graph-ppr (shipped 'pi') | 0.30 | minmax | sweep {.2,.25,.3,.35,.4} — the paraphrase/task engine (95%/89% R@5 on the s2 pair) |
| rri | 0.10 | minmax | wave-5 add: exact-tier + semantic votes shield id-lookup from flow noise (MRR .94→1.00) at +task R@5; {0,.05,.1} swept |
| trigram-fuzzy | 0.10 | minmax | wave-5 add, same shielding role on typo/alias/title tiers; {0,.1,.15} swept |
| flow walk (`puref-r00` options) | 0.20 | rrf, **K=10**, pool 30 | the multi-hop lane; w ∈ {.15,.2,.225,.25,.3,.4,.6,.8}, K ∈ {3,5,10,60}, pool ∈ {5,10,30} swept |

Gate: **abstain iff bm25f abstains** (bm25f is 10/10 clean on dev negatives
and abstains on no dev positive, so fusion inherits 10/10 at zero positive
cost; graph-ppr/flow leak negatives solo — the gate runs before fusing).
K=10 for the flow term (vs canonical 60) because RRF's K=60 decay is nearly
flat across a 30-deep pool (φ(30)=0.68) — it hands the walk's *noise* almost
the same weight as its confident top; K=10 concentrates on ranks 1–10
(measured: R@5 91.4→94.3 at flow-weight .4, paraphrase 76→90 R@5).

## Dev results (`results/fusion-final.json`, gold/dev.json, 150 cases)

Overall: **R@1 80.0% · R@5 91.4% · R@10 93.6% · MRR@10 0.842 · nDCG@10 0.864 ·
negatives 10/10 clean · p50 12.1 ms · p95 16.0 ms · build 6.55 s ·
deterministic ✓** (~276 MB summed sub-index estimate; sub-builds: bm25f 1.9 s,
graph-ppr 0.7 s, rri 2.4 s, trigram-fuzzy 0.85 s, flow 0.7 s).

| category | n | fusion R@5 / MRR | bm25f solo | Δ |
| --- | ---: | --- | --- | --- |
| id-lookup | 17 | 100% / 1.000 | 100% / 0.971 | +0.029 MRR |
| title | 17 | 100% / 1.000 | 100% / 1.000 | = |
| alias | 16 | 100% / 0.969 | 100% / 0.969 | = |
| typo | 17 | 100% / 1.000 | 100% / 1.000 | = |
| definition | 17 | 100% / 1.000 | 100% / 1.000 | = |
| paraphrase | 21 | 85.7% / 0.832 | 81.0% / 0.817 | +4.7 pt / +0.015 |
| task | 19 | 89.5% / 0.739 | 84.2% / 0.751 | +5.3 pt / −0.012 |
| multi-hop | 16 | 56.3% / 0.175 | 50.0% / 0.176 | +6.3 pt / ≈ |

**Verdict: fusion beats solo bm25f on dev** — MRR .842 vs .838, R@5 91.4% vs
89.3%, R@10 93.6% vs 92.9%, nDCG .864 vs .859, R@1 tied at 80.0%, negatives
both 10/10 — but the win is modest and the multi-hop fix is only partial
(56% vs 50%). Configs that *fully* recover multi-hop exist (75–94% R@5, table
below) and every one of them pays ≥ .005 MRR elsewhere: the flow walk's votes
are magnitude-blind, and what buys multi-hop rank-2–5 slots also perturbs
near-tied top-1s in paraphrase/task/alias. That trade-off is a frontier, not
a tuning gap (the same Condorcet conflict graph-ppr's README documents from
inside one candidate). The shipped config is the point on that frontier that
dominates bm25f on every headline metric; `ablate/l8-f02-p10.ts`
(R@5 **93.6%** / MRR .836 / multi-hop **75%**) is the recall-optimal
alternative if a consumer values top-5 hit rate over top-1 precision.

## Ablation A — source set (rule fixed per column; R@5 % / MRR)

Sets: s1={bm25f,rri}, s2={bm25f,graph-ppr}, s3={bm25f,rri,graph-ppr},
s4=s3+trigram-fuzzy. wRRF/Borda weights 1/0.5-each; convex weights 0.7
bm25f + 0.3 split over the rest.

| set | wRRF(k=60) | convex (minmax) | Borda | convex multi-hop |
| --- | --- | --- | --- | --- |
| s1 | 82.1 / .715 | 88.6 / .778 | 89.3 / .735 | 50% / .16 |
| s2 | 86.4 / .763 | **89.3 / .842** | 90.0 / .772 | 25% / .08 |
| s3 | 87.9 / .712 | 92.1 / .820 | 91.4 / .745 | 56% / .16 |
| s4 | 89.3 / .737 | 91.4 / .836 | 91.4 / .763 | 56% / .16 |

## Ablation B — fusion rule

Convex over min–max-normalized scores beats weighted RRF(k=60) and Borda on
**every** source set (above), exactly as Bruch et al. predict for few sources
with tuned weights: rank fusion discards bm25f's exact-match margins and
costs 7–17 points of R@1. Convex λ sweep on s2: bm25f .6 → MRR .831,
.7 → .842, .8 → .842 (plateau; .7 kept — better paraphrase). But convex
*cannot* rescue multi-hop (25% on s2 — the walk's true hits have tiny
normalized magnitudes), which motivates the hybrid lane below.

## Ablation C — the multi-hop flow lane

Backbone + flow walk as one extra source. fw = flow weight, K = its RRF
constant, p = its pool cap. Backbone b={bm25f .7, graph-ppr .3} unless noted.

| variant | overall R@5 / MRR | multi-hop R@5 / MRR | paraphrase MRR | task MRR |
| --- | --- | --- | --- | --- |
| b + flow **minmax** .2 (pure convex) | 87.9 / .823 | 31% / .10 | .80 | .76 |
| all-rrf(60) {1,.5,.5} incl. flow | 85.0 / .680 | 75% / .27 | .69 | .59 |
| b + fw .2 K60 | 93.6 / .830 | 75% / .21 | .80 | .76 |
| b + fw .4 K60 | 91.4 / .796 | 81% / .27 | .75 | .65 |
| b + fw .6 K60 | 87.9 / .745 | 88% / .34 | .70 | .61 |
| b + fw .4 K10 | 94.3 / .818 | 81% / .27 | .80 | .75 |
| b + fw .8 K10 | 89.3 / .722 | 94% / .36 | .68 | .48 |
| {.8,.2} + fw .2 K10 p10 (`l8-f02-p10`) | 93.6 / .836 | 75% / .22 | .82 | .72 |
| quad{.7,.1,.1,.1} + fw .2 K10 | 92.1 / .837 | 63% / .21 | .80 | .74 |
| **full{.7,.3,.1,.1} + fw .2 K10 (shipped)** | **91.4 / .842** | 56% / .18 | .83 | .74 |
| full + fw .225 K10 | 91.4 / .838 | 56% / .18 | .80 | .74 |
| full + fw .25 K10 | 92.1 / .834 | 63% / .19 | .80 | .74 |
| full + fw .25 K5 | 91.4 / .841 | 56% / .18 | .81 | .76 |

Reading: the flow-walk option **does** recover multi-hop (row 5: 88%, row 7:
94% — vs 19–50% for every non-flow candidate), confirming the graph-ppr
README's finding on the real dev set; blended via rank (not magnitude) it
transfers into the fused ranking; and its weight is a nearly linear dial
between multi-hop recall and everywhere-else MRR. The pure-convex flow row
(31%) reproduces the magnitude-collapse failure as predicted. The shipped
point takes the largest flow weight that still beats solo bm25f on both
headline metrics.

Solo baselines on this gold set for reference (R@5/MRR): bm25f 89.3/.838 ·
trigram-fuzzy 78.6/.674 · graph-ppr 76.4/.665 · rri 65.0/.539 · flow variant
58.6/.494 (multi-hop 81%/.34).

## Constraints & discipline

- **Determinism** — every sub-candidate is deterministic per its own README;
  fusion adds fixed source order, fixed accumulation order (source, then
  rank), and (score DESC, id ASC) ties. Harness double-run ✓.
- **Latency** — p50 12.1 ms / p95 16.0 ms ≈ the sum of the five subs
  (budget < 50 ms p50). Build 6.55 s sequential, reported as total with
  per-sub breakdown in `notes`. Memory ≈ a few hundred MB resident
  (dominated by bm25f's typo bridge and rri's two doc matrices).
- **Negative discipline** — gate on the primary lexical source's abstention
  only; 10/10 clean on dev with zero positive sacrificed. Gate variants
  ('none') leak graph noise; an all-sources-empty gate is strictly weaker.
- **No gold-peeking** — candidate code never reads `gold/`; all tuning ran
  through `bun harness/run.ts --factory` on `ablate/*.ts` variants and
  category-level metrics only; no per-question logic anywhere.
- **No sibling modification** — sub-candidates are constructed through their
  public constructors; the flow variant uses only constructor options its
  README documents.
- `query()` never throws (defensive try/catch → `[]`).

## Run

```bash
cd experiments/retrieval-bakeoff
bun harness/run.ts --gold dev --factory candidates/fusion/index.ts
```
