---
title: "Multi‑Method Dispatcher & MethodFamily Registry"
description: "Part G - Discipline SoTA Patterns Kit"
---

# Multi‑Method Dispatcher & MethodFamily Registry
> Pattern `G.5` · Stable · General (G) · Normative
> Part G - Discipline SoTA Patterns Kit

> **Type:** General (G)
> **Status:** Stable
> **Normativity:** Normative

**Plain-name.** Multi-method dispatcher and method-family registry.

**Intent.** Govern the dispatcher/registry surfaces for rival method families and publish selector-facing retained-set outcomes without collapsing plurality into one hidden scalar winner.

- several method families or generator families can lawfully act on the same declared task family or work target
- you need one selector to return a `Shortlist`, `RankedShortlist`, portfolio, narrowed handoff plan, or abstain outcome without pretending that there is always one scalar winner
- the published result must carry enough basis pins to support later comparison, handoff, or escalation without changing its public head

## Keywords

- method family registry
- selected-set publication
- shortlist
- ranked shortlist
- dispatcher
- specialist portfolio.

## Relations

- `G.5` --coordinates_with--> [Decision Theory (Decsn‑CAL)](/generated/patterns/C.11)
- `G.5` --coordinates_with--> [Explore–Exploit Governor (E/E‑LOG)](/generated/patterns/C.19)
- `G.5` --coordinates_with--> [Agentic Tool‑Use & Call‑Planning (C.Agent‑Tools‑CAL)](/generated/patterns/C.24)
- `G.5` --route_step--> [Creative Abduction with NQD](/generated/patterns/B.5.2.1)
- `G.5` --explicit_reference--> [Decision Theory (Decsn‑CAL)](/generated/patterns/C.11)
- `G.5` --explicit_reference--> [Explore–Exploit Governor (E/E‑LOG)](/generated/patterns/C.19)
- `G.5` --explicit_reference--> [Agentic Tool‑Use & Call‑Planning (C.Agent‑Tools‑CAL)](/generated/patterns/C.24)
- `G.5` --explicit_reference--> [CG-Frame-Ready Generator](/generated/patterns/G.1)
- `G.5` --explicit_reference--> [SoTA Harvester & Synthesis](/generated/patterns/G.2)
- `G.5` --explicit_reference--> [CHR Authoring: Characteristics - Scales - Levels - Coordinates](/generated/patterns/G.3)
- `G.5` --explicit_reference--> [CAL Authoring: Calculi - Acceptance - Evidence](/generated/patterns/G.4)
- `G.5` --explicit_reference--> [Task-family adaptation signature](/generated/patterns/C.22.1)
- `G.5` --explicit_reference--> [Telemetry-Driven Refresh & Decay Orchestrator](/generated/patterns/G.11)
- `G.5` --explicit_reference--> [NQD‑CAL — Open‑Ended Search Calculus](/generated/patterns/C.18)
- `G.5` --explicit_reference--> [Method‑SoS‑LOG — MethodFamily Evidence & Maturity](/generated/patterns/C.23)
- `G.5` --explicit_reference--> [Parity / Benchmark Harness](/generated/patterns/G.9)
- `G.5` --explicit_reference--> [LEX-BUNDLE: Unified Lexical Rules for FPF](/generated/patterns/E.10)
- `G.5` --explicit_reference--> [A.CHR-SPACE — CharacteristicSpace & Dynamics hook](/generated/patterns/A.19)
- `G.5` --explicit_reference--> [CG-Spec — Frame Standard & Comparability Governance](/generated/patterns/G.0)
- `G.5` --explicit_reference--> [Evidence Graph & Provenance Ledger](/generated/patterns/G.6)
- `G.5` --explicit_reference--> [Cross-Tradition Bridge Calibration Kit (BridgeMatrix → BridgeCards + BCT/Sentinels)](/generated/patterns/G.7)
- `G.5` --explicit_reference--> [Transduction Graph Architecture (E.TGA)](/generated/patterns/E.18)
- `G.5` --explicit_reference--> [GateProfilization: OperationalGate(profile) (GateFit core)](/generated/patterns/A.21)
- `G.5` --explicit_reference--> [SoTA Pack Shipping (pack-boundary owner; SoTA-Pack(Core))](/generated/patterns/G.10)

## Content

## Use this when

- several method families or generator families can lawfully act on the same declared task family or work target
- you need one selector to return a `Shortlist`, `RankedShortlist`, portfolio, narrowed handoff plan, or abstain outcome without pretending that there is always one scalar winner
- the published result must carry enough basis pins to support later comparison, handoff, or escalation without changing its public head
## What goes wrong if missed

- rival families are compared under silent comparator drift, hidden baseline changes, or unspoken crossing costs
- the selector hides one dogmatic winner even when only a partial order is lawful
- selected-set publication gets hidden inside `C.11`, `C.19`, or `C.24`, so the published artifact no longer makes clear whether it carries local choice, pool policy, enactment, or publication
- exploration, open-ended, or specialization pressure leaks in as one architecture convenience rather than one explicit policy-bound choice
## What this buys

- one registry that keeps rival method families disjoint but dispatchable
- one selector surface that can publish candidate sets, `Shortlist`, `RankedShortlist`, specialist portfolios, narrowed handoff plans, or abstain outcomes honestly
- one `DRR/SCR`-addressable trace with explicit basis pins instead of one hidden selector rationale
- one explicit publication closure so the public head, retained members, ordering status, and basis pins are stated directly in the emitted result

Registry and dispatch remain the primary owner burden here; selected-set publication is the explicit closure surface of that selector burden, not a replacement for it.
## First-minute questions

- What public head is this selector result actually emitting: `Shortlist`, `RankedShortlist`, portfolio, narrowed handoff, or abstain?
- Which members are being retained or excluded now?
- Does order materially belong to the published result?
- Which basis pins or policy pins must the published result carry?
## First output

The first useful output from this dispatcher/registry burden is one published selected-set artifact: `Shortlist`, `RankedShortlist`, one specialist portfolio, one narrowed handoff plan, or one abstain/escalation result, with the public head, retained members or handoff content, ordering status when relevant, and basis pins stated in one place.

If that first output still cannot be written honestly, the current publication result is not finished `G.5` publication yet.

G.5 keeps the dispatcher/registry surfaces here and leaves universal Part-G invariants to `G.Core`; method- or generator-specific semantics stay in their named source patterns and arrive here only through explicit pins.

