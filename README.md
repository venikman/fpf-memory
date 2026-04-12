# FPF Spec Runtime

Local `FPF-spec.md` runtime built around the `LocalFPFSpecKnowledgeRuntime` use case.

It uses:

- local deterministic parsing for exact FPF IDs, routes, relations, anchors, and answer envelopes
- a vectorless index compiler that emits structural and graph artifacts directly from `FPF-spec.md`
- Mastra-owned MCP surfaces plus a Bun CLI as the integration surface

## Stack

- Bun is the preferred local runtime and package manager.
- Zod owns repo-authored MCP contracts and validation.
- Mastra owns the MCP, logging, and observability boundary.
- Hono is the hosted server engine.
- Rstest, Rslint, and Rspress are the preferred test, lint, and docs tools.

## Scope

- Runtime source set: `FPF-spec.md` only
- Canonical publishable markdown: `docs/generated/**`
- Static docs build output: `doc_build/` (deterministic, ignored)
- Validation/tuning corpus: outside the runtime path
- No vector database
- No remote indexing service
- No Python code

## Environment

Copy `.env.example` to `.env` and set:

```bash
FPF_SPEC_SOURCE_PATH=FPF-spec.md
FPF_RUNTIME_ARTIFACT_DIR=.runtime/fpf-index
FPF_QUERY_DEFAULT_MODE=verbose
FPF_LOCAL_LLM_BASE_URL=http://localhost:1234/v1
FPF_LOCAL_LLM_MODEL=google/gemma-4-31b
FPF_LOCAL_LLM_API_STYLE=responses
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

`FPF_QUERY_DEFAULT_MODE` applies to `query_fpf_spec` and `ask_fpf` when `mode` is omitted. `trace_fpf_path` stays `compact` by default.

`FPF_LOCAL_LLM_*` is optional. If present, the runtime uses the local LM Studio `/v1/responses` API only after deterministic retrieval has selected a bounded slice set. If absent, the runtime stays fully deterministic.

`FPF_LOCAL_LLM_API_STYLE` controls which LM Studio generation route is used:

- `responses`: OpenAI-compatible `/v1/responses`
- `lmstudio_chat`: LM Studio-native `/api/v1/chat`
- `chat`: accepted alias for `lmstudio_chat`

If you opt into the LM Studio path by setting either `FPF_LOCAL_LLM_BASE_URL` or `FPF_LOCAL_LLM_MODEL`, the missing half falls back to the repo defaults:

- `FPF_LOCAL_LLM_BASE_URL=http://localhost:1234/v1`
- `FPF_LOCAL_LLM_MODEL=google/gemma-4-31b`
- `FPF_LOCAL_LLM_API_STYLE=responses`

For the OpenAI-compatible route, use `FPF_LOCAL_LLM_BASE_URL=http://localhost:1234/v1`, because the synthesizer targets `/v1/responses` rather than `/api/v1/chat`.

If you want to force the LM Studio-native route instead, set:

- `FPF_LOCAL_LLM_BASE_URL=http://localhost:1234`
- `FPF_LOCAL_LLM_API_STYLE=lmstudio_chat`

`FPF_MASTRA_LOG_PATH` configures the Mastra-backed runtime/MCP logger and writes structured JSON logs.

`FPF_MASTRA_OBSERVABILITY_*` configures the Mastra-backed observability snapshot file. That file includes `model_generation` spans around the local LM Studio synthesis call.

`FPF_AI_TRACE_LOG_PATH` writes bounded LM Studio synthesis traces as JSON lines. This is the actual local model call path in this project, because the synthesizer uses a direct `fetch` to the LM Studio-compatible endpoint instead of a Mastra agent model wrapper.

## Commands

```bash
bun run lint
bun run check
bun run test
bun run build
bun run docs:generate
bun run docs:build
bun run docs:dev
./scripts/verify-runtime.sh
bun run start
bun run cli -- status
bun run cli -- refresh
bun run cli -- query --question "What is U.BoundedContext?" --mode verbose
bun run cli -- query --question "How does it connect to role assignment?" --session s1
bun run cli -- inspect --selector "A.1.1"
bun run cli -- read-doc --selector "A.1.1"
bun run cli -- trace --question "How do U.RoleAssignment and U.BoundedContext connect?" --mode proof --session s1
bun run cli -- lm-check --timeout-ms 60000
bun run cli -- lm-check --base-url http://localhost:1234 --api-style chat --api-key "$FPF_LOCAL_LLM_API_KEY" --timeout-ms 60000
bun run mcp
```

