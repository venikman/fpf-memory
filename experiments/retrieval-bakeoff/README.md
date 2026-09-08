# Retrieval bake-off — memory implementation & indexing candidates

**Status:** experiment (board-directed R&D, 2026-08-31). Lives outside `src/`
on purpose: nothing here ships to fpf.sh or mcp.fpf.sh. The outcome is a
measured comparison + recommendation, not a production change.

## Question under test

The runtime's retrieval core (`src/runtime/candidate-seeder.ts` +
`candidate-ranker.ts`) is a hand-tuned heuristic scorer: exact-ID +100,
lexeme +45, hand-written seed rules, magic constants. It has never been
compared against principled IR baselines on this corpus. Is the hand-tuned
scorer actually better than what 60 years of information-retrieval research
gives us for free — and if not, which candidate should replace or augment it?

Corpus: the compiled snapshot of `published/current/FPF-Spec.md`
(9,155 nodes: 311 patterns, 8,453 lexemes, 388 preface sections, 3 routes).

## Constraints every candidate honors (same as the runtime's own)

- Pure TypeScript on Bun; **no new npm dependencies**
- **Deterministic**: same corpus + question ⇒ byte-identical ranking
- No network, no Python, no model weights, no vector database service
- Index build from a cold snapshot must stay in interactive time (seconds)

## Layout

```
harness/    contract (types.ts), corpus loader, metrics, registry, runner
gold/       gold query sets — dev.json (open) and test.json (HELD OUT)
candidates/ one directory per candidate, default-exports a Retriever
results/    committed JSON reports + leaderboard
```

## Rules of the game

1. Candidates implement `Retriever` from `harness/types.ts` and register in
   `harness/registry.ts`. Nothing else in `harness/` may be edited by a
   candidate author.
2. **No gold-peeking.** Candidate code never reads `gold/`. Authors may look
   at `gold/dev.json` to understand query styles, but must not special-case
   individual dev questions. `gold/test.json` is materialized only after all
   candidates are frozen; nobody tunes on it.
3. Every candidate documents its parameters and their provenance (which
   research finding or tuning run picked them) in its own `README.md`.
4. Scoring: Recall@1/5/10, MRR@10, nDCG@10 over positive cases; negative
   cases score "clean" when the candidate returns nothing (the harness treats
   an empty result list for nonsense queries as correct abstention). Latency
   p50/p95 per query, build time, determinism double-run.

## Run

```bash
cd experiments/retrieval-bakeoff
bun harness/run.ts --gold dev                    # everything on the dev set
bun harness/run.ts --gold dev --candidates bm25f # one candidate while iterating
bun harness/run.ts --gold test                   # frozen candidates only
```

The corpus loader reads `published/current/fpf-index/snapshot.json` (run
`bun run ensure:snapshot` at the repo root if it is missing/stale) and caches
a slim projection under `.cache/`.

## Results (2026-08-31)

Snapshot `sha256:1169ef3f…` (upstream e400eab3, 2026-08-30). Full evidence:
`results/dev-all-solo.json`, `results/test-final.json`,
`results/failure-analysis.md`, `results/adversarial-audit.md`. Every number
below was independently reproduced per-case, byte-for-byte, by a read-only
audit agent.

### Held-out test set (150 cases, materialized post-freeze — see Limitations)

| candidate | R@1 | R@5 | R@10 | MRR@10 | neg-clean | p50 ms | dev→test ΔMRR |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **fusion** | 79.3% | 88.6% | 90.7% | **0.832** | 10/10 | 11.9 | −0.010 |
| **bm25f** | 78.6% | 85.0% | 90.0% | 0.817 | 10/10 | 0.55 | −0.021 |
| trigram-fuzzy | 57.9% | 71.4% | 77.9% | 0.645 | 9/10 | 0.33 | −0.029 |
| baseline-trace (production) | 53.6% | 67.1% | 75.0% | 0.596 | 0/10 | 515.9 | −0.043 |
| graph-ppr | 48.6% | 70.7% | 76.4% | 0.585 | 5/10 | 2.3 | −0.080 |
| rri | 37.1% | 60.7% | 67.1% | 0.469 | 10/10 | 6.0 | −0.070 |
| baseline-search (production) | 25.0% | 38.6% | 45.0% | 0.301 | 4/10 | 1323.9 | −0.035 |
| gramset | 22.1% | 30.7% | 35.0% | 0.260 | 10/10 | 0.39 | −0.092 |

