---
title: "G.Core:4.2.3 - GCorePinSetId catalogue (compression primitive)"
description: "Generated reference page for heading:g-core-4-2-3-gcorepinsetid-catalogue-compression-primitive:54400."
---

# G.Core:4.2.3 - GCorePinSetId catalogue (compression primitive)
> Preface node `heading:g-core-4-2-3-gcorepinsetid-catalogue-compression-primitive:54400`

## Content

A `GCorePinSetId` is a stable identifier for a named set of commonly recurring **pin obligations** used in Part‑G kits. It exists solely to reduce repetition in `G.x` linkage sections (no new semantics).

**Conditional pins (normative).** In pin‑set expansions below, a pin marked with `?` is **conditional**: it **MUST** be present iff the pattern actually uses the corresponding surface/artefact class; otherwise it MAY be omitted (nil‑elision permitted) and is treated as `∅`. A `G.x` MAY strengthen a conditional pin to unconditional by listing it explicitly in `CorePinsRequired`.

| GCorePinSetId | Expands to `CorePinsRequired` (set) | Notes |
| --- | --- | --- |
| `GCorePinSetId.PartG.AuthoringMinimal` | `{CG-FrameContext, describedEntity := ⟨GroundingHolon, ReferencePlane⟩, CNSpecRef.edition, CGSpecRef.edition}` | Baseline scope+contract pins for most Part‑G authoring kits (design‑time, citable, refreshable). |
| `GCorePinSetId.PartG.CrossingVisibilityPins` | `{BridgeId/BridgeCardId, BridgeMatrixId?, CL/CL^k/CL^plane, Φ/Ψ/Φ_plane policy-ids, CrossingBundleId?, UTSRowId[]?, PathId[]/PathSliceId[]?}` | Use when the kit asserts or consumes crossings (Bridge‑only + visible). Conditional pins cover “only if that bundle is used” cases (UTS publication, path‑citable evidence, explicit CrossingBundle reference). |