## Run And Test MCP

Start the stdio MCP server:

```bash
bun run mcp
```

Start the hosted Mastra runtime on the Hono engine:

```bash
bun run start
```

Smoke-test the same runtime surface locally before wiring it into Codex:

```bash
bun run cli -- status
bun run cli -- lm-check --timeout-ms 60000
bun run cli -- lm-check --base-url http://localhost:1234 --api-style chat --api-key "$FPF_LOCAL_LLM_API_KEY" --timeout-ms 60000
bun run cli -- refresh
bun run cli -- query --question "What is U.BoundedContext?" --mode verbose
bun run cli -- trace --question "How do U.RoleAssignment and U.BoundedContext connect?" --mode proof
bun run cli -- inspect --selector "A.1.1"
```

Run the end-to-end verification script for the real CLI, MCP stdio, and hosted Hono startup paths:

```bash
./scripts/verify-runtime.sh
```

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
- `src/mcp/tools.ts`: canonical snake_case MCP tools and `ask_fpf`
- `src/mcp/server.ts`: Mastra MCP server boundary for stdio transport
- `src/mastra.ts`: Mastra runtime registration plus Hono server initialization
- `src/server.ts`: hosted Hono bootstrap for Bun
- `src/runtime/`: compiler, retrieval, trace, inspect, and synthesis logic
- `src/logging/runtime-logger.ts`: Mastra-backed structured runtime/MCP log writer
- `src/observability/runtime-observability.ts`: Mastra-backed observability wrapper for local synthesis

## Docs surface

- `docs/`: hand-authored Rspress landing content
- `scripts/generate-docs.ts`: compiler-backed docs generation into `docs/generated/`
- `rspress.config.ts`: docs site config

## MCP tool roles

- `refresh_fpf_index`: rebuild the local artifact set
- `get_fpf_index_status`: inspect runtime freshness, artifact presence, and runtime configuration
- `query_fpf_spec`: return the answer envelope with IDs, citations, constraints, and freshness metadata
- `ask_fpf`: return the grounded answer as markdown with IDs, citations, constraints, gaps, and snapshot metadata
- `trace_fpf_path`: return deterministic retrieval evidence only
- `inspect_fpf_node`: expand one node into its anchors, neighboring relations, and stable doc references
- `read_fpf_doc`: return the canonical generated markdown page plus stable markdown/static paths
- `inspect_fpf_anchor`: expand one anchor into raw anchor text plus owning node context
- `expand_fpf_citations`: expand multiple citations into raw anchor text plus owning node context

Only `query_fpf_spec` and `ask_fpf` can use the optional LM Studio synthesizer. All other MCP tools stay deterministic.

## Runtime behavior

On each refresh trigger the runtime:

1. hashes `FPF-spec.md`
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

- `FPF-spec.md`: authored source of truth
- `docs/generated/**`: canonical generated markdown collection
- `doc_build/`: deterministic Rspress build output for the wiki-like static viewer

The docs pipeline does not use an LLM step. `bun run docs:generate` writes the canonical markdown collection, and `bun run docs:build` builds the static viewer from that collection.

## Log Files

- `.runtime/logs/mastra.log`: structured runtime server/tool logs
- `.runtime/logs/mastra-observability.json`: runtime observability snapshot containing manual LM Studio `model_generation` traces
- `.runtime/logs/ai-traces.jsonl`: request/response/error traces for local LM Studio synthesis calls

## Real Verification

Run:

```bash
bun run docs:build
./scripts/verify-runtime.sh
```

The script verifies:

- the real `cli` path updates `.runtime/logs/mastra.log`
- the real `mcp` stdio startup path writes a startup record to `.runtime/logs/mastra.log`
- the real `start` path writes a hosted-runtime startup record to `.runtime/logs/mastra.log`
- the LM Studio path updates `.runtime/logs/mastra-observability.json` and `.runtime/logs/ai-traces.jsonl` when either `FPF_LOCAL_LLM_BASE_URL` or `FPF_LOCAL_LLM_MODEL` is set; the missing half falls back to the repo defaults
