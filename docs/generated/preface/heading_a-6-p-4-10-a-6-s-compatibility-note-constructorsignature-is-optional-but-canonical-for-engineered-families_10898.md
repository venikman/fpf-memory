---
title: "A.6.P:4.10 — A.6.S compatibility note (ConstructorSignature is optional but canonical for engineered families)"
description: "Generated reference page for heading:a-6-p-4-10-a-6-s-compatibility-note-constructorsignature-is-optional-but-canonical-for-engineered-families:10898."
---

# A.6.P:4.10 — A.6.S compatibility note (ConstructorSignature is optional but canonical for engineered families)
> Preface node `heading:a-6-p-4-10-a-6-s-compatibility-note-constructorsignature-is-optional-but-canonical-for-engineered-families:10898`

## Content

If a RPR‑pattern is used as an engineered family (created/evolved over time), it SHOULD be expressible as:

* a **TargetSignature**: declared relation kinds + SlotSpecs + laws, and
* a minimal **ConstructorSignature**: effect‑free operations that rewrite under‑specified prose into the explicit form and evolve relation records using the change‑class lexicon (mapped to A.6.5/A.6.6 canonical verbs).

If a ConstructorSignature is provided, it SHOULD (conceptually) declare, for each constructor operator family:

* whether it is a species of **A.6.2 / A.6.3 / A.6.4**, and
* which **`U.EpistemeSlotGraph` slots** (C.2.1) it may read and write (SlotKind/ValueKind/RefKind profile).

**Publication note (recommended).**
If the TargetSignature / relation-kind registry is published via MVPK, treat every face as a **view** (no new semantics), keep viewpoint accountability explicit, and prefer stable claim IDs (Claim Register) so downstream carriers cite claims rather than paraphrasing.
