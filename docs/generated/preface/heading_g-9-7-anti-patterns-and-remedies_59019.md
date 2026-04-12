---
title: "G.9:7 — Anti‑patterns and remedies"
description: "Generated reference page for heading:g-9-7-anti-patterns-and-remedies:59019."
---

# G.9:7 — Anti‑patterns and remedies
> Preface node `heading:g-9-7-anti-patterns-and-remedies:59019`

## Content

* **AP‑1 Hidden edition drift.** Remedy: require edition pins in `ParityPinSet`; treat changes as RSCR‑relevant via canonical trigger kinds.
* **AP‑2 Baseline set is informal prose.** Remedy: require `BaselineBindingRef` and EvidenceTrace pins.
* **AP‑3 Comparator semantics are “whatever the code did”.** Remedy: `ComparatorSpecRef.edition` (and any normalization/comparability refs) must be cited and pinned.
* **AP‑4 Cross‑Context reuse without visible routing.** Remedy: cite bridge/plane routing artefacts and crossing visibility surfaces (delegated to G.Core).
* **AP‑5 Parity report becomes a hidden scoring sheet.** Remedy: preserve lawful outcome shape and keep telemetry as telemetry unless explicitly policy‑promoted by owner patterns.
* **AP‑6 “Metric” as a primitive in Tech.** Remedy: use `DHCMethodRef`/`U.Measure`/`DistanceDefRef` with editions; “metric” may appear only in Plain with an explicit pointer to canonical terms.
* **AP‑7 Hidden spec drift (spec‑level pins missing).** Remedy: pin `DHCMethodSpecRef.edition` and register RSCR tests that fail on spec edition changes; refuse parity reuse on unpinned spec editions.
