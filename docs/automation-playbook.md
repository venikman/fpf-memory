---
title: "Automation Playbook"
description: "Operating model for FPF Reference automation roles, evidence, access, and publishing drafts."
outline: deep
---

# Automation Playbook

Use this page when you want agentic help around FPF Reference without collapsing every job into one agent.

## What this page is

This is the public operating model for FPF Reference automation. It explains the roles, what each role may do, what evidence it should produce, and where user approval is required.

It is not a list of private automation records, thread IDs, local paths, account credentials, or personal scheduling details.

## Methodology

Keep role, capability, promise, work, and evidence separate.

- Role: what stance the automation takes.
- Capability: what the automation can technically inspect or change.
- Promise: what the automation is expected to provide.
- Work: what an actual run did.
- Evidence: URLs, commands, PRs, discussions, checks, screenshots, or logs that prove the work.

The main safety rule is simple: discovery roles stay read-only, implementation roles make PRs, and merge or publishing authority stays explicit.

## Role map

| Role | Promise | May do | Must not do by default | Output artifact |
| --- | --- | --- | --- | --- |
| Dogfood/product scout | Act as one product user role and report friction. | Try docs, MCP, CLI, evaluator, deploy evidence, and onboarding flows. | Edit repo files, create PRs, open issues, comment, merge, or post externally. | Role/job report with evidence, friction, severity, and handoffs. |
| Discussion steward | Keep GitHub Discussions actionable. | Inspect discussions, issues, and PRs; dedupe signals; maintain a Top 3 work list. | Implement fixes or create noisy new threads by default. | Discussion change report and issue-conversion recommendation. |
| Implementation PR agent | Turn one ready item into a bounded PR. | Edit code/docs, validate, open or update one PR. | Self-merge or perform broad product scouting. | PR with source links, validation output, and residual risk. |
| PR review and merge captain | Keep PRs moving with independent judgment. | Review PRs, check CI/reviews/mergeability, comment on blockers, merge when policy is met. | Implement fixes or silently wait on blocked PRs. | Merge/no-merge decision with evidence. |
| FPF sync monitor | Keep fpf.sh self-sustaining against upstream FPF. | Compare upstream HEAD, hosted status, manifest provenance, runtime freshness, and drift SLO; trigger or retry guarded sync when upstream is ahead and no sync worker is active. | Bypass CI, merge a failed sync PR, or publish unproven source/ref pairs. | Monitor run summary and sync workflow trigger. |
| Vercel spend monitor | Detect hosted cost spikes before they repeat. | Poll Vercel metrics for Function Duration GB-hours, legacy MCP route function invocations, and function error-code rows; distinguish breach, config error, unavailable metrics, and expected blocked traffic; update one issue when operator action is required and close it after a clean run. | Change billing settings, buy services, or remove compatibility routes without explicit approval. | Monitor run summary and GitHub issue state. |
| Manager brief | Compress automation state for the user. | Read automation memory, repo state, PRs, discussions, docs, and hosted MCP health. | Replace the specialist roles or make external commitments. | Product readiness, changed, validated, Top 3 next actions, decisions needed. |
| Technical architect | Make periodic system-level judgment. | Review MCP server, index/runtime, docs/adoption UX, CLI, evaluator, packaging/deploy, CI, and automation health. | Create implementation work unless explicitly asked. | Architecture state, risks, recommendations, handoffs, and stop/replan triggers. |
| Growth and publishing scout | Turn validated evidence into draft public material. | Draft Medium/Substack posts, short social posts, README/forum blurbs, and outreach notes. | Publish, email, DM, post, or log into external accounts without explicit approval. | Share packet with audience, proof points, caveats, links, and call to action. |

## Workflow

```txt
Dogfood/product scout
  -> friction evidence
Discussion steward
  -> ready work item
Implementation PR agent
  -> validated PR
PR review and merge captain
  -> merge or blocker
FPF sync monitor
  -> sync trigger or SLO breach evidence
Manager brief

Technical architect
  -> system risks and decisions
Manager brief

Dogfood/product scout
  -> validated proof points
Growth and publishing scout
  -> draft share packet
Manager brief
```

## Access and authority

| Capability | Needed by | Default |
| --- | --- | --- |
| Local repo and public product read access | All roles | Allowed for evidence gathering. |
| GitHub read access | All roles that inspect discussions, issues, PRs, and CI | Allowed for evidence gathering. |
| GitHub write access | Implementation PR agent and PR review/merge captain | Allowed only within their role boundaries. |
| External publishing accounts | Growth and publishing scout | Draft-only unless the user explicitly approves a specific publish/send action. |
| Secrets, billing, deploy settings, destructive actions | User or explicitly delegated operator | Prepare instructions; do not perform final actions by default. |

