---
title: "G.12:4.1 — Objects (LEX heads; twin‑register discipline)"
description: "Generated reference page for heading:g-12-4-1-objects-lex-heads-twin-register-discipline:59871."
---

# G.12:4.1 — Objects (LEX heads; twin‑register discipline)
> Preface node `heading:g-12-4-1-objects-lex-heads-twin-register-discipline:59871`

## Content

All objects below are **notation‑independent**; serialisations (if any) live under shipping/interop ownership, not here.

**(1) `DHCSeries@Context`** *(UTS‑published dashboard series; C.21‑grounded)*
A time‑indexed publication of computed DHC readings for a `Discipline × ContextSlice`, aligned with `U.DHCSeries` semantics from **C.21** and pinned to method/contract refs.

Minimal fields (conceptual; ids/pins only):

`DHCSeries@Context := ⟨  
  DHCSeriesId,  
  CG-FrameContext,  
  describedEntity := ⟨GroundingHolon, ReferencePlane⟩,  
  TargetSlice,                         // USM tuple; time series varies Γ_time across rows (explicit, no implicit “latest”)  
  DHCSlotId[],                         // slot set selected from C.21 (typed DHC slots; not “just Characteristic ids”)  
  DHCPackRef.edition?,  
  DHCMethodSpecRef.edition,  
  WindowSpec?,                         // optional window-family spec used to generate per-row Γ_time  
  CNSpecRef.edition, CGSpecRef.edition,  
  EvidenceGraphId?,                    // if resolvable; else row-level Path pins suffice  
  DashboardSliceId[]?,                 // published view slices (optional)  
  TelemetryPinSetId?                   // wiring to refresh (conceptual)  
⟩`

**(2) `DHCRow@Context`** *(one timepoint / window reading; Work/Audit‑citable)*
A single computed row of the series.

`DHCRow@Context := ⟨  
  DHCRowId,  
  DHCSeriesId,  
  Γ_time,  
  DesignRunTag = run,  
  DHCSlotId,  
  value, units/scaleRef?, compareOnly?,  
  stance ∈ {pass|degrade|abstain},  
  DHCMethodRef.edition, DHCMethodSpecRef.edition,  
  PathSliceId[], PathId[]?, EvidenceGraphId?,  
  evidenceLaneTags? := {TA|VA|LA},  
  crossingPins? := ⟨BridgeId[], PlaneMapRef.edition?, CL/CL^k/CL^plane?, Φ/Ψ/Φ_plane policy‑ids…⟩  
⟩`

**(3) `DashboardSlice@Context`** *(view; non‑semantic)*
A view‑friendly grouping over one or more series/rows. It MUST NOT introduce new aggregation/legality semantics; it is a projection over already computed, pinned, citable rows.

`DashboardSlice@Context := ⟨  
  DashboardSliceId(UTS),  
  DHCSeriesId(UTS)[],  
  SliceAnnotations?,                  // labels, grouping metadata, explanatory text  
  ViewSpecId?,                        // view template id (policy‑bound; no semantics implied)  
  IncludedRowIds?  
⟩`

**(4) `DHCTelemetryPin`** *(refresh wiring pin; id‑based causes)*
A conceptual telemetry pin emitted to refresh/orchestration (owner: **G.11**) with canonical trigger kind ids.

`DHCTelemetryPin := ⟨  
  triggerKindId: RSCRTriggerKindId,  
  scope: PathSliceId[] | PatternScopeId,  
  payloadPins: { …ids… }              // editions, policy‑ids, UTS row ids, window ids, etc.  
⟩`

**Ref discipline.** `.edition` SHALL appear only on `…Ref` (per **E.10**). Dashboard artefacts that mint public ids publish **Tech/Plain twins** (UTS discipline).
