---
title: "A.7:5.10.3 — unitOfDelivery and countingRule mini‑schema (normative)"
description: "Generated reference page for heading:a-7-5-10-3-unitofdelivery-and-countingrule-mini-schema-normative:16228."
---

# A.7:5.10.3 — unitOfDelivery and countingRule mini‑schema (normative)
> Preface node `heading:a-7-5-10-3-unitofdelivery-and-countingrule-mini-schema-normative:16228`

## Content

`U.PromiseContent.unitOfDelivery` (A.2.3) is an **Episteme** that states *how delivered units are counted/measured*. It is intentionally not a new “counting language”; it is a small record whose predicates are provided as ordinary epistemes.

A conforming `unitOfDelivery` SHOULD be representable by this mini‑schema:

```text
unitOfDelivery ::= {
  unitLabel: Text,                       // e.g., "request", "minute", "case", "kWh"
  countingRule: {
    selectorRef: EpistemeRef,            // selects which U.Work episodes contribute (default: W✓ for the promise content)
    quantityRef: EpistemeRef,            // maps each selected Work → ℝ≥0 units (default: constant 1)
    aggregation: count | sum,            // count = Σ 1; sum = Σ quantityRef(work)
    dedupeKeyRef?: EpistemeRef,          // optional: prevents double counting (e.g., by ticketId/appointmentId)
    Γ_timePolicyRef?: PolicyIdRef        // optional: windowing policy id when non-trivial
  }
}
```

*Default behaviour (normative).* If `unitOfDelivery` is absent, delivered units default to `|W✓(SC,T)|` (one unit per accepted delivery work). If `unitOfDelivery` is present but omits either predicate, defaults apply: `selectorRef := fulfilsPromiseContent(SC)` and `quantityRef := 1`.

**Measurement typing note (normative).** When `quantityRef` denotes a measured characteristic (e.g., seconds, kWh, kg, requests), the characteristic’s scale/unit and measurement procedure MUST be explicit via the Characterization patterns (C.16 / C.25) (or an equivalent UTS definition) so that two parties cannot silently “count different things” under the same `unitLabel`.
