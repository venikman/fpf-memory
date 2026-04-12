---
title: "G.12:4.2 — Method‑of‑Obtaining Output (generation‑first; design‑time → run‑time)"
description: "Generated reference page for heading:g-12-4-2-method-of-obtaining-output-generation-first-design-time-run-time:59934."
---

# G.12:4.2 — Method‑of‑Obtaining Output (generation‑first; design‑time → run‑time)
> Preface node `heading:g-12-4-2-method-of-obtaining-output-generation-first-design-time-run-time:59934`

## Content

**Stage A — Author & bind (design‑time)**

A1. **Select the DHC slot set (owner: C.21).**
Choose `DHCSlotId[]` from **C.21** (typed DHC slots), and declare the series scope explicitly as `TargetSlice` (USM tuple) plus an explicit time selector (`Γ_time` per row; optionally a `WindowSpec` that generates the row windows). Do not restate slot semantics in the dashboard kit; cite the C.21 owners.

A2. **Bind governance card and legality gate (owners: A.19, G.0).**
Pin `CNSpecRef.edition` and `CGSpecRef.edition`. Any normalization or numeric comparability assumptions are expressed by explicit CN‑Spec artefacts (ids/refs) and any numeric legality requirements cite CG‑Spec artefacts (SCP / MinimalEvidence / Γ‑fold pins as applicable). The dashboard does not introduce local “shadow specs”.
If the dashboard series/slice actually uses cross‑Context or cross‑plane routing, it MUST additionally pin the relevant crossing and penalty‑policy surfaces as ids (Bridge/CL/plane ids, `Φ/Ψ/Φ_plane` policy‑ids, `PlaneMapRef.edition?`) and cite their semantic owners (typically `G.7` for bridge calibration/CL kits, routed via `G.Core`). The dashboard MUST NOT encode a dashboard‑local “penalty regime”.

A3. **Pin computation methods (owner: C.21).**
For each slot/method used to compute a time series value, record `DHCMethodSpecRef.edition` and `DHCMethodRef.edition` (table‑backed, per C.21). The dashboard series is edition‑aware: if a method spec changes, the dashboard either forks the series edition or emits telemetry and refreshes under explicit pins.

A4. **Declare optional panels via Extensions only.**
If the dashboard depends on (i) selector portfolio outputs, (ii) QD illumination / archive telemetry, (iii) open‑endedness telemetry, (iv) maturity ladder views, or (v) pack inclusion, then the relevant `GPatternExtension` block(s) in `G.12:4.9` MUST be present and their pins MUST be satisfied.

**Stage B — Compute rows (run‑time; Work/Audit)**

B1. **Resolve evidence by Path (owner: G.6).**
Compute rows from evidence cited as `PathSliceId[]` (and `PathId[]` when needed), under the declared window/freshness regime. Preserve lane discipline and handle missingness using tri‑state stances (routed via **G.Core**).

B2. **Compute slot values using pinned methods (owner: C.21).**
Compute each slot value by applying the pinned `DHCMethodRef.edition`/`DHCMethodSpecRef.edition` under the pinned governance card and legality gate. Enforce “no illicit arithmetic” for ordinals/categoricals as a dashboard‑kit obligation (see CC‑G12.\*).
Any cross‑Context/plane use is expressed only via explicit crossing pins (Bridge/Plane routing) and policy ids (routed via **G.Core**).

B3. **Emit RSCR‑actionable telemetry pins (owner: G.11).**
When any of the declared pins/editions/policies/windows/evidence slices change, emit `DHCTelemetryPin` events with canonical `RSCRTriggerKindId` and payload pins sufficient for **slice‑scoped** refresh planning.

**Stage C — Publish series & slices (run‑time; publication)**

C1. **Publish `DHCRow@Context` and `DHCSeries@Context` as UTS artefacts.**
Mint/publish UTS rows with Tech/Plain twins and include the required pins (window, reference plane, method editions, evidence paths).

C2. **Publish `DashboardSlice@Context` as a view‑only projection.**
Slices are groupings/annotations over already computed rows; they must not redefine legality, acceptance, or scalarization.

C3. **Wire refresh via telemetry pins (no orchestration ownership).**
Dashboards emit pins; refresh orchestration remains owned by **G.11**.
