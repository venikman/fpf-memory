---
title: "A.6.B:6.4 — Dependency direction (no “upward” imports)"
description: "Generated reference page for heading:a-6-b-6-4-dependency-direction-no-upward-imports:7260."
---

# A.6.B:6.4 — Dependency direction (no “upward” imports)
> Preface node `heading:a-6-b-6-4-dependency-direction-no-upward-imports:7260`

## Content

The square is intended to preserve **layered modularity**: semantics should not depend on governance text, and evidence semantics should not depend on duties.

**Normative rule (no upward dependencies).**

* `L-*` claims **MUST NOT** depend on or reference `A-*`, `D-*`, or `E-*` claims (except for purely informative notes explicitly marked informative).
* `A-*` claims **MUST NOT** depend on or reference `D-*` claims. (`A-*` may reference `L-*` for defined terms/invariants.)
* `E-*` claims **MUST NOT** depend on or reference `D-*` claims. (`E-*` may reference `A-*` for conditioning and `L-*` for metric/term meanings.)
* `D-*` claims **MAY** reference `L-*`, `A-*`, and/or `E-*` claims as needed, and **SHOULD** do so by ID rather than restating content.

**Rationale (informative).** This keeps foundational meaning stable (L), keeps runtime gates independent of governance prose (A), and keeps evidence semantics independent of enforcement policy (E). Governance (D) is the place where “who must do what, using which gates and which evidence” is assembled.
