---
title: "Explore–Exploit Governor (E/E‑LOG)"
description: "Part C - Kernel Extension Specifications"
---

# Explore–Exploit Governor (E/E‑LOG)
> Pattern `C.19` · Stable · Calculus (C) · Normative
> Part C - Kernel Extension Specifications

> **Type:** Calculus (C)
> **Status:** Stable
> **Normativity:** Normative

**Plain-name.** Explore-exploit governor.

**Intent.** Govern exploration/exploitation policy over still-live candidate pools so frontier treatment, graduation, narrowing, and sunset posture stay explicit, auditable, and stated as one pool-policy result without taking over local choice, enactment, or publication burdens.

**Export posture.** No `Γ` operators are exported; policies parameterize calls in `C.18 NQD-CAL`.

**Depends on.** `C.18 NQD-CAL` (generators), `C.17 Creativity-CHR` (measurements), `Decsn-CAL` (objectives/constraints and scalarization lenses), `B.3` (trust adjustments), and `Compose-CAL` (set aggregation; advisory).

**Coordinates with.** `C.11` for local choice among already-available options, `C.24` for enactment planning after choice, `G.5` for selector-facing publication, `C.17`, and `G.9`.

- several candidate lines, family regions, or frontier segments remain live under one declared exploration/exploitation posture and the burden is now policy over that pool rather than one more local choice result
- the next result should say how the pool will be treated next: `widen`, `keep frontier`, `narrow to subset`, `sunset line`, or `reroute`
- the governing lens or policy posture must be explicit rather than inferred from vague exploration language

## Keywords

- explore-exploit
- pool policy
- frontier
- narrowing
- sunset
- EmitterPolicy.

## Relations

- `C.19` --outline_child--> [Bitter‑Lesson Preference (BLP)](/generated/patterns/C.19.1)
- `C.19` --explicit_reference--> [NQD‑CAL — Open‑Ended Search Calculus](/generated/patterns/C.18)
- `C.19` --explicit_reference--> [Creativity‑CHR — Characterising Generative Novelty & Value](/generated/patterns/C.17)
- `C.19` --explicit_reference--> [Trust & Assurance Calculus (F–G–R with Congruence)](/generated/patterns/B.3)
- `C.19` --explicit_reference--> [Decision Theory (Decsn‑CAL)](/generated/patterns/C.11)
- `C.19` --explicit_reference--> [Agentic Tool‑Use & Call‑Planning (C.Agent‑Tools‑CAL)](/generated/patterns/C.24)
- `C.19` --explicit_reference--> [Multi‑Method Dispatcher & MethodFamily Registry](/generated/patterns/G.5)
- `C.19` --explicit_reference--> [Parity / Benchmark Harness](/generated/patterns/G.9)
- `C.19` --explicit_reference--> [Lexical Authoring & Evolution Protocol (LEX-AUTH)](/generated/patterns/E.15)

## Content

## Use this when

- several candidate lines, family regions, or frontier segments remain live under one declared exploration/exploitation posture and the burden is now policy over that pool rather than one more local choice result
- the next result should say how the pool will be treated next: `widen`, `keep frontier`, `narrow to subset`, `sunset line`, or `reroute`
- the governing lens or policy posture must be explicit rather than inferred from vague exploration language
## What goes wrong if missed

- scalarized top-1 picks are mislabeled as "the frontier", so it becomes unclear whether the result names one lens-ranked winner or the lawful live set
- exploration continues without one named pool, one named governing lens, or one explicit next treatment
- local option choice, pool policy, enactment planning, and published shortlist semantics collapse into one blurred burden
## What this buys

- one explicit pool-governance surface for exploration, graduation, narrowing, and sunset posture
- one explicit link from lens or policy posture to the next pool-side treatment
- one repeatable way to preserve heterogeneity and frontier discipline without forcing illegal totalization
## First-minute questions

- Which still-live pool, frontier segment, or family region is actually under governance now?
- Which lens or policy posture is governing it?
- Is the next lawful treatment `widen`, `keep frontier`, `narrow to subset`, `sunset line`, or `reroute`?
- What event or threshold would justify changing that treatment next?
## First output

