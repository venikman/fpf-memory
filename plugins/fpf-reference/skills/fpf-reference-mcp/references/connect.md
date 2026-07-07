# Connect: hosted remote (no local server)

Default path for most adopters. The hosted `fpf_reference` server is a public,
read-only, JSON-RPC **Streamable HTTP** endpoint — no authentication, no local
install of FPF itself.

- Endpoint: `https://mcp.fpf.sh/api/mcp/fpf_reference/mcp`
- Health (browser-readable): `https://mcp.fpf.sh/api/fpf/status`
- A browser `GET` to the MCP endpoint returns `405 Method Not Allowed`. That is expected — it is a JSON-RPC transport, not a web page.

## Per-client setup

### Claude Code

```bash
claude mcp add --transport http fpf_reference https://mcp.fpf.sh/api/mcp/fpf_reference/mcp
```

Or add a project-scoped `.mcp.json`:

```json
{
  "mcpServers": {
    "fpf_reference": {
      "type": "http",
      "url": "https://mcp.fpf.sh/api/mcp/fpf_reference/mcp"
    }
  }
}
```

### Claude.ai and Claude Desktop

Add a custom connector (Settings → Connectors → Add custom connector):

- Name: `FPF Reference`
- URL: `https://mcp.fpf.sh/api/mcp/fpf_reference/mcp`

### Cursor

```json
{
  "mcpServers": {
    "fpf_reference": {
      "url": "https://mcp.fpf.sh/api/mcp/fpf_reference/mcp"
    }
  }
}
```

### Windsurf

Windsurf uses `"serverUrl"` instead of `"url"`:

```json
{
  "mcpServers": {
    "fpf_reference": {
      "serverUrl": "https://mcp.fpf.sh/api/mcp/fpf_reference/mcp"
    }
  }
}
```

### VS Code (MCP: Add Server → HTTP)

- URL: `https://mcp.fpf.sh/api/mcp/fpf_reference/mcp`
- Name: `fpf_reference`

## Validate

Run the validation contract from `SKILL.md` (or the `/fpf-reference:validate`
command): call `get_fpf_index_status`, confirm the six public tools, then run the
compact `query_fpf_spec` kickoff query and check for `route:project-alignment`.
