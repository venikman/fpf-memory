---
title: "SLL — Scaling‑Law Lens (binding)"
description: "Part C - Kernel Extension Specifications"
---

# SLL — Scaling‑Law Lens (binding)
> Pattern `C.18.1` · Stable
> Part C - Kernel Extension Specifications

**One‑screen purpose (manager‑first).**
Make **generation/selection** scale‑savvy: at the level of **conceptual descriptors**, declare (a) **which monotone knobs** we would scale, (b) the **ScaleWindow** over which we claim behaviour, and (c) the **elasticity class** we observed—**without** imposing numeric fits or vendor tools at Core level. This surfaces knees early and keeps comparisons lawful and fair across families. (Parity is handled by **G.9**; illumination remains a **report-only telemetry** unless a CAL policy promotes it.)  

**Builds on.** C.16 (MM‑CHR), C.17 (Creativity‑CHR), C.18 (NQD‑CAL); advisory: C.5 (Resrc‑CAL).
**Coordinates with.** C.19 (E/E‑LOG), G.5 (Selector & Registry), G.9 (Parity Harness), G.10 (Shipping), G.11 (Refresh‑Telemetry), C.24 (Agent‑Tools‑CAL).
**Keywords.** scaling law; **Scale Variables (S)**; ScaleWindow; knee; diminishing returns; **iso‑scale parity**; **UNM/NormalizationMethod‑based mapping**; **scale‑probe**; **DoE** (design‑of‑experiments); segmented regression; knee detection.

Teams often say a method “**scales**” without disclosing **which resources**, **across what window**, and **how** outcomes respond (convex rise → knee → plateau). Without that, parity is skewed (unequal budgets, unmatched windows), coverage/illumination report-metrics leak into dominance, and “knees” are found late. SLL supplies a notation‑independent **lens** to make scale behaviour explicit and comparable.

## Keywords

- scaling law
- scale variables (S)
- compute-elasticity
- data-elasticity
- resolution-elasticity
- exponent class
- knee
- diminishing returns.

## Relations

- `C.18.1` --builds_on--> [MM-CHR — Measurement & Metrics Characterization](/generated/patterns/C.16)
- `C.18.1` --coordinates_with--> [Explore–Exploit Governor (E/E‑LOG)](/generated/patterns/C.19)
- `C.18.1` --coordinates_with--> [Multi‑Method Dispatcher & MethodFamily Registry](/generated/patterns/G.5)
- `C.18.1` --coordinates_with--> [Parity / Benchmark Harness](/generated/patterns/G.9)
- `C.18.1` --coordinates_with--> [SoTA Pack Shipping (pack-boundary owner; SoTA-Pack(Core))](/generated/patterns/G.10)
- `C.18.1` --outline_parent--> [NQD‑CAL — Open‑Ended Search Calculus](/generated/patterns/C.18)
- `C.18.1` --explicit_reference--> [Parity / Benchmark Harness](/generated/patterns/G.9)
- `C.18.1` --explicit_reference--> [MM-CHR — Measurement & Metrics Characterization](/generated/patterns/C.16)
- `C.18.1` --explicit_reference--> [Creativity‑CHR — Characterising Generative Novelty & Value](/generated/patterns/C.17)
- `C.18.1` --explicit_reference--> [NQD‑CAL — Open‑Ended Search Calculus](/generated/patterns/C.18)
- `C.18.1` --explicit_reference--> [Resrc‑CAL](/generated/patterns/C.5)
- `C.18.1` --explicit_reference--> [Explore–Exploit Governor (E/E‑LOG)](/generated/patterns/C.19)
- `C.18.1` --explicit_reference--> [Multi‑Method Dispatcher & MethodFamily Registry](/generated/patterns/G.5)
- `C.18.1` --explicit_reference--> [SoTA Pack Shipping (pack-boundary owner; SoTA-Pack(Core))](/generated/patterns/G.10)
- `C.18.1` --explicit_reference--> [Telemetry-Driven Refresh & Decay Orchestrator](/generated/patterns/G.11)
- `C.18.1` --explicit_reference--> [Agentic Tool‑Use & Call‑Planning (C.Agent‑Tools‑CAL)](/generated/patterns/C.24)

