---
title: "Dependency Graph & Proofs"
description: "Part B - Trans-disciplinary Reasoning Cluster"
---

# Dependency Graph & Proofs
> Pattern `B.1.1` · Stable
> Part B - Trans-disciplinary Reasoning Cluster

In FPF, every aggregation is a *material act*:

## Keywords

- dependency graph
- proofs
- structural aggregators
- sum
- set
- slice.

## Relations

- `B.1.1` --builds_on--> [Holonic Foundation: Entity → Holon](/generated/patterns/A.1)
- `B.1.1` --builds_on--> [Advanced Mereology: Components, Portions, Aspects & Phases](/generated/patterns/A.14)
- `B.1.1` --builds_on--> [Role–Method–Work Alignment (Contextual Enactment)](/generated/patterns/A.15)
- `B.1.1` --builds_on--> [External Transformer & Reflexive Split (C-2)](/generated/patterns/A.12)
- `B.1.1` --constrained_by--> [Universal Algebra of Aggregation (Γ)](/generated/patterns/B.1)
- `B.1.1` --used_by--> [System-specific Aggregation Γ_sys](/generated/patterns/B.1.2)
- `B.1.1` --used_by--> [Γ_epist — Knowledge-Specific Aggregation](/generated/patterns/B.1.3)
- `B.1.1` --used_by--> [Contextual & Temporal Aggregation (Γctx & Γtime)](/generated/patterns/B.1.4)
- `B.1.1` --used_by--> [Γ_method — Order-Sensitive Method Composition & Work Enactment](/generated/patterns/B.1.5)
- `B.1.1` --used_by--> [Γ_work — Work as Spent Resource](/generated/patterns/B.1.6)
- `B.1.1` --outline_parent--> [Universal Algebra of Aggregation (Γ)](/generated/patterns/B.1)
- `B.1.1` --outline_next_sibling--> [System-specific Aggregation Γ_sys](/generated/patterns/B.1.2)
- `B.1.1` --explicit_reference--> [Holonic Foundation: Entity → Holon](/generated/patterns/A.1)
- `B.1.1` --explicit_reference--> [Advanced Mereology: Components, Portions, Aspects & Phases](/generated/patterns/A.14)
- `B.1.1` --explicit_reference--> [Ontological Parsimony (C-5)](/generated/patterns/A.11)
- `B.1.1` --explicit_reference--> [Temporal Duality & Open-Ended Evolution Principle](/generated/patterns/A.4)
- `B.1.1` --explicit_reference--> [System-specific Aggregation Γ_sys](/generated/patterns/B.1.2)
- `B.1.1` --explicit_reference--> [Trust & Assurance Calculus (F–G–R with Congruence)](/generated/patterns/B.3)
- `B.1.1` --explicit_reference--> [The Agential Role & Agency Spectrum](/generated/patterns/A.13)
- `B.1.1` --explicit_reference--> [Role–Method–Work Alignment (Contextual Enactment)](/generated/patterns/A.15)
- `B.1.1` --explicit_reference--> [Γ_method — Order-Sensitive Method Composition & Work Enactment](/generated/patterns/B.1.5)
- `B.1.1` --explicit_reference--> [External Transformer & Reflexive Split (C-2)](/generated/patterns/A.12)
- `B.1.1` --explicit_reference--> [Universal Algebra of Aggregation (Γ)](/generated/patterns/B.1)
- `B.1.1` --explicit_reference--> [Γ_epist — Knowledge-Specific Aggregation](/generated/patterns/B.1.3)
- `B.1.1` --explicit_reference--> [Contextual & Temporal Aggregation (Γctx & Γtime)](/generated/patterns/B.1.4)
- `B.1.1` --explicit_reference--> [Γ_work — Work as Spent Resource](/generated/patterns/B.1.6)

## Content

## Problem frame

In FPF, every aggregation is a *material act*:

```
Γ : (D : DependencyGraph, T : U.TransformerRole) → H′ : U.Holon
```