For purchases, subscriptions, billing changes, account changes, or external publishing, the automation may prepare the flow and draft the copy. The user performs or explicitly approves the final action.

## Merge policy

Implementation and merge authority are separate.

A PR may be merged by the review/merge role only when:

- required CI and branch-protection checks are green;
- the PR is not draft and is mergeable;
- there is no unresolved blocking review or requested change on the current head;
- validation evidence is sufficient for the changed surface;
- the PR has independent approval for the current head.

If any condition is missing, the role should report the exact blocker rather than waiting silently.

## Executive Production Checklist

Use this checklist before declaring FPF Reference production healthy, after a deploy, after an incident fix, and in any manager brief.

Done means each claim has current evidence. Do not treat a green local build, a successful deploy, or a healthy API endpoint as enough by itself.

1. **User-visible surfaces**
   - `https://fpf.sh/` returns `200` and renders the FPF Reference site.
   - `https://mcp.fpf.sh/` returns `200` and renders the FPF Reference MCP connection page.
   - `https://mcp.fpf.sh/connect-mcp` returns `200` and shows the canonical `fpf_reference` endpoint.

2. **MCP protocol surface**
   - `https://mcp.fpf.sh/api/fpf/status` returns `200` with `status: ok`.
   - `GET https://mcp.fpf.sh/api/mcp/fpf_reference/mcp` returns `405` with the JSON-RPC disabled payload, not a Vercel `404`.
   - JSON-RPC initialize and one tool call succeed against `https://mcp.fpf.sh/api/mcp/fpf_reference/mcp`.
   - The public tool list is limited to the intended public tools.

3. **Publication freshness**
   - Hosted status `publication.sourceHash`, `runtime.sourceHash`, and `runtime.currentSourceHash` match.
   - Hosted status reports `runtime.snapshotConsistent: true` and `freshness.freshnessBasis: source_hash_match`.
   - Treat `freshness.upstreamCurrentness: unknown` as expected until an external monitor compares the hosted publication to the intended upstream/current artifact.
   - The upstream ref in hosted status matches the committed `published/current/manifest.json` for the release being claimed.

4. **Deployment ownership**
   - `vercel inspect fpf.sh` points to the `fpf-sh` production deployment.
   - `vercel inspect mcp.fpf.sh` points to the `fpf-reference-mcp` production deployment.
   - Canonical domains are explicitly aliased after deploy; project production promotion alone is not treated as proof.

5. **Route shape**
   - Website output remains static-only and has no MCP function routes.
   - MCP output routes `/`, `/connect-mcp`, `/api/fpf/status`, and the canonical MCP JSON-RPC path through the MCP function.
   - Legacy compatibility routes are either blocked intentionally or documented with a current mitigation reason.

6. **Quality gates**
   - The closest focused tests for the changed surface pass.
   - `bun run check` passes for code changes.
   - The closest deploy or build command for the changed surface passes.
   - GitHub PR checks are green before the fix is treated as merged product state.

7. **Cost and risk controls**
   - MCP function bundle size remains within the configured threshold.
   - Vercel spend monitor has no current function-duration, legacy-route, or error-code breach.
   - The rollback target is known before production alias changes.

8. **Evidence packet**
   - Record exact commands, URLs, status codes, deployment URL, PR URL, and merge commit.
   - Separate ability from performance: what the system can do, what was actually observed, and what remains unproven.
   - State residual uncertainty explicitly, especially when relying on cached responses, local DNS, or pending external checks.

## fpf.sh Sync QA and Monitoring

The production sync loop uses FPF as a quality model:

- `B.5.1` keeps the worker and monitor separate: `sync-fpf.yml` operates the publication PR; `fpf-sync-monitor.yml` observes production state and triggers recovery.
- `A.10` and `G.6` define the evidence: upstream SHA, upstream commit date, manifest `upstreamRef`, source hash, hosted runtime freshness, CI run URL, Vercel preview, and Playwright preview.
- `B.3`, `E.19`, and `E.21` define gates and characteristics: source/ref coherence, runtime freshness, recoverability, traceability, and max drift are checked separately.

Operational defaults:

