---
title: "Bitter‑Lesson Preference (BLP)"
description: "Part C - Kernel Extension Specifications"
---

# Bitter‑Lesson Preference (BLP)
> Pattern `C.19.1` · Stable
> Part C - Kernel Extension Specifications

**One‑screen purpose (manager‑first).**
Establish, at **governing policy** level, the empirical **Bitter Lesson**: **prefer general, scale‑amenable methods**—those that improve with **more data/compute/capacity and greater freedom‑of‑action**—over narrow hand‑crafted heuristics **when safety and legality are equal**. Exceptions require a transparent **Scale‑Audit** under the parity harness. 

**Builds on.** C.19 (E/E‑LOG), C.24 (Agent‑Tools‑CAL; **ATC‑2**), B.3 (Assurance), E.3 (Precedence), E.5 (Guard‑Rails).
**Coordinates with.** G.5 (Selector), G.8 (SoS‑LOG Bundles), G.9 (Parity), G.11 (Refresh‑Telemetry), A.0 (On‑Ramp).
**Keywords.** general‑method preference; scale‑amenability; **BLP‑waiver**; iso‑scale parity; **Scale‑Audit**; slope vector; **α/δ tolerances**.

Bespoke heuristics can win locally but **do not scale**; general methods (search/learning/planning) **improve with scale** and transfer across bridges/planes. Without a standing policy, selectors drift toward hand‑craft and single‑winner leaderboards, violating parity and lawful orders.

## Keywords

- Bitter Lesson
- scale-audit
- BLP-waiver
- α/δ tolerances
- task-family specialization.

## Relations

- `C.19.1` --constrained_by--> [Four Guard-Rails of FPF](/generated/patterns/E.5)
- `C.19.1` --constrained_by--> [Principle Taxonomy & Precedence Model](/generated/patterns/E.3)
- `C.19.1` --outline_parent--> [Explore–Exploit Governor (E/E‑LOG)](/generated/patterns/C.19)
- `C.19.1` --explicit_reference--> [Explore–Exploit Governor (E/E‑LOG)](/generated/patterns/C.19)
- `C.19.1` --explicit_reference--> [Agentic Tool‑Use & Call‑Planning (C.Agent‑Tools‑CAL)](/generated/patterns/C.24)
- `C.19.1` --explicit_reference--> [Trust & Assurance Calculus (F–G–R with Congruence)](/generated/patterns/B.3)
- `C.19.1` --explicit_reference--> [Principle Taxonomy & Precedence Model](/generated/patterns/E.3)
- `C.19.1` --explicit_reference--> [Four Guard-Rails of FPF](/generated/patterns/E.5)
- `C.19.1` --explicit_reference--> [Multi‑Method Dispatcher & MethodFamily Registry](/generated/patterns/G.5)
- `C.19.1` --explicit_reference--> [SoS-LOG Bundles & Maturity Ladders](/generated/patterns/G.8)
- `C.19.1` --explicit_reference--> [Parity / Benchmark Harness](/generated/patterns/G.9)
- `C.19.1` --explicit_reference--> [Telemetry-Driven Refresh & Decay Orchestrator](/generated/patterns/G.11)
- `C.19.1` --explicit_reference--> [Onboarding Glossary (NQD & E/E‑LOG)](/generated/patterns/A.0)
- `C.19.1` --explicit_reference--> [Resrc‑CAL](/generated/patterns/C.5)
- `C.19.1` --explicit_reference--> [NQD‑CAL — Open‑Ended Search Calculus](/generated/patterns/C.18)
- `C.19.1` --explicit_reference--> [Concept‑Set Table Construction](/generated/patterns/F.7)
- `C.19.1` --explicit_reference--> [Alignment & Bridge across Contexts](/generated/patterns/F.9)

## Content

## Problem frame

Bespoke heuristics can win locally but **do not scale**; general methods (search/learning/planning) **improve with scale** and transfer across bridges/planes. Without a standing policy, selectors drift toward hand‑craft and single‑winner leaderboards, violating parity and lawful orders.
## Policy clauses (normative; synchronized with Core)

