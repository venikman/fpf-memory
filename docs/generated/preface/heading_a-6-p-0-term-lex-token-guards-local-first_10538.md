---
title: "A.6.P:0 — TERM/LEX token guards (local-first)"
description: "Generated reference page for heading:a-6-p-0-term-lex-token-guards-local-first:10538."
---

# A.6.P:0 — TERM/LEX token guards (local-first)
> Preface node `heading:a-6-p-0-term-lex-token-guards-local-first:10538`

## Content

This pattern reserves the following tokens on Tech (normative) surfaces:

* **RPR** — *Relational Precision Restoration* (the suite recipe; not a new `U.Type`).
* **RelationKind** — a Context-local vocabulary token (signature-level) that fixes polarity and SlotSpecs for participant/qualifier positions. It is a *registry entry/token*, not a relation instance.
* **QualifiedRelationRecord** — the slot-explicit relation instance record kind (Context-local episteme/record kind); instances carry a `relationKind` token reference plus explicit participant/qualifier slots.

**Mint-or-reuse note (recipe-level).** This pattern mints the suite label **RPR**, the role name **RelationKind**, and the generic shape name **QualifiedRelationRecord** as local-first terms for this family. It reuses existing FPF terms (`U.Signature`, SlotKind/ValueKind/RefKind, Bridges/CL, `U.Scope`, `Γ_time`, `U.View`/`U.Viewpoint`, evidence pins/carriers) without changing their meanings.

**Definitions (recipe-level; non-deontic).**

* **RelationKind token** — a declared vocabulary element (signature-level) whose *public surface* fixes polarity and SlotSpecs for participant/qualifier positions, and that is referenced by routed claims (L/A/D/E) that govern admissibility, duties/commitments, and evidence/work.
* **QualifiedRelationRecord** — a Context-local episteme/record kind whose `relationKind` field points (by id/ref) to a RelationKind token and whose instance records make all contract-required participant/qualifier slots explicit.

Rename-guards (common collisions):

* **contract** — Plain shorthand for “published boundary interface description”; a conforming text MUST NOT treat the term *contract* as itself establishing a promise/obligation. Promises, duties, and gates route via A.6.B.
* **bind/binding** — reserved for **name binding** (Identifier → SlotKind/slot-instance) and MUST NOT be used as a synonym for relation instance edits.
* **same/synced/linked/connected/anchored/grounded** — treated as umbrella tokens; allowed as Plain gloss only when immediately mapped to an explicit RelationKind token (Tech) via rewrite rules.
