---
title: "Unified Comparison Mechanism (CPM)"
description: "Part A - Kernel Architecture Cluster"
---

# Unified Comparison Mechanism (CPM)
> Pattern `A.19.CPM` · Stable · Architectural (A) · Normative (unless explicitly marked informative)
> Part A - Kernel Architecture Cluster

> **Type:** Architectural (A)
> **Status:** Stable
> **Normativity:** Normative (unless explicitly marked informative)
> **Placement:** Part A / CN‑Spec cluster (A.19) / CHR mechanism owner patterns (Phase‑3)
> **Source:** FPF / CHR Phase‑3 mechanism owner patterns
> **Modified:** 2026‑01‑20
>
> **Semantic owner note, Phase‑3 canonicalization:** this pattern is the **designated single semantic owner** of the canonical `U.Mechanism.Intension` for `CPM.IntensionRef` (CHR suite stage `compare`). This matches the single‑owner discipline: mechanism‑intension semantics live in an explicitly designated mechanism‑owner pattern (`E.20`).
> `A.6.1` remains the owner of the **template** of `U.Mechanism.Intension`; this pattern owns the **CPM‑specific constraints** over the (suite‑owned) SlotKind surface — operations, laws, admissibility, applicability, transport, plane, and audit obligations for that template (single‑owner at the instance‑semantics level, not a second schema, and not the owner of the CHR SlotKind lexicon).
>
> **Canonicalization hook, ID‑continuity‑safe:** any other appearances of the CPM intension (e.g., suite prose in `A.19.CHR`) SHALL be reduced to a **Tell + Cite** stub pointing to **`A.19.CPM:4.1`**, while preserving the original section headings and their public `PatternId:SectionPath` IDs for continuity (alias‑dock legacy tokens rather than deleting them).
> Such stubs MUST NOT restate SlotIndex, OperationAlgebra, LawSet, AdmissibilityConditions, Applicability, Transport, Γ_timePolicy, PlaneRegime, or Audit content (no “second center of gravity” via near‑duplicate prose).

CPM is the CHR comparison kernel: it compares two admitted profiles under an explicit, legality‑gated comparator and returns a **set‑valued** comparison outcome.

## Keywords

- comparison
- comparator
- ComparatorSpecRef
- ComparatorSet
- set-valued comparison outcome
- partial order
- tri-state admissibility (pass|degrade|abstain)
- MinimalEvidence
- “no hidden scalarization/totalization”
- Bridge+CL transport
- penalties→R_eff only.

## Relations

- `A.19.CPM` --route_step--> [Unified Selection Kernel (SelectorMechanism)](/generated/patterns/A.19.SelectorMechanism)
- `A.19.CPM` --outline_parent--> [A.CHR-SPACE — CharacteristicSpace & Dynamics hook](/generated/patterns/A.19)
- `A.19.CPM` --outline_prev_sibling--> [Unified Lawful Scale Aggregation Mechanism (ULSAM)](/generated/patterns/A.19.ULSAM)
- `A.19.CPM` --outline_next_sibling--> [Unified Selection Kernel (SelectorMechanism)](/generated/patterns/A.19.SelectorMechanism)
- `A.19.CPM` --explicit_reference--> [U.Mechanism - Law‑governed application to a SubjectKind over a BaseType](/generated/patterns/A.6.1)
- `A.19.CPM` --explicit_reference--> [U.RelationSlotDiscipline - SlotKind / ValueKind / RefKind discipline for n‑ary relations (with slot‑operation lexicon)](/generated/patterns/A.6.5)
- `A.19.CPM` --explicit_reference--> [CHRMechanismSuite — CHR mechanism-suite anchor (suite obligations + P2W planned baseline)](/generated/patterns/A.19.CHR)
- `A.19.CPM` --explicit_reference--> [CG-Spec — Frame Standard & Comparability Governance](/generated/patterns/G.0)
- `A.19.CPM` --explicit_reference--> [A.CSLC-KERNEL — Minimal CSLC in Kernel (Characteristic/Scale/Level/Coordinate)](/generated/patterns/A.18)
- `A.19.CPM` --explicit_reference--> [CN-frame (comparability & normalization)](/generated/patterns/A.19.CN)
- `A.19.CPM` --explicit_reference--> [SlotFillingsPlanItem — Planned Slot-Fillings Baseline (WorkPlanning PlanItem)](/generated/patterns/A.15.3)
- `A.19.CPM` --explicit_reference--> [LEX-BUNDLE: Unified Lexical Rules for FPF](/generated/patterns/E.10)
- `A.19.CPM` --explicit_reference--> [Pattern Quality Gates: Review & Refresh Profiles](/generated/patterns/E.19)
- `A.19.CPM` --explicit_reference--> [Mechanism Introduction Protocol (MIP)](/generated/patterns/E.20)
- `A.19.CPM` --explicit_reference--> [Local-First Unification Naming Protocol](/generated/patterns/F.18)
- `A.19.CPM` --explicit_reference--> [Transduction Graph Architecture (E.TGA)](/generated/patterns/E.18)
- `A.19.CPM` --explicit_reference--> [Multi‑Method Dispatcher & MethodFamily Registry](/generated/patterns/G.5)
- `A.19.CPM` --explicit_reference--> [Parity / Benchmark Harness](/generated/patterns/G.9)
- `A.19.CPM` --explicit_reference--> [SoTA Pack Shipping (pack-boundary owner; SoTA-Pack(Core))](/generated/patterns/G.10)

