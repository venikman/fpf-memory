---
title: "Vercel Proxy"
description: "Trusted-domain reverse proxy spike for the hosted fpf-memory MCP endpoint."
outline: false
---

# Vercel trusted-domain proxy

Use this page to stand up a Vercel-managed hostname that forwards the public MCP endpoint to the existing Mastra Cloud deployment. This is a proxy spike, not a migration of the MCP runtime.

## Current state

Canonical MCP endpoint:

```txt
https://fpf-memory.server.mastra.cloud/api/mcp/fpf_memory/mcp
```

Vercel proxy project root:

```txt
deploy/vercel-proxy
```

The proxy preserves the MCP path:

```txt
https://<your-vercel-domain>/api/mcp/fpf_memory/mcp
```

## Vercel setup

1. Create a Vercel project from this repository.
2. Set the Vercel project root directory to `deploy/vercel-proxy`.
3. Attach the trusted custom domain, for example `mcp.<your-domain>`.
4. Deploy a preview first.
5. Smoke-test the preview URL before changing client docs or local configs.

The proxy config forwards only:

- `/api/mcp/fpf_memory/mcp`
- `/connect-mcp`
- `/`

The MCP route sets `Cache-Control`, `CDN-Cache-Control`, and `Vercel-CDN-Cache-Control` to `no-store`.

## Smoke test

Run the hosted HTTP smoke against the current Mastra origin:

```bash
bun run smoke:mcp:http
```

Run the same smoke against the Vercel preview or production domain:

```bash
FPF_MCP_SMOKE_URL=https://mcp.<your-domain>/api/mcp/fpf_memory/mcp bun run smoke:mcp:http
```

The smoke verifies:

- `initialize` returns server `fpf_memory`
- `tools/list` returns the six public tools only
- `get_fpf_index_status` reports a fresh `local_vectorless` snapshot
- `query_fpf_spec` returns `route:project-alignment`
- `GET` with `Accept: text/event-stream` returns SSE or a valid method rejection

## Cutover rule

Do not update `HOSTED_MCP_ENDPOINT`, `.mcp.json`, `.codex/config.toml`, or public client snippets until the Vercel proxy passes the smoke test from a deployed preview or production URL.

After the proxy passes, keep the Mastra URL available for one migration window. ChatGPT, Claude, Codex, editor, and CLI clients register exact URLs, so a hard cut can break existing connector configs.
