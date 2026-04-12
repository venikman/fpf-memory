---
title: "G.Core:4.1 - Delegation-first routing for Part‑G‑wide invariants"
description: "Generated reference page for heading:g-core-4-1-delegation-first-routing-for-part-g-wide-invariants:54327."
---

# G.Core:4.1 - Delegation-first routing for Part‑G‑wide invariants
> Preface node `heading:g-core-4-1-delegation-first-routing-for-part-g-wide-invariants:54327`

## Content

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
