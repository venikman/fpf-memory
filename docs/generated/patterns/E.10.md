---
title: "LEX-BUNDLE: Unified Lexical Rules for FPF"
description: "Part E - The FPF Constitution and Authoring Guides"
---

# LEX-BUNDLE: Unified Lexical Rules for FPF
> Pattern `E.10` · Stable
> Part E - The FPF Constitution and Authoring Guides

*Definitional pattern; normative for all FPF pattern text and for any Context that claims FPF conformance.*

**Status & placement.** Part E.10 (“Lexical Discipline & Stratification”); complements **E.10.D1 (D.CTX)**, **E.10.D2 (I/D/S)**, and the **DesignRunTag / CtxState boundary discipline** (**A.15**; **E.18**), and is referenced by F‑cluster naming practices (F.4–F.8). This bundle consolidates all lexical constraints in one place so authors can cite **“LEX‑BUNDLE”** instead of listing rules scattered across documents.

**Builds on:** A.7 **Strict Distinction (Clarity Lattice)**; E.5 Guard‑Rails (DevOps Lexical Firewall; Notational Independence; Unidirectional Dependency); F.5 **Naming Discipline for U.Types & Roles**.
**Coordinates with.** A.2/A.15 (Role–Method–Work alignment), A.10 (Evidence Graph Referring), B.1/B.3 (Γ‑algebras & assurance), F‑cluster (context of meaning; Bridges).

**Intent.** Provide one **normative** rule‑set that makes FPF language **unambiguous, composable across contexts, and teachable** by design. Authors, reviewers, and tooling can point to **LEX‑BUNDLE** as the single source of truth for:

## Keywords

- lexical rules
- naming
- registers
- rewrite rules
- process
- function
- service.

## Relations

- `E.10` --outline_child--> [Conceptual Prefixes (policy & registry)](/generated/patterns/E.10.P)
- `E.10` --outline_child--> [Lexical Discipline for “Context” (D.CTX)](/generated/patterns/E.10.D1)
- `E.10` --outline_child--> [Intension–Description–Specification Discipline (I/D/S)](/generated/patterns/E.10.D2)
- `E.10` --explicit_reference--> [Lexical Discipline for “Context” (D.CTX)](/generated/patterns/E.10.D1)
- `E.10` --explicit_reference--> [Intension–Description–Specification Discipline (I/D/S)](/generated/patterns/E.10.D2)
- `E.10` --explicit_reference--> [Role–Method–Work Alignment (Contextual Enactment)](/generated/patterns/A.15)
- `E.10` --explicit_reference--> [Transduction Graph Architecture (E.TGA)](/generated/patterns/E.18)
- `E.10` --explicit_reference--> [Role Description (RCS + RoleStateGraph + Checklists)](/generated/patterns/F.4)
- `E.10` --explicit_reference--> [Mint or Reuse? (U.Type vs Concept-Set vs Role Description vs Alias)](/generated/patterns/F.8)
- `E.10` --explicit_reference--> [Strict Distinction (Clarity Lattice)](/generated/patterns/A.7)
- `E.10` --explicit_reference--> [Four Guard-Rails of FPF](/generated/patterns/E.5)
- `E.10` --explicit_reference--> [Naming Discipline for U.Types & Roles](/generated/patterns/F.5)
- `E.10` --explicit_reference--> [Role Taxonomy](/generated/patterns/A.2)
- `E.10` --explicit_reference--> [Evidence Graph Referring (C-4)](/generated/patterns/A.10)
- `E.10` --explicit_reference--> [Universal Algebra of Aggregation (Γ)](/generated/patterns/B.1)
- `E.10` --explicit_reference--> [Trust & Assurance Calculus (F–G–R with Congruence)](/generated/patterns/B.3)
- `E.10` --explicit_reference--> [Alignment & Bridge across Contexts](/generated/patterns/F.9)
- `E.10` --explicit_reference--> [Method Quartet Harmonisation](/generated/patterns/F.11)
- `E.10` --explicit_reference--> [Unified Term Sheet (UTS)](/generated/patterns/F.17)
- `E.10` --explicit_reference--> [Intra‑Context Sense Clustering](/generated/patterns/F.3)
- `E.10` --explicit_reference--> [Concept‑Set Table Construction](/generated/patterns/F.7)
- `E.10` --explicit_reference--> [Anti‑Explosion Control (Roles & Statuses)](/generated/patterns/F.14)
- `E.10` --explicit_reference--> [SCR/RSCR Harness for Unification](/generated/patterns/F.15)
- `E.10` --explicit_reference--> [GateProfilization: OperationalGate(profile) (GateFit core)](/generated/patterns/A.21)
- `E.10` --explicit_reference--> [U.RelationSlotDiscipline - SlotKind / ValueKind / RefKind discipline for n‑ary relations (with slot‑operation lexicon)](/generated/patterns/A.6.5)
- `E.10` --explicit_reference--> [U.Signature — Universal, law‑governed declaration](/generated/patterns/A.6.0)
- `E.10` --explicit_reference--> [SoTA Pack Shipping (pack-boundary owner; SoTA-Pack(Core))](/generated/patterns/G.10)
- `E.10` --explicit_reference--> [External Interop Hooks for SoTA Discipline Packs (conceptual; normative when used)](/generated/patterns/G.13)
- `E.10` --explicit_reference--> [U.Mechanism - Law‑governed application to a SubjectKind over a BaseType](/generated/patterns/A.6.1)
- `E.10` --explicit_reference--> [Role Assignment & Enactment Cycle (Six-Step)](/generated/patterns/F.6)
- `E.10` --explicit_reference--> [MM-CHR — Measurement & Metrics Characterization](/generated/patterns/C.16)
- `E.10` --explicit_reference--> [A.CHR-NORM — Canonical “Characteristic” & rename (Dimension/Axis → Characteristic)](/generated/patterns/A.17)
- `E.10` --explicit_reference--> [A.CSLC-KERNEL — Minimal CSLC in Kernel (Characteristic/Scale/Level/Coordinate)](/generated/patterns/A.18)
- `E.10` --explicit_reference--> [Q-Bundle — Structured Treatment of "-ilities" (Quality Families)](/generated/patterns/C.25)
- `E.10` --explicit_reference--> [Unified Scope Mechanism (USM): Context Slices & Scopes](/generated/patterns/A.2.6)
- `E.10` --explicit_reference--> [U.CrossContextSamenessDisambiguation — Repairing cross-context “same / equivalent / align” via explicit Bridges (RPR-XCTX)](/generated/patterns/A.6.9)
- `E.10` --explicit_reference--> [Language-State Transduction Coordination](/generated/patterns/A.16)
- `E.10` --explicit_reference--> [Bridge Stance Overlay](/generated/patterns/F.9.1)

## Content

## Problem context

**Intent.** Provide one **normative** rule‑set that makes FPF language **unambiguous, composable across contexts, and teachable** by design. Authors, reviewers, and tooling can point to **LEX‑BUNDLE** as the single source of truth for:

* **Vertical stratification** (Kernel ↔ Extensions ↔ Context ↔ Instance);
* **Twin registers** (Tech/Plain) with safe synonyms;
* **Naming morphology** (allowed suffixes & style) for the kernel’s core objects;
* **Minimal Generality** tests (names are neither parochial nor vacuous);
* **Canonical rewrites** for overloaded words (e.g., *process*, *function*, *service*);
* **Conformance checks** and minimal examples.

**Scope.** Applies to:
(a) **Core** (Parts A–G), (b) **Extensions patterns specs** (CAL/LOG/CHR), (c) **Context glossaries** that claim FPF conformity, and (d) **Diagrams/prose** in normative text. It **does not** constrain Tooling or Pedagogy wording other than where they quote Core semantics.
## Problem

1. **Polysemy drift.** *Process, function, service, agent, activity* slide between structure, recipe, execution, and promise.
2. **Cross‑context collision.** A label (e.g., *Owner*) is assumed “global” though meanings differ per `U.BoundedContext`.
3. **Name bloat vs. parochialism.** Either hyper‑specific domain names leak into core types, or vague umbrella names obscure invariants.
4. **I/D/S collapse.** Authors mix **intension** (the thing), **description** (how we describe it), and **specification** (testable criteria).
5. **Register soup.** Tech terms bleed into Plain pedagogy and vice‑versa, inviting category errors.
## Forces

| Force                          | Tension to resolve                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------ |
| **Universality vs. local fit** | Kernel must stay universal while allowing domain nuance in a Context of meaning.              |
| **Brevity vs. clarity**        | Short names help, but only if morphology signals the right kernel slot.                    |
| **Stability vs. evolution**    | Names should survive refactors; yet we must accommodate new roles/types without explosion. |
| **Pedagogy vs. precision**     | Plain words aid learners; Tech labels anchor formal checks.                                |
## Solution — the LEX‑BUNDLE rule‑set (overview)

**LEX‑BUNDLE** aka **ULR (Unified Lexical Rules)** is a compact set of **register, naming, and rewrite** rules with conformance checks.

1. **Vertical Stratification Ladder** (E.10 → four strata);
2. **Twin‑Register Discipline** (Tech/Plain pairs);
3. **Minimal Generality (MG)** principle + tests;
4. **Morphology & Style** (suffixes, casing, reserved prefixes);
5. **Canonical Rewrites** for overloaded words (L‑rules);
6. **Conformance Checklist (CC‑LEX)** and **Regression Stubs (RSCR‑LEX)**.

Below are the **normative clauses**
## Vertical Stratification Ladder (four strata; no cross‑bleed)

> **Rule V‑0 (Strata).** Every lexical item in a conformant text belongs to exactly one **stratum**:

1. **Kernel** — `U.*` types, kernel relations, invariants (e.g., `U.Holon`, `U.Role`, `U.Method`, `U.Work`, `U.PromiseContent`).
2. **Extension patterns** — CAL/LOG/CHR exports (e.g., **Sys‑CAL**, **KD‑CAL**, **Agency‑CHR**) that **extend** but do not override Kernel.
3. **Context** — a **`U.BoundedContext`** with its **Glossary, Invariants, Roles**, and **Bridges** (local Context of meaning).
4. **Instance** — concrete identifiers (holders, role assignments, works, carriers).

