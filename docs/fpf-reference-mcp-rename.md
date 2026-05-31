---
title: "FPF Reference MCP Rename"
description: "Compatibility plan for making fpf_reference the canonical hosted MCP server name."
outline: deep
---

# FPF Reference MCP Rename

This note records the current rename work so parallel branches and scheduled jobs do not undo it by accident.

## Current work scope

This PR makes `fpf_reference` the canonical hosted MCP server name and endpoint:

```txt
https://mcp.fpf.sh/api/mcp/fpf_reference/mcp
```

It keeps the legacy `fpf_memory` route entry present, but the route is blocked during the May 2026 cost incident mitigation:

```txt
https://mcp.fpf.sh/api/mcp/fpf_memory/mcp
```

The old route stays explicitly routed so users with stale ChatGPT, Claude, Codex, VS Code, Zed, Pi, or other MCP client configs fail cheaply with a migration signal instead of falling through to an expensive hosted runtime timeout.

## Naming model

`fpf_reference` is the server role. It provides bounded First Principles Framework lookup: exact IDs, generated docs, route suggestions, citations, and index freshness checks.

`fpf_memory` is the legacy compatibility name only. It should not be used for new setup snippets because it sounds like persistent agent memory, workflow state, or job-local context.

The repo name can remain `fpf-memory`. Repository identity, package history, and existing GitHub URLs are separate from the hosted MCP server name.

## What this PR does not change

- It does not remove `/api/mcp/fpf_memory/mcp`; it keeps the route but blocks it while the cost incident mitigation is active.
- It does not rename the repository or npm package.
- It does not change public MCP tool names.
- It does not change FPF compilation, chunking, retrieval, publication sync, or `published/current/**`.
- It does not make FPF Reference the owner of planning, review, QA, browser work, or team workflow.

## GStack comparison

GStack keeps workflow skills and persistent memory as separate roles. Its GBrain docs describe a typed MCP memory surface named `gbrain`, plus repo-scoped trust policy and sync guidance. That pattern supports the rename: our MCP server should be named for its job, not for a broad "memory" promise.

FPF Reference should cooperate with GStack, Superpowers, and project instructions by providing framework reference evidence. Those systems can still own planning, shipping, QA, and team workflow decisions.

## Parallel-work contract

Until the compatibility review date, any deployment, sync, docs, or Vercel MCP branch must preserve both entries in `HOSTED_MCP_ROUTES`:

- `/api/mcp/fpf_reference/mcp` as canonical
- `/api/mcp/fpf_memory/mcp` as blocked legacy compatibility

If a merge conflict touches hosted routing, Vercel output routes, `.mcp.json`, `.codex/config.toml`, or client setup docs, resolve it by keeping the canonical `fpf_reference` examples and the blocked legacy route. Do not delete the legacy route before 2026-06-30.

## Cleanup review

The scheduled workflow `.github/workflows/fpf-reference-legacy-alias-reminder.yml` opens a GitHub issue after 2026-06-30. That issue is a review gate, not an automatic deletion.

Before removing the legacy route, check deployed traffic, public docs, support messages, and any known client configs. If the legacy endpoint is still in active use, extend the compatibility window instead of breaking users.