`D` is the *only* admissible input shape for Γ. It must capture **part–whole** structure faithfully (A.1, A.14) while staying neutral to order (handled by Γ\_ctx / Γ\_method), time (Γ\_time), and accounting (Γ\_work). If `D` is sloppy—mixing kinds of relations or scopes—Γ becomes unpredictable and the Quintet invariants (IDEM, COMM, LOC, WLNK, MONO) fail in subtle ways.

This pattern normatively defines `DependencyGraph`, the **mereological vocabulary** allowed on its edges, and the **guards** that make Γ provable and comparable across domains.
## Problem

Without a disciplined `DependencyGraph`, four pathologies recur:

1. **Relation drift:** Edges blur composition with mapping (e.g., “represents”), or confuse collections with parts. Aggregations then mix algebraic regimes (sums where mins are required, etc.).
2. **Boundary blindness:** Cross‑holon influences are drawn as parts, bypassing explicit `U.Boundary` and `U.Interaction`. This corrupts locality (LOC) and defeats reproducible folding.
3. **Temporal conflation:** `design‑time` and `run‑time` holons appear in one graph; simulations then “prove” facts about a blueprint using live telemetry.
4. **Hidden cycles:** Self‑dependence enters through aliasing (e.g., a team is a member of itself via “units of units”). Γ cannot topologically fold such graphs.
## Forces

| Force                              | Tension                                                                                                                             |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Universality vs. Precision**     | One schema for systems and epistemes ↔ different composition logics (physical vs. conceptual) must be kept distinct but compatible. |
| **Parsimony vs. Expressiveness**   | Keep the vocabulary small (A.11) ↔ include the minimal extra relations that engineers actually use (A.14).                          |
| **Locality vs. Connectivity**      | Preserve boundary‑local reasoning (LOC) ↔ still allow explicit external influences via interactions, not parthood.                  |
| **Static clarity vs. Dynamic use** | Graphs must be easy to read and verify ↔ also feed Γ\_ctx, Γ\_time, Γ\_method, Γ\_work without duplications or mismatches.            |
## Solution

### The shape: a typed, scoped, acyclic graph

**Definition.**

```
DependencyGraph D = (V, E, scope, notes)
```

* **V (nodes):** each `v ∈ V` is a `U.Holon` with:

  * `holonKind ∈ {U.System, U.Episteme}`
  * `DesignRunTag ∈ {design, run}` (A.4) — **single, uniform per D**
  * a declared `U.Boundary` (A.14)
  * optional characteristics (e.g., F–G–R, CL, Agency metrics) for use by downstream patterns (B.1.2/3; B.3; A.13)
* **E (edges):** each `e ∈ E` is a **mereological** relation from the **normative vocabulary `V_rel`** (below).
* **scope:** the uniform temporal scope of the entire graph (`design` or `run`).
* **acyclicity:** `D` **MUST** be a DAG. Any cycle requires refactoring or elevation to a Meta‑Holon (B.2).

> **Strict distinction (A.15).**
> `DependencyGraph` encodes **part–whole** only. Order goes to Γ\_ctx/Γ\_method. Time evolution goes to Γ\_time. Resource spending goes to Γ\_work. Cross‑boundary influence goes to `U.Interaction` (not parthood).
### Normative edge vocabulary V_rel (A.14 compliant)

Only the following **four** **mereological** relations are allowed in `E` (A.14):


| Family               | Relation             | Short intent                                            | Where it belongs                   |
| -------------------- | -------------------- | ------------------------------------------------------- | ---------------------------------- |
| **Structural**       | **ComponentOf**      | physical/machined part in an assembly                   | Γ_sys                               |
|                      | **ConstituentOf**    | logical/content part in a conceptual whole              | Γ_epist                             |
| **Quantity & Phase** | **PortionOf**        | quantitative fraction of a homogeneous stock or carrier | Γ_sys / Γ_work                      |
|                      | **PhaseOf**          | temporal phase/slice of the *same carrier*              | Γ_time / Γ_work                     |

