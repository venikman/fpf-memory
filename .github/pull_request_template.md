## What



## Why



## Type

- `feat` — new capability
- `fix` — bug fix
- `refactor` — code restructuring
- `docs` — documentation only
- `chore` — maintenance (deps, CI, cleanup)

## Changes



## Validation

- `bun run lint` passes locally
- `bun run check` passes locally
- `bun run test` passes locally
- No new warnings introduced
- `bun run build` succeeds (if runtime/server code touched)
- `bun run docs:build` succeeds (if docs touched)
- Relevant docs updated (README, docs/, inline JSDoc if applicable)

## Boundary check

- Runtime remains a single spec file via `FPF_SPEC_SOURCE_PATH` — no additional corpora added
- No vector database or remote indexing introduced
- No Python code added
- MCP tool contracts are in `src/mcp/tool-contracts.ts`

## Agent metadata






| Field   | Value |
| ------- | ----- |
| Agent   |       |
| Session |       |
| Prompt  |       |
