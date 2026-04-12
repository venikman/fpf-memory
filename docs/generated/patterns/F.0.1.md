---
title: "Contextual Lexicon Principles"
description: "Part F - The Unification Suite (U-Suite): Concept-Sets, SenseCells & Contextual Role Assignment"
---

# Contextual Lexicon Principles
> Pattern `F.0.1` · Stable
> Part F - The Unification Suite (U-Suite): Concept-Sets, SenseCells & Contextual Role Assignment

> **One‑sentence summary.** All meanings in FPF are **local to a `U.BoundedContext`** (“Context of meaning”); terms are **spoken with their Context**, and any relation **across Contexts** exists **only** as an explicit **Alignment Bridge** with stated loss/fit.

**Status.** Architectural pattern.
**Builds on:** A.1.1 `U.BoundedContext` (formal frame); A.7 *Strict Distinction* (C‑6); A.8 *Universal Core* (C‑1); A.11 *Ontological Parsimony* (C‑5); A.4 *Temporal Duality* (C‑7); **E.10.D1 D.CTX** (lexical discipline for “Context”).
**Coordinates with.** **F.1** (Context Map via Context Cards), **F.2** (local term capture), **F.3** (intra‑Context clustering), **F.7** (Concept‑Set Table), **F.9** (Alignment & Bridge), **B.3** (Trust & Assurance; CL penalties).

> **Didactic note.** In the Tech register, **Context ≡ `U.BoundedContext`** (per E.10.D1). We use “Context of meaning” as a **metaphor only**; *Context* remains the normative short form for `U.BoundedContext`. The word **anchor** is not used in FPF.

> **Didactic note.** In the Tech register, **Context ≡ `U.BoundedContext`** (per E.10.D1). We use “Context of meaning” as a **metaphor only**; *Context* remains the normative short form for `U.BoundedContext`. The word **anchor** is not used in FPF. The word *plane* is reserved to **CHR:ReferencePlane** only.

**Terminology guard (normative, Part F).** The **row classifier** is **senseFamily**: {Role | Status | Measurement | Type‑structure | Method | Execution}. **Characteristic** (MM‑CHR) names measurable aspects only (A.17–A.19) and MUST NOT be used for row typing in Part F. Avoid the generic word **facet** in Part F; when unavoidable, reference **C.3.5 KindAT (informative facet)** or **Compose‑CAL `U.Facet`** explicitly. Only **CHR:ReferencePlane** is permitted (no bare “plane”); use **I/D/S layer** for intension/description/specification; use **stance** for design vs run.

Trans‑disciplinary modelling fails without an explicit discipline for **where words mean what**.

## Keywords

- local meaning
- context
- semantic boundary
- bridge
- congruence
- lexicon
- U.BoundedContext.

## Relations

- `F.0.1` --explicit_reference--> [U.BoundedContext: The Semantic Frame](/generated/patterns/A.1.1)
- `F.0.1` --explicit_reference--> [Strict Distinction (Clarity Lattice)](/generated/patterns/A.7)
- `F.0.1` --explicit_reference--> [Universal Core (C-1)](/generated/patterns/A.8)
- `F.0.1` --explicit_reference--> [Ontological Parsimony (C-5)](/generated/patterns/A.11)
- `F.0.1` --explicit_reference--> [Temporal Duality & Open-Ended Evolution Principle](/generated/patterns/A.4)
- `F.0.1` --explicit_reference--> [Lexical Discipline for “Context” (D.CTX)](/generated/patterns/E.10.D1)
- `F.0.1` --explicit_reference--> [Domain‑Family Landscape Survey](/generated/patterns/F.1)
- `F.0.1` --explicit_reference--> [Term Harvesting & Normalisation](/generated/patterns/F.2)
- `F.0.1` --explicit_reference--> [Intra‑Context Sense Clustering](/generated/patterns/F.3)
- `F.0.1` --explicit_reference--> [Concept‑Set Table Construction](/generated/patterns/F.7)
- `F.0.1` --explicit_reference--> [Alignment & Bridge across Contexts](/generated/patterns/F.9)
- `F.0.1` --explicit_reference--> [Trust & Assurance Calculus (F–G–R with Congruence)](/generated/patterns/B.3)
- `F.0.1` --explicit_reference--> [A.CHR-NORM — Canonical “Characteristic” & rename (Dimension/Axis → Characteristic)](/generated/patterns/A.17)
- `F.0.1` --explicit_reference--> [A.CHR-SPACE — CharacteristicSpace & Dynamics hook](/generated/patterns/A.19)

