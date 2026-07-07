# fpf-reference plugin

A Claude Code plugin that gives AI coding tools a one-command path to add,
connect, validate, or self-host the **FPF Reference MCP** server (`fpf_reference`).

It bundles:

| Component | What it provides |
| --- | --- |
| **Skill** `fpf-reference-mcp` | Setup guidance for all three paths (hosted remote, local full runtime, stdio bridge) plus the validation contract and guardrails. |
| **MCP registration** (`.mcp.json`) | Registers the hosted `fpf_reference` Streamable HTTP endpoint (`https://mcp.fpf.sh/api/mcp/fpf_reference/mcp`). |
| **Command** `/fpf-reference:validate` | Runs the first-call validation contract and reports layered evidence. |

## Install

This repository (`venikman/fpf-memory`) is a plugin marketplace. From Claude Code:

```text
/plugin marketplace add venikman/fpf-memory
/plugin install fpf-reference@fpf
```

Once installed, the hosted `fpf_reference` server is registered automatically.
Run `/fpf-reference:validate` to confirm the connection with a real first call.

## What you get

- **Hosted by default** — the public `fpf_reference` endpoint is unauthenticated,
  read-only FPF lookup. You do not install FPF itself.
- **Self-host option** — the `fpf-reference-mcp` skill documents running the local
  full-surface stdio runtime (`FPF_MCP_SURFACE=full`) for the expert tools
  (`inspect_*`, `trace_fpf_path`, `refresh_fpf_index`).
- **Bridge option** — for stdio-only clients, the skill documents an `mcp-remote`
  bridge to the hosted endpoint.

## Related

- MCP setup origin: <https://mcp.fpf.sh/>
- Health endpoint: <https://mcp.fpf.sh/api/fpf/status>
- Repo usage notes: [`AGENTS.md`](../../AGENTS.md)

> **FPF** is the upstream specification. **FPF Reference** is the product/surface.
> `fpf_reference` is the MCP server name. `fpf-memory` is the repo/package literal.
> Legacy `fpf_memory` is compatibility-only.