When `C.11` has already emitted one local choice result, `C.19` one pool-policy posture, or `C.24` one enactment-facing next move, `G.5` begins where the burden becomes selector-facing publication of the retained set or narrowed handoff result rather than one more explanation of why the result looked reasonable. A conformant `G.5` pass should therefore publish the retained set, narrowed handoff, or abstain result directly, with its public head and basis pins explicit in the result itself.

A publication result remains unfinished if the public head, retained members, ordering status, abstain or escalation condition, or basis pins are still only implicit in upstream notes.
## Problem frame

A `CG‑FrameContext` (from **G.1**) and a `SoTA Synthesis Pack@CG‑Frame` (from **G.2**) expose multiple rival, internally coherent **method families** (and sometimes **generator families**) that can plausibly act on the same *describedEntity / ReferencePlane*.

At the same time, the typed slot/scale/coordinate surfaces from **G.3/G.4** yield admissible calculi and acceptance clauses—enough to formulate *eligibility*, *assurance*, and *legality* constraints, but not enough to pick “the method” without collapsing plurality.

You need a **notation‑independent** way to:

1. register method/generator families as *auditable, versioned* entries,
2. select/compose/fallback among them at run time for a concrete task instance,
3. publish stable selected-set results and stable identities to UTS, and
4. emit RSCR‑relevant triggers and pins without inventing new “shadow specs”.
## Problem

How to design a **general, auditable dispatcher** that:

* supports **pluralism** (families from competing Traditions stay disjoint) while remaining **dispatchable** (selection is possible and explainable);
* does **not embed algorithmic dogma** in the core selector kernel;
* respects Context boundaries and crossing discipline (Bridge‑only; explicit pins);
* produces **set‑valued outcomes** when only partial orders are lawful;
* cleanly separates:

  * **selector kit/surfaces** (registry + selector façade + publication surfaces),
  * **universal Part‑G invariants** (carried by `G.Core`),
  * **method/generator specifics** (wired only via `Extensions` blocks).
## Forces

* **Pluralism vs. forced totalisation.** Many selection regimes are inherently partial‑order; forcing a scalar winner often creates illegal semantics.
* **Evidence realism vs. hard gates.** Eligibility/acceptance frequently depends on incomplete evidence; selection must remain auditable under tri‑state unknowns.
* **Reuse vs. leakage.** Cross‑Context reuse is valuable but must be explicit (Bridge + loss notes) and must not silently re‑ground semantics.
* **Exploration vs. exploitation.** Dispatch sometimes must probe alternatives under explicit policy/risk envelopes, but probing must not become an implicit fourth status.
* **Evolvability vs. churn.** Registries evolve (new families, deprecations, edition bumps); continuity must not be broken by “rename by meaning”.
## Solution

### G.Core linkage (normative)

**Builds on:** `G.Core` (Part‑G core invariants; single-source default routing)

**GCoreLinkageManifest (normative; size‑controlled via profiles/sets).**
Effective obligations/pins/triggers are computed by union expansion of the referenced ids (per `G.Core:4.2.1`). Profiles/sets + explicit deltas; `Nil‑elision` applies.

* `CoreConformanceProfileIds :=`

  * `GCoreConformanceProfileId.PartG.AuthoringBase`
  * `GCoreConformanceProfileId.PartG.TriStateGuard`
  * `GCoreConformanceProfileId.PartG.UTSWhenPublicIdsMinted`
  * `GCoreConformanceProfileId.PartG.ShippingBoundary`
* `CorePinSetIds :=`

  * `GCorePinSetId.PartG.AuthoringMinimal`
  * `GCorePinSetId.PartG.CrossingVisibilityPins` *(crossing‑aware use; pins from this set may be intentionally strengthened (optional→required) via `CorePinsRequired`)*
* `CorePinsRequired :=` *(delta over PinSets; pins/refs are id‑only; prefer strengthening optional→required over restating pins already covered by PinSets)*

  * `TaskSignatureRef` *(see `G.5:4.2` / S2)*
  * `MethodFamilyId[]` *(registry keys in scope)*
  * `GeneratorFamilyId[]?` *(when generator families are in scope)*
  * `PathId[]` *(audit citations for “why” and for evidence)*
  * `PathSliceId[]` *(audit citations for “why” and for evidence)*
  * `UTSRowId[]` *(published identities for selected/registered families and selector policy surfaces)*
  * `FailureBehaviorPolicyId?` *(only when degrade/abstain behavior is explicitly policy‑bound)*
  * `SoSLogBranchId?` *(only when degrade/abstain behavior is explicitly policy‑bound)*
* `DefaultsConsumed :=`

  * `DefaultId.GammaFoldForR_eff`
  * `DefaultId.PortfolioMode`
  * `DefaultId.DominanceRegime`
* `RSCRTriggerSetIds :=`

  * `GCoreTriggerSetId.RefreshOrchestration`
    *(payload pins: `TaskSignatureRef`, `CGSpecRef.edition`, `CNSpecRef.edition`, `MethodFamilyId[]`, `GeneratorFamilyId[]?`, `AcceptanceClauseId[]?`, `SoSLogBranchId?`, `FailureBehaviorPolicyId?`, `DescriptorMapRef.edition?`, `DistanceDefRef.edition?`, `TransferRulesRef.edition?`, `InsertionPolicyRef?`, `PathId`, `PathSliceId`, `SCRId`, `DRRId`, `RSCRTestId[]`)*
### Dispatcher & Registry kit (notation‑independent)

G.5 defines the **kit surfaces** below. Their purpose is to make dispatch **possible and auditable** without embedding any method-family semantics in the selector kernel.

**S1 — `MethodFamily Registry` (design‑time; per CG‑Frame).**
A registry row represents *a family*, not a single implementation. Minimal fields (conceptual, notationally independent):

