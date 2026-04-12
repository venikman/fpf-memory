---
title: "A.6.P:4 — Solution — The RPR recipe (Lens → Slots → Change Lexicon → Guardrails), aligned to A.6 / A.6.B / A.6.S"
description: "Generated reference page for heading:a-6-p-4-solution-the-rpr-recipe-lens-slots-change-lexicon-guardrails-aligned-to-a-6-a-6-b-a-6-s:10601."
---

# A.6.P:4 — Solution — The RPR recipe (Lens → Slots → Change Lexicon → Guardrails), aligned to A.6 / A.6.B / A.6.S
> Preface node `heading:a-6-p-4-solution-the-rpr-recipe-lens-slots-change-lexicon-guardrails-aligned-to-a-6-a-6-b-a-6-s:10601`

## Content

A.6.P defines a **suite recipe**. A pattern is a **RPR‑pattern** (member of A.6.P) iff it provides the ingredients below.

## A.6.P:4.0 — Trigger rule (when A.6.P applies)

A relation mention or relation-bearing phrase is in-scope for A.6.P when **any** of the following holds:

* the predicate/verb phrase is **lexically overloaded** (umbrella tokens such as “same/sync/link/connect/anchor/ground/align/map/depends”), or
* one or more endpoints/qualifiers are expressed via **pronominal / deictic / metonymic stand-ins** or **over-broad kind tokens** (e.g., “it/this/that”, “the service”, “the system”, “at the table”), such that multiple referents/facets remain plausible, or
* a **generic or over-broad head noun** carries its load only through a qualifier, modifier, or surrounding phrase (e.g., “comparative note”, “safe guidance”, “interactive view”, “reliable output”), so the object kind is still ambiguous even though the qualifier sounds informative, or
* the statement implicitly relies on **scope / Γ_time / viewpoint/view / schemes** (reference, representation), or
* the relation is used for **assurance / admissibility / gating / publication** decisions, or
* the relation crosses **Contexts or planes** (requires Bridges + CL; no silent equivalence), or
* different stakeholders interpret endpoints differently (multi-view asymmetry and polarity fights).

**Repair order note.** When a load-bearing phrase is triggered because its **head noun** is too generic, first restore what kind of thing the head actually names (artifact, reading, process, lane, authority use, or another host-local kind) using local object-of-talk discipline (`E.10`, `A.7`, and nearby host law). A narrowing qualifier such as `comparative`, `safe`, `interactive`, or `reliable` may narrow the phrase, but it does **not** by itself restore the head kind. Then apply A.6.P to restore the remaining relation or comparison burden. Mixed-axis checks come **after** those two repairs, not before them.

**Adoption test (review heuristic).** If a reviewer can reasonably ask any of: “Which kind is this?”, “What exactly does this span refer to (which facet/kind, and in which lane: Object vs Description vs Carrier)?”, “What relation or comparison burden is hidden in this qualifier?”, “What else participates?”, “Under what scope/time/view?”, “What changed?”, or “What makes this admissible?”, then authors SHOULD treat the mention as in-scope and rewrite it into explicit kind+slots form before using it for cross-Context reuse or decision/publication claims.

**Precision/relaxation note.** A.6.P is not a blanket demand that every sentence stay maximally explicit forever. It is a trigger-based repair path for **load-bearing** prose. In design-time FPF texts and in run-time texts being prepared for admissible publication, review, gating, or reuse, the repair should be performed before any later didactic plain-language softening or lawful coarsening. Later relaxation is allowed only when the more precise upstream reading remains recoverable and authoritative.

**Generic trigger-word governance rule (normative).** Overloaded words are diagnostic entry points, not default future owners. Generic `A.6.P` therefore requires this order: restore head kind first, restore the remaining relation/comparison burden second, and only then judge whether one reusable burden family is strong enough to justify a new specialization. A new `A.6.P` specialization or broader trigger-word owner is owed only when one stable recurring burden, one reusable lens or rewrite kit, and one `F.18 -> A.6.P`-surviving head already exist by value across more than one worked case. Otherwise token-specific retained knowledge stays with an existing lawful specialization or in one cluster-local / owner-local note rather than expanding generic `A.6.P` into a token bucket store.
## Language-state entry note

