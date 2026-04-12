---
title: "C.3.A:A.2 Normative obligations"
description: "Generated reference page for heading:c-3-a-a-2-normative-obligations:34103."
---

# C.3.A:A.2 Normative obligations
> Preface node `heading:c-3-a-a-2-normative-obligations:34103`

## Content

**Conformance.** A model or authoring action conforms to A.2 iff it satisfies **C‑REG‑1..C‑REG‑8** below.

**C‑REG‑1 (Regulatory kinds).** Regulatory categories **SHALL** be represented as `U.Kind` in the authority’s Context (e.g., `AdultPerson@RegY`, `MedicalDeviceClassII@FDA`, `PersonalData@GDPR`, `Lease@IFRS`). Each such kind **SHALL** have a `KindSignature` with a declared **F** level (C.3.2).

**C‑REG‑2 (KindBridge).** Cross‑context reuse of a regulatory category **MUST** declare a **KindBridge** with a kind‑bridge congruence level (**CL^k**) and **loss notes** (C.3.3). The mapping **SHALL** preserve the “is‑a / subkind‑of” direction and **MUST NOT** invert it.

**C‑REG‑3 (Scope is USM).** Regulatory **applicability** (jurisdiction, effective dates, product families, platforms) **SHALL** be expressed as **Claim scope (G)** over `U.ContextSlice`, with an explicit **time selector (Γ_time)**. Applicability **MUST NOT** be encoded into kinds.

**C‑REG‑4 (No synonym shortcuts).** Editors **MUST NOT** treat legal terms as synonyms of local kinds without a KindBridge. Any term alignment **SHALL** be documented (mapping + `CL^k` + loss notes).

**C‑REG‑5 (Determinism).** `MemberOf(e, k_reg, slice)` **MUST** be deterministically evaluable when used in guards (no “latest law” or unstated grace periods).

**C‑REG‑6 (Penalties land in R).** When a claim or guard relies on Cross‑context classification (membership decided via a KindBridge), the receiving Context **MUST** apply the **kind‑bridge penalty** (based on **CL^k**) to **R**; if the **Scope** is also bridged, apply the **scope‑bridge penalty** (based on **CL**) to **R** as well. **Invariant:** penalty routing changes **R** only; **F** and **G** remain unchanged.

**C‑REG‑7 (Editioning).** Changes in law/regulator guidance that alter membership or applicability **SHALL** be recorded as content changes: update `KindSignature` (kinds) and/or update **Claim scope** (ΔG±). Guards **MUST** name a time selector (Γ_time) and **MUST NOT** rely on an implicit “latest” time.

**C‑REG‑8 (Masks, not clones).** Local process nuances (e.g., clinic‑specific cohort definitions) **SHALL** be captured with **RoleMasks** over the adopted kind; editors **MUST NOT** clone a new kind unless a stable **subkind** is warranted.
