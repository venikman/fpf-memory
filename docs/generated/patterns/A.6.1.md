---
title: "U.Mechanism - Law‑governed application to a SubjectKind over a BaseType"
description: "Part A - Kernel Architecture Cluster"
---

# U.Mechanism - Law‑governed application to a SubjectKind over a BaseType
> Pattern `A.6.1` · Stable
> Part A - Kernel Architecture Cluster

**One‑line summary.** A `U.Mechanism` is a specialisation of `U.Signature` (A.6.0): its **Vocabulary** is an explicit **OperationAlgebra** whose operators publish **SlotSpecs** (A.6.5), its **Laws** are a **LawSet**, and it adds **AdmissibilityConditions** (operational guards) plus a named **Transport** clause for cross‑context use. Transport is **Bridge‑only** (per **F.9**) with penalties routed to the **Reliability** channel only (**R**, or **R_eff** when distinguished) (per **B.3**); **F/G** remain invariant; **CL^plane** follows **C.2.1 CHR:ReferencePlane**. Realizations MAY be published, but MUST be monotone w.r.t. the Mechanism’s **LawSet** (and any imported Signature laws) and MUST treat imported signatures as opaque (use `imports`/`provides` + ClaimIds).

**Status.** Normative \[A\] in **Part A (Kernel)**.  

**Placement.** Immediately **after A.6.0** as **A.6.1**. **USM (A.2.6)** and **UNM (A.19/C.16)** become **instances conforming to A.6.1** (no semantic change to either).

**Mint vs reuse.** This pattern mints the Kernel lexemes `U.Mechanism`, `U.MechMorph`, and `U.MechAuthoring`, plus the descriptive record names `MechanismDescription`, `MechFamilyDescription`, and `MechInstanceDescription`. It reuses `U.Signature` (A.6.0), `U.Type`, `U.BoundedContext`, and Part F Bridge/CL/ReferencePlane terms without changing them; it does **not** mint new `U.Type` core types.

**Type.** Architectural pattern (kernel‑level; notation‑independent).

**LEX.TokenClass (E.10).** Declared here for the tokens minted by this pattern (see **E.10:7.1**).
* `LEX.TokenClass(U.Mechanism) = KernelToken`
* `LEX.TokenClass(U.MechMorph) = KernelToken`
* `LEX.TokenClass(U.MechAuthoring) = KernelToken`
* `LEX.TokenClass(MechanismDescription) = KernelToken`
* `LEX.TokenClass(MechFamilyDescription) = KernelToken`
* `LEX.TokenClass(MechInstanceDescription) = KernelToken`

Give FPF **one uniform kernel shape** for things like **USM** (set‑algebra on context slices) and **UNM** (classes of admissible normalizations with ≡\_UNM) so authors can **define, compare, refine, compose, and port** mechanisms **without re‑inventing the meta‑language**; all cross‑context use is **Bridge‑only** with **CL penalties to R/R_eff**, never to **F/G**.

## Keywords

- Mechanism
- OperationAlgebra
- LawSet
- AdmissibilityConditions
- Transport
- Bridge-only.

## Relations

- `A.6.1` --outline_parent--> [Signature Stack & Boundary Discipline](/generated/patterns/A.6)
- `A.6.1` --outline_prev_sibling--> [U.Signature — Universal, law‑governed declaration](/generated/patterns/A.6.0)
- `A.6.1` --outline_next_sibling--> [U.EffectFreeEpistemicMorphing — Effect-Free Morphisms of Epistemes](/generated/patterns/A.6.2)
- `A.6.1` --explicit_reference--> [U.Signature — Universal, law‑governed declaration](/generated/patterns/A.6.0)
- `A.6.1` --explicit_reference--> [U.RelationSlotDiscipline - SlotKind / ValueKind / RefKind discipline for n‑ary relations (with slot‑operation lexicon)](/generated/patterns/A.6.5)
- `A.6.1` --explicit_reference--> [Alignment & Bridge across Contexts](/generated/patterns/F.9)
- `A.6.1` --explicit_reference--> [Trust & Assurance Calculus (F–G–R with Congruence)](/generated/patterns/B.3)
- `A.6.1` --explicit_reference--> [U.Episteme — Epistemes and their slot graph](/generated/patterns/C.2.1)
- `A.6.1` --explicit_reference--> [Unified Scope Mechanism (USM): Context Slices & Scopes](/generated/patterns/A.2.6)
- `A.6.1` --explicit_reference--> [A.CHR-SPACE — CharacteristicSpace & Dynamics hook](/generated/patterns/A.19)
- `A.6.1` --explicit_reference--> [MM-CHR — Measurement & Metrics Characterization](/generated/patterns/C.16)
- `A.6.1` --explicit_reference--> [Unidirectional Dependency](/generated/patterns/E.5.3)
- `A.6.1` --explicit_reference--> [LEX-BUNDLE: Unified Lexical Rules for FPF](/generated/patterns/E.10)
- `A.6.1` --explicit_reference--> [Transduction Graph Architecture (E.TGA)](/generated/patterns/E.18)
- `A.6.1` --explicit_reference--> [Signature Stack & Boundary Discipline](/generated/patterns/A.6)
- `A.6.1` --explicit_reference--> [FPF Authoring Conventions & Style Guide](/generated/patterns/E.8)
- `A.6.1` --explicit_reference--> [SoTA Pack Shipping (pack-boundary owner; SoTA-Pack(Core))](/generated/patterns/G.10)
- `A.6.1` --explicit_reference--> [Telemetry-Driven Refresh & Decay Orchestrator](/generated/patterns/G.11)
- `A.6.1` --explicit_reference--> [Reliability R in the F–G–R triad](/generated/patterns/C.2.2)
- `A.6.1` --explicit_reference--> [Unified Formality Characteristic F](/generated/patterns/C.2.3)
- `A.6.1` --explicit_reference--> [GateProfilization: OperationalGate(profile) (GateFit core)](/generated/patterns/A.21)