RPR entry normally presupposes enough `C.2.4` articulation explicitness that at least one relation-like skeleton can be named explicitly, and often enough `C.2.5` closure that one candidate reading is worth publishing as a relation record rather than remaining mere cue pressure.

If the material is still best treated as a cue pack, routed cue, or unresolved route pressure, keep it in `A.16.1` / `B.4.1` rather than forcing relation publication prematurely. If the strongest lawful continuation is still an open explanatory question, route it through `B.5.2.0`. If a previously published relation must be reopened or backed off because the articulation/closure support collapses, route that retreat through `A.16.2` rather than silently weakening the published relation in place.
## A.6.P:4.0a — Operational repair sequence (how repairs actually proceed)

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
## A.6.P:4.0b — Candidate‑Set Note (informative; review artifact)

When endpoint identity (pronoun/deixis/metonymy/coarse kind) or relation-kind selection is ambiguous, reviews can collapse into “lexicon debates”. A.6.P treats this as an ontology reconstruction step with an explicit, checkable intermediate artifact.

**Candidate‑Set Note template (informative).**

> **Collision note.** This “Candidate‑Set Note” is **not** the F.18 naming-process *candidate set* (NQD-front). It is a local disambiguation artifact for endpoint referents/facets and RelationKind selection during RPR repairs.

For each ambiguous role (relation kind, endpoint facet/kind, qualifier, mediator), record:

* **Trigger span:** the exact surface token(s) in the draft (copy/paste).
* **Role being disambiguated:** `headKind` | `relationKind` | `endpointFacet(pᵢ)` | `endpointRef(pᵢ)` | `qualifier(qⱼ)` | `mediator`.
* **Lane (A.7) (when endpoint‑side):** `Object` | `Description` | `Carrier` (state explicitly when live contenders span lanes; lane‑mixing is a common source of “contract” category errors).
* **Candidate set:** a short list of plausible **head kinds**, **kinds/facets**, and/or **RelationKind tokens** (not synonyms), each with the local cue(s) that made it plausible.
* **Selected facet/kind (and selected RelationKind, if relevant):** the chosen candidate(s).
* **Why:** the discriminating test(s) that were applied, plus pointers to the specific local evidence/witness cues used (carriers, claims, artefacts).
* **Consequence:** which SlotSpecs become required/forbidden and which A.6.B hooks are now triggered (L/A/D/E).

Minimal one‑screen representation:

| Candidates (kinds/facets/tokens) | Selected facet/kind | Why (tests + cues) | Consequence (slots + routing hooks) |
| --- | --- | --- | --- |
| C1 …; C2 …; C3 … | … | … | … |

**Notes.**

* For **metonymy**, list both the literal candidate and the intended target candidate (and make the shift explicit).
* Keep the candidate set small: include only live contenders, and state the elimination test for the others.
* This note is **informative**: it does not replace routed L/A/D/E claims. It exists to prevent “lexicon instead of ontology”.
## A.6.P:4.1 — Stable lens

A RPR‑pattern SHALL name a stable mathematical “lens” that prevents re‑inventing roles per domain. Examples of lenses (illustrative):

* **Kind‑labelled qualified hyperedge / record** (default A.6.P lens)
* **n‑ary relation with distinguished positions** (A.6.5 style)
* **kind‑labelled dependence arrow over a base** (A.6.6 style)
* **span/cospan + declared loss/correspondence notes** (Bridge‑like families)
* **correspondence relation + repair operations** (sync/consistency families)

The lens is a compression device: one stable abstraction that keeps the relation’s **arity and polarity** stable and makes invariants speakable.
## A.6.P:4.2 — Kind‑explicit relation tokens (no umbrella meaning‑surrogates)

For every in‑scope relational claim, authors SHALL select (or mint) an explicit **RelationKind token** as a declared vocabulary element.

A RelationKind token is authored as a `U.Signature`‑level vocabulary element with explicit SlotSpecs for its participant and qualifier positions (`⟨SlotKind, ValueKind, refMode⟩`). When no suitable token already exists, authors SHALL NOT improvise a one-off string by intuition. They SHALL route mint-or-reuse through **F.18**: use **MintNew** by default, build a seed candidate set, surface an honest NQD-front, run the sense-seed read-through, and record why the selected token is chosen from the non-dominated front. Use **DocumentLegacy** only when the label is externally fixed and that status is stated explicitly.

