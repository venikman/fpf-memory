# Roadmap

The ranked roadmap `CLAUDE.md` points at. Lives at the repo root deliberately —
anything under `docs/` publishes to fpf.sh, and this file is internal planning,
not site content. Re-rank when reality changes, and say why in the PR that does.

## Ranked next-5

1. **Freshness restoration & alarm correctness** (packet CR-1..CR-4,
   `plans/2026-07-28-fpf-memory-recovery-review-packet.md`) — in flight
   2026-07-28. Done when `/api/fpf/status` serves upstream `4b75b56c` or newer
   and the four 404 pattern IDs (A.7.1, A.6.RCD, C.19.2, A.15.PROD) return 200.
2. **Distribution wave.** MCP registry listing — BLOCKED on board go/no-go AND
   on item 1: listing a stale server in the canonical index is worse than
   absence. Also: `/connect-mcp` → 308 to mcp.fpf.sh plus sitemap cleanup, and
   corrected GitHub repo metadata.
3. **Community surface.** LICENSE (board decision; must scope repo code
   separately from the mirrored `ailev/FPF` spec text), `CONTRIBUTING.md`,
   issue templates.
4. **Route catalog recovery.** Curated routes regressed 23 → 3 on 2026-06-09;
   audit and restore high-value routes. Includes the deferred P4 boundary-route
   re-activation — the re-point target is the `-and-claim-decomposition` doc,
   NOT `route:boundary-unpacking`.
5. **Monitor hardening & telemetry revival.** Content-quality green path;
   weekly usage telemetry review re-established.

## Deferred / not doing

Listed so sessions stop re-deriving them.

- **Glaze companion build** — #239 stays an exploration; no build commitment.
- **Google Document AI cost model** — different problem domain; belongs outside
  this repo.