## Content

## Problem Frame

Trans‑disciplinary modelling fails without an explicit discipline for **where words mean what**.

* **Semantic drift.** The same string (“process”, “role”, “service”) slides between domains and editions.
* **Homonym collisions.** One label carries incompatible senses across fields.
* **Hidden synonymy.** Different labels point to the same local sense, but the identity is unstated.
* **Implicit globalism.** Meaning is treated as universal; integration silently re‑writes models.

FPF resolves this by **localising** meaning first, then **explicitly translating** across locales.
## The Three Principles (normative)

### P‑S - Source Localisation Principle — Speak with the Context.

**Rule.** Every term in a normative FPF artefact **MUST** be bound to a **specific `U.BoundedContext`** (its “Context of meaning”). The binding is explicit in text, notation, or table headers (e.g., **process (BPMN 2.0)**).

**Implications.**

* No free‑floating “global terms”.
* A finite **Context Map** (see **F.1**) is chosen **before** naming work starts.
* If a source intrinsically fixes time stance, the **design/run tag** is carried by the Context (C‑7).

**Reasoning move (conceptual).**
`Context(C) ∧ says(C, term t) ⊢ usable(t@C)`

**Illustration (Enactment line).**
`activity @ PROV‑O (run)` vs `task @ IEC 61131‑3 (run)` vs `process @ BPMN 2.0 (design)`.
### P‑L - Local Meaning Principle — Meaning lives inside the Context.

**Rule.** The **intended sense** of a term is established **inside its Context** as a **SenseCell**: a small, reconstructible unit of local meaning with **Tech/Plain labels** and a concise gloss. SenseCells are **lexical only** (C‑6): no behaviours, no deontics, no equations.

**Implications.**

* SenseCells are **Context‑scoped**; they do **not** cross Contexts.
* Minimal generality (G‑1) and contextual specification (G‑2) govern naming inside the Context.
* **Intra‑Context clustering** of raw mentions precedes any Cross‑context act (see **F.3**).

**Reasoning move (conceptual).**
`usable(t@C) ∧ fits(gloss, C) ⊢ SenseCell⟨t@C⟩`

**Illustration (KD‑CAL).**
`observation @ SOSA/SSN`: Tech “observation”, Plain “measurement act”; gloss “Result‑bearing act applying a Procedure…”.
### P‑B - Explicit Bridge Principle — across Contexts, only with a bridge.

**Rule.** Any relation between terms from **different** Contexts **MUST** be stated as an **Alignment Bridge** (see **F.9**): a named mapping between **SenseCell⟨-⟩** items with a declared **relation kind** (e.g., *overlaps*, *broader‑than*, *near‑equivalent*) and a **Congruence Level (CL)** for trust calculus (B.3).

**Implications.**

* No by‑name identity across Contexts; **string equality ≠ sense equality**.
* Bridges carry **loss/fit notes** and are auditable; they can be revised by edition.
* Concept‑Sets (F.7) are built **from bridged cells**, not from surface strings.
* When the surface prose uses umbrella sameness/alignment tokens (“same/equivalent/align/map/…”), treat it as an RPR trigger and repair it via **A.6.9 (RPR‑XCTX)** before granting any naming or substitution licence.

**Reasoning move (conceptual).**
`SenseCell⟨x@A⟩ ↔⟨rel, CL⟩ SenseCell⟨y@B⟩ ⊢ translatable(x@A, y@B, rel, CL)`

**Illustration (Sys‑CAL × Enactment).**
`actuation @ CTRL‑Text` ↔⟨near‑equiv, CL=2⟩ `control‑output @ IEC 61131‑3`.
## Minimal Artefacts (conceptual, notationally neutral)

> These artefacts are **thought‑objects**; they specify **what must exist conceptually**, not how it is stored.

### Context Card (for each U.BoundedContext)

A terse descriptor used in the **Context Map** (F.1):

