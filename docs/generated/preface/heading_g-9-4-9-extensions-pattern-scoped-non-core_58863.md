---
title: "G.9:4.9 — Extensions (pattern‑scoped; non‑core)"
description: "Generated reference page for heading:g-9-4-9-extensions-pattern-scoped-non-core:58863."
---

# G.9:4.9 — Extensions (pattern‑scoped; non‑core)
> Preface node `heading:g-9-4-9-extensions-pattern-scoped-non-core:58863`

## Content

Most working readers can stop after `G.9:4.3a`. The blocks below are binding-only wiring records used only when the corresponding parity mode is actually active.

The following blocks store **wiring only** (pins/refs/policy‑ids, relevant triggers, and `Uses`), while semantics remains defined in the referenced patterns.

**GPatternExtension block: `G.9:Ext.CrossTraditionParity`**
**GPatternExtension: CrossTraditionParity**
* **PatternScopeId:** `G.9:Ext.CrossTraditionParity`
* **GPatternExtensionId:** `CrossTraditionParity`
* **GPatternExtensionKind:** `DisciplineSpecific`
* **SemanticOwnerPatternId:** `G.7`
* **Uses:** `{G.7, F.9, E.18, A.21}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum; conditional on use):**
  * `BridgeId/BridgeCardId[]`
  * `BridgeMatrixId?`
  * `CalibrationLedgerId?` / `BCT.id?`
  * `RegressionSetId?` / `SentinelId[]?` *(when sentinel wiring is used)*
  * `CL/CL^k/CL^plane`
  * `Φ(CL) policy-id`, `Φ_plane policy-id`, `Ψ(CL^k) policy-id?`
  * `CrossingBundleId?`
* **RSCRTriggerSetIds:** `{GCoreTriggerSetId.BridgeCalibrationKit}` *(preferred; expands in `G.Core`)*  
* **RSCRTriggerKindIds (delta, if any):** `∅`
* **Notes (wiring-only):** This block does not define CL/Φ/Ψ semantics; it only requires the pins needed to cite calibration artefacts and crossing visibility bundles.

**GPatternExtension block: `G.9:Ext.SoSLogGuardNarration`**
**GPatternExtension: SoSLogGuardNarration**
* **PatternScopeId:** `G.9:Ext.SoSLogGuardNarration`
* **GPatternExtensionId:** `SoSLogGuardNarration`
* **GPatternExtensionKind:** `MethodSpecific`
* **SemanticOwnerPatternId:** `C.23`
* **Uses:** `{C.23, G.6, G.4}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum; conditional on use):**
  * `SoSLogRuleId[]` / `BranchId[]` *(ids as cited labels; semantics come from `C.23`)*
  * `FailureBehaviorPolicyId/SoSLogBranchId`
  * `EvidenceTrace.PathId[]` / `PathSliceId?`
  * `AcceptanceClauseId[]` *(when referenced)*
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.EvidenceSurfaceEdit, RSCRTriggerKindId.MaturityRungChange, RSCRTriggerKindId.TelemetryDelta}`
* **Notes (wiring-only):** Explains **why** a parity run degraded/abstained by citing SoS‑LOG ids and evidence paths; does not redefine guard semantics.

**GPatternExtension block: `G.9:Ext.DHCParityPins`**
**GPatternExtension: DHCParityPins**
* **PatternScopeId:** `G.9:Ext.DHCParityPins`
* **GPatternExtensionId:** `DHCParityPins`
* **GPatternExtensionKind:** `MethodSpecific`
* **SemanticOwnerPatternId:** `C.21`
* **Uses:** `{C.21}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum; conditional on use):**
  * `DHCMethodRef.edition`
  * `DHCMethodSpecRef.edition?` *(when the cited DHC contract distinguishes method vs method-spec editions)*
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.EvidenceSurfaceEdit}`
* **Notes (wiring-only):** Declares the pins required to make DHC‑based parity reproducible and RSCR‑refreshable; semantics of DHC lives in `C.21`.

**GPatternExtension block: `G.9:Ext.QDArchiveParity`**
**GPatternExtension: QDArchiveParity**
* **PatternScopeId:** `G.9:Ext.QDArchiveParity`
* **GPatternExtensionId:** `QDArchiveParity`
* **GPatternExtensionKind:** `MethodSpecific`
* **SemanticOwnerPatternId:** `C.18`
* **Uses:** `{C.18, C.19, G.5}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum; conditional on use):**
  * `DescriptorMapRef.edition`
  * `DistanceDefRef.edition`
  * `CharacteristicSpaceRef.edition?` *(when discretisation/topology is referenced)*
  * `EmitterPolicyRef`
  * `InsertionPolicyRef`
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta}`
* **Notes (wiring-only):** Post‑2015 QD families are referenced here only as wiring + edition/policy pin obligations (semantics come from `C.18`/`C.19`/`G.5`).

**GPatternExtension block: `G.9:Ext.OEEParity`**
**GPatternExtension: OEEParity**
* **PatternScopeId:** `G.9:Ext.OEEParity`
* **GPatternExtensionId:** `OEEParity`
* **GPatternExtensionKind:** `MethodSpecific`
* **SemanticOwnerPatternId:** `C.19`
* **Uses:** `{C.19, G.5}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum; conditional on use):**
  * `TransferRulesRef.edition`
  * `EnvironmentValidityRegionId`
  * `ExplorationBudgetPolicyId?`
  * `EvidenceTrace.PathSliceId?` *(for transfer‑keyed events)*
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta}`
* **Notes (wiring-only):** Open‑ended parity is expressed as policy/edition pins + telemetry wiring, not as new core norms.