* `Identity`: `MethodFamilyId`, `ContextId`, lineage/Tradition notes, `UTSRowId` (twin labels where applicable).
* `EligibilityStandardRef`: a typed predicate surface (tri‑state per `G.Core`), expressed in CHR/CAL terms and pinned to the relevant editions.
* `AssuranceProfileRef`: evidence‑lane expectations and assurance surface pins (SCR‑addressable).
* `LegalityBindings`: explicit references to the **single** governance card and legality gate (`CNSpecRef`, `CGSpecRef`) and to any required legality constraints (e.g., scale/unit legality via CSLC).
* `EvidencePins`: citations to `G.6` (`PathId/PathSliceId`) for claims/guarantees where such claims are asserted.
* `CrossingAllowance`: explicit Bridge/CL allowance pins **only** if cross‑Context operation is claimed.
* `PolicyHooksRef?`: optional pointers to policy surfaces (not defined here; wired via Extensions).

**S1′ — `GeneratorFamily Registry` (design‑time; optional; per CG‑Frame).**
A registry row for families that generate tasks/environments and/or co‑evolve solver families. G.5 carries the *surface*, not the generator semantics:

* `Identity`: `GeneratorFamilyId`, `ContextId`, `UTSRowId`.
* `GeneratorSignatureRef`: conceptual I/O and budget semantics.
* `EnvironmentValidityRegionRef?`: pinned constraints for generated environments/tasks.
* `TransferRulesRef.edition?`: required when the Open-Ended mode is enabled (semantics come from the cited extension surfaces).
* `CouplerRefs?`: which `MethodFamilyId[]` can be coupled with this generator family.

**S2 — `TaskSignature` façade (design‑time + run‑time).**
A minimal typed record the dispatcher consumes. Its role is **pinning and auditability**, not over‑specification. It must be CHR/CAL‑typed and provenance‑aware.
G.5 treats `TaskSignatureRef` as an input surface; it does not define CHR/CAL semantics.

**S3 — `Selection kernel façade` (run‑time; policy‑governed).**
A notation‑independent selector that:

* consumes `TaskSignatureRef` + registry entries + pinned contract surfaces,
* applies eligibility/assurance gating (tri‑state),
* computes a lawful (possibly partial) order,
* returns a **set/portfolio** result (per `DefaultId.PortfolioMode` and explicit overrides),
* emits audit artefacts (DRR/SCR‑addressable pins).

**S3.A — `TaskFamilySpecializationProfile@Context` (run‑time; conditional).**
When the real selector burden is acquisition of usable specialization on a declared task family, the selector may publish one `TaskFamilySpecializationProfile@Context` for each candidate, specialist portfolio, or narrowed handoff plan. Here `profile` means one selector-time comparison record for bounded specialization, not a new kernel type and not a generic narrative profile. `G.5` consumes this burden over `C.22.1`; it does not re-own the adaptation-signature field vocabulary.

The profile should therefore cite one `AdaptationSignatureRef` or equivalent pinned field set carrying the declared `TaskFamilyRef` or `TaskSignature`, the work-measure threshold target, prior exposure declaration, time-to-threshold, budget-to-threshold, post-threshold efficiency when relevant, any declared transfer or retention claim, any downside burden, and any corridor-entry baseline, corridor-entry evidence, or stepping-stone evidence item that materially affects comparison.

When the declared task family is heterogeneous, the selector may return one composed specialist portfolio, one narrowed handoff plan, or one small admissible set that preserves rival specialists rather than collapsing them into a fake single winner. Low-human-overlap candidates remain admissible only when the profile, evidence basis, and policy constraints are explicit.

**S4 — `Composition & fallbacks` templates (design‑time).**
A library of composition shapes (preconditioner → solver → verifier; cascades; meta‑selectors) **as templates**, legality‑checked and pinned. Concrete strategy semantics stay in the referenced method families; G.5 only carries the composition surface.

**S5 — `Publication & telemetry` surface (run‑time).**
A standard surface to publish:

* `DRR` (decision rationale) + `SCR` (support/confidence routing) with explicit pins,
* portfolio/return‑set artefacts,
* telemetry pins to refresh orchestration (`G.11`), without owning orchestration.

When the publication burden is one selected-set surface rather than one generic registry trace, `Shortlist` is the public head, `RankedShortlist` is the ordered specialization when order materially belongs to the published result, `ShortlistId` is the emitted public identity, and `ChoiceSet` stays one mathematical gloss rather than the public head.

**S6 — `Governance & evolution` surface (design‑time).**
Versioning, deprecation, and registry evolution discipline (UTS publication; continuity), without minting new Part‑G‑wide types.
### Selector head and narrower selector families

Selection/dispatch stays one generic selector head. Narrower selector families may refine it, but they do not redefine the universal invariants routed via `G.Core`, do not add hidden mandatory inputs beyond pinned policy or edition refs, and do not mutate SlotKinds.

Method- and generator-specific pressures such as `QD` archives, open-ended portfolios, explore/exploit lenses, or preference comparators do not become part of the selector head. They arrive only through explicit extension wiring and the pins those extensions require.
### Interfaces (minimal I/O surface)

| Interface                         | Consumes                                                                                                                                                     | Produces                                                                                                                                                                                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **G.5‑1 RegisterFamily**          | `SoTA` family cards (from `G.2`), CHR/CAL pins (from `G.3/G.4`), `CNSpecRef.edition`, `CGSpecRef.edition`, `ContextId`                                       | A `MethodFamily` registry row (`MethodFamilyId`, `EligibilityStandardRef`, `AssuranceProfileRef`, `UTSRowId`, pinned refs)                                                                                                                                 |
| **G.5‑2 RegisterGeneratorFamily** | `SoTA` generator family cards (from `G.2`), `ContextId`, pinned refs (including `TransferRulesRef.edition` when applicable)                                  | A `GeneratorFamily` registry row (`GeneratorFamilyId`, `GeneratorSignatureRef`, `UTSRowId`, pinned refs)                                                                                                                                                   |
| **G.5‑3 Select**                  | `TaskSignatureRef`, `MethodFamilyId[]` (in scope), pinned `CNSpecRef/CGSpecRef` (editions), policy refs (if any), audit citation pins (`PathId/PathSliceId`) | `CandidateSet` (set‑returning), portfolio artefact (per `PortfolioMode`), `DRR + SCR` pins; if no admissible candidate exists: return `CandidateSet=∅` plus an escalation hint (`ActionHint`) and the pins required to plan next steps (P2W split applies) |
| **G.5‑4 Compose**                 | `CandidateSet`, composition template refs, pinned legality constraints                                                                                       | Composite strategy surface (template‑level; legality‑checked; pinned)                                                                                                                                                                                      |
| **G.5‑5 Telemetry**               | run outcomes + citations + policy/edition pins                                                                                                               | refresh cues (typed RSCR causes + payload pins), parity deltas (if parity harness is in use), telemetry pins (selector‑side; orchestration surface is `G.11`)                                                                                              |
### Worked selector slice

