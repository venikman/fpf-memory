---
title: "U.Episteme — Epistemes and their slot graph"
description: "Part C - Kernel Extension Specifications"
---

# U.Episteme — Epistemes and their slot graph
> Pattern `C.2.1` · Stable
> Part C - Kernel Extension Specifications

> **One-line summary.** `U.Episteme` is the holon type for epistemes; its internal ontology is given by `U.EpistemeSlotGraph`, which replaces the legacy **semantic triangle** with a typed graph n-ary relation over `DescribedEntity`, `GroundingHolon`, `ClaimGraph`, `Viewpoint`, `View`, and `ReferenceScheme`, aligned with `U.RelationSlotDiscipline` and ready for both symbolic and distributed representations.

FPF’s kernel recognises two archetypal sub‑holons: **System** and **Episteme**. Systems are operational wholes; **epistemes** are **knowledge holons**—theories, models, specifications, standards, algorithms, proofs—whose reason for being is to **say something defeasible or deductive about something** and to be **held to account** by justification.

## Keywords

- episteme
- EpistemeSlotGraph
- DescribedEntitySlot
- GroundingHolonSlot
- ClaimGraphSlot
- ViewpointSlot
- ReferenceScheme
- RepresentationScheme
- View/Viewpoint.

## Relations

- `C.2.1` --outline_parent--> [KD‑CAL](/generated/patterns/C.2)
- `C.2.1` --outline_next_sibling--> [Reliability R in the F–G–R triad](/generated/patterns/C.2.2)
- `C.2.1` --explicit_reference--> [U.Signature — Universal, law‑governed declaration](/generated/patterns/A.6.0)
- `C.2.1` --explicit_reference--> [U.RelationSlotDiscipline - SlotKind / ValueKind / RefKind discipline for n‑ary relations (with slot‑operation lexicon)](/generated/patterns/A.6.5)
- `C.2.1` --explicit_reference--> [U.EffectFreeEpistemicMorphing — Effect-Free Morphisms of Epistemes](/generated/patterns/A.6.2)
- `C.2.1` --explicit_reference--> [U.EpistemicRetargeting — describedEntity-Retargeting Morphism](/generated/patterns/A.6.4)
- `C.2.1` --explicit_reference--> [Multi‑View Publication Kit (for Morphisms)](/generated/patterns/E.17)
- `C.2.1` --explicit_reference--> [KD‑CAL](/generated/patterns/C.2)
- `C.2.1` --explicit_reference--> [Holonic Foundation: Entity → Holon](/generated/patterns/A.1)
- `C.2.1` --explicit_reference--> [Strict Distinction (Clarity Lattice)](/generated/patterns/A.7)
- `C.2.1` --explicit_reference--> [U.ViewpointBundleLibrary — Reusable Viewpoint Bundles](/generated/patterns/E.17.1)
- `C.2.1` --explicit_reference--> [TEVB — Typical Engineering Viewpoints Bundle](/generated/patterns/E.17.2)
- `C.2.1` --explicit_reference--> [U.MultiViewDescribing — Viewpoints, Views & Correspondences](/generated/patterns/E.17.0)
- `C.2.1` --explicit_reference--> [Intension–Description–Specification Discipline (I/D/S)](/generated/patterns/E.10.D2)
- `C.2.1` --explicit_reference--> [Evidence Graph Referring (C-4)](/generated/patterns/A.10)
- `C.2.1` --explicit_reference--> [Trust & Assurance Calculus (F–G–R with Congruence)](/generated/patterns/B.3)
- `C.2.1` --explicit_reference--> [Advanced Mereology: Components, Portions, Aspects & Phases](/generated/patterns/A.14)
- `C.2.1` --explicit_reference--> [Local-First Unification Naming Protocol](/generated/patterns/F.18)
- `C.2.1` --explicit_reference--> [U.EpistemicViewing — describedEntity-Preserving Morphism](/generated/patterns/A.6.3)
- `C.2.1` --explicit_reference--> [SCR/RSCR Harness for Unification](/generated/patterns/F.15)
- `C.2.1` --explicit_reference--> [Alignment & Bridge across Contexts](/generated/patterns/F.9)
- `C.2.1` --explicit_reference--> [External Transformer & Reflexive Split (C-2)](/generated/patterns/A.12)
- `C.2.1` --explicit_reference--> [FPF Authoring Conventions & Style Guide](/generated/patterns/E.8)
- `C.2.1` --explicit_reference--> [LEX-BUNDLE: Unified Lexical Rules for FPF](/generated/patterns/E.10)

## Content

## Context

FPF’s kernel recognises two archetypal sub‑holons: **System** and **Episteme**. Systems are operational wholes; **epistemes** are **knowledge holons**—theories, models, specifications, standards, algorithms, proofs—whose reason for being is to **say something defeasible or deductive about something** and to be **held to account** by justification. 

**Readers.** Engineering managers and lead designers who need a uniform way to reason about **theories, specifications, algorithms, proofs**—from charter memos up to formal axiomatics—without collapsing into tooling or discipline‑specific notations.

KD‑CAL (C.2) needs a precise notion of **what an episteme is** and **how it mediates** between:

* the thing(s) it is about,
* the contexts and systems that ground and test it, and
* the representational machinery (notations, carriers, operations) we use to work with it.

Contemporary work on **formal languages as cognitive artifacts** (Dutilh Novaes), **operational iconicity** of notations (Krӓmer), **material engagement** (Malafouris), **distributed representations** and **latent‑space communication** in ML, and **tool‑augmented reasoning** (ReAct‑style agent loops) shows that:
* the relation between an episteme and its **DescribedEntitySlot** is not a single “Object-vertex”: it involves explicit **slots and morphisms** (described-entity mapping, grounding, evaluation) typed by SlotKinds and contexts;
* **representations** come in heterogeneous forms (symbolic, diagrammatic, latent, interactive), with very different **operational affordances**;
* **inference** is often **mixed‑mode**: symbolic reasoning plus calls to tools, solvers, and learned models.

FPF therefore needs a **more modular, graph‑shaped ontology** for epistemes which:
* keeps **KD‑CAL** and I/D/S discipline intact,
* is compatible with **A.6.0/A.6.5** signatures (`SlotKind`/`ValueKind`/`RefKind`),
* can be used uniformly by A.6.2–A.6.4 (epistemic morphisms) and E.17.* (views & publication),
* and demotes the old non-SoTA **semanit triangle** to a **didactic projection**, not the normative ontology.

In this pattern:+
* `U.Episteme` is the **holon genus** for epistemes (C.2), with components and identity governed by A.1/A.6.0/A.7.
* `U.EpistemeSlotGraph` names the **internal ontology graph** of `U.Episteme`: the small, typed n-ary relation over episteme positions (`DescribedEntitySlot`, `GroundingHolonSlot`, `ClaimGraphSlot`, `ViewpointSlot`, `ViewSlot`, `ReferenceSchemeSlot`) on which KD-CAL, A.6.2–A.6.4 and E.17.* rely.
* Species such as `U.EpistemeCard`, `U.EpistemeView`, `U.EpistemePublication` are holonic realisations of `U.Episteme` whose component structure is constrained to be compatible with `U.EpistemeSlotGraph`.
## Problem

Without a shared **episteme constitution**, teams fall into recurring failure modes:

1. **Object–Description–Carrier soup.** Diagrams and files are treated as *the theory itself*. Changes to a PDF are confused with theoretical change.
2. **DescribedObject blur.** A spec seems to describe “everything in general”. The **GroundingHolon**—*what exactly this knowledge is about*—is implicit and drifts.
3. **Proof vs program confusion.** Algorithms, specifications, and proofs are mixed: a “proof” is used as if it were a tested routine; a “program” is cited as if it entailed a theorem (Curry–Howard misunderstood).
4. **Unanchored trust.** Claims accumulate with no explicit **justification graph** or **evidence freshness**, so assurance degrades invisibly.
5. **Category errors at execution.** Epistemes appear as *actors* (“the standard enforces…”) instead of **systems** acting *with* or *on* epistemes such as data sets or algorithms.

The legacy non-SoTA “Semantic Triangle” treated an episteme as a holon with three components: **Concept** (ClaimGraph), **Object** (Reference Map), and **Symbol** (notation).

