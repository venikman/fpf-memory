---
title: "Connect MCP"
description: "Client setup instructions for the hosted fpf-memory MCP server."
outline: deep
---

# Connect fpf-memory MCP

Use this page when you want ChatGPT, Claude, an editor, or a coding CLI to retrieve bounded FPF context through the hosted MCP server.

## Hosted endpoint

```txt
https://fpf-memory-mcp-proxy.vercel.app/api/mcp/fpf_memory/mcp
```

This endpoint is a remote MCP server over streamable HTTP. It exposes the public fpf-memory tools for catalog browsing, search, compact answers, exact generated doc reads, and index health.

The Vercel proxy forwards this public endpoint to the validated direct Vercel-origin runtime. The hosted client path is Vercel-only.

Public tools:

- `browse_fpf_catalog`
- `search_fpf`
- `ask_fpf`
- `query_fpf_spec`
- `read_fpf_doc`
- `get_fpf_index_status`

## Test first

After adding the server, ask your client to call `get_fpf_index_status`. Then run a compact route query:

```txt
Use only fpf_memory. Call query_fpf_spec with question: "Project kickoff: align a project information system with roles and adoption next steps" and mode "compact". Return the route ID, ordered IDs, acceptance check, and next move.
```

A good response should include `route:project-alignment` in `ids`, then bounded next steps rather than a full FPF paste.

## ChatGPT

Use this path for ChatGPT custom apps/connectors.

1. Open ChatGPT settings.
2. Go to Apps & Connectors.
3. Enable developer mode under Advanced settings if your plan or workspace requires it.
4. Create a new custom app or connector.
5. Set the connector URL to the hosted endpoint above.
6. Create the connector, confirm the advertised tools, then open a new chat and add the connector from the composer tools menu.

Reference: [OpenAI Apps SDK - connect from ChatGPT](https://developers.openai.com/apps-sdk/deploy/connect-chatgpt).

## Claude

Use this path for Claude chat, Claude Desktop, or Cowork custom connectors.

1. Open Claude settings.
2. Go to Customize > Connectors.
3. Click the `+` button next to Connectors.
4. Choose Add custom connector.
5. Enter `fpf-memory` as the name and the hosted endpoint as the URL.
6. Add it, then connect it in the same way as other Claude connectors.

Reference: [Claude Help - custom connectors](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities).

## VS Code

Use the MCP: Add Server command, or add a workspace config at `.vscode/mcp.json`:

```json
{
  "servers": {
    "fpf_memory": {
      "type": "http",
      "url": "https://fpf-memory-mcp-proxy.vercel.app/api/mcp/fpf_memory/mcp"
    }
  }
}
```

Restart or start the server from the MCP code lens, then confirm trust when VS Code asks.

Reference: [VS Code - add and manage MCP servers](https://code.visualstudio.com/docs/copilot/customization/mcp-servers).

## Zed

Open the Agent Panel settings with `agent: open settings`, then add a custom server:

```json
{
  "context_servers": {
    "fpf-memory": {
      "url": "https://fpf-memory-mcp-proxy.vercel.app/api/mcp/fpf_memory/mcp"
    }
  }
}
```

The indicator next to the server should turn green when the server is active.

Reference: [Zed - Model Context Protocol](https://zed.dev/docs/ai/mcp).

## Codex CLI

Add the remote streamable HTTP server:

```sh
codex mcp add fpf_memory --url https://fpf-memory-mcp-proxy.vercel.app/api/mcp/fpf_memory/mcp
```

Equivalent `~/.codex/config.toml` entry:

```toml
[mcp_servers.fpf_memory]
url = "https://fpf-memory-mcp-proxy.vercel.app/api/mcp/fpf_memory/mcp"
```

Reference: [Codex configuration reference](https://developers.openai.com/codex/config-reference#mcp_serversidurl).

## Claude Code

Add the remote HTTP server:

```sh
claude mcp add --transport http fpf_memory https://fpf-memory-mcp-proxy.vercel.app/api/mcp/fpf_memory/mcp
```

Check it inside Claude Code with `/mcp`.

Reference: [Claude Code - connect to tools via MCP](https://docs.claude.com/en/docs/claude-code/mcp).

## Pi

Pi supports MCP through extensions. Install an MCP extension, then add a streamable HTTP server config.

```sh
pi install npm:pi-mcp-extension
```

Global config at `~/.pi/agent/mcp.json` or project config at `.pi/mcp.json`:

```json
{
  "mcpServers": {
    "fpf_memory": {
      "transport": "streamable-http",
      "url": "https://fpf-memory-mcp-proxy.vercel.app/api/mcp/fpf_memory/mcp",
      "lifecycle": "eager"
    }
  }
}
```

Start Pi and use `/mcp` to check status.

Reference: [Pi MCP extension](https://pi.dev/packages/pi-mcp-extension).

## Good first prompt

```txt
Use only fpf_memory. First call get_fpf_index_status. If the index is available, find the smallest FPF route for this work: <describe work>. Return Context | Route ID | Ordered IDs | Friction avoided | Acceptance check | Next move.
```

Keep route answers compact. Read exact generated docs only when wording matters, and do not paste the full FPF into the chat.
