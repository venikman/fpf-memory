---
title: "Glossary"
description: "Plain-language definitions of the FPF terms this site uses, each linked to its canonical pattern."
outline: deep
---

# Glossary

Plain-language definitions of the terms you will meet on this site, in roughly the order you will meet them. Every entry links to the canonical FPF pattern so you can audit the full definition. For the spec's own exhaustive index of every `U.Type`, relation, and operator, see the [H.1 Alphabetic Glossary](/generated/patterns/H.1).

## The site

### First Principles Framework (FPF)

A pattern language for rigorous reasoning in engineering, research, and management, written by [Anatoly Levenchuk](https://github.com/ailev) and published as a single specification at [github.com/ailev/FPF](https://github.com/ailev/FPF). This site is its reference projection: a browsable wiki plus a hosted MCP lookup server. Start with [Start Here](/start-here).

### Pattern

One named, numbered unit of the FPF spec — a reusable rule or structure with a stable ID such as `A.2.3` (Part letter + outline number). IDs are the citation currency of FPF: reviews, plans, and agent answers point at IDs, not page numbers. Browse them all in the [Pattern Catalog](/patterns).

### Part

A top-level chapter of the spec — `Part A` through `Part K` — grouping related patterns (Part A holds the core ontology, Part E holds authoring and publication discipline, and so on). The Part letter is the first segment of every pattern ID.

### Route

A published, ordered working path through a handful of patterns for one job — for example `route:project-alignment` for project kickoff. Routes are FPF working paths, not website URLs. See the [Route Catalog](/routes).

### Work packet

A task-sized checklist on this site that bundles the right route and patterns for one job (project review, PR review, product-role feedback, specification writing). Work packets are an adoption surface of this wiki, not part of the upstream spec. See [Work Packets](/work-packets).

### fpf_reference (the MCP server)

The hosted MCP server name agents and editors use to query the spec by stable ID. Six public read-only tools; deterministic graph lookups, not embeddings; not agent memory. Setup lives on [mcp.fpf.sh](https://mcp.fpf.sh/); the public contract lives on the [Interface Contract](/interface-contract).

### Snapshot and provenance

Every generated page and MCP answer is produced from a pinned upstream commit and source hash, shown in page footers and in each answer's `snapshot` field. Agents check freshness with `get_fpf_index_status` before relying on results.

## The framework

### Holon

Something that is simultaneously a whole and a part of a larger whole — a service is a whole made of components and a part of a platform. FPF models systems, work, and knowledge as holons with crisp boundaries so they compose without surprises. Canonical pattern: [A.1 Holonic Foundation](/generated/patterns/A.1).

### Bounded context

The semantic frame inside which your terms and claims hold — "where the claim holds." Naming the bounded context first is FPF's guard against two teams using one word for different things. Canonical pattern: [A.1.1 U.BoundedContext](/generated/patterns/A.1.1).

### Episteme

A knowledge artifact — a claim, specification, theory, or policy — treated as a first-class object with its own boundary and evidence, written `U.Episteme` in the spec. When FPF talks about keeping epistemes stable, it means keeping what you know and claim inspectable as work moves between people and tools.

### The U. prefix

Marks FPF's universal core types — `U.BoundedContext`, `U.Episteme`, `U.WorkPlan` — defined once and reused framework-wide, the way a standard library namespaces its primitives.

### Unified Term Sheet (UTS)

A shared table of terms — each pinned to its bounded context — that teams agree on so the same word means the same thing across contexts. Canonical pattern: [F.17 Unified Term Sheet](/generated/patterns/F.17).

### Multi-View Publication Kit (MVPK)

FPF's discipline for publishing one episteme as several typed views ("faces" — a summary card, a table, a formal spec) where no view may add claims beyond the source. Canonical pattern: [E.17 Multi-View Publication Kit](/generated/patterns/E.17).