This worked well for:
* separating **meaning** (Concept) from **carriers**, and
* integrating KD‑CAL’s **F–G–R** characteristics (Formality, ClaimScope, Reliability).

But for current use‑cases it has structural blind spots:

1. **No explicit DescribedEntity slot.**
   The “Object vertex” bundles together *what the episteme is about* with *how we interpret and test it*. There is no explicit **slot** for the entity‑of‑interest (`U.Entity`) and no clear separation between:
   * the **thing described**, and
   * the **ReferenceScheme** used to read claims as statements about that thing.

2. **Grounding collapses into Object.**
   Material and organisational contexts (labs, infrastructures, organisations) that **ground** an episteme (in Malafouris’ sense) are hidden in the Object/Reference Map. KD‑CAL and Bridges need explicit **GroundingHolon** positions.

3. **Viewpoints are not first‑class.**
   ISO‑style **viewpoints** (families of stakeholders, concerns, conformance rules) and their induced **views** appear only indirectly, via KD‑CAL or MVPK. There is no explicit `U.Viewpoint` / `U.View` pair at the episteme core, which makes it hard to:

   * connect to I/D/S **DescriptionContext**,
   * organize multi‑view descriptions (E.17.0), or
   * align publication viewpoints with engineering viewpoints.

4. **Representations and operations are compressed into “Symbol”.**
   Very different representational regimes are flattened into one Symbol vertex:

   * purely denotational notations (no internal inference calculus),
   * fully operational calculi (e.g., proof assistants),
   * interactive visualisations,
   * latent vectors and prompt‑programs for LLMs.
     There is no place to say “this representation admits **syntactic inference** of such‑and‑such kind” vs “this is just a **passive label**”.

5. **No explicit signature discipline.**
   The triangle speaks of “Object/Concept/Symbol” but not of **slots** and **references** in the sense of A.6.5 `U.RelationSlotDiscipline`. In episteme this leads to:
   * names where **slot, value and ref** are conflated (`DescribedEntityRef` used as if it were a slot),
   * ambiguity between “epistemic object” (what is talked about) and “episteme” (the description),
   * fragile interoperability with signatures for roles, methods, services.

Thus we have problems of:
* **DescribedEntity drift.**
 Specifications and models accumulate without a stable notion of **which DescribedEntity they talk about**; fields like `SubjectRef` are overloaded and resist safe refactoring.
* **Viewpoint confusion.**
  Engineering, publication and governance views are mixed, making it hard to maintain consistency across surfaces or to reason about conformity of descriptions under different viewpoints.
* **Representation mismatches.**
  Trade‑offs between neural vs symbolic, diagrammatic vs textual, or interactive vs batch representations cannot be expressed at the episteme level; they leak into ad‑hoc tool descriptions.
* **Broken modularity.**
  As soon as we add KD‑CAL, LOG‑CAL, MVPK, and E.TGA, multiple **implicit triangles** appear, each with slightly different semantics, instead of a single shared `U.EpistemeSlotGraph`.

We need a replacement for the triangle that keeps its **didactic clarity** but matches the **graph‑ and morphism‑centric** reality of contemporary epistemic work.
## Forces

| Force                                          | Tension we must resolve                                                                                                                |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Geometry vs. operations**                    | Simple geometric pictures (triangles) are memorable; real epistemic work is **operational and graph‑shaped** (many nodes, many edges). |
| **Universality vs. representation regimes**    | One ontology must accommodate symbolic calculi, diagrams, DSLs, interactive notebooks, and latent vectors.                             |
| **Intension vs. description vs. spec (I/D/S)** | Intensional objects (I) are not epistemes; descriptions (D) and specifications (S) are. The core must honour Strict Distinction.       |
| **Viewpoint locality vs. reuse**               | Viewpoints should be **local** to families of descriptions, yet we want reusable **viewpoint bundles** across domains (E.17.1/E.17.2). |
| **Slot discipline vs. usability**              | A clean `SlotKind`/`ValueKind`/`RefKind` discipline is vital for reasoning, but must not render engineering episteme unreadable.             |
| **Stability vs. SoTA evolution**               | The core must remain stable while integrating evolving practices: LLM tool‑use, ReAct‑style loops, structured cospans, optics, etc.    |
## Solution — from outdated semantic triangle to U.EpistemeSlotGraph

### Overview

For `U.Episteme`, the legacy semantic triangle is replaced by `U.EpistemeSlotGraph` that is a **small, typed ontology graph** and an **n-ary relation view** over the core episteme positions:

 **Nodes / positions / slots.**
  Minimal **kernel SlotKinds** (with their ValueKinds) that every episteme can refer to, following A.6.5:
  * `DescribedEntitySlot`  (ValueKind `U.Entity` or a declared subkind) → *“what this episteme is about”*;
  * `GroundingHolonSlot`   (ValueKind `U.Holon`) → *“where/how this is grounded”*;
  * `ClaimGraphSlot`       (ValueKind `U.ClaimGraph`) → *“what is being said (intensional content)”*;
  * `ReferenceSchemeSlot`  (ValueKind `U.ReferenceScheme`) → *“how we read claims as statements about entities”*;
  * `ViewpointSlot`        (ValueKind `U.Viewpoint`) → *“under which viewpoint we read/validate this episteme”*;
  * `ViewSlot`             (ValueKind `U.View`) → *“a view‑episteme produced under a viewpoint”*.

* **Slots and signatures.**
  These positions are realised as **SlotKinds** with associated **ValueKinds** and **RefKinds** under `U.RelationSlotDiscipline` (A.6.5). An **episteme kind** (`U.EpistemeKind`) is a **signature** over these slots.

* **Episteme as n‑ary relation and as holon.**
  Each concrete episteme instance can be seen both as:

  * a **tuple** filling these slots (`U.EpistemeTuple`), and
  * a **holon with components** (`U.EpistemeCard`, `U.EpistemeView`, `U.EpistemePublication`) whose fields correspond to those slots.

`U.Episteme` is thus the holon type whose components are *disciplined* by the `U.EpistemeSlotGraph`; C.2.1 fixes that discipline.

* **Morphisms.**
  Simple **epistemic morphisms** (described-entity mapping, grounding, encoding, evaluation) are expressed as ordinary relations/functions between these positions. A.6.2–A.6.4 then specify general laws for effect-free morphisms over `U.Episteme`.

* **Legacy triangle as didactic projection.**
  The classic Symbol–Concept–Object triangle becomes a **didactic view** of this graph, not the normative ontology; it is simply the projection to:

  * `Symbol` ≈ a subset of `U.RepresentationScheme`/`U.RepresentationToken`,
  * `Concept` ≈ `U.ClaimGraph`,
  * `Object` ≈ `{DescribedEntity, ReferenceScheme}`.

The rest of this pattern fixes the **minimal core** needed by KD‑CAL, A.6.2–A.6.4 and E.17.\*. The representational nodes (`U.RepresentationScheme`, `U.RepresentationToken`, `U.PresentationCarrier`, `U.RepresentationOperation`) are introduced as an **extension C.2.1+**, preserving the interface defined here.
### Minimal epistemic positions (nodes & slots)

This section defines the **minimal node set** for `U.EpistemeSlotGraph` and the associated **SlotKinds**. These are the positions that A.6.2–A.6.4 and E.17.* can rely on.

#### DescribedEntitySlot — “what this episteme is about”

**Tech:** `DescribedEntitySlot` (SlotKind), `describedEntityRef : U.EntityRef` (Ref slot in tuples/cards).
**Plain:** *described entity*, *entity‑of‑interest*, *object‑of‑talk*.

**Intent.** Provide a **single, explicit slot** for the entity (or entities) that an episteme is about, avoiding the former conflation of Object/Reference/Context.

**Normative definition.**

1. `DescribedEntitySlot` is a **SlotKind** in the sense of A.6.5 `U.RelationSlotDiscipline`.

   * Its **ValueKind** is `U.Entity`.
   * Its **RefKind** is `U.EntityRef` (or a species thereof) and **MUST** be realised in data as a field named `describedEntityRef : U.EntityRef` (E.10 discipline).
