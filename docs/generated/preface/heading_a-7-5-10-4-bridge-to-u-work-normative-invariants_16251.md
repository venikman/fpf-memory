---
title: "A.7:5.10.4 — Bridge to U.Work (normative invariants)"
description: "Generated reference page for heading:a-7-5-10-4-bridge-to-u-work-normative-invariants:16251."
---

# A.7:5.10.4 — Bridge to U.Work (normative invariants)
> Preface node `heading:a-7-5-10-4-bridge-to-u-work-normative-invariants:16251`

## Content

**OUTSPEC‑INV‑1 (No metonymy).**  
`promisedOutcomeSpecRef` points to an **OutcomeSpec**, not to `U.Work` and not to an extensional delivered object. The *actuals* live on `U.Work` (A.15.1) and its evidence anchors.

**OUTSPEC‑INV‑2 (Evaluability from work evidence).**  
All predicates referenced by `workPredicateRef`, `postConditionRef`, and `unitOfDelivery.countingRule.*` MUST be evaluable from `U.Work` facts and cited evidence (including `U.Work.Δ` state anchors / evidence carriers). They MUST NOT require introspecting the internal structure of the provider system unless that structure is itself exposed as evidence.

**OUTSPEC‑INV‑3 (Counting coherence).**  
If `unitOfDelivery` is present, its countingRule MUST select only work episodes that are eligible to satisfy the promise content and MUST not silently double‑count (use `dedupeKeyRef` or a cited policy).
