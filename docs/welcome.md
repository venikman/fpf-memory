---
pageType: home
title: FPF Reference
description: Compiler-backed reference for the latest published FPF, projected as a slim wiki.
hero:
  name: FPF Reference
  text: Small, grounded entry points to the framework
  tagline: Use the full First Principles Framework instead of pasting the whole specification into every conversation. Adoption landing for the published reference — not the spec, not a release page.
  actions:
    - theme: brand
      text: Adoption guide
      link: /start-here
    - theme: alt
      text: Work packets
      link: /work-packets
    - theme: alt
      text: MCP recipes
      link: /mcp-recipes
features:
  - title: Patterns
    details: 237 patterns across parts A–K. Open an exact ID, audit the full reference, or compare neighboring patterns by Part.
    icon: A.1
    link: /
  - title: Routes
    details: 11 working paths through pattern IDs. Use a route when the work shape is known but the exact patterns are not.
    icon: F.1
    link: /generated/routes/index
  - title: Glossary
    details: FPF term glossary from the published source. Resolve unfamiliar vocabulary without leaving the reference.
    icon: H.1
    link: /generated/patterns/H.1
  - title: Change log
    details: FPF specification change log from the published source — not fpf-memory product release notes.
    icon: I.3
    link: /generated/patterns/I.3
---

## Methodology

Name the work first, choose the smallest matching route or packet, then open generated pattern pages only when exact wording matters. Keep the full FPF intact as the canonical source while retrieving only the slice needed for the task.

## MCP endpoint

Point an MCP-aware client at the hosted endpoint to retrieve compact grounded slices on demand:

```text
https://fpf-memory.server.mastra.cloud/api/mcp/fpf_memory/mcp
```

Tool catalog and local-surface setup: [README on GitHub](https://github.com/venikman/fpf-memory#run-and-test-mcp).

## Published from

- **Channel:** `latest-published`
- **Source hash:** `sha256:4bd579472278104ec472ad32f473b51a58d43e6066cc605f7693badcd2ca691d`
- **Upstream ref:** `75536eb67fe58e6ffe5c87d21631403fd71c3e10`
- **Published at:** 2026-04-17T19:28:48.527Z