1. Species of `U.EpistemeKind` **MAY** constrain the ValueKind to a subtype `EoIClass ⊑ U.Entity` (for example, “EoI is always a `U.Holon` and, more specifically, a `U.System` or `U.Episteme`”). The subtype **MUST NOT** be named `U.DescribedEntity`; “described entity” remains a **role name**, not a kernel type.
2. Wherever episteme previously used `U.EpistemicObject` as a separate type, it is re‑interpreted as **“`U.Entity` in the role of filling `DescribedEntitySlot`”** and is marked as **legacy alias** in LEX‑BUNDLE.

**Didactic cue.**
“Ask: *What, exactly, is this description about?* That is the DescribedEntity.”
#### GroundingHolonSlot — “where / in what holon this is grounded”

**Tech:** `GroundingHolonSlot` (SlotKind), `groundingHolonRef : U.HolonRef?`.
**Plain:** *grounding holon*, *holon‑of‑grounding*, *engagement context*.

**Intent.** Capture the **material–social holon** (system, lab, infrastructure, organisation, runtime environment) with respect to which an episteme’s claims are **tested, calibrated or validated**.

**Normative definition.**

1. `GroundingHolonSlot` is a **SlotKind** with:

   * **ValueKind** `U.Holon`,
   * **RefKind** `U.HolonRef` (or a species thereof),
   * and recommended field name `groundingHolonRef? : U.HolonRef` in episteme cards/views.
2. `GroundingHolonSlot` is **optional** at the minimal core: an episteme may be **un‑grounded** at M‑mode (e.g., purely mathematical), but any episteme used for **empirical evaluation or assurance** under KD‑CAL **SHALL** either:

   * populate `groundingHolonRef`, or
   * declare explicitly that no such grounding is possible (e.g., counterfactuals, abstract logics), with consequences reflected in KD‑CAL `R`.
3. The phrase *“grounding holon”* is **plain‑register**; there is no kernel type `U.GroundingHolon`. It always means “the holon currently filling `GroundingHolonSlot` for this episteme.”

**Didactic cue.**
“Ask: *In which lab/organisation/world‑slice do we test or observe this?* That is the GroundingHolon.”
#### U.ClaimGraph and ClaimGraphSlot — intensional content

**Tech:** `U.ClaimGraph` (kernel type), `ClaimGraphSlot` (SlotKind).
**Plain:** *claim graph*, *intensional content*.

**Intent.** Reuse the existing KD‑CAL notion of **ClaimGraph** as the episteme’s **intensional body**, but make its role as a **slot value** explicit.

**Normative definition.**

1. `U.ClaimGraph` is the **ValueKind** for `ClaimGraphSlot`:

   * nodes: typed claims (definitions, axioms, theorems, requirements, properties, assumptions);
   * edges: logical/derivational/refinement relations, as already defined in C.2.
2. `ClaimGraphSlot` is a **SlotKind** whose instances are always **stored by value** in core patterns:

   * `content : U.ClaimGraph` is the normative field in `U.EpistemeCard` / `U.EpistemeView`;
   * C.2.1 **MUST NOT** introduce `U.ClaimGraphRef` as a ValueKind. Any reference type for ClaimGraphs, if needed, is a **RefKind** defined by discipline packs on top of `U.ClaimGraph`.
3. `ClaimGraphSlot` is **mandatory**: every `U.EpistemeKind` that uses C.2.1 **SHALL** have exactly one `ClaimGraphSlot`.

**Didactic cue.**
“Ask: *What is actually being claimed, defined, required, proved?* That is the ClaimGraph.”
#### U.Viewpoint and ViewpointSlot — perspective of concerns and validators

**Tech:** `U.Viewpoint` (kernel type), `ViewpointSlot` (SlotKind), `viewpointRef : U.ViewpointRef?`.
**Plain:** *viewpoint*, *perspective*, *stakeholder perspective*.

**Intent.** Provide a **first‑class home** for ISO‑style viewpoints and their generalisations, as used by E.17.0 `U.MultiViewDescribing`, MVPK, and TEVB.

**Normative definition.**

1. `U.Viewpoint` is the type of **intensional viewpoint specifications**:

   * families of **RoleEnactors/stakeholder groups** the viewpoint speaks for,
   * their **concerns**,
   * allowed **kinds of descriptions/specifications**,
   * and **conformance rules** for views under this viewpoint.
     (The internal structure of `U.Viewpoint` is fixed in E.17.0, not here.)
2. `ViewpointSlot` is a **SlotKind** with:

   * **ValueKind** `U.Viewpoint`,
   * **RefKind** `U.ViewpointRef`,
   * normative field name `viewpointRef? : U.ViewpointRef` on episteme cards/views.
3. For **I/D/S descriptions/specs** (E.10.D2), `viewpointRef` is a **mandatory part of `DescriptionContext`**; C.2.1 treats that as a **species‑level constraint**, not as a universal requirement for all epistemes.
4. `ViewpointSlot` may be unset in purely internal, pre‑viewpoint epistemes (e.g., raw formal developments), but any episteme that participates in **MultiViewDescribing** (E.17.0) **MUST** set it or be deterministically associated to it via a `ViewpointBundle`.

**Didactic cue.**
“Ask: *Who is this for, and what do they need to see to accept it?* That is the Viewpoint.”
#### U.EpistemeView / U.View and ViewSlot — episteme‑level views

**Tech:** `U.EpistemeView` (kernel species of `U.Episteme`), alias `U.View`; `ViewSlot` (SlotKind); `viewRef : U.ViewRef`.
**Plain:** *view*, *epistemic view*.

**Intent.** Distinguish **view‑epistemes** (views **of** descriptions/specifications) from both:

* the underlying descriptions/specifications themselves, and
* the **PublicationSurface** carriers on which they are rendered (E.17, L‑SURF).

**Normative definition.**

1. `U.EpistemeView` is a **species of `U.Episteme`** whose episteme kind includes, at minimum:

   * one `ClaimGraphSlot` (typically a **sliced or projected ClaimGraph**),
   * one `DescribedEntitySlot`,
   * one `ViewpointSlot`,
   * and appropriate `ReferenceSchemeSlot`.
2. `U.View` is an **alias** for `U.EpistemeView` in E‑cluster patterns (especially E.17.\*), used where the word “view” is conventional.
3. `ViewSlot` is a **SlotKind** whose:

   * **ValueKind** is `U.View`,
   * **RefKind** is `U.ViewRef` (or `U.EpistemeViewRef` species),
   * intended usage is **in meta‑structures** such as `U.MultiViewDescribing` families and MVPK.
4. `ViewSlot` **MUST NOT** be confused with carrier slots: Surfaces and faces are **not** values of `ViewSlot`; they are `U.Surface` artefacts in L‑SURF, related to views by MVPK.

**Didactic cue.**
“Ask: *Which particular slice of the description under this viewpoint are we talking about?* That is the View.”
#### U.ReferenceScheme and ReferenceSchemeSlot — reading ClaimGraph as claims about entities

**Tech:** `U.ReferenceScheme` (kernel type), `ReferenceSchemeSlot` (SlotKind); `referenceScheme? : U.ReferenceScheme`.
**Plain:** *reference scheme*, *interpretation scheme*, *description scheme*.

**Intent.** Separate **what is being said** (ClaimGraph) from **how claims are read as statements about entities and contexts** (designation, measurement, evaluation envelopes), without reifying the referents themselves as a vertex.

**Normative definition.**

1. `U.ReferenceScheme` is a **component type of epistemes**, not an external object:

   * it determines how nodes of `U.ClaimGraph` are mapped to **properties/relations** over values of `DescribedEntitySlot`,
   * it specifies **measurement/evaluation templates** (how to test claims on `GroundingHolon`),
   * it fixes **claim-scope predicates / admissible regions** over declared `U.ContextSlice` selectors (and, where needed, references to domain spaces used inside those selectors).
2. `ReferenceSchemeSlot` is a **SlotKind** with:

   * **ValueKind** `U.ReferenceScheme`,
   * **no RefKind in the minimal core** (ReferenceSchemes are stored by value as `referenceScheme? : U.ReferenceScheme` fields on episteme cards/views).
     Discipline packs **may** introduce `U.ReferenceSchemeRef` as a **RefKind**, but **must not** repurpose it as a new ValueKind.
3. `ReferenceScheme` is the place where the legacy “Object‑vertex” semantics now live:

   * it does **not** “contain” the real‑world object,
   * it hosts the **rules** that tie claims to entities and groundings.

