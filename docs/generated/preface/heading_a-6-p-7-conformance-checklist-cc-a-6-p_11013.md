---
title: "A.6.P:7 — Conformance Checklist (CC‑A.6.P)"
description: "Generated reference page for heading:a-6-p-7-conformance-checklist-cc-a-6-p:11013."
---

# A.6.P:7 — Conformance Checklist (CC‑A.6.P)
> Preface node `heading:a-6-p-7-conformance-checklist-cc-a-6-p:11013`

## Content

A pattern P conforms to A.6.P (i.e., is an RPR‑pattern) iff:

 > **Note.** This checklist defines conformance for **RPR specialisations** (e.g., A.6.5, A.6.6, A.6.8, A.6.9, A.6.C and future A.6.x patterns). A.6.P itself is the **suite recipe**.

1. **CC‑A.6.P‑1 — Lens is explicit.**
   P SHALL name the stable lens used to stabilise the ambiguity cluster and justify its fit.

2. **CC‑A.6.P‑2 — RelationKind is explicit and named through lawful mint-or-reuse.**
   Every in‑scope relation claim SHALL name an explicit RelationKind token, and that token SHALL resolve to a vocabulary entry whose contract skeleton publishes (at minimum): polarity (and explicit inverses if needed), participant SlotSpecs `⟨SlotKind, ValueKind, refMode⟩`, qualifier requirements, witness expectations for decision/publication lanes, admissible semantic change classes, and (when applicable) cross‑Context/plane policy (Bridge + CL + loss notes). Routed claims SHALL respect A.6.B.
   When a suitable token does not already exist, authors SHALL mint or document it through **F.18** rather than inventing a one-off label by intuition: **MintNew** is the default, the seed candidate set and NQD-front SHALL be surfaced, and the final token SHALL be selected from that non-dominated front unless an explicit legacy exception is recorded.
   The contract skeleton SHALL also declare admissible **repair paths for endpoint kind mismatches** (KindBridge / explicit narrowing / explicit retargeting) and enforce **qualifier placement discipline** (no adjective smuggling).

3. **CC‑A.6.P‑3 — Slot‑explicit instances.**
   P SHALL ensure that every in‑scope relation instance is expressible as a Qualified Relation Record filling all contract‑required participant slots (no hidden arity; see WF‑A6P‑QR‑1).

4. **CC‑A.6.P‑4 — Qualifiers are explicit when required.**
   If scope/time/viewpoint/reference-scheme assumptions matter (or the relation kind requires them), they SHALL be explicit; implicit “current/latest/in our context” SHALL NOT substitute.
   When witness freshness/decay matters, it SHALL be expressed explicitly (evidence-role timespans, qualification windows, explicit freshness predicates), not by treating `Γ_time` as a proxy.

5. **CC‑A.6.P‑5 — No silent polarity flips.**
   If inverse wording is used, it SHALL use explicit inverse tokens or polarity‑preserving forms; implicit role flips are forbidden. 

6. **CC‑A.6.P‑6 — Change semantics use a change‑class lexicon.**
   Normative prose about relation evolution SHALL use named semantic change classes (declare/withdraw/retarget/revise/rescope/retime/refreshWitnesses/changeKind), not generic “update/modify/sync/bind/anchor”.
   Any mapping to lower-level slot verbs MUST preserve the A.6.5 retarget vs by‑value edit distinction. 

7. **CC‑A.6.P‑7 — “bind/binding” discipline.**
   `bind/rebind` SHALL be reserved for name binding (Identifier → SlotKind/slot‑instance) and SHALL NOT be used as a synonym for relation edits. 

8. **CC‑A.6.P‑8 — Lexical firewall is normative.**
   P SHALL list red‑flag umbrella tokens for the family and provide rewrite rules; umbrella tokens SHALL NOT function as meaning‑surrogates in Tech/normative prose. If legacy/Plain umbrella wording appears, it SHALL be immediately mapped to an explicit Tech form (`relationKind(…)` or `--relationKind-->`).

9. **CC‑A.6.P‑9 — A.6.B atomicity, routing, and explicit references are respected.**
   Normative text SHALL be decomposed into atomic claims routable to exactly one quadrant (L/A/D/E). Dependencies SHALL be expressed by explicit references (IDs or canonical locations), not paraphrase. No‑upward‑dependency constraints SHALL be preserved.

10. **CC‑A.6.P‑10 — Evidence is carrier‑anchored (A.7 separation).**
    Statements about witnesses/evidence/freshness SHALL be framed as properties/expectations of carriers and work, not as properties of prose. 

11. **CC‑A.6.P‑11 — A.6.S compatibility when engineered.**
    If the pattern family is presented as engineered/evolving, it SHALL be compatible with A.6.S: distinguish TargetSignature vs ConstructorSignature; map constructor verbs to A.6.5/A.6.6 canonical verbs; keep constructor ops effect‑free; and (when a ConstructorSignature is present) declare the C.2.1 slot read/write profile and whether ops are A.6.2/A.6.3/A.6.4 species.

12. **CC‑A.6.P‑12 — Cross‑Context/plane reuse is explicit (no “sameness by label”).**
    If a relation instance crosses Contexts/planes (or requires translation), the carrier SHALL cite Bridge ids + CL policy (and loss notes, when applicable). Label identity or “same anyway” prose SHALL NOT substitute.

13. **CC‑A.6.P‑13 — Disambiguation guide is actionable.**
    P SHALL include an explicit rewrite/selection guide that maps each red-flag umbrella cluster or generic load-bearing head phrase to candidate head kinds, candidate `RelationKind` tokens, and (when the ambiguity is endpoint-side) candidate endpoint facets/kinds, plus required qualifiers and canonical rewrite forms.
    The guide SHOULD follow the RPR‑Disambiguation format: **trigger → candidates → discriminating questions/tests → canonical rewrite → L/A/D/E routing hooks**.
    
    Where endpoint referential compression is a primary risk, the guide SHOULD also include (or point to) the **Candidate‑Set Note** template (A.6.P:4.0b) so instance‑level reviews have an auditable trail: candidates → selected facet/kind → why.

14. **CC‑A.6.P‑14 — Grounding spans System and Episteme.**
    P SHALL include at least one Tell–Show–Show vignette in a **System** lane and at least one in an **Episteme** lane (per E.8), demonstrating a real ambiguity repair and a relation‑change narration using the change‑class lexicon.

15. **CC‑A.6.P‑15 — Trigger rule is explicit.**
    P SHALL include an explicit trigger rule (or selection heuristic) stating when the family applies and what counts as “in-scope” umbrella relational prose.
