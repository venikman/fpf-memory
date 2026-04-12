---
title: "G.9:4.0 — G.Core linkage (normative)"
description: "Generated reference page for heading:g-9-4-0-g-core-linkage-normative:58714."
---

# G.9:4.0 — G.Core linkage (normative)
> Preface node `heading:g-9-4-0-g-core-linkage-normative:58714`

## Content

This pattern is **core‑invariant‑bearing** and therefore binds to **G.Core** by declaration (not by restating invariants here).

**GCoreLinkageManifest (G.9)** *(normative; expands per `G.Core:4.2`)*  
Effective obligations/pins/triggers are computed as **union(expand(sets), explicit deltas)** under `Nil‑elision`.

* `CoreConformanceProfileIds` := {
  `GCoreConformanceProfileId.PartG.AuthoringBase`,
  `GCoreConformanceProfileId.PartG.TriStateGuard`,
  `GCoreConformanceProfileId.PartG.ShippingBoundary`,
  `GCoreConformanceProfileId.PartG.UTSWhenPublicIdsMinted`
  }

* `RSCRTriggerSetIds` := {
  `GCoreTriggerSetId.CGSpecGate`
  }
* `RSCRTriggerKindIds` := {
  `RSCRTriggerKindId.EvidenceSurfaceEdit`,
  `RSCRTriggerKindId.PenaltyPolicyEdit`,
  `RSCRTriggerKindId.BaselineBindingEdit`,
  `RSCRTriggerKindId.TelemetryDelta`
  }
  *(Pattern‑local deltas; cross‑tradition / bridge‑calibration causes are wired via `G.9:Ext.CrossTraditionParity` and MUST NOT over‑trigger baseline (within‑context) parity runs.)*

* `DefaultsConsumed` := {
  `DefaultId.DominanceRegime`,
  `DefaultId.PortfolioMode`,
  `DefaultId.GammaFoldForR_eff`
  }
  *(Defaults are routed via `G.Core.DefaultOwnershipIndex` (not restated here); the expected default routes are `CC‑G5.28`, `CC‑G5.23`, `CC‑G5.4` respectively.)*

* `CorePinSetIds` := {
  `GCorePinSetId.PartG.AuthoringMinimal`,
  `GCorePinSetId.PartG.CrossingVisibilityPins`
  }

* `CorePinsRequired` *(pattern delta; pin names only; all are id‑valued unless noted)* := {
  `ComparatorSpecRef.edition`,
  `FreshnessWindows`,
  `BaselineSet`, `BaselineBindingRef`,
  `ParityPinSet`,
  `PlanItemRefs[]?`,
  `EvidenceGraphId`,
  `Budgeting?`,
  `EpsilonDominance?`,
  `UNM_id?`, `NormalizationMethodId[]?`, `NormalizationMethodInstanceId[]?`,
  `SCPRef.edition?`, `MinimalEvidenceRef.edition?`
  }
*(Nil‑elision applies; mode‑specific definition pins are introduced only by the corresponding `GPatternExtension` blocks.)*

* `TriggerAliasMapRef` := `∅`
