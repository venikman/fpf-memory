---
description: Run the FPF Reference MCP validation contract (index status + tool list + compact route query) and report layered evidence.
---

Run the FPF Reference MCP **validation contract** against the hosted `fpf_reference`
server and report the result as separated evidence layers. Use only the
`fpf_reference` server. Do not paste the whole FPF spec.

1. **Connection** — call `get_fpf_index_status`. Confirm `fresh: true` and that the
   snapshot artifacts are present. Confirm the client lists the six public tools:
   `browse_fpf_catalog`, `search_fpf`, `ask_fpf`, `query_fpf_spec`, `read_fpf_doc`,
   `get_fpf_index_status`. (If `inspect_*` / `trace_fpf_path` appear, you are on a
   local full-surface runtime, not the hosted endpoint — note that.)

2. **Runtime** — call `query_fpf_spec` with:
   - question: `Project kickoff: align a project information system with roles and adoption next steps`
   - mode: `compact`

   Report the route ID, ordered IDs, acceptance check, and next move.

3. **Verdict** — a good first answer includes `route:project-alignment`. If it does
   not, explain why the current published index cannot return that route.

Report four separate evidence layers:

- **Configuration** — the client setting used to reach the server.
- **Connection** — the tool list and `get_fpf_index_status` output.
- **Runtime** — the compact `query_fpf_spec` result.
- **Freshness** — source hash / `builtAt` versus the published surface (or the
  `https://mcp.fpf.sh/api/fpf/status` health endpoint), not just that a call
  succeeded.