## Content

## At a glance (didactic, informative)

CPM is the CHR comparison kernel: it compares two admitted profiles under an explicit, legality‑gated comparator and returns a **set‑valued** comparison outcome.

**One-screen purpose (manager-first).** CPM answers: “Given two admitted profiles and an explicit comparator, what relation holds under the declared legality frame?” It does **not** answer: “Which one should we pick?” (selection) nor “What is the score?” (scoring).

**Manager quick checklist (before you trust a comparison):**
* **Comparator is explicit:** do we have a `ComparatorSpecRef`, and is it admitted by `CG‑Spec.ComparatorSet`?
* **Legality is declared:** do we cite `CG‑Spec` (and `SCP` when numeric ops exist) and treat violations as `degrade|abstain`?
* **Evidence is not faked:** are missing/unknown inputs routed to `degrade|abstain` under the effective MinimalEvidence policy (never to `pass`)?
* **Partiality is preserved:** are we willing to accept incomparability/ties as first‑class outcomes (set‑valued result), rather than forcing a winner?

* **Suite stage:** `compare` (pipeline order lives in `A.19.CHR:4.5`, not in the `mechanisms[]` enumeration).
* **Input (conceptual):** left profile, right profile, `CN‑Spec`, `CG‑Spec`, an explicit `ComparatorSpec`, context slice; optional explicit `MinimalEvidence` override.
* **Output (conceptual):** `ComparisonResultSlot` as a **set of relation/poset tokens** (not a single scalar, and not an embedded selection decision).
* **P2W seam:** concrete `ComparatorSpecRef.edition` and any policy ids are bound **only** in planned baseline artefacts (A.15.3 + `A.19.CHR:4.7.2`). CPM’s kernel does **not** bind project‑specific pins; executions record the **effective** refs/pins in `Audit`.
* **Reproducible comparisons:** for parity/benchmark style runs that require a stable run package + report surface (editions, windows, parity pins), route packaging through `G.9` (Parity / Benchmark Harness). CPM stays kernel‑only.
* **What CPM does not do (strict distinction):**

  * does **not** normalize (`UNM`);
  * does **not** choose indicators (`UINDM`);
  * does **not** score (`USCM`);
  * does **not** fold/aggregate (`ULSAM`);
  * does **not** select (“pick best”) — that is `SelectorMechanism`.
* **Core safety commitments:** legality gate via `CG‑Spec.ComparatorSet` + `CG‑Spec.SCP` + CSLC; tri‑state admissibility (`pass|degrade|abstain`); unknown never coerces to “pass” or to a fabricated outcome; no silent scalarization/totalization.
* **Where method details live:** in editions of `ComparatorSpec` and their SoTA wiring (Part G packs/extensions), not inside CPM’s kernel semantics.
* **Quick rule of thumb:** if you need **numbers**, that’s `USCM`; if you need a **decision/portfolio**, that’s `SelectorMechanism`. CPM’s job is only: **compare → relation tokens**.
## Problem frame

FPF’s Characterization (CHR) suite treats comparison as a **distinct** mechanism stage (`compare`) with suite‑wide obligations that forbid hidden scalarization/totalization, require tri‑state guards, and enforce legality surfaces for numeric operations. Comparison must therefore be described as:

* a **mechanism** (in the `U.Mechanism.Intension` sense, per `A.6.1` / slot discipline `A.6.5`),
* that is **suite‑conformant** (per CHR obligations and protocol closure in `A.19.CHR`),
* and **contract‑surface‑respecting** (comparability and admission are routed via `CN‑Spec` and legality is gated via `CG‑Spec` rather than re‑invented locally).

Within suite protocols, CPM appears as the explicit `compare` stage: it consumes admitted left/right profiles (scores and/or folded measures **when** those upstream stages are present) and produces a lawful, auditable **comparison relation** that downstream selection can consume without CPM smuggling selection or scoring semantics into “comparison”.
## Problem

Engineering teams frequently need to compare two options (designs, methods, vendors, trajectories, hypotheses, etc.) across multiple measures and under incomplete evidence. Without a canonical comparison mechanism, teams predictably fall into one or more of these failure modes:

