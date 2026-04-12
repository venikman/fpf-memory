---
title: "C.3.A:Annex B - How typed reasoning plugs into Assurance Lanes (VA/LA/TA) & Evidence design \\[A/I]"
description: "Generated reference page for heading:c-3-a-annex-b-how-typed-reasoning-plugs-into-assurance-lanes-va-la-ta-evidence-design-a-i:34253."
---

# C.3.A:Annex B - How typed reasoning plugs into Assurance Lanes (VA/LA/TA) & Evidence design \[A/I]
> Preface node `heading:c-3-a-annex-b-how-typed-reasoning-plugs-into-assurance-lanes-va-la-ta-evidence-design-a-i:34253`

## Content

**Intent (manager’s view).** Typed reasoning turns “prove/test/qualify” into a **repeatable plan**. By making *what the rule talks about* explicit (named **Kinds**, their **subkinds**, and optional **RoleMasks**), you can:

1. design **proof obligations** that actually quantify over the right things (VA),
2. build **test plans** that cover the **right variants/subkinds** in the **right context slices** (LA), and
3. isolate **tool risk** (TA) instead of letting it bleed into scope or type semantics.

**Invariant reminders.**
— **Scope (G)** is *where* a claim holds — expressed over `U.ContextSlice` (with an explicit time selector, **Γ_time**).
— **Kind membership** is *which things* the claim ranges over inside that slice — checked with `MemberOf(… , kind, slice)`.
— **Bridge penalties**: the **scope‑bridge penalty** (based on **CL**) and the **kind‑bridge penalty** (based on **CL^k**) both lower **R** (assurance). They never change **F** (form) or **G** (scope).

## C.3.A:B.1 What you get with typed assurance \[I]

* **Targeted proofs (VA).** If a policy says “for every **PassengerCar** …” (notation hint: ∀x:PassengerCar), the VA lane now has a clear target. You can prove obligations **once for the kind** (and its subkinds), instead of re‑proving per ad‑hoc label.
* **Subkind‑aware test plans (LA).** Test matrices are indexed by **subkinds** (and RoleMasks) × **context slices**; coverage stops being accidental.
* **Deterministic guards.** A test/proof either **applies** to the TargetSlice and Kind (`Scope covers & MemberOf defined`) or it doesn’t. No “latest,” no silent widening.
* **Clean tool boundaries (TA).** You qualify the **prover/model‑checker/classifier** once and route **tool confidence** to TA, not to “broadened” claims.
## C.3.A:B.2 Normative obligations for evidence design

**EA‑1 (Two checks).** Every VA/LA artifact that supports a typed claim **SHALL** bind **both**:

* **Scope predicate**: `U.ClaimScope(Claim) covers TargetSlice` (with explicit `Γ_time`), and
* **Kind predicate**: `MemberOf(?, k, TargetSlice)` is **defined** (deterministic).

**EA‑2 (Subkind coverage).** When a claim quantifies over `k`, target‑contexts **SHALL** justify LA coverage **per relevant subkind** of `k` (or **per RoleMask** if masks stand in for stable subkinds). “Representative set” **MUST** be stated explicitly.

**EA‑3 (Independence for unions).** If a published **SpanUnion** of evidence lines is used to enlarge covered area, **independence** of lines **SHALL** be documented (no shared weakest link).

**EA‑4 (Bridges accounted).** If a VA/LA artifact travels across Contexts:

* **Scope movement** **SHALL** use a Scope Bridge (Part B) with **CL** and apply the **scope‑bridge penalty** to **R**.
* **Kind movement** **SHALL** use a **KindBridge** (§ C.3.3) with **CL^k** and apply the **kind‑bridge penalty** to **R**.
  Neither movement **SHALL** alter **F** or **G**.

  Neither movement **SHALL** alter **F** nor **G**.

