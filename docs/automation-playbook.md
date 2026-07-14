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

## Verification profiles

Use profile-based gates so small work stays small without lowering assurance for production or security surfaces.

| Profile | Automation use | Required evidence |
| --- | --- | --- |
| P0 Planning/no mutation | Briefs, scouting, or explanation-only work. | No test/build claim; state that no verification was run. |
| P1 Tiny low-risk | Copy, typo, dead-link text, comments, or docs wording with no public-promise, route, schema, security, deploy, monitor, or generated-artifact effect. | Focused static inspection or one targeted command, plus why broader checks were not needed. |
| P2 Normal docs/code | Local docs, CLI, runtime, test, or hosted-copy changes with behavior impact but no production-control or security boundary change. | Closest surface check: focused test, docs build, CLI invocation, local smoke, or type check as applicable. |
| P3 Production/security/deploy/MCP/published | Public promises, MCP routes/tools/contracts, security headers, deployment packaging, monitor behavior, production smoke, or `published/current/**`. | Surface E2E or deploy dry-run plus the production evidence packet when production-facing behavior is implicated. |
| P4 Autonomous sync/deploy automation | Sync workers, scheduled monitors, merge/deploy automation, billing/spend controls, or autonomous workflow triggering. | Budget, guard verdict, stop/replan trigger, and ledger-style evidence note. Human approval is still required for billing, purchases, destructive actions, and final external publishing. |

Agents start with the smallest admissible profile and escalate when the touched surface or claim requires it. Workflow trigger changes, path filters, or monitor cadence/backoff changes should be separate measured PRs unless the current task is explicitly about automation behavior.

## Role map

| Role | Promise | May do | Must not do by default | Output artifact |
| --- | --- | --- | --- | --- |
| Dogfood/product scout | Act as one product user role and report friction. | Try docs, MCP, CLI, evaluator, deploy evidence, and onboarding flows. | Edit repo files, create PRs, open issues, comment, merge, or post externally. | Role/job report with evidence, friction, severity, and handoffs. |
| Discussion steward | Keep GitHub Discussions actionable. | Inspect discussions, issues, and PRs; dedupe signals; maintain a Top 3 work list. | Implement fixes or create noisy new threads by default. | Discussion change report and issue-conversion recommendation. |
| Implementation PR agent | Turn one ready item into a bounded PR. | Edit code/docs, validate, open or update one PR. | Self-merge or perform broad product scouting. | PR with source links, validation output, and residual risk. |
| PR review and merge captain | Keep PRs moving with independent judgment. | Review PRs, check CI/reviews/mergeability, comment on blockers, merge when policy is met. | Implement fixes or silently wait on blocked PRs. | Merge/no-merge decision with evidence. |
| FPF sync monitor | Keep fpf.sh self-sustaining against upstream FPF. | Compare upstream HEAD, hosted status, manifest provenance, runtime freshness, and drift SLO; trigger or retry guarded sync when upstream is ahead and no sync worker is active. | Bypass CI, merge a failed sync PR, or publish unproven source/ref pairs. | Monitor run summary and sync workflow trigger. |
| Vercel MCP operator | Gather Vercel control-plane evidence for the split website and MCP deployments. | Use Vercel MCP to inspect projects, deployments, build logs, runtime logs, protected preview fetches, and Vercel docs. | Deploy, promote, alias, rollback, buy domains, change billing, or create durable access without explicit approval. | Deployment/log evidence packet with project, URL, status, and caveats. |
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
| Vercel MCP access | Vercel MCP operator, PR review/merge captain, FPF sync monitor, Vercel spend monitor | Read-first evidence gathering; mutating tools require human confirmation and role-specific approval. |
| External publishing accounts | Growth and publishing scout | Draft-only unless the user explicitly approves a specific publish/send action. |
| Secrets, billing, deploy settings, destructive actions | User or explicitly delegated operator | Prepare instructions; do not perform final actions by default. |

For purchases, subscriptions, billing changes, account changes, or external publishing, the automation may prepare the flow and draft the copy. The user performs or explicitly approves the final action.

