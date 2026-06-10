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

- Verification profile: P0 / P1 / P2 / P3 / P4
- Profile reason:
- Focused local command or static inspection:
- Broader checks skipped, if any:
- `bun run lint` passes locally, or N/A with profile reason
- `bun run check` passes locally, or N/A with profile reason
- `bun run test` passes locally, or N/A with profile reason
- No new warnings introduced
- `bun run build` succeeds (if runtime/server code touched)
- `bun run docs:build` succeeds (if docs touched)
- Relevant docs updated (README, docs/, inline JSDoc if applicable)
- End-to-end verification command + output excerpt:
- Caveats or blocker:

## Production evidence packet

Required when the PR changes production-facing behavior, deployment, automation, monitoring, public docs, MCP routes, or published artifacts. Do not paste raw user questions, prompts, answer text, selectors, markdown bodies, session IDs, IPs, or user identifiers.

### Promise checked



### URLs checked



### Commands run



### Expected semantic invariants

- HTTP availability:
- semantic correctness:
- freshness/currentness:
- route naming:
- live behavior:
- cost/risk guardrails:

### Actual output excerpt



### Upstream ref / source hash



### Deployment URL / alias checked



### Rollback target



### Known caveats



### What would falsify this success claim?



## Boundary check

- Runtime remains a single spec file via `FPF_SPEC_SOURCE_PATH` — no additional corpora added
- No vector database or remote indexing introduced
- No Python code added
- MCP tool contracts are in `src/mcp/tool-contracts.ts`

## Agent metadata






| Field   | Value |
| ------- | ----- |
| Agent   |       |
| Task source |       |
| Privacy check | No raw user questions, prompts, answer text, selectors, markdown bodies, session IDs, IPs, or user identifiers included. |
