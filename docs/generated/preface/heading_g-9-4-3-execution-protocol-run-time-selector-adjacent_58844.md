---
title: "G.9:4.3 — Execution protocol (run‑time / selector‑adjacent)"
description: "Generated reference page for heading:g-9-4-3-execution-protocol-run-time-selector-adjacent:58844."
---

# G.9:4.3 — Execution protocol (run‑time / selector‑adjacent)
> Preface node `heading:g-9-4-3-execution-protocol-run-time-selector-adjacent:58844`

## Content

Execution is **one run** under the pinned plan:

1. **Gate on legality & pins.** Validate pins and legality‑gate availability; run eligibility/acceptance checks under the plan’s `TaskSignature (S2)` and refuse/abstain on illegal ops (record trace; no “fourth status”).
2. **Invoke selection/dispatch.** Call **G.5** under the plan’s pinned refs and emit selector outputs in a form consistent with G.5’s portfolio semantics.

When parity is comparing bounded specialization, the report should echo the active specialization profiles or equivalent pins so reviewers can recover the work-measure threshold target, prior exposure, budget-to-threshold, post-threshold efficiency when relevant, transfer, retention, downside burden, and any corridor-entry baseline or evidence note from the parity object itself rather than from later narrative explanation.

3. **Record comparability mapping (when used).** If `UNM_id?` / `NormalizationMethodId[]?` / `NormalizationMethodInstanceId[]?` were declared, **echo them** in `ParityReport@Context` (or in its explicit pins deltas) and record their ids (and any scoped notes required by the cited contract surface) in audit pins/SCR; cite the applicable `PathId`s.
4. **Publish trace.** Emit `ParityReport@Context` with EvidenceGraph citations and all active pins (editions/policy‑ids), so the run can be re‑checked and re‑run.
5. **Emit telemetry hooks (optional, report‑only).** When telemetry is produced, it is emitted as telemetry pins/events for refresh wiring (not as a silent change in dominance interpretation).
