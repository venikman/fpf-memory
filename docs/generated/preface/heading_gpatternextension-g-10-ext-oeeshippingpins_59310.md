---
title: "GPatternExtension — G.10:Ext.OEEShippingPins"
description: "Generated reference page for heading:gpatternextension-g-10-ext-oeeshippingpins:59310."
---

# GPatternExtension — G.10:Ext.OEEShippingPins
> Preface node `heading:gpatternextension-g-10-ext-oeeshippingpins:59310`

## Content

**PatternScopeId:** `G.10:Ext.OEEShippingPins`
**GPatternExtensionId:** `OEEShippingPins`
**GPatternExtensionKind:** `GeneratorSpecific`
**SemanticOwnerPatternId:** `G.5` *(generator family registry / transfer wiring is owned upstream; this block is pack‑wiring only.)*
**Uses:** `{G.5, G.11}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `TransferRulesRef.edition`
* `EnvironmentValidityRegion?` *(id/ref; iff an explicit region is declared as part of generator family wiring)*
* `PathSliceId[]` *(scope key for refreshable generator telemetry when present)*

**RSCRTriggerSetIds:** `∅` *(covered by the core trigger set)*
**Notes (wiring only):**
* “Open‑endedness” semantics remain owner‑defined; the pack only carries the pins required to make the shipped claim replayable/auditable.
