---
title: "G.Core:2 - Problem"
description: "Generated reference page for heading:g-core-2-problem:54300."
---

# G.Core:2 - Problem
> Preface node `heading:g-core-2-problem:54300`

## Content

Without a single owner for Part‑G‑wide invariants, Part G drifts in at least six recurring ways:

1. **Shadow contract surfaces** emerge: downstream patterns restate CN‑Spec / CG‑Spec constraints, accidentally creating “local specs” that can diverge from the canonical contract surfaces.
2. **Crossing discipline becomes inconsistent**: “crossing events” and “crossing visibility” are described differently across `G.x`, causing ambiguity about what must be pinned (UTS/Path/policy‑ids/editions) and what triggers refresh/regression.
3. **Guard semantics drift**: tri‑state eligibility and “unknown handling” can be reinterpreted in local prose, producing hidden fourth statuses or implicit coercions.
4. **Hidden scalarization appears**: partial orders are silently collapsed into scalars, or totalization is introduced implicitly through “helpful” numeric summaries.
5. **Suite/kit/pack mixing blurs ownership**: downstream patterns drift into “owning” what should remain owned by the suite boundary (A.6.7/A.19.CHR), kit surfaces (each `G.x`), or shipping (G.10).
6. **Refactoring breaks public IDs**: CC items and trigger labels become hard to evolve because removing duplicates risks breaking external references.

Part G requires a single place where these invariants and refactoring disciplines live, while keeping Part G patterns modular and method/discipline specifics explicitly separated.