**V‑1 (Unidirectional meaning).** Meaning **flows downward** only: Kernel → Extention patterns → Context → Instance. No stratum may redefine a higher stratum’s term; it may only **specialise** or **bridge** it.

**V‑2 (Strata vs authoring stances).** The four lexical strata above constrain **tokens**. They are independent of an artefact’s **stance** (its `CtxState` pins such as `DesignRunTag`, `ReferencePlane`, and `Locus`). Strata answer “what words mean here”; stance answers “where this claim lives in the flow” and which evidence‑lane expectations apply.

**V‑3 (Citation style).** When a Context term is used, its **Context** must be visible at first mention (e.g., `OwnerRole:ITIL_2020`). If an author needs Cross‑context reuse, they **MUST** cite a **Bridge** with a stated **Congruence Level (CL)** (see F.9).

**V‑4 (Firewall).** Tooling/Pedagogy idioms shall not leak into Kernel prose (DevOps Lexical Firewall). CI/CD jargon, file formats, or API names **MUST NOT** appear in Core definitions. (Pedagogy may use them **as examples** only, in the **Plain** register, with Tech anchors present.)
## Ontology Guards

### Tech register ontology guards

> **Purpose.** This section stabilises the Tech register of the kernel lexicon by enforcing head‑anchored naming, explicit *object‑of‑talk*, I/D/S morphology, disciplined treatment of **Role / Holder**, and Domain usage consistent with **D.CTX** and **UTS**. It aligns with **F.4 Role Description (RCS/RSG)**, **F.11 Method Quartet Harmonisation**, and **F.17 UTS**. **Scope:** Guidance is **register‑agnostic** and applies to the whole FPF; examples are illustrative and MUST pass Minimal Generality & Domain Anchoring (MG-DA) and other rules of lexical governance pattern E*. This guidance applies to kernel and non‑kernel components (including Part G and patterns in Part C) and SHOULD be reused across extensions.
> 
**Onto1 — Head‑anchoring**  *(use Kernel heads + pass LEX.TokenClass / I/D/S gates)*
* **Rule:** The **head noun of a term MUST explicitly signal the kind** (`System`, `Holon`, `Role`, `Work`, `Episteme`, `Tradition`, `Lineage`, `Characteristic`, `Method`, `Profile`, `Description`, `Spec`, `Flow`, `Card`, `Pack`, `Dashboard`, …).
* **Figurative heads** with obvious overload (“Tradition”, “family”, “process”, “function”) are **forbidden in the kernel**. Use **plain twins** only with a 1:1 Tech mapping and declare **`LEX.TokenClass`** for the Tech token. They **MAY** appear **only in the Plain register** as 1:1 twin‑mappings to a Tech token, but **MUST NOT** appear in the Tech register. Plain language should minimise lexical error from overloaded terms; use plain‑twin lexical guards.
  * **Do:** `IncidentDashboard`, `MethodSpec`, `TraditionProfile`, `FlowDescription`.
  * **Don’t:** `IncidentBoard`, `TDD Tradition`, `Production Process` (kernel), `Service Function` (kernel).

 **Onto2 — I/D/S on the surface (Intension/Description/Specification morphology)**  *(ref. E.10.D2)*
* **Rule:** Any **intensional** object is a bare head: `Method`, `Tradition`, `Characteristic`. Any **description** appends **`…Description`**: `MethodDescription`, `TraditionDescription`. Any **testable specification** appends **`…Spec`** and presupposes acceptance criteria and harnesses (normative in **E.10.D2**). E.g., *Algorithm* is a species of `MethodDescription` for a computer (a system in the role of information transformer); **If** expressed in a formal language **and** bundled with acceptance tests, it is **`MethodSpec`** (per **F.11**). **If** expressed as pseudo‑code, it is **`MethodDescription`**.
* **Extension:** Apply the same pattern to non‑method objects where appropriate: `FlowDescription`/`FlowSpec`, `SystemDescription`/`SystemSpec`.
* **Do:** `SamplingMethod` - `SamplingMethodDescription` - `SamplingMethodSpec`.
* **Don’t:** `SamplingAlgorithm` (when it is just prose), `SamplingProcessSpec` (head not signalling kind).

**Onto3 — Roles, Holders, and Carriers (holonic)**  *(ref. F.4 / F.5)*
* **Rule:** The playable intention is named **`…Role`** and described through **F.4 Role Description** (RCS/RSG), e.g., `SafetyOfficerRole`, `ReviewerRole`. The party **assuming a role** is the **Holder**. Use the **`Holder#Role:Context`** pattern to type the assumption (where `Context` is a `U.BoundedContext`), e.g., `Team‑Alpha (U.Holon) is Holder#SafetyOfficerRole:Plant‑Ops`. **Carrier** is **reserved for a system that bears a symbol of episteme** (`U.Episteme`, `Tradition`, `Lineage`, `Profile`, repertoire) **independent of any concrete role assumption**, e.g., `LeanTraditionCarrier`, `CalibrationLineageCarrier`. Avoid **`Artefact`** as a head in the kernel: it is ambiguous between a Carrier (e.g., document), a system “made by” some transformer, or an episteme abstracted from its carrier.
* **Register note:** Job titles (`Reviewer`, `Owner`, `Lead`) belong in the **Plain** register and MUST twin‑map to explicit Tech `…Role` tokens.
* **Why:** This resolves the inconsistent “role carrier vs role holder” usage: **use “Holder” for holonic role assumption**, keep **“Carrier”** for the *system that bears a symbol of episteme*. 
* **Migration note.** Legacy `…CarrierRole` **MUST be rewritten** to `Holder#…Role:Context`. Use SCR‑LEX to enforce the rewrite.
* **Do:** `ReviewerRole` (or `AssessorRole`), `Holder#ReviewerRole:Journal‑Issue‑42` (or `Holder#AssessorRole:Procurement‑Lot‑42`); `LeanTraditionCarrier (U.Holon)`, independent of any particular role.
**Don’t:** `Reviewer` (as a kernel type), `ReviewerCarrier` (to mean a role holder), `SystemReviewer` (role collapsed into a type).

**Onto4 — Domain only as a catalog mark**  *(ref. E.10.D1 D.CTX; publish stitching on UTS)*
* **Rule:** `Domain` is **not a kernel kind** and carries **no semantics, inheritance, or reasoning rights**. It is a **catalog mark** that groups several `U.BoundedContext` entries.
* **Required stitching (see D.CTX & UTS).** Any use of `Domain` **MUST** present: 1. the enumerated list of `ContextId` in **D.CTX**, and 2. the corresponding **UTS strings** (F.17) with twin labels.
* **“Discipline ≠ Domain.”** _Domain_ labels are **catalog‑only (D.CTX + UTS)**; **Discipline** is a **CG‑Spec‑governed holon** (`U.Discipline`). Cross‑use requires **Bridge (F.9) + CL**; **LexicalCheck** MUST fail texts that equate Domain with Discipline.
* **Governance.** **No “Domain … governance”.** Rules of comparability/aggregation belong to **Discipline/CG‑Spec** (ComparatorSet, ScaleComplianceProfile (SCP), MinimalEvidence, Γ‑fold, CL‑routing), *not* to `Domain`. Prefer `DomainFamily` + stitching over inventing new “Domain” types.
* **Do:** `DomainBundle: ClinicalSafety → {ContextId: AdverseEvents, DeviceLabelling, …} + UTS twins`.
* **Don’t:** `ClinicalSafetyDomain` as a type with inheritance; `Domain Governance` sections in Tech.

**Onto5 — Always state the **object‑of‑talk**
* **Rule.** The definition or first line of a gloss **MUST state what the term is about**: a `U.Holon`/`U.System`, a `U.Episteme` (`Tradition`, `Lineage`, `Profile`), a `Role`, a `Work` execution, a `Characteristic`, or a `Carrier`.
* **Do:** “**Object‑of‑talk:** `ReviewerRole` — a role intention playable by a holon within an editorial context.”
* **Don’t:** “Reviewer — a person who …” (blurs kind and object‑of‑talk).

**Onto6 — Bans and canonical rewrites**  *(mirror E.10 § 9 L‑rules; do not duplicate tables)*
* `process / function / activity` → **`Work` / `MethodDescription` / `Flow`** (context‑dependent).
* `Tradition` → **`Tradition`** (Tech); leave “Tradition” only as a Plain twin with an adjacent Tech label.
* `domain` → **`DomainFamily` + {ContextId list} + UTS twins**.
* legacy `…CarrierRole` → **`Holder#…Role:Context`**.
* ambiguous `Owner` in role names → prefer **`StewardRole` / `CustodianRole` / explicit responsibility head**.
* job titles (`owner`, `lead`, `champion`) in the kernel → **use explicit `…Role` names**; keep titles in Plain with twin‑labels.
* **Do:** `FlowDescription: ReturnsHandling`, `Tradition: Test‑Driven`, `Holder#CustodianRole:Asset‑Ledger`.
* **Don’t:** `Returns Process`, `TDD Tradition` (kernel), `Ledger Owner` (underspecified).

