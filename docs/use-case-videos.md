---
title: "Demo Videos"
description: "Product-level FPF use case recordings for adoption, work use, and promotion."
outline: false
---

# Demo Videos

Use videos to show FPF as a working surface, not only as a reference document. Each recording should show a concrete job, the smallest FPF route or tool call needed, and the useful outcome.

## What this page is

This is the promotion and adoption evidence page for fpf-memory. It tracks recordings that show concrete FPF use cases for people and agents; it is not a general video library or a generated FPF reference page.

## Methodology

Record one repeatable job at a time. The video must show the initial problem, the FPF route, packet, MCP call, or CLI command used, and the outcome someone can copy into their own work.

## Record the current set

```bash
bun run videos:use-cases
```

For a quicker local check:

```bash
bun run videos:use-cases -- --skip-build --duration-ms 3000
```

Artifacts are written under `.runtime/use-case-videos/<timestamp>-fpf-product-use-cases/`. That folder includes a `README.md`, `manifest.json`, one `.webm` per scenario, and transcript pages for command and MCP recordings.

## Scenario set

| Surface | Video | Shows |
| --- | --- | --- |
| Docs wiki | Pick the right doorway | Start from the adoption page, choose a work doorway, then open the matching route or packet. |
| Docs wiki | Audit exact source | Move from a route to the exact generated pattern page when wording matters. |
| MCP runtime | Bounded agent context | Retrieve a compact project-alignment packet through MCP instead of pasting all FPF. |
| MCP runtime | Retrieval provenance | Use the full local MCP surface when trace evidence matters. |
| CLI runtime | Ask from terminal | Get a grounded FPF answer in a shell workflow. |
| CLI runtime | Follow-up session | Reuse bounded session context across related questions. |
| Work evaluator | Review working tree | Turn local work evidence into an FPF-grounded review surface. |
| Work evaluator | CI-readable gate | Produce a compact gate report for maintainers and agents. |

## Quality bar

- The recording must load real CSS; unstyled pages are not acceptable.
- The opening frame should show the product surface, not a blank or generic terminal.
- The narration should name the problem, the tool or route, the action, and the outcome.
- The output should be useful as adoption material for a new person and as a reminder for experienced users.
- Keep each scenario narrow enough that the viewer can copy the move into their own work.

## When to make a new video

Create a new recording when FPF gains a new practical use path: a new work packet, MCP recipe, CLI workflow, evaluator report, or live wiki doorway. Do not wait until the whole framework is explained. Show one repeatable job.
