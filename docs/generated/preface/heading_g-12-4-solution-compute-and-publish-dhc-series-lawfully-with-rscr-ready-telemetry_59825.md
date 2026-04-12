---
title: "G.12:4 — Solution — Compute and publish DHC series lawfully, with RSCR‑ready telemetry"
description: "Generated reference page for heading:g-12-4-solution-compute-and-publish-dhc-series-lawfully-with-rscr-ready-telemetry:59825."
---

# G.12:4 — Solution — Compute and publish DHC series lawfully, with RSCR‑ready telemetry
> Preface node `heading:g-12-4-solution-compute-and-publish-dhc-series-lawfully-with-rscr-ready-telemetry:59825`

## Content

## G.12:4.0 — G.Core linkage (normative)

This pattern is **core‑invariant‑bearing** and therefore binds to **G.Core** by declaration (not by restating invariants here).

**GCoreLinkageManifest (G.12)** *(normative; expands per `G.Core:4.2`)*
Effective obligations/pins/triggers are computed as **union(expand(sets), explicit deltas)** under `Nil‑elision`.

* `CoreConformanceProfileIds` := {
  `GCoreConformanceProfileId.PartG.AuthoringBase`,
  `GCoreConformanceProfileId.PartG.TriStateGuard`,
  `GCoreConformanceProfileId.PartG.UTSWhenPublicIdsMinted`,
  `GCoreConformanceProfileId.PartG.ShippingBoundary`
  }

* `RSCRTriggerSetIds` := {
  `GCoreTriggerSetId.BridgeCalibrationKit`
  }

* `RSCRTriggerKindIds` := {
  `RSCRTriggerKindId.LegalitySurfaceEdit`
  }
  *(Any additional causes required by optional dashboard panels MUST be introduced only by the corresponding `GPatternExtension` blocks in `G.12:4.9`.)*

* `DefaultsConsumed` := `∅`
  *(Default routing for `DefaultId.PortfolioMode` / `DefaultId.DominanceRegime` is only relevant when portfolio outputs are consumed; see `G.12:Ext.PortfolioTelemetry`.)*

* `CorePinSetIds` := {
  `GCorePinSetId.PartG.AuthoringMinimal`,
  `GCorePinSetId.PartG.CrossingVisibilityPins`
  }

* `CorePinsRequired` *(pattern delta; pin names only; all are id‑valued unless noted)* := {
  `DHCSeriesId`,
  `TargetSlice` *(USM tuple; varies only by `Γ_time` across rows; no implicit “latest”)*,
  `Γ_time` *(time selector / freshness window; required per row; series MAY additionally declare a window‑family spec)*,
  `DHCSlotId[]` *(C.21‑owned typed DHC slots; each resolves to `CharacteristicId` + scale/unit/polarity + reference plane binding + lane discipline)*,
  `DHCMethodSpecRef.edition`,
  `DHCMethodRef.edition`,
  `PathSliceId[]`
  }
  *(Nil‑elision applies. All other definition pins are conditional: they MUST appear only when actually used and when their semantic owner/extension is present (e.g., UNM/normalization pins, QD/OEE telemetry pins, transfer rules pins, pack inclusion pins).)*

* `TriggerAliasMapRef` := `∅`
## G.12:4.1 — Objects (LEX heads; twin‑register discipline)

All objects below are **notation‑independent**; serialisations (if any) live under shipping/interop ownership, not here.

**(1) `DHCSeries@Context`** *(UTS‑published dashboard series; C.21‑grounded)*
A time‑indexed publication of computed DHC readings for a `Discipline × ContextSlice`, aligned with `U.DHCSeries` semantics from **C.21** and pinned to method/contract refs.

Minimal fields (conceptual; ids/pins only):

`DHCSeries@Context := ⟨  
  DHCSeriesId,  
  CG-FrameContext,  
  describedEntity := ⟨GroundingHolon, ReferencePlane⟩,  
  TargetSlice,                         // USM tuple; time series varies Γ_time across rows (explicit, no implicit “latest”)  
  DHCSlotId[],                         // slot set selected from C.21 (typed DHC slots; not “just Characteristic ids”)  
  DHCPackRef.edition?,  
  DHCMethodSpecRef.edition,  
  WindowSpec?,                         // optional window-family spec used to generate per-row Γ_time  
  CNSpecRef.edition, CGSpecRef.edition,  
  EvidenceGraphId?,                    // if resolvable; else row-level Path pins suffice  
  DashboardSliceId[]?,                 // published view slices (optional)  
  TelemetryPinSetId?                   // wiring to refresh (conceptual)  
⟩`