**RelationKind contract skeleton (minimum, recipe-level).**
For each `RelationKind` token, a conforming Context publication SHALL publish a vocabulary entry whose **signature-level definition** is paired with (or points to) a **routed claim bundle** (“contract skeleton”) that declares (at minimum):

The leading **(L)/(A)/(D)/(E)** tags below indicate the intended **A.6.B quadrant routing** for each element of the skeleton.

* **(L) applicability** (A.6.0): the Context/planes where the kind is defined (local meaning is first-class).
* **(L) polarity**, and (if needed) explicit **inverse tokens** (no silent role flips in Tech prose).
* **(L) SlotSpecs** for all participant positions (and any qualifier slots exposed by the family) (`⟨SlotKind, ValueKind, refMode⟩`, where `refMode` is either `ByValue` or a concrete `RefKind` token per A.6.5).
* **(A) repair path for endpoint kind mismatches** (normative): allowed repairs are (i) explicit narrowing, (ii) a `KindBridge` (+ `CL^k` + loss notes), and/or (iii) explicit `retargetParticipant`. Renaming endpoints is not a repair.
* **(L) qualifier expectations**: which qualifiers are required/optional/forbidden (scope, `Γ_time`, viewpoint/view, reference scheme, representation scheme).
* **(D) qualifier placement discipline**: extra parameters belong in `scope` or explicit qualifier slots, not as adjectives attached to endpoint names.
* **(A/E) witness discipline**: when witnesses are required as an admissibility gate and what carrier-anchored witness sets look like in this family.
* **(L/A) admissible semantic change classes** (see §4.4) and whether they require a new edition.
* **(A/E) cross‑Context/plane policy** when applicable (Bridge ids + CL + loss notes policy).

**Important stack constraint (A.6 / A.6.S / A.6.B).**
Treat “contract” as a routed set of claims, not a single magical object:

* **L‑claims** (laws/invariants; polarity; SlotSpec typing) live in `Signature.Laws`.
* **A‑claims** (admissibility gates) are authored as admissibility predicates (canonically placed in `Mechanism.AdmissibilityConditions` when an explicit mechanism exists) and may reference the RelationKind token by ID.
* **D‑claims** (duties/commitments) name accountable roles/agents and may reference `L-*`/`A-*` by ID.
* **E‑claims** (evidence/work effects) anchor to carriers and observation conditions and may reference `L-*`/`A-*` by ID.
## A.6.P:4.3 — Slot‑explicit qualified relation records (recover hidden arity)

A conforming text SHALL ensure that each in‑scope relation instance is representable as a **Qualified Relation Record** (a first‑class record/episteme in the relevant Context) that fills the relation’s slots.

Conceptual notation‑neutral shape:

**Notation note (A.6.5 alignment).** In this family `refMode` is a slot‑content mode: either `ByValue` (inline value of the declared ValueKind) or a concrete `RefKind` token (slot holds a reference/pin of that RefKind).
```
QualifiedRelationRecord :=
⟨ relationKind : RelationKind, // vocabulary token / registry entry (signature-level)

  // participant positions (pattern-specific; contract fixes SlotSpecs)
  p₁ : SlotContent(VK₁, refMode₁),
  …,
  pₙ : SlotContent(VKₙ, refModeₙ),

  // qualifier kit (pattern-specific; contract selects subset)
  scope?       : SlotContent(U.Scope, ByValue | RefKind),
  Γ_time?      : SlotContent(U.GammaTimePolicy, ByValue), // time selector/policy; not an evidence freshness proxy
  viewpoint?   : SlotContent(U.Viewpoint, ByValue | RefKind),
  view?        : SlotContent(U.View, ByValue | RefKind),
  refScheme?   : SlotContent(U.ReferenceScheme, ByValue | RefKind),
  reprScheme?  : SlotContent(U.RepresentationScheme, ByValue | RefKind),

  witnesses?   : SlotContent(VK_wit, ByValue | RefKind)
⟩
```

**Slot naming guard.** `*Slot` suffix names positions (SlotKinds), not occupants; prose SHOULD use occupant names (`scope`, `witnesses`, `base`, `dependent`, …) for fillers. This is the same guard used in A.6.6 and A.6.5. 