**Didactic cue.**
“Ask: *Given this ClaimGraph, how exactly do we treat it as talking about these entities in these contexts, and how do we test it?* That is the ReferenceScheme.”
#### Minimal node set and extension C.2.1+

The **minimal `U.EpistemeSlotGraph` core** for C.2.1 consists of positions (the episteme core SlotKinds of A.6.5 CC‑A.6.5‑5):
* `DescribedEntitySlot` (ValueKind `U.Entity`),
* `GroundingHolonSlot` (ValueKind `U.Holon`),
* `ClaimGraphSlot` (ValueKind `U.ClaimGraph`),
* `ViewpointSlot` (ValueKind `U.Viewpoint`),
* `ViewSlot` (ValueKind `U.View`),
* `ReferenceSchemeSlot` (ValueKind `U.ReferenceScheme`).

This pattern **only fixes these positions**.
The **extension C.2.1+** (second step of the refactor) adds:
* `U.RepresentationScheme` and `RepresentationSchemeSlot`,
* `U.RepresentationToken` and `RepresentationTokenSlot`,
* `U.PresentationCarrier` and `PresentationCarrierSlot`,
* `U.RepresentationOperation` and `RepresentationOperationSlot` (with inference regime annotations),

without changing:
* the definition of `U.EpistemeKind`,
* the minimal `U.EpistemeCard` interface,
* or the assumptions A.6.2–A.6.4 / E.17.* make about episteme components.

In C.2.1+ carriers remain **structural publication artefacts**, not semantic parts of the episteme:
`U.PresentationCarrier` values are linked to `U.Episteme` / `U.View` via MVPK / L‑SURF relations (e.g. `isCarriedBy` / faces) and **MUST NOT** be counted as components when reasoning about episteme identity, DescribedEntity/grounding, or KD‑CAL morphisms. Changing carriers or surfaces alone **never** changes the `U.Episteme` instance determined by C.2.1; it only produces new `U.Work` / publication events.
#### Attached epistemic structures (non-slot components)

`U.EpistemeSlotGraph` deliberately does **not** reify every epistemic artefact as a node. Several key structures remain **attached, non-slot components** of `U.Episteme`:
* **`JustificationGraph`** — the argument/evidence graph for nodes of `U.ClaimGraph` (A.10/B.3).
* **`EvidenceBindings`** — per-claim `U.EvidenceRole` assignments that connect claims to external `U.Work` and carriers.
* **`EditionSeries`** — the `PhaseOf` chain of episteme editions (A.14) with change-class annotations (symbol-only vs ClaimGraph vs ReferenceScheme changes).
* **`ScopeCard` / `U.ClaimScope`** — USM scope objects (A.2.6) describing where the episteme’s claims hold.

These attached structures are **not extra positions** of `U.EpistemeSlotGraph`; they hang off the `U.ClaimGraph`/`U.ReferenceScheme` pair and are governed by KD-CAL (C.2), A.10 and B.3. C.2.1 only requires that an episteme which participates in KD-CAL exposes them in a way that keeps **ClaimGraph / ReferenceScheme / Evidence / EditionSeries / `ClaimScope`** clearly distinguishable.
### Episteme as n‑ary relation and as holon

To prevent confusion between **objects‑of‑talk**, their **descriptions**, and the **places they occupy in an episteme**, C.2.1 explicitly treats epistemes both as:

1. **n‑ary relations with a signature** (slots & values), and
2. **holons with components** (fields & parts).

#### U.EpistemeKind — episteme as a typed n‑ary relation

**Tech:** `U.EpistemeKind` (kernel type).

**Intent.** Provide a **signature‑level** description of an episteme as an n‑ary relation whose arguments are governed by `SlotKind`/`ValueKind`/`RefKind` triples per A.6.5.

**Normative definition.**

1. Every episteme that participates in KD‑CAL **belongs to some `U.EpistemeKind`**.
   The kind determines:

   * which **SlotKinds** appear (`DescribedEntitySlot`, `GroundingHolonSlot`, `ClaimGraphSlot`, `ViewpointSlot`, `ViewSlot`, `ReferenceSchemeSlot`, …),
   * the **ValueKind** for each slot (always a subtype of `U.Type`),
   * the **RefKind** used to store it in episteme (when applicable).
1. `U.EpistemeKind` is a **special case** of `U.Signature` (A.6.0), with its slots governed by `U.RelationSlotDiscipline` (A.6.5). C.2.1 **MUST NOT** define an alternative slot discipline.
2. For the minimal core, every `U.EpistemeKind` **MUST** include:
   * exactly one `ClaimGraphSlot`,
   * at least one `DescribedEntitySlot`,
   * and at least one `ReferenceSchemeSlot`.
     Inclusion of `GroundingHolonSlot`, `ViewpointSlot`, `ViewSlot` **MAY** be species‑level constraints (mandatory for D/S‑epistemes, optional for others).

**Didactic cue.**
“An `EpistemeKind` is the *type* of episteme: which positions it has and what can go into them.”
#### U.EpistemeTuple — episteme as filled n‑ary relation

**Tech:** `U.EpistemeTuple` (kernel species).

**Intent.** Model **filled instances** of an episteme’s signature, separating the n‑ary relation from any particular holonic packaging or publication.

**Normative definition.**

1. `U.EpistemeTuple` is a species whose instances are **pure value tuples**:
   * for each SlotKind in the associated `U.EpistemeKind`, a value of the slot’s **ValueKind** (or a reference value of **RefKind**, if the kind is configured as such).
2. `U.EpistemeTuple` is **notation‑agnostic** and **carrier‑agnostic**: it does not know about files, formats, or surfaces.
   It exists to give A.6.2–A.6.4 a minimal notion of “episteme as a point in Ep”.
3. In episteme, `U.EpistemeTuple` rarely appears directly; it is typically **induced** by `U.EpistemeCard` and `U.EpistemeView` (which add component structure and meta‑information).

**Didactic cue.**
“An `EpistemeTuple` is the abstract record of *what fills which slots* — nothing more.”
#### U.EpistemeCard, U.EpistemePublication, U.EpistemeView — holonic realisations

**Tech:** `U.EpistemeCard`, `U.EpistemePublication`, `U.EpistemeView` (species of `U.Episteme`).

**Intent.** Provide **holon‑level structures** that engineers can work with (components, mereology, provenance), while keeping them aligned with `U.EpistemeKind` and `U.EpistemeTuple`.

**Normative definition.**

1. **`U.EpistemeCard`.**
   A species of `U.Episteme` whose components correspond one‑to‑one to slots of some `U.EpistemeKind`:
   * `content : U.ClaimGraph` (for `ClaimGraphSlot`),
   * `describedEntityRef : U.EntityRef` (for `DescribedEntitySlot`),
   * `groundingHolonRef? : U.HolonRef` (for `GroundingHolonSlot`),
   * `viewpointRef? : U.ViewpointRef` (for `ViewpointSlot`),
   * `referenceScheme? : U.ReferenceScheme` (for `ReferenceSchemeSlot`),
   * optionally `representationSchemeRef? : U.RepresentationSchemeRef` (C.2.1+),
   * `meta : Edition/Provenance/Status…`.
     Minimal episteme identity is the pair `⟨content, describedEntityRef⟩` within a `U.BoundedContext`; all other fields are optional at the genus level but may be mandatory in species. Changes that alter `content` or the effective `referenceScheme` (or that intentionally re‑identify `describedEntityRef`) **SHALL** be realised as new phases in an `U.EditionSeries` (PhaseOf chain) under A.14/A.7. Changes confined to `U.PresentationCarrier` / surfaces or other publication artefacts **do not** create a new episteme; they are captured as `U.Work` / publication events over the same `U.Episteme`.
2. **`U.EpistemePublication`.**
   A species representing **epistemes that have been published** onto surfaces (MVPK). It:
   * has at least the components of `U.EpistemeCard`,
   * plus references to `U.Surface` / `U.Face` artefacts (E.17, L‑SURF),
   * but **does not** re‑interpret these surfaces as parts of the episteme; carriers remain external.
3. **`U.EpistemeView`.**
   As defined in §4.1.5, a species of `U.Episteme` representing a **view** under a specific `U.Viewpoint`.
   Its components are a specialisation of `U.EpistemeCard`:
   * ClaimGraph often restricted/projection of a base description/specification,
   * Viewpoint fixed,
   * ReferenceScheme tailored to that viewpoint.