## Content

## Problem frame

Give FPF **one uniform kernel shape** for things like **USM** (set‑algebra on context slices) and **UNM** (classes of admissible normalizations with ≡\_UNM) so authors can **define, compare, refine, compose, and port** mechanisms **without re‑inventing the meta‑language**; all cross‑context use is **Bridge‑only** with **CL penalties to R/R_eff**, never to **F/G**.
## Problem

Without a kernel abstraction, scope/normalization/comparison constructs proliferate with incompatible algebras and guard surfaces; cross‑context reuse lacks visible **Bridge/CL routing**; comparability drifts into **illegal scalarisation** (e.g., ordinal means). FPF already curbs this via **A.6.0** (Signature discipline, `SignatureManifest`), **USM** (scope algebra & Γ_time), **UNM** (normalize‑then‑compare), and **CG‑Spec** (lawful comparators/ScoringMethods)—but lacks a **common meta‑slot** for “mechanism.”
## Forces

**Locality vs transport.** Semantics are **context‑local**; crossing contexts is **Bridge‑only** (Part F/B.3); penalties hit **R/R_eff**; **F/G** invariant.

**Expressivity vs legality.** Rich operators vs **CHR legality** and **CG‑Spec** (no ordinal averages; lawful unit alignment).

**Time determinacy.** Explicit **Γ_time**; no implicit *latest*. (Required in USM’s `ContextSlice`.)

**Slot clarity vs specialisation depth.** Multi‑level specialisations require explicit **SlotSpecs** (A.6.5) and monotone refinement of **ValueKinds**; SlotKinds are stable across levels (no implicit positional parameters).

**Signature hygiene.** Obey `SignatureManifest` discipline (A.6.0:4.4.1): explicit `imports`/`provides`, acyclic imports, and no redeclare. Treat imported signatures as **opaque** (reference only their `provides` symbols + ClaimIds) and keep realizations monotone.
## Solution

### Mechanism Intension

A `U.Mechanism` **publishes**  
        `U.Mechanism.Intension := ⟨IntensionHeader, Imports,
                SubjectBlock := ⟨SubjectKind, BaseType, SliceSet, ExtentRule, ResultKind?⟩,
                SlotIndex, OperationAlgebra, LawSet, AdmissibilityConditions,
                Applicability, Transport, Γ_timePolicy, PlaneRegime, Audit⟩`  
and admits Realizations that respect it. The shape is **notation‑independent** and **conceptual** (no tooling, storage, or CI metadata).

* **A.6.0 alignment (normative).** `U.Mechanism` is a specialisation of `U.Signature` (A.6.0). A mechanism publication **SHALL** include the universal four‑row Signature Block (*SubjectBlock / Vocabulary / Laws / Applicability*). The canonical mapping is:  
  – **SubjectBlock** ↔ `SubjectBlock`  
  – **Vocabulary** ↔ `OperationAlgebra` (including inline SlotSpecs per A.6.0:4.1.1 / A.6.5)  
  – **Laws** ↔ `LawSet`  
  – **Applicability** ↔ `Applicability`  
  `SlotIndex` is a mechanism-only **index/projection** over SlotSpecs used by `OperationAlgebra` (and any extra SlotSpecs used only by `AdmissibilityConditions`); it does **not** introduce a fifth Signature row and does not relax A.6.0:4.1.1.
  Mechanism‑only additions are `AdmissibilityConditions`, `Transport`, `Γ_timePolicy`, `PlaneRegime`, and `Audit`; they extend the Signature without contradicting its intension/specification split (A.6.0; CC‑A.6.0‑5).

* **IntensionHeader.** `id` (PascalCase), `version` (SemVer), `status` (draft/review/stable/deprecated).
  **SignatureManifest coupling (normative).** If the mechanism is intended to be imported/reused, it MUST include a `SignatureManifest` (A.6.0:4.4.1) immediately above its Signature Block. When both are present:
  – `IntensionHeader.id = SignatureManifest.id`
  – `IntensionHeader.version = SignatureManifest.version`
  – `IntensionHeader.status = SignatureManifest.status` (when `status` is present)
  – `Imports = SignatureManifest.imports`
  and any public symbols minted by the Mechanism’s Signature Block **MUST** appear in `SignatureManifest.provides`.
  Avoid duplicating `imports/provides` elsewhere: dependency edges and exported names live in the manifest; operational details live in the mechanism.

