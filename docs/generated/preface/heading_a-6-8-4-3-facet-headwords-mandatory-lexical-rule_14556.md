---
title: "A.6.8:4.3 — Facet headwords (mandatory lexical rule)"
description: "Generated reference page for heading:a-6-8-4-3-facet-headwords-mandatory-lexical-rule:14556."
---

# A.6.8:4.3 — Facet headwords (mandatory lexical rule)
> Preface node `heading:a-6-8-4-3-facet-headwords-mandatory-lexical-rule:14556`

## Content

In normative prose, **replace the head word “service”** with one of the following facet head phrases:

1. **promise content** (or **service offering clause** / **service promise clause**) — promise content (`promiseContentRef : PromiseContentRef`, i.e., `U.PromiseContent`)
2. **promised outcome spec** (or **promised deliverable spec**) — what is promised as an outcome template (work‑only / result‑only / composite) (`promisedOutcomeSpecRef`)
3. **service provider role** — the provider role kind (`providerRoleRef : RoleRef`) when the text is about role structure (not about actuals)
4. **service provider principal** (or **service provider (role enactor)**) — the accountable provider that can hold commitments (`providerAssignmentRef` / `providerPrincipalRef`)
5. **service delivery system** (or **service realization system**) — the system that performs/realizes delivery (`deliverySystemRef : SystemRef`)
6. **service access point** (or **service endpoint**) — addressable entrypoint (`accessPointRef : SystemRef`); this is the “thing you can call/visit”
7. **service access spec** (or **service interface spec**) — request‑facing interface/method description (`accessSpecRef : MethodDescriptionRef`)
8. **service delivery method** (or **service method** / **service runbook** / **procedure**) — internal procedure for fulfilment (`deliveryMethodRef : MethodDescriptionRef`)
9. **service commitment** — deontic binding (`commitmentRef : CommitmentRef`)
10. **service promise act** (or **promissory speech act**) — speech act (`promiseActRef : SpeechActRef`)
11. **service delivery work** (or **service run / fulfillment work**) — execution episode (`deliveryWorkRef : WorkRef`)

**SERV‑LEX‑3 (Family‑name modifier + shorthand, normative).**
The facet head phrases above are **canonical** for RPR‑SERV. In normative prose, authors SHALL use these phrases (including the family‑name modifier **service**) as the primary surface forms for the facets.
The modifier **service** inside these phrases is not an “unqualified service” use and does not itself trigger further unpacking.
For readability, a local shorthand MAY be introduced by parenthetical declaration immediately after the canonical phrase, and then used consistently within that declared scope (for example: “service delivery system (delivery system)”). A conforming text SHALL NOT introduce multiple shorthands for the same facet, and SHALL NOT reuse a shorthand for a different facet.
In code identifiers, slot names (e.g., `deliverySystemRef` in `serviceSituation(…)`), and diagrams/tables, the modifier MAY be omitted without an explicit shorthand declaration, because the surrounding construct already binds the facet.

**Cluster note (server/provider) — heuristics (informative).**
* If the draft uses **server** as a synonym for “the service”, it usually denotes the **service access point** (or host system), unless the domain’s “server” is explicitly a person (e.g., restaurant).
* If the draft uses **service provider** but then predicates deployment/restart/latency, it usually denotes a **service delivery system** or **service access point**, not an accountable principal.
* If the draft uses **service provider** but then predicates “guarantees / obligated”, it usually denotes the **service provider principal** plus an explicit **service commitment**.
* If a passage attributes promissory agency to a machine (“the server promises”), treat the machine as a carrier/witness unless the Context explicitly grants it standing as an agent.

(Normative enforcement is via CC‑A.6.8‑1 and CC‑A.6.8‑8.)
