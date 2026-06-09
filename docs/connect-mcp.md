---
title: "Connect MCP"
description: "Client setup instructions for the hosted FPF Reference MCP server."
outline: deep
---

# Connect FPF Reference MCP

Use this page to connect ChatGPT, Claude, editors, or coding CLIs to the hosted FPF Reference MCP server so they can retrieve bounded public FPF context by stable IDs, patterns, and generated docs.

MCP origin landing (shorter mirror): [mcp.fpf.sh](https://mcp.fpf.sh/).

Contract card for engineers integrating against the public surface: [Interface Contract](/interface-contract).

## FPF vs MCP in one paragraph

- **FPF** is the specification (patterns, evidence rules, and any published route surfaces).
- **FPF Reference** projects that spec two ways: this wiki (read) and the MCP endpoint (query by ID).
- **FPF Reference MCP** is not agent memory, not a workflow engine, and not a web page.

You do not install FPF. Add one MCP URL to your client as **fpf_reference**.

## Connect in three steps

1. Copy the canonical endpoint below into your MCP client config.
2. Register the server as **`fpf_reference`** (not `fpf_memory`).
3. Run [First successful call](#first-successful-call): `get_fpf_index_status`, then one compact `query_fpf_spec`.

> **Still using `fpf_memory`?** Swap the server name to **`fpf_reference`** and replace the URL with the canonical endpoint below. The legacy route is blocked during the May 2026 mitigation.

## Hosted endpoint

```txt
https://mcp.fpf.sh/api/mcp/fpf_reference/mcp
```

This endpoint is the direct Vercel-hosted MCP origin over streamable HTTP. It exposes the public FPF Reference tools for catalog browsing, search, compact answers, exact generated doc reads, and index health.

Use this URL only in an MCP client configuration. Do not open it in a browser tab.

## Expected success

A working client should show:

- tools named `browse_fpf_catalog`, `search_fpf`, `ask_fpf`, `query_fpf_spec`, `read_fpf_doc`, and `get_fpf_index_status`;
- `get_fpf_index_status` returning index, build, and source freshness data;
- the first compact project prompt returning stable FPF IDs with bounded next steps.

`status=ok` or `fresh=true` means the deployed runtime artifacts are internally consistent with the configured source. It does not prove latest upstream FPF unless separate upstream-currentness evidence exists. See [Interface Contract](/interface-contract) for the full reliance gate and public tool schema map.

## First successful call

After adding the server, make the first success concrete:

1. Call `get_fpf_index_status`.
2. Confirm the response reports a loadable index and the expected upstream source details.
3. Run a compact route query:

```txt
Use only fpf_reference. Call query_fpf_spec with question: "Project kickoff: align a project information system with roles and adoption next steps" and mode "compact". Return the most relevant FPF IDs, acceptance check, and next move.
```

A good response should include stable FPF IDs in `ids`, then bounded next steps rather than a full FPF paste.

The legacy endpoint is blocked during the May 2026 cost incident mitigation:

```txt
https://mcp.fpf.sh/api/mcp/fpf_memory/mcp
```

Keep the route entry until the scheduled compatibility review on 2026-06-30 so old clients fail cheaply with a migration signal instead of falling through to an expensive timeout. Existing users with the old URL or `fpf_memory` client name should move to the canonical endpoint above.

After 2026-06-30, record the review outcome on this page and either remove the legacy route note or replace it with the current migration policy.

It is a JSON-RPC endpoint, not a web page. A bare browser GET returns **405 Method Not Allowed** because standalone MCP SSE streams are disabled on the hosted endpoint. Paste the canonical URL into your client's MCP config; do not open it in a tab.

For a browser-readable health check, use the freshness page instead:

```txt
https://mcp.fpf.sh/api/fpf/status
```

It returns JSON the browser will render — source hash, snapshot age, and the upstream ref the index was built from. `runtime.snapshotConsistent` is an internal deployed-artifact check; upstream/currentness stays `unknown` there unless a monitor compares the status payload to the intended upstream ref and source hash.

Public tools:

- `browse_fpf_catalog`
- `search_fpf`
- `ask_fpf`
- `query_fpf_spec`
- `read_fpf_doc`
- `get_fpf_index_status`

## Source and self-hosting

Yes, you can run FPF Reference MCP locally or self-host it. The source repo is [`github.com/venikman/fpf-memory`](https://github.com/venikman/fpf-memory). The upstream FPF specification it indexes is authored by [Anatoly Levenchuk](https://github.com/ailev) in [`github.com/ailev/FPF`](https://github.com/ailev/FPF); this repo is the MCP/runtime and docs projection, not the FPF spec itself.

For a local stdio MCP server:

```sh
git clone https://github.com/venikman/fpf-memory.git
cd fpf-memory
bun install
bun run mcp
```

For the full local surface with expert inspection tools:

```sh
FPF_MCP_SURFACE=full bun run mcp
```

For a local streamable HTTP server:

```sh
bun run start
```

The default local HTTP endpoint is:

```txt
http://localhost:4111/api/mcp/fpf_reference/mcp
```

Set `PORT` to change the local HTTP port. If you self-host for remote clients, put that HTTP server behind your own HTTPS reverse proxy or deployment platform and use the same `/api/mcp/fpf_reference/mcp` route. The committed `published/current/**` surface works out of the box; run `bun run spec:download` and `bun run publish:current` only when you want to refresh your local copy from upstream FPF.

## Connector metadata

Suggested connector name:

```txt
FPF Reference
```

Suggested description:

```txt
Retrieve bounded public First Principles Framework reference context by stable FPF IDs, patterns, and generated docs. Use for FPF lookup, compact answers, and exact citation-backed reads.
```

## Troubleshooting

| Symptom | Meaning | Fix |
| --- | --- | --- |
| Browser shows `405 Method Not Allowed` | Expected. This is not a web page. | Use the URL inside an MCP client configuration. |
| Client shows no tools | URL is wrong, the client did not initialize the server, or the connector is not enabled in the chat. | Recheck the canonical URL, refresh or restart the client, and verify the connection logs. |
| Looking for source or self-hosting instructions | FPF Reference MCP is the runtime repo; upstream FPF is the spec repo. | Use [`github.com/venikman/fpf-memory`](https://github.com/venikman/fpf-memory) for this MCP runtime and [`github.com/ailev/FPF`](https://github.com/ailev/FPF) for the upstream FPF spec. |
| Old `fpf_memory` endpoint fails | Expected during migration mitigation. | Use `https://mcp.fpf.sh/api/mcp/fpf_reference/mcp`. |
| Client asks for auth or OAuth | Unexpected for the public reference tools unless the client requires connector auth metadata. | Check client settings. No bearer token should be needed for public tools. |
| Test prompt does not return expected FPF IDs | The tool connected, but retrieval or index behavior may be off. | Run `get_fpf_index_status`, then retry `query_fpf_spec` with `mode: compact`. |
| Timeout | Hosted endpoint, index, or client transport issue. | Check `https://mcp.fpf.sh/api/fpf/status` first, then retry from the MCP client. |

## ChatGPT

Use this path for ChatGPT custom apps/connectors.

1. Open ChatGPT settings.
2. Go to Apps & Connectors.
3. Enable developer mode under Advanced settings if your plan or workspace requires it.
4. Create a new custom app or connector.
5. Use the suggested connector name and description above.
6. Set the connector URL to the hosted endpoint above.
7. Create the connector, confirm the advertised tools, then open a new chat and add the connector from the composer tools menu.

Reference: [OpenAI Apps SDK - connect from ChatGPT](https://developers.openai.com/apps-sdk/deploy/connect-chatgpt).

## Claude

Use this path for Claude chat, Claude Desktop, or Cowork custom connectors.

1. Open Claude settings.
2. Go to Customize > Connectors.
3. Click the `+` button next to Connectors.
4. Choose Add custom connector.
5. Enter `FPF Reference` as the name and the hosted endpoint as the URL.
6. Add it, then connect it in the same way as other Claude connectors.

Reference: [Claude Help - custom connectors](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities).

## VS Code

Use the MCP: Add Server command, or add a workspace config at `.vscode/mcp.json`:

```json
{
  "servers": {
    "fpf_reference": {
      "type": "http",
      "url": "https://mcp.fpf.sh/api/mcp/fpf_reference/mcp"
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
    "fpf_reference": {
      "url": "https://mcp.fpf.sh/api/mcp/fpf_reference/mcp"
    }
  }
}
```

The indicator next to the server should turn green when the server is active.

Reference: [Zed - Model Context Protocol](https://zed.dev/docs/ai/mcp).

## Codex CLI

Add the remote streamable HTTP server:

```sh
codex mcp add fpf_reference --url https://mcp.fpf.sh/api/mcp/fpf_reference/mcp
```

Equivalent `~/.codex/config.toml` entry:

```toml
[mcp_servers.fpf_reference]
url = "https://mcp.fpf.sh/api/mcp/fpf_reference/mcp"
```

Reference: [Codex configuration reference](https://developers.openai.com/codex/config-reference#mcp_serversidurl).

## Claude Code

Add the remote HTTP server:

```sh
claude mcp add --transport http fpf_reference https://mcp.fpf.sh/api/mcp/fpf_reference/mcp
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
    "fpf_reference": {
      "transport": "streamable-http",
      "url": "https://mcp.fpf.sh/api/mcp/fpf_reference/mcp",
      "lifecycle": "eager"
    }
  }
}
```

Start Pi and use `/mcp` to check status.

Reference: [Pi MCP extension](https://pi.dev/packages/pi-mcp-extension).

## Good first prompt

```txt
Use only fpf_reference. First call get_fpf_index_status. If the index is available, find the smallest FPF route for this work: <describe work>. Return Context | Route ID | Ordered IDs | Friction avoided | Acceptance check | Next move.
```

Keep route answers compact. Read exact generated docs only when wording matters, and do not paste the full FPF into the chat.