**Alignment requirement.**
For any of these species, the pattern **MUST** state explicitly:
* which `U.EpistemeKind` it realises, and
* how each component maps to a SlotKind/RefKind under `U.RelationSlotDiscipline`.

This ensures that A.6.2–A.6.4 can treat any `U.Episteme*` uniformly as both:
* an object in the category **Ep**, and
* a structured holon with components.
#### SlotKind / ValueKind / RefKind discipline for DescribedEntity & GroundingHolon

C.2.1 adopts **A.6.5 `U.RelationSlotDiscipline`** wholesale. For the two key positions:
1. **DescribedEntitySlot.**
   * `SlotKind = DescribedEntitySlot`;
   * `ValueKind = U.Entity` (species may constrain to `EoIClass ⊑ U.Entity`);
   * `RefKind = U.EntityRef` (or a species thereof);
   * normative field name in episteme cards: `describedEntityRef : U.EntityRef`.
     No kernel type named `U.DescribedEntity` is introduced; the phrase “described entity” always means “an instance of `U.Entity` in the role filling `DescribedEntitySlot`”.
1. **GroundingHolonSlot.**
   * `SlotKind = GroundingHolonSlot`;
   * `ValueKind = U.Holon`;
   * `RefKind = U.HolonRef`;
   * normative field name: `groundingHolonRef? : U.HolonRef`.
     There is no kernel type `U.GroundingHolon`; “grounding holon” is a **slot occupant name**.
Any episteme that previously mixed slot/value/ref concepts (e.g., using `DescribedEntityRef` as if it were a type) **MUST** be migrated to this discipline over time; C.2.1 provides the normative anchor, and F.18 / discipline packs provide the migration guide.
### Minimal epistemic morphisms (informal schema)

> **Note.** The full mathematical treatment (categories Ep and Ref, describedEntity functor `α : Ep → Ref`, and effect‑free morphisms) lives in A.6.2–A.6.4. Here we fix only the **object‑level relations** that C.2.1 expects to exist between its positions.

At the level of `U.EpistemeCard` components and SlotKinds, we assume the following **primitive relations** (not all are functions):

1. **`describedEntitySet : U.Episteme → P(U.Entity)`**
   *derivable from `DescribedEntitySlot` and `ReferenceScheme`*
   * For an episteme `E`, `describedEntitySet(E)` is (at least) the singleton containing the entity referenced by `describedEntityRef(E)`; in more complex cases, it may be a finite set or bundle of entities, determined by `ReferenceScheme`.
   * The **functorial DescribedEntity mapping** `δ_E : Ep → Ref` used in A.6.2–A.6.4 is the categorical lift of this relation: it forgets episteme internals and keeps only the object in the ReferencePlane determined by the pair `<DescribedEntitySlot, GroundingHolonSlot>`.

2. **`grounds : (U.Entity, U.Holon) ⇝ GroundingRelation`**
   *relates described entities to grounding holons*
   * Captures how values of `DescribedEntitySlot` are **situated** in holons that make evaluation possible (labs, infrastructures, organisations).
   * Need not be total or functional; an entity may admit multiple grounding holons, or none.

3. **`designates : (U.ReferenceScheme, U.ClaimGraph, U.Entity, U.Holon) ⇝ DesignationProfile`**
   *how claims are read as statements about entities in contexts*
   * Specifies, for each claim in `content` and each `<describedEntityRef, groundingHolonRef>`, what property/relation it purports to state, and under what conditions.

4. **`satisfies / evaluatesTo : (U.ClaimGraph, U.ReferenceScheme, U.Holon) → TruthProfile/SuccessProfile`**
   *evaluation of claims under a reference scheme and grounding*
   * Forms the bridge to KD‑CAL’s `F, G, R` evaluation; details are given in C.2 and B.3.

5. **View-related morphisms** (to be connected with A.6.3):
   * `viewProject : (U.Episteme, U.Viewpoint) → U.View`
     — effect-free, **DescribedEntity-preserving** projection that slices `ClaimGraph` and specialises `ReferenceScheme` under a given viewpoint.
   * `viewEmbed : U.View → U.Episteme`
     — embedding of a view back into the wider episteme, typically as a reference with correspondence proofs.

5. **Reflexive describedEntity guard.**
   When `DescribedEntitySlot` or `ReferenceScheme` picks out an episteme or claim that includes the referring claim itself (**ReferencePlane = episteme**), publishers **SHALL** ensure that the induced justification/evaluation structure is **acyclic per evaluation chain**: reflexive describedEntities may exist as literature handles, but they MUST NOT form a minimal support cycle for acceptance or KD‑CAL assurance. Self‑reference is allowed as a citation pattern, not as a way to close justification loops.

These are **not yet laws**; they are the **hooks** that A.6.2–A.6.4 will formalise into:
* `U.EffectFreeEpistemicMorphing` (Ep→Ep morphisms over this structure),
* `U.EpistemicViewing` (describedEntity‑preserving Ep→Ep),
* `U.EpistemicRetargeting` (describedEntity‑retargeting Ep→Ep).
## Legacy semantic triangle as didactic view (informative)

**Position.** The classical semiotic or semantic triangle (“Symbol–Concept–Object”, Ogden–Richards/Frege–Carnap style) is **not** the normative ontology for epistemes in FPF. For `U.Episteme`, it is treated as a **didactic projection** of the richer hypergraph `U.EpistemeSlotGraph`:
* **“Symbol” corner** ≈ {`U.RepresentationToken`, `U.RepresentationScheme`, `U.PresentationCarrier`} when C.2.1+ is in use; in the minimal core this is collapsed into whichever external artefact happens to carry `U.ClaimGraph`.
* **“Concept” corner** ≈ `U.ClaimGraph` + `U.ReferenceScheme` under a chosen `U.Viewpoint`. This is the intensional content plus its interpretation recipe.
* **“Object” corner** ≈ the occupant of `DescribedEntitySlot` (ValueKind `U.Entity`) plus the occupant of `GroundingHolonSlot` (ValueKind `U.Holon`) and the grounding relation between them.

Under this reading the triangle is a **three‑node quotient** of the `U.EpistemeSlotGraph`:
```
(Symbol)      = RepresentationToken + Scheme + Carrier
(Concept)     = ClaimGraph + ReferenceScheme (+ Viewpoint)
(Object)      = DescribedEntity + GroundingHolon
```

All **viewpoints, operations, carriers and reference planes** are suppressed in the classical diagram. The cost of this suppression is precisely the confusion that motivates C.2.1:
* describing becomes an single unlabeled arrow,
* inference regimes disappear,
* measurement and grounding are invisible.

**Didactic use.** C.2.1 allows the triangle **only** in the following cases:
1. As an **introductory picture** in guidance material (“this is the coarse triangle; the actual pattern is the episteme slot graph”).
2. As a **quotient diagram**: an explicit note that “this figure ignores viewpoint, grounding, carrier, and operationality; see C.2.1 for the full structure”.
3. As a **legacy alignment aid** when mapping to standards or literature that speak only in triangle terms.

**Guard.** Any pattern or documentation page that uses a “semantic triangle” diagram **MUST** either:
* explicitly state “this is a didactic projection of C.2.1 `U.EpistemeSlotGraph`”, or
* treat it as a legacy reference when aligning with external standards.

The triangle **MUST NOT** be used as a kernel‑level ontology or as a basis for morphism laws. All normative reasoning about epistemes proceeds via the slots and components of `U.EpistemeSlotGraph`.
## Interaction with I/D/S and DescriptionContext (normative)

C.2.1 is the **episteme‑layer carrier** that I/D/S discipline (A.7, E.10.D2) relies on. The link is made via `DescriptionContext`.

### DescriptionContext over C.2.1 components

For any episteme that is a **Description** or a **Specification** in the sense of E.10.D2, the field `subjectRef : U.SubjectRef` is interpreted as a **DescriptionContext triple**:
```
DescriptionContext = ⟨DescribedEntityRef, BoundedContextRef, ViewpointRef⟩
```

where:
* `DescribedEntityRef : U.EntityRef` — occupies `DescribedEntitySlot` (ValueKind `U.Entity`, species often constrained via EoIClass ⊑ `U.Entity`).
* `BoundedContextRef : U.BoundedContextRef` — points to the context that fixes vocabulary, units, and legal inferences for this description (E.10.D1).
* `ViewpointRef : U.ViewpointRef` — occupies `ViewpointSlot` (ValueKind `U.Viewpoint`) and determines which concerns, role‑enactor families, and conformance rules apply.

