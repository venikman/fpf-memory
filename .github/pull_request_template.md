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