* **Hidden scalarization:** forcing a single number (or a single winner) from multi‑criteria reality, erasing incomparability and ties.
* **Silent totalization:** inventing an implied total order by convenience tie‑breakers or implicit thresholds, even when only a partial order is warranted.
* **Illegal arithmetic:** comparing across measures using operations that are not scale‑lawful (CSLC‑violating) or not admitted by the declared legality frame.
* **Comparator drift:** “the comparator” exists only as prose or code intuition; different teams compare “the same thing” differently because the comparator spec is not explicit and edition‑pinned.
* **Unknown coercion:** missing/unknown evidence is coerced into an outcome (e.g., “treat missing as equal”, “treat unknown as worse”), producing comparisons that look decisive but are epistemically unsafe.
* **Cross‑context leakage:** comparing across contexts/planes without explicit bridges, CL routing, or penalties discipline, producing misleading outcomes that ignore transport costs and reference plane constraints.

CPM exists to make the comparison act explicit, legality‑gated, set‑valued, and auditable—so downstream selection can remain a separate, policy‑bound step.
## Forces

1. **Usability vs correctness:** engineers want a “simple compare” function; correctness demands explicit legality, explicit comparator choice, and explicit handling of incomparability/unknown.
2. **Total order convenience vs partial order truth:** total orders simplify downstream selection; partial orders are often the faithful representation (especially in multi‑criteria settings).
3. **Evolvability vs stability:** comparator methods evolve (SoTA churn); kernel semantics and slot surfaces must remain stable and wiring‑friendly.
4. **Auditability vs speed-of-discussion:** teams want fast decisions; FPF requires audit pins and explicit edition/policy references for reproducibility.
5. **Cross‑context reasoning vs transport discipline:** comparisons across contexts are valuable, but they require bridge‑only crossings and explicit penalty routing, not implicit “normalization by hand”.
6. **Avoiding “second centers of gravity”:** mechanism semantics must have a single owner; otherwise the suite, `A.6.1` archetypes, and Part‑G wiring drift apart.
## Solution

CPM is specified as a canonical `U.Mechanism.Intension` whose core commitments are:

* **Comparator legality is declared and gated** (`CG‑Spec.ComparatorSet`, and `CG‑Spec.SCP` when numeric operations are involved; scale lawfulness via CSLC).
* **Results are set‑valued relation/poset tokens**; partial orders remain partial; no silent scalarization or totalization.
* **Admissibility is tri‑state and fail‑closed** on missing legality/evidence; unknown never coerces into a fabricated outcome.
* **Comparison remains distinct from selection**; CPM produces relation outcomes; `SelectorMechanism` consumes them.

This pattern defines (single‑owner, wiring‑friendly):
1. a **stable mechanism boundary** for lawful comparison: `Compare(...) → ComparisonResultSlot` plus a tri‑state `CompareEligibility` guard;
2. a **stable SlotKind surface** (by suite lexicon tokens) that downstream selection and Part‑G wiring can rely on without SlotKind drift;
3. a **legality/evidence responsibility split**: legality is gated by `CG‑Spec` (and CSLC), while admission/comparability routing is cited from `CN‑Spec`;
4. a minimal **audit contract**: what pins/editions MUST be recorded to make a comparison replay‑grade;
5. explicit **P2W separation**: planned baseline binds editions/policies; CPM records effective bindings in `Audit`.

### Mechanism.Intension (canonical; normative)

This is the canonical `U.Mechanism.Intension` for `CPM.IntensionRef`. It is intended to be cited by CHR suite artifacts and by any wiring layers.

* **Scope note:** this intension is an **instance** authored to the `U.Mechanism.Intension` shape (`A.6.1`). It does **not** publish/telemetry, does **not** publish `GateDecision` nor `DecisionLog` surfaces (gate‑only), and does **not** embed selection. It emits `Audit` pins and a tri‑state guard only (per suite obligations).
  * **P2W separation:** this intension does **not** bind project‑specific pins (editions, policy‑ids, bridge ids, etc.). Binding lives in planned baseline artefacts (A.15.3 + `A.19.CHR:4.7.2`); executions record effective refs/pins in `Audit`.

* **IntensionHeader:** `id = CPM`, `version = 1.0.0`, `status = stable`.

* **IntensionRef:** `CPM.IntensionRef` (canonical target for the suite member named in `A.19.CHR:4.2`).

* **SignatureManifest (optional; importability):** if a CPM publication is intended for reuse beyond the CHR suite, author SHOULD publish a `SignatureManifest` that records (i) the declared `Compare` stage‑op signature, (ii) the SlotKind surface (by lexicon tokens), and (iii) the explicit set‑valued output commitment (no silent scalarization/totalization).

