---
title: "MCP Recipes"
description: "Prompt recipes for using the FPF MCP server as compact grounded context."
outline: false
---

# MCP Recipes

Use MCP instead of pasted context when the work needs grounded FPF context, exact IDs, or deterministic retrieval provenance.

Hosted endpoint:

```txt
https://fpf-memory.server.mastra.cloud/api/mcp/fpf_memory/mcp
```

## Check health

Ask the client to call:

```txt
get_fpf_index_status
```

Continue only if the runtime reports a fresh or loadable index.

## Find the right doorway

Prompt:

```txt
Use only the fpf_memory MCP server. Search or query FPF for the best route for this work: <describe work>. Return 3-8 exact IDs, why they matter, and what not to load yet.
```

Useful tools:

- `search_fpf`
- `query_fpf_spec`
- `ask_fpf`

## Read exact source text

Prompt:

```txt
Use only the fpf_memory MCP server. Read the generated FPF doc for <ID or route>. Summarize only the operational constraints needed for this task.
```

Useful tool:

- `read_fpf_doc`

## Produce a compact work packet

Prompt:

```txt
Use only the fpf_memory MCP server. Build an FPF work packet for <task>. Include goal, relevant route or IDs, operating questions, constraints, acceptance checks, risks, and one next move. Do not paste the whole FPF.
```

## Review work with FPF

Prompt:

```txt
Use only the fpf_memory MCP server plus local repo evidence. Review this change through FPF. Lead with findings, cite exact files and FPF IDs, then list tests and residual risk.
```

## Keep context bounded

Rules:

- Retrieve routes before individual patterns when the work type is unclear.
- Read exact pattern pages only when a decision depends on their wording.
- Prefer compact answers for active work and proof mode for audit.
- Do not paste the full FPF into a prompt; use MCP calls as the context boundary.