The first useful output is one explicit pool-policy result that names the live pool, the governing lens or policy posture, the current treatment (`widen`, `keep frontier`, `narrow to subset`, `sunset line`, or `reroute`), and the exact event that would justify changing that treatment next.

That result records how the pool will be treated next under the current exploration/exploitation posture; it does not replace one local `C.11` choice record, one `C.24` enactment plan, or one `G.5` published selector result.

If that first output still cannot be written honestly, the current pool-policy result is not finished `C.19` policy yet.
## Problem frame

The E/E governor provides named, versioned policies and lenses that steer NQD generation/selection under lawful dominance and provenance constraints.

When `C.11` has already made local choice among one fixed `OptionSet` explicit, `C.19` begins where the burden becomes policy over several still-live candidate lines, family regions, or frontier segments rather than one more local `ChoiceResult` record.

Immediate failure signs for this pattern:
- the current pool-policy result cannot name the still-live candidate pool it is governing
- the governing lens or policy posture is missing
- the next pool-side treatment exists only as one vague promise to continue exploration later

If the question is still which single option should survive now, reroute to `C.11`. If the next artifact must already be one enactment-facing plan, reroute to `C.24`. If the retained set must be published for downstream consumption, reroute to `G.5`.
## Problem

Ad‑hoc exploration mixes ordinal and interval folds, silently scalarises posets, and loses lens/policy provenance—undermining legality and reproducibility.
## Forces

• Trust gates vs. discovery — graduation requires backstop confidence while maintaining explore_share.
• Heterogeneity vs. focus — fairness quotas by family vs. depth on proven lines.
• Lens expressiveness vs. audit — scalarised choices must not be called 'the frontier' and MUST record lens ids.
## Solution

Define EmitterPolicy (class, params, ε, K, insertion/dedup) and selection lenses with a fixed pipeline (Eligibility → Dominance → Tie‑breakers); bind provenance (policy id, lens id) and guard promotions of Surprise/Illumination to dominance to explicit policy declarations.

**Agency clarification.** Decisions are taken by a **system in role**. **Contexts publish** measurement spaces and admissible policies as **semantic frames**; LOG profiles lenses and policies but does **not** enact choices.
**Depends on.** **C.18 NQD‑CAL** (generators), **C.17 Creativity‑CHR** (measurements), **Decsn‑CAL** (objectives/constraints, scalarization lenses), **B.3** (trust adjustments), **Compose‑CAL** (set aggregation; advisory).

**EmitterPolicy (named profile).** A context‑local, versioned policy with fields:
`{ name, class ∈ {UCB, Thompson, BO‑EI, GP‑UCB, PES, …}, params, explore_share∈[0,1], temperature τ≥0, rebalance_period, wild_bet_quota≥0, backstop_confidence (assurance level), epsilon_dominance ε, cell_capacity K, **insertion_policy**, **dedup_threshold** }`.
Policies are referenced as `U.EmitterPolicyRef` by NQD generator call (C.18) and are conceptual lenses, not staffing/budget instructions.

**Decision-theory bridge.** `C.11` owns theory-side choice among already-available options and the meaning of `ProbeBudget`, `ValueOfInformation`, and `ValueOfComputation`. `C.19` may consume such outputs only as criteria for pool policy, graduation, keep-frontier, or sunset posture; it does not re-own local choice doctrine.

**Defaults (if policy is unspecified):**  
• **Dominance:** `{Q components}` with `ConstraintFit=pass` as **eligibility gate**.  
• **Tie‑breakers:** `Novelty@context`, `ΔDiversity_P`, `Surprise`; `Illumination` (telemetry over Diversity_P: coverage/QD‑score) MAY be used as a tie‑breaker but is **not** in the dominance set.  
• **Archive:** `K=1`, `ε=0`, deduplication in `CharacteristicSpace`.  
• **Policy:** UCB‑class with moderate temperature; `explore_share ≈ 0.3–0.5`.  
• **Provenance (minimum):** record `DescriptorMapRef.edition`, `DistanceDefRef.edition`, `DHCMethodRef.edition`, `EmitterPolicyRef`, `InsertionPolicyRef`, `dedup_threshold?`, `TimeWindow`, `Seeds`.