## Content

## Problem frame

Teams often say a method “**scales**” without disclosing **which resources**, **across what window**, and **how** outcomes respond (convex rise → knee → plateau). Without that, parity is skewed (unequal budgets, unmatched windows), coverage/illumination report-metrics leak into dominance, and “knees” are found late. SLL supplies a notation‑independent **lens** to make scale behaviour explicit and comparable.
## Problem

Omitting **Scale Variables** and the comparison window causes: (i) **unfair parity** (compute/data/FoA mismatched), (ii) **illumination/coverage report-metric  creep** into dominance by default, (iii) late detection of knees and budget waste. **G.9** already forbids scalarising mixed scales and mandates equal **FreshnessWindows**/**pinned editions**; SLL complements this with **ScaleWindow** & elasticity.
## Forces

Notation independence vs useful scaling heuristics; local context vs cross‑context generality; **telemetry vs objectives** (illumination stays report‑only telemetry unless policy promotes it); early exploration vs reproducible policy.
## Solution — binding lens for generator/selector profiles (normative)

### Types (aliases; ΔKernel = 0).

`SLL.Profile` is an **annotation** on a `MethodFamily/Generator` or a `Selector` profile; **no new U.Types** are minted (LEX discipline).
### Fields (conceptual descriptors).

* **S — Scale Variables.** Minimal set of **monotone knobs** for the Context: `compute` (steps/tokens/FLOPs/time/energy), `data` (size/quality), `model capacity` (params/branches), `iteration budget`, **`freedom‑of‑action (FoA)`**/**environment richness**, etc. Declare **units** via **Resrc‑CAL** and bind to a **ScaleWindow**. Where training/inference trade, **name the phase** the claim concerns.
* **ScaleWindow.** Declared range of `S` values for which behaviour claims hold (editioned). This is **distinct from** **FreshnessWindow** used by parity. 
* **Scale‑Probe.** At least **two** (preferably **≥ 3**) **parity‑respecting** points in `S` within the ScaleWindow, recorded with **replicates/seeds** and **CI/error bars** to support elasticity classification. Pick points via a **small factorial or Latin‑hypercube** when multiple knobs vary.
* **ElasticityClass** `χ ∈ {rising, knee, flat, declining}` — a **qualitative** class; numeric exponents/fits live in domain annexes, not Core.
* **ParityNotes.** `iso‑scale parity?` flag (and **loss notes** if not achieved), plus **Bridge/Φ/Ψ** IDs when crossing contexts (penalties **route to R only**).
### Norms (SLL).

* **SLL‑1 (Declaration).** Any profile **claiming scale behaviour SHALL** declare `S` and a **ScaleWindow** for the Context.
* **SLL‑2 (Probe).** Early investigation **SHALL** include a **scale‑probe** (≥ 2 points in `S`, with replicates/CI) and record **χ**. Multi‑knob probes **SHALL** hold unspecified knobs fixed or pinned, and disclose invariants.
* **SLL‑3 (Parity).** Where `S` is declared, comparisons **SHALL** ensure **iso‑scale parity** and lawful **UNM/NormalizationMethod‑based mapping** across heterogeneous knobs (e.g., FLOPs↔tokens) **before** comparing outcomes; **FreshnessWindows/editions** must be equal/pinned per **G.9**. Record **seeds/replicates**, ComparatorSet, and policy‑ids in telemetry/SCR. 
* **SLL‑4 (Selection lens).** Within the **same Context and ScaleWindow**, if other heads (N/U/C) are tied, selectors **MAY** use illumination as a tie‑breaker, but it **SHALL NOT** change default dominance; illumination remains **report‑only telemetry** unless a CAL policy promotes it.
* **SLL‑5 (Knee test).** A **knee** is **claimed** only where a monotone rise is followed by a **statistically significant** slope drop across adjacent probe points within the ScaleWindow; thresholds (e.g., Δslope & CI level) are **policy‑defined** (E/E‑LOG) and must be cited. Absent such evidence, classify as **rising**.
* **SLL‑6 (Telemetry invariants).** Probes **SHALL** export seeds/replicates, edition pins, policy‑ids, and Resrc‑CAL units to **G.11**.
### Method — minimal SoTA probe recipe (notation‑agnostic; informative).