* **Imports.** (Optional) SignatureIds that supply non‑Kernel symbols used by this mechanism’s Signature Block and/or this mechanism’s operation algebra. If the mechanism includes a `SignatureManifest`, then `Imports` MUST equal `SignatureManifest.imports`. If present, the list MUST be acyclic and MUST respect the layering rule in A.6.0:4.4.1 (E.5.3 + E.10).
* **BaseType.** A `U.Type` the mechanism ranges over. CHR spaces (e.g., a `U.CharacteristicSpace`/chart family) appear here **as types**; outside CHR, use set‑typed `U.Type`s. A conformant `U.Mechanism` publication **MUST NOT** mint a new core type here; it **MUST** reference existing `U.Type`s. If planes differ, state the **ReferencePlane** policy (see *PlaneRegime*).
* **SubjectKind / SliceSet / ExtentRule / ResultKind? / SlotIndex.**
  • **SubjectKind.** The intensional kind acted upon (C.3.1/3.2), separate from quantification.
  • **SliceSet.** The addressable set of Context slices (USM: **ContextSliceSet**).
  • **ExtentRule.** A rule yielding `Extension(SubjectKind, slice)` (C.3.2), used as the quantifier’s domain.
  • **ResultKind?** Optional intensional kind for outputs of `OperationAlgebra`.
  • **SlotIndex.** A set (or map) of SlotSpecs `SlotSpec = ⟨SlotKind, ValueKind, refMode⟩` (A.6.0:4.1.1; A.6.5) covering every argument position used by **OperationAlgebra** and **AdmissibilityConditions**. SlotKinds are stable names for substitution and specialisation; parameter names/indices are presentation only.  
    For **Vocabulary-level** operators, SlotSpecs remain declared **in each operator’s parameter block** (A.6.0:4.1.1). `SlotIndex` is an extracted index that **MUST** be mechanically derivable from those declarations (plus any guard-only SlotSpecs). Guard-only SlotSpecs **SHALL** be authored as part of the **AdmissibilityConditions** predicate signatures (not only as prose) so they remain mechanically extractable.
    **Shorthand views (didactic only).** Authors MAY include a simple name→ValueKind list (a `ValueKindView`) as a didactic projection of SlotSpecs, but it SHALL NOT replace SlotSpecs (`SlotKind/ValueKind/refMode`) in normative Mechanism definitions. If present, it MUST be mechanically derivable from `SlotIndex` (e.g., `ValueKindView = π_value(SlotIndex)` by dropping `refMode`). The colloquial label **ParamKind** is permitted only in prose as a synonym for the `ValueKind` component of a SlotSpec; it MUST NOT be introduced as a field name, token, or type.
* **OperationAlgebra.** Named operations whose signatures are expressed over SlotKinds from `SlotIndex` (A.6.5); **no implicit parameters**. For every n‑ary operator, its Vocabulary declaration **SHALL** publish SlotSpec triples per argument position (A.6.0:4.1.1); positional indices are presentation only. Examples:  
  • **USM:** `∈, ⊆, ∩, SpanUnion, translate, widen, narrow, refit`.  
  • **UNM:** `apply(method)`, `compose`, `quotient(≡_UNM)`; **normalize‑then‑compare**.

* **LawSet.** Equations/invariants (no proofs here). **Admissions/eligibility tests belong under AdmissibilityConditions, not here.** Laws **MUST** be compatible with CHR legality where numeric comparison/aggregation is induced. Examples:
  • **USM:** serial **intersection**; **SpanUnion** only where a **named independence assumption** is satisfied (state features/axes, validity window, evidence class); `translate` uses declared Bridges; **Γ_time** is mandatory.  
  • **UNM:** **scale‑appropriate** transforms — ratio→positive‑scalar; interval→affine; ordinal→monotone; nominal→categorical; `tabular:LUT(+uncertainty)`.  
  *(A conformant `U.Mechanism` publication **MUST NOT** mint a new Kernel token for “certificate”; if such a type is later required, it **MUST** follow DRR/LEX minting.)*

* **AdmissibilityConditions.** Deterministic, **context‑local** *operational* guard predicates that **fail closed** (e.g., “Scope covers TargetSlice” with named **Γ_time**; “NormalizationMethod class + validity window named”). Predicate arguments **SHALL** be declared via SlotSpecs from `SlotIndex` (A.6.5), not as implicit positional parameters. Unknowns **→ {degrade | abstain}**; never coerce to 0/false.

* **Applicability.** Binding to a **`U.BoundedContext`** with stance/plane/time notes and any **CG‑Spec/MM‑CHR** legality claims; cross‑context use is declared via **Transport** only.