* **Tell.** Lawful comparison producing **set‑valued** parity / poset outcomes (not a single scalar).

* **Purpose:** lawful comparison producing **set‑valued** parity / poset outcomes (not a single scalar).

* **Imports:** `G.0 (CG‑Spec.ComparatorSet, CG‑Spec.SCP, CG‑Spec.MinimalEvidence)`, `A.18 (CSLC)`, `A.19.CN (comparability routing)`, `A.19.CHR:4.2.1 (CHR SlotKind Lexicon)`.

* **SubjectBlock:**

  * **SubjectKind:** `Comparison`.
  * **BaseType:** CHR‑typed measures in a CG‑Frame (see `CG‑Spec.ComparatorSet`).
  * **SliceSet:** `U.ContextSliceSet`.
  * **ExtentRule:** comparison ranges over admitted left/right profiles under the active context slice, using a declared comparator from `CG‑Spec.ComparatorSet`.
  * **ResultKind?:** `U.Set` (relation/poset token set; set‑valued by default).

* **SlotIndex** (derived projection from `SlotSpecs` / guard SlotSpecs; uses `A.19.CHR:4.2.1` SlotKind tokens; no independent semantics):

  * `LeftProfileSlot : ⟨ValueKind = U.Set (of U.Measure), refMode = ByValue⟩`,
  * `RightProfileSlot : ⟨ValueKind = U.Set (of U.Measure), refMode = ByValue⟩`,
  * `CNSpecSlot : ⟨ValueKind = CN‑Spec, refMode = CNSpecRef⟩`,
  * `CGSpecSlot : ⟨ValueKind = CG‑Spec, refMode = CGSpecRef⟩`,
  * `ComparatorSpecSlot : ⟨ValueKind = ComparatorSpec, refMode = ComparatorSpecRef⟩`,
  * `ContextSlot : ⟨ValueKind = U.BoundedContext, refMode = U.BoundedContextRef⟩`,
  * `MinimalEvidenceSlot? : ⟨ValueKind = MinimalEvidence, refMode = MinimalEvidenceRef⟩` (optional override; otherwise cite `CGSpecSlot.MinimalEvidence`),
  * `ComparisonResultSlot : ⟨ValueKind = U.Set (relation/poset tokens), refMode = ByValue⟩`.

* **OperationAlgebra** (suite stage = `compare`, per `A.19.CHR:4.5`; canonical stage‑op = `Compare`):

  * `Compare(LeftProfileSlot, RightProfileSlot, CNSpecSlot, CGSpecSlot, ComparatorSpecSlot, ContextSlot, MinimalEvidenceSlot?) → ComparisonResultSlot`.

* **LawSet** (minimum; set‑valued comparison, no hidden scalarization):

  1. **ComparatorSet gate:** `ComparatorSpecSlot` MUST be an element of `CGSpecSlot.ComparatorSet` (legality gate; cite `G.0`).
  2. **Set‑valued semantics:** `ComparisonResultSlot` is set‑valued (parity/poset tokens); partial orders remain partial — no silent totalization/scalarization.
  3. **CSLC+SCP legality:** any numeric ops implied by the comparator MUST be admissible under `CGSpecSlot.SCP` and CSLC‑lawful (cite `G.0` + `A.18`).
  4. **Unknown is not coerced:** missing/unknown evidence MUST NOT be mapped to a comparison outcome; use tri‑state guards.
  5. **No hidden thresholds/tie‑breakers:** any thresholds, epsilons, priority orders, or tie‑break logic MUST live in the declared `ComparatorSpecSlot` (or in `CNSpecSlot.acceptance` as explicit acceptance clauses), edition‑pinned and auditable; CPM MUST NOT smuggle constants.
  6. **No implicit UNM:** CPM MUST NOT perform normalization/alignment internally. If `CNSpecSlot.comparability` routes comparison through normalization‑based invariants, `CompareEligibility` MUST treat “inputs are already normalized to the declared invariants” as a precondition for `pass` (otherwise `degrade|abstain` per policy). Any UNM dependence MUST be explicit upstream and auditable.

