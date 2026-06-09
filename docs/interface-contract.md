---
title: "Interface Contract"
description: "Public contract card for the hosted fpf_reference MCP interface."
outline: deep
---

# FPF Reference Interface Contract

This page is the public contract card for the hosted MCP interface named `fpf_reference`.

It is not the upstream FPF specification, not agent memory, not workflow state, and not a project-policy authority. The source repo name `fpf-memory` is historical; new client setup and public guidance use `fpf_reference`.

## Contract Card

| Field | Contract |
| --- | --- |
| Entity of concern | Hosted MCP interface named `fpf_reference`. |
| Canonical endpoint | `https://mcp.fpf.sh/api/mcp/fpf_reference/mcp` |
| Legacy endpoint | `https://mcp.fpf.sh/api/mcp/fpf_memory/mcp` is migration-only or blocked for new clients. |
| Purpose | Deterministic lookup, routing, citation, and exact-doc access over a compiled FPF snapshot. |
| Contract source | Public copy lives in `src/core/public-copy.ts`; executable tool schemas live in `src/mcp/tool-contracts.ts`. |

## Governing FPF Distinctions

| ID | Use in this contract |
| --- | --- |
| `A.1.1` | Bound the local meaning of FPF Reference, MCP, runtime, and upstream FPF. |
| `A.2.3` | Treat public setup text as promise/access/acceptance content, not performed work. |
| `A.6.B` | Separate laws, admissibility gates, commitments, and evidence claims. |
| `A.6.C` | Unpack contract wording so the interface does not become agent memory or policy. |
| `A.10` | Tie reliance-bearing claims to source, snapshot, status, and citation evidence. |
| `B.3` | Keep assurance scoped to the typed claim actually evidenced by the runtime. |
| `A.15.1` | Keep docs/status/test evidence separate from actual performed work. |

## Admissible Use

- Discover relevant FPF IDs, routes, and catalog entries.
- Ask compact grounded FPF questions.
- Retrieve exact generated docs when wording matters.
- Check runtime/source/snapshot status before reliance-bearing use.

## Non-Admissible Use

- Agent memory or job-local state.
- Workflow engine or project-policy authority.
- Upstream FPF authoring or semantic editing surface.
- Availability, support, SLA, compliance, or readiness proof.
- Proof that upstream FPF is latest beyond the reported source/snapshot evidence.

## Reliance Gate

1. Call `get_fpf_index_status` before trust-sensitive use.
2. Proceed only when `snapshotExists` is true, `fresh` is true, and `currentSourceHash` matches `sourceHash`.
3. Use `read_fpf_doc` for exact FPF wording; use `ask_fpf` or `query_fpf_spec` for bounded context.

## Freshness Semantics

- status ok or fresh means the deployed runtime artifacts are internally consistent with the configured source.
- Internal consistency is not global upstream currentness.
- upstreamCurrentness = unknown means do not claim latest upstream FPF unless an external monitor proves it.

## Output Expectations

- Answers expose stable FPF IDs, citations or grounding, constraints or gaps, and snapshot metadata.
- Catalog/search responses expose bounded result sets with source snapshot metadata.
- Exact wording comes from read_fpf_doc rather than regenerated prose.

## Public Tool Contract

| Tool | Purpose | Input contract | Output contract | Acceptance cue |
| --- | --- | --- | --- | --- |
| `browse_fpf_catalog` | Browse compiled patterns, routes, lexemes, and preface entries by part, status, kind, and limit. | `browseFpfCatalogInputSchema`: `part?`, `status?`, `kind?`, `limit?`, `forceRefresh?` | `browseFpfCatalogResultSchema`: `entries`, `total`, `filters`, `didYouMean?`, `snapshot` | Use for discovery before reading or querying exact nodes. |
| `search_fpf` | Run ranked full-text search across compiled FPF nodes. | `searchFpfInputSchema`: `query`, `kind?`, `limit?`, `forceRefresh?` | `searchFpfResultSchema`: `query`, `hits`, `total`, `snapshot` | Use when the caller has words or concepts but not an exact ID. |
| `ask_fpf` | Return markdown-first FPF answers with grounding metadata. | `askFpfInputSchema`: `question`, `mode?`, `forceRefresh?`, `sessionId?` | `askFpfResultSchema`: `markdown`, `ids`, `citations`, `constraints`, `gaps`, `confidence`, `status`, `snapshot` | Use for chat answers; keep them compact and citation-backed. |
| `query_fpf_spec` | Return structured answer envelopes for FPF lookup and route selection. | `queryFpfSpecInputSchema`: `question`, `mode?`, `forceRefresh?`, `sessionId?` | `queryResultSchema`: `answer`, `ids`, `relations`, `constraints`, `citations`, `gaps`, `confidence`, `status`, `snapshot` | Use for deterministic planning context or machine-readable routing. |
| `read_fpf_doc` | Resolve one selector to canonical generated markdown and page metadata. | `readFpfDocInputSchema`: `selector`, `kind?`, `mode?`, `maxChars?`, `forceRefresh?` | `readDocResultSchema`: `selector`, `resolvedAs`, `status`, `nodeId?`, `title?`, `docRef?`, `markdown?`, `headings?`, `preview?`, `snapshot` | Use for exact FPF wording and cite the generated page path. |
| `get_fpf_index_status` | Inspect whether the runtime index exists and is fresh against the configured source. | `getFpfIndexStatusInputSchema`: `random_string?` compatibility placeholder | `runtimeStatusSchema`: `sourcePath`, `sourceHash?`, `builtAt?`, `snapshotExists`, `currentSourceHash`, `fresh`, `compilerMode`, `artifacts`, `sessionCache` | Use as the first reliance gate before trust-sensitive FPF lookup. |

## Acceptance Tests

- Public tool list equals the six-tool public surface.
- Legacy fpf_memory endpoint remains migration-only or blocked for new clients.
- Standalone browser GET remains non-MCP and returns 405 Method Not Allowed.
- Status endpoint reports source, snapshot, freshness, and upstream-currentness fields.
- Compact query returns stable FPF IDs and bounded next steps.
- Exact wording use goes through read_fpf_doc.

## Operational Evidence

The contract is only a promise/access/acceptance description. It is not proof that any particular client call succeeded.

For current operational evidence, use:

- `get_fpf_index_status` from an MCP client.
- `https://mcp.fpf.sh/api/fpf/status` for browser-readable status.
- Repository checks such as `bun run check`, `bun run docs:build`, `bun run test:ci`, and `bun run smoke:production`.

For setup instructions, return to [Connect MCP](/connect-mcp).
