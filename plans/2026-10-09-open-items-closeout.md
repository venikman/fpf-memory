# October 9 open-item closeout

Date: 2026-10-09. Repository: `venikman/fpf-memory`. Released main inspected: `9503fbe18ff7a7e4bcffea4aa8c74e1e956149a0`.

## Objective and bounds

- Objective: reconcile the completed publication recovery, close the historical weekly review with evidence, and prepare the remaining credential and review decisions.
- Route: isolated documentation branch from released main; current GitHub/run evidence; bounded live sync/content/usage checks; existing weekly workflow on main with issue publication disabled; independent local review; exact-commit handoff.
- Budget: existing infrastructure and dependencies, one manual metrics run, one bounded local 60 s usage export, local docs builds and review. No new service or schedule.
- Guard: distinguish a successful workflow execution from its report verdict; preserve unresolved credential findings; require independent release authority for publication of new commits.
- Stop/replan: failed live health gate, unreviewed candidate, unavailable supported reviewer, credential handoff, or a requested action outside existing authority. A local clean review is advisory, not Your dot approval.

## Disposition

| Item | Performed work / present status | Remaining action |
| --- | --- | --- |
| Recovery record | Corrected the obsolete “release pending” status in the [recovery packet](2026-10-09-publication-recovery-evidence.md), using merged PR #347 and actual production/monitor runs | Publish this documentation correction only after an exact-commit independent decision |
| [Weekly metrics #346](https://github.com/venikman/fpf-memory/issues/346) | Closed as reviewed on October 9; original W40 figures preserved, recovered findings reconciled, credential work linked to #304 | None for that historical review; subsequent scheduled reports remain authoritative for their own windows |
| [Credentials #304](https://github.com/venikman/fpf-memory/issues/304) | Updated with the fresh CI ledger and exact rotation/retirement dependencies; remains open | User credential handoff, then per-credential capability and CI verification |
| [Retrieval PR #309](https://github.com/venikman/fpf-memory/pull/309) | Existing experiment assessed; documentation corrections prepared separately against its actual head | Independent decision on publishing the correction and retaining the experiment as an archive; current CI/preview before any merge |
| Your dot | Supported tool/thread discovery found no verified recipient or callable handoff endpoint | User relay through the documented Dot conversation, with the final exact-commit packet and an actual returned decision |
| Expanded FPF Library | [Proposal](2026-10-09-new-fpf-materials-proposal.md) remains separate from recovery and cleanup | A separate implementation/release decision; no Library delivery claim is made here |

## Current operational evidence

The [main-branch weekly workflow](https://github.com/venikman/fpf-memory/actions/runs/37923186748) ran at `9503fbe18ff7a7e4bcffea4aa8c74e1e956149a0` with `window=7d`, `publish=false` and completed successfully at `2026-10-09T11:22:11Z`. The issue-publication step was skipped. The existing idempotent Web Analytics enablement step ran; this was not a strictly read-only workflow.

Relevant output excerpts:

```text
Usage State: ok
Credential source: VERCEL_SPEND_MONITOR_TOKEN
Valid events: 50
Invalid events: 0
Operator action required: no

Weekly State: attention
freshness ok (drift 0h vs 26h SLO)
tokens 1/3 ok; 2 findings need review
VERCEL_TOKEN: invalid (HTTP 403)
VERCEL_SPEND_MONITOR_TOKEN: ok
FPF_USAGE_REPORT_VERCEL_TOKEN: invalid (HTTP 403)
```

The usage sample covers `2026-10-08T11:21:52.068Z`–`2026-10-09T11:21:52.068Z`. It includes automated probes, is limited by retained logs, and is not a count of unique users. HTTP 403 establishes an invalid metadata probe, not whether a token expired, was revoked, or lacks authorization. The successful selected fallback does not validate the other credentials.

Fresh local commands on October 9 also exited 0:

| Command | Bounded result |
| --- | --- |
| `bun run monitor:sync -- --format markdown --fail-on-breach` | `ok`; hosted publication matches upstream `0c6ade275e9360f0c5ab9715d8f05c0dbaa13cf8` |
| `bun run monitor:content -- --mode live --format markdown --fail-on-breach` | `ok`; 3/3 route pages, 20/20 content refs, 14/14 pattern links and six curated pages; website/MCP/raw-upstream hash agrees |
| `bun run usage:report -- --source vercel --use-cli-auth --scope venikmans-projects --window 24h --vercel-timeout-ms 60000 --format markdown --no-write --fail-on-quality-breach` | `ok`; 50 valid, 0 invalid, 0 tool errors, no operator action; separate local CLI-auth evidence, not a CI-secret probe |

The coherent source SHA-256 is `70ff53030f9d445c8109773a39e6579ba87e1ac94ab6eda931d429f72a51d703`. The existing [guarded release](https://github.com/venikman/fpf-memory/actions/runs/37919050374) supplies 29 semantic production checks; PR #347 records the independent 8/8 MCP QA. These were not rerun during this documentation closeout.

## Credential action prepared

Recommend rotating `VERCEL_TOKEN` and `FPF_USAGE_REPORT_VERCEL_TOKEN`, retaining their existing roles, team scope and an explicit expiration. Keep the healthy spend-monitor token and current selection order while verifying replacements. Each replacement needs its own metadata/expiry result and required team/project capability check; a spend-first sample alone does not verify dedicated usage log access.

Intentional retirement is a separate viable decision, but deleting secrets alone does not finish it. The weekly workflow requires both names in `FPF_TOKEN_LEDGER_SECRETS`, so missing values become `not_configured` findings. Retirement requires coordinated workflow fallback/ledger and operator-documentation changes, acceptance of the shared spend-token dependency, P4 validation and independent release approval before authorized secret deletion. Preserve generic local CLI token inputs unless separately changing that interface.

The credential creation/update step requires the user handoff described by the computer-use rules and remains outside Your dot's delegated release scope. No secret value belongs in this packet, chat, tracked files or command arguments. A token renewal must not be claimed from secret-presence metadata or a healthy fallback.

## Your dot handoff

The current supported tool catalog has no Dot-addressable messaging endpoint. Bounded supported conversation discovery returned no verified Dot recipient; plugin discovery and the inspected connected messaging directory did not establish one. This is a connection/identity blocker, not proof that the user has no Dot and not a request to expand app permissions. No review request was delivered or decision received.

The documented manual route is the user's [Your dot conversation](https://learn.chatgpt.com/docs/dots/channels). Dot can also [continue an existing local Codex task](https://learn.chatgpt.com/docs/dots/tasks-and-memory#assigned-work) when its computer is connected. Provide the final exact commit, diff, evidence, requested actions and unresolved risks; preserve the actual returned decision reference. Do not treat this packet, the repository role assignment, a substitute review or silence as approval.

## Validation scope

This branch changes repository-only planning/evidence Markdown. It changes no runtime, public setup instructions, generated publication artifacts, workflow or credential selection. The docs build checks the unchanged published surface; focused source/diff inspection validates the planning-record edits. Local verification and independent review results accompany the exact-commit handoff. New publication remains pending that decision.
