# baseline-search

Reference baseline: the production full-text search tool, unmodified.

**Wraps:** `FpfRuntime.search(question, { limit: min(k, 100) })` from
`src/runtime/runtime.ts` — token-overlap scoring of the query against each
node's `searchableText` plus title (title tokens up-weighted), lexeme hits
down-weighted in default (unfiltered) search, exact-ID (+200) and exact-title
(+150) boosts, sorted score-desc with an ID tie-break. No `kind` filter: the
production tool searches all node kinds by default.

**Runtime construction:** absolute paths derived from the repo root
(`import.meta.dir`-based, no env vars):

- `sourcePath` = `published/current/FPF-Spec.md`
- `artifactSeedDir` = `published/current/fpf-index` (published snapshot seed)
- `artifactDir` = `.runtime/retrieval-bakeoff/fpf-index` (gitignored, writable)
- `compilerFingerprint` = read from `published/current/manifest.json`, mirroring
  `src/composition/runtime.ts`, so the published snapshot is served as-is with
  no recompile.

**Mapping:** each `SearchHit` maps to `{id, score}` using the production score
untouched; order preserved, deduped by id (defensive — hits are already unique),
truncated to k. Snippets, `linkedNodeIds`, and other hit fields are dropped:
the contract wants ranked IDs only. Queries with zero token overlap return
`[]` (production returns no hits), which the harness counts as clean
abstention on negatives.

**Parameters:** none of our own; every constant belongs to the production
scorer (`SEARCH_TITLE_TOKEN_WEIGHT`, `SEARCH_LEXEME_DEFAULT_PENALTY`, boost
values in `runtime.ts`).

**Typing note:** the runtime module is loaded via a non-literal dynamic import
against a minimal structural interface. This experiment's tsconfig enables
`noUncheckedIndexedAccess` (the root tsconfig that keeps `src/` clean does
not), so a static import would pull the whole production tree into the
stricter program and fail `tsc` on code this candidate does not own. Runtime
behavior is byte-for-byte the production runtime either way.

**build(docs):** ignores the harness-provided docs (the runtime compiles and
serves its own snapshot of the same published spec — that is the point of the
baseline) but warms the runtime with one `refresh` + one throwaway `search` so
the ~95MB snapshot parse never lands in the first timed query.

**Failure mode:** `query()` never throws — any runtime error maps to `[]`.
