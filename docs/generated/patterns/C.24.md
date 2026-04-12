---
title: "Agentic Tool‑Use & Call‑Planning (C.Agent‑Tools‑CAL)"
description: "Part C - Kernel Extension Specifications"
---

# Agentic Tool‑Use & Call‑Planning (C.Agent‑Tools‑CAL)
> Pattern `C.24` · Stable · Calculus (C) · Normative
> Part C - Kernel Extension Specifications

> **Type:** Calculus (C)
> **Status:** Stable
> **Normativity:** Normative

**Plain-name.** Agentic tool-use and call planning.

**Intent.** Govern admissible tool-call planning and replanning under explicit budget, assurance, and policy while keeping upstream choice, pool policy, planning, and execution distinct.

**Instantiates / Refines Pillars.** `E.2` `P-3` Scalable Formality, `P-7` Pragmatic Utility, `P-10` Open-Ended Evolution, `P-11` SoTA Alignment, and the Bitter-Lesson Preference: prefer scalable, general methods that benefit from more data or compute over fragile hand-tuned heuristics when assurance and cost stay comparable.

**Depends on.** A-kernel (`A.1–A.15`) for holonic basics and Role-Method-Work separation; `B.3` Trust & Assurance (`F–G–R` with CL penalties); `E.3/E.5` (precedence and Guard-Rails); `C.5` `Resrc-CAL`; `C.18` `NQD-CAL` (candidate generation and portfolio); `C.19` `E/E-LOG` (explore-exploit policies); optional `Compose-CAL` and `KD-CAL` where available.

**Coordinates with.** `U.WorkPlan` and `U.PromiseContent` bindings (acceptance gates), Working-Model publication discipline per `B.3`, and Evidence/Provenance (`G.6`).

- one concrete choice posture already exists and the next task is now how to plan, gate, sequence, and replan tool calls lawfully
- the next lawful artifact should be one enactment-facing `CallPlan` or one `CheckpointReturn`, not one more local choice result or pool-policy result
- budget, assurance, and stop conditions must be visible before calls are burned

## Keywords

- agential tool use
- call planning
- call route
- checkpoint return
- enactment budget
- replanning.

## Relations

- `C.24` --explicit_reference--> [Holonic Foundation: Entity → Holon](/generated/patterns/A.1)
- `C.24` --explicit_reference--> [Role–Method–Work Alignment (Contextual Enactment)](/generated/patterns/A.15)
- `C.24` --explicit_reference--> [Trust & Assurance Calculus (F–G–R with Congruence)](/generated/patterns/B.3)
- `C.24` --explicit_reference--> [Principle Taxonomy & Precedence Model](/generated/patterns/E.3)
- `C.24` --explicit_reference--> [Four Guard-Rails of FPF](/generated/patterns/E.5)
- `C.24` --explicit_reference--> [Resrc‑CAL](/generated/patterns/C.5)
- `C.24` --explicit_reference--> [NQD‑CAL — Open‑Ended Search Calculus](/generated/patterns/C.18)
- `C.24` --explicit_reference--> [Explore–Exploit Governor (E/E‑LOG)](/generated/patterns/C.19)
- `C.24` --explicit_reference--> [Evidence Graph & Provenance Ledger](/generated/patterns/G.6)
- `C.24` --explicit_reference--> [Decision Theory (Decsn‑CAL)](/generated/patterns/C.11)
- `C.24` --explicit_reference--> [Multi‑Method Dispatcher & MethodFamily Registry](/generated/patterns/G.5)
- `C.24` --explicit_reference--> [RoC‑Autonomy Budget & Enforcement](/generated/patterns/E.16)
- `C.24` --explicit_reference--> [The Eleven Pillars](/generated/patterns/E.2)

## Content

## Use this when

- one concrete choice posture already exists and the next task is now how to plan, gate, sequence, and replan tool calls lawfully
- the next lawful artifact should be one enactment-facing `CallPlan` or one `CheckpointReturn`, not one more local choice result or pool-policy result
- budget, assurance, and stop conditions must be visible before calls are burned
## What goes wrong if missed

- calls get scheduled by ad-hoc heuristics, so the plan cannot say which budget is being burned or what event should stop or replan execution
- planning quietly collapses into execution, or execution quietly inherits unresolved upstream choice and pool-policy burdens
- a successful probe is mistaken for committed rollout even though the commit trigger was never made explicit
## What this buys

