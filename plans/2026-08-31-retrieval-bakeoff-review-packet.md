# Retrieval bake-off — FPF review packet (2026-08-31)

Board-directed R&D session ("push out-of-the-box frontiers on memory
implementation and indexing: research, select candidates, build all, compare").
Branch `experiment/retrieval-bakeoff`; everything referenced lives under
`experiments/retrieval-bakeoff/` and touches no production surface.

**Closeout proposal (2026-10-09):** retain the experiment as a historical
archive after review. This is not an approval to replace production retrieval.
The claims below refer to the August 31 corpus and warm local harness; the
test data is now exposed. Current-corpus performance and hosted end-to-end
speedups remain unverified. A production proposal needs fresh holdout evidence,
P3 verification, and a separate approval.

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
| CR-1 | On the 150-case test split, the fusion candidate scores MRR@10 0.832 / R@5 88.6% vs the raw trace candidate-list adapter's 0.596 / 67.1%, at warm local p50 11.9ms vs 515.9ms | `results/test-final.json`; independently re-run per-case byte-identically by a read-only audit agent (`results/adversarial-audit.md` §10) | [fact] |
| CR-2 | Solo bm25f scores 0.817 / 85.0% at p50 0.55ms (~940× warm local timing ratio), with 10/10 empty negative-case lists vs the raw trace adapter's 0/10; production answer abstention was not measured | same; `candidates/baseline-trace/README.md` answer boundary | [fact] |
| CR-3 | Raw trace candidate-list retrieval scores paraphrase 17% R@5, task 50%, typo 53% on test; these are ranking results, not final answer/status results | `results/test-final.json` per-category | [fact] |
| CR-4 | Multi-hop relation questions are unsolved by all frozen candidates (13–31% test R@5); a pure flow-walk graph variant reaches 68.8% (probe labeled post-freeze); the frozen fusion under-weighted that lane because dev's multi-hop lexical hits were luck-inflated (source-quoting distribution differs dev vs test) | `results/test-flowwalk-probe.json`; diagnosis in `results/failure-analysis.md` | [fact] + [interpretation] |
| CR-5 | The test split was held out **by convention, not by construction** (seed committed pre-freeze; handcrafted holdout world-readable in /tmp during fusion tuning). No peeking machinery exists in any candidate (exhaustive audit) and all dev→test deltas are negative (overfitting-shaped) | `results/adversarial-audit.md` §1, §10 | [fact]; hold-out strength [assumption: agent honesty] |
| CR-6 | The gold sets are honest: 0 "expected answer wrong / too narrow" verdicts across all fusion misses; multi-hop equivalence sets exactly equal corpus `builds_on`/`refines` targets | `results/failure-analysis.md` §2; audit §10 | [fact] |

Dev-set numbers throughout the candidate READMEs are tuning-set numbers.
`test-final.json` records the historical test run with the isolation limitations
in CR-5; it is not fresh generalization evidence for later candidate selection.
There are 140 positive cases per split, so one positive case changes recall
by about 0.7 percentage points; 10 negatives are scored separately.

The trace adapter retains raw `candidateScores` regardless of trace status.
Production `QueryEngine.answerFromTrace()` can instead return empty answer
`ids` for `unsupported` or `not_found` traces. The historical ranking and
empty-list metrics do not measure that answer-level boundary; the archived
adapter and result JSONs remain unchanged. This correction supersedes any
production-abstention interpretation in the retained original report narratives.

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
   zero new dependencies, no model weights or vector database service,
   <7s build on the full corpus.

## Historical follow-up proposals (separate decision required)

1. **[evaluate-candidate]** Evaluate the fusion stack (bm25f backbone + graph
   lanes + abstention gate) on the current corpus with a new isolated holdout
   before proposing integration behind the runtime's existing exact-ID
   short-circuit, as a bounded PR with P3 verification (public tool behavior
   changes). Measured risks & mitigations in `results/failure-analysis.md`
   (multi-hop weight re-tune on a fresh split; keep +100 ID fast path to hold
   id-lookup MRR at 1.000; historical 6.6s build / ~276MB measurements do not
   establish hosted viability, which must be verified against function limits).
2. **[tune]** Source-family filtering + relation-aware routing for multi-hop
   (measured +19pt from the filter alone).
3. **[gold-fix]** Adopt the audit's stronger hold-out protocol and fix the two
   gold template defects before the next evaluation round.
4. **[rethink]** Evaluate replacing `baseline-search`'s O(N·text) scan.
   The historical warm local adapter measured about 1.3–1.4s p50 and 3.2s p95,
   versus 0.55ms p50 for the candidate ranker. No hosted endpoint was timed by
   this harness; neither end-to-end speedup nor cost savings are established
   by those ratios.

## Work performed (run-stance, dated 2026-08-31)

12 subagent work packets dispatched and reconciled; 4 transient API drops
resumed without loss. All artifacts committed on `experiment/retrieval-bakeoff`
in narrative order (scaffold → research → gold+baselines → candidates → freeze
→ test → probe/analysis/audit → this packet). Verification profile: P2
(experiment-only; no production surface, workflow, or published artifact
touched). The audit independently re-ran all 8 candidates on both splits:
byte-identical.
