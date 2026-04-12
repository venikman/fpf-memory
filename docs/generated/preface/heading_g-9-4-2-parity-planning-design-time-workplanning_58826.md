---
title: "G.9:4.2 — Parity planning (design‑time / WorkPlanning)"
description: "Generated reference page for heading:g-9-4-2-parity-planning-design-time-workplanning:58826."
---

# G.9:4.2 — Parity planning (design‑time / WorkPlanning)
> Preface node `heading:g-9-4-2-parity-planning-design-time-workplanning:58826`

## Content

Planning is the act of making the parity run *reproducible by construction*:

1. **Fix the baseline set.** Choose the `BaselineSet` (MethodFamilies, and optionally GeneratorFamilies) to compare; where parity context matters, cite `SoS‑LOGBundleId?` / maturity‑rung ids by reference (acceptance-gate thresholds remain in `G.4` Acceptance).
2. **Bind scope.** Fix `describedEntity := ⟨GroundingHolon, ReferencePlane⟩` and record it in the plan (no silent widening/narrowing).
3. **Define baseline-set reference.** Declare what counts as “baseline set” and how it is cited (e.g., `BaselineBindingRef`, the evidence-backed baseline-set reference, pointing to an EvidenceGraph path slice or an upstream shipped artefact id).
4. **Equalise window (and budget, if pinned).** Declare a single `FreshnessWindows` and apply it across all baselines; if `Budgeting` is used/pinned, it MUST be shared/pinned across baselines as well.

When specialization is the live burden, the same plan should also hold constant the declared task family or target scope cut, the work-measure threshold target, adaptation budget, prior exposure declaration, and freshness window; if transfer, retention, downstream exploitation efficiency, downside burden, or corridor entry are part of the claim, those pins should be explicit as well, including the baseline relative to which corridor entry is being claimed.

5. **Pin governance, legality, and comparator references.** `CNSpecRef`, `CGSpecRef`, and `ComparatorSpecRef` are referenced with explicit edition pins.
6. **Pin measurement/comparator definitions (conditional).** Where parity depends on mode‑specific artefacts (e.g., DHC/QD/OEE), pin the relevant definition ids/editions/policies. The minimum required pins are declared by the applicable `Extensions` blocks (e.g., `G.9:Ext.DHCParityPins`, `G.9:Ext.QDArchiveParity`, `G.9:Ext.OEEParity`) and the referenced surfaces they cite.
7. **Bind comparator choice to CG‑Spec (legality).** Any numeric comparison/aggregation MUST be CSLC‑lawful and cite the corresponding CG‑Spec entry (via `ComparatorSpecRef`). If Characteristics differ by unit/scale/space, the plan MUST declare the ids used for “normalize, then compare” (`UNM_id?`, `NormalizationMethodId[]?`, `NormalizationMethodInstanceId[]?`) — ids only; semantics are defined elsewhere.
8. **Declare order & portfolio semantics.** Parity MUST preserve set‑return semantics; `PortfolioMode`/`DominanceRegime` are either explicitly pinned or routed via `G.Core.DefaultOwnershipIndex`. IlluminationSummary/coverage/regret remain telemetry unless a CAL policy explicitly promotes them (policy‑id pinned & recorded).
9. **Attach planned baselines (when applicable).** If parity depends on planned slot fillings, the plan cites the relevant `SlotFillingsPlanItem` refs (A.15.3) via `PlanItemRefs[]` rather than embedding a competing baseline object (nil‑elision when unused).
10. **Route crossings (when invoked).** Cross‑Context/plane/Kind reuse requires explicit Bridge/CL/Φ pins; penalties route to `R_eff` only (invariants routed via `G.Core`).
