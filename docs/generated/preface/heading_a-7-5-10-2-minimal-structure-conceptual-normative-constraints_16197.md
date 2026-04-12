---
title: "A.7:5.10.2 — Minimal structure (conceptual; normative constraints)"
description: "Generated reference page for heading:a-7-5-10-2-minimal-structure-conceptual-normative-constraints:16197."
---

# A.7:5.10.2 — Minimal structure (conceptual; normative constraints)
> Preface node `heading:a-7-5-10-2-minimal-structure-conceptual-normative-constraints:16197`

## Content

```text
U.OutcomeSpec ::= {
  id: OutcomeSpecId,
  mode: OutcomeMode,                   // WorkOnly | ResultOnly | Composite

  // WorkOnly / Composite:
  workSpec?: {
    methodConstraintRef?: MethodDescriptionRef,   // optional: method is part of the promise (not “implementation detail”)
    workPredicateRef: EpistemeRef                 // predicate evaluated on U.Work facts/evidence (A.15.1)
  },

  // ResultOnly / Composite:
  resultSpec?: {
    describedEntityRef?: EntityRef,               // what thing’s post‑state matters (may be kind-labelled)
    statePlaneRef?: StatePlaneRef,                // where the predicate lives (A.7:3 pins)
    postConditionRef: EpistemeRef                 // predicate evaluated on post‑state (or evidence about it)
  },

  notes?: Text/Episteme
}

OutcomeMode ::= WorkOnly | ResultOnly | Composite
```

*Mode completeness (normative).*  
`mode=WorkOnly ⇒ workSpec present ∧ resultSpec absent`  
`mode=ResultOnly ⇒ resultSpec present ∧ workSpec absent`  
`mode=Composite ⇒ workSpec present ∧ resultSpec present`
