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
(~9.2k nodes: 294 patterns, ~8.5k lexemes, ~390 preface sections, routes).

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
