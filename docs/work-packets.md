---
title: "Work Packets"
description: "Task-sized FPF packets for project review, PR review, product-role feedback, specs, role/promise analysis, and agent workflows."
outline: deep
---

# Work Packets

A work packet is a small grounded slice of FPF for doing one job. It is not a replacement for the full specification.

## What this page is

This is the task-sized operating surface for using FPF in real work. It turns the framework into bounded packets for project review, PR review, product-role feedback, spec writing, role analysis, and agent workflows.

## Methodology

Each packet keeps five things separate: the goal, the relevant route or pattern IDs, the operating questions, the constraints, and the acceptance checks. Start with the packet, retrieve exact source only when needed, and stop when the done condition is satisfied.

## Project review packet

Goal: make a project legible enough to decide the next work move.

Use:

- [route:project-alignment](/generated/routes/route_project-alignment)
- [A.1.1 U.BoundedContext](/generated/patterns/A.1.1)
- [A.15 — Role-Method-Work Alignment](/generated/patterns/A.15) — use as the role / method / work stratification packet
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

- [E.8 Authoring conventions](/generated/patterns/E.8) for FPF pattern or specification wording changes
- [E.19 — Pattern Quality Gates: Review & Refresh Profiles](/generated/patterns/E.19) as the pattern change-record gate
- [route:writing-or-reviewing-patterns](/generated/routes/route_writing-or-reviewing-patterns) only when the PR changes FPF pattern or specification text
- [route:boundary-burden](/generated/routes/route_boundary-burden) for APIs, contracts, protocols, or CI/deploy gates
- Otherwise use this packet as the review checklist and retrieve exact IDs only when a finding depends on FPF wording

Packet:

- Claim: what does this change promise?
- Boundary: what interface, workflow, or invariant changed?
- Evidence: what test, build, deploy, or trace proves it?
- Risk: what could regress for a user or maintainer?
- Verdict: merge, fix first, or split scope.

Done when: every finding points at a concrete behavior, file, or missing check.

## Product-role feedback packet

Goal: act as one concrete user role and turn product friction into evidence-backed adoption feedback.

Use:

- [E.12 — Didactic Primacy & Cognitive Ergonomics](/generated/patterns/E.12) — use as the human feedback-loop packet
- [route:project-alignment](/generated/routes/route_project-alignment)
- [A.1.1 U.BoundedContext](/generated/patterns/A.1.1)
- [A.15 — Role-Method-Work Alignment](/generated/patterns/A.15) — use as the role / method / work stratification packet
- [A.2.2 U.Capability](/generated/patterns/A.2.2)
- [A.2.3 U.PromiseContent](/generated/patterns/A.2.3)

Packet:

- Persona: which role is trying the product, and what job do they need done?
- Surface: docs wiki, hosted MCP, CLI, evaluator, deploy evidence, or automation feedback.
- Job: what concrete task should be possible without pasting the full FPF?
- Friction: what explanation, route, affordance, evidence, or compact context was missing?
- Evidence: URL, command, MCP call, screenshot, issue, discussion, or log path.
- Feedback: one proposed improvement, severity, and validation path.

Done when: the role/job can be replayed by another person, the feedback points at exact evidence, and the output is either a focused PR, issue, GitHub Discussion, or no-new-feedback checkpoint.

## Specification writing packet

Goal: write a spec that can be checked and evolved.

Use:

- [E.8 Authoring conventions](/generated/patterns/E.8)
- [E.10.D2 — Intension-Description-Specification Discipline (I/D/S)](/generated/patterns/E.10.D2) — use as the Part-C extension-pattern discipline
- [E.14 — Human-Centric Working-Model](/generated/patterns/E.14) — use as the architectural pattern-discipline check
- [E.19 — Pattern Quality Gates: Review & Refresh Profiles](/generated/patterns/E.19) — use as the pattern change-record gate

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
- [A.15 — Role-Method-Work Alignment](/generated/patterns/A.15) — use as the role / method / work stratification packet

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
- [E.19 — Pattern Quality Gates: Review & Refresh Profiles](/generated/patterns/E.19) — use as the pattern change-record gate

Packet:

- Ask the agent to name the work type first.
- Retrieve the route or 3-8 exact IDs through MCP.
- Ask for assumptions, model, options, pick, tests, risks, and next move.
- Require citations to FPF IDs when the framework changes a decision.
- Keep full-text pattern reads on demand.

Done when: the conversation includes enough FPF to steer the work, and not enough to bury the work.
