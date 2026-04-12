---
title: "U.Dynamics: The Law of Change"
description: "Part A - Kernel Architecture Cluster"
---

# U.Dynamics: The Law of Change
> Pattern `A.3.3` · Stable
> Part A - Kernel Architecture Cluster

Teams need one place to say **how a thing changes**. Physicists call this “dynamics” (equations of motion, state‑transition maps). In IT and enterprise change, we often talk about **evolution of characteristics** (latency, cost, reliability, compliance, architectural fitness) across time. In knowledge work, **KD‑CAL** (knowledge dynamics) reasons about how the **status of claims** shifts as evidence arrives. All these are *the same modeling need*: a context‑local description of **state space** and **allowed transitions**.

## Aliases

- U.Dynamics

## Keywords

- state evolution
- model
- simulation
- state space.

## Relations

- `A.3.3` --builds_on--> [U.BoundedContext: The Semantic Frame](/generated/patterns/A.1.1)
- `A.3.3` --builds_on--> [Role Taxonomy](/generated/patterns/A.2)
- `A.3.3` --builds_on--> [U.RoleAssignment: Contextual Role Assignment](/generated/patterns/A.2.1)
- `A.3.3` --builds_on--> [U.Work: The Record of Occurrence](/generated/patterns/A.15.1)
- `A.3.3` --coordinates_with--> [U.Method: The Abstract Way of Doing](/generated/patterns/A.3.1)
- `A.3.3` --coordinates_with--> [U.MethodDescription: The Recipe for Action](/generated/patterns/A.3.2)
- `A.3.3` --coordinates_with--> [U.PromiseContent: Consumer‑facing Promise Clause](/generated/patterns/A.2.3)
- `A.3.3` --outline_parent--> [Transformer Constitution (Quartet)](/generated/patterns/A.3)
- `A.3.3` --outline_prev_sibling--> [U.MethodDescription: The Recipe for Action](/generated/patterns/A.3.2)
- `A.3.3` --explicit_reference--> [U.BoundedContext: The Semantic Frame](/generated/patterns/A.1.1)
- `A.3.3` --explicit_reference--> [Role Taxonomy](/generated/patterns/A.2)
- `A.3.3` --explicit_reference--> [U.RoleAssignment: Contextual Role Assignment](/generated/patterns/A.2.1)
- `A.3.3` --explicit_reference--> [U.Work: The Record of Occurrence](/generated/patterns/A.15.1)
- `A.3.3` --explicit_reference--> [U.Method: The Abstract Way of Doing](/generated/patterns/A.3.1)
- `A.3.3` --explicit_reference--> [U.MethodDescription: The Recipe for Action](/generated/patterns/A.3.2)
- `A.3.3` --explicit_reference--> [U.PromiseContent: Consumer‑facing Promise Clause](/generated/patterns/A.2.3)

## Content

## Context

Teams need one place to say **how a thing changes**. Physicists call this “dynamics” (equations of motion, state‑transition maps). In IT and enterprise change, we often talk about **evolution of characteristics** (latency, cost, reliability, compliance, architectural fitness) across time. In knowledge work, **KD‑CAL** (knowledge dynamics) reasons about how the **status of claims** shifts as evidence arrives. All these are *the same modeling need*: a context‑local description of **state space** and **allowed transitions**.

FPF already separates:

* **what a holon is** (structure, PBS/SBS),
* **how we act** (Method/MethodDescription, Work),
* **what we promise** (Service).

What is missing without `U.Dynamics` is the **law of change**—the model that tells us how states evolve **with or without** our interventions.

> Intuition: **Method** tells an agent what to do; **Dynamics** tells everyone how the world (or a model of it) changes when something happens (or even when nothing happens).

**Lexical note.** Terms like *process* and *thermodynamic process* are mapped by **L‑PROC**:

* the **recipe** is `U.Method/MethodDescription`,
* the **dated run** is `U.Work`,
* the **law/trajectory model** is `U.Dynamics`.
## Problem

Without a first‑class `U.Dynamics`, models suffer predictable failures:

1. **Recipe = Law.** Teams put the *procedure* (Method/MethodDescription) where the *state law* should be, so simulations and predictions become impossible to compare with reality.
2. **Run = Law.** Logs of Work are mistaken for dynamics; past events are treated as if they defined what *must* happen.
3. **No state space.** Discussions jump between metrics (latency! throughput!) without an explicit **characteristic space** or invariants, so “improvements” cannot be reasoned about.
4. **Domain lock‑in.** “Dynamics” is left to domain vocabularies (physics, control, finance), losing a trans‑disciplinary way to speak about change in a single kernel.
## Forces

