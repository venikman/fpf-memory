---
title: "A.2.9:4.5 — Multi-function and multi-party support (normative)"
description: "Generated reference page for heading:a-2-9-4-5-multi-function-and-multi-party-support-normative:5203."
---

# A.2.9:4.5 — Multi-function and multi-party support (normative)
> Preface node `heading:a-2-9-4-5-multi-function-and-multi-party-support-normative:5203`

## Content

* **Multi-function:** `actTypes` is a **set**. If one utterance performs multiple recognizable acts (e.g., “approve + instruct + warn”), the model may either:

   * represent one `U.SpeechAct` with multiple `actTypes` entries, or
   * represent multiple `U.SpeechAct` records that share the same `carrierRefs/utteranceRefs`.
   In either case, institutional effects must remain referenceable (SA‑C5).

* **Multi-party:** `addressedTo` is a set and may include roles/parties/assignments. If addressees matter for validity (e.g., “approval by CAB chair to deployment bot”), they should be explicit.