**EA‑5 (Freshness).** LA evidence **SHALL** declare freshness windows tied to `Γ_time` (no implicit “latest”). Expiry **MUST** fail guards closed until refreshed.

**EA‑6 (No scope‑by‑wording).** Editors **MUST NOT** widen **G** by rewriting a claim to sound “more general.” Widening **G** (ΔG+) is permitted **only** with new support that truly enlarges the set of slices.

**EA‑7 (TA separation).** Tool qualification (TA) **SHALL** be tracked independently. VA/LA guards **MUST NOT** substitute “tool is trusted” for content proof/coverage.
## C.3.A:B.3 Designing the evidence matrix \[I]

A practical way to plan LA/VA is a **matrix**:

| Row set                       | Column set                                                   | Cell content                                                                                                           |

| ----------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| **Kinds** (subkinds or masks) | **Context slices** (Standard versions, env ranges, `Γ_time`) | **Evidence unit** (proof fragment, test batch, monitoring window), with **Scope** and **MemberOf** predicates attached |

* **Choose rows.** Start with the kind and list **relevant subkinds** (notation hint: kᵢ is a subkind of k) or stable **RoleMasks**.
* **Choose columns.** Split your declared **Scope (G)** into **named slices** you intend to support (e.g., “dry, speed up to 50” and “wet, speed up to 40” with specific rigs and versioned Standards).
* **Fill cells.** Attach one or more **evidence units** per cell (proof obligations for VA; test campaigns/monitoring windows for LA). Mark **bridged** cells and their **CL/CL^k** penalties to **R**.

> **Tip.** For formal kinds and “up‑to‑iso” kinds (AT K2/K3), expect **more rows** (more variants to cover). For instance‑like kinds (AT K0), expect **fewer rows** and **tighter columns** (narrow slices, stricter freshness).
## C.3.A:B.4 VA lane — proofs that match the kind \[A/I]

**What VA contributes.** Proofs reduce ambiguity and eliminate many LA burdens when they **truly quantify over the intended kind** and **live in the declared Scope**.

**VA‑patterns (informative):**

* **Proof over the Kind (F7–F8).** “For every **PassengerCar**, the property holds” (notation hint: ∀x:PassengerCar). If the property depends on subkind‑specific rules, split lemmas per subkind.
* **Proof‑carrying components.** When the content is **F8** (dependent types), the build rejects violations; LA can shrink to **conformance smoke** within the slices.
* **Up‑to‑iso (AT K3).** Equational reasoning “up‑to‑iso” is acceptable **only** if the KindSignature works at that level and receivers accept **KindBridge** that preserves equivalences.

**VA‑obligations (normative):**

* **VA‑1.** A proof artifact **SHALL** cite the **Kind** it quantifies over and reference the **Claim scope** slices it assumes.
* **VA‑2.** Cross‑context acceptance of proofs **SHALL** use both bridges (Scope+Kind) and apply **Φ/Ψ** penalties to **R** (never to F/G).
* **VA‑3.** If the proof relies on **tool kernels**, their **TA** status **SHALL** be disclosed; weakening TA **MUST NOT** be “paid for” by silent scope widening.

**Mini‑example (VA).**
Policy P: “∀ x: PassengerCar. stoppingDistance(x) ≤ 50 m on dry at speed≤50.”
— **Kind**: `PassengerCar ⊑ Vehicle` (K2), signature F4 (predicates).
— **Scope**: `{surface=dry, speed≤50, rig=v3, Γ_time=rolling 180 d}`.
— **Proof**: a proof assistant lemma over `PassengerCar` (tool choice is context‑local).
— **Reuse** to Plant‑B: a Scope Bridge with **CL=2** (rig bias) and a KindBridge with **CL^k=3** (same classification). Apply the **scope‑bridge penalty** for CL=2 and the **kind‑bridge penalty** for CL^k=3 to **R**.
## C.3.A:B.5 LA lane — tests & monitoring that cover the right variants \[A/I]