**Scalarization lenses (policy‑level).** A lens `J_ℓ` declares: (a) hard eligibility conditions (e.g., ConstraintFit=pass), (b) soft aggregation (weights/curves), (c) trust policy (how assurance/CL discounts enter).  
**Conformance.** A Context MUST name the lens used to pick from a frontier; scalarized rankings MUST NOT be presented as “the frontier”; the **`lens id MUST be recorded in provenance of each selection`**.

**Promotion rules (policy).**  
- **Tie‑breaks.**  `Surprise` and `Illumination` MAY act as tie‑breakers; **promotion into the dominance set MUST be declared by lens or policy id** and captured in provenance.
- **Graduation.** Profiles graduate from Explore→Exploit when **backstop_confidence** (B.3 level) and eligibility conditions are met.  
- **Sunset/Pivot.** Profiles failing VOI/backstop thresholds are sunset or pivoted at `rebalance_period`.

**Explore/Exploit loop (per rebalance_period).**
1) Recompute frontier with trust discounts.  
2) Enforce `explore_share` (minimum attention on high‑Novelty, not‑yet‑proven profiles).  
3) Update generator `temperature τ` / emitter mix.  
4) Apply `backstop_confidence` to graduate; sunset stale probes.  
5) Satisfy `wild_bet_quota` by seeding fresh high‑Novelty candidates.
6) HET‑FIRST — apply group‑fairness quotas by domain‑family and/or DPP/Max‑min repulsion before exploit lenses; log quotas and sampler policy id.

**Named lenses (heuristics; policy‑level, not norms)**
The following **lens profiles** are **illustrative heuristics**. Contexts MAY reuse/modify them; they are **not** normative.
• **Frontier‑sweeper** — maintain attention on the full front; promote only when `backstop_confidence` holds.  
• **Barbell** — enforce `explore_share ≥ θ` with a `wild_bet_quota`; otherwise exploit top‑trust region.  
• **Spike‑first** — pick highest **Use‑Value** subject to `ConstraintFit=pass` and a small **Cost‑to‑Probe** cap.  
• **Safety‑first** — minimize **SafetyRisk** subject to `Use‑Value ≥ θ` and `ConstraintFit=pass`.  
• **Platform‑option** — maximize **Option‑Value** under probe cost bounds.  
• **Pilot‑then‑scale** — optimize **Use‑Value** on pilot scope with `BackstopConfidence ≥ L1`; widen `G` once **R** holds.  
• **Heterogeneity‑first (policy id).** Eligibility → Dominance → Tie‑breakers; Hard gate: FamilyCoverage ≥ k, MinInterFamilyDistance ≥ δ_family; Fairness quotas: ≤1 candidate per sub‑family at pre‑front sampling; DPP/Max‑min sampler allowed.
**Conformance (lens recording).** A decision that uses any lens **MUST** record its **lens id** alongside `EmitterPolicyRef`. (This restates and localizes C19-3.)

### Explicit pool-policy result

A finished `C.19` pass should publish one explicit pool-policy result rather than one atmospheric statement that exploration will continue somehow.

That result should state:

- the still-live pool, frontier, or family scope under governance now;
- the governing lens id or policy posture;
- the next treatment, chosen from `widen`, `keep frontier`, `narrow to subset`, `sunset line`, or `reroute`;
- the event or threshold that would justify changing that treatment next.

A compact result may therefore state, for example:

- `poolScope = frontier_F`
- `governingLens = barbell_policy_v2`
- `nextTreatment = keep_frontier`
- `changeTrigger = backstop_confidence reaches L1 for one retained line`

or, for one narrower family region:

- `poolScope = family_region_beta`
- `governingLens = heterogeneity_first`
- `nextTreatment = narrow_to_subset`
- `changeTrigger = quota satisfaction plus one explicit novelty floor`

Those fields define the result: governed pool, governing lens, next treatment, and change trigger.
### Closure rule over the live pool

A `C.19` pass may close only when one explicit pool and one explicit next treatment are both visible.

- Close as `widen` when the current frontier is too narrow for the declared exploration posture or when the evidence basis is too thin to justify current narrowing.
- Close as `keep frontier` when several lines must remain live under the current lens and no narrower lawful subset is yet justified.
- Close as `narrow to subset` when one declared lens now justifies retaining one smaller internal live set without pretending that one scalar winner has already been chosen.
- Close as `sunset line` when one line or family region no longer clears the current lens, quota, or backstop requirements.
- Close as `reroute` when the burden has stopped being pool policy and has become local choice, enactment planning, or selector-facing publication.

