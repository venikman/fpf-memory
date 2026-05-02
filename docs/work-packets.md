---
title: "Work Packets"
description: "Task-sized FPF packets for project review, PR review, specs, role/promise analysis, and agent workflows."
outline: false
---

# Work Packets

A work packet is a small grounded slice of FPF for doing one job. It is not a replacement for the full specification.

## What this page is

This is the task-sized operating surface for using FPF in real work. It turns the framework into bounded packets for project review, PR review, spec writing, role analysis, and agent workflows.

## Methodology

Each packet keeps five things separate: the goal, the relevant route or pattern IDs, the operating questions, the constraints, and the acceptance checks. Start with the packet, retrieve exact source only when needed, and stop when the done condition is satisfied.

## Project review packet

Goal: make a project legible enough to decide the next work move.

Use:

- [route:project-alignment](/generated/routes/route_project-alignment)
- [A.1.1 U.BoundedContext](/generated/patterns/A.1.1)
- [A.15 Role / Method / Work stratification](/generated/patterns/A.15)
- [F.11 Method Quartet Harmonisation](/generated/patterns/F.11)
- [F.17 Unified Term Sheet](/generated/patterns/F.17)

Packet:

- Context: what bounded context is this work inside?
- Roles: who or what is acting, promising, deciding, or evidencing?
- Method: what abstract way of doing is claimed?
- Work: what actual work happened or must happen next?
- Evidence: what would show that the next move is real?

Done when: the project has one shared context statement, one role/method/work split, one next owner, and one acceptance check.

## PR or code review packet

Goal: find behavioral risk, missing evidence, or semantic drift.

Use:

- [route:writing-or-reviewing-patterns](/generated/routes/route_writing-or-reviewing-patterns)
- [E.8 Authoring conventions](/generated/patterns/E.8)
- [E.19 Pattern change record](/generated/patterns/E.19)
- [route:boundary-burden](/generated/routes/route_boundary-burden) for APIs, contracts, protocols, or CI/deploy gates

Packet:

- Claim: what does this change promise?
- Boundary: what interface, workflow, or invariant changed?
- Evidence: what test, build, deploy, or trace proves it?
- Risk: what could regress for a user or maintainer?
- Verdict: merge, fix first, or split scope.

Done when: every finding points at a concrete behavior, file, or missing check.

## Specification writing packet

Goal: write a spec that can be checked and evolved.

Use:

- [E.8 Authoring conventions](/generated/patterns/E.8)
- [E.10.D2 Part C Extension Patterns](/generated/patterns/E.10.D2)
- [E.14 Architectural pattern discipline](/generated/patterns/E.14)
- [E.19 Pattern change record](/generated/patterns/E.19)

Packet:

- Problem frame: what burden does the spec carry?
- Scope: what is in and out?
- Norms: which claims are requirements, recommendations, or descriptions?
- Harness: what acceptance or regression check proves the spec holds?
- Change record: what semantic move was made and why?

Done when: the spec has a checkable invariant, a reader-facing order, and an explicit evolution record.

## Role, promise, and capability analysis packet

Goal: separate ability, promise, responsibility, and performed work.

Use:

- [A.2 Role Taxonomy](/generated/patterns/A.2)
- [A.2.1 U.RoleAssignment](/generated/patterns/A.2.1)
- [A.2.2 U.Capability](/generated/patterns/A.2.2)
- [A.2.3 U.PromiseContent](/generated/patterns/A.2.3)
- [A.2.8 U.Commitment](/generated/patterns/A.2.8)
- [A.15 Role / Method / Work stratification](/generated/patterns/A.15)

Packet:

- Ability: what can the system or actor do?
- Promise: what is externally committed?
- Role assignment: who is accountable in this context?
- Commitment: what binds the promise to an accountable role?
- Performance: what actual work or evidence exists?

Done when: ability, promise, role, commitment, performance, and evidence are not collapsed into one word.

## Agent workflow use packet

Goal: let an agent use FPF without loading the whole FPF.

Use:

- [MCP recipes](/mcp-recipes)
- [route:project-alignment](/generated/routes/route_project-alignment)
- [E.8 Authoring conventions](/generated/patterns/E.8)
- [E.19 Pattern change record](/generated/patterns/E.19)

Packet:

- Ask the agent to name the work type first.
- Retrieve the route or 3-8 exact IDs through MCP.
- Ask for assumptions, model, options, pick, tests, risks, and next move.
- Require citations to FPF IDs when the framework changes a decision.
- Keep full-text pattern reads on demand.

Done when: the conversation includes enough FPF to steer the work, and not enough to bury the work.
