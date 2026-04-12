---
title: "C.3.A:Annex A - How typed reasoning plugs into Compliance & Regulatory Alignment \\[A/I]"
description: "Generated reference page for heading:c-3-a-annex-a-how-typed-reasoning-plugs-into-compliance-regulatory-alignment-a-i:34086."
---

# C.3.A:Annex A - How typed reasoning plugs into Compliance & Regulatory Alignment \[A/I]
> Preface node `heading:c-3-a-annex-a-how-typed-reasoning-plugs-into-compliance-regulatory-alignment-a-i:34086`

## Content

> **For managers.** This section shows how to make **regulatory adoption and reuse** precise, auditable, and portable using **Kinds**, **KindBridges** (with a kind‑bridge congruence level, noted as **CL^k** for editors), and **USM Scope**. It cleanly separates *what the law is about* from *where and when it applies*, and routes any cross‑jurisdiction uncertainty to **R** (assurance). It never changes **F** (form) or **G** (scope) to hide mismatches.

## C.3.A:A.1 Purpose & fit

**What this solves.** Regulations and standards name classes of things (“**Adult person**,” “**Class II medical device**,” “**Personal data**,” “**Lease**”). In one context they are native; in another they are foreign. Without typed reasoning, teams either (a) hand‑translate terms (silently changing meaning), or (b) reduce everything to Context labels (“domain = EU”), which cannot be checked by guards.

**What we add.**

1. Model regulatory categories as **Kinds** (with `KindSignature` and `⊑`),
2. map them across Contexts with **KindBridges** and **type‑congruence `CL^k`**,
3. express **Claim scope (G)** over **Context slices** that explicitly list *jurisdiction, version, and a time selector (Γ_time)*, and
4. apply **R‑penalties** (`Ψ(CL^k)`and, if scope is bridged,`Φ(CL)`) while **keeping F and G unchanged**.
## C.3.A:A.2 Normative obligations

**Conformance.** A model or authoring action conforms to A.2 iff it satisfies **C‑REG‑1..C‑REG‑8** below.

**C‑REG‑1 (Regulatory kinds).** Regulatory categories **SHALL** be represented as `U.Kind` in the authority’s Context (e.g., `AdultPerson@RegY`, `MedicalDeviceClassII@FDA`, `PersonalData@GDPR`, `Lease@IFRS`). Each such kind **SHALL** have a `KindSignature` with a declared **F** level (C.3.2).

**C‑REG‑2 (KindBridge).** Cross‑context reuse of a regulatory category **MUST** declare a **KindBridge** with a kind‑bridge congruence level (**CL^k**) and **loss notes** (C.3.3). The mapping **SHALL** preserve the “is‑a / subkind‑of” direction and **MUST NOT** invert it.

**C‑REG‑3 (Scope is USM).** Regulatory **applicability** (jurisdiction, effective dates, product families, platforms) **SHALL** be expressed as **Claim scope (G)** over `U.ContextSlice`, with an explicit **time selector (Γ_time)**. Applicability **MUST NOT** be encoded into kinds.

**C‑REG‑4 (No synonym shortcuts).** Editors **MUST NOT** treat legal terms as synonyms of local kinds without a KindBridge. Any term alignment **SHALL** be documented (mapping + `CL^k` + loss notes).

**C‑REG‑5 (Determinism).** `MemberOf(e, k_reg, slice)` **MUST** be deterministically evaluable when used in guards (no “latest law” or unstated grace periods).

**C‑REG‑6 (Penalties land in R).** When a claim or guard relies on Cross‑context classification (membership decided via a KindBridge), the receiving Context **MUST** apply the **kind‑bridge penalty** (based on **CL^k**) to **R**; if the **Scope** is also bridged, apply the **scope‑bridge penalty** (based on **CL**) to **R** as well. **Invariant:** penalty routing changes **R** only; **F** and **G** remain unchanged.

**C‑REG‑7 (Editioning).** Changes in law/regulator guidance that alter membership or applicability **SHALL** be recorded as content changes: update `KindSignature` (kinds) and/or update **Claim scope** (ΔG±). Guards **MUST** name a time selector (Γ_time) and **MUST NOT** rely on an implicit “latest” time.

**C‑REG‑8 (Masks, not clones).** Local process nuances (e.g., clinic‑specific cohort definitions) **SHALL** be captured with **RoleMasks** over the adopted kind; editors **MUST NOT** clone a new kind unless a stable **subkind** is warranted.
## C.3.A:A.3 Guard macros (ready to use)

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
## C.3.A:A.4 Worked examples \[I]

**(1) Healthcare — “Adult” dosage rule across jurisdictions**

*Reg source.* Jurisdiction Y defines `AdultPerson@RegY` (AT around K2, F4) with **age at least 18**; your hospital Context uses `AdultPatient` (**age at least 21**).
*Claim.* “For all `x ∈ AdultPatient`: dosage ≤ D/kg for drug M.”
*Adoption.*

* **KindBridge.** Map `AdultPerson@RegY → AdultPatient`; **`CL^k = 1`**; **loss note:** boundary mismatch (18↔21).
* **Scope.** `{jurisdiction=Y, formulary=M, time selector (Γ_time)=from 2026‑01‑01}`.
* **Guard.** `Guard_RegAdopt` passes; **R** penalized by `Ψ(1)`. Policy narrows Scope to mapped cohort (age≥21) for in‑house use.
* **Change.** If Y changes adult to ≥19 (new edition), run `Guard_RegChange`: version the kind, refresh the bridge, re‑assess `CL^k`, update guards.