- one tool-agnostic planning surface for admissible calls, budgets, stop conditions, and replan triggers
- one explicit enactment surface with objective, budget, stop conditions, and next move
- one replayable call graph and assurance surface instead of one opaque chain of tool invocations
## First-minute questions

- Has one choice posture already been fixed strongly enough that planning may begin now?
- Which budget is being burned now: enactment budget, tool-call budget, or still one upstream probe budget?
- What event stops or replans the route?
- Is the next lawful artifact one `CallPlan`, one `CheckpointReturn`, or one reroute?
## First output

The first useful output is either one enactment-facing `CallPlan` with the current objective, cited route descriptions, the planned budget envelope, the stop or replan condition, and the next move stated explicitly in one place, or one bounded `CheckpointReturn` with the current objective or task family, the burned and residual actual budget, the commit trigger, and the recommended next action stated explicitly in one place.

If that first output still cannot be written honestly, the current planning result is not finished `C.24` planning yet.
## Problem frame

Modern systems in agential roles increasingly rely on tool-call planning: selecting admissible tool-service routes, arranging intended call work, and replanning under uncertainty. Without a calculus:

* calls are scheduled by **ad-hoc heuristics**,
* **budgets** (compute, cost, wall-time) are implicit,
* **assurance** and **policy provenance** are lost, and
* systems in agential roles either over-constrain themselves with brittle scripts or wander without guard-rails.

This CAL provides the **conceptual API for thought** that lets any implementation (LLM-based, search-based, code-based, robotic) plan calls **lawfully**, **auditably**, and **scalably**. (Role-Method-Work alignment; didactic primacy.)

Immediate failure signs for this pattern:

* the current planning result cannot say whether one choice posture already exists,
* the current text cannot distinguish route description, call plan, and executed call work,
* the budget being burned is still only probing-before-choice budget rather than enactment or tool-call budget, or
* the next lawful artifact is still undefined as one enactment-facing plan, one `CheckpointReturn`, or one reroute.

If the real burden is still which fixed option should survive now, reroute to `C.11`. If it is still pool policy over several still-live candidate lines, reroute to `C.19`. If it is already public selected-set publication, reroute to `G.5`.
## Problem

We need a **tool-agnostic** way to (i) identify **admissible route descriptions**, (ii) compose one **call work plan** that cites them, (iii) allocate an **explore/exploit** share, (iv) enforce **budget & harm** gates, and (v) **replan** on signals—**without** baking domain-specific heuristics into the core and **without** collapsing `U.MethodDescription`, `U.WorkPlan`, and `U.Work` into one object.
## Forces

| Force                                    | Tension                                                                                                                 |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **General methods vs. hand-craft**       | Scalable, model-centric search ↔ short-term wins of bespoke scripts (guarded by **Bitter-Lesson Preference**).        |
| **Assurance vs. Autonomy**               | F-G-R gates & CL penalties ↔ system latitude to sequence calls and learn online.                                       |
| **Exploration vs. Delivery**             | Exploration share for illumination ↔ delivery SLAs and cost ceilings (E/E-LOG policy).                                |
| **Route vs. plan vs. execution**         | `U.MethodDescription` ↔ `U.WorkPlan` ↔ `U.Work` ↔ service promises (`U.PromiseContent`).                              |
## Solution — Signature & Realization

**Types (aliases).**
*`ATC.CallRouteDescription`* ≡ `U.MethodDescription` with `accessSpec` for one tool service or callable route;
*`ATC.CallPlan`* ≡ `U.WorkPlan` specialised for intended tool-call work; it cites one or more `ATC.CallRouteDescription` editions plus planned order, budget ceilings, stop or replan triggers, and next move;
*`ATC.CallGraph`* ≡ Evidence/Provenance graph over a `U.Work` ledger;
*`ATC.Policy`* references `U.EmitterPolicyRef` (E/E-LOG) and local call gates **including BLP tolerances (alpha, delta)**.

**Roles.**
A **System in AgentialRole** prepares or revises one **CallPlan** that cites one or more **CallRouteDescription** editions. Upon enactment, a **Performer** executes **Work** (calls), and **Observers** record **Observations** with acceptance checks. Route descriptions stay design-time; the call plan stays schedule-of-intent; actual call work stays run-time. (A.15 strict distinction.)

