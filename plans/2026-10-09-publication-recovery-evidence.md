# FPF publication recovery — evidence and release handoff

Date: 2026-10-09. Status: **local candidate validated; publication approval pending**. Scope: repair the stalled Core publication and usage reporting, and propose support for the expanded upstream Library. This packet distinguishes a validated local candidate from a deployed recovery.

## Objective and operating bounds

- Objective: build and serve the latest inspected Core source without broken generated links, preserve meaningful usage-report failure evidence, and keep existing MCP contracts working.
- Route: isolated checkout from `origin/main` at `b21245a19cb9b91e80731b62b5a389c0f977e47c`; reproduce failures; repair code and regression tests; validate both deployment packages and local service; independent review; prepare one recovery PR.
- Budget: existing dependencies and local compute; read-only GitHub/Vercel evidence; bounded log export (60 s for the live verification; existing scheduled maximum 300 s within a 6 min step). No new service, credential, paid resource, schedule, or deployment created for the repair.
- Guard: do not merge or publish a candidate with unresolved code findings, failed surface checks, incoherent artifacts, or missing required approval. Keep automated merge/deploy guardrails intact.
- Stop/replan: a source/hash mismatch, unexplained behavioral test regression, package budget breach, missing source target without an honest projection, or invalid release credentials blocks the affected release step. Keep the last good production deployment until explicit publication approval.

## Performed repair

| Broken item | Repair | Scope / limitation |
| --- | --- | --- |
| Generated Markdown links corrupted newer upstream reference definitions and table links | Source-preserving Markdown guards; resolve known monolith fragments and extracted-pattern filenames to generated pages | Strict site-link validation remains enabled |
| Explicit pattern anchors before headings were attributed to a preceding section | Known `fpf-pattern-<ID>` anchors resolve to the named pattern page | Arbitrary anchors and unknown IDs retain their real container |
| Whole-page copying made link projection unnecessarily slow | Collect actual edits and reconstruct each page once | Same-snapshot local Bun measurement: 6.824 s → 2.939 s, same 1,057 pages / 39,857,874 characters; not a production latency claim |
| One upstream relative citation points outside the published source tree | Preserve label and original path with an explicit “source document not included in this publication” statement | No invented URL; source is `../_change-campaigns/.../UKIND-ONTIC-SETTLEMENT-DRR.md` |
| Core publication stalled at September 8 | Prepare October 7 upstream edition and regenerated search registry | Local release candidate only until deployed |
| Bare exact IDs rejected as too short | Known compiled IDs bypass the thin-query guard | Unknown IDs and generic short queries still abstain |
| Usage export timeout leaves no report | Collection errors yield `source_error`, unavailable counts, and actionable workflow outputs | Original timeout cause not established; one bounded current export succeeded |
| Request log export may contain several telemetry events | Parse `logs[]` without duplicating its top-level display message; flag invalid/truncated entries | Counts include automated probes; no human-adoption claim |
| Normal startup/CLI logs looked like malformed telemetry | Ignore recognized runtime diagnostic envelopes while retaining malformed usage findings | Actual logger → file-source CLI regression: 5 records, 1 valid event, 0 invalid, quality gate passes |
| Usage workflow uses a mismatched secret name and obscures selection | Canonical usage variable, selected credential name recorded, existing spend-token priority retained | Invalid dedicated/baseline credentials are not rotated or relabelled healthy |
| Original working checkout has an incoherent ignored snapshot | `bun run ensure:snapshot` regenerated it against that checkout's existing spec | Original tracked files and two pre-existing untracked plans were preserved; original code remains behind main |

## Source identity

