---
title: "G.Core:4.2 - Mandatory G.Core linkage contract for every G.x"
description: "Generated reference page for heading:g-core-4-2-mandatory-g-core-linkage-contract-for-every-g-x:54355."
---

# G.Core:4.2 - Mandatory G.Core linkage contract for every G.x
> Preface node `heading:g-core-4-2-mandatory-g-core-linkage-contract-for-every-g-x:54355`

## Content

Every pattern `G.x` in Part G SHALL include a short, explicit **Core linkage** section that is notation‑independent and id‑based.

* Relations: `Builds on: G.Core`.
* Solution: include a section named `G.x:<n> - G.Core linkage (normative)` that contains a `GCoreLinkageManifest` listing, at minimum:

  * `CoreConformanceProfileIds := { GCoreConformanceProfileId… }` *(preferred)* and/or `CoreConformanceIds := { CC‑GCORE‑… }`
  * `RSCRTriggerSetIds := { GCoreTriggerSetId… }` *(preferred)* and/or `RSCRTriggerKindIds := { RSCRTriggerKindId… }`
  * `CorePinSetIds := { GCorePinSetId… }` *(preferred)* and/or `CorePinsRequired := { … }` *(pins/refs surfaced by the kit; include policy‑id pins and edition pins when applicable; list only additions/overrides if pin sets are used)*
  * `DefaultsConsumed := { DefaultId… }` *(ids only; owner is resolved via `G.Core.DefaultOwnershipIndex`; cite owner, don’t restate)*
  * `TriggerAliasMapRef?` *(present or cited) if the pattern uses local trigger tokens*

**Nil‑elision (normative size rule).** Any field whose value is `∅` MAY be omitted; omission means `∅` and does not relax any obligation.

**Expansion rule (normative).** If profile/set ids are used, the effective `CoreConformanceIds` / `RSCRTriggerKindIds` / `CorePinsRequired` are the unions of their expansions plus any explicitly listed ids (see `G.Core:4.2.2`, `G.Core:4.2.3`, and `G.Core:4.3.4.2`).

## G.Core:4.2.1 - GCoreLinkageManifest (canonical shape)

`GCoreLinkageManifest` is the minimal, pattern‑local wiring manifest for citing `G.Core` without duplicating universal prose.

A `G.x` MAY render the manifest as prose, a table, or structured notation, but the ids SHALL be recoverable by authoring review:

`GCoreLinkageManifest := ⟨
  CoreConformanceProfileIds?: {GCoreConformanceProfileId…},
  CoreConformanceIds?: {CC‑GCORE‑…},
  RSCRTriggerSetIds?: {GCoreTriggerSetId…},
  RSCRTriggerKindIds?: {RSCRTriggerKindId…},
  CorePinSetIds?: {GCorePinSetId…},
  CorePinsRequired?: {…pin ids…},
  DefaultsConsumed?: {DefaultId…},
  TriggerAliasMapRef?: TriggerAliasMapRef
⟩`
## G.Core:4.2.2 - GCoreConformanceProfileId catalogue (compression primitive)

A `GCoreConformanceProfileId` is a stable identifier for a named set of `CC‑GCORE‑*` items. It exists solely to reduce repetition in `G.x` linkage sections (no new semantics).

| GCoreConformanceProfileId | Expands to `CC‑GCORE‑*` (set) | Notes |
| --- | --- | --- |
| `GCoreConformanceProfileId.PartG.AuthoringBase` | `{CC‑GCORE‑CN‑CG‑1, CC‑GCORE‑CROSS‑1, CC‑GCORE‑PEN‑1, CC‑GCORE‑SET‑1, CC‑GCORE‑P2W‑1, CC‑GCORE‑DEF‑1, CC‑GCORE‑TRIG‑1, CC‑GCORE‑TRIG‑2, CC‑GCORE‑TRIG‑3, CC‑GCORE‑TRIG‑4, CC‑GCORE‑ID‑1, CC‑GCORE‑ID‑2, CC‑GCORE‑LINK‑1, CC‑GCORE‑LINK‑2}` | Default baseline for most Part‑G kits. |
| `GCoreConformanceProfileId.PartG.TriStateGuard` | `{CC‑GCORE‑GUARD‑1}` | Add when the kit defines/consumes eligibility/guard outcomes. |
| `GCoreConformanceProfileId.PartG.UTSWhenPublicIdsMinted` | `{CC‑GCORE‑UTS‑1}` | Add when the kit mints/evolves public ids (UTS rows). |
| `GCoreConformanceProfileId.PartG.ShippingBoundary` | `{CC‑GCORE‑SKP‑1}` | Add when shipping boundaries are in scope for the kit. |
## G.Core:4.2.3 - GCorePinSetId catalogue (compression primitive)

A `GCorePinSetId` is a stable identifier for a named set of commonly recurring **pin obligations** used in Part‑G kits. It exists solely to reduce repetition in `G.x` linkage sections (no new semantics).

**Conditional pins (normative).** In pin‑set expansions below, a pin marked with `?` is **conditional**: it **MUST** be present iff the pattern actually uses the corresponding surface/artefact class; otherwise it MAY be omitted (nil‑elision permitted) and is treated as `∅`. A `G.x` MAY strengthen a conditional pin to unconditional by listing it explicitly in `CorePinsRequired`.

| GCorePinSetId | Expands to `CorePinsRequired` (set) | Notes |
| --- | --- | --- |
| `GCorePinSetId.PartG.AuthoringMinimal` | `{CG-FrameContext, describedEntity := ⟨GroundingHolon, ReferencePlane⟩, CNSpecRef.edition, CGSpecRef.edition}` | Baseline scope+contract pins for most Part‑G authoring kits (design‑time, citable, refreshable). |
| `GCorePinSetId.PartG.CrossingVisibilityPins` | `{BridgeId/BridgeCardId, BridgeMatrixId?, CL/CL^k/CL^plane, Φ/Ψ/Φ_plane policy-ids, CrossingBundleId?, UTSRowId[]?, PathId[]/PathSliceId[]?}` | Use when the kit asserts or consumes crossings (Bridge‑only + visible). Conditional pins cover “only if that bundle is used” cases (UTS publication, path‑citable evidence, explicit CrossingBundle reference). |
