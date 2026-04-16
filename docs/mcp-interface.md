---
title: "MCP Interface"
description: "Spec-oriented interface contract for the hosted and local FPF MCP surfaces."
---

# MCP Interface

This page documents the MCP surfaces implemented by `fpf_memory`.

The runtime itself is compiler-backed and local to the spec file at **`FPF_SPEC_SOURCE_PATH`** (default `.fpf-upstream/FPF-Spec.md` after `bun run spec:download`).

- authored source: not vendored in this repository; see README environment section
- runtime artifacts: `.runtime/fpf-index/*`
- generated pattern markdown: `docs/generated/**` (local output of `docs:generate`, not tracked in git)
- static docs build: ignored `doc_build/`

## Transport

- hosted/public (default Codex path): `https://fpf-memory.server.mastra.cloud/api/mcp/fpf_memory/mcp`
- stdio (local expert/dev path): `FPF_MCP_SURFACE=full bun run mcp`
- HTTP (local dev path): `http://localhost:4111/api/mcp/fpf_memory/mcp` via `mastra dev`
- server name: `fpf_memory`
- protocol version: `2024-11-05`

The hosted server exposes only the public tool surface. Local stdio and local HTTP default to the same public surface; set `FPF_MCP_SURFACE=full` to expose the full tool set for local expert work.

## Codex Setup

Default `~/.codex/config.toml` entry:

```toml
[mcp_servers.fpf_memory]
url = "https://fpf-memory.server.mastra.cloud/api/mcp/fpf_memory/mcp"
```

This repo ships the same hosted configuration at `.codex/config.toml` and `.mcp.json`. Codex will load that file after the project is trusted.

For temporary local expert work, point a client at `src/mastra/stdio.ts` and set `FPF_MCP_SURFACE=full`.

## Tool Catalog

### Public tools (hosted default surface)

`browse_fpf_catalog`, `search_fpf`, `ask_fpf`, `query_fpf_spec`, `read_fpf_doc`, and `get_fpf_index_status`.

### Full-surface-only tools

`inspect_fpf_node`, `inspect_fpf_anchor`, `expand_fpf_citations`, `trace_fpf_path`, and `refresh_fpf_index`.

## Direct Document Contract

Canonical markdown paths preserve the current generated naming contract:

- patterns: `docs/generated/patterns/<ID>.md`
- routes: `docs/generated/routes/route_<slug>.md`
- preface pages: `docs/generated/preface/heading_<slug>_<lineStart>.md`

Static routes mirror those pages under `/generated/**` with clean URLs and `.html` emitted into ignored `doc_build/`. The underlying markdown under `docs/generated/` is produced locally by `docs:generate` and is not tracked in git.

## Verification

Typical checks:

```bash
bun run check
bun run test
curl -X POST https://fpf-memory.server.mastra.cloud/api/mcp/fpf_memory/tools/get_fpf_index_status/execute \
  -H 'content-type: application/json' \
  -d '{"data":{}}'
FPF_MCP_SURFACE=full bun run mcp
```
