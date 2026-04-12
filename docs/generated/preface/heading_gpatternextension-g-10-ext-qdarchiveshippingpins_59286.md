---
title: "GPatternExtension — G.10:Ext.QDArchiveShippingPins"
description: "Generated reference page for heading:gpatternextension-g-10-ext-qdarchiveshippingpins:59286."
---

# GPatternExtension — G.10:Ext.QDArchiveShippingPins
> Preface node `heading:gpatternextension-g-10-ext-qdarchiveshippingpins:59286`

## Content

**PatternScopeId:** `G.10:Ext.QDArchiveShippingPins`
**GPatternExtensionId:** `QDArchiveShippingPins`
**GPatternExtensionKind:** `MethodSpecific`
**SemanticOwnerPatternId:** `C.18` *(QD/NQD semantics live with the owner; this block is wiring-only.)*
**Uses:** `{C.18, G.5, G.8, G.11}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `DescriptorMapRef.edition`
* `DistanceDefRef.edition`
* `DHCMethodRef.edition?`
* `DHCMethodSpecRef.edition?`
* `EmitterPolicyRef` *(policy‑id / ref)*
* `InsertionPolicyRef` *(policy‑id / ref)*
* `CharacteristicSpaceRef` *(id/ref; iff archive partitioning is declared)*
* `CharacteristicSpaceRef.edition?` *(iff partitioning depends on an editioned space definition)*
* `PathSliceId[]` *(to bind telemetry/refresh scope when archive behaviour is present)*

**RSCRTriggerSetIds:** `∅` *(covered by `G.10` core linkage via `GCoreTriggerSetId.RefreshOrchestration`)*
**Notes (wiring only):**
* This block never redefines archive semantics; it only states which pins must be present in the shipped pack when QD archive fields are present.
