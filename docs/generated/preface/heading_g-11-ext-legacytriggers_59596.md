---
title: "G.11:Ext.LegacyTriggers"
description: "Generated reference page for heading:g-11-ext-legacytriggers:59596."
---

# G.11:Ext.LegacyTriggers
> Preface node `heading:g-11-ext-legacytriggers:59596`

## Content

**PatternScopeId:** `G.11:Ext.LegacyTriggers`
**GPatternExtensionId:** `LegacyTriggers`
**GPatternExtensionKind:** `InteropSpecific` (back-compat / alias docking)
**SemanticOwnerPatternId:** `G.Core`
**Uses:** `{G.Core}` (cites `G.Core.TriggerAliasMap.G11`)
**⊑/⊑⁺:** `∅`
**RequiredPins / EditionPins / PolicyPins (minimum):**

* `RSCRTriggerKindId[]` (canonical ids recorded on triggers)
* `RSCRTriggerAliasId?` (e.g., `G.11:T0…T7` as labels only)
* `scope: PathSliceId[] | PatternScopeId`

**RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.FreshnessOrDecayEvent, RSCRTriggerKindId.CrossingBundleEdit, RSCRTriggerKindId.PenaltyPolicyEdit, RSCRTriggerKindId.MaturityRungChange, RSCRTriggerKindId.EvidenceSurfaceEdit}`
**Notes (wiring-only):** This block **does not define** what `T0…T7` mean; it only preserves the labels and requires docking via `G.Core.TriggerAliasMap.G11`.
