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
| Evidence | `/api/fpf/status` → `publication.upstreamDate`, plus `ailev/FPF/compare/<published>...<HEAD>` |
| Verdict owner | `.github/workflows/fpf-sync-monitor.yml` (independent of the sync worker) |

26h = the ≤1-day promise plus slack for one missed run of a twice-daily worker.
**The acceptance verdict must be computed from the published artifact's own
timestamp**, never from upstream's commit time — measuring the source rather than
the delivery is what let a 16-day outage report "within SLO" (see #253).

## Now

1. **LICENSE.** The repo is all-rights-reserved by default, which caps every
   distribution move below it. Needs Stas to pick (MIT or Apache-2.0), and the
   file must scope repo code separately from the mirrored upstream spec text in
   `published/current/`.
2. **Make the plugin discoverable — remaining scope: a `docs/` mention.** The
   README quick-install block and the `src/core/public-copy.ts` card shipped in
   #250 (2026-07-28), and the GitHub description now states the live counts
   (292 patterns / 3 curated routes, corrected 2026-07-28).
3. **Publish to `registry.modelcontextprotocol.io`.** Zero listings today and no
   publication was ever attempted. The freshness gate cleared 2026-07-28 (see
   Shipped); what remains is the board go/no-go. Note repo-root `server.json`
   is a contributor stdio launcher currently occupying the filename the registry
   reserves.
4. **Contribution surface.** `CONTRIBUTING.md`, issue templates, and a
   `CODE_OF_CONDUCT.md`. GitHub community health is 42%; there is no entry point
   for an outside contributor even once a LICENSE exists.

5. **Route catalog recovery.** Curated routes regressed 23 → 3 on 2026-06-09
   (adoption surface restructure, #210). Audit which curated routes carried real
   query traffic and restore the high-value ones. The P4 boundary-route
   re-activation below belongs to this item when it un-defers.
6. **Monitor hardening & telemetry revival.** Content-quality monitor back to a
   green path, and the weekly FPF usage telemetry review (#170, dormant since
   June) re-established so adoption moves are measured, not guessed.

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
