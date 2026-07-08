---
name: fpf-reference-mcp
description: Install, connect, validate, or self-host the FPF Reference MCP server. Use for hosted remote setup, local stdio or HTTP runtime setup, and local bridge/proxy setup for clients that need a localhost MCP URL while using the hosted remote endpoint.
---

# FPF Reference MCP

Use this skill when a user wants to add, verify, troubleshoot, self-host, or locally bridge FPF Reference MCP.

## Core facts

- Public MCP server name: `fpf_reference`.
- Hosted endpoint: `https://mcp.fpf.sh/api/mcp/fpf_reference/mcp`.
- Browser-readable health endpoint: `https://mcp.fpf.sh/api/fpf/status`.
- Public source repo: `https://github.com/venikman/fpf-memory`.
- Upstream FPF spec repo: `https://github.com/ailev/FPF`.
- A browser `GET` to the MCP endpoint returning `405 Method Not Allowed` is expected; it is a JSON-RPC Streamable HTTP endpoint, not a web page.
- Legacy `fpf_memory` is compatibility-only. Do not use it in new snippets unless the task is explicitly migration from the legacy name.

Public tools normally exposed:

- `browse_fpf_catalog`
- `search_fpf`
- `ask_fpf`
- `query_fpf_spec`
- `read_fpf_doc`
- `get_fpf_index_status`

## Pick the setup path

- **Hosted remote, no local server** — use when the client supports HTTP or Streamable HTTP MCP servers. Read `references/connect.md`.
- **Local FPF runtime** — use when the user wants local artifacts, self-hosting, or the full expert tool surface. Read `references/install.md`.
- **Local server that connects to remote** — use when the user needs a localhost URL but wants the hosted endpoint as source of truth. Read `references/local-remote-server.md`.

If the client only supports a local stdio command and cannot register HTTP MCP URLs, do not claim the remote proxy solves that. Use the local stdio runtime, or verify a separate stdio-to-HTTP adapter against current upstream docs before giving exact install commands.

## Validation contract

After any setup, require a real first-call check:

1. Call `get_fpf_index_status`.
2. Confirm the client sees the public tools listed above.
3. Run one compact query:

   > Use only `fpf_reference`. Call `query_fpf_spec` with question: "Project kickoff: align a project information system with roles and adoption next steps" and mode "compact". Return the route ID, ordered IDs, acceptance check, and next move.

A good first answer should include `route:project-alignment` or explain why the current published index cannot return that route.

Keep evidence layers separate:

- **Configuration evidence**: the snippet or client setting that was added.
- **Connection evidence**: tool list or `get_fpf_index_status`.
- **Runtime evidence**: compact query result.
- **Freshness evidence**: production/currentness monitor or repo deployment check, not just the status endpoint.

The `/fpf-reference:validate` command runs this contract end to end.

## Guardrails

- Default users to the hosted endpoint. They do not install FPF itself.
- Use **FPF Reference** for the product/surface and `fpf_reference` for the MCP server.
- Treat `fpf-memory` as the repo/package literal only.
- Do not paste the whole FPF spec into a chat; ask for compact answers and read exact docs only when wording matters.
- Before changing or publishing the source repo, read its current `AGENTS.md` and use current repo checks as authority.