**Not in `V_rel` (by design):**
* `SerialStepOf`, `ParallelFactorOf` — **order/concurrency** edges of Γ_method/Γ_ctx; **not** parthood; keep them out of `E` (see § 4.1 A.15 and Part B.1.5).
* `MemberOf` — **non‑mereological** collective membership; model in Γ_collective (B.1.7), **not** in `E` (**see § 9**).
 * `RepresentationOf`, `MapsTo`, `Implements` — these are **mappings**, not parthood; model them at the value level (A.15) or as `U.Interaction` between holons.
* `RoleBearerOf` — links a `U.System` to a `U.Role`; **not** parthood (see A.12, A.15).
* Any “is‑a” (`subClassOf`) taxonomic relation — orthogonal to parthood.
### Minimal axioms & type guards per relation

| Relation             | Axioms (informal)                                                 | Guards / When to use                                                                                               |
| -------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **ComponentOf**      | anti‑symmetric; transitive; acyclic                               | Physical assemblies; interfaces compose via BIC (B.1.2). Do **not** use for collections or pipelines.              |
| **ConstituentOf**    | anti‑symmetric; transitive; acyclic                               | Conceptual or formal wholes (papers, proofs, specifications). Do **not** use for material parts.                   |
| **MemberOf** (**outside `V_rel`**) | not transitive; anti‑symmetric (w\.r.t. same collection); acyclic | Sets/teams/libraries; the whole is a *collective* holon. **Not admissible in `E`**; model via **Γ_collective (B.1.7)**. Use `PortionOf` for homogeneous stocks. |
| **PortionOf**        | anti‑symmetric; additive; acyclic                                 | Quantitative partitions of a *homogeneous* carrier (mass, volume, bytes). Requires an **extensive** attribute.     |
| **PhaseOf**          | anti‑symmetric; covers a timeline; acyclic                        | Time‑slices of the *same* carrier identity. Use only with explicit carrier and non‑overlapping intervals.          |

> **Carrier identity for `PhaseOf`.** The “same thing across phases” must be explicit (e.g., *this* frame across heat/dwell/quench; *this* theory across revisions). If identity changes, you are modelling a **Transformer** creating a **new** holon (A.12) — not a phase.
### Selection guide (didactic, normative in spirit)

Use this **one‑page decision** to pick the edge correctly:

1. **Is it a part–whole relation at all?**
   If it is mapping, influence, or reference → **not** parthood. Use `U.Interaction` or value‑level links (A.15).

2. **Is it physical vs. conceptual composition?**
   Physical assembly → **ComponentOf**.
   Conceptual/content inclusion → **ConstituentOf**.

3. **Is it a collection?**
   If the “whole” is a collection/collective → **MemberOf** **(outside `E`, route to Γ_collective (B.1.7))**.
   *Note:* a team’s *members* are `MemberOf` (**outside `E`**); the team’s *tools* are likely `ComponentOf`.

4. **Is it order‑sensitive execution?**
   If step order changes semantics → **route to A.15 (ordered relations)** and aggregate with **Γ_ctx / Γ_method**.
   Do **not** encode order as parthood in this section.

5. **Is it a quantitative fraction of a homogeneous stock?**
   If yes → **PortionOf** (requires an extensive attribute; use in Γ\_sys / Γ\_work).

6. **Is it the *same* carrier across time?**
   If yes → **PhaseOf** (then aggregate with Γ\_time / Γ\_work).

> **Common anti‑patterns and the fix**
> • Using **MemberOf** for material stocks → replace with **PortionOf**.
> • Drawing cross‑boundary “parts” → replace edge with **U.Interaction** plus `ComponentOf` *inside* each holon.
> • Using **ConstituentOf** for a module cage or bracket → that is **ComponentOf**.
> • Treating representation (file ↔ thing) as parthood → keep as value‑level mapping (A.15), not in `D`.
### Γ_m (Compose‑CAL) — structural aggregators & trace shape

**Purpose.** Provide a **minimal constructional generator** for **structural mereology** that keeps the kernel small (C-5), aligns with **A.14** (Portions/Phases/Components discipline), and feeds Working-Model layer publication in LOG without importing tooling or notations. 

**Operators (aggregators).**

Γ_m.sum(parts : Set[U.Entity])       → W : U.Holon
  // for each p ∈ parts assert internal U.KernelPartOf(p, W)