## Vercel MCP Evidence Loop

Vercel MCP is the Vercel control-plane server at `https://mcp.vercel.com`; FPF Reference MCP is this product's public lookup server at `https://mcp.fpf.sh/api/mcp/fpf_reference/mcp`. Keep those roles separate in prompts and evidence packets.

Use Vercel MCP when a run needs current Vercel project/deployment facts that are awkward to prove from local files alone:

- `fpf-reference-mcp` deployment status, build logs, runtime logs, and protected preview access;
- `fpf-sh` deployment status and preview rendering access;
- Vercel documentation lookup for changed platform behavior.

Default prompt boundary:

```text
Use the Vercel MCP server named vercel for read-only deployment evidence. Inspect the relevant project, deployment, build logs, runtime logs, and protected preview URL if needed. Do not deploy, promote, alias, rollback, buy domains, or change settings unless the user explicitly approves that action.
```

For project-scoped operations, use the project-specific URLs documented in the operator packaging section on the MCP origin so the team/project context is explicit.

## Operational CLI Workflows

This section adopts the composition pattern from Vercel's [CLI workflows for agents](https://vercel.com/docs/agent-resources/workflows): a workflow is a complete command sequence with the reasoning between steps, not a pile of isolated commands. Agents and operators should follow a workflow end to end instead of improvising command order, and should reuse these sequences as templates for novel situations.

Shared rules:

- Read before write. Inspection commands are always admissible; mutating Vercel actions (deploy, promote, alias, rollback) stay behind the access table above and require the role-specific approval it defines.
- Every workflow ends with evidence. Production-affecting workflows end with the production evidence packet.
- Commands run from the repo root. Direct `vercel` CLI calls use the pinned version and team scope the repo scripts use (`npx --yes vercel@54.7.1 ... --scope "$FPF_VERCEL_SCOPE"`).
- Prefer the guarded repo scripts over hand-rolled `vercel` invocations: the scripts bundle validation, staged deploys, smoke, aliasing, and automatic rollback that a bare CLI call skips.

| Workflow | Use when | Typical role | Minimum profile |
| --- | --- | --- | --- |
| Deploy both production surfaces | Publishing a validated change to `fpf.sh` and `mcp.fpf.sh` | Explicitly delegated operator | P3 |
| Debug hosted MCP production errors | `mcp.fpf.sh` returns 5xx, protocol errors, or degraded status | Vercel MCP operator | P0 (read) → P3 (fix) |
| Roll back a bad production deployment | Production is broken now and the fix is not immediate | Explicitly delegated operator | P3 |
| Investigate a spend breach | Spend monitor reports a breach or opens an issue | Vercel spend monitor / operator | P0 (read) → P4 (guardrail change) |
| Diagnose stale published content | Drift SLO alarm, or hosted content looks behind upstream FPF | FPF sync monitor | P0 (read) → P4 (sync trigger) |

### Deploy both production surfaces from the CLI

1. `bun run deploy:validate` — proves the committed `published/current/**` surface is coherent and the local content-quality gate passes before anything is built. Failing here is cheap; failing after an alias move is not.
2. `bun run deploy:prod` — the guarded end-to-end path. It builds both surfaces, records the previous production and canonical-domain deployments as rollback targets, ships a staged production deployment per project, then promotes and explicitly aliases `fpf.sh` and `mcp.fpf.sh`, and only then runs the sync, content, and production smoke checks against the canonical domains. The guard is automatic rollback, not a pre-promotion gate: if any post-alias check fails, the script restores the previous project production deployment and re-aliases the previous canonical deployment. Approval and evidence must account for the short exposure window between aliasing and a failed check.
3. `bun run smoke:production` and `bun run bench:mcp:qa -- --name mcp-production --url https://mcp.fpf.sh/api/mcp/fpf_reference/mcp --format markdown` — independent post-alias verification that the canonical domains serve the new behavior, not just that a deployment exists.
4. Fill the production evidence packet: deployment URLs, alias targets, rollback target, smoke/QA output excerpts.