**BLP‑1 — Scale‑Audit requirement.**
Any DRR that selects a **narrower/hand‑engineered** method over a **general/scalable** alternative **MUST** include a **Scale‑Audit**:
(a) **Parity harness**: equal **FreshnessWindows**, a common **ComparatorSet**, **replicates/seeds**, **portfolio‑first** evaluation; **Dominance = ParetoOnly** unless a CAL policy says otherwise (policy‑id cited).  
(b) **Budget sweeps**: vary **compute**, **data**, and **FoA** within a fixed safety envelope; **pin** any unsweepable knob and record the invariant. 
(c) **Slopes & uncertainty**: report ∂quality/∂compute, ∂quality/∂data, and (where applicable) ∂coverage/∂FoA, with **CI/error bars** and **edition/policy pins** in telemetry. Use **bootstrapped CIs** or repeated‑seed estimates; disclose heteroscedasticity handling.
(d) **Resources**: publish **Resrc‑CAL** accounts (time/energy/FLOPs) and assurance deltas (B.3). 
(e) **Objective vector**: list **Q/Risk/Cost** and—**only if policy promotes them**—illumination/coverage telemetry metrics. 
(f) **DoE recipe**: for ≥2 active knobs, apply a **fractional factorial** or **Latin‑hypercube** with ≥ 3 levels per knob to avoid aliasing; justify any lower design.  
(g) **Knee & regret tests**: if claiming a heuristic wins, show either (i) a **knee** inside the audited window for the general method (per SLL‑5 policy thresholds) or (ii) **budget‑constrained regret** over the sweep where the heuristic dominates within CI.

**BLP‑2 — Preference rule (with α/δ tolerances).**
Among admissible options with comparable assurance (within **δ**) and budget (within **α**), prefer the method whose **slope vector** **Pareto‑dominates** over the audited range; if no dominance within error bounds, prefer the **more general** method; else resolve by the **E/E‑LOG** tie‑breakers declared in policy. (Agentic contexts implement this as **ATC‑2**; **BLP_delta_α/δ** live in **ATC.Policy**.)  

> **BLP‑2.1 — Valid waiver grounds (override transparency).**
> Overrides of BLP‑2 are allowed **only** when:
> • **Deontic override:** regulation/ethics make the general method inapplicable (E.5/E.3).
> • **Scale‑probe overturn:** under **iso‑scale parity** in the declared **ScaleWindow**, the heuristic **sustainedly outperforms** with uncertainty accounted for.
> • **Complementary bias:** the heuristic is an **inductive bias** that **improves** the general method **without blocking scale** (graceful degradation as `S` grows).
> All overrides record a **BLP‑waiver** with rationale, owner, and expiry/review in the DRR. 

**BLP‑2.2 — Task-family specialization compatibility.**
A bounded task-family specialization remains **BLP-compatible** when it is produced by a **general, scale-amenable substrate**, when it acts as a complementary bias that does not block scale, or when it survives the ordinary **BLP** comparison discipline on the same declared task family and work target. `BLP` therefore governs whether the narrower current method was generated, compared, audited, waived, and overridden lawfully; it does **not** require the final local behavior at every moment to look maximally generic.

Low-human-overlap or newly discovered approaches remain admissible when the task family, budget guard rails, and evidence basis are explicit by value and the same `Scale‑Audit`, `α/δ`, waiver, and override discipline is preserved.
**BLP‑3 — Minimal‑prescription default.**
Author **rules‑as‑prohibitions** (negative constraints) instead of stepwise scripts; encode limits in **Φ policy tables** (and **Φ_plane**) and allow agents to **sequence autonomously** within those constraints. Scripts are permissible only when mandated by safety/regulation or with compelling DRR evidence reviewed under E.3/E.5. 

**BLP‑4 — Heuristic‑Debt register (mandatory).**
Any admitted heuristic is recorded as **Heuristic Debt** with scope, owner, expiry/review window, and a de‑hardening plan; track in **CalibrationLedger/BCT** and cite in SCR. 

