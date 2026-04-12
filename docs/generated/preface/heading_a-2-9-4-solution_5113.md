---
title: "A.2.9:4 — Solution"
description: "Generated reference page for heading:a-2-9-4-solution:5113."
---

# A.2.9:4 — Solution
> Preface node `heading:a-2-9-4-solution:5113`

## Content

`U.SpeechAct` is a **kernel Work object**: a recorded communicative enactment performed by an accountable role‑enactor within a bounded context, optionally addressed to others, that is **recognized** (in that context) as updating an information and/or governance state. The act is **not** the utterance text; it points to utterance descriptions and evidence carriers.

## A.2.9:4.1 — Normative definition

A **`U.SpeechAct`** is a **`U.Work`** occurrence whose primary (intended) effect is **communicative**: it places an utterance into a context in a way that is recognized by that context’s institutional semantics (policies, procedures, protocol rules) as potentially:

* asserting/informing,
* requesting/directing,
* promising/committing (as an instituting act),
* declaring/authorizing/revoking (status-changing acts),
* notifying (event announcement relevant for downstream work).

Per A.7, `U.SpeechAct` is an **object/event**; its **utterance descriptions** are descriptions (epistemes/spec clauses/messages‑as‑content), and its **carriers** are artifacts/traces that support observation and audit. *(Note: “Surface” is reserved for MVPK publication/interoperability surfaces; do not use it here.)*

Whether a given `actType` institutes commitments/permissions/status changes is **entirely context‑policy dependent**. Absent an explicit policy, treat a `U.SpeechAct` as a communicative Work occurrence with observable provenance only; do not infer deontic bindings from the act by default.
## A.2.9:4.2 — Minimal structure (normative)

A conforming `U.SpeechAct` **SHALL** be representable by the following minimal record (field names are illustrative; the constraints are normative):

```
U.SpeechAct <: U.Work

Invariant: U.Work.kind = Communicative

U.SpeechAct ::=
  U.Work
  & {
      actTypes: set<SpeechActTypeRef>,               // ≥1 act types (supports multi-function)
      addressedTo: optional<set<AddresseeRef>>,      // optional: who is addressed / audience
      utteranceRefs: optional<set<DescriptionRef>>,  // where the utterance content is stated/recorded (A.7: Description)
      carrierRefs: optional<set<CarrierRef>>,        // evidence carriers/traces (A.7: Carrier; use A.10 when evidentiary)
      institutes: optional<InstitutedEffects>,       // references to objects/claims instituted/updated by this act
      notes: optional<InformativeText>               // explicitly informative
    }

DescriptionRef ::=
  ClaimIdRef | EpistemeRef
  // Pointer to an utterance description (e.g., spec clause claim ID, a policy episteme, a message-content episteme).

SpeechActTypeRef ::=
  ContextLocalTokenRef
  // Must be defined/recognized in the Work’s judgement context (bounded context).

AddresseeRef ::=
  PartyRef | RoleRef | RoleAssignmentRef

InstitutedEffects ::=
  {
    commitments: optional<set<CommitmentIdRef>>,
    roleAssignments: optional<set<RoleAssignmentRef>>,
    statusClaims: optional<set<ClaimIdRef>>,         // e.g., “StandardStatus=Approved” if modeled as claims
    other: optional<set<ObjectIdRef>>
  }
```

**Normative constraints:**

