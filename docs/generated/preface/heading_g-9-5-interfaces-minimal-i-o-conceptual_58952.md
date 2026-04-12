---
title: "G.9:5 — Interfaces (minimal I/O; conceptual)"
description: "Generated reference page for heading:g-9-5-interfaces-minimal-i-o-conceptual:58952."
---

# G.9:5 — Interfaces (minimal I/O; conceptual)
> Preface node `heading:g-9-5-interfaces-minimal-i-o-conceptual:58952`

## Content

| Interface                          | Consumes                                                                                                                                         | Produces                                                                                        |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| **G.9‑1 `Plan_Parity`**            | `BaselineSet`, `BaselineBindingRef`, `FreshnessWindows`, `Budgeting?`, `EpsilonDominance?`, `CNSpecRef.edition`, `CGSpecRef.edition`, `ComparatorSpecRef.edition`, `SCPRef.edition?`, `MinimalEvidenceRef.edition?`, `UNM_id?`, `NormalizationMethodId[]?`, `NormalizationMethodInstanceId[]?`, `ParityPinSet`, `PlanItemRefs[]?` | `ParityPlan@Context` (UTS entry; edition‑pinned)                                                |
| **G.9‑2 `Run_Parity`**             | `ParityPlan@Context`, `TaskSignatureRef` (S2), **G.5‑3 Select**                                                                                  | Selector outputs (portfolio/archives/sets as refs), DRR+SCR pins with `PathId[]`/`PathSliceId?` |
| **G.9‑3 `Publish_ParityReport`**   | Run artefacts + trace + active pins                                                                                                              | `ParityReport@Context` (UTS entry; audit‑addressable; emits canonical RSCR ids)                 |
| **G.9‑4 `Expose_ParityTelemetry`** | Telemetry deltas (archive changes, coverage/regret signals, etc.)                                                                                | Telemetry events carrying `PathSliceId?`, policy‑ids, and edition pins for refresh wiring       |

*Surfaces are conceptual; serialisations belong in shipping/interop surfaces (see `G.10` / interop annexes), not in `G.9`.*