- A catalyst-search team is choosing among three method families for the same declared `TaskSignature` and `C.22.1` adaptation signature.
- The shared profile pins one work-measure threshold target, one freshness window, one prior-exposure declaration, and one adaptation budget. One family reaches threshold quickly but carries high downside burden on adjacent tasks. One family is slower but transfers cleanly. One family never clears `MinimalEvidence` and must abstain.
- A lawful `G.5` result therefore publishes a set-return shortlist or a narrowed handoff plan, with `DRR/SCR` citing why the third family was excluded and why the first two remain non-dominated. The selector does not invent one scalar winner and does not hide the specialization profile in wiring notes.
- When one upstream `C.19` pass has already narrowed the live pool to one internal retained subset over registered families, `G.5` may publish that result as one `Shortlist` with one `ShortlistId` and explicit basis pins only when selector-facing publication is now the burden. Until that emission occurs, the internal retained subset is not yet one public shortlist artifact.
### Published selected-set result and closure rule

A finished `G.5` pass should publish one explicit selected-set result from the dispatcher/registry burden rather than one selector trace that leaves the public artifact implicit.

Publication here is the closure surface of selector work over registered families. It does not replace registry maintenance, dispatcher comparison law, or the upstream pool-policy and local-choice owners that supplied the retained members.

The lawful published heads here are:

- `Shortlist` when one retained set is published without one material internal order;
- `RankedShortlist` when ordering materially belongs to the published result;
- one specialist portfolio or narrowed handoff plan when heterogeneity is the truthful result;
- one explicit abstain or escalation result when no admissible candidate exists.

`Shortlist` and `RankedShortlist` are public selector artifacts over registered rows. They are not merely one upstream internal retained subset copied forward under one prettier head. `G.5` is the owner that turns selector state into one public artifact with one explicit head, one explicit member set, and one explicit basis surface.

A publication result should state at least these fields:

- the public head being emitted;
- retained members, or the narrowed handoff content, or the abstain condition;
- ordering status when ordering matters;
- basis pins and policy pins sufficient to justify the result;
- one explicit next downstream use posture when the result is a handoff rather than one terminal publication.

A compact result may therefore look like:

```text
Shortlist(
  members = [family_A, family_C],
  shortlistId = shortlist_17,
  ordering = unordered,
  basisPins = [pathSlice_41, scr_22],
  nextUse = downstream_comparison
)
```

or:

```text
RankedShortlist(
  members = [family_B, family_A],
  shortlistId = shortlist_23,
  ordering = ranked,
  basisPins = [pathSlice_77, scr_44],
  nextUse = specialist_handoff
)
```

Close as `Shortlist` when several retained members survive lawfully but no public internal order belongs to the result. Close as `RankedShortlist` when order materially belongs to the published artifact. Close as one specialist portfolio or narrowed handoff when heterogeneity itself is the truthful downstream surface. Close as abstain or escalation when no admissible candidate exists under the pinned constraints.

If the publication still does not state what public artifact was emitted, who remained in it, whether order belongs to it, and which pins justify it, then the selector has not yet published one finished `G.5` result.
### Publication quick card

The smallest useful `G.5` publication card usually states:

- `publicHead = Shortlist | RankedShortlist | portfolio | narrowed handoff | abstain`
- `membersOrHandoff = ...`
- `ordering = ranked | unordered | n/a`
- `publicId = ...` when one public identity is emitted
- `basisPins = ...`
- `nextUse = downstream comparison | specialist handoff | escalation | none`

A short lawful card may therefore read:

```text
publicHead = Shortlist
members = [family_A, family_C]
ordering = unordered
shortlistId = shortlist_17
basisPins = [pathSlice_41, scr_22]
nextUse = downstream_comparison
```

If the card does not already state what was published, who survived, whether order belongs to the result, and which pins justify it, the publication is still unfinished `G.5` work.
### Worked publication closure slice

Three short contrasts keep the publication law practical.

**Several survivors, no public order belongs to the result.**
When the selector has retained more than one lawful family but no downstream public order belongs to the artifact, `G.5` should close as one `Shortlist` over the registered surviving rows:

```text
Shortlist(
  members = [family_A, family_C],
  shortlistId = shortlist_17,
  ordering = unordered,
  basisPins = [pathSlice_41, scr_22],
  nextUse = downstream_comparison
)
```

**Order now materially belongs to the published result.**
When one ordered public handoff is required, `G.5` should say so directly instead of leaving order implicit:

```text
RankedShortlist(
  members = [family_B, family_A],
  shortlistId = shortlist_23,
  ordering = ranked,
  basisPins = [pathSlice_77, scr_44],
  nextUse = specialist_handoff
)
```

**No admissible candidate survives.**
When no family clears the pinned legality or evidence gates, `G.5` should close as one abstain or escalation result rather than as one empty shortlist pretending to be progress:

```text
Abstain(
  blockingPins = [cg_min_evidence, crossing_bundle_missing],
  basisPins = [pathSlice_91, scr_61],
  nextUse = escalation
)
```

The practical distinction is simple: an internal retained subset can remain real upstream without yet being one public selector artifact. `G.5` begins only when that selector-facing publication burden starts, and it closes only after the public head, surviving members, and basis pins are emitted directly.

Most selector-side use can stop after `G.5:4.4d`. The blocks below are binding-only docking records used only when the corresponding mode is actually active.

All blocks below are **wiring‑only**: they declare `Uses` and required pins, but do not redefine semantics already defined in the referenced patterns.

**GPatternExtension block: `G.5:Ext.EELog`**

* `PatternScopeId`: `G.5:Ext.EELog`
* `GPatternExtensionId`: `EELog`
* `GPatternExtensionKind`: `MethodSpecific`
* `SemanticOwnerPatternId`: `C.19`
* `Uses`: `{C.19}`
* `⊑/⊑⁺`: `∅`
* `RequiredPins/EditionPins/PolicyPins (minimum):`

  * `EELensPolicyRef` *(or equivalent lens/policy id carried by `C.19`)*
  * `RiskBudgetRef?`
  * `ProbeAccountingRef?`
  * `FailureBehaviorPolicyId?` *(if degrade behavior is routed through policy)*