* `id` (stable local handle) - `title` - `edition/year`
* `family` (discipline family; informal) - `scope gist`
* `timeStance?` (`design` / `run`, if inherent)
* `trip‑wires` (few lexical caveats that often mislead, e.g., “*process*≠thermo process”)
### SenseCell (unit of local meaning, inside one context)

* `label.tech` / `label.plain` (two registers)
* `gloss` (minimal generality, Context‑true)
* `notes?` (warnings, edition shifts)
* **No** behaviour/deontics/equations (C‑6)

> **Where it comes from.** F.2 describes how SenseCells can be *derived* from local term evidence; F.0.1 only **requires** that local meaning be expressible as a SenseCell.
### Alignment Bridge (between SenseCells from different Contexts)

* `left: SenseCell⟨-@A⟩`, `right: SenseCell⟨-@B⟩`
* `relation` (e.g., *equivalent‑under‑assumptions*, *overlaps*, *broader‑than*)
* `CL` (Congruence Level; feeds B.3 Trust & Assurance)
* `loss/fit` (explicit statement of what is lost or assumed)
## Invariants (normative)

1. **I‑1 - Context‑qualified usage.** Every normative use of a term is **Context‑qualified** (directly or via table/section headers).
2. **I‑2 - Local‑only cells.** A SenseCell belongs to **exactly one** Context.
3. **I‑3 - senseFamily hygiene.** SenseCells are **lexical**; behaviour, deontics, measurements, proof steps live in their respective patterns (C‑6). 
4. **I‑4 - Time stance fidelity.** If a source fixes `design/run`, the Context Card **carries** it and SenseCells **inherit** it.
5. **I‑5 - No implicit Cross‑context identity.** Cross‑context relations exist **only** as F.9 Bridges with `relation` and `CL`.
6. **I‑6 - Parsimony & heterogeneity hook.** The Context Map is **finite**, **heterogeneous** (≥ 3 families per unification line), and **parsimonious** (F.1).
## Reasoning Primitives (judgement schemata; pure, side‑effect‑free)

*These capture **allowable mental moves**; they do not prescribe storage, APIs, or workflow.*

* **Context qualification**
  `Context(C) ∧ mentions(C, s) ⊢ uses(s@C)`
  *Reading:* If a string *s* is used under Context *C*, we treat it as the local term *s\@C*.

* **Local sense formation**
  `uses(t@C) ∧ gloss_C(t) ⊢ SenseCell⟨t@C⟩`
  *Reading:* A Context‑true gloss yields a SenseCell for *t* inside *C*.

* **Admissible Cross‑context relation**
  `SenseCell⟨x@A⟩ ∧ SenseCell⟨y@B⟩ ∧ declare(rel, CL) ⊢ Bridge(x@A, y@B, rel, CL)`
  *Reading:* Only an explicit declaration generates a Bridge; no name‑matching inferences.

* **Bridge‑to‑Concept‑Set hint** *(for F.7)*
  `Bridge(x@A, y@B, rel≈equiv, CL≥k) ⊢ candidate_same_row(x, y)`
  *Reading:* Strong, near‑equivalence bridges can *nominate* cells for one Concept‑Set row (final decision in F.7).
## Didactic Metaphor (informative)

* **Contexts.** Each `U.BoundedContext` is a **Context**; its **Context Card** is a sign on the door (name, edition, time stance, trip‑wires).
* **Words in a Context.** A **SenseCell** is a dictionary entry pinned to that Context’s wall.
* **Door‑to‑door links.** An **Alignment Bridge** is a labelled passage connecting two Contexts; a **CL** placard says how trustworthy that passage is.

> *We first speak inside Contexts; only then decide which doors to connect—and with what warnings.*
## Placement & Flow

**F.0.1** is the **front door** of Part F. It enables:
**F.1** (choosing Contexts with Context Cards) → **F.2** (deriving SenseCells inside each Context) → **F.3** (stabilising local senses) → **F.7** (building Concept‑Set rows) → **F.9** (stating Bridges).
## Anti‑patterns & remedies

