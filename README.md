# FPF Spec Runtime

> FPF helps when raw insight is not enough: meanings, claims, alternatives, evidence, boundaries, and outputs must remain stable across contexts, time, people, tools, or AI agents.

> **Quick links:** [Website](https://fpf.sh/) · [Connect MCP](https://fpf.sh/connect-mcp) · [Hosted MCP endpoint](https://mcp.fpf.sh/api/mcp/fpf_reference/mcp)
>
> **📖 Live reference:** [fpf.sh](https://fpf.sh/) — searchable pattern catalog, routes, and preface. Type an ID like `A.2` or `route:project-alignment` in the search box to jump in.
>
> **🤖 Working with this repo as an agent?** See [`AGENTS.md`](./AGENTS.md) for the MCP tool guide and workspace conventions.
>
> **🧭 Coordinating repo automation?** See the [Automation Playbook](https://fpf.sh/automation-playbook) for role boundaries, access rules, merge authority, and draft-only publishing packets.

## About FPF

The **First Principles Framework (FPF)** is a structured framework for thinking and coordinating work. It is written more like a technical specification than like a management book: there are named patterns, definitions, and review rules. Its job is to help teams model complex work, make reasoning inspectable, and keep decisions stable across engineering, research, and management.

FPF is authored by [Anatoly Levenchuk](https://github.com/ailev). The upstream publication source this runtime tracks is [`github.com/ailev/FPF`](https://github.com/ailev/FPF), specifically `FPF-Spec.md` on `main` by default. **This repository is a runtime + slim wiki projection of the published spec**, not the spec itself.

## What is this repo?

A local **FPF spec** runtime. Given a single markdown spec file, it compiles a deterministic, vectorless index of FPF IDs, routes, relations, and anchors, and exposes that as:

- an **MCP server** (public + optional full surface) for IDE agents like Codex
- a **Bun CLI** for queries, traces, and inspections
- a **static docs site** built from the same compiled artifacts

No vector database, no remote indexing, no Python, and no local LLM dependency. Answers are produced from deterministic retrieval over the compiled spec snapshot.

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
6. answers with IDs, citations, constraints, relations, and snapshot metadata

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

`.github/workflows/sync-fpf.yml` keeps both public surfaces current when FPF changes upstream in [ailev/FPF](https://github.com/ailev/FPF):

- Fast path: a trusted origin notifier can send this repo a `repository_dispatch` event named `fpf-origin-updated` or `fpf-sync-updated` with `client_payload.sha`/`after`, `client_payload.ref`/`branch`, and optionally `client_payload.spec_url`.
- Backstops: `.github/workflows/fpf-sync-monitor.yml` runs hourly and triggers this worker when production is behind and no sync worker is already active; the worker can also be triggered manually with a branch, tag, commit SHA, or raw spec URL paired with an explicit upstream ref.
- Work performed: download `FPF-Spec.md`, run `publish:current`, validate `published/current/**`, build the static docs, build the Vercel-origin MCP bundle, and open a publication PR only when files changed.
- Hosted MCP handoff: before opening a new PR, the workflow closes superseded `chore/sync-fpf-*` PRs. After the review window and required checks pass, it squash-merges the current PR. The resulting `main` push gives Vercel's Git integration the refreshed `fpf.sh` inputs.
- Monitor: `.github/workflows/fpf-sync-monitor.yml` runs hourly, checks `ailev/FPF` HEAD against `https://fpf.sh/api/fpf/status`, triggers `sync-fpf.yml` when upstream is ahead, and redispatches it when a current generated PR exists but no worker is queued or running. It fails only when drift exceeds the configured SLO or the hosted runtime is internally stale.
- Spend guardrail: `.github/workflows/vercel-spend-monitor.yml` runs every 15 minutes with `VERCEL_TOKEN`, checks Vercel Function Duration GB-hours, platform error-code rows, and legacy `/api/mcp/fpf_memory` function invocations, then fails the run when a configured cost-risk threshold is breached.

Minimal dispatch payload:

```json
{
  "event_type": "fpf-origin-updated",
  "client_payload": {
    "sha": "<ailev/FPF commit sha>"
  }
}
```

Publication QA follows FPF anchors directly:

- `B.5.1` separates exploration, shaping, evidence, and operation: sync PRs do publication work; monitor runs production evidence.
- `A.10` and `G.6` make SHA, manifest, source hash, runtime freshness, and check URLs the evidence graph.
- `B.3`, `E.19`, and `E.21` keep quality gates explicit: source/ref coherence, runtime freshness, preview/E2E, CI, recoverability, and max drift are separate characteristics, not one vague "green" claim.

## Configuration

Copy `.env.example` to `.env`. The most common settings:

| Variable                                  | Default                              | Purpose                                                               |
| ----------------------------------------- | ------------------------------------ | --------------------------------------------------------------------- |
| `FPF_SPEC_SOURCE_PATH`                    | `published/current/FPF-Spec.md`      | Local path to the spec the runtime reads (must be a filesystem path). |
| `FPF_PUBLISH_SOURCE_PATH`                 | `.fpf-upstream/FPF-Spec.md`          | Local source used by `publish:current`.                               |
| `FPF_UPSTREAM_OWNER`                      | `ailev`                              | GitHub owner for upstream publication provenance and downloads.        |
| `FPF_UPSTREAM_REPO`                       | `FPF`                                | GitHub repo for upstream publication provenance and downloads.         |
| `FPF_UPSTREAM_REF`                        | `main`                               | Branch, tag, or SHA used by `spec:download` and `publish:current`.     |
| `FPF_UPSTREAM_SPEC_PATH`                  | `FPF-Spec.md`                        | Path to the spec inside the upstream repo.                             |
| `FPF_SYNC_MONITOR_STATUS_URL`             | `https://fpf.sh/api/fpf/status`      | Production status endpoint checked by `monitor:sync`.                  |
| `FPF_SYNC_MONITOR_MAX_DRIFT_HOURS`        | `10`                                 | Allowed upstream-to-production drift before monitor failure.           |
| `FPF_VERCEL_PROJECT`                      | `fpf-sh`                             | Vercel project checked by `monitor:vercel:spend`.                      |
| `FPF_VERCEL_SCOPE`                        | *(empty)*                            | Vercel team scope for metrics queries.                                 |
| `FPF_VERCEL_SPEND_WINDOW_MINUTES`         | `30`                                 | Metrics lookback window for spend guardrails.                          |
| `FPF_VERCEL_SPEND_MAX_FUNCTION_DURATION_GBHR` | `0.25`                            | Maximum Function Duration GB-hours allowed in the lookback window.     |
| `FPF_VERCEL_SPEND_MAX_LEGACY_INVOCATIONS` | `0`                                  | Maximum function invocations allowed for the legacy MCP route.         |
| `FPF_VERCEL_SPEND_MAX_ERROR_INVOCATIONS`  | `0`                                  | Maximum function invocations allowed with non-empty Vercel `error_code`. |
| `FPF_RUNTIME_ARTIFACT_DIR`                | `.runtime/fpf-index`                 | Where compiled artifacts are written.                                 |
| `FPF_QUERY_DEFAULT_MODE`                  | `verbose`                            | Default `mode` for `query_fpf_spec` and `ask_fpf`.                    |
| `FPF_HOSTED_MCP_DISABLED`                 | `false`                              | Emergency hosted `/api/mcp/*` shutoff; returns `503` before loading the MCP runtime. |
| `FPF_RUNTIME_LOG_PATH`                    | `.runtime/logs/fpf-runtime.log`      | Structured runtime/MCP logs.                                          |

<details>
<summary>Detailed notes on these variables</summary>

`FPF_SPEC_SOURCE_PATH` must be a **local filesystem path** — the runtime does not fetch `https://` URLs. The default is the committed publication surface: `published/current/FPF-Spec.md`. Local memory preparation uses `FPF_PUBLISH_SOURCE_PATH`, which defaults to `.fpf-upstream/FPF-Spec.md` after `bun run spec:download`. You can instead point `FPF_PUBLISH_SOURCE_PATH` at a local checkout of [github.com/ailev/FPF](https://github.com/ailev/FPF) such as [`FPF-Spec.md`](https://github.com/ailev/FPF/blob/main/FPF-Spec.md). `bun run spec:download` tracks `ailev/FPF` `main` by default; the sync workflow resolves one upstream ref and passes it to both download and publish before writing `published/current/manifest.json`. Override owner/repo/ref/spec path with `FPF_UPSTREAM_OWNER`, `FPF_UPSTREAM_REPO`, `FPF_UPSTREAM_REF`, and `FPF_UPSTREAM_SPEC_PATH`; override the raw download URL or output path with `FPF_UPSTREAM_SPEC_URL` and `FPF_DOWNLOAD_SPEC_OUTPUT`. In automation, a raw `spec_url` must be paired with an explicit ref or SHA so manifest provenance remains verifiable. Keep `FPF_SPEC_SOURCE_PATH` aligned across `.env`, your shell, and any MCP config (`server.json` `env`) so every runtime/docs entrypoint agrees on the published file it should read.

`FPF_UPSTREAM_SPEC_URL` is intentionally constrained to the canonical `https://raw.githubusercontent.com/<owner>/<repo>/<ref>/<specPath>` shape matching the declared owner, repo, ref, and spec path. This prevents publishing one source while recording another provenance ref.

`FPF_QUERY_DEFAULT_MODE` applies to `query_fpf_spec` and `ask_fpf` when `mode` is omitted. `trace_fpf_path` stays `compact` by default.

`FPF_RUNTIME_LOG_PATH` receives structured MCP usage events named `mcp_tool_usage`. These events capture the tool name, outcome, duration, coarse input shape, resolved FPF IDs/kinds, result counts, and status fields. They deliberately do not log raw questions, search text, selectors, markdown bodies, answer text, or session IDs. In Vercel, the same runtime logger writes JSON to stdout so Vercel logs can be used for privacy-preserving usage analysis.

</details>

## Common commands

Grouped by what you're trying to do. See `package.json` for the full list.

**Setup & publishing**

```bash
bun install
bun run spec:download            # download FPF-Spec.md into .fpf-upstream/
bun run publish:current          # refresh published/current/** from FPF_PUBLISH_SOURCE_PATH
bun run stage:from-published     # stage published/current/** for commit
bun run monitor:sync             # compare fpf.sh status with upstream HEAD
bun run monitor:vercel:spend     # check Vercel Function Duration and legacy-route guardrails
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

The current Codex default is the hosted public FPF Reference MCP:

```text
https://mcp.fpf.sh/api/mcp/fpf_reference/mcp
```

Equivalent `~/.codex/config.toml`:

```toml
[mcp_servers.fpf_reference]
url = "https://mcp.fpf.sh/api/mcp/fpf_reference/mcp"
```

This repo ships the same project-scoped configuration at `.codex/config.toml` and `.mcp.json`. Once the project is trusted, Codex can load the hosted `fpf_reference` server directly from the repo.

The legacy `fpf_memory` client name and endpoint are blocked during the May 2026 cost incident mitigation:

```text
https://mcp.fpf.sh/api/mcp/fpf_memory/mcp
```

Do not remove the legacy route before the scheduled compatibility review on 2026-06-30; keep it explicitly routed so stale clients fail cheaply with a migration signal. The rename is intentionally small so parallel deployment and publication-sync work can merge without replacing this branch's compatibility contract. The detailed compatibility note lives in [`docs/fpf-reference-mcp-rename.md`](docs/fpf-reference-mcp-rename.md).

**Recommended Codex tasks** (public surface):

- answer a question — `Use only the fpf_reference MCP server. Call ask_fpf with question: "What is U.PromiseContent?"`
- structured query — `Use only the fpf_reference MCP server. Call query_fpf_spec with question: "What is an FPF pattern?"`
- read a generated page — `Use only the fpf_reference MCP server. Call read_fpf_doc with selector: "A.1.1"`
- check runtime freshness — `Use only the fpf_reference MCP server. Call get_fpf_index_status`

**Expert tasks** (require local full-surface runtime, `FPF_MCP_SURFACE=full bun run mcp`):

- inspect retrieval evidence — `Use only the fpf_reference MCP server. Call trace_fpf_path with question: "How do U.RoleAssignment and U.BoundedContext connect?"`
- rebuild the local index — `Use only the fpf_reference MCP server. Call refresh_fpf_index`

Smoke-test the local full-surface runtime before using expert tools or deploying changes:

```bash
bun run cli -- status
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
Use only the fpf_reference MCP server.
Call ask_fpf with:
- question: "Give me a checklist for how to model my project's information system."
```

For a proof-style grounded answer, add `mode: "proof"`. For the raw structured envelope, call `query_fpf_spec` instead. For a deterministic retrieval/debug trace, call `trace_fpf_path`.

The direct Vercel origin is canonical for clients. There is no separate Vercel forwarding project in this repo.
The canonical client aliases are `https://fpf.sh/` for the static reference and `https://mcp.fpf.sh/api/mcp/fpf_reference/mcp` for MCP clients.
`https://mcp.fpf.sh/api/mcp/fpf_memory/mcp` is the legacy compatibility path and is blocked during the May 2026 cost incident mitigation; new and working clients must use the canonical `fpf_reference` endpoint.
`fpf-memory-mcp-vercel-origin.vercel.app` is a legacy compatibility alias only; do not add it to new docs, scripts, or client setup examples.
Historical errored preview deployments can remain in Vercel as audit records.
Treat current production readiness as the latest `fpf.sh` production alias plus status, smoke, QA, and bundle-size gates, not as an absence of old preview errors.

```bash
bun run vercel:origin:link
bun run vercel:origin:build
bun run vercel:origin:deploy:prod
FPF_MCP_SMOKE_URL=https://mcp.fpf.sh/api/mcp/fpf_reference/mcp bun run smoke:mcp:http

bun run bench:mcp:qa -- --name vercel-origin --url https://mcp.fpf.sh/api/mcp/fpf_reference/mcp --format markdown
```

Status API:

```text
https://mcp.fpf.sh/api/fpf/status
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

All MCP tools are deterministic. Set `FPF_MCP_SURFACE=public` on the deployed server to restrict it to public tools only.

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
- `src/runtime/` — compiler, retrieval, trace, and inspection runtime
- `src/adapters/infra/logging/runtime-logger.ts` — structured runtime/MCP log writer

**Docs**

- `docs/` — Rspress content root populated by generated pages plus any optional hand-authored pages
- `docs/generated/**` — produced locally by `docs:generate` (gitignored; CI and docs deploy read the committed publication surface and generate from it)
- `scripts/generate-docs.ts` — compiler-backed docs generation (fed from `published/current/**` by default)
- `rspress.config.ts` — docs site config
- `doc_build/` — deterministic Rspress build output for the wiki-like static viewer

The docs pipeline does not use an LLM step. `bun run docs:generate` writes the canonical markdown collection, and `bun run docs:build` builds the static viewer from that collection.

**Spec sources**

- `FPF_SPEC_SOURCE_PATH` — runtime spec path (default `published/current/FPF-Spec.md`; upstream lives in [ailev/FPF](https://github.com/ailev/FPF))
- `FPF_PUBLISH_SOURCE_PATH` — local publish source (default `.fpf-upstream/FPF-Spec.md` after `bun run spec:download`)

## Logs

- `.runtime/logs/fpf-runtime.log` — structured runtime server/tool logs

MCP tool usage events are privacy-preserving summaries. They are suitable for answering which tools, FPF IDs, route kinds, and document surfaces are being used, but not for reconstructing user questions.

## Citing FPF

If you use FPF, please cite:

> Levenchuk, Anatoly. *First Principles Framework (FPF).* GitHub repository: <https://github.com/ailev/FPF>