* **AdmissibilityConditions** (tri‑state guard; fail‑closed on missing legality/evidence):

  * `CompareEligibility(LeftProfileSlot, RightProfileSlot, CNSpecSlot, CGSpecSlot, ComparatorSpecSlot, ContextSlot, MinimalEvidenceSlot?) → GuardDecision ∈ {pass|degrade|abstain}`.
  * `pass` requires: (i) `ComparatorSpecSlot ∈ CGSpecSlot.ComparatorSet`, (ii) any comparator‑implied numeric ops are admissible under `CGSpecSlot.SCP` and CSLC‑lawful for the effective measure scales, (iii) both profiles are admitted/comparable under `CNSpecSlot.comparability` and `CNSpecSlot.acceptance` for the given `ContextSlot`, and (iv) evidence satisfies the **effective** MinimalEvidence policy (explicit override via `MinimalEvidenceSlot?`, otherwise `CGSpecSlot.MinimalEvidence`).
  * If `CNSpecSlot.comparability` is normalization‑based (compare‑on‑invariants), `pass` additionally requires that the inputs are already in the required invariants/normalization regime; CPM MUST NOT “make them comparable” by silent normalization.
  * If `MinimalEvidenceSlot` is absent, the guard MUST evaluate evidence against `CGSpecSlot.MinimalEvidence` (by explicit rule), and MUST NOT return `pass` when evidence is missing/unknown **or** fails the effective MinimalEvidence gate.

* **Applicability:**

  * Intended to be used as the CHR stage `compare`: it may follow indicatorization/scoring and optional folding **when those stages are present**, and it precedes selection wherever selection occurs; MUST remain distinct from selection (no embedded “pick best”).
  * Applicable only when legality/evidence surfaces are present via `CGSpecSlot` (fail‑closed otherwise).
  * When used inside the CHR suite, stage ordering/optionality is determined only by `A.19.CHR:4.5 (suite_protocols)`; CPM does not infer order from `mechanisms[]`.

* **Transport:** Bridge+CL/ReferencePlane only; penalties route to **`R_eff` only**.

* **Γ_timePolicy:** `point` by default (no implicit “latest”).

* **PlaneRegime:** values live on **episteme ReferencePlane**; on plane crossings apply **CL^plane** policy; penalties → **`R_eff` only**.

* **Audit:**

  * MUST record: `CNSpecRef.edition`, `CGSpecRef.edition`, and the effective comparator (`ComparatorSpecRef`).
  * When `MinimalEvidenceSlot?` is present, MUST record `MinimalEvidenceRef`; otherwise MUST cite `CGSpecSlot.MinimalEvidence` as the effective evidence policy.
  * SHOULD record: the realized `GuardDecision` for `CompareEligibility`, and (when `degrade`/`abstain`) any referenced failure‑behavior / downstream‑handling policy ids (e.g., a SoS‑LOG branch id) when such policies are in scope.
  * If `CNSpecSlot.comparability` routes comparison through normalization‑based invariants, Audit MUST record the effective upstream normalization dependency (e.g., the relevant UNM intension/edition or other explicit normalization witness), or explicitly record that the comparison abstained/degraded due to missing normalization admissibility.
  * SHOULD record: a stable description of `ComparisonResultSlot` and any Bridge/CL/ReferencePlane ids when `Transport` was invoked.
### Interpretation notes — informative

* **Set‑valued output is the default, not a loophole.** “Set‑valued” means CPM preserves incomparability/ties/partiality as first‑class outcomes; it does not authorize silent post‑processing into a scalar or a single winner.
* **Total orders are allowed only if declared by the comparator.** If a `ComparatorSpec` defines a total order, CPM still outputs a (singleton) set of relation tokens; the totalization is a property of the declared comparator, not an implicit kernel default.
* **Normalization is not smuggled into comparison.** If `CN‑Spec.comparability` routes comparison through normalization‑based invariants, that dependence must be represented explicitly via the suite protocol and/or explicit Uses contours (CPM consumes admitted profiles; it does not silently normalize them).
* **Thresholds and tie‑breakers are never “kernel constants.”** If thresholds exist, they belong to explicit policies/specs (e.g., `ComparatorSpec`, `AcceptanceClauses`), edition‑pinned and auditable; not to hidden constants inside CPM.
## Archetypal Grounding — informative

### Tell

Think of CPM as an **auditable relation‑builder**:

* Input: “two admitted profiles + an explicit comparator spec + declared legality/evidence surfaces”
* Output: “a **set‑valued** relation outcome that preserves incomparability and uncertainty”

The key didactic boundary is: **CPM compares; it does not decide.**
### Show (U.System) — comparing two supplier options without faking a total order

A program manager compares Supplier‑A vs Supplier‑B for a safety‑critical component. The team tracks a profile of measures (cost, lead time, defect rate, assurance, sustainability), but not all measures are strictly comparable across regions (different reporting regimes, different units).

* The project has a declared `CN‑Spec` (admission + comparability routing) and a declared `CG‑Spec` that lists lawful comparators in `ComparatorSet` and evidence rules in `MinimalEvidence`.
* The comparator chosen is explicit: `ComparatorSpecSlot = ParetoDominanceComparatorSpecRef@edition` (declared in `CG‑Spec.ComparatorSet`).
* CPM runs `Compare(...)`.

  * If Supplier‑A is better in cost but worse in defect rate and incomparable on assurance due to missing evidence, CPM does **not** invent “A wins” or “A loses”.
  * The guard returns `degrade` or `abstain` (per evidence policy), and the `ComparisonResultSlot` preserves the partial nature of the relation.