Γ_m.set(elems : Multiset[U.Entity])  → C : U.Holon
  // for each e ∈ elems assert internal U.KernelPartOf(e, C)
  // outward **MemberOf** remains a non‑mereological signal per A.14 (does not build holarchies)

Γ_m.slice(ent : U.Entity, facet : U.Facet) → S : U.Holon
  // assert internal U.KernelPartOf(S, ent) and record facet label


**Trace (conceptual, notation‑independent).**  
`Trace = ⟨ op ∈ {sum, set, slice}, inputs, output, notes ⟩`  
Notes capture boundary tags (A.14), scope (`design|run`), and any independence declarations used by the Quintet proofs (below).

**Invariant footprint on Γ_m traces (inherits B.1 Quintet).**
* **IDEM** — singleton fold returns the part unchanged.  
* **COMM/LOC** — results are invariant under re‑order and local factorisation given an independence declaration (IND‑LOC).  
* **WLNK** — aggregate cannot exceed the weakest limiting attribute among parts; synergy escalates via **B.2 Meta‑Holon Transition**.  
* **MONO** — improving a part on a monotone characteristic cannot worsen the whole, ceteris paribus.

**Exclusions and routing (A.15/A.14).**  
No `parallel` or `temporalSlice` constructor is introduced here; **sequence/parallelism** live in `Γ_ctx/Γ_method`, and **temporal parts** in `Γ_time`. This preserves the firewall between structure, order and time mandated by A.15/A.14.

**Internal proof relation.**  
`U.KernelPartOf` names the **constructional edges inside traces**; it is not part of the public `V_rel` and appears only in the trace/proof narrative (definitional didactic status).
### Scope and boundary rules (make graphs foldable)

1. **Single temporal scope:** all nodes in `D` share `design` **or** `run`. No mixing (“chimera” graphs are invalid).
2. **Declared boundary:** every holon in `D` has a `U.Boundary`; any cross‑holon influence must be an explicit `U.Interaction`, not parthood.
3. **Acyclicity:** if a cycle is detected, either (a) refactor (e.g., split a collective from an assembly), or (b) escalate to **Meta‑Holon Transition** (B.2) if a new “whole” with novel properties is intended.
4. **Order & time routing:** do **not** encode sequence or history with structural edges; route to Γ\_ctx / Γ\_method / Γ\_time explicitly.
5. **Resource routing:** do **not** encode costs with structural edges; route to Γ\_work (B.1.6) across declared boundaries.
### What “Proofs” mean here (preview of Part 2)

Each Γ flavour (Γ\_sys / Γ\_epist / Γ\_method / Γ\_time / Γ\_work) **must** attach a small, reusable **Proof Kit** showing the Quintet on the given `D`:

* **IDEM**: singleton fold = identity.
* **COMM/LOC**: independence conditions + invariance under local reorder/factorisation.
* **WLNK**: weakest‑link bound (e.g., critical input caps, weakest claim).
* **MONO**: explicit monotone characteristics (what “cannot get worse” means here).
## Didactic mini‑examples

* **System (assembly):** a motor **ComponentOf** a chassis; wiring harness **ComponentOf** the motor; a *crew* **MemberOf** a team holon (the crew is not a component of the chassis).
* **Episteme (paper):** a lemma **ConstituentOf** a proof; appendices **ConstituentOf** the paper; three datasets **MemberOf** a curated collection; version v2 **PhaseOf** the *same* model.
## The Proof Kit (ready‑made templates for Γ on D)

This section provides **small, reusable proof obligations** you attach to a `DependencyGraph D` when invoking any Γ‑flavour. Each obligation is minimal—just enough to guarantee the **Invariant Quintet** for the stated scope and edge set.

### Independence declaration (for COMM/LOC)

> **Obligation IND‑LOC.**
> Provide a **partition of D** into subgraphs `{Dᵢ}` such that:
>
> 1. Their **node sets** are disjoint (no shared holon instances).
> 2. Their **boundaries** are disjoint (no shared ports) or any shared internal stock is **lifted** to the parent boundary in notes.
> 3. No edge in `E` crosses partitions except via explicit `U.Interaction` (not parthood).

