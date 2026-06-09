---
title: "Vercel MCP Packaging"
description: "Operator guide for building and deploying the hosted FPF Reference MCP surface on Vercel."
outline: deep
---

# Vercel MCP Packaging

This page is for **operators and contributors** who package or deploy the hosted MCP runtime. It is not part of the first-time adopter path — end users should start at [Connect MCP](/connect-mcp).

## What gets deployed

The MCP Vercel project (`fpf-reference-mcp`) serves:

- Streamable HTTP MCP at `https://mcp.fpf.sh/api/mcp/fpf_reference/mcp`
- Browser landing HTML at `https://mcp.fpf.sh/`
- Freshness JSON at `https://mcp.fpf.sh/api/fpf/status`

The wiki (`fpf.sh`) is a **separate** Vercel project (`fpf-sh`) built from `vercel:website:build`.

## Vercel MCP for operators

Vercel MCP is a separate operator-side control-plane server from Vercel, not the hosted FPF Reference MCP server. Use it to inspect Vercel projects, deployments, build logs, runtime logs, protected preview URLs, and Vercel documentation while keeping `fpf_reference` as the public FPF lookup endpoint.

General Codex setup:

```bash
codex mcp add vercel --url https://mcp.vercel.com
```

This repository also registers the same server in `.codex/config.toml` with tool approval prompts enabled by default. Codex will still require OAuth authorization before the Vercel tools can access the account.

Project-specific Vercel MCP URLs can reduce missing team/project parameters during operations:

```text
https://mcp.vercel.com/venikmans-projects/fpf-reference-mcp
https://mcp.vercel.com/venikmans-projects/fpf-sh
```

Use the project-specific `fpf-reference-mcp` URL for MCP/API deployment checks and the `fpf-sh` URL for website deployment checks. Use the general `https://mcp.vercel.com` endpoint when a run needs to compare both projects.

Recommended operator prompts:

```text
Use the Vercel MCP server named vercel. Inspect the latest production deployment for project fpf-reference-mcp in team venikmans-projects, then get build logs and runtime logs for errors since the deploy. Do not deploy or change domains.
```

```text
Use the Vercel MCP server named vercel. Fetch https://mcp.fpf.sh/api/fpf/status through Vercel access tooling if protection or preview auth blocks a normal fetch, then report status, deployment URL, and any runtime errors. Do not mutate the project.
```

Keep human confirmation enabled for Vercel MCP tools, especially actions that can mutate Vercel state, create access links, run CLI actions, deploy, promote, alias, rollback, buy domains, or change billing-related resources. Vercel MCP should supply evidence for the production packet; the merge/deploy scripts below remain the source of deployment work.

## Publication input

Both surfaces consume the committed channel `published/current/**`, staged before MCP deploy via:

```bash
bun run publish:current    # local pre-push / sync PR
bun run predeploy          # stage-from-published before vercel:mcp:build
```

Do not point production deploys at live upstream downloads inside CI.

## Build and deploy commands

```bash
# MCP bundle (includes function size gate)
bun run vercel:mcp:build
bun run vercel:mcp:deploy:prod

# Website bundle (separate project)
bun run vercel:website:build
bun run vercel:website:deploy:prod

# Both production surfaces
bun run deploy:prod
```

Config files:

- [`vercel.mcp.json`](../vercel.mcp.json) — MCP/API project (`buildCommand`: `bun run vercel:mcp:build`)
- [`vercel.json`](../vercel.json) — static wiki project

## Safety switches

| Variable | Purpose |
| --- | --- |
| `FPF_HOSTED_MCP_DISABLED` | Emergency `503` shutoff for `/api/mcp/*` before loading runtime |
| `bench:vercel:function-size` | Fails build when MCP function bundle exceeds budget |

## Verification after deploy

```bash
bun run smoke:production
bun run test:e2e -- tests/e2e/mcp.spec.ts
bun run monitor:content -- --mode live
```

Expect `get_fpf_index_status` and public tool list on the canonical `fpf_reference` route; legacy `fpf_memory` should remain blocked with a cheap migration signal.
