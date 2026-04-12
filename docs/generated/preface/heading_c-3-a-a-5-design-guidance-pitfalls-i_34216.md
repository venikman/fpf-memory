---
title: "C.3.A:A.5 Design guidance & pitfalls \\[I]"
description: "Generated reference page for heading:c-3-a-a-5-design-guidance-pitfalls-i:34216."
---

# C.3.A:A.5 Design guidance & pitfalls \[I]
> Preface node `heading:c-3-a-a-5-design-guidance-pitfalls-i:34216`

## Content

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
