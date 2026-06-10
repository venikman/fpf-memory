# Verification Profiles Design

## Objective

Reduce unnecessary local agent work and PR run amplification for small, low-risk changes without weakening security, production, MCP, deploy, or published-artifact assurance.

## Context

Current repo guidance requires the closest real end-to-end verification command for every non-trivial Codex implementation or review-fix task. That rule is directionally right, but it leaves "closest" underspecified for tiny work. Agents can over-escalate a two-line copy or link fix into broad local suites, repeated subagent review, and full evidence packets.

During design on 2026-06-10, a `gh run list` sample showed high workflow volume across CI, Preview E2E, hourly monitors, and sync/deploy automation. This spec changes the agent/operator rule first. It does not change workflow triggers in this PR.

## FPF Grounding

- `E.19` supports profile-based quality gates instead of one monolithic checklist.
- `A.2.3` keeps promise content separate from performed work and evidence; "security preserved" must remain an explicit promise judged by evidence.
- `A.21` supports operational gate profiles with explicit decisions.
- `C.24` supports call plans, tool-call budgets, stop or replan triggers, and checkpoint returns for agentic tool use.
- `E.16` supports autonomy budgets, guard verdicts, and work-anchored ledger entries for autonomous operation.

The attached FPF spec used during design had source hash `sha256:7b45ba487aa7b33aee51ad35462d0a700d05d351fef03dcb63998001af0a9afc`, matching the FPF Reference runtime source used during design.

## Design

### Verification Profiles

Agents should start with the smallest admissible profile and escalate only when the changed surface, claim, or evidence requirement demands it.

| Profile | Use when | Required evidence |
| --- | --- | --- |
| P0 Planning only | No repo mutation or no completion claim. | No test/build claim. State that no verification was run. |
| P1 Tiny low-risk | Copy, typo, dead-link text, comments, or docs wording that does not alter public promises, routes, schemas, security, deploy, monitors, or generated artifacts. | Focused static inspection or one targeted command. Record why broader checks were not needed. |
| P2 Normal docs/code | Docs, CLI, runtime, tests, or hosted copy changes with local behavior impact but no production-control or security boundary change. | Closest real surface check: focused test, `bun run docs:build`, CLI invocation, local smoke, or `bun run check` as applicable. |
| P3 Production/security/deploy/MCP/published | Public docs promises, MCP routes/tools/contracts, security headers, deployment packaging, monitor behavior, production smoke, or `published/current/**`. | Surface E2E or deploy dry-run plus evidence packet. Keep ability, promise, performed work, and residual uncertainty separate. |
| P4 Autonomous sync/deploy automation | Sync workers, scheduled monitors, merge/deploy automation, billing/spend controls, or any autonomous action path. | Budget, guard verdict, stop/replan trigger, and ledger-style evidence note. Human approval remains required for billing, purchases, destructive actions, and final external publication where applicable. |

### Agent Budget Norm

For low-risk P1 work, an agent should not spawn multiple review agents, run broad local suites, or wait through unrelated long-running jobs by default. Subagents are appropriate when tasks are independent and substantive, or when review independence materially reduces risk. A two-line docs fix should normally use one focused check and rely on CI for the full required gate.

### Escalation Triggers

Escalate immediately from P1/P2 to P3 when a change touches:

- public-facing promise wording, acceptance criteria, or setup instructions;
- MCP route shape, tool names, tool contracts, or transport semantics;
- Vercel build/deploy packaging, production smoke, aliases, domains, or preview behavior;
- security headers, privacy logging, auth, cost/spend controls, or compatibility routes;
- `published/current/**`, generated search IDs, sync automation, or monitor thresholds;
- workflow files, branch protection assumptions, merge automation, or deployment automation.

Escalate to P4 when an autonomous job can merge, deploy, trigger another workflow, mutate GitHub state, or consume external spend.

### Documentation Targets

Implement the rule where agents and PR authors already look:

- `AGENTS.md`: primary Codex/operator rule.
- `.github/pull_request_template.md`: validation section should ask for the selected profile and rationale.
- `docs/automation-playbook.md`: role and monitor guidance should use verification profiles, fix the stale Vercel spend-monitor cadence, and explain when workflow-trigger changes should be a separate PR.

## Alternatives Considered

1. Guidance-only profiles: lowest risk and preserves existing CI/security gates. This is the selected approach.
2. GitHub Actions path filters: stronger run reduction but can miss semantic public-doc changes. Defer until measured guidance does not reduce agent-side overwork enough.
3. Monitor cadence/backoff changes: could reduce scheduled run volume but risks weakening freshness/spend detection. Defer unless monitor evidence shows repeated low-value churn.

## Validation Plan

For this guidance-only PR:

- run a focused content/docs check if docs content changed;
- run `bun run check` if TypeScript, generated registry, or package scripts change;
- inspect the diff for accidental weakening of P3/P4 gates;
- state explicitly that workflow triggers were not changed.

## Done

- The repo defines profile-based verification guidance.
- Tiny low-risk PRs have a clear non-broad local verification route.
- Production/security/deploy/MCP/published changes still require stronger evidence.
- Agent/subagent usage is budgeted and case-by-case rather than reflexive.
- Stale playbook text about Vercel spend-monitor cadence is corrected.
