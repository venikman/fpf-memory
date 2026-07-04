# FPF Reference Maintenance Strategy

**Status:** proposed operating strategy · **Author cadence assumption:** steward present ≈ every
2–4 weeks · **Last reviewed:** 2026-07-04

## Purpose

FPF Reference has one hard problem that is not a code problem: **it must stay trustworthy while
its steward is away.** People and agents will only rely on `mcp.fpf.sh` if they believe it is
current, up, correct, and navigable *today* — not "whenever the maintainer next opens the repo."

This document is the strategy for making that true with an intermittent human. It sits above the
[Automation Playbook](../docs/automation-playbook.md) (which says *who may do what*) and answers
*how the system survives between visits, what it does on its own, and what the return session
looks like.*

It is grounded in FPF's own patterns, the same ones the sync loop already cites:

- **B.5.1** — separate *operating* a system from *changing* it. Monitors observe production;
  workers change it. Never collapse them.
- **A.10 / G.6** — an *evidence graph*: SHA, source hash, manifest ref, runtime freshness, check
  URLs. "Green" is never one signal.
- **B.3 / E.19 / E.21** — separate quality *characteristics* (freshness, availability,
  correctness, cost, recoverability) with separate gates. Do not average them into one number.

## The four promises

"Maintained" decomposes into four promises the user named — *current, available, accessible,
drivable.* Each has a mechanism that keeps it true and a monitor that proves it. The strategy is
to make each promise **self-evidencing**: a promise with no monitor is a rumor.

| Promise | Means | Kept by (mechanism) | Proven by (monitor) |
| --- | --- | --- | --- |
| **Current** | Production tracks upstream `ailev/FPF` within the drift SLO | `sync-fpf.yml` worker: download → publish → validate → build → PR → auto-merge → deploy | `fpf-sync-monitor.yml` (hourly), hosted `/api/fpf/status`, manual upstream-HEAD compare |
| **Available** | `fpf.sh` and `mcp.fpf.sh` return and serve | Static site + serverless MCP on Vercel; emergency `FPF_HOSTED_MCP_DISABLED` shutoff | `smoke:production`, executive production checklist, `vercel-spend-monitor.yml` |
| **Accessible** | An agent/human can get one grounded, cited answer fast | Three-surface split: MCP tools + CLI + generated docs; `src/core/public-copy.ts` SSOT for adoption copy | `bench:mcp:qa`, `fpf-content-quality.yml`, `preview-e2e.yml` |
| **Drivable** | You can *navigate* the framework, not just read it | Compiled typed graph: routes (ordered entry paths), relations, lexicon; frontier retrieval | `usage:report` triage findings; see [`index-vs-ontology.md`](./index-vs-ontology.md) |

The fourth promise — *drivable* — is where the user's "ontology as the key" question lands. It has
its own memo; the short version is that drivability is *graph navigability*, and the graph already
exists.

## The autonomy ladder

The core design rule: **maximize what the system does safely on its own; minimize and batch what
needs the human; make every unattended stretch survivable and self-diagnosing.** Sort every
maintenance action into one of three tiers.

### Tier 0 — Autonomous, self-healing (no human, ever)

Runs on schedule, recovers itself, opens/closes its own issues.

- Upstream change detection and the publication PR (`sync-fpf.yml` on dispatch or manual).
- Drift detection + re-dispatch when a PR exists but no worker is queued (`fpf-sync-monitor.yml`,
  hourly).
- Spend guardrail: opens *one* issue on breach, closes it after a clean window
  (`vercel-spend-monitor.yml`, every 15 min).
- Content-quality live checks (`fpf-content-quality.yml`).
- All CI gates on every PR (`ci.yml`, `preview-e2e.yml`).

### Tier 1 — Autonomous behind a gate (auto-acts *only* after evidence passes)

- Sync PR **auto-merge** after the review window + required checks.
- Website + MCP **production deploy** after merge, through the repo CLI scripts.

These are the highest-trust, highest-risk automations. They are also the ones most likely to be
the *silent* failure point (see the live snapshot below): a gate that never fires looks identical
to "nothing to do."

### Tier 2 — Human-required (batched into the return session)

Never autonomous. Prepared by agents, decided by the steward:

- Merging non-sync PRs that touch MCP contracts, routes, security headers, or `published/current/**`.
- Vercel alias/promotion flips, deployment **deletion/cleanup**, billing, domains.
- External publishing (Medium/social/outreach).
- Secret/token rotation.
- Strategic direction changes (e.g. adopting the ontology plan).

