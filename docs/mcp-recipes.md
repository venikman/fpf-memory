---
title: "MCP Recipes"
description: "Prompt recipes for using the FPF MCP server as compact grounded context."
outline: deep
---

# MCP Recipes

Use MCP instead of pasted context when the work needs grounded FPF context, exact IDs, or deterministic retrieval provenance.

## What this page is

This is the agent and tool-use guide for fpf-memory's MCP surface. It explains how to retrieve compact grounded FPF context instead of pasting the full specification into a conversation.

## Methodology

Check runtime health first, find the right doorway with search or query tools, read exact generated docs only when wording matters, and keep answers cited to route or pattern IDs. Hosted MCP exposes the public work surface; local full mode is for deeper inspection and provenance.

Hosted endpoint:

```txt
https://fpf-memory-mcp-vercel-origin.vercel.app/api/mcp/fpf_memory/mcp
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

## Dogfood a product role

Prompt:

```txt
Use only bounded FPF retrieval plus direct product evidence. Act as <persona> trying to complete <job> with fpf-memory. Return Context | Persona/job | Surface | FPF IDs used | Evidence | Friction | Proposed improvement | Severity | Validation path. Keep the answer discussion-ready and do not paste the full FPF.
```

Good personas to rotate:

- new adopter
- project lead
- PR/code reviewer
- spec writer
- agent integrator
- product maintainer

## Review a PR without full-spec paste

Prompt:

```txt
Use only the fpf_memory MCP server plus the PR diff, local files, and CI evidence. Review this PR through the PR or code review packet. Return Findings | FPF IDs | Evidence | Tests | Residual risk | Verdict. Lead with behavioral issues and cite exact files; do not paste the full FPF.
```

Good retrieval shape:

- Start with `query_fpf_spec` for `route:writing-or-reviewing-patterns`.
- Add `route:boundary-burden` only when the change touches an API, contract, workflow, protocol, CI gate, or deploy promise.
- Read exact pattern pages only when a finding depends on the wording.
- Keep the verdict tied to evidence: merge, fix first, or split scope.

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
