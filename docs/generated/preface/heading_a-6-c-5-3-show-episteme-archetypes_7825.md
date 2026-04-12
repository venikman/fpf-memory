---
title: "A.6.C:5.3 — Show (Episteme archetypes)"
description: "Generated reference page for heading:a-6-c-5-3-show-episteme-archetypes:7825."
---

# A.6.C:5.3 — Show (Episteme archetypes)
> Preface node `heading:a-6-c-5-3-show-episteme-archetypes:7825`

## Content

**(C) Multiparty protocol boundary (behavioural/session type motif)**

*Draft wording:*
“The protocol guarantees progress. Participants must follow the sequence.”

**Unpack + route:**

* **Utterance:** protocol description (could be a type/protocol spec plus explanatory views).
* **L:** safety/progress properties as laws over the protocol model (truth-conditional, within the theory).
* **A:** admissibility: when an interaction trace is considered valid/admissible (e.g., runtime checks; compilation checks; gating conditions for entering a session).
* **D:** obligations on implementers/operators: implement the protocol; do not send messages outside the allowed state machine; publish conformance artefacts if required.
* **E:** evidence: message trace carriers; conformance test run artefacts; audit trails for disputed interactions.

**(D) Socio-technical “SLA + audit trail” boundary**

*Draft wording:*
“Provider shall respond within 4 hours for Severity‑1 incidents. Only Severity‑1 is covered. Evidence is provided by ticket logs.”

**Unpack + route:**

* **Promise content (service promise clause):** responsiveness promise for a defined incident class and window.
* **Utterance:** SLA publication (and its views for different audiences).
* **A:** admissibility predicate for the promise: ticket qualifies iff severity classification meets stated conditions.
* **D:** provider commitment to meet the target; client duties (e.g., provide required info); auditor duties if applicable.
* **E:** evidence: ticket carriers, timestamps, classification records, and the measurement procedure binding “4 hours” to a time window and clock source.
