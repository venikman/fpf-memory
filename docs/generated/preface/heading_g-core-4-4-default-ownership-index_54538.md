---
title: "G.Core:4.4 - Default Ownership Index"
description: "Generated reference page for heading:g-core-4-4-default-ownership-index:54538."
---

# G.Core:4.4 - Default Ownership Index
> Preface node `heading:g-core-4-4-default-ownership-index:54538`

## Content

`G.Core` provides an index of Part‑G defaults with a **single owner** per `DefaultId`. The index is not a “second spec”; it is a cross-reference table that points to the *true owner* (a CC item, policy‑id, or TaskSignature rule) and states applicability conditions.

## G.Core:4.4.1 - Definitions

* **DefaultId**
  Stable identifier of a default (a default constant or default rule).

* **DefaultOwnerRef**
  A reference to the single owner of the default (e.g., a CC item id like `CC‑G5.23`, or a policy id, or a TaskSignature rule definition).
## G.Core:4.4.2 - Rules

* Exactly one owner per `DefaultId`.
* Any other mention in `G.x` MUST be a citation/delegation to the owner, not a competing statement.
* A default may be conditional (default-rule) with explicit applicability conditions.
* The Default Ownership Index SHALL NOT be used to “smuggle” mandatory invariants as defaults. Invariants remain invariants (typically routed via `CC‑GCORE‑…` to canonical owners).
## G.Core:4.4.3 - Seed Default Ownership entries (Phase‑2 minimum)

| DefaultId                       | DefaultOwnerRef                                           | Notes |
| ------------------------------ | --------------------------------------------------------- | ----- |
| `DefaultId.PortfolioMode`       | `CC‑G5.23`                                                | Existing owner; other mentions delegate to it. |
| `DefaultId.DominanceRegime`     | `CC‑G5.28`                                                | Existing owner; other mentions delegate to it. |
| `DefaultId.GammaFoldForR_eff`   | `CC‑G5.4`                                                 | Default Γ‑fold for `R_eff` is weakest‑link; overrides require explicit CAL support. |

This table may grow over time; the rule is that the **owner must already exist** (or be intentionally set to `G.Core` when the default is truly Part‑G‑wide and not owned elsewhere). Any change in a row (add/remove/change owner) SHALL be treated as a refresh‑sensitive edit and recorded as `RSCRTriggerKindId.DefaultOwnerChange` (payload: affected `DefaultId.*`, old owner ref, new owner ref).
