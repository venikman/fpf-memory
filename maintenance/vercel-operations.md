# Vercel Operations: cleanup, validation environments, telemetry

**Status:** ops plan · **Last reviewed:** 2026-07-04 · **Access confirmed:** read-only Vercel MCP
into team `venikman's projects` (`team_CnO1I5xd2OS0lzbbc4RkW7Ym`); both `fpf-reference-mcp` and
`fpf-sh` reachable.

> **Access note for the steward:** you were unsure whether I had Vercel access — I do (read/inspect:
> projects, deployments, build/runtime logs, protected previews, Vercel docs). Per the
> [Automation Playbook](../docs/automation-playbook.md#access-and-authority), *mutating* actions
> (deploy, promote, alias, delete, billing, domains) stay behind explicit human approval. Nothing
> in this doc has been executed — it is a plan with approval gates.

The three workstreams the steward named — **deployment cleanup**, **validation environments**, and
**logging/telemetry** — grounded in the live deployment state.

---

## Observed state (2026-07-04)

**`fpf-reference-mcp` (the MCP API):**

- The most recent ~20 deployments are **all `target: production`, all `READY`, all rollback
  candidates**, at a cadence of ~2–3/day, created by `codex` and `claude-code_*_agent` actors.
- These come from direct CLI `--prod` pushes (`vercel:mcp:deploy:prod`). **There are no preview
  deployments** — every build goes straight to production.
- Production publication is pinned at upstream `093d30e8` (2026-06-08) per `/api/fpf/status`.

**`fpf-sh` (the static site):**

- A mix of two deploy paths: **Git-integration preview deploys** (one per sync PR,
  `target: null`, branch `chore/sync-fpf-*`) *and* occasional direct-CLI `target: production`
  deploys from `codex`.
- Preview deploys of already-merged sync PRs accumulate and are never cleaned up.
- Sync PR previews are visible as recently as ~2026-06-21 (PR 227) — later than the MCP
  production publication date, i.e. **the two production surfaces have diverged.**

Three problems fall straight out of this: unbounded deployment accumulation (workstream 1), **no
validation gate in front of MCP production** (workstream 2), and telemetry that is only as durable
as Vercel's log retention (workstream 3).

---

## Workstream 1 — Deployment cleanup / retention

**Problem.** Production deployments on `fpf-reference-mcp` and stale PR previews on `fpf-sh`
accumulate without bound. Every MCP prod deploy is flagged a rollback candidate, so the
rollback-target list is noise and the *real* rollback target is not obvious — which itself is a
recoverability risk (executive checklist §7 wants a *known* rollback target).

**Reconcile with existing philosophy.** The README states "historical errored preview deployments
can remain as audit records." That is correct *for errored/incident deploys* — they have audit
value. It should not be read as "never prune": routine *superseded, READY* production deploys and
*merged-PR* previews have near-zero audit value and high noise. The policy below keeps the audit
value and removes the noise.

**Proposed retention policy (deletions are Tier 2 — human-approved):**

- **Always keep:** the deployment currently behind each production alias; the *one* designated
  rollback target per project; any deployment referenced by a documented incident.
- **MCP production deploys:** keep the last **10** (or last **14 days**), whichever is larger;
  prune older superseded `READY` prod deploys.
- **Website PR previews:** prune previews whose sync PR is merged/closed **and** older than
  **14 days**.
- **Never auto-delete:** `ERROR`-state deploys tied to a documented incident (keep as audit).

**Execution options:**

- **(a) Manual, biweekly** — prune during the steward session via the Vercel dashboard/CLI. Zero
  new machinery, fully human-gated. *Recommended starting point.*
- **(b) Guarded automated workflow** — a scheduled job using the Vercel API with a hard allowlist
  (only `READY`, non-alias, older-than-window, matching project) and a **dry-run/report-first**
  mode that opens a "proposed deletions" issue for approval before deleting anything. This is a
  Tier-2/P4 autonomous-action path per the playbook; it needs the budget/guard/ledger evidence
  discipline and, because deletion is destructive, an explicit approval step retained.

**Also — consolidate the website to one deploy path.** `fpf-sh` currently receives both
Git-integration deploys *and* direct-CLI prod deploys. Pick one (Git-integration is the cleaner
default; it already gives per-PR previews). Dual paths are how the surfaces diverged.

**Start with:** a read-only `list-stale-deployments` report script (dry run) so the steward can see
exactly what a prune *would* remove before any deletion is approved.

---

## Workstream 2 — Validation environments (the real gap)

**Problem.** MCP deploys go **straight to `--prod`** with no preview/validation environment between
build and production. The executive production checklist exists, but today it runs (at best) as a
*post-hoc audit of production*, not as a *pre-promotion gate*. The website has per-PR Git previews
plus `preview-e2e.yml`; **the MCP API has no equivalent.** For the highest-risk surface — the one
agents actually call — there is nothing between "it built" and "it's live."

**Proposed: a preview→validate→promote flow for MCP.**

1. **Deploy as preview** (`vercel:mcp:deploy`, non-prod) → obtain the preview URL.
2. **Run the gates against the PREVIEW URL**, reusing scripts that already exist:
   - `bench:mcp:qa` — Q&A correctness on the preview endpoint.
   - `smoke:production` logic — JSON-RPC `initialize` + one tool call succeed; `GET` MCP path
     returns `405` not `404`; `/api/fpf/status` = `200 ok`; public tool list is the intended set;
     legacy route blocked.
   - `bench:vercel:function-size` — bundle within threshold.
3. **Promote only on green** — alias/promote the *validated* preview to production. The alias flip
   stays **Tier 2** (human-approved), but everything before it is safe to automate.

This turns the executive checklist into a **gate**, not an audit — and it directly de-risks the
"deploy step silently not firing / firing bad" failure mode behind today's freshness divergence.

**Wiring options:**

- Extend `deploy-production-surfaces.ts` into deploy-preview → validate → (approve) → alias, so the
  sync loop promotes only validated bundles.
- Or a GitHub workflow: preview-deploy MCP on PR, run gates on the preview, promote on merge.

**On "validation environments" as persistent staging.** An ephemeral preview per deploy is cheaper
and sufficient. A persistent `staging.mcp.fpf.sh` alias is optional and only worth it if you want a
stable URL for external smoke partners — not needed for the gate itself.

---

## Workstream 3 — Logging & telemetry

**What exists (already solid):**

- **Runtime logger** (`src/adapters/infra/logging/runtime-logger.ts`) emits structured JSON. On
  Vercel (`VERCEL=1`) it writes to **stdout/stderr** so Vercel log capture works; locally it
  appends to `.runtime/logs/fpf-runtime.log`.
- **Privacy-preserving usage events** (`mcp_tool_usage`): tool name, outcome, duration, coarse
  input shape, resolved FPF IDs/kinds, result counts, status — and **deliberately no** raw
  questions, search text, selectors, answer text, or session IDs.
- **Usage report** (`scripts/usage-report.ts`): reads those events from a local file *or* Vercel
  production logs → top tools, intent categories, served patterns, `triageFindings`,
  `unknownUnresolvedRate`. A weekly usage-telemetry review already exists.
- **Spend monitor** (`vercel-spend-monitor.yml`): Function Duration GB-hrs, legacy-route
  invocations, and function error-code rows.

**Gaps and proposals:**

1. **Ephemerality.** Vercel log retention is short and plan-dependent; the usage report is the only
   durable capture, and only if it is *run and committed*. **Proposal:** ensure the weekly usage
   report **persists an artifact** (commit `reports/usage/*` or upload), so trends survive log
   expiry. A durable **log drain** to external storage is possible but cost/approval-gated (Tier 2)
   — the persisted report is likely enough.
2. **No direct error-rate signal.** Today, failure is inferred indirectly via the spend monitor's
   error-code rows. **Proposal:** add a lightweight availability/error-rate check that asserts the
   MCP tool **error rate stays under threshold** over the window, computed from the `outcome` field
   already in `mcp_tool_usage`. This closes the "is it quietly failing?" gap for an absent steward
   — and belongs in the biweekly digest.
3. **Telemetry → maintenance loop.** Feed `triageFindings` / `unknownUnresolvedRate` into the
   biweekly return session as a standing input. A high unresolved rate is a **content/graph gap**
   and is the raw material for the ontology work
   ([`index-vs-ontology.md`](./index-vs-ontology.md) P5: telemetry-driven route/edge gap
   detection).
4. **Privacy invariant (keep it explicit).** Any new telemetry must preserve the no-raw-content
   rule. State it in code review for every logging change; it is a public promise.
5. **Dashboard (low priority).** A generated markdown/HTML trend from accumulated usage reports —
   nice, not urgent.

---

## Decisions needed from the steward (Tier 2)

1. **Deployment retention:** approve the retention policy, and choose execution (a) manual-biweekly
   vs (b) guarded automated workflow with dry-run-first. (Recommend: approve policy + start with
   (a) and a read-only report script.)
2. **Website deploy path:** approve consolidating `fpf-sh` to a single deploy path
   (recommend Git-integration).
3. **MCP validation gate:** approve the preview→validate→promote flow for MCP (the safe steps
   auto-run; the alias flip stays human-approved).
4. **Telemetry durability:** approve persisting the weekly usage report artifact; decide whether a
   durable log drain is worth the cost (recommend: persist report now, defer the drain).
5. **Error-rate monitor:** approve adding an MCP error-rate check from existing `outcome` data.

None of these have been executed. Each is prepared for a decision, not taken.