**BLP‑5 — Continuous‑learning posture.**
Where product policy allows, enable **feedback‑driven adaptation** (preference learning, critique loops) within Guard‑Rails and privacy controls; disabling adaptation requires DRR justification and review date. 

**BLP‑6 — Precedence & safeguards.**
BLP is constitutional (instantiates **P‑10/P‑11/P‑7/P‑1**), but **does not supersede Guard‑Rails (E.5) or precedence rulings (E.3)**. Where **NQD/E/E‑LOG** promotes illumination into dominance, **BLP adopts that lens** for the audited window.  

**BLP‑7 — Publication discipline.**
Scale‑Audit artefacts **SHALL** be exported to **G.11** with edition pins, CI level, α/δ, ComparatorSet, and **BLP.Policy@Context** reference so downstream selectors can reuse evidence without re‑running audits.
## Conformance Checklist (CC‑BLP)

1. **α/δ tolerances** declared in DRR or via policy profile (and CI level stated).
2. DRR includes a **Scale‑Audit** (BLP‑1a–g) with slopes, **CI**, edition/policy pins, and Resrc‑CAL.
3. Selection cites **BLP‑2** and precedence checks.
4. Any heuristic is logged as **Heuristic‑Debt** with expiry and de‑hardening plan.
5. Authoring defaults to **rules‑as‑prohibitions**; deviations are DRR‑justified and safety‑anchored.
6. **Resrc‑CAL** accounts and assurance deltas reported.
7. **Replicate counts/seeds** and **confidence intervals** recorded for slope estimates; heteroscedasticity handling disclosed.
8. Audit artefacts exported to **G.11** with **BLP.Policy@Context** id.

9. When a narrower specialist method is selected or returned for one declared task family, the record names the task family/work target and the Scale‑Audit, waiver, or override ground that keeps the choice BLP‑compatible.
## Anti‑patterns & remedies

Single‑winner leaderboards; hidden budget mixing; promoting illumination into dominance **without policy**; missing edition pins; heuristics without expiry; slope estimates without CI or with aliased designs → **remedy** with G.9 parity + edition pins, explicit **policy‑ids**, DRR publication, **Heuristic‑Debt** entries, and BLP‑1f DoE discipline.
## Archetypal grounding (post‑2015; informative)

* **LLMs:** prompt‑programs, **retrieval‑augmented** and **MoE** policies vs narrow task‑specific pipelines; portfolio‑first selection across editions/budgets.
* **RL & planning:** model‑based optimization/general agents vs hand‑coded controllers (subject to α/δ and safety).
* **Preference learning:** **RLHF ↔ DPO** families.
* **QD/OEE:** MAP‑Elites/**CMA‑ME**/**DQD**/**QDax**; **POET/Enhanced‑POET**; illumination remains **report‑only telemetry** unless policy promotes it.
## Payload — exports

`BLP.Policy@Context` (UTS row; editioned):
`⟨PreferenceDefault, α/δ tolerances + CI, Scale‑Audit recipe (G.9 link; DoE), WaiverRegister{reason, owner, expiry}, E/E‑LOG lens policy‑ids, ATC.PolicyRef? (agentic), G.11.TelemetryPins⟩`.

**UTS row template (conceptual; pencil‑ready).**
`BLP.Policy@Context := PreferenceDefault=(prefer‑general|neutral), α/δ=(α=…, δ=…, CI=…), Scale‑Audit=(parity=G.9; sweep=S={…}; DoE=factorial|LHD; kneeTest=policy‑τ), WaiverRegister=[{reason=…, owner=…, expiry=…}], E/E‑LOG=(policyIds=…), ATC.PolicyRef=(…), TelemetryPins=(edition=…, seeds=…, comparatorSet=…)`.
## Relations

**Depends on:** **G.5/G.9** (selector/parity), **G.11** (refresh telemetry), **C.5** (Resrc‑CAL), **C.18** (NQD‑CAL), **C.19** (E/E‑LOG), **F.7/F.9** (Bridges, CL/Φ/Ψ). **Constrained by:** **E.5** Guard‑Rails and **E.3** precedence. 

> *Memory hook.* **Prefer what scales; explain when you don’t.**
## C.19.1:End
