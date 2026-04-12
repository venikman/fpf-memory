---
title: "G.11:Ext.DecayAndDebt"
description: "Generated reference page for heading:g-11-ext-decayanddebt:59613."
---

# G.11:Ext.DecayAndDebt
> Preface node `heading:g-11-ext-decayanddebt:59613`

## Content

**PatternScopeId:** `G.11:Ext.DecayAndDebt`
**GPatternExtensionId:** `DecayAndDebt`
**GPatternExtensionKind:** `DisciplineSpecific`
**SemanticOwnerPatternId:** `B.3.4` (freshness/decay semantics)
**Uses:** `{B.3.4, G.6}`
**⊑/⊑⁺:** `∅`
**RequiredPins / EditionPins / PolicyPins (minimum):**

* `FreshnessWindowDeclRef` (or equivalent window pin, as defined by the owner)
* `DecayPolicyIdRef` / `EpistemicDebtBudgetRef` (policy-bound)
* `PathSliceId[]` (affected evidence carriers)

**RSCRTriggerKindIds:** `{RSCRTriggerKindId.FreshnessOrDecayEvent, RSCRTriggerKindId.EvidenceSurfaceEdit, RSCRTriggerKindId.BaselineBindingEdit}`
**Notes (wiring-only):** Any budget/priority logic remains policy-bound; `G.11` only wires decay events to refresh planning.