**Worked mini‑examples across arenas**
1. **Software engineering:** `BuildFlowDescription`, `CIHarnessSpec`; `Holder#MaintainerRole:Repo‑X`. Avoid `Build Process`, `Repo Owner`.
2. **Applied research / experimentation:** `SamplingMethodSpec`, `CalibrationLineageCarrier`; `Holder#ReviewerRole:Grant‑Call‑Y`.  Avoid `Sampling Algorithm` (if prose), `Lab Owner`.
3. **Production / service management:** `ShiftWork`, `SafetyOfficerRole`; `Holder#SafetyOfficerRole:Plant‑Ops`.  Avoid `Safety Officer` as a type, `SafetyDomain Governance`.
4. **Operations research / optimisation:**  `RoutingMethodDescription`, `CostCharacteristic`; `Holder#ModelStewardRole:OR‑Program`.  Avoid `Routing Function`, `Model Owner`.
5. **Healthcare / clinical ops:** `CarePathwayFlowDescription`, `MedicationAdministrationWork`; `Holder#AttendingPhysicianRole:Ward‑12`. Avoid `Care Process`, `Ward Owner`.
6. **Finance & accounting:** `ReconciliationMethodSpec`, `JournalPostingWork`; `Holder#TreasuryStewardRole:Liquidity‑Book`. Avoid `Reconciliation Process`, `Account Owner` (underspecified).
7. **Legal / compliance:** `RetentionPolicySpec`, `InvestigationWork`; `Holder#DataProtectionOfficerRole:Org‑X`. Avoid `Compliance Function`, `Data Owner` (underspecified).
8. **Cloud / IT operations:** `IncidentFlowDescription`, `RunbookMethodSpec`; `Holder#OnCallEngineerRole:Service‑Y`. Avoid `Incident Process`, `Service Owner` (underspecified).
9. **Logistics / supply chain:** `PickingWork`, `RoutingMethodSpec`; `Holder#DispatcherRole:Hub‑Z`. Avoid `Picking Process`, `Fleet Owner`.
10. **Construction / civil engineering:** `PermitAcquisitionFlowDescription`, `InspectionMethodSpec`; `Holder#SiteStewardRole:Project‑Lot‑17`. Avoid `Inspection Process`, `Site Owner`.
11. **Emergency response:** `TriageMethodDescription`, `EvacuationFlowDescription`; `Holder#IncidentCommanderRole:Event‑R`. Avoid `Triage Function`, `Incident Owner`.
12. **Agriculture:** `IrrigationFlowDescription`, `SoilSamplingMethodSpec`; `Holder#FieldStewardRole:Plot‑17`. Avoid `Irrigation Process`, `Field Owner`.

**Checklist before minting a KernelToken**
* Head noun signals kind (Onto1).
* I/D/S morphology correct (Onto2).
* If role‑related: **Role vs Holder vs Carrier** separation observed; holonic scope explicit (Onto3).
* Any Domain mention stitched to D.CTX and UTS; **no norms on Domain** (Onto4, Onto6).
* Object‑of‑talk declared (Onto5).
* SCR‑LEX rewrites checked / legacy forms migrated (Onto6).
> **Note on registers.** Keep figurative or business‑casual terms in the **Plain** register only, with strict **twin‑label** links to the Tech token (LEX‑BUNDLE). In the **Tech** register, speak in KL‑CAL: **episteme‑about‑epistemes** (Tradition, Lineage, Profile), not in catalogue‑admin idioms.

* **Onto‑Deon — Deontic lexicon guard (Core register)**  
**Rule.** In the Conceptual Core, avoid using **“Standard”** as the head noun of an *intensional object* name unless the object is an explicit **deontic speech-act** under the **Gov** lens (cf. E.3).

For interface/boundary invariants and public commitments of **things** (holons, interfaces, ports), prefer intensional names like **InterfaceContract**, **ComplianceProfile**, **AcceptanceSpec**, **InteropProfile**, etc.

Use the word **standard** for an **artefact** (Description/Specification) that is *intended to be complied with* (and that has explicit compliance checks).

If an intensional object is currently named `… Standard`, rename it to a proper intensional name, and (optionally) add a separate Description/Specification artefact that contains the standard text and the intended compliance checks.
 **Rewrite hints (Tech → Tech).**  
 `publication Standard` → `publication standard`;  
 `frame Standard` → `frame standard`;  
 `measurement Standard` → `measurement standard`;  
 `Method Interface Standard (MIC)` → `Method Interface Standard (MIS)` *(alias acceptable during transition)*;  
 `Boundary‑Inheritance Standard (BIC)` → `Boundary‑Inheritance Standard (BIS)` *(alias acceptable during transition)*.  
 **Rationale.** Keeps Core prose centred on **intensional objects** and their boundary invariants; reserves deontic obligations for governance contexts and **U.PromiseContent**‑like promises. Do **not** misuse “plane”: deontic speech‑acts are analysed via the **Gov** lens, while **ReferencePlane** remains `{world | concept | episteme}`.
## Twin‑Register Discipline (Tech / Plain)

**Plain twin (LEX).** A registry entry pairing the **authoritative Tech label** with a **display‑only Plain label** for one `U.Type` **in one `U.BoundedContext`**; governed by **PTG (Plain Twin Governance; in the LEX registry)** and referenced by `Twin‑Map ID (LEX)`. *“Plain twin” ≠ the **Plain register** (the register is where twins may be used; the twin is the 1:1 mapping).*
**Convention.** In this spec, **Plain** (capitalized) names the register; **plain twin** (lowercase) names the 1:1 mapping entry.

> **Rule R‑0 (Registers).** Every Kernel and Extenstion patterns concept has a **Tech label** (the testable semantic token) and an optional **Plain label** (didactic synonym). The **Tech label is authoritative**; the Plain label is permitted *only* in expository text and must map 1:1 to the Tech meaning inside the current **Context**.

### Allowed pairs (normative table; examples)

| **Tech (authoritative)** | **Plain (didactic)**                        | **Notes & guards**                                                                           |
| ------------------------ | ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `U.System`               | system, machine, team                        | Bare “service” is **never** a safe Plain twin for `U.System`; treat it as an **always‑unpack** token (L‑SERV, A.6.8). Avoid “service‑instance”; prefer “system instance”, “service access point”, or “service offering” depending on facet. |
| `U.Episteme`             | body of knowledge, document, dataset, model | Pair must respect **Carrier vs Content** (A.7).                                              |
| `U.Method`               | how‑to, procedure (abstract)                | Do **not** call this “process” (L‑PROC).                                                     |
| `U.MethodDescription`    | recipe, SOP, playbook, code, spec‑text      | If testable, call out **Spec** explicitly per E.10.D2 (I/D/S).                               |
| `U.Work`                 | run, execution, activity, job, case         | Never use “process” or “procedure” here.                                                     |
| `U.Role`                 | role, hat, mask                             | Always **context‑indexed** per D.CTX.                                                        |
| `U.PromiseContent`              | promise, offering, service offering         | Never equate to provider system or API (L‑SERV).                                             |
| `U.Capability`           | ability, capacity (within bounds)           | Separate from Role/Method/Work; must carry **envelope & measures**.                          |
| `U.Dynamics`             | law of change, model of evolution           | Not a capability or a method.                                                                |

**R‑1 (Plain first‑use).** At first use in a section, show **Tech label** and (optionally) the Plain twin: *“…a `U.Method` (the **how‑to**), described by a `U.MethodDescription` (the **recipe**) …”*
**R‑2 (No unpaired Plain in CC).** Conformance Checklists must use **Tech labels** only.

Domains can mint aliases inside their `U.BoundedContext` glossary; all aliases must map 1:1 to a Tech label (**SenseCell** row in the Context’s **Concept-Set Table**), and if exported across Contexts, via an **Alignment Bridge** (with **CL/Loss**).

 Make “plain twins” (reader‑friendly labels) **safe by construction**, not just style. The plain twin must **not** change kind, scope, or reader expectations versus the canonical Tech name; it is **display‑only** and **context‑local**.

* **Tech name (tech)** — the canonical, kernel‑conformant label used in **normative** clauses (e.g., `U.RoleAssignment`, `TransformerRole`).
* **Plain twin (plain)** — a didactic **display alias** permitted in **expository** prose and UI surfaces **inside one `U.BoundedContext`**.

> **Principle:** *Meaning lives in the Tech name; the plain twin may never move meaning.* (Locality is enforced by `U.BoundedContext` and Bridges.)
### Plain Twin Safety constraints (normative)

**CC‑TWIN‑1 - One‑to‑one & local.**
Each Tech name has **at most one** plain twin **per `U.BoundedContext`**; the same plain twin **MUST NOT** point at more than one Tech name in the same Context.

**CC‑TWIN‑2 - Sense‑equivalence proof.**
A plain twin **MUST** bind to the **same SenseCell** as its Tech name in that Context (F.3/F.7). Authors **MUST** record at least one **counter‑example test** showing how the twin could be misread and why it still passes **in this Context** (SenseCell notes).

**CC‑TWIN‑3 - Head‑term discipline (HND).**
The plain twin **MUST** preserve the **head term** of the Tech name, or append an explicit bracketed head on **first use**:

* Roles keep **“(role)”**, Services keep **“(service)”**, Methods keep **“(method)”**, Work keeps **“(work record)”**, Capability keeps **“(capability)”**.
  *Examples:*
  `TransformerRole` → “**Transformer (role)**”,
  `U.PromiseContent` → “**Service (service)**”,
  `U.Work` → “**work (work record)**”.

**CC‑TWIN‑4 - Kind‑consistent.**
A plain twin **MUST NOT** map across **Kinds** (C.3). If the twin’s everyday reading could denote a different Kind (e.g., *Tradition* = organization, corpus, domain), it is **forbidden** unless qualified by a bracketed head and **Context gloss** on first use (see CC‑TWIN‑7).

 **CC‑TWIN‑5 - Ambiguity stop‑list.**
The following base nouns are **reserved** and **MUST NOT** be used as unqualified plain twins: *Tradition, service, process, function, model, system, method, standard, library, dataset, evidence, activity, task, action*.
They are allowed **only** with an explicit head per **CC‑TWIN‑3** and a **Context gloss** (CC‑TWIN‑7). *(This list MAY be extended in the registry.)*

**CC‑TWIN‑6 - No cross‑context by label.**
Plain twins are **not portable**. Reuse in another `U.BoundedContext` requires a **Bridge** with CL and loss notes; names alone carry no authority.

**CC‑TWIN‑7 - First‑use gloss.**
At first occurrence in a document or screen, a plain twin **MUST** be shown as **“Plain twin \[Tech name] — Context gloss”**, e.g.:
“**Transformer (role)** \[**TransformerRole**] — *mask borne by a system to enact a method step in OR\_2025*”.

**CC‑TWIN‑8 - Normative surface ban.**
Plain twins **MUST NOT** appear in **Conformance Checklists, predicates, type signatures, or acceptance clauses**. Only Tech names are normative. (Plain twins are strictly didactic.)

**CC‑TWIN‑9 - Twin budget.**
**At most one** plain twin per Tech name per Context. Synonym piles are prohibited (control vocabulary sprawl; see F.14).