**Normative requirement (IDS‑13).**
For every `…Description` / `…Spec` episteme:
1. `subjectRef` **SHALL** be decodable to a well‑formed DescriptionContext triple.
2. `DescribedEntityRef` from that triple **SHALL** be identical to the field `describedEntityRef` that fills `DescribedEntitySlot` in the corresponding `U.EpistemeCard`/`U.EpistemeView`.
3. `ViewpointRef` in DescriptionContext **SHALL** agree with `viewpointRef` in the episteme card or be uniquely derivable from a `U.ViewpointBundle` in E.17.1 (with the derivation rule documented).

Intensions (I‑layer) such as `U.System`, `U.Method`, `U.Role` **do not** inhabit C.2.1 directly; they are the *targets* of I→D operations (`Describe_ID`) and appear as values of `DescribedEntitySlot` in resulting descriptions/specs.
### I→D and D→S morphisms over C.2.1

* **Describing (`Describe_ID : I → D`).**
  Produces an episteme whose:
  * `content : U.ClaimGraph` encodes the descriptive claims about the intension,
  * `describedEntityRef` points to the intension’s entity,
  * `groundingHolonRef` (if present) fixes where the description is evaluated or tested,
  * `viewpointRef` selects the describing viewpoint.

  `Describe_ID` is **conformant** to A.6.2 but not an Ep→Ep morphism (domain is Intension, codomain is Episteme). C.2.1 provides the **codomain schema** and ensures that the resulting Description has a valid DescriptionContext.

* **Specifying/Formalising (`Specify_DS/Formalize_DS : D → S`).**
  Takes a Description episteme and returns a Specification episteme with:
  * the same `describedEntityRef`,
  * the same `BoundedContextRef` and `ViewpointRef` (hence same DescriptionContext),
  * a `content : U.ClaimGraph` that raises formality F (F≥4) and adds test harness hooks, but is conservative with respect to the underlying intension.

  As an Ep→Ep morphism, `Specify_DS` is a **species of A.6.2** and must obey the invariants over the C.2.1 slots (DescribedEntityChangeMode = preserve; no change to DescribedEntity; ClaimGraph refinement only).

C.2.1 does **not** define I/D/S; it only insists that any `…Description`/`…Spec` species that claims to respect I/D/S discipline must:
* implement `U.EpistemeCard` or `U.EpistemeView` **with** `content`, `describedEntityRef`, `groundingHolonRef?`, `viewpointRef?`, and `referenceScheme?` fields, and
* wire these fields into `subjectRef` as DescriptionContext.
## Alignment with A.6.2–A.6.4 (episteme morphisms) (normative)

`U.EpistemeSlotGraph` is the **object‑level substrate** for the episteme morphism patterns:
* A.6.2 `U.EffectFreeEpistemicMorphing`
* A.6.3 `U.EpistemicViewing`
* A.6.4 `U.EpistemicRetargeting`

### Effect‑free episteme morphisms (A.6.2) over C.2.1

For any `f : X → Y` that is an instance of `U.EffectFreeEpistemicMorphing`:
* **Typed objects.**
  X and Y are `U.Episteme` instances realised as `U.EpistemeCard` / `U.EpistemeView` with at least the minimal core components:

  ```
  content            : U.ClaimGraph
  describedEntityRef : U.EntityRef      // DescribedEntitySlot
  groundingHolonRef? : U.HolonRef       // GroundingHolonSlot
  viewpointRef?      : U.ViewpointRef   // ViewpointSlot
  referenceScheme?   : U.ReferenceScheme// ReferenceSchemeSlot (ByValue)
  ```

  Any additional C.2.1+ components (RepresentationScheme, Tokens, Carriers, Operations) are visible to A.6.2 only through their declared SlotKinds (A.6.5).
* **DescribedEntityChangeMode characteristic.**
  `f` **MUST** declare a **`describedEntityChangeMode ∈ {preserve, retarget}`**:
  * `preserve` — `describedEntityRef(Y) = describedEntityRef(X)` and any change to `groundingHolonRef`/`viewpointRef` must be justified by Bridges/CorrespondenceModel, without changing the DescribedEntitySlot value;
  * `retarget` — permitted only for A.6.4 species; see below; in this case the characteristic records an intentional change in the pair `<describedEntityRef, groundingHolonRef>` under a declared `KindBridge` in the appropriate ReferencePlane.

  This **DescribedEntityChangeMode** is a CHR-style *characteristic* (A.17) on episteme morphisms, which points directly to `DescribedEntitySlot`. Avoid introducing a separate “describedEntity” term alongside `DescribedEntity`. 
  
* **Component discipline.**
  P0–P5 from A.6.2 are read **directly** in terms of C.2.1 components:
  * purity ⇒ only C.2.1 components of Y may change; no Work/Mechanism side‑effects;
  * conservativity ⇒ claims in `content_Y` read via `referenceScheme_Y` about the new `<DescribedEntity, GroundingHolon>` do not go beyond what already follows from `content_X` via `referenceScheme_X` under the declared DescribedEntityChangeMode and Bridges;
  * functoriality ⇒ composition of such transformations respects the slot structure and ReferenceSchemes.

Any Ep→Ep pattern that operates on `U.Episteme` **MUST** state which C.2.1 slots it reads and which it may write, in terms of SlotKinds/ValueKinds/RefKinds (A.6.5), and then declare itself a species of A.6.2/3/4 as appropriate.
### EpistemicViewing (A.6.3) as describedEntity‑preserving projections

`U.EpistemicViewing` is the **DescribedEntity-preserving** species of A.6.2. Over C.2.1 this means:
* `describedEntityRef(Y) = describedEntityRef(X)` — the same value in `DescribedEntitySlot`.
* `groundingHolonRef` is preserved, or changed only within a fixed grounding context (e.g. normalising identifiers for the same lab or runtime).
* `viewpointRef` is either:
  * preserved (internal normalisation under the same viewpoint), or
  * replaced by another `U.ViewpointRef` *within* a `U.MultiViewDescribing` family (E.17.0), with invariants enforced by a CorrespondenceModel.
* `content` and `referenceScheme` are transformed **conservatively**: no new intensional claims about the same DescribedEntity are introduced.

Typical examples:
* filtering or aggregating `U.ClaimGraph` to a view relevant for a stakeholder group;
* rendering a behavioural specification into a tabular or diagrammatic episteme under a publication viewpoint;
* normalising a logic‑heavy episteme into a more operational one, while keeping the same described system and context.

In terms of SoTA, EpistemicViewing behaves like a **lens** or **optic** over C.2.1: a focus (SlotKinds for content/representation) is manipulated while the DescribedEntity is fixed.
### EpistemicRetargeting (A.6.4) as DescribedEntity-bundle retargeting on episteme morphisms

`U.EpistemicRetargeting` is the species of A.6.2 where **`describedEntityChangeMode = retarget`**.
It is always a **morphism between epistemes** (`f : X → Y` in `U.Episteme`), but the adjective “retargeting” refers **not** to the fact that an episteme is mapped to another episteme (this is true for all A.6.2 species), and **not** to a separate describedEntity, but specifically to the **change in the DescribedEntity-bundle** selected by C.2.1:
* `describedEntityRef(Y) ≠ describedEntityRef(X)` — the value stored for `DescribedEntitySlot` changes;
* a `KindBridge` must relate `Kind(describedEntityRef(X))` and `Kind(describedEntityRef(Y))`;
* `groundingHolonRef` may remain the same (e.g. same plant, different subsystem) or be transformed along a Bridge in the same ReferencePlane.

In practice, many retargetings operate on the **target bundle** `<DescribedEntitySlot, GroundingHolonSlot>` (for example, when an episteme about a physical module is re-interpreted as an episteme about a function-holon realised in a different environment). The characteristic `describedEntityChangeMode` still classifies such morphisms by whether this bundle is preserved or intentionally re-identified under a `KindBridge` and reference-plane policy; the episteme on the codomain side is just the usual A.6.2 target object.


