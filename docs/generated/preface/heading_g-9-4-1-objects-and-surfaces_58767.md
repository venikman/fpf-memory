---
title: "G.9:4.1 — Objects and surfaces"
description: "Generated reference page for heading:g-9-4-1-objects-and-surfaces:58767."
---

# G.9:4.1 — Objects and surfaces
> Preface node `heading:g-9-4-1-objects-and-surfaces:58767`

## Content

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
