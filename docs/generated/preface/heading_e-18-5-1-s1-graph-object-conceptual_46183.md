---
title: "E.18::5.1 - S1 - Graph object (conceptual)"
description: "Generated reference page for heading:e-18-5-1-s1-graph-object-conceptual:46183."
---

# E.18::5.1 - S1 - Graph object (conceptual)
> Preface node `heading:e-18-5-1-s1-graph-object-conceptual:46183`

## Content

Define a **typed, editioned, directed multigraph**
`TransductionGraph := (V, E, τ_V, τ_E, Γ_time, Bridge, CL, TransportRegistry^Φ)`
with:

* **Vertices `V`:** instances of `U.Morphism` (open world). Common specialisations **include but are not limited to** the assignment’s set: `U.FormalSubstrate`, `U.PrincipleFrame`, `U.Mechanism`, `U.ContextNormalization (UNM)`, `U.SelectionAndTuning`, `U.WorkPlanning`, `U.Work`, `U.EvaluatingAndRefreshing`. This list is **illustrative**, not exhaustive—the graph **does not depend** on this particular set.
* **Edges `E`:** a **single edge kind `U.Transfer`** (typed) carrying artifacts/tokens; all **plane/Context/edition** changes occur **only at nodes via `OperationalGate(profile)`** with **Bridge + CL** annotations; penalties **→ R only**. Transport conversions pin **Φ‑policies** and editions.
* **Scopes:** `Γ_time` (budgets, horizons), `PublicationScope` for faces (E.17), and **slice ids** for refresh (G.11).

 **CtxState (PS‑projection; closed slots):** `CtxState = ⟨L, P, E⃗, D⟩` is the **projection of E.17 Publication Scope**.
 **Slot definitions (normative):**
  • `L := Locus` — an element of a partially ordered **ContextSlice** poset; addresses *where* claims apply (disciplinary / organizational / holonic slice).
  • `P := ReferencePlane` — the reference plane/units registry id; **no plane/unit declarations or translations** occur in CV; crossings remain gated (A.21).
  • `E⃗ := Edition vector` — a **partial map** `edition_key ↦ EditionId` over named families `{CG‑Spec, ComparatorSet, UNM.TransportRegistryΦ}` and optional `{DescriptorMapRef, DistanceDefRef, CharacteristicSpaceRef}` when cited.
  • `D := DesignRunTag` — `design(T^D)` or `run(T^R)`, used by **LaunchGate** and acceptance/telemetry duties.
 **Invariants.** Raw `U.Transfer` preserves `CtxState` (`⟨L,P,E⃗,D⟩`): it does **not** write/update any CtxState slot; any CtxState write/update (or entry to `U.WorkEnactment`) occurs at `OperationalGate(profile)`.
 **Extension discipline.** Any extra slot beyond ⟨L,P,E⃗,D⟩ **SHALL** be registered in the **E.17/LEX “CtxState Extension Registry”** with slot‑id, intent, partial‑order law (neutral/absorbing), and SquareLaw compatibility; unregistered extensions are non‑conformant.
 **Data‑shape location.** Concrete record shapes for `PathId/PathSliceId`, Γ‑pins, and lineage remain in A.22 `FlowSpec`; E.TGA fixes that **flow = valuation** and that `CtxState` is preserved across raw transfers.

 * **Kinds:** `U.Transduction(kind∈{Signature, Mechanism, Work, Check, StructuralReinterpretation})`.  
  **Exact identification (no TGA‑local taxonomy):**  
  — `Signature` **≡** **A.6.0** `U.Signature` (universal, law‑governed declaration).  
  — `Mechanism` **≡** **A.6.1** `U.Mechanism` (law‑governed application over a SubjectKind/BaseType).  
  — `Work` **≡** **A.15** `U.WorkEnactment` (world‑contact; `FinalizeLaunchValues` only here).  
  — `Check` **≡** `OperationalGate(profile)` (universal **gate**; A.* patternisation pending; CC‑TGA catalog applies).  
  — `StructuralReinterpretation` **≡** a species of **A.6.4** `U.EpistemicRetargeting` used as a graph node in E.TGA. **All retargeting semantics** (slot‑level discipline, `DescribedEntitySlot`/`GroundingHolonSlot` behaviour, invariants, Bridges, witnesses) come from **C.2.1** and **A.6.2–A.6.5**; E.TGA does **not** introduce a TGA‑local variant of retargeting.  
  `OperationalGate ≔ U.Transduction(kind=Check)` with DecisionLog aggregation.  
  The only extra discipline E.TGA adds for `StructuralReinterpretation` is **graph‑local**: CtxState and GateCrossing behaviour are governed by **CC‑TGA‑06‑EX** and **CC‑TGA‑11** (projection‑preserving w.r.t. `⟨L,P,E⃗,D⟩`, PathSlice‑local, and “no plane/unit change without a gate”). 

