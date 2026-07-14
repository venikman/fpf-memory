# Vercel CLI Workflows Adoption Plan

> **For agentic workers:** This P2 docs-guidance change is intentionally executed inline. Use subagents only for substantive independent implementation tasks or material review independence. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adopt the composition pattern from Vercel's [CLI workflows for agents](https://vercel.com/docs/agent-resources/workflows) — complete command sequences with the reasoning between steps — for this repo's own operational surfaces, so agents and operators follow proven sequences instead of improvising command order.

**Architecture:** Guidance-first change. The workflows live in the public automation playbook next to the roles, access table, and evidence packet they depend on; `AGENTS.md` gets a discovery pointer. No GitHub Actions, script, or route changes.

**Tech Stack:** Markdown docs, existing Bun scripts (`deploy:*`, `monitor:*`, `smoke:production`, `bench:*`), pinned `vercel@54.7.1` CLI.

---

## What we adopt (and what we do not)

Adopted from the Vercel pattern:

- **Workflows, not command lists.** Each workflow is an end-to-end session: entry condition, ordered commands, the reasoning connecting them, and a done condition.
- **Colocation.** Workflows sit with the operating model they use (automation playbook), the way Vercel colocates workflows with feature docs.
- **Agent-first framing.** The sequences are written so a coding agent can follow the same investigation flow an experienced operator would.

Deliberately not adopted:

- Vercel's specific workflow catalog (flags, blob, sandbox, A/B tests) — this repo has two Vercel projects and a narrow operational surface; workflows map to what this repo actually operates.
- Raw `vercel deploy` sessions as the primary path — this repo's guarded scripts (`deploy:prod` with staged deploys, smoke, alias, auto-rollback) are stronger than bare CLI composition, so workflows prefer them and drop to the raw CLI only for inspection and rollback.

## Repo-specific mapping

| Vercel workflow | This repo's adaptation |
| --- | --- |
| Deploying a project from the CLI | Deploy both production surfaces (`deploy:validate` → `deploy:prod` → post-alias smoke/QA → evidence packet) |
| Debugging production 500 errors | Debug hosted MCP production errors (status endpoint → `vercel inspect` → logs → local repro → preview → guarded deploy) |
| Rolling back a production deployment | Alias-move rollback to a recorded known-good deployment plus smoke proof |
| Debugging slow Vercel Functions | Folded into the spend-breach workflow (function-duration GB-hours guardrail plus bundle-size check) |
| Diagnosing and fixing cache issues | Diagnose stale published content (freshness drift vs upstream FPF, sync worker trigger) |

## Task 1: Add the workflows section to the automation playbook

**Files:**
- Modify: `docs/automation-playbook.md`

- [x] **Step 1: Insert an `Operational CLI Workflows` section** between the Vercel MCP evidence loop and the merge policy, with shared rules (read-before-write, evidence-terminated, pinned CLI + scope, prefer guarded scripts), a workflow index table mapping workflow → role → minimum verification profile, and the five workflows above.

- [x] **Step 2: Keep monitor constraints intact** — reference only FPF IDs the playbook already cites (or none), so the content-quality monitor's curated-doc selector checks stay green.

## Task 2: Add the discovery pointer for agents

**Files:**
- Modify: `AGENTS.md`

- [x] **Step 1: Add an `Operational CLI Workflows` section** pointing at the playbook section and the upstream Vercel pattern, before Learned User Preferences.

## Task 3: Verify (P2)

- [x] **Step 1:** `bun run test -- tests/production-evidence-template.test.ts tests/content-quality-monitor.test.ts` — playbook-shape and curated-doc gates.
- [x] **Step 2:** `bun run monitor:content -- --mode local --format markdown` — local content-quality gate over the edited curated doc.
- [x] **Step 3:** `bun run docs:build` — the playbook is a published page; the build's dead-link check covers the new links.

## Future increments (not in this change)

- Colocate an agent quickstart (copyable prompt) on `connect-mcp`, mirroring Vercel's agent quickstart guides, once the hosted onboarding copy in `src/core/public-copy.ts` is ready to own it.
- Extend the workflow index if new operational surfaces appear (e.g. a third Vercel project or a new monitor).
