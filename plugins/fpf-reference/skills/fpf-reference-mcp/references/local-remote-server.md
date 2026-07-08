# Local server that connects to remote (stdio bridge)

Use when a client can only register a **local stdio command** and cannot register
an HTTP / Streamable HTTP MCP URL, but you still want the **hosted** endpoint as
the source of truth (no local FPF runtime, no self-hosting).

This bridges a local stdio process to the hosted `fpf_reference` endpoint. It does
**not** run FPF locally — it proxies to `mcp.fpf.sh`.

## Bridge with `mcp-remote`

```json
{
  "mcpServers": {
    "fpf_reference": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.fpf.sh/api/mcp/fpf_reference/mcp"]
    }
  }
}
```

The client launches `npx mcp-remote <url>` as a stdio server; `mcp-remote`
forwards JSON-RPC to the hosted Streamable HTTP endpoint and streams responses
back over stdio.

## Before giving exact commands

- `mcp-remote` is a third-party adapter, not part of this repo. Verify its current
  package name, flags, and transport behavior against its upstream docs before
  handing a user exact install commands — do not assume this snippet is current.
- If the client *does* support HTTP MCP URLs, skip the bridge entirely and use the
  direct hosted setup in `references/connect.md`. The bridge only exists for
  stdio-only clients.
- The hosted endpoint is unauthenticated and read-only, so no token or OAuth flow
  is involved in the bridge.

## Validate

Same validation contract as every path: `get_fpf_index_status`, confirm the six
public tools, then the compact `query_fpf_spec` kickoff query expecting
`route:project-alignment`. See `SKILL.md`.
