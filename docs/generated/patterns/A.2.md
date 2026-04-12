---
title: "Role Taxonomy"
description: "Part A - Kernel Architecture Cluster"
---

# Role Taxonomy
> Pattern `A.2` · Stable · Architectural (A) · Normative
> Part A - Kernel Architecture Cluster

*A holon’s essence tells us **what it is**; its roles tell us **what it is being, here and now**.*

Pattern A.1 established the **substantial** characteristic of the core (`Entity → Holon → {System, Episteme, …}`), cleanly separating identity from structure and aggregation. The present pattern introduces the **functional** characteristic: how a holon participates in purposes **within a bounded context** and for some interval. This extends the early sketch of A.2 and tightens its alignment with A.7 (Strict Distinction): roles are *not* parts and *not* behaviours; they are contextual **masks** that a holon wears while behaviours are handled by **Method**/**Work**.

## Keywords

- role
- assignment
- holder
- context
- function vs identity
- responsibility
- U.RoleAssignment.

## Relations

- `A.2` --builds_on--> [Holonic Foundation: Entity → Holon](/generated/patterns/A.1)
- `A.2` --builds_on--> [Strict Distinction (Clarity Lattice)](/generated/patterns/A.7)
- `A.2` --builds_on--> [Advanced Mereology: Components, Portions, Aspects & Phases](/generated/patterns/A.14)
- `A.2` --outline_child--> [U.RoleAssignment: Contextual Role Assignment](/generated/patterns/A.2.1)
- `A.2` --outline_child--> [U.PromiseContent: Consumer‑facing Promise Clause](/generated/patterns/A.2.3)
- `A.2` --outline_child--> [U.EvidenceRole: The Evidential Stance](/generated/patterns/A.2.4)
- `A.2` --outline_child--> [U.RoleStateGraph: The Named State Space of a Role](/generated/patterns/A.2.5)
- `A.2` --outline_child--> [Unified Scope Mechanism (USM): Context Slices & Scopes](/generated/patterns/A.2.6)
- `A.2` --outline_child--> [U.RoleAlgebra: In-Context Role Relations (≤, ⊥, ⊗)](/generated/patterns/A.2.7)
- `A.2` --outline_child--> [U.Commitment: Deontic Commitment Object](/generated/patterns/A.2.8)
- `A.2` --outline_child--> [U.Capability: System Ability (dispositional property)](/generated/patterns/A.2.2)
- `A.2` --outline_child--> [U.SpeechAct: Communicative Work Object](/generated/patterns/A.2.9)
- `A.2` --explicit_reference--> [Strict Distinction (Clarity Lattice)](/generated/patterns/A.7)
- `A.2` --explicit_reference--> [U.RoleAssignment: Contextual Role Assignment](/generated/patterns/A.2.1)
- `A.2` --explicit_reference--> [Evidence Graph Referring (C-4)](/generated/patterns/A.10)
- `A.2` --explicit_reference--> [External Transformer & Reflexive Split (C-2)](/generated/patterns/A.12)
- `A.2` --explicit_reference--> [Role–Method–Work Alignment (Contextual Enactment)](/generated/patterns/A.15)
- `A.2` --explicit_reference--> [LEX-BUNDLE: Unified Lexical Rules for FPF](/generated/patterns/E.10)
- `A.2` --explicit_reference--> [Advanced Mereology: Components, Portions, Aspects & Phases](/generated/patterns/A.14)
- `A.2` --explicit_reference--> [Contextual & Temporal Aggregation (Γctx & Γtime)](/generated/patterns/B.1.4)
- `A.2` --explicit_reference--> [The Agential Role & Agency Spectrum](/generated/patterns/A.13)
- `A.2` --explicit_reference--> [Holonic Foundation: Entity → Holon](/generated/patterns/A.1)
- `A.2` --explicit_reference--> [Universal Algebra of Aggregation (Γ)](/generated/patterns/B.1)
- `A.2` --explicit_reference--> [Meta-Holon Transition (MHT): Recognizing Emergence and Re-identifying Wholes](/generated/patterns/B.2)
- `A.2` --explicit_reference--> [Trust & Assurance Calculus (F–G–R with Congruence)](/generated/patterns/B.3)
- `A.2` --explicit_reference--> [DevOps Lexical Firewall](/generated/patterns/E.5.1)

## Content

## Problem frame

Pattern A.1 established the **substantial** characteristic of the core (`Entity → Holon → {System, Episteme, …}`), cleanly separating identity from structure and aggregation. The present pattern introduces the **functional** characteristic: how a holon participates in purposes **within a bounded context** and for some interval. This extends the early sketch of A.2 and tightens its alignment with A.7 (Strict Distinction): roles are *not* parts and *not* behaviours; they are contextual **masks** that a holon wears while behaviours are handled by **Method**/**Work**.
## Problem

