---
title: "G.Core:8 - Common anti-patterns and how to avoid them"
description: "Generated reference page for heading:g-core-8-common-anti-patterns-and-how-to-avoid-them:54643."
---

# G.Core:8 - Common anti-patterns and how to avoid them
> Preface node `heading:g-core-8-common-anti-patterns-and-how-to-avoid-them:54643`

## Content

* **Anti-pattern:** Restating CN‑Spec/CG‑Spec rules inside a `G.x` “for convenience”.  
  **Avoid:** cite A.19 / G.0; route via `CC‑GCORE‑CN‑CG‑1`.

* **Anti-pattern:** Adding a fourth guard status (“unknown”, “maybe”, “probe-only”) as a separate decision value.  
  **Avoid:** keep guard domain tri‑state; express “probe-only” as policy/branching and record via pins/audit.

* **Anti-pattern:** Treating mandatory invariants as “defaults” to centralize them.  
  **Avoid:** keep invariants as invariants (CC‑GCORE‑* routed to canonical owners); restrict the Default Ownership Index to true defaults (constants or conditional default-rules).

* **Anti-pattern:** Turning partial orders into scalar ranks silently.  
  **Avoid:** keep set‑valued semantics unless a total order is explicitly declared by a comparator/policy.

* **Anti-pattern:** Competing defaults scattered across multiple patterns.  
  **Avoid:** Default Ownership Index; delegate duplicate statements to the single owner.

* **Anti-pattern:** Local trigger tokens without canonical mapping.  
  **Avoid:** provide/cite a `TriggerAliasMap` with namespace‑qualified aliases.

* **Anti-pattern:** Breaking public CC ids during dedup.  
  **Avoid:** convert to delegation items; preserve IDs.
