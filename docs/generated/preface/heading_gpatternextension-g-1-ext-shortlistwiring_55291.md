---
title: "GPatternExtension — G.1:Ext.ShortlistWiring"
description: "Generated reference page for heading:gpatternextension-g-1-ext-shortlistwiring:55291."
---

# GPatternExtension — G.1:Ext.ShortlistWiring
> Preface node `heading:gpatternextension-g-1-ext-shortlistwiring:55291`

## Content

**PatternScopeId:** `G.1:Ext.ShortlistWiring`
**GPatternExtensionId:** `ShortlistWiring`
**GPatternExtensionKind:** `MethodSpecific`
**SemanticOwnerPatternId:** `G.5`
**Uses:** `{G.5, G.4}`
**⊑/⊑⁺:** `∅`

**RequiredPins/EditionPins/PolicyPins (minimum):**

* `ShortlistId`
* `SCRId` *(assurance/rationale surface by id; semantics owned by the selector/assurance owners)*
* `DRRId?` *(when a decision‑rationale artefact is minted; otherwise omitted)*
* `TaskSignatureRef?` *(if selection is task‑templated; otherwise omitted)*
* `AcceptanceClauseId[]` *(as referenced from `G.4` outputs)*
* any explicit selector policy pins *(policy‑id/ref; owner‑defined)* when not defaulted (default ownership is routed via `G.Core.DefaultOwnershipIndex`)

**Notes (wiring‑only):** `G.1` does not redefine selection: it binds M4’s output surface to the `G.5` selector/dispatcher kernel.
