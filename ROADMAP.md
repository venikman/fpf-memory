# Roadmap

The ranked backlog `CLAUDE.md` refers to. Repo-root, so it does **not** publish to
fpf.sh (anything under `docs/` does — see the docs-root publishing rule).

Ranked by value, highest first. Re-rank when reality changes; do not silently
reorder without saying why in the PR that does it.

## The promise this project exists to keep

fpf.sh and mcp.fpf.sh mirror [`ailev/FPF`](https://github.com/ailev/FPF) and stay
**at most 1 day behind upstream**.

Stated as an explicit clause, because FPF A.2.3 requires a promise to carry its
own acceptance criteria and an auditable evidence link:

| Part | Value |
| --- | --- |
| Promised effect | Published spec content matches upstream `main` |
| Eligibility / access | Public, unauthenticated, via fpf.sh and mcp.fpf.sh |
| Acceptance criterion | Time since the oldest upstream commit we could already have published ≤ 26h (falling back to the published artifact's own upstream date when the compare API is unavailable) |
| Evidence | `mcp.fpf.sh/api/fpf/status` → `publication.upstreamDate`, plus `ailev/FPF/compare/<published>...<HEAD>` (the status API lives on mcp.fpf.sh only; fpf.sh is the static docs host and 404s that path) |
| Verdict owner | `.github/workflows/fpf-sync-monitor.yml` (independent of the sync worker) |

26h = the ≤1-day promise plus slack for one missed run of a twice-daily worker.
**The acceptance verdict must be computed from the published artifact's own
timestamp**, never from upstream's commit time — measuring the source rather than
the delivery is what let a 16-day outage report "within SLO" (see #253).

## Now

> **2026-11-13 re-rank.** Pick up item 7 first, ahead of items 1-6. The
> freshness promise above was broken for 32 days (2026-10-12 to 2026-11-13)
> while both of its alarms sat open, and four ways to repeat that are still
> listed there. Numbering is unchanged so existing references stay valid.

1. **LICENSE.** The repo is all-rights-reserved by default, which caps every
   distribution move below it. Needs Stas to pick (MIT or Apache-2.0), and the
   file must scope repo code separately from the mirrored upstream spec text in
   `published/current/`.
2. **Make the plugin discoverable — remaining scope: a `docs/` mention, plus
   the About-text swap below.** The README quick-install block and the
   `src/core/public-copy.ts` card shipped in #250 (2026-07-28). The GitHub
   About was hand-corrected to live counts on 2026-07-28 and was stale again
   by the 2026-08-01 sync (292 → 294 patterns; flagged 2026-08-03). Lesson:
   repo metadata must not quote numbers only the compiled snapshot knows —
   the corpus changes twice a day and the About is hand-edited. Live counts
   stay on surfaces that compute them (`src/core/documents.ts`, fpf.sh).
   Canonical count-free About text (needs a repo admin — description edits
   are not exposed to session tooling):
   > Hosted MCP server + slim wiki projection of the First Principles
   > Framework (FPF) by Anatoly Levenchuk. Bounded, vectorless retrieval
   > over the full pattern catalog and curated routes — addressable by
   > stable FPF IDs, synced daily from ailev/FPF.
3. **Retrieval experiment archive and follow-up decision.** The 2026-08-31 bake-off
   (`experiments/retrieval-bakeoff/`, packet
   `plans/2026-08-31-retrieval-bakeoff-review-packet.md`) measured the
   historical local runtime on a now-exposed test set: raw trace candidate-list
   MRR .596 / R@5 67.1% at 516ms p50, with 0/10 empty negative-case lists.
   This did not measure production answer abstention. The `search_fpf` scan took
   about 1.3–1.4s p50 and 3.2s p95. A deterministic, dependency-free fusion
   stack built in that branch scores .832 / 88.6% at 12ms
   (solo BM25F: .817 / 85.0% at 0.55ms).
   These are warm local harness timings, not hosted end-to-end measurements.
   Next: review the historical archive for retention. Production integration
   (including replacing the search scan) requires a separate decision after
   current-corpus comparison, a new isolated holdout, and P3 verification.
   Archive acceptance does not authorize production changes.
4. **Publish to `registry.modelcontextprotocol.io`.** Zero listings today and no
   publication was ever attempted. The freshness gate cleared 2026-07-28 (see
   Shipped); what remains is the board go/no-go. Note repo-root `server.json`
   is a contributor stdio launcher currently occupying the filename the registry
   reserves.
5. **Contribution surface.** `CONTRIBUTING.md`, issue templates, and a
   `CODE_OF_CONDUCT.md`. GitHub community health is 42%; there is no entry point
   for an outside contributor even once a LICENSE exists.

6. **Route catalog recovery.** Curated routes regressed 23 → 3 on 2026-06-09
   (adoption surface restructure, #210). Audit which curated routes carried real
   query traffic and restore the high-value ones. The P4 boundary-route
   re-activation below belongs to this item when it un-defers.
7. **Monitor hardening & telemetry revival.** Content-quality monitor back to a
   green path (#273 open). The weekly-review half shipped 2026-08-07:
   `weekly-metrics.yml` posts a Monday "Weekly metrics review \<ISO week\>"
   issue combining freshness vs the 26h SLO (reusing the sync monitor), main
   activity, Vercel deployments, Web Analytics, and the #170 usage report as a
   trailing-24h sample (runtime-log retention is shorter than a week). Both
   sites ship the `/_vercel/insights/script.js` beacon; the workflow enables
   Web Analytics idempotently via `vercel project web-analytics`. Remaining:
   confirm on the first run that analytics enablement + beacon actually
   collect, then swap the 24h usage sample for durable Web Analytics custom
   events emitted server-side from the MCP runtime.
   2026-08-30 absence-hardening shipped under this item: a weekly workflow
   keepalive against GitHub's 60-day scheduled-workflow auto-disable (public
   repos lose ALL crons — monitors and alarms included — after 60 quiet
   days), a true-history fix for the sync monitor's recovery-dispatch budget
   (the old 100-run window made a 3-4-week outage look recovered), and a
   credential/renewal ledger in the automation playbook with weekly
   token-expiry findings from `GET /v5/user/tokens/current`.
   2026-11-13 stall recovery (#401) removed what kept every sync PR red
   after upstream `f2bc67dd`: a catalog boundary keyed to a heading upstream
   renamed, a Playwright / `ubuntu-latest` mismatch, and test timeouts
   sitting at 80-100% of their limits. It also capped the docs build's Node
   heap on the 8 GB Vercel preview machine (container peak 5938 MB to
   5432 MB); the out-of-memory kills of 2026-10-13 to 11-02 had already
   stopped and their cause could not be re-measured. Still open under this
   item, ranked:
   (a) **The alarm has no responder.** #353 opened at 2026-10-12 23:53Z,
   minutes after the first failed sync, and #359 four days later; neither
   drew a response until 2026-11-13. After the first notification the
   escalation only edits the issue body in place, which notifies no one. A
   failure that persists must page a person or start a maintainer session.
   (b) **A failed check on an unchanged head cannot recover.** The worker
   re-dispatches CI on each run, but nothing rebuilds the Vercel preview or
   reruns its Playwright check, so one failed preview blocks publication
   until upstream moves (sync head `0d8ca19a` was dispatched nine times over
   four days against the same failed preview).
   (c) **Preview build capacity.** At 18.4 MB of spec `rspress build` needs
   about 1.7 GB of live heap and holds about 3.5 GiB outside it; the preview
   machine has 8 GB and has been OOM-killed in two separate periods
   (2026-08, 2026-10). The heap cap in `src/build/docs-build-memory.ts`
   buys margin, not capacity. Watch the `container memory peak` line in the
   preview build log (5432 MB of 8192 MB on 2026-11-13); before it passes
   ~7 GB, build previews in GitHub Actions and upload them prebuilt (as
   production already is) or move to a larger build machine (a billing
   decision for Stas).
   (d) **Per-test spec compiles.** Most test files rebuild the full snapshot
   inside every test, so suite time tracks upstream size (10.2 MB to 18.4 MB
   from 2026-07 to 2026-11). `FpfRuntime` already accepts `artifactSeedDir`;
   seeding tests from the `ensure:snapshot` artifact makes per-test cost
   flat. The 120 s default timeout from #401 is a stopgap.
   (e) **Floating toolchains.** Vercel git builds follow `engines.node:
   ">=22.13.0"` to the newest Node major (26.x on 2026-11-13, while Project
   Settings say 24.x); pin it. The Preview E2E job is pinned to
   `ubuntu-24.04` until Playwright moves past 1.59.1 (1.65.0 lists 26.04).

## Shipped

- **Freshness restored and its alarm made real** (2026-07-28). De-LFS (#253),
  authenticated upstream lookup (#255), spec-coupled retrieval + test
  reconciliation for the upstream A.1.1 restructure (on #256), CR-3 escalation
  proven live in both directions (issue #254 auto-opened 10:50Z on worker
  failure, auto-closed 11:26Z on the first green run). Evidence: worker run
  30354263681 success; `/api/fpf/status` at 2026-07-28T11:26:44Z served
  upstreamRef `17edd955` (= upstream HEAD, committed 10:09Z — 77 min latency
  against the 26h SLO); A.7.1, A.6.RCD, C.19.2, A.15.PROD all 200 after 16 days
  of 404. Full claim register: `plans/2026-07-28-fpf-memory-recovery-review-packet.md`.

## Deferred — decided, not forgotten

Listed so they stop being re-derived from scratch each session.

- **Glaze companion** (design exploration, PR #239). Claim register and build
  prompt are written. Deferred until the core freshness promise is reliably kept;
  a companion product built on an unreliable base inherits the unreliability.
- **P4 boundary-route re-activation.** Deferred. Trap for whoever picks it up:
  the re-point target is `-and-claim-decomposition`, **not**
  `route:boundary-unpacking`.
- **Document AI cost model** (`plans/2026-07-07-*.md`). Different problem domain;
  does not belong in this repo. Move it out rather than ranking it.

## Not doing

- Raising the GitHub LFS budget as a fix. It is a stopgap that re-breaks:
  storage grows ~95MB per sync attempt, monotonically. The artifact is
  regenerable in seconds and does not belong in git.