Over C.2.1 this is used for:
* **functional vs structural reinterpretation** (e.g. an episteme about a physical module retargeted to an episteme about the function it realises; StructuralReinterpretation in E.TGA becomes a species of A.6.4);
* **signal vs spectrum** transitions (Fourier‑style moves where the object‑of‑talk changes from time‑domain signal to frequency‑domain representation but an invariant, such as energy, is preserved);
* **data vs model** transitions (e.g. retargeting an episteme about raw observations to an episteme about a learnt model, with an invariant such as likelihood or sufficient statistics).

C.2.1 ensures that these retargetings have a **clear source and target** at the DescribedEntitySlot and that any such move is expressed as a morphism over well‑typed slots, not as an unstructured rewrite of “subject” or “object” labels.
## Alignment with E.17. (Multi‑View Describing & Publication) (normative)*

`U.EpistemeSlotGraph` underpins the E.17 cluster:
* E.17.0 `U.MultiViewDescribing`
* E.17.1 `U.ViewpointBundleLibrary`
* E.17.2 `TEVB — Typical Engineering Viewpoints Bundle`
* E.17 `MVPK — Multi‑View Publication Kit`

### Multi‑View Describing (E.17.0)

`U.MultiViewDescribing` organises **families of descriptions/specifications** over a shared entity‑of‑interest:
* The **EoIClass** parameter of E.17.0 is a species constraint on the ValueKind of `DescribedEntitySlot` (`EoIClass ⊑ U.Entity`).
* Each member of a multi‑view family is a `…Description`/`…Spec` episteme with:
  * `describedEntityRef` into that EoIClass,
  * `viewpointRef` drawn from a `U.ViewpointBundle`,
  * `subjectRef` decoding to DescriptionContext.

Within this pattern:
* `U.Viewpoint` is **exactly** the ValueKind of `ViewpointSlot` in C.2.1.
* `U.View` is `U.EpistemeView`, a species of `U.Episteme` whose `content` is already restricted to a particular `U.Viewpoint` and often also to a particular `U.RepresentationScheme`.

C.2.1 thus supplies the **per‑episteme** structure that E.17.0 rearranges into multi‑view families.
### Viewpoint bundles (E.17.1/E.17.2)

`U.ViewpointBundleLibrary` and TEVB specialise the `U.Viewpoint` node:
* A ViewpointBundle is a **set of `U.Viewpoint` instances** tailored to a class of DescribedEntities (e.g., holons in engineering contexts).
* TEVB fixes `EoIClass = U.Holon` (typically `U.System` or `U.Episteme`) and provides canonical engineering viewpoints: functional, structural, role‑enactor, interface‑oriented, etc.

From the C.2.1 perspective:

* these bundles populate the ValueKind of `ViewpointSlot`;
* engineering episteme species that want to be “TEVB‑aligned” must restrict `viewpointRef` to TEVB’s `EngineeringVPId` set, while keeping the same DescribedEntitySlot discipline.
### MVPK (E.17) as publication over C.2.1 views

MVPK treats `U.View` (i.e. `U.EpistemeView`) as its primary input:
* it uses `U.EpistemicViewing` species (A.6.3) to generate publication‑oriented views from engineering or logical views;
* it then packages these `U.View` epistemes into `U.Surface` artefacts via publication viewpoints and faces.

C.2.1’s distinction between:

* `U.Viewpoint` (intensional, epistemic perspective) and
* `U.PresentationCarrier` (surface in C.2.1+ and L‑SURF)

keeps **epistemic perspective and physical medium separate**:
* MVPK operates only on epistemes (Views) and then on carriers;
* the same View can be realised on multiple carriers without changing its describedEntity or ClaimGraph.

Any MVPK species that claims to be C.2.1‑conformant **MUST**:
* treat `U.View` as a `U.EpistemeView` with a valid C.2.1 core,
* document which C.2.1 slots it reads/writes (typically only representation/carrier‑related ones, leaving `DescribedEntitySlot` and `GroundingHolonSlot` untouched),
* refrain from introducing new claims about the described entity beyond what is in the source `U.View`’s ClaimGraph.
## Bias‑annotation (informative)

**Episteme‑first and pragmatics‑first.**
The pattern assumes that *nothing is a meaningful episteme* unless it is **about something for someone under some perspective**. This follows the pragmatic turn in semantics: describedEntity and concerns are not afterthoughts but part of the core structure. The graph is therefore built around slots for DescribedEntity, GroundingHolon, Viewpoint and ClaimGraph, not around abstract “propositions in the void”.

**Operational/representational bias.**
C.2.1+ anticipates that certain RepresentationSchemes are **operational** in Novaes’ sense (supporting direct syntactic inference, like pen‑and‑paper arithmetic or proof states) while others are **purely notational**. The pattern remains neutral on which schemes are used but bakes in a place for operations and carriers so that:

* symbol‑manipulating tools (SAT/SMT, proof assistants, classical programming languages),
* distributed/latent representations (LLM embeddings, latent protocols like “DroidSpeak”, “Coconut”‑style communication),
* hybrid ReAct‑style agent loops

can all be treated as different species operating over the same `U.EpistemeSlotGraph`. There is a bias towards making these operational differences **explicit** instead of hiding them behind “the model”.

**Viewpoint and stakeholder bias.**
The pattern leans on the ISO‑style idea that viewpoints encode **stakeholder concerns and role‑families**, but it generalises this beyond architecture. `U.Viewpoint` is intentionally intensional and not bound to any single discipline; still, the examples are skewed toward engineering and epistemic use‑cases.

**Didactic bias.**
The pattern is written to be teachable: semantic triangles are kept as didactic projections; examples like stools on lab rigs, services and SLAs, and model‑evaluation epistemes are deliberately simple. This may under‑represent more exotic epistemes (e.g. artistic, legal, or socio‑technical ones), but the intention is that these use the same slots with different species‑level constraints.
## Conformance checklist (normative)

**CC‑C.2.1‑1 - Minimal core components for episteme species.**
Any species of `U.Episteme` that participates in I/D/S discipline or in E.17 multi‑view/publishing **MUST** be representable as `U.EpistemeCard`/`U.EpistemeView` with at least:

```
content            : U.ClaimGraph
describedEntityRef : U.EntityRef
groundingHolonRef? : U.HolonRef
viewpointRef?      : U.ViewpointRef
referenceScheme?   : U.ReferenceScheme      // ByValue
meta               : …                      // edition, provenance, status (A.7/F.15)
```

and corresponding SlotSpecs consistent with A.6.5 (`DescribedEntitySlot`, `GroundingHolonSlot`, `ClaimGraphSlot`, `ViewpointSlot`, `ReferenceSchemeSlot`).

**CC‑C.2.1‑2 - No kernel type for “DescribedEntity” or “GroundingHolon”.**
Patterns **MUST NOT** introduce kernel types `U.DescribedEntity` or `U.GroundingHolon`:
* DescribedEntitySlot has ValueKind `U.Entity` ( species‑constrained via EoIClass if needed),
* GroundingHolonSlot has ValueKind `U.Holon`.

Plain terms “described entity” and “grounding holon” are allowed only as **role descriptions** of slot occupants.

**CC‑C.2.1‑3 - SlotKind/ValueKind/RefKind discipline.**
All episteme‑related slots, including `DescribedEntitySlot`, `GroundingHolonSlot`, `ClaimGraphSlot`, `ViewpointSlot`, `ViewSlot`, `ReferenceSchemeSlot` (and any extensions in C.2.1+), **MUST**:
* follow the naming discipline of A.6.5 (`*Slot` for SlotKinds, `*Ref` only for RefKinds/fields),
* declare a ValueKind and refMode (`ByValue` or a RefKind),
* be used consistently across patterns that refer to the same conceptual position.

**CC‑C.2.1‑4 - DescriptionContext wiring.**
Any episteme species whose name or pattern claims to be a `…Description` or `…Spec` in the sense of E.10.D2 **MUST**:
* expose `subjectRef : U.SubjectRef`,
* provide a decoding to `DescriptionContext = ⟨DescribedEntityRef, BoundedContextRef, ViewpointRef⟩`,
* ensure that `DescribedEntityRef` matches `describedEntityRef` (DescribedEntitySlot), and
* ensure that `ViewpointRef` matches `viewpointRef` or is derivable from a `U.ViewpointBundle` under documented rules.

