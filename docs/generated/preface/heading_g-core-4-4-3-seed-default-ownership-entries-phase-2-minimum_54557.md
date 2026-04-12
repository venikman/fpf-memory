---
title: "G.Core:4.4.3 - Seed Default Ownership entries (Phase‑2 minimum)"
description: "Generated reference page for heading:g-core-4-4-3-seed-default-ownership-entries-phase-2-minimum:54557."
---

# G.Core:4.4.3 - Seed Default Ownership entries (Phase‑2 minimum)
> Preface node `heading:g-core-4-4-3-seed-default-ownership-entries-phase-2-minimum:54557`

## Content

| DefaultId                       | DefaultOwnerRef                                           | Notes |
| ------------------------------ | --------------------------------------------------------- | ----- |
| `DefaultId.PortfolioMode`       | `CC‑G5.23`                                                | Existing owner; other mentions delegate to it. |
| `DefaultId.DominanceRegime`     | `CC‑G5.28`                                                | Existing owner; other mentions delegate to it. |
| `DefaultId.GammaFoldForR_eff`   | `CC‑G5.4`                                                 | Default Γ‑fold for `R_eff` is weakest‑link; overrides require explicit CAL support. |

This table may grow over time; the rule is that the **owner must already exist** (or be intentionally set to `G.Core` when the default is truly Part‑G‑wide and not owned elsewhere). Any change in a row (add/remove/change owner) SHALL be treated as a refresh‑sensitive edit and recorded as `RSCRTriggerKindId.DefaultOwnerChange` (payload: affected `DefaultId.*`, old owner ref, new owner ref).
