---
title: "G.12:10 — Author’s quick checklist"
description: "Generated reference page for heading:g-12-10-author-s-quick-checklist:60165."
---

# G.12:10 — Author’s quick checklist
> Preface node `heading:g-12-10-author-s-quick-checklist:60165`

## Content

1. Declare the dashboard series scope: `TargetSlice` (USM tuple), `ReferencePlane`, and an explicit `Γ_time` regime (per‑row; optionally a `WindowSpec` that yields the row windows).
2. Select `DHCSlotId[]` and cite **C.21** (do not restate slot semantics).
3. Pin `DHCMethodSpecRef.edition` and `DHCMethodRef.edition` for every computed slot/value (plus any other definition pins actually used).
4. Ensure rows are evidence‑citable by `PathSliceId[]` and include explicit `Γ_time` (row is run‑time: `DesignRunTag = run`).
5. Publish UTS artefacts with twins and the required pins.
6. Emit canonical telemetry pins (`RSCRTriggerKindId` + scope + payload pins) for `G.11`.
7. If SoTA palette hooks / portfolio / QD / OEE / maturity / shipping panels are needed, add the corresponding `G.12:Ext.*` blocks and satisfy their pins.
