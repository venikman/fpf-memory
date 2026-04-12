---
title: "C.3.A:B.6 TA lane — tool qualification where it belongs \\[A/I]"
description: "Generated reference page for heading:c-3-a-b-6-ta-lane-tool-qualification-where-it-belongs-a-i:34366."
---

# C.3.A:B.6 TA lane — tool qualification where it belongs \[A/I]
> Preface node `heading:c-3-a-b-6-ta-lane-tool-qualification-where-it-belongs-a-i:34366`

## Content

**What TA contributes.** Confidence in **provers, checkers, model‑checkers, data classifiers** and pipelines. TA is about the **machinery**, not the **claim** or **kind** semantics.

**TA‑patterns (informative):**

* **Prover kernels.** Audit/qualification of the kernel version used for VA proofs.
* **Automated Model‑checkers.** Qualification against seeded faults; document limits (precision, nondeterminism).
* **Classifiers used for `MemberOf`.** If membership uses ML or rules engines, qualify the **classifier** separately; any drift monitoring belongs to LA freshness.

**TA‑obligations (normative):**

* **TA‑1.** Tools critical to VA/LA **SHALL** declare their qualification status and version; guards **SHALL** reference these declarations when they matter.
**TA‑2.** Lower tool qualification **MUST NOT** be hidden by relaxing **F** or widening **G**. target‑contexts may offset it by demanding **more evidence** in **R** (for example, extra tests), per policy.
