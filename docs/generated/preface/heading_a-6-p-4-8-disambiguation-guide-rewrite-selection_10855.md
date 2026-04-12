---
title: "A.6.P:4.8 — Disambiguation guide (rewrite/selection)"
description: "Generated reference page for heading:a-6-p-4-8-disambiguation-guide-rewrite-selection:10855."
---

# A.6.P:4.8 — Disambiguation guide (rewrite/selection)
> Preface node `heading:a-6-p-4-8-disambiguation-guide-rewrite-selection:10855`

## Content

A RPR‑pattern SHALL include an actionable guide:

> “If the draft says *X*, decide between relation kinds A/B/C, expand missing slots, and rewrite into explicit kind+slots notation.”

For basedness families, A.6.6 provides an existence proof of such a guide (select baseRelation family; add scope/time/witnesses). A.6.P requires this move suite‑wide. 

**Recommended format: RPR‑Disambiguation Guide (Winograd‑style, but ontology‑first).**
To keep disambiguation from collapsing into dictionary debates, present the guide as a compact decision scaffold:

* **trigger surface form** → **candidate RelationKinds / candidate facets (kinds)** → **discriminating questions/tests** → **canonical rewrite(s)** → **L/A/D/E routing hooks**

Rules for the guide:

* Triggers may be **relation umbrellas** (“same/synced/linked/anchored…”) *or* **participant umbrellas** (pronominal/metonymic/over‑broad kind tokens). The guide SHALL state which role(s) the trigger is standing in for (relation kind, endpoint kind, qualifier, mediator).
* Candidate sets SHALL be stated as **kinds/facets/RelationKind tokens**, not as synonym lists. “Service” ⇒ {promise content, access point, provider principal, commitment, work+evidence, …} is the archetype (A.6.8).
* When endpoint‑side ambiguity is present, the guide SHOULD recommend producing a **Candidate‑Set Note** (A.6.P:4.0b) as part of the rewrite, so the chosen facet/kind is reviewable.
* Discriminating questions SHOULD be phrased as small **tests** that map directly to slot requirements (e.g., “Can you call it?” ⇒ `accessPointRef`; “Is it deontic?” ⇒ `commitmentRef` + accountable principal; “Is it actuals?” ⇒ `deliveryWorkRef` + witnesses).
* Canonical rewrites SHALL land in the A.6.P Tech forms (functional/arrow) and SHALL specify any newly required qualifiers (scope, Γ_time, viewpoint/view, schemes, witnesses).
* Routing hooks SHALL name which claim(s) are expected in each quadrant (L/A/D/E) so that “unpacking” reliably produces reviewable obligations rather than prose paraphrases.

**Mini-row (metonymy; endpoint-side trigger, illustrative).**

`"at the table"` → `{PlaceRef(Table#7), MeetingRef(NegotiationSession#3), RoleRef(DecisionMakerSeat#2)}` → tests `{Is the claim about physical location? about participation? about accountable role? which carrier-anchored witnesses exist (badge/access log, calendar invite, minutes/recording)?}` → rewrite `{locatedAt(personRef=…, placeRef=…, Γ_time=…, witnesses=…) | participatesInMeetingUnder(personRef=…, meetingRef=…, roleRef?=…, Γ_time=…, witnesses=…)}` → L/A/D/E hooks `{L: publish RelationKind tokens + SlotSpecs + polarity/inverses; A: decision/publication use requires explicit Γ_time + witness set; D: forbid metonymic endpoint spans in Tech prose (require explicit refs); E: cite carrier-anchored witnesses and their observation conditions}`.