**(2) `DHCRow@Context`** *(one timepoint / window reading; Work/Audit‑citable)*
A single computed row of the series.

`DHCRow@Context := ⟨  
  DHCRowId,  
  DHCSeriesId,  
  Γ_time,  
  DesignRunTag = run,  
  DHCSlotId,  
  value, units/scaleRef?, compareOnly?,  
  stance ∈ {pass|degrade|abstain},  
  DHCMethodRef.edition, DHCMethodSpecRef.edition,  
  PathSliceId[], PathId[]?, EvidenceGraphId?,  
  evidenceLaneTags? := {TA|VA|LA},  
  crossingPins? := ⟨BridgeId[], PlaneMapRef.edition?, CL/CL^k/CL^plane?, Φ/Ψ/Φ_plane policy‑ids…⟩  
⟩`

**(3) `DashboardSlice@Context`** *(view; non‑semantic)*
A view‑friendly grouping over one or more series/rows. It MUST NOT introduce new aggregation/legality semantics; it is a projection over already computed, pinned, citable rows.

`DashboardSlice@Context := ⟨  
  DashboardSliceId(UTS),  
  DHCSeriesId(UTS)[],  
  SliceAnnotations?,                  // labels, grouping metadata, explanatory text  
  ViewSpecId?,                        // view template id (policy‑bound; no semantics implied)  
  IncludedRowIds?  
⟩`

**(4) `DHCTelemetryPin`** *(refresh wiring pin; id‑based causes)*
A conceptual telemetry pin emitted to refresh/orchestration (owner: **G.11**) with canonical trigger kind ids.

`DHCTelemetryPin := ⟨  
  triggerKindId: RSCRTriggerKindId,  
  scope: PathSliceId[] | PatternScopeId,  
  payloadPins: { …ids… }              // editions, policy‑ids, UTS row ids, window ids, etc.  
⟩`

**Ref discipline.** `.edition` SHALL appear only on `…Ref` (per **E.10**). Dashboard artefacts that mint public ids publish **Tech/Plain twins** (UTS discipline).
## G.12:4.2 — Method‑of‑Obtaining Output (generation‑first; design‑time → run‑time)

**Stage A — Author & bind (design‑time)**

A1. **Select the DHC slot set (owner: C.21).**
Choose `DHCSlotId[]` from **C.21** (typed DHC slots), and declare the series scope explicitly as `TargetSlice` (USM tuple) plus an explicit time selector (`Γ_time` per row; optionally a `WindowSpec` that generates the row windows). Do not restate slot semantics in the dashboard kit; cite the C.21 owners.

A2. **Bind governance card and legality gate (owners: A.19, G.0).**
Pin `CNSpecRef.edition` and `CGSpecRef.edition`. Any normalization or numeric comparability assumptions are expressed by explicit CN‑Spec artefacts (ids/refs) and any numeric legality requirements cite CG‑Spec artefacts (SCP / MinimalEvidence / Γ‑fold pins as applicable). The dashboard does not introduce local “shadow specs”.
If the dashboard series/slice actually uses cross‑Context or cross‑plane routing, it MUST additionally pin the relevant crossing and penalty‑policy surfaces as ids (Bridge/CL/plane ids, `Φ/Ψ/Φ_plane` policy‑ids, `PlaneMapRef.edition?`) and cite their semantic owners (typically `G.7` for bridge calibration/CL kits, routed via `G.Core`). The dashboard MUST NOT encode a dashboard‑local “penalty regime”.

A3. **Pin computation methods (owner: C.21).**
For each slot/method used to compute a time series value, record `DHCMethodSpecRef.edition` and `DHCMethodRef.edition` (table‑backed, per C.21). The dashboard series is edition‑aware: if a method spec changes, the dashboard either forks the series edition or emits telemetry and refreshes under explicit pins.

A4. **Declare optional panels via Extensions only.**
If the dashboard depends on (i) selector portfolio outputs, (ii) QD illumination / archive telemetry, (iii) open‑endedness telemetry, (iv) maturity ladder views, or (v) pack inclusion, then the relevant `GPatternExtension` block(s) in `G.12:4.9` MUST be present and their pins MUST be satisfied.

**Stage B — Compute rows (run‑time; Work/Audit)**

B1. **Resolve evidence by Path (owner: G.6).**
Compute rows from evidence cited as `PathSliceId[]` (and `PathId[]` when needed), under the declared window/freshness regime. Preserve lane discipline and handle missingness using tri‑state stances (routed via **G.Core**).

