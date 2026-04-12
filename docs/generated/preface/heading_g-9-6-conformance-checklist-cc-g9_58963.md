---
title: "G.9:6 — Conformance Checklist (CC‑G9)"
description: "Generated reference page for heading:g-9-6-conformance-checklist-cc-g9:58963."
---

# G.9:6 — Conformance Checklist (CC‑G9)
> Preface node `heading:g-9-6-conformance-checklist-cc-g9:58963`

## Content

**CC‑G9‑CoreRef (normative; mandatory).**
G.9 conforms only if it satisfies the **effective** set of `CC‑GCORE‑*` declared in **G.9:4.0 GCoreLinkageManifest** (including trigger typing, default-routing links, and P2W split).

1. **CC‑G9.1 — Equal windows (and budgets) & pinned contract editions (local).**
   A ParityPlan **SHALL** declare a single `FreshnessWindows` shared across baselines. If `Budgeting` is used/pinned, it **SHALL** be shared across baselines as well. `ParityPinSet` **SHALL** include the edition pins required by the referenced contract/comparator surfaces (at minimum `CNSpecRef.edition`, `CGSpecRef.edition`, `ComparatorSpecRef.edition`).
   If the parity run depends on planned slot fillings (WorkPlanning baseline), the plan **SHALL** cite the relevant `SlotFillingsPlanItem` refs via `PlanItemRefs[]` (nil‑elision when not applicable).

2. **CC‑G9.2 — Mode‑specific definition pins are declared via Extensions (local; conditional).**
   When parity depends on mode‑specific artefacts beyond the pinned contract surfaces (e.g., DHC/QD/OEE), the ParityPlan/Report **SHALL** include the corresponding `GPatternExtension` blocks and satisfy their `RequiredPins/EditionPins/PolicyPins` (typically carried inside `ParityPinSet`, and echoed via pins deltas in audit):
   * DHC parity → `G.9:Ext.DHCParityPins`
   * QD archive parity → `G.9:Ext.QDArchiveParity`
   * OEE parity → `G.9:Ext.OEEParity`

3. **CC‑G9.3 — Lawful orders & lawful arithmetic (delegation point + local constraint).**
   Delegated to `CC‑GCORE‑SET‑1` (and the relevant G.5 portfolio semantics). Additionally: any numeric comparison/aggregation invoked by parity **SHALL** be CSLC‑lawful and cite the corresponding CG‑Spec entry; illegal operations (e.g., ordinal means / mixed‑scale weighted sums) **SHALL** be refused or abstained with path‑cited trace (routing only; arithmetic legality comes from `CG‑Spec`/`MM‑CHR`).

4. **CC‑G9.4 — Normalization discipline (local, routing only).**
   If Characteristics differ by unit/scale/space, the ParityPlan **SHALL** cite the lawful comparability mapping by id (`UNM_id?`, `NormalizationMethodId[]?`, `NormalizationMethodInstanceId[]?`) and compare only after that mapping is applied (“normalize, then compare”).  
   If such mapping ids are used, the ParityReport **SHALL** echo the same ids (directly or via explicit pins deltas) so the run is reproducible/auditable without out‑of‑band context.  
   The harness **SHALL NOT** define a local mapping.

5. **CC‑G9.5 — Dominance/portfolio interpretation & telemetry separation (local).**
   ParityPlan/ParityReport **SHALL** either (i) explicitly pin the applicable regime/mode via refs/policy‑ids, or (ii) cite the corresponding defaults for `DefaultId.DominanceRegime` and `DefaultId.PortfolioMode` via `G.Core.DefaultOwnershipIndex`. Any non‑default “promotion” behaviour must be policy‑bound and recorded via policy‑id pins.
   IlluminationSummary/coverage/regret **SHALL** be treated as telemetry (report‑only by default); any promotion into dominance is an explicitly pinned CAL policy and MUST be recorded in audit pins/SCR.

5a. **CC‑G9.5a — Adaptation parity disclosure (local; conditional).**
   When the parity claim concerns bounded specialization, the ParityPlan and ParityReport **SHALL** pin the declared task family or target scope cut, the work-measure threshold target, adaptation budget, prior exposure declaration, and any transfer, retention, downstream exploitation efficiency, downside burden, or corridor-entry baseline/evidence note that materially affects comparison.

6. **CC‑G9.6 — Epsilon‑front thinning (local; conditional).**
   If ε‑front thinning is used, `EpsilonDominance (ε≥0)` **SHALL** be explicit in the plan/report and pinned (param/id) such that the same ε is reproducible.

7. **CC‑G9.7 — Crossing routing (delegation point).**
   Delegated to `CC‑GCORE‑CROSS‑1` and `CC‑GCORE‑PEN‑1`. This item remains as a stable delegation point for Bridge/plane routing visibility and penalty routing discipline.

8. **CC‑G9.8 — Evidence trace completeness (local).**
   A ParityReport **SHALL** include an EvidenceTrace with `EvidenceGraphId` and the relevant `PathId[]` (and `PathSliceId?` when needed), covering both inclusions and refusals/abstains/degrades.

9. **CC‑G9.9 — Telemetry hooks are emitted with pins (local).**
   When parity emits telemetry for refresh, emitted telemetry **SHALL** carry the active edition pins and policy‑ids needed to re‑run parity (including the active subset of `ParityPinSet` relevant to the emitted event).
   In particular, telemetry items SHOULD cite `PathSliceId` when available, and **SHALL** include the policy id governing the telemetry interpretation.
   Mode‑specific definition pins **SHALL** be included as declared by the active `Extensions` blocks (e.g., `G.9:Ext.QDArchiveParity`, `G.9:Ext.OEEParity`, including `EnvironmentValidityRegionId` when OEE parity is in scope).

10. **CC‑G9.10 — RSCR parity tests are published (local).**
   Parity publication **SHALL** include RSCR parity tests (via `F.15` harness refs) that cover negative/refusal paths relevant to this plan (missing pins, edition drift, missing bridge calibration refs, etc.).

11. **CC‑G9.11 — GateCrossing visibility (delegation point).**
    Delegated to `CC‑GCORE‑CROSS‑1` and the applicable GateCrossing/CrossingBundle harness checks (E.18/A.21/A.27). This remains a stable delegation point.

12. **CC‑G9.12 — Tech‑register lexical discipline (local).**
    Tech prose and heads **SHALL** follow E.10: do not introduce drift‑prone primitives (e.g., “metric” as a Tech primitive); reference the owner’s canonical terms and pinned refs.

13. **CC‑G9.13 — MOO disclosure for parity (local).**
    `Run_Parity` / `Publish_ParityReport` **SHALL** record the ParityHarness identity (UTS ids) and the active pins required to interpret the outcome (editions + policy‑ids), so parity remains auditable without relying on “decision logs”.
