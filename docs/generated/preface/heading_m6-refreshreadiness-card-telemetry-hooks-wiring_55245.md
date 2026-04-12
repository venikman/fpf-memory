---
title: "M6 — RefreshReadiness Card (telemetry hooks + wiring)"
description: "Generated reference page for heading:m6-refreshreadiness-card-telemetry-hooks-wiring:55245."
---

# M6 — RefreshReadiness Card (telemetry hooks + wiring)
> Preface node `heading:m6-refreshreadiness-card-telemetry-hooks-wiring:55245`

## Content

**Owns (kit surface):**

* `RefreshReadinessCardId` bound to `CGFrameLibraryId` (and thus to `CG‑FrameContext`)
* `CGKitId` (the versioned kit manifest) binding `M1…M6` into a single reusable unit; it MUST enumerate the card ids and MAY carry references to deprecations/edition bumps minted by the canonical owners
* declared telemetry hooks (what signals are observed, with what pins)
* declared RSCR wiring: which `RSCRTriggerKindId` are relevant (canonical ids), with minimal required payload pins (including `SlotFillingsPlanItemRef[]` when the chassis is bound into WorkPlanning)

**Boundary:** orchestration semantics are owned by `G.11`.
M6 prepares *refresh‑readiness metadata* and wiring stubs; it does not define scheduling/priority heuristics.