* `RSCRTriggerKindIds`: `{RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.FreshnessOrDecayEvent}`
* `Notes (wiring‑only; semantics routed):`

  * This block activates exploration/exploitation‑governed dispatch.
  * Post‑2015 examples that typically land here (as *wiring targets*, not core rules): modern bandit‑style or Bayesian selection under explicit risk budgets; adaptive evaluation/probing regimes; safe‑exploration variants where “abstain/degrade” is policy‑bound.

**GPatternExtension block: `G.5:Ext.SoSLOG`**

* `PatternScopeId`: `G.5:Ext.SoSLOG`
* `GPatternExtensionId`: `SoSLOG`
* `GPatternExtensionKind`: `MethodSpecific`
* `SemanticOwnerPatternId`: `C.23`
* `Uses`: `{C.23}`
* `⊑/⊑⁺`: `∅`
* `RequiredPins/EditionPins/PolicyPins (minimum):`

  * `SoSLogRuleId[]`
  * `SoSLogBranchId[]` *(including escalation branches, if used)*
  * `FailureBehaviorPolicyId` *(if degrade behavior is made explicit)*
  * `MaturityRungId[]?` *(when maturity ladders are used as gates; semantics come from `C.23`)*
  * `AdmissibilityLedgerRef?` *(when selector consumes admissibility rows rather than recomputing thresholds)*
* `RSCRTriggerKindIds`: `{RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.MaturityRungChange, RSCRTriggerKindId.EvidenceSurfaceEdit}`
* `Notes (wiring‑only; semantics routed):`

  * This block pins dispatch decisions to explicit rule/branch ids, enabling auditable “why” without inventing a fourth acceptance status.

**GPatternExtension block: `G.5:Ext.NQD`**

* `PatternScopeId`: `G.5:Ext.NQD`
* `GPatternExtensionId`: `NQD`
* `GPatternExtensionKind`: `MethodSpecific`
* `SemanticOwnerPatternId`: `C.18`
* `Uses`: `{C.18, C.19}`
* `⊑/⊑⁺`: `∅`
* `RequiredPins/EditionPins/PolicyPins (minimum):`

  * `DescriptorMapRef.edition`
  * `DistanceDefRef.edition`
  * `InsertionPolicyRef`
  * `TaskSignatureRef` *(when QD is enabled via TaskSignature flags/traits)*
  * `DHCMethodRef.edition?` *(when diversity/coverage telemetry is pinned to a DHC method)*
* `RSCRTriggerKindIds`: `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.FreshnessOrDecayEvent}`
* `Notes (wiring‑only; semantics routed):`

  * G.5 core remains QD‑agnostic; QD semantics are routed to `C.18`.
  * Post‑2015 families that typically dock here: MAP‑Elites‑class QD (incl. later archive‑centric refinements), CMA‑ME‑class hybrids, modern illumination/coverage telemetry regimes where legality and edition pinning matter.

**GPatternExtension block: `G.5:Ext.OpenEndedFamilyWiring`**

* `PatternScopeId`: `G.5:Ext.OpenEndedFamilyWiring`
* `GPatternExtensionId`: `OpenEndedFamilyWiring`
* `GPatternExtensionKind`: `GeneratorSpecific`
* `SemanticOwnerPatternId`: `G.2` *(family semantics live in SoTA cards; G.5 only wires pins)*
* `Uses`: `{G.2, C.19, C.23}`
* `⊑/⊑⁺`: `∅`
* `RequiredPins/EditionPins/PolicyPins (minimum):`

  * `GeneratorFamilyId[]`
  * `TransferRulesRef.edition` *(mandatory when Open‑Ended is enabled)*
  * `EnvironmentValidityRegionRef?`
  * `CoEvoCouplerRef[]?`
  * `SoSLogBranchId[]?` *(when validity of generated tasks is gated by explicit branches)*
* `RSCRTriggerKindIds`: `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.FreshnessOrDecayEvent}`
* `Notes (wiring‑only; semantics routed):`

  * This block enables portfolios of `{Environment, MethodFamily}` pairs without redefining generator semantics in G.5.
  * Post‑2015 examples typically referenced via `G.2` family cards: POET‑class and later open‑ended/co‑evolutionary regimes, including enhanced variants where transfer policies and validity gates must be edition‑pinned.
## Archetypal Grounding

**Tell (archetype).**
**System** must choose among rival families without lying about measurement legality, crossings, or evidence. **Episteme** insists that what is chosen must remain comparable, auditable, and stable under refresh.

**Show 1 (multi-Tradition dispatch; unordered shortlist).**
A `CG-Frame` includes multiple decision-theoretic families with different admissibility assumptions. Evidence for some CHR traits is incomplete.
System registers families (S1), then runs `Select` (S3) on a pinned `TaskSignatureRef`. Eligibility is tri-state; some families **abstain** due to missing minimal-evidence pins. Among remaining candidates, only a partial order is lawful, so the selector publishes one `Shortlist` with explicit `basisPins` instead of inventing one scalar winner. No shadow acceptance logic appears in the selector; it consumes pinned acceptance and legality surfaces.

**Show 2 (specialist handoff; ranked publication).**
A bounded-specialization comparison keeps two method families live, but downstream handoff now requires one ordered public result rather than one merely unordered retained set.
The lawful `G.5` result is therefore one `RankedShortlist` with explicit ordering, `ShortlistId`, and handoff-facing `nextUse`, so the publication itself states whether the order is public.

**Show 3 (no admissible survivor; abstain or escalation).**
A frame fails one legality gate and one minimal-evidence gate at the same time.
The truthful `G.5` result is one abstain or escalation publication that names the blocking pins and the next downstream use posture, not one empty shortlist that leaves downstream users unsure whether selection silently failed or lawfully stopped.
## Bias-Annotation

Potential biases and failure modes this pattern explicitly guards against:

