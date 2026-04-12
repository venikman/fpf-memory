---
title: "A.6.P:4.0a — Operational repair sequence (how repairs actually proceed)"
description: "Generated reference page for heading:a-6-p-4-0a-operational-repair-sequence-how-repairs-actually-proceed:10632."
---

# A.6.P:4.0a — Operational repair sequence (how repairs actually proceed)
> Preface node `heading:a-6-p-4-0a-operational-repair-sequence-how-repairs-actually-proceed:10632`

## Content

The suite is presented as **lens → slots → change lexicon → guardrails** because the *stable abstraction* is what keeps repairs reusable. In actual editing, repairs often start from a **triggering surface token** and proceed through a context-reconstruction step.

Operationally, authors SHOULD follow this repair sequence when applying an RPR repair:

0. **Restore the head kind if needed.** If the triggering phrase uses a generic or over-broad head noun (`note`, `view`, `guidance`, `output`, `artifact`, and similar placeholders), first state what kind of thing it actually is in local host terms (publication artifact, reading, process, authority use, and so on). Do not let a qualifier do this job by implication alone.
1. **Trigger on surface form.** Detect umbrella relation predicates, pronominal/umbrella endpoint tokens or metonymic pointers, and generic-head-plus-load-bearing-qualifier combinations (including domain clusters such as **service** in A.6.8 and cross-Context “same/equivalent/align/map” in A.6.9).
2. **Reconstruct the situation ontology from local context.** Enumerate candidate referents/facets for endpoints *(including A.7 lane: Object vs Description vs Carrier when it matters)*, candidate head kinds where the phrase is noun-led, and candidate `RelationKind` tokens or comparison burdens for the overloaded predicate/qualifier, plus implied participants (scope/time/view/scheme/mediator artefacts). Capture the result as a **Candidate-Set Note** (A.6.P:4.0b) so review has a checkable artifact: candidates → selected facet/kind → why. When metonymy is plausible, include both the *literal* and the *intended* candidates.
3. **Choose a stable lens** that can represent the reconstructed arity/polarity without ad-hoc role invention.
4. **Refine the ontology under the lens.** Turn implied roles into SlotSpecs; repair endpoint kind mismatches explicitly (narrowing / KindBridge / retargetParticipant); separate object kind, relation burden, and qualifier burden; make qualifiers explicit as slots or routed conditions.
5. **Emit canonical rewrites + routing hooks.** Produce Tech-form rewrites (`relationKind(…)` / arrow form) and state the A.6.B hooks: which parts are L vs A vs D vs E, and which witnesses/commitments/work claims are now demanded.
6. **Only then allow later relaxation.** If a Plain, didactic, or coarsened restatement is still wanted, derive it from the repaired form and keep the repaired form as the authoritative source for any stronger reading.

**Decision/publication fail-closed (normative).** If an in-scope mention is used to justify an admissibility gate, publication claim, or cross-Context reuse, authors MUST resolve the candidate sets to a selected `RelationKind`, selected endpoint facets/kinds, and any required head-kind reconstruction and emit an explicit rewrite. If that cannot be done from available context and witnesses, keep the statement as Plain/informative gloss (or split into multiple explicit alternatives) and do not treat it as admissible input for the gate.

**Informative: referential compression spectrum.** Many triggers live on a spectrum from high to low referential precision:
pronouns/deictics → overloaded polysemes → coarse domain kinds → facet head phrases → precise domain terms.
Metonymy often shifts the denotation (e.g., a place phrase standing in for an object or a role). The repair sequence explicitly treats this as a **candidate-set** problem, not as “the dictionary meaning”.

**Metonymy micro-example (informative; endpoint-side trigger beyond anaphora).**

Draft: “Alice is **at the table**.”

`at the table` → candidates `{place, meeting, artifact, role}` → choose explicitly → rewrite into endpoint-refs + qualifiers:

```
CandidateSetNote(triggerSpan="at the table", role=endpointFacet(p₂)):
- candidates: {PlaceRef(Table#7), MeetingRef(NegotiationSession#3), ArtifactRef(AgendaDoc#12), RoleRef(DecisionMakerSeat#2)}
- selected:   MeetingRef(NegotiationSession#3) + RoleRef(DecisionMakerSeat#2)  // metonymy: place → meeting/role
- consequence: require explicit `meetingRef`, `roleRef`, `Γ_time`, `witnesses` (and route decision/admissibility separately via A.6.B)

participatesInMeetingUnder(
  personRef  = PersonRef(Alice),
  meetingRef = MeetingRef(NegotiationSession#3),
  roleRef    = RoleRef(DecisionMakerSeat#2),
  Γ_time     = snapshot(t),
  witnesses  = {attendanceLogPins}
)
```

If the literal location reading is intended, select `PlaceRef(Table#7)` and rewrite as `locatedAt(…)` with an explicit `Γ_time` qualifier.

This step is intentionally **not lexicon-only**. The lexical rewrite is the *output* of an ontology- and lens-constrained repair, not the starting point. If you cannot state the candidate referents/facets, the selected head kind where needed, and the selected `RelationKind` token, the repair is incomplete.