**Well‑formedness principle.** The record is “typed by contract”: SlotSpecs are fixed by the selected RelationKind token, and missing slots are permitted only if the contract says they are optional. This mirrors A.6.6’s scoped/witnessed declaration move (SWBD): “shape + contract makes a concrete typed signature”.

**Well‑formedness constraints (non‑deontic).**

* **WF‑A6P‑QR‑1 (Required slots are present).** For any QualifiedRelationRecord `r` with `r.relationKind = k`, `r` provides values for every SlotSpec that `k` marks as required.
* **WF‑A6P‑QR‑2 (No silent kind swap).** `relationKind` is part of a record’s identity/edition boundary. If the kind changes, the result is represented as a distinct record/edition linked by an explicit `changeRelationKind` (or an explicit withdrawal + re‑declaration), not as an in-place mutation that preserves identity.

**Normative prose forms (Tech).**
In Tech/normative prose, authors SHALL express an in‑scope relation instance in one of the following equivalent forms:

* **Functional form:** `relationKind(p₁=…, …, pₙ=…, qualifiers…)`
* **Arrow form (binary projection only):** `p_left --relationKind{qualifiers}--> p_right`

Passive umbrella voice (“X is synced/linked/anchored …”) is permitted only as Plain gloss when immediately rewritten into one of the above forms.

**Cross‑Context/plane note (recipe-level).**
If any participant/qualifier implies cross‑Context or cross‑plane reuse, the routed claim bundle MUST cite the relevant Bridge ids + CL policy (and loss notes, when applicable) in the appropriate routed claims (typically `A-*` and/or `E-*`). Label identity is not an admissible substitute.
## A.6.P:4.4 — Change‑class lexicon (operations are not adjectives)

A RPR‑pattern SHALL publish a **relation‑change lexicon**: a small set of semantic change classes used in normative prose to describe “what changed” without umbrella verbs.

Minimum semantic change classes (conceptual; specialisations may add more):

1. **declareRelation** — mint a new qualified relation record (slot‑explicit).
2. **withdrawRelation** — retire a relation instance (render it inactive for downstream use). If the intent is narrowing (still valid within a smaller scope/window), use `rescope`/`retime` rather than overloading withdrawal.
3. **retargetParticipant(slotKind, newRef)** — change a RefKind slot-content while preserving SlotKind and ValueKind (conceptually corresponds to slot‑level **retarget**). 
4. **reviseByValue(slotKind, newValue)** — edit embedded by‑value content (conceptually corresponds to slot‑level assign/update or “by‑value edit”). 
5. **rescope(newScope)** — change scope explicitly (no “in our context” prose).
6. **retime(newΓ_time)** — change `Γ_time` when time matters; not a substitute for witness freshness claims.
7. **refreshWitnesses(newWitnessSet)** — update witness bindings to point at appropriate carriers; generating evidence is Work, not a constructor op. 
8. **changeRelationKind(newRelationKindToken)** — semantic change; MUST NOT be treated as an edit‑in‑place.

**Edition fence rule (A.6.S / A.6.6 alignment).**
In decision/publication lanes, any semantic change that alters meaning SHALL be represented as a new edition and connected via explicit continuity/withdrawal, rather than mutating the old record in place. 

**Mapping note (informative, conceptual).**
These change classes are semantic; they may be realised by A.6.5 slot verbs (retarget vs by‑value edit) and, when the relation is a basedness family, by A.6.6 base‑change verbs. The semantic story must not collapse into “we edited something”.
## A.6.P:4.5 — Lexical guardrails (ban umbrella metaphors as meaning‑surrogates)

A RPR‑pattern SHALL define **red‑flag umbrella tokens** for its ambiguity cluster, and SHALL provide canonical rewrite forms.

Normative base rules (suite-level):

* In **Tech / normative prose**, umbrella predicates (e.g., “same”, “synced”, “linked”, “connected”, “anchored/grounded”) MUST NOT substitute for an unnamed RelationKind token.
* **“bind/binding” is reserved for name binding** (Identifier → SlotKind/slot‑instance) and MUST NOT be used as a synonym for declaring/changing a relation instance. Use the change‑class lexicon instead. 
* Pattern-defined carve‑outs MAY exist (reserved primitives elsewhere), but they remain review triggers to ensure the reserved sense is intended (as in A.6.6’s `anchor*` carve‑out rule). 

