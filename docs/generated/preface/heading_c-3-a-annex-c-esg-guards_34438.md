---
title: "C.3.A:Annex C. ESG guards"
description: "Generated reference page for heading:c-3-a-annex-c-esg-guards:34438."
---

# C.3.A:Annex C. ESG guards
> Preface node `heading:c-3-a-annex-c-esg-guards:34438`

## Content

**Status note.** This profile restates the guard semantics from **§4** for ESG/Method contexts. It does **not** add obligations; where wording diverges, **§4 controls**.

## C.3.A:C.1 ESG guard obligations (normative)

When a state transition publishes or affirms a claim that quantifies over kinds, the guard **SHALL**:

1. **Scope coverage (USM).**
   `U.ClaimScope(Claim) covers TargetSlice` (singleton or finite set) and TargetSlice **declares `Γ_time`** (no “latest”).

2. **Typed definedness.**
   A **deterministic membership check** is available for every kind used by the claim in the **TargetSlice**. If membership cannot be evaluated in that context, the guard **fails closed**.

3. **Typed compatibility (same Context).**
 If a downstream consumer expects a specific kind, then for each kind used by the claim either:
* the used kind is an **is‑a / subkind‑of** the expected kind, or
* a documented **RoleMask** for the expected kind is used and its constraints are **met and observable** in the **TargetSlice**.

3. **Typed compatibility (Cross‑context).**
  If any referenced kind is **used across Contexts**, a **KindBridge** **SHALL** be declared with a published **type‑congruence level** (minimum acceptable level per Context policy), order preserved (no inversions), and **loss notes**.  
The guard **SHALL** apply the **kind‑bridge penalty** to **R**.

4. **Scope translation (Cross‑context claim use).**
If the Claim’s scope originates in another target‑context, a **Scope Bridge** with a published **congruence level** is required; apply the **scope‑bridge penalty** to **R**.

6. **Formality threshold (if gated).**
   If the ESG state requires rigor, enforce `U.Formality(Claim) ≥ F_k` (C.2.3).
   (*Note:* Raising F does **not** widen G; do not substitute.)

7. **Evidence freshness (R).**
   Where the new state implies trust, assert freshness windows and confirm **no expired bindings**.

**Prohibitions (normative).**

* Do **not** widen **G** to “hide” a type mismatch. Fix typed compatibility (introduce a subkind, use a RoleMask, publish a KindBridge) or reject.
* Do **not** treat a **mask name** as a kind—masks must be **registered** and **deterministic**.
* Do **not** infer G from the size of a kind’s **Extension**; **Scope ≠ Extension**.
## Method–Work guard obligations (normative)

To admit a **capability** for a specific **Work** step at **JobSlice**, the guard **SHALL**:

1. **Work scope coverage (USM).**
   The capability’s **Work scope** covers the **JobSlice**, and the **JobSlice** includes an explicit **time selector (Γ_time)**.


2. **Measures & qualification.**
   **All** required `U.WorkMeasures` hold at JobSlice and the `U.QualificationWindow` is **valid at `Γ_time`**.

3. **Typed inputs (same Context).**
   For each declared input kind (or RoleMask), assert:
   * **Membership check available:** the system can deterministically decide whether the input belongs to the expected kind in this **JobSlice**.
   * **Compatibility:** the provided input kind is an **is‑a / subkind‑of** the expected kind, or the **RoleMask** constraints are satisfied and observable.

3. **Typed outputs / post‑conditions (if declared).**
   If the capability guarantees an output kind `k_out`, record the obligation to **demonstrate** `MemberOf(output, k_out, JobSlice)` (typically via conformance tests or audits).

4. **Cross‑context typed use.**
   If inputs/outputs are typed in a different target‑context than the capability or JobSlice:
   * **KindBridge(s)** are required with a published **type‑congruence level** and **loss notes**; apply the **kind‑bridge penalty** to **R**.
   * If the capability resides in another target‑context, a **Scope Bridge** with a published **congruence level** is required; apply the **scope‑bridge penalty** to **R**.

4. **No substitution by G.**
   Do not “fix” a typed mismatch by widening the **Work scope**. Use an **adapter** or a **RoleMask**, or reject.
## Guard macros (ready‑to‑use)

**ESG\_TypedGate(Claim, TargetSlice, Kinds, thresholds)**
*Manager view:* The following macros are for editors; target‑contexts may automate them if desired. Managers can read the comments on each step; the checks are the same ones described in Plain language above.

```
1  assert ClaimScope(Claim) covers TargetSlice                 // USM
2  assert Γ_time(TargetSlice) is explicit                  // no "latest"
3  for each kind k in Kinds used by Claim:
4      assert membership_defined(k, TargetSlice)               // C.3.2 K-07
5  if same-Context typed expectations exist:
6      assert is_subkind(k, k_expected) OR meets_mask_constraints(k_expected, TargetSlice)
7  if cross-context kinds:
8      assert KindBridge(k, k') with type_congruence ≥ c_kind and loss notes
9      apply_kind_bridge_penalty(type_congruence)
10 if cross-context scope:
11     assert ScopeBridge(Claim.Context, TargetSlice.Context) with congruence ≥ c_scope
12     apply_scope_bridge_penalty(congruence)
13 if F-threshold applies: assert Formality(Claim) ≥ F_k        // C.2.3
14 if trust implied: assert Fresh(evidence, window) AND NoExpiredBindings
```