* **Monoculture bias (single Tradition dominance by default).** Mitigation: registry requires explicit eligibility/assurance surfaces; selection is set‑returning under partial orders; method‑specific policies are explicit pins, not hard‑coded defaults.
* **Hidden scalarisation bias.** Mitigation: set‑return semantics is core‑routed; dominance regimes are explicit and default routing is singular and declared.
* **“Tool equals method” bias.** Mitigation: notation independence + prohibition of tool keywords in core registry/eligibility fields; tool choices are outside the core.
* **Cross‑Context leakage bias.** Mitigation: explicit crossing pins only; Bridges + CL are required when crossings occur; no implicit crossings.
* **Survivorship bias in refresh.** Mitigation: RSCR triggers are typed/id‑based; freshness/decay and telemetry deltas are first‑class causes with canonical ids.
## Conformance Checklist (normative)

| ConformanceId   | Statement |
| --------------- | ----------| 
| `CC‑G5‑CoreRef` | **Core conformance bridge.** `G.5` is conformant only if the **effective** `G.Core` obligations referenced by `G.5:4.1 (GCoreLinkageManifest)` are satisfied (after profile/set expansion and explicit deltas). |
| `CC‑G5.0`       | Core standards **SHALL** remain notation‑independent; vendor/tool keywords are forbidden in registry, eligibility, assurance, or selector‑kernel obligations (E.5.*). |
| `CC‑G5.1`       | Every `MethodFamily` **SHALL** declare an `EligibilityStandardRef` using CHR/CAL terms (typed; edition‑pinned where applicable). Standards **SHALL NOT** rely on tool‑specific keywords.  |
| `CC‑G5.2`       | Selection **SHALL** be a pure function of `TaskSignatureRef` + pinned policy/edition refs; side effects are limited to emitting DRR/SCR pins and telemetry/RSCR triggers (no hidden mutation of contract surfaces). |
| `CC‑G5.3`       | **Delegated (ID‑continuity).** Cross‑Context use **MUST** follow `G.Core` crossing visibility and penalty routing. **Delegation targets:** `CC‑GCORE‑CROSS‑1`, `CC‑GCORE‑PEN‑1`.  |
| `CC‑G5.4`       | **Default rule for** `DefaultId.GammaFoldForR_eff`. The selector **MUST** default to the weakest‑link rule for `R_eff` and record contributors in SCR; it **MAY** use an alternative Γ‑fold only when provided by an explicitly pinned policy/profile with proof obligations satisfied (monotonicity; boundary behavior). |
| `CC‑G5.5`       | Ordinal scales **MUST NOT** be averaged/subtracted; any aggregation/comparison must respect CHR scale typing and legality constraints (incl. CSLC where applicable). |
| `CC‑G5.6`       | Method and generator family identities **SHALL** be published to UTS with the required naming discipline (twin labels where applicable; deprecations follow lexical continuity rules). *(Core routing applies; G.5 adds the registry‑specific publication obligation.)* |
| `CC‑G5.7`       | **Conditional.** If `G.5:Ext.EELog` is present, exploration **MUST** be budgeted under the pinned E/E‑LOG policy; probe outcomes **MUST** feed refresh via canonical RSCR trigger kinds. |
| `CC‑G5.8`       | **CG‑Frame gate enforced.** Selection rejects or abstains from candidates that do not meet the pinned `CG‑Spec.MinimalEvidence` requirements for the characteristics they cite. |
| `CC‑G5.9`       | **Delegated (ID‑continuity).** Set‑return semantics are routed via `G.Core`. **Delegation target:** `CC‑GCORE‑SET‑1`. Candidate ordering **MUST** be lawful over typed traits and legality constraints. If only a partial order is available, selection **MUST** return a set/portfolio result (no forced totalisation via illegal scalarisation). |
| `CC‑G5.10`      | **SCR completeness.** SCR **MUST** enumerate Γ‑fold contributors (when used), referenced contract surface editions, the evidence citations (`PathId/PathSliceId`) used in gating/rationale, and `MinimalEvidence` gating verdicts *(by lane & carrier, when such gating is relied upon).* |                                                      
| `CC‑G5.11`      | **Delegated (ID‑continuity).** Tri‑state eligibility/acceptance semantics and unknown handling are routed via `G.Core`. **Delegation target:** `CC‑GCORE‑GUARD‑1`. *(Includes the rule that `degrade(...)` is expressed via a pinned FailureBehavior/SoS‑LOG branch id — not as a fourth status.)* |
| `CC‑G5.12`      | **No “universal” cross‑Tradition scoring.** Cross‑Tradition selection **MUST NOT** rely on a single numeric formula not justified by pinned CHR/CAL constraints and the contract surfaces. If a triad/portfolio **claims universality**, it **MUST** satisfy **explicit, pinned** heterogeneity gates (ids/pins), e.g., `FamilyCoverage ≥ k` and `MinInterFamilyDistance ≥ δ_family`, where `k` and `δ_family` are declared by the pinned policy/TaskSignature/SoTA pack, and cite the relevant **Context Card id (F.1)** in DRR/SCR; otherwise treat the outcome as Context‑local.  |
| `CC‑G5.13`      | **Conditional.** If the selector consumes admissibility/maturity artefacts (e.g., via `G.5:Ext.SoSLOG`), it **MUST NOT** recompute thresholds; it consumes pinned admissibility ledger rows and cites clause/rung ids in audit pins. |
| `CC‑G5.14`      | **Φ(CL) / Φ_plane discipline.** If crossing or plane penalties are applied, the active penalty policy ids (e.g., `Φ(CL)`, `Φ_plane`) **MUST** be explicit in audit pins, and the pinned policies **MUST** satisfy the monotone & bounded requirements asserted by their cited contract surfaces and be published via those same cited surfaces (e.g., `CG‑Spec`). SCR **MUST** record the policy‑id in use; penalty routing semantics remain routed via `G.Core`. |
| `CC‑G5.15`      | Units/scale legality **MUST** be established via CSLC (A.18) before any aggregation or Γ‑fold; unit/scale mismatches are a fail‑fast defect. |
| `CC‑G5.16`      | Hidden thresholds are forbidden. Thresholds live in explicitly pinned acceptance/eligibility policy artefacts, not in selector prose, LOG shells, or code.  |
| `CC‑G5.17`      | ReferencePlane **MUST** be declared (pinned) for any claim that is used in dispatch, and the selector’s audit artefacts must cite it (including plane‑crossing pins when applicable). |
| `CC‑G5.18`      | Numeric comparisons/aggregations used by dispatch **MUST** cite a lawful, edition‑pinned comparator/spec surface (as provided by the contract surfaces); illegal mixes of scale types are forbidden. |
| `CC‑G5.19`      | **Conditional (QD).** If `G.5:Ext.NQD` is present, the required QD telemetry triple (quality/diversity/QD summary) **MUST** be computable and publishable under the pinned descriptor/distance definitions and archive policy, without redefining their semantics in G.5. |
| `CC‑G5.20`      | **Conditional (QD).** QD/illumination summaries are treated as telemetry unless explicitly promoted by a pinned acceptance/policy artefact; the selector must record the promoting policy id in audit pins. |
| `CC‑G5.21`      | **Conditional (Archive/QD).** Any use of archives **MUST** declare `InsertionPolicyRef` and pin the required editions for reproducibility (e.g., descriptor/distance definitions and any method editions they depend on).  |
| `CC‑G5.22`      | **Conditional (QD).** Twin‑naming discipline for descriptor vs plain space (if used) must be respected (distinct objects; no aliasing).  |
| `CC‑G5.23`      | **Default rule for** `DefaultId.PortfolioMode`. The selector **MUST** expose `PortfolioMode ∈ {Pareto, Archive}` with **default = `Archive`**, and echo it in DRR/SCR and portfolio artefacts when not explicitly overridden by pinned policy/TaskSignature. `ε`‑fronts are allowed as *local* decision aids under `CG‑Spec` when explicitly pinned.  |
| `CC‑G5.23a`     | **Parity‑run publication.** If parity harness is in use, a selector/generator **MUST** publish a parity run and `ParityCard` to **UTS** (see `G.9`). This obligation remains mandatory irrespective of dominance/portfolio policy. |
| `CC‑G5.24`      | **Conditional (Open‑Ended).** If `G.5:Ext.OpenEndedFamilyWiring` is present, the selector **MUST** support portfolios of `{Environment, MethodFamily}` pairs as set‑valued outcomes under explicit pins. |
| `CC‑G5.25`      | **Conditional (Open‑Ended).** In Open‑Ended mode, `TransferRulesRef.edition` is mandatory and **MUST** be visible to telemetry and RSCR triggers.  |
| `CC‑G5.26`      | **Conditional (Archive/QD).** Within any archive niche/cell, ordering and tie‑breaks **MUST** remain lawful over compatible scales; illegal mixed‑scale weighted sums are forbidden. |
| `CC‑G5.27`      | If the selector cites any `GateCrossing`, the corresponding `CrossingBundle` publication **MUST** be present and conformant; missing/non‑conformant `CrossingBundle` blocks downstream consumption. | 
| `CC‑G5.28`      | **Default rule for** `DefaultId.DominanceRegime`. `DominanceRegime` **SHALL** default to `ParetoOnly`. Any inclusion of additional telemetry dimensions into dominance (e.g., illumination) requires an explicitly pinned acceptance/policy artefact and must be recorded in audit pins. **Parity‑run publication (CC‑G5.23a) remains mandatory** irrespective of dominance policy. |
| `CC‑G5.29`      | **Conditional (QD/Open‑Ended).** Any telemetry event that materially changes an archive/portfolio state **MUST** log `PathSliceId`, the active policy id, and the active editions of the relevant definition pins (`DescriptorMapRef.edition`, `DistanceDefRef.edition`, and `TransferRulesRef.edition` when applicable) and expose them to RSCR triggers. |
| `CC‑G5.30`      | **No Strategy minting.** Within `G.5`, “strategy” is a policy‑bound composition surface; the pattern **SHALL NOT** mint a new universal `U.Type` named `Strategy` (E.10 discipline). If a stable reference is needed, publish composition/policy ids (e.g., UTS entries) rather than minting a universal type. |
| `CC‑G5.31`      | **Strategy hint on non‑admissible sets.** If selection yields `CandidateSet = ∅`, the selector **SHALL** emit an explicit escalation hint (`ActionHint`) that is **DRR/SCR‑compatible** and auditable: include (at minimum) the top‑3 blocking constraints as cited ids/pins, and (where applicable) the relevant edition pins (e.g., `TransferRulesRef.edition` in Open‑Ended mode) to guide exploration under explicitly pinned lenses (e.g., E/E‑LOG). |
| `CC‑G5.32`      | **Parity‑run publication + lawful roll‑ups.** If parity harness is in use, parity publication is required per `CC‑G5.23a` (ID‑continuity). Any scalar roll‑up or summary view **MUST** be lawful under **CG‑Spec** (no mixed‑scale sums), and published views must preserve set‑return semantics (no single‑score leaderboards as authoritative outputs without an explicit, lawful comparator surface). |
| `CC‑G5.33`      | **Conditional (bounded specialization).** When the selection burden is acquisition of usable specialization on a declared `TaskFamilyRef` or `TaskSignature`, selector outputs **SHALL** either publish `TaskFamilySpecializationProfile@Context` or cite equivalent pins carrying the `C.22.1` adaptation-signature fields needed for comparison: work-measure threshold target, prior exposure declaration, time-to-threshold, budget-to-threshold, post-threshold efficiency when relevant, and any declared transfer, retention, downside, or corridor-entry notes. |
| `CC‑G5.34`      | **Selected-set publication head.** When the selector is publishing one retained set or narrowed handoff result, the published head **MUST** be explicit. Use `Shortlist` as the public selected-set head, `RankedShortlist` only when ordering materially belongs to the result, publish `ShortlistId` when one public identifier is emitted, and do not silently let `ChoiceSet` replace that public head. |
| `CC‑G5.35`      | **Publication closure.** Any published selected-set result **MUST** state the public head, retained members or narrowed handoff content, ordering status (when applicable), and basis pins directly in the emitted result rather than relying on upstream `C.11`, `C.19`, or `C.24` notes. |
| `CC‑G5.36`      | **Neighboring-pattern reroutes.** If the burden is still local choice among already-available options, pool policy over still-live candidate lines, or enactment planning after choice, `G.5` **MUST** consume the published result from `C.11`, `C.19`, or `C.24` rather than restating those patterns as if publication itself decided the matter. |
## Common Anti-Patterns and How to Avoid Them