* **Transport.** **Bridge‑only** semantics for cross‑context / cross‑plane use: name the Bridge and channel (`Scope|Kind`) per **F.9**, and record **ReferencePlane**(src,tgt) per **C.2.1**. **Terminology:** this `Transport` clause is a declarative policy surface; it does **not** introduce a `U.Transfer` edge (see **E.18** term separation). The Transport clause **MUST NOT** restate CL ladders, `CL^plane`, or Φ/Ψ tables; it **MUST** reference the applicable policy ids / registries instead; penalties **route to R/R_eff only** and **never** mutate F/G (per **B.3**). Crossings are explicit; **no implicit crossings**. Where **USM** or **KindBridge** are used together, apply the **two‑bridge rule** (scope CL and kind `CL^k` penalties handled **separately** to the Reliability channel (**R**/**R_eff**)).

* **Γ_timePolicy.** Point/window/policy; **no implicit “latest.”** Validity windows are **named**; **required** whenever guards reference time.
* **PlaneRegime.** Declare `ReferencePlane` on values/paths; when planes differ, name **CL^plane** and apply a **Φ_plane** policy (Part F/B.3). Plane penalties **do not** change CL; route to **R/R_eff** only; **F/G** stay invariant.

* **Audit.** Conceptual audit surface only (no data/telemetry workflows): crossings are publishable on **UTS**; surface **policy‑ids** rather than tables. Edition pins and regression hooks (if any) are referenced by id; operational details remain out of scope.
* **SignatureBlock alignment.** The referenced Signature’s four‑row Block (A.6.0) is canonical. Any mechanism rendering MUST preserve that block (or an explicit projection of it) and MUST obey A.6.5 for n‑ary argument discipline. SlotKinds and SlotSpecs in `SlotIndex` remain part of the **Vocabulary** row (A.6.0) and **MUST** obey A.6.5. 

* **Compatibility with A.6.\*** A.6.1 is a strict specialisation of A.6.0: the canonical four‑row Signature Block remains the source of truth; additional Mechanism fields (algebra, carriers, evidence) must not introduce new semantic rows or shadow the signature’s `imports`/`provides`.
### U.MechMorph - Refinement, Extension, Equivalence & Composition

**Intent.** Provide structure‑preserving **relations & constructors** between mechanisms.  
**Definitions.**

* **Refinement** `M′ ⊑ M`: narrows the **SubjectBlock** and/or **SlotSpecs** (ValueKinds/refMode for inherited SlotKinds) and/or **strengthens** `LawSet`/`AdmissibilityConditions` (safe substitution; Liskov‑style). A Refinement **MUST NOT** rename SlotKinds or add new required arguments to inherited operations.
* **Extension** `M ⊑⁺ M″`: **adds operations** (and any new SlotKinds used only by those new operations) without weakening existing Laws/Guards; old programs remain valid (conservative extension).
* **Equivalence** `M ≡ M′`: there exists a bijective mapping between Subjects/ops preserving/reflecting **LawSet** (up‑to‑isomorphism on **BaseType** and **OperationAlgebra**).
    
* **Quotient** `M/≈`: factor by a **congruence** (e.g., **≡_UNM** for charts).

* **Product** `M×N`: independent **BaseTypes**; ops are component‑wise; ensures **no illegal cross‑ops** (e.g., set‑algebra discipline for `SpanUnion`). Where independence is claimed, **name and justify** the assumption (do not mint new Kernel types here).

#### Multi-level specialisation ladders (normative)

Many families need a **generic** mechanism at the top (e.g., “select anything”) and progressively **specialised** mechanisms below (e.g., “select a method by decision theory”, “select a telemetry pack”). To keep such ladders **modular** and to prevent cross‑level leakage:

1. **Explicit parent + morphism kind.** Any mechanism that specialises another **MUST** name its parent and declare whether the step is a **Refinement** (`⊑`) or an **Extension** (`⊑⁺`). A specialisation family **MUST** be acyclic (a DAG).

2. **SlotKind invariance across levels.** For every inherited operation/guard predicate, SlotKinds are invariant (A.6.5). A specialisation step **MUST NOT** rename an inherited SlotKind, change its documented semantics, or rely on positional re‑ordering instead of SlotKind identity.

3. **ValueKind monotonicity.** A Refinement MAY narrow `ValueKind` (i.e., `ValueKind′ ⊑ ValueKind` in Kind‑CAL) and/or `refMode` for an inherited SlotKind, and MAY strengthen Laws/Guards. It **MUST NOT** widen ValueKinds or relax Guards; otherwise mint a new parent mechanism or publish an adapter mechanism.

4. **No new mandatory inputs to inherited operations.** If a specialisation needs extra inputs, it **MUST** introduce a new operation (Extension) or an adapter mechanism; it **MUST NOT** retrofit new required parameters into an inherited operation signature.

5. **No upward leakage.** A top‑level mechanism in a ladder **SHOULD** mention only the most general ValueKinds required by its SlotSpecs and Laws. Domain‑specific artefacts (e.g., decision‑theory policies, OEE generators, evaluation packs) belong in specialised mechanisms that refine slots and/or add operations.

*Informative selector ladder sketch.* `SelectorMechanism` can declare a stable slot interface (`CandidateSetSlot`, `ComparisonResultSlot`, `CriteriaSlot`, `ContextSlot`, `SelectionSlot`) with generic ValueKinds. `SelectorMethodMechanism ⊑ SelectorMechanism` then narrows `CandidateSetSlot.ValueKind` to `U.Method` and (by Extension) adds decision‑theory specific slots/ops; an OEE generator is authored as a separate mechanism that produces candidate/criteria packs consumed by the selector.
**Transport** `Bridge⋅M`: lifts across Contexts/planes; names **CL/CL^k/CL^plane** regimes; penalties → **`R_eff` only**; **UTS row** recommended for publication; **ReferencePlane(src,tgt)** recorded. If mapping losses are material, **narrow** the mapped set or publish an **adapter** (best practice).

**Passing example.** `USM′ = USM + “publish named independence‑assumption evidence for SpanUnion”` ⇒ **Refinement** (strengthened law; substitution‑safe).
**Normalization quotient.** `UNM / ≡_UNM` exposes **compare‑on‑invariants** surfaces for CPM/USCM (normalize‑then‑compare).
### U.MechAuthoring - Instantiation template

**MechanismDescription (E.8 Tell–Show–Show; I/D/S‑compliant):**
`Mechanism: U.<Name>`  *(Kernel conceptual description; no tooling fields)*
`Imports: <Signatures / U.Types>` - `SubjectBlock: <SubjectKind, BaseType, SliceSet, ExtentRule, ResultKind?>` - `SlotSpecs: <SlotIndex (A.6.5)>` - `OperationAlgebra: <operators with SlotKinds>` - `LawSet: <equations/invariants>` - `AdmissibilityConditions: <admission predicates with SlotKinds; Γ_time>` - `Transport: <Bridge channels; CL/CL^k/CL^plane named; ReferencePlane(src,tgt)>` - `PlaneRegime: <world|concept|episteme rules>`
### MechFamilyDescription & MechInstanceDescription

* **MechFamilyDescription**: `{Mechanism.Intension, Realizationα, Realizationβ, …}` — each Realization may **tighten** (never relax) Laws (Liskov‑style).

* **MechInstanceDescription**: `{Mechanism.Intension@Context, Windows, named Φ/Ψ/Φ_plane regimes, BridgeIds}` — a **conceptual instance**; operational telemetry/workflows are out of scope.
### Defaults

* **Local‑first semantics.** All judgments are **context‑local**; crossings are **explicit** and **costed** (CL→R only).
* **Compliance‑first comparability.** Numeric comparison/aggregation requires **CG‑Spec** (lawful **SCP**, Γ‑fold, MinimalEvidence); **partial orders return sets**; **no ordinal means**.
* **Tri‑state discipline.** `unknown → {degrade|abstain}`; `sandbox/probe‑only` is a **LOG branch** with a policy‑id (no implicit `unknown→0/false`).
* **R‑only penalties.** **Φ/Ψ/Φ_plane** are **monotone and bounded**; penalties route to **`R_eff` only**; **F/G invariant**.
### Born‑via‑A.6.1 sketch (informative)

**PTM — Publication & Telemetry Mechanism (informative)**
**BaseType:** `SoTA‑Pack(Core)`, `PathId/PathSliceId`, `PolicyId`. **OperationAlgebra:** emit **selector‑ready** packs with parity pins and **telemetry stubs**; listen for edition/illumination bumps; trigger **slice‑scoped** refresh. 
**LawSet:** **no change of dominance defaults** unless CAL policy promotes; edition-aware refresh.  
**Guards:** **GateCrossing visibility harness** blocks publication on missing crossing attestations (BridgeCard+UTS row, ReferencePlane, CL/CL^k/CL^plane, Φ/Ψ policy-ids), on lane-purity violations (CL→R only; F/G invariant), or on lexical SD violations (E.10). 
**Transport/Audit:** **G.10/G.11** publication & refresh semantics (CL routing to **R/R_eff**).

*Informative SoTA:* telemetry hooks align with post‑2015 quality‑diversity families (CMA‑ME/MAE, DQD/MEGA) and open‑ended methods (POET‑class) when monitored via illumination telemetry rather than scored.
### 60‑second didactic script

> *“To mint a mechanism, fill a **Mechanism.Intension**: declare **SubjectBlock** (**SubjectKind**, **BaseType**, **SliceSet**, **ExtentRule**, **ResultKind?**) and **SlotSpecs** (use a `SignatureManifest` if it is reusable); then **OperationAlgebra/Laws/AdmissibilityConditions** and **Γ_time**; define **Transport** (Bridge/CL with penalties to R only), and **Audit** (UTS + Path pins). USM and UNM are already such mechanisms; the same template births comparison, scoring, and publication mechanisms—safely bound to **CG‑Spec**—without leaving the kernel grammar.”*
### Quick “builder’s” checklist (author‑facing)

1. Draft a **run↔design charter**: why this Mechanism, which **guard surfaces** and **comparability** are in scope; which `DesignRunTag`/`CtxState.locus` boundary it mediates; is a **Γ_m (CAL)** builder needed?
    
* Fill **Mechanism.Intension** (**SubjectBlock**, **SlotSpecs**, **OperationAlgebra**, **LawSet**, **AdmissibilityConditions**, **Applicability**, **Transport**, **Γ_timePolicy**, **PlaneRegime**, **Audit**).
    
* Bind **CHR legality & CG‑Spec** when comparing/aggregating (ComparatorSet, ScaleComplianceProfile (SCP), MinimalEvidence, Γ‑fold).
    
Ship **UTS + G.10**; wire **G.11** telemetry (PathSlice‑keyed); ensure penalties **route to `R_eff` only**.
## Archetypal Grounding

### U.Scope (Claim/Work/Publication) — USM as a U.Mechanism instance (informative example)

* **Imports:** `U.ContextSliceSet`; Part F.9 **Bridge**; **C.2.1 ReferencePlane** (noted for crossings); **C.2.2 F–G–R**; **C.2.3 U.Formality**.
* **BaseType:** `U.ContextSliceSet`.
* **SliceSet:** `U.ContextSliceSet` (addressable `U.ContextSlice`s).
* **SubjectKind:** `U.Scope` with specializations `U.ClaimScope` (G), `U.WorkScope`, and `U.PublicationScope`.
* **OperationAlgebra:** `∈, ⊆, ∩, SpanUnion, translate, widen, narrow, refit`.
* **LawSet:** serial **intersection**; **SpanUnion** only where a **named independence assumption** is satisfied (state features/axes, validity window, evidence class); **translate** uses declared **Bridges**; **Γ_time** is **mandatory**.
* **AdmissibilityConditions:** deterministic **“Scope covers TargetSlice”**; **fail‑closed**; `unknown → {degrade|abstain}` (no implicit `unknown→0/false`).
* **Transport:** **Bridge‑only** with **CL**; penalties → **`R_eff`**; **F/G** invariant; publish UTS notes.
* **Γ_timePolicy:** `point | window | policy`; **no implicit “latest.”**
* **PlaneRegime:** *not applicable to scope sets* (scope is set‑valued over `ContextSlice`, no value‑plane); **CL^plane** N/A.
## Bias-Annotation (informative)

This pattern intentionally biases Mechanism authoring toward explicit contracts, context-local semantics, and auditable reuse.

* **Gov (governance).** Bias toward publishable obligations (Signature rows, CC items) and explicit policy-ids for crossings. Risk: perceived authoring overhead. Mitigation: reuse the `U.MechAuthoring` template; keep Realizations opaque and put operational details outside the Kernel.
* **Arch (architecture).** Bias toward locality-first semantics and **Bridge-only** transport with costs routed to **R/R_eff**. Risk: reduced convenience for ad-hoc cross-context reuse. Mitigation: publish adapter mechanisms and make crossings explicit via `Transport` (CC‑UM.3/CC‑UM.4).
* **Onto/Epist (ontology/epistemology).** Bias toward lawful comparability (CHR legality; CG‑Spec binding) and against illegal scalarisation (e.g., ordinal means). Risk: some heuristic scoring practices become non-conformant. Mitigation: represent uncertainty explicitly and use `unknown → {degrade|abstain}` rather than coercions (CC‑UM.7).
* **Prag (practice).** Bias toward notation-independence and against tool/vendor tokens in the Kernel. Risk: teams may want to inline CI/telemetry fields. Mitigation: keep audit surfaces conceptual (`Audit`) and reference operational hooks by id only (CC‑UM.6).
* **Did (didactic).** Bias toward explicit SlotKinds/SlotSpecs over positional parameters. Risk: steep learning curve. Mitigation: allow non-normative projections (`ValueKindView`) and include a “60‑second” script plus a builder’s checklist (A.6.1:4.7/4.8).
## Conformance Checklist (normative)

| ID | Requirement |
|----|-------------|
| **CC‑UM.0** | **A.6.0 alignment:** a conformant `U.Mechanism` publication **MUST** include the four‑row `U.Signature` Block (A.6.0). `OperationAlgebra` (including inline SlotSpecs per A.6.0:4.1.1/A.6.5) is the **Vocabulary** row, `LawSet` the **Laws** row, and `Applicability` the **Applicability** row; the universal block remains the comparability contract. Any `SlotIndex` is an index/projection and **MUST NOT** be treated as a fifth Signature row. |
| **CC‑UM.1** | **Complete Mechanism.Intension:** a conformant `U.Mechanism` publication **MUST** publish: `IntensionHeader(id, version, status); Imports; SubjectBlock (SubjectKind, BaseType, SliceSet, ExtentRule, ResultKind?); SlotIndex (A.6.5); OperationAlgebra; LawSet; AdmissibilityConditions; Applicability; Transport (Bridge named; ReferencePlane); Γ_timePolicy; PlaneRegime; Audit`. `IntensionHeader.id` **MUST** be PascalCase; `version` **MUST** follow SemVer; `status ∈ {draft|review|stable|deprecated}`. Eligibility/admission tests **MUST** be expressed as `AdmissibilityConditions`, not as `LawSet`. If the mechanism is intended to be imported/reused, it **MUST** also include a `SignatureManifest` per **CC‑A.6.0‑18**, consistent with `IntensionHeader`/`Imports` (A.6.1:4.1). |
| **CC‑UM.2** | **Monotone realization (contract discipline):** if a mechanism publishes (or implies) any realization of a signature, that realization MUST satisfy the signature’s LawSet (and imported laws) and MAY only tighten (never relax) them. Realizations MUST treat imported signatures as **opaque**: reference only symbols in `provides` (A.6.0:4.4.1) and cite ClaimIds (A.6.B). Do not mint a parallel signature header; use `SignatureManifest`. |
| **CC‑UM.3** | **Bridge‑only transport:** for any cross‑context/plane use, `Transport` **MUST** name the BridgeId and channel (F.9) and **MUST** record `ReferencePlane(src,tgt)` (C.2.1); when planes differ it **MUST** name `CL^plane`. Implicit crossings **MUST NOT** occur. When typed reuse is involved, the two‑bridge rule **MUST** apply (scope CL and kind `CL^k` penalties routed separately to **R**/**R_eff**). `Transport` is a declarative policy surface and **MUST NOT** be used to introduce a `U.Transfer` edge (E.18 term separation). It **MUST NOT** restate CL ladders or Φ/Ψ/Φ_plane tables; it **MUST** reference policy ids / registries. |
| **CC‑UM.4** | **R‑only routing:** any CL / `CL^k` / `CL^plane` penalties declared or incurred by `Transport` **MUST** reduce the Reliability channel only (**R**, or **R_eff** when distinguished) per **B.3**; they **MUST NOT** mutate **F/G**. |
| **CC‑UM.5** | **CG‑Spec binding:** if the Mechanism defines or induces any numeric comparison or aggregation, it **MUST** bind to **CG‑Spec/MM‑CHR** (lawful **SCP**, Γ‑fold, MinimalEvidence; normalize‑then‑compare) and obey CHR legality: partial orders **MUST** return sets; ordinal means **MUST NOT** be computed; interval/ratio arithmetic **MUST** occur only with unit alignment (CSLC‑proven). |
| **CC‑UM.6** | **E.8/E.10 compliance:** the A.6.1 publication **MUST** include Tell–Show–Show under **“Archetypal Grounding”** and **MUST** respect twin registers & I‑D‑S. Any new `U.*` token (including any new `U.Type`) **MUST** have a DRR and a `LEX.TokenClass` entry; `BaseType` **MUST** reference an existing `U.Type` (no in‑place minting), and any new `U.Type` required for that reference **MUST** be minted via DRR/LEX outside the mechanism definition. Non‑spec surfaces **MUST** end with **“…Description”**. Core narrative **MUST NOT** include tool/vendor tokens. |
| **CC‑UM.7** | **Unknowns tri‑state:** guard predicates in `AdmissibilityConditions` **MUST** be deterministic, context‑local, and fail‑closed; they **MUST** define `unknown → {degrade|abstain}` and **MUST NOT** coerce unknowns to 0/false. Sandbox/probe branches **MUST** live in **SoS‑LOG** (not Acceptance). |
| **CC‑UM.8** | **Multi‑level specialisation discipline:** if a Mechanism declares itself as `⊑` or `⊑⁺` of another Mechanism, it **MUST** satisfy A.6.1:4.2.1 (explicit parent+morphism kind; SlotKind invariance; monotone ValueKind narrowing; no new mandatory inputs to inherited ops). |
| **CC‑UM.9** | **SlotIndex is a view:** `SlotIndex` **MUST** be mechanically derivable from (i) the per‑operator SlotSpecs in `OperationAlgebra` (A.6.0:4.1.1) plus (ii) any guard‑only SlotSpecs **declared with** `AdmissibilityConditions` predicate signatures; it **MUST NOT** contradict those SlotSpecs. Any didactic `ValueKindView` (or “ParamKind” lists) are non‑normative projections only. |
| **CC‑UM.10 (Multiple realizations rationale).** | If multiple Realizations are published for the same Mechanism.Intension, authors **SHOULD** provide a short trade‑off rationale (why/when to choose which), without introducing new obligations beyond the referenced Signature/ClaimIds. |
## Common Anti-Patterns and How to Avoid Them (informative)

| Anti-pattern | What it looks like | Remedy |
| --- | --- | --- |
| **SlotIndex treated as a 5th Signature row** | Reviews start comparing mechanisms by `SlotIndex` only; SlotSpecs disappear from operator declarations. | Keep SlotSpecs **inline per operator**; treat `SlotIndex` as a derived projection only (CC‑UM.0, CC‑UM.9). |
| **Admission tests put in LawSet** | “Eligibility” and “coverage” checks appear as laws; implementations silently diverge. | Move operational guards to `AdmissibilityConditions` (CC‑UM.1). |
| **Implicit crossings / hidden CL ladders** | A mechanism is reused across Contexts/planes without a declared BridgeId/ReferencePlane; CL/Φ/Ψ tables get copied into local prose. | Crossings must be explicit and **Bridge-only**; `Transport` references policy ids/registries (CC‑UM.3). |
| **Penalties leak into F/G** | A plane/kind/scope mismatch is handled by mutating Formality or Guarantee claims. | Route penalties to **R/R_eff only**; keep **F/G invariant** (CC‑UM.4). |
| **Illegal scalarisation** | Ordinal means or cross-unit arithmetic is performed “because we need a number”. | Bind numeric comparison/aggregation to CG‑Spec/MM‑CHR and CSLC; keep partial orders set-valued (CC‑UM.5). |
| **Specialisation breaks SlotKind identity** | Refinements rename SlotKinds or add mandatory parameters to inherited operations. | SlotKinds are invariant; refinements only narrow ValueKinds/guards; add new ops via Extension (CC‑UM.8). |
| **Unknown coerced to 0/false** | Guard failures silently become “false” or scores become 0. | Use tri-state discipline: `unknown → {degrade|abstain}`; probing lives in LOG branches (CC‑UM.7). |
| **In-place minting of BaseType** | A mechanism definition introduces a new `U.Type` ad hoc. | `BaseType` references an existing `U.Type`; mint new types via DRR/LEX outside the mechanism (CC‑UM.6). |
## Consequences (informative)

* **Uniform kernel shape.** Scope, normalization, comparison families can be authored and compared without lexical drift.
* **Auditable reuse.** GateCrossings are UTS-visible via **CrossingBundle** (**E.18**); penalties are transparent (**R only**), with **LanePurity** + **Lexical SD** (E.10) checks runnable (GateChecks in **A.21**; Bridge+UTS discipline **A.27**; BridgeCard **F.9**).
* **Scalarisation avoids illegality.** Partial orders remain set‑valued; cross‑scale arithmetic is blocked by **CG‑Spec/CSLC**.
## Rationale (informative)

Anchoring mechanisms in an explicit **Signature → Realization** discipline (A.6.0 `SignatureManifest` + CC‑UM.2 monotonicity/opacity) keeps reuse safe: signatures are the contract; realizations may vary but cannot relax laws. It also makes cross‑context (Bridge) crossings explicit and costed on `R_eff` (never F/G).
## SoTA-Echoing (post-2015 practice alignment) (informative)

**Purpose.** To show how the FPF concept of a *Mechanism* (law-governed signature with guards and transport) aligns with, and improves upon, leading research and engineering practices after 2015.  
All comparisons are *informative*: they serve didactic continuity, not new normative force.

### Contemporary references (post-2015 sources)

**SoTA binding note (E.8:11).** No dedicated `SoTA‑Pack(Mechanisms)` (G.2) is registered at the time of writing; until one exists, this section cites primary post‑2015 sources directly and SHOULD later be reduced to ClaimSheet/CorpusLedger/BridgeMatrix ids (to avoid forking untracked SoTA narrative).

1. **Algebraic effects and handlers** (post‑2015 effect systems and handler implementations) — **Adopt/Adapt.** They motivate the split “operation signature vs handling”; A.6.1 keeps `OperationAlgebra` explicit and adds `LawSet`, `AdmissibilityConditions`, and `Γ_time` so legality and time are not implicit. *(e.g., Hillerström & Lindley, 2018; Multicore/OCaml‑5 effect handlers, 2021–2022).*

2. **Typed semantic translation frameworks** (institution‑style morphisms and functorial data migration) — **Adapt.** A.6.1 uses explicit refinement/extension/quotient structure (`U.MechMorph`) but requires cross‑Context transport to be **Bridge‑only** with penalties routed to **R/R_eff**. *(e.g., Spivak & Schultz, 2017; CQL practice, 2017–2023).*

3. **Policy‑as‑Code** (declarative guard/risk rules) — **Adapt.** A.6.1 turns runtime policies into deterministic, fail‑closed `AdmissibilityConditions` with named Γ_time windows; evaluators and tool binding stay out of Core. *(e.g., Open Policy Agent / Rego, 2016+; UL 4600:2020; ISO 21448:2019).*

4. **Session / typestate types** (post‑2015 protocol safety) — **Adapt.** Protocol constraints inform how guards can restrict legal operator sequences, but A.6.1 keeps the contract as signature+laws and surfaces sequencing constraints as explicit guard predicates rather than hidden state. *(e.g., Scalas & Yoshida, 2016–2018; mainstream session‑type toolchains, 2017–2024).*

5. **Lawful measurement and calibrated uncertainty** (monotone and calibrated learning, conformal prediction) — **Adopt/Adapt.** Modern calibrated methods show why comparability must be explicit; A.6.1 binds induced numeric operations to **CG‑Spec/CSLC** and forbids illegal scalarisation (e.g., ordinal means). *(e.g., Romano et al., 2019; Angelopoulos & Bates, 2021).*

Each source corresponds to a distinct *Tradition*: formal semantics, categorical algebra, compliance automation, protocol safety, and lawful AI.
### Alignment with A.6.1 fields and concepts

| A.6.1 construct (claim) | SoTA practice (post‑2015) | Primary sources (post‑2015) | Alignment delta encoded by A.6.1 | Adopt / Adapt / Reject |
| --- | --- | --- | --- | --- |
| **OperationAlgebra + LawSet** | Algebraic effects & handlers separate operation signatures from handlers. | Hillerström & Lindley (2018); OCaml‑5/Multicore OCaml effect handlers (2021–2022). | FPF keeps operator signatures explicit, adds an explicit `LawSet`, and treats admissibility/time as separate surfaces (no hidden context). | Adopt/Adapt |
| **U.MechMorph** (Refine/Extend/Quotient) | Institution‑style morphisms / functorial data migration provide typed signature translations and quotients. | Spivak & Schultz (2017); CQL ecosystem papers/docs (2017–2023). | FPF reuses the morphism structure but requires cross‑Context use to be stated as `Transport` with an explicit `BridgeId` (F.9) and CL/CL^k/CL^plane regimes; penalties route → `R/R_eff` only (B.3). | Adapt |
| **AdmissibilityConditions + Γ_timePolicy** | Policy‑as‑Code makes guard/risk predicates executable and reviewable. | Open Policy Agent / Rego (2016+); UL 4600:2020; ISO 21448:2019. | FPF treats policy predicates as deterministic, fail‑closed guards with named validity windows; it forbids implicit “latest” and avoids embedding evaluators in Core. | Adapt |
| **AdmissibilityConditions** (sequencing) | Session/typestate disciplines constrain legal operation sequences. | Scalas & Yoshida (2016–2018); post‑2017 multiparty session type toolchains. | FPF uses guards to make sequencing constraints explicit and auditable, while leaving the kernel contract as signature+laws (no hidden automata). | Adapt |
| **CG‑Spec / MM‑CHR binding** | Calibrated/monotone ML and conformal prediction make uncertainty and monotonicity explicit. | Romano et al. (2019); Angelopoulos & Bates (2021). | FPF requires scale legality (CSLC) and forbids ordinal averaging; partial orders remain set‑valued unless a lawful scorer is declared. | Adopt/Adapt |
### Adopt / Adapt / Reject summary

* **Adopt.** The “explicit operations + explicit laws” stance from modern semantics work, and the calibrated/monotone stance from lawful ML, because both reduce hidden assumptions.

* **Adapt.** Typed translation ideas and policy‑as‑code idioms into a kernel form that is Context‑local by default, with explicit guards (`AdmissibilityConditions`) and explicit time windows (`Γ_timePolicy`) instead of implicit recency.

* **Reject.** Tool‑bound semantics, automatic recency heuristics, and any cross‑scale arithmetic without CSLC proof; A.6.1 also rejects implicit cross‑Context/plane reuse.

* **Cross‑Context/plane delta (E.8:11).** Whenever a SoTA practice would reuse semantics across Contexts/planes, A.6.1 requires an explicit `BridgeId` (F.9) plus CL / `CL^k` / `CL^plane` anchors and Φ/Ψ/Φ_plane policy‑ids (B.3), with penalties routed to `R/R_eff` only (never mutating `F/G`).
### Holonic repeatability

The same correspondence holds at **every holonic level**:  
a part-holon declares its own `OperationAlgebra/LawSet/AdmissibilityConditions`; a whole-holon merges them via Bridges; a meta-holon re-binds mechanisms under a new Γ-closure. All penalties remain in **R / R_eff**, while **F / G** invariants propagate intact.
## Relations (quick pointers)

Builds on **A.6.0**; instantiates **A.2.6 USM** (ContextSlice, Γ_time, ∩/SpanUnion/translate) and **A.19/C.16 UNM** (classes, ≡\_UNM, validity windows); uses **Part B** (Bridges, CL/CL^k/CL^plane; **no implicit crossings**); binds **CG‑Spec** for any numeric comparison/aggregation; telemetry/publication via **G.10/G.11**.
## A.6.1:End