**CC‑TWIN‑10 - Registry entry & DRR.** 
Every plain twin **MUST** have a **registry entry** (in the LEX registry) recording: `tech`, `plain`, `context`, `head`, **SenseFidelity = {3,2,1,0}**, ambiguity notes, counter‑examples, DRR id. Any change requires a **DRR**. 

**CC‑TWIN‑11 - Tests.**
 Twin entries **MUST** pass the **Twin Harness** (see F.15): *Head term*, *Kind consistency*, *SenseCell match*, *Stop‑list compliance*, and *First‑use gloss*.
## Minimal Generality & Domain Anchoring (MG-DA) — names neither parochial nor vacuous

> **Principle (MG-DA).** A minted name is **as general as necessary and no more**, and its **head noun is anchored to the object‑of‑talk**. First classify the **NameToken (name of a concept: term, lexical unit) itself** using **`LEX.TokenClass`**, then apply the guardrails corresponding to that class: kernel tokens must unify **across domains**; discriminator/context tokens must make the **domain legible** *from the name itself*. Names too general to have obvious domain are **banned**.

### LEX.TokenClass (meta‑lexical; not a USM Scope)

**Definition.** `LEX.TokenClass : NameToken → {KernelToken | ContextToken | DiscriminatorToken}`.  
This is a **Characteristic on NameTokens** (symbols), used by the LEX registry and MG-DA checks.
It is **not** a USM scope and carries **no** truth/validity semantics.
### KernelToken — Minimal Generality (MG‑K)

**MG‑K1 (Tri‑domain witness, MUST).** Maintain a DRR/Glossary note with **≥ 3 heterogeneous arenas** where the invariants hold (e.g., manufacturing, healthcare, cloud ops). If you cannot, narrow to a Context name or move qualifiers into **RCS** (Role Characterisation Space).
**MG‑K2 (No parochial nouns, MUST).** Kernel names **MUST NOT** contain domain nouns (*Ticket, Microservice, Patient, Developer*). Such nouns belong in **Context** or as **RCS Characteristics**.
**MG‑K3 (No vacuity, MUST).** Avoid vacuous heads (*Thing, Event, Process, Resource*). Use existing kernel heads (`U.Holon`, `U.Work`, `U.Method`, `U.Resrc`, …).
**MG‑K4 (Intent over mechanism, MUST).** Kernel type/role names encode **intent**, not mechanism. Mechanisms (algorithms, hardware form, recipe flavors) live in **RCS** or **Capability**.
**MG‑K5 (Notation independence, SHOULD).** The intensional meaning is separable from any one notation/toolchain.
**MG‑K6 (Refactoring safety, MUST).** If a name fails MG, do **not** mutate it silently. Record a DRR and apply F.13 **Lexical Continuity & Deprecation** (aliases; Bridges for Cross‑context mappings).
### DiscriminatorToken / ContextToken — Domain Anchoring (DA‑D)

**DA‑D1 (Object‑of‑talk anchoring, MUST).** The head noun names the **object being classified** (e.g., *Sense*, *Context*, *Role*, *Bridge*, *Characteristic*). Readers can answer “**X of what?**” without external context.
**DA‑D2 (Characteristic, not axis, MUST).** Enumerated properties are named as **Characteristic**  within a **CharacteristicSpace** (MM‑CAL). Avoid spatial metaphors (*axis, dimension, plane, lane, tier, layer*) unless the metaphor is a **pattern‑defined primitive** in this spec.
**DA‑D3 (Enum clarity, MUST).** If the term denotes an enumeration, (a) the value set is **small and closed**, (b) membership criteria are obvious from the definition, (c) the **object‑of‑talk** is explicit in the name (e.g., `SenseFamily`, not bare *Family*, *RowPlane* or overly general *Facet*).
**DA‑D4 (Anti‑recipe, MUST).** Do not bake *how‑to* or local methods into discriminator names; those belong in `U.Method/MethodDescription` or **Capability**.
**DA‑D5 (Mapping discipline, MUST).** Cross‑context readings go through a **Bridge** (F.9). Discriminator names must not suggest global identity.
**DA‑D6 (Register discipline, SHOULD).** Keep normative tokens stable; synonyms live in **Plain** register only and must not appear in constraints/tests.
**DA‑D7 (Ban generic combinators, MUST).** Reject vague composites like *NameUseMode*, *NamingScope*, *RowFacet/RowPlane/RowLane*. Each candidate must pass **DA‑D1** and **DA‑D3** (object‑anchored head and explicit **CharacteristicSpace**).
### Global tests (apply after 7.2/7.3)

**MG-DA‑T1 (Three‑arena witness).** If **`LEX.TokenClass`(t)=KernelToken**, you **MUST** provide the tri‑domain witnesses (7.2‑MG‑K1). Otherwise this is **SHOULD** (document at least one contrasting arena).
**MG-DA‑T2 (Object‑of‑talk).** The head noun uniquely signals the subject area; avoid free‑floating metaphors. **MG-DA‑T3 (Anti‑recipe).** Remove mechanism/implementation words; relocate to Method/Capability/RCS.
**MG-DA‑T4 (Enum clarity).** For enumerations, list the closed value set and its CharacteristicSpace.
**MG-DA‑T5 (Collision & Uniqueness, MUST).** Before merge, run a **full‑text search** over the corpus and the **Reserved‑Names registry**. The candidate **MUST NOT** collide with any existing token used in another sense anywhere in FPF. If a collision exists, either rename or raise a DRR to deprecate the prior token.
**MG-DA‑T6 (Teaching swap).** In didactic prose (E.10.D2), the term can be swapped in **without caveats**. 
**MG-DA‑T7 (Intensional ground, MUST).** The definition card states the intensional criterion for membership explicitly; reviewers can check membership without reading external narrative.
### Compatibility with USM (how tokens and scopes meet)

**USM applies to acts, not tokens.** Mint/rename/use are **LexicalActs** that carry a USM scope. `LEX.TokenClass` constrains **where** a token may be used via an **AllowedScopes** policy:
**Conformance rule.** For any usage `u` of a token `t`: `LEX.TokenClass(t)=c  ⇒  USM.Scope(u) ∈ AllowedScopes(c).`

The LEX registry defines `AllowedScopes(c)` (e.g., `KernelToken` usage in normative kernel constraints is allowed; in Plain register outside a glossary is restricted; Context emissions of `KernelToken` require a Bridge/alias, etc.).

**Audit.** Violations are flagged as **SCR‑LEX‑Sxx** (see acceptance tests below).
### Metaphor guidance (non‑binding heuristics)

Prefer **object‑anchored heads** to metaphors. If a metaphor is unavoidable, ensure it is (a) explicitly defined by a pattern here, and (b) unambiguous within the **NameClass**. Example families (use sparingly):
* **Progression metaphors** (*level, tier, ladder*): only where a **gate/upgrade** is defined by the pattern.  
* **Separation metaphors** (*lane, track*): only where parallel, non‑interfering flows are enforced by rules.  
* **Grouping metaphors** (*family, class*): only for **small, closed enumerations** attached to a clearly named object‑of‑talk (e.g., `SenseFamily` rather than bare *Family*).
### Short‑form and acronym discipline

**SF‑1 (First expansion, MUST).** On first use, expand the term; place the short‑form in parentheses (e.g., “Minimal Generality & Domain Anchoring (**MG-DA**)”).  
**SF‑2 (Uniqueness, MUST).** Register short‑forms in the **Reserved‑Names** list; run the collision check (7.4‑MG-DA‑T5).  
**SF‑3 (Form, SHOULD).** Prefer typographic separators (**MG-DA**) to fused acronyms (**MGDA**). Use the fused form only in code or identifiers where punctuation is disallowed, and only after registration.
### Examples (illustrative, canonical)

Prefer **`U.PromiseContent`** (promise) over *BusinessService*; **`U.Capability`** over *Function*; **`U.Dynamics`** over *NaturalProcess*; **`U.WorkPlan`** over *ScheduleProcess*.  
Do **not** mint *ETLService* at kernel level—model ETL as `MethodDescription`; the **Service** is “data delivered under acceptance.”
### Acceptance & regression checks (LEX/USM)

**SCR‑LEX‑S01 (TokenClass declaration).** Every normative token has a declared `LEX.TokenClass`.
**SCR‑LEX‑S02 (Collision & uniqueness).** Full‑text + Reserved‑Names check passes (no other meaning in FPF).
**SCR‑LEX‑S03 (Object‑of‑talk anchoring).** Heads name the object classified (DA‑D1).
**SCR‑LEX‑S04 (CharacteristicSpace).** Enumerations declare their value set and space (DA‑D2/3).
**SCR‑LEX‑S05 (USM compatibility).** For each LexicalAct, `USM.Scope ∈ AllowedScopes(LEX.TokenClass)`.
**SCR‑LEX‑S06 (Slot/Ref suffix discipline).** Any token with suffix **`…Slot`** or **`…Ref`** is either (a) a **SlotKind**/**RefKind** declared under A.6.5, or (b) a episteme field whose type is a RefKind; no ValueKind or other type class may end with these suffixes.
**SCR‑LEX‑S07 (Manifest `provides` covers SlotKinds/RefKinds).** If a `SignatureManifest` is present (A.6.0), its `provides` list MUST include any public **SlotKinds** (`…Slot`) and **RefKinds** (`…Ref`) introduced by that signature/mechanism (in addition to types/relations/operators), so SD/lexical linters can treat them as exported API surface.
**RSCR‑LEX‑E01 (Banned generics).** Reject tokens matching the banned combinators list (DA‑D7).
**RSCR‑LEX‑E02 (Metaphor hygiene).** If a metaphor is used, show the pattern that defines it; otherwise rename.
**RSCR‑LEX‑E03 (Strategy token minting).** Reject new Kernel tokens named **Strategy**/**Policy** as kinds; model them as **lenses/flows/compositions** inside **G.5** or as **…Description/…Spec** in Contexts. (Prevents kernel overloading; aligns with C.22 “no minted Strategy head”.)
## Morphology & Lexical Form (LEX.Morph)

> **Principle.** Form follows **object‑of‑talk**. A token’s morphology (suffix/prefix/casing) must (a) express **what kind of thing** it names, (b) respect **MG-DA** (Minimal Generality & Domain Anchoring), and (c) pass **LEX.TokenClass** gates:
> `LEX.TokenClass(token) ∈ {KernelToken | ContextToken | DiscriminatorToken}`.
> Morphological choices never override **I/D/S layers** or **CHR\:ReferencePlane** semantics.