| #       | Anti‑pattern (what goes wrong)   | Symptom in models                                          | Why harmful (conceptual)                            | Remedy (this pattern’s clause)                                                            |
| ------- | -------------------------------- | ---------------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **A1**  | **Global term** (Contextless usage) | “process”, “service”, “role” used without a Context mark      | Meaning drifts; integration silently rewrites sense | **P‑S**: Always speak **term\@context**; qualify via section/table headers if repeated       |
| **A2**  | **String‑match identity**        | Equating *service* (ITIL) with *service* (web‑API) by name | String equality ≠ sense equality                    | **P‑B**: Cross‑context relations exist only as **Bridges** with `relation`+`CL`              |
| **A3**  | **senseFamily mixing in SenseCell**    | Local glosses include behaviours, deontics, equations      | Violates **Strict Distinction** (C‑6); blocks reuse | **P‑L**: SenseCell is **lexical only**; behaviour/deontic math belongs to FPF patterns   |
| **A4**  | **Edition blur**                 | Citing “BPMN” or “ITIL” without edition                    | Underspecified Context; un‑auditable sense shift       | **Context Card** carries `edition/year`; treat materially changed editions as distinct Contexts |
| **A5**  | **Context as type**              | Declaring “PROV‑O is‑a BPMN”                               | Implies inherited meanings between Contexts            | Contexts aren’t types; **no is‑a on Contexts** (E.10.D1). Use Bridges only                       |
| **A6**  | **Bridge without loss/fit**      | Bridge declared as “equivalent” with no assumptions        | Users infer total identity; trust calculus blind    | **P‑B**: Bridge must state `relation` and `CL`, plus a brief **loss/fit** note            |
| **A7**  | **Row from strings**             | Concept‑Set rows built from surface forms                  | Homonyms/synonyms contaminate rows                  | Build rows from **SenseCells**; add only cells connected by acceptable Bridges (F.7)      |
| **A8**  | **Transitivity overreach**       | Chaining weak near‑equivalences as if exact                | Inflates sameness; hides mismatch                   | **Bridge composition** (Sec. 10): compose with **min‑CL** and keep relation weakening     |
| **A9**  | **Domain ≡ Context**                | “Domain” name used as if it were a `U.BoundedContext`      | Domain families are informal; Contexts are formal      | Keep **Domain family** informative on Context Cards; meanings bind to **Contexts** only         |
| **A10** | **Time‑stance confusion**        | Treating `design` and `run` senses as identical            | Crosses senseFamilies; erases execution/spec split         | Carry **time stance** on Context Cards; prefer `design‑spec‑of` / `run‑trace‑of` Bridges     |
## Compact worked examples

> *Each vignette shows (1) two Context Cards (abridged), (2) SenseCells inside Contexts, (3) the Bridge with relation & CL, and (4) a Concept‑Set hint (if any).*

### F.0.1:9.1 Enactment × Provenance — process vs activity

* **Context A**: `BPMN_2_0` - *Business Process Model and Notation v2.0 (2011)* - *design*
  **SenseCell⟨process\@BPMN⟩**: Tech “process”; Plain “workflow process”; Gloss “graph of flow nodes/events executed by participants.”

* **Context B**: `PROV_O_2013` - *W3C PROV‑O (2013)* - *run*
  **SenseCell⟨activity\@PROV⟩**: Tech “activity”; Plain “provenance activity”; Gloss “time‑bounded occurrence using/generating entities.”

* **Bridge**: ⟨process\@BPMN⟩ ↔⟨`design‑spec‑of`, **CL=2**, loss: “no concurrency semantics in trace”; fit: “maps to execution plan”⟩ ⟨activity\@PROV⟩

* **Concept‑Set hint**: *No* same‑row nomination (relation ≠ near‑equiv); instead, record a **design↔run** linkage.
### Control × PLC runtime — actuation vs control output

* **Context A**: `CTRL_Text_Classic` - *control theory primers* - *design*
  **SenseCell⟨actuation\@CTRL⟩**: Tech “actuation”; Plain “control output”; Gloss “signal applied to plant actuators.”

* **Context B**: `IEC_61131_3` - *PLC languages* - *run*
  **SenseCell⟨q‑output\@IEC⟩**: Tech “control‑output”; Plain “PLC output”; Gloss “program‑produced output variable to field I/O.”

* **Bridge**: ⟨actuation\@CTRL⟩ ↔⟨`near‑equivalent`, **CL=2**, loss: “hardware/scan‑cycle specifics absent in CTRL”; fit: “semantics align under linear regime”⟩ ⟨q‑output\@IEC⟩