* The downstream `SelectorMechanism` can then return a portfolio (e.g., keep both suppliers in the candidate set) rather than forcing a single winner by hidden tie‑break rules.
### Show (U.Episteme) — uncertainty‑aware comparison with set‑valued outcomes

A research lead compares two proposed methods for a system component. Both methods have performance estimates with uncertainty bounds (e.g., distributions or prediction intervals). The team uses a SoTA uncertainty quantification package (post‑2015 conformal families are a common example) to avoid overstating confidence.

* `USCM` produces score profiles that are interval‑valued (or otherwise uncertainty‑annotated) rather than point estimates.
* The chosen comparator is uncertainty‑aware and declared as a `ComparatorSpec` (edition‑pinned) in `CG‑Spec.ComparatorSet`.
* CPM compares the two profiles and returns a set of relation tokens (e.g., “not worse”, “incomparable under evidence”, “abstain”), rather than forcing a numeric margin.
* The audit records the effective comparator edition and evidence policy, so later readers can reproduce *why* a comparison abstained or degraded (instead of mistaking “missing evidence” for “equality”).
## Bias-Annotation — informative

CPM is a comparison *kernel*; it does not remove bias by itself, but it prevents the most common bias‑amplifying failure modes (hidden thresholds, hidden tie‑breakers, unknown coercion).

Typical bias risks and mitigations:

* **Comparator choice encodes value judgments.** Weights, priority orders, thresholds, and “tie‑break” conventions can encode organizational bias. CPM forces these to live in explicit, edition‑pinned `ComparatorSpec`/policy artifacts rather than in invisible code or informal reasoning.
* **Missing evidence is rarely random.** If evidence is systematically missing for certain contexts/groups, naive “unknown → worse” is a bias amplifier. CPM’s tri‑state guard avoids coercion; but teams must still define policy‑bound failure behavior and be explicit when abstention is acceptable.
* **Cross‑context comparisons can embed structural unfairness.** CPM enforces bridge‑only transport and penalty routing (`R_eff` only), making “comparisons across worlds” explicit instead of silently assuming commensurability.
* **Overconfidence via scalarization.** Collapsing partial orders into scalars often overstates certainty and hides tradeoffs. CPM makes set‑valued outcomes first‑class, so the human/managerial decision can remain honest about tradeoffs.
## Conformance Checklist

A CPM publication / usage is conformant if it satisfies the checks below (these complement `CC‑UM.*` and the CHR suite obligations in `A.19.CHR:4.3`):

| Check Id | Requirement (normative) | Notes (didactic / evidence) |
| :--- | :--- | :--- |
| **CC‑A19CPM‑0** | **Mechanism.Intension completeness.** The publication includes the full intension shape (header/imports/subject/slot index/op algebra/laws/admissibility/applicability/transport/time/plane/audit) and uses tri‑state guards. | SlotIndex is **derived**; see `A.6.5` + `CC‑UM.*`. |
| **CC‑A19CPM‑1** | **Single owner.** The canonical CPM intension is owned here (`A.19.CPM:4.1`); other mentions are **Tell + Cite** stubs only. | Prevents “two near‑identical cards” drift. |
| **CC‑A19CPM‑2** | **Suite stage alignment.** `Compare` is the canonical stage‑op for CHR stage `compare`; ordering/optionality is taken only from `A.19.CHR:4.5`. | Never infer order from `mechanisms[]`. |
| **CC‑A19CPM‑3** | **SlotKind discipline.** SlotKind tokens follow the suite lexicon (`A.19.CHR:4.2.1`). | No SlotKind drift across specializations/wiring. |
| **CC‑A19CPM‑4** | **Comparator legality gate.** `ComparatorSpecSlot ∈ CGSpecSlot.ComparatorSet` is enforced (fail‑closed otherwise). | Legality is declared, not improvised. |
| **CC‑A19CPM‑5** | **Scale legality.** Any numeric operations implied by the comparator are admissible under `CGSpecSlot.SCP` and CSLC‑lawful. | “Weighted sum” etc must be explicitly lawful. |
| **CC‑A19CPM‑6** | **Set‑valued semantics.** Outputs remain set‑valued; no silent scalarization or totalization is introduced. | Incomparability/ties are first‑class outcomes. |
| **CC‑A19CPM‑7** | **Tri‑state admissibility (fail‑closed).** `CompareEligibility(...) → {pass|degrade|abstain}` exists and does not return `pass` on missing legality/evidence. | Unknown never coerces to `pass`. |
| **CC‑A19CPM‑8** | **MinimalEvidence defaulting is explicit.** If `MinimalEvidenceSlot?` is absent, the effective evidence policy is `CGSpecSlot.MinimalEvidence` by explicit rule. | Avoid “implicit evidence policy.” |
| **CC‑A19CPM‑9** | **Gate/guard separation + lexeme discipline.** CPM does not publish `GateDecision` nor `DecisionLog`; mechanism predicates use `…Eligibility` (not reserved gate `…Guard`). | Aligns with suite obligations (`gate_decision_separation`, `guard_lexeme_reservations`). |
| **CC‑A19CPM‑10** | **Transport / plane discipline.** Crossings are Bridge+CL/ReferencePlane only; penalties route to `R_eff` only; plane crossings use `CL^plane` when needed. | Keep cross‑world comparisons explicit. |
| **CC‑A19CPM‑11** | **Audit completeness.** Audit records `CNSpecRef.edition`, `CGSpecRef.edition`, effective `ComparatorSpecRef@edition`, and the effective evidence policy (override or cited default). | SHOULD record GuardDecision + crossing ids. |
| **CC‑A19CPM‑12** | **P2W separation.** Editions/policy‑ids are bound only in planned baseline artefacts; CPM records effective refs/pins in Audit and does not bind them. | Planned baseline = A.15.3 + suite PlanItem. |
| **CC‑A19CPM‑13** | **No implicit UNM.** CPM never performs silent normalization; normalization‑based comparability requires explicit upstream UNM witness (or `abstain/degrade`). | Keeps “compare‑on‑invariants” explicit. |
## Common Anti‑Patterns and How to Avoid Them

