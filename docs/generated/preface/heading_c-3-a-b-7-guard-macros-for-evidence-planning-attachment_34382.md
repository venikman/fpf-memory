---
title: "C.3.A:B.7 Guard macros for evidence planning & attachment"
description: "Generated reference page for heading:c-3-a-b-7-guard-macros-for-evidence-planning-attachment:34382."
---

# C.3.A:B.7 Guard macros for evidence planning & attachment
> Preface node `heading:c-3-a-b-7-guard-macros-for-evidence-planning-attachment:34382`

## Content

**Guard\_EvidencePlan\_Typed** — approve a plan that is adequate for a typed claim.
*Plain reading.* The first macro checks that the plan names the rows (kinds or masks) and columns (slices), that scope and membership can be checked for each cell, that any Cross‑context moves declare bridges, and that penalties are budgeted in **R**.

```
1. MatrixDeclared:    Evidence matrix rows = {subkinds or masks of k}; columns = {TargetSlices within ClaimScope}
2. ScopeBound:        For each column, ClaimScope covers that slice with explicit Γ_time
3. KindBound:         MemberOf(?, k, slice) is defined (deterministic) for all planned slices
4. BridgeBudgeted:    If cross-context:
                        (a) Scope Bridge(s) declared with CL → attach the **scope‑bridge penalty** to the **R** budget
                        (b) KindBridge(s) declared with CL^k → attach the **kind‑bridge penalty** to the **R** budget
5. FreshnessPolicy:   LA freshness windows specified per slice; monitoring plan defined (if live)
6. IndependenceNote:  If SpanUnion is claimed, independence justification attached
7. TADecls:           Tools and their TA status listed; residual risk routed to R (not to F/G)
```

**Guard\_EvidenceAttach\_Typed** — attach concrete evidence to a state change.
*Plain reading.* The second macro checks that each attached evidence unit clearly states which row and column it covers, binds scope and membership in a reproducible way, applies bridge penalties to **R**, and respects freshness.

```
1. CellMatch:         Each evidence unit cites (subkind/mask, slice) it covers
2. PredicateBinding:  Evidence embeds Scope and MemberOf predicates (or references them verifiably)
3. BridgeApplied:     If evidence is bridged, apply the **scope‑bridge** and/or **kind‑bridge** penalties to **R**; record loss notes
4. FreshnessMet:      Evidence within declared freshness; else guard fails closed
5. VA/LA Mix:         If VA present, verify it matches the quantified Kind; if LA fills gaps, show matrix deltas
6. TAConsistent:      Tool versions match TA declarations used at planning time
```