**What LA contributes.** Empirical assurance for claims with executable semantics or physical interfaces; especially when F ≤ F6 or when stochastic/real‑world effects matter.

**LA‑patterns (informative):**

* **Cover by subkind.** Test at least one representative per subkind; add more where variability inside a subkind matters.
* **Boundary probing.** Concentrate tests near **KindSignature** and **Scope** boundaries (e.g., temp limits, speed caps).
* **Hybrid checks (F6).** When software controllers interact with physical systems, ensure **both sides** declare obligations; include their interaction cases in the matrix.
* **Monitoring windows.** For live systems, define **Γ\_time policies** (e.g., rolling 30 d) and tie alerts to **kind‑aware metrics** (“error rate per `ServiceInstance`”).

**LA‑obligations (normative):**

* **LA‑1.** Each test campaign **SHALL** specify **rows/columns** in the evidence matrix and attach **Scope/MemberOf** predicates to each run.
* **LA‑2.** Freshness windows **SHALL** be explicit and enforced in guards (no “latest”).
* **LA‑3.** If a **KindBridge** merges subkinds, test plans **SHALL** be adjusted (more cells, stricter acceptance), and the **kind‑bridge penalty** (based on CL^k) applied to **R**.
* **LA‑4.** Publishing **SpanUnion** coverage requires the independence note (which support lines differ).

**Mini‑example (LA).**
Claim: “For all `x ∈ Vehicle`: brakeDistance ≤ 50 m on dry, ≤ 40 m on wet.”
— **Rows**: `{PassengerCar, LightTruck}`.
— **Columns**: `{dry, ≤50}`, `{wet, ≤40}` with rigs and versions.
— **Cells**: PC/dry covered by track tests; LT/wet by simulation + surrogate tests (independent lines → SpanUnion allowed).
— **Bridge** to jurisdiction Y collapses EV vs ICE ⇒ `CL^k=2`. Apply **Ψ(2)** to **R**; add extra wet tests to compensate.
## C.3.A:B.6 TA lane — tool qualification where it belongs \[A/I]

**What TA contributes.** Confidence in **provers, checkers, model‑checkers, data classifiers** and pipelines. TA is about the **machinery**, not the **claim** or **kind** semantics.

**TA‑patterns (informative):**

* **Prover kernels.** Audit/qualification of the kernel version used for VA proofs.
* **Automated Model‑checkers.** Qualification against seeded faults; document limits (precision, nondeterminism).
* **Classifiers used for `MemberOf`.** If membership uses ML or rules engines, qualify the **classifier** separately; any drift monitoring belongs to LA freshness.

**TA‑obligations (normative):**

* **TA‑1.** Tools critical to VA/LA **SHALL** declare their qualification status and version; guards **SHALL** reference these declarations when they matter.
**TA‑2.** Lower tool qualification **MUST NOT** be hidden by relaxing **F** or widening **G**. target‑contexts may offset it by demanding **more evidence** in **R** (for example, extra tests), per policy.
## C.3.A:B.7 Guard macros for evidence planning & attachment

**Guard\_EvidencePlan\_Typed** — approve a plan that is adequate for a typed claim.
*Plain reading.* The first macro checks that the plan names the rows (kinds or masks) and columns (slices), that scope and membership can be checked for each cell, that any Cross‑context moves declare bridges, and that penalties are budgeted in **R**.

```
1. MatrixDeclared:    Evidence matrix rows = {subkinds or masks of k}; columns = {TargetSlices within ClaimScope}
2. ScopeBound:        For each column, ClaimScope covers that slice with explicit Γ_time
3. KindBound:         MemberOf(?, k, slice) is defined (deterministic) for all planned slices
4. BridgeBudgeted:    If cross-context:
                        (a) Scope Bridge(s) declared with CL → attach the **scope‑bridge penalty** to the **R** budget
                        (b) KindBridge(s) declared with CL^k → attach the **kind‑bridge penalty** to the **R** budget
5. FreshnessPolicy:   LA freshness windows specified per slice; monitoring plan defined (if live)
6. IndependenceNote:  If SpanUnion is claimed, independence justification attached
7. TADecls:           Tools and their TA status listed; residual risk routed to R (not to F/G)
```