### Casing & basic forms

**M‑0 (Casing and categories).**
Types & role kinds: **UpperCamelCase** (`IncisionOperatorRole`, `MethodDescription`).
Relations/verbs: **lowerCamelCase** (`performedBy`, `isExecutionOf`, `bindsMethod`).
IDs/instances: **flat with delimiters** (context‑defined) but never collide with type forms (e.g., `W#Seam134`, `ctx:Hospital.OR_2025`).
**Register discipline:** normative tokens use the Technical register; Plain synonyms are allowed in prose only, never in constraints.
### Reserved suffixes (gated by LEX.TokenClass and I/D/S)

> **Use tables as a whitelist.** Rows indicate **when** a suffix is permitted and **what it means**. “Layer gate” prevents I/D/S confusion; “Examples” are illustrative.

| **Suffix**              | **Kind named** (object‑of‑talk)            | **Layer gate**                       | **LEX.TokenClass gate**         | **Examples**                                      | **Forbidden misuses (typical)**                                       |
| ----------------------- | ------------------------------------------ | ------------------------------------ | ------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------- |
| **`Role`**              | **Role kind** (intensional)                | I‑layer                              | KernelToken/ContextToken        | `TransformerRole`, `ApproverRole`                 | Appearing in BoM/mereology; mixing with run logs.                     |
| **`Method`**            | **Abstract way of doing** (recipe type)    | I‑layer                              | KernelToken/ContextToken        | `SteriliseInstrumentMethod`                       | Versioning on `Method` (version the `MethodDescription` instead).     |
| **`MethodDescription`** | **Recipe/description** (notation‑agnostic) | D‑layer                              | KernelToken/ContextToken        | `JS_Schedule_v4_MethodDescription`                | Calling it “process”; encoding runtime actuals here.                  |
| **`…Spec`**             | **Testable specification** (acceptance‑bound) | S‑layer                              | KernelToken/ContextToken        | `MethodSpec`, `FlowSpec`, `SystemSpec`            | Using “Spec” without acceptance tests/harness; putting runtime actuals here. |
| **`Work`**              | **Execution** (runs or kinds of runs)      | (run artefact; not I/D/S)            | KernelToken/ContextToken        | `SpeechActWork`, `W#Seam134`                      | Plans/schedules; design‑time recipes.                                 |
| **`WorkPlan`**          | **Schedule of intent**                     | D‑layer (plan artefact)              | ContextToken                    | `MaintenanceWorkPlan_Q3`                          | Logging actuals; claiming execution.                                  |
| **`Service`**           | **External promise object**                | I‑layer (Standarded intension)       | KernelToken/ContextToken        | `ObjectStorageService`, `PassportIssuanceService` | Naming teams/APIs as “Service”.                                       |
| **`Capability`**        | **System ability**                         | I‑layer                              | KernelToken/ContextToken        | `ScheduleGenerationCapability`                    | Mislabeling roles or methods as capabilities.                         |
| **`Dynamics`**          | **Law/model of change**                    | I‑layer                              | KernelToken/ContextToken        | `LotkaVolterraDynamics`                           | Using for abilities (`Capability`) or recipes (`Method`).             |
| **`Observation`**       | **Observation record/kind**                | (run artefact; not I/D/S)            | ContextToken/DiscriminatorToken | `VibrationObservation`                            | Mixing with `MethodDescription` or `Evaluation`.                      |
| **`Evaluation`**        | **Evaluation artefact**                    | D/S‑layer (epistemic episteme)              | ContextToken/DiscriminatorToken | `CalibrationEvaluation`                           | Using to name roles or methods.                                       |
| **`EvidenceRole`**      | **Role in evidence assembly**              | I‑layer (role kind)                  | KernelToken/ContextToken        | `WitnessStatementEvidenceRole`                    | Using as a generic “evidence”.                                        |
| **`Episteme`**          | **Epistemic knowledge unit** (structural)  | D/S‑layer                            | KernelToken/ContextToken        | `TraceabilityEpisteme`                            | Colliding with CHR **ReferencePlane** (never suffix “Plane”).         |
| **`System`/`Holon`**    | **Substantial entity**                     | I‑layer                              | KernelToken/ContextToken        | `AnesthesiaSystem`, `OrderFulfillmentHolon`       | Using to denote Context or run artefact.                              |
| **`Boundary`**          | **System boundary**                        | I‑layer                              | KernelToken/ContextToken        | `SterileFieldBoundary`                            | Using as a role or method.                                            |
| **`Objective`**         | **Target state**                           | I/D‑layer (depends on formalization) | KernelToken/ContextToken        | `HemostasisObjective`                             | Encoding acceptance tests here (put tests in Spec/MethodDescription). |
| **`Requirement`**       | **Obligation at acceptance**               | D/S‑layer                            | KernelToken/ContextToken        | `LatencyRequirement`                              | Using as a role or capability.                                        |
| **`BoundedContext`**    | **Context card**                           | (meta‑structural; not I/D/S)         | ContextToken                    | `ITIL_2020_BoundedContext`                        | Treating Context as domain; minting `U.*` inside a Context.           |
| **`Surface`**              | Publication/Interop surface (episteme)   | D/S-layer (publication)     | ContextToken                     | PublicationSurface, InteropSurface       | StructureSurface, MechanismSurface, selector-facing portfolio roster token miscast as Surface |
| **`Card`**                 | UTS/record unit (episteme)               | D-layer (publication)       | ContextToken                     | MethodCard, ExternalIndexCard            | Encoding runtime actuals; using as a ‘Service’  |
 
| **Suffix** | **Lexical class** | **Meaning / Ontology** | **Where it lives** | **Examples / Notes** |
|--- |--- |--- |--- |--- |
| **Space** | Intensional kind | A typed **state space** (finite product of Characteristic×Scale slots); no procedures | Kernel A.19; CHR/space consumers | `CharacteristicSpace`, `CreativitySpace`. Edition of a Space is a **phase** of the episteme that defines it. |
| **SpaceRef** | Pointer | Registry reference to a Space | Data fields / UTS | `CharacteristicSpaceRef`. Use **`.edition`** on the **Ref** when pinning a historical phase. |
| **Map** | Intensional kind (method) | A **mapping method** from subjects to coordinates in a declared Space (encoder/featurizer) | Kernel/Method family (I‑layer), described/spec’d via I/D/S | `DescriptorMap` (declares invariances, corpus typing). Not a record or file. |
| **MapRef** | Pointer | Registry reference to a **Map** | Data fields / UTS | `DescriptorMapRef`. Pin the method phase via **`DescriptorMapRef.edition`**. |
| **Def** | S‑layer alias (CG‑Spec family) | A **definition/specification artifact** that fixes a **formula** or **distance** over a space; *synonym of …Spec* **within CG‑Spec registries only** | Part G (CG‑Spec family) | `DistanceDef` ≍ `DistanceSpec`. Prefer **…Spec** in new normative prose; **…Def** retained where already published. |
| **DefRef** | Pointer | Registry reference to a **…Spec/…Def** | Data fields / UTS | `DistanceDefRef`. Use **`DistanceDefRef.edition`** to pin the exact formula edition. |
| **Spec** | S‑layer | Testable invariants bound to acceptance harnesses | E.10 & A.21 | For stable, testable definitions; **normative** by default; S‑layer, Spec‑gated | Use for normative calculi and scoring/normalization specifications. |
| **Slot** | Structural position | Named **argument position** in a relation/morphism signature (SlotKind in A.6.5) | Kernel A.6.0/A.6.5 | `DescribedEntitySlot`, `GroundingHolonSlot`. Always names a *position*; never used for ValueKinds or episteme fields. |
| **Ref** | Pointer | **Reference/identifier** to a registry item of some ValueKind (RefKind in A.6.5), not the thing itself | Data fields / UTS; RefKind types | `U.EntityRef`, `U.HolonRef`; episteme fields `…Ref : U.EntityRef`. Reserved for **RefKinds** and episteme fields typed as them; `…Ref` **never** carries content and is never used for ValueKinds or SlotKinds. |
| **Series** | Governance object | A **PhaseOf chain** (“editions”) for an episteme | Edition governance | `U.EditionSeries`. Holds immutability and provenance rules. |
| **.edition** | Attribute (on **Ref**) | The **phase id** of the **referenced artifact**; attaches to `…Ref`, not to the artifact’s name | Data fields / UTS | Use `XRef.edition`, **not** bare `XEdition` fields. Lower camelCase for keys. |

**Notes.**
• **Kernel‑only ban list** remains in § 8.3.
• **CHR guard:** the only token that may use the word *plane* is **CHR:ReferencePlane**.
• **Axis/dimension metaphors** are deprecated; use **Characteristic / CharacteristicSpace** where an enumeration is intended (see § 7).

**Not only suffix guard**
* Suffixes are strongly related to kinds and **should** be clearly guarded by MG-DA.
* Other morphemes (not only suffixes) also **must** respect kinds. For example, **Space is a geometric concept** — **never** use it as a suffix (`…Space…`) or other morpheme in beginning or in the middle of a term to name non‑geometric entities (e.g. prefer **Set/Kid/Kit** instead of **Space** where membership is intended).

**L‑SURF — disciplined use of *Surface* **
* **Definition.** *Surface* is reserved for **publication/interoperability surfaces** (UTS, shipping, interop) that present lawful, plane‑aware summaries for human/selector consumption. A **Surface is a bundle of views** (ISO 42010 sense) packaged for a stated **audience** and **purpose**, with declared **viewpoint**. Surfaces are **conceptual** (E.5.2); serialisations live in Annex/Interop. Surfaces package **D/S** projections produced via `Describe_ID` / `Specify_DS` (A.7) and do **not** change object ontology.
* **Allowed:** `PublicationSurface`, `InteropSurface` (G.10/G.13).  
* **Forbidden:** `StructureSurface`, `MechanismSurface`, any `…Surface` that denotes a structural, mechanistic or measurement object.  
* **Preferred alternatives:** use `…Boundary` (structural border), `…View` (publication view), or `…Card` (UTS record).