**Recommended publication move (no extra authoring apparatus implied).** For stable ambiguity clusters, publish the red‑flag token list and canonical rewrites as a LEX‑BUNDLE entry (PTG=Guarded) and, when the cluster introduces new `RelationKind` tokens or stable facet head phrases, include them in the relevant UTS rows (F.17). This keeps rewrite discipline shareable outside the A.6 cluster.
## A.6.P:4.6 — Progressive elaboration (the “precision dial” rule)

A.6.P supports a controlled escalation path that preserves meaning and prevents drift:

1) Start with a minimal explicit **RelationKind token** + principal endpoints (a binary projection is allowed only if every omitted participant/qualifier slot is contractually optional *and* irrelevant for the downstream lane(s)).

2) When ambiguity emerges, **do one (or more) explicitly**:
   * add missing participants as additional slots (turn the projection into n‑ary),
   * add explicit qualifiers (scope / `Γ_time` / viewpoint/view / schemes / witnesses),
   * refine the RelationKind token to a more specific one (new contract skeleton; `changeRelationKind`),
   * introduce Bridges + CL (and loss notes) when crossing Contexts/planes.

3) Authors MUST keep the transition monotone:
   * no silent re‑typing,
   * no implicit polarity flips,
   * no “edit‑in‑place” that changes meaning (use edition fences + explicit continuity/withdrawal links).
## A.6.P:4.7 — Two‑view / polarity discipline (no silent role flips)

A RPR‑pattern SHALL specify how the same relation is expressed from both “sides” without polarity flips:

* Either keep both endpoints visible with the same polarity-preserving token, **or**
* declare explicit inverse tokens and require them for inverse prose.

Implicit role flips (“B validates A” without explicit inverse) are prohibited in Tech/normative prose. This is already a core rule for basedness patterns and is generalised here.
## A.6.P:4.8 — Disambiguation guide (rewrite/selection)

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
## A.6.P:4.9 — A.6.B routing template for RPR relation families

Any RPR‑pattern that claims “contract-bearing” semantics SHALL route its normative content using **A.6.B**:

* **L‑claims**: signature‑level structure and laws (SlotSpecs, polarity, invariants).
* **A‑claims**: admissibility / “entry gate” rules for *using* relation instances in specified lanes (e.g., decision use requires witnesses; time dependence requires `Γ_time`; cross‑Context use requires Bridges/CL).
* **D‑claims**: deontic obligations on authors/agents (lexical firewall; prohibited umbrella use; rewrite obligations).
* **E‑claims**: work/evidence expectations and carrier anchoring (what counts as a witness; evidence freshness is a property of carriers, not prose). 

A.6.P does not mandate a particular claim‑ID format; it mandates the **separation and cross‑reference discipline**.

**Atomicity + explicit references (normative, recipe-level).**
Per A.6.B, mixed sentences MUST be decomposed into **atomic** claims so each claim routes to exactly one quadrant, and any dependencies MUST be expressed as explicit references (by claim ID or canonical location), not paraphrased duplicates.

**No upward dependencies (normative, recipe-level).**
`L-*` claims MUST NOT reference `A-*`, `D-*`, or `E-*`; `A-*` and `E-*` claims MUST NOT reference `D-*`. Where cross‑quadrant coupling is needed, link by explicit IDs in the allowed directions.
## A.6.P:4.10 — A.6.S compatibility note (ConstructorSignature is optional but canonical for engineered families)

If a RPR‑pattern is used as an engineered family (created/evolved over time), it SHOULD be expressible as:

* a **TargetSignature**: declared relation kinds + SlotSpecs + laws, and
* a minimal **ConstructorSignature**: effect‑free operations that rewrite under‑specified prose into the explicit form and evolve relation records using the change‑class lexicon (mapped to A.6.5/A.6.6 canonical verbs).

If a ConstructorSignature is provided, it SHOULD (conceptually) declare, for each constructor operator family:

* whether it is a species of **A.6.2 / A.6.3 / A.6.4**, and
* which **`U.EpistemeSlotGraph` slots** (C.2.1) it may read and write (SlotKind/ValueKind/RefKind profile).

**Publication note (recommended).**
If the TargetSignature / relation-kind registry is published via MVPK, treat every face as a **view** (no new semantics), keep viewpoint accountability explicit, and prefer stable claim IDs (Claim Register) so downstream carriers cite claims rather than paraphrasing.