**Operators (Gamma_agential; CAL, conceptual):**

1. `Gamma_agential.eligible(tool, TaskSignature, K_ctx) -> {true|false, notes}`
   *Eligibility gate* based on capability fit, policy allow-list or deny-list, and context K (including safety constraints).

2. `Gamma_agential.enumerate(TaskSignature, K_ctx) -> CandidateSet<ATC.CallRouteDescription>`
   Returns admissible callable route descriptions. It **MAY** delegate to **NQD-CAL** for heterogeneous route families and **MUST** apply the current **E/E-LOG lens** (objectives & telemetry) to tag candidates.

3. `Gamma_agential.plan(Objective, CandidateSet, Budget, ATC.Policy) -> ATC.CallPlan`
   Produces one **call plan** that cites the selected route descriptions, declares one planned budget envelope (compute, cost, time, risk), one intended call order, and one stop or replan policy. Internal route logic remains in the cited method descriptions; the plan is a `U.WorkPlan` that cites method descriptions, not a method description and not yet work.

4. `Gamma_agential.execute(ATC.CallPlan) -> {ATC.CallGraph, Observations}`
   Executes with **hard gates** (budget, risk, constraint-fit) and logs provenance suitable for B.3 assurance reporting (design/run separated).

5. `Gamma_agential.replan(Signals, ATC.CallPlan, BudgetPrime) -> ATC.CallPlanPrime`
   Triggered by sentinel breaches, assurance drops, or policy events; preserves editioned policy, cited route descriptions, and context.

6. `Gamma_agential.score(Route or PlanAlternative) -> <ValueProxies, Cost, Risk, FGR_floor>`
   Computes selection signals **without** illegal scalarisation across mixed scales; **uses Pareto comparison under the C.19 E/E-LOG lens** and defers final dominance to declared policies.

### Bounded scout/probe cycle for unfamiliar task families

When the choice posture is already fixed enough that enactment planning is lawful, but the route across heterogeneous or unfamiliar callable approaches is still uncertain, the system may spend a bounded scout/probe budget before committed rollout and return one checkpoint package that compares the tested routes.

If additional probing could still change which option survives the current `OptionSet`, the budget is still `C.11`-side epistemic budget and the burden reroutes upstream. If choice posture is already fixed and the uncertainty is only about route or rollout shape, the budget is now enactment budget and `C.24` owns the checkpoint.

That `CheckpointReturn` should state the declared utility target and current `TaskFamily`, the route descriptions or candidate approaches tested, the evidence on each route, the burned and residual actual budget, the recommended next action, and the exact commit trigger that would justify leaving probe state.

A successful probe does not by itself authorize a larger burn or a committed rollout. `C.24` owns the `CheckpointReturn` record and call-plan semantics for this probe loop; `A.15` owns the design/run split and `E.16` owns the budget partition plus guard and ledger enforcement. Low-human-overlap approaches remain admissible only while they stay tied to the declared utility target, budget guard rails, and evidence basis explicitly.

**Bridge to neighboring owners.** `ProbeBudget` belongs to `C.11` while it means epistemic budget for further probing before choice. `C.24` owns budgets once they are enactment, tool-call, or rollout budgets. If the question is still which option survives now, reroute to `C.11`; if it is now pool policy over several still-live candidate lines, reroute to `C.19`; if it is selector-facing publication of the selected result, reroute to `G.5`.

**Explicit enactment result.** A conformant `C.24` pass should therefore leave either one enactment-facing `CallPlan` that states the current objective, the cited route descriptions or planned call order, the planned budget envelope, the stop or replan condition, and the next move, or one `CheckpointReturn` that states the current objective or task family, the burned and residual actual budget, the evidence basis, the commit trigger, and the recommended next action.

**Unfinished-state rule.** A `C.24` result remains unfinished when it cannot say whether execution should continue now, pause at one checkpoint, or reroute, when it confuses route description with plan or plan with executed work, or when it does not state which budget is planned versus already burned and what event would stop or replan the current route.

**Normative Laws (ATC-Laws).**