- Upstream repository: [`ailev/FPF`](https://github.com/ailev/FPF/tree/0c6ade275e9360f0c5ab9715d8f05c0dbaa13cf8).
- Resolved upstream commit: `0c6ade275e9360f0c5ab9715d8f05c0dbaa13cf8`, committed `2026-10-07T22:29:00Z`.
- Original Core bytes: 16,125,961; SHA-256: `70ff53030f9d445c8109773a39e6579ba87e1ac94ab6eda931d429f72a51d703`.
- Acquisition: `FPF_UPSTREAM_REF=<commit> bun run spec:download`, followed by pinned `bun run publish:current` using the existing GitHub session for source provenance.
- Snapshot is an ignored build product. Tracked spec and manifest must remain unchanged when CI reconstructs it with `ensure:snapshot`.

## Validation ledger

| Actual command / check | Result |
| --- | --- |
| `bun install --frozen-lockfile` | Passed; no dependency or lockfile changes |
| `bun run validate:published` | Passed; spec, manifest and snapshot coherent |
| `bun run monitor:content -- --mode local --format markdown --fail-on-breach` | Passed: 3 routes, 20/20 route references, 14/14 required patterns, 6 curated pages |
| `bun run docs:build` | Passed: 1,057 generated files; Rspress web/node render completed with dead-link validation enabled |
| `bun run check`; `bun run lint`; `bun run check:boundaries` | Passed; lint reported 0 errors, 0 warnings across 168 files |
| `bun run vercel:mcp:build` | Passed: 160.95 MB function bundle, below 240 MB configured fail threshold; 79.05 MB headroom |
| `bun run build:vercel-website` after the docs build | Passed; static website package generated |
| `bun run smoke:production -- --local --format markdown --fail-on-breach` | Passed: 29 checks against the candidate's two local surfaces and expected October 7 source |
| `bun run bench:mcp:qa -- --name recovery-local --url http://127.0.0.1:4188/api/mcp/fpf_reference/mcp --format markdown` | Passed: 8/0, including session stability; 860 known IDs |
| `bun run cli -- query --question E.4.FPF --mode compact` | Passed: `status: ok`, exact ID returned; focused regression also checks unknown-ID abstention |
| `bun run cli -- evaluate-work --target working-tree --format json` | Passed: `overallStatus: aligned`; deterministic local rubric, not release approval |
| Focused source-link, query and telemetry regressions | Passed, including 9 source-link cases and actual file-source CLI failure/timeout/ordinary-log checks |
| Full test inventory plus targeted reruns | **488 tests passed across all 56 files; 0 skipped, 0 unresolved failures, 0 missing files**. See execution caveat below |
| Independent Auto Review on final runtime code | Passed: “autoreview clean: no accepted/actionable findings reported”; no further actionable findings after the performance fix |

Live usage verification used the existing authenticated local Vercel session:

```sh
env -u GITHUB_OUTPUT -u GITHUB_STEP_SUMMARY bun run usage:report -- \
  --source vercel --use-cli-auth --scope venikmans-projects \
  --window 24h --vercel-timeout-ms 60000 --format json --no-write
```

Result: 50 valid events, 0 invalid, no operator action required, over `2026-10-08T05:45:56Z`–`2026-10-09T05:45:56Z`. This proves the repaired reader can obtain and parse an actual sample. It does not prove that CI secrets work. Temporary command logs and the sanitized aggregate are under `/tmp/fpf-recovery-*` and `/tmp/fpf-usage-live.json`; they are supplementary, not durable release artifacts.

Initial `CI=true bun scripts/run-test-shard.ts --shard 1/1` execution exposed stale upstream title/stub/duplicate-heading assumptions and a projection timeout. Fixtures were corrected from pinned source or replaced with independent tiny positive/negative fixtures; timeouts were not raised. The redundant retry of the already diagnosed docs-projection failures was stopped and the suite continued. That original command retains exit 1; it is not being reported as a green uninterrupted run.

Final evidence uses the last full-file passing result: automatic runtime retry (18/18), separate `runSelectedTestFiles` for compiled-index-golden, compiler-contracts and docs-projection (1 + 27 + 23), final MCP server rerun (8/8), and final source-link rerun (9/9), together with the other passing files from the full execution. Consolidation checked all 56 discovered `*.test.ts` files and found 488 passed tests, no missing files, no skips and no failures. Temporary per-file evidence is `/tmp/fpf-recovery-test-results.json`. The docs-projection file completed in 136.235 s after the fixes versus 452.897 s in the failing initial run; the timeout settings stayed unchanged. A clean remote CI run is still required before release.

Auto Review first required the bundled Codex CLI because the installed standalone CLI could not run the configured model. One attempt failed report-schema validation on absolute paths; the unchanged engine was rerun with repository-relative path output. Two actionable findings (anchor ownership and ordinary logs) were reproduced and fixed. Both the subsequent review and final review after the measured performance fix were clean. Final runtime-code review output is `/tmp/fpf-recovery-autoreview-closeout.json`; the last later test edit only corrected the independently verified A.1.1 title literal in the MCP test.

## Remaining production work

1. Obtain independent approval for the final PR head and green required CI. Do not self-merge from the implementation role.
2. Verify the effective deployment credential at release time. Both sync deployment paths select `VERCEL_SYNC_DEPLOY_TOKEN` → `VERCEL_SPEND_MONITOR_TOKEN` → `VERCEL_TOKEN`; current secret metadata makes the spend token effective, and the October 9 spend monitor passed. The invalid baseline and dedicated usage secrets require an explicit rotate-or-retire decision, but do not by themselves block publication while a valid earlier token is selected. Do not copy the broad local CLI session into CI. Presence-based selection does not rescue a nonempty invalid primary by trying a backup.
3. After specific operator approval, follow the [guarded two-surface deployment workflow](../docs/automation-playbook.md#operational-cli-workflows): `bun run deploy:prod`. It records rollback targets, promotes/aliases both surfaces, checks canonical endpoints, and rolls back on failure. It has a short exposure window before post-alias checks.
4. Run independent canonical production smoke and MCP QA; check source identity, upstream drift, content monitor, usage report and credential ledger. A local green check cannot close the live freshness incident.
5. Close or supersede the stale recovery/freshness issues only with production evidence; do not merge the old generated sync PR blindly.

Repository [AGENTS.md](../AGENTS.md) requires human approval for “final external publishing.” The [role map](../docs/automation-playbook.md#role-map) prohibits implementation-role self-merge and Vercel mutation without explicit approval. These are the release boundary, not a claim that publication has happened.

Read-only release audit found no classic main protection, effective branch rules, or repository rulesets; `allow_auto_merge` is false. Repository approval/check policy still applies, but GitHub does not currently enforce it. Configuring protection is a separate approved repository-settings action. The CI comment now describes the aggregate check without claiming that protection exists.

A branch push or draft PR can trigger the existing `fpf-sh` Git integration's website Preview deployment and subsequent Playwright checks. Draft status is not a deployment guard. MCP has no Git integration, and Git deployment on main is disabled in `vercel.json`; however, merging the recovery can enable the next scheduled sync worker to publish. No remote branch/PR, merge, deployment or credential mutation has been performed for this candidate at closeout. The local branch is `codex/fpf-publication-recovery`.

## New materials

The separate [Library proposal](2026-10-09-new-fpf-materials-proposal.md) covers all 40 publications in the inspected upstream tree. It recommends a pinned publication manifest, exact section reader and deterministic search, preserving Core compatibility before expanding public contracts. No multi-publication implementation is included in this recovery.