The untuned production baselines dropped more dev→test than the tuned winners:
the test set is genuinely harder, and the challengers widened their lead on it.

### What the categories say (test R@5, winner vs production trace)

| category | fusion | bm25f | baseline-trace |
| --- | ---: | ---: | ---: |
| id-lookup / title / typo / alias / definition | 100% each | 100% each | 100 / 100 / **53** / 94 / 100 |
| paraphrase | 83% | 78% | **17%** |
| task | 91% | 86% | **50%** |
| multi-hop | 31% | 13% | 31% |

The hand-tuned production scorer only covers exact vocabulary: it collapses on
paraphrase, task phrasing, and typos. Principled IR fixes all three at three
orders of magnitude lower latency.

### Key findings

1. **A ~600-line fielded BM25+ implementation beats the production retrieval
   pipeline by +17.9pt R@5 / +0.221 MRR on held-out data at ~940× lower
   latency** (0.55ms vs 516ms p50), with perfect abstention on nonsense
   queries (production: zero abstention).
2. **Fusion (bm25f backbone + graph lanes + RRI, convex min-max weights)
   strictly dominates solo bm25f on test** (rescues 5 cases inside rank 5,
   surrenders 0) and is the only candidate whose handcrafted-half score
   *improved* dev→test (see Limitations §2 for why that is inconclusive).
3. **Multi-hop ("which pattern does X build on?") is the open problem**: every
   frozen candidate lands 13–31% on test. The cause is measured, not
   mysterious: lexical rankers only hit when the target's text quotes the
   source, and in 16/16 multi-hop misses the quoted source node + its mirror
   lexeme occupy the top ranks (filtering the source's own family lifts
   fusion 31%→50%). The pure flow-walk graph variant reaches **68.8%** on test
   multi-hop (>2× any frozen candidate) — a real capability the frozen fusion
   under-weighted because dev's multi-hop lexical scores were luck-inflated
   (dev sampled cross-reference-rich sources; test didn't). Full diagnosis:
   `results/failure-analysis.md`.
4. **Model-free semantics works but doesn't pay its way alone**: reflective
   random indexing (RRI) is the reason "paraphrase 0% → 43%" solo is possible
   without embeddings, but as a solo ranker it trails lexical; its value is as
   a fusion lane.
5. **The vectorless constraint is not the bottleneck.** Nothing here uses a
   model or a vector DB; the winning stack is deterministic TS over the
   existing snapshot, builds in <7s, and fits the repo's constraints as-is.

### Limitations (from the adversarial audit — read before quoting numbers)

1. **The test set was held out by convention, not by construction**: the
   generated half was reconstructible from a committed seed pre-freeze, and
   the handcrafted half sat in a world-readable `/tmp` path during the fusion
   tuning window. No candidate code reads any of it (audited), and every
   dev→test delta is negative (overfitting-shaped, not peeking-shaped), but a
   stronger protocol next round is specified in `results/adversarial-audit.md`
   (commit a holdout hash pre-freeze; publish the seed only at freeze).
2. Fusion's +.020 dev→test uptick on the handcrafted half (vs bm25f's −.013)
   is statistically weak at n=40 and plausibly ensemble variance-reduction,
   but fusion was the one candidate tuned while the full test set existed on
   disk — treat "fusion > bm25f" as likely, and "fusion ≥ bm25f" as solid.
3. Title-category gold excludes identically-titled lexeme docs from the
   equivalence sets (affects kind-agnostic candidates like rri/gramset by a
   few rank-1s; internally consistent across dev/test).
4. 1–2 of 10 negative queries per split contain a real title token via the
   question template ("repair", "recipe"), so `neg-clean` slightly understates
   abstention quality for candidates without a score floor.

