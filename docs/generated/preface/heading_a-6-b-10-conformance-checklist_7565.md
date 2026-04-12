---
title: "A.6.B:10 — Conformance Checklist"
description: "Generated reference page for heading:a-6-b-10-conformance-checklist:7565."
---

# A.6.B:10 — Conformance Checklist
> Preface node `heading:a-6-b-10-conformance-checklist:7565`

## Content

| ID                                       | Requirement                                                                                                                                                                                                      | Purpose                                                  |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **CC‑A.6.B.1 (Atomicity).**              | A conforming boundary text **SHALL** decompose mixed sentences into **atomic claims** such that each atomic claim routes to exactly one quadrant **L/A/D/E**.                                                    | Makes routing unambiguous; prevents contract soup.       |
| **CC‑A.6.B.2 (Quadrant routing).**       | Each atomic claim **MUST** be classified by the Boundary Norm Square and placed in its canonical landing zone (L→Signature.Laws; A→Mechanism.AdmissibilityConditions; D→Norms/Commitments; E→Evidence/Carriers). | Preserves stack modularity and evolvability.             |
| **CC‑A.6.B.3 (Form constraints).**       | `L-*` and `A-*` claims **MUST NOT** contain RFC deontic keywords as operators; `D-*` claims **MUST** name an accountable agent/role; `E-*` claims **SHOULD NOT** use RFC deontic keywords.                       | Keeps modalities separated and audit‑ready.              |
| **CC‑A.6.B.4 (Explicit references).**    | Where a claim depends on another routed claim, that dependency **MUST** be expressed by explicit ID reference rather than restating the other claim in new words.                                                | Prevents paraphrase drift across layers/faces.           |
| **CC‑A.6.B.5 (E‑claim adjudicability).** | Each `E-*` claim **SHOULD** include (a) observation conditions, (b) carrier class/schema reference, and (c) viewpoint/consumer.                                                                                  | Makes work‑effects adjudicable rather than aspirational. |
| **CC‑A.6.B.6 (No gate smuggling).**      | Operational admissibility predicates **MUST NOT** appear as `L-*` laws in the signature layer; they **MUST** be `A-*` claims in the mechanism layer.                                                             | Preserves substitution and signature stability.          |
| **CC‑A.6.B.7 (No upward dependencies).** | `L-*` claims **MUST NOT** reference `A-*`, `D-*`, or `E-*`; `A-*` and `E-*` claims **MUST NOT** reference `D-*`.                                                                                                   | Preserves layering and prevents hidden coupling.         |
