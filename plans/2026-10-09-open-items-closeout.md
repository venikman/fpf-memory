# October 9 open-item closeout

Date: 2026-10-09. Repository: `venikman/fpf-memory`. Released main inspected: `9503fbe18ff7a7e4bcffea4aa8c74e1e956149a0`.

## Objective and bounds

- Objective: reconcile the completed publication recovery, close the historical weekly review with evidence, and prepare the remaining credential and review decisions.
- Route: isolated documentation branch from released main; current GitHub/run evidence; bounded live sync/content/usage checks; existing weekly workflow on main with issue publication disabled; independent local review; exact-commit handoff.
- Budget: existing infrastructure and dependencies, one manual metrics run, one bounded local 60 s usage export, local docs builds and review. No new service or schedule.
- Guard: distinguish a successful workflow execution from its report verdict; preserve unresolved credential findings; require independent release authority for publication of new commits.
- Stop/replan: failed live health gate, unreviewed candidate, unavailable supported reviewer, credential handoff, or a requested action outside existing authority. A local clean review is advisory, not Your dot approval.

## Disposition

Publication follow-up on October 9: the statuses below describe the initially
approved heads `f805566ab2c67d31c78d6b39e2c592c5cc16e026` (A) and
`5075f7262670600ce070720fa39b6e5304862414` (B). Later review-fix commits require
their own exact-commit decision and applicable checks.

| Item | Performed work / status at this follow-up | Remaining action |
| --- | --- | --- |
| Recovery record | Corrected the obsolete “release pending” status in the [recovery packet](2026-10-09-publication-recovery-evidence.md); approved head A was published in [PR #348](https://github.com/venikman/fpf-memory/pull/348) | Resolve subsequent review findings; renewed exact-commit review and checks before any merge/release |
| [Weekly metrics #346](https://github.com/venikman/fpf-memory/issues/346) | Closed as reviewed on October 9; original W40 figures preserved, recovered findings reconciled, credential work linked to #304 | None for that historical review; subsequent scheduled reports remain authoritative for their own windows |
| [Credentials #304](https://github.com/venikman/fpf-memory/issues/304) | Updated with the fresh CI ledger and exact rotation/retirement dependencies; remains open | User credential handoff, then per-credential capability and CI verification |
| [Retrieval PR #309](https://github.com/venikman/fpf-memory/pull/309) | Approved head B was published with historical-archive wording | Full archive acceptance, subsequent review fixes and merge/release remain held; no later local fixes are claimed published here |
| Your dot | Authenticated supported web conversation received the packet and returned an independent branch/PR/Preview decision for both exact heads | Further exact-candidate decision for merge/release after applicable checks and blocking findings are resolved |
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

The initial October 9 discovery, before the 09:51 America/New_York review
request, found no verified Dot recipient through the inspected tools and
directories. That bounded check was superseded by successful delivery through
the authenticated [Your dot web conversation](https://chatgpt.com/dots/home).

Your dot's returned October 9 decision approved A
`f805566ab2c67d31c78d6b39e2c592c5cc16e026` and B
`5075f7262670600ce070720fa39b6e5304862414` for branch/PR publication and the
existing automatic website Preview only. It explicitly held merge/release
for both and full archive acceptance for B. The supplied diff, local build
and advisory review evidence were reviewed; this does not mean Dot reran
those checks. The initially omitted retrieval validator source was delivered
in a follow-up.

Decision source: the conversation above, visible message reference
`d94bd92e7b548198b7195b5429fac1de~d94bd92e7b548198b7195b5429fac1de~CalpicoMessage~Sentinel_8d1973771fa48191bd25f1fdfad35238`.
The captured transcript and screenshot are retained outside the repository
as `dot-decision-2026-10-09.txt` and `.jpg` in the local closeout evidence bundle.

Both approved heads were subsequently published. A's [CI run](https://github.com/venikman/fpf-memory/actions/runs/37940538663)
and [Preview E2E](https://github.com/venikman/fpf-memory/actions/runs/37940771095)
passed for `f805566ab2c67d31c78d6b39e2c592c5cc16e026`; PR #348 was marked ready.
Later automated review findings still require fixes and a further independent
decision. Ready status and green checks alone do not lift the merge hold.
Any successor commit, including this record correction, requires renewed
exact-commit approval and applicable checks; the earlier decision does not
cover it. Credentials remain outside this release delegation.

## Validation scope

This branch changes repository-only planning/evidence Markdown. It changes no runtime, public setup instructions, generated publication artifacts, workflow or credential selection. The docs build checks the unchanged published surface; focused source/diff inspection validates the planning-record edits. Local verification and independent review results accompany each exact-commit handoff. The original approved heads were published as recorded above; successor commits and merge/release need their own decisions and applicable verification.