B2. **Compute slot values using pinned methods (owner: C.21).**
Compute each slot value by applying the pinned `DHCMethodRef.edition`/`DHCMethodSpecRef.edition` under the pinned governance card and legality gate. Enforce “no illicit arithmetic” for ordinals/categoricals as a dashboard‑kit obligation (see CC‑G12.\*).
Any cross‑Context/plane use is expressed only via explicit crossing pins (Bridge/Plane routing) and policy ids (routed via **G.Core**).

B3. **Emit RSCR‑actionable telemetry pins (owner: G.11).**
When any of the declared pins/editions/policies/windows/evidence slices change, emit `DHCTelemetryPin` events with canonical `RSCRTriggerKindId` and payload pins sufficient for **slice‑scoped** refresh planning.

**Stage C — Publish series & slices (run‑time; publication)**

C1. **Publish `DHCRow@Context` and `DHCSeries@Context` as UTS artefacts.**
Mint/publish UTS rows with Tech/Plain twins and include the required pins (window, reference plane, method editions, evidence paths).

C2. **Publish `DashboardSlice@Context` as a view‑only projection.**
Slices are groupings/annotations over already computed rows; they must not redefine legality, acceptance, or scalarization.

C3. **Wire refresh via telemetry pins (no orchestration ownership).**
Dashboards emit pins; refresh orchestration remains owned by **G.11**.
## G.12:4.9 — Extensions (pattern‑scoped; non‑core)

> **Extension rule (Phase‑2).** Anything method‑, generator‑, or view‑family‑specific belongs here, as `GPatternExtension` modules. These modules may add **mode‑specific definition pins** and additional RSCR trigger kinds, but MUST NOT redefine Part‑G‑wide invariants or defaults.

### G.12:Ext.SoTAPalette — SoTA palette & DHC alignment hooks (optional)

**PatternScopeId:** `G.12:Ext.SoTAPalette`
**GPatternExtensionId:** `SoTAPalette`
**GPatternExtensionKind:** `InteropSpecific`
**SemanticOwnerPatternId:** `G.2` *(SoTA palette + DHC alignment hooks semantics live in G.2; G.12 only wires them)*
**Uses:** `{G.2}`
**⊑/⊑⁺:** `∅`

**RequiredPins/EditionPins/PolicyPins (minimum):**

* `SoTA_PackRef.edition?`
* `DHC-SenseCellId[]?` *(when series pins to DHC alignment hooks / sense‑cell inventories)*
* `DHCAlignmentHookId[]?`

**RSCRTriggerKindIds (delta):** `∅`
### G.12:Ext.PortfolioTelemetry — selector/portfolio integration panel

**PatternScopeId:** `G.12:Ext.PortfolioTelemetry`
**GPatternExtensionId:** `PortfolioTelemetry`
**GPatternExtensionKind:** `MethodSpecific`
**SemanticOwnerPatternId:** `G.5` *(portfolio semantics and set‑return discipline)*
**Uses:** `{G.5, G.6}`
**⊑/⊑⁺:** `∅`

**RequiredPins/EditionPins/PolicyPins (minimum):**

* `TaskSignatureRef?` *(when portfolio semantics depend on TaskSignature traits)*
* `DominanceRegime` *(resolved via `DefaultId.DominanceRegime` owner routing; publish the resolved regime, do not invent a local default)*
* `PortfolioMode` *(resolved via `DefaultId.PortfolioMode` owner routing; publish the resolved mode)*
* `SCRId/DRRId` *(or equivalent selector evidence pins, when dashboard row depends on selector outcomes)*

**DefaultsConsumed:** {`DefaultId.DominanceRegime`, `DefaultId.PortfolioMode`} *(owners routed via `G.Core.DefaultOwnershipIndex`; no local defaults)*

**RSCRTriggerKindIds (delta):** `∅` *(base triggers suffice; any extra triggers must be explicit)*

**Notes (wiring‑only):**

* The dashboard may visualise portfolio/Archive telemetry, but MUST keep set‑returning semantics; any scalar “headline number” is a view projection, not a legality‑bearing decision.
### G.12:Ext.QDTelemetry — illumination / archive telemetry panel

**PatternScopeId:** `G.12:Ext.QDTelemetry`
**GPatternExtensionId:** `QDTelemetry`
**GPatternExtensionKind:** `MethodSpecific`
**SemanticOwnerPatternId:** `C.18` *(QD / NQD‑CAL semantics; descriptor/distance/insertion policy)*
**Uses:** `{C.18, G.5, G.11}`
**⊑/⊑⁺:** `∅`

**RequiredPins/EditionPins/PolicyPins (minimum):**