1) **Choose knobs** `S` that are plausibly monotone in the Context (compute/data/capacity/FoA).  
2) **Pick 3–5 probe points** per active knob (edge/mid/edge) under iso‑scale parity; use a **fractional factorial** if >2 knobs.  
3) **Run replicates** (≥ 3 preferred) and **bootstrap** 95% CI on the primary objective(s); log seeds.  
4) **Estimate local slopes** on a log‑log grid; apply **piecewise/segmented regression** or a **knee detector** (e.g., L‑curve/Kneedle) to support `χ`.  
5) **Record invariants** (pinned knobs, safety envelope) and publish **SLL.Card@Context**.  
6) **If χ changes** across the window, split the ScaleWindow and re‑classify per segment.
## Interfaces — minimal I/O (conceptual)

**G.9 Plan/Run Parity** consumes `S`/ScaleWindow to align budgets, **pin editions**, and perform **UNM/NormalizationMethod‑based mapping**; **G.11** carries **policy‑id**, **PathSliceId**, seeds/replicates, CI level, and edition pins per parity CC.
## Conformance Checklist (CC‑SLL)

1. `S` declared **or** `S = N/A` with rationale.
2. **Scale‑probe** performed; **χ** recorded with **replicates/CI**; invariants disclosed.
3. **iso‑scale parity** or **loss notes** + penalties **→ R only**; editions/seeds pinned; ComparatorSet cited.
4. If used as tie‑breaker, the selector cites **χ** and **lens id** in **E/E‑LOG** provenance.
5. Knee claims cite the **policy threshold** and CI level used.
## Anti‑patterns & remedies

Hidden budget mismatches; averaging ordinals across families; **illumination in dominance by default**; unpinned editions; slope claims without **replicates/CI**; training/inference phase mixing → **cure** with **G.9** parity (equal windows/editions; normalize‑then‑compare; return sets), phase‑label the claim, and record slope uncertainty per Scale‑Audit discipline.
## Archetypal grounding (post‑2015; informative)

* **LLM scaling.** Kaplan‑style & **Chinchilla‑optimal** regimes; **Mixture‑of‑Experts** and **retrieval‑augmented** families shift effective capacity with different inference budgets; prompt‑policies often transfer better than narrow pipelines.
* **RL/Planning.** Model‑based optimization & general agents vs hand‑tuned controllers; slopes reported wrt budget/FoA under safety envelopes.
* **QD/OEE.** MAP‑Elites, **CMA‑ME**, **DQD**, **QDax**; **POET/Enhanced‑POET** families: coverage/illumination as telemetry metrics; parity uses fixed grids/spaces and edition pins.
## Payload — exports

`SLL.Card@Context` (UTS row; editioned):
`⟨S{knobs, units, phase}, ScaleWindow, Scale‑Probe{points≥2, design=one‑liner, seeds, CI}, ElasticityClass χ, ParityNotes{iso‑scale?|loss, invariants}, BridgeIds?/Φ/Ψ, PolicyIds? (E/E‑LOG), PathSliceId?⟩`.

**UTS row template (conceptual; pencil‑ready).**
`SLL.Card@Context := S=(COMPUTE|DATA|CAPACITY|FOA; units=…; phase=TRAIN|INFER), ScaleWindow=[LOW…HIGH], Probe=(points=…, design=factorial|LHD, seeds=…, CI=…), χ=rising|knee|flat|declining, ParityNotes=(iso=true|false; invariants=…), Bridge/Φ/Ψ=(…), PolicyIds=(…), PathSliceId=(…)`.
## Relations

**Builds on:** C.16/17/18. **Coordinates with:** C.19 (lenses/policies), **G.5** (set‑returning selector), **G.9** (parity; **ParetoOnly** default; UNM/NormalizationMethod‑based mapping), **G.10** (shipping). 

> *Pedagogical cue.* **Say what you would scale, probe it twice, and use the slope‑class to steer.**
## C.18.1:End
