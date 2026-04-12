---
title: "A.6.P:4.2 — Kind‑explicit relation tokens (no umbrella meaning‑surrogates)"
description: "Generated reference page for heading:a-6-p-4-2-kind-explicit-relation-tokens-no-umbrella-meaning-surrogates:10719."
---

# A.6.P:4.2 — Kind‑explicit relation tokens (no umbrella meaning‑surrogates)
> Preface node `heading:a-6-p-4-2-kind-explicit-relation-tokens-no-umbrella-meaning-surrogates:10719`

## Content

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