**Guard\_EvidenceAttach\_Typed** — attach concrete evidence to a state change.
*Plain reading.* The second macro checks that each attached evidence unit clearly states which row and column it covers, binds scope and membership in a reproducible way, applies bridge penalties to **R**, and respects freshness.

```
1. CellMatch:         Each evidence unit cites (subkind/mask, slice) it covers
2. PredicateBinding:  Evidence embeds Scope and MemberOf predicates (or references them verifiably)
3. BridgeApplied:     If evidence is bridged, apply the **scope‑bridge** and/or **kind‑bridge** penalties to **R**; record loss notes
4. FreshnessMet:      Evidence within declared freshness; else guard fails closed
5. VA/LA Mix:         If VA present, verify it matches the quantified Kind; if LA fills gaps, show matrix deltas
6. TAConsistent:      Tool versions match TA declarations used at planning time
```
## C.3.A:B.8 Anti‑patterns & remedies

| Anti‑pattern                       | Why it’s risky                                | Remedy                                                              |
| ---------------------------------- | --------------------------------------------- | ------------------------------------------------------------------- |
| “We tested one golden case.”       | Hides variant risk; ignores subkinds.         | Build a subkind‑indexed matrix; add boundary tests per column.      |
| “Latest data suffices.”            | Non‑deterministic; un‑auditable.              | Declare `Γ_time` windows; fail closed on expiry.                    |
| “Tool is trusted, so we’re done.”  | Confuses TA with VA/LA; misses content risk.  | Keep TA separate; add VA proofs or LA tests as needed.              |
| Bridging without penalties         | Understates risk; mapping gaps surface later  | Apply **scope‑bridge** and **kind‑bridge** penalties to **R**; publish loss notes. |
| Widening G to cover evidence gaps. | Conflates applicability with available tests. | Keep G honest; expand matrix or lower claim scope explicitly (ΔG−). |
| Inferring scope from how many items match    | Scope is not the same as membership      | Keep **Scope** (where it applies) distinct from **membership** (which items match in the slice). |
## C.3.A:B.9 End‑to‑end example (manager’s cheat‑sheet) \[I]

**Scenario.** You want to publish “∀ x: PassengerCar. brakeDistance ≤ 50 m dry; ≤ 40 m wet” across two plants.

1. **Kinds.** `PassengerCar ⊑ Vehicle` (K2, signature F4).
2. **Scope (G).** `{surface in {dry, wet}, speed limits, rig version, time selector (Γ_time)=rolling 180 days}` in Plant‑A.
3. **VA.** Prove the property for **PassengerCar** using a proof assistant, and cite the **Scope** slices it assumes.
4. **LA.** Build an evidence matrix with rows `{PassengerCar}` and columns `{dry, up to 50}` and `{wet, up to 40}`, including rig variants; add boundary tests near the limits.
5. **TA.** Qualify the prover kernel and the automated checker used for wet surrogates.
6. **Bridge.** To Plant‑B: a **Scope Bridge** with **CL=2** (rig bias) and a **KindBridge** with **CL^k=3** (same classification).
7. **Penalties.** Apply the **scope‑bridge penalty** for CL=2 and the **kind‑bridge penalty** for CL^k=3 to **R**. Per policy, add extra test cells in Plant‑B to compensate for rig bias.
8. **Guards.** Use `Guard_EvidenceAttach_Typed` on the state change; include freshness checks.

**Outcome.** A defensible, auditable publication: typed, scoped, with clear evidence coverage and explicit risk penalties — no conflation of abstraction with applicability, and no tool risk smuggled into content.