| Force                                  | Tension                                                                                                                 |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Universality vs. richness**          | One kernel notion must cover ODE/PDE, Markov chains, queues, discrete events, and enterprise “fitness characteristics”. |
| **Model vs. reality**                  | A law must be **design‑time** (an `Episteme`), yet judged by **run‑time** evidence (Work).                              |
| **Continuous vs. discrete vs. hybrid** | Different time bases and update rules must coexist.                                                                     |
| **Open vs. closed systems**            | Exogenous inputs (control/disturbances) may be explicit or implicit.                                                    |
| **Predictive use vs. diagnostic use**  | The same dynamics can guide planning or explain incidents; interfaces must support both.                                |
## Solution — The unified concept U.Dynamics

**Definition (normative).**
Within a `U.BoundedContext`, **`U.Dynamics`** is an **`U.Episteme` that specifies a state space and a state‑transition law** (deterministic or stochastic, continuous/discrete/hybrid) for one or more holons, possibly under exogenous inputs and constraints. It **does not** prescribe what an agent should do (that is `U.Method/MethodDescription`) and **is not** the dated evolution itself (that is `U.Work` evidence).

* **Type:** `U.Episteme` (design‑time model/law on a carrier).
* **Orientation:** descriptive/predictive about **how states evolve**; can be used by Methods but remains separate from them.
* **Judged by:** conformance of observed **Work‑derived traces** to the law and invariants.

### Core structure (minimal fields)

```
U.Dynamics {
  context        : U.BoundedContext,     // where the model’s meaning and units are defined
  stateSpace     : CharacteristicSpace,  // explicit characteristics & units; may include topology/geometry
  transitionLaw  : Episteme,             // equations/relations/kernels/transition matrices/rules
  timeBase       : {continuous|discrete|hybrid},
  stochasticity? : {deterministic|stochastic}, // incl. noise/likelihood model if stochastic
  inputs?        : P(Characteristic),    // control/disturbances/environmental drivers
  observation?   : Episteme,             // measurement/observation map from state to observables
  constraints?   : Episteme,             // invariants/safety envelopes/guards
  validity?      : Conditions,           // operating region, approximations, version, timespan
  calibration?   : Episteme              // parameter identification / priors
}
```

* **`stateSpace`** uses FPF **characteristics** (not “characteristics”) so we can talk about **architecture fitness** (e.g., latency, MTBF, cost) just like temperature/pressure/volume in physics.
* **`transitionLaw`** is paradigm‑agnostic: ODE/PDE, finite‑state relation, Petri net firing, queueing kernel, Bayesian update, etc.
* **`observation`** separates what exists from what we *measure* (key for monitoring/assurance).
### What U.Dynamics is not

* **Not a Method/MethodDescription:** no imperative steps or prescriptions.
* **Not Work:** no timestamps/resources attached; evidence lives on `U.Work`.
* **Not a Service:** no consumer promise; dynamics may underpin service SLOs but does not define the promise.
* **Not PBS/SBS:** do not place dynamics inside structural BoMs.
## Where U.Dynamics sits in enactment

* **Design‑time:**
  Methods may *reference* Dynamics for planning/control (e.g., MPC uses a plant model).
  Services may *derive* acceptance targets from Dynamics (e.g., queueing predictions → SLO).

* **Run‑time:**
  Work produces **state samples/telemetry**; applying the **observation** map yields traces.
  Conformance/violation is decided by comparing traces with **constraints** and predictions from the transition law.
  Updates to model parameters flow via **calibration** (design‑time again).

> Memory hook: **Method decides**, **Dynamics predicts**, **Work reveals**.
## Prediction Use In Gating (normative)

When **predicted** coordinates (from a dynamics model) are used for **comparison or gating**, one of the following **MUST** hold:
1) a **fresh observation** is available for the gate’s window; or
2) the applied flow/map `Φ_{Δt}` is proven **non‑expansive** (Lipschitz ≤ 1) under the declared distance overlay (see § 5.1.7), **and** it **commutes** with the invariantization step (§ 5.1.6) — i.e., `Quot/Fix_g ∘ Φ_{Δt} = Φ_{Δt} ∘ Quot/Fix_g` on the domain of use.

If neither condition is satisfied, using prediction for gating is **forbidden**; the system **MUST** fall back to observation. Any use of `Φ_{Δt}` **SHALL** declare its validity window (range, Δt).
## Archetypal grounding (engineer‑manager friendly)

