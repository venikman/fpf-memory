---
title: "G.12:4.0 — G.Core linkage (normative)"
description: "Generated reference page for heading:g-12-4-0-g-core-linkage-normative:59827."
---

# G.12:4.0 — G.Core linkage (normative)
> Preface node `heading:g-12-4-0-g-core-linkage-normative:59827`

## Content

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
