---
title: "Part C — Kernel Extensions Specifications"
description: "Generated reference page for heading:part-c-kernel-extensions-specifications:29111."
---

# Part C — Kernel Extensions Specifications
> Preface node `heading:part-c-kernel-extensions-specifications:29111`

## Content

| §                                            | Pattern                        | Tag | Scope & Exports                                                      |
| -------------------------------------------- | ---------------------------------- | --- | -------------------------------------------------------------------- |
| **Cluster C.I – Core CALs / LOGs / CHRs**    |                                    |     |                                                                      |
| C.1                                          | **Sys‑CAL**                        | CAL | Physical holon composition; conservation invariants; resource hooks. |

## Epistemic holon composition (KD-CAL)

**Scope & exports.** A substrate‑neutral calculus for composing **epistemic holons** (`U.Episteme`) and reasoning about their motion and equivalence. Exports: (i) three **point‑characteristics**—**Formality F**, **ClaimScope G**, **Reliability R**—that locate a single episteme; (ii) a **pairwise ladder** of **Congruence Levels (CL 0…3)**; (iii) four **Δ‑moves** (*Formalise, Generalise/Specialise, Calibrate/Validate, Congrue*); (iv) **composition rules** (Γ_epist) for aggregates; (v) propagation laws for CL through mappings and notation bridges. KD‑CAL sits on the `U.Episteme` *semantic triangle* (Symbol–Concept–Object) and never confuses **notation** with **carrier**. All F–G–R computations are **context‑local**; Cross‑context traversals **require** an explicit **Bridge** with **CL** and apply the **B.3** congruence penalty **Φ(CL)** to **R**.  // Contexts ≡ U.BoundedContext; substitution is plane‑preserving only.

**Formality F** is the rigor characteristic defined **normatively in C.2.3**. All KD‑CAL computations and guards **SHALL** use `U.Formality` (F0…F9) as specified there; **no parallel “mode” ladders** are allowed.

### Problem Frame

FPF fixes two archetypal sub‑holons: **`U.System`** (physical/operational) and **`U.Episteme`** (knowledge holon). KD‑CAL is the **home pattern** of `U.Episteme`, giving engineers a compact, testable way to say (a) how strictly an episteme is written (**F**), (b) how much structure it manages (**G**), (c) how well it is warranted by evidence or severe tests (**R**), and (d) how closely **two** epistemes coincide (**CL**). KD‑CAL is built atop **C.2.1 U.Episteme — Semantic Triangle via Components**, which reifies every episteme as **Concept** (claim‑graph), **Object** (describedEntity & evaluation rules), and **Symbol** (notation)—*not the file itself*; **carriers** and **work/executions** remain outside and are linked via `isCarriedBy` / `producedBy(U.Work)`.
### Problem

Teams routinely entangle **programs, specifications, proofs, and datasets**; a “proof” is treated as a tested routine, a “program” is cited as if it entailed a theorem. **Trust decays** because justification and evidence freshness are not explicit. Epistemes are anthropomorphised as actors (“the standard enforces…”), producing **category errors at execution**. Without a shared composition and equivalence calculus, aggregates hide weakest links and analogies harden into overclaims. KD‑CAL must stop these failure modes with a **single constitution and scale‑set**.
### Forces

* **Universality vs domain idioms.** One calculus must host physics theories, legal codes, safety specs, algorithms, and formal proofs without flattening their differences.
* **Meaning vs materiality.** Meaning must be independent of carrier, yet accountable to it historically.
* **Deductive vs empirical.** Axiomatic certainty and empirical trust have different lifecycles; both must compose.
* **Abstraction vs enactment.** Epistemes constrain action; **systems** act. The calculus must keep the roles distinct.
### Solution

#### Coordinates and the triangle

**KD‑CAL characteristics (single‑episteme, point‑values).**

* **Formality F.** From free prose to **machine‑checkable proof/specification**. Litmus: *would a machine reject it if wrong?*
* **Claim scope (G), a set‑valued applicability over `U.ContextSlice`, with ∩/SpanUnion/translate algebra; CL penalties apply to R, not to F/G.** Litmus: *how wide is the declared scope, and under what minimal assumptions does the claim hold?*
* **Reliability R.** From untested idea to **continuously validated claim**. Litmus: *where is the last successful severe test?* **R‑claims MUST bind to evidence and declare relevance windows; stale bindings degrade R or require waiver per ESG policy.**

 **Congruence Level (CL), pairwise ladder.**
 `CL‑0` **Opposed/Disjoint** (contrastive; no substitution); `CL‑1` **Comparable / Naming‑only** (label similarity; no substitution); `CL‑2` **Translatable / RoleAssignment‑eligible** (structure‑preserving mapping in a declared fragment with **stated loss**; theorems may transport); `CL‑3` **Near‑identity / Type‑structure‑safe** (invariants match; type‑structure substitution allowed). *CL is a characteristic of a relation between two epistemes; it is not a fourth member of the F–G–R assurance tuple and it is not a characteristic space of its own.* **Norm:** substitution is permitted only if plane‑preserving and **CL ≥ 2**; substituting **type‑structure** requires **CL = 3**.

**Triangle link.** The assurance components live on the **Concept↔Object** side: *F* by the internal claim‑graph structure, *G* by the **ClaimScope** (scope & assumptions) as a scope object, and *R* by evaluation templates and evidence bindings. The **Symbol** vertex hosts notation; **carriers are outside** the episteme and link via `isCarriedBy`. Multiple notations are allowed under a **single Symbol component**; authors SHOULD register `NotationBridge(n₁,n₂)` with an associated **CL** to make conversion loss explicit.
#### Four Δ‑moves (epistemic motion)

* **ΔF — Formalise.** Rewrite for stricter calculi/grammars; raise proof obligations.
* **ΔG — Generalise / Specialise.** Widen or narrow the **claim scope** (assumptions & scope). Changes to decomposition granularity are an **orthogonal view** and do not change **G** unless they alter the envelope.
* **ΔR — Calibrate / Validate.** Strengthen severe tests or add live monitoring; update evidence bindings.
* **ΔCL — Congrue.** Establish and record the sameness relation between **two** epistemes (ladder 0→3).
  Moves compose into **paths**; CL along a path is the **minimum** of its links.
#### Composition (Γ\_epist) and propagation

Let **Γ\_epist** combine epistemes `{Eᵢ}` into a composite episteme **Γ** that makes a joint claim (*AND‑style*) or exposes an interface (*series composition*). KD‑CAL imposes **safe defaults**:

* **R (Reliability).** Along any justification **path** `P`, compute **`R_eff(P) = max(0, min_i R_i − Φ(CL_min(P)))`** (weakest‑link with congruence penalty). For **series** composition (claims needed conjunctively), the path‑wise weakest‑link applies; for **parallel** support (independent lines to the *same* claim), use **`R(Γ) = max_P R_eff(P)`** (annotate independence); never exceed the best attested line. Cross‑context steps and **NotationBridge** traversals contribute to `CL_min(P)`.

* **F (Formality).** `F(Γ) = minᵢ F(Eᵢ)` (monotone non‑increasing along used paths). To raise **F**, apply **ΔF** to the weakest parts.
* **G (ClaimScope).** On any dependency **path**, take the **intersection** of claim scopes (the **narrowest overlapping scope**). Across **independent support paths to the same claim**, set **`G(Γ) = SpanUnion({G_path})` constrained by support** (drop unsupported regions). Widening/narrowing the scope is an explicit **ΔG±** operation.
* **CL (Congruence).** For a chain of mappings `E₀ ~ E₁ ~ … ~ Eₖ`, the **path congruence** is `min CL(Eⱼ,Eⱼ₊₁)`. Passing through a **NotationBridge** sets CL to the bridge’s declared level; the **Φ(CL)** penalty is applied in the **R** fold for any path that traverses it.

These rules keep Γ aligned with the **holonic kernel**: Γ is only defined on holons and respects identity/boundary discipline from the core.
#### What must not be conflated (normative guards)

* **Symbol ≠ carrier.** Files, PDFs, or repositories are **carriers** outside the episteme; they never count as parts of `U.Episteme` (**see C.2.1 EP‑1; CC‑EPI‑2/3**).
* **Epistemes do not act.** Only **systems** perform work; epistemes constrain/evaluate via **Object** and **Concept** (**per Core A.15 / CC‑EPI‑3**).
* **CL is not a score.** It is a **qualitative ladder** of preservation strength; do not average it.
### ✱ Archetypal Grounding (Tell–Show–Show)

**Universal rule (tell).** *Compose knowledge by Γ\_epist with weakest‑link R, monotone F, and explicit CL on every bridge; keep Symbol–Concept–Object separate and never turn a carrier into a part.*

**System (show, Sys‑CAL lens).** Consider a **battery‑pack thermal subsystem** integrating a physics model of heat flow and an operating envelope for fast‑charge. As a **system**, it composes pumps, sensors, and controllers by physical Γ with conservation constraints (Sys‑CAL). The assurance story depends on epistemes about the model and envelope; the system **acts**, epistemes constrain. (Archetypes and boundary discipline per core.)

**Episteme (show, KD‑CAL lens).** Consider a **CMIP‑class climate projection episteme** (post‑2015 generation): its **Concept** is a claim‑graph over PDEs and parameterisations; its **Object** defines an claim scope (historical forcings, resolution); its **Symbol** may include two notations (domain equations vs. tabular schema) linked by a **NotationBridge** with an explicit CL. Compose sub‑epistemes for radiation, clouds, and ocean mixing: `R = min` across the critical path; an independent hindcast line can raise `R` only up to its own level; `F` is bounded by the least‑formal sub‑claim unless the composition adds formal invariants.
### Bias‑Annotation

* **Metric worship.** Treating `[F,G,R]` as ends rather than means; mitigation: require **evidence bindings** and narrative of limits in the Object envelope.
* **Category slip.** Equating a notation or its carrier with the Concept; mitigation: Symbol–carrier separation and EP‑1 triangle cardinality.
* **Analogy inflation.** Presenting CL‑0/1 as identity; mitigation: always name the **CL rung** for cross‑mappings.
### Conformance Checklist

1. **C2‑1 (Triangle).** Every `U.Episteme` **MUST** occupy exactly one slot per {Symbol, Concept, Object}; carriers link via `isCarriedBy` and are never parts.
2. **C2‑2 (Coordinates).** Each episteme **SHALL** declare `[F,G,R]` with a brief rationale; **F** is `U.Formality ∈ {F0…F9}` per **C.2.3**, **exactly one episteme‑level F** computed as the **min over essential parts**. CL is declared for **pairs only**. Sub‑anchors: ** Contexts **MAY** mint named sub‑anchors (e.g., `F4[OCL]`, `F7[HOL]`), which **MUST** preserve the global order and **map to their parent anchor** from C.2.3.
3. **C2‑3 (Composition).** Authors **SHALL** choose Γ_mode (**series** vs **parallel**). For any justification **path** use **`R_eff(P) = max(0, min_i R_i − Φ(CL_min(P)))`**; for **parallel** independent lines to the *same claim*, take **`R(Γ) = max_P R_eff(P)`** (never exceeding the strongest line). Compute `F(Γ) = min` along the used paths. For **G**, use **path‑wise intersections** and then **SpanUnion({G_path}) constrained by support**. Cross‑context traversals **MUST** use a Bridge with **CL** and apply **Φ(CL)** to `R`.
4. **C2‑4 (NotationBridge).** Multi‑notation Symbol components **SHOULD** register `NotationBridge` edges with CL and loss note; any cross‑notation reasoning **MUST** cite the bridge’s CL.
5. **C2‑5 (No action).** Epistemes **MUST NOT** be assigned actions; work is executed by systems in role.
### Consequences

**Benefits.** A single, compact **map** for all knowledge artefacts; fast detection of weakest‑link **R** in aggregates; disciplined reuse across domains with explicit **CL**; consistent separation of **meaning** from **material carriers**.
**Trade‑offs.** Authors must learn to declare Γ‑mode and CL explicitly; multi‑notation work requires bridge bookkeeping; *mitigation:* the triangle and ladder keep the discipline brief and repeatable.
### Rationale

KD‑CAL externalises a long‑standing semiotic insight (Sign–Meaning–Referent) into a **holonic composition** where syntax/structure (**F,G**), pragmatics/evidence (**R**), and cross‑mapping strength (**CL**) are visible and composable. The explicit triangle (C.2.1) prevents carrier confusion; the characteristic provide a **manager‑readable** yet **formalisation‑ready** scale (with **G** grounded in **scope/envelope**, not part‑count); the CL ladder replaces overloaded “alignment” with a graded sameness notion.
### Relations

* **Depends on:** `U.Episteme — Semantic Triangle via Components` (C.2.1): identity invariants EP‑1, Symbol–Concept–Object definitions, evidence bindings.
* **Peers:** **Sys‑CAL** (C.1), which composes **systems**; KD‑CAL composes **epistemes** and feeds assurance lenses in Part B.
* **Constrained by authoring:** Architectural patterns must include Tell–Show–Show with **Archetypal Grounding** (this section).
### Worked mini‑examples (post‑2015 flavours)

* **Formal lift (ΔF).** Recasting a 2019 **variational free‑energy** narrative into a typed calculus raises **F**, clarifies scope, and enables CL‑2 bridges between biological and ML formulations—*without* claiming empirical gain (**R** unchanged).
* **Parallel evidence (R, max).** Two independent **hindcast** lines (circa CMIP6, 2019) supporting the same forecast allow `R(Γ)=max(R₁,R₂)`; if one line drifts, the composite is bounded by the stronger line until series constraints apply.
* **Notation bridge (CL drop).** A 2021 **type‑theoretic specification** rendered in a semi‑formal DSL requires a `NotationBridge` with a CL<3 note; any theorem transported across must respect the bridge’s declared preservation.

*(No tooling is implied; these are conceptual moves within the calculus.)*
### C.2:End
## U.Episteme — Epistemes and their slot graph

> **One-line summary.** `U.Episteme` is the holon type for epistemes; its internal ontology is given by `U.EpistemeSlotGraph`, which replaces the legacy **semantic triangle** with a typed graph n-ary relation over `DescribedEntity`, `GroundingHolon`, `ClaimGraph`, `Viewpoint`, `View`, and `ReferenceScheme`, aligned with `U.RelationSlotDiscipline` and ready for both symbolic and distributed representations.

### Context

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
### Problem

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
### Forces

| Force                                          | Tension we must resolve                                                                                                                |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Geometry vs. operations**                    | Simple geometric pictures (triangles) are memorable; real epistemic work is **operational and graph‑shaped** (many nodes, many edges). |
| **Universality vs. representation regimes**    | One ontology must accommodate symbolic calculi, diagrams, DSLs, interactive notebooks, and latent vectors.                             |
| **Intension vs. description vs. spec (I/D/S)** | Intensional objects (I) are not epistemes; descriptions (D) and specifications (S) are. The core must honour Strict Distinction.       |
| **Viewpoint locality vs. reuse**               | Viewpoints should be **local** to families of descriptions, yet we want reusable **viewpoint bundles** across domains (E.17.1/E.17.2). |
| **Slot discipline vs. usability**              | A clean `SlotKind`/`ValueKind`/`RefKind` discipline is vital for reasoning, but must not render engineering episteme unreadable.             |
| **Stability vs. SoTA evolution**               | The core must remain stable while integrating evolving practices: LLM tool‑use, ReAct‑style loops, structured cospans, optics, etc.    |
### Solution — from outdated semantic triangle to U.EpistemeSlotGraph

#### Overview

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
#### Minimal epistemic positions (nodes & slots)

This section defines the **minimal node set** for `U.EpistemeSlotGraph` and the associated **SlotKinds**. These are the positions that A.6.2–A.6.4 and E.17.* can rely on.

##### DescribedEntitySlot — “what this episteme is about”

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
##### GroundingHolonSlot — “where / in what holon this is grounded”

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
##### U.ClaimGraph and ClaimGraphSlot — intensional content

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
##### U.Viewpoint and ViewpointSlot — perspective of concerns and validators

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
##### U.EpistemeView / U.View and ViewSlot — episteme‑level views

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
##### U.ReferenceScheme and ReferenceSchemeSlot — reading ClaimGraph as claims about entities

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
##### Minimal node set and extension C.2.1+

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
##### Attached epistemic structures (non-slot components)

`U.EpistemeSlotGraph` deliberately does **not** reify every epistemic artefact as a node. Several key structures remain **attached, non-slot components** of `U.Episteme`:
* **`JustificationGraph`** — the argument/evidence graph for nodes of `U.ClaimGraph` (A.10/B.3).
* **`EvidenceBindings`** — per-claim `U.EvidenceRole` assignments that connect claims to external `U.Work` and carriers.
* **`EditionSeries`** — the `PhaseOf` chain of episteme editions (A.14) with change-class annotations (symbol-only vs ClaimGraph vs ReferenceScheme changes).
* **`ScopeCard` / `U.ClaimScope`** — USM scope objects (A.2.6) describing where the episteme’s claims hold.

These attached structures are **not extra positions** of `U.EpistemeSlotGraph`; they hang off the `U.ClaimGraph`/`U.ReferenceScheme` pair and are governed by KD-CAL (C.2), A.10 and B.3. C.2.1 only requires that an episteme which participates in KD-CAL exposes them in a way that keeps **ClaimGraph / ReferenceScheme / Evidence / EditionSeries / `ClaimScope`** clearly distinguishable.
#### Episteme as n‑ary relation and as holon

To prevent confusion between **objects‑of‑talk**, their **descriptions**, and the **places they occupy in an episteme**, C.2.1 explicitly treats epistemes both as:

1. **n‑ary relations with a signature** (slots & values), and
2. **holons with components** (fields & parts).

##### U.EpistemeKind — episteme as a typed n‑ary relation

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
##### U.EpistemeTuple — episteme as filled n‑ary relation

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
##### U.EpistemeCard, U.EpistemePublication, U.EpistemeView — holonic realisations

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
##### SlotKind / ValueKind / RefKind discipline for DescribedEntity & GroundingHolon

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
#### Minimal epistemic morphisms (informal schema)

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
### Legacy semantic triangle as didactic view (informative)

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
### Interaction with I/D/S and DescriptionContext (normative)

C.2.1 is the **episteme‑layer carrier** that I/D/S discipline (A.7, E.10.D2) relies on. The link is made via `DescriptionContext`.

#### DescriptionContext over C.2.1 components

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
#### I→D and D→S morphisms over C.2.1

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
### Alignment with A.6.2–A.6.4 (episteme morphisms) (normative)

`U.EpistemeSlotGraph` is the **object‑level substrate** for the episteme morphism patterns:
* A.6.2 `U.EffectFreeEpistemicMorphing`
* A.6.3 `U.EpistemicViewing`
* A.6.4 `U.EpistemicRetargeting`

#### Effect‑free episteme morphisms (A.6.2) over C.2.1

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
#### EpistemicViewing (A.6.3) as describedEntity‑preserving projections

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
#### EpistemicRetargeting (A.6.4) as DescribedEntity-bundle retargeting on episteme morphisms

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
### Alignment with E.17. (Multi‑View Describing & Publication) (normative)*

`U.EpistemeSlotGraph` underpins the E.17 cluster:
* E.17.0 `U.MultiViewDescribing`
* E.17.1 `U.ViewpointBundleLibrary`
* E.17.2 `TEVB — Typical Engineering Viewpoints Bundle`
* E.17 `MVPK — Multi‑View Publication Kit`

#### Multi‑View Describing (E.17.0)

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
#### Viewpoint bundles (E.17.1/E.17.2)

`U.ViewpointBundleLibrary` and TEVB specialise the `U.Viewpoint` node:
* A ViewpointBundle is a **set of `U.Viewpoint` instances** tailored to a class of DescribedEntities (e.g., holons in engineering contexts).
* TEVB fixes `EoIClass = U.Holon` (typically `U.System` or `U.Episteme`) and provides canonical engineering viewpoints: functional, structural, role‑enactor, interface‑oriented, etc.

From the C.2.1 perspective:

* these bundles populate the ValueKind of `ViewpointSlot`;
* engineering episteme species that want to be “TEVB‑aligned” must restrict `viewpointRef` to TEVB’s `EngineeringVPId` set, while keeping the same DescribedEntitySlot discipline.
#### MVPK (E.17) as publication over C.2.1 views

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
### Bias‑annotation (informative)

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
### Conformance checklist (normative)

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
### Consequences (informative)

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

#### Relations (overview)

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
### C.2.1:End
## Reliability R in the F–G–R triad

> Reliability (R) is a conservative, evidence-bound warrant signal for a typed claim under an explicit claim scope (G). Cross-context reuse is **Bridge-only**: scope may be re-expressed via `translate(Bridge,·)` (often narrowing), while congruence penalties route to **R only**.

> **Type:** Architectural (A)
> **Status:** Stable

### Problem frame

KD‑CAL asks a simple operational question: *“Where can I safely use this claim?”*
FPF answers with a minimal “epistemic location” built from three coordinates and one bridge qualifier:

* **F** (Formality) describes *how the claim is expressed* and how strongly it supports verification workflows (C.2.3).
* **G** (Claim scope) describes *where the claim is asserted to apply* as a set-like object (A.2.6).
* **R** (Reliability) describes *how strongly the claim is warranted* by linked evidence under that scope.
* **CL / CL^k / CL^plane** (Congruence Levels) describe *lossy transport* when claims are reused across contexts, kinds, or planes (B.3, C.3).
  CL values live on **edges/bridges** (not on the claim as a “4th coordinate”).

In practice, the triad is frequently used before it is made explicit:

* Authors implicitly “average” disparate evidence and report a single confidence.
* Teams treat higher formality (F) as if it automatically implies higher warrant (R).
* Scope growth is smuggled in through phrasing instead of explicit scope operators (A.2.6).
* Cross-context reuse occurs without explicit bridges and without routing congruence loss into R.

This pattern makes **R** explicit in KD‑CAL and fixes the **triad discipline** required by Kind‑CAL (C.3) and the Trust & Assurance calculus (B.3).
### Problem

FPF needs a reliability coordinate that is:

1. **Auditable.** A reader can trace R to concrete evidence and see how reuse penalties were applied.
2. **Composable.** R can be propagated through claim graphs conservatively, without illegal scale arithmetic.
3. **Orthogonal.** R is not conflated with F (expression) or G (scope).
4. **Bridge-safe.** Any loss from transport across contexts/kinds/planes is explicit and affects **R only**. 
5. **Minimal.** The solution does not introduce new core types or new face-kinds.
### Forces

| Force                                         | Tension                                                                                                            |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Single number vs multi-tradition evidence** | People want one scalar ↔ evidence comes from heterogeneous practices (proofs, tests, telemetry, expert review).    |
| **Rigor vs humility**                         | Claims need to be usable in decisions ↔ overconfident scores are dangerous and hard to unwind.                     |
| **Formal vs empirical warrant**               | Proof can be decisive in a formal theory ↔ real-world deployment requires empirical adequacy and drift management. |
| **Scope realism vs marketing scope**          | Narrow scopes raise R ↔ incentives push for broad statements with hidden preconditions.                            |
| **Reuse vs semantic loss**                    | Reuse is valuable ↔ reuse across contexts/kinds/planes is inherently lossy.                                        |
| **Toolability vs expressive freedom**         | A validator needs crisp rules ↔ authors want flexible narratives and domain nuance.                                |
### Solution

#### Canonical triad contract

**Definition DEF‑C2.2‑1 (Epistemic location).**
An epistemic location for a claim `c` is the tuple:

`Loc(c | K, S) = ⟨F(c), G(c), R_eff(c)⟩`

where:

* `F(c)` is Formality (C.2.3), treated as an **ordinal**.
* `G(c)` is Claim scope (A.2.6), treated as a **set-like scope object**.
* `R_eff(c)` is Effective reliability for `c`, treated as a **ratio-scale** scalar in `[0,1]` (or an **ordinal proxy** at **[M‑0/M‑1]**; see §4.5.A).
  `R_eff` is computed **pathwise** (DEF‑C2.2‑3): when more than one admissible justification path exists, publish multiple path records (PathId rows) and cite which PathId(s) a guard/decision consumed (see §4.8.A / G.6). Any collapse to a single scalar is an explicitly declared Γ‑policy (no implicit averaging).

A location is always understood *relative to* a bounded context and the assurance carriers used elsewhere in FPF:
* `K` is the declared `U.BoundedContext`.
* `S ∈ {design, run}` is the claim’s stance carrier (no design/run chimeras).
* `ReferencePlane` is declared where applicable; plane crossings apply `CL^plane` and penalize **R only**.
* When the claim is published on the Working‑Model surface, the author also declares `validationMode ∈ {postulate, inferential, axiomatic}` (E.14 / B.3).

**Mode-to-lane hint (informative).** `validationMode` sets the *default expectation* for which assurance lane carries the initial burden (B.3.3 / B.3.5).
It does **not** add a new axis and does **not** change the meaning of `R`:
* `axiomatic` → VA-dominant (constructive grounding / proof artifacts); if `ReferencePlane=world`, LA may still be required.
* `inferential` → VA+TA-dominant (reasoned chain + typing/alignment assurance); LA is optional and scope-bound.
* `postulate` → LA-dominant (empirical validation with freshness/decay); VA is optional.
In all modes, **R remains warrant**, not ontological truth; “proof ⇒ R=1 in the world” is a category error.

**Profile note (informative; fold compatibility).** Some profiles treat empirical `R` as N/A for strictly **axiomatic** lines and use a tagged proxy `R_proxy := F` (`line=formal`) for folding, as an explicit proxy rather than an implicit “F⇒R” rule (B.1.3).

`⟨F,G,R⟩` is an **assurance tuple**, not a `U.CharacteristicSpace`; do not draw “trajectories” in `⟨F,G,R⟩`.
#### What Reliability R means in KD‑CAL

**Definition DEF‑C2.2‑2 (Reliability as warrant).**
`R` is a conservative, evidence-bound indicator of how strongly the claim “holds as stated” under its declared scope and context. It is interpreted as a *warrant strength*, not as truth.

**Prophylactic clarification.**

* A higher `R` means “the evidence and its relevance supports relying on this claim under this scope.”
* A higher `F` means “the claim’s form is amenable to stronger checking and reuse,” but does not itself imply the claim is warranted.
* A larger `G` means “the claim applies to more cases,” but does not itself imply the claim is warranted in those cases.
#### Pathwise weakest-link propagation (series vs parallel)

KD‑CAL’s default Γ‑fold is **weakest‑link** on the *entailment spine* (the premises/lemmas actually needed), computed per justification path. It is conservative, monotone, and auditable.

**Definition DEF‑C2.2‑3 (Pathwise weakest-link fold).**
Let `P` be a justification path for claim `c`. Let `SpineClaims(P)` be the required supports on the entailment spine, and let `SpineBridges(P)` be the bridges actually traversed on that spine (scope bridges, kind bridges, plane/notation transports where applicable).

Define the raw warrant of the path as:

`R_raw(P) = min_{i ∈ SpineClaims(P)} R_eff(i)`

and compute the effective warrant of the path by applying congruence penalties (see §4.5 for policy shape):

`R_eff(P) = Π(R_raw(P); Φ(CL_min(P)), Ψ(CL^k_min(P)), Φ_plane(CL^plane_min(P)))`

**Spine discipline.** The `min` is taken over the *entailment spine* only (no satellites, no “nice-to-have” citations).

This matches the KD‑CAL propagation rule (C.2:4.3) and the Trust & Assurance skeleton (B.3): weakest-link on the spine, penalize only by the worst (lowest) congruence encountered on the path (no averaging).

**Parallel support (optional, declared).**
If the same claim `c` has multiple **independent** justification paths `{P_j}` (OR‑style support), the default is:

`R_eff(c) = max_j R_eff(P_j)`

Independence is recorded as an explicit note (e.g., separate rigs/datasets/proof lines), per CC‑C.2.2‑10 and the KD‑CAL composition rule (C.2:4.3).
If the “multiple paths” actually cover **different** scope slices, do not use `max` to hide weaker slices; instead publish distinct `G_path` (SpanUnion‑style coverage) and keep per‑path `R_eff` traceable (A.2.6 / C.2:4.3).

**Conflict detection (no averaging).**
If the evidence graph supports both `p` and `¬p` with overlapping scope, do **not** average. Separate by context/scope, or mark the claim **provisional** with explicit conflict edges until resolved.
#### Congruence penalties route to R only (no silent widening)

Cross-context reuse and cross-kind reuse are treated as **transport with loss**, and loss is expressed as a penalty that reduces `R`.

**Invariant INV‑C2.2‑1 (R-only penalty routing).**
For any transport step that uses a bridge with a declared congruence level, the transported claim preserves its **F** value, re-expresses its scope via an explicit **scope translation** (`translate`) when needed, and only its **R** value is decreased by congruence penalties:

`F_out = F_in`
`G_out = translate(Bridge, G_in)`  *(identity only for within-context identity use; cross-context use is undefined without a Bridge)*
`R_out ≤ R_in`

Claim scope may be *re-expressed* by an explicit translation, but must not be silently widened:

`G_out = translate(Bridge, G_in)`  (may narrow / drop unmappable slices; never widen without an explicit ΔG)

**No implicit translation.** Translation between contexts never occurs implicitly: if the target context differs, an explicit Bridge (with declared CL and loss note) is mandatory; otherwise the reuse is non-conformant.
**No implicit translation.** Cross‑Context reuse is conformant only via an explicit Bridge (declared CL + loss note) and an explicit `translate(Bridge,·)`; see **CC‑C.2.2‑4**.

This invariant is why KD‑CAL guard macros and crossing bundles can be simple: transport never silently *widens* a claim; it either (i) translates/narrows scope explicitly, and/or (ii) reduces warrant.

`translate` is the USM operator (A.2.6). It may drop unmappable slices and may include refit-like normalization; **this is not a penalty**. Any further narrowing is an explicit Δ‑move (ΔG−) under A.2.6. Congruence loss (CL/CL^k/CL^plane) still routes to **R only**.

**Notation/plane transports.** NotationBridge and plane transports contribute to the relevant `CL*_min(P)` bottlenecks for the path; they do not “lower F” by penalty. If an author actually rewrites a claim into a different formality level, that is a new episteme (ΔF), not “transport”.
#### Worked micro-example: translate(G) + penalty (A.2.6:12.2)

**Source context:** `MaterialsLab@2026`. Claim:

> `c:` “Adhesive X retains ≥85% tensile strength on Al6061 for 2 h at 120–150 °C.”

* `G_src := {substrate=Al6061, temp∈[120,150]°C, dwell≤2h, Γ_time=window(1y), rig=Calib‑v3}`
* `Loc_src(c) = ⟨F_src, G_src, R_raw⟩`

**Target context:** `AssemblyFloor@EU‑PLANT‑B`. Reuse requires a declared Bridge `b`:

* Bridge `Bridge#MatLab_to_PlantB` maps lab rig → plant rig and introduces a measurement correction; `CL(Bridge#MatLab_to_PlantB)=2` with loss note “±2 °C bias.”
* **Scope translation:** `G_tgt := translate(b, G_src)` which (in this case) narrows the temperature span to `[122,148]°C` due to the correction.
* **Penalty routing:** using policy `Φ=Φ_v1`, compute
  `R_eff := max(0, R_src − Φ_v1(CL(Bridge#MatLab_to_PlantB)))`.

**Key point:** `G` changed only because `translate(b,·)` explicitly re-expressed the *same entitlement* in the target Context’s slice vocabulary; the **congruence loss** still affects **R only**. If authors decide that only `[125,145]°C` is safe to claim on the floor, that is an explicit **ΔG−** decision (scope edit), not a congruence penalty.
#### Effective reliability under transport (policy-defined, monotone, bounded)

When a claim is reused via bridges, `R_eff` is computed by applying penalties determined by congruence levels.

**Definition DEF‑C2.2‑4 (Effective reliability under transport).**
Let:

* `CL` be the congruence level of a scope bridge (B.3).
* `CL^k` be the congruence level of a kind bridge (C.3).
* `CL^plane` be the congruence level of a plane transport bridge (B.3 / plane patterns).

Let `Φ`, `Ψ`, and `Φ_plane` be **policy-defined**, **monotone**, **bounded**, **table-backed** penalty policies applied on the relevant edges:
* `Φ(CL)` — scope/context Bridge penalty (CL).
* `Ψ(CL^k)` — KindBridge penalty (CL^k) when kinds are mapped.
* `Φ_plane(CL^plane)` — plane-crossing penalty when `ReferencePlane` differs.

**Important (direction of monotonicity).** Congruence ladders are “polarity up” (higher CL = better fit). Per **CC‑G0‑Φ** and the Trust & Assurance skeleton, penalty tables are monotone **decreasing** in their CL ladders (if `CL1 < CL2` then `Φ(CL1) ≥ Φ(CL2)`, analogously for `Ψ` and `Φ_plane`) and bounded so that `R_eff` remains within `[0,1]` after clipping. Penalty magnitudes are not required to lie in `[0,1]` (tables may exceed 1 to force `R_eff → 0` under the subtractive default); what matters is monotonicity, boundedness, and published policy identifiers.

Define:

`R_eff(P) = clip_0^1( Π(R_raw(P); Φ(CL_min(P)), Ψ(CL^k_min(P)), Φ_plane(CL^plane_min(P))) )`

where each `*_min(P)` is the **lowest** congruence level encountered on the entailment spine of `P` for that dimension (a bottleneck; no averages), and `clip_0^1(x)` truncates to `[0,1]`.

**Default (safe) instantiation (subtractive).**
When policies are expressed as subtractive penalties, a safe default is:

`R_eff(P) = max(0, R_raw(P) − Φ(CL_min(P)) − Ψ(CL^k_min(P)) − Φ_plane(CL^plane_min(P)) )`

This generalises the B.3 skeleton to multiple congruence ladders (scope vs kind vs plane) without introducing new axes. If a dimension is not present on the path, its penalty term is treated as neutral (`0` in the subtractive default).

**Provisional marking.**
Default admissibility thresholds for reuse are set by Bridge calibration profiles (e.g., G.7). Typically, `CL=1` requires an explicit waiver to proceed and `CL=0` is inadmissible; this pattern only specifies that such thresholds gate transport before any numeric penalty is meaningful.
#### Math-by-level gating (B.1.3:4.3)

* **[M‑0/M‑1]** allow **ordinal** comparisons only (no arithmetic on `R_eff`); Φ/Ψ/Φ_plane may be qualitative (“low/med/high”). Publish evidence links + lane tags.
* **[M‑2/L1]** numeric `R_eff` requires referencing numeric, table-backed policy identifiers for Φ/Ψ/Φ_plane (and Π if not default), plus reproducibility tags for empirical legs; otherwise treat the claim as [M‑1] semantics.
#### Evidence lanes are not new axes

KD‑CAL does not add new global coordinates beyond F–G–R. Instead, it requires that reliability be *explainable* via **assurance lanes** (B.3.3):

* **TA** (Typing assurance): semantic/type alignment sufficient for transport and composition.
* **VA** (Verification assurance): logical/algorithmic checking, proof, model checking, static guarantees.
* **LA** (Validation assurance): empirical adequacy under declared conditions, tests, benchmarks, telemetry.

Lane reporting is how KD‑CAL supports the common research distinction between logical soundness and empirical adequacy **without introducing new global axes**.
Lanes remain **separable** in SCR/Notes; they are not averaged into a “single tradition score”.
#### Scope operations are kind-safe (and use the ClaimScope algebra)

Reliability is meaningless if scope operations are applied to ill-typed entities.

**Well-formedness constraint WFC‑C2.2‑1 (Type before scope).**
Let `G1` and `G2` be claim scopes associated to described entities of kinds `K1` and `K2`. A scope operation that combines them (e.g., `G1 ∩ G2` for serial intersection, `SpanUnion({G_i})` for parallel coverage, or `translate(Bridge, G)` for cross‑context reuse) is defined only if:
* `K1 = K2`, or
* (same `U.BoundedContext`) `K1 ⊑ K2` or `K2 ⊑ K1` (an explicit kind relation/cast is named), or
* (cross‑Context) there exists a declared **KindBridge** relating `K1` and `K2` with an explicit `CL^k` (C.3).

This constraint prevents “type-by-scope” anti-patterns where scope manipulation is used to hide type mismatch.
#### Minimal authoring recipe

A minimal, conforming KD‑CAL authoring flow for reliability is:

1. **Fix the typed claim.** State the claim as a typed proposition about a described entity (Kind‑CAL, C.3).
2. **Declare claim scope.** Write `G` explicitly using A.2.6 operators; avoid scope-by-wording.
3. **Declare stance carriers.** Declare `K=U.BoundedContext`, `S ∈ {design, run}`, and (where relevant on Working‑Model surfaces) `validationMode ∈ {postulate, inferential, axiomatic}`; declare `ReferencePlane` if crossings are in play.
4. **Bind evidence.** Attach evidence stubs and lane tags (TA/VA/LA) and validity windows / decay policy where applicable (B.3.3, B.3.4).
5. **Choose Γ-mode.** Declare whether the support is **series** (required) or **parallel** (independent lines to the same claim).
6. **Compute R_raw.** Use the weakest-link fold on the entailment spine; for parallel support, use `max` only with an explicit independence note.
7. **Declare bridges on reuse.** If you reuse across contexts/kinds/planes/notations, declare the bridge(s) (including NotationBridge where applicable) and their CLs.
   Cross‑Context reuse is conformant only when an explicit Bridge is declared; CL admissibility rules apply (waiver or forbid) before any numeric penalty is meaningful (see **CC‑C.2.2‑4**).
   **Reuse note (FPF discipline).** When this section refers to “reuse/portability across contexts/planes”, interpret it as Bridge-only reuse per §4.4: e.g., Bridge `Bridge#MatLab_to_PlantB` with `CL=2` and an explicit loss note, applying policy ids `Φ=Φ_v1` (and, where applicable, `Ψ=Ψ_v2`, `Φ_plane=Φ_plane_v1`) to reduce `R_eff` only.

8. **Compute R_eff.** Apply the declared penalty policies into `R` (never into `F` or `G`), and publish `⟨F,G,R_eff⟩` with traceable references and policy identifiers.

A reliable claim is not a loud claim; it is a claim that can be *carried*.
#### Authoring template: Path summary row (copy/paste)

When publishing `R_eff` for a claim, authors SHOULD include a compact, claim-local **path summary**. This is intentionally shaped so it can be turned into tooling later (EvidenceGraph/PathId in G.6) without introducing new Core types or face-kinds.

| PathId | Entailment spine (required supports) | CL_min | CL^k_min | CL^plane_min | Policy-id(s) (Φ / Ψ / Φ_plane) | R_raw | R_eff | Lane tags (TA/VA/LA) | valid_until |
| ------ | ----------------------------------- | ------ | -------- | ----------- | ------------------------------ | ----- | ----- | --------------------- | ---------- |
| P‑1    | `c ← {c_a, c_b, c_c}`               | 2      | 3        | —           | `Φ=Φ_v1`, `Ψ=Ψ_v2`             | 0.82  | 0.67  | {TA, LA}              | 2026‑09‑30 |

Notes:
* `CL_*_min` values are **bottlenecks** on the relevant path/dimension (no averaging).
* `valid_until` is the **earliest** expiry across empirical legs (or `—` / “fenced to TheoryVersion” for non-decaying proof legs).
* If you publish multiple admissible paths, include multiple rows and cite which PathId(s) your decision/guard consumed.
### Archetypal Grounding

Informative; non-binding.

#### System illustration

**System.** A brake controller `S` has a claim:

> `c1:` “For road friction μ ∈ [0.2, 0.9] and vehicle mass m ∈ [900, 2200] kg, wheel slip stays in [0.05, 0.25] under ABS control.”

* `F(c1)=F5` because the controller and constraints are expressed as a machine-checkable model plus executable test harness (C.2.3).
* `G(c1)` is the declared operating envelope (A.2.6) as a product set in `(μ, m, speed, tire)` space.
* Evidence:

  * VA: model-checking of a simplified plant/controller model (strong, but only for the simplified plant).
  * LA: HIL simulation + track tests under sampled conditions with recorded telemetry windows (freshness required).
  * TA: typed alignment between “μ” in simulations, “μ” in the estimation pipeline, and “μ” inferred from real-world sensors.

If telemetry is reused from the track context to the road context, a scope bridge is declared with `CL=2`. Using the default monotone penalty table (B.3), the LA contribution is reduced, and the derived `R_eff(c1)` drops accordingly. The claim’s envelope `G(c1)` does not change; only the warrant for transporting the evidence does.
#### Episteme illustration

**Episteme.** A paper asserts two claims about an algorithm `A`:

* `c2:` “A terminates for all inputs in domain D.” (axiomatic / proof-carrying)
* `c3:` “A achieves ≥ 0.92 F1 on dataset family F under deployment preprocessing P.” (empirical)

`c2` can achieve high VA with a proof artifact; its LA lane may be N/A, but its TA lane remains relevant because the intended meaning of “domain D” must align with the implementation’s input model.
`c3` requires LA evidence and a freshness/shift policy because dataset and preprocessing drift change the scope and the warrant. If `c3` is reused from a lab dataset context to a production context, a bridge with explicit CL is required, and `R_eff` is reduced until new in-context evidence is attached.
### Bias-Annotation

Informative; non-binding.

Lenses tested: **Gov**, **Arch**, **Onto/Epist**, **Prag**, **Did**. Scope: **Universal**.

* **Onto/Epist bias:** High formality is often mistaken for high warrant (“proof therefore true in the world”). This pattern mitigates by forcing LA/TA visibility and by routing transport loss into R rather than mutating the claim.
* **Prag bias:** Teams may Goodhart R by narrowing scope or selecting easy tests. This pattern mitigates by requiring explicit scope declaration and by making scope changes first-class (A.2.6).
* **Gov bias:** Overconfident reuse across contexts is a recurring failure mode in governance settings. This pattern mitigates by forcing explicit bridges and penalties for reuse.
* **Did bias:** A single scalar is seductive; it hides what kind of warrant exists. Lane reporting keeps the scalar honest.
### Conformance Checklist

Normative.

| ID                                            | Requirement                                                                                                                                                                                                                 | Purpose                                                                       |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **CC‑C.2.2‑1 (Triad publication).**           | Authors of a KD‑CAL location **SHALL** publish `⟨F,G,R_eff⟩` as a bundle for a specific claim, rather than publishing `R` alone.                                                                                            | Prevents decontextualised confidence scores.                                  |
| **CC‑C.2.2‑2 (R-only penalty routing).**      | A conforming implementation of KD‑CAL transport **SHALL** satisfy **INV‑C2.2‑1**.                                                                                                                                           | Ensures bridges reduce warrant without silently mutating expression or scope. |
| **CC‑C.2.2‑3 (Weakest-link fold).**           | A conforming implementation of KD‑CAL reliability propagation **SHALL** use **DEF‑C2.2‑3** as the default for required supports, unless an alternative Γ‑fold is explicitly declared and remains monotone and conservative. | Prevents confidence laundering through aggregation.                           |
| **CC‑C.2.2‑4 (Bridge visibility for reuse).** | Authors **SHALL** declare explicit bridges with CL values for any cross-context, cross-kind, or cross-plane reuse that affects `R_eff`.                                                                                     | Makes transport loss auditable and machine-checkable.                         |
| **CC‑C.2.2‑5 (Penalty policy visibility).**   | Authors or tooling **SHALL** reference the active policy identifiers used for `Φ`, `Ψ`, `Φ_plane` **and** the penalty aggregation rule `Π` (if not the default) when computing `R_eff`.                                   | Ensures repeatability and prevents hidden policy drift.                       |
| **CC‑C.2.2‑6 (Type before scope).**           | Authors and validators **SHALL** enforce **WFC‑C2.2‑1** for scope composition operations.                                                                                                                                   | Prevents ill-typed scope algebra from creating incoherent reliability claims. |
| **CC‑C.2.2‑7 (Evidence binding).**            | Authors **SHALL** bind any asserted `R_eff` to evidence references that enable TA/VA/LA inspection, consistent with the assurance lane discipline (B.3.3) and evidence decay discipline (B.3.4).                            | Keeps R grounded and updateable.                                              |
| **CC‑C.2.2‑8 (No ordinal arithmetic).**       | Validators **SHALL** reject any computation that treats `F` or `CL` as if they were ratio-scale numbers (e.g., averaging, subtraction), except where explicitly permitted as a policy-defined penalty function on `R`. Validators **SHALL** also reject arithmetic over `R_eff` when it is published as an **ordinal proxy** ([M‑0/M‑1]). | Enforces CSLC legality and prevents silent scalarisation.                     |
| **CC‑C.2.2‑9 (Stance carriers declared).**    | Authors **SHALL** declare `U.BoundedContext K`, `S ∈ {design, run}`, and (where applicable) `ReferencePlane` and `validationMode`, and **SHALL NOT** merge design- and run-time assurance into one score.                 | Prevents design/run chimera and makes interpretation auditable.              |
| **CC‑C.2.2‑10 (Parallel requires independence).** | Authors **SHALL** treat `max`-composition of support paths as admissible **only** when an explicit independence justification is recorded; otherwise supports are treated as one entangled line and remain weakest-link. | Prevents confidence inflation by double-counting correlated evidence.         |
### Common Anti-Patterns and How to Avoid Them

Informative; non-binding.

| Anti-pattern               | Symptom                                                                                       | Why it fails                                                     | How to avoid / repair                                                                                    |
| -------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Averaging assurance**    | A mean/weighted sum of `R` values is reported as “confidence”.                               | It violates WLNK and is usually illegal scale arithmetic.        | Use weakest-link `min` on the entailment spine, then apply congruence penalties into `R` only.          |
| **Truth-by-score**         | `R=0.9` is treated as “the claim is true.”                                                    | R is warrant strength, not ontological truth.                    | Require explicit evidence links and scope; treat R as decision warrant only.                             |
| **Scope laundering**       | The claim’s applicability grows by wording changes while `G` is unchanged.                    | It silently widens scope, making comparisons meaningless.        | Use A.2.6 operators and treat scope changes as explicit revisions.                                       |
| **Bridge laundering**      | A claim is reused in a new context without a bridge, and R is carried over unchanged.         | It hides semantic loss and encourages overconfident reuse.       | Declare bridges with CL and recompute `R_eff` using penalties.                                           |
| **Design/run chimera**     | Design-time proofs and run-time telemetry are mixed as if they were the same evidence object. | Evidence belongs to different stances and decays differently.    | Separate lanes and validity windows; treat crossings explicitly.                                         |
| **Ordinal arithmetic**     | CL or F levels are averaged to produce a pseudo-score.                                        | It violates scale legality and produces non-auditable numbers.   | Keep CL/F ordinal; convert only via declared penalty tables on R.                                        |
| **Many-weak-makes-strong** | Numerous low-quality supports are combined to inflate confidence.                             | It violates the weakest-link intent of conservative propagation. | Default to `min` for required supports; allow `max` only with explicit independence arguments.          |
### Consequences

Informative; non-binding.

| Benefits                                                                                                     | Trade-offs and mitigations                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Comparability.** Different claims can be compared in a disciplined way when F and G are explicit.          | **Conservatism.** Weakest-link propagation can feel pessimistic; mitigate by making support structure explicit and improving the weakest evidence. |
| **Auditability.** Transport loss is visible and localised to R.                                              | **Overhead.** Declaring bridges and evidence links is work; mitigate with templates and reuse of standard lane schemas.                            |
| **Upgradeable knowledge.** R can improve incrementally as evidence accumulates, without rewriting the claim. | **Scalar temptation.** People still want one number; mitigate by requiring lane breakdown visibility behind the number.                            |
### Rationale

A triad only works if each coordinate has a single job.

* **G carries entitlement.** It states where the claim is asserted to apply. If G is implicit, teams argue about “what was meant” instead of updating scope.
* **F carries checkability.** It states how much the claim’s form supports mechanised scrutiny and reuse. If F is conflated with R, formalisation becomes a rhetorical weapon.
* **R carries warrant.** It states how much evidence supports relying on the claim under G. If R is not conservative, weak supports can be laundered into strong confidence.

Routing congruence loss into **R only** prevents a subtle but pervasive failure mode: transport across contexts/kinds/planes does not silently rewrite the claim; it only reduces how confidently we should carry it.

Weakest-link propagation is chosen because it is the simplest rule that is monotone, conservative, and auditable. When better combination rules exist, they can be introduced as explicit Γ‑policies, but the default must be safe.
### SoTA-Echoing

Normative.

**SoTA pack binding note.** If a SoTA Synthesis Pack exists for KD‑CAL reliability / cross‑context warrant transport in your Context (G.2), cite its ClaimSheet IDs / CorpusLedger entries / BridgeMatrix rows here. Otherwise, record `SoTA-Pack: TBD/none` and treat this section as the seed (do not fork it silently elsewhere).

| Practice claim                                                                                                      | Post‑2015 source anchor                                                                   | Alignment to this pattern                                                                                                                                                           | Adoption status                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Verification and validation should be distinguished and tied to evidence quality, not to rhetoric.                  | ASME V&V 40‑2018 (model credibility assessment).                                          | This pattern separates VA and LA lanes and binds `R_eff` to evidence and declared scope rather than to narrative confidence.                                                        | **Adopt**, with KD‑CAL’s conservative fold as an explicit default.                                                   |
| Trustworthiness is context- and risk-dependent and requires explicit documentation of limits.                       | NIST AI Risk Management Framework 1.0 (2023).                                             | This pattern makes limits first-class via `G` and makes reuse loss explicit via CL penalties rather than informal caveats.                                                          | **Adapt**, because FPF treats transport loss as an epistemic penalty, not as a purely organisational risk statement. |
| Safety arguments should make claims, evidence, and assumptions explicit and reviewable.                             | UL 4600 (2020) and related assurance-case practice in autonomous systems.                 | This pattern treats `R` as an auditable warrant signal whose inputs are explicit evidence items and whose reuse requires explicit transport justification.                          | **Adopt**, while remaining notation-independent and avoiding tool mandates.                                          |
| Empirical results should be accompanied by structured provenance and usage conditions to enable reuse and critique. | “Datasheets for Datasets” (Gebru et al., 2018) and “Model Cards” (Mitchell et al., 2019). | This pattern’s scope discipline and lane reporting make empirical warrant portable only when its conditions are explicit; cross‑Context reuse is Bridge-only (e.g., `Bridge#MatLab_to_PlantB`, `CL=2`, `Φ=Φ_v1`), and congruence loss routes to `R_eff` only. | **Adopt**, with congruence penalties as the reuse control mechanism.                                                 |
| Reproducibility requires packaging evidence and making it re-checkable by others.                                   | ACM Artifact Review and Badging (updated practices post‑2015) and The Turing Way (2019).  | This pattern treats evidence as something that can be inspected across TA/VA/LA lanes and allows reliability to decay when evidence becomes stale or non-replayable.                | **Adapt**, because FPF treats decay and transport penalties as first-class calculus elements.                        |
| Strong inference benefits from “severe tests” rather than from accumulation of weak confirmations.                  | Mayo (2018) on severity in statistical inference.                                         | Weakest-link propagation and explicit scope declarations discourage superficial confirmation piling and encourage explicit, discriminating evidence.                                | **Adapt**, because KD‑CAL is agnostic to frequentist vs Bayesian inference but requires auditability.                |
### Relations

**Builds on:** C.2 (KD‑CAL overview), A.2.6 (Claim scope and operators), C.2.3 (Formality F), B.3 (Trust & Assurance calculus), B.1.3 (Γ‑fold patterns), B.3.3 (assurance lanes), B.3.4 (refresh/decay), C.3 (Kind‑CAL and kind bridges), F.9 (Bridges & CL), G.6 (EvidenceGraph PathId discipline), G.7 (Bridge calibration / admissibility thresholds).
**Coordinates with:** C.16 (MM‑CHR evidence discipline), E.14 (working-model assertions), E.18/A.27 (crossing bundles), C.25 (Q‑Bundle, for avoiding confusion between epistemic reliability and system reliability).
**Used by:** C.3.3 (cross-kind reuse discipline), guard macro bundles in C.3.A and C.21, and any acceptance/gating logic that consumes `R_eff` while preserving `F` and `G`.
**Clarifies:** The KD‑CAL meaning of reliability implicit in C.2:4.1 and the transport clauses referenced across B.3 and C.3.
### C.2.2:End
## U.LanguageStateSpace - Language-state chart over U.CharacteristicSpace

> **Type:** Architectural (A)
> **Status:** Draft
> **Normativity:** Normative unless marked informative

**Plain-name.** Language-state space.

**Builds on.**
`A.19`, `E.10`, `F.18`.

**Used by.**
`C.2.LS`, `C.2.3`, `C.2.4`, `C.2.5`, `C.2.6`, `C.2.7`, `A.16.0`, `A.16`, `A.16.1`, `A.16.2`, `B.4.1`, `B.5.2.0`, `F.9.1`, `A.6.P`, `A.6.Q`, `A.6.A`.

### Problem frame

In engineering, inquiry, operator, and management practice, teams often need to say where a governed `U.Episteme` publication currently stands before it has reached a late endpoint owner. That governed publication may later appear through several cue-bearing, route-bearing, or endpoint-bound publication forms, but the chart claim remains about the governed `U.Episteme` publication rather than about a local alias or a carrier lane.

Cue packs, routed cue sets, abductive prompts, typed route-bounded projection publications, partial normal forms, and endpoint-bound records are not rival occupants of the space. They are publication forms through which a current position claim is made visible. MVPK faces may render those forms, but faces are not themselves the forms. By contrast, a service disturbance, a model-vs-observation discrepancy, a bodily tension, a telemetry trace, a model output, or a carrier document may trigger, witness, or carry that episteme, but none of those is itself a coordinate in the space.

Practitioners, including engineers, operators, researchers, managers, and engineer-managers, still have to decide where such an episteme currently stands, which thresholds matter next, which publication form is lawful, and what must not yet be claimed. If this domain is described only with folk labels such as `raw`, `early`, `settled`, or `ready`, the real geometry disappears.
### Problem

Without an explicit language-state chart:

1. teams collapse several facets into one maturity story;
2. `F` is silently misused as a surrogate for articulation, closure, anchoring, and representation factors;
3. thresholds are published as vague readiness statements instead of explicit facet conditions;
4. source phenomena, governed epistemes, publication forms, publication faces, and carriers are conflated;
5. bridge and endpoint work inherit under-described upstream states.
### Forces

| Force | Tension |
| --- | --- |
| **Multi-facet fidelity vs readable publication** | The chart must preserve several independent facets without becoming unreadable. |
| **Stable basis vs local thresholds** | Basis slots should stay stable across contexts, while thresholds remain context-local. |
| **Position semantics vs publication semantics** | A position claim is not identical to the source phenomenon, publication form, or carrier through which it is currently expressed. |
| **Comparability vs non-collapse** | Teams need to compare positions, but not by flattening them into one pseudo-scale. |
| **Bridge reuse vs local authority** | Cross-context work benefits from a stable upstream chart, yet each context keeps local threshold authority. |
### Solution

`U.LanguageStateSpace` is the cluster-local name for the declared language-state chart over `U.CharacteristicSpace` as disciplined by `A.19`.

It is not a second kernel state-space apparatus beside `A.19`. It is the particular declared `U.CharacteristicSpace` whose basis slots are the language-state facets used in this cluster.

#### Core role

`U.LanguageStateSpace` gives FPF one explicit home for answering five questions:

- which basis slots define where the governed episteme stands;
- what a position claim in that chart means;
- which thresholds are locally declared over those slots;
- what comparisons are lawful without cross-facet collapse;
- and how the same position claim stays distinct from the publication form currently expressing it.
#### Position reading under A.19

A language-state position is a partial, slot-explicit coordinate claim in the declared language-state `U.CharacteristicSpace`.

Each basis slot publishes a `ValueSet(slot)`, interval, or other admissible set-valued claim. Early seam publications may leave some slots unknown or wide, but that uncertainty must be declared rather than hidden inside one stage word.

`position` language is therefore lawful here only as shorthand for such slot-explicit `A.19` coordinate claims. It does **not** authorize a rival lifecycle or feature-vector story.
#### Facet basis

The language-state chart is coordinated by explicit facet owners rather than by an informal master ladder. In the current cluster the basis is formed by:

- `C.2.3` for `F`;
- `C.2.4` for articulation explicitness;
- `C.2.5` for language-state closure degree;
- `C.2.6` for language-state anchoring mode;
- `C.2.7` for the language-state representation-factor bundle.

`C.2.2a` states that these basis slots together define the chart. It does **not** own the internal scale semantics of the individual facets.
#### Ontological role lanes

Within this cluster, keep five roles distinct:

- **occupant** - the governed `U.Episteme` publication whose current position is being claimed;
- **grounds / witnesses** - disturbances, discrepancies, traces, model outputs, bodily tensions, exemplars, or contrasts that justify the current reading;
- **publication forms** - cue packs, routed cue sets, prompt forms, typed route-bounded projection publications, partial normal forms, and later endpoint-bound records through which the episteme is published;
- **publication faces** - the existing MVPK faces on which those publication forms are rendered when face typing matters;
- **carriers** - documents, console notes, cards, trace files, or model artefacts that hold or render a publication.

`U.LanguageStateSpace` owns only the coordinate reading of the position claim. It does not collapse that claim into the grounds, publication form, publication face, or carrier.
#### Position publication rule

A published position claim in `U.LanguageStateSpace` should normally make at least the following explicit:

- the occupant whose position is being described;
- the relevant slot values, `ValueSet` claims, or intervals;
- the current publication form and, when it matters, the MVPK face carrying it;
- the load-bearing grounds, witnesses, or carriers that explain those values;
- any local threshold declarations if the position is being used for a routing or gate decision;
- any note that distinguishes source anchoring from current publication-face anchoring.

A position claim may be partial when some slots are intentionally unknown, but the unknowns should be declared rather than hidden under a broad readiness label.
#### Local position-reading witness

For this pattern, a position claim is reviewable when:

- the occupant is named or inherited by an already pinned upstream publication;
- the slot values, intervals, or `ValueSet` claims are explicit enough to show where the publication stands;
- the grounds, witnesses, or inherited pins that support those values remain visible;
- any threshold-bearing use states the local threshold note or the pinned threshold source it inherits;
- and the text keeps the occupant, publication form, publication face, and carrier in distinct role lanes.

A polished note, a stronger carrier, or a more formal face does not by itself prove a new position. The chart claim remains lawful only when those role lanes and slot claims stay visible.
#### Non-substitution of F

`F` remains one basis slot in the chart, not the whole chart.

A conforming account shall not infer:

- closure from formality alone;
- anchoring from surface format alone;
- representation factors from articulation alone;
- or routing legality from a lone `F` statement.

Where operationally meaningful thresholds exist, they must publish on the relevant slots rather than being disguised as informal `F` sublevels.
#### Position versus publication form

A position claim in `U.LanguageStateSpace` is not the same thing as:

- the underlying governed `U.Episteme`,
- the source disturbance, discrepancy, or witness,
- the current publication form,
- the MVPK face that renders that publication,
- the carrier that stores or displays it,
- or the endpoint-owned record that may later result from it.

Those roles are coupled but distinct. `U.LanguageStateSpace` keeps the position claim readable without collapsing it into any one bearer lane.
#### Threshold publication discipline

If a threshold is used to justify a move, a handoff, or an endpoint entry, that threshold shall be stated on explicit basis slots in the chart. Statements such as `this is now ready`, `this has matured`, or `this is still too early` are non-conformant when they substitute for undeclared slot conditions.
#### Comparison and bridge note

Comparisons inside one context may use the shared chart and local thresholds. Comparisons across contexts require explicit bridge discipline. Label similarity or stage-language similarity does not establish sameness of charts, positions, or thresholds.

`C.2.2a` therefore supports bridge work, but does not grant cross-context identity by itself.
#### Corridor reading note

The current `Language-State & Semantic Routing Corridor` in this cluster is a distributed overlay over:

- `C.2.2a`
- `C.2.LS`
- `C.2.4–C.2.7`
- `A.16`
- `A.16.0–A.16.2`
- `B.4.1`
- `B.5.2.0`

`A.16.1 / U.PreArticulationCuePack` remains the earliest durable seam publication form in that corridor. `B.4.1` is the explicit route-bearing seam after cue preservation, not the first publication in the corridor. `B.5.2.0` is typed prompt entry, not generic route ownership.

`A.6.Q`, `A.6.A`, `A.6.P`, `B.5.2`, `A.15`, and `C.25` are seam-coupled downstream owners rather than members of this language-state owner set.

This note gives readers one corridor map only. It does not relocate articulation, closure, route, prompt, bridge, or endpoint semantics out of their current owners.
### Archetypal Grounding

**Tell.** One note can be strongly operator-loop anchored yet still weakly closed. Another can be document-mediated and symbol-heavy while still open on route choice. Both are positions in one language-state chart, but not on one maturity ladder.

**Show (System).** A service disturbance is a system-side phenomenon. The governed occupant is the alerting `U.Episteme` published from that disturbance; its position claim may be moderately formal, weakly closed, strongly operator-loop anchored, and mixed in representation because terse codes and natural-language hints coexist.

**Show (Episteme).** A model-vs-observation discrepancy is a witness-level tension, not the occupant itself. Once preserved as a cue pack, the resulting governed `U.Episteme` may be low in articulation, low in closure, strongly trace-anchored, and only partly symbolic even when later written into prose.
### Bias-Annotation

The pattern deliberately biases authors toward decomposable coordinate claims and away from folk stage vocabularies. That costs some brevity, but it prevents collapse of genuinely different state dimensions into one adjective.
### Conformance Checklist

- `CC-C.2.2a-1` `U.LanguageStateSpace` **SHALL** be treated as the declared language-state chart over `U.CharacteristicSpace`, not as a rival kernel space and not as a disguised `F` ladder.
- `CC-C.2.2a-2` Published positions **SHALL** cite explicit facet owners when those positions matter for movement, routing, or endpoint entry.
- `CC-C.2.2a-3` Position claims **SHALL** use slot-explicit values, `ValueSet` claims, or intervals; uncertainty **SHALL NOT** be hidden inside stage words such as `ready`, `early`, or `mature`.
- `CC-C.2.2a-4` A position claim in the chart **MUST NOT** be conflated with the current ground, witness, publication form, publication face, or carrier.
- `CC-C.2.2a-5` Cross-context comparison of positions or threshold talk **SHALL** go through bridge discipline rather than label similarity.
- `CC-C.2.2a-6` Corridor and navigation notes **MUST NOT** be read as relocation of facet, seam, bridge, or downstream-owner semantics into the chart owner set.
- `CC-C.2.2a-7` If a position claim is used for routing, endpoint entry, or gate-adjacent reasoning, the threshold note and the role-lane distinction between occupant, publication form, face, and carrier **SHALL** remain explicit or explicitly inherited from pinned upstream material.
### Common Anti-Patterns and How to Avoid Them

- **Maturity monism.** Replace five facets with one stage word. Repair by publishing explicit slot placement.
- **Formality capture.** Use `F` to stand in for articulation, closure, or anchoring. Repair by naming the actual facet owner.
- **Carrier collapse.** Treat a document, cue pack, or routed note as if it were the position itself. Repair by separating carrier lane, publication form, publication face, and position claim.
- **Threshold folklore.** Speak of readiness without any explicit threshold declaration. Repair by publishing relevant local threshold notes on explicit slots.
- **Bridge by vibe.** Treat similar stage language in two schools as equivalence. Repair by explicit `F.9` bridge with loss notes.
- **Corridor inflation.** Treat the navigation cluster or corridor map as if it were the owner set for all downstream semantics. Repair by naming whether the current statement belongs to the chart owner set, a seam publication owner, or a downstream owner.
### Consequences

The benefit is that practitioners, including engineers, operators, researchers, managers, and engineer-managers, can speak about where a governed `U.Episteme` stands without hiding the reasons inside vague maturity language. The trade-off is that publication must carry explicit slot and threshold information when decisions depend on it.
### Rationale

Language-state work needs one explicit statement of what this chart is before individual facet, move, and endpoint patterns start using it. Without that statement, readers have to reconstruct the same geometry from scattered local rules and examples.
### SoTA-Echoing

**SoTA note.** This section does not mint a second rule layer. It is a load-bearing alignment surface: the Solution, Conformance Checklist, and role-lane discipline of this pattern must match the stance stated here or explicitly justify divergence.

**Traditions covered.** This pattern binds itself to architecture-description governance, model-based systems engineering, and risk/governance profiling practice.

| Claim need | SoTA practice (post-2015) | Primary source (post-2015) | Alignment with `C.2.2a` | Adoption status |
|---|---|---|---|---|
| Complex technical state should be published through explicit views, viewpoints, and model distinctions rather than one implicit maturity word. | Contemporary architecture-description governance separates source artefact, view, viewpoint, and correspondence burden instead of letting one surface adjective stand in for the whole state. | ISO/IEC/IEEE 42010:2022 | `C.2.2a` adopts this by keeping chart position, publication form, face, and carrier in distinct role lanes and by rejecting stage-language as a surrogate coordinate system. | **Adopt.** |
| Rich engineering state is better represented through typed properties and relations than through one lifecycle ladder. | Recent MBSE practice favours explicit model elements, properties, and cross-view consistency over one implicit readiness staircase. | OMG SysML v2 (2025) | `C.2.2a` adapts this into a declared language-state chart with named basis facets, slot-explicit values, and local thresholds instead of one maturity rail. | **Adapt.** |
| Governance-relevant readiness requires context-local profiles and thresholds, not one global adjective. | Current governance and risk frameworks use explicit profiles, thresholds, and scoped conditions rather than one blanket readiness label. | NIST AI RMF 1.0 (2023) | `C.2.2a` adopts the threshold-publication discipline and rejects the popular shortcut where `ready`, `early`, or `mature` replaces explicit slot conditions. | **Adopt/Reject-popular-shortcut.** |

**Architecture-description governance.** `C.2.2a` adopts the discipline that positions, publication forms, faces, and carriers stay explicitly distinct, even when one local rendering makes them look aligned.

**MBSE and profile discipline.** `C.2.2a` adapts multi-property state publication into a chart over `U.CharacteristicSpace` whose basis facets remain decomposable and locally thresholded.

**Local stance.** The load-bearing SoTA claim for this pattern is narrow: best-known current practice treats governed language-state as a multi-facet chart with explicit thresholds and role-lane distinctions, not as one maturity ladder or one polished publication surface.
### Relations

- Builds on: `A.19`, `E.10`, `F.18`.
- Coordinates with: `C.2.LS`, `C.2.3`, `C.2.4`, `C.2.5`, `C.2.6`, `C.2.7`, `A.16.0`, `A.16`, `F.9`, `F.9.1`, `E.17.1`.
- Constrains: threshold publication, positional claims, and anti-collapse discipline across the language-state cluster.
### Worked Examples

#### Inquiry cue before endpoint capture

A research cue note may occupy a position claim with:

- moderate `F`,
- low articulation explicitness,
- low closure,
- strong embodied or trace-based anchoring,
- and mixed representation factors.

That position explains why the note should remain upstream of `A.6.P` or `C.25` even if its prose happens to look polished.
#### Routed operator alert note

A routed operational alert may have:

- moderate formality,
- medium articulation,
- low closure because several responses remain live,
- strong operator-loop anchoring,
- and mixed symbolic / natural-language representation.

That position explains why the alert belongs in a route-bearing seam publication before it hardens into an endpoint-owned action record.
#### Viewpoint-bound adequacy note

A document-mediated adequacy note about an architecture description may be relatively high in formality and articulation, mid-level in closure, document-mediated in anchoring, and strongly symbolic in representation. That position remains within the same language-state chart even though its carrier lane differs from an embodied inquiry cue.
#### Polished prose is not closure

A prose rewrite may look cleaner, more compact, or more manager-readable than the source cue and still remain low in closure or articulation explicitness. If the underlying slot values, uncertainty, and route plurality remain unchanged, then publication polish changes the rendering or carrier lane, not the chart position by itself.
### Position Publication Package Discipline

A publishable position claim should normally identify:

- the occupant whose position is being described;
- the relevant slot values, `ValueSet` claims, or intervals;
- the current publication form and, if relevant, the MVPK face and carrier;
- any source-versus-face anchoring distinction that matters;
- the thresholds, if any, being invoked;
- and the next owner or move family that depends on the claim.

This keeps the claim operationally useful without pretending that the position is itself a full trajectory or endpoint form.
### Review Guidance

A reviewer should ask:

1. Is the author naming a position claim in the chart, or only a folk stage label?
2. Is `F` being used as a surrogate for another slot?
3. Are source phenomena, publication forms, publication faces, and carriers being confused with the occupant?
4. Are threshold claims explicit enough for the next move or endpoint decision?
5. If the text compares two contexts, is there a real bridge or only a lexical resemblance?
### Boundary Notes

`C.2.2a` does not own move kinds, seam publication forms, endpoint repair semantics, or bridge substitution licence. Those belong respectively to `A.16` / `A.16.0`, `A.16.1` / `B.4.1` / `B.5.2.0`, `A.6.*` / `C.25`, and `F.9` / `F.9.1`.

Its job is narrower and more foundational: to make the declared language-state `U.CharacteristicSpace` chart readable so that downstream patterns can refer to one visible common geometry instead of rebuilding it piecemeal.
### C.2.2a:End
## Unified Formality Characteristic F

> **Type:** Definitional (D)
> **Status:** Stable
> **Normativity:** Normative unless marked informative

**Plain-name.** Formality characteristic.

**One-line summary.** `C.2.3` defines **Formality (F)** as one ordinal `U.Characteristic` with polarity `up`, anchored by the default ladder `F0...F9`, and owned as the `F` coordinate of the typed `F-G-R` assurance tuple.

### Problem frame

Transdisciplinary work needs one shared way to speak about rigor of expression. A research hypothesis in constrained natural language, a software interface specification with explicit invariants, a controller model checked against hybrid obligations, and a proof-bearing formal development are not comparable by domain lore alone. They are comparable by **how strictly the content is expressed**.

Historically, that distinction drifts. Teams mix editorial maturity, organizational status, notation choice, proof strength, and scope narrowness into one vague story about something being *more formal*. `C.2.3` removes that drift by giving FPF one explicit owner for the rigor-of-expression axis.
### Problem

Without one unified `F` characteristic:

1. **Rigor is narrated inconsistently.**
   Different contexts invent local mode/tier language with no shared comparability.
2. **Status and rigor collapse.**
   Something accepted, published, or approved is mistaken for something precisely expressed.
3. **Expression changes are hidden.**
   A move from sketch to predicates or from executable model to proof is not recorded as a distinct content change.
4. **Composition becomes unsound.**
   A composite artifact is treated as highly formal because one segment is highly formal, even when essential support still depends on less formal parts.
5. **Other axes are misused as surrogates.**
   Authors quietly use scope, evidence, or language-state facets as if they were part of one master formality ladder.
### Forces

| Force | Tension |
|---|---|
| **Readability vs precision** | Natural language is fast and legible; formal systems are unambiguous and checkable. F needs a gradient, not a cliff. |
| **Local freedom vs shared comparability** | Contexts need local exemplars and thresholds, but cross-context reasoning requires one stable axis. |
| **Exploration vs assurance** | Early work must be allowed at low F, while high-assurance work needs explicit higher anchors. |
| **Notation diversity vs semantic stability** | Different symbol systems may express the same rigor level; notation choice alone must not redefine F. |
| **Thin characteristic vs rich practice** | The core characteristic should stay simple, while still supporting concrete guidance, examples, and review discipline. |
### Solution - U.Formality as one ordinal characteristic

`C.2.3` defines `U.Formality` as the single owner of rigor-of-expression in FPF.

#### Identity and typing

- **Name:** `U.Formality` (abbreviated `F` in the assurance tuple)
- **Type:** `U.Characteristic`
- **Scale kind:** ordinal
- **Polarity:** `up`
- **Carrier:** any `U.Episteme`
- **Default value family:** `F0...F9`

`F` states **how strictly the content is expressed**. It does not state whether the content is true, well evidenced, widely applicable, or organizationally accepted.
#### Role in the typed F-G-R tuple

`F` is the formality coordinate in the assurance tuple. Its interaction rules are strict:

- `F` is **not** `G`; scope remains owned by `U.ClaimScope` and other USM structures.
- `F` is **not** `R`; evidence, warrant strength, and decay remain assurance concerns.
- `CL` and bridge losses affect **`R`**, not `F`.
- Changes in notation or carrier surface do not change `F` if the formal content is preserved.
#### Extensibility and local anchors

FPF provides the default anchor ladder `F0...F9`. A context may define sub-anchors or intermediate anchors such as `F4[OCL]` or `F6.5`, but only if:

- global order is preserved,
- the local anchor is explicitly docked to a parent anchor,
- the context does not invent a rival ladder or proxy scale.
#### Usage obligations

- Every normative episteme shall declare one `F` value.
- Thresholds that depend on rigor should be written explicitly as `F >= Fk` conditions.
- Any raise or lowering of `F` is a content change, not a status-only change.
- `F` remains declaration and reasoning infrastructure; it is not itself a governance process.
### Archetypal Grounding

**Tell.** `F` does not ask whether a claim is correct. It asks how strictly the claim is expressed.

**Show (System).** A system requirement written as controlled natural language with unambiguous acceptance conditions may be `F3`; the same requirement rewritten as explicit typed invariants may become `F4`; a machine-checked proof of a critical invariant may raise the relevant claim core to `F7` or above.

**Show (Episteme).** A research conjecture can begin at `F1-F3`, then gain explicit predicates at `F4`, executable semantics at `F5`, and proof-bearing core content at `F7-F8`, while remaining recognizably the same evolving claim family.
### Bias-Annotation

The pattern biases FPF toward one explicit rigor axis and against stories that mix formality with status, publication quality, scope width, or evidence strength. That bias is intentional. The price of explicit declaration is smaller than the cost of comparing rigor through folklore.
### Conformance Checklist

- `CC-F-1` Every normative `U.Episteme` **SHALL** declare exactly one `U.Formality` value, either a default anchor or a local sub-anchor explicitly docked to one.
- `CC-F-2` `F` **SHALL** be treated as an ordinal characteristic; arithmetic over `F` values is invalid.
- `CC-F-3` Higher `F` **SHALL** mean greater or equal strictness of expression, not greater truth, trust, or scope.
- `CC-F-4` Contexts **MUST NOT** publish alternative "formality modes" or "tiers" as surrogates for `F`.
- `CC-F-5` Local sub-anchors **SHALL** preserve the global ordering and the parent anchor meaning.
- `CC-F-6` The episteme-level `F` of a composite artifact **SHALL** be bounded by the least-formal essential support on the relevant support path.
- `CC-F-7` Implementations **MUST NOT** average `F` values numerically.
- `CC-F-8` Changes in `G`, `R`, or `CL` **SHALL NOT** change `F` unless the expression form itself changes.
- `CC-F-9` Cross-context transport **SHALL** preserve the attributed `F`; if the receiving context rewrites the claim materially, it becomes a new episteme with its own `F`.
- `CC-F-10` Translation loss, bridge weakness, and plane crossings **SHALL** route through `R` rather than being hidden as `F` changes.
- `CC-F-11` Assigned `F` values **SHALL** be justifiable by observable content such as explicit predicates, executable semantics, or machine-checked proofs.
- `CC-F-12` Declaring a tool or notation **SHALL NOT** by itself justify a higher `F` unless the content satisfies the target anchor semantics.
- `CC-F-13` Status labels such as `Draft`, `Approved`, or `Published` **MUST NOT** substitute for `F`.
- `CC-F-14` A context that uses `F` in gates or policies **SHALL** write those thresholds explicitly.
- `CC-F-15` Language-state facets such as articulation or closure **MUST NOT** be hidden as pseudo-levels of `F`.
### Common Anti-Patterns and How to Avoid Them

| Anti-pattern | What it looks like | How FPF prevents it |
|---|---|---|
| **Status leakage** | An artifact is called highly formal because it is approved or published. | `CC-F-13` keeps status and formality separate. |
| **Tool-worship** | A notation, prover, or execution harness is named, so the artifact is rated high-F without checking the content. | `CC-F-11` and `CC-F-12` require observable semantic grounds. |
| **Appendix inflation** | A small high-formality appendix is used to advertise the whole artifact as high-F. | `CC-F-6` keeps the whole artifact capped by the least-formal essential support. |
| **Proxy ladder** | A local context invents "bronze / silver / gold" or "ready / mature / final" and uses it instead of `F`. | `CC-F-4` rejects rival ladders. |
| **Axis capture** | Articulation, closure, scope, or evidence is spoken of as if it were part of `F`. | `CC-F-8`, `CC-F-10`, and `CC-F-15` keep the axes orthogonal. |
### Consequences

| Benefit | Trade-off / Mitigation |
|---|---|
| **Shared rigor language.** Cross-domain artifacts can be compared by one stable expression axis. | Authors must learn the anchor ladder and declare `F` explicitly. |
| **Safer composition.** Composite artifacts stop inheriting a misleadingly high rigor label from one polished segment. | Reviewers must identify essential support rather than read only visible polish. |
| **Cleaner governance.** Thresholds can be written as explicit `F` conditions instead of vague maturity labels. | Contexts must translate old local language into the canonical axis. |
| **Better interaction with other axes.** `F`, `G`, `R`, and language-state facets remain distinct. | Authors lose the convenience of one master-ladder story; that loss is deliberate. |
### Rationale

FPF needs a rigor axis that is portable across mathematics, software, systems, policy, and research. The smallest stable answer is one ordinal characteristic with clear anchors and explicit composition rules. Anything more fragmented breaks comparability; anything more compressed hides the substantive differences between sketch, predicate, executable model, and machine-checked proof.
### SoTA-Echoing

Post-2015 practice across formal methods, software architecture, safety engineering, verification, computational science, and typed proof environments converges on one broad lesson: rigor is not binary. It rises through explicit structuring, predicate expression, executable semantics, and machine-checked obligations. `C.2.3` adopts that gradient while keeping the characteristic notation-agnostic and transdisciplinary.
### Relations

- **Owns:** the `F` coordinate of the typed `F-G-R` assurance tuple.
- **Builds on:** characteristic machinery from `A.18` / `A.19` and episteme ownership from Part C.
- **Coordinates with:** `C.2.2`, `B.3`, `F.9`, `C.2.LS`, `A.16`, `C.2.4`, `C.2.5`, `C.2.6`, and `C.2.7`.
- **Constrains:** any pattern, gate, or editorial rule that speaks about rigor of expression.
### Canonical Anchors F0...F9

> **Reading rule.** Anchors are ordinal. They say what is minimally true of the expression form, not what is true of the world.

#### F0 - Unstructured prose

Free natural language with unstable vocabulary, implicit assumptions, and no stable internal structure.
#### F1 - Scoped notes

Still informal, but with stable topic focus and more consistent terminology. Scope is named even though criteria are not yet operationalized.
#### F2 - Structured outline

A recognizable template or full section shape exists. The artifact is coherent end-to-end, but acceptance criteria are still largely placeholders or informal.
#### F3 - Controlled narrative

Claims are expressed in constrained prose with stable interpretation. Acceptance or refusal conditions are visible in language, even if not yet fully predicate-like.
#### F4 - First-order constraints

Critical claims can be rendered as explicit predicates or invariants over typed entities. Consistency and conflict are at least checkable in principle.
#### F5 - Executable math / algorithmics

The artifact has declared executable semantics. Running the model, algorithm, or simulation is part of its meaning.
#### F6 - Hybrid formalism

Several formal layers are coordinated explicitly, typically discrete plus continuous or several tightly coupled formal subsystems, with declared obligations between them.
#### F7 - Higher-order verified

Core claims are encoded in a proof-capable higher-order setting and machine-checked against that logic kernel.
#### F8 - Dependent / constructive proofs

Programs-as-proofs or dependent-type artifacts carry the relevant property in their types or proof terms.
#### F9 - Univalent / higher foundations

Higher-equality foundations are load-bearing. The artifact relies on a frontier-grade setting where equivalence is handled as structure-level identity.
#### Cross-anchor cautions

- Execution is not proof.
- Surface structure is not yet semantics.
- Publishing or approval is not an anchor.
- A local sub-anchor does not erase its parent anchor's meaning.
### Assigning F in Practice

#### First-pass questions

1. **Can a competent reader misread the claim materially?**
   If yes, the artifact is likely at `F0-F2`; if not, it may be `F3` or above.
2. **Are the critical claims visible as explicit predicates or invariants?**
   If yes, the artifact is at least `F4`.
3. **Does the artifact have declared executable semantics?**
   If yes, it is likely in the `F5-F6` region.
4. **Would a logic kernel or type checker reject an incorrect change to a core claim?**
   If yes, the artifact is likely `F7-F8`, or `F9` if higher-equality machinery is essential.
#### Quick rubric

- No full structure -> `F0-F1`
- Full structure but mostly placeholder criteria -> `F2`
- Controlled prose with one stable reading -> `F3`
- Explicit predicates / invariants -> `F4`
- Declared executable semantics -> `F5`
- Hybrid / layered formal obligations -> `F6`
- Machine-checked proof core -> `F7`
- Dependent proof-carrying core -> `F8`
- Higher-equality foundations are essential -> `F9`
#### Typical delta-F moves

- `F2 -> F3`: replace loose prose with controlled phrasing and explicit acceptance statements.
- `F3 -> F4`: recast acceptance into typed predicates or invariants.
- `F4 -> F5`: give the artifact declared executable semantics.
- `F5 -> F6`: make multi-layer obligations explicit.
- `F6 -> F7/F8`: move critical claims into machine-checked proof or dependent-type form.
### Composition and Interaction

#### Weakest-essential-support rule

For a composite episteme, the effective `F` is bounded by the least-formal essential support on the relevant support path. A highly formal annex does not lift an informal essential claim core.
#### Relation to G

`F` concerns expression form; `G` concerns applicability or claim scope. Tightening scope may accompany a raise in `F`, but it is a separate change and must remain visible as such.
#### Relation to R

Higher `F` often makes evidence easier to formulate, test, or prove, but it does not create warrant strength by itself. Empirical freshness, corroboration, and bridge penalties remain `R` concerns.
#### Relation to CL and Bridges

A bridge may expose loss or mismatch across contexts. Those losses affect `R`; they do not silently lower or raise the attributed `F`. If the receiving context must materially rewrite the claim, it should publish a new episteme with its own `F`.
### Worked Examples

#### Research hypothesis

A short note proposing a new scaling law with one stable reading and explicit acceptance conditions in prose is typically `F3`. Rewriting the acceptance conditions as typed predicates would move it toward `F4`.
#### Interface specification

An interface specification with explicit preconditions, postconditions, and invariants is typically `F4`. Adding declared executable semantics in a faithful reference model may move it toward `F5`.
#### Safety controller

A controller coupled to a plant model with explicit hybrid obligations is typically `F6`. If key invariants are then machine-checked in a higher-order proof environment, those claims move toward `F7`.
#### Decision policy

A decision policy with controlled prose may remain `F3`. If thresholds and conditions are published as typed predicates, it becomes `F4`.
#### Proof-bearing algorithm

A dependent-typed algorithm whose central property is carried by the type itself is typically `F8`.
#### Executable ML recipe

A fully explicit training-and-evaluation recipe with declared execution semantics is typically `F5`. It does not become `F7` merely because the surrounding execution machinery is sophisticated.
### Authoring and Review Guidance

#### For authors

Declare `F` honestly and early. A low `F` declaration is not a defect; it is often the correct statement about an early artifact. Raise `F` by changing the expression form itself, not by applying prestige language or by pointing to surrounding machinery.
#### For reviewers

Review the actual claim core. Ask whether the target anchor semantics are visibly satisfied, whether essential support has weaker segments, and whether status or other axes have leaked into the `F` declaration.
#### For integrators and assurance leads

Use `F` explicitly in gates and composition analysis, but do not let it absorb work that belongs to `G`, `R`, `CL`, or `C.2.LS`. Large `F` gaps across collaborating artifacts are signals for explicit formalization work, not excuses for wishful leveling.
### Glossary and Notation

- **`U.Formality` / `F`.** The rigor-of-expression characteristic owned by this pattern.
- **Anchor.** A named ordinal milestone on the `F` ladder.
- **Sub-anchor.** A context-local refinement docked to one parent anchor.
- **Delta-`F`.** A content change that alters expression rigor.
- **Essential support.** The support without which the central claim does not stand.
- **Example notation.** `F = F4`, `F = F7[HOL]`, `requires F >= F6`.
### Change Log and Patch Notes

#### Supersession of legacy ladder language

This pattern supersedes legacy wording that speaks about alternate formality modes, tiers, or editorial ladders. Forward-looking use should speak in `F` directly.
#### Migration guidance

When refreshing legacy material, assign an initial `F` from observable content, rewrite local maturity labels into explicit `F` declarations, and keep provenance notes only as historical annotations rather than live rigor surrogates.
#### Boundary to language-state axes

For the language-space extension, `F` does **not** own `U.ArticulationExplicitness`, `U.LanguageStateClosureDegree`, `U.LanguageStateAnchoringMode`, or `U.LanguageStateRepresentationFactorBundle`. Contexts **MUST NOT** hide thresholds for those facets as pseudo-levels or submodes of `F`; those facets remain explicitly owned by `C.2.LS` and its subordinate owners.
### C.2.3:End
## U.LanguageStateFacetProfile - Thin owner for language-state facets

> **Type:** Definitional (D)
> **Status:** Draft
> **Normativity:** Normative unless marked informative

**Plain-name.** Language-state facet profile.

### Problem frame

Once position claims in the declared language-state chart over `U.CharacteristicSpace` must be published and compared, teams need one thin owner that keeps the relevant facets visible as one explicit facet profile without turning that profile into a second characteristic calculus or a surrogate maturity ladder.
### Problem

Without a dedicated profile owner, authors blur articulation, closure, anchoring, and representation into one vague maturity story, or they silently reuse `F` as a surrogate. That blocks lawful threshold publication, weakens `A.16` move guards, and makes school-to-school bridge work harder than it needs to be.
### Forces

| Force | Tension |
|---|---|
| **Thin owner vs practical coordination** | Keep the owner small, but still give one stable place where the language-state facets are named together. |
| **Reuse vs duplication** | Reuse `A.18/A.19` characteristic machinery and `E.18` path publication rather than building a rival calculus. |
| **Local thresholds vs cross-context comparability** | Contexts need local thresholds, but the facet names must stay stable enough for bridge work and viewpoint bundles. |
### Solution

`U.LanguageStateFacetProfile` is a typed profile bundle that names the facets by which position claims in the declared language-state chart over `U.CharacteristicSpace` are published and interpreted:

- `formalityRef` -> `U.Formality` from `C.2.3`
- `articulationExplicitnessRef` -> `U.ArticulationExplicitness` from `C.2.4`
- `languageStateClosureDegreeRef` -> `U.LanguageStateClosureDegree` from `C.2.5`
- `languageStateAnchoringModeRef` -> `U.LanguageStateAnchoringMode` from `C.2.6`
- `languageStateRepresentationFactorBundleRef` -> `U.LanguageStateRepresentationFactorBundle` from `C.2.7`
- `thresholdRefs?` -> context-local threshold declarations over the owned facets
- `routeNotes?` -> informative notes that help interpret routing or reopening decisions

`C.2.LS` is therefore a **profile owner**, not a characteristic owner and not a trajectory owner. Characteristic semantics remain with `A.18/A.19`; lawful moves remain with `A.16`; explicit path publication remains with `E.18`.

#### Owner boundary

`C.2.LS` owns only the profile composition and the rule that the language-state facets must remain explicit and non-collapsed. It does **not**:

- redefine `F`;
- invent a second formality ladder;
- own the scale semantics of `AE`, `CD`, `LanguageStateAnchoringMode`, or `U.LanguageStateRepresentationFactorBundle`;
- own reopen/backoff moves;
- own endpoint routing or bridge kinds.
#### Threshold publication discipline

Any threshold used for routing, lawful move guards, or entry into `A.6.P` shall be published on explicit named facets within the profile. Contexts shall not speak of hidden sub-levels of `F` when what matters is really articulation, closure, anchoring, or the representation-factor bundle.
#### Local profile-reading witness

For this pattern, a published facet profile is reviewable when:

- the facet refs are explicit or explicitly inherited from already pinned upstream material;
- any threshold-bearing use names the facet whose threshold is being invoked;
- route notes or local overlays remain informative and visibly docked to the explicit facet bundle;
- and the profile does not smuggle move law, bridge law, gate state, or downstream-owner semantics into the bundle record.

A polished label, one strong facet, or one memorable route note does not by itself yield a lawful profile reading. The profile remains conformant only when the named facets stay explicit and decomposable.
#### Composite readings

A language-state judgement may be composite, but the composite shall be decomposable. For example, a cue may be:

- low `AE`,
- medium `CD`,
- strongly `AM.TraceAnchored`,
- and representation-wise mixed rather than purely symbolic.

A conforming profile makes this decomposition visible rather than hiding it under one poetic label such as "early" or "raw".
#### Corridor map note

`C.2.LS` participates in the current `Language-State & Semantic Routing Corridor`, but only as the thin owner of the facet-profile bundle. Readers who need one map of the full language-state owner set should read the corridor note in `C.2.2a`.

That map does not change the owner boundary here: `C.2.LS` still does not own cue preservation, route-bearing publication, prompt entry, or downstream endpoint handoff.
### Archetypal Grounding

**Tell.** A team may say a draft is "still forming" for different reasons. `U.LanguageStateFacetProfile` forces the team to say whether the issue is low articulation, weak candidate-space closure, an anchoring mismatch, or an unresolved representation-factor bundle.

**Show (System).** An operator alert note can be strongly operator-loop anchored and low-closure without being low-formality in every respect.

**Show (Episteme).** An inquiry note can be low articulation yet already tightly anchored to exemplars and traces.
### Bias-Annotation

The pattern biases authors toward explicit facet ownership and away from master-scale stories. That cost is intentional: the goal is to prevent surrogate ladders from entering the Core.
### Conformance Checklist

- `CC-C.2.LS-1` A language-state facet profile **SHALL** reference explicit facet owners rather than invent local unnamed axes.
- `CC-C.2.LS-2` `C.2.LS` **MUST NOT** redefine `F` or create a second formality ladder.
- `CC-C.2.LS-3` Thresholds that matter for routing, reopening, or lexical repair **SHALL** be published on explicit facets.
- `CC-C.2.LS-4` Trajectory accounts that rely on facet profiles **SHOULD** reuse `A.16` move kinds and `E.18` path publication rules.
- `CC-C.2.LS-5` Composite labels such as `early`, `settled`, or `ready` **SHALL NOT** stand in for the explicit facet bundle when those states matter operationally.
- `CC-C.2.LS-6` Composite readings, overlays, and route notes **SHALL** remain decomposable into named facets and **MUST NOT** behave as hidden master axes.
- `CC-C.2.LS-7` A profile bundle **MUST NOT** smuggle move law, bridge law, gate state, or downstream-owner semantics into what should remain a thin facet-profile record.
### Common Anti-Patterns and How to Avoid Them

- **Shadow ladder.** Treating `early/late` as a master scale. Split the judgement into the named facets.
- **Formality capture.** Letting `F` stand in for closure or articulation. Publish those facets explicitly.
- **Bundle inflation.** Turning `U.LanguageStateFacetProfile` into a second `A.19`. Keep it thin and referential.
- **Opaque readiness.** Using words such as `ready` or `mature` without naming which facet justifies the claim.
- **Route-note capture.** Letting an informative route note behave like move law, gate state, or endpoint ownership. Keep route notes informative and push operative authority back to `A.16`, downstream owners, or gate/work owners.
### Consequences

The benefit is owner clarity: early cue work, bridge annotations, and reopen moves can all talk about one explicit facet profile. The trade-off is more explicit profile authoring and threshold publication.
### Rationale

The pattern gives the declared language-state chart over `U.CharacteristicSpace` one stable facet-profile record through which its facet bundle can be published together, while respecting the rest of FPF's owner boundaries.
### SoTA-Echoing

**SoTA note.** This section does not mint a second rule layer. It is a load-bearing alignment surface: the Solution, Conformance Checklist, and boundary discipline of this pattern must match the stance stated here or explicitly justify divergence.

**Traditions covered.** This pattern binds itself to architecture-description governance, model-based systems engineering, and governance/profile discipline.

| Claim need | SoTA practice (post-2015) | Primary source (post-2015) | Alignment with `C.2.LS` | Adoption status |
|---|---|---|---|---|
| Multi-facet state should be published through explicit profile elements rather than one summary stage label. | Contemporary architecture-description practice keeps the relevant properties, views, and correspondence burden explicit instead of replacing them with one reader-facing maturity word. | ISO/IEC/IEEE 42010:2022 | `C.2.LS` adopts this by requiring explicit facet refs and by rejecting profile-by-vibe labels such as `ready` or `raw` when the bundle matters operationally. | **Adopt.** |
| Complex technical state is better captured through typed properties and decomposable profiles than one lifecycle rail. | Recent MBSE practice favours explicit properties, viewpoints, and cross-view consistency over one implicit staircase of readiness. | OMG SysML v2 (2025) | `C.2.LS` adapts this into a thin facet-profile bundle whose members remain decomposable and whose thresholds stay tied to named facets. | **Adapt.** |
| Governance-facing readiness should stay scoped and profile-based, not collapse into one global adjective. | Current governance frameworks use explicit profiles, scoped conditions, and local thresholds rather than one blanket readiness label. | NIST AI RMF 1.0 (2023) | `C.2.LS` adopts profile-level threshold publication and rejects the popular shortcut where one polished profile label substitutes for explicit facet talk. | **Adopt/Reject-popular-shortcut.** |

**Architecture-description governance.** `C.2.LS` adopts the discipline that useful state publication should keep the relevant profile elements explicit rather than hiding them inside one summary label.

**MBSE and profile discipline.** `C.2.LS` adapts typed multi-property state publication into a thin, decomposable language-state facet bundle rather than one master scale.

**Local stance.** The load-bearing SoTA claim for this pattern is narrow: best-known current practice treats language-state publication as a small explicit facet profile with local thresholds and decomposable readings, not as one maturity adjective or one route-coloured bundle label.
### Relations

- Builds on: `A.18`, `A.19`, `C.2.2a`, `C.2.3`.
- Coordinates with: `C.2.4`, `C.2.5`, `C.2.6`, `C.2.7`, `A.16.0`, `A.16`, `A.16.1`, `A.16.2`, `B.4.1`, `B.5.2.0`, `E.18`, `F.9.1`.
- Constrains: language-state threshold publication and profile composition.
### Worked Examples and Composition Notes

#### Operator-facing early alert

A console alert note may be published with a language-state facet profile such as:

- `F = F2/F3` because the note is structurally controlled but still lightweight;
- `AE = AE2` because candidate anchors are visible but not yet fully relation-shaped;
- `CD = CD1` because several routes remain live;
- `LanguageStateAnchoringMode = AM.OperatorLoop` because the note is directly anchored to operator action;
- `RepresentationFactorBundle = {local, sparse, mixed-symbolic}` because alert text and compact codes coexist.

This example shows why no one facet can replace the others. The note is not `simply early`; it is early in a specific, decomposable way.
#### Research cue before lexical repair

A felt or trace-anchored mismatch cue in an inquiry note may be:

- low `AE`,
- very low `CD`,
- strongly `AM.EmbodiedFelt`,
- and representation-wise mixed because the cue is partly verbal, partly kinesthetic, partly exemplar-based.

That profile explains why the cue should remain in `A.16.1` rather than being forced into `A.6.P` or `B.5.2` immediately.
#### Architecture-description case

A viewpoint-bound note about the adequacy of an architecture description may be moderately high in `F`, moderately high in `AE`, still mid-level in `CD`, document-mediated in `AM`, and strongly symbolic in its representation-factor bundle. The profile keeps description-side adequacy distinct from system-side engineering quality.
#### Same F, different profile

Two notes may share the same rough `F` band and still differ sharply in articulation, closure, anchoring, and representation factors. One may be operator-loop anchored and low-closure; another may be document-mediated and comparatively closed. The profile bundle keeps that difference visible instead of letting `F` behave like a master axis.
### Authoring and Review Guidance

#### For authors

When publishing a language-state facet profile:

1. start from the local authoring problem rather than from a memorized ladder;
2. name the facet refs explicitly;
3. add threshold refs only when a threshold changes routing, repair, or governance;
4. avoid global labels such as "mature", "raw", or "ready" unless the profile decomposition is already visible.
#### For reviewers

A reviewer should ask:

- is any facet silently replaced by `F`?
- is a threshold published on an explicit facet rather than on a poetic surrogate?
- do route or reopen claims actually match the published facet bundle?
- are profile notes genuinely informative, or are they smuggling owner semantics that belong elsewhere?
#### For integrators

Integrators should preserve profile references rather than rephrasing them into local slang. A local alias is acceptable only if the underlying facet docking remains explicit and stable.
### Extension and Migration Notes

#### Local extension rule

Contexts may extend the profile with local threshold refs, route notes, or additional descriptive aids, but they shall not add a new master facet that collapses the owned set into one summary axis.
#### Migration from surrogate prose

Older prose often says:

- "the episteme is still early",
- "the issue is not mature enough",
- "the note is ready",
- "the cue is still raw".

A conforming migration rewrites such statements into explicit facet talk: which facet is low, which is high, which threshold is or is not met, and which move that fact justifies.
#### Boundary reminder

`U.LanguageStateFacetProfile` is a coordination record. If authors find themselves putting move laws, bridge laws, scale laws, or bundle semantics into the profile itself, they are writing in the wrong owner.
### Profile Publication Package Discipline

#### Minimal publishable profile package

A publishable `U.LanguageStateFacetProfile` should normally carry:

- the declared facet refs for `AE`, `CD`, `LanguageStateAnchoringMode`, and `LanguageStateRepresentationFactorBundle`;
- any threshold refs that materially affect routing, repair, bridge interpretation, or review burden;
- the local relation to `F` when readers might otherwise treat `F` as a surrogate;
- any omission note when a facet is intentionally unpublished, unknown, or locally irrelevant.

One-line publication is lawful only if facet ownership remains legible.
#### Partial-profile rule

A partial profile is lawful only when omission is explicit. Publishing `AE` and `CD` while deferring `LanguageStateAnchoringMode` is acceptable; silently omitting it and then speaking in scalar prose such as "early" or "ready" is not.

If only one facet is published, either explain why the others are not owned in the current note or point to the note where they are already published.
#### Overlay discipline

Local overlays such as "explicit-but-open", "trace-heavy", or "operator-tight" are lawful only when they dock to explicit facet refs. Overlays remain secondary to the owned profile and must not replace the facet bundle.
### Cross-Facet Reading Law

#### No master-facet reading

Do not infer the whole language-state profile from one facet. High `AE` does not entail high `CD`; strong `AM.OperatorLoop` does not fix `AE` or `CD`; symbolic representation does not entail high `F`; low `CD` does not imply low operational consequence.
#### Threshold interaction rule

When a threshold is expressed over one facet, say whether the other facets are merely informative or also constraining. A Context may allow entry into `B.5.2.0` once `AE` suffices for an explicit open question while still capping `CD` so rival answers remain live; it may allow entry into `A.6.P` at `AE3+` while still capping `CD` so the move remains exploratory rather than endpoint-binding.
#### Transition reading rule

Read profile transitions facetwise. A note may become more explicit without becoming more closed, more document-mediated without changing closure, or more symbolic without becoming more formal. `A.16`, `A.16.1`, `A.16.2`, `B.4.1`, and `B.5.2.0` should therefore cite the facet transition that actually justifies the move.
### Review Matrix and Migration Tests

#### Review matrix

A reviewer should ask:

- is each published facet owned by its proper pattern rather than by surrogate prose;
- does any overlay smuggle a hidden scalar or gate decision;
- are threshold claims tied to the facet that really bears them;
- do cited moves in `A.16`, `A.16.1`, `A.16.2`, `B.4.1`, or `B.5.2.0` actually match the facet bundle;
- if the profile crosses a bridge or viewpoint boundary, are stance and loss notes kept in `F.9` or `F.9.1` rather than imported as fake facets.
#### Migration test for old prose

Legacy phrases such as "still immature", "not ready yet", or "already stable enough" should be unpacked into: which facet is claimed, which anchor or bundle member justifies it, which threshold or route consequence follows, and which owner carries that consequence.
#### Comparative profile use

Compare profiles facetwise unless a Context has published an explicit local aggregation for reporting. Such an aggregation remains secondary and must not replace the profile in norms, thresholds, or bridge claims.
### C.2.LS:End
## U.ArticulationExplicitness

> **Type:** Definitional (D)
> **Status:** Draft
> **Normativity:** Normative unless marked informative

**Plain-name.** Articulation explicitness.

### Problem frame

A governed `U.Episteme` can already matter while its semantic shape is not yet fully explicit. The declared language-state chart over `U.CharacteristicSpace` therefore needs one basis-slot owner for how explicit that shape already is, without confusing articulation with rigor, truth, or closure.
### Problem

When articulation explicitness stays implicit, authors either overstate readiness for later repair or endpoint routing, or hide early cue structure entirely. Reusing `F` for this judgement creates a category error: formality is about rigor of expression, not about whether the semantic shape is already explicit enough for repair or endpoint routing.
### Forces

| Force | Tension |
|---|---|
| **Early capture vs false precision** | Capture weak cues without pretending they already have stable slots. |
| **Comparability vs local nuance** | Keep a shared ordinal discipline while allowing context-local threshold declarations. |
| **Repair readiness vs exploratory openness** | Name when an episteme is ready for `A.6.P` without forcing every cue into late forms. |
### Solution

`U.ArticulationExplicitness` is an ordinal characteristic over how explicit the semantic shape is in a published position claim in the declared language-state chart over `U.CharacteristicSpace`, for publication, routing, and repair.

#### Characteristic contract

- **Kind:** CHR characteristic.
- **Scale discipline:** ordinal.
- **What rises:** semantic shape becomes more explicit.
- **What does not follow automatically:** truth, trust, closure, admissibility, or formality.

`AE` is therefore independent from `F`, from `LanguageStateClosureDegree`, and from endpoint authority.
#### Starter anchor set

| Anchor | Reading | Typical lawful publication state |
|---|---|---|
| `AE0` | felt / latent / weak cue only | still preservable, but not yet anchor-explicit |
| `AE1` | stable cue span, contrast, or disturbance cue is nameable | `U.PreArticulationCuePack` becomes natural |
| `AE2` | candidate anchors or partial roles are visible | cue pack with candidate anchors and route candidates |
| `AE3` | minimally relation-like skeleton exists | entry to `A.6.P` becomes possible if local threshold allows |
| `AE4` | slot-explicit normal form is publishable | explicit relation or characteristic form |
| `AE5` | articulation is explicit enough for stable endpoint routing and later bridge work | endpoint-owned publication becomes straightforward |

The anchors are a starter set; a Context may refine them locally, but it shall keep the ordinal direction and the distinction from `F` intact.
#### Use discipline

- `AE` may be used to state entry conditions for `A.6.P`.
- `AE` may be used to justify why an episteme remains in `A.16.1` or `B.4.1`.
- `AE` shall not be used as a surrogate for closure, confidence, or truth.
- High `F` shall not be taken to imply high `AE`, and high `AE` shall not be taken to imply high `F`.
#### Change discipline

Raising `AE` requires additional explicit anchors, slots, or normal-form structure. Lowering `AE` is lawful under `A.16.2` when a prior articulation proves over-committed or misleading.
### Archetypal Grounding

**Tell.** "Something is off" may be a real cue even before bearer, action, or evaluator are explicit.

**Show (System).** An operator alert cue grounded in a disturbance trace may be stabilized as a candidate intervention cue before a full action contract exists.

**Show (Episteme).** A research note may name a contrast and exemplars before it has a clean proposition.
### Bias-Annotation

The pattern legitimizes early cues. The counter-bias is explicit: low `AE` never licenses hidden semantics or unreviewable leaps.
### Conformance Checklist

- `CC-C.2.4-1` `AE` **SHALL NOT** be treated as a synonym for `F`.
- `CC-C.2.4-2` Entry into `A.6.P` **SHOULD** require at least the Context's declared articulation threshold.
- `CC-C.2.4-3` `AE` judgements that drive routing or repair **SHALL** cite the anchors, contrasts, or slots that justify the chosen level.
- `CC-C.2.4-4` Raising `AE` **SHALL NOT** be described as if it automatically settled closure or authority.
### Common Anti-Patterns and How to Avoid Them

- **Formal-looking but semantically thin.** High `F`, low `AE`. Declare both.
- **Mystical cue immunity.** Low `AE` presented as exempt from authoring discipline. It is not.
- **Ready-by-tone.** A sentence sounds precise, so authors assume `AE3+`. Publish the actual anchors.
### Consequences

The benefit is lawful publication of early cues and clearer threshold setting for repair. The trade-off is that authors must distinguish "not yet explicit" from "already formal".
### Rationale

`AE` is one basis slot in the declared language-state chart over `U.CharacteristicSpace`. Without it, `A.16.0`, `A.16.1`, and `B.4.1` cannot state crisp entry, seam, and exit conditions.
### SoTA-Echoing

The distinction echoes work on sketching, focusing/TAE, embodied cue capture, and representation probing: a cue can be real and operationally relevant before it becomes fully explicit.
### Relations

- Builds on: `A.18`, `C.2.2a`, `C.2.LS`.
- Coordinates with: `C.2.5`, `A.16.0`, `A.16`, `A.16.1`, `A.16.2`, `A.6.P`, `B.4.1`, `B.5.2.0`.
- Constrains: articulation thresholds for routing and repair.
### Worked Examples and Edge Cases

#### High formality, low articulation

A template may be syntactically precise and therefore high in `F`, yet still low in `AE` because the actual bearer, relation, or action slots remain unclear. This is the classic case where formal-looking language overstates semantic readiness.
#### Low formality, high articulation

A short, plain note may be low in `F` yet already high in `AE` because the relation skeleton is explicit enough for `A.6.P`. This case matters because it shows that `AE` is not a stylistic measure.
#### Threshold edge case

A cue with stable trigger span and candidate anchors may still sit between `AE2` and `AE3`. A Context should then publish its local threshold rule explicitly rather than pretending that entry into `A.6.P` is obvious by tone.
### Authoring and Review Guidance

#### Author prompt

To assign `AE`, ask:

- is the trigger span stable?
- are candidate anchors visible?
- is there already a minimally relation-like skeleton?
- is a normal form actually publishable, or only hinted?
#### Review prompt

A reviewer should reject `AE` claims that rely only on rhetorical confidence. The claimed level should be supported by anchors, slots, contrasts, exemplars, or explicit normal-form structure.
#### Threshold publication reminder

If `AE` determines whether an episteme stays in `A.16.1`, passes through `B.4.1`, or enters `A.6.P`, that threshold should be published explicitly and locally.
### Extension and Migration Notes

#### Local anchor refinement

Contexts may refine the starter anchor set with subanchors, but the refinement must preserve the ordinal direction and the distinction from `F` and `CD`.
#### Migration from vague articulation prose

Statements such as "still vague", "more explicit now", or "ready for formalization" should be migrated into explicit `AE` claims plus the corresponding move or routing claim.
#### Boundary reminder

`AE` does not own closure, confidence, or warrant. If authors want those meanings, they must publish them through their own owners.
### Articulation Publication Package Discipline

#### Minimal articulation package

An `AE` claim that matters for routing or repair should normally publish more than a level token. The supporting package should indicate which of the following are present:

- stable trigger span;
- candidate anchors or contrasts;
- bearer/action/evaluator slots where relevant;
- a minimally relation-like skeleton;
- a candidate normal form, or an explicit note that no such form is yet lawful.

A bare `AE3` label is weak publication when the supporting articulation evidence is absent.
#### Threshold package for route change

If entry from `A.16.1` or `B.4.1` into `A.6.P` depends on `AE`, publish the threshold together with the minimum articulation package required at crossing time.
#### Evidence-limited rise rule

`AE` may rise only as far as the published anchors, slots, and contrasts warrant. Stylistic polish, templates, or rhetorical confidence do not raise `AE` on their own.
### Threshold Crossing and Split Handling

#### Lawful entry into relational repair

Entry into `A.6.P` is lawful when the local articulation threshold is met and the note already exposes enough relation structure for precision restoration to operate on a real relation-like episteme. Entry into `B.5.2.0` is lawful when the open question is explicit enough for prompt-species publication even if relation structure is still too thin for `A.6.P`. If the threshold is borderline, keep the episteme in `B.4.1` or `A.16.1` and state what anchor or slot is still missing.
#### High-articulation, low-closure cases

A note may reach `AE4+` while remaining low or mid in `CD`. In such cases state that articulation is sufficient for precise handling while closure still leaves rival routes or frames live.
#### Split-publication rule

If one note contains a high-`AE` fragment and a low-`AE` remainder, split the publication rather than assigning one averaged level that hides the actual route structure.
### Review Matrix and Endpoint Boundary Tests

#### Review matrix

A reviewer should ask:

- are the named anchors genuinely present rather than merely presupposed;
- does the claimed articulation level rest on structure rather than tone;
- are bearer, action, evaluator, or comparison slots still ghosted;
- if `AE` is used to justify route transfer, is the destination owner actually ready to receive the publication.
#### Endpoint-boundary test

High `AE` does not by itself authorize endpoint claims, gate pressure, or quality ascriptions. If such consequences appear, show which downstream owner takes over.
#### Migration note for false precision

Rigid templates, capitalized labels, or tidy sentence rhythm can simulate articulation. Migration should therefore test whether anchors and slots are really present; if not, the articulation level should drop.
### C.2.4:End
## U.LanguageStateClosureDegree

> **Type:** Definitional (D)
> **Status:** Draft
> **Normativity:** Normative unless marked informative

**Plain-name.** Language-state closure degree.

### Problem frame

A governed `U.Episteme` may already be explicit enough for publication while its declared position claim remains intentionally open to rival routes or frames. The declared language-state chart over `U.CharacteristicSpace` therefore needs a separate basis-slot owner for how fixed or closed the current candidate space has become.
### Problem

Closure is often hidden inside vague words such as "ready", "settled", or "open". When closure is not explicit, teams cannot reason cleanly about reopen, sketch-backoff, or the admissibility of endpoint docking.
### Forces

| Force | Tension |
|---|---|
| **Commitment vs exploration** | Preserve open search without losing auditability. |
| **Stability vs reversibility** | Allow closure increases, but also lawful reopening and reframing. |
| **Authority vs explicit retreat** | Let strong closure matter, but keep visible the moves that relax it. |
### Solution

`U.LanguageStateClosureDegree` is an ordinal characteristic over how fixed the current candidate set, framing, and admissible next moves are in a published position claim in the declared language-state chart over `U.CharacteristicSpace`.

#### Characteristic contract

- **Kind:** CHR characteristic.
- **Scale discipline:** ordinal.
- **What rises:** the local state becomes more fixed or more binding.
- **What does not follow automatically:** truth, trust, formality, or quality.
#### Starter anchor set

| Anchor | Reading | Typical governance effect |
|---|---|---|
| `CD0` | exploratory-open | broad rival space remains live |
| `CD1` | weakly stabilized | some contrasts are present, but rival routes remain normal |
| `CD2` | narrowed candidate space | explicit rivals remain, but the field is meaningfully reduced |
| `CD3` | selected route or framing | one route is chosen, though reopening remains routine |
| `CD4` | publication- or operation-fixed under guard | changes require named justification |
| `CD5` | strongly fixed | relaxation requires an explicit `A.16.2` move and governance note |
#### Non-collapse rules

`LanguageStateClosureDegree` is not:

- `F`;
- articulation explicitness;
- gate decision;
- evaluator confidence;
- warrant strength.

A text may be highly explicit but weakly closed, or weakly explicit but already strongly closed by policy. Those states shall not be collapsed.
#### Change discipline

Increasing `CD` requires narrowing candidate space, route space, or frame space explicitly. Lowering `CD` is lawful only through a named move such as `reopen`, `sketchBackoff`, or `respecify`, with a retained-witness and discarded-assumption note.
### Archetypal Grounding

**Tell.** Two notes may look equally explicit, but one is still intentionally open while the other is already committed to a single route.

**Show (System).** An incident cue can be routed to rollback while remaining reopenable if new evidence arrives.

**Show (Episteme).** A hypothesis sketch can be highly articulated but still low closure because rival explanations remain live.
### Bias-Annotation

The pattern makes closure explicit, which resists hidden overconfidence but may feel heavy to authors who prefer implicit consensus.
### Conformance Checklist

- `CC-C.2.5-1` Closure **SHALL** be declared independently from `F` and `AE` when it matters for routing, docking, or reopening.
- `CC-C.2.5-2` Reopen/backoff moves **SHALL** cite the prior closure state they are relaxing.
- `CC-C.2.5-3` Strong-closure states **SHOULD** name the guard or owner that makes the closure binding.
- `CC-C.2.5-4` Endpoint authority **SHALL NOT** survive a closure drop silently when the supporting route or publication form no longer holds.
### Common Anti-Patterns and How to Avoid Them

- **Closure by mood.** A sentence sounds decisive, so teams assume high closure. Publish `CD` explicitly.
- **Irreversible drift.** Closure rises informally but no reopen path exists. Use `A.16.2`.
- **Authority smuggling.** High closure is treated as if it were automatically a gate or obligation. Route those consequences through the proper owners.
### Consequences

The benefit is lawful handling of stabilization, commitment, and reopening. The trade-off is more explicit state declaration and more explicit retreat records.
### Rationale

Closure is the route-governance basis slot that complements articulation within the declared language-state chart over `U.CharacteristicSpace`. `A.16.0` and its seam species need both.
### SoTA-Echoing

The facet aligns with iterative design, open-world reasoning, and exploratory search practices where closure is a governance choice rather than a hidden by-product.
### Relations

- Builds on: `A.18`, `C.2.2a`, `C.2.LS`.
- Coordinates with: `C.2.4`, `A.16.0`, `A.16`, `A.16.1`, `A.16.2`, `B.4.1`, `B.5.2.0`.
- Constrains: reopen, backoff, and endpoint docking guards.
### Worked Examples and Retreat Cases

#### Explicit but still open

A note may sit at `AE4` yet only `CD1` because rival explanatory frames are still live. The important lesson is that explicit publication does not imply settled closure.
#### Strong closure under policy guard

An operator rule may be only moderate in `AE` but high in `CD` because policy already fixes the next step under the current horizon. This shows why closure is governance-facing, not merely stylistic.
#### Reopen case

A route may move from `CD4` back to `CD2` when counter-evidence appears. A conforming publication does not hide this as embarrassment; it records the retreat as a lawful `A.16.2` move.
### Authoring and Review Guidance

#### Author prompt

To assign `CD`, ask:

- how many rivals remain live?
- is one route merely preferred, or actually fixed?
- what guard or owner makes the closure binding?
- what would count as a lawful reopen trigger?
#### Review prompt

A reviewer should ask whether closure is being inferred from tone, from hierarchy, or from social pressure rather than from an explicit narrowing of route or frame space.
#### Governance note

Whenever `CD` materially affects gates, commitments, or late endpoint authority, the supporting guard or owner should be visible.
### Extension and Migration Notes

#### Local anchor refinement

Contexts may refine the starter closure anchors, but shall keep the ordinal progression and the explicit link to reopen/backoff discipline.
#### Migration from readiness language

Words such as "settled", "closed", "final", or "open" should be treated as migration prompts into explicit `CD` claims and, where needed, into named `A.16.2` moves.
#### Boundary reminder

`CD` is not warrant strength and not a gate decision. It speaks only about the local fixity of the current episteme/publication path and its candidate space.
### Closure Publication Package Discipline

#### Minimal closure package

A publishable `CD` claim should name what has narrowed:

- the rival routes or frames that remain live;
- the route, frame, or interpretation that is currently privileged or fixed;
- the guard, owner, or policy that makes the narrowing binding;
- the condition under which a lawful reopen or backoff would occur.

A bare claim such as "now settled" is insufficient when closure affects routing or authority.
#### Narrowing-source rule

Closure may rise because evidence eliminates rivals, governance temporarily binds a route, or protocol requires fixation under time pressure. State the source of narrowing because different sources imply different reopen expectations.
#### Partial-closure rule

Closure may be local rather than global. A note can be closed enough for one route while remaining open about broader explanation or classification; a prompt may be fixed enough to hold one question steady while still open enough that rival answers remain live. Publish that locality explicitly.
### Retained and Withdrawn Authority Handling

#### Authority retention rule

If higher `CD` carried endpoint expectations, guard pressure, or route commitments, a later closure drop must say which consequences remain and which are withdrawn.
#### Lawful retreat record

A lawful retreat through `reopen`, `sketchBackoff`, or `respecify` should retain:

- the prior closure state;
- the reason the prior fixation no longer holds;
- the assumption or route being relaxed;
- the still-binding remainder, if any.

This prevents false continuity after retreat.
#### Closure versus obligation boundary

High `CD` may coexist with obligations, but `CD` is not itself an obligation owner. When prose treats "closed" as "must now be done", reroute the claim through the actual owner.
### Review Matrix and Reopen Tests

#### Review matrix

A reviewer should ask:

- what was narrowed;
- by what owner or guard it was narrowed;
- what would reopen it;
- whether any downstream authority survives the claimed closure level;
- whether the publication distinguishes local closure from whole-context finality.
#### False-finality test

Words such as "final", "settled", or "decided" should be challenged unless the route/guard package is explicit. Final-sounding rhetoric often overstates actual closure.
#### Cross-facet reminder

Low `CD` does not imply low articulation, weak anchoring, or poor representation. Reviewers should not treat openness as low seriousness.
#### Split-closure review case

A publication may be closed enough for immediate local action while remaining open about broader explanation, long-horizon consequences, or alternative classification. Allow the split when locality is explicit; reject prose that advertises whole-case finality when only one route segment is fixed.
### C.2.5:End
## U.LanguageStateAnchoringMode

> **Type:** Definitional (D)
> **Status:** Draft
> **Normativity:** Normative unless marked informative

**Plain-name.** Language-state anchoring mode.

### Problem frame

Published position claims in the declared language-state chart over `U.CharacteristicSpace` differ not only by articulation and closure, but by how the governed `U.Episteme` in that claim is anchored to bodies, traces, model states, documents, or operator loops.
### Problem

Without an explicit owner, embodiment and source anchoring are smuggled into informal prose or folded into representation terms. That weakens cue comparison, weakens bridge loss notes, and turns operator-facing language-state work into a special case with no explicit home.
### Forces

| Force | Tension |
|---|---|
| **Embodiment vs abstraction** | Preserve embodied and operator-facing cases without making them mystical exceptions. |
| **Small core vs real diversity** | Keep the core compact while allowing multiple lawful anchoring regimes. |
| **Comparability vs oversimplification** | Compare anchoring regimes without flattening them into text-vs-nontext slogans. |
### Solution

`U.LanguageStateAnchoringMode` is a nominal characteristic that states the primary anchoring regime of the governed `U.Episteme` named by the current position claim: bodily enactment, trace, model state, document, operator loop, or an explicit mixed regime. If source anchoring and current publication-face anchoring differ, both shall be distinguished rather than collapsed.

#### Starter family

| Mode | Reading | Typical evidence anchor |
|---|---|---|
| `AM.EmbodiedFelt` | bodily or kinesthetic anchoring matters directly | embodiment note, felt trace, human witness |
| `AM.TraceAnchored` | traces, logs, telemetry traces, or observations anchor the episteme | trace references, measured events, observations |
| `AM.ModelLatent` | latent or internal model state is the key anchor | model-state refs, probe results, latent summaries |
| `AM.DocumentMediated` | document or description is the principal anchoring locus | documents, cards, procedure text |
| `AM.OperatorLoop` | the episteme is directly tied to operator intervention or console control | operator witness, console event, policy hook |
| `AM.Mixed` | more than one anchoring mode matters materially | explicit component list and why the mix matters |
#### Owner boundary

`U.LanguageStateAnchoringMode` is not a representation factor bundle, not a closure state, and not a truth status. If embodiment matters, it shall be declared here or immediately beside this characteristic rather than being hidden inside representation talk.
#### Mixed-mode rule

`AM.Mixed` is lawful only when the component modes are named explicitly. "Mixed" shall not be a lazy escape from deciding whether the key anchor is bodily, trace-based, model-latent, document-mediated, or operator-loop based.
#### Bridge implications

Bridge work over governed `U.Episteme` publications in the declared language-state chart should pay attention to anchoring shifts. A translation from `AM.EmbodiedFelt` to `AM.DocumentMediated`, or from `AM.ModelLatent` to prose, often requires explicit loss notes in `F.9` and often justifies a stance annotation in `F.9.1`.
### Archetypal Grounding

**Tell.** A felt cue, a controller-side probe score, and a textual design note may all be early cues, but they are anchored differently.

**Show (System).** An alert tied to an operator console is `AM.OperatorLoop`, not just "text".

**Show (Episteme).** A model-probe cue grounded in latent state is `AM.ModelLatent` even if it is later paraphrased into prose.
### Bias-Annotation

The pattern pushes authors to declare anchoring rather than hide it in metaphors such as "the system wants" or "the note suggests".
### Conformance Checklist

- `CC-C.2.6-1` Anchoring mode **SHALL NOT** be inferred from publication phrasing alone when it matters for routing, trust, or bridge interpretation.
- `CC-C.2.6-2` Embodiment-sensitive or operator-loop cases **SHOULD** declare the embodiment or operator anchor explicitly.
- `CC-C.2.6-3` `U.LanguageStateAnchoringMode` **MUST NOT** be collapsed into `U.LanguageStateRepresentationFactorBundle`.
- `CC-C.2.6-4` Mixed-mode declarations **SHALL** list their component modes explicitly.
### Common Anti-Patterns and How to Avoid Them

- **Text-only illusion.** Treating every cue as document-mediated because it was written down later.
- **Representation capture.** Using symbolic/distributed labels to hide world-anchoring distinctions.
- **Embodiment mystification.** Treating bodily or operator-loop cues as beyond explicit publication.
### Consequences

The benefit is cleaner reasoning about embodied, operator-facing, trace-based, and model-latent cues. The trade-off is more explicit declaration burden and more explicit bridge loss notes when modes shift.
### Rationale

The declared language-state chart over `U.CharacteristicSpace` needs one explicit anchoring basis slot so that `A.16.0`, `A.16.1`, `B.4.1`, and `F.9.1` can refer to anchoring regime without re-owning it.
### SoTA-Echoing

The facet is motivated by embodied cognition, operator-facing interaction practice, active inference, and modern model-probing practice, all of which distinguish cue content from anchoring regime.
### Relations

- Builds on: `A.18`, `C.2.2a`, `C.2.LS`.
- Coordinates with: `A.7`, `A.16.0`, `A.16`, `A.16.1`, `B.4.1`, `B.5.2.0`, `C.2.7`, `F.9.1`.
- Constrains: cue publication and bridge loss notes.
### Worked Examples and Bridge-Loss Cases

#### Embodied-to-document shift

A bodily felt cue later published as prose usually changes from `AM.EmbodiedFelt` toward `AM.DocumentMediated`. That shift is not harmless; it often introduces bridge loss and should be treated as such when cross-context equivalence is claimed.
#### Model-latent to operator-loop case

A latent probe score may first be `AM.ModelLatent`, then later feed an operator-facing alert face where the working publication becomes `AM.OperatorLoop`. A conforming account should keep both anchoring modes visible rather than pretending the later publication wording fully captures the model-side cue.
#### Mixed-mode publication

A routed alert note may lawfully be `AM.Mixed` when it combines operator-loop anchoring, trace anchoring, and document mediation. But the mix must be named explicitly rather than used as a catch-all escape.
### Authoring and Review Guidance

#### Author prompt

When declaring anchoring mode, ask:

- what is the primary anchoring locus?
- does bodily or operator participation matter directly?
- is the key anchor trace-based, model-internal, or document-based?
- if multiple modes matter, which ones and why?
#### Review prompt

A reviewer should watch for the common mistake where later prose formatting tricks authors into forgetting the original anchoring mode.
#### Bridge note

If anchoring changes across publication or translation, `F.9` and `F.9.1` should often carry explicit loss or stance notes rather than silent equivalence language.
### Extension and Migration Notes

#### Local extension rule

Contexts may add local anchoring modes, but they should do so by extension of the starter family rather than by collapsing the family into a text-vs-world binary.
#### Migration from metaphorical prose

Statements like "the system wants", "the note suggests", or "the operator-facing publication says" should be repaired by naming the actual anchoring mode and the actual detector/enactor or witness structure.
#### Boundary reminder

`U.LanguageStateAnchoringMode` does not decide representation, articulation, closure, or trust by itself. It only names how the episteme is anchored.
### Anchoring Publication Package Discipline

#### Minimal anchoring package

A publishable `U.LanguageStateAnchoringMode` claim should normally identify:

- the primary anchoring locus;
- any directly relevant embodiment, operator, trace, model, or document witness;
- the transformation chain if the current note is not at the original anchoring site;
- any secondary modes that remain load-bearing.

This is especially important when the final wording is prose, because prose often hides the anchoring regime.
#### Source-versus-face rule

Distinguish the anchoring mode of the source cue from the anchoring mode of the current publication face. A bodily cue later written into a document may still require `AM.EmbodiedFelt` as source mode and `AM.DocumentMediated` as publication face.
#### Mixed-mode decomposition rule

`AM.Mixed` is lawful only when its component modes are named and the reason for the mixture is operationally real. It must not become a convenience label for an episteme that has not yet been analyzed.
### Anchoring Shift and Transport Law

#### Shift declaration rule

When an episteme crosses from one anchoring mode to another, state whether the shift is merely publication-level or whether it changes what can be preserved, compared, or trusted. A move from operator-loop enactment to report prose, for example, often drops timing, bodily load, and enactment friction.
#### Bridge-loss handoff

If an anchoring shift matters across contexts, `F.9` or `F.9.1` should own the loss or stance note. `C.2.6` only requires the shift to be noticed and not misrepresented as lossless.
#### Same-content illusion test

Two cues may be paraphrased into the same sentence while remaining differently anchored. If the anchoring regime differs, the cues are not automatically substitutable.
### Review Matrix and Extension Tests

#### Review matrix

A reviewer should ask:

- what the original anchoring regime was;
- what the current publication regime is;
- whether the transformation chain is explicit;
- whether any bridge loss or stance note is missing;
- whether a declared mixed mode is genuinely decomposed.
#### Local extension test

A new local anchoring mode is justified only when it answers a distinct anchoring question that the starter family cannot express without distortion.
#### Cross-facet reminder

Anchoring mode often correlates with representation and articulation changes, but it does not own them. Reject prose that uses `AM.ModelLatent`, `AM.EmbodiedFelt`, or `AM.OperatorLoop` as shorthand for being vague, early, trustworthy, or closed.
### C.2.6:End
## U.LanguageStateRepresentationFactorBundle

> **Type:** Definitional (D)
> **Status:** Draft
> **Normativity:** Normative unless marked informative

**Plain-name.** Language-state representation-factor bundle.

### Problem frame

Published position claims in the declared language-state chart over `U.CharacteristicSpace` must distinguish representation factors such as locality, sparsity, and symbolicity without pretending they form one master axis.
### Problem

Terms such as `EncodingBasis` collapse several independent choices. That makes comparison brittle and encourages one-dimensional stories such as distributed = informal or local = precise.
### Forces

| Force | Tension |
|---|---|
| **Comparability vs reductionism** | Allow comparison without compressing several factors into one slogan. |
| **Compact core vs extensibility** | Keep a minimal starter bundle while leaving room for domain-specific refinements. |
| **Representation vs anchoring** | Describe how the current episteme is represented without hiding what it is anchored to. |
### Solution

`U.LanguageStateRepresentationFactorBundle` is a factor bundle, not one scalar characteristic. The minimal core starter set is:

- `U.LocalityDistribution`
- `U.Sparsity`
- `U.Symbolicity`

A Context may publish a local alias such as `EncodingBasis`, but it shall dock back to the underlying factor bundle instead of replacing it.

#### Minimal factor readings

| Factor | Question it answers | Typical values |
|---|---|---|
| `LocalityDistribution` | Is the representation concentrated in local units or distributed across many units? | local / mixed / distributed |
| `Sparsity` | How concentrated is activation or descriptive support? | sparse / mixed / dense |
| `Symbolicity` | How explicit are the symbolic structures and tokens? | symbolic / mixed / subsymbolic |
#### Non-collapse rules

`LanguageStateRepresentationFactorBundle` is not:

- `LanguageStateAnchoringMode`;
- `Formality`;
- `ArticulationExplicitness`;
- `LanguageStateClosureDegree`.

A representation may be distributed yet strongly trace-anchored; symbolic yet weakly articulated; sparse yet low-closure. Those combinations shall remain visible.
#### Extension rule

Contexts may add extra representation factors only if the extension is published as a factor addition rather than as a new master axis that erases the core factor bundle.
### Archetypal Grounding

**Tell.** A model-state cue can be highly distributed but still strongly trace-anchored; a symbolic note can be low articulation if its semantics are still vague.

**Show (System).** An operator decision aid may mix sparse alert codes and symbolic procedure text.

**Show (Episteme).** A research probe can move from distributed activation patterns to sparse symbolic hypotheses without any one-step formality story.
### Bias-Annotation

The pattern resists folk theories that try to line up one representation axis with one stage or progression story.
### Conformance Checklist

- `CC-C.2.7-1` `LanguageStateRepresentationFactorBundle` **SHALL** be published as a factor bundle, not as a hidden scalar.
- `CC-C.2.7-2` Local aliases such as `EncodingBasis` **MAY** exist only with an explicit docking to the owned factors.
- `CC-C.2.7-3` Representation factors **MUST NOT** silently replace `LanguageStateAnchoringMode` or `LanguageStateClosureDegree`.
- `CC-C.2.7-4` New local factors **SHALL** preserve the factor-bundle discipline.
### Common Anti-Patterns and How to Avoid Them

- **One-axis myth.** Treating distributed/local or symbolic/subsymbolic as the whole story.
- **Progression collapse.** Equating representation shifts with formalization or closure.
- **Alias capture.** Letting `EncodingBasis` or a similar local alias erase the factor bundle.
### Consequences

The benefit is cleaner comparison across schools, substrates, and publication forms. The trade-off is that representation talk becomes more explicit and less slogan-friendly.
### Rationale

The factor-bundle design keeps the representation basis-slot family in the declared language-state chart over `U.CharacteristicSpace` orthogonal to articulation, closure, and anchoring.
### SoTA-Echoing

This factorization fits current work on sparse distributed representations, symbolic/neuro-symbolic stacks, and interpretability practice.
### Relations

- Builds on: `A.18`, `C.2.2a`, `C.2.LS`.
- Coordinates with: `C.2.6`, `A.16.0`, `A.16`, `A.16.1`, `B.4.1`, `B.5.2.0`, `F.9.1`.
- Constrains: language-state position publication and bridge loss notes around representation shifts.
### Worked Examples and Factor Interaction Notes

#### Distributed but explicit

A model-side summary may be representation-wise distributed and still highly explicit once published into a stable symbolic wrapper. This case matters because it blocks the folk myth that distributed implies vague.
#### Symbolic but still weakly articulated

A glossary-like note may be fully symbolic while still low in `AE` because the semantic anchors are not yet stabilized. This blocks the opposite myth: symbolic therefore explicit.
#### Mixed-stack publication

An operator-facing publication face may combine sparse alert codes, symbolic procedure text, and distributed back-end model summaries. The representation-factor bundle should make that mixture visible instead of compressing it into one label.
### Authoring and Review Guidance

#### Author prompt

To publish a representation-factor bundle, ask separately:

- how local or distributed is the representation?
- how sparse or dense is it?
- how symbolic or subsymbolic is it?
- which additional factor, if any, genuinely matters enough to publish?
#### Review prompt

A reviewer should reject any attempt to use one factor as if it summarized the rest. The factor bundle exists precisely to block that reduction.
#### Cross-facet reminder

Reviewers should also watch for silent replacement of `LanguageStateAnchoringMode`, `AE`, or `CD` by representation talk.
### Extension and Migration Notes

#### Local extension rule

Contexts may add extra factors, but each added factor should answer a distinct question rather than duplicating locality, sparsity, or symbolicity under another label.
#### Migration from alias-heavy prose

Aliases such as `EncodingBasis` or similar should be unfolded into explicit factor dockings before they are relied upon for routing, comparison, or bridge claims.
#### Boundary reminder

`U.LanguageStateRepresentationFactorBundle` describes representational organization only. It does not determine route authority, closure, or anchoring by itself.
### Factor-Bundle Publication Discipline

#### Minimal representation package

A publishable `U.LanguageStateRepresentationFactorBundle` should normally show the current factor settings for locality/distribution, sparsity/density, and symbolicity/subsymbolicity, together with any declared extra factor. If a factor is intentionally omitted, say so rather than hiding the omission under a compact alias.
#### No hidden scalar rule

Compact overlays such as "sparse-symbolic" are lawful only when they dock to the underlying factor bundle. No compact label may behave as a hidden master score for routing, bridge comparison, or stage/progression talk.
#### Alias docking rule

Local aliases such as `EncodingBasis` are lawful only when their docking to the owned factors is explicit and stable. If an alias compresses several factors, the compression should remain visible.
### Factor Interaction and Cross-Facet Reading Law

#### Interaction law

Representation factors may correlate, but they do not determine one another. Highly distributed cues can still be sparse; symbolic publications can still be locally dense; mixed symbolicity can coexist with either strong or weak articulation. Publish the actual factor bundle rather than narrating one factor as if it predicted the rest.
#### Cross-facet non-substitution

Representation talk must not silently replace `AE`, `CD`, or `LanguageStateAnchoringMode`. A shift from distributed to symbolic publication may change readability while leaving articulation low, closure open, or anchoring heavily operator-bound.
#### Bridge reminder

If a representation shift matters in transport across contexts, note that the shift may alter what is preserved or salient. The bridge itself remains owned by `F.9` and `F.9.1`.
### Review Matrix and Extension Tests

#### Review matrix

A reviewer should ask:

- are all claimed factors visible in the publication or cited source;
- does any alias hide the factor bundle;
- is one factor being used as if it summarized the whole representation state;
- has representation talk started to replace articulation, closure, or anchoring claims.
#### Local extension test

An additional factor is justified only if it captures a distinct representational question that cannot be reduced to locality, sparsity, or symbolicity. The extra factor should extend the bundle, not become a rival master axis.
#### Migration test for legacy terminology

Legacy vocabularies often use "symbolic", "distributed", or "encoding basis" as if one term solved the whole classification problem. A conforming migration unpacks the term into explicit factor dockings and then checks whether any cross-facet claims were smuggled into the old label.
#### Bundle-comparison reminder

Representation bundles may be compared across contexts only after the compared factors are explicit. If one context uses a compact local alias and another publishes the full factor bundle, require explicit docking before treating the two descriptions as commensurable.
### C.2.7:End
## Kinds, Intent/Extent, and Typed Reasoning (Kind‑CAL)

> **One‑line summary.** Establishes **`U.Kind`** as the **minimal, context‑local intensional carrier** of “what a statement is about,” separates **intent** (KindSignature + its own **F**) from **extent** (*which* instances belong to the kind **in a given Context slice**), and situates **typed reasoning** alongside **USM Scope (G)** and **F–G–R** without conflation. Details of the core objects and operations live in **C.3.1–C.3.5**; guard shapes are standardized in **C.3.A**.

**Status.** Normative in **Part C**. Identifier **C.3**. This pattern lays the **architectural invariant** and manager‑level guidance. The **mechanics** are defined by its child patterns.

**Readers.** Engineering managers, architects, and assurance leads who must reason about *typed claims* across Contexts without mixing up **describedEntity** (Kinds), **applicability** (**G**), and **assurance** (**R**).

**Depends on.**
— **A.2.6 USM** (Context slices & Scopes): **`U.ClaimScope` = G**, **`U.WorkScope`**, ∈/∩/**SpanUnion**/translate, **Γ\_time** policy, Bridges + **CL** (scope).
— **C.2.2 F–G–R**: weakest‑link composition; penalties to **R** for Cross‑context congruence (CL).
— **C.2.3 Unified Formality F**: F0…F9 as an **ordinal Characteristic** (expression rigor).

**Sub‑patterns (normative unless noted).**
— **C.3.1** - `U.Kind` & `U.SubkindOf` (partial order).
— **C.3.2** - `KindSignature` (**intent**, with **F**) & `Extension/MemberOf` (**extent** in a slice).
— **C.3.3** - **KindBridge** & **`CL^k`** (type‑congruence; penalties route to **R**).
— **C.3.4** - **RoleMask** (context‑local adaptation without cloning kinds).
— **C.3.5** - **KindAT** (K0…K3, **informative facet**, not a Characteristic).
— **C.3.A** - **Typed Guard Macros** (annex): admit/compose, masks, Cross‑context reuse; AT is **forbidden** in guards.

**Deprecations.**
— “**Generality ladder**” for **G**; **G is Scope** only (set‑valued over `U.ContextSlice`).
— Any “**Kind scope**” characteristic (Kinds carry **intent/extent**, not Scope).
— **Mark as legacy** any uses of **‘validity’ as a Characteristic** or **‘operation’ as a Scope‑like Characteristic**; **redirect** to **`U.ClaimScope`** / **`U.WorkScope`** (A.2.6) for applicability. Editors SHOULD add glossary redirects in Part E.

**Editorial note (cut‑over).** Content formerly in C.3 that defined guard shapes, decision trees, and macro anti‑patterns now resides in **C.3.A**. Membership **evaluation obligations** live in **C.3.2** with `MemberOf`.

### Purpose & Rationale

**What you get.**

1. A **neutral typed layer**: name *what* a claim quantifies over (**Kinds**) without binding to any particular “type technology” (OWL, PL types, shapes…).
2. A clean **split of characteristics**:
   – **Scope (G)** = *where* a claim holds (USM, set‑valued over **Context slices**).
   – **Kind extent** = *which instances* belong to a kind **inside** a given slice.
   – **F** = *how strictly* content is expressed (C.2.3).
   – **R** = *how well supported* (evidence & congruence penalties).
3. **Typed reuse across Contexts**: a dedicated **KindBridge** with **`CL^k`** (type‑congruence), so you can predict risk **without** touching F or G.
4. **Manager‑oriented maps**: when to invest in **formalization** (F), when to expand/narrow **Scope** (ΔG), when to test across **subkinds** (R), and what kind of **bridge** you should expect.

**Why it helps.**
Teams routinely overspend on proofs for **instance‑level** questions and underspecify scope for **class‑level** claims. By naming the **Kind**, you plan **ΔF/ΔR** correctly and keep **G honest**. Typed checks also block unsafe compositions (“we were talking about different things”).
### Context

Cross‑disciplinary work mixes artifacts that *look like “types”* but behave differently: ontology classes, schema “shapes,” programming types, BORO super/sub categories, ad‑hoc labels. At the same time, **USM** made “scope” precise. What was missing was a *small, neutral* notion of **describedEntity** that (a) **does not** re‑invent a global “type system,” (b) composes with USM and F–G–R, and (c) lets Contexts keep their idioms—**with bridges** when crossing boundaries.
### Problem

1. **Scope–type conflation.** Authors try to widen **G** by “abstracting the wording,” yielding claims that *sound* general but are only supported on a thin slice.
2. **Silent drift across Contexts.** A “vehicle” here is not the same as a “transport unit” there; reuse proceeds without a declared mapping or risk accounting.
3. **Wasteful planning.** Without a signal about the *kind‑level*, teams either over‑formalize single‑slice decisions or under‑test class‑level claims (no variant coverage along subkinds).
4. **Unsafe composition.** Claims about incompatible “things” get composed because the describedEntity was implicit in prose.
### Forces

| Force                             | Tension to resolve                                                                                 |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Local freedom vs global sense** | Contexts need their own vocabularies; Cross‑context work needs a common skeleton for **describedEntity**.      |
| **Minimality vs utility**         | The notion of kind must be tiny yet powerful enough to guide ΔF/ΔR/bridges/composition.            |
| **Intent vs extent**              | Kinds come with a **definition** and a **population in place**; both are needed and must not mix.  |
| **Typed discipline vs F–G–R**     | Typed safety must not distort **G** (Scope) nor introduce a parallel “assurance math.”             |
| **Abstraction vs applicability**  | “Higher abstraction” is **not** “wider applicability”; the framework must make this split obvious. |
### Solution — Architectural Decisions (overview)

**C.3‑D1 — `U.Kind` is intensional and context‑local.**
Kinds name *what a claim quantifies over*. They form a partial order **`⊑`** (**SubkindOf**). *(See C.3.1.)*

**C.3‑D2 — Separate **intent** and **extent**.**
— **KindSignature(k)**: the intensional content (predicates/invariants/Standards). It carries its **own F** (C.2.3).
— **Extension(k, slice)**/**MemberOf**: which instances belong to `k` **in a given `U.ContextSlice`**. *(See C.3.2.)*

**C.3‑D3 — Kinds do **not** carry Scope.**
**Scope** lives with **claims/capabilities** (USM): a set of **Context slices** where the statement holds. Kinds carry **intent/extent** only. *(USM A.2.6 + C.3.2.)*

**C.3‑D4 — Typed reuse across Contexts is explicit.**
Use a **KindBridge** with **`CL^k`** (type‑congruence) and loss notes. Its effect is **only via R** penalties; **F/G remain unchanged**. *(See C.3.3.)*

**C.3‑D5 — Local adaptation without cloning.**
Use a **RoleMask** to bind a kind to Context‑specific constraints/aliases; promote to a **subkind** if the mask becomes stable and widely reused. *(See C.3.4.)*

**C.3‑D6 — An **informative** “abstraction tier” exists for Kinds (AT: K0…K3).**
A facet (not a Characteristic) that helps plan **ΔF/ΔR** and forecast bridge style; **AT never appears in guards**. *(See C.3.5.)*

**C.3‑D7 — Guard shapes are standardized and fail‑closed.**
Typed compatibility first (same‑Context **`⊑`** or **KindBridge**), then **Scope coverage** (USM), then **R** penalties and freshness. *(See C.3.A.)*

> **Manager’s picture — Two characteristics (keep them separate).**
> – **characteristic 1 (USM, G):** *Where* the claim holds → set of **Context slices**; composed by ∈ (membership) / ∩ (intersection) / **SpanUnion** (union across independent lines) / translate (scope mapping).
> – **characteristic 2 (Kind extent):** *Which instances* in a **given slice** belong to the kind → `MemberOf(e, k, slice)`.
> **Never “widen G” by abstract wording; widen only by ΔG with support.**
### Core Concepts (informative summary; authoritative norms live in C.3.1–C.3.5)

> This section fixes the **Standard** of terms used in C.3 and points to the sub‑patterns for complete mechanics. All “**SHALL/MUST**” statements here are normative.

**Editorial note.** This section is **informative**. It restates manager‑level takeaways and **points to** the canonical, normative rules in **C.3.1–C.3.5**. Where this section summarizes a rule, treat the cited sub‑pattern (and rule ID) as the **source of truth**.

#### U.Kind & U.SubkindOf (⊑)

**Definition.** `U.Kind` is a **context‑local intensional object** naming a “kind of thing” that claims may quantify over.
**Order.** `U.SubkindOf (⊑)` is a **partial order** (reflexive, transitive, antisymmetric). We write `k₁ ⊑ k₂`.

**Summary of norms** *(authoritative text: **C.3.1 K‑01–K‑02**)*.
— Contexts treat `⊑` as a partial order and document any computed meets/joins if they provide them.
— Kinds do not carry Scope; Scope remains on claims/capabilities (USM).

> *Full treatment:* **C.3.1** (definitions, invariants, examples).
#### KindSignature (intent) & F

**Definition.** `KindSignature(k)` is the **intent**: predicates/invariants/Standards that define the kind in the Context. Its expression rigor has an explicit **`U.Formality`** (C.2.3).

**Summary of norms** *(authoritative text: **C.3.2 K‑03–K‑04**)*.
— `KindSignature(k)` declares its F (C.2.3). Claim‑level F does **not** auto‑inherit; weakest‑link applies on the claim’s own support paths.
— If a signature change alters membership, treat it as a content change (Contexts may version kinds).

> *Full treatment:* **C.3.2** (signature/intent with F; relation to claims).
#### Extension & MemberOf (extent in a slice)

**Definition.** `Extension(k, slice) ⊆ EntitySet(slice)` = set of instances that belong to `k` **in the given `U.ContextSlice`**. `MemberOf(e, k, slice)` is the membership predicate: `e ∈ Extension(k, slice)`.

**Summary of norms** *(authoritative text: **C.3.2 K‑05–K‑08**)*.
— Membership is deterministic for a fixed `(k, slice)` (no hidden “latest”).
— If `k₁ ⊑ k₂`, then `Extension(k₁,slice) ⊆ Extension(k₂,slice)` for all slices.
— Definedness may be bounded; outside it, guards fail closed.
— Keep **Scope (G)** and **MemberOf** as distinct guard predicates.

> *Full treatment:* **C.3.2** (extent semantics, examples, authoring hints).
#### KindBridge & CL^k (type‑congruence)

**Summary of norms** *(authoritative text: **C.3.3 KB‑01–KB‑12**)*.
— A KindBridge states Contexts/versions, kind mapping/rules, preserved order links, **`CL^k`** anchors, loss notes, and definedness.
— No inversions of preserved subkind links; collapses must be declared.
— When classification depends on a KindBridge, apply a monotone penalty **Ψ(`CL^k`)** to **R** (scope‑bridge **Φ(CL)** applies separately). **F** and **G** remain unchanged.
— Chaining uses weakest‑link on **`CL^k`**.

> *Full treatment:* **C.3.3** (bridge shape, anchors, examples).
#### RoleMask (adaptation without cloning)

**Definition.** `U.RoleMask(kind, Context)` is a **named binding** that carries constraints (optional **narrowing** of membership), vocabulary/notation aliases, and intended use for local procedures—**without** creating a new Kind.

**Summary of norms** *(authoritative text: **C.3.4 RM‑01–RM‑08**)*.
— Masks are registered/versioned; constraints are observable/deterministic at guard time.
— Do not treat masks as kind synonyms; promote frequently reused constraint masks to explicit subkinds (`⊑`).


> *Full treatment:* **C.3.4** (mask taxonomy, guard discipline, promotion rule).
#### KindAT (K0…K3) — informative facet

**Status.** A **facet** attached to `U.Kind`, not a Characteristic: no algebra, **never** used in guards or composition.

**Anchors (intentional view).**
**K0** Instance; **K1** Behavioral pattern; **K2** Formal kind/class; **K3** Up‑to‑Iso.

**Use.** Helps plan **ΔF/ΔR** and forecast bridge style (e.g., K3↔K3 suggests up‑to‑iso mapping). Do **not** conflate AT with **G** or **R**.

> *Full treatment:* **C.3.5** (manager heuristics, anti‑misuse).
#### Quick examples (two‑characteristic awareness)

**E‑Sketch 1 — Policy over `Vehicle`.**
Claim: “For all `x ∈ Vehicle`: brakeDistance(x) ≤ 50 m (dry), ≤ 40 m (wet).”
– **describedEntity:** `Vehicle` (Kind, typically K2) — *what* we quantify over.
– **Scope (G):** `{surface∈{dry,wet}, speed≤50, rig=v3, Γ_time=rolling 180d}` — *where* the claim holds.
– **Extent in slice:** which instances the lab currently classifies as `Vehicle` (via `MemberOf`).
Typed checks happen **before** Scope intersection; **G** is not widened by “abstract wording.”

**E‑Sketch 2 — API rule over `AuthenticatedRequest`.**
Producer A emits `Request`; consumer B expects `AuthenticatedRequest`.
– If `Request ⊑ AuthenticatedRequest` **does not** hold, add an **adapter** or adopt a **subkind**; do **not** force fit by widening **G**.
– Scope remains independent (API version, Γ\_time policy); evidence/freshness sits in **R**.
### How to use typed reasoning
### C.3:7.1 How typed reasoning plugs into F–G–R & USM

#### The basic shape of a typed claim (manager view)

A typed claim has two independent parts:

1. **describedEntity (Kind).** *Which things the statement talks about.*
   “For every item of kind **k** in the **target context** (the selected **TargetSlice**) …”.
   — The **definition** of kind **k** lives in **KindSignature(k)** (with its **F**, C.3.2).
   — **Which items count as “k”** is evaluated in the **TargetSlice** (C.3.2) by a deterministic membership check.

2. **Applicability (Scope, G).** *Where the statement holds.*
   `U.ClaimScope(Claim)` is the **collection of contexts** where the claim is valid (USM A.2.6). Guards test: “Scope **covers** the TargetSlice”.

**Discipline.** The guard first checks **typed compatibility** (in the same Context: “is‑a / subkind‑of”; across Contexts: a **KindBridge**, C.3.3), then **Scope coverage** (USM), then **R** freshness and any bridge congruence penalties. See **C.3.A Guard\_TypedClaim**.
#### Composition of typed claims

**Rule C‑T‑1 (typed pre‑check).** To compose a **producer claim** with a **consumer claim**, where the producer quantifies over kind **k (source)** and the consumer expects kind **k (expected)**:

* **same Context:** require **“is‑a / subkind‑of”** to hold (the source kind is a subkind of the expected kind) (C.3.1).
* **Cross‑context:** require a **KindBridge** that maps the source kind to a **local kind that is a subkind of the expected kind** in the target Context (C.3.3). If neither holds, the composition is **unsafe**; introduce a subkind, add an adapter (or a RoleMask), or decline.

* **Role‑aware option (same Context):** if the consumer expects a **RoleMask** over the expected kind, you may satisfy the mask’s explicit constraints (C.3.4) instead of changing kinds, provided those constraints are observable at gate time.

**Rule C‑T‑2 (scope after type).** After typed compatibility is satisfied, compute Scope as in USM:

* **Serial path:** take the **intersection** of the contributors’ claim scopes.
* **Parallel independent lines:** use **SpanUnion** of the serial scopes (only if independence is justified).

**Rule C‑T‑3 (no type‑by‑scope).** A kind mismatch **MUST NOT** be “fixed” by widening **G**. Changes in describedEntity require **subkind introduction**, **signature edits**, or a **KindBridge**—not a scope change.

**Manager hint.** First confirm the **port shape** matches (kinds line up), then check the **operating area** (scope), and finally look at **confidence** (evidence freshness plus any bridge congruence penalties).
#### F–G–R with typed claims (what changes, what doesn’t)

* **F (Formality).**
  – **Claim‑level F** follows C.2.3 (weakest‑link along the claim’s support paths).
  – **KindSignature F** is declared **on the kind** (C.3.2) and influences claims **only** if the claim essentially depends on those predicates (weakest‑link again).
  – **Raising F** can *reveal* hidden assumptions (which may trigger ΔG in the claim), but **does not change G** by itself.

* **G (Scope).**
  – Always **set‑valued over Context slices** (USM A.2.6).
  – Typed reasoning does not alter G’s algebra (∈/∩/SpanUnion/translate).
  – Never infer Scope from “how general the wording sounds.”

* **R (Reliability).**
  – Evidence freshness/decay (validation windows) remains separate from Scope coverage.
  – **Cross‑context penalties** split cleanly: a **scope‑bridge penalty** (USM) and a **kind‑bridge penalty** (C.3.3). Both **reduce R only**; neither changes **F** or **G**.

**Manager rule of thumb.**
Start with the reliability from your support; then **apply the scope‑bridge penalty**; then **apply the kind‑bridge penalty**. Each step can only reduce reliability.  
You never add or average **F/G**: you **compose scope** per USM rules and apply **weakest‑link** for F/R along support paths.
#### ESG gating with typed claims

* **Gate on F**, if your Context requires rigor before use (e.g., `U.Formality(Claim) ≥ F4`).
* **Gate on Scope coverage** (USM) and an explicit **time selector** (Γ_time) policy.
* **Gate on R freshness** and **minimum congruence** for bridges (e.g., `CL ≥ 2`, `CL^k ≥ 2`).
* **Do not** gate on **AT** (C.3.5); it is an informative facet only.
* Use **C.3.A guard macros** to keep guards short and auditable.
#### How typed reasoning plugs into the CAL chain (Lang‑CHR → Role‑CAL)

> **Intent.** Show a clear, end‑to‑end path a manager can follow to take a typed claim from words to safe reuse across Contexts—without any tool or data‑governance assumptions. Each stage says **what it supplies**, **what it needs**, and **what it hands off** to the next stage.

##### Lang‑CHR — stable words first

**What it supplies.** A disciplined vocabulary and controlled phrasing so that terms like *Vehicle*, *AuthenticatedRequest*, *AdultPatient* have **one meaning** in the Context.

**What it requires.** Authors use controlled narrative (C.2.3 **F3**) at minimum: single‑meaning terms, explicit “shall / if / then”, and no drifting synonyms.

**Hand‑off.** A small, curated lexicon entry for each candidate *Kind‑word*; these become **`U.Kind` names** in the next step.

> *Manager hint.* If two teams cannot agree on the noun, you are not ready to type the claim. Resolve the noun in Lang‑CHR before introducing a Kind.
##### Kind‑CAL (this Part) — name the describedEntity

**What it supplies.**
• **`U.Kind`** objects for those nouns; a partial order **`⊑`** (subkind‑of).
• **KindSignature(k)** (intent), with declared **F**.
• **Extension(k, slice)** and **`MemberOf(e,k,slice)`** (extent).
• (Optional) **AT (K0…K3)** as an **informative facet**.

**What it requires.**
• Deterministic membership (no “latest” defaults) and a clear rule for where membership is defined in each context.
• No “Kind scope”: Scope remains with claims/capabilities (USM).

> *Manager hint.* Use the kind’s **AT tag** only as a planning signal (where to invest rigor and tests). AT never gates decisions and never widens scope.

**Hand‑off.** Typed quantifier sites for claims: “∀ x ∈ **Extension(k, slice)** …”, plus a visible **`⊑`** lattice for compatibility checks down the line. Typed claim sites written in Plain language: “for every item of kind **k** in the **target context** …”, plus a visible **subkind‑of** lattice for compatibility checks down the line.

> *Manager hint.* Decide early whether your Kind is K0 (instance‑ish) or K2 (formal class). It sets your **ΔF/ΔR** budget expectations.
##### Structure‑CAL — give Kinds usable shape

**What it supplies.** Structural building blocks **on Kinds**:
• **combinations** (“and”),
• **alternatives** (“either/or”),
• **records** (named fields),
• **functions** (inputs to outputs),
plus relations like **has‑attribute** and **part‑kind**, and the minimal invariants those structures must respect.

**What it requires.**
• Do not hide Scope inside structure.
• Put structural rules into the **KindSignature** as checkable statements (ideally **F4+**).

**Hand‑off.** Typed *ports and shapes* of claims/specifications (“this policy expects `PassengerCar × ControllerConfig`”), making compatibility checks crisp before any Scope math.

> *Manager hint.* If two claims expect different shapes (for example, one needs “Vehicle with ABS”, the other just “Vehicle”), plan a **subkind** or an **adapter**. Do not “solve” it by rewording the claim.

**Note (informative).** If a Context declares structural constructors on kinds (e.g., product/sum/record/function), editors SHOULD document the corresponding **Extension** inclusion laws for those constructors. Keep Scope in USM; do not hide it in structure.
##### Compose‑CAL — compose with typed pre‑checks

**What it supplies.** The **order of checks** you must follow for safe composition:

1. **Typed compatibility**: in the same Context, the producer’s kind **is a subkind of** the consumer’s kind; across Contexts, a **KindBridge** maps the producer’s kind to a local kind that fits, with an acceptable **kind‑bridge congruence level** (C.3.3).
2. **Scope checks** (USM): along dependency paths, take the **intersection** of scopes; use **SpanUnion** only when support lines are truly independent.
3. **Assurance wiring**: apply the **scope‑bridge penalty** and the **kind‑bridge penalty** to **R**; check evidence freshness separately.

**What it requires.** Independence justification for **SpanUnion**; no “type‑by‑scope” fixes.

**Hand‑off.** A typed, scope‑checked composition that survives audit because each risk is accounted for in **R**.

> *Manager hint.* Run the **typed pre‑check** first. It is the cheapest failure to catch and prevents “scope gymnastics” that mask a type mismatch.
##### CT2R‑LOG — speak the logic, keep the math honest

**What it supplies.**
• A clear logical reading of your typed claim: “for every item of kind **K**, condition **φ** holds” (or “there exists an item …”).
• Rules for refinement and substitution that respect the **subkind‑of** relation.
• When appropriate (K3), reasoning that treats structures as **equivalent up to isomorphism** (useful where exact identity is the wrong notion).

**What it requires.**
• Pick a logic that matches the **Formality** you declare (e.g., machine‑checked logic for higher **F**).
• When the logic travels across Contexts, use a **KindBridge** to keep meaning aligned; any mismatch is reflected as a **kind‑bridge penalty** in **R**.

**Hand‑off.** Proof obligations or reasoning templates that are consistent with your Kind/Structure setup and do not alter **G**.  **Shall‑note CT2R‑1.** Transferring typed formulas that depend on `MemberOf` across Contexts **uses a KindBridge**; any mismatch is accounted as **Ψ(`CL^k`)** in **R**. **F** and **G** remain unchanged. For **up‑to‑iso** situations, see **C.3.5 (AT)** for when K3 is appropriate.

> *Manager hint.* If your proof keeps failing when you move between Contexts, add a **bridge at the Kind level**; do not try to “fix” it by changing scope.
##### Role‑CAL — adapt without cloning

**What it supplies.** **RoleMask(kind, Context)**: a named, registered adaptation (extra constraints or local aliases, with optional narrowing) that reuses the **same** kind instead of creating a new one.

**What it requires.**
• Constraints must be testable at gate time and give deterministic answers.
• If a constraint mask is reused often, **promote it to a subkind**.

**Hand‑off.** Context‑specific views that keep identity intact and make typed guards practical (“use `PaymentAccount@PCI` mask in these steps”).

> *Manager hint.* If the same mask appears in several guards, **promote** it to a subkind. This reduces future bridge and audit effort.
##### Mini end‑to‑end example (manager‑oriented)

> **Scenario.** A risk gate for API requests must be reused by another program across Contexts.

**Lang‑CHR.** Settle on *Request*, *AuthenticatedRequest*, *RiskScore*, *BudgetSlack*; write them in controlled phrases (F3).

**Kind‑CAL.**
• Define `Kind Request` (K2) and a **subkind** `AuthenticatedRequest ⊑ Request`;  publish a **KindBridge** for the PCI taxonomy with **kind‑bridge congruence level 2** (loss note: token class is collapsed).
• Membership `MemberOf(e, AuthenticatedRequest, slice)` is deterministic under API v2.3 and Γ\_time policy.

**Structure‑CAL.**
• `AuthenticatedRequest` is a **record kind** with fields (headers, tokenProof, body); invariants relate tokenProof to headers.

**Compose‑CAL.**
• Policy P says in Plain terms: “for every **AuthenticatedRequest** in the **target context**, deny the call when **riskScore** is at or above the set **risk threshold** and **budgetSlack** is at or below the set **budget limit**.”
• Another service S expects `PCIRequest`. Typed pre‑check: does `AuthenticatedRequest ⊑ PCIRequest`? No.
• Remedy: adapter A proves `AuthenticatedRequest → PCIRequest` in this Context; if reusing across Contexts, publish a **KindBridge** for the PCI taxonomy with **`CL^k=2`** (loss: token class collapsed).

**CT2R‑LOG.**
• State P in a state P in a proof‑checked logic (where appropriate for F7+), so that changes to token rules break proofs. Proofs rely on the **AuthenticatedRequest** definition, not on the consumer’s scope.

**Role‑CAL.**
• Register a **RoleMask** over `PCIRequest` for the consuming team; guards must be able to test the mask’s constraints at gate time.

**Outcome.**
• **Typed guard** approves only when: (i) the type pre‑check passes (same‑Context subkind‑of or a KindBridge with an acceptable congruence level), (ii) **Scope** covers the target context (API v2.3, explicit time selector), and (iii) **R** reflects the **scope‑bridge** and **kind‑bridge** penalties and evidence is fresh.
• No one widened Scope to hide a type mismatch; the adapter + bridge made the semantics explicit and auditable.


> **Takeaway.** If you keep these six hand‑offs in view—words → kinds → structure → composition → logic → roles—you get **predictable reviews**, **clean risk accounting**, and **reusable claims** that travel across Contexts without silent meaning drift.
#### Compliance & Regulatory Alignment — profile

Treat regulatory categories as **Kinds**, carry their **intent** in `KindSignature` with declared **F**, move them across Contexts with a **KindBridge** (type‑congruence **`CL^k`** + loss notes), and express applicability as **Claim scope** over `U.ContextSlice` (with explicit **Γ_time**). Any Cross‑context uncertainty is routed to **R** via **Ψ(`CL^k`)** (kind) and **Φ(CL)** (scope); **F** and **G** remain unchanged.

> **Authoritative obligations and guard macros** (C‑REG‑1…8, Guard_RegAdopt / Guard_RegChange / Guard_RegXContextUse) and worked scenarios live in **C.3.A, Annex A (Regulatory adoption profile)**.
#### How typed reasoning plugs into Assurance Lanes (VA/LA/TA) & Evidence design

**Intent (manager’s view).** Typed reasoning turns “prove/test/qualify” into a **repeatable plan** by making *what the rule talks about* explicit (named **Kinds**, their **subkinds**, optional **RoleMasks**) and keeping **Scope (G)** over `U.ContextSlice` separate from **membership** inside the slice. Cross‑context uncertainty (Scope Bridge **CL**, KindBridge **`CL^k`**) always routes to **R** as penalties **Φ/Ψ**; it never changes **F** or **G**.

**Evidence matrix (sketch).**

| Row set                       | Column set                                                   | Cell content                                                                                                           |
| ----------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| **Kinds** (subkinds or masks) | **Context slices** (Standard versions, env ranges, `Γ_time`) | **Evidence unit** (proof fragment, test batch, monitoring window), with **Scope** and **MemberOf** predicates attached |

*Tip.* For formal kinds and “up‑to‑iso” kinds (AT K2/K3), expect **more rows** (variants). For instance‑like kinds (AT K0), expect **fewer rows** and **tighter columns** (narrow slices, stricter freshness).

> **Authoritative evidence obligations and guard macros** (planning/attachment, VA/LA/TA duties, anti‑patterns) are in **C.3.A, Annex B**.
#### How typed reasoning plugs into ESG and Method–Work gating

> Intent. Make state changes and work admissions deterministic, auditable, and safe by separating (1) **typed compatibility** (what the statement or capability is about) from (2) **scope coverage** (where it holds or can run). Any Cross‑context uncertainty is routed to **R** (reliability) only—never to **F** (form) or **G** (scope).

##### Scope & fit

This subsection defines **normative guard obligations** for:

* **ESG** (Episteme State Graph) transitions whose assertions **quantify over kinds**, and
* **Method–Work** admissions where a **capability** expects inputs/outputs of specified kinds.

It reuses:

* **USM** (A.2.6): `U.ClaimScope` (G) and `U.WorkScope` coverage + `Γ_time`,
* **Kind‑CAL core** (C.3.1–C.3.2): `U.Kind`, `MemberOf(e,k,slice)`, `⊑`,
* **KindBridge** (C.3.3) with **`CL^k`** and loss notes,
* **Scope Bridge** (Part B) with **CL** and loss notes,
* **RoleMask** (C.3.4) when local adaptations of a kind are used,
* **Formality F** (C.2.3) when transitions gate on rigor,
* **Assurance R** (C.2.2) for evidence freshness and penalties Φ/Ψ.

**Guard macros.** The **normative guard shapes** for ESG and Method–Work (**Guard_TypedClaim**, **Guard_TypedJoin**, **Guard_MaskedUse**, **Guard_XContext_Typed**) are specified in **Annex C.3.A**. Use those shapes; the present section is a manager‑level overview only.
##### Inputs & roles (at guard time)

* **TargetSlice** — the specific context you are deciding for: Context, versioned Standards, environment parameters, and an explicit **time selector (Γ_time)**.
* **Typed carriers**

  * **ESG:** the **Claim** quantifies over one or more **Kinds** (e.g., “for all vehicles in the target context …”).
  * **Method–Work:** the **Capability** declares expected input/output kinds (and possibly RoleMasks).
* **Thresholds** (context‑local policy):

  * Minimum **F** level for the Claim (if the Context gates on rigor),
  * Minimum **congruence** for **scope bridges**,
  * Minimum **type‑congruence** for **KindBridges**,
  * Evidence **freshness windows** (R‑lane).
* **Evidence bundle** (if the transition implies trust): references, dates, windows.
##### Manager’s 7‑step checklist (operational)

1. **Name the slice.** Write the full `TargetSlice`/`JobSlice` tuple including **`Γ_time`**.
2. **Check coverage.** Claim/Work scope **covers** the slice (USM).
3. **Check typed definedness.** A deterministic membership check is available in this context for every kind you use (and any masks are registered).
4. **Check typed compatibility.** same Context: `⊑` (or mask constraints met). Cross‑context: **KindBridge** with **`CL^k ≥ c`**.
5. **Bridge scope if needed.** Scope Bridge with **CL ≥ c** for Cross‑context scope.
6. **Apply penalties to R.** Apply the **scope‑bridge penalty** and the **kind‑bridge penalty**; then check evidence **freshness** windows.
7. **(If gated) Check F.** Enforce `Formality ≥ F_k` for the transition.

> **Remember:** **F** and **G** never change because of bridges; only **R** is penalized. AT (K0…K3) is informative and **not** used in guards.
##### Cross‑references

* **USM / A.2.6:** Scope coverage, `Γ_time`, serial **∩**, **SpanUnion**, Bridge+CL.
* **Kind‑CAL / C.3.1–C.3.4:** `U.Kind`, `⊑`, `MemberOf`, RoleMask, KindBridge + **`CL^k`**.
* **Formality / C.2.3:** `U.Formality` thresholds (when ESG gates on rigor).
* **Assurance / C.2.2:** Freshness windows; **Φ(CL)** and **Ψ(`CL^k`)** penalties to **R** (weakest‑link on paths).

This subsection is **normative** for guards in ESG and Method–Work that **use kinds**.
### Cross‑context typed reuse & assurance accounting

#### The two‑bridge rule (mandatory)

When any part of the use crosses Contexts:

1. **Scope Bridge** (USM/Part B) with **CL** → penalty **Φ(CL)** to **R**.
2. **KindBridge** (C.3.3) with **`CL^k`** → penalty **Ψ(`CL^k`)** to **R**.

Both bridges carry **loss notes**; neither changes **F** or **G**. See **C.3.A Guard\_XContext\_Typed**.
#### Narrowing after mapping (best practice)

If a bridge’s loss notes indicate material mismatch (dropped invariants, collapsed subkinds):

* **Narrow the mapped Scope** to areas where those losses are benign.
* **Or** introduce an **adapter** (plus evidence) that restores the needed properties in the target Context.
* Document the decision; the penalties still land in **R**.
#### Typical Cross‑context patterns (manager’s catalog)

* **Name‑level overlap only (low `CL^k`).**
  Expect significant Ψ penalty. Limit quantification, add local checks, or refuse reuse until the kind mapping is improved.

* **Up‑to‑iso mapping (high `CL^k`).**
  Often seen for K3 kinds. Ψ penalty is small; treat as “shape‑preserving” transfer. Still apply the appropriate **Φ(CL)** for Scope.

* **Mask‑to‑subkind evolution.**
  If receivers repeatedly use the same **RoleMask** to make a transfer safe, promote it to an explicit **subkind** and update the bridge to preserve that link.
#### Decision pattern (fast path)

1. **Typed pre‑check:** `k_A ⊑ k_B` (same Context) **or** `KindBridge(k_A → k′_B)` with acceptable **`CL^k`**.
2. **Scope coverage:** `translate(Scope_A)` covers `TargetSlice_B`.
3. **Apply penalties:** **Φ(CL\_scope)** and **Ψ(`CL^k`)** to **R**.
4. **Freshness:** windows/decay for all bound evidence.
5. **Publish:** a short “Bridge and Loss Notes” box; include any **narrowing** or **adapters** used.
### Authoring guidance (engineers‑managers)

#### When to mint a U.Kind

Create a Kind when:

* multiple claims refer to the **same “describedEntity”** using unstable labels;
* you need **subkinds** (refinement) or repeated **RoleMasks**;
* different Contexts must **map** this “describedEntity” via bridges;
* you need to **quantify** over a population (and plan variant coverage) instead of over a single exemplar.

Avoid creating a Kind for **one‑off** instance references—prefer a clear **K0** facet or just a literal exemplar in the claim.
#### Writing a KindSignature (and picking F)

* Start with a concise **intent**: the invariants/constraints that make membership meaningful.
* Aim for **F4** (predicate‑like) if the kind is intended for reuse; rise to **F7+** only where proof‑grade is justified.
* Use **observable** terms (no “latest”); if a Standard matters, **name its version**.
* If defining a Kind reveals systematic **narrowings** in use, introduce explicit **subkinds** (`⊑`) rather than accumulating opaque masks.

> **Example (sketch).**
> `Kind Vehicle` — intent: “has VIN; has brake system; has propulsion {ICE, EV, Hybrid}; …” (F4 predicates).
> Subkind: `PassengerCar ⊑ Vehicle`.
> RoleMask: `Vehicle@ABSRequired` for processes that demand ABS (deterministic constraints; candidates for promotion to subkind if widely reused).
#### Setting the AT facet (K0…K3)

Use **AT** to **aim effort**, not to gate:

* **K0**: instance/cohort — focus **R** on the TargetSlice; don’t over‑formalize.
* **K1**: behavioral pattern — clarify Standards; plan ΔF (F3→F4).
* **K2**: formal class — invest in F4–F7; plan **variant coverage** across subkinds in **R**.
* **K3**: up‑to‑iso — expect high‑quality bridges; consider F7–F9 for critical invariants.

Never treat **AT** as “wider/narrower” **G**.
#### Writing a typed claim (with USM blocks)

**Skeleton.**

* **Kinds used:** `Vehicle` (K2), subkinds `PassengerCar`.
* **Claim scope (G):** `surface∈{dry,wet}; speed≤50; rig=v3; Γ_time=rolling 180d`.
* **Statement:** `∀ x ∈ Extension(Vehicle, TargetSlice) …`
* **Guards:** use **C.3.A Guard\_TypedClaim**; if Cross‑context, add **Guard\_XContext\_Typed** (two‑bridge rule).

**Tip.** Keep **Scope**, **MemberOf definedness**, **F thresholds**, and **freshness** as **separate** guard predicates—the auditor should be able to tick each box independently.
#### Minimal “Kind card” contents (Context catalog)

* **Name** and **intent summary** (KindSignature snippet + **F**).
* **`⊑` links** (parents/children).
* **Examples of `MemberOf@slice`** (what membership looks like in practice).
* **Known RoleMasks** (type, constraints, determinism).
* **Known KindBridges** (source/target Contexts, **`CL^k`**, loss notes, definedness).
* *(Optional)* **AT** facet with one‑line rationale.
### 10 - Review & integration guidance

#### Reviewer’s 8‑point checklist

1. **Named describedEntity.** Does the claim state **what** it quantifies over (`U.Kind`)?
2. **Scope explicit.** Is **G** declared (no “domain” placeholders, no implicit “latest”)?
3. **Typed compatibility.** For compositions, do we have `⊑` (same Context) or a **KindBridge**?
4. **RoleMasks.** If used, are they **registered**, **deterministic**, and not masquerading as kinds?
5. **Two‑bridge rule.** For Cross‑context use, do we have **both** Scope Bridge (**CL**) and **KindBridge** (**`CL^k`**)?
6. **Penalties.** Are **Φ(CL)** and **Ψ(`CL^k`)** applied to **R**, not smuggled into F/G?
7. **Freshness.** Are validation/monitoring windows separate from Scope coverage?
8. **Evidence fit.** For class‑level claims, does the test plan cover **subkinds/variants**?
#### Integrator’s composition playbook (typed first, then scope)

* **Step 1:** Check `k_A ⊑ k_B` (or KindBridge).
* **Step 2:** Compute **Scope\_serial** = `Scope(A) ∩ Scope(B)` (USM).
* **Step 3:** If parallel supports exist, **SpanUnion** them (only where independent).
* **Step 4:** Apply **Φ**/**Ψ** penalties to **R**; enforce freshness.
* **Step 5:** If a **mask** is repeatedly required, consider promoting it to a **subkind**.
#### Assurance lead: wiring penalties and windows

* Identify channels used: **Scope bridge? KindBridge?**
* Apply **Φ(CL)** and **Ψ(`CL^k`)** to **R** (monotone; higher congruence ⇒ smaller penalty).
* Verify **freshness windows** for all bound evidence (independent of bridges).
* Publish a **one‑box summary**: bridges, levels, loss notes, any narrowing/adapters, net impact on **R**.
#### Red flags (stop‑the‑line)

* “**We widened G because we reworded the type.**” → **Reject**; redo as subkind/bridge or revise Scope honestly.
* “**Mask equals kind.**” → **Refactor**; register mask properly or promote to subkind.
* “**Cross‑context without KindBridge.**” → **Block**; demand mapping and **`CL^k`**.
* “**No Γ\_time.**” → **Block**; add explicit time policy (point/window/rolling).
### Worked examples (end‑to‑end)

> *Each example shows the typed pre‑check, Scope composition, penalties to **R**, and the managerial decision. Full guard clauses for these scenarios are in **Annex C.3.A**.*

#### Cyber‑physical braking policy across labs and plants

**Claim (Lab Context).**
“∀ `x ∈ Vehicle`: brakingDistance(x) ≤ 50 m (dry), ≤ 40 m (wet).”
**Kinds.** `Vehicle` (K2, KindSignature F4); subkind `PassengerCar ⊑ Vehicle`.
**Scope (Lab).** `{surface∈{dry,wet}, speed≤50, rig=v3, Γ_time=rolling 180d}`.

**Reuse at Plant B.**
– **KindBridge:** `Vehicle ↦ TransportUnit` with **`CL^k=2`** (loss: EV subkind collapsed).
– **Scope Bridge:** `Lab → PlantB` with **CL=2** (rig bias ±2 %).
– **Narrowing:** loss notes indicate wet‑surface bias; Plant B **narrows** mapped Scope to temp/adhesion ranges with acceptable bias.

**Decision.**
Typed pre‑check: **OK** via KindBridge. Scope coverage after translate/narrow: **OK**.
Penalties: apply **Φ(2)** and **Ψ(2)** to **R**; freshness windows checked.
**Outcome:** Adopt with reduced **R**; action item: qualify rig v4 to raise CL in the future.
#### API decision rule with adapter and subkind promotion

**Consumer claim.**
“∀ `x ∈ AuthenticatedRequest`: deny if riskScore(x) ≥ θ ∧ budgetSlack ≤ β.”

**Producer reality.**
Service A emits `Request` (no auth guarantee).
**Option A:** A proves it emits `AuthenticatedRequest` (introduce subkind or strengthen Standard).
**Option B:** Insert **adapter** that filters/annotates `Request → AuthenticatedRequest`.

**Typed check.**
Before: no `Request ⊑ AuthenticatedRequest`. After **Option B**: adapter supplies the guarantee; repeated use leads to promoting **mask** to **subkind**.

**Scope.**
API v2.3; Γ\_time = rolling 30 d.
**R.**
No Cross‑context reuse; no Φ/Ψ. Evidence: adapter correctness on the TargetSlice.

**Outcome.**
Adopt via Option B; open task: generalize producer to subkind and remove adapter later.
#### Clinical dosage rule across jurisdictions (bridge + mask)

**Claim (Hospital X).**
“∀ `x ∈ AdultPatient`: dosage ≤ D per kg for drug M.”
**Kind.** `AdultPatient` (K2, F4).
**Mask.** `AdultPatient@ClinicMask` narrows to the clinic’s cohort (deterministic DOB policy).

**Reuse in Jurisdiction Y.**
– **KindBridge:** `AdultPatient ↦ AdultPerson_Y`, **`CL^k=1`** (18 vs 21 years boundary).
– **Scope Bridge:** coding systems differ (CL depends on mapping quality).
– **Narrowing:** restrict Scope to datasets where DOB granularity supports boundary reconciliation.

**Decision.**
Typed pre‑check via KindBridge: **OK**. Scope coverage after translate/narrow: **OK**.
Penalties: **Φ(CL\_scope)** and **Ψ(1)** applied to **R**.
**Outcome:** Adopt with strong **R** penalty; plan: negotiate a harmonized boundary to raise `CL^k`.
#### ML fairness constraint with typed quantification

**Claim (Product Context).**
“∀ `x ∈ EligiblePerson`: TPR difference ≤ δ across groups `G`.”

**Kind.** `EligiblePerson` transitions from **K1→K2** as attributes and cohorts are formalized (KindSignature F4).
**Scope.** `{pipeline=P, features=F, Γ_time=rolling 180 d}`.

**Cross‑context use.**
Model team Context has `Resident` with different feature basis.
– **KindBridge:** `EligiblePerson ↦ Resident` with **`CL^k=1`** (feature loss).
– **Scope Bridge:** `pipeline P → P′`, **CL=2**.

**Decision.**
Typed pre‑check **OK** via bridges; mapped Scope **covers** the subset where features align.
Apply **Φ(2)** and **Ψ(1)** to **R**; restrict groups to mapped subset; require monitoring freshness.
**Outcome:** Adopt with reduced **R** and a mitigation note; action items: improve feature mapping and raise KindSignature F.
### Anti‑patterns & how to fix them

> *Use this section as a “red flags” sheet in reviews. Each item links to a concrete remedy that preserves F–G–R & USM discipline (F/G/R separation, USM algebra, typed pre‑checks).*

| Anti‑pattern (what goes wrong)                                   | Why it’s wrong (conceptual fault)                                                               | The fix (normative/informative pointers)                                                                                                              |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **“We widened G because we reworded the type.”**                 | Confuses **describedEntity** (kind) with **applicability** (scope). Abstract wording ≠ broader scope. | Keep typed pre‑check separate (C.3.1 `⊑` or C.3.3 KindBridge). Widen **G** only via **ΔG+** with support (USM A.2.6).                                 |
| **“Kind scope” block attached to a Kind.**                       | Kinds don’t carry Scope; they carry **intent/extent**.                                          | Remove the block. Scope stays on claims/capabilities (USM). If you meant classifier definedness, state it via **K‑07** (C.3.2).                       |
| **Inferring scope from extension size.**                         | **Scope ≠ Extension**; extension is “which instances in a slice,” not “where the claim holds.”  | Keep **G** set‑valued over `U.ContextSlice` (USM). Use `MemberOf` only inside the typed quantifier.                                                   |
| **Mask used as a hidden kind (“just call it the masked kind”).** | Opaque drift; reviewers can’t see constraints.                                                  | Register a **RoleMask** (C.3.4). If reused across guards, **promote to subkind** with `⊑`.                                                            |
| **Cross‑context reuse with only one bridge.**                       | Contexts differ on two characteristics: Scope **and** Kind.                                                   | Apply the **two‑bridge rule**: Scope Bridge (**CL** → Φ) **and** KindBridge (**`CL^k`** → Ψ). Both penalties land in **R**.                           |
| **Using AT (K0…K3) as a gate/threshold.**                        | AT is an **informative facet**, not a Characteristic; gating on AT recreates a G‑ladder.        | Remove AT from guards. Use it only to **aim ΔF/ΔR** and to set **bridge expectations** (C.3.5).                                                       |
| **“Automated execution success proves the type claim.”**                            | Execution success (F5/6) is not proof (F7+); also confuses **R** with **F**.                    | If you need proof‑grade properties, raise **F** for the claim/KindSignature (C.2.3) or restrict the claim. Keep **R** as evidence freshness/coverage. |
| **Hidden “latest” in membership or scope checks.**               | Non‑deterministic evaluation; unverifiable audit trail.                                         | Declare **Γ\_time** explicitly in Scope (USM). Membership must be **deterministic** (C.3.2 K‑05/K‑07).                                                |
| **Fixing type mismatch by “unioning scopes.”**                   | G‑union cannot repair **describedEntity** mismatches.                                                 | Introduce a **subkind**, add an **adapter** (+evidence), or define a **KindBridge**.                                                                  |
| **Collapsing subkinds silently in a bridge.**                    | Reviewers don’t see lost distinctions → false confidence.                                       | Record **loss notes** on the KindBridge (C.3.3 KB‑11); consider **narrowing** mapped Scope or adding an adapter.                                      |
### Governance & conformance pull‑ups

> *Contexts adopt Kind‑CAL by meeting the **Context‑level** obligations below. They summarize, not duplicate, the formal requirements in **C.3.1–C.3.5** and **C.3.A**. Use this as an adoption checklist.*

#### Context‑level obligations (must‑haves)

1. **Kinds & order.** Maintain a Context catalog of `U.Kind` with an explicit **partial order** `⊑`.
   – Conformance: **C.3.1** (K‑01/K‑02).

2. **Kind signatures (intent).** For each Kind, publish a **KindSignature** with declared **F** (C.2.3).
   – Conformance: **C.3.2** (K‑03/K‑04).

3. **Deterministic membership.** Ensure `MemberOf(e,k,slice)` is **deterministic**; declare any definedness domain.
   – Conformance: **C.3.2** (K‑05/K‑07).

4. **Typed guards.** When a claim quantifies over kinds, guards SHALL use the **typed guard macros** (or equivalents) from **C.3.A**; **Scope coverage** and **typed checks** are separate predicates.

5. **Role masks.** If a local projection is needed, register a **RoleMask** (type: constraint/vocabulary/composite); avoid cloning kinds.
   – Conformance: **C.3.4** (RM‑01…RM‑06).

6. **Two‑bridge rule for Cross‑context use.**
   – **Scope Bridge** (Part B) with **CL** → Φ(CL) to **R**.
   – **KindBridge** (C.3.3) with **`CL^k`** → Ψ(`CL^k`) to **R**.
   – Conformance: **C.3.3** (KB‑01…KB‑10).

7. **Decision records.** For each typed state change, record: **TargetSlice tuple**, typed compatibility outcome (`⊑` or KindBridge), **Scope coverage**, applied **Φ/Ψ** penalties to **R**, and **freshness** checks.
#### ESG / Method‑Work template inserts (normative snippets)

* **Kinds used:** list `U.Kind` and any expected **subkinds** or **RoleMasks**.
* **Claim scope (G):** explicit predicates over `U.ContextSlice` inc. **Γ\_time**.
* **Typed guard lines:**
  – same Context: `k_A ⊑ k_B` *checked*.
  – Cross Context: `KindBridge(k_A → k′_B)`, `CL^k ≥ c_k` *checked*.
* **Scope bridge lines:** `Bridge(Context_A → Context_B)`, `CL ≥ c_s` *checked*.
* **Assurance lines:** `Φ(CL)`, `Ψ(CL^k)` applied to **R**; **freshness windows** hold.
#### Audits & levels of adoption (informative)

* **USM‑Typed‑Ready.** Catalog exists; `⊑` declared; guard macros installed.
* **USM‑Typed‑Guarded.** All typed claims use **C.3.A** guard shapes; **Γ\_time** explicit; two‑bridge rule enforced.
* **USM‑Typed‑Auditable.** Decision records capture **TargetSlice**, typed checks, bridges, penalties, freshness.
* **USM‑Typed‑Composed.** Compositions use typed pre‑check before Scope algebra; independence justified for **SpanUnion**.
### Migration & editorial impact

> *Apply these edits incrementally; you do not need to stop other work. The aim is to eliminate synonym drift, restore F/G/R separation, and make typed reasoning routine.*

#### Inventory & refactor (steps)

1. **Inventory** claims that implicitly talk about “things” (vehicles, requests, accounts, cohorts…).
2. **Name kinds** for recurring “describedEntity”; start at **K1**; promote to **K2** as invariants stabilize.
3. **Extract KindSignature** (aim **F4**); declare **F**.
4. **Refactor claims** to typed quantification: `∀ x ∈ Extension(k, slice) …` plus **Scope (G)** predicates.
5. **Publish bridges** where reuse is Cross‑context: Scope Bridge (**CL**) and KindBridge (**`CL^k`**) with loss notes; wire penalties **Φ/Ψ** to **R**.
6. **Normalize masks**: register RoleMasks; if reused, promote to subkinds (`⊑`).
#### Edits to other parts (normative redirects, no new math)

* **A.2.6 (USM).**
  – Add “no Scope on kinds” note.
  – In typed examples, show `MemberOf` definedness + Scope coverage.
  – Two‑bridge rule for Cross‑context typed reuse.

* **C.2.2 (F–G–R).**
  – Replace any “generality/abstraction” wording with **Claim scope (G)**.
  – Before scope composition, require typed pre‑check (`⊑` or KindBridge).
  – Distinguish penalties: **Φ(CL)** vs **Ψ(`CL^k`)** → both to **R**.

* **C.2.3 (F).**
  – Add note: **KindSignature** has its own **F**; claim‑level F remains by weakest‑link.

* **Part B (Bridges).**
 – Introduce **KindBridge** with **`CL^k`**, monotone order preservation, loss notes; determinism.
 – Chaining uses **min** of levels (weakest‑link) **for both** **CL** (Scope bridges) **and** **`CL^k`** (KindBridges).


* **Role‑CAL.**
  – Add **RoleMask** for kinds; determinism; promotion rule to subkind when reused.

* **Compose‑CAL.**
  – Add typed pre‑check before Scope algebra; forbid “type‑by‑scope”.

* **Part E (Lexicon).**
  – Add: `U.Kind`, `U.SubkindOf (⊑)`, `KindSignature`(+F), `Extension`, `MemberOf`, `U.RoleMask`, **KindBridge**, `CL^k`, **AT (kinds, facet)**.
  – Mark as **legacy aliases** (not characteristic names): *generality (as ladder), kind scope, validity (as characteristic), capability envelope*; redirect to **Claim/Work scope** or **Kind** entries.
#### Backwards compatibility

* Historical prose may keep legacy words. **Guards, conformance text, and state assertions** MUST use the Kind‑CAL/USM vocabulary and guard shapes.
* When annotating older records, add a small “typed note” box: **Kinds**, **Scope**, **Bridges (CL/`CL^k`)**, **loss notes**, **penalties to R**.
### Extended rationale & design notes \[I]

> *This section explains the design choices that keep Kind‑CAL compact and interoperable with F–G–R & USM without drifting into tooling or technology stacks.*

#### Why no Scope on kinds

Scope answers **“where the claim holds”** (set of Context slices, USM); kinds answer **“what the claim is about”**. Putting Scope on kinds would either (a) duplicate claim Scope, or (b) smuggle applicability into a classifier. We prevent both by: **intent/extent on kinds** (C.3.2), **Scope on claims/capabilities** (USM).
#### Why two bridges (Scope vs Kind)

Contexts diverge along **context** (Standards, parameters, time) and **classification** (what counts as a member). A single bridge hides which characteristic is mismatched. Two explicit bridges keep fixes targeted: **ΔG / narrowing** for context misfit; **subkind/adapter** for classification misfit. Both risks land in **R** as separate penalties (**Φ/Ψ**).
#### Why AT is a facet

AT (K0…K3) improves **planning** (ΔF/ΔR, bridge style) and **navigation** without introducing new algebra. Making AT a Characteristic would recreate a “G‑ladder,” blur applicability with abstraction, and invite gating on AT. As a facet, AT remains helpful but **toothless in math**, which is precisely what we want.
#### Why RoleMask and not “clone a kind”

Operational tweaks (extra constraints, local aliases) are real but temporary. Cloning kinds creates drift and duplicate bridges. **RoleMask** documents the tweak **without breaking identity**; promotion to subkind occurs when practice stabilizes. This keeps catalogs small and bridges honest.
#### Fit with Compose‑CAL and LOG‑CAL

Typed pre‑checks (same‑Context `⊑` or KindBridge) act like **port compatibility** before any Scope arithmetic. LOG‑CAL benefits from explicit quantification `∀ x : Kind` with substitution rules aligned to `⊑`. Neither alters F/G/R algebra; they prevent category mistakes before we do trust math.
#### CT2R lens (intuition)

A **KindBridge** behaves like a **functor** that (approximately) preserves structure between Contexts; **`CL^k`** is a practical knob for “how functorial” it is. At **K3** (up‑to‑iso), this is literal: we expect bridges to preserve equivalences, hence higher `CL^k` and smaller Ψ penalties.
### Rationale (Part E form)

**Problem.** (recap)
— Authors conflate *describedEntity* with *applicability*, widening G by abstract wording.
— Cross‑context reuse drifts semantically without declared mappings or risk accounting.
— Planning misfires: over‑formalization for instance claims; under‑testing for class claims.
— Unsafe compositions when describedEntity is implicit.

**Forces.** (recap)
— Local freedom vs global sense; minimality vs utility; intent vs extent; typed discipline vs F–G–R; abstraction vs applicability.

**Decision (C.3‑D1…D7).**
— D1: `U.Kind` is intensional and context‑local (`⊑` partial order).
— D2: Separate intent (KindSignature + F) and extent (Extension/MemberOf@slice).
— D3: No Scope on kinds (Scope lives with claims/capabilities via USM).
— D4: Typed reuse is explicit: KindBridge + `CL^k`, penalties route to **R** only.
— D5: Local adaptation via RoleMask; promote stable masks to subkinds.
— D6: AT (K0…K3) as **facet**, not a Characteristic; never used in guards.
— D7: Guard shapes: typed pre‑check → scope coverage → penalties/freshness.

**Consequences.**
(+) Predictable Cross‑context reuse: two‑bridge rule, separate penalties (Φ/Ψ) to **R**.  
(+) Manager‑friendly planning: AT guides ΔF/ΔR; typed pre‑check blocks category mistakes.  
(+) Clean F–G–R discipline: no “G‑ladder,” no hidden scope inside classifiers.  
(−) Editorial discipline required: no “Kind scope”; masks must be cataloged; promote when stable.  
(−) Initial bridge authoring cost; mitigated by loss‑notes and reuse.

**Alternatives considered.**
— *Global U.Type*: rejected as either too thin or too prescriptive across Contexts.  
— *“Kind scope” in USM*: rejected; duplicates/obscures Scope vs Extension split.

**Known uses.**
— §11.1 (cyber‑physical braking); §11.2 (API with adapter); §11.3 (clinical dosage); §11.4 (ML fairness).  
— ESG guard shapes in **C.3.A**; typed pre‑check in Compose‑CAL (§7.2.4).

**Related patterns.**
A.2.6 (USM), C.2.2 (F–G–R), C.2.3 (F), Part B (Bridges), Role‑CAL, Compose‑CAL, C.3.1–C.3.5, C.3.A.
### Quick reference for managers

#### 10‑minute start

1. Name the **Kind** your claim talks about.
2. Write **Scope (G)** as slice predicates (with **Γ\_time**).
3. If composing, check **`⊑`** or **KindBridge** first.
4. Use the **typed guard macro** (C.3.A).
5. Route bridge levels to **R** (Φ/Ψ); check freshness.
#### 30‑day rollout plan

Week 1: Inventory & name Kinds (K1); adopt guard macros.
Week 2: Draft **KindSignature** for the top 5 Kinds (aim **F4**); register masks.
Week 3: Wire **two‑bridge rule** into ESG; add CL/`CL^k` lines to decision templates.
Week 4: Promote repeated masks to subkinds; publish first **KindBridge** records with loss notes.
### Local glossary (reading aid)

> *Canonical definitions live in sub‑patterns; this list is for quick recall while reading C.3.*

* **`U.Kind`** — Minimal intensional “type/kind” object; carries **KindSignature** and **`⊑`** (C.3.1/C.3.2).
* **`U.SubkindOf (⊑)`** — Partial order on kinds (C.3.1).
* **KindSignature(k)** — Predicate‑like intent that defines the kind; has its own **F** (C.3.2).
* **Extension(k, slice)** — Set of instances of `k` **inside** a `U.ContextSlice` (C.3.2).
* **MemberOf(e, k, slice)** — Boolean membership predicate (C.3.2).
* **RoleMask(k, Context)** — Registered adaptation (constraints/aliases; optional narrowing), no new kind (C.3.4).
* **KindBridge** — Cross‑context mapping for kinds (intent/order) with **`CL^k`** and loss notes (C.3.3).
* **`CL^k`** — Kind‑congruence level; penalty **Ψ(`CL^k`)** goes to **R** (C.3.3).
* **AT (K0…K3)** — Informative facet of a Kind; aids planning/navigation; never used in guards (C.3.5).
* **Guard macros** — Typed guard shapes for ESG/composition (C.3.A).

> *End of C.3. See **C.3.1–C.3.5** and **C.3.A** for the referenced mechanics and guard macros.*
### C.3:End
## U.Kind & SubkindOf (Core)

> **One‑line summary.** Defines **`U.Kind`** as a **minimal, context‑local intensional carrier** for “what a claim is about,” and **`U.SubkindOf (⊑)`** as a **partial order** over kinds. **Kinds do not carry Scope.** Scope remains on **claims/capabilities** (USM). This core pattern supplies only identity, locality, and ordering; **intent & membership** (`KindSignature`, `Extension/MemberOf`) are specified in **C.3.2**, bridges & congruence in **C.3.3**, masks in **C.3.4**, and the AT facet in **C.3.5**.

**Status.** Normative in **Part C**. Identifier **C.3.1**.
**Audience.** Engineering managers, architects, assurance leads.

**Dependencies.**

* **A.2.6 USM (Unified Scope Mechanism).** *Scope* is a set‑valued **USM property** over `U.ContextSlice` on **claims/capabilities**; algebra: `∈` (membership), `∩` (intersection), `SpanUnion` (union across independent lines), `translate` (scope mapping).
* **C.2.2 F–G–R.** F = formality of expression; **G = Claim scope**; R = assurance/evidence; weakest‑link for F/R; CL penalties feed **R**, not **F/G**.
* **C.2.3 U.Formality (F).** Ordinal F0…F9; no arithmetic; applies to all content, including Kind signatures (defined in **C.3.2**).
* **Part B Bridges & CL.** Generic (scope) bridges and CL; **Kind bridges** are specialized in **C.3.3**.

**Non‑goals.**

* No data governance or repository/notation mandates.
* No membership or signature semantics here (defined in **C.3.2**).
* No Cross‑context mapping/congruence here (defined in **C.3.3**).
* No role/mask mechanics here (defined in **C.3.4**).
* No AT facet mechanics here (defined in **C.3.5**).

### Purpose & Audience

This pattern gives **one small, stable vocabulary** to say *what* a claim ranges over (its **describedEntity**) without entangling that with *where it applies* (Scope) or *how well it is supported* (R). For managers:

* It prevents the costly mistake “more abstract wording ⇒ wider scope.”
* It enables **typed composition** (you cannot combine claims about incompatible “things”).
* It keeps **Scope** and **Assurance** math unchanged and predictable.
### Context

across Contexts, “type” means OWL class, SHACL shape, code type, BORO category, etc. A **neutral, minimal** object is needed to name *the kind of entities* a claim quantifies over **without** importing a full type system or altering USM. **`U.Kind`** fills that role; **ordering** between kinds captures “is‑a/refines” relationships a Context relies on.
### Problem

1. **Scope–Type conflation.** Teams broaden G by “abstracting” prose, not by adding supported slices.
2. **Unsafe composition.** Claims are joined though they talk about different “things.”
3. **Cross‑context drift.** Without an explicit core notion of kind, bridges blur describedEntity vs applicability.
### Forces

| Force                          | Tension to resolve                                                        |
| ------------------------------ | ------------------------------------------------------------------------- |
| **Minimality vs utility**      | Keep the core tiny yet sufficient for composition and governance.         |
| **Locality vs reuse**          | Kinds are context‑local, but projects reuse claims across Contexts via bridges. |
| **describedEntity vs applicability** | Ordering should not leak into Scope; kinds must not carry G.              |
| **Neutrality vs specificity**  | Avoid committing to any particular type/ontology stack or notation.       |
### Solution — Core Objects (overview)

* **`U.Kind`** — a **context‑local intensional** object naming a “kind of thing” claims may quantify over.
* **`U.SubkindOf (⊑)`** — a **partial order** on kinds (reflexive, transitive, antisymmetric). `k₁ ⊑ k₂` reads “`k₁` refines `k₂`.”

> **No Scope on kinds.** Scope is for **claims/capabilities** (USM). Kinds supply **describedEntity only**; **membership** and **signature** live in **C.3.2**.
### Norms & Invariants (normative)

**C3.1‑K‑01 (Partial order).** `U.SubkindOf (⊑)` **SHALL** be a **partial order** on `U.Kind`: reflexive, transitive, antisymmetric. Editors **SHALL** document any Context‑specific meets/joins if they supply them (optional).

**C3.1‑K‑02 (No Scope on kinds).** A `U.Kind` **MUST NOT** carry a Scope value. Scope lives with **claims** (`U.ClaimScope` = **G**) and **capabilities** (`U.WorkScope`) per **A.2.6**.
*Rationale pointer:* see **C.3.2** for the **intent/extent vs Scope** split.

**C3.1‑K‑03 (Identity & locality).** A `U.Kind` is **context‑local**. Cross‑context mapping of kinds is handled by **KindBridge** (see **C.3.3**); such mapping **MUST NOT** be conflated with Scope bridging.

**C3.1‑K‑04 (Naming).** A Context **SHALL** assign stable identifiers to kinds and **SHOULD** catalog parent/child `⊑` links. Synonyms/aliases **SHALL** point to the canonical kind id.

**C3.1‑K‑05 (Separation of concerns).** This core **does not** define kind intent or membership; those are specified in **C.3.2** (`KindSignature` with its own F; `Extension/MemberOf` and determinism).
### Interactions (informative)

* **With USM (A.2.6).** Guards that quantify over a kind use **two** predicates: “Scope covers TargetSlice” (USM) **and** whatever **membership** predicate is defined for the kind (see **C.3.2**). Kinds themselves carry **no Scope**.
* **With F–G–R (C.2.2).** This pattern does not alter the triple; typed checks happen **before** scope algebra, preventing invalid compositions.
* **Order of checks reference.** See **Annex C.3.A §5 (E‑01)** for the normative evaluation order: typed compatibility first, then Scope coverage, then penalties to **R** and freshness.
* **With Formality (C.2.3).** A **KindSignature** (C.3.2) declares its **F**; claims retain their own F via weakest‑link.
* **With Bridges (Part B).** Use **KindBridge** (C.3.3) for describedEntity; use **Scope Bridge** (Part B) for applicability. Penalties land in **R** via different channels.
### Authoring & Review (informative)

**When to mint a kind.**
Mint a `U.Kind` when claims repeatedly quantify over “the same sort of thing” and you need: (i) safe composition, (ii) clear Cross‑context mapping, (iii) a place to collect invariants (in **C.3.2**).

**Don’t over‑mint.**
If a local constraint is temporary or purely procedural, prefer a **RoleMask** (C.3.4) over a new subkind.

**Review prompts.**

1. Does the draft introduce a new *describedEntity* concept? → consider a kind.
2. Does prose hint at “is‑a” relationships? → capture as `⊑`, not as scope widening.
3. Are authors trying to widen scope by abstracting wording? → stop; widen **G** only via **ΔG** (USM) with support.
### Examples (informative, technology‑neutral)

1. **Vehicle/PassengerCar.**
   Mint `Kind Vehicle`. Later add `PassengerCar ⊑ Vehicle`. Claims about **Vehicle** may be reused by narrowing to **PassengerCar** without touching **G**. Scope remains an independent predicate over `U.ContextSlice`.

2. **Request/AuthenticatedRequest.**
   If multiple policies speak about “authenticated requests,” declare `AuthenticatedRequest ⊑ Request`. Do **not** widen G to compensate for missing authentication; either change the producer’s kind or insert an adapter (C.3.2/C.3.4) while keeping G honest.
### Conformance checklist (normative)

| ID            | Requirement                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| **C3.1‑K‑01** | `U.SubkindOf (⊑)` is a **partial order** (reflexive, transitive, antisymmetric).                        |
| **C3.1‑K‑02** | `U.Kind` **does not carry Scope**. Scope remains on claims/capabilities per **A.2.6**.                  |
| **C3.1‑K‑03** | Kinds are **context‑local**; Cross‑context mapping uses **KindBridge** (C.3.3), not Scope bridges.            |
| **C3.1‑K‑04** | Kinds have **stable ids**; synonyms redirect; Contexts catalog `⊑` links.                                  |
| **C3.1‑K‑05** | **No intent/membership** in this core; refer to **C.3.2** for `KindSignature` and `Extension/MemberOf`. |
### Rationale (informative)

**Why a tiny core?**
Contexts differ wildly in “type” practice. A large, prescriptive core would either (a) force one Tradition’s semantics on all, or (b) become an empty label. The **smallest powerful** core—identity + ordering—gives managers and integrators what they need (safe composition, predictable edits) and leaves intent/membership/bridges/masks to focused sub‑patterns.

**Why “no Scope on kinds”?**
**Scope** (USM) answers “**where** a claim/capability holds” over `U.ContextSlice`. Kinds answer “**what** the claim ranges over.” Blending them recreates the failure mode we are removing (“higher abstraction ⇒ wider scope”). The right split is:

* **Kind**: intensional name + order (`⊑`) *(this pattern)*; intent & membership *(C.3.2)*.
* **Scope**: set of context slices *(A.2.6)*.
* **Assurance**: evidence & penalties *(C.2.2 / Part B)*.
### C.3.1:End
## KindSignature (+F) & Extension/MemberOf

> **One‑line summary.** Specifies the **intent and extent** of kinds: (**i**) a **`KindSignature(k)`** (the intensional definition of kind `k`) that **declares its own Formality F**; (**ii**) an **`Extension(k, slice) ⊆ U.EntitySet(slice)`** and the **membership predicate** `MemberOf(e, k, slice)` that are **deterministic per `U.ContextSlice`**; (**iii**) **monotonicity** of extension under `SubkindOf`; (**iv**) a **definedness policy** that fails **closed** outside its domain. **Kinds still carry no Scope** (that rule lives in C.3.1); Scope stays on **claims/capabilities** (USM). This pattern gives managers and reviewers the **observable basis** to check “what counts as a member here and now” without entangling applicability (G) or assurance (R).

**Status.** Normative in **Part C**. Identifier **C.3.2**.
**Audience.** Engineering managers, architects, assurance leads, editors.

**Depends on.**

* **C.3.1** (*U.Kind & SubkindOf Core*): kinds are context‑local; `⊑` is a partial order; kinds carry **no Scope**.
* **A.2.6 USM** (*Context slices & Scopes*): Claim scope (G) and Work scope live on claims/capabilities; algebra `∈` (membership), `∩` (intersection), `SpanUnion` (union across independent lines), `translate` (scope mapping).
* **C.2.3 U.Formality (F)**: ordinal F0…F9; no arithmetic; weakest‑link composition applies to content that depends on the signature.
* **C.2.2 F–G–R**: assurance calculus; CL penalties feed **R**, not **F/G**.
* **Part B (Scope Bridges & CL).** CL (scope congruence) and scope translation live in Part B/USM; **kind‑congruence `CL^k`** and kind mapping live in **C.3.3** (KindBridge).

**Non‑goals.**

* No Scope semantics here (USM); no bridge semantics here (C.3.3).
* No repository/notation mandates; this is concept‑level, not tooling.

### Purpose & Audience

This pattern makes **describedEntity testable** in a Context:

* Authors get a place to write **what defines a kind** (`KindSignature`) and at **what rigor (F)**.
* Reviewers can ask **deterministic** questions: *“Given this `TargetSlice`, which entities are in `k`?”*
* Managers can plan **ΔF** (raise signature rigor) and **ΔR** (evidence over members) **without** changing **G** (applicability).

**No tooling assumption.** The pattern is **conceptual** and notation‑neutral (no OWL/SHACL/type‑system requirement); it specifies reviewer‑checkable obligations that managers can read in plain language.
### Context

Different Contexts encode “type” intent differently (predicates, schemas, ontologies, Standards). Regardless of notation, a team must be able to answer, reproducibly: **who belongs to the kind at this slice?** If this is not stable, claims quantified over the kind are unverifiable, bridges are opaque, and composition becomes unsafe.
### Problem

1. **Ambiguous membership.** Membership depends on tacit “latest” states or unwritten defaults.
2. **Signature opacity.** A kind’s definition is scattered; no single place to declare rigor (**F**) or assumptions.
3. **Order violations.** Subkind hierarchies do not guarantee subset behavior in practice.
4. **Scope leakage.** Teams smuggle applicability (G) into kind definitions, recreating G‑ladders by another name.
### Forces

| Force                              | Tension to resolve                                                                                   |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Local freedom vs comparability** | Contexts need their own notations, but membership must be checkable in a common style.                  |
| **Expressivity vs determinism**    | Rich intent is welcome, but membership must be deterministic given `slice`.                          |
| **Intent vs applicability**        | Define “what counts” (intent/extent) without encoding “where valid” (G).                             |
| **Rigor vs cost**                  | Raising signature F has cost; the framework must support low‑F drafts and high‑F safety cores alike. |
### Solution — Objects & Standards (overview)

* **`KindSignature(k)`** — the **intensional** definition of kind `k` in the Context; it **declares `U.Formality`** per C.2.3.
* **`U.EntitySet(slice)`** — the set (or well‑defined universe) of **entities addressable in a given `U.ContextSlice`**.
* **`Extension(k, slice) ⊆ U.EntitySet(slice)`** — **which entities** belong to `k` **at** `slice`.
* **`MemberOf(e, k, slice)`** — membership predicate: `e ∈ Extension(k, slice)`.

**Design split.**

* **Intent** lives in **`KindSignature`** (with F).
* **Extent** is **computed per `slice`** via `MemberOf`.
* **Applicability** (where a **claim** holds) remains a **Scope** on the claim (USM) and **MUST NOT** be encoded into `KindSignature`.
### Norms & Invariants (normative)

> IDs **C3.2‑K‑03…K‑08** correspond to the rules announced in C.3; additional local rules use **C3.2‑S‑\***.

#### Signature & Formality

**C3.2‑K‑03 (Signature F).** Every `KindSignature(k)` **SHALL declare `U.Formality`** per C.2.3 (F0…F9).
— *Note:* Raising signature F **does not** automatically raise claim‑level F; claims follow weakest‑link along their **own** support paths.

**C3.2‑K‑04 (Signature change = content change).** Any change to `KindSignature(k)` that **alters membership** (i.e., would change `Extension(k, slice)` for some `slice`) **SHALL** be recorded as a **content change** (Contexts may version kinds).
#### Extension & Membership

**C3.2‑K‑05 (Deterministic membership).** For fixed `(k, slice)`, `MemberOf(e, k, slice)` **MUST** be deterministically evaluable **from observable content in `slice`**.
— Implication: **“latest” is forbidden**; `Γ_time` must be explicit on `slice` (A.2.6).
— If a classifier makes external assumptions, they **MUST** be named in `KindSignature`.

**C3.2‑K‑06 (Monotone in `⊑`).** If `k₁ ⊑ k₂`, then for **every** `slice`:
`Extension(k₁, slice) ⊆ Extension(k₂, slice)`.

**C3.2‑K‑07 (Definedness & fail‑closed).** Each Context **MAY** restrict the **domain of definedness** for `MemberOf(–, k, –)` (e.g., only when a Standard or dataset is present at a given version). Outside that domain, `MemberOf` **MUST** be treated as **not defined** for guard purposes, and guards **MUST fail closed** (deny). Implementations MAY internally return `False`, but there **MUST** be no path where undefined membership yields implicit success.

**C3.2‑K‑08 (Separation from G).** Guards **SHALL** keep **Scope coverage** (USM) and **membership** **as separate predicates**:
“`U.ClaimScope(Claim) covers TargetSlice` **AND** `MemberOf(?, k, TargetSlice)` is defined/used”.
#### Entity set & time

**C3.2‑S‑01 (`U.EntitySet`).** A Context **SHALL** document what counts as `U.EntitySet(slice)` (e.g., “rows in dataset D at version v,” “live objects in service S at build b,” “ontology individuals at vocabulary v”). This documentation **MUST** be stable and addressable via the `slice` tuple.
**C3.2‑S‑02 (Time).** `slice` **SHALL** specify **`Γ_time`** (point/window/policy). Membership **MUST NOT** rely on implicit recency. 

`U.EntitySet(slice)` **MUST NOT** expand implicitly via external defaults or time; its extent is fixed by the `slice` tuple (see **C3.2‑S‑02**).
### Interactions & Placement (informative)

* **With C.3.1.** Kinds carry identity and `⊑`; **no Scope** on kinds. This pattern adds the **intent/extent** layer under those constraints.
* **With A.2.6 (USM).** A typed claim’s guard normally evaluates, in the order specified by **Annex C.3.A §5 (E‑01)**: (1) typed compatibility, (2) **Scope coverage** at `TargetSlice`, (3) **`MemberOf(?, k, TargetSlice)`** definedness and any instantiation, followed by penalties to **R** and freshness checks. Use **Guard_TypedClaim** / **Guard_TypedJoin** rather than ad‑hoc shapes.
* **With C.2.3 (F).** Signature F influences claims **only if** the claim **depends on** the signature content; weakest‑link min applies along the claim’s support path.
* **With C.3.3 (KindBridge).** When `MemberOf` is computed via a **kind mapping across Contexts**, kind‑congruence `CL^k` contributes a **monotone penalty to **R** only (Ψ(`CL^k`)); **F/G MUST NOT** be adjusted. 
* **With Role‑CAL (C.3.4).** A **RoleMask** may **narrow** membership (context‑local adaptation). Frequent masks that encode stable narrowing **SHOULD** be promoted to subkinds (`⊑`).
### Authoring & Review Guidance (informative)

#### Authoring KindSignature

* **Be explicit and observable.** Prefer predicate‑like clauses over prose (“has VIN format …”; “axles ≥ 2”).
* **Bind to versions.** Name Standards/schemas by version; avoid “current.”
* **Declare F honestly.** F3 for controlled narrative is fine in early phases; aim F4+ for durable kinds; consider F7+ for safety‑critical cores.
* **Name assumptions.** If membership requires external conditions (e.g., calibrated rig), put them in the signature.
#### Authoring membership

* **Define `U.EntitySet(slice)`.** Write it down once per Context, make it addressable via the `slice` tuple, and reuse.
* **Determinism first.** No hidden IO, no implicit time; membership must be recomputable from the slice.
* **Document definedness.** If `MemberOf` is undefined without a Standard, say so; guards will fail closed.
* **Respect `⊑`.** If you declare `k₁ ⊑ k₂`, verify subset behavior (C3.2‑K‑06).
#### Review checklist (10 minutes)

1. Is **signature F** declared? Is the signature sufficient to evaluate membership?
2. Is **`U.EntitySet(slice)`** documented and addressable?
3. Is **membership deterministic** with explicit `Γ_time` (no “latest”)?
4. If `⊑` links exist, does **subset behavior** hold at sample slices?
5. Are **Scope** and **membership** kept **separate** in guards?
6. Any **Cross‑context** classification? If yes, is **KindBridge** referenced (C.3.3)?
### Worked Examples (informative)

#### Vehicle (signature F4) and membership

**KindSignature(Vehicle)** *(F4)*:

* `hasVIN(x)` is true and parseable;
* `axles(x) ≥ 2`;
* `hasBrakeSystem(x)`;
* Standards: `registryAPI v1.4`; `Γ_time` policy: rolling 365 d for registry fields.

**`U.EntitySet(slice)`**: “records in `registryAPI v1.4` for plant `A` at build `b`, as of `Γ_time`.”
**`Extension(Vehicle, slice)`**: all records satisfying the predicates **in that `slice`**.
**Monotonicity:** `PassengerCar ⊑ Vehicle` ⇒ `Extension(PassengerCar, s) ⊆ Extension(Vehicle, s)`.
#### AuthenticatedRequest (definedness & fail‑closed)

**KindSignature(AuthenticatedRequest)** *(F4)*:

* `Request` with `authHeader` present and `authSignature` valid according to `AuthStandard v2.3`;
* `Γ_time`: point in time for key validity check.

**Definedness:** `MemberOf(–, AuthenticatedRequest, slice)` is **undefined** if `AuthStandard v2.3` is **absent** in `slice` ⇒ guards **fail closed** (C3.2‑K‑07).
#### Clinical cohort (low‑F signature; deterministic membership)

**KindSignature(AdultPatient)** *(F3→F4 as it hardens)*:

* `ageYears(x, Γ_time) ≥ N` (jurisdictional N varies; recorded in the Context’s signature note).
* `EntitySet(slice)`: EHR `ehr‑east v7.5` @ `Γ_time`;
* Membership deterministic if DOB present; undefined otherwise (fail closed).
### Anti‑patterns & Remedies (informative)

| Anti‑pattern                                         | Why it’s wrong                        | Remedy                                                              |
| ---------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------- |
| Using “latest” implicitly in membership              | Non‑deterministic; unreproducible     | Require explicit `Γ_time`; treat freshness separately in **R**      |
| Encoding Scope (“only in EU plant”) in the signature | Confuses applicability with describedEntity | Move such conditions to **Claim scope (G)**; keep signature general |
| Declaring `k₁ ⊑ k₂` but not ensuring subset behavior | Breaks typed reasoning                | Tighten `KindSignature` or drop the `⊑` link                        |
| Treating RoleMask as a different kind                | Catalog sprawl; hidden semantics      | Keep mask as adaptation; promote to subkind if widely reused        |
| Membership relying on external, unnamed assumptions  | Hidden dependencies; review fatigue   | Name assumptions in the signature; point to Standards/versions      |
### Rationale (informative)

#### Why give F to KindSignature?

Because rigor in the **definition of a kind** materially affects how safely teams can quantify over it. A signature at **F4** (predicate‑like) makes membership checkable in principle; **F7+** (machine‑checked) can support proof‑carrying development. Keeping this **separate from claim‑level F** prevents “signature formalization” from inflating unrelated claims.
#### Why Extension is not Scope

* **Extension** answers: *“Which entities count as `k` **in this slice**?”*
* **Scope (G)** answers: *“In which slices does **this claim** hold?”*
  Blending the two recreates the old failure mode where “more abstract wording” was treated as “wider applicability.” USM already gives the set‑algebra for G; Kind‑CAL supplies the **typed universe** the claim quantifies over.
#### Why determinism and fail‑closed?

Guards must be **reproducible** and **auditable**: same `slice` ⇒ same membership result. If inputs are missing (undefinedness), the safest default is **deny** (fail closed), prompting either a richer slice or a scope/claim change.
### Conformance checklist (normative)

| ID            | Requirement                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------- |
| **C3.2‑K‑03** | Every `KindSignature(k)` **declares `U.Formality`** (F0…F9).                                    |
| **C3.2‑K‑04** | Signature changes that alter membership are **content changes** (Contexts may version kinds).      |
| **C3.2‑K‑05** | `MemberOf(e, k, slice)` is **deterministic** for fixed `(k, slice)` (no “latest”).              |
| **C3.2‑K‑06** | **Monotonicity:** if `k₁ ⊑ k₂` then `Extension(k₁, s) ⊆ Extension(k₂, s)` for all `s`.          |
| **C3.2‑K‑07** | **Definedness:** outside domain, membership **fails closed**; guards deny use.                  |
| **C3.2‑K‑08** | **Separation:** guards keep **Scope coverage** (USM) and **membership** as distinct predicates. |
| **C3.2‑S‑01** | The Context **documents `U.EntitySet(slice)`** (stable, addressable via `slice`).                |
| **C3.2‑S‑02** | `slice` **specifies `Γ_time`**; membership **must not** rely on implicit recency.               |
### C.3.2:End
## KindBridge & CL^k — Cross‑context Mapping of Kinds

> **One‑line summary.** Defines **`KindBridge`** as the normative mechanism for moving **kinds** (their **intent** and selected **subkind‑of** links) between bounded contexts (“Contexts”). A bridge declares **how a source kind maps to a target kind**, which parts of the **`⊑`** order are preserved or collapsed, and publishes a **type‑congruence level `CL^k`** with **loss notes** and a **definedness area**. **`CL^k` penalties apply only to Reliability (R)** when a claim depends on Cross‑context classification; **F** (formality) and **G** (Claim scope) remain unchanged. Scope translation continues to use the **USM Bridge + CL** channel; **KindBridge** is a **separate, parallel channel** for describedEntity.

**Status.** Normative in **Part C**. Identifier **C.3.3**.
**Audience.** Engineering managers, architects, assurance leads, editors.

**Depends on.**

* **C.3.1 — U.Kind & SubkindOf (Core):** kinds are context‑local intensional objects; `⊑` is a partial order; kinds **do not carry Scope**.
* **C.3.2 — KindSignature (+F) & Extension/MemberOf:** signature declares its own **F**; membership `MemberOf(e,k,slice)` is **deterministic** per `U.ContextSlice`.
* **A.2.6 — USM (Context slices & Scopes):** Claim scope (**G**) and Work scope live on claims/capabilities; scope bridging and **CL** penalties are defined there.
* **C.2.2 — F–G–R:** weakest‑link; penalties land in **R**, not **F/G**.
* **C.2.3 — U.Formality (F):** signature rigor.

**Non‑goals.**
— No repository/notation mandates; conceptual only.
— No Scope mapping here (that’s USM); **KindBridge** maps **kinds**, not scopes.
— No new arithmetic on `CL^k`; it reuses the **ordinal anchor semantics** of CL (Part B) but applies to kinds.

### Purpose & Audience

Cross‑context reuse fails in two **orthogonal** ways:

1. **Applicability** (G): *where* the claim holds (handled by USM Scope Bridge).
2. **describedEntity** (Kind): *what* the claim quantifies over (handled by **KindBridge**).

**C.3.3** gives managers an explicit, auditable channel for **(2)**, so a team can say, with evidence: *“`Vehicle` in Lab maps to `TransportUnit` in Plant with `CL^k=2`; the EV subkind collapses; here’s what we lost.”* Guards stay deterministic; assurance math stays clean (penalties in **R** only).
### Context

Contexts use different **classifications**: ontology classes vs shape Standards, regulatory cohorts vs app types, etc. Informal “same‑name” reuse silently mutates describedEntity. USM already made scope moves explicit. **KindBridge** does the same for kinds: **declare the mapping**, rate its **congruence**, and capture known **losses**.
### Problem

1. **Semantic drift.** Moving a claim into a target‑context with a different taxonomy changes “what counts” without anyone noticing.
2. **Hidden order breaks.** Subkind relationships invert or vanish; downstream proofs/tests are misapplied.
3. **Entangled channels.** Teams conflate “scope mapping” with “kind mapping,” making it impossible to assign penalties coherently.
4. **Incomputable guards.** “We map it somehow” yields non‑deterministic classification at guard time.
### Forces

| Force                                    | Tension to resolve                                                                              |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Minimal disclosure vs precision**      | Bridges must be light to write yet precise enough to avoid semantic drift.                      |
| **Local autonomy vs global reuse**       | Each target‑context keeps its vocabulary; reuse requires explicit, reviewable mappings.                   |
| **Typed safety vs agility**              | We need typed compatibility checks without blocking exploratory reuse.                          |
| **Separate channels vs operator burden** | Two channels (Scope & Kind) must be explicit, but guard writers shouldn’t drown in boilerplate. |
### Solution — The KindBridge object (overview)

A **KindBridge** connects **source** Context **A** and **target** Context **B** for a set of kinds. It declares:

1. **Mapping of kinds**: either to named target kinds or via **signature translation** rules.
2. **Order preservation**: which `⊑` links are preserved (monotone), which are **collapsed**, and which are **unknown** (not claimed).
3. **Type‑congruence `CL^k`**: reuses the **same anchors/labels** as **CL** (Part B) but applies to kind intent/order (not to Scope). *Gloss:* higher `CL^k` ⇒ closer preservation of kind intent and declared `⊑` links.
4. **Loss notes**: human‑readable list of invariants and subkinds **not preserved**.
5. **Definedness area**: the subset of `U.ContextSlice` characteristics where the mapping is **intended** to be used (e.g., certain Standards/versions).
6. **Determinism**: fixed versions + mapping rules ⇒ deterministic result (no “latest”).

**Effect on assurance.** When a **claim** in B depends on classification that goes through this bridge, **reduce R** by a monotone penalty **Ψ(`CL^k`)**. **Do not** change **F** or **G**.
### Norms & Invariants (normative)

> The following formalize the **KB‑01…KB‑12** rules announced in C.3.

#### Subject & Scope of a KindBridge

**KB‑01 (Subject).** A KindBridge **maps**:

* one or more **KindSignature**(s) from source to target; and
* an **explicitly declared subset of `⊑` links** (which it claims to preserve or collapse).

**KB‑02 (No Scope).** A KindBridge **MUST NOT** map Claim/Work scope (**G**). Scope translation uses the **USM Bridge + CL** channel (A.2.6, Part B).

**No blended score.** Congruence for Scope (**CL**) and for Kind (**CL^k**) **MUST NOT** be aggregated into a single “interoperability” score in guards; each channel is assessed and penalized **separately**. See **Annex C.3.A §5 (E‑06)**.
#### Declaration & Shape

**KB‑03 (Declaration).** A KindBridge record **SHALL** include:

1. source/target Contexts and vocabulary/Standard **versions**;
2. a **kind mapping** per source kind `k`: either a **named** target kind `k′` or a **signature translation rule** that constructs the **target‑context** `KindSignature(k′)` (the result is owned and versioned in the target Context);
3. an **order preservation claim** for any `k₁ ⊑ k₂` it covers: *preserved* / *collapsed* / *unknown*;
4. **`CL^k`** value (using the CL anchor ladder) labeled **“kind‑congruence”**;
5. **loss notes** (non‑preserved invariants, collapsed subkinds, equality quirks);
6. **definedness area** (constraints on `U.ContextSlice` dimensions where the bridge is meant to apply).

**KB‑04 (Determinism & local evaluation).** Given fixed Context versions and mapping rules, **translateₖ** **MUST** be deterministic (no implicit “latest”). After mapping to `k′`, **membership SHALL be evaluated using the target Context’s own `KindSignature(k′)` and `MemberOf(–, k′, –)`**; source‑context membership results **MUST NOT** be reused as truth in guards (they may be cited as evidence in **R**).
#### Order & Monotonicity

**KB‑05 (Monotone order).** If the bridge claims to **preserve** `k₁ ⊑ k₂`, then in the target Context **`translateₖ(k₁) ⊑′ translateₖ(k₂)`** **MUST** hold.
**KB‑06 (No inversions).** The bridge **MUST NOT** assert preserved links that **invert** order. If real‑world constraints force reversal, the link **MUST** be marked **not preserved** with a **loss note**.
**KB‑07 (Collapse semantics).** Marking a link as **collapsed** is allowed (two subkinds mapped to one target kind), but the record **SHALL** list the merged subkinds and any properties thereby lost.
#### Congruence & Assurance

**KB‑08 (Anchor reuse & AT neutrality).** **`CL^k`** reuses the **ordinal anchor semantics** of CL (Part B) but applies **to kinds**. Editors **SHALL** label it explicitly as **kind‑congruence** to avoid confusion with Scope CL. **KindBridge records MUST NOT compute or alter KindAT (C.3.5 AT‑04); AT is editorial and independent of `CL^k`.**
**KB‑09 (Effect on R only).** When a claim in the target Context depends on `MemberOf(–, translateₖ(k), TargetSlice)`, a **monotone penalty `Ψ(CL^k)`** **SHALL** reduce **R** (alongside any `Φ(CL)` penalty from the Scope Bridge). Implementations **MUST NOT** adjust **F or G** due to `CL^k`.
**KB‑10 (Chaining).** For a chain of bridges, **effective `CL^k` = min** of the links (weakest‑link).
#### Loss Notes & Definedness

**KB‑11 (Loss notes).** Bridges **SHALL** publish human‑readable **loss notes**: which invariants of `KindSignature` are **not preserved**, which subkinds are **collapsed**, and any **higher‑equality** caveats (e.g., up‑to‑iso only).
**KB‑12 (Definedness & guard use).** The bridge’s **definedness area** **SHALL** be stated. Guards **MUST fail closed** outside it (i.e., if a classification relies on the bridge where it is not defined, the guard denies use).
### Interactions (informative)

#### With USM Scope bridges (two channels)

When using a claim across Contexts, expect **two concurrent bridges**:

* **Scope Bridge (USM)**: maps **G**; publishes **CL**; penalty **Φ(CL)** to **R**.
* **KindBridge (this pattern)**: maps **kinds**; publishes **`CL^k`**; penalty **Ψ(`CL^k`)** to **R**.

**Discipline:** compute both; **do not** collapse them into one “interoperability score.”

 See **Annex C.3.A §5 (E‑01)** for the normative evaluation order in guards.
#### With membership (C.3.2)

After mapping `k` to `k′ = translateₖ(k)`, the **target Context** evaluates membership **as usual**: `MemberOf(e, k′, TargetSlice)`. If the bridge provides a **signature translation**, that definition becomes the **local** `KindSignature(k′)` (versioned per target Context policy).
#### With Role masks (C.3.4)

If a claim uses a **RoleMask(k)** across Contexts, you need:

* a **KindBridge** for `k` (`CL^k` + loss notes), and
* a documented **mask adapter** (how mask constraints translate).
  Penalties still land in **R**. If the mask’s effect is stable and widely reused, consider promoting it to a **subkind** on the target side.
#### With guards (Annex C.3.A)

Use the **`Guard_XContext_Typed`** macro (Annex C.3.A), which requires **both bridges** and applies **both penalties** to **R**:

* find Scope bridge (CL≥threshold), translate **G**, check coverage;
* find KindBridge (`CL^k≥threshold`), translate **kind**, check **membership definedness**;
* apply **Φ(CL)** and **Ψ(`CL^k`)** to **R**; keep **F/G** untouched.
### Authoring, Review & Rating Guidance (informative)

#### Authoring a KindBridge

* **Start narrow & honest.** Declare only the kinds and `⊑` links you **actually preserve**; mark the rest **unknown**.
* **Prefer named targets.** If the target already has a suitable kind, map to it; use **signature translation** only when necessary, and list what’s preserved vs weakened vs dropped.
* **Write loss notes in plain language.** Example: “EV vs ICE subkinds collapsed; battery‑health invariants dropped.”
* **Fix the definedness area.** Bind to target Standards/versions and any environment selectors essential to classification.
* **Assign `CL^k` from exemplars.** Calibrate on concrete counter‑examples and preserved properties; resist optimistic ratings.
#### Review playbook (10 minutes)

1. **Two bridges present?** Scope Bridge **and** KindBridge?
2. **Order claims honest?** Any `⊑` inversions? Collapses disclosed?
3. **`CL^k` plausible?** Based on preserved properties, not name similarity?
4. **Loss notes present?** Will they force narrowing of Scope or extra tests?
5. **Definedness area clear?** Guard will **fail closed** outside it?
6. **Penalties wired to R?** No hidden tweaks to **F/G**?
#### Rating CL^k (rules of thumb)

* **High `CL^k`**: signature equivalence or **up‑to‑iso**; `⊑` fragment preserved; only cosmetic losses.
* **Medium `CL^k`**: some invariants weakened; selected subkinds collapsed; order preserved on critical path.
* **Low `CL^k`**: name‑only correspondences; properties diverge; order not preserved. Expect significant **R** penalty and/or adapters.
### Worked Examples (informative)

#### Vehicle → TransportUnit (manufacturing)

**Source kind:** `Vehicle` (K2, signature F4).
**target Context:** `PlantB`, kind `TransportUnit` exists.

**KindBridge:**

* `Vehicle ↦ TransportUnit`; **order**: preserves `PassengerCar ⊑ Vehicle`; **collapses** `EV ⊑ Vehicle` into `TransportUnit` (no EV subkind).
* **`CL^k=2`** (mid); **loss notes:** “battery‑health invariants not carried”; **definedness:** only for `registryAPI v1.4`, `Γ_time` in last 365 d.

**Use:** Claim quantified over `Vehicle` crosses to `PlantB`.
**Guards:** scope bridge CL=2 (rig bias); kind bridge `CL^k=2`; both penalties reduce **R**. **F/G** unchanged.
#### AuthenticatedRequest across services (software)

**Source kind:** `AuthenticatedRequest` defined by `AuthStandard v2.3`.
**target Context:** `Frontend` with different auth header scheme.

**KindBridge:** signature translation (`authHeader` → `x‑auth`), preserves “signature valid” property; **`CL^k=3`** (high).
**Loss notes:** none; **definedness:** only where `AuthStandard v2.3` is in scope.

**Effect:** Rules quantified over `AuthenticatedRequest` can be reused; **R** penalty small (Ψ(3) near 1). Scope remains independent (API v2.3).
#### AdultPatient across jurisdictions (clinical)

**Source kind:** `AdultPatient` (≥ 18 at `Γ_time`).
**target Context:** `JurisdictionY` uses ≥ 21.

**KindBridge:** `AdultPatient ↦ AdultPerson_Y` with boundary mismatch; **`CL^k=1`**.
**Loss notes:** “Boundary 18 vs 21; map narrows to ≥ 21”.
**Guard:** Require **mask adapter** or **narrow Scope** to cohorts where DOB is known and ≥ 21. **R** penalty strong; **F/G** remain as declared.
### Anti‑patterns & Remedies (informative)

| Anti‑pattern                                 | Why it’s wrong                         | Remedy                                                                              |
| -------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------- |
| One “interop score” for both kind & scope    | Blurs channels; corrupts penalties     | Use **two bridges**; apply **Φ(CL)** (Scope) and **Ψ(`CL^k`)** (Kind) **separately** |
| Claiming preserved `⊑` while inverting order | Makes typed reasoning unsound          | Mark as **not preserved**; add **loss note**; consider adapter or subkind redesign  |
| Hiding collapses                             | Overstates coverage                    | List collapsed subkinds explicitly; plan extra **R** for lost granularity           |
| “Latest mapping”                             | Non‑deterministic; non‑auditable       | Version bridges; bind to Standards/versions; **fail closed** outside definedness    |
| Using KindBridge to widen G                  | Conflates describedEntity with applicability | Keep Scope edits in **USM** (ΔG±); KindBridge never widens Scope                    |
| Adjusting F/G for poor `CL^k`                 | Violates F–G–R & USM separation             | Route consequences to **R** only; consider narrowing Scope or adding adapters       |
### Conformance Checklist (normative)

| ID        | Requirement                                                                                                                                          |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **KB‑01** | A KindBridge **maps** `KindSignature`(s) and an explicitly declared subset of `⊑` links.                                                             |
| **KB‑02** | A KindBridge **MUST NOT** map Scope; Scope uses USM Bridge (Part B).                                                                                 |
| **KB‑03** | Bridge records **SHALL** include Contexts/versions, kind mapping/rules, order‑preservation claims, **`CL^k`**, **loss notes**, and **definedness area**. |
| **KB‑04** | Mapping **MUST** be **deterministic** given fixed versions/rules (no “latest”).                                                                      |
| **KB‑05** | Preserved order links **MUST** stay **monotone**: `k₁ ⊑ k₂` ⇒ `translateₖ(k₁) ⊑′ translateₖ(k₂)`.                                                    |
| **KB‑06** | **No inversions**: preserved links cannot invert order; otherwise mark **not preserved** and add loss notes.                                         |
| **KB‑07** | **Collapses** are allowed but **MUST** list merged subkinds and lost properties.                                                                     |
| **KB‑08** | **`CL^k`** **SHALL** reuse CL anchors and be labeled **“kind‑congruence.”**                                                                           |
| **KB‑09** | **Penalties:** when classification uses KindBridge, apply **Ψ(`CL^k`)** to **R**; **MUST NOT** adjust **F/G**.                                        |
| **KB‑10** | **Chaining:** effective `CL^k` across a chain is **min** (weakest‑link).                                                                              |
| **KB‑11** | **Loss notes** **SHALL** enumerate non‑preserved invariants and collapsed subkinds.                                                                  |
| **KB‑12** | **Definedness:** bridge **SHALL** state its valid area; guards **fail closed** outside it.                                                           |

**Integration requirements with Part B (bridges):**

* **B‑P1.** Part B (Bridges) **SHALL** list **KindBridge** as a distinct bridge class alongside USM Scope bridges.
* **B‑P2.** Part B **SHALL** state that **`CL^k` penalties route to R** via a monotone **Ψ**, never to **F/G**.
* **B‑P3.** Part B **SHALL** define **chaining = min** for both **CL** and **`CL^k`** (weakest‑link).
* **Templates.** ESG/Method templates should expose fields for **Scope Bridge (CL)** and **KindBridge (`CL^k`)** with loss notes & definedness.
### C.3.3:End
## RoleMask — Contextual Adaptation of Kinds (without cloning)

> **One‑line summary.** Defines **`U.RoleMask(kind, Context)`** as a **context‑local adaptation** of a `U.Kind` that (a) adds **constraints** and/or **vocabulary bindings**, and (b) may **narrow** membership **deterministically** within a `U.ContextSlice`, **without creating a new kind**. RoleMasks are catalogued, versioned, and guard‑addressable; frequent, stable constraint masks **SHOULD be promoted** to explicit **subkinds**. Cross‑context use of a RoleMask requires a **KindBridge** (for kinds) and, when needed, a **MaskAdapter** (for mask constraints). All penalties route to **R**; **F/G** remain unchanged.


**Status.** Normative in **Part C**. Identifier **C.3.4**.
**Audience.** Engineering managers, architects, reviewers, editors.

**Depends on.**

* **C.3.1 — U.Kind & SubkindOf (Core):** kinds are intensional; `⊑` is a partial order; kinds **carry no Scope**.
* **C.3.2 — KindSignature (+F) & Extension/MemberOf:** signature F; deterministic `MemberOf(e,k,slice)`; `EntitySet(slice)`.
* **C.3.3 — KindBridge & CL^k:** Cross‑context kind mapping; `CL^k` penalties → **R** only.
* **A.2.6 — USM (Context slices & Scopes):** Claim/Work scope (**G**) over `U.ContextSlice`; bridges and **CL** for scope.
* **C.2.2 — F–G–R; C.2.3 — U.Formality (F).**

**Non‑goals.**
— No repository/notation mandates; conceptual only.
— RoleMask is **not** a governance tier, data policy, or “mini‑type system.”
— RoleMask does **not** redefine Scope; context conditions belong to **USM**.

### Purpose (manager’s view)

Teams often need a **local projection** of a widely used kind:

* **Constraint:** “For our procedure, take `Vehicle` **with ABS** only.”
* **Vocabulary:** “Here, `AuthHeader` is called `X‑Auth`.”

If each team clones a fresh kind, catalogs fragment and bridges multiply. **RoleMask** is the disciplined alternative: **keep the kind identity**, apply **declared constraints and bindings**, and make the mask **first‑class** (registered, versioned, guard‑addressable). When a mask becomes stable “de‑facto subkind,” **promote** it to `⊑`.

**Benefits:** fewer near‑duplicates, cleaner Cross‑context reuse, deterministic guards, and auditable narrowing instead of hand‑wavy “this is the version we mean.”
### Context

Kinds (C.3.1/3.2) name **what** claims quantify over; USM (A.2.6) governs **where** claims hold. In practice, procedures need **local tailoring** of kinds for a role/process (compliance profile, product line, cohort). RoleMask gives that tailoring **without** mutating describedEntity (Kind) or applicability (Scope).
### Problem

1. **Kind sprawl.** Teams mint near‑duplicate kinds (“Account\_PCI”, “Account\_Ledger”), and alignment decays.
2. **Hidden constraints.** Informal “we only accept …” statements leak into prose; guards can’t check them deterministically.
3. **Scope conflation.** Contextual requirements (jurisdiction, API version) get smuggled into “type” talk, blurring Scope vs Kind.
4. **Cross‑context fragility.** Masks don’t travel unless their constraints are mapped; teams reuse names and hope.
### Forces

| Force                                   | Tension to resolve                                                                                           |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Local specialization vs common core** | Need Context‑specific tailoring **without forking** kinds.                                                      |
| **Expressivity vs determinism**         | Masks must express real constraints **and** be **deterministically checkable** at guard time.                |
| **Context vs entity constraints**       | Conditions over **ContextSlice** (Scope) vs conditions over **entities** (membership) must be split cleanly. |
| **Reuse vs proliferation**              | Encourage reuse and promotion to subkind when stable; avoid a mask zoo.                                      |
### Solution — RoleMask (overview)

A **RoleMask** is a **named, versioned binding** `U.RoleMask(kind, Context)` that:

1. **Adds constraints** (entity‑level predicates only),
2. **Binds vocabulary/notation** (aliases, field maps) for the Context/process,
3. **May declare context expectations** (selectors over `U.ContextSlice`, e.g., jurisdiction, API version). **These are enforced via USM Scope guards** (A.2.6) and **do not** change mask membership.
4. **May narrow membership**: `Extension_mask(k, s) ⊆ Extension(k, s)` (entity‑level narrowing only),
5. **Never creates a new kind**; identity stays with `k`.
6. **Is guard‑addressable** and **deterministic** (no “latest”).

**Mask types (declared):**

* **Constraint mask** — adds constraints; may narrow membership;
* **Vocabulary mask** — aliases only; no membership change;
* **Composite mask** — both.

**Separation discipline.**

* **Entity‑level predicates** (e.g., “hasABS(x)”) → **mask membership** (narrowing).
* **Context conditions** (e.g., “jurisdiction=EU”, “API=v2.3”) → **USM Scope** guards (intersection), **not** mask membership.
  Masks **may carry both kinds** of information, but guards must route them into the **right channel**.
### Norms & Invariants (normative)

> The following formalize and expand **RM‑01…RM‑08** referenced in C.3.

#### Definition & Shape

**RM‑01 (Definition).** `U.RoleMask(kind, Context)` **SHALL** be a named, versioned record with:
(a) **intent** (what role/procedure the mask serves),
(b) **constraints** (entity‑level predicates; optional context requirements),
(c) **vocabulary/notation bindings**,
(d) **membership narrowing** definition (if any),
(e) **intended guard use**.

**RM‑02 (Not a new kind).** A RoleMask **MUST NOT** introduce a new `U.Kind`. If the domain needs a stable refinement, Contexts **SHALL** publish an explicit `SubkindOf` node (C.3.1).

**RM‑03 (Determinism).** Membership under a mask (if defined) **MUST** be **deterministic** given `slice` and published constraints; implicit “latest” is forbidden.

**RM‑04 (Mask taxonomy).** A mask **SHALL** declare its type: **constraint / vocabulary / composite**.
— **Vocabulary masks** MUST NOT change membership;
— **Constraint/composite masks** MAY narrow membership **only via entity‑level predicates**.
#### Separation of channels

**RM‑05 (Context vs entity).**

* Predicates about **entities** (features, attributes) MAY narrow membership: `Extension_mask(k, s) ⊆ Extension(k, s)`.
* Predicates about **ContextSlice** (jurisdiction, Standards, Γ\_time) **SHALL** be enforced via **USM Scope** guards (A.2.6). Masks **MUST NOT** hide Scope requirements inside membership checks.

**Guard routing.** Enforce ContextSlice predicates via **USM Scope** (A.2.6) and entity predicates via **membership**; see **Annex C.3.A §4.3 (Guard_MaskedUse)** and **§5 (E‑01)** for the normative order of checks.

**RM‑06 (Guard use).** Guards **MAY** reference a RoleMask by name **only** if the mask is **registered, versioned, and its constraints are observable** at guard time. Mask names **MUST NOT** be treated as kind synonyms.
#### Promotion & Catalog

**RM‑07 (Promotion rule).** A constraint mask reused broadly and stably **SHOULD** be promoted to an explicit **subkind** with a `⊑` link; retire the mask or keep it as a vocabulary wrapper. Editors **SHALL** track promotions in the catalog.

**RM‑08 (Catalog).** Contexts **SHALL** catalog masks (name, version, type, intent, constraints, bindings, examples, related subkinds, known bridges/adapters). Redundant masks **SHOULD** be consolidated.
#### Cross‑context use

**RM‑09 (Bridges & adapters).** If a claim uses `MemberOf(–, RoleMask(k), TargetSlice)` across Contexts, the receiving Context **SHALL** require:
(a) a **KindBridge** for `k` (`CLᵏ`, loss notes), and
(b) a **MaskAdapter** — a documented, deterministic mapping of the mask’s **entity‑level constraints** and **vocabulary bindings** into the target Context — whenever those constraints/bindings differ.
Penalties **MUST** route to **R**: `Ψ(CLᵏ)` for kind, plus any **Φ(CL)** for scope bridge.

**RM‑10 (Definedness & fail‑closed).** Mask evaluation **SHALL** state its definedness area; outside it, guards **fail closed**.
### Invariants & Non‑goals (normative)

* **No Scope leakage.** RoleMasks **cannot** widen/narrow **Claim scope (G)**; any context conditions are enforced by USM guards.
* **Identity preservation.** The carrier kind remains `k`; RoleMask does not change describedEntity.
* **Weakest‑link unaffected.** RoleMasks do not alter weakest‑link rules on **F/R**; guards **route entity predicates to membership** and **context predicates to USM Scope**.
### Interactions (informative)

#### With Kinds & Subkinds (C.3.1)

Use RoleMask for **procedural tailoring**. If the tailoring becomes **conceptual** and stable, **introduce a subkind** with `⊑` and update references.
#### With Membership & Signature (C.3.2)

* **Entity‑level constraints** live in mask membership (deterministic).
* **Signature F** belongs to the kind; raising F in the signature does not auto‑change masks.
#### With KindBridge (C.3.3)

A RoleMask crossing Contexts needs **two artifacts**: the KindBridge (`CL^k`, loss notes) and a **MaskAdapter** (how constraints/aliases translate). **R** gets both penalties; **F/G** stay intact. If the adapter systematically narrows membership in the target Context, consider **target‑side subkind**.
#### With Guards (Annex C.3.A)

Use **`Guard_MaskedUse`** (Annex **C.3.A §4.3**). It requires:
— mask registration & determinism;
— Scope coverage (A.2.6), **Γ\_time** explicit;
— where Cross‑context: KindBridge (`CL^k`) + MaskAdapter + penalties → **R**.
— **Cross‑context combo.** When masks cross Contexts, use **`Guard_MaskedUse`** together with **`Guard_XContext_Typed`** (Annex **C.3.A §4.5**) so both bridges are checked and both penalties (**Φ(CL)** and **Ψ(CLᵏ)**) land in **R**.
— **Order of checks.** Follow **Annex C.3.A §5 (E‑01)**: typed compatibility first, then Scope coverage, then penalties to **R** and freshness.
### Anti‑patterns & Remedies (informative)

| Anti‑pattern                                      | Why it’s wrong                         | Remedy                                                                                |
| ------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------- |
| Mask as “new type”                                | Duplicates kind; breaks alignment      | Keep the kind; if stable refinement → publish **subkind** (`⊑`).                      |
| Hiding Scope in mask membership                   | Conflates channels; non‑portable       | Move context conditions to **USM** guards; keep only entity predicates in membership. |
| Unregistered mask in guards                       | Non‑deterministic; un‑auditable        | Register & version the mask; fail closed otherwise.                                   |
| Cross‑context use without KindBridge/MaskAdapter     | Silent semantic drift                  | Require **KindBridge** + **MaskAdapter**; apply `Ψ(CL^k)` and any `Φ(CL)` to **R**.    |
| Mask proliferation (ten masks that mean the same) | Catalog entropy; inconsistent behavior | Consolidate; promote frequently used constraints to **subkinds**.                     |
| Treating mask name as kind synonym                | Hides constraints; invites misuse      | In prose, say “`RoleMask(k, name)`”; in guards, reference mask fields explicitly.     |
### Worked Examples (informative)

#### Vehicle@ABSOnly (constraint mask)

**Kind.** `Vehicle` (K2, signature F4).
**Mask.** `Vehicle@ABSOnly` — entity‑level predicate `hasABS(x)=true`; type **constraint**.
**Guards.** `MemberOf(–, Vehicle@ABSOnly, TargetSlice)` defined & deterministic; **Scope** (surface/speed/rig/Γ\_time) checked separately.
**Promotion?** If ABS‑only becomes a conceptual category, publish `VehicleWithABS ⊑ Vehicle` and retire the mask.
#### AuthenticatedRequest@Frontend (vocabulary mask)

**Kind.** `AuthenticatedRequest` defined by `AuthStandard v2.3`.
**Mask.** `@Frontend` binds `authHeader → X‑Auth` (aliases only); **no** narrowing; type **vocabulary**.
**Cross‑context.** If reused in another Context, require **KindBridge** for the kind; **no** MaskAdapter needed (aliases are local).
**R.** Only scope bridge penalties apply (if any).
#### AdultPatient@Clinic (composite mask) across jurisdictions

**Kind.** `AdultPatient` (≥ 18 at `Γ_time`).
**Mask.** `@Clinic`: entity constraint “DOB present”; context hint “EHR system = X” (this part routes to Scope). Type **composite**.
**Cross‑context.** Jurisdiction Y uses ≥ 21 → **KindBridge** with `CL^k=1`; **MaskAdapter** maps DOB fields.
**Guards.** Scope bridge (coding system) + KindBridge + MaskAdapter; penalties **Ψ(1)** (kind) + **Φ(CL)** (scope) to **R**.
**Outcome.** Allowed with reduced R; consider target‑side subkind `AdultPerson_Y`.
### Authoring & Review Guidance (informative)

#### Authoring a RoleMask card

**Fields (suggested).** `name`, `kind`, `type (constraint/vocabulary/composite)`, `intent`, `constraints (entity vs context split)`, `bindings`, `membership definition (if any)`, `definedness`, `examples`, `known bridges/adapters`, `promotion note`.
**Rules of thumb.**

* Keep entity predicates **small and testable**.
* Put **context** in Scope, not in membership.
* If ≥ 3 teams reuse the same constraint mask → **promotion** review.
#### Reviewer 7‑point checklist

1. Mask **registered** and **versioned**?
2. **Type** declared correctly (constraint/vocabulary/composite)?
3. Entity vs context **split** respected?
4. **Determinism** (no “latest”) satisfied?
5. Guard **routes** context to **USM** and entity to **membership**?
6. Any Cross‑context use has **KindBridge** + **MaskAdapter** with penalties **to R**?
7. **Promotion** warranted (stable, reused) or consolidation needed?
### Conformance Checklist (normative)

| ID        | Requirement                                                                                                                                                |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RM‑01** | RoleMask **SHALL** be a named, versioned record with intent, constraints, bindings, membership definition (if any), and intended guard use.                |
| **RM‑02** | RoleMask **MUST NOT** introduce a new `U.Kind`; stable refinements **SHALL** be modeled as subkinds (`⊑`).                                                 |
| **RM‑03** | Mask membership (when defined) **MUST** be deterministic given `slice` and mask fields; implicit “latest” forbidden.                                       |
| **RM‑04** | Mask **SHALL** declare its type: constraint / vocabulary / composite; vocabulary masks **MUST NOT** change membership.                                     |
| **RM‑05** | Context conditions **SHALL** be enforced via **USM Scope** guards; membership narrowing **MAY** use entity predicates only.                                |
| **RM‑06** | Guards **MAY** reference a mask only if it is **registered, versioned**, and its constraints are **observable**; mask names **MUST NOT** be kind synonyms. |
| **RM‑07** | Frequently reused constraint masks **SHOULD** be **promoted** to subkinds; editors **SHALL** track promotions.                                             |
| **RM‑08** | Contexts **SHALL** catalog masks; redundant masks **SHOULD** be consolidated.                                                                                 |
| **RM‑09** | Cross‑context masked use **SHALL** declare a **KindBridge** (`CL^k`) and any **MaskAdapter**; penalties **MUST** reduce **R** only.                            |
| **RM‑10** | Mask definedness **SHALL** be stated; guards **fail closed** outside the defined area.                                                                     |
### C.3.4:End
## KindAT — Intentional Abstraction Facet for Kinds (K0…K3)

> **One‑line summary.** Defines **KindAT** as an **informative facet** attached to `U.Kind` that classifies the **intentional abstraction stance** of a kind—**K0 Instance**, **K1 Behavioral Pattern**, **K2 Formal Kind/Class**, **K3 Up‑to‑Iso**—to **guide ΔF/ΔR planning, bridge expectations, catalog/search, and refactoring**. **KindAT is not a Characteristic**: it has **no algebra**, **no thresholds**, and **MUST NOT** appear in guards or composition math. All assurance remains in **F–G–R**; typed semantics remain in **C.3.1–C.3.4**.

**Status.** Mixed:
— **Informative** for the anchors, heuristics, examples, and guidance.
— **Normative** for the **usage rules** that forbid employing AT in guards/composition and constrain its placement.

**Placement.** Part C (Kinds), identifier **C.3.5**. Audience: engineering managers, architects, editors, assurance leads.

**Depends on.**
— **C.3.1** (`U.Kind`, `U.SubkindOf (⊑)`), **C.3.2** (`KindSignature` + F, `Extension/MemberOf`), **C.3.3** (KindBridge + `CL^k`), **C.3.4** (RoleMask).
— **A.2.6 USM** (Claim/Work scope over `U.ContextSlice`), **C.2.2 F–G–R**, **C.2.3 U.Formality (F)**.
— **MM‑CHR** distinction **Facet vs Characteristic** (editors).

**Non‑goals.**
— No numerical scale, no gating, no composition operators, no “quality” scoring.
— No effect on **F**, **G**, or **R** besides **planning hints**.

### Purpose (manager’s view)

Teams constantly decide **how far to formalize** and **how broadly to validate**:

* *Are we speaking about **this cohort** (instances), about **things that behave like X** (pattern), about a **formal class** with invariants, or about objects **up to isomorphism**?*
* *Given that stance, should we invest in **F4 predicates**, **F7 proofs**, or **R** across variants?*
* *What kind of **KindBridge** is realistic (coarse mapping vs up‑to‑iso), and what **`CL^k`** should we expect?*

**KindAT** answers these with a **small, shared vocabulary (K0…K3)** that is **safe to use** (cannot distort F/G/R) yet **actionable** for planning and catalog/search.
### Context & Rationale

#### The orthogonality we preserve

* **G (Claim scope)** is **where** a claim holds (A.2.6).
* **Kinds** give **what** a claim is about (C.3.1/3.2).
* **R** is assurance (evidence, freshness, penalties).
* **F** is expression rigor (C.2.3).

Teams often **conflate abstraction with applicability** (“sounds general ⇒ applies broadly”) or **over‑engineer proofs** where **slice‑checks** suffice. AT separates these concerns.
#### Why a facet, not a Characteristic

Per **MM‑CHR**, **Characteristics** (e.g., F, G) carry algebra and appear in guards/composition. **KindAT** is only a **tag** on `U.Kind`:

* **No algebra, no thresholds**, not used in guards.
* **Editorial placement** only: on kinds, not on claims.
* **Planning signal**: what ΔF and ΔR typically pay off; what bridge style to expect.

This keeps AT **useful** without risking a “second G” or back‑door quality scores.
#### Design choice recap (moved from C.3 §15.2)

* Making AT a Characteristic would **duplicate** G’s role and encourage gating.
* As a **facet**, AT remains a **catalog/navigation and planning device**, not an assurance dimension.
### Anchors K0…K3 (informative)

> **How to read.** Each anchor states the **intentional stance** of the kind, **inclusion cues**, **non‑examples** (to prevent misuse), and **planning hints** (ΔF/ΔR/bridge expectations). Anchors are **context‑local editorial tags** on `U.Kind`.

#### K0 — Instance‑level

**Intent.** The kind denotes **exemplars** or a **tightly curated set**; often a named cohort or a concrete template.
**Cues.** Membership relies on listing or direct identity features; little to no general invariants.
**Non‑examples.** Any kind with stable, general invariants belongs in **K2**.
**Planning hints.** Focus **R on TargetSlice** (executable checks, F5/6); avoid premature proof engineering. Bridges are **instance‑maps**; expect **low `CL^k`** outside the Context.
#### K1 — Behavioral Pattern

**Intent.** The kind is a **role/behavioral** pattern (“things that act like …”), typically stated via Standards or controlled NL, not a full type.
**Cues.** “Duck‑typing” flavor; Standards reference behavior/state transitions.
**Non‑examples.** If you can state global invariants as predicates, consider **K2**.
**Planning hints.** Invest in **F3→F4** (predicate‑like acceptances); **R** must test **behavioral diversity**; bridges are **pattern maps** with moderate `CL^k`.
#### K2 — Formal Kind/Class

**Intent.** A **formal class** with explicit **invariants/relations** (ontology class, type with Standards).
**Cues.** Predicate‑like signature, subkind lattice, invariants reviewed.
**Non‑examples.** Pure examples/cohorts (K0); informal roles (K1).
**Planning hints.** Raise **KindSignature F** to **F4+**, consider **F7** for safety‑critical cores; **R** should cover **subkinds/variants**; bridges are **type‑maps**, `CL^k` often medium/high.
#### K3 — Up‑to‑Iso

**Intent.** Defined **up to isomorphism/equivalence** (category‑theoretic flavor; “equal as structure,” not by identity); equality‑as‑structure matters.
**Cues.** Statements invariant under isomorphism; reasoning by equivalence classes.
**Non‑examples.** Classes where identity matters beyond structure.
**Planning hints.** Expect **up‑to‑iso** bridges; `CL^k` can be high where equivalence is respected. **F7–F9** likely for key properties; **R** focuses on **witnesses of equivalence** at interfaces.
### Manager Heuristics (informative)

| Decision area       | K0                               | K1                          | K2                                         | K3                                      |
| ------------------- | -------------------------------- | --------------------------- | ------------------------------------------ | --------------------------------------- |
| **ΔF investment**   | Prefer F5/6 executable semantics | F3→F4 acceptance predicates | F4→F7 (predicates/proofs)                  | F7→F9 (proof‑carrying, higher equality) |
| **ΔR design**       | Slice‑focused checks             | Behavioral diversity        | Variant/subkind coverage                   | Equivalence witnesses at boundaries     |
| **Bridge style**    | Instance map                     | Pattern map                 | Type map                                   | Up‑to‑iso / functorial                  |
| **Expected `CL^k`** | Low outside Context                 | Medium                      | Med/High                                   | High where iso holds                    |
| **Refactoring**     | Aggregate to K2 when stable      | Crystallize invariants → K2 | Maintain lattice; promote masks → subkinds | Keep iso constraints explicit           |
### Misuse & Antidotes (informative)

* **“Higher AT ⇒ wider G.”** *Wrong.* **G** changes only via **ΔG** (USM). AT does not alter scope.
* **“Gate on AT.”** *Wrong.* Use **F** thresholds and scope/evidence guards; AT is never a gate.
* **“Depth in `⊑` ⇒ AT.”** *Wrong.* AT is about **intentional stance**, not graph depth.
* **“AT on claims.”** *Wrong.* AT tags **`U.Kind` only**.
* **“AT as quality score.”** *Wrong.* Use **F** and **R** for rigor/reliability.
### Usage Rules (normative)

> These are the **only** normative constraints in this pattern. Everything else is guidance.

**AT‑01 (Facet, not Characteristic).** KindAT **SHALL** be treated as a **Facet** per MM‑CHR: it has **no algebra, no thresholds**, and **MUST NOT** appear in guards or composition math.

**AT‑02 (Placement).** If recorded, KindAT **SHALL** be attached to **`U.Kind`** (or its catalog card). It **MUST NOT** be attached to claims/capabilities or used as a proxy for **G**/**F**/**R**.

**AT‑03 (Editorial discipline).** Editors **SHALL NOT** write text implying “higher AT widens scope” or “higher AT increases rigor/reliability.” Any such text **MUST** be revised to reference **ΔG**/**F**/**R** explicitly.

**AT‑04 (Bridge neutrality).** **KindBridge** records **MUST NOT** compute or adjust AT; they may include *informative* remarks about likely anchor alignment. `CL^k` is independent of AT and is assessed from signature/order preservation.

**AT‑05 (Catalog).** Contexts that use AT **SHOULD** record it in **Kind catalog entries** alongside: signature snippet & **F**, subkinds, RoleMasks, KindBridges. Absence of AT implies **“not set”**, not K0.
### Authoring & Review Guidance (informative)

#### How to tag (fast rubric)

* If the card lists **concrete items/cohorts**, tag **K0**.
* If the card defines **behavioral obligations** in prose/templates but few global invariants, tag **K1**.
* If the card states **predicates/invariants** and participates in a **subkind lattice**, tag **K2**.
* If the card explicitly reasons **up to isomorphism**, tag **K3**.
#### Review checklist (5 minutes)

1. Is the **carrier** a **`U.Kind`** (not a claim)?
2. Does the **tag** match the **signature** (intent)?
3. Are **ΔF**/**ΔR** implications noted for planning (not gating)?
4. Any **RoleMasks** that should be promoted to subkinds (K2 hygiene)?
5. Any **Cross‑context reuse** that suggests **bridge style** (pattern/type/iso)?
### Integration Notes (informative)

* **With C.3.1/3.2 (Kinds, Signature, Extension).** AT guides *how* to evolve signature **F** and *what* R coverage is sensible; it **does not** change membership semantics.
* **With C.3.3 (KindBridge).** AT hints at likely **bridge style** (instance‑map / pattern‑map / type‑map / up‑to‑iso), but **`CL^k`** is still computed from signature/order preservation; penalties route to **R**.
* **With C.3.4 (RoleMask).** Persistent K1‑style masks often warrant **promotion to K2 subkinds**.
* **With A.2.6 (USM).** All scope decisions remain under **G**. AT text should never be used to infer coverage.
* **With C.2.3 (F).** AT does not raise/lower **F**; it **suggests** where raising F is cost‑effective.
### Worked Mini‑Examples (informative)

* **K0 (Instance).** `Account_US_GAAP_2025_Q1_Cohort`. Plan **R** slice checks; avoid type‑maps across Contexts.
* **K1 (Behavior).** `CacheableRequest` (“idempotent under retry; cache key well‑formed”). Raise **F3→F4**; design **R** for failure‑mode diversity; expect **pattern bridges**.
* **K2 (Formal).** `Account` with invariants (balance = debits−credits; posting rules). Raise **F4+**; plan **R** over `Asset`/`Liability` subkinds; bridge via **type maps**.
* **K3 (Up‑to‑Iso).** `UndirectedGraph` up to node relabeling. Expect **up‑to‑iso bridges**; proofs at **F7+**; **R** checks interface equivalence witnesses.
### Conformance Checklist (normative)

| ID        | Requirement                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| **AT‑01** | KindAT is treated as **Facet** (no algebra/thresholds); **MUST NOT** appear in guards/composition.            |
| **AT‑02** | AT **MUST** be attached to **`U.Kind`** only (if used); not to claims/capabilities.                           |
| **AT‑03** | Editorial text **MUST NOT** imply AT alters **F/G/R**; revise to name **ΔF/ΔG/ΔR** instead.                   |
| **AT‑04** | KindBridge **MUST NOT** compute/alter AT; `CL^k` is assessed independently.                                   |
| **AT‑05** | If a Context catalogs AT, it **SHOULD** include it in Kind cards with signature **F**, subkinds, masks, bridges. |
### C.3.5:End
## Typed Guard Macros for Kinds + USM (Annex)

> **One‑line summary.** Provides **normative guard macros** that combine **USM Scope** (A.2.6) with **Kind‑CAL** (C.3.x) so authors can gate state changes and compositions that **quantify over kinds** without conflating **describedEntity** (Kinds) with **applicability** (Scope **G**) or **assurance** (**R**). Includes **decision trees, anti‑patterns, and examples** (informative). **AT (KindAT)** is **never** used in guards.

**Status.** Mixed:
— **Normative**: guard macro clauses, evaluation order, fail‑closed discipline, conformance checklist.
— **Informative**: …  decision trees, anti‑patterns, worked examples, macro skeletons.

**Placement.** Part C (Kinds), identifier **C.3.A** (Annex). Audience: engineering managers, editors, reviewers, assurance leads.

**Depends on.**
— **A.2.6 USM**: `U.ContextSlice`, `U.ClaimScope` (**G**), `U.WorkScope`, ∈/∩/**SpanUnion**/translate, **Γ\_time** policy, Bridge + **CL** (scope).
— **C.3.1**: `U.Kind`, `U.SubkindOf (⊑)`; **C.3.2**: `KindSignature` (with **F**) and `Extension/MemberOf`; **C.3.3**: **KindBridge** + `CL^k` (kind‑congruence) & loss notes; **C.3.4**: **RoleMask**.
— **C.3.5**: **KindAT** (facet) — **explicitly forbidden** in guards.
— **C.2.2 F–G–R**: weakest‑link, penalties to **R** only; **C.2.3 F**: F0…F9 (expression rigor).
— **Part B Bridges & CL**: scope bridge semantics and CL ladder.

### Purpose & Audience

**Purpose.** Give Contexts a **single set** of guard shapes to:
(a) **admit** typed claims safely,
(b) **compose** typed claims/specs,
(c) **use** RoleMasks properly, and
(d) **reuse across Contexts** via **both** scope and kind bridges—**without** inventing new scales or conflating **G**, **F**, and **R**.

**Audience.** Engineering managers and reviewers who must read/author guards that are **legible, deterministic, and auditable** in context.
### Context & Problem

Projects often:

* treat **“more abstract wording”** as wider **G**,
* glue claims with incompatible **describedEntity** (kinds),
* move typed content across Contexts without **declared bridges**,
* or bake **AT** (abstraction vibe) into decision logic.

**C.3.A** fixes this by supplying guard macros that:
— **separate** typed compatibility (kinds) from **Scope** coverage (USM),
— require **both** bridges where needed,
— push congruence penalties to **R** only, and
— forbid **AT** in guards.
### Solution Overview (what these guards do)

All guards in this Annex share three invariants:

1. **Fail‑closed.** If any required predicate is undefined/false, the guard **denies** the transition.
2. **Deterministic.** Given a fixed **TargetSlice** (with explicit **Γ\_time**) and published declarations, evaluation yields one outcome.
3. **Separation of concerns.**
   *Typed compatibility* (same‑Context `⊑` or **KindBridge**) is **not** Scope.
   *Scope coverage* is a USM set‑membership judgment over **Context slices**.
   *Assurance penalties* (**Φ(CL)** for scope bridges; **Ψ(`CL^k`)** for kind bridges) reduce **R** only.
### Normative Guard Macros

> **Notation.** “**SHALL**” clauses are normative obligations. “Notes” are informative reminders. Names like `Guard_TypedClaim` are editorial handles; Contexts may alias them, but **MUST** preserve semantics. Macro names (e.g., `Guard_TypedClaim`) are editorial handles; Contexts may alias them provided the logical obligations are preserved.

#### Guard\_TypedClaim — admit a claim quantified over a kind

**Intent.** Approve a state transition that asserts Claim **C** which quantifies over `U.Kind` **k** at **TargetSlice**.

**Guard\_TypedClaim(C, k, TargetSlice, thresholds?)** — **SHALL** include, in this order:

1. **ScopeCoverage.** `U.ClaimScope(C) covers TargetSlice`. *(USM A.2.6)*
2. **Γ\_time declared.** TargetSlice **SHALL** specify **Γ\_time** (point/window/policy). No “latest”. *(A.2.6)*
3. **Kind definedness.** `MemberOf(?, k, TargetSlice)` is **defined and deterministic**. *(C.3.2 K‑05/K‑07)*
4. **Typed compatibility.**
   4.1 **same Context**: if C expects `k′`, require `k ⊑ k′`. *(C.3.1)*
   4.2 **Cross Context**: if Contexts differ, require a declared **KindBridge** that maps `k → k′` and publishes **`CL^k ≥ c`** with loss notes. *(C.3.3)*
5. **Assurance penalties (R only).** If step 4.2 used a KindBridge, the guard **SHALL** apply a monotone penalty **Ψ(`CL^k`)** to **R**. If a **Scope bridge** was used to move C’s Scope (USM), apply **Φ(CL)** to **R**. *(C.2.2 + C.3.3 + Part B)*
6. **Evidence freshness (if trust is implied).** Freshness windows and expiry checks **SHALL** be separate predicates (not Scope). *(C.2.2)*
7. **Formality threshold (if ESG mandates).** If the Context gates rigor, require `U.Formality(C) ≥ F_k`. *(C.2.3)*

**Prohibitions.**
— **AT forbidden.** KindAT **MUST NOT** appear in this guard. *(C.3.5 AT‑01/02)*
— **No “domain” placeholders.** Guards **SHALL** name an addressable **TargetSlice**, not a fuzzy “domain”.
#### Guard\_TypedJoin — compose two typed claims/specs (A → B)

**Intent.** Permit composition where **A** produces facts over `k_A` and **B** consumes `k_B`.

**Guard\_TypedJoin(A, k\_A; B, k\_B; TargetSlice)** — **SHALL** include:

1. **TypedCompat.**
   1.1 **same Context**: require `k_A ⊑ k_B`.
   1.2 **Cross Context**: require **KindBridge** mapping `k_A → k′_B` with **`CL^k ≥ c`** and `k′_B ⊑ k_B`.
2. **ScopeSerial.** Compute `Scope_serial = ClaimScope(A) ∩ ClaimScope(B)`. Require `Scope_serial covers TargetSlice`. *(A.2.6)*
3. **Penalties (R only).** Apply **Ψ(`CL^k`)** if a KindBridge was used; apply **Φ(CL)** if a Scope bridge was used. *(C.2.2 / Part B / C.3.3)*
4. **Freshness.** Guard **SHALL** assert required freshness windows for evidence **along the serial path**.
5. **No type‑by‑scope.** The guard **MUST NOT** widen Scope to “fix” a type mismatch; remedies are subkind introduction, adapter, or bridge.

**Mask awareness.** If B expects a **RoleMask(k\_B)**: either show A’s outputs already satisfy mask constraints, or add a documented **mask adapter** (see 4.3) and treat any **contextual** constraints as part of **ScopeSerial**.
#### Guard\_MaskedUse — use a RoleMask with a kind

**Intent.** Use `U.Kind` **k** under a **RoleMask** **m** in Context **R**.

**Guard\_MaskedUse(k, m, TargetSlice)** — **SHALL** include:

1. **MaskRegistered.** `RoleMask(k, m, version)` is **registered and versioned**. *(C.3.4 RM‑06)*
2. **MaskDeterminism.** All mask constraints are **observable** on TargetSlice; if the mask narrows membership, it **SHALL** be deterministic. *(RM‑03)*
3. **MaskType clarity.** Mask **SHALL** declare its type: constraint / vocabulary / composite. *(RM‑04)*
4. **Promotion cue.** If mask is reused widely as a de‑facto subkind, editors **SHOULD** promote it to an explicit `⊑` link. *(RM‑05)*
5. **Cross‑context use.** If `TargetSlice.Context ≠ owner(k).Context`, require:
   5.1 **KindBridge** with **`CL^k ≥ c`**;
   5.2 **MaskAdapter** (if constraints need translation), deterministic;
   5.3 Penalty **Ψ(`CL^k`)** to **R**. *(RM‑07 + C.3.3)*
6. **ScopeCoverage.** `U.ClaimScope(artifact) covers TargetSlice`. *(A.2.6)*

**Prohibitions.**
— **Mask ≠ Kind.** Guards **MUST NOT** treat the mask name as a synonym for the Kind. *(RM‑06)*
#### Guard\SpanUnion\Typed — publish parallel coverage across independent support lines

**Intent.** Publish **SpanUnion** of scopes for **the same typed claim** supported by **independent** lines `L₁…Lₙ`.

**Guard\_SpanUnion\_Typed(C, k, {Lᵢ})** — **SHALL** include:

1. **Per‑line discipline.** For each line `Lᵢ`, first satisfy **Guard\_TypedClaim(C, k, Sliceᵢ)** (or its Cross‑context variant) at the relevant slices/supports.
2. **Independence justification.** Publisher **SHALL** include a partition or certificate showing that essential components of `Lᵢ` are **disjoint** from `Lⱼ` (no shared weakest link). *(A.2.6 §7.3)*
3. **Published scope.** `Scope_published = SpanUnion({Sᵢ})`, where each `Sᵢ` is the serial scope for line `Lᵢ`.
4. **No overreach.** The union **MUST NOT** include slices not covered by any `Sᵢ`.
5. **Typed consistency.** The **describedEntity** (kind **k**) is **the same** across lines; if not, normalize via subkinds or adapters before union.

**Note.** Independence and union rules are USM‑native; this macro ties them to typed claims without adding new algebra.
#### Guard\XContext\Typed — Cross‑context typed reuse (both bridges)

**Intent.** Reuse **C** quantified over **k** in another Context’s **TargetSlice**.

**Guard\_XContext\_Typed(C, k, TargetSlice)** — **SHALL** include:

1. **Scope bridge.** There **exists** a Scope Bridge **b\_s** `(source = owner(C).Context, target = TargetSlice.Context)` with **CL ≥ c\_s**. *(Part B)*
2. **Kind bridge.** There **exists** a KindBridge **b\_k** `(source = owner(k).Context, target = TargetSlice.Context)` with **`CL^k ≥ c_k`**. *(C.3.3)*
3. **Mapped scope coverage.** `Scope′ = translate(b_s, ClaimScope(C))` and `Scope′ covers TargetSlice`.
4. **Mapped kind definedness.** `k′ = translate(b_k, k)` and `MemberOf(?, k′, TargetSlice)` is **defined**.
5. **Penalties (R only).** Apply **Φ(CL(b\_s))** and **Ψ(`CL^k(b_k)`)** to **R**.
6. **Loss notes.** Publisher **SHALL** attach loss notes from both bridges (rig bias, collapsed subkinds, etc.).

**Prohibitions.**
— **Do not** “merge” bridges; Scope and Kind are orthogonal channels.
— **Do not** alter **F** or **G** due to `CL`/`CL^k`; penalties land in **R** only.
### Evaluation Semantics & Order (normative)

**E‑01 (Order of checks).** Guards **SHALL** check **typed compatibility first** (same‑Context `⊑` or KindBridge), **then** Scope coverage (USM), **then** apply penalties to **R** and verify freshness.

**E‑02 (Determinism).** Given fixed inputs (slices, bridges, versions), evaluation **MUST** be deterministic. “Latest” time, unversioned Standards, or implicit mappings are disallowed.

**E‑03 (Fail‑closed).** Undefined membership (`MemberOf`) or missing bridge **MUST** cause guard failure.

**E‑04 (No AT in guards).** AT is an editorial facet and **MUST NOT** be referenced. *(C.3.5 AT‑01/02)*

**E‑05 (Weakest link on congruence).** For chained bridges, effective **CL** / **`CL^k`** is the **minimum** of links.

**E‑06 (Separation of predicates).** Scope coverage and evidence freshness **SHALL** be distinct predicates; do not fold freshness into Scope or kinds.

**Evaluation order.** Apply checks in the order defined in **§5 (E‑01)**: typed compatibility → Scope coverage → penalties to **R** → freshness.
### Conformance Checklist (normative)

| ID        | Requirement                                                                                                                              |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **GC‑01** | Guards that admit/compose typed claims **SHALL** use **Guard\_TypedClaim** or **Guard\_TypedJoin** (or proven‑equivalent Context aliases).  |
| **GC‑02** | Guards that use RoleMasks **SHALL** use **Guard\_MaskedUse** (or equivalent) and comply with RM‑01…RM‑07.                                |
| **GC‑03** | Cross‑context typed reuse **SHALL** use **Guard\_XContext\_Typed** with **both** bridges; penalties **MUST** route to **R** (Φ/Ψ), not to F/G. |
| **GC‑04** | All guards **SHALL** declare **Γ\_time** explicitly and **SHALL** fail closed on undefined membership or missing bridges.                |
| **GC‑05** | Guards **MUST NOT** reference **AT**; any such reference **MUST** be removed or replaced with ΔF/ΔG/ΔR predicates.                       |
| **GC‑06** | Scope union **MUST** follow USM **SpanUnion** rules (independence justification); typed union **MUST NOT** change describedEntity.             |

#### What counts as “proven‑equivalent” (editorial rule)

A Context may adopt a different surface phrasing **iff** the Context’s guard contains **all** obligations listed in the relevant macro, in the same logical roles (typed compatibility, Scope coverage, R penalties, freshness).
#### Where penalties land (assurance calculus hook)

**Norm.** **Φ(CL)** (scope congruence) and **Ψ(`CL^k`)** (kind congruence) are **monotone non‑increasing** functions into **R**. Contexts **SHALL** calibrate them per policy; this Annex does not prescribe numeric forms.
#### Minimal conceptual formulas (informative)

* **R after bridges:** `R_final = R_base × Φ(CL_scope) × Ψ(CL_kind)` (concept only).
* **No arithmetic on F/G.** F is ordinal (thresholds only); G is set‑valued (membership only).
### Decision Trees (informative)

**D1 - Admitting a typed claim**

1. **same Context?** If **yes** → check `⊑` (`k ⊑ k′` if expected). If **no** → require **KindBridge**.
2. **Scope coverage?** Compute `covers(TargetSlice)`.
3. **Membership defined?** `MemberOf(?, k(′), TargetSlice)` defined? If **no** → deny.
4. **Bridges used?** Apply penalties **Φ/Ψ** to **R**.
5. **Freshness?** Check windows. **Optional**: `F ≥ F_k` if ESG mandates.

**D2 - Composing A → B**

1. Typed: `k_A ⊑ k_B` or **KindBridge** to `k′_B ⊑ k_B`.
2. Scope: `Scope(A) ∩ Scope(B)` covers TargetSlice.
3. Penalties: apply **Φ/Ψ** to **R**.
4. Freshness: along serial path.
5. If **mask** expected: either A implies it or add **mask adapter**.

**D3 - Union across lines**

1. Prove per‑line typed admission.
2. Provide independence partition.
3. Publish **SpanUnion**; no extrapolation.
### Guard Anti‑patterns & Remedies (informative)

| Anti‑pattern                                     | Why it’s wrong                         | Remedy                                                             |
| ------------------------------------------------ | -------------------------------------- | ------------------------------------------------------------------ |
| **Widening G** to “fit” a type mismatch          | Conflates describedEntity with applicability | Introduce subkind, adapter, or KindBridge; keep G honest           |
| **Using mask name as kind**                      | Hides constraints; breaks determinism  | Register mask; reference constraints; promote to subkind if stable |
| **Ignoring `CL^k`** in Cross‑context classification | Under‑counts risk; silent drift        | Require KindBridge; apply **Ψ(`CL^k`)** to **R**                   |
| **Inferring Scope from Extension size**          | Scope ≠ Extension                      | Keep Scope (where) distinct from Extension (which instances)       |
| **Implicit “latest”** time                       | Non‑deterministic; non‑auditable       | Declare **Γ\_time** policy explicitly                              |
| **Gating on AT**                                 | AT is a facet, not a Characteristic    | Replace with ΔF thresholds or Scope/Evidence predicates            |
### Worked Examples (informative, brief)

> Detailed scenarios remain in **C.3 §11**. This Annex sketches how the macros apply; cross‑reference as needed.

**E1 — Safety braking policy (same Context).**
Use **Guard\_TypedClaim**: `PassengerCar ⊑ Vehicle` passes; `ClaimScope` ∩ plant scopes covers TargetSlice; no bridges → no penalties; freshness checked.

**E2 — Cross‑plant reuse (both bridges).**
Use **Guard\_XContext\_Typed**: Scope bridge (CL=2) narrows temp; KindBridge (`CL^k=2`) collapses EV subkind. Apply **Φ(2)**×**Ψ(2)** to **R**; publish loss notes.

**E3 — API rule with adapter.**
Use **Guard\_TypedJoin**: producer `Request` → consumer expects `AuthenticatedRequest`. Either prove `⊑` or add adapter; Scope remains separate (API v2.3 with Γ\_time window).

**E4 — Masked clinic cohort across jurisdiction.**
Use **Guard\_MaskedUse** + **Guard\_XContext\_Typed**: registered mask, deterministic DOB constraint; KindBridge `CL^k=1`; Scope bridge CL depends on coding; penalties to **R**; Scope narrowed to overlap.
### Rationale (why an Annex) (informative)

* **Focus.** Keeps **guard mechanics** together, easing adoption in ESG/Method templates.
* **Separation.** Prevents leakage of AT/typed flavor into “Scope math”.
* **Auditability.** Standard shapes let reviewers check determinism, bridges, penalties, and freshness quickly.
* **Inter‑pattern glue.** Hooks **USM**, **Kind‑CAL**, **Bridges**, and **F–G–R** without inventing new scales.

#### C.3.A:Annex A - How typed reasoning plugs into Compliance & Regulatory Alignment \[A/I]

> **For managers.** This section shows how to make **regulatory adoption and reuse** precise, auditable, and portable using **Kinds**, **KindBridges** (with a kind‑bridge congruence level, noted as **CL^k** for editors), and **USM Scope**. It cleanly separates *what the law is about* from *where and when it applies*, and routes any cross‑jurisdiction uncertainty to **R** (assurance). It never changes **F** (form) or **G** (scope) to hide mismatches.

##### C.3.A:A.1 Purpose & fit

**What this solves.** Regulations and standards name classes of things (“**Adult person**,” “**Class II medical device**,” “**Personal data**,” “**Lease**”). In one context they are native; in another they are foreign. Without typed reasoning, teams either (a) hand‑translate terms (silently changing meaning), or (b) reduce everything to Context labels (“domain = EU”), which cannot be checked by guards.

**What we add.**

1. Model regulatory categories as **Kinds** (with `KindSignature` and `⊑`),
2. map them across Contexts with **KindBridges** and **type‑congruence `CL^k`**,
3. express **Claim scope (G)** over **Context slices** that explicitly list *jurisdiction, version, and a time selector (Γ_time)*, and
4. apply **R‑penalties** (`Ψ(CL^k)`and, if scope is bridged,`Φ(CL)`) while **keeping F and G unchanged**.
##### C.3.A:A.2 Normative obligations

**Conformance.** A model or authoring action conforms to A.2 iff it satisfies **C‑REG‑1..C‑REG‑8** below.

**C‑REG‑1 (Regulatory kinds).** Regulatory categories **SHALL** be represented as `U.Kind` in the authority’s Context (e.g., `AdultPerson@RegY`, `MedicalDeviceClassII@FDA`, `PersonalData@GDPR`, `Lease@IFRS`). Each such kind **SHALL** have a `KindSignature` with a declared **F** level (C.3.2).

**C‑REG‑2 (KindBridge).** Cross‑context reuse of a regulatory category **MUST** declare a **KindBridge** with a kind‑bridge congruence level (**CL^k**) and **loss notes** (C.3.3). The mapping **SHALL** preserve the “is‑a / subkind‑of” direction and **MUST NOT** invert it.

**C‑REG‑3 (Scope is USM).** Regulatory **applicability** (jurisdiction, effective dates, product families, platforms) **SHALL** be expressed as **Claim scope (G)** over `U.ContextSlice`, with an explicit **time selector (Γ_time)**. Applicability **MUST NOT** be encoded into kinds.

**C‑REG‑4 (No synonym shortcuts).** Editors **MUST NOT** treat legal terms as synonyms of local kinds without a KindBridge. Any term alignment **SHALL** be documented (mapping + `CL^k` + loss notes).

**C‑REG‑5 (Determinism).** `MemberOf(e, k_reg, slice)` **MUST** be deterministically evaluable when used in guards (no “latest law” or unstated grace periods).

**C‑REG‑6 (Penalties land in R).** When a claim or guard relies on Cross‑context classification (membership decided via a KindBridge), the receiving Context **MUST** apply the **kind‑bridge penalty** (based on **CL^k**) to **R**; if the **Scope** is also bridged, apply the **scope‑bridge penalty** (based on **CL**) to **R** as well. **Invariant:** penalty routing changes **R** only; **F** and **G** remain unchanged.

**C‑REG‑7 (Editioning).** Changes in law/regulator guidance that alter membership or applicability **SHALL** be recorded as content changes: update `KindSignature` (kinds) and/or update **Claim scope** (ΔG±). Guards **MUST** name a time selector (Γ_time) and **MUST NOT** rely on an implicit “latest” time.

**C‑REG‑8 (Masks, not clones).** Local process nuances (e.g., clinic‑specific cohort definitions) **SHALL** be captured with **RoleMasks** over the adopted kind; editors **MUST NOT** clone a new kind unless a stable **subkind** is warranted.
##### C.3.A:A.3 Guard macros (ready to use)

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
##### C.3.A:A.4 Worked examples \[I]

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
##### C.3.A:A.5 Design guidance & pitfalls \[I]

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
##### C.3.A:A.6 Migration checklist \[I]

1. **Inventory** regulatory references in policies/specs.
2. **Create Kind cards** for referenced legal categories (intent summary, `KindSignature` + **F**, known subkinds, AT tag if helpful).
3. **Publish KindBridges** to your local kinds with `CL^k` and loss notes.
4. **Rewrite guards** to use **Scope coverage** (USM) plus `MemberOf` on the mapped kind; add an explicit **time selector (Γ_time)**.
5. **Wire penalties**: `Ψ(CL^k)` and `Φ(CL)` lower **R**; refresh evidence windows.
6. **Catalog RoleMasks** for local nuances; promote frequently reused masks to **subkinds**.
##### C.3.A:A.7 Manager’s one‑page pattern \[I]

* **Question 1 — Where does the rule apply?** → **Scope (G)** over **Context slices** (jurisdiction, plant, Standard, and a **time selector (Γ_time)**).
* **Question 2 — About what things?** → **Kind** (regulatory category) with a **KindBridge** if foreign.
* **Gate recipe.** **Scope covers the TargetSlice** and **membership for the mapped kind is defined**, and **both bridges are present where needed**; then **apply bridge penalties to R** and decide.
* **Change handling.** New law edition? Update `KindSignature`/Bridge (kinds) and/or **Scope** (ΔG); never rely on “latest.”
* **Accountability.** Keep **loss notes**, **CL/CL^k**, and **Γ\_time** in the decision record.
#### C.3.A:Annex B - How typed reasoning plugs into Assurance Lanes (VA/LA/TA) & Evidence design \[A/I]

**Intent (manager’s view).** Typed reasoning turns “prove/test/qualify” into a **repeatable plan**. By making *what the rule talks about* explicit (named **Kinds**, their **subkinds**, and optional **RoleMasks**), you can:

1. design **proof obligations** that actually quantify over the right things (VA),
2. build **test plans** that cover the **right variants/subkinds** in the **right context slices** (LA), and
3. isolate **tool risk** (TA) instead of letting it bleed into scope or type semantics.

**Invariant reminders.**
— **Scope (G)** is *where* a claim holds — expressed over `U.ContextSlice` (with an explicit time selector, **Γ_time**).
— **Kind membership** is *which things* the claim ranges over inside that slice — checked with `MemberOf(… , kind, slice)`.
— **Bridge penalties**: the **scope‑bridge penalty** (based on **CL**) and the **kind‑bridge penalty** (based on **CL^k**) both lower **R** (assurance). They never change **F** (form) or **G** (scope).

##### C.3.A:B.1 What you get with typed assurance \[I]

* **Targeted proofs (VA).** If a policy says “for every **PassengerCar** …” (notation hint: ∀x:PassengerCar), the VA lane now has a clear target. You can prove obligations **once for the kind** (and its subkinds), instead of re‑proving per ad‑hoc label.
* **Subkind‑aware test plans (LA).** Test matrices are indexed by **subkinds** (and RoleMasks) × **context slices**; coverage stops being accidental.
* **Deterministic guards.** A test/proof either **applies** to the TargetSlice and Kind (`Scope covers & MemberOf defined`) or it doesn’t. No “latest,” no silent widening.
* **Clean tool boundaries (TA).** You qualify the **prover/model‑checker/classifier** once and route **tool confidence** to TA, not to “broadened” claims.
##### C.3.A:B.2 Normative obligations for evidence design

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
##### C.3.A:B.3 Designing the evidence matrix \[I]

A practical way to plan LA/VA is a **matrix**:

| Row set                       | Column set                                                   | Cell content                                                                                                           |

| ----------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| **Kinds** (subkinds or masks) | **Context slices** (Standard versions, env ranges, `Γ_time`) | **Evidence unit** (proof fragment, test batch, monitoring window), with **Scope** and **MemberOf** predicates attached |

* **Choose rows.** Start with the kind and list **relevant subkinds** (notation hint: kᵢ is a subkind of k) or stable **RoleMasks**.
* **Choose columns.** Split your declared **Scope (G)** into **named slices** you intend to support (e.g., “dry, speed up to 50” and “wet, speed up to 40” with specific rigs and versioned Standards).
* **Fill cells.** Attach one or more **evidence units** per cell (proof obligations for VA; test campaigns/monitoring windows for LA). Mark **bridged** cells and their **CL/CL^k** penalties to **R**.

> **Tip.** For formal kinds and “up‑to‑iso” kinds (AT K2/K3), expect **more rows** (more variants to cover). For instance‑like kinds (AT K0), expect **fewer rows** and **tighter columns** (narrow slices, stricter freshness).
##### C.3.A:B.4 VA lane — proofs that match the kind \[A/I]

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
##### C.3.A:B.5 LA lane — tests & monitoring that cover the right variants \[A/I]

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
##### C.3.A:B.6 TA lane — tool qualification where it belongs \[A/I]

**What TA contributes.** Confidence in **provers, checkers, model‑checkers, data classifiers** and pipelines. TA is about the **machinery**, not the **claim** or **kind** semantics.

**TA‑patterns (informative):**

* **Prover kernels.** Audit/qualification of the kernel version used for VA proofs.
* **Automated Model‑checkers.** Qualification against seeded faults; document limits (precision, nondeterminism).
* **Classifiers used for `MemberOf`.** If membership uses ML or rules engines, qualify the **classifier** separately; any drift monitoring belongs to LA freshness.

**TA‑obligations (normative):**

* **TA‑1.** Tools critical to VA/LA **SHALL** declare their qualification status and version; guards **SHALL** reference these declarations when they matter.
**TA‑2.** Lower tool qualification **MUST NOT** be hidden by relaxing **F** or widening **G**. target‑contexts may offset it by demanding **more evidence** in **R** (for example, extra tests), per policy.
##### C.3.A:B.7 Guard macros for evidence planning & attachment

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
##### C.3.A:B.8 Anti‑patterns & remedies

| Anti‑pattern                       | Why it’s risky                                | Remedy                                                              |
| ---------------------------------- | --------------------------------------------- | ------------------------------------------------------------------- |
| “We tested one golden case.”       | Hides variant risk; ignores subkinds.         | Build a subkind‑indexed matrix; add boundary tests per column.      |
| “Latest data suffices.”            | Non‑deterministic; un‑auditable.              | Declare `Γ_time` windows; fail closed on expiry.                    |
| “Tool is trusted, so we’re done.”  | Confuses TA with VA/LA; misses content risk.  | Keep TA separate; add VA proofs or LA tests as needed.              |
| Bridging without penalties         | Understates risk; mapping gaps surface later  | Apply **scope‑bridge** and **kind‑bridge** penalties to **R**; publish loss notes. |
| Widening G to cover evidence gaps. | Conflates applicability with available tests. | Keep G honest; expand matrix or lower claim scope explicitly (ΔG−). |
| Inferring scope from how many items match    | Scope is not the same as membership      | Keep **Scope** (where it applies) distinct from **membership** (which items match in the slice). |
##### C.3.A:B.9 End‑to‑end example (manager’s cheat‑sheet) \[I]

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
#### C.3.A:Annex C. ESG guards

**Status note.** This profile restates the guard semantics from **§4** for ESG/Method contexts. It does **not** add obligations; where wording diverges, **§4 controls**.

##### C.3.A:C.1 ESG guard obligations (normative)

When a state transition publishes or affirms a claim that quantifies over kinds, the guard **SHALL**:

1. **Scope coverage (USM).**
   `U.ClaimScope(Claim) covers TargetSlice` (singleton or finite set) and TargetSlice **declares `Γ_time`** (no “latest”).

2. **Typed definedness.**
   A **deterministic membership check** is available for every kind used by the claim in the **TargetSlice**. If membership cannot be evaluated in that context, the guard **fails closed**.

3. **Typed compatibility (same Context).**
 If a downstream consumer expects a specific kind, then for each kind used by the claim either:
* the used kind is an **is‑a / subkind‑of** the expected kind, or
* a documented **RoleMask** for the expected kind is used and its constraints are **met and observable** in the **TargetSlice**.

3. **Typed compatibility (Cross‑context).**
  If any referenced kind is **used across Contexts**, a **KindBridge** **SHALL** be declared with a published **type‑congruence level** (minimum acceptable level per Context policy), order preserved (no inversions), and **loss notes**.  
The guard **SHALL** apply the **kind‑bridge penalty** to **R**.

4. **Scope translation (Cross‑context claim use).**
If the Claim’s scope originates in another target‑context, a **Scope Bridge** with a published **congruence level** is required; apply the **scope‑bridge penalty** to **R**.

6. **Formality threshold (if gated).**
   If the ESG state requires rigor, enforce `U.Formality(Claim) ≥ F_k` (C.2.3).
   (*Note:* Raising F does **not** widen G; do not substitute.)

7. **Evidence freshness (R).**
   Where the new state implies trust, assert freshness windows and confirm **no expired bindings**.

**Prohibitions (normative).**

* Do **not** widen **G** to “hide” a type mismatch. Fix typed compatibility (introduce a subkind, use a RoleMask, publish a KindBridge) or reject.
* Do **not** treat a **mask name** as a kind—masks must be **registered** and **deterministic**.
* Do **not** infer G from the size of a kind’s **Extension**; **Scope ≠ Extension**.
##### Method–Work guard obligations (normative)

To admit a **capability** for a specific **Work** step at **JobSlice**, the guard **SHALL**:

1. **Work scope coverage (USM).**
   The capability’s **Work scope** covers the **JobSlice**, and the **JobSlice** includes an explicit **time selector (Γ_time)**.


2. **Measures & qualification.**
   **All** required `U.WorkMeasures` hold at JobSlice and the `U.QualificationWindow` is **valid at `Γ_time`**.

3. **Typed inputs (same Context).**
   For each declared input kind (or RoleMask), assert:
   * **Membership check available:** the system can deterministically decide whether the input belongs to the expected kind in this **JobSlice**.
   * **Compatibility:** the provided input kind is an **is‑a / subkind‑of** the expected kind, or the **RoleMask** constraints are satisfied and observable.

3. **Typed outputs / post‑conditions (if declared).**
   If the capability guarantees an output kind `k_out`, record the obligation to **demonstrate** `MemberOf(output, k_out, JobSlice)` (typically via conformance tests or audits).

4. **Cross‑context typed use.**
   If inputs/outputs are typed in a different target‑context than the capability or JobSlice:
   * **KindBridge(s)** are required with a published **type‑congruence level** and **loss notes**; apply the **kind‑bridge penalty** to **R**.
   * If the capability resides in another target‑context, a **Scope Bridge** with a published **congruence level** is required; apply the **scope‑bridge penalty** to **R**.

4. **No substitution by G.**
   Do not “fix” a typed mismatch by widening the **Work scope**. Use an **adapter** or a **RoleMask**, or reject.
##### Guard macros (ready‑to‑use)

**ESG\_TypedGate(Claim, TargetSlice, Kinds, thresholds)**
*Manager view:* The following macros are for editors; target‑contexts may automate them if desired. Managers can read the comments on each step; the checks are the same ones described in Plain language above.

```
1  assert ClaimScope(Claim) covers TargetSlice                 // USM
2  assert Γ_time(TargetSlice) is explicit                  // no "latest"
3  for each kind k in Kinds used by Claim:
4      assert membership_defined(k, TargetSlice)               // C.3.2 K-07
5  if same-Context typed expectations exist:
6      assert is_subkind(k, k_expected) OR meets_mask_constraints(k_expected, TargetSlice)
7  if cross-context kinds:
8      assert KindBridge(k, k') with type_congruence ≥ c_kind and loss notes
9      apply_kind_bridge_penalty(type_congruence)
10 if cross-context scope:
11     assert ScopeBridge(Claim.Context, TargetSlice.Context) with congruence ≥ c_scope
12     apply_scope_bridge_penalty(congruence)
13 if F-threshold applies: assert Formality(Claim) ≥ F_k        // C.2.3
14 if trust implied: assert Fresh(evidence, window) AND NoExpiredBindings
```

**MethodWork\_TypedGate(Capability, JobSlice, Inputs/Outputs, thresholds)**

```
1  assert WorkScope(Capability) covers JobSlice                // USM
2  assert Γ_time(JobSlice) is explicit
3  assert WorkMeasures(JobSlice) satisfied AND QualificationWindow holds
4  for each expected input-kind k_in:
5      assert membership_defined(k_in, JobSlice)
6      assert is_subkind(k_input, k_in) OR meets_mask_constraints(k_in, JobSlice)
7  if declared output-kind k_out: record obligation to show MemberOf(output,k_out,JobSlice)
8  if cross-context kinds: assert KindBridge(… ) with type_congruence ≥ c_kind; apply_kind_bridge_penalty(type_congruence)
9  if cross-context capability/scope: assert ScopeBridge(… ) with congruence ≥ c_scope; apply_scope_bridge_penalty(congruence)
```
##### Worked examples (manager‑focused)

**(A) ESG — Promote a braking policy to *Effective*.**
*Claim.* “For all **vehicles**: braking distance is **≤ 50 m** on dry and **≤ 40 m** on wet.”
*TargetSlice.* `{surface∈{dry,wet}, speed≤50 km/h, rig=v3, Γ_time=rolling 180 d}`
*Kinds.* `Vehicle` (K2, `KindSignature` at F4); the consumer subsystem expects `PassengerCar`.
**Guard.**

1. **Scope** covers TargetSlice (USM ✓).
2. **Definedness** of `MemberOf(?, Vehicle, TargetSlice)` ✓.
3. **Typed compatibility:** `PassengerCar ⊑ Vehicle` ✓.
4. **No bridges** → no penalties.
5. **F‑threshold:** `Formality(Claim) ≥ F4` ✓.
6. **Freshness:** evidence ≤ 180 days ✓.
   **Result:** Transition allowed. F/R apply weakest‑link on support paths; G remains the set declared.


**(B) Method–Work — Admit “RiskScore” step with typed input.**
*Capability.* `ComputeRiskScore` expects `AuthenticatedRequest`; promises SLOs (latency ≤ 50 ms, error ≤ 0.5 %).
*JobSlice.* `{api=v2.3, region=eu‑west, Γ_time=now, traffic_class=gold}`
*Inputs.* Producer emits `Request` (no auth guarantee).
**Guard.**

1. **Work scope** covers JobSlice; **Measures** & **QualificationWindow** ✓.
2. **Typed inputs:** `MemberOf(?, AuthenticatedRequest, JobSlice)` must hold. Not true for raw `Request`.
3. **Remedy:** insert an **adapter** that enforces/attests auth → yields `AuthenticatedRequest`.
4. **No Cross‑context** → no bridges.
   **Result:** Admitted **with adapter**; Scope unchanged; R relies on adapter evidence. Widening Work scope is **not** acceptable to bypass typed mismatch.


**(C) Cross‑context ESG — Adopt policy across plants.**
*Claim Context.* `SafetyLab@2026`. *target Context.* `PlantB@EU`.
*Kinds.* `Vehicle ↦ TransportUnit` via **KindBridge** with **`CL^k=2`** (EV/ICE collapsed); **Scope Bridge** from lab to plant with **CL=2** (rig bias ±2 %).
**Guard.**

1. Translate **Scope** and **cover** `TargetSlice_B`.
2. Translate **Kind** and ensure `MemberOf(?, TransportUnit, TargetSlice_B)` is **defined**.
3. Apply the **scope‑bridge penalty (level 2)** and the **kind‑bridge penalty (level 2)** to **R**; publish loss notes.
   **Result:** Transition allowed with reduced **R**; G is the **mapped** set; F unchanged.
##### Anti‑patterns & remedies (normative where noted)

| Anti‑pattern                                      | Why it’s wrong                                 | Remedy                                                                              |
| ------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------- |
| Widening **G** to “make kinds match”              | Conflates **describedEntity** with **applicability** | Introduce **subkind**, **RoleMask**, or **KindBridge**; keep G honest.              |
| Using a **mask name** as a kind                   | Hides constraints; breaks determinism          | Register mask; ensure constraints are observable; promote to **subkind** if reused. |
| Ignoring **`CL^k`** when classifying across Contexts | Under‑counts risk                              | Require **KindBridge**; apply **Ψ(`CL^k`)** to **R**; record loss notes.            |
| Inferring **Scope** from the size of the **Extension** | Scope is not the same as Extension            | Keep **Scope** (where it applies) distinct from **Extension** (which items count in the slice). |
| Implicit “**latest**” time                        | Non‑deterministic guard                        | Require explicit **`Γ_time`** (point/window/policy).                                |
### C.3.A:End
## Decision Theory (Decsn-CAL)

> **Type:** Calculus (C)
> **Status:** Stable
> **Normativity:** Normative unless marked informative

**At a glance.** `C.11` is the choice-calculus pattern for the moment when options already exist and the working question is which option to choose, including whether another probe is worth its cost before commitment.

### Problem frame

**Use this when.** Use this pattern when one `DecisionSubject` already has an `OptionSet` in hand and the real burden is to choose among those already-available options under uncertainty, preference, causal or subjunctive dependence, and bounded probing or computation.

**Start here when.** Start here when a person, team, organization, or other decision-capable system must decide whether to choose now or spend more effort on probing, information gathering, or computation before choosing.

**First output.** The first useful output is one explicit `DecisionSubject`, one explicit `OptionSet`, one explicit comparison basis, one explicit `ChoiceRule`, and one explicit `ChoiceResult` saying whether the best next move is choose now, reject the current set, probe more, or reroute to a neighboring burden.

If that first output still cannot be written honestly, the current comparison state is not late-stage choice doctrine yet. The burden is still unfinished local choice work or one neighboring burden in disguise.

**Immediate failure signs.**

- The chooser is still moving between person, team, organization, or another collectivity-bearing level.
- The current comparison is still inventing, expanding, or reframing options while also claiming to compare them.
- The current comparison says more information would help but cannot name one exact next probe that could still change the result.
- The current result is really surfacing one selected set or one enactment plan rather than one local choice.

**First-minute questions.**

- Who or what is actually choosing here, and at what chooser-bearing level?
- What options are already on the table now?
- What current basis is being used to compare them?
- What exact next probe could still change the choice, if any?
- Is this still local choice, or has the burden already moved to search, pool policy, publication, or enactment?

**Typical reroutes.** `C.18` when the real burden is still inventing or reframing options; `C.19` when the working question is how broadly to explore or exploit the candidate pool; `C.24` when one option is already chosen and the work has become sequencing or enactment; `A.13 / C.9` when the hard question is agenthood rather than choice; `A.18 / A.19` when the mathematical support burden itself becomes primary.

**Common wrong escalations / reroutes.** Do not use `C.11` to hide search work inside "decision", to hide candidate-pool policy inside one local choice, or to hide execution planning inside one rationality story. Do not treat selected-set publication or shortlist semantics as if they were the same burden as deciding.

**What goes wrong if this pattern is missed.** Search, selection policy, planning, and choice doctrine collapse into one blurred notion of rationality. Teams either choose too early because pool policy was never stated, keep probing without one exact reason the next probe is still worth its cost, or leave only one vague claim that "a decision was made" without one explicit decision record naming the current result.

**What this pattern buys.** This pattern gives one stable place to compare classical, causal, success-first or subjunctive, bounded-resource, active-inference-adjacent, and quantum-like decision lines without silently reassigning search, selection, or planning doctrine to the wrong burden. In practice it buys one explicit answer to four questions: choose now, reject the current set, probe again, or reroute.

**Not this pattern when.** Do not start here when the burden is still generating candidate options, governing exploration or exploitation over a candidate pool, publishing shortlisted-set semantics, or sequencing execution under an operational plan.

Decision work often fails not because no options exist, but because the choice among existing options is never typed as its own burden. `C.11` starts from one narrower and more useful center: one decision subject choosing among already-available options, including whether more probing is worth the cost before the choice is fixed.
### Problem

Many systems have options on the table but still lack one explicit doctrine for what makes one option rational to choose. They mix together at least four different burdens.

One burden is still generating candidate options, variants, or open-ended search directions. Another burden is governing how broadly a candidate pool should be explored or exploited before narrowing. A third burden is planning, sequencing, replanning, or enacting the move once a choice has already been made. The fourth burden, and the one governed here, is choosing among already-available options under uncertainty, dependence, and bounded deliberation.

A second distortion appears when decision theory is reduced to one thin slogan about expected utility. Real choosers face evidential and causal distinctions, subjunctive or success-first cases, probe costs, information value, computation value, and situations where the chooser is not just one isolated individual.

Without one explicit home for choice calculus, search, candidate-pool policy, and planning rush into the same burden, while the actual doctrine of choosing among live options disappears behind generic talk about rationality.
### Forces

| Force | Tension |
| --- | --- |
| Choice doctrine versus option generation | `C.11` must govern choice among already-available options without swallowing `C.18` search and candidate-generation work. |
| Evidential, causal, and subjunctive dependence | The pattern must stay usable with classical decision language while making room for causal and success-first repairs where correlation is not enough. |
| Decide now versus probe more | The chooser may need to stop and choose now, or spend more effort on information and computation first. The theory must make that trade legible. |
| Decision subject versus narrower agent language | The chooser may be one person, one team, one organization, or another collectivity-bearing system. The pattern must not silently force all cases into one narrow `Agent` reading. |
| Minimal mathematical floor versus premature heavy formalism | The pattern needs a stable object stack for disciplined reasoning and inspection, but it should not pretend that one full quantum-like or geometry-heavy package is already settled. |
### Solution

#### Governed object and move

`C.11` governs theory-side choice among already-available options. Its governed move is deciding what should be chosen from the current `OptionSet`, including whether further probing, information gathering, or computation is rational before the choice is fixed.

The governed burden begins only after an option set already exists. It does not govern open-ended generation of options, and it does not govern the execution order of a plan after a choice has already been made.
#### Decision discipline over a live option set

A conforming `C.11` pass does not stop at naming schools of decision theory. It carries one usable choice discipline over a live `OptionSet`, and it ends with one explicit `ChoiceResult` under one explicit `ChoiceRule`.

1. **Fix the chooser and the choice-bearing level.**
   State one `DecisionSubject` and one `DecisionSubjectGranularity`.
   If the real dispute is still about who or what counts as the chooser, coordinate with `A.13 / C.9` instead of hiding that dispute inside one local choice.

2. **Freeze the current option set.**
   State the already-available options being compared now as one `OptionSet`.
   If the hard work is still inventing, expanding, or reframing the options, stop here and reroute to `C.18`.

3. **Make the comparison basis explicit.**
   State one `PreferenceOrder` or one `EvaluativeMeasure`, plus one `BeliefState` and one `OutcomeModel`.
   The comparison is not usable if some options are being judged under one belief state and other options under one later, unmarked update.
   If two options are only comparable after one further probe or one stronger model revision, say that the current comparison is unfinished and route the burden through step 5 rather than pretending that one silent basis shift already solved it.

4. **Choose the dependence layer that actually governs the case.**
   Start from the evidential baseline when the choice is being compared through likely outcomes under the current `BeliefState`.
   Add one `InterventionModel` when taking one option changes the world through intervention rather than mere observation.
   Add one `CounterfactualModel` plus one `SubjunctiveDependenceRelation` when the case depends on one predictor, one structurally linked chooser, or one decision-procedure coupling that intervention talk alone does not capture.
   Use the weakest dependence layer that is still strong enough for the live case, and do not switch layers across options without saying so explicitly.

5. **Run the probe-worthiness test before commitment.**
   State one `ProbeActionSet`, one `ProbeBudget`, and one `CostToProbe`.
   Use `ValueOfInformation` for additional observation or measurement, and `ValueOfComputation` for additional reasoning, simulation, or search over the already-available options.
   This rule is intentionally local or myopic: it judges the best next feasible probe over the current `OptionSet` and current comparison basis, not one full sequential or non-myopic experimental program. Richer `OED` lines remain later strengthening, not the closure law of the present first-wave `C.11` body.
   If no feasible further probe fits the remaining `ProbeBudget`, or if the best available probe no longer justifies its `CostToProbe`, close under the current comparison basis.
   If a feasible probe is still worth its cost, and that probe could still change which option survives or whether the current `OptionSet` should be rejected, run it, update the `BeliefState` and `OutcomeModel`, and return to step 3.
   If one choice posture is already fixed and the remaining probe would change only route description, call ordering, enactment budget, or checkpointing of that chosen move, stop treating the probe as local choice doctrine and reroute to `C.24`.

6. **Apply one `ChoiceRule` and emit one `ChoiceResult` plus the next burden.**
   End with one explicit result: `choose now`, `reject current set`, `probe again`, or `reroute because this is no longer local choice`.
   If the result is `choose now`, name the winning option or the retained tie-set plus the exact reason no remaining feasible probe is worth its cost.
   If the result is `reject current set`, name the exact reason no current option survives under the present basis and, when more work follows, the neighboring burden that now takes over.
   If the result is `probe again`, name the next probe and the exact comparison defect it is supposed to repair.
   A `C.11` pass is done only when it names the lawful next move and the reason that move is lawful.
#### Well-formed comparison state

Well-formedness constraint: a live `C.11` comparison state is usable only when the decision record states all of the following:

- one `DecisionSubject` at one `DecisionSubjectGranularity`;
- one current `OptionSet`;
- one current comparison basis through `PreferenceOrder` or `EvaluativeMeasure`, plus one `BeliefState` and one `OutcomeModel`;
- one active dependence layer for the current comparison, unless the record explicitly says that comparison is still being reopened;
- one current account of whether another probe is still feasible and worth its cost.

The comparison is still unfinished, not yet wrong but not yet closeable, when any of the following remains true:

- the chooser is still shifting between person, team, organization, or another collectivity-bearing level;
- the option set is still changing while the record also claims to rank the options;
- one option is being judged under one belief state and another under one later update that is not itself declared as the next probe result;
- one heavier dependence layer is invoked for rhetorical force, but the record never states what defect of the lighter comparison it repairs;
- the record says more information would help, but never says which probe could still change the choice and why.
#### First-wave admissible decision semantics

This first wave does not yet settle every later decision-theory dispute, but it does already permit and forbid some semantic moves by value.

The following are lawful in the current `C.11` body when they are stated explicitly:

- one incomplete or only partially ordered `PreferenceOrder`, so long as the unresolved comparison stays visible through one retained tie-set, one further probe, or one honest `reject current set` result rather than one fake winner;
- one `EvaluativeMeasure` for magnitude, threshold, or trade-off-sensitive cases, so long as the measure being used now is explicit enough to explain why the current result follows under it;
- one temporary unresolved criterion conflict, so long as the record says whether the present comparison is using one priority order, one threshold, one explicit trade-off measure, or one unfinished state that still blocks closure;
- one explicit `BeliefState` revision, so long as it enters the comparison as one named probe result or one named model repair rather than as one silent basis shift;
- one widened `DecisionSubject` at person, team, organization, or other collectivity-bearing level, so long as the current subject-bearing level is explicit and the record does not hide unresolved cross-level conflict behind one generic chooser label.

The following are not lawful in the current `C.11` body:

- silently totalizing one genuinely partial preference relation just to force `choose now`;
- silently switching from one criterion mix or one belief state to another across options;
- pretending that unresolved cross-level or collective conflict is already one settled local ranking when the aggregation burden has not actually been discharged;
- using one polished record shape as a substitute for one stated comparison doctrine.

This is why `C.11` is more than one note-taking protocol. The body already permits local incompleteness, partial order, explicit trade-off measures, and widened chooser surfaces, but it requires those semantic facts to change the lawful result rather than remain hidden beneath one elegant summary line.
#### Probe-worthiness rule

Another probe is worth doing only when all three conditions hold together:

- the probe fits inside the remaining `ProbeBudget`;
- the expected gain from the probe, through `ValueOfInformation` or `ValueOfComputation`, is large enough to justify its `CostToProbe`;
- the probe can actually change the local choice posture by changing the ranking, breaking or creating a tie, showing that no current option survives, repairing one missing comparison, or showing that the burden should reroute.

This is the current local or myopic probe-worthiness law for `C.11`: judge the best next feasible probe over the current `OptionSet`, not one whole non-myopic experiment design over longer horizons. Later sequential or non-myopic `OED` may strengthen this doctrine, but they do not erase the present owner boundary.

Do not keep probing merely because uncertainty remains. Uncertainty is ordinary. What matters is whether one feasible next probe can still change what should be chosen, or whether the current `OptionSet` should be rejected, from the current local choice burden.

If the best available next probe cannot change which option survives, cannot change whether the current set should be rejected, or cannot justify its cost, the correct result is not one vague statement that the case is hard. The correct result is one explicit `ChoiceResult` under the current basis and current `ChoiceRule`.

If the next probe would no longer change which option survives but would only change how one already-chosen move gets enacted, budgeted, or checkpointed, the burden has already crossed to `C.24`.
#### ChoiceRule versus ChoiceResult

`ChoiceRule` and `ChoiceResult` are not the same kind of thing.

- `ChoiceRule` is the doctrine or operator that says how the current comparison basis, dependence layer, and probe-worthiness posture license one next move.
- `ChoiceResult` is the emitted record stating which next move is lawful now under that rule.

The operational answer of this pattern is therefore one emitted `ChoiceResult` under one explicit `ChoiceRule`. The result is complete only when it states the next move and the condition that makes that move lawful.

Only four result forms are lawful here:

- `choose now`
- `reject current set`
- `probe again`
- `reroute`

A fifth soft result such as "keep thinking", "stay with the current view", or "the case is still complex" is not a conforming output. It is one unfinished state that still needs to be typed.

For `choose now`, the emitted `ChoiceResult` should show:

- the selected option or the retained tie-set;
- the comparison basis under which that result currently holds;
- the exact reason no still-feasible probe is worth its cost.

For `reject current set`, the emitted `ChoiceResult` should show:

- that no member of the current `OptionSet` survives under the present comparison basis;
- the exact shared defect, threshold failure, or dominated-outcome reason that defeats the current set;
- the next neighboring burden only when more work now follows, such as new option generation or one explicit escalation path.

For `probe again`, the emitted `ChoiceResult` should show:

- the exact next probe;
- the comparison defect that probe is expected to repair;
- the reason the probe is still worth its cost.

For `reroute`, the emitted `ChoiceResult` should show:

- the neighboring owner that now governs the burden;
- the exact reason this is no longer local choice among already-available options.
#### Closure rule over the current OptionSet

The comparison may close as `choose now` only when all of the following are true together:

- the current `OptionSet` is stable enough that the decision record is no longer still inventing options;
- the current comparison basis is explicit enough to state why one option survives or why one tie-set remains;
- no still-feasible next probe is expected to change the survivor relation strongly enough to justify its cost;
- the record is still governing local choice rather than pool policy, publication, or enactment.

The comparison may close as `reject current set` only when all of the following are true together:

- the current `OptionSet` is explicit and stable enough to reject as the present choice set;
- the current comparison basis is explicit enough to show why no member survives under the present basis;
- no still-feasible next probe is expected to rescue one member strongly enough to justify its cost;
- the result is still one local choice conclusion rather than one disguised pool-policy, publication, or enactment result.

The comparison should close as `probe again` only when all of the following are true together:

- one exact next probe is named;
- that probe fits the remaining `ProbeBudget`;
- that probe is expected to repair one named comparison defect;
- that repaired defect could still change which option survives, whether the current set should be rejected, or whether the burden should reroute.

The comparison should close as `reroute` when the record has already learned that the governed move changed:

- to `C.18` when the option set itself is still under invention or reframing;
- to `C.19` when the burden is now how broadly to keep exploring or exploiting one candidate pool;
- to `C.24` when one choice posture already exists and the next task is now sequencing, enactment, or route-level probe work;
- to `G.5` when the next task is now selected-set surfacing or publication.

If none of those closure conditions can yet be satisfied, the record is still unfinished. It is not rescued by richer terminology alone.
#### Minimal decision-record form

A minimal `C.11` decision record has this shape:

```text
DecisionSubject(...)
DecisionSubjectGranularity(...)
OptionSet(...)
ComparisonBasis(
  preferenceOrder or evaluativeMeasure,
  beliefState,
  outcomeModel,
  optional intervention/counterfactual/subjunctive layer
)
ChoiceRule(
  closure law over the current basis and probe posture
)
ProbePosture(
  probeActionSet,
  probeBudget,
  costToProbe,
  valueOfInformation,
  valueOfComputation
)
ChoiceResult(
  nextMove = choose_now | reject_current_set | probe_again | reroute,
  selectedOption or retainedTieSet or rejectedCurrentSet or rerouteOwner,
  exact reason this is the lawful next move
)
```

The record does not need that exact syntax. It does need that exact content.

If the record does not state the current chooser, current options, current comparison basis, current `ChoiceRule`, current probe posture, and current `ChoiceResult`, then it still behaves more like one doctrinal essay than one usable decision record.

Use branch language only when it changes the actual comparison being performed.

##### Classical evidential baseline

Stay with the classical evidential baseline when the burden is to compare already-available options through preferences, utilities or desirabilities, beliefs, and likely outcomes under uncertainty.

In this baseline, the options are being compared as evidence about what consequences are likely if they are chosen. This is the ordinary default when intervention structure, predictor-coupling, or context-sensitive non-commutativity are not yet doing real work in the case.

Typical practical cash-outs are:

- `choose now` because the current shared `BeliefState` and `OutcomeModel` already make one option or tie-set survive, and no still-feasible probe is worth its cost;
- `probe again` because one further observation, measurement, or comparison pass could still change the ranking without requiring a heavier causal, subjunctive, or context-order repair;
- `reroute` because the governed move is no longer really comparing one fixed `OptionSet`, but has become search, pool policy, publication, or enactment work.

The baseline is still unfinished when the current comparison invokes it but cannot keep one shared `BeliefState` and `OutcomeModel` across the compared options, or when one heavier defect is already live and the current comparison still pretends one plain evidential comparison is enough.
##### Causal repair

Switch on one `InterventionModel` when taking one option changes the world through intervention rather than merely signaling which outcome was already likely.

What changes here is not the prestige label of the theory line, but the comparative question itself: the working question is no longer only what this option indicates about the outcome, but what this option causes in the outcome structure.

Typical practical cash-outs are:

- `choose now` because, under the declared intervention structure, one option now causally dominates or remains the survivor and no remaining feasible probe can reverse that causal ranking;
- `probe again` because one intervention-relevant uncertainty still blocks a lawful causal comparison and one named next probe could still change which option causally survives;
- `reroute` because the intervention story has already moved from local choice into enactment planning, protocol design, or one neighboring burden.

This repair has not yet landed if the comparison still treats options only as evidence after invoking causal language, or if an `InterventionModel` is named without stating what defect of the lighter evidential comparison it repairs.
##### Success-first or subjunctive repair

Switch on one `CounterfactualModel` plus one `SubjunctiveDependenceRelation` when Newcomb-like, blackmail-like, or other predictor-coupled cases remain under-described by the older evidential-versus-causal split.

What changes here is that the comparison must stay answerable to linked decision procedures, predictors, or structurally similar choosers rather than only to direct intervention on one local event.

Typical practical cash-outs are:

- `choose now` because, under the declared counterfactual or subjunctive structure, one option survives once the predictor-coupled comparison is made explicit;
- `probe again` because one further model clarification, predictor assumption check, or decision-procedure comparison could still reverse the current survivor relation;
- `reroute` because the governed move is no longer settling local choice doctrine but has become one wider characterization, negotiation, or enactment burden that only borrowed predictor-coupling language.

If that coupled structure is not live, do not activate this branch. If a predictor-coupled or success-first repair is named but the linked structure that changes the comparison is still unspecified, the branch is not yet load-bearing in the current decision.
##### Active-inference neighboring repair

Bring the active-inference line into view when the chooser is embodied, online, and socially coupled, and when the decision cannot be understood as one disembodied choose-then-act moment.

What changes here is practical next-move logic, not one neighboring-school label. The comparison is no longer over one frozen snapshot alone. The comparison must now ask whether one more observation, one more coupled update, or one more socially mediated or role-expectation clarification actually changes what should be done now.

This first wave makes that social-expectation pressure explicit, but it does not yet operationalize one full `ROE` or `SocialExpectationRegime` object model inside `C.11`. If that heavier machinery is itself what the case hinges on, the current body should say so honestly rather than pretending the first-wave branch has already settled it.

Typical practical cash-outs are:

- `probe again` because one further embodied observation, coupled update, or explicit role-expectation clarification can still change the state estimate enough to reverse the current survivor relation;
- `choose now` because delay itself now worsens the state being managed, closes the window in which the preferred option remains feasible, or leaves no lawful time for one more socially mediated check;
- `reroute` because the burden has already become enactment sequencing or agent-characterization work rather than local choice.

`C.11` keeps the choice burden visible there, but `A.13 / C.9` still own the narrower question of what kind of agent or agential system is in play, and `C.24` still owns later sequencing and enactment once a choice posture has already been fixed.

Do not invoke this line only because one agent is acting in the world. Invoke it when embodied coupling, online updating, or explicit social-expectation pressure actually changes what the chooser should do now from the current `OptionSet`.
##### Quantum-like neighboring repair

Bring the quantum-like line into view when context effects, order effects, response-replicability tension, or incompatible-question structure change the comparative state enough that one simple commutative probability reading no longer fits.

What changes here is the practical structure of comparison. One order of questioning or one framing path may produce one different survivor relation from another. The comparison must therefore either stabilize the comparison under one declared order or show why one more clarifying pass is still needed.

This first wave keeps the branch at that measurement-sensitive recognition surface. It does not yet claim one full quantum-like state-space package inside `C.11`; it claims only that the live comparison may need one explicit measurement-class or order-sensitive repair rather than one plain commutative reading.

Typical practical cash-outs are:

- `choose now` under one declared order or framing because rival orders no longer change which option survives;
- `probe again` because one framing-sensitive comparison pass, one further question order, one response-replicability check, or one explicit measurement-class clarification could still reverse the survivor relation;
- `reroute` when the governed move is no longer deciding among live options but has become one publication or enactment problem that only borrowed order-effect language rhetorically.

Do not promote this line to the unmarked default unless those exact repaired limitations are live in the case.

Do not invoke this line merely because a case feels psychologically subtle. Invoke it when one changed order, framing, response pattern, or incompatible-question structure actually changes the comparison state or the survivor relation in the live choice.

If none of those repaired limitations is live, stay with the classical evidential baseline rather than switching branches without one live repaired limitation.

The family map is therefore one disciplined set of refinements over the same choice burden, not one excuse to rename every neighboring burden as decision theory.
#### Reroute as soon as the burden stops being local choice

Use `C.11` while the question remains: from this current `OptionSet`, what should the `DecisionSubject` choose, and is another probe worth its cost before commitment?

Reroute immediately when the burden changes:

- If the hard question is still what options should exist at all, or whether the current option set needs to be expanded or reframed, leave this pattern and work in `C.18` first.
- If the options already exist but the question is how broadly to keep exploring or exploiting the candidate pool, leave this pattern and work in `C.19`, where the next useful output is one explicit pool-policy result rather than one local `ChoiceResult`.
- If one option is already chosen and the question is how to sequence, budget, or enact that choice, leave this pattern and work in `C.24`, where the next useful output is one enactment-facing call plan or `CheckpointReturn`.
- If the burden has shifted from deciding to surfacing, publishing, or naming the selected set, leave this pattern and work in `G.5`, where the next useful output is one published shortlist, ranked shortlist, narrowed handoff plan, or explicit abstain surface rather than one more local choice result.

`ProbeBudget` stays here while it means the epistemic or deliberative budget for one more probe before choice and while that probe can still change which option survives or whether the current set should be rejected. When the same word now means execution budget, call budget, enactment budget, or route-level scouting after one choice posture already exists, the burden has moved to `C.24`.

`ValueOfInformation` and `ValueOfComputation` also stay theory-side here as comparative criteria while the question is still local choice among the current options. If one more probe could still change which option survives or whether the current set should be rejected, stay in `C.11`. If the choice posture is already fixed and those criteria now govern only route sequencing, call ordering, or enactment of the chosen move, the burden has crossed to `C.24`. `C.19` and `C.24` may consume the criteria, but they do not become the doctrine owners of them.

Outside this pattern remain candidate generation, pool-wide exploration policy, selected-set publication semantics, and execution planning.
#### First-wave inventory and minimal mathematical floor

The minimum usable inventory for this pattern is:

- subject and option objects: `DecisionSubject`, `DecisionSubjectGranularity`, `OptionSet`;
- evaluative and epistemic objects: `PreferenceOrder`, `EvaluativeMeasure`, `BeliefState`, `OutcomeModel`;
- dependence and comparison objects: `InterventionModel`, `CounterfactualModel`, `SubjunctiveDependenceRelation`, `ChoiceRule`, `ChoiceResult`;
- probe and bounded-resource objects: `ProbeActionSet`, `ProbeBudget`, `CostToProbe`, `ValueOfInformation`, `ValueOfComputation`.

These objects are required because the decision record must carry one explicit path from a live `OptionSet` through one live `ChoiceRule` to one emitted `ChoiceResult`.
#### Always explicit versus conditionally activated objects

The following objects should be explicit in every usable `C.11` decision record:

- `DecisionSubject` and `DecisionSubjectGranularity`;
- `OptionSet`;
- one evaluative surface through `PreferenceOrder` or `EvaluativeMeasure`;
- `BeliefState`;
- `OutcomeModel`;
- `ChoiceRule`;
- `ChoiceResult`.

The following objects activate when the case needs them:

- `InterventionModel` for causal repair;
- `CounterfactualModel` plus `SubjunctiveDependenceRelation` for success-first or predictor-coupled repair;
- `ProbeActionSet`, `ProbeBudget`, `CostToProbe`, `ValueOfInformation`, and `ValueOfComputation` when one more probe or one more computation pass is still live.

What matters is not that every decision record mechanically mentions every token. What matters is that the current comparison does not smuggle one active burden without naming the object that carries it.

Immediate lexical commitments:

- the default chooser term is `DecisionSubject`, not `Agent`;
- `DecisionSubjectGranularity` names the chooser-bearing level when the burden is about whether the chooser is one person, team, organization, or another collectivity-bearing system rather than one generic scalar or coordinate;
- relation-heavy wording remains answerable to `A.6.P` together with `A.6.5`.

Local plain glosses for the high-pressure inventory:

- `DecisionSubject`: who or what is actually carrying this choice now, whether that is one person, one team, one committee, one organization, or another collectivity-bearing system;
- `DecisionSubjectGranularity`: the level at which the choice is being attributed, such as person-level, team-level, or organization-level rather than one vague "agent" label;
- `OptionSet`: the concrete options already on the table now;
- `PreferenceOrder`: the current better-than / worse-than ordering over those options for this decision subject;
- `EvaluativeMeasure`: the explicit utility-style or desirability-style scoring measure used when the case needs magnitudes, thresholds, or trade-offs rather than only one ordering;
- `BeliefState`: the current uncertainty-bearing state about the world, the case, and the likely consequences of the options;
- `OutcomeModel`: the model that maps options plus the current uncertainty picture to the consequences that matter for this choice;
- `InterventionModel`: the part of the model that says how the world changes because one option is actually taken;
- `CounterfactualModel`: the model used to compare relevant non-actual alternatives or alternate decision procedures;
- `SubjunctiveDependenceRelation`: the dependence between this choice and one predictor, one linked chooser, or one structurally similar decision procedure when intervention talk alone is not enough;
- `ChoiceRule`: the current choice doctrine or operator that says what conditions make `choose now`, `reject current set`, `probe again`, or `reroute` lawful in this case;
- `ChoiceResult`: the emitted result record saying which of those lawful next moves actually follows now under the current `ChoiceRule`;
- `ProbeActionSet`: the further checks, measurements, simulations, or questions that can still be run before commitment;
- `ProbeBudget`: the remaining time, money, attention, or tolerated delay available for those pre-choice probes;
- `CostToProbe`: the real cost of another measurement, question, simulation, trial, or delay before commitment;
- `ValueOfInformation`: the expected gain from learning more before choosing;
- `ValueOfComputation`: the expected gain from spending more reasoning or compute before choosing.

What follows from `DecisionSubject` being wider than `Agent`:

- the chooser in `C.11` need not be one person-like agent;
- a team, committee, organization, or coupled human-tool system may be the `DecisionSubject` when that is the real level at which the choice is being made;
- the pattern therefore does not force agency characterization to do the job of naming who or what is currently choosing.

This floor is enough to keep choice doctrine inspectable and stable. It does not yet assume one full branch-specific quantum-like package or one cross-level geometry-heavy package.
#### First-wave boundary on multilevel and social-expectation doctrine

`DecisionSubject` and `DecisionSubjectGranularity` are the current first-wave answer to human-only and individual-only narrowing. They keep the chooser explicit at person, team, organization, or other collectivity-bearing level so the doctrine does not silently collapse back into one generic individual agent.

This first wave does not yet settle all of the heavier doctrine that can sit behind that wider chooser surface. In particular, this body does not yet fully settle:

- collective aggregation law over conflicting preferences or criteria;
- cross-level conflict between person-, team-, organization-, or broader system-level objectives;
- one full `ROE` or social-expectation structure for socially scaffolded choice;
- one full multilevel or geometry-heavy formal package for those cross-level burdens.

Those absences are not hidden exceptions. They are explicit scope boundaries of the current `C.11` body. If one of those heavier burdens is already load-bearing in the live case, the decision record should say that the first-wave surface is being used only as the current typed floor and should keep the unresolved aggregation, `ROE`, or multilevel support burden visible by value.
#### Minimal decision tuple and finish condition

A `C.11` decision record is complete only when it states:

- who or what is choosing: `DecisionSubject` at one `DecisionSubjectGranularity`;
- what is currently choosable: `OptionSet`;
- how the options are compared: `PreferenceOrder`, `EvaluativeMeasure`, `BeliefState`, and `OutcomeModel`;
- which heavier dependence layer is active when the case needs it: `InterventionModel`, `CounterfactualModel`, and `SubjunctiveDependenceRelation`;
- what comparison doctrine currently governs the case: one explicit `ChoiceRule`;
- what further probing is still available and worth paying for: `ProbeActionSet`, `ProbeBudget`, `CostToProbe`, `ValueOfInformation`, and `ValueOfComputation`;
- what the current comparison concludes: one emitted `ChoiceResult` that says choose now, reject the current set, probe again, or reroute.
  That result must name either the selected option, the retained tie-set, or the exact next probe or reroute.

Without that explicit tuple, choice doctrine usually collapses into one of three easier but wrong substitutes: generic rationality talk, search folklore, or planning folklore.

The finish condition is stronger than "the record now sounds informed." The record is finished enough for practical use only when the next move follows from the stated comparison basis, stated `ChoiceRule`, stated probe posture, and emitted `ChoiceResult` rather than from unstated background assumptions.

A `C.11` pass is finished enough for practical use when all three conditions hold:

- the current comparison basis is explicit enough to state why one option now outranks or survives the others;
- the reason to stop probing, or the reason to probe again, is explicit rather than assumed;
- the next burden is explicit: `choose now`, `reject current set`, `probe again`, or `reroute`.

If the case remains tied or underdetermined under the current basis, say that directly and keep the tie-set explicit. A lawful `ChoiceResult` may still be `probe again` or `reroute`, but it must not pretend that one winner already exists when the current basis has not earned that conclusion.

If those conditions are still missing, the pattern has not yet answered the choice burden even if the terminology already sounds sophisticated.
#### System grounding

**Tell.** A research team already has three experiment plans on the table. The option set exists. The real burden is to decide which plan to run and whether one more measurement is worth the delay.

**Show.** The `DecisionSubject` is the team, the `DecisionSubjectGranularity` is team-level, the `OptionSet` is the three current plans, the team's `PreferenceOrder` puts risk reduction ahead of schedule convenience, and the current `OutcomeModel` still carries calibration uncertainty. The extra calibration run belongs in the `ProbeActionSet`, its one-day delay is part of the `ProbeBudget`, and the practical question is whether its `ValueOfInformation` exceeds its `CostToProbe` strongly enough to change the emitted `ChoiceResult` under the current `ChoiceRule`.

**Show.** If the extra calibration run could still change which plan survives and the one-day delay fits the remaining `ProbeBudget`, the right `ChoiceResult` is `probe again` with that exact calibration run named. If the measurement can no longer overturn the ranking, the right `ChoiceResult` is `choose now` with the winning plan and the reason further probing is no longer worth its cost.

**Show.** A finished result here should therefore read like one decision record, not one research-theory aside: "Team-level chooser; three current plans; risk reduction preferred; calibration uncertainty still live; one extra calibration run remains feasible and could still overturn the current ranking; `ChoiceResult = probe again with calibration run`." Or, after that probe is no longer worth doing: "`ChoiceResult = choose plan B now because the remaining calibration gain no longer justifies one more day of delay`."

**Show.** `C.18` is still the place for inventing new plans, `C.19` is still the place for broader exploration policy over the plan pool, and `C.24` is still the place for the run sheet and execution order after the choice is made.
#### Episteme grounding

**Tell.** A model-selection comparison takes three already-articulated explanations and asks whether one more observation or one more comparison pass is rational before preferring one explanation over the others.

**Show.** `C.11` governs the decision doctrine over the current explanation set: one `BeliefState`, one `OutcomeModel`, one explicit `PreferenceOrder` or `EvaluativeMeasure`, and, when the case needs it, one `InterventionModel`, `CounterfactualModel`, or `SubjunctiveDependenceRelation` rather than one thinner evidential story. When another model comparison pass is on the table, `ValueOfComputation` belongs here as part of the current choice doctrine rather than as one later planning afterthought.

**Show.** If one more comparison pass cannot realistically change which explanation survives, the decision record should not end with "more analysis may help." It should end with one `ChoiceResult` that prefers the current explanation now. If one more pass could still reverse the ordering and is cheap enough to justify, the decision record should say exactly which pass is worth doing and what ambiguity it is expected to resolve.

**Show.** A lawful closing line here is therefore something like: "`ChoiceResult = choose model 2 now because the surviving uncertainty no longer changes the ordering under the current evidence`" or "`ChoiceResult = run one additional comparison pass on models 1 and 2 because the current outcome model still cannot distinguish their failure costs`." Anything vaguer leaves the decision burden unfinished.

**Show.** This pattern does not yet govern open-ended hypothesis generation and does not yet govern operational rollout. Those burdens stay outside this pattern even when the decision later feeds them.
#### Collective and contextual grounding

**Tell.** A clinical board must decide whether to escalate a patient now or order one more test. The board is the chooser, not one isolated individual, and the result shifts when the case is discussed in prognosis-first versus risk-first order.

**Show.** `C.11` keeps the case legible by typing the chooser as one `DecisionSubject` at explicit `DecisionSubjectGranularity`, keeping the available actions as one current `OptionSet`, keeping one explicit `BeliefState` and `OutcomeModel` around those actions, and asking whether another test belongs in the `ProbeActionSet` strongly enough to justify its `CostToProbe`.

**Show.** Active-inference-adjacent pressure is visible because the chooser is embodied, online, and socially coupled; quantum-like pressure is visible because context and question order change the comparison state. `C.11` keeps both repaired limitations visible without pretending that the whole pattern has already become one full active-inference or quantum-like formal package.

**Show.** If the order effect remains strong enough to change which option survives, the comparison should say that directly and keep the comparison unfinished. The lawful next move is then either one framing-stabilizing probe or one declared comparison order under which the current result will be judged. It should not hide that instability inside one vague statement that the board has mixed intuitions.

**Show.** A lawful output here therefore looks like one of three concrete records:

- `ChoiceResult = probe again with one rapid diagnostic test because the current prognosis-first versus risk-first framing still changes which option survives`;
- `ChoiceResult = choose now and escalate because, under the fixed risk-first order and current evidence, no remaining feasible test can reverse the survivor relation before delay increases harm`;
- `ChoiceResult = reroute to C.24 because the board has already chosen escalation and the next task is now treatment sequencing rather than local choice`.

**Show.** The output still has to be one actionable record. If the current result cannot say which of those three forms is now lawful, then the contextual pressure has been noticed but not yet carried into one usable decision result.
### Bias-Annotation

This pattern is intentionally biased toward `Prag` and `Onto/Epist` discipline.

It prefers one clear governed object, one explicit neighboring-burden split, and one minimal mathematical floor over one looser but more rhetorically flexible notion of rationality.

That bias can feel too strict in cases where the chooser, option set, or dependence structure is still genuinely moving. The mitigation is not to weaken the pattern back into one general rationality story. The mitigation is to keep the unfinished state explicit: hold one tie-set, hold one `probe again` result, or reroute to the neighboring owner that now truly governs the burden.

The family map also remains plural: causal, success-first, active-inference, and quantum-like repairs stay visible without being overpromoted into one default doctrine.
### Conformance Checklist

| ID | Requirement | Purpose |
| --- | --- | --- |
| `CC-C11.1` | The pattern **SHALL** state that `C.11` governs choice among already-available options rather than candidate generation. | Keeps `C.18` outside and prevents search takeover. |
| `CC-C11.2` | The pattern **SHALL** keep `DecisionSubject` as the default chooser surface, and **SHALL NOT** use `Agent` as the generic chooser term unless one explicit agency claim is routed through `A.13 / C.9`. | Prevents unwanted narrowing of the chooser. |
| `CC-C11.3` | The pattern **SHALL** state the `C.11 / C.18 / C.19 / C.24 / G.5` split explicitly in the body. | Prevents collapse of choice doctrine, candidate generation, candidate-pool policy, planning, and selected-set publication. |
| `CC-C11.4` | `Solution` **SHALL** state one inspectable decision procedure from `DecisionSubject` and `OptionSet` through comparison basis, dependence layer, probe-worthiness test, one explicit `ChoiceRule`, and one emitted `ChoiceResult`. | Keeps `C.11` as one operational answer to the choice burden rather than one survey of schools. |
| `CC-C11.5` | The pattern **SHALL** name one minimal first-wave inventory including `DecisionSubject`, `DecisionSubjectGranularity`, `OptionSet`, `PreferenceOrder`, `EvaluativeMeasure`, `BeliefState`, `OutcomeModel`, `ChoiceRule`, `ChoiceResult`, `ProbeActionSet`, `ProbeBudget`, `CostToProbe`, `ValueOfInformation`, and `ValueOfComputation`. | Keeps the calculus objectual rather than slogan-like. |
| `CC-C11.6` | High-pressure inventory terms used in the pattern text **SHALL** receive local plain glosses or equivalent operational clarification inside the body. | Prevents the core terminology from remaining implicit or displaced into outside basis carriers. |
| `CC-C11.7` | Relation-heavy terms such as `PreferenceOrder`, `CounterfactualModel`, and `SubjunctiveDependenceRelation` **SHALL** remain answerable to `A.6.P` together with `A.6.5`. | Keeps dependence language inspectable and deconflicted. |
| `CC-C11.8` | Active-inference and quantum-like lines **SHALL** be introduced through the limitations they repair, not as prestige branch names. | Preserves practical meaning and avoids branch-name citation without operational load. |
| `CC-C11.9` | The pattern **SHALL** expose one minimal mathematical floor without overclaiming one full quantum-like or geometry-heavy formal package. | Keeps the pattern usable now while leaving heavier support work typed and explicit. |
| `CC-C11.10` | `ProbeBudget` **SHALL** stay in `C.11` while it means the budget for further probing before choice, and `ValueOfInformation` / `ValueOfComputation` **SHALL** stay theory-side comparative criteria even when `C.19` or `C.24` later consume their outputs. | Preserves the bounded-resource bridge without letting neighboring owners steal the doctrine. |
| `CC-C11.11` | Shortlist or selected-set publication semantics **SHALL NOT** be treated as part of `C.11`; if the burden shifts to surfacing or publishing the selected set, the text **SHALL** reroute to `G.5`. | Preserves selector-facing publication placement and keeps publication semantics out of local choice doctrine. |
| `CC-C11.12` | When one heavier dependence layer or neighboring family line is activated, the text **SHALL** state what limitation of the simpler comparison it repairs and what changes in the actual comparison once that line is in play. | Prevents branch-name citation from replacing use-time doctrine. |
| `CC-C11.13` | The text **SHALL** make the closure rule explicit enough to justify why the lawful result is `choose now`, `reject current set`, `probe again`, or `reroute` rather than some softer holding-pattern output, and **SHALL** treat vaguer endings as unfinished rather than as lawful results. | Prevents the decision record from ending in one sophisticated but operationally empty posture. |
| `CC-C11.14` | The decision record **SHALL** make one minimal decision-record shape explicit: chooser, option set, comparison basis, one explicit `ChoiceRule`, probe posture, and one emitted `ChoiceResult`; `choose now`, `reject current set`, `probe again`, and `reroute` outputs **SHALL** each state their mandatory fields explicitly enough to determine the next move without reopening surrounding rationale. | Keeps the pattern usable as one working decision artifact rather than one doctrinal memo. |
### Common Anti-Patterns and How to Avoid Them

One quick usability test helps here: if the closing line does not state one lawful next move for the working chooser or team, the current result is still unfinished even if the doctrine survey looks polished.

| Anti-pattern | Symptom | Why it fails | How to avoid / repair |
| --- | --- | --- | --- |
| Search takeover | The text starts treating option generation as if it were already part of decision doctrine. | `C.11` loses its governed object and silently absorbs `C.18`. | The option set is stated as already existing, and search burdens are rerouted to `C.18`. |
| Policy collapse | Exploration or exploitation governance over a candidate pool is written as if it were the same thing as choosing among current options. | Choice doctrine and candidate-pool policy become indistinguishable. | `C.19` remains explicit as the neighboring pattern for selection policy and exploration governance. |
| Planning collapse | Sequencing, replanning, and enactment budgeting are written as if they were already part of the choice calculus. | Planning-side burden moves out of `C.24` by accident. | Execution order and operational budgeting remain in `C.24`, even when `C.11` says more probing is rational. |
| Inventory without decision rule | The current comparison names many objects and schools but never shows how to move from a live option set through one `ChoiceRule` to one `ChoiceResult`. | The pattern becomes one cleaned-up survey rather than one decision discipline. | State one explicit procedure: chooser, option set, comparison basis, dependence layer, probe-worthiness test, one explicit doctrine, and one emitted result. |
| Hidden basis shift | Different options are compared under different belief states, outcome models, or dependence layers without one explicit statement that the basis changed. | The comparison only looks precise; in fact the choice rule cannot be audited. | Keep one shared comparison basis until one named probe or model change updates it, and state explicitly when the dependence layer changes. |
| No closure rule | The text sounds careful but never says what makes `choose now`, `reject current set`, `probe again`, or `reroute` lawful. | The record never closes into one explicit decision result. | State the closure conditions explicitly and show why the current case satisfies exactly one of them. |
| Undefined high-pressure terms | Terms such as `PreferenceOrder`, `BeliefState`, or `OutcomeModel` appear without local operational clarification. | Core comparison objects stay implicit and the decision burden depends on outside theory or undocumented assumptions. | Give one local plain gloss or equivalent operational clarification for each high-pressure term used in the pattern text. |
| Bounded-resource bridge loss | `ProbeBudget`, `ValueOfInformation`, or `ValueOfComputation` are mentioned, but the text silently lets `C.19` or `C.24` own them. | The theory-side doctrine disappears into neighboring policy or planning prose. | Keep those objects theory-side in `C.11`; let neighboring patterns consume their outputs without minting the concepts. |
| Publication collapse | The text starts treating shortlist or selected-set publication semantics as if they were the same thing as deciding. | Choice doctrine silently absorbs selector-facing publication burden and collides with the `G.5` placement. | Keep selected-set publication outside `C.11` and reroute to `G.5` when the burden becomes surfacing or publishing the selected set. |
| Agent-default narrowing | Every chooser is described as one `Agent` even when the subject is really one team, organization, or other collectivity-bearing system. | The governed chooser is narrowed before the doctrine even starts. | `DecisionSubject` remains the default, and `DecisionSubjectGranularity` types the chooser-bearing level. |
| Prestige-branch citation | Active inference or quantum-like work is cited only as one fashionable name. | The text sounds current without stating what limitation is being repaired. | The repaired limitation is stated directly: embodied online updating for active inference, and context or order effects for quantum-like lines. |
| Cost-free deliberation | The text speaks as if probing and computation are free. | Bounded-resource doctrine disappears behind one idealized choice moment. | `ProbeBudget`, `CostToProbe`, `ValueOfInformation`, and `ValueOfComputation` stay visible in the calculus. |
### Consequences

| Benefits | Trade-offs / Mitigations |
| --- | --- |
| Keeps decision doctrine distinct from search, candidate-pool policy, and planning. | The same working episode now needs an explicit burden split across choice, pool policy, and planning rather than one blurred rationality story. |
| Makes evidential, causal, and subjunctive branches comparable in one place. | The pattern becomes more explicit about dependence language and therefore needs tighter lexical discipline. |
| Keeps bounded-resource probing inside the doctrine rather than as one afterthought. | Fast-path use now carries a slightly richer inventory before the doctrine feels natural under pressure. |
| Keeps active-inference and quantum-like repairs visible without letting them silently replace the whole core. | Those lines stay load-bearing only when they change the actual `ChoiceResult`, unfinished state, or reroute logic; heavier formal packages still remain outside this body. |
| Makes the next move explicit through one `ChoiceResult` record instead of one general statement that the case is complex. | Each decision record has to show why `choose now`, `reject current set`, `probe again`, or `reroute` is lawful, which removes rhetorical room to sound informed without committing to one result. |
| Makes downstream work cleaner because search, pool policy, publication, and enactment can receive one explicit output instead of one blurred upstream "decision happened" claim. | Reroutes now require one named next owner and one reusable part of the record instead of one vague upstream claim that deliberation happened somewhere. |
| Lets one comparison stay open honestly through one explicit tie-set or `probe again` result instead of forcing a fake winner. | Some outcomes will look less rhetorically decisive because the pattern refuses to hide unfinished comparison under elegant prose. |
### Rationale

A live option set and a live choice among that set are not the same burden as generating options, governing a candidate pool, or sequencing execution. Keeping that distinction explicit is what makes the doctrine usable rather than ceremonial.

`DecisionSubject` is the better default surface because decision theory often applies to persons, teams, organizations, and other system-bearing collectivities. `Agent` remains useful, but only when an explicit agency claim is actually being made.

A minimal mathematical floor is necessary because choice doctrine without one stable object stack quickly turns into verbal drift. But a pattern also fails if it keeps only the object names and never shows how those objects discipline an actual choice. That is why `Solution` here is procedural: it must carry the path from `OptionSet` through one `ChoiceRule` to one `ChoiceResult`, including the stop-or-probe decision, rather than only one survey of neighboring theories.

The practical gain of that procedure is not elegance for its own sake. It is that later search, policy, publication, and planning work receive one explicit result instead of one hand-waving claim that deliberation happened somewhere upstream.

At the same time, this pattern should not pretend that one full quantum-like or geometry-heavy package is already settled just because those neighboring lines are real.
### SoTA-Echoing

| Claim | SoTA practice | Primary source | Alignment with `C.11` | Adoption status |
| --- | --- | --- | --- | --- |
| Decision theory still needs an explicit classical baseline over options, preferences, utility, and uncertainty. | Contemporary reference treatments still present decision theory through option sets, preferences, utilities, and uncertainty as the baseline language of rational choice. | [Decision Theory (Stanford Encyclopedia of Philosophy, Fall 2023)](https://plato.stanford.edu/archives/fall2023/entries/decision-theory/) | `C.11` adopts this as the baseline vocabulary for choice among already-available options. | **Adopt.** |
| Evidential dependence is not enough in all cases. | Causal decision theory remains the standard repair when intervention structure matters. | [Causal Decision Theory (Stanford Encyclopedia of Philosophy, Winter 2024)](https://plato.stanford.edu/archives/win2024/entries/decision-causal/) | `C.11` keeps one explicit evidential-versus-causal split rather than one blended correlation story. | **Adopt.** |
| The field no longer stops honestly at the older EDT/CDT split. | Functional or success-first work keeps subjunctive dependence live in Newcomb-like and related cases. | [Functional Decision Theory: A New Theory of Instrumental Rationality](https://arxiv.org/abs/1710.05060) | `C.11` keeps success-first or subjunctive repair visible without treating it as one settled default doctrine. | **Adapt.** |
| The live EDT/CDT/FDT family map now has more technical comparison surfaces than one older philosophical split alone. | Recent mechanized or causal-graph taxonomies compare live decision-theory families through more explicit technical structures rather than only one slogan-level naming dispute. | [Mechanized-causal-graphs taxonomy of decision theories (2023)](https://arxiv.org/abs/2307.10987) | `C.11` therefore treats EDT, CDT, and success-first or FDT-like lines as technically live family options rather than one frozen classroom argument. | **Adapt.** |
| Decision under bounds cannot leave probing and deliberation cost as one slogan. | Current metareasoning and optimal-experimental-design lines treat information acquisition, probing, and computation allocation as first-class theoretical burdens rather than free background steps. | [Metareasoning: Theoretical and Methodological Developments](https://pmc.ncbi.nlm.nih.gov/articles/PMC11765846/) | `C.11` therefore keeps `ProbeActionSet`, `ProbeBudget`, `CostToProbe`, `ValueOfInformation`, and `ValueOfComputation` inside the doctrine rather than hiding them in planning-only prose; the current closure law is intentionally local or myopic over the next feasible probe, with richer sequential or non-myopic `OED` left as later strengthening. | **Adapt.** |
| Decision and update can be embodied, online, and socially coupled. | Active-inference work treats decision as tightly coupled to action, inference, and expectation regimes rather than one disembodied one-shot selection. | [Embodied decisions as active inference](https://pmc.ncbi.nlm.nih.gov/articles/PMC12201680/) | `C.11` carries this as one neighboring repair of the chooser picture, makes social-expectation pressure explicit enough for use-time reroute or probe logic, and states honestly that full `ROE` or social-expectation object modeling remains outside this first wave. | **Adapt.** |
| Some decision cases exhibit context effects, order effects, response-replicability tension, and incompatible-question structure. | Current quantum-like decision and cognition work treats those cases as one measurement-sensitive research program rather than one discarded curiosity or one automatic physics transfer. | [Measurement-theory decision/cognition anchor (2025)](https://arxiv.org/abs/2503.05859) | `C.11` carries this as one named neighboring branch where those repaired limitations are real, while leaving heavier branch-specific formalism outside this body. | **Adapt.** |
| Some quantum-like lines also claim one practical representational gain from linear state dynamics over harder nonlinear underlying processes. | Quantum-like modeling in biology presents linear Hilbert-space dynamics as one simplifying and potentially faster information-processing lens over nonlinear classical biophysical dynamics, while treating this as representational modeling rather than proof that the modeled system is physically quantum. | [Quantum-like modeling in biology with open quantum systems and instruments](https://www.sciencedirect.com/science/article/pii/S0303264720301994) | `C.11` takes this only as one possible practical reason to keep the quantum-like branch available when measurement-sensitive effects are real; it does not treat quantum-like choice as one claim of physical quantumness. | **Adapt cautiously.** |
| Broader contextual and multilevel lines pressure decision texts to keep one typed substrate rather than pure verbal drift. | Current multilevel-learning and evolution-as-inference work argues for one shared formal lens across levels even when the heavier final geometry is still unsettled. | [Multilevel selection as Bayesian inference, major transitions in individuality as structure learning](https://royalsocietypublishing.org/doi/10.1098/rsos.190202) | `C.11` therefore keeps one minimal typed floor and one widened chooser surface while stating by value that full aggregation law, cross-level conflict doctrine, and heavier multilevel mathematics remain outside the current first wave. | **Adapt.** |

Practical reading of this alignment:

- In ordinary current-option cases, start with the classical evidential baseline and use it to emit one explicit `choose now`, `probe again`, or `reroute` result under one shared `BeliefState` and `OutcomeModel`.
- If intervention structure changes the survivor relation, state that explicitly and switch to causal comparison rather than leaving the comparison at the level of correlation talk.
- If predictor-coupling or structurally linked choice procedures remain load-bearing, keep the subjunctive layer visible and say what linked structure could still reverse the current result.
- If another measurement, comparison pass, or search pass is being considered, treat its value and cost as part of the current decision doctrine rather than as one later planning afterthought.
- If the chooser is embodied, online, and socially coupled, or if context and order effects change the comparison state, keep those repaired limitations visible by naming the exact observation, social-expectation clarification, order stabilization, response-replicability check, or measurement-class clarification that could still change the current `ChoiceResult`, and say directly when fuller `ROE`, quantum-like state-space, or multilevel doctrine still sits outside this first wave.
- If the quantum-like line is activated, treat it as one measurement-sensitive mathematical lens or representational repair, not as one claim that the chooser or world is physically quantum.
- If none of those heavier repaired limitations is live, stay with the lighter branch rather than activating one prestigious label that does not yet change the next move.

Worked-slice discipline from these rows:

- the system grounding slice is disciplined primarily by the bounded-resource and classical-baseline rows, so the output must end in one explicit probe-or-choose result;
- the episteme grounding slice is disciplined primarily by the bounded-resource and subjunctive-repair rows, so the output must say what comparison pass or predictor-coupled clarification could still reverse the result;
- the collective and contextual grounding slice is disciplined primarily by the active-inference and quantum-like rows, so the output must name the embodied observation, framing stabilization, or reroute that now becomes lawful.
### Relations

- **Builds on:** `A.6.P`, `A.6.5`, `A.13`, `C.9`, `A.18`, `A.19`
- **Read next when this burden moves:** `C.18` for candidate generation and open-ended search, `C.19` for one explicit pool-policy result over exploration or exploitation governance, `C.24` for one enactment-facing call plan or `CheckpointReturn`, `G.5` for shortlist-family public head and emitted selected-set semantics
- **Keeps outside:** candidate generation, pool-wide exploration or exploitation policy, selected-set publication semantics, and execution sequencing
- **Aligns with:** classical evidential decision theory, causal decision theory, success-first or subjunctive repair, bounded-resource metareasoning and probe-cost doctrine, active-inference-adjacent decision work, quantum-like contextual repair where context or order effects are real, and multilevel mathematical-lens pressure at the minimal-floor level only
### C.11:End
## C.13 — Constructional Mereology (Compose‑CAL)

### Intent

Provide a single, generative calculus for part–whole structure so that **all** structural relations in FPF are *constructed* (not merely declared) from three primitives and thereby inherit extensional identity by design. The calculus is hidden from day‑to‑day users behind relation aliases; its artefacts are traces that witness how a whole arises from its parts.

Also known as *“Γₘ mereology”*, *“constructor‑based composition”*.

**Layer.** *calculus.*
**Depends on.** Kernel only (no upward imports).
**Consumed by.** CT2R‑LOG (B.3.5) Working‑Model alias logic and any FPF pattern that needs part–whole semantics. Compose‑CAL does **not** import alias definitions; it merely emits traces that others may reference.

Compose‑CAL introduces a **single construction operator Γₘ** with exactly three constructors—**sum**, **set**, **slice**—sufficient to build structural wholes, collections‑as‑wholes, and aspects **without** extending the Kernel’s type set. No “parallel” or “temporal slice” constructor is added. Every construction yields a **trace** that serves as the witness for structure. Human‑facing relations such as *ComponentOf*, *MemberOf*, *AspectOf* are defined elsewhere as **Working‑Model aliases** and are *grounded* in these traces; Compose‑CAL itself remains purely generative and extensional.
### Problem frame & Problem

FPF presents a unified structural backbone used across disciplines. Historically, sub‑relations like *ComponentOf* or *MemberOf* were **declared** directly. This maximised usability but provided no generative guarantee that a new subtype was extensionally well‑behaved or reducible to common mereology.

Declared lists of part‑of sub‑relations **scale poorly** and **lack identity guarantees**. Engineers ask for a *single dial* (“is x part of y?”), while ontologists need a principled foundation that (a) avoids Kernel bloat and (b) proves that wholes are nothing over and above their parts. Adding yet another bespoke relation (e.g., *PortionOf*) should not entail schema surgery or ad‑hoc rules.
### Forces

* **Parsimony (C‑5).** Add no core types if composition suffices; keep the constructor set minimal.
* **Minimal Kernel (P‑1).** Generativity must live in a calculus pattern, not in Kernel axioms and postulates.
* **Cognitive asymmetry.** Everyday users want “one part‑of query”; specialists accept complexity backstage.
* **Trans‑disciplinary unification.** Every pattern that needs mereology should reuse one *generative* basis.
* **Green‑field strictness.** With no legacy to break, we can require grounding for new structural edges.
### Solution

#### Solution sketch

**Compose‑CAL SHALL provide Γₘ with three and only three constructors:**
1. **`Γₘ.sum(parts:Set[U.Entity])`** — returns a whole *W* such that each *p* in *parts* stands in **KernelPartOf(p, W)**.
2. **`Γₘ.set(elems:Set[U.Entity])`** — returns a **collection** *C*; each *e* in *elems* stands in a calculus‑internal **mero:KernelPartOf(e, C)** under **member‑as‑part** semantics (publication alias: typically **`ut:MemberOf`**). **Counts/order** (e.g., parallel/serial factors) are **not carried here**; they live in method/time families adjacent to structure.  *Note:* although `mero:KernelPartOf` is transitive in the calculus, the **published** `MemberOf` alias remains **non‑transitive** by design (see A.14 guards). 
3. **`Γₘ.slice(entity:U.Entity, facet:U.Facet)`** — returns an **aspect** *S* such that **mero:KernelPartOf(S, entity)** and *S* carries the declared **facet**. Temporal facets are excluded here.
   
**Note.** The calculus names an internal backbone **`mero:KernelPartOf`**; the Kernel’s public `ut:PartOf`/**A.14** catalogue remain unchanged. Publish only via Working‑Model aliases (CT2R‑LOG).

The calculus emits a **trace** for every construction; Structural aliases **MUST** be *grounded by* exactly one such trace.

**Non‑goals (clarifications).**
* No extra constructors for “parallelism” or “time slices”; parallelism is modelled via **set** (with order handled in `Γ_method`), and temporal parts live in the appropriate temporal/system calculus. This preserves parsimony.
* Compose‑CAL does not define user‑visible relation names; those belong to the alias layer.
#### Normative Standard (high‑level)

* **C13‑N1.** *Extensional identity.* Two Γₘ results are identical iff they have the same parts under the same constructor and facet conditions.
* **C13-N2.** *Structural grounding stance.* Every **structural** edge **MUST** reference **exactly one** Γₘ trace as its grounding witness **and SHALL declare `validationMode = axiomatic`** (see B.3.5 / E.14). **Structural edges MUST NOT** be published in `postulate` or `inferential` stances.
* **C13‑N3.** *Algebraic laws.* `Γₘ.sum` and `Γₘ.set` are **commutative** and **idempotent** over their inputs; `Γₘ.slice` composes only by facet‑compatible refinement.
* **C13‑N4.** *Acyclicity & antisymmetry.* Structural part‑of induced by Γₘ is transitive, antisymmetric, and acyclic at the level of entities. *(Formal axioms appear later in this pattern.)*
* **C13‑N5.** *Separation of concerns.* Γₘ provides constructions and traces; naming, aliasing and human‑level relation taxonomies are defined outside Compose‑CAL (see B.3.5 for the CT2R‑LOG handshake).
* **C13‑N6.** *Member vs component.* `Γₘ.set` yields **collections** whose Working‑Model alias is **MemberOf**; authors **SHALL NOT** infer **ComponentOf** from **MemberOf** without a separate `Γₘ.sum` narrative.
* **C13‑N7.** *Domain guard.* Do **not** apply Compose‑CAL to roles, methods, or works (see A.12/A.15): these are outside mereology.
#### Scope, applicability, terms & notation

Use Compose-CAL whenever a claim concerns **structural containment** of entities (assemblies, collections, aspects). Compose-CAL is *not* used for epistemic relations between knowledge artefacts; those are **epistemic** relations and may be justified by **Logical/Mapping** and/or **Empirical Validation** with an explicit `validationMode ∈ {inferential, postulate}`. Compose-CAL is neutral with respect to domain (mechanical, biological, software, etc.).

* **Γₘ** — the mereological construction operator of this calculus.
* **trace** — a minimal, inspectable witness that a constructor was applied to given inputs to yield a whole (or aspect).
* **structural part‑of** — the structural relation induced by Γₘ; user‑facing aliases (e.g., *ComponentOf*, *MemberOf*) are separate patterns that **must** point back to traces.
  
 **Alias readiness.** Typical CT2R mappings:  
* **ComponentOf** ⇢ `sum` narrative;  
* **MemberOf** ⇢ `set` narrative;  
* **AspectOf** ⇢ `slice` narrative;  
* **PortionOf** ⇢ `slice(entity, facet="material/spatial‑region")` **plus** metrical semantics (A.14);  
* **ConstituentOf** (logical/content) ⇢ `sum` narrative over conceptual parts. *(Material mixtures are **not** `ConstituentOf`; use `PortionOf` or `ComponentOf` per A.14.)*
### Archetypal Grounding (System / Episteme duo)

> **Tell–Show–Show.** Compose‑CAL is a thinking‑level calculus for building structural wholes from parts. We *show* it twice—first on a **System** (structural) and then on an **Episteme** case (where constructive grounding is *not* the primary mode).

#### System (structural; constructive grounding)

**Story.** A **Skid** is assembled from its **Pump**, **Motor**, **Baseframe**, and **Manifold**.

**Constructive grounding (Γ\_m).**
Narrate a *sum* of parts: “Skid = sum{Pump, Motor, Baseframe, Manifold}.” This uses **`Γ_m.sum`** to obtain a whole whose parts stand in **KernelPartOf**; the resulting Working‑Model relation engineers publish is **`ut:ComponentOf`** on each edge from part to whole. The mapping “*sum → ComponentOf*” reflects the intended aliasing between constructive traces and human‑facing mereology.

**Facets and collections.** 
Need the **inspection surface**? Narrate **`Γₘ.slice(Skid, "spatial")`** and publish **`ut:AspectOf`**. Need a group of **Transfer interactions**? Narrate **`Γₘ.set{…}`** and publish **`ut:MemberOf`**—this is a **collection-as-whole**, not a sub‑assembly; no component identity is implied without a separate **`Γₘ.sum`** narrative.

**Plane separation.**
Assembly **order** and **time** are *not* encoded here: parallel lines and schedules live in method/time families and are described adjacent to, not inside, the part‑tree.
#### Episteme (knowledge‑bearing; non‑constructive first)

**Story.** A **Mass‑Flow Representation** is used to stand for a measured flow in a plant dataset.

**Grounding choice.** 
Here the Working‑Model relation (e.g., **RepresentationOf**) is **epistemic**. Authors typically justify it by *inferential* or *postulate* stances (argument or calibration cues), not by a mereological construction; constructive traces remain optional. This preserves the firewall between structure and knowledge claims while keeping a clear path to stronger assurance if the team later reframes part of the representation structurally (e.g., sets of interactions as a **`Γ_m.set`** for a flow bundle).
#### Scope justification

* **Universality.** The trio **sum / set / slice** appears across mechanical assemblies, biological complexes, and organizational artifacts; aliasing to **ComponentOf / MemberOf / AspectOf** provides a stable Working‑Model surface for those domains.
* **Parsimony.** No “parallel” or “temporal slice” constructor is added; time slices belong in the temporal calculus, and parallelism is modelled as a **set** plus method metadata.
### Bias‑Annotation (cognitive anti‑patterns and counter‑moves)

| Bias (name)                       | Symptom                                                                                                         | Counter‑move (conceptual)                                                                                                    | Where to look                               |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| **Constructor‑centrism**          | Treating the trace as “the real thing” and the Working‑Model edge (e.g., **ComponentOf**) as merely decorative. | Re‑affirm **Working‑Model first** (publish in `ut:*Of`), then attach constructive narratives only when assurance demands it. | B.3.5 (Working‑Model relations & grounding) |
| **Collection ↔ Composition swap** | Using **MemberOf** to stand in for **PartOf**, then inferring structural identity.                              | Keep **set** outputs as *collections*; use **sum** for wholes with extensional identity.                                     | A.14 (Advanced Mereology)                   |
| **Temporal leakage**              | Smuggling sequence/phase into part‑trees.                                                                       | Route order/time to their planes; **no** “temporal slice” constructor in Compose‑CAL.                                        | B.1.\* (Γ\_method / Γ\_time)                |
| **Over‑slicing**                  | Multiplying aspects until identity becomes opaque.                                                              | Declare the **facet** explicitly; stop when aspects no longer aid recognition of the same whole.                             | A.14 (Aspect/Phase distinction)             |
| **Feature creep**                 | Proposing a new constructor for a special case.                                                                 | Reduce to **sum / set / slice**; if reduction fails across ≥ 3 domains, reconsider the modelling plane before adding power.  | C‑5 (Parsimony)                             |
| **Axiomatic inflation**           | Demanding constructive traces for epistemic links by default.                                                   | Use *inferential* / *postulate* where appropriate; reserve *axiomatic* for structural identity.                              | B.3.5 (validation modes)                    |
### Conformance Checklist (normative, calculus‑level)

The following regulate **how to think and write** when invoking Compose‑CAL. They are notation‑agnostic and conceptual.

| ID                                         | Requirement                                                                                                                                                                                    | Purpose                                                                 |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **CC‑C13‑1 (Three moves only).**           | Authors **SHALL** construct structural narratives using exactly **`Γ_m.sum`**, **`Γ_m.set`**, and **`Γ_m.slice`**. No additional constructors are introduced in this calculus.                 | Preserve **parsimony** and cross‑domain comparability.                  |
| **CC‑C13‑2 (Kernel invariants).**          | Constructive narratives **SHALL** respect **KernelPartOf** invariants (transitivity, antisymmetry, acyclicity) and yield extensional identity for wholes.                                      | Keep structural identity intelligible and replayable.                   |
| **CC‑C13‑3 (Algebraic laws).**        | `sum`/`set` are commutative & idempotent; `slice` composes only with facet‑compatible refinement. | Make traces **peer‑reconstructible** and easy to replay in thought. |
| **CC‑C13‑4 (No order/time in mereology).** | Authors **SHALL NOT** encode execution order, parallelism, or temporal coverage via constructors; such concerns belong to method/time planes and are stated adjacent to structure.             | Maintain the plane firewall.                                            |
| **CC‑C13‑5 (Narratability).**              | Each constructive trace **SHALL** be narratable in plain language **without introducing new primitives**.                                                                                      | Enforce human‑first clarity; uphold C‑5.                                |
| **CC‑C13‑6 (Alias alignment).**            | When Publishing Working‑Model relations for structural content, authors **SHOULD** align “sum→ComponentOf”, “set→MemberOf (or pattern‑specific)”, “slice→AspectOf” in their explanatory prose. | Keep alias semantics stable across Contexts.                               |
| **CC-C13-7 (CT2R-LOG handshake).**     | For every **structural** edge on the Working-Model, authors **SHALL** set `validationMode=axiomatic` and point **`tv:groundedBy`** to exactly **one** Γₘ trace (`sum|set|slice`). *Legacy “Tier-1” wording deprecated; express formality via **F** per C.2.3.* | Clean bridge to the Working-Model alias layer; decouples relation kind from legacy “tiers”. |
| **CC‑C13‑8 (Member ≠ Component).**         | A **set** output remains a *collection*; authors **SHALL NOT** infer **ComponentOf** from **MemberOf**. When an integrated assembly is intended, provide a separate **`Γ_m.sum`** narrative.   | Prevent membership→component conflation.                                 |
| **CC‑C13‑9 (Facet explicitness).**         | **Slice** narratives **SHALL** name the **facet** used; temporal facets are excluded (handled elsewhere).                                                                                      | Keep aspects precise and non‑temporal.                                  |
| **CC‑C13‑10 (No roles in mereology).** | Do not apply Γₘ to `U.Role`, `U.Method`, or `U.Work`; these are outside mereology (A.12/A.15). | Preserve the plane firewall. |
| **CC‑C13‑11 (Member non‑transitive).** | When publishing `MemberOf`, do not rely on transitive closure across collection‑of‑collections; surface semantics remain non‑transitive per A.14. | Prevent Member→Component drift. |

> **Author’s note.** Compose‑CAL is a calculus for **constructive** reasoning about structure. Publishing remains in the **Working‑Model** layer (see B.3.5); constructive narratives are attached when the team seeks stronger assurance, never as a substitute for clear human‑facing relations.
### Consequences

**Benefits**

 * **Extensional clarity.** Every structural claim is reconstructed from `Γ_m.sum | Γ_m.set | Γ_m.slice`: **sum** establishes component‑assembly identity; **set** establishes collection identity; **slice** yields aspects as parts—without expanding the Kernel.
* **Human–first publication, formal–on‑demand.** Teams keep publishing **Working‑Model** relations (e.g., `ut:ComponentOf`), while **assurance** is attached as needed via a constructive grounding narrative and `tv:groundedBy` (see B.3.5).
* **Separation of planes preserved.** Order/parallelism and temporal coverage remain in `Γ_method` / `Γ_time`; structure is never overloaded to carry them, avoiding recurrent category errors.
* **Uniformity across domains.** The same triad models mechanical assemblies, socio‑technical memberships, and informational wholes without domain‑specific constructors or ad‑hoc exceptions.
* **Didactic economy.** Authors learn one compact calculus; reviewers gain a predictable place to look for constructive justification when `validationMode = axiomatic` (B.3.5 alignment).
* **Compositional reuse.** Traces are reusable fragments of reasoning; complex wholes are narratable as sums of sub‑traces, with sets for concurrency and slices for aspect selection.

**Trade‑offs / Mitigations**

* **Discipline cost at higher assurance.** Writing a concise grounding narrative for axiomatic claims takes effort. *Mitigation:* reuse the micro‑templates in this pattern’s Grounding section and keep narratives notation‑free.
* **Over‑use risk.** Temptation to treat collections as integrated assemblies. *Mitigation:* keep **MemberOf** distinct from **ComponentOf**; both `set` and `sum` yield wholes, but only **`sum`** establishes **component** structure and assembly identity.
* **Temporal leakage risk.** Authors may try to smuggle time into structure via “temporal slices.” *Mitigation:* use `Γ_time` for temporal statements and `slice` only for intensional aspects, not for time windows.

> **One‑line takeaway.** Compose‑CAL gives a minimal, universal *how‑it‑was‑built* story for any structural edge, without disturbing the human‑first publication surface defined in B.3.5.
### Rationale (informative)

**Why exactly three moves?**
`sum`, `set`, and `slice` are jointly sufficient and minimally overlapping:

* **`sum`** creates an **integrated whole** from parts and thereby establishes **component** structure (assembly identity).
* **`set`** creates a **collection‑as‑whole**; members are **parts of the collection** under member‑as‑part semantics, but **no component integration** is implied.
* **`slice`** returns an **aspect as part** of its bearer (facet‑constrained, e.g., spatial/material); temporal facets are excluded here.

All three moves create new entities; **sum** is the only move that establishes **component** identity. Neither `set` nor `slice` changes the identity of their inputs, and `set` never upgrades membership to component status. Temporal coverage and workflow order are handled in their own planes.

This separation mirrors long‑standing distinctions between composition, collection, and aspect, while enforcing **parsimony**: no additional constructors are introduced into the Kernel (C‑5). The calculus remains **notation‑agnostic**: its meanings are given in prose and mathematics; any diagrams are illustrative only, in line with the Notational‑Independence guard‑rail (E.5).

**Why constructive grounding lives outside the publication surface.**
FPF privileges **Working‑Model** relations as the canonical form for communication and design. Compose‑CAL supplies the **constructive shoulder** of the **Assurance Layer**: when authors choose `validationMode = axiomatic`, they narrate the whole as a `sum` of parts (with optional `set` and `slice` scaffolding) and point to that narrative via `tv:groundedBy`. This keeps the text readable while preserving a path to stronger assurance (B.3 family, Authoring Template).

**Why order/time are out of scope.**
Correctness‑by‑sequence and temporal coverage are orthogonal to **parthood**. Encoding them as parts breeds contradictions (e.g., “phase‑as‑component”). Compose‑CAL deliberately refuses any “serial/parallel/temporal constructor,” delegating such concerns to `Γ_method` and `Γ_time` and aligning with B.1’s flavour separation.
### Relations

**Builds on**

* **A.14 Advanced Mereology.** Uses its structural catalogue (Component/Portion/Aspect vs Member) as the *target* of constructive narratives; never collapses Member into Part.
* **E.5 Guard‑Rails (Notational Independence).** Meanings are given in prose; diagrams are illustrative only.  
* **E.5 Guard‑Rails (Unidirectional Dependency).** Compose‑CAL depends **downward** only; it never imports alias layers or higher planes.
* **E.8 Authoring Conventions.** Conforms to the canonical pattern template (Grounding section for architectural patterns; CC placement).

**Coordinates with**
* **B.3.5 CT2R‑LOG.** `tv:groundedBy` refers (conceptually) to Compose‑CAL traces when `validationMode = axiomatic`; **Working‑Model** relations remain the publication interface.
* **B.1 flavours.** Keeps order (`Γ_method`) and time (`Γ_time`) outside structure; may co‑appear in narratives when relevant but never as constructors.
* **Kind-CAL / Lang‑CHR.** Provide the Mapping shoulder of assurance (labels, type alignment) that complements constructive narratives in this pattern.
* **KD‑CAL.** Provides the Logical shoulder when authors justify relations inferentially instead of constructively.
* **C.16 (Measurement substrate).** Supplies quantitative hooks when a constructive narrative benefits from explicit counts/ratios (e.g., cardinalities, coverage), while keeping metrics distinct from mereology.

**Constrains**
* Any pattern that **creates** or **reasons about** structural wholes SHOULD narrate them using only `sum | set | slice`.
* Structural publication MUST NOT encode order/time; such claims belong to their dedicated flavours.
* Introducing new structural constructors requires a separate parsimony argument and is discouraged unless the triad cannot narrate the case without ambiguity.

**Provides**
* A minimal generative basis (`Γ_m.sum | Γ_m.set | Γ_m.slice`) and the corresponding reading discipline for constructive narratives.
* A stable interface with CT2R‑LOG for `tv:groundedBy` links under `validationMode = axiomatic`.
### C.13:End
## Measurement & Metrics Characterization (MM‑CHR)

### Intent (Normative)

**Name.** *Measurement & Metrics Characterization (MM‑CHR).* This is a user‑oriented name: in user‑facing narrative we may say *metrics*; in **Tech** register we speak **Characteristic / Scale / Level / Coordinate / Value / Score / Unit / ScoringMethod**; in **Formal** register we use `U.DHCMethod(Ref)` / `U.Measure` / `U.Unit` / `U.EvidenceStub`.
**Intent.** Provide a **transdisciplinary substrate for measurement** that any FPF pattern can rely on: a small, stable set of intensional constructs and relations—**`U.DHCMethodRef`**, **`U.Measure`**, **`U.Unit`**, **`U.EvidenceStub`**—disciplined by **CSLC** (*Characteristic / Scale / Level / Coordinate*) so that every recorded value is **interpretable**, and any claim of “comparability” is **auditable** (physics lab time‑of‑flight, figure‑skating judging, architectural modularity, etc.). **C.16** does **not** re‑define **Characteristic** (A.17) nor the CSLC kernel Standard (A.18); instead, it **exports** the measurement substrate that *binds* an FPF pattern’s measurable notions to **one Characteristic and one Scale** and frames a **conceptual link to evidence**. This characterization is **notation‑neutral**, **tool‑agnostic**, and **open‑ended** (no “lifecycle” narrative; evolution proceeds via **RSG** moves with checklists).

**One‑minute mental model (didactic; non‑normative).**
* **Template** (`U.DHCMethod`) says what a value *means*: the **Characteristic**, **Scale** (and **Unit** when applicable), plus **polarity** and applicability.
* **Reading** (`U.Measure`) says what was claimed about a **subject**: a value on that Scale, with a **time stance** and (when required) an **EvidenceStub**.
* **Direct comparability** is conservative: *same template*; everything else requires a **named, cited** transformation or equivalence owner.

**Non‑ownership boundary (single‑writer).** C.16 is **not** the semantic owner for (i) characterization mechanisms (e.g., normalization / indicatorization / scoring / comparison / selection), (ii) any normalization/equivalence notions (method tokens, “invariant value” notions, equivalence relations), (iii) contract routing policies (comparability modes, legality gates), or (iv) suite protocol obligations. Those belong to their single owners (e.g., the CN/CG contract surfaces and the CHR mechanism owner patterns). C.16 may **cite** such owners when motivating evidence or interpretability, but MUST NOT introduce or restate their terminology or laws.

**Outcomes.**
(1) A uniform way for FPF patterns to *declare* what is measured and *read* what has been measured; (2) explicit **Characteristic anchoring** and **Scale typing** per CSLC; (3) principled **comparability** and **polarity** (declared at the template level); (4) **traceability** via conceptual evidence stubs; (5) seamless alignment with cross‑domain quantity notions (ISO 80000, ISO/IEC 25024, QUDT, SOSA/SSN, Verspoor) through Unification rows (Part F).
### Scope & Status (Normative)

**Scope.** **C.16** specifies the **measurement substrate** for FPF patterns: the roles of `U.DHCMethodRef`, `U.Measure`, `U.Unit`, `U.EvidenceStub`; their **CSLC discipline** (by reference to A.17/A.18); and **evidence linkage semantics** at the level of *conceptual conditions*. It defines **direct interpretability** and **direct comparability** (same template), and it equips other patterns to state—and audit—stronger comparability claims by **citing** their single owners. It **exports** these constructs for all FPF patterns (KD‑CAL, Arch‑CAL, etc.) without prescribing domain formulae, procedures, or any CHR mechanism semantics.

**Status.** **Normative** C.16 **depends on** A.17 (canonical **Characteristic**) and A.18 (minimal **CSLC** in Kernel). Where C.16 cites external CG‑frames, the stance is through **Part F** rows and **Bridges** (with CL and loss notes), not by vocabulary import. 

**Out of scope.** No computational recipes, no workflow prescriptions, no governance/process guidance. No definitions of normalization/indicatorization/scoring/comparison/selection mechanisms, no comparability routing policies, and no legality gate specifications. C.16 concerns **objects of thought** (intensions) and their **validity conditions** for measurement claims, not records or tooling. (Implementation guidance, if any, belongs outside Part C.)
### Problem & Context (Informative)

#### The problem C.16 solves

Across FPF patterns, people say “score”, “metric”, “rating”, “property”. Without a shared substrate, numbers drift: *42 of what? on which scale? comparable to whom?* C.16 eliminates drift by requiring every metric notion to **bind** to **one** Characteristic and **one** Scale, and by **separating** intensional anchors from descriptions and ScoringMethods. The result is **portable meaning**: a measure is always readable as a **Coordinate on a declared Scale of a named Characteristic**, with a principled path to evidence.
#### Context and prior art

* **Kernel canon.** A.17 makes **Characteristic** the sole canonical anchor for measurability; A.18 fixes **CSLC** as the minimal sufficiency for interpretability. C.16 relies on both.
* **Cross‑domain alignment.** The MM‑CHR family already maps FPF U.Types to **ISO 80000‑1 (Quantity)**, **ISO/IEC 25024 (Data‑quality Characteristic)**, **QUDT (QuantityKind/QuantityValue)**, **W3C SOSA/SSN (Observable/Observed/Result)**, and domain “feature/metric” usage (Verspoor, TF Metrics). C.16 uses these rows **as Bridges** (Part F), preserving local senses and documenting losses.  
* **Open‑ended evolution.** FPF replaces “lifecycle” with **Role‑State Graph (RSG)** style state checklists (A.2.5): movement is along **certified states** with checklists; re‑entry is allowed when distinctions change. C.16 uses this device only to frame **readiness** and **revision** of metric notions conceptually (no processes implied).
### Forces (Informative)

**F1 — Interpretability first.** A value detached from its Characteristic/Scale is meaningless; CSLC supplies minimum context.
**F2 — Transdisciplinarity.** Physics, architecture, curation, sport judging—*one* substrate must cover all while respecting scale types and polarity.
**F3 — Intension vs description.** Confusing the **Characteristic** (intensional object) with its rubric or exemplar text (descriptions) corrupts claims; C.16 keeps them distinct.
**F4 — Comparability without coercion.** Ordinal ≠ interval; ratio admits unit change, ordinal does not; polarity matters for “better/worse”. C.16 encodes these **as conceptual constraints**, not formulas.
**F5 — Evidence sufficiency.** A measure should be *checkable in principle*; evidence is a **conceptual link** (not storage advice).
**F6 — Lexical discipline.** One canon in normative register; narrative labels are didactic only (Part E). C.16 reuses E.10’s **register mapping**.
### Solution Outline (Normative)

**S1 — Exported objects.** C.16 **exports** four intensional constructs to be used by any FPF pattern:

1. **`U.DHCMethod`** — a *measurement template* (a Definition) that binds **one `U.Characteristic`** to **one Scale form**, with declared **polarity** and (optionally) a **citation point** to the semantic owner of any non‑trivial equivalence/comparability claim that is relied upon elsewhere (e.g., a Bridge or a declared transformation owner). **References** to this template use `U.DHCMethodRef`. It is an *intensional specification*, not a record layout.
2. **`U.Measure`** — an *assertion* that a **subject** occupies a **Coordinate** (or **Level**, if discrete) on that Scale; the measure **references** its template and carries a **conceptual pointer to evidence** (`U.EvidenceStub`).
3. **`U.Unit`** — the *unit kind* associated with the Scale where applicable (physical quantities, normalized “points”, “stars”, “%”); unit coherence is part of comparability conditions.
4. **`U.EvidenceStub`** — a *conceptual locator* of grounds for the asserted value (type, identifier, brief summary, optional integrity notion); sufficiency criteria are **conceptual** (see §9, later).

**S2 — Comparability stance (boundary‑aware).** C.16 states only the **direct** comparability condition for measurement claims: *same template* (hence, same Characteristic + Scale + Unit semantics by reference to A.17/A.18). Any comparability claim that relies on transformations (normalization, scoring, aggregation, cross‑context transport, bridge losses, legality gating) MUST cite its single semantic owner (CN/CG surfaces and/or the relevant mechanism cards). C.16 does not define those transformations or their laws. (Details: §7–§8 in later parts.)

**S3 — Evidence stance.** A measure that, by its template, **requires** evidence, is **inadmissible** without a meaningful `U.EvidenceStub`. C.16 defines **what it means conceptually** for evidence to “connect” the subject, the Characteristic, and its symbolic description; mechanisms are out of scope. (Details: §9 in later parts.)

**S4 — RSG framing (open‑endedness).** Readiness, calibration, and revision of metric notions are expressed as **RSG node moves with checklists** (e.g., “characteristic anchored”, “Scale typed”, “Unit coherent”, “ScoringMethod declared”), allowing **re‑entry** when distinctions change; there is no terminal “lifecycle”. (Details: §10, later.)

#### Lexical Discipline & Registers (Normative)

**L1 — Canon.** Use **Characteristic / Scale / Level / Coordinate / Value / Score / Unit / ScoringMethod** in **Tech** register; their `U.*` counterparts in **Formal**. Narrative labels (e.g., *axis*, *points*, *stars*) are **didactic only**, and are mapped at first mention to the Tech canon (E.10). 
**L1‑bis — “metric”.** The noun *metric* is **not** a Tech‑register canonical token for measurables; use **Characteristic / Scale / Coordinate / Score / ScoringMethod**. It **may** appear in the pattern title and in the Formal names `U.DHCMethodRef` / `U.Measure`. Do not use *metric* as a synonym for **Characteristic** or **Score** in normative prose.
**L2 — Intension vs Description.** Keep **intensional objects** (`U.DHCMethodRef`, `U.Characteristic`) distinct from **descriptions** (rubrics, exemplars) and from **claims** (`U.Measure`). No collapsing of names across these layers.
**L3 — No synonym sprawl.** In normative clauses do **not** substitute *dimension/axis/property/feature* for **Characteristic**; A.17 governs canonicalization. (C.16 inherits A.17’s rename policy.)
**L4 — Bridge‑only unification.** Cross‑vocabulary sameness appears only via **F.9 Bridges** with **CL** and **loss notes**; C.16’s lexicon is the *source* side for measurement rows.
**L5 — Plain‑register shorthand.** In **Plain** register *metric* MAY be used as shorthand for “template + readings”, but on first use it MUST be mapped to **`U.DHCMethod` (template)** and **`U.Measure` (reading)**, and to the Tech canon terms that matter for meaning.
**L6 — No CHR‑mechanism terminology ownership.** Tokens and laws owned by characterization mechanisms (e.g., normalization method tokens, invariant‑value notions, indicatorization policy terms) MUST be introduced only by their owner patterns. C.16 may mention them only as **cited** external terms, never as locally defined canon.
#### Relations (pointers; details later)

**To A.17 / A.18.** C.16 *uses* A.17’s canonical **Characteristic** and A.18’s **CSLC sufficiency**; it neither re‑states nor weakens them.
**To Part F.** C.16 is the **exporting pattern** behind measurement rows in UTS/Bridges (e.g., **result‑value** ↔ SOSA `Result`, ISO `QuantityValue`).
**To Arch‑CAL.** Architectural qualities (*Coupling, Cohesion, Evolvability*) become **Characteristics** measured via C.16 templates; architectural dynamics read as trajectories in **CharacteristicSpace** (A.17 context).
#### Normative Core Model (types & Standards)

> **Position.** MM‑CHR does **not** redefine kernel terms; it **binds** them to an FPF‑level Standard that every metric must satisfy. Canonical vocabulary and CSLC duties are inherited from **A.17**/**A.18** and referenced here without duplication.
> 
> **Source of Truth** A.17/A.18 are the sole sources of truth for Canon and CSLC; C.16 **adopts by reference** and **forbids restatements** of their definitions. C.16 only **exports** `U.*` constructs, comparability stance, evidence semantics, and RSG touch‑points.
>
> **CHR boundary reminder.** Any notion that belongs to characterization mechanisms (normalization, indicatorization, scoring, aggregation, comparison, selection) appears in C.16 only as a **pointer** to its semantic owner. C.16 MUST NOT become a shadow owner for any such terminology or laws.

##### U.DHCMethod — the measurement template (normative)

**Role.** An intensional **Standard** that fixes *what is measured* and *how values must be read*—without producing any values itself. It is a *Definition*, not a Measure. **References** to this template use `U.DHCMethodRef`. *(Didactic: think “the meaning contract for a reading”.)*

**R‑MT‑1 (CSLC anchor).** A DHCMethod **SHALL** bind to **exactly one** `U.Characteristic` and **exactly one** **Scale‑form** admissible for that Characteristic (cf. A.18). Level is **optional** (used when the scale is enumerated); otherwise values are given directly as Coordinates.

**R‑MT‑2 (Unit).** If the scale carries units (interval/ratio), the template **SHALL** designate a **Unit** of presentation. For ordinal/nominal scales, unit may be absent or a nominal label (e.g., “stars”). (Old MM‑CHR Annex A already listed these structural elements; here we fix the conceptual obligation. )

**R‑MT‑3 (Polarity).** For any ordered scale, the template **SHALL** declare polarity (*higher‑is‑better / lower‑is‑better / target‑is‑best*), as a semantic reading aid and as an input to consuming patterns. If polarity is *target‑is‑best*, the template **SHALL** name the target value (or target set) and MAY cite (by reference) the semantic owner of any tolerance/fall‑off convention used by downstream mechanisms or methods. C.16 does **not** standardize tolerance/fall‑off semantics; those belong to the semantic owner of the relevant scoring/normalization/selection mechanism or method description.

**R‑MT‑4 (Applicability).** A template **SHALL** state the **applicability frame** (what kinds of subjects it meaningfully applies to) in conceptual terms; this is a property of the definition, not of any measure.

**R‑MT‑5 (Intension vs description).** The template is an **intensional object**. Any rubric, checklist, or prose that explains it is a **Description**; they are related but not identical (E.10 discipline).

**R‑MT‑6 (Cardinality hint).** A Template **MAY** declare its intended **cardinality semantics** for a subject within a **time stance** (e.g., *latest‑only*, *at‑most‑one‑per‑day*, *time series*).
Where declared, claims outside that semantics are **inadmissible conceptually** (they must be reframed or versioned). *Purpose:* prevent silent duplicates and mixed regimes without imposing storage logic.

**R‑MT‑7 (MAY).** `UncertaintyPolicy` — optional conceptual guidance on how uncertainty is expressed/read (e.g., band/CI/quantile), without prescribing methods/tools.
*(Informative examples: calibrated probability with a confidence band; a prediction interval; a set‑valued reading such as a prediction set.)*
##### U.DHCMethod — the measurement template (normative)

**Role.** An intensional **Standard** that fixes *what is measured* and *how values must be read*—without producing any values itself. It is a *Definition*, not a Measure. **References** to this template use `U.DHCMethodRef`. *(Didactic: think “the meaning contract for a reading”.)*

**R‑MT‑1 (CSLC anchor).** A DHCMethod **SHALL** bind to **exactly one** `U.Characteristic` and **exactly one** **Scale‑form** admissible for that Characteristic (cf. A.18). Level is **optional** (used when the scale is enumerated); otherwise values are given directly as Coordinates.

**R‑MT‑2 (Unit).** If the scale carries units (interval/ratio), the template **SHALL** designate a **Unit** of presentation. For ordinal/nominal scales, unit may be absent or a nominal label (e.g., “stars”). (Old MM‑CHR Annex A already listed these structural elements; here we fix the conceptual obligation. )

**R‑MT‑3 (Polarity).** For any ordered scale, the template **SHALL** declare polarity (*higher‑is‑better / lower‑is‑better / target‑is‑best*), as a semantic reading aid and as an input to consuming patterns. If polarity is *target‑is‑best*, the template **SHALL** name the target value (or target set) and MAY cite (by reference) the semantic owner of any tolerance/fall‑off convention used by downstream mechanisms or methods. C.16 does **not** standardize tolerance/fall‑off semantics; those belong to the semantic owner of the relevant scoring/normalization/selection mechanism or method description.

**R‑MT‑4 (Applicability).** A template **SHALL** state the **applicability frame** (what kinds of subjects it meaningfully applies to) in conceptual terms; this is a property of the definition, not of any measure.

**R‑MT‑5 (Intension vs description).** The template is an **intensional object**. Any rubric, checklist, or prose that explains it is a **Description**; they are related but not identical (E.10 discipline).

**R‑MT‑6 (Cardinality hint).** A Template **MAY** declare its intended **cardinality semantics** for a subject within a **time stance** (e.g., *latest‑only*, *at‑most‑one‑per‑day*, *time series*).
Where declared, claims outside that semantics are **inadmissible conceptually** (they must be reframed or versioned). *Purpose:* prevent silent duplicates and mixed regimes without imposing storage logic.

**R‑MT‑7 (MAY).** `UncertaintyPolicy` — optional conceptual guidance on how uncertainty is expressed/read (e.g., band/CI/quantile), without prescribing methods/tools.
*(Informative examples: calibrated probability with a confidence band; a prediction interval; a set‑valued reading such as a prediction set.)*
##### U.Measure — the recorded reading (normative)

**Role.** A **claim** that a subject occupies a **Coordinate** (or named **Level**) on the template’s scale, backed by a minimal pointer to its grounds.

**R‑ME‑1 (Template binding).** Every Measure **SHALL** reference exactly one DHCMethodRef; its **Value/Coordinate** must be **valid** for that template’s scale (type, range, category).

**R‑ME‑2 (Subject).** A Measure **SHALL** identify its **subject‑of‑measurement** (the bearer) unambiguously in the same Context of meaning as the template’s applicability frame.

**R‑ME‑3 (Evidence stub).** Where the template requires it, a Measure **SHALL** include an **EvidenceStub**—a conceptual pointer sufficient to support independent reasoning about the claim’s origin. (The old spec framed this as “traceability/provenance”; we keep only the **conceptual** role here. )

**R‑ME‑4 (Time stance).** A Measure **SHALL** carry a **time stance** (e.g., “as‑observed at T”, or “as‑aggregated over W”), expressed conceptually; it disambiguates the reading’s intended window without prescribing formats.

**R‑ME‑5 (Entity vs relation).** If the Characteristic is **relational**, the subject is a **tuple** (pair, k‑tuple); the wording of the claim reflects that arity and the template’s relation topology (cf. A.17).

**R‑ME‑6 (MAY).** `UncertaintyStub` — optional conceptual pointer to the adopted uncertainty estimation for this Measure, **if** required by the template.

> *Informative anchor.* The old Annex B example “Article Completeness” illustrates the split template/measure/evidence; **C.16** keeps the split but forbids storage‑level talk.
##### U.Unit — semantics of quantities (normative)

**Role.** A conceptual marker of **quantity kind** and admissible **conversions** within that kind; not every scale requires it.

**R‑UN‑1 (Quantity kind).** Where units apply, the template **SHALL** indicate the **quantity kind** (e.g., Time, Length, Dimensionless‑Score). Units are meaningful only **within** one kind.

**R‑UN‑2 (Convertibility).** Comparisons across different units are permitted **iff** they are **convertible** by kind‑preserving transformation (ratio/interval scales); for ordinal/nominal scales, no numeric conversions exist. (Old Annex A listed conversion hints; here we assert the conceptual boundary. )

**R‑UN‑3 (Canonical labels).** `%` denotes “fraction×100”; “points” denotes dimensionless magnitudes used for scores; “stars” denotes discrete ordinal marks. These are **labels** of representation, not new characteristics.

**R‑UN‑4 (Quantity‑kind bridge).** A Template on an interval/ratio Scale **SHOULD** name the underlying **quantity kind** (e.g., ISO 80000/QUDT category) to enable safe external bridges. This does **not** import external vocabularies; it declares an alignment point.
##### U.EvidenceStub — pointer to grounds (normative)

**Role.** A compact **tie** from a Measure to the grounds sufficient for **reasoned audit** (not a repository prescription).

**R‑EV‑1 (Minimal sufficiency).** An EvidenceStub **SHALL** carry, at minimum, a **type‑of‑ground** and an **identifier** sufficient to retrieve or reconstruct the grounds in the appropriate Context of meaning.

**R‑EV‑2 (Compositionality).** Multiple grounds may be **composed** as a finite set; composition is **commutative/associative/idempotent** at the level of stubs, enabling conceptual merge of corroborations.

**R‑EV‑3 (Soundness axiom).** A Measure is **MM‑CHR‑admissible** only if at least one **auditable chain of grounds** can be stated from the bearer to the Characteristic via an appropriate Description (Object–Concept–Symbol triangle in the episteme). *(Note:* mechanism‑level admissibility gates (e.g., legality/evidence thresholds in CG‑frames or CHR mechanisms) are owned elsewhere; C.16 defines only the conceptual “has grounds” link.)
**R‑EV‑3 (Soundness axiom).** A Measure is **MM‑CHR‑admissible** only if at least one **auditable chain of grounds** can be stated that connects:
`bearer (subject) → grounds → Characteristic → Coordinate/Level on the declared Scale`,
in the appropriate Context of meaning. *(Informative: this is the object–concept–symbol triangle.)*  
*(Boundary note:* mechanism‑level admissibility gates (e.g., legality/evidence thresholds in CG‑frames or CHR mechanisms) are owned elsewhere; C.16 defines only the conceptual “has grounds” link.)
#### Polarity, Comparability, and ScoringMethods (normative)

> **Notation.** To avoid clashes with the kernel’s global aggregation symbol, this FPF pattern denotes a **ScoringMethod** (score‑level mapping) by **𝒢** (calligraphic 𝒢).

**R‑POL‑1 (Declared polarity).** Every ordered scale **SHALL** declare polarity at the **template**. Any disclosed scoring method **𝒢** that issues a **Score** for that template **SHALL** be order‑compatible with the declared polarity semantics (monotone for ↑/↓ polarity; target‑aware only when the target semantics is explicitly declared and cited where it depends on external conventions).

**R‑CMP‑1 (Direct comparability).** Two readings are **directly comparable** only when they reference the **same `U.DHCMethodRef`** (hence share Characteristic + Scale + Unit semantics by reference to A.17/A.18). “Same‑template” is the only comparability relation defined by C.16.
*(Clarification:* sharing a name, unit label, or scale type across distinct templates is **not** sufficient for comparability in MM‑CHR; cross‑template comparability must be established via **R‑CMP‑2**.)*

**R‑CMP‑2 (Transformed comparability is cited, not defined).** If a comparison relies on any transformation or routing step (e.g., normalization, indicatorization, scoring, aggregation, cross‑context transport, bridge conversions, legality gates), that step **SHALL** be **named and cited** via its single semantic owner. C.16 does not define such transformations, their law sets, or their admissibility conditions.

**R‑G𝒢‑1 (ScoringMethod disclosure).** If a pattern issues a **Score** (a value on a score scale), its scoring method **𝒢 : Coordinate → Score** **SHALL** be identified **by reference** to its semantic owner (e.g., a method description card), and SHALL disclose:
(i) a **bounded codomain** / score range, and  
(ii) an explicit **order‑compatibility statement** (e.g., monotonicity) consistent with the template’s declared polarity.  
When reproducibility matters, the reference SHOULD be edition‑pinned (per the owner’s authoring discipline).  
C.16 does not define scoring methods; it only requires that a score be interpretable as a reading on a declared scale.

**R‑G𝒢‑2 (Ordinal respect).** For ordinal inputs, any cited scoring method must be **order‑preserving**; interval assumptions **MUST NOT** be smuggled in. *(Normative source for scale legality remains A.18; C.16 only enforces “no silent semantics upgrade”.)*
#### Entity vs Relation bindings (normative clarifications)

**R‑ER‑1 (Arity preservation).** If the Characteristic is `U.EntityCharacteristic`, the subject is **one** bearer; if `U.RelationCharacteristic`, the subject is a **k‑tuple** (k ≥ 2). The Measure’s claim text **SHALL** reflect this arity.

**R‑ER‑2 (Relation scale).** Relation‑valued scales **SHALL** fix their symmetry/antisymmetry and directionality (e.g., distance symmetric; influence directional), at the **template** level.

**R‑ER‑3 (Bridge to CG‑frames).** In architectural CG‑frames, **Coupling/Cohesion** are Characteristics over **modules** (structure) or **roles** (function). Their measures are relational (**Coupling**) or unary (**Cohesion** within an element), but both live in the same MM‑CHR substrate. (Alignment hinted in the old mapping rows across contexts. )
#### Acceptance (conceptual, RSG‑aware)

> Acceptance here is **thought‑level**. It uses the **Role‑State Graph (A.2.5)** pattern to organise mental checks—no “lifecycle” narratives.

**SCR‑C16‑A (Template sufficiency).** You can check—without invoking tooling—that the template has:
(i) a fixed **Characteristic** (A.17),  
(ii) a typed **Scale form** (A.18), and  
(iii) coherent **Unit** semantics where applicable (plus declared polarity for ordered scales).

**SCR‑C16‑B (Reading sufficiency).** For a given subject, you can check that the reading:
(i) cites the template,  
(ii) states a value valid for the Scale (Coordinate/Level),  
(iii) states a time stance,  
(iv) names **𝒢** when a Score is issued, and  
(v) provides EvidenceStub(s) where the template requires them.

**SCR‑C16‑C (Comparability).** When two readings are placed side‑by‑side, you can state in one breath whether they are **comparable as‑is** or only **after 𝒢**, and **why**.

**SCR‑C16‑D (Evidence adequacy).** For any required EvidenceStub, you can sketch at least one **auditable chain of grounds** from the subject to the Characteristic via a Description in the right Context.
#### C.16:5.7 Cross‑references & anchors

* **A.17 (CHR‑NORM).** Canonical **Characteristic** and Entity/Relation split; lexical rules and alias sunset.
* **A.18 (CSLC‑KERNEL).** One Characteristic + one Scale per template; Level optional; operation guard by scale type.
* **Annex C (old MM‑CHR).** Cross‑domain alignment hints for Characteristics/Observations/Quantities across ISO 80000, ISO/IEC 25024, QUDT, SOSA/SSN (used here only as conceptual witnesses).
### Scale‑type legality quick reference (Informative)

> **Didactic note.** This table is a memory aid for engineers and managers. It does **not** introduce new legality rules. Normative legality of operations by scale type is owned by **A.18 (CSLC)** (and, where mechanized in CG‑frames, by the relevant legality profiles).
> If any row below conflicts with A.18, treat it as an illustrative example and follow A.18.

| Scale type   | Comparisons    | Location          | Differences        | Ratios                   | Admissible summaries                                  | Typical anti‑patterns (forbidden)                                   |
| ------------ | -------------- | ----------------- | ------------------ | ------------------------ | ----------------------------------------------------- | ------------------------------------------------------------------- |
| **Nominal**  | =, ≠           | mode, frequencies | —                  | —                        | counts, proportions                                   | averaging labels; ordering categories without a declared order      |
| **Ordinal**  | <, =, > (rank) | median, quantiles | **not meaningful** | —                        | order‑respecting summaries (median rank, percentiles) | arithmetic mean of ranks; variance on ranks; linear blends of ranks |
| **Interval** | <, =, >        | mean location     | Δ meaningful       | ratio **not** meaningful | mean, sd of **differences**, correlation              | ratio claims (“twice as hot” in °C); geometric mean                 |
| **Ratio**    | <, =, >        | mean location     | Δ meaningful       | ratios meaningful        | arithmetic/geometric means, cv, growth rates          | adding heterogeneous units; log on nonpositive values               |

**Reminders (informative; see A.18 for normative rules).**
G‑1 (Order). On ordinal, transforms should be **monotone**.
G‑2 (Differences). On interval/ratio, **Δ** is meaningful; on ordinal/nominal, it is undefined.
G‑3 (Ratios). Only ratio Scales admit **x/y** semantics; interval/ordinal/nominal do not.
G‑4 (Unit coherence). Interval/ratio arithmetic presumes compatible units (or a declared conversion).
G‑5 (Target polarity). If polarity is targeted, comparisons use distance‑from‑target semantics as declared by the relevant owner (template + cited method/mechanism).

*(These rules line up with the MM‑CHR exposition of CSLC and term discipline; A.17 fixes the lexical side.)*
### Evidence Semantics (Normative)

#### What an Evidence Stub is (and is not)

**Definition.** `U.EvidenceStub` is a **conceptual pointer** that ties a **measure** to the **grounds** sufficient for independent checking (observations, arguments, lawful transformations). It is not the run log, not the carrier, and not the intensional characteristic itself. This keeps **intension–description–specification** distinct per E.10.D2 and the Clarity Lattice.

**Rule Σ‑1.** Whether evidence is **required** is a **property of the metric template**; if required, each `U.Measure` **SHALL** include an `U.EvidenceStub`.
**Rule Σ‑2.** Evidence composition is **commutative, associative, idempotent** at the concept level (sets/multisets of grounds); combining grounds can never *reduce* what is knowable about the measure’s warrant.
**Rule Σ‑3.** *Soundness minimum:* there exists a conceptual chain linking **bearer → Characteristic → Scale/Unit → admissible method/episteme**. (No “free‑floating numbers”.)
**Rule Σ‑4.** Any declared *agreement* construct used as evidence (e.g., dual readings, panels) **SHALL** respect the template’s scale type (per A.18) (e.g., order‑based concordance for ordinal; tolerance‑based agreement for interval/ratio).
**Note (boundary).** CG‑frame evidence thresholds (e.g., “minimal evidence” gates used by selection/scoring/comparison mechanisms) are owned elsewhere. C.16 defines only the EvidenceStub semantics that such gates may cite.
*Anchors:* MM‑CHR units/evidence notion; Strict Distinction and the separation of objects from their descriptions/specs.
### Integration with RSG & Dynamics (Normative/Clarifying)

#### RSG (Role‑State Graph) touch‑points

MM‑CHR **supplies recognisers** used in **State Checklists**. A checklist criterion **may** refer to a measure (e.g., “Cohesion ≥ T on ordinal ladder”), but the **state itself remains intensional**; the checklist is its **description**, and a **StateAssertion** is an evidence‑backed verdict over a Window. No lifecycle language is implied; RSGs are open‑ended graphs with re‑entry edges.

**Rule RSG‑M1.** When a checklist cites a measure, it **SHALL** do so by **Characteristic + Scale semantics** (and unit if applicable), not by colloquial aliases; Tech/Formal registers apply. **Rule RSG‑M2.** Thresholds in checklists **MUST** respect the scale type (no ratio talk on interval scales; no arithmetic on ordinal ladders).
#### Dynamics & CharacteristicSpace

`U.Dynamics.stateSpace` is a **CharacteristicSpace**—a named set of Characteristics with units/topology. MM‑CHR provides the **measurement side** of that space; patterns specify the **transition law**. Architectural or epistemic **dynamics** are then *trajectories in the declared CharacteristicSpace*. **No** procedural or storage commitments are implied.
### Conformance Checklist (Normative)

> *Thought‑level acceptance conditions for authors and reviewers; they constrain meaning, not tooling.*

**CC‑MCHR‑1 - CSLC anchoring.** Each `U.DHCMethodRef` binds **exactly one** `U.Characteristic` and **exactly one** scale; each `U.Measure` carries a value valid for that scale (cf. A.18).
**CC‑MCHR‑2 - Polarity declared.** Every **ordered** scale in a template declares **polarity**; any **Score** via 𝒢 is monotone w.r.t. that polarity.
**CC‑MCHR‑3 - Unit coherence.** Claims that compare or combine values are **grounded in unit coherence** (or declared conversions for interval/ratio).
**CC‑MCHR‑4 - Comparability honesty.** Ordered comparisons are asserted **only** when **R‑CMP‑1** holds (same‑template direct comparability) or when a **named, cited** transformation owner is provided per **R‑CMP‑2**; otherwise authors use qualitative/set‑level language.
**CC‑MCHR‑5 - Evidence sufficiency.** Where evidence is required by the template, the measure’s grounds are **conceptually sufficient** to retrace the claim; composition respects **Σ‑1…Σ‑4**.
**CC‑MCHR‑6 - RSG alignment.** If a measure gates a **state** in an RSG, the checklist criteria **respect scale semantics** and the **intensional vs description** split. No lifecycle phrasing; use RSG open‑ended moves.
**CC‑MCHR‑7 - Dynamics awareness.** Where discussions involve change, the **CharacteristicSpace** is **named** (characteristics, units, topology) and separated from the **transition law**.
**CC‑MCHR‑8 - Lexical guard‑rails.** Tech identifiers and headings use **Characteristic/Scale/Level/Value/Score/Unit/ScoringMethod**; aliases (axis/dimension/points/stars) appear **only** in explanatory Plain register with a first‑mention mapping to the Tech canon.
### Invariants & Anti‑Patterns (Normative unless marked “Informative”)

#### Invariants (N‑rules)

**N‑1 — One Characteristic + one Scale per template.**
Every `U.DHCMethodRef` binds *exactly one* **Characteristic** and *exactly one* **Scale** (its type + admissible range or level‑set). This is the CSLC sufficiency condition for interpretability.

**N‑2 — Value validity.**
A `U.Measure` holds a **Value** that is *admissible* for the template’s Scale (numeric range, categorical level); when a **Level** is used, it is among the named rungs declared for that Scale.

**N‑3 — Polarity is declared at the template.**
For ordered Scales, the template states the comparison direction (↑ better / ↓ better / target‑is‑best). Any **ScoringMethod mapping** to **Score** preserves that monotonic ordering. *(Note: we use “ScoringMethod mapping” instead of the Greek letter used elsewhere in FPF to avoid symbol conflicts.)*
For ordered Scales, the template states the comparison direction (↑ better / ↓ better / target‑is‑best). Any scoring method **𝒢** that issues a **Score** is order‑compatible with that declared polarity semantics.

**N‑4 — Unit coherence.**
Within one template there is one *primary* **Unit** of expression (or an explicit level‑set for non‑numeric Scales). Conversions are conceptually allowed only where the Scale supports meaningful arithmetic (interval/ratio); nominal/ordinal Scales are not subject to numeric conversions.

**N‑5 — Comparability guard.**
Two Measures are comparable *iff* they share the same template (hence, the same Characteristic + Scale + Unit) **or** stand in an explicit comparability relation whose single semantic owner is cited (e.g., an F‑cluster Bridge, or a cited characterization mechanism’s declared equivalence). Otherwise, comparability is not presumed.

**N‑6 — Evidence as conceptual anchoring.**
If a template requires it, each Measure includes an **EvidenceStub** that conceptually links the Value to its grounds; absence where required makes the Measure inadmissible for use. *(This is a conceptual obligation; no process mechanics are implied.)*

**N‑7 — Arity clarity.**
If the Characteristic is relational (applies to a pair/tuple), the subject of measurement is the relation itself; the reading must not be re‑described as a unary property of either participant.

**N‑8 — Open‑ended evolution; graph, not lifecycle.**
When MM‑CHR is used in change reasoning, movement happens in a **CharacteristicSpace** and along a **Role‑State Graph (RSG)**. There is no lifecycle terminal; revisions may re‑enter earlier framing nodes as per A.17. *(Conceptual control structure only.)*
#### Anti‑Patterns (A‑rules) — with cures

**A‑1 — Scale drift under the same template.**
*Smell:* the Scale meaning (bounds, categories) shifts while the template ID remains.
*Cure:* version the template; declare the relation in the Unification suite.

**A‑2 — Arithmetic on ordinal.**
*Smell:* averaging “stars” or ranking labels as if they were intervals.
*Cure:* either keep order‑respecting operations only, or introduce a **ScoringMethod** that defines a proper Score range.

**A‑3 — Unit soup.**
*Smell:* mixing milliseconds and seconds for the same template, or “%” and “points” for one Scale.
*Cure:* one primary Unit per template; conversions (when meaningful) are declared conceptually, not ad‑hoc.

**A‑4 — Alias leakage.**
*Smell:* “axis/dimension/point/ladder” in normative identifiers or headings.
*Cure:* use only canonical tokens in normative prose; narrative labels are allowed *solely* in Plain register with first‑mention mapping (A.17).

**A‑5 — Multi‑Characteristic stuffing.**
*Smell:* one template tries to carry a vector of Values for several Characteristics.
*Cure:* separate templates (one Characteristic each) and compose coordinates explicitly when needed.

**A‑6 — Evidence afterthought.**
*Smell:* Measures required to have grounds are introduced without an intelligible EvidenceStub.
*Cure:* treat the EvidenceStub as part of the measurement claim itself, not an accessory.

**A‑7 — Template mutation after Measures exist.**
*Smell:* retro‑editing Characteristic/Scale/Unit of an active template.
*Cure:* immutability of that triad post‑use; publish a successor template if the concept changes.

**A‑8 — Score‑of‑everything.**
*Smell:* collapsing heterogeneous Values into a single “points” Score without declared ScoringMethod and SCP.
*Cure:* retain the Value on its Scale; add an explicit scoring method (by reference to its owner) and an explicit legality profile (owned elsewhere) only when there is a justified need for a Score.
### Cross‑Domain Vignettes (Informative, transdisciplinary)

> *Each vignette shows an CSLC‑conformant template → measure, without duplicating the A.17/A.18 glossaries.*

**V‑A (Architecture — relational property).**
Characteristic: **Coupling** (relational) between modules; Scale: ordinal {Low, Med, High}; Unit: level‑labels; Polarity: ↓ better.
Reading: subsystem pair ⟨M₁, M₂⟩ gets **Med**; **ScoringMethod** (optional) maps levels monotonically to a bounded Score for comparative dashboards.

**V‑B (Physics — interval/ratio).**
Characteristic: **ResponseTime**; Scale: ratio with non‑negative reals; Unit: seconds; Polarity: ↓ better.
Reading: subject S has **0.237 s**; direct comparability holds with readings on the **same template**; cross‑template comparability requires an explicitly cited equivalence/Bridge/transformation owner.

**V‑C (Performing arts — ordinal).**
Characteristic: **EdgeControlQuality**; Scale: ordinal levels 1…5; Unit: level‑labels; Polarity: ↑ better.
Reading: performance P gets **4**; any aggregation remains order‑respecting. If a numeric dashboard score is needed, cite a scoring method **𝒢** that maps levels monotonically to a bounded Score.

**V‑D (AI ethics — ratio).**
Characteristic: **ParityGap** (difference of positive rates); Scale: interval with symmetric bounds; Unit: percentage points; Polarity: ↓ better (0 is target).
Reading: model M on cohort C shows **3.2 pp**; evidence points conceptually to the derivation rationale (inputs, reference cohorts).
### Relations & Placement (Informative)

**Kernel.** MM‑CHR *imports* the canonical Characteristic vocabulary and the CSLC discipline fixed by A.17 and A.18; it does not redefine them. CharacteristicSpace reasoning (for change) lives in the patterns that consume MM‑CHR readings.

**Using patterns.** KD‑CAL, Arch‑CAL and others *instantiate* templates and produce measures; MM‑CHR remains a neutral measurement substrate. Trade‑off analyses and architectural trajectories operate over coordinates that MM‑CHR makes available, not inside MM‑CHR.

**Unification (F‑cluster).** External standards (e.g., ISO 80000 quantity types; W3C SOSA/SSN observable properties; QUDT units/quantity kinds) are related via Concept‑Set rows and Bridges; MM‑CHR treats those alignments as context supplied by F‑patterns, not as local re‑definitions.
### C.16:End
## Characterising Generative Novelty & Value (Creativity‑CHR)

**Status.** Mechanism specification (**CHR**) — normative where stated.
**Depends on.** A‑kernel (A.1–A.15), **CHR‑CAL** (C.7), **MM‑CHR** measurement infrastructure (C.16), **KD‑CAL** and **Sys‑CAL** for carriers and holons, **Decsn‑CAL** (utility), **Norm‑CAL** (constraints/ethics).
**Coordinates with.** **B.5.2.1 NQD** (abductive generator) for search instrumentation, **Agency-CHR** (C.9) for agential capacity, B-cluster trust/assurance (B.3), Canonical Evolution Loop (B.4), Role Assignment & Enactment Cycle (Six-Step) (F.6) and Naming Discipline for U.Types & Role Names (F.5).
**Guard‑rails.** Obeys E‑cluster authoring rules (Notational Independence; DevOps Lexical Firewall; Unidirectional Dependency).

**What this pattern provides (exports):**

This pattern exports **Characteristics** and measurement templates **only**. It **does not** export any Γ\_\* operators, portfolio composition rules, or selection/scalarization policies; those live in **C.18 NQD-CAL** and **C.19 E/E-LOG** (or **Decsn-CAL** for decision lenses). A Context _publishes_ the measurement space and admissible policies; a decision is taken by an _agent in role_ using a _named lens_ within that space.

* **`U.CreativitySpace`** — a **CharacteristicSpace** (CHR) with named **Characteristics** and scale metadata for evaluating creative work/outcomes **inside a `U.BoundedContext`**.
* **`U.CreativityProfile`** — a vector of coordinates in `U.CreativitySpace` attached by a **`U.Evaluation`** to a specific **Outcome** (usually an `U.Episteme` produced by `U.Work`).
* **Core Characteristics (kernel nucleus; Context‑extensible):**
1. **`Novelty@context`** — distance from a **`ReferenceBase`** in the current Context/time window; ∈ \[0, 1].
2. **`Use‑Value`** *(alias: `ValueGain`)* — measured or predicted improvement against a **declared objective**; interval/ratio scale per Context.
3. **`Surprise`** — negative log‑likelihood under a **GenerativePrior**; bits or nats.
4. **`ConstraintFit`** — degree of **must‑constraint** satisfaction (Norm‑CAL / Service acceptance); ∈ \[0, 1].
5. **Diversity_P (portfolio-level)** — coverage/dispersion (set-level). **Illumination** is a **report-metric over Diversity_P** (coverage/QD-score summaries). It is **report-only** and **never** part of the primary dominance test.
6. **`AttributionIntegrity`** — provenance/licensing discipline for lawful, transparent recombination; ∈ \[0, 1].
7. **`FamilyCoverage`** — (count, polarity ↑, scope=portfolio, unit=families, provenance: F1‑Card)
8. **`MinInterFamilyDistance`** — (ratio [0,1] or metric units, polarity ↑, scope=portfolio, DistanceDef@F1‑Card)
9. **`AliasRisk`** —  (ratio [0,1], polarity ↓, diagnostic; drop if dSig ≥3/5 characteristics collide)
10. **`U.DomainDiversitySignature (dSig)`** — 5‑tuple over discrete characteristics **[Sector, Function, Archetype, Regime, MetricFamily]**  attached to each `U.BoundedContext`. Used for **Near‑Duplicate** diagnostics and `AliasRisk`. Policy: flag as Near‑Duplicate when ≥3 characteristics match; see F.1 invariants and SCR‑F1‑S08..S09. 
11. **Note (AliasRisk binding).** `AliasRisk` MAY be computed using `dSig` collision diagnostics; a Context MUST declare the collision rule and policy id in DescriptorMap provenance when AliasRisk is reported.

* **Supporting types (linking points):**

  * **`U.ReferenceBase`** — the domain‑local corpus (by Context & time window) used to compute `Novelty@context`.
  * **`U.SimilarityKernel`** — a declared similarity metric class for the Context (text/image/design/code/etc.), with invariance notes.
  * **`U.GenerativePrior`** — a predictive model over the Context’s artifacts/behaviours used to compute `Surprise`.
  * **`U.CreativeEvaluation`** — a specialisation of `U.Evaluation` that yields a `U.CreativityProfile` and the Evidence Graph Ref.
  * **`EffortCost`** *(advisory)* — resource outlay to achieve the outcome; from WorkLedger (Resrc‑CAL). *(For normalization and planning; not itself “creativity.”)*

* **Operators (first tranche):** `composeProfiles` (set → portfolio), `dominates` (partial order in space), `frontier` (Pareto set), `normaliseByEffort`. *(Formal laws introduced in Quarter 2.)*
* **Relations (informative; not exported):** dominance relation (partial order in the space), frontier predicate (Pareto set), portfolio composition view. *C.17 exports no operators; these are mathematical relations only.*
* 
> **Scope note.** This pattern **does not** define who is “a creative person.” It characterises **creative outcomes and episodes** as **observed in Work** and **expressed as Epistemes**. Agency (capacity to originate) is measured in **Agency‑CHR (C.9)**; here we measure **what came out** and **how it scores** against stated goals and references.  A **Context publishes** the measurement space and admissible policies; a **decision is made by an agentic system in role**, using a named lens within that space. CHR exports **no Γ‑operators** and **no team workflow rules**.

### Motivation & Intent (manager’s read‑first)

**Problem we solve.** Teams talk past each other about “creativity”: some prize **novelty**, others **business value**, others **originality** or **risk‑managed invention**. Without a shared, context‑local measurement space, reviews derail, portfolios drift, and safety constraints are waived ad‑hoc.

**Intent.** Provide a **small, universal measurement kit** that turns “this is creative” into **checkable, context‑local statements** — grounded in **evidence**, aligned to **objectives**, and **composable** from individuals to portfolios.

**Manager’s one‑screen summary (what you can do with it):**

1. **Score** a design/code/theory change on **Novelty–Value–Surprise–ConstraintFit** with declared references and models.
2. **Compare** options in a **Pareto sense** (no single magic score forced).
3. **Consider** constraints as a **coordinate** in the space; compare options on **frontiers** while keeping Context for high‑novelty options
4. **Track** a portfolio’s **Diversity** to avoid local maxima and groupthink.
5. **Defend** decisions with an auditable **CreativeEvaluation** that cites **what was new relative to which base**, **how value was measured**, and **why this counts here**.
### Forces

| Force                                | Tension we must resolve                                                                                                                 |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Universality vs. domain detail**   | One kit must serve hardware design, software, policy, and science, yet let each Context pick similarity kernels, priors, and value models. |
| **Invention vs. constraint**         | Creative leaps are valuable; safety, ethics, and acceptance are non‑negotiable.                                                         |
| **Local truth vs. Cross‑context reuse** | Meaning is context‑local (A.1.1); yet we need Bridges to compare across organisations/disciplines.                                         |
| **Single score vs. frontier**        | Management wants a number; reality is multi‑objective.                                                                                  |
| **Randomness vs. intention**         | Random noise looks “novel” yet useless; planned recombination can be highly creative.                                                   |

**Design answer.** A **context‑local CreativitySpace** with a **small set of characteristics**, each with **clear measurement templates** and **Evidence Graph Ref**; composition uses **frontiers and partial orders**, not forced scalarisation.
### Solution Overview — The context‑local CreativitySpace

**Idea.** Creativity is **not a type**; it is a **profile** measured on an **outcome** (episteme) or **episode** (set of works) **inside a bounded context**. The context supplies the **ReferenceBase**, **SimilarityKernel**, **GenerativePrior**, **objective function(s)**, and **acceptance constraints**.

**Objects in play (A‑kernel alignment):**

* A **system** (person, team, service) performs **`U.Work`** under a role (A.2).
* That work yields a **carrier** (doc/model/design/code), i.e., an **`U.Episteme`**.
* We apply a **`U.CreativeEvaluation`** to that episteme (and linked work) to produce a **`U.CreativityProfile`** with evidence.

**Cre­ativitySpace (first‑class CHR):**
`U.CreativitySpace(Context) := 〈Novelty@context, ValueGain, Surprise, ConstraintFit, Diversity_P, AttributionIntegrity, EffortCost?〉`
with **scale**/**unit** metadata from **MM‑CHR** (C.16), and Context‑specific **measurement methods** bound by **MethodDescription**.

**Design/run split (A.4):**

* **Design‑time**: score **concepts** or **specs** against **surrogate value models** and **priors**; record **assumptions** (USM scopes; A.2.6).
* **Run‑time**: recompute **ValueGain** and **ConstraintFit** from Work evidence (service acceptance, KPIs) and refresh **Surprise** if priors update.
### Vocabulary (CHR terms & D‑stubs)

> Names are **context‑local**; below are kernel terms. Roles like “Designer/Reviewer” are contextual (A.2). **Documents don’t act** (A.7/A.12); they are **evaluated**.

1. **`U.ReferenceBase`** *(D).* A curated, versioned **set of artifacts** (epistemes) and/or behaviours that define “what exists already” **in this Context and time window**.
   **Conformance (RB‑1):** must declare **inclusion criteria**, **time span (`TimeWindow`)**, and **coverage notes**.

2. **`U.SimilarityKernel`** *(D).* A declared **metric family** with invariances (e.g., text: cosine over embeddings, image: LPIPS, code: AST graph edit).
   **Conformance (SK‑1):** must cite **MethodDescription** and **test corpus**; state **limits**.

3. **`U.GenerativePrior`** *(D).* A model that yields **likelihood** of artifacts given the Context’s history (n‑gram/LM, design grammar, trend model).
   **Conformance (GP‑1):** must publish **training slice**, **fit method**, **perplexity/fit metrics**, and **refresh policy**.

4. **`U.CreativeOutcome`** *(D).* Any **`U.Episteme`** put forward for creative evaluation (e.g., new design, algorithm, spec, policy draft).
   **Note.** If the outcome is a **system change** without a single carrier, attach the evaluation to a **bundle** (set) of carriers referenced from Work.

5. **`U.CreativeEvaluation`** *(D).* A **`U.Evaluation`** that outputs a **`U.CreativityProfile`** and anchors to **ReferenceBase**, **Kernel/Prior**, **objective(s)**, **acceptance tests**, and **Work evidence**.

6. **`U.CreativityProfile`** *(D).* The **coordinate tuple** in `U.CreativitySpace` with provenance to the above inputs and **USM scopes**.
   **Conformance (CP‑1):** profile **must** include **scales/units**, **scopes**, **confidence bands** (B.3), and the **edition** of space definitions.
### The Core Characteristics (kernel nucleus)

Each characteristic is specified per **MM‑CHR (C.16)** with: **name**, **intent**, **carrier**, **polarity**, **scale type**, **measurement template**, **evidence**, **scope (USM)**, and **didactic cues**. *Context profiles MAY add characteristics; kernel characteristics MAY NOT be removed without a Bridge.*

#### Novelty@context — “How unlike the known set is this?”

* **Intent.** Quantify **distinctness** of the outcome relative to **`U.ReferenceBase`** (global or targeted slice).
* **Carrier.** `U.Episteme` (the outcome).
* **Polarity.** Higher is “more novel.”
* **Scale.** **\[0, 1]**; ratio (0 = duplicate under kernel; 1 = maximally distant).
* **Measurement template (normative pattern):**

  1. Declare **ReferenceBase** `B` and **TimeWindow** window.
  2. Declare **SimilarityKernel** `σ` and its invariances.
  3. Compute **`Novelty@context := 1 − max_{b∈B} sim_σ(outcome, b)`**, or a robust variant (top‑k mean).
  4. Publish **sensitivity note** (how results shift with kernel/`B`).
* **Evidence.** Kernel/version id; top‑k neighbours with distances; ablation on invariances.
* **Scope hooks (USM).** `B` **must** be a declared **slice**; Cross‑context use needs a **Bridge** with **CL** and **loss notes**.
* **Didactic cues.**

  * **Not** “randomness.” Noise has high novelty, low value.
  * **Local, not global.** Novelty is **to this Context now**, not timeless originality.
#### Use‑Value (alias: ValueGain) — “What good did this add under our objective?”

* **Intent.** Quantify **benefit** vs a baseline objective (Decsn‑CAL utility, Service acceptance, KPI).
* **Carrier.** Outcome (episteme) with **Work** evidence.
* **Polarity.** Higher is better.
* **Scale.** Interval/ratio, unit **declared by the Context** (e.g., ΔSNR, % defects, profit/period).
* **Measurement templates (pick one):**

  * **Measured:** `ValueGain := metric_after − metric_before` (declare counterfactual method).
  * **Predicted:** `E[ValueGain | model]` with error bars; update post‑run.
  * **Evidence.**  Declared **objective/criterion**; measurements or credible predictions; counterfactual method (A/B, back‑test, causal inference).
  * **Scope.** State the **context window** used for the objective; claims outside that window are **informative only**.
  * **Didactic cues.**

  * Value is **relative to stated objective**; if the objective is wrong, the value reflects it.
  * Keep **counterfactual discipline**; otherwise “gain” is storytelling.
#### Surprise — “How improbable under our learned world?”

* **Intent.** Capture **unexpectedness** given **`U.GenerativePrior`**.
* **Carrier.** Outcome.
* **Polarity.** Higher surprise = more unexpected.
* **Scale.** **bits** or **nats**: `Surprise := −log p_prior(outcome)`.
* **Measurement template:**

  1. Declare **GenerativePrior** (training slice, model class).
  2. Encode outcome for the prior; compute likelihood proxy.
  3. Publish calibration curve (reliability diagram / PIT histogram).
* **Evidence.** Model cards; fit metrics; OOD diagnostics; refresh policy.
* **Scope.** Training slice declared as **ContextSlice**; Bridges penalise **R** (trust), not the value itself (A.2.6).
* **Didactic cues.**

  * **Novelty vs Surprise:** high novelty under one kernel may be low surprise under a broad prior; publish both.
#### ConstraintFit — “Did it honour the non‑negotiables?”

* **Intent.** Ensure **mandatory constraints** (safety, ethics, standards, SLOs) are satisfied.
* **Carrier.** Outcome + Work evidence.
* **Polarity.** Higher is **better** (1 = all mandatory satisfied).
* **Scale.** **\[0, 1]**, ratio or pass/fail.
* **Measurement template:** declare **set `C_must`** (Norm‑CAL / Service acceptance), compute **`ConstraintFit := |{c∈C_must : pass(c)}| / |C_must|`**; optionally weight per criticality.
* **Evidence.** Checklists, tests, audits; Who/Role performed the **SpeechActs** (approvals/waivers).
* **Scope.** Constraints are **context‑local**; Cross‑context requires **Bridge**; waivers are **SpeechAct Work** with RSG gates (A.2.5).
* **Interpretation note.** Low `ConstraintFit` signals tension with declared **must‑constraints** and warrants reframing or redesign; **this pattern does not prescribe go/no‑go rules**.
#### Diversity_P (portfolio‑level) — “Are we exploring the space?”

* **Intent.** At the **set** level, avoid myopic exploitation; promote **coverage**.
* **Carrier.** A **set** of outcomes.
* **Polarity.** Higher means **broader coverage** (not “better” per se).
* **Scale.** Set‑functional; Context defines metric (e.g., **average pairwise distance**, **k‑cover** over features).
* **Template.** Declare **kernel** and **covering policy**; compute score and **coverage map (illumination)**; relate to **USM ClaimScopes**.
* **Alignment note.** The **illumination/coverage** view corresponds to *IlluminationScore* used by **B.5.2.1 NQD‑Generate**; no separate characteristic is introduced here—measure it as part of `Diversity_P`.
* **Evidence.** Distance matrix/cover plots; sensitivity to kernel.
* **Didactic cue.** Use **Diversity\_P** to **shape portfolios**, not to pick single winners.
* **Marginal gain (for generators)** — normative. For a candidate h and current set S, ΔDiversity_P(h | S) := Diversity_P(S ∪ {h}) − Diversity_P(S). Contexts using NQD SHALL compute D as this marginal and publish the Diversity_P definition alongside the CharacteristicSpace/kernel and TimeWindow.

**Heterogeneity Characterisation**
* FamilyCoverage  (polarity ↑) — count of distinct domain‑families covered by a portfolio/triad; unit: families; window: declared.
* MinInterFamilyDistance (polarity ↑) — min distance between selected families in DescriptorMap; unit: per DistanceDef; window: declared.
* AliasRisk (polarity ↓) — collinearity/near‑duplicate risk indicator for contextual signatures; unit: score (0–1) with policy id.


**Lexical special case (F.18 naming).**  
For **lexical CandidateSets** used by Name Cards (F.18), **Diversity_P SHALL be computed over head-term families, not over raw strings**. Variants that share the same lexical head (e.g., “Reference plane”, “Plane of reference”, “Planar reference”) **MUST** be treated as one family for coverage and distance; only candidates with distinct heads contribute to lexical Diversity_P. This aligns lexical use of Diversity_P with `FamilyCoverage` / `AliasRisk` and prevents inflating diversity by near-synonyms of a single head.
#### AttributionIntegrity — “Did we credit sources and licences correctly?”

* **Intent.** Discourage “novelty theft”; ensure **recombination** is **lawful and transparent**.
* **Carrier.** Outcome + provenance graph.
* **Polarity.** Higher is better.
* **Scale.** **\[0, 1]**; fraction of **required attributions/licence duties** satisfied.
* **Template.** Trace graph coverage against Context policy; licence constraints as **Norm‑CAL** rules.
* **Evidence.** PROV‑style links; licence scans; acknowledgements.
* **Didactic cue.** High `AttributionIntegrity` signals lawful and transparent recombination; low values indicate unacceptable practice in most Contexts.  
* **Default role.** `AttributionIntegrity` is **measurable but non‑dominant**. It MAY serve as a **policy filter/tie‑break** (C.19). If certain attribution duties are **must‑constraints**, they belong to **ConstraintFit** (Norm‑CAL) and act as **eligibility gates**. It is **not** part of the default dominance set.
* **Dominance & gating note (normative).** `AttributionIntegrity` is a measurable **Characteristic**; it is **not** in the default dominance set. Contexts MAY use it as a **filter** or **tie‑break** via policy (C.19). Legal/ethical **must‑fit** checks live in **ConstraintFit** (Norm‑CAL); failing those blocks eligibility **before** dominance.
#### EffortCost (advisory) — “What did it take?”

* **Intent.** Normalise comparisons by cost; not part of “creativity” per se.
* **Carrier.** WorkLedger.
* **Polarity.** Lower is better when used as denominator.
* **Scale.** Resource units (hours, energy, \$).
* **Template.** Sum cost categories over Work that produced the outcome.
* **Evidence.** Time/resource logs; BOM deltas.
* **Didactic cue.** Use **`CreativityPerCost := f(Novelty@context, ValueGain, Surprise)/EffortCost`** for operations planning, not for excellence awards.
### Conformance Checklist (first tranche)

| ID                                        | Requirement (normative)                                                                                                                                                                  | Purpose / audit hint                                          |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **CC‑CR‑1 (context‑locality)**               | Every **CreativityProfile** **MUST** name the **`U.BoundedContext`** and the **edition** of `U.CreativitySpace`.                                                                         | Prevents Cross‑context slippage.                                 |
| **CC‑CR‑2 (Declared bases)**              | **Novelty@context** claims **MUST** declare `ReferenceBase`, `SimilarityKernel`, and `TimeWindow`; **Surprise** claims **MUST** declare `GenerativePrior` and its training slice.                 | Makes “new to whom?” and “unexpected under what?” explicit.   |
| **CC‑CR‑3 (Objective anchor)**            | **ValueGain** **MUST** reference the **objective** (KPI/utility) and **counterfactual method** (if predicted, the model).                                                                | Stops free‑form value stories.                                |
| **CC‑CR‑4 (Must‑fit)**                    | If **must** constraints exist, **ConstraintFit** **MUST** be present; enactment decisions **SHALL** treat `ConstraintFit<1` as **fail**, unless an explicit **waiver SpeechAct** exists. | Keeps safety & ethics non‑negotiable.                         |
| **CC‑CR‑5 (Evidence)**                    | Each coordinate **MUST** have Evidence Graph Ref (neighbours, tests, logs, model cards).                                                                                                   | Enables audit & replication.                                  |
| **CC‑CR‑6 (Scopes)**                      | Profiles **MUST** include **USM scopes** (ClaimScope/WorkScope) relevant to measurement; off‑scope claims are advisory.                                                                  | Ties numbers to where they hold.                              |
| **CC‑CR‑7 (No scalarisation by default)** | The pattern **SHALL NOT** force a single scalar “creativity score.” If a Context defines one, it **MUST** publish the weighting and its drift policy.                                   | Keeps decisions on a Pareto frontier unless a policy opts‑in. |
| **CC‑CR‑8 (Bridge discipline)**           | Cross‑context comparisons **MUST** use a **Bridge** with **CL** and recorded **losses**; any mapped coordinate **MUST** note penalties in the **R** lane, not silently alter the value.     | Honest portability.                                           |
### Manager’s Quick‑Start (apply in 5 steps)

1. **Name the Context** *(context + edition)*.
2. **Pick measurement defaults** *(kernel, prior, objective, constraints)* from the Context’s handbook.
3. **Score outcome** → `Novelty@context`, `Use‑Value`, `Surprise`, `ConstraintFit`.
4. **Decide by frontier**: shortlist **non‑dominated** options; use **ConstraintFit** as a gate; apply **policy** if a scalar is approved.
5. **Record a CreativeEvaluation** with evidence; if crossing Contexts, attach the **Bridge id**.

> **Mental check.** *New to our base? Helpful to our objective? Unexpected under our model? Safe & licenced?*
> If any answer is “unknown,” you are **not done measuring**.
### Archetypal Grounding (three domains)

**(a) Manufacturing design change)**
*Outcome.* New impeller geometry for Pump‑37.
*Context.* `PlantHydraulics_2026`.
*Novelty@context* 0.42 (shape‑descriptor kernel vs last 5 years).
*ValueGain.* +6.8% flow @ same power (bench Work).
*Surprise.* 1.3 bits (within evolutionary trend prior).
*ConstraintFit.* 1.0 (materials, safety, noise).
*Decision.* **Frontier winner**: modest novelty, clear value, safe. Portfolio keeps **Diversity\_P** by also funding one high‑surprise concept for exploration.

**(b) Software architecture refactor)**
*Outcome.* New concurrency model for ETL.
*Context.* `DataPlatform_2026`.
*Novelty\_G.* 0.27 (AST/edit kernel vs internal corpus).
*ValueGain.* −20% latency, −35% p95 stalls (A/B Work).
*Surprise.* 0.5 bits (trend prior expected co‑routines).
*ConstraintFit.* 0.83 (fails SoD—same author as reviewer).
*Decision.* Return for **SoD fix**; then likely adopt. Creativity is **not** a waiver over governance.

**(c) Scientific hypothesis)**
*Outcome.* A new scaling law claim.
*Context.* `GraphDynamics_2026`.
*Novelty\_G.* 0.66 (formula kernel vs literature base).
*ValueGain.* Predicted: explains 12 prior anomalies (model check).
*Surprise.* 3.7 bits (strongly unexpected under prior).
*ConstraintFit.* 1.0 (ethics N/A; evidence roles bound with decay windows).
*Decision.* Fund **replication Work**; track **R** decay per policy.
### Anti‑Patterns (fast fixes)

| Anti‑pattern                   | Why it fails                                                                  | Fix with this FPF pattern                                                        |
| ------------------------------ | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **“Creativity = randomness.”** | Noise yields high `Novelty@context`, low `ValueGain` and often low `ConstraintFit`. | Evaluate **all four** characteristics; require ConstraintFit=1 for musts.                   |
| **Global originality claims.** | Ignores context‑local meaning and current corpus.                                | Declare **Context & ReferenceBase**; cross Contexts only via **Bridge**.               |
| **One magic score.**           | Hides trade‑offs; fragile under drift.                                        | Decide on **Pareto frontier**; publish scalar only with explicit weights/policy. |
| **Hand‑wavy value.**           | No objective → no audit.                                                      | Tie to **Service/KPI** or **utility**; state **counterfactual**.                 |
| **Silent borrowing.**          | Legal/ethical risk; reputational damage.                                      | Track **AttributionIntegrity**; licence scans in evidence.                       |
### Relations

* **A.2 Role & A.15 Run‑alignment.** Creative **Work** is performed by **systems in roles**; outcomes are **epistemes**. Creativity is **measured by `U.Evaluation`**, not “done by a document.”
* **B.3 Trust/Assurance.** Coordinates carry **confidence bands**; Bridges lower **R** by **CL**. Evidence roles (A.2.4) bind datasets/benchmarks used in measurements.
* **C.9 Agency‑CHR.** Agency measures **capacity to originate**; a high‑agency system may still output low‑creativity outcomes (and vice versa with strong scaffolding).
* **A.2.6 USM (Scope).** All measurements sit on **ContextSlices**; `G‑ladder` is explicitly **not** used (C.17 follows A.2.6’s set‑valued scopes).
* **D‑cluster ethics.** **ConstraintFit** is where **must** constraints, ethics, and safety bind the evaluation; waivers are explicit **SpeechActs**.
### Authoring Aids (didactic cards)

* **Write the Context.** Context + edition on every profile.
* **Name the base & kernel.** Without them, `Novelty@context` is undefined.
* **State the objective.** Value without a KPI is a story.
* **Publish priors.** Surprise needs a trained model with cards.
* **Gate by musts.** `ConstraintFit` < 1 blocks enactment unless waived.
* **Prefer frontiers.** Shortlist non‑dominated options; let governance decide trade‑offs.
* **Bridge explicitly.** Cross‑context talk needs CL and loss notes.
### CSLC recap and the Creativity CharacteristicSpace

**Purpose.** Ground “creativity” as a **measurable family of characteristics** (CHR) rather than a role, capability, or virtue. Each characteristic is scoped to a **`U.BoundedContext`**, evaluated on **`U.Work`** (episodes), **artifacts** (epistemes, e.g., design sketches, models), or **holders** (systems/teams) via **MM‑CHR** exports (`U.DHCMethodRef`, `U.Measure`, `U.Unit`, `U.EvidenceStub`), using the **CSLC** discipline (*Characteristic / Scale / Level / Coordinate*).

> **Strict Distinction (A.7) reminders.**
> *Creativity is not a Role* (no one “plays CreativityRole”). It’s a **characterisation** of outcomes/process.
> *Creativity is not Work* (no resource deltas). Work **produces** artifacts we later characterise.
> *Creativity is not a service promise clause* (no external promise). Promise clauses are judged from Work; creativity may correlate with value.

#### The Creativity CharacteristicSpace (CHR‑SPACE)

The core **characteristics** below are **kernel‑portable** names; Contexts **specialise** them (rename if needed, but keep semantics). Each characteristic declares: **what we measure**, **on what carrier**, **typical scale**, and **where it lives** in FPF.

| Characteristics (kernel name)       | What it captures (intuitive)                                 | Measured on           | Typical scale (CSLC)                               | Lives with / checked by              |
| ------------------------ | ------------------------------------------------------------ | --------------------- | -------------------------------------------------- | ------------------------------------ |
| **Novelty\@context**        | Distance from known ideas **in this Context**                   | Artifact / Work set   | Ratio or bounded \[0..1] via *similarity→distance* | `KD‑CAL` corpus + `U.BoundedContext` |
| **Use‑Value**            | Benefit vs a **declared objective**                          | Artifact / Evaluation | Ordinal (Fail/Partial/Pass) or scalar KPI          | `B.3` Evidence & `U.Evaluation`      |
| **Surprise**             | Unexpectedness under the Context’s **GenerativePrior**          | Artifact              | bits or nats (−log‑likelihood)                     | Prior cards & calibration            |
| **ConstraintFit**        | Degree of **must‑constraints** satisfied while exploring     | Work / Artifact       | % satisfied (0–100)                                | `Norm‑CAL` + step guards             |
| **Diversity_P**          | Portfolio **coverage/dispersion** (incl. coverage map view)  | Set of artifacts      | Set‑functional; coverage index                     | `Γ_ctx` fold + USM ClaimScopes       |
| **AttributionIntegrity** | Lawful & transparent **provenance/licensing**                | Artifact + provenance | \[0,1]                                              | PROV + Norm‑CAL                      |

> **Locality.** **Every characteristic is context‑local** (e.g., **Novelty\@context**). Cross‑context claims **must** use a **Bridge** and record **CL** penalties (B.3). No global novelty.
#### Context extensions & policy‑level characteristics (non‑kernel)

The following **context‑local** characteristics remain available but are **not** part of the kernel nucleus; use them as **derived** or **policy** measures:

* **ReframeDelta** — change in the **problem frame** that improves solvability (episteme‑pair; ordinal).
* **Compositionality** — degree of **re‑use and new relations** among parts (artifact; boolean + structure score).
* **Transferability\@X** — portability to **Context X** via a Bridge (artifact; ordinal + CL penalty).
* **DiversityOfSearch** — breadth of **approach classes tried** (work set; count/rate).
* **Time‑to‑First‑Viable** — elapsed time to first **Use‑Value = Pass** (work; duration).
* **Risk‑BudgetedExperimentation** — planned vs realized exploration share (workplan vs work; ratio; policy gate).

> **Compatibility note.** This split removes duplicate “core lists” and aligns C.17 with **B.5.2.1 NQD** and **C.16/A.17–A.18**: the **kernel nucleus** captures creativity *qualities*; the items above instrument **process/policy** or **portfolio shaping**.
#### Scale choices (CSLC discipline)

For each characteristic, **declare the scale** explicitly (nominal / ordinal / interval / ratio). **Do not** average ordinal scores; fold with medians or distributional summaries. Choose **units** (when applicable) and **coordinate** semantics (e.g., what “distance” means).

* *Novelty\@context.*
  Coordinate = `1 − max_similarity(candidate, corpus)` with a declared encoder (text, graph, CAD). Unitless in \[0..1]. Document encoder & corpus freeze (`A.10` Evidence Graph Ref).
* *Use‑Value.*
  `Pass` iff **acceptanceSpec** (from `U.PromiseContent` or Decision KPI) is met from **Work** evidence; else `Partial`/`Fail`. For scalar KPIs, publish mean ± CI and the acceptance threshold; predicted values carry error bars and are updated post‑run.
* *ConstraintFit.*
  Ratio = satisfied / declared **must** constraints. Constraints are `Norm‑CAL` rules; **count only declared** ones (no unspoken “norms”).
#### Metric templates (normative kernels + manager‑ready variants)

**Template syntax (MM‑CHR):**
`U.DHCMethod { name, context, carrierKind, definition, unit?, scale, EvidencePin, acceptanceHook? }`
*Note:* Data instances carry `DHCMethodRef` pointing to this template.

##### Templates (kernel definitions)

1. **`MT.Novelty@context`**

* **carrierKind:** Artifact|WorkOutput.
* **definition:** `1 − max_sim(encode(x), encode(y))` over y in **ReferenceSet**@Context.
* **scale:** ratio \[0..1].
* **EvidencePin:** `{ReferenceSetId, EncoderId, Version}`; frozen by `A.10`.
* **notes:** Publish encoder & corpus drift in RSCR.

2. **`MT.Use‑Value`**

* **carrierKind:** Work (fulfillment) → artifact (decision memo).
* **definition:** Evaluation of an outcome against a declared **objective/criterion** for the current context (or predicted value with explicit model & error).
* **scale:** ordinal {Fail, Partial, Pass} or scalar KPI.
* **EvidencePin:** links to `U.Work` that **fulfilPromiseContent\`**; cite acceptanceSpec edition.

3. **`MT.ConstraintFit`**

* **carrierKind:** Work / Artifact.
* **definition:** `|{c∈C_must : pass(c)}| / |C_must|` within the **MethodDescription** scope; optional weighting by criticality allowed if declared.
* **scale:** ratio \[0..1].
* **EvidencePin:** constraint list from **Norm‑CAL**; checks from Work telemetry.

4. **`MT.ReframeDelta`**

* **carrierKind:** Episteme pair (ProblemStatement v0→v1).
* **definition:** Categorise frame change as {None, Local, BoundaryShift, Systemic}; **justify** with a Scope diff (`A.2.6 U.ContextSlice` delta) and causal map simplification.
* **scale:** ordinal 0–3.
* **EvidencePin:** diff artifact + Bridge notes if Cross‑context.

5. **`MT.DiversityOfSearch`**

* **carrierKind:** Work set (episode).
* **definition:** Count of **distinct approach classes** tried (domain‑local typology) / time.
* **scale:** count; derived rate.
* **EvidencePin:** tagged Work items; typology lives in the Context glossary.

6. **`MT.Compositionality`**

* **carrierKind:** Artifact.
* **definition:** set aggregator (Compose‑CAL) of reused components ≥ K and presence of novel relation among ≥ 2 parts.
* **scale:** boolean + secondary “structure score” (e.g., depth or edge novelty).
* **EvidencePin:** component graph + provenance of parts.

7. **`MT.Transferability@X`**

* **carrierKind:** Artifact.
* **definition:** Applicability in target **Context X** via a **Bridge**; report **CL** and residual scope slice.
* **scale:** ordinal {not portable, portable with loss, near‑iso}; record CL (0–3).
* **EvidencePin:** Bridge id + pilot Work in X.

8. **`MT.Time‑to‑First‑Viable`**

* **carrierKind:** Work episode.
* **definition:** elapsed wall‑clock to first `UsefulnessEvidence = Pass`.
* **scale:** duration.
* **EvidencePin:** first passing `U.Work` id.

9. **`MT.Risk‑BudgetedExperimentation`**

* **carrierKind:** WorkPlan vs Work.
* **definition:** `(Planned exploratory spend) / (Allowed risk budget)` and realised counterpart; flag **overrun**.
* **scale:** ratio + policy gate (pass/fail).
* **EvidencePin:** WorkPlan ledger vs `WorkLedger`.
##### Manager’s quick checks (plain‑language adapters)

* **Novelty** without a **frozen corpus** is **storytelling**—freeze corpus, fix encoder, then score.
* **Use‑Value** without a **consumer‑facing acceptance** is a **proxy**—bind to a **Service** or explicit Objective.
* **Diversity** counts **approach classes**, not color‑swap variants—publish your typology.
### Novelty & transfer are context‑local (Bridges mandatory)

**Rule N‑1 (Locality).** `Novelty@context` is defined **only** within its `U.BoundedContext`. **Never** compare scores across Contexts without an **Alignment Bridge** (F.9).

**Rule N‑2 (Directional mapping).** A Bridge may assert a **directional** substitution (e.g., *Novelty\@DesignLab → Novelty\@Manufacturing* with CL = 2, **loss:** aesthetics encoder absent). Reverse mapping is **not** implied.

**Rule N‑3 (Penalty to R, not to G).** Cross‑context novelty **does not** change scope **G**; it **reduces R** (reliability) by the **CL penalty** (B.3), unless validated by pilot Work in the target Context.

**Practical pattern.** Publish novelty **with its Context tag** and—when reused—attach the **Bridge id** and target‑context **pilot** outcomes.
### Anti‑Goodhart guard (use creativity metrics safely)

> **Goodhart’s Law:** “When a measure becomes a target, it ceases to be a good measure.” — We bake in **guards** so creativity scoring **improves** outcomes instead of gaming them.

#### Guard‑rails (normative)

* **G‑1 Paired appraisal.** **Never** assess **Novelty** in isolation; pair it with **Use‑Value** or **ConstraintFit** to avoid proxy myopia
* **G‑2 Frozen references.** Novelty requires **frozen corpus + encoder**; changes create a **new edition** and **RSCR** rerun. Portfolio/selection heuristics are **policy-level** (see **C.19**); do not “reward” Illumination beyond its role as a report-metric.
* **G‑3 Time‑lag sanity.** Include a **post‑fact check** (e.g., 30–90‑day retention or cost‑to‑serve delta) before celebrating “creative wins.”
* **G‑4 Exploration budget.** Tie **DiversityOfSearch** to **Risk‑BudgetedExperimentation**; flag overspend.
* **G‑5 No ordinal averaging.** Do not average **ordinal** scales; use distributions/medians or convert only under declared models.
#### Conformance Checklist — CC‑C17‑M (metrics & guards)

| ID             | Requirement                                                                                                                            | Practical test                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **CC‑C17‑M.1** | Each metric instance **MUST** cite its **Context**, **edition**, and **evidence hooks** (corpus/encoder, acceptanceSpec, constraint set). | Scorecard lists `ContextId`, `Edition`, and hook ids resolvable via `A.10`. |
| **CC‑C17‑M.2** | **Novelty** scores **MUST NOT** be used to approve Work without a **paired gate** (**Use‑Value** **or** **ConstraintFit**).               | Find decisions referencing novelty; check co‑gate present.                  |
| **CC‑C17‑M.3** | Cross‑context reuse **MUST** cite a **Bridge** and record **CL**; **R** is penalised accordingly.                                         | Scorecards with foreign Context tag lacking Bridge → **fail**.                 |
| **CC‑C17‑M.4** | Ordinal metrics **MUST** be summarised with medians/distributions, not means, unless a declared model justifies numeric treatment.     | Reports using a mean on ordinal without model → **fail**.                   |
| **CC‑C17‑M.5** | Metric templates **MUST** be versioned; changing encoder, reference set, or acceptanceSpec **creates a new edition**.                  | Diff shows changed hooks without edition bump → **fail**.                   |
### Worked mini‑cases (engineer‑manager focus)

> **All names are context‑local; bridges and editions are explicit.**
> We show **(a)** what is measured, **(b)** who acts, **(c)** what is accepted, and **(d)** how evidence flows.

#### Case A — Hardware ideation sprint (manufacturing design)

* **Context.** `DesignLab_2026`.
* **Objective.** Reduce fastener count by ≥ 30 % without tooling changes.
* **MethodDescription.** “Morphological matrix ideation v2.”
* **Work.** 1‑day sprint, 6 sessions.
* **Metrics.** `Novelty@context` (encoder: CAD‑graph v1; ReferenceSet: in‑house assemblies), `ConstraintFit` (no‑tooling‑change), `Use‑Value` (acceptance: Pass if sim shows ≤ +5 % assembly time).
* **Roles.** Performers = design cell (#TransformerRole); Observer = methods coach (#ObserverRole ⊥).
* **Outcome.** 22 candidates; 4 **Pass** usefulness; best `Novelty`=0.41 with **100 %** constraints respected; `Time‑to‑First‑Viable` = 3 h 40 m.
* **Evidence.** Scorecard episteme holds metrics; links to Work ids; acceptance tied to internal **promise content** “Design‑for‑Assembly Simulation”.

**Manager’s read.** “We didn’t just produce ‘novel’ shapes; 4 passed the sim and respected constraints, within the day.”
#### Case B — Data‑science hypothesis generation (health analytics)

* **Context.** `Cardio_2026`.
* **Objective.** Find a new risk factor candidate for readmission (< 30 days).
* **MethodDescription.** “Causal discovery v3 + clinician review.”
* **Metrics.** `DiversityOfSearch` (approach classes: feature ablation, IVs, DAG‑learners), `Novelty@context` (text encoder over prior hypotheses), `Use‑Value` (AUROC uplift ≥ 0.03 on hold‑out), `Transferability@Hospital_B` (Bridge CL=2).
* **Roles.** SRE pipeline (#ObserverRole) computes metrics; clinicians (#ReviewerRole) set acceptance; data squad (#TransformerRole) performs experiments.
* **Outcome.** Two candidates; one meets AUROC uplift; **Transferability** requires follow‑up (CL penalty).
* **Evidence.** Episteme bundle: model cards, hold‑out plots, Bridge note.

**Manager’s read.** “One candidate works **here**; plan a pilot at Hospital B (we recorded CL=2).”
#### Case C — Product squad reframing (software UX)

* **Context.** `SaaS_Onboarding_2026`.
* **Objective.** Reduce time‑to‑value (TTV) by 20 %.
* **MethodDescription.** “JTBD interviews + onboarding flow experiments.”
* **Metrics.** `ReframeDelta` (BoundaryShift: split onboarding into ‘job setup’ and ‘first result’), `Use‑Value` (TTV ‑22 % on A/B), `Risk‑BudgetedExperimentation` (within cap), `Compositionality` (reuse of existing workflow widgets).
* **Roles.** UX researcher (#ObserverRole), squad (#TransformerRole), product ops (#ReviewerRole).
* **Outcome.** Frame changed; TTV target passed; experiments within budget.
* **Evidence.** Reframing episteme with Scope diff + A/B report.

**Manager’s read.** “We changed the problem frame and proved the value drop—within risk limits.”
#### C.17:15.4 What these cases illustrate (tie‑backs)

* **Locality.** All novelty/usefulness claims are **Context‑tagged**; Cross‑context steps use **Bridges** with **CL**.
* **Dual‑gate.** Novelty never acts alone; usefulness/constraints co‑gate decisions.
* **SoD & Evidence.** Observers are **separate** from performers; metrics live on **epistemes** with **frozen hooks**; Work proves fulfillment.
### Working examples

#### Software (algorithmic/architectural ideation)

**Kernel characteristics (↑/↓/gate).**
Novelty↑ (algorithmic / compositional), Use‑Value↑ (targeted user/job metric), ConstraintFit=gate (resource/latency envelope), Cost‑to‑Probe↓ (hours to runnable spike), Evidence‑Level↑ (tests/benchmarks confidence), Option‑Value↑ (paths unlocked), RegretRisk↓ (blast radius if wrong).

**Priors.**

* Novelty prior **skeptical** beyond nearest known family (discount by conceptual distance).
* Evidence prior at **L0** (B.3) until benchmarks exist; regression tests act as **ObserverRole** evidence.

**Context card (one screen).**

* Γ\_bundle: Cost = sum; ConstraintFit = AND; Novelty = subadditive; Evidence = min (chain) / SpanUnion (indep).
#### Hardware (mechanical/electro‑mechanical concepting)**

**Kernel characteristics.**
Novelty↑ (principle/material), Use‑Value↑ (performance delta), ConstraintFit=gate (manufacturability window), Time‑to‑Probe↓ (bench jig), Cost‑to‑Probe↓, SafetyRisk↓ (hazard), Evidence‑Level↑ (bench data), Option‑Value↑ (platform reuse).

**Priors.**

* SafetyRisk has **WLNK** priority (R must cover hazard chain).
* ConstraintFit must pass **manufacturing gate** before frontier inclusion.

**Context card.**
* Γ\_bundle: Hazard = max; ConstraintFit = AND; Cost = sum+coupling; Evidence = min on chain; Scope via **WorkScope** (A.2.6).
#### Policy design (rules/standards/programs)

**Kernel characteristics.**
Novelty↑ (institutional), Use‑Value↑ (measurable social/operational effect), ConstraintFit=gate (legal/operational), Cost‑to‑Probe↓ (pilot), Evidence‑Level↑ (triangulated), EthicalRisk↓ (D‑cluster), Option‑Value↑ (coalitions/pathways), Scope (ClaimScope G) explicit.

**Priors.**
* EthicalRisk uses **status‑only** eligibility conditions; Evidence aging (decay) is **fast**; cross‑context Bridges carry **CL** penalties.

**Context card.**
* Γ\_bundle: EthicalRisk = max; ConstraintFit = AND (legal & operational); Cost = sum; Evidence = min/SpanUnion; Scope = ClaimScope (A.2.6).
### Consequences & fit (for engineer‑managers)

* You can **reason on paper** about creativity: compare with **dominance**, pick along a **frontier**, and steer exploration with a few **policy characteristics**.
* Changes to the space (**scales, eligibility conditions, operators**) are handled by **RSCR**, so decisions are **explainable over time**.
* The **Context handbooks** are a **thinking OS**: one screen to start ideating without importing tool stacks or management playbooks.
### Relations

* **Builds on**: B.1 Γ‑algebra (WLNK/COMM/IDEM/MONO), B.3 Trust & Assurance (F–G–R, CL), A.2.6 USM (Claim/Work scopes), A.10 Evidence Graph Referring.
* **Coordinates with**: A.2 Role suite (Observer/Evidence roles for probes), A.15 (Work & plans for probes), C.16 MM‑CHR (scale polarity & units). **C.18 NQD-CAL** (generation/illumination operators Γ_nqd.\*) and **C.19 E/E-LOG** (policies, selection, and portfolio rules). This CHR remains measurement-only.
* **Defers to**: F.9 Bridges for Cross‑context transfers; D‑cluster for ethical/speech‑act gates.
### Quick reference cards (tear‑out)

* **Dominance test**: apply **signs** + **eligibility conditions** + **trust**; then partial order.
* **Frontier use**: **show frontier** + **name the lens** that picked your choice.
* **Portfolio policy**: keep `ExploreShare` and `WildBetQuota`; set `BackstopConfidence`; rebalance on cadence.
### Conformance Checklist (pattern‑level, normative)

> *Pass these and your CS modelling remains a thinking architecture, not a team‑management manual.*

**CC‑C17‑1 (context‑local CS).**
Every **CreativitySpace** (the characteristic set where ideation and selection are measured) **MUST** be defined *inside one* `U.BoundedContext`; all characteristics and their scales are local to that Context. (Bridges with CL penalties are required across Contexts; see §C.17.16.)

**CC‑C17‑2 (Characteristics, not “characteristics”).**
Each CS dimension **SHALL** be a named **Characteristic** per **MM‑CHR**, with kind (`qualitative`, `ordinal`, `interval`, `ratio`, or `set‑valued`), unit/scale, polarity, and admissible operations. No free‑floating coordinates. (A.CHR‑NORM / A.CSLC‑Kernel.)

**CC‑C17‑3 (Profile ≠ plan).**
A **Profile** is a *state description over characteristics* (what the option *is* in CS); a **Plan** or **Method** is *how you will act*. Never encode choices or schedules into the profile.

**CC‑C17‑4 (Portfolio = set + rule).**
A **Portfolio** is a set of candidate profiles **plus** a selection rule (objective + constraints) declared *in the same Context*. Presenting only a scatterplot is non‑conformant.

**CC‑C17‑5 (Dominance operator well‑typed).**
A dominance claim **MUST** name the **characteristic subset and polarity** under which it is evaluated. Dominance on incomparable scales (or mixed polarities without explicit transformation) is invalid.

**CC‑C17‑6 (Frontier from rule, not from taste).**
A **Frontier** (Pareto or constraint‑bound) **SHALL** be computed from the declared selection rule; drawing a “nice hull” by eye fails conformance.

**CC‑C17‑7 (Search–Exploit as **dynamics**, not policy dogma).**
Exploration/exploitation **MUST** be expressed as a **dynamics on the portfolio measure(s)** (e.g., exploration share as a function of marginal value of information), *not* as a prescriptive budget recipe. (Design‑time statements belong to Decsn‑CAL; see §C.17.16.)

**CC‑C17‑8 (Evidence Graph Referring for scores).**
Any numeric score in a profile **MUST** cite its **MeasurementTemplate** (MM‑CHR) and the **observation/evaluation** that yielded it. No anonymous numbers.

**CC‑C17‑9 (Separable uncertainty lanes).**
Keep **aleatory** vs **epistemic** uncertainty separate on characteristics; their combination rule **MUST** be stated (e.g., interval arithmetic, conservative bound).

**CC‑C17‑10 (Time is explicit).**
Comparisons across iterations **MUST** state `TimeWindow` (snapshot window) and whether *drift* or *refit* occurred (§C.17.14). “Latest” is not a time selector.

**CC‑C17‑11 (No proxy collapse).**
If a composite “creativity index” is used, its **aggregation algebra** (weights, monotone transforms) **MUST** be declared; the primitive characteristics remain queryable.

**CC‑C17‑12 (Work stays on Work).**
Resource/time actuals and run logs live on `U.Work`; CS never carries actuals. We reason **about** profiles/portfolios; we do not audit operations here.
### Worked‑Context Handbooks (concept cards, not runbooks)

> *Each Context publishes one page per card. These are **thinking kernels**: priors, objectives, admissible characteristics, and example transforms. No staffing, no process charts.*

**(a) Kernel Card — “What is a creative win here?”**

* **Context:** `<Context/Edition>`
* **Purpose Characteristic(s):** what “win” means (e.g., *Novelty*, *Usefulness*, *Adoptability*), with polarity and admissible ops.
* **Constraint Characteristics:** *Risk*, *Cost of change*, *Time to learn*, etc.
* **Objective** *(Decsn‑CAL pointer)*: Maximise `<purpose>` subject to declared constraints.
* **Frontier Rule:** Pareto over `{purpose ↑, risk ↓, cost ↓, time ↓}`.
* **Evidence Hooks:** which observations/evaluations populate each characteristic.

**(b) Priors Card — “What we believe before seeing data.”**

* **Default priors** on uncertainty for each characteristic (e.g., Beta for adoption probability).
* **Bridge policy:** minimal CL acceptable for imported profiles.
* **Exploration prior:** initial exploration share as a function of prior entropy.

**(c) Objective Variants Card — “Admissible objective shapes.”**

* Catalog the *few* objective forms this Context allows (lexicographic tie‑break, ε‑constraint, max‑min fairness), with **didactic pictures** of their frontiers.
* State when to switch objective (e.g., during bootstrapping vs exploitation).

**(d) Ready‑to‑use transforms** *(MM‑CHR aligned)*

* Monotone maps (e.g., log utility), normalizations, ordinal→interval “do & don’t” (only with evidence of order‑to‑interval validity).
* **Forbidden transforms** list (e.g., averaging ordinal ranks).

These cards are *conceptual fixtures*; **Tooling** may implement them, **Pedagogy** may teach them, but **C.17** only standardises their content as **thinking affordances**.
### Placement sanity‑check across the pattern language (avoid scope creep)

* **MM‑CHR (C.16):** defines **Characteristic/Scale/Unit/Measure** and the *characterisation discipline*. **All** CS dimensions live there; C.17 **uses** them, never re‑defines scales.
* **A.CHR‑SPACE (A.19):** exports **CharacteristicSpace & Dynamics hooks**; C.17 is a **Contexted specialisation** for creative reasoning (profiles/portfolios/selection).
* **Decsn‑CAL (C.11):** hosts **objective functions, constraints, preference orders, utility proofs**, and the **search–exploit dynamics** as decision policies. C.17 only **names** the hooks (objective, rule), keeps policy math out.
* **KD‑CAL (C.2) & B.3 (Trust):** carry **evidence provenance**, **assurance** and **congruence penalties (CL)** for Cross‑context reuse. C.17 requires anchors; it does not invent confidence calculus.
* **Compose‑CAL (C.13):** governs **set/union/slice** aggregation; the portfolio set is a **Γ\_m.set** over profiles; frontier is derived **without** ad‑hoc geometry.
* **B.4 Canonical Evolution Loop:** where *Run→Observe→Refine→Deploy* sits. C.17 supplies the **view** in which refinement is judged.

**Out of scope here:** team staffing, budgeting workflows, data‑governance procedures, ticket states, any “how to manage people”. This pattern organises **thought**, not **teams**.
### Anti‑patterns & canonical rewrites (conceptual hygiene)

1. **characteristic‑speak.** “Along the novelty characteristic…” → **Rewrite:** “Along the **Novelty characteristic** (ordinal; higher is better)…”.
2. **Pretty hulls.** Drawing a convex hull and calling it a frontier → **Rewrite:** compute Pareto under declared characteristic polarities.
3. **Ordinal arithmetic.** Averaging ranks or Likert values → **Rewrite:** either treat as **ordinal** and use **order‑safe** operators, or justify an interval mapping via MM‑CHR evidence.
4. **Proxy tyranny.** Single composite index driving choice unseen → **Rewrite:** publish **primitive characteristics**, index formula, and sensitivity.
5. **Policy‑as‑math.** “10% wild bets” as a rule → **Rewrite:** declare an **exploration dynamics** tied to value‑of‑information; if keeping a heuristic, label it as such.
6. **Global meaning.** Porting a profile from another Context by name → **Rewrite:** attach a **Bridge** with CL and loss notes; adjust trust, not scales.
7. **Plan‑profile blur.** Putting milestones into profiles → **Rewrite:** move schedules to `U.WorkPlan`; keep CS for *how options compare*, not *how to execute*.
### Minimal didactic cards (one screen each)

**(1) Profile Card**

* **Option id & Context**
* **Characteristics table** (value, unit/scale, uncertainty split)
* **Evidence Graph Ref** (Observation/Evaluation ids)
* **Notes** (bridges used, CL penalties)

**(2) Portfolio‑with‑Rule Card**

* **Set of candidate profiles (refs)**
* **Objective & constraints** (Decsn‑CAL pointer)
* **Dominance subset** & **Frontier snapshot** (with TimeWindow)
* **Delta vs previous** (entered/exited/moved)

**(3) Search–Exploit Card** *(conceptual)*

* **Exploration share** as function of **marginal VOI** (symbolic)
* **Update cadence** (TimeWindow policy)
* **Stop conditions** (e.g., VOI below threshold; risk bound reached)

**(4) RSCR Summary Card**

* **What changed?** (refit/Δ±)
* **Sentinels status**
* **Frontier churn**
* **Bridge CL drift**

These cards are **thinking scaffolds**; they do not prescribe org process.
### Consequences (informative)

| Benefit                    | Why it matters                                                                                                                    |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **context‑local rigour**      | Creative comparison is made decidable *where meaning lives*; Cross‑context reuse is explicit and penalised only in trust, not scale. |
| **Frontier honesty**       | Decisions rest on declared characteristics and polarities; frontiers follow rules, not taste.                                     |
| **Temporal comparability** | RSCR prevents silent drift; “better/worse” claims retain meaning over iterations.                                                 |
| **Method independence**    | Any tooling can implement the cards; C.17 remains a conceptual API for thought.                                                   |

**Trade‑offs:** upfront ceremony (declare characteristics, polarity, TimeWindow) and disciplined bridges. The payoff is comparability and explainability.
### C.17:26- Open questions (non‑normative, research hooks)**

* **Information geometry of CS:** can certain Contexts justify canonical distance metrics across characteristics without violating MM‑CHR parsimony?
* **Multi‑agent exploration:** how to couple individual CS frontiers into a *co‑exploration* equilibrium without importing team governance?
* **Learning‑to‑rank vs measurement:** what minimal evidence suffices to treat an ordinal characteristic as interval for the purpose of frontier estimation?
### C.17:End
## Open‑Ended Search Calculus (NQD‑CAL)

**Status.** Calculus specification (**CAL**). Exports `Γ_nqd.*` operators for open‑ended, illumination‑style generation. **ΔKernel = 0** (no kernel primitives added). *Minting note:* this CAL **does not mint** new U‑types; it defines **CAL‑records** that MAY alias to registered U‑types where present via **E.10/UTS**.

**Depends on.** A‑kernel (A.1–A.15), **MM‑CHR** (C.16) for measurements, **KD‑CAL** for similarity/corpora, **Sys‑CAL** for carriers, **Decsn‑CAL** (objectives; advisory), **Compose‑CAL** (set aggregation; advisory).

**Coordinates with.** **B.5.2.1** (binding), **C.17 Creativity‑CHR** (characteristics & scales), **C.19 E/E‑LOG** (policies: emitter selection, explore/exploit).

**Exports (CAL; no U‑type minting here).**
 - Records: `NQD.DescriptorMap` (alias of `U.DescriptorMap` if minted), `NQD.NQDArchive` (alias of `U.NQDArchive`), `NQD.Niche`, `NQD.ArchiveCell`, `NQD.EmissionSeed?`, `U.EmitterPolicyRef`, `U.InsertionPolicyRef`, `U.IlluminationSummary`, and `NQD.CandidateSet` (alias of `Set<U.Hypothesis>`).

### Problem frame

Open‑ended search (NQD) equips FPF with illumination‑style generation and Pareto/portfolio selection in multi‑criteria, partially ordered spaces; it feeds G.5 without scalarising ordinal or mixed‑scale characteristics.
### Problem

Without a disciplined NQD calculus, contexts (a) conflate illumination telemetry with dominance, (b) lose reproducibility due to undeclared DescriptorMap/DistanceDefRef.editions, and (c) perform illegal aggregations across scales.
### Forces

• Posets vs. scalarisation — selectors must return sets (Pareto/archive) rather than illegal weighted sums across mixed scales.
• Exploration vs. exploitation — emitters must adapt while preserving provenance and editioning.
• Telemetry metric vs. objective — Illumination (coverage/QD‑score) informs health but is not a dominance characteristic by default.
• Reproducibility vs. adaptivity — budgets, ε, K, and InsertionPolicy must be edition‑tracked.
### Solution

Provide Γ_nqd.* operators and U.Types for DescriptorMap, Archive/Niche, policies, and illumination telemetry summaries; bind measurement legality to MM‑CHR and policy control to E/E‑LOG. (Exports/Type notes/Operator specs below are normative parts of this Solution.)

- Operators (Γ):
  - `Γ_nqd.generate(seed?, EmitterPolicyRef, Budget, DescriptorMapRef, QualityMeasuresRef, NoveltyMetricRef, CoverageGrid, CellCapacity K=1, EpsilonDominance ε=0, DedupThreshold?, InsertionPolicyRef?) → CandidateSet<U.Hypothesis>`
  - `Γ_nqd.updateArchive(Archive, CandidateSet, InsertionPolicyRef?) → Archive'`
  - `Γ_nqd.illuminate(Archive) → IlluminationSummary{coverage, QD-score, occupancyEntropy, filledCells}` (report‑only telemetry summary; not a dominance characteristic unless a policy explicitly promotes it).
  - `Γ_nqd.selectFront(Archive|CandidateSet, characteristics={Q components, Novelty@context, ΔDiversity_P, …}) → ParetoFront`

**Type notes.**
- `U.DescriptorMap (Tech; twin‑labelled Plain) : Hypothesis → ℝ^d` (declares encoder, invariances, version, **CharacteristicSpaceRef**). Publish Tech/Plain per **E.10**; declare `DescriptorMapRef.edition` and `DistanceDefRef.edition`. **Dimensionality rule.** **Require `d≥2` only when QD/illumination surfaces are active**; for non‑QD contexts `d≥1` is lawful.
- `NQD.CandidateSet` ≡ `Set<U.Hypothesis>` with attached per‑item vectors `{Q_i, N_i, D_i:=ΔDiversity_P, S_i?, provenance_i}`.
- `U.NQDArchive` holds per‑cell elites and genealogy refs; context‑local.
- `U.Niche` is a region in CharacteristicSpace (grid bucket / CVT centroid / cluster).
- `U.EmitterPolicyRef` points to a named policy in **C.19 E/E‑LOG**.
- `U.InsertionPolicyRef` — named archive‑update policy (e.g., `replace_if_better | replace_worst | bounded_age | bounded_regret`); versioned.
- `U.IlluminationSummary` is a **telemetry summary** over `Diversity_P` (see C.17), not a dominance characteristic.

**Operator specs (normative).**
- `Γ_nqd.generate(… )` SHALL:
  (a) respect **Budget**,  
  (b) compute `{Q_i}` (vector), `N_i` (Novelty@context), `D_i := ΔDiversity_P(h_i | Pool)` under the same CharacteristicSpace & TimeWindow as the Pool, and optional `S_i` (Surprise),
  (c) deduplicate by `DedupThreshold` in CharacteristicSpace,  
  (d) record `DescriptorMapRef.edition`, `DistanceDefRef.edition`, `EmitterPolicyRef`, `ε`, `K`, `Seeds`, and genealogy references (parent/seed ids) to enable replay and selection auditing.
- `Γ_nqd.updateArchive` SHALL apply local competition per cell (keep up to K elites), preserve genealogy, and **enact the declared `InsertionPolicyRef`**; default is `replace_if_better` with deterministic tie‑breakers.
- `Γ_nqd.illuminate` SHALL return coverage and QD‑score computed against the declared grid and archive edition.
- `Γ_nqd.selectFront` SHALL compute the (ε‑)Pareto front over the declared characteristics; **Illumination** is excluded by default (report‑only).  

**Pipeline:** apply **Eligibility (ConstraintFit=pass)** → **Dominance (default set from C.19; by default `{Q components}` only)** → **Tie‑breakers (`Novelty@context`, `ΔDiversity_P`, `Surprise`; `Illumination` telemetry metric)**.
**Pure academic QD-mode:** Contexts MAY elect a _pure‑QD_ mode (dominance on `Q` only; `N/ΔD` used via archive occupancy and tie‑breakers). Any deviation SHALL be declared by policy id and recorded in provenance.

**Reproducibility & editions.** Each call SHALL emit provenance sufficient for replay: `{DHCMethodRef.edition, DescriptorMapRef.edition, EmitterPolicyRef (params), **InsertionPolicyRef**, DedupThreshold?, ε, K, Seeds, TimeWindow}`.
Telemetry hook: whenever IlluminationSummary increases (Δcoverage>0 or ΔQD‑score>0), the Context SHALL emit a Telemetry(PathSlice) record that cites {EmitterPolicyRef, DescriptorMapRef.edition, DistanceDefRef.edition, InsertionPolicyRef?, TimeWindow}. (Aligns with G.6/G.7/G.11 portfolio/edition constraints.)

**Measurement alignment.** `Novelty@context`, `Use‑Value (ValueGain)`, `Surprise`, `Diversity_P` SHALL be measured per **C.17** (MM‑CHR templates). **IlluminationSummary** is a telemetry summary over `Diversity_P` (coverage/QD‑score); when CharacteristicSpace includes domain‑family cells, publish grid id and FamilyCoverage, plus **DescriptorMapRef.edition/DistanceDefRef.edition**.
.
### Conformance Checklist

- **C18‑1** Declare `DescriptorMap` (encoder, invariances, corpus edition) before generation.
- **C18‑1b** When used in F/G triads, DescriptorMap SHALL declare a domain‑family coordinate (grid/cells) and reference an F1‑Card::DistanceDefRef & δ_family.
- **C18‑1c**  When a domain‑family coordinate is declared, the Context SHALL compute and publish **AliasRisk** for each front/portfolio emission, together with the dSig collision rule and the policy id. AliasRisk is computed against `U.DomainDiversitySignature (dSig)`; **the DescriptorMap SHALL publish**: (i) `collisionRuleId` (near‑duplicate threshold, e.g. “≥3 characteristics equal”),  (ii) `dSigSource` pointers used for coding the five characteristics. The collision rule and formula **MUST** be part of `DescriptorMap` provenance (see **Creativity‑CHR**, Heterogeneity Characterisation).
- **C18‑2** Record `EmitterPolicyRef` (policy id from C.19) and parameter set.
- **C18‑3** Compute `D = ΔDiversity_P(h | Pool)` under the same DescriptorMap & TimeWindow as the Pool (see C.17).
- **C18‑4** Exclude Illumination from dominance unless policy explicitly promotes it.
- **C18‑5** Keep `Use‑Value` separate from assurance scores; do not alter `F/G/R` semantics (see B.3, C.17 §Use‑Value).
- **C18‑6** Emit full provenance; thinning after front computation MUST be recorded.
- **C18‑7** Before computing any front, apply **ConstraintFit = pass** as a hard eligibility filter.

**Defaults.** Normative defaults **live in C.19 (EmitterPolicy)** and are **not restated** here. Minimum provenance remains: `DescriptorMapRef.edition` and `DistanceDefRef.edition`, `DHCMethodRef.edition`, `EmitterPolicyRef`, `InsertionPolicyRef`, `TimeWindow`, `Seeds`, `DedupThreshold?`; also record `FamilyCoverage/MinInterFamilyDistance`.

**Didactic quickstart (Context).**
1) Pick 2–4 Quality coordinates and a simple DescriptorMap (2–4 dims).  
2) Set defaults: `K=1`, `ε=0`, a conservative `EmitterPolicy`.  
3) Run `Γ_nqd.generate` to fixed Budget; inspect the front; log coverage (IlluminationSummary).  
4) Apply abductive plausibility filters; promote prime hypothesis to L0.
### Archetypal Grounding

**System.** Legged‑robot gait exploration: Q = forward speed & energy efficiency (ratio), D = morphology/coordination descriptors (ℝ^d); Archive = CVT grid; Illumination reports coverage without entering dominance.
"**Episteme.** SoTA palette synthesis: Q = Use‑Value proxies per C.17 (ratio/interval as legal), D = method‑family niches; publish DescriptorMapRef.edition and DistanceDefRef.edition for reproducible fronts.
### Bias‑Annotation

Lexical firewall and notation independence apply; no vendor/tool tokens; ordinal characteristics never averaged; illumination treated as report‑only telemetry unless a policy promotes it. (E.5.1, E.5.2, C.16)
### Consequences

• Portfolio honesty (no forced scalarisation). • Reproducibility (editioned maps/policies). • Healthy diversity signals via telemetry metrics.
### Rationale

Post‑2015 Quality‑Diversity (MAP‑Elites & successors) demonstrates illumination efficacy; NQD‑CAL captures these ideas while preserving MM‑CHR legality and LOG governance.
### Relations

Builds on: C.16, C.2. Coordinates with: B.5.2.1 (binding), C.17, C.19, G.5, G.6, G.11.
### C.18:End
## Scaling‑Law Lens Binding (SLL)

**One‑screen purpose (manager‑first).**
Make **generation/selection** scale‑savvy: at the level of **conceptual descriptors**, declare (a) **which monotone knobs** we would scale, (b) the **ScaleWindow** over which we claim behaviour, and (c) the **elasticity class** we observed—**without** imposing numeric fits or vendor tools at Core level. This surfaces knees early and keeps comparisons lawful and fair across families. (Parity is handled by **G.9**; illumination remains a **report-only telemetry** unless a CAL policy promotes it.)  

**Builds on.** C.16 (MM‑CHR), C.17 (Creativity‑CHR), C.18 (NQD‑CAL); advisory: C.5 (Resrc‑CAL).
**Coordinates with.** C.19 (E/E‑LOG), G.5 (Selector & Registry), G.9 (Parity Harness), G.10 (Shipping), G.11 (Refresh‑Telemetry), C.24 (Agent‑Tools‑CAL).
**Keywords.** scaling law; **Scale Variables (S)**; ScaleWindow; knee; diminishing returns; **iso‑scale parity**; **UNM/NormalizationMethod‑based mapping**; **scale‑probe**; **DoE** (design‑of‑experiments); segmented regression; knee detection.

### Problem frame

Teams often say a method “**scales**” without disclosing **which resources**, **across what window**, and **how** outcomes respond (convex rise → knee → plateau). Without that, parity is skewed (unequal budgets, unmatched windows), coverage/illumination report-metrics leak into dominance, and “knees” are found late. SLL supplies a notation‑independent **lens** to make scale behaviour explicit and comparable.
### Problem

Omitting **Scale Variables** and the comparison window causes: (i) **unfair parity** (compute/data/FoA mismatched), (ii) **illumination/coverage report-metric  creep** into dominance by default, (iii) late detection of knees and budget waste. **G.9** already forbids scalarising mixed scales and mandates equal **FreshnessWindows**/**pinned editions**; SLL complements this with **ScaleWindow** & elasticity.
### Forces

Notation independence vs useful scaling heuristics; local context vs cross‑context generality; **telemetry vs objectives** (illumination stays report‑only telemetry unless policy promotes it); early exploration vs reproducible policy.
### Solution — binding lens for generator/selector profiles (normative)

#### Types (aliases; ΔKernel = 0).

`SLL.Profile` is an **annotation** on a `MethodFamily/Generator` or a `Selector` profile; **no new U.Types** are minted (LEX discipline).
#### Fields (conceptual descriptors).

* **S — Scale Variables.** Minimal set of **monotone knobs** for the Context: `compute` (steps/tokens/FLOPs/time/energy), `data` (size/quality), `model capacity` (params/branches), `iteration budget`, **`freedom‑of‑action (FoA)`**/**environment richness**, etc. Declare **units** via **Resrc‑CAL** and bind to a **ScaleWindow**. Where training/inference trade, **name the phase** the claim concerns.
* **ScaleWindow.** Declared range of `S` values for which behaviour claims hold (editioned). This is **distinct from** **FreshnessWindow** used by parity. 
* **Scale‑Probe.** At least **two** (preferably **≥ 3**) **parity‑respecting** points in `S` within the ScaleWindow, recorded with **replicates/seeds** and **CI/error bars** to support elasticity classification. Pick points via a **small factorial or Latin‑hypercube** when multiple knobs vary.
* **ElasticityClass** `χ ∈ {rising, knee, flat, declining}` — a **qualitative** class; numeric exponents/fits live in domain annexes, not Core.
* **ParityNotes.** `iso‑scale parity?` flag (and **loss notes** if not achieved), plus **Bridge/Φ/Ψ** IDs when crossing contexts (penalties **route to R only**).
#### Norms (SLL).

* **SLL‑1 (Declaration).** Any profile **claiming scale behaviour SHALL** declare `S` and a **ScaleWindow** for the Context.
* **SLL‑2 (Probe).** Early investigation **SHALL** include a **scale‑probe** (≥ 2 points in `S`, with replicates/CI) and record **χ**. Multi‑knob probes **SHALL** hold unspecified knobs fixed or pinned, and disclose invariants.
* **SLL‑3 (Parity).** Where `S` is declared, comparisons **SHALL** ensure **iso‑scale parity** and lawful **UNM/NormalizationMethod‑based mapping** across heterogeneous knobs (e.g., FLOPs↔tokens) **before** comparing outcomes; **FreshnessWindows/editions** must be equal/pinned per **G.9**. Record **seeds/replicates**, ComparatorSet, and policy‑ids in telemetry/SCR. 
* **SLL‑4 (Selection lens).** Within the **same Context and ScaleWindow**, if other heads (N/U/C) are tied, selectors **MAY** use illumination as a tie‑breaker, but it **SHALL NOT** change default dominance; illumination remains **report‑only telemetry** unless a CAL policy promotes it.
* **SLL‑5 (Knee test).** A **knee** is **claimed** only where a monotone rise is followed by a **statistically significant** slope drop across adjacent probe points within the ScaleWindow; thresholds (e.g., Δslope & CI level) are **policy‑defined** (E/E‑LOG) and must be cited. Absent such evidence, classify as **rising**.
* **SLL‑6 (Telemetry invariants).** Probes **SHALL** export seeds/replicates, edition pins, policy‑ids, and Resrc‑CAL units to **G.11**.
#### Method — minimal SoTA probe recipe (notation‑agnostic; informative).

1) **Choose knobs** `S` that are plausibly monotone in the Context (compute/data/capacity/FoA).  
2) **Pick 3–5 probe points** per active knob (edge/mid/edge) under iso‑scale parity; use a **fractional factorial** if >2 knobs.  
3) **Run replicates** (≥ 3 preferred) and **bootstrap** 95% CI on the primary objective(s); log seeds.  
4) **Estimate local slopes** on a log‑log grid; apply **piecewise/segmented regression** or a **knee detector** (e.g., L‑curve/Kneedle) to support `χ`.  
5) **Record invariants** (pinned knobs, safety envelope) and publish **SLL.Card@Context**.  
6) **If χ changes** across the window, split the ScaleWindow and re‑classify per segment.
### Interfaces — minimal I/O (conceptual)

**G.9 Plan/Run Parity** consumes `S`/ScaleWindow to align budgets, **pin editions**, and perform **UNM/NormalizationMethod‑based mapping**; **G.11** carries **policy‑id**, **PathSliceId**, seeds/replicates, CI level, and edition pins per parity CC.
### Conformance Checklist (CC‑SLL)

1. `S` declared **or** `S = N/A` with rationale.
2. **Scale‑probe** performed; **χ** recorded with **replicates/CI**; invariants disclosed.
3. **iso‑scale parity** or **loss notes** + penalties **→ R only**; editions/seeds pinned; ComparatorSet cited.
4. If used as tie‑breaker, the selector cites **χ** and **lens id** in **E/E‑LOG** provenance.
5. Knee claims cite the **policy threshold** and CI level used.
### Anti‑patterns & remedies

Hidden budget mismatches; averaging ordinals across families; **illumination in dominance by default**; unpinned editions; slope claims without **replicates/CI**; training/inference phase mixing → **cure** with **G.9** parity (equal windows/editions; normalize‑then‑compare; return sets), phase‑label the claim, and record slope uncertainty per Scale‑Audit discipline.
### Archetypal grounding (post‑2015; informative)

* **LLM scaling.** Kaplan‑style & **Chinchilla‑optimal** regimes; **Mixture‑of‑Experts** and **retrieval‑augmented** families shift effective capacity with different inference budgets; prompt‑policies often transfer better than narrow pipelines.
* **RL/Planning.** Model‑based optimization & general agents vs hand‑tuned controllers; slopes reported wrt budget/FoA under safety envelopes.
* **QD/OEE.** MAP‑Elites, **CMA‑ME**, **DQD**, **QDax**; **POET/Enhanced‑POET** families: coverage/illumination as telemetry metrics; parity uses fixed grids/spaces and edition pins.
### Payload — exports

`SLL.Card@Context` (UTS row; editioned):
`⟨S{knobs, units, phase}, ScaleWindow, Scale‑Probe{points≥2, design=one‑liner, seeds, CI}, ElasticityClass χ, ParityNotes{iso‑scale?|loss, invariants}, BridgeIds?/Φ/Ψ, PolicyIds? (E/E‑LOG), PathSliceId?⟩`.

**UTS row template (conceptual; pencil‑ready).**
`SLL.Card@Context := S=(COMPUTE|DATA|CAPACITY|FOA; units=…; phase=TRAIN|INFER), ScaleWindow=[LOW…HIGH], Probe=(points=…, design=factorial|LHD, seeds=…, CI=…), χ=rising|knee|flat|declining, ParityNotes=(iso=true|false; invariants=…), Bridge/Φ/Ψ=(…), PolicyIds=(…), PathSliceId=(…)`.
### Relations

**Builds on:** C.16/17/18. **Coordinates with:** C.19 (lenses/policies), **G.5** (set‑returning selector), **G.9** (parity; **ParetoOnly** default; UNM/NormalizationMethod‑based mapping), **G.10** (shipping). 

> *Pedagogical cue.* **Say what you would scale, probe it twice, and use the slope‑class to steer.**
### C.18.1:End
## Explore–Exploit Governor (E/E‑LOG)

> **Type:** Calculus (C)
> **Status:** Stable
> **Normativity:** Normative

**Plain-name.** Explore-exploit governor.

**Intent.** Govern exploration/exploitation policy over still-live candidate pools so frontier treatment, graduation, narrowing, and sunset posture stay explicit, auditable, and stated as one pool-policy result without taking over local choice, enactment, or publication burdens.

**Export posture.** No `Γ` operators are exported; policies parameterize calls in `C.18 NQD-CAL`.

**Depends on.** `C.18 NQD-CAL` (generators), `C.17 Creativity-CHR` (measurements), `Decsn-CAL` (objectives/constraints and scalarization lenses), `B.3` (trust adjustments), and `Compose-CAL` (set aggregation; advisory).

**Coordinates with.** `C.11` for local choice among already-available options, `C.24` for enactment planning after choice, `G.5` for selector-facing publication, `C.17`, and `G.9`.

### Use this when

- several candidate lines, family regions, or frontier segments remain live under one declared exploration/exploitation posture and the burden is now policy over that pool rather than one more local choice result
- the next result should say how the pool will be treated next: `widen`, `keep frontier`, `narrow to subset`, `sunset line`, or `reroute`
- the governing lens or policy posture must be explicit rather than inferred from vague exploration language
### What goes wrong if missed

- scalarized top-1 picks are mislabeled as "the frontier", so it becomes unclear whether the result names one lens-ranked winner or the lawful live set
- exploration continues without one named pool, one named governing lens, or one explicit next treatment
- local option choice, pool policy, enactment planning, and published shortlist semantics collapse into one blurred burden
### What this buys

- one explicit pool-governance surface for exploration, graduation, narrowing, and sunset posture
- one explicit link from lens or policy posture to the next pool-side treatment
- one repeatable way to preserve heterogeneity and frontier discipline without forcing illegal totalization
### First-minute questions

- Which still-live pool, frontier segment, or family region is actually under governance now?
- Which lens or policy posture is governing it?
- Is the next lawful treatment `widen`, `keep frontier`, `narrow to subset`, `sunset line`, or `reroute`?
- What event or threshold would justify changing that treatment next?
### First output

The first useful output is one explicit pool-policy result that names the live pool, the governing lens or policy posture, the current treatment (`widen`, `keep frontier`, `narrow to subset`, `sunset line`, or `reroute`), and the exact event that would justify changing that treatment next.

That result records how the pool will be treated next under the current exploration/exploitation posture; it does not replace one local `C.11` choice record, one `C.24` enactment plan, or one `G.5` published selector result.

If that first output still cannot be written honestly, the current pool-policy result is not finished `C.19` policy yet.
### Problem frame

The E/E governor provides named, versioned policies and lenses that steer NQD generation/selection under lawful dominance and provenance constraints.

When `C.11` has already made local choice among one fixed `OptionSet` explicit, `C.19` begins where the burden becomes policy over several still-live candidate lines, family regions, or frontier segments rather than one more local `ChoiceResult` record.

Immediate failure signs for this pattern:
- the current pool-policy result cannot name the still-live candidate pool it is governing
- the governing lens or policy posture is missing
- the next pool-side treatment exists only as one vague promise to continue exploration later

If the question is still which single option should survive now, reroute to `C.11`. If the next artifact must already be one enactment-facing plan, reroute to `C.24`. If the retained set must be published for downstream consumption, reroute to `G.5`.
### Problem

Ad‑hoc exploration mixes ordinal and interval folds, silently scalarises posets, and loses lens/policy provenance—undermining legality and reproducibility.
### Forces

• Trust gates vs. discovery — graduation requires backstop confidence while maintaining explore_share.
• Heterogeneity vs. focus — fairness quotas by family vs. depth on proven lines.
• Lens expressiveness vs. audit — scalarised choices must not be called 'the frontier' and MUST record lens ids.
### Solution

Define EmitterPolicy (class, params, ε, K, insertion/dedup) and selection lenses with a fixed pipeline (Eligibility → Dominance → Tie‑breakers); bind provenance (policy id, lens id) and guard promotions of Surprise/Illumination to dominance to explicit policy declarations.

**Agency clarification.** Decisions are taken by a **system in role**. **Contexts publish** measurement spaces and admissible policies as **semantic frames**; LOG profiles lenses and policies but does **not** enact choices.
**Depends on.** **C.18 NQD‑CAL** (generators), **C.17 Creativity‑CHR** (measurements), **Decsn‑CAL** (objectives/constraints, scalarization lenses), **B.3** (trust adjustments), **Compose‑CAL** (set aggregation; advisory).

**EmitterPolicy (named profile).** A context‑local, versioned policy with fields:
`{ name, class ∈ {UCB, Thompson, BO‑EI, GP‑UCB, PES, …}, params, explore_share∈[0,1], temperature τ≥0, rebalance_period, wild_bet_quota≥0, backstop_confidence (assurance level), epsilon_dominance ε, cell_capacity K, **insertion_policy**, **dedup_threshold** }`.
Policies are referenced as `U.EmitterPolicyRef` by NQD generator call (C.18) and are conceptual lenses, not staffing/budget instructions.

**Decision-theory bridge.** `C.11` owns theory-side choice among already-available options and the meaning of `ProbeBudget`, `ValueOfInformation`, and `ValueOfComputation`. `C.19` may consume such outputs only as criteria for pool policy, graduation, keep-frontier, or sunset posture; it does not re-own local choice doctrine.

**Defaults (if policy is unspecified):**  
• **Dominance:** `{Q components}` with `ConstraintFit=pass` as **eligibility gate**.  
• **Tie‑breakers:** `Novelty@context`, `ΔDiversity_P`, `Surprise`; `Illumination` (telemetry over Diversity_P: coverage/QD‑score) MAY be used as a tie‑breaker but is **not** in the dominance set.  
• **Archive:** `K=1`, `ε=0`, deduplication in `CharacteristicSpace`.  
• **Policy:** UCB‑class with moderate temperature; `explore_share ≈ 0.3–0.5`.  
• **Provenance (minimum):** record `DescriptorMapRef.edition`, `DistanceDefRef.edition`, `DHCMethodRef.edition`, `EmitterPolicyRef`, `InsertionPolicyRef`, `dedup_threshold?`, `TimeWindow`, `Seeds`.

**Scalarization lenses (policy‑level).** A lens `J_ℓ` declares: (a) hard eligibility conditions (e.g., ConstraintFit=pass), (b) soft aggregation (weights/curves), (c) trust policy (how assurance/CL discounts enter).  
**Conformance.** A Context MUST name the lens used to pick from a frontier; scalarized rankings MUST NOT be presented as “the frontier”; the **`lens id MUST be recorded in provenance of each selection`**.

**Promotion rules (policy).**  
- **Tie‑breaks.**  `Surprise` and `Illumination` MAY act as tie‑breakers; **promotion into the dominance set MUST be declared by lens or policy id** and captured in provenance.
- **Graduation.** Profiles graduate from Explore→Exploit when **backstop_confidence** (B.3 level) and eligibility conditions are met.  
- **Sunset/Pivot.** Profiles failing VOI/backstop thresholds are sunset or pivoted at `rebalance_period`.

**Explore/Exploit loop (per rebalance_period).**
1) Recompute frontier with trust discounts.  
2) Enforce `explore_share` (minimum attention on high‑Novelty, not‑yet‑proven profiles).  
3) Update generator `temperature τ` / emitter mix.  
4) Apply `backstop_confidence` to graduate; sunset stale probes.  
5) Satisfy `wild_bet_quota` by seeding fresh high‑Novelty candidates.
6) HET‑FIRST — apply group‑fairness quotas by domain‑family and/or DPP/Max‑min repulsion before exploit lenses; log quotas and sampler policy id.

**Named lenses (heuristics; policy‑level, not norms)**
The following **lens profiles** are **illustrative heuristics**. Contexts MAY reuse/modify them; they are **not** normative.
• **Frontier‑sweeper** — maintain attention on the full front; promote only when `backstop_confidence` holds.  
• **Barbell** — enforce `explore_share ≥ θ` with a `wild_bet_quota`; otherwise exploit top‑trust region.  
• **Spike‑first** — pick highest **Use‑Value** subject to `ConstraintFit=pass` and a small **Cost‑to‑Probe** cap.  
• **Safety‑first** — minimize **SafetyRisk** subject to `Use‑Value ≥ θ` and `ConstraintFit=pass`.  
• **Platform‑option** — maximize **Option‑Value** under probe cost bounds.  
• **Pilot‑then‑scale** — optimize **Use‑Value** on pilot scope with `BackstopConfidence ≥ L1`; widen `G` once **R** holds.  
• **Heterogeneity‑first (policy id).** Eligibility → Dominance → Tie‑breakers; Hard gate: FamilyCoverage ≥ k, MinInterFamilyDistance ≥ δ_family; Fairness quotas: ≤1 candidate per sub‑family at pre‑front sampling; DPP/Max‑min sampler allowed.
**Conformance (lens recording).** A decision that uses any lens **MUST** record its **lens id** alongside `EmitterPolicyRef`. (This restates and localizes C19-3.)

#### Explicit pool-policy result

A finished `C.19` pass should publish one explicit pool-policy result rather than one atmospheric statement that exploration will continue somehow.

That result should state:

- the still-live pool, frontier, or family scope under governance now;
- the governing lens id or policy posture;
- the next treatment, chosen from `widen`, `keep frontier`, `narrow to subset`, `sunset line`, or `reroute`;
- the event or threshold that would justify changing that treatment next.

A compact result may therefore state, for example:

- `poolScope = frontier_F`
- `governingLens = barbell_policy_v2`
- `nextTreatment = keep_frontier`
- `changeTrigger = backstop_confidence reaches L1 for one retained line`

or, for one narrower family region:

- `poolScope = family_region_beta`
- `governingLens = heterogeneity_first`
- `nextTreatment = narrow_to_subset`
- `changeTrigger = quota satisfaction plus one explicit novelty floor`

Those fields define the result: governed pool, governing lens, next treatment, and change trigger.
#### Closure rule over the live pool

A `C.19` pass may close only when one explicit pool and one explicit next treatment are both visible.

- Close as `widen` when the current frontier is too narrow for the declared exploration posture or when the evidence basis is too thin to justify current narrowing.
- Close as `keep frontier` when several lines must remain live under the current lens and no narrower lawful subset is yet justified.
- Close as `narrow to subset` when one declared lens now justifies retaining one smaller internal live set without pretending that one scalar winner has already been chosen.
- Close as `sunset line` when one line or family region no longer clears the current lens, quota, or backstop requirements.
- Close as `reroute` when the burden has stopped being pool policy and has become local choice, enactment planning, or selector-facing publication.

One internal retained subset here is still one pool-treatment result. It is not yet one public `Shortlist`, `RankedShortlist`, or `ShortlistId`-bearing selector artifact. If the retained subset must be published for downstream comparison, handoff, or registry-facing consumption, `C.19` closes only by rerouting to `G.5`.

If the result still cannot say which pool remains live, which lens governs it, and which event would justify changing the treatment, it is still unfinished pool policy rather than one finished `C.19` result.
#### Minimal pool-policy record

The smallest useful `C.19` record usually states:

- `livePool = ...`
- `governingLens = ...`
- `currentTreatment = widen | keep frontier | narrow to subset | sunset line | reroute`
- `changeTrigger = ...`
- `whyNotLocalChoice = ...` when the result might otherwise be mistaken for `C.11`

A lawful short record may therefore read:

```text
livePool = frontier_F
lens = barbell_policy_v2
currentTreatment = keep_frontier
changeTrigger = backstop_confidence reaches L1 for one retained line
whyNotLocalChoice = several family regions remain live
```

When `currentTreatment = narrow_to_subset`, `livePool` still names one internal retained subset or one live pool subset. It does not yet mint one public `Shortlist`, one public `RankedShortlist`, or one `ShortlistId`. If selector-facing publication is now required, the lawful `C.19` record closes as `reroute` to `G.5` rather than silently renaming the internal subset as though publication had already happened.

If the record does not already state which pool remains live, what governs it, and what would change that posture next, it is still one unfinished `C.19` result.
#### Worked closure slice

Three short contrasts keep the closure law practical.

**Several family regions remain live.**
When the point is to keep several lines active under one declared lens, `C.19` should not pretend it has already made one local choice:

```text
livePool = frontier_F
lens = frontier_sweeper_v3
currentTreatment = keep_frontier
changeTrigger = one retained line reaches backstop_confidence L1
whyNotLocalChoice = three family regions remain live
```

**One region should now be sunset.**
When one region no longer clears the active novelty floor or backstop, `C.19` should say so directly rather than leaving that retirement implicit:

```text
livePool = family_region_beta
lens = barbell_policy_v2
currentTreatment = sunset_line
changeTrigger = reopen only if new evidence or quota deficit reactivates the region
whyNotLocalChoice = other regions still remain live under the same pool policy
```

**The pool has already been narrowed and the next burden is publication.**
When one internal retained subset is already explicit and the next burden is to publish it for downstream use, `C.19` should close by rerouting instead of naming that subset as though it were already one public shortlist artifact:

```text
livePool = retained_subset_{option_B, option_C}
lens = pool_policy_completed
currentTreatment = reroute
changeTrigger = G5 publishes one selector-facing Shortlist or RankedShortlist now
whyNotLocalChoice = pool governance is already complete
```
### System grounding

A product-search or architecture-search team often keeps several family regions alive even after one tempting line starts to look best locally. A lawful `C.19` result might therefore keep the frontier live under `frontier_sweeper_v3` until one retained line actually clears the declared `backstop_confidence`, instead of collapsing the whole pool into one premature winner.

#### Episteme grounding

A SoTA pack often compares traditions that stay non-dominated for different reasons: one clears current evidence quality, one keeps broader transfer value, one preserves family coverage. The lawful `C.19` result is then often `keep frontier` or `narrow to subset`, not one fake scalar champion.
#### Collective and contextual grounding

A regional or stakeholder-diverse portfolio may have to sunset one line while keeping others alive to preserve coverage, fairness quotas, or contextual fit. The practical point is that `C.19` owns that pool-treatment decision only while the burden is still about the live set; once the result must become one local choice, one enactment plan, or one published selected set, reroute immediately.
### Bias-Annotation

No global scalarisation of partial orders; ordinal scales excluded from arithmetic; all selections record lens id and policy id; notation/tool neutrality.
### Conformance Checklist

- **C19-1** Each NQD generator call (C.18) **SHALL** cite `U.EmitterPolicyRef` (policy id + params) **and the active `InsertionPolicyRef`/`dedup_threshold` when not inherited**.
- **C19-2** The characteristic set & signs used for dominance **MUST** be declared; eligibility conditions applied first. *(References to C.18 generator operators are descriptive only; LOG exports no Γ.)*
- **C19-3** If a lens is used, its id MUST be recorded; do not label scalarized top-1 as "frontier".
- **C19-4** Promotion of Surprise/Illumination into dominance MUST be explicit in policy.
- **C19-5** USM/RSG gate applies: policy actions SHALL operate within the Context's scope and enactable RSG states.
- **C19-6** Each selection lens **MUST** implement and document the pipeline` Eligibility (ConstraintFit=pass) → Dominance (declared set) → Tie-breakers (declared)`. Any **promotion** of Surprise/Illumination into the dominance set **MUST** be named by lens/policy id and recorded in provenance.
- **C19-7 (LEX-AUTH trigger).** Any change to `EmitterPolicy` defaults that affects domain-family quotas/samplers (HET-FIRST), or any change to `DescriptorMap` family coordinates, `DistanceDef`, or the `δ_family` threshold MUST be authored via **E.15 LEX-AUTH** with a published **LAT**; the DRR SHALL carry the LAT pointer (see **CC-DRR.6**). Record policy/card ids in SCR.
- **C19-8**  When the Heterogeneity-first lens is used, provenance MUST include: (i) the family-quota vector (including the default triad quota k), (ii) the subFamilyDef id (from F1-Card) if sub-family quotas apply, (iii) the sampler class, seed, and policy id.
- **C19-9** When `C.19` returns one pool-policy result, that result **MUST** identify the still-live pool or family scope, the governing lens or policy id, and the next treatment (`widen`, `keep frontier`, `narrow to subset`, `sunset line`, or `reroute`).
- **C19-10** If the burden is still local option choice, already one enactment-facing plan, or already one selector-facing publication result, `C.19` **MUST** reroute rather than restate `C.11`, `C.24`, or `G.5`.
### Common Anti-Patterns and How to Avoid Them

- **Treating one scalarized top-1 as the frontier.** Avoid by naming the governing lens and keeping the live frontier distinct from any lens-ranked pick.
- **Running exploration without one explicit next treatment.** Avoid by ending each pass with one explicit pool-side action: `widen`, `keep frontier`, `narrow to subset`, `sunset line`, or `reroute`.
- **Letting `Surprise` or `Illumination` quietly become dominance criteria.** Avoid by promoting them only through one declared lens or policy id and recording that promotion in provenance.
- **Re-owning neighboring burdens.** Avoid by rerouting fixed-option choice to `C.11`, enactment-facing call planning to `C.24`, and selector-facing publication to `G.5`.
### Consequences

- the result states whether the pool is being widened, kept live, narrowed, sunset, or rerouted
- heterogeneity can remain lawful without pretending every frontier is one scalar winner
- the cost is stricter provenance and the need to name lenses, policies, and change triggers explicitly
### Rationale

`C.19` exists because pool governance is neither local choice nor execution. Once several candidate lines remain live, the key burden is no longer which single option should survive now; it is how the pool should be governed next under one explicit lens or policy. That burden needs its own explicit pool-policy result, otherwise frontier drift, silent scalarization, and policy amnesia return immediately.

- Post-2015 bandit and Bayesian-optimization practice treats explore/exploit posture as an explicit policy object, not as one hidden side effect of whichever candidate looked best first. The practical implication here is to emit one explicit pool treatment plus one change trigger, not one atmospheric frontier story.
- Contemporary frontier and quality-diversity practice also distinguishes the live frontier from any scalarized pick taken under one declared lens. The practical safeguard is to keep `keep frontier`, `narrow to subset`, and `sunset line` as visible alternatives rather than silently totalizing the pool.
- Modern portfolio and fairness-preserving lines keep coverage or heterogeneity pressures explicit until one declared reason justifies retirement or reroute. The practical implication is simple: sunset or reroute only when the current pool-policy result can already say why the pool no longer belongs to `C.19`.
### Relations

Builds on: `Decsn-CAL`, `B.3`. Coordinates with: `C.11` for local choice among already-available options, `C.18` for candidate generation and open-ended search, `C.24` for post-choice enactment planning, `G.5` for selector-facing publication, `C.17`, and `G.9`.
### C.19:End
## Bitter‑Lesson Preference (BLP)

**One‑screen purpose (manager‑first).**
Establish, at **governing policy** level, the empirical **Bitter Lesson**: **prefer general, scale‑amenable methods**—those that improve with **more data/compute/capacity and greater freedom‑of‑action**—over narrow hand‑crafted heuristics **when safety and legality are equal**. Exceptions require a transparent **Scale‑Audit** under the parity harness. 

**Builds on.** C.19 (E/E‑LOG), C.24 (Agent‑Tools‑CAL; **ATC‑2**), B.3 (Assurance), E.3 (Precedence), E.5 (Guard‑Rails).
**Coordinates with.** G.5 (Selector), G.8 (SoS‑LOG Bundles), G.9 (Parity), G.11 (Refresh‑Telemetry), A.0 (On‑Ramp).
**Keywords.** general‑method preference; scale‑amenability; **BLP‑waiver**; iso‑scale parity; **Scale‑Audit**; slope vector; **α/δ tolerances**.

### Problem frame

Bespoke heuristics can win locally but **do not scale**; general methods (search/learning/planning) **improve with scale** and transfer across bridges/planes. Without a standing policy, selectors drift toward hand‑craft and single‑winner leaderboards, violating parity and lawful orders.
### Policy clauses (normative; synchronized with Core)

**BLP‑1 — Scale‑Audit requirement.**
Any DRR that selects a **narrower/hand‑engineered** method over a **general/scalable** alternative **MUST** include a **Scale‑Audit**:
(a) **Parity harness**: equal **FreshnessWindows**, a common **ComparatorSet**, **replicates/seeds**, **portfolio‑first** evaluation; **Dominance = ParetoOnly** unless a CAL policy says otherwise (policy‑id cited).  
(b) **Budget sweeps**: vary **compute**, **data**, and **FoA** within a fixed safety envelope; **pin** any unsweepable knob and record the invariant. 
(c) **Slopes & uncertainty**: report ∂quality/∂compute, ∂quality/∂data, and (where applicable) ∂coverage/∂FoA, with **CI/error bars** and **edition/policy pins** in telemetry. Use **bootstrapped CIs** or repeated‑seed estimates; disclose heteroscedasticity handling.
(d) **Resources**: publish **Resrc‑CAL** accounts (time/energy/FLOPs) and assurance deltas (B.3). 
(e) **Objective vector**: list **Q/Risk/Cost** and—**only if policy promotes them**—illumination/coverage telemetry metrics. 
(f) **DoE recipe**: for ≥2 active knobs, apply a **fractional factorial** or **Latin‑hypercube** with ≥ 3 levels per knob to avoid aliasing; justify any lower design.  
(g) **Knee & regret tests**: if claiming a heuristic wins, show either (i) a **knee** inside the audited window for the general method (per SLL‑5 policy thresholds) or (ii) **budget‑constrained regret** over the sweep where the heuristic dominates within CI.

**BLP‑2 — Preference rule (with α/δ tolerances).**
Among admissible options with comparable assurance (within **δ**) and budget (within **α**), prefer the method whose **slope vector** **Pareto‑dominates** over the audited range; if no dominance within error bounds, prefer the **more general** method; else resolve by the **E/E‑LOG** tie‑breakers declared in policy. (Agentic contexts implement this as **ATC‑2**; **BLP_delta_α/δ** live in **ATC.Policy**.)  

> **BLP‑2.1 — Valid waiver grounds (override transparency).**
> Overrides of BLP‑2 are allowed **only** when:
> • **Deontic override:** regulation/ethics make the general method inapplicable (E.5/E.3).
> • **Scale‑probe overturn:** under **iso‑scale parity** in the declared **ScaleWindow**, the heuristic **sustainedly outperforms** with uncertainty accounted for.
> • **Complementary bias:** the heuristic is an **inductive bias** that **improves** the general method **without blocking scale** (graceful degradation as `S` grows).
> All overrides record a **BLP‑waiver** with rationale, owner, and expiry/review in the DRR. 

**BLP‑2.2 — Task-family specialization compatibility.**
A bounded task-family specialization remains **BLP-compatible** when it is produced by a **general, scale-amenable substrate**, when it acts as a complementary bias that does not block scale, or when it survives the ordinary **BLP** comparison discipline on the same declared task family and work target. `BLP` therefore governs whether the narrower current method was generated, compared, audited, waived, and overridden lawfully; it does **not** require the final local behavior at every moment to look maximally generic.

Low-human-overlap or newly discovered approaches remain admissible when the task family, budget guard rails, and evidence basis are explicit by value and the same `Scale‑Audit`, `α/δ`, waiver, and override discipline is preserved.
**BLP‑3 — Minimal‑prescription default.**
Author **rules‑as‑prohibitions** (negative constraints) instead of stepwise scripts; encode limits in **Φ policy tables** (and **Φ_plane**) and allow agents to **sequence autonomously** within those constraints. Scripts are permissible only when mandated by safety/regulation or with compelling DRR evidence reviewed under E.3/E.5. 

**BLP‑4 — Heuristic‑Debt register (mandatory).**
Any admitted heuristic is recorded as **Heuristic Debt** with scope, owner, expiry/review window, and a de‑hardening plan; track in **CalibrationLedger/BCT** and cite in SCR. 

**BLP‑5 — Continuous‑learning posture.**
Where product policy allows, enable **feedback‑driven adaptation** (preference learning, critique loops) within Guard‑Rails and privacy controls; disabling adaptation requires DRR justification and review date. 

**BLP‑6 — Precedence & safeguards.**
BLP is constitutional (instantiates **P‑10/P‑11/P‑7/P‑1**), but **does not supersede Guard‑Rails (E.5) or precedence rulings (E.3)**. Where **NQD/E/E‑LOG** promotes illumination into dominance, **BLP adopts that lens** for the audited window.  

**BLP‑7 — Publication discipline.**
Scale‑Audit artefacts **SHALL** be exported to **G.11** with edition pins, CI level, α/δ, ComparatorSet, and **BLP.Policy@Context** reference so downstream selectors can reuse evidence without re‑running audits.
### Conformance Checklist (CC‑BLP)

1. **α/δ tolerances** declared in DRR or via policy profile (and CI level stated).
2. DRR includes a **Scale‑Audit** (BLP‑1a–g) with slopes, **CI**, edition/policy pins, and Resrc‑CAL.
3. Selection cites **BLP‑2** and precedence checks.
4. Any heuristic is logged as **Heuristic‑Debt** with expiry and de‑hardening plan.
5. Authoring defaults to **rules‑as‑prohibitions**; deviations are DRR‑justified and safety‑anchored.
6. **Resrc‑CAL** accounts and assurance deltas reported.
7. **Replicate counts/seeds** and **confidence intervals** recorded for slope estimates; heteroscedasticity handling disclosed.
8. Audit artefacts exported to **G.11** with **BLP.Policy@Context** id.

9. When a narrower specialist method is selected or returned for one declared task family, the record names the task family/work target and the Scale‑Audit, waiver, or override ground that keeps the choice BLP‑compatible.
### Anti‑patterns & remedies

Single‑winner leaderboards; hidden budget mixing; promoting illumination into dominance **without policy**; missing edition pins; heuristics without expiry; slope estimates without CI or with aliased designs → **remedy** with G.9 parity + edition pins, explicit **policy‑ids**, DRR publication, **Heuristic‑Debt** entries, and BLP‑1f DoE discipline.
### Archetypal grounding (post‑2015; informative)

* **LLMs:** prompt‑programs, **retrieval‑augmented** and **MoE** policies vs narrow task‑specific pipelines; portfolio‑first selection across editions/budgets.
* **RL & planning:** model‑based optimization/general agents vs hand‑coded controllers (subject to α/δ and safety).
* **Preference learning:** **RLHF ↔ DPO** families.
* **QD/OEE:** MAP‑Elites/**CMA‑ME**/**DQD**/**QDax**; **POET/Enhanced‑POET**; illumination remains **report‑only telemetry** unless policy promotes it.
### Payload — exports

`BLP.Policy@Context` (UTS row; editioned):
`⟨PreferenceDefault, α/δ tolerances + CI, Scale‑Audit recipe (G.9 link; DoE), WaiverRegister{reason, owner, expiry}, E/E‑LOG lens policy‑ids, ATC.PolicyRef? (agentic), G.11.TelemetryPins⟩`.

**UTS row template (conceptual; pencil‑ready).**
`BLP.Policy@Context := PreferenceDefault=(prefer‑general|neutral), α/δ=(α=…, δ=…, CI=…), Scale‑Audit=(parity=G.9; sweep=S={…}; DoE=factorial|LHD; kneeTest=policy‑τ), WaiverRegister=[{reason=…, owner=…, expiry=…}], E/E‑LOG=(policyIds=…), ATC.PolicyRef=(…), TelemetryPins=(edition=…, seeds=…, comparatorSet=…)`.
### Relations

**Depends on:** **G.5/G.9** (selector/parity), **G.11** (refresh telemetry), **C.5** (Resrc‑CAL), **C.18** (NQD‑CAL), **C.19** (E/E‑LOG), **F.7/F.9** (Bridges, CL/Φ/Ψ). **Constrained by:** **E.5** Guard‑Rails and **E.3** precedence. 

> *Memory hook.* **Prefer what scales; explain when you don’t.**
### C.19.1:End
## Composition of U.Discipline (Discipline‑CAL)

**Builds on.** **C.2 KD‑CAL** (F–G–R & CL routing), **A.19/G.0 CG‑Spec** (comparability), **F.9 Bridges** (cross‑Context alignment), **E.10 LEX** (registers & twin labels). **Coordinates with.** **C.21** (Discipline‑CHR, field health), **C.23** (Method‑SoS‑LOG), **F.17–F.18** (UTS).

### Problem Frame

Disciplines persist as *knowledge canons* (epistemes), *codified practices & standards*, and *institutional carriers* (journals, bodies, curricula). FPF needs a typed, provenance‑preserving way to **compose** these into a reusable **holon of talk** that travels across contexts *lawfully*. Composition must honour KD‑CAL lanes and the CG‑Spec Standard so that any numeric comparison or aggregation remains auditable and legal.
### Problem

Without a **composition calculus** for disciplines:
* fields degenerate into labels; editions and rival **Traditions/Lineages** blur;  
* cross‑Context reuse silently drops meaning (no Bridge/CL), or performs illegal aggregations (means on ordinals; unit mixing);  
* selectors (Part G) cannot lawfully gate methods because maturity/evidence are not tied to a field’s canon and carriers.
### Forces

| Force | Tension |
|---|---|
| **Pluralism vs Cohesion** | Rival traditions must co‑exist ↔ a discipline holon must present a coherent public surface. |
| **Locality vs Federation** | Meaning is context‑local (rooms) ↔ reuse needs Bridges with CL and recorded loss notes. |
| **Rigor vs Agility** | CG‑Spec legality, KD‑CAL lanes ↔ practical authoring and edition flow (UTS/DRR). |
| **Didactic surface vs Assurance depth** | Human‑readable Discipline Card ↔ auditable F–G–R & provenance. |
### Solution — the Discipline holon and Γ_disc

#### U.Types (minting & registers)

* **`U.Discipline`** — a **Holon** that composes an **EpistemeCanon**, **Standards/Practices**, and **Organisational Carriers** into a durable **unit of talk** (R‑core name; twin labels).  
* **`U.AppliedDiscipline`**, **`U.Transdiscipline`** — subtypes of `U.Discipline`.  (**Kernel U‑types; LEX‑governed**).
* **`U.Tradition`**, **`U.Lineage`** — auxiliary holons that organise variants/editions within a `U.Discipline`.  

**Placement/LEX.** `U.Discipline` and its subtypes are **Kernel U‑types** introduced under the **Open‑Ended Kernel** & **Ontological Parsimony** guards (**A.5**, **A.11**) and registered per **E.10/F.17**. This CAL **uses** them, it does not redefine them. If not yet present in A‑cluster, mark as **“provisionally minted”** and open a DRR to finalize placement (E.10 V‑ladder). 

All are **UTS‑published** with **twin labels**; minting follows **E.10** registers/prefix policy and **A.11** parsimony.
#### What a U.Discipline is / is not

* A `U.Discipline` is **not** a `U.BoundedContext` and **not** a **Domain**. **Domain** remains a *catalog label* (stitched to D.CTX + UTS): **Discipline ≠ Domain** is enforceable via **E.10 LexicalCheck**; any cross‑Domain/Context reuse **MUST** cite a **Bridge (F.9) + CL + loss notes**; penalties to **R** only; **F/G invariant** (USM/KD‑CAL). 
* **Comparability** of a discipline flows **only through** the discipline’s **CG‑Spec** entries (no ad‑hoc formulas).  
* Cross‑Context/Tradition reuse **MUST** use **Bridge(s)** with **CL** and loss notes; **CL penalties route to R** (KD‑CAL/B.3); **F/G remain invariant**.  
* Public naming surfaces obey **LEX** (I/D/S; twin labels; banned heads); “discipline column” is **didactic only** and **carries no semantics** (enforced by LexicalCheck).
#### Constructor Γ_disc (CAL export)

*Signature.*  
`Γ_disc : ⟨EpistemeCanon, StandardsSet, OrgCarriers, {Bridges}, Policy⟩ → U.Discipline`  
*Intent.* Fold the three constituents into a `U.Discipline`, **preserving provenance**, publishing UTS cards, and enabling lawful comparability via referenced **CG‑Spec** rows.  
*Obligations.*  
1) **Provenance & lanes.** Each imported episteme/standard declares **A.10 anchors** and lane tags **{TA, VA, LA}**; freshness windows are recorded.  
2) **Assurance fold.** Use KD‑CAL weakest‑link on R with **Φ(CL)** (and, where applicable, **Φ_plane** for ReferencePlane crossings) **table‑backed and monotone**; publish policy ids. For any justification **path P**, compute **`R_eff(P) = max(0, min_i R_i − Φ(CL_min(P)))`**; for parallel independent lines to the *same* claim take **`R(Γ) = max_P R_eff(P)`**; **`F(Γ)=min`** along used paths. No thresholds inside CHR/CAL (Acceptance‑only). Unknowns propagate as {pass|degrade|abstain} to Acceptance. 
3) **CG‑Spec guard.** Any numeric comparison/aggregation in Discipline reports **MUST** cite the discipline’s **CG‑Spec** with lawful **ScaleComplianceProfile (SCP)**, **Γ‑fold**, and **MinimalEvidence**; units/scale/polarity legality via **MM‑CHR/CSLC** precedes aggregation.  
4) **Scale/Unit/Polarity legality.** Before any comparison/aggregation, **prove legality via MM‑CHR/CSLC** and cite **CG‑Spec characteristic ids** used in the fold (A.17–A.19).
5) **ReferencePlane guard.** When crossings touch `world|concept|episteme`, apply **CL_meta** and route penalties to **R** only; record **plane** on the UTS row.
6) **Edition discipline.** Changes to canons/standards that alter computed ⟨F,G,R⟩ **create a new edition**; DRR captures the rationale; UTS lifecycle records transitions.  
7) **No stealth globalisation.** Cross‑Context mappings are **by Bridge only**; “by‑name reuse” is forbidden** even with similar labels.
#### Discipline ESG (state graph, informative surface)

Export a **Discipline.ESG** with named states and guarded transitions (e.g., *Emerging → Consolidating → Codified → Fragmenting*), where **guards reference C.21 metrics** (CHR‑typed; **Scale/Unit/Polarity + freshness windows**) and cite **CG‑Spec ids**; **all thresholds live only in AcceptanceClauses** (G.4). ESG is **descriptive**; all gating remains in CHR/CAL/LOG packs.
### Archetypal Grounding (Tell–Show–Show)

| Slot | **System** (safety code in a factory) | **Episteme** (discipline canon across editions) |
|---|---|---|
| **Object** | Production line with hazardous operations | “Safety engineering” as *describedEntity target* (accident models, tolerable risk) |
| **Concept** | Acceptance clauses & evaluation templates bound to rigs/windows | Canon texts: causality models, design rules, proofs/benchmarks (e.g., **formal knowledge bases**, **proof artefacts**, **concept schemas**) |
| **Symbol** | Local SOP/notation sets for checklists | Notation packages (CLIF, RDF/TriG, proof scripts) |
| **Γ_disc assembly** | Fold {line‑specific standard, plant procedures, certifying unit} into **`Discipline: Safety‑Plant‑A`** | Fold {canon papers, formal models, journals/committee} into **`Discipline: Safety‑Engineering`** with **Traditions** (e.g., system safety vs resilience engineering) |
| **Evidence lanes** | LA test campaigns (freshness windows), VA design proofs, TA tool quals | VA proofs over kinds, LA replications/meta‑analyses; TA for checkers |
### Bias‑Annotation

**Lenses:** Governance (naming/UTS), Architecture (CAL+CHR split), Onto/Epist (discipline ≠ domain; triangle fidelity), Pragmatic (authoring/editions), Didactic (twin labels; System/Episteme scenes). **Scope:** context‑local; no “global discipline”.
### Conformance Checklist (normative)

| ID | Requirement | Purpose |
|---|---|---|
| **CC‑C20‑1 (CG‑Spec linkage).** | A `U.Discipline` **SHALL** declare the **CG‑Spec** ids and **CHR characteristic ids** behind any comparison/aggregation; thresholds live only in **Acceptance** clauses referenced by those CG‑Specs. | Auditable comparability; no illegal ops. |
| **CC‑C20‑2 (Bridge‑only reuse).** | Any cross‑Context/Tradition use **SHALL** cite **Bridge id + CL + loss notes**; penalties **route to R only**; **F/G invariant**. | Prevent silent globalisation; align with KD‑CAL. |
| **CC‑C20‑3 (ReferencePlane).** For any crossing touching `world|concept|episteme`, **publish plane** and apply **Φ(CL)** (and **Φ_plane**, where applicable) — both **MUST** be **monotone, bounded, table‑backed**; **unknowns** propagate as **{pass|degrade|abstain}** into **Acceptance** with **SCR note**; **no silent `unknown→0`**. |
| **CC‑C20‑4 (Γ_disc integrity).** | `Γ_disc` **MUST** record lane tags and freshness windows for all imported evidence; **Φ(CL)** **MUST** be monotone and table‑backed per policy. | Deterministic assurance; hygiene of penalties. |
| **CC‑C20‑5 (Edition & DRR).** | Discipline editions **SHALL** be recorded via **UTS lifecycle** with DRR links; no silent rewrites or renames. | Traceable evolution. |
| **CC‑C20‑6 (LEX/I‑D‑S).** | `U.Discipline` names **SHALL** follow **LEX** (twin labels; registers; banned heads). **Domain** mentions are catalog‑only. | Register hygiene; avoid “Domain = Discipline”. |
| **CC‑C20‑7 (Crossing visibility hooks).** | Any **cross‑stance / cross‑Context / cross‑plane** reference in Discipline materials **SHALL** publish a **CrossingBundle** for the crossing (**E.18**; Bridge+UTS **A.27**; BridgeCard **F.9**) and expose it via `Expose_CrossingHooks` (**G.10‑3**). Published crossings **MUST** be checkable for **LanePurity** (CL→R only; F/G invariant; Φ tables present) and **Lexical SD** (**E.10**) under the active GateProfile / GateChecks (**A.21**). | Prevents implied crossings; makes provenance auditable & replayable. |
| **CC‑C20‑8 (Discipline column is didactic).** | Any use of a “discipline column” in tables is **didactic only**; semantics are carried by **UTS rows + Bridges**; **Domain** remains a catalog stitch (**E.10/F.17**). |  |
| **CC‑C20‑9 (Lexical firewall).** | Normative sections remain **notation/tool‑neutral**; vendor/tool tokens are avoided (see **E.5.1**). |  |

#### Canonical rewrites (anti‑ambiguity)

* “TDD discipline” → **`Tradition: Test‑Driven`** *(Plain twin keeps “Tradition”)*.  
* “Safety Discipline Owner” → **`Holder#DisciplineStewardRole:Safety‑Context`**.  
* “ClinicalSafetyDomain Governance” → **`DisciplineSpec: Clinical‑Safety`** with comparability in **CG‑Spec**; the **Domain** mention remains a **D.CTX + UTS** catalog stitch.
### Consequences

**Benefits.** Auditable field composition; lawful federation across traditions; selector‑ready maturity/evidence linkage; didactic surface for stewardship.  
**Trade‑offs.** Discipline authoring requires CG‑Spec literacy and Bridge hygiene; paid back by safe reuse and clearer governance.
### Rationale

The calculus keeps **describedEntity local**, **comparability lawful**, and **assurance explicit**. It aligns with KD‑CAL’s weak‑link folds and CL routing, with CG‑Spec’s **ScaleComplianceProfile (SCP)** and **Γ‑fold** rules, and with LEX twin‑label governance. It avoids “phlogiston disciplines” by tying fields to measurable CHRs (C.21) and evidence lanes.
### Relations

**Builds on.** KD‑CAL (C.2); CG‑Spec (A.19/G.0); Bridges (F.9); LEX (E.10).  
**Coordinates with.** C.21 (field‑health CHRs), C.22 (Problem‑CHR), C.23 (Method‑SoS‑LOG).  
**Constrains.** G.2 **MUST** publish **TraditionCards**/**BridgeMatrix** sufficient for `Γ_disc` to assemble **≥2 Traditions** and **≥3 `U.BoundedContext`** per SoTA synthesis to avoid monoculture. G.5 selector **SHALL** cite Discipline **CG‑Spec ids** and **EvidenceGraph** rows when admitting families.
### C.20:End
## Field Health & Structure (Discipline-CHR)

> *Purpose.* Give FPF a **typed, auditable** way to speak about the *health, maturity, and structure* of a scientific/engineering **discipline**, without collapsing into taste, anecdotes, or single-number scores. The pattern defines a **portable set of Characteristics** and guards (legality, freshness, scope) that any Context can specialize.

*This pattern supplies the CHR “vocabulary of health” for disciplines. C.20 composes the discipline; C.21 measures its health; Part G (G.2, G.12) harvests SoTA and operationalizes dashboards; Bridges keep meaning honest; penalties touch **R** only.*

 **Status & placement.** Part C (Kernel Extention Specifications) → Cluster C.I (Core CHRs/CALs). 
  **Depends on:** **MM-CHR** (C.16), **KD-CAL** (C.2), **USM/Scope** (A.2.6), **Trust & Assurance** (B.3), **E.10 (LEX‑BUNDLE)**. 
  **Coordinates with:** **C.20 Discipline‑CAL** (what a `U.Discipline` is), **G.2** (SoTA palette), **G.12** (dashboard), **G.0** (CG‑Spec registry).

### Problem Frame

FPF treats *disciplines* as first-class holons (see **C.20**): they aggregate epistemes, practices, standards, institutions, and observed Work. Teams routinely say “the field is fragmented,” “standards are converging,” or “replication is improving,” but these claims are rarely **typed** (scale/unit/polarity) or **auditable** (evidence lanes, freshness, scope). C.21 supplies the CHR layer—named Characteristics with CSLC typing—so disciplines can be compared lawfully (CG‑Spec) and monitored through time (G.12).  Each published value MUST declare ReferencePlane ∈ {world|concept|episteme} and DisciplineId (U.Discipline@UTS); cross‑plane use applies CL^plane in Assurance (penalty to R_eff only).
### Problem

Narrative health claims cause three recurrent failure modes:

1. **Illegality.** Averaging ordinals, mixing units, or comparing incommensurate Contexts ⇒ nonsense roll-ups.
2. **Staleness.** Health “scores” rarely declare **freshness windows** or evidence lanes (TA/VA/LA).
3. **Scope slippage.** “The field” is left implicit; cross-Context reuse lacks **Bridges & CL**, leading to silent semantic loss. Any numeric comparison/aggregation MUST cite a **CG‑Spec** row (characteristics, lawful **ScaleComplianceProfile (SCP)**, **Γ‑fold**, MinimalEvidence) before computation.
### Forces

| Force                            | Tension                                                                                                                    |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Comparability vs nuance**      | Need global pictures without erasing local meaning (Context, traditions, cohorts).                                         |
| **Ordinal vs interval/ratio**    | Powerful stats tempt illegal ops on ranks and categories.                                                                  |
| **Local evidence vs federation** | Health must be computed *in room* (Context slice) yet projectable across rooms via Bridges & CL (penalties to **R** only). |
| **Recency vs stability**         | Health evolves; dashboards must reflect **freshness**, not just cumulative history.                                        |
### Solution — Discipline Health Characterisation (DHC)

#### Ontology quick sheet (normative, clarifying)

**What “DHC” is.** DHC is a **CHR vocabulary pack** (intensional) that defines **Characteristics** + **Scales/Units/Polarity** for discipline health; it is not a document or a run.
**Artifacts.**
• **`U.DHCPack`** (I‑layer name; published as an episteme): the **slot set** (Characteristic/Scale declarations) for a Context.  
• **`U.DHCMethodSpec`** (S‑layer): the **computational specification(s)** for deriving each DHC slot (e.g., replication‑window definition, CD‑index class), table‑backed; multiple per slot allowed, editioned separately.  
• **`U.DHCSeries`** (episteme w/ `EditionSeries`): a **time‑indexed publication** of computed DHC readings for a Discipline×Context, each value bound to `…Ref.edition` for every referenced method/metric/distance.
**Edition subjects.**  
(i) **DHCPack.edition** — when the **slot semantics** (Characteristic/Scale) change.  
(ii) **DHCMethodSpecRef.edition** — when a **computation method** (formula/class/policy) changes.  
(iii) **DHCSeries.edition** — when the **published series** changes its content (not carriers).  
**Publication.** Releases are **Work** on Carriers; **no** edition change unless content changes per `U.EditionSeries`.  
**Ref discipline.** All bindings to packs/methods/distances **SHALL** use `…Ref.edition` (dot on the Ref).

Define a **portable minimal set** of CHR **slots**. Each slot is **CHR-typed** (Characteristic, Scale/Unit/Polarity per **A.17–A.18**), **Context-local**, and guarded by **USM** (Claim scope **G**), **freshness windows**, and **evidence lanes** (TA/VA/LA).  Contexts MAY extend the set; MUST NOT alter scale types illegally. 

**“Health” is a vector** of CHR‑typed coordinates; **no single scalar** is implied. Lawful scalarization lives in **Acceptance** (G.4) under an explicit **CG‑Spec ScaleComplianceProfile (SCP)** and **Γ‑fold** rules, and is never embedded in CHR.
#### Core Characteristics (kernel-portable names)

1. **ReproducibilityRate** *(ratio ∈ [0,1]; polarity ↑; ReferencePlane=episteme; CG‑Spec‑bound)*
   Fraction of tested claims/benchmarks that independent teams **replicate** under a declared **ContextSlice** and **Γ\_time** window. **Lane tags:** LA (validation) with TA (typing) for protocols.

2. **StandardisationLevel** *(ordinal; polarity ↑; ReferencePlane=episteme)*
   {none, *emerging*, *de facto*, *de jure*}. **No mean.** Use medoid/mode; legal comparisons are ≤/=/> only. Tracks convergence on vocabularies, interfaces, or procedures.

3. **AlignmentDensity** *(ratio; polarity ↑; ReferencePlane=episteme; CG‑Spec‑bound)*  
   Density of **Substitution Bridges** (same **senseFamily**, CL≥2) between major `U.Tradition`s **per 100 DHC‑SenseCells** (G.2 F‑hooks) in the SoTA palette.  Substitution rule:  free substitution permitted at **CL=3**; at **CL=2** substitute only with extra‑guard (count in reporting, but this is not «free substitution») Units: `bridges_per_100_cells`. Cross‑Context use requires Bridge+CL; penalties → **R_eff** only.

 4. **DisruptionBalance** *(interval; polarity = target band; ReferencePlane=episteme; CG‑Spec‑bound)*  
  Relative share of **disruptive vs consolidating** works within **Γ_time** using a **registered CD‑index class** (editioned; cite **method id** in UTS). **Default plane:** *episteme*. Publish the **target band** via **Acceptance (G.4)**; not in CHR.
   
  5. **EvidenceGranularity** *(Context-declared: ordinal|ratio; polarity ↑; ReferencePlane=episteme)*  
   If ratio: units = `claims_per_artifact` or `anchors_per_claim` (declare). If ordinal: publish level names and **ORD_COMPARE_ONLY**.
   Fineness of evidential units and declared envelopes (experiment cards, benchmark tasks, audit granules). Encourages *smaller, well-scoped* claims over monoliths.

  6. **MetaDiversity** *(portfolio dispersion; polarity ↑ to band; ReferencePlane=episteme; CG‑Spec‑bound)*  
  Use entropy/HHI **over MethodFamily/Tradition shares** (method edition id in UTS); publish **guard‑band** as **Acceptance** binding; cross‑ordinal scalarisation is forbidden.
  Entropy/Herfindahl-type dispersion across `U.Tradition`s, method families, or data regimes, bounded by a **Context-declared guard-band** (too low ⇒ monoculture; too high ⇒ incoherence).

> **Typing & legality.** Each slot **MUST** declare **Scale/Unit/Polarity**; illegal ops (e.g., mean on ordinals; unit mixing) are **fail-fast** per **A.18/MM-CHR**.
#### Guard Macros (normative)

* **ORD\_COMPARE\_ONLY(x)** — for **StandardisationLevel** (ordinal).
* **UNIT\_CHECK(x)** — forbid cross-unit aggregation (AlignmentDensity, ReproducibilityRate).
* **POLARITY_CHECK(x)** — enforce declared polarity (↑/↓/target-band) per MM‑CHR.
* **FRESHNESS(x; window)** — ensure values come from evidence within declared **Γ_time**; record **valid_until**; stale ⇒ {degrade|abstain} at Acceptance.
* **PLANE_NOTE(x)** — record **ReferencePlane**; compute **CL^plane** on crossings; penalties → **R_eff** only.
* **LANE\_TAGS(x; {TA|VA|LA})** — annotate contribution lanes.
* **SCOPE\_COVERS(x; TargetSlice)** — enforce **USM** coverage of the computation.
* **BRIDGE_CL(x; id, CL≥k)** — on cross‑Context roll‑ups, require **Bridge** with **CL**; penalties route to **R** only. If planes differ, apply **CL^plane** and cite **Φ_plane** policy id. **Hint:** for **AlignmentDensity** reporting, set **k=2** (CL≥2); **CL=3** counts as *free substitution*.
#### Legality Matrix (extract)

| Operation     | ReproducibilityRate (ratio) | StandardisationLevel (ordinal) | AlignmentDensity (ratio) | DisruptionBalance (interval) |
| ------------- | --------------------------: | -----------------------------: | -----------------------: | ---------------------------: |
| mean          |                      **OK** |                     **FORBID** |                   **OK** |                       **OK** |
| median        |                          OK |                         **OK** |                       OK |                           OK |
| compare (<,>) |                          OK |                         **OK** |                       OK |                           OK |
| unit mix      |                  **FORBID** |                            n/a |               **FORBID** |                          n/a |

*Note:* For **MetaDiversity/EvidenceGranularity (ordinal)** use **median/mode**; forbid affine ops; unit mix always fails.
### Interfaces & Data Paths

* **Inputs.** `U.Discipline` from **C.20** (composition), SoTA **Palette**/**BridgeMatrix** from **G.2** (**DHC‑SenseCells** included), EvidenceProfiles from **G.4/G.6**.
* **Outputs.** Per‑Context **DHC rows** (these six slots), **UTS** Name Cards with twin labels (E.5/F.17–F.18), **Registry/RSCR hooks** on method edition changes; feeds **G.12** (time‑series).
* **Cross-Context reuse.** Only via **F.9 Bridges** with **CL** and **loss notes**; **Φ(CL)** penalties applied to **R** (never F/G).
### Archetypal Grounding (three fields)

#### Computer Vision (Benchmarks 2015→)

* **ReproducibilityRate.** Ratio of independently reproduced results on ImageNet-style tasks within **rolling 24 mo** (LA lane).
* **StandardisationLevel.** *de facto* for dataset specs and metrics in *Vision\_2024*; *emerging* for robustness protocols.
* **DisruptionBalance.** Use an editioned CD‑index class (e.g., Wu‑style disruption family) with method id; publish target band via Acceptance; annotate ReferencePlane=episteme.
* **AlignmentDensity.** Bridges with **CL≥2** across sub-traditions (supervised vs self-supervised).
* **MetaDiversity.** Entropy across method families (CNN/ViT/Hybrid) kept within guard-band to avoid monoculture.
#### Biomedicine (Gene–Disease Associations)

* **ReproducibilityRate.** Fraction of associations replicated in independent cohorts within **Γ\_time(36 mo)**; LA lane with TA (typing of protocols).
* **StandardisationLevel.** *de jure* for certain reporting guidelines; *emerging* for pre-registration norms.
* **EvidenceGranularity.** Move from “paper-level” to *claim-level* units (Context raises the score).
* **DisruptionBalance.** Target band discourages sustained “novelty spikes” unbacked by replication.
#### Software Performance Engineering (SPE)

* **StandardisationLevel.** *emerging* → *de facto* for SLO taxonomies and trace schemas across vendors.
* **AlignmentDensity.** CL-rated Bridges between tracing ecosystems.
* **ReproducibilityRate.** Share of publicly replicable perf claims in rolling windows.
* **MetaDiversity.** Balance across load models, failure modes, and toolchains.
#### Decision‑Making (2015→)

• ReproducibilityRate — share of causal effect estimates replicated across independent datasets within Γ_time; LA lane.
• StandardisationLevel — *emerging* for identification checklists; *de facto* for SCM notation in leading stacks (ordinal; no means).
• AlignmentDensity — CL‑rated Bridges between SCM/DoWhy‑style and RL/BO traditions per 100 DHC‑SenseCells.
• MetaDiversity — dispersion across method families (SCM/RL/BO/DT) within guard‑band; entropy/HHI (units declared in CG‑Spec).
#### Evolutionary Architecture (software)

• ReproducibilityRate — fraction of architecture fitness results reproduced on independent workloads (rolling 18–24 mo; LA lane).
• StandardisationLevel — *de facto* for ADR/ATAM patterns; *emerging* for continuous fitness protocols.
• AlignmentDensity — Bridges across ATAM/SAAM/ADR style guides (CL≥2) normalised per 100 DHC‑SenseCells.
• MetaDiversity — portfolio dispersion across patterns (microservices, event‑driven, layered) with guard‑bands; no ordinal arithmetic.
### Measurement & Publication Procedure (authoring harness)

1. **Declare Context & TargetSlice.** (USM) Name editions, Standards, env params, `Γ_time`.
2. **Collect evidence.** Bind sources via **G.6 EvidenceGraph**; tag lanes and freshness.
3. **Compute DHC slots.** Enforce **Legality Matrix** and Guard Macros.
4. **Bridge (if needed).** Map via **F.9**; attach **CL** and **loss notes**; apply **R** penalties.
5. **Publish to UTS.** Name Cards (Tech/Plain), twin labels; **bind `DHCMethodSpecRef.edition`**, `DistanceDefRef.edition`, and, where templates are used, `DHCMethodRef.edition`; register RSCR triggers (method change, ScoringMethod/NormalizationMethod edits).
6. **Dashboard.** Feed G.12 with time-series and guard-bands (disruption, diversity).
### Bias-Annotation (E-cluster lenses)

* **Didactic.** Plain names + twin labels; one-screen tables for managers.
* **Architectural.** No ordinals averaged; all cross-Context movement goes through Bridges+CL; penalties never touch F/G.
* **Pragmatic.** Freshness-aware; unknowns tri-state; values are decision-support, not trophies.
* **Epistemic.** Evidence lanes explicit; reproducibility is LA, typing is TA; validation distinct from verification in dashboards.
### Conformance Checklist (normative)

**CC-C.21-1 (CHR typing).** Every DHC slot **MUST** declare **Characteristic + Scale/Unit/Polarity**, with CSLC legality proved before any aggregation.
**CC-C.21-2 (Freshness).** Published values MUST carry Γ_time selector and freshness window; stale rows escalate to {degrade|abstain} in **G.4 Acceptance**.
**CC-C.21-3 (Plane).** ReferencePlane declared; cross‑plane re‑use publishes **CL^plane** (policy id) alongside CL; both penalties route to **R_eff**.
**CC‑C.21‑4 (DesignRunTag).** Every DHC row SHALL declare **DesignRunTag ∈ {design, run}**; design‑ and run‑characteristics **not mixing** in one value/aggregate.
**CC-C.21-5 (Lane tags).** Each value **MUST** tag **TA/VA/LA** lanes of contributing evidence.
**CC-C.21-6 (Ordinal discipline).** **StandardisationLevel** is ordinal; **no means**, **no z-scores**.
**CC-C.21-7 (Scope).** All computations declare **TargetSlice**; **USM** membership is decidable and deterministic.
**CC-C.21-8 (Bridges).** Cross-Context comparisons/publishers **MUST** cite **Bridge id + CL**; penalties route to **R\_eff**, never to F/G.
**CC-C.21-9 (UTS).** Publish DHC rows as **UTS Name Cards** with **twin labels** (Tech/Plain).
**CC‑C.21‑10 (Registry).** DHC methods are table-backed; silent method changes are forbidden (**bump `DHCMethodSpecRef.edition` + RSCR trigger**). 
**CC-C.21-11 (Unknowns).** Unknown inputs propagate tri-state {pass|degrade|abstain} to Acceptance; **no `unknown→0` coercion**.
**CC-C.21-12 (No tool/vendor tokens).** Core narrative follows **E.5.1** (Lexical Firewall).
**CC-C.21-13 (CG‑Spec citation).** Any numeric operation (comparison/aggregation) in DHC **MUST** refer to **CG‑Spec** (characteristics, **ScaleComplianceProfile (SCP)**, **Γ‑fold**, MinimalEvidence).
**CC-C.21-14 (Φ‑policies).** **Φ(CL)** and **Φ_plane** — **monotone** and **table‑backed**; published by policy id.
**CC‑C.21‑15 (Ref discipline).** Any edition pinning **SHALL** appear as `…Ref.edition` on the relevant reference field (DHCPack/MethodSpec/DistanceDef/DHCMethodRef); bare `…Edition` fields are non‑conformant.
**CC‑C.21‑16 (Role kit, informative).** Use standard roles from F.4: `DisciplineStewardRole` (governs DHCPack), `DHCMethodAuthorRole`, `DHCSeriesPublisherRole`. Roles are **design‑time**; values are **run‑ or design‑stance** per slot and must declare **ReferencePlane**.
### Consequences

**Benefits.** Lawful comparisons; freshness-aware governance; explicit cross-tradition alignment; dashboards that don’t lie by averaging ranks.
**Costs.** Some ceremony (scales, windows, lanes, bridges), offset by template macros and UTS automation.
**Risks avoided.** “Phlogiston disciplines” (charisma-driven fields) fail DHC audits; **No-Free-Lunch** preserved by G.5 (selector returns sets, not universal scalars).
### Rationale (post-2015 signals & practice)

* **Replication & credibility (2015→).** Field-level health in SciSci emphasizes **replicability**, *fresh* evidence windows, and claim-level units—captured by **ReproducibilityRate** and **EvidenceGranularity**.
* **Disruption vs consolidation (2019→).** Empirical “disruption indices” distinguish papers that open new lines from those that refine—hence **DisruptionBalance** with *target bands*, not monotone “more is better.”
* **Standardization waves (2016→).** Package/ecosystem norms show ordinal trajectories (none→emerging→de facto→de jure); **ordinal typing** prevents illegal arithmetic.
* **Plural traditions (ongoing).** Mature fields maintain **bridges** with explicit **loss notes**; **AlignmentDensity** rewards CL-rated bridges without semantic collapse.

*(Names are illustrative of contemporary practice; the CHR is notation-agnostic and tool-neutral.)*
### Relations

* **Builds on:** **A.17–A.18** (Characteristic/CSLC), **A.2.6** (USM scopes), **B.3** (assurance lanes), **C.16** (MM-CHR templates).
* **Coordinates with:** **C.20** (what a `U.Discipline` *is*), **G.2** (SoTA palette and BridgeMatrix), **G.12** (Dashboard operationalization), **G.9** (parity harness for fair comparisons).
* **Constrains:** **G.10** (pack ships DHC rows + method ids), **G.11** (refresh windows/decay), **G.5** (selector may reference DHC only via admissible predicates; no cross‑ordinal scalarisation). **Coordinates:** **F.9** (Bridges for cross‑Tradition comparisons).
### Annex — Author’s quick template (copy-paste)

```
C.21.DHC(Context: <name/edition>; TargetSlice: <tuple>; Γ_time: <policy>)
  ReproducibilityRate:
    value: <0..1>   lane: LA   window: <…>   scope: <…>
  StandardisationLevel:
    value: {none|emerging|de_facto|de_jure}   compare_only: true
  AlignmentDensity:
    value: <ratio>   units: bridges_per_100_DHC_SenseCells   CL_min: 2   scope: <…>
  DisruptionBalance:
    value: <−1..1>   method: <CD-index class / edition>   target_band: [l,u]
  EvidenceGranularity:
    value: <ordinal|ratio per Context>   notes: <…>
  MetaDiversity:
    value: <entropy/HHI>   target_band: [l,u]
Guards: ORD_COMPARE_ONLY(StandardisationLevel), UNIT_CHECK(*), FRESHNESS(*), LANE_TAGS, SCOPE_COVERS, BRIDGE_CL(if x-Context)
Publish: UTS twin labels; RSCR triggers on method edition change.
```
### C.21:End
## Problem Typing & TaskSignature Assignment (Problem-CHR)

**Purpose.** Give FPF a **lawful, minimal, and portable** way to speak about “the problem we face” so that the **selector** (G.5) can legally admit/abstain without prose or guesswork. We do this by (i) **typing problems** with CHR‑grounded traits and (ii) **attaching** them to a **TaskSignature (S2)** record that downstream patterns can consume. The Standard is **Context‑local**, evidence‑anchored, tri‑state‑aware, and bridge‑savvy. TaskSignature is *minimal* but sufficient for **eligibility**, **acceptance**, and **policy‑governed** choice.

**Status & placement.** Part C (Kernel Extentions Specifications) → Cluster C.I (Core CHRs/CALs).
**Depends on:** **C.16 MM‑CHR** (measurement legality), **G.5** (selector S2/S3), **G.0** (CG‑Spec invariants).
**Coordinates with:** **G.4** (Acceptance/Evidence profiles), **C.23** (MethodFamily admissibility & maturity), **C.18 NQD‑CAL** (QD/illumination), **C.19 E/E‑LOG** (emitters/policies), **E.10** (LEX).

### Intent

Operationalise No‑Free‑Lunch discipline in selection by ensuring every run‑time decision sees a **typed TaskSignature (S2)**, not a paragraph, and that **“problem”** (method unknown) is cleanly separated from **“task”** (method known; signature bound). The signature is the **smallest CHR‑typed set** sufficient to drive **Eligibility → Acceptance → policy‑governed selection** without illegal arithmetic or silent coercions; crossings are auditable (Bridge+CL → **R_eff only**).

#### Term split used in this pattern

- `TaskSignature` attachment means attaching one typed problem record to one declared task family or work target; it does **not** pre-bind a method.
- `ScopeSlice(G)` means the claim-bounding scope cut over `describedEntity/scope`; it is not an evidence-path slice and not a baseline-set slice.
- `threshold` is not one undifferentiated family here:
  - articulation and closure thresholds stay with cue/prompt owners such as `B.4.1` and `B.5.2.0`
  - acceptance-gate thresholds stay with `G.4`
  - the work-measure threshold target used in specialization claims is only the declared success mark for the current task family or work target
### Problem Frame (design/run split; crossing-visible)

**method‑first stance**
In FPF a **Problem** exists when a Holder or external **Transformer** cannot cite a known **Method** (or specialisation thereof) that satisfies the current **TaskSignature** under the declared **ScopeSlice(G)**. Problem‑solving therefore entails **strategizing** (selecting or synthesising a method). The resulting **strategy/policy** is a composition under **G.5/E/E‑LOG** and **is not** a new kernel type.  
**Unknown‑first discipline.** Author S2 with `unknown` traits rather than coercions; **SoS‑LOG** branches MUST specify `{admit|degrade|abstain|sandbox}` handling for `unknown` via closed enums registered at UTS.

Un‑typed "problems" collapse into **informal prose**; selectors cannot **filter/abstain** lawfully; acceptance-gate thresholds leak into scoring; cross‑Context reuse is by name, not Bridge. We need a Context‑local descriptor that (i) obeys **MM‑CHR legality** (Scale/Unit/Polarity proven before any aggregation), (ii) records **Assurance lanes (TA/VA/LA)** per **A.10** and **ReferencePlane**, (iii) carries **tri‑state unknowns** explicitly, and (iv) **publishes crossing attestations** (**BridgeCard + UTS row**) with **Φ(CL)/Φ_plane** policy‑ids.
### Problem

Without typed descriptors, **Eligibility/Acceptance** degenerate into prose; **illegal ops** creep in (ordinal means; unit mixing); **cross‑plane comparisons** lose **CL/Φ** routing (**penalties to R_eff only**).
### Forces

| Force                        | Tension                                                                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Parsimony vs sufficiency** | Fewer fields to avoid ceremony **vs** enough to drive lawful gating.                                                              |
| **Unknowns**                 | Many traits are **unknown** at intake → tri‑state semantics must propagate to Acceptance without silent coercions.                |
| **CHR legality**             | **No mean on ordinals; no unit mixing**; polarity & scale type must be declared *before* aggregation.                             |
| **Locality vs portability**  | Problem is **in‑room**; still must cross **via Bridges**, with **CL** and (if planes differ) **CL^plane** penalties → **R** only. |
### Solution — Problem‑CHR (fields) + TaskSignature (S2) attachment (normative)

#### Minimal CHR fields (tri‑state aware).

Each field is **CHR‑typed** (Characteristic/Scale/Unit/Polarity; MM‑CHR discipline). Every predicate admits `unknown` (tri‑state). Unknowns must propagate to {degrade|abstain|sandbox} per Acceptance/EvidenceProfile policy (recorded in SCR). (G.4/G.6 alignment)

* **`DataShape`** — data regime & admissible transforms (e.g., tabular, sequence, graph; density; stationarity claims).
* **`NoiseModel`** — uncertainty class / robustness envelope (e.g., iid Gaussian; heavy‑tailed; adversarial budget).
* **`ObjectiveProfile`** — objective heads (**Scale/Unit/Polarity** and **ReferencePlane** declared), polarity, and **lawful orders** (lexicographic, Pareto, medoid/median where legal). **Weighted sums across mixed scale types are forbidden**; ordinal heads use order‑only guards. For QD tasks, explicitly enumerate **Q (quality)**, **D (diversity)**, and **QD‑score** heads; see **DominanceRegime** below.
* `RegularityTraits` — method‑relevant structure (**convexity/differentiability/separability/monotonicity**) as CHR‑typed predicates with guard‑macros (e.g., `ORD_COMPARE_ONLY`, `UNIT_CHECK`, `POLARITY_CHECK`). Include `ConditionClass` (e.g., stiffness/κ‑proxies) where applicable.
* **`Constraints`** — explicit hard/soft constraint classes (feasibility predicates; **ResourceEnvelope**/**RiskEnvelope**). **Acceptance-gate thresholds live in `G.4` only; never inside CHR or code paths.**
* **`ShiftClass/Stationarity`** — CHR‑typed claims about regime stability (iid | covariate‑shift | concept‑drift | adversarial). Default=`unknown`. Acceptance/Flows MUST honor this in gating or abstain.
* `EvidenceGraphRef (A.10)` — carriers & **lane tags (TA/VA/LA)** with **freshness windows**; **no self‑evidence**; default Γ‑fold = **weakest‑link** unless CAL proves an alternative.
* `ScopeSlice(G)` — the **USM claim-bounding scope cut** over **describedEntity/scope** (discipline governance in **CG‑Spec**; Domain is a catalog mark only).
* `Size/Scale` — size/condition proxies (**n, m, κ, sparsity**) with **declared units**; unit mismatch ⇒ {sandbox|refuse}.
* **`Freshness`** — validity window for descriptors.
* `Missingness` — **MCAR/MAR/MNAR** (or mapped equivalents) per **CHR.Missingness**; MUST be honoured by Acceptance/Flows.
* `KindSet` — **`U.Kind[]`** of objects‑of‑talk addressed by the TaskKind; separates **describedEntity (Kind)** from **Scope (USM)**.

**QD / Illumination extensions (normative; ties to C.18/C.19).**
* **`CharacteristicSpaceRef`** — reference to **`U.CharacteristicSpace`**, with declared **d≥2**; **characteristics are CHR‑typed**; **ReferencePlane** per characteristic; pin edition via **`CharacteristicSpaceRef.edition`**.
* **`ArchiveConfig`** — archive **topology** (grid/CVT/graph), **resolution** (bins/centroids), **K‑capacity**, **`InsertionPolicyRef`** (elite replacement/dedup/novelty), and **`DistanceDefRef.edition`** (declare **metric/pseudometric** status and invariances; any normalisation **MUST** cite lawful scale transforms in **CG‑Spec**); legality follows CG‑Spec.
* **`EmitterPolicyRef`** — pointer to emitter/governor policy (C.19) applicable to this TaskSignature; **edition id** recorded.
* **`DominanceRegime`** — `{ParetoOnly | ParetoPlusIllumination}`. **Default = `ParetoOnly`** (illumination remains report‑only telemetry unless CAL explicitly authorises `ParetoPlusIllumination`, policy‑id cited).
* **`IlluminationSummary`** — a **telemetry summary over `Diversity_P`**; **published** by default; excluded from dominance unless a CAL enables `ParetoPlusIllumination` (policy‑id cited).
* **`IlluminationMap`** *(parity‑run)* — required **publication artefact** (grid/CVT/graph per `ArchiveConfig`) recording coverage per niche/cell with `DescriptorMapRef`/`DistanceDefRef.edition`. **Leaderboards as single‑score lists are forbidden**; comparisons **MUST** be under CG‑frames.
* **`PortfolioMode`** — `{Pareto | Archive}`. **Default = `Archive`**: selectors **publish portfolios** (QD archives) rather than a single “best” set; ε‑fronts remain admissible for local decisions under CG‑Spec.
* **`Budgeting`** — evaluation/time/batch **budgets**, including **E/E‑LOG exploration budget** id; units declared (CG‑Spec).
* **`TelemetryHooks`** — **PathSliceId**, **decay/refresh policy ids**, and **edition counters** to record **U.DescriptorMap** and **policy‑id** updates upon illumination gains.
* **`GeneratorIntent`** (OEE) — optional intent to invoke a **`GeneratorFamily`** (G.5) with pointers to **`EnvironmentValidityRegion`**, **`TransferRulesRef`**, and **coverage/regret** reporting expectations.

**Legality.** Before any numeric comparison/aggregation, **prove CSLC legality** (Scale/Unit/Polarity) and **cite CG‑Spec.Characteristics**; publish **ReferencePlane**. **Unknowns** propagate as {degrade|abstain|sandbox}; **no `unknown→0/false` coercions**.
#### TaskSignature (S2) — attachment definition (design‑time + run‑time).

A TaskSignature is a minimal typed record the selector consumes:
`⟨Context, TaskKind, TaskFamilyRef?, KindSet:U.Kind[], DataShape, NoiseModel, ObjectiveProfile, Constraints{incl. Resource/Risk Envelopes}, ScopeSlice(G), EvidenceGraphRef, Size/Scale, Freshness, Missingness, ShiftClass?, BehaviorSpaceRef?, ArchiveConfig?, EmitterPolicyRef?, DominanceRegime?, PortfolioMode?, Budgeting?, TelemetryHooks?, GeneratorIntent?⟩`


**Minimality rule.** S2 carries only fields required for **Eligibility→Acceptance→lawful selection**; any additional traits derived at design‑time are published as provenance (UTS) but **do not expand S2**. 

Values are **CHR‑typed** with **provenance**; traits may be **inferred** from CHR/CAL bindings (e.g., *convexity known? differentiable? ordinal vs interval scales?*) and from **USM** scope metadata. Unknowns are tri‑state; **Missingness semantics MUST align with CHR.Missingness** and be honored by Acceptance/Flows. 

`TaskKind` names the governing kind of work or problem under this context. `TaskFamilyRef?` names one comparison-relevant family inside that task kind when specialization, transfer, or parity burden is live. `TaskSignature` is the context-bound typed attachment record for one current case under that kind and scope cut. `KindSet` continues to name the objects-of-talk governed by the task kind; it is not a substitute for the task family anchor.

**Design/Run hygiene.** Do not mix DesignRunTag in one signature; **publish GateCrossings** as **CrossingBundles** (**E.18**; Bridge+UTS **A.27**; BridgeCard **F.9**) when importing design‑time traits into run‑time.

##### Specialization-claim anchoring (normative)

Any claim that one holder, dyad, team, or explicitly scoped specialist portfolio acquired usable specialization **SHALL** anchor that claim to one declared `TaskFamilyRef` or `TaskSignature`, one named work-measure threshold target, an adaptation budget, and the freshness or provenance basis for reuse. A method may be selected, refined, or retired as part of that story, but the method is not the bearer of the specialization claim. The attached task-family record should stay rich enough for `C.22.1` adaptation signatures, `G.5` specialization profiles, and `G.9` adaptation parity to attach to the same task family and work target without reconstructing the claim from narrative prose.

Low-human-overlap or newly discovered task families remain admissible when those anchors are explicit by value.
#### Provenance & planes.

Record **Context**, **ReferencePlane** for each value; on any cross‑Context/plane reuse, attach BridgeDescription + UTS row, apply **CL** (and, if planes differ, **CL^plane**) penalties to **R_eff only**; both **Φ(CL)** and (if used) **Φ_plane** MUST be **monotone, bounded, and table‑backed**; **no “distance” language; penalties never mutate F/G.** Publish policy‑ids in SCR and cite Bridge ids on crossings.
#### Attachment & use.

* **Eligibility** gates read TaskSignature against each **MethodFamily.Eligibility** (C.23) and **CG‑Spec.MinimalEvidence** for referenced characteristics.
* **Acceptance** clauses (G.4) use these fields for **acceptance-gate threshold predicates** (acceptance-gate thresholds live in Acceptance only).
* **Selection kernel** (G.5.S3) applies a **lawful order** (often partial); **weighted sums across mixed scale types are forbidden**. If only a partial order remains, **return a Pareto (non‑dominated) set** with tie notes. If `PortfolioMode=Archive`, the selector **may** return a **QD archive** (per `ArchiveConfig`) **in addition to** or **instead of** a Pareto set. **Illumination** enters dominance **only** if `DominanceRegime=ParetoPlusIllumination` is **enabled by CAL** (policy id cited); otherwise, QD metrics are **reported** but **excluded** from dominance.
* When `GeneratorIntent` is present, G.5 may dispatch to a registered **`GeneratorFamily`** (POET‑class); the selection surface becomes **pairs** `{environment, method}`, with Environment guarded by **`EnvironmentValidityRegion`** and **`TransferRulesRef`** (C.23 wiring). Report **`IlluminationSummary`** as a **telemetry summary over `Diversity_P`** (report‑only by default) in telemetry; dominance remains unaffected unless policy changes as above.
#### Unknowns.

Every field supports `unknown`; downstream **degrade/abstain/sandbox** behavior is explicit per Acceptance/EvidenceProfile; no implicit coercions.
#### Publication.

Emit a **ProblemProfile** (…Description) that carries the bound TaskSignature, **UTS** Name Cards for any minted values (twin labels), and SCR‑visible provenance (A.10 anchors, lane tags, freshness, **ReferencePlane**). **Mark any vendor/tool examples as Plain‑register only (LEX V‑4); they are non‑normative.**
#### Open‑Ended tasks (GeneratorFamily) (normative).

If the problem requires **open‑ended generation** of tasks/environments, S2 **SHALL** include `GeneratorIntent` with pointers to **`EnvironmentValidityRegion`** (lawful support of generated environments), **`TransferRulesRef`** (cross‑environment transfer constraints), and **coverage/regret** telemetry expectations. Selector outputs are then portfolios over **{environment, method}**; **coverage/regret** are **telemetry metrics** (reported) and **IlluminationSummary** is a **telemetry summary** (reported), excluded from dominance unless a **CAL** policy promotes them (policy‑id recorded in SCR; see `DominanceRegime`). Edition increments of **CharacteristicSpaceRef.edition**/**DescriptorMapRef.edition**/**DistanceDefRef.edition** and (OEE) **`TransferRulesRef.edition`**, and the **policy‑id** that caused illumination increases **SHALL** be recorded in SCR.
### Archetypal Grounding (Tell–Show–Show)

*Tell–Show–Show hook (per E.8):* label examples as **Show‑1 (continuous ODE)** and **Show‑2 (MIP)** and cite CHR guard‑macros in‑line so engineers can see **which field drove which gate**.  **Explicitly annotate which S2 fields triggered each Eligibility/Acceptance decision** (e.g., `service_level@ordinal → ORD_COMPARE_ONLY`, `budget@ratio → unit alignment check`).

**A. Differential equations (continuous systems, solver choice).**
*ProblemProfile.* `DataShape=ODE, stiff?=unknown, Size/Scale={n≈10^3}, ObjectiveProfile={↓error@ratio, ↑throughput@ratio}, Constraints={budget≤X, safety_gate@ordinal}, RegularityTraits={Lipschitz known?=unknown, Jacobian sparsity=high}, Missingness=MAR`.
*Attachment.* Selector reads TaskSignature; **eligibility** filters MethodFamilies that require known stiffness or differentiability (unknown ⇒ **degrade/abstain** per family); **Acceptance** enforces `safety_gate` as **ordinal predicate**, not averaged (ORD\_COMPARE\_ONLY), and budgets with **unit‑aligned sums** (ratio). The selector returns a **Pareto set**; no cross‑ordinal weighting.

**B. Mixed‑integer optimisation (planning/scheduling).**
*ProblemProfile.* `DataShape=MIP, NoiseModel=deterministic, ObjectiveProfile={↓cost@ratio, ↑service_level@ordinal}, Constraints={SLA hard, workforce soft}, RegularityTraits={convex_relaxation=available}, Size/Scale={vars~10^5}, Missingness=MCAR`.
*Attachment.* **CG‑Spec** forbids means over **service\_level** (ordinal); **Acceptance** holds acceptance-gate thresholds; **Eligibility** checks convex‑relaxation availability; **Selection** applies **lexicographic** guard (assumption‑fit ≻ evidence‑fit ≻ resource), compute **R\_eff** with Γ‑fold, route **CL** to **R** only; if partial order remains, return a **Pareto set**.

> *Contemporary anchors (informative):* modern **Julia** ecosystems illustrate the “**general call outside, specialised implementations inside**” ethos (e.g., DifferentialEquations.jl, JuMP), aligning with C.22→G.5 multi‑method dispatch under NFL.

**C. Quality‑Diversity portfolio (illumination).**
*ProblemProfile.* `DataShape=policy‑search; ObjectiveProfile={↑reward@ratio, ↑coverage@ratio (report‑only)}, DominanceRegime=ParetoOnly, PortfolioMode=Archive, CharacteristicSpaceRef(d=3, characteristics=CHR‑typed), ArchiveConfig(grid, res=32×32×16, K=1, InsertionPolicyRef=elite‑replace, DistanceDefRef.edition=v1), EmitterPolicyRef=v2, Budgeting{eval=1e6}, TelemetryHooks{PathSliceId=…}`.
*Binding.* Selector may return an **archive**; **coverage/illumination** are **reported** but **excluded** from dominance (default). Any change of `DistanceDefRef.edition`/Emitter policy is **editioned** and logged in SCR.

**D. Open‑ended environment generation (POET‑class).**
*ProblemProfile.* `GeneratorIntent{GeneratorFamilyRef=…, EnvironmentValidityRegion=… (CHR‑typed), TransferRulesRef=…, CoverageMetric=…}`, `PortfolioMode=Archive`.
*Binding.* Selector outputs **{environment, method}** pairs that pass Eligibility; **TransferRules** govern cross‑environment policy reuse; telemetry reports **coverage/regret** and **IlluminationSummary** with **edition/policy‑id** when improved.
### Bias‑Annotation (LEX/discipline guards)

* **No minted “Strategy” head.** “Strategy/policy” are *roles/lenses* inside G.5; do **not** introduce a new `U.Type` “Strategy”.
* **No minted `U.Type` “Strategy”.** Strategy/policy are roles/lenses inside G.5 Compose under E/E‑LOG; keep “strategy” as Plain where pedagogically needed.
* **Transdiscipline vs domain.** Comparability flows through **`U.Discipline` CG‑Spec**; “Domain” is a catalog mark stitched to D.CTX + UTS; do **not** attach norms to Domain labels.
* **Plain twins & head‑anchoring.** Use Description/Spec morphology correctly (I/D/S; E.10.D2).
### Anti‑patterns (normative):

* **AP‑1** Pre‑binding a Method into S2 (“problem as if task”); **Remedy:** keep S2 method‑agnostic; bind only lawful traits.
* **AP‑2** Silent `unknown→false/0` in Eligibility/Acceptance.  
* **AP‑3** Cross‑ordinal averaging / ordinal–interval scalar mixes.  
* **AP‑4** **Design/run chimera** signatures (mixing stances).  
* **AP‑5** **Domain** treated as governance (attach governance to **U.Discipline/CG‑Spec**, not Domain).  
* **AP‑6** Implicit handling of data‑shift (assume iid); **Remedy:** declare `ShiftClass` (or `unknown`) and gate via Acceptance.
* **AP‑7** Tool/vendor tokens in normative text; **Remedy:** move to Plain‑register note; keep Tech anchors on CHR/CAL ids (LEX V‑4).
**Remedies:** tri-state predicates; lawful orders (lexi/Pareto/median/medoid); **GateCrossing visibility** via Bridge+UTS+CL/CL^plane (penalties → R only); Domain stitched to **D.CTX + UTS** only.
**Remedies:** tri‑state predicates; lawful orders (lexi/Pareto/median/medoid); explicit **GateCrossing** publication via **CrossingBundle** (BridgeCard + UTS row + `CL/Φ` policy‑ids; **E.18/A.27/F.9**); Domain stitched to **D.CTX + UTS** only.
### Conformance Checklist (normative)

0. **Minimal S2.** S2 contains only fields necessary for Eligibility/Acceptance/selection; any extra derived traits remain provenance.
1. **TaskSignature present (S2).** All TaskKinds **publish** a TaskSignature with all fields declared and **CHR‑typed**; `unknown` supported for each.
2. **CHR legality proven.** Any numeric comparison/aggregation **cites CG‑Spec** by **Characteristic id** and proves **CSLC legality**; **no mean on ordinals; no unit mixing**.
3. **Unknowns propagate.** Unknowns **must** map to {pass|degrade|abstain} in **Acceptance**/**Eligibility**; no implicit coercions; behavior recorded in **SCR**.
4. **Evidence lanes.** **A.10 anchors** + **Assurance lanes (TA/VA/LA)** + **freshness windows** recorded; **Γ‑fold** default=weakest‑link unless proved otherwise.
5. **ReferencePlane guarded.**  ReferencePlane noted **per value and per ObjectiveProfile head**; on crossings apply **CL** (and **CL^plane** if planes differ); **Φ(CL)/Φ_plane** are **monotone, bounded, table‑backed and documented in the `CG‑Spec`**; penalties → **R_eff only** (F/G invariant).
6. **Acceptance thresholds live in CAL.** No acceptance-gate thresholds in CHR or code paths; only in **G.4 AcceptanceClauses**.
7. **Selector legality.** Selection uses **admissible (possibly partial) orders**; **weighted sums across mixed scale types are forbidden**; return a **Pareto set** when appropriate. 
8. **Crossings published (visibility).** Any cross-stance/cross-Context reuse emits **BridgeCard/BridgeDescription + UTS row** with CL notes and (if planes differ) CL^plane + Φ_plane.
9. **UTS twin labels.** All exported cards publish **Name Cards** with twin labels; Bridges carry loss notes. 
10. **GateCrossing checks.** Published TaskSignature and any referenced crossings satisfy: (i) stance tagging (if used; informative only), (ii) **CrossingBundle** presence/consistency (**E.18**; **A.27**; **F.9**), (iii) **LanePurity** (CL→R only; F/G invariant; Φ tables present), and (iv) **Lexical SD** (**E.10**). Failures are **blocking** under the active GateProfile / GateChecks (**A.21**).
11. **QD fields (when QD is in scope).** If `PortfolioMode=Archive` or QD heads are present, **CharacteristicSpaceRef** (d>=2), **ArchiveConfig** (topology, resolution, K, `InsertionPolicyRef`, `DistanceDefRef.edition`), and **EmitterPolicyRef** **SHALL** be present and CHR-typed; characteristics declare **ReferencePlane**.
12. **DominanceRegime default.** `DominanceRegime` **defaults to `ParetoOnly`**; inclusion of illumination in dominance **MUST** be enabled by a **CAL.Acceptance policy**; the policy id **SHALL** be published in SCR.
13. **Telemetry.** **PathSliceId**, **refresh/decay policies**, and **edition counters** for **CharacteristicSpaceRef**/**DistanceDefRef**/**EmitterPolicyRef** **SHALL** be recorded; any illumination increase **SHALL** log the **policy-id** that triggered it.
14. **GeneratorIntent (when OEE is in scope).** `GeneratorIntent` **SHALL** cite **`EnvironmentValidityRegion`** and **`TransferRulesRef`** (ids resolvable in G.5/C.23); absence => `Abstain` for OEE dispatch.
15. **Budgets.** `Budgeting` (eval/time/batch) **SHALL** declare units and E/E-LOG exploration budget id when used.
16. **Archive legality.** `DistanceDefRef.edition` and any novelty measures **SHALL** be CSLC-lawful and **editioned**; illegal ops => **Abstain**.
17. **Planes.** **ReferencePlane** **SHALL** be declared for all QD heads/axes; plane crossings apply **Phi\_plane** (penalty to **R** only).
18. **Unknowns.** Unknown QD fields **map** to `{degrade|abstain|sandbox}`; no coercions.

19. **Specialization claims anchored.** Any declared specialization on this TaskSignature **SHALL** name the task family/work target, named work-measure threshold target, adaptation budget, freshness or provenance basis for reuse, and enough attachment detail for `C.22.1`, `G.5`, and `G.9` to consume the same claim lawfully.
### Interfaces & Data Paths

*Inputs.* `ProblemProfile` (…Description), CG-Spec ids, Evidence Graph Ref (A.10), D.CTX; (if QD) CharacteristicSpaceRef/ArchiveConfig/EmitterPolicyRef configs; (if OEE) GeneratorIntent.
 *Produces.* `TaskSignature@Context` (S2) with provenance; **SCR-visible** fields; UTS Name Cards for any minted traits; (if QD/OEE) archive/portfolio semantics and telemetry hooks declared.
 *Consumed by.* **G.5** (Eligibility/Selection kernel), **G.4** (Acceptance/Evidence), **C.23** (admit/degrade/abstain rules; maturity ladder).
### Consequences (informative)

* **Lawful selection.** Dispatch is **explainable** and **audit-ready**; every reason in/out cites TaskSignature fields, CG-Spec rows, and Gamma-fold contributors. 
* **Local first, portable later.** Context-local semantics are primary; Bridges make portability **deliberate and costed** (penalties to **R** only). 
* **Frictionless downstream.** G.1-G.5 consume a **single, typed** Standard; thresholds are cleanly separated into **Acceptance**; unknowns are not guessed.
* **QD/OEE-ready.** Typed QD and GeneratorIntent fields make **portfolio** and **open-ended** workflows **first-class**, with lawful dominance, editioned distances, and policy-aware illumination.
### Relations

**Builds on:** **C.16 MM-CHR**, **G.0 CG-Spec**. **Coordinates with:** **G.4 Acceptance**, **G.5 Selector**, **C.18 NQD-CAL**, **C.19 E/E-LOG**, **C.23 Method-SoS-LOG**. **Constrained by:** **E.10 (LEX/I/D/S)**, **E.18 (GateCrossing visibility / publication gating)**.
### Practical reading checks

- If two candidate approaches are answering different `TaskKind`s or different `ScopeSlice(G)` cuts, this pattern does not yet license a direct comparison.
- If specialization is the live burden, the task-family anchor, threshold target, adaptation budget, and provenance basis should already be recoverable from the attached `TaskSignature`.
- If crossing, normalization, or missingness changes what comparison means, publish that in the signature and its cited refs rather than hiding it in code, local memory, or later prose.
- If `QD` or `OEE` heads are in scope, archive and generator fields belong in the same typed signature rather than in a detached explanatory appendix.
### Goldilocks hook (design‑time)

When generating candidate solutions for a **TaskKind**, target **“goldilocks”** slots (feasible‑but‑hard) so that the TaskSignature is informative (neither trivial nor impossible); this aligns with **G.1** (target goldilocks, abductive provenance) and ensures the **TaskSignature is informative** (neither trivial nor impossible) for **G.5** selection.
### C.22:End
## Task-family adaptation signature

**One-screen purpose (manager-first).**
Make a specialization claim publishable as one typed adaptation record over a declared `TaskFamilyRef` or `TaskSignature`, so later selector and parity work compares the same threshold target, budget burn, prior exposure, transfer, durability, downside, and corridor-entry burden rather than reconstructing that story from narrative prose.

**Builds on.** `C.22` (TaskSignature attachment and task-family anchoring), `C.19.1` (`BLP` compatibility), `A.15` (role/method/work split for scout/probe work), `C.24` (`CheckpointReturn` planning semantics), `E.16` (budget enforcement).
**Coordinates with.** `G.5` (selector specialization profiles), `G.9` (adaptation parity), `G.11` (later telemetry / refresh reuse).
**Keywords.** adaptation signature; task-family specialization; time-to-threshold; budget-to-threshold; prior exposure; corridor entry; stepping stone; transfer; retention; downside burden.

### Problem frame

Final task score alone does not tell whether a holder, dyad, or bounded specialist portfolio acquired usable specialization quickly, under what budget, with what prior exposure, whether the resulting competence transferred, or whether it entered a genuinely new solution corridor. If those elements are not published together, the adaptation claim splinters across task typing, probe notes, selector prose, and parity notes, and later readers can no longer tell what exactly was being compared.
### Problem

FPF needs one compact way to publish a bounded specialization claim on the same declared task family and work target without retyping the task anchor from `C.22` or silently pushing the adaptation burden into selector/parity prose.
### Use this when

- the governed claim is not only that a holder or dyad solved a task, but how fast it acquired usable specialization on a declared task family
- comparison must stay honest about the work-measure threshold target, prior exposure, adaptation budget, transfer burden, and reuse window
- movement into a new solution corridor or stepping-stone family is part of the real novelty burden
### What goes wrong if missed

- adaptation claims collapse into vague `got better` language with no declared work-measure threshold target or budget-to-threshold account
- parity later compares outcomes that were reached under different prior exposure, different work-measure threshold targets, or different reuse windows
- nonhuman or unfamiliar solution corridors are either romanticized as novelty or dismissed as noise because the corridor entry was never typed
### What this buys

- adaptation speed becomes reviewable by value on the same declared `TaskFamily` and work target
- later `G.5 / G.9` portfolio and parity work can compare the same specialization object instead of reconstructing it from narrative prose
- stepping-stone or solution-corridor movement becomes visible as one typed part of the adaptation claim rather than one afterthought
### Forces

| Force | Tension |
| :--- | :--- |
| Threshold crossing vs final score | A static outcome can look similar even when one system specialized much faster or more cheaply than another. |
| Local novelty vs reproducible evidence | Corridor-entry claims matter, but they are easy to over-romanticize when no baseline or entry evidence is published. |
| Task anchor vs adaptation burden | The section must keep the adaptation-signature burden readable without retyping task anchoring from `C.22` or turning selector/parity law into the same pattern. |
| Reuse upside vs specialization cost | Transfer, retention, and downside matter to the same claim even when the first threshold crossing looks impressive. |
### Solution — one adaptation signature over the C.22 anchor

- Use one shared adaptation-signature field set for this burden. `G.5`, `G.9`, and later notes may cite or consume it, but they should not silently rename threshold, prior-exposure, transfer, downside, or corridor-entry terms.
- When specialization is the governed burden, publish one adaptation signature bound to the declared `TaskFamilyRef` or `TaskSignature`, not one generic improvement claim.
- The signature should expose at least:
  - `thresholdTarget`
  - `timeToThreshold`
  - `budgetToThreshold`
  - `postThresholdEfficiency?`
  - `priorExposureDeclaration`
  - `transferTarget?`
  - `transferGain?`
  - `retentionWindow?`
  - `downsideBurden?`
  - `corridorEntryBaseline?`
  - `corridorEntryEvidence?`
  - `steppingStoneEvidence?`
- These fields stay anchored to the same work target and work-measure threshold semantics already declared by `C.22`, so adaptation is typed as movement toward usable specialization rather than as an ungrounded growth story.
- `C.22` continues to carry the declared task-family anchor, task typing, and baseline `TaskSignature`. `C.22.1` narrows the adaptation burden to threshold timing, reuse, downside, and corridor-entry disclosure over that existing anchor.
### Corridor, transfer, and durability discipline

- If the adaptation claim depends on entering a new solution corridor, publish the `corridorEntryBaseline` first: the prior repertoire, baseline set, or comparison family relative to which corridor entry is being claimed.
- Then publish the `corridorEntryEvidence` that marks real entry into that corridor rather than exotic accident, for example a reproducible solution class, a stable descriptor shift, or one explicit stepping-stone sequence.
- If a stepping stone mattered, publish the stepping-stone evidence as part of the adaptation signature rather than treating it as retrospective color.
- Corridor or stepping-stone notes do not replace the work-measure threshold account; they explain why the adaptation path matters, not whether the threshold was actually reached.
- A fast threshold result is not yet enough to claim durable specialization.
- If transfer to a neighboring task family is claimed, name the transfer target and the observed gain explicitly.
- If retention is claimed, name the reuse or retention window rather than letting durability hide inside one isolated run.
- If specialization harms neighboring task families, narrows reusable competence, or creates de-specialization cost, publish that in `downsideBurden?` rather than telling only the upside story.
- If post-threshold performance matters to later exploitation, publish `postThresholdEfficiency?` so the claim is not trapped at the threshold-crossing moment only.
### Worked moment

- Two agentic research setups both eventually reach an acceptable threshold on a new catalyst-search task family.
- One of them reaches threshold after a small probe budget, shows a declared transfer gain on one adjacent task family, and records that the winning path entered a previously unused solution corridor.
- The other reaches threshold only after much larger budget and without any reusable transfer.
- The adaptation signature makes that difference publishable without pretending that both runs express the same specialization story.
### Consequences

- Threshold speed, budget burn, prior exposure, and post-threshold efficiency become part of the same reviewable object instead of one after-the-fact prose explanation.
- Selector and parity surfaces can consume a stable upstream specialization object without minting shadow vocabularies.
- Corridor-entry and downside burdens stay visible in the same claim that celebrates the specialization gain, reducing romanticized novelty talk.
### Rationale

The reader needs one place where the adaptation claim stays whole. `C.22` keeps the task family and work target explicit. `A.15`, `C.24`, and `E.16` may generate the probe, checkpoint, and budget evidence. `G.5` and `G.9` later compare several candidates or parity runs. `C.22.1` keeps the specialization story readable across those surfaces by making threshold timing, reuse, downside, and corridor-entry burden recoverable in one short read instead of forcing the reader to reconstruct it from scattered notes.
### SoTA-Echoing

**Claim 1.** Current frontier adaptation work judges usable specialization by threshold-crossing under bounded resources, not by terminal score alone.

**Practice / source / alignment / adoption.** Contemporary frontier lines in refinement-heavy `QD`, self-play/task-discovery, and agentic adaptation repeatedly separate threshold target, budget burn, transfer, and reuse burden from one final benchmark score. This pattern **adopts** that practical burden, **adapts** it through one `TaskFamilyRef` or `TaskSignature`-bound adaptation signature, and **rejects** generic `got better` narratives that leave threshold and budget semantics implicit.

**Claim 2.** Current open-ended exploration work treats corridor entry and stepping stones as evidence-bearing novelty signals rather than decorative commentary.

**Practice / source / alignment / adoption.** Contemporary `QD`/`OEE` and nonhuman-domain exploration lines distinguish real corridor entry from one exotic sample by asking for explicit baseline, stable descriptor shift, reproducible solution class, or an explicit stepping-stone trace. This pattern **adopts** explicit corridor baseline/evidence discipline, **adapts** it as declared adaptation-signature fields, and **rejects** novelty talk that names no baseline or evidence basis.

**Claim 3.** Current selector and parity practice needs one stable shared field set for specialization claims.

**Practice / source / alignment / adoption.** Current selector and parity surfaces stay reviewable only when compared candidates reuse the same published field set for threshold, prior exposure, transfer, retention, downside, and corridor-entry burden. This pattern **adopts** that reuse discipline, **adapts** it by publishing one stable adaptation-signature field set here, and **rejects** silent downstream field redefinition in `G.5` or `G.9`.

**Evidence-tier note.** Peer-reviewed frontier anchors carry the strongest support for threshold/budget/parity burdens, while fast-moving frontier lines remain explicit support for corridor-entry and open-ended exploration pressure rather than a flattened single evidence tier.
### Relations

**Builds on:** `C.22` TaskSignature anchoring, `C.19.1` `BLP` compatibility, `A.15` role/method/work separation, `C.24` scout/probe and `CheckpointReturn` semantics, `E.16` budget enforcement.
**Coordinates with:** `G.5` selector specialization profiles, `G.9` adaptation parity, `G.11` later telemetry/refresh reuse.
**Constrained by:** `E.10` lexical discipline and `E.19` pattern-quality review when this child section is newly landed or materially revised.
### Not this pattern when

- the burden is only to name the task family and work-measure threshold target, with no adaptation-speed or transfer claim at all; ordinary `C.22` anchoring is enough
- the live question is already selector or parity law across candidate portfolios; that belongs to `G.5 / G.9`
- the text cannot yet declare one work-measure threshold target, one prior-exposure stance, or one evidence basis for corridor entry
### Conformance checklist

- `CC-C22.1-1` An adaptation signature **SHALL** bind to one declared `TaskFamily` or `TaskSignature`, one work target, and one work-measure threshold target rather than one generic improvement story.
- `CC-C22.1-2` An adaptation signature **SHALL** publish `timeToThreshold`, `budgetToThreshold`, and `priorExposureDeclaration`; if threshold was not reached, the signature **SHALL** say so explicitly instead of implying success.
- `CC-C22.1-3` Any declared transfer, retention, post-threshold-efficiency, downside, corridor-entry, or stepping-stone claim **SHALL** be explicit by value with the target, baseline, or evidence basis named, not left as narrative garnish.
- `CC-C22.1-4` This pattern may refine specialization timing and reuse claims over the declared `C.22` anchor, but it **SHALL NOT** redefine acceptance-gate thresholds, task-family attachment, or selector/parity law owned elsewhere.
- `CC-C22.1-5` Downstream selector/parity surfaces **SHALL** cite or consume the same published adaptation-signature field set rather than silently redefining threshold, prior-exposure, transfer, retention, downside, or corridor-entry terms.
### C.22.1:End
## MethodFamily Evidence & Maturity (Method‑SoS‑LOG)

*LOG (logic) for deductive shells for admissibility*
*First use expansion:* **SoS‑LOG = Science‑of‑Science LOG** (LEX short‑form discipline applied).

**HomeContext.** For this pattern, *HomeContext* means the `U.BoundedContext` where a `MethodFamily` is registered (LEX D.CTX).

**Builds on.** **G.5** (MethodFamily registry/selector), **G.4** (Acceptance & EvidenceProfiles), **C.22** (TaskSignature S2), **C.18 NQD‑CAL** (QD/illumination), **C.19 E/E‑LOG** (emitters/policies), **B.3** (Assurance lanes & `R_eff`), **A.10** (Evidence Graph Ref), **E.10** (LEX), **E.18** (GateCrossing / CrossingBundle visibility). **Coordinates with.** **G.6** (EvidenceGraph), **G.8** (LOG bundling), **G.9** (Parity), **G.11** (Refresh).

### Problem frame

Families of methods compete inside a CG‑Frame. The selector (G.5) must **admit, degrade, or abstain** per family **without** universal scores, using **typed** problem descriptors and **auditable** evidence. Maturity of a family (how far it has travelled from “clever idea” to “run‑safe”) must be **visible to LOG** rules yet **separate from thresholds** (which live only in **AcceptanceClauses**, G.4).
### Problem

Unstructured “readiness” stories and undisciplined evidence lead to:

* (i) **Illicit scalarisation** across mixed scale types,
* (ii) **Prose‑only** gating that a dispatcher cannot execute,
* (iii) Cross‑Context reuse without Bridges/CL, and
* (iv) Immature families leaking into production.
  We need a **notation‑independent LOG layer** that turns **TaskSignature (S2)** + **EvidenceProfiles** into **executable rules** for *admit / degrade / abstain*, **routing any CL penalties to `R_eff` only** (never mutating **F/G**).
### Forces

* **Pluralism vs. dispatchability.** Competing Traditions expose different invariants; selection must compare **without semantic flattening**.
* **Maturity vs. opportunity.** Open‑ended exploration (E/E‑LOG) must coexist with **run‑safe** exploitation; *immature ≠ forbidden* → provide safe **degrade** paths.
* **Unknowns (tri‑state).** Missing or `unknown` S2 fields must propagate **explicitly** to *degrade/abstain/sandbox*; no silent coercions.
* **Lexical discipline.** Head‑anchoring, I/D/S separation, Bridge hygiene; **no tool names in Core**.
### Solution — Method‑SoS‑LOG: deductive shells over Eligibility & Evidence

#### Objects & heads (LEX/I‑D‑S)

*Tech heads; Plain twins are published via UTS.*
**`MethodFamily`** (registered in G.5) carries **Eligibility** and artefact identity; **`MaturityCard`** (this pattern) carries evidence‑aware maturity; **`SoS‑LOG.Rule`** (this pattern) is an executable rule schema that returns one of `{Admit | Degrade(mode) | Abstain}` for a `(TaskSignature, MethodFamily)` pair. Descriptions live as `…Description`; when harnessed they become `…Spec`.
#### Rule schema (normative)

For each `MethodFamily` **f**, author an **executable** rule set:

```
LOG.Deduce_f(TaskSignature S2) → {Admit | Degrade(mode) | Abstain}
```

with the following **branch obligations**:

**R0 — CG‑Spec gate (precondition, HomeContext).** Before R1–R3, verify **CG‑Spec.MinimalEvidence** for every CHR characteristic referenced by *f*’s Acceptance/Flows **in the home Context**; failure ⇒ `Abstain` with reasons (no silent sandbox). Publish the **CG‑Spec ids** consulted. 
*Rationale:* selector legality requires the CG‑Spec gate to be explicit, not implicit in prose. Publish associated **ReferencePlane** notes alongside the consulted ids.

**R0.QD — QD/OEE pre‑gates (if applicable).** If S2 declares **BehaviorSpaceRef/ArchiveConfig/EmitterPolicyRef** or `PortfolioMode=Archive`, verify:
(i) **CharacteristicSpaceRef** characteristics are CHR‑typed, d≥2, **ReferencePlane** per characteristic declared;
(ii) **ArchiveConfig** is lawful (topology, resolution, **K**>0, `InsertionPolicyRef`, `DistanceDef` with **edition id** and declared metric/pseudometric status);
(iii) **EmitterPolicyRef** present (with **edition id**);
 (iv) **DominanceRegime** present; if absent, **default= ParetoOnly**.
 Failure of any ⇒ `Abstain` with reasons.

**R1 — Admit.** `Admit` **IFF**
(a) S2 satisfies **Eligibility** predicates of *f* (tri‑state aware),
(b) **EvidenceProfile minima** referenced by Acceptance/Flows for *f* are met (lanes/anchors/freshness) **in the home Context** (post R0),
(c) all relevant **CAL.AcceptanceClauses** (G.4) evaluate to true under lawful CHR comparisons,
(d) any **maturity gating** (e.g., a floor on Maturity rungs) is expressed as an **AcceptanceClause** and referenced here by id (no thresholds inside LOG).
*LOG never sets thresholds; it only executes and cites Acceptance verdicts.*

**R2 — Degrade.** If (a) holds but (b) or (c) is **partially** satisfied or **unknown**, return `Degrade(mode)` where `mode ∈ {scope‑narrow | sandbox | probe‑only}` and **emit scope notes** (USM Scope(G), Γ_time). Record which S2 unknowns or Evidence minima caused the degrade. **LOG‑Degrade** never changes **CHR scales or planes**; it **narrows Scope (G)** or **execution mode**. 
**Note (CAL vs LOG).** CAL‑level **`degrade.order`** (fall‑back to order‑only comparisons) is governed by **G.4**/**CG‑Spec** and is **not** a LOG mode. **SoS‑LOG never overrides CAL outcomes**; a LOG branch **only narrows** `Scope(G)` or **execution mode** (e.g., `sandbox`, `probe‑only`), it **does not** alter CHR scales or admissible orders.
`probe‑only` MUST cite an **E/E‑LOG policy id** (exploration budget) and Acceptance‑bound guards.

**R3 — Abstain.** If S2 violates **Eligibility** *or* **R0** fails, return `Abstain` (with reasons). **Abstain** is mandatory on **illegal CHR operations** (e.g., ordinal means) and when **Bridge/CL** requirements are unmet. 

**R4 — CL routing.** Any cross‑Context/plane reuse must cite **Bridge ids** (with loss notes). Apply **Φ(CL)** and (if planes differ) **Φ_plane** that are **monotone, bounded, table‑backed**; **publish policy‑ids** in the SCR; **penalties reduce `R_eff` only**; **F/G must remain invariant**.

**R5 — Proof hooks.** Every branch **MUST** cite **Evidence Graph Ref** (A.10), lane tags (TA/VA/LA), freshness windows, and (if bridged) **Bridge ids + loss notes**; the decision is **SCR‑visible**. When **G.6 EvidenceGraph** is present, also **publish EvidenceGraph path id(s)** for the branch (admit/degrade/abstain). **No self‑evidence**.

**R6 — QD portfolio semantics (if applicable).** If `PortfolioMode=Archive`, `Admit` may return a **QD archive** (per `ArchiveConfig`) instead of only a Pareto set. Unless **CAL** authorises `DominanceRegime=ParetoPlusIllumination` (**policy‑id recorded in SCR**), **IlluminationSummary** is a **report‑only telemetry summary** and any **coverage/regret** are **telemetry metrics** (reported) that **do not** affect dominance.

**R7 — GeneratorFamily branches (open‑ended).** If S2 includes `GeneratorIntent`, SoS‑LOG **MUST**:
 (i) verify **`EnvironmentValidityRegion`** is declared and lawful;
 (ii) verify **`TransferRulesRef`** exists; if `unknown` ⇒ `Degrade(scope‑narrow)` or `Abstain` per family policy;
 (iii) treat the selection surface as **pairs `{environment, method}`**; publish **coverage/regret** and **IlluminationSummary** as **report‑only telemetry** (IlluminationSummary = telemetry summary; coverage/regret = telemetry metrics); dominance participation per **R6**.

**R8 — Telemetry & Refresh hooks.** On any illumination increase or archive change, publish **edition increments** for **CharacteristicSpaceRef**/**DistanceDefRef** and the **policy‑id** (Emitter/Acceptance) that caused the change; expose **PathSliceId** for refresh/decay in SCR.

> *Aphorism.* **“Admit on lawfulness and sufficiency; degrade on uncertainty; abstain on illegality.”**
#### Maturity ladder (poset, not a scalar; Description, not Spec)

Publish a **`MethodFamily.MaturityCardDescription@Context`** (UTS enum ids; **Scale kind = ordinal**; **ReferencePlane declared**). Do **not** embed thresholds here; any **maturity floors** used for admission are authored as **G.4 AcceptanceClause** and referenced by id from R1.

* **L0 — Anecdotal.** Claims exist; lanes sparse; examples ad‑hoc.
* **L1 — Worked‑Examples.** Multiple **worked examples** with lane tags and **Scope slices** declared; *no replication yet*.
* **L2 — Replicated.** Independent replication(s) in distinct Context slices (publish D.CTX + UTS rows), lane separation observed, decay windows explicit.
* **L3 — Benchmark‑Severe.** Repeated wins or parity on **community baselines** or **severe tests**; cross‑Tradition bridges declared with **loss notes**.

*Optional rung (for QD/OEE‑heavy families; ordinal, closed enum):*
* **L4 — QD‑Hardened.** Archive stability under declared **InsertionPolicy/DistanceDef** editions; reproducible **IlluminationSummary** improvements under controlled budgets; OEE generators pass **EnvironmentValidityRegion** severe tests.

**Norms.**
**M1.** The ladder is **lane‑aware** (TA/VA/LA) and **freshness‑aware**; it is **not** a global numeric score. Declare **Scale kind=ordinal** and the **closed enumeration** of rungs; register the enum at **UTS** (twin labels; editioned).
**M2.** Transitions **MUST** be justified by **EvidenceGraph** paths (once G.6 is available) and UTS publication; missing anchors ⇒ no advance.
**M3.** Any **maturity floor** used for admission (e.g., “run‑critical Context requires ≥L2”) **MUST** be authored as a **CAL.AcceptanceClause** and referenced by id from R1; SoS‑LOG does **not** embed thresholds.
**M4.** Declare **ReferencePlane** for the MaturityCard; on ReferencePlane crossings apply published **Φ_plane** policy (penalty to **R_eff only**), with Bridge id and loss notes.

> *Rationale note.* Treating maturity as a **poset** aligns with B.3’s lane calculus and avoids **scalarisation across ordinal/ratio** scales; assurance penalties remain on **R**, never **F/G**.
#### Unknowns & Shift classes (tri‑state discipline)

**U1. (LEX).** Enumerations for `Degrade(mode)` and Maturity rungs **MUST** be declared as **closed value sets** and **registered at UTS** (twin labels). **Lexical SD** (**E.10**) applies.
**U2.** Every S2 field is tri‑state; `unknown` **MUST** map to a branch (`Degrade` or `Abstain`) declared on the **family** (no coercions). Each branch publishes a **branch‑id** and (where used) a `mode` from a **closed enum** registered at **UTS** (LEX enum clarity).
**U3.** `ShiftClass` semantics follow **C.22**. If `ShiftClass ∈ {covariate‑shift, concept‑drift, adversarial}` or `unknown`, default outcome is `Degrade(scope‑narrow)` unless a CAL.AcceptanceClause explicitly guards the regime.
#### Publication & wiring

**W1.** Each family publishes a **`MaturityCardDescription@Context`** (UTS twin labels; ReferencePlane declared) and **registers SoS‑LOG rule ids**; editions are versioned and **RSCR‑tested for branch‑coverage** (Admit/Degrade/Abstain, unknown paths). **Φ(CL)/Φ_plane policy‑ids** must be present in SCR where applicable.
**W2. Admissibility Ledger.** Publish an **`AdmissibilityLedger@Context`**: rows = `(MethodFamilyId, RuleId, MaturityRung, BranchIds, BridgeIds, ΦPolicyIds, EvidenceGraphPathIds?, DominanceRegime, PortfolioMode, Edition)`, UTS‑registered; this ledger is the **selector‑facing** export.
**W3. Strategy token.** Do **not** mint a `U.Type` “Strategy”; strategy remains a **composition** inside G.5 (`Compose`) under **E/E‑LOG**.
**W4.** Selector (G.5) **consumes** these rules; results appear in the **Dispatcher Report** with reasons in/out and cited anchors/bridges.
### Archetypal Grounding (Tell–Show–Show)

*(Plain register for pedagogy; Core remains notation‑independent per E.10/E.8.)*

**Show‑1 - Continuous dynamics (ODE task).**
*S2 excerpt.* `DataShape=ODE; stiff?=unknown; Size≈10^3; Objective={↓error@ratio, ↑throughput@ratio}; Constraints={safety_gate@ordinal}; Jacobian_sparsity=high; Missingness=MAR`.
*Families.* `Implicit‑BDF` vs `Explicit‑RK` vs `Symplectic`.
*Rules.*
— `Implicit‑BDF`: **Eligibility** tolerates `stiff?=unknown` if `Jacobian_sparsity=high` (guarded precondition); **MaturityCard**=`L3` (replicated & benchmarked). Outcome: `Admit`.
— `Explicit‑RK`: requires `stiff?=false`; with `unknown` ⇒ `Degrade(sandbox)` (probe).
— `Symplectic`: eligible only when `Hamiltonian=true`; here ⇒ `Abstain`.
*Didactic anchor.* This mirrors C.22’s typed‑signature discipline and CHR legality (no ordinal means; unit alignment for **ratio**).

> Contemporary ecosystem examples of these families (post‑2015) are organised in **DifferentialEquations.jl**, which exposes multiple solver **families** under one call surface—precisely the pattern G.5 expects. ([Journal of Open Research Software][17])

**Show‑2 - Planning/scheduling (MIP task).**
*S2 excerpt.* `DataShape=MIP; NoiseModel=deterministic; Objective={↓cost@ratio, ↑service_level@ordinal}; Size≈10^5 vars; convex_relaxation=available`.
*Families.* `MILP (branch‑and‑bound)`, `Constraint‑Programming`, `Heuristic meta‑search`.
*Rules.*
— `MILP`: **Eligibility** requires `convex_relaxation=available`; **MaturityCard**=`L3` in the home Context ⇒ `Admit`.
— `Constraint‑Programming`: **MaturityCard**=`L2`; Acceptance demands `service_level≥B` (ordinal predicate). With `B` met but baseline parity unknown ⇒ `Degrade(scope‑narrow)`.
— `Heuristic meta‑search`: **MaturityCard**=`L1` ⇒ `Degrade(sandbox)` or `Abstain` depending on RSCR parity policy.
*Didactic anchor.* Selector returns a **Pareto set** (no cross‑ordinal weighting), as required by G.5.

> Contemporary “single call / many solvers” packaging that motivates MethodFamily rows is exemplified by **JuMP** (2017–2022), which cleanly separates **model description** from solver choice. ([Miles Lubin][18])

— *DifferentialEquations.jl* illustrates **family‑based** solver packaging (multi‑method under one interface), 2017–2024 ecosystem. ([Journal of Open Research Software][17])
— *JuMP* illustrates **model/solver separation** and registry‑like selection (2021–2022 papers, site). ([Miles Lubin][18])
— *Science of Science* review (2018) supports the emphasis on replication/benchmarks in maturity assessment. ([Science][19])

**Show‑3 - QD archive (policy search).**
*S2 excerpt.* `PortfolioMode=Archive; CharacteristicSpaceRef(d=2); ArchiveConfig(CVT, res=1k cells, K=1, DistanceDefRef.edition=v2, InsertionPolicyRef=dyn‑elite); EmitterPolicyRef=v3; DominanceRegime=ParetoOnly`.
*Rules.* `Admit` returns an **archive**; illumination **reported**; changes to `DistanceDef`/Emitter **editioned** in SCR; dominance remains **ParetoOnly**.

**Show‑4 - Open‑ended GeneratorFamily (POET‑class).**
*S2 excerpt.* `GeneratorIntent{GeneratorFamilyRef=GF‑01, EnvironmentValidityRegion=EVR‑A, TransferRulesRef=TR‑A, CoverageMetric=…}; PortfolioMode=Archive`.
*Rules.* `Admit` yields portfolios over `{environment, method}`; `Degrade(scope‑narrow)` if `TransferRules`=`unknown`; telemetry publishes **coverage/regret** and **IlluminationSummary** with **edition/policy‑id** on improvements.

[17]: https://openresearchsoftware.metajnl.com/articles/10.5334/jors.151 "DifferentialEquations.jl – A Performant and Feature-Rich … "
[18]: https://mlubin.github.io/pdf/jump-sirev.pdf "JuMP: A Modeling Language for Mathematical Optimization"
[19]: https://www.science.org/doi/10.1126/science.aao0185 "Science of science"
### Bias‑Annotation

**Principle‑taxonomy lenses.** *Universality* (trans‑discipline), *Didactic primacy* (Tell–Show–Show), *Open‑ended evolution* (refresh‑ready), *Lexical firewall* (no tool names in Core), *Notation independence*. Limits: Worked examples reference widely‑used ecosystems **in Plain register** only.
### Conformance Checklist (normative)

| ID           | Requirement                                                                                                                                                                                | Purpose                                       |                                                                    |                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- | ------------------------------------------------------------------ | ---------------------- |
| **CC‑C23.1** | Each `MethodFamily` **SHALL** publish a `MaturityCard` with rung justification via **A.10** anchors (lanes, freshness windows) and (if bridged) **Bridge ids** with **CL** and loss notes. | Makes maturity **auditable** and lane‑typed.  |                                                                    |                        |
| **CC‑C23.2** | `SoS‑LOG` rules **MUST** be **executable** (no prose‑only) and cite: Eligibility test result; CG‑Spec gate verdict; EvidenceProfile minima; Acceptance verdict; Γ‑fold contributors; **EvidenceGraph PathId/PathSliceId**; CL/Φ policy‑ids. |
| **CC‑C23.3** | Enumerations used by the rules (**Degrade(mode)**; Maturity rungs) **SHALL** be **closed** and **UTS‑registered** (twin labels). |
| **CC‑C23.4** | **Unknowns** in S2 **SHALL** map to `{degrade | abstain | sandbox}` with explicit **branch‑ids**; no `unknown→0/false` coercions.                                                          | Tri‑state discipline.                          |                                                                    |                        |
| **CC‑C23.5** | Cross‑Context/plane use **MUST** cite a **Bridge**; **Φ(CL)**/**Φ\_plane** **MUST** be monotone, bounded, table‑backed; penalties **→ `R_eff` only**.                                      | Keeps F/G invariant; legal CL routing.        |                                                                    |                        |
| **CC‑C23.6** | **No thresholds** in CHR or Maturity; thresholds **live only** in **AcceptanceClauses** (G.4).                                                                                             | Separation of concerns.                       |                                                                    |                        |
| **CC‑C23.7** | `MaturityCard` **SHALL NOT** be turned into a global scalar; treat as **poset**; any ordering **MUST** be lawful over CHR types.                                                           | Forbids cross‑scale scalarisation.            |                                                                    |                        |
| **CC‑C23.8** | Publish to **UTS** with twin labels; run **GateCrossing visibility checks** on cited crossings: **CrossingBundle** attestation (**E.18/A.27/F.9**), **LanePurity**, and **Lexical SD** (**E.10**) under GateChecks/GateProfile (**A.21**). | Publication & crossing visibility hygiene. |                                                                    |                        |
| **CC‑C23.9** | All enumerations (e.g., `Degrade(mode)`, Maturity rungs) **SHALL** declare a **closed value set** and **Scale kind**, and be registered at UTS (LEX enum clarity).                          | Avoids lexical drift; lawful typing.          |                                                                    |                        |
| **CC‑C23.10** | **RSCR tests** cover negative/refusal paths (illegal CHR ops; CG‑Spec gate fail; Bridge missing; **Φ table/policy‑id missing**; **Lexical SD violations (E.10)**); ensure **branch coverage** (Admit/Degrade/Abstain, unknown). |
| **CC‑C23.11** | If QD fields are in scope, **R0.QD** **MUST** pass: lawful **CharacteristicSpaceRef** (d≥2, characteristics typed, planes declared per characteristic), **ArchiveConfig** (topology/resolution/K, `InsertionPolicyRef`, **editioned** `DistanceDef`), **EmitterPolicyRef** present. | QD legality gate. | |
| **CC‑C23.12** | **DominanceRegime** **SHALL** default to `ParetoOnly`; switching to `ParetoPlusIllumination` **MUST** be authorised by **CAL** and cited by id in SCR.                                    | Prevents implicit scalarisation.              |                                                                    |                        |
| **CC‑C23.13** | If `PortfolioMode=Archive`, LOG **MUST** allow archive outputs (R6) and publish **IlluminationSummary** as a report-only telemetry metric unless CAL opts‑in to dominance participation.                         | Lawful archive semantics.                     |                                                                    |                        |
| **CC‑C23.14** | If `GeneratorIntent` present, **R7** **MUST** verify **EnvironmentValidityRegion** and **TransferRulesRef**; outputs are **{environment, method}** portfolios; coverage/regret telemetry published. | OEE legality & telemetry. | |
| **CC‑C23.15** | On illumination increases/archive changes, **edition increments** (BehaviorSpace/DistanceDef/EmitterPolicy) and the **policy‑id** responsible **SHALL** be logged (R8).                   | Reproducibility & refresh.                    |                                                                    |                        |
### Consequences

* **Explainable admission.** Every *Admit/Degrade/Abstain* is backed by **anchored** evidence and explicit unknown handling (selector reports are SCR‑linked).
* **Run‑safe pluralism.** Multiple families can co‑exist with **policy‑governed** exploration (E/E‑LOG) and maturity‑aware gating.
* **Portable governance.** Bridge hygiene and CL routing make cross‑Tradition reuse **deliberate and costed** (penalties to **R** only).
### Rationale

The ladder and LOG shells align with FPF’s **Assurance calculus**: **F** (form) is governed by artefact kind, **G** (scope) by USM slices, and **R** (reliability) accumulates via WLNK then **Φ(CL)** penalties. Treating maturity as **evidence‑typed rungs**—rather than a “score”—avoids illegal arithmetic and lets **design/run** remain separate via `DesignRunTag` discipline (A.4) and explicit GateCrossings. This mirrors contemporary **science‑of‑science** insights: replication, benchmarking, and field health indicators are the **currency** of maturity, not anecdote.  ([Science][19])
### Relations

**Builds on:** **G.5** (selector consumes these rules), **G.4** (Acceptance & EvidenceProfiles), **C.22** (S2 typing), **C.18 NQD‑CAL**, **C.19 E/E‑LOG**, **B.3** (Assurance tuple & WLNK).   
**Publishes to:** **UTS** (MaturityCards, rule ids), **SCR/RSCR** (branch coverage; parity hooks).
**Constrains:** **G.8** (LOG Bundling must cite MaturityCards), **G.9** (parity harness draws baselines per rung), **G.11** (refresh windows per rung & decay), **G.5** (Open‑Ended Family mode for GeneratorFamily).
**Outcome.** The pattern introduces **new content** (LOG shells + maturity poset + degrade modes + publication Standard) and **does not duplicate** CG‑Spec legality rules, CHR guard‑macros, or CAL acceptance mechanics; it *integrates* them into **admissibility logic** for MethodFamilies.
### C.23:End
## Agentic Tool‑Use & Call‑Planning (C.Agent‑Tools‑CAL)

> **Type:** Calculus (C)
> **Status:** Stable
> **Normativity:** Normative

**Plain-name.** Agentic tool-use and call planning.

**Intent.** Govern admissible tool-call planning and replanning under explicit budget, assurance, and policy while keeping upstream choice, pool policy, planning, and execution distinct.

**Instantiates / Refines Pillars.** `E.2` `P-3` Scalable Formality, `P-7` Pragmatic Utility, `P-10` Open-Ended Evolution, `P-11` SoTA Alignment, and the Bitter-Lesson Preference: prefer scalable, general methods that benefit from more data or compute over fragile hand-tuned heuristics when assurance and cost stay comparable.

**Depends on.** A-kernel (`A.1–A.15`) for holonic basics and Role-Method-Work separation; `B.3` Trust & Assurance (`F–G–R` with CL penalties); `E.3/E.5` (precedence and Guard-Rails); `C.5` `Resrc-CAL`; `C.18` `NQD-CAL` (candidate generation and portfolio); `C.19` `E/E-LOG` (explore-exploit policies); optional `Compose-CAL` and `KD-CAL` where available.

**Coordinates with.** `U.WorkPlan` and `U.PromiseContent` bindings (acceptance gates), Working-Model publication discipline per `B.3`, and Evidence/Provenance (`G.6`).

### Use this when

- one concrete choice posture already exists and the next task is now how to plan, gate, sequence, and replan tool calls lawfully
- the next lawful artifact should be one enactment-facing `CallPlan` or one `CheckpointReturn`, not one more local choice result or pool-policy result
- budget, assurance, and stop conditions must be visible before calls are burned
### What goes wrong if missed

- calls get scheduled by ad-hoc heuristics, so the plan cannot say which budget is being burned or what event should stop or replan execution
- planning quietly collapses into execution, or execution quietly inherits unresolved upstream choice and pool-policy burdens
- a successful probe is mistaken for committed rollout even though the commit trigger was never made explicit
### What this buys

- one tool-agnostic planning surface for admissible calls, budgets, stop conditions, and replan triggers
- one explicit enactment surface with objective, budget, stop conditions, and next move
- one replayable call graph and assurance surface instead of one opaque chain of tool invocations
### First-minute questions

- Has one choice posture already been fixed strongly enough that planning may begin now?
- Which budget is being burned now: enactment budget, tool-call budget, or still one upstream probe budget?
- What event stops or replans the route?
- Is the next lawful artifact one `CallPlan`, one `CheckpointReturn`, or one reroute?
### First output

The first useful output is either one enactment-facing `CallPlan` with the current objective, cited route descriptions, the planned budget envelope, the stop or replan condition, and the next move stated explicitly in one place, or one bounded `CheckpointReturn` with the current objective or task family, the burned and residual actual budget, the commit trigger, and the recommended next action stated explicitly in one place.

If that first output still cannot be written honestly, the current planning result is not finished `C.24` planning yet.
### Problem frame

Modern systems in agential roles increasingly rely on tool-call planning: selecting admissible tool-service routes, arranging intended call work, and replanning under uncertainty. Without a calculus:

* calls are scheduled by **ad-hoc heuristics**,
* **budgets** (compute, cost, wall-time) are implicit,
* **assurance** and **policy provenance** are lost, and
* systems in agential roles either over-constrain themselves with brittle scripts or wander without guard-rails.

This CAL provides the **conceptual API for thought** that lets any implementation (LLM-based, search-based, code-based, robotic) plan calls **lawfully**, **auditably**, and **scalably**. (Role-Method-Work alignment; didactic primacy.)

Immediate failure signs for this pattern:

* the current planning result cannot say whether one choice posture already exists,
* the current text cannot distinguish route description, call plan, and executed call work,
* the budget being burned is still only probing-before-choice budget rather than enactment or tool-call budget, or
* the next lawful artifact is still undefined as one enactment-facing plan, one `CheckpointReturn`, or one reroute.

If the real burden is still which fixed option should survive now, reroute to `C.11`. If it is still pool policy over several still-live candidate lines, reroute to `C.19`. If it is already public selected-set publication, reroute to `G.5`.
### Problem

We need a **tool-agnostic** way to (i) identify **admissible route descriptions**, (ii) compose one **call work plan** that cites them, (iii) allocate an **explore/exploit** share, (iv) enforce **budget & harm** gates, and (v) **replan** on signals—**without** baking domain-specific heuristics into the core and **without** collapsing `U.MethodDescription`, `U.WorkPlan`, and `U.Work` into one object.
### Forces

| Force                                    | Tension                                                                                                                 |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **General methods vs. hand-craft**       | Scalable, model-centric search ↔ short-term wins of bespoke scripts (guarded by **Bitter-Lesson Preference**).        |
| **Assurance vs. Autonomy**               | F-G-R gates & CL penalties ↔ system latitude to sequence calls and learn online.                                       |
| **Exploration vs. Delivery**             | Exploration share for illumination ↔ delivery SLAs and cost ceilings (E/E-LOG policy).                                |
| **Route vs. plan vs. execution**         | `U.MethodDescription` ↔ `U.WorkPlan` ↔ `U.Work` ↔ service promises (`U.PromiseContent`).                              |
### Solution — Signature & Realization

**Types (aliases).**
*`ATC.CallRouteDescription`* ≡ `U.MethodDescription` with `accessSpec` for one tool service or callable route;
*`ATC.CallPlan`* ≡ `U.WorkPlan` specialised for intended tool-call work; it cites one or more `ATC.CallRouteDescription` editions plus planned order, budget ceilings, stop or replan triggers, and next move;
*`ATC.CallGraph`* ≡ Evidence/Provenance graph over a `U.Work` ledger;
*`ATC.Policy`* references `U.EmitterPolicyRef` (E/E-LOG) and local call gates **including BLP tolerances (alpha, delta)**.

**Roles.**
A **System in AgentialRole** prepares or revises one **CallPlan** that cites one or more **CallRouteDescription** editions. Upon enactment, a **Performer** executes **Work** (calls), and **Observers** record **Observations** with acceptance checks. Route descriptions stay design-time; the call plan stays schedule-of-intent; actual call work stays run-time. (A.15 strict distinction.)

**Operators (Gamma_agential; CAL, conceptual):**

1. `Gamma_agential.eligible(tool, TaskSignature, K_ctx) -> {true|false, notes}`
   *Eligibility gate* based on capability fit, policy allow-list or deny-list, and context K (including safety constraints).

2. `Gamma_agential.enumerate(TaskSignature, K_ctx) -> CandidateSet<ATC.CallRouteDescription>`
   Returns admissible callable route descriptions. It **MAY** delegate to **NQD-CAL** for heterogeneous route families and **MUST** apply the current **E/E-LOG lens** (objectives & telemetry) to tag candidates.

3. `Gamma_agential.plan(Objective, CandidateSet, Budget, ATC.Policy) -> ATC.CallPlan`
   Produces one **call plan** that cites the selected route descriptions, declares one planned budget envelope (compute, cost, time, risk), one intended call order, and one stop or replan policy. Internal route logic remains in the cited method descriptions; the plan is a `U.WorkPlan` that cites method descriptions, not a method description and not yet work.

4. `Gamma_agential.execute(ATC.CallPlan) -> {ATC.CallGraph, Observations}`
   Executes with **hard gates** (budget, risk, constraint-fit) and logs provenance suitable for B.3 assurance reporting (design/run separated).

5. `Gamma_agential.replan(Signals, ATC.CallPlan, BudgetPrime) -> ATC.CallPlanPrime`
   Triggered by sentinel breaches, assurance drops, or policy events; preserves editioned policy, cited route descriptions, and context.

6. `Gamma_agential.score(Route or PlanAlternative) -> <ValueProxies, Cost, Risk, FGR_floor>`
   Computes selection signals **without** illegal scalarisation across mixed scales; **uses Pareto comparison under the C.19 E/E-LOG lens** and defers final dominance to declared policies.

#### Bounded scout/probe cycle for unfamiliar task families

When the choice posture is already fixed enough that enactment planning is lawful, but the route across heterogeneous or unfamiliar callable approaches is still uncertain, the system may spend a bounded scout/probe budget before committed rollout and return one checkpoint package that compares the tested routes.

If additional probing could still change which option survives the current `OptionSet`, the budget is still `C.11`-side epistemic budget and the burden reroutes upstream. If choice posture is already fixed and the uncertainty is only about route or rollout shape, the budget is now enactment budget and `C.24` owns the checkpoint.

That `CheckpointReturn` should state the declared utility target and current `TaskFamily`, the route descriptions or candidate approaches tested, the evidence on each route, the burned and residual actual budget, the recommended next action, and the exact commit trigger that would justify leaving probe state.

A successful probe does not by itself authorize a larger burn or a committed rollout. `C.24` owns the `CheckpointReturn` record and call-plan semantics for this probe loop; `A.15` owns the design/run split and `E.16` owns the budget partition plus guard and ledger enforcement. Low-human-overlap approaches remain admissible only while they stay tied to the declared utility target, budget guard rails, and evidence basis explicitly.

**Bridge to neighboring owners.** `ProbeBudget` belongs to `C.11` while it means epistemic budget for further probing before choice. `C.24` owns budgets once they are enactment, tool-call, or rollout budgets. If the question is still which option survives now, reroute to `C.11`; if it is now pool policy over several still-live candidate lines, reroute to `C.19`; if it is selector-facing publication of the selected result, reroute to `G.5`.

**Explicit enactment result.** A conformant `C.24` pass should therefore leave either one enactment-facing `CallPlan` that states the current objective, the cited route descriptions or planned call order, the planned budget envelope, the stop or replan condition, and the next move, or one `CheckpointReturn` that states the current objective or task family, the burned and residual actual budget, the evidence basis, the commit trigger, and the recommended next action.

**Unfinished-state rule.** A `C.24` result remains unfinished when it cannot say whether execution should continue now, pause at one checkpoint, or reroute, when it confuses route description with plan or plan with executed work, or when it does not state which budget is planned versus already burned and what event would stop or replan the current route.

**Normative Laws (ATC-Laws).**

* **ATC-1 (Model-the-Call, not the App).** A tool call is one **Work** instance that enacts a referenced **MethodDescription** promised by a **Service**; plans schedule intended calls and cite route descriptions but are neither the route descriptions themselves nor the calls. (A.15.)
* **ATC-2 (Bitter-Lesson Preference).** When two admissible choices are within **delta (assurance)** and **alpha (budget)**, **prefer the more general, scale-benefiting method** whose **slope vector Pareto-dominates** under the declared E/E-LOG objectives; any override **MUST** record a **BLP-waiver** with expiry. (E.2; precedence governed by E.3.)
* **ATC-3 (Budget & Harm Gates).** Plans **SHALL** declare ceilings on compute, cost, wall-time, and risk; execution **MUST** abort or replan on breach. Actual burned or residual budget belongs in `CheckpointReturn`, `CallGraph`, or other work-side reporting, not inside the plan surface.
* **ATC-4 (Explore-Share Discipline).** Plans **MUST** declare `explore_share`; defaults **inherit from E/E-LOG profiles**. **Informative defaults**: `0` for safety-critical or deterministic tasks; `approx 0.2-0.4` for ambiguous tasks with heterogeneous tool families. Promotion of illumination telemetry into dominance **requires explicit policy**.
* **ATC-5 (Provenance & Replay).** Every call **MUST** emit a **CallGraph** with: Service id, cited MethodDescription edition, inputs/outputs (redacted per privacy), `CallPlan` ref, **EmitterPolicyRef**, and budget deltas. (NQD/E/E provenance fields apply when used.)
* **ATC-6 (Assurance-First Decisions).** Selection **MUST** respect B.3: WLNK minima on F/R (weakest-link floors), CL penalties on integration, and **no** chimera scores across design/run. Publish **<F,G,R>** for the typed claim `this plan is admissible under K,S`.
* **ATC-7 (Notation/Vendor Independence).** Core pattern text **MUST NOT** encode vendor-specific tokens; bindings occur in Context via Bridges/Profiles. (Lexical guard-rails.)
#### Policy profile and BLP precedence

**ATC-Policy fields (conceptual).**
`{ backstop_confidence, explore_share, risk_bound, cost_ceiling, time_ceiling, tie_breakers, novelty_quota?, wild_bet_quota?, stop_conditions, BLP_delta_alpha, BLP_delta_delta }` - realised by referencing an `E/E-LOG` `EmitterPolicy` and adding Bitter-Lesson-Preference clauses. Defaults inherit from `C.19`; any deviation is editioned.

**BLP precedence.** In conflicts with tactics that hard-code narrow scripts, the Bitter-Lesson Preference applies subject to `E.3/E.5` precedence. Where scripts encode safety-critical gating or regulatory compliance, scripts prevail unless the governing context publishes the override rationale, expiry, measured hazard avoided, and planned re-evaluation window.
#### Didactic quick card

**Agentic Call Plan (public surface).**
`Objective - Context(K) - RouteRefsInOrder[edition-pinned] - BudgetEnvelope{time/compute/cost/risk} - PolicyRef - Explore-share - Stop/Replan conditions - BLP tolerances - BLP waiver (if any) - Assurance<F,G,R|K,S> - Provenance ids`
#### Explicit enactment outputs and closure rule

A finished `C.24` pass should publish one enactment result rather than one vague statement that the system now has a plan.

Two output shapes are lawful here:

- one enactment-facing `CallPlan`; or
- one bounded `CheckpointReturn` when probing is still the lawful next move inside enactment planning.

A `CallPlan` should state at least these fields:

- current objective;
- cited route descriptions or planned call order;
- active policy or planning posture;
- planned budget envelope or reserved budget;
- stop or replan condition;
- next move if the current plan is accepted now.

A `CheckpointReturn` should state at least these fields:

- current task family or objective;
- candidate routes tested so far;
- evidence on those routes;
- burned and residual actual budget;
- recommended next action;
- explicit commit trigger.

A compact result may therefore look like:

```text
CallPlan(
  objective = answer_question_Q,
  policyRef = ee_policy_v1,
  routeRefsInOrder = [search_route_v3, retrieve_route_v1, synthesize_route_v2, code_check_route_v1],
  plannedBudgetEnvelope = {time<=60_minutes, compute<=x1, cost<=y1, risk<=r1},
  stopOrReplan = low_R_or_cost_ceiling,
  nextMove = enact_now
)
```

or:

```text
CheckpointReturn(
  taskFamily = unfamiliar_lab_protocol,
  testedRoutes = [route_A, route_B],
  burnedBudget = 2_runs,
  residualBudget = 1_run,
  recommendedNextAction = probe_route_B_once_more,
  commitTrigger = route_B_clears_assurance_floor_L1
)
```

Close as one enactment-facing `CallPlan` when the choice posture is already fixed enough that execution order, gating, and replanning are now the governed burden. Close as one `CheckpointReturn` when bounded scout/probe work is still lawful inside enactment planning. Reroute when the result has actually fallen back into local choice, pool policy, or selector-facing publication.

If the result still does not state what should execute now, what budget is planned or already burned, and what event stops or replans the route, it is still unfinished `C.24` work.
#### Worked closure slice

Two short contrasts keep the closure law practical.

**Known route, execution should begin now.**
When the objective and route are already fixed enough, `C.24` should close as one enactment-facing call plan:

```text
CallPlan(
  objective = produce_patch_and_verify,
  routeRefsInOrder = [inspect_repo_route, edit_candidate_route, run_targeted_tests_route],
  plannedBudgetEnvelope = {time<=45_minutes, compute<=x2, cost<=y2, risk<=r2},
  stopOrReplan = targeted_tests_fail_twice,
  nextMove = enact_now
)
```

**Unfamiliar route, one bounded scout pass still lawful.**
When the route is still uncertain inside enactment planning, `C.24` should close as one `CheckpointReturn`:

```text
CheckpointReturn(
  taskFamily = unfamiliar_ci_failure,
  testedRoutes = [log_trace_route, minimal_repro_route],
  burnedBudget = 1_probe_cycle,
  residualBudget = 2_probe_cycles,
  recommendedNextAction = run_minimal_repro_once_more,
  commitTrigger = repro_is_stable_and_assurance_floor_L1_holds
)
```

The practical distinction is simple: if route order and budgeted execution are already the governed burden, emit one `CallPlan`; if bounded scout work is still the governed burden inside planning, emit one `CheckpointReturn`.

1. **Research-assistance system in agential role.**
   Task: answer a novel technical question. Candidate tools: retrieval, structured web search, code runner, table or plot generator.
   **Plan:** cite route descriptions for `search`, `retrieve`, `synthesize`, and `code_check`; declare `explore_share approx 0.4`; replan on sentinel `low_R`.
   The lawful structure here is one declared budget envelope, one explicit route order, and one visible replan trigger.

2. **Program-repair system in agential role.**
   Task: propose a patch against a failing test suite. Candidate tools: repo introspection, static analyzer, unit runner.
   **Plan:** keep repo-introspection, patch-application, and targeted-test route descriptions distinct; use scout quota across patch families before committed rollout.

3. **Lab-automation system in agential role.**
   Task: adjust a wet-lab protocol under drift. Candidate tools: planner, pipetting controller, spectrometer, Bayesian optimizer.
   **Plan:** a bounded probe or pilot can inform the route, but committed rollout waits for the declared commit trigger and assurance floor.
### Bias-Annotation

Lexical firewall and notation independence apply; no vendor tokens; mixed-scale characteristics are never averaged; route descriptions remain distinct from `U.WorkPlan`, and both remain distinct from executed `U.Work`; a successful probe remains distinct from committed rollout until the commit trigger is satisfied.
### Conformance Checklist

1. **CC-ATC-1 - Declared separation.** `ATC.CallRouteDescription` is a `MethodDescription`; `ATC.CallPlan` is a `U.WorkPlan` that cites route descriptions; execution is `Work`; acceptance is via `U.PromiseContent`. No method-side route logic or actual burn is smuggled into the `U.WorkPlan` surface.
2. **CC-ATC-2 - Budgets on record.** `time/compute/cost/risk` ceilings exist ex ante; stop conditions listed.
3. **CC-ATC-3 - E/E policy.** `EmitterPolicyRef` (or equivalent) and `explore_share` are editioned and logged.
4. **CC-ATC-4 - Assurance tuple.** Publish the typed claim `Plan admissible under K,S` with `<F,G,R>` and CL penalties traceable in the `CallGraph` SCR. Design/run never merged.
5. **CC-ATC-5 - BLP waiver discipline.** Any heuristic override against a general method includes expiry and re-evaluation date.
6. **CC-ATC-6 - Provenance minimum.** Record `{PromiseContentRef, CallPlanRef, MethodDesc.edition, EmitterPolicyRef, DescriptorMapRef? (if NQD), DistanceDefRef? (if NQD), TimeWindow, Seeds?, Dedup?}`.
7. **CC-ATC-7 - Notation independence.** No vendor tokens in conceptual text; bindings via Bridges or Profiles only.
8. **CC-ATC-8 - BLP tolerances declared.** `alpha/delta` tolerances are present in `ATC.Policy` or referenced via the active `E/E-LOG` profile.
9. **CC-ATC-9 - `CheckpointReturn` for bounded specialization.** When one route still uses scout/probe discipline on a new task family, it SHALL publish one `CheckpointReturn` with candidate routes, evidence, burned/residual actual budget, next action, and commit trigger; a successful probe alone never counts as committed rollout.
10. **CC-ATC-10 - Recoverable enactment closure.** When `C.24` returns one enactment-facing call plan or one `CheckpointReturn`, the `CallPlan` SHALL state current objective, route refs in order, planned budget envelope, stop or replan condition, and next move, while `CheckpointReturn` SHALL state burned/residual actual budget plus next action and commit trigger.
11. **CC-ATC-11 - Neighboring-pattern reroutes.** If the burden is still fixed-option choice, pool policy over several live lines, or selector-facing publication, `C.24` SHALL reroute to `C.11`, `C.19`, or `G.5` rather than restating those patterns.
12. **CC-ATC-12 - Role discipline.** User-facing prose and emitted artifacts SHALL speak about systems in agential roles or equivalent typed performers, not one generic `agent` head, when that generic head would blur the holder kind.
### Common Anti-Patterns and How to Avoid Them

- **Treating route description as plan.** Avoid by keeping callable logic in `ATC.CallRouteDescription` and keeping `ATC.CallPlan` as one `U.WorkPlan` that cites it.
- **Treating planning as execution.** Avoid by publishing actual burn only through `CheckpointReturn`, `Work`, and `CallGraph`, not inside the plan surface.
- **Burning enactment budget while the burden is still upstream choice or pool policy.** Avoid by rerouting unresolved fixed-option choice to `C.11` and unresolved live-pool governance to `C.19` before building one call plan.
- **Counting a successful probe as committed rollout.** Avoid by publishing one `CheckpointReturn` with a visible commit trigger instead of smuggling rollout through a positive scout result.
- **Hiding stop conditions or replan triggers.** Avoid by making them part of the public plan surface rather than one private implementer intuition.
### Consequences

- tool use under systems in agential roles becomes inspectable as one lawful plan, not one opaque sequence of calls
- downstream work receives one explicit enactment surface with objective, route refs, budget envelope, stop conditions, and next move
- the cost is stronger discipline around route-description versus plan versus work separation, explicit budgets, and visible policy posture before execution begins
### Rationale

`C.24` exists because tool-use systems fail in a distinctive way: they can look adaptive while actually hiding route choice, budget burn, stop conditions, and replan logic inside one opaque execution chain. A separate planning calculus is therefore necessary so that tool use remains auditable, replayable, and governable before the first irreversible call is made.

- Contemporary tool-use systems in agential roles work best when planning, feedback, and replanning stay explicit rather than collapsing into one brittle script. The practical implication is to publish one `U.WorkPlan` that cites route descriptions and carries stop or replan triggers before execution.
- Post-2015 search, optimization, and agentic systems also show that bounded probing is useful but dangerous when it silently becomes commitment. The safeguard here is the explicit `CheckpointReturn` plus visible commit trigger and one explicit split between planned budget envelope and burned actual budget.
- Scaling-first practice favors general, learnable methods over fragile hand-tuned tactics when assurance and cost remain comparable. The practical implication is not blind optimism but disciplined BLP: when a narrow heuristic wins, record the waiver, expiry, and re-evaluation window.
### Relations

Builds on: `A.15` Role-Method-Work alignment (planning vs execution vs service), `B.3` Trust & Assurance (`F-G-R/CL`), `C.5 Resrc-CAL`, `C.18 NQD-CAL` (candidate and portfolio generation), and `C.19 E/E-LOG` (policies). Constrains: any `U.PromiseContent` used as a tool MUST expose acceptance conditions and observation hooks sufficient for `B.3` reporting. Enables: human-facing Working-Model surfaces with policy and assurance disclosures while keeping design/run separated.
### C.24:End
## Q-Bundle: Authoring "-ilities" as Structured Quality Bundles

> **Type:** Definitional (D)
> **Status:** Stable
> **Normativity:** Normative unless marked informative

**Plain-name.** Quality-bundle normal form.

**Builds on.**
`A.2.6` (USM scope algebra), `A.6.1 U.Mechanism`, `C.16 MM-CHR`, `A.18 CSLC`, `B.3 Trust & Assurance Calculus`.

**Coordinates with.**
`C.17-C.19` for quality-related measurement families, `A.15` for method/work gating, and `A.6.Q` for evaluative routing into explicit quality endpoints.

### Problem frame

Engineering quality language repeatedly drifts into one of two invalid simplifications: either every `-ility` is treated as one scalar characteristic, or every engineering-quality statement is left as loose evaluative prose. A conforming engineering corpus therefore needs a uniform discipline that keeps lawful measurements, scope declarations, mechanisms, statuses, and evidence visibly separated without inventing a new kernel ontology.
### Problem

Without a normal form for engineering quality families:

1. **Composite families are scalarized illegally.**
   Terms such as *resilience*, *security*, or *maintainability* are treated as if one number exhausted them.
2. **Scope is confused with measurement.**
   A claim's `ClaimScope` / `WorkScope` is spoken of as if it were a magnitude rather than a USM set-valued applicability object.
3. **Mechanism and status are mistaken for evidence or metrics.**
   Presence of redundancy, certification, or audit controls is described as if it were itself a measurement value.
4. **Guards become unstable.**
   Admission checks silently mix scope coverage, numerical thresholds, mechanism presence, and evidence freshness in one phrase.
5. **Evaluative routing remains underspecified.**
   After `A.6.Q` repairs a bare quality term, the lawful endpoint is unclear unless FPF distinguishes single-CHR cases from bundle-shaped quality families.
### Forces

| Force | Tension |
|---|---|
| **Simplicity vs category hygiene** | Authors want one convenient quality label; the framework must still keep CHR, USM, mechanism, and status roles distinct. |
| **Comparability vs local applicability** | Measures should compare legally across contexts, while scope remains context-local and set-valued. |
| **Thin ontology vs practical authoring** | The pattern should regularize quality authoring without creating a new heavy kernel family for every `-ility`. |
| **Endpoint clarity vs expressive breadth** | Some quality terms really are one characteristic; others are bundles. The endpoint rule must cover both without ambiguity. |
### Solution - Q-Bundle normal form

`C.25` defines a lightweight authoring normal form for engineering quality families. A publisher facing a quality term shall first decide whether the intended endpoint is:

- **one lawful CHR characteristic**, or
- **one structured quality bundle** whose measurable slots, scope slots, mechanisms, statuses, and evidence remain explicit.

#### Endpoint split

Use a **single `U.Characteristic`** when the quality claim is genuinely one measurable aspect with one declared scale and ordinary CHR legality.

Use a **Q-Bundle** when the quality family depends on more than one of the following:

- one or more measurable characteristics,
- a declared claim/work scope,
- mechanism or status requirements,
- qualification windows,
- evidence anchors that are not reducible to one scalar.
#### Q-Bundle shape

`Q-Bundle := <Name, Carrier, ClaimScope?, WorkScope?, Measures[CHR], QualificationWindow?, Mechanisms?, Status?, Evidence?>`

The pattern adds no new kernel owner for these slots. It reuses existing kinds and keeps them in one disciplined authoring surface.
#### Field roles

- **Name.** The engineering quality family label, such as `Availability`, `Resilience`, or `Security`.
- **Carrier.** The bearer of the quality claim: typically `U.System`, `U.PromiseContent`, or `U.Episteme`.
- **ClaimScope / WorkScope.** USM sets over `U.ContextSlice` describing where the claim holds or where the capability can deliver. These are **set-valued scope objects**, not characteristics.
- **Measures[CHR].** One or more lawful CHR characteristics, each bound to one declared scale.
- **QualificationWindow.** The temporal policy under which the quality claim is judged.
- **Mechanisms / Status.** References to `U.Mechanism` realizations, control presences, certification states, or similar gating structures. They are not measurements.
- **Evidence.** Anchors that justify the measures, mechanisms, or scope claims.
#### Guard reading

A conforming quality guard typically has the conceptual form:

`Scope covers TargetSlice AND Measures meet thresholds AND QualificationWindow is valid AND required Mechanisms/Status are present`

This keeps coverage, thresholding, and admissibility in separate typed slots instead of hiding them inside one quality adjective.
### Archetypal Grounding

**Tell.** A quality family is not automatically one metric. Sometimes it is one characteristic; often it is a structured bundle whose measurable, scope, and mechanism slots must remain explicit.

**Show (Availability).** Availability may be authored as one CHR-centric bundle with `AvailabilityRatio[%]` as the principal measure, a declared service/time scope, and explicit redundancy mechanisms. The measure is scalar; the scope is not.

**Show (Resilience / Security).** Resilience or security usually requires more than one measure, plus scenario scope, mechanism references, and qualification windows. Treating either as one scalar "quality score" erases the bundle structure that the claim actually needs.
### Bias-Annotation

The pattern biases authors toward explicit decomposition. That bias is intentional. It is better to publish a visibly structured quality bundle than to gain short-term convenience by collapsing scope, measures, and mechanisms into one overloaded quality label.
### Conformance Checklist

- `CC-C.25-1` If an engineering quality claim is intended as one measurement axis, the publisher **SHALL** bind it to one named `U.Characteristic` with one declared scale.
- `CC-C.25-2` If the claim requires multiple measures, scope slots, mechanism slots, status slots, or qualification windows, the publisher **SHALL** use a Q-Bundle rather than an undeclared scalar surrogate.
- `CC-C.25-3` `ClaimScope` and `WorkScope` **SHALL** remain USM set-valued scope objects; they **MUST NOT** be treated as ordinal or numeric quality levels.
- `CC-C.25-4` Mechanism or status slots **MUST NOT** be conflated with `Measures[CHR]`.
- `CC-C.25-5` Any scalar comparison or thresholding inside a Q-Bundle **SHALL** apply only to declared CHR measures, not to scope slots.
- `CC-C.25-6` Cross-context penalties and bridge losses **SHALL** route to `R` per `B.3` / `F.9`; they **MUST NOT** silently alter the type of the bundle's `F`, scope, or CHR ownership.
### Common Anti-Patterns and How to Avoid Them

| Anti-pattern | What it looks like | How FPF prevents it |
|---|---|---|
| **One-number `-ility`** | `Resilience = 82` with no declaration of what is being measured and what scope/scenario is intended. | `CC-C.25-2` requires a Q-Bundle when the family is composite. |
| **Scope as metric** | The claim treats wider applicability as a higher quality value rather than as a larger USM set. | `CC-C.25-3` keeps scope set-valued and non-CHR. |
| **Mechanism equals quality** | Presence of a mechanism or certificate is reported as if it were the measurement itself. | `CC-C.25-4` keeps mechanism/status slots distinct from measures. |
| **Collapsed guard prose** | One sentence mixes coverage, thresholds, windows, and mechanisms without typed separation. | `C.25` rewrites the claim into explicit slots and typed guard factors. |
### Consequences

| Benefit | Trade-off / Mitigation |
|---|---|
| **Category hygiene.** Scope, measurement, mechanism, and status no longer collapse into one term. | Slightly heavier authoring surface; mitigation: only composite cases need the full bundle. |
| **Portable comparison.** CHR measures compare legally, while scope remains governed by USM set algebra. | Authors must declare scales and scope explicitly. |
| **Cleaner gating.** Method/work guards can read the same structure without hidden semantics. | Requires discipline in separating guard factors. |
| **Better endpoint routing.** `A.6.Q` can terminate in either one characteristic or one Q-Bundle with clear ownership. | Requires a first-pass endpoint decision during authoring. |
### Rationale

Engineering quality language is useful precisely because it groups recurring concerns under memorable family labels. The same grouping becomes dangerous when those labels are mistaken for one universal metric. `C.25` preserves the family labels but forces the underlying structure to stay typed and visible.
### SoTA-Echoing

Contemporary engineering quality practice routinely mixes service-level measures, capability windows, scenario envelopes, mechanism presence, certification state, and evidence traces. `C.25` adopts that practical richness but refuses the common shortcut of compressing the whole family into one undefined score.
### Relations

- **Builds on:** `A.2.6` for scope algebra, `A.6.1` for mechanism references, and `C.16 / A.18` for CHR legality.
- **Coordinates with:** `C.2.2a`, `A.16.0`, `B.3` for assurance penalties, `A.15` for gate use, `A.6.Q` for evaluative routing, `C.17/C.18/C.19` for adjacent quality-family measures, and `F.9 / F.9.1` when cross-context bundle comparison or bridge stance annotation is required.
- **Constrains:** engineering quality authoring whenever a quality term would otherwise drift between single-CHR and composite-bundle readings.

#### Endpoint role in evaluative routing

Within language-state trajectories and their endpoint docks, `C.25` is the system-side endpoint owner for engineering quality families after evaluative routing from `A.6.Q`. `evaluativeAscription(...)` may remain a transitional repair record, but it is **not** the universal resting place when the lawful endpoint is a single `Characteristic`, a `Q-Bundle`, or an explicit objective-oriented quality bundle.
### Decision Test: Single Characteristic or Bundle?

The most common authoring failure is not in the bundle syntax itself; it is in choosing the wrong endpoint shape. The quickest useful test is to ask what would make the quality claim false.

#### Use one U.Characteristic when

A quality claim should terminate in one lawful CHR characteristic only when all of the following hold together:

- one measurable aspect is actually doing the evaluative work,
- one declared scale is enough to compare relevant cases,
- the bearer and scope are already clear without introducing extra quality slots,
- mechanism or status presence is not itself part of the core quality head,
- and downstream gates can read the claim without needing a bundle decomposition.

Examples include a narrowly declared `AvailabilityRatio[%]`, a specific latency percentile, or one response-time threshold under one fixed window.
#### Use a Q-Bundle when

A quality claim belongs in `C.25` when one family label is standing over several distinct typed concerns, for example:

- several measures are needed together,
- scenario or claim scope is load-bearing,
- mechanism presence or certification state constrains admissibility,
- qualification windows alter the reading materially,
- or one scalar head would hide which part of the family is actually failing.

The bundle is not a fallback for laziness. It is the explicit authoring form for claims whose truth conditions are already composite.
#### Borderline cases

Some quality families contain both a bundle-shaped form and a narrow single-axis form. For example, a service team may use:

- one CHR characteristic for a very narrow uptime commitment, and
- one Q-Bundle for the broader service-availability family that includes scope, windows, failover mechanisms, and evidence.

This is legitimate as long as the text states clearly which head is currently in play. The single-axis form does not replace the broader family; it selects one evaluative slice of it.
### Slot Interaction Law

The strength of `C.25` is not just that it names the slots. It also stabilizes how those slots interact.

#### Scope and measure remain orthogonal

`ClaimScope` and `WorkScope` answer **where** or **under what contextual slice** the quality claim holds. `Measures[CHR]` answer **how** a measurable aspect behaves. A broader scope is not a larger measurement value; a narrower scope is not a penalty value. Scope is governed by set inclusion and coverage, not by scalar order.
#### Mechanism and status are gating slots

Mechanisms and statuses may be load-bearing for admissibility, but they do not become measurements merely because they matter. A redundancy mechanism may be required for claiming a resilience bundle, and a certification status may be required for external publication, yet neither slot is itself the `Measures[CHR]` head.

This matters because many quality arguments fail by turning mechanism presence into an implicit hidden score.
#### Qualification windows are not decorative

A quality claim that depends on rolling windows, observation periods, maintenance intervals, or disruption horizons must publish that temporal qualifier explicitly. If the truth of the quality claim changes when the window changes, then the window is part of the bundle contract rather than optional commentary.
#### Report-only summary proxies

A publisher may compute a report-only summary proxy for convenience, for example a compact quality summary-surface value or an oversight-facing composite score. Such a proxy is lawful only if:

- it is explicitly declared as a **report-only proxy**,
- the underlying bundle slots remain visible,
- and no norm, gate, or bridge silently substitutes the proxy for the bundle itself.

This prevents a convenience summary from becoming a covert replacement for the typed quality claim.
### Worked Quality Families

#### Availability family

A narrow service commitment may use `AvailabilityRatio[%]` as one characteristic. A broader availability family usually still needs a bundle because the claim depends on:

- declared service and time scope,
- observation and qualification window,
- one or more mechanism slots such as failover or redundancy,
- and evidence tying the measurement to declared observation conditions.

The bundle form makes it possible to distinguish "the measurement fell short" from "the measurement is fine but the declared mechanism prerequisite was absent".
#### Resilience family

Resilience is almost never one scalar. It commonly binds together:

- disruption scenario scope,
- restoration-related measures such as `MTTR`, `RTO`, or `RPO`,
- recovery mechanisms and preparedness states,
- and scenario-specific evidence about drills, restorations, or incident traces.

Trying to compress this into a single resilience value usually destroys the difference between fast recovery in one scenario and structural fragility in another.
#### Security family

Security claims routinely combine:

- trust-zone or attack-class scope,
- measurable characteristics such as patch latency, control coverage, or response interval,
- control-set and certification slots,
- and evidence from audit, observation, or incident review.

`C.25` therefore treats broad security-family claims as bundle-shaped unless the claim has already been narrowed to one lawful CHR axis.
#### Maintainability and evolvability

Maintainability or evolvability claims often drift into pure rhetoric. In `C.25`, they become usable only when the publisher separates:

- the declared scope of systems or change classes,
- the measurable slots (for example change lead time, defect reintroduction rate, restoration interval, review burden),
- the enabling mechanisms (modularity rules, test harnesses, interface discipline),
- and the window or evidence conditions under which those measures were observed.

This is exactly the kind of quality family that looks scalar in speech but turns composite once the claim is made explicit.
### Authoring and Review Guidance

#### For authors

Authors should begin with the question: *what is the actual head of this quality claim?* If the truthful answer is "several measures plus scope plus mechanism constraints," start with a bundle and narrow only if a later slice genuinely deserves one CHR head.

A useful authoring order is:

1. name the family label,
2. identify the bearer,
3. publish scope,
4. publish measures,
5. add mechanism/status slots,
6. publish qualification window,
7. bind evidence,
8. and only then consider whether a report-only summary proxy is needed.
#### For reviewers

Reviewers should ask:

- whether the chosen endpoint shape is lawful,
- whether any scope slot has been smuggled into scalar language,
- whether mechanism presence has been mistaken for a metric,
- whether the window is truly optional or actually load-bearing,
- and whether any summary proxy is trying to replace the underlying bundle.

In practice, most defects are visible as soon as the reviewer asks what exactly one reported number stands for.
#### For gate designers and assurance leads

Gate designers should resist writing guards against vague family labels such as *resilience must be high*. A conforming gate should instead name the relevant bundle slots:

- coverage over the target slice,
- threshold satisfaction on declared measures,
- qualification-window validity,
- and any required mechanism or status slots.

This keeps the gate auditable and prevents later disputes about what the family label was supposed to mean.
### Migration and Boundary Notes

#### Migration from bare quality requirements

Legacy phrases such as *quality requirement*, *security requirement*, or *availability requirement* should not survive as bare heads when the underlying endpoint is actually a characteristic or bundle. The migration rule is:

- choose the endpoint shape first,
- then bind the requirement or commitment to that explicit head.

`A.6.Q` may still be the entry repair, but `C.25` is the resting place once the engineering quality family has been made explicit.
#### Boundary to assurance penalties

Cross-context transport, bridge loss, or plane mismatch do not change whether the endpoint is one characteristic or one bundle. Those effects route to `R` and its penalties. `C.25` therefore should not be used to hide assurance degradation inside the quality-family ontology.
#### Boundary to publication convenience

A report, summary surface, or executive summary may expose only one slice of a Q-Bundle, but the underlying authoring contract remains the bundle. Publication convenience is not a reason to collapse the ontology at the source.
#### Serviceability and supportability

Serviceability, supportability, and adjacent family labels often look simple in prose but become composite as soon as operational use is declared. A lawful bundle for this family may need:

- support-scope slices,
- measured restoration or service intervals,
- mechanism slots for support mechanisms, access discipline, or replacement procedures,
- and evidence from service traces or support records.

The lesson is the same as elsewhere in `C.25`: once the truth of the family claim depends on several typed contributors, the bundle should stay explicit.
#### Boundary to description-side and selector-side evaluation

`C.25` owns engineering quality families whose bearer is a system-side, promise-side, or explicit quality-bearing artifact. It does **not** automatically own:

- viewpoint-fit or architecture-description adequacy claims, which may belong in viewpoint or evaluative-ascription patterns,
- or selector/objective heads where *quality* means use-value under a search or portfolio frame.

This boundary matters because the same word *quality* appears across those zones. `A.6.Q` may be the common repair entry, but the resting endpoint depends on what is actually being evaluated.
### Bundle Decomposition and Comparison Law

#### Local decomposition rule

A family label may remain stable while its internal slots differ materially across contexts. Conforming comparison therefore starts by aligning the bundle decomposition: scope slots with scope slots, measure slots with measure slots, mechanism/status slots with their own kinds, and evidence/window slots with their own kinds. Comparing one bundle's measure directly to another bundle's mechanism claim is a category error even if both sit under the same family label.
#### Narrow slice versus whole family

A context may lawfully extract one narrow slice from a broader Q-Bundle and publish that slice as a single CHR characteristic, but the publication should say that the slice is only one member of the broader family. What is not lawful is to report the slice as though it exhausted the entire family claim.
#### Cross-context family comparison

Cross-context comparison of quality families should proceed through explicit bundle alignment and, where needed, `F.9` bridge discipline on the relevant heads or slots. `C.25` owns the bundle ontology; bridge loss, translation strength, and cross-context penalties remain outside the bundle itself.
### Gate, Proxy, and Reporting Discipline

#### Report-only summary proxy

A context may publish a summary proxy for reporting convenience, but the proxy remains secondary to the Q-Bundle. The proxy should state what it summarizes and what it leaves out. No report-only proxy may replace the bundle in norms, gates, or endpoint ontology.
#### Gate binding rule

When a gate uses a quality family, the gate should bind to explicit bundle slots: declared scope, specific measures, qualification window, and any required mechanism or status slots. Gate authors should not rely on the family label alone, because labels invite different local decompositions.
#### Roll-up caution

A higher-level summary surface or review may aggregate several bundle instances, but the roll-up must remain visibly downstream from the underlying bundle structure. If the roll-up begins to drive local engineering decisions directly, the governing bundle slots should be surfaced again rather than hiding them behind one summary score.
### Review Matrix and Migration Tests

A reviewer can test a Q-Bundle with five questions:

1. **Is the endpoint shape lawful?** One characteristic where one axis is real, one bundle where several typed contributors are load-bearing.
2. **Are scope and mechanism slots kept distinct from measures?**
3. **Is any summary number trying to replace the bundle?**
4. **Would a gate still be auditable if the family label were removed?**
5. **If the claim crosses contexts, is bridge work kept in `F.9` rather than hidden inside the family bundle?**

Migration from legacy family prose should therefore recover bundle shape first, then choose whether any narrow slice deserves a separate CHR publication.
### C.25:End
