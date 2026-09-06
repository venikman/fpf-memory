# Retrieval bake-off — FPF review packet (2026-08-31)

Board-directed R&D session ("push out-of-the-box frontiers on memory
implementation and indexing: research, select candidates, build all, compare").
Branch `experiment/retrieval-bakeoff`; everything referenced lives under
`experiments/retrieval-bakeoff/` and touches no production surface.

## Context (A.1.1)

One bounded context: **the retrieval core of the fpf-memory runtime** — the
code that turns a natural-language question into ranked FPF node IDs
(`src/runtime/candidate-seeder.ts` + `candidate-ranker.ts` and the surrounding
query pipeline). Local vocabulary: **candidate** = a from-scratch retriever
implementing the bake-off `Retriever` contract; **dev/test** = the two 150-case
gold splits; **frozen** = committed before `gold/test.json` was materialized
(commit aec3c1d). Bridges out of the context: (1) production surfaces fpf.sh /
mcp.fpf.sh — NOT changed by this work; (2) the upstream spec — read-only corpus
source (snapshot `sha256:1169ef3f…`, upstream e400eab3, 2026-08-30).

## Claim register (A.6)

| ID | Atomic claim | Evidence | Status |
| --- | --- | --- | --- |
| CR-1 | On the 150-case test split, the fusion candidate scores MRR@10 0.832 / R@5 88.6% vs the production trace pipeline's 0.596 / 67.1%, at p50 11.9ms vs 515.9ms | `results/test-final.json`; independently re-run per-case byte-identically by a read-only audit agent (`results/adversarial-audit.md` §10) | [fact] |
| CR-2 | Solo bm25f scores 0.817 / 85.0% at p50 0.55ms (~940× faster than production trace) with 10/10 negative abstention (production: 0/10) | same | [fact] |
| CR-3 | Production trace's failure surface is localized: paraphrase 17% R@5, task 50%, typo 53% on test — exact-vocabulary-only heuristics | `results/test-final.json` per-category | [fact] |
| CR-4 | Multi-hop relation questions are unsolved by all frozen candidates (13–31% test R@5); a pure flow-walk graph variant reaches 68.8% (probe labeled post-freeze); the frozen fusion under-weighted that lane because dev's multi-hop lexical hits were luck-inflated (source-quoting distribution differs dev vs test) | `results/test-flowwalk-probe.json`; diagnosis in `results/failure-analysis.md` | [fact] + [interpretation] |
| CR-5 | The test split was held out **by convention, not by construction** (seed committed pre-freeze; handcrafted holdout world-readable in /tmp during fusion tuning). No peeking machinery exists in any candidate (exhaustive audit) and all dev→test deltas are negative (overfitting-shaped) | `results/adversarial-audit.md` §1, §10 | [fact]; hold-out strength [assumption: agent honesty] |
| CR-6 | The gold sets are honest: 0 "expected answer wrong / too narrow" verdicts across all fusion misses; multi-hop equivalence sets exactly equal corpus `builds_on`/`refines` targets | `results/failure-analysis.md` §2; audit §10 | [fact] |

Uncertainty stated, not laundered: dev-set numbers throughout the candidate
READMEs are tuning-set numbers; only `test-final.json` supports generalization
claims. n=150 per split ⇒ single-case granularity ≈ 0.7pt recall.

## Roles (A.15)

| Role | Holder |
| --- | --- |
| Maintainer / orchestrator | this Claude Code session (mandate CLAUDE.md 2026-07-05) |
| Research scouts (×3: lexical, fuzzy/hashing, graph/semantics) | subagents; digests in `research/` with sources |
| Gold author | subagent; generator + handcrafted splits, provenance in `gold/README.md` |
| Candidate builders (×7) | subagents, one per candidate dir, freeze-committed individually |
| Adversarial auditor | independent read-only subagent; full findings preserved verbatim |
| Failure analyst | subagent; `results/failure-analysis.md` |
| Board | Stas — next-move decision only (see below) |

## Method (F.11)

Common `Retriever` contract → three sourced research digests → 150-case dev
split (tuning, category-level only) → seven candidates built independently →
freeze commit → test split materialized → single harness run for all → probe +
failure analysis → adversarial audit → this packet. Design-stance docs
(research digests, candidate READMEs) never claim run-stance results; every
run-stance number has a JSON artifact.

## Findings (compressed; full version in `experiments/retrieval-bakeoff/README.md`)

1. Principled IR demolishes the hand-tuned scorer: +21.5pt R@5 / +0.236 MRR
   (fusion) at 43× lower latency; +17.9pt / +0.221 (solo bm25f) at ~940×.
2. The winning ingredients, ranked by measured contribution: fielded BM25+
   with per-field length normalization (the length-skew fix), the
   lexeme→pattern anchor-text fold, deterministic typo bridging, coordination
   abstention gate, then graph/semantic fusion lanes for paraphrase/task/multi-hop.
3. Multi-hop needs the graph walk, not more lexical tuning (CR-4). The
   capability exists (68.8%); it was mis-weighted, not missing.
4. Everything runs inside the repo's own constraints: deterministic TypeScript,
   zero new dependencies, no vectors, no models, <7s build on the full corpus.

## Ranked next moves (decision owner: board for #1's go/no-go, maintainer for execution)

1. **[ship-candidate]** Integrate the fusion stack (bm25f backbone + graph
   lanes + abstention gate) behind the runtime's existing exact-ID
   short-circuit, as a bounded PR with P3 verification (public tool behavior
   changes). Measured risks & mitigations in `results/failure-analysis.md`
   (multi-hop weight re-tune on a fresh split; keep +100 ID fast path to hold
   id-lookup MRR at 1.000; 6.6s build / ~276MB is Vercel-viable but must be
   verified against function limits).
2. **[tune]** Source-family filtering + relation-aware routing for multi-hop
   (measured +19pt from the filter alone).
3. **[gold-fix]** Adopt the audit's stronger hold-out protocol and fix the two
   gold template defects before the next evaluation round.
4. **[rethink]** Retire `baseline-search`'s O(N·text) scan regardless of #1 —
   1.3–3.2s p50 on the public endpoint is a standing cost with a 0.55ms
   replacement sitting in this branch.

## Work performed (run-stance, dated 2026-08-31)

12 subagent work packets dispatched and reconciled; 4 transient API drops
resumed without loss. All artifacts committed on `experiment/retrieval-bakeoff`
in narrative order (scaffold → research → gold+baselines → candidates → freeze
→ test → probe/analysis/audit → this packet). Verification profile: P2
(experiment-only; no production surface, workflow, or published artifact
touched). The audit independently re-ran all 8 candidates on both splits:
byte-identical.
