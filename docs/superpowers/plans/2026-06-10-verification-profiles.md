# Verification Profiles Implementation Plan

> **For agentic workers:** This P2 docs-guidance change is intentionally executed inline to avoid unnecessary subagent fan-out. Use subagents only for substantive independent implementation tasks or material review independence. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add profile-based verification guidance so tiny low-risk PRs avoid excessive local agent work while production/security/deploy/MCP changes keep strong evidence gates.

**Architecture:** This is a guidance-first change. It updates the operator rule in `AGENTS.md`, the author-facing PR template, and the public automation playbook without changing GitHub Actions triggers.

**Tech Stack:** Markdown docs, GitHub pull request template, existing Bun verification scripts.

---

## File Structure

- `AGENTS.md`: owns repo-local Codex/operator behavior and the primary verification rule.
- `.github/pull_request_template.md`: captures PR validation profile and evidence from contributors.
- `docs/automation-playbook.md`: documents public automation roles, evidence loops, and monitor defaults.

## Task 1: Add Verification Profiles to AGENTS.md

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Add profile guidance under Codex Verification Rule**

Replace the single-paragraph rule with the existing sentence plus a profile table. Preserve the requirement for closest real verification and add explicit escalation triggers.

- [ ] **Step 2: Static inspect the edited section**

Run: `sed -n '31,70p' AGENTS.md`
Expected: the section contains profiles P0 through P4, escalation triggers, and no workflow-trigger changes.

- [ ] **Step 3: Commit is deferred**

Commit after all documentation targets are updated so one implementation commit carries the full guidance change.

## Task 2: Add Profile Selection to PR Template

**Files:**
- Modify: `.github/pull_request_template.md`

- [ ] **Step 1: Add validation profile fields**

Under `## Validation`, add fields for selected profile, reason, local command/evidence, and skipped broader checks rationale.

- [ ] **Step 2: Preserve production evidence packet**

Ensure the production evidence packet remains required for production-facing behavior, deployment, automation, monitoring, public docs, MCP routes, or published artifacts.

- [ ] **Step 3: Static inspect the template**

Run: `sed -n '18,50p' .github/pull_request_template.md`
Expected: validation profile fields appear before the existing checklist.

## Task 3: Update Automation Playbook

**Files:**
- Modify: `docs/automation-playbook.md`

- [ ] **Step 1: Add verification profiles to methodology or workflow**

Add a concise section that maps P0 through P4 to automation roles and states that workflow-trigger changes are a separate measured follow-up.

- [ ] **Step 2: Correct Vercel spend monitor cadence**

Change the stale quarter-hour cadence text to hourly, matching `.github/workflows/vercel-spend-monitor.yml`.

- [ ] **Step 3: Static inspect the changed sections**

Run: `rg -n "Verification profiles|polls Vercel metrics hourly|P0|P4" docs/automation-playbook.md`
Expected: profile guidance exists, hourly cadence exists, and no stale quarter-hour cadence text remains.

## Task 4: Verify and Review

**Files:**
- Read/review: `AGENTS.md`, `.github/pull_request_template.md`, `docs/automation-playbook.md`

- [ ] **Step 1: Run focused docs/content check**

Run: `bun run monitor:content -- --mode local --format markdown --fail-on-breach`
Expected: command exits 0.

- [ ] **Step 2: Run markdown/static searches**

Run: `rg -n "Verification profiles|P1 Tiny|P4 Autonomous|polls Vercel metrics hourly" AGENTS.md .github/pull_request_template.md docs/automation-playbook.md`
Expected: profile text appears in intended files; no stale quarter-hour cadence text remains.

- [ ] **Step 3: Diff review**

Run: `git diff --check && git diff --stat && git diff`
Expected: no whitespace errors; diff changes only docs/operator guidance and plan/spec docs.

- [ ] **Step 4: Commit implementation**

Run:

```bash
git add AGENTS.md .github/pull_request_template.md docs/automation-playbook.md docs/superpowers/plans/2026-06-10-verification-profiles.md
git commit -m "docs: add verification profiles"
```

Expected: one implementation commit after the design commit.