* **ATC-1 (Model-the-Call, not the App).** A tool call is one **Work** instance that enacts a referenced **MethodDescription** promised by a **Service**; plans schedule intended calls and cite route descriptions but are neither the route descriptions themselves nor the calls. (A.15.)
* **ATC-2 (Bitter-Lesson Preference).** When two admissible choices are within **delta (assurance)** and **alpha (budget)**, **prefer the more general, scale-benefiting method** whose **slope vector Pareto-dominates** under the declared E/E-LOG objectives; any override **MUST** record a **BLP-waiver** with expiry. (E.2; precedence governed by E.3.)
* **ATC-3 (Budget & Harm Gates).** Plans **SHALL** declare ceilings on compute, cost, wall-time, and risk; execution **MUST** abort or replan on breach. Actual burned or residual budget belongs in `CheckpointReturn`, `CallGraph`, or other work-side reporting, not inside the plan surface.
* **ATC-4 (Explore-Share Discipline).** Plans **MUST** declare `explore_share`; defaults **inherit from E/E-LOG profiles**. **Informative defaults**: `0` for safety-critical or deterministic tasks; `approx 0.2-0.4` for ambiguous tasks with heterogeneous tool families. Promotion of illumination telemetry into dominance **requires explicit policy**.
* **ATC-5 (Provenance & Replay).** Every call **MUST** emit a **CallGraph** with: Service id, cited MethodDescription edition, inputs/outputs (redacted per privacy), `CallPlan` ref, **EmitterPolicyRef**, and budget deltas. (NQD/E/E provenance fields apply when used.)
* **ATC-6 (Assurance-First Decisions).** Selection **MUST** respect B.3: WLNK minima on F/R (weakest-link floors), CL penalties on integration, and **no** chimera scores across design/run. Publish **<F,G,R>** for the typed claim `this plan is admissible under K,S`.
* **ATC-7 (Notation/Vendor Independence).** Core pattern text **MUST NOT** encode vendor-specific tokens; bindings occur in Context via Bridges/Profiles. (Lexical guard-rails.)
### Policy profile and BLP precedence

**ATC-Policy fields (conceptual).**
`{ backstop_confidence, explore_share, risk_bound, cost_ceiling, time_ceiling, tie_breakers, novelty_quota?, wild_bet_quota?, stop_conditions, BLP_delta_alpha, BLP_delta_delta }` - realised by referencing an `E/E-LOG` `EmitterPolicy` and adding Bitter-Lesson-Preference clauses. Defaults inherit from `C.19`; any deviation is editioned.

**BLP precedence.** In conflicts with tactics that hard-code narrow scripts, the Bitter-Lesson Preference applies subject to `E.3/E.5` precedence. Where scripts encode safety-critical gating or regulatory compliance, scripts prevail unless the governing context publishes the override rationale, expiry, measured hazard avoided, and planned re-evaluation window.
### Didactic quick card

**Agentic Call Plan (public surface).**
`Objective - Context(K) - RouteRefsInOrder[edition-pinned] - BudgetEnvelope{time/compute/cost/risk} - PolicyRef - Explore-share - Stop/Replan conditions - BLP tolerances - BLP waiver (if any) - Assurance<F,G,R|K,S> - Provenance ids`
### Explicit enactment outputs and closure rule

A finished `C.24` pass should publish one enactment result rather than one vague statement that the system now has a plan.

Two output shapes are lawful here:

- one enactment-facing `CallPlan`; or
- one bounded `CheckpointReturn` when probing is still the lawful next move inside enactment planning.

A `CallPlan` should state at least these fields:

- current objective;
- cited route descriptions or planned call order;
- active policy or planning posture;
- planned budget envelope or reserved budget;
- stop or replan condition;
- next move if the current plan is accepted now.

A `CheckpointReturn` should state at least these fields:

- current task family or objective;
- candidate routes tested so far;
- evidence on those routes;
- burned and residual actual budget;
- recommended next action;
- explicit commit trigger.

A compact result may therefore look like:

```text
CallPlan(
  objective = answer_question_Q,
  policyRef = ee_policy_v1,
  routeRefsInOrder = [search_route_v3, retrieve_route_v1, synthesize_route_v2, code_check_route_v1],
  plannedBudgetEnvelope = {time<=60_minutes, compute<=x1, cost<=y1, risk<=r1},
  stopOrReplan = low_R_or_cost_ceiling,
  nextMove = enact_now
)
```

or:

