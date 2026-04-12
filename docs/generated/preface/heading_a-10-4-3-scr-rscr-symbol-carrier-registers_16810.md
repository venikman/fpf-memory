---
title: "A.10:4.3 SCR / RSCR (Symbol Carrier Registers)."
description: "Generated reference page for heading:a-10-4-3-scr-rscr-symbol-carrier-registers:16810."
---

# A.10:4.3 SCR / RSCR (Symbol Carrier Registers).
> Preface node `heading:a-10-4-3-scr-rscr-symbol-carrier-registers:16810`

## Content

Every `Γ_epist` aggregation **SHALL** emit an **SCR**: an exhaustive register of **symbol carriers** materially used in the aggregate, with id, type, version/date, checksum, source/conditions and optional `PortionOf` (A.14) for sub‑carriers.
Every `Γ_epist^compile` **SHALL** emit an **RSCR**: SCR specialised to a **bounded context** (vocabularies, units) with publication‑grade identifiers and hashes.
*Why this matters:* it prevents “lost sources” during composition and underwrites reproducibility without mandating any specific tool.