- `sync-fpf.yml` accepts `fpf-origin-updated` and `fpf-sync-updated` dispatches or manual runs, closes superseded sync PRs, opens a current PR, runs validation/build/preview, then auto-merges only after the review window and required evidence pass.
- `fpf-sync-monitor.yml` polls hourly, runs `bun run monitor:sync`, triggers `sync-fpf.yml` when upstream is ahead and no sync worker is queued or running, and fails the monitor if `mcp.fpf.sh` exceeds the drift SLO or the hosted runtime is stale. If a current generated PR already exists, the dispatch is a retry path for CI and merge eligibility rather than a duplicate PR path.
- The default drift SLO is 10 hours: hourly detection plus a 2-hour review window plus operational margin.
- `vercel-spend-monitor.yml` polls Vercel metrics every 15 minutes with `bun run monitor:vercel:spend`, failing when Function Duration exceeds the configured GB-hour window, the legacy MCP route reaches Functions again, Vercel reports unexpected function error-code rows, credentials are missing, or metrics are unavailable. It reports expected blocked legacy traffic separately so operators do not treat blocked traffic as a spend breach. It prefers the repo secret `VERCEL_SPEND_MONITOR_TOKEN` and falls back to `VERCEL_TOKEN`.

## Publishing and outreach packets

Off-GitHub publishing is prepared as a draft packet. The packet should include:

- channel and audience;
- promise being made;
- product ability that supports the promise;
- observed performance or evidence;
- caveat that should stay visible;
- canonical links;
- suggested call to action;
- approval needed before sending or publishing.

### Medium or Substack draft packet

```txt
Channel: Medium or Substack
Audience: agent-tool builders and technical leads who keep pasting large framework specs into coding chats

Working title:
Stop pasting the whole spec: using FPF Reference as bounded FPF context for agents

Hook:
FPF work needs exact IDs, routes, and evidence, but a whole-spec dump is the wrong interface for daily agent work.

Claim:
FPF Reference turns the published FPF spec into deterministic lookup surfaces: MCP tools, CLI queries, and generated docs.

Proof points:
- compiler-backed vectorless index;
- hosted MCP endpoint;
- generated docs and work packets;
- deterministic retrieval first.

Caveat:
Do not claim broad adoption or benchmark superiority unless current evidence supports it.

Call to action:
Try one bounded FPF query through MCP before putting the whole specification into a prompt.
```

### Short social post packet

```txt
Channel: LinkedIn, X, Mastodon, or another short-form surface

Draft:
Built a small MCP-oriented runtime for FPF.

FPF Reference compiles the published FPF spec into deterministic lookup surfaces so agents can ask for exact routes, IDs, docs, and bounded context instead of loading the whole spec.

Useful for PR review, project alignment, spec writing, and adoption UX checks.

Docs: https://fpf.sh/
Connect MCP: https://fpf.sh/connect-mcp

Caveat: deterministic retrieval is the source of truth; request counts are not unique users.
```

### One-to-one outreach packet

```txt
Recipient type:
Someone building MCP tools, coding agents, or structured reasoning workflows.

Subject:
Short FPF/MCP artifact I wanted to share

Draft:
Hi <name>,

I have a compact artifact that may be relevant to your agent/MCP work.

FPF Reference is a compiler-backed runtime for the published First Principles Framework spec. The basic idea is to avoid pasting the whole framework into agents. Instead, the agent can retrieve exact FPF routes, IDs, generated docs, and bounded context through MCP or CLI.

The current material:
- Website: https://fpf.sh/
- Connect MCP: https://fpf.sh/connect-mcp
- Hosted endpoint: https://mcp.fpf.sh/api/mcp/fpf_reference/mcp
- Legacy endpoint during transition: https://mcp.fpf.sh/api/mcp/fpf_memory/mcp (blocked at Vercel routing during May 2026 cost incident mitigation)

The claim I am comfortable making right now is narrow: it is useful for bounded FPF lookup and agent workflows that need evidence-backed framework context. I am not claiming broad adoption or benchmark superiority yet.

If you are open to it, I would value a quick critique of the MCP onboarding path.
```

## Approval checklist

Before anything leaves GitHub or a local draft:

- The channel is named.
- The audience is named.
- The claim is backed by current evidence.
- The caveat is visible.
- The user has approved the exact copy or the exact destination.
- No private repo, account, credential, thread, or local-machine detail is included.

## Done condition

The automation system is healthy when each role can answer:

- what it inspected;
- what it changed, if anything;
- what evidence supports the result;
- what it cannot do without approval;
- who owns the next action.
