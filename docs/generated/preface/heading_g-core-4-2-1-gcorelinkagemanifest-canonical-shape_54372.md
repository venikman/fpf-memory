---
title: "G.Core:4.2.1 - GCoreLinkageManifest (canonical shape)"
description: "Generated reference page for heading:g-core-4-2-1-gcorelinkagemanifest-canonical-shape:54372."
---

# G.Core:4.2.1 - GCoreLinkageManifest (canonical shape)
> Preface node `heading:g-core-4-2-1-gcorelinkagemanifest-canonical-shape:54372`

## Content

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
