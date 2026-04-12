---
title: "Show #1 (U.System): effectful API boundary (algebraic effects intuition)"
description: "Generated reference page for heading:show-1-u-system-effectful-api-boundary-algebraic-effects-intuition:6839."
---

# Show #1 (U.System): effectful API boundary (algebraic effects intuition)
> Preface node `heading:show-1-u-system-effectful-api-boundary-algebraic-effects-intuition:6839`

## Content

**System:** A “Payment Authorize” service.

* **Signature layer (A.6.0).**

  * Vocabulary: `PaymentRequest`, `AuthDecision`, `MerchantId`, `Money`, etc.
  * Laws: e.g., “If decision is APPROVED then reservedAmount = requestedAmount” (truth‑conditional).
  * Applicability: bounded context “Payments/Authorization”.

* **Mechanism layer (A.6.1).**

  * Admissibility gate: request is admissible iff `tokenValid ∧ merchantActive ∧ amountWithinLimit`.
  * Transport: HTTP headers, idempotency key transport, canonical currency conversions.
  * Audit/Observability: specifies required evidence carriers (e.g., `AuthorizationRecord` event, log entry) and their semantics (fields, correlation IDs, retention class).

* **Realization/work layer.**

  * Actual side effects: reservation entry in ledger, emission of event, timers, retries.
  * Evidence: traces, logs, metrics.

* **Publication faces (MVPK).**

  * PlainView: narrative for stakeholders (what the service promise is, in plain terms).
  * TechCard: signature/mechanism details (types, error codes, version policy, admissibility predicate refs).
  * InteropCard: machine‑exchange oriented boundary details (canonical field names, schema refs, transport bindings).
  * AssuranceLane: evidence bindings (which carriers exist, how to adjudicate `E-*` claims, retention/access duties by reference).

**SoTA tie‑in:** This boundary is naturally understood using *algebraic effects & handlers*: the signature is the “operation interface” (effect signature), while the mechanism/realization provides handlers (semantics). The stack keeps the abstract operation surface stable while allowing multiple handlers/realizations to evolve.

**Routing example:**

* “Defined iff tokenValid” belongs in Quadrant A (admissibility gate).
* “Clients MUST include Idempotency‑Key” belongs in Quadrant D (agent obligation) but should reference the same gate semantics to avoid divergence.
* “System emits AuthorizationRecord” belongs in Quadrant E (evidence via carriers).
