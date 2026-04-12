---
title: "C.3.A:A.3 Guard macros (ready to use)"
description: "Generated reference page for heading:c-3-a-a-3-guard-macros-ready-to-use:34124."
---

# C.3.A:A.3 Guard macros (ready to use)
> Preface node `heading:c-3-a-a-3-guard-macros-ready-to-use:34124`

## Content

**(a) `Guard_RegAdopt` — adopt a regulatory requirement into a Context (Plain: check scope, map the legal category, and account for penalties)**

Use when an internal policy is defined by reference to an authority’s category.

```
Inputs: Claim P (policy), RegKind k_reg in Context R_auth, TargetSlice S_local
Guard_RegAdopt(P, k_reg, S_local):
  1. ScopeCoverage:       U.ClaimScope(P) covers S_local                 // USM
  2. Γ_time:              S_local specifies Γ_time (no "latest")         // USM
  3. KindBridge:          a KindBridge exists that maps the legal category to a local kind, with **CL^k** at least the minimum policy level
  4. MemberOfDefined:     MemberOf(?, k_local, S_local) is defined       // determinism
  5. Penalties→R:         apply the **kind‑bridge penalty** (based on CL^k) to **R**
  6. ScopeBridge?         if the policy’s scope lives in the authority’s Context, translate it via a Scope Bridge; apply the **scope‑bridge penalty** (based on CL) to **R**
  7. EvidenceFreshness:   freshness windows for any bound evidence hold  // C.2.2
```

**(b) `Guard_RegChange` — react to a regulatory change (Plain: re‑issue the kind and/or scope and refresh penalties)**

```
Inputs: Reg change Δ (new edition, guidance), impacted kinds/claims
Guard_RegChange(Δ):
  1. Identify impact:      does Δ alter KindSignature (membership) or Scope predicates?
  2. If KindSignature:     version k_reg; update KindBridge; re-evaluate CL^k; update loss notes
  3. If Scope:             publish ΔG± (widen/narrow) to Claim scope; update guards
  4. Reassess penalties:   recompute Ψ(CL^k), Φ(CL) → R
  5. Γ_time discipline:    set sunrise/sunset; forbid implicit retroactivity in guards
```

**(c) `Guard_RegXContextUse` — cross‑jurisdiction use with both bridges (Plain: move scope and kind, then account for both penalties)**

```
Guard_RegXContextUse(P, k_reg@R_auth, S_local@R_local):
  1. Scope bridge:      a Scope Bridge from the authority Context to the local context exists with CL at least the policy minimum; the translated scope covers the local slice
  2. Kind bridge:       a KindBridge maps the legal category to a local kind with **CL^k** at least the policy minimum
  3. MemberOfDefined:   MemberOf(?, k_local, S_local) is defined
  4. Penalties→R:       apply the **scope‑bridge** and **kind‑bridge** penalties to **R**
  5. Loss-guided narrow: optionally narrow Scope' where known losses are material (best practice)
```