* **Anti‑pattern: “Comparison returns a score.”**
  *Symptom:* `Compare(x,y)` returns a numeric margin or a single rank position.
  *Avoid:* keep numeric scoring in `USCM`; CPM returns relation tokens (set‑valued). If a numeric comparator is desired, it must be an explicit `ComparatorSpec` and still yields relation tokens as the kernel output.

* **Anti‑pattern: “CPM picks the winner.”**
  *Symptom:* comparison logic embeds winner selection or portfolio truncation.
  *Avoid:* CPM only compares; selection is `SelectorMechanism`, which consumes comparison outcomes and remains policy‑bound.

* **Anti‑pattern: “Comparator by prose / by code default.”**
  *Symptom:* comparator choice is implicit (e.g., “we usually do lexicographic by safety then cost”), not edition‑pinned.
  *Avoid:* require an explicit `ComparatorSpecRef` from `CG‑Spec.ComparatorSet` and record it in Audit.

* **Anti‑pattern: “GateDecision leakage.”**
  *Symptom:* the `compare` step emits/assumes `GateDecision`/GateLog/DecisionLog artifacts as part of suite closure, or uses reserved gate‑lexemes (`…Guard`) for mechanism‑level predicates.
  *Avoid:* keep CPM at guard+audit level (`…Eligibility → GuardDecision ∈ {pass|degrade|abstain}`); route gate decisions to their proper owners and keep publish/telemetry outside suite closure.

* **Anti‑pattern: “SlotKind drift.”**
  *Symptom:* renaming/re‑purposing `LeftProfileSlot/RightProfileSlot/ComparatorSpecSlot/ComparisonResultSlot` across specializations or across CHR layers.
  *Avoid:* use the suite SlotKind lexicon (`A.19.CHR:4.2.1`) and keep SlotIndex as a derived projection.

* **Anti‑pattern: “Smuggling plan‑binding into CPM.”**
  *Symptom:* hard‑coding comparator editions, policy ids, or “launch values” inside the CPM intension/pattern prose.
  *Avoid:* bind editions/policies only in P2W planned baseline artefacts; keep CPM refs‑only and record effective bindings in `Audit`.

* **Anti‑pattern: “Tie‑breakers as hidden constants.”**
  *Symptom:* forced total order via untracked thresholds, epsilons, or “if equal then compare cost” logic.
  *Avoid:* make tie‑break policy part of explicit comparator/acceptance policies; pin editions; audit.

* **Anti‑pattern: “Unknown coerces to outcome.”**
  *Symptom:* missing evidence treated as equal/zero/worse, producing decisive comparisons from absent information.
  *Avoid:* tri‑state guard; fail‑closed on missing evidence; explicit failure behavior via evidence policy.

* **Anti‑pattern: “Cross‑context compare without transport.”**
  *Symptom:* comparing profiles across contexts/planes without Bridge+CL/ReferencePlane discipline.
  *Avoid:* use transport mechanisms and crossing pins; penalties route to `R_eff` only; audit crossing ids.
## Consequences

