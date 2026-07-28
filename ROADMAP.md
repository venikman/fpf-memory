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

1. **Restore freshness and make its alarm real.** De-LFS the 95MB index snapshot
   that exhausted the GitHub LFS budget and took down sync, CI, content-quality,
   and every fresh clone; fix the drift metric to measure the published artifact;
   route workflow failures to a GitHub issue. Shipped in #253 + #255;
   live freshness verification in flight.
2. **LICENSE.** The repo is all-rights-reserved by default, which caps every
   distribution move below it. Needs Stas to pick (MIT or Apache-2.0), and the
   file must scope repo code separately from the mirrored upstream spec text in
   `published/current/`.
3. **Make the plugin discoverable.** `.claude-plugin/` shipped 2026-07-08 and is
   advertised in zero places — not the README, not `docs/`, not
   `src/core/public-copy.ts` (the SSOT for the mcp.fpf.sh setup page). Add the
   literal install commands to all three, and correct the GitHub repo
   description (it still claims 247 patterns / 13 routes; live is 281 / 3).
   In flight: #250.
4. **Publish to `registry.modelcontextprotocol.io`.** Zero listings today and no
   publication was ever attempted. Gated on item 1 — listing a stale server in
   the canonical index is worse than not listing. Note repo-root `server.json`
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
   green path, and the weekly FPF usage telemetry review (#170, dormant since
   June) re-established so adoption moves are measured, not guessed.

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
