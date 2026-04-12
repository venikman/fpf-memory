---
title: "A.15.3:4.3 Relation to Work enactment (planned baseline vs actuals)"
description: "Generated reference page for heading:a-15-3-4-3-relation-to-work-enactment-planned-baseline-vs-actuals:18580."
---

# A.15.3:4.3 Relation to Work enactment (planned baseline vs actuals)
> Preface node `heading:a-15-3-4-3-relation-to-work-enactment-planned-baseline-vs-actuals:18580`

## Content

* A `SlotFillingsPlanItem` is **not** a witness of `FinalizeLaunchValues`.
  Launch values (actuals) occur only in Work enactment, and their witness belongs in Work/audit surfaces, not in this PlanItem. 

* Deviation at execution time is allowed, but it must be recorded as **variance in Work**, and the plan must not be rewritten to match the execution. 
  When a Work enactment claims to follow a planned baseline, the Work MUST cite the `SlotFillingsPlanItem` in its Audit as the planned baseline reference, and MUST record any variance against it (rather than “backfilling” the plan).
  The baseline citation SHOULD be edition-addressable (i.e., the Work cites a stable PlanItem edition), so that later PlanItem revisions cannot erase what was actually planned.
  If the baseline needs to change (including any edition-pinned ref changes), author a **new PlanItem edition** (or a new PlanItem) and treat the difference as a planning change—not as a retroactive edit of the previously cited baseline.
