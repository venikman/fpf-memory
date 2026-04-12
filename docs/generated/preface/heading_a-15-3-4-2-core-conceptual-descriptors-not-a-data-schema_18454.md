---
title: "A.15.3:4.2 Core conceptual descriptors (not a data schema)"
description: "Generated reference page for heading:a-15-3-4-2-core-conceptual-descriptors-not-a-data-schema:18454."
---

# A.15.3:4.2 Core conceptual descriptors (not a data schema)
> Preface node `heading:a-15-3-4-2-core-conceptual-descriptors-not-a-data-schema:18454`

## Content

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
