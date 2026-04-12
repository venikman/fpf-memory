---
title: "A.6.B:5 — Quadrant specifications"
description: "Generated reference page for heading:a-6-b-5-quadrant-specifications:7092."
---

# A.6.B:5 — Quadrant specifications
> Preface node `heading:a-6-b-5-quadrant-specifications:7092`

## Content

This section is the normative “API” of the square: what each quadrant is for, how it is written, and what it must not contain.

## A.6.B:5.1 — Quadrant L: Laws & Definitions

**Intent.** State truth‑conditional content: definitions, invariants, typing/well‑formedness constraints, equational laws.

**Adjudication.** In‑description: can be checked by inspection, proof, type validation, or model reasoning.

**Canonical form.** `Definition:` / `Invariant:` / predicate‑style constraints using “is / iff / for all”.

**Prohibitions.**

* An `L-*` statement **MUST NOT** contain RFC deontic keywords (**MUST/SHALL/SHOULD/MAY**) as operators inside the law/definition itself.
* An `L-*` statement **MUST NOT** encode runtime gate predicates (those are `A-*`).
* An `L-*` statement **MUST NOT** assert evidence availability or measurement outcomes (those are `E-*`).

**A.7 anchoring.** `L-*` claims are **Descriptions**: they specify semantics of the signature/mechanism description, not work.

**Typical dependence.** `A-*` and `E-*` claims may reference `L-*` IDs for vocabulary, metric definitions, and invariants needed for interpretation.
## A.6.B:5.2 — Quadrant A: Admissibility & Gates

**Intent.** Specify when a mechanism application is permitted/admissible: runtime entry predicates, authorization gates, validity gates, applicability checks that require context or execution environment.

**Common mistake #0 — Applicability ≠ Admissibility (informative).** Signature `Applicability` scopes *intended use/bounded context*; it is not a runtime entry gate. Runtime entry checks and permission predicates belong in `U.Mechanism.AdmissibilityConditions` as `A-*`. If your prose reads like “clients must satisfy the applicability”, you almost certainly want a `D-*` duty + an `A-*` gate (linked by ID) instead.

**Adjudication.** In‑work: evaluated at mechanism entry (or operationally at the point the mechanism is applied).

**Canonical form.** Predicate style, e.g.:

* “A request is admissible iff …”
* `admissible(x) iff P(x)` (conceptual form; no particular syntax is required)

**Prohibitions.**

* An `A-*` statement **MUST NOT** be placed in `U.Signature.Laws`.
* An `A-*` statement **MUST NOT** use RFC deontic keywords as if it were an agent obligation. (It is a gate predicate, not a duty.)
* An `A-*` statement **MUST NOT** claim that evidence exists (that is `E-*`) or that someone must enforce the gate (that is `D-*`).

**A.7 anchoring.** `A-*` claims are **Descriptions** of a mechanism gate. They are not “what a client must do”; they are “what the mechanism admits”.

**Required references (explicit).** If an `A-*` predicate relies on defined terms or invariants, it **SHOULD** reference the relevant `L-*` IDs (or at minimum the signature that defines them).
## A.6.B:5.3 — Quadrant D: Deontics & Commitments

**Intent.** State governance: obligations, permissions, prohibitions, commitments, publication duties, operational duties, contractual commitments—always with accountable agents/roles.

**Adjudication.** In‑description (governance is stated in the spec); compliance may be audited via `E-*`.

**Canonical form.** A deontic statement **MUST** have an accountable subject (agent/role), e.g.:

* “Client implementers **MUST** satisfy `A-…`.”
* “Operators **SHALL** retain carriers …”
* “Provider **SHALL** meet `E-…` under exclusions …”

**Canonical payload (recommended; lintable).** When a `D-*` claim is intended to be lintable/reusable, it **SHOULD** be representable as a `U.Commitment` record (A.2.8). Default fields to make explicit:

* `id` (often the `D-*` claim ID),
* `subject` (accountable role/party; never an episteme),
* `modality` (BCP‑14/RFC keyword family normalized),
* `scope` + `validityWindow`,
* `referents` (by ID; e.g., `SVC-*`, `L-*`, `A-*`, `E-*`, `MethodDescriptionRef(...)`),
* optional `adjudication.evidenceRefs` when the commitment is meant to be auditable,
* optional `source` when authority/provenance matters.

**Prohibitions.**

* A `D-*` statement **MUST NOT** use “the system/service/interface/spec” as the grammatical subject unless the accountable role/party is explicitly named (so the statement is representable as a `U.Commitment` with an explicit `subject`, A.2.8). (**F.18** is a lexical anchor only.)
* A `D-*` statement **MUST NOT** restate `L-*` or `A-*` predicates in new words when an ID exists; it **SHOULD** reference the ID.
* A `D-*` statement **MUST NOT** pretend that commitments are laws. A commitment is an agent relation, not a truth‑conditional invariant.

**A.7 anchoring.** `D-*` claims are primarily **about Objects** (roles/agents and their duties) or **about Carriers** (retention/exposure duties), but they are still written as **Descriptions**.

**Required references (explicit).**

* If a `D-*` statement imposes compliance with a gate, it **MUST** reference the relevant `A-*` ID(s).
* If a `D-*` statement is meant to be auditable, it **SHOULD** reference the `E-*` claim(s) that provide evidence and the carrier classes involved.
## A.6.B:5.4 — Quadrant E: Work‑Effects & Evidence

**Intent.** State what happens in work and how it can be evidenced: observed effects, emitted events, traces/logs/metrics, produced reports, measurement outcomes.

**Adjudication.** In‑work: checked by running/operating and inspecting carriers produced in work.

**Canonical form.** An `E-*` statement **SHOULD** include the minimum fields needed for adjudication:

1. **Observation/measurement conditions** (when/where/how observed; workload/window; triggers)
2. **Carrier class/schema reference** (A.7 Carrier) that bears the evidence
3. **Viewpoint/consumer** (who uses this evidence and why; ties to `viewpointRef` discipline)

**Prohibitions.**

* `E-*` statements **SHOULD NOT** use RFC deontic keywords (they are not obligations; they describe adjudicable effects/evidence).
* An `E-*` statement **MUST NOT** hide a gate predicate; gate predicates are `A-*`.
* An `E-*` statement **MUST NOT** assign agency (“the interface guarantees …”); if enforceability/commitment is intended, express it as `D-*` referencing the `E-*`.

**A.7 anchoring.** `E-*` claims are primarily **Carrier‑anchored**: they assert what carriers exist and how they relate to observed work.

**Required references (explicit).**

* If the effect/evidence is conditioned on a gate decision, the `E-*` statement **SHOULD** reference the relevant `A-*` ID(s).
* If the evidence is interpreted using metric definitions or invariants, the `E-*` statement **SHOULD** reference relevant `L-*` ID(s).
