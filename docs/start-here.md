---
title: "Start Here"
description: "One worked FPF example end to end, then the smallest doorway into the rest of the framework."
outline: deep
---

# Start Here

The **First Principles Framework (FPF)** is a pattern language for rigorous reasoning in engineering, research, and management, written by [Anatoly Levenchuk](https://github.com/ailev). You do not need to read the specification to benefit from it: this page walks one real example end to end, then hands you the smallest doorway that matches your work.

If a term stops you — holon, episteme, UTS — open the [Glossary](/glossary).

## What this page is

This is the adoption entry surface for the FPF Reference wiki. It helps a person, team, or agent get one grounded FPF answer first and pick a practical path; it is not the full FPF specification and it is not a product changelog.

## A worked example: project kickoff

**The situation.** You are kicking off a project. Responsibilities, working method, plans, and what actually happened keep blurring into one document.

**Step 1 — ask.** Connect your agent or editor to the FPF Reference MCP server ([Connect MCP](/connect-mcp) takes about two minutes), then run:

```txt
Use only fpf_reference. Call query_fpf_spec with question: "Project kickoff: align a project information system with roles and adoption next steps" and mode "compact". Return the most relevant FPF IDs, acceptance check, and next move.
```

**Step 2 — what comes back.** A bounded, cited answer — stable IDs plus an acceptance check, not a wall of spec text. Trimmed real output (captured June 2026; wording shifts as upstream FPF evolves, which is why every answer carries `snapshot` metadata):

```json
{
  "answer": "route:project-alignment (project alignment) is the matched first-practical route. Burden: \"We keep mixing responsibilities, working method, plans, and what actually happened.\" Ordered entry IDs: A.1.1 -> A.15 -> A.15.2 -> A.15.3 -> B.5.1. Acceptance check: a shared kickoff packet names the bounded context, actor roles, role/method/work split, first work-plan item, evidence to collect, and UTS-ready terms. Next move: read A.1.1 and A.15 first, draft the kickoff worksheet, then add A.15.2/A.15.3 only when the plan/run split must be made explicit.",
  "ids": ["route:project-alignment", "A.1.1", "A.15", "A.15.2", "A.15.3", "B.5.1", "F.11", "F.9", "F.17"],
  "constraints": [
    "Do not paste the whole FPF; use the route packet first and open exact pattern pages only when wording or boundary detail is actually needed."
  ],
  "confidence": 0.92,
  "status": "ok"
}
```

**Step 3 — use it.** Every ID in the answer is a page on this wiki:

1. Open the first two entry IDs: [A.1.1 U.BoundedContext — the semantic frame](/generated/patterns/A.1.1) and [A.15 Role-Method-Work Alignment](/generated/patterns/A.15).
2. Draft the kickoff packet the acceptance check names: bounded context, actor roles, role/method/work split, first work-plan item, evidence to collect.
3. Keep the IDs in the document. Anyone — colleague or agent — can audit the same patterns later through [route:project-alignment](/generated/routes/route_project-alignment).

That loop is the whole adoption model: ask in plain language, get stable IDs plus an acceptance check, open only the pages that change your work.

**No MCP client yet?** Walk the same path by hand: open [route:project-alignment](/generated/routes/route_project-alignment) and follow its ordered steps.

## Pick a doorway

The example above generalizes. Name your work shape, start from the matching doorway, and keep exact FPF IDs visible only where they change the work.

| Work | Start with | Good output |
| --- | --- | --- |
| Align a project or team | [Project review packet](/work-packets#project-review-packet) | Shared context, role/method/work split, first work surface |
| Review a PR or design change | [PR or code review packet](/work-packets#pr-or-code-review-packet) | Findings tied to IDs, constraints, risks, and tests |
| Dogfood a product as a user role | [Product-role feedback packet](/work-packets#product-role-feedback-packet) | Replayable job, friction evidence, proposed improvement, discussion-ready feedback |
| Write a specification | [Specification writing packet](/work-packets#specification-writing-packet) | Clear pattern order, semantic change record, acceptance harness |
| Unpack an API, contract, or promise | [Role, promise, and capability analysis packet](/work-packets#role-promise-and-capability-analysis-packet) | Atomic claims, boundary duties, evidence needs |
| Compare options | [Pattern Catalog](/patterns) + [MCP recipes](/mcp-recipes) | Governed shortlist or set result |
| Use FPF inside an agent conversation | [MCP recipes](/mcp-recipes) | Compact cited context instead of a full-spec paste |

## Operating rule

Do not ask people to read all of FPF before they can benefit from it. Ask for the work shape, retrieve the smallest grounded slice, and keep the exact IDs visible. The full catalog stays available for audit; it should not be the first mental model.

## When to use the full catalog

Use the [Pattern Catalog](/patterns) when the doorway is not enough, when an exact pattern clause matters, or when a reader needs to audit the source. Definitions live in the [Glossary](/glossary); the spec's own term index is [H.1](/generated/patterns/H.1).
