---
title: "A.6.7:4.3 SuiteContractPins"
description: "Generated reference page for heading:a-6-7-4-3-suitecontractpins:14127."
---

# A.6.7:4.3 SuiteContractPins
> Preface node `heading:a-6-7-4-3-suitecontractpins:14127`

## Content

A `MechSuiteDescription` MUST be able to declare required contract pins as references, not as duplicated content. Canonically:

```
SuiteContractPins := ⟨
  required_spec_refs?: {CNSpecRef?, CGSpecRef?, ...},
  required_edition_pins?: EditionPin[*],
  required_policy_id_pins?: PolicyIdPin[*],
  required_planned_baseline_ref?: PlannedBaselineRef?
⟩
```

**Norms.**

* If the suite is legality-gated for characterization, `CNSpecRef` and `CGSpecRef` MUST be required (as references/pins).
* Contract pins are citations and anchors. They do not replace the underlying `…Spec` objects.
* A suite MAY require the presence of a planned-baseline artifact in P2W (e.g., a WorkPlanning plan item such as `…SlotFillingsPlanItem` that pins chosen refs/editions), but MUST treat it as a **reference/pin requirement**, not as a place to store launch values or gate decisions.
  When required, the planned-baseline artifact is authored in `WorkPlanning` and is citeable by downstream `U.Work.Audit`; any `FinalizeLaunchValues` witness remains `U.WorkEnactment`-only.
* A suite MAY serve as `TargetSlotOwnerRef` for a planned-baseline plan item (planned slot filling owner role), but this does not make the suite a mechanism and does not create run-time slot instances.
