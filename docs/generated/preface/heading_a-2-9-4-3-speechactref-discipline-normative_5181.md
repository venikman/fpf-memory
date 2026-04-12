---
title: "A.2.9:4.3 — SpeechActRef discipline (normative)"
description: "Generated reference page for heading:a-2-9-4-3-speechactref-discipline-normative:5181."
---

# A.2.9:4.3 — SpeechActRef discipline (normative)
> Preface node `heading:a-2-9-4-3-speechactref-discipline-normative:5181`

## Content

A **`SpeechActRef`** is a reference to `U.SpeechAct.id`.

* If another object (e.g., `U.Commitment.source.speechActRef`) cites a `SpeechActRef`, the referenced `U.SpeechAct` **MUST** satisfy **SA‑C0…SA‑C4** (and SA‑C6 when used cross‑context).
* A `SpeechActRef` **MUST NOT** be replaced by an `EpistemeRef` (“see the document”) when provenance is needed; the episteme is an utterance description, not the act.
* If a system cannot record a full `U.SpeechAct`, it may record a **stub** that still satisfies **SA‑C0…SA‑C4** (minimal `actTypes`, performer, judgement context, window, `affected`, plus at least one observable handle). When a required `U.Work` anchor is unknown, the stub **MUST** use an explicit placeholder (e.g., an “AdHocCommunication” MethodDescription) rather than omitting the field.