**MethodWork\_TypedGate(Capability, JobSlice, Inputs/Outputs, thresholds)**

```
1  assert WorkScope(Capability) covers JobSlice                // USM
2  assert Γ_time(JobSlice) is explicit
3  assert WorkMeasures(JobSlice) satisfied AND QualificationWindow holds
4  for each expected input-kind k_in:
5      assert membership_defined(k_in, JobSlice)
6      assert is_subkind(k_input, k_in) OR meets_mask_constraints(k_in, JobSlice)
7  if declared output-kind k_out: record obligation to show MemberOf(output,k_out,JobSlice)
8  if cross-context kinds: assert KindBridge(… ) with type_congruence ≥ c_kind; apply_kind_bridge_penalty(type_congruence)
9  if cross-context capability/scope: assert ScopeBridge(… ) with congruence ≥ c_scope; apply_scope_bridge_penalty(congruence)
```
## Worked examples (manager‑focused)

**(A) ESG — Promote a braking policy to *Effective*.**
*Claim.* “For all **vehicles**: braking distance is **≤ 50 m** on dry and **≤ 40 m** on wet.”
*TargetSlice.* `{surface∈{dry,wet}, speed≤50 km/h, rig=v3, Γ_time=rolling 180 d}`
*Kinds.* `Vehicle` (K2, `KindSignature` at F4); the consumer subsystem expects `PassengerCar`.
**Guard.**

1. **Scope** covers TargetSlice (USM ✓).
2. **Definedness** of `MemberOf(?, Vehicle, TargetSlice)` ✓.
3. **Typed compatibility:** `PassengerCar ⊑ Vehicle` ✓.
4. **No bridges** → no penalties.
5. **F‑threshold:** `Formality(Claim) ≥ F4` ✓.
6. **Freshness:** evidence ≤ 180 days ✓.
   **Result:** Transition allowed. F/R apply weakest‑link on support paths; G remains the set declared.


**(B) Method–Work — Admit “RiskScore” step with typed input.**
*Capability.* `ComputeRiskScore` expects `AuthenticatedRequest`; promises SLOs (latency ≤ 50 ms, error ≤ 0.5 %).
*JobSlice.* `{api=v2.3, region=eu‑west, Γ_time=now, traffic_class=gold}`
*Inputs.* Producer emits `Request` (no auth guarantee).
**Guard.**

1. **Work scope** covers JobSlice; **Measures** & **QualificationWindow** ✓.
2. **Typed inputs:** `MemberOf(?, AuthenticatedRequest, JobSlice)` must hold. Not true for raw `Request`.
3. **Remedy:** insert an **adapter** that enforces/attests auth → yields `AuthenticatedRequest`.
4. **No Cross‑context** → no bridges.
   **Result:** Admitted **with adapter**; Scope unchanged; R relies on adapter evidence. Widening Work scope is **not** acceptable to bypass typed mismatch.


**(C) Cross‑context ESG — Adopt policy across plants.**
*Claim Context.* `SafetyLab@2026`. *target Context.* `PlantB@EU`.
*Kinds.* `Vehicle ↦ TransportUnit` via **KindBridge** with **`CL^k=2`** (EV/ICE collapsed); **Scope Bridge** from lab to plant with **CL=2** (rig bias ±2 %).
**Guard.**

1. Translate **Scope** and **cover** `TargetSlice_B`.
2. Translate **Kind** and ensure `MemberOf(?, TransportUnit, TargetSlice_B)` is **defined**.
3. Apply the **scope‑bridge penalty (level 2)** and the **kind‑bridge penalty (level 2)** to **R**; publish loss notes.
   **Result:** Transition allowed with reduced **R**; G is the **mapped** set; F unchanged.
## Anti‑patterns & remedies (normative where noted)

| Anti‑pattern                                      | Why it’s wrong                                 | Remedy                                                                              |
| ------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------- |
| Widening **G** to “make kinds match”              | Conflates **describedEntity** with **applicability** | Introduce **subkind**, **RoleMask**, or **KindBridge**; keep G honest.              |
| Using a **mask name** as a kind                   | Hides constraints; breaks determinism          | Register mask; ensure constraints are observable; promote to **subkind** if reused. |
| Ignoring **`CL^k`** when classifying across Contexts | Under‑counts risk                              | Require **KindBridge**; apply **Ψ(`CL^k`)** to **R**; record loss notes.            |
| Inferring **Scope** from the size of the **Extension** | Scope is not the same as Extension            | Keep **Scope** (where it applies) distinct from **Extension** (which items count in the slice). |
| Implicit “**latest**” time                        | Non‑deterministic guard                        | Require explicit **`Γ_time`** (point/window/policy).                                |
