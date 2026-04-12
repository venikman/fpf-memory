---
title: "G.11:Ext.QDRefreshWiring"
description: "Generated reference page for heading:g-11-ext-qdrefreshwiring:59630."
---

# G.11:Ext.QDRefreshWiring
> Preface node `heading:g-11-ext-qdrefreshwiring:59630`

## Content

**PatternScopeId:** `G.11:Ext.QDRefreshWiring`
**GPatternExtensionId:** `QDRefreshWiring`
**GPatternExtensionKind:** `MethodSpecific`
**SemanticOwnerPatternId:** `C.18` (QD semantics; descriptor/distance/insertion)
**Uses:** `{C.18, C.19, G.5, G.8}`
**⊑/⊑⁺:** `∅`
**RequiredPins / EditionPins / PolicyPins (minimum):**

* `DescriptorMapRef.edition`, `DistanceDefRef.edition`
* `CharacteristicSpaceRef.edition?` (required when a domain-family coordinate is declared by the QD owner)
* `InsertionPolicyRef`, `EmitterPolicyRef` (policy-bound)
* `PathSliceId` (archive/illumination scope) + `policy-id` for emitted telemetry triggers

**RSCRTriggerKindIds:** `{RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange}`
**Notes (wiring-only):** `G.11` does not restate QD semantics; it ensures pins are present so reruns are comparable.