Per-surface deploys (`bun run vercel:website:deploy:prod`, `bun run vercel:mcp:deploy:prod`) are **not** guarded the same way: they validate and build, but the deploy step is a bare prebuilt `vercel deploy --prod` with no recorded rollback targets, no post-alias checks, and no automatic rollback. Prefer `bun run deploy:prod` even when only one surface changed. If a per-surface deploy is unavoidable, record the current production and canonical-domain deployments first, run step 3 immediately after, and be ready to execute the rollback workflow below by hand.

### Debug hosted MCP production errors

1. `curl -sS -w '\nhttp_status=%{http_code}\n' https://mcp.fpf.sh/api/fpf/status` — classify first, with the HTTP status printed explicitly. A `200` with `status: ok` and consistent hashes points at a route- or tool-level fault; a non-`200` or inconsistent runtime points at the deployment itself.
2. `npx --yes vercel@54.7.1 inspect mcp.fpf.sh --scope "$FPF_VERCEL_SCOPE"` — confirm which deployment actually serves the canonical domain before reading any logs, so the investigation targets the right build.
3. Read runtime and build logs for that deployment — via the Vercel MCP evidence loop above (read-only) or `npx --yes vercel@54.7.1 logs <deployment-url> --scope "$FPF_VERCEL_SCOPE"` — to find the failing route and error shape.
4. Reproduce locally: `bun run start` plus the failing JSON-RPC call, or `bun run bench:mcp:qa` pointed at the failing surface. A fault that does not reproduce locally usually implicates packaging, so compare with `bun run vercel:mcp:build` output next.
5. Fix, then ship a preview with `bun run vercel:mcp:deploy` and verify the failing call against the preview URL before touching production.
6. Publish through the deploy workflow above and close with the evidence packet, including the original failing output and the passing rerun.

### Roll back a bad production deployment

Rollback is a mutating action: it needs explicit operator approval per the access table.

1. Identify the last good deployment: `npx --yes vercel@54.7.1 ls fpf-reference-mcp --environment production --status READY --scope "$FPF_VERCEL_SCOPE"` (or `fpf-sh`), cross-checked against the rollback target recorded in the deploy evidence packet. The environment and status filters match how `deploy:prod` records rollback targets; without them, previews, failed builds, or in-progress deployments can masquerade as the "last good" candidate.
2. Restore the project production target: `npx --yes vercel@54.7.1 promote <last-good-deployment-url> --yes --local-config vercel.mcp.json --scope "$FPF_VERCEL_SCOPE"` (website: `vercel.json`) — this mirrors the automatic rollback in `deploy:prod`, which restores project production first so the bad deployment does not stay the project's production target and become the next recorded rollback target.
3. Restore the canonical domain: `npx --yes vercel@54.7.1 alias set <last-good-deployment-url> mcp.fpf.sh --scope "$FPF_VERCEL_SCOPE"` (or `fpf.sh`) — canonical domains are aliased explicitly in this repo, so users are back on the known-good deployment only once the alias moves.
4. `bun run smoke:production` — prove the rollback restored user-visible behavior; do not stop at the CLI reporting success.
5. Record the evidence packet with the restored deployment URL, the bad deployment URL kept as an audit record, and the follow-up fix owner.

### Investigate a spend or function-duration breach

1. `bun run monitor:vercel:spend` — rerun the guardrail first. It distinguishes `breach`, `config_error`, `metrics_unavailable`, and `expected_blocked_traffic`. The first three all require operator action — the monitor marks them operator-action-required and exits nonzero under `--fail-on-breach`. A `config_error` (missing token) or `metrics_unavailable` window means the guardrail itself is blind and must be repaired, not ignored. Only blocked legacy-route traffic is benign: it is expected, not a spend problem.
2. For a breach, read runtime logs for the breach window (Vercel MCP evidence loop) to attribute the spend to a route and caller pattern.
3. Check the bundle and route shape locally: `bun run bench:vercel:function-size` after `bun run vercel:mcp:build`, since function-duration spikes often follow packaging regressions.
4. Land the guardrail or fix as its own measured PR (P4 surface), and let the monitor close its issue after a clean window rather than closing it by hand.

