# FPF Spec Runtime

> **📖 Live reference: [venikman.github.io/fpf-memory](https://venikman.github.io/fpf-memory/)** — searchable pattern catalog, routes, and preface. Type an ID like `A.2` or `route:project-alignment` in the search box to jump in.

Local **FPF spec** runtime built around the `LocalFPFSpecKnowledgeRuntime` use case. The repo carries a committed publication surface under `published/current/**` for runtime/docs/deploy consumption, while local memory preparation refreshes that surface from a gitignored upstream working copy (`bun run spec:download` or `FPF_PUBLISH_SOURCE_PATH`).

It uses:

- local deterministic parsing for exact FPF IDs, routes, relations, anchors, and answer envelopes
- a vectorless index compiler that emits structural and graph artifacts from the configured spec file
- Mastra-owned MCP surfaces plus a Bun CLI as the integration surface

## Stack

- Bun is the preferred local runtime and package manager.
- Zod owns repo-authored MCP contracts and validation.
- Mastra owns the MCP, logging, and observability boundary.
- Hono is the hosted server engine.
- Rstest, Rslint, and Rspress are the preferred test, lint, and docs tools.

## Scope

- Runtime source set: one markdown spec file (default runtime path: `published/current/FPF-Spec.md`)
- Local publish source: `.fpf-upstream/FPF-Spec.md` (gitignored) or any local checkout wired via `FPF_PUBLISH_SOURCE_PATH`
- Generated pattern/route markdown: `docs/generated/**` (not committed; run `bun run docs:generate` against the published surface)
- Static docs build output: `doc_build/` (deterministic, ignored)
- Validation/tuning corpus: outside the runtime path
- No vector database
- No remote indexing service
- No Python code

## Environment

Copy `.env.example` to `.env` and set:

```bash
FPF_SPEC_SOURCE_PATH=published/current/FPF-Spec.md
FPF_PUBLISH_SOURCE_PATH=.fpf-upstream/FPF-Spec.md
FPF_RUNTIME_ARTIFACT_DIR=.runtime/fpf-index
FPF_QUERY_DEFAULT_MODE=verbose
FPF_LOCAL_LLM_BASE_URL=http://localhost:1234/v1
FPF_LOCAL_LLM_MODEL=google/gemma-4-31b
FPF_LOCAL_LLM_API_KEY=
FPF_LOCAL_LLM_TIMEOUT_MS=20000
FPF_MASTRA_LOG_PATH=.runtime/logs/mastra.log
FPF_MASTRA_LOG_LEVEL=info
FPF_MASTRA_OBSERVABILITY_PATH=.runtime/logs/mastra-observability.json
FPF_MASTRA_OBSERVABILITY_FORMAT=flat
FPF_MASTRA_OBSERVABILITY_INCLUDE_INTERNAL_SPANS=true
FPF_MASTRA_OBSERVABILITY_INCLUDE_MODEL_CHUNKS=false
FPF_MASTRA_OBSERVABILITY_LOG_LEVEL=info
FPF_AI_TRACE_LOG_PATH=.runtime/logs/ai-traces.jsonl
```

`FPF_SPEC_SOURCE_PATH` must be a **local filesystem path** (the runtime does not fetch `https://` URLs). The default when unset is the committed publication surface: `published/current/FPF-Spec.md`. Local memory preparation uses `FPF_PUBLISH_SOURCE_PATH`, which defaults to `.fpf-upstream/FPF-Spec.md` after `bun run spec:download`. You can instead point `FPF_PUBLISH_SOURCE_PATH` at a local checkout of [github.com/venikman/fpf-sync](https://github.com/venikman/fpf-sync) such as [`FPF/FPF-Spec.md`](https://github.com/venikman/fpf-sync/blob/main/FPF/FPF-Spec.md). Override the download URL or output path with `FPF_UPSTREAM_SPEC_URL` and `FPF_DOWNLOAD_SPEC_OUTPUT`. Keep `FPF_SPEC_SOURCE_PATH` aligned across `.env`, your shell, and any MCP config (`server.json` `env`) so every runtime/docs entrypoint agrees on the published file it should read.

`FPF_QUERY_DEFAULT_MODE` applies to `query_fpf_spec` and `ask_fpf` when `mode` is omitted. `trace_fpf_path` stays `compact` by default.

`FPF_LOCAL_LLM_*` is optional. If present, the runtime calls the local LM Studio Anthropic-compatible API (`POST /v1/messages` with model discovery at `GET /v1/models`) only after deterministic retrieval has selected a bounded slice set. If absent, the runtime stays fully deterministic.

If you opt into the LM Studio path by setting either `FPF_LOCAL_LLM_BASE_URL` or `FPF_LOCAL_LLM_MODEL`, the missing half falls back to the repo defaults:

- `FPF_LOCAL_LLM_BASE_URL=http://localhost:1234/v1`
- `FPF_LOCAL_LLM_MODEL=google/gemma-4-31b`

The synthesizer posts to `{FPF_LOCAL_LLM_BASE_URL}/messages` with the Anthropic Messages request shape (`system` + `messages` + `max_tokens`) and parses `content[].text` from the response. Generate an API token in LM Studio → Developer → Server Settings → Manage Tokens and set it on `FPF_LOCAL_LLM_API_KEY`.

`FPF_MASTRA_LOG_PATH` configures the Mastra-backed runtime/MCP logger and writes structured JSON logs.

`FPF_MASTRA_OBSERVABILITY_*` configures the Mastra-backed observability snapshot file. That file includes `model_generation` spans around the local LM Studio synthesis call.

`FPF_AI_TRACE_LOG_PATH` writes bounded LM Studio synthesis traces as JSON lines. This is the actual local model call path in this project, because the synthesizer uses a direct `fetch` to the LM Studio-compatible endpoint instead of a Mastra agent model wrapper.

## Commands

```bash
bun install
bun run spec:download
bun run publish:current
bun run evaluate:work
bun run e2e:report -- cli
bun run e2e:report -- docs
bun run e2e:report -- deploy-dry-run
bun run stage:from-published
bun run mastra:build
bun run hooks:install
bun run docs:generate
bun run lint
bun run check
bun run test
bun run build
bun run docs:generate
bun run docs:build
bun run docs:dev
bun run start
bun run cli -- status
bun run cli -- refresh
bun run cli -- query --question "What is U.BoundedContext?" --mode verbose
bun run cli -- query --question "How does it connect to role assignment?" --session s1
bun run cli -- inspect --selector "A.1.1"
bun run cli -- read-doc --selector "A.1.1"
bun run cli -- trace --question "How do U.RoleAssignment and U.BoundedContext connect?" --mode proof --session s1
bun run cli -- evaluate-work --target current-pr --base origin/main --format markdown
bun run cli -- evaluate-work --target current-pr --base origin/main --format json
bun run cli -- lm-check --timeout-ms 60000
bun run cli -- lm-check --base-url http://localhost:1234/v1 --api-key "$FPF_LOCAL_LLM_API_KEY" --timeout-ms 60000
bun run mcp
```

## FPF Work Evaluation

Use the deterministic local evaluator when you want an FPF-grounded review of the current branch or worktree:

```bash
bun run evaluate:work
bun run cli -- evaluate-work --target current-pr --base origin/main --format markdown
bun run cli -- evaluate-work --target working-tree --base origin/main --format json
bun run cli -- evaluate-work --spec ~/Downloads/FPF-Spec\(12\).md --out reports/fpf-work.md
```

The evaluator reads local git facts, the committed `published/current/**` surface, and the configured FPF spec. It does not call an LLM, fetch GitHub, or regenerate artifacts. By default it reads `FPF_SPEC_SOURCE_PATH` if set, otherwise `published/current/FPF-Spec.md`; it does not fall back to `.fpf-upstream/`.

## E2E Video Reports

Use `bun run e2e:report` whenever Codex needs to share an end-to-end verification run as video:

```bash
bun run e2e:report -- cli
bun run e2e:report -- docs
bun run e2e:report -- deploy-dry-run
bun run e2e:report -- --name pr-review --command "bun run evaluate:work"
```

Artifacts are written to `.runtime/e2e-recordings/<timestamp>-<task>/` and are intentionally gitignored. Each run writes `commands.log`, `metadata.json`, `report.md`, `report.html`, and `e2e-report.webm`. Share the `e2e-report.webm` path or uploaded video link in PRs and final Codex responses. If Chromium is not installed for Playwright, run `bunx playwright install chromium` once and retry.

## Run And Test MCP

Hosted/public MCP endpoint used by Codex by default:

```text
https://fpf-memory.server.mastra.cloud/api/mcp/fpf_memory/mcp
```

Optional local full-surface MCP server for development and expert tools:

```bash
FPF_MCP_SURFACE=full bun run mcp
```

Start the hosted Mastra runtime locally on the Hono engine:

```bash
bun run start
```

## Codex Setup

The current Codex default is the hosted public MCP.

Equivalent `~/.codex/config.toml` entry:

```toml
[mcp_servers.fpf_memory]
url = "https://fpf-memory.server.mastra.cloud/api/mcp/fpf_memory/mcp"
```

This repo ships the same project-scoped configuration at `.codex/config.toml` and `.mcp.json`. Once the project is trusted, Codex can load the hosted `fpf_memory` server directly from the repo.

Recommended Codex tasks:

- answer a question: `Use only the fpf_memory MCP server. Call ask_fpf with question: "What is U.PromiseContent?"`
- structured query: `Use only the fpf_memory MCP server. Call query_fpf_spec with question: "What is an FPF pattern?"`
- read a generated page: `Use only the fpf_memory MCP server. Call read_fpf_doc with selector: "A.1.1"`
- check runtime freshness: `Use only the fpf_memory MCP server. Call get_fpf_index_status`

Expert tasks (local full-surface runtime only):

- inspect retrieval evidence: `Use only the fpf_memory MCP server. Call trace_fpf_path with question: "How do U.RoleAssignment and U.BoundedContext connect?"`
- rebuild the local index: `Use only the fpf_memory MCP server. Call refresh_fpf_index`

Start the local full-surface runtime before using expert tools:

```bash
FPF_MCP_SURFACE=full bun run mcp
```

Smoke-test the local full-surface runtime before using expert tools or deploying changes:

```bash
bun run cli -- status
bun run cli -- lm-check --timeout-ms 60000
bun run cli -- lm-check --base-url http://localhost:1234/v1 --api-key "$FPF_LOCAL_LLM_API_KEY" --timeout-ms 60000
bun run cli -- refresh
bun run cli -- query --question "What is U.BoundedContext?" --mode verbose
bun run cli -- trace --question "How do U.RoleAssignment and U.BoundedContext connect?" --mode proof
bun run cli -- inspect --selector "A.1.1"
```

The direct stdio launcher (same entry as `bun run mcp`; add `FPF_MCP_SURFACE=full` for expert-tool work):

```bash
FPF_MCP_SURFACE=full bun src/mastra/stdio.ts
```

This starts a long-running stdio server; for a manual smoke check, stop it with `Ctrl+C` after startup confirmation. Omit `FPF_MCP_SURFACE=full` if you only want the public surface.

If this repo is registered as a Codex MCP server, restart Codex after changes and then test with a forced tool-use prompt such as:

```text
Use only the fpf_memory MCP server.
Call ask_fpf with:
- question: "Give me a checklist for how to model my project's information system."
```

For the normal high-level path, that is the whole prompt.

Proof-style grounding:

```text
Use only the fpf_memory MCP server.
Call ask_fpf with:
- question: "Give me a checklist for how to model my project's information system."
- mode: "proof"
```

Raw structured answer envelope:

```text
Use only the fpf_memory MCP server.
Call query_fpf_spec with:
- question: "Give me a checklist for how to model my project's information system."
```

Deterministic retrieval/debug trace:

```text
Use only the fpf_memory MCP server.
Call trace_fpf_path with:
- question: "Give me a checklist for how to model my project's information system."
- mode: "proof"
```

## Runtime surfaces

- `src/mcp/tool-contracts.ts`: Zod-authored MCP input and output contracts
- `src/adapters/mcp/tools.ts`: canonical snake_case MCP tools and `ask_fpf`
- `src/adapters/mcp/server.ts`: canonical MCPServer definitions (public and full surfaces)
- `src/composition/`: canonical bridge layer for runtime/bootstrap composition
- `src/compat/mastra/`: governed Mastra compatibility bootstrap layer
- `src/mastra/mcp/server.ts`: compatibility shim for the legacy MCP server import path
- `src/mastra/index.ts`: compatibility shim consumed by `bun run mastra:build` and Mastra deploy tooling
- `src/mastra/stdio.ts`: stdio entry point for MCP clients
- `src/server.ts`: Hono HTTP server bootstrap for Bun
- `src/runtime/`: compiler, retrieval, trace, inspect, and synthesis logic
- `src/adapters/infra/logging/runtime-logger.ts`: Mastra-backed structured runtime/MCP log writer
- `src/adapters/infra/observability/runtime-observability.ts`: Mastra-backed observability wrapper for local synthesis

## Docs surface

- `docs/`: Rspress content root populated by generated pages plus any optional hand-authored pages
- `scripts/generate-docs.ts`: compiler-backed docs generation into `docs/generated/` (gitignored; fed from `published/current/**` by default)
- `rspress.config.ts`: docs site config

## MCP tool roles

### Public tools (default surface)

`browse_fpf_catalog`, `search_fpf`, `ask_fpf`, `query_fpf_spec`, `read_fpf_doc`, and `get_fpf_index_status`.

### Full-surface-only tools

Set `FPF_MCP_SURFACE=full` on local stdio or local HTTP runtimes to expose `inspect_fpf_node`, `inspect_fpf_anchor`, `expand_fpf_citations`, `trace_fpf_path`, and `refresh_fpf_index`.

Only `query_fpf_spec` and `ask_fpf` can use the optional synthesizer. All other MCP tools stay deterministic. Set `FPF_MCP_SURFACE=public` on the deployed server to restrict it to public tools only.

## Runtime behavior

On each refresh trigger the runtime:

1. hashes the spec file at `FPF_SPEC_SOURCE_PATH`
2. reuses the snapshot if the hash matches
3. otherwise recompiles a local vectorless index
4. writes:
   - `snapshot.json`
   - `build-audit.json`
   - `index-map.json`
   - `pattern-graph.json`
   - `route-graph.json`
   - `lexicon.json`
   - `anchor-map.json`
5. enriches the index map with deterministic section descriptions plus per-node metadata such as role and route-bearing status
6. follows explicit references, route hints, and outline adjacency in a bounded frontier loop when the first anchor set is insufficient
7. optionally reuses a short-lived in-memory session context when `query` or `trace` is called with `--session` or `sessionId`
8. optionally calls a local LM Studio model on bounded slices plus a compact retrieval summary only
9. answers with IDs, citations, constraints, relations, and snapshot metadata

Artifacts are stored under `.runtime/fpf-index/`.

## Docs surfaces

- Spec source: path from `FPF_SPEC_SOURCE_PATH` (defaults to `published/current/FPF-Spec.md`; canonical upstream lives in [fpf-sync](https://github.com/venikman/fpf-sync))
- Local publish source: path from `FPF_PUBLISH_SOURCE_PATH` (defaults to `.fpf-upstream/FPF-Spec.md` after `bun run spec:download`)
- `docs/generated/**`: produced locally by `docs:generate` (not committed; CI and docs deploy read the committed publication surface and generate from it)
- `doc_build/`: deterministic Rspress build output for the wiki-like static viewer

The docs pipeline does not use an LLM step. `bun run docs:generate` writes the canonical markdown collection, and `bun run docs:build` builds the static viewer from that collection.

## Log Files

- `.runtime/logs/mastra.log`: structured runtime server/tool logs
- `.runtime/logs/mastra-observability.json`: runtime observability snapshot containing manual LM Studio `model_generation` traces
- `.runtime/logs/ai-traces.jsonl`: request/response/error traces for local LM Studio synthesis calls
