---
title: "A.6.B:6 — Cross‑quadrant link discipline"
description: "Generated reference page for heading:a-6-b-6-cross-quadrant-link-discipline:7196."
---

# A.6.B:6 — Cross‑quadrant link discipline
> Preface node `heading:a-6-b-6-cross-quadrant-link-discipline:7196`

## Content

The square is not just classification; it is a **dependency discipline**. Claims often depend on each other; such dependencies **MUST** be explicit (by claim ID) rather than duplicated prose.

## A.6.B:6.1 — Explicit reference rule

If a claim’s meaning materially depends on another routed claim, that dependency **MUST** be represented as an explicit reference to the other claim’s ID (or to the canonical location where it lives), rather than by restating it.

**Guideline (informative).** Treat this as “import hygiene” for prose: reuse by reference, not by copy.
## A.6.B:6.2 — Canonical cross‑quadrant dependency patterns

These patterns are allowed (and common). The square becomes operational when these links are used systematically.

### (D → A) Duty-to-gate linkage

When governance requires someone to comply with a gate:

* `D-*`: “Role **MUST** satisfy/enforce `A-*`.”

This separates **what is admissible** (A) from **who is responsible** (D).
### (E → A) Evidence-for-gate linkage

When gate decisions must be observable:

* `E-*`: “On rejection/acceptance due to `A-*`, carrier `C` is produced/observable under conditions …”

This separates **gate semantics** (A) from **evidence semantics** (E).
### (D → E) Duty-to-evidence linkage

When governance requires evidence production/retention/exposure or commits to measured properties:

* `D-*`: “Role **MUST** retain/expose carrier class `C` used by `E-*` …”
* `D-*`: “Provider **SHALL** meet `E-*` under exclusions …”

This separates **obligation/commitment** (D) from **adjudication** (E).
### (A/E → L) Semantic grounding linkage

When a gate predicate or measurement relies on definitions/invariants:

* `A-*` / `E-*` references `L-*` that define terms/metrics.

This prevents “metric drift” and “definition drift” across views.
### (D → L) Governance-to-definition linkage

When an obligation/commitment relies on precise term or metric meanings:

* `D-*` references `L-*` that define the terms/metrics it uses.

This keeps governance text from accidentally redefining semantics in prose.
## A.6.B:6.3 — The “triangle decomposition” for mixed sentences

**Normative rule (decomposition).** A conforming boundary text **SHALL** decompose any mixed sentence that expresses (i) an entry condition, (ii) an obligation to satisfy/enforce it, and (iii) an observability expectation into the three quadrants:

* **A:** admissibility predicate (`A-*`)
* **D:** duty/commitment referencing the gate (`D-* → A-*`)
* **E:** evidence binding referencing the gate (and carriers) (`E-* → A-*`)

This is the canonical repair for “contract soup” around validity, authorization, compliance, audit, and security boundaries.
## A.6.B:6.4 — Dependency direction (no “upward” imports)

The square is intended to preserve **layered modularity**: semantics should not depend on governance text, and evidence semantics should not depend on duties.

**Normative rule (no upward dependencies).**

* `L-*` claims **MUST NOT** depend on or reference `A-*`, `D-*`, or `E-*` claims (except for purely informative notes explicitly marked informative).
* `A-*` claims **MUST NOT** depend on or reference `D-*` claims. (`A-*` may reference `L-*` for defined terms/invariants.)
* `E-*` claims **MUST NOT** depend on or reference `D-*` claims. (`E-*` may reference `A-*` for conditioning and `L-*` for metric/term meanings.)
* `D-*` claims **MAY** reference `L-*`, `A-*`, and/or `E-*` claims as needed, and **SHOULD** do so by ID rather than restating content.

**Rationale (informative).** This keeps foundational meaning stable (L), keeps runtime gates independent of governance prose (A), and keeps evidence semantics independent of enforcement policy (E). Governance (D) is the place where “who must do what, using which gates and which evidence” is assembled.