The strategy's job is to keep Tier 2 **small and batchable** so a 20–30 minute visit clears it.

## Live health snapshot (2026-07-04)

This is what a return session looks like when run today. It is also a real, open finding.

| Signal | Reading | Verdict |
| --- | --- | --- |
| Upstream `ailev/FPF` HEAD (`FPF-Spec.md`) | `f7c7e93`, 2026-07-03 | reference point |
| Hosted MCP publication (`/api/fpf/status`) | `093d30e8`, published 2026-06-08 | **~26 days stale** |
| Runtime internal consistency | `snapshotConsistent: true`, hashes match, `freshnessBasis: source_hash_match` | ✅ internally coherent |
| `freshness.upstreamCurrentness` | `unknown` (by design on this endpoint) | ⚠️ only an external monitor proves currentness |
| Sync pipeline activity | PRs observed through ~2026-06-21 (PR 227); nothing since | ⚠️ loop appears stalled |
| Open PRs / issues | none | — |

**Interpretation.** Production is *healthy but frozen*: it serves a coherent, cited, ~4-week-old
spec. The Tier-1 "self-sustaining" loop is the failure point — either the monitor stopped
dispatching, the worker is failing silently, or the MCP deploy step is not firing (the website
saw sync PRs weeks after the MCP publication date, so the two surfaces have diverged). This is
exactly the class of failure the strategy targets: **a Tier-1 gate that stopped firing is
invisible until someone compares production to upstream by hand.** `upstreamCurrentness: unknown`
means the status endpoint *cannot* self-report this — the monitor is load-bearing, and right now
it is not producing an actioned signal.

**Immediate action (Tier 2, needs steward):** manually dispatch `sync-fpf.yml`, watch it through
merge + MCP deploy, and confirm `/api/fpf/status` advances to a July ref. Then diagnose *why* the
loop stalled (workflow disabled? token expired? monitor not failing on drift?) before trusting it
again. See [`vercel-operations.md`](./vercel-operations.md) for the deploy-path angle.

## The unattended survival window

How long does FPF Reference hold without a human, and what decays first?

- **Availability: months.** Static site + serverless functions on an existing deploy do not rot
  on their own. The spend guard protects the wallet. This promise is robust.
- **Freshness: days-to-weeks, then frozen.** As long as tokens and CI hold, the loop keeps
  production current automatically. When *any* link breaks (token expiry, upstream format change
  that breaks the compiler, a workflow silently disabled), freshness freezes at the last good
  publish — as it has now — and stays frozen until a human notices. **This is the weakest promise
  and the one to instrument hardest.**
- **Correctness/accessibility: stable while frozen.** A frozen-but-consistent snapshot still
  answers correctly *for its snapshot*. The risk is subtle: answers drift from *upstream truth*
  without any error surfacing.

**Design implication:** the highest-leverage maintenance investment is not more automation — it is
making the freshness monitor *impossible to ignore*. A drift breach must escalate somewhere the
absent steward actually sees it (a persistent open issue, and ideally a push/email), not just a
failed workflow run buried in the Actions tab.

## Health SLOs (the numbers)

| Characteristic | SLO | Source of truth |
| --- | --- | --- |
| Upstream drift | ≤ 10 h (hourly detection + 2 h review window + margin) | `fpf-sync-monitor.yml`, `FPF_SYNC_MONITOR_MAX_DRIFT_HOURS` |
| MCP availability | `/api/fpf/status` = `200 ok`; JSON-RPC init + one tool call succeed | `smoke:production`, executive checklist |
| Answer correctness | `bench:mcp:qa` gate passes on production endpoint | `bench:mcp:qa` |
| Function cost | Function Duration ≤ configured GB-hr window; legacy route invocations = 0 | `vercel-spend-monitor.yml` |
| Bundle size | MCP function within configured threshold | `bench:vercel:function-size` |
| Recoverability | A known rollback target exists before any alias flip | executive checklist §7 |

**Currently breached:** upstream drift (~26 days vs 10 h SLO). Everything else appears within SLO.

## The biweekly steward session (the return runbook)

This is the centerpiece. When you come back after ~2 weeks, run this ~20–30 minute loop. It is
ordered by *what fails silently first*.