* **Concept‑Set hint**: *Candidate same‑row* (F.7) with note: “merge permitted at **CL≥2** threshold.”
### F.0.1:9.3 Measurement × Service — observation vs service metric

* **Context A**: `SOSA_SSN_2017` - *sensing/observations* - *run*
  **SenseCell⟨observation\@SOSA⟩**: Tech “observation”; Plain “measurement act”.

* **Context B**: `ITIL4_2020` - *services* - *(mixed)*
  **SenseCell⟨slo‑metric\@ITIL⟩**: Tech “service‑level metric”; Plain “service measure”; Gloss “quantity used to evaluate SLOs.”

* **Bridge**: ⟨observation\@SOSA⟩ ↔⟨`provides‑value‑for`, **CL=2**, loss: “organizational context not in SOSA”; fit: “metric results are measurement results.”⟩ ⟨slo‑metric\@ITIL⟩

* **Concept‑Set hint**: Not a same‑row case; this is a **role‑in‑use** relation (measurement feeds status evaluation).
### F.0.1:9.4 Type reasoning — subclass‑of (OWL) vs is‑a (plain)

* **Context A**: `OWL2_Profiles` - *description logics*
  **SenseCell⟨subclass\@OWL⟩**: Tech “subclass‑of”; Plain “is‑a”.

* **Context B**: `ENG_Glossary` - *engineering plain usage compendium*
  **SenseCell⟨is‑a\@ENG⟩**: Tech “is‑a (engineering)”; Plain “kind‑of”; Gloss “informal subsumption in specs.”

* **Bridge**: ⟨subclass\@OWL⟩ ↔⟨`near‑equivalent`, **CL=1**, loss: “OWL formal constraints absent in ENG”; fit: “intended subsumption semantics.”⟩ ⟨is‑a\@ENG⟩

* **Concept‑Set hint**: Keep separate rows unless the consuming artefact demands **formal** semantics.
### F.0.1:9.5 Deontics × Access — permission vs role (RBAC)

* **Context A**: `ODRL_2_2` - *policy/deontics*
  **SenseCell⟨permission\@ODRL⟩**: Tech “permission”; Plain “allowed action”.

* **Context B**: `NIST_RBAC_2004` - *access control*
  **SenseCell⟨role\@RBAC⟩**: Tech “access‑role”; Plain “permission set”.

* **Bridge**: ⟨permission\@ODRL⟩ ↔⟨`member‑of‑set‑in`, **CL=2**, loss: “contextual obligations not preserved”; fit: “RBAC roles aggregate permissions.”⟩ ⟨role\@RBAC⟩

* **Concept‑Set hint**: Not same row (different **kinds**); useful linkage for Enactment when binding duties to sessions.
## Extended reasoning moves (pure judgement schemata)

> *Judgements are conceptual entailments over Contexts, SenseCells, and Bridges. They carry no storage, workflow, or governance semantics.*

### Context‑qualified use

`Context(C) ∧ mentions(C, s) ⊢ uses(s@C)`
*If s is used under Context C, we treat it as the local term s\@C.*
### Sense formation (local)

`uses(t@C) ∧ gloss_C(t) ⊢ SenseCell⟨t@C⟩`
*A Context‑true gloss yields a SenseCell inside C.*
### Admissible Bridge (creation predicate)

`SenseCell⟨x@A⟩ ∧ SenseCell⟨y@B⟩ ∧ A≠B ∧ rel∈R ∧ cl∈{0,1,2} ⊢ Bridge(x@A,y@B,rel,cl)`
*Only explicit relation `rel` with Congruence Level `cl` constitutes a Bridge.*

**Canonical relation set `R` (didactic catalogue):**
`equivalent‑under‑assumptions` - `near‑equivalent` - `overlaps` - `broader‑than` - `narrower‑than` - `design‑spec‑of` - `run‑trace‑of` - `representation‑of` - `member‑of‑set‑in` - `provides‑value‑for`.
### Bridge composition (attenuating)

`Bridge(a,b,rel₁,cl₁) ∧ Bridge(b,c,rel₂,cl₂) ⊢ Bridge*(a,c,rel*,cl*)`

* `cl* := min(cl₁, cl₂)` (do **not** inflate confidence)
* `rel* := weaken(rel₁, rel₂)` (e.g., near‑equiv ∘ overlaps → overlaps)

*Reading:* Chained passages degrade to the weakest link.
### Non‑identity by stance

