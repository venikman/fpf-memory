---
title: "A.15.3:4.1 Definition"
description: "Generated reference page for heading:a-15-3-4-1-definition:18442."
---

# A.15.3:4.1 Definition
> Preface node `heading:a-15-3-4-1-definition:18442`

## Content

A `SlotFillingsPlanItem` is a **kind of `U.WorkPlan.PlanItem`** whose content is a **planned slot-fillings ledger** for a *single* slot owner, within an explicit P2W context.

It is a **WorkPlanning baseline**, intended to be:

* produced/approved in WorkPlanning,
* **cited** by downstream Work enactment (as planned baseline),
* compared against actual fillings (variance recorded in Work, not by rewriting the plan). 

**Normative note (I/D/Spec vs views):** A `SlotFillingsPlanItem` is a Description-level planning episteme (a PlanItem). It MAY be projected into `U.View` (e.g., `TechCard(SlotFillingsPlanItemRef)`), but any view is strictly a projection and MUST NOT introduce additional claims or “shadow defaults”.
