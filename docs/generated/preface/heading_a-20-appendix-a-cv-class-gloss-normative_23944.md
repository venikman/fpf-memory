---
title: "A.20:Appendix A — CV Class Gloss (normative)"
description: "Generated reference page for heading:a-20-appendix-a-cv-class-gloss-normative:23944."
---

# A.20:Appendix A — CV Class Gloss (normative)
> Preface node `heading:a-20-appendix-a-cv-class-gloss-normative:23944`

## Content

* **MechanismUnitsCoherence.** Internal unit/scale coherence within the step; no declarations or translations of units/planes (GateFit scope).
* **LawSetInvariants.** Mechanism‑declared invariants hold (e.g., mass/energy balance in a model, determinism under fixed editions).
* **AdmissibilityConditionsSatisfaction.** Inputs lie within admissible windows/guards declared by the mechanism’s **AdmissibilityConditions**; failure yields `degrade` or `abstain` per class policy.
  **Minimum declaration (normative):**
  `AdmissibilityDecl := { domains: {name: set/poset}+, guards: [predicate_id]*, windows: {Γ_time: snapshot|interval|policy}, observables: [signal_id]*, edition: EditionId }`.
  The declaration is surfaced on MVPK as references only; it introduces no arithmetic on faces.
* **LipschitzBounds / stability.** Bounded sensitivity to perturbations as declared by mechanism; optional where meaningful.
  **Method binding (normative):**
  `LipschitzBoundRef := { method ∈ {spectral_norm|CROWN|IBP|rand_smoothing|other}, metric_space: {X: norm_id, Y: norm_id}, bound: value_or_interval, units/plane: P, validity_window: Γ_time(basis), edition: EditionId }`.
  The bound is **edition‑pinned** and **plane/units‑declared**; proofs/witness artefacts are referenced (no new numeric claims on faces).
  **Minimal declaration template (normative):**  
  `AdmissibilityConditions := { Domains[]{var, type, range, units, plane}, Guards[]{predicate, editionRefs}, ObservationWindows[]{Γ selector, freshness window}, ObservableSigns[]{name, detection rule}, Editions{… } }`  
  — **No authoring of units/planes** here; only references. — Γ selectors must be explicit.
* **TypeDomainRange.** Type/domain/range compliance of inputs/outputs (ref‑only to definitions).
* **ReinterpretationEquivalence.** Mechanism’s reinterpretation preserves internal meaning on a **PathSlice**.  
  **Witness (normative):** **ReinterpretationEquivalenceWitness** (see §4.7) with: `(i)` `PathSliceId`, `PublicationScopeId`, `(ii)` bidirectional mapping (iso/optic) with Put‑Get/Get‑Put obligations, `(iii)` commuting squares for adjacent raw transfers, `(iv)` **NoHiddenScalarization** assertion (if comparable), `(v)` definedness region.  
  — **No plane/unit change**; any describedEntity change must have `KindBridge (CL^k)` on UTS.
* **LipschitzBounds / stability.** Bounded sensitivity of the mechanism under a declared metric.  
  **Certificate (normative):** `LipschitzCertificate := { metricId (with units/plane), bound L, methodId, methodRef (e.g., spectral estimate / cert. robustness bound), validity region (inputs/state), proof sketch/ref }`.  
  — The **method** MUST be cited; **units/plane** of the metric MUST be explicit; bounds are **ref‑only** at CV; any acceptance action remains GateFit.
* **TypeDomainRange.** Well‑typedness and domain/range consistency for the transformation signature.
  (Enumeration mandated by A.20; GF matters excluded).
* **ReinterpretationEquivalence (StructuralReinterpretation).** Existence of a correspondence/reversibility witness between source and retarget projections; preservation of `⟨L,P,E⃗,D⟩`; no comparator/plane/unit declaration or translation at CV. The witness is **PathSlice‑local** and supports **idempotence & reversibility** within the addressed slice. The normative record is `ReinterpWitness` (see §4.7).

## A.20:Appendix B — LEX discipline (summary)

Register token classes (Tech) include: `U.TransductionFlow`, `U.TransductionGraph`, `OperationalGate`, `GateProfile`, `GateCheckKind`, `GateCheckRef`, `DecisionLog`, `FreshnessTicket`, `FinalizeLaunchValues`, `SubflowRef`, `FlowEmbed`, `SentinelId`, `PathSliceId`, `SliceRefresh`, `VALATA`; discriminators use `Base__P2W`, `Base__EvaluatingAndRefreshing`; Tech names are ASCII; aliases `GammaTimeRule/Plane`, `CLPlane`, `Phi` follow E.10. A.20 references these tokens; it does not introduce additional LEX classes. **For each surfaced CV check, `GateCheckRef.aspect` is fixed to `ConstraintValidity`.** *MVPK minima for CV faces also include `PathId/PathSliceId` where slice‑local refresh applies (A.22).*