### Diagnose stale published content

1. `bun run monitor:sync` — compares upstream FPF HEAD with hosted status and reports drift hours against the SLO. It does not check worker state: verify separately that no sync worker is active with `gh run list --workflow sync-fpf.yml`, treating `queued`, `in_progress`, `waiting`, `pending`, or `requested` runs as active — the same check the scheduled monitor performs before dispatching.
2. `bun run monitor:content -- --mode live --format markdown` — checks that curated pages and generated route pages on production still cohere with the published snapshot, separating "site is up" from "site is current".
3. If upstream is ahead and no sync worker is active, trigger `sync-fpf.yml` (dispatch or manual run) instead of hand-publishing; the worker owns validation, preview, and the publication PR.
4. Evidence: drift hours, the upstream/hosted source-hash pair, and the triggered workflow run URL.

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

### Production evidence packet template

Use this packet for production-affecting PRs, deploys, incident fixes, and manager briefs. It is intentionally stricter than "HTTP 200" or "status: ok" evidence: it separates availability, semantic correctness, freshness/currentness, route naming, live behavior, and cost/risk guardrails.

Do not include raw user questions, prompts, answer text, selectors, markdown bodies, session IDs, IPs, or user identifiers.

```md
## Production evidence packet

### Promise checked

### URLs checked

### Commands run

### Expected semantic invariants

- HTTP availability:
- semantic correctness:
- freshness/currentness:
- route naming:
- live behavior:
- cost/risk guardrails:

### Actual output excerpt

### Upstream ref / source hash

### Deployment URL / alias checked

### Rollback target

### Known caveats

### What would falsify this success claim?
```

## fpf.sh Sync QA and Monitoring

The production sync loop uses FPF as a quality model:

- `B.5.1` keeps the worker and monitor separate: `sync-fpf.yml` operates the publication PR; `fpf-sync-monitor.yml` observes production state and triggers recovery.
- `A.10` and `G.6` define the evidence: upstream SHA, upstream commit date, manifest `upstreamRef`, source hash, hosted runtime freshness, CI run URL, Vercel preview, and Playwright preview.
- `B.3`, `E.19`, and `E.21` define gates and characteristics: source/ref coherence, runtime freshness, recoverability, traceability, and max drift are checked separately.

Operational defaults:

- `sync-fpf.yml` accepts `fpf-origin-updated` and `fpf-sync-updated` dispatches or manual runs, closes superseded sync PRs, opens a current PR, runs validation/build/preview, then auto-merges only after the review window and required evidence pass.
- `fpf-sync-monitor.yml` polls hourly, runs `bun run monitor:sync`, triggers `sync-fpf.yml` when upstream is ahead and no sync worker is queued or running, and fails the monitor if `mcp.fpf.sh` exceeds the drift SLO or the hosted runtime is stale. If a current generated PR already exists, the dispatch is a retry path for CI and merge eligibility rather than a duplicate PR path.
- The default drift SLO is 10 hours: hourly detection plus a 2-hour review window plus operational margin.
- `vercel-spend-monitor.yml` polls Vercel metrics hourly with `bun run monitor:vercel:spend`, failing when Function Duration exceeds the configured GB-hour window, the legacy MCP route reaches Functions again, Vercel reports unexpected function error-code rows, credentials are missing, or metrics are unavailable. It reports expected blocked legacy traffic separately so operators do not treat blocked traffic as a spend breach. It prefers the repo secret `VERCEL_SPEND_MONITOR_TOKEN` and falls back to `VERCEL_TOKEN`.

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
MCP setup: https://fpf.sh/connect-mcp

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
- MCP setup: https://fpf.sh/connect-mcp
- Hosted endpoint: https://mcp.fpf.sh/api/mcp/fpf_reference/mcp
- Legacy endpoint during transition: https://mcp.fpf.sh/api/mcp/fpf_memory/mcp (retired: Vercel routing answers HTTP 410 Gone with a successor-version link)

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
