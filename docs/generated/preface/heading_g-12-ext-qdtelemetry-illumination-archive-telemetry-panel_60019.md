---
title: "G.12:Ext.QDTelemetry — illumination / archive telemetry panel"
description: "Generated reference page for heading:g-12-ext-qdtelemetry-illumination-archive-telemetry-panel:60019."
---

# G.12:Ext.QDTelemetry — illumination / archive telemetry panel
> Preface node `heading:g-12-ext-qdtelemetry-illumination-archive-telemetry-panel:60019`

## Content

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
