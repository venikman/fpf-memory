---
title: "A.2.9:4.4 — Separation rules with U.Commitment and U.PromiseContent (normative)"
description: "Generated reference page for heading:a-2-9-4-4-separation-rules-with-u-commitment-and-u-promisecontent-normative:5189."
---

# A.2.9:4.4 — Separation rules with U.Commitment and U.PromiseContent (normative)
> Preface node `heading:a-2-9-4-4-separation-rules-with-u-commitment-and-u-promisecontent-normative:5189`

## Content

1. **Speech act is not the deontic binding.**
   A speech act may **institute** a `U.Commitment`, but the deontic relation itself is the `U.Commitment` object (A.2.8). Do not encode obligations/permissions inside `U.SpeechAct` as prose; instead, create/point to `U.Commitment` IDs in `institutes.commitments`.

2. **Speech act is not the service promise clause.**
   `U.PromiseContent` / promise contents are promise content; a speech act may be the act of offering/issuing that promise, but the promise content lives in the service/promise content objects and is referenced from the resulting commitments.

3. **Speech act is not the carrier.**
   A “signed approval PDF”, “ticket record”, “Slack message”, or “API call log” is a carrier (and may carry an episteme as utterance content); the speech act is the Work occurrence that produced/issued it.

4. **Publishing a spec is not a commitment by default.**
   **Default interpretation rule (normative).** A conformant model/interpreter **MUST NOT** infer `U.Commitment` objects solely from `Publish`/`Approve` speech acts. Publication MAY institute publication/status claims (e.g., “Published”, “Approved”, “Deprecated”), but any obligations/permissions on implementers/operators/providers **MUST** be modeled explicitly as `U.Commitment` objects (A.2.8). If a Context defines a policy that maps publication acts to commitment-instituting effects (e.g., a named `SpecPublicationPolicy@Context`), that policy **MUST** be named and cited where the implication is used.