```text
CheckpointReturn(
  taskFamily = unfamiliar_lab_protocol,
  testedRoutes = [route_A, route_B],
  burnedBudget = 2_runs,
  residualBudget = 1_run,
  recommendedNextAction = probe_route_B_once_more,
  commitTrigger = route_B_clears_assurance_floor_L1
)
```

Close as one enactment-facing `CallPlan` when the choice posture is already fixed enough that execution order, gating, and replanning are now the governed burden. Close as one `CheckpointReturn` when bounded scout/probe work is still lawful inside enactment planning. Reroute when the result has actually fallen back into local choice, pool policy, or selector-facing publication.

If the result still does not state what should execute now, what budget is planned or already burned, and what event stops or replans the route, it is still unfinished `C.24` work.
### Worked closure slice

Two short contrasts keep the closure law practical.

**Known route, execution should begin now.**
When the objective and route are already fixed enough, `C.24` should close as one enactment-facing call plan:

```text
CallPlan(
  objective = produce_patch_and_verify,
  routeRefsInOrder = [inspect_repo_route, edit_candidate_route, run_targeted_tests_route],
  plannedBudgetEnvelope = {time<=45_minutes, compute<=x2, cost<=y2, risk<=r2},
  stopOrReplan = targeted_tests_fail_twice,
  nextMove = enact_now
)
```

**Unfamiliar route, one bounded scout pass still lawful.**
When the route is still uncertain inside enactment planning, `C.24` should close as one `CheckpointReturn`:

```text
CheckpointReturn(
  taskFamily = unfamiliar_ci_failure,
  testedRoutes = [log_trace_route, minimal_repro_route],
  burnedBudget = 1_probe_cycle,
  residualBudget = 2_probe_cycles,
  recommendedNextAction = run_minimal_repro_once_more,
  commitTrigger = repro_is_stable_and_assurance_floor_L1_holds
)
```

The practical distinction is simple: if route order and budgeted execution are already the governed burden, emit one `CallPlan`; if bounded scout work is still the governed burden inside planning, emit one `CheckpointReturn`.

1. **Research-assistance system in agential role.**
   Task: answer a novel technical question. Candidate tools: retrieval, structured web search, code runner, table or plot generator.
   **Plan:** cite route descriptions for `search`, `retrieve`, `synthesize`, and `code_check`; declare `explore_share approx 0.4`; replan on sentinel `low_R`.
   The lawful structure here is one declared budget envelope, one explicit route order, and one visible replan trigger.

2. **Program-repair system in agential role.**
   Task: propose a patch against a failing test suite. Candidate tools: repo introspection, static analyzer, unit runner.
   **Plan:** keep repo-introspection, patch-application, and targeted-test route descriptions distinct; use scout quota across patch families before committed rollout.

3. **Lab-automation system in agential role.**
   Task: adjust a wet-lab protocol under drift. Candidate tools: planner, pipetting controller, spectrometer, Bayesian optimizer.
   **Plan:** a bounded probe or pilot can inform the route, but committed rollout waits for the declared commit trigger and assurance floor.
## Bias-Annotation

Lexical firewall and notation independence apply; no vendor tokens; mixed-scale characteristics are never averaged; route descriptions remain distinct from `U.WorkPlan`, and both remain distinct from executed `U.Work`; a successful probe remains distinct from committed rollout until the commit trigger is satisfied.
## Conformance Checklist

