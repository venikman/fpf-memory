## What

<!-- Brief description of what this PR does -->

## Why

<!-- Motivation or link to issue -->

## Type

- [ ] `feat` — new capability
- [ ] `fix` — bug fix
- [ ] `refactor` — code restructuring
- [ ] `docs` — documentation only
- [ ] `chore` — maintenance (deps, CI, cleanup)

## Changes

<!-- Key changes, one bullet per logical unit -->

## Impact verification

<!-- Every PR must declare its measurable impact. Fill in at least one row. -->

| Metric | Before | After | How to measure |
|--------|--------|-------|----------------|
| <!-- e.g. hard-coded node IDs in query-engine.ts --> | <!-- e.g. 12 --> | <!-- e.g. 0 --> | <!-- e.g. `grep -c 'C\.\|A\.' src/runtime/query-engine.ts` --> |

<!--
Examples of measurable metrics:
- LOC / module count (refactors): `wc -l src/runtime/compiler.ts` before and after
- File count (splits): `ls src/runtime/*.ts | wc -l`
- Hard-coded IDs removed: `grep -c` specific patterns
- Test count / coverage: `bun run test` summary
- CI steps passing: workflow green/red status
- Build time: `time bun run build`
- Artifact size: `du -sh .runtime/fpf-index/`
- New MCP tools: tool count in `src/mcp/tools.ts`
- Cache hit rate: before/after with `bun run cli -- status`

Pick what fits the PR. The goal: reviewers can independently reproduce the measurement.
-->

## Validation

- [ ] `bun run lint` passes locally
- [ ] `bun run check` passes locally
- [ ] `bun run test` passes locally
- [ ] No new warnings introduced
- [ ] `bun run build` succeeds (if runtime/server code touched)
- [ ] `bun run docs:build` succeeds (if docs touched)
- [ ] Relevant docs updated (README, docs/, inline JSDoc if applicable)

## Boundary check

- [ ] Runtime source set is `FPF-spec.md` only — no additional corpora added
- [ ] No vector database or remote indexing introduced
- [ ] No Python code added
- [ ] MCP tool contracts stay in `src/mcp/tool-contracts.ts`

## Agent metadata

<!-- Fill in if this PR was authored or co-authored by an AI agent -->
<!-- Do not include secrets, credentials, tokens, private URLs, or PII in Session/Prompt fields -->

| Field   | Value |
|---------|-------|
| Agent   | <!-- e.g. Devin, Claude Code, Hermes, Codex --> |
| Session | <!-- link or ID --> |
| Prompt  | <!-- original task description --> |
