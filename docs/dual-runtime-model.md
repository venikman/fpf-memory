---
title: "Dual Runtime Model"
description: "Operator guide for running hosted FPF Reference MCP alongside a local full-surface stdio runtime."
outline: deep
---

# Dual Runtime Model

This page is for **operators and contributors** who deploy the hosted public MCP surface to Vercel while also running a local full-surface stdio runtime for expert work. First-time adopters should stay on [Connect MCP](/connect-mcp) with the hosted endpoint only.

## Two runtimes, one codebase

| Runtime | Transport | Surface | Tools | Source of truth |
| --- | --- | --- | --- | --- |
| **Hosted** (`mcp.fpf.sh`) | Streamable HTTP on Vercel | `public` (default) | 6 public tools | Committed `published/current/**` staged into the function bundle via `bun run vercel:mcp:build` |
| **Local** (`bun run mcp`) | stdio (or `bun run start` HTTP) | `full` when `FPF_MCP_SURFACE=full` | 6 public + 4 expert + 1 admin | Local `FPF_SPEC_SOURCE_PATH` + `.runtime/fpf-index` |

Deploy path for hosted remains script-based:

```bash
bun run vercel:mcp:deploy:prod
bun run smoke:production
```

See [Vercel MCP Packaging](/vercel-mcp-packaging) for build gates and operator evidence. Vercel MCP (`https://mcp.vercel.com`) is optional read-only deployment evidence—not a deploy replacement.

```txt
edit → bun run check / test → local full-surface repro → vercel:mcp:deploy:prod → smoke:production
```

## Why both exist

**Different jobs, same product name.** Hosted is the adoption surface: zero install, bounded public tools, cost-controlled (`FPF_HOSTED_MCP_DISABLED`, legacy route blocked). Local full is the operator surface: expert inspection (`inspect_fpf_node`, `trace_fpf_path`, etc.) and index rebuild (`refresh_fpf_index`) that must never ship on the public hosted endpoint.

Both report `serverInfo.name: fpf_reference` in MCP metadata because they expose the same contract entity—deterministic FPF lookup—not because they are interchangeable runtimes.

**Neither is agent memory.** Both runtimes are lookup and grounding surfaces only. See [Interface Contract](/interface-contract).

**Parallel existence, exclusive client registration.** Adopters use hosted only. Contributors may run local full in parallel on disk, but should not register hosted HTTP and local stdio under the same MCP server key in one client session. Overlapping tool IDs (`ask_fpf`, `query_fpf_spec`, …) make routing ambiguous; the agent cannot tell hosted from local, and expert tools may appear to exist on hosted when they do not.

**Snapshot alignment is evidence, not assumption.** Hosted answers reflect the deployed snapshot. Local answers reflect your checkout until you align:

```bash
bun run publish:current
FPF_SPEC_SOURCE_PATH=published/current/FPF-Spec.md bun run mcp
```

Call `get_fpf_index_status` on whichever runtime you are about to rely on. The [Interface Contract reliance gate](/interface-contract#reliance-gate) applies per runtime.

## Recommended operator workspace

| Client registry key | Config | When to use |
| --- | --- | --- |
| `fpf_reference` | Hosted URL from [`.mcp.json`](https://github.com/venikman/fpf-memory/blob/main/.mcp.json) | Default FPF lookup, adoption parity checks, production smoke |
| `fpf_reference_local` | [`server.json`](https://github.com/venikman/fpf-memory/blob/main/server.json) stdio with `FPF_MCP_SURFACE=full` | Expert tools, index refresh, pre-deploy debugging |

If your client cannot register two servers, swap configs: hosted for merge/deploy validation, local for implementation/debug.

### Hosted-only (default)

Use [`.mcp.json`](https://github.com/venikman/fpf-memory/blob/main/.mcp.json) for the hosted public surface.

### Local full (contributors)

See [`.mcp.local-full.example.json`](https://github.com/venikman/fpf-memory/blob/main/.mcp.local-full.example.json) and [`server.json`](https://github.com/venikman/fpf-memory/blob/main/server.json). Register the stdio server as **`fpf_reference_local`** in the client; the MCP protocol still reports `fpf_reference` as `serverInfo.name`.

```sh
FPF_MCP_SURFACE=full bun run mcp
```

Or point the client at `server.json` if your MCP host supports it.

### Prompt routing for agents

See [AGENTS.md](https://github.com/venikman/fpf-memory/blob/main/AGENTS.md) **Dual runtime → Agent routing** for the canonical prompt block.

## Snapshot alignment checklist

Before comparing hosted vs local answers:

1. Run `bun run publish:current` if the committed channel changed.
2. Point local runtime at `published/current/FPF-Spec.md` (`FPF_SPEC_SOURCE_PATH`).
3. Call `get_fpf_index_status` on both runtimes and compare `sourceHash` / freshness fields.
4. Run `bun run smoke:production` after deploy to confirm hosted public surface health.

## Tool surface split

Public tools are listed in [`PUBLIC_MCP_TOOLS`](https://github.com/venikman/fpf-memory/blob/main/src/core/public-copy.ts) and [AGENTS.md](https://github.com/venikman/fpf-memory/blob/main/AGENTS.md). Expert and admin tools (`inspect_*`, `trace_fpf_path`, `refresh_fpf_index`, etc.) are local full-surface only.

## Non-goals

- Do not expose expert or admin tools on Vercel hosted (`FPF_MCP_SURFACE` stays `public` in production).
- Do not register hosted and local under the same MCP server key in default contributor templates.
- Do not replace `scripts/deploy-production-surfaces.ts` with Vercel MCP deploy tools—the prebuilt two-project flow and function-size gate stay authoritative.

## Related pages

- [Connect MCP](/connect-mcp) — first-time hosted setup
- [Vercel MCP Packaging](/vercel-mcp-packaging) — build, deploy, and operator evidence
- [Interface Contract](/interface-contract) — public tool contract and reliance gate
