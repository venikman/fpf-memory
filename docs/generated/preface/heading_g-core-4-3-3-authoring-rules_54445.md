---
title: "G.Core:4.3.3 - Authoring rules"
description: "Generated reference page for heading:g-core-4-3-3-authoring-rules:54445."
---

# G.Core:4.3.3 - Authoring rules
> Preface node `heading:g-core-4-3-3-authoring-rules:54445`

## Content

* **No implicit triggers:**
  Any RSCR/SCR/refresh artefact that *records reasons* MUST record canonical `RSCRTriggerKindId`. Aliases may be recorded as labels, but must not be the only reason code.

* **No implicit overloading:**
  A local token string (e.g., `T4`) SHALL NOT silently change meaning across patterns; namespace is part of the alias (`G.11:T4` ≠ `A.20:T4`).

* **Granularity discipline:**
  If a local cause is narrower than an existing canonical kind, map it to that kind and keep the nuance as a local scope note. If the difference matters for planning/selection, add a new canonical kind.

* **Multi-cause discipline:**
  When an event spans multiple canonical kinds, record multiple triggers (preferred) or map the alias to a set `{…}` and require emitting the full set.