* **Improved usability (didactic):** CPM gives a single, engineer‑readable place to learn “what lawful comparison means” and what it does *not* mean.
* **Higher auditability:** comparison outcomes can be traced to comparator edition, legality surfaces, and evidence policies.
* **Reduced semantic drift:** teams cannot silently shift from Pareto to lexicographic to “weighted sum” without changing explicit comparator specs and pins.
* **Explicit tradeoffs:** set‑valued outcomes force downstream reasoning to acknowledge incomparability and uncertainty rather than hiding them.
* **Cost:** downstream consumers (notably selection) must handle sets, abstentions, and partial orders explicitly. This is intentional: it moves complexity from hidden heuristics into explicit policy‑bound mechanisms.
## Rationale

1. **Set‑valued by design:** partial orders are common in multi‑criteria settings; pretending they are total creates false certainty and brittle decisions.
2. **ComparatorSet gating:** declaring what comparisons are legal (and under what scale/evidence rules) prevents “algorithm by convenience”.
3. **Tri‑state guards:** explicit `pass|degrade|abstain` preserves epistemic honesty: unknown is not silently converted into an outcome.
4. **Strict distinction:** separating compare from score and select prevents hidden semantic coupling and improves evolvability (methods change via wiring; kernel stays stable).
5. **Single‑owner canonicalization:** keeping one semantic owner eliminates “multiple near‑identical cards” that drift apart and destroy usability.
## SoTA-Echoing

**SoTA vs popular note.** This section records alignment to post‑2015 evidence‑backed practice. It is **not** a mandate to use fashionable methods; method semantics stay in SoTA packs (`G.2`) and wiring modules, while this pattern fixes the stable CPM mechanism boundary.

**Pack note (Phase‑3).** If/when a CPM‑specific `G.2` SoTA pack/ClaimSheet is introduced, prefer citing the pack’s `ClaimSheetId`(s) over raw bibliographic pointers below, keeping CPM’s kernel semantics unchanged.

| SoTA practice pointer (post‑2015)                                                                                                   | How it connects to CPM                                                                                                                                           | Adoption status in FPF                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Fair ranking / constrained ranking** (e.g., Zehlike et al., 2017; Biega et al., 2018)                                             | Reinforces the “no hidden tie‑breaks/thresholds” stance: fairness constraints belong in explicit comparator/acceptance policies, not as silent kernel constants. | Integrate via `ComparatorSpec` editions in `CG‑Spec.ComparatorSet` + policy pins; CPM remains unchanged.              |
| **Uncertainty‑aware / set‑valued inference** (e.g., Romano et al., 2019; Barber et al., 2021)                                       | Supports “comparison may abstain” and “set‑valued outcomes are honest”: uncertain profiles should not be coerced into point‑comparisons.                         | Model as comparator families (or supporting method families) packaged in `G.2`; wired into declared `ComparatorSpec`. |
| **Differentiable sorting / learned comparators** (e.g., Grover et al., 2019; Blondel et al., 2020)                                  | When comparators are learned, explicit comparator specs and edition pins become even more critical for auditability and drift control.                           | Treated as method implementations behind `ComparatorSpec` (wiring‑only in Part G); CPM kernel stays stable.           |
| **Robust multi‑criteria decision support under partial orders** (modern robust outranking / preference‑learning variants post‑2015) | Emphasizes preserving incomparability and explicitly encoding thresholds/preferences as declared artifacts.                                                      | Packaged as comparator families; legality and evidence remain gated by `CG‑Spec`.                                     |
## Relations

**Builds on / cites (non‑exhaustive):**

* `A.6.1` (shape of `U.Mechanism.Intension`; specialization discipline)
* `A.6.5` (slot discipline; SlotIndex as derived projection)
* `A.19.CHR` (suite membership + obligations + `suite_protocols`; CHR SlotKind lexicon)
* `A.15.3` + `A.19.CHR:4.7.2` (P2W planned baseline binding; CPM remains refs‑only w.r.t. pin binding)
* `A.19.CN` (CN‑Spec comparability routing + acceptance/admission surfaces)
* `G.0` (CG‑Spec: `ComparatorSet`, `SCP`, `MinimalEvidence`, CL/ReferencePlane framing)
* `A.18` (CSLC scale lawfulness)
* `E.10` (lexical/ontological authoring rules; kind suffix discipline)
* `E.19` (checks; authoring discipline)
* `E.20` (single‑owner discipline)
* `F.18` (alias docking; ID continuity)
* `E.18 (E.TGA)` (project transduction graphs consume CPM instances; CPM does not create a parallel “card deck”)

**Relates to (typical neighbors in CHR Uses contour):**

* `UNM.IntensionRef`, `UINDM.IntensionRef`, `USCM.IntensionRef`, `ULSAM.IntensionRef`, and `SelectorMechanism.IntensionRef` (downstream consumer of CPM results).
* `G.5` (selection conformance), `G.9` (parity / benchmark harness), `G.10`/PTM (publish/telemetry outside suite closure).
## A.19.CPM:End