**Claim:** Under IND‑LOC, Γ’s fold result is **invariant to local fold order** within and across `{Dᵢ}`.
### Weakest‑link cutset (WLNK)

> **Obligation WLNK‑CUT.**
> Enumerate a **critical set** `C ⊆ V ∪ E` (nodes/edges) such that **failure** (or insufficiency) of any element of `C` makes the aggregation invalid or unsafe in the chosen Γ‑flavour.

**Claim:** For the target property, the result for the whole is bounded by the **minimum** (or tightest cap) across `C`.
Examples:
• Γ\_sys → tensile strength cutset along a load path;
• Γ\_epist → weakest supported premise in a proof spine;
• Γ\_work → availability caps for required inputs across the boundary.
### Monotone coordinates (MONO)

> **Obligation MONO‑AX.**
> Declare the **monotone characteristics** (attributes whose improvement cannot worsen the whole) **for this call**. Specify *how* “improvement” is recognized.

**Claim:** If only monotone characteristics change in the direction of improvement while all else is fixed, the aggregate’s target value cannot degrade.

Examples:
• Γ\_sys → increased component reliability, tighter tolerance;
• Γ\_epist → stronger evidence, higher formality;
• Γ\_method → reduced step duration, stronger step assurance;
• Γ\_time → added non‑overlapping coverage;
• Γ\_work → higher yield η, reduced dissipation.
### Idempotence witness (IDEM)

> **Obligation IDEM‑WIT.**
> Provide the **singleton** case: a subgraph `D₁` with one node and no admissible composition edges.

**Claim:** Γ(D₁) returns that node’s property unchanged.
### Scope & boundary attestations

> **Obligation SCOPE‑1.**
> Affirm `DesignRunTag(D) ∈ {design, run}` and that all nodes share it.
> **Obligation BOUND‑1.**
> List the **U.Boundary** for each top‑level holon in `V` and record any **U.Interaction** edges that are relevant but not part of `E` (to show cross‑boundary influences were not mis‑typed as parthood).
### Flavour‑specific summary table

| Γ‑flavour            | Independence (IND‑LOC)                                             | WLNK‑CUT (what is “critical”)                         | MONO‑AX (what cannot make worse)                    | IDEM‑WIT                      | Notes                                                         |
| -------------------- | ------------------------------------------------------------------ | ----------------------------------------------------- | --------------------------------------------------- | ----------------------------- | ------------------------------------------------------------- |
| **Γ\_sys**          | Disjoint subassemblies with disjoint interfaces (BIC respected)    | Structural cutset on load/flow paths                  | ↑ component reliability/capacity; tighter bounds    | Single module                 | Use **BIC** to keep interfaces explicit.                      |
| **Γ\_epist**         | Independent argument subgraphs; no premise reuse across partitions | Weakest premise/claim on entailment spine             | ↑ formality; ↑ reliability of sources; ↑ congruence | Single section/lemma          | Apply `Φ(CL_min)` penalty only where mappings/links are weak. |
| **Γ\_ctx / Γ\_method** | Parallel branches truly independent (no hidden state)              | Slowest/least reliable step on the critical path      | ↓ duration; ↑ step assurance; ↑ join soundness      | Single step                   | COMM relaxed to partial orders (NC‑1..3).                     |
| **Γ\_time**          | Non‑overlapping time slices; same carrier identity                 | Missing slice creates a gap (temporal WLNK)           | ↑ coverage; ↑ timestamp precision                   | Single slice                  | Phases must cover the window without overlap.                 |
| **Γ\_work**          | Disjoint boundary partitions; shared stocks lifted to parent       | Availability caps for required inputs across boundary | ↑ yield; ↓ dissipation; ↑ availability              | Single resource with no delta | Keep **Boundary Ledger** with basis and time window.          |

Attach the row(s) you use as the **Proof Kit** to the Γ call record.
## Archetypal grounding (worked micro‑examples)

> Each row is self‑contained and can be used as a template.

### U.System (assembly & production)

