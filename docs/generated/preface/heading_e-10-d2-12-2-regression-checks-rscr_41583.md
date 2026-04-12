---
title: "E.10.D2:12.2 Regression checks (RSCR)"
description: "Generated reference page for heading:e-10-d2-12-2-regression-checks-rscr:41583."
---

# E.10.D2:12.2 Regression checks (RSCR)
> Preface node `heading:e-10-d2-12-2-regression-checks-rscr:41583`

## Content

* **RSCR‑D2‑E01 (Spec demotion guard).** If a **–Spec** loses its harness or testability, it is demoted to **–Description**; diffs show no lingering “shall” claims.
* **RSCR‑D2‑E02 (Bridge drift).** If two Contexts begin to share identical labels, verify no Descriptions/Specs imply Cross‑context identity; add or revise **F.9 Bridges** instead.
* **RSCR‑D2‑E03 (Edition churn).** When a Context’s canon updates, previously valid attestations remain historical (windowed); new Specs/Descriptions cite the new edition.
* **RSCR‑D2‑E04 (Verb hygiene).** Automated grep over corpus finds “contains RSG/RCS” phrasing; none remain after refactor.
* **RSCR‑D2‑E05 (Status bleed).** Spot‑audit a random sample of role graphs to ensure no epistemic/deontic statuses appear as role states.

*Didactic takeaway.*
Think in three layers: **Intension** (what the thing *is*), **Description/Spec** (how we *state* its character and, when mature, *test* it), and **Evaluation** (what we can *attest* about it in a **window**). Keep Contexts local, planes separate, and “contains” out of your vocabulary.