> **MVPK integration (import).** Every vertex with an external surface is published via **MVPK** faces (`PlainView`, `TechCard`, `AssuranceLane`, `InteropCard`) under a declared **PublicationScope** (E.17). E.TGA **reuses** MVPK’s publication laws (pins, lawful‑order discipline, “no new numeric claims / no I/O re‑listing”) and only adds graph‑level constraints in S3 and **CC‑TGA‑09/10**; it does **not** define a second, local publication semantics. 

**GateCrossing (normative)**
**Definition.** A **GateCrossing** is the typed transition at a node that writes/updates any of:
  (i) `U.BoundedContext` (**Context**), (ii) **ReferencePlane**, (iii) any member of the **Edition vector** `E⃗` (e.g., `CG‑Spec`, `ComparatorSet`, `UNM.TransportRegistryΦ`, `DescriptorMapRef`, `DistanceDefRef`, `CharacteristicSpaceRef`), (iv) **DesignRunTag** (`T^D↔T^R`), or (v) **Kind/describedEntity** (only under `StructuralReinterpretation` subject to **CC‑TGA‑06‑EX**).
**Invariants.** Raw `U.Transfer` preserves `CtxState`; a GateCrossing occurs at exactly one `OperationalGate(profile)` (SquareLaw applies).
**Required pins (minimum).** `BridgeCard + UTS row`; `CL` for scope bridges; `CL^plane` for plane crossings; `CL^k` with `bridgeChannel=Kind` for kind transitions; `PublicationScopeId`; `PathSliceId`; Γ‑pins on compare/launch faces.
**Canonical reference.** `CrossingRef := ⟨GateId, channel, from, to, UTS.RowId, PathSliceId⟩`. Any DecisionLog entry whose rationale depends on a crossing **SHALL** cite `CrossingRef`.
**CrossingBundle (normative)**
**Definition.** A **CrossingBundle** is the published bundle that makes a GateCrossing **auditable and replayable** (crossing visibility). It includes:
* the canonical **`CrossingRef`**;
* the matching **UTS row** (**`UTS.RowId`**) for the crossing;
* the required pins **`PublicationScopeId`** and **`PathSliceId`**;
* where a Bridge is involved: the **BridgeCard** (F.9) and its disclosed fields (`BridgeId`, `bridgeChannel`, **CL** and loss notes; **`CL^k`** when `bridgeChannel=Kind`; **`ReferencePlane(src,tgt)`**);
* where planes differ: **`CL^plane`** and the active **`Φ_plane`** as a **`PolicyIdRef`** (policy-id + resolvable refs; F.8:8.1);
* the active penalty policy identifiers **`Φ(CL)`** (and **`Ψ(CL^k)`** if used) as **`PolicyIdRef`** bundles (policy-id + `PolicySpecRef` + `MintDecisionRef?`; F.8:8.1);
* any additional pins mandated by the active **GateProfile** / GateChecks (A.21) for this crossing.

**Obligation.** Every **GateCrossing MUST publish its CrossingBundle**. Missing or non‑conformant CrossingBundle is a **blocking** defect for downstream consumption (selectors, acceptance, audits).

**Term separation.** **Transfer** denotes the sole edge kind `U.Transfer` (graph edges). **Transport** denotes Φ‑governed conversion **policies/registries** (**`TransportRegistry^Φ`** under UNM). Wording “reuse via Transport” refers to registries/policies, not to an additional graph edge.