| Aspect           | Example                                                                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Graph**        | `Motor ComponentOf Chassis`; `Harness ComponentOf Motor`; *(for method demo only, outside `D`)* `QC SerialStepOf Seal`; all nodes scope=`run`; BIC declares ports for power, data. |
| **Independence** | Two subassemblies: `{Chassis, Motor, Harness}` and `{Cabin}` with disjoint interfaces.                                                                     |
| **WLNK‑CUT**     | Tensile path through front mount + harness connector; weakest tensile rating caps assembly load rating.                                                    |
| **MONO‑AX**      | Improving mount alloy or connector strain relief cannot reduce system load rating.                                                                         |
| **IDEM‑WIT**     | Standalone chassis as singleton: Γ\_sys returns chassis unchanged.                                                                                        |
| **Routing**      | `SerialStepOf` belongs to Γ\_method; Γ\_sys ignores order and composes structure; Γ\_work separately composes energy/material costs through boundary ports. |
### U.Episteme (paper & dataset)

| Aspect           | Example                                                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Graph**        | `Lemma1 ConstituentOf ProofA`; `DatasetX MemberOf CorpusQ`; `ProofA ConstituentOf PaperP`; scope=`design`.                                            |
| **Independence** | Two argument branches that do not reuse premises: `{Lemma1 → ProofA}` and `{Background → Discussion}`.                                                |
| **WLNK‑CUT**     | The least supported premise in the entailment path to the main theorem.                                                                               |
| **MONO‑AX**      | Replacing a weak premise with a stronger one or raising CL of a mapping cannot reduce overall credibility.                                            |
| **IDEM‑WIT**     | Single lemma as singleton: Γ\_epist returns it unchanged.                                                                                             |
| **Routing**      | `MemberOf` for CorpusQ is collection structure; not used to average “truth”. Γ\_epist aggregates via min/penalty and produces a SCR for sources. |
## Conformance Checklist (normative checklist)

| ID             | Requirement                                                                                                                                                | Purpose                             |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **CC‑B1.1.1**  | `D` **SHALL** be acyclic (DAG).                                                                                                                            | Ensure foldability.                 |
| **CC‑B1.1.2**  | All nodes in `D` **SHALL** share a single `DesignRunTag ∈ {design, run}`.                                                                                 | Ban design/run chimeras.            |
| **CC‑B1.1.3**  | All edges in `E` **SHALL** belong to the **normative `V_rel`** (**ComponentOf, ConstituentOf, PortionOf, PhaseOf** only). | Keep mereology crisp and finite. |
| **CC‑B1.1.4**  | Cross‑holon influences **SHALL** be modelled as `U.Interaction`, **NOT** parthood.                                                                         | Preserve locality (LOC).            |
| **CC‑B1.1.5**  | Every top‑level holon **SHALL** declare a `U.Boundary`; if Γ\_work will be used, a Boundary Ledger **SHALL** be produced.                                  | Make results comparable/auditable.  |
| **CC‑B1.1.6**  | If COMM/LOC is claimed, an **IND‑LOC** independence declaration **SHALL** be attached.                                                                     | Make locality explicit.             |
| **CC‑B1.1.7**  | A **WLNK‑CUT** set **SHALL** be stated for the chosen Γ‑flavour.                                                                                           | Make caps explicit; avoid optimism. |
| **CC‑B1.1.8**  | **MONO‑AX** **SHALL** enumerate the monotone characteristics used by the Γ‑flavour.                                                                                   | Avoid hidden regress.               |
| **CC‑B1.1.9**  | A **IDEM‑WIT** singleton case **SHALL** be shown or referenced.                                                                                            | Ground identity.                    |
| **CC‑B1.1.10** | Order/time/resource **SHALL NOT** be encoded via structural edges; they must be routed to Γ\_ctx/Γ\_method, Γ\_time, Γ\_work respectively.                   | Maintain A.15 Strict Distinction.   |
| **CC‑B1.1.11** | If a cycle or a locality violation persists, the modeller **SHALL** either refactor or declare a **Meta‑Holon Transition (B.2)**.                          | Make emergence explicit.            |
| **CC‑B1.1.12** | Any mapping edges (`RepresentationOf`, `Implements`, etc.) **SHALL** be kept outside `E` (value‑level), or recast as `U.Interaction` if cross‑boundary.    | Eliminate category errors.          |
## Anti‑pattern diagnostics (before → after)