**CC‑C.2.1‑5 - Morphism declarations over slots.**
Any pattern in A.6.2–A.6.4, E.17, E.TGA, or discipline packs that defines morphisms between epistemes **SHALL**:
* state whether it is a species of `U.EffectFreeEpistemicMorphing`, `U.EpistemicViewing`, or `U.EpistemicRetargeting`,
* declare its `describedEntityChangeMode` (preserve/retarget),
* name which SlotKinds it reads and writes,
* state its behaviour on `describedEntityRef`, `groundingHolonRef`, `viewpointRef`, and `referenceScheme`.

**CC‑C.2.1‑6 - Semantic‑triangle usage guard.**
If a semantic triangle or parallelogram diagram appears in a pattern or tutorial, there must be an explicit note that:
* it is a didactic projection of `U.EpistemeSlotGraph`, and
* normative laws are stated in terms of C.2.1 nodes and morphisms, not in terms of triangle corners.

**CC‑C.2.1‑7 - KD‑CAL / ReferencePlane alignment.**
Any pattern that evaluates or compares epistemes (KD‑CAL/LOG‑CAL, CHR, CG‑Spec, etc.) **MUST** point out:
* how `U.ClaimGraph` is interpreted in a ReferencePlane,
* how `GroundingHolonSlot` figures into measurement or validation,

**CC‑C.2.1‑8 - Context locality and Bridges.**
Any `U.Episteme` species that is consumed by KD‑CAL / LOG‑CAL / CHR‑based patterns **SHALL** declare a `U.BoundedContextRef`; all F–G–R computations and C.2.1 slot interpretations are **context‑local**.  Cross‑context use **MUST** proceed via an explicit Bridge with CL / Φ‑policy (F.9/B.3), with penalties routed to R‑lanes only; F and the slot structure from C.2.1 remain unchanged.

**CC‑C.2.1‑9 - Carriers and Work outside episteme content.**
C.2.1 **inherits** A.7/A.12’s separation obligations: `U.PresentationCarrier` / `U.Surface` artefacts and `U.Work` instances **MUST NOT** be treated as parts of `U.Episteme` or as values of any SlotKind in `U.EpistemeSlotGraph`. Episteme content stays in `U.ClaimGraph` and `U.ReferenceScheme`; evidence enters only via `U.EvidenceRole` bindings that point to external `U.Work` / carriers (A.10/B.3). Changing carriers or re‑publishing work alone does **not** change the episteme determined by ⟨content, describedEntityRef, referenceScheme⟩ in its `U.BoundedContext`.

**CC‑C.2.1‑10 - Reflexive describedEntity guard.**
When an episteme uses C.2.1 to speak **about** another episteme (ReferencePlane = episteme), or about itself (self‑describing or meta‑specification cases), patterns **SHALL** ensure that the resulting JustificationGraph / evaluation chains are **acyclic** along support paths. Reflexive `describe` / citation edges may exist as literature anchors, but they MUST NOT form minimal support cycles for acceptance or KD‑CAL assurance decisions; the trust calculus MUST always bottom out in external evidence (`U.Work` with `U.EvidenceRole`) rather than in purely self‑referential claims.
## Consequences (informative)

**Benefits**
* **Single, extensible episteme core.**
  C.2.1 gives a small, stable set of positions (DescribedEntity, GroundingHolon, ClaimGraph, Viewpoint, View, ReferenceScheme) and components (`U.EpistemeCard`, `U.EpistemeView`, `U.EpistemePublication`) on which all higher‑level patterns depend. This avoids the proliferation of “epistemic objects” and “facets” with overlapping semantics.
**Transparent DescribedEntity & grounding discipline.**
  The pair (`DescribedEntitySlot`, `GroundingHolonSlot`) is no longer hidden inside ad-hoc “SubjectRef” fields or semantic triangles: both are explicit, typed slots. This makes retargeting, viewing and correspondence laws (A.6.2–A.6.4, E.17.0) easier to state and check.
* **Better fit for contemporary representation practice.**
  By distinguishing ClaimGraph, RepresentationScheme, Tokens, Carriers and Operations (in C.2.1+), the pattern matches contemporary SoTA views of notation and formalism:
  * formal languages as cognitive artefacts and de‑semanticisation tools (Novaes),
  * operational iconicity and medium‑sensitive reasoning (Krämer, Malafouris),
  * hybrid symbolic–neural workflows (e.g. ReAct, tool‑augmented LLMs, latent protocols).
  FPF can model both symbol‑heavy and latent‑heavy workflows without privileging either.
* **Uniform substrate for multi‑view description and publication.**
  MultiViewDescribing, viewpoint bundles (TEVB), and MVPK all land on the same episteme core. This avoids the current “views vs viewpoints vs faces” confusion and leaves “architecture” as a domain‑specific specialisation rather than a competing meta‑ontology.
* **Tooling alignment.**
  Slot discipline plus explicit episteme components map cleanly to implementation types (records, row‑typed schemas, effectful handlers). Tools can generate code, schemas or telemetry from episteme species without guessing what “subject”, “context” or “object” mean.

**Trade‑offs / costs**
* **More explicit structure.**
  Authors must declare slots, ValueKinds and references explicitly, and keep DescriptionContext consistent. This is more upfront work than writing ad‑hoc “Subject/Object” fields, but it pays off in substitution safety and cross‑pattern reuse.
* **Migration effort.**
  Legacy uses of “EpistemicObject”, “Facet”, “Subject”/“Object”, and raw `…Ref` fields will need refactoring into C.2.1 slots + A.6.5 SlotSpecs. Migration notes and aliasing can ease the transition, but mechanical cleanup will still be required.
* **Exposure of representation biases.**
  Being explicit about RepresentationSchemes and Operations may surface disagreements about which representations are “primary” in a team or discipline. C.2.1 does not resolve these disagreements; it only makes them visible and therefore debatable.

### Relations (overview)

**Builds on**
* A.1 `U.Holon` — for treating episteme as a holon with components.
* A.6.0 `U.Signature` — for interpreting episteme kinds as n‑ary relations over slots.
* A.6.5 `U.RelationSlotDiscipline` — for SlotKind/ValueKind/RefKind discipline over episteme slots.
* A.7, E.10.D2 — for I/D/S discipline and the Interpretation of `subjectRef` as DescriptionContext.
* C.2 (KD‑CAL, LOG‑CAL) — for ClaimGraph semantics, ReferencePlanes, and Bridges.
* E.8, E.10 — for pattern authoring discipline and lexical guards.

* **Constrains**
* A.6.2–A.6.4 — by fixing the minimal episteme component set those morphisms operate on and by requiring an explicit **DescribedEntityChangeMode characteristic** (`describedEntityChangeMode ∈ {preserve, retarget}`) over `DescribedEntitySlot`/`GroundingHolonSlot`.
* E.17.0–E.17.2 — by specifying how `DescribedEntity`, `Viewpoint`, `View` and ReferenceSchemes are represented at episteme level.
* E.17 (MVPK) — by separating `U.View` (episteme) from `U.PresentationCarrier` (surface), and by requiring that publication morphisms be `U.EpistemicViewing` species over C.2.1‑conformant views.
* F.18 (LEX‑BUNDLE) — by providing the episteme‑specific name cards and guards for DescribedEntity/GroundingHolon/Viewpoint/View/ReferenceScheme and their SlotKinds.

**Used by**
* A.6.2 `U.EffectFreeEpistemicMorphing` — as the default episteme object structure for episteme‑to‑episteme transforms.
* A.6.3 `U.EpistemicViewing` — as the substrate for describedEntity‑preserving projections (views).
* A.6.4 `U.EpistemicRetargeting` — as the substrate for DescribedEntity-bundle retargeting transforms between epistemes (Ep→Ep with `describedEntityChangeMode = retarget`).
* E.17.0 `U.MultiViewDescribing`, E.17.1, E.17.2 — to organise families of D/S‑epistemes under Viewpoints and EoI classes.
* E.17 (MVPK) — to publish episteme views as surfaces.
* E.TGA — to interpret StructuralReinterpretation and other engineering projections as episteme morphisms over a well‑typed `U.EpistemeSlotGraph`.

Together, these relations make `U.EpistemeSlotGraph` the **single normative core** for thinking about epistemes, their DescribedEntity mapping, their representations, and their transformations across FPF.
## C.2.1:End