* **(SA‑C0) Work conformance applies.** Because `U.SpeechAct <: U.Work`, a speech‑act record **MUST** satisfy `U.Work` conformance (A.15.1), including the required anchors (`isExecutionOf`, `performedBy`, `executedWithin`, `window`, and state‑plane / judgement‑context anchoring). A speech act **MUST** have at least one `affected` referent (the thing it is *about/updates*), even if it is purely governance‑state.
* **(SA‑C1) PerformedBy must be an accountable actor.** `performedBy` **MUST** resolve to a `RoleAssignmentRef` whose holder is an accountable system/party in the named scope. It **MUST NOT** be a spec/interface/document as an episteme.
* **(SA‑C2) ActTypes are required and context-local.** `actTypes` **MUST** contain at least one `SpeechActTypeRef` recognized in the Work’s judgement context (local meaning). Free‑text verbs are nonconformant unless registered as a context token.
* **(SA‑C3) Time honesty.** `window` **MUST** be explicit (or inherited from the parent `U.Work` record) so freshness rules can be evaluated.
* **(SA‑C4) If used for gating/audit, it must be observable.** If a speech act is used as a checklist criterion, guard condition, or provenance hook for a `U.Commitment`, the model **SHALL** include at least one observable handle: `utteranceRefs` and/or `carrierRefs`. When the act is used as evidence, at least one carrier reference **SHOULD** be SCR/RSCR‑resolvable per A.10.
* **(SA‑C5) Institutional effects are references, not paraphrases.** When the act is intended to institute/update commitments, role assignments, or statuses, `institutes.*` **SHOULD** reference the corresponding object IDs/claim IDs rather than restating content.
* **(SA‑C6) Cross-context use is Bridge-only.** If a `SpeechActRef` is used for checking/gating/provenance in a **different bounded context** than the act’s judgement context, the referencing object **MUST** satisfy the spec’s cross-context discipline by citing an explicit Bridge/policy that licenses the interpretation (and surfacing congruence vs loss where applicable), rather than assuming equivalence by label.
## A.2.9:4.3 — SpeechActRef discipline (normative)

A **`SpeechActRef`** is a reference to `U.SpeechAct.id`.

* If another object (e.g., `U.Commitment.source.speechActRef`) cites a `SpeechActRef`, the referenced `U.SpeechAct` **MUST** satisfy **SA‑C0…SA‑C4** (and SA‑C6 when used cross‑context).
* A `SpeechActRef` **MUST NOT** be replaced by an `EpistemeRef` (“see the document”) when provenance is needed; the episteme is an utterance description, not the act.
* If a system cannot record a full `U.SpeechAct`, it may record a **stub** that still satisfies **SA‑C0…SA‑C4** (minimal `actTypes`, performer, judgement context, window, `affected`, plus at least one observable handle). When a required `U.Work` anchor is unknown, the stub **MUST** use an explicit placeholder (e.g., an “AdHocCommunication” MethodDescription) rather than omitting the field.
## A.2.9:4.4 — Separation rules with U.Commitment and U.PromiseContent (normative)

1. **Speech act is not the deontic binding.**
   A speech act may **institute** a `U.Commitment`, but the deontic relation itself is the `U.Commitment` object (A.2.8). Do not encode obligations/permissions inside `U.SpeechAct` as prose; instead, create/point to `U.Commitment` IDs in `institutes.commitments`.

2. **Speech act is not the service promise clause.**
   `U.PromiseContent` / promise contents are promise content; a speech act may be the act of offering/issuing that promise, but the promise content lives in the service/promise content objects and is referenced from the resulting commitments.

3. **Speech act is not the carrier.**
   A “signed approval PDF”, “ticket record”, “Slack message”, or “API call log” is a carrier (and may carry an episteme as utterance content); the speech act is the Work occurrence that produced/issued it.

4. **Publishing a spec is not a commitment by default.**
   **Default interpretation rule (normative).** A conformant model/interpreter **MUST NOT** infer `U.Commitment` objects solely from `Publish`/`Approve` speech acts. Publication MAY institute publication/status claims (e.g., “Published”, “Approved”, “Deprecated”), but any obligations/permissions on implementers/operators/providers **MUST** be modeled explicitly as `U.Commitment` objects (A.2.8). If a Context defines a policy that maps publication acts to commitment-instituting effects (e.g., a named `SpecPublicationPolicy@Context`), that policy **MUST** be named and cited where the implication is used.
## A.2.9:4.5 — Multi-function and multi-party support (normative)

* **Multi-function:** `actTypes` is a **set**. If one utterance performs multiple recognizable acts (e.g., “approve + instruct + warn”), the model may either:

   * represent one `U.SpeechAct` with multiple `actTypes` entries, or
   * represent multiple `U.SpeechAct` records that share the same `carrierRefs/utteranceRefs`.
   In either case, institutional effects must remain referenceable (SA‑C5).

* **Multi-party:** `addressedTo` is a set and may include roles/parties/assignments. If addressees matter for validity (e.g., “approval by CAB chair to deployment bot”), they should be explicit.