`SenseCell⟨x@A(design)⟩ ∧ SenseCell⟨y@B(run)⟩ ∧ ¬declared(Bridge(x,y,near‑equiv,_)) ⊢ ¬same‑row(x,y)`
*Different time stances forbid same‑row unless an explicit near‑equiv Bridge exists.*
### Row viability (Concept‑Set candidacy)

`Cells = {c₁…cₙ} ⊢ row‑viable(Cells) ⇔ connected(Cells, Bridges_{rel∈{equiv,near‑equiv}, cl≥k}) ∧ ¬contradiction(Cells)`

*Reading:* A row is viable if its cells form a connected subgraph via sufficiently strong Bridges and contain no mutually exclusive links.
### Contradiction sieve

`Bridge(a,b,broader) ∧ Bridge(a,b,narrower) ⊢ contradiction(a,b)`
*Incompatible relations across the same pair flag a contradiction for review (conceptually).*
### Non‑bridge implication ban

`name(x) = name(y) ∧ A≠B ⊢ ¬Bridge(x@A, y@B, _, _)`
*String equality across Contexts never implies a Bridge.*
## SCR/RSCR acceptance checks (conceptual)

> *These checks are **content‑oriented**; they validate that a manuscript/model respects Part F principles. No process/tool assumptions are implied.*

### SCR — Static conformance

* **SCR‑F01 (Context‑qualified).** Every normative term is Context‑qualified (directly, or via a scoped header that unambiguously fixes the Context).
* **SCR‑F02 (Local cells).** Each SenseCell belongs to **exactly one** Context; no cell aggregates Cross‑context **senses**.
* **SCR‑F03 (senseFamily hygiene).** SenseCell glosses contain no behaviours/deontics/equations; those appear only in their patterns.
* **SCR‑F04 (Bridges explicit).** Every Cross‑context relation appears as a Bridge with `relation` and `CL` and a short **loss/fit** note.
* **SCR‑F05 (No string identity).** There is no use of string equality to stand in for Cross‑context identity.
* **SCR‑F06 (Time stance fidelity).** Where a Context fixes `design/run`, the SenseCells and any Bridges reflect that stance explicitly.
* **SCR‑F07 (Row viability).** Any Concept‑Set row shown is supported by a connected subgraph of Bridges with **CL ≥ threshold** and no contradictions.
### RSCR — Regression & evolution

* **RSCR‑F01 (Edition split).** When a source edition changes materially, SenseCells tied to the old edition remain; new cells bind to the new Context; Bridges are re‑assessed.
* **RSCR‑F02 (Bridge stability).** If any Bridge endpoint changes gloss/stance, downgrade or retire the Bridge, documenting the **loss/fit** change.
* **RSCR‑F03 (Composition guard).** When composing Bridges in a chain, the resulting `CL` never exceeds the minimal link; relation weakens monotonically.
* **RSCR‑F04 (Heterogeneity + QD guard):** requires ≥3 domain‑families AND MinInterFamilyDistance ≥ δ_family (per the active F1‑Card edition), with QD‑triad evidence (publish Diversity_P and IlluminationSummary on the declared grid/kernel). Near‑alias pairs (per dSig rule) SHALL be flagged and excluded or merged before the guard is evaluated. Record the F1‑Card edition id.
### Publish‑ready summary

An artefact is **ready** with respect to F.0.1 when:

1. **SCR‑F01…F07** hold for all terms, cells, rows, and bridges it presents;
2. **RSCR‑F01…F04** hold under simulated edition/stance changes;
3. Every Cross‑context statement can be read as a **Bridge** or as a composition of Bridges with stated attenuation.
## Quick reference (didactic)

* **Context** = a `U.BoundedContext` with edition, scope, and (if inherent) time stance.
* **SenseCell** = the minimal, lexical unit of meaning inside a Context (Tech/Plain labels + gloss).
* **Bridge** = the only Cross‑context relation, labelled with `relation` and **CL**, plus a short loss/fit note.
* **Concept‑Set row** = a didactic table row collecting **SenseCells** that are sufficiently the‑same‑thing under declared Bridges.

> **Mental checklist:** *Name the Context → speak in the Context → connect Contexts only by labelled bridges → build rows from bridged cells.*
## F.0.1:End
