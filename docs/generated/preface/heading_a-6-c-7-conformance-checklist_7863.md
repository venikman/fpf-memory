---
title: "A.6.C:7 — Conformance Checklist"
description: "Generated reference page for heading:a-6-c-7-conformance-checklist:7863."
---

# A.6.C:7 — Conformance Checklist
> Preface node `heading:a-6-c-7-conformance-checklist:7863`

## Content

A boundary description conforms to A.6.C iff it satisfies all items below:

1. **CC‑A.6.C‑1 (Unpacking when contract-language appears).**
   If the text uses “contract/guarantee/promise/SLA” language, it **SHALL** explicitly disambiguate the statement as referring to at least one of: **Promise content (promise content)**, **Utterance (published description)**, **Commitment (deontic binding)**, **Work+Evidence (adjudication)**.

2. **CC‑A.6.C‑2 (No agency to epistemes).**
   The text **MUST NOT** attribute promising/committing/obligating agency to signatures, mechanisms, interfaces, or documents. Any duty/commitment **SHALL** name an accountable role/agent.

3. **CC‑A.6.C‑3 (Route contract-bearing statements via A.6.B).**
   Contract-bearing statements **SHALL** be routable as atomic claims to **L/A/D/E**, with dependencies expressed by explicit references rather than paraphrase.

4. **CC‑A.6.C‑4 (Promise content ≠ Work discipline).**
   Statements about what is executed/observed **SHALL** be expressed as **E** claims about work/evidence/carriers. Promise‑content language **SHALL** refer to the **promise content** (`U.PromiseContent`, A.2.3) and its **L‑defined** semantics (and to explicit **D‑*** commitments represented as `U.Commitment`, A.2.8), not to execution events (`U.Work`) or runtime effects.
   Unqualified head‑noun *service* (and the co‑moving cluster *service provider* / *server*) in normative boundary prose SHALL be unpacked per **A.6.8 (RPR‑SERV)**.

5. **CC‑A.6.C‑5 (Evidence hook for operational guarantees).**
   If a “guarantee” is operational (requires reality to decide), the text **SHALL** include an **E** claim that states what evidence would adjudicate it (even if the evidence surface is abstract/conceptual).

6. **CC‑A.6.C‑6 (No second contracts via faces).**
   MVPK faces **MUST NOT** add new commitments beyond the underlying routed claims; faces may only project/summarize/select from the canonical claim set under a viewpoint.

7. **CC‑A.6.C‑7 (RFC‑keyword discipline inside faces).**
   If an MVPK face contains BCP‑14 norm keywords, each BCP‑14 sentence **MUST** cite the underlying **D‑*** claim ID(s) (`U.Commitment`) it is projecting. If it cannot, the face is non‑conformant until rewritten (no BCP‑14 keyword) or moved out of the face.

8. **CC‑A.6.C‑8 (No commitment-by-publication default).**
   A `Publish`/`Approve` utterance (including publishing a `…Spec`) MUST NOT be treated as instituting `U.Commitment` objects by default. If a Context policy maps publication acts to binding effects, the policy SHALL be cited, and any resulting bindings SHALL still be represented explicitly as `U.Commitment` objects with accountable subjects.