| Domain                        | Holon & State Space                     | Transition Law Example               | Observation                 | Typical Questions                                                 |
| ----------------------------- | --------------------------------------- | ------------------------------------ | --------------------------- | ----------------------------------------------------------------- |
| **Process control**           | Reactor: {Temperature, Concentration}   | Non‑linear ODE with disturbance term | Thermocouples, analyzers    | Will we overshoot? What control horizon keeps safety constraints? |
| **Reliability/ops**           | Service platform: {MTBF, MTTR, Backlog} | Birth–death/queueing model           | Incident logs, uptime pings | Given load, what SLO is feasible?                                 |
| **Evolutionary architecture** | System: {Latency, Cost, Coupling}       | Discrete‑time map per release        | Perf tests, bills           | If we change X, how does latency trend next 3 sprints?            |
| **KD‑CAL (knowledge)**        | Claim: {Belief, Support}                | Bayesian update rule                 | Evidence artifacts          | How does confidence evolve as studies arrive?                     |

**Key takeaway:** one kernel object captures **trajectories in a characteristic space**, from thermodynamics to software quality and knowledge confidence.
## Conformance Checklist (normative)

**CC‑A3.3‑1 (Type).**
`U.Dynamics` **IS** an `U.Episteme` (design‑time model/law on a carrier). It is **not** a `U.Method/MethodDescription`, **not** `U.Work`, and **not** a structural part of any PBS/SBS.

**CC‑A3.3‑2 (Context).**
Every `U.Dynamics` **MUST** be declared **inside** a `U.BoundedContext`. Units, characteristic names, admissible regions, and time base are **local to the context**; cross‑context reuse requires a Bridge (`U.Alignment`).

**CC‑A3.3‑3 (Explicit state space).**
`stateSpace` **MUST** enumerate characteristics with units/scales (continuous/discrete/ordinal) and any topology/geometry needed for trajectories. Do **not** refer to informal “axes”.

**CC‑A3.3‑4 (Transition law).**
`transitionLaw` **MUST** specify a state‑transition relation/map/kernel suitable for the declared time base (`continuous|discrete|hybrid`) and stochasticity (deterministic or with a likelihood/noise model).

**CC‑A3.3‑5 (Observation model).**
If evidence from `U.Work` is to be checked against the law, an `observation` mapping **MUST** be provided (identity is acceptable only if explicitly stated). Sampling rate/granularity **SHOULD** be declared.

**CC‑A3.3‑6 (Constraints & validity).**
If safety/envelope constraints apply, they **MUST** be declared under `constraints`. Operating region, approximations, version, and `timespan` **SHOULD** be stated under `validity`.

**CC‑A3.3‑7 (Separation from Method).**
A `U.Dynamics` **SHALL NOT** prescribe imperative steps or responsibilities. Planning/control algorithms that *use* the dynamics belong to `U.Method/MethodDescription`.

**CC‑A3.3‑8 (No actuals on Dynamics).**
Resource/time **actuals** and telemetry **MUST** attach to `U.Work`. Calibration outcomes produce **new versions** of `U.Dynamics`; the law object itself carries no run‑time logs.

**CC‑A3.3‑9 (Multi‑scale declaration).**
If state is aggregated across parts or time, the aggregation policy (`Γ_time`, `Γ_work`, averaging vs. sum vs. percentile) **MUST** be stated to prevent incoherent comparisons.

