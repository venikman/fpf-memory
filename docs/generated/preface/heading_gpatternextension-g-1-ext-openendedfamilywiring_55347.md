---
title: "GPatternExtension — G.1:Ext.OpenEndedFamilyWiring"
description: "Generated reference page for heading:gpatternextension-g-1-ext-openendedfamilywiring:55347."
---

# GPatternExtension — G.1:Ext.OpenEndedFamilyWiring
> Preface node `heading:gpatternextension-g-1-ext-openendedfamilywiring:55347`

## Content

**PatternScopeId:** `G.1:Ext.OpenEndedFamilyWiring`
**GPatternExtensionId:** `OpenEndedFamilyWiring`
**GPatternExtensionKind:** `GeneratorSpecific`
**SemanticOwnerPatternId:** `G.2` *(family semantics live in SoTA cards; this block only wires pins; selector‑side wiring is owned by `G.5`.)*
**Uses:** `{G.2, G.5, C.19, C.23}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `GeneratorFamilyId[]`
* `TransferRulesRef.edition` *(mandatory when Open‑Ended is enabled)*
* `EnvironmentValidityRegionRef?`
* `CoEvoCouplerRef[]?`
* `SoSLogBranchId[]?` *(when validity of generated tasks is gated by explicit branches)*

**RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.FreshnessOrDecayEvent}`

**Notes (wiring‑only):** this block enables portfolios of `{Environment, MethodFamily}` pairs without redefining generator semantics in `G.1`; it should cite/align with the selector‑side wiring in `G.5:Ext.OpenEndedFamilyWiring`.