1. **Freshness first (2 min).** Fetch `https://mcp.fpf.sh/api/fpf/status`. Compare
   `publication.upstreamRef`/`publishedAt` to `ailev/FPF` HEAD. If drift > SLO → the loop stalled;
   go fix it before anything else (dispatch `sync-fpf.yml`, watch to deploy, then diagnose root
   cause). *This step alone would have caught today's incident.*
2. **Monitors' verdicts (3 min).** Check the three monitors' recent runs and any open issues:
   sync-monitor, spend-monitor, content-quality. An open issue = an unresolved Tier-0/1 escalation.
3. **Availability (2 min).** `bun run smoke:production` (or hit the checklist URLs): both sites
   `200`, status `ok`, `GET` MCP path returns `405` (not `404`), one JSON-RPC tool call succeeds.
4. **Correctness (3 min).** `bun run bench:mcp:qa -- --name mcp-production --url https://mcp.fpf.sh/api/mcp/fpf_reference/mcp`
   — the Q&A gate is the closest thing to "is it still answering well."
5. **Content & retrieval signal (3 min).** `bun run usage:report` (source `vercel` if you have a
   token, else the committed report). Read `triageFindings` and `unknownUnresolvedRate`: a high
   unresolved rate is a *content/graph gap*, and it is the raw material for the ontology work.
6. **PR queue (3 min).** Any open PRs? Merge the safe ones, close superseded sync PRs, punt the
   rest with a note.
7. **Deployment hygiene glance (3 min).** Skim Vercel deployments; if the accumulation is past the
   retention policy, prune per [`vercel-operations.md`](./vercel-operations.md) (Tier 2).
8. **Decide Tier 2 (5 min).** Anything needing a human this cycle — alias flip, token rotation, a
   strategic call? Do it now or file it explicitly.
9. **Leave a trail (1 min).** Note the date, the drift reading, and any open Tier-2 items so the
   *next* session starts from evidence, not from scratch.

**Automation opportunity (recommended, additive):** most of steps 1–5 are already scripts. A
scheduled "steward digest" workflow could run them on a cadence and compile the results into a
single standing GitHub issue (updated in place, à la the spend monitor), so the return session
becomes "read one issue" instead of "run nine checks." This is the single highest-leverage new
automation for an intermittent maintainer, and it is low-risk (read-only, one issue). Proposed but
not built — it needs a decision on cadence and where the digest lands.

## Roles and ownership

The [Automation Playbook role map](../docs/automation-playbook.md#role-map) defines the specialist
roles (dogfood scout, discussion steward, implementation agent, review/merge captain, sync
monitor, Vercel operator, spend monitor, manager brief, architect, growth scout). This strategy
adds only the *cadence* on top:

- **Between visits:** Tier 0/1 automation runs; monitors escalate to open issues.
- **Each visit:** the steward runs the return runbook, clears Tier 2, and re-arms anything that
  stalled.
- **Manager-brief role** is the natural owner of the "steward digest" — it already compresses
  automation state; it should *produce* the digest, not wait to be asked.

## Durability risks and mitigations

The things that will actually break this over months:

| Risk | Symptom | Mitigation |
| --- | --- | --- |
| **Secret/token expiry** | Sync worker or deploy fails silently; freshness freezes | Keep a rotation calendar; make the digest assert token validity, not just workflow success |
| **Upstream format drift** | Compiler parses fewer nodes/edges; `build-audit` counts drop | Add a canary: fail the sync if compiled node/edge counts fall sharply vs the last good build |
| **Monitor that fails open** | Drift grows but no issue is opened (today's case) | Assert the monitor *itself* ran recently; alarm on monitor silence, not just monitor failure |
| **Dependency rot** | Build breaks on a fresh install months later | A scheduled `bun install && bun run check && bun run test` heartbeat |
| **Vercel plan/policy change** | Deploys or logs change behavior | Vercel operator role checks platform docs during the visit |

The common thread: **instrument absence.** A healthy automation and a dead one look the same from
the outside; the maintenance strategy's real product is the ability to tell them apart in five
minutes.

## Forward direction

- **Substrate (accessibility/drivability):** [`index-vs-ontology.md`](./index-vs-ontology.md) —
  promote the already-compiled typed graph to a first-class ontology surface; do **not** add RAG.
- **Operations:** [`vercel-operations.md`](./vercel-operations.md) — deployment retention,
  a validation (preview→promote) gate for MCP, and telemetry that survives log expiry.
- **Open decisions for the steward** are collected at the end of each of those two docs.