**CC‑A3.3‑10 (Lexical hygiene).**
Ambiguous uses of *process/processual* (laws vs. runs vs. recipes) **MUST** be resolved per **L‑PROC**/**L‑ACT**:

* law → `U.Dynamics`,
* recipe → `U.Method/MethodDescription`,
* run → `U.Work`.

**CC‑A3.3‑11 (Link to Services—optional).**
If service SLOs are derived from a dynamics model, the service promise clause (`U.PromiseContent`) **SHOULD** reference that `U.Dynamics` (A.2.3), but the promise clause remains the promise, not the law.
## Evidence and operators (traces, prediction, conformance)

Let `D` be a `U.Dynamics` in context `C`. Let `W` be a set of `U.Work` records produced under `C`. Let `obs_D(-)` be the declared observation map for `D`.

### Derived evidence

* **`trace(W, D)` → Sequence\<t, y>:**
  derive an ordered sequence of observed values `y` at times `t` by applying `obs_D` to Work/telemetry associated with `W`. (Not a kernel type; a derived artifact for analysis/assurance.)

* **`inputs(W)` → Series:**
  exogenous inputs/control signals recovered from Work metadata if the model declares `inputs`.

* **`initialState(W, D)` → x₀:**
  the assumed/estimated state at trace start (from Work context or a stated estimation rule).
### Prediction & simulation

* **`predict(D, x₀, inputs?, horizon)` → Trajectory:**
  propagate the law to obtain a predicted trajectory in the declared state space.

* **`admissible(D, x)` → bool:**
  test whether state `x` satisfies `constraints`.

* **`reach(D, S₀, S₁, inputs?, horizon)` → bool:**
  reachability: can states in `S₀` evolve into `S₁` under the law.
### Conformance & drift

* **`residuals(D, trace)` → Series:**
  discrepancies between predicted and observed series under a stated alignment (point‑wise, windowed, distributional).

* **`fits(D, trace, tol)` → {pass|fail|partial}:**
  verdict under tolerance policy `tol` defined by the context (e.g., sup‑norm ≤ ε, percentile bands, likelihood threshold).

* **`drift(D₁, D₂, domain)` → Measure:**
  divergence between two model versions over a declared operating domain (e.g., max deviation of eigenvalues, KL between predictive distributions).
### Invariants

* `fits(D, trace, tol)=pass` ⇒ every sample lies in `admissible(D,-)` unless the context explicitly permits out‑of‑envelope transients.
* If two traces are generated under identical `inputs` and initial conditions, recorded differences must be explainable by the declared stochasticity/noise model or flagged as violations.

> **Didactic hook:** *Dynamics predicts; Work reveals; Conformance compares.*
## Anti‑patterns (and the right move)

* **“Dynamics = procedure.”**
  Control recipes/step graphs belong to `Method/MethodDescription`. Keep the law in `U.Dynamics`.

* **“Telemetry = dynamics.”**
  Logs are `Work` evidence. Build `trace(Work, D)` and compare to the law; do not store logs inside the law.

* **“No state space.”**
  KPI lists without an explicit `stateSpace` turn into dashboard folklore. Name characteristics with units and ranges.

* **“Hard‑coding SLO inside the law.”**
  Service targets are promises (`U.PromiseContent.acceptanceSpec`). Keep predictions and promises separate; link them.

* **“Stuffing Dynamics into BoM.”**
  A model is not a component. Leave PBS/SBS for structure.

* **“One size fits all time base.”**
  If parts of the system evolve on different clocks, declare `hybrid` and separate update rules.
## Migration notes (quick path to value)

1. **Name the changing things.** Pick 3–7 **characteristics** that matter (physical or architectural). Declare `stateSpace` with units and ranges.
2. **Write the law you already use.** Even if it is a queueing approximation or a simple ARIMA—put it under `transitionLaw` and state assumptions under `validity`.
3. **Separate recipe from law.** Move control procedures to `Method/MethodDescription`; keep forecasting/plant equations in `U.Dynamics`.
4. **Wire evidence.** Ensure production `Work` emits the measurements needed by `observation`. Build `trace(Work, D)`.
5. **Start conformance.** Define a simple `tol` and compute `fits(D, trace, tol)` weekly. Raise issues on drift; version the model when calibrating.
6. **Link to promises (optional).** If SLOs depend on the law, reference `U.Dynamics` from `U.PromiseContent` and derive targets transparently.
7. **For KD‑CAL.** Treat belief/support as characteristics; declare a Bayesian/likelihood update in `transitionLaw`; evaluate conformance against evidence arrivals.
## Relations

* **Builds on:**
  `A.1.1 U.BoundedContext` (local meaning/units),
  `A.2 Role` / `A.2.1 RoleAssigning` (agents that *use* the law),
  `A.15.1 U.Work` (run‑time evidence).

* **Coordinates with:**
  `A.3.1 U.Method` / `A.3.2 U.MethodDescription` (planning/control using the law),
  `A.2.3 U.PromiseContent` (promises informed by predictions),
  **KD‑CAL** (knowledge dynamics as a specialisation: belief‑update laws),
  **Resrc‑CAL** (cost/energy models as dynamics over resources).

* **Constrained by lexical rules:**
  **E.10 L‑PROC** (process disambiguation), **L‑ACT** (activity/action), **L‑FUNC** (function).
## Didactic quick cards (engineer‑manager ready)

* **Dynamics = Law of Change.** A design‑time model of how states evolve.
* **State space = Named characteristics with units.** No vague “axes”.
* **Method vs Dynamics.** Method decides *what we do*; Dynamics predicts *what will happen*.
* **Work = Evidence.** Only Work has timestamps and resource actuals.
* **Conformance = Prediction vs Trace.** Fit, residuals, drift.
* **Keep promises separate.** Services are promises; Dynamics informs them but does not replace them.

**Memory hook:** **Method decides - Dynamics predicts - Work reveals.**
## A.3.3:End