* **Anti‑pattern: “Selector as a shadow spec.”**
  *Symptom:* local acceptance/legality rules appear in selector prose/code, diverging from CN/CG/CAL.
  *Avoid:* route all contract semantics via `CNSpecRef/CGSpecRef` and pinned CAL artefacts; keep G.5 core as a façade.

* **Anti‑pattern: “Implicit crossings.”**
  *Symptom:* cross‑Context reuse is claimed without Bridge/CL pins, or without cited `CrossingBundle`.
  *Avoid:* require explicit crossing pins; block consumption without publication.

* **Anti‑pattern: “Hidden scalarisation.”**
  *Symptom:* partial orders are flattened into single winners “for convenience”.
  *Avoid:* return sets/portfolios; make dominance regimes explicit; keep telemetry report‑only unless promoted by explicit policy.

* **Anti‑pattern: “Method specifics in the selector head.”**
  *Symptom:* QD/OEE/preference models become mandatory for basic dispatch.
  *Avoid:* keep them in `G.5:Ext.*` blocks with explicit pins and `Uses`.

* **Anti‑pattern: “Churn by meaning.”**
  *Symptom:* registry entries are “renamed” to reflect updated interpretation, breaking continuity.
  *Avoid:* version/deprecate; keep stable ids; use explicit edition pins and deprecation notices.

