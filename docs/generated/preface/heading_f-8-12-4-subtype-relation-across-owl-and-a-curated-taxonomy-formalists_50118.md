---
title: "F.8:12.4 Subtype relation across OWL and a curated taxonomy (formalists)"
description: "Generated reference page for heading:f-8-12-4-subtype-relation-across-owl-and-a-curated-taxonomy-formalists:50118."
---

# F.8:12.4 Subtype relation across OWL and a curated taxonomy (formalists)
> Preface node `heading:f-8-12-4-subtype-relation-across-owl-and-a-curated-taxonomy-formalists:50118`

## Content

**Need.** Present “is‑a” uniformly across OWL 2 classes and a domain taxonomy.
**senseFamily.** Type‑structure.

**Contexts.** `OWL 2` (SubClassOf), `Taxonomy_X` (curated “is‑a” edges).

**Reasoning.** F.7 row “subtype‑order” exists at **Type‑structure scope** with CL = 3 (only after verifying acyclicity & anti‑symmetry in `Taxonomy_X`). If the curated taxonomy contains cycles, **downgrade** to Naming‑only or reject the row.

**Outcome.** When CL≥3, you may **reuse row** for structural proofs; else teach differences.