| Anti‑pattern                     | Symptom                                                        | Replace with                                                                                                                                            |
| -------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Collection as stock**          | `Cell_i MemberOf Battery` then summing “capacity” via MemberOf | Use `PortionOf` for capacity partitions; use `ComponentOf` for physical pack assembly; keep MemberOf only for the *set of cells* as a collection holon. |
| **External supplier as part**    | `PowerGrid ComponentOf Plant`                                  | Model `PowerGrid` as an external holon with `U.Interaction` at the plant boundary; keep plant internals as `ComponentOf`.                               |
| **Order encoded as structure**   | `Step2 ComponentOf Step1`                                      | Use `SerialStepOf`/`ParallelFactorOf` and Γ\_method.                                                                                                      |
| **History encoded as structure** | `v2 ComponentOf v1`                                            | Use `PhaseOf` for time slices of the *same* carrier, or a Transformer creating a new holon (A.12) if identity changes.                                  |
| **Mapping as parthood**          | `DigitalTwin ConstituentOf Turbine`                            | Keep the twin as a separate holon; link by `U.Interaction` and value‑level mapping; do not use parthood.                                                |
| **Design/run chimera**           | Mix of CAD nodes and telemetry nodes                           | Split into two graphs (`design` vs `run`) and connect via a Transformer role if needed.                                                                 |
## Consequences

**Benefits**

* **Predictable composition:** Γ‑folds are reproducible and auditable across domains.
* **Cross‑scale clarity:** Resource and time additivity are preserved by routing to Γ\_work and Γ\_time.
* **Safer modelling:** WLNK cutsets surface true constraints; emergence is not “smuggled in”.
* **Didactic simplicity:** A small, fixed edge vocabulary makes reviews and onboarding faster.

**Trade‑offs / mitigations**

* **Up‑front discipline:** Declaring boundaries and independence requires effort.
  *Mitigation:* reuse the Proof Kit templates; keep small, local graphs and compose.
* **Refactoring legacy edges:** Replacing “generic part‑of” with precise relations can be noisy.
  *Mitigation:* use the decision guide (4.4) and anti‑pattern table (9) as a script.
## Rationale (informative)

This pattern operationalizes **A.14 (Mereology Extension)** and **A.15 (Strict Distinction)** for the universal algebra of B.1. +… By limiting `E` to **four** well‑formed **mereological** relations, we prevent the three recurrent category errors: **mapping≠parthood**, **order/time≠structure**, **collection≠stock**. The Proof Kit converts the Quintet from abstract slogans into concrete obligations that engineers can check in everyday models. Γ‑flavours then remain simple and domain‑appropriate, while proofs remain small and reusable.
## Relations

* **Builds on:** A.1 **Holonic Foundation**; A.14 **Mereology Extension**; A.15 **Strict Distinction**; A.12 **Transformer Principle**.
* **Constrained by:** B.1 **Universal Γ** and the **Invariant Quintet**.
* **Used by:** B.1.2 **Γ\_sys**, B.1.3 **Γ\_epist**, B.1.4 **Γ\_ctx/Γ\_time**, B.1.5 **Γ\_method**, B.1.6 **Γ\_work**.
* **Triggers:** B.2 **Meta‑Holon Transition (MHT): Recognizing Emergence and Re‑identifying Wholes** when cycles or WLNK violations indicate a new emergent whole.
* **Feeds:** B.3 **Trust & Assurance Calculus (F–G–R with Congruence)** via explicit declaration of monotone characteristics and provenance.


> **One‑page takeaway.**
> Keep `D` a **DAG**, pick edges from **four** mereological relations, route **order/time/cost** to their Γ‑flavours, and attach the **four Proof Kit obligations** (IND‑LOC, WLNK‑CUT, MONO‑AX, IDEM‑WIT) with scope/boundary notes.
> Do this, and the Quintet holds with minimal fuss.
>
## B.1.1:End
