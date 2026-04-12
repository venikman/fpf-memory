---
title: "Cluster A.V - Constitutional Principles of the Kernel"
description: "Generated reference page for heading:cluster-a-v-constitutional-principles-of-the-kernel:16040."
---

# Cluster A.V - Constitutional Principles of the Kernel
> Preface node `heading:cluster-a-v-constitutional-principles-of-the-kernel:16040`

## Content

## Strict Distinction (Clarity Lattice)

### Intent

Provide a **single, didactically clear lattice of distinctions** that keeps models free from category errors. This pattern is the guard‑rail that prevents four recurrent confusions:

1. **Role vs Function** (mask vs behaviour),
2. **MethodDescription vs Method vs Work** (description vs capability vs occurrence),
3. **Holon vs System vs Episteme** (what can act and what cannot),
4. **Episteme vs Carrier** (knowledge vs its material signs).

It harmonizes A.12 (External Transformer), A.13 (Agential Role & Agency Spectrum), A.14 (Advanced Mereology), and A.15 (Role–Method–Work Alignment).
### Problem frame

* **Holons (A.1) and systems.** All holons are part/whole units; **only systems** can enact behaviour.
* **Externalization (A.12).** Every change is performed by a **system bearing TransformerRole** across a boundary; there is no “self‑magic”.
* **Quartet backbone (A.3, A.15).** We separate **MethodDescription** (description), **Method** (**capability under a role**), and **Work** (run‑time occurrence), with the **system bearing TransformerRole** as the acting side.
* **Evidence (A.10).** Knowledge claims are anchored via **Symbol‑Carrier Register (SCR)**; epistemes never “act”, they are **used** by systems that act on their **carriers**.

Manager’s reading: if a sentence could be read as “the document decided” or “the process executed itself”, it violates A.7.
### Problem

When documents blur the above lines, three classes of defects appear:

1. **Category collapse.** People write “function/role/process” interchangeably; teams then disagree whether they are changing a plan, a capability, or reporting an actual occurrence.
2. **Agency misplacement.** Epistemes (documents, models) are treated as doers; collectives as raw sets; or a “holon” is used where **only a system** makes sense.
3. **Audit failures.** A MethodDescription is cited as if it were evidence; or Work has no anchors (no carriers, no time span), making trust impossible (B.3).
### Forces

| Force                                        | Tension                                                                                                                             |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Didactic brevity vs conceptual precision** | Teams want short words (“process”, “function”) ↔ the framework must keep five distinct layers apart.                                || **Universality vs domain idioms**            | We support engineering idioms (procedure, SOP, algorithm, workflow) ↔ internally we must map them unambiguously.                    |
| **Parsimony vs completeness**                | Minimal concept set ↔ enough distinctions to avoid the classic traps (role/function; plan/capability/occurrence; episteme/carrier). |
### Solution — The Clarity Lattice (normative distinctions & safe vocabulary)

#### Terminology (normative): orthogonal characteristics

• **senseFamily** — the categorical characteristic, used by F.7/F.8/F.9: {Role | Status | Measurement | Type‑structure | Method | Execution}. Rows must be **sense‑uniform**. 
• **ReferencePlane** — the referent mode per CHR: {world/external | conceptual | epistemic}. 
• **I/D/S layer** — the Intension/Description/Specification layer (E.10.D2). Not an I/D/S “plane” or "stance", and not a bare "layer".
• **DesignRunTag** — the design vs run DesignRunTag. Not a temporal “plane” or "layer", and not a bare "stance".
• **PublicationSurface** — the *didactic projection* of a Description/Specification into a **bundle of views** (ISO 42010 sense). **Surfaces are not the thing described**. Under L‑SURF, Core allows only **PublicationSurface** and **InteropSurface** tokens; faces SHALL be named **…View / …Card / …Lane** rather than inventing new `…Surface` kinds. The canonical didactic set for architectural patterns in FPF is:
  {**PlainView** (explanatory prose), **TechCard** (typed cards/IDs), **NormsCard** (TechCard profile for checklists/SHALL‑clauses), **AssuranceLane** (evidence bindings/lanes)}. *Surfaces are orthogonal to I/D/S and to design/run.*
• **Typed describing/formalising morphisms (I→D, D→S)** — total morphisms that *project* along I/D/S (they are **not** mechanisms):
  `Describe_ID : I → D` (describe an intensional object into the world of descriptions; historical alias `Publ_ID`) and
  `Specify_DS`/`Formalize_DS : D → S` (refine a description into a specification). Composition `Describe_IS := Specify_DS ∘ Describe_ID : I → S` is allowed but both stages MUST remain visible and auditable.
  **Laws (normative):** (ID‑1) *Non‑extensibility of content*; (ID‑2) *Identity & meaning‑preserving composition*; (DS‑1) *Monotonic refinement* under ≤₍ref₎; (DS‑2) *Pin editions & measurable anchors* per **MM‑CHR** (C.16) via **CHR‑Pins**; (DS‑3) *No retro‑effects*.

A.7 establishes the following **pairs and triplets**. Use their **names** and **scope** exactly as below.
#### Role vs Function (behaviour)

* **Role (role‑object, mask).** A contextual **position** a holon can bear (A.2, A.15). A role is **not behaviour**; it is the **mask** under which behaviour may be enacted. Example: **Cooling‑CirculatorRole** in a thermal loop.
* **Function = behaviour = Method under a role.** What a **system** actually does **when bearing a role**. In Transformer context, this behaviour is the **Method** (design‑time capability) that can be executed as **Work** (run‑time).

  * Safe rewrite for earlier “Holonic Duality (Substance ⧧ Function)”: **Holonic Duality (Substance ⧧ Role).** A `U.System` keeps its identity (substance) while **switching roles**; each role may entail a **Method** (behaviour) and its possible **Work** (occurrence).

**Normative guard:** Use “**Role**” for the mask; use “**Method/Work**” for behaviour/occurrence. Do **not** call the role itself a function.
#### MethodDescription vs Method vs Work (design vs capability vs occurrence)

* **MethodDescription** — the **description** (algorithm / SOP / recipe / script) at design‑time. Anchored via **SCR** (A.10).
* **Method** — the **order‑sensitive capability** the **system bearing TransformerRole** can enact, composed with **Γ\_method** (B.1.5). A Method is a **timeless semantic capability**; **concrete values** are **bound at `U.Work` creation**. Outside executions we **refer to it via MethodDescription** (see A.3.1 CC‑A3.1‑5/‑9; A.15 §2.2, §4.1). 
* **Work** — the **dated run‑time occurrence** (what actually happened), with resource spend (Γ\_work) and temporal coverage (Γ\_time).

**Normative guard:** Never use MethodDescription as evidence of Work; never present Method as if it had happened.
#### Holon vs System vs Episteme (who can act)

* **System** — the only holon kind that can **bear behavioural roles** and enact **Method/Work**.
* **Episteme** — **cannot act**; it is **changed via its carriers** by a system. Epistemes **may bear non‑behavioural roles** (e.g., **ReferenceRole**, **ConstraintSourceRole**).
* **Holon** — umbrella term; **do not** use it where only **system** is meaningful (e.g., “holon bearing TransformerRole” is **invalid**; write “**system bearing TransformerRole**”).

**Normative guard:** Behavioural roles (including TransformerRole) have **domain = system**. Epistemes may bear purely **classificatory** roles only.
#### Episteme vs Symbol Carrier (SCR/RSCR)

* **Episteme** — the knowledge content (claim, model, requirement set).
* **Symbol Carrier** — the physical/digital sign that carries the episteme (file, volume, dataset item), tracked in **SCR**; remote sets in **RSCR**.
* **Use:** Evidence, provenance, and reproducibility address **carriers**; arguments and validity address **epistemes**.

**Normative guard:** When you say “we updated the spec”, detail **which carriers** changed (A.10).
#### Collective vs Set, and MemberOf vs Component/Constituent/Portion/Phase (A.14)

* **Set / Collection (MemberOf)** — **mathematical or catalog** grouping; **no joint behaviour** implied.
* **Collective System** — a **system** with boundary and coordination Method (e.g., a team).
* **Use relations correctly:**

  * **ComponentOf** — mechanical/structural part in systems.
  * **ConstituentOf** — logical/content part in epistemes.
  * **PortionOf** — quantitative portion with conserved extensives.
  * **PhaseOf** — temporal part/state across a continuous identity.
  * **RoleBearerOf** — a **system** is the **bearer** of a **Role**.

**Normative guard:** If the grouping is expected to **act**, model a **collective system** (not a set) and provide its role and Method/Work.
#### Operator alignment (names you MUST use)

* **Γ\_sys** — composition of **system** properties (physical/systemic).
* **Γ\_method** — composition of **Method** (order, branching).
* **Γ\_time** — composition of **Work** histories and temporal parts.
* **Γ\_work** — composition of **resource spend** and yields tied to Work. Do not track costs with Γ\_method; costs (resources/yield) belong to Γ\_work.

**Normative guard:** Avoid generic “process” for these operators. Reserve “process” for domain idioms; map internally to **Method** (design) and **Work** (run).
#### I/D/S vs PublicationSurface (orthogonal, normative)

* **I/D/S governs the model.** What the thing *is* vs how it is *described/tested* lives in I/D/S (E.10.D2).
* **PublicationSurface governs the didactic projection.** How D/S are **presented** lives on **PublicationSurface/InteropSurface** only; concrete faces SHALL be **PlainView / TechCard / InteropCard / AssuranceLane**. Cards/views are **conceptual views over D/S**, not the intensional object **and not symbol carriers**; physical/digital **carriers** stay in **SCR/RSCR** (A.10).
* **Surface field pins.** When D/S are shown on **TechCard**, pin the minimal **CHR‑Pins** = {**UnitType**, **ScaleKind**, **ReferencePlane**, **EditionId**}. 
* **Bridge routing.** Cross‑Context or cross‑plane reuse **MUST** cite **Bridge id + CL**; **Φ(CL)**/**Φ_plane** penalties route to **R (trust)** only; **F/G invariant**.
#### Typed describing/formalising morphisms (I→D→S, normative)

**What `Describe_ID` / `Specify_DS` mean in A.7.** For any intensional object `X ∈ I`, *describing X* is the morphism application `Describe_ID(X) : D` (historical alias `Publ_ID(X)` in earlier drafts); *formalising that description* is `Specify_DS(Describe_ID(X)) : S` (alias `Formalize_DS`). The collapsed arrow `Describe_IS(X)` MAY be referenced, but **implementations SHALL expose and audit both steps**.

**Invariants (restate of the A.6.2/A.6.3 laws, audit‑oriented):**
1. **Non‑extensibility (ID‑1).** `Describe_ID` MUST NOT introduce new epistemic commitments. If a claim `c` is absent in `X`, it is absent in `Describe_ID(X)`; any added structure is representational only (formatting, indexing, cross‑references).
2. **Identity & meaning preservation (ID‑2).** If `f : X → Y` is a meaning‑preserving map in I, then `Describe_ID(f)` is defined and preserves identity, and where meaningful composition exists, `Describe_ID(f ∘ g) = Describe_ID(f) ∘ Describe_ID(g)`.
3. **Monotonic refinement (DS‑1).** If `D₁ ≤₍ref₎ D₂`, then `Specify_DS(D₁) ≤₍ref₎ Specify_DS(D₂)` (equivalently `Formalize_DS(D₁) ≤₍ref₎ Formalize_DS(D₂)`). Also `D ≤₍ref₎ Specify_DS(D)` holds when S merely adds testable structure.
4. **Pinning of editions & anchors (DS‑2).** `Specify_DS`/`Formalize_DS` MUST pin: **edition id**, **unit/scale types**, **ReferencePlane**, and **measurable anchors** (CG‑Spec/CHR). Pins are visible on **TechCard/NormsCard** faces and recorded in **SCR**; edition governance follows **U.EditionSeries**.
5. **No retro‑effects (DS‑3).** Applying `Specify_DS` yields a *new* `S` and *new* carriers (new SCR ids); earlier carriers remain valid in their scope; **no retro‑mutation** of prior I/D carriers.
6. **Separation from Γ.** `Describe_ID`/`Specify_DS` (`Publ_ID`/`Formalize_DS` in legacy text) do **not** compose with **Γ\_method**, **Γ\_time**, or **Γ\_work**; I/D/S describing/formalising is *not execution* and accrues no resource/time semantics.
7. **Ontology preservation.** Describing any object (Calculus/Signature/Mechanism/…) via `Describe_ID` does **not** change its ontology; it yields a D/S projection by A.7 rules. *Describing/formalising is not a subtype of mechanism*; publishing to surfaces is handled separately in E.17 (MVPK).
#### U.OutcomeSpec (promised outcome template: work‑only / result‑only / composite)

Engineers routinely use the word **outcome** (and often “result”, “deliverable”, “service delivered”) as a **metonymy** for different things:

* the **work itself** (“work for 5 minutes”, “provide support”, “process N requests”),
* the **world state / artefact after work** (“a hole exists”, “a hairstyle exists”, “a ticket is resolved”),
* or **both** (common in SLAs/SOWs: “do it within 20 min *and* produce the requested artefact”).

FPF keeps these distinct by introducing a single promise‑facing target object: `U.OutcomeSpec`.

##### A.7:5.10.1 — Definition (normative)

`U.OutcomeSpec` is an **Episteme** that specifies the promised outcome template referenced by `U.PromiseContent.promisedOutcomeSpecRef` (A.2.3). It is the “content of what is promised” *as a judgement target*.

It MAY constrain:

1. **delivery work** — predicates over `U.Work` episodes (A.15.1), e.g., duration, step coverage, resources used, method constraint;
2. **delivered state / artefact** — predicates over the post‑state of affected referents (via `U.Work.Δ` / evidence anchors), e.g., geometry/appearance/correctness;
3. **both** (composite).

`U.OutcomeSpec` is **not** a `U.Work` episode and **not** the extensional delivered object. It exists so a promise clause can be evaluated without confusing *spec* with *actuals*.

**Reference type.**  
`OutcomeSpecRef ::= ObjectIdRef` and MUST resolve to a `U.OutcomeSpec`.
##### A.7:5.10.2 — Minimal structure (conceptual; normative constraints)

```text
U.OutcomeSpec ::= {
  id: OutcomeSpecId,
  mode: OutcomeMode,                   // WorkOnly | ResultOnly | Composite

  // WorkOnly / Composite:
  workSpec?: {
    methodConstraintRef?: MethodDescriptionRef,   // optional: method is part of the promise (not “implementation detail”)
    workPredicateRef: EpistemeRef                 // predicate evaluated on U.Work facts/evidence (A.15.1)
  },

  // ResultOnly / Composite:
  resultSpec?: {
    describedEntityRef?: EntityRef,               // what thing’s post‑state matters (may be kind-labelled)
    statePlaneRef?: StatePlaneRef,                // where the predicate lives (A.7:3 pins)
    postConditionRef: EpistemeRef                 // predicate evaluated on post‑state (or evidence about it)
  },

  notes?: Text/Episteme
}

OutcomeMode ::= WorkOnly | ResultOnly | Composite
```

*Mode completeness (normative).*  
`mode=WorkOnly ⇒ workSpec present ∧ resultSpec absent`  
`mode=ResultOnly ⇒ resultSpec present ∧ workSpec absent`  
`mode=Composite ⇒ workSpec present ∧ resultSpec present`
##### A.7:5.10.3 — unitOfDelivery and countingRule mini‑schema (normative)

`U.PromiseContent.unitOfDelivery` (A.2.3) is an **Episteme** that states *how delivered units are counted/measured*. It is intentionally not a new “counting language”; it is a small record whose predicates are provided as ordinary epistemes.

A conforming `unitOfDelivery` SHOULD be representable by this mini‑schema:

```text
unitOfDelivery ::= {
  unitLabel: Text,                       // e.g., "request", "minute", "case", "kWh"
  countingRule: {
    selectorRef: EpistemeRef,            // selects which U.Work episodes contribute (default: W✓ for the promise content)
    quantityRef: EpistemeRef,            // maps each selected Work → ℝ≥0 units (default: constant 1)
    aggregation: count | sum,            // count = Σ 1; sum = Σ quantityRef(work)
    dedupeKeyRef?: EpistemeRef,          // optional: prevents double counting (e.g., by ticketId/appointmentId)
    Γ_timePolicyRef?: PolicyIdRef        // optional: windowing policy id when non-trivial
  }
}
```

*Default behaviour (normative).* If `unitOfDelivery` is absent, delivered units default to `|W✓(SC,T)|` (one unit per accepted delivery work). If `unitOfDelivery` is present but omits either predicate, defaults apply: `selectorRef := fulfilsPromiseContent(SC)` and `quantityRef := 1`.

**Measurement typing note (normative).** When `quantityRef` denotes a measured characteristic (e.g., seconds, kWh, kg, requests), the characteristic’s scale/unit and measurement procedure MUST be explicit via the Characterization patterns (C.16 / C.25) (or an equivalent UTS definition) so that two parties cannot silently “count different things” under the same `unitLabel`.
##### A.7:5.10.4 — Bridge to U.Work (normative invariants)

**OUTSPEC‑INV‑1 (No metonymy).**  
`promisedOutcomeSpecRef` points to an **OutcomeSpec**, not to `U.Work` and not to an extensional delivered object. The *actuals* live on `U.Work` (A.15.1) and its evidence anchors.

**OUTSPEC‑INV‑2 (Evaluability from work evidence).**  
All predicates referenced by `workPredicateRef`, `postConditionRef`, and `unitOfDelivery.countingRule.*` MUST be evaluable from `U.Work` facts and cited evidence (including `U.Work.Δ` state anchors / evidence carriers). They MUST NOT require introspecting the internal structure of the provider system unless that structure is itself exposed as evidence.

**OUTSPEC‑INV‑3 (Counting coherence).**  
If `unitOfDelivery` is present, its countingRule MUST select only work episodes that are eligible to satisfy the promise content and MUST not silently double‑count (use `dedupeKeyRef` or a cited policy).
##### A.7:5.10.5 — Canonical examples (didactic)

**Example 1 — Work‑only (promise the work): “provide consultation for ≥5 minutes”.**

```text
OutcomeSpec(OS‑Consult‑5min) := {
  mode: WorkOnly,
  workSpec: {
    methodConstraintRef?: MD‑Consultation,
    workPredicateRef: E‑(duration(work) ≥ 5 minutes)
  }
}

unitOfDelivery := {
  unitLabel: "minute",
  countingRule: {
    selectorRef: E‑(work fulfils OS‑Consult‑5min),
    quantityRef: E‑durationMinutes(work),
    aggregation: sum
  }
}
```

**Example 2 — Result‑only (promise the world state): “a hole of depth ≥ 1 m exists”.**

```text
OutcomeSpec(OS‑Hole‑1m) := {
  mode: ResultOnly,
  resultSpec: {
    describedEntityRef: kind(Hole),
    statePlaneRef: GeometryPlane,
    postConditionRef: E‑(depth(hole) ≥ 1 m ∧ location(hole) within SiteScope)
  }
}

unitOfDelivery := {
  unitLabel: "hole",
  countingRule: {
    selectorRef: E‑(work fulfils OS‑Hole‑1m),
    quantityRef: E‑1,
    aggregation: count,
    dedupeKeyRef: E‑holeId(work)         // prevents double counting when rework happens
  }
}
```

**Example 3 — Composite (promise both): “hairstyle for the evening, produced within 20 minutes, by cut+style (not a wig)”.**

```text
OutcomeSpec(OS‑Hair‑Evening‑20min) := {
  mode: Composite,
  workSpec: {
    methodConstraintRef: MD‑CutAndStyle‑NoWig,
    workPredicateRef: E‑(duration(work) ≤ 20 minutes)
  },
  resultSpec: {
    describedEntityRef: kind(HairstyleOnClient),
    statePlaneRef: AppearancePlane,
    postConditionRef: E‑(looksLike(style="Evening") ∧ survivability(afterShower) ≥ acceptable)
  }
}

unitOfDelivery := {
  unitLabel: "session",
  countingRule: {
    selectorRef: E‑(work fulfils OS‑Hair‑Evening‑20min),
    quantityRef: E‑1,
    aggregation: count,
    dedupeKeyRef: E‑appointmentId(work)
  }
}
```

(Where `E‑(…)` denotes an Episteme/predicate defined in the relevant Context; this appendix does not introduce an expression language.)
### Archetypal Grounding (Tell–Show–Show; System / Episteme)

#### System and Episteme example

**System archetype — “Digital‑twin vs asset”.**  
*Claim:* *The twin (episteme) does not “act”; the **system** bearing TransformerRole enacts Work on the asset; evidence binds to carriers.*  
*Show:* A maintenance **MethodDescription** (tech card) lives at design‑time; a **Work** record (assurance face) lists Γ_time, Γ_work, PathId and **carrier** ids for telemetry. The twin’s update is **Work on the carrier**, not the asset; CL^plane penalties are disclosed when twin–asset crossings are analysed.

**Episteme archetype — “Peer‑review vs manuscript”.**  
*Claim:* *A review is Work by a **system** (the reviewer) **on carriers** of an episteme (the manuscript).*  
*Show:* The **MethodDescription** is the review SOP; the **Work** cites carrier ids (file/edition) and the *describedEntity* episteme; arguments/rebuttals live on epistemes; acceptance gating lives in CAL, not in CHR cards.
#### Didactic examples

**Example 1 — Pump in a cooling loop**

* **Substance (system):** Centrifugal pump P‑12.
* **Role:** **Cooling‑CirculatorRole**.
* **MethodDescription:** “Loop Circulation v3” (**TechCard**, anchored in SCR).
* **Method:** ordered capability: start → ramp → hold → stop (Γ\_method).
* **Work:** run on 2025‑08‑09 10:00–10:45; energy ledger via Γ\_work; log via Γ\_time.
* **Safe phrasing:** *“The **system** playing **Cooling‑CirculatorRole** (via the P‑12 control unit as **Transformer**) executed the **Method** described by **MethodDescription**, producing **Work** …”*
* **What not to write:** “The pump’s function is the role” (role ≠ behaviour).

**Example 2 — Standard document cited in a design**

* **Episteme:** “Safety Standard S‑174”.
* **Carriers:** PDF (SCR id: scr://std/S‑174/2025‑07), printed volume (scr://print/S‑174/2e).
* **Role:** **ReferenceRole** in the valve selection activity.
* **System bearing TransformerRole:** design team’s selection service.
* **MethodDescription:** “Valve Selection SOP v5”.
* **Method/Work:** capability and dated selection session that **used** the standard; the episteme did **not** act.

**Example 3 — Set vs team**

* **Set (MemberOf):** {Alice, Bob, 3.14} — a collection; **no behaviour** implied.
* **Collective system (team):** boundary, coordination **Method**, supervision **Work**; can bear **AgentialRole** (A.13).
* **Safe phrasing:** *“Team T plays **Cooling‑MaintenanceRole** and executed Work W…”*
### Conformance Checklist (normative)

| ID                                       | Requirement                                                                                                                                                                                                                                                                                    | Practical test                                                                                                                            |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **CC‑A7.1 (Role/Behaviour split)**       | A **Role** must be modelled as a contextual **mask** borne by a holon; **behaviour** must be expressed as **Method** (design‑time capability) and **Work** (run‑time occurrence).                                                                                                              | In any sentence, if “role” is used as if it *does* something, rewrite: the **system bearing TransformerRole** does it **by Method/Work**. |
| **CC‑A7.2 (Transformer domain)**         | **TransformerRole SHALL be borne only by a system.**                                                                                                                                                                                                                                           | Type‑check: bearer ∈ `U.System`. “holon bearing TransformerRole” is invalid.                                                              |
| **CC‑A7.3 (Episteme non‑agency)**        | An **episteme SHALL NOT** be described as acting. All changes to epistemes must be routed to their **symbol carriers** (A.10) by a **system bearing TransformerRole**.                                                                                                                         | Text contains the acting system + carriers (SCR ids).                                                                                     |
| **CC‑A7.4 (MethodDescription ≠ Method ≠ Work)** | **MethodDescription** (description), **Method** (capability), and **Work** (occurrence) **SHALL** be kept distinct in wording and modelling.                                                                                                                                                          | Ask: is there a design artefact? a capability? a dated occurrence? Each must be named separately.                                         |
| **CC‑A7.5 (Operator fit)**               | Use **Γ\_method** only for composing **Method**; **Γ\_time** only for **Work** histories; **Γ\_work** only for resource spend/yields; **Γ\_sys** for systemic properties of systems.                                                                                                           | No sentence should use a single generic “process operator” for all three.                                                                 |
| **CC‑A7.6 (SCR anchoring)**              | Any knowledge claim that references documents/data **SHALL** anchor **carriers** via **SCR/RSCR** on first mention in the subsection.                                                                                                                                                          | First mention expands as “Symbol‑Carrier Register (SCR)”; references list carrier ids.                                                    |
| **CC‑A7.7 (Collective vs set)**          | If a grouping is expected to **act**, it **MUST** be modelled as a **collective system** (boundary + coordination Method + Work), not as a **MemberOf** set.                                                                                                                                   | Presence of boundary, Method, Work for the group.                                                                                         |
| **CC‑A7.8 (Diagram legend)**             | When domain idioms use **“process”**, diagrams/text **MUST** map them to FPF terms on first occurrence: *process (domain) ≡ Method (design‑time) / Work (run‑time).*                                                                                                                           | Legend or parenthetical present at first use.                                                                                             |
| **CC‑A7.9 (Substance ⧧ Role wording)**   | The safe formula is **“System (substance) plays Role; under that Role it has Method; its execution is Work.”**                                                                                                                                                                                 | Sentences follow this order; “function” used only as synonym for **behaviour**, never for the **role**.                                   |
| **CC‑A7.10 (Quartet clarity)**           | Any “triad” picture **MAY** be used only as a **design‑time stand‑in** (Transformer + MethodDescription + Method) and **MUST** be accompanied by an explicit **Work** lane elsewhere in the same section. “quartet of quartets” headings **SHALL** be avoided; use **“Quartet backbone”** instead. | Diagram has a visible **Work** lane/timeline or separate box within the same section.                                                    
| **CC‑A7.11 (Terminology hygiene)**       | Ban **“actor”** in core text. Use **“system bearing TransformerRole”**; bind local shorthand **“Transformer”** only per A.12 rules.                                                                                                                                                            | Plain text scan: no “actor”; shorthand is locally bound.                                                                                  |
| **CC‑A7.12 (Role domain guards)**        | Behavioural roles’ domain = **system**. Epistemes may bear **non‑behavioural** roles (e.g., ReferenceRole, ConstraintSourceRole) only.                                                                                                                                                         | Role declarations name their domain.                                                                                                      |
| **CC‑A7.13 (I→D→S visibility)**          | I/D/S morphisms MUST be **explicit**; do not conflate them with MVPK or TGA steps. If a flow shows only surfaces, the underlying `Describe_ID`/`Specify_DS` steps MUST be recoverable.       | Both steps are visible in text/diagrams; audit shows two distinct operations.                                                             |
| **CC‑A7.14 (Describe_ID / Specify_DS laws)** | Any implementation of `Describe_ID` MUST enforce **ID‑1/ID‑2**; `Specify_DS`/`Formalize_DS` MUST enforce **DS‑1/‑2/‑3**. Violating systems are considered out‑of‑model.                                                                                                              | Diff check between I and D shows no new claims; mapping table shows preserved composition.                                                |
| **CC‑A7.15 (Formalize_DS laws)**         | `Formalize_DS` obeys **DS‑1/DS‑2/DS‑3**: monotonic refinement; pins edition/unit/scale/ReferencePlane/anchors; produces new **S** + **SCR** carriers without retro‑mutation.                                     | Presence of **CHR‑Pins** and pinned anchors; new SCR ids; no edits to prior carriers.                                                     |
| **CC‑A7.16 (Γ‑separation)**              |  Both I/D/S describing/formalising morphisms (`Describe_ID`/`Specify_DS`) and publication‑to‑surface morphisms (MVPK) SHALL NOT carry cost/time semantics; **Γ\_method**, Γ\_time and Γ\_work belong to **Method/Work/System**, not to description/specification or publication. Any aggregate on a card must cite the Γ operator and policy.   | No ledger/time fields attached to `Describe_ID`/`Specify_DS` or MVPK publication steps; any “publication cost” is Work in a separate publication service.             |
| **CC‑A7.17 (**Surface tokens only)**     |  Only **PublicationSurface/InteropSurface** tokens are allowed; faces are **…View/…Card/…Lane**. Use only `PlainView`, `TechCard`, `InteropCard`, `AssuranceLane` (and their tech aliases) unless a DRR extends the set. New `…Surface` kinds require a DRR and L‑SURF revision.                                                 | Token scan shows no ad‑hoc `…Surface` kinds.                                                       |
| **CC‑A7.18 (Bridge+CL on crossings)**    | Any cross‑Context or cross‑plane content on a face **MUST** cite **Bridge id + CL** and **Φ policy‑ids**; penalties route to **R** only.                                                                         | Presence of Bridge ids and **Φ(CL)**/**Φ_plane** on TechCard/AssuranceLane.                        |
| **CC‑A7.19 (UTS anchoring)**             | Public names shown on faces **SHALL** point to **UTS rows** with twin labels (Tech/Plain), edition pins, and SCR carrier ids.                                                                                    | Face carries UTS row ids + edition pins.                                                          |
### Canonical rewrites (didactic library)

| Instead of (ambiguous)                           | Write (canonical)                                                                                                                               | Why                                                       |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| “The process enforced the rule.”                 | “The **system bearing TransformerRole** enforced the rule by executing the **Method**; the **Work** is anchored to carriers ⟨ids⟩.”             | Processes don’t act; systems do. Evidence via Work + SCR. |
| “The specification decided to tighten limits.”   | “The **design‑control service (system bearing TransformerRole)** updated the **carriers** of the spec (SCR ids), producing **Work** at ⟨time⟩.” | Epistemes are changed via carriers by systems.            |
| “Our role is pump; the role circulates coolant.” | “The **system** plays **Cooling‑CirculatorRole**; under this role its **Method** circulates coolant; **Work** was executed ⟨when⟩.”             | Role = mask; behaviour = Method/Work.                     |
| “We followed the blueprint, so it’s done.”       | “We have a **MethodDescription** and a **Method**; completion is evidenced by **Work** with ⟨timestamps, outcomes⟩.”                                   | Description/capability ≠ occurrence.                      |
| “Team = set of members; it performed repair.”    | “The **team** is a **collective system** (boundary + coordination **Method**); it executed **Work** ⟨…⟩.”                                       | Acting groups must be systems, not sets.                  |
| “Process cost is tracked by Γ\_method.”          | “**Work** cost is tracked by **Γ\_work**; **Γ\_method** composes the **Method** (order/branching).”                                             | Operator alignment.                                       |
| “Holon bearing TransformerRole.”                 | “**System bearing TransformerRole**.”                                                                                                           | Only systems can bear behavioural roles.                  |
| “Publication is a special mechanism.”            | “Publication = **typed projection** from existing Descriptions/Specifications onto **PublicationSurface/InteropSurface** (MVPK); **describing/formalising** are `Describe_ID`/`Specify_DS`, and any execution around them is separate **Work** by a **system** on **carriers**.” | Publication is not behaviour; it is a D/S→Surface projection in the model. |
### Anti‑patterns (with fixes)

1. **Role‑as‑behaviour** — calling the **role** “the function”.
   **Fix:** Name the **role** + **Method/Work** pair explicitly.

2. **Episteme‑as‑system** — “the model routed traffic”.
   **Fix:** Name the **system** (or Transformer as a system bearing AgentialRole) that used the model; list **carriers** touched.

3. **Triad everywhere** — omitting **Work** entirely.
   **Fix:** Add the Work lane: timestamps, outcomes, Γ\_time coverage.

4. **Operator blur** — using one “process operator” for everything.
   **Fix:** Choose among **Γ\_method**, **Γ\_time**, **Γ\_work**, **Γ\_sys**.

5. **Set‑as‑collective** — a MemberOf set “decides”.
   **Fix:** Model a **collective system** with coordination Method.

6. **Unanchored evidence** — citing ideas without carriers.
   **Fix:** Add **SCR/RSCR** ids; tie claims to carriers.

7. **Holon/system drift** — “holon maintains temperature”.
   **Fix:** Say **system**; reserve “holon” for neutral mereology.

8. **Function/role swap in tables** — columns labelled “Function” but entries are roles.
   **Fix:** Rename column to **Role**; add a separate **Behaviour (Method/Work)** column.

9. **Process‑word leakage** — domain “process” used as FPF operator.
   **Fix:** Add parenthetical mapping at first use (Method/Work).

10. **Carrier/episteme swap** — “we versioned the model” meaning a file was renamed.
   **Fix:** State whether the **episteme content** changed; if only a carrier was renamed, say so.

11. **Publication‑as‑mechanism** — modelling “publication” as if it were a Method/Mechanism.
   **Fix:** Separate **describing/formalising** (`Describe_ID`/`Specify_DS`) from **publication** (MVPK D/S→Surface). If there is operational toil (build, render, upload), model it as **Work** by a **system** on **carriers**; do not change the ontology of the described object or the D/S episteme being surfaced.
### Consequences

| Benefit                      | Why it matters                                    | Trade‑off / Mitigation                             |
| ---------------------------- | ------------------------------------------------- | -------------------------------------------------- |
| **Category safety at scale** | Prevents silent logic bugs across holarchies.     | Slight verbosity → use local shorthand per A.12.   |
| **Trustworthy evidence**     | Work + SCR anchoring makes claims auditable.      | Requires discipline → provide checklists.          |
| **Operator determinism**     | Correct Γ‑flavour selection preserves invariants. | A bit more modelling → reusable templates.         |
| **On‑ramp for managers**     | Canonical rewrites give immediate phrasing fixes. | Team training → this pattern is the training page. |

| Benefits | Trade‑offs / Mitigations |
|---------|---------------------------|
| **Category‑error firewall.** Clear separation of System/Episteme; I/D/S vs Surface orthogonality removes recurring modeling defects. | Authors must tag surfaces explicitly; mitigated by a minimal **SurfacePack** template in E.8. |
| **Audit and pedagogy align.** SCR/RSCR point to carriers; Normative face houses checklists; Plain face teaches; Tech face types. | Slight increase in pattern length; offset by predictable navigation and machine‑checkable CC. |
| **Cross-Context safety.** Bridge+CL discipline is now visible even on surfaces. | Authors must cite CL policy-ids; tooling can assist (GateCrossing visibility harness), but text remains notation-independent. |
### SoTA‑Echoing (post‑2015 practice alignment)

* **Digital Twins (ISO 23247, 2021→):** separates the asset (system) from its **digital representation** (episteme) and prescribes governance of twins without attributing *agency* to the twin itself — matching A.7’s “episteme ≠ actor” and carrier discipline. **Adopt.** 
* **Observability (OpenTelemetry, 2019→2025):** codifies **semantic conventions** as a *publication layer* over traces/metrics/logs; semantics live in descriptions, not exporters — echoing our **PublicationSurface** orthogonality. **Adapt** (terminology). 
* **Active Inference (2017→2024):** separates a **generative model** (episteme) from **actions** by the agent (system), with explicit perception–action cycles — mirroring A.7’s “who can act” and stance separation. **Adopt** 
* **Constructor Theory (2016→):** frames knowledge and work as **possible transformations** enacted by constructors (systems), not by informational states — reinforcing “episteme ≠ actor”. **Adopt** 
* **Quality‑Diversity (MAP‑Elites family, 2015→2024):** archives are **sets on typed spaces** (descriptions) whose **occurrences** are runs; selection returns **sets** under lawful orders — consonant with A.7 and A.15’s set‑returning discipline. **Adopt/Adapt**. 
* **Refinement‑typed specs (2016→):** modern stacks (e.g., Liquid Haskell, Dafny’s post‑2017 refinements, Rust’s `uom` type‑level units) treat formalization as **monotonic refinement with pinned units/scales** — echoing **Formalize_DS** and **Surface field pins**. **Adapt** (terminology; pinning discipline).
### Rationale (informal)

* **Engineering cognition:** Large programmes fail less from equations than from category slips (“process vs procedure vs execution”). A.7 eliminates these slips by a small, repeatable grammar.
* **Compatible with ISO/BORO practice:** Distinguishing artefacts (specs), capabilities (procedures), and occurrences (operations) mirrors established systems‑engineering discipline while keeping FPF’s holonic rigor.
* **Didactic primacy:** Managers can approve sentences by spotting five tokens: **system bearing TransformerRole** / **Role** / **Method** / **Work** / **SCR**.
* **Why bring “PublicationSurface” into A.7?** Strict Distinction already guards **what a thing is (I)** from **how we describe/specify it (D/S)**. In practice, **misreadings happen at the publication layer**: cards and tables are mistaken for objects; governance words leak where physics/logic should stand. By making **PublicationSurface** *explicit and orthogonal*, A.7 closes that gap without entangling semantics with any tool or notation. This preserves **C‑1 universality** and **P‑1 Cognitive Elegance**, while giving E.8 a crisp home for multi‑face presentation rules.
### Relations

**Builds on:** A.1 (Holon), A.2 (Roles), A.3 (Transformer Quartet), A.10 (Evidence & SCR), A.12 (External Transformer), A.14 (Advanced Mereology), A.15 (Role–Method–Work Alignment).  
* **Constrains:** A.13 (Agency sits on systems only; epistemes non‑behavioural), Part B operators (**Γ_method**/**Γ_time**/**Γ_work**/**Γ_sys**) and their choice points; **publication is not a Γ‑operator**.  
* **Extends:** E.8 (Authoring conventions), E.10 (LEX‑BUNDLE incl. **L‑SURF**), **Part F/G (UTS & CG‑Spec/CHR pinning)**, B.3 (Assurance routing), C‑cluster (selection/archives) — by enforcing I/D/S vs Surface orthogonality, System/Episteme separation, and typed I→D→S describing/formalising discipline (**publication = D/S→Surface in E.17**).  
* **Coordinates with:** **E.18 (E.TGA - GateCrossing / OperationalGate(profile))** for crossing visibility & publication gating, **A.21/A.27** for check/pinning discipline, **E.10** for lexical SD checks, and **Part F (Bridges/CL)** for explicit cross-Context identity — without embedding any notation dependence.
### Manager’s one‑page review (copy‑paste)

**Approval sentence template**

> “The **system bearing TransformerRole** ⟨name⟩ plays ⟨Role⟩; it has **Method** ⟨M⟩ (from **MethodDescription** ⟨S⟩) and executed **Work** ⟨W⟩ on ⟨time⟩, anchored to ⟨SCR ids⟩; resources accounted via **Γ\_work**.”

**Five binary checks**

1. **Actor ban:** No “actor” token; canonical phrasing present.
2. **Clear trio:** MethodDescription / Method / Work are all named (as applicable) and not conflated.
3. **Right Γ:** Γ\_method for capability; Γ\_time for occurrence; Γ\_work for resources; Γ\_sys for system properties.
4. **Episteme handled:** Epistemes do not act; carriers listed (SCR).
5. **Group clarity:** Acting group is a **collective system**, not a MemberOf set.

**Diagram legend stub**

* “process (domain)” ⇒ Method (design‑time) / Work (run‑time).
* Role column lists masks (e.g., Cooling‑CirculatorRole).
* Behaviour column shows Method/Work, not the role itself.
### A.7:End
## Universal Core Principle (C‑1)

*“A principle that works in only one world is local folklore; a first principle architects every world.”*

### Problem Frame

FPF aspires to be an **operating system for thought** that engineers, biologists, economists, and AI agents can all use without translation layers. That promise rests on the **universality** of its core primitives (`U.Type`s).  History is littered with “upper ontologies” that proclaimed universality yet smuggled in the biases of a single discipline; once deployed beyond their birthplace, they cracked or ballooned.  Rule C‑1 turns “universal” from a marketing word into a measurable criterion: *cross‑domain congruence*.
### Problem

| Pathology                 | Manifestation                                                                                       |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| **Parochial Drift**       | A “universal” `U.Resource` works for ERP bills of materials but collapses for ATP in cell biology.  |
| **Alienated Communities** | Subject‑matter experts recognise the bias and abandon the framework, fracturing knowledge silos.    |
| **Kernel Bloat**          | Competing “almost‑universal” types are added to patch gaps, violating Ontological Parsimony (A 11). |
### Forces

| Force                           | Tension                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| **Generality vs Specificity**   | Primitives must stretch across physics ↔ social science yet keep actionable meaning. |
| **Rigor vs Pragmatism**         | Proof of universality must be checkable, not philosophical hand‑waving.              |
| **Inclusivity vs Coherence**    | Welcoming new ideas should not swamp the kernel with domain jargon.                  |
| **Cognitive Load vs Grounding** | Examples help readers, but too many examples obscure the essence.                    |
### Solution — The Three‑Domain Falsification Test

> **Normative Rule (C‑1)** A `U.Type` **enters the kernel only if** it is shown to play the **same Role** in **at least three foundationally distinct domains**.

 **Heterogeneity & QD‑triad guarantee (C‑1.QD).**
 In addition to distinct **domain‑families** (choose from: *Exact Sciences - Natural Sciences - Engineering & Technology - Formal Sciences - Social & Behavioural Sciences*), the **triad** SHALL demonstrate **quality diversity**:
(a) **Hetero‑test.** Each projection adds at least one non‑trivial **DescriptorMap** signal or Bridge path not subsumed by the other two (no aliasing by mere renaming).
(b) **QD evidence.** Publish **Creativity‑CHR / NQD‑CAL** evidence for the triad: `Diversity_P` (set‑level) and its **IlluminationSummary** telemetry metric with ≥3 non‑empty cells and `occupancyEntropy > 0` under the declared grid.
(c) **Policy disclosure.** Declare the Context‑local `QD_policy` (binning/grid, kernel, time‑window) used to compute the telemetry metrics.
(References: **C.17** `Diversity_P` & illumination Summary as telemetry metric; **C.18** `U.DescriptorMap`, `U.IlluminationSummary`.)

Implementation steps (Domain Families): 

1. source domain‑families from the active F1‑Card (taxonomyRef/embeddingRef edition). The five coarse families {Exact, Natural & Life, Engineering & Tech, Formal, Social & Behavioural} are informative only; if used for pedagogy, publish an explicit mapping to the F1‑Card taxonomy. The triad gate is measured by MinInterFamilyDistance ≥ δ_family (per F1‑Card), not by labels alone.

2. **Role‑Projection Records** For each domain, author a short **`Role‑Projection`** tuple: `{domain, indigenous term, Role, exemplar}`.
   *Example:* `{physics, "Free Energy", extremum driver, closed gas system}`.

3. **Congruence Check** All three exemplars must satisfy the **same abstract intent**; superficial analogy is rejected.

4. **Living Index** Track the ratio

   $$
     U\text{-Index}=\frac{\text{\# kernel types lacking 3 projections}}{\text{\# kernel types}}
   $$

   as a health signal; target ≤ 0.05 (not a bureaucratic gate).

*Rule of thumb for busy managers:* “**One idea, three worlds.** If you can’t point to the trio, park it in a Extention Pattern.”
### Archetypal Grounding (System / Episteme)

| Universal `U.Type` | **Domain 1 - Physics**                  | **Domain 2 - Life Sci.**            | **Domain 3 - Tech & Soc.**       | Congruent Role                |
| ------------------ | --------------------------------------- | ----------------------------------- | -------------------------------- | ----------------------------- |
| `U.Objective`      | *Free Energy* minimum in thermodynamics | *Fitness* maximisation in evolution | *Loss* minimisation in ML        | Extremum driver of change     |
| `U.System`         | Thermodynamic control volume            | Biological organism (cell membrane) | Cyber‑physical system (IoT edge) | Bounded interacting whole     |
| `U.Resource`       | Joules of energy                        | ATP molecules                       | Budget dollars                   | Conserved, spendable quantity |

These juxtapositions give engineer‑managers an immediate sense of *why* each primitive is worth learning.
### Conformance Checklist

| ID          | Requirement                                                                                                                            | Purpose                                                 |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **CC‑UC 1** | A proposed `U.Type` **SHALL** include ≥ 3 Role‑Projection records, each taken from a *different* domain family.                        | Enforces the Three‑Domain Test.                         |
| **CC‑UC 2** | Each Role‑Projection **MUST** explain in ≤ 30 words how the domain notion fulfils the *same Role* as the proposed `U.Type`. | Blocks superficial analogies.                           |
| **CC‑UC 3** | No single artefact may serve as exemplar for more than one domain projection.                                                          | Prevents contrived “triple duty” examples.              |
| **CC‑UC 4** | A **specialised** `U.SubType` inherits its parent’s projections **and** adds ≥ 1 new domain projection, never fewer.                   | Keeps refinements as universal as their parents.        |
| **CC‑UC 5** | While the U‑Index > 0.05, authors **SHALL** prioritise supplying missing projections over adding new core concepts.                    | Maintains kernel health without procedural bureaucracy. |
| **CC‑UC‑2‑QD‑triad.** | The three Role‑Projections come from **different domain‑families** AND the triad PUBLISHES: `{FamilyCoverage, MinInterFamilyDistance, Diversity_P, IlluminationSummary}` with `MinInterFamilyDistance ≥ δ_family` (per **F1‑Card** DistanceDef & edition). + Provenance MUST cite `DescriptorMapRef` (incl. `DistanceDef`/edition), `F1‑Card id+edition`, and the grid/binning policy used for `IlluminationSummary`.  | quality diversity of domains
### Consequences

| Benefit                                                                                                    | Trade‑off                                     | Mitigation                                                 |
| ---------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------- |
| **Lean, trusted kernel** – every primitive earns its place by real work in three worlds.                   | Authoring effort for projections.             | Patterns A 5/A 6 provide templates and exemplar libraries. |
| **Cross‑disciplinary uptake** – physicists, managers, and biologists see their own language reflected.     | Some novel ideas wait to gather evidence.     | They live safely in Extention Patterns until mature.                 |
| **Resilience to domain drift** – if one field’s jargon changes, the other two anchors preserve continuity. | Possible oversimplification of niche nuances. | Domain‑specific elaborations belong in FPF patterns.      |
### Rationale

Deep research over the last decade shows *structural homologies* across domains:

* Free‑energy minimisation ↔ negative log‑likelihood ↔ Bayesian surprise (Friston 2023).
* Conservation laws in physics mirror budget balancing in economics (Rayo 2024).

By demanding three independent manifestations, FPF captures these convergences *without privileging* any single vocabulary.  The principle operationalises **Popperian falsifiability** for universality: a concept that cannot survive a three‑domain cross‑examination is, by definition, not a first principle.  This guards Pillars **P‑1 (Cognitive Elegance)** and **P‑4 (Open‑Ended Kernel)** simultaneously.
### Relations

| Relation             | Linked Pattern                       | Contribution                                                          |
| -------------------- | ------------------------------------ | --------------------------------------------------------------------- |
| **Supports**         | A 11 Ontological Parsimony           | Filters candidates before sunset reviews.                             |
| **Prerequisite for** | A 9 Cross‑Scale Consistency          | Only universal types can propagate invariants up and down holarchies. |
| **Complementary**    | A 7 Strict Distinction               | Together provide clarity (A 7) and breadth (A 8).                     |
| **Enables**          | B 1 Universal Algebra of Aggregation | Γ‑operators rely on domain‑agnostic operands.                         |
### Known Uses

* **Energy ↔ Budget ↔ Attention** – Engineering teams reused `U.Resource` to reason about battery charge, project funds, and user‑attention minutes with one algebra, cutting integration effort by half (2024 pilot).
* **Objective unification** – An AI lab mapped *loss functions*, a bio‑lab mapped *Darwinian fitness*, and a factory mapped *scrap‑rate* all to `U.Objective`, enabling shared optimisation tooling.

These cases validated that the Three‑Domain Test is achievable in practice, not theoretical paperwork.
### Open Questions

1. **Domain taxonomy stability** – Should the five domain families be versioned as science evolves (e.g., quantum‑bio‑tech)?
2. **Automated congruence checks** – Can category‑theoretic tooling semi‑automate the functional‑role equivalence test?
3. **Edge‑case hybrids** – How are bio‑cyber‑physical chimera systems counted: a new domain or a composite projection?
### A.8:End
## Cross‑Scale Consistency (C‑3)

> *“The logic of a bolt must still be the logic of the bridge.”*

### Context

FPF models reality as a **nested holarchy**: parts → assemblies → systems → supra‑systems; axioms → lemmas → theorems → paradigms. Designers and analysts must zoom freely without logical whiplash. Classical mereology and modern renormalisation theory both warn: if rules mutate across scales, predictions and audits collapse. FPF therefore mandates a single, scale‑invariant Standard.
### Problem

| Failure Mode              | Real‑World Symptom                                         |
| ------------------------- | ---------------------------------------------------------- |
| **Invalid extrapolation** | Unit‑tested module fails once integrated.                  |
| **Brittle dashboards**    | Portfolio KPI “green” hides a red supplier averaged away.  |
| **Compositional chaos**   | Different teams’ roll‑ups yield non‑deterministic results. |

These pathologies derail safety cases and budget decisions across disciplines.
### Forces

| Force                                  | Tension                                                      |
| -------------------------------------- | ------------------------------------------------------------ |
| **Local autonomy vs Global coherence** | Free optimisation of parts ↔ predictable behaviour of whole. |
| **Simplicity vs Fidelity**             | Single rule‑set ↔ non‑linear, emergent effects.              |
| **Determinism vs Emergence**           | Stable roll‑ups ↔ need to legitimise genuine synergy jumps.  |
| **Didactic clarity vs Formal rigour**  | Managers grasp intent quickly ↔ analysts can prove it.       |
### Solution — Invariant Quintet + Meta‑Holon Transition

#### Invariant Quintet

Any aggregation operator `Γ` that claims FPF conformance **MUST** preserve these five invariants :

| Code     | Invariant             | One‑line Intuition                               |
| -------- | --------------------- | ------------------------------------------------ |
| **IDEM** | *Idempotence*         | Folding a singleton changes nothing.             |
| **COMM** | *Local Commutativity* | Order of independent folds is irrelevant.        |
| **LOC**  | *Locality*            | Worker or partition choice cannot affect result. |
| **WLNK** | *Weakest‑Link Bound*  | Whole never outperforms its frailest part.       |
| **MONO** | *Monotonicity*        | Improving a part cannot worsen the whole.        |

*Mnemonic:* **S‑O‑L‑I‑D** (Same - Order‑free - Location‑free - Inferior cap - Don’t‑regress).

**Inter‑Layer Standard note**
When holons are composed as a Layered‑Control stack, each Planner ↔ Regulator pair MUST publish an inter‑layer Standard: {referenceSignal, guaranteedTrackingError, cycleTime}.  Matni 2024 (https://arxiv.org/abs/2401.15185) prove such Standards satisfy COMM + LOC invariants, giving a constructive instance of the Quintet.
#### Meta‑Holon Transition (MHT)

If empirical data show a true violation (e.g., redundancy raises WLNK limit), the modeller **declares an MHT**: the collection becomes a new holon tier, and the quintet applies anew at that scale .
### Archetypal Grounding

| Invariant  | **`U.System` — Pump Skid**                    | **`U.Episteme` — Meta‑Analysis**                |
| ---------- | --------------------------------------------- | ----------------------------------------------- |
| IDEM       | One‑pump skid ≅ that pump.                    | Single‑study review ≅ that study.               |
| COMM / LOC | Pumps welded in any order / yard → same spec. | Labs contribute in any order → same statistics. |
| WLNK       | Pressure rating ≤ weakest pump.               | Reliability ≤ least‑replicated study.           |
| MONO       | Stronger motor never lowers flow.             | Larger sample size never lowers confidence.     |
### Conformance Checklist

| ID          | Requirement                                                                                                                                                                                      | Purpose (manager‑friendly)                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| **CC‑A9‑1** | Every calculus that defines an aggregation operator `Γ` **SHALL** provide a plain‑language note and a formal argument for how `Γ` upholds **all five invariants** (IDEM, COMM, LOC, WLNK, MONO). | Makes the Standard both human‑readable and checkable.     |
| **CC‑A9‑2** | A *singleton fold* (` card (parts) = 1 `) **MUST** return the part unaltered (IDEM). | Locks the recursion base case. |
| **CC‑A9‑3** | Folding two independent sub‑graphs in any order or on any compute site **MUST** yield equal results (COMM + LOC).                                                                                | Enables safe parallel work and reproducible analytics.    |
| **CC‑A9‑4** | No aggregate metric **MAY** exceed the minimum of that metric across parts unless an **MHT** is declared (WLNK).                                                                                 | Prevents stealth inflation of reliability or truth.       | 
| **CC‑A9‑6** | A declared **Meta‑Holon Transition** **SHALL**: (a) name the new supervisory holon; (b) cite the data triggering the transition; (c) restate how the quintet holds at the new scale.             | Ensures emergence is captured explicitly, not hand‑waved. |
### Consequences

| Benefit                      | Why it matters                                                   | Trade‑off / Mitigation                                                           |
| ---------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Stable roll‑ups**          | Summaries and reports remain faithful as parts evolve.          | Requires early agreement on `Γ`; offer reference libraries.                      |
| **Visible risk floor**       | WLNK blocks “averaging away” critical weaknesses.                | Can look overly conservative; redundancy, when real, lifts the minimum honestly. |
| **Parallel progress**        | COMM + LOC allow distributed teams to integrate without re‑work. | Needs explicit independence assumptions; templates guide authors.                |
| **Objective emergence flag** | Quintet failure becomes a measurable R\&D signal.                | Teams must learn to document MHTs instead of ignoring anomalies.                 |
### Rationale

*Post‑2015 evidence across domains*

* **Physics** ‑ Renormalisation coherence echoes IDEM, COMM, LOC.
* **Distributed data platforms** rely on COMM + LOC for deterministic aggregations.
* **Safety engineering** ‑ Fault‑tree analyses hinge on WLNK; aviation failures (2018‑24) confirm its necessity.
* **Lean improvement** ‑ MONO underpins Kaizen: fix a bottleneck, never worsen the plant.

Packaging these insights as one memorisable quintet → **Cognitive Elegance** with formal bite.
### Relations

| Relation           | Linked Pattern                       | Contribution                                              |
| ------------------ | ------------------------------------ | --------------------------------------------------------- |
| **Builds on**      | A 1 Holonic Foundation               | Supplies part/whole semantics.                            |
| **Reinforces**     | A 7 Strict Distinction               | Prevents layer‑mixing during folds.                       |
| **Enabled by**     | A 8 Universal Core                   | Guarantees operands share truly universal meaning.        |
| **Foundation for** | B 1 Universal Algebra of Aggregation | B‑section implements operators that satisfy this pattern. |
| **Triggers**       | B 2 Meta‑Holon Transition            | When invariants fail through synergy, an MHT is invoked.  |
### Known Uses (2018‑2025)

* **Spacecraft avionics** ‑ Applying WLNK exposed a sub‑grade connector, saving a \$40 M launch window.
* **Global vaccine meta‑reviews** ‑ COMM + LOC let five epidemiology teams merge data independently; results converged within 0.1 % effect size.
* **Distributed ML training** ‑ MONO guaranteed optimiser swaps never reduced accuracy, cutting iteration time by 20 %.
### Open Questions for expert panel

1. **Order‑sensitive physics** – Should quantum‑circuit folds live in a Extention Patterns with a relaxed invariant set?
2. **Synergistic redundancy** – Can WLNK be reframed using an “effective minimum” when true redundancy lifts the floor?
3. **Didactic tooling** – Which visual cues best alert non‑formal audiences to an approaching Meta‑Holon Transition?
4. **Layer depth** — In an LCA (layered control architectures, https://arxiv.org/abs/2401.15185) stack every Planner is external to its Regulator; should FPF limit the number of nested layers, or is indefinite chaining acceptable?
### A.9:End
## Evidence Graph Referring (C‑4)

*“A claim without a chain is only an opinion.”*

### Context

FPF is a holonic framework: wholes are built from parts (A.1, A.14), and reasoning travels across scales via Γ‑flavours (B.1). To keep this reasoning honest and reproducible, every **published assertion** must be *anchored* in concrete **symbol carriers** and **well‑typed transformations** performed by an **external TransformerRole** (A.12, A.15). **Publication** itself is the typed projection **I→D→S** (`Publ_ID`, `Formalize_DS`) per A.7 and is **not execution**; any physical/digital release, rendering, or upload is **Work** by an external transformer **on carriers**, cited in SCR.

Managers can read this as a simple rule of thumb:
> **Claim → (Proof or Test) → Confidence badge**
> …where the proof/test is traceable to real carriers and to an external system/Transformer who executed an agreed method.

This pattern defines the **Evidence Graph Referring Standard** common to all Γ‑flavours (Γ\_sys — formerly Γ\_core, Γ\_epist, Γ\_method, Γ\_time, Γ\_work) and clarifies:
(a) the difference between **mereology** (part‑whole; builds holarchies) and **provenance** (why a claim is admissible; does *not* build holarchies);
(b) the run‑time / design‑time separation (A.4) across **Role–Method–Work** (A.15).
### Problem

Without a uniform anchor, models drift into five failure modes:

1. **Weightless claims.** Metrics or arguments appear in the model with no link to their **symbol carriers** (files, datasets, lab notebooks, figures).
2. **Collapsed scopes.** Design‑time method specs are silently mixed with run‑time traces; results cannot be reproduced because “what was planned” and “what actually ran” are conflated.
3. **Self‑justifying loops.** A holon attempts to evidence itself (violates A.12 externality), producing cyclic provenance and unverifiable conclusions.
4. **Source loss during aggregation.** As Γ combines parts, some sources “fall out”; later audit cannot reconstruct why a compound claim was accepted.
5. **Temporal ambiguity.** Time‑series are aggregated without interval coverage or dating source; gaps/overlaps invalidate comparisons and trend claims.

The business effect is predictable: confidence badges cannot be defended, cross‑scale consistency (A.9) is broken, and iteration slows because every review re‑litigates “where did this come from?”.
### Forces

| Force                           | Tension                                                                                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Universality vs. burden**     | One Standard must fit systems and epistemes ↔ Authors should not drown in paperwork.                                                              |
| **Externality vs. reflexivity** | Evidence must be produced by an external TransformerRole (A.12) ↔ Some systems adapt themselves (need reflexive modelling without self‑evidence). |
| **Atemporal vs. temporal**      | Many claims are state‑like ↔ Many others are histories; evidence must respect order and coverage (Γ\_time).                                       |
| **Rigor vs. flow**              | Formal proofs and controlled tests raise confidence ↔ Engineering cadence needs lightweight, incremental anchors.                                 |
| **Mereology vs. provenance**    | Part‑whole edges build holarchies ↔ Evidence edges never do; the two graphs must interlock without leaking semantics.                             |
### Solution — The Evidence Graph Referring Standard

The Standard is a small set of primitives applied uniformly, with **manager‑first clarity** and **formal hooks** for proof obligations.

#### EPV‑DAG (Evidence–Provenance DAG).

A **typed, acyclic** graph disjoint from mereology. Node types: **SymbolCarrier** (a `U.System` in **CarrierRole**, A.15), **TransformerRole** (external Transformer, A.12), **MethodDescription** (design‑time blueprint of a method, A.15), **Observation** (a dated assertion/result), **U.Episteme** (knowledge holon). Edge vocabulary is small and normative: `evidences`, `derivedFrom`, `measuredBy`, `interpretedBy`, `usedCarrier`, `happenedBefore` (temporal), etc.
*Manager view:* it is the *“because‑graph”*: every claim answers “because of these carriers, by this Transformer, using that method, then.”
#### Anchors (two relations, two flavours).**

* `verifiedBy` — links a claim to **formal** evidence (proof obligations, static guarantees, model‑checking artefacts).
* `validatedBy` — links a claim to **empirical** evidence (tests, measurements, trials, observations).
  Both anchors terminate in the EPV‑DAG, not in the mereology graph.
#### A.10:4.3 SCR / RSCR (Symbol Carrier Registers).

Every `Γ_epist` aggregation **SHALL** emit an **SCR**: an exhaustive register of **symbol carriers** materially used in the aggregate, with id, type, version/date, checksum, source/conditions and optional `PortionOf` (A.14) for sub‑carriers.
Every `Γ_epist^compile` **SHALL** emit an **RSCR**: SCR specialised to a **bounded context** (vocabularies, units) with publication‑grade identifiers and hashes.
*Why this matters:* it prevents “lost sources” during composition and underwrites reproducibility without mandating any specific tool.
#### A.10:4.4 Scope alignment (A.4) across Role–Method–Work (A.15).

* **Design‑time**: **MethodDescription** lives here; methods are blueprints; anchors reference what *would* constitute proof or test.
* **Run‑time**: **Work** (actual execution) lives here; traces reference which MethodDescription they instantiate and record `happenedBefore`.
  Bridging edges are explicit (“this run trace instantiates that spec”), so scopes never silently mix.
#### A.10:4.5 External TransformerRole (A.12).

The system that produces or interprets evidence is **external** to the holon under evaluation. If true reflexivity is essential, model a **meta‑holon** (A.12): the self‑updating holon becomes the *object* of a higher‑level external transformer (the “mirror”), restoring objectivity.
#### A.10:4.6 Γ‑flavour hooks (how each flavour anchors).

* **Γ\_sys (formerly Γ\_core)**: physical properties are anchored by measurement models, boundary conditions, calibration carriers, and dated observations.
* **Γ\_epist**: always outputs SCR/RSCR; every provenance/evidence node resolves to an SCR/RSCR entry.
* **Γ\_method**: order‑sensitive composition; at design‑time a **Method Instantiation Card (MIC)** states `Precedes/Choice/Join` and guards; at run‑time traces record `happenedBefore` and point to the MethodDescription they instantiate.
* **Γ\_time**: temporal claims state interval coverage; **Monotone Coverage** (no unexplained gaps/overlaps) is required.
* **Γ\_work**: resource spending and yield are evidenced by instrumented carriers (meters, logs) and their MethodDescriptions; keep **resource rosters** separate from SCR/RSCR.

> **Manager’s shortcut:** If you can answer *what carriers, which system, which method, when*, the anchor is likely sufficient; if any of the four is missing, it is not.
### Archetypal Grounding

| Aspect                       | `U.System` — Autonomous Brake                                                                       | `U.Episteme` — Meta‑analysis                                                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Claim**                    | “Stop within 50 m from 100 km/h.”                                                                   | “Drug A outperforms control on endpoint E.”                                                                              |
| **Anchor**                   | `verifiedBy`: static‑analysis proof of no overflow; `validatedBy`: instrumented track tests.        | `verifiedBy`: power‑analysis proof of sample size; `validatedBy`: pooled effect sizes with bias checks.                  |
| **Carriers (SCR/RSCR)**      | Scale logs, calibration certificates, test track telemetry; SCR lists all; RSCR adds context units. | PDFs of studies, data tables, analysis code; SCR lists carriers; RSCR adapts vocabularies/units for the target audience. |
| **External TransformerRole** | Independent test team / metrology lab.                                                              | Independent synthesis team / statistician.                                                                               |
| **Temporal**                 | Dated runs; `happenedBefore` between setup → test → teardown.                                       | Publication dates; dataset versions; monotone coverage of included studies.                                              |
### Conformance Checklist

| ID                                      | Requirement                                                                                                                                                                                                                             | Purpose (what it prevents)                                 |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **CC‑A10.1 (EPV‑DAG Presence)**         | Every published claim MUST have a path in the Evidence–Provenance DAG (EPV‑DAG) to concrete **SymbolCarrier** nodes and to the **external** `TransformerRole` that produced or interpreted the evidence.                                | Stops “weightless claims” and self‑justifying text.        |
| **CC‑A10.2 (SCR)**                      | Any `Γ_epist^synth` operation SHALL output an **SCR** listing all symbol carriers materially used in the aggregate `U.Episteme`.                                                                                                        | Prevents source loss during aggregation.                   |
| **CC‑A10.3 (RSCR)**                     | Any `Γ_epist^compile` operation SHALL output an **RSCR** adapted to the target bounded context (vocabularies, units) with publication‑grade identifiers/hashes; SCR→RSCR MUST preserve carrier identity/integrity.                      | Keeps releases auditable and context‑consistent.           |
| **CC‑A10.4 (Resolution)**               | Every provenance/evidence node in the dependency graph MUST be resolvable to an SCR/RSCR entry. Unresolved links invalidate the claim.                                                                                                  | Eliminates dangling references and unverifiable citations. |
| **CC‑A10.5 (Scope Separation)**         | A single EPV‑DAG instance SHALL NOT mix design‑time MethodDescription nodes with run‑time Work traces. Bridges (“this run trace instantiates that spec”) MUST be explicit.                                                                     | Avoids conflating intent and execution.                    |
| **CC‑A10.6 (Externality)**              | The evidencing `TransformerRole` MUST be **external** to the holon under evaluation (A.12). Reflexive cases require modelling a meta‑holon and an external mirror.                                                                      | Prevents self‑creation/self‑evidence paradoxes.            |
| **CC‑A10.7 (Temporal Coverage)**        | For `Γ\_time` claims, interval coverage MUST be monotone and fully specified; gaps/overlaps require explicit justification or rejection.                                                                                                 | Stops invalid time‑series aggregation.                     |
| **CC‑A10.8 (Integrity & Immutability)** | SCR/RSCR entries MUST include version/date and checksums; published SCR/RSCR are immutable—updates create a new revision id with a pointer to the prior one.                                                                            | Guards against silent drift and tampering.                 |
| **CC‑A10.9 (Holarchy Firewall)**        | EPV‑DAG MUST use provenance edges only; mereological edges (`ComponentOf`, `MemberOf`, `PortionOf`, `PhaseOf`, etc.) MUST NOT appear in EPV‑DAG; conversely, provenance edges MUST NOT be used to build holarchies.                     | Keeps part‑whole and evidence semantics disjoint.          |
| **CC‑A10.10 (Γ\_sys Anchors)**          | Physical claims aggregated by `Γ_sys` MUST reference measurement models (quantity, unit, uncertainty), boundary conditions, and calibration carriers.                                                                                   | Ensures physical plausibility and comparability.           |
| **CC‑A10.11 (Γ\_method Anchors)**       | For order‑sensitive composition, design‑time MUST include a **Method Instantiation Card (MIC)** (Precedes/Choice/Join, guards, exceptions); run‑time traces MUST record `happenedBefore` and reference the MethodDescription they instantiate. | Preserves order semantics and reproducibility.             |
| **CC‑A10.12 (Γ\_work Anchors)**         | Resource spending/yield claims MUST be evidenced by instrumented carriers (meters, logs) and their MethodDescriptions; resource **rosters** MUST NOT be conflated with SCR/RSCR.                                                               | Distinguishes cost accounting from knowledge carriers.     |

**Manager’s audit (non‑normative, quick):** For any claim, ask **What carriers? Which system? Which method? When?** If any answer is missing, A.10 is not satisfied.
### Consequences

| Benefit                           | Why it matters                                                                  | Trade‑off / Mitigation                                                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Cross‑scale reproducibility**   | Any composite metric or argument can be walked back to its carriers and method. | **Overhead** of maintaining SCR/RSCR. *Mitigation:* keep entries minimal but complete; use checklists from the pedagogical companion. |
| **Design/run clarity**            | Intent (MethodDescription) is cleanly separated from execution (Work traces).          | **Discipline** needed at boundaries. *Mitigation:* MIC templates; explicit “instantiates” bridges.                                    |
| **Objective evidence**            | External `TransformerRole` eliminates self‑evidence loops.                      | **Reflexive systems** require a mirror meta‑holon. *Mitigation:* provide a “reflexive modelling” appendix with examples.              |
| **Comparable numbers over time**  | Temporal coverage invariants prevent “trend” claims built on gaps.              | **Extra dating work** for legacy data. *Mitigation:* allow provisional labels until dating is completed.                              |
| **Safe composition of knowledge** | SCR/RSCR keep sources intact as Γ\_epist composes epistemes.                    | **Initial friction** in teams new to carrier thinking. *Mitigation:* start with “top‑10 carriers per claim” rule, expand as needed.   |
| **Feeds Trust Calculus (B.3)**    | Anchors provide the inputs (R, CL, etc.) needed to score confidence.            | —                                                                                                                                     |
### Rationale (SoTA alignment, reader‑friendly)

* **Metrology & assurance.** The requirement to name quantities, units, uncertainty, calibration carriers reflects long‑standing metrology practice and modern assurance cases: numbers are only comparable when their **measurement models** are stated.
* **Knowledge provenance.** The EPV‑DAG and SCR/RSCR embody post‑2015 best practices in provenance for knowledge artefacts: keep a complete, machine‑checkable trail from claims to carriers; separate provenance from part‑whole.
* **Temporal reasoning.** Monotone coverage (no unexplained gaps/overlaps) aligns with temporal knowledge graph practice and avoids “impossible histories.”
* **Holonic parsimony.** By drawing a firewall between **mereology** (A.14) and **provenance**, A.10 prevents semantic leakage and keeps the holarchy well‑typed.
* **Role–Method–Work clarity.** Anchoring explicitly rides on A.15: **roles** act via **methods** specified at design‑time and produce **work** observed at run‑time. This keeps agency, policy, and execution disentangled yet connected.
### Relations

* **Builds on:** A.1 Holonic Foundation; A.4 Temporal Duality; **A.12 Transformer Externalization**; **A.14 Advanced Mereology**; **A.15 Role–Method–Work Alignment**.
* **Constrains / Used by:** B.1 (all Γ‑flavours: `Γ_sys`, `Γ_epist`, `Γ_method`, `Γ\_time`, `Γ_work`); B.1.1 (Dependency Graph & Proofs).
* **Enables:** **B.3 Trust Calculus** (R/CL inputs, auditability); B.4 Canonical Evolution Loop (clean design/run bridges).
### Migration (practical and brief)

Apply these text edits:

1. **Terminology**

   * `manifest` → **“Symbol Carrier Register (SCR)”**; `release manifest` → **“Release SCR (RSCR)”**.
   * `creator` / `observer` (as internal evidencer) → **`TransformerRole (external)`**.
   * “symbol register” (ambiguous) → **“Symbol Carrier Register (SCR)”**.
   * Keep **resource rosters** in `Γ_work` separate from SCR/RSCR.

3. **Boilerplate inserts**

   * In **A.10** (this pattern): retain definitions of **EPV‑DAG**, **SCR/RSCR**, and the flavour‑specific anchors.
   * In **B.1.3 (`Γ_epist`)**: add the **Obligations — SCR/RSCR** block (“`Γ_epist^synth` SHALL output SCR… `Γ_epist^compile` SHALL output RSCR…”).
   * In **B.1.5 (`Γ_method`)**: ensure **MIC** is referenced (Precedes/Choice/Join, guards, exceptions) and run‑time traces reference the **MethodDescription** they instantiate.
   * In **B.1.6 (`Γ_work`)**: say “resource rosters are not SCR/RSCR; anchor meter/log readings via EPV‑DAG.”
### A.10:End
## Ontological Parsimony (C‑5)

*“Add only what you cannot subtract.”*

### Context

The FPF kernel aspires to remain **small enough to learn in a week** yet **broad enough** to model engines, proofs and budgets alike. Unchecked growth of primitives—well‑known from earlier “enterprise ontologies”—bloats diagrams, stalls tooling and intimidates new adopters. C‑5 therefore demands *minimal‑sufficiency*: a new core concept enters the kernel **only** when all routes of composition, refinement or role‑projection fail to express it without semantic loss.
### Problem

| Pathology         | Real‑world symptom                                                                 |
| ----------------- | ---------------------------------------------------------------------------------- |
| **Concept creep** | Near‑synonyms proliferate (`U.Worker`, `U.Employee`, `U.Staff`), breaking queries. |
| **Zombie types**  | Legacy primitives linger unused yet block name space.                              |
| **Tool churn**    | Every fresh primitive forces IDE, validator and dashboard updates.                 |

Result: steep learning curves, fragile integrations, eroded trust in “first‑principles” promises.
### Forces

| Force                            | Tension                                                            |
| -------------------------------- | ------------------------------------------------------------------ |
| **Expressiveness vs Simplicity** | Fine granularity helps static checks ↔ fewer nouns aid cognition.  |
| **Inclusivity vs Purity**        | New domains want vocabulary ↔ kernel must not be a dumping ground. |
| **Evolution vs Stability**       | Framework grows ↔ users depend on a stable core.                   |
| **Prestige vs Utility**          | Authors enjoy naming things ↔ every name tcharacteristics everyone else.      |
### Solution — Four‑Gate Minimal‑Sufficiency Protocol

A proposal to add a `U.Type` or core relation **MUST** clear **all four gates** before admission and survives under a **Sunset Timer** thereafter.

| Gate                      | Test question                                                                                         | Rationale                                             |
| ------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **G‑1 Composition**       | *Can existing primitives + roles/attributes express the concept without material loss?*               | Follows “composition over creation.”                  |
| **G‑2 Non‑Redundancy**    | *Does the proposal overlap ≥ 80 % with anything already live?*                                        | Blocks synonyms.                                      |
| **G‑3 Functional Naming** | *Does the chosen name state **what the thing does**, not what it *is made of*?*                       | Prevents vague catch‑alls; supports didactic clarity. |
| **G‑4 Sharp Boundary**    | *Is there a one‑sentence litmus test that unambiguously includes or excludes any candidate instance?* | Ensures crisp taxonomy edges.                         |

**Lifecycle — Sunset Timer**
A cleared type enters the kernel **provisionally** with a timer (default = 4 quarters). If usage count remains zero at expiry, the type faces *Sunset Review*: delete, demote to Extention Pattern, or renew with fresh evidence.

> *Manager’s mnemonic:* **“Compose, Unique, Functional, Crisp — or sunset.”**
### Archetypal Grounding

| Gate    | **Rejected candidate** (why)                                                                                                                                                                               | **Accepted approach**           |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| **G‑1** | `U.CoolantPump` – expressible as `U.System:Pump` + `CoolingCirculatorRole`.                                                                                                                                | Composition via Role.           |
| **G‑2** | `U.Actuator` vs existing `U.Transformer` (90 % overlap).                                                                                                                                                   | Retain broader `U.Transformer`. |
| **G‑3** | `U.MiscellaneousObject` – name signals no function.                                                                                                                                                        | Reject; unclear purpose.        |
| **G‑4** | `U.SmallPart` – boundary depends on subjective size.                                                                                                                                                       | Reject; fails crisp test.       |
| —       | **`U.ProvenanceChain`** – required to record immutable evidence lineage; cannot be composed; functionally named; crisp membership rule (*“ordered list of Evidence Graph Ref with forward integrity hash”*). | Accepted, timer started.        |
### Conformance Checklist

| ID          | Requirement                                                                                                                                               | Didactic aim                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **CC‑OP 1** | A *Minimal‑Sufficiency Form* (≤ 1 page) **MUST** accompany every new kernel‑type proposal, documenting answers to Gates G‑1…G‑4 and a draft Sunset‑Timer. | Forces authors to think compositionally before adding nouns. |
| **CC‑OP 2** | Kernel inventory tooling **SHALL** stamp each admitted type with `sunset_due: <date>` (default = +4 quarters).                                            | Schedules later pruning; no forgotten zombies.               |
| **CC‑OP 3** | A quarterly *Usage Scan* **MUST** flag any core type with reference‑count = 0; flagged items enter Sunset Review automatically.                           | Turns parsimony into a living maintenance loop.              |
| **CC‑OP 4** | Renaming, aliasing, or splitting an existing type **REQUIRES** re‑passing all four gates and documenting a migration note.                                | Prevents redundancy re‑entering via back door.               |
| **CC‑OP 5** | Patterns **SHOULD** favour `Role` + attributes over proposing new domain types; proposals rejected when Gate G‑1 answer is “yes.”          | Extends parsimony culture beyond the kernel.                 |
### Consequences

| Benefit                            | Impact for engineer‑managers                                                   | Trade‑off / Mitigation                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| **Lean kernel**                    | Fewer primitives → faster onboarding & clearer mental map.                     | Initial author effort to fill Minimal‑Sufficiency Form; template wizard auto‑fills 70 %. |
| **Reduced tool churn**             | Stable set of nouns keeps dashboards, linters, reasoners in sync for years.    | Occasionally slows acceptance of niche concepts; Extention Patterns layer absorbs urgency.          |
| **Automatic house‑cleaning**       | Sunset cycle prevents accrual of deadwood.                                     | Rare risk of deleting a sleeper hit; renewal path allows appeal.                         |
| **Encultured composition mindset** | Teams default to roles & attributes, boosting reuse and cross‑domain dialogue. | Requires role libraries and attribute taxonomies; provided in Part C.                    |
### Rationale

**Cognitive science** shows working memory tops out around 4 ± 1 unfamiliar chunks (Cowan 2021). Combining that with Gate discipline keeps kernel size tractable (≈ 40 primitives). **Software metrics** from lean DSLs (Rust traits, Kubernetes CRDs) reveal that compositional modelling reduces change propagation cost by \~30 %. The Sunset Timer borrows from Kubernetes feature gate “alpha/beta/GA” progression model — proved effective at pruning half‑baked APIs.
### Relations

| Relation          | Pattern                 | Interaction                                               |
| ----------------- | ----------------------- | --------------------------------------------------------- |
| **Builds on**     | A 8 Universal Core      | A candidate must already pass the Three‑Domain Test.      |
| **Supports**      | A 7 Strict Distinction  | Prevents near‑duplicate roles that blur layer boundaries. |
| **Feeds**         | B 5 Kernel Change‑Log   | Records admissions, renames, sunsets.                     |
| **Complementary** | A 10 Evidence Graph Referring | Proposals cite evidence of irreducibility.                |
### Illustrative Uses (2022 – 2025)

* **Robotics CAL 2023** – `U.LiDARSensor` rejected (Gate G‑1 passed via role composition), saving three schema migrations.
* **Green‑Finance CAL 2024** – `U.CarbonCredit` admitted provisionally, but Sunset Review (usage = 0) demoted it to sector pattern, avoiding kernel noise.
* **Neuro‑informatics 2025** – `U.ProvenanceChain` accepted; by Q3 its heavy reuse in three patterns lifted timer and marked it *established*.
### Open Questions

1. **Hard size cap** — should the kernel enforce an absolute limit (e.g., 64 live types) beyond which any new entry forces retirement of an old one?
2. **Semantic similarity tooling** — can embedding models automate Gate G‑2 overlap detection reliably across domains?
3. **Gate calibration** — is default Sunset Timer (4 quarters) optimal for research‑oriented patterns with slower uptake?
### A.11:End
## External Transformer & Reflexive Split

### Intent & Context

The principle of causality is the bedrock of engineering and scientific reasoning: every change has a cause. In FPF, this translates to a strict architectural rule: **no "self-magic."** An action cannot happen without an actor. This pattern establishes the formal mechanism for modeling causality, ensuring that every transformation is attributed to an explicit, external agent.

This pattern operationalizes the **Agent Externalization Principle (C-2)**. It builds directly upon:
*   **A.3 (Transformer Constitution):** Which defines the core quartet of action: the `Agent` (who acts), the `MethodDescription` (the recipe), the `Method` (the capability), and the `Work` (the event).
*   **A.2 (Contextual Role Assignment):** Which provides the universal syntax `Holder#Role:Context` for defining agents.

The intent of this pattern is twofold:
1.  To mandate that every transformation is modeled as an interaction between a distinct **Agent** (playing a `TransformerRole`) and a distinct **Target** across a defined **Boundary**.
2.  To provide a rigorous pattern, the **Reflexive Split**, for modeling systems that appear to act upon themselves (e.g., self-calibration, self-repair) without violating the principle of external causality.
### Problem

Without a strict rule of agent externalization, models become ambiguous and untraceable, leading to critical failures in design and audit:

1.  **Causality Collapse ("Self-Magic"):** Phrases like "the system configures itself" or "the document updates itself" create a causal black hole. It becomes impossible to answer the question, "What *caused* this change?" This makes debugging, root cause analysis, and assigning responsibility impossible.
2.  **Audit Dead-Ends:** An auditor tracing a change finds that the system is its own justification. There is no external evidence, no log from an independent actor, and therefore, no way to verify the integrity of the transformation. This is a direct violation of **Evidence Graph Referring (A.10)**.
3.  **Hidden Dependencies:** In a "self-healing" system, the healing mechanism (the regulator) and the operational part (the regulated) are modeled as a single monolithic block. This hides the critical internal dependency between them. A failure in the regulator might go unnoticed until the entire system collapses, because its role was never made explicit.
### Forces

| Force | Tension |
| :--- | :--- |
| **Causal Clarity vs. Modeling Simplicity** | The need to explicitly model every cause-and-effect link vs. the desire to keep diagrams simple by representing self-regulating systems as single blocks. |
| **Objectivity vs. Internal States** | The need for an external, objective observer/actor to ground all claims vs. the reality that many systems have internal feedback loops that control their own state. |
| **Accountability vs. Automation** | In fully automated systems, it can be tempting to say "the system did it," but for assurance and safety, we must always be able to trace an action back to a specific, responsible component. |
### A.12:4. Solution

The solution is a two-part architectural mandate: **(1)** all transformations must be modeled with an external agent, and **(2)** apparent self-transformation must be modeled using the **Reflexive Split**.
### The Principle of the External Transformer

Every transformation in FPF is a `U.Work` event that is the result of an **Agent** acting upon a **Target**.

*   **The Agent:** The agent is a **Contextual Role Assignment** of the form `System#TransformerRole:Context`. This is the cause, the "doer."
*   **The Target:** The target is the `U.Holon` being changed. This can be another `U.System` or the **symbol carrier** of a `U.Episteme`.
*   **The Boundary:** The agent and the target are always separated by a `U.Boundary` and interact through a `U.Interaction`.

**Crucial Rule:** The `holder` of the Agent's `U.RoleAssignment` **cannot** be the same holon instance as the Target.
> `holder(Agent) ≠ Target`

This simple inequality is the core of the externalization principle. It constitutionally forbids self-magic.

#### Reflexivity vs cross‑reference (normative note)

FPF distinguishes **reflexive transformation** from **episteme‑level reference**.  
*Reflexive* cases (e.g., “self‑calibration”) MUST be modeled by the **Reflexive Split** (Regulator→Regulated) and remain within the **world** ReferencePlane.  
When a claim **refers to** another claim/episteme, model it with **epistemeAbout(x,y)** and set **ReferencePlane(x)=episteme**. Such references **do not perform transformations** and **MUST NOT** be used to bypass the external‑agent rule. Evaluation of chains of episteme‑about relations MUST remain **acyclic within a single evaluation chain**; otherwise, abstain and request a split or external evidence.
### The Reflexive Split Pattern

So, how do we model a system that *does* act on itself, like a self-calibrating sensor? We use the **Reflexive Split**. We recognize that the system is not a monolith; it contains at least two distinct functional parts.

**The Procedure:**

1.  **Identify the Roles:** Decompose the system's function into two distinct roles: the part that *regulates* and the part that *is regulated*.
2.  **Model as Two Holons:** Model these two parts as two distinct (though possibly tightly coupled) `U.System` holons, even if they share the same physical casing.
3.  **Define the Internal Boundary:** Model the interface between them as an internal `U.Boundary` with a defined `U.Interaction` (e.g., a data bus, a mechanical linkage).
4.  **Assign the Transformer Role:** The regulating part becomes the `holder` of the `TransformerRole`. The regulated part becomes the `Target`.

Now, the "self-action" is modeled as a standard, external transformation that just happens to occur *inside* the larger system's boundary. Causality is restored, and the model becomes auditable.

**Didactic Note for Engineers & Managers: The "Two Hats" Analogy**

Think of the Reflexive Split like a manager who needs to review their own work. To do it properly, they must metaphorically wear "two hats."
*   **Hat 1: The Doer.** They perform the task.
*   **Hat 2: The Reviewer.** They step back, put on their "reviewer hat," and inspect the work *as if* it were done by someone else.

The Reflexive Split formalizes this. The "Doer" is the **Regulated** subsystem. The "Reviewer" is the **Regulator** subsystem, which plays the `TransformerRole`. By modeling them as two separate entities, we make the internal quality control loop explicit and prevent the logical error of a system magically grading its own homework.
### Archetypal Grounding

The principle of external causality and the Reflexive Split pattern are universal. They apply equally to physical systems, epistemic artifacts, and socio-technical organizations.

| Scenario | Naive Description ("Self-Magic") | FPF Model with Reflexive Split | `Agent` & `Target` |
| :--- | :--- | :--- | :--- |
| **System Archetype** | "The robot calibrates itself." | The robot is modeled as a composite holon containing two subsystems: <br> 1. **`CalibrationController`** (`U.System`) <br> 2. **`SensorSuite`** (`U.System`) <br> They interact across an internal data bus (`U.Boundary`). | **Agent:** `CalibrationController#TransformerRole:RobotInternals` <br> **Target:** `SensorSuite` |
| **Episteme Archetype** | "The document automatically updates its cross-references." | The "document" is a system comprising: <br> 1. **`UpdateScript`** (a `U.System` that executes code) <br> 2. **`DocumentFile.xml`** (a `U.System` acting as a symbol carrier) <br> They interact via the file system (`U.Boundary`). | **Agent:** `UpdateScript#TransformerRole:DocumentSystem` <br> **Target:** `DocumentFile.xml` (the carrier of the `U.Episteme`) |
| **Socio-Technical Archetype** | "The team reviews its own performance." | The team is modeled as a collective `U.System` that enacts two roles at different times: <br> 1. **`ExecutionTeam`** (doing the sprint work) <br> 2. **`ReviewTeam`** (conducting the retrospective) <br> The "boundary" is the formal separation created by the retrospective ceremony. | **Agent:** `Team#ReviewerRole:RetrospectiveContext` <br> **Target:** The `U.Work` logs and artifacts produced by the `Team#ExecutionRole`. |

**Key takeaway from grounding:**
These examples demonstrate that there is *no such thing as self-action* in a well-formed model. Every action, even an internal one, can and must be decomposed into an external interaction between a distinct agent and a distinct target. This makes the causal chain explicit and auditable in all domains.
### Conformance Checklist

To enforce the principles of externalization and causal clarity, all FPF models must adhere to the following normative checks.

| ID | Requirement (Normative Predicate) | Purpose / Rationale |
| :--- | :--- | :--- |
| **CC-A12.1 (External Agent Mandate)** | Every transformation (`U.Work`) **MUST** be attributed to an Agent (`U.RoleAssignment`) whose `holder` is distinct from the target holon. | This is the core rule that forbids self-magic. It ensures every action has an identifiable, external cause. |
| **CC-A12.2 (Reflexive Split for Self-Action)** | Any narrative of "self-modification" (e.g., self-repair, self-configuration) **MUST** be modeled using the Reflexive Split pattern. | Forces the modeler to make internal control loops explicit by identifying the distinct `Regulator` (Agent) and `Regulated` (Target) subsystems. |
| **CC-A12.3 (Boundary Explicitness)** | The `U.Boundary` and `U.Interaction` between the Agent and the Target **MUST** be explicitly modeled. | Makes interfaces a first-class citizen of the model. Prevents hidden dependencies and ensures interactions are auditable. |
| **CC-A12.4 (Episteme Carrier as Target)** | When a `U.Episteme` is modified, the `Target` of the transformation **MUST** be its **symbol carrier** (`U.System`), not the `U.Episteme` itself. | Reinforces **Strict Distinction (A.7)**. Knowledge doesn't change by magic; a physical agent must act on its physical representation. |
| **CC-A12.5 (No Self-Evidence)** | The Agent that performs a transformation **cannot** be the sole source of evidence for the success or properties of that transformation. Evidence **MUST** be anchored via an independent `Observer`. | Prevents conflicts of interest in assurance. The `Transformer` does the work; a separate `Observer` (another RoleAssignment) validates it. This aligns with **A.10 (Evidence Graph Referring)**. |
### Consequences

| Benefits | Trade-offs / Mitigations |
| :--- | :--- |
| **Causal Traceability & Auditability:** Every change is linked to a specific agent and interaction, creating a complete and unambiguous audit trail. This is essential for root cause analysis and accountability. | **Increased Model Granularity:** The Reflexive Split requires creating more model elements than a simple monolithic block. *Mitigation:* This is not a bug, but a feature. The "extra" elements represent real, critical parts of the system's architecture that were previously hidden. FPF tooling can help manage this via views that can "collapse" a split system for high-level diagrams. |
| **Architectural Honesty:** The pattern forces designers to be explicit about internal control loops, interfaces, and dependencies, leading to more robust and well-understood system architectures. | **Requires a Shift in Thinking:** Modelers accustomed to "self-x" narratives must learn to think in terms of external interactions. *Mitigation:* The "Two Hats" analogy and clear archetypes (Section 5) serve as powerful didactic tools to facilitate this shift. |
| **Enables True Modularity:** By making interfaces explicit, the pattern supports modular design. A `Regulator` subsystem could potentially be swapped out for a different one as long as it respects the same `U.Interaction` Standard. | - |
| **Unlocks Deeper Analysis:** Once an internal control loop is made explicit, it can be formally analyzed for stability, performance, and failure modes using tools like the Supervisor-Subsystem Feedback Loop pattern (B.2.5). | - |
### Rationale

The principle of externalization is not an arbitrary rule imposed by FPF; it is a distillation of foundational concepts from multiple rigorous disciplines.

*   **Cybernetics & Control Theory:** As Ashby's Law of Requisite Variety and modern control theory (e.g., Matni et al., 2024) demonstrate, regulation is fundamentally an **interaction across a boundary** between a controller and a plant. Conflating the two hides the causal structure and makes stability analysis impossible. The Reflexive Split is the FPF's implementation of this core cybernetic principle.
*   **Physics (Constructor Theory):** As discussed in A.3, Constructor Theory recasts physics in terms of what transformations are possible. A transformation is always performed by a "constructor" (our `Transformer`) on a substrate. The theory does not contain "self-constructing" substrates. FPF's externalist stance is fully aligned with this physical worldview.
*   **Philosophy of Science (Objectivity):** The scientific method is built on the principle of external observation and verification. A theory cannot validate itself; its predictions must be checked by an independent experiment. The `No Self-Evidence` rule (CC-A12.5) is the direct implementation of this principle in the FPF's assurance calculus.
*   **Software Engineering (Dependency Inversion):** The principle that high-level modules should not depend on low-level modules, but both should depend on abstractions, is a form of externalization. It enforces clean separation and makes systems more modular and testable. The explicit `U.Boundary` in our pattern serves the same architectural purpose as a well-defined interface in software.

By mandating externalization, FPF is not adding bureaucratic overhead. It is enforcing a set of first principles that are demonstrably essential for building complex systems that are understandable, auditable, and trustworthy.
### Relations

*   **Directly Implements:** `C-2 Agent Externalization Principle`.
*   **Builds Upon:**
    *   `A.1 Holonic Foundation`: Provides the `U.System` and `U.Episteme` holons that act as agents and targets.
    *   `A.2 Role Taxonomy`: Provides the Contextual Role Assignment (`U.RoleAssignment`) mechanism to define the Agent.
    *   `A.3 Transformer Constitution`: Defines the `TransformerRole` that the Agent plays.
*   **Enables and Constrains:**
    *   `A.10 Evidence Graph Referring`: Provides the causal structure (who did what) that evidence must be anchored to.
    *   `B.2 Meta-Holon Transition (MHT)`: A Reflexive Split is often the first step in identifying an emergent supervisory layer that may later be promoted to a new meta-holon.
    *   `B.2.5 Supervisor-Subsystem Feedback Loop`: This pattern provides the detailed architecture for the `Regulator-Regulated` interaction that the Reflexive Split reveals.
### A.12:End
## The Agential Role & Agency Spectrum

> *“Agency is not a kind of thing; it is a way some systems operate.”*

### Intent & Context

The concept of "agency"—the capacity of an entity to act purposefully—is central to engineering, biology, and AI, yet it remains one of the most overloaded and ambiguous terms. Without a precise, falsifiable, and substrate-neutral definition, models of autonomous systems risk descending into "self-magic," where actions have no clear cause and accountability is lost.

This pattern builds directly upon the foundations laid in the FPF Kernel to provide that definition. A.1 established that only a **`U.System`** can be the bearer (`holder`) of behavioral roles.  A.2.1 defined the universal `U.RoleAssignment` (`Holder#Role:Context`) as the canonical way to assign roles. A.3 and A.12 defined the `TransformerRole` and the principle of the external agent.

The intent of this pattern is to:
1.  Formally define **agency** not as an intrinsic *type* of holon, but as a **contextual Role Assignment**.
2.  Introduce a measurable, multi-dimensional **spectrum of agency** via a dedicated Characterization (`Agency-CHR`), moving beyond a simple binary "agent/not-agent" switch.
3.  Provide a clear, **didactic grading system** that allows engineers and managers to assess and communicate the level of autonomy of any system in a consistent, evidence-backed manner.
### Problem

If agency is treated as a monolithic, intrinsic property or a mere label, four critical failure modes emerge, undermining the rigor of FPF:

1.  **Episteme-as-Actor:** Models might incorrectly assign agency to knowledge artifacts (`U.Episteme`), leading to nonsensical claims like "the specification decided to update the system." This is a direct violation of **Strict Distinction (A.7)**.
2.  **Type Inflation:** Introducing a `U.Agent` as a new base type alongside `U.System` and `U.Episteme` would violate **Ontological Parsimony (C-5)** and create conflicts with the dynamic nature of roles. A system might act as an agent in one context and a passive component in another; a static type cannot capture this.
3.  **Unfalsifiable Claims:** Without a measurable basis, "agency" becomes a subjective label. A team might call their system an "agent" for marketing purposes, but this claim has no verifiable meaning and cannot be audited, violating **Evidence Graph Referring (A.10)**.
4.  **The Binary Trap:** A simple "agent/not-agent" classification is too coarse. It fails to distinguish between a simple thermostat, a predictive cruise control system, and a strategic, self-learning robotic swarm, even though their cognitive capabilities differ by orders of magnitude.
### Forces

| Force | Tension |
| :--- | :--- |
| **Scientific Fidelity vs. Simplicity** | Contemporary science (e.g., Active Inference) models agency as a continuous, scale-free spectrum. FPF needs to honor this rigor while providing a simple, teachable model for practitioners. |
| **Role vs. Type** | The intuition is to think of an "Agent" as a *type* of thing. FPF's architecture demands that it be modeled as a *role* to preserve dynamism and ontological hygiene. |
| **Measurement vs. Label** | Engineers and managers need a quick, intuitive label (e.g., "this is a Level 3 agent"), while formal assurance requires a detailed, multi-dimensional, evidence-backed measurement. |
| **System-only Action vs. Collective Action**| How does agency apply to groups like teams or swarms? This requires a clear link to the rule from A.1 that any *acting group* must be modeled as a `U.System`. |
### Solution

FPF's solution is threefold: it defines an Agent via `U.RoleAssignment` (A.2.1), makes agency measurable with a dedicated Characterization, and provides a didactic summary via a graded scale.

#### The Core Definition: Agent as a Contextual Role Assignment

An **"Agent"** in FPF is not a fundamental type. It is a convenience term (a Register 1 / Register 2 label) for a specific kind of **Contextual Role Assignment (`U.RoleAssignment`)**:

> `Agent ≍ U.RoleAssignment(holder: U.System, role: U.AgentialRole, context: U.BoundedContext)`

This means an Agent is simply a **`U.System`** that is currently playing an **`AgentialRole`** within a specific **`U.BoundedContext`**.

*   **No `U.Agent` Type:** To be clear, there is **no `U.Agent` base type** in the FPF Kernel. This avoids type inflation and preserves the dynamic nature of roles.
*   **Epistemes Cannot Be Agents:** As the `holder` must be a `U.System`, this definition constitutionally forbids `U.Episteme`s from being agents, preventing the "episteme-as-actor" category error.
*   **Canonical Syntax:** The technical notation for an agent is `System#AgentialRole:Context`.
#### The AgentialRole and its Specializations

*   **`U.AgentialRole`:** This is the abstract `U.Role` that grants a `U.System` the capacity for goal-directed action within a context. It is the "license to act."
*   **Specialized Roles:** More specific behavioral roles like `TransformerRole` and `ObserverRole` are considered **specializations or sub-roles** of `AgentialRole`. They describe *what kind* of agential action is being performed at a given moment.
    *   A system playing `TransformerRole` is an Agent *that is currently modifying another holon*.
    *   A system playing `ObserverRole` is an Agent *that is currently gathering information*.
    This creates a clean hierarchy: a `Transformer` is always an `Agent`, but an `Agent` is not always a `Transformer` (it could be observing, planning, or idle).
#### Measuring Agency: The Agency-CHR and the Spectrum

Agency is not a binary switch; it is a multi-dimensional spectrum of capabilities. FPF models this using a dedicated pattern, **`Agency-CHR` (C.9)**, which is a **Characterization** that attaches a set of measurable properties to a `U.RoleAssignment`.

The `Agency-CHR` profile is grounded in contemporary research (e.g., Active Inference, Basal Cognition) and includes the following key characteristics. Each is measured for a specific agent in a specific context and must be backed by evidence (A.10).

1.  **Boundary Maintenance Capacity (BMC):** The ability of the system to maintain its structural and functional integrity against perturbations. *(How robust is it?)*
2.  **Predictive Horizon (PH):** The temporal or causal depth of the agent's internal model. *(How far ahead can it "see"?)*
3.  **Model Plasticity (MP):** The rate at which the agent can update its internal model (`U.GenerativeModel`) in response to prediction errors (`U.Error`). *(How quickly can it learn?)*
4.  **Policy Enactment Reliability (PER):** The probability that the agent will successfully execute its chosen `U.Method` under operational conditions. *(How reliably does it do what it decides to do?)*
5.  **Objective Complexity (OC):** A measure of the complexity of the `U.Objective` the agent can pursue, from simple set-points to abstract, multi-scale goals.

##### Context-bounded task-family specialization claims

When work shifts to a new `TaskFamily`, describe the holder as acquiring **context-bounded task-family specialization** rather than as becoming more generally intelligent in the abstract. The same holder may carry different task-family specializations across different task families without becoming a new kernel type. Breadth across unrelated task families is not the governed claim here; the governed claim is **time-to-usable specialization** on the declared task family and work target under a named work-measure threshold, adaptation budget, and freshness or provenance basis.

Low-human-overlap or newly discovered task families remain admissible when the task family, evidence basis, and reuse window are explicit by value.
#### The Agency Grade (Didactic Layer)

While the multi-dimensional `Agency-CHR` profile is essential for formal assurance, engineers and managers need a simpler, at-a-glance summary. The **Agency Grade** is a **non-normative, didactic** scale from 0 to 4 that synthesizes the CHR profile into an intuitive level of autonomy.

| Grade | Label | Typical `Agency-CHR` Profile (Conservative Lower Bound) | Archetypal Example |
| :--- | :--- | :--- | :--- |
| **0** | **Non-Agential** | `BMC ≈ 0`, `PH ≈ 0`, `MP ≈ 0` | A rock, a document, a passive structural component. |
| **1** | **Reactive** | `BMC > 0`, `PH ≈ 0`, `MP ≈ 0` | A thermostat; a simple feedback controller. Follows fixed rules. |
| **2** | **Predictive** | `BMC > 0`, `PH > 0`, `MP ≈ 0` | A model-predictive controller with a fixed model; a chess engine that plans moves but doesn't learn new strategies. |
| **3** | **Adaptive** | `BMC > 0`, `PH > 0`, `MP > 0` | A self-calibrating sensor system; a machine learning agent that updates its model with new data. |
| **4** | **Reflective/Strategic** | High `BMC`, `PH`, `MP`, `PER`, and `OC`. Capable of meta-cognition (reasoning about its own reasoning) and pursuing abstract goals. | An autonomous R&D system; a cohesive, self-organizing DevOps team. |

**Crucial Distinction:** The `Agency-CHR` profile is the **normative evidence**. The Grade is a **pedagogical shortcut**. An artifact cannot claim a grade without having a corresponding, auditable CHR profile to back it up.
### Archetypal Grounding

The universal pattern of agency, defined as a `Contextual Role Assignment` and measured by the `Agency-CHR`, manifests across all domains. The following table demonstrates its application to the FPF's two primary archetypes: a `U.System` and a collective `U.System` (a team), while explicitly showing why a `U.Episteme` cannot be an agent.

| Archetype | Holder (`U.System`) | Role & Context (`#Role:Context`) | `Agency-CHR` Profile Sketch | Resulting Agency Grade |
| :--- | :--- | :--- | :--- | :--- |
| **Simple Controller** | `Thermostat_Model_T800` | `#AgentialRole:HomeHeatingSystem` | `BMC`: High (maintains temp). <br> `PH`: Zero (no prediction). <br> `MP`: Zero (fixed logic). <br> `PER`: Very High. <br> `OC`: Low (single set-point). | **Grade 1 (Reactive)** |
| **Advanced Controller** | `PredictiveCruiseControl_v3` | `#AgentialRole:VehicleDynamics` | `BMC`: High. <br> `PH`: High (predicts traffic flow). <br> `MP`: Zero (fixed model). <br> `PER`: High. <br> `OC`: Medium (optimization). | **Grade 2 (Predictive)** |
| **Learning System** | `SelfCalibratingSensorArray` | `#AgentialRole:IndustrialProcess` | `BMC`: High. <br> `PH`: High. <br> `MP`: Medium (learns drift). <br> `PER`: High. <br> `OC`: Medium. | **Grade 3 (Adaptive)** |
| **Collective Agent** | `DevOpsTeam_Phoenix` (a collective `U.System`) | `#AgentialRole:ProjectPhoenix` | `BMC`: High (maintains velocity). <br> `PH`: High (sprint planning). <br> `MP`: High (retrospectives). <br> `PER`: Medium-High. <br> `OC`: High (abstract business goals). | **Grade 4 (Reflective/Strategic)** |
| **Knowledge Artifact** | `ISO_26262_Standard.pdf` (`U.Episteme`) | **N/A** (Cannot be a holder of an `AgentialRole`) | N/A | **Grade 0 (Non-Agential)** |

**Key takeaway from grounding:**
This table makes the abstract model concrete. It shows that the FPF agency model can precisely differentiate between simple controllers and complex learning systems. It also reinforces the **Strict Distinction** principle: the ISO standard (`U.Episteme`) is a crucial **justification (`justification?`)** for the actions of an agent (like the DevOps team), but it is never an agent itself.
### Conformance Checklist

To ensure the agency model is applied rigorously and consistently, all FPF artifacts must adhere to the following normative checks.

| ID | Requirement (Normative Predicate) | Purpose / Rationale |
| :--- | :--- | :--- |
| **CC-A13.1 (Holder Type)** | The `holder` of a `U.RoleAssignment` with `role: U.AgentialRole` **MUST** be a `U.System`. | Prevents the "episteme-as-actor" category error. Enforces **Strict Distinction (A.7)**. |
| **CC-A13.2 (RoleAssignment Mandate)** | Any claim of agency **MUST** be represented by a complete `U.RoleAssignment` instance, including an explicit `holder`, `role`, and `context`. | Ensures that agency is always modeled as contextual and bound to a specific bearer, not as a free-floating property. |
| **CC-A13.3 (CHR Evidence)** | Any claim about an Agent's grade or level of autonomy **MUST** be substantiated by an auditable `Agency-CHR` profile with Evidence Graph Ref (A.10). | Makes claims of agency falsifiable and prevents "agency by marketing." |
| **CC-A13.4 (Grade is Didactic)**| The **Agency Grade (0-4)** **SHALL NOT** be used as a normative input for formal reasoning. It is a didactic summary of the `Agency-CHR` profile. | Prevents oversimplification in formal models. The detailed profile, not the summary grade, must be used for assurance cases. |
| **CC-A13.5 (Collective as System)** | To claim agency for a collective (e.g., a team, a swarm), the collective **MUST** first be modeled as a `U.System` with a defined `U.Boundary` and a coordination `U.Method`. | Prevents the error of assigning agency to a mere set or collection (`MemberOf`). Aligns with **A.1** and **A.14**. |
| **CC-A13.6 (MHT for Emergent Agency)** | If a collection of systems, previously non-agential or at a lower grade, develops a new supervisory structure and crosses a documented `Agency-CHR` threshold, a **Meta-Holon Transition (MHT, B.2)** **MUST** be declared. | Makes the emergence of collective agency an explicit, auditable event, preventing "magic" emergence. |
### Consequences

| Benefits | Trade-offs / Mitigations |
| :--- | :--- |
| **Category Safety & Clarity:** The pattern provides a clear, unambiguous definition of agency that prevents common modeling errors and is consistent across all of FPF. | **Increased Modeling Granularity:** Requires modelers to think in terms of Role-assignments and contexts, which is slightly more complex than just labeling something an "Agent." *Mitigation:* The `Holon#Role:Context` syntax and tooling support make this manageable in practice. |
| **Falsifiable & Measurable Agency:** By grounding agency in the `Agency-CHR`, the framework transforms a vague philosophical concept into a set of concrete, evidence-backed engineering properties. | **Measurement Effort:** Populating the `Agency-CHR` profile requires real work (testing, analysis, data gathering). *Mitigation:* The profile can be built iteratively. An initial estimate can be used, with the understanding that its `Reliability (R)` score is low until backed by evidence. |
| **Scalable Autonomy Model:** The graded scale provides a sophisticated language for describing and comparing different levels of autonomy, from simple automation to strategic intelligence. | **Risk of Misinterpreting Grades:** The simple 0-4 scale could be misused as a simplistic marketing label. *Mitigation:* The normative requirement (**CC-A13.4**) to always link a grade to its underlying CHR profile acts as a guardrail against this. |
| **Elegant Handling of Collectives:** The pattern provides a clean way to model the agency of teams, swarms, and organizations without violating ontological principles. | - |
### Rationale

This pattern's strength comes from its synthesis of contemporary, post-2015 research into a single, operational model.

*   **Grounded in Science:** The move away from a binary, type-based view of agency towards a **graded, spectrum-based model** is directly aligned with modern research in Active Inference (Friston et al.), Basal Cognition (Fields, Levin), and evolutionary cybernetics. The `Agency-CHR` provides a direct, practical implementation of these ideas.
*   **Ontologically Sound:** By defining an Agent as a **Contextual Role Assignment**, the pattern avoids the ontological pitfalls of creating a new base type. It fully embraces the FPF's core architectural principle of separating **substance (`holder`)** from **function (`role`)** within a **context**. This aligns with best practices from foundational ontologies (like UFO) and the principles of **Strict Distinction (A.7)**.
*   **Pragmatic and Actionable:** The pattern is designed for engineers and managers. The `Agency Grade` provides a quick communication tool, while the underlying `Agency-CHR` provides the detailed, auditable data needed for formal assurance and risk management. This duality satisfies both **Didactic Primacy (P-2)** and **Pragmatic Utility (P-7)**.

In essence, this pattern does not *invent* a new theory of agency. It **distills and operationalizes** the emerging scientific consensus, packaging it into a rigorous, falsifiable, and practical tool for the FPF ecosystem.
### Relations

*   **Builds on:**
    *   `A.1 Holonic Foundation`: Establishes that only `U.System`s can be bearers of behavioral roles.
    *   `A.2 Role Taxonomy`: Provides the universal  Contextual Role Assignment (`U.RoleAssignment`) mechanism.
    *   `A.12 External Transformer`: The actions of an Agent are modeled using the external transformer principle.
*   **Coordinates with:**
    *   `B.2 Meta-Holon Transition (MHT)`: A significant jump in the `Agency-CHR` of a collective can trigger an MHT.
    *   `B.3 Trust & Assurance Calculus`: The `Agency-CHR` profile provides crucial inputs for assessing the reliability and safety of an autonomous system.
    *   `D.2 Multi-Scale Ethics Framework`: The Agency Grade is used to determine the level of moral responsibility and accountability assigned to a system.
*   **Instantiates:**
    *   The `Agency-CHR` (C.9), which provides the formal definitions for the characteristics (BMC, PH, etc.).
### A.13:End
## Advanced Mereology: Components, Portions, Aspects & Phases

### Context — why an advanced mereology?

FPF’s holonic modelling relies on **part–whole** relations to build *structural* and *conceptual* holarchies (systems and epistemes). But `U.Holon` is **not** synonymous with “mereological whole”: some holons (notably **Roles** and **Methods**) are bounded identity‑bearing objects whose primary composition is handled by other algebras (A.2 role algebra; A.15 method/description graphs), not by `partOf`. Early drafts distinguished structural vs. conceptual parthood (e.g., **ComponentOf**, **ConstituentOf**) but practical modelling kept hitting two recurrent gaps:

1. **Quantities vs. parts.** Engineers routinely need “some of the fuel”, “the first 10 pages”, “a 30% subset of data”. This is not a component; it is a **portion** of a stuff‑like whole, governed by measures and conservation.

2. **Change vs. replacement.** Authors need to say “the prototype **before calibration**”, “v2 of the spec”, “shift 1 vs. shift 2 of the same run”. That is not a new whole; it is a **phase** of the same carrier across time.

This section introduces two **normative** sub‑relations of `partOf` that close those gaps and lock them to the rest of the kernel:

* **PortionOf** — metrical, measure‑preserving parthood of stuffs and other measurables.
* **PhaseOf** — temporal parthood of the *same* carrier across an interval.

It also restates guard‑rails that keep **Roles** and **Methods** (as intensional masks/ways‑of‑doing) outside mereology (A.15), while allowing their **describing epistemes** (e.g., `U.MethodDescription`, `U.WorkPlan`) to use ordinary episteme parthood and versioning like any other `U.Episteme`. It also clarifies how **MemberOf** fits (preview: **collections** are grounded constructively in **C.13 Compose‑CAL** via `Γ_m.set`; collective agency/composition is handled outside A.14 via **B.1.7 Γ_collective** and **A.15**, not via `partOf`).

**Publication note (Working‑Model first).** Read A.14 together with **E.14 Human‑Centric Working‑Model** and **B.3.5 CT2R‑LOG**: publish relations on the **Working‑Model** surface; when assurance is sought, **ground downward**. For structural claims that require extensional identity, use the **Constructive** shoulder via **Compose‑CAL Γ_m (sum | set | slice)**; order/time stay outside mereology (Γ_time / Γ_method).
### Problem — what breaks without these distinctions?

If we only have “generic partOf” (plus Component/Constituent), four classes of errors appear:

1. **Conservation errors.** Treating “20 L of fuel from Tank A” as a component leads to nonsense: adding and removing such “components” does not respect quantities; Γ\_sys proofs violate Σ‑balance.

2. **Temporal smearing.** Flattening “before/after”, or “v1/v2” into one timeless whole collapses history; Γ\_time and Γ\_method cannot justify order‑sensitive properties; audits cannot reproduce conditions.

3. **Identity confusion.** Modelling “new version” as “new component” either breaks identity (it is still the *same* holon evolving) or hides a **Meta‑Holon Transition** when identity really changes.

4. **Role leakage.** Functional/organisational roles sneak into part trees (“the PumpRole is part of the plant”), violating A.15 and making structural reasoning brittle.
### Forces

| Force                              | Tension                                                                                                         |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Expressiveness vs. Parsimony**   | We need new relations (Portion, Phase) ↔ we must keep the catalogue minimal and orthogonal.                     |
| **Universality vs. Domain nuance** | One set of rules must serve physical systems and epistemes ↔ measurement and time behave differently by domain. |
| **Identity vs. Change**            | Preserve “the same carrier through change” ↔ allow explicit re‑identification when invariants fail.             |
| **Static structure vs. Histories** | Part trees should be simple ↔ real work requires phased histories and measured slices.                          |
### Solution — extend the mereology catalogue, keep it clean

**A.14 defines two additional sub‑relations of `partOf`** and **re‑affirms the firewall** between mereology and the role/recipe layer:

1. **PortionOf** — for *measured* parts of a whole (stuffs and other extensives).
2. **PhaseOf** — for *temporal* parts of the same carrier.
3. **No Roles/Methods in mereology.** `U.Role` and `U.Method` are **never** parts (A.15). A `U.MethodDescription` is an **Episteme** and may be versioned/structured; that does not make the described `U.Method` a part.
4. **MemberOf stays, but constructive aggregation and agency live elsewhere.** `MemberOf` remains available to state collections and collectives; a **collection‑as‑whole** may be constructed via `Γ_m.set` (Compose‑CAL, C.13), while **collective agency/composition** is handled in **B.1.7 Γ_collective** and **A.15** (not in A.14).

The classical pair **ComponentOf** (structural, discrete) and **ConstituentOf** (conceptual, logical/epistemic) remain as in the kernel; A.14 only clarifies **how to tell them apart from Portion/Phase** (§ 6).
### Formal cores (normative semantics)

#### PortionOf — metrical part of a measurable whole

**Intent.** Capture “some of the same stuff/extent”, governed by a measure that adds up.

**Applicability.** Any `U.Holon` that carries an **extensive** measure μ on the chosen scope
(examples: mass, volume, length‑of‑text, byte size, wall‑time budget).

**Primitive.** `PortionOf(x, y)` means: *x is the same kind of stuff/content as y, but less*.

**Axioms (A14‑POR‑\*)**

* **POR‑1 (Partial order).** PortionOf is reflexive, antisymmetric, transitive on its domain.
* **POR‑2 (Metrical dominance).** If `x ProperPortionOf y` then `0 < μ(x) < μ(y)` for the agreed μ.
* **POR‑3 (Additivity on disjoint portions).** If `x ⟂ y` (no overlap) and both PortionOf y, then `μ(x ⊔ y) = μ(x)+μ(y)` and `x ⊔ y PortionOf y`.
* **POR‑4 (Kind integrity).** x and y must share the same **measure kind** and **unit** (or a declared conversion).
* **POR‑5 (Boundary compatibility).** For physical wholes, the whole’s boundary encloses the union of its portions; cross‑boundary “leaks” are interactions, not portions.

**Didactic tests.**
✔ “5 kg from a 20 kg billet” — PortionOf.
✔ “Pages 1–10 of the report” — PortionOf (μ = page or token count).
✘ “The pump module of the plant” — **ComponentOf**, not PortionOf.
✘ “The Methods section of the paper” — **ConstituentOf**, not PortionOf.
#### PhaseOf — temporal part of the same carrier

**Intent.** Capture “the same holon during a sub‑interval”, preserving identity through change.

**Applicability.** Any `U.Holon` that persists across time with a recognised **carrier identity**.

**Primitive.** `PhaseOf(x, y)` means: *x is y restricted to a proper time interval*.

**Axioms (A14‑PHA‑\*)**

* **PHA‑1 (Partial order).** PhaseOf is reflexive, antisymmetric, transitive (on the same carrier).
* **PHA‑2 (Coverage).** The whole is the union of its maximal, non‑overlapping phases over its lifetime interval.
* **PHA‑3 (No paradoxical overlap).** Phases of the **same carrier** do not overlap in time; overlapping variants require `PhaseOf` on *aspects* or different carriers.
* **PHA‑4 (Identity through change).** Properties may vary between phases, but the carrier’s identity criteria hold continuously (e.g., same serial number, same legal identity, same theorem statement).
* **PHA‑5 (Escalation to MHT).** If identity criteria break (e.g., metamorphosis with new objectives), **declare a Meta‑Holon Transition (B.2)** rather than a PhaseOf.

**Didactic tests.**
✔ “PumpUnit\#3 **before** calibration” — PhaseOf(Pump\#3\_pre, Pump\#3).
✔ “Spec v2” — PhaseOf(Spec\_v2, Spec), on the **MethodDescription** artefact.
✔ “Shift 1 of the same batch run” — PhaseOf(Work\_shift1, Work).
✘ “Prototype vs. production unit” — likely **different carriers**; use ComponentOf/ConstituentOf or MHT per criteria.
#### CT2R‑LOG & Compose‑CAL handshake (normative link)

* **Structural claims** published on the Working-Model surface **SHALL** be justified, when assurance is required, by a **Constructive** grounding narrative using **Γ_m.sum | Γ_m.set | Γ_m.slice** and **linked with `tv:groundedBy`** (see **B.3.5**; **C.13**).  
* **PhaseOf** is **temporal parthood**; it **SHALL NOT** be grounded via Γ\_m. Its assurance follows identity‑through‑time criteria (CC‑PHA‑1..3) and Γ\_time ordering (B.1.4).  
* **MemberOf** remains **non‑mereological** (CC‑MEM‑2). When modelling a collection‑as‑whole for assurance purposes, the constructive basis is **Γ\_m.set**; no **ComponentOf** inferences follow from **MemberOf**.
### Choosing the right relation (decision table)

| You want to say…                                             | Use                  | Why                                                                                |
| ------------------------------------------------------------ | -------------------- | ---------------------------------------------------------------------------------- |
| “This is a *piece* of the same stuff (lower amount/extent).” | **PortionOf**        | Governed by a measure μ and conservation (Σ‑additive).                             |
| “This is a *discrete part* that sits *inside* the whole.”    | **ComponentOf**      | Structural parthood; boundary‑respecting, not measured by μ.                       |
| “This is a *logical part* in a conceptual whole.”            | **ConstituentOf**    | Sections, lemmas, clauses, conceptual assembly.                                    |
| “This is the *same thing* during a *sub‑interval*.”          | **PhaseOf**          | Temporal slicing with identity continuity.                                         |
| “This *item belongs to that collection/collective*.”         | **MemberOf**         | Not a building block of the whole; set‑as‑whole via **C.13 (`Γ_m.set`)**, collective action via **B.1.7/A.15**. |
| “This system *plays a Role or position*.”          | **playsRole** (A.15) | Roles are contextual masks, never parts.                                           |

> **Firewall reminder.** If your sentence is about *who does what*, *how it is done*, or *what happened when* (role/method/run), you are likely in **A.15**. If it is about the **document/artifact as a carrier** (its pages/sections/versions), you may still be in **A.14** (Episteme mereology).
### Archetypal grounding (System / Episteme)

| Relation                       | `U.System` example                                     | `U.Episteme` example                                        |
| ------------------------------ | ------------------------------------------------------ | ----------------------------------------------------------- |
| **PortionOf**                  | 50 L from a 200 L fuel tank (μ = volume).              | Pages 1–10 from a 120‑page report (μ = page/token count).   |
| **ComponentOf**                | Impeller **ComponentOf** PumpUnit.                     | Figure 2 **ComponentOf** Poster Layout (physical artefact). |
| **ConstituentOf**              | Control law **ConstituentOf** Controller Design.       | Lemma A **ConstituentOf** Theorem Proof.                    |
| **PhaseOf**                    | PumpUnit\#3 *before*/*after* calibration (same serial). | Spec v1 → v2 (same document lineage).                       |
| MemberOf (for reference) | “is an element of a collection/collective”; use when a grouping is explicitly treated as a whole set, without implying component integration. Not a building block of the whole; **constructive aggregation** is handled in **C.13 Compose‑CAL** (`Γ_m.set`). If the grouping is expected to **act**, model a **collective system** (A.15). |
### Conformance Checklist & type guards (normative)

#### Global firewall and scope

| ID            | Requirement                                                                                 | Purpose                                                 |
| ------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **CC‑A14‑0**  | No `U.Role` or `U.Method` **MAY** occur as a node in any `partOf` chain.   | Keeps masks/ways‑of‑doing outside mereology (see A.15). |
| **CC‑A14‑0a** | `U.MethodDescription` / `U.WorkPlan` and other describing epistemes **MAY** participate in `partOf` only as `U.Episteme` nodes (e.g., `ConstituentOf`, text `PortionOf`, version `PhaseOf`); they **MUST NOT** be asserted as `ut:StructPartOf` of any `U.System`. | Allows document structure/versioning without smuggling Methods into structure. |
| **CC‑A14‑0b** | `MemberOf` **MUST NOT** imply, entail, or be auto‑rewritten into any `partOf` sub‑relation. | Separates collections/collectives from parthood.        |
| **CC‑A14‑0c** | `SerialStepOf` / `ParallelFactorOf` **MUST NOT** appear in any `partOf` chain or table in A.14; model order via **A.15** (**Γ_ctx/Γ_method**). | Prevents the “order‑as‑structure” category error.       |
#### PortionOf guards

| ID                                 | Requirement                                                                                                                                                               | Purpose                                 |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| **CC‑POR‑1 (Domain)**              | `PortionOf(x,y)` is valid only if the modelling scope declares at least one **extensive measure** μ for y (mass, volume, token count, byte size, wall‑time budget, etc.). | Prevents “portion” without a measure.   |
| **CC‑POR‑2 (Kind)**                | x and y **SHALL** share the same μ‑kind and compatible units (or an explicit conversion).                                                                                 | Prevents apples‑to‑oranges addition.    |
| **CC‑POR‑3 (Monotone additivity)** | For disjoint portions `x ⟂ z` with `PortionOf(-,y)`: μ(x ⊔ z) = μ(x)+μ(z).                                                                                                | Secures Σ‑reasoning and Γ\_sys proofs. |
| **CC‑POR‑4 (Boundary)**            | For physical systems, the whole’s boundary encloses the union of portions; cross‑boundary flows are **not** portions.                                                     | Distinguishes stock vs flow.            |
| **CC‑POR‑5 (Non‑replacement)**     | “Replacing 20% of y by v” **MUST** be modelled as **PortionOf** removal + **Component/Constituent** insertion, not as a single PortionOf rewrite.                         | Avoids silent identity change.          |
#### PhaseOf guards

| ID                                    | Requirement                                                                                                                                                      | Purpose                                |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **CC‑PHA‑1 (Carrier identity)**       | `PhaseOf(x,y)` requires an explicit **identity criterion** for y valid over the union of phases (e.g., serial number, legal identity, theorem statement).        | Prevents re‑identification by stealth. |
| **CC‑PHA‑2 (Coverage & non‑overlap)** | The lifetime of y equals the union of its maximal, non‑overlapping phases (on the same aspect).                                                                  | Enables Γ\_time composition and audit. |
| **CC‑PHA‑3 (Aspect clarity)**         | If two temporal slices of y overlap, they **MUST** be phases of **different aspects** (e.g., mechanical‑state vs software‑state), or else be different carriers. | Avoids paradoxical overlaps.           |
| **CC‑PHA‑4 (Escalation)**             | If identity criteria fail during change, declare a **Meta‑Holon Transition** (B.2) instead of PhaseOf.                                                           | Makes re‑identification explicit.      |
| **CC‑PHA‑5 (MethodDescription & Work)**      | Versions of **MethodDescription** and generic time‑slices of **Work** **SHALL** use `PhaseOf` (A.15/A.15.1); Work‑specific refinements (episodes/retries/concurrency) are modelled in A.15.1. `PhaseOf` never applies to `U.Role` or `U.Method`.                                             | Aligns temporal slicing with design/run bindings.             |
#### Anchoring & validation (normative)

| ID              | Requirement                                                                                                      | Purpose                                           |
| ----------------| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **CC‑ANCH‑1**   | Every `ut:StructPartOf` edge **MUST** carry a `tv:groundedBy` link to a valid `Γ_m` constructor trace (Compose‑CAL). | Makes A.10 executable; ensures extensional identity. |
| **CC-ANCH-2**   | For **epistemic** edges (`ut:EpiPartOf` and its sub-types), `tv:groundedBy` is **OPTIONAL**; instead supply **`ev:evidence`** and set **`validationMode ∈ {axiomatic, postulate, inferential}`**. | Harmonises evidence treatment for epistemic edges. |
| **CC‑ANCH‑3**   | The public query Standard remains `?x ut:PartOf+ ?y`; internally it is realised via CT2R‑aliases grounded by `Γ_m` traces. | Preserves the “one query” UX while tightening semantics. |

*Note.* Property names and trace semantics are defined in the CT2R‑LOG / Compose‑CAL.
#### CT2R‑LOG handshake (Working‑Model → Assurance)

| ID                 | Requirement                                                                                                                                                              | Purpose                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| **CC-A14-10**      | For **structural** edges on the Working-Model surface, authors **SHALL** set `validationMode=axiomatic` and attach **`tv:groundedBy → Γ_m.sum|set|slice`**.      | Aligns A.14 with CT2R-LOG (**B.3.5**) and Compose-CAL (**C.13**); ensures extensional identity. |
| **CC‑A14‑11**      | **PhaseOf** edges **SHALL NOT** use Γ\_m for grounding. Authors **SHALL** provide identity criteria and non‑overlap per **CC‑PHA‑1..3** and reference **Γ\_time** when ordering matters. | Keeps temporal parthood distinct from construction; preserves the plane firewall.       |
#### CT2R‑LOG handshake (Working‑Model → Assurance)

| ID                 | Requirement                                                                                                                                                              | Purpose                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| **CC-A14-10**      | For **structural** edges on the Working-Model surface, authors **SHALL** set `validationMode=axiomatic` and attach **`tv:groundedBy → Γ_m.sum|set|slice`**.      | Aligns A.14 with CT2R-LOG (**B.3.5**) and Compose-CAL (**C.13**); ensures extensional identity. |
| **CC‑A14‑11**      | **PhaseOf** edges **SHALL NOT** use Γ\_m for grounding. Authors **SHALL** provide identity criteria and non‑overlap per **CC‑PHA‑1..3** and reference **Γ\_time** when ordering matters. | Keeps temporal parthood distinct from construction; preserves the plane firewall.       |
### Validation patterns (author’s decision procedure)

**Step 0 — Firewall check.**
If your sentence is about *who does what*, *how it is done* (role/method), or *what happened when* (run/work), you are **not** in mereology; go to **A.15** (Role–Method–Work). If it is about the **carrier episteme** (pages/sections/versions of an SOP/algorithm/spec), you may still be in **A.14**.

**Step 1 — Is it measured stuff?**
If yes, pick **PortionOf**. Confirm μ is declared (CC‑POR‑1/2). Test additivity on a toy split (CC‑POR‑3). If flows cross a boundary, remodel as interactions, not portions (CC‑POR‑4).

**Step 2 — Is it a discrete inside part?**
If yes, pick **ComponentOf** (physical) or **ConstituentOf** (conceptual). Do **not** use PortionOf here.

**Step 3 — Is it the same carrier at a time slice?**
If yes, pick **PhaseOf**. Verify identity criteria and non‑overlap (CC‑PHA‑1/2/3). If criteria break, escalate to **B.2** (CC‑PHA‑4).

**Step 4 — Is it a membership statement?**
Use **MemberOf** only; avoid any part‑inferences (CC‑MEM‑2). If you need a **collection as a whole**, use **C.13** (`Γ_m.set`) for constructive grounding. If you need **collective action**, defer to **A.15**.

**Quick spot‑tests (repair kit).**

| Smell                          | Likely error                      | Fix                                                                                                                          |
| ------------------------------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| “20% of the chassis”           | Treating structure as stuff       | Use **ComponentOf**; if truly laminar material, PortionOf applies to **material stock**, not the assembled chassis.          |
| “Chapter 2 is 15% of the book” | Mixing measures and constituents  | Use **ConstituentOf**; the 15% is **length‑of‑text** as a separate statement.                                                |
| “Spec v2 overlaps v1”          | Overlapping phases on same aspect | Use `PhaseOf(Spec_v2, Spec)` with non‑overlap; represent drafting as **Work** episodes (A.15) rather than overlapping specs. |
| “Team is part of the project”  | Member vs part confusion          | Use **MemberOf(Team, ProjectCollective)**, not partOf.                                                                       |
### Interplay with Γ‑flavours (how these relations behave under aggregation)

| Γ‑flavour                    | Mereological hooks (what A.14 supplies)                                                                                                                | Key effect                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| **Γ\_sys (B.1.2)**          | Treat **PortionOf** as Σ‑additive stocks; **ComponentOf** must respect boundary integration; **PhaseOf** is not aggregated here.                       | Conserves extensive measures and keeps structural WLNK (weakest‑link) on components.          |
| **Γ\_epist (B.1.3)**         | **PortionOf** of texts/data uses μ = token/byte count; **ConstituentOf** composes arguments/sections; **PhaseOf** versions MethodDescriptions/documents.      | Preserves provenance and avoids trust inflation by keeping constituents vs portions distinct. |
| **Γ\_ctx / Γ\_time (B.1.4)** | **PhaseOf** provides the legal slicing for time; order/dependencies live in **Γ\_ctx** and method graphs (A.15/B.1.5). **PortionOf** is orthogonal (quantities inside steps/runs).                                      | Ensures chronological consistency and monotone coverage.                                      |
| **Γ\_method (B.1.5)**          | Recipes are **MethodDescription** graphs (not parthood). When a recipe refers to stuff‑like inputs, those are **PortionOf** statements on resources.          | Separates recipe composition from structure.                                                  |
| **Γ\_work (B.1.6)**          | Only **Work** carries resource deltas; when logging “consumed 5 kg from Tank A”, model it as **PortionOf** relation to the stock prior to consumption. | Makes Σ‑balance explicit; aligns with CC‑POR‑3/4.                                             |
### Consequences

**Benefits**

* **Predictable composition.** Σ‑additivity for portions and identity‑through‑time for phases make Γ‑proofs straightforward.
* **History without confusion.** Temporal slicing is explicit and audit‑ready; no paradoxical overlaps.
* **Cleaner integration with roles and recipes.** The firewall prevents “functional object” creep into structure.
* **Compatibility with engineering practice.** Mirrors *product breakdown* (components) vs *functional breakdown* (roles) vs *material stocks* (portions) vs *versioning* (phases).

**Trade‑offs / mitigations**

* **Modelling energy.** Authors must pick μ and declare units; provide a short μ‑catalog per project.
* **More relation names.** Two extra sub‑relations increase vocabulary; mitigated by the decision table (§ 6) and spot‑tests (§ 9).
* **Escalation discipline.** Deciding PhaseOf vs MHT requires judgement; A.14 provides criteria, and B.2 captures true re‑identification.
### Pedagogy aids (non‑normative)

**Two‑minute checklist for reviewers**

1. Do I see “process/workflow/policy/script” used to mean enactment? — then **A.15**. If it names a **carrier episteme** whose structure/version is being discussed, **A.14** may apply.
2. Does every PortionOf have a declared μ and unit?
3. Do phases cover a lifetime without overlap for the same aspect?
4. Are any roles/recipes appearing as parts? If yes, stop and refactor.
### Patch map (where to touch in the working file)

1. **Kernel - Holonic Mereology (§ A.1 → A.14)**
   *Add* sub‑sections “PortionOf” and “PhaseOf” with axioms (POR‑1..5, PHA‑1..5).
   *Move* MemberOf note to a minimal semantics paragraph (no composition here).

2. **A.15 (Role–Method–Work)**
   *Cross‑link* firewall (CC‑A14‑0/0b) and reinforce that versioning uses **PhaseOf** only on MethodDescription/Work.

3. **B.1.2 Γ\_sys / B.1.3 Γ\_epist / B.1.4 Γ\_ctx/Γ\_time / B.1.5 Γ\_method / B.1.6 Γ\_work**
   *Insert* a one‑line “A.14 compliance” note: which A.14 sub‑relations each flavour relies on, as in § 10.

4. **Examples & Annexes**
   *Refactor* any “percentage as part” examples into PortionOf with declared μ;
   *Split* any overlapping histories into PhaseOf sequences.

Each edited heading should carry the badge **“► decided‑by: A.14 Advanced Mereology”**.
### Rationale (state‑of‑the‑art alignment, post‑2015)

* **Metrical mereology** advances (e.g., recent work on quantity‑based parthood and additivity) motivate **PortionOf** with explicit μ and Σ‑laws, preventing the classic “stuff as components” fallacy.
* **Temporal parts & identity through change** (renewed treatments in analytic metaphysics and formal ontology) motivate **PhaseOf** with coverage/non‑overlap and escalation when identity criteria fail.
* **Engineering ontologies (BORO lineage, Core Constructional practice, ISO 15926 family)** keep a strict separation between **functional breakdowns** (our Roles) and **product breakdowns** (our Components), with **stock/consumable** modelling (our Portions) handled by quantities, not by component trees.
* **Knowledge artefact lifecycles** in contemporary MBSE and open‑science workflows use explicit versioning (our PhaseOf) and provenance‑preserving composition (our ConstituentOf).
* The net effect is a **minimal‑sufficient** catalogue: two added sub‑relations close real modelling gaps while preserving **parsimony**, **didactic clarity**, and **Γ‑compatibility** across domains.
### A.14:End
## Role–Method–Work Alignment (Contextual Enactment)

> **Type:** Architectural (A)
> **Status:** Stable
> **Normativity:** Normative unless marked informative

**At a glance.** This pattern is the entry-bearing alignment surface for engineer-managers when the real confusion is not "what component is this" but `who is responsible`, `how the work is supposed to happen`, `when the plan lives`, and `what actually happened`.

**Start here when.** The dominant ambiguity is role vs method vs schedule vs actual run, and the team keeps arguing about a "process" without separating recipe, plan, capability, and executed work.

**First output.** One explicit Role / Method / MethodDescription / WorkPlan / Work separation, plus one traceable chain from `U.RoleAssignment` through the governing method description to the actual or intended work surface.

**Typical next owners.** `A.15.1` for dated execution, `A.15.2` for schedule/baseline planning, `A.15.3` for slot-filling plan items, `B.5.1` for the simple lifecycle reading, `F.11` when method/work vocabulary itself must be aligned across contexts, and `F.17` when the result should land on a human-facing work sheet.

**Common wrong escalations / reroutes.** If the first honest artefact is still only a cue, reroute to `A.16` / `A.16.1`; if the burden is boundary language or contract soup, reroute to `A.6`; if you only need one executed occurrence rather than the alignment frame, continue straight to `A.15.1`.

### Problem frame

In any complex system, from a software project to a biological cell, there is a fundamental distinction between **what something is** (its structure), **what it is supposed to do** (its role and specified capability), and **what it actually does** (its work). Confusing these layers is a primary source of design flaws, budget overruns, and failed projects. Teams argue about a "process" without clarifying if they mean the documented procedure, the team's ability to execute it, or a specific execution that happened last Tuesday.

This pattern provides the canonical alignment for modeling contextual enactment in FPF, serving as the ultimate implementation of the **Strict Distinction Principle (A.7)**. It weaves together several foundational concepts into a single, coherent model of how intention becomes action:
*   **A.2 (Contextual Role Assignment):** Provides the `Holder#Role:Context` structure for assigning roles.
*   **A.4 (Temporal Duality):** Provides the strict separation between `design-time` and `run-time`.
*   **A.12 (External Transformer):** Ensures that all actions are attributed to an external agent.

The intent of this pattern is to establish a normative, unambiguous vocabulary and set of relations for describing the entire evolution of an action, from the specification of a capability to its concrete, resource-consuming execution.

To keep plan-run separation explicit, this pattern references **A.15.2 `U.WorkPlan`** for **schedules/calendars** and **A.15.1 `U.Work`** for **dated execution**. Ambiguous terms like "process / workflow / schedule" are constrained by **L-PROC / L-FUNC / L-SCHED** (E-cluster): a _workflow_ is a **Method/MethodDescription**, a _schedule_ is a **WorkPlan**, and what _happened_ is **Work**.

**Terminology note (L-ACT).** The words _action/activity_ are **not normative** in the kernel. When a generic "doing" is needed, we use the didactic term **enactment** (not a type). Normative references must be to **`U.Method` / `U.MethodDescription` / `U.Work` / `U.WorkPlan`**. See lexical rules **L-PROC / L-FUNC / L-SCHED / L-ACT**.
### Problem

Without this formal framework, models suffer from a cascade of category errors:

1.  **Role-as-Part:** A Role (e.g., `AuditorRole`) is incorrectly placed inside a structural bill-of-materials (`ComponentOf`), making the system's architecture brittle and nonsensical.
2.  **Specification-as-Execution:** A `MethodDescription` (the "recipe") is treated as evidence that the work was done. This leads to "paper compliance," where a system is considered complete simply because its documentation exists.
3.  **Capability-as-Work:** A team's *ability* to perform a task (`Capability`) is conflated with the *actual performance* of that task (`Work`). This obscures the reality of resource consumption and actual outcomes.
4.  **Work-without-Context:** An instance of work is logged without a clear link back to the role, capability, and specification that governed it, making the work unauditable and its results impossible to reproduce.
5.  **Ambiguous "Process/Activity":** The overloaded term "process" is used indiscriminately to refer to all of the above, creating a fog of miscommunication that paralyzes decision-making. Activity/action terms must be resolved via L-ACT to Method/MethodDescription (recipe), WorkPlan (schedule), or Work (run).
### Forces

| Force | Tension |
| :--- | :--- |
| **Structure vs. Function** | The need to model the stable, physical structure of a system (`mereology`) vs. the need to model its dynamic, functional behavior (`roles` and `actions`). |
| **Design vs. Run** | The need for a timeless, reusable description of a capability (`design-time`) vs. the need for a specific, dated record of its execution (`run-time`). |
| **Clarity vs. Jargon** | The need for a precise, formal vocabulary to prevent ambiguity vs. the reality that teams use informal, domain-specific jargon like "process" or "workflow." |
| **Accountability vs. Complexity** | The need for a complete, end-to-end audit trail for every action vs. the desire to keep models simple and avoid excessive documentation. |
### Solution

The solution is a stratified alignment that cleanly separates the `design-time` and `run-time` for contextual **enactment**. The bridge between these worlds is the **`U.RoleAssignment`**.

#### The Core Entities: A Strict Distinction

FPF mandates the use of the following distinct, non-overlapping entities to model action. Using them interchangeably is a conformance violation.

**A) Design-Time Entities (The World of Potential):**

*   **`U.Role`:** A contextual "mask" or "job title" (e.g., `TesterRole`). It specifies a function but is not the function itself.
*   **`U.Method`:** The **abstract way-of-doing** inside a context (paradigm-agnostic; may be imperative, functional, logical, or hybrid).
*   **`U.MethodDescription`:** A **`U.Episteme` describing a `U.Method`** (the SOP/algorithm/proof/recipe on a carrier).
*   **`U.Capability`:** An **attribute** of a `U.System` that represents its **ability** to perform the actions described in a `MethodDescription`. This is the "skill" or "know-how."
*   **`U.WorkPlan`:** An **`U.Episteme`** declaring **intended `U.Work` occurrences** (windows, dependencies, intended performers as role kinds, budgets) - see **A.15.2**.

**B) The Bridge Entity:**
*   **`U.RoleAssignment`:** The formal assertion `Holder#Role:Context` that links a specific `U.Holon` to a `U.Role` within a `U.BoundedContext`. This holder-to-role assignment link is what "activates" the requirements associated with a role.

**C) Run-Time Entity (The World of Actuality):**

*   **`U.Work`:** An **occurrence** or **event**. It is the concrete, dated, resource-consuming **execution of a `U.MethodDescription`** by a `Holder` acting under a `U.RoleAssignment`; capability checks are evaluated at run time against the holder. This is the only entity that has a start and end time and consumes resources.

**Kinds of Work and the primary target**
Every `U.Work` SHALL declare a `primaryTarget: U.Holon` and a `kind`.
Kinds:
* Operational - transforms a `U.System` or its environment.
* Communicative (SpeechAct) - transforms a deontic/organizational frame (e.g., commitments, permissions, approvals).
* Epistemic - transforms a `U.Episteme` (e.g., curating a dataset).
The `primaryTarget` disambiguates enactment: what is being acted upon. Example: an approval is `kind=Communicative`, `primaryTarget = Commitment(change=4711)`. A deployment is `kind=Operational`, `primaryTarget = ServiceInstance(prod-us-eu-1)`.

**Didactic Note for Managers: The "Chef" Analogy**

This model can be easily understood using the analogy of a chef in a restaurant.

*   **`ChefRole`** is the **Role**. It's a job title with certain expectations.
*   A **Cookbook (`U.MethodDescription`)** contains the **recipe** for a Souffle. It's a piece of knowledge.
*   The chef's **skill** in making souffles is their **`U.Capability`**. They have this skill even when they are not cooking.
*   The restaurant's rulebook (`U.BoundedContext`) states that anyone in the `ChefRole` *must* have the `Capability` to follow the recipes in the cookbook.
*   The actual act of **making a souffle** on Tuesday evening - using eggs and butter, taking 25 minutes, and consuming gas - is the **`U.Work`**.

Confusing these is like mistaking the cookbook for the souffle. FPF's framework simply makes these common-sense distinctions formal and mandatory.
#### The Canonical Relations: Connecting the Layers

The entities are connected by a set of precise, normative relations that form an unbreakable causal chain. The following diagram illustrates this flow from the abstract context down to the concrete execution.

```mermaid
graph TD
    subgraph Design-Time Scope (Tᴰ)
        A[U.BoundedContext] -- defines --> B(U.Role)
        M[U.Method] -- isDescribedBy --> D[U.MethodDescription]
        Cap[U.Capability] -- supports --> M
        H(U.System as Holder) --> RB(U.RoleAssignment)
        B -- is the role in --> RB
        A -- is the context for --> RB
        A -- bindsCapability(Role,Capability) --> Cap
    end

    subgraph Run-Time Scope (Tᴿ)
        W[U.Work]
    end

    RB -- performedBy --> W
    W  -- isExecutionOf --> D

    style A fill:#e6f3ff,stroke:#36c,stroke-width:2px
    style B fill:#fff2cc,stroke:#d6b656,stroke-width:2px
    style Cap fill:#d5e8d4,stroke:#82b366,stroke-width:2px
    style M fill:#d5e8d4,stroke:#82b366,stroke-width:2px
    style D fill:#f8cecc,stroke:#b85450,stroke-width:2px
    style H fill:#e1d5e7,stroke:#9673a6,stroke-width:2px
    style RB fill:#dae8fc,stroke:#6c8ebf,stroke-width:3px,stroke-dasharray: 5 5
    style W fill:#ffe6cc,stroke:#d79b00,stroke-width:2px,font-weight:bold
```

*   **`bindsCapability(Role, Capability)`:** A `U.BoundedContext` asserts that a given `Role` requires a specific `Capability`. This is a `design-time` rule.
*   **`isDescribedBy(Method, MethodDescription)`:** A `U.Method` is formally described by one or more `MethodDescription`s. This links the abstract way-of-doing to the recipe on a carrier.
*   **`isExecutionOf(Work, MethodDescription)`:** A specific `U.Work` is a `run-time` realization of a `design-time` `MethodDescription`. Capability checks are evaluated against the holder at run time.
*   **`performedBy(Work, RoleAssignment)`:** A `U.Work` is always performed by a specific `Agent` (a `U.RoleAssignment`). This links the action to the actor-in-context.

_At run time, capability thresholds declared by the context/spec are **checked** against the holder; `U.Work` outcomes provide **evidence** for capability conformance._

This chain provides complete traceability: a specific instance of `U.Work` can be traced back to the `U.MethodDescription` that governed it, the `U.Method` it describes, and the `Agent` (`Holder` + `Role` + `Context`) that was authorized and responsible for its execution.
#### Bounded specialization scouting and CheckpointReturn

When one human-plus-AI pair faces a new task family or candidate solution corridor, the governed work system may temporarily compose four distinct local roles inside the same dyad: a human-side `UtilityOwnerRole`, an `AIScoutRole`, an `AISpecialistProbeRole`, and a human-side `CommitAuthorityRole`. The payoff of the dyad is faster lawful specialization of the next move, not disappearance of the human decision surface.

For this bounded burden, the pair should declare one utility target first, enumerate heterogeneous candidate approaches that may satisfy that target, spend a bounded scout or probe budget before any committed route is chosen, and return one `CheckpointReturn` that compares the tested approaches rather than silently treating one successful probe as a committed rollout. `A.15` owns this dyadic move and local role split only; it does not re-own the checkpoint-record semantics of `C.24` or the budget/guard enforcement of `E.16`.

Every `CheckpointReturn` should carry:
- the declared utility target and current `TaskFamily`
- the candidate approaches actually tested
- the evidence observed on each tested approach, including progress toward the named work-measure threshold and important failure signals
- the budget already burned and the residual budget still available
- the recommended next action: continue probing, commit, narrow, hand off, or stop
- the exact commit trigger that would justify leaving the probe state

Low-human-overlap approaches remain admissible here only while they stay tied to the declared utility target, budget guard rails, and evidence basis by value.
### Archetypal Grounding

The Contextual Action Framework is universal. It applies identically to the modeling of physical engineering processes, knowledge work, and socio-technical systems.

| Archetype | **`U.System` Archetype (Manufacturing)** | **`U.Episteme` Archetype (Scientific Peer Review)** |
| :--- | :--- | :--- |
| **`BoundedContext`** | `FactoryFloor:ProductionLine_B` | `Journal:PhysicsLetters_A` |
| **`Role`** | `WeldingRobotRole` | `ReviewerRole` |
| **`Holder`** | `ABB_Robot_Model_IRB_6700` (`U.System`) | `Dr_Alice_Smith` (modeled as a `U.System`) |
| **`U.RoleAssignment`** | `ABB_Robot#WeldingRobotRole:Line_B` | `Dr_Smith#ReviewerRole:PhysicsLetters_A` |
| **`MethodDescription` (`U.Episteme`)** | `Welding_Procedure_WP-28A.pdf` (SOP) | `Peer_Review_Guidelines_v3.docx` |
| **`Capability` (Attribute of Holder)** | `executeWeldingSeam(Type: 3F)` | `evaluateManuscript(Field: QuantumOptics)` |
| **`Work` (`Occurrence`)** | Manufacturing Work: `Weld_Job_#78345` (15:32-15:34 UTC, consumed 1.2 kWh, 5g Argon) - **isExecutionOf** `Welding_Procedure_WP-28A.pdf` | Peer-review Work: `Review_of_Manuscript_#PL-2025-018` (Completed 2025-08-15, took 4 hours) - **isExecutionOf** `Peer_Review_Guidelines_v3.docx` |

**Key takeaway from grounding:**
This side-by-side comparison reveals the power of the framework. A seemingly different activity like welding a car chassis and reviewing a scientific paper are shown to have the **exact same underlying causal structure**. Both involve a `Holder` (a system) acting in a `Role` within a `Context`, using a `Capability` described by a `MethodDescription` to produce a specific, auditable instance of `Work`. This universality is what allows FPF to bridge disparate domains.
### Bias-Annotation

Lenses tested: **Gov**, **Arch**, **Onto/Epist**, **Prag**, **Did**. Scope: **Universal** for contextual enactment across engineering, operational, and knowledge-work settings.

Bias risks and mitigations:

* **Governance bias (Gov):** teams may over-treat role or approval surfaces as enough evidence that work happened.
  *Mitigation:* keep `U.RoleAssignment`, `U.MethodDescription`, `U.WorkPlan`, and `U.Work` distinct, and let only `U.Work` carry actuals and resource use.
* **Architectural bias (Arch):** modelers may pull roles or capabilities into structural part hierarchies because those diagrams are already present.
  *Mitigation:* preserve role and capability as contextual-functional entities, not parts.
* **Epistemic bias (Onto/Epist):** a documented recipe or schedule can be mistaken for proof of execution.
  *Mitigation:* require the traceability chain from `U.RoleAssignment` and `U.MethodDescription` to dated `U.Work`.
* **Pragmatic bias (Prag):** teams may keep using one overloaded "process" word because it feels faster.
  *Mitigation:* resolve "workflow / schedule / what happened" through `U.Method` / `U.MethodDescription`, `U.WorkPlan`, and `U.Work`.
* **Didactic bias (Did):** the chef analogy can make the pattern seem intuitive while hiding the need for explicit model links.
  *Mitigation:* pair the analogy with the canonical relations and checklist.
### Conformance Checklist

To ensure the integrity of action modeling, all FPF-compliant models must adhere to the following normative checks.

| ID | Requirement (Normative Predicate) | Purpose / Rationale |
| :--- | :--- | :--- |
| **CC-A15-1 (Entity Distinction)** | The entities `U.Role`, **`U.Method`**, **`U.MethodDescription`**, `U.Capability`, **`U.WorkPlan`**, and `U.Work` **MUST** be modeled as distinct, non-overlapping types. | This is the core enforcement of **Strict Distinction (A.7)**. It prevents the category errors outlined in the "Problem" section. |
| **CC-A15-2 (Temporal Scope)** | `U.Method`/`U.MethodDescription`/`U.WorkPlan` exist in **design-time**; `U.Work` exists in **run-time**. Design artifacts are not mutated by operational events. | Enforces **Temporal Duality (A.4)**. Blueprints cannot be mutated by operational events. |
| **CC-A15-3 (RoleAssignment Mandate)** | Every `U.Work` **MUST** be linked via `performedBy` to a valid `U.RoleAssignment`. | Guarantees that every action has a clearly identified, context-bound actor, ensuring accountability. |
| **CC-A15-4 (Traceability Chain)** | For every `U.Work`, an unbroken chain **MUST** exist: `Work -performedBy-> RoleAssignment` and `Work -isExecutionOf-> MethodDescription -describes-> Method`. Capability checks are evaluated against the holder at run time. | Ensures end-to-end auditability from a specific action back to the recipe that governed it. |
| **CC-A15-5 (No Roles in Mereology)** | A `U.Role` or `U.Capability` **SHALL NOT** be part of a mereological (`partOf`) hierarchy. | The "Role-as-Part" anti-pattern is a violation. Roles and capabilities are functional, not structural. Enforces **A.14**. |
| **CC-A15-6 (Resource Honesty)** | Resource consumption (`U.Resource`) **MUST** only be associated with `U.Work`, never with `U.MethodDescription` or `U.Capability`. | Enforces that costs are tied to actual events, not to plans or potential. Aligns with **Resrc-CAL (C.5)**. |
| **CC-A15-7 (Plan/Run Split)** | Schedules/calendars **MUST** be represented as `U.WorkPlan` (A.15.2). A `U.WorkPlan` SHALL NOT be used as evidence of execution; only `U.Work` carries actuals. | Preserves plan/run separation and prevents schedule-as-actual drift. |
| **CC-A15-8 (Lexical Sanity)** | Unqualified "process/workflow/schedule" **MUST** be interpreted per **L-PROC / L-FUNC / L-SCHED**: workflow -> `Method/MethodDescription`; schedule -> `WorkPlan`; what happened -> `Work`. | Keeps process vocabulary auditable and reduces lexical ambiguity. |
| **CC-A15-9 (Realisation)** | A valid `U.Work` realizes a `U.MethodDescription` under a `U.RoleAssignment`. Spontaneous physical evolution without a `MethodDescription` is modeled as `U.Dynamics`, not as `U.Work`. | Prevents background dynamics from being miscast as governed work. |
| **CC-A15-10 (GateSplit)** | A SpeechAct that changes a Role's state (e.g., "Approve", "Authorize") MUST be modeled as a distinct `U.Work` step (`kind=Communicative`). It may open the Green-Gate for a subsequent operational step, but it SHALL NOT be conflated with that step. | Preserves authority-state changes as distinct communicative acts. |
| **CC-A15-11 (KindFit)** | The `U.Role` named in the `performedBy` assignment SHALL be appropriate for the `U.Work` kind (e.g., `ApproverRole` for communicative approvals; `DeployerRole` for operational deployments). | Prevents kind-mismatched role attribution. |
### Common Anti-Patterns and How to Avoid Them

- **Role-as-part.** Do not place `U.Role` or `U.Capability` inside structural `partOf` decomposition; keep them contextual and functional.
- **Recipe-as-evidence.** Do not treat a `U.MethodDescription` or SOP as proof that work occurred; record dated `U.Work` instead.
- **Plan-as-actual.** Do not let schedules, calendars, or intended assignments stand in for actual execution; use `U.WorkPlan` for intent and `U.Work` for actuals.
- **Capability-as-work.** Do not treat possession of a capability as if the task has already been performed; capability supports execution but is not execution.
- **Approval collapse.** Do not merge approval or authorization speech acts into the operational step they open; model them as distinct communicative `U.Work` when they change authority state.
- **Process soup.** Do not leave "process / workflow / activity" uninterpreted in load-bearing passages; resolve the word to method, plan, or work.
### Consequences

| Benefits | Trade-offs / Mitigations |
| :--- | :--- |
| **Unambiguous Communication:** Provides a shared, precise vocabulary for teams to discuss roles, processes, and results, eliminating the ambiguity of terms like "process." | **Initial Learning Curve:** Requires teams to learn and internalize the distinctions between the core entities. *Mitigation:* The "Chef" analogy and clear archetypes serve as powerful didactic tools. FPF tooling should guide users with templates. |
| **End-to-End Auditability:** The framework creates a "digital thread" that links every operational event (`Work`) back to its authorizing role, context, and specification. This is critical for regulated industries and for root cause analysis. | **Increased Formality:** Requires more explicit modeling than informal approaches. *Mitigation:* This is a strategic investment. The upfront cost of formal modeling is offset by massive savings in debugging, re-work, and compliance efforts later. |
| **Enables True Modularity:** By separating capability from execution, the framework allows for easier substitution. A `MethodDescription` can be updated without invalidating past `Work` records. A `Holder` can be replaced with another, as long as it possesses the same `Capability`. | - |
| **Foundation for Governance:** The model makes it possible to build powerful governance rules. For example: "Only an `Agent` with `AuditorRole` can execute `Work` that instantiates the `ApproveRelease` capability." | - |
### Rationale

This pattern solves a problem that has plagued systems modeling for decades: the conflation of what a system *is* with what it *does*. Its rigor is not arbitrary but is grounded in several key intellectual traditions.

*   **Ontology Engineering:** The pattern is a direct application of best practices from foundational ontologies (like UFO), which have long insisted on the distinction between *endurants* (objects like a `U.System`) and *perdurants* (events/processes like `U.Work`), and between intrinsic properties and relational roles. FPF makes these powerful distinctions accessible to practicing engineers.
*   **Process Theory:** Formalisms like the Pi-calculus or Petri Nets model processes as dynamic interactions. The FPF Contextual Action Framework provides a higher-level, more semantically rich layer on top of such formalisms. The `U.Work` entity can be seen as an instance of a process, but FPF adds the crucial context of the `Role`, `Capability`, and `MethodDescription` that govern it.
*   **Pragmatism and Practice:** The framework is deeply pragmatic. The distinctions it makes (e.g., between a `MethodDescription` and `U.Work`) are precisely the ones that matter in the real world of project management, compliance, and debugging. When a failure occurs, a manager needs to know: was the recipe wrong (`MethodDescription`), did the chef lack the skill (`Capability`), or did they just make a mistake this one time (`U.Work`)? This framework provides the vocabulary to ask and answer that question precisely.

By creating this clean, stratified alignment for enactment, FPF provides a stable and scalable foundation for all of its more advanced patterns, from resource management (`Resrc-CAL`) and decision theory (`Decsn-CAL`) to ethics (`Norm-CAL`).
### SoTA-Echoing

**Claim 1.** Best-known current workflow, digital-thread, and service-operations practice keeps recipe, plan, and execution separate.

**Practice / source / alignment / adoption.** Contemporary process modeling, service operations, and auditability practice after 2015 separates procedure, schedule, and executed occurrence because otherwise paper compliance becomes indistinguishable from completed work. In the manufacturing and peer-review slices above, this means a procedure or calendar never counts as the weld or the review itself. This pattern **adopts** that separation, **adapts** it through `U.Method`, `U.MethodDescription`, `U.WorkPlan`, and `U.Work`, and **rejects** the shortcut where one undifferentiated "process" object carries all three loads.

**Claim 2.** Best-known current accountability practice keeps actor-in-context explicit rather than attributing work to a role label or a document.

**Practice / source / alignment / adoption.** Contemporary governance, service delivery, and incident practice distinguishes accountable assignee, governing procedure, and actual run record because post-hoc review depends on knowing who acted, under what role, and under which method. In the slices above, that is why the robot or reviewer acts under `U.RoleAssignment` rather than the role or guideline acting on its own. This pattern **adopts** explicit actor-in-context attribution through `U.RoleAssignment`, **adapts** it to bounded-context semantics, and **rejects** anonymous work logs and role-as-part modeling.

**Claim 3.** Best-known current approval and execution practice treats communicative gate acts and operational acts as distinct kinds of work.

**Practice / source / alignment / adoption.** Contemporary release, compliance, and safety-critical practice separates approval, authorization, and review acts from the operational steps they permit because authority change and world change are not the same event. In the examples above, that means an approval is not the same work as a deployment or a weld. This pattern **adopts** that split, **adapts** it through communicative versus operational `U.Work` kinds, and **rejects** the collapse of approval into the thing being approved.

**Local stance.** The load-bearing SoTA claim for this pattern is practical and narrow: contextual enactment remains reviewable only when role, method, plan, and work stay distinct enough that audits can tell whether the problem was in the assignment, the recipe, the schedule, the capability, or the run itself.

**Claim 4.** Best-known current agentic work practice treats fast bounded specialization as a checkpointed scout/probe discipline rather than as a naked winner claim.

**Practice / source / alignment / adoption.** Contemporary agentic tool-use, adaptive workflow, and human-in-the-loop governance practice separates bounded exploration from committed rollout because a successful probe is not yet a lawful route choice. In the working moment above, that is why the pair returns one `CheckpointReturn` with candidate approaches, evidence, burned and residual budget, and a commit trigger rather than only a winner label. This pattern **adopts** checkpointed scout/probe discipline, **adapts** it through the dyad-local roles and `CheckpointReturn`, and **rejects** the shortcut where an early probe silently becomes a committed rollout.
### Relations

*   **Directly Implements:** `A.7 Strict Distinction`.
*   **Builds Upon:** `A.2 (U.Role)`, `A.2.1 (U.RoleAssignment)`, `A.4 (Temporal Duality)`, `A.12 (External Transformer)`.
*   **Is Used By / Provides Foundation For:**
    *   `C.4 Method-CAL`: Provides the formal definition of `U.MethodDescription` and the `Gamma_method` operator for composing them.
    *   `C.5 Resrc-CAL`: Provides the `U.Work` entity to which resource consumption is attached.
    *   `B.1.6 Gamma_work`: The aggregation operator for `U.Work`.
    *   `B.4 Canonical Evolution Loop`: The entire loop is a sequence of `U.Work` instances that modify `MethodDescription`s.
    *   `A.15.2 U.WorkPlan`: plan-run split, baselines and variance against `U.Work`.
*   **Constrains:** Any FPF pattern that models actions or processes must use this framework to be conformant. It serves as the canonical alignment for **contextual enactment** in the FPF ecosystem.
*   **Coordinates with:** `L-PROC / L-FUNC / L-SCHED` (E-cluster) for lexical disambiguation of _process / workflow / schedule_.
### A.15:End

---
## U.Work

### Problem Frame

After we have agreed **who is assigned** (via **Role assignment**), **what they can do** (via **Capability**), and **how in principle** it should be done (via **Method/MethodDescription**), we still need a precise concept for **what actually happened** in real time and space.

That concept is **`U.Work`**: the **dated run‑time occurrence** of enacting a MethodDescription by a specific performer under a Role assignment, with concrete parameter bindings, resource consumption, and outcomes, **anchored to a domain referent that actually changes** (asset/product/dataset) — **not** merely the manipulation of records about that referent. Managers care about Work because it is the **only place** where cost, time, defects, and evidence are **real**. Architects care because Work ties plans and specs to accountable execution.
### Problem (what breaks without a clean notion of Work)

1. **Plan/run confusion.** Schedules and diagrams get mistaken for “the process,” so audits and KPIs become fiction.
2. **Spec/run conflation.** A method description (code/SOP) is reported as if it were an execution; conversely, logs are treated as recipes.
3. **Who/when leakage.** People and calendars are baked into specs; reuse and staffing agility collapse.
4. **Resource dishonesty.** Energy/money/tool wear are booked to methods or roles, not to actual runs; costing and sustainability metrics drift.
5. **Mereology muddle.** Teams hand‑wave over “sub‑runs,” retries, overlaps, or long‑running episodes; roll‑ups double‑count or miss work.
### Forces (what the definition must balance)

| Force                              | Tension we resolve                                                                                    |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Universality vs. domain detail** | One Work notion for surgery, welding, ETL, proofs, lab cycles—while letting each keep its vocabulary. |
| **Granularity vs. aggregation**    | Atomic runs vs. composite operations; we need roll‑up without double‑count.                           |
| **Concurrency vs. order**          | Parallel/overlapped activities need clear part/overlap semantics.                                     |
| **Identity vs. retries**           | A failed attempt, a retry, and a resumed episode—what is “the same” work?                             |
| **Time realism vs. simplicity**    | We need intervals and coverage but cannot bury users in temporal logic notation.                      |
### Solution — define U.Work as the accountable, dated occurrence

#### Definition

**`U.Work`** is a **4D occurrence holon**: a **dated run‑time enactment** of a `U.MethodDescription` by a performer designated through a `U.RoleAssignment`, **executed within a concrete `U.System/SubSystem`**, inside a `U.BoundedContext`, that binds concrete parameters, consumes/produces resources, and leaves an auditable trace. 
Each `U.Work` is a **morphism** `Δ` on a declared **state‑plane** (`StatePlaneRef`), mapping ⟨**pre‑state**, **inputs**⟩ to ⟨**post‑state**, **outputs**⟩ for one or more **affected referents**.

> **Memory aid:** *Work = “how it went this time”* (dated, resourced, accountable).
#### Core anchors (conceptual descriptors; not a data schema)

When you describe a Work instance in a review, answer these prompts:

1. **Window** — start/end timestamps (and, where relevant, location/asset).
2. **Spec** — `isExecutionOf → U.MethodDescription` (the description actually followed; **edition pinned** if applicable).
3. **Performer** — `performedBy → U.RoleAssignment` (which **holder#role\:context** acted).
4. **Parameters** — concrete values bound for this run (from the **MethodDescription** parameter declarations).
5. **Inputs/Outputs** — material/information artifacts read/written, products/services delivered.
6. **Resources** — energy, materials, machine time, money (the **only** place we book them).
7. **Outcome** — success/failure classes, quality measures, acceptance verdicts (**map‑then‑compare** per **ComparatorSet** under **CG‑Spec**; pin editions).
8. **Links** — predecessor/successor/overlap relations to other Work, and step/run nesting (if part of a bigger operation).
9. **Context** — the bounded context(s) under which this run is judged (normally inherited from the MethodDescription and RoleAssigning; see A.15 for cross‑checks).
10. **Effect (Δ)** — `affected → {referent(s)}` + **pre‑state anchor** and **post‑state anchor** (or a declared **Δ‑predicate** evaluated on evidence) on the declared state‑plane (**StatePlaneRef**).
11. **System** — `executedWithin → U.System` (the operational system/sub‑system accountable for the occurrence; **mandatory**).
12. **Evidence & Telemetry (optional)** — if the run feeds **G.11** refresh or QD/OEE archives, cite **PathId/PathSliceId** and the active **policy‑id** used for illumination; do not elevate telemetry into dominance without CAL policy.
#### Clear distinctions (the four‑slot grammar in action)

| You are pointing at…                          | The right FPF concept  | Litmus                                                          |
| --------------------------------------------- | ---------------------- | --------------------------------------------------------------- |
| The **recipe/code/diagram**                   | **MethodDescription**         | Is it knowledge on a carrier?                                   |
| The **semantic “way of doing”**               | **Method**             | Same Standard across notations?                                 |
| The **assignment** (“who is being what”)     | **Role → RoleAssigning** | Can be reassigned without changing the system?                  |
| The **ability** (“can do within bounds”)      | **Capability**         | Would remain even if not assigned?                             |
| The **dated occurrence** with logs, resources | **Work**               | Did it happen at (t₀, t₁), consume resources, produce outcomes? |
| The **state change caused this time**         | **Work.Δ**             | Did the referent move from pre→post on the declared state‑plane? |
#### Publication (MVPK guard‑rails for U.Work) — normative

Publication of `U.Work` across MVPK faces **must** be a typed projection that does **not** mutate intensional semantics (A.7; E.17). Concretely:
1. **No new claims.** Faces (**PlainView / TechCard / InteropCard / AssuranceLane**) **SHALL NOT** introduce properties beyond the `U.Work` intensional arrow; they **project** presence‑pins only (time window, performer, spec, parameter‑binding occurrence, resource ledger presence, acceptance verdict presence). Numeric/comparable content appears **only** with pins (see 4.4‑4.5 below); **“signature”** is banned on faces.
2. **No Γ‑leakage.** Faces **MUST NOT** smuggle Γ semantics (union/hull/overlap policy, budget algebra) into prose; whenever aggregation is shown, the face **cites** the Γ‑operator and policy‑id used. Compute totals outside the face per B.1; faces carry **references**, not implied Γ rules.
3. **No I/O re‑listing.** Per MVPK, faces **do not duplicate** intensional I/O lists. They show **presence‑pins** and **anchors** to carriers/lanes/editions only (E.17 §5.4).
4. **Lawful orders (sets).** Where a `U.Work` face presents any **comparison or ranking across runs** (e.g., acceptance classes, parity/benchmark inserts), the face **must**: (i) compare **after mapping** via a declared **ComparatorSet**; (ii) **return sets** (Pareto/Archive) when order is partial; (iii) **forbid** hidden scalarization/ordinal means (cf. G.9).
5. **Comparator/Transport edition pins.** Any numeric/comparable statement on a `U.Work` face **MUST** pin the **CG‑Spec**/**ComparatorSet** edition(s) and, where scale/plane conversion occurs, the **UNM.TransportRegistry** edition (**Φ**/**Φ^plane** policy‑ids). Cross‑context/plane crossings **route penalties to R‑lane only** (Bridge id + Φ) (cf. E.17; G.9).
6. **Cross‑stance citations.** Any citation whose **stance** differs from the citing `U.Work` face (different `DesignRunTag`, `ReferencePlane`, or `CtxState.locus`) **MUST** carry **BridgeCard + UTS row** (with locus/plane notes and CL routing).
7. **No surrogate‑run creation.** Faces **MUST NOT** synthesize “virtual runs” from reconstructed records alone; a face may reference only `U.Work` instances that meet Δ‑anchoring in §4.2/§8.
#### Crossing visibility & stance tags (work publication discipline) — normative

* **Stance.** `U.Work` is a **run-time occurrence** (DesignRunTag = run). Any face that cites **design-time** artefacts (e.g., ComparatorSet, CG-Spec editions, TransportRegistryΦ) is making a **cross-stance/cross-Context** reference and therefore **MUST** publish a **BridgeCard + UTS row** and record **Φ(CL)/Φ^plane** policy-ids; **penalties reduce `R_eff` only**.  
* **Binding discipline.** **Launch values bind only here** (occurrence). Plan-time proposals remain proposals; do not back-fill plan faces with run-time bindings. **Pre/post state anchors bind here** (pre at start; post at completion or at declared checkpoints).
### Work mereology (how runs form holarchies)

We adopt a **4D extensional** stance for occurrences: a Work is identified primarily by its **spatiotemporal extent** and its execution anchors (spec used, performer, parameterization). This avoids double‑counting and keeps aggregation sound. FPF adapts insights from BORO/constructive ontologies to Work while staying practical.

#### Parts and wholes of Work (design‑neutral, run‑time facts)

* **Temporal‑part (`TemporalPartOf_work`).** A proper **time‑slice** of a Work (e.g., the first 10 minutes of a 2‑hour run). Useful for monitoring and SLAs.
* **Episode‑part (`EpisodeOf_work`).** A **resumption fragment** after an interruption (same run identity if policy deems it one episode; see 5.5).
* **Operational‑part (`OperationalPartOf_work`).** A **sub‑run** that enacts a **factor** of the Method/Spec (e.g., “incision” run within “appendectomy” run), possibly **overlapping** with others in time.
* **Parallel‑part (`ConcurrentPartOf_work`).** Two sub‑runs that **overlap** in their windows, coordinated by the same higher‑level run.

**Didactic rule:** **Method composition ≠ proof of Work decomposition.** Sub‑runs often map to method factors, but retries, batching, pipelining, and failures make the mapping non‑isomorphic.
#### Key relations among Work

* **`precedes/happensBefore`** — strict partial order on Work windows.
* **`overlaps`** — intervals intersect but neither contains the other.
* **`contains/within`** — one Work’s window contains another’s.
* **`causedBy/causes`** — pragmatic causal links (e.g., a rework caused by a failed inspection run).
* **`retryOf`** — a new Work instance re‑attempting the same MethodDescription with revised parameters.
* **`resumptionOf`** — a Work episode that **continues** an interrupted run (policy decides identity; see 5.5).

These relations are **run‑time facts**, not design assumptions.
#### Operators for roll‑ups (Γ\time and Γ\work)

* **Temporal coverage — `Γ_time(S)`**
  For a set `S` of Work parts, returns a **coverage interval set** (union of intervals) or, when required, the **convex hull** `[min t₀, max t₁]`. Use **union** for utilization; use **hull** for lead time.
  *Properties:* idempotent, commutative, monotone under set inclusion.

* **Resource aggregation — `Γ_work(S)`**
  For a set `S` of Work parts, returns the **aggregated resource ledger** (materials, energy, time, money) with de‑duplication rules for shared/overlapped parts (context‑declared).
  *Properties:* additive on **disjoint** parts; requires **overlap policy** otherwise (e.g., attribute costs to the parent once, not to each child).

**Manager’s tip:** Pick the coverage operator that matches your KPI: **union** for machine utilization; **hull** for calendar elapsed; never mix silently.
#### Identity of a Work (extensional criterion, pragmatically framed)

Two Work records refer to the **same Work** iff, in the relevant context:

* their **time–space extent** is the same (within declared tolerance),
* they link to the **same `MethodDescription`**,
* they have the **same performer** (`U.RoleAssignment`), and
* they bind the **same parameters** (or declared‑equivalent values).

If any of these differ (or the context declares equivalence absent), they are **distinct** Work instances (e.g., a retry).
#### Interruptions, retries, resumptions (episode policy)

* **Retry:** **new Work** with its own window and parameters; link via `retryOf`.
* **Resumption:** **same Work identity** split into **episodes** if the context’s **episode policy** declares so (e.g., “power loss under 5 minutes keeps identity”).
* **Rework:** **new Work** caused by a failure in earlier Work; link via `causedBy`.

**Why it matters:** plans, costs, and quality stats depend on whether you treat a disruption as **one episode** or **a new run**. Declare the policy **in the bounded context**.
#### Compositionality of effects (Δ)

For any Work with parts, the **effect of the whole** must be the **rules‑declared composition** of the effects of its parts plus any declared overheads/residuals. Composition must align with the overlap rules used by `Γ_work` (e.g., no double‑count of shared fixed costs, and consistent attribution of variable deltas).
### Archetypal grounding (parallel domains)

#### Surgical case (overlap and episodes)

* **Top run:** `Appendectomy_Case#2025‑08‑10T09:05–11:42`.
* **Spec:** `Appendectomy_v5` (MethodDescription).
* **Performer:** `OR_Team_A#SurgicalTeamRole:Hospital_2025` (RoleAssigning).
* **Operational parts:** `Incision` (09:15–09:22), `Exploration` (overlaps with monitoring), `Closure` (11:10–11:35).
* **Episode:** brief power dip 10:02–10:07 → **resumptionOf** same run (per hospital policy).
* **Γ\_time:** union for OR utilization; hull for patient lead time.
* **Γ\_work:** totals consumables and staff time once (no double‑count for overlapping sub‑runs).
#### ETL pipeline (parallelism and retries)

* **Top run:** `ETL_Nightly_2025‑08‑11T01:00–01:47`.
* **Spec:** `ETL_v12.bpmn`.
* **Performer:** `ETL_Runtime#TransformerRole:DataOps_2025`.
* **Parallel parts:** `Extract_A` ‖ `Extract_B`; `Transform` starts when either completes (overlap).
* **Retry:** `Load` failed at 01:36; retried with batch size ↓ — **new Work** linked via `retryOf`.
* **Γ\_time:** hull for SLA, union for cluster utilization.
* **Γ\_work:** sum compute minutes; attribute storage I/O once at the parent.
#### Thermodynamic cycle (work as a path)

* **Run:** `Carnot_Cycle_Run#2025‑08‑09T13:00–13:06`.
* **Spec:** `Carnot_Cycle_Spec` (MethodDescription with Dynamics model).
* **Performer:** `LabRig_7#TransformerRole:ThermoLab`.
* **Work identity:** the **path in state‑space** traced during the interval; outputs: heat/work tallies.
* **Γ\_time:** straightforward interval; **Γ\_work:** integrates energy exchange; no “steps” required.
### Bias‑Annotation (as in E‑cluster)

* **Lenses tested:** `Prag`, `Arch`, `Did`, `Epist`.
* **Scope declaration:** Universal; temporal semantics and episode policy are **context‑local** via `U.BoundedContext`.
* **Rationale:** Gives FPF a clean, actionable notion of **occurrence** compatible with `U.RoleAssignment` / **Role Enactment** (A.2.1; A.15) and with 4D extensional thinking, so that costing, quality, and audit rest on **runs**, not on plans or recipes.
### Conformance Checklist (normative)

**CC‑A15.1‑1 (Strict distinction).**
`U.Work` is a **dated run‑time occurrence**. It is **not** a `U.Method` (semantic way), **not** a `U.MethodDescription` (description), **not** a `U.Role/RoleAssigning` (assignment), and **not** a `U.WorkPlan` (plan/schedule).

**CC‑A15.1‑2 (Required links).**
Every `U.Work` **MUST** reference:
(a) `isExecutionOf → U.MethodDescription` (the spec followed; **edition pinned**),
(b) `performedBy → U.RoleAssignment` (the assigned performer in context), and
(c) `executedWithin → U.System/SubSystem` (the operational system accountable for the occurrence).

**CC‑A15.1‑3 (Time window).**
Every `U.Work` **MUST** carry a closed interval `[t_start, t_end]` (or an explicitly marked open end for in‑flight work) and, where relevant, location/asset.

**CC‑A15.1‑4 (Context anchoring & judgement).**
A `U.Work` **MUST** be judged inside a declared **`U.BoundedContext`** (the **judgement context**).

* By default, the judgement context is **the context of the referenced MethodDescription**.
* If `performedBy` references a RoleAssigning in a different context, there **MUST** exist an explicit **Bridge (`U.Alignment`)** or policy stating cross‑context acceptance. Otherwise, the Work is **non‑conformant** in that context.

**CC‑A15.1‑4b (State‑plane anchoring).**
Each `U.Work` **MUST** declare a `StatePlaneRef` for its Δ‑judgement.

**CC‑A15.1‑5 (RoleAssigning validity).**
The `performedBy` RoleAssigning’s `timespan` **MUST** cover the Work interval. If it does not, the Work is **invalid** or must be re‑judged in a context that allows retroactive assignments.

**CC‑A15.1‑6 (Parameter binding).**
Parameters declared by the **MethodDescription** **MUST** have concrete values bound **at Work creation/start** and recorded with the Work. Defaults in the spec do not satisfy this requirement.

**CC‑A15.1‑7 (Capability check).**
All capability thresholds stated by the Method/MethodDescription **MUST** be checked against the **holder** in `performedBy` **at the time of execution** (or at defined checkpoints). Violations must be flagged on the Work outcome.

**CC‑A15.1‑8 (Acceptance criteria).**
Success/failure and quality grades **MUST** be determined by the acceptance criteria declared (or referenced) by the **MethodDescription**/**CG‑Spec** **in the judgment context**. The verdict is recorded on the Work.

**CC‑A15.1‑9 (Resource honesty).**
All consumptions and costs (energy, materials, machine‑time, money, tool wear) **SHALL** be booked **only** to `U.Work` (not to Method, MethodDescription, Role, or Capability). Estimates may live in specs; **actuals** live in Work.

**CC‑A15.1‑10 (Mereology declared).**
If a Work has parts, the chosen **part relation(s)** must be declared (temporal‑part, episode‑part, operational‑part, concurrent‑part). Ambiguous mixtures are forbidden.

**CC‑A15.1‑11 (Γ\_time selection).**
For any roll‑up, the judgement context **MUST** declare which temporal coverage operator applies: **union** (utilization) or **convex hull** (lead time). Silent mixing is prohibited.

**CC‑A15.1‑12 (Γ\_work aggregation).**
Aggregation of resource ledgers across Work parts **MUST** specify an **overlap policy** (e.g., “attribute shared machine‑time to parent only”) to prevent double‑counting.

**CC‑A15.1‑13 (Identity & retries).**
A retry **MUST** be modeled as a **new Work** linked via `retryOf`. Interruptions that are treated as the **same run** must be modeled as **episodes** (`resumptionOf`) per a context‑declared **episode policy**.

**CC‑A15.1‑14 (Concurrency & ordering).**
Overlaps and precedences among Work **MUST** use interval relations (`overlaps`, `precedes`, `contains/within`). Implicit “step order” claims are not admissible evidence.

**CC‑A15.1‑15 (Cross‑context evidence).**
If a Work is to be accepted in multiple contexts (e.g., regulatory + operational), either:
(a) re‑judge it in each context, or
(b) provide Bridges that map acceptance criteria/units/roles; never assume cross‑context identity by name.

**CC‑A15.1‑16 (Spec changes during run).**
If the MethodDescription version changes mid‑run, the Work **MUST** either:
(a) split into episodes bound to respective specs, or
(b) record an explicit **spec override** event in the judgement context. Silent substitution is forbidden.

**CC‑A15.1‑17 (Distributed performers).**
If multiple RoleAssignings jointly perform the same top‑level Work (e.g., multi‑agent orchestration), the Work **MUST** either:
(a) designate a **lead RoleAssigning** and list others as **concurrent parts**, or
(b) be modeled as a **parent Work** with child Works per RoleAssigning.

**CC‑A15.1‑18 (Logs ≠ Work by themselves).**
Logs/telemetry are **evidence** for a Work; they **do not constitute** a Work unless bound to (spec, performer, time window) and judged in a context.

**CC‑A15.1‑19 (Affected referent).** Each `U.Work` **MUST** name at least one affected referent (e.g., `U.Asset`, product/batch, dataset/document) via `affected → {…}`.

**CC‑A15.1‑20 (State‑change witness).** Each `U.Work` **MUST** carry either (a) explicit **pre‑state**/**post‑state** anchors on the declared state‑plane or (b) a **Δ‑predicate** that can be evaluated on evidence. Trivial “no‑op” runs **MUST** be flagged as such.

**CC‑A15.1‑21 (World anchoring vs. record‑handling).** A run whose only effect is copying/reformatting records **does not** qualify as `U.Work` unless the judgment context declares those records to be the **product referent** (e.g., data‑product manufacture).

**CC‑A15.1‑22 (System anchoring).** Each `U.Work` **MUST** declare `executedWithin → U.System/SubSystem`; if different from the asset of change, keep `affected` explicit.

**CC‑A15.1‑23 (Compositionality of Δ).** For composite Work, the parent effect **MUST** be the declared composition of child effects under the same overlap policy as `Γ_work`.

**CC‑A15.1‑24 (No new claims on faces).** MVPK faces for `U.Work` **SHALL NOT** add properties/claims beyond the intensional arrow; numeric/comparable content **MUST** include unit/scale/reference‑plane/**EditionId** pins; the term **“signature”** is banned on faces.

**CC‑A15.1‑25 (No Γ‑leakage).** Faces **MUST** reference Γ operators/policies by id when showing aggregates; they **MUST NOT** encode aggregation semantics in prose or imply defaults. Γ lives in Part B; faces carry **pinned references** only.

**CC‑A15.1‑26 (No I/O re‑listing).** Faces **MUST NOT** restate intensional I/O; publish **presence‑pins** and anchors only (per MVPK §5.4).

**CC‑A15.1‑27 (Lawful orders; return sets).** Any across‑run comparison presented on a `U.Work` face **MUST** use a declared **ComparatorSet** (map‑then‑compare), **return sets** when order is partial, and **forbid** hidden scalarization/ordinal means.

**CC‑A15.1‑28 (Comparator/Transport pins).** Any numeric/comparable acceptance or KPI on a `U.Work` face **MUST** pin `ComparatorSet.edition`, `CG‑Spec.edition`, and (where conversions occur) `TransportRegistry.edition` with **Φ/Φ^plane** policy‑ids; Bridge ids are mandatory for cross‑context/plane reuse; **penalties → R only**.

**CC‑A15.1‑29 (Telemetry hooks, when applicable).** If a Work instance feeds **G.11** or QD/OEE portfolios, it **SHALL** cite `PathId/PathSliceId` and the active **policy‑id** in its evidence; illumination remains **report‑only telemetry** unless CAL explicitly promotes it.
### Temporal & Aggregation Semantics (normative operators & invariants)

#### Temporal coverage Γ_time

* **Input:** a finite set `S` of Work instances or Work parts.
* **Output:** either (a) the **union** of their intervals, or (b) the **convex hull** `[min t_start, max t_end]`—**as declared by context** and KPI.
* **Invariants:**

  * **Idempotent:** `Γ_time(S ∪ S) = Γ_time(S)`
  * **Commutative:** order of elements irrelevant
  * **Monotone:** if `S ⊆ T` then coverage(S) ⊆ coverage(T) (for union) or hull(S) ⊆ hull(T) (for hull)
* **Usage guidance:**

  * Use **union** for **utilization/availability** (how much of the clock time the asset was actually busy).
  * Use **hull** for **lead/cycle time** (elapsed from first touch to last release).
  * **Manager’s tip:** Write the choice near the KPI; many disputes are just a hidden union‑vs‑hull mismatch.
#### Resource aggregation Γ_work

* **Input:** a finite set `S` of Work instances or parts with resource ledgers.
* **Output:** an **aggregated ledger** (materials, energy, machine‑time, money, tool wear) with explicit **overlap policy**.
* **Invariants:**

  * **Additivity on disjoint parts:** if intervals/resources are disjoint by policy, totals add.
  * **No double‑count:** overlapping costs must follow the declared policy (e.g., count once at parent).
  * **Traceability:** each aggregated figure must be reconcilable to contributing Work IDs.
* **Typical policies:**

  * **Parent‑attribution:** shared fixed costs at parent; variable costs at children.
  * **Pro‑rata by wall‑time:** split overlaps by relative durations.
  * **Driver‑based:** allocate by a declared driver (e.g., CPU share, weight, priority).
### Cross‑context checks (MethodDescription ↔ RoleAssigning ↔ Work)

When a Work is recorded, perform these **three quick checks**:

1. **Spec–Context Check.** Does `isExecutionOf` refer to a MethodDescription **defined in** the judgement context (or bridged to it)?

   * If **no**, the Work is **out‑of‑context**; either change context or add a Bridge.

1. **RoleAssigning–Context Check.** Is `performedBy`’s RoleAssigning **valid in** the same context (or bridged)?

   * If **no**, the Work is **unassigned** for that context; remedy via a valid RoleAssigning or a policy exception.

1. **Standard–Outcome Check.** Do the Work’s inputs/outputs and metrics satisfy the **acceptance criteria** from the spec **as interpreted in that context**?

   * If **no**, the Work **fails** or is “conditionally accepted” per context policy.

> **Manager’s mnemonic:** Context, assignment, Standard → **CAC**. Fail any → the Work is not acceptable *here* (perhaps acceptable elsewhere).
### Anti‑patterns (and the right move)

* **“The log is the process.”** Dumping telemetry without binding (spec, performer, context) → **Not Work**. Create a Work, link the log as evidence.
* **Record‑only transforms.** ETL/replication of records with no declared affected referent (product/dataset as product) → **Not Work** in this context; either declare the dataset as the product referent or move it to `U.WorkPlan`/operations‑support.
* **Silent cross‑context acceptance.** “Ops accepted it, so audit accepts it.” → Add a **Bridge** or re‑judge in audit context.
* **Spec drift in mid‑run.** Swapping SOP v5→v6 without recording → Split into episodes or record override.
* **Budget on the method.** Charging costs to Method or Role → Book **only** to Work; keep estimates in specs.
* **Part ambiguity.** Mixing retries, episodes, and operational parts with no declared relation → Choose and declare the part relation.
* **Union/hull confusion.** Changing KPI coverage silently between reports → Declare `Γ_time` policy per KPI.
* **Double‑count in overlaps.** Summing child and parent resource ledgers → Declare and apply an overlap policy.
### Migration notes (quick wins)

1. **Backfill links.** For existing logs, create Work records and attach `isExecutionOf` and `performedBy`.
2. **Name the context.** Pick the judgement context explicitly; add Bridges if multiple contexts must accept.
3. **Publish the episode policy.** Decide when an interruption keeps identity vs forces a new run.
4. **Choose Γ\_time per KPI.** Put “union” or “hull” in the KPI definition; stop arguing in meetings.
5. **Set an overlap policy.** Write one sentence on how shared costs are allocated; apply consistently.
6. **Pull plans out.** Move calendars to `U.WorkPlan`; let Work record actuals.
7. **Parameter blocks.** Make parameters explicit and bind them at start; your root‑cause analyses will get 10× easier.
### Consequences

| Benefits                                                                                                                 | Trade‑offs / mitigations                                                                   |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| **Auditable reality.** Costs, time, and quality attach to concrete runs; root‑cause analysis and accountability improve. | **More records.** You create Work instances; mitigate with templates and automation.       |
| **Sound roll‑ups.** Γ\_time/Γ\_work turn roll‑ups from hand‑waving into declared policy; KPIs become comparable.         | **Policy discipline.** You must choose union vs hull and an overlap policy; write it once. |
| **Cross‑context clarity.** CAC checks prevent silent model drift; bridges make acceptance explicit.                      | **Bridge upkeep.** Keep mappings short and focused; review at releases.                    |
| **4D extensional coherence.** Parts/overlaps/retries stop double‑counting and identity confusion.                        | **Learning curve.** Teach episode vs retry; include examples in onboarding.                |
### Relations

* **Builds on:** A.1 Holonic Foundation; A.1.1 `U.BoundedContext`; **U.System**; A.2 `U.Role`; A.2.1 `U.RoleAssignment`; A.2.2 `U.Capability`; A.3.1 `U.Method`; A.3.2 `U.MethodDescription`.
* **Coordinates with:** A.15 Role–Method–Work Alignment (the “four‑slot grammar”); B.1 Γ (aggregation) for resource/time operators; E‑cluster lexical rules (L‑PROC/L‑FUNC).
* **Informs:** Reporting/KPI patterns; Assurance/evidence patterns (Work as the anchor for audits); Scheduling patterns (`U.WorkPlan` ↔ `U.Work` deltas).
### Didactic quick cards

* **What is Work?** *How it went this time* → dated, resourced, accountable.
* **Four‑slot grammar:** Who? **RoleAssigning**. Can? **Capability**. How? **Method/MethodDescription**. Did? **Work**.
* **CAC checks:** **Context** (judgement), **assignment** (valid RoleAssigning), **Standard** (acceptance criteria).
* **Roll‑ups:** `Γ_time = union` (utilization) or `hull` (lead time); `Γ_work` with a declared overlap policy.
* **Episodes vs retries:** same run split vs new run; write the policy.
* **Resource honesty:** actuals booked **only** to Work; estimates live in specs.
### A.15.1:End
## U.WorkPlan

### Context (plain‑language motivation)

Operations live on **time**. Even with perfect roles, abilities, and methods, nothing ships unless we **decide when and by whom** concrete runs **should** happen, under what **constraints** and **budgets**. Teams need a first‑class concept for **plans and schedules** that does **not** get confused with:

* the **semantic “way of doing”** (that is `U.Method`),
* the **written recipe** (that is `U.MethodDescription`),
* the **actual execution** (that is `U.Work`), or
* the **state laws** (that is `U.Dynamics`).

`U.WorkPlan` is that missing anchor.
### Problem (what breaks without WorkPlan)

1. **“Workflow = schedule” conflation.** Flowcharts or code are used as calendars; resource clashes and SLA misses follow.
2. **Plan/run blur.** Gantt bars or Kanban tickets are reported as if the work already happened; audits and costing degrade.
3. **Spec/time leakage.** People and calendars creep into MethodDescriptions; reuse and staffing agility collapse.
4. **No variance model.** Without planned baselines, deviations in time, cost, and quality cannot be explained or improved.
5. **Structure entanglement.** BoM and org charts get baked into “process” views; plans become brittle and unmaintainable.
### Forces (what we must balance)

| Force                              | Tension we resolve                                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Universality vs. domain idioms** | One plan concept that fits hospitals, fabs, data centers, and research labs—while honoring local terms. |
| **Commitment vs. flexibility**     | Plans must be firm enough to coordinate, yet easy to update as reality changes.                         |
| **Assignment vs. assignment**     | Plans may name intended performers; the actual assignment must still be checked at run time.           |
| **Budgets vs. actuals**            | Plans carry targets and reservations; only Work carries actual spend.                                   |
| **Decomposition vs. mapping**      | Plan tasks decompose conveniently; they do not force a shape on actual Work runs.                       |
### Solution — the U.WorkPlan as the time‑bound intention to execute Work

#### Definition

**`U.WorkPlan`** is an **`U.Episteme`** that **declares intended `U.Work` occurrences** over a horizon, with **planned windows**, **dependencies**, **intended performers** (as **role kinds** or **proposed RoleAssignings**), **resource budgets/reservations**, and **acceptance targets**—**within a `U.BoundedContext`**.

> **Strict distinction (memory aid):**
> **Method** = *how in principle*. **MethodDescription** = *how it is written*.
> **WorkPlan** = *when, by whom in intent, under which constraints*.
> **Work** = *how it went this time*.
#### Plan Items (what a WorkPlan is made of)

A `U.WorkPlan` **contains Plan Items** (think: scheduled tasks/ops), each of which typically states:

1. **Target Method/Spec** — the **Method** to be enacted and the **MethodDescription** intended for enactment.
2. **Planned window** — e.g., earliest start/latest finish, timebox, recurrence (cron‑like), blackout periods.
3. **Role requirements** — **role kinds** required (not people), optional **proposed RoleAssigning(s)** if pre‑assignment is allowed in the context.
4. **Capability thresholds** — minimal abilities required of the performer (checked at run time).
5. **Resource budgets/reservations** — planned energy/materials/machine slots/money; reservations on assets.
6. **Dependencies** — precedence/overlap permissions; gates/approvals.
7. **Acceptance targets** — quality windows/SLA targets to be judged when Work completes.
8. **Location/asset constraints** — where the run is expected to take place.
9. **Links to Service promises** (if any) — external commitments that this plan aims to satisfy.

> **Didactic guardrail:** **No logs or actuals** belong in a WorkPlan; **no step logic** or solver internals either—that’s the Method/Spec.
#### Clear distinctions (lexical sanity for “schedule/process/workflow”)

| If you say…                                 | In FPF it is…                                        | Why                                               |
| ------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------- |
| “The **schedule** for tomorrow’s surgeries” | **`U.WorkPlan`**                                     | Calendar of intended runs (who/when constraints). |
| “The **workflow** for appendectomy”         | **`U.MethodDescription`** (and `U.Method`)                  | Recipe and semantic way, not a calendar.          |
| “The **process** already ran at 10:00”      | **`U.Work`**                                         | A dated run with resources and outcomes.          |
| “The **thermodynamic process** path”        | **`U.Work`** (occurrence) + **`U.Dynamics`** (model) | A realized trajectory plus its model, not a plan. |
| “The **plan** assigns Dr. Lee”              | **WorkPlan** naming an **intended** RoleAssigning      | assignment is still validated at run time.       |
| “The **budget** for Shift‑B”                | **WorkPlan** (planned ledger)                        | Actual costs land on **Work**, not on the plan.   |

> **L‑SCHED (lexical rule).** In this document, words like **schedule**, **calendar**, **rota**, **Gantt**, **plan** point to **`U.WorkPlan`** unless explicitly redefined by a bounded context glossary.
#### Plan mereology (composition of plans ≠ composition of methods or runs)

Keep three separations crystal‑clear:

* **Method composition** (design‑time semantics) → produces **new Methods**.
* **Work composition** (run‑time occurrences) → produces **parent/child runs** with overlaps/episodes.
* **Plan mereology** (epistemic structure) → organizes **Plan Items** for coordination (phases, sprints, shifts), with **precedence** and **resource reservations**.

**Common relations among Plan Items:**

* **`Precedes_pl` / `DependsOn_pl`** — start/finish constraints and gates.
* **`MayOverlap_pl` / `MutuallyExclusive_pl`** — allowed overlaps vs exclusive windows.
* **`Refines_pl`** — a child plan item tightens windows/budgets of a parent.
* **`Alternative_pl`** — planned alternatives (e.g., backup rig, backup team).

**Didactic rule:** A Plan Item **does not force** an identical Work shape; mapping is via **fulfilment** and **variance** (see §6).
#### How WorkPlan meets Work (fulfilment & variance)

When reality happens, each `U.Work` may:

* **Fulfil** a Plan Item — link `plannedAs → PlanItem`.
* **Partially fulfil** — multiple Work instances share one Plan Item (e.g., split run), or one Work fulfils several Plan Items (e.g., consolidated batch).
* **Deviate** — execute with method/spec substitution, different window, different performer (still valid or policy‑exception).
* **Be unplanned** — Work with no Plan Item (emergency, ad‑hoc); must be labeled as such.

**Variance dimensions** the plan expects to report on:

* **Schedule variance (Δt):** early/late vs planned window.
* **Cost variance (Δc):** actual resource spend vs budget.
* **Scope variance:** different Method/Spec than planned (with justification).
* **Quality variance:** acceptance verdict vs target.
* **Assignment variance:** intended vs actual RoleAssigning.

> **Manager’s view:** A plan that cannot report variance is a calendar picture, not a management tool.
### What a good WorkPlan states (review checklist)

Use this as a human‑readable checklist (not a rigid schema):

1. **Horizon & cadence** (e.g., “W36 surgeries, daily ETL”).
2. **Plan Items** with: target Method/Spec, planned windows, dependencies.
3. **Role requirements** (kinds) and **intended assignments** (optional, context‑lawful).
4. **Capability thresholds** and **safety envelopes**.
5. **Resource budgets** and **reservations** on assets.
6. **Acceptance targets** (SLA/quality windows).
7. **Bridges** if plan spans **multiple contexts** (operations ↔ audit/regulatory).
8. **Baseline/version** and **change notes** (so variance is attributable).
9. **Policy pointers** (episode policy, overlap policy for Work roll‑ups if needed for KPIs).
10. **Exceptions path** (how ad‑hoc/emergency work is planned post‑factum).
### Archetypal grounding (parallel domains)

#### Hospital OR day plan (shift rota + cases)

* **WorkPlan:** `OR_DayPlan_2025‑08‑12`.
* **Plan Items:** `Case#1 Appendectomy`, `Case#2 Hernia`, with windows, Context assignments, and surgeon **role kinds**; anesthetist **intended RoleAssigning** provided.
* **Budgets:** OR time blocks, consumables envelopes.
* **Fulfilment:** Each surgery Work links to its Plan Item; variances computed (over‑run time, substitutions).
#### Fab maintenance weekend (asset reservations)

* **WorkPlan:** `Fab_Maintenance_W36`.
* **Plan Items:** `Tool_42 chamber clean`, `Tool_13 calibration`; **MutuallyExclusive\_pl** with production slots.
* **Reservations:** nitrogen, DI water, metrology window.
* **Fulfilment:** Actual clean Work happens earlier; variance logged as **early** with cost underrun.
#### Data‑center rollout (multi‑context plan)

* **WorkPlan:** `DC_Rollout_Phase‑2`.
* **Bridges:** Ops context ↔ Security Audit context (different acceptance targets).
* **Plan Items:** `Deploy Service A`, `Pen‑test A`; dependencies across contexts.
* **Fulfilment:** Deployment Work passes ops targets; audit Work passes later—variance reported per context.
### Bias‑Annotation (as in E‑cluster)

* **Lenses tested:** `Did`, `Prag`, `Arch`, `Epist`.
* **Scope declaration:** Universal; meanings of windows/budgets/permissions are **context‑local** via `U.BoundedContext`.
* **Rationale:** Elevates **planning/scheduling** to a first‑class episteme that coordinates Methods, RoleAssignings, and Work without conflation.
### A.15.2:End
## SlotFillingsPlanItem

> **Tech-name:** `SlotFillingsPlanItem`
> **Plain-name:** planned slot-fillings baseline item (planned baseline)
> **Type:** Architectural (A)
> **Status:** Stable
> **Normativity:** Normative (unless explicitly marked informative)
> **Placement:** Part A → A.15 (Work & WorkPlanning)
> **Builds on:** pattern template (E.8), `U.WorkPlan` (A.15.2), Work enactment discipline (A.15.1 / TGA), Context discipline (E.10.D1), `MechSuiteDescription` (A.6.7), conformance discipline (E.19), publication/view discipline (E.17; views are projections, not places of meaning)
> **Used by:** planned-baseline requirements from suites/kits; P2W (selection → WorkPlanning → WorkEnactment); Part G universalization
> **Purpose (one line):** provide a universal, context-explicit **planned baseline** that maps a slot-owner’s `SlotKind`s to **planned fillers**, to be consumed by Work enactment where launch values are finalized.

**Minting notes (informative)**
* **Mint vs reuse:** This pattern mints the kind name `SlotFillingsPlanItem`. It reuses existing Core terms and disciplines (e.g., `U.WorkPlan.PlanItem`, SlotKind/ValueKind/RefKind/refMode discipline, edition pinning, `U.BoundedContext`, and the P2W split between WorkPlanning and WorkEnactment).
* **`SlotFillingsPlanItem` (kind name):** keep the suffix `PlanItem` to preserve the WorkPlanning locus. Do not mint aliases like *SlotBinding…* (conflicts with the A.6.5 binding discipline) or *SlotValue…* (ambiguous owner/context).
* **Anchor names:** if any anchors in §4.2 are later materialized as formal field names, keep `…_ref` only for fields whose values are concrete RefKind handles, and keep `…_id` only for identifiers. Avoid introducing generic placeholders like `SpecRef/PolicyRef/GateRef` inside this pattern; prefer existing concrete ref kinds (or a dedicated DRR+LEX step).
* **Row vocabulary:** treat `SlotFillingRow` and `PlannedFiller` as *internal* names of this pattern unless/until a separate DRR+LEX step promotes them to shared tokens.

### Problem frame

FPF frequently needs to make **reproducible, reviewable choices** about *what fills which conceptual slot* (spec refs, policy refs, mechanism-instance refs, time selectors, evidence hooks, etc.) **before** any Work is enacted. These choices must be visible as a planned baseline for a concrete P2W slice (CG-frame / path slice / publication scope), and must remain distinct from run-time “actuals” and gate decisions.

However, absent a universal WorkPlanning artifact for “architecture-by-planned-slot-filling”, authors tend to hide these choices inside mechanism prose, CG/CN specs, ad-hoc cards, or informal checklists—making Part G patterns difficult to universalize and making Work audit trails ambiguous.

`SlotFillingsPlanItem` addresses this by defining a **WorkPlan PlanItem kind** whose job is to state, in one place and with explicit context, a mapping:

> *(Target slot owner, slot kind) → planned filler (ByValue | ByRef(<concrete RefKind>), with edition pins when needed)*

and to do so in a form that can be cited by Work enactment and by suite/kit contract pins, without collapsing into “execution” or “decision logging”.
### Problem (what breaks without it)

Without an explicit `SlotFillingsPlanItem` baseline, at least six failure modes recur:

1. **Hidden slot ownership and meaning drift:** a planned filler is stated without making explicit *whose* slot set is being filled, allowing silent reinterpretation of `SlotKind`s across kits/suites.

2. **Plan/execution collapse:** plan documents get “backfilled” with run-time values, so there is no stable planned baseline and no clean variance trail. WorkPlan explicitly warns against this. 

3. **Implicit time (“latest”) and implicit recency:** planned claims about comparability or launch readiness omit an explicit `Γ_time`, which violates the time discipline (“no implicit recency”). 

4. **Edition ambiguity:** references to methods/policies/specs are not edition-pinned where reproducibility requires it, or the plan mutates the edition vector instead of citing pinned editions (edition changes are crossings, not “plan edits”). 
   A particularly harmful subtype is **edition-key backfill**: retroactively editing a previously used baseline so that an edition-key change looks like an innocent PlanItem edit (hiding the required GateCrossing witness and breaking audit traceability).

5. **Crossing invisibility:** cross-context/plane expectations (Bridge + policy ids) are not stated at plan time, so later gate crossings appear as “magic” rather than traceable expected constraints.

6. **G-pattern fragmentation:** each Part G pattern invents its own place to stash planned refs (method pick, comparator pick, QD archive config, etc.), blocking a clean “G.Core” universal layer and making modular reuse brittle.
### Forces (what we must balance)

* **Strict distinction:** planned baseline is not a run-time witness; launch values are finalized only in Work enactment. 
* **Context must be explicit:** every normative claim/rule is context-bound; the PlanItem must carry its context rather than relying on file location or prose. 
* **Time must be explicit:** no implicit “latest”; any plan that will be cited by comparability/launch checks needs an explicit `Γ_time` selector/rule. 
* **SlotKind meaning is stable:** the plan may choose fillers, but must not reinterpret SlotKinds or smuggle new semantics into indices.
* **Derived indices must not become “places of meaning”:** projections like “planned spec refs” are useful, but must remain derivable from the authoritative rows.
* **Conceptual, not procedural:** no solver steps, no lints, no “data governance”; this is an epistemic object used by humans in review.
* **Supports universalization:** one PlanItem pattern must be usable across the whole of Part G, not just G.5.
* **Integrates with suites/kits:** suites may require a planned-baseline ref and may act as slot owners. 

| Force | Tension |
| --- | --- |
| Plan/run split | Plan must be citeable without containing run-time values. |
| Slot meaning stability | SlotKinds must not drift by implicit owner changes. |
| Edition honesty | Baselines must pin editions where meaning changes; avoid “latest”. |
| Suite/kit modularity | Suites define contracts; baselines choose fillers for a plan instance. |
| Auditability | A reader must reconstruct “what was planned” without chasing hidden defaults. |
| Extensibility | Allow suite-specialized variants without breaking universal core. |
### Solution

#### A.15.3:4.1 Definition

A `SlotFillingsPlanItem` is a **kind of `U.WorkPlan.PlanItem`** whose content is a **planned slot-fillings ledger** for a *single* slot owner, within an explicit P2W context.

It is a **WorkPlanning baseline**, intended to be:

* produced/approved in WorkPlanning,
* **cited** by downstream Work enactment (as planned baseline),
* compared against actual fillings (variance recorded in Work, not by rewriting the plan). 

**Normative note (I/D/Spec vs views):** A `SlotFillingsPlanItem` is a Description-level planning episteme (a PlanItem). It MAY be projected into `U.View` (e.g., `TechCard(SlotFillingsPlanItemRef)`), but any view is strictly a projection and MUST NOT introduce additional claims or “shadow defaults”.
#### A.15.3:4.2 Core conceptual descriptors (not a data schema)

A conformant `SlotFillingsPlanItem` SHALL provide the following description (names are indicative; the semantics are normative):

1. **PlanItem core (from A.15.2)**
   The PlanItem MUST remain a planning artifact: it may include assumptions, dependencies, constraints, expected artifacts, and notes; it MUST NOT contain run-time logs/actuals. 

2. **Target slot owner**

   * `target_slot_owner_ref : <concrete …DescriptionRef>` (required)
     Identifies the **owner of the SlotKind set** being filled (e.g., a kit description or a suite description).
     The slot owner MUST be referenced as an **edition-addressable Description episteme** (a concrete `…DescriptionRef` such as `MechSuiteDescriptionRef`, `…KitDescriptionRef`, etc.),
     and MUST NOT be a mechanism `U.Mechanism.IntensionRef` (or any other intensional ref).
     A `MechSuiteDescription` MAY serve as a slot owner for this purpose.
     If the slot owner’s SlotKind interface is edition-sensitive (or expected to evolve), the reference MUST be edition-pinned (e.g., `target_slot_owner_ref.edition`) whenever the PlanItem is used as a reproducibility baseline.

3. **Described entity and grounding (for “whose measurements/choices?”)**

   * `described_entity_ref : <concrete RefKind>` (required)
     The referent is the *described entity* (C.2.3 role): the thing the planned baseline is **about**.
     It MUST NOT be silently conflated with a holon. (Example: a baseline can be about a width/measure while the grounding holon is a stool with that width.)
     Use a concrete RefKind of the described entity (e.g., `U.HolonRef`, `U.MeasureRef`, …). Do **not** mint a new generic `EntityRef` token inside this pattern.
   * `grounding_holon_ref? : U.HolonRef` (optional; required when the described entity is not itself a holon and a grounding holon is needed for plane/frame anchoring)
   * `reference_plane? : ReferencePlane` (optional; required when not unambiguously derivable from cited context artifacts such as CG-frame/spec pins)

4. **Explicit planning context** (no hidden context)

   * `bounded_context_ref : U.BoundedContextRef` (required)
   * `cg_frame_ref? : CGFrameRef` (recommended when the fillings feed CG legality/selection)
   * `path_slice_id? : PathSliceId` (recommended for P2W reproducibility)
   * `publication_scope_id? : PublicationScopeId` (recommended if the plan will be surfaced in publication-facing views)
     These anchors exist because context is mandatory for claims/rules in FPF-style authoring. 

5. **Explicit time selector** (no implicit recency)

   * exactly one of:

     * `Γ_time_selector : Γ_timeSelector` (ByValue), or
     * `Γ_time_rule_ref : Γ_timeRuleRef` (RefKind)
       This MUST be present whenever the plan is intended to support comparability/launch-related downstream checks. 

6. **Expected guard pins** (refs/expectations only; no gate decisions)

   * `expected_usm_guard_pins : [USM.CompareGuard | USM.LaunchGuard]` (ByValue; subset of `{USM.CompareGuard, USM.LaunchGuard}`)
     These lexemes are reserved for `USM.Guards` **pins** (gate-level surfaces), not for mechanism operator names.
     If `USM.LaunchGuard` is expected, the plan MUST include enough pins/refs to make that guard executable downstream (explicit `Γ_time_*`, pinned editions where needed, and evidence hook anchors).
     The PlanItem MUST NOT include outcomes for these guards and MUST NOT emulate gate decisions; it only records *expectations* and *required anchors*.

   * `guard_owner_gate_ref? : <concrete OperationalGateRefKind>` (refs only; required when `expected_usm_guard_pins` is non-empty unless unambiguously derivable)
     Identifies the gate that owns/aggregates `GuardFail` outcomes (via the `GuardOwnerGateSlot` discipline). This remains an expectation pin, not a decision log.
     (Use the concrete RefKind that addresses `OperationalGate(profile)` in A.21. If such a RefKind does not yet exist, treat this as a DRR+LEX item.)

7. **Planned evidence anchors (pin refs only)**

   * `planned_evidence_pin_refs? : [<concrete …PinRef>…]`
     These are anchors to *where* evidence will be placed or cited (typically SCR/RSCR pins; optionally other pin kinds explicitly allowed by the downstream guard regime),
     not the evidence itself.

8. **The planned slot-fillings ledger (authoritative rows)**

   * `planned_fillings : [SlotFillingRow+]` where:

     `SlotFillingRow := ⟨ slot_kind, planned_filler, edition_pin? ⟩`

     * `slot_kind : SlotKind`
       A SlotKind provided by the `target_slot_owner_ref` (the PlanItem MUST NOT reinterpret SlotKind meaning).
       Unless the slot owner explicitly declares the slot as multi-valued, each `slot_kind` SHALL appear **at most once** in `planned_fillings`.
     * `planned_filler : PlannedFiller` where:
       `PlannedFiller := ByValue(value) | ByRef(ref : <concrete RefKind>)`
       In `ByRef(…)`, the `ref` MUST be of a **concrete RefKind** (e.g., `…SpecRef`, `…PolicyRef`, `…MethodDescriptionRef`);
       the PlanItem MUST NOT use an untyped/generic “Ref” / “RefKind” placeholder.
       The chosen filler MUST conform to the SlotSpec discipline of the slot owner (A.6.5-style: `refMode ∈ {ByValue | <concrete RefKind>}`).
       Changes to planned fillers are described using the A.6.5 verb discipline: ByValue content change (`fill/assign/update`) vs ref retargeting (`retarget`) vs ref resolution (`resolve`), never by “renaming the slot”.
     * `edition_pin? : EditionId`
       Required only when reproducibility depends on an edition **and** the planned filler cannot carry an edition pin directly (preferred: `…DescriptionRef.edition` on the ref itself).
       If both the planned filler ref and the row provide edition pinning, they MUST agree (mismatch ⇒ nonconformant).
       ByValue rows SHOULD NOT carry edition pins unless the pinned edition is explicitly tied to a cited external artifact (e.g., a referenced rule/policy/method description).

9. **Derived indices (optional; never a second source of truth)**

   * `planned_spec_ref_index? : [<concrete …SpecRef>…]`
   * `planned_policy_ref_index? : [<concrete …PolicyRef>…]`
   * `planned_mechanism_instance_ref_index? : [<concrete …MechanismInstanceRef>…]`
     If any of these are present, they MUST be **derivable projections** of `planned_fillings`; any mismatch is nonconformant.
     (These are *categories* of refs extracted from the authoritative rows, not an invitation to introduce new generic `SpecRef/PolicyRef` token-kinds.)

10. **Expected crossing policy pins (refs only; no crossing witnesses)**

   * `expected_crossing_policy_refs? : [⟨bridge_card_ref, phi_policy_id, psi_policy_id?, phi_plane_policy_id?, reference_plane(src,tgt)⟩ …]`
     These communicate what the plan expects will be needed for crossings, without claiming that a crossing has occurred.
     `bridge_card_ref` is expected to pin a Bridge identity/channel (BridgeId + channel) and to be auditable via downstream CrossingBundle/UTS rows.
     This section states **Bridge-only** expectations; it MUST NOT introduce non-Bridge crossing mechanisms, and it MUST NOT embed CL/Φ/Ψ/Φ_plane tables (refs/policy-ids/pins only).

   * `expected_crossing_bundle_refs? : [CrossingBundleRef…]` (optional)
     Permitted only when the plan is explicitly citing already-published CrossingBundle baselines (e.g., “fixed context constants”); otherwise, the PlanItem SHALL state only expected policy pins and allow the crossing witness to appear at the gate/work level.

11. **Notes (didactic, non-normative)**

* `planned_filling_notes?`
  Helpful narrative for reviewers; must not embed new claims that contradict the rows.
#### A.15.3:4.2.1 Canonical skeleton (Show)

The following compact pseudo-record illustrates the intended *canonical minimum*: explicit context + explicit time + a few authoritative rows.

```
SlotFillingsPlanItem := ⟨
  kind = SlotFillingsPlanItem,
  target_slot_owner_ref = CHRMechanismSuiteDescriptionRef@edition(E_suite),
  described_entity_ref = U.HolonRef(H:described-entity), // or another concrete RefKind per C.2.3
  grounding_holon_ref = U.HolonRef(H:grounding-holon)?,  // when the described entity is not itself a holon
  bounded_context_ref = U.BoundedContextRef(BC:context),
  cg_frame_ref = CGFrameRef(CG:frame),              // optional but typical for G.* legality/selection
  path_slice_id = PathSliceId(P2W:slice),           // optional but typical for reproducibility
  Γ_time_selector = point(t0),                      // no implicit “latest”
  expected_usm_guard_pins = {USM.CompareGuard, USM.LaunchGuard},
  planned_evidence_pin_refs = [RSCR.PinRef(RSCR:evidence-anchor)],
  planned_fillings = [
    ⟨ slot_kind = CNSpecSlot, planned_filler = ByRef(CNSpecRef(CN:…@edition(E_cn))) ⟩,
    ⟨ slot_kind = CGSpecSlot, planned_filler = ByRef(CGSpecRef(CG:…@edition(E_cg))) ⟩,
    ⟨ slot_kind = ScoringMethodDescriptionSlot,
      planned_filler = ByRef(ScoringMethodDescriptionRef(M:…@edition(E_m))) ⟩
  ]
⟩
```
#### A.15.3:4.3 Relation to Work enactment (planned baseline vs actuals)

* A `SlotFillingsPlanItem` is **not** a witness of `FinalizeLaunchValues`.
  Launch values (actuals) occur only in Work enactment, and their witness belongs in Work/audit surfaces, not in this PlanItem. 

* Deviation at execution time is allowed, but it must be recorded as **variance in Work**, and the plan must not be rewritten to match the execution. 
  When a Work enactment claims to follow a planned baseline, the Work MUST cite the `SlotFillingsPlanItem` in its Audit as the planned baseline reference, and MUST record any variance against it (rather than “backfilling” the plan).
  The baseline citation SHOULD be edition-addressable (i.e., the Work cites a stable PlanItem edition), so that later PlanItem revisions cannot erase what was actually planned.
  If the baseline needs to change (including any edition-pinned ref changes), author a **new PlanItem edition** (or a new PlanItem) and treat the difference as a planning change—not as a retroactive edit of the previously cited baseline.
#### A.15.3:4.4 Relation to suites/kits

* Any suite/kit that requires a “planned baseline” may require and cite a reference to a `SlotFillingsPlanItem` via its contract pins; `MechSuiteDescription` explicitly provides a place for such a requirement.
#### Variants

1. **Suite-specialized PlanItem (Refinement)**
   A suite may define `XSuiteSlotFillingsPlanItem ⊑ SlotFillingsPlanItem` with:

   * fixed `target_slot_owner_ref = XSuiteDescriptionRef`,
   * additional required rows (e.g., mandatory pinned `CGSpecRef`, `CNSpecRef`, suite-required mechanism instance refs),
   * additional required expected pins (guards, crossing policies).

2. **Minimal vs crossing-aware variants**

   * *Minimal:* includes only context + planned rows + time selector.
   * *Crossing-aware:* adds `expected_crossing_policy_ref[]` and explicit `reference_plane`.

3. **Evidence-gated variant**
   For workflows where `USM.LaunchGuard` is expected, require `planned_evidence_pin_refs[]` and explicitly pin the relevant edition set needed for the later guard.
#### Non-goals

* Not a mechanism; it performs no operations and publishes no operator signatures.
* Not a `…Spec`; it is not an acceptance harness and does not replace CN-Spec or CG-Spec.
* Not a hiding place for acceptance thresholds: any threshold-like semantics MUST live in explicit Acceptance/Policy artifacts (and be referenced/pinned), not smuggled in as anonymous ByValue numbers.
* Not a gate log: it MUST NOT contain `GateDecision` / `DecisionLog`, and MUST NOT claim that a crossing occurred.
* Not a run-time witness: it MUST NOT contain `FinalizeLaunchValues` actuals.
* Not a publication surface: it may be projected to views, but it is not “the card” itself. Any view MUST be an explicit projection (e.g., `TechCard(PlanItemRef)`), and unchecked presentation drift is a known failure mode.
#### When to use

Use `SlotFillingsPlanItem` whenever:

* a workflow will be enacted through P2W and you need a **planned baseline** for what fills a suite/kit’s slots;
* you must pin editions/time policies explicitly (e.g., legality gates, comparator sets, transport registries);
* you are refactoring/authoring Part G patterns and want a uniform place to record selected refs/policies/mechanism instances;
* you expect a LaunchGate or any guard-based eligibility check to be meaningful and traceable.
#### Implementation notes

**Informative authoring guidance (conceptual):**

1. Choose one `target_slot_owner_ref` per PlanItem. If multiple slot owners are involved, author multiple `SlotFillingsPlanItem`s (one per owner) to keep slot meaning unambiguous.
2. Fill rows by SlotKind, not by positional arguments or “index numbers”.
3. If any downstream reasoning may hinge on “now vs then”, supply `Γ_time_selector` or `Γ_time_rule_ref` explicitly.
4. Prefer edition-pinned references when the downstream step is intended to be reproducible across review cycles.
5. Use derived indices only as projections for reader convenience; never maintain them independently.
6. If a PlanItem has been cited as a baseline by a Work, do not “edit it in place” to match reality. Create a new PlanItem edition and let Work record variance and/or the required crossing witnesses.
### Archetypal Grounding (Tell–Show–Show; System / Episteme)

#### Archetype 1: CHR suite planned baseline for lawful characterization

**Tell.** A team plans a characterization workflow over a CG-frame that uses a CHR mechanism suite. The suite requires an explicit planned baseline reference.

**Show (failure without `SlotFillingsPlanItem`).** The “plan” is implicit: it says “use the latest CG-Spec and the current best comparator; compute scores and launch” without an explicit `Γ_time`, without edition pins, and without a stable mapping from SlotKinds to chosen fillers. Review later cannot distinguish: (i) what was planned, (ii) what was executed, and (iii) what changed via a crossing / edition-key shift.

**Show (repair with `SlotFillingsPlanItem`).** A conformant `SlotFillingsPlanItem`:
* targets `CHRMechanismSuiteDescriptionRef` as the slot owner (and pins its edition if used as a reproducibility baseline),
* pins `CNSpecRef` and `CGSpecRef` (editions pinned where reproducibility requires),
* pins a `ScoringMethodDescriptionRef.edition` (e.g., a monotone scoring family) and/or a set-valued method family (e.g., conformal-style set predictions),
* declares `Γ_time_selector = point(t0)` (no implicit “latest”),
* declares `expected_usm_guard_pins = {USM.CompareGuard, USM.LaunchGuard}`,
* includes evidence pin refs that will later be populated/used in Work enactment.

The resulting Work enactment cites this PlanItem as the planned baseline; any substitution (e.g., retargeting a method description ref) appears as Work variance (and, when relevant, as a crossing witness), not as a retroactive plan rewrite.
#### Archetype 2: Archive/QD selection with edition-sensitive descriptors

**Tell.** A workflow plans to return an **archive** (quality-diversity style) rather than a single winner. The selection pipeline depends on descriptor maps and distance definitions that are edition-sensitive.

**Show (failure without `SlotFillingsPlanItem`).** Descriptor-map and distance-definition drift is discovered only after the fact: an “archive” is produced, but reviewers cannot reconstruct which descriptor edition and distance definition were assumed at planning time, and the published view/card becomes the de facto (and mutable) “source of truth”.

**Show (repair with `SlotFillingsPlanItem`).** A conformant `SlotFillingsPlanItem`:
* targets an archive-selection kit/suite as `target_slot_owner_ref`,
* pins `DescriptorMapDescriptionRef.edition` and `DistanceDefDescriptionRef.edition` (or their kit equivalents),
* states `expected_usm_guard_pins = {USM.CompareGuard}` (if no LaunchGate is expected yet),
* records expected crossing policy pins if descriptors are reused cross-context.

This prevents “silent” descriptor drift across iterations and makes Part G’s archive-related extensions composable rather than embedded in selector prose.
### Bias-Annotation

Lenses tested: **Gov**, **Arch**, **Onto/Epist**, **Prag**, **Did**. Scope: **Universal**.

| Lens | Bias / limitation introduced by the pattern | Mitigation |
| --- | --- | --- |
| Gov | Baseline immutability and variance recording can be misread as bureaucracy rather than epistemic hygiene. | Keep the baseline minimal; use suite-specialized refinements only when a suite contract truly requires them. |
| Arch | Enforces a clean P2W seam and discourages “configuration hidden in mechanisms”. This can expose weakly-specified slot owners earlier. | Treat that friction as an architectural signal; refine the slot-owner interface rather than hiding choices in prose. |
| Onto/Epist | Strongly biases toward explicit context/time/edition pinning; exploratory reasoning may feel constrained. | Use minimal variants (context + rows + time selector) for exploration; graduate to pinned editions only when reproducibility is required. |
| Prag | Increases upfront authoring cost (explicit context, time, edition pins). | Use derived indices as projections for reader navigation; avoid duplicating content on views/cards. |
| Did | Biases against “one true card” habits by treating views as projections; may clash with existing documentation culture. | Provide a TechCard/PlainView projection explicitly, but keep the PlanItem as the semantic authority. |
### Conformance Checklist

| ID          | Check (normative)                                                                                                                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CC-A15.3-01 | The object is a `U.WorkPlan.PlanItem` with `kind = SlotFillingsPlanItem`, and obeys WorkPlan guardrails (no logs/actuals, no step logic).                                                                           |
| CC-A15.3-02 | `target_slot_owner_ref` is present and identifies a real SlotKind owner (kit/suite); SlotKinds in rows are interpreted only within that owner.                                                                      |
| CC-A15.3-02a | If the PlanItem is used as a reproducibility baseline and the slot owner is edition-addressable, `target_slot_owner_ref` is edition-pinned (e.g., `…DescriptionRef.edition`).                                      |
| CC-A15.3-02b | `target_slot_owner_ref` is a **Description-level** ref (e.g., `MechSuiteDescriptionRef`, `…KitDescriptionRef`) and MUST NOT be an intensional ref (e.g., `U.Mechanism.IntensionRef`). |
| CC‑A15.3‑02c (single slot owner) | A `SlotFillingsPlanItem` targets exactly one slot owner via `target_slot_owner_ref`. If multiple slot owners are involved, they MUST be represented by multiple PlanItems (one per owner). |
| CC-A15.3-03 | `described_entity_ref` is present. If `grounding_holon_ref` and/or `reference_plane` are omitted, they must be unambiguously derivable from cited context artifacts (e.g., the pinned CG-frame/spec context).      |
| CC-A15.3-03a | `described_entity_ref` is a concrete RefKind (no generic “EntityRef” placeholder is introduced by this pattern). |
| CC-A15.3-04 | Context anchors are explicit at least to `bounded_context_ref`; if the fillings support legality/selection, then CG-frame/path-slice anchors are present.                                                           |
| CC-A15.3-05 | Time is explicit: the item includes `Γ_time_selector` or `Γ_time_rule_ref`; “latest/current” without explicit `Γ_time` is nonconformant.                                                                             |
| CC-A15.3-05a | Exactly one of `Γ_time_selector` and `Γ_time_rule_ref` is present (XOR); both-present or both-absent is nonconformant. |
| CC-A15.3-06 | `planned_fillings` is the authoritative source: each row is `⟨slot_kind, planned_filler, edition_pin?⟩`; each planned filler is explicit `ByValue` vs `ByRef(ref-of-concrete-RefKind)` and conforms to the slot owner’s SlotSpec discipline (no silent slot-meaning changes). |
| CC-A15.3-06a | Unless the slot owner declares a slot as multi-valued, `planned_fillings` contains **no duplicate** `slot_kind` rows (duplicate keys ⇒ nonconformant). |
| CC-A15.3-06b | If both a row and its `ByRef(…)` filler carry edition pinning, they MUST agree; mismatch ⇒ nonconformant. |
| CC-A15.3-07 | Any present “indices” (`planned_*_ref_index`) are derivable projections of `planned_fillings` and are not independently authored; mismatch ⇒ nonconformant.                                                         |
| CC-A15.3-08 | The PlanItem contains no `GateDecision` / `DecisionLog`, and makes no claim that a crossing occurred; only expected policy pins may be stated.                                                                      |
| CC-A15.3-09 | The PlanItem contains no `FinalizeLaunchValues` witness and no launch-time actuals; launch values are finalized only in Work enactment.                                                                             |
| CC-A15.3-10 | If `expected_usm_guard_pins` includes `USM.LaunchGuard`, the PlanItem contains sufficient pins/refs (explicit `Γ_time_*` + pinned editions + evidence pin anchors + `guard_owner_gate_ref` or an unambiguous derivation) to make downstream guard execution possible.     |
| CC-A15.3-10a | In this pattern, “evidence anchors” are expressed as pin refs (e.g., SCR/RSCR pins). Introducing a new generic `EvidenceHookRef` token requires an explicit DRR+LEX step; absent that, use concrete pin refs. |
| CC-A15.3-11 | The PlanItem does not claim to set or mutate the edition vector (`editions{…}` / edition_key). It may pin editions and may state *expected* edition-sensitive crossings, but edition changes themselves are crossings (gate/work-level witnesses). |
| CC-A15.3-12 | When used as a baseline for enactment, execution-time deviations are recorded as Work variance and the baseline PlanItem is not rewritten (“no backfill”); the Work Audit cites the PlanItem (preferably by edition-addressable ref) as the planned baseline reference.  |
| CC-A15.3-12a | Any change to edition-pinned refs that would alter the effective edition-key for legality/selection MUST NOT be retroactively applied to the already-cited baseline PlanItem. Treat it as (i) a new PlanItem edition for future enactments and (ii) variance and/or required crossing witnesses for the enactment that deviated. |
| CC-A15.3-13 | If `expected_crossing_policy_refs` is present, it contains **refs/policy-ids only** (BridgeCardRef + policy-id refs + plane ids); it MUST NOT embed CL/Φ/Ψ/Φ_plane tables or introduce non-Bridge transport edges. |
| CC‑A15.3‑13a (crossing bundles are not witnesses) | `expected_crossing_bundle_refs` (if present) is used only to cite already‑published, context‑constant CrossingBundle baselines; it MUST NOT be used to claim that a crossing occurred for this enactment, nor to substitute for gate/work‑level crossing witnesses. |
| CC‑A15.3‑14 (view projection discipline) | Any `U.View` projection of a `SlotFillingsPlanItem` (e.g., `TechCard(PlanItemRef)`, `PlainView(PlanItemRef)`) MUST be an explicit projection that introduces no additional claims, defaults, or rows beyond the PlanItem; any additional semantics on the view is nonconformant. |
### Common Anti‑Patterns and How to Avoid Them

#### Plan-as-execution

A plan document says: “Use the latest CG-Spec and the current best comparator; compute scores and launch.”
This is nonconformant because it omits explicit `Γ_time`, omits edition pins, collapses planning into execution, and provides no stable baseline for variance/audit.
#### Anti-example: Edition-key change disguised as a plan edit (backfill)

A team executes Work while actually using `CGSpecRef@edition(E2)` (and/or `ComparatorSetRef@edition(E2)`), but the previously approved baseline PlanItem had pinned `@edition(E1)`.
Later, instead of recording variance and the required GateCrossing witness for the **edition-key change**, someone edits the baseline PlanItem “in place” to replace `E1 → E2`,
and then claims “no variance; we followed the plan”.

This is nonconformant because it:
* collapses planning into execution (retroactive baseline editing),
* hides an edition-key change that is crossing-relevant,
* destroys reproducibility and breaks Work/Audit traceability.

Correct handling: keep the old baseline intact; record variance in Work and, where applicable, require the gate/work-level crossing witness (UTS/CrossingBundle + policy-id pins),
or produce a new PlanItem edition as the new planned baseline for subsequent enactments.
### Consequences

| Benefit | Trade‑off / Cost | Notes / Mitigation |
| --- | --- | --- |
| Improved modularity | Requires an explicit baseline artifact | Keep baselines minimal; specialise only when a suite truly needs it. |
| Audit clarity | More up‑front authoring work | The burden is intentional: it buys attributable variance and prevents “mystery defaults”. |
| Edition honesty | Forces authors to think about editions and time | Use editioned refs and time selectors by ref; keep actual `Γ_time` in Work evidence. |
| Controlled specialisation | Multiple PlanItem kinds may exist (core + suite‑specialised) | Use DRR to document why specialisation is warranted; keep the universal core stable. |
### Rationale

This pattern exists to give WorkPlanning an explicit, citeable place to commit to “which artifacts will fill which slots” without collapsing into run-time state.

Keeping the baseline bound to exactly one slot owner makes SlotKind semantics checkable and prevents accidental cross-owner slot drift.

Treating indices as derived projections preserves a single source of truth (the rows) while still enabling human-friendly navigation or tooling acceleration.

Finally, by disallowing run-time witnesses (launch values, observed values, concrete `Γ_time`) the pattern enforces the plan/run split and keeps audit variance attributable to an explicit baseline rather than to shifting defaults.
### SoTA‑Echoing (informative)

This pattern aligns with post‑2015 practice in multiple traditions while deliberately staying notationally/tool independent.

* **ISO/IEC/IEEE 12207:2017** — **Adopt** the separation between planning artifacts and execution artifacts plus baseline/change-control concepts; **Adapt** them into a lightweight, citeable PlanItem kind; **Reject** prescribing any specific process tooling as normative inside FPF.
* **ISO 26262:2018** — **Adopt** the emphasis on traceability, change impact visibility, and preventing retroactive “paper compliance”; **Adapt** it into baseline immutability + variance reporting; **Reject** treating safety certification structure as a required envelope for all contexts.
* **NIST SP 800-128 Rev.1 (2020)** — **Adopt** baseline management and deviation recording as an audit primitive; **Adapt** by expressing baselines as epistemic, context-bound references rather than machine configuration states; **Reject** security-tooling prescriptions as a dependency of the conceptual model.
* **Forsgren, Humble, Kim (2018), _Accelerate_** — **Adopt** the empirical lesson that explicit change tracking and small, attributable deltas improve reliability; **Adapt** by making the baseline the anchor for fulfilment/variance; **Reject** any “one true pipeline” or vendor-specific operational recipe.
* **Morris (2021), _Infrastructure as Code_ (2nd ed.)** — **Adopt** the desired-state vs observed-state distinction and the discipline of explicit declarations; **Adapt** by keeping declarations as plan-level epistemes rather than deployment manifests; **Reject** binding the model to any specific IaC syntax or platform.
### Relations

* **Builds on / governed by:**
  * **A.15.2 `U.WorkPlan`** — container + PlanItem discipline; baseline citeability.
  * **A.6.5 slot discipline** — SlotKind/RefKind hygiene and binding-time separation.
  * **E.10.D1 Context discipline** — explicit context/edition; no implicit “latest”.
  * **E.18 / TGA** — keeps `FinalizeLaunchValues` strictly in WorkEnactment; pin/guard discipline.
* **E.17 / Publication discipline** — views are projections; no new semantics on cards.
* **Interacts with / complements:**
  * **A.6.7 `MechSuiteDescription`** — suites may require the presence of a planned baseline ref/pin without embedding planned fillers or launch values.
  * **A.15.1 Work / WorkEnactment discipline** — fulfilment and variance are recorded downstream against this baseline.
  * **C3.2-S-02 Time discipline** — time selection policy may be pinned by ref; run-time `Γ_time` stays in Work evidence.
### A.15.3:End
## Language-State Transduction Coordination

> **Type:** Architectural (A)
> **Status:** Stable
> **Normativity:** Normative unless marked informative

**Plain-name.** Language-state move coordination.

**Start here when.** Your first honest artefact is a cue, not yet a claim, requirement, method, or work record, and you need to name the next lawful move without pretending that one downstream owner has already taken over.

**First output.** A small typed move note or early preservation-to-routing note that names the source publication form, target publication form, target owner, and MVPK face where that face matters.

**Typical next owners.** `A.16.1` for early preservation, `B.4.1` for route publication, `B.5.2.0` for cue-derived abductive prompting, later endpoint owners such as `A.6.P`, `A.6.A`, and `A.6.Q`, and `A.16.2` when the right move is reopen/backoff/respecify/retire.

**Common wrong escalations / reroutes.** If history itself must be published as an accountable trajectory, reroute to `A.16.0`; if you are already doing slot-explicit semantic repair, reroute to `A.6.P`, `A.6.Q`, or `A.6.A`; if the publication target is a graph object in its own right, reroute to `E.18`.

### Problem frame

Once positions in the declared language-state `U.CharacteristicSpace` chart from `C.2.2a` are explicit, teams still need lawful move kinds for how governed `U.Episteme` publications change, narrow, reopen, or hand off across that chart. Those moves must not collapse into a second formality ladder, a generic workflow story, or an invisible sequence of owner replacements.

A single local move note is often enough. Only some cases need a full trajectory account. The coordination pattern therefore has to stand on its own while still remaining compatible with `A.16.0` when lineage, branch structure, loss notes, or handoff history become governance-relevant.
### Problem

Without a dedicated coordination pattern, authors either misuse `F0-F9`, force every cue into anomaly/problem language too early, let reopen and backoff happen informally with no explicit guards, or over-wrap every local move in a meta-account that should have remained optional.
### Forces

| Force | Tension |
|---|---|
| **Coordination vs duplication** | Coordinate moves over the declared language-state chart without recreating `A.19` or `E.18`. |
| **Local sufficiency vs history visibility** | Let a typed local move note stand on its own, while still supporting richer history publication when that history matters. |
| **Early capture vs endpoint discipline** | Admit weakly articulated governed `U.Episteme` publications without losing endpoint-routing discipline. |
| **Forward development vs lawful retreat** | Support formalization and operationalization, but also reopening, sketch-backoff, respecification, and lawful retirement. |
### Solution

`A.16` owns only lawful move kinds, their guards, and docking rules for how governed `U.Episteme` publications may be related across declared language-state positions. It does **not** own `F`, does **not** define the trajectory-account semantics itself, and does **not** define a rival graph calculus beside `E.18`.

A conforming move may be published as a local move note without any `U.LanguageStateTransductionTrajectory` wrapper. `A.16.0` is used only when lineage, branch structure, loss notes, supersession, retirement, bridge-sensitive history, or owner handoff has governance value that should be published as an account in its own right.

Observation itself is a precursor condition typically published through `B.4.1`. `A.16` move kinds begin once a cue is deliberately noticed, stabilized, route-published, reopened, formalized, operationalized, respecified, or retired under explicit move discipline.

#### Owned move family

| Move | What it does | Typical source condition | Typical publication effect |
|---|---|---|---|
| `notice` | marks that a weak cue is being deliberately preserved | low or unstable articulation | cue preservation becomes explicit enough for early publication work |
| `stabilize` | strengthens the local shape without forcing route or endpoint choice | cue already noticed | cue nucleus, anchors, or witness structure become steadier |
| `route` | publishes downstream route plurality or a selected route through an explicit route-bearing form | stabilized cue exists | `RoutedCueSet` or equivalent route-bearing publication makes route state explicit |
| `projection` | publishes route-bounded partialization without pretending full endpoint ownership | route is explicit and one aspect is being foregrounded | a typed route-bounded publication form is emitted on an existing MVPK face, with loss notes and reopen conditions |
| `formalize` | increases explicit symbolic or normal-form structure | articulation threshold is met | stronger explicit form is published; new evidence-generation crossings stay visible if required |
| `operationalize` | turns a selected route toward method / work / gate use | action-bearing or control-bearing route exists | operational hooks become explicit; work crossings stay visible if new world-facing work is required |
| `reopen` | relaxes closure while preserving the current family if possible | route or frame no longer holds cleanly | closure drops and rivals re-open |
| `sketchBackoff` | moves to a weaker publication form | stronger form over-commits the current publication | weaker exploratory form becomes lawful again |
| `respecify` | keeps the broad family but revises framing scaffold, facet-profile reading, or route contract | current framing remains plausible but is stated wrongly | a new framing scaffold or route contract replaces the old one while continuity stays explicit |
| `retire` | declares that a cue, route-bearing publication, or branch is no longer current or no longer worth preserving | stronger successor exists, supporting grounds have collapsed, or authority has been withdrawn entirely | retirement / withdrawal becomes explicit together with successor or no-successor note |

`A.16` owns these **move names**, not the publication forms that may result from them. `U.PreArticulationCuePack`, `RoutedCueSet`, `U.AbductivePrompt`, and later endpoint-owned forms are publication forms under their own owners; they are not move kinds.

Here `projection` remains the move name, but its reading is tightened: it is route-bounded partialization. The resulting publication must be a **typed publication form** rendered on an existing MVPK face. Naming only the face is insufficient; naming only an untyped placeholder is insufficient.

`respecify` is intentionally narrower than semantic repair. In `A.16`, it may change framing scaffold, route contract, or facet-profile reading while preserving the broad family. Slot-explicit semantic rewrite and endpoint-local lexical repair remain with later owners such as `A.6.P`, `A.6.Q`, and `A.6.A`.
#### Guard discipline

Move guards are stated over named facets from `C.2.LS`, together with witnesses, scope, and `GammaTime` selectors where needed. In practice this means explicit reference to `AE` (`C.2.4`), `CD` (`C.2.5`), `LanguageStateAnchoringMode` (`C.2.6`), and `LanguageStateRepresentationFactorBundle` (`C.2.7`), either facetwise or through one published facet profile. No move may be justified by vague prose such as "the idea matured" without naming what changed in articulation, closure, anchoring, representation, or route state.
#### Docking discipline

After `route`, `projection`, `formalize`, or `operationalize`, the next lawful publication shall keep three layers distinct:

- the **publication form** now being issued (for example `U.PreArticulationCuePack`, `RoutedCueSet`, `U.AbductivePrompt`, or a form owned under a later owner);
- the **owner** that owns that form (`A.16.1`, `B.4.1`, `B.5.2.0`, `A.6.P`, `A.6.A`, `A.6.Q`, `B.5.2`, `A.15`, `C.25`, or another named owner);
- the **MVPK face**, when rendering matters, that carries that publication.

Naming only the owner is insufficient because owners are not forms. Naming only the face is insufficient because faces are not forms. A lawful move note states the owned publication form first, then the owner, then the face if the face matters.
#### Effect-free versus work-requiring moves

Some `formalize` and `operationalize` moves are effect-free epistemic rewrites or publication-strengthening moves over already available grounds. Others require new measurements, experiments, instrumentation, execution, or other `U.Work`. When the latter happens, the move note shall expose the crossing or handoff explicitly; `A.16` does not pretend that world-facing work occurred inside the language layer.
#### Move-note threshold and path publication discipline

A typed local move note is sufficient when a small move or short move chain can be kept reconstructible without publishing extra lineage machinery.

Use `A.16.0` only when at least one of the following is load-bearing:

- derivation, supersession, fork, merge, or retirement structure;
- a multi-move history whose compression would hide owner or authority changes;
- visible loss notes or reopen conditions spanning more than one move;
- responsibility handoff or bridge/viewpoint entry that depends on upstream history.

If the history itself must be published as a graph object, reuse `E.18`. `A.16` owns move legality; `A.16.0` packages trajectory accounts; `E.18` owns graph-level path publication.
### Archetypal Grounding

**Tell.** A language-state move is not "the episteme became better". It is a typed transduction: articulation rose, closure narrowed, route plurality was published, one route was foregrounded, a framing scaffold was replaced, or a branch was lawfully retired.

**Show (System).** An operator alert note about a disturbance may go `notice -> stabilize -> route -> operationalize`, then later `reopen` when counter-evidence arrives, or `retire` one branch when a stronger successor route takes over.

**Show (Episteme).** An inquiry cue pack about a felt or trace-anchored discrepancy cue may go `notice -> stabilize -> route -> projection -> formalize`, or `reopen -> sketchBackoff -> respecify` if the chosen framing proves too strong.
### Bias-Annotation

The pattern biases authors toward explicit move-typing and away from folk stories such as "it naturally matured". That bias is intentional.
### Conformance Checklist

- `CC-A.16-1` `A.16` **MUST NOT** redefine `F` or publish a second formality ladder.
- `CC-A.16-2` A conforming move note **MAY** stand alone; `A.16.0` **SHALL NOT** be treated as mandatory wrapper syntax for every move.
- `CC-A.16-3` Every move kind **SHALL** name its preconditions and postconditions over explicit language-state facets, route state, or authority state.
- `CC-A.16-4` Publication form, owner, and MVPK face **SHALL NOT** be collapsed into one unnamed target.
- `CC-A.16-5` Multi-route state inside one governed member **SHALL NOT** be confused with lineage fork across several successor members.
- `CC-A.16-6` `respecify` **SHALL NOT** be used to hide slot-explicit semantic repair that belongs to later repair owners.
- `CC-A.16-7` Retreat or retirement **SHALL** preserve, withdraw, or discard prior witnesses and authority explicitly.
- `CC-A.16-8` Published path structures **SHOULD** reuse `E.18` when a graph publication object is needed.
- `CC-A.16-9` `AuthorityState` and `EndpointAdmissionProfile` reuse **SHALL NOT** be treated as new owners, new route-bearing forms, or substitutes for gate or work state.
- `CC-A.16-10` A summarized multi-move publication **SHALL** keep intermediate owner transitions reconstructible; otherwise the case must reopen or publish richer history.
### Common Anti-Patterns and How to Avoid Them

- **Trajectory-wrapper inflation.** Do not wrap every local move in `A.16.0`. Publish a local move note unless history has its own governance value.
- **Owner-as-form collapse.** Do not write as if `A.6.P`, `B.5.2`, or `A.15` were publication forms. Name the owned form and the owner separately.
- **Form-face collapse.** Do not treat an MVPK face as if it were the publication form itself. Name both when both matter.
- **Irreversible maturity story.** Reopen, sketch-backoff, respecify, and retirement are lawful moves, not failures of the trajectory discipline.
- **Silent branch retirement.** Do not let one route or branch disappear without a retirement or supersession note.
- **Route/fork confusion.** Several live routes in one `RoutedCueSet` are not yet a lineage fork.
### Consequences

The benefit is a clean owner for language-state transductions and a lawful place for both tightening and retreat without owner blur. The trade-off is more explicit move bookkeeping.
### Rationale

This separation keeps `C.2.3` as the sole owner of formality while `C.2.2a` / `A.19` define position semantics, `A.16.0` packages only the history that deserves publication as an account, and `A.16` defines move legality.
### SoTA-Echoing

**Claim 1.** Best-known current incident-response, exploratory design, and inquiry practice treats advance, backoff, reopening, and retirement as governed transitions rather than as one irreversible maturity climb.

**Practice / source / alignment / adoption.** Contemporary incident review, exploratory design, and inquiry practice after 2015 keeps rollback, reopen, and retirement explicit because otherwise later readers over-credit earlier weak forms. This pattern **adopts** explicit retreat and retirement, **adapts** them to typed publication forms, route states, and authority states, and **rejects** the still-popular shortcut where every change is narrated as one-way maturation.

**Claim 2.** Best-known current provenance, path-publication, and model-evaluation practice distinguishes a local transition note from a heavier published history object.

**Practice / source / alignment / adoption.** Contemporary provenance and evaluation practice separates lightweight transition marking from heavier account publication when branch structure, loss notes, or handoff history become governance-relevant. This pattern **adopts** that separation, **adapts** it through the `A.16` / `A.16.0` / `E.18` split, and **rejects** both extremes: wrapping every move in a mandatory trajectory object and compressing a governance-relevant move history into one vague maturity sentence.

**Local stance.** The load-bearing SoTA claim for this pattern is narrow: lawful language-state movement needs typed move notes, explicit authority effects, and explicit retreat/retirement options, but it does not need a second ladder or a mandatory wrapper around every move.
### Relations

- Builds on: `C.2.2a`, `C.2.LS`, `C.2.4`, `C.2.5`, `C.2.6`, `C.2.7`, `A.18`, `A.19`.
- Coordinates with: `A.16.0`, `A.16.1`, `A.16.2`, `B.4.1`, `B.5.2.0`, `A.6.P`, `A.6.A`, `A.6.Q`, `E.18`.
- Constrains: language-state move publication and docking.
### Lawful Move Matrix

#### Typical publication consequences

| Move | Typical source publication state | Typical resulting publication state or form | What must become explicit |
|---|---|---|---|
| `notice` | observation trace, weak cue, provisional note | preservation-worthiness of the cue becomes explicit | why the cue counts as worth preserving |
| `stabilize` | weakly preserved cue | `U.PreArticulationCuePack` or equivalent early preservation form becomes lawful | cue nucleus, anchors, witnesses, and preservation rationale |
| `route` | cue pack or stabilized note | `RoutedCueSet` or equivalent route-bearing publication becomes lawful | route plurality, selected route if any, route rationale, route authority state |
| `projection` | routed cue or selected route | a typed route-bounded publication form rendered on an existing MVPK face | what is foregrounded, what is omitted, and how reopen remains lawful |
| `formalize` | explicit but not yet formal-enough publication | a stronger form owned by a later formal owner becomes lawful | new symbolic or slot structure and owner entry |
| `operationalize` | action-bearing or control-bearing publication | a method/work/gate-facing form owned by a later owner becomes lawful | hook owner, guard, authority basis, and work crossing if any |
| `reopen` | route-bearing or endpoint-bound publication | same family with reduced closure | which rivals reopen and what authority falls |
| `sketchBackoff` | over-rigid form | weaker exploratory form such as `U.PreArticulationCuePack` or `RoutedCueSet` | withdrawn authority and retained witnesses |
| `respecify` | plausible family under wrong framing scaffold | same family with revised framing scaffold or route contract | replaced framing commitments and invariants that stay fixed |
| `retire` | cue pack, route-bearing publication, or branch | retired / withdrawn state with successor or no-successor note | why continuation stopped and what now carries authority |
#### Invariance reminder

A lawful move may change articulation, closure, representation, route, authority, or publication form, but it shall not silently rewrite owner boundaries. A move is not permission to retype a cue into any convenient owner.
### Worked Move Notes

#### Incident-control move note

An operator alert note about a production disturbance may move:

`notice -> stabilize -> route -> operationalize`

The alert note does not need to become an anomaly statement immediately. It may first become a cue pack, then a routed cue set, and only then a typed operational form under the later owner.
#### Inquiry move note

An inquiry cue pack about a model-vs-observation discrepancy may move:

`notice -> stabilize -> route -> projection -> formalize`

Later, if the selected framing over-commits, the lawful continuation may be:

`reopen -> sketchBackoff -> respecify`
#### Retired branch

A routed cue set may initially keep both evaluative and abductive routes live. If later review shows the evaluative branch was unsupported, the lawful continuation is not silent disappearance but explicit retirement of that branch, while the abductive branch remains current.
#### False-maturity leap to reject

The following is not lawful:

`notice -> gate decision`

unless explicit intermediate publication and owner transitions justify it. The trajectory discipline exists precisely to block such invisible leaps.
### Authoring and Review Guidance

#### Author prompt

When naming a move, the author should say:

- what the source publication form is,
- what the target publication form is,
- which owner owns the target form,
- which MVPK face matters if rendering matters,
- which facet or route-state change justifies the move,
- what authority effect follows,
- and what remains invariant.
#### Review prompt

A reviewer should ask:

- is the move a real transduction or just rhetorical relabeling?
- does the move preserve witnesses and route provenance appropriately?
- is route plurality being confused with lineage fork?
- did a later owner silently absorb the publication too early?
- if retreat or retirement occurred, was the authority drop made explicit?
#### Integration reminder

When path publication becomes important as an object in its own right, move semantics stay in `A.16`, the optional history package stays in `A.16.0`, and the path publication object still belongs to `E.18`.
### Migration and Boundary Notes

#### Migration from old formality-ladder talk

Older prose that narrates a cue as moving from "informal to formal" should be unpacked into the relevant `A.16` move plus the relevant facet, route-state, and authority changes. A one-axis maturity story is not enough.
#### Boundary reminder

If authors find themselves using `A.16` to justify measurement legality, bridge substitution, endpoint ontology, or slot-explicit semantic repair, they have crossed out of this owner's scope.
### Move Package Discipline

Publish moves as small typed transduction notes rather than as narrative adjectives.

#### Minimal move note

A conforming move note should name:

- the **source publication form**,
- the **target publication form**,
- the **target owner**,
- the **move kind**,
- the **facet or route-state changes** that justify the move,
- the **authority effect**,
- and the **witnesses or traces** that preserve continuity.

If those fields already make the move reconstructible, the note does not need `A.16.0`.
#### Source and target must both be typed

"The episteme was refined" is insufficient. `A.16` requires typed source and target forms so owner boundaries stay visible.
#### Witness continuity

Keep continuity explicit when anchors, contrasts, traces, or exemplars survive. If continuity breaks, state the break directly rather than smoothing it over in maturity prose.
### Authority, Route Plurality, and Fork Law

The pattern is not just about movement; it is about lawful movement under explicit authority boundaries.

#### Multi-route state versus lineage fork

A **multi-route state** means one governed member still keeps several downstream directions live inside one publication such as `RoutedCueSet`.

A **lineage fork** means separate successor members have already been published, each with its own authority, losses, and future handoff semantics.

The first is plurality inside one member. The second is explicit branching of lineage. Reviewers shall not treat them as the same thing.
#### Four route / authority states

A governed publication after route work is usually in one of four states:

- **open plurality** - several downstream directions remain live;
- **selected-but-not-owned** - one route is preferred, but the publication is still in an early or seam owner;
- **endpoint-owned** - a later owner now carries the relevant publication and responsibility;
- **retired / withdrawn** - the publication or branch is no longer current and survives only as historical continuity.

Confusing these states is one of the main causes of premature endpoint language.
#### AuthorityState extraction note

The four states above may be reused as `AuthorityState`, an extracted shared profile for corridor coordination and review.

That extraction does **not** create a new owner. It reuses the state vocabulary already owned here for later cross-references in `B.4.1`, `B.5.2.0`, `A.6.P`, `A.6.Q`, `A.6.A`, and `A.15`.

`AuthorityState` names authority posture after route work. It does not replace `routeDecision`, `selectedRoute`, `routeAuthorityState`, route-bearing publication ownership, gate state, or work-execution state. Any `endpoint-owned` state still names the downstream owner explicitly.
#### Authority may rise, stay bounded, fall, or retire

A move may:

- **raise authority**, as when a routed cue becomes a lawful endpoint-owned form;
- **keep authority bounded**, as when a route-bearing publication clarifies one route without claiming endpoint ownership;
- **lower authority**, as when reopening or sketch-backoff withdraws prior closure or route force;
- **retire authority**, as when a branch or publication is explicitly withdrawn from current use.

The authority effect should be named as carefully as the move kind itself.
#### Boundary to owner replacement

`A.16` never authorizes a silent owner replacement. If a route crosses into `A.6.P`, `B.5.2`, `A.15`, `C.25`, or another endpoint owner, that owner and the owned publication form must be named explicitly. `A.16` coordinates the crossing; it does not absorb the destination owner's semantics.
#### EndpointAdmissionProfile extraction note

The corridor may later reuse an `EndpointAdmissionProfile` as a declarative host-derived profile for lawful handoff from language-state publications to later owners.

That profile is stated over already-owned conditions: declared language-state positions in `C.2.2a`, facet readings in `C.2.LS` and `C.2.4`-`C.2.7`, explicit route state in `B.4.1`, prompt-readiness in `B.5.2.0`, and witness or grounding conditions that are already visible in the publication chain.

`EndpointAdmissionProfile` decides whether handoff is lawful; it does not own the downstream publication form itself. A relation-like skeleton may therefore be admitted toward `A.6.P`; an explicit open question with rival-set may be admitted toward `B.5.2.0`; evaluative or action-inviting material may be admitted toward `A.6.Q` or `A.6.A`; executable docking may be admitted toward `A.15`.

No admission result makes a later owner optional. Tone, style, or mere apparent explicitness is never sufficient on its own; the relevant owner conditions still have to be named and met.
### Worked Failure and Recovery Cases

#### Premature endpoint capture

A weak cue is observed and quickly described as if it were already a requirement. Under `A.16`, this is rejected because the move history is missing: the publication should first be noticed, stabilized, and route-published. The recovery is not to defend the over-strong label, but to reopen and publish the earlier route-bearing form.
#### Silent route drift

A note begins as evaluative pressure but later starts driving work planning. If this shift is not published, the route drift remains invisible. `A.16` requires either a new route-bearing publication, an explicit operationalization note, or an explicit handoff to a later owner.
#### Lawful retreat after over-formalization

A note is formalized too early into a relation-like shape, but later review shows the anchors are still unstable. The correct continuation is not to leave the relation form in place and quietly reinterpret it. The correct continuation is `reopen -> sketchBackoff`, preserving what still holds and lowering the authority of what no longer does.
#### Silent branch disappearance

A route-bearing publication originally kept two candidate routes live. Later text talks only as if one route ever existed. Reviewers should treat that as silent branch laundering unless the abandoned route was explicitly retired, merged, or shown never to have become its own branch.
#### Form-owner-face collapse

A note says only `the move publishes a Tech face` or `the move enters A.6.P` and never names the actual publication form. That wording is non-conforming because it collapses three different layers into one phrase. The repair is to name the publication form first, then the owner, then the MVPK face if the face matters for rendering or review.
### Multi-Move Composition and Path Publication

#### Compound move rule

Many published histories are short move chains such as `notice -> stabilize -> route -> projection` into `U.AbductivePrompt`, or `endpoint-owned form -> reopen -> sketchBackoff -> route`. A conforming publication may summarize such a chain only if the intermediate owner transitions remain reconstructible.
#### Move-by-move authority reading

Read authority move by move. Later strengthening does not retroactively authorize earlier weak forms, and later retreat or retirement does not erase the fact that stronger authority once existed.
#### A.16.0 threshold

When a move history acquires governance value of its own, publish it through `A.16.0` rather than overloading one local move note with hidden lineage structure.
#### E.18 threshold

When the history must be published as a path object in a graph sense, reuse `E.18`. `A.16` still owns move semantics.
### Comparative Move Law and Boundary Tests

#### Comparing move histories

Move histories may be compared across contexts only if the compared moves are typed by publication form, owner, and authority effect. Comparing one context's `route -> projection` chain to another context's `cue -> requirement` leap as though they were the same "formalization speed" is a category mistake.
#### No maturity-ladder compression

A multi-move path shall not be redescribed as one generic climb in maturity, rigor, or readiness. The lawful comparison is over move kinds, facet shifts, route states, owner crossings, and authority effects.
#### Boundary test for silent path laundering

If a later endpoint claim depends on prior move publications that are not visible anywhere in the publication chain, reviewers should assume silent path laundering until the missing move records are supplied. `A.16` exists precisely to prevent such invisible transitions.
### Review Matrix for Integration Integrity

A reviewer can test an `A.16` move or move chain with six questions:

1. **Are the source and target forms typed?** If not, the move is too vague.
2. **Are owner and face kept distinct from the form?** If not, the move collapses layers.
3. **Is the authority effect explicit?** If not, later owner boundaries will drift.
4. **Is route plurality being confused with lineage fork?** If yes, the history is being misread.
5. **Are intermediate move publications suppressed in a way that changes the reading?** If yes, the chain is over-compressed.
6. **Has `A.16` started to impersonate a later owner or a trajectory wrapper?** If yes, the relevant later owner or `A.16.0` threshold needs to be named explicitly.

This matrix keeps the integration layer narrow while still making its move semantics inspectable.
### A.16:End

---
## U.LanguageStateTransductionTrajectory - Optional trajectory-account normal form over the language-state U.CharacteristicSpace

> **Type:** Architectural (A)
> **Status:** Draft
> **Normativity:** Normative unless marked informative

**Plain-name.** Language-state transduction trajectory.

**Builds on.**
`C.2.2a`, `A.16`, `A.19`, `E.17`, `E.18`, `E.10`, `F.18`.

**Used by.**
`A.16.1`, `A.16.2`, `B.4.1`, `B.5.2.0`, `A.6.P`, `A.6.Q`, `A.6.A`, `F.9.1`, `E.17.1`.

### Problem frame

In engineering, inquiry, operator, and management practice, teams sometimes need more than a local move note. When branch structure, supersession, retirement, handoff, bridge-sensitive loss, or multi-step owner change matters, readers need one place where the history of successive governed `U.Episteme` publications is made explicit.

Cue packs, routed cue sets, abductive prompts, typed route-bounded projection publications, partial normal forms, and later endpoint-bound records are publication forms that may appear in that history. They are not the raw disturbances, telemetry traces, model outputs, bodily tensions, or carrier documents that ground it.

What must remain intelligible is therefore not a myth that one unchanged object literally `moves`. What must remain intelligible is a lineage of successive governed `U.Episteme` publications, together with the load-bearing links among them, when that history itself has governance value.
### Problem

Without an explicit trajectory-account pattern for those heavier cases:

1. history is mistaken for generic workflow rather than for governed transduction over a declared language-state `U.CharacteristicSpace`;
2. early seam publications are confused with endpoint-owned forms;
3. forks, merges, route retirement, supersession, and route-sensitive loss become implicit and unverifiable;
4. every local move is either over-wrapped in ad hoc history prose or under-wrapped in a way that hides handoff and authority change;
5. bridge and viewpoint docking inherit under-described upstream history.
### Forces

| Force | Tension |
| --- | --- |
| **History value vs wrapper inflation** | Publish lineage only when it matters, without making trajectory accounts mandatory around every lawful move. |
| **Lineage fidelity vs readable publication** | Trajectory history must stay branch-aware without becoming unreadable bookkeeping. |
| **Seam usefulness vs endpoint discipline** | Upstream publications must be useful while remaining visibly upstream of endpoint ownership. |
| **Account clarity vs owner boundaries** | The trajectory pattern must explain heavy-history cases without taking over `A.19`, `A.16`, `E.17`, `E.18`, or endpoint semantics. |
| **Local transduction vs bridge entry** | The same trajectory may later cross viewpoint or context boundaries, but that crossing does not redefine the local trajectory owner. |
### Solution

`U.LanguageStateTransductionTrajectory` is the **optional** trajectory-account normal form that records how successive governed `U.Episteme` publications are linked across position claims in the declared language-state `U.CharacteristicSpace` chart named in `C.2.2a`.

It does **not** define position semantics, move legality, or publication-face ontology by itself. Those remain with `C.2.2a` / `A.19`, `A.16`, and `E.17` / `E.18` respectively.

It answers the question: `when history itself matters, which governed publication is current, which members precede or branch from it, which lawful moves relate them, which publication forms carry them, what was lost, and who now owns the next responsibility?`

#### Ontological subject and role lanes

In this cluster, keep six roles distinct:

- **current governed member** - the current `U.Episteme` publication under language-state governance;
- **lineage links** - explicit `derivedFrom`, `supersedes`, `forkedFrom`, `mergedFrom`, and retirement / no-successor links among governed members;
- **grounds / witnesses** - service disturbances, model-vs-observation discrepancies, traces, model outputs, bodily tensions, contrasts, or exemplars that justify the history;
- **publication forms** - cue packs, routed cue sets, prompt forms, typed route-bounded projection publications, partial normal forms, and endpoint-owned records through which lineage members are published;
- **publication faces** - the existing MVPK faces on which those publication forms are rendered when face typing matters;
- **carriers** - documents, console notes, cards, trace files, or model artefacts that hold or render those publications.

A multi-route state inside one current governed member is **not** yet a lineage fork. It becomes a fork only when distinct successor members are published and given their own authority, losses, or handoff semantics.

A trajectory step may add a new lineage member, revise the current member, or relate several members through fork, merge, supersession, or retirement. It does **not** mean that the source phenomenon itself has moved through the language-state chart.
#### Position-account discipline

The position read by this pattern is the slot-explicit claim defined in `C.2.2a`: a partial coordinate publication in the declared language-state `U.CharacteristicSpace`, where each basis slot publishes a `ValueSet(slot)`, interval, or other admissible set-valued claim.

Early seam publications may leave some slots unknown or wide. That uncertainty is lawful only if it is explicit. A trajectory account therefore records the position claims of the current lineage member and, when needed, of the predecessor or sibling members that justify the move reading.
#### Use threshold and core trajectory record

A single local `A.16` move note is sufficient when no load-bearing branch, loss, handoff, or supersession structure needs publication.

Use `U.LanguageStateTransductionTrajectory` when at least one of the following is load-bearing:

- derivation, supersession, fork, merge, or retirement structure;
- multi-step loss notes or reopen conditions that would be hidden by a compressed move note;
- responsibility handoff whose legitimacy depends on upstream history;
- bridge or viewpoint entry that depends on upstream route, loss, or lineage structure.

A conforming trajectory account then keeps at least the following explicit:

- the current governed member;
- predecessor, sibling, or ancestor references when the current reading depends on lineage structure;
- the lineage link kind (`derivedFrom`, `supersedes`, `forkedFrom`, `mergedFrom`, `retiredWithSuccessor`, `retiredWithoutSuccessor`, or another explicitly typed link);
- the current position claim and any load-bearing predecessor position claims;
- the typed move or move sequence that relates them;
- the publication form currently carrying the governed member and, if it matters, the MVPK face carrying that form;
- the next intended owner or handoff state;
- any loss note, reopen condition, branch-specific authority note, or bridge-sensitive note that matters.
#### Recorded move-family discipline

`U.LanguageStateTransductionTrajectory` records the governed `A.16` move family: `notice`, `stabilize`, `route`, `projection`, `formalize`, `operationalize`, `reopen`, `sketchBackoff`, `respecify`, and `retire`.

The point is not that every account uses every move. The point is that forward movement, retreat, reframing, and explicit retirement belong to one governed family when that history is worth publishing.

Detailed move guards remain with `A.16`. `A.16.0` records their use; it does not own them.
#### Seam publication and face discipline

A trajectory account may refer to seam publications that remain upstream of endpoint ownership. In the current cluster these include:

- `U.PreArticulationCuePack`;
- `RoutedCueSet`;
- `U.AbductivePrompt`;
- partial normal forms already typed elsewhere;
- other explicitly typed upstream publications that preserve non-endpoint status.

These are not a second publication-face ladder. They are typed publication forms rendered, when necessary, on existing MVPK faces under `E.17`.

Untyped placeholders such as "route-bounded publication face" are non-conformant in a trajectory account unless the text also names the actual publication form and, separately, the MVPK face if face typing matters.
#### Endpoint docking and responsibility handoff

A trajectory does not need to terminate in order to be useful. What matters is a visible docking milestone or responsibility handoff into an owner that is allowed to take the next contract.

Typical docking owners include:

- `A.6.P` for relation repair forms;
- `A.6.A` for action-invitation forms;
- `A.6.Q` for evaluative repair forms;
- `B.5.2` for later abductive work;
- `A.15` for method / work-facing forms;
- `C.25` for endpoint bundle structures.

A trajectory account should therefore name not only the docking owner but also the owned publication or record that now carries the next contract. Naming only the owner under-publishes the handoff.

After such a handoff, monitoring, maintenance, revisit, or later re-entry may continue through new lineage members or later trajectories. The pattern therefore distinguishes `lineage continuity` from `current owner responsibility`.
#### Effect-free moves versus work-requiring crossings

Some `formalize` and `operationalize` steps are effect-free epistemic transformations: rewriting, slot-explicit articulation, route-bounded partialization, view retargeting, or normal-form strengthening over already available grounds.

Other steps require new measurements, experiments, instrumentation, execution, or other `U.Work`. When that happens, the trajectory account shall publish the crossing or handoff explicitly rather than pretending that world-facing work occurred inside the language layer. `A.16.0` records that the crossing was required; the relevant work, gate, or endpoint owner records the world step itself.
#### Relation to A.16 and E.18

`U.LanguageStateTransductionTrajectory` is not an `E.18` path publication object, and `A.16.0` does **not** own the semantics of language-state movement.

- `A.19` plus `C.2.2a` own the declared characteristic-space reading of positions;
- `A.16` owns move kinds and move guards;
- `E.17` / `E.18` own publication-face discipline and graph-level path publication;
- endpoint owners own endpoint-local contracts.

`A.16.0` standardizes only the heavier history package for cases where that package is itself worth publication.
#### Bridge and viewpoint entry

A trajectory may later cross a viewpoint or context boundary. When that happens:

- bridge substitution licence remains with `F.9`;
- stance overlays remain with `F.9.1`;
- viewpoint reuse remains with `E.17.1`;
- endpoint-local semantics remain with their endpoint owners.

`A.16.0` only makes those entry points explicit so that later attachments do not float without an upstream history account.
### Archetypal Grounding

**Tell.** A language-state trajectory account is not `we kept refining the note`. It is an optional, lineage-aware account of successive `U.Episteme` publications, with declared position claims, move kinds, publication forms, losses, and next owners.

**Show (System).** A service disturbance is a system-side phenomenon, not the trajectory subject. It grounds an alerting episteme lineage. One stabilized cue pack may first keep two routes live in one `RoutedCueSet`; only later, if two distinct successor publications are actually issued, does the lineage fork.

**Show (Episteme).** A model-vs-observation discrepancy is a witness-level tension, not the occupant itself. Once preserved as a cue pack, the governed lineage may project into a typed prompt publication on one branch and later formalize on another, or it may reopen and retire one branch if the provisional route proves unsupported.
### Bias-Annotation

The pattern biases authors toward lineage-aware history accounts rather than stage stories about one magically maturing object. That bias is intentional when branch, loss, or handoff semantics matter. The counter-bias is equally intentional: do **not** publish a trajectory account when a local move note already suffices.
### Conformance Checklist

- `CC-A.16.0-1` `U.LanguageStateTransductionTrajectory` **SHALL NOT** be treated as mandatory wrapper syntax around every `A.16` move.
- `CC-A.16.0-2` A language-state trajectory account **SHALL** identify the current governed `U.Episteme` publication and **SHALL NOT** collapse grounds, publication forms, publication faces, carriers, and governed members into one unnamed moving thing.
- `CC-A.16.0-3` Position claims used in the trajectory **SHALL** be published as slot-explicit claims in the declared language-state `U.CharacteristicSpace`, not as folk stage labels.
- `CC-A.16.0-4` Fork, merge, supersession, derivation, and retirement **SHALL** be made explicit whenever the account depends on them.
- `CC-A.16.0-5` Publication form and MVPK face **SHALL NOT** be collapsed, and untyped seam placeholders **SHALL NOT** substitute for typed publication forms.
- `CC-A.16.0-6` `projection` **SHALL** be read as route-bounded partialization with visible loss notes and a lawful reopen path.
- `CC-A.16.0-7` Work-requiring `formalize` or `operationalize` steps **SHALL** expose the relevant crossing or handoff rather than pretending that `U.Work` occurred inside the language layer.
- `CC-A.16.0-8` When graph-level path publication is needed, authors **SHOULD** reuse `E.18` rather than inventing a rival path calculus here.
### Common Anti-Patterns and How to Avoid Them

- **Meta-wrapper inflation.** Treat `A.16.0` as obligatory around every move. Repair by publishing a local `A.16` move note unless history itself has governance value.
- **One-object myth.** Treat one frozen episteme as literally moving unchanged. Repair by publishing lineage members and their links.
- **Owner/form collapse.** Treat later owners as if they were publication forms. Repair by naming the owned form and the owner separately.
- **Form/face collapse.** Treat seam publications as if they minted a second MVPK face family. Repair by naming form and face separately.
- **Multi-route/fork collapse.** Treat several live routes in one governed member as if they were already several successor members.
- **Hidden work crossing.** Describe operationalization as purely linguistic when it actually required new world-facing work. Repair by publishing the crossing explicitly.
### Consequences

The benefit is that heavy-history language-state movement becomes lineage-aware, reviewable, and dockable without premature endpoint capture or metonymic collapse. The trade-off is more explicit publication of position claims, lineage links, move kinds, loss notes, and handoffs when history is worth publishing.
### Rationale

Language-state work needs one explicit trajectory-account normal form for the subset of cases where history itself matters. Without that account, readers have to reconstruct lineage, branch structure, retirement, and handoff semantics from fragments. With it overused, every local move becomes over-wrapped. The pattern exists to hold the middle line.
### SoTA-Echoing

The pattern matches contemporary practice in exploratory inquiry, operator-centered incident work, model probing, and structured design iteration: lawful progress sometimes requires visible intermediate publications, branch-aware history, disciplined retreat, and explicit handoffs rather than hidden jumps from cue to endpoint.
### Relations

- Builds on: `C.2.2a`, `A.16`, `A.19`, `E.17`, `E.18`.
- Coordinates with: `C.2.LS`, `A.16.1`, `A.16.2`, `B.4.1`, `B.5.2.0`, `B.5.2`, `A.6.P`, `A.6.Q`, `A.6.A`, `F.9`, `F.9.1`, `E.17.1`.
- Constrains: trajectory-account publication, branch visibility, seam publication reading, docking visibility, and anti-pipeline language across the cluster.
### Worked trajectories

#### Multi-route state before fork

A routed operator cue may first publish one governed member with both intervention and inquiry routes live inside one `RoutedCueSet`. That is still one member in a multi-route state. Only if separate successor publications are later issued for those two continuations does the lineage fork.
#### Inquiry trajectory with fork

An inquiry cue pack centered on a felt or trace-anchored discrepancy cue may first publish one governed member, then fork into:

- `notice -> stabilize -> route -> projection -> formalize`, with a cue-derived prompt publication carrying the explanatory branch, and
- `notice -> stabilize -> route -> projection -> operationalize`

if one branch supports explanatory work while another supports immediate probe or control work. The branches remain lawful only if the fork is visible and each branch keeps its own loss notes and handoff conditions.
#### Operator trajectory with retirement

An operator alert note about a service disturbance may move:

`notice -> stabilize -> route -> projection -> operationalize`

If one route later proves unsupported, the lawful continuation may include explicit retirement of that branch rather than silent disappearance. The retirement does not erase the prior branch; it withdraws authority and preserves continuity explicitly.
#### Bridge-sensitive trajectory

A route-bearing comparative note may move through a seam publication and only later dock to a bridge overlay or viewpoint bundle. The bridge or viewpoint attachment does not replace the trajectory account; it annotates or re-expresses a lineage that already exists.
### Trajectory publication package discipline

A publishable trajectory account should normally identify:

- the current governed `U.Episteme` publication;
- predecessor, sibling, or ancestor references when they are load-bearing;
- the lineage link kind;
- the current position claim and any load-bearing predecessor position claims;
- the move or move sequence being asserted;
- the current publication form and, if relevant, the MVPK face carrying it;
- the grounds or witnesses that make the history necessary;
- the next route, docking owner, or retirement state;
- the losses, open rivals, or reopen conditions that matter for continuation.

If these are missing, the publication is usually only lifecycle prose, not a conforming trajectory account.
### Review guidance

A reviewer should ask:

1. Is the author really describing history over the declared language-state `U.CharacteristicSpace`, or only narrating progress informally?
2. Is the current governed member distinct from the grounds, publication form, publication face, and carrier?
3. Is this history heavy enough to justify `A.16.0`, or would a local `A.16` move note have sufficed?
4. Are multi-route state and lineage fork being kept distinct?
5. Are derivation, supersession, fork, merge, or retirement links visible where the reading depends on them?
6. Is the current publication a seam publication or already an endpoint-owned form?
7. If `formalize` or `operationalize` required world-facing work, is the crossing or handoff explicit?
### Boundary notes

`A.16.0` does not replace `C.2.2a` / `A.19` position semantics, `A.16` move guards, `A.16.1` cue-pack semantics, `A.16.2` retreat / retirement semantics, `B.4.1` seam entry routing, `B.5.2.0` abductive prompt species, `E.17` face typing, `E.18` path publication, or any endpoint-local repair logic.

Its job is narrower and architectural: to make the heavier trajectory account visible only where lineage, branch, loss, retreat, retirement, and handoff need to be published as one intelligible package.
### A.16.0:End
## U.PreArticulationCuePack

> **Type:** Definitional (D)
> **Status:** Stable
> **Normativity:** Normative unless marked informative

**Plain-name.** Pre-articulation cue pack.

**Start here when.** Your first honest artefact is a preserve-worthy cue nucleus that should not yet be forced into a claim, route decision, method, or work record.

**First output.** One `U.PreArticulationCuePack` with an explicit cue nucleus, preservation rationale, primary witness or anchor when one is load-bearing, and any early lane candidates or route pressure that is already visible.

**Typical next owners.** `B.4.1` when route plurality or route authority becomes publishable, `B.5.2.0` for cue-derived abductive prompting, `A.6.P`, `A.6.A`, or `A.6.Q` once endpoint articulation threshold is actually met, and `A.16.2` when reopening or retirement becomes the truthful move.

**Common wrong escalations / reroutes.** Do not publish a cue pack as a route decision, anomaly statement, evaluative ascription, action invitation, or work record; if route authority is already explicit, reroute to `B.4.1`; if endpoint semantics are already stable, reroute to the later owner; if backoff or retirement is the real burden, reroute to `A.16.2`.

### Problem frame

Early governed `U.Episteme` publications can be worth preserving before route publication, prompt publication, relation repair, evaluative repair, action-invitation repair, method work, or later endpoint ownership. `U.PreArticulationCuePack` therefore exists as the earliest durable seam publication form for such pre-threshold material.

The cue pack is deliberately earlier than `RoutedCueSet`. It may carry weak directional pressure, but it is not yet the owner of route selection, route authority, or route rationale.
### Problem

Without an explicit cue-pack owner, such epistemes either disappear, are prematurely forced into `AnomalyStatement` or `Characteristic`, or leak into prose as vague cue/signal language, loose evaluative talk, fit-talk, or premature action-pressure language.
### Forces

| Force | Tension |
|---|---|
| **Weak shape vs publishability** | Preserve early cues without pretending they are already late endpoint objects. |
| **Pre-route preservation vs later routing** | Let cue preservation stand on its own before route publication is justified. |
| **Carrier awareness vs stack duplication** | Respect traces, bodies, and model states without creating a second carrier stack beside `A.7`. |
| **Plurality vs auditability** | Allow several plausible continuations without collapsing the cue pack into a route record. |
### Solution

`U.PreArticulationCuePack` is a typed publishable episteme form that serves as the earliest durable seam publication form inside the language-state cluster. It is not a claim, not a characteristic, not a method, not work, and not a route record. When rendered, it appears on an ordinary MVPK face; cue-pack status is a property of the publication form, not a rival face kind.

A cue pack may exist before any route is selected and even before route pressure can yet be named clearly. When route plurality or route authority becomes explicit enough to publish, ownership moves to `B.4.1` and `RoutedCueSet`.

#### Core shape

A conforming cue pack may publish:

- `cueNucleus`
- `preservationRationale?`
- `laneCandidates?`
- `routePressure?`
- `valenceProfile?`
- `languageStateClosureDegreeRef?`
- `languageStateFacetProfileRef?`
- `detector?`
- `primaryAnchor?`
- `candidateAnchors?`
- `primaryWitnessRef?`
- `witnessRefs?`
- `exemplars?`
- `contrasts?`
- `traceRefs?`
- `embodimentRefs?`
- `modelStateRefs?`
- `scope?`
- `GammaTime?`

`cueNucleus` names the minimal preserved core: what exactly is being kept visible rather than lost in carrier noise or premature endpoint wording.

`primaryWitnessRef` and `primaryAnchor` provide explicit triage when one witness or anchor is load-bearing for preservation. Secondary witnesses, anchors, traces, embodiment refs, and model-state refs may enrich the pack without displacing that primary nucleus.

`laneCandidates` and `routePressure` are early directional hints only. They are **not** selected route, route rationale, or route authority state. Those belong to `RoutedCueSet` under `B.4.1`.

The cue pack owns none of the facets it references. `primaryAnchor`, `candidateAnchors`, contrasts, and exemplars commonly support `AE` under `C.2.4`; `languageStateClosureDegreeRef` docks to `C.2.5`; anchoring and representation-factor refs dock to `C.2.6` and `C.2.7`; `languageStateFacetProfileRef` may bundle them through `C.2.LS`.

In this cluster, a cue is a salient epistemic nucleus extracted from witnesses, traces, felt tensions, model outputs, affordance hints, contrasts, or other grounds and made preservable as a pack. A raw signal-like trace counts as a cue only when that salience and preservability have been made explicit; otherwise it remains evidence, not yet a cue.
#### Ownership boundary

A cue pack may preserve:

- a cue nucleus,
- preservation rationale,
- primary and candidate anchors,
- primary and secondary witnesses,
- contrasts and exemplars,
- weak directional plurality or early route pressure.

A cue pack shall not silently serve as:

- a route decision record,
- a selected-route publication,
- a finished anomaly statement,
- a finished evaluative ascription,
- a finished action invitation,
- a method step,
- a work occurrence.
#### Transition discipline

A cue pack may lawfully feed:

- `B.4.1` once route plurality or route selection deserves explicit publication;
- `B.5.2.0` after a cue-derived abductive prompt is formed;
- `A.6.P` only once articulation threshold and relation-like shape are met;
- `A.16.2` when prior stabilization must be reopened, backed off, respecified, or retired.
### Archetypal Grounding

**Tell.** A cue pack says "there is a preserve-worthy cue nucleus here" without falsely claiming that a later route or endpoint form already exists.

**Show (System).** A console alert with traces and tension indicators may be worth preserving as a cue pack before anyone can honestly publish route selection, gate logic, or work execution.

**Show (Episteme).** A researcher's stabilized felt or trace-anchored discrepancy cue with exemplars and contrasts can be published as a cue pack before it becomes a routed cue set, an abductive prompt, or an anomaly statement.
### Bias-Annotation

This pattern biases authors toward preserving weak but meaningful cues instead of discarding them or disguising them as stronger forms. The counter-bias is deliberate as well: a cue pack must still name what is being preserved and why.
### Conformance Checklist

- `CC-A.16.1-1` A cue pack **SHALL NOT** be presented as a claim, characteristic, method, work occurrence, or route-decision record.
- `CC-A.16.1-2` A cue pack **SHALL** make `cueNucleus` explicit.
- `CC-A.16.1-3` When preservation depends on privileged grounding, `primaryWitnessRef` or `primaryAnchor` **SHALL** be explicit.
- `CC-A.16.1-4` `laneCandidates` and `routePressure` **MAY** be published early, but `selectedRoute`, `routeRationale`, and route authority state **SHALL NOT** be smuggled into the cue pack.
- `CC-A.16.1-5` If route pressure is not yet nameable, publication is still lawful only when `preservationRationale` and grounding make the preservation need explicit.
- `CC-A.16.1-6` Language-state, anchoring, and representation-factor details **MAY** be referenced, but their owners remain `C.2.LS`, `C.2.4`, `C.2.5`, `C.2.6`, and `C.2.7`.
- `CC-A.16.1-7` A cue pack **SHALL NOT** silently inherit endpoint authority that belongs to later owners.
### Common Anti-Patterns and How to Avoid Them

- **Cue as claim.** Do not promote the pack into a proposition without a later lawful move.
- **Cue as route record.** Do not let `selectedRoute`, route rationale, or route authority hide inside cue-pack prose.
- **Cue without nucleus.** Do not publish only refs and carriers while leaving the preserved core unnamed.
- **Cue without triage.** Do not pretend all witnesses or anchors are equally load-bearing when one clearly carries the preservation need.
- **Cue as carrier zoo.** Do not make `U.PreArticulationCuePack` a replacement for `A.7` carrier discipline.
### Consequences

The benefit is a lawful preservation form for early cues and a cleaner seam into routing and later endpoint patterns. The trade-off is one more explicit publication form that must be named and maintained.
### Rationale

`U.PreArticulationCuePack` is the earliest durable seam publication in the cluster. It keeps pre-threshold cues visible before route selection and without overloading `A.6.P`, `B.4.1`, or `B.5.2`.
### SoTA-Echoing

The pattern fits early cue capture in design, embodied cognition, incident triage, model interpretation, and focusing-like practice, where weak but real cues need preservation before route or endpoint choice.
### Relations

- Builds on: `C.2.2a`, `A.16`, `C.2.LS`, `A.7`.
- Coordinates with: `A.16.0`, `C.2.4`, `C.2.5`, `C.2.6`, `C.2.7`, `B.4.1`, `B.5.2.0`, `A.6.A`, `A.6.Q`, `A.16.2`.
- Constrains: publication of pre-threshold cues.
### Worked Examples and Invalid Publications

#### Operator cue pack

A valid operator-facing cue pack might preserve:

- one cue nucleus around a disturbance-affordance tension,
- a primary witness trace,
- candidate anchors from recent operator action and system response,
- lane candidates toward intervention, inquiry, and rollback,
- but no selected route and no final gate decision.

This is lawful because it preserves early significance without pretending the cue is already a route record, a gate, method, or work record.
#### Inquiry cue pack

An inquiry cue pack may preserve exemplars, contrasts, a felt or trace-anchored discrepancy cue nucleus, and candidate anchor fragments. This is lawful even when the publication is still below both route publication and `A.6.P` threshold.
#### Invalid publication to reject

It is invalid to publish a cue pack and then cite it as if it were already an anomaly statement, a routed cue set, an explanatory bundle, or a control obligation. The cue pack is only the preservation form.
### Authoring and Review Guidance

#### Author prompt

A cue pack should answer four questions:

- what exactly is being preserved?
- why is it worth preserving now rather than losing it?
- which witness or anchor currently carries the strongest load?
- which downstream directions, if any, are already visible without pretending that a route has been selected?
#### Review prompt

A reviewer should check:

- whether the pack has a clear cue nucleus;
- whether primary witness / anchor triage is explicit when needed;
- whether it is being abused as a shadow claim or shadow route record;
- whether route language is still early directional pressure rather than route selection.
#### Carrier reminder

The cue pack may cite traces, embodiment, and model-state refs, but it should not try to replace `A.7` carrier discipline.
### Migration and Extension Notes

#### Migration from vague cue / signal language

Older prose often says merely "there is a signal" or "something suggests action". A conforming migration first asks whether the source is truly signal-like in the narrow telemetry / trace sense, or whether the load-bearing phenomenon is a broader cue nucleus, affordance hint, contrast, or figure-against-background shift. It then turns the passage into a cue pack with explicit cue nucleus, primary witness or anchor, and route pressure only if that pressure is already visible.
#### Local extension rule

Contexts may add local cue-pack fields only if they remain preservation aids rather than covert route-decision or endpoint semantics.
#### Boundary reminder

If a cue pack begins to carry route decision, stable endpoint authority, relation slots, method/work semantics, or other later-owner contracts, the publication is ready to move out of this owner.
### Cue-Pack Package Discipline

A cue pack is useful only if it preserves enough structure to justify later routing or later prompt formation without pretending that a later owner already exists.

#### Minimal preservation package

A robust cue pack should make visible:

- the **cue nucleus** being preserved,
- the **preservation rationale**,
- the **primary witness or primary anchor** when one is load-bearing,
- the **candidate anchors / contrasts / exemplars** that keep the nucleus non-arbitrary,
- the **secondary witnesses or carriers** that support it,
- and the **lane candidates or route pressure**, if such directional pressure is already visible.

This is what turns early cues into a lawful preservation form.
#### Route pressure is optional, not forbidden

A cue pack is not an archive of weak cues, but it also need not wait until route pressure is fully articulate. If route pressure is already visible, publish it. If it is not yet visible, publication may still be lawful when the cue nucleus, grounding, and preservation rationale make clear why the cue should not be lost.
#### Valence is not endpoint semantics

Valence, urgency, discomfort, promise, or attraction may explain why a cue is preserved. They do not by themselves establish action-invitation, evaluative, abductive, or route authority.
### Cue-Pack Continuations and Non-Continuations

#### Lawful continuations

A cue pack may continue lawfully into:

- a routed cue set,
- a cue-derived abductive prompt,
- a later lexical-repair family once articulation threshold is met,
- or a retreat / retirement move when prior stabilization proved too strong or no longer worth carrying.
#### Non-continuations

A cue pack should not be used directly as:

- a stable proposition,
- a route decision,
- a deontic commitment,
- a work occurrence,
- or a measurement-bearing quality endpoint.

Those are not just later stages of the same text. They are different owner forms with different contracts.
#### Multi-direction state versus lineage fork

Several lane candidates or several weak route pressures may live inside one cue pack. That is still one governed publication.

A fork happens only after distinct successor publications are actually issued, each with its own authority or handoff consequences. Reviewers should not treat pre-route plurality inside one cue pack as if it were already a forked lineage.
#### Split and merge cases

One cue pack may later split into several route-bearing continuations if its preserved cue nucleus actually contains several tensions. Several cue packs may also merge if later stabilization reveals that they were fragments of one stronger cue complex. Both cases are lawful if the continuity and later route consequences are published explicitly.
### Worked Cue Complexes and Review Tests

#### Mixed-source cue complex

A cue pack may combine trace refs, embodiment refs, model-state refs, and exemplar fragments. This is lawful provided the pack still identifies what unifies those materials into one cue nucleus rather than using the pack as an unstructured container for unrelated fragments.
#### Review test for over-weak packs

A reviewer may ask: if all candidate anchors and witnesses were removed, would anything remain that justifies preserving this pack at all? If the answer is still unclear what is being preserved, the pack is under-specified and should be rewritten, retired, or not published yet.
#### Review test for covert endpoint capture

A reviewer should also ask whether any sentence in the pack would become false if the later endpoint owner were denied. If yes, the cue pack is already carrying endpoint semantics and needs either an explicit move out of `A.16.1` or a rewrite back into preservation language.
### Cue-Pack Lifecycle and Comparative Preservation Law

#### Lifecycle visibility

A cue pack should make it visible whether the preserved cue nucleus is being kept open, route-published later, split, merged, or retired.
#### Preservation worthiness test

Keep a cue pack only when its nucleus would likely be lost or distorted without it. If the same cue already lives stably in a stronger owner form, the cue pack has become redundant.
#### Comparative preservation law

Compare cue packs only when nuclei, primary witness / anchor choice, and any early directional pressure are explicit. Emotional intensity, rhetorical urgency, or author confidence are not lawful comparison proxies.
### Witness and Carrier Triage

#### Witness priority rule

Not all witnesses play the same role. Authors should distinguish the witness that anchors the cue nucleus from secondary witnesses that only enrich or corroborate it. Without that distinction, cue packs become hard to route because everything in the pack starts looking equally load-bearing.
#### Carrier overload boundary

A cue pack may cite traces, embodiment, model-state refs, or document fragments, but it should not absorb their full carrier semantics. When carrier analysis itself becomes central, `A.7` or another carrier owner should be cited explicitly rather than silently embedded into the pack.
#### Early directional plurality rule

Plural lane candidates or plural route pressure is not a flaw. If the same cue nucleus pulls toward several later owners, the pack should keep that plurality visible until `B.4.1` narrows it into explicit route publication. The error is not plurality; the error is hiding plurality under a single convenient gloss.
### Review Matrix and Migration Tests

A reviewer can test a cue pack with four questions:

1. **What exactly is being preserved?** If the nucleus is unclear, the pack is under-specified.
2. **Why this pack rather than a stronger owner form?** If the answer is only habit, the pack may be redundant.
3. **Which witness or anchor is primary?** If none can be named where triage matters, the pack may be storage rather than preservation.
4. **Which downstream directions remain live, if any?** If the publication hides them, later routing will be distorted.

Migration from legacy signal language should therefore reconstruct not just a vague "signal", but the preserved cue nucleus, its primary witness or anchor, and any directional pressure that is already honestly visible.
### A.16.1:End

---
## Reopen / SketchBackoff / Respecify

> **Type:** Architectural (A)
> **Status:** Draft
> **Normativity:** Normative unless marked informative

**Plain-name.** Lawful reopen / backoff / respecification.

### Problem frame

A governed history across the language-state chart must support lawful retreat as well as tightening. When a route, publication form, or framing scaffold over-commits, teams need a first-class way to reopen, back off, respecify, or retire a branch without pretending nothing changed.
### Problem

Without an explicit retreat pattern, teams treat reopening as failure, hide regressions, silently mutate endpoint forms back into weaker publication forms with no audit trail, or let obsolete branches disappear without any visible withdrawal note.
### Forces

| Force | Tension |
|---|---|
| **Reversibility vs trust** | Allow backoff without making the trajectory discipline look arbitrary. |
| **Explicit retreat vs clutter** | Name retreat and retirement without drowning the model in bookkeeping. |
| **Witness retention vs honest revision** | Keep what remains valid while explicitly discarding what no longer holds. |
| **Framing revision vs repair-owner boundary** | Allow route-contract or framing-scaffold revision without letting `A.16.2` swallow slot-explicit semantic repair from later owners. |
### Solution

This pattern defines the retreat, reframing, and retirement side of the `A.16` move family.

#### Move family

| Move | When to use it | What remains stable | What may change |
|---|---|---|---|
| `reopen` | the current family is still right, but closure was too strong | family and major orientation | closure, rival set, guards |
| `sketchBackoff` | the current publication form overstates articulation or stability | witnesses, traces, some anchors | publication form, articulation level, route certainty |
| `respecify` | the family remains plausible, but the framing scaffold, route contract, or facet-profile reading is wrong | broad domain, witness base, and major family commitments | framing scaffold, route contract, facet-profile reading |
| `retire` | a cue, route-bearing publication, or branch is no longer current or no longer worth preserving | historical continuity and any cited witnesses that still matter | currentness, authority, successor/no-successor status |

`respecify` is intentionally narrower than semantic repair. Slot-explicit semantic rewrite, bearer repair, or endpoint-local lexical precision remains with later owners such as `A.6.P`, `A.6.Q`, and `A.6.A`.
#### Required publication note

Every retreat or retirement move shall name:

- source publication form,
- source articulation / closure / route-authority state,
- trigger or counter-evidence,
- target family or target publication form,
- retained witnesses,
- withdrawn assumptions, route claims, or authority,
- and whether a successor now exists or the branch is retired without successor.
#### Authority discipline

A retreat or retirement move shall not silently preserve operational, gate, commitment, or route authority if the weaker target form no longer supports that authority.
### Archetypal Grounding

**Tell.** Backoff is not regression; it is a lawful transduction when the stronger form no longer fits. Retirement is not erasure; it is lawful withdrawal when continuation no longer deserves current authority.

**Show (System).** A rollback cue may reopen a prior decision path instead of pretending the original operationalization still holds, or retire one branch once a stronger successor route has taken over.

**Show (Episteme).** A formalized hypothesis may sketch-backoff to a cue pack when its framing collapses under new exemplars, or it may respecify its route contract while leaving slot-explicit semantic repair to later owners.
### Bias-Annotation

The pattern pushes against false linear progress narratives. The cost is that teams must expose when closure or route authority is being relaxed, reframed, or retired.
### Conformance Checklist

- `CC-A.16.2-1` Retreat or retirement moves **SHALL** cite the trigger or counter-evidence that justifies them.
- `CC-A.16.2-2` A retreat or retirement move **SHALL NOT** silently preserve endpoint authority if the target form no longer supports it.
- `CC-A.16.2-3` Reopen / backoff / respecify / retire moves **SHOULD** preserve witnesses and trace links whenever still valid.
- `CC-A.16.2-4` The target articulation, closure, and route-authority state **SHALL** be explicit when the move materially changes any of them.
- `CC-A.16.2-5` `respecify` **SHALL NOT** be used to smuggle slot-explicit semantic repair out of later owners.
### Common Anti-Patterns and How to Avoid Them

- **Shame-driven concealment.** Teams hide the retreat. Publish the move.
- **Silent downgrade.** The publication weakens but no one updates the route or authority state.
- **Retreat as erasure.** Earlier witnesses disappear even though they remain valid.
- **Respecify as silent repair.** `respecify` is used to hide a real semantic rewrite that belongs to later repair owners.
- **Silent branch disappearance.** A branch stops mattering, but no retirement or supersession note is published.
### Consequences

The benefit is explicit reversibility, reframing, and retirement handling. The trade-off is more explicit transition records and more explicit governance notes.
### Rationale

Language-state history is not one-way tightening. Without retreat and retirement discipline, `A.6.P` and later endpoint forms would encode only one-way progress and would hide the real cost of over-commitment.
### SoTA-Echoing

This fits iterative design, incident response, scientific reframing, embodied inquiry, and exploratory model work where recovery from over-commitment and honest branch retirement are part of competent practice.
### Relations

- Builds on: `A.16`, `C.2.5`.
- Coordinates with: `C.2.2a`, `A.16.0`, `A.16.1`, `B.4.1`, `B.5.2`, `A.6.P`, `A.6.A`, `A.6.Q`.
- Constrains: lawful retreat, respecification, and retirement paths.
### Worked Retreat Trajectories

#### Reopen within the same family

A routed evaluative note may remain within the same family but move from high closure to lower closure when a rival frame reopens. This is `reopen`, not `sketchBackoff`.
#### Sketch-backoff to cue pack

An over-specified action invitation may later prove premature. The lawful retreat is:

`actionInvitation -> sketchBackoff -> U.PreArticulationCuePack`

with explicit withdrawal of route authority that no longer holds.
#### Respecify without repair-owner drift

A route-bearing publication may keep the same broad family but replace one framing scaffold or route contract with another. That is `respecify`, not silent editing, and not slot-explicit semantic repair.
#### Retire an obsolete branch

A route-bearing branch may later become obsolete because another branch now carries the stronger owner and witness support. The lawful continuation is explicit `retire`, not silent disappearance.
### Authoring and Review Guidance

#### Author prompt

A retreat or retirement note should say:

- what proved too strong or no longer current,
- what remains valid,
- what authority is withdrawn,
- what publication form now becomes appropriate,
- and whether any successor carries the continuity forward.
#### Review prompt

A reviewer should ensure that retreat does not become silent erasure. Valid witnesses should survive unless explicitly discarded with reason, and retired branches should either name a successor or say clearly that none exists.
#### Boundary reminder

Retreat is a lawful move, not a rhetorical excuse to avoid publishing mistakes. The value of the pattern depends on making the retreat or retirement visible.
### Migration Notes

#### Migration from regression language

Older language often talks about "going backwards" or "regressing". The preferred migration is to name whether the change is reopen, sketch-backoff, respecify, or retire, and what boundary or authority consequence follows.
#### Integration reminder

When retreat affects later owners such as `A.6.P`, `A.6.A`, `A.6.Q`, or `A.15`, those owners should be updated explicitly rather than left to drift on stale authority.
### Retreat Package Discipline

A retreat is trustworthy only when it makes visible what changed, what survived, and what authority no longer holds.

#### Minimal retreat note

A retreat note should make explicit:

- the **source form and source authority state**,
- the **triggering mismatch or counter-evidence**,
- the **move kind**,
- the **target form or target family**,
- the **retained witnesses**,
- the **withdrawn assumptions or route claims**,
- the **required downstream updates** for any affected later owner,
- and the **successor / no-successor status** if a branch is retired.
#### Retreat is not erasure

Retreat preserves continuity: a stronger formulation was adopted, then shown too strong in stated respects, and therefore weakened or withdrawn lawfully.
#### Partial retreat

Some retreats withdraw only one route claim, scope assumption, framing scaffold, or operational hook. In those cases name the surviving core rather than resetting everything.
### Retained vs Withdrawn Authority

#### Reopen

`reopen` usually preserves the family and much of the surrounding structure while withdrawing closure strength. It reintroduces rival possibilities without claiming that the entire earlier object was illegitimate.
#### Sketch-backoff

`sketchBackoff` lowers publication strength more sharply. It typically preserves witnesses, exemplars, or cue anchors while withdrawing the stronger publication form and any authority that depended on that stronger form.
#### Respecify

`respecify` keeps the broad family but changes framing scaffold, route contract, or facet-profile reading. It is neither pure retreat nor silent edit: it preserves enough of the prior object to justify continuity, but it does not authorize semantic slot repair that belongs to later owners.
#### Retire

`retire` ends current authority for a cue, route-bearing publication, or branch while preserving historical continuity. It may point to a stronger successor or explicitly state that no successor currently exists.
### Worked Recovery Cases

#### Reopening a routed evaluative note

An evaluative note may have reached a high closure state under one route, but new contrasts reopen a serious rival. `reopen` is lawful when the bearer, family, and witness base remain largely intact but the closure claim must be relaxed.
#### Sketch-backoff from prompt to cue pack

An abductive prompt may later prove too strong because its open question was formulated before the cue anchors had stabilized. The lawful recovery is to sketch-backoff to `U.PreArticulationCuePack`, preserving the cue carriers while withdrawing prompt authority.
#### Respecifying a route contract

A route-bearing publication may keep the same general direction but replace one route contract with another when later review shows that the original framing selected the wrong owner family. The point of `respecify` is to make that replacement visible without pretending the earlier contract never existed.
#### Retiring a route branch

A route-bearing branch may later be withdrawn because stronger grounds, clearer closure, or a more adequate successor publication now carry the work. `retire` keeps that withdrawal visible instead of letting the branch vanish into later prose.
### Review Matrix for Retreat Integrity

A reviewer can test retreat integrity with five questions:

1. **Was the trigger explicit?** If not, the retreat risks becoming retrospective narrative repair.
2. **Was authority updated?** If the stronger form lost support, any dependent route, gate, or endpoint authority must have been revised.
3. **Did valid witnesses survive?** If all earlier grounding disappeared without reason, the retreat probably became erasure.
4. **Was the move kind correctly named?** Reopen, sketch-backoff, respecify, and retire solve different problems; confusing them obscures what actually changed.
5. **If a branch was retired, was successor / no-successor status explicit?** If not, retirement may be hiding silent laundering.

The matrix is intentionally small: `A.16.2` should keep retreat legible, not surround it with decorative procedure.
### Downstream Repair Obligations

#### Stale downstream object rule

A retreat or retirement often leaves stale downstream objects behind: prompts, action invitations, evaluative notes, requirement candidates, or work hooks that were lawful only under the stronger prior state. A conforming retreat should therefore name which downstream objects remain valid, which must be revised, and which must be withdrawn.
#### Narrow retreat propagation

Retreat propagation should be as narrow as truth permits. If only one framing scaffold failed, then only the downstream objects that depend on that scaffold need revision. Over-broad rollback is wasteful; under-broad rollback leaves false authority in circulation.
#### Retreat timestamping and witness continuity

Where several revisions exist, the retreat note should make clear which earlier publication it revises and which witness set still carries continuity across the revision. Without that linkage, readers may not know whether two nearby texts are alternative drafts or a genuine retreat sequence.
### Comparative Retreat Law

#### Retreat kinds are not interchangeable

`reopen`, `sketchBackoff`, `respecify`, and `retire` solve different problems. Comparing them as if they all meant "we stepped back" erases the specific authority change each one makes.
#### Honest recovery over softening prose

A context may prefer softening language such as "refined further" or "adjusted slightly" even when a real retreat or retirement occurred. `A.16.2` rejects that habit. If authority fell, closure dropped, framing was withdrawn, or a branch was retired, the move should be named directly.
#### Boundary to silent editing

If a publication is simply rewritten and no continuity or authority story is preserved, that is editing, not `A.16.2`. Retreat is a reviewable move only when the earlier stronger form remains part of the visible history.
### Review Addendum for Retreat Integrity

Add three checks to the base retreat matrix:

- **Were downstream dependencies updated?**
- **Was the propagation scope truthful?**
- **Does the revised history remain legible?**

These checks keep `A.16.2` tied to explicit recovery and retirement rather than narrative smoothing.
### A.16.2:End
## Canonical “Characteristic” (A.CHR‑NORM)

### Context

To have reproducibility and explainability there is a need to **measure** various aspects of systems or knowledge artifacts. A dedicated measurement backbone (see **C.MM‑CHR**, Measurement & Metrics Characterization) already exists, prescribing the **CSLC discipline** – i.e. define a **Characteristic**, choose a **Scale** (with a **Unit** if applicable), record a **Level/Value**, and thus obtain a **Coordinate** on that scale, optionally mapping to a **Score** via a **ScoringMethod (USCM)**. However, historically multiple near-synonyms (“axis”, “dimension”, “property”, “feature”, "metric") have been used interchangeably for “what is being measured,” and often the _aspect itself_ gets conflated with _how it is expressed_ (units, ranges, labels). This pattern enters the FPF **Kernel lexicon** to **canonize a single term** for the measured aspect and enforce a clear separation between **what** is measured and **how** it is measured.
### Problem

When measurement concepts are not kept rigorously distinct, several issues arise:

-   **Polysemy at the anchor.** Teams say “dimension” or “feature” but mean slightly different things, so the very trait being measured is ambiguous.
    
-   **Arity mistakes.** A relational quality (e.g. similarity between two items) might be treated as if it were an intrinsic property of one item, or vice versa, leading to logical errors.
    
-   **Expression conflation.** The aspect being measured is often mixed up with its expression – for example, using “scale” or “axis” to mean both the quality _and_ its unit or range. This leads to **unsafe arithmetic** (averaging ordinal ranks, comparing raw numbers from incompatible scales, etc.) because values get interpreted out of context.
    

In summary, projects lacking a canonical terminology for metrics risk miscommunication and pseudo-quantitative operations. Measurements of physical quantities, architectural attributes, or performance scores end up on **incommensurate rails** due to inconsistent naming and handling.
### Forces

-   **F1 – Single anchor of meaning.** Any numeric value is meaningless unless one can ask “value of _what_?”. The measurement’s meaning must be anchored in a single clearly named aspect.
    
-   **F2 – Arity clarity.** Some characteristics apply to a single entity (e.g. its mass or length), while others inherently relate multiple entities (e.g. distance between two points, coupling between modules, agreement between judges). If arity isn’t explicit, claims and calculations become corrupted.
    
-   **F3 – Scale integrity.** Different kinds of scales permit different operations – e.g. you can average temperatures (ratio scale) but not ranks or grades (ordinal scale) without losing meaning. If one mixes values without regard to scale type or units, the result is nonsense (**pseudo-arithmetic**).
    
-   **F4 – Composition discipline.** In complex evaluations, multiple measurements may need to be combined. Without a disciplined approach, people might perform ad-hoc math on apples and oranges (adding scores from unrelated characteristics, etc.). A proper pattern must require any combination to go through a defined monotonic **ScoringMethod** (e.g. a weighted formula) instead of arbitrary aggregation.
    
-   **F5 – Transdisciplinarity.** The measurement framework should work for **any domain**. The same conceptual scaffold must serve physical science (e.g. lab temperature readings), software engineering (e.g. module cohesion ratings), and even subjective assessments (e.g. figure-skating scores) without bias. One vocabulary, many CG‑frames.
    
-   **F6 – Open-endedness.** As systems evolve, their performance or quality metrics also evolve. Rigid life-cycle stage labels (“Phase 1, Phase 2…”) don’t capture iterative improvement. The pattern should favor an **open-ended state-space** view (revisiting states via checklists, as in an RSG – **RoleStateGraph** with re-entry) over any fixed lifecycle with “terminal” stages.
### Solution

**Establish “Characteristic” as the one canonical construct for “what is measured.”** In every FPF context, the _aspect or trait_ being measured MUST be referred to as a **Characteristic**. This term replaces “axis” or “dimension” in normative usage (those may appear _only_ as explanatory aliases in Plain register). By fixing a single name and schema, we cleanly separate a **Characteristic** from its **Scale** (and **Unit**), and from any observed **Value/Level** on that scale. The solution also differentiates single-entity vs multi-entity cases and binds all measurements to the standard CSLC sequence.

To enforce this solution, the following rules apply:

-   **A17-R1 (Canonical term).** In all normative models and specifications, the measured aspect **SHALL** be referred to as a **Characteristic**. (Legacy terms “Axis” or “Dimension” are retired from technical vocabulary – see Part J Lexicon Update.)
    
-   **A17-R2 (Entity vs. relation subtype).** Each Characteristic **MUST** declare its intended _arity_. An **Entity-Characteristic** applies to exactly one bearer (e.g. _Temperature_ of a reactor, _Evolvability_ of a software module), whereas a **Relation-Characteristic** applies to an ordered tuple of two or more bearers (e.g. _Distance_ between two sensors, _Coupling_ between modules, _Agreement_ among reviewers). The arity is part of the definition and **must be explicit** wherever it’s not obvious from naming.
    
-   **A17-R3 (Characteristic space).** Any set of defined Characteristics spans a multi-dimensional **CharacteristicSpace**. Movement or evolution is then described as trajectories through this space (with states revisited or refined over time), rather than as a linear lifecycle through preset phases. This ensures measurements feed into open-ended state modeling rather than locking into “end states.”
    
-   **A17-R4 (Lexical guardrails).** Normative text **SHALL** use only the canonical measurement terms: **Characteristic, Scale, Level, Value, Coordinate, Score, Normalization, Unit**. Synonyms like _axis_, _dimension_, _metric_, _grade_, _property_, etc., are **forbidden in formal usage**. (They may appear in narrative explanations or user-facing documentation _only if_ clearly defined as aliases for the canonical terms.) Authors **MUST** not use deprecated terms in identifiers or formal statements, and any didactic alias should be introduced with an explicit mapping to the official term. These lexical rules uphold clarity and are further detailed in **E.10 LEX‑BUNDLE**. 

- **A17-R5 (Symbol policy).** **Γ** reserved for holonic composition; **𝒢 : Coordinate→Score** for metric‑level ScoringMethod; **MUST NOT** be conflated; documents **SHALL NOT** reuse Γ for ScoringMethod. **If an ordered Scale is declared, polarity SHALL be fixed; 𝒢 MUST be monotone** w.r.t. that polarity.

- **A17-R6 (Declared polarity).** Every ordered Scale **SHALL** declare one of: **↑‑better**, **↓‑better**, or **non‑applicable** (for purely nominal scales). For interval/ratio scales, polarity fixes the intended order of comparison.

- **A17-R7 (Monotonicity against polarity).** If a template declares an **ordering polarity** on its Scale (↑ better / ↓ better), then **𝒢 MUST be monotone** w\.r.t. that polarity: higher‑is‑better (resp. lower‑is‑better) in coordinates **implies** ≥ (resp. ≤) in scores.

- **A17-R8 (Arity declaration).** Authors **SHALL** mark a Characteristic as **`U.EntityCharacteristic`** (applies to exactly one bearer) or **`U.RelationCharacteristic`** (applies to a relation of cardinality ≥ 2). Examples: *Cohesion* → entity‑level; *Coupling* → relation‑level.

- **A17-R9 (Relational scale anchors).** For relation‑level cases, the Scale’s admissible values **SHALL** be defined over the **tuple** domain (e.g., distances, similarities, inter‑role latencies). Ambiguity that re‑reads a relational Characteristic as unary is **forbidden**.

- **A17-R10 (Intension vs Description).** The **Characteristic** remains the **intensional object**; any rubric, catalogue of levels, or examples are **descriptions**. Keep the intensional Characteristic distinct from its descriptive episteme (cf. `U.Episteme` roles: Object–Concept–Symbol).

#### CharacteristicSpace & Change Reasoning (Normative/Clarifying)

**R17 — CharacteristicSpace declaration.** When an agent reasons about **change**, it **SHALL** name the **CharacteristicSpace** (the set of Characteristics, with Scales, units, and topology assumptions) in which motion is considered.

**R18 — RSG framing, not lifecycle.** Change narratives **SHALL** be framed as movement on a **reachable‑states graph (RSG)** with **checklists** that certify state acquisition; **“lifecycle”** staging is **deprecated**. *(A.17 conforms to the open‑ended evolution stance of the Kernel.)*

**I7 — Vector interpretation.** A **U.Coordinate** vector may collect multiple coordinates for multi‑Characteristic reasoning; composition into a single Score, if desired, is an **explicit new 𝒢** on that vector.
### Archetypal Grounding (System & Episteme Examples)

**In a physical system (`U.System`):** Consider a **Distance** Characteristic defined for a pair of physical objects. For example, two machines in a factory have a Distance of 3.5 meters between them. Here _Distance_ is a Relation-Characteristic (applies to the pair), with an associated Scale (e.g. a ratio scale in meters), and the measured 3.5 m is a **Coordinate** on that scale. If we instead look at an **Engine Temperature** Characteristic (unary), a particular engine might have a Temperature of 350 K at some moment – _Temperature_ (the Characteristic) is clearly separated from how it’s measured (Scale in Kelvin) and the reading (350, a Coordinate on that scale).

**In an epistemic context (`U.Episteme`):** Consider a **Formality** Characteristic to rate a documentation artifact’s rigor. We might define an ordinal Scale with named Levels such as _Informal_, _Semi-formal_, _Formal_. A given specification document can then be said to have _High Formality_ – meaning it occupies the “Formal” **Level** on the Formality Scale. Here _Formality_ (Characteristic) captures _what_ we measure about the document, while the tiered Scale (with qualitative levels) expresses _how_ we categorize it. Because we use an ordinal scale, we can rank documents by Formality, but we would not average “Semi-formal” and “Formal” (avoiding meaningless arithmetic on an ordinal metric). In another knowledge context example, one could define a Characteristic **Reliability** for a knowledge source with a percentage Scale from 0 to 100%. An article’s reliability might be 85% – which is only interpretable by knowing it refers to “Reliability” on a 0–100% Scale (i.e. a specific Coordinate on that Characteristic’s scale).
### Bias-Annotation

This pattern is deliberately **domain-neutral** and introduces no bias toward any particular discipline or measurement type. By enforcing a uniform lexicon, A.17 actually mitigates bias: it prevents **disciplinary jargon** from creeping into core definitions (ensuring, for instance, that a software metric isn’t given a vague custom term when it’s fundamentally a Characteristic). The **Didactic lens** is strongly served: using one precise name per concept improves clarity for all audiences. There is a slight initial cost in re-labeling legacy terms (e.g. renaming “dimensions” to Characteristics), but this is offset by the long-term **Cognitive Elegance (P‑1)** – the framework becomes easier to learn and less prone to misinterpretation. No single domain’s terminology dominates, and the pattern explicitly supports both quantitative (physics-like) and qualitative (judgment-based) measurements, reflecting **Pragmatic neutrality**. The requirement of open-ended state-space thinking aligns with **P‑10 (Open-Ended Evolution)**, ensuring we don’t bake in lifecycle biases that assume development must terminate at a final stage. In summary, A.17 imposes a disciplined vocabulary that is broad enough for all fields and free of hidden assumptions, thereby avoiding subtle ontological or cultural biases in the measurement model.
### Conformance Checklist

When authoring or reviewing FPF-compliant metrics, use the following checklist to ensure **Characteristic normalization** is applied:

1.  **Declared Characteristic:** Have you explicitly named a **Characteristic** for each aspect being measured, instead of using generic terms? (e.g. use _“Reliability”_ as a Characteristic name rather than saying “this dimension”).
    
2.  **Arity Explicit:** Is it clear whether the Characteristic is unary or relational? If a metric involves a relationship, are the participating entities (pair, tuple, etc.) identified in its definition?
    
3.  **Separate Scale/Unit:** For each Characteristic, have you defined the **Scale** (and **Unit**, if applicable) separately, rather than embedding units or ordinal terms in the name of the Characteristic? (e.g. _“Length (m)”_ should be captured as Characteristic = _Length_, Unit = _meter_).
    
4.  **Scale-appropriate operations:** Are you only performing comparisons or calculations that make sense for the declared scale type? (No averaging of ranks, no mixing of units – ensure **ordinal** Characteristics aren’t treated like numbers, and **interval/ratio** values respect zero and units.)
    
5.  **No implicit aggregation:** If multiple measurement readings are combined, is there a defined **ScoringMethod** (with monotonic logic) that produces a **Score**? Avoid any ad-hoc “overall score” that simply adds or averages raw values from different Characteristics.
    
6.  **Canonical terminology in use:** Are you using the terms _Characteristic_, _Scale_, _Level/Value_, _Coordinate_, _Score_, _ScoringMethod_, _Unit_ in all formal descriptions? Confirm that no deprecated synonyms (axis, dimension, etc.) appear in technical content or identifiers (they can appear in Plain explanations only with proper reference to the canonical term).
    
7.  **Open-ended progression:** (If applicable) When modeling progress or change using metrics, have you considered using a state-space of Characteristics rather than a fixed sequence of phases? This check is to encourage leveraging the open-ended nature of CharacteristicSpaces, especially in evolutionary or iterative processes.
    
_(Failure to satisfy the above indicates a violation of this pattern’s intent. The **LEX-BUNDLE** rules in E.10 provide automated checks for term usage, and MM-CHR templates enforce explicit Characteristic/Scale definitions.)_
### Consequences

By instituting **Characteristic** as the single term and enforcing the CSLC structure, this pattern yields several positive outcomes:

-   **Unambiguous metrics:** Every measurement has a single, well-defined anchor of meaning – the Characteristic – eliminating guesswork about “what is this number about?”.
    
-   **Separation of concerns:** We cleanly separate _what_ is measured from _how_ it’s represented. The Characteristic names the quality of interest, while the Scale/Unit defines the expression. A raw value now **means nothing by itself** – it must be read as “X units on the Y scale of Z Characteristic,” which greatly reduces misinterpretation.
    
-   **Unary vs. relational clarity:** The explicit distinction between Entity-Characteristic and Relation-Characteristic ensures that relational properties (like “distance between A and B” or “consistency among experts”) aren’t mistakenly treated as inherent properties of a single object. This guards against logical errors and data modeling mistakes.
    
-   **Cross-domain comparability:** All measurements, regardless of domain, follow the same **CSLC** rails. This means a temperature in Kelvin and a reliability score in percent can each be traced through Characteristic → Scale → Coordinate. They can’t be directly compared unless designed to be, which is _good_: any composite scoring must be done via an explicit **SCP** mapping to a common **Score** scale. The pattern thus enables interoperability (through well-defined Score bridges) while preventing illegitimate comparisons.
    
-   **Consistent evolution framing:** By retiring the idea of a bespoke “lifecycle” for every process and instead viewing changes as movement in a CharacteristicSpace, the pattern aligns metric thinking with state-based reasoning (e.g. as used in dynamic models). There is no artificial “final state” for improvement – a system can always evolve to a new coordinate without violating a lifecycle Standard. This open-ended view encourages continuous improvement and refinement, echoing FPF’s emphasis on evolutionary development.
    

There are few downsides. One consequence is that modelers must learn the canonical terms and possibly refactor existing documentation (a short-term effort). Also, enforcing scale integrity means quick-and-dirty aggregate scores are not allowed unless justified via a SCP – this introduces a healthy “pause” to ensure composite metrics are well-founded. Overall, the benefits in clarity and correctness far outweigh the overhead. Teams gain a _lingua franca_ for metrics, and the risk of metric abuse (mixing apples and oranges) is significantly reduced.
### Rationale

The Canonical Characteristic pattern is a direct response to recurring measurement pitfalls. By insisting on “one precise name per concept”, it upholds **Strict Distinction (A.7)**, ensuring that the framework never treats two different ideas as one. For instance, earlier practice might label both a requirement category and its score as “dimension,” causing confusion; with A.17, the _aspect_ is a Characteristic and its _score_ is separate, so each idea has its place. This clarity is pedagogically vital (**P‑2 Didactic Primacy**): readers and contributors immediately know what a term means and how to interpret any value associated with it.

The solution also draws on fundamentals of measurement theory (Stevens’ levels of measurement) to prevent misuse. By encoding scale types and unit handling into our patterns, we avoid the “pseudo-quantitative” fallacies – no more averaging things like _risk levels_ or adding up _grades_ as if they were true numbers. In effect, A.17 puts a safeguard around **P‑1 Cognitive Elegance and P‑7 Ontological Parsimony**: we use a minimal, universal set of measurement constructs, and we avoid bloating the conceptual space with domain-specific or redundant terms. One canonical set of terms also makes the framework more teachable and **composable across contexts**, since patterns and projects aren’t inventing new synonyms that others must decipher.

Importantly, distinguishing Entity vs Relation Characteristics future-proofs the reasoning model. It enforces a modeling rigor seen in domains like physics (where properties vs. relations are carefully distinguished) and brings it to architecture and knowledge domains. This rigor supports advanced reasoning in FPF – for example, **A.3.3 (Dynamics)** can treat system state variables as a well-defined set of Characteristics, and assurance patterns can trace **evidence metrics** unambiguously to the exact aspect measured. It also means any attempt to compare or combine metrics has to be explicit (via ScoringMethods), which inherently improves **transparency and auditability** (a key FPF goal).

Finally, retiring the “lifecycle” vocabulary in favor of state-space trajectories aligns with FPF’s **open-ended evolution** principle. It acknowledges that improvement is not a predefined path but a navigable space. This shift in mindset (from lifecycle stages to checklisted state transitions) removes an implicit bias that systems _ought_ to reach a “final” maturity stage – instead, it keeps the door open for perpetual refinement, which is philosophically aligned with continuous learning and adaptation.

In summary, A.17 is the linchpin that turns a loose collection of measurement practices into a **coherent, principle-driven system**. It rationalizes the language, thereby rationalizing thought: by speaking in one clear voice about measurements, FPF ensures that every number in the system can be trusted to answer “value of what, on what scale, relative to what context.” This rationale is reflected in improved model integrity and cross-domain trust in the meaning of metrics.
### Relations

-   **Builds on / Elaborates:** _FPF Core Measurement Schema_ (as outlined in C.16). A.17 lifts the metric template concepts from C.16 into a kernel-level rule. It also reinforces **A.7 Strict Distinction**, by giving each measurement concept a unique name and forbidding overloaded terms.
    
-   **Constrains:** All other patterns that define or use metrics. For example, **A.3.3 `U.Dynamics`** (system dynamics) must name its state variables as Characteristics with proper scales (it cannot refer to them loosely as “KPIs” without context). Similarly, any **service-level targets / SLO clauses (A.2.3 `U.PromiseContent.acceptanceSpec`)** or **assurance calculations (B.3, D.3 patterns)** that involve measurements are governed by this canonical terminology (no unwarranted synonyms or unit confusion per ISO/IEC 80000, ISO/IEC 25024, QUDT, SOSA/SSN best practices). The pattern’s lexical rules are part of the **LEX-BUNDLE** (E.10) – any FPF-conformant context must adhere to these naming conventions.
    
-   **Coordinates with:** **A.18 (CSLC-KERNEL)**, which defines the minimal **Characteristic/Scale/Level/Coordinate** Standard in detail. A.17 provides the vocabulary and basic distinctions (what is a Characteristic, and its arity), while A.18 applies this to ensure each measurement template is well-formed. Also coordinates with **C.KD-CAL** and **C.CHR-CAL** (Knowledge Dynamics Calculus, Characterization Calculus) – those patterns use the Characteristic/Scale constructs to build domain-specific metrics (e.g. knowledge quality scores) and rely on A.17’s canon for consistency.
    
-   **Anticipates:** **E.10 Lexical Discipline** rules – A.17’s enforcement of a single term and controlled aliases is a concrete instance of the lexical uniformity mandated in E.10. It also paves the way for **F.7 Concept-Set Bridges** in Unification patterns, since external ontologies for quantities (ISO 80000, QUDT, etc.) can be mapped cleanly onto FPF Characteristics now that the term is fixed. In short, A.17 is a foundational lexicon pattern that a) ensures internal consistency and b) simplifies alignment with external standards for measurable properties.
### A.17:End
## Minimal CSLC in Kernel (Characteristic ⟷ Scale ⟷ Level ⟷ Coordinate) (A.CSLC‑KERNEL)

**Aliases (for narrative use only):** _“Axis”_ (≈ Characteristic), _“Point”_ (≈ Coordinate). _(These colloquial aliases may be used in Plain language **explanations**, but never in formal identifiers or normative text.)_

### Problem Frame

We often need to **characterize some aspect** of a subject (be it a single artefact or a relationship between artefacts) in a rigorous way. Whether it’s recording a physical quantity, an architectural property, or a performance rating, the characterization must:

-   remain _domain-neutral_ (work for engineering metrics, subjective scores, etc.),
    
-   ensure that two measurements are **comparable if and only if** they share the same defined aspect and scale, and
    
-   accommodate both **ordered tiers** (qualitative levels like Low/Medium/High) and **numeric magnitudes** (continuous or interval values) without mixing them up.
    

In FPF’s kernel, the **CSLC pattern** (CG‑frame–Scale–Level–Coordinate) provides the minimal vocabulary and constraints to achieve this. It defines how one **Characteristic** ties to one **Scale**, and how any measured **value** can be treated as a **Coordinate** on that scale (with an optional named **Level** if the scale is discrete or tiered). The context here is the need for a _unified Standard_ so that every single measurement can be interpreted and compared on common grounds.
### Problem

**Uninterpretable values.** A raw number or label means nothing without knowing **what aspect it measures** and **how it is measured**. The string “4”, the label “High”, or the real number 9.81 convey no insight unless we know **which Characteristic** they pertain to and the **Scale** that gives them meaning. In cross-disciplinary work this ambiguity is magnified: a “5” could be a risk rank (ordinal), a length in meters (ratio), or a satisfaction score (perhaps interval). Common failure modes include:

-   In **ordinal settings** (e.g. expertise levels _Novice < Skilled < Expert_), one can **rank** values but not meaningfully add or average them. Treating ordinal labels like numbers (e.g. averaging _Novice=1, Expert=3_) produces invalid results.
    
-   In **cardinal settings** (e.g. seconds, meters, degrees Kelvin), arithmetic operations do make sense – but only if units are respected and zero is meaningful (for ratio scales). If we strip away units or mix scales (seconds vs. minutes), we again get nonsense.
    

Without a strict Standard, one team might treat “High” and “Medium” as having a numeric gap, another might average **4** (on a 5-star scale) with **4** (as 4 seconds) because both are “4”. **Inconsistent practices make cross-domain reasoning impossible.** We need a kernel-level solution that _fixes_: (a) the **aspect being measured**, (b) the **scheme by which it’s measured**, and (c) the **type of scale structure** (ordinal vs. metric), _and_ that ensures each reported value is bound to that scheme. At the same time, the Standard should _not_ force artificial numeric detail where it isn’t applicable (e.g. we shouldn’t assign meaningless numbers to purely qualitative tiers just to satisfy a structure).
### Forces

-   **F1 – Transdisciplinarity.** The pattern must uniformly handle measurements in _physical domains_ (e.g. length, time, temperature), _system attributes_ (e.g. a module’s coupling or reliability), and _human judgments_ (e.g. user satisfaction scores). It needs to be neither overly quantitative (alienating softer domains) nor overly qualitative (lacking precision for hard science).
    
-   **F2 – Comparability vs. freedom.** We want to compare “like with like” – e.g. two readings of the same Characteristic on the same Scale – with absolute confidence. At the same time, the system should allow **different Scales for the same Characteristic** when necessary (for example, one project might measure Quality on a 0–5 star scale, another on a 0–100 percentage scale). The pattern must permit such flexibility _without_ letting those differing scales be conflated.
    
-   **F3 – Ordinal vs. cardinal integrity.** The Standard should preserve the nature of the data: **order-only vs order+distance**. If something is ordinal (ranks, grades), the framework should prevent unwarranted numeric operations on it. If it’s cardinal (real-valued with units), the framework should enable arithmetic but still keep track of units and zero. In essence, it must protect ordinal data from “leaking” into interval arithmetic.
    
-   **F4 – Named tiers vs. continuous magnitudes.** In many domains, **named Levels** (tiers or grades) are useful – e.g. Technology Readiness Levels or bond credit ratings – whereas in others, a continuous scale is needed. The pattern should support **optional Level labels** (for tiered scales) _without forcing_ every scale to have such labels. In other words, Levels are an add-on for discrete/tiered scales, not a requirement for truly continuous measures.
    
-   **F5 – Method agnosticism.** The kernel Standard should say _what_ must be defined (Characteristic, Scale, etc.) but **not prescribe how measurements are obtained**. Whether a value comes from a sensor reading, a simulation, or an expert judgment is up to the respective patterns (e.g. Sys-CAL vs. KD-CAL). The pattern must not bake in any process or scoring methodology; it only ensures that once a measurement exists, it’s well-formed and comparable. This avoids locking in any particular assessment method.
### Solution

**Adopt a minimal “one characteristic – one scale – one coordinate (value)” Standard for all measurements.** In the FPF kernel, any metric must bind **exactly one Characteristic to exactly one Scale**, and any observation produces **one Coordinate (value)** on that Scale (with an optional **Level** name if the scale has discrete tiers). We nickname this the **CSLC clause**:

> **Exactly one Characteristic + exactly one Scale ⇒ one Coordinate (value), with an optional Level.**

Concretely, the parts of this clause are defined as follows:

-   **Characteristic:** the aspect or feature being measured (the “CG‑frame” along which comparison is made). It answers “_What are we measuring?_” – e.g. _Distance, Temperature, Quality, Reliability_.
    
-   **Scale:** the organized set of possible values that the Characteristic can take, including the type of scale (_ordinal_, _interval_, or _ratio_), the measurement **Unit** (if applicable), and any bounds or structure. The Scale defines “_How do we measure it?_” – e.g. “meters on a linear scale from 0 up to 1000” or “ratings 1 through 5 with ordering only”.
    
-   **Coordinate:** a concrete measured value that locates the subject on the chosen scale. This could be a number (for a numeric scale) or a category label (for an ordinal scale). It answers “_What is the result?_” – e.g. 7.4 (meters), or _Expert_ (level).
    
-   **Level (optional):** a named **tier or category** on the scale, used only if the scale is tiered or discretized. For example, an ordinal scale might have Levels _Low, Medium, High_. A Level is essentially a human-friendly label for certain coordinates or ranges. On purely continuous scales, **Level** is not used.
    

Using this **CSLC structure**, every measurement is unambiguous and self-contained: the Characteristic tells us the context, the Scale tells us how to interpret the value, and the Coordinate is the outcome on that scale (with a Level label if appropriate). Notably, this pattern _forbids bundling multiple characteristics into one metric_ – each metric template is one-characteristic-per-template to keep semantics crisp. If something needs to assess multiple factors, it should be modeled as multiple CSLC metrics or a higher-level composite (see §8 below). This one-aspect-one-scale rule is what allows unambiguous comparison and prevents hidden complexity.

Finally, the solution ensures **tier optionality**: If a domain uses named Levels, we include them; if not, we don’t force it. For example, one can have a _Bug Severity_ Characteristic with Levels {Minor, Major, Critical} on an ordinal scale, whereas a _Length_ Characteristic would have a continuous scale (no predefined levels, just units). Both fit the pattern.
### Archetypal Grounding (System & Episteme Examples)

**In a physical scenario (`U.System`):** Consider an athlete’s long jump. We define a Characteristic **Jump Distance** with a Scale “meters (m)” ranging from 0 upward (ratio scale with meters as the unit). When the athlete jumps and lands at 7.45 m, we record a **Coordinate** of _7.45 m_ for the Jump Distance Characteristic. Here, Jump Distance is the Characteristic, the meter-scale is the declared Scale, and _7.45 m_ is the value (Coordinate). Because this is a cardinal measurement, we can meaningfully say one jump is 1.5 m longer than another, etc. Now consider another metric in the system: **Battery Health** of a device, which might be categorized qualitatively. We could define an ordinal Scale with Levels like _Good, Fair, Poor_ for the Battery Health Characteristic. If a particular device is rated “Poor”, that is a Coordinate on the Battery Health scale (with _Poor_ as the Level name). No arithmetic is done on these labels, but we can order devices by health (Good > Fair > Poor). Both examples illustrate the one-characteristic-one-scale rule: the jump’s distance is not combined with any other aspect; the battery’s health is evaluated on its own defined scale.

**In a knowledge context (`U.Episteme`):** Consider measuring an author’s expertise in a certain domain. We introduce a Characteristic **Expertise Level** for a person, with an ordinal Scale defining tiers such as _Novice, Competent, Expert_. Alice might be assessed at _Expert_ level in software engineering – that’s a **Coordinate** on the Expertise Level scale for the Characteristic “Software Engineering Expertise”. Bob might be at _Competent_. We cannot average Alice’s and Bob’s levels, but we can say the scale is ordered (_Expert_ > _Competent_ > _Novice_). For a more quantitative episteme example, consider a Characteristic **Hypothesis Confidence** for a scientific claim, with a Scale 0–1 (or 0–100%) representing probability or confidence level (ratio scale). One hypothesis might have a confidence of 0.95, another 0.7; these are Coordinates on the Confidence scale. We can compare them numerically (0.95 is higher than 0.7, and 0.95 _implies_ a stronger belief), and we could even combine multiple confidence values through Bayesian formulas (if justified) – but crucially, we would only do so in a way that respects their scale (probabilities combined properly, not treated as arbitrary scores). The Expertise Level and Hypothesis Confidence examples show how the CSLC pattern accommodates both an ordinal qualitative measure and a continuous quantitative measure in the knowledge domain, each with one Characteristic and one defined Scale.
### Bias-Annotation

The CSLC-Kernel pattern is crafted to be **maximally inclusive of different measurement types** while imposing just enough structure to ensure consistency. It does not privilege any particular domain or modality of measurement: a subjective 5-star rating is treated with the same formal rigor as a physical length in meters. In terms of the FPF principle lenses, this pattern consciously balances the **Architectural/Ontological** needs (clear structure for data) with the **Pragmatic/Didactic** needs (flexibility and clarity for users). There is little risk of cross-domain bias here because the pattern explicitly supports both extremes (ordinal and ratio, qualitative and quantitative). By remaining **method-agnostic**, it avoids bias toward certain validation techniques – e.g. it doesn’t assume every measurement comes from an instrument (it could come from expert judgment just as well). One might argue the pattern enforces a somewhat formal approach to what could be informal measures (forcing definition of scale and characteristic), but this formalism is lightweight and is precisely what makes the metric interpretable. In summary, A.18 embodies **neutrality**: it’s a container that fits any content as long as that content is well-labeled. It reinforces **P‑2 (Didactic Primacy)** by making all metrics self-explanatory in terms of what and how, and respects **P‑1 (Cognitive Elegance)** by using a minimal, uniform scheme. No cultural or disciplinary assumptions are baked in – an anthropologist’s “Cultural Significance” scale can live alongside an engineer’s “Voltage” scale with equal status. The pattern’s requirement for declaring polarity (“higher is better” vs “lower is better” vs target range) further avoids bias in interpretation – it prevents the assumption that “more is always better,” which might be untrue in many contexts (e.g. for error rates, lower is better). All these considerations ensure that A.18 introduces no hidden skew; it merely provides a fair playing field for all metrics.
### Conformance Checklist

When defining a new metric template or using measurements, practitioners **SHALL** verify the following:

1.  **One characteristic, one scale:** Each metric **template** binds exactly **one Characteristic** to exactly **one Scale**. If you find a metric trying to cover multiple things at once, split it into separate metrics.
    
2.  **Polarity declared:** For any **ordered** Scale (ordinal/interval/ratio), the **polarity** (“higher‑is‑better”, “lower‑is‑better”, “targeted optimum (symmetric or asymmetric around a declared target)”) **SHALL** be declared at the **template** that binds a Characteristic to a Scale. State whether higher values are better, lower are better, or if an optimal range/target exists. (For example: \*“higher is better” for a performance score, \*“lower is better” for error count, or _“target 37 °C” for body temperature where deviation in either direction is worse_.) This ensures that anyone comparing two values knows which way is “up.”
    
3.  **Unit and level clarity:** If the Scale is quantitative, specify the **Unit** (e.g. _seconds, meters, %_) and make sure all values include or assume that unit. If the Scale has named Levels, list them clearly and use them consistently. Do **not** use the same label to mean different things on different scales, and avoid using unit terms in Characteristic names (the unit belongs with the scale).
    
4.  **Scale-appropriate operations only:** Only perform those comparisons or calculations that are valid for the given scale type. For a nominal scale, you can check equality but not order. For an ordinal scale, you can order or rank values but not do math like “A minus B.” For interval scales, addition/subtraction is OK (with unit conversion if needed), but ratio comparisons (A is twice B) might not make sense without a true zero. For ratio scales, all arithmetic operations are allowed _with proper attention to units_. This check prevents logical errors (e.g. averaging “High” (3) and “Medium” (2) and getting 2.5 — which is meaningless).
    
5.  **No bare numbers:** Never present a raw number or value without its context of Characteristic and Scale. If someone sees “42” in your output, they should _also_ see or know “42 of what, measured how.” A reader who is not aware of the metric’s template should not be left guessing what a given value signifies. In practice, this means labeling reports and data with the metric name or identifier so that values can be traced back to their meaning.
    
6.  **Template bridges for cross-metric comparison:** If you intend to compare or aggregate measurements from **different templates** (different Characteristics/Scales), ensure an explicit **ScoringMethod** or conversion is defined. For example, if you need to combine a “usability score” (0–5 stars) with a “security score” (0–100%), you might define a new **Score** that maps both onto a common 0–10 scale via monotonic functions. Without such a bridge, do not directly mix metrics – keep them separate in analysis. This guarantees that any cross-metric reading has a well-founded basis.
    
7.  **Level optionality respected:** If your Characteristic doesn’t naturally have tiers, don’t force it to have **Level** names (you can leave the Level concept unused). Conversely, if your Characteristic is commonly described in categories, it’s fine to define Levels for clarity. The key is to use the Level field intentionally: either not at all (for truly continuous measures) or in a fixed, **non-overlapping** way (for discrete categories). Do not use “Level” for something that behaves like a continuous value (it would be confusing to assign a label where a number would do, or vice versa).
8. **Comparability test:** Two Coordinates are comparable iff same Characteristic+Scale (incl. unit, polarity). Otherwise — Score‑level only after a declared SCP to a bounded range.

_(The above serve as normative checkpoints. Many of these are automatically supported by using the standard metric templates in software: e.g. the system will enforce one Characteristic per template, require a unit for ratio scales, etc. The **Lexical rules** from A.17/E.10 are assumed: use canonical names and notations for all parts of the metric.)_
### Consequences

Adopting the minimal CSLC Standard in the kernel yields a number of benefits:

-   **Universal interpretability:** Every measurement is intrinsically self-describing. One cannot have a “mystery number” floating around; by design you must know it’s _X (Coordinate) on Y Scale of Z Characteristic_. This dramatically reduces miscommunication in reports and data exchange. An engineer and an analyst can share a metric knowing they interpret it the same way, because the context travels with the value. Level is optional when scale is tiered or discreet. 
    
-   **Safe comparison and aggregation:** Values can only be compared when they belong to the same Characteristic and Scale (or when an authorized SCP converts them). This prevents the common error of comparing apples to oranges. When cross-comparison is needed, the pattern funnels us into creating a proper normalization, which improves the soundness of composite scores. Essentially, it’s now impossible to accidentally average an uptime percentage with a user satisfaction rating, for example, without explicitly defining how to map one to the other.
    
-   **Flexibility across domains:** The pattern is **transdisciplinary**. It doesn’t matter if the measurement is temperature in Kelvin, length in inches, code complexity in “abstract points,” or user satisfaction on a five-level Likert scale – all are handled uniformly. This makes it easier to plug new patterns for new domains into FPF, since they don’t need special rules for their metrics; they just instantiate the CSLC template in their context.
    
-   **Ordinal and cardinal handled with equal rigor:** By explicitly classifying scales, the pattern gives ordinal data the respect it deserves (no pretending it’s numeric) and gives ratio data the formal context it needs (units, zero, etc.). This balance means both qualitative assessments and quantitative measurements live side by side, each with their constraints respected. Domains that lean heavily on categorical ratings benefit from the **Level** concept (with no pressure to assign fake numbers), and domains that use real measurements benefit from unit enforcement and type-aware computations.
    
-   **Clarity in multi-factor scoring:** The prohibition of implicit multi-characteristic measures means that any “overall” score or index has to be constructed out of known pieces. This tends to improve the transparency of complex scoring schemes. If an organization wants to create a single index from 5 different metrics, A.18 forces them to introduce a defined ScoringMethod function that combines those 5 Coordinates into one Score, with declared monotonicity and bounds. The consequence is that composite metrics become auditable and debatable (you can examine the weighting or formula) rather than opaque sums.
    
-   **Methodological neutrality (and innovation):** Because the kernel imposes no method for obtaining the values – only how to frame them once obtained – patterns and tool builders are free to innovate in how they measure things. The Standard just ensures that once they do, everyone else can understand and use the results correctly. This separation of concerns (what vs. how) accelerates multi-disciplinary collaboration: a social scientist’s observational scale can feed into a systems model without any confusion, as long as it’s couched in the CSLC terms.
    

On the downside, **users must do a bit more upfront work** to define their metrics. The pattern’s requirements (declare Characteristic, define Scale, etc.) mean one cannot simply say “we’ll track a risk score” without further detail. In practice, this is a _desirable_ trade-off: the extra effort (perhaps a few minutes to set up a metric template) prevents far greater confusion down the line. Another possible trade-off is **multiplicity of scales** – the pattern allows the same Characteristic to have multiple scales (in different contexts or versions), which might fragment data if not managed (e.g. two teams measuring “Performance” on different scales). However, it also provides the remedy: make the difference explicit and, if needed, build a conversion ScoringMethod. This explicitness is actually beneficial, as it highlights when “Performance (0–5)” is not directly comparable to “Performance (Percentage)”. In short, any fragmentation is out in the open and can be dealt with via alignment or bridging.

Overall, A.18’s consequences are overwhelmingly positive: **measurements become first-class, well-understood citizens of the model.** The cost is a slight increase in definition effort and discipline, which is a small price for coherence. Once this pattern is in place, higher-level patterns (in Parts B, C, D) that reason about metrics can rely on it. For example, trust calculations (Part D) can assume that any metric they consume has a known scale and meaning, and knowledge dynamics algorithms (Part B or C) can safely combine evidence knowing the comparisons are valid. The minimal CSLC Standard is thus a foundational enabler for robust, cross-domain assurance in FPF.
### Rationale

The rationale behind A.18 is to enforce _semantic clarity_ at the data level, thereby solving a host of downstream problems. Without this pattern, one must constantly ask, “What does this number mean? Can I combine these two values?” – questions that have led to many project errors. By building the answers into the framework (“every number knows its unit, scale, and aspect”), we front-load the work and eliminate ambiguity. The solution directly addresses each force:

-   **Transdisciplinarity:** We include both ordinal and cardinal mechanisms so that no discipline’s metrics are left out. This was informed by observing multi-disciplinary teams: e.g., in a single project, a human factors specialist might rate usability (ordinal) while an engineer measures throughput (ratio). A.18 gives them a common language and prevents one from misusing the other’s data. It embodies the idea that _universal structure enables local freedom_: everyone’s metric can plug in, as long as they specify it properly.
    
-   **Comparability vs. freedom:** The pattern strikes a balance by tying comparability to explicit commonality. If two metrics truly measure the same thing in the same way, then of course you can compare them – they’ll share Characteristic and Scale. If they differ, the framework doesn’t stop you from defining them (freedom), but it does stop you from _conflating_ them inadvertently. The introduction of **polarity** declarations is a direct response to this tension: it adds a tiny burden (must declare “higher is better” etc.) but yields big pay-off in avoiding mis-ordered interpretations and enabling safe composite scoring (monotonic ScoringMethods).
    
-   **Ordinal vs. cardinal separation:** The rationale here is guided by measurement theory: we want to preserve information content. Treating ordinal data with only order operations preserves all its information; doing more (like adding them) injects false information. The pattern’s strictness on scale types forces modelers to be honest about what their data can and cannot do. This not only prevents errors but also encourages **best practices** (e.g. if you find you desperately want to average an ordinal score, perhaps you should refine it into an interval scale in your methodology). The outcome is a framework that respects both the **qualitative** and **quantitative** realms appropriately, aligning with **FPF’s Pillar of Pragmatism** – use formalism where it’s justified, but not beyond its limits.
    
-   **Optional Levels:** Requiring Levels in every case would have been too rigid (not everything has named tiers), but not supporting them would fail domains that rely on them (like maturity models or grading systems). The rationale for making Level _optional_ is to accommodate both. We saw in practice that many metrics naturally form tiers (e.g. technology readiness levels TRL 1–9) and giving them a slot in the model (instead of burying them in definitions) makes those metrics much easier to work with and integrate. Meanwhile, continuous metrics carry no baggage of unused fields. This design was checked against existing standards (like ISO 25024 for quality measures) to ensure we aren’t deviating from industry expectations: indeed, separating the concept (Characteristic) from the scheme (Scale) aligns well with standards, and including an optional categorization aligns with common practice in capability maturity models, etc.
    
-   **Method neutrality:** The decision to _not_ include any measuring procedures in A.18 (no specific formulas, no mandated evidence type) comes from the principle of separation of concerns. The kernel should provide the _what_ and _how (structurally)_, while patterns provide the _how (procedurally)_. This keeps the kernel lean (**P‑1 Cognitive Elegance**) and allows domain experts to implement whatever method is appropriate, merely committing to wrap their results in the CSLC form. By doing so, we avoid any bias toward empirical vs analytical, or manual vs automated measurements – FPF welcomes all, as long as they conform to the schema. This was rationalized by examining case studies: e.g., some reliability metrics come from formal proofs (analysis), others from testing (empirical) – the kernel can host both results identically, requiring only that each result says what it measured and on what scale.
    

In essence, A.18 is the _infrastructure of meaning_ for metrics. It may appear as a simple template, but it’s profoundly enabling. It forces clarity at creation time, so we don’t have to infer or debate meaning at usage time. The pattern’s strength lies in preventing errors that _don’t have to happen_. It encodes lessons from both metrology (the science of measurement) and everyday data science (where unit errors and mis-comparisons are infamous issues). The rationale is backed by these lessons: **fix the interpretation rules in the design, and you eliminate entire classes of confusion and mistakes.** By having this in the kernel, every mechanism – from knowledge scoring to system performance – benefits immediately, and their results become interoperable to a degree that would be impossible without a common structure.
### Relations

-   **Extends/Uses:** **A.17 (CHR-NORM)** – A.18 explicitly builds on the canonical terminology established in A.17. It uses the term **Characteristic** as defined there (and no other synonyms) and carries forward the edict that “axis/dimension” be treated as mere narrative aliases. It also leverages the Entity-vs-Relation Characteristic distinction from A.17: Section 7.4 of this pattern references tests for disambiguating relational metrics. Essentially, A.17 provides the **lexical and conceptual groundwork** (what a Characteristic is, and the basic vocabulary), while A.18 provides the **structural and normative rules** for linking Characteristics to measurements.
    
-   **Core foundation for metrics:** This pattern underpins the **Measurement & Metrics Characterization spec (C.MM‑CHR)** – the pattern that implements metric storage and computation. In MM-CHR, every `U.DHCMethodRef` and `U.Measure` follows the CSLC format defined by A.18. By lifting CSLC rules to the kernel, we ensure all FPF patterns (like **KD-CAL** for knowledge dynamics, **Sys-CAL** for systems, or any custom CAL/CHR) share a common approach to metrics. A.18 also informs the design of **CHR-CAL (Characterisation Calculus)**, which generalizes measurable property templates: CHR-CAL relies on the one-Characteristic-per-metric assumption and the comparability rules set here to compose higher-level characterizations.
    
-   **Enables dynamic reasoning:** A.18’s insistence on well-defined Scales allows patterns like **A.3.3 `U.Dynamics`** (system dynamics models) to incorporate measurement dimensions as state variables without ambiguity. For example, a `stateSpace` in a dynamics model can be explicitly defined as a set of Characteristics (each with units and ranges), making simulations and traces dimensionally consistent. If A.18 were not in place, one model might treat “performance” as a 1–5 score and another as a probability – combining them would be incoherent. With A.18, such differences must be reconciled via a ScoringMethod or kept separate, preserving coherence in multi-model analyses.
    
-   **Coordinates with assurance patterns:** Many patterns in Part B and D (for trust, assurance, and ethics) involve **scores** and **metrics**. For instance, **B.3** (Assurance Levels) computes overall assurance from evidence scores; A.18 ensures those input scores are well-defined and comparable (e.g. all are 0–1 or all are percentages, with polarity noted). **D.4** (Trust-Aware Calculus) might combine trust metrics across domains – again, A.18 provides the common ground so that a “trust score” coming from an operational metric and one coming from a social rating can be normalized and compared meaningfully. In summary, any pattern that aggregates or uses measurements is constrained (in a positive way) by A.18’s rules. They “plug into” this framework.
    
-   **Constrained by lexical rules:** This pattern’s content is part of the formal lexicon governance. It works within **E.10 LEX-BUNDLE**, which means the terms _Characteristic, Scale, Coordinate, Level,_ etc., are controlled vocabulary. A.18 localizes some generic requirements from A.17 (for example, A.17 mandates polarity in principle; A.18 requires it be declared per template in practice). It also aligns with external standards: by having explicit scale types and units, it dovetails with ISO/IEC measurement terminology and allows straightforward mapping to frameworks like **ISO 80000 (quantities and units)** and **Stevens’s scale types**. This relation to standards is deliberate – it eases **F.9 (Alignment Bridge)** construction to external ontologies by having a clean internal schema (A.18 provides that schema). In effect, A.18 is where FPF’s internal consistency meets external compatibility, ensuring our measurement semantics can relate to those outside FPF when needed.
### A.18:End
## CharacteristicSpace & Dynamics Hook (A.CHR‑SPACE)

### Reading path for engineer-managers

> **Informative (navigation only).** This subsection is a didactic index for human readers. It introduces no new norms and does not change semantic ownership.

**When to use this path.** You need to review a CHR-enabled plan or audit, or coordinate engineering work across teams, without deep-diving every CHR mechanism up front.

**Step 1 — Measurement vocabulary: what is measured, and what “comparable” can mean.**

* **A.17** — canonizes the technical anchor **Characteristic** (and retires near-synonyms such as “axis/dimension/feature/property/metric” from normative Tech register).
* **A.18** — CSLC discipline (**Characteristic / Scale / Level / Coordinate**) as the metrology of interpretability, comparability, and lawful aggregation.
* **C.16 (MM‑CHR)** — the measurement substrate (`U.DHCMethodRef`, `U.Measure`, `U.Unit`, `U.EvidenceStub`) and the conservative baseline of **direct comparability** (“same template”). C.16 makes coordinates auditable; it does not define CHR mechanisms.

**Step 2 — Ontology and contract surfaces the CHR suite operates on.**

* This pattern **A.19** — `U.CharacteristicSpace` and the dynamics hook: the base ontology of measurable coordinates and their spaces.
* **A.19.CN** — CN‑frame / **CN‑Spec**: the governance card for normalization and comparability routing, indicator policy, aggregation routing, and acceptance; it explicitly points to **C.16** for evidence/backing and to **G.0** for legality gates.

**Step 3 — Legality gates and mechanism shape (what to check when numbers appear).**

* **G.0 (CG‑Spec)** — the legality gate for numeric operations and comparisons (SCP, ComparatorSet, MinimalEvidence, Γ_fold, crossings/plane pins). CHR mechanisms cite CG‑Spec; they do not duplicate it.
* **A.6.1 / A.6.5** — the mechanism norm‑form (`U.Mechanism.Intension`) and slot discipline. Read once so the structure of each mechanism owner pattern (slots, operators, laws, admissibility guards, audit anchors) is predictable.

**Step 4 — The CHR suite boundary and the P2W seam.**

* **A.19.CHR (CHRMechanismSuite)** — focus on:
  * `A.19.CHR:4.1` (published objects),
  * `A.19.CHR:4.2.1` (CHR SlotKind lexicon),
  * `A.19.CHR:4.2.2` (canonical mechanism targets),
  * `A.19.CHR:4.5` (suite protocols — order/optionality live here, not in `mechanisms[]`),
  * `A.19.CHR:4.6–4.7.2` (P2W planned-baseline hook and the plan-item shape),
  * `A.19.CHR:7` (suite conformance checklist).
* **A.15.3** — `SlotFillingsPlanItem` (planned baseline discipline: planning vs enactment).
* **E.18 (E.TGA)** — how to express the actual pipeline/flow graph (including crossings) while keeping suite and plan artefacts refs‑only.

**Step 5 — The six CHR mechanism owner patterns (read one at a time).**

Each mechanism below owns its `U.Mechanism.Intension` card and assumes the measurement-lawfulness base from **A.17/A.18** and **C.16**.

1. **A.19.UNM** — normalization (CV→NCV, `≡_UNM`, `TransportRegistryΦ`).
2. **A.19.UINDM** — indicatorization (policy-bound indicator selection; no “NCV ⇒ indicator” shortcut).
3. **A.19.USCM** — scoring (SCP-first; no implicit UNM).
4. **A.19.ULSAM** — lawful aggregation (explicit `Γ_fold`; ordinals are not averaged).
5. **A.19.CPM** — comparison (set-valued outcomes; no silent scalarisation/totalisation).
6. **A.19.SelectorMechanism** — selection kernel (set-returning; dominance/portfolio defaults are policy-bound).

**Step 6 — Specialization and reuse.**

* **E.20** — how to use specializations of mechanisms (`⊑` / `⊑⁺`) without breaking SlotKind meaning or introducing hidden inputs; consult this whenever you see project‑ or domain‑specific variants of the CHR mechanisms.

**Fast review entry points.**

* If you are reviewing a plan: start from **A.19.CHR:4.6–4.7.2** (planned baseline hook + plan item shape) and **A.15.3** (what a planned baseline may/may not contain).
* If you are reviewing semantic drift: start from **A.19.CHR:4.2.2** (canonical targets), then use **E.10** (suffix discipline) and **F.18** (alias docking) to preserve public continuity while fixing terminology.
* If you are reviewing conformance: start from **A.19.CHR:7** (suite checklist), then consult the relevant **A.19.<MechId>** checklist(s) for mechanism-level conformance; use **E.19** for the review protocol.

**Non‑duplication note.** This pattern defines `U.CharacteristicSpace` and the typing hook `U.Dynamics.stateSpace`. It reuses the canonical measurement concepts (`U.Characteristic`, **CSLC** terms) from **A.17/A.18** and remains notation‑neutral about storage/IDs.  
This pattern is intentionally **not** a second semantic owner for CHR mechanisms: it may *use* CHR‑mechanism terms when talking about comparability and certification, but it does so strictly by *Tell + Cite* to the corresponding `A.19.<MechId>` mechanism‑owner patterns.

**Single‑owner rule (Normalization & CHR mechanisms referenced here).** This pattern **MUST NOT** be a second semantic owner for CHR‑mechanism vocabulary.
- **Normalization vocabulary + admissibility** (UNM artifacts: `UNM`, `NormalizationMethod`, `NormalizationMethodDescription`, `NormalizationMethodInstance`, **NCV**, **≡_UNM**, `NormalizationFix`; κ‑retirement; “map vs Map” lexical guard) are owned normatively by **A.19.UNM**.
- **Indicatorization vocabulary + admissibility** (UINDM artifacts: `IndicatorChoicePolicy`, `Indicator`, `IndicatorSet`, indicatorization as a policy step; “NCV ⇒ indicator” prohibition) are owned normatively by **A.19.UINDM**.
- **Other CHR mechanism vocabulary referenced here** (e.g., scoring / aggregation / comparison / selection terms) is owned normatively by the corresponding mechanism‑owner pattern in the `A.19.<MechId>` family (e.g., `A.19.USCM`, `A.19.ULSAM`, `A.19.CPM`, `A.19.SelectorMechanism`).
- **Evidence/calibration backing** for normalization is owned by **C.16 (MM‑CHR)**.
- **CN‑frame surface wiring** (how CN‑Spec references normalization/comparability by fields/refs) is owned by **A.19.CN (CN‑Spec)**.
- **Vocabulary extension rule.** If this pattern needs a new normalization / indicatorization / scoring / aggregation / comparison / selection term, it SHALL be introduced in the corresponding mechanism‑owner pattern first, then cited here (*Tell + Cite*). A.19 SHALL NOT mint new CHR‑mechanism vocabulary.

**Terminology pointer (informative; do not duplicate).** When A.19 uses normalization or indicatorization terms below, it uses them *by reference* to **A.19.UNM** / **A.19.UINDM** and **C.16**. This pattern only constrains how such artifacts are **cited** when doing state‑space comparability, embeddings, and certification.

**Reader map (informative).**
* If you need the **meaning** of `UNM`, `NCV`, `≡_UNM`, or `NormalizationFix` / `NormalizationFixSpec`: see **A.19.UNM**.  
* If you need the **meaning** of `IndicatorChoicePolicy` / indicatorization: see **A.19.UINDM**.  
* If you need the **CN‑Spec field/Ref wiring** (`CN_Spec.normalization`, `CN_Spec.comparability.*`): see **A.19.CN**.  
* If you need **evidence/calibration backing** for normalization or scoring legality: see **C.16 (MM‑CHR)**.  
* If you need **cross‑context alignment mechanics**: see **F.9 (Alignment Bridge)** and the `Transport` discipline (A.6.1).
### Intent & Scope (Normative)

**Intent.** Establish a **kernel‑level state‑space type**—`U.CharacteristicSpace`—so that any holon’s **state changes** (e.g., a system’s condition or a role’s readiness) can be formalized as **trajectories in a space of declared Characteristics with chosen Scales**. For **epistemes**, state is governed by **ESG**; **F–G–R** are **assurance coordinates**, not a state space. This gives every `U.Dynamics` model a well‑typed `stateSpace` and enables formal state certification (using RoleStateGraph checklists) instead of narrative stage transitions.

**Scope.** Pattern A.19 **defines**:

-   the **type** `U.CharacteristicSpace` as a finite product of **slot value sets** (per A.18),
-   the **slot** construct for each factor (a pairing of a **Characteristic** with a chosen **Scale**),
    
-   minimal **structural overlays** (optional **order**, **topology**, **metric** hooks) that downstream patterns _may_ attach to a space, and
    
-   the **hook** `U.Dynamics.stateSpace : CharacteristicSpace` – i.e. the requirement that any dynamics model declare a CharacteristicSpace for its state space (typing only).
    

A.19 **does not** introduce any new measurement aspects, composite metrics, or **normalization semantics** (owned by **A.19.UNM**, with evidence/calibration under **C.16 (MM‑CHR)**), and it does not define how dynamics evolve over time or any predictive laws (see **A.3.3** for dynamics semantics). The focus here is purely on the _structure of state spaces_ and their comparability.

**Lexical guard (“map”).** Follow the normalization lexical discipline owned by **A.19.UNM**. In this pattern, lowercase **map** is used only in the mathematical sense, while capitalized **Map** retains its Part‑G suffix meaning (e.g., `DescriptorMap`). Do not mint new normalization terminology here.

**Lexical guard (“carrier”).** In kernel prose, **Carrier** (capitalized) names `U.Carrier` (a **symbol bearer**). Do **not** use “carrier” for set‑theoretic supports; prefer **ValueSet**/**underlying set**. A.19 therefore uses **ValueSet(slot)** for the set that supplies values to a slot.
### Context (Informative)

FPF’s kernel already standardizes **what** is measured (a **Characteristic**, per A.17) and **how** it is measured (a **Scale** with units, via the **CSLC** Standard in A.18). We also have a measurement substrate (`U.DHCMethodRef`, `U.Measure`) to handle individual observations. What has been missing for modeling **dynamics** is a canonical “Context” in which **multiple Characteristics** can co-exist so that complex **states** (with many aspects) and their **trajectories** are well-typed and comparable. Without a formal CharacteristicSpace, teams either hard-code ad-hoc vectors (often with inconsistent assumptions) or fall back to informal lifecycle stories (“phases” or stages) that contradict the kernel’s open-ended, non-linear evolution paradigm. The Architectural patterns (A-cluster) expect that `U.Dynamics.stateSpace` will be a set of **declared Characteristics each with a declared Scale**. Pattern A.19 delivers exactly this capability, leveraging the CSLC measurement discipline without reinventing any arithmetic or unit-handling logic.
### Problem (Informative)

-   **P1 — “Feature vector” drift.** In practice, teams often assemble state vectors or “feature” lists with implicit or mismatched units and scales. Without a formal space, one coordinate’s value can’t safely be compared or combined with another’s (e.g. mixing degrees Celsius with percentages). **CSLC** guarantees consistency **per Characteristic**, but a bundle of multiple “characteristics” remains under-specified if we lack a unified space definition.
    
-   **P2 — Lifecycle bias.** Absent a formal state space, system change tends to be described in terms of fixed **stages or phases** (design phases, maturity levels, etc.). This conflicts with FPF’s **open-ended** stance: in FPF a role’s state model (RSG) allows re-entry and refinement of states rather than one-way lifecycle stages with an “end.” We need a space model that treats evolution as continuous movement, not a one-directional sequence.
    
-   **P3 — Incoherence across CN‑frames.** Different modeling “CN‑frames” (architecture vs. epistemic vs. operational) often choose different sets of qualities to measure (different sets of characteristics). Later, however, we may need to **compose** these models or **project** one into another. Without a kernel notion of how one state space can be a **subspace** of or **embedded** in another, any integration of models will be ad hoc and error-prone.
    
-   **P4 — Relational measurements.** Some Characteristics are inherently **relational** (e.g. a _Coupling_ between two components, or _Distance_ between points). Naïvely forcing such traits into a single-object feature vector loses critical information (arity, symmetry). The kernel already distinguishes single-entity vs multi-entity Characteristics (A.17); we must preserve that distinction in the state space so that a relational metric isn’t treated as an intrinsic one by mistake.
    
-   **P5 — The geometry temptation.** When defining a state space, it’s tempting to assume or inject additional structure (ordering of states, topologies for continuity, metrics for distance) as if inherent. But the kernel must remain minimal and domain-neutral: it should not **smuggle in** analysis methods or domain-specific norms under the guise of geometry. Any such structure should be added explicitly by specialized patterns, not baked into the core definition of a space.
### Forces (Informative)

-   **F1 – CSLC integrity at scale.** When combining multiple measurements into a state, we must uphold the **CSLC discipline** for each component: each coordinate has a defined Characteristic, Scale type, unit, and (if applicable) polarity. We need to do this without redefining or duplicating that single-characteristic integrity – the multi-dimensional space should simply enforce CSLC per slot.
    
-   **F2 – Transdisciplinarity & lexical clarity.** The state space framework must work for **quantitative physical metrics** (ratio scales, continuous units), **qualitative assessments** (ordinal scales, tiers), and mixtures thereof. It must not be biased toward one domain’s notion of measurement. At the same time, to avoid confusion, the **lexicon must remain canonical**: we use _Characteristic_ (not “axis/dimension”) as the formal term for a measured aspect, regardless of domain, per A.17’s naming convention.
    
-   **F3 – Arity and semantics.** Lifting various Characteristics into a unified space should not obscure their nature. If a Characteristic is defined as a relation (multi-entity property), the state space must represent it appropriately (e.g. as a coordinate that is a tuple or a symmetric relation) rather than flattening it into an unrelated scalar. Entity-specific vs relational properties must remain clear in the space’s structure.
    
-   **F4 – Minimal core, extensible further.** The kernel should provide only the **bare essentials**: a carrier for state with proper typing. It should be possible to impose additional structure like order, topology, or metrics _if and when needed_ by downstream theories, but these must be **optional overlays**. The core space definition should be minimalistic to allow broad use, yet capable of extension for advanced needs.
    
-   **F5 – Composability of spaces.** We need well-defined operations to **project** a state space to a subspace (dropping some Characteristics), **embed** one space into a larger space (mapping coordinates from one context to another), and take **products** of spaces (combining different state spaces into a joint space). These operations are crucial for composing sub-models, comparing alternatives, or aligning different “CN‑frames” (for example, linking an architectural model’s state space with a metrics model’s space). The approach must support such composition in a principled way.
    
-   **F6 – Alignment with RSG (state machines).** In FPF, formal **state certification** is done via checklists on RoleStateGraphs (A.2.5). Our state space concept must complement that: i.e. the **state** of a holon remains an **intensional** concept (defined by criteria), but those criteria are evaluated against the measurable **coordinates** in a CharacteristicSpace. The design must allow checklists to map observed coordinates to named states and enable re-certification as states evolve, rather than locking states into a static progression.
### Solution

#### U.CharacteristicSpace

##### Type signature

Let **I** be a finite index set labeling a collection of **slots**. Each **slot** _i_ (for _i ∈ I_) is defined as a pair:

> **`slot_i = (Characteristic_i, Scale_i)`**,

where:

-   `Characteristic_i` is a `U.Characteristic` (with an explicit arity, i.e. either an entity-Characteristic or a relation-Characteristic as defined in A.17), and
    
-   `Scale_i` is a chosen **Scale** for that Characteristic (with a specified scale type and unit, per A.18 and the MM‑CHR rules).
    
Then a **CharacteristicSpace** (CS) is formally the Cartesian product of all slot **value sets**:

$$\mathbf{CS} = \prod_{i \in I} \mathrm{ValueSet}(\mathrm{slot}_i)\,.$$

In other words, a point (state) in the space consists of one coordinate value for each slot. A **state** _x_ in CS can be seen as a total function _x(i)_ that picks a value from each slot’s **ValueSet** (for every _i ∈ I_, _x(i) ∈ ValueSet(slot\_i)_). By kernel mandate, any `U.Dynamics.stateSpace` **SHALL** be bound to some instance of `CharacteristicSpace`, and all states or trajectories described by that dynamics model **MUST** lie within that space’s **value set**. (The actual dynamic **laws** and time progression are handled in A.3.3; A.19 only defines the state‑space container and its properties.)
##### Slot discipline (invariants)

To ensure consistency and comparability, a CharacteristicSpace must obey the following invariants:

-   **A19-CS-1 (Exactly one per slot).** Each slot **binds exactly one** Characteristic to **exactly one** Scale (including a specific Unit or kind, if applicable). This mirrors the CSLC clause of “one aspect – one scale”: there are no ambiguous or compound mappings in a single slot. (If a Characteristic can be measured on multiple scales, only one is chosen for a given space; others would require separate slots or a different space.)
    
-   **A19-CS-2 (Named basis).** A CharacteristicSpace **SHALL** publish an ordered list of its slots as its **basis**. Each slot in the basis has a stable identifier (or key) that can be used in data structures or APIs. These basis names should be treated as technical identifiers (machine-readable tokens); any human-friendly alias or description for a slot should be provided only in the Plain register as a non-normative aid (per E.10). In short, the identity and order of slots in the space are explicit and stable.
 -   **A19-CS-2 (Named basis).** A CharacteristicSpace **SHALL** publish an ordered list of its slots as its **basis**. Each slot in the basis has a stable identifier (or key) that can be used in technical notations and interfaces. These basis names should be treated as stable technical tokens (identifier‑like); any human-friendly alias or description for a slot should be provided only in the Plain register as a non-normative aid (per E.10). In short, the identity and order of slots in the space are explicit and stable.
    
-   **A19-CS-3 (Immutability of meaning).** Once a space is in use, the meaning of each slot is fixed. A slot’s `(Characteristic, Scale)` pair **MUST NOT** be retroactively altered. If requirements change (e.g. a different scale or a revised definition of the Characteristic), one **MUST** define a new version of the space (or a new slot) rather than silently changing the existing one. When a space is versioned or a slot replaced, an explicit **embedding** (mapping from the old space to the new space) should be published to relate historical states to the new coordinates. This ensures past data remains interpretable and prevents semantic drift.
    
-   **A19-CS-4 (Arity preservation).** If a `Characteristic_i` is defined as a **relation** (multi-entity characteristic), then slot _i_ represents a relationship among multiple entities. The coordinate value at such a slot is a **tuple** (with the appropriate entity types) rather than a simple scalar. The slot’s declaration **SHALL** indicate the relation’s symmetry or directionality as part of its meaning (this should align with how the Characteristic was originally defined in its template). In essence, relational Characteristics retain their arity in the space, so that we don’t confuse, say, “Coupling between X and Y” with an intrinsic property of X or Y alone.
 
 -  **A19-CS-5 (No hidden normalizations or aggregations).** A CharacteristicSpace itself carries **no implicit normalizations or formulas** for combining coordinates. It is a _descriptive_ structure, not a scoring mechanism. Any computation that combines or transforms coordinates (e.g., **normalizing**, **indicatorizing**, **scoring**, **Γ‑folding**, **comparing**, or **selecting**) must be defined outside the core space—typically as an explicit **CHR mechanism step** and cited from its designated mechanism‑owner pattern (`A.19.UNM`, `A.19.UINDM`, `A.19.USCM`, `A.19.ULSAM`, `A.19.CPM`, `A.19.SelectorMechanism`).  
   *Normalization semantics and admissibility* are owned by **A.19.UNM**; *evidence/calibration backing* is owned by **C.16 (MM‑CHR)**.  
   In particular, any handling of **polarity** (which way “better” is), weighting, or cross-slot aggregation happens in those external mechanisms/policies, not inside the space definition. The space provides the raw coordinates; the logic to interpret or aggregate them is added by domain‑specific layers with explicit disclosure of how it’s done.

 - **A19-CS-6 (Slot meta completeness).** Where applicable, each slot **SHALL** declare `admissible_domain` and **missingness semantics** (e.g., codes for *missing*, *censored*, *not-applicable*), consistent with the Characteristic’s Scale and with MM‑CHR. This prevents silent domain drift and clarifies how absent values participate in predicates and comparisons.
##### Minimal structure hooks (optional overlays)

By default, a CharacteristicSpace has no assumed ordering or metric structure – it is just a Cartesian product of value sets. However, a space **MAY** declare certain structural attributes _as opt-in metadata_ (i.e. informative annotations that patterns can rely on, but not enforced by the kernel). These optional **overlays** include:

-   **Product topology.** A **topology** on the space, typically the product topology when slots that are quantitative (interval or ratio scales) need continuity considerations. Declaring a topology is useful if continuity or convergence arguments are relevant (e.g. to say a sequence of states approaches a limit state). By default, without declaration, no topological structure is assumed on the space.
    
_Lexical note:_ Here **“distance metric”** strictly means a mathematical distance function (or a generalized distance such as a **pseudometric** or **quasi‑metric**) on the state space. This is **not** to be confused with *metrics* as performance measures in MM‑CHR. In the **Tech** register, avoid the noun **metric**; refer to **`U.DHCMethod`/`U.DHCMethodRef`** for measurement templates (see **C.16**). Any distance overlay on a CharacteristicSpace must not conflict with scale semantics; it is an additional analysis structure, not a redefinition of measurement meaning.

These overlays are entirely **optional** and have no effect on the core meaning of the space – they exist only to support particular needs (like making **dominance**, **continuity**, or **distance** reasoning possible) in models that require them. If needed, they should be added deliberately by an architectural theory rather than assumed. This way, any ordering or metric properties of states are made **explicit** instead of relying on hidden or default arithmetic. _(Rationale:_ The CSLC and MM‑CHR rules already govern what operations are allowed on each scale; A.19’s approach is to let higher-level theories layer on an order, topology, or metric when appropriate, so nothing is taken for granted tacitly in multi-dimensional arithmetic._)_
##### Dynamics hook (typing only)

Any model of change or dynamics in FPF must declare the state space it operates over. Formally, `U.Dynamics.stateSpace` **SHALL** be specified as a reference to a `CharacteristicSpace`. This creates a typing obligation: the dynamic model can only produce states (and trajectories of states) that lie in the given space. All predicates or predictions in such a dynamics model are understood to **quantify over** sequences of points in that CharacteristicSpace (with time semantics governed by A.3.3’s time base and laws). **Note:** A.19 defines only the structure of the state space; it deliberately **does not** fix any time axis or dynamic law. Those remain the responsibility of the dynamics pattern (A.3.3). A.19 simply ensures there is a well-defined space in which states live, so that dynamics are decoupled from any narrative “stage” and instead treat evolution as movement through this space.
##### Lexical discipline (Normative)

In all **normative references, definitions, and identifiers** related to this pattern, the specification uses the canonical measurement terminology: **Characteristic**, **Scale**, **Level**, **Coordinate**, **CharacteristicSpace**, **slot**, **basis**. Legacy terms like “axis”, “dimension”, or “point” are **forbidden** in Technical/Formal registers of the spec (per A.17’s lexical rules). They may appear _at most once_ in explanatory **Plain** language as mapped aliases to aid understanding (and if used, must be explicitly identified as equivalent to the official terms). In this pattern, we consistently use “slot” or “basis element” (never “axis”) to refer to a component of a space, and “Characteristic” (never “dimension”) to refer to the measured aspect. This lexical discipline ensures clarity and consistency across the framework (see A.17 and C.16 L-rules for the formal policy on terminology).
##### Quotients & NormalizationFix (Normative)

**Owner note.** `≡_UNM` and `NormalizationFix` are defined in **A.19.UNM**. This section constrains only how they are **cited** when used in state‑space reasoning.

**Design rule — read invariants, not labels.** Any checklist, acceptance predicate, or comparability claim over a CharacteristicSpace **SHALL** be evaluated on **quotients by ≡_UNM** (or on explicitly **Normalization‑fixed** charts), not on raw labels.
**Design rule — read invariants, not labels.** Any checklist, acceptance predicate, or comparability claim that depends on representation choice (chart, unit, reference plane, or normalization route) **SHALL** be evaluated on **quotients by ≡_UNM** (or on explicitly **Normalization‑fixed** charts), not on raw labels.

*Minimal obligations:*
1) **Name the quotient or fix.** If a checklist predicates over a **normalization‑variant** property, it **MUST** name the **NormalizationFix** (including the referenced **UNM** and the relevant `NormalizationMethodInstance`(s), by reference) and thus the **≡_UNM** class.
2) **Declare NormalizationMethod class.** Every normalization used **MUST** name its method‑class token and validity window **as defined in A.19.UNM** (do not restate the class taxonomy here).
3) **Join/equality only on invariants.** Equality checks and joins across spaces **MUST** target invariant forms (the **≡_UNM** quotient or a declared **Normalization‑fixed** representation), never raw un‑fixed coordinates.
##### Metric discipline & calibration (Normative)

Use the **weakest safe structure** required by the argument (pre‑order → semi‑metric → metric). 
* **If a distance overlay is declared**, any acceptance predicate or KPI defined over a CharacteristicSpace **SHALL be non‑expansive** (Lipschitz ≤ 1) w.r.t. the published `d` on the **declared domain** (raw coordinates or NCVs, as specified), or else state an explicit margin that absorbs any expansion.
* **If only an order overlay is declared**, any acceptance predicate/KPI **SHALL be isotone** w.r.t. the declared product order.

*Minimal obligations:*
1) **Publish the metric (if used).** If a distance overlay is used, the space **MUST** publish the distance function `d` (including any weights/parameters) and its declared domain of applicability.
2) **Bound expansion.** Any acceptance predicate/KPI that relies on `d` **MUST** be shown **non‑expansive** (Lipschitz ≤ 1); otherwise an explicit **expansion bound** and compensating **margin** **MUST** be stated.
3) **State error & commutation.** If a metric is used together with **NormalizationFix**, the specification **MUST** state (a) the maximum tolerated measurement/calibration error and (b) whether `d` **commutes** with the **NormalizationFix** (or provide a disclaimer and additional guard if it does not).
#### State Spaces & Comparability

> **Memory hook:** _We compare **only what lies in the same space** (or is translated into a common space via a declared mapping), and we only certify a holon’s **state** based on **observable coordinates** in that space (using a defined checklist). Anything else is just storytelling._

To make state-space reasoning practical across different contexts and models, this section provides the key **operators and criteria** related to CharacteristicSpaces:

1.  **Space operations** – how to derive a **Subspace**, establish an **Embedding**, or form a **Product** of spaces. These enable us to restrict a space to fewer slots, to map one space into another (with unit conversions, etc.), or to combine spaces (e.g. for composite models).
    
2.  **Comparability regimes** – two allowable ways to compare states: (a) **coordinatewise**, which requires strict sameness of space and units; or (b) **normalization-based**, which uses declared transformations to reconcile differences. We define when each applies and how to apply it properly.
    
3.  **RSG integration** – how formal **state certification** (via checklists in a Role’s state graph) ties into the CharacteristicSpace: ensuring that whenever we declare a system “Ready” or “Degraded”, it’s based on snapshot coordinates in a space. We also outline how to push or pull state definitions along space embeddings (so different contexts can translate states).
    
4.  **Archetypal examples** – “worked mini-schemas” illustrating typical usage in complementary CN‑frames (Operational, Assurance, Alignment). These examples show minimal models mixing entity and relational slots, how data might be structured, and how cross-context alignment works in practice.
    

> **Terminology note:** We often denote a CharacteristicSpace abstractly as **CS**. Formally, one can describe a CS as a tuple `⟨I, basis⟩` where _I_ is the index set of slots and _basis_ is the set (or ordered list) of `slot_i` pairs. When a CharacteristicSpace is attached to a specific **Role** in a specific **Context** (see A.2, A.2.5), we may call it an **RCS** (Role CharacteristicSpace) – essentially the state space for that role’s state machine within that bounded context. Individual **states** of a role live in an RSG (RoleStateGraph, A.2.5), and a **StateAssertion** is a certified claim that at a given time window, the holon’s RCS coordinates satisfy the checklist for a particular state.

##### CS Operators (notation-neutral, context-local)

To support model composition, we define operations on CharacteristicSpaces in a notation-independent way (so these can be implemented in any tooling or notation). All these operations are assumed to occur **within a single context** (within one `U.BoundedContext`) unless otherwise noted:

###### Subspace – Projection πS : CS → CS|S.

Given a CharacteristicSpace CS with basis _I_ (slots) and a chosen subset of slot indices $S \subseteq I$, one can form the **subspace** $CS|_S$ which includes only the slots in _S_ and omits all others. The projection map `π_S` takes any state _x_ in the original space and **projects** it onto the coordinates indexed by _S_, effectively discarding the other coordinates. This operation is straightforward: if $S = \{i_1, i_2, … \}$, then $CS|_S$ has those slots, and any state in $CS|_S$ corresponds to a state in CS with the other coordinates ignored. 
**Properties:** Projection is **idempotent** (`π_S ∘ π_S = π_S`) and, if an order or other structure is defined solely on the subspace’s slots, `π_S` preserves that structure (e.g. it will reflect any order that depends only on slots in _S_).
###### A.19:5.2.1.2 Embedding – Injection ι : CS₁ ↪ CS₂.

An **embedding** is a structure-preserving **injection** from one space CS₁ into another space CS₂. It consists of two parts: (a) an injective **slot correspondence** from CS₁ to CS₂, and (b) (only where needed) cited **normalization instances** that make the correspondence semantically safe. Formally, let CS₁ have basis _I₁_ and CS₂ have _I₂_. An embedding declares an injective function _m: I₁ → I₂_ that identifies each slot of CS₁ with a corresponding slot in CS₂. 

For each slot _i ∈ I₁_ where the scale/unit differs from the target slot _m(i)_ in CS₂, the embedding **MUST cite** a `NormalizationMethodInstanceId` (per **A.19.UNM**) that re‑expresses values from `ValueSet(slot_i)` into `ValueSet(slot_{m(i)})` within the declared invariants and validity window. The embedding does **not** define normalization semantics; it only references the required instances.

Intuitively, an embedding says: “Any coordinate tuple from CS₁ can be interpreted as a coordinate tuple in CS₂, possibly after converting units or re‑scaling, and without losing any information except what the declared **NormalizationMethods** intentionally **coarse‑grain**.” If there is no loss at all (**NormalizationMethods** are identity or strict conversions), the embedding is essentially an inclusion of one space into a larger one; if there is some information loss (e.g., converting a fine‑grained scale to a coarse one), that loss is explicit in the **NormalizationMethodDescription**. **Locality:** 

Embeddings are defined **within a single `U.BoundedContext`** (i.e., both CS₁ and CS₂ are in the same context). Using an embedding across contexts requires an **Alignment Bridge** (see F.9) and **MUST** be declared via the relevant mechanism’s **A.6.1 Transport** clause (BridgeId + channel + `ReferencePlane(src,tgt)` + any `CL^plane`; no implicit crossings).  

**Normalization declaration duties (MUST):** Each cited `NormalizationMethodInstanceId` **MUST** satisfy the declaration/admissibility obligations owned by **A.19.UNM** (incl. method‑class token and validity window). If such normalization artifacts are used for gating or assurance, their evidence/calibration backing and waiver rules are governed by **C.16 (MM‑CHR)**. In other words, you cannot assume one context’s space fits into another’s without an explicit Bridge; any attempt to do so must treat it as a cross‑context alignment with potential loss.
###### A.19:5.2.1.3 Product – Combination CS₁ ⊗ CS₂ = CS⊗.

The **product** of two spaces CS₁ and CS₂ is a new space **CS⊗** that effectively contains all slots of CS₁ and all slots of CS₂. If CS₁ has index set _I₁_ and basis slots {slot₁…} and CS₂ has _I₂_, then $CS⊗$ has index set $I\_⊗ = I₁ ⊎ I₂$ (disjoint union) with each slot’s definition carried over from its original space. In practical terms, any state in the product space is a pair _(x₁, x₂)_ where _x₁_ is a state of CS₁ and _x₂_ is a state of CS₂ (assuming the two spaces pertain to possibly different aspects or roles). **Use cases:** Product spaces allow modeling **multi-role scenarios** or bundling an entity’s state with some environmental or contextual state. For example, one might take a space of internal capability metrics and ⊗ with a space of external conditions to form a combined space for “readiness under conditions.” **Note:** When combining scores or coordinates from a product space, one must be mindful of scale incommensurability. Cross‑slot aggregation **SHALL** proceed only via a declared **Γ‑fold** (B.1) and, where needed, explicitly declared **NormalizationMethods**; naïve arithmetic is forbidden. The product operation itself doesn’t perform any aggregation; it only sets the stage.
##### Comparability of States (two admissible regimes)

A **state label** like "Ready", "Authorized", "Degraded", etc., in an RSG is an intensional category (defined by a checklist of conditions – see A.2.5). Determining whether the **states of two holons** are comparable (e.g. whether one is “better” or “worse” than the other in some multi-criteria sense) depends on **where** their state coordinates live and **how** we map those coordinates to a common basis. There are two admissible comparability regimes in FPF:

###### A.19:5.2.2.1 Coordinatewise comparability (≼_coord)

Two states can be compared **coordinatewise** only under strict conditions. Essentially, we require the states to be expressed in the **same measurement space**, with the **same units and scales**, and using the **same state definitions**. Formally, coordinatewise comparison is allowed **only if all of the following hold**:

-   **Same space.** The two holders’ state snapshots lie in the **exact same CharacteristicSpace** (and, if relevant, the same RCS attached to a Role in a given Context). It’s not enough that they have similarly named characteristics; they must share the actual defined space (same slots with same definitions).
    
-   **Scale congruence.** For each slot being compared, the scale type, unit, and polarity orientation are **identical**. For example, if comparing temperature readings, both must be on the same scale (say, °C on a ratio scale with “higher = hotter” orientation). No unit mismatches or differing interpretations can be present.
    
-   **State-definition congruence.** The states or status labels themselves must be defined in terms of the **same checklist criteria applied in the same space**. In other words, if we are comparing whether one system is “Ready” and another is “Ready”, both instances of “Ready” must derive from the same formal definition (same thresholds, same checklist logic) over those coordinates. If one context’s "Ready" means something different, you cannot assume they correspond.
    
When these conditions are met, one can define a **coordinatewise preorder** over states. Common patterns include:

- **Dominance:** For a given set of “higher is better” slots, we say state *x* **≼<sub>coord</sub>** state *y* if and only if for *every relevant slot a*, the coordinate $a(x) \le a(y)$ (**after orienting all slots to the declared polarity for that slot**). In other words, *y* is as good or better on all enforced criteria. This defines a Pareto-like ordering (often partial, not total).

-   **Threshold band inclusion:** If states are defined by meeting certain thresholds (e.g. State _Y_ means all metrics above specific levels), then we might say _x_ **≼<sub>coord</sub>** _y_ if _x_ meets every threshold that defines _y_’s state. For instance, if state _y_ = “High Performance” requires speed > 100 and accuracy > 90%, then _x_ is “no less than y” if _x_ also exceeds those thresholds.
    
By default, **no comparability** is assumed unless proven. If any of the above congruence conditions fails, one must **not** fall back to ad-hoc comparisons (like matching by name or normalizing without declaration). Either switch to a **normalization-based regime** or declare the states **incomparable**.
###### A.19:5.2.2.2 Normalization‑based comparability (≼_normalization)

When two state vectors do not meet the strict conditions for coordinatewise comparison (e.g. they come from different spaces, or the “same” Characteristics are measured on different scales/units), the only sanctioned way to compare them is: **normalize, then compare**.

Concretely: if we have state _x_ in CS₁ and state _y_ in CS₂, a normalization‑based comparison is permitted only if the model can cite a set of `NormalizationMethodInstanceId`(s) under a chosen **UNM** (per **A.19.UNM**) that lands the relevant coordinates of _x_ into CS₂ (or lands both into a declared common target space). The result is understood as **NCVs** (or an `≡_UNM` quotient class) per A.19.UNM.

**Comparability rule (normalize‑then‑compare).** We say _x_ **≼<sub>normalization</sub>** _y_ only if, after applying the cited normalization instances to produce a representation of _x_ in CS₂ (or a common target), the mapped state can be compared **coordinatewise** under `≼_coord`. In other words, we never compare raw _x_ and _y_; we compare *after landing in a common, well‑typed space*.

If the normalization crosses context boundaries (i.e., CS₁ and CS₂ are in different bounded contexts), then by FPF policy this mapping MUST be treated as a formal **Alignment Bridge** (F.9) with an associated **congruence‑loss (CL)** level and MUST be declared via the relevant mechanism’s **A.6.1 Transport** (BridgeId + channel + `ReferencePlane(src,tgt)`; no implicit crossings). In such cases, any conclusions drawn carry an assurance penalty per **B.3** (`Φ(CL)`).

**Auditability.** Each cited `NormalizationMethodInstanceId` used for comparison SHOULD be transparent via its referenced description/edition (per **A.19.UNM**). Evidence/calibration backing and waiver discipline are owned by **C.16 (MM‑CHR)**. The key here is that **no comparison is magic** – if values differ in scale or context, the normalization route and its limitations must be explicit.

> **Mnemonic:** _“Never compare before you **land** both points in the **same** well-typed space.”_ In other words, always map measurements to a common basis (same CharacteristicSpace and units) before attempting to say one state is ≥ or ≤ another. Directly comparing raw numbers from different scales or contexts is not allowed.
##### RSG touch-points — State certification via CS

To connect the abstract concept of a **space of metrics** with the operational concept of **states** (like “Ready” or “Degraded”) in a Role’s lifecycle, we introduce a **certifier** function that evaluates state predicates against coordinates: 

certify(Role, Context): Snapshot( RCS[Role,Context], Window )  ──→  {StateAssertion}

This is a conceptual sketch: given a **snapshot** of all relevant coordinates for a Role (in its RCS) over some time window, the certifier produces a set of **StateAssertions** that are deemed true in that window. Each StateAssertion claims that the holder is in a particular state (e.g. “Ready”) during the window, backed by evidence.

**5.2.3.1 From CS snapshot to StateAssertion (design → run).** Each possible state _s_ in a Role’s RSG has an associated **Checklist** _(s)_ – a design-time artifact (see A.2.5 §8.1) which is a predicate defined over the RCS’s coordinates (and possibly other contextual observables). For example, a state “Degraded” might have a checklist like “\[temperature < 50 °C\] AND \[pressure > 5 bar\] for 10 minutes”. When the system is running, we take an **Observation** of the current coordinates (a snapshot of the RCS at a given time or over a time window) and evaluate the checklist. A **StateAssertion**(holder, _s_, Window) is then a record that the checklist for state _s_ has been satisfied by the observed data in that interval. In other words, it’s a certified evaluation that “state _s_ holds true for this holon at this time.” Only observable, measurable facts go into these predicates (no subjective judgments), and each assertion is traceable to the specific evidence (observations) that support it. The Role’s **Green-Gate Law** (A.2.5 §8.4) then says that a Role can proceed with an enactment (e.g. performing work) if and only if there is a **StateAssertion** showing the holon to be in an **enactable** state at that time. This connects measurement to action: you can only act if you have evidence you’re in the right state to act. 
**Evidence kind & window.** Every StateAssertion **SHALL** record `evidence_kind ∈ {observation, prediction}`, the **window** `[t_from, t_to]`, and, if `prediction`, the **horizon Δt** relative to the observation base. Use of `prediction` in enactment gates is permitted **only** under the DYN/TIME constraints captured in **CC‑A19.17–A19.18**; otherwise a **fresh observation** is required.

**5.2.3.2 Translating state definitions across embeddings.** If we have an **embedding** ι: RCS₁ ↪ RCS₂ (for example, RCS₁ is a subspace or a different version of RCS₂), we might want to reuse or compare state definitions between the two. There are two directions to consider:
* **Pulling a checklist** (reuse state criteria from a larger space in a smaller space): Given a checklist defined on RCS₂ (the larger or target space), we can **pull it back** via the normalization map **N** of the embedding to get a predicate on RCS₁. This derived checklist (**Checklist₂ ∘ N**) lets us apply the RCS₂’s state definition to a holon that only has RCS₁ measurements. This is useful when a consumer context wants to evaluate whether a producer (with fewer characteristics or different units) meets the consumer’s state definitions. Essentially, the consumer asks: “If I map the producer’s metrics into my space, does it satisfy my state criteria _s_?”
 * **Pushing an assertion** (honor a producer’s certified state in a larger space): If a holon has a StateAssertion for state s’ in RCS₁, can we treat it as evidence for state s in RCS₂? This is only valid under a strict condition: the checklist for state s in the larger space, when composed with the normalization mapping **N**, must logically imply the checklist s’ in the smaller space (or vice versa, depending on which state corresponds to which). In practice, this often requires a proof of refinement: that meeting state s (in big space) guarantees state s’ (in small space), or that state s’ (in small) is sufficient for state s (in big space) given the normalization translations. If that condition is met (or a policy waiver is granted in lieu of proof), then an assertion in the smaller space can be **pushed up** to count as an assertion in the larger space. This mechanism allows, for example, a component’s certified state to satisfy a system-level state requirement, provided the relationship is formally established.
  
**5.2.3.3 Certification interface (pointer).** Operational interface examples and minimal data stubs are **informative** and live in **A.19.CN** (“Certification Interface Example”). Pattern A.19 only constrains **conceptual** obligations; no storage/ID scheme is mandated here.
  
_(In summary, embeddings not only allow numeric comparability, but also allow **state definitions** and **certifications** to be systematically translated between contexts, ensuring consistency in how we interpret “Ready”, “Failed”, etc., across different models.)_
##### Cross-context comparability & assurance hooks

When comparing states or metrics **across different bounded contexts** (different “context of meaning”), additional rules apply to maintain semantic integrity:

###### A.19:5.2.4.1 Direction & loss (Bridges).

Suppose we want to claim that “Holon X in Context B is in state _Ready_ as defined in Context A.” This requires an explicit **Alignment Bridge** declaration that maps the RCS of _(Role, Context B)_ to the RCS of _(Role, Context A)_ (or maps State B to State A). Such a Bridge (see F.9) will specify the correspondence of Characteristics (and the necessary **NormalizationMethods under UNM**) and a **congruence‑loss (CL)** level indicating how much fidelity is lost in translation. Critically, these Bridges are **one-directional** mappings unless explicitly made bidirectional. Just because we can interpret B’s state as an A-state does not mean we can go the other way without another mapping. The Bridge makes the mapping and any loss explicit. Without a declared Bridge, cross-context state comparisons or substitutions are not valid – there is no implicit global state space. The statement above, for instance, would only hold if we have something like “Bridge B→A (with defined NormalizationMethods) such that X@B can be viewed in A’s terms.” The **direction matters**: “B satisfies A’s Ready” does **not** imply the converse unless another bridge (A→B) is defined.
###### A.19:5.2.4.2 Confidence penalties for mapped comparisons.

Whenever a **normalization-based comparison** crosses Contexts (via a Bridge), assurance **MUST** apply the penalty **Φ(CL)** as **defined in B.3** (CL is **ordinal** there). For episteme‑specific compositions, **B.1.3** instantiates the same policy. This pattern does **not** restate the scale or Φ; it defers to **B.3**. For example, a safety argument that relies on a cross-context comparison might need to downgrade its certainty or include an extra safety margin.  This penalty **MUST** be declared as part of the assurance argument for the comparison (stating the Bridge used and its CL), so that the Φ(CL) discount can be reasoned and applied. No implementation‑level storage format or identifier is mandated by this pattern.
###### A.19:5.2.4.3 Declare “incomparable” when appropriate.

If for some critical Characteristic there is **no valid NormalizationMethod** to translate measurements between two contexts (e.g. the scale types are fundamentally different, or the measurement’s meaning doesn’t carry over), then the framework insists that we declare the states or metrics **incomparable** rather than attempting any fudge. No comparison should ever default to “close enough by name” or other heuristics. For instance, if one context measures “User Satisfaction” qualitatively and another quantitatively, and no monotonic mapping can be justified, one must simply say a user satisfaction state in context A cannot be compared to one in context B. Mark it incomparable and avoid any misleading conclusions. This rule guards against the natural temptation to compare things just because they have the same label or general intent, when in fact their measurement basis is different.
##### Certification pipeline (Minimal, Normative)

Canonical evaluation chain (notation‑neutral):

`raw coords → Normalize (UNM.NormalizationMethodInstance) → Quotient / NormalizationFix → (optional) Indicatorization (via IndicatorChoicePolicy) → (optional) Order/Distance overlay → Evaluate Checklist → StateAssertion → Green‑Gate`

**Strict distinction.** Steps may be **co‑implemented**, but are **logically distinct** and **MUST** be referenceable in assertions (**NormalizationMethodInstance/UNM** name or formula, overlay kind). A gate is **invalid** if any required step lacks a current, valid referent (e.g., expired **NormalizationMethodInstance** edition).
#### Operator library (notation‑neutral)

**Spaces:** `Sub` (projection), `Emb` (embedding), `Prod` (product), `Quot` (quotient by declared equivalence), `NormalizationFix` (fix to a named chart/edition).

**States/criteria transport:** `Pull` (pull checklist via embedding/NormalizationMethodInstance), `Push` (push assertion along embedding with proof/waiver), `Indicatorize` (apply **IndicatorChoicePolicy** to select Indicators), `Align_B` (cross‑context alignment via Bridge with CL), `Fold_Γ` (admissible aggregation/accumulation per B.1, with WLNK/MONO constraints).

**OP‑1 (Normative).** If `Align_B` is used in **gating**, the **Bridge used** and its **CL** **MUST** be declared in the assurance argument; the corresponding Φ(CL) penalty is applied per B.3. Silent cross‑context reuse is forbidden. (A.19 does not mandate any storage/ID scheme.)
### Conformance Checklist (normative) — CC‑A19

**Formality anchors & operational segregation (normative).** A.19 aligns with **C.2.3 Unified Formality Characteristic (F)**. The legacy tier labels **T0/T1/T2 are deprecated**; speak **F** directly and treat operations separately (see **E.10** for registers).
— **F-Surface (recommended F ≥ F3).** Obligations are **declarability** and **arguability**: the author can **name** the CharacteristicSpace (basis/slots as *(Characteristic, Scale)* pairs), **state** the comparability regime (coordinatewise or normalization-based), and **express** a state’s checklist in observable coordinates. No storage formats, IDs, or operational provenance are required.
— **F-Predicates (F ≥ F4 when predicate-like).** As above, plus **explicit slot/NormalizationMethod names** and **stated overlays** (order/metric). When acceptance conditions are written as **typed predicates over coordinates**, declare **F ≥ F4**. Remains **notation-neutral** and **storage-agnostic**.
— **Operational bindings (not part of F).** When automatic checking/assurance is required, use **A.19.CN / C.16 / B.3** for IDs, validity windows, waivers, and logs. These raise **R/TA** in the trust calculus and **do not change F** unless the **expression form** changes (see C.2.3 orthogonality).

The following checklist summarizes the normative requirements introduced by Pattern A.19. An implementation or model **conforms** to A.19 if and only if all these conditions are met:

**Spaces & mappings**  
**CC‑A19.1.** Any defined **Subspace**, **Embedding**, or **Product** of CharacteristicSpaces **MUST** explicitly list the involved slots and their metadata (scale type, unit, polarity). No comparability or merging is allowed purely by matching names or assuming correspondence – it must be declared.  
**CC‑A19.2.** Every **Embedding** `ι: CS₁ ↦ CS₂` **MUST** cite a well‑defined `NormalizationMethodInstance` (per **A.19.UNM**) for each slot where `CS₁`’s slot differs in scale/unit from `CS₂`’s. The cited instances MUST satisfy the admissibility/declaration obligations owned by **A.19.UNM** (incl. monotonicity w.r.t. polarity, validity window, and method‑class token) and, when used for gating/assurance, MUST be evidence‑backed per **C.16**. (Identity suffices where scales are identical.)
**CC‑A19.2a.** **Scale‑class guard (by reference).** The scale‑class requirements for admissible normalizations are owned by **A.19.UNM** (and must remain CSLC‑consistent per **A.18**). This checklist item is satisfied by citing a `NormalizationMethodInstance` whose declared class token meets those requirements; do not restate the taxonomy here.

**Comparability**  
**CC‑A19.3.** **Coordinatewise comparability** (`≼_coord`) is **permitted only** when the states being compared share the **same CharacteristicSpace**, with **identical scale metadata** on each compared slot, and using the **same state definition criteria**. If these conditions aren’t fully satisfied, an implementation **MUST NOT** attempt direct coordinatewise comparison; it should either apply a **normalization‑based** method or report the items as **incomparable**.
**CC‑A19.3a.** Use of **Indicators** in any checklist/assertion **MUST** cite an **IndicatorChoicePolicy** (edition). Treating any **NCV** as an Indicator **without** a declared policy is **forbidden**.

**CC‑A19.4.** **Normalization‑based comparability** (`≼_normalization`) **MUST** be done by first normalizing all relevant coordinates of the source state into the target state’s space via declared admissible `NormalizationMethodInstance`(s) (see **A.19.UNM**), and **only then** comparing in that common space. In other words, two states can be compared under `≼_normalization` only by producing an image of one in the other’s space (`N(x)`) and using `≼_coord` on the result. No implicit or “on the fly” conversions are permitted.
**CC‑A19.5.** Any cross-context state comparison or substitution **MUST** cite a corresponding **Alignment Bridge** (F.9) with an explicit **CL (congruence-loss) level**. If such a Bridge is used in an assurance or decision-making context, the model **MUST** apply the appropriate confidence reduction (`Φ(CL)` penalty per B.3) to reflect the loss. Cross-context comparisons without a Bridge (i.e. assuming equivalence by name or convention) are **forbidden**.

**Certification & enactment**  
**CC‑A19.6.** Every **StateAssertion** **MUST** identify at least: the specific **state** being asserted (by name), the associated **checklist** or criteria set (by name), and the observation **window**. Furthermore, if the evaluation involved cross‑space mapping, it **MUST** **declare** which **NormalizationMethod(s)** or **Bridge** were applied. This ensures the decision can be examined in review; A.19 does not mandate any storage/ID scheme.

**CC‑A19.7.** The **Green-Gate enactment rule** (A.2.5) **SHALL** be enforced: a transformative action (`U.Work`) by a RoleAssignment is only allowed if there exists a **contemporaneous** StateAssertion showing the holon in a state that is marked **enactable**. If a StateAssertion has been translated from another context or space, it is valid for gating **only** if it was obtained through declared Embeddings/Bridges (no untracked inferences). This ensures no work is done under an unverified or mis-mapped state condition.  
**CC‑A19.8.** All **Checklist** definitions for states **MUST** be formulated in terms of **observable predicates** on the RCS (and known context events) – no hidden workflows or implicit time sequencing inside a checklist. A checklist should read like a static predicate (even if it’s about a duration of some condition). If temporal order or multi-step processes are involved in achieving a state, those must be modeled via explicit **Methods/Work** or via an aggregation logic (e.g., using the Γ (Gamma) patterns in B.1 for process sequencing), rather than being baked into the state’s definition. **Use of Indicators in any checklist MUST cite an IndicatorChoicePolicy edition; treating any NCV as an Indicator without policy is forbidden.**

**Anti‑drift**  
**CC‑A19.9.** If a **NormalizationMethod/UNM** or a **state checklist** is updated or calibrated differently in a new version, previous StateAssertions **MUST NOT** be retroactively modified. One must close out or mark the old assertions with their valid time window and start issuing new assertions under the updated definitions. In other words, historical records remain as they were (tied to the definitions at that time), and any change in criteria results in a _new context or version_ for future assertions. This prevents retroactive truth-changing and maintains integrity of historical data.  
**CC‑A19.10.** If any **critical slot** in a comparison lacks an **admissible** `NormalizationMethodInstanceId` (per **A.19.UNM**) to translate that slot between the relevant spaces (within the declared validity window), then the comparison **MUST** be reported as **incomparable**. The model must not attempt unofficial workarounds (e.g., name‑matching, silent dropping of the slot, or ad‑hoc coercions). This rule applies even if all other slots have admissible normalization instances, unless a policy explicitly accepts the loss via a declared Bridge with stated limitations.

**Quotients & Normalization‑fix (QNT)**
**CC‑A19.11.** Equality checks and joins across spaces **MUST** target invariant forms (on a **quotient** or declared **NormalizationFixed** chart), not raw coordinates.
**CC‑A19.12.** If a checklist predicates on a normalization‑variant property, it **MUST** name the **NormalizationFix** (which UNM.NormalizationMethod or chart is assumed).
**CC‑A19.13.** All used **method‑class tokens** for cited `NormalizationMethodInstanceId`(s) **MUST** be named in the bounded context’s glossary (per the taxonomy owned by **A.19.UNM**). Do not restate the class taxonomy here.

**Metric discipline & calibration (MET)**
**CC‑A19.14.** If a distance overlay is used, acceptance predicates/KPIs over a CS **SHALL** be **non‑expansive** (Lipschitz ≤ 1) w.r.t. the published `d` on the declared domain (raw coordinates or NCVs), or declare a compensating margin; otherwise they **SHALL** be isotone w.r.t. the declared product order.
**CC‑A19.15.** Any distance used in state/acceptance checks **MUST** carry max tolerated error and, where claimed, a **Lipschitz bound** for the **NormalizationMethod** composition in use.
**CC‑A19.16.** Cross‑CN‑frame inputs **SHALL** name the **normalization transform** and its **validity window**; expired transforms are invalid for gating unless waived explicitly.

**Dynamics & time (DYN/TIME)**
**CC‑A19.17.** Every temporal guard **MUST** specify the window `[t_from, t_to]` and `evidence_kind ∈ {observation, prediction}`; if `prediction` is used for gating, the conditions in **§ 5.2.3.1 (Evidence kind & window)** **MUST** hold.
**CC‑A19.18.** Any dynamics map `Φ_{Δt}` used in comparison/gating **MUST** be **non‑expansive** (Lipschitz ≤ 1) under the declared distance overlay **and** commute with **NormalizationFix**; otherwise **observation** is required.

**Certification (CERT)**
**CC‑A19.19.** StateAssertions **MUST** **state** the current **NormalizationMethod/UNM** and overlay artifacts used (by name or formula) and the `evidence_kind`; assertions relying on **expired** NormalizationMethod/UNM are **invalid** for gating unless an explicit **Waiver SpeechAct** is **declared** per policy. (A.19 imposes no requirement on IDs or storage.)
**CC‑A19.20.** The certification pipeline steps (**Normalize (UNM.NormalizationMethod); Quot/Fix_normalization; overlay; evaluate; assert**) are **logically distinct** and **MUST** be reconstructable in argument/review; collapsing steps without clearly stated referents violates A.19. (No specific persistence format is implied.)

**Operators (OP)**
**CC‑A19.21.** Use of `Align_B` in gating **MUST** **declare** the **Bridge** used and propagate **CL** into assurance (B.3). Cross‑context comparison without a Bridge is **forbidden**. (No requirement to store an ID is imposed by A.19.)
### Anti‑patterns → safe rewrites

_The following are common modeling mistakes (“anti-patterns”) related to measurement spaces, and how to correct them:_

-   **“Same label ⇒ comparable.”**  
    ✗ _Assuming_ **Ready@contextA ≥ Ready@contextB** _just because both states are called "Ready"._  
  ✓ **Explicitly normalize and bridge contexts:** Define an Alignment **Bridge (B→A)** and appropriate **NormalizationMethods** for the underlying metrics. Then compare by first translating one state’s coordinates (compute **N(x)** as NCVs in the target space) and using `≼_coord` on the result.
    
-   **“Compare before landing.”**  
    ✗ Comparing values directly across different scales, e.g. _Drift\_A = 5°C vs Drift\_B = 5°F_ as if they were the same.  
  ✓ **Normalize to common units first:** e.g., apply the Fahrenheit‑to‑Celsius **NormalizationMethod** _m_(T_F) = (T_F − 32) × 5/9 to convert all data to °C, **then** compare the drift values. Always **normalize into one space** before comparing magnitudes.
    
-   **“Checklist = workflow.”**  
    ✗ Defining a state’s checklist with an implied sequence: _“State ‘Ready’ requires doing Step 1 then Step 2…”_  
    ✓ **Keep checklists declarative:** A **Checklist** should represent a state of the system (a condition) – essentially **state evidence** – not a sequence of actions. If order or process matters, model that explicitly via a **MethodDescription** or by using a **Γ** (Gamma) aggregator for process logic. In other words, state = “Ready” might require conditions A and B to be true (regardless of how you got there), whereas the procedure to get ready (do Step1 then Step2) should be a separate method or playbook.
    
-   **“Retro-fix past assertions.”**  
    ✗ Going back to edit or reinterpret old StateAssertions after changing a threshold or NormalizationMethod (e.g. “We updated the criteria, let’s ‘fix’ last quarter’s records to match”).  
    ✓ **Never alter historical assertions:** **Leave history as‑is.** If criteria change, issue new assertions under the new criteria going forward, and if needed, explicitly **version** the **NormalizationMethod/UNM** or checklist. Past assertions remain valid for the old version and their time; new ones apply henceforth. This ensures auditability and avoids erasing or rewriting what was true under earlier standards.
### A.19:End
## CN‑frame (comparability & normalization)

> **Scope.** This CN‑frame Algebra & Normalization Discipline **extends A.19** by fixing the **governance Standard** for CN‑frames, defining a **conformance checklist** and **regression harness**, and providing **didactic one‑pagers** and **anti‑patterns** so teams can introduce CN‑frames without tool lock‑in. The mandatory pattern structure and authoring discipline from **Part E** (Style Guide, Tell‑Show‑Show, checklists, DRR, guard‑rails) are applied throughout.
>
> **Single‑owner boundary (cite, don’t duplicate).** A.19.CN owns the **CN‑frame governance card, registry, bridges, and checklist/harness** (`CN‑Spec`, registry, bridges, checklist/harness). It does **not** own any CHR‑mechanism **intensions**, term cards, or method taxonomies. Those are owned by the corresponding mechanism patterns (**A.19.UNM / A.19.UINDM / A.19.USCM / A.19.ULSAM / A.19.CPM / A.19.SelectorMechanism**)**. Evidence/backing is owned by **C.16**; legality gates are owned by **G.0**. Therefore A.19.CN specifies *where the references live*, *what must be cite‑able for audit*, and *how governance changes trigger regression* — not mechanism semantics.
>
> **Reader map (fast navigation).**
> - “What does `NormalizationMethodId/…InstanceId/≡_UNM/NormalizationFix` mean?” → **A.19.UNM**.
> - “What is an Indicator / `IndicatorChoicePolicy` and why NCV ≠ Indicator?” → **A.19.UINDM**.
> - “Why can we trust a normalization / where does calibration or evidence live?” → **C.16 (MM‑CHR)**.
> - “What is lawful to compare/aggregate / what is `MinimalEvidence`?” → **G.0 (CG‑Spec)**.

### Context

A.19 established a substrate‑neutral picture:

* a **CN‑frame** = *(Context‑local)* **CharacteristicSpace (CS)** + **chart** (coordinate patch + units) + a referenced **Normalization mechanism (UNM)** pinned from `CN‑Spec.normalization`. Any semantics of admissibility, invariants, and `≡_UNM` is owned by the UNM owner (see **A.19.UNM**);
* **operators** (subspace, product, pullback/pushforward) and **comparability** (coordinatewise vs **normalization‑based (normalize‑then‑compare)**);
* **RSG touch‑points**: role readiness (**RSG** states) are **certified** against CS via **checklists** over observable characteristics;
* **entity/relational mixtures** across CN‑frames via minimal schemas and bridges.

**Terminology guard.** *CN‑frame* is the **lens** (I); *CN‑Spec* is the **governance card** (S) that fixes admissible charts/normalization *references*/comparability/Γ‑fold for that lens **in one `U.BoundedContext`**; *CN‑Description* is the didactic surface (D) with worked examples and anti‑patterns. Mechanism‑level term cards (e.g., `NormalizationMethod`, `NormalizationMethodInstance`, `NCV`, `≡_UNM`, `IndicatorChoicePolicy`) are owned by the corresponding **A.19.<MechId>** patterns and are only **cited** here.

**Lexical guard (map/Map, by reference).** Follow the lexical discipline owned by **A.19.UNM**: avoid introducing new normalization tokens that use “map/Map/mapping” (because `…Map` is a Part‑G method‑type kind). In normalization contexts prefer **normalize / transform / re‑parameterize**. Legacy tokens (including retired κ‑notation) are handled via **alias docking** (F.18); A.19.CN applies this rule and does not redefine it.

A.19.CN makes this *operational and auditable*.
### Problem

Absent a governance layer, four failure modes recur:

1. **Chartless numbers.** Measures move between teams without units, reference states, or declared normalization → **illusory comparability**.
2. **Hidden normalization flips.** Re‑parameterisations (e.g., normalising by batch size) silently alter meaning; trend lines lie.
3. **CN‑frame sprawl.** Every initiative mints a new “dashboard dimension”; semantics diverge; assurance collapses.
4. **Un‑bridgeable reports.** Cross‑team roll‑ups average **incongruent** CN‑frames, violating the **weakest‑link (WLNK)** discipline from Γ and B.3.
### Forces

| Force                         | Tension we must balance                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------ |
| **Universality vs nuance**    | One Standard for robotics, safety, finance — yet leave each context’s idioms intact. |
| **Speed vs audit**            | Light ceremony for on‑ramp; hard guarantees for assurance and SoD.                   |
| **Local truth vs federation** | Keep CN‑frames meaning‑local; still enable **explicit** bridging across Contexts.          |
| **Minimalism vs safety**      | Few mandatory slots; enough structure to forbid silent normalization drift.                  |
### Solution — The CN‑Spec (CN‑Spec) + Registry + Bridges

#### The CN‑Spec (comparability & normalization specification per CN‑frame, in one U.BoundedContext)

A **CN‑frame** is governed by a compact, notation‑free card:

```
CN‑Spec {
  name              : CN‑frameName                  // local to Context
  context           : U.BoundedContext              // edition/version included
  cs_basis          : [{
    slot_id         : <tech-token>,                 // stable slot id (basis name)
    characteristic  : <U.Characteristic>,          // per A.17 / A.18
    scale           : { type: nominal|ordinal|interval|ratio, unit?: <U.Unit>, bounds?: <… > },
    polarity        : up|down|target-range,        // comparison orientation
    // if needed: missingness?, admissible_domain? (MM‑CHR‑consistent metadata)
  }]
  chart             : { reference_state, coordinate_patch, measurement_protocol_ref }
  normalization     : {
   UNM_id?,                                      // reference to the UNM mechanism; canonical Intension: A.19.UNM
   methods: [NormalizationMethodId],              // UNM-owned tokens; semantics live in A.19.UNM
   instances?: [NormalizationMethodInstanceId],   // UNM-owned tokens; evidence/backing lives in C.16
   method_descriptions: [NormalizationMethodDescriptionRef], // refs only; semantics/corpus live with the semantic owner
   admissible_reparameterizations,                // UNM-owned declarations (opaque here; see A.19.UNM)
   invariants,                                    // UNM-owned invariant tokens (opaque here; see A.19.UNM)
   fix?: <NormalizationFixSpec>                   // UNM-owned fix spec (opaque here; see A.19.UNM)
   }
  comparability     : { mode ∈ {coordinatewise, normalization-based}, minimal_evidence }  // `minimal_evidence` is a gate reference (default: CG‑Spec.MinimalEvidence; see G.0/C.16)
  indicator_policy? : { IndicatorChoicePolicyRef, scope, edition }  // policy ref only; semantics owned by A.19.UINDM
  acceptance        : { checklist_for_admission, window, evidence_anchors } // gates RSG state checks
  aggregation       : { Γ_fold, WLNK/COMM/LOC/MONO choices, time_policy }   // fold tokens only; semantics owned by B.3/G.0 (and the folding mechanism card, if cited)
  alignment?        : { bridges_to_other_contexts, CL_levels, loss_notes }  // optional
  lifecycle         : { owner_role, DRR_links, deprecation_plan }
}
```

**Reading:** *A CN‑frame is a context‑local lens with declared characteristics and a chart to read them. `CN‑Spec` pins the **references and governance choices** needed to make admission, comparability, and safe roll‑ups auditable: the UNM reference for normalization‑based comparability, an optional `IndicatorChoicePolicyRef`, an explicit `Γ_fold`, and the admission checklist. Any mechanism semantics (e.g., what `≡_UNM` means, or what counts as an Indicator) is owned by the corresponding mechanism pattern and is only cited from here.*

**Ownership note.** CN‑Spec stores only the **governance references and declarations**. The semantics and term cards for `NormalizationMethod*`, `≡_UNM`, `NCV`, `IndicatorChoicePolicy`, and any other CHR‑mechanism vocabulary are owned by the corresponding mechanism patterns (e.g., **A.19.UNM**, **A.19.UINDM**) and evidence backing lives in **C.16**. (Kernel reminder: per **A19‑CS‑5**, `U.CharacteristicSpace` carries no hidden normalizations or aggregations.) In A.6.1 terms, `UNM_id` points to a canonical **`U.Mechanism.Intension`** card; the CN‑Spec **references** that mechanism and does **not** introduce implicit **Transport**.

**L‑CN‑Spec‑NORM‑IDs (by reference).** When CN‑Spec (or its audit trail) needs stable normalization tokens, use **NormalizationMethodId**/**NormalizationMethodInstanceId** as specified by the UNM owner (A.19.UNM). Avoid generic “map” nouns and retired κ‑notation (see the **A.19.UNM** lexical guard); preserve legacy tokens only via **F.18 alias docking**. If you introduce reference‑typed fields, obey **A.6.5** (`*Ref` reserved for reference fields; `*Slot` reserved for SlotKinds).
#### CN‑frame Registry (per Context)

Each `U.BoundedContext` keeps a **CN‑frame Registry** (VR):

* **canonical names** and **editions**;
* **SoD hooks** (who can edit CN‑Spec, who can certify admission);
* **deprecation map** (what replaces what, when).
#### Bridges (across contexts)

Cross‑context reuse occurs **only** via explicit **Alignment Bridges** (F.9) between CN‑Specs:

```
Bridge CN‑frameA@Context1  →  CN‑frameB@Context2
  channel: {Scope|Kind}                 // F.9 (and A.6.1 Transport)
  planes: ReferencePlane(src,tgt)       // C.2.1 (must be recorded)
  CL: {3|2|1|0}
  CL_plane?: {3|2|1|0}                  // only when planes differ
  kept_characteristics: [… ]
  lost_characteristics: [… ]
  transform: {pullback | pushforward | re-scaling | re-binning | … }  // illustrative; use the operator vocabulary owned by A.19/F.9
  extra_guards: {additional evidence / reviewer role / waiver speech-act}
```

**CL policy (reference).** **CL levels and the penalty Φ(CL) are defined in B.3** (CL is **ordinal**; do not average). In A.6.1 terms, any cross‑context (or cross‑plane) reuse is declared **only** via a mechanism’s **Transport** clause: **name the BridgeId and channel** (`Scope|Kind`) and **record** `ReferencePlane(src,tgt)`; if planes differ, declare the `CL^plane` regime. **Transport is declarative** (it does not introduce a `U.Transfer` edge and does not restate CL ladders or Φ tables). When both scope and *describedEntity* change, apply the **two‑bridge rule** (Scope bridge + **KindBridge (CL^k)**). Penalties from scope/kind/plane **route to `R/R_eff` only** (never to **F/G**). This CN‑Spec may **add operational guards** per level (e.g., “extra reviewer at CL=1”, “waiver at CL=2”), but it **does not redefine** the scale or Φ. For episteme‑specific frames, see also **B.1.3**.
### Conformance Checklist (normative)

> **Pass these and your CN‑frames are fit for assurance and cross‑team composition.**

**CC‑A19.D1‑1 (Local scope).** Every CN‑frame **MUST** live inside a declared `U.BoundedContext` (with edition). Names are **local**; same label in another Context ≠ same CN‑frame.

**CC‑A19.D1‑2 (Units & polarity).** Each characteristic in `cs_basis` **MUST** declare **unit/scale** and **polarity** (↑ better / ↓ better / target range). No unlabeled magnitudes.

**CC‑A19.D1‑3 (Chart).** `chart` **MUST** name the **reference state**, **coordinate patch** and **measurement protocol** (`U.MethodDescription`) to make numbers reproducible.

**CC‑A19.D1‑4 (Normalization references, not redefinition).** `normalization` **MUST** (i) cite the UNM mechanism (`UNM_id?`) and (ii) provide the normalization references required by the UNM owner (methods / invariants / fix, and instances when used) so that any normalization‑based comparison is auditable. This pattern does not define what a “NormalizationMethod” is — it requires that CN‑Spec can point to the owner that does.

**CC‑A19.D1‑5 (Comparability mode).** `comparability.mode` **MUST** be either **coordinatewise** (same chart & units) or **normalization‑based** (“normalize‑then‑compare” via the declared **UNM**). Mixed/implicit modes are prohibited. The semantics of `≡_UNM` (and what counts as “same class”) is owned by the UNM mechanism card (A.19.UNM); CN‑Spec only pins the references needed to audit the choice.

**CC‑A19.D1‑6 (Admission checklist).** `acceptance.checklist_for_admission` **MUST** be observable and time‑bounded; each datum admitted to the CN‑frame **SHALL** cite a **StateAssertion** or equivalent `U.Evaluation`.

**CC‑A19.D1‑7 (Aggregation discipline).** `aggregation.Γ_fold` **MUST** specify WLNK/COMM/LOC/MONO choices and the **time policy** (e.g., average of rates vs integral of counts). **No free‑hand averages.** The legality/semantics of folding is owned by **B.3/G.0** (and, when a folding mechanism is cited, by its mechanism owner); CN‑Spec only stores the governance pins.

**CC‑A19.D1‑8 (Bridge‑only reuse).** Cross‑context consumption **MUST** cite a **Bridge** with: (i) `channel ∈ {Scope|Kind}`, (ii) recorded `ReferencePlane(src,tgt)`, (iii) CL (and `CL^plane` when planes differ), and (iv) **loss notes**; coordinate‑by‑name without a Bridge **fails**. If the data participate in **gating/assurance**, apply **Φ(CL) per B.3**; this CN‑Spec does not restate Φ.

**CC‑A19.D1‑9 (SoD & roles).** Editing CN‑Spec and admitting data **MUST** be performed by **different** roles (⊥ enforced): `CN‑frameStewardRole ⊥ CN‑frameCertifierRole` inside the same context.

**CC‑A19.D1‑10 (Lifecycle & DRR).** Every CN‑Spec **MUST** carry an **owner role**, a **deprecation plan**, and links to **DRR** entries for rationale and changes (Part E.9).

**CC‑A19.D1‑11 (Anchors & lanes for comparability).** Any **admission** into a CN‑frame that is later **used for comparison/aggregation** **SHALL** cite the corresponding **A.10 EvidenceRole** anchors for each characteristic, with **assuranceUse lane** tags {TA, VA, LA} and **validity windows** (where applicable), so that the **SCR** can report lane‑separated contributions and freshness (B.3). Absence of anchors for a required characteristic renders items **incomparable**.

**CC‑A19.D1‑12 (Notation independence).** CN‑Spec content **MUST NOT** depend on a tool or file format; semantics precede notation (E.5.2 Notational Independence).

**CC‑A19.D1‑13 (Lexical guard‑rails).** characteristic names and role labels **MUST** follow the Part E lexical discipline (registers, twin labels; no overloaded “process/service/function”).
### Consequences (informative)

| Benefit                           | Why it matters                                                                                                        |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Auditable comparability**       | Chart + declared normalization (UNM + NormalizationMethods) make “same number” meaningful; silent re‑basings become explicit, reviewable choices.                   |
| **Safe roll‑ups**                 | Γ‑folds with WLNK/COMM/LOC/MONO stop optimistic averaging and preserve invariants.                                    |
| **Pluralism without incoherence** | Bridges with CL and loss notes allow federation without pretending to global sameness.                                |
| **RSG‑ready**                     | Admission checklists let **RSG** states reference **CN‑frame‑backed** facts (e.g., *Ready* requires characteristics within bounds). |
### Rationale (informative)

The CN‑Spec aligns A.19.CN with **Part E**: it packages Tell‑Show‑Show, Conformance Checklists, and DRR‑backed change, while honouring **DevOps Lexical Firewall**, **Unidirectional Dependency**, and **Notational Independence** so that semantics never depend on tooling.  It also operationalises B.3 **Trust & Assurance** by making CL penalties and WLNK folds first‑class.
### Archetypal Grounding (Tell‑Show‑Show)

> **Same slots, three arenas; no tooling implied.** The examples below use plain-language normalization descriptions as placeholders; any normative use must cite UNM-owned ids/refs (A.19.UNM) and evidence pins (C.16), not invent new terminology here.

#### Industrial line — Weld‑quality CN‑frame (AssemblyLine_2026)

* `cs_basis`: *BeadWidth\[mm] (target 6.0±0.2)*, *Porosity\[ppm] (↓)*, *SeamRate\[1/min] (↑ until limit)*
* `chart`: reference jig, fixture ID, torch type; `MethodDescription#Weld_MIG_v3`
* `normalization`: affine rescale on gray‑level calibration → invariant = physical porosity
* `comparability`: **normalization‑based (UNM)** (calibration tables applied)
* `aggregation`: WLNK on quality (min‑bound), COMM on counts, time = per‑shift histograms
* **RSG hook**: `WelderRole.Ready` requires *Porosity ≤ 500 ppm* & *BeadWidth within ±0.2 mm* admitted by this CN‑frame.
#### Software/SRE line — Latency CN‑frame (SREProdClusterEU2026)

* `cs_basis`: *P50Latency\[ms] (↓)*, *P99Latency\[ms] (↓)*, *Load\[req/s]*
* `chart`: client vantage, trace sampler v4; `MethodDescription#HTTP_probe_v4`
* `normalization`: monotone time‑warp compensation for collector skew; invariant = percentile order
* `comparability`: **normalization‑based (UNM)** with declared normalization
* `aggregation`: MONO on latency (max of mins), WLNK across services
* **RSG hook**: `DeployerRole.Active` gated if **P99** < declared SLO over the admission window.
#### Clinical/episteme line — Trial‑outcome CN‑frame (Cardio_2026)

* cs_basis:
  - slot_id: ΔBP
    characteristic: BloodPressureChange
    scale: { type: ratio, unit: mmHg }
    polarity: down
  - slot_id: AdverseRate
    characteristic: AdverseEventRate
    scale: { type: ratio, unit: "%" }
    polarity: down
  - slot_id: Age
    characteristic: Age
    scale: { type: ratio, unit: years }
    polarity: neutral
* `chart`: cohort definition; `MethodDescription#TrialProtocol_v5`
* `normalization`: case‑mix adjustment (propensity score); invariant = adjusted ΔBP
* `comparability`: **normalization‑based (UNM)** (post‑adjustment)
* `aggregation`: LOC on subcohorts; WLNK on safety outcomes
* **RSG hook**: `EvidenceRole.Validated` admission requires CN‑frame acceptance; **Assurance** pulls CL from any Bridge used.
#### Worked mini-schemas (entity/relational mixtures across CN‑frames, informative)

To illustrate how CharacteristicSpace is used in practice, below are simplified schema snippets for three typical **CN‑frames**: an **Operations** view (run-time state and action gating), an **Assurance** view (evidence and cross-context comparison), and an **Alignment** view (design-time consistency across contexts). These examples mix entity-based and relational Characteristics and demonstrate how normalization and bridge *references* may appear in a model.

**Didactic-only note (no data governance).** The “schema/table” shapes below are purely explanatory: they show which **references must be cite-able** for audit and reproducibility. They are **not** storage requirements, do not prescribe file formats, and do not define the semantics of `NormalizationMethod*` tokens (see A.19.UNM / C.16).

##### Operations CN‑frame — Run-time gating & enactment

_Entity graph view:_

Holder (System) ── playsRoleOf ──> Role@Context ── has ──> RCS (slots…)
RSG (Role@Context) ── owns ──> State (◉ status)
Checklist (of State) ── testedBy ──> Evaluation ── yields ──> StateAssertion
Work ── performedBy ──> RoleAssignment
Work ── isExecutionOf ──> MethodDescription

In the above, a **Holder** (a system instance) plays a **Role** in some Context, which has an attached **RCS** (a set of slots defining its characteristic space). That Role’s **RSG** owns various possible **State** entries (each state could be, e.g., Ready, Waiting, Degraded, etc.). Each State has a **Checklist** which is **tested by** an Evaluation process, resulting in a **StateAssertion** (pass/fail) at runtime. Meanwhile, **Work** instances (concrete operations) are performed by the RoleAssignment and correspond to some MethodDescription (procedure). The “gate” for Work is that a StateAssertion for an enactable state must exist.

_Relational stub:_ (illustrating how information might be recorded)

| Table | Key Columns (essential) |
| --- | --- |
| **ROLE\_ASSIGNMENT** | `RA_ID` (PK); `HOLDER_ID`; `ROLE_ID`; `CONTEXT_ID`; `WINDOW_FROM`, `WINDOW_TO` |
| **RCS\_SNAPSHOT** | `SNAP_ID` (PK); `RA_ID` (FK to ROLE\_ASSIGNMENT); `WINDOW_FROM`, `WINDOW_TO`; `CHAR_ID`; `VALUE`; `UNIT`; `SCALE_TYPE` |
| **RSG\_STATE** | `STATE_ID` (PK); `ROLE_ID`; `CONTEXT_ID`; `NAME`; `ENACTABLE` (bool) |
| **CHECKLIST** | `CHK_ID` (PK); `STATE_ID` (FK to RSG\_STATE); `PREDICATE_TYPE`; `PREDICATE_SPEC` |
| **STATE\_ASSERTION** | `SA_ID` (PK); `RA_ID` (FK); `STATE_ID` (FK); `CHK_ID` (FK); `WINDOW_FROM`, `WINDOW_TO`; `VERDICT` (pass/fail); `NORMALIZATION_INSTANCE_ID`?; `BRIDGE_ID`? |  
| **WORK** | `WORK_ID` (PK); `RA_ID` (FK); `METHODDESC_ID` (FK to MethodDescription); `WINDOW_FROM`, `WINDOW_TO`; _(other fields like results or references)_ |

In this schema: an RCS snapshot table might log individual coordinate values (`VALUE`) for each Characteristic (`CHAR_ID`) in a given RoleAssignment, with their units and scale type noted (to ensure we know what the number means). The StateAssertion ties a RoleAssignment to a state checklist and says whether it passed, including references to any **NormalizationMethodInstance** or **Bridge** if cross-context or cross-scale comparisons were involved. The gate logic for enactment can then be a query like: “Is Work W admissible now?” – which joins through ROLE\_ASSIGNMENT to find the latest StateAssertion for that RA where `ENACTABLE=true` and `VERDICT=pass`.
##### Assurance CN‑frame — Evidence freshness & mapped comparisons

_Entity graph view:_

NormalizationMethodInstance ── appliesTo ──> Characteristic   (each instance is a scale‑appropriate, monotone transform within UNM)
Bridge (ContextB → ContextA)   (Alignment Bridge between contexts, with CL and loss notes)
StateAssertion ── uses ──> {NormalizationMethodInstance, Bridge}   (if a state comparison crossed contexts)

This view highlights that in the assurance context, we keep track of how we mapped or compared states:

* A **NormalizationMethodInstance** reference records that an admitted comparison/assertion relied on a declared normalization instance. The admissibility conditions, monotonicity constraints and evidence semantics are owned by **A.19.UNM** and **C.16**.
* A **Bridge** between Context B and Context A (for corresponding roles or states) carries a CL rating and possibly notes on what is “lost in translation.”
* A **StateAssertion** may **use** a NormalizationMethodInstance or a Bridge, meaning that assertion was reached by translating data via that instance or comparing across that bridge.

_Relational stub:_

| Table                | Key Columns (essential)                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **NORMALIZATION\_METHOD** | `NORMALIZATION_METHOD_ID` (PK); `KIND` (token; see A.19.UNM); `DESCRIPTION_REF` |
| **NORMALIZATION\_INSTANCE** | `NORMALIZATION_INSTANCE_ID` (PK); `NORMALIZATION_METHOD_ID` (FK); `SRC_CHAR_ID`; `TGT_CHAR_ID`; `FORMULA_SPEC|LUT_REF` (illustrative); `VALIDITY_WINDOW` (illustrative); `EVIDENCE_REF` (pin/ref; see C.16) |
| **BRIDGE**           | `BRIDGE_ID` (PK); `FROM_ROLE@CTX`; `TO_ROLE@CTX`; `CL` (congruence-loss level, e.g. 0–3); `NOTES` (description of losses/adjustments) |
| **ASSURANCE\_EVENT** | `AE_ID` (PK); `SA_ID` (FK to StateAssertion); `EFFECT` (enum: penalty\_applied, evidence\_refreshed, etc.); `DETAILS`                 |

In this stub, **NORMALIZATION\_INSTANCE** records a mapping instance that has to be accounted for when reconstructing an assertion or comparison. The exact meaning of `FORMULA_SPEC`/`VALIDITY_WINDOW`/evidence pins is owned by the UNM and evidence patterns (A.19.UNM / C.16); the point here is that the instance is **referenceable** so audits can follow it. The Bridge table enumerates official Bridges between contexts (for example, bridging a “Ready” state in an engineering context to “Ready” in an operations context, with CL indicating how fully comparable they are). An ASSURANCE\_EVENT log could record when a penalty was applied due to a low-CL Bridge or when an assertion was refreshed or invalidated due to new evidence or time lapse.
##### A.19.CN:8.4.3 Alignment CN‑frame — Design-time reuse of states across Contexts

_Entity graph view:_

Checklist(ContextA.State)   ← pull(N) —   Checklist’(ContextB.State’)   (pull a checklist via **NormalizationMethodInstance** N)
Refinement π : RSG(Role' ≤ Role)   (RSG refinement mapping, e.g. Role' is a subtype of Role)

This view covers how _design-time_ alignment happens:

-   A **Checklist’** for a state in Context B can be **pulled** via a **NormalizationMethodInstance** into Context A to become a derived Checklist for a state in Context A. This is effectively what we described in the pull operation: using another context’s criteria in your own space.
    
-   A **Refinement π** is shown between RSGs indicating Role’ is a specialized role of Role (e.g. a sub-role or a scenario-specific role) and how their states relate (Role’ might have extra states or more granular distinctions). This refinement should maintain that for each state in Role’ that maps to a state in Role, the entails/implication relation holds for enactability.
    

_Relational stub:_ (illustrating how information might be recorded)

| Table               | Key Columns                                                                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RSG\_REFINEMENT** | `MAP_ID` (PK); `ROLEPRIME_ID` (FK to Role' in Context B); `ROLE_ID` (FK to Role in Context A); `STATEPRIME_ID` (FK to state in Role' RSG); `STATE_ID` (FK to state in Role RSG); `ENTAILS` (bool) |
| **CHECKLIST\_PULL** | `PULL_ID` (PK); `SRC_STATE_ID`; `TGT_STATE_ID`; `NORMALIZATION_INSTANCE_ID` (FK to NormalizationMethodInstance used); `VERSION`? /\* and perhaps timestamp \*/                                     |

In this stub, RSG\_REFINEMENT maps states of a sub-role to states of a super-role, with an `ENTAILS` flag indicating if being in the sub-state guarantees being in the super-state. **Every refinement mapping should ensure at least one enactable state in the sub-role corresponds to an enactable state in the super-role** (or else the sub-role would allow something the super-role doesn’t – that’s an alignment lint check). The CHECKLIST\_PULL table records that a state from one context has had its checklist pulled into another context via a **NormalizationMethodInstance** (identified by `NORMALIZATION_INSTANCE_ID`). This is a design artifact saying “State X in context A is defined by applying normalization instance N to State Y in context B’s criteria.” A version or validity field might ensure we know which edition of the checklist or normalization instance was used.
### Anti‑patterns (and the fix)

| Anti‑pattern            | Symptom                                   | Why it hurts                 | Fix (CN‑Spec slot)                           |
| ----------------------- | ----------------------------------------- | ---------------------------- | --------------------------------------- |
| **Chartless number**    | “Latency = 120”                           | No unit/vantage → untestable | Fill `cs_basis` + `chart`                          |
| **Normalization smuggling**     | Quiet “per‑unit” normalisation mid‑stream | Trend reversal               | Declare UNM normalization references (`NormalizationMethodId` / `NormalizationMethodInstanceId`) + named invariants (see A.19.UNM)        |
| **Bridge‑by‑name**      | Reusing labels across Contexts               | False comparability          | Author **Bridge** with CL + loss        |
| **Free‑hand averaging** | Arithmetic mean on bounded risks          | Violates WLNK                | Declare `Γ_fold` with WLNK              |
| **CN‑frame sprawl**        | Ten nearly‑identical CN‑frames               | Cognitive debt               | Use Registry + DRR; prefer reuse        |
| **Role conflation**     | Same person edits CN‑Spec & certifies data     | SoD breach                   | Enforce `CN‑frameSteward ⊥ CN‑frameCertifier` |
### Didactic quick cards (one‑liners teams reuse)

1. **Numbers travel with their Context.** Always cite `Context@Edition`.
2. **If the normalization is not declared, the trend is fiction.**
3. **WLNK beats wishful means.** Use weakest‑link folds for safety.
4. **Admit → Assert → Act.** (CN‑frame admission → RSG StateAssertion → Method step).
5. **Bridge or bust.** Cross‑context = Bridge with CL and loss notes.
6. **Steward writes, Certifier admits.** (SoD by design.)
7. **Charts are recipes.** Name the `MethodDescription` that made the number.
8. **Deprecate in the open.** CN‑frame cards carry DRR & retirement plans.
9. **Keep characteristics few, meanings sharp.** Prefer ≤ 7 characteristics per CN‑frame.
10. **No tooling names in Core.** Semantics first; notation later.
11. **Use method/instance IDs; avoid generic “map” nouns.** Prefer `NormalizationMethodId`/`NormalizationMethodInstanceId` (see the **A.19.UNM** lexical guard).
### SCR / RSCR Harness (acceptance & regression)

> **These are concept‑level checks; notation‑agnostic.**

#### SCR — Acceptance (first introduction)

* **SCR‑A19.4‑S01 (Completeness).** **CN‑Spec has **all** mandatory slots; `cs_basis` include **unit/scale/polarity**; `chart` references a `MethodDescription`.
* **SCR‑A19.4‑S02 (Normalization clarity).** `normalization` cites the UNM mechanism (`UNM_id?`) and provides the normalization references required by the UNM owner (methods / invariants / fix, and instances when used). If instances are referenced in assurance logs, their evidence/backing and validity constraints are handled by the owning evidence pattern (C.16), not by A.19.CN.
* **SCR‑A19.4‑S03 (Comparability test).** Provide one worked example showing **coordinatewise** or **normalization‑based** comparison end‑to‑end (with Evidence Graph Ref).
* **SCR‑A19.4‑S04 (Γ‑fold audit).** Aggregation rule spells out WLNK/COMM/LOC/MONO choices; reviewer reconstructs result on a toy set.
* **SCR‑A19.4‑S05 (SoD).** Distinct `RoleAssignments` for `CN‑frameStewardRole` and `CN‑frameCertifierRole` exist; windows do not overlap.
* **SCR‑A19.4‑S06 (describedEntity & anchors surfaced).** For each CN‑Spec characteristic used in the worked example, cite the corresponding CHR Characteristic name and the evidence anchor(s) (A.10) that make the reading observable in this Context.
#### RSCR — Regression (on change)

* **RSCR‑A19.4‑R01 (UNM edit).** On changing `normalization` (UNM/NormalizationMethod), flag **all** downstream Bridges for CL re‑assessment; re‑run example comparisons.
* **RSCR‑A19.4‑R02 (Slot surgery/Basis surgery).** Adding/removing/renaming slot/basis requires a **new edition**; old data remain valid **for their edition**.
* **RSCR‑A19.4‑R03 (Chart drift).** Updating measurement protocol bumps edition; **historic Work** keeps old edition link.
* **RSCR‑A19.4‑R04 (Fold change).** Any change to `Γ_fold` invalidates cached roll‑ups; re‑compute or mark as superseded.
* **RSCR‑A19.4‑R05 (Bridge health).** After either side’s edition change, **re‑validate** Bridge CL and loss notes before accepting Cross‑context data.
* **RSCR‑A19.4‑R06 (Deprecation rule).** On deprecating a CN‑frame, Registry lists its successor; bridges re‑targeted or retired.
### Interaction summary (wiring to the rest of the kernel)

* **A.2 / A.2.5 (Roles / RSG).** RSG **checklists** quote **CN‑Spec.acceptance**; enactment gates rely on **admitted** CN‑frame data.
* **B.1 (Γ‑algebra).** CN‑Spec’s `Γ_fold` instantiates Γ\_ctx/Γ\_time/WLNK/MONO choices explicitly.
* **B.3 (Assurance).** Bridge CL enters the **R** term; WLNK protects safety roll‑ups.
* **C.6 / C.7 (LOG‑CAL / CHR‑CAL).** Units, scales, and measurement templates come from CHR; proofs about folds live in LOG‑CAL.
### Minimal CN‑Spec template (copy/paste, informational)

**Template note (refs-only).** This template shows *slot placement* for governance. Token semantics for normalization belong to the UNM owner (A.19.UNM); indicatorization semantics belong to the indicatorization owner (e.g., A.19.UINDM); evidence/backing semantics belong to C.16; legality/evidence gates belong to G.0.

```
CN‑frame: <Name>      Context: <Context/Edition>
characteristics:
  - <CharacteristicName> : <Unit/Scale>  [Polarity: up|down|target-range]
Chart:
  reference_state: <text>
  coordinate_patch: <domain/subset>
  measurement_protocol_ref: <MethodDescriptionId>
Normalization:
  UNM: <UNMId?>
  methods: [<NormalizationMethodId>… ]
  method_descriptions: [<NormalizationMethodDescriptionRef>… ]
  invariants: [<property>… ]           # what ≡_UNM preserves (token semantics: see A.19.UNM)
  fix?: <NormalizationFixSpec>          # canonical representative of the ≡_UNM class (token semantics: see A.19.UNM)
Indicators (optional):
  policy_ref: <IndicatorChoicePolicyRef>
  resulting_indicators: [<IndicatorId>… ] // selection is policy‑defined; NCVs alone do not make an Indicator (see A.19.UINDM)
Comparability:
  mode: coordinatewise | normalization-based
  minimal_evidence: <what must be observed to compare>  # legality/evidence gate surface (see G.0/C.16)
Aggregation:
  fold: <Γ_fold expr>   time_policy: <window, statistic>
  WLNK/COMM/LOC/MONO: <declared choices>
Acceptance:
  checklist: [<observable criterion>… ]
  window: <ISO 8601 interval>
  evidence_anchors: [<Observation/Evaluation ids>… ]
Alignment (optional):
  bridges: [<BridgeId, CL, kept/lost characteristics, extra guards>… ]
Lifecycle:
  owner_role: <Role>
  DRR_links: [<DRR ids>… ]
  deprecation_plan: <short note>
```

**Implementation note (non‑normative): conceptual audit fields.** (For implementation completeness only; not part of the CN‑Spec normative surface.) The goal is *auditability*: any implementation should be able to cite the relevant refs (CN‑Spec edition, evidence anchors, UNM instance refs, Bridge ids) when producing a `StateAssertion`. The normative semantics of normalization and evidence/backing are owned by the corresponding mechanism and evidence patterns (e.g., A.19.UNM and C.16). A.19.CN does not prescribe storage formats.
### A.19.CN:Close

A.19.CN gives A.19 some **teeth**: a *CN‑Spec* you can put on one page, a **Registry** that stops sprawl, **Bridges** that carry explicit loss, and a **checklist + harness** that make comparability **auditable**. It obeys the **mandatory pattern structure** of Part E (style, checklists, DRR, guard‑rails) while remaining tool‑agnostic and context‑local.
### A.19.CN:End
## CHRMechanismSuite

> **Type:** Architectural (A)  
> **Status:** Stable

**PatternId:** A.19.CHR
**Name:** `CHRMechanismSuite`
**Pattern class:** specialization of **A.6.7** (`MechSuiteDescription`) for the CHR (characterization) core.

**Introduces / fixes canonical objects and kinds**

* **`CHRMechanismSuiteDescription`** (object; kind: `MechSuiteDescription`): the canonical CHR suite description instance (cited downstream via `MechSuiteDescriptionRef`, edition-addressable when used as a reproducibility baseline).
* **`CHRMechanismSuiteSlotFillingsPlanItem`** (kind; `⊑ SlotFillingsPlanItem`): a suite-specialized plan item kind used as the **planned baseline** for P2W integration of the CHR suite (selection → WorkPlanning → WorkEnactment).

**Depends on**

* A.6.7 `MechSuiteDescription` (Kernel)
* A.15.3 `SlotFillingsPlanItem` (WorkPlanning)
* A.6.1 `U.Mechanism.Intension` (mechanism norm-form)
* A.6.5 slot discipline (`SlotSpec := ⟨SlotKind, ValueKind, refMode⟩`; `SlotIndex` is a projection)
* A.19 `CN‑Spec` (governance card)
* G.0 `CG‑Spec` (legality gate for numeric operations)
* E.TGA / E.18 (P2W + crossings + UTS/Path pins)
* E.10 lexical/ontological rules (strict distinction, suffix discipline, minimal specificity)
* E.19 conformance style (checklist obligations)

**Non-goals**

* No “data governance”, no implementation tooling, no “machine readability” requirements.
* Not a packaging/bundling mechanism (that remains **G.10**).
* Not a replacement for `MechFamilyDescription` (that remains “many implementations of **one** mechanism intension”).

### Problem frame

Part G (and adjacent patterns that operate on measurable slot coordinates, e.g. Q-bundles) repeatedly needs the same *lawful characterization core*:
normalization, indicatorization, scoring, lawful aggregation, comparison, and selection under explicit legality constraints.

In the current corpus, many G patterns interleave:

* universal CHR legality mechanics (CN‑Spec/CG‑Spec citation, set-return semantics, tri-state uncertainty handling, penalties routing),
* CG-frame and crossing obligations (ReferencePlane, Bridge-only transport visibility, edition-sensitive pins), and
* discipline/method/generator specifics (method families, candidate/criteria emitters, packaging concerns),

inside one construct. This mixing makes it hard to universalize Part G, causes drift in defaults and guard semantics, and encourages “hidden tails”
(implicit UNM/UINDM/ULSAM or implicit slot filling outside WorkPlanning).

At the same time, the P2W split requires a uniform *planned baseline* object:
selection can choose refs/policies, WorkPlanning can record planned slot fillings, and WorkEnactment can witness `FinalizeLaunchValues`.
Without a canonical planned-baseline artifact, teams tend to “smuggle” launch values into planning prose or into mechanism descriptions,
which breaks auditability and makes crossings and edition sensitivity non-obvious.
### Problem

This pattern applies when a workflow (especially in Part G) needs lawful characterization over measurable slots/coordinates (e.g., in Q‑bundles), including normalization, indicatorization, scoring, aggregation, comparison, and selection.
### Forces

* **No implicit crossings.** Any cross‑context / cross‑plane reuse must be expressed via Bridge-only Transport and visible crossing bundles (UTS/Path pins).
* **CN‑Spec / CG‑Spec must remain the contract center.** Mechanisms cite them; mechanisms do not duplicate them.
* **Strict separation of layers.** Universal CHR core vs discipline/method specializations vs generators vs packaging.
* **SlotKind invariance.** Specialization ladders must preserve SlotKind meaning and only refine ValueKind / strengthen guards/laws.
* **No silent scalarization / totalization.** Partial orders must remain set‑valued; any numeric summary is report‑only unless explicitly declared as a lawful comparator/policy.
* **P2W split.** Planned slot filling belongs to WorkPlanning; launch values belong to WorkEnactment.
### Solution

This pattern defines a single, canonical **CHR mechanism suite** as a *description object* (not a mechanism, not a pack), so that:

1. the CHR core is reusable across all Part‑G patterns (not only G.5),
2. legality is centralized via **contract pins** (`CN‑Spec`, `CG‑Spec`) and **Transport discipline**,
3. P2W integration is made explicit by requiring a standard **planned slot fillings** artifact in `WorkPlanning`, while keeping **FinalizeLaunchValues** exclusively in `WorkEnactment`.

Core idea:
`CHRMechanismSuiteDescription := {UNM, UINDM, USCM, ULSAM, CPM, SelectorMechanism} + SuiteObligations + SuiteContractPins + SuiteProtocols (+ audit obligations)`.

#### Ownership map and implementability guard

**Tell.** CHR mechanisms are only implementable if each described artefact has a single semantic owner. In FPF, “owner” means a concrete container that can be cited and patched: a `PatternId` (or `PatternId:SectionPath`) for text, a `PatternScopeId = G.x:Ext.*` for wiring modules, or a `DRRId` (E.9) for a decision/rationale record.

**Where lives what (single‑owner routing; cite, don’t duplicate):**

* **see `A.19.CHR:4.2.2` for canonical targets**.
* **CHR suite boundary (membership + obligations + protocols):** `A.19.CHR` (`mechanisms[]` declares `…IntensionRef`; `suite_protocols` declares order/optionality).
* **Planned baseline binding (instances/editions/policy pins):** `A.15.3` + `A.19.CHR:4.7.2` (refs/pins only; no launch values).
* **SoTA harvesting & method claims:** `G.2` (pack owner) and downstream authoring kits (`G.3`, `G.4`) — not this suite.
* **Wiring modules for method/discipline/generator specifics:** `G.*:Extensions` as `GPatternExtension` blocks (`PatternScopeId = G.x:Ext.<…>`), with explicit `SemanticOwnerPatternId`.
* **RSCR trigger catalogue and trigger alias maps:** `G.Core` (single‑writer).
* **Lexical alias docking (token drift without breaking public references):** `F.18`.
* **Project‑level specialization and transduction graphs:** project patterns (`P.*`) for `⊑/⊑⁺` specializations; `E.18 (E.TGA)` for flow graphs citing planned baseline instance refs.
#### Objects published by this pattern

##### CHRMechanismSuiteDescription

A concrete `MechSuiteDescription` instance whose role is to:

* enumerate the canonical CHR mechanisms (as `U.Mechanism.IntensionRef`s),
* declare suite‑level obligations/invariants,
* declare suite‑level contract pins (refs only),
* declare admissible suite protocols (Uses pipelines),
* require a standard planned baseline artifact (`CHRMechanismSuiteSlotFillingsPlanItem`) on P2W paths.

**Note (non-normative, disambiguation).** Kernel A.6.7 already uses `CHRMechanismSuiteDescription` as an illustrative *example* of a `MechSuiteDescription`. This pattern fixes the same-named object as the **canonical** CHR suite instance and supplies its P2W hook plus conformance envelope.
##### CHRMechanismSuiteSlotFillingsPlanItem

A `SlotFillingsPlanItem` specialization used in WorkPlanning to fix the **planned baseline** of:

* pinned `CN‑Spec` / `CG‑Spec` refs (and editions where required),
* chosen mechanism instances / method descriptions / comparator specs (refs only),
* time selector / time rule pins for “no implicit latest”,
* expected guards (Launch/Compare pins) and expected crossing policy pins,
* and context identifiers needed for audit traceability (CG‑frame, path slice, publication scope).

It is explicitly **not** a mechanism, not an admissibility gate, and not a witness of execution.
#### Canonical mechanism membership

**Tell.** `CHRMechanismSuiteDescription.mechanisms` MUST contain the following six mechanism intensions (each published as `U.Mechanism.Intension` per their owner patterns) and MUST treat them as **distinct mechanisms** (not “implementations of one”):

1. `UNM` — Unified Normalization Mechanism
2. `UINDM` — Unified Indicatorization Mechanism
3. `USCM` — Unified Scoring Mechanism
4. `ULSAM` — Unified Lawful Scale Aggregation Mechanism
5. `CPM` — Unified Comparison Mechanism
6. `SelectorMechanism` — universal set‑returning selection kernel

**Show.**

```
CHRMechanismSuiteDescription.mechanisms :=
  [ UNM.IntensionRef,
    UINDM.IntensionRef,
    USCM.IntensionRef,
    ULSAM.IntensionRef,
    CPM.IntensionRef,
    SelectorMechanism.IntensionRef ]
```

**Membership semantics note (normative).**
`mechanisms` denotes a duplicates-free **set**; order carries no semantics. Any intended ordering is expressed only in `suite_protocols`.

**Rationale.** This suite is unified by **governance card, legality gate, and Transport discipline** (CN‑Spec + CG‑Spec + Transport), not by a single BaseType.
#### CHR SlotKind Lexicon (suite‑wide minimum)

**Tell.** To prevent SlotKind drift across the CHR ladder and across SoTA wiring layers, CHR mechanism intensions SHOULD use the SlotKind tokens from this lexicon whenever they refer to the corresponding semantic roles. New SlotKinds MAY be introduced, but only by first extending this lexicon (suite‑owned), then citing the new SlotKind from the affected mechanism card.

**Lexicon (minimum).** Tokens below are **SlotKind** names (not types). Concrete `ValueKind` / `RefKind` constraints are defined by the owning mechanism card and by A.6.5, A.19, G.0.

- **Core contract slots**
  - `CharacteristicSpaceSlot`
  - `CNSpecSlot`
  - `CGSpecSlot`
  - `ContextSlot`

- **Indicatorization**
  - `IndicatorChoicePolicySlot`
  - `IndicatorSetSlot`
  - `JustificationSlot`

- **Scoring**
  - `InputProfileSlot`
  - `ScoreProfileSlot`

- **Aggregation**
  - `MeasureSetSlot`
  - `GammaFoldSlot`
  - `GammaTimeRuleSlot` *(optional)*
  - `AggregatedMeasureSlot`
  - `ContributorSetSlot` *(optional)*

- **Comparison**
  - `LeftProfileSlot`
  - `RightProfileSlot`
  - `ComparatorSpecSlot`
  - `ComparisonResultSlot`

- **Selection**
  - `CandidateSetSlot`
  - `CriteriaSlot`
  - `TaskSignatureSlot` *(optional)*
  - `SelectionSlot`

- **Evidence / legality (optional, policy‑bound)**
  - `MinimalEvidenceSlot` *(optional)*

**Note.** This lexicon is intentionally small and role‑based: it constrains naming, not method semantics. Method/discipline specifics belong in SoTA packs (G.2) and wiring‑only `GPatternExtension` modules, not in the suite core.
#### Canonical Intension targets (no dangling refs)

**Tell.** Each `…IntensionRef` enumerated in `CHRMechanismSuiteDescription.mechanisms` SHALL resolve to a canonical `U.Mechanism.Intension` publication under the mechanism’s own single semantic owner pattern (for CHR: the corresponding `A.19.<MechId>` mechanism-profile pattern). Draft stubs are allowed; dangling refs are not. 

**Canonical targets (normative anchors).**

- `UNM.IntensionRef` → `A.19.UNM`
- `UINDM.IntensionRef` → `A.19.UINDM`
- `USCM.IntensionRef` → `A.19.USCM`
- `ULSAM.IntensionRef` → `A.19.ULSAM`
- `CPM.IntensionRef` → `A.19.CPM`
- `SelectorMechanism.IntensionRef` → `A.19.SelectorMechanism`
#### Suite obligations

`CHRMechanismSuiteDescription.suite_obligations` MUST be written using the **canonical obligation vocabulary** from A.6.7:4.2 and MUST include the following clauses (duplicates-free set semantics; order carries no meaning):

`{ bridge_only_crossings,
   two_bridge_rule_for_described_entity_change,
   transport_declarative_only,
   penalties_route_to_r_eff_only,
   guard_decision_tristate(pass|degrade|abstain),
   unknown_never_coerces_to_pass,
   gate_decision_separation,
   guard_lexeme_reservations,
   cg_spec_cite_required_for_numeric_ops,
   no_silent_scalarisation_of_partial_orders,
   no_silent_totalisation,
   no_thresholds_in_suite_core,
   crossing_visibility_required,
   planned_slot_filling_in_work_planning_only,
   finalize_launch_values_in_work_enactment_only,
   implementation_export_discipline_when_cited }`.

##### Crossings, visibility, and penalties

* **`bridge_only_crossings`:** all cross-context / cross-plane reuse is Bridge-only (no implicit crossings).
* **`two_bridge_rule_for_described_entity_change`:** any described-entity (kind/identity) change (`CL^k`) is explicit and satisfies the two-bridge rule.
* **`transport_declarative_only`:** the suite does not embed CL/Φ/Ψ/Φ_plane tables and does not introduce transfer edges; it requires only refs/pins/anchors whose realization is mediated by E.TGA / gate surfaces.
* **`penalties_route_to_r_eff_only`:** CL/Φ/Ψ/Φ_plane penalties route to `R/R_eff` only; `F/G` are invariant under penalty routing.
* **`crossing_visibility_required`:** any GateCrossing relevant to suite use publishes a `CrossingBundle` (E.18) and can be cited as an audit anchor (including LaunchGate and `edition_key` changes of pinned `editions{…}` vectors).
##### Guards and gate separation

* **Guard decision tristate:** mechanism‑level guards return
  `GuardDecision := {pass | degrade | abstain}`.
* **Unknown never coerces to pass:** unknown/insufficient evidence MUST map to `degrade` or `abstain`, not to `pass`.
* **Gate decision separation:** mechanisms and suite objects MUST NOT publish `GateDecision` nor `DecisionLog`. `block` is gate‑only (OperationalGate(profile)).
* **Guard lexeme reservations:** `USM.CompareGuard` / `USM.LaunchGuard` are gate‑level pins; mechanism predicates use suffixes `…Admissibility` / `…Eligibility`.
##### Numeric legality and order semantics

* **CG‑Spec citation required:** any numeric scoring/aggregation/comparison MUST cite CG‑Spec (SCP + ComparatorSet + MinimalEvidence + Γ_fold + Φ/CL pins), and MUST NOT embed a “shadow CG‑Spec” inside mechanisms/suite.
* **No silent scalarisation of partial orders:** partial order comparisons remain set‑valued; any scalar summary is report‑only unless explicitly declared as a lawful comparator/policy.
* **No silent totalisation:** absence of totality MUST NOT be hidden by “tie‑breakers” or implicit weights.
##### P2W discipline

* **Planned slot filling in WorkPlanning only.**
* **FinalizeLaunchValues in WorkEnactment only.**
* Suite and plan objects MUST NOT contain launch‑value witnesses.
##### Thresholds and defaults

* **`no_thresholds_in_suite_core`:** acceptance thresholds live in AcceptanceClauses / TaskSignature / GateProfile, not in CHR suite core.
* **Default discipline (no competing defaults):** the suite MUST NOT introduce competing defaults. If a default is used (e.g., portfolio mode), it MUST be cited from its single declared source (typically a TaskSignature or an explicit policy-id), and all other mentions are citations.
##### Implementation export discipline (when cited)

* Suite MAY cite implementations (CAL/LOG/CHR) as refs, but:

  * LOG/CHR do not export Γ,
  * CAL exports exactly one Γ,
  * imports are acyclic.
##### Routed claim mini-register (A.6.B)

**Intent.** `CHRMechanismSuite` is a contract-like architectural boundary (suite obligations + P2W hook). To avoid “contract soup”, the load-bearing statements below are routed as atomic claims per **A.6.B** and can be cited by IDs instead of being paraphrased across downstream patterns and MVPK faces.

| ID | Quadrant | Statement (atomic; verbatim) | Canonical location |
|---|---|---|---|
| **L-A67CHR-01** | L | `CHRMechanismSuiteDescription.mechanisms` denotes a duplicates-free set; order carries no semantics. | A.19.CHR:4.2 (Membership semantics note) |
| **L-A67CHR-02** | L | A “planned baseline” is a WorkPlanning artefact that records planned fillers and pins for a P2W path slice. | A.19.CHR:4.1.2 / 4.6 |
| **L-A67CHR-03** | L | A planned baseline is not an execution witness and contains no launch values. | A.19.CHR:4.1.2 / 4.6 |
| **A-A67CHR-01** | A | A suite protocol is *suite-closed* iff every `ProtocolStep.mechanism` is a member of `CHRMechanismSuiteDescription.mechanisms`. | A.19.CHR:4.5 (WF‑MS‑2) |
| **A-A67CHR-02** | A | A P2W path slice is CHR-suite-ready for enactment iff a planned baseline of kind `CHRMechanismSuiteSlotFillingsPlanItem` exists for that slice, sets `target_slot_owner_ref` to an edition-addressable `MechSuiteDescriptionRef` whose referent is `CHRMechanismSuiteDescription`, and pins `CNSpecRef` and `CGSpecRef`. | A.19.CHR:4.6 |
| **D-A67CHR-01** | D | Suite authors SHALL publish `CHRMechanismSuiteDescription` as a `MechSuiteDescription` instance. | A.19.CHR:7.1 (CC‑A67CHR‑1) |
| **D-A67CHR-02** | D | Suite authors SHALL NOT encode `CHRMechanismSuiteDescription` as a `MechFamilyDescription`. | A.19.CHR:7.1 (CC‑A67CHR‑1) |
| **D-A67CHR-03** | D | Suite authors SHALL enumerate exactly `{UNM, UINDM, USCM, ULSAM, CPM, SelectorMechanism}` as `U.Mechanism.IntensionRef`s in `CHRMechanismSuiteDescription.mechanisms`. | A.19.CHR:4.2 / 7.1 (CC‑A67CHR‑2) |
| **D-A67CHR-04** | D | Suite authors SHALL keep `CHRMechanismSuiteDescription.suite_contract_pins` refs-only. | A.19.CHR:4.4 / 7.1 (CC‑A67CHR‑3) |
| **D-A67CHR-05** | D | Suite authors SHALL NOT embed CL/Φ/Ψ/Φ_plane tables or introduce transport edges in suite- or plan-level artefacts. | A.19.CHR:4.3.1 / 4.4 / 7.2 (CC‑A67CHR‑13) |
| **D-A67CHR-06** | D | WorkPlanning authors SHALL publish one `CHRMechanismSuiteSlotFillingsPlanItem` per P2W path slice that uses the CHR suite. | A.19.CHR:4.6 / 7.2 (CC‑A67CHR‑10) |
| **D-A67CHR-07** | D | WorkPlanning authors SHALL ensure a `CHRMechanismSuiteSlotFillingsPlanItem` contains planned pins/fillers only. | A.19.CHR:7.2 (CC‑A67CHR‑11) |
| **D-A67CHR-08** | D | WorkPlanning authors SHALL NOT include launch values, execution witnesses, gate decisions, or decision logs in a `CHRMechanismSuiteSlotFillingsPlanItem`. | A.19.CHR:7.2 (CC‑A67CHR‑11) |
| **D-A67CHR-09** | D | MVPK face authors SHALL ensure any claimful face that publishes edition pins or comparability/launch claims also publishes the required BridgeCard + UTS row anchors and the applicable USM guard pin with `GuardOwnerGateSlot`. | A.19.CHR:7.3 (CC‑A67CHR‑16) |
| **E-A67CHR-01** | E | Evidence carrier for the planned baseline is the `CHRMechanismSuiteSlotFillingsPlanItem` instance and its citation from downstream `U.Work.Audit` as the baseline for the path slice. | A.19.CHR:7.2 (CC‑A67CHR‑14) |
| **E-A67CHR-02** | E | Evidence carrier for launch values and `FinalizeLaunchValues` is `U.WorkEnactment` (and its audit/evidence carriers), not the planned baseline artefact. | A.19.CHR:4.6 / 7.2 |
#### Suite contract pins

`CHRMechanismSuiteDescription.suite_contract_pins` MUST be refs‑only and MUST include:

1. **Required spec refs:** `{CNSpecRef, CGSpecRef}` (as required pins, not copied content).
2. **Required planned baseline:** `required_planned_baseline_ref := CHRMechanismSuiteSlotFillingsPlanItem` (kind‑level requirement: “P2W path MUST publish a planned baseline artifact of this kind”).
3. **Required edition pins / policy pins (when applicable):**

   * `editions{CG‑Spec, ComparatorSet, UNM.TransportRegistryΦ, …}` when the chosen protocol path is edition‑sensitive,
   * policy‑id pins for Φ/Ψ/Φ_plane when crossings are expected.

**Tell (discipline).** Contract pins are **anchors**; they do not embed tables (CL ladders, Φ registries) and do not introduce transport edges.
#### Suite protocols

`CHRMechanismSuiteDescription.suite_protocols` (if present) MUST follow the A.6.7 `SuiteProtocol` structure and MUST be closed over suite membership (WF‑MS‑2): every `ProtocolStep.mechanism` is a member of `CHRMechanismSuiteDescription.mechanisms`.

If `suite_protocols` is present, it SHALL include at least one protocol that is equivalent to the canonical **suite-closed** pipeline below (with `fold_Γ` explicitly optional).

**Show (canonical suite-closed protocol).**

```
normalize (UNM) →
indicatorize (UINDM) →
score (USCM) →
fold_Γ? (ULSAM) →
compare (CPM) →
select (SelectorMechanism)
```

**Tell.**

* The `fold_Γ` step is optional (explicitly optional, not implicit inside `score/compare/select`).
* `suite_protocols` encodes a pipeline/Uses contour between mechanisms; it does **not** define a specialisation ladder (`⊑/⊑⁺`). Specialisations live in `A.6.1:4.2.1` (and in project `P.*` extensions).
* Any publish/telemetry step is **outside** `suite_protocols` (to preserve WF‑MS‑2 closure) and is routed through established publication patterns (G.10 and/or PTM), not as “hidden tails” inside CHR mechanisms.
#### P2W hook: mandatory planned baseline

**Tell.** Any P2W path that uses `CHRMechanismSuiteDescription` MUST include a `WorkPlanning` artifact:

an instance of kind `CHRMechanismSuiteSlotFillingsPlanItem` (where `CHRMechanismSuiteSlotFillingsPlanItem ⊑ SlotFillingsPlanItem`)

that acts as the **planned baseline** for all suite‑level pinned refs/editions/policies used downstream.

This is the mandatory bridge between:

* *selection* (G.* set‑return choice of candidates/policies), and
* *WorkEnactment* (FinalizeLaunchValues witness + gate execution + logs).
#### Canonical concept card fragments

##### CHRMechanismSuiteDescription as a concrete MechSuiteDescription

**Show (canonical skeleton; refs only).**

```
CHRMechanismSuiteDescription := ⟨
  mech_suite_id        : MechSuiteId,
  mechanisms           : [UNM.IntensionRef, UINDM.IntensionRef, USCM.IntensionRef,
                          ULSAM.IntensionRef, CPM.IntensionRef, SelectorMechanism.IntensionRef],

  suite_obligations    : SuiteObligations {
                          bridge_only_crossings,
                          two_bridge_rule_for_described_entity_change,
                          transport_declarative_only,
                          penalties_route_to_r_eff_only,
                          guard_decision_tristate(pass|degrade|abstain),
                          unknown_never_coerces_to_pass,
                          gate_decision_separation,
                          guard_lexeme_reservations,
                          no_thresholds_in_suite_core,
                          cg_spec_cite_required_for_numeric_ops,
                          no_silent_scalarisation_of_partial_orders,
                          no_silent_totalisation,
                          crossing_visibility_required,
                          planned_slot_filling_in_work_planning_only,
                          finalize_launch_values_in_work_enactment_only,
                          implementation_export_discipline_when_cited
                        },

  suite_contract_pins  : SuiteContractPins {
                          required_spec_refs := {CNSpecRef, CGSpecRef},
                          required_planned_baseline_ref := CHRMechanismSuiteSlotFillingsPlanItem,
                          required_edition_pins? := …,
                          required_policy_id_pins? := …
                        },

  suite_protocols?     : SuiteProtocol[*],            // includes the canonical pipeline
  suite_notes?         : …,                            // didactic boundaries + anti-patterns
  suite_audit_obligations? : …                         // UTS+Path pins, crossings visibility, guard ownership
⟩
```
##### CHRMechanismSuiteSlotFillingsPlanItem as a SlotFillingsPlanItem

**Tell.** This plan item fixes the planned baseline for suite contract pins and for chosen mechanism/policy refs, within an explicit P2W context.

**Required fields (minimum; aligns with A.15.3 naming)**

* `target_slot_owner_ref` MUST be edition-addressable and MUST reference the `CHRMechanismSuiteDescription` instance (kind: `MechSuiteDescription`) via a `MechSuiteDescriptionRef@edition(…)` (the suite is the slot owner for this planned baseline).
* MUST include explicit context anchors:
  * `described_entity_ref` (a concrete RefKind per C.2.3),
  * `bounded_context_ref`,
  * `cg_frame_ref`,
  * `reference_plane` (unless unambiguously derivable from cited context artefacts; see A.15.3 context-derivability rule),
  * `path_slice_id`,
  * `publication_scope_id`,
  * `Γ_time_selector` (ByValue) or `Γ_time_rule_ref` (ByRef) — no implicit “latest”.
* MAY include `expected_usm_guard_pins ⊆ {USM.CompareGuard, USM.LaunchGuard}` (planned expectation only; not execution).
  If `expected_usm_guard_pins` is present and non-empty, the PlanItem MUST also pin (or make unambiguously derivable) `guard_owner_gate_ref` required for later aggregation of `GuardFail` events (A.15.3 guard-owner rule).
* MUST include planned fillings for (at least) the suite contract pins, expressed as `planned_fillings` rows keyed by the corresponding SlotKind tokens:
  * `CNSpecSlot` filled by `ByRef(CNSpecRef@edition(…))` (edition‑pinned where required),
  * `CGSpecSlot` filled by `ByRef(CGSpecRef@edition(…))` (edition‑pinned where required),
    and (when applicable) the chosen method/comparator/mechanism refs as planned fillers (e.g., `ScoringMethodDescriptionSlot`, `ComparatorSpecSlot`, …).
* When crossings are expected, MUST include `expected_crossing_policy_refs` (refs only):
  `⟨bridge_card_ref, phi_policy_id, psi_policy_id?, phi_plane_policy_id?, reference_plane(src,tgt)⟩ …`,
  and SHOULD include the corresponding `expected_crossing_bundle_refs` (refs only) so crossing visibility has an explicit anchor.

**Prohibitions**

* MUST NOT contain `GateDecision` / `DecisionLog`.
* MUST NOT contain `FinalizeLaunchValues` witnesses or launch values.
* MUST NOT embed CL/Φ/Φ_plane tables; only refs/pins.
#### Examples

##### Example — normalization-based comparability with explicit Uses chain

**Show.**

* `CHRMechanismSuiteDescription` is referenced by a G‑pattern (e.g., method selection, parity selection, or lawful publish pipeline).
* WorkPlanning publishes `CHRMechanismSuiteSlotFillingsPlanItem` with:

  * pinned `CNSpecRef(ed=…)`, `CGSpecRef(ed=…)`,
  * pinned `ComparatorSpecRef(ed=…)` (from `CG‑Spec.ComparatorSet`),
  * pinned `ScoringMethodDescriptionRef(ed=…)` (e.g., a monotone scoring method),
  * explicit `Γ_timeSelector` (“point at …”, no implicit “latest”),
  * `ExpectedUSMGuards = {USM.CompareGuard, USM.LaunchGuard}`,
  * expected crossing policy pins for any cross‑context step.

The executed protocol (by E.TGA/P2W) is:
Suite-closed protocol:
`UNM → UINDM → USCM → CPM → SelectorMechanism`.
Downstream continuation (outside `suite_protocols`): publication/telemetry via `G.10` and/or `PTM`.

**SoTA note (illustrative, non-normative).** A `ScoringMethodDescription` here can represent a post‑2015 monotone model family (e.g., monotone lattice / constrained monotone learning) or a set‑valued scoring family (e.g., conformalized score intervals), as long as legality remains SCP‑bound and uncertainty is handled via tri‑state guards rather than being suppressed into a scalar.
##### Example — archive portfolio mode with report-only illumination

**Show.**

* The same CHR suite is used, but the selected `SelectorMechanism` specialization (via G.* extension) returns an **Archive** portfolio.
* WorkPlanning plan item additionally pins:

  * `DescriptorMapRef@edition(…)` and `DistanceDefRef@edition(…)` (QD/illumination configuration),
  * an explicit policy ref that states illumination is **report‑only** by default,
  * a separate CAL policy‑id if illumination is ever promoted into dominance (never implicit).

**SoTA note (illustrative, non-normative).** Archive semantics align naturally with quality‑diversity families that matured after 2015 (MAP‑Elites‑class extensions, CMA‑ME‑class, etc.), while the pattern’s “promotion only via policy‑id” prevents an implicit collapse of diversity telemetry into dominance.
#### Evolution rules

* **Kernel-first stability.** This suite is intentionally minimal. Adding a new core CHR mechanism to this kernel suite is a suite-version change and MUST be accompanied by alias docking (F.18) so existing references remain citeable. For exploratory or domain‑specific extra stages, prefer a suite variant (e.g., `A.19.CHR+` / `A.19.CHR.Extended`) or project‑level specializations (patterns P.\*) instead of mutating the kernel.
* **Mechanism specializations are not wiring.** Domain/project variants are expressed via A.6.1 (`⊑/⊑⁺`) under their semantic owner (typically a project pattern `P.*`), not by editing suite membership. The suite binds to `…IntensionRef`; the planned baseline (A.19.CHR:4.7.2 under A.15.3) chooses concrete instances/specializations.
* **Protocols evolve within the suite boundary.** Adding/changing suite protocols (A.19.CHR:4.5) is allowed as long as each protocol remains suite‑closed and does not import publish/telemetry as a mandatory step. If a protocol introduces a new required stage not present in membership, treat it as a suite variant rather than a protocol edit.
* **SoTA harvesting updates methods, not the kernel.** Updates from SoTA harvesting/synthesis (G.2) are carried via edition‑pinned `MethodDescriptionRef` / `ComparatorSpecRef` selections and wiring modules (`G.x:Ext.*`), keeping the kernel Intension set stable. If a SoTA update requires changing a mechanism’s signature/laws, the change happens in the owning A.6.1 card and MUST emit RSCR triggers from `G.Core`.
* **New mechanism families (outside CHR).** Introduce new mechanism kinds as new family-specific patterns under the appropriate mechanism family. If they require suite-level composition and P2W binding, add a corresponding suite pattern `A.6.7.<FamilyKey>` plus a suite-specific planned baseline specialization of A.15.3, mirroring the ownership routing of this pattern.
#### U.System vignette (Tell–Show–Show)

**Tell.** A system-level decision must select a portfolio of options when measurable evidence comes from multiple slices (test rigs, simulations, field trials). Measurements are multi-scale and not always comparable without explicit normalization, and some evidence is missing or stale. The team needs lawful comparison and selection without forcing a single scalar “fitness”.

**Show.** The system’s P2W path cites `CHRMechanismSuiteDescription` and publishes `CHRMechanismSuiteSlotFillingsPlanItem` as the planned baseline:
`CNSpecRef(ed=…)`, `CGSpecRef(ed=…)`, chosen `ComparatorSpecRef(ed=…)`, chosen `ScoringMethodDescriptionRef(ed=…)`, explicit `Γ_timeSelector` (point or window), and expected guard pins.
WorkEnactment witnesses `FinalizeLaunchValues` and runs `UNM → UINDM → USCM → CPM → SelectorMechanism`, returning a set-valued portfolio (Pareto or Archive), while any cross-context reuse is surfaced by Bridge-only crossings and audit pins.

**Show.** If the team instead embeds normalization inside scoring (“we always normalize to [0,1]”) or collapses a partial order into a single weighted sum, the suite protocol explicitness and “no silent scalarization/totalization” obligations make the violation legible at review time, and the planned baseline cannot honestly pin the missing UNM/ULSAM steps.
#### U.Episteme vignette (Tell–Show–Show)

**Tell.** A research episteme compares methodological claims across traditions where some evaluation scales are ordinal (rank-based) and others are interval or ratio. The group wants to select a method family for a task while keeping uncertainty explicit and avoiding illicit aggregation (e.g., averaging ranks).

**Show.** The episteme’s planned baseline pins `CNSpecRef` (comparability mode and indicator policy) and `CGSpecRef` (SCP, ComparatorSet, MinimalEvidence, Γ_fold). The suite runs `UINDM` to select indicators, `USCM` to compute lawful score measures under SCP, `ULSAM` only when Γ_fold is explicitly selected, and `CPM` to compare without scalarizing partial orders. The selector returns a portfolio rather than forcing a single winner.

**Show.** If a draft evaluation writes “take the mean rank and pick the minimum”, the pattern’s legality discipline forces the author either to (a) re-express the step as a lawful comparator declared in CG‑Spec, or (b) keep the result as report-only telemetry, not a dominance driver.
### Bias-Annotation

**Lenses tested:** `Gov`, `Arch`, `Onto/Epist`, `Prag`, `Did`. **Scope:** Universal for any Part‑G (and adjacent) use of the CHR characterization core via `CHRMechanismSuiteDescription` and the corresponding P2W planned-baseline artifact.

* **Gov.** Bias toward fail-closed legality and explicit auditability (Bridge-only crossings, pinned spec refs, guard–gate separation). Mitigation: the tri-state `GuardDecision` allows uncertainty to degrade or abstain without forcing gate-level blocking; exploration can still proceed via explicit SoS‑LOG policy branches.
* **Arch.** Bias toward explicit node-level composition (E.TGA) and explicit P2W artifacts (`SlotFillingsPlanItem`). Mitigation: the suite fixes only the universal core; discipline-specific generators and extensions remain separate mechanisms connected by `Uses`, keeping the suite compact.
* **Onto/Epist.** Bias toward a strict separation of contracts (CN‑Spec/CG‑Spec), mechanisms (A.6.1), and planning epistemes (A.15.3). Mitigation: specialization is explicitly supported (`⊑/⊑⁺`) and does not require inventing new top-level constructs; method diversity is expressed via MethodDescription refs and ComparatorSpec refs.
* **Prag.** Bias toward conservative uncertainty handling (unknown does not coerce to pass) may reduce decisiveness. Mitigation: “probe-only” and “sandbox” behaviors are permitted as explicit, audited degrade modes (policy-id + branch-id), not as silent coercions.
* **Did.** Bias toward explicit terminology and pins increases authoring surface area. Mitigation: this pattern provides a canonical protocol and a single planned-baseline kind so authors can reuse a stable template rather than re-inventing local prose conventions.
### Conformance Checklist

A work product set is conformant to **A.19.CHR** iff all applicable items below hold. Where useful, checklist items cite routed claim IDs from **A.19.CHR:4.3.7** to reduce paraphrase drift.

#### Suite object checks

**CC‑A67CHR‑1 (Correct kind and level).**
A conforming `CHRMechanismSuiteDescription` SHALL be a `MechSuiteDescription` instance and SHALL NOT be encoded as a `MechFamilyDescription`.

**CC‑A67CHR‑1a (Stable citation handle).**
A conforming `CHRMechanismSuiteDescription` SHALL include a stable `mech_suite_id` suitable for downstream planning and `U.Work.Audit` citation.

**CC‑A67CHR‑2 (Canonical membership).**
A conforming `CHRMechanismSuiteDescription` SHALL enumerate exactly the six CHR mechanisms (UNM, UINDM, USCM, ULSAM, CPM, SelectorMechanism) as `U.Mechanism.IntensionRef`s.

**CC‑A67CHR‑2a (Membership set semantics).**
A conforming `CHRMechanismSuiteDescription.mechanisms` SHALL be duplicates-free and SHALL NOT treat order as semantic (WF‑MS‑1).

**CC‑A67CHR‑2b (No dangling IntensionRefs).**
Each `U.Mechanism.IntensionRef` enumerated in `CHRMechanismSuiteDescription.mechanisms` SHALL resolve to a canonical `U.Mechanism.Intension` publication under the single semantic owner pattern (draft stubs allowed; dangling refs are not). See `A.19.CHR:4.2.2`.

**CC‑A67CHR‑3 (Contract surfaces are pins, not copies).**
A conforming `CHRMechanismSuiteDescription` SHALL cite `CN‑Spec` and `CG‑Spec` as required spec refs and SHALL NOT duplicate them as “shadow specs”.

**CC‑A67CHR‑3a (Planned-baseline requirement is pinned).**
A conforming `CHRMechanismSuiteDescription` SHALL set
`suite_contract_pins.required_planned_baseline_ref = CHRMechanismSuiteSlotFillingsPlanItem`
so the P2W seam is enforced by the suite contract surface (not by ad hoc prose).

**CC‑A67CHR‑4 (Crossing discipline is complete).**
A conforming `CHRMechanismSuiteDescription.suite_obligations` SHALL include, at minimum:
`bridge_only_crossings`,
`two_bridge_rule_for_described_entity_change`,
`transport_declarative_only`,
`penalties_route_to_r_eff_only`,
`guard_decision_tristate(pass|degrade|abstain)`,
`unknown_never_coerces_to_pass`,
`gate_decision_separation`,
`guard_lexeme_reservations`,
`cg_spec_cite_required_for_numeric_ops`,
`no_silent_scalarisation_of_partial_orders`,
`no_silent_totalisation`,
`no_thresholds_in_suite_core`,
`crossing_visibility_required`,
`planned_slot_filling_in_work_planning_only`,
`finalize_launch_values_in_work_enactment_only`,
`implementation_export_discipline_when_cited`.

**CC‑A67CHR‑5 (Guard/gate separation).**
A conforming `CHRMechanismSuiteDescription.suite_obligations` SHALL:
1) enforce tri‑state guard decisions (`pass|degrade|abstain`),
2) enforce `unknown_never_coerces_to_pass`,
3) enforce guard–gate separation (no `GateDecision` / `DecisionLog` at mechanism/suite level; `block` remains gate‑only), and
4) enforce guard lexeme reservations (`USM.CompareGuard` / `USM.LaunchGuard` are gate-level pins; mechanism predicates use `…Admissibility/…Eligibility`).

**CC‑A67CHR‑6 (No hidden scalarization/totalization).**
A conforming `CHRMechanismSuiteDescription.suite_obligations` SHALL include explicit bans on silent scalarization of partial orders and silent totalization.

**CC‑A67CHR‑7 (No thresholds in core + single-source defaults).**
A conforming `CHRMechanismSuiteDescription.suite_obligations` SHALL include `no_thresholds_in_suite_core`.
If any suite protocol relies on defaults (e.g., portfolio mode), the artefacts SHALL cite those defaults from their single declared source (typically a TaskSignature or explicit policy-id), and SHALL NOT introduce competing defaults in the suite.

**CC‑A67CHR‑8 (Protocol explicitness + closure).**
If `suite_protocols` is present, a conforming `CHRMechanismSuiteDescription` SHALL:
1) express any dependence as an explicit protocol step (no hidden invocation of UNM/UINDM/ULSAM inside score/compare/select), and
2) satisfy WF‑MS‑2 (protocol closure): every protocol step cites a mechanism that is a member of the suite.

**CC‑A67CHR‑8a (Canonical protocol is available when protocols are published).**
If `suite_protocols` is present, a conforming `CHRMechanismSuiteDescription` SHALL include at least one protocol equivalent to:
`normalize (UNM) → indicatorize (UINDM) → score (USCM) → fold_Γ? (ULSAM) → compare (CPM) → select (SelectorMechanism)`,
where `fold_Γ` is explicitly optional.
Any publish/telemetry continuation is routed externally (e.g., via G.10 and/or PTM) and MUST NOT be encoded as a `ProtocolStep` inside `suite_protocols` (to preserve WF‑MS‑2 closure).

**CC‑A67CHR‑9 (Packaging separation).**
If protocols include `publish/telemetry`, it is routed through G.10 and/or PTM; the suite does not act as a pack/shipping artifact.
#### Planned baseline checks

**CC‑A67CHR‑10 (Planned baseline exists on P2W paths).**
For each P2W path slice that uses the suite, Authors SHALL provide a `CHRMechanismSuiteSlotFillingsPlanItem` in WorkPlanning.

**CC‑A67CHR‑10a (Correct slot owner).**
A conforming `CHRMechanismSuiteSlotFillingsPlanItem` SHALL set `target_slot_owner_ref = CHRMechanismSuiteDescriptionRef` (edition-addressable when used as a reproducibility baseline).

**CC‑A67CHR‑11 (Plan item is baseline, not execution).**
The plan item contains planned fillers and pins only; it does not contain launch values, execution witnesses, gate decisions, or logs.

**CC‑A67CHR‑11a (Minimum P2W context anchors).**
A conforming `CHRMechanismSuiteSlotFillingsPlanItem` SHALL include, at minimum:
`described_entity_ref`, `bounded_context_ref`, `cg_frame_ref`, `path_slice_id`, `publication_scope_id`, and an explicit time selector (`Γ_time_selector` ByValue or `Γ_time_rule_ref` ByRef),
and SHALL either include `reference_plane` or make it unambiguously derivable from the cited context artefacts.

**CC‑A67CHR‑11b (Planned guard pins and guard ownership).**
If `expected_usm_guard_pins` is present in a `CHRMechanismSuiteSlotFillingsPlanItem`, it SHALL satisfy
`expected_usm_guard_pins ⊆ {USM.CompareGuard, USM.LaunchGuard}`.
If `expected_usm_guard_pins` is present and non-empty, the plan item SHALL also pin (or make unambiguously derivable) `guard_owner_gate_ref` required for later aggregation of `GuardFail` events (per the A.15.3 guard-owner rule).

**CC‑A67CHR‑11c (Planned contract pins are present).**
A conforming `CHRMechanismSuiteSlotFillingsPlanItem` SHALL include planned fillings (refs/pins; no copied content) for, at minimum, SlotKinds `CNSpecSlot` and `CGSpecSlot` (filled by edition‑pinned `CNSpecRef` / `CGSpecRef` where required by the chosen protocol).

**CC‑A67CHR‑12 (Edition/time explicitness).**
The plan item includes explicit time selector/rule (no implicit “latest”) and includes edition pins where the protocol is edition‑sensitive.
Edition pins MAY be carried via edition-addressable refs in `planned_fillings` and/or via per-row `SlotFillingRow.edition_pin` (A.15.3 edition-pin rule); they MUST remain pins/anchors, not copied artefacts.

**CC‑A67CHR‑13 (Crossing pins are refs-only).**
Expected crossings are expressed via Bridge/policy refs and ReferencePlane pins; no embedded CL/Φ tables.
If expected crossings are listed, `expected_crossing_bundle_refs` SHOULD be provided (or be unambiguously derivable) so crossing visibility has an explicit audit anchor.

**CC‑A67CHR‑14 (Audit traceability).**
The plan item is citeable from downstream `U.Work.Audit` as the planned baseline, and deviations (retarget/substitute/assign/update) require a variance trace.
#### MVPK face checks (when projected)

**CC‑A67CHR‑15 (Views do not add meaning).**
Any `TechCard(…)` / `PlainView(…)` projection of the plan item does not introduce new assertions beyond the plan item.

**CC‑A67CHR‑16 (Fail-closed pins on claimful faces).**
If a face publishes edition pins or claims comparability/launch, it MUST also publish the required BridgeCard + UTS row anchors and the appropriate USM guard pin with `GuardOwnerGateSlot`; otherwise, it is nonconformant (fail‑closed).
### Common Anti-Patterns and How to Avoid Them

| Anti-pattern | Why it fails | Avoid / repair |
|---|---|---|
| Using `MechFamilyDescription` as a suite container | Collapses “many implementations of one mechanism” into “many mechanisms”, mixing levels and breaking reuse contracts | Use `MechSuiteDescription` for multi-mechanism sets; use `MechFamilyDescription` only for multiple implementations of a single `U.Mechanism.Intension` |
| Embedding a second CG‑Spec or CL/Φ/Φ_plane tables inside the suite or plan item | Duplicates the contract center and creates drift between planning, gates, and audit | Publish refs and pins only (`CGSpecRef`, `BridgeCardRef`, policy-id pins); keep tables in their canonical registries and cite them |
| Implicit UNM/UINDM/ULSAM “inside” score/compare/select | Breaks auditability and violates the suite protocol explicitness obligation | Make dependencies explicit as protocol steps (`Uses`) and cite the chosen mechanism instances in the planned baseline and audit pins |
| Hidden thresholds or weights in CHR core | Moves acceptance criteria into the wrong layer, defeating “single source of defaults” and traceability | Keep thresholds in AcceptanceClauses, TaskSignature, or GateProfile; if a policy is needed, mint a policy-id and cite it explicitly |
| Scalarizing partial orders “for convenience” | Violates set-return semantics and hides incomparability | Keep comparisons set-valued via CPM and selectors portfolio-returning; any scalar summary must be declared as report-only telemetry or as an explicit lawful comparator |
| Treating planned baseline as a launch witness | Smuggles execution facts into planning and blurs P2W separation | Record planned slot fillings in WorkPlanning; witness `FinalizeLaunchValues` only in WorkEnactment and cite the plan item as baseline with variance traces |
| Using `CompareGuard` / `LaunchGuard` as mechanism lexemes | Collides with reserved gate-level pins and blurs guard vs gate responsibilities | In mechanisms use `…Eligibility` / `…Admissibility`; reserve `USM.CompareGuard` and `USM.LaunchGuard` for gate-visible pins |
### Consequences

| Consequence | Upside | Cost / risk | Mitigation |
|---|---|---|---|
| One canonical CHR core anchor for Part G | Universalization becomes structurally simpler: G patterns cite one suite and specialize via `⊑/⊑⁺` or `Uses` | Up-front refactoring effort | Use the suite as a non-invasive anchor: keep existing method/generator constructs but route them through stable SlotKinds and planned baselines |
| Explicit P2W planned baseline | Eliminates hidden slot filling and improves auditability of editions, time selectors, and crossings | Adds a planning artifact per path slice | Keep the plan item minimal (refs and pins only) and project it to views for readability when needed |
| Tri-state guard semantics | Avoids false precision and prevents unknown from silently passing | More conservative behavior can yield larger portfolios or more abstentions | Use explicit SoS‑LOG degrade branches for probe-only exploration while preserving traceability |
| Contract pins, not copied contract content | Reduces drift and keeps CN‑Spec/CG‑Spec as real centers of gravity | Requires discipline in authoring and review | Enforce “refs-only” at suite/plan level and use conformance items CC‑A67CHR‑3 and CC‑A67CHR‑13 to keep the surface clean |
### Rationale

This pattern deliberately fixes the CHR core as a **description object** rather than a new “meta-mechanism” so that:

1. **Level separation stays clean.** The suite is a D-episteme that enumerates mechanisms and obligations; the mechanisms remain `U.Mechanism.Intension` nodes with their own SlotSpecs, laws, guards, transport and audit. This prevents a “god object” that re-implements A.6.1 inside a new container.

2. **Contracts remain centralized.** CN‑Spec and CG‑Spec already define the governance card and legality gate that own comparability, normalization, indicatorization policy, and numeric legality. The suite requires those specs as pins and forbids duplicating them, making “one center of gravity” operational rather than rhetorical.

3. **P2W integration becomes explicit without turning planning into execution.** A planned-baseline `SlotFillingsPlanItem` is the minimal, reusable way to record “what will fill which slots under which CG-frame and path slice” while preserving the rule that only WorkEnactment witnesses launch values.

4. **Uncertainty handling is made safe by construction.** Tri-state guard decisions are a minimal contract that supports lawful abstention and degradation while keeping gate decisions and decision logs in their proper place (OperationalGate(profile)).

In short: *contracts are cited, not copied; plans are declared, not executed; and legality is a first-class surface, not a hidden tail.*
### SoTA-Echoing

This pattern aligns with several post‑2015 practice lines while adapting them to FPF’s concept-first, contract-pinned discipline.

| Practice line (post‑2015) | Primary source | What is adopted here | Adoption status |
|---|---|---|---|
| Architecture description standards emphasize explicit viewpoints, explicit views, and view consistency rules. | ISO/IEC/IEEE 42010:2022 | “Views are projections of existing content” is mirrored by MVPK faces that do not add meaning beyond the underlying episteme. | **Adopt/Adapt:** adopt the viewpoint discipline; adapt terminology to FPF’s `U.View` projections. |
| Selective classification work formalizes abstention/deferral under uncertainty as a first-class outcome. | Geifman & El‑Yaniv (SelectiveNet, 2019) | A first-class “abstain/defer” outcome is mirrored by tri-state `GuardDecision` where unknown does not coerce to pass. | **Adapt:** integrate abstention into guard outputs while keeping gate decisions/logs gate-only (SoS‑LOG for degrade branches). |
| Quality-diversity research treats diverse portfolios/archives as first-class outputs rather than forcing a single optimum. | Pugh, Soros, Stanley (Quality Diversity, 2016) | Treating portfolios/archives as primary outputs aligns with set-return selection and Archive mode, with illumination treated as report-only unless promoted by policy-id. | **Adapt:** preserve legality pins and forbid hidden scalarization/totalization; allow promotion only via explicit policy-id. |
| Open-endedness research emphasizes continual portfolio maintenance and explicit task/environment generation separate from the selector kernel. | Wang et al. (POET, 2019) | The separation “universal core vs generators via Uses” mirrors the need to keep method/task generation separate from the selector kernel. | **Adapt:** add explicit edition pins and crossing visibility pins so maintenance remains auditable across contexts/planes. |

**Terminology drift and deltas.** Many contemporary sources speak in terms of “pipelines” and “provenance”. FPF’s delta is the explicit separation of (a) planned baseline in WorkPlanning, (b) execution witnesses in WorkEnactment, and (c) audit pins that remain conceptual anchors rather than tooling formats. Where external practice sometimes relies on implicit transfer assumptions, FPF requires cross-context reuse to be explicit as Bridge-only transport with visible pins (`BridgeId`, `CL` or `CL^k`, and the relevant Φ/Ψ/Φ_plane policy-ids), with penalties routed to `R_eff` only.
### Relations

#### Builds on

* **A.6.7 `MechSuiteDescription`** (the base suite description kind and obligations surface)
* **A.15.3 `SlotFillingsPlanItem`** (planned baseline in WorkPlanning)
* **A.6.1 `U.Mechanism.Intension`** and **A.6.5 slot discipline** (SlotSpecs in signatures; SlotIndex as projection)
* **A.19 CN‑Spec** and **G.0 CG‑Spec** (governance card and legality gate)
* **E.TGA / E.18** (P2W, crossings, UTS and Path pins)
* **E.10** (lexical and ontological discipline) and **E.19** (conformance style)
#### Coordinates with

* **G.5** (selector semantics, set-return defaults, archive semantics and report-only illumination discipline)
* **G.10** and **PTM** (publication and telemetry as external steps, not suite internals)
* **A.21 OperationalGate(profile)** and **USM.Guards** (gate-level decisions and reserved guard pins)
* **C.23 SoS‑LOG** (explicit degrade branches such as probe-only and sandbox)
#### Constrains and informs

* Constrains Part G universalization: G patterns should reference this suite for the universal CHR node set and express method and generator specifics only as (a) explicit specializations (`⊑/⊑⁺`) or (b) separate provider mechanisms connected via `Uses`.
* Informs other kits and suites: any kit or suite that materially participates in selection should provide an analogous `…SlotFillingsPlanItem` planned baseline, so that the P2W seam remains uniform and auditable.
#### Notes for Part‑G

**Tell.** This pattern is intended as a universal core anchor for the Part‑G:

* G patterns not mixing universal CHR legality mechanics with CG-frame specifics, discipline-specific method content, and packaging concerns in one construct.
* Instead, they cite `CHRMechanismSuiteDescription` (universal node set and obligations) and keep specifics in explicit specializations or separate `Uses` providers.
* P2W integration is performed uniformly via `CHRMechanismSuiteSlotFillingsPlanItem` planned baselines, preserving the rule that only WorkEnactment witnesses launch values.
### A.19.CHR:End
## Unified Normalization Mechanism (UNM)

> **Type:** Architectural (A)  
> **Status:** Stable  
> **Normativity:** Normative (unless explicitly marked informative)
> **Placement:** Part A / CN‑Spec cluster (A.19) / CHR mechanism owner patterns 
> **Semantic owner note (Phase‑3 canonicalization):** This pattern is the designated **single semantic owner** of the *meaning* of `UNM.IntensionRef` (per `E.20`). The canonical publication anchor for `UNM.IntensionRef` remains `A.19.UNM`, while `A.6.1` remains the owner of the `U.Mechanism.Intension` **template**.  
> **Non‑ownership note:** The `CN_Spec` surface itself (incl. `CN_Spec.normalization` and `CN_Spec.comparability`) remains owned by `A.19.CN`; this pattern specifies only UNM’s stable semantic surface and how UNM **consumes/interprets** the CN‑frame routing fields (no shadow CN‑spec).  
> **ID‑continuity:** legacy UNM mentions remain valid via *Tell + Cite* stubs (e.g., cite `A.19.UNM:4.1`).  
> **Canonicalization hook (Phase‑3):** Any other location that mentions UNM (including legacy “card fragments”) SHALL be reduced to *Tell + Cite* and SHALL NOT restate `SlotIndex / OperationAlgebra / LawSet / AdmissibilityConditions / Applicability / Transport / Γ_timePolicy / PlaneRegime / Audit`. This is the usability+didactic guard against “scattered semantics”.
**If someone says “we normalized”, ask (in this order):**
1) Which **`UNM_id`** (if applicable) and which **`NormalizationMethodInstanceId`** (and its validity window) was used?  
2) Which **`NormalizationInvariant[*]`** were declared (i.e., *what is preserved*)?  
3) Where are the **evidence pins** and any **transport / plane** pins (Bridge/CL/ReferencePlane + `UNM.TransportRegistryΦ/Phi` if invoked)?

**Mental model.** UNM **re‑parameterizes** a raw coordinate value (`CV`) into an `NCV` *under declared invariants* and exposes `≡_UNM` so downstream steps can be stated as “compare on invariants” *explicitly* (and audited).

### At a glance — didactic, informative

**Intent.** Provide a single, explicit normalization mechanism for **coordinate values** in a `U.CharacteristicSpace`, so that **comparability** and downstream characterization steps can be stated as “**normalize-then-compare**” (governance), rather than as hidden arithmetic inside scoring/selection.

**Where it sits.**
- **CN-frame governance card:** `CN_Spec.normalization` + `CN_Spec.comparability.mode` route whether comparison is `coordinatewise` or `normalization-based`.
- **CHR suite role:** stage `normalize` (first-stage, when enabled by the suite protocol / comparability routing).

**Key outputs.**
- `NCV` (NormalizedCharacteristicValue) values for coordinates.
- A declared congruence `≡_UNM` (equivalence) induced by a chosen normalization method instance.
- Optionally, an explicit representative selection policy (`NormalizationFixSpec`, aka “NormalizationFix” in prose) when quotient objects must be presented as concrete chart items.

**Two IDs (do not conflate).**
- `UNM_id?` selects the **UNM mechanism instance** used by this CN‑frame (a `U.Mechanism` instance of type UNM; routing/governance level).
- `NormalizationMethodInstanceId` selects the **normalization method instance** applied to specific coordinate(s), with its validity window and evidence pins (method/application level).

**Minimum declaration set (didactic).**
- In `CN_Spec.comparability`: set `mode`, and (when UNM participates in acceptance/comparison) set `minimal_evidence`.
- In `CN_Spec.normalization`: declare `UNM_id?`, `methods`, `instances`, `method_descriptions`, `invariants`, and (if representatives are required) `fix`.
- In Audit: cite the chosen `NormalizationMethodInstanceId`, `NormalizationMethodDescriptionRef.edition`, declared invariants, validity window, evidence pins, and any Bridge/CL/ReferencePlane pins (plus the edition pin `UNM.TransportRegistryΦ/Phi` when transport is invoked).

**Non-goals.**
- Not indicator selection (that is **UINDM**).
- Not scoring, aggregation, comparison, selection (USCM / ULSAM / CPM / SelectorMechanism).
- Not a data governance system: UNM is a concept-level mechanism with explicit semantic ownership and auditability.

**Single-owner note (Phase‑3 canonicalization).**
This pattern is intended to become the **single semantic owner** of the canonical `U.Mechanism.Intension` for `UNM.IntensionRef`. Other locations that currently carry UNM “card fragments” should be reduced to **Tell + Cite** stubs pointing here, preserving public IDs/anchors.
### Problem frame

FPF needs a disciplined way to talk about **measurable slots** (coordinates/scales) such that engineers can reason about:
- **What it means** to compare values across charts/slices/contexts, and
- **Where the “meaning-preserving” transformations live**, so comparisons are lawful and explainable.

In practice, teams routinely face a mismatch between:
- values that look comparable (“they’re numbers”), and  
- values that are not comparable without normalization (different units, scale types, reference planes, context semantics, or validity windows).

FPF’s CHR family explicitly separates stages (normalize → indicatorize → score → fold → compare → select). UNM is the *normalization* stage, and its job is to make “compare-on-invariants” explicit and auditable.
### Problem

Without an explicit UNM owner pattern:

1) **Normalization drifts into hidden places.** It gets embedded inside scoring, comparison, or selection, making legality and governance non-local.

2) **Comparability becomes rhetorical.** People say “we normalize” but cannot answer:  
   *Which method? Which invariants? Which validity window? Which evidence? Which transport/plane regime?*

3) **Cross-context and cross-plane slips become invisible.** Teams “reuse” normalizations across contexts without explicit Bridge/CL/ReferencePlane discipline.

4) **Engineers cannot reconstruct the mechanism.** When UNM semantics are scattered, the pattern structure (problem/forces/solution) is lost, hurting didactic use by engineering managers.
### Forces

| Force | Tension |
|---|---|
| **Evolvability vs Usability** | Stable mechanism surface ↔ method families evolve; single place to read ↔ modular wiring. |
| **Semantic precision vs Cognitive load** | Formal invariants/quotients ↔ a mechanism description that engineers can act on. |
| **Single-owner discipline vs Cross-cutting reality** | UNM touches CN/CG/transport/planes ↔ avoid “shadow specs” and duplicate centers of gravity. |
| **Trustworthiness vs Overreach** | “Normalization is legitimate” must be evidence-backed ↔ UNM must not pretend to define measurement meaning itself. |
| **Locality vs Reuse** | Normalization is context-local ↔ reuse requires explicit transport declarations (Bridge-only). |
| **Fail-closed safety vs Convenience** | Unknown/insufficient evidence must not coerce ↔ teams want “a number anyway”. |
### Solution

UNM is a `U.Mechanism` that normalizes coordinate values using declared method classes, producing:
- normalized values (`NCV`),
- an induced congruence `≡_UNM`,
- and (when needed) a representative policy (`NormalizationFix`) for quotient objects.

UNM is **not** a bag of algorithms. It is a **canonical semantic surface**:
- **Routing** lives in `CN_Spec.normalization` and `CN_Spec.comparability.mode`.
- **Evidence/calibration legitimacy** lives in `C.16 (MM‑CHR)`.
- **Method families** can be supplied by SoTA packs and wired via extensions, without mutating UNM’s surface.

#### Vocabulary (normative)

**NormalizationMethodId.** A stable token naming a normalization method *kind*, used in `CN_Spec.normalization.methods`.

**NormalizationMethod.** The method *kind* (class) that defines:
1) the **invariants** it preserves (`NormalizationInvariant[*]`),  
2) its **closure rules** (composition, and inverses where defined), and  
3) its **validity rules** (scope / context / time window constraints).

**NormalizationMethodDescription.** An editioned epistemic description of a normalization method (bounds, validity region/window, scope constraints, and evidence links owned by `C.16`).  
**NormalizationMethodDescriptionRef.** A ref to an editioned `NormalizationMethodDescription`, used in `CN_Spec.normalization.method_descriptions`.

**NormalizationMethodInstanceId.** A stable token naming a concrete, declared application of a normalization method to specific coordinate(s)/slot(s) in a host `U.CharacteristicSpace`, with a named validity window and (when required) evidence pins. Used in `CN_Spec.normalization.instances`.

**NormalizationMethodInstance.** The instance binding itself (conceptual); referenced in specs/logs/gates by `NormalizationMethodInstanceId`.

**CV (CoordinateValue).** A raw coordinate value for a **named measurable slot** in a chart: conceptually `⟨slot_id, raw_value⟩` (plus any chart/slice scoping needed by the host). UNM re‑parameterizes `CV → NCV` under declared invariants and validity constraints.

**NCV (NormalizedCharacteristicValue).** A normalized **value** for a coordinate (UNM does **not** “normalize characteristics”; it normalizes coordinate values under declared invariants).

**`≡_UNM` (UNM‑congruence).** A context‑local equivalence relation induced by a chosen `NormalizationMethodInstance`.
Two charts (or chart items/views) are `≡_UNM` iff they are related by a finite chain of admissible transformations that preserve the declared invariants.

**NormalizationInvariant.** A named invariant (e.g., unit alignment, polarity, reference plane) declared in `CN_Spec.normalization.invariants` and/or the selected `NormalizationMethodDescription`. Preserving the declared `NormalizationInvariant[*]` is the core admissibility claim for a normalization method instance.

**NormalizationFixSpec.** A declared policy selecting a canonical representative of a `≡_UNM` equivalence class when downstream consumers require a concrete chart item/view. Bound via `CN_Spec.normalization.fix` (otherwise keep quotient objects abstract).
**UNM_id.** An optional identifier in `CN_Spec.normalization.UNM_id?` selecting the UNM **mechanism instance** used by this CN‑frame. This is routing/governance; it is distinct from `NormalizationMethodInstanceId` (method/application).
**ValidityWindow.** A named validity window attached to a `NormalizationMethodInstanceId`, bounding where/when the instance is admissible (no implicit “latest”).

**`UNM.TransportRegistryΦ`.** An editioned anchor (single‑writer under UNM authoring) that enumerates the declared transport/plane pins and Φ‑penalties used when normalizations are reused across contexts/planes. Referenced via edition pins in suite/flow contracts; never re‑authored downstream.  
**Alias:** `UNM.TransportRegistryPhi` is an ASCII‑safe alias token (dock via `F.18`); it is **not** a competing head.

**Lexical guard (strict distinction).** Avoid the word **`map`** / **`mapping`** for UNM transforms (especially `Map`), because `Map` is a specialized FPF term and creates ontology drift. Prefer “normalization”, “re‑parameterization”, “transform under invariants”.
Legacy κ‑notation for normalization is retired; do not re‑introduce it.
#### UNM as a U.Mechanism.Intension (normative)

**Scope note.** This Mechanism.Intension is authored to the `U.Mechanism.Intension` **shape** owned by `A.6.1`. It defines only UNM’s stable *semantic surface*. It does **not** bind project pins (editions/policy‑ids), which belong to the P2W seam (`A.15.3` + `A.19.CHR`), and it does **not** emit `GateDecision`/`GateLog`. It may emit tri‑state `GuardDecision` and Audit pins.

**IntensionHeader**
- `IntensionId`: `UNM`
- `IntensionRef`: `UNM.IntensionRef`
- `Name`: Unified Normalization Mechanism
- `Status`: Stable
- `Version`: `v1.0`
- `SuiteRole`: CHR.normalize (when enabled by CN/CHR routing)

**Imports (cite, don’t duplicate)**
- `A.6.1` (shape: `U.Mechanism.Intension`, specialization discipline)  
- `A.6.5` (slot discipline; SlotIndex is a projection)
- `A.19.CHR:4.2` (CHR suite boundary / membership)
- `A.19.CHR:4.2.1` (CHR SlotKind Lexicon)
- `A.19.CHR:4.5` (suite protocols: ordering/optionality; suite closure)
- `A.19.CN` (CN-frame routing: `normalization`, `comparability.mode`)
- `G.0` (CG-frame legality gates where required downstream)
- `C.16` (evidence carriers; calibration/validity for normalization legitimacy)
- `A.17/A.18` (measurement meaning & scale lawfulness; not redefined here)

**SubjectBlock**
- `SubjectKind`: `NormalizationMethod classes` (with induced `≡_UNM` over charts/views)
- `BaseType`: chart/`U.CharacteristicSpace` family in a CN‑frame (one `U.BoundedContext`), where normalization acts on coordinate values (`CV`) for measurable slots (UNM normalizes **values**, not characteristics)
- `SliceSet`: `U.ContextSliceSet` (context is explicit; no implicit “global normalization”)
- `ExtentRule`: “coordinate values admitted for normalization within the declared context and the method instance validity window”
- `ResultKinds`:
  - `NormalizedCharacteristicValue (NCV)`
  - `UNM‑congruence (≡_UNM)`
  - optional quotient objects and/or `Normalization‑fixed` representatives (via `NormalizationFixSpec`)

**SlotIndex (derived projection; minimum)**
- `CharacteristicSpaceSlot : ⟨ValueKind = U.CharacteristicSpace, refMode = U.CharacteristicSpaceRef⟩`
- `CNSpecSlot : ⟨ValueKind = CN‑Spec, refMode = CNSpecRef⟩`
- `ContextSlot : ⟨ValueKind = U.BoundedContext, refMode = U.BoundedContextRef⟩`

UNM‑specific slots (must be alias‑docked into the CHR SlotKind lexicon if used across the suite):
- `NormalizationMethodInstanceSlot : ⟨ValueKind = NormalizationMethodInstanceId, refMode = ByValue⟩`
- `NormalizationMethodDescriptionSlot? : ⟨ValueKind = NormalizationMethodDescription, refMode = NormalizationMethodDescriptionRef⟩`
- `NormalizationInvariantSetSlot? : ⟨ValueKind = NormalizationInvariant[*], refMode = ByValue⟩`
- `NormalizationMethodInstancePairSlot? : ⟨ValueKind = NormalizationMethodInstanceId[2], refMode = ByValue⟩`  *(used only by `compose`; roles = {inner, outer})*
- `CoordinateValueSlot : ⟨ValueKind = CV, refMode = ByValue⟩`
- `NCVSlot : ⟨ValueKind = NCV, refMode = ByValue⟩`
- `UNMCongruenceSlot : ⟨ValueKind = UNM‑congruence (≡_UNM), refMode = ByValue⟩`
- `NormalizationFixSlot? : ⟨ValueKind = NormalizationFixSpec, refMode = ByValue⟩`

**Authoring note (didactic).** `NormalizationMethodDescriptionSlot`, `NormalizationInvariantSetSlot`, and `NormalizationFixSlot` are typically *resolved/derived* from `CN_Spec.normalization.{method_descriptions,invariants,fix}` plus the selected `NormalizationMethodInstanceId`. They are listed here because they participate in eligibility/audit semantics — not because every operation takes them as explicit inputs.

**Note (transport anchor, not a SlotKind).** When transport/plane reuse is invoked, Audit MUST cite the edition pin key `UNM.TransportRegistryΦ` (aka `UNM.TransportRegistryPhi`) in the editions vector (see Transport/Audit), rather than introducing an ad‑hoc `…Ref` kind.

**OperationAlgebra (conceptual)**
1) `apply`
- Preconditions: `UNM_Eligibility(…) ∈ {pass, degrade}` (fail‑closed; `abstain` ⇒ no NCV output).
- Inputs: `NormalizationMethodInstanceSlot`, `CoordinateValueSlot`, `CharacteristicSpaceSlot`, `CNSpecSlot`, `ContextSlot`
- Outputs: `NCVSlot` (+ availability of `UNMCongruenceSlot` for the same method instance)

2) `compose`
- Purpose: build a composed method (only when explicitly declared lawful).
- Inputs: `NormalizationMethodInstancePairSlot` (roles = {inner, outer}), `ContextSlot`
- Output: `NormalizationMethodInstanceSlot` (new composed `NormalizationMethodInstanceId`), with an explicit validity window and evidence pins.

3) `quotient(≡_UNM)`
- Inputs: `CharacteristicSpaceSlot` (or chart view), `NormalizationMethodInstanceSlot`
- Output: quotient object under `UNMCongruenceSlot`  
  (When a concrete representative is required, `NormalizationFixSlot` (`NormalizationFixSpec`) must be declared and used.)

**LawSet (UNM laws; identifiers are stable)**
- **UNM‑L0 (Values, not characteristics).** UNM produces `NCV` as a **value** under declared invariants; it does not redefine the underlying characteristic meaning (measurement meaning remains owned by A.17/A.18 and evidence by C.16).
- **UNM‑L1 (Declared method class gate).** A normalization method instance is admissible only if its method is declared in the allowed method class set: `{ratio:scale, interval:affine, ordinal:monotone, nominal:categorical, tabular:LUT(+uncertainty)}`.
- **UNM‑L1a (Method semantics live in the method).** `NormalizationMethod` defines invariants, closure (composition / inverses where defined), and validity rules. UNM consumes these declarations; it does not invent “extra” legality.
- **UNM‑L2 (Congruence is first-class).** Each chosen method instance induces `≡_UNM` over charts/views; equality/comparability decisions that rely on normalization are defined on the quotient (or on a declared fix), not on raw labels.
- **UNM‑L2a (Context-local by default).** `≡_UNM` is context‑local; cross‑context reuse requires explicit transport declarations (Bridge-only).
- **UNM‑L3 (Fail‑closed).** If admissibility/evidence is insufficient (or required inputs are missing/stale), UNM does not silently coerce; it yields `abstain` or `degrade` (tri‑state guard discipline) and may surface an explicit freshness/work request (see A.19.UNM:4.5).  
  *Didactic reading:* `abstain` ⇒ no lawful NCV/comparability for this slice; `degrade` ⇒ NCV may be produced but must be treated as policy‑gated and auditable (never “quietly good enough”).
- **UNM‑L4 (No implicit indicatorization).** `NCV` does not imply “indicator”; indicator status is a separate policy step (UINDM).
- **UNM‑L5 (Bridge‑only transport).** Cross‑context reuse of normalization requires explicit Bridge-only transport declarations (Bridge id + channel + `ReferencePlane(src,tgt)`); describedEntity changes require a KindBridge (`CL^k`) and the two‑bridge rule. Penalties route to the **R‑lane only** (never to F/G; if scalarized, into `R_eff`).
- **UNM‑L6 (Time explicitness).** Validity windows are named; no implicit “latest”.
- **UNM‑L7 (Auditability).** The applied method instance, invariants, validity window, evidence pins, and any transport/plane declarations must be auditable as refs/pins.
- **UNM‑L8 (No shadow writers).** When UNM publishes/updates editioned anchors used downstream (e.g., `UNM.TransportRegistryΦ`), other patterns and faces treat them as **ref‑only** (single‑writer discipline; no competing centers of gravity).
- **UNM‑L9 (No publish/telemetry ops).** UNM defines no publish/telemetry step. Any publication/telemetry is out of suite closure and does not mutate UNM semantics (`NCV`, `≡_UNM`, quotient/fix); only Audit pins are produced here.

**AdmissibilityConditions**
Definition (UNM‑Eligibility):
`UNM_Eligibility(NormalizationMethodInstanceSlot, CoordinateValueSlot, CharacteristicSpaceSlot, CNSpecSlot, ContextSlot) → GuardDecision`
where `GuardDecision ∈ {pass | degrade | abstain}` and follows this predicate semantics:
- **pass** iff all of the following hold:
  - (**CN‑frame binding**) the selected `NormalizationMethodInstanceId` is declared in `CN_Spec.normalization.instances` (or an equivalent declared surface), its method kind is included in `CN_Spec.normalization.methods`, and (if present) it satisfies `normalization.admissible_reparameterizations`;
  - (**Target coordinate binding**) the input `CV`’s `slot_id` belongs to the method instance’s declared bound coordinate set;
  - (**Scale‑regime compatibility**) the method kind is compatible with the coordinate’s regime (`ratio:scale | interval:affine | ordinal:monotone | nominal:categorical | tabular:LUT(+uncertainty)`) and preserves the declared `NormalizationInvariant[*]` (from `CN_Spec.normalization.invariants` and/or the method description);
  - (**Validity window**) the method instance’s validity window covers the active slice/time policy (no implicit “latest”);
  - (**Evidence sufficiency when routed into governance**) when `comparability.mode = normalization-based` (or downstream uses `NCV` in gated decisions), the method instance’s evidence pins satisfy `CN_Spec.comparability.minimal_evidence` (structure typically gated by `G.0`; evidence semantics owned by `C.16`).
- **degrade** iff all non‑evidence conditions above hold, but the evidence check does not pass and the declared failure behavior permits producing a policy‑gated degraded `NCV` rather than abstaining.
- **abstain** otherwise (including missing binding, coordinate mismatch, out‑of‑window validity, or evidence failure when the declared failure behavior is abstain).

**Applicability**
UNM is applicable when:
- `CN_Spec.comparability.mode = normalization-based`, or
- a declared downstream step requires “compare-on-invariants” and thus requires explicit normalization.
UNM is typically skipped when `comparability.mode = coordinatewise` (unless an explicit downstream step requires a declared quotient/fix anyway).

**Transport**
- **Bridge-only.** Any cross-context use must be expressed via explicit Bridge pins and recorded in Audit.
- If the describedEntity changes, a KindBridge (`CL^k`) must be declared (two‑bridge rule).
- If transport/plane reuse is invoked, the edition pin key `UNM.TransportRegistryΦ` (aka `UNM.TransportRegistryPhi`) MUST be cited explicitly (in addition to Bridge/CL/ReferencePlane pins); penalties remain R‑lane only.

**Γ_timePolicy**
- Default: `point` (no implicit “latest”).
- If normalization relies on time windows, the validity window is part of the method instance and must be declared.

**PlaneRegime**
- Normalized values live on the episteme ReferencePlane by default.
- Plane crossings require explicit `CL^plane` and are audited; penalties route to `R_eff` only.

**Audit**
Audit records MUST include:
- `CNSpecRef.edition` + `comparability.mode`
- (when present) `CN_Spec.normalization.UNM_id` (the selected UNM mechanism instance id for this CN‑frame)
- chosen `NormalizationMethodInstanceId`, its validity window, and any `NormalizationMethodDescriptionRef.edition`
- declared `NormalizationInvariant[*]` and `NormalizationFixSpec` (if used)
- any declared admissible re‑parameterizations (if present in `CN‑Spec.normalization`)
- all evidence pins (as declared by the instance) and their scope ids
- any Bridge/CL/ReferencePlane pins if transport or plane crossings are invoked, plus the edition pin key `UNM.TransportRegistryΦ/Phi`
- any emitted `FreshnessRequest` / work request identifiers (when applicable; see A.19.UNM:4.5)
#### CN-frame wiring: normalization and comparability routing (normative-by-reference)

**Tell.** CN-frame does not “do normalization”; it **routes** normalization.  
- `comparability.mode ∈ {coordinatewise, normalization-based}` governs whether comparisons are done directly or “normalize-then-compare”.  
- `normalization.UNM_id?` selects the UNM mechanism instance used by this CN-frame.  
- `normalization.methods / instances / method_descriptions / invariants / fix` provide the declared surface that UNM consumes.  
(If present) `normalization.admissible_reparameterizations` constrain which re‑parameterizations count as “admissible” under the declared invariants.  
(See CN-frame definition in `A.19.CN`; `A.19.CN` remains the semantic owner of the CN-frame surface. This section only states the UNM consumption/interpretation constraints and does not introduce a shadow spec.)
#### Evidence and calibration are owned by MM‑CHR (normative-by-reference)

UNM does not claim “this normalization is legitimate” by decree.  
Instead, legitimacy is routed through evidence carriers and calibration/validity artifacts owned by `C.16 (MM‑CHR)` and referenced from the chosen `NormalizationMethodInstance`.
#### Didactic rule: quotients or fixes, never “labels” (normative)

When UNM is used to support comparability/acceptance:
- Think in **invariants and equivalence classes** (quotients), not in labels.  
- If a concrete representative is needed, declare a `NormalizationFix` explicitly.  
Do not silently treat an arbitrary representative as canonical.
#### P2W / TGA integration note (normative-by-reference)

When UNM is used inside transduction flows/graphs (e.g., `E.18 (E.TGA)`):
- UNM occurs **before** selection/decision steps.
- If required measurements are **missing or stale**, UNM does not “guess a number”; it surfaces an explicit **freshness/work request** that must be planned in `U.WorkPlanning` and executed in `U.WorkEnactment`.
- In TGA terms, transport/plane reuse is surfaced as explicit calibration/transport artifacts pinned to `TransportRegistry^Φ` (editioned as `UNM.TransportRegistryΦ`; penalties stay R‑lane only).
- Editioned anchors referenced by faces downstream (e.g., `UNM.TransportRegistryΦ`, and legality anchors when applicable) remain **single‑writer**: downstream consumers cite them as refs and do not re‑author them.
### Archetypal Grounding (Tell–Show–Show)

**Tell.** UNM is the conceptual “front gate” that turns “raw coordinate values” into “values comparable under declared invariants”, by:
1) choosing an admissible normalization method instance (with evidence and validity window),  
2) applying it to produce NCVs,  
3) exposing `≡_UNM` and (optionally) quotient/fix structure so downstream mechanisms can remain lawful and explicit.

**Show (System).** A team compares alternatives using `normalization-based` comparability:
- CN-Spec declares:
  - `comparability.mode = normalization-based`
  - `normalization.invariants = {unit-alignment, polarity}`
  - a method instance `M_unitScale` with validity window `VW_2026Q1` and evidence pins.
- UNM applies `M_unitScale` to each coordinate value, producing NCVs.
- CPM compares the NCV-profiles (not raw profiles).
- If evidence pins are missing for a slice, UNM returns `GuardDecision = abstain`, preventing “fake comparability”.

**Show (Episteme).** Quotient thinking:
- Two chart items `x` and `y` are different raw values (different units or reference planes).
- Under a chosen normalization method instance, `x ≡_UNM y` holds.
- Comparability claims are made over `[x]_{≡_UNM}` and `[y]_{≡_UNM}` (equivalence classes).
- If reporting needs a single representative, a declared `NormalizationFix` selects it; otherwise, do not pretend a representative is canonical.

**Show (P2W / TGA).** Missing/stale inputs:
- A selector (or comparator) requires comparability under `normalization-based` mode.
- UNM finds that a required coordinate value is missing/stale for the current slice and the instance validity window.
- UNM returns `GuardDecision = abstain` (fail‑closed) **and** emits a `FreshnessRequest` that must be handled via planned baseline + enactment (UNM does not silently proceed).
### Bias‑Annotation

Common cognitive traps around normalization:
- **Normalization-as-truth bias:** treating NCVs as “objective” instead of “objective under declared invariants and validity window”.
- **Hidden-steps bias:** assuming normalization “happened somewhere” and skipping explicit routing/pins.
- **Unit-blindness:** treating numeric sameness as semantic sameness.
- **Proxy legitimacy:** assuming a popular method is legitimate without evidence pins or validity region.

Mitigation: enforce explicit `NormalizationMethodInstance` + validity window + evidence pins; and keep `≡_UNM`/quotient semantics explicit.
### Conformance Checklist

- [ ] **Template compliance:** canonical E.8 sections 1–13 present in order; pattern ends with `### A.19.UNM:End`.
- [ ] **Terminology:** uses `NormalizationMethodId`, `NormalizationMethodInstanceId`, `NormalizationMethodDescription(Ref)`, `CV`, `NCV`, `≡_UNM`, `NormalizationInvariant[*]`, `NormalizationFixSpec`; avoids “map” wording (esp. `Map`); κ‑notation is retired.
- [ ] **CN routing:** uses `CN_Spec.comparability.mode` and the `CN_Spec.normalization` surface; does not embed “shadow CN-spec”.
- [ ] **Fail-closed:** eligibility is tri-state and never coerces unknown to pass.
- [ ] **Legality classes declared:** method class is one of `{ratio:scale, interval:affine, ordinal:monotone, nominal:categorical, tabular:LUT(+uncertainty)}` and the instance’s validity window is named.
- [ ] **No indicator conflation:** does not treat NCV as automatically implying indicator status.
- [ ] **Transport discipline:** cross-context/plane reuse is Bridge-only, explicit, audited; penalties route to `R`/`R_eff` only.
- [ ] **Quotient/fix discipline:** if a representative is required, `NormalizationFix` is declared; otherwise quotient semantics remain abstract.
- [ ] **Auditability:** method instance, validity window, evidence pins, and transport/plane policies are recorded as refs/pins.
- [ ] **No shadow writers:** if editioned transport/calibration anchors are used (e.g., `UNM.TransportRegistryΦ`), downstream consumers treat them as ref‑only (single‑writer discipline).
- [ ] **P2W awareness (when used in flows):** missing/stale inputs lead to explicit `FreshnessRequest` emissions (planned via P2W), not silent coercion.
- [ ] **SlotKind discipline:** SlotKind tokens reuse the CHR SlotKind lexicon where applicable; UNM‑specific SlotKinds are docked into the suite lexicon before use (no ad‑hoc drift).
- [ ] **TransportRegistry key discipline:** `UNM.TransportRegistryΦ` (alias `UNM.TransportRegistryPhi`) is referenced as an edition pin key (and audited) / `TransportRegistry^Φ` in TGA terms, not introduced as a new `…Ref` kind.
### Common Anti‑Patterns and How to Avoid Them

1) **Hidden normalization inside scoring or selection**  
   Avoid by routing via `CN_Spec.comparability.mode` and explicit UNM use.

2) **“NCV ⇒ indicator” shortcut**  
   Avoid by treating indicatorization as UINDM policy, not a byproduct of normalization.

3) **“We normalized” without declaring invariants**  
   Avoid by naming `NormalizationInvariant[*]` and exposing `≡_UNM`.

4) **Cross-context reuse without transport declaration**  
   Avoid by Bridge-only transport and auditing Bridge/CL/ReferencePlane pins.

5) **Choosing a representative implicitly**  
   Avoid by either keeping quotient objects abstract or declaring `NormalizationFix`.

6) **Using “map/mapping/Map” language as if it were harmless**  
   Avoid by using “normalization / re‑parameterization under invariants” and by keeping `Map` for its specialized FPF meaning.

7) **Treating UNM outputs as globally comparable across contexts/planes**  
   Avoid by Bridge-only transport declarations + audited ReferencePlane/CL pins; otherwise stay context-local and fail‑closed.

8) **Re‑authoring editioned transport/calibration anchors downstream**  
   Avoid by treating `UNM.TransportRegistryΦ` (and similar anchors) as single‑writer artifacts: downstream is ref‑only.
### Consequences

**Benefits**
- Makes “normalize-then-compare” a first-class governance choice.
- Centralizes semantic ownership, improving usability and reducing drift.
- Supports evolvability: method families can evolve via packs/extensions without mutating the mechanism surface.
- Prevents silent illegality (unit/scale/plane errors) by fail-closed guards.

**Costs**
- Requires explicit declarations (method instance, invariants, validity window, evidence pins).
- Some workflows must learn quotient/fix thinking (a conceptual overhead).
### Rationale

UNM is designed as a **minimal canonical semantic surface**:
- Enough structure to prevent illegal comparisons and hidden transformations.
- Explicit routing in CN-frame so normalization is governance, not an algorithmic trick.
- Evidence/calibration are delegated to MM‑CHR to avoid redefining measurement meaning.
- Bridge-only transport prevents accidental “global normalization” across contexts.

This balances evolvability (methods evolve) with didactic usability (one place to read what UNM is).
### SoTA‑Echoing (post‑2015 practice alignment)

UNM does not prescribe algorithms, but it is designed to **host** SoTA normalization families via `NormalizationMethodDescriptionRef` + evidence pins (typically shipped as `G.2` SoTA packs and wired via `GPatternExtension` modules, not as mutations of UNM’s surface). Examples of post‑2015 method families that often appear as evidence-backed normalization candidates (domain-dependent):
- **SoTA ≠ popular.** Method families enter UNM through `G.2` claim structures + edition pins + evidence pins; “widely used” is not a validity claim by itself.
- **Calibration of probabilistic coordinates** (e.g., temperature scaling; multiclass calibration families such as Dirichlet calibration).  
  *Typical citations:* Guo et al., 2017; Kull et al., 2019.
- **Shift-/validity-region-aware normalization** where “validity window/region” is explicit and shift detection enters as *evidence*, not as hidden branching.  
  *Typical citations:* Lipton et al., 2018 (shift estimation); Ovadia et al., 2019 (uncertainty under shift) — as evidence motifs.
- **Order-preserving transforms** for ordinal regimes (normalization constrained to monotone transforms; legality forbids arithmetic).  
  *Typical citations:* modern monotonic modeling toolkits (post‑2017) used as *method families*, not as silent arithmetic.
- **Set-valued / uncertainty-aware normalization outputs** where uncertainty is preserved as a first-class outcome (tri‑state guards + set-valued artifacts, rather than coerced point values).  
  *Typical citations:* conformal-style families (post‑2018+) used as evidence/uncertainty carriers.

SoTA is connected as **wiring** (packs/extensions) while UNM’s surface remains stable.
### Relations

**Builds on / cites**
- `E.8` (pattern template)
- `E.20` (single‑owner discipline for mechanism‑intension content)
- `A.15.3` (P2W planned baseline seam, when UNM is used in flows)
- `F.18` (alias docking / token continuity, when renaming or retiring legacy UNM tokens)
- `A.6.1` (U.Mechanism.Intension shape; specialization discipline)
- `A.19.CHR` (CHR suite boundary; slot lexicon; suite protocols)
- `A.19.CN` (CN_Spec normalization + comparability routing)
- `C.16` (MM‑CHR evidence/calibration carriers)
- `G.0` (CG-frame legality gates used downstream)
- `G.2` (SoTA synthesis packs as the method‑family ingress; wiring‑only integration)
- `E.18 (E.TGA)` (when UNM is used in transduction flows/graphs; P2W freshness/work routing)
- `B.3` (congruence/quotient intuition, when referenced)

**Used by**
- CHR suite protocols (normalize stage), when `comparability.mode` requires normalization-based comparability.
### A.19.UNM:End
## Unified Indicatorization Mechanism (UINDM)

> **Type:** Architectural (A)
> **Status:** Stable
> **Normativity:** Normative (unless explicitly marked informative)
> **Placement:** Part A / CN‑Spec cluster (A.19) / CHR mechanism owner patterns (Phase‑3)
> **Source:** FPF / CHR Phase‑3 mechanism owner patterns
> **Modified:** 2026‑01‑19
>
> **Semantic owner note (Phase‑3 canonicalization):** this pattern is the **designated single semantic owner** of the canonical `U.Mechanism.Intension` for `UINDM.IntensionRef` (CHR suite stage `indicatorize`). This matches the “single‑owner route map” discipline: mechanism‑intension semantics live in `A.19.<MechId>.
> `A.6.1` remains the owner of the **template** of `U.Mechanism.Intension`.
>
> **Canonicalization hook (ID‑continuity‑safe):** any other appearances of the UINDM intension (e.g., a legacy grounding stub in `A.6.1` or suite prose in `A.19.CHR`) SHALL be reduced to a **Tell + Cite** stub pointing to **`A.19.UINDM:4.1`**, while preserving the original section headings and their public `PatternId:SectionPath` IDs for continuity (alias‑dock legacy tokens rather than deleting them).
> Such stubs MUST NOT restate SlotIndex / LawSet / Admissibility content (no “second center of gravity” via near‑duplicate prose).

### At a glance (didactic, informative)

* **Suite stage:** `indicatorize` (ordering lives only in `A.19.CHR:suite_protocols`).
* **Inputs (conceptual):** host `U.CharacteristicSpaceRef` + `CNSpecRef` + `IndicatorChoicePolicyRef` + `U.BoundedContextRef`,
  with optional `CGSpecRef` (+ optional `MinimalEvidenceRef` override) when the chosen policy is evidence‑gated.
* **Output:** `IndicatorSetSlot` = a set of `U.CharacteristicRef` (chosen coordinates), not measurements.
* **Non‑goals:** does **not** normalize, score, compare, aggregate, threshold, publish, or emit telemetry; it only selects a subset under explicit policy.
* **P2W seam:** concrete edition/policy pins are bound in planned baseline artefacts (`A.15.3` + `A.19.CHR:4.7.2`); executions only record effective refs/pins in `Audit`.
* **Failure mode:** tri‑state guard (`pass|degrade|abstain`); unknown never coerces to `pass`.
* **Quick rule of thumb:** if `CN‑Spec.indicator_policy` is absent → `IndicatorizeEligibility = abstain` (fail‑closed); if the selected policy is evidence‑gated → `CGSpecRef` MUST be available and the effective MinimalEvidence MUST be explicit (override or `CG‑Spec.MinimalEvidence`).
### Problem frame

FPF’s Characterization (CHR) suite treats indicatorization as a **distinct mechanism boundary** within the CHR suite (authoritative membership: `A.19.CHR:4.2`).
Suite membership is a **set** (order has no semantics); any intended ordering is expressed only via `suite_protocols` (`A.19.CHR:4.5`), under the suite obligations (`A.19.CHR:4.3`).

Within the canonical suite‑closed protocol, UINDM appears as the `indicatorize` stage (after `normalize`, before `score/compare/select`; optional stages remain explicitly optional per `suite_protocols`).

UINDM’s job is concept‑level and contract‑bound: it selects an **indicator subset** over an existing `U.CharacteristicSpace` under `CN‑Spec.indicator_policy`, using the suite‑wide SlotKind lexicon to prevent SlotKind drift across the CHR ladder and across SoTA wiring layers.
A “subspace view” (if needed) is treated as a **derived artefact** from the chosen set (see `A.19.UINDM:4.2`), not as an extra mandatory output of the kernel signature.
### Problem

Engineering teams routinely need to decide “which characteristics count as indicators” for a CN‑frame—before they can score, compare, aggregate, or select. If indicatorization is not given a **first‑class mechanism boundary**, several failure modes emerge:

* **Hidden indicatorization:** downstream mechanisms (scoring/comparison/selection) implicitly decide which characteristics matter, making the CHR pipeline opaque and hard to audit. 
* **NCV conflation:** measurability (or “having an NCV”) is treated as sufficient to be an indicator, collapsing the crucial distinction between “measurable characteristic” and “indicator chosen under policy.” 
* **Drift and non‑determinism:** indicator sets vary between teams and contexts without stable edition pins, making comparisons and decisions irreproducible. 
* **Silent evidence coercion:** missing/unknown evidence is implicitly treated as acceptable (“pass”) or collapsed to an empty set, degrading decision quality without visibility.
### Forces

1. **Policy primacy vs method freedom.** Indicatorization must be governed by explicit `IndicatorChoicePolicy`, while still allowing multiple method families (e.g., theory‑first, invariance‑driven, evidence‑gated) to be wired later without mutating the mechanism’s signature.

2. **Selection‑only vs “semantic alchemy.”** UINDM must not smuggle normalization, scaling, polarity flips, aggregation, or scoring inside “indicator choice.” It is a selection mechanism over the host basis, not a transformation mechanism. 

3. **Context locality vs cross‑context reuse.** Indicatorization is slice‑bound; cross‑context indicatorization is permitted only when an explicit `Transport` clause (Bridge+CL/ReferencePlane) is present—otherwise implicit crossings destroy semantic precision. 

4. **Auditability vs authoring overhead.** Engineer‑managers need to see *why* an indicator set was chosen and *which editions/policies* were in effect, but FPF stays conceptual (no data governance, no tool‑enforced metadata). Audit obligations must therefore be minimal yet decisive. 

5. **Evolvability vs didactic usability.** CHR mechanisms must remain evolvable (stable slot lexicon; method specifics in SoTA packs / wiring), while the spec must remain teachable: a reader should find UINDM’s purpose, boundary, laws, guard behavior, and audit obligations in one place.

6. **Fail‑closed discipline.** Unknown/insufficient evidence must never be coerced into “pass”; tri‑state guards (`pass|degrade|abstain`) are required to preserve correctness under uncertainty. 

7. **P2W separation and gate/guard separation.** UINDM must expose eligibility and audit pins without turning into (i) a WorkPlanning baseline binder or (ii) a legality gate:
   planned slot fillings belong to P2W artefacts (WorkPlanning), while GateDecision/GateLog live in gate patterns / WorkEnactment (suite protocols remain mechanism‑steps only).
### Solution

UINDM is the **canonical indicatorization mechanism** in the CHR suite. It defines:

* a stable **mechanism boundary** (“indicatorize” is a stage with its own operation and eligibility predicate),
* a stable **SlotKind surface** (via the suite lexicon),
* a strict **selection‑only law set** (no implicit UNM; no unit/scale/polarity changes),
* a **tri‑state admissibility guard** (fail‑closed on missing policy, legality, or evidence), and
* an **audit minimum** (edition pins + crossing policy ids when transport occurs).

UINDM also preserves the CHR suite obligations by construction: it does not embed GateDecision/GateLog, it does not perform publish/telemetry steps, and it keeps Transport declarative (refs/pins only).

Method semantics (“how to pick indicators”) remain out of suite core: they belong in SoTA packs (`G.2`) and wiring‑only extension modules (`GPatternExtension` blocks), while UINDM remains the stable mechanism boundary.

#### Mechanism.Intension (normative)

This is the canonical `U.Mechanism.Intension` for `UINDM.IntensionRef` and is intended to be cited by CHR suite artifacts and by any wiring layers.

* **Scope note:** this intension is an **instance** authored to the `U.Mechanism.Intension` shape owned by `A.6.1`. It defines only the mechanism’s semantic surface (slots/ops/laws/guards/audit). It does **not** bind project‑specific pins (P2W), and it does **not** emit GateDecision/GateLog; it emits `Audit` pins and a tri‑state guard only.
* **IntensionHeader:** `id = UINDM`, `version = 1.0.0`, `status = stable`.
* **IntensionRef:** `UINDM.IntensionRef` (canonical target for the suite member named in `A.19.CHR:4.2`).
* **Tell.** Policy‑bound indicatorization: select an indicator subset over an existing `U.CharacteristicSpace` under `CN‑Spec.indicator_policy`.
* **Purpose:** freeze a policy‑bound indicator subset early so downstream CHR mechanisms can assume a declared indicator profile (or explicitly `degrade/abstain`) rather than silently “choosing indicators” inside scoring/comparison/selection.
* **Imports:** `A.19.CN (CN‑Spec.indicator_policy)`, `A.6.5 (slot discipline)`, `A.19.CHR:4.2.1 (CHR SlotKind Lexicon)`, and (when evidence‑gated) `G.0 (CG‑Spec.MinimalEvidence)`.
* **SubjectBlock:**

  * **SubjectKind:** `Indicatorization`.
  * **BaseType:** `U.CharacteristicSpace`.
  * **SliceSet:** `U.ContextSliceSet`.
  * **ExtentRule:** indicatorization ranges over the host basis `CNSpecSlot.cs_basis` (within `CNSpecSlot.chart`) for the active Context slice; it never enlarges the host basis.
  * **ResultKind?:** `U.Set`.
* **SlotIndex** (derived projection from `SlotSpecs` / guard SlotSpecs; uses `A.19.CHR:4.2.1` SlotKind tokens; no independent semantics):

  * `CharacteristicSpaceSlot : ⟨ValueKind = U.CharacteristicSpace, refMode = CharacteristicSpaceRef⟩`,
  * `CNSpecSlot : ⟨ValueKind = CN‑Spec, refMode = CNSpecRef⟩`,
  * `IndicatorChoicePolicySlot : ⟨ValueKind = IndicatorChoicePolicy, refMode = IndicatorChoicePolicyRef⟩`,
  * `ContextSlot : ⟨ValueKind = U.BoundedContext, refMode = U.BoundedContextRef⟩`,
  * `CGSpecSlot? : ⟨ValueKind = CG‑Spec, refMode = CGSpecRef⟩` (optional; REQUIRED iff the chosen `IndicatorChoicePolicy` is evidence‑gated),
  * `MinimalEvidenceSlot? : ⟨ValueKind = MinimalEvidence, refMode = MinimalEvidenceRef⟩` (optional override; if evidence‑gated and omitted, the effective MinimalEvidence is `CGSpecSlot.MinimalEvidence`),
  * `IndicatorSetSlot : ⟨ValueKind = U.Set (of U.CharacteristicRef), refMode = ByValue⟩`.
* **OperationAlgebra** (suite stage = `indicatorize`, per `A.19.CHR:4.5`; canonical stage‑op = `Indicatorize`):

  * `Indicatorize(CharacteristicSpaceSlot, CNSpecSlot, IndicatorChoicePolicySlot, ContextSlot, CGSpecSlot?, MinimalEvidenceSlot?) → IndicatorSetSlot`.
* **LawSet** (CHR‑lawful indicatorization):

  1. **Selection‑only:** `Indicatorize` MUST NOT alter units/scales/polarities; it only selects a subset (no implicit `UNM`).
  2. **Host‑basis restriction:** the resulting set MUST be a subset of the declared host basis (as constrained by `CNSpecSlot.cs_basis` / `CNSpecSlot.chart`).
  3. **No implicit NCV⇒indicator:** measurability/NCV is not sufficient; indicators exist only via `IndicatorChoicePolicySlot` (cites `A.19.CN` `indicator_policy`).
  4. **Edition‑determinism (with slice locality):** for fixed editions of all **ByRef** inputs (`CharacteristicSpaceRef`, `CNSpecRef`, `IndicatorChoicePolicyRef`, and—when evidence‑gated—`CGSpecRef` plus optional `MinimalEvidenceRef`) and a fixed active Context slice, the `IndicatorSetSlot` result is stable.
  5. **No silent evidence coercion:** if evidence is insufficient/unknown under the chosen policy, the result MUST NOT be “silently emptied” nor silently treated as “pass”; use tri‑state guards.
* **AdmissibilityConditions** (tri‑state guard; fail‑closed on missing legality/evidence):

  * `IndicatorizeEligibility(CharacteristicSpaceSlot, CNSpecSlot, IndicatorChoicePolicySlot, ContextSlot, CGSpecSlot?, MinimalEvidenceSlot?) → GuardDecision ∈ {pass|degrade|abstain}`.
  * `pass` requires: (i) `CNSpecSlot.indicator_policy` is present, (ii) `IndicatorChoicePolicySlot` is consistent with that policy reference (same `…PolicyRef` + edition pins), and (iii) `CharacteristicSpaceSlot` matches the host basis implied by `CNSpecSlot` (within the active chart and Context slice).
  * If the chosen `IndicatorChoicePolicy` is evidence‑gated:
    (i) `CGSpecSlot` MUST be present,
    (ii) define `EffectiveMinimalEvidence := (MinimalEvidenceSlot if present, else CGSpecSlot.MinimalEvidence)`,
    and (iii) insufficient/unknown evidence MUST yield `degrade` or `abstain` per the **effective** failure‑behavior policy (never a silent `pass`).
  * If the chosen `IndicatorChoicePolicy` is **not** evidence‑gated, absence of `MinimalEvidenceSlot` MUST NOT affect eligibility; no accidental “always‑evidence‑gated” behavior is permitted.
* **Applicability:**
  * Intended to be used before any scoring/comparison/selection that assumes an indicator profile, while remaining a distinct step (no hidden indicatorization inside downstream mechanisms).
  * Cross‑context indicatorization is allowed only via an explicit `Transport` clause.
  * Pin‑binding note: choosing concrete policy editions/pins is a planned baseline concern (P2W); UINDM only consumes those refs and records the effective ones in `Audit`.
* **Transport:** declarative Bridge+CL/ReferencePlane only (refs/pins; do not restate CL ladders or Φ tables here); penalties route to **`R_eff` only**.
* **Γ_timePolicy:** `point` by default (no implicit “latest”).
* **PlaneRegime:** values live on the episteme `ReferencePlane` (the `IndicatorSetSlot` is a set of references into the host basis); UINDM does not introduce plane shifts.
  When the indicatorization outcome is used across planes, apply **CL^plane** by explicit policy and route penalties → **`R_eff` only**.
* **Audit:**

  * MUST record: `CharacteristicSpaceRef.edition`, `CNSpecRef.edition`, `IndicatorChoicePolicyRef.edition`.
  * When evidence‑gated, MUST record: `CGSpecRef.edition` and effective MinimalEvidence (`MinimalEvidenceRef` when provided; otherwise `CGSpecSlot.MinimalEvidence`).
  * SHOULD record: the realized `GuardDecision` (`pass|degrade|abstain`) and, when non‑`pass`, the policy‑bound failure behavior reference that justified it.
  * SHOULD record: a stable description of `IndicatorSetSlot` (or an id reference to a **citable** indicator‑set artefact), and any Bridge/CL/ReferencePlane ids when `Transport` was invoked.
#### Interpretation notes (informative)

* **IndicatorSet is a set of references, not values.** `IndicatorSetSlot` contains `U.CharacteristicRef` tokens; it does not compute measurements. The move from “chosen indicators” to “measured indicator profile” is performed downstream (e.g., via scoring/comparison), not by UINDM. 

* **Subspace views are derived, not mandatory.** If a project needs an explicit subspace view, treat it as a derived artefact `CS|_S` where `S = IndicatorSetSlot` over the host `CS = CharacteristicSpaceSlot`. Do not add a new mandatory output to the kernel signature; model a first‑class subspace artefact via `⊑⁺` only when it is genuinely needed.

* **Justification is optional and externalized.** The CHR SlotKind lexicon includes `JustificationSlot`, but the canonical UINDM intension does not require it.
  If a project needs a first‑class justification output, treat it as an **extension** (`⊑⁺`) rather than by mutating the base `Indicatorize` signature,
  and model the justification as an episteme artefact (e.g., `JustificationSlot : ⟨ValueKind = U.Episteme, refMode = U.EpistemeRef⟩`).

* **Evidence‑gated indicatorization is explicit.** Evidence gating is *not* default: it is activated only when the chosen `IndicatorChoicePolicy` is evidence‑gated, in which case `CGSpecSlot` and `MinimalEvidenceSlot` become required inputs to avoid “silent passes.”
### Archetypal Grounding (informative)

#### Tell

Think of UINDM as a **policy‑bound projection**:

* Input: “the whole declared characteristic basis of a CN‑frame (in this context slice) + an explicit indicator choice policy”
* Output: “the subset of characteristic references that are allowed to count as indicators for downstream CHR steps”

The key didactic boundary is: **UINDM chooses coordinates; it does not alter coordinates.**
#### Show (U.System) — cross‑unit engineering dashboard

A program manager maintains a `U.CharacteristicSpace` for manufacturing sites, including ~30 characteristics (quality, safety, cost, throughput, sustainability).

* The CN‑Spec’s `indicator_policy` for the “weekly executive dashboard” selects a subset:
  `{DefectRate, IncidentRate, UnitCost, LeadTime, EnergyPerUnit, OnTimeDelivery}`.
* UINDM runs `Indicatorize(...)` and outputs `IndicatorSetSlot =` those references.
* One site lacks reliable incident reporting for the last week. The indicator policy is evidence‑gated; `IndicatorizeEligibility` returns `degrade` (not `pass`), and the audit records the effective MinimalEvidence and the edition pins used.

Downstream mechanisms can now be held to the invariant: **they may only score/compare/select using the declared indicator profile (or explicitly abstain/degrade).** This avoids “dashboard drift” where different teams silently score on different subsets.
#### Show (U.Episteme) — robust evaluation across environments

A research lead wants indicators for model robustness under distribution shift (different hospitals, sensors, geographies).

* The host characteristic basis includes many candidate metrics (accuracy slices, calibration, subgroup error, OOD detection quality).
* The indicator choice policy is “invariance‑driven”: prefer indicators whose semantics remain stable under environment changes; deprioritize proxy metrics known to be environment‑sensitive.
* UINDM returns an indicator set used by the scoring and comparison stages; uncertain indicators are handled via tri‑state guarding rather than coerced to zero or silently dropped.
### Bias-Annotation (informative)

* **Gov (governance).** Bias toward explicit policy surfaces (`IndicatorChoicePolicyRef`, edition pins, auditable outcomes) rather than tacit “expert choice.” Risk: perceived extra work. Mitigation: keep the mechanism minimal (selection‑only) and push method detail into wiring modules.

* **Arch (architecture).** Bias toward stable interfaces: SlotKind tokens come from the suite lexicon and evidence gates are explicit inputs. Risk: reduced “quick hacks.” Mitigation: allow `⊑⁺` extensions for richer outputs (e.g., justification) without mutating the kernel signature.

* **Onto/Epist.** Bias toward a strict distinction between “measurable characteristic” and “indicator under policy.” Risk: teams accustomed to “everything measurable is an indicator” may resist. Mitigation: embed this as an explicit LawSet clause (“No implicit NCV⇒indicator”). 

* **Prag (pragmatics).** Bias toward fail‑closed guards and traceability under uncertainty. Risk: more `abstain/degrade` outcomes early. Mitigation: couple `degrade` with explicit downstream behaviors (policy‑bound) rather than silent coercions.

* **Did (didactics).** Bias toward “one place to learn the mechanism”: the problem/forces/solution narrative is co‑located with the canonical Mechanism.Intension.
### Conformance Checklist

A UINDM publication / usage is conformant if it satisfies:

1. **Mechanism.Intension completeness.** The mechanism publication includes the full intension shape (header/imports/subject/slot index/op algebra/laws/admissibility/applicability/transport/time/plane/audit), and uses the tri‑state guard form. SlotIndex is treated as a **derived** projection. (See `CC‑UM.0/CC‑UM.1/CC‑UM.9`.) 

2. **SlotKind discipline.** SlotKind tokens match the CHR SlotKind lexicon for the roles used (`CharacteristicSpaceSlot`, `CNSpecSlot`, `IndicatorChoicePolicySlot`, `ContextSlot`, etc.). New SlotKinds, if any, are introduced by first extending the suite lexicon, not ad‑hoc in the mechanism. 

3. **Selection‑only behavior.** `Indicatorize` does not alter units/scales/polarities, does not perform implicit normalization, and does not enlarge the host basis. 

4. **No NCV shortcut.** “Measurable/NCV” is not treated as sufficient for indicatorhood; indicatorhood arises only via `IndicatorChoicePolicySlot` consistent with `CN‑Spec.indicator_policy`. 

5. **Evidence gating is explicit.** When the chosen `IndicatorChoicePolicy` is evidence‑gated, `CGSpecSlot` is present and the effective MinimalEvidence is explicit and auditable
   (`MinimalEvidenceSlot` when provided; otherwise `CGSpecSlot.MinimalEvidence`); insufficient/unknown evidence must yield `degrade/abstain` per the effective failure‑behavior policy, never a silent `pass`.

6. **Cross‑context indicatorization is explicit.** Any cross‑context use names the relevant Bridge/CL/ReferencePlane and routes penalties to `R_eff` only (Bridge‑only transport + R‑only routing). (See `CC‑UM.3/CC‑UM.4`.) 

7. **Gate/guard separation + lexeme discipline.** UINDM uses `…Eligibility` returning `GuardDecision ∈ {pass|degrade|abstain}` and does not embed GateDecision/GateLog in suite steps.
   Reserved gate‑lexemes (e.g., `…Guard`) are not used for mechanism‑level predicates; the mechanism stays at the guard/admissibility layer.

8. **P2W seam is preserved.** Planned slot fillings / edition pin‑bindings are not authored inside this mechanism intension; they are bound in WorkPlanning artefacts (P2W) and surfaced at run‑time only via `Audit` refs/pins.

9. **Specialization discipline (if extended).** Any specialization of UINDM (`⊑/⊑⁺`) MUST follow the multi‑level specialization discipline (`A.6.1:4.2.1`, `CC‑UM.8`): SlotKind invariance for inherited ops, no new mandatory inputs to the inherited `Indicatorize` op, and any extra outputs (e.g., justification/subspace artefacts) expressed only via `⊑⁺`.
### Common Anti‑Patterns and How to Avoid Them

* **“NCV ⇒ indicator.”** Treating all measurable characteristics as indicators. Violates “No implicit NCV⇒indicator.” 

* **Indicatorization hidden in scoring.** A scoring method silently ignores some characteristics or introduces an implicit “feature selection” without an explicit indicator set.

* **Silent emptying.** When evidence is insufficient, returning an empty indicator set (or treating missing evidence as “pass”) without a tri‑state guard decision. 

* **Cross‑context reuse without Transport.** Reusing an indicator set across contexts without naming Bridge/CL/ReferencePlane, thereby hiding penalties and violating crossing visibility. 

* **Smuggling plan‑binding into the mechanism.** Binding concrete edition pins / planned slot fillings (“launch values”) inside the UINDM description instead of using the P2W seam (WorkPlanning) and recording only effective refs/pins in `Audit`.

* **GateDecision leakage.** Emitting or implying GateDecision/GateLog as part of the `indicatorize` step (gate decisions are separated from suite steps; keep UINDM at guard+audit level).
### Consequences

**Benefits**

* Makes “which characteristics count as indicators” explicit, auditable, and policy‑bound.
* Prevents downstream semantic drift by freezing an indicator subset early in the CHR pipeline.
* Improves reproducibility via edition‑determinism (fixed editions ⇒ stable result). 
* Preserves evolvability: new indicator selection method families can be added via wiring (packs/extensions) without changing the mechanism’s intension.

**Costs / trade‑offs**

* Adds an explicit step (and explicit policy work) before scoring/comparison.
* Strict fail‑closed behavior can increase early `degrade/abstain` outcomes until evidence and policies are properly specified.
### Rationale

Indicatorization is separated because it is a different kind of commitment than scoring or comparison:

* Indicatorization commits to **which coordinates are allowed to matter** under policy.
* Scoring/aggregation/comparison commit to **how** allowed coordinates are transformed, folded, or ordered under legality gates.

By making indicatorization selection‑only, UINDM avoids “semantic alchemy” (changing meanings while claiming to merely “pick indicators”) and supports the CHR suite’s broader discipline: explicit contracts, explicit crossings, and explicit handling of uncertainty via tri‑state guards.
### SoTA-Echoing

**SoTA vs popular note.** This section records alignment to post‑2015 evidence‑backed practice. It is **not** a mandate to use fashionable methods; method semantics stay in SoTA packs (`G.2`) and wiring modules, while this pattern fixes the stable mechanism boundary.

**Pack note (Phase‑3):** this pattern does not currently cite a UINDM‑specific `G.2` SoTA pack/ClaimSheet. If/when such a pack is introduced, replace the bibliographic pointers below with the pack’s `ClaimSheetId` citations, keeping the mechanism semantics unchanged.

#### SoTA alignment map (normative)

| SoTA practice pointer (post‑2015+) | Primary source (post‑2015+) | Where it connects to UINDM | Adoption status |
| --- | --- | --- | --- |
| Prefer indicators stable under environment shift (avoid spurious proxies) | IRM / invariant prediction line ([arXiv][1]) | Expressed as **policy freedom** (`IndicatorChoicePolicySlot`) + explicit `Transport` + fail‑closed eligibility; method details stay out of the kernel | Adapt |
| Treat “why these indicators” as a first‑class artefact, not tribal knowledge | Model Cards documentation discipline ([ACM Digital Library][2]) | Expressed as minimal but decisive `Audit` + optional `⊑⁺` justification output (without mutating the kernel signature) | Adapt |
| Keep architectural commitments traceable and single‑owner (avoid “second centers of gravity”) | ISO/IEC/IEEE 42010:2022 “Systems and software engineering — Architecture description” | Expressed as the explicit semantic‑owner hook + “Tell + Cite” stubs elsewhere (no competing semantics) | Adopt |

**Notes per row (SoTA‑Echoing; not method mandates).**
1. *Invariance under shift.* UINDM does not “implement IRM”; it merely makes room for invariance‑driven indicator policies to be wired while keeping the kernel selection‑only.
2. *Justification discipline.* UINDM keeps justification optional at the kernel level; if a justification artefact is required, add it via `⊑⁺` so the base signature stays stable.
3. *Single‑owner traceability.* The ISO architecture‑description discipline is used here only to motivate “one semantic owner + Tell/Cite stubs”; it does not add new Part‑A contract surfaces.
### Relations

* **Builds on**

  * `A.19.CN` (CN‑Spec, specifically `indicator_policy`). 
  * `A.6.1` / `CC‑UM.*` (mechanism intension shape and authoring checks). 
  * `A.19.CHR:4.2.1` (CHR SlotKind lexicon). 
* **Used by**

  * `A.19.CHR` (suite membership and suite protocols; UINDM is the `indicatorize` stage). 
* **Coordinates with**

  * `G.0` (CG‑Spec / MinimalEvidence) when indicator choice is evidence‑gated. 
  * `E.20` (single‑owner discipline) and `F.18` (alias docking) for Phase‑3 canonicalization and ID continuity.
[1]: https://arxiv.org/abs/1907.02893 "Invariant Risk Minimization"
[2]: https://dl.acm.org/doi/10.1145/3287560.3287596 "Model Cards for Model Reporting"
### A.19.UINDM:End
## Unified Scoring Mechanism, USCM

> **Type:** Architectural (A)
> **Status:** Stable
> **Normativity:** Normative (unless explicitly marked informative)
> **Placement:** Part A / CN‑Spec cluster (A.19) / CHR mechanism owner patterns (Phase‑3)
> **Source:** FPF / CHR Phase‑3 mechanism owner patterns
> **Modified:** 2026‑01‑20
>
> **Semantic owner note, Phase‑3 canonicalization:** this pattern is the **designated single semantic owner** of the canonical `U.Mechanism.Intension` for `USCM.IntensionRef` (CHR suite stage `score`). This matches the single‑owner discipline: mechanism‑intension semantics of characterisation mechanisms live in an explicitly designated mechanism‑owner pattern (`E.20`).
> `A.6.1` remains the owner of the **template** of `U.Mechanism.Intension`; this pattern owns the **USCM‑specific** slots, operations, laws, admissibility, applicability, transport, plane, and audit obligations for that template (single‑owner at the instance‑semantics level).
>
> **Canonicalization hook, ID‑continuity‑safe:** any other appearances of the USCM intension (e.g., a legacy grounding stub in `A.6.1` or suite prose in `A.19.CHR`) SHALL be reduced to a **Tell + Cite** stub pointing to **`A.19.USCM:4.1`**, while preserving the original section headings and their public `PatternId:SectionPath` IDs for continuity (alias‑dock legacy tokens rather than deleting them).
> Such stubs MUST NOT restate SlotIndex, OperationAlgebra, LawSet, Admissibility, or Audit content (no “second center of gravity” via near‑duplicate prose).

### At a glance — didactic, informative

* **Suite stage:** `score` (ordering lives only in `A.19.CHR:4.5` / `suite_protocols`; suite membership is a set in `A.19.CHR:4.2`).
* **Inputs, conceptual:** an admitted measure profile (`InputProfileSlot`) + `CNSpecRef` + `CGSpecRef` + `ScoringMethodDescriptionRef` + active `U.BoundedContextRef`, with optional `MinimalEvidenceRef` override.
* **Output:** `ScoreProfileSlot` = a set of score measures (vector scores are first‑class; a scalar score is allowed only if explicitly declared).
* **Non‑goals:** does **not** normalize (UNM), aggregate (ULSAM), compare (CPM), select (SelectorMechanism), threshold, publish, or emit telemetry; it is a scoring step with explicit legality and evidence surfaces.
* **P2W seam:** concrete edition/policy pin bindings (including `ScoringMethodDescriptionRef@edition(…)` when USCM is used) are chosen in planned baseline artefacts (`A.15.3` + `A.19.CHR:4.7.2`); executions only record effective refs/pins in `Audit`.
* **Failure mode:** tri‑state guard (`pass|degrade|abstain`); unknown never coerces to `pass`, and MUST NOT be coerced to `0/false`.
* **Quick rule of thumb:** if `CGSpecSlot.SCP` is missing → `ScoreEligibility = abstain` (fail‑closed); if `ScoringMethodDescriptionSlot` is missing → `ScoreEligibility = abstain` (no implicit scoring method); if `CN‑Spec.comparability` requires normalization‑based comparability → normalization MUST be explicit in choreography (Uses/pins), never hidden inside `Score`.
### Problem frame

FPF’s Characterization (CHR) suite treats scoring as a **distinct mechanism boundary** within the CHR suite (authoritative membership: `A.19.CHR:4.2`). Suite membership is a **set** (order has no semantics); any intended ordering is expressed only via `suite_protocols` (`A.19.CHR:4.5`), under the suite obligations (`A.19.CHR:4.3`).

Within the canonical suite‑closed protocol, USCM appears as the `score` stage (after `normalize` and `indicatorize`, before comparison and selection). USCM’s surface is legality‑first: it produces **score measures** from admitted profiles while remaining constrained by the legality gate (`CG‑Spec.SCP`) and by scale‑lawfulness (CSLC).

USCM exists to keep a strict distinction between:

* **normalization** (UNM),
* **indicatorization** (UINDM),
* **scoring** (USCM),
* **aggregation/folding** (ULSAM), and
* **comparison/ordering/selection** (CPM + SelectorMechanism),

so that each commitment has a single place to live, can be audited, and can evolve without smuggling extra semantics into adjacent steps.
### Problem

Engineering teams often need to convert an admitted (indicator or NCV) profile into one or more **score measures** for downstream comparison and selection. If scoring is not given a **first‑class mechanism boundary** with explicit legality and evidence surfaces, the following failure modes are common:

* **Illicit arithmetic by convenience:** teams apply weighted sums, averages, or nonlinear transforms across mixed scale kinds without an explicit legality profile, creating scores that are not CSLC‑lawful.
* **Hidden normalization:** scoring implementations silently normalize, align, or flip polarities, collapsing the distinction between “normalize” and “score” and making downstream reasoning non‑reproducible.
* **Silent scalarization:** multi‑criteria realities (vector scores, partial‑order comparability) are reduced to a single scalar via hidden tie‑breakers, producing an apparent total order that is not justified.
* **Unknown coercion:** missing or insufficient evidence is coerced into `0/false` or treated as “good enough,” yielding scores that look precise while being epistemically unsafe.
* **Drift and non‑auditability:** different teams score “the same thing” differently because legality constraints and effective policies (editions, evidence rules, crossings) are not explicit and not recorded.
### Forces

1. **Legality discipline vs operational pressure.** Scoring is where “just compute a number” pressure is strongest, but legality must remain explicit and checkable: SCP and CSLC constraints must bound permissible transforms.

2. **Method diversity vs stable mechanism boundary.** Scoring methods evolve rapidly; USCM’s signature must remain stable so method families can be wired through SoTA packs and extensions without mutating the mechanism boundary.

3. **Vector reality vs scalar simplicity.** Many situations require multiple score dimensions. A single scalar score may be convenient but must be an explicit, declared commitment, not a hidden reduction.

4. **Uncertainty vs decisiveness.** Teams need decisions under uncertainty; the framework must prevent epistemic overconfidence. Tri‑state admissibility guards preserve correctness without forcing silent coercions.

5. **Strict distinction across CHR steps.** USCM must not absorb UNM, ULSAM, or CPM semantics “for convenience,” or the suite becomes opaque and non‑teachable.

6. **Evolvability vs didactic usability.** Interfaces must remain evolvable (stable SlotKind surface; method semantics externalized), while the spec remains teachable: a reader must find USCM’s purpose, boundary, laws, guard behavior, and audit minimum in one place.

7. **P2W separation and gate/guard separation.** Planned baseline binding (editions/policy ids) belongs to WorkPlanning artefacts; gate decisions and logs live in gate patterns / WorkEnactment. USCM must expose eligibility + audit pins without turning into a gate or a planner.
### Solution

USCM is the **canonical scoring mechanism** in the CHR suite. It defines:

* a stable **mechanism boundary** (`score` is its own stage with a canonical `Score` operation and a tri‑state eligibility predicate),
* a stable **SlotKind surface** (via the suite lexicon),
* a legality‑first **LawSet** anchored in `CG‑Spec.SCP` and CSLC,
* an explicit **anti‑smuggling rule** (no implicit normalization), and
* an **audit minimum** (edition pins and effective evidence policy, plus crossings when transport occurs).

USCM preserves the suite obligations by construction: it does not embed GateDecision/GateLog, it does not perform publish/telemetry steps, and it keeps Transport declarative (refs/pins only) with penalties routed to `R_eff` only.

Method semantics (“how to score”) remain out of suite core: they belong in SoTA packs (`G.2`) and wiring‑only extension modules (`GPatternExtension` blocks), while USCM remains the stable conceptual mechanism boundary.

#### Mechanism.Intension

This is the canonical `U.Mechanism.Intension` for `USCM.IntensionRef` and is intended to be cited by CHR suite artifacts and by any wiring layers.

* **Scope note:** this intension is an **instance** authored to the `U.Mechanism.Intension` shape owned by `A.6.1`. It defines only the mechanism’s semantic surface (slots/ops/laws/guards/audit). It does **not** bind project‑specific pins (P2W), and it does **not** emit GateDecision/GateLog; it emits `Audit` pins and a tri‑state guard only.

* **IntensionHeader:** `id = USCM`, `version = 1.0.0`, `status = stable`.

* **IntensionRef:** `USCM.IntensionRef` (canonical target for the suite member named in `A.19.CHR:4.2`).

* **SignatureManifest (optional; importability):** if a USCM publication is intended to be imported/reused, it SHOULD publish a `SignatureManifest` (A.6.0 / A.6.1; `CC‑A.6.0‑18`, `CC‑UM.1`) consistent with `IntensionHeader`/`Imports`, explicitly exposing the stable SlotKind surface (including `ScoringMethodDescriptionSlot`) and any declared scalarization commitment.

* **Tell.** **SCP‑first** scoring: produce score measures from admitted profiles without violating CSLC / scale legality.

* **Purpose:** **SCP‑first** scoring: produce score measures from admitted profiles without violating CSLC / scale legality.

* **Imports:** `G.0 (CG‑Spec.SCP, CG‑Spec.MinimalEvidence)`, `A.18 (CSLC)`, `C.16 (ScoringMethod disclosure + polarity/monotonicity discipline)`, `A.19.CN (comparability.mode + normalization routing)`, `A.19.CHR:4.2.1 (CHR SlotKind Lexicon)`.

* **SubjectBlock:**

  * **SubjectKind:** `Scoring`.
  * **BaseType:** `U.Measure`.
  * **SliceSet:** `U.ContextSliceSet`.
  * **ExtentRule:** scoring ranges over admitted (indicator/NCV) profiles in the active context slice, routed by `CN‑Spec.comparability` and legality‑gated by `CG‑Spec.SCP`.
  * **ResultKind?:** `U.Set` (of `U.Measure`).

* **SlotIndex** (derived projection from `SlotSpecs` / guard SlotSpecs; uses `A.19.CHR:4.2.1` SlotKind tokens where applicable; any new SlotKind tokens introduced here MUST be suite‑docked into the lexicon by the suite owner to avoid drift):

  * `InputProfileSlot : ⟨ValueKind = U.Set (of U.Measure), refMode = ByValue⟩`,
  * `CNSpecSlot : ⟨ValueKind = CN‑Spec, refMode = CNSpecRef⟩`,
  * `CGSpecSlot : ⟨ValueKind = CG‑Spec, refMode = CGSpecRef⟩`,
  * `ScoringMethodDescriptionSlot : ⟨ValueKind = ScoringMethodDescription, refMode = ScoringMethodDescriptionRef⟩` (SlotKind token; when reproducibility matters it is edition‑pinned via the P2W baseline; if the suite lexicon does not yet contain this token, it SHALL be docked into the lexicon by the suite owner rather than introduced ad‑hoc),
  * `ContextSlot : ⟨ValueKind = U.BoundedContext, refMode = U.BoundedContextRef⟩`,
  * `MinimalEvidenceSlot? : ⟨ValueKind = MinimalEvidence, refMode = MinimalEvidenceRef⟩` (optional override; otherwise cite `CGSpecSlot.MinimalEvidence`),
  * `ScoreProfileSlot : ⟨ValueKind = U.Set (of U.Measure), refMode = ByValue⟩`.

* **OperationAlgebra** (suite stage = `score`, per `A.19.CHR:4.5`; canonical stage‑op = `Score`):

  * `Score(InputProfileSlot, CNSpecSlot, CGSpecSlot, ScoringMethodDescriptionSlot, ContextSlot, MinimalEvidenceSlot?) → ScoreProfileSlot`.

* **LawSet** (minimum; legality‑first, no hidden scalarization):

  1. **SCP+CSLC legality:** any numeric transform used to produce `ScoreProfileSlot` MUST be admissible under `CGSpecSlot.SCP` and CSLC‑lawful (cites `G.0` + `A.18`).
  2. **ScoringMethod is explicit (no hidden defaults):** `Score` MUST cite `ScoringMethodDescriptionSlot` (edition‑pinned via P2W when reproducibility matters; see `A.19.CHR:4.7.2`). If a score is issued, the scoring method **𝒢** (Coordinate→Score) MUST be disclosed as required by `C.16` (bounded codomain; monotonicity consistent with template polarity). USCM MUST NOT rely on an implicit “default scoring method”.
  3. **No implicit normalization:** `Score` MUST NOT silently perform UNM; if `CNSpecSlot.comparability` requires normalization‑based comparability, the normalization step MUST be explicit in choreography (Uses/pins), not hidden in `Score`.
  4. **Vector scores allowed; scalarization must be explicit:** producing a single scalar score is allowed only if explicitly declared (e.g., by fixing `ScoreProfileSlot` cardinality to 1 and citing the lawful transform); partial‑order semantics MUST NOT be silently reduced to a scalar “tie‑breaker”.
  5. **Unknown is not coerced:** unknown / insufficient evidence MUST NOT be mapped to `0`/`false`; use tri‑state guards and explicit failure behavior.

* **AdmissibilityConditions** (tri‑state guard; fail‑closed on missing legality/evidence):

  * `ScoreEligibility(InputProfileSlot, CNSpecSlot, CGSpecSlot, ScoringMethodDescriptionSlot, ContextSlot, MinimalEvidenceSlot?) → GuardDecision ∈ {pass|degrade|abstain}`.
  * `pass` requires: (i) `CGSpecSlot.SCP` is present, (ii) `ScoringMethodDescriptionSlot` is present (no implicit scoring method), (iii) evidence passes `MinimalEvidenceSlot?` or `CGSpecSlot.MinimalEvidence`, and (iv) `CN‑Spec.comparability` routing is satisfied (incl. explicit UNM when needed).
  * If `MinimalEvidenceSlot` is absent, the guard MUST evaluate evidence against `CGSpecSlot.MinimalEvidence` (by explicit rule), and MUST NOT return `pass` when evidence is missing/unknown.
  * If `ScoringMethodDescriptionSlot` is missing or unpinned/ambiguous under the active planned baseline, the guard MUST return `abstain` (fail‑closed), not “assume a default”.

* **Applicability:**

  * Intended to be used after indicatorization (when indicator profiles are used) and before comparison/selection.
  * Applicable only when legality/evidence surfaces are present via `CGSpecSlot` (fail‑closed otherwise).
  * Applicable only when a scoring method is explicitly declared via `ScoringMethodDescriptionSlot` (edition‑pinned when reproducibility matters). A “do nothing / identity scoring” intent (if ever needed) MUST still be declared as an explicit scoring method description, not as an implicit default.

* **Transport:** Bridge+CL/ReferencePlane only; penalties route to **`R_eff` only**.

* **Γ_timePolicy:** `point` by default (no implicit “latest”).

* **PlaneRegime:** values live on **episteme ReferencePlane**; on plane crossings apply **CL^plane** policy; penalties → **`R_eff` only**.

* **Audit:**

  * MUST record: `CNSpecRef.edition`, `CGSpecRef.edition`, `ScoringMethodDescriptionRef.edition`.
  * MUST record the **effective evidence policy**:
    * if `MinimalEvidenceSlot?` is present → record `MinimalEvidenceRef` as effective;
    * otherwise → cite `CGSpecSlot.MinimalEvidence` as effective.
  * SHOULD record the realized `GuardDecision` for `ScoreEligibility`, and (when `degrade`/`abstain`) the referenced failure behavior / downstream handling policy id (e.g., SoS‑LOG branch id) when such a policy is in scope.
  * SHOULD record: a stable description of `ScoreProfileSlot`, any Bridge/CL/ReferencePlane ids when `Transport` was invoked, and (when normalization‑based comparability was required) an explicit ref/pin that the upstream UNM step was applied (no provenance gaps for “normalized input” claims).
#### Interpretation notes — informative

* **A score profile is a set of measures.** `ScoreProfileSlot` is a `U.Set (of U.Measure)`. Treat this as “vector scoring by default.” If a project truly needs a single scalar score, declare that explicitly (per LawSet item 3), rather than assuming scalarity.
* **A score profile is a set of measures.** `ScoreProfileSlot` is a `U.Set (of U.Measure)`. Treat this as “vector scoring by default.” If a project truly needs a single scalar score, declare that explicitly (per LawSet item 4), rather than assuming scalarity.

* **USCM does not order; it scores.** USCM produces score measures. Any ordering, dominance, or set‑valued comparison is performed by CPM and SelectorMechanism (and any optional aggregation is made explicit via ULSAM). Treating the score as “the decision” is a category error in CHR terms.

* **ScoringMethod is explicit (no hidden defaults).** USCM requires `ScoringMethodDescriptionSlot`: the scoring method is a first‑class, auditable choice (typically pinned in planned baseline). This keeps “how we score” evolvable (wired via method packs) without making it implicit or accidental.

* **No implicit UNM is a boundary guard.** This discourages convenience implementations that “just normalize inside scoring.” USCM forbids that: if comparability requires normalization‑based routing, the UNM step is explicit in choreography (Uses/pins) and visible in audit surfaces.

* **Evidence policy is explicit and auditable.** `MinimalEvidenceSlot?` is an optional override; otherwise the effective policy is `CGSpecSlot.MinimalEvidence`. Failures do not disappear; they must show up as `degrade/abstain` and be traceable.

* **Crossings are declarative and penalize `R_eff` only.** When scoring spans contexts or planes, USCM names Bridge+CL/ReferencePlane policies and routes penalties to `R_eff` only, keeping correctness separate from convenience.
### Archetypal Grounding — informative

#### Tell

Think of USCM as **legality‑gated scoring**:

* Input: “an admitted profile of measures, in this context slice, plus CN-Spec governance card and CG-Spec legality gate”
* Output: “a set of score measures that downstream steps may compare/select on”

The key didactic boundary is: **USCM is allowed to transform measures only within the legality surface (SCP+CSLC), and it must not hide normalization, aggregation, or ordering.**
#### Show — U.System

A program manager evaluates competing rollout plans for a product launch.

* The admitted profile includes measures like `{Cost, LeadTime, Reliability, RiskExposure, CarbonPerUnit}`.
* The CG‑Spec’s `SCP` admits only scale‑lawful transforms (e.g., monotone transforms on ratio/interval measures, explicit unit alignment rules, and prohibited operations on ordinal measures).
* USCM runs `Score(...)` and outputs a score profile such as `{UtilityScore, RiskScore}` rather than forcing a single number.
* A plan lacks sufficient evidence for `RiskExposure` in this context slice; `ScoreEligibility` returns `degrade`, and the audit records the effective MinimalEvidence policy and the editions of `CNSpecRef` and `CGSpecRef`.

Downstream steps can now compare and select with an explicit audit trail, instead of pretending that “the score was objective.”
#### Show — U.Episteme

A research lead compares several model families for deployment across heterogeneous environments.

* Indicators include calibration and robustness metrics; scoring is done using a calibrated probabilistic score plus uncertainty‑aware score dimensions.
* A post‑2015 practice example is to keep monotonicity and interpretability constraints explicit (e.g., monotone additive models or monotone deep lattice style models) and to treat uncertainty as first‑class (e.g., conformal set‑valued scoring that yields intervals rather than point scores).
* USCM produces a score profile that can remain vector‑valued and uncertainty‑aware, and it refuses to coerce “unknown” into a point score. Comparisons and selections occur downstream using set‑valued semantics where appropriate.
### Bias-Annotation — informative

* **Gov (governance).** Bias toward explicit legality and evidence surfaces (`CGSpecRef`, `SCP`, `MinimalEvidence`) rather than “standard practice” arithmetic. Risk: perceived overhead. Mitigation: keep the kernel signature small and push method specifics into SoTA packs and wiring modules.

* **Arch (architecture).** Bias toward stable interfaces and strict step boundaries (no implicit UNM; no hidden scalarization). Risk: reduced room for ad‑hoc shortcuts. Mitigation: allow richer scoring method families via wiring, without mutating the USCM intension.

* **Onto/Epist.** Bias toward treating scores as measures with declared semantics, not as “the truth.” Risk: teams accustomed to one‑number rankings may resist. Mitigation: treat scalarization as an explicit, auditable commitment, not as the default.

* **Prag (pragmatics).** Bias toward fail‑closed guards and traceability under uncertainty. Risk: more `degrade/abstain` outcomes early. Mitigation: couple `degrade` with explicit downstream behavior policies, rather than silent coercion.

* **Did (didactics).** Bias toward “one place to learn the mechanism”: the problem/forces/solution narrative is co‑located with the canonical Mechanism.Intension.
### Conformance Checklist

A USCM publication / usage is conformant if it satisfies:

1. **Mechanism.Intension completeness.** The publication includes the full intension shape (header/imports/subject/slot index/op algebra/laws/admissibility/applicability/transport/time/plane/audit), and uses the tri‑state guard form. SlotIndex is treated as a **derived** projection. (See `CC‑UM.*`.)

2. **SlotKind discipline.** SlotKind tokens match the CHR SlotKind lexicon for the roles used (`InputProfileSlot`, `CNSpecSlot`, `CGSpecSlot`, `ContextSlot`, `MinimalEvidenceSlot`, `ScoringMethodDescriptionSlot`, `ScoreProfileSlot`). If `ScoringMethodDescriptionSlot` (or any other required token) is missing from the suite lexicon, it SHALL be suite‑docked there (alias docking acceptable) rather than introduced ad‑hoc in the mechanism.

3. **SCP+CSLC legality is enforced.** Any numeric transform used to produce score measures is admissible under `CGSpecSlot.SCP` and CSLC‑lawful; illicit operations (especially “convenient arithmetic” over non‑lawful scales) are excluded.

4. **ScoringMethod is explicit and auditable.** `Score` cites `ScoringMethodDescriptionSlot` (edition‑pinned when reproducibility matters). No implicit “default scoring method” is assumed. The disclosed method respects polarity/monotonicity discipline (cf. `C.16`).

5. **No implicit normalization.** `Score` does not silently perform UNM. If `CN‑Spec.comparability` requires normalization‑based routing, the normalization step is explicit in choreography (Uses/pins) and auditable.

6. **No hidden scalarization.** Vector scores are permitted. A scalar score is produced only when explicitly declared, and partial‑order semantics are not reduced to a scalar tie‑breaker.

7. **Unknown and evidence handling is explicit.** Unknown / insufficient evidence is not coerced to `0/false`. Eligibility uses `GuardDecision ∈ {pass|degrade|abstain}` and evaluates evidence against the effective policy (`MinimalEvidenceSlot` override or `CGSpecSlot.MinimalEvidence`).

8. **P2W seam is preserved.** Planned slot fillings / edition pin bindings are not authored inside the mechanism intension; they are bound in WorkPlanning artefacts (P2W) and surfaced at run‑time only via `Audit` refs/pins.

9. **Transport and plane discipline.** Cross‑context and cross‑plane use is declarative (Bridge+CL/ReferencePlane; `CL^plane` for plane crossings) and routes penalties to `R_eff` only. Audit records crossings when invoked.

10. **Specialization discipline, if extended.** Any specialization of USCM (`⊑/⊑⁺`) follows the multi‑level specialization discipline (`A.6.1:4.2.1`, `CC‑UM.8`): SlotKind invariance for inherited ops, no new mandatory inputs to the inherited `Score` op, and any extra outputs or ops expressed only via `⊑⁺`.
### Common Anti‑Patterns and How to Avoid Them

* **Hidden normalization inside scoring.** Scoring silently normalizes or aligns measures. Avoid by making UNM explicit in choreography and keeping USCM’s `Score` legality‑only.

* **Weighted sum across mixed or non‑lawful scales.** Treating “weights + sum” as universal. Avoid by requiring SCP+CSLC admissibility; if it’s not lawful, it’s not admissible.

* **Silent scalarization.** Collapsing vector scores or partial orders into a single “overall score” via an untracked tie‑breaker. Avoid by leaving vector scores intact, and making scalarization an explicit declared commitment.

* **Implicit scoring method (“we just use the standard formula”).** The scoring method is assumed rather than declared and pinned. Avoid by requiring `ScoringMethodDescriptionSlot` and edition pinning in planned baseline; treat “identity scoring” (if ever needed) as an explicit method description, not a hidden default.

* **Unknown → 0 coercion.** Treating missing evidence as zero, false, or “good enough.” Avoid by tri‑state guards and explicit failure behavior, with auditable effective evidence policy.

* **Shadow CG‑Spec.** Hard‑coding legality rules inside a scoring method description instead of citing `CGSpecSlot.SCP`. Avoid by keeping legality in CG‑Spec and treating method details as wiring.

* **Telemetry or publish leakage.** Treating scoring as a reporting step. Avoid by keeping publish/telemetry outside suite closure (e.g., routed via appropriate post‑suite mechanisms).

* **SlotKind drift.** Renaming or re‑purposing slots across specializations or across mechanisms. Avoid by using the suite SlotKind lexicon and the `⊑/⊑⁺` discipline.
### Consequences

**Benefits**

* Makes scoring a first‑class, legality‑gated CHR step, reducing illicit arithmetic and silent assumptions.
* Improves auditability and reproducibility via explicit edition pins and explicit evidence policy selection (override vs default).
* Preserves evolvability: scoring method families can change via SoTA wiring without changing the USCM intension.
* Supports correctness under uncertainty via tri‑state guards and explicit unknown handling.

**Costs / trade‑offs**

* Requires explicit CG‑Spec legality surfaces (SCP) and explicit evidence policies to achieve `pass`; this can feel slower than “just compute a score.”
* Vector scores can be less immediately comfortable than a single number; downstream comparison/selection must be explicit about how vector scores are used.
### Rationale

Scoring is a frequent source of semantic precision loss: it is easy to smuggle normalization, illegal arithmetic, implicit thresholds, and uncertainty coercion into “a simple scoring function.” USCM prevents that by forcing a clean boundary:

* **Legality first:** all transforms are justified by `CG‑Spec.SCP` and CSLC.
* **No hidden steps:** normalization is explicit (UNM), aggregation is explicit (ULSAM), ordering is explicit (CPM/SelectorMechanism).
* **Uncertainty is visible:** admissibility is tri‑state; unknown is not coerced.
* **Audit is minimal yet decisive:** effective editions and effective evidence policy are always traceable.

This increases both evolvability (stable interface, externalized method semantics) and didactic usability (a single place to learn USCM’s boundary and obligations).
### SoTA-Echoing

**SoTA vs popular note.** This section records alignment to post‑2015 evidence‑backed practice. It is **not** a mandate to use fashionable methods; method semantics stay in SoTA packs (`G.2`) and wiring modules, while this pattern fixes the stable mechanism boundary.

**Pack note, Phase‑3:** this pattern does not currently cite a USCM‑specific `G.2` SoTA pack or ClaimSheet. If/when such a pack is introduced, `ScoringMethodDescriptionSlot` SHOULD be wired to `ScoringMethodDescriptionRef(ed=…)` entries owned by that pack’s ClaimSheets, keeping the USCM mechanism semantics unchanged.

#### SoTA alignment map

| SoTA practice pointer, post‑2015+                                             | Primary source examples, post‑2015+                                                                                                               | Where it connects to USCM                                                                                                                                        | Adoption status |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Prefer monotone and interpretable scoring surfaces where appropriate          | Explainable additive and monotone model lines, e.g., Lou et al. 2016; Nori et al. 2019; monotone deep lattice style models, e.g., You et al. 2017 | Expressed as **legality‑bounded transform freedom** via `CGSpecSlot.SCP` and explicit scalarization rules; method details stay out of the kernel                 | Adapt           |
| Treat probabilistic scores as measures requiring calibration, not raw outputs | Calibration practice, e.g., temperature scaling (Guo et al. 2017) and successors                                                                  | Expressed as “score is a measure on an explicit scale,” bounded by SCP+CSLC and evidence gating; calibration itself is wired as method semantics, not kernel law | Adapt           |
| Keep uncertainty explicit and allow set‑valued scoring when appropriate       | Modern conformal prediction practice, e.g., Romano et al. 2019; Barber et al. 2021                                                                | Expressed as “vector scores allowed; unknown not coerced; no hidden scalarization,” enabling downstream set‑valued comparison/selection                          | Adapt           |
| Keep architectural commitments traceable and single‑owner                     | ISO/IEC/IEEE 42010:2022 architecture description discipline                                                                                       | Expressed as explicit semantic ownership and Tell+Cite stubs elsewhere (no competing semantics)                                                                  | Adopt           |

**Notes per row**

1. USCM does not “implement a particular scoring model”; it preserves a stable, legality‑gated surface on which such models can be wired.
2. Calibration is treated as a lawful transform family that must live within SCP+CSLC; the kernel does not mandate a specific calibration method.
3. Set‑valued scoring aligns with USCM’s “vector first, scalar by declaration” law, and is naturally consumed by CPM/SelectorMechanism without forcing a spurious total order.
4. Single‑owner traceability is used here to keep the spec teachable and non‑duplicative; it does not add new governance cards or legality gates.
### Relations

* **Builds on**

  * `A.6.1` / `CC‑UM.*` (mechanism intension shape and authoring checks).
  * `A.19.CHR:4.2.1` (CHR SlotKind lexicon).
  * `G.0` (CG‑Spec, specifically `SCP` and `MinimalEvidence`).
  * `A.18` (CSLC legality discipline).
  * `C.16` (ScoringMethod disclosure; polarity/monotonicity discipline for score mappings).
  * `A.15.3` + `A.19.CHR:4.7.2` (P2W planned baseline seam for edition/policy pin bindings; cited as seam, not duplicated in Intension).
  * `A.19.CN` (CN‑Spec, specifically `comparability` routing and normalization‑based comparability expectations).
* **Used by**

  * `A.19.CHR` (suite membership and suite protocols; USCM is the `score` stage).
  * Downstream CHR stages that require score measures as inputs (e.g., `CPM`, `SelectorMechanism`).
  * `E.18 (E.TGA)` when USCM instances are used as transduction nodes; the selected `ScoringMethodDescriptionRef@edition(…)` and other pins live in planned baselines (P2W), while executions surface effective refs/pins via `Audit`.
* **Coordinates with**

  * `UNM` when `CN‑Spec.comparability` requires normalization‑based comparability (explicit choreography, no hidden UNM).
  * `ULSAM` when folding/aggregation is needed as a distinct, explicit step.
  * `G.2` and `GPatternExtension` wiring modules for post‑2015 method families, without mutating the USCM kernel.
  * `E.20` (single‑owner discipline) and `F.18` (alias docking) for Phase‑3 canonicalization and ID continuity.
### A.19.USCM:End
## Unified Lawful Scale Aggregation Mechanism (ULSAM)

> **Type:** Architectural (A)  
> **Status:** Stable  
> **Normativity:** Normative (unless explicitly marked informative)  
> **Placement:** Part A / CN‑Spec cluster (A.19) / CHR mechanism owner patterns (Phase‑3)  
> **Source:** FPF / CHR Phase‑3 mechanism owner patterns  
> **Modified:** 2026-01-20

**Semantic owner note (Phase‑3 canonicalization):** this pattern is the **designated single semantic owner** of the canonical `U.Mechanism.Intension` for `ULSAM.IntensionRef` (CHR suite stage `fold_Γ?`). This matches the “single‑owner route map” discipline: mechanism‑intension semantics live either in an explicitly designated mechanism‑owner pattern (`E.20`).
`A.6.1` remains the owner of the **template** of `U.Mechanism.Intension` and the `U.MechAuthoring` discipline; this pattern owns the **ULSAM‑specific** slots/ops/laws/admissibility/audit obligations for that template (single‑owner at the instance‑semantics level).

**ID continuity note.** When migrating away from any legacy “card location”, preserve public anchors: keep the legacy section heading/ID as a **Tell + Cite stub** (or dock aliases via `F.18`) rather than deleting or silently renaming it.

**Canonicalization hook (ID‑continuity‑safe):** any other appearances of ULSAM intension content (e.g., a legacy grounding stub in `A.6.1` or suite prose in `A.19.CHR`) SHALL be reduced to a **Tell + Cite** stub pointing to **`A.19.ULSAM:4.1`**, while preserving the original section headings and their public `PatternId:SectionPath` IDs for continuity (alias‑dock legacy tokens rather than deleting them).
Such stubs MUST NOT restate SlotIndex / OperationAlgebra / LawSet / Admissibility content (no “second center of gravity” via near‑duplicate prose).
* **ID‑continuity‑safe:** if content is moved from an earlier location, preserve the earlier heading and its IDs as a stub that cites `A.19.ULSAM:4.1`.
* **Alias‑dock, don’t break:** if any legacy tokens exist, dock them via `F.18` + E.10 rules; do not silently replace tokens “by смысл”.
* **No shadow semantics:** derived summaries MAY be informative, but MUST NOT restate SlotIndex / OperationAlgebra / LawSet / Admissibility; they may only summarise and cite.

### At a glance (didactic, informative)

* **Suite stage:** `fold_Γ?` (ordering lives only in `A.19.CHR:suite_protocols`; `mechanisms[]` membership is a set, not an order).
* **Input surface:** `MeasureSetSlot` + `{CNSpecSlot, CGSpecSlot}` + `GammaFoldSlot` + `ContextSlot` (+ optional `MinimalEvidenceSlot?` override).
* **Output surface:** `AggregatedMeasureSlot` (+ optional `ContributorSetSlot?` as an explanation surface).
* **Non‑goals:** no scoring, no comparison, no selection, no “method catalog”, no hidden defaults, no hidden thresholds.
* **P2W seam:** edition/policy binding for `ΓFoldRef` / `MinimalEvidenceRef` is selected in planned baseline (A.15.3 + CHR P2W hook), not invented at run time.
* **Failure mode:** tri‑state guard `GuardDecision := {pass|degrade|abstain}`; unknown/insufficient evidence never coerces to “pass”.
* **Rule of thumb:** if you are about to “average/sum/roll up”, you probably need an explicit ULSAM `Fold_Γ` stage (or a justified decision to *not* fold).

**What this mechanism is.** `ULSAM` is the CHR mechanism that makes **aggregation explicit**: it performs an explicit **Γ‑fold** over a set of **admitted measures**, producing an **aggregated measure** (and optionally a contributor surface) under **declared legality**.

**What this mechanism is not.**
- It is **not** a scoring method (that is `USCM`).
- It is **not** a comparison mechanism (that is `CPM`).
- It is **not** a selection mechanism (that is `SelectorMechanism`).
- It is **not** a “method catalog”: method specifics belong to SoTA packs and wiring (`G.*:Ext.*`), not here.
- It is **not** a place to hide defaults (“implementation default fold”) or hidden thresholds.

**When you need ULSAM.**
- You want to “roll up” multiple measures into one measure (e.g., an overall reliability/assurance coordinate, a single aggregated risk measure, an aggregate score coordinate).
- You need the fold to be **auditable** (what contributed; what was excluded by evidence/legality).
- You need the fold to be **scale-lawful** (no ordinal arithmetic; no illegal mixing of units).
- You need the fold to be **policy-bound and edition-stable** (replayability and pin traceability).

**Where it sits in CHR.**
- In the CHR suite protocol, ULSAM corresponds to the optional stage `fold_Γ?` (i.e., **explicitly optional** and never hidden inside `score/compare/select`).

**60‑second script for engineer-managers.**
> “If you’re about to average, sum, or otherwise compress multiple measures into one, stop. Ask: (i) do we have a declared Γ‑fold policy and SCP legality, (ii) are the measures admissible and scale-compatible, (iii) what do we do if evidence is missing? If you cannot answer with explicit pins/refs, you are not folding — you are smuggling an assumption. Use ULSAM’s `Fold_Γ`, record the effective Γ‑fold and contributor set, and keep the fold as an explicit step.”
### Problem frame (normative)

Within CHR, teams frequently need an **explicit aggregation step** (Γ‑fold) to produce an aggregated measure that is later consumed by comparison and/or selection. Without a dedicated mechanism boundary, aggregation tends to:
- leak into scoring (“the score function also averages everything”),
- leak into selection (“the selector silently computes a scalar”),
- become an “implementation default” rather than a declared policy,
- violate scale legality (especially via ordinal arithmetic or unit-mixing),
- become unauditable (“what exactly got folded, and under what evidence posture?”).
### Problem (normative)

How do we define an aggregation step that:
1) is **explicit** (separate from scoring/comparison/selection),  
2) is **scale-lawful** and legality-gated (`CSLC` + `CG‑Spec.SCP`),  
3) is **Γ‑fold-policy-bound** (`CG‑Spec.Γ_fold` or explicit override),  
4) is **evidence-gated** with tri‑state guards (no `unknown → 0/false` coercions),  
5) is **auditable** (editions, effective fold, contributor surface),  
6) preserves **kernel stability** while allowing SoTA evolution via wiring,  
7) remains **didactically readable** (one owner pattern; no scavenger hunt).
### Forces (normative)

- **Lawfulness vs convenience.** The most “convenient” aggregation (e.g., weighted sums) is often illegal across scales/units; lawful folds require explicit constraints.
- **Explicitness vs brevity.** A single scalar is short to discuss, but expensive in hidden assumptions.
- **Kernel stability vs method evolution.** Aggregation methods evolve; the kernel must not.
- **Evidence gating vs “always return a number.”** The mechanism must support abstain/degrade rather than coercion.
- **Optional stage vs pipeline clarity.** `fold_Γ?` is optional in CHR protocols; optionality must be explicit (not implicit “sometimes scoring folds”).
- **Auditability vs minimal overhead.** Recording contributor sets and effective pins adds overhead but prevents semantic drift.
- **Cross-context reuse vs locality.** Cross-context folds must respect Transport discipline (Bridge+CL/ReferencePlane) and penalty routing to `R_eff`.
- **P2W separation and gate/guard separation.** ULSAM must expose eligibility and audit pins without turning into (i) a WorkPlanning baseline binder or (ii) a legality gate: planned slot fillings belong to P2W artefacts (WorkPlanning), while GateDecision/GateLog live in gate patterns / WorkEnactment (suite protocols remain mechanism‑steps only).
### Solution (normative)

ULSAM is the **canonical scale‑aggregation mechanism** in the CHR suite. It defines:
* a stable **mechanism boundary** (`fold_Γ?` is a stage with its own operation and eligibility predicate),
* a stable **SlotKind surface** (via the suite lexicon),
* a **tri‑state admissibility guard** (fail‑closed on missing legality/evidence),
* and an **audit minimum** (edition pins + effective Γ‑fold identity + crossing policy ids when transport occurs).

Method semantics (“which aggregation family to use”) remain out of suite core: they belong in SoTA packs (`G.2`) and wiring‑only extension modules (`GPatternExtension` blocks), while ULSAM remains the stable mechanism boundary.

#### Mechanism.Intension (canonical; normative)

Archetypal Grounding — **Mechanism.Intension** (normative).

This is the canonical `U.Mechanism.Intension` for `ULSAM.IntensionRef` and is intended to be cited by CHR suite artifacts and by any wiring layers.

* **Scope note:** this intension is an **instance** authored to the `U.Mechanism.Intension` shape owned by `A.6.1`. It defines only the mechanism’s semantic surface (slots/ops/laws/guards/audit). It does **not** bind project‑specific pins (P2W), and it does **not** emit GateDecision/GateLog or publish/telemetry steps; it emits `Audit` pins and a tri‑state guard only.

* **IntensionHeader:** `id = ULSAM`, `version = 1.0.0`, `status = stable`.
* **IntensionRef:** `ULSAM.IntensionRef` (canonical target for the suite member named in `A.19.CHR:4.2`).
* **Tell.** Explicit **Γ‑fold** over admitted measures — no hidden aggregation inside scoring/comparison/selection.
* **Purpose:** explicit **Γ‑fold** (and, when declared, time‑fold) over admitted measures — no hidden aggregation inside scoring/selection.
* **Imports:** `G.0 (CG‑Spec.Γ_fold, CG‑Spec.SCP, CG‑Spec.MinimalEvidence)`, `A.18 (CSLC)`, `A.19.CN (CN‑Spec.acceptance + aggregation routing)`, `A.6.5 (slot discipline)`, `B.3 (Γ‑fold defaults for R_eff, incl. WLNK)`, `A.19.CHR:4.2.1 (CHR SlotKind Lexicon)`.

* **SubjectBlock:**
  * **SubjectKind:** `ScaleAggregation` (Γ‑fold).
  * **BaseType:** `U.Measure`.
  * **SliceSet:** `U.ContextSliceSet`.
  * **ExtentRule:** aggregation ranges over **admitted** measure sets in the active context slice (admission routed by `CNSpecSlot.acceptance`); legality is delegated to `CG‑Spec.Γ_fold` and `CG‑Spec.SCP`.
  * **ResultKind?:** `U.Measure`.

* **SlotIndex** (derived projection from `SlotSpecs` / guard SlotSpecs; uses `A.19.CHR:4.2.1` SlotKind tokens; no independent semantics):
  * `MeasureSetSlot : ⟨ValueKind = U.Set (of U.Measure), refMode = ByValue⟩`,
  * `CNSpecSlot : ⟨ValueKind = CN‑Spec, refMode = CNSpecRef⟩`,
  * `CGSpecSlot : ⟨ValueKind = CG‑Spec, refMode = CGSpecRef⟩`,
  * `GammaFoldSlot : ⟨ValueKind = ΓFold, refMode = ΓFoldRef⟩`,
  * `ContextSlot : ⟨ValueKind = U.BoundedContext, refMode = U.BoundedContextRef⟩`,
  * `MinimalEvidenceSlot? : ⟨ValueKind = MinimalEvidence, refMode = MinimalEvidenceRef⟩` (optional override; otherwise cite `CGSpecSlot.MinimalEvidence`),
  * `AggregatedMeasureSlot : ⟨ValueKind = U.Measure, refMode = ByValue⟩`,
  * `ContributorSetSlot? : ⟨ValueKind = U.Set (of U.Measure), refMode = ByValue⟩` (optional but recommended for auditability).

* **OperationAlgebra** (suite stage = `fold_Γ?`, per `A.19.CHR:4.5`; canonical stage‑op = `Fold_Γ`):
  * `Fold_Γ(MeasureSetSlot, CNSpecSlot, CGSpecSlot, GammaFoldSlot, ContextSlot, MinimalEvidenceSlot?) → (AggregatedMeasureSlot, ContributorSetSlot?)`.

* **LawSet** (minimum; explicit, scale‑lawful folding only):
  1. **No hidden aggregation:** any Γ‑fold MUST be explicit as `Fold_Γ` (no folding hidden inside `Score/Compare/Select`).
  2. **Scale‑lawfulness:** aggregation MUST be CSLC‑lawful and admissible under `CGSpecSlot.SCP`; ordinal arithmetic (e.g., means on ordinal ranks) is forbidden unless explicitly allowed by the relevant CSLC fragment.
  3. **Γ‑fold legality:** `GammaFoldSlot` MUST resolve to either `CGSpecSlot.Γ_fold` or an explicitly pinned override (CAL policy) — never an implicit “implementation default”.
  4. **Evidence‑gated folding:** if evidence is insufficient/unknown, folding MUST follow tri‑state guard behavior and MUST NOT silently coerce.
  5. **Contributor accountability (when produced):** when `ContributorSetSlot?` is produced, it MUST be a subset of the admitted portion of `MeasureSetSlot`, and `AggregatedMeasureSlot` MUST be the result of applying the effective Γ‑fold to that contributor subset (no “hidden contributors”).
  6. **No implicit UNM:** ULSAM MUST NOT silently normalize/rescale to “force comparability.” If establishing a compare‑on‑invariants surface requires UNM for the measures being folded, UNM MUST appear as an explicit stage (Uses + pins) upstream; ULSAM itself remains folding‑only.

* **AdmissibilityConditions** (tri‑state guard; fail‑closed on missing legality/evidence):
  * `FoldEligibility_Γ(MeasureSetSlot, CNSpecSlot, CGSpecSlot, GammaFoldSlot, ContextSlot, MinimalEvidenceSlot?) → GuardDecision ∈ {pass|degrade|abstain}`.
  * `pass` requires: (i) `CGSpecSlot` provides the legality surface (`SCP` and `Γ_fold`), (ii) `GammaFoldSlot` is admissible under `CGSpecSlot.Γ_fold` routing (or explicit override), and (iii) the measure set is admitted (per `CNSpecSlot.acceptance`) and scale‑compatible for the intended fold.
  * Define `EffectiveMinimalEvidence := (MinimalEvidenceSlot if present, else CGSpecSlot.MinimalEvidence)`; the guard MUST evaluate evidence against `EffectiveMinimalEvidence`.
  * If evidence is missing/unknown under `EffectiveMinimalEvidence`, the guard MUST NOT return `pass` (return `degrade` or `abstain` per the effective failure behavior; record the basis in Audit).

* **Applicability:**
  * Intended to be used only when a fold is explicitly required (and never as a hidden sub‑step of scoring/comparison/selection).
  * Applicable only when `CGSpecSlot` provides the legality surface (`Γ_fold` and `SCP`) (fail‑closed otherwise).
  * If comparability routing for the measures being folded is UNM‑based, applicability presumes an explicit upstream UNM stage; ULSAM does not “make measures comparable” by itself.

* **Transport:** Bridge+CL/ReferencePlane only; penalties route to **`R_eff` only**.
* **Γ_timePolicy:** `point` by default; time‑fold requires explicit windowing policy (if an explicit operator is needed, introduce `FoldTime_Γ` as an `⊑⁺` extension using `GammaTimeRuleSlot` from the CHR SlotKind Lexicon).
* **PlaneRegime:** values live on **episteme ReferencePlane**; on plane crossings apply **CL^plane** policy; penalties → **`R_eff` only**.

* **Audit:**
  * MUST record: `CNSpecRef.edition`, `CGSpecRef.edition`, and the effective Γ‑fold (`ΓFoldRef`).
  * If `GammaFoldSlot` resolves via an explicit override, SHOULD record the override’s `policy-id` (or its stable ref) alongside `ΓFoldRef`.
  * When `MinimalEvidenceSlot?` is present, MUST record `MinimalEvidenceRef`; otherwise MUST cite `CGSpecSlot.MinimalEvidence` as the effective evidence policy.
  * When `ContributorSetSlot?` is produced, SHOULD record it (or an id reference) as an auditable explanation surface.
  * SHOULD record: any explicit UNM invocation ids/pins when folding presumes a compare‑on‑invariants surface established by UNM.
  * SHOULD record: any Bridge/CL/ReferencePlane ids when `Transport` was invoked.
  * SHOULD record: the evaluated `GuardDecision` (especially when not `pass`) and, when applicable, the effective evidence policy / failure behavior reference used to justify `degrade|abstain`.
#### Interpretation notes (didactic, informative)

- **Γ‑fold is a declared contract surface, not an implementation choice.** In FPF terms, “how we fold” is a **policy-level commitment**: `GammaFoldSlot` MUST be resolvable to `CGSpecSlot.Γ_fold` routing or an explicit pinned override. If you cannot cite it, you do not have a fold — you have a hidden default.
- **ULSAM is not normalization.** ULSAM does not establish comparability by itself: it does not normalize, rescale, or “align units” as a hidden convenience. If a compare‑on‑invariants surface is required, invoke UNM explicitly upstream and cite the effective pins in Audit.
- **Prefer vector semantics when possible.** If you do not strictly need one aggregated measure, keep measures separate and let `CPM` + `SelectorMechanism` operate on a partial order (set-return semantics). A fold is a lossy compression; treat it as such.
- **Contributor surfaces are not “nice-to-have” in practice.** `ContributorSetSlot?` is optional in the signature, but operationally it is the simplest way to prevent “mystery rollups” and to preserve an explanation surface.
- **Time-fold is a specialization, not a loophole.** The base ULSAM declares `Γ_timePolicy` and allows time-fold only via explicit windowing policy. If a project needs an explicit `FoldTime_Γ` operator, introduce it as an `⊑⁺` extension consistent with `A.6.1:4.2.1` (no mutation of inherited ops; no SlotKind drift).
  - Use the suite lexicon token `GammaTimeRuleSlot` for the additional windowing rule input; do not overload `ContextSlot` or `GammaFoldSlot` to smuggle time semantics.
### Archetypal grounding (didactic, informative)

#### Tell

- In CHR, ULSAM exists to keep the stage `fold_Γ?` **explicit**: if a pipeline wants folding, it invokes `ULSAM.Fold_Γ`; otherwise it skips the stage. Folding MUST NOT be smuggled into `USCM.Score`, `CPM.Compare`, or `SelectorMechanism.Select`.
- In `U.System` decision contexts: ULSAM is where you explicitly fold multiple admitted measures (e.g., multiple risk coordinates) into an aggregated measure **only when the contract declares that fold**.
- In `U.Episteme` contexts: ULSAM is where you explicitly fold an evidential or measurement set into an aggregated coordinate (e.g., an assurance measure), typically using a conservative Γ‑fold (e.g., weakest-link) when folding reliability-like quantities.
#### Show

**Scenario A (manager-facing): “roll up” a multi-metric readiness into one reliability-like coordinate.**
1. A CHR pipeline produces a set of admitted measures (post-`USCM` or directly from characteristic measures):  
   `MeasureSetSlot = {m₁, m₂, …, m_k}`.
2. The team wants a single “readiness” measure `m_ready` to be used as an input to later comparison/selection.  
   The temptation is to “just average” or “just do weighted sum”.
3. ULSAM forces three explicit questions before folding:
   - **Legality:** Is the fold admissible under `CGSpecSlot.SCP` (units/scale) and `CGSpecSlot.Γ_fold` (declared fold kinds)?
   - **Evidence:** Is the evidence posture sufficient under `MinimalEvidence`? If not, do we `degrade` or `abstain`?
   - **Policy identity:** What is the identity of the fold (which ΓFoldRef, which edition)?
4. Only then, the pipeline performs:  
   `Fold_Γ(MeasureSetSlot, CNSpecSlot, CGSpecSlot, GammaFoldSlot, ContextSlot, MinimalEvidenceSlot?) → (AggregatedMeasureSlot, ContributorSetSlot?)`.  
   The audit records `ΓFoldRef` and (optionally) the contributor surface.

**Scenario B (engineer-facing): cross-context aggregation with explicit Transport discipline.**
- A project tries to fold measures that originate from different contexts. ULSAM does not “make it fine”; it requires Transport to be explicit (Bridge+CL/ReferencePlane) and routes penalties to `R_eff` only. If the project cannot cite Bridge ids and the effective congruence policy, folding is non-admissible (fail-closed by guard).
### Bias-Annotation (informative)

This pattern intentionally biases CHR authoring toward **explicit aggregation boundaries** and against “scalarization by convenience”.

* **Gov (governance).** Bias toward auditable folds (editions, effective ΓFoldRef, contributor surfaces). Risk: perceived overhead. Mitigation: keep the signature stable and move method specifics to SoTA wiring.
* **Arch (architecture).** Bias toward keeping `fold_Γ` a distinct stage (no leakage into score/compare/select). Risk: longer pipelines. Mitigation: the stage is explicitly optional (`fold_Γ?`) and can be omitted when not required.
* **Onto/Epist (ontology/epistemology).** Bias toward scale-lawful aggregation (no illegal ordinal arithmetic; SCP-bound). Risk: forbids many informal “single-number” habits. Mitigation: use partial orders and set-return selection unless a lawful fold is truly needed.
* **Prag (practice).** Bias toward policy-bound defaults (no “implementation default Γ‑fold”). Risk: teams must name policies. Mitigation: provide conservative defaults in `CG‑Spec.Γ_fold` and keep overrides explicit.
* **Did (didactic).** Bias toward one-owner readability (this pattern is the owner; no scavenger hunt). Risk: duplication temptation elsewhere. Mitigation: enforce Tell+Cite canonicalization.
### Conformance Checklist (normative)

| ID | Requirement |
|----|-------------|
| **CC‑A19ULSAM‑0** | **MechAuthoring discipline:** the canonical ULSAM Mechanism.Intension in `A.19.ULSAM:4.1` MUST satisfy `A.6.1` `U.MechAuthoring` and the relevant `CC‑UM.*` checks; this pattern does not override the `U.Mechanism.Intension` shape. |
| **CC‑A19ULSAM‑1** | **Single owner:** the canonical ULSAM `U.Mechanism.Intension` MUST be owned by `A.19.ULSAM:4.1`. Any other ULSAM “card” text MUST be reduced to Tell+Cite referencing this owner section. |
| **CC‑A19ULSAM‑2** | **No hidden aggregation:** any Γ‑fold MUST be explicit as `ULSAM.Fold_Γ` (no folding hidden inside `Score/Compare/Select`, including inside `USCM/CPM/SelectorMechanism`). |
| **CC‑A19ULSAM‑3** | **Scale-lawfulness:** a conformant ULSAM fold MUST be CSLC-lawful and admissible under `CGSpecSlot.SCP`. Ordinal arithmetic is forbidden unless explicitly allowed by the relevant CSLC fragment. |
| **CC‑A19ULSAM‑4** | **Γ‑fold legality:** a conformant ULSAM publication MUST ensure `GammaFoldSlot` resolves to `CGSpecSlot.Γ_fold` or an explicitly pinned override (CAL policy). “Implementation default fold” is non-conformant. |
| **CC‑A19ULSAM‑5** | **Evidence gating:** a conformant ULSAM publication MUST guard folding via `FoldEligibility_Γ` with `GuardDecision ∈ {pass|degrade|abstain}`; missing/unknown evidence MUST NOT yield `pass`. If `MinimalEvidenceSlot?` is absent, the guard MUST evaluate against `CGSpecSlot.MinimalEvidence`. |
| **CC‑A19ULSAM‑6** | **SlotKind discipline:** SlotKind tokens used in the ULSAM intension MUST come from the CHR SlotKind Lexicon (`A.19.CHR:4.2.1`). New SlotKinds require lexicon extension first. |
| **CC‑A19ULSAM‑7** | **Audit surface:** Audit MUST record `CNSpecRef.edition`, `CGSpecRef.edition`, and the effective `ΓFoldRef`; and MUST record `MinimalEvidenceRef` when overridden (else cite `CGSpecSlot.MinimalEvidence`). |
| **CC‑A19ULSAM‑8** | **Contributor accountability:** when `ContributorSetSlot?` is produced, it SHOULD be recorded (or referenced by stable id) as an explanation surface for what contributed after legality/evidence gating. |
| **CC‑A19ULSAM‑9** | **P2W separation:** planned baseline artefacts MUST bind `ΓFoldRef`/`MinimalEvidenceRef`/editions (A.15.3 + CHR P2W hook); these bindings MUST NOT be invented as run-time decisions inside the suite protocol. |
| **CC‑A19ULSAM‑10** | **Gate/guard separation:** ULSAM MUST NOT embed GateDecision/GateLog or publish/telemetry operations in the `fold_Γ?` stage; admissibility is via `FoldEligibility_Γ` (tri‑state) and run‑time observability via `Audit` pins only. |
| **CC‑A19ULSAM‑11** | **No implicit UNM:** ULSAM MUST NOT silently normalize/rescale to force comparability. When a compare‑on‑invariants surface is required, UNM MUST be invoked explicitly upstream and SHOULD be cited via stable ids/pins in `Audit`. |
### Common anti-patterns (didactic, informative)

| Anti-pattern | Symptom | Why it fails in FPF | How to avoid |
|---|---|---|---|
| Hidden rollup inside scoring | “Our score already averages everything.” | Violates the “no hidden aggregation” law and hides Γ‑fold identity. | Keep `USCM.Score` scoring-only; use `ULSAM.Fold_Γ` as an explicit stage. |
| Averaging ordinals | Means on ranks/levels, or unitless mixing | Illegal under CSLC/SCP unless explicitly allowed. | Keep ordinal outputs as ordinal; compare via CPM; if folding is required, use an ordinal-legal fold explicitly declared by Γ_fold policy. |
| Implementation default Γ‑fold | “If not specified, we use X.” | Breaks replayability and violates Γ‑fold legality. | Require `GammaFoldSlot` to resolve to `CGSpecSlot.Γ_fold` or pinned override. |
| Coercing unknown to a number | “Missing metric becomes 0.” | Violates tri-state guard discipline; silently changes meaning. | Use `FoldEligibility_Γ` with `{pass|degrade|abstain}` and record the effective evidence policy. |
| Cross-context folding without Transport | Folding measures from different contexts “as-is” | Violates Bridge-only discipline and penalty routing to `R_eff`. | Make Transport explicit (Bridge+CL/ReferencePlane) and record ids in Audit. |
| Treating fold_Γ as mandatory | Always folding even when not needed | Unnecessary lossy compression; reduces set-return semantics. | Keep `fold_Γ?` explicitly optional in protocols; prefer vector+CPM+Selector when possible. |
### Consequences (didactic, informative)

| Benefits | Costs / trade-offs |
|---|---|
| Clear separation of concerns: folding is explicit and auditable. | Adds an explicit step; authors must name Γ‑fold policies. |
| Prevents illegal “single-number” shortcuts (ordinal means, unit mixing). | Some familiar heuristics become non-conformant. |
| Improves evolvability: folding methods evolve via wiring, while the kernel signature stays stable. | Requires discipline to keep method specifics out of kernel prose. |
| Supports evidence-aware aggregation via tri-state guards. | Guard + Audit expectations may feel heavier than ad-hoc aggregation. |
### Rationale (didactic, informative)

Aggregation is a **semantic commitment**: it changes a set/vector of measures into a single measure, and therefore changes what later comparison/selection can legitimately claim. In CHR, that commitment must be explicit, legality-gated, and auditable.

Keeping ULSAM as its own mechanism preserves:
- the strict boundary between **method choice** (SoTA packs) and **kernel signature** (Mechanism.Intension),
- the strict boundary between **planned baseline** (pins chosen in WorkPlanning) and **run-time audit** (what actually executed),
- and the engineer-facing clarity that “we folded here, not everywhere”.
### Known uses (didactic, informative)

- CHR suite optional stage `fold_Γ?` (explicitly optional; never hidden).
- Folding trust/assurance-like quantities (conservative Γ‑folds such as WLNK as declared defaults under trust policy).
- Any project that requires an auditable “roll-up” measure prior to lawful comparison/selection.
- In transduction graphs (E.18 / TGA): ULSAM appears as a mechanism instance node whose `ΓFoldRef` / `MinimalEvidenceRef` are bound in planned baseline (P2W), while Audit records the effective pins used at run time.
### Builds on / Relates to

**Builds on (cite, don’t duplicate).**
- `A.6.1` (`U.Mechanism.Intension` shape; `U.MechAuthoring`; CC‑UM discipline).
- `A.6.5` (slot discipline; SlotIndex as a projection).
- `A.19.CHR` (CHR suite boundary; stage `fold_Γ?`; CHR SlotKind Lexicon).
- `G.0` (`CG‑Spec.Γ_fold`, `CG‑Spec.SCP`, `CG‑Spec.MinimalEvidence`; legality gate).
- `A.18` (CSLC).
- `B.3` (Γ‑fold defaults for `R_eff`, including WLNK; trust skeleton).

**Relates to (coordination, not ownership).**
- `A.19.CN` (`CN‑Spec`), via `CNSpecSlot.acceptance` gating in admissibility.
- `A.19.UINDM` / `USCM` / `CPM` / `SelectorMechanism` as adjacent CHR stages (Uses contour; no semantic ownership transfer).
- Part G SoTA packs and wiring (`G.2` + `G.*:Ext.*`) for method family selection and edition/policy binding.
### SoTA-Echoing (informative; not a center of gravity)

SoTA here is treated as **method-family material to be wired** (ideally curated as `G.2` claim sheets and connected via `G.*:Ext.*` wiring), not as kernel semantics. ULSAM’s contribution is the stable boundary: explicit, legal, auditable folding.

**SoTA vs popular note.** This section records alignment to post‑2015 evidence‑backed practice. It is **not** a mandate to use fashionable methods; method semantics stay in SoTA packs (`G.2`) and wiring modules, while this pattern fixes the stable mechanism boundary.

**Pack note (Phase‑3):** this pattern does not currently cite a ULSAM‑specific `G.2` SoTA pack/ClaimSheet. If/when such a pack is introduced, replace the bibliographic pointers below with the pack’s `ClaimSheetId` citations, keeping the mechanism semantics unchanged.

| SoTA practice pointer (post‑2015+) | Primary source | Where it connects | Adoption status |
|---|---|---|---|
| Permutation‑invariant set aggregation as a *method family* (set → summary) | Zaheer et al., “Deep Sets” (2017) [1] | Candidate `ΓFold` families can include permutation‑invariant folds; ULSAM keeps them legality‑gated and policy‑pinned. | **Adapt** (keep legality/pins explicit; do not treat learned folds as implicit defaults). |
| Attention-based permutation‑invariant set aggregation as a *method family* | Lee et al., “Set Transformer” (2019) [4] | Alternative learnable set folds (pooling by attention); still requires explicit policy binding and legality gating. | **Adapt** (publish as method family in SoTA pack; pin editions/policies; keep kernel unchanged). |
| Robust aggregation under uncertainty/outliers as a *policy-selectable fold family* | Rahimian & Mehrotra, “Distributionally Robust Optimization: A Review” (2019) [2] | Treat “worst‑case / risk‑aware” folds as explicit Γ‑fold options (policy-bound), not as hidden safety margins. | **Adapt** (policy‑bound and SCP/CSLC‑gated). |
| Single‑owner discipline for architectural statements | ISO/IEC/IEEE 42010:2022 [3] | Supports the “one semantic owner” rule: ULSAM intension content lives here; other places cite. | **Adopt** (principle-level; applied to FPF pattern ownership). |

**Reminder.** “SoTA” means best known methods; it is not a synonym for “popular right now”. SoTA material should be curated and versioned in SoTA packs and connected via wiring modules, not embedded into kernel mechanism signatures.

[1]: https://arxiv.org/abs/1703.06114 "Zaheer et al., Deep Sets, 2017"
[2]: https://arxiv.org/abs/1908.05659 "Rahimian & Mehrotra, Distributionally Robust Optimization: A Review, 2019"
[3]: https://www.iso.org/standard/74393.html "ISO/IEC/IEEE 42010:2022 — Systems and software engineering — Architecture description"
[4]: https://arxiv.org/abs/1810.00825 "Lee et al., Set Transformer, 2019"
### A.19.ULSAM:End
## Unified Comparison Mechanism (CPM)

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

### At a glance (didactic, informative)

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
### Problem frame

FPF’s Characterization (CHR) suite treats comparison as a **distinct** mechanism stage (`compare`) with suite‑wide obligations that forbid hidden scalarization/totalization, require tri‑state guards, and enforce legality surfaces for numeric operations. Comparison must therefore be described as:

* a **mechanism** (in the `U.Mechanism.Intension` sense, per `A.6.1` / slot discipline `A.6.5`),
* that is **suite‑conformant** (per CHR obligations and protocol closure in `A.19.CHR`),
* and **contract‑surface‑respecting** (comparability and admission are routed via `CN‑Spec` and legality is gated via `CG‑Spec` rather than re‑invented locally).

Within suite protocols, CPM appears as the explicit `compare` stage: it consumes admitted left/right profiles (scores and/or folded measures **when** those upstream stages are present) and produces a lawful, auditable **comparison relation** that downstream selection can consume without CPM smuggling selection or scoring semantics into “comparison”.
### Problem

Engineering teams frequently need to compare two options (designs, methods, vendors, trajectories, hypotheses, etc.) across multiple measures and under incomplete evidence. Without a canonical comparison mechanism, teams predictably fall into one or more of these failure modes:

* **Hidden scalarization:** forcing a single number (or a single winner) from multi‑criteria reality, erasing incomparability and ties.
* **Silent totalization:** inventing an implied total order by convenience tie‑breakers or implicit thresholds, even when only a partial order is warranted.
* **Illegal arithmetic:** comparing across measures using operations that are not scale‑lawful (CSLC‑violating) or not admitted by the declared legality frame.
* **Comparator drift:** “the comparator” exists only as prose or code intuition; different teams compare “the same thing” differently because the comparator spec is not explicit and edition‑pinned.
* **Unknown coercion:** missing/unknown evidence is coerced into an outcome (e.g., “treat missing as equal”, “treat unknown as worse”), producing comparisons that look decisive but are epistemically unsafe.
* **Cross‑context leakage:** comparing across contexts/planes without explicit bridges, CL routing, or penalties discipline, producing misleading outcomes that ignore transport costs and reference plane constraints.

CPM exists to make the comparison act explicit, legality‑gated, set‑valued, and auditable—so downstream selection can remain a separate, policy‑bound step.
### Forces

1. **Usability vs correctness:** engineers want a “simple compare” function; correctness demands explicit legality, explicit comparator choice, and explicit handling of incomparability/unknown.
2. **Total order convenience vs partial order truth:** total orders simplify downstream selection; partial orders are often the faithful representation (especially in multi‑criteria settings).
3. **Evolvability vs stability:** comparator methods evolve (SoTA churn); kernel semantics and slot surfaces must remain stable and wiring‑friendly.
4. **Auditability vs speed-of-discussion:** teams want fast decisions; FPF requires audit pins and explicit edition/policy references for reproducibility.
5. **Cross‑context reasoning vs transport discipline:** comparisons across contexts are valuable, but they require bridge‑only crossings and explicit penalty routing, not implicit “normalization by hand”.
6. **Avoiding “second centers of gravity”:** mechanism semantics must have a single owner; otherwise the suite, `A.6.1` archetypes, and Part‑G wiring drift apart.
### Solution

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

#### Mechanism.Intension (canonical; normative)

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
#### Interpretation notes — informative

* **Set‑valued output is the default, not a loophole.** “Set‑valued” means CPM preserves incomparability/ties/partiality as first‑class outcomes; it does not authorize silent post‑processing into a scalar or a single winner.
* **Total orders are allowed only if declared by the comparator.** If a `ComparatorSpec` defines a total order, CPM still outputs a (singleton) set of relation tokens; the totalization is a property of the declared comparator, not an implicit kernel default.
* **Normalization is not smuggled into comparison.** If `CN‑Spec.comparability` routes comparison through normalization‑based invariants, that dependence must be represented explicitly via the suite protocol and/or explicit Uses contours (CPM consumes admitted profiles; it does not silently normalize them).
* **Thresholds and tie‑breakers are never “kernel constants.”** If thresholds exist, they belong to explicit policies/specs (e.g., `ComparatorSpec`, `AcceptanceClauses`), edition‑pinned and auditable; not to hidden constants inside CPM.
### Archetypal Grounding — informative

#### Tell

Think of CPM as an **auditable relation‑builder**:

* Input: “two admitted profiles + an explicit comparator spec + declared legality/evidence surfaces”
* Output: “a **set‑valued** relation outcome that preserves incomparability and uncertainty”

The key didactic boundary is: **CPM compares; it does not decide.**
#### Show (U.System) — comparing two supplier options without faking a total order

A program manager compares Supplier‑A vs Supplier‑B for a safety‑critical component. The team tracks a profile of measures (cost, lead time, defect rate, assurance, sustainability), but not all measures are strictly comparable across regions (different reporting regimes, different units).

* The project has a declared `CN‑Spec` (admission + comparability routing) and a declared `CG‑Spec` that lists lawful comparators in `ComparatorSet` and evidence rules in `MinimalEvidence`.
* The comparator chosen is explicit: `ComparatorSpecSlot = ParetoDominanceComparatorSpecRef@edition` (declared in `CG‑Spec.ComparatorSet`).
* CPM runs `Compare(...)`.

  * If Supplier‑A is better in cost but worse in defect rate and incomparable on assurance due to missing evidence, CPM does **not** invent “A wins” or “A loses”.
  * The guard returns `degrade` or `abstain` (per evidence policy), and the `ComparisonResultSlot` preserves the partial nature of the relation.
* The downstream `SelectorMechanism` can then return a portfolio (e.g., keep both suppliers in the candidate set) rather than forcing a single winner by hidden tie‑break rules.
#### Show (U.Episteme) — uncertainty‑aware comparison with set‑valued outcomes

A research lead compares two proposed methods for a system component. Both methods have performance estimates with uncertainty bounds (e.g., distributions or prediction intervals). The team uses a SoTA uncertainty quantification package (post‑2015 conformal families are a common example) to avoid overstating confidence.

* `USCM` produces score profiles that are interval‑valued (or otherwise uncertainty‑annotated) rather than point estimates.
* The chosen comparator is uncertainty‑aware and declared as a `ComparatorSpec` (edition‑pinned) in `CG‑Spec.ComparatorSet`.
* CPM compares the two profiles and returns a set of relation tokens (e.g., “not worse”, “incomparable under evidence”, “abstain”), rather than forcing a numeric margin.
* The audit records the effective comparator edition and evidence policy, so later readers can reproduce *why* a comparison abstained or degraded (instead of mistaking “missing evidence” for “equality”).
### Bias-Annotation — informative

CPM is a comparison *kernel*; it does not remove bias by itself, but it prevents the most common bias‑amplifying failure modes (hidden thresholds, hidden tie‑breakers, unknown coercion).

Typical bias risks and mitigations:

* **Comparator choice encodes value judgments.** Weights, priority orders, thresholds, and “tie‑break” conventions can encode organizational bias. CPM forces these to live in explicit, edition‑pinned `ComparatorSpec`/policy artifacts rather than in invisible code or informal reasoning.
* **Missing evidence is rarely random.** If evidence is systematically missing for certain contexts/groups, naive “unknown → worse” is a bias amplifier. CPM’s tri‑state guard avoids coercion; but teams must still define policy‑bound failure behavior and be explicit when abstention is acceptable.
* **Cross‑context comparisons can embed structural unfairness.** CPM enforces bridge‑only transport and penalty routing (`R_eff` only), making “comparisons across worlds” explicit instead of silently assuming commensurability.
* **Overconfidence via scalarization.** Collapsing partial orders into scalars often overstates certainty and hides tradeoffs. CPM makes set‑valued outcomes first‑class, so the human/managerial decision can remain honest about tradeoffs.
### Conformance Checklist

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
### Common Anti‑Patterns and How to Avoid Them

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
### Consequences

* **Improved usability (didactic):** CPM gives a single, engineer‑readable place to learn “what lawful comparison means” and what it does *not* mean.
* **Higher auditability:** comparison outcomes can be traced to comparator edition, legality surfaces, and evidence policies.
* **Reduced semantic drift:** teams cannot silently shift from Pareto to lexicographic to “weighted sum” without changing explicit comparator specs and pins.
* **Explicit tradeoffs:** set‑valued outcomes force downstream reasoning to acknowledge incomparability and uncertainty rather than hiding them.
* **Cost:** downstream consumers (notably selection) must handle sets, abstentions, and partial orders explicitly. This is intentional: it moves complexity from hidden heuristics into explicit policy‑bound mechanisms.
### Rationale

1. **Set‑valued by design:** partial orders are common in multi‑criteria settings; pretending they are total creates false certainty and brittle decisions.
2. **ComparatorSet gating:** declaring what comparisons are legal (and under what scale/evidence rules) prevents “algorithm by convenience”.
3. **Tri‑state guards:** explicit `pass|degrade|abstain` preserves epistemic honesty: unknown is not silently converted into an outcome.
4. **Strict distinction:** separating compare from score and select prevents hidden semantic coupling and improves evolvability (methods change via wiring; kernel stays stable).
5. **Single‑owner canonicalization:** keeping one semantic owner eliminates “multiple near‑identical cards” that drift apart and destroy usability.
### SoTA-Echoing

**SoTA vs popular note.** This section records alignment to post‑2015 evidence‑backed practice. It is **not** a mandate to use fashionable methods; method semantics stay in SoTA packs (`G.2`) and wiring modules, while this pattern fixes the stable CPM mechanism boundary.

**Pack note (Phase‑3).** If/when a CPM‑specific `G.2` SoTA pack/ClaimSheet is introduced, prefer citing the pack’s `ClaimSheetId`(s) over raw bibliographic pointers below, keeping CPM’s kernel semantics unchanged.

| SoTA practice pointer (post‑2015)                                                                                                   | How it connects to CPM                                                                                                                                           | Adoption status in FPF                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Fair ranking / constrained ranking** (e.g., Zehlike et al., 2017; Biega et al., 2018)                                             | Reinforces the “no hidden tie‑breaks/thresholds” stance: fairness constraints belong in explicit comparator/acceptance policies, not as silent kernel constants. | Integrate via `ComparatorSpec` editions in `CG‑Spec.ComparatorSet` + policy pins; CPM remains unchanged.              |
| **Uncertainty‑aware / set‑valued inference** (e.g., Romano et al., 2019; Barber et al., 2021)                                       | Supports “comparison may abstain” and “set‑valued outcomes are honest”: uncertain profiles should not be coerced into point‑comparisons.                         | Model as comparator families (or supporting method families) packaged in `G.2`; wired into declared `ComparatorSpec`. |
| **Differentiable sorting / learned comparators** (e.g., Grover et al., 2019; Blondel et al., 2020)                                  | When comparators are learned, explicit comparator specs and edition pins become even more critical for auditability and drift control.                           | Treated as method implementations behind `ComparatorSpec` (wiring‑only in Part G); CPM kernel stays stable.           |
| **Robust multi‑criteria decision support under partial orders** (modern robust outranking / preference‑learning variants post‑2015) | Emphasizes preserving incomparability and explicitly encoding thresholds/preferences as declared artifacts.                                                      | Packaged as comparator families; legality and evidence remain gated by `CG‑Spec`.                                     |
### Relations

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
### A.19.CPM:End
## Unified Selection Kernel, SelectorMechanism

> **Type:** Architectural (A)
> **Status:** Stable
> **Normativity:** Normative (unless explicitly marked informative)
> **Placement:** Part A / CN‑Spec cluster (A.19) / CHR mechanism owner patterns (Phase‑3)
> **Source:** FPF / CHR Phase‑3 mechanism owner patterns
> **Modified:** 2026‑01‑20
>
> **Semantic owner note (Phase‑3 canonicalization):** this pattern is the **designated single semantic owner** of the canonical `U.Mechanism.Intension` for `SelectorMechanism.IntensionRef` (CHR suite stage `select`). This matches the “single‑owner route map” discipline (`E.20:4.2`): mechanism‑intension semantics live in an explicitly designated mechanism‑owner pattern.
> `A.6.1` remains the owner of the **template** of `U.Mechanism.Intension` and the `U.MechAuthoring` discipline; this pattern owns the **SelectorMechanism‑specific** slots/ops/laws/admissibility/applicability/transport/plane/time/audit obligations for that template (single‑owner at the instance‑semantics level).
>
> **ID continuity note.** When migrating away from any legacy “card location”, preserve public anchors: keep the legacy section heading/ID as a **Tell + Cite stub** (or dock aliases via `F.18`) rather than deleting or silently renaming it.
>
> **Canonicalization hook (ID‑continuity‑safe):** any other appearances of the SelectorMechanism intension content (e.g., a legacy grounding stub in `A.6.1` or suite prose in `A.19.CHR`) SHALL be reduced to a **Tell + Cite** stub pointing to **`A.19.SelectorMechanism:4.1`**, while preserving the original section headings and their public `PatternId:SectionPath` IDs for continuity (alias‑dock legacy tokens rather than deleting them).
> Such stubs MUST NOT restate SlotIndex / OperationAlgebra / LawSet / Admissibility / Audit content (no “second center of gravity” via near‑duplicate prose).
> * **ID‑continuity‑safe:** if content is moved from an earlier location, preserve the earlier heading and its IDs as a stub that cites `A.19.SelectorMechanism:4.1`.
> * **Alias‑dock, don’t break:** if any legacy tokens exist (e.g., a historical `UNSELM` name token), dock them via `F.18` + E.10 rules; do not mint a competing head.
> * **No shadow semantics:** derived summaries MAY be informative, but MUST NOT restate SlotIndex / OperationAlgebra / LawSet / Admissibility / Audit; they may only summarise and cite.

### At a glance — didactic, informative

* **What it is:** a universal **set‑returning** selection kernel: it takes candidates, lawful comparison outcomes, and explicit criteria, and returns a **portfolio set**, not a forced single winner.
* **What it is not:** it is not a hidden scoring model, not a comparator, not a gate, and not a telemetry or publishing step.
* **Why it exists:** to prevent three recurring failure modes: **hidden thresholds**, **silent scalarization**, and **winner‑take‑all defaults** under partial orders and uncertain evidence.
* **How it evolves:** method semantics and SoTA algorithm families connect via `G.2` packs and wiring modules; the kernel signature stays stable and teachable.
* **Suite stage:** `select` (ordering lives only in `A.19.CHR:4.5` / `suite_protocols`; suite membership is a set in `A.19.CHR:4.2`).
* **Inputs (conceptual):** `CandidateSetSlot` + `ComparisonResultSlot` (lawful relation/poset tokens, typically produced by `CPM`) + `CriteriaSlot` + `CNSpecSlot` + `CGSpecSlot` + `ContextSlot` (+ `TaskSignatureSlot?`, + `MinimalEvidenceSlot?` override).
* **Output (conceptual):** `SelectionSlot` = portfolio set (a singleton is allowed **only** when explicitly demanded by criteria or by an explicitly declared upstream total order).
* **Non‑goals:** does **not** normalize (UNM), indicatorize (UINDM), score (USCM), fold (ULSAM), compare (CPM), define acceptance thresholds, publish, or emit telemetry; it is a selection step over already‑lawful inputs.
* **P2W seam:** concrete edition/policy pin bindings (e.g., `TaskSignatureRef@edition(…)`, `CGSpecRef@edition(…)`, evidence overrides) are chosen in planned baseline artefacts (`A.15.3` + `A.19.CHR:4.7.2`); executions only record effective refs/pins in `Audit`.
* **TGA use:** when used as a node type in `E.18 (E.TGA)`, selector instances are chosen in planned baseline artefacts (P2W); this pattern owns the intension that those instances cite.
* **Failure mode:** tri‑state guard (`pass|degrade|abstain`); missing/unknown evidence never coerces to `pass`.
* **Mental model:** `SelectEligibility` gates the step; `Select` applies explicit criteria to set‑valued comparison outcomes; the result is a portfolio set whose “single winner” behavior must be explicit.

---
### Problem frame

FPF’s Characterization (CHR) suite treats selection as a **distinct mechanism boundary** within the suite (authoritative membership: `A.19.CHR:4.2`).
Suite membership is a **set**; order has no semantics. Any intended ordering is expressed only via `suite_protocols` (`A.19.CHR:4.5`), under suite obligations (`A.19.CHR:4.3`).

Within the suite‑closed protocol, `SelectorMechanism` appears as the `select` stage (after lawful comparison; optional stages remain explicitly optional per `suite_protocols`). The kernel’s role is concept‑level and contract‑bound:

* consume **lawful** comparison outcomes without collapsing them into a hidden scalar,
* apply **explicit** criteria and policy routing, and
* return a **set/portfolio** result whose defaults are policy‑bound and auditable.

The kernel uses the CHR suite SlotKind lexicon (`A.19.CHR:4.2.1`) to prevent SlotKind drift across specializations and across SoTA wiring layers.

---
### Problem

Engineering teams regularly need to make “a selection decision” under conditions that are normal in real projects:

* comparisons are partial, multi‑criteria, or set‑valued,
* evidence is incomplete or policy‑gated, and
* different stakeholders ask for different “best” notions.

If selection is not a first‑class mechanism boundary with stable semantics, the same high‑risk drift happens repeatedly:

* **Silent winner forcing:** partial orders get collapsed to a single winner by ad‑hoc tie‑breakers or hidden weights.
* **Hidden thresholds and constants:** thresholds, weights, dominance regimes, and “default portfolio modes” get smuggled into implementations and become invisible in discussion and audit.
* **Scalarization by convenience:** set‑valued comparison outcomes get replaced by a scalar “score summary” that is treated as decision‑relevant without being declared as such.
* **Evidence coercion:** missing or unknown evidence gets treated as “good enough” (implicit pass) rather than routing to explicit `degrade` or `abstain`.
* **Boundary erosion:** selection quietly performs comparison, scoring, aggregation, or publishing, making the CHR pipeline opaque and hard to reason about.

---
### Forces

1. **Set‑valued reality vs single‑winner convenience.** Many lawful comparisons are partial orders. The kernel must preserve set‑valued semantics while still allowing single‑winner outcomes when explicitly requested by criteria.

2. **Policy primacy vs method freedom.** Criteria and defaults must be explicit and policy‑bound, while multiple method families and decision styles must remain add‑able without mutating the kernel.

3. **No hidden thresholds vs usability pressure.** Engineers often want “just pick one.” If the spec does not constrain this, hidden thresholds and tie‑breakers become de facto policy.

4. **Evidence discipline vs delivery pressure.** Under uncertainty, teams default to coercion (unknown → pass). The kernel must enforce tri‑state eligibility and fail‑closed discipline.

5. **Auditability vs conceptual minimalism.** FPF stays conceptual. Audit obligations must be minimal yet decisive: editions and effective policy routing must be visible without introducing tool‑level governance.

6. **Evolvability vs didactic usability.** The kernel must be stable enough to support SoTA wiring and specialization ladders, but also teachable: one place to learn the boundary, laws, guard behavior, and audit minimum.

7. **P2W separation and gate/guard separation.** Planned binding of fillers and pins lives in WorkPlanning (P2W). Selection must not mutate into a gate pattern: no `GateDecision` or decision logs inside the mechanism boundary.

8. **No competing defaults.** If defaults exist (for portfolio mode, dominance regime, archive policies), they must be cited from their declared single sources, not replicated or re‑declared inside the kernel (`A.19.CHR:4.3.5`).

---
### Solution

`SelectorMechanism` is the canonical **selection kernel** for CHR and for selector specializations. It provides:

* a stable mechanism boundary for `select`,
* a stable SlotKind surface (via the CHR lexicon),
* a minimum law set that preserves set‑valued semantics and forbids hidden thresholds and hidden scalarization,
* a tri‑state admissibility guard that is fail‑closed under missing legality or evidence,
* an audit minimum that records effective editions and policy routing.

Method semantics and SoTA algorithm families do not live inside the kernel: they connect via `G.2` SoTA packs and wiring modules, and via lawful specializations `⊑/⊑⁺` that obey the ladder discipline (`A.6.1:4.2.1`).

#### Mechanism.Intension — normative core

Archetypal Grounding — **Mechanism.Intension** (normative).

* **Scope note:** this intension is an **instance** authored to the `U.Mechanism.Intension` shape owned by `A.6.1`. It defines only the mechanism’s semantic surface (slots/ops/laws/guards/audit). It does **not** bind project‑specific pins (P2W), and it does **not** emit GateDecision/GateLog; it emits `Audit` pins and a tri‑state guard only.
* **Canonicality note:** this is the canonical `U.Mechanism.Intension` for `SelectorMechanism.IntensionRef` and is intended to be cited by CHR suite artefacts and by any wiring layers; other mentions are **Tell + Cite** only.

* **IntensionHeader:** `id = SelectorMechanism`, `version = 1.0.0`, `status = stable`.

* **IntensionRef:** `SelectorMechanism.IntensionRef` (canonical target for the suite member named in `A.19.CHR:4.2`).

* **Tell.** Universal set‑returning selection kernel over candidates and criteria; defaults remain policy‑bound; **no hidden thresholds**.

* **Purpose:** universal set‑returning selection kernel over candidates and criteria; defaults remain policy‑bound; **no hidden thresholds**.

* **Imports:** `A.6.1:4.2.1 (multi-level specialisation ladders)`, `A.6.5 (slot discipline; SlotIndex as projection)`, `A.19.CN (CN‑Spec governance card)`, `C.22 (TaskSignature as a policy routing surface when used)`, `G.5 (selector conformance and default routing)`, `G.0 (CG‑Spec legality and evidence gates)`, `A.19.CHR:4.2.1 (CHR SlotKind Lexicon)`.

* **SubjectBlock:**

  * **SubjectKind:** `Selection`.
  * **BaseType:** `U.Set (candidates) + U.RelationTokenSet (lawful comparison outcomes)`.
  * **SliceSet:** `U.ContextSliceSet`.
  * **ExtentRule:** selection ranges over admitted candidates in the active context slice, constrained by explicit criteria/policies and by lawful comparison outcomes.
  * **ResultKind?:** `U.Set`.

* **SlotIndex:** derived projection from `SlotSpecs` (and any guard‑only SlotSpecs) per slot discipline; uses `A.19.CHR:4.2.1` SlotKind tokens; has no independent semantics.

  * `CandidateSetSlot : ⟨ValueKind = U.Set (candidates), refMode = ByValue⟩`.
  * `ComparisonResultSlot : ⟨ValueKind = U.Set (relation/poset tokens), refMode = ByValue⟩`.
  * `CriteriaSlot : ⟨ValueKind = U.Set (selection criteria / clauses, incl. explicit tie‑breakers; **acceptance thresholds are not criteria** and remain owned by the cited acceptance surfaces and applied only via `SelectEligibility`), refMode = ByValue⟩`.
  * `TaskSignatureSlot? : ⟨ValueKind = TaskSignature, refMode = TaskSignatureRef⟩` optional; when present, SHOULD be the single routing surface for selector defaults (e.g., portfolio mode / dominance regime), but it does not replace `CNSpecSlot` / `CGSpecSlot` contract surfaces.
  * `CNSpecSlot : ⟨ValueKind = CN‑Spec, refMode = CNSpecRef⟩`.
  * `CGSpecSlot : ⟨ValueKind = CG‑Spec, refMode = CGSpecRef⟩`.
  * `ContextSlot : ⟨ValueKind = U.BoundedContext, refMode = U.BoundedContextRef⟩`.
  * `MinimalEvidenceSlot? : ⟨ValueKind = MinimalEvidence, refMode = MinimalEvidenceRef⟩` optional override; otherwise the effective evidence policy is `CGSpecSlot.MinimalEvidence`.
  * `SelectionSlot : ⟨ValueKind = U.Set (portfolio), refMode = ByValue⟩`.

* **OperationAlgebra** suite stage = `select`, per `A.19.CHR:4.5`; canonical stage op = `Select`

  * `Select(CandidateSetSlot, ComparisonResultSlot, CriteriaSlot, CNSpecSlot, CGSpecSlot, ContextSlot, TaskSignatureSlot?, MinimalEvidenceSlot?) → SelectionSlot`.

* **LawSet** (minimum): the selection kernel is set‑returning and policy‑bound

  1. **Set‑returning by default:** a conformant `Select` MUST return a set/portfolio by default. It MUST NOT silently collapse partial orders or incomparabilities to a single winner; if a singleton outcome is required, it MUST be an explicit criterion (or a declared upstream total order).
  2. **No hidden thresholds/constants:** a conformant publication MUST NOT smuggle thresholds, weights, dominance rules, or tie‑breakers. Selection‑level commitments MUST be explicit in `CriteriaSlot` and/or in explicit policy routing surfaced by `TaskSignatureSlot`. Admissibility/acceptance thresholds are applied only via `SelectEligibility` using `CNSpecSlot.acceptance` and the effective evidence policy (`MinimalEvidenceSlot?` or `CGSpecSlot.MinimalEvidence`).
  3. **No hidden scalarization:** a conformant publication MUST consume `ComparisonResultSlot` as set‑valued/partial when it is set‑valued/partial. Scalar summaries (if produced at all) are report‑only unless explicitly promoted by policy outside suite closure.
  4. **Evidence gating is explicit:** when selection depends on evidence, it MUST cite either `MinimalEvidenceSlot` (override) or the effective policy `CGSpecSlot.MinimalEvidence`, and it MUST route the operation through tri‑state guards (no unknown coercion). Any candidate‑level ineligibility handling MUST be explicit (criteria and/or upstream outputs) and auditable (no silent dropping); the kernel MUST NOT invent new evidence thresholds.
  5. **No competing defaults:** portfolio/dominance defaults (when relevant) MUST be sourced from their declared single owners (typically via `TaskSignatureSlot` routing and/or the selector conformance/default surfaces in `G.5`), and MUST NOT be re‑declared inside the kernel.

* **AdmissibilityConditions** (tri‑state guard; fail‑closed on missing legality or evidence)

  * `SelectEligibility(CandidateSetSlot, ComparisonResultSlot, CriteriaSlot, CNSpecSlot, CGSpecSlot, ContextSlot, TaskSignatureSlot?, MinimalEvidenceSlot?) → GuardDecision ∈ {pass|degrade|abstain}`.
  * `pass` requires at minimum: (i) `ComparisonResultSlot` is compatible with `CandidateSetSlot` (same candidate universe), (ii) all selection criteria and any tie‑breakers are explicit (via `CriteriaSlot` and/or `TaskSignatureSlot`), (iii) admissibility/acceptance gates (`CNSpecSlot.acceptance`, evidence) do not fail, and (iv) `CNSpecSlot` and `CGSpecSlot` are coherent for the comparison tokens being consumed (no mixed CN-Spec/CG-Spec pairings).
  * If `MinimalEvidenceSlot` is absent, `SelectEligibility` MUST evaluate evidence against `CGSpecSlot.MinimalEvidence` by explicit rule, and missing/unknown evidence MUST NOT yield `pass`.
  * `degrade` is permitted only when an explicit, auditable failure behavior exists (policy‑bound), e.g., “exclude ineligible candidates” or “sandbox/probe‑only”; `abstain` is used when selection cannot proceed lawfully under the declared criteria/policies.

* **Applicability:**

  * Intended as the last stage of CHR selection after lawful comparison, producing a portfolio‑valued result.
  * Cross‑context selection is allowed only via explicit Transport (Bridge+CL/ReferencePlane) and cannot bypass CG‑Spec legality.

* **Transport:** declarative‑only: no embedded CL/Φ/Ψ tables and no new transport edges; crossings are via cited Bridge+CL/ReferencePlane surfaces; penalties route to **`R_eff` only**.

* **Γ_timePolicy:** `point` by default, no implicit latest.

* **PlaneRegime:** declarative‑only; does not introduce plane crossings. If selection spans planes, it MUST cite the applicable **ReferencePlane** and **CL^plane** policy; penalties route to **`R_eff` only**.

* **Audit:**

  * Must record: `CNSpecRef.edition`, `CGSpecRef.edition`.
  * If `TaskSignatureSlot?` is present, must record `TaskSignatureRef.edition`.
  * If `MinimalEvidenceSlot?` is present, must record `MinimalEvidenceRef`; otherwise must cite `CGSpecSlot.MinimalEvidence` as the effective evidence policy.
  * SHOULD record: the realized `GuardDecision` (`pass|degrade|abstain`) and, when non‑`pass`, the policy‑bound failure behavior reference that justified it.
  * SHOULD record: a stable identity for `CandidateSetSlot` and `ComparisonResultSlot` **or** a citable upstream `Audit` anchor that already fixes these identities; the goal is traceability without duplicating upstream semantics.
  * MUST record: a stable identity for `SelectionSlot`.
  * SHOULD record: a stable description (or citable reference) for the effective selection criteria surface (e.g., criteria artefact ids when criteria are reference‑backed; `TaskSignatureRef` when used).
  * SHOULD record: the realized routing‑relevant selector defaults (e.g., portfolio mode / dominance regime) **when** they are not fully determined by a referenced `TaskSignatureRef` or an explicit CAL policy surface; the point is auditability, not re‑declaring defaults.
  * SHOULD record: any Bridge/CL/ReferencePlane ids when `Transport` was invoked.
#### Boundary and layering rules

1. **Selection consumes upstream CHR products, it does not invent them.** `ComparisonResultSlot` is an input: the kernel MUST NOT perform normalization (UNM), indicatorization (UINDM), scoring (USCM), folding (ULSAM), or comparison (CPM) inside `Select`. If a scalar “overall score” is desired, it must be declared upstream as a lawful scoring and/or comparator choice, not invented inside selection.

2. **Threshold discipline (acceptance ≠ selection).** Acceptance/admission thresholds are not selection criteria: they live in `AcceptanceClauses` / `TaskSignature` / `GateProfile` surfaces per `A.19.CHR:4.3.5` and are applied only via `SelectEligibility`. Selection‑level tie‑breakers and portfolio constraints MAY exist, but MUST be explicit and auditable (typically as criteria artefacts or explicit policy routing), never as unnamed constants.

3. **Report‑only summaries inside suite closure.** Any scalar summaries, illumination metrics, or auxiliary “why not chosen” telemetry are report‑only unless explicitly promoted by policy, and MUST NOT be used as hidden dominance rules (`A.19.CHR:4.3.3`).
   Publishing and telemetry remain outside suite closure and are routed via established publication surfaces (e.g., `G.10` and/or `PTM`), not as hidden tails inside selection.

4. **Specializations are explicit and disciplined.** Any refinement or extension of `SelectorMechanism` must follow `A.6.1:4.2.1`:

   * SlotKind invariance for inherited operations,
   * no new mandatory inputs to inherited `Select`,
   * added capabilities appear as new operations or as `⊑⁺` extensions.

5. **P2W seam is preserved.** Planned bindings for `TaskSignatureRef@edition`, `CGSpecRef@edition`, evidence policy overrides, and other pins live in WorkPlanning (P2W). Execution visibility is via `Audit`, not by mutating plan objects at run time.

---
### Archetypal Grounding — informative

#### Tell

When comparisons are partial or set‑valued, selection must not pretend there is a single “best” by default. `SelectorMechanism` makes selection explicit, policy‑bound, and auditable: it returns a **set** unless criteria explicitly demand otherwise.
#### Show, U.System example

**Scenario.** A platform team must pick a set of deployment options for a subsystem under multiple criteria: latency, cost, and regulatory risk. Comparisons are multi‑criteria and do not induce a total order.

* `CandidateSetSlot` = `{OptionA, OptionB, OptionC}`
* `ComparisonResultSlot` includes tokens such as:

  * `OptionA ≼ OptionB` on latency,
  * `OptionB ≼ OptionA` on cost,
  * `OptionC` incomparable with both on risk evidence (missing attestations).
* `CriteriaSlot` contains explicit clauses:

  * “return all non‑dominated candidates under ParetoOnly,”
  * “candidates missing required evidence must not pass.”
* `MinimalEvidenceSlot?` is absent, so evidence is evaluated against `CGSpecSlot.MinimalEvidence`.

**Outcome.**

* `SelectEligibility` returns `degrade` (or `abstain`, depending on the declared failure behavior) **because** `OptionC` fails evidence gating; selection excludes `OptionC` under an explicit policy route rather than coercing unknowns.
* `SelectionSlot` returns `{OptionA, OptionB}` as a portfolio set, rather than forcing a single winner.
* `Audit` records `CGSpecRef.edition`, the effective evidence policy, and the stable identity of the selected portfolio.
#### Show, U.Episteme example

**Scenario.** A methods group selects a portfolio of analysis methods for a task. Candidates are method family refs. The group wants diversity in the portfolio, but does not want diversity metrics to silently become dominance criteria.

* `CandidateSetSlot` = `{Family1, Family2, Family3, Family4}`
* `ComparisonResultSlot` is produced by lawful comparison on declared indicators and evidence gates.
* `TaskSignatureSlot` is present and is the single routing surface for policy defaults:

  * portfolio mode and dominance regime,
  * budgeting/telemetry hooks (when used).
* `CriteriaSlot` declares that diversity signals are telemetry unless explicitly promoted by policy.

**Outcome.**

* `SelectionSlot` returns a portfolio set; any archive‑style behavior is a specialization and policy choice, not a hidden kernel default.
* `Audit` records `TaskSignatureRef.edition`, enabling reproducibility and post‑hoc explanation without embedding tool tokens into the kernel.

---
### Bias-Annotation — informative

This pattern intentionally biases selection authoring toward explicitness and legality.

* **Governance bias.** Bias toward explicit criteria and policy routing surfaces rather than implicit constants. Risk: perceived overhead. Mitigation: keep criteria artifacts minimal, and centralize defaults via `TaskSignatureSlot` when used.
* **Architecture bias.** Bias toward set‑return semantics and against forced total orders. Risk: consumers may expect a single winner. Mitigation: make single‑winner selection an explicit criterion or a declared comparator outcome, not an implicit kernel behavior.
* **Epistemic bias.** Bias toward fail‑closed evidence handling and against unknown coercion. Risk: more `degrade/abstain` early. Mitigation: improve evidence pins and policy clarity; do not relax the kernel.
* **Practice bias.** Bias against embedding telemetry and publishing into selection. Risk: teams want a one‑stop “select and report.” Mitigation: keep reporting in post‑suite routing patterns and record only minimal audit pins here.
* **Didactic bias.** Bias toward one semantic owner and “Tell + Cite” elsewhere. Risk: refactoring work. Mitigation: the result is a spec that can be read and taught without scavenger hunts.

---
### Conformance Checklist

| ID | Requirement |
|----|-------------|
| **CC‑A19SelectorMechanism‑0** | **MechAuthoring discipline:** the canonical SelectorMechanism `Mechanism.Intension` in `A.19.SelectorMechanism:4.1` MUST satisfy `A.6.1` `U.MechAuthoring` and the relevant `CC‑UM.*` checks; this pattern does not override the `U.Mechanism.Intension` shape. |
| **CC‑A19SelectorMechanism‑1** | **Single owner:** the canonical SelectorMechanism `U.Mechanism.Intension` MUST be owned by `A.19.SelectorMechanism:4.1`. Any other SelectorMechanism “card” text MUST be reduced to Tell+Cite referencing this owner section. |
| **CC‑A19SelectorMechanism‑2** | **Set‑return default:** a conformant `Select` MUST be set‑returning by default; it MUST NOT silently collapse partial orders or incomparabilities to a single winner. |
| **CC‑A19SelectorMechanism‑3** | **No hidden thresholds/constants:** a conformant SelectorMechanism publication MUST NOT smuggle thresholds, weights, dominance rules, tie‑breakers, or default portfolio modes. Selection‑level commitments MUST be explicit in `CriteriaSlot` and/or explicit policy routing (e.g., via `TaskSignatureSlot`). Acceptance thresholds remain owned by `AcceptanceClauses` / `TaskSignature` / `GateProfile` surfaces and MUST be applied only via `SelectEligibility`. |
| **CC‑A19SelectorMechanism‑4** | **No hidden scalarization:** if `ComparisonResultSlot` is set‑valued or partial, a conformant publication MUST consume it as such; scalar summaries are report‑only unless explicitly promoted by policy outside suite closure. |
| **CC‑A19SelectorMechanism‑5** | **Evidence gating:** a conformant publication MUST guard selection via `SelectEligibility` with `GuardDecision ∈ {pass|degrade|abstain}`; missing/unknown evidence MUST NOT yield `pass`. If `MinimalEvidenceSlot?` is absent, the guard MUST evaluate against `CGSpecSlot.MinimalEvidence`. Any candidate‑level filtering triggered by evidence MUST be explicit and auditable, not silent. |
| **CC‑A19SelectorMechanism‑6** | **SlotKind discipline:** SlotKind tokens used in the SelectorMechanism intension MUST come from the CHR SlotKind lexicon (`A.19.CHR:4.2.1`). New SlotKinds require lexicon extension first. |
| **CC‑A19SelectorMechanism‑7** | **Transport discipline:** cross‑context and cross‑plane selection MUST be explicit via Bridge+CL/ReferencePlane; penalties route to `R_eff` only, and crossings MUST be auditable. |
| **CC‑A19SelectorMechanism‑8** | **Audit surface:** Audit MUST record `CNSpecRef.edition`, `CGSpecRef.edition`, and the effective evidence policy (record `MinimalEvidenceRef` when overridden; else cite `CGSpecSlot.MinimalEvidence`); MUST record `TaskSignatureRef.edition` when `TaskSignatureSlot?` is used; and MUST record a stable identity for the resulting `SelectionSlot`. |
| **CC‑A19SelectorMechanism‑9** | **P2W separation:** planned baseline artefacts MUST bind editions and policy pins (A.15.3 + CHR P2W hook); these bindings MUST NOT be invented as run-time decisions inside the suite protocol. |
| **CC‑A19SelectorMechanism‑10** | **Specialization ladder discipline:** any `⊑/⊑⁺` specialization of SelectorMechanism MUST satisfy `A.6.1:4.2.1`, especially SlotKind invariance and “no new mandatory inputs” to inherited `Select`. |
| **CC‑A19SelectorMechanism‑11** | **Guard + gate separation:** `SelectorMechanism` MUST NOT publish `GateDecision`/`DecisionLog`; the mechanism‑level guard is `SelectEligibility` returning `GuardDecision := {pass|degrade|abstain}` and follows guard lexeme reservations (`A.19.CHR:4.3.2`). |
| GateDecision leakage         | `Select` emits `GateDecision` or writes a decision log                          | Keep gate decisions in gate patterns; selection uses `SelectEligibility` + `Audit` pins only                                                       |

---
### Common Anti-Patterns and How to Avoid Them — informative

| Anti-pattern                 | What it looks like                                                              | Remedy                                                                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Forced single winner         | `Select` always returns exactly one candidate even under incomparability        | Return a portfolio by default; if single winner is required, make it explicit in `CriteriaSlot` and ensure the induced order is lawful and declared |
| Hidden tie-breakers          | “If incomparable, pick lower cost” without declaring that as policy             | Move tie-breakers into explicit criteria or into declared comparator policies; never embed inside the kernel                                        |
| Scalarization by convenience | Replace set-valued comparison with a scalar “summary score” treated as decisive | Keep summaries report-only unless explicitly declared as lawful comparator outputs                                                                  |
| Unknown coerced to pass      | Missing evidence treated as acceptable                                          | Use tri-state `SelectEligibility`; unknown maps to `degrade` or `abstain`                                                                           |
| Selection does comparison    | Selection stage recomputes scoring or comparison internally                     | Keep comparisons upstream; `SelectorMechanism` consumes `ComparisonResultSlot`                                                                      |
| Publish inside selection     | Selection stage emits publish/telemetry as part of the suite step               | Keep publishing and telemetry outside suite closure; record minimal pins in `Audit`                                                                 |

---
### Consequences

**Benefits**

* Preserves correctness under partial orders by making set‑valued outcomes first‑class.
* Eliminates a major source of decision drift: hidden thresholds, hidden weights, and silent scalarization.
* Improves auditability and teachability: one owner location for selection semantics and its guards.
* Supports evolvability: new method families and selection styles can be wired without changing the kernel signature.

**Costs / trade-offs**

* Portfolio results can require explicit downstream handling when a single decision is needed.
* Strict evidence discipline increases early `degrade/abstain` until criteria and evidence policies are explicit.
* Teams must invest in explicit criteria artifacts instead of relying on implicit conventions.

---
### Rationale

Selection is where many systems accidentally convert lawful but nuanced information into an unjustified scalar decision. Making selection a separate, explicit mechanism boundary achieves two things that matter for engineering management:

1. **Technical integrity:** it enforces legality and evidence discipline at the decision boundary without smuggling heuristics.
2. **Organizational clarity:** it makes defaults and thresholds discussable, reviewable, and maintainable as explicit policy surfaces.

The set‑returning default is not a “preference for portfolios”; it is a correctness safeguard when the order is not total. Single‑winner outcomes remain possible, but only by explicit criteria or declared lawful comparators.

---
### SoTA-Echoing

**SoTA vs popular note.** This section records alignment to post‑2015 evidence‑backed practice. It is not a mandate to use fashionable methods; method semantics stay in SoTA packs (`G.2`) and wiring modules, while this pattern fixes the stable selection boundary.

**Pack note, Phase‑3:** this pattern does not currently cite a SelectorMechanism‑specific `G.2` pack or ClaimSheet. If and when such packs are introduced, they should connect via `CriteriaSlot` and `TaskSignatureSlot` routing, keeping kernel semantics unchanged.

#### SoTA alignment map (normative)

| SoTA practice pointer, post‑2015+                                                                               | Primary source examples, post‑2015+                                                                           | Where it connects to SelectorMechanism                                                                             | Adoption status |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------- |
| Treat the Pareto set or portfolio as a first-class output under multi-criteria partial orders                   | Quality Diversity as a decision framing, e.g., Pugh et al. 2016; Vassiliades et al. 2018                      | Expressed as set‑return default and explicit portfolio criteria; method details live in specializations and wiring | Adapt           |
| Use archive-based portfolios where diversity is part of the result, but do not silently promote it to dominance | Modern QD and archive practices post‑2015, including map-elites descendants and archive insertion policies    | Expressed as policy‑bound criteria and report‑only telemetry unless explicitly promoted                            | Adapt           |
| Pair environments and methods in open-ended or co-evolutionary settings without breaking kernel semantics       | Open-ended environment-method pairing, e.g., Wang et al. 2019 and successors                                  | Expressed as candidate and criteria structuring plus lawful specializations; kernel unchanged                      | Adapt           |
| Include an explicit abstain or reject option under uncertainty rather than forcing a decision                   | Selective prediction and rejection-option practice, e.g., Geifman and El‑Yaniv 2017; follow-on selective nets | Expressed as tri-state `SelectEligibility` with fail-closed discipline                                             | Adopt           |
| Keep architecture commitments traceable and single-owner                                                        | ISO/IEC/IEEE 42010:2022 architecture description discipline                                                   | Expressed as explicit semantic ownership and Tell+Cite stubs elsewhere                                             | Adopt           |

**Notes per row** (1–2 sentences; *why* adopt/adapt/reject):
* **Portfolio-as-output (QD framing):** adopt the *decision framing* (portfolio as a first-class result) while keeping concrete QD/portfolio algorithms out of the kernel; they belong in `G.2` packs and wiring modules, preserving evolvability.
* **Archive portfolios (diversity as result):** adapt archive thinking by keeping diversity/illumination signals report‑only unless an explicit CAL/policy promotes them to dominance; this prevents silent scalarization and preserves single‑owner defaults (typically `G.5`/CAL).
* **Open‑ended environment–method pairing:** keep the kernel unchanged; open‑ended pairing is expressed by shaping candidates/criteria (and, when needed, lawful specializations `⊑/⊑⁺`) with explicit edition pins and transfer/validity rules in planned baseline, not by mutating `Select`.
* **Reject/abstain under uncertainty:** adopt the rejection‑option stance as a tri‑state guard with fail‑closed semantics; explicit abstain is preferable to forced choice under missing legality/evidence.
* **Single‑owner architecture discipline:** adopt single‑owner + Tell‑and‑Cite to keep the spec teachable and reviewable; this directly reduces drift and “second centers of gravity”.

---
### Relations

* **Builds on**

  * `A.6.1` and `CC‑UM.*` for the mechanism intension shape and specialization ladder discipline.
  * `A.19.CHR` for suite membership, suite protocol closure, SlotKind lexicon, and threshold and default discipline.
  * `G.0` for `CG‑Spec` legality and evidence surfaces.
  * `A.19.CN` for `CN‑Spec` governance card used as an explicit input.
  * `C.22` for `TaskSignature` as a policy routing surface when used.
  * `A.6.5` for slot discipline (SlotIndex as projection; SlotKind invariance).
  * `A.15.3` + `A.19.CHR:4.7.2` for the P2W planned baseline seam for edition/policy pin bindings (cited as seam, not duplicated in Intension).
* **Used by**

  * `A.19.CHR` as the canonical `select` stage in CHR pipelines.
  * `G.5` as the primary conformance and specialization context for selector-based method dispatch and portfolio policies.
  * `E.18 (E.TGA)` when selector instances are used as transduction graph nodes; planned pins live in P2W, effective pins surface via `Audit`.
* **Coordinates with**

  * `CPM` and other lawful comparison stages as producers of `ComparisonResultSlot`.
  * `ULSAM` and other lawful aggregation stages that must remain explicit rather than hidden inside selection.
  * `E.20` single-owner discipline and `F.18` alias docking for Phase‑3 canonicalization and ID continuity.
### A.19.SelectorMechanism:End
## U.Flow.ConstraintValidity — Eulerian

**Tech‑name.** `U.Flow.ConstraintValidity` (`U.Flow` genus)
**Plain‑name.** Flow constraint validity (Eulerian interpretation)
**Type / Status.** Architectural pattern — **normative** for flows hosted by E.TGA (E.18) under the Eulerian operational interpretation

### Intention

**One‑liner** Defines cross‑cutting **ConstraintValidity** rules for all `U.Flow` instances. `U.TransductionFlow` inherits these rules and may refine **CV class specializations** for transduction‑specific semantics (species‑binding only; genus rules remain unchanged). The CV core is **kind‑agnostic** and assumes an **open‑world** catalogue of node **species**; the enumeration of node **kinds** in E.TGA is a **minimal roles baseline**.
**Operational interpretation.** **Eulerian** stance: **flow = valuation** over `U.Transfer`; **CV is attached to transformations (steps)** and evaluated **before any GateFit**; edges carry **assurance‑only operations**; no token‑passing semantics are assumed.
### Problem frame

E.TGA makes *nodes = morphisms* and enforces a *single edge kind* (`U.Transfer`). **GateFit** checks aggregate only in `OperationalGate(profile)` with the activation predicate **CV ⇒ GF**: until aggregated **ConstraintValidity = pass**, all **GateFit** checks return **abstain**. Equivalently, while **ConstraintValidity ≠ pass**, any GateFit‑oriented explanation **does not apply**. To keep flows comparable and auditable, this pattern delimits **internal step constraints** (CV) from **external gate fit** (GF), preventing any second ladder of processes beside the graph.
### Problem

Without a clear CV core:

* internal step laws (domains/ranges, invariants, units coherence, Lipschitz/stability) bleed into gate **profile**;
* plane or comparator declarations sneak into mechanisms;
* freshness and design/run concerns appear inside mechanisms;
* reproducibility suffers because transfers start carrying hidden semantics beyond `⟨L,P,E⃗,D⟩`.

Under this pattern, CV is evaluated **inside** transformations. **If** a check declares planes/units/comparators or depends on an active `GateProfile`, **then** it is treated as **GateFit at gates** and the CV explanation **does not apply**.
### Forces

* **Separation of concerns.** Internal mechanism laws vs. external profile fit.
* **Auditability.** MVPK faces include pins/references only; no new numeric claims; editions and Γ are pinned where applicable.
* **Graph discipline.** One edge kind; all crossings mediated by gates; SquareLaw on every crossing.
* **Reproducible valuation.** Flow = valuation over `U.Transfer`, with slice‑local refresh bounded by sentinels.
* **LEX hygiene.** ASCII Tech labels, twin Tech/Plain registers, registered tokens.
### Solution

#### Intent & Scope

**Intent.** Establish the **ConstraintValidity core** for the **`U.Flow` genus**: the normative set of **internal step constraints** and how they are surfaced and aggregated, **independent of GateFit profiles** (publication follows MVPK without adding new numeric claims). Where CV speaks about admissibility, phrase criteria **counterfactually**: *“If the admissibility conditions hold, then the CV explanation applies; otherwise this explanation does not apply.”* Avoid duty verbs unless stating the **normative** CC minima.

**Scope (genus).** CV covers **intra‑step** properties checkable from the transformation’s own signature/mechanism. The canonical CV classes are **genus‑level and non‑exhaustive**:
`MechanismUnitsCoherence`, `LawSetInvariants`, `AdmissibilityConditionsSatisfaction`, `LipschitzBounds`, `TypeDomainRange`, and—only for **`StructuralReinterpretation`**—`ReinterpretationEquivalence` (correspondence/reversibility witness).

**Species binding (`U.TransductionFlow`).** The above classes bind to `U.Transduction(kind ∈ {Signature, Mechanism, Work, Check, StructuralReinterpretation})` with **`OperationalGate = kind=Check`**; no additional CV classes are introduced here (species‑specific semantics reside in A.31 and A.45).

**Out‑of‑scope (CV):** declaring/translating `ReferencePlane/Units/ComparatorSet`; CSLC comparability; Freshness; Role/Channel; Regulated‑X; `DesignRunTagConsistency` — all reside in **GateFit** (A.21).
#### Intensional object(s)

**Genus.** `U.Flow` leaves step‑kinds abstract; CV/GF separation applies to any lawful instantiation.
**Species (`U.TransductionFlow`).** `U.Transduction(kind) ∈ {Signature, Mechanism, Work, Check, StructuralReinterpretation}`; this set of **kinds** is a **minimum roles baseline** defined in E.TGA. The **species** space (e.g., `UNM.Authoring/Usage`, `SelectionAndTuning`, `WorkPlanning`, `EvaluatingAndRefreshing`, …) is **open‑world** and non‑exhaustive. `OperationalGate = U.Transduction(kind=Check)`. `StructuralReinterpretation` is **projection‑preserving** (no mutation of `⟨L,P,E⃗,D⟩`) and may retarget **describedEntity** under CC‑TGA‑06‑EX; see also A.45.

**`AdmissibilityConditionsSatisfaction`** — **If** the declared admissibility conditions hold on the step’s inputs and context, **then** the CV explanation **applies**; **otherwise** this explanation **does not apply**.
**`LipschitzBounds`** — **If** inputs vary within the stated domain \(X\) and perturbations/noise \(≤ ε\), **then** the step’s estimate remains within **δ** of the reference; **otherwise** this explanation **does not apply**.
**`MechanismUnitsCoherence / TypeDomainRange`** — **If** units/types/domains match the mechanism’s signature and closed‑world assumptions for the step, **then** the CV explanation **applies**; **otherwise** this explanation **does not apply**.

**Terminology & bindings (normative)**
* **Status/witness lexicon (E.10 discipline).** In CV scope, publications use **Status/Witness** terminology; **GateDecision…** lexemes belong to GateFit (A.21) and do **not** apply to CV.
* **describedEntity = KindBridge.** Any CV mention of “describedEntity” SHALL be read via **`KindBridge (CL^k)`** on **UTS** (A.27 / C.3.3). CV **does not** declare or translate planes/units/comparators.
* **retargeting/witness binding.** For `U.Transduction(kind=StructuralReinterpretation)`, the CV class **`ReinterpretationEquivalence`** SHALL surface **`CV.WitnessRef := ReinterpWitness`** over the addressed `PathSliceId`; the UTS **`SquareLaw‑retargeting` witness** is referenced from MVPK/UTS and **linked** from the CV witness without duplication.
* **`ReinterpWitness` record (normative).**  
  `ReinterpWitness := { PathSliceId, PublicationScopeId, mapping:{kind: iso|optic, laws: PutGet/GetPut}, commutingSquares:[TransferId], definedOn: PathSliceId, properties:{invertible?:bool, idempotent?:bool}, UTS.RowId, NoHiddenScalarization:true }`.
#### MVPK Faces (PlainView - TechCard - InteropCard - AssuranceLane)

Minimum pins on faces that surface CV outcomes (**Lean surfacing** allowed by profile but without weakening checks):

* **CtxState pins.** `⟨L,P,E⃗,D⟩` on ports/tokens; raw `U.Transfer` preserves them.
* **Path pins.** `PathId` and `PathSliceId` appear where slice‑local refresh or reinterpretation witnesses are relevant (valuation semantics per A.22).
* **CV pins.** `CV.Status ∈ {abstain, pass, degrade, block}`, `CV.WitnessRef?` (refs only).
* **Edition pins.** If a face cites `CG‑Spec`, `ComparatorSet`, or `UNM.TransportRegistryΦ`, the face **includes** the compatibility surface **as per A.27 (BridgeCard + UTS row, with `CL/CL^plane`)** for downstream consumption. A.20 references this requirement; it does not introduce or modify Bridge/UTS formats.
* **Face scope.** Each face includes `PublicationScopeId` with an **MVPK profile** (Min/Lite/SetReady/Max) — no new surface kinds.
* **Register discipline.** Tech names ASCII; twin labels; required LEX tokens follow E.10 (e.g., `SentinelId`, `PathSliceId`, `SliceRefresh`).

> **No new numeric claims.** Faces add pins and references; they do **not** introduce fresh computed scalars beyond what the mechanism already entails (MVPK functoriality).

**Publication lexeme (per‑check).** Each surfaced CV check is referenced as  
`GateCheckRef := { aspect=ConstraintValidity, kind, edition, scope }` with `scope ∈ {lane|locus|subflow|profile}`. This adds no execution steps and introduces no numeric claims on faces; it records what CV classes were considered and under which editions.
#### GateChecks (table) — CV only

**Activation predicate (in E.TGA).** *Until aggregated `CV = pass`, all GateFit checks return `abstain` (CV⇒GF).*
**Role/Channel Fit guard (GateFit scope).** GateFit checks that involve roles SHALL use **Kernel `U.Role` tokens** (domain = `U.System`) and SHALL NOT consume `TypicalEnactorRoleName` strings from alias tables.

| Check class (A.20)                                                                                | aspect | Mandatory | Allowed | Forbidden |
| ------------------------------------------------------------------------------------------------- | -----: | :-------: | :-----: | :-------: |
| MechanismUnitsCoherence                                                                           |     CV |     ✓     |    —    |     —     |
| LawSetInvariants                                                                                  |     CV |     ✓     |    —    |     —     |
| AdmissibilityConditionsSatisfaction                                                               |     CV |     ✓     |    —    |     —     |
| LipschitzBounds / stability                                                                       |     CV |     ✓     |    —    |     —     |
| TypeDomainRange                                                                                   |     CV |     ✓     |    —    |     —     |
| ReinterpretationEquivalence (StructuralReinterpretation only; witness present)                    |     CV |     ✓     |    —    |     —     |
| Any `ReferencePlaneCrossing`, CSLC, Freshness, Role/Channel, Regulated‑X, DesignRunTagConsistency |     GF |     —     |    —    |     ✓     |

CV **must not** declare/translate `Units/ReferencePlane/ComparatorSet`; crossings and CSLC comparability live only in A.21.
#### SWP matrix (single‑writer discipline)

* **Writes (faces).** `CV.Status` (and optional `CV.WitnessRef`) only.
* **Reads (ref‑only).** Any `CG‑Spec/ComparatorSet/TransportRegistryΦ` editions (when referenced); UNM remains single writer as per CC‑TGA‑24.
#### CtxState & GateCrossing

* **Crossings only at `OperationalGate(profile)`** (plane/unit/context) with a **strict exception** for **`StructuralReinterpretation`**: a **projection‑only retargeting** MAY occur without a gate **iff** `⟨L,P,E⃗,D⟩` is preserved, **KindBridge (`CL^k`)** and a **SquareLaw‑retargeting witness** are present on MVPK/UTS, and the action is **PathSlice‑local** (`PathSliceId` pinned).
* **Projection vs describedEntity (normative reduction).** “Projection” denotes a change of **MVPK published view** that is point‑wise identity on the intensional transformation; “describedEntity” is the **Kind‑channel** on UTS evidenced by a `CL^k` row. “No unit/plane change” holds iff `P` is equal on both sides and **no `CL^plane`** is emitted for the step.
* **Projection/describedEntity normalization (normative).** In the context of `StructuralReinterpretation`, the terms **projection** and **describedEntity** are read **via UTS**: projection = change of **published view coordinates** only; describedEntity = **Kind‑channel** change under `CL^k`. A **“no unit/plane change”** test SHALL verify that `ReferencePlane(src)=ReferencePlane(tgt)` and `CL^plane` is absent (or `= ⊤`), otherwise the step is a gated crossing.
* **Assurance operations on edges.** `ConstrainTo/CalibrateTo/CiteEvidence/AttributeTo` reside on `U.Transfer` and do **not** alter `⟨L,P,E⃗,D⟩`; plane/unit changes occur only at gates; Φ/`CL^plane` penalties route in **R‑lane**. describedEntity/kind transitions are surfaced as **`KindBridge (CL^k)`** on **UTS** (see A.27 / C.3.3). describedEntity/kind transitions use **KindBridge (`CL^k`)** (A.27/E.TGA); under CC‑TGA‑06‑EX this appears without a gate and remains PathSlice‑local.

**Terminology binding (TGA‑specific, normative)**
* **Status/witness lexicon (E.10 discipline).** In CV scope, publications use **Status/Witness** terminology; **GateDecision…** lexemes belong to GateFit (A.21) and do **not** apply to CV.
* **describedEntity = KindBridge.** Any CV mention of “describedEntity” SHALL be read via **`KindBridge (CL^k)`** on **UTS** (A.27 / C.3.3). CV **does not** declare or translate planes/units/comparators.
* **retargeting/witness binding.** For `U.Transduction(kind=StructuralReinterpretation)`, the CV class **`ReinterpretationEquivalence`** SHALL surface **`CV.WitnessRef := ReinterpWitness`** over the addressed `PathSliceId`; the UTS **`SquareLaw‑retargeting` witness** is referenced from MVPK/UTS and **linked** from the CV witness without duplication.
* **`ReinterpWitness` record (normative).**  
  `ReinterpWitness := { PathSliceId, PublicationScopeId, mapping:{kind: iso|optic, laws: PutGet/GetPut}, commutingSquares:[TransferId], definedOn: PathSliceId, properties:{invertible?:bool, idempotent?:bool}, UTS.RowId, NoHiddenScalarization:true }`.
#### SquareLaw

For any gate‑mediated crossing adjacent to CV‑checked steps:
`gate_out ∘ transfer = transfer' ∘ gate_in`.
For **projection retargetings** under `StructuralReinterpretation`, a **SquareLaw‑retargeting witness** shows that the **view retargeting commutes** with transfers on the PathSlice. Inconsistencies lead to `degrade`/`block` per active profile (GateFit decision).

**retargeting witness shape (normative, UTS‑level).** A **SquareLaw‑retargeting witness** is an artifact that demonstrates commutativity of a published‑projection retargeting over the addressed **`PathSliceId`**:  
  1) identifies **`PathSliceId`** and **`PublicationScopeId`**;  
  2) presents a **bidirectional view mapping** between projections either as an **iso** or as a **profunctor optic** (`get : A→B`, `put : (B×A)→A`) satisfying **Put‑Get / Get‑Put** laws;  
  3) enumerates the **commuting squares** for the cut‑set edges considered (ids of transfers before/after the retargeting);  
  4) declares properties (**invertible?**, **idempotent?**) and the **definedness area**;  
  5) cites the **UTS.RowId** and links the **DecisionLog** entries that rely on this witness.  
Realizations via **profunctor optics (post‑2017)** are permitted; the optic/lens laws serve as the proof template of commutativity.

**CV witness for reinterpretation (normative, CV‑level).** `CV.ReinterpretationEquivalence` SHALL surface a **ReinterpretationEquivalenceWitness** distinct from the UTS retargeting witness and scoped to the mechanism state over the same **`PathSliceId`**:
  — `PathSliceId`, `PublicationScopeId`, and **definedness region** (domain constraints);  
  — a **pair of internal transformations** (or an optic) with **Put‑Get / Get‑Put** obligations **over mechanism state** (not faces);  
  — a **list of commuting squares** for the **adjacent raw transfers** (before/after reinterpretation) showing SquareLaw at CV boundary;  
  — an explicit **NoHiddenScalarization assertion** (see §4.9) for any comparable return shape;  
  — **edition neutrality**: no new editions are authored; only refs/pins appear.  
This CV witness links to the UTS `SquareLaw‑retargeting` witness when present, but does not duplicate UTS fields.

**CV witness binding (normative).** For the CV class **`ReinterpretationEquivalence`**, the witness **SHALL** be a `ReinterpWitness` record:
`ReinterpWitness := { PathSliceId, PublicationScopeId, mapping: {kind: iso|optic, laws: PutGet/GetPut}, commutingSquares: [TransferId], definedOn: PathSliceId, properties: {invertible?: bool, idempotent?: bool}, UTS.RowId, NoHiddenScalarization: true }`.
The record is **PathSlice‑local** and does not declare or translate planes/units or comparators.
#### Sentinel & PathSlice (path‑local refresh)

* Flows are **valuations** over `U.Transfer`, re‑emitting **slice‑locally** under sentinel rules or edition bumps (A.22/A.25). CV contributes to the **prepare/refresh** conditions but does not expand scope beyond the addressed `PathSliceId`.
* **Delimitation & planning (normative).** A `PathSlice` **closes** on: (i) any pinned edition change, (ii) Γ‑window boundary relevant to the face, (iii) `GateProfile` change along the path, or (iv) an explicit sentinel rule. **Concurrency:** at most **one active recompute** per `{PathSliceId}`; parallel recomputes are permitted across **distinct** `PathSliceId`s.
* **CV‑triggered refresh (minimum list).** Re‑emit the addressed `PathSliceId` when any holds: (a) `CV.Status` changes across the lattice; (b) `ReinterpWitness` is added/updated/withdrawn; (c) `AdmissibilityDecl.edition` or `LipschitzBoundRef.edition` changes; (d) updates arrive from A.27 (Bridge) or A.28 (ComparatorSet/UNM.TransportRegistryΦ); (e) error/timeout transitions to a resolved `pass` for a previously `abstain|degrade` CV class.

* **CV‑to‑refresh triggers (normative).** A **SliceRefresh(PathSliceId)** SHALL be scheduled when any of the following occurs:  
  (T1) a **CV status flip** on the slice (`pass↔degrade`, `pass↔block`, or `error/timeout→{degrade|block}` under profile rules);  
  (T2) arrival of a new **ReinterpretationEquivalenceWitness** or a change in its **definedness region**;  
  (T3) updates to adjacent **UTS/Bridge** facts for the slice (e.g., `CL^k`, `BridgeId`, `Φ`/`Ψ` policy‑ids) coming from A.27;  
  (T4) edition changes referenced by CSLC (A.28) on the slice (`ComparatorSetRef.edition`, `DescriptorMapRef.edition`, `DistanceDefRef.edition`, …);  
  (T5) **FreshnessTicket** lifecycle changes impacting the slice window (A.40);  
  (T6) sentinel rules explicitly attached to the **PathSliceId**.  
Scheduling is **slice‑local**; recompute does not fan‑out beyond the addressed `PathSliceId`.

  **Id‑scheme:** `PathSliceId := PathId × Γ_time selector × ReferencePlane × SentinelFingerprint × IterationCounter`.  
  **Locking for replay:** within a recompute, the effective `E⃗` is **frozen**; outputs carry a **replay fingerprint** resolvable via `DecisionLog`.
#### ReturnShape & CSLC (comparability discipline)

When the mechanism yields comparable artifacts, the return surface is **set‑valued / partially ordered**; **no hidden scalarization**. Any comparator citation is **ref‑only** and (if editions are cited) requires `Bridge+UTS` per CSLC (A.28). Actual CSLC checks are GateFit (A.21).

Under **`StructuralReinterpretation`**, **projection changes MUST NOT introduce hidden scalarization**; set‑return semantics remain intact; comparator cites stay ref‑only with UTS discipline.

**Detectable signs of hidden scalarization (normative checklist).** A face **SHALL** be flagged when any holds:  
  (H1) introduction of a **new scalar** not entailed by the mechanism, or any **cardinality‑reducing** fold of a set return (e.g., argmax/best‑of) without a cited **ComparatorSetRef**;  
  (H2) omission of a required **ComparatorSetRef** or its **edition pins** where comparison is implied;  
  (H3) presence of an **order‑imposing coordinate** without a **CoordinatePolicy** and legality annotations (scale/units/illegal ops);  
  (H4) cross‑plane/units numeric combination without a **Bridge+UTS** row;  
  (H5) for `StructuralReinterpretation`, any change of return **plane/units** (violates “projection‑only”).  
Failing (H1–H5) degrades or blocks per GateProfile (§4.4/CC‑TGA‑21a).
#### Γ‑windows / Freshness

* No implicit *latest*. Any face expected to be consumed at compare/launch pins `Γ_time`; Freshness enforcement occurs at gates; CV neither issues Freshness tickets nor evaluates staleness (see A.33/A.40).
* **Granularity of Γ (normative).** Γ SHALL be one of: **snapshot** (`effective_at=t`) or **interval** (`[t₀,t₁)` with a named folding policy). Faces SHALL surface which selector is used.  
* **CV time‑stamping.** Each CV computation surfaces `t_cv` and the **Γ selector** it assumed; replay binds `t_cv` to `PathSliceId`.  
* **Temporal policy types (binding).** Γ‑pins refer to the **canonical selectors** of §22 (*`effective_at`*, *`latest_effective_before`*, *`windowed(W, policy)`*) and to **folding policies** that are **IDEM/MONO/WLNK‑safe**. Units/time scales **SHALL** be explicit. Overrides of the default **weakest‑link** fold **SHALL** cite CAL proofs of monotonicity and boundary behavior.
#### Unknown/Timeout/Error policy

Each CV class yields `abstain | pass | degrade | block`. Errors/timeouts at CV stage imply **CV ≠ pass**; therefore GateFit abstains by the global activation predicate and any GateFit‑oriented explanation **does not apply**. The **aggregated CV decision** uses the join on `abstain ≤ pass ≤ degrade ≤ block` (neutral = `abstain`; absorbing = `block`).  
**Minimal default (profile‑bound, normative):** **Lean/Core ⇒ `error|timeout → degrade`**, **SafetyCritical/RegulatedX ⇒ `error|timeout → block`**; `unknown` folds per GateCheck policy (safety‑default: `degrade`). (Consistent with **CC‑TGA‑22**.)
#### Idempotency / congruence discipline

Any surface influencing gate decisions references **A.41** for **equivalence** of inputs and **idempotency witness**; A.20 does not introduce keys, hashes, or cache policies.
**Minimal lexeme set for CV‑adjacent equivalence (normative).** Where CV outcomes influence a gate decision, the **equivalence witness** SHALL identify at least: `{PathSliceId, GateProfileId, Γ selector (+window bounds if interval), E⃗ editions vector for cited registries, ReturnShape kind (if comparable), CV class/kind set considered}`. Changing any of these breaks equivalence and requires re‑aggregation.
### Archetypal Grounding (Tell–Show–Show) ✱

**Show‑1 (compiler build → run).**
A typed module `M` exposes `f : State_d → Artifact_d` under a declared `LawSet` (e.g., determinism under fixed toolchain) and `TypeDomainRange`. **CV** checks: (i) `MechanismUnitsCoherence` (toolchain/flags units coherent), (ii) `LawSetInvariants` (reproducible outputs under same `E⃗`), (iii) `Admissibility` (inputs well‑typed), (iv) optional Lipschitz/stability surrogate (bounded perturbation in sandbox). `CtxState` is preserved along raw transfers. Entering `U.Work(run)` requires `LaunchGate` with `FreshnessUpToDate` and `DesignRunTagConsistency` — **GateFit**, not CV.

**Show‑2 (selection archive in QD/AutoML).**
A mechanism emits a **set** (front/portfolio/archive). **CV** ensures only: valid descriptor ranges, internal metric continuity bounds, archive invariants (idempotent insert). No ranking or acceptance thresholds are introduced at CV; comparators and acceptance policies bind at gates via CSLC and profiles (A.21/A.28). Edition‑aware pins on faces carry `DescriptorMapRef.edition` only with `Bridge+UTS`.

**Anchors.** Algebraic effects & handlers separate signatures from handlers (Koka/Effekt, 2015+); reproducible pipelines isolate mechanism constraints from deployment **profiles** (Bazel/Nix); optics/profunctors and open/hypergraph categories motivate composition on open graphs without adding facts on faces; QD/MAP‑Elites/CMA‑ME/DQD motivate **set‑return + lawful orders** (2015–2022).
### Bias‑Annotation

The pattern constrains *how* internal constraints are surfaced; it does not encode profile‑bound thresholds or Role/Channel fit — those sit in GateFit. This separation reduces leakage of profile concerns into mechanism semantics.
### Conformance Checklist ✱

**Static lint (graph & surfaces)**

* CC‑TGA‑01: only `U.Transfer` edges; crossings appear only on gates.
* CC‑TGA‑05: `⟨L,P,E⃗,D⟩` unchanged across raw transfers.
* CC‑TGA‑09: MVPK faces present; edition & Γ pins where expected; no new numeric claims on faces (E.17).

**CV discipline**

 * CV classes present exactly as {UnitsCoherence, LawSetInvariants, Admissibility, LipschitzBounds, TypeDomainRange}; **plus** `ReinterpretationEquivalence` when the node kind is `StructuralReinterpretation`. None declare/translate planes/comparators.
 * **Open‑world species.** Any node **species** binds to one of the minimal kinds; adding a new **kind** is out of scope for A.20 and requires an E.TGA update.
* Aggregated **CV.Status** computed; errors/timeouts ⇒ `CV ≠ pass`.

**Gate coupling**

* CC‑TGA‑07: when **CV ≠ pass**, all GateFit checks report **abstain**.
* CC‑TGA‑23: SquareLaw witnesses present on crossings adjacent to CV‑checked steps.
* Any edition citation on faces includes `Bridge+UTS` (A.27; CSLC in A.28).

**UNM single‑writer**

* CC‑TGA‑24: UNM.Authoring is the sole writer for `CG‑Spec/ComparatorSet/TransportRegistryΦ`; CV is ref‑only.

**Valuation & refresh**

* CC‑TGA‑18/19: Flow publishes valuation with `PublicationScopeId`/`PathSliceId`; Γ pinned at compare/launch surfaces; sentinel triggers slice‑local refresh.
### Consequences

**Benefits.**
*Clarity & composability.* Mechanisms remain pure carriers of internal laws; gates are the sole policy junction.
*Replayability.* With valuation + MVPK pins, re‑runs under fixed `E⃗` are comparable and slice‑scoped (A.22/A.25).
*Didactic hygiene.* Readers can see what is mechanism truth vs. gate policy.

**Trade‑offs.**

* Two places to look (CV vs. GF) impose author discipline; mitigated by the activation predicate and MVPK links.
### Rationale

E.TGA hosts A.20 and A.21 as orthogonal cores: CV **inside** transformations; GF **at** gates with join‑aggregation and DecisionLog. This mirrors effects/handlers (signature vs. handler), and reproducible build vs. deployment‑profile separation.
### SoTA‑Echoing (post‑2015)

* **Algebraic effects & handlers** (Koka, Effekt): signatures vs. handlers as a model for CV vs. GF.
* **Reproducible pipelines** (Bazel, Nix): hermetic builds ≈ CV; release/deploy gates ≈ GF.
* **Optics/profunctors; open/hypergraph categories** (2017–2019+): composition over open graphs without extra face semantics.
* **Quality‑Diversity / MAP‑Elites / CMA‑ME / DQD (2015–2022):** set‑return with lawful partial orders; no hidden scalarization.
  These anchors justify the separation and the set‑return discipline (CSLC) embedded in the flow family.
### Relations

* **Hosted by E.TGA.** Nodes are morphisms; only `U.Transfer` edges; **open‑world species over a minimal kind set**; CV⇒GF activation; MVPK faces; SquareLaw on crossings; CC‑TGA‑06‑EX for `StructuralReinterpretation`.
* **A.21 (GateProfilization).** Sole point for GateFit checks and profile‑bound folds.
* **A.22 (FlowSpec—valuation).** Declares valuation and slice‑refresh semantics used by this flow family.
* **A.27 (Bridge+UTS).** Boundary‑surface requirement whenever faces cite editions.
* **A.28 (CSLC).** Comparability discipline; CV does not compare; it only ensures internal readiness for lawful comparison.
* **A.41 (DecisionLog & Idempotency).** Equivalence witness binding for any surfaces affecting gate decisions.
* **E.10 (LEX).** Token classes and ASCII Tech names; twin labels and aliasing for Γ/CL/Φ as per LEX‑BUNDLE.
### A.20:Appendix A — CV Class Gloss (normative)

* **MechanismUnitsCoherence.** Internal unit/scale coherence within the step; no declarations or translations of units/planes (GateFit scope).
* **LawSetInvariants.** Mechanism‑declared invariants hold (e.g., mass/energy balance in a model, determinism under fixed editions).
* **AdmissibilityConditionsSatisfaction.** Inputs lie within admissible windows/guards declared by the mechanism’s **AdmissibilityConditions**; failure yields `degrade` or `abstain` per class policy.
  **Minimum declaration (normative):**
  `AdmissibilityDecl := { domains: {name: set/poset}+, guards: [predicate_id]*, windows: {Γ_time: snapshot|interval|policy}, observables: [signal_id]*, edition: EditionId }`.
  The declaration is surfaced on MVPK as references only; it introduces no arithmetic on faces.
* **LipschitzBounds / stability.** Bounded sensitivity to perturbations as declared by mechanism; optional where meaningful.
  **Method binding (normative):**
  `LipschitzBoundRef := { method ∈ {spectral_norm|CROWN|IBP|rand_smoothing|other}, metric_space: {X: norm_id, Y: norm_id}, bound: value_or_interval, units/plane: P, validity_window: Γ_time(basis), edition: EditionId }`.
  The bound is **edition‑pinned** and **plane/units‑declared**; proofs/witness artefacts are referenced (no new numeric claims on faces).
  **Minimal declaration template (normative):**  
  `AdmissibilityConditions := { Domains[]{var, type, range, units, plane}, Guards[]{predicate, editionRefs}, ObservationWindows[]{Γ selector, freshness window}, ObservableSigns[]{name, detection rule}, Editions{… } }`  
  — **No authoring of units/planes** here; only references. — Γ selectors must be explicit.
* **TypeDomainRange.** Type/domain/range compliance of inputs/outputs (ref‑only to definitions).
* **ReinterpretationEquivalence.** Mechanism’s reinterpretation preserves internal meaning on a **PathSlice**.  
  **Witness (normative):** **ReinterpretationEquivalenceWitness** (see §4.7) with: `(i)` `PathSliceId`, `PublicationScopeId`, `(ii)` bidirectional mapping (iso/optic) with Put‑Get/Get‑Put obligations, `(iii)` commuting squares for adjacent raw transfers, `(iv)` **NoHiddenScalarization** assertion (if comparable), `(v)` definedness region.  
  — **No plane/unit change**; any describedEntity change must have `KindBridge (CL^k)` on UTS.
* **LipschitzBounds / stability.** Bounded sensitivity of the mechanism under a declared metric.  
  **Certificate (normative):** `LipschitzCertificate := { metricId (with units/plane), bound L, methodId, methodRef (e.g., spectral estimate / cert. robustness bound), validity region (inputs/state), proof sketch/ref }`.  
  — The **method** MUST be cited; **units/plane** of the metric MUST be explicit; bounds are **ref‑only** at CV; any acceptance action remains GateFit.
* **TypeDomainRange.** Well‑typedness and domain/range consistency for the transformation signature.
  (Enumeration mandated by A.20; GF matters excluded).
* **ReinterpretationEquivalence (StructuralReinterpretation).** Existence of a correspondence/reversibility witness between source and retarget projections; preservation of `⟨L,P,E⃗,D⟩`; no comparator/plane/unit declaration or translation at CV. The witness is **PathSlice‑local** and supports **idempotence & reversibility** within the addressed slice. The normative record is `ReinterpWitness` (see §4.7).

#### A.20:Appendix B — LEX discipline (summary)

Register token classes (Tech) include: `U.TransductionFlow`, `U.TransductionGraph`, `OperationalGate`, `GateProfile`, `GateCheckKind`, `GateCheckRef`, `DecisionLog`, `FreshnessTicket`, `FinalizeLaunchValues`, `SubflowRef`, `FlowEmbed`, `SentinelId`, `PathSliceId`, `SliceRefresh`, `VALATA`; discriminators use `Base__P2W`, `Base__EvaluatingAndRefreshing`; Tech names are ASCII; aliases `GammaTimeRule/Plane`, `CLPlane`, `Phi` follow E.10. A.20 references these tokens; it does not introduce additional LEX classes. **For each surfaced CV check, `GateCheckRef.aspect` is fixed to `ConstraintValidity`.** *MVPK minima for CV faces also include `PathId/PathSliceId` where slice‑local refresh applies (A.22).*
### A.20:End
## A.21 — GateProfilization: OperationalGate(profile) (GateFit core)

**ID:** A.21
**Type:** Architectural pattern

**One-liner.** A single microkernel-style gate aggregates **GateChecks (CV + GF)** into an **order-independent** `GateDecision` via the join-semilattice `abstain ≤ pass ≤ degrade ≤ block`, enforces the **CV⇒GF activation predicate** (and the LaunchGate pre‑run barrier), applies profile-bound folds for `error|timeout|unknown`, and publishes replay-grade traces (MVPK + `DecisionLog` + `EquivalenceWitness`).

### Problem frame

#### Intent & scope

This pattern specifies the **GateFit core** of `OperationalGate(profile)` as the **sole** architectural locus for:

* enumerating and referencing `GateCheckKind`s as publication lexemes (CV kinds live in A.20; GF kinds are bounded here) via `GateCheckRef`,
* aggregating per-check outcomes into a single **publication-level** `GateDecision` using the join lattice,
* enforcing the **CV⇒GF** activation boundary (GateFit checks are inactive until aggregated CV is `pass`),
* defining the minimal **publication faces** and `DecisionLog` content required to make gate outcomes auditable and replayable. 
* applying **SWP at the gate**: `OperationalGate(profile)` (and its `GateCheck`s) is **ref‑only** w.r.t. editions/registries and domain artifacts; it publishes **only** `GateDecision` + `DecisionLog` (pins+refs) and MUST NOT author or mutate edition families.

This pattern is **about the semantics of what is published** (and how it composes), not about procedural execution.
#### Intensional object(s)

* **`OperationalGate(profile)`** — a gate node (`U.Transduction(kind=Check)`) that mediates any **GateCrossing**: any change in `CtxState = ⟨L,P,E⃗,D⟩` **or** entry to `U.WorkEnactment` (via `LaunchGate`). 
* **`GateProfile`** — the profile-bound constraint of the partial function `CtxState_from → CtxState_to`; fully specified in A.26, only *bound* here. 
* **`GateCheckRef`** — the publication lexeme that binds a check to `(aspect, kind, edition, scope)`. 
* **`GateDecision` / `GateDecisionRationale` / `GateDecisionExplanation`** — decision value, structured rationale, and optional narrative (non-decision). 
* **`DecisionLog`** — append-only audit surface linking decisions to check refs, rule anchors, and (where applicable) SquareLaw mismatches.
#### CV vs GF boundary (what “activation” means)

* **ConstraintValidity (CV)** evaluates *internal step lawfulness*;
* **GateFit (GF)** evaluates *external admissibility vs `GateProfile`* (planes/crossings, freshness, evidence, roles/channels, regulator conformance, etc.). 
* **Ordering & activation.** CV is evaluated before GateFit; **while `CV ≠ pass`, all GateFit checks return `abstain`.**
#### Failure surfaces (diagnostic lens)

* **CV ✔ / GF ✖**: lawful transformation, but wrong gate/profile/role/timing/evidence. 
* **CV ✖ / GF ?**: fix mechanism validity first; GF is inactive. 
* **CV ✔ / GF ✔**: admissible to proceed (publish/deploy).
#### Non-goals

* No procedural semantics (no scheduling, no API formats, no automation narratives). 
* No “second ladder” of processes outside the graph: every **check-point** is an `OperationalGate(profile)` node in the same transduction graph; its **pluggable GateChecks** are declared on the node (no floating checks), and only the declared check set + reaction rules vary across gates. 
* No key/hash/cache *formats*: A.21 constrains **equivalence + invalidation conditions**, but not key materialization. 
* No lexical “pseudo-gating”: the lexical layer is non-decisional and MUST NOT be modeled as a GateCheckKind.
### Problem

Without a unified GateFit core:

* Gate admissibility becomes ad-hoc, **order-dependent**, and hard to audit (especially with multiple independent checks). 
* Gate logic leaks into CV (planes/comparators/freshness/roles appear “inside steps”), collapsing the CV/GF separation. 
* “Unknown / timeout / error” behavior becomes implicit and inconsistent across transitions, undermining reproducibility and safety. 
* Publication faces drift into “extra semantics” (computed scalars / tool encodings) rather than pins + refs, breaking MVPK discipline.
### Forces

* **Separation vs convenience.** Keeping CV internal and GF profile-bound avoids leakage, but demands a crisp activation boundary. 
* **Determinism vs incompleteness.** Gates must remain deterministic even when evidence is missing or partial (`unknown`). 
* **Safety vs throughput.** Some profiles must treat ambiguity as `block`, others as `degrade`. 
* **Human comprehension vs formal minimality.** Optional narratives help readers, but must never masquerade as decisions. 
* **Reuse vs freshness.** Decisions may be reusable only under explicit equivalence; otherwise re-aggregation is mandatory. 
* **Scope granularity vs complexity.** Checks are declared with scopes (`lane|locus|subflow|profile`) and merged; duplicates must preserve evidence rather than overwrite it.
### Solution

#### Gate = microkernel of checks

> **Note (guards are not GateChecks).** `USM.CompareGuard` / `USM.LaunchGuard` are **not** `GateCheckKind`s; they may emit `GuardFail` events which are **aggregated by the owner gate** under the active profile (`degrade|block`) and recorded in `DecisionLog` (details in A.24). 
`OperationalGate(profile)` is treated as a microkernel: checks are **pluggable** `GateCheck`s; the gate core **aggregates** their outputs **conceptually**, without procedural semantics and without mutating the transduction graph.
#### Publication lexemes and register discipline

**Per-check reference lexeme.**
`GateCheckRef := { aspect, kind, edition, scope }`, where:
* `aspect ∈ {ConstraintValidity, GateFit}`,
* `scope ∈ {lane|locus|subflow|profile}`.

**Authoring shorthand (deprecated; MUST NOT be surfaced).**
If a short form `GateCheckRefLegacy := { kind, edition, scope }` appears in prose as a local shorthand, it SHALL be interpreted only as a projection of the normative record with `aspect` supplied explicitly at the point of surfacing. Any published face or `DecisionLog` entry MUST use the full `GateCheckRef` with `aspect`.

**Decision terminology separation.**

* `GateDecision` is the published lattice value.
* `GateDecisionRationale` is the minimal structured support of that decision (check outcomes, folds, witness refs).
* `GateDecisionExplanation` is optional, human-readable, derived from the rationale; it **does not carry decision status** and MUST NOT be used as one.  

**Register discipline.** Tech labels are ASCII and twin-labeled where the plain form uses symbolic notation. 
(Example: use `CLPlane` / “CL^plane”, `CLKind` / “CL^k”, `UNM.TransportRegistryPhi` / “UNM.TransportRegistryΦ”, `GammaTimeRule` / “Γ_timeRule”.)
#### CV⇒GF activation predicate (counterfactual boundary)

GateFit checks are *defined* as inactive unless the CV aspect is `pass`:
* Let `CV.Status` be the join-aggregate of all `GateCheckRef` with `aspect=ConstraintValidity`.
* For any `GateCheckRef` with `aspect=GateFit`:
  **If `CV.Status ≠ pass`, the GateFit check outcome is `abstain`.** 
* While `CV.Status ≠ pass` **(or the active profile suppresses narratives)**, any GateFit-oriented `GateDecisionExplanation` **does not apply**. 

This keeps the boundary crisp: CV explains internal lawfulness; GF explains profile-fit **only in the counterfactual world where CV passed**. 

**LaunchGate pre‑run barrier (work‑boundary special case).**

For the unique `LaunchGate` at the entry of each `U.Work`/`U.WorkEnactment`, let `Prev.CV.Status` denote the aggregated `ConstraintValidityStatus` of the **immediately preceding** step on the same `PathSlice`.

* If `Prev.CV.Status ≠ pass`, then (i) all GateFit-scoped LaunchGate checks return `abstain` by activation, and (ii) the **overall LaunchGate** decision is forced to `block` (pre‑run barrier). The rationale MUST record the predecessor CV status and the forced-block rule in `DecisionLog`.

This is a publication-level safety invariant: it constrains what may be admitted at the work boundary without specifying evaluation order or execution scheduling.
#### Decision algebra: join-semilattice (“worst wins”)

**Decision domain.** `GateDecision ∈ {abstain, pass, degrade, block}`.

**Aggregation rule.** Aggregation over all applicable checks is the **idempotent, commutative, associative join** on
`abstain ≤ pass ≤ degrade ≤ block`, with **neutral = `abstain`** and **absorbing = `block`**. 

Publications surface only:

1. the aggregated `GateDecision`, and
2. its `GateDecisionRationale` recorded in the `DecisionLog`.
#### Profile-bound folds for error|timeout|unknown

A check may encounter `error`, `timeout`, or evidence-level `unknown`. These do **not** become new decision values; they are folded into the decision lattice **by profile and check policy**.
**Normative minimum folds (tri-state).**  

> **Naming note.** Some conformance tables use **Lean** as a label for the `GateProfile=Lite` gating posture. Treat this as an alias only, and do not confuse it with `PublishMode=Lite` (a publication-face reduction mode).

| Active `GateProfile` | `error` fold | `timeout` fold | `unknown` fold (evidence-level) |
| -------------------- | -----------: | -------------: | ------------------------------: |
| `Lite`               |    `degrade` |      `degrade` | per `GateCheck` policy (`abstain` or `degrade`) |
| `Core`               |    `degrade` |      `degrade` | per `GateCheck` policy (`abstain` or `degrade`) |
| `SafetyCritical`     |      `block` |        `block` | per `GateCheck` policy (safety-default: `degrade`) |
| `RegulatedX`         |      `block` |        `block` | per `GateCheck` policy (safety-default: `degrade`); X identity/edition are surfaced in `DecisionLog` |
| `RegulatedX`         |      `block` |        `block` | per `GateCheck` policy (safety-default: `degrade`); X identity/edition are surfaced in `DecisionLog` |

Where a `GateCheck` declares an evidence-level `unknown` strategy, that strategy is part of the check’s intensional definition; the fold applied and its justification are recorded in `DecisionLog`.
#### GateProfiles: binding only (full spec in A.26)

A.21 binds the following *functional role* of `GateProfile`:

> **Terminology (avoid `Lite`/`Lean` confusion).** `GateProfile=Lite|Core|SafetyCritical|RegulatedX` is the **gating posture** that determines the effective GateCheck set and fold policies. `PublishMode=Lite` is a **publication-face reduction mode** (AssuranceLane‑Lite / TechCard‑Lite) and MUST NOT be interpreted as a weaker `GateProfile`.

* A `GateProfile` is an attribute of a **branch / `PathSlice`**; the default is `Core`. 
* Local overrides may change the active profile for the transition and below **but cannot reduce** the already-effective set of `GateCheckKind`s; only additions are allowed. Weakening requires a new `PathSlice` via sentinel. 
* `PublishMode=Lite` affects *faces only* and does **not** weaken the check set or aggregation rule.
#### Scope and merge semantics (lane|locus|subflow|profile)

* Each `GateCheckRef` declares its scope; `subflow` scope is bounded by a sentinel bridge (restart / refresh boundary). 
* The effective check set is formed by **union across all declared scopes**; duplicates by `kind` merge by the same join rule (“worst wins”), and **all rationales are preserved** in `DecisionLog`.
  * For `RegulatedConformance(X)`, the identity of **X** and its rule/edition reference are part of the rationale surface; multiple `RegulatedConformance(X{…})` may coexist in one gate.
* A check outside its scope reports `abstain`.
#### Publication repeatability, caching, and re-aggregation triggers

**Repeatability (publication-level).** Gate decisions MUST be replayable from declared pins/refs: no implicit “latest/now”. Any time basis is made explicit via `Γ_time` (or a `Γ_timeRule` that resolves to a concrete basis), and the resolved basis is recorded in `DecisionLog`.

**Caching constraint (publication-level).** A gate decision may be cached **only** per
`{PathSliceId, GateProfile, GateChecks.editions, editions{…}}`, where `GateChecks.editions` denotes the canonicalized, order-independent listing of the **effective** `GateCheckRef{aspect,kind,edition,scope}` (including their `edition`s) for this gate instance. Cache reuse is valid only while the declared freshness/evidence window remains valid under the active profile.

**Re-aggregation triggers (non-exhaustive, normative).** Re-aggregation is required if any of the following changes (slice-local; no execution procedure implied):


* any component of `editions{…}` changes (any `edition_key ↦ EditionId` bump),
* any `GateCheckRef.edition` changes (including regulator X editions for `RegulatedConformance(X)`),
* the declared `Γ_time` basis changes or resolves differently,
* a relevant `FreshnessTicket` expires/changes or TOCTOU window constraints change,
* a sentinel-bounded `subflow` refresh introduces a new RSCR carrier affecting the rationale surface,
* any input breaks the declared equivalence witness (A.41).

Decision stability is under the equivalence relation of A.41; a witness is surfaced on the `DecisionLog` (see §4.10). A.21 constrains equivalence + invalidation conditions but does not fix key formats.
#### MVPK faces for OperationalGate(profile) (minimum pins)

The gate publishes faces to record **what is declared**, not “how it executes”. Faces remain **pins + refs** (no new numeric claims; no I/O re-listing).

**Minimum pins (PlainView / TechCard / AssuranceLane where applicable).**

* View scope: `PublicationScopeId` (with MVPK profile: `Min|Lite|SetReady|Max`)
* Identity: `GateId`, `BridgeId`, `PathId`, `PathSliceId`
* Temporal: `DesignRunTagFrom`, `DesignRunTagTo`
* Profile: `GateProfile` (PublishMode affects only face reduction)
* Checks: list of `GateCheckRef` (`aspect`, `kind`, `edition`, `scope`)
* CV: aggregated `ConstraintValidityStatus` and optional `ConstraintValidityWitnessRef` (refs only)
* Editions: `editions{…}` vector + `EditionPins{CGSpec, ComparatorSet, UNM.TransportRegistryPhi}`
  * **Gate-requirement on edition refs.** Any face that cites `CGSpec` / `ComparatorSet` / `UNM.TransportRegistryΦ` editions MUST also include `BridgeCard + UTS row` (A.27); otherwise downstream consumption is non-conformant.
* ReferencePlane & CL: source/target `ReferencePlane` pins; `CLPlane` / “CL^plane” (for non-crossings `CL^plane = none` is allowed, but pins are still explicit); any Φ penalties are surfaced as rule refs and route to the **R-channel only**
* Freshness: declared `GammaTime` / “Γ_time” pin and presence/absence of `FreshnessTicket` (refs)
* Evidence: SCR/RSCR carrier anchors (refs) + VALATA (VA/LA/TA) presence on AssuranceLane
* Guards: `USM.CompareGuard` / `USM.LaunchGuard` applicability pins (presence-only; GuardFail is handled by the owner gate per A.24)
* Decision: aggregated `GateDecision` and `DecisionLogRef`

**Lean face (PublishMode=Lite).** It MAY fold to `GateProfile / GateChecks / EditionPins / GateDecision + DecisionLogRef`, but:

* it MUST keep `GateProfile` and `DecisionLogRef`,
* it MUST not weaken GateChecks or the aggregation algebra, and
* if `EditionPins` are present, it MUST still include `BridgeCard + UTS row` (A.27) and preserve the “red lines” on crossings (explicit `ReferencePlane`, `CLPlane`, and Φ → R-channel only).
#### DecisionLog (minimum composition)

`DecisionLog` is an append-only record of reasons and references: 

* gate identity + `PathSliceId` (+ `PublicationScopeId` when the log is surfaced via a face bundle)
* each `GateCheckKind`, its `GateCheckRef.edition`, and its folded outcome (`pass|degrade|block|abstain`) including the applied `error|timeout|unknown` fold
* rule anchors / evidence anchors (SCR/RSCR carriers + VALATA bindings); where relevant, mismatched pins (SquareLaw) are called out explicitly
* policy-id dependencies used by checks (as `PolicyIdRef` bundles per F.8:8.1), including `Φ(CL)`, `Φ_plane`, and `Ψ(CL^k)` where relevant, plus any gate-local policy-ids consulted by the active profile
* `GuardFail` events (from `USM.Guards`) aggregated by the owner gate with the applied profile rule (`degrade|block`)
* `EquivalenceWitness` (or `EquivalenceWitnessRef`) as a publication surface per A.41, minimally: `{ keys, E⃗, Γ_time(basis), PathSliceId?, ReturnShapeClass, ComparatorSetRef?, profile }`
* the declared publish reaction for `degrade|block` (including any local “degrade mode” notes when permitted by profile)
* for `RegulatedConformance(X)`: the identity of X and the rule/edition references used
#### GateChecks admissibility (GateFit-only catalog boundary)

**Mandatory on LaunchGate.** `FreshnessUpToDate`, `DesignRunTagConsistency`.  
**Allowed GateFit checks (non-exhaustive, normative minima).** 

* `DesignRunTagConsistency` (mandatory on LaunchGate; may appear elsewhere)
* `FreshnessUpToDate` (mandatory on LaunchGate; may appear elsewhere)
* `ReferencePlaneCrossing`
* `ComparatorConstraintRules (CSLC)`
* `EvidenceCompleteness`
* `SafetyEnvelope`
* `RegulatedConformance(X)` (X identity + edition/rule refs are surfaced in `DecisionLog`)
* `Role/ChannelFit` (roles are Kernel `U.Role` tokens, not alias strings)
* `EquivalencePreservation`
* `OutflowAudit`
* `SnapshotConsistency`

**Forbidden (hard boundary).**

* Modeling CV classes “as GateFit” (CV classes remain CV; GF remains GF). 
* Any “LEX gate checks” or lexical pseudo-checking (lexical views do not participate in decisions).
#### SquareLaw compatibility at crossings

For every GateCrossing, the SquareLaw constraint must hold:
`gate_out ∘ transfer = transfer' ∘ gate_in`. 

Profile selection/inheritance does not weaken this requirement; inconsistency yields `block|degrade` within the active profile and is recorded in the DecisionLog. LaunchGate is a work-boundary GateCrossing case, so SquareLaw is mandatory there as well.
#### Lexical mediation (optional trace, non-decisional)

A gate MAY publish a `LexicalResolutionRef` / `LexicalView` for traceability of alias resolution, but:

* it does **not** participate in aggregation, and
* it does **not** influence `GateDecision`.
### Archetypal Grounding

#### System vignette — “Regulated release gate”

**Tell.** A flow reaches a `LaunchGate` just before a `U.WorkEnactment` that can finalize binding. The active profile is `RegulatedX`. The gate publishes a single `GateDecision` and a `DecisionLog` that explains *why* the release is admissible (or not), without encoding any execution procedure.

**Show A (CV ✔, GF ✖).** CV checks are `pass`, activating GateFit. `RegulatedConformance(X)` is present but evidence anchors are incomplete (`EvidenceCompleteness` folds to `degrade` under `Core/RegulatedX` policy), so the join yields `degrade`. The DecisionLog records which `GateCheckRef` caused the fold and the declared publish reaction for degraded release. 

**Show B (CV ✖, GF n/a).** CV aggregate is `degrade`. All GateFit checks return `abstain` by activation, and any GateFit-oriented explanation is inapplicable. The gate’s published decision is driven by CV; the DecisionLog shows CV status and the “inactive GF” boundary rather than a fabricated GF narrative.
#### Episteme vignette — “Cross-plane comparability gate”

**Tell.** A flow transitions into a comparability-critical step (CSLC). The gate must surface `BridgeId + UTS + CLPlane` and edition pins for downstream consumers, and must remain stable under A.41 equivalence.

**Show A (Core, clean crossing).** The gate publishes `EditionPins{CGSpec, ComparatorSet, TransportRegistryPhi}`, `ComparatorSetRef`, `CL/CLPlane`, and a `GateDecision=pass` with a rationale that cites the relevant `GateCheckRef`s and editions. 

**Show B (SquareLaw mismatch).** A crossing attempts to change plane pins without the commutative-square witness; the SquareLaw check yields `block` (or `degrade` under a weaker profile), and the DecisionLog records the mismatched pins as the reason.
### Bias-Annotation

This pattern’s built-in biases are stated across the five Principle-Taxonomy lenses (Gov, Arch, Onto/Epist, Prag, Did). 

* **Gov.** Bias toward auditability and explicit responsibility (DecisionLog + profile-bound folds). Risk: gate owners become de facto governors; mitigation: keep profiles explicit, inheritable, and pinned to `PathSliceId` for reviewable replay. 
* **Arch.** Bias toward a microkernel of checks (pluggable GateChecks + join aggregation). Risk: “check sprawl”; mitigation: scope discipline + forbidden LEX pseudo-checking + CC-based profile minima. 
* **Onto/Epist.** Bias toward a 4-value admissibility lattice and explicit “does not apply” boundaries. Risk: oversimplifying nuanced epistemic uncertainty; mitigation: preserve structured rationales and allow check-level `unknown` policies rather than inventing new global decision values. 
* **Prag.** Bias toward determinism and replayability (cache invalidation by pinned vectors). Risk: higher publication overhead; mitigation: PublishMode=Lite for faces (never for weakening checks). 
* **Did.** Bias toward explicit separation (CV vs GF) and “what is published” clarity. Risk: more concepts to learn; mitigation: archetypal grounding + stable minimal pins across faces.
### Conformance Checklist

Minimum unified conformance for A.21 (and any flow that claims GateFit discipline):

#### Core gate semantics

* [ ] **CC‑TGA‑06**: all GateCrossings (CtxState changes, and work-boundary crossings via LaunchGate) are mediated by `OperationalGate(profile)` and have a `DecisionLog`. 
* [ ] **CC‑TGA‑07**: CV⇒GF activation predicate holds (`CV≠pass ⇒ GF=abstain`). 
* [ ] **CC‑TGA‑21**: decision stability witness is present on the `DecisionLog` surface (A.41 `EquivalenceWitness`). 
* [ ] **CC‑TGA‑21a**: aggregation is the join on `abstain ≤ pass ≤ degrade ≤ block`; `GateDecisionExplanation` is optional and non-decisional. 
* [ ] **CC‑TGA‑22**: `error|timeout` folds are profile-bound; `unknown` folds per GateCheck policy.
#### LaunchGate discipline (pre-run barrier)

* [ ] **CC‑TGA‑08**: every `U.WorkEnactment` has exactly one `LaunchGate` with mandatory `FreshnessUpToDate` + `DesignRunTagConsistency`; **pre‑run barrier:** if the immediately preceding aggregated `ConstraintValidityStatus ≠ pass`, then all LaunchGate GateFit checks are `abstain` and the overall LaunchGate decision is `block` (logged). 
* [ ] **Pre‑Run barrier** is satisfied for any `U.Work` where `FinalizeLaunchValues` is possible.
#### Publication and evidence

* [ ] **CC‑TGA‑20**: `PublishMode=Lite` affects faces only; required GateChecks remain intact. 
* [ ] **CC‑TGA‑25**: AssuranceLane surfaces `GateProfile`, `GateCheckRef` list, edition pins, `GateDecision`, and `DecisionLogRef` with the two-layer evidence scheme (SCR/RSCR + VALATA).
#### Cross-boundary additions (when the gate is a crossing)

* [ ] **CC‑TGA‑11**: crossings publish `BridgeId + UTS + CLPlane/CL^plane`, penalties route to the R-channel only. 
* [ ] **CC‑TGA‑23**: SquareLaw holds on crossings; mismatch yields `block|degrade` per profile and is logged.
#### Lexical norms (E.10 discipline)

* [ ] Tech names are ASCII and twin-labeled; required token classes are registered under LEX (including `GateProfile`, `GateCheckKind`, `GateCheckRef`, `DecisionLog`). 
* [ ] Any lexical alias view is trace-only and does not affect decisions.
### Consequences

**Benefits**

* **Deterministic gating.** Join-semilattice aggregation makes decisions order-independent and idempotent (modulo declared equivalence), enabling consistent audit and replay. 
* **Clean CV/GF separation.** Activation boundary prevents profile concerns from leaking into mechanism validity. 
* **Profile clarity.** Fold policies (`error|timeout|unknown`) are explicit and profile-bound, making safety posture reviewable. 
* **Publication hygiene.** MVPK faces remain pins+refs (no new numeric claims), and DecisionLog captures rationale without procedural commitments. 

**Trade-offs**

* **More artifacts to publish.** Decisions are not “just pass/fail”: they require rationales, pins, and logs. 
* **Two-stage reasoning.** Users must internalize “GF does not apply until CV passes”; mitigated by explicit inapplicability rules and optional narratives only when applicable. 
* **Scope complexity.** Multi-scope merge semantics can feel heavy; mitigated by union + worst-wins + preserved rationales.
### Rationale

* The microkernel framing preserves a single graph semantics: checks are nodes and publications, not an external pipeline; this blocks the emergence of a “second ladder” of hidden processes. 
* The join lattice provides a minimal, monotone aggregation that supports:

  * early absorption at `block` without specifying execution strategy, and
  * deterministic publication semantics (commutative + associative + idempotent). 
* CV⇒GF activation is the mechanism that keeps orthogonality strict while still publishing a single gate decision surface: GF results never “mask” CV failures. 
* Explicit folds for `error|timeout|unknown` make safety posture reviewable and profile-specific without inventing new decision values.
### SoTA-Echoing

Anchors (post-2015) that this pattern **adopts/adapts/rejects**, consistent with the assignment’s intent (assured lanes, open graphs/hypergraph categories, join-semantics). 

* **Adopt.** *Join-semilattice aggregation as deterministic, order-independent merge* (distributed systems / CRDT literature, e.g., Kleppmann 2017; Kleppmann & Beresford 2017): A.21 reuses the algebraic idea to make gate outcomes commutative/associative/idempotent without prescribing evaluation order.
* **Adapt.** *Compositional reasoning with commuting diagrams* (applied category theory, e.g., Fong & Spivak 2019): A.21 adapts the intuition by making SquareLaw a gate-audited invariant on crossings, while keeping publications human-first and pin-based.
* **Adapt.** *Supply-chain provenance / policy gating via attestations* (software supply-chain security, e.g., in-toto 2019; SLSA 2021+): A.21 adapts the “attestation + policy check + logged decision” structure, but expresses it as MVPK pins + `DecisionLog`, not tool-specific workflows.
* **Reject.** *Narrative-as-authority.* Any approach where human-readable explanations function as decision-bearing artifacts is rejected; in A.21, narratives remain optional derivatives of structured rationales and are explicitly non-decisional.
### Relations

* **E.TGA →hosts→ A.21.** GateFit-scoped GateChecks are aggregated by `OperationalGate(profile)`; enumeration and publication shape of GateChecks live here. 
* **A.20 →couples_to→ A.21 via CV⇒GF.** CV is evaluated inside transformations; while CV≠pass, GF is `abstain` and GF explanations do not apply. 
* **A.26 →fully_specifies→ GateProfile.** A.21 binds to A.26 for the profile matrix, inheritance rules, and detailed mandatory check sets. 
* **A.25 (Sentinel/SubFlow) →provides→ scope boundaries.** `subflow` scope is bounded and restartable; weakening check sets requires new `PathSlice`. 
* **A.27 (Bridge+UTS) →required_by→ any edition-citing face.** Whenever gate faces cite editions, the compatibility surface (BridgeCard + UTS + `CL/CLPlane`) is required for downstream consumption. 
* **A.41 →defines→ equivalence for decision stability.** Gate decisions are stable only under the declared equivalence witness; breaking equivalence implies re-aggregation.
### A.21:End
