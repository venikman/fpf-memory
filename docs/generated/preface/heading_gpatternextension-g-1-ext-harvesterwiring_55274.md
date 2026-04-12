---
title: "GPatternExtension — G.1:Ext.HarvesterWiring"
description: "Generated reference page for heading:gpatternextension-g-1-ext-harvesterwiring:55274."
---

# GPatternExtension — G.1:Ext.HarvesterWiring
> Preface node `heading:gpatternextension-g-1-ext-harvesterwiring:55274`

## Content

**PatternScopeId:** `G.1:Ext.HarvesterWiring`
**GPatternExtensionId:** `HarvesterWiring`
**GPatternExtensionKind:** `GeneratorSpecific`
**SemanticOwnerPatternId:** `G.2`
**Uses:** `{G.2}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `SoTAPaletteDescriptionId`
* `SoTA_SetId`
* `ClaimSheetId[]` / `BridgeMatrixId` *(as referenced by the chosen G.2 pack form)*
* `CNSpecRef.edition`, `CGSpecRef.edition` *(already required via `GCorePinSetId.PartG.AuthoringMinimal`)*
**RSCRTriggerSetIds:** `{GCoreTriggerSetId.SoTAHarvestSynthesis}`
**Notes (wiring‑only):** harvesting semantics (living review funnels, inclusion policy families, SoS indicator families, etc.) are defined by `G.2` and are not duplicated in `G.1`.