* `DescriptorMapRef.edition`
* `DistanceDefRef.edition`
* `CharacteristicSpaceSpecRef.edition?` *(iff the descriptor/axis space is editioned as a published surface; required for view reproducibility)*
* `InsertionPolicyRef`
* `EmitterPolicyRef?`
* `ArchiveSnapshotRef?` *(id/pin for the published archive snapshot, if any)*
* `PathSliceId[]` *(scope for refresh; slice‑keyed)*

**RSCRTriggerKindIds (delta):** `∅` *(base trigger set already includes `RSCRTriggerKindId.TelemetryDelta`; add only genuinely additional kinds here)*

**Notes (wiring‑only):**

* Illumination/coverage signals are treated as telemetry. Any promotion of telemetry into selection dominance is owned elsewhere (typically CAL policy; routed via `G.Core`).
* If descriptor axes/dimensions are surfaced as published identifiers (not just local UI text), they MUST follow the Tech/Plain twin‑label discipline (UTS Name Cards); otherwise they remain non‑normative view annotations.
### G.12:Ext.OpenEndedTelemetry — open‑endedness / transfer telemetry panel

**PatternScopeId:** `G.12:Ext.OpenEndedTelemetry`
**GPatternExtensionId:** `OpenEndedTelemetry`
**GPatternExtensionKind:** `GeneratorSpecific`
**SemanticOwnerPatternId:** `C.19` *(E/E‑LOG & exploration accounting; generator/transfer telemetry wiring)*
**Uses:** `{C.19, G.5, G.11}`
**⊑/⊑⁺:** `∅`

**RequiredPins/EditionPins/PolicyPins (minimum):**

* `TransferRulesRef.edition` *(when transfer rules are part of the telemetry interpretation)*
* `EnvironmentValidityRegionId?`
* `ProbeBudgetPolicyId?`
* `PathSliceId[]`

**RSCRTriggerKindIds (delta):** `∅` *(base trigger set already includes `RSCRTriggerKindId.TelemetryDelta`; add only genuinely additional kinds here)*

**Notes (wiring‑only):**

* Open‑endedness metrics are telemetry‑level artefacts; dashboards must not silently convert them into “dominance objectives”.
### G.12:Ext.MaturityLadderPanel — maturity ladder view (optional)

**PatternScopeId:** `G.12:Ext.MaturityLadderPanel`
**GPatternExtensionId:** `MaturityLadderPanel`
**GPatternExtensionKind:** `DisciplineSpecific`
**SemanticOwnerPatternId:** `G.8` *(maturity ladder semantics in SoS‑LOG bundle/maturity cards)*
**Uses:** `{G.8, G.6, G.11}`
**⊑/⊑⁺:** `∅`

**RequiredPins/EditionPins/PolicyPins (minimum):**

* `MaturityCardRef`
* `MaturityRungId?`
* `PathId/PathSliceId` *(evidence citations for rung claims)*

**RSCRTriggerKindIds (delta):** `{RSCRTriggerKindId.MaturityRungChange}`
### G.12:Ext.PackInclusion — shipping inclusion stub (optional)

**PatternScopeId:** `G.12:Ext.PackInclusion`
**GPatternExtensionId:** `PackInclusion`
**GPatternExtensionKind:** `InteropSpecific`
**SemanticOwnerPatternId:** `G.10` *(shipping owner)*
**Uses:** `{G.10}`
**⊑/⊑⁺:** `∅`

**RequiredPins/EditionPins/PolicyPins (minimum):**

* `SoTA‑PackId`
* `DashboardSliceId(UTS)` *(or `DHCSeriesId(UTS)` when shipping series directly)*
* `CNSpecRef.edition`, `CGSpecRef.edition` *(as shipped pins, per G.10 wiring)*

**RSCRTriggerKindIds (delta):** `∅`

**Notes (wiring‑only):**

* This module is a wiring stub: it does not define shipping behaviour; it only states which dashboard artefacts may be cited by `SoTA‑Pack(Core)`.
### G.12:Ext.ViewFamilySeed — advanced view families (Phase‑3 seed; owner TBD)

**PatternScopeId:** `G.12:Ext.ViewFamilySeed`
**GPatternExtensionId:** `ViewFamilySeed`
**GPatternExtensionKind:** `Phase3Seed`
**SemanticOwnerPatternId:** `owner TBD`
**Uses:** `{}`
**⊑/⊑⁺:** `∅`

**Notes (Phase‑3 seed; non‑normative):**

* Placeholder for advanced dashboard view families (e.g., embedding‑based similarity panels, predictive drift detectors, change‑point overlays). Any such module must remain policy‑bound and must not introduce new Part‑G‑wide norms.
