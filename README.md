# FPF Spec Runtime

> **Quick links:** [Website](https://venikman.github.io/fpf-memory/) · [Connect MCP](https://venikman.github.io/fpf-memory/connect-mcp) · [Hosted MCP endpoint](https://fpf-memory-mcp-vercel-origin.vercel.app/api/mcp/fpf_memory/mcp)
>
> **📖 Live reference:** [venikman.github.io/fpf-memory](https://venikman.github.io/fpf-memory/) — searchable pattern catalog, routes, and preface. Type an ID like `A.2` or `route:project-alignment` in the search box to jump in.
>
> **🤖 Working with this repo as an agent?** See [`AGENTS.md`](./AGENTS.md) for the MCP tool guide and workspace conventions.

## What is this?

A local **FPF spec** runtime. Given a single markdown spec file, it compiles a deterministic, vectorless index of FPF IDs, routes, relations, and anchors, and exposes that as:

- an **MCP server** (public + optional full surface) for IDE agents like Codex
- a **Bun CLI** for queries, traces, and inspections
- a **static docs site** built from the same compiled artifacts

No vector database, no remote indexing, no Python. Optional local LLM synthesis via LM Studio is layered *on top of* deterministic retrieval — it is never the primary search path.

## Quick start

```bash
bun install
cp .env.example .env             # see Configuration below
bun run spec:download            # fetch FPF-Spec.md into .fpf-upstream/
bun run publish:current          # refresh the committed published/current/** surface
bun run cli -- query --question "What is U.BoundedContext?" --mode verbose
```

To run the local MCP server (full surface, expert tools enabled):

```bash
FPF_MCP_SURFACE=full bun run mcp
```

To browse docs locally:

```bash
bun run docs:dev
```

## How it works

On each refresh trigger the runtime:

1. hashes the spec file at `FPF_SPEC_SOURCE_PATH` and reuses the snapshot if the hash matches
2. otherwise recompiles a local vectorless index, writing `snapshot.json`, `build-audit.json`, `index-map.json`, `indexing-view.json`, `pattern-graph.json`, `route-graph.json`, `lexicon.json`, and `anchor-map.json` under `FPF_RUNTIME_ARTIFACT_DIR` (default `.runtime/fpf-index/`)
3. enriches the index with deterministic section descriptions plus per-node metadata (role, route-bearing status, …)
4. follows explicit references, route hints, and outline adjacency in a bounded frontier loop when the first anchor set is insufficient
5. optionally reuses a short-lived in-memory session context when `query` or `trace` is called with `--session` / `sessionId`
6. optionally calls a local LM Studio model on bounded slices plus a compact retrieval summary only
7. answers with IDs, citations, constraints, relations, and snapshot metadata

## Stack

- **Bun** — preferred local runtime and package manager
- **Zod** — repo-authored MCP contracts and validation
- **Model Context Protocol SDK** — direct MCP server/transport runtime for local stdio and hosted HTTP
- **Hono** — hosted server engine
- **Rstest, Rslint, Rspress** — test, lint, docs

## Scope

In:

- one markdown spec file as the runtime source set (default: `published/current/FPF-Spec.md`)
- a gitignored local publish source: `.fpf-upstream/FPF-Spec.md`, or any local checkout via `FPF_PUBLISH_SOURCE_PATH`
- generated pattern/route markdown under `docs/generated/**` (not committed; produced by `bun run docs:generate`)
- static docs build output under `doc_build/` (deterministic, ignored)

Out:

- a vector database
- any remote indexing service
- any Python code
- a validation/tuning corpus inside the runtime path

## Automated publication refresh

`.github/workflows/sync-fpf.yml` keeps both public surfaces current when FPF changes upstream in [fpf-sync](https://github.com/venikman/fpf-sync):

- Fast path: `fpf-sync` can send this repo a `repository_dispatch` event named `fpf-sync-updated` with `client_payload.sha`/`after`, `client_payload.ref`/`branch`, or `client_payload.spec_url`.
- Backstops: the workflow also runs every 6 hours and can be triggered manually with a branch, tag, commit SHA, or raw spec URL.
- Work performed: download `FPF/FPF-Spec.md`, run `publish:current`, validate `published/current/**`, build the GitHub Pages website, build the Vercel-origin MCP bundle, deploy the website, and commit the publication files only when they changed.
- Hosted MCP handoff: the resulting `main` push gives Vercel's Git integration the refreshed bundle inputs. If the repository secret `VERCEL_DEPLOY_HOOK_URL` is configured, the workflow also triggers that deploy hook after the publication commit.

Minimal dispatch payload from `fpf-sync`:

```json
{
  "event_type": "fpf-sync-updated",
  "client_payload": {
    "sha": "<fpf-sync commit sha>"
  }
}
```

## Configuration

Copy `.env.example` to `.env`. The most common settings:

| Variable                                  | Default                              | Purpose                                                               |
| ----------------------------------------- | ------------------------------------ | --------------------------------------------------------------------- |
| `FPF_SPEC_SOURCE_PATH`                    | `published/current/FPF-Spec.md`      | Local path to the spec the runtime reads (must be a filesystem path). |
| `FPF_PUBLISH_SOURCE_PATH`                 | `.fpf-upstream/FPF-Spec.md`          | Local source used by `publish:current`.                               |
| `FPF_RUNTIME_ARTIFACT_DIR`                | `.runtime/fpf-index`                 | Where compiled artifacts are written.                                 |
| `FPF_QUERY_DEFAULT_MODE`                  | `verbose`                            | Default `mode` for `query_fpf_spec` and `ask_fpf`.                    |
| `FPF_LOCAL_LLM_BASE_URL`                  | `http://localhost:1234/v1`           | Optional LM Studio endpoint. Omit to stay fully deterministic.        |
| `FPF_LOCAL_LLM_MODEL`                     | `google/gemma-4-31b`                 | Optional LM Studio model.                                             |
| `FPF_LOCAL_LLM_API_KEY`                   | *(empty)*                            | LM Studio API token (Developer → Server Settings → Manage Tokens).    |
| `FPF_LOCAL_LLM_TIMEOUT_MS`                | `20000`                              | LM Studio request timeout.                                            |
| `FPF_RUNTIME_LOG_PATH`                    | `.runtime/logs/fpf-runtime.log`      | Structured runtime/MCP logs.                                          |
| `FPF_RUNTIME_OBSERVABILITY_PATH`          | `.runtime/logs/runtime-observability.json` | Observability snapshot file.                                  |
| `FPF_AI_TRACE_LOG_PATH`                   | `.runtime/logs/ai-traces.jsonl`      | Per-call LM Studio synthesis traces (JSONL).                          |

<details>
<summary>Detailed notes on these variables</summary>

`FPF_SPEC_SOURCE_PATH` must be a **local filesystem path** — the runtime does not fetch `https://` URLs. The default is the committed publication surface: `published/current/FPF-Spec.md`. Local memory preparation uses `FPF_PUBLISH_SOURCE_PATH`, which defaults to `.fpf-upstream/FPF-Spec.md` after `bun run spec:download`. You can instead point `FPF_PUBLISH_SOURCE_PATH` at a local checkout of [github.com/venikman/fpf-sync](https://github.com/venikman/fpf-sync) such as [`FPF/FPF-Spec.md`](https://github.com/venikman/fpf-sync/blob/main/FPF/FPF-Spec.md). `bun run spec:download` tracks `fpf-sync` `main` by default; the sync workflow resolves that moving branch to an exact commit SHA before writing `published/current/manifest.json`. Override the download URL or output path with `FPF_UPSTREAM_SPEC_URL` and `FPF_DOWNLOAD_SPEC_OUTPUT`. Keep `FPF_SPEC_SOURCE_PATH` aligned across `.env`, your shell, and any MCP config (`server.json` `env`) so every runtime/docs entrypoint agrees on the published file it should read.

`FPF_QUERY_DEFAULT_MODE` applies to `query_fpf_spec` and `ask_fpf` when `mode` is omitted. `trace_fpf_path` stays `compact` by default.

`FPF_LOCAL_LLM_*` is optional. If present, the runtime calls the local LM Studio Anthropic-compatible API (`POST /v1/messages` with model discovery at `GET /v1/models`) only after deterministic retrieval has selected a bounded slice set. If absent, the runtime stays fully deterministic. If you opt into the LM Studio path by setting either `FPF_LOCAL_LLM_BASE_URL` or `FPF_LOCAL_LLM_MODEL`, the missing half falls back to the defaults above. The synthesizer posts to `{FPF_LOCAL_LLM_BASE_URL}/messages` with the Anthropic Messages request shape (`system` + `messages` + `max_tokens`) and parses `content[].text` from the response.

`FPF_RUNTIME_OBSERVABILITY_*` configures the runtime observability snapshot file, which includes `model_generation` spans around the local LM Studio synthesis call. Additional knobs: `FPF_RUNTIME_LOG_LEVEL=info`, `FPF_RUNTIME_OBSERVABILITY_FORMAT=flat`, `FPF_RUNTIME_OBSERVABILITY_INCLUDE_INTERNAL_SPANS=true`, `FPF_RUNTIME_OBSERVABILITY_INCLUDE_MODEL_CHUNKS=false`, `FPF_RUNTIME_OBSERVABILITY_LOG_LEVEL=info`.

`FPF_AI_TRACE_LOG_PATH` writes bounded LM Studio synthesis traces as JSON lines. This is the actual local model call path in this project; the synthesizer uses a direct `fetch` to the LM Studio-compatible endpoint.

</details>

## Common commands

Grouped by what you're trying to do. See `package.json` for the full list.

**Setup & publishing**

```bash
bun install
bun run spec:download            # download FPF-Spec.md into .fpf-upstream/
bun run publish:current          # refresh published/current/** from FPF_PUBLISH_SOURCE_PATH
bun run stage:from-published     # stage published/current/** for commit
bun run hooks:install            # install local git hooks
```

**Develop, test, build**

```bash
bun run lint
bun run check
bun run test
bun run build
bun run vercel:origin:build
```

**Docs**

```bash
bun run docs:generate            # produce docs/generated/** from the published surface
bun run docs:build               # static build into doc_build/
bun run docs:dev                 # local docs site
```

**CLI**

```bash
bun run cli -- status
bun run cli -- refresh
bun run cli -- query    --question "What is U.BoundedContext?" --mode verbose
bun run cli -- query    --question "How does it connect to role assignment?" --session s1
bun run cli -- inspect  --selector "A.1.1"
bun run cli -- read-doc --selector "A.1.1"
bun run cli -- trace    --question "How do U.RoleAssignment and U.BoundedContext connect?" --mode proof --session s1
bun run cli -- lm-check --timeout-ms 60000
```

**MCP server**

```bash
bun run mcp                      # public surface
FPF_MCP_SURFACE=full bun run mcp # full surface (expert tools)
bun run start                    # hosted HTTP runtime on Hono
bun run smoke:mcp:http           # smoke-test the streamable HTTP endpoint
bun run bench:mcp:qa             # hosted Q&A correctness gate
bun run bench:mcp                # hosted latency/correctness benchmark
bun run vercel:origin:build      # prebuild the direct Vercel-origin bundle
```

Public hosted status endpoint:

```text
/api/fpf/status
```

This returns the published `upstreamRef`, `sourceHash`, `publishedAt`, `specBytes`, and runtime freshness evidence for the same bundled FPF source and snapshot used by the hosted MCP endpoint.

## FPF work evaluation

Deterministic, local FPF-grounded review of the current branch or worktree:

```bash
bun run evaluate:work
bun run cli -- evaluate-work --target current-pr   --base origin/main --format markdown
bun run cli -- evaluate-work --target working-tree --base origin/main --format json
bun run cli -- evaluate-work --spec ~/Downloads/FPF-Spec\(12\).md --out reports/fpf-work.md
```

The evaluator reads local git facts, the committed `published/current/**` surface, and the configured FPF spec. It does **not** call an LLM, fetch GitHub, or regenerate artifacts. By default it reads `FPF_SPEC_SOURCE_PATH` if set, otherwise `published/current/FPF-Spec.md`; it does not fall back to `.fpf-upstream/`.

<a id="run-and-test-mcp"></a>

## Using it from Codex (and other MCP clients)

The current Codex default is the hosted public MCP:

```text
https://fpf-memory-mcp-vercel-origin.vercel.app/api/mcp/fpf_memory/mcp
```

Equivalent `~/.codex/config.toml`:

```toml
[mcp_servers.fpf_memory]
url = "https://fpf-memory-mcp-vercel-origin.vercel.app/api/mcp/fpf_memory/mcp"
```

This repo ships the same project-scoped configuration at `.codex/config.toml` and `.mcp.json`. Once the project is trusted, Codex can load the hosted `fpf_memory` server directly from the repo.

**Recommended Codex tasks** (public surface):

- answer a question — `Use only the fpf_memory MCP server. Call ask_fpf with question: "What is U.PromiseContent?"`
- structured query — `Use only the fpf_memory MCP server. Call query_fpf_spec with question: "What is an FPF pattern?"`
- read a generated page — `Use only the fpf_memory MCP server. Call read_fpf_doc with selector: "A.1.1"`
- check runtime freshness — `Use only the fpf_memory MCP server. Call get_fpf_index_status`

**Expert tasks** (require local full-surface runtime, `FPF_MCP_SURFACE=full bun run mcp`):

- inspect retrieval evidence — `Use only the fpf_memory MCP server. Call trace_fpf_path with question: "How do U.RoleAssignment and U.BoundedContext connect?"`
- rebuild the local index — `Use only the fpf_memory MCP server. Call refresh_fpf_index`

Smoke-test the local full-surface runtime before using expert tools or deploying changes:

```bash
bun run cli -- status
bun run cli -- lm-check --timeout-ms 60000
bun run cli -- refresh
bun run cli -- query   --question "What is U.BoundedContext?" --mode verbose
bun run cli -- trace   --question "How do U.RoleAssignment and U.BoundedContext connect?" --mode proof
bun run cli -- inspect --selector "A.1.1"
```

The direct stdio launcher (same entry as `bun run mcp`):

```bash
FPF_MCP_SURFACE=full bun run mcp
```

This starts a long-running stdio server; for a manual smoke check, stop it with `Ctrl+C` after startup confirmation. Omit `FPF_MCP_SURFACE=full` if you only want the public surface.

If this repo is registered as a Codex MCP server, restart Codex after changes and then test with a forced tool-use prompt:

```text
Use only the fpf_memory MCP server.
Call ask_fpf with:
- question: "Give me a checklist for how to model my project's information system."
```

For a proof-style grounded answer, add `mode: "proof"`. For the raw structured envelope, call `query_fpf_spec` instead. For a deterministic retrieval/debug trace, call `trace_fpf_path`.

The direct Vercel origin is canonical for clients. There is no separate Vercel forwarding project in this repo.

```bash
bun run vercel:origin:link
bun run vercel:origin:build
bun run vercel:origin:deploy:prod
FPF_MCP_SMOKE_URL=https://fpf-memory-mcp-vercel-origin.vercel.app/api/mcp/fpf_memory/mcp bun run smoke:mcp:http

bun run bench:mcp:qa -- --name vercel-origin --url https://fpf-memory-mcp-vercel-origin.vercel.app/api/mcp/fpf_memory/mcp --format markdown
```

Status API:

```text
https://fpf-memory-mcp-vercel-origin.vercel.app/api/fpf/status
```

## MCP tools

**Public** (default surface):

- `browse_fpf_catalog` — task-oriented discovery by part, status, or kind
- `search_fpf` — full-text search across compiled nodes
- `ask_fpf` — markdown-first answers
- `query_fpf_spec` — structured answer envelope
- `read_fpf_doc` — exact generated markdown pages
- `get_fpf_index_status` — runtime freshness check

**Full-surface only** (`FPF_MCP_SURFACE=full`):

- `inspect_fpf_node`, `inspect_fpf_anchor`, `expand_fpf_citations` — deep inspection
- `trace_fpf_path` — retrieval evidence and provenance
- `refresh_fpf_index` — rebuild the local artifact set

Only `query_fpf_spec` and `ask_fpf` can use the optional synthesizer. All other MCP tools stay deterministic. Set `FPF_MCP_SURFACE=public` on the deployed server to restrict it to public tools only.

When a configured synthesizer fails or reports unavailable, answer tools return `degraded` with low confidence and `candidateIds`; deterministic citations, relations, and constraints remain available as evidence. Deterministic retrieval tools still return normal `ok` envelopes.

## Project layout

**Runtime surfaces**

- `src/mcp/tool-contracts.ts` — Zod-authored MCP input/output contracts
- `src/adapters/mcp/tools.ts` — canonical snake_case MCP tools and `ask_fpf`
- `src/adapters/mcp/server.ts` — direct MCP SDK server definitions (public + full)
- `src/composition/` — canonical bridge layer for runtime/bootstrap composition
- `src/entrypoints/mcp-stdio.ts` — stdio entry point for MCP clients
- `src/entrypoints/vercel-function.ts` — Vercel Build Output API function entry point
- `src/build/vercel-origin-build.ts` — direct Vercel-origin bundle builder
- `src/server.ts` — Hono HTTP server bootstrap for Bun
- `src/runtime/` — compiler, retrieval, trace, inspect, synthesis
- `src/adapters/infra/logging/runtime-logger.ts` — structured runtime/MCP log writer
- `src/adapters/infra/observability/runtime-observability.ts` — observability wrapper for local synthesis

**Docs**

- `docs/` — Rspress content root populated by generated pages plus any optional hand-authored pages
- `docs/generated/**` — produced locally by `docs:generate` (gitignored; CI and docs deploy read the committed publication surface and generate from it)
- `scripts/generate-docs.ts` — compiler-backed docs generation (fed from `published/current/**` by default)
- `rspress.config.ts` — docs site config
- `doc_build/` — deterministic Rspress build output for the wiki-like static viewer

The docs pipeline does not use an LLM step. `bun run docs:generate` writes the canonical markdown collection, and `bun run docs:build` builds the static viewer from that collection.

**Spec sources**

- `FPF_SPEC_SOURCE_PATH` — runtime spec path (default `published/current/FPF-Spec.md`; canonical upstream lives in [fpf-sync](https://github.com/venikman/fpf-sync))
- `FPF_PUBLISH_SOURCE_PATH` — local publish source (default `.fpf-upstream/FPF-Spec.md` after `bun run spec:download`)

## Logs

- `.runtime/logs/fpf-runtime.log` — structured runtime server/tool logs
- `.runtime/logs/runtime-observability.json` — observability snapshot containing manual LM Studio `model_generation` traces
- `.runtime/logs/ai-traces.jsonl` — request/response/error traces for local LM Studio synthesis calls
