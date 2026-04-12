---
title: "Part G – Discipline SoTA Patterns Kit"
description: "Generated reference page for heading:part-g-discipline-sota-patterns-kit:54271."
---

# Part G – Discipline SoTA Patterns Kit
> Preface node `heading:part-g-discipline-sota-patterns-kit:54271`

## Content

## G.Core - Part G Core Invariants

**Tag.** Architectural pattern (Part‑G core invariants hub; refactoring/deduplication)
**Stage.** *design‑time* (authoring discipline + ID‑stable routing; no run‑time mechanism)
**Primary hooks.** E.8 (pattern template), E.10 (lexical/ontological rules), E.19 (conformance discipline), A.6.7 (SuiteObligations + suite protocol pins), A.15.3 (planned baseline), A.19 (CN‑Spec), G.0 (CG‑Spec), A.19.CHR (CHR suite boundary), C.23 (SoS‑LOG), F.17 (UTS), F.15 (RSCR).

**Status.** Draft (Phase‑2 deliverable)  
**Placement.** Part G → immediately after `G.0` (without renumbering `G.0…G.13`)  
**Normativity.** Normative unless explicitly marked informative  

**Purpose.** Provide a *single owner* for Part‑G‑wide invariants (**delegation‑first routing**), plus a typed **RSCR trigger kind catalogue** and a **Default Ownership Index**, so Part G can be refactored without semantic drift or public‑ID breakage.

**Phase‑2 constraint.** `G.Core` is the only new Part‑G pattern introduced in Phase‑2; discipline/method/generator specifics remain in `G.x` as `Extensions`, citations to existing owner‑patterns, or Phase‑3 seeds (appendix) without new Phase‑2 norms.

**Post‑Phase‑2 evolvability policy.** The Phase‑2 restriction above is historical. From Phase‑3 onward, new Part‑G `PatternId`s are permitted when (i) they introduce a genuinely new **kit/pack class** (typically levels `G.2–G.5`), or (ii) they are required to preserve **single‑owner** discipline and wiring‑only separation. Method/discipline/generator specifics SHOULD still default to `GPatternExtension` modules under `G.x:Extensions` (scoped by `PatternScopeId = G.x:Ext.*` and `SemanticOwnerPatternId`), rather than adding new Part‑G patterns.

### G.Core:1 - Problem frame

Part G contains patterns for CG‑frame characterization and its downstream artefacts (cards, evidence graphs, bridge surfaces, refresh/shipping orchestration, parity harnesses, dashboards, interop surfaces). In the current spec, several invariants are already present as **suite obligations/protocol norms** and are **reused across Part G**.

*Part‑G‑wide* invariants reside in `G.Core` as a single-owner pattern so every `G.x` can:

* cite the core invariants rather than restating them, and
* isolate pattern-scoped specifics as `Extensions` without turning each `G.x` into a mixed bag of universal rules, kit surfaces, and method/generator descriptions.

This pattern (`G.Core`) therefore acts as the **deduplication hub** for FPF Part G.
### G.Core:2 - Problem

Without a single owner for Part‑G‑wide invariants, Part G drifts in at least six recurring ways:

1. **Shadow contract surfaces** emerge: downstream patterns restate CN‑Spec / CG‑Spec constraints, accidentally creating “local specs” that can diverge from the canonical contract surfaces.
2. **Crossing discipline becomes inconsistent**: “crossing events” and “crossing visibility” are described differently across `G.x`, causing ambiguity about what must be pinned (UTS/Path/policy‑ids/editions) and what triggers refresh/regression.
3. **Guard semantics drift**: tri‑state eligibility and “unknown handling” can be reinterpreted in local prose, producing hidden fourth statuses or implicit coercions.
4. **Hidden scalarization appears**: partial orders are silently collapsed into scalars, or totalization is introduced implicitly through “helpful” numeric summaries.
5. **Suite/kit/pack mixing blurs ownership**: downstream patterns drift into “owning” what should remain owned by the suite boundary (A.6.7/A.19.CHR), kit surfaces (each `G.x`), or shipping (G.10).
6. **Refactoring breaks public IDs**: CC items and trigger labels become hard to evolve because removing duplicates risks breaking external references.

Part G requires a single place where these invariants and refactoring disciplines live, while keeping Part G patterns modular and method/discipline specifics explicitly separated.
### G.Core:3 - Forces

* **Single source of truth vs. usability:** We must centralize universal invariants, but `G.x` must remain readable and pattern-scoped for authors.
* **Delegation-first vs. completeness:** Many norms already have canonical owners (A.6.7 / A.15.3 / A.19 / G.0 / A.19.CHR / E.*). G.Core must route to them rather than duplicating semantics.
* **Backwards compatibility:** Public CC IDs and legacy trigger tokens must remain stable; deduplication must not break citations.
* **Typed change control:** RSCR/refresh must become *id‑based* (catalogued trigger kinds) rather than prose-based “meaning”.
* **Strict distinction:** Keep contract surfaces (CN‑Spec, CG‑Spec), suites, kits/surfaces, policies, planned baselines, audits, and refresh orchestration distinct.
* **Minimal specificity naming:** New IDs must be kind‑suffixed and minimally specific, to reduce semantic lock‑in while remaining precise.
* **Phase‑2 scope discipline:** `G.Core` must not become a container for discipline/method/generator taxonomies; those remain pattern-scoped (`Extensions`), delegated to existing owner‑patterns, or marked Phase‑3 seeds (appendix) without new Phase‑2 norms.
### G.Core:4 - Solution

`G.Core` establishes Part‑G‑wide invariants as **routing rules + typed catalogs + authoring discipline**.

#### G.Core:4.1 - Delegation-first routing for Part‑G‑wide invariants

`G.Core` is a *routing hub*, not a “second spec”. For any Part‑G‑wide invariant that already has an owner, `G.Core`:

1) standardises naming via `SuiteObligations.*` (A.6.7:4.2), and  
2) records where the invariant is owned, so downstream patterns cite rather than restate.

**Routing table (normative index; no semantic duplication).**

| Obligation handle | Canonical owner(s) | Part‑G note |
| --- | --- | --- |
| `transport_declarative_only` + `cg_spec_cite_required_for_numeric_ops` | A.6.7 + A.19 (CN‑Spec) + G.0 (CG‑Spec) + A.19.CHR | CN/CG are *pins*, not copies (“contract surfaces are pins, not copies”). No embedded/shadow contract surfaces. |
| `bridge_only_crossings` | A.6.7 + E.18 | Any cross‑Context/plane/kind move is Bridge‑mediated; no implicit crossings. |
| `crossing_visibility_required` | E.18 (CrossingBundle) + A.6.7 | Crossing visibility is a published **CrossingBundle**. `edition_key` changes on **crossing‑relevant artefacts** (Bridge/CL surfaces, BridgeCards, CrossingBundle registries, and UTS rows for crossing artefacts) are treated as crossing-bundle edits. If the required CrossingBundle is missing/non‑conformant, downstream consumers MUST **abstain** from cross‑Context/plane reuse (no silent crossings). |
| `two_bridge_rule_for_described_entity_change` | A.6.7 | describedEntity retargeting requires an explicit KindBridge (`CL^k`) in addition to any Context/Plane Bridge. |
| `guard_decision_tristate(pass|degrade|abstain)` + `unknown_never_coerces_to_pass` | A.6.7 + C.23 | `GuardDecision := {pass|degrade|abstain}` only; `unknown` maps to `degrade`/`abstain` via explicit SoS‑LOG branch/policy pins. |
| `penalties_route_to_r_eff_only` | A.6.7 | Penalties affect the **R lane (R_eff)** only; **F/G invariants** must not be altered by penalties. |
| `no_silent_scalarisation_of_partial_orders` + `no_silent_totalisation` | A.6.7 | Partial orders stay set‑valued; no silent scalar ranks or “helpful” totalisation. |
| `planned_slot_filling_in_work_planning_only` + `finalize_launch_values_in_work_enactment_only` + `gate_decision_separation` | A.15.3 + A.19.CHR + A.6.7 | Planned baselines are WorkPlanning‑only; launch/finalization values are WorkEnactment‑only; planning does not own GateDecision/DecisionLog semantics. |
| `DefaultOwnershipIndex.single_owner_per_DefaultId` | this pattern | Any default has exactly one owner; `G.Core.DefaultOwnershipIndex` is an index, not a second spec. |

This pattern also owns four pieces of Part‑G‑wide infrastructure that are **not** already owned elsewhere:

* the typed **RSCRTriggerKindId catalogue** (single writer),
* the **Default Ownership Index** (single owner per DefaultId; index only), and
* the **Δ‑discipline** for ID‑stable deduplication (delegation without public‑ID breakage), and
* the **linkage compression catalogues** (`GCoreConformanceProfileId`, `GCoreTriggerSetId`, `GCorePinSetId`) used to keep `G.x` linkage sections small.
#### G.Core:4.2 - Mandatory G.Core linkage contract for every G.x

Every pattern `G.x` in Part G SHALL include a short, explicit **Core linkage** section that is notation‑independent and id‑based.

* Relations: `Builds on: G.Core`.
* Solution: include a section named `G.x:<n> - G.Core linkage (normative)` that contains a `GCoreLinkageManifest` listing, at minimum:

  * `CoreConformanceProfileIds := { GCoreConformanceProfileId… }` *(preferred)* and/or `CoreConformanceIds := { CC‑GCORE‑… }`
  * `RSCRTriggerSetIds := { GCoreTriggerSetId… }` *(preferred)* and/or `RSCRTriggerKindIds := { RSCRTriggerKindId… }`
  * `CorePinSetIds := { GCorePinSetId… }` *(preferred)* and/or `CorePinsRequired := { … }` *(pins/refs surfaced by the kit; include policy‑id pins and edition pins when applicable; list only additions/overrides if pin sets are used)*
  * `DefaultsConsumed := { DefaultId… }` *(ids only; owner is resolved via `G.Core.DefaultOwnershipIndex`; cite owner, don’t restate)*
  * `TriggerAliasMapRef?` *(present or cited) if the pattern uses local trigger tokens*

**Nil‑elision (normative size rule).** Any field whose value is `∅` MAY be omitted; omission means `∅` and does not relax any obligation.

**Expansion rule (normative).** If profile/set ids are used, the effective `CoreConformanceIds` / `RSCRTriggerKindIds` / `CorePinsRequired` are the unions of their expansions plus any explicitly listed ids (see `G.Core:4.2.2`, `G.Core:4.2.3`, and `G.Core:4.3.4.2`).

##### G.Core:4.2.1 - GCoreLinkageManifest (canonical shape)

`GCoreLinkageManifest` is the minimal, pattern‑local wiring manifest for citing `G.Core` without duplicating universal prose.

A `G.x` MAY render the manifest as prose, a table, or structured notation, but the ids SHALL be recoverable by authoring review:

`GCoreLinkageManifest := ⟨
  CoreConformanceProfileIds?: {GCoreConformanceProfileId…},
  CoreConformanceIds?: {CC‑GCORE‑…},
  RSCRTriggerSetIds?: {GCoreTriggerSetId…},
  RSCRTriggerKindIds?: {RSCRTriggerKindId…},
  CorePinSetIds?: {GCorePinSetId…},
  CorePinsRequired?: {…pin ids…},
  DefaultsConsumed?: {DefaultId…},
  TriggerAliasMapRef?: TriggerAliasMapRef
⟩`
##### G.Core:4.2.2 - GCoreConformanceProfileId catalogue (compression primitive)

A `GCoreConformanceProfileId` is a stable identifier for a named set of `CC‑GCORE‑*` items. It exists solely to reduce repetition in `G.x` linkage sections (no new semantics).

| GCoreConformanceProfileId | Expands to `CC‑GCORE‑*` (set) | Notes |
| --- | --- | --- |
| `GCoreConformanceProfileId.PartG.AuthoringBase` | `{CC‑GCORE‑CN‑CG‑1, CC‑GCORE‑CROSS‑1, CC‑GCORE‑PEN‑1, CC‑GCORE‑SET‑1, CC‑GCORE‑P2W‑1, CC‑GCORE‑DEF‑1, CC‑GCORE‑TRIG‑1, CC‑GCORE‑TRIG‑2, CC‑GCORE‑TRIG‑3, CC‑GCORE‑TRIG‑4, CC‑GCORE‑ID‑1, CC‑GCORE‑ID‑2, CC‑GCORE‑LINK‑1, CC‑GCORE‑LINK‑2}` | Default baseline for most Part‑G kits. |
| `GCoreConformanceProfileId.PartG.TriStateGuard` | `{CC‑GCORE‑GUARD‑1}` | Add when the kit defines/consumes eligibility/guard outcomes. |
| `GCoreConformanceProfileId.PartG.UTSWhenPublicIdsMinted` | `{CC‑GCORE‑UTS‑1}` | Add when the kit mints/evolves public ids (UTS rows). |
| `GCoreConformanceProfileId.PartG.ShippingBoundary` | `{CC‑GCORE‑SKP‑1}` | Add when shipping boundaries are in scope for the kit. |
##### G.Core:4.2.3 - GCorePinSetId catalogue (compression primitive)

A `GCorePinSetId` is a stable identifier for a named set of commonly recurring **pin obligations** used in Part‑G kits. It exists solely to reduce repetition in `G.x` linkage sections (no new semantics).

**Conditional pins (normative).** In pin‑set expansions below, a pin marked with `?` is **conditional**: it **MUST** be present iff the pattern actually uses the corresponding surface/artefact class; otherwise it MAY be omitted (nil‑elision permitted) and is treated as `∅`. A `G.x` MAY strengthen a conditional pin to unconditional by listing it explicitly in `CorePinsRequired`.

| GCorePinSetId | Expands to `CorePinsRequired` (set) | Notes |
| --- | --- | --- |
| `GCorePinSetId.PartG.AuthoringMinimal` | `{CG-FrameContext, describedEntity := ⟨GroundingHolon, ReferencePlane⟩, CNSpecRef.edition, CGSpecRef.edition}` | Baseline scope+contract pins for most Part‑G authoring kits (design‑time, citable, refreshable). |
| `GCorePinSetId.PartG.CrossingVisibilityPins` | `{BridgeId/BridgeCardId, BridgeMatrixId?, CL/CL^k/CL^plane, Φ/Ψ/Φ_plane policy-ids, CrossingBundleId?, UTSRowId[]?, PathId[]/PathSliceId[]?}` | Use when the kit asserts or consumes crossings (Bridge‑only + visible). Conditional pins cover “only if that bundle is used” cases (UTS publication, path‑citable evidence, explicit CrossingBundle reference). |
#### G.Core:4.3 - RSCR Trigger Catalogue and docking discipline

`G.Core` is the **single writer** for Part‑G‑wide trigger kinds.

##### G.Core:4.3.1 - Definitions

* **RSCRTriggerKindId**
  Canonical, stable identifier for a *trigger kind* (a class of “why RSCR/refresh must fire”). Cross-pattern reason code.

* **RSCRTriggerAliasId**
  Pattern-scoped human label/token kept for ergonomics/backward compatibility (e.g., `G.11:T4`, `G.6:H3:lane-tag correction`).

* **TriggerAliasMap**
  Mapping table: `RSCRTriggerAliasId → {RSCRTriggerKindId…}` (1..n).

* **RSCRTrigger**
  Minimal conceptual form (notation-independent):

  ```
  RSCRTrigger := ⟨
    triggerKindId: RSCRTriggerKindId,
    scope: PathSliceId[] | PathId[] | PatternScopeId,
    payloadPins: { …id pins… }
  ⟩
  ```

  Where `payloadPins` contains any edition pins, policy-ids, Bridge ids, evidence pins, regression-set ids, etc., required to make the trigger actionable.
##### G.Core:4.3.2 - Owner model

* TriggerOwner := `G.Core`.
* Any new trigger kind SHALL be added to `G.Core` first.
* Other patterns MAY define aliases only (or cite shared alias maps), and MUST map aliases to canonical kinds.
##### G.Core:4.3.3 - Authoring rules

* **No implicit triggers:**
  Any RSCR/SCR/refresh artefact that *records reasons* MUST record canonical `RSCRTriggerKindId`. Aliases may be recorded as labels, but must not be the only reason code.

* **No implicit overloading:**
  A local token string (e.g., `T4`) SHALL NOT silently change meaning across patterns; namespace is part of the alias (`G.11:T4` ≠ `A.20:T4`).

* **Granularity discipline:**
  If a local cause is narrower than an existing canonical kind, map it to that kind and keep the nuance as a local scope note. If the difference matters for planning/selection, add a new canonical kind.

* **Multi-cause discipline:**
  When an event spans multiple canonical kinds, record multiple triggers (preferred) or map the alias to a set `{…}` and require emitting the full set.
##### G.Core:4.3.4 - Seed canonical catalogue (Phase‑2 minimum)

The Phase‑2 stabilized canonical catalogue (based on the Phase‑2 inventory; sufficient to dock legacy `G.6:H3` and `G.11:T0…T7` triggers and to populate `RSCRTriggerKindIds` in `G.0…G.13`):

* `RSCRTriggerKindId.LegalitySurfaceEdit`
* `RSCRTriggerKindId.PenaltyPolicyEdit`
* `RSCRTriggerKindId.CrossingBundleEdit`
* `RSCRTriggerKindId.ReferencePlaneEdit`
* `RSCRTriggerKindId.EditionPinChange`
* `RSCRTriggerKindId.TokenizationOrNameChange`
* `RSCRTriggerKindId.PolicyPinChange`
* `RSCRTriggerKindId.TelemetryDelta`
* `RSCRTriggerKindId.FreshnessOrDecayEvent`
* `RSCRTriggerKindId.EvidenceSurfaceEdit`
* `RSCRTriggerKindId.MaturityRungChange`
* `RSCRTriggerKindId.BaselineBindingEdit`
* `RSCRTriggerKindId.DefaultOwnerChange`
##### G.Core:4.3.4.1 - Canonical kind definitions (normative, minimal)

Each `RSCRTriggerKindId` SHALL have a short, stable definition in `G.Core` (single-writer) to prevent semantic drift.

| RSCRTriggerKindId | Minimal meaning (cause class) | Typical payload pins (non-exhaustive) |
| --- | --- | --- |
| `RSCRTriggerKindId.LegalitySurfaceEdit` | A legality surface changed (CG‑Spec: ComparatorSet/SCP/Γ_fold/MinimalEvidence, or equivalent legality inputs). | `CGSpecRef.edition`, `ComparatorSetRef.edition`, `SCPRef.edition`, `ΓFoldRef.edition` |
| `RSCRTriggerKindId.PenaltyPolicyEdit` | A penalty / Φ / Ψ / FailureBehavior / SoS‑LOG branch policy changed. | penalty policy ids, `Φ`/`Ψ` policy ids, SoS‑LOG branch id pins |
| `RSCRTriggerKindId.CrossingBundleEdit` | A crossing bundle changed (Bridge/CL routing, crossing-bundle registry cards, crossing policy pins), including `edition_key` changes of crossing‑relevant artefacts (BridgeCards, CrossingBundle registries, UTS rows for crossing artefacts). | `BridgeId/BridgeCardId`, `BridgeMatrixId?`, `CL*` ids, crossing policy ids, `UTSRowId[]`, `PathId/PathSliceId?` |
| `RSCRTriggerKindId.ReferencePlaneEdit` | ReferencePlane or plane-routing surface changed. | `ReferencePlaneId`, plane-policy ids |
| `RSCRTriggerKindId.EditionPinChange` | Any pinned edition relevant to downstream artifacts changed (including **`CNSpecRef.edition`**, `CGSpecRef.edition`, comparator/method/descriptor/distance/etc.). Crossing‑artefact edition_key changes are additionally classified as `CrossingBundleEdit` per multi‑cause discipline. | changed `*.edition` pins, affected `PathSliceId`s |
| `RSCRTriggerKindId.TokenizationOrNameChange` | A published tokenization / naming / alias surface changed in a way that can affect docking, citations, or dispatch (e.g., UTS Name Cards, twin labels, alias maps). | affected `UTSRowId[]`, `NameCardId[]`, alias ids / maps |
| `RSCRTriggerKindId.PolicyPinChange` | A policy-id pin used by characterization changed (selection, insertion, emission, routing, refresh policy, etc.). | policy ids (and other non-edition configuration pins when they are explicitly pinned) |
| `RSCRTriggerKindId.TelemetryDelta` | Telemetry inputs that influence refresh/selection changed (not merely display-only). | telemetry ids/refs, `Audit`-published pins |
| `RSCRTriggerKindId.FreshnessOrDecayEvent` | Time/freshness/decay conditions affecting validity changed (window shift, decay thresholds, freshness policy edits). | freshness window refs/ids, decay/freshness policy ids |
| `RSCRTriggerKindId.EvidenceSurfaceEdit` | Evidence graph / evidence surface changed in ways that affect admissibility/acceptance/comparison. | evidence pins, `EvidenceGraph` refs, affected `PathId`s |
| `RSCRTriggerKindId.MaturityRungChange` | Maturity rung/ladder state changed for relevant artifacts or paths. | maturity rung ids, affected scopes |
| `RSCRTriggerKindId.BaselineBindingEdit` | Planned baseline bindings changed (planned slot fillings / binding refs), requiring a re-run along the P2W path. | `SlotFillingsPlanItem` refs, planned pins, variance pins |
| `RSCRTriggerKindId.DefaultOwnerChange` | The owner of a `DefaultId` (as recorded in `G.Core.DefaultOwnershipIndex`) changed, or a default row was added/deprecated. | affected `DefaultId.*`, old owner ref, new owner ref |
##### G.Core:4.3.4.2 - Canonical trigger sets (compression primitive)

`GCoreTriggerSetId` identifies a named set of `RSCRTriggerKindId` values. A `G.x` MAY cite trigger sets in `RSCRTriggerSetIds` instead of repeating long `RSCRTriggerKindIds` lists.

| GCoreTriggerSetId | RSCRTriggerKindIds (set) | Notes |
| --- | --- | --- |
| `GCoreTriggerSetId.CGSpecGate` | `{RSCRTriggerKindId.LegalitySurfaceEdit, RSCRTriggerKindId.CrossingBundleEdit, RSCRTriggerKindId.ReferencePlaneEdit, RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.FreshnessOrDecayEvent}` | Covers CG‑Spec legality‑gate kits (e.g., `G.0`). |
| `GCoreTriggerSetId.SoTAHarvestSynthesis` | `{RSCRTriggerKindId.EvidenceSurfaceEdit, RSCRTriggerKindId.TokenizationOrNameChange, RSCRTriggerKindId.CrossingBundleEdit, RSCRTriggerKindId.ReferencePlaneEdit, RSCRTriggerKindId.LegalitySurfaceEdit, RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.FreshnessOrDecayEvent}` | Covers SoTA harvesting/synthesis packs (e.g., `G.2`). |
| `GCoreTriggerSetId.EvidenceGraphKit` | `{RSCRTriggerKindId.EvidenceSurfaceEdit, RSCRTriggerKindId.CrossingBundleEdit, RSCRTriggerKindId.PenaltyPolicyEdit, RSCRTriggerKindId.ReferencePlaneEdit, RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.FreshnessOrDecayEvent, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.MaturityRungChange, RSCRTriggerKindId.BaselineBindingEdit}` | Covers EvidenceGraph/SCR kits (e.g., `G.6`). |
| `GCoreTriggerSetId.BridgeCalibrationKit` | `{RSCRTriggerKindId.CrossingBundleEdit, RSCRTriggerKindId.PenaltyPolicyEdit, RSCRTriggerKindId.ReferencePlaneEdit, RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.EvidenceSurfaceEdit, RSCRTriggerKindId.FreshnessOrDecayEvent, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.BaselineBindingEdit}` | Covers bridge calibration/CL kits (e.g., `G.7`). |
| `GCoreTriggerSetId.RefreshOrchestration` | `{RSCRTriggerKindId.LegalitySurfaceEdit, RSCRTriggerKindId.PenaltyPolicyEdit, RSCRTriggerKindId.CrossingBundleEdit, RSCRTriggerKindId.ReferencePlaneEdit, RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.FreshnessOrDecayEvent, RSCRTriggerKindId.EvidenceSurfaceEdit, RSCRTriggerKindId.MaturityRungChange, RSCRTriggerKindId.BaselineBindingEdit}` | Covers refresh orchestration (e.g., `G.11`). |
##### G.Core:4.3.5 - Initial alias maps

These alias maps are normative docking artefacts and preserve legacy tokens while moving semantics to canonical ids.

**TriggerAliasMap.G11**
Based on the existing trigger catalogue in `G.11` (`T0…T7`).

* `G.11:T0 → { RSCRTriggerKindId.PolicyPinChange }`
* `G.11:T1 → { RSCRTriggerKindId.TelemetryDelta }`
* `G.11:T2 → { RSCRTriggerKindId.EditionPinChange }`
* `G.11:T3 → { RSCRTriggerKindId.EditionPinChange }`
* `G.11:T4 → { RSCRTriggerKindId.CrossingBundleEdit, RSCRTriggerKindId.PenaltyPolicyEdit }`
* `G.11:T5 → { RSCRTriggerKindId.FreshnessOrDecayEvent }`
* `G.11:T6 → { RSCRTriggerKindId.MaturityRungChange }`
* `G.11:T7 → { RSCRTriggerKindId.PolicyPinChange }`

**TriggerAliasMap.G0 (reserved; empty in Phase‑2).**
Map any stable legacy registry‑hook labels emitted/recorded by `G.0` to the canonical kinds above (typically `LegalitySurfaceEdit`, `PenaltyPolicyEdit`, `CrossingBundleEdit`, `ReferencePlaneEdit`, `TokenizationOrNameChange`), preserving the original label text as `RSCRTriggerAliasId`. If none exist, `G.0` SHOULD emit canonical `RSCRTriggerKindId` values directly.
 
**TriggerAliasMap.G6**
EvidenceGraph `H3` example causes → canonical kinds:

* `G.6:H3:freshness/decay change → { RSCRTriggerKindId.FreshnessOrDecayEvent }`
* `G.6:H3:Bridge CL/CL^k or loss update → { RSCRTriggerKindId.CrossingBundleEdit }`
* `G.6:H3:Φ/Ψ policy change → { RSCRTriggerKindId.PenaltyPolicyEdit }`
* `G.6:H3:lane tag correction → { RSCRTriggerKindId.EvidenceSurfaceEdit }`
* `G.6:H3:ReferencePlane correction → { RSCRTriggerKindId.ReferencePlaneEdit }`
* `G.6:H3:QD/OEE artefact updates (U.DescriptorMapRef.edition/DistanceDef, EmitterPolicyRef, InsertionPolicyRef, archive K-capacity) → { RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange }`
#### G.Core:4.4 - Default Ownership Index

`G.Core` provides an index of Part‑G defaults with a **single owner** per `DefaultId`. The index is not a “second spec”; it is a cross-reference table that points to the *true owner* (a CC item, policy‑id, or TaskSignature rule) and states applicability conditions.

##### G.Core:4.4.1 - Definitions

* **DefaultId**
  Stable identifier of a default (a default constant or default rule).

* **DefaultOwnerRef**
  A reference to the single owner of the default (e.g., a CC item id like `CC‑G5.23`, or a policy id, or a TaskSignature rule definition).
##### G.Core:4.4.2 - Rules

* Exactly one owner per `DefaultId`.
* Any other mention in `G.x` MUST be a citation/delegation to the owner, not a competing statement.
* A default may be conditional (default-rule) with explicit applicability conditions.
* The Default Ownership Index SHALL NOT be used to “smuggle” mandatory invariants as defaults. Invariants remain invariants (typically routed via `CC‑GCORE‑…` to canonical owners).
##### G.Core:4.4.3 - Seed Default Ownership entries (Phase‑2 minimum)

| DefaultId                       | DefaultOwnerRef                                           | Notes |
| ------------------------------ | --------------------------------------------------------- | ----- |
| `DefaultId.PortfolioMode`       | `CC‑G5.23`                                                | Existing owner; other mentions delegate to it. |
| `DefaultId.DominanceRegime`     | `CC‑G5.28`                                                | Existing owner; other mentions delegate to it. |
| `DefaultId.GammaFoldForR_eff`   | `CC‑G5.4`                                                 | Default Γ‑fold for `R_eff` is weakest‑link; overrides require explicit CAL support. |

This table may grow over time; the rule is that the **owner must already exist** (or be intentionally set to `G.Core` when the default is truly Part‑G‑wide and not owned elsewhere). Any change in a row (add/remove/change owner) SHALL be treated as a refresh‑sensitive edit and recorded as `RSCRTriggerKindId.DefaultOwnerChange` (payload: affected `DefaultId.*`, old owner ref, new owner ref).
#### G.Core:4.5 - ID continuity protocol (Δ‑discipline)

When moving universal norms out of `G.x` into `G.Core`:

* existing public CC ids in `G.x` that may be referenced externally SHALL NOT be deleted or renamed;
* such CC items SHALL become **delegation** items that point to the relevant `CC‑GCORE‑…` item(s);
* each `G.x` SHALL add exactly one bridge CC item `CC‑Gx‑CoreRef` (first in its CC list) that makes linked `CC‑GCORE‑…` items mandatory for `G.x` conformance.

Legacy trigger tokens (e.g., `G.11:T*`, `G.6:H3:*`) are preserved as aliases and MUST map to canonical trigger kinds.

Non-CC public identifiers (e.g., `UTSRowId`, `RSCRTriggerAliasId`, deprecation notices, edition bumps) MUST obey the same Δ-discipline: preserve old ids; represent drift via alias/deprecation/edition evolution (see `F.17 (UTS)`); and emit canonical trigger kinds (`RSCRTriggerKindId.TokenizationOrNameChange`, `RSCRTriggerKindId.EditionPinChange`) when downstream impact is possible.
#### G.Core:4.6 - Explicit non-goals

`G.Core` does not:

* introduce CG‑frame kit entities (e.g., BridgeMatrix/ReferencePlane/Φ registries); those remain in their owning `G.x`;
* introduce method-family taxonomies, discipline packs, or generator orchestration mechanisms; those remain as `Extensions` in their owners (e.g., synthesis/shipping/refresh patterns);
* define refresh algorithms; it defines trigger kinds and docking only.

---
### G.Core:5 - Archetypal grounding

**Tell.**
In Phase‑2 refactoring, `G.Core` is the hub that allows each `G.x` to become structurally predictable: (a) a short, normative “Core linkage” slice, and (b) pattern‑scoped `Extensions`. Universal obligations are routed to canonical owners (A.6.7 / A.15.3 / A.19 / G.0 / A.19.CHR), while RSCR causes and default ownership become typed and single-owned.

**Show 1: Refresh triggers without semantic drift.**
`G.11` already uses trigger tokens `T0…T7`. `G.Core` keeps them as aliases and maps them to canonical trigger kinds (e.g., `TelemetryDelta`, `EditionPinChange`, `CrossingBundleEdit`). This makes RSCR reason codes consistent across patterns and avoids re-explaining trigger semantics in every pattern.

**Show 2: Resolving competing defaults.**
If multiple patterns imply a default for `PortfolioMode`, the Default Ownership Index points to a single owner (currently `CC‑G5.23`). Other patterns (e.g., bundles/log patterns) must cite that owner or delegate to it, rather than restating the default with slightly different wording. This preserves intent while preventing drift and ambiguity.
### G.Core:6 - Bias-annotation (informative)

* **Centralization bias:** A single hub can become too “thick”. Mitigation: delegation-first routing; keep only true Part‑G invariants and typed indices here.
* **Over-typing bias:** A trigger catalogue can become overly granular. Mitigation: granularity discipline + scope notes; only add new kinds when planning/selection needs it.
* **Refactor rigidity bias:** Preserving IDs can feel cumbersome. Mitigation: delegation items preserve IDs while enabling deduplication.
* **Default absolutism bias:** Defaults may require conditional rules. Mitigation: Default Ownership Index allows conditional default rules with explicit applicability conditions.
* **Single-writer bias:** prefers single‑writer *authoring* for catalogs and explicit ownership tables.  
  *Mitigation:* delegation-first routing; keep catalogs minimal; avoid “second specs”.
* **Architectural bias:** centralizes invariants to prevent accidental coupling across `G.x`.  
  *Mitigation:* keep core thin; force `Extensions` to remain pattern‑scoped.
* **Ontological/epistemic bias:** enforces strict distinction between contract surfaces, kits, mechanisms, and orchestration.  
  *Mitigation:* allow didactic scope notes while keeping normative surface id‑based.
* **Pragmatic bias:** adds authoring overhead (linkage sections, alias maps).  
  *Mitigation:* one small mandatory bridge CC item per pattern (`CC‑Gx‑CoreRef`) and short linkage slices only.
* **Didactic bias:** risks “glossy hub prose” that hides missing CC coverage.  
  *Mitigation:* enforce CC/Solution coherence (E.19) and keep invariants checkable via `CC‑GCORE‑…`.
### G.Core:7 - Conformance checklist (normative) — CC‑GCORE

Conformance items are authoring obligations and are enforced transitively by `CC‑Gx‑CoreRef` in every `G.x`.

| ConformanceId        | Statement |
| -------------------- | --------- |
| **CC‑GCORE‑DEL‑1**   | A conforming `G.Core` SHALL be delegation‑first: if a norm is already owned by A.6.7 / A.15.3 / A.19 / G.0 / A.19.CHR / E.*, `G.Core` routes to it rather than duplicating semantics. |
| **CC‑GCORE‑CN‑CG‑1** | Any pattern in Part G that builds on `G.Core` SHALL cite `CN‑Spec` and `CG‑Spec` as the only contract/legality surfaces and SHALL NOT introduce shadow specs (incl. complying with `SuiteObligations.transport_declarative_only` and `SuiteObligations.cg_spec_cite_required_for_numeric_ops`). |
| **CC‑GCORE‑OBL‑1**   | A conforming `G.Core` SHALL treat the obligation vocabulary in `A.6.7:4.2` as the canonical naming surface for Part‑G‑wide obligations and SHALL NOT introduce competing obligation names for the same norms. |
| **CC‑GCORE‑CROSS‑1** | A Part‑G pattern that introduces or consumes crossings SHALL enforce `SuiteObligations.bridge_only_crossings` and `SuiteObligations.crossing_visibility_required` (CrossingBundle per E.18); SHALL prohibit implicit crossings; SHALL treat `edition_key` changes on **crossing‑relevant artefacts** (Bridge/CL/CrossingBundle registries and UTS rows for crossing artefacts) as `RSCRTriggerKindId.CrossingBundleEdit` (and, when an edition pin is involved, also `RSCRTriggerKindId.EditionPinChange` per multi‑cause discipline); and SHALL route `SuiteObligations.two_bridge_rule_for_described_entity_change` to its canonical owner. |
| **CC‑GCORE‑GUARD‑1** | A Part‑G pattern SHALL treat `GuardDecision := {pass|degrade|abstain}` as the only admissibility/eligibility decision domain (`SuiteObligations.guard_decision_tristate(pass|degrade|abstain)`); `unknown` SHALL NOT silently coerce to `pass` (`SuiteObligations.unknown_never_coerces_to_pass`); “sandbox/probe‑only” SHALL be expressed via SoS‑LOG branch pins (policy/FailureBehavior) (see `C.23`), not as an extra decision value. |
| **CC‑GCORE‑PEN‑1**   | A Part‑G pattern SHALL route penalties/assurance loss to the **R lane (`R_eff`) only** (`SuiteObligations.penalties_route_to_r_eff_only`) and SHALL preserve **F/G invariants** under penalties (penalties do not alter legality/invariant lanes). |
| **CC‑GCORE‑SET‑1**   | A Part‑G pattern SHALL preserve set-return semantics for partial orders and SHALL prohibit silent scalarization/totalization (`SuiteObligations.no_silent_scalarisation_of_partial_orders`, `SuiteObligations.no_silent_totalisation`); any scalar summary SHALL be report-only unless declared as a lawful comparator surface. |
| **CC‑GCORE‑SKP‑1**   | A Part‑G pattern SHALL preserve the suite/kit/pack distinction (A.19.CHR) and SHALL keep shipping concerns owned by their canonical owner patterns (e.g., G.10) rather than embedding shipping semantics into unrelated kits or core invariants. |
| **CC‑GCORE‑P2W‑1**   | A Part‑G pattern that uses planned baselines SHALL anchor them via `SlotFillingsPlanItem` in WorkPlanning (`SuiteObligations.planned_slot_filling_in_work_planning_only`) and SHALL finalize launch values only in WorkEnactment (`SuiteObligations.finalize_launch_values_in_work_enactment_only`); gate decisions remain separated per `SuiteObligations.gate_decision_separation`. |
| **CC‑GCORE‑LINK‑1**  | Every conforming `G.x` SHALL satisfy `G.Core:4.2` by providing a `G.x:<n> - G.Core linkage (normative)` section containing a `GCoreLinkageManifest` (incl. either `CoreConformanceProfileIds` or `CoreConformanceIds`, either `RSCRTriggerSetIds` or `RSCRTriggerKindIds`, and either `CorePinSetIds` or `CorePinsRequired` (or both)). Nil‑elision is permitted for `∅` fields. |
| **CC‑GCORE‑LINK‑2**  | Every conforming `G.x` SHALL include `CC‑Gx‑CoreRef` as the first checklist item; it SHALL make mandatory the effective `CoreConformanceIds` (including expansions of any `CoreConformanceProfileIds`) declared in the linkage manifest. |
| **CC‑GCORE‑UTS‑1**   | If a Part‑G pattern mints, deprecates, or evolves any public identifier, it SHALL publish/update the corresponding UTS entries and cite them via `UTSRowId` pins, delegating UTS semantics (twin labels, alias/deprecation discipline, edition pins) to its canonical owner `F.17 (UTS)`. |
| **CC‑GCORE‑ID‑1**    | When deduplicating, existing public CC ids in `G.x` SHALL NOT be deleted/renamed; they SHALL become delegation items to relevant `CC‑GCORE‑…` items. |
| **CC‑GCORE‑ID‑2**    | Public id continuity applies beyond CC item ids: `UTSRowId` rows, `RSCRTriggerAliasId` tokens (e.g., `T0…T7`), deprecation notices, and edition bumps SHALL preserve prior ids and express drift via alias/deprecation/edition evolution (never by reusing/redefining an old id). When downstream behaviour can change, the change SHALL emit a canonical `RSCRTriggerKindId` (e.g., `TokenizationOrNameChange`, `EditionPinChange`). |
| **CC‑GCORE‑TRIG‑1**  | A conforming `G.Core` SHALL define the canonical `RSCRTriggerKindId` catalogue and SHALL be its single writer. |
| **CC‑GCORE‑TRIG‑2**  | Any `G.x` that uses local trigger tokens SHALL provide (or cite) a `TriggerAliasMap` mapping each alias to canonical `RSCRTriggerKindId`. |
| **CC‑GCORE‑TRIG‑3**  | Any artefact that records RSCR/SCR/refresh reasons SHALL record canonical `RSCRTriggerKindId` (aliases may be recorded as labels only). |
| **CC‑GCORE‑TRIG‑4**  | A conforming `G.Core` SHALL keep `TriggerAliasMap.*` consistent with the owner patterns’ legacy trigger catalogues (e.g., `G.11:T*`). Any change to an alias mapping SHALL be treated as refresh‑sensitive; at minimum it SHALL be recorded/emitted as `RSCRTriggerKindId.TokenizationOrNameChange` (and, if the mapped trigger kinds change, the corresponding canonical kinds apply as well). |
| **CC‑GCORE‑DEF‑1**  | A conforming `G.Core` SHALL maintain a Default Ownership Index for Part‑G defaults, ensuring each `DefaultId.*` has exactly one owner (a CC item or a policy id). All other patterns SHALL cite the owner and SHALL NOT state competing defaults. Any owner change MUST be recorded as `RSCRTriggerKindId.DefaultOwnerChange`. |
### G.Core:8 - Common anti-patterns and how to avoid them

* **Anti-pattern:** Restating CN‑Spec/CG‑Spec rules inside a `G.x` “for convenience”.  
  **Avoid:** cite A.19 / G.0; route via `CC‑GCORE‑CN‑CG‑1`.

* **Anti-pattern:** Adding a fourth guard status (“unknown”, “maybe”, “probe-only”) as a separate decision value.  
  **Avoid:** keep guard domain tri‑state; express “probe-only” as policy/branching and record via pins/audit.

* **Anti-pattern:** Treating mandatory invariants as “defaults” to centralize them.  
  **Avoid:** keep invariants as invariants (CC‑GCORE‑* routed to canonical owners); restrict the Default Ownership Index to true defaults (constants or conditional default-rules).

* **Anti-pattern:** Turning partial orders into scalar ranks silently.  
  **Avoid:** keep set‑valued semantics unless a total order is explicitly declared by a comparator/policy.

* **Anti-pattern:** Competing defaults scattered across multiple patterns.  
  **Avoid:** Default Ownership Index; delegate duplicate statements to the single owner.

* **Anti-pattern:** Local trigger tokens without canonical mapping.  
  **Avoid:** provide/cite a `TriggerAliasMap` with namespace‑qualified aliases.

* **Anti-pattern:** Breaking public CC ids during dedup.  
  **Avoid:** convert to delegation items; preserve IDs.
### G.Core:9 - Consequences

* **Positive:** Part‑G‑wide invariants become single-owned; refactors become safer and easier to audit.
* **Positive:** RSCR becomes reason-code driven (typed triggers), improving traceability and preventing semantic drift.
* **Positive:** Default conflicts become detectable and resolvable via single-owner discipline.
* **Negative:** Adds an extra authoring step (linkage sections and CoreRef CC item) to each `G.x`.
* **Negative:** Requires careful governance of the trigger catalogue to avoid excessive fragmentation.
### G.Core:10 - Rationale

Universalization of Part G requires a stable “gravity center” for invariants, otherwise each pattern becomes a competing source of truth. Delegation-first routing prevents duplication and makes ownership explicit, while typed triggers and default ownership turn historically prose-driven drift into checkable, id-based structure.
### G.Core:11 - SoTA alignment (informative)

Although FPF is conceptual (not a data governance framework), `G.Core` aligns Part‑G authoring with modern best practice patterns seen across post‑2015 work:

* **Selective prediction / abstention** informs tri‑state guard discipline: abstaining or degrading is a first-class outcome, not an error coerced into a scalar.
* **Set-valued / conformal methods** motivate set-return semantics: when comparability is partial or uncertainty is structural, returning sets/regions is often the SoTA-friendly representation.
* **Multiobjective optimization and quality-diversity** reinforce portfolio/Archive semantics instead of forced “best single scalar”.
* **Monotone constrained modelling** (where used) supports “legality-first” scoring/aggregation: constraints and admissibility precede optimization, mirroring CG‑Spec gate discipline.
* **Schema evolution and contract testing** motivate id-stable conformance points and typed trigger catalogues: stable identifiers + regression hooks are the practical mechanism for safe refactoring.
### G.Core:12 - Relations

* **Builds on:**

  * `E.8` pattern template and section discipline
  * `E.10` lexical/ontological rules (strict distinction; twin naming; kind‑suffix discipline)
* `E.18` CrossingBundle (crossing visibility bundle)
  * `E.19` conformance discipline
  * `A.6.7` SuiteObligations + suite protocol pins (routing surface)
  * `A.15.3` SlotFillingsPlanItem (planned baseline anchor)
  * `A.19` CN‑Spec governance card
  * `G.0` CG‑Spec legality gate
  * `A.19.CHR` CHR suite boundary and "governance cards and legality gates are cited as pins, not copied locally" discipline
  * `C.23` SoS‑LOG (tri‑state branches; sandbox/probe‑only)
  * `F.17` UTS (identifier registry; alias/deprecation discipline)
  * `F.15` RSCR (regression/conformance loop)

* **Used by:**

  * `G.0…G.13` patterns (each adds `Builds on: G.Core`, linkage section, CoreRef CC item)

* **Constrains:**

  * Part‑G authoring: no shadow specs, no silent scalarization, tri‑state guards, penalties routing, typed RSCR causes, single-owner defaults, and ID‑continuity refactors.
### G.Core:End
## Frame Standard and Comparability Governance — CG‑Spec

**Tag.** Architectural pattern (foundational Standard; constrains G.1–G.5)
**Stage.** *design-time* legality gate (establishes comparison legality & evidence minima; constrains run-time gates)
**Primary output.** `CG‑Spec` — a notation-independent legality gate for a `CG‑Frame`, published to UTS (with explicit edition pins for downstream reproducibility and RSCR).
**Primary hooks.** `USM.ScopeSlice(G)`, `describedEntity`, `SCP`, `MinimalEvidence`, `CNSpecRef`, `Γ‑fold`, `Φ(CL)` / `Φ_plane` policy pins, `UTS` publication (Name Cards + edition pins).
**Non-duplication note.** Universal Part‑G invariants are owned by `G.Core` and are satisfied here **only via delegation** (`CC‑G0‑CoreRef` → `CC‑GCORE‑*`). Single‑owner contract-surface discipline (CN/CG) is enforced via `CC‑GCORE‑CN‑CG‑1` (no shadow specs; no competing defaults).

### Problem frame

A team defines or evolves a `CG‑Frame` (e.g., a frame for creativity measurement, decision quality, architecture trade‑offs, or portfolio selection). Downstream mechanisms (G.1–G.5 and beyond) must compare, aggregate, and publish CHR‑typed observations in ways that are:

* lawful with respect to measurement legality (scale/unit/polarity constraints),
* auditable with explicit evidence minima and provenance,
* reproducible via pinned editions and explicit policy ids,
* portable only via explicit crossings (bridges and reference-plane moves), never via implicit semantic leakage.

`CG‑Spec` is the single design-time object that fixes *what comparisons and aggregations are lawful in this frame*, under which pinned assumptions and minimal evidence requirements, so that run-time selection and publication can be audited without inventing new “local legality gates”.

Didactic subtitle: **Design-time rules for safe, auditable comparison.**
### Problem

Without a single, frame-level legality standard:

* comparisons and aggregations drift into *implicit assumptions* (hidden scalarisation; silent totalisation of partial orders),
* numeric gates run on “whatever is available” rather than declared evidence minima and lane/carrier requirements,
* cross-context reuse happens without explicit crossing visibility and stated losses,
* selection outcomes become hard to audit because legality, evidence minima, and penalty routing are not pinned and traceable.
### Forces

* **Pluralism vs. comparability.** Multiple traditions must co-exist while allowing lawful comparison where justified.
* **Expressiveness vs. safety.** Rich comparator sets and aggregators vs. measurement legality constraints.
* **Locality vs. portability.** Context-local semantics first; portability only via explicit bridges and explicit losses.
* **Assurance vs. agility.** Evidence minima must be strong enough to matter, light enough to adopt.
* **Design-time vs. run-time.** Keep legality standards and templates design-time; run-time only cites and applies them.
### Solution — CG‑Spec as the design-time legality gate

`CG‑Spec` is a **notation-independent** UTS-published object that, for a given `CG‑Frame`, defines:

* the **ComparatorSet** (explicit, finite, typed) permitted in this frame,
* the **ScaleComplianceProfile** (SCP) that constrains lawful operations per characteristic,
* **MinimalEvidence** requirements per characteristic (lanes, carriers, freshness windows, crossing allowances, failure behavior),
* the frame’s **penalty and trust folding wiring** (by explicit policy ids and edition pins),
* **AcceptanceStubs** as design-time templates (thresholds remain owned by CAL, not by CG‑Spec),
* optional method-family hooks (e.g., illumination/QD or explore↔exploit guards) *as wiring only*, with semantics owned by the corresponding patterns.

`CG‑Spec` constrains downstream gate checks by being *referenced and pinned*; it is not itself an admissibility mechanism.

#### G.Core linkage (normative)

**Builds on:** `G.Core` (Part‑G core invariants; single-owner routing)

**GCoreLinkageManifest (normative; size-controlled via profiles/sets).**

Effective obligations/pins/triggers are computed by union expansion of the referenced ids (per `G.Core:4.2`).
Profiles/sets + explicit deltas; `Nil‑elision` applies.

* `CoreConformanceProfileIds :=`
  * `GCoreConformanceProfileId.PartG.AuthoringBase`
  * `GCoreConformanceProfileId.PartG.TriStateGuard`
  * `GCoreConformanceProfileId.PartG.UTSWhenPublicIdsMinted`
* `CorePinSetIds :=`
  * `GCorePinSetId.PartG.AuthoringMinimal`
  * `GCorePinSetId.PartG.CrossingVisibilityPins`
* `CorePinsRequired :=` *(delta over PinSets)*
  * `UTSRowId[]`
  * `ReferenceMap`
  * `ComparatorSetRef.edition`
  * `SCPRef.edition`
  * `ΓFoldRef.edition?`
  * `MinimalEvidenceRef.edition?`
  * `FailureBehaviorPolicyId?`
* `DefaultsConsumed := {DefaultId.GammaFoldForR_eff}` *(owner: `CC‑G5.4` per `G.Core.DefaultOwnershipIndex`)*
* `RSCRTriggerSetIds := {GCoreTriggerSetId.CGSpecGate}`
* `RSCRTriggerKindIds :=` *(delta over TriggerSets)*
  * `RSCRTriggerKindId.EvidenceSurfaceEdit`
  * `RSCRTriggerKindId.TokenizationOrNameChange`
  * `RSCRTriggerKindId.DefaultOwnerChange`
* `TriggerAliasMapRef := ∅`
#### CG‑Spec object model (normative)

`CG‑Spec` is authored per `CG‑Frame`. It SHALL:

* be **published to UTS** as a notation-independent object,
* reference CHR characteristics by id (measurement semantics remain owned by CHR packs),
* constrain what comparisons and aggregations are lawful in this frame via explicit comparator specs and SCP bindings,
* declare minimal evidence gates per characteristic, including explicit failure behavior wiring,
* cite `CN‑Spec` for normalization/comparability policies (no duplication and no shadow specs),
* publish edition pins and policy ids so downstream selection, parity, shipping, and refresh can be reproducible and RSCR-aware.
#### CG‑Spec conceptual model (normative)

```
CG‑Spec :=
⟨
  UTS.id, Edition,
  Context, Purpose, Audience,

  Scope := USM.ScopeSlice(G) ⊕ Boundary{TaskKinds, ObjectKinds},

  describedEntity := ⟨GroundingHolon, ReferencePlane ∈ {world|concept|episteme}⟩,
  WorldRegime? ∈ {prep|live},          // only refines ReferencePlane=world; introduces no new planes

  ReferenceMap := minimal map{term/id → UTS|CHR|SoTA-pack refs},

  CNSpecRef := ⟨A.19 ref, CNSpecRef.edition⟩,          // CN‑Spec is the governance card (single-owner)

  Characteristics := [CHR.Characteristic.id…],          // pointers only; authored in G.3 CHR pack

  // Edition-addressable segments (pins MUST be exposed)
  ComparatorSet := ⟨ComparatorSetId, ComparatorSetRef.edition, [ComparatorSpec…]⟩,
  SCP := ⟨SCPId, SCPRef.edition, map Characteristic.id → SCPEntry⟩,
  MinimalEvidence := ⟨MinEvId, MinimalEvidenceRef.edition?, map Characteristic.id → MinEvidenceEntry⟩,  // min pin: CGSpecRef.edition

  Γ‑fold := ⟨GammaFoldId, ΓFoldRef.edition,
             defaultRef := DefaultId.GammaFoldForR_eff,
             override? := ⟨overrideRef, proof_refs, boundary_notes⟩
           ⟩,

  // Penalty routing and plane policies are by explicit policy ids.
  // Semantics (tri-state, penalties→R_eff-only, crossing visibility, set-return) are owned by G.Core.
  CL‑Routing := ⟨policy_id, map Bridge.CL → penalty_spec⟩,
  Φ := ⟨phi_policy_id, phi_table_ref?, psi_policy_id?, phi_plane_policy_id?⟩,

  AcceptanceStubs := [AcceptanceStubId…],     // templates only; thresholds remain owned by CAL (G.4)

  // Optional hooks are wiring-only; semantics live in owners.
  E/E‑LOG Guard? := ⟨policy_id, pins…⟩,
  Illumination? := ⟨
    Q_refs ⊆ Characteristics, D_refs ⊆ Characteristics,
    DescriptorMapRef.edition?, DistanceDefRef.edition?, DHCMethodRef.edition?,
    InsertionPolicyRef?, PromotionPolicyId?
  ⟩,

  RSCR := ⟨
  RSCRTestId[]?,             // SHOULD cover: illegal_op_refusals; unit/scale legality checks; freshness windows; // partial-order scalarisation refusals; threshold semantics; CL→R_eff routing;
                            // and refusal of degrade.order on unit mismatches (MM‑CHR).
    RSCRTriggerKindId[]
  ⟩,

  Naming := UTS Name Cards (twin labels + lifecycle + bridge notes),
  Lifecycle := ⟨owner, DRR link, refresh cadence, decay/aging, deprecations⟩,
  Provenance := ⟨carrier types, SoTA-pack refs, DRR/SCR linkage⟩
⟩
```

**Local typing notes (non-exhaustive; normative intent but no shadow specs).**

* `ComparatorSpec` MUST be typed against SCP/CHR constraints. Examples of lawful comparators are frame-local choices and are authored here (e.g., dominance where lawful; lexicographic over typed traits; medoid/median for ordinal where lawful; explicit weighted sums only where legality is proven and units are aligned).
* `MinimalEvidenceEntry` MUST declare: lane requirements, evidence carriers, freshness window (if any), and explicit failure behavior wiring. The semantics of `{pass|degrade|abstain}` and `degrade(mode=…)` are delegated to `G.Core`.
#### Interfaces (normative)

| Interface          | Consumes                             | Produces / constrains                                                      |
| ------------------ | ------------------------------------ | -------------------------------------------------------------------------- |
| **G.0‑1 Charter**  | CG‑Frame brief, USM scope signals    | `CG‑Spec.Scope`, `describedEntity`, `ReferenceMap`                         |
| **G.0‑2 SCP**      | CHR pack refs (G.3), legality proofs | `CG‑Spec.SCP` + bindings to lawful operators/aggregators                   |
| **G.0‑3 Evidence** | SoTA inputs (G.2), carriers (A.10)   | `CG‑Spec.MinimalEvidence`, `Γ‑fold` segment pins, `CL‑Routing`, `Φ` ids    |
| **G.0‑4 Publish**  | All above                            | Versioned `CG‑Spec@UTS` + Name Cards, lifecycle, RSCR tests/trigger kinds  |
| **G.0‑5 Expose_CrossingHooks** | `CG‑Spec` + crossing/plane/policy pins | GateCrossing inputs for `GateChecks` (`E.18/A.21`): plane checks, lane purity, lexical SD pins |
| **→ G.1**          | `CG‑Spec`                            | Generator guardrails (Comparator/SCP/MinEv pins); degrade/abstain wiring   |
| **→ G.2**          | `CG‑Spec`                            | Harvesting inclusion/exclusion and crossing policy constraints             |
| **→ G.3**          | `CG‑Spec`                            | Required CHR characteristics/scales/operators to exist                     |
| **→ G.4**          | `CG‑Spec`                            | Acceptance templates; evidence minima; Γ‑fold override proof hooks         |
| **→ G.5**          | `CG‑Spec`                            | Eligibility gates and explainability pins (Path/UTS/policy ids)            |
| **→ G.6**          | `CG‑Spec`                            | EvidenceGraph/SCR pinning surface (policy ids + Path/PathSlice discipline) |
#### Authoring workflow for CG‑Spec (informative)

1. **Charter the frame.** Declare `Context`, `Scope`, `describedEntity`, boundary examples/non-examples, and `ReferenceMap`.
2. **Draft ComparatorSet and SCP.** Enumerate permitted comparator forms and bind each to CHR characteristics and legality constraints (scale/unit/polarity discipline). Attach guard bindings as explicit references/pins.
3. **Bind Characteristics.** Ensure every compared quantity is a CHR characteristic id (reuse/mint via UTS discipline).
4. **Declare MinimalEvidence.** For each characteristic: required lanes/carriers, freshness window, crossing allowances (if any), and explicit failure behavior wiring (tri-state semantics delegated to `G.Core`).
5. **Pin trust folding and penalties.** Cite the single owner for `DefaultId.GammaFoldForR_eff` unless explicitly overridden with proof refs; publish `Φ`/CL policy ids explicitly.
6. **Publish and register regression tests.** Publish `CG‑Spec@UTS` with edition-pinned segments; register RSCR tests for the frame’s legality surfaces and evidence minima.
7. **Lifecycle and refresh readiness.** Declare refresh cadence and deprecations with lexical continuity notes; ensure RSCR trigger kinds are emitted as canonical ids.
#### Extensions (pattern-scoped; non-core)

All blocks below are `GPatternExtension` modules (PatternScopeId; not new PatternIds). They store wiring only and cite semantic owners.

**GPatternExtension: ContractSurfaces**

* **PatternScopeId:** `G.0:Ext.ContractSurfaces`
* **GPatternExtensionId:** `ContractSurfaces`
* **GPatternExtensionKind:** `InteropSpecific`
* **SemanticOwnerPatternId:** `A.19`
* **Uses:** `{A.19}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum):**

  * `CNSpecRef.edition` (and any CN-side policy ids referenced by `CG‑Spec` fields)
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.LegalitySurfaceEdit}`
* **Notes (wiring-only):** `CG‑Spec` SHALL cite CN‑Spec; it SHALL NOT restate normalization/comparability semantics.

**GPatternExtension: BridgeAndCLWiring**

* **PatternScopeId:** `G.0:Ext.BridgeAndCLWiring`
* **GPatternExtensionId:** `BridgeAndCLWiring`
* **GPatternExtensionKind:** `InteropSpecific`
* **SemanticOwnerPatternId:** `F.9`
* **Uses:** `{F.9, G.7}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum):**

  * `BridgeCardId/BridgeId` (when crossings are permitted)
  * `CL` / `CL^k` and `Φ`/`Φ_plane` policy ids (when penalties are in play)
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.CrossingBundleEdit, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.ReferencePlaneEdit}`
* **Notes (wiring-only):** Crossing semantics and penalty routing are delegated to `G.Core`; this module only lists the required pins used by `CG‑Spec` entries.

**GPatternExtension: SoTAPaletteInputs**

* **PatternScopeId:** `G.0:Ext.SoTAPaletteInputs`
* **GPatternExtensionId:** `SoTAPaletteInputs`
* **GPatternExtensionKind:** `DisciplineSpecific`
* **SemanticOwnerPatternId:** `G.2`
* **Uses:** `{G.2}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum):**

  * `SoTA-Pack@CG‑Frame` refs used to justify comparator admissibility, evidence minima, and crossing allowances (e.g., claim sheets, operator inventory, bridge matrix ids)
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.EvidenceSurfaceEdit, RSCRTriggerKindId.CrossingBundleEdit, RSCRTriggerKindId.FreshnessOrDecayEvent}`
* **Notes (wiring-only):** Any SoTA palette/tradition semantics are owned by `G.2`. `G.0` only requires that `CG‑Spec` entries cite the needed SoTA artefacts for auditability.

**GPatternExtension: QDAndExplorationHooks**

* **PatternScopeId:** `G.0:Ext.QDAndExplorationHooks`
* **GPatternExtensionId:** `QDAndExplorationHooks`
* **GPatternExtensionKind:** `MethodSpecific`
* **SemanticOwnerPatternId:** `C.18`
* **Uses:** `{C.18, C.19, C.23}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum):**

  * `DescriptorMapRef.edition?`, `DistanceDefRef.edition?`, `InsertionPolicyRef?`
  * `FailureBehaviorPolicyId` / SoS‑LOG branch policy id when `degrade(mode=…)` is used
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.FreshnessOrDecayEvent}`
* **Notes (wiring-only):** `CG‑Spec` may declare optional QD/exploration hooks; semantics remain owned by the referenced method patterns.
### Archetypal Grounding — Tell–Show–Show; System / Episteme

#### Archetype 1: System comparability under mixed evidence and unit constraints

**Tell.** Two labs compare energy efficiency results of a physical system where measurements use different rigs and units, and some evidence is missing.

**Show (failure without CG‑Spec).** The team averages an ordinal safety rating, mixes units (“kWh” vs “MJ”), and silently treats missing lanes as zeros. Cross-lab reuse happens without explicit bridge/loss notes, so selection becomes a black box.

**Show (repair with CG‑Spec).** A conformant `CG‑Spec`:

* pins the lawful comparator(s) (e.g., unit-aligned ratio comparisons only; ordinal comparisons are order-only),
* declares `MinimalEvidence` lanes/carriers and freshness windows per characteristic,
* declares explicit failure behavior wiring (tri-state semantics delegated to `G.Core`),
* exposes crossing pins (bridge ids + CL/policy ids) when reuse across rigs is attempted,
* publishes the pinned editions so parity/refresh can detect drift.
#### Archetype 2: Epistemic comparability for portfolio selection across traditions

**Tell.** A team selects an R&D portfolio using multiple evaluation traditions: safety assurance, cost models, and readiness heuristics.

**Show (failure without CG‑Spec).** The team collapses partial orders into a single score, hides the threshold policy in code, and cannot explain why cross-tradition penalties changed between runs.

**Show (repair with CG‑Spec).** A conformant `CG‑Spec`:

* defines a comparator portfolio (e.g., Pareto dominance + explicit lexicographic tiebreaks where lawful),
* pins `CNSpecRef.edition` and the editioned segments (`ComparatorSetRef.edition`, `SCPRef.edition`, `MinimalEvidenceRef.edition`),
* makes `AcceptanceStubs` explicit as templates while locating thresholds in CAL (G.4),
* ensures RSCR triggers are emitted when comparator or policy pins change.
### Bias-Annotation

`CG‑Spec` can encode (and therefore amplify) biases if authored carelessly:

* **Tradition favoritism.** Comparator choices may privilege a tradition’s evidence style; mitigation: require explicit evidence minima and explicit crossing costs, and keep cross-tradition aggregation gated by explicit justifications.
* **Metric gaming and Goodhart effects.** Overemphasis on a single scalar can lead to gaming; mitigation: preserve set-return semantics and require explicit, auditable scalarisations when they are lawful and intended.
* **Hidden thresholds and opaque safety policy.** Embedding acceptance thresholds in prose or code hides value judgments; mitigation: keep thresholds in CAL acceptance clauses and pin policy ids.
* **Scope creep.** Comparisons leak across describedEntity or reference planes; mitigation: require explicit `describedEntity` and `ReferencePlane` pins and treat plane moves as explicit crossing events.
### Conformance Checklist (normative)

| ConformanceId | Statement |
| --- | --- |
| **CC‑G0‑CoreRef** | `G.0` is conformant only if the applicable core obligations listed in `G.0:4.1` are satisfied (delegation to `CC‑GCORE‑*`; no shadow specs, no competing defaults, typed RSCR triggers, explicit pins). |
| CC‑G0‑01 | `CG‑Spec` is published as a notation-independent UTS object with explicit `Edition`, `Context`, `Scope`, `describedEntity`, and a minimum `ReferenceMap`. |
| CC‑G0‑02 | `CNSpecRef.edition` is present and is treated as an external governance-card reference (no local redefinition of CN semantics). *(Delegation target: `CC‑GCORE‑CN‑CG‑1`.)* |
| CC‑G0‑03 | `ComparatorSet` is explicit and finite; each comparator is typed and bound to `SCP` and referenced CHR characteristics; **anything not enumerated MUST be treated as illegal/abstain by default** (no implicit comparator defaults). |
| CC‑G0‑04 | `SCP` declares, per characteristic, the lawful operation regime needed for each referenced comparator (scale/unit/polarity constraints and any required proofs/refs). |
| CC‑G0‑05 | `MinimalEvidence` is declared per characteristic and includes explicit lane/carrier requirements, freshness window references (if any), and explicit failure behavior wiring (tri-state semantics delegated). If freshness windows are used, a stable window id (e.g., `PathSliceId`) MUST be pinned for audit. |
| CC‑G0‑06 | `Γ‑fold` is present as an edition-pinned segment and either (i) cites `DefaultId.GammaFoldForR_eff` (single owner) or (ii) provides an explicit override with proof refs. |
| CC‑G0‑07 | If crossing penalties are used, `CL‑Routing` and `Φ` policy ids are explicit and auditable (policy ids are exposed as pins/refs) **and are required pins for downstream SCR publication on penalised claims** (see `G.6`). |
| CC‑G0‑08 | `AcceptanceStubs` in `CG‑Spec` are templates only; any context-local thresholds/acceptance policies are owned by CAL acceptance artefacts (G.4) and are cited, not duplicated. |
| CC‑G0‑09 | RSCR tests/triggers for edits to legality surfaces and evidence minima are present and use canonical `RSCRTriggerKindId`s. The RSCR test set SHOULD cover at least: illegal_op_refusals; unit/scale legality checks; freshness windows; partial-order scalarisation refusals; threshold semantics; CL→`R_eff` routing; refusal of `degrade.order` on unit mismatches (MM‑CHR). |
| CC‑G0‑10 | `Lifecycle` is declared: owner, DRR link, refresh cadence, decay/aging policy, and deprecations. Deprecations preserve lexical continuity (Δ-discipline; delegated to `CC‑GCORE‑ID‑*`). |
| CC‑G0‑11 | *(Conditional)* If `Illumination` / QD hooks are present, `DescriptorMapRef.edition`, `DistanceDefRef.edition`, and any `InsertionPolicyRef` / promotion policy ids are pinned (or explicitly marked absent) and are recorded in provenance/audit pins. |
| CC‑G0‑12 | *(Conditional)* If freshness windows influence gating/selection, they are published and enforced, and the relevant window ids (`PathSliceId` or equivalent) are recorded in SCR/audit pins. |
| CC‑G0‑13 | **Pre-flight numeric gates.** Any numeric comparison/aggregation declared in `ComparatorSet` has associated `GateChecks` for unit legality, scale legality, pinned SOP/editions, and declared comparability assumptions; failing any check yields `refuse` or `abstain` (tri-state semantics delegated). |
| CC‑G0‑14 | **GateCrossing hook exposure.** Exports provide `Expose_CrossingHooks` inputs so `GateChecks` (`E.18/A.21`) can validate plane consistency, crossing intent, lane purity, and lexical SD; failures MUST block publication. |
| **CC‑G0‑Φ** | `Φ(CL)` (and `Φ_plane`, if used) is monotone, bounded, and table-backed; policy ids are published; construction preserves `R_eff ≥ 0`. |
| **CC‑G0‑Unknowns** | *Delegated.* Unknown handling MUST follow the tri-state guard semantics `{pass|degrade|abstain}` with no silent coercions. (See `CC‑GCORE‑GUARD‑1`.) |
| **CC‑G0‑CSLC** | Scale/unit/polarity legality MUST be proven before any aggregation; illegal arithmetic on ordinal/nominal values is nonconformant. (Ownered by the relevant legality patterns; `G.0` only binds and cites.) |
### Common Anti-Patterns and How to Avoid Them

* **Anti-pattern: shadow legality gates in downstream code.** Avoid by requiring downstream to cite `CG‑Spec` segments by id+edition.
* **Anti-pattern: “one number to rule them all”.** Avoid by preserving set-return outputs when only partial orders are lawful; any scalarisation must be explicit, typed, and justified.
* **Anti-pattern: thresholds inside CG‑Spec or CHR.** Avoid by keeping thresholds and acceptance logic in CAL and citing from `CG‑Spec` only via stubs/templates.
* **Anti-pattern: implicit crossings.** Avoid by requiring explicit bridge ids, CL/policy ids, and reference-plane pins.
### Consequences

* **Lawful comparability.** The frame declares exactly what can be compared/aggregated and under what constraints.
* **Auditable selection.** Downstream selectors can justify outcomes via pinned legality surfaces and explicit evidence minima.
* **Explicit portability costs.** Cross-context reuse becomes deliberate and costed via visible crossings and penalties.
* **Lower drift under evolution.** Edition pinning + typed RSCR triggers makes comparability drift detectable and refreshable.
### Rationale

`CG‑Spec` centralises frame-level comparability constraints so that:

* CHR authorship (G.3) remains about *measurement meaning* rather than implicit thresholds,
* CAL (G.4) owns context-local acceptance/threshold policies and proof ledgers,
* selectors and dispatchers (G.5) remain policy-governed and auditable rather than encoding hidden legality assumptions,
* refresh (G.11) can treat legality edits and pin changes as explicit causes with canonical trigger ids.
### SoTA‑Echoing

This pattern aligns with post‑2015 best practice in evaluation and governance by:

* treating “abstain / defer” as a first-class outcome rather than forcing a single brittle scalar (cf. selective prediction / abstention and set-valued reporting practices),
* preserving multiobjective / partial-order outputs as sets (Pareto / archive thinking) rather than silently collapsing to a scalar,
* emphasising reproducibility via explicit versioning/pinning of evaluation surfaces (editions) and explicit policy identifiers,
* making evidence minima explicit and auditable (a conceptual analogue of modern reproducibility/robustness checklists and evaluation protocols),
* keeping method-family specifics modular (e.g., QD/archives, open-ended exploration budgets) via explicit wiring to owner patterns rather than embedding method semantics into the universal legality gate.
### Relations

**Builds on:** `G.Core`, `A.19 (CN‑Spec)`, `A.10 (evidence carriers)`, `A.17–A.19 / C.16 (MM‑CHR legality)`, `A.18 (CSLC)`, `B.3 (trust / Γ‑fold family)`, `F.* (contexts, bridges, CL, UTS)`, `E.10 (lexical rules)`, `E.5.* (notation independence discipline)`.
**Used by:** `G.1` (generator guards), `G.2` (harvesting constraints), `G.3` (required CHR), `G.4` (acceptance templates / proof hooks), `G.5` (eligibility gates), `G.6` (evidence/pin surfaces), and downstream parity/shipping/refresh where `CG‑Spec` is pinned.
**Publishes to:** `UTS` (Name Cards + editioned `CG‑Spec` segments).
### G.0:End
## CG‑Frame‑Ready Generator

**Tag.** architectural pattern; *generator chassis* (design‑time kit / authoring scaffold)  
**Status.** stable (Phase‑2 universalisation)  
**Normativity.** normative, except sections explicitly marked *informative*  
**Stage.** *design‑time* authoring of a generator‑kit with a *run‑time* execution façade (policy‑governed; edition‑aware)  
**Primary output.** the **six‑card chassis** `M1…M6` published as a **complete, reusable CG‑Frame kit**, plus a versioned **kit manifest** `CGKitId` that binds the six cards as a single reusable unit (view‑friendly inventory + wiring surface)  
**Primary hooks.** see **§12 Relations** (notably `G.Core`, `G.0`, `G.2`, `G.5`, `G.10`, `G.11`)  
**Working‑model first (informative).** prefer working models and didactic micro‑examples; escalate to formal harnesses only when risk warrants (per E.8).  
**Non‑duplication note.** universal Part‑G invariants (tri‑state guard, set-return, penalties→`R_eff`‑only, crossing visibility, typed RSCR triggers, default ownership, P2W split, linkage discipline, shipping boundary) are **single‑owner in `G.Core`** and are **only cited** here.

**Start here when.** Your first deliverable is a reusable generator / selector / portfolio scaffold rather than a one-off plan, one-off comparison, or tool-specific workflow recipe.

**First output.** The six-card chassis `M1…M6` published as a reusable `CGKitId`-bound kit with a scope anchor, local SoTA set, variant pool, shortlist surface, and refresh-ready wiring.

**Typical next owners.** `G.2` for the local SoTA set, `G.5` for governed set-return selection, `G.10` for shipping surfaces, `G.11` for refresh wiring, and `F.17` when the result must also land on a human-facing UTS surface.

**Common wrong escalations / reroutes.** If the real burden is only a one-off governed comparison or shortlist, reroute to `A.19` / `G.0` / `G.5`; if the real burden is project alignment rather than kit authoring, reroute to `A.15`; if tooling choice is being treated as the first artefact, hold the route here until the chassis and its bindings are explicit.

### Problem frame

You are authoring a **CG‑Frame** and want a **repeatable scaffold** that connects:

* a declared **scope anchor** (`CG‑FrameContext`, `describedEntity`, contract surfaces),
* a **local SoTA set** (scoped and provenance‑anchored),
* a **variant pool** (candidate ideas / decision options / method variants),
* a **shortlist** (a set/portfolio outcome, not a forced singleton),
* **publication‑ready bindings** into Part‑F artefacts (UTS rows, Name Cards, RSCR tests, worked examples),
* and **refresh readiness** (telemetry hooks + RSCR wiring) without redefining refresh or shipping.

This pattern is intentionally **a chassis**, not a method specification:

* harvesting semantics live in `G.2`,
* selection/dispatch semantics live in `G.5`,
* CHR/CAL payload semantics live in `G.3` / `G.4`,
* shipping ownership lives in `G.10`,
* refresh orchestration ownership lives in `G.11`.
### Problem

Without a chassis, CG‑Frame authoring tends to fail in repeatable ways:

* **SoTA is not locally scoped**: inputs are “in the air”, not a reconstructible set.
* **Generation is ad‑hoc**: variant candidates are emitted without a stable trace of why/when/how.
* **Selection is opaque**: eligibility/acceptance and assurance are not pinned to explicit surfaces.
* **Outputs don’t land in reusable surfaces**: no clean hand‑off into UTS / RoleDescription / Concept‑Sets / RSCR.
* **No kit‑level snapshot**: the scaffold lacks a versioned manifest, so downstream can’t reliably cite “which chassis edition” was used.
* **Refresh is unplanned**: there is no canonical wiring from edits/telemetry/decay to RSCR causes along the P2W path.
### Forces

* **Breadth vs. precision:** harvest wide enough to avoid local dogma, but keep the artefact actionable.
* **Generativity vs. assurance:** encourage novelty while keeping evidence, legality, and trust inspectable.
* **Local meaning vs. portability:** keep meaning local by default; crossing must be explicit and auditable.
* **Expressiveness vs. parsimony:** resist inventing new types/slots; prefer reuse and explicit wiring.
* **Stability vs. evolution:** keep stable IDs and pins while allowing SoTA, policies, and editions to evolve.
* **Didactic clarity vs. normative minimalism:** authors need a concrete scaffold, but universal invariants must not be duplicated outside `G.Core`.
### Solution

#### G.Core linkage (normative)

```
// Canonical form: see G.Core (Nil‑elision + Expansion rule for profiles/sets/pin‑sets).
GCoreLinkageManifest := ⟨
  CoreConformanceProfileIds := {
    GCoreConformanceProfileId.PartG.AuthoringBase,
    GCoreConformanceProfileId.PartG.TriStateGuard,
    GCoreConformanceProfileId.PartG.UTSWhenPublicIdsMinted,
    GCoreConformanceProfileId.PartG.ShippingBoundary
  },

  CorePinSetIds := {
    GCorePinSetId.PartG.AuthoringMinimal,
    GCorePinSetId.PartG.CrossingVisibilityPins
  },

  // Prefer sets; use deltas for pattern‑specific additions.
  RSCRTriggerSetIds := { GCoreTriggerSetId.SoTAHarvestSynthesis },
  RSCRTriggerKindIds := { RSCRTriggerKindId.BaselineBindingEdit },

  // Pattern‑owned kit identifiers (the “six cards”).
  CorePinsRequired := {
    SoTAPaletteDescriptionId,
    SoTA_SetId,
    VariantPoolId,
    ShortlistId,
    CGFrameLibraryId,
    RefreshReadinessCardId,
    CGKitId,

    // Local pointer-map surface for vocabulary + observables-to-CHR anchoring.
    // (May cite `G.0:CG‑Spec.ReferenceMap`; do not duplicate semantics.)
    ReferenceMap,

    // RSCR regression tests used by the chassis (if any).
    RSCRTestId[]?,

    // When the chassis is bound into WorkPlanning (P2W): planned baseline refs.
    SlotFillingsPlanItemRef[]?
  },

  // Consumed defaults (single‑owner; this pattern only cites owners via `G.Core.DefaultOwnershipIndex`).
  DefaultsConsumed := {
    DefaultId.GammaFoldForR_eff,   // owner: CC‑G5.4
    DefaultId.PortfolioMode,       // owner: CC‑G5.23
    DefaultId.DominanceRegime      // owner: CC‑G5.28
  }
⟩
```

**Routing rule (normative):** the semantics of `CC‑GCORE‑*`, `RSCRTriggerKindId.*`, and `DefaultId.*` are **single‑owner** in their canonical owners (primarily `G.Core`, and for the defaults above the owners listed in `G.Core.DefaultOwnershipIndex`). `G.1` MUST NOT restate or redefine those semantics.
#### Six‑module generator chassis (normative)

**Core artefact:** `CGFrameReadyGeneratorKit := ⟨M1, M2, M3, M4, M5, M6⟩`, where each `Mi` is a **card** with an explicit I/O surface and stable identifiers.
`CGKitId` identifies the versioned **kit manifest** (`CG‑Kit@CG‑Frame`) that lists the six card ids and the minimal wiring pins needed to treat the chassis as a reusable unit (this is **not** a shipping pack; shipping remains owned by `G.10`).

The chassis is *view‑friendly*: it is an inventory of “what exists and how it is wired”, not a second specification of CN/CG/CHR/CAL/selection semantics.

##### M1 — CG‑FrameContext Card (scope anchor)

**Owns (kit surface):**

* `CG‑FrameContext` and its **binding pins**:

  * `describedEntity := ⟨GroundingHolon, ReferencePlane⟩` *(pin set: `PartG.AuthoringMinimal`)*
  * `CNSpecRef.edition`, `CGSpecRef.edition` *(pin set: `PartG.AuthoringMinimal`)*
  * `ReferenceMap` *(cite `G.0:CG‑Spec.ReferenceMap`; do not duplicate semantics)*
  * any declared crossing/policy pins *(pin set: `PartG.CrossingVisibilityPins`)*

**Purpose:** provide the *single scope anchor* used by all downstream cards.

**Notes:** any contract/legality content is **cited** via `A.19 (CN‑Spec)` and `G.0 (CG‑Spec)` (delegation target: `CC‑GCORE‑CN‑CG‑1` via `CC‑G1‑CoreRef`); this card does not introduce a local “mini‑spec”.
##### M2 — SoTA_Set@CG‑Frame (harvester output card)

**Owns (kit surface):**

* `SoTAPaletteDescriptionId` and `SoTA_SetId` bound to `CG‑FrameContext`
* explicit provenance anchors for the set (via `A.10`), and any published UTS stubs/rows when applicable

**Semantic owner:** harvesting discipline and SoTA‑pack payload are owned by `G.2`.
In `G.1`, M2 is a *slot in the chassis* and a wiring surface; it does not redefine the harvesting method.
##### M3 — VariantPool (candidate inventory + emitter trace)

**Owns (kit surface):**

* `VariantPoolId` bound to `CG‑FrameContext`
* per‑candidate minimal traceability fields (emitter identity, `EmitterPolicyRef` (policy‑id/ref; owner‑defined), method/generator refs when declared, edition pins, provenance anchors)
* optional, per‑candidate **assurance preview pointers** (e.g., `PathSliceId?` and/or `SCRId?` when early assurance is recorded) and optional **QD/Open‑Ended scaffolding stubs** (only when introduced by explicit `GPatternExtension` blocks)

**Guardrails (via G.Core):**

* tri‑state eligibility handling, penalties routing, crossing visibility, and set‑return constraints are not defined here; they are enforced via `G.Core` conformance.

**Semantic owner of method payload:** method‑specific emitter semantics live in `Extensions` (e.g., `C.17`, `C.18`, `C.19`).
M3 MUST remain method‑agnostic in its core definition: it is an inventory surface, not an algorithm spec.
##### M4 — Shortlist (selector/assurer output)

**Owns (kit surface):**

* `ShortlistId` bound to `CG‑FrameContext`
* a portfolio/set of selected candidates plus rationale/assurance surfaces (`SCRId` required; `DRRId` optional; cite `PathId/PathSliceId` when applicable)
* optional **front/archive metadata** needed for reproducibility when used: ε‑front parameters and/or archive snapshot hooks, with ownership routed via `G.5` / `C.18` / `C.19` (no local semantics in `G.1`)

**Semantic owner:** selection/dispatch semantics are owned by `G.5`.
M4 MUST preserve *set‑return semantics* (as routed by `G.Core`) and MUST NOT hard‑code a forced singleton outcome.
##### M5 — CG‑FrameLibrary (published bindings index)

**Owns (kit surface):**

* `CGFrameLibraryId` bound to `CG‑FrameContext`
* an index of referenced CG‑Frame artefacts ready for reuse:

  * CHR/CAL/LOG bundles (by their ids; semantics owned by `G.3`, `G.4`, `G.8`)
  * published identifiers (UTS rows, Name Cards) per Part‑F owners
  * additional Part‑F binding surfaces (e.g., RoleDescription templates, Concept‑Set rows) by owner‑ids only
  * RSCR test identifiers (e.g., from `F.15`) and worked examples (where applicable)

**Boundary:** M5 is a **kit/library surface**, not shipping. If a shipped pack is needed, ownership is `G.10`.
##### M6 — RefreshReadiness Card (telemetry hooks + wiring)

**Owns (kit surface):**

* `RefreshReadinessCardId` bound to `CGFrameLibraryId` (and thus to `CG‑FrameContext`)
* `CGKitId` (the versioned kit manifest) binding `M1…M6` into a single reusable unit; it MUST enumerate the card ids and MAY carry references to deprecations/edition bumps minted by the canonical owners
* declared telemetry hooks (what signals are observed, with what pins)
* declared RSCR wiring: which `RSCRTriggerKindId` are relevant (canonical ids), with minimal required payload pins (including `SlotFillingsPlanItemRef[]` when the chassis is bound into WorkPlanning)

**Boundary:** orchestration semantics are owned by `G.11`.
M6 prepares *refresh‑readiness metadata* and wiring stubs; it does not define scheduling/priority heuristics.
#### Minimal I/O surface (normative)

| Module | Consumes                                                                    | Produces                                                                               |
| ------ | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| M1     | CG‑Frame brief + `describedEntity` + `CNSpecRef/CGSpecRef` (edition‑pinned) | `CG‑FrameContext` + context pins                                                       |
| M2     | discovery inputs + inclusion criteria *(via G.2)*                           | `SoTA_SetId` (+ provenance anchors; optional UTS stubs/rows)                           |
| M3     | `SoTA_SetId` + local constraints + emitter policy pins *(via Extensions)*   | `VariantPoolId` (+ candidate trace/provenance; optional method payload via Extensions) |
| M4     | `VariantPoolId` + acceptance/eligibility surfaces *(via G.4/G.5)*           | `ShortlistId` (portfolio/set) + rationale refs                                         |
| M5     | `ShortlistId` + CHR/CAL/LOG bundle refs + UTS/Name refs                     | `CGFrameLibraryId` (library index; publish‑ready bindings)                             |
| M6     | telemetry inputs + freshness/decay policy pins + RSCR tests                 | `CGKitId` + `RefreshReadinessCardId` (wiring to `G.11`; no orchestration ownership)    |
#### Extensions (pattern‑scoped; non‑core)

All method/discipline/generator specifics MUST be expressed as `GPatternExtension` blocks.

> Guard: `G.1:Ext.*` are **PatternScopeId** values (internal, pattern‑scoped), not new patterns and not new `PatternId`.

##### GPatternExtension — G.1:Ext.HarvesterWiring

**PatternScopeId:** `G.1:Ext.HarvesterWiring`
**GPatternExtensionId:** `HarvesterWiring`
**GPatternExtensionKind:** `GeneratorSpecific`
**SemanticOwnerPatternId:** `G.2`
**Uses:** `{G.2}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `SoTAPaletteDescriptionId`
* `SoTA_SetId`
* `ClaimSheetId[]` / `BridgeMatrixId` *(as referenced by the chosen G.2 pack form)*
* `CNSpecRef.edition`, `CGSpecRef.edition` *(already required via `GCorePinSetId.PartG.AuthoringMinimal`)*
**RSCRTriggerSetIds:** `{GCoreTriggerSetId.SoTAHarvestSynthesis}`
**Notes (wiring‑only):** harvesting semantics (living review funnels, inclusion policy families, SoS indicator families, etc.) are defined by `G.2` and are not duplicated in `G.1`.
##### GPatternExtension — G.1:Ext.ShortlistWiring

**PatternScopeId:** `G.1:Ext.ShortlistWiring`
**GPatternExtensionId:** `ShortlistWiring`
**GPatternExtensionKind:** `MethodSpecific`
**SemanticOwnerPatternId:** `G.5`
**Uses:** `{G.5, G.4}`
**⊑/⊑⁺:** `∅`

**RequiredPins/EditionPins/PolicyPins (minimum):**

* `ShortlistId`
* `SCRId` *(assurance/rationale surface by id; semantics owned by the selector/assurance owners)*
* `DRRId?` *(when a decision‑rationale artefact is minted; otherwise omitted)*
* `TaskSignatureRef?` *(if selection is task‑templated; otherwise omitted)*
* `AcceptanceClauseId[]` *(as referenced from `G.4` outputs)*
* any explicit selector policy pins *(policy‑id/ref; owner‑defined)* when not defaulted (default ownership is routed via `G.Core.DefaultOwnershipIndex`)

**Notes (wiring‑only):** `G.1` does not redefine selection: it binds M4’s output surface to the `G.5` selector/dispatcher kernel.
##### GPatternExtension — G.1:Ext.CreativityCHR

**PatternScopeId:** `G.1:Ext.CreativityCHR`
**GPatternExtensionId:** `CreativityCHR`
**GPatternExtensionKind:** `DisciplineSpecific`
**SemanticOwnerPatternId:** `C.17`
**Uses:** `{C.17, G.3}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `CHRPackId?` *(if creativity characteristics are published/typed)*
* edition/policy pins required by the chosen creativity characteristic set (owned by `C.17`)

**Notes (wiring‑only):** `G.1` only records which creativity characteristics are used for M3/M4 wiring; legality/typing lives in the CHR owners.
##### GPatternExtension — G.1:Ext.NQD

**PatternScopeId:** `G.1:Ext.NQD`
**GPatternExtensionId:** `NQD`
**GPatternExtensionKind:** `MethodSpecific`
**SemanticOwnerPatternId:** `C.18`
**Uses:** `{C.18, C.19}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `DescriptorMapRef.edition`
* `DistanceDefRef.edition`
* `InsertionPolicyRef` *(policy id / ref, as defined by the owner)*
* `TaskSignatureRef?` *(when QD is enabled via TaskSignature flags/traits rather than by an external switch)*
* `DHCMethodRef.edition?` *(when illumination/coverage summaries are pinned to a method)*
* `EmitterPolicyRef` *(policy‑id/ref; points to the exploration governance owner, e.g., `C.19` when E/E‑LOG is used)*

**RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.FreshnessOrDecayEvent}`

**Notes (wiring‑only):** QD/QD‑adjacent algorithm families and their parameterisations belong to `C.18/C.19`; `G.1` only fixes the pins needed to make the VariantPool and Shortlist reproducible.
##### GPatternExtension — G.1:Ext.OpenEndedFamilyWiring

**PatternScopeId:** `G.1:Ext.OpenEndedFamilyWiring`
**GPatternExtensionId:** `OpenEndedFamilyWiring`
**GPatternExtensionKind:** `GeneratorSpecific`
**SemanticOwnerPatternId:** `G.2` *(family semantics live in SoTA cards; this block only wires pins; selector‑side wiring is owned by `G.5`.)*
**Uses:** `{G.2, G.5, C.19, C.23}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `GeneratorFamilyId[]`
* `TransferRulesRef.edition` *(mandatory when Open‑Ended is enabled)*
* `EnvironmentValidityRegionRef?`
* `CoEvoCouplerRef[]?`
* `SoSLogBranchId[]?` *(when validity of generated tasks is gated by explicit branches)*

**RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.FreshnessOrDecayEvent}`

**Notes (wiring‑only):** this block enables portfolios of `{Environment, MethodFamily}` pairs without redefining generator semantics in `G.1`; it should cite/align with the selector‑side wiring in `G.5:Ext.OpenEndedFamilyWiring`.
##### GPatternExtension — G.1:Ext.RefreshWiring

**PatternScopeId:** `G.1:Ext.RefreshWiring`
**GPatternExtensionId:** `RefreshWiring`
**GPatternExtensionKind:** `GeneratorSpecific`
**SemanticOwnerPatternId:** `G.11`
**Uses:** `{G.11}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `RefreshReadinessCardId`
* `RSCRTestId[]`
* canonical `RSCRTriggerKindId[]` emitted/recorded (aliases only as labels, if any)
**RSCRTriggerSetIds:** `{GCoreTriggerSetId.RefreshOrchestration}`
**Notes (wiring‑only):** M6 declares readiness and wiring; orchestration semantics (queueing, prioritisation, cadence) are owned by `G.11`.
##### GPatternExtension — G.1:Ext.ShippingWiring

**PatternScopeId:** `G.1:Ext.ShippingWiring`  
**GPatternExtensionId:** `ShippingWiring`  
**GPatternExtensionKind:** `GeneratorSpecific`  
**SemanticOwnerPatternId:** `G.10`  
**Uses:** `{G.10}`  
**⊑/⊑⁺:** `∅`  
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `CGFrameLibraryId`
* `SoTAPaletteDescriptionId`, `SoTA_SetId`
* `CHRPackId?`, `CALPackId?`, `SoS‑LOGBundleId?`, `ParityReportId?` *(as present in the library index)*
* `EvidenceGraphId?`, `BridgeMatrixId?`, `BridgeCalibrationTableId?` *(when cited by the shipped artefacts)*
* `UTSRowId[]?` *(when any public ids are minted/published)*
* `SlotFillingsPlanItemRef[]?` *(when planned baseline is bound by id into the shipment surface)*
**Notes (wiring‑only):** this block does not define shipping; it only records the minimum wiring from the chassis/library index to `G.10` when shipping is performed.
### Archetypal Grounding — Tell–Show–Show (informative)

**Tell.** Use the six‑card chassis to make a CG‑Frame authoring effort reproducible: a scoped SoTA set, a traceable candidate pool, a set‑return shortlist, a publishable library index, and refresh readiness—without redefining contract/legality/selection/refresh owners.

**Show A (R&D multi‑criteria decisions; post‑2015 SoTA workflow).**

* **M1:** define `CG‑FrameContext` for “R&D decision options”, pin `CNSpecRef/CGSpecRef` editions, and publish `describedEntity` + `ReferencePlane`.
* **M2:** build `SoTA_SetId` via `G.2` using a living‑review style funnel (e.g., PRISMA‑like trace + update cadence) and publish UTS stubs for reusable constructs.
* **M3:** emit a `VariantPoolId` where each candidate cites its emitter policy and provenance; if QD is used, wire `DescriptorMapRef.edition` and `DistanceDefRef.edition` via `G.1:Ext.NQD`.
* **M4:** produce `ShortlistId` as a portfolio set via `G.5`, with acceptance predicates sourced from `G.4`.
* **M5:** publish a `CGFrameLibraryId` indexing the chosen CHR/CAL/LOG bundles and UTS rows; register RSCR tests.
* **M6:** declare refresh readiness (telemetry pins + canonical RSCR trigger kinds) and wire to `G.11`.

**Show B (clinical operations; safety‑first acceptability).**

* **M1:** scope a CG‑Frame around dose adjustment decisions; pin legality and evidence minima explicitly.
* **M2:** harvest SoTA models and safety constraints as a reconstructible set (owned by `G.2`).
* **M3:** generate policy‑constrained candidate protocols; emitter trace and evidence pins are mandatory.
* **M4:** shortlist remains a set; “choose one” is deferred to explicit policy, not silently baked into the generator.
* **M5/M6:** publish and wire refresh (decay events, policy changes, and evidence updates retrigger along the P2W path).
### Bias‑Annotation (informative)

* **Recency bias:** “newest paper wins” (mitigate with explicit inclusion criteria and update cadence in `G.2` wiring).
* **Novelty bias:** over‑rewarding novelty at the expense of legality/assurance (mitigate by making acceptance and assurance pins explicit and owned).
* **Algorithmic favoritism:** baking a preferred generator into “the chassis” (mitigate by keeping M3 method‑agnostic and pushing methods into Extensions).
* **Scalarisation bias:** collapsing portfolios/partial orders into a single score (mitigate by set‑return discipline routed via `G.Core`).
* **Hidden‑crossing bias:** implicit reuse across contexts (mitigate by explicit crossing pins and Bridge‑only routing via `G.Core`).
### Conformance Checklist (normative)

| ConformanceId     | Statement   |
| ----------------- | ----------- |
| **CC‑G1‑CoreRef** | The pattern MUST satisfy the **effective** `CoreConformanceIds` implied by `G.1:4.1` (`GCoreConformanceProfileId` expansion + deltas), per `G.Core` expansion rules.   |
| CC‑G1‑01          | The deliverable MUST include all six cards `M1…M6` with stable ids **and** a versioned kit manifest `CGKitId`, including at minimum: `{CGKitId, CG‑FrameContext, SoTAPaletteDescriptionId, SoTA_SetId, VariantPoolId, ShortlistId, CGFrameLibraryId, RefreshReadinessCardId}`.  |
| CC‑G1‑02          | `M1` MUST bind the kit to a single `CG‑FrameContext` and MUST expose the required pins from `GCorePinSetId.PartG.AuthoringMinimal` (including `describedEntity` and `CNSpecRef/CGSpecRef` editions). `M1` MUST also expose (or explicitly cite) a `ReferenceMap` surface and MUST NOT restate its semantics (cite `G.0:CG‑Spec.ReferenceMap`).  |
| CC‑G1‑03          | `M2` MUST be wired to `G.2` (or explicitly cite the `G.2` owner artefacts) and MUST be reconstructible as a scoped set, including `SoTAPaletteDescriptionId` + `SoTA_SetId` (not free‑floating prose). Provenance MUST be anchored via `A.10` for the emitted set.  |
| CC‑G1‑04          | `M3` MUST record emitter provenance as a wiring surface, including `EmitterPolicyRef` (policy‑id/ref), edition pins, and provenance anchors (via `A.10`). Any method‑specific fields MUST be introduced only via `GPatternExtension` blocks.   |
| CC‑G1‑05          | `M4` MUST be wired to `G.5` (or explicitly cite `G.5` owner artefacts) and MUST preserve set/portfolio outcomes. `SCRId` MUST be present (or explicitly cited to the owner surface) so assurance is id‑addressable; `DRRId` SHOULD be present when a decision‑rationale artefact is minted.   |
| CC‑G1‑06          | `M5` MUST publish a library/index surface that points to referenced CHR/CAL/LOG artefacts and to any minted public ids (`UTSRowId[]`, Name Cards) via the canonical owners (Part F), without introducing shadow specs (delegation target: `CC‑GCORE‑CN‑CG‑1` via `CC‑G1‑CoreRef`).    |
| CC‑G1‑07          | `M6` MUST publish `CGKitId` and expose refresh‑readiness wiring: canonical `RSCRTriggerKindId[]` applicability + minimal payload pins (including `SlotFillingsPlanItemRef[]` when applicable) and RSCR test ids; orchestration semantics MUST be cited to `G.11`.  |
| CC‑G1‑08          | Any method/discipline/generator specificity in `G.1` MUST be located in `G.1:4.4` as `GPatternExtension` blocks with `PatternScopeId`, `GPatternExtensionKind`, and `SemanticOwnerPatternId` (or `owner TBD` only for Phase‑3 seeds). If QD/illumination or Open‑Ended generator families are declared, the corresponding extension blocks MUST be present and MUST carry the owner‑required edition/policy pins. |
### Common Anti‑Patterns and How to Avoid Them (informative)

* **Anti‑pattern: “Shadow CN/CG spec inside the chassis.”**
  *Avoid:* keep CN/CG as cited contract surfaces; use pins and owner references only.

* **Anti‑pattern: “Chassis hard‑codes a favourite algorithm.”**
  *Avoid:* keep M3 core method‑agnostic; add algorithm families only via Extensions with explicit owner patterns and edition pins.

* **Anti‑pattern: “Shortlist = one winner.”**
  *Avoid:* preserve set/portfolio returns; any singleton choice must be an explicit downstream decision rule (policy‑bound).

* **Anti‑pattern: “Refresh plan described as prose triggers.”**
  *Avoid:* record canonical `RSCRTriggerKindId` and payload pins; aliases only as labels and only if docked.

* **Anti‑pattern: “Packaging implies shipping ownership.”**
  *Avoid:* treat M5 as a library index; treat M6 as readiness wiring; ship only via `G.10`.
### Consequences (informative)

* **Repeatable authoring:** CG‑Frame work becomes reconstructible: what exists, what it depends on, and how it is refreshed.
* **Method pluralism with discipline:** multiple generator/selector families can coexist without turning the chassis into a shadow method spec.
* **Better reuse:** outputs land directly in published artefacts (UTS/Name/RSCR‑ready) rather than remaining local notes.
* **Lower refactor cost:** method changes localise to Extensions; core invariants remain stable and single‑owner.
### Rationale (informative)

* **Why six cards?** It matches the minimal decomposition needed to keep scope, harvesting, generation, selection, publication, and refresh **explicitly separable** (and thus auditable and evolvable).
* **Why “kit/index” rather than “pack”?** A CG‑Frame authoring effort must stay modular; shipping is a separate ownership boundary (`G.10`).
* **Why push method content into Extensions?** It prevents conflating (i) universal invariants, (ii) frame‑specific kit surfaces, and (iii) method/generator families—supporting Phase‑2 universalisation goals.
* **Why working‑model first?** Many CG‑Frames fail due to premature formalism; a chassis with didactic micro‑examples improves correctness of pins, names, and boundaries before deep formalisation.
### SoTA‑Echoing (informative)

This chassis is designed to stay compatible with modern (post‑2015) practice without confusing “SoTA” with “currently popular”:

* **Evidence synthesis:** living systematic review workflows (e.g., PRISMA‑style traceability and update cadence) map naturally to M2 wiring owned by `G.2`.
* **Quality‑Diversity and archives:** modern QD families (MAP‑Elites‑class, CMA‑ME‑class, and related archive‑based exploration) fit as M3/M4 extensions (`C.18`/`C.19`) because they require explicit descriptor/distance/insertion pins and preserve set‑valued outcomes.
* **Open‑ended exploration:** post‑2015 open‑endedness systems (POET‑class, paired/adversarial environment generation lines, and modern curriculum‑generation approaches) fit when treated as generator‑family wiring (owned elsewhere) rather than as chassis semantics.
* **Set‑valued decision outputs:** modern multi‑objective and set‑valued evaluation practices align with the `G.Core` set‑return discipline, preventing hidden scalarisation.
* **Governed traceability:** contemporary reproducibility and accountability norms (mechanism disclosure, provenance anchors, and audit trails) are supported via pinned policies/editions and explicit module boundaries, without introducing data‑governance machinery.
### Relations

**Builds on:** `G.Core`, `E.8`, `E.10`, `E.19`.
**Uses:** `A.10 (Provenance Anchors)`, `A.15.3 (SlotFillingsPlanItem)`, `A.19 (CN‑Spec)`, `G.0 (CG‑Spec)`, `G.2 (SoTA Synthesis Pack)`, `G.3 (CHR Pack@CG‑Frame)`, `G.4 (CAL Pack@CG‑Frame)`, `G.5 (Selector & Dispatch)`, `G.10 (Shipping)`, `G.11 (Refresh Orchestration)`, and (via Extensions) `C.17/C.18/C.19`.
**Publishes to / consumes from:** Part‑F publication surfaces (UTS, naming, RSCR tests, Role/Concept artefacts) as cited by their owners.
### G.1:End
## SoTA Harvester & Synthesis

> **Type:** Architectural (A)
> **Status:** Stable
> **Normativity:** Normative *(unless explicitly marked informative)*
>
> **Purpose.** Provide a repeatable, auditable way to **discover**, **triage**, and **synthesize** state‑of‑the‑art (SoTA) across competing `Tradition` lineages *before* minting CHR/CAL/LOG assets for a `CG‑Frame`.
> The primary output is a **`SoTA Synthesis Pack@CG‑Frame`** that feeds:
>
> * naming/publication (UTS),
> * CHR authoring (G.3),
> * CAL authoring (G.4),
> * method/generator registries and dispatch (G.5).
>
> **Scope note.** This pattern **owns** the harvesting + synthesis *generator* in Part G. Shipping ownership is in **G.10**, refresh orchestration ownership is in **G.11**.
>
> **Terminology note (normative).** In normative clauses below, **`Tradition`** refers to the *Tech* token `Tradition` (a plural lineage with internally coherent commitments). Plain “tradition” is allowed only as a 1:1 synonym.

### Problem frame

A team extends FPF into a new `CG‑Frame`. The relevant literature is typically:

* **plural** (multiple `Tradition` lineages with incompatible commitments),
* **context‑sensitive** (results depend on `U.BoundedContext` and declared `describedEntity`),
* **method‑heterogeneous** (different evidence styles, operator sets, and validity regions),
* **time‑sensitive** (rapid drift post‑2015; frequent benchmark/protocol shifts).

Downstream Part‑G work (CHR/CAL/selection/shipping/refresh) depends on the team producing **consumable, citation‑ready artefacts** without collapsing semantic boundaries across contexts or planes.
### Problem

How can we systematically assemble a SoTA view that is:

1. **pluralist but comparable** (plurality preserved; comparability is achieved only via explicit crossings),
2. **evidence‑addressable** (claims cite auditable evidence surfaces and anchors),
3. **actionable** (produces inventories and cards that G.3/G.4/G.5 can consume),
4. **refreshable** (editions/policies/windows are pinned so RSCR/refresh can re‑audit and re‑run without semantic drift)?
### Forces

* **Pluralism vs. consolidation.** Consolidation is valuable, but unqualified fusion destroys meaning.
* **Breadth vs. load‑bearing depth.** Too broad becomes shallow; too deep misses rival lineages.
* **Recency vs. stability.** Freshness matters, yet durable “backbone” claims must be identified and kept visible.
* **Pedagogy vs. rigour.** Outputs must be teachable enough to support review, while remaining audit‑ready.
* **Authoring vs. operations.** This pattern lives in the authoring plane; operational runs and decisions belong to Work planes and to owner patterns.
### Solution

#### G.Core linkage (normative)

**Builds on:** `G.Core` (Part‑G core invariants; routing hub)

**GCoreLinkageManifest (normative).**
*(Canonical form, Nil‑elision, and Expansion rule are defined in `G.Core`.)*

`GCoreLinkageManifest := ⟨
  CoreConformanceProfileIds := {
    GCoreConformanceProfileId.PartG.AuthoringBase,
    GCoreConformanceProfileId.PartG.UTSWhenPublicIdsMinted
  },
  RSCRTriggerSetIds := {GCoreTriggerSetId.SoTAHarvestSynthesis},
  CorePinSetIds := {GCorePinSetId.PartG.CrossingVisibilityPins},

  CorePinsRequired := {
    // Scope pins (G.2‑specific)
    CG-FrameContext,
    Tradition[],
    describedEntity := ⟨GroundingHolon, ReferencePlane⟩,
    SoTA_SetId,
    SoTAPaletteDescriptionId,

    // Evidence / provenance pins (G.2‑specific)
    CorpusLedgerId,
    FlowRecordId,
    EvidenceAnchorRef[],
    EvidenceGraphId?,

    // Crossing / synthesis pins (delta beyond CorePinSetIds; only when used)
    GammaEpistSynthId[]?,

    // Edition / policy pins (only when used)
    HarvestPolicyRef?,
    DistanceDefRef.edition?,
    InclusionCriteriaId?,
    ScreeningRubricId?
  },

  DefaultsConsumed := ∅,
  TriggerAliasMapRef := ∅
⟩`

*(RSCR payload pins: `ClaimSheetId[]`, `SoTA_SetId`, `SoTAPaletteDescriptionId`, `BridgeMatrixId?`, `GammaEpistSynthId[]?`, `UTSRowId[]?`, `DistanceDefRef.edition?`, `HarvestPolicyRef?`, `InclusionCriteriaId?`, `ScreeningRubricId?`, `PathId/PathSliceId?` when path‑citable evidence or a stable freshness window is pinned.)*

**Pattern‑local default rules (owned by this pattern; not a Part‑G‑wide `DefaultId`).**

`FamilyCoverageFloorK := 3` *(unless explicitly overridden by `HarvestPolicyRef` and recorded in `FlowRecord`)*
#### Kit: SoTA Synthesis Pack@CG‑Frame (pattern‑owned surface)

A conforming `G.2` publication produces a **notation‑independent pack** whose internal organisation is free, but whose exported **named components / views** are stable and citable:

Each named component is addressable via a stable **pack‑local identifier** (e.g., `CorpusLedgerId`, `ClaimSheetId`, `FlowRecordId`) for citation and RSCR scoping. If any component is minted/evolved as a **public id**, it is published and cited via `UTSRowId[]` per `CC‑GCORE‑UTS‑1` (delegation).

0. **`SoTA_Set@CG‑Frame`** *(export view; “M2 output” consumed downstream)*  
   A read‑optimised view over the harvested candidate set that downstream generator/selector work treats as the “harvester output set”.  
   **Constraint (normative):** `SoTA_Set@CG‑Frame` **MUST** be reconstructible from pack components by id (no “hidden extra set”).

1. **`G.2a CorpusLedger`**
   Ledger of candidate sources with Context and triage status (e.g., include / park / retire) and explicit rationale hooks.

2. **`G.2b ClaimSheets[Tradition]`**
   Typed Claim Sheets per `Tradition`, each with:

* explicit home context and `describedEntity`,
* explicit evidence anchors/citations (A.10 and/or EvidenceGraph refs when available),
* explicit freshness window notes and risk/trust cues *(cite `B.3` owners when using trust/decay language)*.

3. **`G.2c OperatorAndObjectInventory`**
   Inventory of candidate CHR terms (characteristics/scales/coordinates) and candidate CAL operators/flows *as stubs* for downstream authoring.

4. **`G.2d BridgeMatrix`**
   A citable alignment/divergence surface across `Tradition`×`Tradition`, with explicit losses and row scopes.
   If any row asserts **cross‑source / cross‑`Tradition` substitution or fusion**, the pack **MUST** attach a `GammaEpistSynthId` record (alias: **`G.2‑F`**) per `G.2:Ext.GammaEpistSynthesis` (no silent fusion).

5. **`G.2e MicroExamples`**
   Worked micro‑examples for load‑bearing claims, each citing A.10 carriers, declaring context + `describedEntity`, and annotating assurance type(s) (`TA`/`VA`/`LA`, where applicable).

6. **`G.2f UTSProposals`**
   Draft Name Cards + Minimal Definitional Sheets (MDS) + alias proposals (incl. concept‑set linkage where applicable), with the required publication pins.

7. **`G.2g describedEntity Map`**
   Map from key terms/claims/public ids to `GroundingHolon`, `ReferencePlane`, and minimal reference cues for later CHR/CAL authoring.

8. **`G.2h PRISMA Flow Record`**
   A screening/eligibility trail for how sources entered the pack (method‑profile is allowed; see Extensions).  
   *(Name is historical; the artefact remains notation‑independent.)*

9. **`G.2i SoSIndicatorFamilies`**
   Indicator *families* as variants (windows/constraints/assumptions) **with explicit Acceptance branches per variant** (branch ids/labels only; threshold semantics belong to CAL owners).

10. **`G.2j MethodFamilyCards`**
    Candidate method families with a shared signature and a plurality of implementations, each with validity regions, cost/complexity notes, and known failure modes.
    When the pack targets downstream registry/dispatch, MethodFamily cards **SHOULD** include wiring stubs needed by `G.5` (eligibility predicate refs, assurance profile cues, and the pack ids that justify the family).

11. **`G.2k GeneratorFamilyCards`** *(if applicable)*
    Candidate generator families for environment/task generation with declared validity regions and transfer hooks.

12. **`G.2l Annexes`** *(optional; owner‑routed; see Extensions)*
    For example: QD/NQD annexes, discipline‑specific indicator annexes, interop forms.

**SoTAPaletteDescription** *(export view; required downstream)*  
A view‑friendly description object (pack‑local `SoTAPaletteDescriptionId`) that binds together:
* the `SoTA_Set@CG‑Frame` view,
* `ClaimSheetId[]`, `OperatorAndObjectInventory`, `BridgeMatrixId?`,
* `SoSIndicatorFamilies` (with variant/branch structure),
* `MethodFamilyCards` / `GeneratorFamilyCards?`,
* `MicroExamples`, `UTSProposals`,
* and the `describedEntity Map` for citation and later CHR/CAL authoring.  
**Note (normative intent):** this is the primary “consumable surface” for `G.3/G.4/G.5`; it prevents downstream patterns from scraping free prose.

**Editorial template: 1‑page “SoTA Sheet” per Tradition (informative).**  
When authoring `ClaimSheets[Tradition]`, teams often benefit from a single‑page template: scope + claims + evidence anchors + validity region + failure modes + freshness window + cross‑Tradition reuse notes + pointers to micro‑examples.
#### Harvester loop (conceptual choreography; pattern‑owned)

A conforming `G.2` work product is built by iterating the following conceptual loop until the declared gates are satisfied:

1. **Declare scope and plurality.**
   Declare `CG-FrameContext`, the initial `Tradition` set, and the `describedEntity` surface for each intended claim region. Record these declarations in the pack pins (not as implicit assumptions).

2. **Discover and triage sources (ledger‑first).**
   Populate `CorpusLedger` via:

* seed sources,
* expansion via citation chaining and keyword family exploration,
* pruning using load‑bearing relevance tests tied to the declared CG‑Frame scope.

3. **Distill claims per `Tradition`.**
   For each `Tradition`, author a Claim Sheet that preserves internal commitments and cites evidence anchors. Do not fuse cross‑`Tradition` claims at this stage.

4. **Inventory operators/objects for downstream authoring.**
   Extract candidate measurement terms and operator stubs for later CHR/CAL authoring (without asserting legality or thresholds locally).

5. **Build alignment/divergence surfaces.**
   Where reuse across `Tradition` is desired, author Bridge‑backed alignment records and explicit loss notes in `BridgeMatrix`. Any consolidation is explicitly marked as requiring alignment proof.

6. **(Alias: G.2‑F) Produce Γ_epist synthesis records when fusion/substitution is asserted.**
   If a work product asserts cross‑source / cross‑`Tradition` fusion or substitution (beyond mere “parallel divergent claims”), it **MUST** emit `GammaEpistSynthId` records per `G.2:Ext.GammaEpistSynthesis` (provenance union + explicit object alignment refs + assurance tuple refs), and it **MUST** keep penalties routed to `R_eff` only by delegation (`CC‑GCORE‑PEN‑1`).

7. **Publish teachable micro‑groundings.**
   Attach worked micro‑examples to load‑bearing claims, each tied to A.10 carriers and declaring context + `describedEntity`.

8. **Apply gates and record repairs.**
   Enforce `FamilyCoverageFloorK` (and any optional diversity‑by‑distance gate). If a gate fails, the pack **MUST**:
   * record the failure and the repair iteration in `FlowRecord` and `CorpusLedger`,
   * pin the updated `HarvestPolicyRef` / criteria ids (if changed),
   * iterate the loop rather than silently weakening the gate.

9. **Emit hand‑off manifests and export views.**
   Produce explicit manifests to:

* `G.3` (CHR authoring),
* `G.4` (CAL authoring),
* `G.5` (registry/dispatch),
  so that downstream work can cite pack components by id rather than re‑authoring them.
   The pack **MUST** also export `SoTA_Set@CG‑Frame` and `SoTAPaletteDescription` as the default downstream consumption surfaces (ids pinned).
#### Interfaces (minimal I/O Standard)

| Interface         | Consumes                                                      | Produces                                                                    |
| ----------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **G.2‑1 Harvest** | `CG-FrameContext`, initial `Tradition[]`, `HarvestPolicyRef?`  | `SoTA Synthesis Pack@CG‑Frame` (G.2a–G.2l)                                  |
| **G.2‑2 Extend**  | existing Pack + new sources/anchors + updated policy pins     | updated Pack + RSCR‑relevant trigger emissions (canonical kinds)            |
| **G.2‑3 HandOff** | Pack                                                          | `CHR‑handoff` (to G.3), `CAL‑handoff` (to G.4), `Registry‑handoff` (to G.5) |

*Note:* Orchestration of re‑runs is owned by `G.11`; this pattern only defines what a conforming (re)harvest produces and what pins it must expose.
#### Extensions (pattern‑scoped; non‑core)

`Extensions` are pattern‑scoped modules. They do not introduce Part‑G‑wide norms; they provide wiring/pins and cite semantic owners.

###### GPatternExtension: GammaEpistSynthesis

**PatternScopeId:** `G.2:Ext.GammaEpistSynthesis`  
**GPatternExtensionId:** `GammaEpistSynthesis`  
**GPatternExtensionKind:** `GeneratorSpecific`  
**SemanticOwnerPatternId:** `G.2` *(this pattern owns synthesis semantics; module exists for modularity + later extraction)*  
**Uses:** `{G.Core, B.3, F.9, G.6}` *(penalty routing + trust/decay cues + bridges/CL + evidence path citation when used)*  
**⊑/⊑⁺:** `∅`  
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `GammaEpistSynthId[]` *(pack‑local ids of synthesis records; emitted iff fusion/substitution is asserted)*  
* `EvidenceAnchorRef[]` *(provenance union; A.10 carriers)*  
* `BridgeMatrixId` and `BridgeCardId[]` *(explicit object alignment references when crossing is involved)*  
* `CL/CL^plane` + `Φ/Ψ/Φ_plane policy-ids` *(ids only; semantics routed via owners; penalties → `R_eff` only by delegation)*  
* `PathId/PathSliceId?` *(only when citing via `G.6`)*

**RSCRTriggerKindIds:** `{RSCRTriggerKindId.EvidenceSurfaceEdit, RSCRTriggerKindId.CrossingBundleEdit, RSCRTriggerKindId.ReferencePlaneEdit, RSCRTriggerKindId.PenaltyPolicyEdit, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.EditionPinChange}`

**Notes (normative intent; duplication‑avoidant):**
* `Γ_epist^synth` is an auditable record that binds: (i) provenance union, (ii) explicit object alignment refs, (iii) assurance tuple refs (via existing owners) for each asserted fusion/substitution.  
* This module **does not** redefine `Γ‑fold`, `Φ`, or penalty semantics; it only requires the pins/refs needed for replayability and auditability (see `G.Core` delegations).
###### GPatternExtension: HarvestProtocols

**PatternScopeId:** `G.2:Ext.HarvestProtocols`
**GPatternExtensionId:** `HarvestProtocols`
**GPatternExtensionKind:** `Phase3Seed`
**SemanticOwnerPatternId:** `owner TBD` *(Phase‑3 seed: harvesting protocol taxonomy not yet extracted into a dedicated owner)*
**Uses:** `{B.3, A.10}` *(for freshness/decay and provenance anchors, when protocol requires them explicitly)*
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `HarvestPolicyRef` *(declares the chosen protocol family and its parameters)*
* `FlowRecordId` *(protocol‑specific profile id or rubric id may be attached here)*
* `InclusionCriteriaId` / `ScreeningRubricId` *(ids only; semantics remain local to the protocol family)*

**RSCRTriggerKindIds:** `{RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.FreshnessOrDecayEvent}`

**Notes (wiring‑only):**
* This module binds a declared protocol profile to the pack’s `FlowRecord` without redefining evidence semantics.
###### GPatternExtension: DHCAlignmentHooks

**PatternScopeId:** `G.2:Ext.DHCAlignmentHooks`
**GPatternExtensionId:** `DHCAlignmentHooks`
**GPatternExtensionKind:** `DisciplineSpecific`
**SemanticOwnerPatternId:** `C.21` *(DHC semantics are owned by C.21)*
**Uses:** `{C.21, G.6, G.7}` *(DHC series + evidence path citations + bridge/CL regimes when alignment density is claimed)*
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `DHCMethodRef.edition`
* `WindowRef?` *(if the DHC series is windowed)*
* `DHCSenseCellId[]` *(pack‑local ids for emitted DHC SenseCells; if any are public, cite via `UTSRowId[]`)* 
* `UTSRowId[]?` *(only if any DHC SenseCells / series ids are minted/evolved as public ids)*
* `PathId[]` / `PathSliceId[]` *(when alignment summaries cite evidence paths via G.6)*

**RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.EvidenceSurfaceEdit, RSCRTriggerKindId.TelemetryDelta}`

**Notes (wiring‑only):**
* If DHC alignment summaries are emitted, this module ensures the DHC method edition and the cited evidence paths are visible.
* Units/constraints (semantic owner: `C.21`) must be **pinned, not redefined** here (e.g., `bridges_per_100_DHC_SenseCells`, `CL_min = 2` for cross‑Context counting, and the “CL=3 implies free substitution” interpretation when used).
###### GPatternExtension: NQDAnnex

**PatternScopeId:** `G.2:Ext.NQDAnnex`
**GPatternExtensionId:** `NQDAnnex`
**GPatternExtensionKind:** `MethodSpecific`
**SemanticOwnerPatternId:** `C.18` *(NQD‑CAL semantics owned by C.18; explore/exploit logging by C.19 when used)*
**Uses:** `{C.18, C.19}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `DescriptorMapRef.edition`
* `DistanceDefRef.edition`
* `InsertionPolicyRef` *(policy‑id/ref)*
* `EmitterPolicyRef` *(policy‑id/ref)*
* `TaskSignatureRef?` *(when QD mode is trait‑gated)*

**RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.FreshnessOrDecayEvent}`

**Notes (wiring‑only):**
* This module only pins the required references for replayability; it does not redefine QD semantics, dominance, or acceptance rules.
###### GPatternExtension: InteropForms

**PatternScopeId:** `G.2:Ext.InteropForms`
**GPatternExtensionId:** `InteropForms`
**GPatternExtensionKind:** `InteropSpecific`
**SemanticOwnerPatternId:** `G.13`
**Uses:** `{G.13}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `ExternalIndexRef.edition`
* `ClaimMapperRef.edition`
* `MappingPolicyRef` *(policy‑id/ref)*
* `UTSRowId[]` *(for published external ids/aliases where relevant)*

**RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TokenizationOrNameChange, RSCRTriggerKindId.EvidenceSurfaceEdit}`

**Notes (wiring‑only):**
* Interop affects only representation and citation routes; it must not introduce alternate legality gates or acceptance semantics.
### Archetypal Grounding (System / Episteme)

| Template element   | `U.System` illustration                                                                                                                                                                                                                                                  | `U.Episteme` illustration                                                                                                                                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tell**           | A safety engineering team needs to choose a control stack across multiple engineering “schools” (robust control, learning‑based control, formal verification), under a declared operational context and a concrete `describedEntity` (the vehicle + operating envelope). | A research group must synthesize SoTA on “decision quality” across competing lineages (causal decision theory, evidential variants, bounded rationality, and active‑inference‑style formalisms), each with distinct evidence norms and semantics.       |
| **Show (failure)** | The team merges terms across contexts, treats incompatible test protocols as comparable, and collapses multiple partially ordered trade‑offs into one unqualified score. The resulting design cannot explain why a later safety review disagrees.                        | The group produces a single “best” metric of decision quality and retrofits definitions to fit it. Later, conflicting claims cannot be traced because evidence anchors and crossing losses were never made explicit.                                    |
| **Show (repair)**  | A conformant `G.2` pack keeps parallel Claim Sheets per `Tradition`, publishes explicit alignment/loss notes where reuse is attempted, and emits hand‑offs so CHR/CAL/selection can be authored without re‑inventing semantics.                                          | A conformant `G.2` pack preserves plural claims, publishes explicit bridge‑backed alignment where justified, represents indicators as families/variants, and makes evidence anchors and freshness windows visible so downstream re‑audits are possible. |
### Bias-Annotation (informative)

Lenses tested: **Gov**, **Arch**, **Onto/Epist**, **Prag**, **Did**.

* **Selection bias (Gov/Onto).** Any harvesting protocol can over‑represent certain venues, languages, or evidence styles.
  *Mitigation:* pluralism floor + explicit `CorpusLedger` + explicit protocol pins.

* **Consolidation bias (Onto/Epist).** Pressure to “merge” lineages can erase incompatible commitments.
  *Mitigation:* keep Claim Sheets disjoint by default; require explicit alignment proof for fusion; preserve loss notes.

* **Recency bias (Prag).** Overweighting newest papers can hide durable backbone results; underweighting them misses SoTA drift.
  *Mitigation:* publish freshness windows and make them RSCR‑relevant.

* **Didactic bias (Did).** Micro‑examples can steer interpretation toward familiar domains.
  *Mitigation:* require heterogeneous substrates and explicit A.10 anchors.
### Conformance Checklist (normative) — CC‑G2

| ConformanceId             | Requirement                                                                                                                                                                                                                                                                                                                                        | Purpose / Notes                                                                     |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **CC‑G2‑CoreRef**         | A conforming `G.2` artefact **MUST** satisfy the **effective** core obligations declared by the `GCoreLinkageManifest` in `G.2:4.1` (per `G.Core` Expansion rule).                                                                                                                                                                                 | Phase‑2 bridge clause: ensures universal invariants are not redefined inside `G.2`. |
| **CC‑G2‑Pluralism‑1**     | A conforming pack **MUST** include at least **two** `Tradition` lineages and at least **three** distinct home `U.BoundedContext` entries across the corpus.                                                                                                                                                                                        | Prevents single‑lineage “SoTA” from masquerading as synthesis.                      |
| **CC‑G2‑Ledger‑1**        | A conforming pack **MUST** include `G.2a CorpusLedger` with inclusion/triage status and explicit rationale hooks per entry.                                                                                                                                                                                                                        | Makes discovery/triage auditable.                                                   |
| **CC‑G2‑FlowRecord‑1**    | A conforming pack **MUST** include `G.2h FlowRecord` that traces identification → screening → eligibility → included at a minimum granularity sufficient to reproduce the corpus boundary.                                                                                                                                                         | Prevents “mystery inclusion” and supports refresh.                                  |
| **CC‑G2‑ClaimSheets‑1**   | For each included `Tradition`, a conforming pack **MUST** include a `ClaimSheetId` that declares home context, `describedEntity`, evidence anchors, and freshness notes; it **MUST NOT** fuse cross‑`Tradition` claims by default.                                                                                                                 | Keeps plurality explicit and prevents hidden crossings.                             |
| **CC‑G2‑Palette‑1**       | A conforming pack **MUST** export `SoTA_Set@CG‑Frame` and `SoTAPaletteDescription` as citable views (via `SoTA_SetId`, `SoTAPaletteDescriptionId`) and ensure both are reconstructible from pack components by id (no hidden extra structure).                                                                                                      | Prevents downstream scraping of prose; keeps “M2 output” explicit.                  |
| **CC‑G2‑describedEntityMap‑1** | A conforming pack **MUST** include `G.2g describedEntity Map`, mapping (at minimum) each load‑bearing claim family and each minted/evolved public id to `describedEntity := ⟨GroundingHolon, ReferencePlane⟩`, and citing the relevant `ClaimSheetId` and evidence anchors (A.10 and/or G.6 paths when used).                                         | Keeps plane/holon boundaries explicit and citable.                                  |
| **CC‑G2‑Alignment‑1**     | Any cross‑`Tradition` consolidation **SHALL** be presented as either (i) disjoint parallel claims with explicit divergence, or (ii) an explicitly justified alignment proof; any reuse across `Tradition` boundaries **MUST** use explicit crossing bundles per `CC‑GCORE‑CROSS‑1` (delegation).                                                  | Prevents silent semantic leakage.                                                   |
| **CC‑G2‑GammaSynth‑1**    | If the pack asserts cross‑source / cross‑`Tradition` **fusion/substitution** (not merely “parallel divergent claims”), it **MUST** emit `GammaEpistSynthId` records satisfying `G.2:Ext.GammaEpistSynthesis` (provenance union + explicit alignment refs + assurance tuple refs). If no fusion/substitution is asserted, the pack **SHALL** state so explicitly. | Restores the load‑bearing synthesis artefact (alias: `G.2‑F`) without shadow specs. |
| **CC‑G2‑Inventory‑1**     | A conforming pack **MUST** include `G.2c OperatorAndObjectInventory`, sufficient for downstream CHR/CAL authoring to begin without re‑harvesting terms.                                                                                                                                                                                            | Ensures the pack is actionable.                                                     |
| **CC‑G2‑Inventory‑2**     | `G.2c OperatorAndObjectInventory` entries **MUST** be treated as **stubs** for downstream authoring: they **MUST NOT** embed acceptance thresholds or claim legality decisions locally. If an entry is not a citation of an already‑owned CHR/CAL artefact, it **MUST** be explicitly marked as `stub` (typing/lawfulness `TBD`) and **MUST NOT** be used as if lawful. Legality/threshold semantics are routed to owner patterns (`G.3` for CHR, `G.4` for CAL) via explicit ids/pins. | Prevents “shadow CHR/CAL” and preserves lawfulness discipline without redefining it locally. |
| **CC‑G2‑MeasurementLawful‑1** | If any inventory entry is presented as **non‑stub** (i.e., already lawful/typed), the pack **MUST** cite the owning lawfulness discipline (e.g., `A.17–A.19/C.16` as applicable) and provide the minimal evidence anchors needed to justify that typing claim.                                                                                      | Prevents “quietly lawful” measurement claims inside the harvester pack.             |
| **CC‑G2‑MicroExamples‑1** | For every load‑bearing claim family, a conforming pack **MUST** include **at least two** worked micro‑examples on **heterogeneous substrates**, each with explicit A.10 carrier anchors, declared context + `describedEntity`, and an assurance tag (`TA`/`VA`/`LA`, where applicable).                                                          | Makes the synthesis teachable and anchor‑grounded.                                  |
| **CC‑G2‑UTS‑1**           | If the pack proposes or evolves any public ids, it **MUST** publish UTS proposals *(Name Cards + MDS where applicable)* and cite them via `UTSRowId[]`, satisfying `CC‑GCORE‑UTS‑1` (delegation).                                                                                                                                               | Keeps naming and evolution disciplined.                                             |
| **CC‑G2‑Families‑1**      | SoS indicators and candidate evaluation constructs **SHALL** be represented as **families/variants** (windows/constraints/assumptions) **with explicit Acceptance branch structure per variant** (branch ids/labels only), not as single unqualified scalars; any scalar summary **MAY** be included only as report‑only unless explicitly promoted by owner patterns. *(Set/portfolio discipline is delegated to `CC‑GCORE‑SET‑1`.)* | Prevents covert scalarization and keeps acceptance downstream-owned.                |
| **CC‑G2‑HandOff‑1**       | A conforming pack **MUST** emit hand‑off manifests to `G.3`, `G.4`, and `G.5` that cite pack components by id and identify which families/operators are intended for downstream formalisation or registry entry.                                                                                                                                   | Prevents downstream re‑authoring and drift.                                         |
| **CC‑G2‑CoverageGate‑1**  | The pack **MUST** declare `FamilyCoverageFloorK` and enforce it as a harvesting gate. It **MUST** either (i) specify `k` explicitly in an explicit `HarvestPolicyRef`, or (ii) use the pattern‑local default rule owned by `CC‑G2‑CoverageGate‑1`. *Default rule (owner‑local):* `k=3`. If the gate fails, the pack **MUST** (a) record the repair iteration in `FlowRecord`, and (b) broaden the search radius (new venues/corpora/contexts/traditions) rather than silently weakening the gate; if an exploration policy is used for this broadening, it **MUST** be pinned as a policy id/ref. | Makes “coverage floor” explicit and prevents “silent narrowing” under failure.      |
| **CC‑G2‑DistanceGate‑1**  | If a diversity‑by‑distance gate is used, the pack **MUST** pin `DistanceDefRef.edition` and the declared threshold (δ), and treat edits as RSCR‑relevant per `CC‑GCORE‑TRIG‑*` (delegation). If no such gate is used, the pack **SHALL** explicitly state that it is not used.                                                                     | Avoids implicit distance defaults and improves refreshability.                      |
| **CC‑G2‑RSCR‑1**          | A conforming pack **MUST** emit canonical `RSCRTriggerKindId` causes (not free text) for edits to evidence surfaces, name/tokenization surfaces (e.g., UTS proposals/aliases), crossings, planes, edition pins, and harvesting policy pins (`HarvestPolicyRef`), per `CC‑GCORE‑TRIG‑1…TRIG‑4` (delegation).                                                                                      | Keeps refresh reason codes stable and typed.                                        |
| **CC‑G2‑Ext‑GammaEpist‑1** | If `G.2:Ext.GammaEpistSynthesis` is used (i.e., any fusion/substitution is asserted), the pack **SHALL** expose the required pins listed in that extension and **SHALL NOT** redefine `Γ‑fold/Φ/penalty` semantics locally (route via owners by delegation).                                                                                       | Keeps synthesis auditable without creating shadow specs.                            |
| **CC‑G2‑Ext‑HarvestProtocols‑1** | If `G.2:Ext.HarvestProtocols` is used, the pack **SHALL** expose the required pins/criteria ids listed in that extension and **SHALL NOT** redefine evidence/quality semantics outside the declared protocol profile.                                                                                                                            | Keeps protocol variation modular and Phase‑3‑extractable.                           |
| **CC‑G2‑Ext‑DHC‑1**       | If `G.2:Ext.DHCAlignmentHooks` is used, the pack **SHALL** (a) expose the required pins listed in that extension, including `DHCSenseCellId[]`, and (b) declare the unit/constraint pins required by `C.21` (e.g., `bridges_per_100_DHC_SenseCells`, `CL_min=2`) without redefining their semantics locally (semantic owner: `C.21`).                                                             | Keeps DHC wiring auditable and non‑shadowing.                                       |
| **CC‑G2‑Ext‑NQD‑1**       | If `G.2:Ext.NQDAnnex` is used, the pack **SHALL** expose the required pins/editions/policies listed in that extension and **SHALL NOT** redefine QD semantics locally.                                                                                                                                                                             | Keeps QD/OEE wiring replayable and modular.                                         |
| **CC‑G2‑Ext‑Interop‑1**   | If `G.2:Ext.InteropForms` is used, the pack **SHALL** expose the required interop pins and **SHALL NOT** introduce alternative legality/acceptance semantics.                                                                                                                                                                                      | Prevents “foreign gate” shadowing.                                                  |
### Common Anti‑Patterns and How to Avoid Them

* **AP‑G2‑1: “One true SoTA score.”**
  **Avoid:** selecting a single unqualified scalar metric as “the” SoTA.
  **Do instead:** represent evaluation constructs as families/variants; keep partial orders set‑returning (delegated).

* **AP‑G2‑2: Fusion without explicit alignment proof.**
  **Avoid:** merging rival `Tradition` claims into one statement “by common sense.”
  **Do instead:** preserve parallel Claim Sheets; if consolidation is required, publish explicit alignment proof or keep a divergence record.

* **AP‑G2‑3: Hidden protocol drift.**
  **Avoid:** changing the harvesting protocol (inclusion criteria, windowing, screening rubric) without pins.
  **Do instead:** pin harvesting policy/profile ids and treat changes as RSCR‑relevant.

* **AP‑G2‑4: Unanchored pedagogy.**
  **Avoid:** micro‑examples without carriers (they become folklore).
  **Do instead:** bind micro‑examples to A.10 anchors and declare `describedEntity`.
### Consequences

* **Positive:** Downstream CHR/CAL/dispatch work becomes faster and less ambiguous because the pack is citable and structured.
* **Positive:** Plurality is preserved while still enabling disciplined comparability through explicit crossings.
* **Positive:** Refresh becomes tractable because pins and typed causes exist.
* **Negative:** Adds authoring overhead (ledger, flow record, micro‑examples, explicit pins).
* **Negative:** Requires governance discipline to prevent the pack from becoming an uncontrolled “everything bucket”.
### Rationale

SoTA synthesis is a bottleneck for new `CG‑Frame` work: without a disciplined harvest, downstream formalization (CHR/CAL) and operational selection (G.5) either (i) inherit hidden semantic collisions, or (ii) re‑invent incompatible “mini‑standards.”
`G.2` resolves this by treating SoTA work as a **publishable kit**: explicit plurality, explicit crossings, explicit evidence anchors, and explicit hand‑offs.
### SoTA-Echoing (informative)

This pattern aligns its *method options* (via Extensions and authoring practice) with widely used post‑2015 SoTA practices, while keeping FPF’s semantics stable and id‑based:

1. **PRISMA 2020 reporting discipline** (Page et al., 2021)
   *Status:* **Adopt (adapted)** — we adopt the idea of a transparent screening trail as `FlowRecord`, but keep it notation‑independent and concept‑level.

2. **Living systematic reviews** (Elliott et al., 2017 and subsequent living‑review practice)
   *Status:* **Adopt (as optional protocol family)** — the “living” stance is expressed as a harvesting protocol profile (Extension), with explicit freshness windows and RSCR‑relevant change causes.

3. **AMSTAR 2 critical appraisal** (Shea et al., 2017)
   *Status:* **Adapt** — we adapt the idea of structured quality appraisal into Claim Sheet evidence cues, without turning it into a single scalar rating.

4. **Science of Science synthesis** (Fortunato et al., 2018)
   *Status:* **Adopt (as content discipline)** — SoS indicators are treated as families/variants and wired as citable artefacts, not as a single “score”.

5. **Disruption / team‑structure indicators** (Wu, Wang & Evans, 2019 and follow‑on work)
   *Status:* **Adopt (as exemplar family)** — useful as an example of a SoS‑indicator family with strong dependence on windowing and corpus definition.

6. **Quality‑Diversity and open‑ended generation** (e.g., Fontaine et al., 2020 for CMA‑ME; Wang et al., 2019 for POET)
   *Status:* **Adopt (as optional annex wiring)** — when QD/OEE is relevant for the `CG‑Frame`, we include generator/method family cards and pin the required edition/policy surfaces via `G.2:Ext.NQDAnnex`, without embedding those semantics into the core pack.
### Relations

* **Builds on:**

  * `G.Core` (core invariants, typed RSCR causes, default ownership routing)
  * `E.8` (pattern template discipline)
  * `E.10` (lexical/ontological rules; strict distinction; kind‑suffix discipline)
  * `E.19` (conformance discipline)
  * `A.10` (provenance anchors / carriers)
  * `B.3` (trust, freshness/decay as cited owners)
  * `F.9` (bridges and CL as cited owners)
  * `F.17` (UTS publication discipline; via delegation)
  * `G.0` (CG‑Spec legality gate; cited when legality surfaces are referenced)
  * `G.6` (EvidenceGraph / path citation surfaces when used)

* **Used by:**

  * `G.1` (generator chassis consumes harvested SoTA sets)
  * `G.3` (CHR authoring consumes operator/object inventory and claim sheets)
  * `G.4` (CAL authoring consumes operator stubs, acceptance branch scaffolding)
  * `G.5` (registry/dispatch consumes MethodFamily/GeneratorFamily cards)
  * `G.10` (shipping cites the pack as payload)
  * `G.11` (refresh orchestration can re‑invoke harvest via typed causes)

* **Relates to:**

  * `G.13` (interop surfaces when external indices are used)
### G.2:End
## CHR Authoring for a CG‑Frame: Characteristics, Scales, Levels, Coordinates

**Tag.** Architectural pattern (CHR kit; publishes lawful measurement primitives; constrains CAL authoring and selector/dispatch use)
**Stage.** *design‑time* (authoring & publication; enables lawful run‑time consumption by `G.4` / `G.5`)
**Primary output.** `CHR Pack@CG‑Frame` — a notation‑independent, UTS‑published CHR bundle that provides: typed Characteristics/Scales/Levels/Coordinates, legality + guard surfaces, aggregation/comparison specs, RSCR hooks/tests, and provenance pins.
**Primary hooks.** `G.1` (CG‑FrameContext), `G.2` (SoTA synthesis inputs), `A.19.CHR` (CHRMechanismSuite boundary + pins), `A.15.3` (SlotFillingsPlanItem baseline), `A.18/C.16` (MM‑CHR legality), `F.1–F.9` (Contexts/UTS/Bridges), `B.3` / `B.3.4` (trust, freshness/decay), `A.10` (provenance anchors/carriers), `G.6` (EvidenceGraph/Path citation), optional `C.18/C.19` (QD/OEE wiring), `G.11` (refresh orchestration).
**Non‑duplication note.** Universal Part‑G invariants (bridge‑only crossings, tri‑state semantics, penalties→`R_eff`‑only, set‑return semantics, P2W split, typed RSCR triggers + alias docking, single‑owner defaults, linkage discipline) are owned by `G.Core`. This pattern cites them via `G.3:4.1` and delegates where needed.

### Problem frame

A team is defining or evolving a `CG‑Frame` (via `G.1`) and has plural, competing SoTA traditions and constructs (via `G.2`). The team needs a *lawful characterization layer* that makes downstream work possible without hidden semantic drift:

* **CAL authoring (`G.4`)** needs typed, lawful operands and guard/legality surfaces to build admissibility and acceptance rules (thresholds and policy cut‑offs remain CAL‑owned).
* **Selector/dispatch (`G.5`)** needs CHR‑typed quantities and explicit provenance pins so selection can remain set‑returning and auditable under lawful orders.
* **Cross‑context reuse** must be explicit (bridges + loss accounting + pinned policy ids), and refresh must be tractable by typed RSCR causes rather than prose.

The deliverable is a **CHR Pack** that is **CG‑Frame‑scoped**, **notation‑independent**, and **UTS‑published**, with explicit edition/policy pins sufficient for reproducibility and RSCR.
### Problem

Without a disciplined CHR authoring layer, teams repeatedly produce “measurable slots” that are *numerically manipulable but semantically unlawful*:

* **Meaning leaks** across contexts (same token, different referent/sense).
* **Illicit arithmetic** (e.g., averaging ordinals, mixing units, laundering polarity).
* **Hidden normalizations** that silently change scale type, polarity, or admissible transforms.
* **Unreproducible comparisons** (missing edition pins for methods/distances/policies; unclear reference plane).
* **Unscoped reuse** (no explicit bridge/loss notes; unclear `describedEntity` changes).
* **Un-auditable aggregation** (no explicit legality/guard surface; no proof hooks; unclear Γ‑fold ownership).
* **Refresh chaos** (changes in names/editions/policies do not map to typed RSCR causes).
### Forces

| Force                                             | Tension                                                                        |
| ------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Pluralism vs comparability**                    | Preserve tradition‑specific meaning ↔ enable lawful cross‑tradition use.       |
| **Expressiveness vs legality**                    | Model rich measurement semantics ↔ block illegal operations “by construction”. |
| **Portability vs honesty**                        | Encourage reuse ↔ forbid implicit crossings and hidden loss.                   |
| **Ease of authoring vs auditability**             | Keep authoring teachable ↔ require explicit pins, provenance, and tests.       |
| **Downstream flexibility vs upstream discipline** | Let CAL/selector choose policies ↔ keep thresholds/policy cut‑offs out of CHR. |
### Solution — CHR authoring kit and publication surface

#### G.Core linkage (normative)

**Builds on:** `G.Core` (Part‑G core invariants; routing/delegation hub)

**GCoreLinkageManifest (normative; size‑controlled).**

`GCoreLinkageManifest := ⟨
CoreConformanceProfileIds := {
GCoreConformanceProfileId.PartG.AuthoringBase,
GCoreConformanceProfileId.PartG.TriStateGuard,
GCoreConformanceProfileId.PartG.UTSWhenPublicIdsMinted
},
CorePinSetIds := {
GCorePinSetId.PartG.AuthoringMinimal,
GCorePinSetId.PartG.CrossingVisibilityPins
},

// Pins strengthened for CHR authoring (delta over PinSets)
CorePinsRequired := {
// NOTE: `CG-FrameContext`, `describedEntity`, `CNSpecRef.edition`, `CGSpecRef.edition` are already required
// by `GCorePinSetId.PartG.AuthoringMinimal` (cite, don’t restate here).
UTSRowId[],                      // required: CHR terms are public ids (Name Cards + lifecycle)
PathId[]/PathSliceId[],          // required: worked examples/tests and refresh anchoring cite paths
ReferencePlane,                  // required: definitional claims are plane-scoped
Φ/Ψ/Φ_plane policy-ids?,         // iff crossings/plane moves are exercised in examples or imports
ΓFoldRef.edition?                // iff an explicit Γ-fold artefact is pinned (otherwise use DefaultId)
// NOTE: method-/discipline-specific pins (e.g., DescriptorMapRef/DistanceDefRef/DHCMethodRef/InsertionPolicyRef)
// are declared only inside Extensions (e.g., `G.3:Ext.QD_OEE_Wiring`) to keep core linkage universal.
},

// consumed iff any published `CHR.AggregationSpec` relies on default Γ-fold (no explicit override pinned)
DefaultsConsumed := { DefaultId.GammaFoldForR_eff },

RSCRTriggerKindIds := {
RSCRTriggerKindId.EvidenceSurfaceEdit,
RSCRTriggerKindId.TokenizationOrNameChange,
RSCRTriggerKindId.CrossingBundleEdit,
RSCRTriggerKindId.ReferencePlaneEdit,
RSCRTriggerKindId.EditionPinChange,
RSCRTriggerKindId.PolicyPinChange,
RSCRTriggerKindId.DefaultOwnerChange,
RSCRTriggerKindId.FreshnessOrDecayEvent,
RSCRTriggerKindId.LegalitySurfaceEdit,
RSCRTriggerKindId.BaselineBindingEdit
}
⟩`

*(Nil‑elision + expansion rule are per `G.Core:4.2`. This pattern does not redefine the semantics of core conformance ids, trigger kinds, or defaults; it only declares applicability and required pins.)*
#### Output surface: CHR Pack@CG‑Frame (normative)

`CHR Pack@CG‑Frame` is the CHR kit payload that downstream patterns cite and pin (it is not a “shadow spec” for CN/CG).

**Minimum exported objects (kit surface):**

* `CHR.Characteristic[]`
* `CHR.Scale[]`
* `CHR.Level[]` *(when the scale type requires explicit level sets / order structure)*
* `CHR.Coordinate[]` *(encodings + legality annotations; never an implicit “upgrade” of measurement structure)*
* `CHR.Guards` *(guard macro surface; semantics routed to owners; see `G.Core` + `A.18`)*
* `CHR.LegalityMatrix` *(admissible operations per scale type / unit / polarity regimes)*
* `CHR.AggregationSpecs` *(typed aggregators/comparators + proof hooks + edition pins where applicable)*
* `UTS` publication bundle: Name Cards (twin labels), lifecycle notes, and (when applicable) bridge/loss notes
* RSCR artefacts: `RSCRTestId[]` + worked examples + provenance pins (ReferencePlane, Path/PathSlice, policy ids)

**Mandatory provenance pins (conceptual, notation‑independent):**

* `ReferencePlane`
* `PathId/PathSliceId` citations for worked examples/tests
* R‑anchors (conceptual; KD‑CAL lanes when used) realised via `PathId/PathSliceId` and, where applicable, `A.10` anchor/carrier refs
* policy pins used by crossings or plane moves (when exercised)
* edition pins for any referenced method or metric definitions that affect interpretation
#### Authoring workflow: CHR authoring chassis (S1–S8)

**S1 — Charter the measurement scope (scope anchor).**
Declare the CHR home context/scope for the CG‑Frame, including: `describedEntity` boundaries, `ReferencePlane`, freshness/decay expectations, and the list of contested terms likely to require bridging. Output a design‑time `MeasurementCharter` and `KindMap@Context`.
If freshness/decay expectations are anything beyond an explicit “non‑decaying” declaration, wire them via
`G.3:Ext.DecayWiring` (semantic owner: `B.3.4`) rather than encoding decay semantics in CHR prose.
If assurance‑subtype lane tags are used (e.g., TA/VA/LA), declare the lane regime here so downstream evidence discipline can remain lane‑pure (taxonomy/semantics owned by `B.3`; evidence‑path representation & audit owned by `G.6`; this pattern only records wiring).
**Lane docking (wiring‑only; normative).**
If `EvidenceLanes` are used, the charter MUST:
* enumerate the lane tags used (e.g., TA/VA/LA) and cite their semantic owner taxonomy (owner: `B.3`), plus the upstream provenance for their use when available (e.g., `SoTAPaletteDescriptionId` via `G.3:Ext.SoTAPackInputs`);
* expose any lane‑dependent tolerances / proof requirements via explicit pins (policy‑id and/or edition‑pinned refs), not prose;
* treat lane tags as provenance metadata (not Contexts): they MUST NOT be “bridged away” or silently mixed;
* if any cross‑lane comparison/aggregation is claimed, it MUST be explicit and pinned to the owning acceptance/evidence policy (typically `G.4`) and auditable via evidence paths (`G.6`); otherwise downstream consumers treat it as illegal.
*Crossing semantics and penalty routing are cited via `G.Core` (do not restate).*

**S2 — Mint or reuse terms (UTS‑first).**
For each candidate characteristic/scale/level/coordinate term: attempt reuse; otherwise mint via UTS Name Cards with twin labels and lifecycle notes. When a term is imported across contexts, the import must be explicit and auditable (bridge/loss notes live with the crossing artefacts; CHR only cites them).

**S3 — Define `CharacteristicCard` (the CHR unit of meaning).**
A CharacteristicCard is the minimum unit CHR publishes for downstream legality. It SHOULD include (field names are indicative; semantics routed to owners):

`CharacteristicCard := ⟨
  UTSRowId,
  Context,
  ReferencePlane,
  ObjectKind,
  Intent,
  Definition (typed),
  ObservableOf := ⟨instrument/protocol (A.10 anchors/carriers), uncertainty model, validity window⟩,
  EvidenceLanes? (KD‑CAL lanes; wiring only; semantics owned by `G.4` / `G.6`),
  ScaleRef,
  Polarity ∈ {↑, ↓, ⊥},
  Domain/Range,
  UnitSet,
  Bounds / zero semantics (as applicable),
  Freshness / half‑life (or explicit `NonDecayingDecl`; freshness/decay semantics owned by `B.3.4`),
  Missingness semantics (typed; include a classification/mapping when non‑trivial; downstream tri‑state handling is per G.Core),
  Stability/Reliability notes,
  RoleDecls? := RoleDecl[] (wiring‑only; each role declaration names its semantic owner + required pins; see `G.3:4.5`),
  QD.Role? ∈ {Q, D, QD-score} (interop alias for `RoleDecl` with `SemanticOwnerPatternId = C.18`; see `G.3:Ext.QD_OEE_Wiring`),
  Micro‑examples (R‑anchors: Path/PathSlice cited; lane tags where applicable)
⟩`

Where `RoleDecl := ⟨ roleLabel, SemanticOwnerPatternId, EditionPins?, PolicyPins? ⟩` (wiring‑only; semantics owned by `SemanticOwnerPatternId`).

Rules (CHR‑owned intent, semantics routed where indicated):

* Scale/unit/polarity legality obligations are **routed** to MM‑CHR owners (`A.18/C.16`) and must be *checkable* by downstream patterns.
* Missingness must be typed so downstream can apply tri‑state outcomes without silent coercion (tri‑state semantics are owned by `G.Core`).
* If `EvidenceLanes` are recorded, they are only lane tags for downstream evidence discipline (taxonomy owner: `B.3`; audit surface: `G.6`; any cross‑lane policy is owned by `G.4`); this pattern does not introduce lane semantics or invent bridge‑like constructs.
* If `RoleDecls` are used, each declaration MUST cite its semantic owner pattern (e.g., `C.18/C.19`) and surface the edition/policy pins required by that owner; CHR does not define role semantics locally.
* **Role docking (normative, wiring-only):** if any `RoleDecl` is present with `SemanticOwnerPatternId = X`,
  then `G.3` MUST include (or explicitly cite) a corresponding `GPatternExtension` block whose owner is `X`
  (or whose `Uses` includes `X`) and that surfaces the required pins for that role family. Otherwise the role
  declaration is non-conformant (it is an undocked semantic fragment).
* **Freshness docking (normative, wiring-only):** if a characteristic’s freshness/half-life is defined via a named
  decay model/policy (rather than a pure local statement), the relevant policy/ref MUST be pinned and routed to `B.3.4`
  via `G.3:Ext.DecayWiring`.
* If a characteristic is intended to be *promoted into* `CG‑Spec`, the linkage is explicit and edition‑pinned (wiring lives in an Extension; semantics owned by `G.0`).

**S4 — Define `ScaleCard` and `LevelCard` (lawful measurement).**
Publish the scale type and admissible transforms, plus levels/orders when applicable. CHR does not invent new legality semantics; it cites MM‑CHR owners and makes the legality surface concrete for the frame’s characteristics.

Typical distinctions that must be representable:

* **Nominal / categorical:** equality + counting; transforms are permutations.
* **Ordinal:** order‑preserving transforms; no arithmetic that presupposes intervals.
* **Interval:** affine transforms; differences meaningful; means may be lawful if justified.
* **Ratio:** positive scalar transforms; ratios meaningful; products/sums subject to unit discipline.
* **Count / rates:** explicit exposure/timebase requirements; rate conversions must be explicit.
* **Cyclic:** wrap‑around discipline + principal interval declaration.

**S5 — Define `CoordinatePolicy` (encodings without hidden cardinalization).**
When a numeric coordinate/embedding is used for convenience or tooling, CHR MUST publish:

* what invariants are preserved (order only / ratios / topology / wrap‑around),
* what remains illegal,
* what proof hooks are required if a stronger structure is claimed.

A coordinate never silently upgrades a scale type; if an upgrade is claimed, the proof burden is explicit and routed to MM‑CHR owners.

**S6 — Publish legality + guard surfaces (Guard Macros + LegalityMatrix).**
CHR publishes a `CHR.LegalityMatrix` and a `CHR.Guards` surface that downstream operators can reference.

Guard macro names are allowed as authoring ergonomics, but their semantics MUST be routed (no “shadow semantics” in this pattern). Examples of macro intents (owners in parentheses):

* `CSLC_PROOF_REQUIRED(x)` (MM‑CHR legality owners: `A.18/C.16`)
* `UNKNOWN_TRI_STATE(x)` (tri‑state semantics owner: `G.Core`)
* `UNIT_CHECK(x)` (MM‑CHR legality owners)
* `RETURN_SET_FOR_PARTIAL_ORDERS()` (set‑return semantics owner: `G.Core`)
* `METRIC_EDITION_REF(...)` (edition‑pin discipline owner: `G.Core`; metric semantics owner: `C.18`/`C.21` as applicable)

**S7 — Publish `AggregationSpecs` (typed, lawful, reproducible).**
CHR may publish typed aggregation/comparison specs that are *safe by construction* and usable as building blocks by `G.4` and `G.5`. For any published spec:

* The legality regime is explicit (scale/unit/polarity constraints + required proof hooks).
* If a contributor folding policy (Γ‑fold) is used and not explicitly overridden, it is referenced via `DefaultId.GammaFoldForR_eff` (single‑owner routing is via `G.Core.DefaultOwnershipIndex`; do not restate defaults here).
* If method‑role declarations imply metric‑driven comparisons (e.g., QD roles), the relevant edition/policy pins are surfaced (wiring lives in an Extension; semantics owned by the referenced patterns).

**S8 — Publish, test, and evolve (UTS + RSCR readiness).**
Publish the CHR pack and associated Name Cards to UTS. Attach:

* RSCR tests that check legality/guard coverage and reject illegal ops,
* worked examples with Path/PathSlice provenance,
* refresh/decay notes and deprecations with lexical continuity.

This step prepares the RSCR loop but does not own orchestration (owner: `G.11`).
#### Interfaces (normative)

| Interface                           | Consumes                                          | Produces                                                         |
| ----------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------- |
| **G.3‑1 Charter_CHR**               | `CG‑FrameContext` (`G.1`), SoTA inputs (`G.2`)    | `MeasurementCharter`, `KindMap@Context`                          |
| **G.3‑2 MintOrReuse_Terms**         | candidate terms + UTS registry                    | Name Cards + UTS ids for `Characteristic/Scale/Level/Coordinate` |
| **G.3‑3 Define_Characteristic**     | `MeasurementCharter`, candidate semantics         | `CHR.Characteristic[]` (CharacteristicCards)                     |
| **G.3‑4 Define_ScaleLevel**         | CharacteristicCard + MM‑CHR rules                 | `CHR.Scale[]`, `CHR.Level[]`                                     |
| **G.3‑5 Define_CoordinatePolicy**   | Scale/Level + use‑case constraints                | `CHR.Coordinate[]` + legality annotations                        |
| **G.3‑6 Publish_GuardsAndLegality** | Scale/Level/Coordinate set                        | `CHR.Guards`, `CHR.LegalityMatrix`                               |
| **G.3‑7 Publish_AggregationSpecs**  | CHR set + legality hooks + (optional) metric refs | `CHR.AggregationSpecs` (+ proofs/refs + pins)                    |
| **G.3‑8 Publish_CHRPack**           | all CHR artefacts + tests/examples                | `CHR Pack@CG‑Frame` + UTS rows + RSCR tests                      |
#### Extensions (pattern‑scoped; non‑core)

All blocks below are `GPatternExtension` modules (PatternScopeId‑scoped; **not** new PatternIds). They store wiring only and cite semantic owners.

**GPatternExtension: SuiteBoundaryLinkage**

* **PatternScopeId:** `G.3:Ext.SuiteBoundaryLinkage`
* **GPatternExtensionId:** `SuiteBoundaryLinkage`
* **GPatternExtensionKind:** `InteropSpecific`
* **SemanticOwnerPatternId:** `A.19.CHR`
* **Uses:** `{A.19.CHR, A.15.3}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum):**

  * `CHRMechanismSuiteDescriptionRef.edition?` *(when the suite description is cited as a reproducibility baseline)*
  * `CHRMechanismSuiteSlotFillingsPlanItem` refs *(when planned baseline binds CHR artefacts into WorkPlanning)*
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.BaselineBindingEdit, RSCRTriggerKindId.EditionPinChange}`
* **Notes (wiring‑only):** This module binds CHR authoring outputs to the P2W seam (`SlotFillingsPlanItem`); suite semantics and membership are owned by `A.19.CHR`.

**GPatternExtension: SoTAPackInputs**

* **PatternScopeId:** `G.3:Ext.SoTAPackInputs`
* **GPatternExtensionId:** `SoTAPackInputs`
* **GPatternExtensionKind:** `DisciplineSpecific`
* **SemanticOwnerPatternId:** `G.2`
* **Uses:** `{G.2}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum):**

  * `ClaimSheetId[]` / operator & object inventory refs (as cited inputs)
  * `SoTAPaletteDescriptionId?` (when palette/traces are cited; used to dock contested‑term inventory and (if present) lane tags/tolerances)
  * `BridgeMatrixId?` (when terms/constructs are imported across traditions)
  * `UTSRowId[]` drafts/aliases from synthesis
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.EvidenceSurfaceEdit, RSCRTriggerKindId.TokenizationOrNameChange, RSCRTriggerKindId.CrossingBundleEdit}`
* **Notes (wiring‑only):** SoTA pluralism inputs are owned by `G.2`; this module only specifies which synthesis artefacts are cited while authoring CHR.

**GPatternExtension: CGSpecPromotionWiring**

* **PatternScopeId:** `G.3:Ext.CGSpecPromotionWiring`
* **GPatternExtensionId:** `CGSpecPromotionWiring`
* **GPatternExtensionKind:** `InteropSpecific`
* **SemanticOwnerPatternId:** `G.0`
* **Uses:** `{G.0}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum):**

  * `CGSpecRef.edition` *(when a characteristic is promoted/linked into `CG‑Spec`)*
  * `CHR.Characteristic.id` pointers included in `CG‑Spec.Characteristics := [...]` *(no shadow ids; CG‑Spec stores pointers, see `G.0`)*
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.LegalitySurfaceEdit, RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange}`
* **Notes (wiring‑only):** Promotion semantics and legality gate ownership stay with `G.0`; CHR only pins and cites.

**GPatternExtension: MMCHRLegalityWiring**

* **PatternScopeId:** `G.3:Ext.MMCHRLegalityWiring`
* **GPatternExtensionId:** `MMCHRLegalityWiring`
* **GPatternExtensionKind:** `DisciplineSpecific`
* **SemanticOwnerPatternId:** `A.18`
* **Uses:** `{A.17, A.18, C.16}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum):**

  * CSLC legality proof anchors/carriers (ids/refs as defined by MM‑CHR owners; cite `A.18/C.16`)
  * Unit coherence references (where units exist)
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.LegalitySurfaceEdit, RSCRTriggerKindId.ReferencePlaneEdit}`
* **Notes (wiring‑only):** This module wires CHR artefacts to MM‑CHR legality proof obligations; legality semantics are owned by the referenced patterns.

**GPatternExtension: DecayWiring**

* **PatternScopeId:** `G.3:Ext.DecayWiring`
* **GPatternExtensionId:** `DecayWiring`
* **GPatternExtensionKind:** `DisciplineSpecific`
* **SemanticOwnerPatternId:** `B.3.4` *(freshness/decay semantics)*
* **Uses:** `{B.3.4, G.6}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum):**

  * `FreshnessWindowDeclRef` *(or equivalent window pin, as defined by the owner)*
  * `DecayPolicyIdRef?` *(policy-bound; if decay model is referenced by id)*
  * `PathSliceId[]` *(affected evidence carriers / examples that witness drift)*
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.FreshnessOrDecayEvent, RSCRTriggerKindId.EvidenceSurfaceEdit, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.BaselineBindingEdit}`
* **Notes (wiring‑only):** CHR does not define decay semantics; it only pins the owner-defined window/policy and ensures refresh can be triggered on decay events.

**GPatternExtension: QD_OEE_Wiring**

* **PatternScopeId:** `G.3:Ext.QD_OEE_Wiring`
* **GPatternExtensionId:** `QD_OEE_Wiring`
* **GPatternExtensionKind:** `MethodSpecific`
* **SemanticOwnerPatternId:** `C.18`
* **Uses:** `{C.18, C.19}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum):**

  * `DescriptorMapRef.edition` *(if any Characteristic declares descriptor roles)*
  * `DistanceDefRef.edition` *(if any Characteristic declares distance roles)*
  * `DHCMethodRef.edition` *(if any Characteristic is used as Q / QD-score)*
  * `InsertionPolicyRef?` *(when archive insertion semantics are declared for reproducibility)*
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.FreshnessOrDecayEvent}`
* **Notes (wiring‑only):** QD/OEE semantics are owned by `C.18/C.19`. CHR only surfaces method‑role declarations
  (via `RoleDecls` or the interop alias `QD.Role`) and the edition/policy pins required for reproducible archive/front interpretation.
### Archetypal Grounding

**AG‑1 — ML fairness auditing (post‑2015 selective and set‑valued practice).**
*System:* a CG‑Frame for evaluating deployed classifiers across cohorts with explicit abstention/defer behavior.
*CHR authoring:* publish `DemographicParityGap` and `EqualizedOddsGap` as Characteristics with:

* explicit ReferencePlane (deployment population + sampling regime),
* `ObservableOf` (audit protocol + uncertainty model + window),
* interval scale (bounded; zero semantics explicit),
* missingness semantics (cohort sparsity and label noise are typed),
* legality/guard surfaces that forbid illicit cohort mixing and require explicit proof hooks for aggregation across cohorts.

*Downstream:* CAL acceptance binds thresholds and failure behavior; selector remains set‑returning under partial orders and may treat “defer/abstain” as a first‑class outcome (tri‑state semantics routed via `G.Core`).

**AG‑2 — Clinical diagnostics (post‑2015 evidence‑aware evaluation).**
*System:* a CG‑Frame for comparing diagnostic pipelines under evolving datasets and protocols.
*CHR authoring:* publish `Sensitivity` and `Specificity` as ratio‑scale, dimensionless Characteristics on `[0,1]`, with:

* explicit `ObservableOf` (trial protocol, inclusion criteria, uncertainty model),
* freshness/decay expectations (protocol drift is modelled as decay),
* legality surfaces that forbid averaging incompatible ordinal labels (e.g., severity grades) and require explicit unit/exposure constraints for any derived rate.

*Downstream:* CAL acceptance owns thresholds and guard‑bands; evidence wiring is cited via Path/PathSlice to make refresh triggers actionable.

**AG‑3 — Quality‑Diversity / Illumination (post‑2015 MAP‑Elites/CMA‑ME lineage).**
*System:* a CG‑Frame where selection returns archives/fronts rather than a single winner.
*CHR authoring:* declare which Characteristics play Q/D/QD‑score roles and pin the metric definitions (descriptor map, distance definition, method editions) so archives are reproducible across runs and refresh can be triggered on edition changes. CHR does not scalarize partial orders; set‑return semantics are routed via `G.Core`.
### Bias‑Annotation

CHR authoring is where many biases become “baked in” as measurement choices. Typical risks:

* **Proxy bias:** a convenient observable substitutes for the intended construct. Mitigation: require `ObservableOf` + ReferencePlane + micro‑examples; force explicit “what is being measured” rather than relying on labels.
* **Population and protocol shift:** a characteristic’s meaning changes when the sampling regime or protocol changes. Mitigation: explicit validity windows and freshness/decay expectations; edition pins for protocol definitions; RSCR triggers on freshness/decay events and evidence surface edits.
* **Ordinal misuse bias:** ordinal ratings treated as interval/ratio by convenience. Mitigation: publish scale type + admissible transforms; legality matrix + guard macros; reject coordinate upgrades without proof hooks.
* **Cross‑tradition/cross‑context bias:** imported terms erase local meaning. Mitigation: require explicit imports and loss notes; downstream penalties route to `R_eff` only (routed via `G.Core`), making loss visible rather than silently altering F/G semantics.
* **Metric gaming bias (QD and evaluation):** changing descriptors/distances changes what “diverse” means. Mitigation: edition‑pin metric definitions and make role declarations explicit (wiring via `C.18/C.19`).
### Conformance Checklist (normative)

| ConformanceId     | Statement                                                                                                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CC‑G3‑CoreRef** | `G.3` is conformant only if the applicable `G.Core` obligations declared in `G.3:4.1` are satisfied (effective expansion of profiles/sets + deltas; explicit pins; typed RSCR triggers; single‑owner defaults).                       |
| CC‑G3‑01          | `CHR Pack@CG‑Frame` is published as a notation‑independent kit payload with the minimum exported objects listed in `G.3:4.2`.                                                                                                         |
| CC‑G3‑02          | Every `CHR.Characteristic` has an explicit home `Context`, an explicit `ReferencePlane`, and a filled `ObservableOf` field (instrument/protocol + uncertainty model + validity window).                                               |
| CC‑G3‑03          | Every `CHR.Characteristic` declares its `ScaleRef`, `Polarity`, and `UnitSet` (or an explicit “unitless” declaration), plus bounds/zero semantics where applicable.                                                                   |
| CC‑G3‑04          | Missingness is typed in the CHR artefacts such that downstream tri‑state handling is possible without silent coercion. *(Tri‑state semantics are owned by `G.Core`; the typing obligation is CHR‑local.)*                              |
| CC‑G3‑05          | `CHR.Scale` / `CHR.Level` artefacts encode the scale type and admissible transforms, and make illicit arithmetic checkable by downstream consumers.                                                                                   |
| CC‑G3‑06          | Any published `CHR.Coordinate` includes a `CoordinatePolicy` that states preserved invariants and explicit non‑entitlements; coordinates do not silently upgrade measurement structure.                                               |
| CC‑G3‑07          | `CHR.LegalityMatrix` and `CHR.Guards` exist and are referenced by downstream operator authoring; semantics are routed to owners (MM‑CHR and `G.Core`), not duplicated locally.                                                        |
| CC‑G3‑08          | `CHR.AggregationSpecs` are typed and legality‑constrained; where Γ‑fold is required and no explicit override is pinned, it is referenced via `DefaultId.GammaFoldForR_eff` (single‑owner routing via `G.Core.DefaultOwnershipIndex`). |
| CC‑G3‑09          | If any characteristic is intended for promotion into `CG‑Spec`, the linkage is explicit and edition‑pinned (no shadow ids). *(Owner: `G.0`; wiring via `G.3:Ext.CGSpecPromotionWiring`.)*                                             |
| CC‑G3‑10          | UTS Name Cards exist for public ids minted/evolved by the CHR pack (twin labels + lifecycle notes). *(Delegation target: `CC‑GCORE‑UTS‑1` via `CC‑G3‑CoreRef`.)*                                                                      |
| CC‑G3‑11          | Worked examples and RSCR tests exist and cite `PathId/PathSliceId`; they cover illegal‑op refusal, unit/scale constraints, polarity invariants, and coordinate non‑entitlements.                                                      |
| CC‑G3‑12          | Thresholds/guard‑bands are not embedded in CHR artefacts; they remain owned by CAL acceptance clauses (`G.4`).                                                                                                                        |
| CC‑G3‑13          | When method‑role declarations are present (via `RoleDecls` and/or `QD.Role` alias), each declaration is **docked** to its semantic owner via a corresponding `G.3:Ext.*` module, and the owner-required edition/policy pins are surfaced to make downstream interpretation reproducible. *(QD/OEE owner: `C.18/C.19`; wiring via `G.3:Ext.QD_OEE_Wiring`.)* |
| CC‑G3‑14          | **Evidence wired.** Each `CHR.Characteristic` links to R‑anchors via `PathId/PathSliceId` (and, where applicable, `A.10` anchor/carrier refs), so downstream evidence discipline (`G.6`) can audit legality/guard claims.            |
| CC‑G3‑15          | An `Archetypal Grounding` section exists with at least two domain‑distinct examples that demonstrate lawful CHR typing/legality and the CHR↔CAL separation (notably: no thresholds in CHR).                                          |
| CC‑G3‑16          | If `EvidenceLanes` are used, lane tags are declared with a citation to their semantic owner taxonomy (`B.3`), and any lane‑dependent tolerances/proof requirements are explicitly pinned (policy‑id / edition refs). Cross‑lane comparison/aggregation is **illegal by default** unless an explicit owner policy makes it lawful (typically `G.4`), and it must be auditable via evidence paths (`G.6`). |
| CC‑G3‑17          | If the CHR outputs are bound into the planned baseline / suite seam, the binding uses `CHRMechanismSuiteSlotFillingsPlanItem` as defined in `A.19.CHR` + `A.15.3` (no local baseline variants; wiring via `G.3:Ext.SuiteBoundaryLinkage`). |
| CC‑G3‑18          | **Freshness is explicit.** Each `CHR.Characteristic` declares a validity window and either (i) an explicit `NonDecayingDecl` or (ii) a freshness/half‑life statement that is pinned/routed to the semantic owner (`B.3.4`) when policy‑bound (`G.3:Ext.DecayWiring`). Changes in decay windows/policies participate in RSCR via canonical trigger kinds declared in `G.3:4.1`. |
### Common Anti‑Patterns and How to Avoid Them

* **Hidden cardinalization.** Don’t treat ordinal encodings as interval/ratio; do publish coordinate policies that explicitly preserve order‑only invariants and forbid arithmetic upgrades.
* **Unit laundering.** Don’t add or average quantities with incompatible units; do force explicit unit discipline and legality checks via MM‑CHR owners.
* **Polarity drift.** Don’t rely on “higher is better” implicitly; do publish polarity explicitly and make downstream use auditable.
* **Threshold leakage into CHR.** Don’t embed policy cut‑offs in CHR; do keep thresholds in CAL acceptance artefacts.
* **Unpinned semantics.** Don’t cite “the metric” or “the distance” without edition pins; do require edition‑pinned references when semantics affect interpretation.
* **Unscoped reuse.** Don’t reuse CHR terms across contexts without explicit import and loss notes; do keep crossings explicit and auditable (routed via `G.Core`).
### Consequences

* **Legality becomes checkable.** Downstream patterns can reject illegal operations and rely on explicit legality surfaces rather than implicit conventions.
* **Comparability without semantic flattening.** Plural traditions remain representable because CHR preserves local meaning while making lawful relations explicit.
* **Reproducible downstream behavior.** Edition/policy pins make “why did this change?” answerable and RSCR actionable.
* **Authoring overhead.** The pattern shifts effort to up‑front authoring: explicit cards, pins, and tests are non‑optional when CHR becomes a public kit surface.
### Rationale

CHR is the point where “numbers start moving” *only if* measurement semantics are stable enough to support lawful downstream reasoning. By making scale/unit/polarity explicit, publishing legality and guard surfaces, and requiring provenance pins, CHR authoring prevents downstream mechanisms from silently inventing their own legality assumptions.

Separating core invariants into `G.Core` prevents drift and ensures Part‑G‑wide properties (tri‑state, penalty routing, set‑return semantics, RSCR typing, default ownership) are single‑owner, while CHR remains responsible for CHR‑specific kit surfaces.
### SoTA‑Echoing

This pattern aligns with post‑2015 best practice by:

* treating abstention/defer and set‑valued outcomes as first‑class design objects (consistent with modern selective prediction and set‑valued reporting practice),
* keeping multiobjective and archive‑based reasoning set‑returning rather than silently scalarizing (consistent with QD/illumination and open‑ended evaluation practice after 2015),
* making evaluation semantics reproducible through explicit edition/policy pinning (aligned with the modern emphasis on reproducibility and “specifying the evaluation surface” rather than only reporting metrics),
* modularizing method‑family specifics (QD/OEE, explore‑exploit) via explicit wiring and ownership rather than embedding method semantics into universal measurement legality.
### Relations

**Builds on:** `G.Core`, `G.1`, `G.2`, `G.6` (EvidenceGraph / Path citation), `A.19.CHR`, `A.15.3`, `A.17–A.18/C.16` (MM‑CHR), `F.1–F.9` (Contexts/UTS/Bridges), `B.3` / `B.3.4`, `A.10`, `E.10`, `E.5.1–E.5.3`.
**Uses (via Extensions):** `G.0` (promotion/linkage to `CG‑Spec`), optional `C.18/C.19` (QD/OEE wiring).
**Publishes to:** `G.4` (admissible operators + legality/guard macros + freshness routing), `G.5` (role declarations + pins for reproducibility), `UTS` (Name Cards + lifecycle), RSCR tests/hooks.
**Constrains:** any CAL/LOG/selector usage that consumes CHR (must treat CHR artefacts as typed/legal surfaces, not as prose hints).
### G.3:End
## CAL Authoring for a CG-Frame: Operators, Acceptance Clauses, Evidence Wiring

**Tag.** Architectural pattern (publishes `CAL Pack@CG-Frame`; consumes `CHR Pack@CG-Frame`; constrains selector/dispatcher usage; binds GateCrossing discipline; exposes `ReferencePlane` and penalty/guard policy pins to `SCR`)

**Stage.** design‑time (authoring & publication; enables lawful run‑time evaluation)

**Primary output.** A notation‑independent `CAL Pack@CG-Frame` containing:
`CAL.Charter@Context`, `CAL.Operator[]`, `CAL.Acceptance[]`, `CAL.Flow[]`,
`CAL.EvidenceProfiles`, `CAL.ProofLedger`, **optional** `CAL.NQD[]` (when declared),
UTS entries (Name Cards + twin labels + lifecycle notes incl. deprecations and lexical‑continuity notes),
RSCR tests, Worked‑Examples, and a `TaskMap@Context` (`TaskMap`; handoff surface consumed by `G.5`).

**Primary hooks.** `G.Core` (Part‑G invariants + RSCR trigger catalogue + default ownership index), `G.1` (CG‑FrameContext), `G.2` (SoTA Synthesis Pack), `G.3` (CHR Pack), `G.0` (CG‑Spec legality gate), `A.19` (CN‑Spec), `A.18` (CSLC), `A.10` (provenance anchors), `B.3` (trust / freshness / decay), `E.18` + `A.21` + `A.27` (GateCrossing / CrossingBundle harnesses), `F.9` (BridgeCard / CL), `G.6` (EvidenceGraph / PathId / PathSliceId; wired via Extensions), `G.5` (Selector & Dispatch), `G.10` (shipping), `G.11` (refresh orchestration), plus Contexts/UTS/LEX disciplines already fixed elsewhere in the spec.

**Non‑duplication note.** Universal Part‑G invariants (no shadow specs, crossing visibility, tri‑state guard, penalties→`R_eff`‑only, set‑return semantics, P2W split, typed RSCR causes, default ownership discipline, shipping boundary) are single‑owned by `G.Core` and are pulled into `G.4` only through the `G.Core linkage` manifest in **G.4:4.1** (and via explicit delegations in CC).

### Problem frame

A CG‑Frame has:

* a declared `CG-FrameContext` (scope, described entity, plane),
* a plurality of method traditions and claims (SoTA inputs), and
* CHR‑typed measurement surfaces (`Characteristic/Scale/Coordinate` + legality guard macros).

Before any run‑time selection, comparison, aggregation, or portfolio formation is executed downstream, the CG‑Frame needs an explicit, auditable **calculus layer (CAL)** that:

1. defines *what operators exist* and what they are allowed to do over CHR types,
2. externalizes *fit‑for‑purpose acceptance* as typed predicates (with Context‑local thresholds), and
3. binds these choices to an evidence wiring surface (lanes, provenance anchors, policy pins, and refresh triggers) so that downstream selection, logging, parity, and shipping can cite *stable ids* rather than re‑inventing semantics.

This pattern provides the design‑time authoring kit and the publication surface for CAL artifacts, while delegating Part‑G‑wide invariants to `G.Core` and contract legality to `CG‑Spec`/`CN‑Spec`.
### Problem

Teams repeatedly face drift and ambiguity in the calculus layer that sits between “typed measurements exist” and “a selector/dispatcher runs”:

* **Illicit operations** slip in (implicit cardinalization, unit laundering, ordinal arithmetic).
* **Acceptance is scattered** (thresholds embedded in code or in CHR prose; predicates not typed; unknown handling inconsistent).
* **Evidence wiring is underspecified** (which provenance anchors matter, what policy ids are in force, what is plane‑scoped, what changes must trigger refresh).
* **Cross‑context imports are silent** (hidden reuse of constructs across contexts/planes/editions without published GateCrossings and loss accounting).
* **Tooling artifacts become semantics** (vendor flags or implementation details substitute for a conceptual contract).
### Forces

* **Expressiveness vs legality.** CAL must allow useful comparisons/aggregations while staying lawful under CHR typing and legality gates.
* **Pluralism vs comparability.** Multiple method traditions must coexist without forcing premature unification, yet remain cross‑citable and auditable.
* **Decision support vs auditability.** CAL must support selection and portfolio formation while preserving explicit, reviewable assumptions and proofs.
* **Exploration vs assurance.** CAL must support exploratory regimes (probing, novelty, open‑ended search) without letting un‑assured outputs silently become dominance claims.
* **Locality vs portability.** CAL must be Context‑local by default but prepared for explicit reuse via Bridges and published crossing bundles.
### Solution — CAL authoring kit and publication surface

#### G.Core linkage (normative)

**Builds on:** `G.Core` (Part‑G core invariants; routing/delegation hub)

**GCoreLinkageManifest (normative).** Canonical shape, Nil‑elision, and the Expansion rule are defined in `G.Core`.

`GCoreLinkageManifest := ⟨
CoreConformanceProfileIds := {
GCoreConformanceProfileId.PartG.AuthoringBase,
GCoreConformanceProfileId.PartG.TriStateGuard,
GCoreConformanceProfileId.PartG.UTSWhenPublicIdsMinted,
GCoreConformanceProfileId.PartG.ShippingBoundary
},

CorePinSetIds := {
GCorePinSetId.PartG.AuthoringMinimal,
GCorePinSetId.PartG.CrossingVisibilityPins
},

CorePinsRequired := {
UTSRowId[],                 // CAL artefacts are public ids (Name Cards + lifecycle notes)
ΓFoldRef.edition?            // only when an explicit Γ‑fold override is pinned (otherwise use DefaultId)
},

// consumed iff no explicit `ΓFoldRef.edition` override is pinned
DefaultsConsumed := { DefaultId.GammaFoldForR_eff },

RSCRTriggerSetIds := { GCoreTriggerSetId.SoTAHarvestSynthesis },
RSCRTriggerKindIds := {      // deltas (Expansion rule applies)
  RSCRTriggerKindId.PenaltyPolicyEdit,
  RSCRTriggerKindId.DefaultOwnerChange,
  RSCRTriggerKindId.BaselineBindingEdit
}
⟩`

By the `G.Core` Expansion rule, the effective conformance ids / trigger kinds / pin obligations for `G.4` are the expansions of the referenced profiles/sets/pin‑sets plus the explicit deltas above.

Notes (normative intent, routed semantics):

* The semantics of tri‑state outcomes, penalty routing, set‑return discipline, crossing visibility, P2W split, typed RSCR causes, and default ownership are single‑owned by `G.Core` and are not redefined here.
* EvidenceGraph/Path pins (when used) are declared only via **`G.4:Ext.EvidenceGraphWiring`** in **G.4:4.5** (so `G.Core linkage` stays minimal and does not “pull in” `G.6` by default).
* Method‑specific pins (e.g., QD descriptor/distance/insert policy pins; open‑ended transfer rules pins) MUST appear only in **Extensions** blocks (see **G.4:4.5**) and MUST NOT introduce competing defaults.
#### CAL Pack@CG-Frame surface (pattern‑owned kit)

`CAL Pack@CG-Frame` is the CG‑Frame’s published calculus layer. Minimally, it provides:

* `CAL.Charter@Context` — scope anchor for this CAL pack:

  * cites `CG-FrameContext`, `describedEntity`, `ReferencePlane`,
  * cites the governance card and legality gate (`CNSpecRef`, `CGSpecRef`) by edition pins,
  * records the “assumption envelope” that acceptance predicates rely on (without minting a new governance card or legality gate).
  * emits `TaskMap@Context` (`TaskMap`) as the canonical handoff surface to `G.5` (task→gates/flows/evidence pins).
* `CAL.Operator[]` — typed operator cards (UTS‑published):

  * explicit signature over CHR types,
  * explicit preconditions/postconditions (incl. legality guard macros references),
  * explicit provenance/evidence hooks (by ids/pins, not by tool behavior).
* `CAL.Acceptance[]` — typed predicates with Context‑local thresholds:

  * binds to CHR characteristic ids (and, when inducing numeric comparison/aggregation, to `CG‑Spec.characteristic` ids),
  * exposes unknown handling and failure behavior via policy pins.
* `CAL.Flow[]` — legality‑checked compositions of operator cards:

  * declares result kind (scalar only when lawful; set/portfolio when partial orders remain partial orders),
  * records which acceptance clauses gate which flows.
* `CAL.EvidenceProfiles` — evidence wiring surface:

  * lane tags (`F/G/R`) / provenance anchors / policy pins needed for `SCR` and audit surfaces,
  * explicit freshness/decay hooks (freshness window + decay/Γ_time selectors) as pinned policies/refs (not prose).
  * explicit `ReferencePlane` + penalty routing policy ids (`Φ(CL)`, `Ψ(CL^k)`, `Φ_plane`) as citable pins; any such policy family is justified in `CAL.ProofLedger` (monotone + bounded).
* **Optional** `CAL.NQD[]` — QD/OEE‑related calculus surfaces when declared:

  * descriptor/distance/insertion artifacts are pinned by ids/editions,
  * semantics are owned by method‑specific owners (e.g., `C.18`, `C.19`) and not redefined by CAL.
* `CAL.ProofLedger` — a proof/justification ledger:

  * links legality, monotonicity, boundedness, and other soundness obligations to operator/flow/clause ids.
* Publication layer:

  * UTS Name Cards (twin labels) for all public ids,
  * RSCR tests ids and Worked‑Examples ids,
  * deprecation notices and edition bump notes as lifecycle artifacts.

Boundary discipline (normative):

* **No shadow specs**: CAL artefacts cite `CN‑Spec`/`CG‑Spec` and do not introduce competing “local specs” (delegated; see `CC‑GCORE‑CN‑CG‑1` via **CC‑G4‑CoreRef**).
* **No shipping ownership**: CAL does not own shipping (delegated; see `CC‑GCORE‑SKP‑1` via **CC‑G4‑CoreRef**).
* **No refresh ownership**: CAL does not own refresh orchestration; it only publishes pins/payload for refresh (owner: `G.11`).

**Minimal schema fragments (notation‑independent; fields for citation, not an implementation schema):**

```
CAL.Pack@CG-Frame :=
 ⟨ calPackId, charterId, taskMapId, operatorIds[], acceptanceClauseIds[], flowIds[],
 evidenceProfileIds[], proofLedgerId, nqdIds[]?,
    utsRowIds[], workedExampleIds[], rscrTestIds[], lifecycleNoteIds[] ⟩

CAL.Operator :=
  ⟨ operatorId(UTS), signature(CHR-typed), preconditions[], postconditions[],
  evidenceProfileRefs[]?, failureBehaviorRef?, crossingRefs[]? ⟩

CAL.Acceptance :=
  ⟨ clauseId(UTS), characteristicRefs[], cgSpecCharacteristicRefs[]?,
    predicateRef, unknownHandlingRef, failureBehaviorRef,
    evidenceProfileRefs[]?, crossingRefs[]? ⟩

CAL.Flow :=
  ⟨ flowId(UTS), dag(operatorIds, edges), gateClauses(acceptanceClauseIds),
    resultKind, decisionAidPolicyRef? ⟩

CAL.EvidenceProfile :=
  ⟨ evidenceProfileId(UTS), lanes(F/G/R), anchors(A.10)[],
    freshnessPolicyPins[]?, penaltyPolicyPins[]?, ΓFoldRef.edition? ⟩
```
#### CAL authoring chassis C1–C9 (pattern‑owned kit)

**C1 — CAL Charter (scope anchor).**
Authors declare a `CAL.Charter@Context` that:

* anchors CAL to the CG‑Frame scope (`CG-FrameContext`, `describedEntity`, `ReferencePlane`),
* pins the relevant governance card and legality gate refs (`CNSpecRef.edition`, `CGSpecRef.edition`),
* records the local assumption envelope used by acceptance predicates (as explicit statements to be audited, not as hidden algorithmic assumptions),
* declares which CAL artifacts are intended to be cited downstream (UTS ids).
* emits a `TaskMap@Context` (`TaskMap`) that binds each declared `TaskSignature` (or task family) to:
  * eligible `CAL.FlowId[]` / `CAL.OperatorId[]`,
  * gating `AcceptanceClauseId[]` (ids of `CAL.Acceptance` clauses),
  * required `CAL.EvidenceProfileId[]`,
  * and any required policy pins/edition pins for reproducibility.
  This is the canonical “handoff manifest” consumed by `G.5` (thresholds remain only inside `CAL.Acceptance`).

**C2 — Operator Cards (typed & lawful).**
Each `CAL.Operator` is a UTS‑published, typed unit with:

* `OperatorId (UTS)`,
* `Signature` over CHR types,
* `Preconditions` (including references to CHR guard macros where applicable),
* `Postconditions / invariants`,
* `EvidenceProfileRef[]` (or an explicit “none”),
* `FailureBehaviorRef` (policy‑bound) for safe degradations and non‑catastrophic fallbacks.

**C3 — Acceptance Clauses (typed predicates; thresholds live here).**
Each `CAL.Acceptance` is a UTS‑published predicate with:

* stable `ClauseId (UTS)` for citation,
* explicit `CharacteristicRefs` (CHR ids) used by the predicate,
* `CGSpecRefs?` required iff the clause induces numeric comparison/aggregation,
* `EvidenceProfileRefs?` identifying evidence consulted (so `SCR` can surface the relevant pins),
* explicit **freshness envelope** (freshness window + decay/Γ_time selector refs/pins) when evidence recency is part of admissibility,
* `UnknownHandling` as a tri‑state choice (via `G.Core` semantics),
* `FailureBehaviorRef` (policy‑bound) for degrade/abstain behavior.
* `GateCrossingId[]` / `CrossingBundleId[]` **iff** the clause relies on cross‑context/plane/edition imports (no “silent reuse”).
  Missing required crossing artefacts is a conformance failure and blocks publication of the affected clause/flow (GateCrossing harness: `E.18`/`A.21`/`A.27`; crossing invariants: `G.Core`).

**C4 — Aggregation & comparison flows (safe by construction).**
`CAL.Flow` composes operators into legality‑checked DAGs and declares:

* which acceptance clauses gate the flow,
* which operator outputs are decision‑relevant vs report‑only,
* what the **result kind** is (scalar only where lawful; otherwise set/portfolio).
* any thinning/decision‑aid policy (e.g., ε‑front selection) as an explicit policy pin that **does not** silently replace the declared result kind.

**C5 — Evidence wiring surface.**
`CAL.EvidenceProfile` makes evidence hooks explicit:

* provenance anchor references (A.10‑style carriers/anchors, cited by id),
* lane tags (`F/G/R`) for each evidence contribution (no implicit lane mixing; penalties route only to `R_eff` as routed by `G.Core`),
* pinned policy ids for penalty routing and freshness/decay handling (incl. freshness window + decay/Γ_time selector pins; and `Φ(CL)`/`Ψ(CL^k)`/`Φ_plane` policy ids when used),
* declared inputs needed for `SCR` fields at run‑time (without embedding run‑time “gate decisions” into design‑time artifacts).

**C6 — NQD/OEE surface (optional; method‑specific semantics routed).**
If the CG‑Frame declares QD/OEE‑style regimes, CAL may publish `CAL.NQD[]` as a **surface** that:

* declares descriptor space and distance/insertion artifacts by ids and edition pins,
* records archive/illumination intent and “report‑only vs dominance” gating as explicit policy pins,
* **does not** redefine QD/OEE semantics (those remain owned by method‑specific patterns such as `C.18` / `C.19` and are wired via `Extensions`).

**C7 — ProofLedger (soundness & legality obligations).**
`CAL.ProofLedger` links each operator/flow/clause to:

* legality proof refs (incl. CSLC refs when numeric comparison/aggregation is induced),
* monotonicity/boundedness/stability proof refs for penalty/aggregation policies where relevant,
  * in particular: if an explicit `ΓFoldRef` is pinned (override), ProofLedger includes monotonicity + boundedness/boundary behavior proof refs for that fold.
* explicit statements of degradation conditions (what must happen when assumptions fail).

**C8 — Publication + RSCR + Bridges.**
CAL publication emits:

* UTS entries (Name Cards + twin labels) for all CAL ids,
* Worked‑Examples that exercise legality and acceptance claims,
* RSCR tests ensuring:

  * illegality is detected (e.g., forbidden ordinal arithmetic),
  * guard macro use is coherent,
  * flow legality checks are exercised,
  * acceptance clauses behave as authored on examples.

Any cross‑context/plane/edition import required by CAL publication is handled through GateCrossing/CrossingBundle discipline (as routed by `G.Core`), and CAL publication is blocked if required crossing artifacts are missing.

**C9 — Packaging & refresh readiness (without owning orchestration).**
CAL pack versions:

* record changes as edition‑pinned updates,
* publish deprecations/lifecycle notes for public ids,
* emit RSCR‑relevant trigger payload pins (editions/policies/UTS ids/paths) for refresh orchestration (owner: `G.11`).
#### Interfaces (minimal I/O surface)

| Interface                 | Consumes                                            | Produces                                                                                  |
| ------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `G.4-1 Charter`           | `CG-FrameContext`, SoTA inputs, `CHR Pack@CG-Frame` | `CAL.Charter@Context` + `TaskMap@Context` (`TaskMap`)  |
| `G.4-2 Operators`         | CHR typing + SoTA operator inventory                | `CAL.Operator[]` (UTS ids; typed signatures; refs to evidence profiles & guards)  |
| `G.4-3 Acceptance`        | Task intent + policy pins + CHR characteristics     | `CAL.Acceptance[]` (typed; thresholds; freshness envelope pins; failure behavior refs)    |
| `G.4-4 Flows`             | Operator cards + admissible aggregators             | `CAL.Flow[]` (legality‑checked compositions; declared result kind)                        |
| `G.4-5 NQD Surface`       | Task intent + policy pins + (optional) QD/OEE inputs | `CAL.NQD[]` (descriptor/distance/insertion refs + edition pins; optional)  |
| `G.4-6 Publish`           | All above + proofs + examples  | Versioned `CAL Pack@CG-Frame`, UTS entries, RSCR tests, Worked‑Examples, lifecycle notes |
#### Extensions (pattern‑scoped; non‑core)

`G.4` supports method‑family and discipline‑specific calculus variations exclusively via pattern‑scoped extensions.

**GPatternExtension block: `G.4:Ext.EvidenceGraphWiring`**
- **PatternScopeId:** `G.4:Ext.EvidenceGraphWiring`
- **GPatternExtensionId:** `EvidenceGraphWiring`
- **GPatternExtensionKind:** `InteropSpecific`
- **SemanticOwnerPatternId:** `G.6`
- **Uses:** `{G.6}`
- **⊑/⊑⁺:** `∅`
- **RequiredPins/EditionPins/PolicyPins (minimum):**
  - `EvidenceGraphId?`
  - `PathId[]/PathSliceId[]`
  - `UTSRowId[]` (for cited artifacts)
- **RSCRTriggerSetIds:** `∅`
- **RSCRTriggerKindIds:** `{RSCRTriggerKindId.EvidenceSurfaceEdit, RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange}`
- **Notes (wiring‑only):** This block does not define EvidenceGraph semantics; it only fixes that CAL proofs/examples may cite evidence by Path ids.

**GPatternExtension block: `G.4:Ext.NQD`**
- **PatternScopeId:** `G.4:Ext.NQD`
- **GPatternExtensionId:** `NQD`
- **GPatternExtensionKind:** `MethodSpecific`
- **SemanticOwnerPatternId:** `C.18`
- **Uses:** `{C.18}`
- **⊑/⊑⁺:** `∅`
- **RequiredPins/EditionPins/PolicyPins (minimum):**
  - `DescriptorMapRef.edition`
  - `DistanceDefRef.edition`
  - `InsertionPolicyRef`
  - `ArchiveRef?`
  - `TaskSignatureRef?` (if activation is TaskSignature‑bound)
- **RSCRTriggerSetIds:** `∅`
- **RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.FreshnessOrDecayEvent}`
- **Notes (wiring‑only):** CAL does not redefine QD semantics; it only pins the artifacts needed for reproducible archive/descriptor behavior. Any archive/illumination summaries (e.g., coverage / QD‑score / occupancyEntropy / filledCells) are published as report‑only outputs unless an explicit CAL acceptance clause/policy authorizes promotion.

**GPatternExtension block: `G.4:Ext.EELog`**
- **PatternScopeId:** `G.4:Ext.EELog`
- **GPatternExtensionId:** `EELog`
- **GPatternExtensionKind:** `MethodSpecific`
- **SemanticOwnerPatternId:** `C.19`
- **Uses:** `{C.19}`
- **⊑/⊑⁺:** `∅`
- **RequiredPins/EditionPins/PolicyPins (minimum):**
  - `ExploreExploitBudgetPolicyRef`
  - `ProbeAccountingRef?`
  - `FailureBehaviorRef?` (if probe/sandbox is policy‑bound)
- **RSCRTriggerSetIds:** `∅`
- **RSCRTriggerKindIds:** `{RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.FreshnessOrDecayEvent}`

**GPatternExtension block: `G.4:Ext.SoSLogBranches`**
- **PatternScopeId:** `G.4:Ext.SoSLogBranches`
- **GPatternExtensionId:** `SoSLogBranches`
- **GPatternExtensionKind:** `MethodSpecific`
- **SemanticOwnerPatternId:** `C.23`
- **Uses:** `{C.23}`
- **⊑/⊑⁺:** `∅`
- **RequiredPins/EditionPins/PolicyPins (minimum):**
  - `SoSLogRuleId[]`
  - `SoSLogBranchId[]`
  - `FailureBehaviorPolicyId`
- **RSCRTriggerSetIds:** `∅`
- **RSCRTriggerKindIds:** `{RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.MaturityRungChange, RSCRTriggerKindId.TelemetryDelta}`
- **Notes (wiring‑only):** This block only pins branch/rule ids for degrade/abstain explanation; it does not redefine rule semantics.

**GPatternExtension block: `G.4:Ext.AcceptanceRiskControl`** *(Phase‑3 seed)*
- **PatternScopeId:** `G.4:Ext.AcceptanceRiskControl`
- **GPatternExtensionId:** `AcceptanceRiskControl`
- **GPatternExtensionKind:** `Phase3Seed`
- **SemanticOwnerPatternId:** `owner TBD`
- **Uses:** `∅`
- **⊑/⊑⁺:** `∅`
- **RequiredPins/EditionPins/PolicyPins (minimum):**
  - `RiskControlPolicyRef`
  - `CalibrationWindowRef?`
  - `CoverageTargetRef?`
- **RSCRTriggerSetIds:** `∅`
- **RSCRTriggerKindIds:** `{RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.FreshnessOrDecayEvent}`
- **Notes (non‑normative seed):** Intended for post‑2015 acceptance families such as conformal risk control / set‑valued selective prediction, distributionally‑robust acceptance envelopes, and calibrated abstention policies; semantics must be owned elsewhere before becoming normative.
### Archetypal Grounding

**Tell.** A CG‑Frame must choose and justify a set of candidate methods (possibly a portfolio) under explicit legality, evidence, and scope constraints. CHR provides the typed measurement surface; CAL turns it into executable, auditable predicates and flows.

**Show 1 (in‑context CAL pack skeleton).**
Context: R&D portfolio choice. CHR defines `SafetyClass(ord↑)`, `CostUSD_2026(ratio↓)`, `Readiness(nominal)`.

* `CAL.Operator: DominatesPareto`
  Signature over CHR types, precondition references CHR guard macros.
* `CAL.AcceptanceClause: AC_SafetyGate`
  Typed predicate binding `SafetyClass` (and its levels) with Context‑local thresholds; unknown handling uses tri‑state pins.
* `CAL.Flow: Flow_ParetoPortfolio`
  Produces a set/portfolio result kind; gates by `AC_SafetyGate` and `AC_Budget`.
* `CAL.EvidenceProfile: EP_SafetyEvidence`
  Declares anchor ids and freshness policy pins required for `SCR`.

Downstream, `G.5` consumes only the handoff manifest: clause ids, operator ids, and evidence profile ids (no embedded thresholds).

**Show 2 (explicit cross‑context import).**
A `SafetyClass` value is imported from a different Context/plane. CAL may still author an acceptance clause using that value, but only after the reuse is made explicit as a published crossing bundle and the CAL artifacts cite the relevant ids/pins. The CAL pack remains Context‑local; portability is achieved through explicit crossings and citations, not by silently widening scope.
### Bias-Annotation

CAL is where “what counts as acceptable” is encoded. Typical bias vectors include:

* threshold‑selection bias (arbitrary floors masquerading as natural laws),
* measurement bias amplified by illegitimate arithmetic or hidden scalarization,
* survivorship bias in Worked‑Examples and probe telemetry,
* Goodhart pressures when report‑only telemetry is accidentally treated as dominance.

The pattern mitigates these by requiring typed acceptance clauses, explicit policy pins, and an auditable proof/justification ledger, while keeping cross‑context reuse explicit and penalized only through the routed assurance lane.
### Conformance Checklist (normative)

| ConformanceId     | Statement                                                                                                                                                                                                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CC‑G4‑CoreRef** | Conformance with `G.4` requires satisfying the effective `G.Core` obligations referenced by the `GCoreLinkageManifest` in **G.4:4.1** (profiles, pin sets, consumed defaults, and trigger kinds).                                                                                                              |
| **CC‑G4‑01**      | `CAL Pack@CG-Frame` is published as a notation‑independent object with stable UTS ids (Name Cards + twin labels) for `CAL.Charter`, `TaskMap`, all operator/acceptance/flow/evidence artifacts, Worked‑Examples, and lifecycle notes (incl. deprecations and lexical‑continuity notes). Tooling/vendor details remain non‑normative. |
| **CC‑G4‑02**      | `CAL.Charter@Context` pins `CG-FrameContext`, `describedEntity` (incl. `ReferencePlane`), and the relevant contract references by edition pins (`CNSpecRef.edition`, `CGSpecRef.edition`).                                                                                                                     |
| **CC‑G4‑03**      | Every `CAL.Operator` has an explicit CHR‑typed signature and explicit preconditions; any legality guard macros referenced are cited by id (no “implicit legality”).                                                                                                                                             |
| **CC‑G4‑04**      | Every `CAL.Acceptance` binds to CHR ids (`CharacteristicRefs`) and declares unknown handling and failure behavior via pins/refs; thresholds and cutoffs appear only here (not inside CHR artifacts and not inside operator prose). If the clause depends on cross‑context/plane/edition imports, it cites `GateCrossingId[]/CrossingBundleId[]`. |
| **CC‑G4‑05**      | If an acceptance clause, operator, or flow induces numeric comparison/aggregation, it cites the relevant `CG‑Spec.characteristic` ids and links to legality proof refs (CSLC) in the ProofLedger; otherwise it must be authored so that downstream can degrade/abstain rather than perform illegal operations. |
| **CC‑G4‑06**      | Every `CAL.Flow` declares its result kind and the set of gating acceptance clauses; any thinning/selection‑aid policies (e.g., ε‑front selection) are explicitly policy‑bound and do not silently replace the underlying result kind.                                                                      |
| **CC‑G4‑07**      | Every `CAL.EvidenceProfile` declares: provenance anchors (A.10), evidence lanes (`F/G/R`), freshness/decay pins (incl. freshness window + decay/Γ_time selector refs), and any penalty routing policy pins (`Φ(CL)`, `Ψ(CL^k)`, `Φ_plane`) needed for run‑time `SCR` surfacing. It either pins an explicit `ΓFoldRef.edition` override or (if absent) cites `DefaultId.GammaFoldForR_eff` (via `G.Core.DefaultOwnership`). Penalty policies affect `R_eff` only and do not define dominance. Any referenced penalty policy family is justified in the ProofLedger (monotone + bounded).  |
| **CC‑G4‑08**      | `CAL.ProofLedger` exists and is UTS‑citable; it links each operator/flow/clause to required proof/justification refs and records explicit degradation conditions when assumptions fail. If an explicit `ΓFoldRef` is pinned, it includes monotonicity + boundedness/boundary behavior proof refs for that fold. |
| **CC‑G4‑09**      | CAL publication includes RSCR tests and Worked‑Examples sufficient to detect illegality (incl. unit laundering / ordinal arithmetic), to exercise authored acceptance/flow behavior, and to validate the authored freshness envelope when it is part of admissibility; missing tests/examples are treated as an auditable gap, not as “assumed OK”. |
| **CC‑G4‑10**      | `TaskMap@Context` (`TaskMap`) is present and provides `G.5` with acceptance clause ids (`AcceptanceClauseId[]`; selector gates), operator/flow ids, and evidence profile ids required for explainability and audit; selector implementations must not embed thresholds or duplicate acceptance semantics.    |
| **CC‑G4‑11**      | Any method/discipline specifics are placed under `G.4:4.5 Extensions` as `GPatternExtension` blocks (stable `PatternScopeId`, explicit owner, pins, and RSCR triggers); no extension introduces competing defaults or replaces `G.Core` invariants. |
| **CC‑G4‑12**      | `CAL Pack@CG-Frame` includes lifecycle artifacts for public ids (deprecations / edition bumps / lexical‑continuity notes) and exposes refresh payload pins (editions/policies/UTS ids and, when present, PathId/PathSliceId) sufficient for `G.11` to plan RSCR without inferring semantics from prose. |
| **CC‑G4‑13**      | When `G.4:Ext.NQD` is present, `CAL.NQD[]` is present and is wired only via the declared semantic owner (`C.18`): at minimum it pins `DescriptorMapRef.edition`, `DistanceDefRef.edition`, and `InsertionPolicyRef`, and it treats archive/illumination summaries as report‑only unless explicitly promoted by a CAL acceptance clause/policy. |
| **CC‑G4‑14** | CAL does not mint new universal types to encode “strategy/policy”. Strategy is expressed as authored flows + acceptance clauses + policy/task pins (and downstream registry/composition in `G.5`); any specialization is introduced only via `GPatternExtension` wiring blocks or cited semantic owners.  |
### Common Anti-Patterns and How to Avoid Them

* **Hidden thresholds.**
  Avoid: embedding cutoffs in CHR prose or in operator descriptions.
  Prefer: `CAL.AcceptanceClause` with explicit ids and pins.

* **Untyped “score(x)”.**
  Avoid: operators with implicit units and untracked legality assumptions.
  Prefer: explicit CHR‑typed operator signatures + cited legality checks.

* **Silent cross‑context reuse.**
  Avoid: importing constructs across Contexts/planes/editions without published crossings.
  Prefer: explicit crossing artifacts and citations; keep CAL pack Context‑local.

* **Acceptance as implementation detail.**
  Avoid: acceptance embedded in tool logic.
  Prefer: publish acceptance as citable CAL artifacts; downstream consumes ids.

* **Exploratory telemetry treated as dominance.**
  Avoid: letting probe/illumination telemetry quietly become a dispatch criterion.
  Prefer: keep it report‑only unless an explicit policy‑bound acceptance clause authorizes promotion.
### Consequences

* CAL becomes a stable, citable calculus layer: operator/acceptance semantics are explicit artifacts, not tacit code behavior.
* Legality failures are surfaced as authoring defects (RSCR‑testable) rather than run‑time surprises.
* Downstream patterns (`G.5`, `G.8`, `G.9`, `G.10`, `G.11`) can reference stable ids/pins without redefining acceptance or operator semantics.
* Method pluralism is supported: multiple calculi can coexist as separate operator/flow/acceptance families, wired via Extensions rather than mixed into the core kit.
### Rationale

CAL sits at the boundary where typed measurement becomes actionable choice. Making CAL a published, typed, and testable artifact reduces semantic drift and prevents “shadow legality gates” from emerging in tools or in downstream prose.

The design separates concerns:

* CHR owns measurement typing and legality guard macros,
* CG‑Spec and CN‑Spec own the legality gate and governance card, respectively,
* `G.Core` owns Part‑G invariants and trigger/default discipline,
* `G.4` owns the CAL kit: authoring objects, publication surface, and handoff manifest.

This yields modularity (single owner per invariant/default), auditability (pins/ids and proof refs), and extensibility (method families attach through explicit extension modules).
### SoTA-Echoing

CAL authoring is compatible with post‑2015 best practice families without confusing “popular” with “best‑available”:

* **Risk‑controlled acceptance**: modern conformal / selective / set‑valued prediction families where “abstain” is a first‑class, audited outcome (fits tri‑state gating + explicit calibration pins).
* **Robust acceptance envelopes**: distribution‑shift‑aware and distributionally‑robust acceptance styles, expressed as policy‑pinned predicates rather than hidden heuristics.
* **Modern multi‑objective practice**: preference‑aware, interactive, and set‑returning multi‑objective decision families that preserve partial orders and portfolios.
* **Quality‑Diversity after 2015**: archive‑based search families (e.g., CMA‑ME‑class) attach as wiring via edition‑pinned descriptor/distance/insertion artifacts.
* **Open‑ended exploration after 2015**: environment‑method co‑evolution families (e.g., POET‑class) attach through explicit generator family wiring and policy‑bound acceptance branches.

All of these remain method‑specific semantics and therefore belong in `Extensions` blocks (or their semantic owners), while `G.4` keeps the calculus kit stable and auditable.
### Relations

**Builds on:** `G.Core` (and the pattern template discipline in `E.8`).

**Uses:** `G.1` (CG‑FrameContext), `G.2` (SoTA Synthesis Pack), `G.3` (CHR Pack), `G.0` (CG‑Spec legality gate), `A.19` (CN‑Spec), `A.18` (CSLC), `A.10` (provenance anchors), `B.3` (trust/freshness/decay), `E.18` + `A.21` + `A.27` (GateCrossing harness), `F.9` (BridgeCard/CL).

**Uses (via Extensions):** `G.6` (EvidenceGraph/Path citation; when `G.4:Ext.EvidenceGraphWiring` is present), `C.18` (NQD), `C.19` (E/E‑LOG), `C.23` (SoS‑LOG).

**Used by:** `G.5` (selector/dispatcher), `G.8` (SoS‑LOG bundles), `G.9` (parity), `G.10` (shipping), `G.11` (refresh orchestration).
**Publishes to:** UTS (public ids + lifecycle), RSCR (tests + trigger emissions), `G.5` (handoff manifest), and (as cited payload) shipped packs owned by `G.10`.

**Constrains:** any run‑time LOG implementation that executes CAL operators/flows must treat CAL artifacts as citable contracts and must not re‑invent acceptance semantics.
### G.4:End
## Multi‑Method Dispatcher & MethodFamily Registry

> **Type:** General (G)
> **Status:** Stable
> **Normativity:** Normative

**Plain-name.** Multi-method dispatcher and method-family registry.

**Intent.** Govern the dispatcher/registry surfaces for rival method families and publish selector-facing retained-set outcomes without collapsing plurality into one hidden scalar winner.

### Use this when

- several method families or generator families can lawfully act on the same declared task family or work target
- you need one selector to return a `Shortlist`, `RankedShortlist`, portfolio, narrowed handoff plan, or abstain outcome without pretending that there is always one scalar winner
- the published result must carry enough basis pins to support later comparison, handoff, or escalation without changing its public head
### What goes wrong if missed

- rival families are compared under silent comparator drift, hidden baseline changes, or unspoken crossing costs
- the selector hides one dogmatic winner even when only a partial order is lawful
- selected-set publication gets hidden inside `C.11`, `C.19`, or `C.24`, so the published artifact no longer makes clear whether it carries local choice, pool policy, enactment, or publication
- exploration, open-ended, or specialization pressure leaks in as one architecture convenience rather than one explicit policy-bound choice
### What this buys

- one registry that keeps rival method families disjoint but dispatchable
- one selector surface that can publish candidate sets, `Shortlist`, `RankedShortlist`, specialist portfolios, narrowed handoff plans, or abstain outcomes honestly
- one `DRR/SCR`-addressable trace with explicit basis pins instead of one hidden selector rationale
- one explicit publication closure so the public head, retained members, ordering status, and basis pins are stated directly in the emitted result

Registry and dispatch remain the primary owner burden here; selected-set publication is the explicit closure surface of that selector burden, not a replacement for it.
### First-minute questions

- What public head is this selector result actually emitting: `Shortlist`, `RankedShortlist`, portfolio, narrowed handoff, or abstain?
- Which members are being retained or excluded now?
- Does order materially belong to the published result?
- Which basis pins or policy pins must the published result carry?
### First output

The first useful output from this dispatcher/registry burden is one published selected-set artifact: `Shortlist`, `RankedShortlist`, one specialist portfolio, one narrowed handoff plan, or one abstain/escalation result, with the public head, retained members or handoff content, ordering status when relevant, and basis pins stated in one place.

If that first output still cannot be written honestly, the current publication result is not finished `G.5` publication yet.

G.5 keeps the dispatcher/registry surfaces here and leaves universal Part-G invariants to `G.Core`; method- or generator-specific semantics stay in their named source patterns and arrive here only through explicit pins.

When `C.11` has already emitted one local choice result, `C.19` one pool-policy posture, or `C.24` one enactment-facing next move, `G.5` begins where the burden becomes selector-facing publication of the retained set or narrowed handoff result rather than one more explanation of why the result looked reasonable. A conformant `G.5` pass should therefore publish the retained set, narrowed handoff, or abstain result directly, with its public head and basis pins explicit in the result itself.

A publication result remains unfinished if the public head, retained members, ordering status, abstain or escalation condition, or basis pins are still only implicit in upstream notes.
### Problem frame

A `CG‑FrameContext` (from **G.1**) and a `SoTA Synthesis Pack@CG‑Frame` (from **G.2**) expose multiple rival, internally coherent **method families** (and sometimes **generator families**) that can plausibly act on the same *describedEntity / ReferencePlane*.

At the same time, the typed slot/scale/coordinate surfaces from **G.3/G.4** yield admissible calculi and acceptance clauses—enough to formulate *eligibility*, *assurance*, and *legality* constraints, but not enough to pick “the method” without collapsing plurality.

You need a **notation‑independent** way to:

1. register method/generator families as *auditable, versioned* entries,
2. select/compose/fallback among them at run time for a concrete task instance,
3. publish stable selected-set results and stable identities to UTS, and
4. emit RSCR‑relevant triggers and pins without inventing new “shadow specs”.
### Problem

How to design a **general, auditable dispatcher** that:

* supports **pluralism** (families from competing Traditions stay disjoint) while remaining **dispatchable** (selection is possible and explainable);
* does **not embed algorithmic dogma** in the core selector kernel;
* respects Context boundaries and crossing discipline (Bridge‑only; explicit pins);
* produces **set‑valued outcomes** when only partial orders are lawful;
* cleanly separates:

  * **selector kit/surfaces** (registry + selector façade + publication surfaces),
  * **universal Part‑G invariants** (carried by `G.Core`),
  * **method/generator specifics** (wired only via `Extensions` blocks).
### Forces

* **Pluralism vs. forced totalisation.** Many selection regimes are inherently partial‑order; forcing a scalar winner often creates illegal semantics.
* **Evidence realism vs. hard gates.** Eligibility/acceptance frequently depends on incomplete evidence; selection must remain auditable under tri‑state unknowns.
* **Reuse vs. leakage.** Cross‑Context reuse is valuable but must be explicit (Bridge + loss notes) and must not silently re‑ground semantics.
* **Exploration vs. exploitation.** Dispatch sometimes must probe alternatives under explicit policy/risk envelopes, but probing must not become an implicit fourth status.
* **Evolvability vs. churn.** Registries evolve (new families, deprecations, edition bumps); continuity must not be broken by “rename by meaning”.
### Solution

#### G.Core linkage (normative)

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
#### Dispatcher & Registry kit (notation‑independent)

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
#### Selector head and narrower selector families

Selection/dispatch stays one generic selector head. Narrower selector families may refine it, but they do not redefine the universal invariants routed via `G.Core`, do not add hidden mandatory inputs beyond pinned policy or edition refs, and do not mutate SlotKinds.

Method- and generator-specific pressures such as `QD` archives, open-ended portfolios, explore/exploit lenses, or preference comparators do not become part of the selector head. They arrive only through explicit extension wiring and the pins those extensions require.
#### Interfaces (minimal I/O surface)

| Interface                         | Consumes                                                                                                                                                     | Produces                                                                                                                                                                                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **G.5‑1 RegisterFamily**          | `SoTA` family cards (from `G.2`), CHR/CAL pins (from `G.3/G.4`), `CNSpecRef.edition`, `CGSpecRef.edition`, `ContextId`                                       | A `MethodFamily` registry row (`MethodFamilyId`, `EligibilityStandardRef`, `AssuranceProfileRef`, `UTSRowId`, pinned refs)                                                                                                                                 |
| **G.5‑2 RegisterGeneratorFamily** | `SoTA` generator family cards (from `G.2`), `ContextId`, pinned refs (including `TransferRulesRef.edition` when applicable)                                  | A `GeneratorFamily` registry row (`GeneratorFamilyId`, `GeneratorSignatureRef`, `UTSRowId`, pinned refs)                                                                                                                                                   |
| **G.5‑3 Select**                  | `TaskSignatureRef`, `MethodFamilyId[]` (in scope), pinned `CNSpecRef/CGSpecRef` (editions), policy refs (if any), audit citation pins (`PathId/PathSliceId`) | `CandidateSet` (set‑returning), portfolio artefact (per `PortfolioMode`), `DRR + SCR` pins; if no admissible candidate exists: return `CandidateSet=∅` plus an escalation hint (`ActionHint`) and the pins required to plan next steps (P2W split applies) |
| **G.5‑4 Compose**                 | `CandidateSet`, composition template refs, pinned legality constraints                                                                                       | Composite strategy surface (template‑level; legality‑checked; pinned)                                                                                                                                                                                      |
| **G.5‑5 Telemetry**               | run outcomes + citations + policy/edition pins                                                                                                               | refresh cues (typed RSCR causes + payload pins), parity deltas (if parity harness is in use), telemetry pins (selector‑side; orchestration surface is `G.11`)                                                                                              |
#### Worked selector slice

- A catalyst-search team is choosing among three method families for the same declared `TaskSignature` and `C.22.1` adaptation signature.
- The shared profile pins one work-measure threshold target, one freshness window, one prior-exposure declaration, and one adaptation budget. One family reaches threshold quickly but carries high downside burden on adjacent tasks. One family is slower but transfers cleanly. One family never clears `MinimalEvidence` and must abstain.
- A lawful `G.5` result therefore publishes a set-return shortlist or a narrowed handoff plan, with `DRR/SCR` citing why the third family was excluded and why the first two remain non-dominated. The selector does not invent one scalar winner and does not hide the specialization profile in wiring notes.
- When one upstream `C.19` pass has already narrowed the live pool to one internal retained subset over registered families, `G.5` may publish that result as one `Shortlist` with one `ShortlistId` and explicit basis pins only when selector-facing publication is now the burden. Until that emission occurs, the internal retained subset is not yet one public shortlist artifact.
#### Published selected-set result and closure rule

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
#### Publication quick card

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
#### Worked publication closure slice

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
### Archetypal Grounding

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
### Bias-Annotation

Potential biases and failure modes this pattern explicitly guards against:

* **Monoculture bias (single Tradition dominance by default).** Mitigation: registry requires explicit eligibility/assurance surfaces; selection is set‑returning under partial orders; method‑specific policies are explicit pins, not hard‑coded defaults.
* **Hidden scalarisation bias.** Mitigation: set‑return semantics is core‑routed; dominance regimes are explicit and default routing is singular and declared.
* **“Tool equals method” bias.** Mitigation: notation independence + prohibition of tool keywords in core registry/eligibility fields; tool choices are outside the core.
* **Cross‑Context leakage bias.** Mitigation: explicit crossing pins only; Bridges + CL are required when crossings occur; no implicit crossings.
* **Survivorship bias in refresh.** Mitigation: RSCR triggers are typed/id‑based; freshness/decay and telemetry deltas are first‑class causes with canonical ids.
### Conformance Checklist (normative)

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
### Common Anti-Patterns and How to Avoid Them

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
### Consequences

* **Auditable plurality.** Multiple Traditions can co-exist without forced semantic flattening; dispatch remains explainable and evidence-pinned.
* **Core stability.** Universal invariants are routed via `G.Core`; method/generator innovation does not churn the selector head.
* **Evolvability.** Registries support growth, retirement, and refresh with typed RSCR causes and explicit payload pins.
* **Composability.** Strategy templates and fallbacks remain legality-checked and portable across implementations.
* **Recoverable publication.** Selected-set results can now travel downstream as explicit shortlist-family, ranked-shortlist, or abstain/escalation artifacts rather than one hidden implication inside upstream reasoning.
### Rationale

* **Why registries?** Dispatch requires stable, auditable family objects with explicit eligibility and assurance surfaces; otherwise selection collapses into ad-hoc tooling.
* **Why separation via Extensions?** QD/OEE/preference-learning and similar families are fast-moving and method-specific; making them part of the selector head would force a universal semantics and violate strict distinction.
* **Why set-return?** Partial orders are common and often the only lawful representation under heterogeneous scales; set-return preserves semantics and makes tie criteria explicit.
* **Why explicit defaults with one declared source?** Defaults are unavoidable; single-source indexing prevents competing defaults from silently diverging across patterns.
* **Why selected-set publication here?** Once the burden is to surface one retained set for downstream use, the selector should publish that artifact directly instead of leaving it implicit in local choice, pool-policy, or enactment notes written for other purposes.
### SoTA-Echoing

This pattern is designed to **host** (not redefine) post-2015 SoTA families via `Uses` plus edition and policy pins:

* **Quality-Diversity / illumination (post-2015 refinements).** Archive-centric QD families fit naturally as `G.5:Ext.NQD` wiring with explicit descriptor, distance, and insertion pins. The practical implication is to keep publication honest about whether the selector is returning one lawful set, one ranked artifact, or no admissible survivor at all.
* **Open-Endedness (post-2015 wave).** POET-class and later open-ended or co-evolutionary families dock via generator registries plus `TransferRulesRef.edition` pins. The practical implication is to publish pair- or portfolio-shaped results explicitly rather than silently squeezing them into one false single-family winner.
* **Algorithm selection and meta-selection.** Modern selection under uncertainty, robust evaluation, and policy-driven probing dock via explicit policy surfaces and typed telemetry pins, rather than hard-coded scoring rules. The practical safeguard is that the publication head and basis pins must still remain explicit after those policies have acted.
* **Budgeted specialist acquisition.** Current agentic search lines compete on time or budget to threshold plus truthful portfolio return when heterogeneous specialists remain non-dominated, so `G.5` keeps specialization profiles and set-return semantics explicit instead of forcing one static breadth winner.
* **Preference-learning comparators.** Interactive and learned-preference regimes are treated as comparator or policy artefacts with explicit editions when they are actually declared.

SoTA here is treated as **best-known practice for a declared goal and constraint regime**, not whatever is currently popular.
Evidence-tier clarification: peer-reviewed anchors carry the strongest support for typed comparison, budget-to-threshold, and truthful portfolio return. Faster-moving workshop, poster, or frontier-exploration lines remain explicit support for corridor-entry or open-ended pressure, not silently equal evidence for every selector claim.
### Relations

**Builds on (normative):** `G.Core` (core invariants + linkage discipline).

**Uses (conceptual dependencies; cited via pins/ids):**

* Contract surfaces: `A.19 (CN‑Spec)`, `G.0 (CG‑Spec)`.
* Upstream kits: `G.1 (CG‑Frame Card)`, `G.2 (SoTA Pack)`, `G.3 (CHR Pack)`, `G.4 (CAL Pack)`.
* Evidence & crossings: `G.6 (EvidenceGraph; PathId/PathSliceId)`, `G.7 (Bridge/CL calibration)`, `E.18/A.21 (CrossingBundle/GateChecks)`.
* Planning/enactment boundary: `A.15.3 (SlotFillingsPlanItem)` as the planned baseline anchor (cited, not redefined).
* Optional method/generator extensions via `G.5:Ext.*`: `C.18`, `C.19`, `C.23`, plus any future extension-bearing patterns that add extra selector pins.

**Publishes to:** `UTS` (family ids, selector policy surfaces, and selected-set identities such as `ShortlistId` when one public artifact is emitted), `G.6` (audit citations), RSCR emission surfaces (typed triggers + payload pins), and downstream packs via `G.10` shipping surfaces.

**Coordinates with:** `C.11` for local choice results, `C.19` for pool-policy records, `C.24` for enactment-facing next-move records, and the accepted Q-front shortlist-family continuity line when the published head is one shortlist-family artifact.
### G.5:End
## Evidence Graph & Provenance Ledger

**Tag.** Architectural pattern
**Stage.** design‑time (assembly) + run‑time (telemetry ingestion)
**Primary output.** A notation‑independent `EvidenceGraph` + a stable `PathId` / `PathSliceId` citation surface + an SCR projection (“Assurance SCR”) suitable for audit, selection explainability, and refresh/RSCR wiring.
**Primary hooks.** A.10 (evidence anchors/carriers; SCR/RSCR anchoring), B.3 (assurance lanes and `F/G/R` skeleton), F.9 (BridgeCard/CL), G.4 (CAL `EvidenceProfiles` + `ProofLedger` linkage), `G.Core` (Part‑G invariants, RSCR trigger catalogue, default‑ownership index), E.18/A.21 (GateCrossing + CrossingBundle checks), F.17 (UTS publication), F.15 (RSCR), E.10 (LEX), E.5.* (notation‑independence discipline).
**Non‑duplication note.** Universal Part‑G invariants (no shadow specs; Bridge‑only crossings; tri‑state discipline; penalties→`R_eff` only; P2W split; typed/id‑based RSCR causes; single‑owner defaults; Δ‑discipline) are owned by `G.Core` and are *cited* via `CC‑GCORE‑*`. This pattern defines only the *EvidenceGraph kit* and its path‑addressable provenance surfaces.

### Problem frame

SoTA claims, operators, and method families are admitted (or gated) using assurance signals derived from diverse artefacts and anchors. FPF already mandates **Evidence Graph Referring** (A.10), lane discipline, and the assurance skeleton (B.3). What is often still missing in practice is a *first‑class, citable* object that makes the provenance of an admission/decision **addressable**:

* *exactly which* anchors and bindings were used,
* *under which* `ReferencePlane` and `BoundedContext`,
* *with which* explicit crossings and penalty policies,
* *for which* time window (freshness/decay),
* in a way that selectors, audits, and maturity transitions can cite without copying tables or re‑telling a story.

This pattern introduces the missing kit: a typed, lane‑aware `EvidenceGraph` plus stable `PathId` / `PathSliceId` addresses that downstream LOG, UTS, parity, and refresh can cite.

**Why here (not in G.4)?** G.4 owns CAL artefacts (EvidenceProfiles, ProofLedger, acceptance policies). G.6 packages *cross‑artefact provenance* as a graph and mints *path identities* that downstream surfaces can cite without duplicating CAL tables or re‑inventing legality rules.
### Problem

1. Readers cannot reliably **audit crossing/penalty and decay impacts** on claims without chasing many tables and informal narratives.
2. Cross‑Context/plane reuse must remain **Bridge‑only and explicit**, but provenance often hides crossings (or treats them as “obvious”).
3. Selection and maturity decisions need a stable **path address** to re‑check later, including after edition/policy/freshness changes.
### Forces

| Force                        | Tension                                                                             |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| **Provenance vs agility**    | Fine‑grained audit trails ↔ friction for authors.                                   |
| **Lane purity vs synthesis** | Keep TA/VA/LA separable ↔ publish a unified justification surface.                  |
| **Notation independence**    | Semantics in prose/math ↔ teams want diagrams/tables (informative only).            |
| **Design vs run**            | Design‑time evidence assembly ↔ run‑time telemetry ingestion must not be conflated. |
| **Crossings and planes**     | Crossings must be explicit and penalised correctly ↔ authors want “just reuse it”.  |
### Solution — EvidenceGraph (notation‑independent; lane‑aware; path‑addressable)

#### G.Core linkage (normative)

**Builds on:** `G.Core` (Part‑G core invariants; routing/delegation hub)

**GCoreLinkageManifest (normative; size‑controlled).**

`GCoreLinkageManifest := ⟨
  CoreConformanceProfileIds := {
    GCoreConformanceProfileId.PartG.AuthoringBase,
    GCoreConformanceProfileId.PartG.UTSWhenPublicIdsMinted
  },
  RSCRTriggerSetIds := { GCoreTriggerSetId.EvidenceGraphKit },
  CorePinSetIds := {
    GCorePinSetId.PartG.AuthoringMinimal,
    GCorePinSetId.PartG.CrossingVisibilityPins
  },
  CorePinsRequired := {
    EvidenceGraphId,
    EvidenceGraphRef.edition?,   // iff editioned as a published artefact
    PathId[]/PathSliceId[],      // strengthened (unconditional for G.6)
    UTSRowId[],                  // strengthened (UTS Name Cards + PathCards are required outputs)
    Γ_timePolicy?,               // iff empirical legs exist (or equivalently: window id carried by PathSliceId)
    ΓFoldRef.edition?,           // iff an explicit Γ-fold artefact is pinned
    CAL.ProofLedgerId[]?         // iff Γ-fold is overridden (cite CAL ProofLedger ids; owner: G.4)
  },
  DefaultsConsumed := { DefaultId.GammaFoldForR_eff },
  TriggerAliasMapRef? := G.Core.TriggerAliasMap.G6
⟩`

**Conditional add‑on (tri‑state guard).** If `G.6` is used to publish or consume guard outcomes (e.g., via `G.6:Ext.SoSLOGPathCitationWiring`), additionally require:
`CoreConformanceProfileIds += { GCoreConformanceProfileId.PartG.TriStateGuard }`.

*(Nil‑elision + expansion rule are per `G.Core:4.2`.)*
#### EvidenceGraph (object; kit‑owned surface)

**Definition (object).** An `EvidenceGraph` is a **typed DAG** whose nodes are resolvable to A.10 anchors/carriers and evidencing roles, and whose edges represent minimal, normative provenance relations suitable for audit and path citation.

* **Nodes.** Each node is an A.10‑anchored evidence carrier or evidence role (e.g., a proof carrier, a measurement record carrier, a tool‑qualification carrier). Nodes MUST remain grounded in A.10 anchors and MUST NOT introduce mereological structure (A.10 firewall).
  * **Node kinds (explicit; stable).** Nodes MUST have an explicit kind tag `nodeKind ∈ {U.EvidenceRole, SymbolCarrier, TransformerRole, MethodDescription, Observation}` (as used in the existing Part‑G vocabulary), so downstream projections can remain notation‑independent and audit‑checkable.
  * **Extension pins.** Method‑family‑specific pins (e.g., QD/OEE) MUST NOT be introduced as new “core node kinds”; they are carried as additional pins only when the relevant `GPatternExtension` is in use and are recorded on UTS PathCards / SCR projections as required by that extension.
* **Edges (minimal normative vocabulary).** The pattern admits a small set of provenance edges sufficient for audit:

  * `verifiedBy` (formal line),
  * `validatedBy` (empirical line),
  * `fromWorkSet` (run‑time trace provenance),
  * `happenedBefore` (temporal ordering),
  * `derivedFrom` (controlled derivation).
  * *(Informative only)* `usedCarrier`, `interpretedBy` MAY appear as authoring aids, but MUST NOT be relied on for conformance checks (their semantics remain non‑normative in G.6).
    Additional narrative edges MAY exist as informative annotations but MUST NOT be relied on for conformance checks.
* **Lane tags.** Every binding on a path is lane‑typed with `assuranceUse ∈ {TA, VA, LA}` (lane separation remains explicit through to SCR projections; no silent cross‑lane averaging).
* **Externality (no self‑evidence).** Any evidencing `TransformerRole` that would certify the evaluated holon MUST be modelled as external (or model a meta‑holon explicitly); G.6 does not permit reflexive “self‑evidence” shortcuts.
* **Context and plane attachment.** Nodes and claims carry `BoundedContext` and `ReferencePlane`. Any movement across context/kind/plane/design↔run/edition boundaries is represented via explicit GateCrossing/CrossingBundle artefacts (with crossing pins routed per `G.Core`).
#### PathId and PathSliceId (citable justification addresses)

**PathId (address for justifications).** A `PathId` is a stable identifier minted for a **claim‑local, lane‑typed** path in an `EvidenceGraph` under a declared scope slice (including a time selector where applicable) and a declared `ReferencePlane`. A `PathId` is meant to be citable from downstream artefacts (LOG, UTS, parity, shipping) without duplicating evidence tables.

A `PathId` citation surface SHALL include, at minimum:

* the lane split (TA/VA/LA) for the path,
* the explicit crossing pins (when crossings are traversed),
* the freshness/time attachment status for empirical legs (when present), including any explicit `validUntil`/expiry marker when one is declared (or a decay/freshness policy pin that implies expiry),
* the pinned policy identifiers relevant to the path’s penalty/trust wiring (policy ids are cited; policies remain owned elsewhere),
* the effective crossing‑trust “bottleneck” information when crossings exist (e.g., lowest `CL`/`CL^k`/`CL^plane` encountered on the cited slice),
* the effective `Γ‑fold` in force for any published/relied‑upon `R_eff` projection (default or explicit override), and (when overridden) the cited CAL `ProofLedger` ids that justify the override,
* the `EvidenceGraphId` and enough addressability to resolve the path to SCR/RSCR anchors.

**PathSliceId (time‑ & plane‑lifted snapshot).** A `PathSliceId` denotes a **release‑quality snapshot key** for a path under explicit time/plane binding (e.g., window policy + `ReferencePlane`) and is intended as the address used when refresh/RSCR wants *path‑granular* recomputation.

*The universal definition of “what kinds of changes force refresh” is owned by `G.Core` (typed trigger kinds). G.6 only makes the slice addressable and pin‑complete.*

When downstream methods require additional edition/policy pins for reproducibility (e.g., archive/illumination/QD surfaces), such pins are specified by the relevant `GPatternExtension` module(s) and are treated as *required pins when that extension is used*.
#### Assurance and legality binding (delegation‑first; no shadow specs)

G.6 does not redefine B.3 or legality rules; it binds evidence paths to existing owners:

* **Assurance skeleton.** Lane separation and the `F/G/R` skeleton are as per B.3. Any statement about penalty routing or default Γ‑fold is delegated to `G.Core` and the default‑ownership index (do not restate).
* **CAL linkage.** When a path claims a proof obligation or an override (e.g., an explicit Γ‑fold override), it MUST cite the relevant CAL `ProofLedger` / `EvidenceProfiles` artefacts (G.4) rather than inventing local semantics.
* **Legality binding.** If a path includes numeric comparisons/aggregations, the legality surface MUST be *cited* via `CG‑Spec` (G.0) rather than re‑implemented in G.6 prose.
#### Conceptual interface (notation‑independent surface; informative shapes)

These are conceptual shapes, not tool APIs (E.5 discipline).

* `Explain(pathId | pathSliceId)` → returns a citation‑ready explanation bundle: lane split, relevant pins (crossings/policies/editions), freshness binding, and links to contributing anchors (A.10) and any CAL evidence/profile refs.
* `PathsFor(claim, scopeSlice, referencePlane)` → enumerates admissible paths, returning `PathId[]` with enough metadata to support selection/audit queries.
* `Snapshot(pathId | pathSliceId)` → emits a release‑grade snapshot record (SCR/RSCR‑grade) whose keys are citable and whose pins are explicit.
#### Extensions (pattern‑scoped; non‑core)

All blocks below are `GPatternExtension` modules (PatternScopeId‑scoped, **not** new PatternIds). They store wiring only and cite semantic owners.

**GPatternExtension: LegacyTriggerAliases**

* **PatternScopeId:** `G.6:Ext.LegacyTriggerAliases`
* **GPatternExtensionId:** `LegacyTriggerAliases`
* **GPatternExtensionKind:** `InteropSpecific`
* **SemanticOwnerPatternId:** `G.Core`
* **Uses:** `{G.Core}` *(cites `G.Core.TriggerAliasMap.G6`; does not redefine meanings)*
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum):**

  * `RSCRTriggerKindId` (canonical id recorded)
  * `RSCRTriggerAliasId?` *(e.g., legacy human labels such as `G.6:H3:...` recorded as labels only)*
  * `scope: PathSliceId[] | PathId[] | PatternScopeId`
  * `TriggerAliasMapRef := G.Core.TriggerAliasMap.G6` *(docking reference)*
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.EvidenceSurfaceEdit, RSCRTriggerKindId.CrossingBundleEdit, RSCRTriggerKindId.PenaltyPolicyEdit, RSCRTriggerKindId.ReferencePlaneEdit, RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange}`
* **Notes (wiring‑only):** This module preserves ergonomics/back‑compat by allowing `G.6:H3:*` labels, while requiring that recorded causes use canonical `RSCRTriggerKindId` (per `CC‑GCORE‑TRIG‑3`).

**GPatternExtension: SoSLOGPathCitationWiring**

* **PatternScopeId:** `G.6:Ext.SoSLOGPathCitationWiring`
* **GPatternExtensionId:** `SoSLOGPathCitationWiring`
* **GPatternExtensionKind:** `InteropSpecific`
* **SemanticOwnerPatternId:** `C.23`
* **Uses:** `{C.23, C.19, G.5, G.11}` *(SoS‑LOG decisions cite paths; optional lens/attribution wiring is owned by C.19; refresh consumes triggers)*
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum):**

  * `SoSLogRuleId[]` / `BranchId[]` *(as cited labels; semantics owned by C.23)*
  * `FailureBehaviorPolicyId` *(when `degrade(mode=...)` is used)*
  * `PathId[] | PathSliceId[]` (the cited justification addresses)
  * `LensId?` *(when a C.19 lens is used for attribution/explainability; id only; semantics owned by C.19)*
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.EvidenceSurfaceEdit, RSCRTriggerKindId.MaturityRungChange, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.PolicyPinChange}`
* **Notes (wiring‑only):** G.6 does not define LOG semantics; it defines the *path‑citation surface* that LOG must cite.

**GPatternExtension: BridgeSentinelWiring**

* **PatternScopeId:** `G.6:Ext.BridgeSentinelWiring`
* **GPatternExtensionId:** `BridgeSentinelWiring`
* **GPatternExtensionKind:** `InteropSpecific`
* **SemanticOwnerPatternId:** `G.7`
* **Uses:** `{G.7, G.11}` *(bridge/sentinel semantics & calibration artefacts are owned by G.7; refresh orchestration is owned by G.11)*
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum; conditional on use):**

  * `BridgeId/BridgeCardId`
  * `RegressionSetId?` / `SentinelId[]?` *(as published by G.7, when sentinel wiring is used)*
  * `PathId[] | PathSliceId[]` *(paths that cite the bridge and must be re‑audited on bridge/sentinel changes)*
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.CrossingBundleEdit, RSCRTriggerKindId.PenaltyPolicyEdit, RSCRTriggerKindId.FreshnessOrDecayEvent, RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange}`
* **Notes (wiring‑only):** This module requires that bridge/sentinel changes re‑trigger RSCR **path‑locally** for affected `PathId/PathSliceId` scopes, without redefining sentinel semantics (owned by G.7) and without inventing new trigger kinds (owned by `G.Core`).

**GPatternExtension: QD_OEE_TelemetryPins**

* **PatternScopeId:** `G.6:Ext.QD_OEE_TelemetryPins`
* **GPatternExtensionId:** `QD_OEE_TelemetryPins`
* **GPatternExtensionKind:** `MethodSpecific`
* **SemanticOwnerPatternId:** `C.18` *(QD artefact semantics); uses `C.19` for exploration/logging/lens wiring as needed*
* **Uses:** `{C.18, C.19}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum; conditional on use):**

  * `DescriptorMapRef.edition`
  * `DistanceDefRef.edition`
  * `InsertionPolicyRef` *(policy id or pinned policy ref, per owner semantics)*
  * `EmitterPolicyRef?`
  * `LensId?` *(when a C.19 lens is used in selection/telemetry attribution)*
  * `TransferRulesRef.edition?` / `EnvironmentValidityRegionRef?` *(when open‑ended / transfer events are in scope)*
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.FreshnessOrDecayEvent}`
* **Notes (wiring‑only):** This module enforces reproducibility of archive/illumination and open‑ended telemetry *when those surfaces are used*, without pulling QD/OEE semantics into the EvidenceGraph core.

---
### Archetypal Grounding (System / Episteme)

**System (Γ_sys):** *Autonomous brake envelope claim.*
Claim: “Stop within 50 m from 100 km/h.” EvidenceGraph nodes include proof carriers (TA/VA), instrumented track tests (LA/VA), calibration carriers, and an external test lab as an external evidencing role (no self‑evidence). A `PathId` provides a stable justification address; empirical legs are bound to explicit windows; crossings (if any) are explicit and pinned.

**Episteme (Γ_epist):** *Benchmark parity/replication lineage (post‑2015 practice).*
Claim: “Method family M attains parity on ImageNet‑style tasks under a declared evaluation protocol.” EvidenceGraph nodes include replication carriers (LA), legality/metric‑soundness carriers (VA), and tool‑qualification carriers (TA). The cited `PathId` binds the `ReferencePlane`, the scope slice, and the pinned evaluation/legal surfaces (by edition/policy ids rather than prose). When refresh triggers occur (edition pin change, evidence surface edit, decay events), downstream artefacts can re‑cite or re‑compute using the same `PathSliceId` addressing discipline.
### Bias‑Annotation

Lenses tested: **Gov**, **Arch**, **Onto/Epist**, **Prag**, **Did**.
Scope: Universal for the EvidenceGraph kit; any method‑specific telemetry/portfolio wiring is modularized as Extensions and cited to its semantic owners.
### Conformance Checklist (normative) — CC‑G6

| ConformanceId                                     | Requirement                                                                                                                                                                                                                                                                                                                                                                  | Purpose |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **CC‑G6‑CoreRef**                                 | `G.6` is conformant only if it satisfies the **effective** `CC‑GCORE‑*` set expanded from the `GCoreLinkageManifest` in **§4.1** (explicit crossings & pins, penalties→`R_eff` only, P2W split, typed RSCR trigger kinds, single‑owner defaults, UTS discipline, Δ‑discipline).                                                                                                 | Route core invariants |
| **CC‑G6‑1 (Anchor & lanes)**                      | Every citable path MUST resolve to A.10 anchors (SCR/RSCR addressable) and MUST declare lane tags (`TA/VA/LA`) on bindings.                                                                                                                                                                                                                                                | Ground auditability |
| **CC‑G6‑2 (No self‑evidence)**                    | Any evidencing `TransformerRole` that certifies the evaluated holon is external; reflexive cases MUST be modelled as a meta‑holon.                                                                                                                                                                                                                                         | Avoid reflexive evidence |
| **CC‑G6‑3 (Context/Plane & crossings)**           | Paths MUST declare `BoundedContext` and `ReferencePlane`, and MUST expose explicit crossing pins when crossings are present. *(Delegation target: `CC‑GCORE‑CROSS‑1`.)*                                                                                                                                                                                                    | Make crossings explicit |
| **CC‑G6‑4 (Penalty routing)**                     | Any crossing/plane penalty wiring visible in G.6 artefacts MUST route penalties to `R_eff` only and MUST preserve `F/G` invariance under penalties. *(Delegation target: `CC‑GCORE‑PEN‑1`.)*                                                                                                                                                                             | Preserve lane purity |
| **CC‑G6‑5 (Γ‑fold discipline + default ownership)** | If a `Γ‑fold` is not explicitly overridden by pinned CAL artefacts, G.6 MUST cite the single owner of `DefaultId.GammaFoldForR_eff` rather than asserting a local default. If a `Γ‑fold` is explicitly overridden, the path/SCR surface MUST cite the relevant CAL `ProofLedger` ids and publish the override as an auditable pin (not as prose). *(Delegation: `CC‑GCORE‑DEF‑1`; override semantics owned by `G.4`.)* | Keep folding auditable |
| **CC‑G6‑6 (Time/decay/validity binding)**         | Empirical legs MUST expose freshness/time binding (window selector or policy pin) and MUST support an explicit `validUntil`/expiry marker when one is declared (or an equivalent decay/freshness policy pin that implies expiry). Expiry/decay MUST be representable as refresh/RSCR‑relevant change using typed canonical causes. *(Delegation intent: typed causes are core‑owned; see `CC‑GCORE‑TRIG‑*`.)*                                  | Enable refresh readiness |
| **CC‑G6‑7 (Design/run split)**                    | Design‑time method descriptions and run‑time work traces MUST NOT be fused into one undifferentiated node; the graph MUST preserve the design↔run boundary via explicit carriers/bridges. *(Delegation intent: P2W split is core‑owned; see `CC‑GCORE‑P2W‑1`.)*                                                                                                            | Preserve P2W boundary |
| **CC‑G6‑8 (SCR projection completeness)**         | For any cited `PathId/PathSliceId`, the Assurance SCR view MUST expose at least: lane split, scope/plane pins, freshness/validity binding, explicit crossing pins (and the effective bottleneck `CL`/`CL^k`/`CL^plane` when crossings exist), the effective `Γ‑fold` in force for any `R_eff` folding (default or override, plus CAL `ProofLedger` ids when overridden), and links to contributing A.10 anchors and any CAL evidence/profile refs. | Make decisions auditable |
| **CC‑G6‑9 (Citable PathIds)**                     | Any SoS‑LOG admit/degrade/abstain decision or maturity rung transition that relies on provenance MUST cite `PathId`(s) (or `PathSliceId`(s) when snapshot‑binding is required).                                                                                                                                                                                            | Decision traceability |
| **CC‑G6‑10 (SpanUnion justification note)**       | If a SpanUnion/non‑interaction claim is made across evidence lines, an explicit independence justification MUST be published (as an addressable artefact linked to the path).                                                                                                                                                                                                | Non‑interaction audit |
| **CC‑G6‑11 (UTS hooks)**                          | Evidence artefacts and paths minted for citation MUST be UTS‑citable with twin labels and edition pins. *(Delegation target: `CC‑GCORE‑UTS‑1`.)*                                                                                                                                                                                                                           | Stable citations |
| **CC‑G6‑12 (IndependenceCertificate)**            | Independence for SpanUnion claims MUST be carried by an `IndependenceCertificate` (per the relevant certificate pattern) and referenced from SCR/paths.                                                                                                                                                                                                                    | Certificate surface |
| **CC‑G6‑13 (Mandatory provenance pins)**          | Any published/cited path surface MUST expose: `EvidenceGraphId`, `PathId/PathSliceId`, lane split, scope/plane pins, freshness/validity pins when applicable, crossing pins when applicable, and the minimal pin set required by §4.1. When `R_eff` folding is published/relied upon, the effective `Γ‑fold` in force MUST be exposed (default or override, plus CAL `ProofLedger` ids when overridden). When QD/OEE telemetry pins are in use, the extension‑required edition/policy pins MUST also be exposed. | Pin completeness |
| **CC‑G6‑14 (Legality binding; no shadow specs)**  | If numeric operations are cited/used in a path, legality MUST be pinned/cited via `CG‑Spec` rather than asserted locally, and the path/SCR surface MUST fail fast on illegal arithmetic/typing (e.g., CSLC/scale violations); do not “promote” ordinal to cardinal by convention inside G.6. *(Delegation target for “no shadow specs”: `CC‑GCORE‑CN‑CG‑1`.)*                                                                                     | Prevent illicit arithmetic |
| **CC‑G6‑15 (Conditional: QD/OEE telemetry pins)** | *(Conditional)* If `G.6:Ext.QD_OEE_TelemetryPins` is used, the required edition/policy pins from that extension (at minimum `DescriptorMapRef.edition`, `DistanceDefRef.edition`, and the relevant insertion/emitter/transfer policy pins when applicable) MUST be recorded for reproducibility and must participate in RSCR triggering using canonical trigger kind ids.                                                                 | Reproducible archive/OEE |
### Interfaces & Hooks (normative)

Each hook below defines: **Trigger → Obligation → Publishes/Consumes → Invariants**.
Where universal invariants apply (crossings, penalties, trigger typing), this section *cites* `G.Core` rather than redefining semantics.

#### H1 — UTS Name Card for Evidence Artefacts

* **Trigger.** A new EvidenceGraph node is minted (an A.10‑anchored evidence artefact or role).
* **Obligation.** Mint a UTS Name Card with twin labels (Tech/Plain), citing the home context anchor and any required edition pins.
* **Publishes/Consumes.** Publishes: UTS row. Consumes: A.10 anchor metadata.
* **Invariants.** UTS publication and any deprecation/aliasing follow `G.Core` routing to F.17 (UTS discipline).
#### H2 — UTS PathCard (PathId/PathSliceId)

* **Trigger.** A new `PathId` (or `PathSliceId`) is minted.
* **Obligation.** Publish a UTS PathCard with twin labels, listing the explicit pins required by §4.1 (context/plane/time binding, crossing pins if any). If an extension requires additional pins for reproducibility (e.g., `G.6:Ext.QD_OEE_TelemetryPins`), those pins MUST be present when the extension is in use.
* **Publishes/Consumes.** Publishes: UTS row(s). Consumes: EvidenceGraph path metadata + any extension‑required pins.
* **Invariants.** Crossing visibility and penalty routing are delegated to `G.Core` (`CC‑GCORE‑CROSS‑1`, `CC‑GCORE‑PEN‑1`).
#### H3 — RSCR Trigger on Evidence‑Impacting Edit (typed; alias‑dockable)

* **Trigger.** Any edit in G.6 that can change a path’s audit‑relevant surface (evidence structure, crossing pins, penalty policy pins, plane binding, freshness binding, edition/policy pins, or telemetry‑bound fields).
* **Obligation.** Emit RSCR triggers **using canonical `RSCRTriggerKindId`** (from `G.Core`) and record affected scope (`PathId/PathSliceId`) plus payload pins required for downstream refresh. If a legacy `G.6:H3:*` label is recorded, it is recorded as an alias label and docked via `G.Core.TriggerAliasMap.G6`. When `G.6:Ext.BridgeSentinelWiring` is used, include the bridge/sentinel payload pins required by that extension.
* **Publishes/Consumes.** Publishes: RSCR triggers and any associated RSCR test ids. Consumes: relevant pins/refs and CAL artefact references where applicable.
* **Invariants.** Trigger typing and alias docking are delegated to `G.Core` (`CC‑GCORE‑TRIG‑*`). Penalty routing invariants are delegated (`CC‑GCORE‑PEN‑1`).
#### H4 — SoS‑LOG Path Citation (selector explainability)

* **Trigger.** A SoS‑LOG rule yields a tri‑state decision for a selection‑relevant pair (e.g., `(TaskSignature, MethodFamily)`), and the decision is justified by evidence.
* **Obligation.** The branch record MUST cite the relevant `PathId/PathSliceId`(s) and the minimal pins required to re‑audit the justification. Any method‑specific attribution fields are handled via Extensions (e.g., `G.6:Ext.SoSLOGPathCitationWiring` for `LensId`/FailureBehavior wiring, `G.6:Ext.BridgeSentinelWiring` for bridge‑monitoring payload pins when cross‑context reuse is invoked, `G.6:Ext.QD_OEE_TelemetryPins` for QD/OEE pins).
* **Publishes/Consumes.** Publishes: an SCR‑visible branch record with cited paths. Consumes: EvidenceGraph path queries.
* **Invariants.** Tri‑state semantics are core‑owned (`CC‑GCORE‑GUARD‑1`); G.6 does not add a new decision value.
#### H5 — Maturity Rung Transition Justification

* **Trigger.** A maturity rung transition is proposed and justified by evidence.
* **Obligation.** The transition MUST cite one or more `PathId/PathSliceId`(s) and MUST publish an updated maturity entry with those citations. Missing path citations forbid rung advance.
* **Publishes/Consumes.** Publishes: updated UTS entry for maturity artefacts. Consumes: cited paths and A.10 anchors.
* **Invariants.** Any thresholding policy remains owned by CAL/LOG owners; G.6 provides citation, not policy.
#### H6 — Bridge/CL Edge Annotation (GateCrossings)

* **Trigger.** An EvidenceGraph edge traverses a declared GateCrossing boundary (context/kind/plane/design↔run/edition).
* **Obligation.** Publish a CrossingBundle‑checkable crossing record with explicit crossing pins (UTS row id, Bridge id/card id if applicable, CL regime pins if applicable, and plane pins if applicable).
* **Publishes/Consumes.** Publishes: crossing row/pins. Consumes: GateCrossing metadata and Bridge artefacts (when present).
* **Invariants.** Crossing visibility is core‑owned (`CC‑GCORE‑CROSS‑1`); penalties routing is core‑owned (`CC‑GCORE‑PEN‑1`).
#### H7 — ReferencePlane penalty policy publication (ids only)

* **Trigger.** A path binds across different reference planes.
* **Obligation.** Publish the relevant policy identifiers (ids only; not tables) required to audit plane effects, alongside the path’s pins.
* **Publishes/Consumes.** Publishes: SCR/UTS fields containing policy ids. Consumes: the owner’s policy registries as cited artefacts (do not duplicate tables).
* **Invariants.** Penalty routing is delegated (`CC‑GCORE‑PEN‑1`); no shadow specs (`CC‑GCORE‑CN‑CG‑1`).
#### H8 — CrossingBundle exposure (E.18)

* **Trigger.** G.6 artefacts are exported for release or consumed by downstream patterns that require GateCrossing checks.
* **Obligation.** Provide harness‑readable ids/pins so GateCrossing checks can verify: required crossing records exist, lexical constraints hold, and crossing pins are explicit.
* **Publishes/Consumes.** Publishes: checkable ids/pins. Consumes: GateCrossing + lexical rules.
* **Invariants.** Crossing discipline and ID continuity are core‑owned (`CC‑GCORE‑CROSS‑1`, `CC‑GCORE‑ID‑*`).
#### H9 — SCR surface for assurance provenance

* **Trigger.** A downstream artefact cites a path for audit/selection/maturity.
* **Obligation.** Expose the required provenance fields in SCR views: lane split, context/plane pins, freshness binding, crossing pins (when present), and links to A.10 anchors and CAL refs.
* **Publishes/Consumes.** Publishes: SCR view(s). Consumes: EvidenceGraph paths and cited owner artefacts.
* **Invariants.** Default ownership is routed (`CC‑GCORE‑DEF‑1`) when defaults are cited.
#### H10 — ProofLedger linkage (CAL ↔ G.6)

* **Trigger.** A proof obligation or evidence role is attached to a claim and is represented in G.4 artefacts.
* **Obligation.** Link EvidenceGraph nodes/edges to CAL ProofLedger/EvidenceProfiles entries and to A.10 carriers via the minimal provenance edge vocabulary.
* **Publishes/Consumes.** Publishes: CAL proof refs as pins in the path explanation surface. Consumes: CAL artefacts.
* **Invariants.** G.6 does not redefine CAL proof semantics; it only cites them.
#### H11 — Telemetry ingest (selector & probe outcomes)

* **Trigger.** Run‑time outcomes (selection, probes, parity runs, measurement updates) produce observations that bear on previously asserted claims.
* **Obligation.** Ingest the observation as a run‑time evidence line (anchored in A.10), with explicit lane typing and explicit scope/time binding. If method‑specific telemetry pins are required, they are governed by Extensions (e.g., `G.6:Ext.QD_OEE_TelemetryPins`).
* **Publishes/Consumes.** Publishes: new EvidenceGraph nodes/edges + any required UTS rows + typed RSCR triggers when impacts occur. Consumes: run‑time carriers/attestations as conceptual anchors.
* **Invariants.** P2W split is respected (`CC‑GCORE‑P2W‑1`); typed trigger discipline is respected (`CC‑GCORE‑TRIG‑*`).
#### Minimal conformance (hooks)

1. UTS publication for minted evidence artefacts and paths (H1–H2), per routed UTS discipline.
2. Typed RSCR triggers on evidence‑impacting edits (H3) using canonical trigger kind ids.
3. LOG and maturity artefacts cite paths when evidence is used (H4–H5).
4. GateCrossing/crossing records are explicit and checkable when crossings occur (H6–H8).
5. SCR views expose the minimal provenance pins for cited paths (H9–H10).
6. Run‑time telemetry is ingested without collapsing design↔run boundaries (H11).
### Common Anti-Patterns and How to Avoid Them

* **Narrative‑only provenance (“because story”).**
  **Avoid:** mint `PathId/PathSliceId` and require citation for any decision that claims evidence‑based justification (CC‑G6‑9).
* **Implicit crossings (“same thing, different context”).**
  **Avoid:** represent crossings only via explicit crossing artefacts/pins; treat edition/plane/context changes as explicit crossing‑relevant edits and trigger RSCR (core‑owned crossing discipline).
* **Smuggling legality rules into EvidenceGraph prose.**
  **Avoid:** cite/pin legality surfaces (`CG‑Spec` and CAL artefacts); do not introduce local “mini‑CG” rules in G.6 (route via `CC‑GCORE‑CN‑CG‑1`).
* **Unpinned editions/policies (“it’s obvious which version”).**
  **Avoid:** require explicit edition/policy pins on citable paths; treat changes as typed triggers.
* **Alias‑only RSCR causes (“H3: something changed”).**
  **Avoid:** record canonical `RSCRTriggerKindId` as the cause; aliases are labels only and must dock via `G.Core.TriggerAliasMap.G6`.
### Consequences

**Benefits.** Path‑addressable provenance; crossing/plane effects are auditable by pins rather than folklore; selectors and auditors share the same object; refresh becomes localized (path‑scoped) rather than global “rerun everything”.
**Trade‑offs.** Authors must declare (or pin) time/plane/scope and keep pins explicit; mitigated by reusing CAL EvidenceProfiles and by modularizing method‑specific telemetry as Extensions.
### Rationale

G.6 concretizes the “because‑graph” implicit in A.10 into a typed, lane‑aware DAG with stable path addresses. It relies on canonical owners for semantics:

* A.10 for anchoring discipline and carrier reality,
* B.3 for the assurance skeleton,
* G.4 for proof/evidence profile semantics,
* `G.Core` for universal crossing, penalty, default ownership, and typed RSCR cause discipline.

This preserves conceptual modularity: G.6 standardizes *addressable provenance*, not a competing legality or selection mechanism.
### SoTA‑Echoing

This pattern aligns with post‑2015 best practice in reproducibility and evaluation governance by:

* treating **provenance and versioning/pinning** as first‑class audit surfaces (rather than informal “methods” prose),
* enabling **selective re‑evaluation** (path‑scoped refresh) rather than global reruns whenever one policy/edition changes,
* separating **design‑time specifications** from **run‑time traces/telemetry**, matching modern reproducibility and “lineage” practice in complex ML/scientific pipelines,
* keeping **method‑family specifics** (e.g., archive/illumination/QD pins or open‑ended telemetry pins) modular via extension wiring instead of embedding them into the universal provenance core.
### Relations

**Builds on:** `G.Core`, `A.10` (evidence anchors/carriers; SCR/RSCR), `B.3` (assurance skeleton), `F.9` (BridgeCard/CL), `G.4` (CAL EvidenceProfiles/ProofLedger), `E.18/A.21` (GateCrossing/CrossingBundle checks), `E.10` (lexical rules), `E.5.*` (notation independence), `F.17` (UTS), `F.15` (RSCR).
**Publishes to:** UTS (Name Cards + PathCards), SCR/RSCR surfaces, downstream selectors/LOG by `PathId` citation, refresh/orchestration as typed triggers (consumed by `G.11` when used).
**Used by:** `G.5` (selector explainability and admissibility justifications), `G.8` (SoS‑LOG bundles), `G.9` (parity harness traces), `G.10` (shipping pins and audit payload), `G.11` (refresh orchestration).
**Constrains:** downstream patterns MUST cite paths when evidence is claimed; they MUST treat edits to pinned evidence/crossing/policy/edition/time bindings as refresh‑relevant causes with canonical trigger ids (routing via `G.Core`).
### G.6:End
## Cross‑Tradition Bridge Calibration Kit (BridgeMatrix → BridgeCards + BCT/Sentinels)

**Tag.** Architectural pattern
**Stage.** design‑time (calibration + publication) + run‑time (sentinel‑driven telemetry emission; orchestration owned by **G.11**)
**Primary output.** A bridge calibration kit that turns **G.2**’s BridgeMatrix rows into **F.9** `BridgeCard`s and publishes: a `BridgeCalibrationTable (BCT)` + `CalibrationLedger` + `RegressionSet` + `SentinelSet`, plus UTS‑visible crossing rows and RSCR‑ready sentinel triggers scoped to `PathSliceId` / `PatternScopeId`.
**Primary hooks.** `G.Core` (Part‑G invariants + RSCR trigger catalogue + default-ownership index), **G.2** (BridgeMatrix), **F.9** (BridgeCard + CL/CL^k), **F.3/F.7** (SenseCell anchoring; row bottleneck discipline), **E.18/A.21** (GateCrossing + CrossingBundle checks), **G.6** (PathId/PathSliceId citation surface), **G.5** (downstream consumer for eligibility/selection), **G.11** (refresh orchestration consumer), **B.3** (assurance lanes + penalty policies), **C.21** (DHC accounts such as AlignmentDensity), **C.18/C.19** (QD/OEE pins when relevant), **C.23** (SoS‑LOG clauses as explainability gates for cross‑Tradition choices), **G.4** (Acceptance hooks/thresholds when bridges are used as selector gates), **E.10** (LEX / strict distinction discipline).
**Working‑Model first.** Prefer a minimal, auditable calibration procedure and worked micro‑cases; escalate to heavier harnesses only where risk warrants (per **E.8**).
**Non‑duplication note.** Universal Part‑G invariants (no shadow specs; Bridge‑only crossings; penalty routing to `R_eff` only; P2W split; typed/id‑based RSCR causes; single‑owner defaults; Δ‑discipline) are owned by `G.Core` and are *cited* via `CC‑GCORE‑*`. This pattern defines only the *bridge calibration kit* and its surfaces.

### Problem frame

SoTA synthesis (**G.2**) can legitimately preserve pluralism by exporting a **BridgeMatrix**: a Tradition×Tradition inventory of “comparable constructs” with preliminary notes (candidate correspondences, likely losses, tentative levels). Downstream patterns (CHR/CAL/selector/logging/shipping) cannot consume this safely unless cross‑Context reuse is:

* **materialised** as explicit bridge artefacts (not implied by prose),
* **calibrated** with a small, auditable procedure (so CL/CL^k/plane routing is not a narrative),
* **published** as checkable crossing bundles (UTS + GateCrossing harness),
* **refreshable** in a *targeted* way (path‑scoped RSCR rather than whole‑pack reruns).

`G.7` packages this into a kit: `BCT` + `BridgeCard` publication + `RegressionSet`/`SentinelSet` wiring, so that later patterns can satisfy core invariants without re‑inventing cross‑Tradition machinery.
### Problem

1. Cross‑Tradition comparisons are frequently attempted via informal “synonymy” or ad‑hoc mappings, causing silent meaning drift and hidden crossings.
2. Plane mismatches (world ↔ concept ↔ episteme, or other `ReferencePlane` shifts) are often ignored, or conflated with “semantic sameness”, causing wrong downstream confidence.
3. Calibration changes (CL/CL^k/plane or their policy pins) must trigger **targeted** re‑checks; pack‑wide reweaves are too costly and too slow.
4. If bridges are involved in QD/illumination or other edition‑sensitive telemetry, **edition pins** must be tracked (otherwise comparisons become irreproducible after a map/distance/policy update).
5. Row‑level summaries (for matrix rows / comparable construct groups) tend to be averaged or “smoothed”, which is incompatible with bottleneck semantics and loss honesty.
### Forces

| Force                                    | Tension                                                                                                                                                                   |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Comparability vs local authority**     | Enable comparisons across Traditions ↔ avoid overriding Context‑local meaning.                                                                                            |
| **Auditability vs authoring throughput** | Require explicit artefacts, losses, and pins ↔ keep the calibration procedure light enough to be used.                                                                    |
| **Targeted refresh vs safety**           | Emit path‑local RSCR triggers ↔ ensure triggers are typed and carry enough payload pins for audit and rerun planning.                                                     |
| **Plane awareness vs “one story”**       | Explicitly surface `ReferencePlane` and plane penalties ↔ avoid turning plane discussion into a second semantics of “sameness”.                                           |
| **QD comparability vs metric drift**     | Enable cross‑context reporting of archive/illumination telemetry ↔ enforce edition‑aware pins for descriptor/distance/policies only when those modes are actually in use. |
### Solution — Bridge calibration kit (BCT + BridgeCards + RegressionSet/Sentinels)

#### G.Core linkage (normative)

**Builds on:** `G.Core` (Part‑G core invariants; routing/delegation hub)

**GCoreLinkageManifest (normative).**

`GCoreLinkageManifest := ⟨  
  CoreConformanceProfileIds := {  
    GCoreConformanceProfileId.PartG.AuthoringBase,  
    GCoreConformanceProfileId.PartG.TriStateGuard,  
    GCoreConformanceProfileId.PartG.UTSWhenPublicIdsMinted  
  },  
  RSCRTriggerSetIds := { GCoreTriggerSetId.BridgeCalibrationKit },  
  CorePinSetIds := { GCorePinSetId.PartG.CrossingVisibilityPins },  
  CorePinsRequired := {  
    BridgeCalibrationTableId (BCT.id),  
    RegressionSetId,  
    SentinelSetId,  
    FreshnessWindowRef,  
    CalibrationLedgerId,  
    RowScopeId,  
    ReferencePlane(src),  
    ReferencePlane(tgt),  
    UTSRowId[],  
    PathId[]/PathSliceId[]  
  },  
  DefaultsConsumed := ∅,  
  TriggerAliasMapRef := ∅  
⟩`

* **Expansion rule.** Effective `CoreConformanceIds`, `RSCRTriggerKindIds`, and `CorePinsRequired` are obtained by expanding the cited profile/set ids and unioning with the explicit ids above (see `G.Core` nil‑elision + expansion rule).
* **Conditional pins.**
  * `BridgeCardRef.edition` is required iff BridgeCards are published as editioned artefacts.
  * Sentinel scopes MAY be recorded as `PatternScopeId[]` when path surfaces are not available (and SHALL then be present in sentinel records and emitted trigger payload pins).
* **CN/CG note.** `CC‑GCORE‑CN‑CG‑1` is included via `GCoreConformanceProfileId.PartG.AuthoringBase` and is exercised only when the governance card and legality gate (e.g., `CNSpecRef.edition` / `CGSpecRef.edition`) are explicitly pinned; penalty/guard policy ids (`Φ(CL)`, `Ψ(CL^k)`, `Φ_plane`) are policy pins, not governance cards or legality gates.

*(payload pins, minimum: affected members of the effective `CorePinsRequired` (after expansion) plus any pins introduced by active extensions (e.g., QD parity pins), scoped to the watched `PathSliceId[]`/`PathId[]`/`PatternScopeId[]`.)*
#### Kit objects (pattern‑owned surfaces)

This pattern defines the *bridge calibration kit* as a set of minimal, checkable surfaces. Semantics of `BridgeCard` and CL typing are owned by **F.9**; G.7 adds calibration artefacts and publication/wiring surfaces.

**(A) BridgeCalibrationTable (BCT) — object.**
A `BridgeCalibrationTable` is a per‑Tradition‑pair registry of calibrated bridge entries.

Minimal fields (conceptual):

`BridgeCalibrationTable := ⟨  
BCT.id, TradPairId, FreshnessWindowRef,  
RowEntries[]  
⟩`

**Source provenance (when sourced from `G.2`).** If the BCT is derived from a `G.2` BridgeMatrix, publish `BridgeMatrixId` (+ `BridgeMatrixRef.edition` when editioned) and row‑level linkage via `G.7:Ext.MatrixIntake` (wiring‑only), rather than duplicating G.2 semantics in core.

Where each `RowEntry` minimally binds:

`RowEntry := ⟨  
RowEntryId, ComparableConstructId, RowScopeId,  
BridgeCardId[],  
RowCL_min, RowCL_k_min?, RowCL_plane_min?,  
LossNoteRef[]?, CounterExampleRef[]?, CounterExampleAbsenceRef?, WaiverRef[]?,  
RegressionSetId, SentinelSetId,  
PolicyPins: { Φ(CL), Ψ(CL^k)?, Φ_plane? },  
PlanePins: { ReferencePlane(src), ReferencePlane(tgt) },  
ExtensionPins?: { [GPatternExtensionId]: { …ids… } }  
⟩`

**(B) CalibrationLedger — object.**
A `CalibrationLedger` is the auditable “row narrative” that remains *pin‑first*: it records what was calibrated, what was lost, and which artefacts/policies witness that.

Minimal fields:

`CalibrationLedger := ⟨  
LedgerId, TradPairId,  
Entries[]  // each entry cites RowEntryId, BridgeCardId(s), CL‑minima, waivers (if any), loss notes, counterexamples, UTS rows, and (when run) regression-run/delta refs  
⟩`

**(C) RegressionSet — object.**
A `RegressionSet` is a small set of regression probes/checks that are runnable against the BCT row entries. It exists to detect drift (bridge edits, policy edits, plane edits, edition pin changes) and to provide the evidential payload for RSCR triggers.

Minimal fields:

`RegressionSet := ⟨ RegressionSetId, TradPairId, TestCaseId[], ExpectedOutcomesRef?, RegressionRunRef? ⟩`

##### CL / CL^k admissibility regime and plane guard (kit‑local; normative)

This subsection is kit‑owned (G.7) and complements (but does not duplicate) `G.Core` penalty routing and tri‑state guard semantics.

**Admissibility regimes (row‑level, minimal).**
* `RowCL_min` MUST take a value in `{3,2,1,0}` (value set and CL meaning are owned by F.9; G.7 owns the admissibility regime).
* Default admissibility for cross‑Tradition reuse:
  * `RowCL_min ≥ 2` ⇒ admissible for reuse (subject to downstream guards/policies).
  * `RowCL_min = 1` ⇒ **NOT** admissible unless an explicit `WaiverRef[]` is cited; any reuse under waiver is **guarded-only** (no substitution semantics).
  * `RowCL_min = 0` ⇒ forbidden for reuse; it MAY remain in BCT as a documented non‑bridge with loss notes/counterexamples.
* **Honesty rule (row‑level):**
* if `RowCL_min ≤ 2`, at least one `CounterExampleRef[]` MUST be cited;
* if `RowCL_min = 3` and `CounterExampleRef[]` is empty, a citable `CounterExampleAbsenceRef` MUST be provided (explicit “searched‑none found / no known counterexample” disclosure);
  * if any `LossNoteRef[]` is present, the row MUST NOT be presented as “free substitution” in any consumer surface.

**Kind channel (`CL^k`) (conditional).**
If a row relies on bridges in the `Kind` channel, then `RowCL_k_min` and `Ψ(CL^k)` pin MUST be present, and the same admissibility regimes apply to `RowCL_k_min`.

**Plane guard (`CL^plane`) (conditional).**
If `ReferencePlane(src)` and `ReferencePlane(tgt)` differ (or plane routing is explicitly invoked), then:
* `RowCL_plane_min` and `Φ_plane` pin MUST be present;
* if either plane pin is absent, the row is non‑conformant (no implicit plane defaulting);
* any “blocking” outcome must be representable downstream via `G.Core` tri‑state guard (`abstain` or a policy‑bound `degrade(mode=…)`), without introducing additional statuses in G.7;
* plane effects MUST NOT rewrite `CL/CL^k`; their impact is routed via the pinned policy ids and `G.Core` penalty semantics.

**(D) SentinelSet & BridgeSentinel — object.**
A `SentinelSet` is a watch‑list that connects bridge calibration changes to RSCR‑ready triggers scoped to downstream consumption.

Minimal fields:

`BridgeSentinel := ⟨  
SentinelId,  
watchedBridgeIds: BridgeCardId[],  
watchedScope: PathSliceId[] | PathId[] | PatternScopeId[],  
payloadPins: { BCT.id, RegressionSetId, FreshnessWindowRef, PolicyPins, PlanePins, UTSRowId[] }  
⟩`

`SentinelSet := ⟨ SentinelSetId, BridgeSentinel[] ⟩`
#### Minimal calibration procedure (auditable; table‑backed; bridge‑first)

For each Tradition‑pair and each comparable construct row from **G.2**:

1. **Materialise bridge artefacts.** Produce (or reuse) **F.9** `BridgeCard`s for the concrete `SenseCell`‑level alignments required by the row scope.
   *Note.* “SenseCell anchoring” is a kit requirement: if a row is authored at a coarser token level, the SenseCell anchors must be explicitly cited (F.3 discipline).
2. **Record row scope and losses.** Author a `RowScopeId` and record loss notes as first‑class citations (e.g., `LossNoteRef[]`), not as informal footnotes.
   Also record `RowCL_min` (and `RowCL_k_min?`, `RowCL_plane_min?` when applicable) and cite `WaiverRef[]` if any row is intentionally kept at `=1` for guarded-only reuse.
3. **Plane pins (no hidden plane mixing).** Record `ReferencePlane` pins for source/target and the relevant policy id pins for plane routing (ids only; do not duplicate policy tables).
4. **Policy pins for penalty routing.** Record the policy id pins needed to audit penalty routing (ids only). Penalty semantics are core‑owned (route via `CC‑GCORE‑PEN‑1`); G.7’s responsibility is to make the pins explicit and published.
5. **Row bottleneck discipline.** When a row aggregates multiple bridge cells, row summarisation uses bottleneck semantics (F.7) and carries a counterexample citation whenever any cell is loss‑noted.
6. **Regression and sentinel wiring.** Create/update the `RegressionSet` and `SentinelSet`. Any calibration change that can affect downstream audit (CL/CL^k/plane pins, relevant policy ids, edition pins for involved telemetry surfaces, freshness window) emits typed RSCR triggers (canonical ids; scope + payload pins).
   If the regression harness is run, record a citable `RegressionRunRef` (or equivalent run/delta reference) and attach it to the relevant ledger entries (pin‑first; no narrative-only deltas).
#### Publication surfaces (UTS + GateCrossing harness)

A conformant G.7 publication:

* publishes UTS‑citable identifiers for `BridgeCard`s and any GateCrossing/crossing rows that rely on them,
* ensures crossing bundles are checkable via **E.18/A.21** harnesses (lexical SD, lane purity, required pin presence),
* emits RSCR triggers using canonical `RSCRTriggerKindId` and attaches the minimum payload pins listed in §4.1.
* ensures evidence-facing citations are pin-complete: whenever bridge calibration is cited in SCR/Evidence surfaces, the citation MUST include `{BCT.id, RegressionSetId}` and the active policy id pins `{Φ(CL), Ψ(CL^k)?, Φ_plane?}` (ids only; representation is owned by `G.6`/SCR).
#### Worked mini‑examples (informative; post‑2015; row scopes + loss notes)

> These are **working models**, not equivalence claims. They illustrate how row scope + loss notes constrain safe reuse.

1. **Preference‑learning objective (Method; RowScope = “training‑objective‑intent”).**
   *Cells:* `RLHF@Context‑A` ↔ `DPO@Context‑B` ↔ `IPO@Context‑C`
   *RowCL_min:* 2 (guarded)
   *Loss notes:* different inductive biases (reward model vs direct preference likelihood; sensitivity to preference noise model; implicit regularisation forms).
   *Use:* cross‑Tradition *didactic alignment* and eligibility hints; thresholds/acceptance remain CAL‑owned.

2. **Robustness evaluation (Measurement; RowScope = “metric‑family‑intent”).**
   *Cells:* `Accuracy@IID` ↔ `Robustness@ShiftBench` (e.g., distribution‑shift benchmarks common in post‑2019 practice)
   *RowCL_min:* 2
   *Loss notes:* shift taxonomy differs; comparability depends on pinned protocol editions and window selection; “robustness” is not a scalar substitute for accuracy.

3. **Quality‑Diversity archive comparability (Measurement; RowScope = “DescriptorMap‑only”).**
   *Cells:* `MAP‑Elites grid indices` ↔ `CVT‑MAP‑Elites centroids` ↔ `CMA‑ME archive`
   *RowCL_min:* 2
   *Loss notes:* discretisation vs centroidal tessellation; archive pressure differs; drift occurs if `DistanceDef` or insertion policy changes.
   *Use:* lawful cross‑reporting of QD telemetry when edition pins are explicit.

4. **Open‑ended transfer semantics (Method; RowScope = “transfer‑rule intent”).**
   *Cells:* `POET‑class transfer rule` ↔ `Enhanced‑POET‑class transfer rule` ↔ “modern open‑ended transfer variants”
   *RowCL_min:* 2
   *Loss notes:* environment validity region differs; transfer timing and selection pressures differ; pinning transfer rule editions is mandatory for audit.
#### Extensions (pattern‑scoped; non‑core)

> Extensions carry *wiring only* (pins/editions/policy‑ids + which semantic owners are used). They MUST NOT redefine core invariants or defaults.

**GPatternExtension: MatrixIntake**

* **PatternScopeId:** `G.7:Ext.MatrixIntake`
* **GPatternExtensionId:** `MatrixIntake`
* **GPatternExtensionKind:** `InteropSpecific`
* **SemanticOwnerPatternId:** `G.2` *(BridgeMatrix semantics and comparable-construct inventory)*
* **Uses:** `{G.2, F.9}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum):**

  * `BridgeMatrixId` (and, if editioned: `BridgeMatrixRef.edition`)
  * `BridgeMatrixRowRef[]` *(row‑level anchors for intake; owner‑defined; e.g., `PatternScopeId` / `UTSRowId` / row ids)*
  * `ComparableConstructId[]` *(row keys; if the source does not supply a stable id, `G.7` mints one while preserving `BridgeMatrixRowRef` as the provenance anchor)*
  * `LossNoteRef[]?` *(if exported by `G.2`; otherwise authored in `G.7` and cited from the `CalibrationLedger`)*
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.CrossingBundleEdit, RSCRTriggerKindId.EvidenceSurfaceEdit, RSCRTriggerKindId.EditionPinChange}`
* **Notes (wiring‑only):** This module binds “row candidates” from G.2 to the BCT/Ledger intake without copying G.2 semantics into G.7.

**GPatternExtension: DHCAccounting**

* **PatternScopeId:** `G.7:Ext.DHCAccounting`
* **GPatternExtensionId:** `DHCAccounting`
* **GPatternExtensionKind:** `DisciplineSpecific`
* **SemanticOwnerPatternId:** `C.21` *(DHC metric semantics, including AlignmentDensity)*
* **Uses:** `{C.21}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum; conditional on use):**

  * `AlignmentDensityMethodRef.edition?`
  * `DeclaredUnitsRef?` *(units declaration style per owner; e.g., “bridges_per_100_DHC_SenseCells”)*
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.EditionPinChange}`
* **Notes (wiring‑only):**
  * G.7 stores the *counts and declared units* as a surface; C.21 owns the meaning and legality constraints.
  * When reporting AlignmentDensity, the counted bridge set is typically restricted to `CL ≥ 2` (treat `CL=3` as “free substitution”, `CL=2` as “guarded” for reporting); conformance is enforced by `CC‑G7‑DHC‑Units‑1` while semantics remain owned by `C.21`.

**GPatternExtension: QDParityPins**

* **PatternScopeId:** `G.7:Ext.QDParityPins`
* **GPatternExtensionId:** `QDParityPins`
* **GPatternExtensionKind:** `InteropSpecific`
* **SemanticOwnerPatternId:** `C.18` *(QD artefact semantics; uses C.19 for exploration/logging pins as needed)*
* **Uses:** `{C.18, C.19}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum; conditional on use):**

  * `DescriptorMapRef.edition`
  * `DistanceDefRef.edition`
  * `InsertionPolicyRef` *(policy id or pinned policy ref, per owner semantics)*
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.FreshnessOrDecayEvent}`
* **Notes (wiring‑only):** Enforces reproducibility of cross‑Context archive/illumination comparisons without pulling QD semantics into the core bridge kit.
  The pins from this module should be attached via `RowEntry.ExtensionPins[QDParityPins]` (or an equivalent extension‑pin map) and included in `BridgeSentinel.payloadPins` whenever the watched scope consumes QD telemetry.

**GPatternExtension: SoSLogClauses**

* **PatternScopeId:** `G.7:Ext.SoSLogClauses`
* **GPatternExtensionId:** `SoSLogClauses`
* **GPatternExtensionKind:** `InteropSpecific`
* **SemanticOwnerPatternId:** `C.23` *(SoS‑LOG rule and branch semantics; G.7 does not redefine meaning)*
* **Uses:** `{C.23, G.6}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum; conditional on use):**
  * `SoSLogRuleId[]` *(or owner‑equivalent ids)*
  * `FailureBehaviorPolicyId?` *(policy id, when degrade behavior is bound)*
  * `PathId/PathSliceId` citations for explainability (via `G.6`)
  * `BridgeCardId[]` (bridges whose reuse is being justified)
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.EvidenceSurfaceEdit, RSCRTriggerKindId.CrossingBundleEdit, RSCRTriggerKindId.MaturityRungChange}`
* **Notes (wiring‑only):** Ensures cross‑Tradition bridge reuse decisions can be justified by citing SoS‑LOG clauses and evidence paths, without embedding SoS‑LOG semantics into G.7.

**GPatternExtension: AcceptanceHooks**

* **PatternScopeId:** `G.7:Ext.AcceptanceHooks`
* **GPatternExtensionId:** `AcceptanceHooks`
* **GPatternExtensionKind:** `MethodSpecific`
* **SemanticOwnerPatternId:** `G.4` *(Acceptance/threshold/unknown handling; G.7 does not define thresholds)*
* **Uses:** `{G.4}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum; conditional on use):**
  * `AcceptanceClauseId[]` *(or owner‑equivalent ids)*
  * `AcceptancePolicyId?` *(policy id when acceptance behavior is pinned)*
  * `BridgeCardId[]` (bridges whose calibrated status is being used as a gate input)
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.BaselineBindingEdit, RSCRTriggerKindId.LegalitySurfaceEdit}`
* **Notes (wiring‑only):** When bridges are used as selector gates, thresholds and unknown-handling remain Acceptance-owned; this module only pins the linkage and refresh relevance.

**GPatternExtension: AdvancedCalibrationProcedures (Phase‑3 seed)**

* **PatternScopeId:** `G.7:Ext.AdvancedCalibrationProcedures`
* **GPatternExtensionId:** `AdvancedCalibrationProcedures`
* **GPatternExtensionKind:** `Phase3Seed`
* **SemanticOwnerPatternId:** `owner TBD`
* **Uses:** `{ }`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins:** `owner TBD`
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.CrossingBundleEdit, RSCRTriggerKindId.PenaltyPolicyEdit, RSCRTriggerKindId.ReferencePlaneEdit}`
* **Notes (seed; non‑normative):** Placeholder for domain‑specific / statistical calibration families beyond the minimal auditable procedure (e.g., uncertainty‑aware calibration, probabilistic mapping). No Part‑G‑wide norms are introduced.
### Archetypal Grounding (System / Episteme)

**System (Γ_sys):** *Cross‑standard safety assurance comparison (bridge‑first).*
A team must compare a safety assurance claim across two regulatory Traditions (e.g., a “functional safety case” tradition and a “ML system testing” tradition) for the *same physical system scope*. `G.7` forces explicit SenseCell‑level bridges (what exactly is the “hazard”, what is the “evidence carrier”, what is the “pass criterion”), records losses, pins planes, and provides sentinels so that changes in the safety evidence protocol editions trigger path‑local RSCR rather than re‑authoring the entire safety case.

**Episteme (Γ_epist):** *Benchmark protocol pluralism (post‑2015 evaluation practice).*
A research group wants to compare “state‑of‑the‑art” across multiple evaluation Traditions (IID performance, shift robustness, preference‑based evaluation). `G.7` turns “these are comparable” into explicit BridgeCards with declared row scope, pins the evaluation protocol editions, and emits sentinels so that when a benchmark protocol or policy pin changes, downstream selector decisions can be re‑audited by re‑citing the same PathSlice‑scoped evidence.
### Bias‑Annotation

Lenses tested: **Gov**, **Arch**, **Onto/Epist**, **Prag**, **Did**.
Scope: Universal for the bridge calibration kit; any method‑family or discipline‑specific calibration technique is modularized as `GPatternExtension` and cited to its semantic owners.
### Conformance Checklist (normative) — CC‑G7

| ConformanceId             | Requirement                                                                                                                                                                                                                                                                               | Purpose                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **CC‑G7‑CoreRef**         | `G.7` is conformant only if it satisfies the effective `G.Core` obligations declared by the `GCoreLinkageManifest` in **§4.1** (after nil‑elision and expansion of profile/set/pinset ids), including any explicit deltas listed there. | Make universal invariants single‑owner and enforce citation‑based reuse.       |
| **CC‑G7‑BCT‑1**           | For any active `TradPairId` with cross‑Tradition reuse, a `BridgeCalibrationTable (BCT)` **MUST** exist, declare a `FreshnessWindowRef`, and provide `RowEntry` records that cite, at minimum: `RowEntryId`, `ComparableConstructId`, `RowScopeId`, `BridgeCardId[]`, `RowCL_min`, `PlanePins {ReferencePlane(src), ReferencePlane(tgt)}`, `PolicyPins {Φ(CL)}` (and `Ψ(CL^k)?`, `Φ_plane?` when applicable), plus `{RegressionSetId, SentinelSetId}`. | Ensure the kit exists as an auditable object rather than a prose matrix.       |
| **CC‑G7‑BridgeCard‑1**    | Any bridge published by G.7 **MUST** be consumable as an **F.9** `BridgeCard` and **MUST** be SenseCell‑anchored (directly or via explicit SenseCell anchor refs).                                                                                                                        | Prevent “Context‑only” or ambiguous bridges.                                   |
| **CC‑G7‑UTS‑1**           | G.7 outputs **MUST** mint/publish UTS‑citable ids (NameCards/twin labels as applicable) for (a) each BridgeCard (or its NameCard) and (b) each GateCrossing/crossing row that makes bridge use checkable; and **MUST** expose the resulting `UTSRowId[]` in the BCT/Ledger/crossing bundles. *(UTS discipline is delegated to `CC‑GCORE‑UTS‑1`.)* | Make bridge calibration externally citable and checkable.                      |
| **CC‑G7‑RowScope‑1**      | Every BCT row **MUST** declare its `RowScopeId` (what notion of “sameness” is claimed), and any loss notes **MUST** be recorded as citable artefacts (refs/ids), not only narrative text.                                                                                                 | Keep reuse honest and locally bounded.                                         |
| **CC‑G7‑CLRegime‑1**      | Every BCT row **MUST** record `RowCL_min` (and `RowCL_k_min?`, `RowCL_plane_min?` where applicable) and apply the admissibility regime from §4.2.1: `≥2` admissible; `=1` only with cited `WaiverRef[]`; `=0` forbidden for reuse. The honesty rule must be satisfied: ≥1 counterexample for `≤2`, and an explicit stated‑absence disclosure for `=3` when no counterexample is cited. | Make CL/waiver/plane regimes explicit and auditable at kit level.              |
| **CC‑G7‑SCRLinkage‑1**    | Whenever bridge calibration is cited in SCR/Evidence surfaces, the citation **MUST** include `{BridgeCardId[]}` (or `UTSRowId[]` for the bridge artefacts), an explicit row locator (`RowEntryId` or equivalent), `{BCT.id, RegressionSetId}`, and the active policy id pins `{Φ(CL), Ψ(CL^k)?, Φ_plane?}` (ids only; representation owned elsewhere). | Prevent “pins exist but are not visible/auditable” failure mode.               |
| **CC‑G7‑SoSLOG‑Pins‑1**   | When `G.7:Ext.SoSLogClauses` is in use, G.7 outputs **MUST** expose the cited SoS‑LOG rule ids and the relevant `PathId/PathSliceId` evidence citations; any change in those pins **MUST** be RSCR‑relevant per `CC‑GCORE‑TRIG‑1…TRIG‑4`.                                               | Keep cross‑Tradition reuse explainable without embedding C.23 semantics.        |
| **CC‑G7‑Acceptance‑1**    | When `G.7:Ext.AcceptanceHooks` is in use, G.7 outputs **MUST** expose the Acceptance clause ids/policy ids used as gates; thresholds/unknown handling remain Acceptance-owned; any change **MUST** be RSCR‑relevant per `CC‑GCORE‑TRIG‑1…TRIG‑4`.                                           | Keep thresholds and unknowns out of bridges while preserving auditability.     |
| **CC‑G7‑RowBottleneck‑1** | If a comparable construct row aggregates multiple bridge cells, row summaries (e.g., `RowCL_min`) **MUST** follow bottleneck discipline (F.7) and cite a counterexample whenever a cell carries a loss note.                                                                              | Forbid “CL averaging” and enforce loss‑aware summaries.                        |
| **CC‑G7‑PolicyPins‑1**    | G.7 outputs **MUST** publish the *policy id pins* required to audit penalty routing and plane effects (ids only), as required by `CC‑GCORE‑LINK‑1/2` and `CC‑GCORE‑PEN‑1`. G.7 MUST NOT duplicate policy tables or redefine penalty semantics.                                           | Keep penalty routing auditable while preserving single‑owner policy semantics. |
| **CC‑G7‑GateCrossing‑1**  | Any published crossing rows that rely on bridges **MUST** be checkable via GateCrossing/CrossingBundle harnesses (E.18/A.21): required pins are present; lexical constraints and lane purity checks are runnable.                                                                        | Make crossings checkable, not narrative.                                       |
| **CC‑G7‑Sentinels‑1**     | G.7 **MUST** register `BridgeSentinel` entries for bridges used by live scopes and **MUST** emit typed RSCR triggers (canonical `RSCRTriggerKindId`; see `CC‑GCORE‑TRIG‑1…TRIG‑4`) on calibration‑relevant edits, scoped to the watched `PathSliceId[]` or `PatternScopeId[]`, with the minimum payload pins from §4.1. | Enable targeted refresh rather than pack‑wide reruns.                          |
| **CC‑G7‑QD‑Pins‑1**       | When `G.7:Ext.QDParityPins` is in use, G.7 outputs **MUST** include `{DescriptorMapRef.edition, DistanceDefRef.edition, InsertionPolicyRef}` and treat any change to those pins as RSCR‑relevant per `CC‑GCORE‑TRIG‑1…TRIG‑4`.                                                          | Prevent silent QD telemetry drift.                                             |
| **CC‑G7‑DHC‑Units‑1**     | When AlignmentDensity (or related DHC accounts) are reported, G.7 outputs **MUST** (a) restrict the counted bridge set to rows with `RowCL_min ≥ 2` (treat `CL=3` as “free substitution”, `CL=2` as “guarded” for reporting), (b) include declared units, and (c) cite the relevant DHC method semantics (C.21). G.7 MUST NOT invent arithmetic over ordinal/illegal surfaces. | Keep dashboards and discipline‑health metrics lawful and interpretable.        |
### Common Anti-Patterns and How to Avoid Them

* **Bridge‑by‑prose (“they mean the same thing”).**
  **Avoid:** publish BCT rows + BridgeCards + UTS rows; require SenseCell anchoring and row scopes.
* **SenseFamily jump (scope‑bridge used as kind‑bridge).**
  **Avoid:** keep channel/sense‑family constraints owned by **F.9** visible; use `RowScopeId` to state which channel is claimed, and require `CL^k` + `Ψ(CL^k)` pins when a kind‑channel bridge is invoked (do not “upgrade” a scope‑channel bridge into kind substitution).
* **Plane blindness (“concept = world”).**
  **Avoid:** record plane pins and policy id pins; keep plane effects auditable and separable from CL/CL^k semantics.
* **CL smoothing / averaging.**
  **Avoid:** enforce row bottleneck summaries and counterexample citations for loss‑noted cells.
* **Pack‑wide refresh on a local bridge edit.**
  **Avoid:** register sentinels scoped to `PathSliceId` and emit typed RSCR triggers with minimal payload pins.
* **QD metric drift by unpinned artefacts.**
  **Avoid:** enable `G.7:Ext.QDParityPins` only when needed and require edition/policy pins when enabled.
### Consequences

* **Auditable pluralism.** Cross‑Tradition reuse becomes explicit, loss‑aware, and checkable.
* **Targeted, edition‑aware refresh.** Calibration drift triggers path‑scoped RSCR rather than expensive global reruns.
* **Downstream cleanliness.** Selectors/logging/shipping can cite bridges and policy pins without inventing local crossing rules or shadow specs.
### Rationale

* **Why a kit (not a new governance card or legality gate)?** Bridge calibration must support many downstream consumers without becoming a competing legality gate; contract semantics remain owned by `CG‑Spec`/`CN‑Spec`.
* **Why BCT + RegressionSet + SentinelSet?** Because calibration without regression tests drifts silently, and regression without sentinels is operationally unusable (refresh becomes global).
* **Why row scopes?** Because “comparable” is not one thing; scope must be explicit to avoid accidental substitution.
### SoTA‑Echoing (post‑2015, for orientation; non‑normative)

* **Edition‑aware evaluation and dataset shift practice.** Post‑2018 evaluation culture (robustness and shift benchmarks, protocol pinning, reproducibility checklists) motivates treating protocol versions and “what changed” as first‑class pins rather than prose.
* **Preference‑based optimisation families.** Modern preference‑learning lines (late‑2010s → 2020s) show how neighbouring objectives can share intent but diverge in assumptions—an archetypal case for row scope + loss notes.
* **Quality‑Diversity and differentiable QD.** MAP‑Elites successors (CVT variants, CMA‑ME line, differentiable QD ecosystems) emphasise archive/descriptor/distance artefacts whose editions must be pinned for comparability.
* **Open‑ended evolution and transfer‑rule portfolios.** POET‑class work motivates explicit transfer rule editions and environment validity regions as pins when bridges are used for cross‑tradition reporting.
### Relations

**Builds on:** `G.Core`, `G.2`, `F.3`, `F.7`, `F.9`, `B.3`, `E.10`, `E.18`, `A.21`, `G.6`, `C.21`.
**Optionally uses via Extensions:** **G.4** (Acceptance hooks), **C.23** (SoS‑LOG clauses), **C.18/C.19** (QD/OEE pins).
**Used by / prerequisite for:** **G.5** (cross‑Tradition eligibility/selection), **G.11** (refresh orchestration), **G.9** (parity across Traditions where bridges are required), **G.10** (shipping surfaces that must cite bridge calibration ids), **G.12** (DHC dashboards when bridge counts/units are surfaced).
**Publishes to:** **UTS** (bridge and crossing rows; twin labels as applicable) and emits RSCR‑ready telemetry/trigger payloads for **G.11**.
**Constrains:** Any downstream consumer that claims cross‑Context/Tradition reuse must use the calibrated bridge artefacts/pins surfaced by this kit (core‑owned crossing invariants apply).
### G.7:End
## SoS‑LOG Bundles & Maturity Ladders

**Tag.** Architectural pattern (packaging kit).
**Stage.** Design‑time packaging (authoring & publication) with a run‑time consumption facade for `G.5` (selector/registry).
**Primary hooks:** `G.Core` (Part‑G invariants), `C.23` (SoS‑LOG semantics), `C.22` (TaskSignature), `G.4` (Acceptance & EvidenceProfiles), `G.6` (EvidenceGraph & `PathId/PathSliceId`), `G.5` (registry/selector), `G.11` (refresh orchestration), `G.10` (shipping boundary), `F.9` (BridgeCard & CL), `G.7` (bridge calibration & Φ/Ψ/Φ_plane), `F.8` (Policy pins: `PolicySpecRef`/`MintDecisionRef` resolvability), `A.10` (anchors), `E.10` (LEX twin registers), `E.5.2` (notational independence), `E.18/A.21/A.27` (GateCrossing visibility).

**Non‑duplication note (Phase‑2 universalization).** This pattern introduces **kit‑owned packaging surfaces** for SoS‑LOG bundles and maturity ladders. All **Part‑G‑wide invariants** (no shadow specs, Bridge‑only crossings + visibility, tri‑state guard domain, penalties→`R_eff`‑only, set‑return semantics, P2W split, typed RSCR triggers + alias docking, single‑owner defaults, shipping boundary) are **routed via `G.Core`** and are not restated here.

**Modularity note (policy‑id pins are reference‑only).** This kit may pin/cite policy ids (e.g., `Φ/Ψ/Φ_plane` policies, `FailureBehaviorPolicyId`, illumination‑promotion policy ids, and E/E‑LOG policy ids) **as references only**. Conformance relies on the policy‑pin resolvability discipline of `F.8:8.1` (i.e., policy ids are not “inlined”; and when newly minted, they are backed by resolvable `PolicySpecRef` + `MintDecisionRef`). `G.8` does not define policy semantics and MUST NOT silently mint policy ids.

### Problem frame

Method families compete within a `CG‑Frame`, but dispatch is only lawful if (i) admissibility decisions remain **tri‑state** and auditable, (ii) evidence and crossings are **explicitly citable** (by ids, not prose), and (iii) selection preserves **set/portfolio semantics** under partial orders. In practice, SoS‑LOG rules (`C.23`) and “maturity stories” are often distributed across prose, dashboards, and ad‑hoc checklists, with thresholds embedded where they do not belong and with missing pins for evidence paths, crossings, and editions.

This pattern provides the missing packaging kit: a **selector‑facing, UTS‑citable bundle** that binds **(a)** rule ids (semantics owned by `C.23`), **(b)** an ordinal/poset maturity ladder (published as a citable card), and **(c)** explicit wiring to Acceptance (`G.4`), EvidenceGraph (`G.6`), selection/registry (`G.5`), and refresh (`G.11`)—without creating any shadow contract surfaces.
### Problem

1. **Selector needs a stable input artefact.** `G.5` cannot consume “maturity narratives” and scattered SoS‑LOG snippets without re‑authoring semantics or inventing implicit defaults.
2. **Thresholds leak into LOG.** Numeric gates are often embedded directly into rule text or ladder rungs, blurring the boundary between LOG decisions (`C.23`) and Acceptance thresholds (`G.4`).
3. **Auditability is brittle.** Decisions (`pass/degrade/abstain`) lack stable, citable links to evidence paths (`G.6`) and crossing pins (Bridge/CL/Φ policy ids), so later re‑checks and RSCR become ad‑hoc.
4. **Telemetry contaminates decision semantics.** QD/OEE/illumination signals are frequently treated as dominance inputs without explicit policy pins; edition drift then silently changes outcomes.
5. **Refresh is under‑specified.** Bundle evolution (rules, ladders, pins, policies, editions) must be RSCR‑addressable via typed trigger kinds, not by free‑text “reasons”.
### Forces

| Force                                        | Tension                                                                                                      |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Pluralism vs. dispatchability**            | Preserve multiple method families and partial orders ↔ still provide a consumable artefact for `G.5`.        |
| **Auditability vs. authoring friction**      | Fine‑grained pins and citations ↔ keeping authoring lightweight and notation‑independent.                    |
| **Maturity as poset vs. scalar ranking**     | Maturity is inherently non‑scalar ↔ teams want a “single readiness number”.                                  |
| **Telemetry richness vs. decision hygiene**  | Rich QD/OEE telemetry ↔ avoid illegitimate promotion into dominance without explicit policy.                 |
| **Design‑time packaging vs. run‑time trace** | Authoring produces stable bundles ↔ run‑time produces branch‑specific path traces and admissibility ledgers. |
| **Interoperability vs. crossing discipline** | Reuse across contexts/planes ↔ prevent implicit crossings (Bridge‑only + visible).                           |
### Solution — Publish SoS‑LOG bundles and maturity cards as UTS‑citable kit

#### G.Core linkage (normative)

**Builds on:** `G.Core` (Part‑G core invariants; routing/delegation hub)

**GCoreLinkageManifest (normative; size‑controlled).**
*(Canonical shape, Nil‑elision, and Expansion rule are per `G.Core:4.2`.)*

**Separation rule (Phase‑2).** Method‑/generator‑specific pins are **normatively specified** only inside `Extensions` as `GPatternExtension` modules (see `G.8:5.*`). The bundle/ledger schema may mention such fields only as **extension‑gated optionals**, with the authoritative pin/edition/policy requirements stated in the corresponding extension block. The core linkage manifest lists only base‑kit pins and Part‑G‑wide linkage.

`GCoreLinkageManifest := ⟨
CoreConformanceProfileIds := {
GCoreConformanceProfileId.PartG.AuthoringBase,
GCoreConformanceProfileId.PartG.TriStateGuard,
GCoreConformanceProfileId.PartG.UTSWhenPublicIdsMinted,
GCoreConformanceProfileId.PartG.ShippingBoundary
},

RSCRTriggerSetIds := { GCoreTriggerSetId.EvidenceGraphKit },

CorePinSetIds := {
GCorePinSetId.PartG.AuthoringMinimal,
},

CorePinsRequired := {
  // Pattern-owned public ids (strengthen conditional pins where G.8 publishes UTS artefacts)
  UTSRowId[],                    // bundle/ledger/card rows + any referenced UTS rows
  SoS‑LOGBundleRef,
  SoSLogRuleId[],
  MethodFamilyId,
  HomeContext,

  // Closed value sets (ids only; UTS-registered)
  DegradeModeEnum,
  MaturityRungs,

  // Maturity ladder pins
  MaturityCardRef,               // required; recommended: published as separate UTS artefact
  MaturityRungId?,               // iff a specific rung is asserted at packaging/run-time

  // Evidence / provenance pins
  A10EvidenceGraphRef?[],        // packaging-time A.10 carriers (when PathId/PathSliceId not yet available)
  EvidenceGraphId?,              // iff resolvable to G.6 EvidenceGraph
  PathId[]/PathSliceId[]?,       // run-time ledgers typically have them

  // Authoring traceability (SoTA-of-description)
  AuthoringMethodDescriptionRefs?[],  // edition-pinned method-description refs
},

DefaultsConsumed := {
DefaultId.PortfolioMode,
DefaultId.DominanceRegime,
DefaultId.GammaFoldForR_eff
},
⟩`

*(RSCR payload pins typically include: `SoS‑LOGBundleRef`, `SoSLogRuleId[]`, `MaturityRungId?`, and `EvidenceGraphId/PathId/PathSliceId?`.  
Crossing payload pins (Bridge/CL/Φ/Ψ/Φ_plane) are introduced **only when reuse is asserted**, via `G.8:Ext.BridgeReuseWiring`.  
Method-/generator‑specific payload pins are listed only inside the relevant `GPatternExtension` blocks in `G.8:5`.)*

*(Conditionality note for defaults.)* Include `DefaultId.GammaFoldForR_eff` in `DefaultsConsumed` **only if** the bundle/ledger exports aggregated `R_eff` summaries (otherwise Nil‑elide it).
#### Kit: objects and naming discipline (LEX heads; twin‑register safe)

**Objects / surfaces (pattern‑owned).**

* **`SoS‑LOG.Rule`**
  A rule id that denotes an executable tri‑state decision schema `{pass | degrade(mode) | abstain}` for `(TaskSignature, MethodFamily)`. *(“pass” may be described as “admit” in prose, but the normative tri‑state vocabulary is `G.Core`’s `{pass|degrade|abstain}`.)*
  **Semantics are owned by `C.23`.** `G.8` only packages rule ids and binding pins.

* **`SoS‑LOGBundle@Context`**
  A selector‑facing, notation‑independent packaging object published to UTS.

* **`AdmissibilityLedger@Context`**
  A run‑time ledger view that records admissibility outcomes, cited evidence paths, branch tokens, and the pins required for audit/refresh.

* **`MethodFamily.MaturityCardDescription@Context`**
  A maturity ladder description published as a citable artefact: **ordinal/poset**, closed rungs, `ReferencePlane` declared; no thresholds inside.

**Naming discipline (E.10 + “Spaces ≠ Maps”).**

* Technical heads are normative; Plain twins are didactic only and MUST NOT cross kinds.
* Do **not** alias `CharacteristicSpace` and `DescriptorMap`.

  * `DescriptorMapRef` is a **map‑reference** (typically used with QD archives).
  * `CharacteristicSpaceRef` is a **space‑reference** (grid/cell semantics, if used).
* Editions are pinned on `…Ref.edition` fields (not on informal names).
#### SoS‑LOGBundle@Context schema (conceptual; notation‑independent)

A conforming bundle is a UTS‑published object whose internal representation is free, but whose **field meanings** are stable:

```
SoS-LOGBundle@Context :=
⟨
  UTS.id := SoS‑LOGBundleRef,
  Edition,

  // Scope + contract pins (from GCorePinSetId.PartG.AuthoringMinimal)
  CG-FrameContext,
  describedEntity := ⟨GroundingHolon, ReferencePlane⟩,
  CNSpecRef.edition,
  CGSpecRef.edition,

  MethodFamilyId,
  HomeContext,

  SoSLogRuleId[] ,               // ids only; semantics owned by C.23
  ClosedEnums: {DegradeModeEnum, MaturityRungs},  // ids only; UTS-registered closed value sets
  A10EvidenceGraphRef?[] ,        // packaging-time evidence carriers (A.10 anchors) when paths are not yet stable
  MaturityCardRef ,               // UTS ref to maturity card (required; may be embedded but MUST be citable)
  MaturityRungId? ,               // if a specific rung is asserted at packaging time

  // Optional: Acceptance wiring (thresholds remain owned by G.4)
  AcceptanceClauseId[]? ,

  // Optional: Evidence wiring (for later audit & rung transition justification)
  EvidenceGraphId? ,
  PathId[]/PathSliceId[]? ,

  // Optional: cross-context/plane wiring (only when reuse is asserted)
  BridgeId/BridgeCardId? ,
  CL/CL^k/CL^plane? ,
  Φ/Ψ/Φ_plane policy-ids? ,

  // Optional: selector semantics pins (explicit value or resolved via DefaultOwnershipIndex)
  PortfolioMode? ,
  DominanceRegime? ,

  // Optional: QD / OEE pins (only when those surfaces are declared)
  CharacteristicSpaceRef.edition? ,
  DescriptorMapRef.edition? ,
  DistanceDefRef.edition? ,
  EmitterPolicyRef? ,
  InsertionPolicyRef? ,
  // Optional: Open-ended pins (only when those surfaces are declared)
  GeneratorFamilyId? ,
  EnvironmentValidityRegionId? ,
  CouplerPolicyId? ,
  TransferRulesRef.edition? ,

  // Optional: branch/failure wiring (policy-bound)
  FailureBehaviorPolicyId? ,
  SoSLogBranchId[]? ,

  // Optional: authoring traceability (SoTA-of-description)
  AuthoringMethodDescriptionRefs?[] ,

  Notes
⟩
```

**Bundle discipline (normative intent; semantics routed):**

* `SoS‑LOGBundle@Context` **does not introduce** new legality or normalization rules; it cites the pinned references above.
* Thresholds and numeric gates are cited by id from `G.4` Acceptance (no embedding inside the bundle).
* If cross‑context/plane reuse is asserted, crossing pins are made explicit (Bridge/CL/Φ policy ids), and evidence paths are citable when available.

**Binding obligations B1–B5 (packaging‑only; wiring‑only; semantics routed):**

* **B1 — Evidence wiring.** At packaging time the bundle SHOULD provide resolvable evidence refs (typically `A10EvidenceGraphRef?[]` and/or `EvidenceGraphId?`). At run time, admissibility outcomes SHOULD cite `PathId/PathSliceId` when available (`G.6`), so rung transitions and `degrade/abstain` traces are audit‑stable.
* **B2 — CL/plane routing pins.** When reuse across Context/plane is asserted, the bundle/ledger MUST pin the relevant Bridge/CL/Φ/Ψ/Φ_plane policy ids (reference‑only; resolvable per `F.8:8.1`) and MUST respect the core penalty routing (penalties affect `R_eff` only; `F/G` invariance via `G.Core`).
* **B3 — Portfolio/QD fields.** If the bundle/ledger exposes QD/portfolio fields (e.g., `PortfolioMode=Archive`), it MUST pin the descriptor/distance/insertion/emitter artefacts (editions/policies as applicable). Illumination remains **report‑only** unless explicitly promoted by a `G.4` owner policy id that is pinned and recorded in the run‑time trace.
* **B4 — Open‑ended fields.** If the bundle binds an open‑ended generator family, it MUST pin `GeneratorFamilyId` and `TransferRulesRef.edition` (and any validity region/coupler policy ids when used). Unknown transfer validity MUST route to `degrade`/branching, not to an ad‑hoc fourth status.
* **B5 — Telemetry hooks.** On any material telemetry event (illumination increase, archive insertion, probe accounting update, open‑ended coverage/regret proxy update), the emitted telemetry pins SHOULD include the controlling policy ids plus the relevant edition pins (e.g., `DescriptorMapRef.edition`, `DistanceDefRef.edition`, `TransferRulesRef.edition`) and, when available, `PathSliceId` to keep RSCR planning auditable.
#### AdmissibilityLedger@Context (run‑time view; selector‑facing)

A conforming ledger is a UTS‑published view (or a view‑projection of a Work/Audit artefact) with rows of the form:

`⟨ MethodFamilyId, SoSLogRuleId, GuardDecision ∈ {pass|degrade|abstain}, DegradeMode?/SoSLogBranchId[]?, MaturityRungId?, AcceptanceClauseId[]?, EvidencePathRefs?, CrossingPins?, PortfolioMode?, DominanceRegime?, Edition ⟩`

Where `EvidencePathRefs` are typically `PathId[]/PathSliceId[]` when `G.6` is in use (or resolvable), and “CrossingPins” are the explicit Bridge/CL/Φ policy pins when reuse is asserted.
#### Maturity ladder as a citable poset (published card)

`MethodFamily.MaturityCardDescription@Context` is published with:

* closed rungs (UTS‑registered identifiers),
* `Scale kind = ordinal` and a declared `ReferencePlane`,
* (optional) explicit poset edges / precedence constraints,
* rung transition justifications that cite evidence paths (typically `G.6` paths).

This card is a **description** suitable for dispatch/audit and refresh; it is not a competing contract surface.
#### Interfaces (minimal I/O standard; conceptual)

| Interface                               | Consumes                                                                                   | Produces                                                                              |
| --------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| **G.8‑1 `Publish_LOGBundle`**           | `MethodFamilyId`, `SoSLogRuleId[]` (C.23), pins to Acceptance/Evidence/Crossings (as applicable) | `SoS‑LOGBundle@Context` (UTS row)                                                     |
| **G.8‑2 `Publish_AdmissibilityLedger`** | Bundle + run‑time branch outcomes + evidence path refs (when available)                    | `AdmissibilityLedger@Context` (UTS row or UTS‑citable view)                           |
| **G.8‑3 `Publish_MaturityCard`**        | Ladder description + (optional) evidence path refs for rung transitions                    | `MaturityCardDescription@Context` (UTS row; editioned)                                |
| **G.8‑4 `Expose_TelemetryHooks`**       | QD/OEE/archive/open‑ended telemetry signals (when declared)                                | telemetry pins for refresh (`…Ref.edition`, policy‑ids, `PathSliceId` when available) |
### Extensions (pattern‑scoped; non‑core)

`G.8` keeps method/generator specificity out of the core kit. Any such specificity appears as `GPatternExtension` blocks with stable **PatternScopeId**s.

#### G.8:Ext.SoSLOGWiring

**PatternScopeId:** `G.8:Ext.SoSLOGWiring`
**GPatternExtensionId:** `SoSLOGWiring`
**GPatternExtensionKind:** `MethodSpecific`
**SemanticOwnerPatternId:** `C.23`
**Uses:** `{C.23}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `SoSLogRuleId[]`
* `SoSLogBranchId[]?`
* `FailureBehaviorPolicyId?` *(when degrade behaviour is policy‑bound)*

**RSCRTriggerSetIds / RSCRTriggerKindIds:** `∅` *(covered by `G.8:4.1`)*
**Notes (wiring‑only):**
* Rule meaning, branch taxonomy, and “probe/sandbox” semantics are owned by `C.23`; this module only binds ids and pins.
#### G.8:Ext.AcceptanceWiring

**PatternScopeId:** `G.8:Ext.AcceptanceWiring`
**GPatternExtensionId:** `AcceptanceWiring`
**GPatternExtensionKind:** `MethodSpecific`
**SemanticOwnerPatternId:** `G.4`
**Uses:** `{G.4}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `AcceptanceClauseId[]`
* `EvidenceProfileId[]?` *(if the ledger/bundle cites evidence profile ids rather than only paths)*
* `PromotionPolicyId?` *(only if telemetry may be promoted into dominance by explicit CAL policy)*

**RSCRTriggerKindIds (optional delta):** `{RSCRTriggerKindId.PolicyPinChange}` *(only if acceptance policies are pinned as ids in the bundle/ledger)*
**Notes (wiring‑only):**
* Thresholds remain owned by `G.4` Acceptance; this module carries only clause ids and policy pins.
#### G.8:Ext.BridgeReuseWiring

**PatternScopeId:** `G.8:Ext.BridgeReuseWiring`
**GPatternExtensionId:** `BridgeReuseWiring`
**GPatternExtensionKind:** `InteropSpecific`
**SemanticOwnerPatternId:** `G.7`
**Uses:** `{G.7, F.9}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `BridgeId/BridgeCardId`
* `CL/CL^k/CL^plane`
* `Φ/Ψ/Φ_plane policy-ids`
* `BridgeCalibrationTableId?`, `RegressionSetId?` *(if cited as calibration evidence)*

**RSCRTriggerSetIds:** `{GCoreTriggerSetId.BridgeCalibrationKit}` *(only if the bundle/ledger explicitly binds calibration artefacts by id)*
**Notes (wiring‑only):**
* Present only when `SoS‑LOGBundle@Context` asserts cross‑Context/plane reuse. No additional crossing semantics are defined here.
#### G.8:Ext.QDArchiveTelemetry

**PatternScopeId:** `G.8:Ext.QDArchiveTelemetry`
**GPatternExtensionId:** `QDArchiveTelemetry`
**GPatternExtensionKind:** `MethodSpecific`
**SemanticOwnerPatternId:** `C.18`
**Uses:** `{C.18, G.5}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `DescriptorMapRef.edition`
* `DistanceDefRef.edition`
* `EmitterPolicyRef`
* `InsertionPolicyRef`
* `CharacteristicSpaceRef.edition?` *(required iff cell boundaries / de‑dup / parity depend on the space definition)*

**RSCRTriggerKindIds:** `{RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange}`
**Notes (wiring‑only):**
* Archive/illumination signals are telemetry; promotion into dominance is only via explicit `G.4` policy pins.
#### G.8:Ext.ExploreExploitTelemetry

**PatternScopeId:** `G.8:Ext.ExploreExploitTelemetry`
**GPatternExtensionId:** `ExploreExploitTelemetry`
**GPatternExtensionKind:** `MethodSpecific`
**SemanticOwnerPatternId:** `C.19`
**Uses:** `{C.19}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `ExploreExploitBudgetPolicyId?`
* `ProbeAccountingId?`

**RSCRTriggerKindIds:** `{RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.PolicyPinChange}`
**Notes (wiring‑only):**
* When “probe/sandbox” is used, the controlling policy ids are pinned and recorded in the ledger/bundle trace.
#### G.8:Ext.OpenEndedWiring

**PatternScopeId:** `G.8:Ext.OpenEndedWiring`
**GPatternExtensionId:** `OpenEndedWiring`
**GPatternExtensionKind:** `GeneratorSpecific`
**SemanticOwnerPatternId:** `G.5` *(generator family registry surface; algorithm semantics remain external to Part‑G core)*
**Uses:** `{G.5}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `GeneratorFamilyId`
* `TransferRulesRef.edition`
* `EnvironmentValidityRegionId?`
* `CouplerPolicyId?`

**RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta}`
**Notes (wiring‑only):**
* Open‑ended coverage/regret (or similar) remains telemetry unless explicitly promoted by an owner policy.
### Archetypal Grounding (System / Episteme)

**Show‑A — Tri‑state admissibility with set‑valued selection (multi‑criteria).**
A CG‑Frame hosts multiple offline/robust decision families (e.g., conservative offline RL and transformer‑based policy models post‑2020). The bundle publishes `RuleId[]` (SoS‑LOG semantics in `C.23`), cites `AcceptanceClauseId[]` for any floors (owned by `G.4`), and emits an `AdmissibilityLedger` whose rows cite `PathSliceId` (when available) for each `pass/degrade/abstain`. `G.5` consumes the ledger and returns a **portfolio set** under the declared partial order—no scalar “winner”.
**Show‑A — Tri‑state admissibility with set‑valued selection (multi‑criteria).**
A CG‑Frame hosts multiple offline/robust decision families (e.g., conservative offline RL and transformer‑based policy models post‑2020). The bundle publishes `SoSLogRuleId[]` (SoS‑LOG semantics in `C.23`), cites `AcceptanceClauseId[]` for any floors (owned by `G.4`), and emits an `AdmissibilityLedger` whose rows cite `PathSliceId` (when available) for each `pass/degrade/abstain`. `G.5` consumes the ledger and returns a **portfolio set** under the declared partial order—no scalar “winner”.

**Show‑B — QD archive dispatch with edition‑pinned descriptors (post‑2015 QD families).**
A method family uses a modern QD line (e.g., CMA‑ES‑driven archives, differentiable QD variants, and large‑scale JAX‑style QD toolchains). The bundle pins `DescriptorMapRef.edition` and `DistanceDefRef.edition`, plus insertion/emitter policies. Illumination metrics are logged as telemetry; any promotion into dominance is only via explicit CAL policy pins (recorded in the admissibility trace).

**Show‑C — Open‑ended environment–method co‑evolution (post‑2018 open‑ended families).**
A generator family operates in an open‑ended setting (e.g., POET‑style and PAIRED‑style regimes). The bundle carries `TransferRulesRef.edition` and validity region pins; unknown transfer validity triggers a `degrade` branch rather than an ad‑hoc fourth status. Telemetry (coverage/regret proxies) is emitted for refresh planning, not silently turned into dominance.
### Bias‑Annotation

Lenses tested: **Gov**, **Arch**, **Onto/Epist**, **Prag**, **Did**.
Scope: packaging kit only. Rule semantics remain owned by `C.23`; thresholds remain owned by `G.4`; evidence path semantics remain owned by `G.6`; selection semantics remain owned by `G.5`.
### Conformance Checklist (CC‑G8)

* **CC‑G8‑CoreRef (G.Core conformance bridge).**
  A conforming `G.8` SHALL satisfy the **effective** set of `CC‑GCORE‑*` obligations implied by `G.8:4.1` (expanded per `G.Core:4.2`), including required pins, trigger sets, and default‑ownership routing.

* **CC‑G8‑1 (No thresholds in LOG).**
  Any numeric gate, maturity floor, or threshold SHALL be authored as a `G.4` Acceptance artefact and cited by id; the LOG bundle/ladder SHALL NOT embed thresholds.

* **CC‑G8‑2 (Tri‑state discipline; delegated).**
  Guard outcomes SHALL obey the tri‑state domain and unknown handling defined in `G.Core` (delegation to `CC‑GCORE‑GUARD‑1`).  
  Any sandbox/probe‑only behaviour SHALL be represented as an explicit `C.23` branch and MUST pin (and record) the controlling policy id (typically an E/E‑LOG policy id via `C.19`), rather than inventing a fourth status or silently coercing unknowns.

* **CC‑G8‑3 (Path citation when evidence is path‑addressable).**
  When `G.6` is in use (or resolvable), every recorded `pass/degrade/abstain` outcome in the `AdmissibilityLedger` MUST cite `PathId/PathSliceId` (run‑time). At packaging time, the bundle/ledger SHALL at minimum provide resolvable evidence refs (e.g., `EvidenceGraphId?` + anchor refs).

* **CC‑G8‑4 (Crossing visibility and penalty routing; delegated).**
  Any cross‑Context/plane reuse asserted by the bundle/ledger SHALL satisfy the core crossing visibility and penalty routing invariants (delegation to `CC‑GCORE‑CROSS‑1` and `CC‑GCORE‑PEN‑1`).

* **CC‑G8‑5 (Portfolio/dominance hygiene; delegated).**
  The bundle/ledger SHALL treat portfolio/dominance fields as pinned inputs and SHALL route any omitted defaults via the single‑owner Default Ownership Index (delegation to `CC‑GCORE‑DEF‑1` and `CC‑GCORE‑SET‑1`; owners include `CC‑G5.23` for `DefaultId.PortfolioMode` and `CC‑G5.28` for `DefaultId.DominanceRegime`). It MUST NOT restate default values locally.  
  If the bundle/ledger records telemetry that could influence dispatch (e.g., illumination/QD/OEE/open‑ended proxies), such telemetry SHALL remain report‑only unless explicitly promoted by a `G.4` owner policy id that is pinned and recorded in the run‑time trace.

* **CC‑G8‑6 (QD/OEE edition discipline).**
  When QD/OEE surfaces are declared, the bundle/ledger MUST pin the relevant editions and policies (`DescriptorMapRef.edition`, `DistanceDefRef.edition`, insertion/emitter policies, and `TransferRulesRef.edition` when applicable).  
  `CharacteristicSpaceRef.edition` is **required iff** cell boundaries / de‑dup rules / parity depend on the space definition, and MUST NOT be used as a substitute for `DescriptorMapRef.edition`.

* **CC‑G8‑7 (Maturity is ordinal/poset).**
  Maturity ladders SHALL be authored as ordinal/poset descriptions with **closed** rung ids (`MaturityRungs`, UTS‑registered) and a declared `ReferencePlane`, and SHALL be published as a citable UTS artefact (editioned; twin‑register safe).  
  Rung transitions, when asserted, MUST be justifiable by citable evidence paths (when available).

* **CC‑G8‑8 (Spaces ≠ Maps).**
  `CharacteristicSpace` and `DescriptorMap` SHALL remain strictly distinct kinds; naming and twin‑register discipline must be respected.

* **CC‑G8‑9 (Notational independence).**
  The bundle, ledger, and maturity card SHALL remain notation‑independent (per `E.5.2`); any serialization choice is non‑normative and belongs outside Part‑G core.

* **CC‑G8‑10 (MOO cross‑reference).**
  When a LOG bundle is used to drive or justify a produced portfolio outcome, the producing Work/Audit artefact SHOULD cite the controlling mechanism ids (e.g., parity/shipping/refresh artefact ids) and relevant policy pins; no “black box” provenance.

* **CC‑G8‑11 (SoTA‑of‑description trace).**
  If authoring methods (e.g., discovery, clustering, summarisation) materially shaped rule text or rung definitions, the bundle/card SHOULD cite their method description refs (edition‑pinned) to support cross‑stance traceability.
### Common Anti‑Patterns and How to Avoid Them

* **Anti‑pattern:** Embedding thresholds inside SoS‑LOG rules or ladder rungs.
  **Avoid:** thresholds live in `G.4` Acceptance; bundle only cites clause ids.

* **Anti‑pattern:** Treating illumination/QD telemetry as a hidden scalar score that changes dominance.
  **Avoid:** keep telemetry report‑only unless explicitly promoted by an owner policy pin.

* **Anti‑pattern:** Publishing a bundle that “implies” cross‑context reuse without Bridge/CL/Φ pins.
  **Avoid:** if reuse is asserted, publish the crossing pins; otherwise downstream must abstain from reuse.

* **Anti‑pattern:** Re‑defining `PortfolioMode`/`DominanceRegime` defaults in the bundle text.
  **Avoid:** cite the single owners via `G.Core.DefaultOwnershipIndex`.

* **Anti‑pattern:** Recording RSCR “reasons” as prose labels only.
  **Avoid:** emit canonical `RSCRTriggerKindId` values per `G.Core`.
### Consequences

* **Positive:** `G.5` receives a stable, citable, selector‑facing artefact without importing rule semantics or threshold logic.
* **Positive:** Audit and refresh become tractable: pins, crossings, evidence paths, and trigger kinds are explicit.
* **Positive:** Maturity remains non‑scalar, reducing illegitimate aggregation and “readiness theater”.
* **Negative:** Requires stricter authoring discipline (UTS publication, pin completeness, explicit wiring).
* **Negative:** If evidence paths are not maintained (`G.6` absent), auditability degrades and downstream must rely on weaker refs or abstain.
### Rationale

`C.23` owns **rule semantics**, `G.4` owns **thresholding/acceptance**, `G.6` owns **path‑addressable provenance**, and `G.5` owns **selection/registry semantics**. Without a dedicated packaging kit, projects either (i) duplicate semantics inside ad‑hoc “decision bundles” (creating shadow specs), or (ii) leave dispatch un‑auditable. `G.8` keeps these boundaries strict while providing a single, consumable surface.
### SoTA‑Echoing (informative; post‑2015 practice alignment)

This pattern’s separation of **decision rules**, **acceptance thresholds**, **provenance paths**, and **set‑valued outputs** echoes post‑2015 practice in:

* **Set‑valued / portfolio‑first selection** (multi‑objective and uncertainty‑aware regimes; avoiding forced scalar winners).
* **Quality‑Diversity and archive‑based evaluation** (post‑2015 QD variants emphasize edition‑pinned descriptors/distances and telemetry‑driven refresh).
* **Open‑endedness / curriculum generation** (post‑2018 lines emphasize explicit transfer rules, safe degrade branches, and telemetry‑driven orchestration rather than hidden gates).
* **Reproducibility‑aware publishing** (explicit identifiers, pinned editions/policies, citable traces rather than prose‑only decision rationales).

*(Examples are illustrative; they do not introduce new Part‑G‑wide norms.)*
### Relations

**Builds on:** `G.Core`, `C.23`, `G.4`, `G.6`, `G.5`, `C.22`
**Uses:** `A.10` (anchors), `F.8` (policy-id resolvability), `F.9` + `G.7` (when cross‑Context/plane reuse is asserted), `G.11` (refresh planning/trigger consumption), `G.10` (shipping boundary; if bundled artefacts are shipped), `E.10` (LEX twin registers), `E.5.2` (notation independence), `E.18/A.21/A.27` (GateCrossing visibility); optional `C.18` (QD) / `C.19` (E/E‑LOG) when those surfaces are declared.
**Publishes to:** `UTS` (bundle/ledger/card), `G.5` (selector/registry consumption), `G.11` (refresh via typed triggers and pinned telemetry)
**Constrains:** any SoS‑LOG packaging that claims FPF conformance for selector‑facing dispatch across method families.
### Author’s quick checklist (informative)

* [ ] `RuleId[]` are ids only; rule semantics are owned by `C.23` (no re-definition in this bundle).
* [ ] `SoSLogRuleId[]` are ids only; rule semantics are owned by `C.23` (no re-definition in this bundle).
* [ ] Any numeric gates/thresholds are `G.4` Acceptance artefacts cited by id (no thresholds embedded in LOG or rungs).
* [ ] Evidence is citable: at run time use `PathId/PathSliceId` when available; at packaging time provide resolvable `A10EvidenceGraphRef?[]` / `EvidenceGraphId?`.
* [ ] Any cross‑Context/plane reuse is explicit: `BridgeId/BridgeCardId`, `CL/CL^k/CL^plane`, and `Φ/Ψ/Φ_plane` policy ids are pinned (policy ids resolvable per `F.8:8.1`).
* [ ] Portfolio/dominance defaults are not restated: route via `G.Core.DefaultOwnershipIndex` (owners live outside `G.8`, typically `G.5`).
* [ ] QD pins are edition/policy pinned (`DescriptorMapRef.edition`, `DistanceDefRef.edition`, insertion/emitter policies); `CharacteristicSpaceRef.edition` is pinned iff cell boundaries/de‑dup/parity depend on it; **Spaces ≠ Maps**.
* [ ] If open‑ended surfaces are declared, pin `GeneratorFamilyId`, `TransferRulesRef.edition`, and any validity/coupler policy ids; unknown transfer validity routes to `degrade`/branching (no “fourth status”).
* [ ] `MaturityRungs` is a closed, UTS‑registered set; the maturity ladder is ordinal/poset with a declared `ReferencePlane`; rung transitions cite evidence.
* [ ] RSCR triggers are emitted as canonical `RSCRTriggerKindId` values (no prose-only “reasons”).
* [ ] Notation independence (`E.5.2`) and twin‑register discipline (`E.10`) are respected for all published heads/ids.
* [ ] If authoring tools materially shaped rule/rung content, cite `AuthoringMethodDescriptionRefs?[]` (edition‑pinned) for cross‑stance traceability.
### G.8:End
## G.9 — Parity / Benchmark Harness

### G.9:0 — Use this when

- rival method families, portfolios, or adaptation paths must be compared under one declared baseline set and freshness window
- you need parity to publish one reproducible report rather than one opaque benchmark score
- downstream selection must recover comparator, normalization, bridge, and evidence pins without relying on one hidden scoring sheet
### G.9:0.1 — What goes wrong if missed

- benchmark numbers mix different windows, baselines, or comparator editions and still pretend to be comparable
- cross-context reuse or normalization mapping stays hidden until a disagreement appears downstream
- parity flattens a partial order into one scalar winner and silently changes what the comparison means
### G.9:0.2 — What this buys

- one `ParityPlan@Context` that fixes baseline, freshness, comparator, and bridge discipline up front
- one `ParityReport@Context` that echoes the active pins, outcomes, and evidence trace by value
- one harness that downstream selection can consume without inventing new legality gates or shadow governance cards

Illumination, coverage, and regret remain telemetry by default. If they are promoted into dominance, that promotion must be one explicit policy-bound choice rather than one hidden scoring convenience.
### G.9:1 — Intent

Provide a **notation‑independent** harness that:

* plans parity runs with explicit scope (`describedEntity`, `ReferencePlane`, window), explicit governance, legality, and comparator references (`CNSpecRef`, `CGSpecRef`, `ComparatorSpecRef`) and explicit reproducibility pins (editions + policy‑ids);
* executes parity in a way that is consumable by **G.5** (portfolio/set outcomes, DRR/SCR evidence trace);
* publishes **ParityReport@Context** suitable for downstream consumption, shipping, and refresh/RSCR wiring.
### G.9:2 — Problem frame

Parity claims become non‑reproducible or non‑comparable when any of the following are implicit:

* evidence window / freshness regime,
* comparator semantics (including any normalization / comparability mapping),
* method‑family “measurement” edition pins (incl. DHC method/spec),
* cross‑Context reuse (bridges / plane routing / CL penalties),
* dominance/portfolio interpretation rules,
* gate outcomes (why a run abstained or degraded).

G.9’s role is to force these to be **pinned and publishable** as a *method of obtaining outputs* (MOO) without introducing new contract surfaces.
### G.9:3 — Forces

* **Pluralism vs comparability.** Multiple Traditions must be comparable *without semantic collapse*.
* **Partial orders.** Many targets are only partially ordered; parity reporting must preserve lawful outcome shape (often portfolios/archives rather than a single scalar).
* **Edition sensitivity.** Parity must be robust to silent drift in measurement/comparator definitions. When DHC/QD/OEE modes are used, the required definition pins are introduced only via the corresponding `Extensions` blocks (nil‑elision when unused).
* **Telemetry vs objectives.** IlluminationSummary and coverage/regret are telemetry: **report‑only by default**; dominance changes require explicit CAL policy ids (recorded in audit pins).
* **GateCrossing visibility.** Any crossings/gates used by parity must be visible and auditable via CrossingBundle + GateCrossing checks; failures block parity publication/consumption.
* **Cross‑Context reuse.** Any reuse across contexts/planes must be explicit, auditable, and penalty‑routed.
* **Refreshability.** Parity must emit RSCR‑relevant causes as canonical ids, with enough pins to re‑run.
### G.9:4 — Solution

#### G.9:4.0 — G.Core linkage (normative)

This pattern is **core‑invariant‑bearing** and therefore binds to **G.Core** by declaration (not by restating invariants here).

**GCoreLinkageManifest (G.9)** *(normative; expands per `G.Core:4.2`)*  
Effective obligations/pins/triggers are computed as **union(expand(sets), explicit deltas)** under `Nil‑elision`.

* `CoreConformanceProfileIds` := {
  `GCoreConformanceProfileId.PartG.AuthoringBase`,
  `GCoreConformanceProfileId.PartG.TriStateGuard`,
  `GCoreConformanceProfileId.PartG.ShippingBoundary`,
  `GCoreConformanceProfileId.PartG.UTSWhenPublicIdsMinted`
  }

* `RSCRTriggerSetIds` := {
  `GCoreTriggerSetId.CGSpecGate`
  }
* `RSCRTriggerKindIds` := {
  `RSCRTriggerKindId.EvidenceSurfaceEdit`,
  `RSCRTriggerKindId.PenaltyPolicyEdit`,
  `RSCRTriggerKindId.BaselineBindingEdit`,
  `RSCRTriggerKindId.TelemetryDelta`
  }
  *(Pattern‑local deltas; cross‑tradition / bridge‑calibration causes are wired via `G.9:Ext.CrossTraditionParity` and MUST NOT over‑trigger baseline (within‑context) parity runs.)*

* `DefaultsConsumed` := {
  `DefaultId.DominanceRegime`,
  `DefaultId.PortfolioMode`,
  `DefaultId.GammaFoldForR_eff`
  }
  *(Defaults are routed via `G.Core.DefaultOwnershipIndex` (not restated here); the expected default routes are `CC‑G5.28`, `CC‑G5.23`, `CC‑G5.4` respectively.)*

* `CorePinSetIds` := {
  `GCorePinSetId.PartG.AuthoringMinimal`,
  `GCorePinSetId.PartG.CrossingVisibilityPins`
  }

* `CorePinsRequired` *(pattern delta; pin names only; all are id‑valued unless noted)* := {
  `ComparatorSpecRef.edition`,
  `FreshnessWindows`,
  `BaselineSet`, `BaselineBindingRef`,
  `ParityPinSet`,
  `PlanItemRefs[]?`,
  `EvidenceGraphId`,
  `Budgeting?`,
  `EpsilonDominance?`,
  `UNM_id?`, `NormalizationMethodId[]?`, `NormalizationMethodInstanceId[]?`,
  `SCPRef.edition?`, `MinimalEvidenceRef.edition?`
  }
*(Nil‑elision applies; mode‑specific definition pins are introduced only by the corresponding `GPatternExtension` blocks.)*

* `TriggerAliasMapRef` := `∅`
#### G.9:4.1 — Objects and surfaces

All objects below are **notation‑independent**; serialisations (if any) are handled in shipping/interop surfaces, not here.

**(1) `ParityPlan@Context`** *(WorkPlanning surface)*
A plan that fixes *what is being compared* and *under what pinned conditions*.

Minimal fields (conceptual; ids/pins only):

`ParityPlan@Context := ⟨  
  ParityPlanId(UTS),  
  CGFrameId?,                              // or CG-FrameContext id/scope anchor cited by the referenced frame surfaces
  describedEntity := ⟨GroundingHolon, ReferencePlane⟩,
  UNM_id?, NormalizationMethodId[]?, NormalizationMethodInstanceId[]?, // when “normalize, then compare” is required (ids only; semantics come from CN‑Spec / UNM)
  EpsilonDominance?,                       // optional ε-front thinning (ε≥0; id/param; pinned when used)
  PortfolioMode?, DominanceRegime?,         // may be explicit or inherited via DefaultOwnership (semantics follow G.5)
  HomeContextId,
  BaselineSet,                            // method-family / generator-family baseline scope (ids; notation-independent)
  BaselineBindingRef,                      // evidence-backed baseline-set reference that says what counts as baseline
  FreshnessWindows,
  CNSpecRef.edition, CGSpecRef.edition, ComparatorSpecRef.edition, // edition-pinned refs
  SCPRef.edition?,                         // optional (when a specific SCP profile must be pinned/cited)
  MinimalEvidenceRef.edition?,             // optional (when CG-Spec exposes minima profiles by ref)
  Budgeting?,  
  ParityPinSet,  
  PlanItemRefs[]?                          // references to A.15.3 SlotFillingsPlanItem (planned baseline), when parity depends on planned slot fillings  
⟩`

**(2) `ParityPinSet`** *(surface)*
A declared set of pins required for reproducibility and audit (editions + policy‑ids + UTS/Path pins).
The concrete contents are *pattern-local* (G.9 carries the surface), but must satisfy the *core pin discipline* via `G.Core`.

**(3) `ParityReport@Context`** *(Work / Audit surface)*
A publication object produced by executing a ParityPlan.

`ParityReport@Context := ⟨  
  ParityReportId(UTS),  
  ParityPlanId,  
  BaselineSet, FreshnessWindows,  
  CNSpecRef.edition, CGSpecRef.edition, ComparatorSpecRef.edition,  
  SCPRef.edition?, MinimalEvidenceRef.edition?,             // echoed iff used/pinned in the plan
  UNM_id?, NormalizationMethodId[]?, NormalizationMethodInstanceId[]?, // echoed iff used in the plan
  OutcomeRefs,                              // portfolio / archive / set outcomes (as refs to selector outputs)  
  EpsilonDominance?,                        // echoed when used
  AbstainReasons[]?,                        // ids/labels (policy-bound) for abstain/degrade; refusal paths included
  TelemetrySummary? := ⟨IlluminationSummary?, coverage?, regret?⟩,  // report-only by default; promotion requires CAL policy-id pins
  GuardOutcomeTraceRef?,                    // pass/degrade/abstain trace + cited reasons (policy-bound)  
  EvidenceTrace := ⟨EvidenceGraphId, PathId[], PathSliceId?⟩,  
  CrossingPins?,                            // Bridge/CL/Φ/Ψ/Φ_plane pins, when crossings are invoked  
  EditionPinsDelta?,                        // explicit list of edition pins actually active during the run  
  PolicyPinsDelta?,                         // explicit list of policy-ids actually active during the run  
  RSCRRefs[]                                // parity RSCR test ids / trigger emissions  
⟩`

**Naming discipline.**

* Heads reuse existing U‑types and LEX discipline; no new “strategy” primitive is minted here.
* Tech/Plain twins follow E.10 rules (no drift‑inducing synonyms in Tech).
#### G.9:4.2 — Parity planning (design‑time / WorkPlanning)

Planning is the act of making the parity run *reproducible by construction*:

1. **Fix the baseline set.** Choose the `BaselineSet` (MethodFamilies, and optionally GeneratorFamilies) to compare; where parity context matters, cite `SoS‑LOGBundleId?` / maturity‑rung ids by reference (acceptance-gate thresholds remain in `G.4` Acceptance).
2. **Bind scope.** Fix `describedEntity := ⟨GroundingHolon, ReferencePlane⟩` and record it in the plan (no silent widening/narrowing).
3. **Define baseline-set reference.** Declare what counts as “baseline set” and how it is cited (e.g., `BaselineBindingRef`, the evidence-backed baseline-set reference, pointing to an EvidenceGraph path slice or an upstream shipped artefact id).
4. **Equalise window (and budget, if pinned).** Declare a single `FreshnessWindows` and apply it across all baselines; if `Budgeting` is used/pinned, it MUST be shared/pinned across baselines as well.

When specialization is the live burden, the same plan should also hold constant the declared task family or target scope cut, the work-measure threshold target, adaptation budget, prior exposure declaration, and freshness window; if transfer, retention, downstream exploitation efficiency, downside burden, or corridor entry are part of the claim, those pins should be explicit as well, including the baseline relative to which corridor entry is being claimed.

5. **Pin governance, legality, and comparator references.** `CNSpecRef`, `CGSpecRef`, and `ComparatorSpecRef` are referenced with explicit edition pins.
6. **Pin measurement/comparator definitions (conditional).** Where parity depends on mode‑specific artefacts (e.g., DHC/QD/OEE), pin the relevant definition ids/editions/policies. The minimum required pins are declared by the applicable `Extensions` blocks (e.g., `G.9:Ext.DHCParityPins`, `G.9:Ext.QDArchiveParity`, `G.9:Ext.OEEParity`) and the referenced surfaces they cite.
7. **Bind comparator choice to CG‑Spec (legality).** Any numeric comparison/aggregation MUST be CSLC‑lawful and cite the corresponding CG‑Spec entry (via `ComparatorSpecRef`). If Characteristics differ by unit/scale/space, the plan MUST declare the ids used for “normalize, then compare” (`UNM_id?`, `NormalizationMethodId[]?`, `NormalizationMethodInstanceId[]?`) — ids only; semantics are defined elsewhere.
8. **Declare order & portfolio semantics.** Parity MUST preserve set‑return semantics; `PortfolioMode`/`DominanceRegime` are either explicitly pinned or routed via `G.Core.DefaultOwnershipIndex`. IlluminationSummary/coverage/regret remain telemetry unless a CAL policy explicitly promotes them (policy‑id pinned & recorded).
9. **Attach planned baselines (when applicable).** If parity depends on planned slot fillings, the plan cites the relevant `SlotFillingsPlanItem` refs (A.15.3) via `PlanItemRefs[]` rather than embedding a competing baseline object (nil‑elision when unused).
10. **Route crossings (when invoked).** Cross‑Context/plane/Kind reuse requires explicit Bridge/CL/Φ pins; penalties route to `R_eff` only (invariants routed via `G.Core`).
#### G.9:4.3 — Execution protocol (run‑time / selector‑adjacent)

Execution is **one run** under the pinned plan:

1. **Gate on legality & pins.** Validate pins and legality‑gate availability; run eligibility/acceptance checks under the plan’s `TaskSignature (S2)` and refuse/abstain on illegal ops (record trace; no “fourth status”).
2. **Invoke selection/dispatch.** Call **G.5** under the plan’s pinned refs and emit selector outputs in a form consistent with G.5’s portfolio semantics.

When parity is comparing bounded specialization, the report should echo the active specialization profiles or equivalent pins so reviewers can recover the work-measure threshold target, prior exposure, budget-to-threshold, post-threshold efficiency when relevant, transfer, retention, downside burden, and any corridor-entry baseline or evidence note from the parity object itself rather than from later narrative explanation.

3. **Record comparability mapping (when used).** If `UNM_id?` / `NormalizationMethodId[]?` / `NormalizationMethodInstanceId[]?` were declared, **echo them** in `ParityReport@Context` (or in its explicit pins deltas) and record their ids (and any scoped notes required by the cited contract surface) in audit pins/SCR; cite the applicable `PathId`s.
4. **Publish trace.** Emit `ParityReport@Context` with EvidenceGraph citations and all active pins (editions/policy‑ids), so the run can be re‑checked and re‑run.
5. **Emit telemetry hooks (optional, report‑only).** When telemetry is produced, it is emitted as telemetry pins/events for refresh wiring (not as a silent change in dominance interpretation).
#### G.9:4.3a — Worked parity slice

- Two agentic search setups both claim bounded specialization on the same declared task family.
- The `ParityPlan` pins the same freshness window, threshold target, adaptation budget, prior-exposure declaration, comparator editions, and corridor-entry baseline. One setup reaches threshold sooner but shows weak retention and no transfer. The other reaches threshold later, but carries reusable transfer and lower downside burden.
- A lawful `ParityReport@Context` therefore states what was held constant, which signals remained telemetry, and why the outcome stays a governed portfolio or partial order rather than collapsing into a scalar winner. The reader can recover the practical comparison from the parity slice itself before reading any optional wiring blocks.
#### G.9:4.9 — Extensions (pattern‑scoped; non‑core)

Most working readers can stop after `G.9:4.3a`. The blocks below are binding-only wiring records used only when the corresponding parity mode is actually active.

The following blocks store **wiring only** (pins/refs/policy‑ids, relevant triggers, and `Uses`), while semantics remains defined in the referenced patterns.

**GPatternExtension block: `G.9:Ext.CrossTraditionParity`**
**GPatternExtension: CrossTraditionParity**
* **PatternScopeId:** `G.9:Ext.CrossTraditionParity`
* **GPatternExtensionId:** `CrossTraditionParity`
* **GPatternExtensionKind:** `DisciplineSpecific`
* **SemanticOwnerPatternId:** `G.7`
* **Uses:** `{G.7, F.9, E.18, A.21}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum; conditional on use):**
  * `BridgeId/BridgeCardId[]`
  * `BridgeMatrixId?`
  * `CalibrationLedgerId?` / `BCT.id?`
  * `RegressionSetId?` / `SentinelId[]?` *(when sentinel wiring is used)*
  * `CL/CL^k/CL^plane`
  * `Φ(CL) policy-id`, `Φ_plane policy-id`, `Ψ(CL^k) policy-id?`
  * `CrossingBundleId?`
* **RSCRTriggerSetIds:** `{GCoreTriggerSetId.BridgeCalibrationKit}` *(preferred; expands in `G.Core`)*  
* **RSCRTriggerKindIds (delta, if any):** `∅`
* **Notes (wiring-only):** This block does not define CL/Φ/Ψ semantics; it only requires the pins needed to cite calibration artefacts and crossing visibility bundles.

**GPatternExtension block: `G.9:Ext.SoSLogGuardNarration`**
**GPatternExtension: SoSLogGuardNarration**
* **PatternScopeId:** `G.9:Ext.SoSLogGuardNarration`
* **GPatternExtensionId:** `SoSLogGuardNarration`
* **GPatternExtensionKind:** `MethodSpecific`
* **SemanticOwnerPatternId:** `C.23`
* **Uses:** `{C.23, G.6, G.4}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum; conditional on use):**
  * `SoSLogRuleId[]` / `BranchId[]` *(ids as cited labels; semantics come from `C.23`)*
  * `FailureBehaviorPolicyId/SoSLogBranchId`
  * `EvidenceTrace.PathId[]` / `PathSliceId?`
  * `AcceptanceClauseId[]` *(when referenced)*
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.EvidenceSurfaceEdit, RSCRTriggerKindId.MaturityRungChange, RSCRTriggerKindId.TelemetryDelta}`
* **Notes (wiring-only):** Explains **why** a parity run degraded/abstained by citing SoS‑LOG ids and evidence paths; does not redefine guard semantics.

**GPatternExtension block: `G.9:Ext.DHCParityPins`**
**GPatternExtension: DHCParityPins**
* **PatternScopeId:** `G.9:Ext.DHCParityPins`
* **GPatternExtensionId:** `DHCParityPins`
* **GPatternExtensionKind:** `MethodSpecific`
* **SemanticOwnerPatternId:** `C.21`
* **Uses:** `{C.21}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum; conditional on use):**
  * `DHCMethodRef.edition`
  * `DHCMethodSpecRef.edition?` *(when the cited DHC contract distinguishes method vs method-spec editions)*
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.EvidenceSurfaceEdit}`
* **Notes (wiring-only):** Declares the pins required to make DHC‑based parity reproducible and RSCR‑refreshable; semantics of DHC lives in `C.21`.

**GPatternExtension block: `G.9:Ext.QDArchiveParity`**
**GPatternExtension: QDArchiveParity**
* **PatternScopeId:** `G.9:Ext.QDArchiveParity`
* **GPatternExtensionId:** `QDArchiveParity`
* **GPatternExtensionKind:** `MethodSpecific`
* **SemanticOwnerPatternId:** `C.18`
* **Uses:** `{C.18, C.19, G.5}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum; conditional on use):**
  * `DescriptorMapRef.edition`
  * `DistanceDefRef.edition`
  * `CharacteristicSpaceRef.edition?` *(when discretisation/topology is referenced)*
  * `EmitterPolicyRef`
  * `InsertionPolicyRef`
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta}`
* **Notes (wiring-only):** Post‑2015 QD families are referenced here only as wiring + edition/policy pin obligations (semantics come from `C.18`/`C.19`/`G.5`).

**GPatternExtension block: `G.9:Ext.OEEParity`**
**GPatternExtension: OEEParity**
* **PatternScopeId:** `G.9:Ext.OEEParity`
* **GPatternExtensionId:** `OEEParity`
* **GPatternExtensionKind:** `MethodSpecific`
* **SemanticOwnerPatternId:** `C.19`
* **Uses:** `{C.19, G.5}`
* **⊑/⊑⁺:** `∅`
* **RequiredPins/EditionPins/PolicyPins (minimum; conditional on use):**
  * `TransferRulesRef.edition`
  * `EnvironmentValidityRegionId`
  * `ExplorationBudgetPolicyId?`
  * `EvidenceTrace.PathSliceId?` *(for transfer‑keyed events)*
* **RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta}`
* **Notes (wiring-only):** Open‑ended parity is expressed as policy/edition pins + telemetry wiring, not as new core norms.
### G.9:5 — Interfaces (minimal I/O; conceptual)

| Interface                          | Consumes                                                                                                                                         | Produces                                                                                        |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| **G.9‑1 `Plan_Parity`**            | `BaselineSet`, `BaselineBindingRef`, `FreshnessWindows`, `Budgeting?`, `EpsilonDominance?`, `CNSpecRef.edition`, `CGSpecRef.edition`, `ComparatorSpecRef.edition`, `SCPRef.edition?`, `MinimalEvidenceRef.edition?`, `UNM_id?`, `NormalizationMethodId[]?`, `NormalizationMethodInstanceId[]?`, `ParityPinSet`, `PlanItemRefs[]?` | `ParityPlan@Context` (UTS entry; edition‑pinned)                                                |
| **G.9‑2 `Run_Parity`**             | `ParityPlan@Context`, `TaskSignatureRef` (S2), **G.5‑3 Select**                                                                                  | Selector outputs (portfolio/archives/sets as refs), DRR+SCR pins with `PathId[]`/`PathSliceId?` |
| **G.9‑3 `Publish_ParityReport`**   | Run artefacts + trace + active pins                                                                                                              | `ParityReport@Context` (UTS entry; audit‑addressable; emits canonical RSCR ids)                 |
| **G.9‑4 `Expose_ParityTelemetry`** | Telemetry deltas (archive changes, coverage/regret signals, etc.)                                                                                | Telemetry events carrying `PathSliceId?`, policy‑ids, and edition pins for refresh wiring       |

*Surfaces are conceptual; serialisations belong in shipping/interop surfaces (see `G.10` / interop annexes), not in `G.9`.*
### G.9:6 — Conformance Checklist (CC‑G9)

**CC‑G9‑CoreRef (normative; mandatory).**
G.9 conforms only if it satisfies the **effective** set of `CC‑GCORE‑*` declared in **G.9:4.0 GCoreLinkageManifest** (including trigger typing, default-routing links, and P2W split).

1. **CC‑G9.1 — Equal windows (and budgets) & pinned contract editions (local).**
   A ParityPlan **SHALL** declare a single `FreshnessWindows` shared across baselines. If `Budgeting` is used/pinned, it **SHALL** be shared across baselines as well. `ParityPinSet` **SHALL** include the edition pins required by the referenced contract/comparator surfaces (at minimum `CNSpecRef.edition`, `CGSpecRef.edition`, `ComparatorSpecRef.edition`).
   If the parity run depends on planned slot fillings (WorkPlanning baseline), the plan **SHALL** cite the relevant `SlotFillingsPlanItem` refs via `PlanItemRefs[]` (nil‑elision when not applicable).

2. **CC‑G9.2 — Mode‑specific definition pins are declared via Extensions (local; conditional).**
   When parity depends on mode‑specific artefacts beyond the pinned contract surfaces (e.g., DHC/QD/OEE), the ParityPlan/Report **SHALL** include the corresponding `GPatternExtension` blocks and satisfy their `RequiredPins/EditionPins/PolicyPins` (typically carried inside `ParityPinSet`, and echoed via pins deltas in audit):
   * DHC parity → `G.9:Ext.DHCParityPins`
   * QD archive parity → `G.9:Ext.QDArchiveParity`
   * OEE parity → `G.9:Ext.OEEParity`

3. **CC‑G9.3 — Lawful orders & lawful arithmetic (delegation point + local constraint).**
   Delegated to `CC‑GCORE‑SET‑1` (and the relevant G.5 portfolio semantics). Additionally: any numeric comparison/aggregation invoked by parity **SHALL** be CSLC‑lawful and cite the corresponding CG‑Spec entry; illegal operations (e.g., ordinal means / mixed‑scale weighted sums) **SHALL** be refused or abstained with path‑cited trace (routing only; arithmetic legality comes from `CG‑Spec`/`MM‑CHR`).

4. **CC‑G9.4 — Normalization discipline (local, routing only).**
   If Characteristics differ by unit/scale/space, the ParityPlan **SHALL** cite the lawful comparability mapping by id (`UNM_id?`, `NormalizationMethodId[]?`, `NormalizationMethodInstanceId[]?`) and compare only after that mapping is applied (“normalize, then compare”).  
   If such mapping ids are used, the ParityReport **SHALL** echo the same ids (directly or via explicit pins deltas) so the run is reproducible/auditable without out‑of‑band context.  
   The harness **SHALL NOT** define a local mapping.

5. **CC‑G9.5 — Dominance/portfolio interpretation & telemetry separation (local).**
   ParityPlan/ParityReport **SHALL** either (i) explicitly pin the applicable regime/mode via refs/policy‑ids, or (ii) cite the corresponding defaults for `DefaultId.DominanceRegime` and `DefaultId.PortfolioMode` via `G.Core.DefaultOwnershipIndex`. Any non‑default “promotion” behaviour must be policy‑bound and recorded via policy‑id pins.
   IlluminationSummary/coverage/regret **SHALL** be treated as telemetry (report‑only by default); any promotion into dominance is an explicitly pinned CAL policy and MUST be recorded in audit pins/SCR.

5a. **CC‑G9.5a — Adaptation parity disclosure (local; conditional).**
   When the parity claim concerns bounded specialization, the ParityPlan and ParityReport **SHALL** pin the declared task family or target scope cut, the work-measure threshold target, adaptation budget, prior exposure declaration, and any transfer, retention, downstream exploitation efficiency, downside burden, or corridor-entry baseline/evidence note that materially affects comparison.

6. **CC‑G9.6 — Epsilon‑front thinning (local; conditional).**
   If ε‑front thinning is used, `EpsilonDominance (ε≥0)` **SHALL** be explicit in the plan/report and pinned (param/id) such that the same ε is reproducible.

7. **CC‑G9.7 — Crossing routing (delegation point).**
   Delegated to `CC‑GCORE‑CROSS‑1` and `CC‑GCORE‑PEN‑1`. This item remains as a stable delegation point for Bridge/plane routing visibility and penalty routing discipline.

8. **CC‑G9.8 — Evidence trace completeness (local).**
   A ParityReport **SHALL** include an EvidenceTrace with `EvidenceGraphId` and the relevant `PathId[]` (and `PathSliceId?` when needed), covering both inclusions and refusals/abstains/degrades.

9. **CC‑G9.9 — Telemetry hooks are emitted with pins (local).**
   When parity emits telemetry for refresh, emitted telemetry **SHALL** carry the active edition pins and policy‑ids needed to re‑run parity (including the active subset of `ParityPinSet` relevant to the emitted event).
   In particular, telemetry items SHOULD cite `PathSliceId` when available, and **SHALL** include the policy id governing the telemetry interpretation.
   Mode‑specific definition pins **SHALL** be included as declared by the active `Extensions` blocks (e.g., `G.9:Ext.QDArchiveParity`, `G.9:Ext.OEEParity`, including `EnvironmentValidityRegionId` when OEE parity is in scope).

10. **CC‑G9.10 — RSCR parity tests are published (local).**
   Parity publication **SHALL** include RSCR parity tests (via `F.15` harness refs) that cover negative/refusal paths relevant to this plan (missing pins, edition drift, missing bridge calibration refs, etc.).

11. **CC‑G9.11 — GateCrossing visibility (delegation point).**
    Delegated to `CC‑GCORE‑CROSS‑1` and the applicable GateCrossing/CrossingBundle harness checks (E.18/A.21/A.27). This remains a stable delegation point.

12. **CC‑G9.12 — Tech‑register lexical discipline (local).**
    Tech prose and heads **SHALL** follow E.10: do not introduce drift‑prone primitives (e.g., “metric” as a Tech primitive); reference the owner’s canonical terms and pinned refs.

13. **CC‑G9.13 — MOO disclosure for parity (local).**
    `Run_Parity` / `Publish_ParityReport` **SHALL** record the ParityHarness identity (UTS ids) and the active pins required to interpret the outcome (editions + policy‑ids), so parity remains auditable without relying on “decision logs”.
### G.9:7 — Anti‑patterns and remedies

* **AP‑1 Hidden edition drift.** Remedy: require edition pins in `ParityPinSet`; treat changes as RSCR‑relevant via canonical trigger kinds.
* **AP‑2 Baseline set is informal prose.** Remedy: require `BaselineBindingRef` and EvidenceTrace pins.
* **AP‑3 Comparator semantics are “whatever the code did”.** Remedy: `ComparatorSpecRef.edition` (and any normalization/comparability refs) must be cited and pinned.
* **AP‑4 Cross‑Context reuse without visible routing.** Remedy: cite bridge/plane routing artefacts and crossing visibility surfaces (delegated to G.Core).
* **AP‑5 Parity report becomes a hidden scoring sheet.** Remedy: preserve lawful outcome shape and keep telemetry as telemetry unless explicitly policy‑promoted by owner patterns.
* **AP‑6 “Metric” as a primitive in Tech.** Remedy: use `DHCMethodRef`/`U.Measure`/`DistanceDefRef` with editions; “metric” may appear only in Plain with an explicit pointer to canonical terms.
* **AP‑7 Hidden spec drift (spec‑level pins missing).** Remedy: pin `DHCMethodSpecRef.edition` and register RSCR tests that fail on spec edition changes; refuse parity reuse on unpinned spec editions.
### G.9:8 — Archetypal grounding (informative; SoTA‑oriented)

**Show‑A — Multi‑tradition parity for decision systems (post‑2015 practice).**
ParityPlan pins a rolling evidence window and comparator refs; ParityReport publishes a set/portfolio outcome plus the evidence trace. Typical “rival families” include modern preference‑learning comparators, causal decision pipelines, offline‑RL evaluation pipelines, and robust BO‑style selectors—compared without collapsing everything into a single scalar.

**Show‑B — QD parity (MAP‑Elites lineage → CMA‑ME / DQD / QDax‑class).**
ParityPlan pins descriptor/distance definitions and archive insertion policy editions. ParityReport includes archive outcomes and telemetry deltas needed for refresh, without silently converting illumination summaries into dominance.

**Show‑C — Open‑ended parity (POET lineage and modern open‑ended generator families).**
ParityPlan pins transfer rule editions and exploration policy refs. ParityReport publishes portfolio outcomes plus transfer‑keyed traces (PathSlice), enabling refresh reruns when any pinned policy changes.
### G.9:9 — Payload (what this pattern exports)

**Exports (UTS‑publishable, edition‑pinned):**

* `ParityPlan@Context` (WorkPlanning artefact)
* `ParityReport@Context` (Work/Audit artefact)
* DRR+SCR refs (by id) and (when applicable) `PortfolioPackRef?`/selector output refs (by id), for downstream consumption.
* Telemetry pins/events (by id), for refresh wiring (`G.11`) and RSCR harnesses (`F.15`).
### G.9:10 — Relations

**Builds on:** `G.Core`, `G.5`, `G.6`, `G.4`, `F.15`, `E.18`, `A.21`, `A.27`, `E.5.2`, `E.10`.
**Publishes to:** **UTS** (plan/report ids), **G.11** (refresh wiring), **G.10** (shipping surface; parity artefacts are cited payloads).
**Uses:** **G.0**, **A.19**, **F.9**.
**Uses (optional, via Extensions):** **G.7**, **C.18/C.19** (QD/OEE wiring), **C.23** (SoS‑LOG narration and failure‑policy pins).
### G.9:11 — Working reading checks

- If two baselines are being compared under different freshness windows, comparator editions, or silent normalization rules, this pattern has not yet been satisfied.
- If parity cannot tell the reader what was held constant, what remained telemetry, and what crossings or penalties were active, the report is not yet usable.
- If a scalar winner is being claimed where only a portfolio or partial order is lawful, parity is overclaiming and should publish the lawful outcome shape instead.
### G.9:End
## SoTA Pack Shipping

**Tag:** Architectural pattern (conceptual; notation‑independent; pack‑boundary owner)
**Stage:** release‑time composition and publication; edition‑aware; **GateCrossing‑gated** via `E.18` CrossingBundle (and the relevant GateCrossing harness patterns).
**Builds on:** `G.Core` (Part‑G core invariants and routing); upstream pack/kit owners as cited artefacts (not redefined here).
**Owns (scope boundary):** *shipping* of Part‑G outputs as a **pack** (`SoTA‑Pack(Core)`), including the pack‑level publication kit: (i) selector‑facing portfolio/parity roster, (ii) PathId/PathSlice citation surface, (iii) telemetry pins for refresh planning, and (iv) optional interop ingestion as citation‑only notes.
**Does not own:** contract surfaces (`CN‑Spec`, `CG‑Spec`), CHR/CAL semantics, selection semantics, evidence semantics, bridge calibration semantics, refresh orchestration (these remain with their owners and are **cited**).

### Problem frame — Shipping without smuggling semantics

Part G produces many **kit‑owned** and **suite‑owned** artefacts (harvest packs, CHR/CAL packs, evidence graphs, bridge calibration artefacts, log bundles, parity reports). Without an explicit **pack‑boundary owner**, “shipping” tends to become:

* an ad‑hoc folder/export ritual (tool‑locked, not citable), or
* a silent re‑specification layer (shipping accidentally redefines legality, defaults, or selection semantics), or
* a brittle hand‑off that cannot support RSCR/refresh (no actionable pins/editions/policies attached).

`G.10` fixes the pack boundary: it defines the **single, normative shipping surface** for Part‑G outputs — **`SoTA‑Pack(Core)`** — and a minimal choreography for making shipped artefacts **selector‑ready** and **audit‑citable**, while delegating all Part‑G‑wide invariants to `G.Core` (routing/delegation, not restatement).
### Problem — Why naive shipping breaks reuse, legality, and refresh

Naive shipping fails (conceptually) when any of the following occurs:

1. **Format-as-contract.** A concrete export format is treated as “the pack,” turning a tool choice into a semantic authority.
2. **Editionless hand‑offs.** Shipped artefacts omit the edition/policy pins required to replay or compare outcomes, so parity and RSCR become non‑actionable.
3. **Pack smuggles semantics.** Shipping reintroduces “convenience” rules (hidden scalarisation, competing defaults, private gate decisions), fragmenting the contract surface.
4. **Invisible crossings.** Cross‑context/plane reuse is present, but the pack does not expose the crossing bundles and penalty policy pins needed for audit and refresh planning.
5. **No method‑of‑obtaining‑output disclosure.** Consumers receive outcomes without a minimal, citable trail of *which mechanisms/policies/editions produced them*.
6. **Refresh orphaning.** Telemetry and decay signals exist, but the shipped artefact provides no stable scope keys (`PathId` / `PathSliceId`) and no payload pins for RSCR triggers.
### Forces

| Force                                              | Tension                                                                                          |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Notation independence**                          | Make packs portable across tools ↔ still make them concrete enough to be used.                   |
| **Completeness vs minimality**                     | Ship enough to be selector‑ready ↔ avoid duplicating owner semantics.                            |
| **Continuity vs evolvability**                     | Preserve public IDs across edition bumps ↔ allow legitimate upgrades and deprecations.           |
| **Cross‑context reuse vs honesty**                 | Enable reuse across Traditions/contexts ↔ keep crossings explicit and auditable.                 |
| **Telemetry usefulness vs semantic contamination** | Export useful signals ↔ avoid turning telemetry into dominance/acceptance without pinned policy. |
| **Fast shipping vs refreshability**                | Ship quickly ↔ ensure RSCR triggers can be planned and scoped (P2W‑path aware).                  |
### Solution — SoTA‑Pack(Core) as the shipping object and publication kit

`G.10` defines a **pack‑owned** shipping surface: a notation‑independent object that **cites** all upstream artefacts by stable ids/refs and exposes the minimum pins required to (a) consume the result via selection, (b) audit it via path citations and crossing bundles, and (c) refresh it via typed RSCR triggers.

#### G.Core linkage (normative)

**Builds on:** `G.Core` (Part‑G core invariants; single‑owner routing)

**GCoreLinkageManifest (G.10)** *(normative; expands per `G.Core:4.2`; `Nil‑elision` applies)*
Effective obligations/pins/triggers are computed as **union(expand(sets), explicit deltas)** under `Nil‑elision`.

* `CoreConformanceProfileIds` := {
  `GCoreConformanceProfileId.PartG.AuthoringBase`,
  `GCoreConformanceProfileId.PartG.TriStateGuard`,
  `GCoreConformanceProfileId.PartG.UTSWhenPublicIdsMinted`,
  `GCoreConformanceProfileId.PartG.ShippingBoundary`
  }

* `RSCRTriggerSetIds` := { `GCoreTriggerSetId.RefreshOrchestration` }
  *(payload pins: `PackId(UTS)`, `publicationScopeId`, `CNSpecRef.edition`, `CGSpecRef.edition`, `PlanItemRefs := SlotFillingsPlanItemRef[]`, `AuditPins`, `UTSRowId[]`, `PathId/PathSliceId`, crossing policy pins, `TelemetryPinIds`, relevant upstream artefact ids)*

* `DefaultsConsumed` := {
  `DefaultId.PortfolioMode`,
  `DefaultId.DominanceRegime`,
  `DefaultId.GammaFoldForR_eff`
  }
  *(Owners are routed via `G.Core.DefaultOwnershipIndex` and are not restated here.)*

* `CorePinSetIds` := {
  `GCorePinSetId.PartG.AuthoringMinimal`,
  `GCorePinSetId.PartG.CrossingVisibilityPins`
  }

* `CorePinsRequired` *(pattern delta; pin names only; id‑valued unless noted)* := {
  `PackId(UTS)`,
  `publicationScopeId`,
  `contextSliceId?`,

  `PlanItemRefs := SlotFillingsPlanItemRef[]?` *(WorkPlanning planned baseline refs)*,
  `AuditPins` *(pack‑level pin bundle: edition pins (only on `…Ref.edition`), policy‑ids, UTS/Path pins; ids only)*,

  `UTSRowId[]`,
  `PathId[]?`, `PathSliceId[]?`,
  `CrossingBundleIds := CrossingBundleId[]?`,
  `TelemetryPinIds := TelemetryPinId[]?`,
  `PortfolioRosterId?`,

  `MOOManifestId?` *(method‑of‑obtaining‑output disclosure; conceptual object id)*
  }
  *(Optional pins from `CrossingVisibilityPins` MAY be strengthened to unconditional by listing them above; `G.10` typically strengthens `UTSRowId[]` and path/crossing bundles when the pack is publicly shipped.)*

* `TriggerAliasMapRef` := `∅` *(no local trigger tokens in Phase‑2)*

> **Mode‑specific definition pins.** Any additional pins required for QD/OEE/interop shipping are introduced only by `GPatternExtension` blocks in `G.10:4.6` (never smuggled into the core linkage).
#### SoTA‑Pack(Core) object model (normative; notation‑independent)

`SoTA‑Pack(Core)` is a **shipment object** (a *pack*, not a kit and not a suite) that **cites** upstream artefacts and exposes pack‑level pins required for downstream use.

```
SoTA‑Pack(Core) :=
⟨
  PackId(UTS),
  publicationScopeId,
  contextSliceId?,
  CG-FrameContext,
  describedEntity := ⟨GroundingHolon, ReferencePlane⟩,

  // Contract surfaces (refs + edition pins; semantics owned by their patterns)
  CNSpecRef := ⟨A.19 ref, CNSpecRef.edition⟩,
  CGSpecRef := ⟨G.0 ref,  CGSpecRef.edition⟩,

  // Selector-facing portfolio/parity roster token (conceptual; no formats mandated)
  PortfolioRosterId?,        // produced by `G.10‑1` as part of composition; may cite ε and the applicable pinned regime/mode refs

  // Cited payload packs/kits (ids only; semantics owned by the cited owners)
  SoTAHarvestPackId?          // e.g., G.2 output id
  CHRPackId?                  // G.3 output id
  CALPackId?                  // G.4 output id
  EvidenceGraphId?            // G.6 output id
  BridgeMatrixId?             // G.2/G.7 cited id
  BridgeCalibrationTableId?   // G.7 output id
  SoSLOGBundleId?             // G.8 output id
  ParityReportId?             // G.9 output id
  DashboardSliceId?           // G.12 output id (optional)
  InteropSurfaceId?           // G.13 output id (optional)

  // Path citation surface (ids only; semantics owned by A.10/G.6)
  PathIds := PathId[]?,
  PathSliceIds := PathSliceId[]?,

  // Planned baseline + audit pins (P2W-aware; ids only)
  PlanItemRefs := SlotFillingsPlanItemRef[]?,
  AuditPins := { id pins… },                 // editions only on `…Ref.edition`; includes policies, UTS/Path pins, crossing pins

  // Crossing visibility surface (per GateCrossing; ids only)
  CrossingBundleIds := CrossingBundleId[]?,

  // Telemetry hooks for refresh planning (ids only; PathSlice-keyed; policy-id pinned)
  TelemetryPinIds := TelemetryPinId[]?,

  // Method-of-obtaining-output (MOO) disclosure (conceptual; ids only)
  MOOManifestId?,

  Notes?
⟩
#### Portfolio roster (normative; pack‑owned; owner‑delegating)

`PortfolioRosterId` identifies the **selector‑facing** pack roster token. It is **wiring + citation** only:
it MUST NOT redefine selection/portfolio semantics (owned by `G.5`) or parity semantics (owned by `G.9`).
Mode‑specific definition pins (QD/OEE/interop) are introduced only via `G.10:Ext.*` blocks.

```
PortfolioRoster@Context :=
⟨
  PortfolioRosterId,
  PackId(UTS),
  CG-FrameContext,
  describedEntity,

  // Portfolio semantics (values may be explicit or resolved via DefaultOwnershipIndex)
  portfolioMode?,
  dominanceRegime?,
  ε?,

  // Selector-facing roster + provenance hooks (ids only)
  MethodFamilyIds := MethodFamilyId[]?,
  GeneratorFamilyIds := GeneratorFamilyId[]?,
  ParityReportId?,
  SCRId[]?, DRRId[]?,

  // Pin reuse: prefer referencing the enclosing pack’s AuditPins bundle
  AuditPins?,
  Notes?
⟩
```

*Presence rule:* `PortfolioRosterId` MAY be omitted only when the shipped pack is *inputs‑only*
(e.g., shipping CHR/CAL/evidence without any selector‑consumable portfolio/shortlist output).
```

**Interpretation constraints (normative by delegation).** Any universal invariants governing (i) contract‑surface ownership, (ii) crossing visibility and penalty routing, (iii) tri‑state guards, (iv) set‑return semantics, (v) P2W split, (vi) defaults, and (vii) RSCR trigger typing are **not restated here** and are enforced via `G.Core` routing (see `CC‑G10‑CoreRef`).
#### Shipping choreography (normative; owner‑delegating)

`G.10` prescribes a minimal, owner‑delegating sequence for composing a shipped pack:

1. **S‑1 — Gather & pin.** Collect upstream artefact ids and verify the **required pins** implied by the linkage manifest (edition pins, policy pins, UTS/Path pins).
2. **S‑2 — Compose `SoTA‑Pack(Core)` + MOO disclosure.** Assemble the pack object and attach a **`MOOManifest`** that lists the referenced mechanisms/policies/editions that produced the shipped outcomes (ids only; semantics stay with owners).
3. **S‑3 — Publish portfolio/parity roster (selector‑facing).** Produce a selector‑readable `PortfolioRosterId` with the parity/definition pins required for reproducibility; do not mandate formats.
4. **S‑4 — Anchor and publish path citations.** Ensure A.10 anchors exist and publish/record `PathId/PathSliceId` citations required for downstream explainability (e.g., `C.23/H4`) and maturity rung changes.
5. **S‑5 — Expose CrossingBundle.** For each GateCrossing relevant to the shipped artefacts, expose the required `CrossingBundle` references (fail fast on missing or non‑conformant bundles when required).
6. **S‑6 — Emit telemetry pins for refresh planning.** Whenever illumination increases or archive/OEE wiring changes, emit PathSlice‑keyed telemetry with policy‑id and the active `…Ref.edition` pins (and QD `EmitterPolicyRef`/`InsertionPolicyRef` when applicable).
7. **S‑7 — Publish to UTS (twin labels).** Mint/refresh UTS Name Cards needed to cite the pack and shipped heads (Tech/Plain twins when required); cross‑Context identity travels only via Bridges with CL and loss notes.
8. **S‑8 — Optional: ingest interop surface.** If `G.13` interop is in use, ingest/cite `InteropSurface@Context` as annotation-only notes, pinning external index editions; do not redefine interop semantics.
#### Interfaces & hooks (selector‑ and audit‑facing)

| ID         | Interface (conceptual)     | Consumes                                                          | Produces                                                |
| ---------- | -------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------- |
| **G.10‑1** | `Compose_SoTA_Pack`        | G.* outputs, ComparatorSet, Bridges, editions, SCR/DRR deltas     | `SoTA‑Pack(Core)` (UTS row + surfaces) + `AuditPins` (+ `MOOManifestId?`) (+ `PortfolioRosterId?`) |
| **G.10‑2** | `Publish_UTS`              | `PackId(UTS)`, `UTSRowId[]`, deprecation/edition‑bump notes       | UTS rows/Name Cards for the pack and shipped heads (incl. twins when required) |
| **G.10‑3** | `Expose_CrossingHooks`     | GateCrossings, lanes/planes/contexts                              | **CrossingBundle** (**E.18:CrossingBundle**) per GateCrossing; **fail** on missing/non‑conformant bundles |
| **G.10‑4** | `Pack_MOO`                 | referenced mechanism/policy/edition ids                           | `MOOManifestId` (ids only; owner‑delegating) |
| **G.10‑5** | `Emit_TelemetryPins`       | Illumination/archive/OEE events                                   | PathSlice‑keyed telemetry: `policy‑id`, `…Ref.edition` (+ QD/OEE pins when applicable) |
| **G.10‑6** | `Publish_PathCitations`    | A.10 anchors, PathIds                                             | PathId/PathSlice citations for `C.23/H4` & rung changes |
| **G.10‑7** | `Ingest_InteropSurface?`   | (optional) `G.13 InteropSurface@Context`                          | Annotated pack notes citing external‑index editions     |

*Surfaces remain **conceptual** per **E.5.2**; RO‑Crate/ORKG/OpenAlex mappings belong to **Annex/Interop** and do not affect Core conformance.*

> **Note.** Any concrete serialisation/export is *not* part of this interface set. Serialisation belongs to interop/annex ownership and must not become a semantic authority.
#### Consequence of ownership (normative boundary statement)

`G.10` is the **single owner** of “shipping” in Part G *(by delegation to `CC‑GCORE‑SKP‑1`)*.
Other `G.x` patterns may produce artefacts that are shipped, but they must not embed shipping obligations; they cite `G.10` shipping surfaces instead.
#### Extensions (pattern‑scoped; non‑core)

All method‑/generator‑/interop‑specific shipping wiring lives here as `GPatternExtension` blocks.

##### GPatternExtension — G.10:Ext.QDArchiveShippingPins

**PatternScopeId:** `G.10:Ext.QDArchiveShippingPins`
**GPatternExtensionId:** `QDArchiveShippingPins`
**GPatternExtensionKind:** `MethodSpecific`
**SemanticOwnerPatternId:** `C.18` *(QD/NQD semantics live with the owner; this block is wiring-only.)*
**Uses:** `{C.18, G.5, G.8, G.11}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `DescriptorMapRef.edition`
* `DistanceDefRef.edition`
* `DHCMethodRef.edition?`
* `DHCMethodSpecRef.edition?`
* `EmitterPolicyRef` *(policy‑id / ref)*
* `InsertionPolicyRef` *(policy‑id / ref)*
* `CharacteristicSpaceRef` *(id/ref; iff archive partitioning is declared)*
* `CharacteristicSpaceRef.edition?` *(iff partitioning depends on an editioned space definition)*
* `PathSliceId[]` *(to bind telemetry/refresh scope when archive behaviour is present)*

**RSCRTriggerSetIds:** `∅` *(covered by `G.10` core linkage via `GCoreTriggerSetId.RefreshOrchestration`)*
**Notes (wiring only):**
* This block never redefines archive semantics; it only states which pins must be present in the shipped pack when QD archive fields are present.
##### GPatternExtension — G.10:Ext.OEEShippingPins

**PatternScopeId:** `G.10:Ext.OEEShippingPins`
**GPatternExtensionId:** `OEEShippingPins`
**GPatternExtensionKind:** `GeneratorSpecific`
**SemanticOwnerPatternId:** `G.5` *(generator family registry / transfer wiring is owned upstream; this block is pack‑wiring only.)*
**Uses:** `{G.5, G.11}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `TransferRulesRef.edition`
* `EnvironmentValidityRegion?` *(id/ref; iff an explicit region is declared as part of generator family wiring)*
* `PathSliceId[]` *(scope key for refreshable generator telemetry when present)*

**RSCRTriggerSetIds:** `∅` *(covered by the core trigger set)*
**Notes (wiring only):**
* “Open‑endedness” semantics remain owner‑defined; the pack only carries the pins required to make the shipped claim replayable/auditable.
##### GPatternExtension — G.10:Ext.InteropCitation

**PatternScopeId:** `G.10:Ext.InteropCitation`
**GPatternExtensionId:** `InteropCitation`
**GPatternExtensionKind:** `InteropSpecific`
**SemanticOwnerPatternId:** `G.13` *(interop semantics live with `G.13`; this block only cites ids/pins.)*
**Uses:** `{G.13}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `InteropSurfaceId`
* `ExternalIndexRef.edition`
* `ClaimMapperRef.edition`
* `PlaneMapRef.edition?`
* `MappingPolicyRef`

**RSCRTriggerSetIds:** `∅` *(covered by the core trigger set)*
**Notes (wiring only):**
* This block only records that an interop surface contributed to the shipped pack’s provenance; it does not redefine any crosswalk semantics.
### Consequences

**Benefits**

* A shipped result becomes **selector‑ready** and **audit‑citable** without turning file formats into a contract.
* Shipping is no longer a semantic “backdoor”: pack‑level semantics remain owner‑delegated.
* RSCR/refresh becomes operationally viable because pack‑level scope keys and payload pins are present.

**Costs / trade‑offs**

* Shipping becomes more explicit (more pins and explicit surfaces), which raises authoring overhead.
* If upstream owners fail to provide citable ids/pins, `G.10` cannot paper over the gap; shipping will block or ship a visibly incomplete pack (depending on policy‑bound failure behaviour, routed via owners).
### Bias‑Annotation (informative)

Lenses tested: **Gov**, **Arch**, **Onto/Epist**, **Prag**, **Did**.

* **Format bias (Arch/Prag).** Strong temptation to treat a popular export format as “the pack”.  
  *Mitigation:* keep Core surfaces conceptual (E.5.2); move serialisation recipes to Annex/Interop; keep conformance on semantics.
* **Centralisation bias (Gov).** A single shipping owner can become a bottleneck.  
  *Mitigation:* keep shipping ownered, but push mode/method specifics into explicit `G.10:Ext.*` wiring blocks and cite semantic owners.
* **Telemetry→dominance bias (Onto/Prag).** Shipping pipelines often “promote” telemetry proxies (illumination/coverage) into ranking.  
  *Mitigation:* preserve the telemetry/order separation and require explicit CAL policy‑id for any promotion; record the policy‑id in audit pins/telemetry.
* **Interop authority bias (Onto/Epist).** External indexes can silently override local legality/typing.  
  *Mitigation:* `G.10‑6` ingests interop only as cited notes (editions + mapping policy refs), never as a replacement contract surface.
### Archetypal grounding (informative; post‑2015 method families)

**World‑plane (benchmark shipping).**
A CG‑Frame ships a portfolio that includes a QD archive (e.g., MAP‑Elites‑class / CMA‑ME‑class families) and a generator family (e.g., POET‑class environment generation). The shipped `SoTA‑Pack(Core)` cites the CHR/CAL packs and pins the QD/OEE wiring via the extension blocks so that downstream parity and refresh can be scoped to the affected `PathSliceId`s rather than forcing a global rebuild.

**Episteme‑plane (synthesis shipping).**
A CG‑Frame ships a pluralistic set of admissible methods gathered from post‑2015 literature streams (living review + synthesis pack). The shipped pack carries explicit contract‑surface refs, evidence path citations, and method‑of‑obtaining‑output disclosure; downstream selection uses set‑valued outcomes and can schedule refresh when the synthesis pack or key pins change.
### Conformance checklist (CC‑G10)

This pattern inherits order/illumination, evidence, and bridge/penalty legality from the cited owners (not restated here). Shipping‑specific requirements:

| ID  | Statement   | Verification notes (conceptual)  |
| --- | ----------- | -------------------------------- |
| **CC‑G10‑CoreRef** | The pattern satisfies the **effective** `G.Core` obligations declared by `G.10:4.1` (after profile/set/pin‑set expansion under `Nil‑elision`). | Check that the linkage manifest is present and that the expanded obligations are not contradicted. |
| **CC‑G10.1 (Notation‑independent).** | The pack MUST NOT rely on any specific file syntax; cards/tables are conceptual; tool serialisations are informative only. | Look for format‑free conceptual fields; any serialisation is explicitly non‑normative. |
| **CC‑G10.2 (Pack parity pins).** | If QD/OEE fields are present, pin `DescriptorMapRef.edition`, `DistanceDefRef.edition`, (optional) `DHCMethodRef.edition` / `DHCMethodSpecRef.edition` when used, and (OEE) `TransferRulesRef.edition`; include `CharacteristicSpaceRef` (+ `CharacteristicSpaceRef.edition` when it affects partitioning reproducibility); for QD archive semantics also pin `EmitterPolicyRef` and `InsertionPolicyRef`. | Verify the corresponding `G.10:Ext.*` block is present and the pins appear in AuditPins and (when relevant) in telemetry pins. |
| **CC‑G10.3 (Telemetry discipline).** | Any illumination increase or archive edit SHALL log `PathSliceId`, the active `policy‑id`, the active editions of the pinned `…Ref` fields (incl. OEE `TransferRulesRef.edition`), and the active `EmitterPolicyRef`/`InsertionPolicyRef` when applicable. | Verify emitted telemetry is PathSlice‑keyed and carries the required pins; ensure causes are recorded using canonical trigger kinds (alias labels optional only). |
| **CC‑G10.4 (UTS publication & twins).** | All shipped heads appear on UTS with Tech/Plain twins **per delegated UTS discipline**; cross‑Context identity (when present) is routed via Bridges with CL and loss notes **per delegated crossing discipline**. | Verify UTS rows exist and that any cross‑Context identity is routed via Bridge artefacts with visible CL/loss notes. |
| **CC‑G10.5 (MOO surfaced in shipping).** | For every portfolio set or archive published, the pack SHALL list the applicable generation/parity mechanism ids (e.g., QD `EmitterPolicyRef`/`InsertionPolicyRef`, parity harness ids, method refs where the method definition is generative) and the active policy‑id(s) in SCR‑visible bindings and telemetry pins (ids only; owner‑delegating). | Verify `MOOManifestId` is present when outcomes are intended for downstream use and does not redefine semantics. |
| **CC‑G10.6 (Pack completeness as a citation surface).** | The pack cites all included upstream artefacts by id/ref and exposes the required pins (`AuditPins`, UTS/Path pins, CrossingBundleIds when required). | Verify all present payload artefacts have ids and the pins needed to cite/replay them. |
| **CC‑G10.7 (CrossingBundle exposure).** | For each GateCrossing relevant to shipped artefacts, the pack exposes the relevant `CrossingBundleIds` (or records that no such crossings exist) **per delegated crossing visibility discipline**, and shipping fails fast on missing/non‑conformant crossing bundles when required. | Verify crossing bundle presence/absence is honest and aligned with the shipped artefacts’ declared crossings. |
| **CC‑G10.8 (Baseline binding is explicit when used).** | If the shipped pack claims a planned baseline, `PlanItemRefs := SlotFillingsPlanItemRef[]` are present (WorkPlanning artefacts, cited; no execution logs). | Verify plan items are cited by id and the pack does not ship “decisions/logs” as authoritative artefacts. |
| **CC‑G10.9 (Extension‑scoped wiring).** | If QD/OEE/interop fields are present, the corresponding `GPatternExtension` block is present and its required pins/editions/policies are recorded in AuditPins and in emitted telemetry pins when those pins affect refreshability. | Verify conditional wiring is not silently omitted when the mode is used. |
### Anti‑patterns and remedies

* **AP‑1 Format‑as‑contract.** Remedy: keep Core surfaces conceptual (E.5.2); move serialisation to Annex/Interop; enforce `CC‑G10.1`.
* **AP‑2 Hidden edition drift.** Remedy: require `…Ref.edition` pins in AuditPins and treat edition changes as RSCR‑relevant via canonical trigger kinds.
* **AP‑3 “QD archive present” but missing definition pins.** Remedy: enforce `CC‑G10.2` and the `G.10:Ext.QDArchiveShippingPins` wiring.
* **AP‑4 Telemetry silently becomes dominance.** Remedy: keep telemetry report‑only unless an explicit CAL policy promotes it; require policy‑id recorded (ties to `CC‑G10.3` and MOO discipline).
* **AP‑5 No PathSlice key → refresh becomes global.** Remedy: enforce PathSlice‑keyed telemetry and path citations (`G.10‑4`, `G.10‑5`).
* **AP‑6 Cross‑Context reuse without visible routing.** Remedy: require `CrossingBundleIds` + Bridge/CL policy pins; fail fast on missing/non‑conformant bundles (`CC‑G10.7`).
* **AP‑7 Interop ingestion rewrites semantics.** Remedy: ingest interop as cited notes only; semantics remain in `G.13` (`G.10‑6`, `G.10:Ext.InteropCitation`).
### SoTA‑Echoing (post‑2015, for orientation)

* **Research‑object packaging & provenance.** Post‑2015 practice increasingly treats “release artefacts” as *packages with explicit provenance, versions, and minimal replay pins* (e.g., modern research‑object and RO‑Crate‑class approaches). `G.10` mirrors the “package‑as‑citation‑surface” idea while keeping semantics owner‑delegated.
* **Reproducibility regimes in ML/AI.** Contemporary reproducibility checklists, artifact evaluation/badging, and benchmark reporting norms motivate: explicit version pins, explicit method disclosure, and separating telemetry summaries from decision criteria unless policy‑promoted.
* **Scholarly KG interoperability.** ORKG/OpenAlex‑class ecosystems highlight the need to treat external mappings as *interop notes with editions*, not as replacement contract surfaces — matching the `G.10‑6` and `G.10:Ext.InteropCitation` stance.
### Relations

**Builds on:** `G.Core`; consumes/cites owner artefacts from `G.2` (harvest pack), `G.3` (CHR pack), `G.4` (CAL pack), `G.6` (EvidenceGraph), `G.7` (bridge calibration), `G.8` (SoS‑LOG bundle), `G.9` (parity report), optional `G.12` (dashboard slice), optional `G.13` (interop surface).
**Publishes to / used by:** UTS (pack identity), selector‑facing consumers (via `G.5`), audit/assurance surfaces (SCR/RSCR), refresh orchestration (`G.11`).
**Constrains:** tooling exports are downstream; serialisation and repository integration are explicitly non‑normative here.
### G.10:End
## Telemetry-Driven Refresh & Decay Orchestrator

**Tag.** Architectural pattern (architectural; notation-independent)
**Status.** Stable
**Normativity.** Normative (unless explicitly marked informative)

**Stage.** run-time + maintenance-time (selective re-computation, republication, and controlled deprecation)

**Primary outputs (kit artefacts).** `RefreshQueue`, `RefreshPlan@Context` (WorkPlanning artefact), `RefreshReport@Context` (Work/Audit artefact), `DeprecationNotice@Context`, `EditionBumpLog@Context`.

**Primary hooks.** `G.Core` (RSCR trigger catalogue + alias docking + default ownership index), `G.6` (EvidenceGraph; `PathId`/`PathSliceId`), `G.7` (Bridge Sentinels; CL/Φ/plane policy pins), `G.5` (set-returning selection/dispatch), `G.8` (SoS-LOGBundle telemetry hooks), `G.9` (parity reruns), `G.10` (shipping hooks and pack-level telemetry pins), `G.12` (dashboard telemetry pins), `B.3.4` (freshness/decay), `E.18` (GateCrossing/CrossingBundle visibility), optional `C.18/C.19` (QD/E–E policy pins), `C.23` (SoS-LOG branches / maturity ladders).

**Non-duplication note (Phase-2).**
This pattern **does not** (i) define the meaning of RSCR trigger kinds, (ii) introduce “shadow specs” for CN/CG legality, (iii) redefine tri-state guards / penalties / set-return semantics, (iv) re-own shipping or harvesting, or (v) mint new `RSCRTriggerKindId` / default owners (design-time changes live in `G.Core` and are recorded via DRR, `E.9`).
All such universal norms are **cited via `G.Core`** and enforced through **delegation** in this pattern’s conformance checklist.

### Problem frame — Keeping shipped SoTA current without global rebuilds

Part G produces shipped, selector-ready artefacts (packs, bundles, evidence graphs, parity reports, dashboards). Once shipped, they are exposed to:

* **telemetry** (illumination/archive changes, parity outcomes, dashboard deltas),
* **decay** (freshness windows expire; epistemic debt grows),
* **edition drift** (descriptor/distance/transfer rules bump; policy pins evolve),
* **bridge evolution** (CL/plane penalties or calibrations update).

Without an explicit orchestration kit, refresh becomes either:

* a brittle set of ad-hoc “full rerun” rituals, or
* an audit-only posture that silently accumulates drift.

`G.11` is the **Part G owner** of the **refresh orchestration kit**: it turns typed refresh causes into **scoped plans** and **auditable execution reports**, while delegating all cause semantics and universal invariants to `G.Core`.
### Problem — Why naive refresh breaks comparability and legality

A refresh loop fails (conceptually) when any of the following happens:

1. **Full-rerun mania.** Minor edits (e.g., a single Bridge calibration) trigger pack-wide rebuilds without a traceable scope rationale.
2. **Editionless telemetry.** Telemetry signals are recorded without edition pins, making reruns non-comparable and parity-unreplayable.
3. **Alias-as-semantics.** Legacy trigger labels (e.g., `T0…T7`) are treated as if they define meaning, fragmenting refresh semantics across patterns.
4. **Silent crossings.** Refresh actions implicitly change crossing assumptions (UTS/Path/policy pins) without a visible CrossingBundle.
5. **Orchestration smuggles semantics.** Refresh introduces new default behaviors (dominance/portfolio/Γ-fold) or coerces partial orders into scalars “for convenience.”
### Forces — Minimal recomputation under strict invariants

* **Minimal scope vs. completeness.** Refresh must be *as local as possible* (slice-scoped), but still include a defensible dependency closure over evidence and crossings.
* **Operational urgency vs. auditability.** Refresh is triggered by run-time telemetry and decay, yet must remain auditable as Work (pins, refs, paths), not as opaque “decisions.”
* **Legacy stability vs. semantic unification.** Existing trigger labels must remain usable, but their meaning must be single-owner and id-based.
* **Modularity vs. orchestration power.** `G.11` must coordinate harvesting/parity/shipping without re-implementing them or importing discipline-specific method semantics into core.
* **Policy-bound behavior vs. “smart defaults.”** Ordering of refresh, priority heuristics, and budget handling are valuable—but must live as policy-bound extensions, not as hidden universal rules.
### Solution — RSCR-driven refresh as a P2W-scoped orchestration kit

#### G.Core linkage (normative)

**GCoreLinkageManifest (normative; canonical shape per `G.Core`; Nil‑elision permitted).**

`GCoreLinkageManifest := ⟨
  CoreConformanceProfileIds := {
    GCoreConformanceProfileId.PartG.AuthoringBase,
    GCoreConformanceProfileId.PartG.TriStateGuard,
    GCoreConformanceProfileId.PartG.UTSWhenPublicIdsMinted,
    GCoreConformanceProfileId.PartG.ShippingBoundary
  },

  RSCRTriggerSetIds := {GCoreTriggerSetId.RefreshOrchestration},

  CorePinSetIds := {
    GCorePinSetId.PartG.AuthoringMinimal,
    GCorePinSetId.PartG.CrossingVisibilityPins
  },

  CorePinsRequired := {
    RSCRTriggerKindId,
    RSCRTriggerAliasId?,
    scope: PathSliceId[] | PatternScopeId,
    payloadPins{…},

    RefreshPlanId,
    RefreshReportId,
    DeprecationNoticeId?,
    EditionBumpLogId?,

    SlotFillingsPlanItemRef[]?
  },

  DefaultsConsumed := ∅,
  TriggerAliasMapRef := G.Core.TriggerAliasMap.G11
⟩`

By the `G.Core` **Expansion rule**, the **effective** conformance ids / trigger‑kinds / pin‑obligations for `G.11` are the manifest expansions (profiles/sets/pin‑sets) plus the explicit deltas above.

**LegacyTriggerAliasIds (visible; labels only).** `{G.11:T0…T7}` (docked via `TriggerAliasMapRef`; aliases are never semantic authorities).
#### Refresh orchestration kit (pattern-owned; conceptual artefacts)

`G.11` defines a minimal kit of *authoring-plane* artefacts that make refresh explicit and auditable.

1. **`RefreshQueue` (conceptual queue).**
   A queue of refresh candidates keyed by scope (`PathSliceId` preferred; `PatternScopeId` permitted).
   Ordering, prioritization, and batching are policy-bound (and therefore extension-scoped), but every queue item carries canonical trigger kind ids.

2. **`RefreshPlan@Context` (WorkPlanning artefact).**
   A planned refresh is a WorkPlanning object that **does not execute Work** and **does not embed gate decisions**. It declares:

* `RefreshPlanId` (UTS-published id; editioned)
* `describedEntity` and `ReferencePlane` pins (by ref; no implicit widening)
* `TargetScope := PathSliceId[] | PatternScopeId[]`
* `PlannedTriggers := RSCRTrigger[]` (canonical trigger kind ids + scope + payload pins)
* `PlannedActions := RefreshAction[]` (each action delegates to an owner pattern)
* `RequiredPins := {EditionPins, PolicyPins, UTS/Path pins}` for replayability
* `PlanItemRefs := SlotFillingsPlanItemRef[]` (when planning baselines or reruns requires explicit planned slot fillings)

3. **`RefreshReport@Context` (Work/Audit artefact).**
   An execution report (Work or Audit artefact) that records:

* `RefreshReportId` (UTS-published id; editioned)
* `ExecutedActions[]` with links to invoked owner artefacts (e.g., new parity report id, new pack id)
* `ObservedDeltas` (telemetry deltas, legality changes, evidence-path changes) as refs/pins—not as untyped prose
* `RSCRRefs[]` (any RSCR / regression harness artefacts invoked)
* `EmittedNotices[] := DeprecationNoticeId[]` and `EditionBumpLogId[]`
* the canonical trigger kinds actually applied (not only aliases)

4. **`DeprecationNotice@Context` and `EditionBumpLog@Context`.**
   Controlled evolution artefacts that preserve ID-continuity:

* **DeprecationNotice** explains scope, reason class (canonical trigger kind ids), and successor refs.
* **EditionBumpLog** records edition increments and the pins that justify them.

> *Note (normative by delegation).* ID continuity and alias discipline are governed by `G.Core` (do not restate as local rules here).
#### Orchestration semantics (conceptual; delegating to owners)

`G.11` turns typed causes into scoped actions without owning the semantics of those actions.

**4.3.1 Ingestion.**
Consume RSCR triggers from:

* telemetry hooks (e.g., `G.8`, `G.10`, `G.12`),
* freshness/decay events (`B.3.4`),
* evidence/bridge/policy/edition edits (from the respective owners’ publication surfaces).

Every ingested signal is normalized into an `RSCRTrigger` (canonical id, scope, payload pins), with optional alias labels.

**4.3.2 Scope closure (EvidenceGraph-first).**
Compute the minimal dependency closure over:

* cited evidence paths (`G.6` `PathId/PathSliceId`),
* declared crossings (`G.7` sentinels; `CrossingBundle` visibility),
* and pinned references (editions/policies).

The closure is a *planning-time claim* (“these slices are affected”), not a Work-time output.

**4.3.3 Planning (P2W seam).**
Produce `RefreshPlan@Context` that schedules actions of the form:

* `RerunHarvest` (delegates to `G.2`/`G.1`/owner; if used)
* `RerunParity` (delegates to `G.9`)
* `RecomputeSelectionOrPortfolio` (delegates to `G.5`)
* `RebindBridgeOrCrossing` (delegates to `G.7` and visibility harnesses)
* `UpdateEvidenceBindings` (delegates to `G.6`)
* `ReshipPack` (delegates to `G.10`)
* `UpdateBundle` (delegates to `G.8`)
* `UpdateDashboardSlice` (delegates to `G.12`)
* `EmitDeprecationNotice` / `EmitEditionBumpLog` (pattern-owned publication surfaces)

**4.3.4 Execution + audit.**
Execute planned actions as Work (or Work-bound audit) and publish `RefreshReport@Context`.
Gating outcomes (admit / degrade / abstain) follow `G.Core` tri-state semantics and are recorded via policy ids and cited evidence paths, rather than as local bespoke statuses.
#### Extensions (pattern-scoped; non-core)

All discipline-specific refresh strategies, scheduling heuristics, and generator-specific wiring live as `GPatternExtension` blocks.

##### G.11:Ext.LegacyTriggers

**PatternScopeId:** `G.11:Ext.LegacyTriggers`
**GPatternExtensionId:** `LegacyTriggers`
**GPatternExtensionKind:** `InteropSpecific` (back-compat / alias docking)
**SemanticOwnerPatternId:** `G.Core`
**Uses:** `{G.Core}` (cites `G.Core.TriggerAliasMap.G11`)
**⊑/⊑⁺:** `∅`
**RequiredPins / EditionPins / PolicyPins (minimum):**

* `RSCRTriggerKindId[]` (canonical ids recorded on triggers)
* `RSCRTriggerAliasId?` (e.g., `G.11:T0…T7` as labels only)
* `scope: PathSliceId[] | PatternScopeId`

**RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.FreshnessOrDecayEvent, RSCRTriggerKindId.CrossingBundleEdit, RSCRTriggerKindId.PenaltyPolicyEdit, RSCRTriggerKindId.MaturityRungChange, RSCRTriggerKindId.EvidenceSurfaceEdit}`
**Notes (wiring-only):** This block **does not define** what `T0…T7` mean; it only preserves the labels and requires docking via `G.Core.TriggerAliasMap.G11`.
##### G.11:Ext.DecayAndDebt

**PatternScopeId:** `G.11:Ext.DecayAndDebt`
**GPatternExtensionId:** `DecayAndDebt`
**GPatternExtensionKind:** `DisciplineSpecific`
**SemanticOwnerPatternId:** `B.3.4` (freshness/decay semantics)
**Uses:** `{B.3.4, G.6}`
**⊑/⊑⁺:** `∅`
**RequiredPins / EditionPins / PolicyPins (minimum):**

* `FreshnessWindowDeclRef` (or equivalent window pin, as defined by the owner)
* `DecayPolicyIdRef` / `EpistemicDebtBudgetRef` (policy-bound)
* `PathSliceId[]` (affected evidence carriers)

**RSCRTriggerKindIds:** `{RSCRTriggerKindId.FreshnessOrDecayEvent, RSCRTriggerKindId.EvidenceSurfaceEdit, RSCRTriggerKindId.BaselineBindingEdit}`
**Notes (wiring-only):** Any budget/priority logic remains policy-bound; `G.11` only wires decay events to refresh planning.
##### G.11:Ext.QDRefreshWiring

**PatternScopeId:** `G.11:Ext.QDRefreshWiring`
**GPatternExtensionId:** `QDRefreshWiring`
**GPatternExtensionKind:** `MethodSpecific`
**SemanticOwnerPatternId:** `C.18` (QD semantics; descriptor/distance/insertion)
**Uses:** `{C.18, C.19, G.5, G.8}`
**⊑/⊑⁺:** `∅`
**RequiredPins / EditionPins / PolicyPins (minimum):**

* `DescriptorMapRef.edition`, `DistanceDefRef.edition`
* `CharacteristicSpaceRef.edition?` (required when a domain-family coordinate is declared by the QD owner)
* `InsertionPolicyRef`, `EmitterPolicyRef` (policy-bound)
* `PathSliceId` (archive/illumination scope) + `policy-id` for emitted telemetry triggers

**RSCRTriggerKindIds:** `{RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.PolicyPinChange}`
**Notes (wiring-only):** `G.11` does not restate QD semantics; it ensures pins are present so reruns are comparable.
##### G.11:Ext.OEERefreshWiring

**PatternScopeId:** `G.11:Ext.OEERefreshWiring`
**GPatternExtensionId:** `OEERefreshWiring`
**GPatternExtensionKind:** `MethodSpecific`
**SemanticOwnerPatternId:** `C.19` (open-ended exploration / E–E logistics)
**Uses:** `{C.19, G.5, G.8, G.9}`
**⊑/⊑⁺:** `∅`
**RequiredPins / EditionPins / PolicyPins (minimum):**

* `TransferRulesRef.edition`, `EnvironmentValidityRegion` (when OEE is declared by the owner patterns)
* `GeneratorFamilyId` / `TransferRulesRef` wiring pins (as published by the owners)
* telemetry scope pins (`PathSliceId`, `policy-id`)

**RSCRTriggerKindIds:** `{RSCRTriggerKindId.EditionPinChange, RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.PolicyPinChange}`
**Notes (wiring-only):** Any OEE method semantics live with the owner; this module only wires refresh triggers to comparable reruns.
##### G.11:Ext.SchedulingHeuristics (Phase-3 seed)

**PatternScopeId:** `G.11:Ext.SchedulingHeuristics`
**GPatternExtensionId:** `SchedulingHeuristics`
**GPatternExtensionKind:** `Phase3Seed`
**SemanticOwnerPatternId:** `owner TBD`
**Uses:** `{G.11}`
**⊑/⊑⁺:** `∅`
**RequiredPins / EditionPins / PolicyPins (minimum):**

* `RefreshPriorityPolicyIdRef` (policy-bound)
* `BudgetDeclRef` (time/compute/cost/risk ceilings; policy-bound)

**RSCRTriggerKindIds:** `{RSCRTriggerKindId.TelemetryDelta, RSCRTriggerKindId.FreshnessOrDecayEvent, RSCRTriggerKindId.MaturityRungChange}`
**Notes (seed, non-normative):** Scheduling strategies (bandit-style, queueing, cadence policies) are valuable but must not become Part‑G‑wide norms.
### Archetypal Grounding — System / Episteme (informative; Tell–Show–Show)

**`U.System` illustration — Safety-critical maintenance loop (pump + calibration).**
A centrifugal pump is serviced under a documented procedure (method description). Sensors report vibration drift (telemetry), and a calibration standard is updated (edition bump). `G.11` does not “rebuild the whole maintenance doctrine”: it emits a refresh plan scoped to the affected inspection slices (paths) and publishes a refresh report with pins to the updated standard edition and the evidence paths. Deprecation notices are issued for obsolete thresholds in the procedure’s acceptance clauses (by owner pattern), preserving ID continuity.

**`U.Episteme` illustration — Living review / benchmark pack (claims + parity).**
A claim sheet behind a shipped SoTA pack changes (new evidence, retraction, or revised measurement definition). Bridges are recalibrated, affecting CL/plane penalties. `G.11` ingests canonical trigger kinds, computes the minimal closure over affected `PathSliceId`s, schedules targeted parity reruns, then re-ships the pack through the shipping owner—while publishing an edition bump log that makes the evolution replayable.
### Bias-Annotation (informative)

Lenses tested: **Gov**, **Arch**, **Onto/Epist**, **Prag**, **Did**.

* **Arch bias (toward explicit wiring).** Risk: authors feel “over-pinned.” Mitigation: keep the minimum pin set small; push scheduling sophistication into extensions/policies.
* **Gov bias (toward audit over speed).** Risk: refresh becomes bureaucratic. Mitigation: the kit is intentionally thin (queue/plan/report), while action semantics remain delegated to owners.
* **Onto/Epist bias (toward single-owner semantics).** Risk: teams try to localize trigger meaning for convenience. Mitigation: alias docking is allowed, but semantics stay in `G.Core`.
* **Prag bias (toward minimal recomputation).** Risk: under-refresh if closure is too narrow. Mitigation: require closure rationale and allow explicit “scope wideners” as policy-bound pins.
* **Did bias (toward readable, reusable artefacts).** Risk: oversimplified examples. Mitigation: maintain System+Episteme grounding and keep SoTA-echoing explicit.
### Conformance Checklist (normative)

| ID                                                    | Requirement                                                                                                                                                                                                                                                                                                                                     | Purpose / Notes                                                                                                            |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **CC‑G11‑CoreRef**                                    | A conforming `G.11` artefact **MUST** satisfy the **effective** core conformance set implied by the `GCoreLinkageManifest` in `G.11:4.1` (profile expansion + explicit deltas; delegated to `G.Core`).                                                                                                                                       | Phase‑2 bridge clause: `G.11` is conformant only if the relevant `G.Core` invariants and trigger discipline are satisfied. |
| **CC‑G11.1 (Slice-scoped planning).**                 | A conforming `RefreshPlan@Context` **SHALL** be scoped to `PathSliceId[]` (preferred) or `PatternScopeId[]` and **SHALL** record canonical `RSCRTriggerKindId` for each planned cause. Pack-wide reruns **MAY** occur only if the declared dependency closure spans all slices; the closure rationale **SHALL** be recorded.                    | Prevents full-rerun mania while keeping a safety escape hatch explicit and auditable.                                      |
| **CC‑G11.2 (Edition discipline; QD/OEE wiring).**     | When QD and/or OEE are active, a conforming `RefreshPlan@Context` and `RefreshReport@Context` **SHALL** satisfy the required pin/edition/policy wiring of the applicable extension blocks (`G.11:Ext.QDRefreshWiring` and/or `G.11:Ext.OEERefreshWiring`). **`.edition` SHALL apply only on `…Ref`.** Missing required pins **SHALL** block publication. | Keeps replayability strict while moving method‑specific pin lists into `Extensions` (Phase‑2 modularity).                  |
| **CC‑G11.3 (Telemetry‑metric legality).**             | If a refresh publishes Illumination/QD/OEE outcomes, it **SHALL** publish **Q/D/QD‑score** (and any coverage/regret) as **telemetry metrics** and **IlluminationSummary** as a **telemetry summary**; these values **SHALL be excluded from dominance** unless a CAL policy explicitly promotes them, and the promoting **policy‑id SHALL be recorded** in SCR‑visible evidence bindings (via the cited owners).                                                                                                      | Prevents covert scalarisation and keeps “telemetry vs order” separation explicit.                                          |
| **CC‑G11.4 (Bridge penalties).**                      | Any refresh reacting to Bridge/plane changes **SHALL** satisfy `CC‑GCORE‑PEN‑1` (delegation), and **SHALL** publish `CL/CL^k/CL^plane` and the relevant `Φ/Ψ/Φ_plane` policy‑ids with loss notes so penalties route to `R_eff` only (F/G invariant).                                                                                                                                | Keeps penalty routing auditable during refresh.                                                                            |
| **CC‑G11.5 (Selector invariants).**                   | Any orchestrated re‑selection or portfolio update **SHALL** (i) satisfy `CC‑GCORE‑SET‑1` (delegation), and (ii) call the selector owner (`G.5`) under an unchanged lawful `ComparatorSet` (edition‑pinned where applicable), returning **sets** (Pareto/Archive) and introducing **no scalarisation** inside `G.11`.                                                                                                                       | Prevents refresh from changing order semantics.                                                                            |
| **CC‑G11.6 (Crossing visibility).**                   | All refresh actions that touch cross‑context reuse **SHALL** satisfy `CC‑GCORE‑CROSS‑1` (delegation) and the GateCrossing visibility harness (e.g., `E.18`): `CrossingRef` + BridgeCard + UTS + `CL/Φ_plane` policy‑ids. Missing/non‑conformant crossings **SHALL** block publication.                                                                                                                                 | Prevents “silent crossings” under refresh.                                                                                 |
| **CC‑G11.7 (Decay governance).**                      | When refresh is triggered by freshness/decay events, the refresh outputs **SHALL** choose and record a governance outcome (**Refresh / Deprecate / Waive**) with **budget notes** (policy‑bound), and **SHALL** publish the decision via `DeprecationNotice@Context` (and related pins) and SCR‑visible evidence bindings (via `G.6` / cited owners).                                                                                                                                                | Turns epistemic debt into explicit, comparable governance artefacts.                                                       |
| **CC‑G11.8 (No default smuggling).**                  | A conforming `G.11` refresh artefact **SHALL NOT** introduce new defaults for portfolio/dominance/Γ‑fold/guard behavior. If orchestrated steps rely on defaults, the artefact **SHALL** cite the single owner (via `G.Core.DefaultOwnership` and the invoked owner patterns) rather than restating defaults inside `G.11`.                                                                                                                                            | Protects single‑owner default discipline under orchestration pressure.                                                     |
| **CC‑G11.9 (Targeted RSCR before republication).**    | Before any refresh result is republished downstream (e.g., parity report updates, pack re‑shipping, dashboard slice updates), the execution **SHALL** run or cite a targeted RSCR/regression check for the affected scope and record `RSCRRefs[]` (or equivalent) in `RefreshReport@Context`; exceptions **SHALL** be expressed as `degrade/abstain` outcomes (policy‑bound) rather than silent skips.                                                                                         | Preserves “refresh ≠ vibes” by making regression gating explicit and slice‑scoped.                                         |
### Common Anti-Patterns and How to Avoid Them (informative)

| Anti-pattern                       | Symptom                                                           | Why it fails                                             | Repair                                                                            |
| ---------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Full-rerun mania**               | Any edit triggers a global rebuild                                | Costs explode; drift hides (no scope rationale)          | Enforce slice-scoped plans (CC‑G11.1); require closure rationale for global scope |
| **Editionless telemetry**          | Telemetry lacks `…Ref.edition`                                    | Reruns are non-comparable; parity breaks                 | Block publication on missing pins (CC‑G11.2)                                      |
| **Alias-as-semantics**             | `T*` labels are treated as meaning                                | Trigger meaning fragments; regressions become untestable | Dock aliases via `G.Core.TriggerAliasMap.G11`; record canonical ids               |
| **Silent crossing during refresh** | Refresh changes context/plane assumptions without crossings       | Violates crossing visibility; penalties become hidden    | Require crossing pins + E.18 visibility; block publication (CC‑G11.6)             |
| **Default smuggling**              | Refresh introduces “helpful” default dominance/portfolio behavior | Competing defaults appear; downstream arguments drift    | Cite owners via `G.Core.DefaultOwnership` (CC‑G11.8)                              |
| **Debt-by-prose**                  | “We decided not to refresh” exists only in narrative              | Not comparable; cannot be tested                         | Emit a DeprecationNotice (incl. a Waive outcome, if used) with pins (CC‑G11.7)    |
### Consequences (informative)

* **Selective, replayable upkeep.** Refresh becomes a controlled planning/execution loop rather than an implicit “maintenance vibe.”
* **Stable semantics with flexible operations.** Trigger meaning is centralized (`G.Core`), while scheduling sophistication can evolve as policy-bound extensions.
* **Clear ownership boundaries.** Orchestration coordinates owners; it does not redefine their semantics (shipping remains `G.10`, selection remains `G.5`, etc.).
* **Cost: pin discipline overhead.** Authors must carry enough ids/editions/policies to make refresh comparable. This is intentional: it replaces hidden drift with explicit wiring.
### Rationale (informative)

`G.11` is intentionally a **thin orchestration owner**:

* The refresh loop is powerful enough to coordinate reruns and republishing, but **too thin to become a second spec**. That is why trigger semantics, invariants, and defaults are delegated to `G.Core`.
* The kit is split across the **P2W seam** so that planning artefacts remain planning artefacts and executed work remains auditably executed work.
* Legacy stability is maintained by allowing trigger aliases (`T0…T7`) while prohibiting them from becoming semantic authorities.
### SoTA-Echoing — Post‑2015 practices aligned (informative)

Each entry follows: **claim → practice → source → alignment → adoption status**.

1. **Continuous refresh is necessary in deployed evaluation pipelines.**
   Practice: production ML systems use monitoring + retraining / reevaluation triggers and insist on reproducibility hooks.
   Source: Breck et al., *The ML Test Score* (2017); Amershi et al., *Software Engineering for Machine Learning* (2019).
   Alignment: `G.11` formalizes triggers as typed causes and forces edition/policy pins for replay.
   Adoption: **Adopt/Adapt** (adapted to id-based, PathSlice-scoped refresh rather than “retrain everything”).

2. **Non-stationarity requires explicit drift/decay handling, not ad-hoc updates.**
   Practice: continual learning emphasizes non-stationarity as a first-class maintenance condition.
   Source: Parisi et al., *Continual Lifelong Learning with Neural Networks* (2019); De Lange et al., *A Continual Learning Survey* (2021).
   Alignment: `B.3.4` supplies decay semantics; `G.11` wires decay events into refresh planning and controlled deprecation.
   Adoption: **Adapt** (refresh of conceptual artefacts and evidence closures, not untracked model mutation).

3. **Quality-Diversity requires archive semantics and comparability under descriptor/distance evolution.**
   Practice: QD methods treat the archive as the primary result and track changes under policy/edition conditions.
   Source: contemporary QD families such as CMA‑ME (post‑2018) and differentiable QD lines (post‑2019).
   Alignment: QD-specific meaning lives with the owner patterns; `G.11:Ext.QDRefreshWiring` ensures edition pins and scope pins exist so targeted archive refresh is lawful.
   Adoption: **Adopt** (set/archive preservation; no covert scalarization).

4. **Open-endedness co-evolves environments and agents; transfer rules must be versioned.**
   Practice: POET-class open-ended systems require explicit transfer rules and environment validity constraints.
   Source: Wang et al., POET (2019) and subsequent POET extensions (2020+).
   Alignment: `G.11:Ext.OEERefreshWiring` requires `TransferRulesRef.edition` and scope pins so refresh reruns remain comparable and auditable.
   Adoption: **Adopt/Adapt** (adapted to Part‑G pin/UTS publication discipline).

5. **Efficient orchestration benefits from bandit/early-stopping scheduling—but it must not become semantics.**
   Practice: modern hyperparameter/experiment scheduling uses bandit-style resource allocation and asynchronous early stopping.
   Source: Async Hyperband / BOHB-style work (2018+) as representative post‑2015 scheduling practice.
   Alignment: scheduling lives as policy-bound extension (`G.11:Ext.SchedulingHeuristics`) so core semantics remain stable.
   Adoption: **Adapt** (useful practice, but quarantined outside core norms).
### Relations

**Builds on:** `G.Core` (Part‑G invariants; RSCR trigger catalogue; alias docking; default ownership index), `G.6` (EvidenceGraph, `PathId/PathSliceId`), `G.7` (Bridge sentinels; CL/Φ/plane pins), `G.5` (selector & set-return), `G.8` (bundle telemetry hooks), `G.9` (parity), `G.10` (shipping hooks), `B.3.4` (freshness/decay), `E.18` (GateCrossing visibility).
**Coordinates with:** `G.12` (dashboard telemetry pins), optional `C.18/C.19` (QD/E–E pins), `C.23` (SoS-LOG branches and maturity ladders), `F.15` (RSCR harness surfaces, when present).
**Publishes to:** UTS (refresh plan/report, deprecations, edition bumps), and to the relevant owner patterns’ publication surfaces via delegated actions.
### G.11:End
## G.12 — DHC Dashboards (Discipline‑Health time‑series; lawful telemetry; generation‑first)

**Tag:** Architectural kit pattern (conceptual; notation‑independent; dashboard‑kit owner)

**Stage:** design‑time authoring **→** run‑time computation & publication (series and slices); **refresh/RSCR‑wired**

**Primary hooks:** **G.Core** (core invariants, linkage catalogues, RSCR trigger catalogue, default ownership index), **C.21** (DHC slots + `DHCPack` / `DHCMethodSpec` / `DHCSeries` artefacts), **G.6** (EvidenceGraph; `PathId`/`PathSliceId` citation), **G.7** (Bridge calibration / CL & `Φ/Ψ/Φ_plane` policy surfaces; when crossings/plane routing is used), **G.11** (telemetry‑driven refresh/decay orchestration), **G.5** (selector portfolios / set‑returning outputs, when dashboard consumes performance trade‑offs), **A.19** (CN‑Spec governance card), **G.0** (CG‑Spec legality gate), **F.17/F.18** (UTS + twin labels), **E.5.2** (notation independence), **E.10** (LEX discipline).
*(Optional, extension‑gated hooks:* **G.2** (SoTA palette & DHC alignment hooks), **C.18/C.19** (QD / E‑E / OEE telemetry pins), **G.8** (SoS‑LOG bundle & maturity ladder view), **G.10** (shipping inclusion of dashboard slices).)*

**Why this exists.** **C.21** defines *what* lawful “discipline health” slots are (CHR‑typed; scale/legality aware; freshness‑windowed), but it does not, by itself, provide a **generation‑first** method for producing **edition‑pinned, evidence‑citable DHC time series** that remain refreshable under RSCR.
**G.12** is that dashboard method: it defines the **dashboard kit surfaces** (`DHCSeries@Context`, `DHCRow@Context`, `DashboardSlice@Context`, telemetry pins) and a pipeline for computing and publishing DHC readings **without shadow specs**, **without illicit arithmetic**, and **without smuggling scalar winners** out of partial orders or telemetry.

**Modularity note.** G.12 owns **dashboard artefacts and wiring** only. It **does not** own CN‑Spec / CG‑Spec / CHR / CAL / selection semantics / evidence semantics / shipping / refresh heuristics. It binds to those owners via refs/pins/editions/policy‑ids and keeps any method‑/generator‑specific panels strictly inside **Extensions** (`GPatternExtension` blocks).

### G.12:1 — Intent

Produce **lawful, reproducible, refresh‑aware discipline‑health dashboards** by turning **C.21** DHC definitions into:

1. a **UTS‑published** time series (`DHCSeries@Context`) whose rows are evidence‑citable by **`PathId`/`PathSliceId`**,
2. a dashboard slice view (`DashboardSlice@Context`) that is **view‑only** (no hidden re‑aggregation or “new objectives”), and
3. **telemetry pins** that allow **G.11** to plan **slice‑scoped refresh** (rather than “rerun everything”).
### G.12:2 — Problem frame

Dashboards routinely drift or become illegal when they:

* mix scales (ordinal treated as interval; “average maturity level”),
* hide normalization and re‑parameterization (“normalized score” with no CN‑Spec pins),
* silently cross Contexts or planes (implicit reuse without explicit Bridge/Plane routing),
* fail to pin editions of computation methods, descriptor spaces, or distances,
* turn portfolios/archives into a single scalar “winner” by dashboard fiat,
* cannot refresh selectively (no actionable telemetry pins; only narrative “this changed”).

We need a **dashboard kit** that makes the *method of obtaining dashboard values* explicit and auditable, while keeping universal invariants single‑owned in **G.Core**.
### G.12:3 — Forces

* **Legality and comparability are contract‑owned.** Dashboards must not invent local legality/acceptance/normalization “mini‑specs”; they pin and cite **CN‑Spec** and **CG‑Spec** surfaces (routed via **G.Core**).
* **Ordinal discipline is non‑negotiable.** The most common dashboard failure mode is illicit arithmetic on ranks/categories; the kit must make “compare‑only” enforceable.
* **Set‑returning discipline survives into views.** Dashboards must not silently scalarize partial orders or selector portfolios; any scalarization/promotion is an explicit owner policy (routed via **G.Core**; semantics owned by the relevant pattern/policy).
* **Edition‑awareness is the difference between “trend” and “drift”.** If the method definition changes, the dashboard must either (i) fork series edition, or (ii) emit telemetry and refresh slices under pinned conditions.
* **RSCR must be actionable.** Causes are emitted as **canonical ids** (typed trigger kinds + id‑valued pins), not prose.
### G.12:4 — Solution — Compute and publish DHC series lawfully, with RSCR‑ready telemetry

#### G.12:4.0 — G.Core linkage (normative)

This pattern is **core‑invariant‑bearing** and therefore binds to **G.Core** by declaration (not by restating invariants here).

**GCoreLinkageManifest (G.12)** *(normative; expands per `G.Core:4.2`)*
Effective obligations/pins/triggers are computed as **union(expand(sets), explicit deltas)** under `Nil‑elision`.

* `CoreConformanceProfileIds` := {
  `GCoreConformanceProfileId.PartG.AuthoringBase`,
  `GCoreConformanceProfileId.PartG.TriStateGuard`,
  `GCoreConformanceProfileId.PartG.UTSWhenPublicIdsMinted`,
  `GCoreConformanceProfileId.PartG.ShippingBoundary`
  }

* `RSCRTriggerSetIds` := {
  `GCoreTriggerSetId.BridgeCalibrationKit`
  }

* `RSCRTriggerKindIds` := {
  `RSCRTriggerKindId.LegalitySurfaceEdit`
  }
  *(Any additional causes required by optional dashboard panels MUST be introduced only by the corresponding `GPatternExtension` blocks in `G.12:4.9`.)*

* `DefaultsConsumed` := `∅`
  *(Default routing for `DefaultId.PortfolioMode` / `DefaultId.DominanceRegime` is only relevant when portfolio outputs are consumed; see `G.12:Ext.PortfolioTelemetry`.)*

* `CorePinSetIds` := {
  `GCorePinSetId.PartG.AuthoringMinimal`,
  `GCorePinSetId.PartG.CrossingVisibilityPins`
  }

* `CorePinsRequired` *(pattern delta; pin names only; all are id‑valued unless noted)* := {
  `DHCSeriesId`,
  `TargetSlice` *(USM tuple; varies only by `Γ_time` across rows; no implicit “latest”)*,
  `Γ_time` *(time selector / freshness window; required per row; series MAY additionally declare a window‑family spec)*,
  `DHCSlotId[]` *(C.21‑owned typed DHC slots; each resolves to `CharacteristicId` + scale/unit/polarity + reference plane binding + lane discipline)*,
  `DHCMethodSpecRef.edition`,
  `DHCMethodRef.edition`,
  `PathSliceId[]`
  }
  *(Nil‑elision applies. All other definition pins are conditional: they MUST appear only when actually used and when their semantic owner/extension is present (e.g., UNM/normalization pins, QD/OEE telemetry pins, transfer rules pins, pack inclusion pins).)*

* `TriggerAliasMapRef` := `∅`
#### G.12:4.1 — Objects (LEX heads; twin‑register discipline)

All objects below are **notation‑independent**; serialisations (if any) live under shipping/interop ownership, not here.

**(1) `DHCSeries@Context`** *(UTS‑published dashboard series; C.21‑grounded)*
A time‑indexed publication of computed DHC readings for a `Discipline × ContextSlice`, aligned with `U.DHCSeries` semantics from **C.21** and pinned to method/contract refs.

Minimal fields (conceptual; ids/pins only):

`DHCSeries@Context := ⟨  
  DHCSeriesId,  
  CG-FrameContext,  
  describedEntity := ⟨GroundingHolon, ReferencePlane⟩,  
  TargetSlice,                         // USM tuple; time series varies Γ_time across rows (explicit, no implicit “latest”)  
  DHCSlotId[],                         // slot set selected from C.21 (typed DHC slots; not “just Characteristic ids”)  
  DHCPackRef.edition?,  
  DHCMethodSpecRef.edition,  
  WindowSpec?,                         // optional window-family spec used to generate per-row Γ_time  
  CNSpecRef.edition, CGSpecRef.edition,  
  EvidenceGraphId?,                    // if resolvable; else row-level Path pins suffice  
  DashboardSliceId[]?,                 // published view slices (optional)  
  TelemetryPinSetId?                   // wiring to refresh (conceptual)  
⟩`

**(2) `DHCRow@Context`** *(one timepoint / window reading; Work/Audit‑citable)*
A single computed row of the series.

`DHCRow@Context := ⟨  
  DHCRowId,  
  DHCSeriesId,  
  Γ_time,  
  DesignRunTag = run,  
  DHCSlotId,  
  value, units/scaleRef?, compareOnly?,  
  stance ∈ {pass|degrade|abstain},  
  DHCMethodRef.edition, DHCMethodSpecRef.edition,  
  PathSliceId[], PathId[]?, EvidenceGraphId?,  
  evidenceLaneTags? := {TA|VA|LA},  
  crossingPins? := ⟨BridgeId[], PlaneMapRef.edition?, CL/CL^k/CL^plane?, Φ/Ψ/Φ_plane policy‑ids…⟩  
⟩`

**(3) `DashboardSlice@Context`** *(view; non‑semantic)*
A view‑friendly grouping over one or more series/rows. It MUST NOT introduce new aggregation/legality semantics; it is a projection over already computed, pinned, citable rows.

`DashboardSlice@Context := ⟨  
  DashboardSliceId(UTS),  
  DHCSeriesId(UTS)[],  
  SliceAnnotations?,                  // labels, grouping metadata, explanatory text  
  ViewSpecId?,                        // view template id (policy‑bound; no semantics implied)  
  IncludedRowIds?  
⟩`

**(4) `DHCTelemetryPin`** *(refresh wiring pin; id‑based causes)*
A conceptual telemetry pin emitted to refresh/orchestration (owner: **G.11**) with canonical trigger kind ids.

`DHCTelemetryPin := ⟨  
  triggerKindId: RSCRTriggerKindId,  
  scope: PathSliceId[] | PatternScopeId,  
  payloadPins: { …ids… }              // editions, policy‑ids, UTS row ids, window ids, etc.  
⟩`

**Ref discipline.** `.edition` SHALL appear only on `…Ref` (per **E.10**). Dashboard artefacts that mint public ids publish **Tech/Plain twins** (UTS discipline).
#### G.12:4.2 — Method‑of‑Obtaining Output (generation‑first; design‑time → run‑time)

**Stage A — Author & bind (design‑time)**

A1. **Select the DHC slot set (owner: C.21).**
Choose `DHCSlotId[]` from **C.21** (typed DHC slots), and declare the series scope explicitly as `TargetSlice` (USM tuple) plus an explicit time selector (`Γ_time` per row; optionally a `WindowSpec` that generates the row windows). Do not restate slot semantics in the dashboard kit; cite the C.21 owners.

A2. **Bind governance card and legality gate (owners: A.19, G.0).**
Pin `CNSpecRef.edition` and `CGSpecRef.edition`. Any normalization or numeric comparability assumptions are expressed by explicit CN‑Spec artefacts (ids/refs) and any numeric legality requirements cite CG‑Spec artefacts (SCP / MinimalEvidence / Γ‑fold pins as applicable). The dashboard does not introduce local “shadow specs”.
If the dashboard series/slice actually uses cross‑Context or cross‑plane routing, it MUST additionally pin the relevant crossing and penalty‑policy surfaces as ids (Bridge/CL/plane ids, `Φ/Ψ/Φ_plane` policy‑ids, `PlaneMapRef.edition?`) and cite their semantic owners (typically `G.7` for bridge calibration/CL kits, routed via `G.Core`). The dashboard MUST NOT encode a dashboard‑local “penalty regime”.

A3. **Pin computation methods (owner: C.21).**
For each slot/method used to compute a time series value, record `DHCMethodSpecRef.edition` and `DHCMethodRef.edition` (table‑backed, per C.21). The dashboard series is edition‑aware: if a method spec changes, the dashboard either forks the series edition or emits telemetry and refreshes under explicit pins.

A4. **Declare optional panels via Extensions only.**
If the dashboard depends on (i) selector portfolio outputs, (ii) QD illumination / archive telemetry, (iii) open‑endedness telemetry, (iv) maturity ladder views, or (v) pack inclusion, then the relevant `GPatternExtension` block(s) in `G.12:4.9` MUST be present and their pins MUST be satisfied.

**Stage B — Compute rows (run‑time; Work/Audit)**

B1. **Resolve evidence by Path (owner: G.6).**
Compute rows from evidence cited as `PathSliceId[]` (and `PathId[]` when needed), under the declared window/freshness regime. Preserve lane discipline and handle missingness using tri‑state stances (routed via **G.Core**).

B2. **Compute slot values using pinned methods (owner: C.21).**
Compute each slot value by applying the pinned `DHCMethodRef.edition`/`DHCMethodSpecRef.edition` under the pinned governance card and legality gate. Enforce “no illicit arithmetic” for ordinals/categoricals as a dashboard‑kit obligation (see CC‑G12.\*).
Any cross‑Context/plane use is expressed only via explicit crossing pins (Bridge/Plane routing) and policy ids (routed via **G.Core**).

B3. **Emit RSCR‑actionable telemetry pins (owner: G.11).**
When any of the declared pins/editions/policies/windows/evidence slices change, emit `DHCTelemetryPin` events with canonical `RSCRTriggerKindId` and payload pins sufficient for **slice‑scoped** refresh planning.

**Stage C — Publish series & slices (run‑time; publication)**

C1. **Publish `DHCRow@Context` and `DHCSeries@Context` as UTS artefacts.**
Mint/publish UTS rows with Tech/Plain twins and include the required pins (window, reference plane, method editions, evidence paths).

C2. **Publish `DashboardSlice@Context` as a view‑only projection.**
Slices are groupings/annotations over already computed rows; they must not redefine legality, acceptance, or scalarization.

C3. **Wire refresh via telemetry pins (no orchestration ownership).**
Dashboards emit pins; refresh orchestration remains owned by **G.11**.
#### G.12:4.9 — Extensions (pattern‑scoped; non‑core)

> **Extension rule (Phase‑2).** Anything method‑, generator‑, or view‑family‑specific belongs here, as `GPatternExtension` modules. These modules may add **mode‑specific definition pins** and additional RSCR trigger kinds, but MUST NOT redefine Part‑G‑wide invariants or defaults.

##### G.12:Ext.SoTAPalette — SoTA palette & DHC alignment hooks (optional)

**PatternScopeId:** `G.12:Ext.SoTAPalette`
**GPatternExtensionId:** `SoTAPalette`
**GPatternExtensionKind:** `InteropSpecific`
**SemanticOwnerPatternId:** `G.2` *(SoTA palette + DHC alignment hooks semantics live in G.2; G.12 only wires them)*
**Uses:** `{G.2}`
**⊑/⊑⁺:** `∅`

**RequiredPins/EditionPins/PolicyPins (minimum):**

* `SoTA_PackRef.edition?`
* `DHC-SenseCellId[]?` *(when series pins to DHC alignment hooks / sense‑cell inventories)*
* `DHCAlignmentHookId[]?`

**RSCRTriggerKindIds (delta):** `∅`
##### G.12:Ext.PortfolioTelemetry — selector/portfolio integration panel

**PatternScopeId:** `G.12:Ext.PortfolioTelemetry`
**GPatternExtensionId:** `PortfolioTelemetry`
**GPatternExtensionKind:** `MethodSpecific`
**SemanticOwnerPatternId:** `G.5` *(portfolio semantics and set‑return discipline)*
**Uses:** `{G.5, G.6}`
**⊑/⊑⁺:** `∅`

**RequiredPins/EditionPins/PolicyPins (minimum):**

* `TaskSignatureRef?` *(when portfolio semantics depend on TaskSignature traits)*
* `DominanceRegime` *(resolved via `DefaultId.DominanceRegime` owner routing; publish the resolved regime, do not invent a local default)*
* `PortfolioMode` *(resolved via `DefaultId.PortfolioMode` owner routing; publish the resolved mode)*
* `SCRId/DRRId` *(or equivalent selector evidence pins, when dashboard row depends on selector outcomes)*

**DefaultsConsumed:** {`DefaultId.DominanceRegime`, `DefaultId.PortfolioMode`} *(owners routed via `G.Core.DefaultOwnershipIndex`; no local defaults)*

**RSCRTriggerKindIds (delta):** `∅` *(base triggers suffice; any extra triggers must be explicit)*

**Notes (wiring‑only):**

* The dashboard may visualise portfolio/Archive telemetry, but MUST keep set‑returning semantics; any scalar “headline number” is a view projection, not a legality‑bearing decision.
##### G.12:Ext.QDTelemetry — illumination / archive telemetry panel

**PatternScopeId:** `G.12:Ext.QDTelemetry`
**GPatternExtensionId:** `QDTelemetry`
**GPatternExtensionKind:** `MethodSpecific`
**SemanticOwnerPatternId:** `C.18` *(QD / NQD‑CAL semantics; descriptor/distance/insertion policy)*
**Uses:** `{C.18, G.5, G.11}`
**⊑/⊑⁺:** `∅`

**RequiredPins/EditionPins/PolicyPins (minimum):**

* `DescriptorMapRef.edition`
* `DistanceDefRef.edition`
* `CharacteristicSpaceSpecRef.edition?` *(iff the descriptor/axis space is editioned as a published surface; required for view reproducibility)*
* `InsertionPolicyRef`
* `EmitterPolicyRef?`
* `ArchiveSnapshotRef?` *(id/pin for the published archive snapshot, if any)*
* `PathSliceId[]` *(scope for refresh; slice‑keyed)*

**RSCRTriggerKindIds (delta):** `∅` *(base trigger set already includes `RSCRTriggerKindId.TelemetryDelta`; add only genuinely additional kinds here)*

**Notes (wiring‑only):**

* Illumination/coverage signals are treated as telemetry. Any promotion of telemetry into selection dominance is owned elsewhere (typically CAL policy; routed via `G.Core`).
* If descriptor axes/dimensions are surfaced as published identifiers (not just local UI text), they MUST follow the Tech/Plain twin‑label discipline (UTS Name Cards); otherwise they remain non‑normative view annotations.
##### G.12:Ext.OpenEndedTelemetry — open‑endedness / transfer telemetry panel

**PatternScopeId:** `G.12:Ext.OpenEndedTelemetry`
**GPatternExtensionId:** `OpenEndedTelemetry`
**GPatternExtensionKind:** `GeneratorSpecific`
**SemanticOwnerPatternId:** `C.19` *(E/E‑LOG & exploration accounting; generator/transfer telemetry wiring)*
**Uses:** `{C.19, G.5, G.11}`
**⊑/⊑⁺:** `∅`

**RequiredPins/EditionPins/PolicyPins (minimum):**

* `TransferRulesRef.edition` *(when transfer rules are part of the telemetry interpretation)*
* `EnvironmentValidityRegionId?`
* `ProbeBudgetPolicyId?`
* `PathSliceId[]`

**RSCRTriggerKindIds (delta):** `∅` *(base trigger set already includes `RSCRTriggerKindId.TelemetryDelta`; add only genuinely additional kinds here)*

**Notes (wiring‑only):**

* Open‑endedness metrics are telemetry‑level artefacts; dashboards must not silently convert them into “dominance objectives”.
##### G.12:Ext.MaturityLadderPanel — maturity ladder view (optional)

**PatternScopeId:** `G.12:Ext.MaturityLadderPanel`
**GPatternExtensionId:** `MaturityLadderPanel`
**GPatternExtensionKind:** `DisciplineSpecific`
**SemanticOwnerPatternId:** `G.8` *(maturity ladder semantics in SoS‑LOG bundle/maturity cards)*
**Uses:** `{G.8, G.6, G.11}`
**⊑/⊑⁺:** `∅`

**RequiredPins/EditionPins/PolicyPins (minimum):**

* `MaturityCardRef`
* `MaturityRungId?`
* `PathId/PathSliceId` *(evidence citations for rung claims)*

**RSCRTriggerKindIds (delta):** `{RSCRTriggerKindId.MaturityRungChange}`
##### G.12:Ext.PackInclusion — shipping inclusion stub (optional)

**PatternScopeId:** `G.12:Ext.PackInclusion`
**GPatternExtensionId:** `PackInclusion`
**GPatternExtensionKind:** `InteropSpecific`
**SemanticOwnerPatternId:** `G.10` *(shipping owner)*
**Uses:** `{G.10}`
**⊑/⊑⁺:** `∅`

**RequiredPins/EditionPins/PolicyPins (minimum):**

* `SoTA‑PackId`
* `DashboardSliceId(UTS)` *(or `DHCSeriesId(UTS)` when shipping series directly)*
* `CNSpecRef.edition`, `CGSpecRef.edition` *(as shipped pins, per G.10 wiring)*

**RSCRTriggerKindIds (delta):** `∅`

**Notes (wiring‑only):**

* This module is a wiring stub: it does not define shipping behaviour; it only states which dashboard artefacts may be cited by `SoTA‑Pack(Core)`.
##### G.12:Ext.ViewFamilySeed — advanced view families (Phase‑3 seed; owner TBD)

**PatternScopeId:** `G.12:Ext.ViewFamilySeed`
**GPatternExtensionId:** `ViewFamilySeed`
**GPatternExtensionKind:** `Phase3Seed`
**SemanticOwnerPatternId:** `owner TBD`
**Uses:** `{}`
**⊑/⊑⁺:** `∅`

**Notes (Phase‑3 seed; non‑normative):**

* Placeholder for advanced dashboard view families (e.g., embedding‑based similarity panels, predictive drift detectors, change‑point overlays). Any such module must remain policy‑bound and must not introduce new Part‑G‑wide norms.
### G.12:5 — Interfaces (conceptual; kit surface)

| ID  | Interface   | Consumes   | Produces  |
| --- | ----------- | ---------- | --------- |
| **G.12‑1 `Create_DHCSeries`** | Create/bind a DHC series scope (C.21‑grounded; edition‑aware) | `DHCSlotId[]`, `DHCPackRef.edition?`, `DHCMethodSpecRef.edition`, `TargetSlice` (USM), `WindowSpec?`, `ReferencePlane`, `CNSpecRef.edition`, `CGSpecRef.edition` | `DHCSeries@Context` (UTS artefact; edition‑aware) |
| **G.12‑2 `Update_DHCSeries`** | Compute/update one or more rows under pinned conditions (run‑time; Work/Audit‑citable) | `PathSliceId[]`, `EvidenceGraphId?`, `DHCMethodRef.edition`, `DHCMethodSpecRef.edition`, `Γ_time`, crossing pins (if any) | `DHCRow@Context[]` (UTS artefacts; stance + pins; `DesignRunTag = run`) |
| **G.12‑3 `Integrate_PortfolioTelemetry`** *(extension‑gated)* | Integrate selector/portfolio evidence into a slice/series | See `G.12:Ext.PortfolioTelemetry` | Extension‑gated fields / telemetry pins |
| **G.12‑4 `Integrate_QDTelemetry`** *(extension‑gated)* | Integrate QD illumination/archive telemetry | See `G.12:Ext.QDTelemetry` | Extension‑gated fields / telemetry pins |
| **G.12‑5 `Integrate_OEETelemetry`** *(extension‑gated)* | Integrate open‑endedness / transfer telemetry | See `G.12:Ext.OpenEndedTelemetry` | Extension‑gated fields / telemetry pins |
| **G.12‑6 `Publish_DashboardSlice`** | Publish a view slice as a projection over computed rows | `DHCSeriesId(UTS)[]`, `DHCRowId(UTS)[]?`, `SliceAnnotations?` | `DashboardSlice@Context` (UTS artefact; view‑only) |
| **G.12‑7 `Emit_TelemetryPins`** | Emit RSCR‑actionable telemetry pins for refresh | `RSCRTriggerKindId`, `scope`, `payloadPins` | `DHCTelemetryPin[]` (consumed by `G.11`) |

(*No file formats are introduced here; serialisation recipes live under shipping/interop ownership.*)
### G.12:6 — Conformance checklist (CC‑G12, normative)

| CC ID   | Requirement  | Verification notes  |
| ------- | ------------ | ------------------- |
| **CC‑G12‑CoreRef** | The pattern satisfies the **effective** `G.Core` obligations declared by `GCoreLinkageManifest (G.12)` (profiles/sets/deltas expanded per `G.Core:4.2`).    | Evidence: the manifest is present; required pins/defaults/triggers are accounted for; no local restatement overrides core owners.  |
| **CC‑G12.1** | **DHC slot typing (C.21‑grounded).** Every published dashboard value is indexed by a **C.21‑authored** `DHCSlotId` (typed DHC slot: `CharacteristicId` + scale/unit/polarity + reference plane binding + lane discipline) and is scoped by an explicit `TargetSlice` + `Γ_time`. | Evidence: row/series references `DHCSlotId` and pins `ReferencePlane` and `Γ_time` (or a series `WindowSpec` that yields row Γ_time). |
| **CC‑G12.2** | **Edition discipline (no drift).** Every published time‑series value carries `DHCMethodRef.edition` and any other definition‑pins actually used to obtain it (e.g., `DescriptorMapRef.edition`, `DistanceDefRef.edition`, `UNM_id`, `NormalizationMethodInstanceId[]`, `ComparatorSetRef.edition?`). No free‑text versioning. | Check that `.edition` appears only on `…Ref`; check presence of all definition pins used by the pipeline; extension pins appear only when their extension blocks are present. |
| **CC‑G12.3** | **Contract citation for numeric operations (no shadow specs; no illicit arithmetic).** Any numeric operation in the dashboard pipeline is legal only under explicit **CG‑Spec** and **CN‑Spec** pins (e.g., `SCPRef.edition`, `MinimalEvidenceRef.edition`, `ΓFoldRef.edition?` when used), and any normalization is explicit (`UNM_id` + `NormalizationMethodInstanceId[]` etc). Ordinal/categorical slots remain **compare‑only** (no illicit arithmetic). | Check that operations cite pinned owners; reject “normalize, then compare” without explicit UNM pins; reject arithmetic over ordinal slots unless an owner‑declared lawful mapping exists. |
| **CC‑G12.4** | **Set‑returning selection is preserved.** If the dashboard consumes selection/portfolio outputs, it MUST preserve set‑return semantics and MUST publish the resolved `DominanceRegime` and `PortfolioMode` by citing the single owners (via `G.Core.DefaultOwnershipIndex`) rather than inventing local defaults. Any promotion of illumination/telemetry into dominance MUST cite the owner policy (typically CAL) and be auditable via evidence paths. | Check for set/portfolio outputs; check that any scalar headline is view‑only; check citations to owner defaults/policies. |
| **CC‑G12.5** | **UTS publication discipline.** `DHCSeries@Context` and its rows (and any published slices) are published as UTS artefacts with Tech/Plain twins and stable identifiers; deprecations/edition bumps follow the canonical UTS discipline. | Check stable ids + twin labels; check that publication does not smuggle “gate decisions” as authoritative artefacts. |
| **CC‑G12.6** | **Bridge/plane routing is explicit when used.** If a series crosses contexts or planes, the rows MUST cite the Bridge/PlaneMap routing (`BridgeId[]`, `CL/CL^k/CL^plane`, `Φ/Ψ/Φ_plane policy‑ids`, `PlaneMapRef.edition?`) and respect penalty routing to `R_eff` only (semantics routed via `G.Core`). | Check presence of crossing pins when contexts/planes differ; check that any loss is expressed via R‑lane impact only. |
| **CC‑G12.7** | **Telemetry sufficiency for slice‑scoped RSCR.** Emitted dashboard telemetry pins MUST (i) use canonical `RSCRTriggerKindId`, (ii) include `scope` (PathSliceId[] or PatternScopeId) and the touched `…Ref.edition`/policy/window pins, and (iii) block publication when required pins are missing. Each published row is evidence‑citable by `PathSliceId[]` under explicit `Γ_time`. | Check: no free‑text causes; payload includes path/window/editions/policies; missing pins block publish; row has PathSliceId[] and Γ_time. |
| **CC‑G12.8** | **Extension gating.** If any extension‑owned fields/pins appear, the corresponding `G.12:Ext.*` module is present and satisfied. | E.g., QD pins require `G.12:Ext.QDTelemetry`; maturity panel requires `G.12:Ext.MaturityLadderPanel`; SoTA palette hooks require `G.12:Ext.SoTAPalette`; pack inclusion requires `G.12:Ext.PackInclusion`. |
### G.12:7 — Bias‑Annotation (informative)

* **Didactic:** dashboard artefacts publish pins and paths first; views second.
* **Architectural:** no “dashboard‑local contract surfaces”; invariant routing is via `G.Core`.
* **Pragmatic:** slice‑scoped refresh is enabled by canonical trigger ids + payload pins.
* **Epistemic:** compare‑only ordinals and explicit provenance prevent “trend‑as‑drift”.
### G.12:8 — Consequences

* **Dashboards become reproducible artefacts, not screenshots.** A `DHCRow@Context` is re‑derivable under pinned editions and evidence windows.
* **Selective maintenance becomes possible.** Telemetry pins let `G.11` refresh what changed (path slice / window / method edition), rather than rerunning the entire pipeline.
* **Illicit scalarization is structurally discouraged.** Set‑returning and contract‑owned semantics are preserved into the dashboard layer.
### G.12:9 — Relations

**Builds on:** `G.Core`, `C.21`, `G.6`, `G.11`, `A.19`, `G.0`, `F.17/F.18`, `E.5.2`, `E.10`.
**Coordinates with:** `G.5` *(when portfolio/set outputs are consumed)*, `G.7` *(when crossings/plane routing or `CL/Φ/Ψ/Φ_plane` policy pins are used)*, `G.8` *(when maturity ladder view is included)*, `G.10` *(when dashboard slices are shipped)*.
**Constrains:** dashboard consumers: dashboards are projections over pinned, evidence‑citable rows; they do not mint new contract semantics.
### G.12:10 — Author’s quick checklist

1. Declare the dashboard series scope: `TargetSlice` (USM tuple), `ReferencePlane`, and an explicit `Γ_time` regime (per‑row; optionally a `WindowSpec` that yields the row windows).
2. Select `DHCSlotId[]` and cite **C.21** (do not restate slot semantics).
3. Pin `DHCMethodSpecRef.edition` and `DHCMethodRef.edition` for every computed slot/value (plus any other definition pins actually used).
4. Ensure rows are evidence‑citable by `PathSliceId[]` and include explicit `Γ_time` (row is run‑time: `DesignRunTag = run`).
5. Publish UTS artefacts with twins and the required pins.
6. Emit canonical telemetry pins (`RSCRTriggerKindId` + scope + payload pins) for `G.11`.
7. If SoTA palette hooks / portfolio / QD / OEE / maturity / shipping panels are needed, add the corresponding `G.12:Ext.*` blocks and satisfy their pins.
### G.12:11 — Worked micro‑examples (informative; SoTA‑oriented)

**(A) Decision‑making discipline dashboard (multi‑tradition).**
Slots (from **C.21**): *ReproducibilityRate* (freshness‑windowed), *StandardisationLevel* (ordinal), *AlignmentDensity* (bridge density over DHC‑SenseCells), *MetaDiversity* (operator family diversity), *DisruptionBalance* (target‑band metric).
Evidence: citation graphs, benchmark traces, and bridge calibrations are referenced via `PathSliceId[]`.
Optional panels:

* `G.12:Ext.PortfolioTelemetry` to visualise set‑returning method portfolios without forcing a scalar winner.
* `G.12:Ext.QDTelemetry` to include illumination/archive telemetry using modern QD families (e.g., CMA‑ME / policy‑gradient QD variants / surrogate‑assisted illumination lines) as telemetry.

**(B) Evolutionary software architecture dashboard (open‑endedness‑aware).**
Slots: stability/reproducibility metrics, standardisation stages (ordinal), cross‑paradigm alignment density, and disruption balance.
Optional panels:

* `G.12:Ext.OpenEndedTelemetry` to include open‑endedness telemetry (environment diversity / transfer events) using POET‑style and related post‑2015 open‑ended generation families, while keeping such signals in telemetry unless an explicit owner policy promotes them.
### G.12:End
## External Interop Hooks for SoTA Discipline Packs (conceptual)

**Tag.** Architectural kit pattern (conceptual interop kit; notation‑independent; normative when used)
**Stage.** *design‑time registration & alignment* → *run‑time ingestion, telemetry, refresh*
**Primary hooks.** `G.Core` (Part‑G core invariants + trigger catalogue + default ownership), `G.2` (SoTA Synthesis Pack), `G.3` (CHR Pack), `G.4` (CAL Pack), `G.5` (selector & registries), `G.6` (EvidenceGraph + PathId/PathSliceId), `G.7` (BridgeMatrix + CL/planes), `G.8` (SoS‑LOG bundle surfaces), `G.9` (parity harness), `G.10` (shipping), `G.11` (refresh orchestration), `G.12` (dashboards), `A.19` (CN‑Spec), `A.18` (CSLC legality), `G.0` (CG‑Spec), `F.17` (UTS), `E.5.2` (notation independence), `E.18/A.21/A.27` (GateCrossing/CrossingBundle checks).

**Status.** Draft (Phase‑2 universalized; `G.Core` linkage explicit)
**Normativity.** Normative when used (when any `G.13` surface is authored/emitted/consumed); informative otherwise.

**Non‑duplication note (Phase‑2 universalization).** This pattern **does not restate** Part‑G‑wide invariants (contract‑surface single‑ownership, crossing visibility, penalty routing, set‑return discipline, typed RSCR triggers, default ownership, Δ‑discipline). Those are **single‑owned** in `G.Core` and referenced here via the linkage manifest and CC delegations (*cite, don’t duplicate*).

### Problem frame

FPF already supports lawful characterization, evidence wiring, selector‑side set returns, parity, shipping, dashboards, and refresh. What remains frictionful in practice is **interoperability with external scholarly indexes and discipline repositories** (concept registries, paper/claim graphs, dataset registries, taxonomy stores, “science‑of‑science” indicator feeds), which teams routinely use as *inputs* when authoring a SoTA discipline pack.

Without an explicit **conceptual interop kit**, authors tend to build one‑off pipelines whose “implied semantics” leak into the framework: edition drift becomes invisible, cross‑plane/context reuse becomes implicit, and external signals quietly start acting like a shadow contract surface.

`G.13` provides the missing kit: **conceptual registration, alignment, and telemetry hooks** that let external sources be wired into the Part‑G pipeline (**G.2 → G.5 → G.9 → G.10 → G.11**, and optionally **G.12**) while preserving Part‑G invariants via `G.Core`.
### Problem

External sources publish **claim‑adjacent signals** (citations, concept graphs, “task/method” tags, replication links, dataset usage, disruption‑style indicators, benchmark metadata). These are useful for *generation* (palette building, portfolio exploration, candidate bridge discovery), not only for audit. But typical interop practices create predictable failure modes:

* **Contract‑surface leakage.** External numeric signals get treated as if they were lawful “scores” without explicit binding to CHR/CAL/CG surfaces.
* **Implicit crossings.** Cross‑context and cross‑plane reuse happens through opaque transformations, without explicit exposure of the crossing bundle pins needed downstream.
* **Edition drift + refresh brittleness.** Snapshots change, schemas drift, indicator definitions get revised; without edition‑pinned interop surfaces and typed trigger causes, parity and dashboard stability degrade.
* **Evidence disconnect.** “Derived features” are produced without explicit EvidenceGraph anchoring, making later refutation/repair expensive.
* **Format‑as‑norm.** A convenient serialisation (KG export, JSON schema, RO‑Crate, etc.) becomes treated as the specification, undermining notation independence.
### Forces

| Force                           | Tension                                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Notation independence**       | Useful serialisations vs the requirement that conformance is judged on **conceptual** surfaces.        |
| **Pluralism vs parity**         | Diverse scholarly traditions and indexes vs lawful, edition‑aware comparability and reproducibility.   |
| **Interop as generation input** | Interop should speed SoTA authoring, not merely decorate audit reports.                                |
| **Planes & bridges**            | Cross‑plane/context reuse must remain explicit and auditable rather than implicit in “aligners”.       |
| **Telemetry vs dominance**      | External telemetry should inform exploration and refresh without silently changing selector semantics. |
| **Operational drift**           | External sources evolve; interop must be refresh‑ready by construction (typed causes + payload pins).  |
### Solution — Conceptual interop kit: registered sources, alignment cards, feature derivations, and RSCR‑wired telemetry

#### G.Core linkage (normative)

**Builds on:** `G.Core`.

**GCoreLinkageManifest (normative).**
*(Canonical form, Nil‑elision, and Expansion rule are defined in `G.Core`.)*

`GCoreLinkageManifest := ⟨
  CoreConformanceProfileIds := {
    GCoreConformanceProfileId.PartG.AuthoringBase,
    GCoreConformanceProfileId.PartG.UTSWhenPublicIdsMinted,
    GCoreConformanceProfileId.PartG.ShippingBoundary
  },
  RSCRTriggerSetIds := {GCoreTriggerSetId.SoTAHarvestSynthesis},
  RSCRTriggerKindIds := {RSCRTriggerKindId.BaselineBindingEdit},   // delta: planned‑baseline linkage edits can be interop‑relevant

  CorePinSetIds := {
    GCorePinSetId.PartG.AuthoringMinimal,
    GCorePinSetId.PartG.CrossingVisibilityPins
  },

  CorePinsRequired := {
    // Interop pins (G.13‑specific; avoid duplicating `GCorePinSetId.PartG.CrossingVisibilityPins`)
    ExternalIndexRef.edition,
    ClaimMapperRef.edition?,
    MappingPolicyRef?,
    PlaneMapRef.edition?,
    ScaleEmbeddingSpecRef.edition?,

    EvidenceGraphId?,
    InteropSurfaceId?
  },

  DefaultsConsumed := {DefaultId.PortfolioMode, DefaultId.DominanceRegime}
⟩`

**Payload‑pin note (informative).** When emitting RSCR triggers for interop‑driven changes, payload pins should include the edited edition/policy identifiers, the impacted scope, and the applicable crossing‑visibility pins (per `GCorePinSetId.PartG.CrossingVisibilityPins`) when crossings/UTS/paths are involved.
#### Interop kit objects & surfaces (pattern‑owned; notation‑independent)

All objects below are **conceptual**. Any concrete serialisation belongs to Annex/Interop or tooling notes and is not normative for Part‑G conformance.

* **`ExternalIndexCard@Context`** — registration of an external source and its snapshot.

  **Shape (conceptual):**
  `⟨ ExternalIndexId, ProviderName?, ExternalIndexType, CoverageScope, Licence?, ExternalEdition, FreshnessWindow?, describedEntity := ⟨GroundingHolon, ReferencePlane⟩, Notes? ⟩`

  **Intent.** Create a stable, citable “source card” so downstream artefacts can pin the *card edition* via `ExternalIndexRef.edition`, while the provider snapshot remains visible as `ExternalEdition` (do not echo provider snapshot ids into downstream cards; cite refs instead).

* **`ClaimMapperCard@Context`** — a conceptual “mapping recipe” that yields FPF‑native artefacts from an external source.

  **Shape (conceptual):**
  `⟨ MapperId, ExternalIndexId, MappingPolicyRef, Targets{ClaimSheet|BridgeHints|SoSFeatureSet|UTSProposals}, PlaneMapRef?, ScaleEmbeddingSpecRef?, EvidenceGraphId?, CSLCProofStubs? ⟩`

  **Notes.**

  * This is **not** a shadow legality gate. It is an interop surface that **cites** owners (`A.19`, `G.0`, `G.3`, `G.4`) and publishes the required pins for downstream audit/refresh.
  * When cross‑plane or cross‑context reuse is implicated, the alignment outputs must route via the existing crossing bundles (see `G.Core` linkage).
  * Avoid “edition echo”: downstream artefacts cite `ExternalIndexRef.edition` and `ClaimMapperRef.edition` (and optional `PlaneMapRef.edition` / `ScaleEmbeddingSpecRef.edition`) rather than copying snapshot ids/editions as free fields.

* **`SoSFeatureTransform@Context`** — declares how external signals become **CHR‑typed** SoS features (for DHC/dashboard usage and/or SoS‑LOG rule evaluation).

  **Shape (conceptual):**
  `⟨ SoSFeatureTransformId, Inputs{ClaimSheetId[] | ExternalSignalsRef}, SoSFeatureSetId, FeatureTypingRefs{CharacteristicId/ScaleId/CoordinateId}, ReferencePlane, EvidenceGraphId?, PathSliceId[]?, ProofHooks? ⟩`

  **Notes.**

  * The derivation is a **typing + provenance** surface; it does not introduce new comparators or new governance cards or legality gates.

* **`ScaleEmbeddingSpec@Context`** — optional constraints for representation/space alignment used inside an alignment recipe.

  **Shape (conceptual):**
  `⟨ ScaleEmbeddingSpecId, IntendedUse, AllowedTransformFamily, RequiredPins{NormalizationMethodRef.edition?}, ProhibitedCoercions ⟩`

  **Design intent.** Make any representation alignment *explicitly constrained* and edition‑pinned, instead of silently “creating a new scale”.
  **LEX/UTS note (informative).** `ScaleEmbeddingSpec` is a new LEX head; when it mints a public id it must be published to UTS with twin labels (see `G.Core` / UTS profile).

* **`IndexTelemetryPin`** — an emitted refresh input that makes interop changes RSCR‑visible.

  **Shape (conceptual; RSCR‑typed):**
  `⟨ triggerKindId: RSCRTriggerKindId, scope: PathSliceId[] | PathId[] | PatternScopeId, payloadPins{ExternalIndexId, ExternalIndexRef.edition, ClaimMapperRef.edition?, MappingPolicyRef?, PlaneMapRef.edition?, ScaleEmbeddingSpecRef.edition?, PathId[]?, PathSliceId[]?, UTSRowId[]?, …} ⟩`

  **Routing.** Emitted to `G.11` as refresh input; recorded with canonical `RSCRTriggerKindId` causes.

* **`InteropSurface@Context`** — a selector‑/dashboard‑facing summary of what interop artefacts exist and how they are pinned.

  **Shape (conceptual):**
  `⟨ InteropSurfaceId, ExternalIndexId, ExternalIndexRef.edition, MapperId?, ClaimMapperRef.edition?, MappingPolicyRef?, SoSFeatureSetId?, EvidenceGraphId?, PathSliceId[]?, PlaneMapRef.edition?, ScaleEmbeddingSpecRef.edition?, UTSRowId[] ⟩`

  **Publication.** Published to UTS with twin labels as applicable.
#### Generation‑first interop flow (notation‑independent; owner‑delegating)

1. **Register source editions.** Author `ExternalIndexCard@Context` for each external source/snapshot used for SoTA authoring, including `ExternalEdition` and the `describedEntity` plane anchor.
2. **Author mapping recipes.** Create `ClaimMapperCard@Context` describing which FPF artefacts are produced (ClaimSheets, BridgeHints, feature sets, UTS proposals), and which policies/specs constrain the mapping (policy refs + optional `PlaneMapRef` / `ScaleEmbeddingSpecRef`).
3. **Produce FPF‑native inputs.** Use the alignment recipe outputs as inputs to:

   * `G.2` harvesting (ClaimSheets / operator & object inventories / candidate bridge hints),
   * `G.3` CHR typing (when numeric signals are formalized as CHR characteristics/scales/coordinates),
   * `G.4` acceptance/threshold policies (when a downstream decision requires explicit CAL policy rather than telemetry),
   * `G.12` dashboards (when derived SoS features are used as DHC slots).
4. **Feed selection/parity/shipping without smuggling semantics.**

   * `G.5` consumes the produced artefacts under its own contract surfaces and returns set‑valued outcomes (selector semantics remain owned by `G.5` + `G.Core`).
   * `G.9` parity consumes pinned editions/windows and produces traceable parity reports.
   * `G.10` shipping may include interop surfaces **as cited artefacts**; `G.13` does not own shipping.
5. **Emit telemetry and refresh causes.** Any change in external editions, alignment policies, plane maps, or embedding specs emits:

   * a canonical `RSCRTriggerKindId` (per `G.Core`),
   * a scope (`PathSliceId[]` and/or `PatternScopeId`),
   * payload pins (editions/policies/UTS rows),
     enabling `G.11` to plan slice‑scoped refresh.
#### Interfaces — minimal I/O standard (conceptual; kit‑only)

| ID   | Interface   | Consumes  | Produces   |
| ---- | ----------- | --------- | ---------- |
| **G.13‑1 `Register_ExternalIndex`**  | Register `ExternalIndexCard@Context` | Provider metadata, scope, **ExternalEdition**, freshness, describedEntity anchor   | `ExternalIndexCard@Context` (+ UTS row when published)   |
| **G.13‑2 `Map_ClaimsToFPF`**   | Apply `ClaimMapperCard@Context`   | `ExternalIndexCard@Context`, `MappingPolicyRef`, optional `PlaneMapRef`/`ScaleEmbeddingSpecRef`, optional EvidenceGraph hooks | `ClaimSheet@Context`, `BridgeHints`, optional `SoSFeatureSet@Context`, optional UTS proposals |
| **G.13‑3 `Derive_SoSFeatures`**  | Produce CHR‑typed SoS features  | ClaimSheets / external signals refs, CHR typing refs, legality proof hooks | `SoSFeatureSet@Context` (CHR‑typed; provenance pinned)   |
| **G.13‑4 `Publish_InteropSurface`**  | Publish interop summary | outputs of G.13‑2/‑3, UTS refs | `InteropSurface@Context` (+ UTS rows/twins) |
| **G.13‑5 `Emit_IndexTelemetryPin`** | Emit refresh input  | edition/policy changes + scope + payload pins  | telemetry to `G.11` (typed causes + payload pins)   |
| **G.13‑6 `Wire_To_SoTA_Pack`** | Provide shipping hook  | `InteropSurface@Context` + citations to upstream artefacts  | `G.10` pack hooks (as cited payload; no serialisation mandated)  |
### Extensions (pattern‑scoped; non‑core)

`G.13` keeps provider/method specifics out of the kit core. Any such specificity appears as `GPatternExtension` blocks with stable **PatternScopeId**s. These modules are **wiring‑only**: they bind pins/editions/policies and cite the semantic owner rather than redefining semantics.

#### G.13:Ext.ExternalIndexProviderWiring (Phase‑3 seed)

**PatternScopeId:** `G.13:Ext.ExternalIndexProviderWiring`
**GPatternExtensionId:** `ExternalIndexProviderWiring`
**GPatternExtensionKind:** `Phase3Seed`
**SemanticOwnerPatternId:** `owner TBD` *(Annex/Interop or a future dedicated interop owner)*
**Uses:** `{G.13}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `ExternalIndexType`
* `ExternalEdition` *(as published on `ExternalIndexCard@Context`)*
* `Licence?`
* `CoverageScope`
* `ProviderChangePolicyId?` *(if provider‑specific “schema drift” handling exists)*

**RSCRTriggerSetIds / RSCRTriggerKindIds:** `∅` *(covered by `G.13:4.1`)*
**Notes (seed; wiring‑only):**

* Provider‑specific ingestion choices (e.g., OpenAlex‑class, Crossref‑class, ORKG‑class, discipline repositories) **must not** become Part‑G‑wide norms in Phase‑2. This module only records which provider cards exist and which editions/policies are pinned.
#### G.13:Ext.EmbeddingBasedAlignment (Phase‑3 seed; method‑specific wiring stub)

**PatternScopeId:** `G.13:Ext.EmbeddingBasedAlignment`
**GPatternExtensionId:** `EmbeddingBasedAlignment`
**GPatternExtensionKind:** `Phase3Seed`
**SemanticOwnerPatternId:** `owner TBD` *(Annex/Interop or a future dedicated interop owner; Phase‑3 owner decision required)*
**Uses:** `{G.13, A.19, E.5.2}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `ScaleEmbeddingSpecRef.edition`
* `NormalizationMethodRef.edition?` *(when a declared normalization/representation transform is used)*
* `MappingPolicyRef`
* `EvidenceGraphId?` *(when evidence paths for alignment decisions are published)*

**RSCRTriggerSetIds / RSCRTriggerKindIds:** `∅` *(covered by `G.13:4.1`)*
**Notes (wiring‑only; post‑2015 practice orientation):**

* “Embedding‑based” techniques are treated as **declared transforms** constrained by `ScaleEmbeddingSpec` and/or `NormalizationMethod` references, rather than as implicit semantics.
* The module binds editions and policies; it does not define what is “similar enough”.
#### G.13:Ext.EntityResolutionAndAliasDocking (interop‑specific; Phase‑3 seed)

**PatternScopeId:** `G.13:Ext.EntityResolutionAndAliasDocking`
**GPatternExtensionId:** `EntityResolutionAndAliasDocking`
**GPatternExtensionKind:** `Phase3Seed`
**SemanticOwnerPatternId:** `owner TBD` *(likely UTS‑adjacent; requires Phase‑3 owner decision)*
**Uses:** `{F.17, E.10}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `UTSRowId[]` *(for externally‑sourced entities that become publicly citable)*
* `ExternalIdAliasSetId?` *(labels only; canonical ids remain UTS ids)*
* `TokenizationPolicyId?`

**RSCRTriggerSetIds / RSCRTriggerKindIds:** `∅` *(covered by `G.13:4.1`)*
**Notes (seed; wiring‑only):**

* This module exists to prevent “ID drift by renaming” for externally sourced entities. It is intentionally a Phase‑3 seed until a single semantic owner is chosen.
### Archetypal grounding (informative; SoTA‑oriented)

**System.** *Software architecture portfolio design.*
Register an external scholarly index edition for “software architecture” concept neighborhoods. Align extracted technique/tactic claims into ClaimSheets and derive a CHR‑typed feature set (e.g., evidence depth, maturity). Use `G.5` to select a **set** of tactics under multi‑objective tradeoffs, and ship a SoTA pack that cites the interop surface.

**Episteme.** *Science‑of‑science discipline dashboard.*
Align external claim graphs (replication, standardisation, disruption‑style proxies) into CHR‑typed features for DHC series. Publish a dashboard slice that cites the external edition and alignment policy; refresh triggers fire when the external edition updates.

**OEE/QD.** *Open‑ended environment generation.*
Register external environment/task taxonomies as index cards. Align them into generator‑family registries (as cited artefacts), keeping coverage/regret strictly as telemetry inputs. Use refresh to re‑align when the taxonomy edition changes.
### Bias‑Annotation (informative)

* **Vendor/tool bias.** The kit names conceptual surfaces only; it avoids vendor‑specific file formats or tooling claims.
* **Metric‑authority bias.** External indicators are treated as *inputs* that must be typed, pinned, and evidenced; they are not authority by default.
* **Representation bias.** Representation/embedding choices are forced into explicit `Spec` + edition pins (no hidden semantics).
* **Discipline bias.** Interop supports pluralism by preserving explicit crossings and versioned alignments instead of forcing a single canonical external ontology.
### Conformance Checklist (CC‑G13; applies when G.13 surfaces are used)

1. **CC‑G13‑CoreRef.** *(normative)* `G.13` implementations **MUST** satisfy the *effective* `G.Core` obligations declared by `G.13:4.1` (`GCoreLinkageManifest`), including trigger typing, default‑ownership routing, and crossing‑visibility pin discipline.

2. **CC‑G13‑InteropIsNotAContractSurface.** *(delegated)* Interop surfaces **MUST NOT** introduce shadow legality/comparability gates; they cite `CN‑Spec`/`CG‑Spec`/CHR/CAL owners and publish pins instead.
   → delegate to `CC‑GCORE‑CN‑CG‑1`.

3. **CC‑G13‑CrossingsAreExplicitWhenInteropTouchesPlanesOrContexts.** *(delegated)* Any cross‑plane/context reuse implied by alignment **MUST** be made explicit through the crossing visibility discipline.
   → delegate to `CC‑GCORE‑CROSS‑1`.

4. **CC‑G13‑PlanePenaltyPoliciesAreOwneredAndPinned.** *(local; owner‑citing)* If `PlaneMapRef` is used (or alignment implies plane‑level penalties), interop surfaces **MUST** publish the relevant policy‑id pins via the crossing‑visibility discipline, and any such policies **MUST** satisfy the constraints owned by `CG‑Spec` (cite `CC‑G0‑Φ`). Interop surfaces **MUST NOT** define interop‑local penalty functions.

5. **CC‑G13‑SetReturnPreserved.** *(delegated)* Interop **MUST NOT** introduce hidden scalarisation or forced single‑winner selection.
   → delegate to `CC‑GCORE‑SET‑1`.

6. **CC‑G13‑DefaultClaimsAreCitationsOnly.** *(delegated)* Any mention of defaults (e.g., dominance regime, portfolio mode) is a **citation** to the single owner in `G.Core.DefaultOwnershipIndex`, not a local default statement.
   → delegate to `CC‑GCORE‑DEF‑1`.

7. **CC‑G13‑EditionDisciplineForInteropCards.** *(local)* `ExternalIndexCard@Context` and `ClaimMapperCard@Context` **MUST** expose edition pins (`ExternalIndexRef.edition`, `ClaimMapperRef.edition`). Any interop surface published to UTS **MUST** cite the relevant `…Ref.edition` values (incl. `PlaneMapRef.edition?`, `ScaleEmbeddingSpecRef.edition?`) when present.
   FPF edition keys **MUST** appear only on `…Ref.edition` pins when a reference is present. Provider snapshot labels (e.g., `ExternalEdition` on `ExternalIndexCard@Context`) may exist on the source card, but **MUST NOT** be copied into downstream artefacts as free‑floating “edition fields”; downstream artefacts cite the corresponding `…Ref.edition` pins instead.
   In particular, interop transforms **MUST NOT** perform illicit arithmetic on ordinal/compare‑only scales (e.g., averaging or subtraction); any aggregation must be via lawful CAL operators with explicit scale legality (cite `A.18` / `CC‑G0‑CSLC`).

8. **CC‑G13‑SoSFeaturesAreCHRTypedAndLegal.** *(local; owner‑citing)* If `SoSFeatureTransform@Context` is used, produced SoS features **MUST** be CHR‑typed via `FeatureTypingRefs{CharacteristicId/ScaleId/CoordinateId}` (owner: `G.3`) and any legality/units obligations must be satisfied via CSLC/CG owners (cite `A.18` / `G.0` / `G.4`; do not invent interop‑local legality gates).

9. **CC‑G13‑TelemetryEmitsCanonicalTriggerKinds.** *(delegated)* Interop‑driven changes (external edition bumps, mapping policy changes, plane‑map edits, embedding‑spec edits) **MUST** emit canonical `RSCRTriggerKindId` causes with explicit scope and payload pins.
   → delegate to `CC‑GCORE‑TRIG‑1`, `CC‑GCORE‑TRIG‑2`, `CC‑GCORE‑TRIG‑3`, `CC‑GCORE‑TRIG‑4`.

10. **CC‑G13‑IDContinuityForExternallySourcedIdentifiers.** *(delegated)* Interop publication **MUST** follow Δ‑discipline: no “renaming by meaning”; use aliases/deprecations as required.
   → delegate to `CC‑GCORE‑ID‑1`, `CC‑GCORE‑ID‑2`.

11. **CC‑G13‑NotationIndependence.** *(local)* Conformance is judged on the conceptual objects in `G.13:4.2`. Any serialisation is non‑normative and must not redefine semantics.
   *(Cites `E.5.2` for notation independence.)*
### Common Anti‑Patterns and How to Avoid Them

* **Anti‑pattern: “Format == spec”.** Treating an export schema (KG dump, JSON, RO‑Crate, etc.) as the normative definition.
  **Remedy:** Keep `ExternalIndexCard` / `ClaimMapperCard` / `InteropSurface` as the conceptual contract; treat serialisation as an appendix/tooling concern.

* **Anti‑pattern: Hidden scale invention.** An embedding similarity becomes a “score” without explicit typing/binding.
  **Remedy:** Require `ScaleEmbeddingSpecRef` + edition pins and bind any derived features through CHR/CAL owners.

* **Anti‑pattern: Implicit plane/context reuse.** Reusing external concept graphs across contexts without explicit crossing pins.
  **Remedy:** Publish crossing visibility pins and route through bridge/plane owners; never fuse contexts “inside the aligner”.

* **Anti‑pattern: Edition‑free dashboards.** Feeding externally derived rows into dashboards without pinned editions/policies.
  **Remedy:** Pin `ExternalIndexRef.edition` and `ClaimMapperRef.edition`; emit RSCR triggers on changes.

* **Anti‑pattern: Interop asserts defaults.** “Interop decides dominance regime / portfolio mode.”
  **Remedy:** Treat defaults as citations only (single owner in `G.Core.DefaultOwnershipIndex`).
### Consequences

* **Interop becomes refresh‑ready.** External source drift produces typed RSCR causes with scopes/payload pins; refresh becomes slice‑scoped rather than global guesswork.
* **Generation‑first authoring becomes cheaper.** External sources become controlled inputs into SoTA synthesis and portfolio exploration, not ad‑hoc audit decoration.
* **Conceptual hygiene improves.** Explicit cards + edition pins reduce semantic leakage from tools/formats/providers.
* **Cross‑tradition reuse becomes auditable.** Plane/context reuse is surfaced as crossings rather than embedded assumptions.
### Rationale

FPF is a conceptual framework for disciplined creative work, not a data governance system. External scholarly infrastructure is valuable precisely because it provides fast, wide coverage—but without an explicit interop kit, that value is purchased by silently importing semantics (implicit comparisons, unpinned editions, hidden transformations).

`G.13` resolves the tension by turning “interop” into **first‑class conceptual wiring**: cards/surfaces that pin editions, cite owners, expose provenance hooks, and produce typed refresh causes, while leaving domain/tool specifics in `Extensions` (or Phase‑3 owners).
### SoTA‑Echoing (post‑2015, for orientation; non‑normative)

* **Scholarly claim graphs & open indexes.** Open research KGs and open scholarly indexes encourage claim‑level representations and concept taxonomies as interop substrates (post‑2015 ecosystem: KG‑style contribution graphs; open indexing initiatives). Treat these as *sources* registered via `ExternalIndexCard`, not as semantic owners.

* **Neural representations for scientific text.** Transformer‑based scientific encoders (e.g., SciBERT‑class; citation‑aware paper representations such as SPECTER‑class; later retrieval‑oriented scientific embedding families) are useful as *alignment heuristics*. In FPF terms, they belong behind `ScaleEmbeddingSpec` + pinned editions/policies (see `G.13:Ext.EmbeddingBasedAlignment`).

* **Schema matching & entity resolution (deep‑learning era).** Modern matcher families (deep entity matching, contrastive representation alignment, GNN‑assisted graph alignment) help populate interop cards, but must not become “implicit semantics”; record their use as policy‑bound wiring in extensions.

* **Systematic review process modernisation.** PRISMA‑2020‑class workflow records (post‑2015 practice) are valuable as evidence anchors and coverage telemetry; treat them as evidenced inputs (EvidenceGraph anchors + pinned editions/windows), not as legality gates.

* **QD / Illumination and OEE portfolios.** Post‑2015 QD (MAP‑Elites successors, CMA‑ME line, differentiable QD toolkits) and OEE (POET‑class and related environment/method co‑evolution lines) often rely on external taxonomies and environment corpora. Interop should expose those as pinned external editions and keep coverage/regret as telemetry inputs—never as implicit dominance.
### Relations

**Builds on:** `G.Core`.
**Imports:** `G.2`, `G.3`, `G.4`, `G.5`, `G.6`, `G.7`, `G.9`, `G.10`, `G.11`, `A.19`, `A.18`, `G.0`, `F.17`, `E.5.2`, `E.18`.
**Publishes to:** UTS (twin labels where applicable); refresh inputs to `G.11`; shipping hook surfaces to `G.10` (as cited artefacts).
**Relates to:** `G.12` (dashboards), `G.8` (SoS‑LOG bundle surfaces) when interop‑derived artefacts are consumed there.
### Author’s quick checklist (informative)

1. Register each external source snapshot as an `ExternalIndexCard@Context` with explicit `ExternalEdition`.
2. Author a `ClaimMapperCard@Context` with explicit `MappingPolicyRef` and required edition pins.
3. If you derive SoS features, declare a `SoSFeatureTransform@Context` and cite CHR typing refs and provenance hooks.
4. Publish an `InteropSurface@Context` that cites all active `…Ref.edition` values and UTS rows.
5. On any external edition or policy change, emit canonical RSCR trigger causes with explicit scope + payload pins.
6. Keep provider/tool specifics in `Extensions` (or Phase‑3 seed) and do not let formats redefine semantics.
### G.13:End