**L‑SPACE — disciplined use of *Space* **
* Use *Space* only for **CHR‑grounded measurement/state constructs** (e.g., `CharacteristicSpace` per A.19). Do **not** coin generic `…Space` for sets/portfolios or publication artefacts. Publish portfolios/archives as **sets** via lawful selectors; surface them on UTS as **views/cards**, not as spaces. 
* **Field‑name guard (Kernel blocks).** In **Kernel conceptual blocks** (e.g., A.6.0/A.6.1 lists), **do not** name a field `…Space`; reserve *Space* to the **types** (CHR/ReferencePlane families). Use **BaseType** as the field name and let the referenced `U.Type` carry `…Space` where appropriate; otherwise, for set‑valued universes, use `…Set`.
* Space is geomertic concept, neve use it even not as a suffix for naming non-geometric spaces (e.g. instead of Sets with membership)

**L‑ROLE — disciplined use of *Role***
* **Role** is always **Role Enactment for the `U.Holon`/`U.System` kind** (agentive use).
* **Param‑slot / relation‑endpoint guard.** Do **not** use the morpheme **`Role`** for **formal parameter positions** in operator algebra declarations (`OperationAlgebra`) or Signature arguments. Reserve **`Role`** for **agentive kinds** only (A.2/F.4/F.6). Prefer SlotKinds + SlotSpecs (A.6.5) to type formal slots; if a didactic list is useful, use a `ValueKindView` (name→ValueKind) projection derived from SlotSpecs/SlotIndex. Same for similar situations (table columns, tuple placements): use MG-DA with domain‑**specific** terminology, never “Role”.
### Forbidden suffixes & the DevOps, Data Governance and Repository-Workflow Lexical Firewall

**M‑F (Forbidden in Kernel tokens).** In KernelToken names, do **not** use: *…Function*, *…Process*, *…Task*, *…Activity*. These are ambiguous or vacuous—map using § 6 typing rules (often to `Method`, `MethodDescription`, or `Work`).

**M‑FW (Tool/file markers).** Tooling/file suffixes (*…API*, *…JSON*, *…YAML*, *…CI*, *…Kafka*, *…Postgres*) are **not** part of conceptual names. Place them in **Context** glossaries or operational configs (DevOps Lexical Firewall). Kernel names never carry tool/format/notation marks. It is pure conceptual, no data management and data governance intended.
### Prefix discipline

**M‑P1 (Reserved prefixes).** `U.` reserved for **Kernel types**; `Γ_` for algebraic operators; `CAL/LOG/CHR` for **pattern packages**. Never mint `U.*` inside a Context.

**M‑P2 (Edition markers).** Apply explicit edition/version markers to **Contexts** and to `MethodDescription` / `Service`—**not** to `Method` (e.g., `BPMN_2.0_BoundedContext`, `JS_Schedule_v4_MethodDescription`, `PassportIssuanceService_v2025`).  Authors MAY annotate Context or Service names for didactics.
**Norms (edition vs release vs version).**
1) **edition** — the **content phase** of an episteme (Concept/Object/Symbol where Symbol‑only notation swaps do not force a phase). Lives in `U.EditionSeries`. Never embedded in labels (see R‑RD‑7); bind via data: `…Ref.edition`. 
2) **release** — a **Work** of making a **Carrier** public; may carry tags/dates; does **not** change episteme identity or phase.
3) **version** — a **tooling/carrier** identifier (file/package/code). Use only in Tooling/Pedagogy families; not in Core names.

**Property discipline.** When a field pins a referenced artifact’s phase, write it as **`<Thing>Ref.edition`** (dot notation), never as a standalone `…Edition` key. E.g., replace `DHCMethodEdition` with `DHCMethodRef.edition`.
### Morphology tests (apply with § 7 MG-DA)

**M‑1 (Slot test).** The candidate fits **one** slot in the Strict Distinction lattice (Object ≠ Description ≠ Carrier; Role ≠ Method ≠ Work). If not, **rename** or split.

**M‑2 (Object‑of‑talk anchoring).** The head noun names the **object being classified** (Role/Method/Service/Work/Context/Characteristic). No free‑floating metaphors.

**M‑3 (Family congruence).** Where eligibility clarity is needed, add a **Context‑specific characteristic** (RCS) as a qualifier (e.g., `NormativeStandardRole`). Do **not** fake families with bare metaphors (no `RowPlane`, `senseFamily`, `…Lane`).

**M‑4 (Run vs design).** Use **`Work`** only for executions; use **`MethodDescription`** for recipes; never cross.

**M‑5 (Kernel parochiality).** KernelToken names carry **no domain nouns**; push domain markers to Context or RCS.

**M‑6 (Vacuity ban).** Avoid vacuous heads (*Thing, Event, Process, Resource*). Use established kernel heads (`U.Holon`, `U.Work`, `U.Method`, `U.Resrc`, …).

**M‑7 (Notation independence).** Intensional meaning survives notation/tool swaps.

**M‑8 (Collision & uniqueness).** Before merge, run **full‑text** + **Reserved‑Names** checks; the token must not collide with any other meaning anywhere in FPF (cf. § 7 MG-DA‑T5).
### Alias hygiene

Aliases live **only** inside a **Context Glossary** and map to **one** technical label with an **equivalence** note (≡). No global aliases.
### Compatibility with USM (acts vs tokens)

**LEX applies to tokens; USM applies to acts.** Mint/rename/use are **LexicalActs** that carry a USM scope (e.g., ClaimScope, WorkScope). LEX constrains **where** a token form may appear via **AllowedScopes** policies:

`LEX.TokenClass(t)=c  ⇒  USM.Scope(usage) ∈ AllowedScopes(c)`.

Example: using a `KernelToken` in a Context constraint may require a Bridge/alias; logging `Work` inside a MethodDescription violates M‑4 and the policy.
### Acceptance & regression checks (LEX/USM)

* **SCR‑MOR‑S01 (Suffix whitelist).** Every normative token with a reserved suffix matches § 8.1 row semantics and passes Layer gates.
* **SCR‑MOR‑S02 (Kernel bans).** KernelToken names contain none of the forbidden suffixes (§ 8.2).
* **SCR‑MOR‑S03 (Prefixes).** Reserved prefixes obey § 8.3; no `U.*` minted in Context.
* **SCR‑MOR‑S04 (Run/design gate).** `Work` appears only for executions; `MethodDescription` has no runtime actuals.
* **SCR‑MOR‑S05 (Collision).** Full‑text + Reserved‑Names checks pass (no other sense of the token elsewhere).
* **SCR‑MOR‑S06 (Object‑of‑talk).** Heads pass M‑2; no bare metaphors as heads.
* **RSCR‑MOR‑E01 (DevOps firewall).** Tool/file suffixes quarantined to Context; none leak into KernelToken names.
* **RSCR‑MOR‑E02 (USM compliance).** For each LexicalAct, verify `USM.Scope ∈ AllowedScopes(LEX.TokenClass)` (see § 7.5).
### Autonomy lexicon (L‑AUTO )

**Forbidden (Core):** bare “validity”, “actor/agent” (as free‑standing nouns), “kill switch”, “process” for behavior, “envelope” when used **as scope**.
**Use instead:** *Scope (G)* for epistemic scope; *WorkScope* for capability bounds; *RoleAssignment* for who acts; *SpeechAct* for overrides; *SafeStop* instead of “kill switch”.
**Named prefixes (policy & registry):**
* `aut:` for AutonomyBudgetDecl fields (e.g., `aut:action_tokens`, `aut:risk_bands`);
* `guard:` for guard checks bound to `AdmissibilityConditionsId`;
* `ovr:` for override SpeechActs (`ovr:PauseAutonomy`, `ovr:ResumeAutonomy`, …).

**Notes.**
1) Scope‑sensitive guards **must** declare the **Γ_time** window selector used for admission checks.
2) Proper names of patterns/components that already include “Agent/Agency” (e.g., *Agency‑CHR*, *Agent‑Tools‑CAL*) are permitted as **titled terms**; avoid re‑introducing “agent” as a free‑standing noun in new prose.
### LEX-CHR-STRICT — Reserve Characteristic for CSLC-measurable aspects

**Intent.** Prevent calling **non-measurable** objects (sets, statuses, scopes, policies, bridges, contexts, guards) “characteristics”.