1. **CC-ATC-1 - Declared separation.** `ATC.CallRouteDescription` is a `MethodDescription`; `ATC.CallPlan` is a `U.WorkPlan` that cites route descriptions; execution is `Work`; acceptance is via `U.PromiseContent`. No method-side route logic or actual burn is smuggled into the `U.WorkPlan` surface.
2. **CC-ATC-2 - Budgets on record.** `time/compute/cost/risk` ceilings exist ex ante; stop conditions listed.
3. **CC-ATC-3 - E/E policy.** `EmitterPolicyRef` (or equivalent) and `explore_share` are editioned and logged.
4. **CC-ATC-4 - Assurance tuple.** Publish the typed claim `Plan admissible under K,S` with `<F,G,R>` and CL penalties traceable in the `CallGraph` SCR. Design/run never merged.
5. **CC-ATC-5 - BLP waiver discipline.** Any heuristic override against a general method includes expiry and re-evaluation date.
6. **CC-ATC-6 - Provenance minimum.** Record `{PromiseContentRef, CallPlanRef, MethodDesc.edition, EmitterPolicyRef, DescriptorMapRef? (if NQD), DistanceDefRef? (if NQD), TimeWindow, Seeds?, Dedup?}`.
7. **CC-ATC-7 - Notation independence.** No vendor tokens in conceptual text; bindings via Bridges or Profiles only.
8. **CC-ATC-8 - BLP tolerances declared.** `alpha/delta` tolerances are present in `ATC.Policy` or referenced via the active `E/E-LOG` profile.
9. **CC-ATC-9 - `CheckpointReturn` for bounded specialization.** When one route still uses scout/probe discipline on a new task family, it SHALL publish one `CheckpointReturn` with candidate routes, evidence, burned/residual actual budget, next action, and commit trigger; a successful probe alone never counts as committed rollout.
10. **CC-ATC-10 - Recoverable enactment closure.** When `C.24` returns one enactment-facing call plan or one `CheckpointReturn`, the `CallPlan` SHALL state current objective, route refs in order, planned budget envelope, stop or replan condition, and next move, while `CheckpointReturn` SHALL state burned/residual actual budget plus next action and commit trigger.
11. **CC-ATC-11 - Neighboring-pattern reroutes.** If the burden is still fixed-option choice, pool policy over several live lines, or selector-facing publication, `C.24` SHALL reroute to `C.11`, `C.19`, or `G.5` rather than restating those patterns.
12. **CC-ATC-12 - Role discipline.** User-facing prose and emitted artifacts SHALL speak about systems in agential roles or equivalent typed performers, not one generic `agent` head, when that generic head would blur the holder kind.
## Common Anti-Patterns and How to Avoid Them

- **Treating route description as plan.** Avoid by keeping callable logic in `ATC.CallRouteDescription` and keeping `ATC.CallPlan` as one `U.WorkPlan` that cites it.
- **Treating planning as execution.** Avoid by publishing actual burn only through `CheckpointReturn`, `Work`, and `CallGraph`, not inside the plan surface.
- **Burning enactment budget while the burden is still upstream choice or pool policy.** Avoid by rerouting unresolved fixed-option choice to `C.11` and unresolved live-pool governance to `C.19` before building one call plan.
- **Counting a successful probe as committed rollout.** Avoid by publishing one `CheckpointReturn` with a visible commit trigger instead of smuggling rollout through a positive scout result.
- **Hiding stop conditions or replan triggers.** Avoid by making them part of the public plan surface rather than one private implementer intuition.
## Consequences

- tool use under systems in agential roles becomes inspectable as one lawful plan, not one opaque sequence of calls
- downstream work receives one explicit enactment surface with objective, route refs, budget envelope, stop conditions, and next move
- the cost is stronger discipline around route-description versus plan versus work separation, explicit budgets, and visible policy posture before execution begins
## Rationale

`C.24` exists because tool-use systems fail in a distinctive way: they can look adaptive while actually hiding route choice, budget burn, stop conditions, and replan logic inside one opaque execution chain. A separate planning calculus is therefore necessary so that tool use remains auditable, replayable, and governable before the first irreversible call is made.

- Contemporary tool-use systems in agential roles work best when planning, feedback, and replanning stay explicit rather than collapsing into one brittle script. The practical implication is to publish one `U.WorkPlan` that cites route descriptions and carries stop or replan triggers before execution.
- Post-2015 search, optimization, and agentic systems also show that bounded probing is useful but dangerous when it silently becomes commitment. The safeguard here is the explicit `CheckpointReturn` plus visible commit trigger and one explicit split between planned budget envelope and burned actual budget.
- Scaling-first practice favors general, learnable methods over fragile hand-tuned tactics when assurance and cost remain comparable. The practical implication is not blind optimism but disciplined BLP: when a narrow heuristic wins, record the waiver, expiry, and re-evaluation window.
## Relations

Builds on: `A.15` Role-Method-Work alignment (planning vs execution vs service), `B.3` Trust & Assurance (`F-G-R/CL`), `C.5 Resrc-CAL`, `C.18 NQD-CAL` (candidate and portfolio generation), and `C.19 E/E-LOG` (policies). Constrains: any `U.PromiseContent` used as a tool MUST expose acceptance conditions and observation hooks sufficient for `B.3` reporting. Enables: human-facing Working-Model surfaces with policy and assurance disclosures while keeping design/run separated.
## C.24:End