**(2) Privacy — GDPR↔CCPA PII across Contexts**

*Reg kinds.* `PersonalData@GDPR`, `PersonalInformation@CCPA`.
*Internal kind.* `PersonalData@Product` with masks per data store.
*Policy claim.* “No sharing of `SensitiveAttribute` outside processors.”
*Adoption.*

* **KindBridges.** `SensitiveAttribute@GDPR → SensitiveAttribute@Product` (**`CL^k=2`**); `SensitivePersonalInformation@CCPA → SensitiveAttribute@Product` (**`CL^k=1`**, loss: biometric nuance).
* **Scope.** Two policies with **SpanUnion** over `{jurisdiction=EU}` and `{jurisdiction=CA}`, each with its own **Γ\_time** windows and evidence freshness.
* **Guards.** For CA, apply stronger **R** penalty (`Ψ(1)`), and narrow to the mapped subset (exclude ambiguous fields).
* **Do not.** Do not rename GDPR terms to local labels **without a KindBridge**.

**(3) Export control — US EAR “600‑series” classification**

*Reg kind.* `EAR600SeriesItem@US` (AT≈K2, F3→F4 as predicates are formalized).
*Local kind.* `Product@Company`.
*Work scope.* `{destination=countries, end_use, time selector (Γ_time)=shipment date}` for the shipping capability.
*Adoption.*

* **KindBridge.** Map `EAR600SeriesItem@US → Product@Company`; `CL^k=2` (loss: component kit edge cases); loss notes recorded.
* **Capability guard (Method–Work).**

  * `U.WorkScope(Ship)` covers `JobSlice` (destination, end use, time).
  * `MemberOf(product, EAR600_mapped, JobSlice)` defined (classification present).
  * Apply `Ψ(2)` to **R** (classification uncertainty) and, if reusing US scope text, `Φ(CL_scope)` too.
* **Outcome.** Shipment admitted only for allowed destinations; higher **R** may require manual review.

**(4) Finance — IFRS vs US GAAP “Lease”**

*Reg kinds.* `Lease@IFRS`, `Lease@USGAAP`.
*Local kind.* `LeaseStandard@Corp` used in policy “recognize lease liabilities.”
*Adoption.*
* **KindBridge.** `Lease@IFRS → LeaseStandard@Corp` (**`CL^k=2`**; loss: short‑term exceptions differ).
* **Scope.** `{jurisdiction=IFRS, Γ_time=financial period, ledger=v7}`.
* **Evidence.** LA plans cover subkinds (operating vs finance) per your classification; the kind‑bridge congruence level (CL^k) drives extra testing near boundary cases.
## C.3.A:A.5 Design guidance & pitfalls \[I]

**Do this.**

* **Treat regulatory categories as Kinds.** Put the *definition* into `KindSignature` (aim for **F4** predicates where practical).
* **Make time explicit.** In guards, require a **time selector (Γ_time)** for effective dates and grace periods. Forbid “latest”.
* **Publish bridges with loss notes.** If two jurisdictions’ categories are “almost the same,” say *how*, rate **`CL^k`**, and note what is lost.
* **Split “where” from “what.”** Keep **Scope (G)** over `U.ContextSlice` (jurisdiction, plant, Standard versions) separate from **MemberOf** on the kind.
* **Route uncertainty to R.** Use `Ψ(CL^k)` and `Φ(CL)`; never modify **F/G** to hide ambiguity.

**Avoid this.**

* **Synonym games.** Don’t alias “Adult” to local `AdultPatient` in prose. Use a **KindBridge**.
* **Scope by labels.** “Domain = EU” is not a guard. Use explicit `U.ContextSlice` fields (jurisdiction, version, time selector) and **Scope** predicates.
* **Hiding time.** Never rely on “current law”; always fix **Γ\_time** (point/window/policy).
* **Widening G to compensate for type gaps.** If kinds don’t line up, introduce a **subkind**, add a **mask/adapter**, or **narrow**; don’t “make the scope bigger”.
## C.3.A:A.6 Migration checklist \[I]

1. **Inventory** regulatory references in policies/specs.
2. **Create Kind cards** for referenced legal categories (intent summary, `KindSignature` + **F**, known subkinds, AT tag if helpful).
3. **Publish KindBridges** to your local kinds with `CL^k` and loss notes.
4. **Rewrite guards** to use **Scope coverage** (USM) plus `MemberOf` on the mapped kind; add an explicit **time selector (Γ_time)**.
5. **Wire penalties**: `Ψ(CL^k)` and `Φ(CL)` lower **R**; refresh evidence windows.
6. **Catalog RoleMasks** for local nuances; promote frequently reused masks to **subkinds**.
## C.3.A:A.7 Manager’s one‑page pattern \[I]

* **Question 1 — Where does the rule apply?** → **Scope (G)** over **Context slices** (jurisdiction, plant, Standard, and a **time selector (Γ_time)**).
* **Question 2 — About what things?** → **Kind** (regulatory category) with a **KindBridge** if foreign.
* **Gate recipe.** **Scope covers the TargetSlice** and **membership for the mapped kind is defined**, and **both bridges are present where needed**; then **apply bridge penalties to R** and decide.
* **Change handling.** New law edition? Update `KindSignature`/Bridge (kinds) and/or **Scope** (ΔG); never rely on “latest.”
* **Accountability.** Keep **loss notes**, **CL/CL^k**, and **Γ\_time** in the decision record.