* **Anti‑pattern: “Publication hidden in upstream reasoning.”**
  *Symptom:* the retained set exists only as one implication inside `C.11`, `C.19`, or `C.24`, while `G.5` never names the published head.
  *Avoid:* publish the selected-set artifact directly, with explicit head, members, and basis pins, instead of leaving the shortlist implicit in neighboring doctrine.

* **Anti‑pattern: “Published result without closure surface.”**
  *Symptom:* a `Shortlist`, narrowed handoff, or abstain result is named, but the emitted result still does not state its members, ordering status, or basis pins.
  *Avoid:* publish the head, retained members, ordering status, abstain or escalation condition, and basis pins directly in `G.5`.
## Consequences

* **Auditable plurality.** Multiple Traditions can co-exist without forced semantic flattening; dispatch remains explainable and evidence-pinned.
* **Core stability.** Universal invariants are routed via `G.Core`; method/generator innovation does not churn the selector head.
* **Evolvability.** Registries support growth, retirement, and refresh with typed RSCR causes and explicit payload pins.
* **Composability.** Strategy templates and fallbacks remain legality-checked and portable across implementations.
* **Recoverable publication.** Selected-set results can now travel downstream as explicit shortlist-family, ranked-shortlist, or abstain/escalation artifacts rather than one hidden implication inside upstream reasoning.
## Rationale

* **Why registries?** Dispatch requires stable, auditable family objects with explicit eligibility and assurance surfaces; otherwise selection collapses into ad-hoc tooling.
* **Why separation via Extensions?** QD/OEE/preference-learning and similar families are fast-moving and method-specific; making them part of the selector head would force a universal semantics and violate strict distinction.
* **Why set-return?** Partial orders are common and often the only lawful representation under heterogeneous scales; set-return preserves semantics and makes tie criteria explicit.
* **Why explicit defaults with one declared source?** Defaults are unavoidable; single-source indexing prevents competing defaults from silently diverging across patterns.
* **Why selected-set publication here?** Once the burden is to surface one retained set for downstream use, the selector should publish that artifact directly instead of leaving it implicit in local choice, pool-policy, or enactment notes written for other purposes.
## SoTA-Echoing

This pattern is designed to **host** (not redefine) post-2015 SoTA families via `Uses` plus edition and policy pins:

* **Quality-Diversity / illumination (post-2015 refinements).** Archive-centric QD families fit naturally as `G.5:Ext.NQD` wiring with explicit descriptor, distance, and insertion pins. The practical implication is to keep publication honest about whether the selector is returning one lawful set, one ranked artifact, or no admissible survivor at all.
* **Open-Endedness (post-2015 wave).** POET-class and later open-ended or co-evolutionary families dock via generator registries plus `TransferRulesRef.edition` pins. The practical implication is to publish pair- or portfolio-shaped results explicitly rather than silently squeezing them into one false single-family winner.
* **Algorithm selection and meta-selection.** Modern selection under uncertainty, robust evaluation, and policy-driven probing dock via explicit policy surfaces and typed telemetry pins, rather than hard-coded scoring rules. The practical safeguard is that the publication head and basis pins must still remain explicit after those policies have acted.
* **Budgeted specialist acquisition.** Current agentic search lines compete on time or budget to threshold plus truthful portfolio return when heterogeneous specialists remain non-dominated, so `G.5` keeps specialization profiles and set-return semantics explicit instead of forcing one static breadth winner.
* **Preference-learning comparators.** Interactive and learned-preference regimes are treated as comparator or policy artefacts with explicit editions when they are actually declared.

SoTA here is treated as **best-known practice for a declared goal and constraint regime**, not whatever is currently popular.
Evidence-tier clarification: peer-reviewed anchors carry the strongest support for typed comparison, budget-to-threshold, and truthful portfolio return. Faster-moving workshop, poster, or frontier-exploration lines remain explicit support for corridor-entry or open-ended pressure, not silently equal evidence for every selector claim.
## Relations

**Builds on (normative):** `G.Core` (core invariants + linkage discipline).

**Uses (conceptual dependencies; cited via pins/ids):**

* Contract surfaces: `A.19 (CN‑Spec)`, `G.0 (CG‑Spec)`.
* Upstream kits: `G.1 (CG‑Frame Card)`, `G.2 (SoTA Pack)`, `G.3 (CHR Pack)`, `G.4 (CAL Pack)`.
* Evidence & crossings: `G.6 (EvidenceGraph; PathId/PathSliceId)`, `G.7 (Bridge/CL calibration)`, `E.18/A.21 (CrossingBundle/GateChecks)`.
* Planning/enactment boundary: `A.15.3 (SlotFillingsPlanItem)` as the planned baseline anchor (cited, not redefined).
* Optional method/generator extensions via `G.5:Ext.*`: `C.18`, `C.19`, `C.23`, plus any future extension-bearing patterns that add extra selector pins.

**Publishes to:** `UTS` (family ids, selector policy surfaces, and selected-set identities such as `ShortlistId` when one public artifact is emitted), `G.6` (audit citations), RSCR emission surfaces (typed triggers + payload pins), and downstream packs via `G.10` shipping surfaces.

**Coordinates with:** `C.11` for local choice results, `C.19` for pool-policy records, `C.24` for enactment-facing next-move records, and the accepted Q-front shortlist-family continuity line when the published head is one shortlist-family artifact.
## G.5:End