**Rule L-CHR-S1 (Reservation).** Use **Characteristic** **only** for variables that **declare a CSLC scale** (nominal/ordinal/interval/ratio) with admissible values/units/polarity (Part C.16/A.17–A.18).  
**Rule L-CHR-S2 (USM).** `U.Scope` / `U.ClaimScope (G)` / `U.WorkScope` are **USM scope objects**, not Characteristics; they **must not** appear in any `CharacteristicSpace`.  
**Rule L-CHR-S3 (Status).** ESG/RSG statuses and deontic/epistemic statuses — **not Characteristics**; its statuses/states.  
**Rule L-CHR-S4 (Lexical classifiers).** Lexical classifiers/tags — **Facets**/**attributes**; do not name them as Characteristics, if not declared **CSLC**.
**Checks.**  
— **CC-L-CHR-1.** `scope characteristic(s)` is banned in Core/Context.  
— **CC-L-CHR-2.** `CharacteristicSpace` near `Scope` — error.  
— **CC-L-CHR-3.** Canonical rewrite: `F–G–R characteristics` → `F–G–R components`.
### LEX‑QA‑1 — Using “‑ility/‑ilities” terms (availability, reliability, …)

**Rule.** Tokens ending with **‑ility/‑ilities** or widely used quality names (**Availability, Reliability, Security, Safety, Scalability, Maintainability, Usability**, …) are **Quality‑Family labels**, not automatically CHR **Characteristics**.  

**Authoring choice:**  
— To use such a term as a **CHR** characteristic (axis), **bind** it to a **named `U.Characteristic` with one CSLC Scale** (A.18) and refer to that Characteristic in guards/UTS;  
— Otherwise **publish a Q‑Bundle** (see **C.25**) that includes **Measures (CHR)** (the measurable slots) and, where relevant, **Scope** (USM set over `U.ContextSlice`) and windows/mechanism/status fields.  

**Rationale.** Scope is **set‑valued** (USM) and **not** a CHR measurement; mechanisms/statuses are governance artefacts. Keeping them outside the CHR CSLC avoids illegal scalarisation and preserves set‑algebra semantics for scope.  (A.2.6 § 6.2; A.6.1; C.16/A.18).
## Canonical rewrites for overloaded words (LEX L‑rules; normative)

> **What this section does.** LEX L‑rules standardise **how we speak** in Core/Context by mapping overloaded everyday words to **canonical FPF concepts**.
> **What this section does not do.** It does **not** restate naming (see **§ 7 MG-DA**) or morphology/casing/suffix rules (see **§ 8 LEX.Morph**); it **depends** on them.
> **Guards.** Tokens are classified by **`LEX.TokenClass ∈ {KernelToken, ContextToken, DiscriminatorToken}`** (§ 7.1). Only **CHR:ReferencePlane** may use the bare word *plane*; I/D/S are **layers**; enumerations are **Characteristics** in a **CharacteristicSpace** **only when a CSLC scale is declared; otherwise treat such slots as non-measurable attributes (not Characteristics)**.

## Guarded-head cross-reference (normative lexical caution)

When one surface head already carries several load-bearing local readings, lexical cleanup should prefer a **guarded-head note** over silent flattening. The note may record that the head remains risky, name the lawful local owners, and point readers to the local canonical reading in each owner.

If cleanup reveals that no lawful existing token can carry the needed meaning, the editor must route the naming question through **F.18 `MintNew` / `DocumentLegacy`** rather than inventing an ad hoc synonym by feel.

This cross-reference is lexical only. It does **not** create a new repair owner, does **not** establish Cross-context equivalence, and does **not** overrule owner-local definitions. It simply keeps overloaded heads from being normalized into one false global reading.

`projection` is the main current example: `A.16` keeps it as a move name for route-bounded partialization, while `F.9.1` keeps it as a bridge stance label. E.10 therefore requires deconfliction notes and owner-explicit prose, not one umbrella rewrite that erases the distinction.
### Quick substitutions (common rewrite hints)

> Use these as quick rewrite hints; accept only if the transformed sentence passes **§ 7 MG-DA** and **§ 8 LEX.Morph** gates.

| **Ban**                         | **Canonical rewrite**                                                                   |
| ------------------------------- | --------------------------------------------------------------------------------------- |
| “the process owner approves”    | `SystemX#ApproverRole:Context` **performs a SpeechAct Work** “approve …”                |
| “the document enforces policy”  | `Policy_vN#RequirementRole:Context` **gates** Work; enforcement = **SpeechAct** + audit |
| “our service runs nightly jobs” | Nightly **Work** **claimsPromiseContent**(BatchProcessing); **promise content** defines acceptance     |
| “the API is the service”        | API = `accessSpec : MethodDescription`; **promise content** defines acceptance           |
| “capability assigned to team Y” | Team Y **plays** `Role`; the team (as system) **has Capability** C within envelope E    |
| “process health green”          | StateAssertion for `ObserverRole`/`Service` KPI **passes** acceptance window            |
| “function of component A fails” | **Work** performed by `SystemA#Role` **failed** acceptance (observations show …)        |
| “context is unclear here”       | **Name** the `U.BoundedContext`; else split and Bridge                                  |
### Acceptance tests (LEX‑AC)

A text **passes** LEX if all answers are **Green**:

1. **Context named.** Polysemous terms appear **inside a named `U.BoundedContext`** (or the page declares a local context card).
2. **Right layer.** I/D/S layer respected: types/roles on I; recipes/docs on D; actuals on runs (cf. § 8.1 gates).
3. **Promise vs ability vs performance.** `PromiseContent` (promise clause), `Capability` (ability), `Work` (performance) are not conflated.
4. **No anthropomorphism.** Documents/datasets/models do not “do”; **Systems** do.
5. **Scheduling hygiene.** No actuals on `WorkPlan`; all actuals live on `Work`.
6. **Cross‑context reuse.** Any reuse across Contexts cites a **Bridge id** with `kind/dir/CL/Loss/scope` (apply **A.6.9 (RPR‑XCTX)** when the surface prose uses “same/equivalent/align/map/…”).
7. **MG-DA ok.** New or refactored tokens pass **§ 7 MG-DA** (anchored head noun; collision check; CharacteristicSpace for enums).
8. **Morphology ok.** Suffix/prefix/casing respect **§ 8 LEX.Morph** (e.g., `…Role`, `MethodDescription`, `Work`, reserved prefixes).
9. **Banned tokens absent.** No *process/function/task/activity* in Kernel senses; no tooling/file suffixes in Kernel tokens.
10. **State gating present (when needed).** Readiness is expressed via **RSG state** + **StateAssertion**, not vague “approved/ready”.
### Coordination map (how LEX plugs into the rest of FPF)

* **With E.10.D1 D.CTX (Context discipline).**
  ULR–CTX‑1: Every Core meaning that can vary **names its `U.BoundedContext`**.
  ULR–CTX‑2: Same‑spelled labels are **distinct senses** across Contexts; reuse requires a **Bridge** (F.9) with CL & loss notes.

* **With E.10.D2 (I/D/S discipline).**
  Speak in the **right I/D/S layer**. ULR–IDS‑1..3 apply (types/roles = I; descriptions/specs = D/S; work/state assertions = evaluations/occurrences). Upgrades D→S only when **checkable acceptance** exists.

* **With A.2 / A.15 (Role–Method–Work alignment).**
  Role = **assignment**; Method = **way‑of‑doing**; MethodDescription = **documented recipe**; Work = **dated occurrence**. Sentences must keep this split.

* **With F‑cluster (Unification) & UTS (F.17).**
  Harvest in one Context → **SenseCell** → **Concept‑Set row** with relation (`≡/⋈/⊂/⟂`) and losses. UTS is the human‑readable roll‑up.

> **Acts vs tokens.** LEX applies to **tokens**; USM applies to **acts** (mint/rename/use). Conformance: `LEX.TokenClass(t)=c ⇒ USM.Scope(usage) ∈ AllowedScopes(c)` (see § 7.5).
### Conformance checklist (LEX‑CC)

1. **LEX‑CC‑1 (Bans).** Any banned token in Core/Arch fails unless the **canonical** appears (or the token is a registered Context alias).
2. **LEX‑CC‑2 (Context).** Each polysemous term names its **`U.BoundedContext`**.
3. **LEX‑CC‑3 (Layer/Morph).** Usage passes **§ 8** gates (suffix/prefix/casing) and I/D/S layer checks.
4. **LEX‑CC‑4 (Bridge).** Cross‑context reuse cites **Bridge id** and CL; same‑spelled labels without a Bridge are non‑conformant.
5. **LEX‑CC‑5 (MG-DA).** New tokens pass **MG-DA** tests, including **full‑text collision** and **Reserved‑Names** checks.
6. **LEX‑CC‑6 (Service & evidence).** Service acceptance computed from **Work**; evidence is an **EvidenceRole** on an **Episteme** with provenance.
7. **LEX‑CC‑7 (USM compatibility).** For each LexicalAct, `USM.Scope ∈ AllowedScopes(LEX.TokenClass)`.
8. **LEX‑CC‑8 (Minting discipline).** If overload cleanup requires a new or replacement token, the text records lawful reuse or a full **F.18 `MintNew` / `DocumentLegacy`** procedure; intuition-first partial Name Cards are non-conformant.
### Worked micro‑examples (short, cross‑domain)

**Factory.**
✗ “The **process** failed; the **service** restarted itself.”
✓ `PLC_17#ObserverRole:PipelineOps` logged **Observations**;
`CAB_Chair#ApproverRole:ChangeControl` **performed a SpeechAct** “approve restart”;
`OpsBot#DeployerRole:CD_Pipeline_v7` **executed Work** `RestartRun‑4711` which **claimsPromiseContent**(CoolingUtility);
post‑run **Evaluation** shows the **Service** acceptance **passed**.

**Cloud.**
✗ “The **process owner** approved; the **API service** deployed.”
✓ `ProductLead#AuthorizerRole:Rollout_2025` **performed a SpeechAct**;
`sCG‑Spec_ci_bot#DeployerRole:CD_Pipeline_v7` **performed Work** `Deploy‑F123`;
API = `accessSpec : MethodDescription#REST_v12`; **promise content** “Feature Access” declares acceptance; telemetry **Work** shows **fulfilPromiseContent**.

**Research.**
✗ “Dataset X **proves** the theory; the **process** is reproducible.”
✓ `DatasetX#ModelFitEvidenceRole:Theory_Context` **supports** claim C within scope S;
reproducibility via **StateAssertions** on `ReplicationEvidenceRole`;
procedures are `U.MethodDescription`; re‑runs are **Work**.

**Semioarchitecture.**
✗ “`projection` means the same thing in routing and bridge prose.”
✓ `A.16` keeps `projection` as a move name for route-bounded partialization; `F.9.1` keeps `projection` as a bridge stance label. If a new token is really needed, route the naming question through **F.18 `MintNew` / `DocumentLegacy`** rather than flattening both readings into one umbrella rewrite.

**Editorial note.**
This section **inherits** § 7 **MG-DA** (anchored head nouns; Characteristic/CharacteristicSpace for enums; collision checks) and § 8 **LEX.Morph** (suffix/prefix/casing). It deliberately **omits** their details to avoid duplication.  The only legitimate uses of *plane* in the Core are **CHR:ReferencePlane** and the derived operators **CL^plane** and **Φ_plane**; policy flags MUST NOT introduce new “planes”. To distinguish pre‑operational vs operational states *within* **ReferencePlane=world**, use **WorldRegime ∈ {prep|live}** (formerly `PlaneRegime`).
## Guarded-head cross-reference (normative lexical caution)

When one surface head already carries several load-bearing local readings, lexical cleanup should prefer a **guarded-head note** over silent flattening. The note may record that the head remains risky, name the lawful local owners, and point readers to the local canonical reading in each owner.

If cleanup reveals that no lawful existing token can carry the needed meaning, the editor must route the naming question through **F.18 `MintNew` / `DocumentLegacy`** rather than inventing an ad hoc synonym by feel.

This cross-reference is lexical only. It does **not** create a new repair owner, does **not** establish Cross-context equivalence, and does **not** overrule owner-local definitions. It simply keeps overloaded heads from being normalized into one false global reading.

`projection` is the main current example: `A.16` keeps it as a move name for route-bounded partialization, while `F.9.1` keeps it as a bridge stance label. E.10 therefore requires deconfliction notes and owner-explicit prose, not one umbrella rewrite that erases the distinction.
## Migration playbook — turning messy language into ULR‑clean prose (informative)

> A pragmatic **three‑pass** routine. Works with plain text, diagrams, or models; no tools required.

### Pass 0 — Pre‑flight (2 minutes per page)

0.1 **Name the Context card** you’re writing in (title, edition, scope note).
0.2 For every new or renamed token, **declare `LEX.TokenClass`** ∈ {KernelToken, ContextToken, DiscriminatorToken}.
0.3 Run **MG-DA pre‑check** (anchored head noun; no metaphor heads; if enum → declare its **CharacteristicSpace**).
0.4 Run **collision/uniqueness**: full‑text grep + Reserved‑Names registry (see § 7). If collides → rename or DRR deprecate.
### Pass 1 — Harvest in the Context

1.1 **Underline overloaded words** (*process, service, function, workflow, ticket, approval, spec, plan,* …).
1.2 For each, write a **one‑line intent** in Plain register (what object‑of‑talk is meant).
1.3 Mark any cross‑Context reuse candidates.
### Pass 2 — Map to Core anchors (mechanical)

2.1 Replace underlined words via **§ 9 L‑rules** table:
 • recipe → **`U.Method` / `U.MethodDescription`**
 • scheduled run → **`U.Work` / `U.WorkPlan`**
 • promise → **`U.PromiseContent`**
 • ability → **`U.Capability`**
 • actor‑mask → **`…Role / RoleAssignment`**
 • document/evidence carrier → **`Episteme`** with **`EvidenceRole/RequirementRole`**
2.2 Apply **LEX.Morph** (§ 8): suffix gates (`…Role/…Work/MethodDescription/Service`), casing, reserved prefixes.
2.3 Pass **I/D/S layer** check: types/roles on I; recipes/docs on D; actuals on runs.
2.4 Attach **Context tags** on first use; set **twin labels** (Tech/Plain) in the local Glossary.
### Pass 3 — Stitch & publish

3.1 Add **safe rewrites** for any anti‑patterns you found (use § 9.2 quick table).
3.2 If sameness is needed across Contexts, create a **Bridge** (F.9) with explicit `kind/dir/CL/Loss/scope` (apply **A.6.9 (RPR‑XCTX)** when the source text uses umbrella “same/equivalent/align/map/…” language).
3.3 Publish a one‑page **UTS** (F.17) for the Context (columns: Context, Tech label, Plain label, Kernel anchor, Warnings).
3.4 Log a short **DRR** when renames/aliases occur (F.13), linking to grep results that motivated the change.
## ULR conformance prompts (normative, concept-only questions)

> Use these **prompts** during review. They reference § 7 (MG-DA) and § 8 (LEX.Morph) instead of repeating them.

1. **Context prompt.** Does each potentially polysemous noun live inside a **named `U.BoundedContext`**?
2. **Layer prompt.** Is each sentence in the correct **I/D/S layer** (I: type/role; D: description/spec; run: actuals)?
3. **Token prompt.** For new/renamed tokens, is **`LEX.TokenClass`** declared and consistent with where the token appears?
4. **Head-kind prompt.** Does the **head noun** name what kind of thing the phrase is actually about (Role/Method/Service/Work/Context/Characteristic/publication artifact/reading/process/authority use)? A narrowing qualifier alone does **not** answer this question.
5. **Qualifier-burden prompt.** If an adjective, participle, genitive, or comparative modifier is doing semantic work, has that burden been restored explicitly rather than left inside the modifier alone?
6. **Comparison-axis prompt.** If the sentence compares, ranks, escalates, or downgrades something, is the comparison axis ontologically homogeneous after head-kind and qualifier restoration?
7. **Morphology prompt.** Do suffix/prefix/casing pass **LEX.Morph** gates (e.g., `…Role`, `MethodDescription`, `Work`)?
8. **Promise vs ability vs performance.** Are **Service** (promise), **Capability** (ability), and **Work** (performance) distinct?
9. **Plan vs execution.** Are **WorkPlan** windows separated from **Work** actuals?
10. **Evidence prompt.** Do documents **hold roles** and **justify**, while **systems act**?
11. **Bridge prompt.** If sameness spans Contexts, is there an explicit **Bridge** with **CL** and loss notes?
12. **Collision prompt.** Did we run full-text + Reserved-Names checks (no other meaning of this token anywhere in FPF)?
13. **Naming-procedure prompt.** If no lawful existing token carried the needed meaning, did we run the full **F.18 `MintNew` / `DocumentLegacy`** procedure rather than picking a label by intuition and filling a partial Name Card afterward?

**Working order for precision repair on load-bearing prose.** Restore the head kind first; a narrowing qualifier such as `comparative`, `safe`, `interactive`, or `reliable` does **not** by itself restore that kind. Then unpack qualifier burden, then check whether the comparison or escalation axis is homogeneous. Only after that may a later Plain, didactic, or coarsened rendering lawfully relax the sentence, and even then the more precise upstream reading must remain recoverable.
## ULR regression cues (concept-only “diff” triggers)

Re-review your prose when any of these happen:

* **Context edition** changes → re-affirm twin labels, Bridges, and acceptance wording.
* **A role/type name grows** (“and/plus/--”) → apply MG-DA: split or bundle (A.2).
* **A “service” statement broadens scope** → check that **acceptance** terms cover the new target; else split the Service.
* **Recipes gain/lose steps** → update **`MethodDescription`**, not `Service` or `Role` names.
* **Evidence verbs creep into actor sentences** → re-apply L-rules (documents do not act).
* **A generic head acquires a strong qualifier** (`comparative`, `safe`, `interactive`, `reliable`, and similar burden-carrying modifiers) → restore the head kind first, then unpack the qualifier burden before stronger publication.
* **New token minted** → ensure `LEX.TokenClass` declared; run collision checks; add CharacteristicSpace if enum.
* **Suffix drift** (e.g., `…Work` on a plan) → fix via **LEX.Morph**.
* **Cross-Context reuse by label** appears → require a **Bridge** (F.9) or split senses.
* **A guarded head needs a new label** → prefer a guarded-head note first; if no lawful existing token remains, route the naming question through full **F.18 `MintNew` / `DocumentLegacy`**.
## Teaching deck — the ULR quick card (reusable in any Context)

> **Say it cleanly, once (memorise):**
> **Role** = assignment (mask) - **Method** = way‑of‑doing - **MethodDescription** = recipe (document) - **Work** = run (dated)
> **Capability** = can‑do within bounds (envelope + measures) - **Service** = promise (access + acceptance)
> **I/D/S are layers**; **documents don’t act**; **Contexts own meanings**; **Bridges** move meanings.

**Name forms (allowed morphology):**
• **Types/roles:** `<Noun><Role/Type>` (`IncidentCommanderRole`, `NormativeStandardRole`, `WorkItemType`).
• **Statuses:** `<Noun>Status` inside the Context’s role space (`ApprovedStatus`) — status‑only; not enactable.
• **No suitcase nouns:** avoid “and/plus/&” in names; use **bundles** (A.2) or separate roles.
• **Acronyms:** first expansion + register; short‑form registered per **§ 7.7**.
## Three worked micro‑examples — ULR across domains (informative)

### Healthcare (OR context)

**Messy:** “The surgical **process** is scheduled at 08:00; the SOP approves the incision and the **service** documents recovery.”
**ULR rewrite:**
“**WorkPlan** OR‑Case‑221 starts 08:00 and will execute **MethodDescription** `Incision_v4`.
`SOP_OR_v4` holds **RequirementRole**; a **SpeechAct Work** by `QA_Officer#ApproverRole` authorises the run.
The hospital offers **Service** ‘Post‑op monitoring’ (access = ward protocol; acceptance = vitals envelope).”
### Manufacturing (assembly line)

**Messy:** “The welding **function** provides air‑tight seams; the **process** costs 3 min.”
**ULR rewrite:**
“`Robot_SN789` has **Capability** ‘execute `Weld_MIG_v3` within envelope E at measures M’.
**Work** instances that **fulfil Service** ‘Provide seam S’ average 3 min; **acceptance** bounds are in `Seal_Acceptance.md`.
The **MethodDescription** is `Weld_MIG_v3`; the **Role** is `WelderRole`.”
### Cloud/SRE (production Context)

**Messy:** “The storage **service** wrote logs and the deployment **process** failed after 2 min.”
**ULR rewrite:**
“`sCG‑Spec_ci_bot#DeployerRole:CD_v7` performed **Work** ‘Deploy r4711’ (failed at T+120 s).
The platform offers **Service** ‘Object Storage’ (access = `S3_API_Spec_vX`; **acceptance** = durability/availability targets).
`LogWriter` is a **System** bearing `TransformerRole` that wrote the records; *the service did not act*.”
## Closing notes (governance & purity)

* **Notation‑agnostic.** ULR is a **language constitution**, not a scanner or template. Apply it in prose, sketches, or formal models.
* **Where checks live.** Convenience checks belong to Tooling; ULR itself stays notation‑agnostic. Conformance code lives in **SCR‑LEX / RSCR‑LEX** as referenced above.
* **Acts vs tokens.** LEX applies to **tokens**; USM applies to **acts** (mint/rename/use). Conformance:
  `LEX.TokenClass(t)=c  ⇒  USM.Scope(usage) ∈ AllowedScopes(c)` (§ 7.5).
* **Guards honoured.** DevOps Lexical Firewall and Unidirectional Dependency remain intact.
* **Reserved “plane”.** Only **`CHR:ReferencePlane`** uses the bare word *plane*; I/D/S are **layers**; all other category talk is expressed as **Characteristics** in a **CharacteristicSpace**.

> **One‑line memory:** *“ULR keeps words honest so ideas stay composable.”*
## E.10:End
