---
title: "E.10.D2:4.2 The Spec‑gate (when “–Spec” is allowed)"
description: "Generated reference page for heading:e-10-d2-4-2-the-spec-gate-when-spec-is-allowed:41258."
---

# E.10.D2:4.2 The Spec‑gate (when “–Spec” is allowed)
> Preface node `heading:e-10-d2-4-2-the-spec-gate-when-spec-is-allowed:41258`

## Content

Use the **–Spec** suffix **only if all** of the following hold:

1. **Formality F (C.2.3):** the artefact declares **F ≥ F4** (or a context-defined higher threshold) so predicates are checkable.
2. **Verifiability:** invariants are stated as checkable predicates or thresholds.
3. **Harness bound:** there is a linked **acceptance harness** (SCR/RSCR matrices per F.15).
4. **Context anchoring:** all wording is explicitly local to a named `U.BoundedContext` (E.10.D1).

If any condition is missing, the artefact **must be** a `…Description`.