Without an explicit role calculus:

1. **Type explosion & conflation.** Each new purpose breeds a new “subtype” (`PumpAsCoolingLoop`, `PumpAsFuelLoop`, …), violating parsimony and fusing substance with function.
2. **Agency opacity.** It becomes unclear whether *any* system may act as a transformer/agent, or only pre-declared special kinds.
3. **Epistemic blindness.** Knowledge artefacts (papers, proofs) cannot be given roles, blocking modelling of citation, evidence, or design-time justification.
## Forces

| Force                                | Tension                                                              |   |
| ------------------------------------ | -------------------------------------------------------------------- | - |
| **Identity vs Function**             | A holon’s make‑up ↔ its transient, contextual purpose.               |   |
| **Static vs Dynamic classification** | Fixed type lattice ↔ late‑binding of new roles.                      |   |
| **Universality vs Familiarity**      | One mechanism for pumps **and** papers ↔ domain‑specific role names. |   |
| **Simplicity vs Expressiveness**     | Minimal primitives ↔ multi‑role, multi‑holder scenarios.             |   |
## Solution

We elevate **Role** to a first‑class semantic construct: a context‑bound *mask* (capability/obligation schema) worn by a holon. **Behaviour** and **resource deltas** live in **Method**/**Work**, not in the role itself.

### S‑level definitions (normative)

* **`U.Role`** — a **context-bound** capability/obligation schema that a holon **may bear (play)** for a time interval. A role has **no structural parts** (it does not participate in A.14 `partOf`) and **no resource deltas** of its own. Role refinement/bundling is expressed via in‑Context relations (`≤`, `⊥`, `⊗`) rather than mereology. *(A7 guard)*
* **`U.RoleAssignment`** — a first-class assignment record recording that a holon **bears (plays)** a role **in** a bounded context over an optional **Window**. Keep the signature aligned with **A.2.1 Role Assignment Standard**; governance metadata (authority/justification/provenance) is captured via `U.RoleAssigning` and the evidence graph (A.10).

```
U.RoleAssignment {
  holder        : U.Holon,
  role          : U.Role,
  context       : U.BoundedContext,
  window? : U.Window
  justification?: U.Episteme,  // why (standard, SOP, evidence)
  provenance?   : U.Method     // how assignment/verification was done (NOT the role's bound method set)
}
```

Short form (readable): `Holder#Role:Context@Window`.

> **Why a first-class assignment record?** It keeps identity (holon), function (role), context (semantics), and time (run-window) separate yet linked, preventing the substance/function conflation identified above. The early `playsRoleOf(Holon, Role, span)` relation in the draft is subsumed by `U.RoleAssignment` and extended with **Context** (and optional governance fields).
### Temporal & behavioural alignment

* **Method (intension) vs Work (occurrence).** A `U.Method` is a **design‑time, order‑sensitive capability**: what can be enacted, under which preconditions/invariants, with what admissibility/acceptance gates. A `U.Work` is the **dated, spatiotemporally bounded enactment** of such behaviour by a system bearing a role (A.15.1).
* **MethodDescription is representation (viewpoint), not “the method itself”.** `U.MethodDescription` is an `U.Episteme` that represents a method under an explicit **viewpoint**. Step‑graphs/scripts/workflows are one common viewpoint, but not universal. Other valid viewpoints include state‑machines, dynamical/solver/controller models, lab protocols, and quantum circuits/channels. A method itself **need not** admit a step decomposition; only a given description might.
* **Executable chain (who / what / how / when).** A **behavioural Role** is eligible/authorized for one or more Methods (design‑time, Context‑local). A Work is `isExecutionOf` a **specific MethodDescription version** (run‑time) and cites `performedBy = U.RoleAssignment`. Together, these anchors answer “what happened, by which method, under which role” without collapsing design‑time into run‑time.
* **Resource accounting lives in Work.** Only `U.Work` carries resource deltas (feeds Γ\_work); Roles/Methods/MethodDescriptions do not.

> **Lexical note (A.6.P trigger).** In the Role–Method–Work cluster, `bindsMethod` is a **technical token** meaning “Context‑local eligibility/authorization of a Role for a Method”. Do not use plain “bind/rebind” as umbrella prose for editing relationships; when describing edits, prefer explicit change classes (declare/withdraw/retarget/revise/rescope/retime/refreshWitnesses).
### Admissibility constraints (concept-level; non-deontic).

1. **Locality.** `role ∈ Roles(context)`. Outside its context, a role’s meaning is undefined.
2. **Structural‑mereology firewall.** No Role (nor Method/MethodDescription) may appear as a node in any A.14 `partOf` chain; holarchies are for substantial holons only. Role refinement/bundling (`≤`, `⊗`) and method relations (refinement, factorization, step/phase views) are **not** `partOf` and MUST NOT be rewritten into structural parthood.
3. **Multiplicity.** A holder may **bear** multiple roles concurrently; a role may be **borne** by many holders—subject to each context’s compatibility rules.
4. **Time anchoring.** `window` (if present) is non-empty and finite for run‑time claims; open‑ended assignments are allowed but must be traceably open‑ended from an assignment time (A.2.1). Design‑time bindings are timeless but **descriptions are versioned** via `U.MethodDescription` identity.
5. **Behavioural coherence.** For any `U.Work` window, the performer’s cited RoleAssignment and the executed MethodDescription must align in the **same Context**: `work.performedBy = RA`, `work.isExecutionOf = MD`, and `RA.role` is eligible/authorized for the Method represented by `MD`. *(No hidden role swaps; no implicit method drift.)*
### Taxonomic frame (within a context)

Within each `U.BoundedContext`, role names are organised as a **partial order** (refinements) plus an **incompatibility** relation (mutually exclusive roles). Typical **substrate‑neutral** anchors:

| Kernel Role       | Intent                                | System archetype              | Episteme archetype                       |   |
| ----------------- | ------------------------------------- | ----------------------------- | ---------------------------------------- | - |
| `TransformerRole` | Changes other holons via Method/Work. | Robot arm assembling casings. | Prover constructing a new lemma.         |   |
| `ObserverRole`    | Collects evidence / metrics.          | Sensor array on a test‑rig.   | Reviewer annotating an article.          |   |
| `SupervisorRole`  | Governs subordinate holons.           | PLC orchestrating a line.     | Meta‑analysis curator combining studies. |   |

> Domains refine these anchors: e.g., `CoolingCirculatorRole`, `CitationSourceRole`, `LemmaRole`.
## Archetypal Grounding (Tell–Show–Show: System / Episteme)

**Tell.** A single holon can be the *same bearer* across time while taking on different, context‑bound roles. A role is a *mask* (capability/obligation schema) that explains *what it is being* in a given `U.BoundedContext`; behavioural facts and resource deltas remain in `U.Method` / `U.Work`.

**Show.**

**System case — Cooling loop**
`PumpUnit#3#HydraulicPump:Plant‑A@2025‑08‑08..open`
`HydraulicPumpRole ↦bindsMethod↦ CentrifugalPumpingMethod` (design‑time, Context‑local eligibility)
`CentrifugalPumpingMethod ↦isDescribedBy↦ centrifugal_pump_curve.ld@v7` (MethodDescription viewpoint; step‑graph OR dynamics, as appropriate)
`run‑2025‑08‑08 isExecutionOf centrifugal_pump_curve.ld@v7; performedBy PumpUnit#3#HydraulicPump:Plant‑A@2025‑08‑08..2025‑08‑08` (run‑time Work)
*(Behavioural/resource facts live in Work; method semantics live in the referenced MethodDescription viewpoint.)*

**Episteme case — Standard in design**
`RFC‑9110.pdf#ProtocolStandard:WorldWideWeb` justifies `MethodDescription` selection; the **system** bearing `TransformerRole` is the design service that executed the selection work. The episteme did **not** act.

**Collective vs set (safety pitfall)**
A **set** `{Alice, Bob, 3.14}` has no behaviour; a **team** is a **system** with boundary, coordination **Method**, and supervision **Work**; only the latter can bear agentic roles.
## Bias-Annotation

Lenses tested: **Arch**, **Onto/Epist**, **Prag**, **Did**. Scope: **Universal** (A‑cluster).

* **Architecture bias (Arch):** treating roles as structural parts can smuggle function into mereology and break holarchies.  
  *Mitigation:* keep `partOf` chains role‑free; roles are not constituents (see CC‑A2.1).
* **Onto/Epist bias (Onto/Epist):** anthropomorphising epistemes collapses evidence into agency.  
  *Mitigation:* epistemes can justify/authorize; only systems perform methods and work (CC‑A2.2).
* **Pragmatic bias (Prag):** over‑contextualising can fragment reuse and create naming drift.  
  *Mitigation:* require explicit `:Context` binding and explicit bridges instead of silent equivalence (CC‑A2.4).
* **Didactic bias (Did):** metaphors (“mask”) may be misread as informal.  
  *Mitigation:* bind obligations to CC items; avoid imperative prose outside CC.
## Authoring guidance (for engineers and leads)

* **Name roles for intent, not mechanics.** Prefer `CoolingCirculatorRole` over `ChannelFluidWithCentrifugalProfile`.
* **Pin the context early.** If two teams disagree, split contexts and (optionally) define an alignment bridge; do not over‑generalise the role.
* **Document the enactment chain.** For any operational claim, be ready to point to: `RoleAssigning → RoleAssignment → (Role ↦bindsMethod↦ Method) ↔ MethodDescription → Work`. (Readers’ dictionary: *workflow/script/state‑machine/dynamical model/quantum circuit → MethodDescription; run/job/operation → Work.*)
## Conformance Checklist (CC‑A2.\*)

|                      ID | Requirement                                                                                                                                                                                                                                                                          | Practical test (manager‑oriented)                                                                                                                                                             |
| ----------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|             **CC‑A2.1** | A **Role** SHALL NOT be a mereological part of any holon; roles are never constituents of holarchies.                                                                                                                                                                                | If a diagram shows `Role →(part‑of)→ Holon`, the model **fails**. Replace the edge with `playsRoleOf(Holon, Role, span)` (A.14 governs parts).                                                |
|             **CC‑A2.2** | Only a **System** can bear **behavioural** roles (e.g., `TransformerRole`, `AgentialRole`) and thus bind **Method**/**Work**; an **Episteme** MAY bear **non‑behavioural** roles (e.g., `ReferenceRole`, `ConstraintSourceRole`) only.                                               | Lint the model: any `U.Episteme` that `bindsMethod` or is a `performedBy` target **fails**; move behaviour to a system bearing the role and act on episteme **carriers** (A.7, A.12, A.15).   |
|             **CC‑A2.3** | Every **behavioural Role** that is used for Work SHALL `bindsMethod ≥ 1`; behavioural roles with no bound method are **abstract** placeholders and non‑executable.                                                                                                                     | If a behavioural role participates in `Work` without some `Method ⟷ MethodDescription` chain, flag “unbound role” and add a binding (A.15).                                                   |
|             **CC‑A2.4** | Every **role reference** in normative text SHALL be **context‑indexed** by a declared **Bounded Context** (local to the pattern or glossary). Local shorthand **“Transformer”** is permitted only if the pattern’s Glossary **re‑binds** it to “**System bearing TransformerRole**”. | If prose says “Transformer updates the spec”, the pattern MUST define the local alias and its target; otherwise rewrite to the canonical long form (E.10, A.7).                               |
|             **CC‑A2.5** | Each `U.RoleAssignment` SHALL carry an explicit `window` **or** be traceably open‑ended from an assignment time (e.g., via `U.RoleAssigning`). Open intervals are allowed but must be explicit. | Search for RoleAssignments with neither `window` nor a traceable assignment time; add `@t₀..t₁` (or open bound) and/or an issuing RoleAssigning Work. |
|             **CC‑A2.6** | If two roles are declared **incompatible inside the same context**, a bearer SHALL NOT hold them over **overlapping** spans.                                                                                                                                                         | Check the context’s role‑compatibility grid; if overlaps exist, either split the Work by `PhaseOf` or change staffing (A.14; B.1.4/Γ\_time).                                                  |
|             **CC‑A2.7** | For any **Work** item, `performedBy` MUST reference the **concrete RoleAssignment** of the performer, and its window MUST cover the Work’s window. | Assert `performedBy(Work) = RA` and `RA.window ⊇ window(Work)`; split Work or update assignments if the performer changes mid‑window (A.2.1, A.15). |
|             **CC‑A2.8** | Every **Method** bound to a role SHALL be `isDescribedBy ≥ 1` **MethodDescription** (`U.Episteme`) and every **Work** SHALL be `isExecutionOf` exactly one **MethodDescription** version.                                                                                                          | If a Work lacks `isExecutionOf`, or a Method lacks `MethodDescription`, the audit fails (A.15; A.10 evidencing hook).                                                                                |
|            **CC‑A2.8b** | When a claim relies on **step/phase/serial/parallel** semantics, the referenced **MethodDescription** SHALL declare an appropriate viewpoint and its ordering/coordination rules; do not infer “steps” from `U.Method` by default.                                                    | If prose says “step 3”, “submethod”, or “phase”, but the cited MethodDescription is not a workflow/script/step‑graph viewpoint (or lacks ordering rules), flag it; rewrite in the declared viewpoint or mint an additional view. |
|             **CC‑A2.9** | **Evidence** for claims about roles and execution MUST anchor to **symbol carriers** (SCR/RSCR); self‑evidence is forbidden.                                                                                                                                                         | A role effectiveness claim without SCR/RSCR or with cyclic provenance fails (A.10).                                                                                                           |
|            **CC‑A2.10** | When a Role assignment implies **order** or **temporal** structure, the pattern SHALL defer to **Γ\_ctx**/**Γ\_time** rather than overloading role edges.                                                                                                                               | If argument order matters, use Γ\_ctx folds and record OrderSpec; version/evolution goes via Γ\_time (B.1.3 §4.5).                                                                            |
|            **CC‑A2.11** | Use of legacy nouns “creator/actor/agent” in Core text is prohibited unless they are explicitly typed as **roles** with bearers; the term **“Transformer”** is a local alias, **not** a type.                                                                                        | Scan for bare nouns; replace with “system bearing TransformerRole” or define an alias in the Glossary (A.7 canonical rewrites; E.10 registers).                                               |
| **CC‑A2.12 (advisory)** | A reified **RoleAssigning** object SHOULD capture `context`, `window`, optional `authority`, `justification (U.Episteme)`, and `provenance (U.Method)`. | Recommended for governance‑heavy domains; it improves explainability without changing Core semantics. |

> **Note.** CC‑A2.2 aligns with **A.7 Role‑domain guards** (“behavioural roles’ domain = system; epistemes bear non‑behavioural roles only”).
## Common Anti-Patterns and How to Avoid Them

1. **“Transformer as system subtype.”**
   ✗ *“`U.TransformerSystem` builds pumps.”*
   ✓ *“`RobotArm R‑45#Transformer:Plant‑A` executed Work W.”* (Role is a mask; behaviour is Method/Work.)

2. **“Role as part.”**
   ✗ *“The pump’s role is one of its components.”*
   ✓ Roles are **never** parts; components are substantial. Keep all `partOf` chains role‑free.

3. **“Episteme acts by itself.”**
   ✗ *“The PDF enforced the SOP.”*
   ✓ An **episteme** can hold roles like `ProtocolStandard` **in context**, but only a **system** performs the Method/Work that uses it.

4. **“Context leakage.”**
   ✗ *“Pluto is Planet and DwarfPlanet.”* (in one tacit space)
   ✓ *“`Pluto#Planet:Early20thCenturyAstronomy`; `Pluto#DwarfPlanet:IAU_2006_Definition`.”* No contradiction—different bounded contexts. (Illustrative of `U.RoleAssignment` semantics carried forward from the A.2.1.)

5. **“Method = workflow (step list) by default.”**
   ✗ *“The method is the ordered list of steps 1..n.”*
   ✓ A **Method** is a design‑time capability; “steps” (or their absence) are a property of a **MethodDescription viewpoint**. A Work executes a specific MethodDescription; use a workflow/script view when step semantics matter, and use other views (dynamics/solver/circuit/channel) when steps are not meaningful.
## Consequences

| Benefit                     | Why it matters                                                                                                       | Trade‑off / Mitigation                                                                       |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Category‑error immunity** | Clear firewall between **identity** (holarchies) and **function** (roles) prevents mixing “parts” with “masks”.      | Slight modelling overhead; templates provide checklists (A.7, A.14).                         |
| **Operational clarity**     | Who did what, when, under which mask, and **by which MethodDescription** becomes audit‑ready (RoleAssignment + `performedBy` + `isExecutionOf` + method‑binding). | Requires spans on Role assignments; mitigated by default “open‑ended” spans in drafts.       |
| **Epistemic hygiene**       | Knowledge holons contribute as **evidence** or **constraints**, never as doers.                                      | Authors must rewrite anthropomorphic prose; canonical rewrites help.                         |
| **Cross-context pluralism** | Same bearer can hold different roles across contexts without contradiction; differences are explicit in the assignment. | Requires declaring the **bounded context**; E.10 eases the ceremony with registers/aliases.  |
| **Γ‑coherence**             | Order/time/aggregation stay in Γ‑operators, not overloaded into “role" edges.                                        | Authors learn when to call Γ\_ctx/Γ\_time; the Part B on‑ramp is short.                      |
## Rationale (post‑2015 cross‑domain corroboration)

*Why insist on roles as contextual masks and externalised transformers?*

1. **Constructor Theory (2015–2022).** Post‑2015 work by Deutsch & Marletto re‑centres physics on **possible tasks and constructors** rather than objects, mirroring FPF’s **TransformerRole**: behaviour is attached to “who can realise a task,” not to substance per se. Our separation of **SubstantialHolon** vs **Role** and the insistence on **external** transformers directly echo this shift. *(Conceptual alignment noted in A.2 Solution and A.12 intent.)* 
2. **Layered Control Architectures (Matni–Ames–Doyle, 2024).** The modern control stack cleanly **externalises** regulators and planners relative to plants. FPF’s obligatory “system bearing TransformerRole” (A.7, A.12) is isomorphic to that separation, keeping supervision and actuation **outside** the controlled holon. 
3. **Active‑Inference / Agency spectrum (2017–2023).** Contemporary models treat agency as **graded** and **contextual** (percept‑act loops tuned by free‑energy bounds). A.13 adopts exactly this: **AgentialRole** is a role worn by a holon, with graded measurements via **Agency‑CHR**, not a static type.
4. **Basal Cognition & multi‑scale organisation (2019–2024).** Fields & Levin argue for **cross‑scale** control and information flows; FPF encodes this via Γ‑flavours and the **Meta‑Holon Transition** triggers, ensuring Role assignments compose across scales without collapsing identity into function.
5. **Knowledge ecosystems & safety cases (2018–2025).** Modern assurance relies on **traceable evidence** and conservative integration (no “truth averaging”): our A.10 anchors (SCR/RSCR) and Γ\_epist’s **weakest‑link** fold implement that discipline and forbid self‑evidence. 

> Summing up: post‑2015 science and engineering converge on **roles as contextual capabilities**, **externalised control**, and **traceable evidence**. A.2 codifies these insights in a substrate‑neutral way, keeping the Core small yet powerful.
## SoTA-Echoing (post‑2015 alignment, informative)

| Claim (A.2 need) | SoTA practice (post‑2015) | Primary source (post‑2015) | Alignment with A.2 | Adoption status |
| --- | --- | --- | --- | --- |
| Roles are context‑dependent, anti‑rigid descriptors rather than structural parts. | Conceptual modeling distinguishes substantial types from role types; roles depend on context/relational situations. | Guizzardi (2019), *Ontological Foundations for Conceptual Modeling*; recent OntoUML/UFO literature. | Maps to `U.Role` as context‑bound schema; keeps `partOf` free of roles. | **Adopt.** |
| Meaning boundaries must be explicit; reuse across boundaries must be declared, not assumed. | Modern DDD and socio‑technical architecture emphasise explicit bounded contexts and explicit translation/alignment. | Vernon (2016), *Domain‑Driven Design Distilled*; Newman (2021), *Building Microservices*. | Matches `role ∈ Roles(context)` and CC‑A2.4 context binding + explicit bridge discipline. | **Adopt/Adapt.** Adopt boundaries; adapt reuse via FPF Bridges + CL. |
| Agency should not be attributed to artifacts; treat evidence/provenance as first‑class. | Safety/assurance and governance treat documents as evidence and constraints; provenance is required for claims. | ISO 26262:2018; NIST SP 800‑53 Rev. 5 (2020). | Supports “episteme as justification” and CC‑A2.2/CC‑A2.9 evidence binding. | **Adopt.** |
| “Agency” is graded and mediated by active systems + policies. | Cognitive/agentic modeling treats agency as spectrum, mediated by control loops and policies. | Friston et al. (2017), Active Inference; basal cognition surveys (2018+). | Supports separating role labels from behavioural work; aligns with A.13/A.15. | **Adopt (with scope).** Keep obligations in CC. |

> **Note.** Prefer citing a maintained SoTA synthesis pack for roles/contexts if your Context has one.
## Relations

* **Builds on:**
  **A.1 Holonic Foundation** (role/mereology split), **A.7 Strict Distinction** (role ≠ behaviour; episteme ≠ carrier), **A.14 Advanced Mereology** (no roles in holarchies).  
* **Specialises / Coordinates with:**
  **A.13 Agential Role & Agency Spectrum** (behavioural roles over systems; graded agency), **A.15 Role–Method–Work Alignment** (bindsMethod / isExecutionOf discipline). 
* **Constrains / Used by B‑cluster:**
  **B.1 Universal Algebra of Aggregation (Γ)** (keep order/time in Γ\_ctx/Γ\_time; keep provenance in Γ\_epist), **B.2 Meta‑Holon Transition** (promotion when supervision/closure appears), **B.3 Trust & Assurance** (evidence & congruence).  
* **Interlocks with E‑cluster (governance & language):**
  **E.10 Lexical Discipline** (registers, tier disambiguation, local aliases like “Transformer”), **E.5.1 DevOps Lexical Firewall** (ban tooling tokens in Core patterns). 
* **Reinforces:**
  **A.10 Evidence Graph Referring** (external transformer; SCR/RSCR), **A.12 External Transformer Principle** (agent externalisation).
## A.2:End