One internal retained subset here is still one pool-treatment result. It is not yet one public `Shortlist`, `RankedShortlist`, or `ShortlistId`-bearing selector artifact. If the retained subset must be published for downstream comparison, handoff, or registry-facing consumption, `C.19` closes only by rerouting to `G.5`.

If the result still cannot say which pool remains live, which lens governs it, and which event would justify changing the treatment, it is still unfinished pool policy rather than one finished `C.19` result.
### Minimal pool-policy record

The smallest useful `C.19` record usually states:

- `livePool = ...`
- `governingLens = ...`
- `currentTreatment = widen | keep frontier | narrow to subset | sunset line | reroute`
- `changeTrigger = ...`
- `whyNotLocalChoice = ...` when the result might otherwise be mistaken for `C.11`

A lawful short record may therefore read:

```text
livePool = frontier_F
lens = barbell_policy_v2
currentTreatment = keep_frontier
changeTrigger = backstop_confidence reaches L1 for one retained line
whyNotLocalChoice = several family regions remain live
```

When `currentTreatment = narrow_to_subset`, `livePool` still names one internal retained subset or one live pool subset. It does not yet mint one public `Shortlist`, one public `RankedShortlist`, or one `ShortlistId`. If selector-facing publication is now required, the lawful `C.19` record closes as `reroute` to `G.5` rather than silently renaming the internal subset as though publication had already happened.

If the record does not already state which pool remains live, what governs it, and what would change that posture next, it is still one unfinished `C.19` result.
### Worked closure slice

Three short contrasts keep the closure law practical.

**Several family regions remain live.**
When the point is to keep several lines active under one declared lens, `C.19` should not pretend it has already made one local choice:

```text
livePool = frontier_F
lens = frontier_sweeper_v3
currentTreatment = keep_frontier
changeTrigger = one retained line reaches backstop_confidence L1
whyNotLocalChoice = three family regions remain live
```

**One region should now be sunset.**
When one region no longer clears the active novelty floor or backstop, `C.19` should say so directly rather than leaving that retirement implicit:

```text
livePool = family_region_beta
lens = barbell_policy_v2
currentTreatment = sunset_line
changeTrigger = reopen only if new evidence or quota deficit reactivates the region
whyNotLocalChoice = other regions still remain live under the same pool policy
```

**The pool has already been narrowed and the next burden is publication.**
When one internal retained subset is already explicit and the next burden is to publish it for downstream use, `C.19` should close by rerouting instead of naming that subset as though it were already one public shortlist artifact:

```text
livePool = retained_subset_{option_B, option_C}
lens = pool_policy_completed
currentTreatment = reroute
changeTrigger = G5 publishes one selector-facing Shortlist or RankedShortlist now
whyNotLocalChoice = pool governance is already complete
```
## System grounding

A product-search or architecture-search team often keeps several family regions alive even after one tempting line starts to look best locally. A lawful `C.19` result might therefore keep the frontier live under `frontier_sweeper_v3` until one retained line actually clears the declared `backstop_confidence`, instead of collapsing the whole pool into one premature winner.

### Episteme grounding

A SoTA pack often compares traditions that stay non-dominated for different reasons: one clears current evidence quality, one keeps broader transfer value, one preserves family coverage. The lawful `C.19` result is then often `keep frontier` or `narrow to subset`, not one fake scalar champion.
### Collective and contextual grounding

A regional or stakeholder-diverse portfolio may have to sunset one line while keeping others alive to preserve coverage, fairness quotas, or contextual fit. The practical point is that `C.19` owns that pool-treatment decision only while the burden is still about the live set; once the result must become one local choice, one enactment plan, or one published selected set, reroute immediately.
## Bias-Annotation

No global scalarisation of partial orders; ordinal scales excluded from arithmetic; all selections record lens id and policy id; notation/tool neutrality.
## Conformance Checklist

