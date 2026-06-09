---
title: "What Do I Need To Run?"
description: "Use hosted FPF Reference MCP from a local client, or run/self-host it when external MCP servers are blocked."
outline: false
---

# What do I need to run?

You do not need to run an FPF server. You only need an MCP client that supports remote HTTP MCP servers.

Paste these values into the client.

| Field | Value |
| --- | --- |
| Name | `fpf_reference` |
| Transport | `HTTP` or `Streamable HTTP` |
| URL | `https://mcp.fpf.sh/api/mcp/fpf_reference/mcp` |
| Auth | None |

If the client asks for a local command, choose its remote HTTP server option instead.

## If your policy forbids external MCP servers

You can run the same FPF Reference MCP runtime locally or self-host it from the source repo:

```sh
git clone https://github.com/venikman/fpf-memory.git
cd fpf-memory
bun install
bun run mcp
```

Use the full local surface when you need expert inspection tools:

```sh
FPF_MCP_SURFACE=full bun run mcp
```

For clients that require an HTTP MCP URL instead of a stdio command, start the local HTTP server:

```sh
bun run start
```

Then configure the client URL as:

```txt
http://localhost:4111/api/mcp/fpf_reference/mcp
```

Set `PORT` to change the local HTTP port. For remote self-hosting, put the HTTP server behind your own HTTPS reverse proxy or deployment platform and keep the same `/api/mcp/fpf_reference/mcp` route.

After saving the server, confirm the client shows these tools:

- `browse_fpf_catalog`
- `search_fpf`
- `ask_fpf`
- `query_fpf_spec`
- `read_fpf_doc`
- `get_fpf_index_status`

First check:

```txt
Call get_fpf_index_status.
```

Good first prompt:

```txt
Use only fpf_reference. First call get_fpf_index_status. If the index is available, find the smallest FPF route for this work: <describe work>. Return Context | Route ID | Ordered IDs | Acceptance check | Next move.
```

Opening the endpoint in a browser returns `405 Method Not Allowed`. That is expected; the URL is for MCP clients.

For product-specific setup screens, use [Connect MCP](/connect-mcp).

For the public promise, non-use boundaries, freshness semantics, and schema map, use [Interface Contract](/interface-contract).
