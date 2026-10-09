# baseline-trace

Reference baseline: the raw ranked candidate list from the local production
trace implementation. This is not the production ask/query answer surface.

**Wraps:** `FpfRuntime.trace(question, 'compact')` from `src/runtime/runtime.ts`
(candidate seeding → heuristic ranking → frontier expansion; includes the
compact-mode fast-route shortcut). No `sessionId` is passed, so session-context
boosts are off and results are deterministic.

**Runtime construction:** absolute paths derived from the repo root
(`import.meta.dir`-based, no env vars):

- `sourcePath` = `published/current/FPF-Spec.md`
- `artifactSeedDir` = `published/current/fpf-index` (published snapshot seed)
- `artifactDir` = `.runtime/retrieval-bakeoff/fpf-index` (gitignored, writable)
- `compilerFingerprint` = read from `published/current/manifest.json`, mirroring
  `src/composition/runtime.ts`, so the published snapshot is served as-is with
  no recompile.

**Mapping:** `TraceResult.candidateScores` (`{nodeId, kind, score}`) is the
engine's ranked candidate list — already sorted score-desc with deterministic
tie-breaks and capped at 16 by the engine. We preserve that order, dedupe by
`nodeId`, take top-k, and emit `{id: nodeId, score}`. No re-scoring, no
augmentation from `selectedNodeIds`/`frontierCandidates` — so compact-mode
fast-route traces yield a single (route) hit, and empty-question/no-candidate
traces yield `[]`. That short-list behavior is the production ranker's honest
output and is preserved deliberately.

**Answer boundary:** the adapter does not inspect `TraceResult.status` or call
`QueryEngine.answerFromTrace()`. Production `FpfRuntime.query()` calls that
method; its `unsupported` and `not_found` branches return empty answer `ids`
even when the trace contains retrieval candidates. The archived baseline's
0/10 empty lists on negative cases therefore describes raw candidate-list
behavior, not production answer abstention. Keep the historical adapter and
reports for the ranking comparison; evaluating answer-level abstention needs
a separate adapter and separately named results. No production abstention
rate was established by this experiment.

**Parameters:** none of our own; every constant belongs to the production
scorer (`candidate-seeder.ts` / `candidate-ranker.ts`).

**Typing note:** the runtime module is loaded via a non-literal dynamic import
against a minimal structural interface. This experiment's tsconfig enables
`noUncheckedIndexedAccess` (the root tsconfig that keeps `src/` clean does
not), so a static import would pull the whole production tree into the
stricter program and fail `tsc` on code this candidate does not own. Runtime
trace behavior comes from that production runtime; the adapter's candidate
mapping does not reproduce its final answer/status behavior.

**build(docs):** ignores the harness-provided docs (the runtime compiles and
serves its own snapshot of the same published spec — that is the point of the
baseline) but warms the runtime with one `refresh` + one throwaway `trace` so
the ~95MB snapshot parse never lands in the first timed query.

**Failure mode:** `query()` never throws — any runtime error maps to `[]`.