- **C19-1** Each NQD generator call (C.18) **SHALL** cite `U.EmitterPolicyRef` (policy id + params) **and the active `InsertionPolicyRef`/`dedup_threshold` when not inherited**.
- **C19-2** The characteristic set & signs used for dominance **MUST** be declared; eligibility conditions applied first. *(References to C.18 generator operators are descriptive only; LOG exports no Γ.)*
- **C19-3** If a lens is used, its id MUST be recorded; do not label scalarized top-1 as "frontier".
- **C19-4** Promotion of Surprise/Illumination into dominance MUST be explicit in policy.
- **C19-5** USM/RSG gate applies: policy actions SHALL operate within the Context's scope and enactable RSG states.
- **C19-6** Each selection lens **MUST** implement and document the pipeline` Eligibility (ConstraintFit=pass) → Dominance (declared set) → Tie-breakers (declared)`. Any **promotion** of Surprise/Illumination into the dominance set **MUST** be named by lens/policy id and recorded in provenance.
- **C19-7 (LEX-AUTH trigger).** Any change to `EmitterPolicy` defaults that affects domain-family quotas/samplers (HET-FIRST), or any change to `DescriptorMap` family coordinates, `DistanceDef`, or the `δ_family` threshold MUST be authored via **E.15 LEX-AUTH** with a published **LAT**; the DRR SHALL carry the LAT pointer (see **CC-DRR.6**). Record policy/card ids in SCR.
- **C19-8**  When the Heterogeneity-first lens is used, provenance MUST include: (i) the family-quota vector (including the default triad quota k), (ii) the subFamilyDef id (from F1-Card) if sub-family quotas apply, (iii) the sampler class, seed, and policy id.
- **C19-9** When `C.19` returns one pool-policy result, that result **MUST** identify the still-live pool or family scope, the governing lens or policy id, and the next treatment (`widen`, `keep frontier`, `narrow to subset`, `sunset line`, or `reroute`).
- **C19-10** If the burden is still local option choice, already one enactment-facing plan, or already one selector-facing publication result, `C.19` **MUST** reroute rather than restate `C.11`, `C.24`, or `G.5`.
## Common Anti-Patterns and How to Avoid Them

- **Treating one scalarized top-1 as the frontier.** Avoid by naming the governing lens and keeping the live frontier distinct from any lens-ranked pick.
- **Running exploration without one explicit next treatment.** Avoid by ending each pass with one explicit pool-side action: `widen`, `keep frontier`, `narrow to subset`, `sunset line`, or `reroute`.
- **Letting `Surprise` or `Illumination` quietly become dominance criteria.** Avoid by promoting them only through one declared lens or policy id and recording that promotion in provenance.
- **Re-owning neighboring burdens.** Avoid by rerouting fixed-option choice to `C.11`, enactment-facing call planning to `C.24`, and selector-facing publication to `G.5`.
## Consequences

- the result states whether the pool is being widened, kept live, narrowed, sunset, or rerouted
- heterogeneity can remain lawful without pretending every frontier is one scalar winner
- the cost is stricter provenance and the need to name lenses, policies, and change triggers explicitly
## Rationale

`C.19` exists because pool governance is neither local choice nor execution. Once several candidate lines remain live, the key burden is no longer which single option should survive now; it is how the pool should be governed next under one explicit lens or policy. That burden needs its own explicit pool-policy result, otherwise frontier drift, silent scalarization, and policy amnesia return immediately.

- Post-2015 bandit and Bayesian-optimization practice treats explore/exploit posture as an explicit policy object, not as one hidden side effect of whichever candidate looked best first. The practical implication here is to emit one explicit pool treatment plus one change trigger, not one atmospheric frontier story.
- Contemporary frontier and quality-diversity practice also distinguishes the live frontier from any scalarized pick taken under one declared lens. The practical safeguard is to keep `keep frontier`, `narrow to subset`, and `sunset line` as visible alternatives rather than silently totalizing the pool.
- Modern portfolio and fairness-preserving lines keep coverage or heterogeneity pressures explicit until one declared reason justifies retirement or reroute. The practical implication is simple: sunset or reroute only when the current pool-policy result can already say why the pool no longer belongs to `C.19`.
## Relations

Builds on: `Decsn-CAL`, `B.3`. Coordinates with: `C.11` for local choice among already-available options, `C.18` for candidate generation and open-ended search, `C.24` for post-choice enactment planning, `G.5` for selector-facing publication, `C.17`, and `G.9`.
## C.19:End
