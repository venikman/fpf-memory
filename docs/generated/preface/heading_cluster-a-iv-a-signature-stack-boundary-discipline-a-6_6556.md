---
title: "*Cluster A.IV.A - Signature Stack & Boundary Discipline (A.6.\\)**"
description: "Generated reference page for heading:cluster-a-iv-a-signature-stack-boundary-discipline-a-6:6556."
---

# *Cluster A.IV.A - Signature Stack & Boundary Discipline (A.6.\)**
> Preface node `heading:cluster-a-iv-a-signature-stack-boundary-discipline-a-6:6556`

## Content

## Signature Stack & Boundary Discipline

> **Type:** Architectural (A)
> **Status:** Stable
> **Normativity:** Mixed (normative only where explicitly marked; routing semantics live normatively in A.6.B)
> **Placement:** Part A → A.6.\* (cluster overview; coordinates A.6.0 / A.6.1 / A.6.3 / A.6.B / A.6.5 / A.6.6 / A.6.7)
> **Builds on:** E.8 (authoring template), A.6.B (Boundary Norm Square — quadrant semantics & link discipline), A.6.0 (U.Signature), A.6.1 (U.Mechanism), A.6.3 (U.EpistemicViewing — views as episteme-level projections under viewpoints), E.17.0 (U.MultiViewDescribing), E.17 (MVPK — fixed face kinds & “no new semantics” publication), A.7 (Object≠Description≠Carrier), F.18 (promise/utterance/commitment), E.10.D2 (I/D/S vs Surface), E.10/L‑SURF (Surface token discipline)
> **Purpose (one line):** Keep boundary claims evolvable by routing each statement to the right layer of the Signature Stack and the right quadrant of the Boundary Norm Square (A.6.B).
>
> **Mint/reuse (terminology):** Mints “Signature Stack”, “Boundary Discipline Matrix”, and “Claim Register” as local authoring aids; reuses existing FPF meanings of `U.View`/`U.Viewpoint` (E.17.0/A.6.3) and reserves “Surface” for PublicationSurface/InteropSurface (L‑SURF). The labels **L/A/D/E** used below are *routing labels for statements*, not MVPK face kinds and not pattern IDs.
>
**Canonical companion.** The square itself (quadrant definitions, form constraints, and cross‑quadrant dependency discipline) is specified normatively in **A.6.B — Boundary Norm Square**. This overview only (i) maps quadrants onto the Signature Stack, and (ii) explains how MVPK faces project the canonical routed claim set. If anything in this overview conflicts with A.6.B, **A.6.B is authoritative**.

**Start here when.** The dominant burden is API, protocol, contract, compliance, SLO/SLA, connector, or interface language that is mixing runtime behaviour, governance, and evidence into one undifferentiated boundary story.

**First output.** One Claim Register or equivalent routed atomic claim set with stable `L-* / A-* / D-* / E-*` identifiers, stack placement, and face citations by ID rather than paraphrase.

**Typical next owners.** `A.6.B` for the quadrant law, `A.6.C` for contract unpacking, `A.6.P`, `A.6.Q`, or `A.6.A` for later lexical repair, and `E.17` faces for audience-specific publication of the same routed claim set.

**Common wrong escalations / reroutes.** If the real burden is still cue preservation or route-bearing early articulation, reroute to `A.16` / `A.16.1`; if you are already repairing qualified relation, quality-term, or action-invitation language, continue into `A.6.P`, `A.6.Q`, or `A.6.A`; if agent duties are being mixed into one contract sentence, split them through `A.6.B` rather than minting one more contract-soup paragraph.

**Conventions:** The key words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, **MAY**, and **SHALL** are to be interpreted as in RFC 2119/8174. Lower‑case “must/may/should” in explanatory prose is descriptive, not normative.

**Statement identifiers (recommended):** Adopt the quadrant‑prefixed ID scheme from **A.6.B:0** for routable statements:
`L-*` (law/definition), `A-*` (admissibility gate), `D-*` (deontic/commitment), `E-*` (effect/evidence).
Other sections and faces **SHOULD** refer to these IDs instead of restating the same constraint in new words.
IDs are intended to be “lintable” anchors (and are especially useful when D‑duties enforce A‑gates or E‑claims). Consider pairing IDs with a lightweight Claim Register (A.6.B:7) to reduce paraphrase drift across faces.
**Non-collision note (informative):** The `A-*` prefix here is “Admissibility”, not Part‑A numbering and not MVPK’s `AssuranceLane` face kind. If this is a readability hazard in your program, prefer an explicit `G-*` (“Gate”) local convention while keeping the quadrant name “Admissibility”.

**Claim Register (informative, recommended).** Use the Claim Register mini‑artifact in **A.6.B:7**. In this cluster the register is additionally used to record stack placement (Signature/Mechanism/Norms/Evidence) and the MVPK faces that cite each claim (`viewRef`/`viewpointRef`), so “no paraphrase drift” can be audited mechanically.

### Problem frame

Boundaries are where architecture lives: at the edge of a theory, an API, a protocol, a hardware connector, an organisational interface, or a published model. FPF already has the core building blocks to describe such edges:

* `U.Signature` as a *public, law‑governed declaration* (with Vocabulary, Laws, Applicability).
* `U.Mechanism` as a specialization that introduces operational “entry gates” (AdmissibilityConditions) and additional operational blocks (Transport, Audit, etc.).
* Multi‑view publication discipline via `U.MultiViewDescribing` (views + viewpoints).
* Strict separation of **Object vs Description vs Carrier** so we do not accidentally attribute agency or work to an episteme (or treat a file as “the thing”).

Yet boundary descriptions in practice fail in a predictable way: authors blend several fundamentally different kinds of claims into one “contract soup”. The result is brittle architecture: signatures become entangled with runtime gates, deontic language is mixed into mathematical invariants, and “effects” are asserted without any disciplined carrier/evidence story.

This cluster overview makes one disciplined move:

1. Treat a boundary as a **stack of boundary layers** (Signature → Mechanism → Work/Evidence carriers) plus publication views/faces, and
2. Provide a **boundary discipline matrix** (2×2) that routes statements to the correct layer, so evolution remains controlled and substitutions are possible.

*Terminology note (informative):* In this pattern:
* **Layer** names a stratum in the boundary stack (Signature → Mechanism → Work/Evidence carriers → Publication).
* **View** (`U.View`) is an episteme‑level projection, not a file/document.
* **Viewpoint** (`U.Viewpoint`) is an intensional accountability spec that constrains views.
* **Face** (MVPK sense) is a named publication view kind (`PlainView`, `TechCard`, `InteropCard`, `AssuranceLane`) whose rendering lives on a `PublicationSurface` (carrier). Do not coin “signature/mechanism …Surface” terms; “Surface” is reserved for publication surfaces (L‑SURF).
### Problem

When boundaries are described without a routing discipline, four confusions dominate:

1. **Laws vs admissibility.** Authors encode runtime gate predicates as “laws”, or write invariants using RFC‑style deontic verbs, blurring “what is true/defined” with “what is allowed to be applied”. FPF explicitly separates these: operational guard predicates belong to mechanisms (A.6.1), not signatures (A.6.0).
   *Common mistake #0 — Applicability ≠ Admissibility (informative):* Signature `Applicability` scopes intended use/bounded context; it is not a runtime entry gate. Runtime entry checks and permission predicates belong in `U.Mechanism.AdmissibilityConditions` as `A-*`. If an agent is obligated to satisfy/enforce such a gate, express that as a `D-*` duty that references the `A-*` claim ID (per A.6.B), not by rewriting the gate as “X MUST …”.

2. **Admissibility vs deontics.** “MUST/SHOULD/MAY” is used both for agent obligations and for world‑state admissibility predicates. E.8 already demands keeping deontics distinct from admissibility/definitions and recommends predicate‑style constraints for admissibility rather than RFC keywords.

3. **Contract talk category errors.** “The interface promises…” is a metaphor. A promise (and a contract) is an *agent‑level* phenomenon; an episteme is an utterance; a running service is the delivered work. FPF provides an ontological anchor for this via promise/utterance/commitment distinctions (F.18).

4. **Effects without evidence or carriers.** Effects happen only in work; therefore, “effect claims” must be anchored to observation and carriers. Without A.7’s Object≠Description≠Carrier discipline, writers conflate the published description with runtime traces or treat a file as the system itself.

These confusions destroy evolvability: you cannot swap implementations behind a stable signature if the signature already smuggles mechanism‑gates, audit logistics, or agent commitments into “laws”.
### Forces

| Force                                        | Tension                                                                                                                                                            |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Modularity vs expressiveness**             | A stable boundary must be abstract, but users want operational detail “in the same doc”.                                                                           |
| **Truth vs governance**                      | Definitions/invariants (“is”, “iff”, “∀”) vs permissions/obligations (“MUST/SHOULD/MAY”).                                                                          |
| **Design‑time clarity vs run‑time evidence** | What can be checked statically vs what requires executing work and observing traces.                                                                               |
| **View vs viewpoint discipline**             | Views are projections; viewpoints are accountable stances. Dropping viewpoint loses architecture accountability (ISO‑style discipline is already encoded in MVPK). |
| **Local meaning vs cross‑context reuse**     | Boundaries should be local to a bounded context; reuse must be explicit (Bridges/CL), not hidden.                                                                  |
| **Evolvability vs auditability**             | Evolving interfaces requires change; auditors require stable evidence trails.                                                                                      |
| **Human readability vs formal precision**    | Plain explanations vs tech‑register constraints; both must remain aligned.                                                                                         |
### Solution — A stack + a routing matrix

#### Why “stack”: what is stacked, and what “higher/lower” means

This pattern uses **stack** in the same pragmatic sense as other FPF stacks (e.g., the holonic import stack and other layered disciplines): an ordered set of layers where **higher layers are more stable commitments**, and **lower layers are more volatile realizations/evidence**. “Higher” and “lower” are not metaphysical claims; they are **engineering guidance for evolvability**:

* **Higher in the stack** = closer to *public, reusable intent* (conceptual contract).
* **Lower in the stack** = closer to *execution, implementation, and evidence* (what is actually done and observed).

This is consistent with existing “stack discipline” uses in FPF (e.g., import layering over holonic strata).

The **Signature Stack** (as used in this cluster) is the ordered family of **canonical claim layers** for a boundary package. Each layer is a stable “landing zone” for one quadrant of statements (L/A/D/E), with a canonical home in the boundary’s artefacts/sections:

1. **Signature layer (L: laws/definitions).** `U.Signature` provides the stable declarative boundary: Vocabulary + Laws + Applicability, without runtime gate predicates.

2. **Mechanism layer (A: admissibility/gates).** `U.Mechanism` specializes the signature and adds **AdmissibilityConditions** (the entry gate) plus operational blocks (e.g., Transport, Audit/Observability). These blocks specify runtime gates and observability *interfaces*; they are still **descriptions**. The evidence itself exists only as carriers produced in work.

   *Audit vs AssuranceLane (avoid duplication):* the Mechanism’s **Audit/Observability** block defines the required semantics of an observability/evidence interface (carrier classes and required fields, correlation keys, exposure interface). **Retention/access/enforcement are D‑claims** (agent duties) that reference the same carrier classes by ID. An MVPK **AssuranceLane** is a projection for auditors that explains how to read/check the evidence interface. This is a special case of CC‑A.6.6: the lane references the Mechanism section and the relevant claim IDs rather than restating semantics.

3. **Norms & commitments layer (D: duties/commitments).** Deontic statements are anchored to accountable agents/roles (authors, implementers, operators, providers, reviewers). Canonical placement is a Norms/Commitments section in the boundary package (typically rendered inside `TechCard`), and those statements reference `L-*`/`A-*`/`E-*` by ID rather than duplicating predicates.

4. **Evidence bindings layer (E: effects/evidence).** `E-*` claims bind observed behaviour to **carrier classes** and measurement conditions. Canonical placement is an Evidence/Carriers section in the boundary package (typically rendered in `AssuranceLane`), and adjudication happens against carriers produced in work.

5. **Work & realizations (outside the description stack).** Realizations (substitutable implementations) are exercised by doing work; actual executions produce state changes, traces, and measurements. Effects exist only in work. A.6.0 already frames realizations as substitutable behind signatures and warns against smuggling bridge mechanics into the signature layer.

6. **Publication faces (MVPK views rendered on PublicationSurfaces).** MVPK yields audience‑specific `U.View` instances (faces) that are **typed projections** over the canonical claim layers above and carry viewpoint accountability (`viewRef` + `viewpointRef`). Physical documents/files live on carriers (`PublicationSurface`), not in the `U.View` itself.

*Observability compatibility note (informative):* When specifying evidence carriers and correlation rules, it is often convenient to describe the carrier layer in terms familiar from contemporary observability practice (post‑2015): traces/spans, logs/log records, and metrics time‑series, with explicit correlation identifiers. Treat these as example *carrier schemas and join keys*, not as mandatory technology choices. (Concrete schema/exchange mapping remains outside Part E; keep Part E conceptual.)

##### AssuranceLane skeleton (informative)

An MVPK **AssuranceLane** is a view that teaches a specific audience how to adjudicate `E-*` claims against carriers produced in work. It references (not restate) the Mechanism’s Audit/Observability semantics.

Minimal content (suggested):
- **Scope:** boundaryRef, version, viewRef, viewpointRef.
- **Carrier inventory:** carrier class/schema refs (A.7 Carrier) + where to obtain them.
- **E‑claim map:** a table keyed by `E-*` ID with: measurement conditions, carrierRef(s), join/correlation keys, and a reference to the canonical `E-*` text that defines pass/fail criteria.
- **Operational policies:** references to relevant `D-*` duties (retention, access control, exposure), without redefining them.
- **Limitations:** sampling, redaction, missing signals, expected false negatives/positives.

**No new semantics reminder.** The lane may include *procedural* adjudication guidance (queries, joins, dashboards) as informative text. Any normative thresholds/criteria that would change the boundary’s commitments **MUST** be authored as `E-*` claims in the canonical Evidence/Carriers section and cited by ID, rather than being introduced only inside the lane text.

Example (conceptual, no tools):

```
AssuranceLane:
  viewRef: <ViewId>
  viewpointRef: <ViewpointId>
  boundaryRef: <BoundaryId>
  version: <SemVer or revision>
  evidence:
    - E: E-OBS-1
      carrierRefs: [Carrier.AuthorizationRecord, Carrier.AuditLogEntry]
      measurement:
        conditions: "on every rejection due to A-AC-1"
        vantage: "Operator/Auditor pipeline"
        correlation: ["traceId", "requestId"]
      adjudication:
        check: "query audit stream for code=NotAdmissible and join to traceId"
        criteriaRef: "E-OBS-1 (pass/fail lives canonically in the E-claim)"
      references: [A-AC-1, D-RET-1, Mechanism.AuditObservability]
```

Default landing zones (quadrant → stack layer / section):

* **L →** Signature.Laws (and, where appropriate, mechanism‑local semantic laws; never runtime gates)
* **A →** Mechanism.AdmissibilityConditions
* **D →** Norms/Commitments (agent/role duties; publication/accountability duties)
* **E →** Evidence/Carriers (claims adjudicated against work via carriers; the publication face for these is typically `AssuranceLane`)

**Integration stitches (informative; this cluster is a routing hub, not a standalone philosophy):**
* **A.6.1 ↔ A‑quadrant:** `U.Mechanism.AdmissibilityConditions` is the canonical home for `A-*` gate/admissibility claims.
* **A.10 / B.3 ↔ E‑quadrant:** `E-*` claims should be anchored to evidence carriers + provenance (A.10); without an explicit evidence anchor they are treated as `AssuranceLevel:L0 (Unsubstantiated)` in the Trust & Assurance calculus (B.3).
* **A.2.3 / F.12 ↔ D/E separation:** a `U.PromiseContent` promise is not evidence; promise acceptance is linked to work evidence via F.12, and role obligations to maintain admissibility are expressed as `D-*` duties referencing `A-*` and/or `E-*` by ID.

 A stack is useful because the intended direction of change is clear:

* Lower layers (realizations, audit formats, transport mechanisms) are expected to change more frequently and can often evolve without forcing higher‑layer changes, provided higher‑layer commitments remain satisfied.
* Changes to higher layers are contract evolution and typically require explicit compatibility reasoning (and therefore explicit versioning and communication).
#### Boundary Discipline Matrix: route by A.6.B (the Boundary Norm Square)

**Normative source.** The canonical 2×2 square (axes, quadrant semantics, form constraints, and cross‑quadrant reference rules) is defined in **A.6.B**. This section provides a short operational summary and worked rewrites only.

A “four‑part list” is not strong enough, because real sentences reuse the same surface words (“must”, “guarantees”, “valid”) across different logical roles. A **2×2 matrix** is stronger because it arises from crossing **two independent distinctions**:

* **Modality family:** truth‑conditional vs governance (permissions/obligations/commitments).
* **Adjudication substrate:** in‑description vs in‑work (whether satisfaction is decided from the description alone or requires observing executed work/carriers).

Operational summary (quadrant → canonical home in the stack):
* **L** (Laws & Definitions) → `Signature.Laws` (truth‑conditional semantics, in‑description)
* **A** (Admissibility & Gates) → `Mechanism.AdmissibilityConditions` (runtime entry predicates / permission checks)
* **D** (Deontics & Commitments) → Norms/Commitments (agent/role duties and commitments; may be audited via `E-*`)
* **E** (Work‑Effects & Evidence) → Evidence/Carriers (work‑adjudicated effects tied to carriers and measurement conditions)

Atomicity rule:

If a sentence mixes roles (e.g., “MUST” + a gate predicate + an effect claim), it is **not routable** as a single statement. Per **A.6.B**, split it into **atomic** claims so each one has exactly one quadrant (and, ideally, an identifier you can reference).

Micro‑template: **Atomize → Route → Place → Anchor (A.7) → Register**

1. **Split** the sentence into atomic claims (one logical role each).
2. **Assign** each claim to exactly one quadrant (L/A/D/E) using the matrix.
3. **Place** each claim into its correct section/artefact (stack layer + section).
4. **Anchor A.7:** for each claim, name the primary A.7 layer it is *about* (one of `{Object, Description, Carrier}`) and ensure the grammatical subject matches (agents/roles for `D-*`, carriers for `E-*`).
5. **Register:** add the atomic claim to the Claim Register (if used) and ensure every downstream face references the claim by ID rather than paraphrasing.

> **Informative example.** Example rewrite (mixed → atomic):

*Before (mixed, not routeable):* “Clients **MUST** include header `X`; otherwise the request is invalid and the system logs `NotAdmissible`.”

*After (routeable + lintable):*
* `A-AC-1` (Quadrant A, Mechanism.AdmissibilityConditions): `admissible(req) iff hasHeader(req, "X")`.
* `D-CL-1` (Quadrant D, Norms/Commitments): “Client implementers **MUST** satisfy `A-AC-1`.”
* `E-OBS-1` (Quadrant E, Evidence/Carriers): “When a request is rejected due to `A-AC-1`, an `AuditLogEntry{code="NotAdmissible"}` carrier is produced and can be observed in the audit stream.”

> **Informative example.** Example rewrite (guarantee + SLA + measurement + enforcement):
>
> *Before (mixed, contract soup):* “The service **guarantees** 99.9% availability per calendar month and **MUST** keep p95 latency under 200ms; breaches are penalized; operators **SHALL** alert on violations.”
>
> *After (routeable + adjudicable):*
> * `D-SLA-1` (Quadrant D, Commitments/SLA): “Provider **SHALL** meet `E-SLA-AVAIL-1` and `E-SLA-LAT-1` under the stated exclusions.”
> * `E-SLA-AVAIL-1` (Quadrant E, Evidence/Carriers): “`availability ≥ 0.999` over calendar month `T`, measured by carrier `UptimeProbeSeries` from viewpoint `VP.ExternalMonitor`.”
> * `E-SLA-LAT-1` (Quadrant E, Evidence/Carriers): “`latency_p95 ≤ 200ms` under workload `W`, measured by carrier `LatencyMetricSeries` from viewpoint `VP.Client`.”
> * `D-OPS-ALERT-1` (Quadrant D, Ops duty): “Operators **MUST** page on breach of `E-SLA-AVAIL-1` or `E-SLA-LAT-1` within 5 minutes (policy).”
> * `E-ALERT-1` (Quadrant E, Evidence/Carriers): “Pages are evidenced by carrier `AlertEvent{ruleId,firedAt,target}` and can be joined via `incidentId`.”

See **A.6.B:4–A.6.B:6** for the normative square, quadrant form constraints, and explicit cross‑quadrant link patterns (notably: **D→A**, **E→A**, **D→E**, and **A/E→L**).
#### Viewpoint is not optional: projections live under accountable viewpoints

“Projection” language is useful (a view is a projection), but FPF does not drop **viewpoint**. `U.MultiViewDescribing` makes viewpoints explicit and treats views as epistemes; MVPK specialises this for publication and fixes a closed set of face kinds (`PlainView`, `TechCard`, `InteropCard`, `AssuranceLane`) under Surface token discipline (L‑SURF).

A disciplined stack therefore requires:

* Every published face is a **Description** (A.7) that is *about* an Object and is carried by some Carrier; do not conflate these layers.
* Each face must declare the viewpoint that justifies its projection (ISO/42010 discipline operationalised by MVPK).
* Per **E.17** (“no new semantics”), a face **MUST NOT** introduce new semantic commitments beyond the boundary’s **canonical routed claim set** (the authoritative `L-* / A-* / D-* / E-*` statements at their canonical locations). A face **MAY** add informative explanation, examples, and cross‑references, provided they are clearly marked as informative. Any **normative** sentence on a face **MUST** cite the routed claim ID(s) it depends on (or be moved into the canonical claim set); paraphrase is allowed only as explicitly informative text.
* Per **E.17 / L‑SURF** (face‑kind closure), a publication package that claims MVPK alignment **MUST NOT** mint additional MVPK face kinds (e.g., “EvidenceCard”, “NormsCard”) as if they were first‑class kinds; if you need local headings, keep them as sections within the canonical face kinds.
#### “Contract” unpacking: avoid assigning agency to epistemes

When practitioners say “the API contract”, they usually compress multiple distinct things into one word. The core naming split is the **F.18:16.1** triad; boundary engineering adds the missing adjudication substrate (see also **A.6.C**):

* **Promise content (promise content; `U.PromiseContent`, A.2.3):** what is promised to be made available to eligible consumers — **a promise, not execution** (`U.Work`).
* **Utterance package (published descriptions + instituting act):** what is said/published and versioned (signature/mechanism + MVPK faces), plus the `U.SpeechAct <: U.Work` that published/approved it when provenance matters (A.2.9).
* **Commitment (deontic binding; `U.Commitment`, A.2.8):** what an accountable role/agent is obligated/permitted/prohibited to do (often: to satisfy a promise content).
* **Work + Evidence (adjudication substrate; `U.Work` + carriers):** what actually happens and what carriers/traces can adjudicate whether commitments and operational guarantees were met.

In A.6 terms:

* The **signature** is the *utterance substrate* for the boundary; it is not itself a promiser or obligor (A.7).
* Deontics belong to accountable roles/agents and should be expressed as `D-*` commitments (`U.Commitment`) that reference `L-*`/`A-*`/`E-*` by ID (A.6.B, A.2.8).
* Operational “guarantees” are empty rhetoric unless they are routed as either **L** (truth‑conditional law), **D** (agent commitment), or **E** (measured property with evidence).

This paragraph is a compact reminder; the reusable expansion (including “Service ≠ Work” discipline, claim‑ID link hygiene, and MVPK face projection rules) is **A.6.C — Contract Unpacking for Boundaries**.
#### Where statements go (routing examples)

> **Informative.** Routing examples for learning the discipline; they do not add requirements beyond A.6:7.

The table below intentionally uses near‑everyday spec phrases. The same surface words appear in different quadrants depending on what they *do*.

| ID | Example statement (typical wording) | Matrix quadrant | Put it under… | A.7 primary layer |
| --- | --- | ---: | --- | --- |
| `L-1` | “`op f` is **defined iff** `P(x)` holds.” | L | Signature → **Laws** (`Definition:`) | Description |
| `L-2` | “For all requests, `idempotencyKey` is **unique** per subject.” | L | Signature → **Laws** (`Invariant:`) | Description |
| `A-1` | “The mechanism may be applied only if `tokenValid`.” *(rewrite as predicate: `admissible(req) iff tokenValid(req)`)* | A | Mechanism → **AdmissibilityConditions** (entry gate) | Description |
| `A-2` | “A request is admissible only if header `X` is present.” | A | Mechanism → **AdmissibilityConditions** | Description |
| `D-1` | “Client implementers **MUST** satisfy `A-2`.” | D | Norms/Commitments (role duty; reference gate ID) | Object |
| `D-2` | “Authors **MUST** publish a versioned MVPK face for this boundary.” | D | Conformance Checklist / publication norms (authoring plane) | Object |
| `D-3` | “Operators **SHOULD** rotate keys every 90 days.” | D | Norms (agent obligation; link to Role/Method where applicable) | Object |
| `D-4` | “Implementers **MUST** expose audit‑log carriers via endpoint `/audit`.” | D | Norms/Commitments (exposure duty) *about carriers* | Carrier |
| `D-5` | “The vendor commits to `99.9%` availability over window `T` (SLA).” | D | Commitments/SLA (identify committing agent, window, exclusions) | Object |
| `E-1` | “When a state change occurs, an `AuditRecord` carrier is produced and can be observed in the audit stream.” | E | Evidence/observability: expected trace semantics; bind to carriers + conditions | Carrier |
| `D-6` | “Operators **MUST** retain audit‑log carriers for 30 days.” | D | Retention policy (deontic) *about carriers* | Carrier |
| `E-2` | “`latency_p95 ≤ 200ms` under workload `W` as measured by carrier `LatencyMetricSeries` from collector `C`.” | E | Evidence claim with measurement conditions | Carrier |

Notes:

* The routing is not just about modal verbs. “Shall” can be D (a duty) or A (a gate behavior). “Guarantees” can be D (a commitment) or E (a measured property). The matrix forces disambiguation.
* If a sentence reads like “X **MUST** … if … then …”, it almost always bundles multiple quadrants. Split into (A) a gate predicate (`A-*`), (D) an enforcement duty on an agent/role (`D-*` referencing the gate ID), and (E) an evidence claim (`E-*`) if observability matters.
* When something needs to be enforceable but is mathematical, prefer predicate blocks rather than deontic language in the L/A blocks, per E.8’s deontics vs admissibility guidance.
#### Routing sanity rules (informative, concept-level)

These are *writing diagnostics*, not tool requirements. They exist to keep the mental model crisp.

- **RFC keyword inside Definition/Invariant/Admissibility predicate** → routing error (rephrase as predicate; move obligation to `D-*`).
- **`E-*` without (carrier + measurement conditions + viewpointRef)** → incomplete evidence claim (cannot be adjudicated).
- **`D-*` that re-states an `A-*`/`L-*` predicate instead of referencing its ID** → drift risk (prefer “MUST satisfy `A-…`”).
- **A face introduces new L/A/D/E content not present in underlying Signature/Mechanism** → view-fork (make it informative only, or move the commitment to the underlying artefact).
- **“The system/service SHALL …” where no accountable agent is named** → likely misrouted deontic (rewrite as `E-*` behavior + `D-*` duty on implementers/operators).
### Archetypal Grounding (Tell–Show–Show; System / Episteme)

> **Informative.** Worked examples for learning the routing discipline; they do not add requirements beyond A.6:7.

#### Tell (universal rule)

A boundary description is evolvable iff its claims are separated across the signature stack and each statement is routed by the boundary discipline matrix to its proper layer (Laws, Admissibility, Deontics/Commitments, Effects/Evidence), while preserving Object≠Description≠Carrier separation.
#### Show #1 (U.System): effectful API boundary (algebraic effects intuition)

**System:** A “Payment Authorize” service.

* **Signature layer (A.6.0).**

  * Vocabulary: `PaymentRequest`, `AuthDecision`, `MerchantId`, `Money`, etc.
  * Laws: e.g., “If decision is APPROVED then reservedAmount = requestedAmount” (truth‑conditional).
  * Applicability: bounded context “Payments/Authorization”.

* **Mechanism layer (A.6.1).**

  * Admissibility gate: request is admissible iff `tokenValid ∧ merchantActive ∧ amountWithinLimit`.
  * Transport: HTTP headers, idempotency key transport, canonical currency conversions.
  * Audit/Observability: specifies required evidence carriers (e.g., `AuthorizationRecord` event, log entry) and their semantics (fields, correlation IDs, retention class).

* **Realization/work layer.**

  * Actual side effects: reservation entry in ledger, emission of event, timers, retries.
  * Evidence: traces, logs, metrics.

* **Publication faces (MVPK).**

  * PlainView: narrative for stakeholders (what the service promise is, in plain terms).
  * TechCard: signature/mechanism details (types, error codes, version policy, admissibility predicate refs).
  * InteropCard: machine‑exchange oriented boundary details (canonical field names, schema refs, transport bindings).
  * AssuranceLane: evidence bindings (which carriers exist, how to adjudicate `E-*` claims, retention/access duties by reference).

**SoTA tie‑in:** This boundary is naturally understood using *algebraic effects & handlers*: the signature is the “operation interface” (effect signature), while the mechanism/realization provides handlers (semantics). The stack keeps the abstract operation surface stable while allowing multiple handlers/realizations to evolve.

**Routing example:**

* “Defined iff tokenValid” belongs in Quadrant A (admissibility gate).
* “Clients MUST include Idempotency‑Key” belongs in Quadrant D (agent obligation) but should reference the same gate semantics to avoid divergence.
* “System emits AuthorizationRecord” belongs in Quadrant E (evidence via carriers).
#### Show #2 (U.Episteme): published evaluation protocol boundary (multi‑view + evidence)

**Episteme:** A published “Model Evaluation Protocol” for a safety‑critical classifier.

* **Signature layer:** defines operations like `Evaluate(model, dataset) → Report` and truth‑conditional definitions of metrics (AUROC, calibration error) as Laws.

* **Mechanism layer:** admissibility gate encodes when evaluation is permitted: dataset version must match declared license; measurement environment must meet constraints; seeds pinned.

* **Deontics/commitments:** reviewers MUST use dataset vX.Y; authors SHALL publish MVPK faces and cite the measurement environment; an organisation commits to a review SLA (explicitly an agent commitment).

* **Effects/evidence:** the produced report file, logs of evaluation runs, cryptographic hashes, and trace IDs are carriers. A.7 discipline prevents calling the report “the evaluation” (object) and prevents treating the file as the model.

* **Multi‑view (MVPK canonical face kinds only):**

  * PlainView for decision makers: what this protocol means for assurance.
  * TechCard for engineers: exact metric definitions, admissibility predicates, and a clearly marked **Norms/Commitments** section (D‑claims) for governance.
  * InteropCard for exchange-oriented consumers: conceptual field names/anchors and schema references (concrete format mapping lives outside Part E).
  * AssuranceLane for auditors: evidence map (which carriers prove what happened) and adjudication steps keyed by `E-*` IDs.

This episteme is a boundary because it mediates between theory (“metric definitions”) and work (“a run produced a report”). The signature stack provides the stable interface for that mediation.
### Bias‑Annotation

Lenses tested: **Gov**, **Arch**, **Onto/Epist**, **Prag**, **Did**. Scope: **Universal** for boundary descriptions in A.6.\*.

* **Arch bias:** Strongly biases toward separation of concerns and explicit layering; mitigated by allowing multiple faces (views) so audiences are not forced into the same detail level.
* **Onto/Epist bias:** Treats signatures/mechanisms as epistemes that must not be conflated with work; mitigated by explicit evidence surfaces and carriers.
* **Gov bias:** Prefers auditable responsibility (viewpoint accountability and commitment unpacking); mitigated by keeping the stack conceptual and tool‑agnostic.
### Conformance Checklist

| ID                                       | Requirement                                                                                                                                                                                                                                                                                    | Purpose                                                             |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **CC‑A.6.1 (Stack declaration).**        | A conforming boundary description **SHALL** identify its stack layers (Signature, Mechanism, Realization/Work evidence, Publication faces) and state which artefacts belong to which layer.                                                                                                    | Prevents “one doc contains everything” ambiguity.                   |
| **CC‑A.6.2 (Square discipline).**        | A conforming boundary description **SHALL** conform to **A.6.B** (Boundary Norm Square), including atomicity, quadrant routing, and explicit cross‑quadrant references by claim ID.                                                                                                           | Makes the stack operational; prevents “contract soup” drift. |
| **CC‑A.6.5 (A.7 separation).**           | A conforming boundary description **SHALL** respect Object≠Description≠Carrier; statements about logs/metrics **SHALL** be written as carrier‑anchored evidence claims/policies, not as properties of the text itself. | Prevents category errors and improves auditability.                 |
| **CC‑A.6.6 (Viewpoint accountability).** | Every published MVPK face (`U.View`) **SHALL** specify `viewRef` and `viewpointRef`. Faces **SHALL** be projections of the boundary’s canonical routed claim set (A.6.B); normative content on faces **MUST** be expressed as citations to routed claim IDs (not re‑stated prose), and faces **MUST NOT** introduce new semantic commitments beyond the underlying signature/mechanism (per **E.17** “no new semantics”). | Preserves viewpoint discipline and prevents view‑forking.    |
| **CC‑A.6.6a (MVPK face‑kind discipline).**  | A publication that claims MVPK alignment **MUST** conform to **E.17 / L‑SURF** face‑kind closure (i.e., use only `{PlainView, TechCard, InteropCard, AssuranceLane}` and **MUST NOT** mint additional face kinds). Local “cards” may exist only as headings/sections inside those face kinds. | Aligns with MVPK/L‑SURF; prevents new‑face drift.            |
| **CC‑A.6.7 (Contract unpacking).**       | When using “contract/guarantee/promise” language, a conforming text **SHOULD** apply the reusable discipline in **A.6.C** to disambiguate whether it refers to a promise content as promise content (`U.PromiseContent`, not execution), an utterance package (published descriptions / speech acts), a deontic commitment (`U.Commitment`), and/or work‑effects/evidence, and then route each atomic statement via **A.6.B** (L/A/D/E) with explicit claim‑ID references (no paraphrase drift). (**F.18** is a lexical anchor only.) | Stops agency attribution errors; clarifies responsibility.          |
### Common Anti‑Patterns and How to Avoid Them

| Anti‑pattern                   | Symptom                                                         | Why it fails                                                                     | How to avoid / repair                                                                        |
| ------------------------------ | --------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Gate‑as‑law**                | Preconditions written as “laws” in the signature                | Breaks substitution; violates A.6.0’s separation of signature vs mechanism gates | Move predicates to Mechanism.AdmissibilityConditions; keep signature laws truth‑conditional. |
| **RFC‑keywords in invariants** | “MUST” appears inside `Definition:` blocks                      | Confuses deontics with mathematical admissibility; undermines auditability       | Rewrite as declarative predicate; reference predicate IDs from CC when needed.               |
| **Paraphrase drift**           | Same constraint restated in multiple faces with new wording      | Creates hidden divergence; breaks routing discipline and evidence accountability | Use `…-*` IDs + Claim Register; faces reference IDs rather than restating text.              |
| **Interface‑as‑promiser**      | “The interface promises…” without identifying an agent          | Ontological category error; contracts are agent commitments                      | Apply **F.18:16.1** unpacking: who commits, via which published utterance, to what promise content.           |
| **Evidence‑free guarantees**   | “Guaranteed latency” without measurement/evidence story         | Effects exist only in work; without carriers it’s non‑testable                   | Bind to carriers (metrics/traces) and specify the evidence surface (what gets logged).       |
| **View without viewpoint**     | A “view” is published but no viewpoint accountability is stated | Readers cannot interpret omissions; multi‑view discipline collapses              | Require `viewpointRef` with every face; treat view as projection under viewpoint.            |
| **System‑as‑agent deontics**   | “The system/service SHALL …” used where no accountable role is named | Blurs behavior semantics with enforcement; hides responsibility                   | Rewrite as (`E-*`) behavior/evidence semantics + (`D-*`) duty on implementers/operators.     |
| **One‑doc monoculture**        | Same document mixes laws, gates, duties, and evidence           | Evolvability collapses; updates become all‑or‑nothing                            | Use the stack: separate Signature/Mechanism/Norms/Evidence faces; route by matrix.           |
### Consequences

| Benefits                                                                                                           | Trade‑offs / Mitigations                                                                        |
| ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| **Evolvable boundaries.** Implementations can change while signatures remain stable.                               | More upfront structure; mitigated by MVPK faces that present only relevant slices per audience. |
| **Reduced category mistakes.** Object/description/carrier confusion becomes detectable.                            | Requires discipline in writing; mitigated by the “Where statements go” routing examples.        |
| **Auditability and reproducibility.** Effect claims are tied to evidence carriers; commitments are tied to agents. | Requires evidence surfaces to be designed; mitigated by making `AssuranceLane` (evidence bindings) a standard face.    |
| **Clearer cross‑disciplinary communication.** Legal/compliance deontics no longer compete with math invariants.    | Teams must align on viewpoint responsibilities; mitigated by explicit viewpointRef in MVPK.     |
### Rationale

A boundary is simultaneously:

* a **mathematical object** (signature: operations over vocabulary, governed by laws),
* an **engineering interface description** (stable intent, evolvable implementations),
* a **governance object** (commitments, responsibilities, deontics), and
* an **operational phenomenon** (effects happen only by doing work and observing traces).

If these are mixed, evolution becomes impossible to reason about: every change becomes “semantic”, and every claim becomes unfalsifiable.

The stack creates a default **direction of dependence**: higher layers constrain lower layers, not vice versa. The matrix creates a default **routing** that is not reliant on word choice alone and therefore survives natural‑language variation (“must”, “guarantee”, “valid”, “allowed”).
### SoTA‑Echoing (post‑2015 practice alignment)

> **Informative.** Alignment notes; not normative requirements.

* **Adopt — algebraic effects & handlers / effect systems.** Modern effect systems separate the *signature of operations* from handler semantics (e.g., Koka’s effect typing; mainstream effect handlers in OCaml 5 era). A.6 aligns by keeping the contract surface in `U.Signature` and placing execution semantics in `U.Mechanism`/Realizations, preserving substitution and evolvability.

* **Adopt — session/behavioural types for protocol boundaries.** Post‑2015 practice in behavioural typing treats boundaries as typed interaction protocols with progress/safety properties. A.6’s routing matrix makes “protocol laws” (Quadrant L) explicit and separates entry gates (Quadrant A) from agent duties (Quadrant D) and runtime evidence (Quadrant E), reducing ambiguity.

* **Adapt — categorical optics / lenses / bidirectional transformations.** Contemporary lenses treat boundaries as paired transformations with coherence laws; this mirrors the signature/mechanism split plus cross‑context view morphisms. In FPF, the “projection faces” (views) remain governed by viewpoints, and any cross‑context reuse must remain explicit (Bridge/CL discipline).

* **Adapt — ISO/IEC/IEEE 42010 viewpoint discipline and views‑as‑queries (SysML v2 motif).** A.6 explicitly preserves viewpoint as a first‑class accountability handle: MVPK requires `viewRef` and `viewpointRef`, turning “views” into disciplined projections rather than informal screenshots.

* **Adapt — DDD bounded contexts / microservice contracts.** Modern architecture practice keeps meaning local and makes crossings explicit. A.6’s stack and routing discipline provide a precise placement scheme for what is “inside the context contract” vs “at the entry gate” vs “governance duties” vs “observability evidence”.

* **Adapt — observability as evidence discipline.** Post‑2015 observability practice treats traces/logs/metrics as first‑class evidence surfaces. A.6 places such claims in Quadrant E and ties them to carriers (A.7), preventing “guarantees without telemetry”.

* **Adapt — Markov blankets / active inference as probabilistic boundary views.** Markov‑blanket thinking can help pick observables and diagnose “boundary leaks”, but it does not replace deontics, invariants, or admissibility gates; therefore it is a complementary *view* under a viewpoint, not the primary contract object.
### Relations

* **Implements authoring discipline:** Follows canonical section order and style expectations from E.8.
* **Constrains signature writing:** Reinforces A.6.0 separation of Laws vs operational gates (AdmissibilityConditions live in mechanisms).
* **Constrains mechanism writing:** Aligns with A.6.1 structure (Signature block plus mechanism‑only blocks such as AdmissibilityConditions, Transport, Audit).
* **Requires Object≠Description≠Carrier discipline:** Uses A.7 to prevent category mistakes; ties evidence to carriers and publication faces to descriptions.
* **Operationalises view/viewpoint accountability:** Uses MVPK / `U.MultiViewDescribing` (E.17.0) so each face is a projection under a viewpoint, not a viewpoint‑free snapshot.
* **Unpacks “contract” talk:** Reuses F.18’s promise/utterance/commitment separation to keep agency and responsibility explicit.
* **Connects to signature engineering patterns:** A.6.5 (slot discipline) and A.6.6 (anchor/base discipline) can be read as “constructor/enabling” operations that help *build* well‑formed signatures by disciplined unpacking and grounding (they belong in the same stack discipline because they govern boundary construction).
### A.6:End

---
## A.6.B — Boundary Norm Square (Laws / Admissibility / Deontics / Work‑Effects)

> **Type:** Architectural (A)
> **Status:** Stable
> **Normativity:** Normative (unless explicitly marked informative)
> **Placement:** Part A → A.6.B (matrix module; referenced by A.6 cluster overview)
> **Builds on:** E.8 (authoring template), A.6.0 (`U.Signature`), A.6.1 (`U.Mechanism`), A.6.3 (`U.EpistemicViewing`), E.17.0/E.17 (MVPK + “no new semantics” faces), A.7 (Object≠Description≠Carrier), F.18 (promise/utterance/commitment), E.10.D2 (I/D/S vs Surface), E.10/L‑SURF (Surface token discipline)
> **Purpose (one line):** Provide a canonical 2×2 norm square that classifies boundary statements (L/A/D/E), constrains how each quadrant is written, and defines explicit cross‑quadrant reference rules so boundaries remain evolvable and audit‑ready.

### A.6.B:0 — Conventions

**Keywords.** The key words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, **MAY**, and **SHALL** are to be interpreted as in RFC 2119/8174. Lower‑case “must/may/should” in explanatory prose is descriptive, not normative.

**Quadrant labels.** This pattern uses the routing labels **L / A / D / E** as *statement quadrants*:

* **L** — Laws & Definitions
* **A** — Admissibility & Gates
* **D** — Deontics & Commitments
* **E** — Work‑Effects & Evidence

These labels are **routing labels for statements**, not MVPK face kinds and not pattern identifiers.

**Statement identifiers (recommended).** Routable statements **SHOULD** be given stable IDs with a quadrant prefix: `L-*`, `A-*`, `D-*`, `E-*`. Other sections and views **SHOULD** reference these IDs rather than restating the same constraint in new words.

**Non-collision note (informative).** The `A-*` prefix here is “Admissibility”, not Part‑A numbering and not MVPK’s `AssuranceLane` face kind. If this is a readability hazard in your program, prefer an explicit `G-*` (“Gate”) local convention while keeping the quadrant name “Admissibility”. Also avoid introducing single‑letter mnemonics for MVPK face kinds inside this cluster (MVPK has a legacy L,P,D,E mnemonic); spell face kinds in full to reduce collisions.

**Atomic claim.** An **atomic claim** is a sentence (or bullet) that performs exactly one logical role and is routable to exactly one quadrant. If a sentence mixes roles, it is **not atomic** and **MUST** be split before it can be routed.

**Adjudication substrate (for routing).** For the purposes of this square, an atomic claim is classified by the primary substrate that decides its satisfaction:

* **In‑description / in‑theory**: satisfaction is decided from the description alone (e.g., proof/type validation), or the claim is itself a governance utterance whose content is fully determined by the text.
* **In‑work / in‑execution**: deciding satisfaction requires observing executed work and/or inspecting carriers produced in work.

**Note (important).** `D-*` claims are authored and interpreted in the description; whether they are met is typically established indirectly via referenced `E-*` claims (or other governance procedures). This does not move `D-*` into quadrant E; it clarifies the routing axis.

**Modality family.** A claim is either:

* **Truth‑conditional**: definitions, invariants, typing rules (“is”, “iff”, “∀”).
* **Governance**: permissions, prohibitions, obligations, commitments (“MUST/SHOULD/MAY”, “is permitted”, “is forbidden”, “commits to”).
### A.6.B:1 — Problem frame

Boundary descriptions routinely collapse four distinct claim families into “contract soup”: definitions are written as obligations, runtime gates are hidden inside laws, governance talk is assigned to “the interface”, and “guarantees” are asserted without any evidence story. The resulting boundary is brittle: substitution becomes unclear, and auditability becomes performative rather than adjudicable.

FPF already separates the necessary strata (Signature vs Mechanism, Object≠Description≠Carrier, views under viewpoints). What is still needed is a **single, reusable routing primitive** that any boundary text can apply consistently and that other patterns can cite as a stable authoring module.
### A.6.B:2 — Problem

When authors cannot reliably answer two questions—

1. “Is this a truth‑conditional statement or a governance statement?”
2. “Is it adjudicated by reading the description or by observing work?”

—then boundary statements drift across layers, faces fork semantics, and “compliance” becomes a matter of interpretation rather than a property that can be checked.

A boundary needs a minimal, stable classification that:

* routes every **atomic** statement to a unique quadrant, and
* forces any cross‑quadrant dependencies to be **explicitly referenced**, not smuggled by paraphrase.
### A.6.B:3 — Forces

| Force                              | Tension                                                                                        |
| ---------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Precision vs readability**       | Predicate‑style constraints reduce ambiguity; narrative helps adoption.                        |
| **Evolvability vs enforceability** | Stable laws should not embed volatile runtime gates; governance still needs enforcement hooks. |
| **Auditability vs simplicity**     | Evidence makes claims adjudicable; evidence also introduces operational design obligations.    |
| **Local meaning vs reuse**         | Boundaries must be local; reuse must be explicit via IDs and references, not duplicated prose. |
### Solution — the Boundary Norm Square

#### Two independent distinctions

The **Boundary Norm Square** is the cross product of two independent distinctions:

1. **Modality family:** Truth‑conditional vs Governance
2. **Adjudication locus:** In‑description vs In‑work

The square yields four quadrants that are *mutually exclusive for atomic claims*.
#### A.6.B:4.2 — The square

|                                | **Truth‑conditional** (definitions & invariants) | **Governance** (permissions & obligations) |
| ------------------------------ | ------------------------------------------------ | ------------------------------------------ |
| **In‑description / in‑theory** | **L — Laws & Definitions**                       | **D — Deontics & Commitments**             |
| **In‑work / in‑execution**     | **E — Work‑Effects & Evidence**                  | **A — Admissibility & Gates**              |

**Clarification (do not conflate).** The Governance column includes two different “normative” roles:
* **D** is **agent/role governance** (duties, commitments, prohibitions).
* **A** is **mechanism governance** (permission/admission predicates: what the mechanism admits at application time).
`A-*` is not an obligation on an actor; obligations belong in `D-*` and may reference `A-*`.

**Normative rule (single quadrant).** Each **atomic** claim **MUST** be routable to exactly one quadrant **L/A/D/E**.

**Normative rule (no mixed sentences).** A conforming boundary text **SHALL** decompose any sentence that bundles multiple quadrants (typical form: “MUST … if … then … and it is logged …”) into multiple atomic claims before those claims are treated as normative.
#### A.6.B:4.3 — Canonical landing zones in the Signature Stack

The quadrants have canonical “homes” in the boundary stack:

* **L → Signature layer:** `U.Signature.Laws` (and mechanism‑local semantic laws if present).
* **A → Mechanism layer:** `U.Mechanism.AdmissibilityConditions` (entry gates / runtime permission predicates).
* **D → Norms & commitments layer:** role‑anchored duties, commitments, publication/accountability duties (often rendered inside MVPK `TechCard`).
* **E → Evidence bindings layer:** work‑adjudicated effects tied to carriers and measurement conditions (authored canonically in an Evidence/Carriers section; commonly rendered inside MVPK `AssuranceLane` as a projection).

A published view **MUST NOT** introduce new semantic claims outside this routed claim set. **E.17 (MVPK)** is a specialization that enforces this rule for a fixed set of publication face kinds.
### A.6.B:5 — Quadrant specifications

This section is the normative “API” of the square: what each quadrant is for, how it is written, and what it must not contain.

#### A.6.B:5.1 — Quadrant L: Laws & Definitions

**Intent.** State truth‑conditional content: definitions, invariants, typing/well‑formedness constraints, equational laws.

**Adjudication.** In‑description: can be checked by inspection, proof, type validation, or model reasoning.

**Canonical form.** `Definition:` / `Invariant:` / predicate‑style constraints using “is / iff / for all”.

**Prohibitions.**

* An `L-*` statement **MUST NOT** contain RFC deontic keywords (**MUST/SHALL/SHOULD/MAY**) as operators inside the law/definition itself.
* An `L-*` statement **MUST NOT** encode runtime gate predicates (those are `A-*`).
* An `L-*` statement **MUST NOT** assert evidence availability or measurement outcomes (those are `E-*`).

**A.7 anchoring.** `L-*` claims are **Descriptions**: they specify semantics of the signature/mechanism description, not work.

**Typical dependence.** `A-*` and `E-*` claims may reference `L-*` IDs for vocabulary, metric definitions, and invariants needed for interpretation.
#### A.6.B:5.2 — Quadrant A: Admissibility & Gates

**Intent.** Specify when a mechanism application is permitted/admissible: runtime entry predicates, authorization gates, validity gates, applicability checks that require context or execution environment.

**Common mistake #0 — Applicability ≠ Admissibility (informative).** Signature `Applicability` scopes *intended use/bounded context*; it is not a runtime entry gate. Runtime entry checks and permission predicates belong in `U.Mechanism.AdmissibilityConditions` as `A-*`. If your prose reads like “clients must satisfy the applicability”, you almost certainly want a `D-*` duty + an `A-*` gate (linked by ID) instead.

**Adjudication.** In‑work: evaluated at mechanism entry (or operationally at the point the mechanism is applied).

**Canonical form.** Predicate style, e.g.:

* “A request is admissible iff …”
* `admissible(x) iff P(x)` (conceptual form; no particular syntax is required)

**Prohibitions.**

* An `A-*` statement **MUST NOT** be placed in `U.Signature.Laws`.
* An `A-*` statement **MUST NOT** use RFC deontic keywords as if it were an agent obligation. (It is a gate predicate, not a duty.)
* An `A-*` statement **MUST NOT** claim that evidence exists (that is `E-*`) or that someone must enforce the gate (that is `D-*`).

**A.7 anchoring.** `A-*` claims are **Descriptions** of a mechanism gate. They are not “what a client must do”; they are “what the mechanism admits”.

**Required references (explicit).** If an `A-*` predicate relies on defined terms or invariants, it **SHOULD** reference the relevant `L-*` IDs (or at minimum the signature that defines them).
#### A.6.B:5.3 — Quadrant D: Deontics & Commitments

**Intent.** State governance: obligations, permissions, prohibitions, commitments, publication duties, operational duties, contractual commitments—always with accountable agents/roles.

**Adjudication.** In‑description (governance is stated in the spec); compliance may be audited via `E-*`.

**Canonical form.** A deontic statement **MUST** have an accountable subject (agent/role), e.g.:

* “Client implementers **MUST** satisfy `A-…`.”
* “Operators **SHALL** retain carriers …”
* “Provider **SHALL** meet `E-…` under exclusions …”

**Canonical payload (recommended; lintable).** When a `D-*` claim is intended to be lintable/reusable, it **SHOULD** be representable as a `U.Commitment` record (A.2.8). Default fields to make explicit:

* `id` (often the `D-*` claim ID),
* `subject` (accountable role/party; never an episteme),
* `modality` (BCP‑14/RFC keyword family normalized),
* `scope` + `validityWindow`,
* `referents` (by ID; e.g., `SVC-*`, `L-*`, `A-*`, `E-*`, `MethodDescriptionRef(...)`),
* optional `adjudication.evidenceRefs` when the commitment is meant to be auditable,
* optional `source` when authority/provenance matters.

**Prohibitions.**

* A `D-*` statement **MUST NOT** use “the system/service/interface/spec” as the grammatical subject unless the accountable role/party is explicitly named (so the statement is representable as a `U.Commitment` with an explicit `subject`, A.2.8). (**F.18** is a lexical anchor only.)
* A `D-*` statement **MUST NOT** restate `L-*` or `A-*` predicates in new words when an ID exists; it **SHOULD** reference the ID.
* A `D-*` statement **MUST NOT** pretend that commitments are laws. A commitment is an agent relation, not a truth‑conditional invariant.

**A.7 anchoring.** `D-*` claims are primarily **about Objects** (roles/agents and their duties) or **about Carriers** (retention/exposure duties), but they are still written as **Descriptions**.

**Required references (explicit).**

* If a `D-*` statement imposes compliance with a gate, it **MUST** reference the relevant `A-*` ID(s).
* If a `D-*` statement is meant to be auditable, it **SHOULD** reference the `E-*` claim(s) that provide evidence and the carrier classes involved.
#### A.6.B:5.4 — Quadrant E: Work‑Effects & Evidence

**Intent.** State what happens in work and how it can be evidenced: observed effects, emitted events, traces/logs/metrics, produced reports, measurement outcomes.

**Adjudication.** In‑work: checked by running/operating and inspecting carriers produced in work.

**Canonical form.** An `E-*` statement **SHOULD** include the minimum fields needed for adjudication:

1. **Observation/measurement conditions** (when/where/how observed; workload/window; triggers)
2. **Carrier class/schema reference** (A.7 Carrier) that bears the evidence
3. **Viewpoint/consumer** (who uses this evidence and why; ties to `viewpointRef` discipline)

**Prohibitions.**

* `E-*` statements **SHOULD NOT** use RFC deontic keywords (they are not obligations; they describe adjudicable effects/evidence).
* An `E-*` statement **MUST NOT** hide a gate predicate; gate predicates are `A-*`.
* An `E-*` statement **MUST NOT** assign agency (“the interface guarantees …”); if enforceability/commitment is intended, express it as `D-*` referencing the `E-*`.

**A.7 anchoring.** `E-*` claims are primarily **Carrier‑anchored**: they assert what carriers exist and how they relate to observed work.

**Required references (explicit).**

* If the effect/evidence is conditioned on a gate decision, the `E-*` statement **SHOULD** reference the relevant `A-*` ID(s).
* If the evidence is interpreted using metric definitions or invariants, the `E-*` statement **SHOULD** reference relevant `L-*` ID(s).
### A.6.B:6 — Cross‑quadrant link discipline

The square is not just classification; it is a **dependency discipline**. Claims often depend on each other; such dependencies **MUST** be explicit (by claim ID) rather than duplicated prose.

#### A.6.B:6.1 — Explicit reference rule

If a claim’s meaning materially depends on another routed claim, that dependency **MUST** be represented as an explicit reference to the other claim’s ID (or to the canonical location where it lives), rather than by restating it.

**Guideline (informative).** Treat this as “import hygiene” for prose: reuse by reference, not by copy.
#### A.6.B:6.2 — Canonical cross‑quadrant dependency patterns

These patterns are allowed (and common). The square becomes operational when these links are used systematically.

##### (D → A) Duty-to-gate linkage

When governance requires someone to comply with a gate:

* `D-*`: “Role **MUST** satisfy/enforce `A-*`.”

This separates **what is admissible** (A) from **who is responsible** (D).
##### (E → A) Evidence-for-gate linkage

When gate decisions must be observable:

* `E-*`: “On rejection/acceptance due to `A-*`, carrier `C` is produced/observable under conditions …”

This separates **gate semantics** (A) from **evidence semantics** (E).
##### (D → E) Duty-to-evidence linkage

When governance requires evidence production/retention/exposure or commits to measured properties:

* `D-*`: “Role **MUST** retain/expose carrier class `C` used by `E-*` …”
* `D-*`: “Provider **SHALL** meet `E-*` under exclusions …”

This separates **obligation/commitment** (D) from **adjudication** (E).
##### (A/E → L) Semantic grounding linkage

When a gate predicate or measurement relies on definitions/invariants:

* `A-*` / `E-*` references `L-*` that define terms/metrics.

This prevents “metric drift” and “definition drift” across views.
##### (D → L) Governance-to-definition linkage

When an obligation/commitment relies on precise term or metric meanings:

* `D-*` references `L-*` that define the terms/metrics it uses.

This keeps governance text from accidentally redefining semantics in prose.
#### A.6.B:6.3 — The “triangle decomposition” for mixed sentences

**Normative rule (decomposition).** A conforming boundary text **SHALL** decompose any mixed sentence that expresses (i) an entry condition, (ii) an obligation to satisfy/enforce it, and (iii) an observability expectation into the three quadrants:

* **A:** admissibility predicate (`A-*`)
* **D:** duty/commitment referencing the gate (`D-* → A-*`)
* **E:** evidence binding referencing the gate (and carriers) (`E-* → A-*`)

This is the canonical repair for “contract soup” around validity, authorization, compliance, audit, and security boundaries.
#### A.6.B:6.4 — Dependency direction (no “upward” imports)

The square is intended to preserve **layered modularity**: semantics should not depend on governance text, and evidence semantics should not depend on duties.

**Normative rule (no upward dependencies).**

* `L-*` claims **MUST NOT** depend on or reference `A-*`, `D-*`, or `E-*` claims (except for purely informative notes explicitly marked informative).
* `A-*` claims **MUST NOT** depend on or reference `D-*` claims. (`A-*` may reference `L-*` for defined terms/invariants.)
* `E-*` claims **MUST NOT** depend on or reference `D-*` claims. (`E-*` may reference `A-*` for conditioning and `L-*` for metric/term meanings.)
* `D-*` claims **MAY** reference `L-*`, `A-*`, and/or `E-*` claims as needed, and **SHOULD** do so by ID rather than restating content.

**Rationale (informative).** This keeps foundational meaning stable (L), keeps runtime gates independent of governance prose (A), and keeps evidence semantics independent of enforcement policy (E). Governance (D) is the place where “who must do what, using which gates and which evidence” is assembled.
### A.6.B:7 — Mini‑artifact: Claim Register (informative, recommended)

A Claim Register is a drift‑control device that lists every routable statement verbatim with routing metadata. It is not a new semantic layer.

| ID | Quadrant | Statement (verbatim) | Canonical location (section/artefact) | Stack layer | A.7 primary layer | viewRef | viewpointRef | References | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Guidance (informative):
* The **Statement** cell should contain the normative text as authored (copy/paste), not a paraphrase.
* **Canonical location** should point to the one place the statement “lives” (e.g., `Signature.Laws`, `Mechanism.AdmissibilityConditions`, `TechCard.NormsCommitments`, `Evidence.Carriers`), so other faces can cite it by ID.
* **Stack layer** should be one of `{Signature, Mechanism, Norms/Commitments, Evidence/Carriers}` to make routing auditable.
* **A.7 primary layer** is the claim’s *primary referent* (`Object`, `Description`, or `Carrier`), even though the claim is always written as a Description.
* Use **References** for explicit cross‑quadrant links (e.g., which `D-*` enforces which `A-*`, which `E-*` adjudicates which commitments, which `L-*` defines a metric used by `E-*`) and for external standards/policies where applicable.
### Archetypal Grounding (Tell–Show–Show)

> **Informative.** Examples for learning the square; they do not add requirements beyond A.6.B:10.

#### Tell (universal rule)

A boundary remains evolvable and auditable when every normative statement is decomposed into atomic claims, each claim is routed to exactly one quadrant of the Boundary Norm Square, and cross‑quadrant dependencies are expressed by explicit claim‑ID references rather than paraphrase.
#### Show #1: Effect signature vs handler (post‑2015 effect systems)

A service boundary naturally mirrors **algebraic effects & handlers** practice (popularized broadly in the post‑2015 era, with mainstream effect handlers becoming especially prominent around OCaml 5):

* **L:** defines the operation vocabulary and laws (effect signature semantics).
* **A:** defines when the operation is admissible (runtime guard predicates).
* **D:** states who must enforce guards and what the provider commits to (operator/implementer duties; SLAs).
* **E:** ties “what happened” to observable carriers (traces/logs/metrics/events) so commitments can be adjudicated.

The square prevents accidentally writing handler obligations as laws or treating observability as a definition.
#### Show #2: ML evaluation protocol boundary (reproducibility discipline)

A published “evaluation protocol” boundary (common in modern ML governance) benefits from strict routing:

* **L:** metric definitions and invariants (e.g., what counts as AUROC; data partition invariants).
* **A:** admissibility gates (dataset license constraints; pinned environment constraints; seed policy).
* **D:** reviewer and author duties (publish required faces; use declared dataset version; retention duties for run artifacts).
* **E:** evidence carriers (run logs, hashes, reports, trace IDs) and adjudication conditions (which viewpoint measures, what windows).

The square keeps “must use dataset vX” (D) separate from “evaluation is admissible iff dataset license matches” (A), and both separate from “a run produced report carrier R with hash h” (E).
#### A.6.B:8.4 — Worked Rewrite Kit (informative, recommended)

> **Informative.** This kit is a worked, copy‑pasteable restatement of A.6.B’s rules (atomicity, L/A/D/E routing, explicit references, triangle decomposition, and no‑upward dependencies). If anything here conflicts with A.6.B, **A.6.B is authoritative**.

##### Goal

Convert a boundary-ish sentence that mixes “laws / gates / duties / evidence” into:

1. **atomic routed claims** (L/A/D/E),
2. **explicit references by claim ID** (no paraphrase duplication),
3. **a readable recomposition** (Tech + Plain),
4. **a minimal anti-pattern lint** (things we forbid / flag).
##### Micro-procedure (Atomize → Route → Triangle → Link → Anchor → Recompose)

**Step 1 — Atomize.** Split mixed prose into atomic claims; each must route to exactly one quadrant.

**Step 2 — Route (L/A/D/E).**

* **L** if the claim is **truth‑conditional** and adjudicable *in‑description* (inspection, proof/type validation, or model reasoning **over declared assumptions**): definitions, invariants, typing/well‑formedness constraints.  
  **Guardrails:** `L-*` MUST NOT (i) use RFC deontic keywords as operators, (ii) encode runtime entry predicates (those are `A-*`), or (iii) assert evidence existence/measurement outcomes (those are `E-*`).
* **A** if it is an *in‑work* **gate predicate**: what the mechanism admits/permits at application time (“admissible iff …”). It is not a duty and MUST NOT be phrased as one.  
  **Guardrails:** `A-*` SHOULD be written in predicate form and MUST NOT (i) use RFC deontic keywords as if it were an agent obligation, (ii) claim that evidence/carriers exist (that is `E-*`), or (iii) assign responsibility/enforcement (that is `D-*`).  
  *(Do not confuse this with `Signature.Applicability`: applicability scopes intended meaning/use; it is not a runtime entry gate.)*
* **D** if it assigns **duties/commitments** to an accountable role/agent (RFC keywords belong here; “the interface/system promises” does not).  
  **Guardrails:** `D-*` MUST name an accountable subject and SHOULD reference `L-*`/`A-*`/`E-*` by ID rather than restating them in new words (to prevent paraphrase drift).
* **E** if it is an *in‑work* truth‑conditional claim about adjudicable effects/evidence: what carriers exist, under what observation conditions, and/or what was observed.  
  **Minimum fields (recommended):** (1) observation/measurement conditions, (2) carrier class/schema reference, and (3) viewpoint/consumer.  
  **Guardrails:** `E-*` SHOULD NOT use RFC deontic keywords, MUST NOT hide a gate predicate (that is `A-*`), and MUST NOT cite `D-*`.  
  *(If the sentence is “Role SHALL measure/retain/expose …”, route that obligation to **D**, even if it is about evidence.)*

**Step 3 — Triangle decomposition.** If the original sentence mixes (i) an entry condition, (ii) an obligation/commitment, and (iii) an observability expectation (a common failure mode with “guarantee/ensure/approved/aligned”), decompose it into:

* **A**: the admissibility predicate (what must be true to treat the claim as applicable),
* **D → A**: who is responsible for keeping/ensuring the predicate,
* **E → A**: what evidence/traces are used to adjudicate the predicate.

**Note (routing sanity).** `D-*` claims are authored in the description even when their compliance is audited via `E-*` claims. Auditing via evidence does not move `D-*` into quadrant E.

**Guideline.** Keep gate semantics independent of specific evidence carriers: write the gate predicate in `A-*`, then bind observability in `E-*` that references the gate (`E → A`). `A-*` claims MUST NOT reference `E-*` (no upward dependencies), even though `E-*` is used to adjudicate gate satisfaction.

**Step 4 — Link by ID, not by paraphrase.** Allowed directions (no upward deps):

* `A-*` may cite `L-*`
* `E-*` may cite `L-*` and `A-*`
* `D-*` may cite `L-*`, `A-*`, `E-*`
* Forbidden: `L-*` citing anything; `A-*` or `E-*` citing `D-*`.

**Common link motifs (informative).** The most reusable boundary rewrites use the canonical motifs: `D→A`, `E→A`, `D→E`, `A/E→L`, and `D→L`.

**Step 5 — Anchor (minimal A.7 discipline).**

* Anchor **L** claims in `Signature.Laws` (and mechanism‑local semantic laws if present), and **A** claims in `Mechanism.AdmissibilityConditions`.
* Anchor **D** claims to accountable roles/agents and prefer ID references (no restatement of `L-*` / `A-*` content in new words).
* Anchor **E** claims to carriers + observation conditions and **SHOULD** include viewpoint/consumer (minimum: conditions + carrier class/schema + consumer/viewpoint).

**Optional drift-control.** Add each routed claim verbatim to a Claim Register row (A.6.B:7) with canonical location + references so faces can cite by ID without paraphrase.

**Step 6 — Recompose into readable text.**
Produce two surfaces:

* **Tech surface**: a short **routed claim bundle** (sometimes called a “contract skeleton”) listing routed claims + ID references.
* **Plain surface**: a one-paragraph narrative that *summarizes* the bundle and points to IDs (**no new semantics**). If you need a new constraint, add a new atomic routed claim; do not smuggle it into Plain.
##### Anti-pattern (quick)

* **AP-1 Evidence-free guarantees.** “X guarantees Y” with no E-claims.
* **AP-2 Interface-as-promiser.** Non-agent objects “promise/commit”.
* **AP-3 Gate-as-evidence.** Treating the gate predicate (A) as if it were an observation (E).
* **AP-4 Gate-as-law.** Entry predicates as signature “laws/definitions” (L) instead of `A-*`.
* **AP-5 Adjective smuggling.** “fast/secure/approved/aligned” used instead of qualifiers/slots.
* **AP-6 Paraphrase drift.** Restating L/A content in D or E with changed meaning (instead of citing by ID).
* **AP-7 Deontics in predicates.** RFC keywords (“MUST/SHALL/…”) used as operators inside `L-*` or `A-*` predicates (should be `D-*` that references `L-*`/`A-*`).
* **AP-8 View-fork semantics.** Recomposition/face text introduces new `L/A/D/E` meaning not present in the routed claim set (violates “no new semantics” discipline).
* **AP-9 Applicability-as-gate.** Using `Signature.Applicability` (intended use) as a substitute for `A-*` runtime admission predicates.
##### Example 1 — Software engineering (SLO-ish API latency)

###### Draft sentence (non-conformant)

> “This API guarantees p95 latency < 200ms.”
###### Atomize + Route (L/A/D/E)

**L-API-01 (Definition).**
`p95_latency(window W, population P, unit U, method M)` is defined as … (formal measurement definition).
*(Lives in Signature.Laws or a referenced measurement definition pack.)*

**L-API-02 (Interface signature).**
The API endpoints and parameters are as declared (including parameter passing discipline / units).
*(Signature-level structure.)*

**A-API-01 (Gate predicate: admissibility).**
The claim “p95 < 200ms” is admissible **only under** declared load/profile + deployment region + sampling method + window:
`AdmissibleLatencyClaim := (region=US) ∧ (concurrency≤X) ∧ (payload≤Y) ∧ (W=5m) ∧ (M=HDRHistogram@v…) ∧ (P=requests that match filter F)`
*(References L-API-01 for definition.)*

**D-API-01 (Commitment).**
`ServiceOwner` SHALL meet the latency target `p95_latency < 200ms` when `A-API-01` holds, adjudicated per `L-API-01` using the carriers/observation conditions in `E-API-01`.
*(References L-API-01 and A-API-01 by ID; does not restate them.)*

**D-API-02 (Operational duty).**
`SRE_oncall` SHALL publish incident notes when the commitment `D-API-01` is violated, and SHALL avoid claiming compliance outside `A-API-01`.
*(References D-API-01 and A-API-01 by ID.)*

**E-API-01 (Evidence / carriers).**
For decisions under `A-API-01`, the following carrier **classes** are produced/observable under the declared observation conditions: trace/span IDs, raw histogram artefacts (schema reference), percentile dashboard snapshots, and pinned sampling configuration for window `W`.  
**Observation conditions (minimum):** workload/profile selector, sampling method/config pins, and computation method reference (`L-API-01`).  
**Viewpoint/consumer (minimum):** the role/view that uses the carriers to adjudicate the gate and/or audit commitments (e.g., SRE/PerfReview).  
*(References `A-API-01` and `L-API-01`; avoids RFC deontics; does not smuggle gates. Note: `E-*` MUST NOT cite `D-*`.)*

**D-API-03 (Duty-to-evidence linkage).**
`Operators` SHALL retain/expose the carrier classes referenced in `E-API-01` for the audit window required by policy.
*(References E-API-01 by ID.)*

**E-API-02 (Observed value claim).**
For interval `Γ_time = [t1..t2]` under conditions pinned to `A-API-01` and using carriers in `E-API-01`, observed `p95_latency = 173ms` (computed per `L-API-01`).
*(References A-API-01, L-API-01 and E-API-01.)*
###### Triangle decomposition (explicit)

* **A-API-01** is “the predicate”.
* **D-API-01 → A-API-01** states the commitment under the gate/envelope.
* **E-API-01 → A-API-01** anchors adjudication (carriers used to decide the gate/commitment).
* **D-API-03 → E-API-01** expresses retention/exposure obligations for those carriers.
###### Readable recomposition

**Tech recomposition (contract bundle, short):**

* `L-API-01` defines p95 latency computation.
* `A-API-01` specifies when the latency claim is admissible.
* `D-API-01` states the commitment under that envelope.
* `E-API-01` lists adjudicable carriers/conditions used to adjudicate `A-API-01` (and therefore any commitments that reference it).
* `D-API-02` assigns operational incident-note duties.
* `D-API-03` assigns retention/exposure duties for carriers in `E-API-01`.
* `E-API-02` reports observed performance under `A-API-01` for `Γ_time=[t1..t2]`.

**Plain recomposition (one paragraph, readable):**
“The API’s latency target uses the p95 definition in **L-API-01** and is only applicable under the declared operating envelope **A-API-01**. The service owner commits to meeting the <200ms target under that envelope (**D-API-01**). Adjudication uses the telemetry carriers listed in **E-API-01**, which operators must retain/expose (**D-API-03**), and the on-call SRE must publish incident notes when the commitment is violated (**D-API-02**). Under that envelope, the observed p95 over `Γ_time=[t1..t2]` was `173ms` (**E-API-02**).”
##### Example 2 — Mechanical engineering (fit / coaxiality)

###### Draft sentence (non-conformant)

> “This fit ensures coaxiality.”
###### Atomize + Route

**L-FIT-01 (Definition).**
`coaxiality` is defined relative to a declared base axis and measurement method (datum scheme, instrument, tolerance zone).
*(Truth-conditional: “what it means”.)*

**L-FIT-02 (Interface/boundary structure).**
The boundary relation involves shaft, bushing, datum axis, tolerance class, temperature window, assembly procedure class.
*(Signature-level arity recovery / slots.)*

**A-FIT-01 (Gate predicate).**
The coaxiality claim is admissible only if manufacturing and assembly satisfy the declared process envelope: material batch, temperature window, tool calibration validity, surface finish class, alignment procedure version.
*(Gate predicate; can be checked using evidence, but is not itself evidence.)*

**D-FIT-01 (Duty).**
`ProcessEngineer` SHALL ensure A-FIT-01 holds for the production lot and SHALL not release the lot for use when A-FIT-01 is false.
*(References A-FIT-01.)*

**E-FIT-01 (Evidence carriers).**
Evidence carriers used to adjudicate `A-FIT-01` include CMM reports, tool calibration certificates, assembly logs, temperature traces, and datum scheme pins.
*(References A-FIT-01 and L-FIT-01; avoids RFC deontics.)*

**D-FIT-02 (Duty-to-evidence linkage).**
`QualityEngineer` SHALL retain/expose the carriers referenced in `E-FIT-01` for the production lot.
*(References E-FIT-01 by ID.)*

**E-FIT-02 (Observed).**
For lot `L123` and window `Γ_time=[t1..t2]`, under conditions pinned to `A-FIT-01` and using carriers in `E-FIT-01`, measured coaxiality was within tolerance zone `T` (interpreted per `L-FIT-01`).
*(References A-FIT-01, L-FIT-01, and E-FIT-01.)*
###### Readable recomposition

**Tech bundle:**

* Meaning of coaxiality: `L-FIT-01`.
* Boundary arity/participants: `L-FIT-02`.
* When the claim is admissible: `A-FIT-01`.
* Who is responsible: `D-FIT-01`.
* What we observe and keep as carriers: `E-FIT-01` and measured outcome `E-FIT-02` (with retention duty `D-FIT-02`).

**Plain paragraph:**
“‘Ensures coaxiality’ is made precise by fixing the definition and datum scheme (**L-FIT-01**) and by making the boundary participants explicit (**L-FIT-02**). The coaxiality claim is only applicable under the declared manufacturing/assembly envelope (**A-FIT-01**), which the process engineer is accountable for maintaining (**D-FIT-01**). Compliance is adjudicated using the measurement and process carriers listed in **E-FIT-01**; for lot `L123` over `Γ_time=[t1..t2]`, the observed coaxiality was within tolerance **E-FIT-02**.”
##### Example 3 — Management (project “approved/aligned”)

###### Draft sentence (non-conformant)

> “The project is approved.”
###### Atomize + Route

**L-PRJ-01 (Definition).**
`approved(project, approvalKind)` is defined as a relation kind; approval kinds include: “sponsor-signoff”, “stage-gate-pass”, “budget-authorized”, “staffing-assigned”, etc.
*(Truth-conditional: disambiguates kind and polarity.)*

**A-PRJ-01 (Gate predicate: stage entry).**
For starting execution work, `ExecutionAdmissible(project)` holds iff required approvals are present *and* required prerequisites are satisfied (e.g., risk review completed, budget line exists, key roles staffed).
*(This is the real “may start work” gate; references L-PRJ-01 for what counts as approvals.)*

**D-PRJ-01 (Duty).**
`ProjectOwner` SHALL not initiate execution unless `A-PRJ-01` holds, SHALL keep the approval registry current, and SHALL retain/expose the evidence carriers referenced in `E-PRJ-01`.
*(References A-PRJ-01 and E-PRJ-01 by ID.)*

**E-PRJ-01 (Evidence carriers).**
Evidence carriers used to adjudicate `A-PRJ-01` include: signed decision record IDs, meeting minutes pins, budget system references, staffing assignment records, and gate checklist snapshots.
*(References A-PRJ-01; avoids RFC deontics.)*

**E-PRJ-02 (Observed state).**
As of `Γ_time=snapshot(t)`, a resolvable gate-status carrier (e.g., `GateChecklistSnapshot#…`) indicates `A-PRJ-01` holds, with the referenced evidence set pinned as `{DecisionRecord#…, BudgetLine#…, StaffingAssignments#…}` (carrier classes as per `E-PRJ-01`).  
*(Observed / pinned state; references `A-PRJ-01` and `E-PRJ-01`; includes carrier instance(s), not just carrier classes.)*
###### Readable recomposition

**Tech bundle:**

* “Approved” is not one relation: `L-PRJ-01` defines approval kinds.
* “May start execution” is a gate predicate: `A-PRJ-01`.
* Owner accountability: `D-PRJ-01`.
* Carriers and adjudication: `E-PRJ-01` and observed snapshot `E-PRJ-02`.

**Plain paragraph:**
“Instead of a generic ‘approved’, we select an explicit approval kind as defined in **L-PRJ-01** and treat ‘may start execution’ as an admissibility gate (**A-PRJ-01**). The project owner is accountable for not starting execution unless that gate holds and for keeping the approval registry current (**D-PRJ-01**). Gate status is adjudicated using the pinned carriers listed in **E-PRJ-01**; as of snapshot `t`, the evidence indicates the gate holds (**E-PRJ-02**).”
##### A compact “recomposition pattern” you can reuse verbatim

###### Tech register (2–5 lines)

> “This boundary claim is defined by **L-…**, is applicable only under **A-…**, is accountable under **D-…**, and is adjudicated using evidence carriers **E-…**. Observed status/value is **E-…** for `Γ_time=…`.”
###### Plain register (1 paragraph)

> “We mean **[short label]** in the sense of **L-…**. It’s only meant to be used when **A-…** holds. **[Role]** is responsible for maintaining that condition (**D-…**). Whether it holds is checked using **E-…**, and the latest recorded status/value is **E-…**.”
### A.6.B:9 — Bias‑Annotation

Lenses tested: **Gov**, **Arch**, **Onto/Epist**, **Prag**, **Did**. Scope: **Universal** for boundary descriptions.

* **Arch bias:** favors explicit separation and explicit references; mitigated by allowing narrative faces while keeping commitments routed and referenced by ID.
* **Gov bias:** makes accountability explicit (D) and auditability explicit (E); mitigated by keeping evidence conceptual and carrier‑anchored rather than tool‑specific.
* **Onto/Epist bias:** insists on Object≠Description≠Carrier and on work‑adjudicated effects; mitigated by providing clear cross‑quadrant link patterns so authors can still express real‑world governance needs.
### A.6.B:10 — Conformance Checklist

| ID                                       | Requirement                                                                                                                                                                                                      | Purpose                                                  |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **CC‑A.6.B.1 (Atomicity).**              | A conforming boundary text **SHALL** decompose mixed sentences into **atomic claims** such that each atomic claim routes to exactly one quadrant **L/A/D/E**.                                                    | Makes routing unambiguous; prevents contract soup.       |
| **CC‑A.6.B.2 (Quadrant routing).**       | Each atomic claim **MUST** be classified by the Boundary Norm Square and placed in its canonical landing zone (L→Signature.Laws; A→Mechanism.AdmissibilityConditions; D→Norms/Commitments; E→Evidence/Carriers). | Preserves stack modularity and evolvability.             |
| **CC‑A.6.B.3 (Form constraints).**       | `L-*` and `A-*` claims **MUST NOT** contain RFC deontic keywords as operators; `D-*` claims **MUST** name an accountable agent/role; `E-*` claims **SHOULD NOT** use RFC deontic keywords.                       | Keeps modalities separated and audit‑ready.              |
| **CC‑A.6.B.4 (Explicit references).**    | Where a claim depends on another routed claim, that dependency **MUST** be expressed by explicit ID reference rather than restating the other claim in new words.                                                | Prevents paraphrase drift across layers/faces.           |
| **CC‑A.6.B.5 (E‑claim adjudicability).** | Each `E-*` claim **SHOULD** include (a) observation conditions, (b) carrier class/schema reference, and (c) viewpoint/consumer.                                                                                  | Makes work‑effects adjudicable rather than aspirational. |
| **CC‑A.6.B.6 (No gate smuggling).**      | Operational admissibility predicates **MUST NOT** appear as `L-*` laws in the signature layer; they **MUST** be `A-*` claims in the mechanism layer.                                                             | Preserves substitution and signature stability.          |
| **CC‑A.6.B.7 (No upward dependencies).** | `L-*` claims **MUST NOT** reference `A-*`, `D-*`, or `E-*`; `A-*` and `E-*` claims **MUST NOT** reference `D-*`.                                                                                                   | Preserves layering and prevents hidden coupling.         |
### Common Anti‑Patterns and How to Avoid Them

| Anti‑pattern                 | Symptom                                            | Why it fails                                                | Repair (square‑consistent)                                                                  |
| ---------------------------- | -------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **Gate‑as‑law**              | Preconditions written as “laws”                    | Collapses signature/mechanism boundary; breaks substitution | Move to `A-*` in Mechanism.AdmissibilityConditions; reference `L-*` terms.                  |
| **Deontics in predicates**   | “MUST” inside definitions or gates                 | Confuses governance with truth/admissibility                | Rewrite as `L-*`/`A-*` predicate; add `D-*` duty referencing it.                            |
| **Interface‑as‑promiser**    | “The API promises/guarantees …”                    | Category error (F.18): epistemes don’t promise              | Identify committing role (`D-*`), measured property (`E-*`), and metric definition (`L-*`). |
| **Evidence‑free guarantees** | “Guaranteed p95 latency” with no measurement story | Unadjudicable; turns into marketing                         | Create `E-*` with carriers + conditions; link commitment as `D-* → E-*`.                    |
| **Paraphrase drift**         | Same rule restated across faces                    | Divergence becomes invisible                                | Use IDs; faces cite IDs; optional Claim Register.                                           |
| **View‑fork semantics**      | A face introduces new L/A/D/E content              | Violates “no new semantics” publication discipline          | Move new claim into canonical layer (L/A/D/E) or mark as informative only.                  |
### A.6.B:12 — Consequences

| Benefits                                                                                                     | Trade‑offs / mitigations                                                                         |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| **Stable modular boundaries.** Laws don’t accidentally become gates; governance doesn’t masquerade as truth. | Requires writers to split sentences; mitigated by the triangle decomposition pattern.            |
| **Auditability by construction.** Commitments can be linked to adjudicable evidence carriers.                | Requires evidence to be designed; mitigated by keeping evidence conceptual and carrier‑anchored. |
| **Reduced semantic drift across faces.** IDs + explicit references prevent accidental divergence.            | More cross‑references; mitigated by a Claim Register (optional but recommended).                 |
### A.6.B:13 — Rationale

The square is the smallest authoring primitive that forces an explicit choice along two axes that are otherwise routinely conflated:

* **Truth vs governance** (what is the case vs what is required/committed), and
* **Description vs work** (what can be decided by reading vs what must be decided by observing execution).

By requiring atomicity and explicit cross‑quadrant references, the square converts “contract talk” into a set of routed, evolvable claims with clear adjudication semantics.
### A.6.B:14 — SoTA‑Echoing (post‑2015 practice alignment)

> **Informative.** Alignment notes; not normative requirements.

**Representative sources (post‑2015; illustrative).** See also A.6:11 for a fuller list.
* ISO/IEC/IEEE 42010:2022 (view/viewpoint discipline).
* Leijen (2017) / Hillerström & Lindley (2018) (effects & handlers).
* OpenTelemetry Specification (v1.0+, 2021–) (evidence carriers as traces/logs/metrics).

* **Effect systems & handlers:** clear separation between operation signature (L) and handler/runtime behavior (A/E), with governance duties (D) attached to accountable operators/implementers.
* **Behavioural/session typing:** protocol laws (L) and admissibility (A) remain distinct from commitments (D) and runtime traces (E), improving interpretability of “progress/safety” style boundary guarantees.
* **SRE/observability discipline:** treating traces/logs/metrics as evidence carriers (E) and separating evidence semantics from retention/exposure duties (D) mirrors contemporary operational practice while staying tool‑agnostic.
### A.6.B:15 — Relations

* **Used by A.6:** supplies the canonical matrix and cross‑quadrant link discipline that A.6 references as “Boundary Discipline Matrix”.
* **Constrains A.6.0 (`U.Signature`):** enforces that `L-*` laws are truth‑conditional and do not include admissibility predicates.
* **Constrains A.6.1 (`U.Mechanism`):** enforces that admissibility lives in `AdmissibilityConditions` (`A-*`) and that evidence semantics are routed as `E-*` with carrier anchors.
* **Requires A.7:** anchors quadrants to Object/Description/Carrier so agency and evidence are not misattributed.
* **Interacts with MVPK/E.17:** faces are projections that cite routed claims; faces must not mint new semantic commitments.
### A.6.B:End
## A.6.C — Contract Unpacking for Boundaries

> **Type:** Architectural (A)
> **Status:** Stable
> **Normativity:** Normative (unless explicitly marked informative)
> **Placement:** Part A → **A.6 Signature Stack & Boundary Discipline**
> **Builds on:** A.6 (stack + routing intent), **A.6.B** (L/A/D/E), **A.6.8 (RPR‑SERV)** (service‑cluster polysemy unpacking), **A.7** (Object≠Description≠Carrier), **A.2.3** (`U.PromiseContent` / promise content), **A.2.4** (`U.EvidenceRole`), **A.2.8** (`U.Commitment`), **A.2.9** (`U.SpeechAct`), **A.15.1** (`U.Work`), E.10 (L‑SERV / LEX‑BUNDLE), E.17 (MVPK “no new semantics” faces), F.12 (service acceptance/evidence discipline)
> **Lexical anchor:** **F.18** (NQD front for the *service (promise) / utterance / commitment* triad; naming, not ontology)
> **Mint/reuse (terminology):** Reuses “contract / SLA / guarantee” as Plain-level boundary shorthand; mints **Contract Bundle** as an unpacking lens (not a new entity kind), plus optional register columns (`bundleId` / `bundlePart` / `faceRefs`). **NQD-front seeds (informative):** contract packet, agreement bundle, boundary bundle (chosen: *Contract Bundle* for low collision with existing “bundle” terms).
> **Purpose (one line):** Prevent “contract soup” and agency misattribution by unpacking contract-language into distinct promise‑content, utterance package, commitment, and work+evidence (adjudication substrate) parts and routing each part into the Boundary Norm Square.

### A.6.C:1 — Problem frame

Boundary descriptions frequently use “contract” as a shorthand for “the thing that governs the interaction”. That shorthand is useful in conversation, but it collapses distinct layers that FPF deliberately keeps separate:

* **Promise-level intent** (what is promised to be true or provided),
* **Published description** (what is written and versioned),
 * **Deontic commitment relation** (who is accountable for which obligations/permissions),
* **Operational work and evidence** (what actually happens and what can be observed).

When these layers are collapsed, authors accidentally assign agency to epistemes (“the interface guarantees…”), encode runtime gates as if they were internal laws, or treat observability as a property of text rather than of carriers and work. A.6 and A.6.B already provide a routing discipline (L/A/D/E) for boundary claims, but “contract” language remains a recurring entry point for category mistakes.

**Service-cluster note (modularity + lexicon).** Boundary “contract talk” commonly co‑moves with the *service* cluster (*service*, *service provider*, *server*, *SLA/SLO/service‑level*). When those tokens appear, their referents MUST be disambiguated per **A.6.8 (RPR‑SERV)** before (or while) applying the four‑part Contract Bundle below. In particular, `U.PromiseContent` is promise content and is written in normative prose as **promise content** (not as bare “service”).

A.6.C makes contract-language usable inside the A.6 stack by providing a canonical unpacking that can be applied to APIs, hardware interfaces, protocols, and socio-technical boundaries.

**Non‑goals (to preserve modularity).** A.6.C does **not**:
* define “legal contract” doctrine (offer/acceptance/consideration, jurisdictional enforceability, etc.);
* resolve conflicts between incompatible commitments across scales/contexts (capture them as separate `D-*` claims and route to conflict/mediation patterns when they exist);
* redefine the core meanings of `U.PromiseContent`, `U.Work`, `U.SpeechAct`, or `U.Commitment`—it only makes “contract talk” routable into those objects/claims.
* redefine quadrant semantics (`L/A/D/E`) or cross‑quadrant reference rules; those are defined normatively in A.6.B.
### A.6.C:2 — Problem

How can an author write (or repair) contract-language so that:

1. **Agency is not misattributed** to descriptions (signatures, docs, specs, “interfaces”),
2. **Governance statements** (obligations/commitments) are distinguishable from **admissibility gates** and from **semantic laws**,
3. **Operational “guarantees”** become adjudicable via explicit evidence expectations, without smuggling evidence into semantics,
4. **Multi-view publication** (MVPK faces) does not create “multiple contracts” by paraphrase drift?
### A.6.C:3 — Forces

| Force                      | Tension                                                                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Conversational convenience | People will keep saying “contract”; banning the term is unrealistic.                                                                              |
| Ontological correctness    | “Contract” is a metaphor unless we explicitly locate who promises/commits and what can be evidenced.                                              |
| Boundary diversity         | Software APIs, hardware connectors, protocols, and SLAs share the “contract” word but differ in what is adjudicated and how.                      |
| Multi-view publication     | Faces are necessary for audience fit, but rephrasing easily creates new commitments.                                                              |
| Adjudicability             | “Guarantee” claims must either be (i) semantic truths, (ii) deontic commitments, or (iii) evidenced properties—otherwise they are empty rhetoric. |
| Minimality                 | The unpacking should be lightweight enough to apply during routine authoring and review.                                                          |
### A.6.C:4 — Solution

A.6.C introduces a **Contract Bundle** lens for boundary writing. It is not a new foundational entity kind; it is a disciplined way to interpret and rewrite contract-language so it becomes routable under A.6.B.

#### A.6.C:4.1 — The Contract Bundle (four-part unpacking)

Whenever a text uses “contract / guarantee / promise / SLA / interface agreement” language, unpack it into four parts:

1. **Promise Content (Promise content)**

   * The promised value/effect (the promise *content*) in the intended scope.
 * In FPF terms (A.2.3), **`U.PromiseContent` is promise content**—a **promise content**, not an execution event (`U.Work`) and not (by itself) an accountable deontic binding (`U.Commitment`). 
 * **Prose head rule (normative).** When referring to `U.PromiseContent` in normative prose, authors SHALL use the head phrase **promise content** (or **service offering clause** / **service promise clause**) and SHALL NOT rely on the bare head noun *service*. If the surrounding text also talks about endpoints/systems/operations, apply **A.6.8** to select facet‑typed phrases (service access point / service delivery system / service delivery work / …) rather than collapsing them into “service”.
   * **Recommendation:** give the promise-content a stable local ID (e.g., `SVC-*`) so it can be cited from commitments, gates, evidence, and MVPK faces without paraphrase drift.
 * **Routing discipline:** keep the semantics/definitions of the promised behavior in **L**; express *who is accountable for satisfying the promise* as a **D** claim (`U.Commitment`) that **references** the `U.PromiseContent` (plus any `A-*`/`E-*` claims as needed).

2. **Utterance Package (speech act + published descriptions)**

   * The work occurrence of stating/publishing/approving (a `U.SpeechAct <: U.Work`, A.2.9) **and** the utterance descriptions it produces or updates (versioned **epistemes** on carriers) that host the routed claim set.
   * A speech act **may** institute/update commitments, but only under an explicit context policy that recognizes that `actType` as having such institutional force.
   * The published utterance descriptions (signature/mechanism spec + MVPK faces) host routed claims (L/A/D/E). The act is not “the contract”; it is the work occurrence that created/updated the descriptions and (when recognized) the associated commitments.
   * **Default interpretation rule (normative).** A conformant boundary model **MUST NOT** infer or assume any `U.Commitment` objects solely from the presence of a `Publish`/`Approve` `U.SpeechAct`. Publication creates/updates utterance descriptions and MAY institute publication/status claims (e.g., “Published”, “Approved as Standard”, “Deprecated”), but commitments exist only when represented explicitly as `U.Commitment` records (A.2.8).
   * If a bounded context defines a policy that maps certain publish/approve act types to commitment-instituting effects (e.g., a named `SpecPublicationPolicy@Context`), the model **MUST** cite that policy, and any resulting commitments **MUST** still be represented explicitly as one or more `U.Commitment` objects with accountable subjects (not inferred from publication alone).

3. **Commitment (Deontic accountability relation)**

   * The accountable agent/role bound to obligations/permissions/prohibitions (including being accountable for satisfying a promise content).
   * This bundle part is the **D‑side commitment object**: by default, one or more `U.Commitment` records (A.2.8).
   * **Default checklist (A.2.8 minimal structure):**
     * `id` (stable; often the `D-*` claim ID),
     * `subject` (accountable role/party; never an episteme),
     * `modality` (normalized deontic token / BCP‑14 family),
     * `scope` (`U.ClaimScope`) and `validityWindow` (`U.QualificationWindow`),
     * `referents` (by reference/ID: promise content IDs like `SVC-*`, plus `L-*`/`A-*`/`MethodDescriptionRef(...)`/`ServiceRef(...)` as needed),
   * `referents` (by reference/ID: promise content IDs like `SVC-*`, plus `L-*`/`A-*`/`MethodDescriptionRef(...)`/`PromiseContentRef(...)` as needed),
     * optional `owedTo` (beneficiary/counterparty),
     * optional `adjudication.evidenceRefs` when the commitment is meant to be auditable (point to `E-*`),
     * optional `source` when authority/provenance matters (issuer + instituting `speechActRef` + description reference),
     * optional `notes` for explicitly informative commentary (not part of the binding).
   * A commitment is not “the spec text”: utterance descriptions carry the statement, but the binding is the `U.Commitment` object (A.7 / A.2.8).
4. **Work + Evidence (Adjudication substrate)**

   * The executed work and the observable carriers/traces that can adjudicate whether a commitment was met.
   * This is **E quadrant**: “what evidence is produced/exposed/retained, under what conditions, and how it is interpreted”.
   * Work is not “the contract”; it is what makes any operational claim testable.
   * In FPF terms, evidence is normally expressed as **carrier‑anchored `E-*` claims** (often backed by `U.EvidenceRole` assignments on epistemes with provenance from Work).
#### A.6.C:4.2 — Routing recipe into A.6.B (L/A/D/E)

After unpacking, route each **atomic** statement using the Boundary Norm Square as defined normatively in **A.6.B** (quadrant semantics + form constraints + cross‑quadrant reference discipline). A.6.C does not redefine `L/A/D/E`; it applies them to contract-language as follows:

* **Promise content → L/A (promise semantics + eligibility).**
  * Put meanings, invariants, and metric definitions for what is promised in **L** (`L-*` in signature laws/definitions).
  * Put “eligible/covered/valid iff …” predicates as **A** (`A-*` admissibility/gate predicates), not as deontic obligations.
* **Commitment → D (who is accountable).**
  * Put “MUST/SHALL/commits to …” statements as **D** (`D-*`), preferably as `U.Commitment` payloads (A.2.8).
  * If compliance requires satisfying/enforcing a gate, the commitment **MUST** reference the relevant `A-*` ID(s) (D→A).
  * If the commitment is meant to be auditable, include evidence hooks by referencing `E-*` (D→E), preferably via `U.Commitment.adjudication.evidenceRefs`.
* **Work + Evidence → E (how we can tell).**
  * Put observable traces, audit records, measurement windows, and carrier semantics as **E** (`E-*`) with explicit carrier and observation/measurement conditions (A.6.B:5.4).
**Keyword placement rule (canonical claim set).**
Within the canonical routed claim set, BCP‑14 norm keywords (RFC 2119 + RFC 8174)—and their common synonyms (e.g., SHALL, REQUIRED, RECOMMENDED, OPTIONAL)—belong in **D** claims only, expressed as `U.Commitment.modality` and normalized per **A.2.8**. Authors **SHOULD** avoid using these keywords in **L/A/E** claims; phrase **L** as definitions/invariants (“is defined as…”, “holds iff…”), **A** as predicates (“is admissible iff…”), and **E** as observable/evidenced properties. If a BCP‑14 keyword (or synonym) appears in an **L/A/E** claim, it **SHOULD** be rewritten into predicate/definition form (or explicitly marked informative) before publication.

A helpful rewrite rule:

> If a sentence mixes “when allowed” + “who must comply” + “how we can tell”, decompose it into an **A** predicate, a **D** duty referencing that predicate, and an **E** evidence claim referencing that predicate (per A.6.B triangle decomposition).
#### A.6.C:4.3 — “Guarantee” disambiguation

Treat “guarantee” as ambiguous until routed:

* **Semantic guarantee** → **L** (“by definition / invariant”).
* **Governance guarantee** → **D** (“provider commits / implementer must”).
* **Operational guarantee** → **E** (measured property with evidence expectations; optionally referenced by D as the adjudication target).

If none of these fits, the statement is likely rhetorical and should be rewritten or explicitly marked as aspirational/informative.
#### A.6.C:4.4 — MVPK faces are not second contracts

A contract bundle has one canonical claim set. Publication faces are **views** of that set under viewpoints:

* Faces may **select, summarize, and render** claims for audiences.
* Faces must not **introduce new semantic commitments** beyond the underlying claim set.
* Any face-level decision-relevant / normative-looking statement **SHOULD** cite the underlying claim ID(s). If it cannot be traced to claim IDs, it **MUST** be explicitly presented as informative commentary.

**Keyword rule (faces).**
If a face contains BCP‑14 norm keywords (RFC 2119 + RFC 8174), including common synonyms (SHALL, REQUIRED, RECOMMENDED, OPTIONAL), then each such sentence MUST be a projection of an existing **D‑*** claim (`U.Commitment`) and MUST cite the underlying **D** claim ID(s).
If a sentence cannot be traced to **D‑*** claim IDs, it MUST be rewritten to remove BCP‑14 keywords (e.g., turn it into explanatory prose that cites the relevant claim IDs) or moved out of the face.
To avoid keyword‑evasion, equivalent deontic phrasings (e.g., “is required to…”, “is prohibited from…”) SHOULD follow the same trace-by-ID discipline even when no BCP‑14 keyword is present.

Projection may be paraphrased for audience fit, but it **MUST NOT** change the deontic/semantic content; if exactness is critical or disputed, use verbatim.

This prevents faces from becoming “second contracts” by paraphrase drift.
#### A.6.C:4.5 — Default artefact: Contract Claim Register (recommended)

Use the **A.6.B Claim Register** (IDs + statements + quadrant + anchor). Add two optional columns that make A.6.C auditable without adding new ontology:

* `bundleId: ContractBundleId` (local stable ID grouping the claims that constitute one boundary “contract bundle”)
* `bundlePart ∈ {PromiseContent, Utterance, Commitment, WorkEvidence}`
* `faceRefs = {PlainView|TechCard|InteropCard|AssuranceLane : …}` (where the claim is rendered)
### A.6.C:5 — Archetypal Grounding (Tell–Show–Show)

#### A.6.C:5.1 — Tell

If you use contract-language for a boundary, do not treat “the interface/spec” as an agent. Instead:

1. Identify the **promise content** (promise content) being promised,
2. Identify the accountable **Commitment** holder(s) (roles/agents),
3. Identify the **Utterance** surfaces that publish the boundary (signature/mechanism + MVPK views),
4. Identify the **Work + Evidence** carriers that could adjudicate whether commitments were met,
5. Route each claim through **L/A/D/E** and reference across quadrants rather than paraphrasing.
#### A.6.C:5.2 — Show (System archetypes)

**(A) Software API boundary**

*Draft wording (contract soup):*
“The Payments API guarantees idempotency. Clients must provide `Idempotency-Key`. We log all requests. Availability is 99.9%.”

**Unpack + route:**

* **Utterance:** signature/mechanism publication for `PaymentsAPI` (MVPK faces: TechCard, InteropCard).
* **L:** define idempotency and the uniqueness semantics of `Idempotency-Key`.
  (“Idempotent” is a semantic property, not a duty.)
* **A:** admissibility predicate: request is admissible iff `Idempotency-Key` is present and valid.
  (Gate belongs to mechanism.)
* **D:** client implementers are obligated to satisfy the gate; provider implementers are accountable for the idempotency behavior **as defined in L** when the gate holds; provider commits to the availability target (scoped by window/exclusions).
  (Name the committing role; do not say “the API commits”.)
* **E:** evidence expectations: audit/log carriers include request id, idempotency key, rejection reason; availability measurement uses defined window and signal definition.

**(B) Hardware interface boundary**

*Draft wording:*
“The connector guarantees safe operation. Devices must not exceed 20V. Negotiation must succeed before power is applied.”

**Unpack + route:**

* **Utterance:** published interface spec (pinout, electrical ranges, handshake procedure).
* **L:** electrical invariants / allowable ranges are definitions and invariants (truth-conditional).
* **A:** admissibility predicate: power delivery is admissible only after handshake state reaches an agreed mode.
* **D:** manufacturer/integrator obligations: implement handshake; enforce voltage constraints.
* **E:** evidence: test-report carriers; measurement traces; observable negotiation logs (if exposed), or lab measurements under a declared method.
#### A.6.C:5.3 — Show (Episteme archetypes)

**(C) Multiparty protocol boundary (behavioural/session type motif)**

*Draft wording:*
“The protocol guarantees progress. Participants must follow the sequence.”

**Unpack + route:**

* **Utterance:** protocol description (could be a type/protocol spec plus explanatory views).
* **L:** safety/progress properties as laws over the protocol model (truth-conditional, within the theory).
* **A:** admissibility: when an interaction trace is considered valid/admissible (e.g., runtime checks; compilation checks; gating conditions for entering a session).
* **D:** obligations on implementers/operators: implement the protocol; do not send messages outside the allowed state machine; publish conformance artefacts if required.
* **E:** evidence: message trace carriers; conformance test run artefacts; audit trails for disputed interactions.

**(D) Socio-technical “SLA + audit trail” boundary**

*Draft wording:*
“Provider shall respond within 4 hours for Severity‑1 incidents. Only Severity‑1 is covered. Evidence is provided by ticket logs.”

**Unpack + route:**

* **Promise content (service promise clause):** responsiveness promise for a defined incident class and window.
* **Utterance:** SLA publication (and its views for different audiences).
* **A:** admissibility predicate for the promise: ticket qualifies iff severity classification meets stated conditions.
* **D:** provider commitment to meet the target; client duties (e.g., provide required info); auditor duties if applicable.
* **E:** evidence: ticket carriers, timestamps, classification records, and the measurement procedure binding “4 hours” to a time window and clock source.
### A.6.C:6 — Bias-Annotation

Lenses tested: **Gov**, **Arch**, **Onto/Epist**, **Prag**, **Did**. Scope: **Universal** for “contract talk” in boundary descriptions.

* **Gov bias:** prefers explicit accountability and adjudication hooks; increases clarity but adds authoring overhead.
* **Arch bias:** optimises evolvability by preventing hidden coupling (contract soup) across stack layers.
* **Onto/Epist bias:** enforces Object≠Description≠Carrier separation; discourages “interface-as-agent” metaphors in Tech prose.
* **Prag bias:** accepts that “contract” is common vocabulary; offers a disciplined rewrite rather than prohibition.
* **Did bias:** aims to be teachable via repeated unpacking examples across boundary types.
### A.6.C:7 — Conformance Checklist

A boundary description conforms to A.6.C iff it satisfies all items below:

1. **CC‑A.6.C‑1 (Unpacking when contract-language appears).**
   If the text uses “contract/guarantee/promise/SLA” language, it **SHALL** explicitly disambiguate the statement as referring to at least one of: **Promise content (promise content)**, **Utterance (published description)**, **Commitment (deontic binding)**, **Work+Evidence (adjudication)**.

2. **CC‑A.6.C‑2 (No agency to epistemes).**
   The text **MUST NOT** attribute promising/committing/obligating agency to signatures, mechanisms, interfaces, or documents. Any duty/commitment **SHALL** name an accountable role/agent.

3. **CC‑A.6.C‑3 (Route contract-bearing statements via A.6.B).**
   Contract-bearing statements **SHALL** be routable as atomic claims to **L/A/D/E**, with dependencies expressed by explicit references rather than paraphrase.

4. **CC‑A.6.C‑4 (Promise content ≠ Work discipline).**
   Statements about what is executed/observed **SHALL** be expressed as **E** claims about work/evidence/carriers. Promise‑content language **SHALL** refer to the **promise content** (`U.PromiseContent`, A.2.3) and its **L‑defined** semantics (and to explicit **D‑*** commitments represented as `U.Commitment`, A.2.8), not to execution events (`U.Work`) or runtime effects.
   Unqualified head‑noun *service* (and the co‑moving cluster *service provider* / *server*) in normative boundary prose SHALL be unpacked per **A.6.8 (RPR‑SERV)**.

5. **CC‑A.6.C‑5 (Evidence hook for operational guarantees).**
   If a “guarantee” is operational (requires reality to decide), the text **SHALL** include an **E** claim that states what evidence would adjudicate it (even if the evidence surface is abstract/conceptual).

6. **CC‑A.6.C‑6 (No second contracts via faces).**
   MVPK faces **MUST NOT** add new commitments beyond the underlying routed claims; faces may only project/summarize/select from the canonical claim set under a viewpoint.

7. **CC‑A.6.C‑7 (RFC‑keyword discipline inside faces).**
   If an MVPK face contains BCP‑14 norm keywords, each BCP‑14 sentence **MUST** cite the underlying **D‑*** claim ID(s) (`U.Commitment`) it is projecting. If it cannot, the face is non‑conformant until rewritten (no BCP‑14 keyword) or moved out of the face.

8. **CC‑A.6.C‑8 (No commitment-by-publication default).**
   A `Publish`/`Approve` utterance (including publishing a `…Spec`) MUST NOT be treated as instituting `U.Commitment` objects by default. If a Context policy maps publication acts to binding effects, the policy SHALL be cited, and any resulting bindings SHALL still be represented explicitly as `U.Commitment` objects with accountable subjects.
### A.6.C:8 — Common Anti-Patterns and How to Avoid Them

| Anti-pattern                                        | Why it fails                                                   | Repair                                                                                      |
| --------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **Interface-as-promiser** (“the API promises…”)     | Epistemes are descriptions; they do not commit                 | Name the committing role/agent; route as D claim; keep the signature as utterance substrate |
| **Guarantee-without-substrate**                     | “Guarantee” is empty unless it is L, D, or E                   | Decide: semantic law (L), deontic commitment (D), or evidenced property (E)                 |
| **SLA smuggled into laws**                          | Mixes governance with semantics; breaks substitution reasoning | Put SLA targets as D claims referencing L-defined metrics and E evidence                    |
| **Gate written as obligation**                      | Confuses admissibility predicates with duties                  | Write predicate as A; write duty-to-gate as D→A reference                                   |
| **Evidence as prose property** (“document proves…”) | Violates Object≠Description≠Carrier                            | State evidence as E claims about carriers produced/observed in work                         |
| **Face-level paraphrase drift**                     | Creates multiple incompatible contracts                        | Faces should reference canonical claims; keep commitments centralized                       |
| **Cross‑scale contract collapse**                   | Different agents claim incompatible “contracts” at different scales/contexts | Represent each as separate, scoped `D-*` claims (with accountable roles + Context); route conflicts to conflict/mediation patterns rather than collapsing them into one “contract”. |
### A.6.C:9 — Consequences

**Benefits**

* Category mistakes (“contract soup”) become systematically repairable.
* Commitments become accountable (named roles) and adjudicable (evidence expectations).
* Boundaries remain evolvable: laws, gates, governance, and evidence can evolve with controlled coupling.

**Trade-offs / mitigations**

* Additional authoring effort; mitigated by applying the unpacking only when contract-language appears or when a claim is used for decision/publication.
* Some stakeholders prefer “one sentence contract”; mitigated by MVPK faces that present curated projections while keeping the underlying claim set coherent.
### A.6.C:10 — Rationale

FPF already distinguishes signatures, mechanisms, and work/evidence layers. Contract-language is a high-frequency linguistic entry point that collapses these layers unless a disciplined unpacking is applied.

F.18 provides the **naming** intuition (service/promise vs utterance vs commitment) via an NQD example; A.6.C makes that split **operational for boundaries** and extends it with the missing fourth part: **work+evidence as the adjudication substrate**. This keeps “contract” language routable under A.6.B and compatible with MVPK multi‑view discipline without relocating ontology into the naming chapter.
### A.6.C:11 — SoTA‑Echoing (informative; post‑2015 alignment)

> **Informative.** Alignment notes; not normative requirements.

* **Adopt — BCP 14 (RFC 2119 + RFC 8174) norm keyword discipline for spec language.** Modern spec-writing practice treats these keywords as a disciplined modality family; A.6.C constrains where such modality belongs (D) versus where predicate-style constraints belong (A/L).
* **Adopt — behavioural/session types for protocol boundaries (post‑2015 practice).** Protocols as typed interactions emphasize separating safety/progress properties (L) from runtime admission (A) and from implementer obligations (D), with trace-based evidence (E).
* **Adopt/Adapt — algebraic effects & handlers / effect systems.** The “operation signature vs handler semantics” split mirrors “utterance substrate vs work/evidence”, preventing execution semantics from being conflated with contract surfaces.
* **Adapt — ISO/IEC/IEEE 42010:2022 viewpoint discipline.** Multi-view publication is treated as viewpoints governing projections; A.6.C applies this to contract talk to avoid face-level semantic forks.
### A.6.C:12 — Relations

* **Uses / is used by**

  * Uses **A.6.B** for routing (L/A/D/E), atomicity, and cross-quadrant reference discipline.
  * Used by **A.6** cluster conformance (“contract unpacking”) as the detailed, reusable form of that discipline.
  * Complements **A.6.S** (signature engineering): contract unpacking is a common constructor step when turning prose boundaries into publishable signatures.
  * Coordinates with **A.6.P** families: when an RPR pattern touches “contract/guarantee” language, apply A.6.C to avoid category errors. (A.6.C is **not** a specialization of A.6.P; A.6.P is relation‑precision, A.6.C is boundary‑contract disambiguation.)

* **Coordinates with**

  * **A.7** (Object≠Description≠Carrier) for correct placement of evidence claims.
  * **F.12** (service acceptance) for structuring how promise-level commitments connect to evidence and acceptance windows.
  * **E.17** MVPK “no new semantics” rule to prevent publication faces from becoming new contracts.
### A.6.C:End
## U.Signature - Universal, law‑governed declaration for a SubjectKind on a BaseType

**Status.** Architectural pattern, kernel‑level and universal.  
**Placement.** Part A (Kernel), **before A.6.1** (“U.Mechanism”).  
**Builds on.** **A.2.6** (USM: context slices & scopes), **E.8** (authoring order), **E.10** LEX-BUNDLE (registers, naming, stratification), **E.10.D1** D.CTX (Context discipline).
  
**Coordinates with.** **A.6.1** (U.Mechanism), **A.6.5** (`U.RelationSlotDiscipline` for n‑ary arguments), **E.5.3** (Unidirectional Dependency), **E.10** (LEX-BUNDLE), and **Part F** (harnesses & cross-context transport; naming). Conformance keywords: RFC 2119.

### Problem frame

FPF already uses “signatures” to stabilise public promises of **reusable extension vocabularies** and, via **A.6.1**, of **mechanisms**. But authors also need stable, minimal declarations for **theories**, **methods** (operational families), and **disciplines** (regulated vocabularies). Without **one** universal notion of signature:
* similar constructs proliferate under incompatible names;
* readers cannot tell what is **declared** (intension & laws) versus what is **implemented** (specification);
* cross‑context reuse lacks a canonical place to state **applicability** and **lawful vocabularies**.

E.8 demands a single authoring voice and section order; E.10 demands lexical discipline across strata. A.6.0 provides the common kernel shape these patterns presuppose.
### Problem

If each family (theories, mechanisms, methods, disciplines) invents its own “signature”:

1. **Tight coupling.** Private definitions leak as public standards, breaking substitutability.
    
2. **Lexical drift.** The same surface label (e.g., *scope*, *normalization*) hides different laws.
    
3. **Scope opacity.** Applicability (where the words mean what) remains implicit, violating D.CTX.
### Forces

| Force | Tension |
| --- | --- |
| **Universality vs. fitness** | One shape must fit **Kernel**, **Mechanisms**, **Protocols**, and other specialised signatures, without over‑committing to any one family. |
| **Intension vs. specification (I/D/S)** | Signatures declare **what** and **the laws** (intension), not recipes or test harnesses (specification). |
| **Simplicity vs. expressivity** | Keep the kernel small while allowing family‑specific header metadata and readable projections (e.g., imports/provides DAGs, assurance matrices, transport views). |
| **Locality vs. transport** | Meaning is context‑local (D.CTX); transport must remain explicit and auditable (Part F) without smuggling implementation. |
### Solution — Define U.Signature once, reuse everywhere

**Definition.** A **`U.Signature`** is a **public, law-governed declaration** for a named **SubjectKind** on a declared **BaseType**. The Signature **SHALL** expose an explicit **SliceSet** and **ExtentRule**; if quantification is context‑independent, authors **MUST** use a trivial `SliceSet` (e.g., a singleton) and a constant `ExtentRule` rather than omitting these fields. A Signature (i) introduces a **vocabulary** (types, relations, operators), (ii) states **laws** (axioms/invariants; no operational admissions), and (iii) records **applicability** (where and under which contextual assumptions the declarations hold). Dependencies (**imports**) and exported names (**provides**) are declared in a `SignatureManifest` (see §4.4.1) and are **not** part of the four‑row Signature Block. **Discipline for argument-position typing is delegated to A.6.5 `U.RelationSlotDiscipline`: whenever the Vocabulary declares an n-ary relation or operator, SlotSpecs for its parameter positions SHALL be provided as in §4.1.1 and A.6.5.**

Where the **Vocabulary** introduces an **n‑ary relation or morphism**, the Signature **SHALL**, for each parameter position `i`, declare a `SlotSpec_i = ⟨SlotKind_i, ValueKind_i, refMode_i⟩` as defined in **A.6.5 `U.RelationSlotDiscipline`**. SlotSpecs live inside the per‑relation parameter block of the **Vocabulary** row and **MUST NOT** introduce additional rows beyond the four‑row Signature Block.

**Arrow form (typing for MVPK).** Author a Signature as a **morphism**  
`SigDecl : ⟨SubjectBlock⟩ → ⟨Vocabulary × Laws × Applicability⟩`  
where `SubjectBlock = ⟨SubjectKind, BaseType, SliceSet, ExtentRule, ResultKind?⟩`. This makes `U.Signature` directly consumable by **E.17 MVPK** (publication of morphisms) without adding semantics on faces (no new claims; pins for any numeric content).

*Guard clarification (normative).* **Operational guard predicates** (run‑time or admission guards) **BELONG ONLY** to **A.6.1 Mechanisms**. A Signature may express **domain/type constraints** intensionally (e.g., restricting an operator’s domain) but **SHALL NOT** encode operational admissions.

*Guidance for deductive substrates.* Signatures that declare a **formal deductive substrate** (e.g., *FormalSubstrate*) MAY include, **as vocabulary elements**, an **EffectDiscipline** (algebraic/row/graded effect signatures) and **InferenceKind** enumerations; handler semantics are **out of scope** for Signatures (see §4.3). The universal block remains conceptual and contains **no** run‑time admissions or AdmissibilityConditions.

**Naming discipline.** The `Subject` **MUST** be a **single‑sense** noun phrase; avoid synonyms/aliases within the same Signature.

A `U.Signature` is conceptual: it contains no implementation, no packaging/CI metadata, and no Γ-builders. If a family wants to expose a Γ‑like *builder/aggregator*, publish it **outside** the Signature Block (typically as an **A.6.1** Mechanism‑level operator) and **namespace** it under the Signature id; do not treat Γ as part of the canonical Vocabulary.

#### The Signature Block (universal form)

The **four conceptual rows** (“SubjectBlock / Vocabulary / Laws / Applicability”) give a repeatable, holon‑stable pattern across mathematics → physics → engineering:  
* **SubjectBlock** = *what it’s about + how quantified* (axiomatics + domain of interpretation),  
* **Vocabulary/Laws** = *principles/laws* (postulates & constraints),  
* **Applicability** = *where they hold in practice* (bounded context & time).

Every `U.Signature` **SHALL** present a **four‑row conceptual block** (names are universal; family‑specific aliases are mapped below):

1. **SubjectBlock** — ⟨**SubjectKind**, **BaseType**, **SliceSet**, **ExtentRule**, **ResultKind?**⟩.  
   *SubjectKind* names the intensional subject (C.3); *BaseType* is the `U.Type` the signature ranges over (CHR Spaces appear here **as types**, not as field names); *SliceSet* addresses the quantification domain (USM; e.g., **ContextSliceSet**); *ExtentRule* computes `Extension(SubjectKind, slice)` (C.3.2); *ResultKind?* (optional) is the intensional kind of outputs.  
   **Editorial split (allowed).** Authors **MAY** render the **SubjectBlock** as two adjacent lines — **Subject** *(SubjectKind, BaseType)* and **Quantification** *(SliceSet, ExtentRule, ResultKind?)* — **without changing semantics**. Even when visually split, SubjectBlock counts as **one** conceptual row.

   **Semantic roles of the SubjectBlock kinds (informative)**
   * **SubjectKind (intent).** The intensional “describedEntity” of the signature (C.3.1), ordered by `⊑`. It carries no Scope.
   * **BaseType (carrier).** The `U.Type` over which values/objects are ranged. In CHR regimes this may be a `U.CharacteristicSpace` **type**; elsewhere it is a set‑typed `U.Type`.
   * **SliceSet (addressability).** The addressable set of `U.ContextSlice`s (USM). It identifies where **extent** is computed; it is not a “space” unless CHR.
   * **ExtentRule (extent).** A rule yielding `Extension(SubjectKind, slice)` (C.3.2); this is the quantifier’s domain, computed per slice.
   * **ResultKind? (outputs).** Optional: the intensional kind of the outputs of the operations declared in *Vocabulary* (use when outputs differ in kind from the SubjectKind).
    
2. **Vocabulary** — names and sorts of the public **types / relations / operators** this signature commits to (no handler semantics; no AdmissibilityConditions). For each **n‑ary relation or morphism** in the Vocabulary, parameters **SHALL** be declared via **SlotSpecs** `SlotSpec_i = ⟨SlotKind, ValueKind, refMode⟩` per **A.6.5 `U.RelationSlotDiscipline`**. SlotKinds and RefKinds **MUST** follow the `…Slot` / `…Ref` lexical discipline in **A.6.5** and **E.10 (LEX‑BUNDLE)**; ValueKinds **MUST** remain free of these suffixes.
   (No additional rows beyond the four‑row Signature Block.)
  
3. **Laws (Axioms/Invariants)** — equations and order/closure laws that are context‑local truths under the stated Applicability (no proofs here). **Operational guard predicates belong to Mechanisms (A.6.1)**, not to Signatures.
    
4. **Applicability (Scope & Context)** — conditions under which the laws are valid (bounded context, plane, stance, time notions). Applicability **MUST** bind a **`U.BoundedContext`** (D.CTX). Applicability here is the *context of meaning* for the Signature’s vocabulary/laws; it **MUST NOT** be used to encode claim‑level applicability, which remains a **Scope** on claims (USM / C.3.2). Cross‑context use **MUST NOT** be implicit; if intended, **name** the Bridge (conceptual reference only). When numeric comparability is implied, **bind** legality to **CG‑Spec/MM‑CHR** (normalize‑then‑compare; lawful scales/units).
    
*Mapping to existing families (normative aliases).*  
— **A.6.1 (Mechanism).** *SubjectBlock* ↔ **SubjectKind/BaseType/…**; *Vocabulary* ↔ **OperationAlgebra**; *Laws* ↔ **LawSet**; *Applicability* remains contextual; **AdmissibilityConditions** — separate field of mechanism (not in the `U.Signature`).  
— **Task/Problem/Discipline signatures (C.22, G-cluster).** These **SHALL** be introduced as **species of `U.Signature`** that reuse the same four-row Block (SubjectBlock / Vocabulary / Laws / Applicability); any extra per-family views are projections only (no new conceptual rows).

*Optional projection views (normative).* Publications MAY include additional **projection views** (e.g., a Dependency View listing `imports/provides`, or an Assurance View listing audit/evidence hooks), but such views:
1) MUST be mechanically derivable from `SignatureManifest` + the four‑row Block (and referenced ClaimIds where used), and
2) MUST NOT introduce new semantics, obligations, or “extra rows”.

##### SlotSpec for argument positions (normative; see A.6.5)

For every **n‑ary relation or operator** declared in the **Vocabulary** row, the Signature **SHALL** assign, to each argument position, a **SlotSpec** triple:

```text
SlotSpec_i := ⟨SlotKind_i, ValueKind_i, refMode_i⟩
```

where:
* **SlotKind_i** is a named position in the relation/operator (Tech name with `…Slot` suffix) whose semantics are documented (see A.6.5).
* **ValueKind_i** is the FPF type (`U.Kind` or kernel‑level type) of admissible occupants at that position.
* **refMode_i** is either `ByValue` or a **RefKind** (e.g., `U.EntityRef`, `U.HolonRef`), indicating whether the episteme stores values directly or references/identifiers.

Full discipline and lexical rules for **SlotKind/ValueKind/RefKind** are given in A.6.5 `U.RelationSlotDiscipline` and E.10 (§8.1). A.6.0 requires that every vocabulary‑level relation or operator that takes arguments **declare** these SlotSpecs; downstream patterns MAY provide templates for common shapes (e.g., episteme slots in C.2.1).

**Mini‑example (informative).** For an episteme kind `ModelEvaluationResultKind`, a simplified episteme might expose:
* `describedEntityRef : U.MethodRef`
* `datasetRef : U.EntityRef`
* `metricRef : U.CharacteristicRef`
* `groundingHolonRef : U.HolonRef`
* `claimGraph : U.ClaimGraph`

An authorial SlotSpec table then reads:

| Parameter (episteme field)   | SlotKind              | ValueKind          | refMode                |
| ---------------------- | --------------------- | ------------------ | ---------------------- |
| `describedEntityRef`   | `DescribedEntitySlot` | `U.Method`         | `U.MethodRef`          |
| `datasetRef`           | `DatasetSlot`         | `U.Entity`         | `U.EntityRef`          |
| `metricRef`            | `MetricSlot`          | `U.Characteristic` | `U.CharacteristicRef`  |
| `groundingHolonRef`    | `GroundingHolonSlot`  | `U.Holon`          | `U.HolonRef`           |
| `claimGraph`           | `ClaimGraphSlot`      | `U.ClaimGraph`     | `ByValue`              |

This example illustrates the intended reading: **parameters are typed twice**—once by their **ValueKind** (what sort of thing occupies the position) and once by **refMode** (by‑value or which RefKind). SlotKinds (with `…Slot` suffix) give stable names for substitution laws and describedEntity statements across patterns.
#### Profile specialisations (normative; structure‑preserving)

To enable first‑principles layers without minting new Kernel kinds, apply **profiles** to `U.Signature`:

* **`profile = FormalSubstrate`** — *formal‑deductive layer*  
  **Vocabulary:** `TermRegister` (ref‑only), **InferenceKinds** (ref‑only), **EffectDiscipline** (operation/effect signatures).  
  **Laws:** equational/structural axioms of the calculus; **no handler semantics**.  
  **Applicability:** binds a `U.BoundedContext` at the **concept‑plane**; **no units/ReferencePlane/Transport** on faces.  
  **MVPK pins:** **`No‑Realization` pin (mandatory)** on `PlainView`/`TechCard` asserting that handler semantics live only in **A.6.1 `U.Mechanism::U.EffectRealization`**.  
  **Faces:** On MVPK faces, **`InferenceKindsAllowed`** MAY present a **ref‑only subset** of the enumerated **`InferenceKinds`**; Signatures do not add handler semantics.

* **`profile = PrincipleFrame`** — *postulates + measurability intent (CHR‑binding)*  
  **Vocabulary:** **PostulateSet** (in the calculus imported), **CHR‑Binding presence** (ref‑only to characteristics/observation profiles), **Ontology anchors** (ref‑only to substrate types/morphisms used to name subject‑matter entities).  
  **Laws:** timeless/order‑free invariants; **no operational admissions**.  
  **Applicability:** binds a `U.BoundedContext`; **Signatures SHALL NOT publish units/ReferencePlane/ComparatorSet/Transport** (first mention is in **UNM**).
  **MVPK pins:** **`NoReferencePlaneOnSignature`** (alias: **`NoReferencePlaneOnPF`**) and **`UNM‑priority`** (units/planes/comparators/Transport are declared only by **`U.ContextNormalization`** and cited by edition/ref‑id where needed).

**Profile morphism discipline.** See §4.6 for the **structure‑preserving morphism** requirements for profile application.
#### Effect‑discipline vs handler semantics (normative split)

If a Signature’s **Vocabulary** includes an **EffectDiscipline** (operation/effect signatures), the Signature **SHALL NOT** declare **handler semantics** or any **EffectRealization**. Such realizations are authored only under **A.6.1 `U.Mechanism`** and cited by **ref‑id** on faces where needed. This mirrors the modern algebraic‑effects separation between *operation signatures* and *handlers* while keeping A.6.0 purely conceptual.
#### Authoring rules (I/D/S‑aware; lexically disciplined)

* **I/D/S separation.** A signature **states intension and laws**; Realizations (if any) carry **specifications**. Do not mix tutorial text or operational recipes into the Block. Do **not** include **AdmissibilityConditions** or run‑time admissions here.
* **Context discipline.** Bind Applicability to a **`U.BoundedContext`**. If cross‑context use is intended, **name** the crossing and **reference** the Bridge (Part F/B); A.6.0 does **not** prescribe **compatibility/loss tables (CL, including `CL^plane`)** or penalty formulas.
* **Stratification.** Use LEX‑BUNDLE registers and strata; do not redefine Kernel names in lower strata (no cross‑bleed).  
* **Signature manifest.** If the signature is intended to be imported/reused, publish a `SignatureManifest` immediately above the Block with explicit `id`, `imports`, and `provides` lists (§4.4.1). Keep the universal four‑row Block free of dependency/export metadata.

* **Realization discipline (normative extension point).** If a family publishes any *Realization* of a `U.Signature`, each Realization **MUST** (i) declare which `SignatureId` it implements, (ii) satisfy the Signature’s **Laws** (and imported laws) and **MAY** tighten them but **MUST NOT** relax them, and (iii) treat imported Signatures as **opaque**—it **MUST NOT** depend on their internal structure beyond what is exported via `provides` and cited via ClaimIds. Realization‑specific build/tooling/test metadata belongs to the Realization artifact, not to the `U.Signature` Block.

##### SignatureManifest (imports/provides; normative)

A `U.Signature` MAY be prefixed with a lightweight manifest that makes boundary dependencies explicit **without** introducing a separate “module system”.

**SignatureManifest** fields (conceptual; concrete syntax is editorial):

- `id : SignatureId` — stable identifier for cross-references.
- `version : SemVer` (optional; **required when the signature is imported/reused**).
- `status : {draft | review | stable | deprecated}` (optional).
- `imports : [SignatureId]` — other signatures whose **provides** are referenced by this signature (directed edges; possibly empty).
- `provides : [SymbolId]` — the **only** new public symbols minted by this signature that downstream text may depend on (**types, relations, operators, SlotKinds, RefKinds**).

**Norms (boundary hygiene):**

- **Acyclicity.** The directed graph induced by `imports` MUST be acyclic.
- **Layering.** `imports` **MUST** respect **E.5.3** (Unidirectional Dependency) and **E.10** strata/token‑class discipline; do not import from a lower stratum or across a forbidden dependency direction.
- **No redeclare.** `provides(S)` MUST NOT re‑declare any symbol already provided by any transitive import of `S`.
- **No ghost dependencies (vocabulary symbols).** Any non‑Kernel **SymbolId** referenced in the **SubjectBlock** or **Vocabulary** rows (including `BaseType`, `ResultKind?`, operator names, SlotKinds, ValueKinds, RefKinds) that is **not** provided by this signature MUST be provided by some imported signature. References that are *not* vocabulary symbols—e.g., **ClaimIds**, **BridgeIds**, **policy‑ids**, or **EditionIds**—are exempt.
- **Law anchoring.** When downstream text depends on laws/constraints from an imported signature, it SHOULD cite the corresponding **ClaimId** (A.6.B), not paraphrase prose.

The A.6.0 four‑row Block remains the source of truth for meaning (Vocabulary/Laws/Applicability). The manifest only declares dependency edges and exported names.

* **Token hygiene.** Do **not** mint new `U.*` tokens inside a Signature without a **DRR**; prefer referencing existing Kernel/Extension `U.Type`s. 

*MVPK publication discipline for Signatures (normative).* When publishing a `U.Signature` via MVPK (E.17), faces **SHALL** be typed projections that add **no new claims**; any numeric/comparable statement **MUST** pin unit/scale/reference‑plane/**EditionId** to **CG‑Spec/MM‑CHR** where applicable. For deductive substrates, faces **MUST** carry a **No‑Realization pin** (handlers/realizers absent). For Principle‑level signatures, faces **MUST NOT** introduce units/ReferencePlane/Transport (first mention occurs in UNM).
#### Specialisation knobs (for downstream patterns)

A.6.0 exposes **three** conceptual knobs; downstream patterns (A.6.1, method/discipline specs) may **tighten** them:

1. **Builder policy.** The Block MUST NOT export Γ‑builders. If a family publishes a Γ‑like builder/aggregator, it MUST be outside the Block (typically as an **A.6.1** Mechanism‑level operator), explicitly marked optional, and namespaced under the Signature id.
    
2. **Transport clause.** If cross‑context/plane use is part of the design, the signature **may declare** a conceptual Transport clause; **A.6.1** gives a concrete schema (Bridge, **CL/CL^k/CL^plane**—Bridges per **F.9**, penalties per **B.3**, **CL^plane** per **C.2.1**), but A.6.0 remains agnostic about penalty shapes.
    
3. **Morphisms.** Families may define `SigMorph` (refinement, conservative extension, equivalence, quotient, product) to relate signatures; **A.6.1** instantiates this for mechanisms. Where such morphisms, or downstream **substitution / retargeting** laws (e.g., **A.6.2–A.6.4**), act on **n‑ary relations or morphisms**, they **SHALL** express their read/write/retargeting discipline in terms of **SlotSpecs**  (SlotKind / ValueKind / RefKind) rather than unnamed parameter indices, using **A.6.5 `U.RelationSlotDiscipline`** as the normative slot calculus.
#### Profile‑specialisation as a structure‑preserving morphism (normative)

Profile application `ι_profile : U.Signature → U.Signature(profile=…)` **SHALL** be a **structure‑preserving morphism**:
— **SubjectBlock** is preserved up to α‑renaming (SubjectKind/BaseType unchanged; ResultKind? only added when it exists in the universal intent).  
— **Vocabulary** is **monotone** (adds or refines names/sorts without contradicting existing ones).  
— **Laws** are **monotone** (add/strengthen axioms; never weaken).  
— **Applicability** is **restrictive** (binds or tightens `U.BoundedContext`; never widens implicitly).  
— No **AdmissibilityConditions**, **operational guards**, or **handler semantics** are introduced by the profile (those live under **A.6.1**).  
This makes `profile=FormalSubstrate` and `profile=PrincipleFrame` *morphisms* in the sense of kernel specialisation and supports SigMorph reasoning (refinement/conservative extension).
### Archetypal Grounding (Tell–Show–Show)

| quartet Element | `U.System` Example — **Grammar of Motions** | `U.Episteme` Example — **Normalization Family** |
| --- | --- | --- |
| **SubjectBlock** | **Subject:** SubjectKind=`MotionGrammar`; BaseType=`U.System:TrajectorySpace`. **Quantification:** SliceSet=`U.ContextSliceSet`; ExtentRule=`admissible motion words per slice (kinematics & domain restrictions)`; ResultKind?=`Language[Segment]`. | **Subject:** SubjectKind=`NormalizationMethod‑Class`; BaseType=`U.Episteme:ChartFamily` (one `U.BoundedContext`). **Quantification:** SliceSet=`U.ContextSliceSet`; ExtentRule=`admissible method instances per slice (edition+validity)`; ResultKind?=`NormalizedChart`. |
| **Vocabulary** | Types: `Pose`, `Segment`; Operators: `concat`, `reverse`, `sample` (any Γ‑like aggregator is published outside the Signature Block, typically as a Mechanism‑level operator namespaced under the Signature id). | Operators: `apply(method)`, `compose`, `quotient(≡)`. |
| **Laws (Invariants/Constraints)** | Closure of `concat`; associativity; time‑monotone sampling; **`reverse` is declared only for holonomic arms (domain restriction)**. | Ratio→positive‑scalar; Interval→affine; Ordinal→monotone; Nominal→categorical; LUT(+uncertainty). |
| **Applicability (Scope & Context)** | Context: *industrial robotics*; stance: design; time notion: discrete ticks. Cross‑context transport not declared. | Context: *clinical metrics*; stance: analysis; validity windows declared; cross‑context transport via Bridge (concept only; details per A.6.1). Numeric comparability bound to CHR/CG‑Spec. |

*Why these two?* E.8 requires pairs from **U.System** and **U.Episteme** to demonstrate trans‑disciplinary universality.
### Bias‑Annotation (lenses & defaults)

* **Local‑first meaning.** Laws are **local** to the named Context; cross‑context use must be explicit (Bridge), never implicit.
    
* **No illicit scalarisation.** If numbers appear, legal comparability follows **CG‑Spec/MM‑CHR**; **no ordinal means**, **partial orders return sets**; unit/scale alignment is explicit.
    
* **Register hygiene.** Keep Tech vs Plain register pairs; avoid tooling/vendor talk in Kernel prose (E.10).
### Conformance Checklist (normative)

| ID | Requirement |
| --- | --- |
| **CC‑A.6.0‑1** | A conformant text labelled **`U.Signature`** **SHALL** expose the **four‑row Signature Block**: *SubjectBlock; Vocabulary; Laws; Applicability*. A visual split of SubjectBlock into **Subject**/**Quantification** lines is allowed; it still counts as **one** conceptual row. |
| **CC‑A.6.0‑2** |  The Signature Block MUST remain conceptual: no code/CI metadata, no tool bindings, no execution steps, no implementation details, and no Γ‑builder exports. Dependency/export metadata belongs in the `SignatureManifest` (§4.4.1), not inside the four‑row Block. |
| **CC‑A.6.0‑3** | Applicability **binds** a `U.BoundedContext`; if cross‑context use is intended, a **Transport clause** is *named* (Bridge reference) without re‑stating Part F/B.3 details (including any **CL^plane**). |
| **CC‑A.6.0‑4** | Where numeric comparability is implied, Applicability **binds** to **CG‑Spec/MM‑CHR** legality (normalize‑then‑compare; scale/unit alignment). |
| **CC‑A.6.0‑5** | Families that specialise A.6.0 (e.g., A.6.1, method/discipline profiles) MAY add extra constraints and projection views, but MUST preserve the four‑row Block as the canonical core (no extra semantic rows). |
| **CC‑A.6.0‑6** | Under E.10/E.5, tokens MUST respect strata/family segregation: never redefine Kernel tokens in an Extension/Context/Instance signature; instead, import and align. |
| **CC‑A.6.0‑7** | The **Laws** row contains **axioms/invariants** only; **AdmissibilityConditions** and operational admissions **MUST** appear only in **A.6.1 Mechanisms** that consume this Signature. |
| **CC‑A.6.0‑8 (No‑Realization on Signatures with EffectDiscipline).** | If **EffectDiscipline** appears in **Vocabulary**, faces **MUST** carry a **`No‑Realization` pin** and **MUST NOT** publish handler semantics; any **EffectRealization** is referenced (A.6.1) by id only. |
| **CC‑A.6.0‑9 (CHR‑binding without units/Transport).** | Signatures that declare **measurability intent** (e.g., PrincipleFrame) **SHALL NOT** publish **units, ReferencePlane, ComparatorSet, or Transport**; those are declared only by **UNM** and cited by edition/ref‑id where consumers require numeric comparability. |
| **CC‑A.6.0‑10 (UNM‑priority on faces).** | Any numeric/comparable claim on a Signature face **pins** **CG‑Spec/ComparatorSet edition ids** and, where scale/plane conversion occurs, **UNM.TransportRegistry edition** with **CL/CL^plane policy‑ids**; **penalties route to R/R_eff only**. |
| **CC‑A.6.0‑11 (Bridge‑only crossings).** | Cross‑context/plane reuse of Signature claims **MUST** name a **Bridge** (UTS row) and **MUST NOT** imply implicit equivalence by label; losses are recorded via **CL** (penalties → **R**). |
| **CC‑A.6.0‑12 (Profile conformance).** | If the Signature declares `profile=FormalSubstrate` or `profile=PrincipleFrame`, the corresponding **profile pins** in §4.2 are **mandatory**; failure to emit them makes the Signature **non‑conformant** for that profile. |
| **CC‑A.6.0‑13 (Profile morphism discipline).** | Applying a profile **SHALL** satisfy §4.6 (structure‑preserving morphism: SubjectBlock preserved, Vocabulary/Laws monotone, Applicability restrictive, no admissibility/handlers). |
| **CC‑A.6.0‑14 (SlotSpec for argument positions).** | Any `U.Signature` whose **Vocabulary** declares n‑ary relations or operators **SHALL** provide, for each argument position, a **SlotSpec** triple `⟨SlotKind, ValueKind, refMode⟩` (with `refMode ∈ {ByValue \| RefKind}`) as per A.6.5 `U.RelationSlotDiscipline`. |
| **CC‑A.6.0‑15 (Slot/Ref lexical discipline on signatures).** | Names of SlotKinds and RefKinds used in SlotSpecs **MUST** obey E.10/A.6.5 lexical guards: tokens ending with **`…Slot`** denote SlotKinds only; tokens ending with **`…Ref`** denote either RefKinds or episteme fields whose type is a RefKind; no ValueKind ends with these suffixes. |
| **CC‑A.6.0‑16 (SlotSpecs for n‑ary relations).** | Any `U.Signature` whose **Vocabulary** declares an **n‑ary relation or morphism** **SHALL** assign to each parameter position a `SlotSpec_i = ⟨SlotKind, ValueKind, refMode⟩` as defined in **A.6.5 `U.RelationSlotDiscipline`**; SlotSpecs live inside the Vocabulary row’s per‑relation parameter block and **MUST NOT** introduce additional rows beyond the four‑row Block. |
| **CC‑A.6.0‑17 (SlotSpec‑based substitution laws).** | Specialisations of A.6.0 that define **substitution, retargeting, or profile application** over n‑ary relations/morphisms (e.g., **A.6.2–A.6.4**) **SHALL** phrase their rules in terms of **SlotSpecs** (SlotKind / ValueKind / RefKind) rather than unnamed parameter indices and **SHALL** obey the `…Slot` / `…Ref` lexical discipline in **A.6.5** and **F.18**. |
| **CC‑A.6.0‑18 (Manifest required for reuse).** | If a signature is intended to be imported/reused, it MUST include a `SignatureManifest` (§4.4.1) with explicit `id`, `version`, `imports`, and `provides`. |
| **CC‑A.6.0‑19 (Imports acyclicity).** | If `imports` is present, it MUST be acyclic (no cycles in the signature import graph). |
| **CC‑A.6.0‑20 (No redeclare across imports).** | If `imports` is present, `provides(S)` MUST NOT re‑declare any symbol already provided by any transitive import of `S`. |
| **CC‑A.6.0‑21 (No ghost dependencies).** | If `imports` is present, any non‑Kernel **SymbolId** referenced in the **SubjectBlock/Vocabulary** rows that is **not** provided by this signature MUST be provided by some imported signature (ClaimIds/BridgeIds/policy‑ids/EditionIds are exempt). |
| **CC‑A.6.0‑22 (Realization opacity).** | If a family publishes any Realization of a `U.Signature`, that Realization **MUST** treat imported Signatures as **opaque** (depend only on their `provides` symbols and cited ClaimIds), and **MUST NOT** reference internal structure of imported Signatures. |
| **CC‑A.6.0‑23 (Monotone Realization).** | A Realization **MAY** tighten but **MUST NOT** relax the Signature’s Laws; if weaker laws are needed, authors MUST mint a new Signature (or publish an explicit refinement morphism) rather than weakening an existing contract. |
### Consequences

* **Uniform kernel shape.** Authors can define **theory**, **mechanism**, **method**, **discipline**, or other family signatures without inventing new templates.
    
* **Hard decoupling.** Boundary surfaces stay stable: the A.6.0 Block defines the contract, while mechanisms/realizations can evolve behind it (with monotone strengthening and explicit guard surfaces).
    
**Didactic cohesion.** Readers see the same four conceptual rows across the spec, satisfying E.8’s comparability goal.
### Rationale

**Why “SubjectBlock”?** A.6.1 showed that making the **carrier explicit** (here: *BaseType* — the carrier type) avoids category mistakes when moving between domains (e.g., *set‑algebra on context slices* vs *equivalence‑classes of normalisations*). A.6.0 lifts this to the kernel so every signature can declare **what it is about** before saying **what it provides**.
**Why one universal Block?** Experience with extension/mechanism signatures shows the value of a single canonical “shape” for Vocabulary/Laws/Applicability/Alignment; A.6.0 factors that universal core so other families can add headers and views without fragmenting the Kernel.

**Informative echoes (post‑2015 SoTA).**  
— **Algebraic effects & handlers** (OCaml 5, Koka, Effekt, Links): *operation signatures + handler laws* mirror **Vocabulary + Laws** while keeping implementations separate.  
— **Session/behavioural types** (2016–2024): protocol/admissibility laws parallel the **Laws** row (at mechanism level).  
— **Graded/row‑polymorphic effects** (Granule, row‑effects): inform the **EffectDiscipline** vocabulary and equational laws.

**Profiles rationale (informative).**  
— **FormalSubstrate.** Captures *mathematical language + inference kinds + effect signatures* at the **concept plane**, ensuring the calculus stays independent from handler/realization choices; consuming mechanisms (A.6.1) provide **EffectRealization** only by reference.  
— **PrincipleFrame.** Captures *postulates/invariants + measurability intent (CHR binding)* without committing to **units/planes/Transport**, which are authored centrally in **UNM** so that comparisons remain lawful and edition‑pinned.
### Relations

* **Specialises / is specialised by:** **A.6.1** (adds `OperationAlgebra` / `LawSet` / `AdmissibilityConditions` / `Transport` for mechanisms) and any domain‑profiled signature publications that preserve the four‑row Block.
* **Constrained by:** E.10 LEX‑BUNDLE (registers, strata); D.CTX for Context binding; **Part F** (Bridges & cross‑context transport; naming).
* **Consumed by (profiles):** **`U.FormalSubstrate`** and **`U.PrincipleFrame`** specialisations of `U.Signature` on the principled path; **UNM** (Context Normalization) remains the **single source of truth** for **CG‑Spec/ComparatorSet/Transport** editions that Signature consumers pin on faces.

* **Enables:** uniform authoring and comparison of signatures across Part C families, methods, and discipline glossaries (Part F).
### A.6.0:End
## U.Mechanism - Law‑governed application to a SubjectKind over a BaseType

**One‑line summary.** A `U.Mechanism` is a specialisation of `U.Signature` (A.6.0): its **Vocabulary** is an explicit **OperationAlgebra** whose operators publish **SlotSpecs** (A.6.5), its **Laws** are a **LawSet**, and it adds **AdmissibilityConditions** (operational guards) plus a named **Transport** clause for cross‑context use. Transport is **Bridge‑only** (per **F.9**) with penalties routed to the **Reliability** channel only (**R**, or **R_eff** when distinguished) (per **B.3**); **F/G** remain invariant; **CL^plane** follows **C.2.1 CHR:ReferencePlane**. Realizations MAY be published, but MUST be monotone w.r.t. the Mechanism’s **LawSet** (and any imported Signature laws) and MUST treat imported signatures as opaque (use `imports`/`provides` + ClaimIds).

**Status.** Normative \[A\] in **Part A (Kernel)**.  

**Placement.** Immediately **after A.6.0** as **A.6.1**. **USM (A.2.6)** and **UNM (A.19/C.16)** become **instances conforming to A.6.1** (no semantic change to either).

**Mint vs reuse.** This pattern mints the Kernel lexemes `U.Mechanism`, `U.MechMorph`, and `U.MechAuthoring`, plus the descriptive record names `MechanismDescription`, `MechFamilyDescription`, and `MechInstanceDescription`. It reuses `U.Signature` (A.6.0), `U.Type`, `U.BoundedContext`, and Part F Bridge/CL/ReferencePlane terms without changing them; it does **not** mint new `U.Type` core types.

**Type.** Architectural pattern (kernel‑level; notation‑independent).

**LEX.TokenClass (E.10).** Declared here for the tokens minted by this pattern (see **E.10:7.1**).
* `LEX.TokenClass(U.Mechanism) = KernelToken`
* `LEX.TokenClass(U.MechMorph) = KernelToken`
* `LEX.TokenClass(U.MechAuthoring) = KernelToken`
* `LEX.TokenClass(MechanismDescription) = KernelToken`
* `LEX.TokenClass(MechFamilyDescription) = KernelToken`
* `LEX.TokenClass(MechInstanceDescription) = KernelToken`

### Problem frame

Give FPF **one uniform kernel shape** for things like **USM** (set‑algebra on context slices) and **UNM** (classes of admissible normalizations with ≡\_UNM) so authors can **define, compare, refine, compose, and port** mechanisms **without re‑inventing the meta‑language**; all cross‑context use is **Bridge‑only** with **CL penalties to R/R_eff**, never to **F/G**.
### Problem

Without a kernel abstraction, scope/normalization/comparison constructs proliferate with incompatible algebras and guard surfaces; cross‑context reuse lacks visible **Bridge/CL routing**; comparability drifts into **illegal scalarisation** (e.g., ordinal means). FPF already curbs this via **A.6.0** (Signature discipline, `SignatureManifest`), **USM** (scope algebra & Γ_time), **UNM** (normalize‑then‑compare), and **CG‑Spec** (lawful comparators/ScoringMethods)—but lacks a **common meta‑slot** for “mechanism.”
### Forces

**Locality vs transport.** Semantics are **context‑local**; crossing contexts is **Bridge‑only** (Part F/B.3); penalties hit **R/R_eff**; **F/G** invariant.

**Expressivity vs legality.** Rich operators vs **CHR legality** and **CG‑Spec** (no ordinal averages; lawful unit alignment).

**Time determinacy.** Explicit **Γ_time**; no implicit *latest*. (Required in USM’s `ContextSlice`.)

**Slot clarity vs specialisation depth.** Multi‑level specialisations require explicit **SlotSpecs** (A.6.5) and monotone refinement of **ValueKinds**; SlotKinds are stable across levels (no implicit positional parameters).

**Signature hygiene.** Obey `SignatureManifest` discipline (A.6.0:4.4.1): explicit `imports`/`provides`, acyclic imports, and no redeclare. Treat imported signatures as **opaque** (reference only their `provides` symbols + ClaimIds) and keep realizations monotone.
### Solution

#### Mechanism Intension

A `U.Mechanism` **publishes**  
        `U.Mechanism.Intension := ⟨IntensionHeader, Imports,
                SubjectBlock := ⟨SubjectKind, BaseType, SliceSet, ExtentRule, ResultKind?⟩,
                SlotIndex, OperationAlgebra, LawSet, AdmissibilityConditions,
                Applicability, Transport, Γ_timePolicy, PlaneRegime, Audit⟩`  
and admits Realizations that respect it. The shape is **notation‑independent** and **conceptual** (no tooling, storage, or CI metadata).

* **A.6.0 alignment (normative).** `U.Mechanism` is a specialisation of `U.Signature` (A.6.0). A mechanism publication **SHALL** include the universal four‑row Signature Block (*SubjectBlock / Vocabulary / Laws / Applicability*). The canonical mapping is:  
  – **SubjectBlock** ↔ `SubjectBlock`  
  – **Vocabulary** ↔ `OperationAlgebra` (including inline SlotSpecs per A.6.0:4.1.1 / A.6.5)  
  – **Laws** ↔ `LawSet`  
  – **Applicability** ↔ `Applicability`  
  `SlotIndex` is a mechanism-only **index/projection** over SlotSpecs used by `OperationAlgebra` (and any extra SlotSpecs used only by `AdmissibilityConditions`); it does **not** introduce a fifth Signature row and does not relax A.6.0:4.1.1.
  Mechanism‑only additions are `AdmissibilityConditions`, `Transport`, `Γ_timePolicy`, `PlaneRegime`, and `Audit`; they extend the Signature without contradicting its intension/specification split (A.6.0; CC‑A.6.0‑5).

* **IntensionHeader.** `id` (PascalCase), `version` (SemVer), `status` (draft/review/stable/deprecated).
  **SignatureManifest coupling (normative).** If the mechanism is intended to be imported/reused, it MUST include a `SignatureManifest` (A.6.0:4.4.1) immediately above its Signature Block. When both are present:
  – `IntensionHeader.id = SignatureManifest.id`
  – `IntensionHeader.version = SignatureManifest.version`
  – `IntensionHeader.status = SignatureManifest.status` (when `status` is present)
  – `Imports = SignatureManifest.imports`
  and any public symbols minted by the Mechanism’s Signature Block **MUST** appear in `SignatureManifest.provides`.
  Avoid duplicating `imports/provides` elsewhere: dependency edges and exported names live in the manifest; operational details live in the mechanism.

* **Imports.** (Optional) SignatureIds that supply non‑Kernel symbols used by this mechanism’s Signature Block and/or this mechanism’s operation algebra. If the mechanism includes a `SignatureManifest`, then `Imports` MUST equal `SignatureManifest.imports`. If present, the list MUST be acyclic and MUST respect the layering rule in A.6.0:4.4.1 (E.5.3 + E.10).
* **BaseType.** A `U.Type` the mechanism ranges over. CHR spaces (e.g., a `U.CharacteristicSpace`/chart family) appear here **as types**; outside CHR, use set‑typed `U.Type`s. A conformant `U.Mechanism` publication **MUST NOT** mint a new core type here; it **MUST** reference existing `U.Type`s. If planes differ, state the **ReferencePlane** policy (see *PlaneRegime*).
* **SubjectKind / SliceSet / ExtentRule / ResultKind? / SlotIndex.**
  • **SubjectKind.** The intensional kind acted upon (C.3.1/3.2), separate from quantification.
  • **SliceSet.** The addressable set of Context slices (USM: **ContextSliceSet**).
  • **ExtentRule.** A rule yielding `Extension(SubjectKind, slice)` (C.3.2), used as the quantifier’s domain.
  • **ResultKind?** Optional intensional kind for outputs of `OperationAlgebra`.
  • **SlotIndex.** A set (or map) of SlotSpecs `SlotSpec = ⟨SlotKind, ValueKind, refMode⟩` (A.6.0:4.1.1; A.6.5) covering every argument position used by **OperationAlgebra** and **AdmissibilityConditions**. SlotKinds are stable names for substitution and specialisation; parameter names/indices are presentation only.  
    For **Vocabulary-level** operators, SlotSpecs remain declared **in each operator’s parameter block** (A.6.0:4.1.1). `SlotIndex` is an extracted index that **MUST** be mechanically derivable from those declarations (plus any guard-only SlotSpecs). Guard-only SlotSpecs **SHALL** be authored as part of the **AdmissibilityConditions** predicate signatures (not only as prose) so they remain mechanically extractable.
    **Shorthand views (didactic only).** Authors MAY include a simple name→ValueKind list (a `ValueKindView`) as a didactic projection of SlotSpecs, but it SHALL NOT replace SlotSpecs (`SlotKind/ValueKind/refMode`) in normative Mechanism definitions. If present, it MUST be mechanically derivable from `SlotIndex` (e.g., `ValueKindView = π_value(SlotIndex)` by dropping `refMode`). The colloquial label **ParamKind** is permitted only in prose as a synonym for the `ValueKind` component of a SlotSpec; it MUST NOT be introduced as a field name, token, or type.
* **OperationAlgebra.** Named operations whose signatures are expressed over SlotKinds from `SlotIndex` (A.6.5); **no implicit parameters**. For every n‑ary operator, its Vocabulary declaration **SHALL** publish SlotSpec triples per argument position (A.6.0:4.1.1); positional indices are presentation only. Examples:  
  • **USM:** `∈, ⊆, ∩, SpanUnion, translate, widen, narrow, refit`.  
  • **UNM:** `apply(method)`, `compose`, `quotient(≡_UNM)`; **normalize‑then‑compare**.

* **LawSet.** Equations/invariants (no proofs here). **Admissions/eligibility tests belong under AdmissibilityConditions, not here.** Laws **MUST** be compatible with CHR legality where numeric comparison/aggregation is induced. Examples:
  • **USM:** serial **intersection**; **SpanUnion** only where a **named independence assumption** is satisfied (state features/axes, validity window, evidence class); `translate` uses declared Bridges; **Γ_time** is mandatory.  
  • **UNM:** **scale‑appropriate** transforms — ratio→positive‑scalar; interval→affine; ordinal→monotone; nominal→categorical; `tabular:LUT(+uncertainty)`.  
  *(A conformant `U.Mechanism` publication **MUST NOT** mint a new Kernel token for “certificate”; if such a type is later required, it **MUST** follow DRR/LEX minting.)*

* **AdmissibilityConditions.** Deterministic, **context‑local** *operational* guard predicates that **fail closed** (e.g., “Scope covers TargetSlice” with named **Γ_time**; “NormalizationMethod class + validity window named”). Predicate arguments **SHALL** be declared via SlotSpecs from `SlotIndex` (A.6.5), not as implicit positional parameters. Unknowns **→ {degrade | abstain}**; never coerce to 0/false.

* **Applicability.** Binding to a **`U.BoundedContext`** with stance/plane/time notes and any **CG‑Spec/MM‑CHR** legality claims; cross‑context use is declared via **Transport** only.

* **Transport.** **Bridge‑only** semantics for cross‑context / cross‑plane use: name the Bridge and channel (`Scope|Kind`) per **F.9**, and record **ReferencePlane**(src,tgt) per **C.2.1**. **Terminology:** this `Transport` clause is a declarative policy surface; it does **not** introduce a `U.Transfer` edge (see **E.18** term separation). The Transport clause **MUST NOT** restate CL ladders, `CL^plane`, or Φ/Ψ tables; it **MUST** reference the applicable policy ids / registries instead; penalties **route to R/R_eff only** and **never** mutate F/G (per **B.3**). Crossings are explicit; **no implicit crossings**. Where **USM** or **KindBridge** are used together, apply the **two‑bridge rule** (scope CL and kind `CL^k` penalties handled **separately** to the Reliability channel (**R**/**R_eff**)).

* **Γ_timePolicy.** Point/window/policy; **no implicit “latest.”** Validity windows are **named**; **required** whenever guards reference time.
* **PlaneRegime.** Declare `ReferencePlane` on values/paths; when planes differ, name **CL^plane** and apply a **Φ_plane** policy (Part F/B.3). Plane penalties **do not** change CL; route to **R/R_eff** only; **F/G** stay invariant.

* **Audit.** Conceptual audit surface only (no data/telemetry workflows): crossings are publishable on **UTS**; surface **policy‑ids** rather than tables. Edition pins and regression hooks (if any) are referenced by id; operational details remain out of scope.
* **SignatureBlock alignment.** The referenced Signature’s four‑row Block (A.6.0) is canonical. Any mechanism rendering MUST preserve that block (or an explicit projection of it) and MUST obey A.6.5 for n‑ary argument discipline. SlotKinds and SlotSpecs in `SlotIndex` remain part of the **Vocabulary** row (A.6.0) and **MUST** obey A.6.5. 

* **Compatibility with A.6.\*** A.6.1 is a strict specialisation of A.6.0: the canonical four‑row Signature Block remains the source of truth; additional Mechanism fields (algebra, carriers, evidence) must not introduce new semantic rows or shadow the signature’s `imports`/`provides`.
#### U.MechMorph - Refinement, Extension, Equivalence & Composition

**Intent.** Provide structure‑preserving **relations & constructors** between mechanisms.  
**Definitions.**

* **Refinement** `M′ ⊑ M`: narrows the **SubjectBlock** and/or **SlotSpecs** (ValueKinds/refMode for inherited SlotKinds) and/or **strengthens** `LawSet`/`AdmissibilityConditions` (safe substitution; Liskov‑style). A Refinement **MUST NOT** rename SlotKinds or add new required arguments to inherited operations.
* **Extension** `M ⊑⁺ M″`: **adds operations** (and any new SlotKinds used only by those new operations) without weakening existing Laws/Guards; old programs remain valid (conservative extension).
* **Equivalence** `M ≡ M′`: there exists a bijective mapping between Subjects/ops preserving/reflecting **LawSet** (up‑to‑isomorphism on **BaseType** and **OperationAlgebra**).
    
* **Quotient** `M/≈`: factor by a **congruence** (e.g., **≡_UNM** for charts).

* **Product** `M×N`: independent **BaseTypes**; ops are component‑wise; ensures **no illegal cross‑ops** (e.g., set‑algebra discipline for `SpanUnion`). Where independence is claimed, **name and justify** the assumption (do not mint new Kernel types here).

##### Multi-level specialisation ladders (normative)

Many families need a **generic** mechanism at the top (e.g., “select anything”) and progressively **specialised** mechanisms below (e.g., “select a method by decision theory”, “select a telemetry pack”). To keep such ladders **modular** and to prevent cross‑level leakage:

1. **Explicit parent + morphism kind.** Any mechanism that specialises another **MUST** name its parent and declare whether the step is a **Refinement** (`⊑`) or an **Extension** (`⊑⁺`). A specialisation family **MUST** be acyclic (a DAG).

2. **SlotKind invariance across levels.** For every inherited operation/guard predicate, SlotKinds are invariant (A.6.5). A specialisation step **MUST NOT** rename an inherited SlotKind, change its documented semantics, or rely on positional re‑ordering instead of SlotKind identity.

3. **ValueKind monotonicity.** A Refinement MAY narrow `ValueKind` (i.e., `ValueKind′ ⊑ ValueKind` in Kind‑CAL) and/or `refMode` for an inherited SlotKind, and MAY strengthen Laws/Guards. It **MUST NOT** widen ValueKinds or relax Guards; otherwise mint a new parent mechanism or publish an adapter mechanism.

4. **No new mandatory inputs to inherited operations.** If a specialisation needs extra inputs, it **MUST** introduce a new operation (Extension) or an adapter mechanism; it **MUST NOT** retrofit new required parameters into an inherited operation signature.

5. **No upward leakage.** A top‑level mechanism in a ladder **SHOULD** mention only the most general ValueKinds required by its SlotSpecs and Laws. Domain‑specific artefacts (e.g., decision‑theory policies, OEE generators, evaluation packs) belong in specialised mechanisms that refine slots and/or add operations.

*Informative selector ladder sketch.* `SelectorMechanism` can declare a stable slot interface (`CandidateSetSlot`, `ComparisonResultSlot`, `CriteriaSlot`, `ContextSlot`, `SelectionSlot`) with generic ValueKinds. `SelectorMethodMechanism ⊑ SelectorMechanism` then narrows `CandidateSetSlot.ValueKind` to `U.Method` and (by Extension) adds decision‑theory specific slots/ops; an OEE generator is authored as a separate mechanism that produces candidate/criteria packs consumed by the selector.
**Transport** `Bridge⋅M`: lifts across Contexts/planes; names **CL/CL^k/CL^plane** regimes; penalties → **`R_eff` only**; **UTS row** recommended for publication; **ReferencePlane(src,tgt)** recorded. If mapping losses are material, **narrow** the mapped set or publish an **adapter** (best practice).

**Passing example.** `USM′ = USM + “publish named independence‑assumption evidence for SpanUnion”` ⇒ **Refinement** (strengthened law; substitution‑safe).
**Normalization quotient.** `UNM / ≡_UNM` exposes **compare‑on‑invariants** surfaces for CPM/USCM (normalize‑then‑compare).
#### U.MechAuthoring - Instantiation template

**MechanismDescription (E.8 Tell–Show–Show; I/D/S‑compliant):**
`Mechanism: U.<Name>`  *(Kernel conceptual description; no tooling fields)*
`Imports: <Signatures / U.Types>` - `SubjectBlock: <SubjectKind, BaseType, SliceSet, ExtentRule, ResultKind?>` - `SlotSpecs: <SlotIndex (A.6.5)>` - `OperationAlgebra: <operators with SlotKinds>` - `LawSet: <equations/invariants>` - `AdmissibilityConditions: <admission predicates with SlotKinds; Γ_time>` - `Transport: <Bridge channels; CL/CL^k/CL^plane named; ReferencePlane(src,tgt)>` - `PlaneRegime: <world|concept|episteme rules>`
#### MechFamilyDescription & MechInstanceDescription

* **MechFamilyDescription**: `{Mechanism.Intension, Realizationα, Realizationβ, …}` — each Realization may **tighten** (never relax) Laws (Liskov‑style).

* **MechInstanceDescription**: `{Mechanism.Intension@Context, Windows, named Φ/Ψ/Φ_plane regimes, BridgeIds}` — a **conceptual instance**; operational telemetry/workflows are out of scope.
#### Defaults

* **Local‑first semantics.** All judgments are **context‑local**; crossings are **explicit** and **costed** (CL→R only).
* **Compliance‑first comparability.** Numeric comparison/aggregation requires **CG‑Spec** (lawful **SCP**, Γ‑fold, MinimalEvidence); **partial orders return sets**; **no ordinal means**.
* **Tri‑state discipline.** `unknown → {degrade|abstain}`; `sandbox/probe‑only` is a **LOG branch** with a policy‑id (no implicit `unknown→0/false`).
* **R‑only penalties.** **Φ/Ψ/Φ_plane** are **monotone and bounded**; penalties route to **`R_eff` only**; **F/G invariant**.
#### Born‑via‑A.6.1 sketch (informative)

**PTM — Publication & Telemetry Mechanism (informative)**
**BaseType:** `SoTA‑Pack(Core)`, `PathId/PathSliceId`, `PolicyId`. **OperationAlgebra:** emit **selector‑ready** packs with parity pins and **telemetry stubs**; listen for edition/illumination bumps; trigger **slice‑scoped** refresh. 
**LawSet:** **no change of dominance defaults** unless CAL policy promotes; edition-aware refresh.  
**Guards:** **GateCrossing visibility harness** blocks publication on missing crossing attestations (BridgeCard+UTS row, ReferencePlane, CL/CL^k/CL^plane, Φ/Ψ policy-ids), on lane-purity violations (CL→R only; F/G invariant), or on lexical SD violations (E.10). 
**Transport/Audit:** **G.10/G.11** publication & refresh semantics (CL routing to **R/R_eff**).

*Informative SoTA:* telemetry hooks align with post‑2015 quality‑diversity families (CMA‑ME/MAE, DQD/MEGA) and open‑ended methods (POET‑class) when monitored via illumination telemetry rather than scored.
#### 60‑second didactic script

> *“To mint a mechanism, fill a **Mechanism.Intension**: declare **SubjectBlock** (**SubjectKind**, **BaseType**, **SliceSet**, **ExtentRule**, **ResultKind?**) and **SlotSpecs** (use a `SignatureManifest` if it is reusable); then **OperationAlgebra/Laws/AdmissibilityConditions** and **Γ_time**; define **Transport** (Bridge/CL with penalties to R only), and **Audit** (UTS + Path pins). USM and UNM are already such mechanisms; the same template births comparison, scoring, and publication mechanisms—safely bound to **CG‑Spec**—without leaving the kernel grammar.”*
#### Quick “builder’s” checklist (author‑facing)

1. Draft a **run↔design charter**: why this Mechanism, which **guard surfaces** and **comparability** are in scope; which `DesignRunTag`/`CtxState.locus` boundary it mediates; is a **Γ_m (CAL)** builder needed?
    
* Fill **Mechanism.Intension** (**SubjectBlock**, **SlotSpecs**, **OperationAlgebra**, **LawSet**, **AdmissibilityConditions**, **Applicability**, **Transport**, **Γ_timePolicy**, **PlaneRegime**, **Audit**).
    
* Bind **CHR legality & CG‑Spec** when comparing/aggregating (ComparatorSet, ScaleComplianceProfile (SCP), MinimalEvidence, Γ‑fold).
    
Ship **UTS + G.10**; wire **G.11** telemetry (PathSlice‑keyed); ensure penalties **route to `R_eff` only**.
### Archetypal Grounding

#### U.Scope (Claim/Work/Publication) — USM as a U.Mechanism instance (informative example)

* **Imports:** `U.ContextSliceSet`; Part F.9 **Bridge**; **C.2.1 ReferencePlane** (noted for crossings); **C.2.2 F–G–R**; **C.2.3 U.Formality**.
* **BaseType:** `U.ContextSliceSet`.
* **SliceSet:** `U.ContextSliceSet` (addressable `U.ContextSlice`s).
* **SubjectKind:** `U.Scope` with specializations `U.ClaimScope` (G), `U.WorkScope`, and `U.PublicationScope`.
* **OperationAlgebra:** `∈, ⊆, ∩, SpanUnion, translate, widen, narrow, refit`.
* **LawSet:** serial **intersection**; **SpanUnion** only where a **named independence assumption** is satisfied (state features/axes, validity window, evidence class); **translate** uses declared **Bridges**; **Γ_time** is **mandatory**.
* **AdmissibilityConditions:** deterministic **“Scope covers TargetSlice”**; **fail‑closed**; `unknown → {degrade|abstain}` (no implicit `unknown→0/false`).
* **Transport:** **Bridge‑only** with **CL**; penalties → **`R_eff`**; **F/G** invariant; publish UTS notes.
* **Γ_timePolicy:** `point | window | policy`; **no implicit “latest.”**
* **PlaneRegime:** *not applicable to scope sets* (scope is set‑valued over `ContextSlice`, no value‑plane); **CL^plane** N/A.
### Bias-Annotation (informative)

This pattern intentionally biases Mechanism authoring toward explicit contracts, context-local semantics, and auditable reuse.

* **Gov (governance).** Bias toward publishable obligations (Signature rows, CC items) and explicit policy-ids for crossings. Risk: perceived authoring overhead. Mitigation: reuse the `U.MechAuthoring` template; keep Realizations opaque and put operational details outside the Kernel.
* **Arch (architecture).** Bias toward locality-first semantics and **Bridge-only** transport with costs routed to **R/R_eff**. Risk: reduced convenience for ad-hoc cross-context reuse. Mitigation: publish adapter mechanisms and make crossings explicit via `Transport` (CC‑UM.3/CC‑UM.4).
* **Onto/Epist (ontology/epistemology).** Bias toward lawful comparability (CHR legality; CG‑Spec binding) and against illegal scalarisation (e.g., ordinal means). Risk: some heuristic scoring practices become non-conformant. Mitigation: represent uncertainty explicitly and use `unknown → {degrade|abstain}` rather than coercions (CC‑UM.7).
* **Prag (practice).** Bias toward notation-independence and against tool/vendor tokens in the Kernel. Risk: teams may want to inline CI/telemetry fields. Mitigation: keep audit surfaces conceptual (`Audit`) and reference operational hooks by id only (CC‑UM.6).
* **Did (didactic).** Bias toward explicit SlotKinds/SlotSpecs over positional parameters. Risk: steep learning curve. Mitigation: allow non-normative projections (`ValueKindView`) and include a “60‑second” script plus a builder’s checklist (A.6.1:4.7/4.8).
### Conformance Checklist (normative)

| ID | Requirement |
|----|-------------|
| **CC‑UM.0** | **A.6.0 alignment:** a conformant `U.Mechanism` publication **MUST** include the four‑row `U.Signature` Block (A.6.0). `OperationAlgebra` (including inline SlotSpecs per A.6.0:4.1.1/A.6.5) is the **Vocabulary** row, `LawSet` the **Laws** row, and `Applicability` the **Applicability** row; the universal block remains the comparability contract. Any `SlotIndex` is an index/projection and **MUST NOT** be treated as a fifth Signature row. |
| **CC‑UM.1** | **Complete Mechanism.Intension:** a conformant `U.Mechanism` publication **MUST** publish: `IntensionHeader(id, version, status); Imports; SubjectBlock (SubjectKind, BaseType, SliceSet, ExtentRule, ResultKind?); SlotIndex (A.6.5); OperationAlgebra; LawSet; AdmissibilityConditions; Applicability; Transport (Bridge named; ReferencePlane); Γ_timePolicy; PlaneRegime; Audit`. `IntensionHeader.id` **MUST** be PascalCase; `version` **MUST** follow SemVer; `status ∈ {draft|review|stable|deprecated}`. Eligibility/admission tests **MUST** be expressed as `AdmissibilityConditions`, not as `LawSet`. If the mechanism is intended to be imported/reused, it **MUST** also include a `SignatureManifest` per **CC‑A.6.0‑18**, consistent with `IntensionHeader`/`Imports` (A.6.1:4.1). |
| **CC‑UM.2** | **Monotone realization (contract discipline):** if a mechanism publishes (or implies) any realization of a signature, that realization MUST satisfy the signature’s LawSet (and imported laws) and MAY only tighten (never relax) them. Realizations MUST treat imported signatures as **opaque**: reference only symbols in `provides` (A.6.0:4.4.1) and cite ClaimIds (A.6.B). Do not mint a parallel signature header; use `SignatureManifest`. |
| **CC‑UM.3** | **Bridge‑only transport:** for any cross‑context/plane use, `Transport` **MUST** name the BridgeId and channel (F.9) and **MUST** record `ReferencePlane(src,tgt)` (C.2.1); when planes differ it **MUST** name `CL^plane`. Implicit crossings **MUST NOT** occur. When typed reuse is involved, the two‑bridge rule **MUST** apply (scope CL and kind `CL^k` penalties routed separately to **R**/**R_eff**). `Transport` is a declarative policy surface and **MUST NOT** be used to introduce a `U.Transfer` edge (E.18 term separation). It **MUST NOT** restate CL ladders or Φ/Ψ/Φ_plane tables; it **MUST** reference policy ids / registries. |
| **CC‑UM.4** | **R‑only routing:** any CL / `CL^k` / `CL^plane` penalties declared or incurred by `Transport` **MUST** reduce the Reliability channel only (**R**, or **R_eff** when distinguished) per **B.3**; they **MUST NOT** mutate **F/G**. |
| **CC‑UM.5** | **CG‑Spec binding:** if the Mechanism defines or induces any numeric comparison or aggregation, it **MUST** bind to **CG‑Spec/MM‑CHR** (lawful **SCP**, Γ‑fold, MinimalEvidence; normalize‑then‑compare) and obey CHR legality: partial orders **MUST** return sets; ordinal means **MUST NOT** be computed; interval/ratio arithmetic **MUST** occur only with unit alignment (CSLC‑proven). |
| **CC‑UM.6** | **E.8/E.10 compliance:** the A.6.1 publication **MUST** include Tell–Show–Show under **“Archetypal Grounding”** and **MUST** respect twin registers & I‑D‑S. Any new `U.*` token (including any new `U.Type`) **MUST** have a DRR and a `LEX.TokenClass` entry; `BaseType` **MUST** reference an existing `U.Type` (no in‑place minting), and any new `U.Type` required for that reference **MUST** be minted via DRR/LEX outside the mechanism definition. Non‑spec surfaces **MUST** end with **“…Description”**. Core narrative **MUST NOT** include tool/vendor tokens. |
| **CC‑UM.7** | **Unknowns tri‑state:** guard predicates in `AdmissibilityConditions` **MUST** be deterministic, context‑local, and fail‑closed; they **MUST** define `unknown → {degrade|abstain}` and **MUST NOT** coerce unknowns to 0/false. Sandbox/probe branches **MUST** live in **SoS‑LOG** (not Acceptance). |
| **CC‑UM.8** | **Multi‑level specialisation discipline:** if a Mechanism declares itself as `⊑` or `⊑⁺` of another Mechanism, it **MUST** satisfy A.6.1:4.2.1 (explicit parent+morphism kind; SlotKind invariance; monotone ValueKind narrowing; no new mandatory inputs to inherited ops). |
| **CC‑UM.9** | **SlotIndex is a view:** `SlotIndex` **MUST** be mechanically derivable from (i) the per‑operator SlotSpecs in `OperationAlgebra` (A.6.0:4.1.1) plus (ii) any guard‑only SlotSpecs **declared with** `AdmissibilityConditions` predicate signatures; it **MUST NOT** contradict those SlotSpecs. Any didactic `ValueKindView` (or “ParamKind” lists) are non‑normative projections only. |
| **CC‑UM.10 (Multiple realizations rationale).** | If multiple Realizations are published for the same Mechanism.Intension, authors **SHOULD** provide a short trade‑off rationale (why/when to choose which), without introducing new obligations beyond the referenced Signature/ClaimIds. |
### Common Anti-Patterns and How to Avoid Them (informative)

| Anti-pattern | What it looks like | Remedy |
| --- | --- | --- |
| **SlotIndex treated as a 5th Signature row** | Reviews start comparing mechanisms by `SlotIndex` only; SlotSpecs disappear from operator declarations. | Keep SlotSpecs **inline per operator**; treat `SlotIndex` as a derived projection only (CC‑UM.0, CC‑UM.9). |
| **Admission tests put in LawSet** | “Eligibility” and “coverage” checks appear as laws; implementations silently diverge. | Move operational guards to `AdmissibilityConditions` (CC‑UM.1). |
| **Implicit crossings / hidden CL ladders** | A mechanism is reused across Contexts/planes without a declared BridgeId/ReferencePlane; CL/Φ/Ψ tables get copied into local prose. | Crossings must be explicit and **Bridge-only**; `Transport` references policy ids/registries (CC‑UM.3). |
| **Penalties leak into F/G** | A plane/kind/scope mismatch is handled by mutating Formality or Guarantee claims. | Route penalties to **R/R_eff only**; keep **F/G invariant** (CC‑UM.4). |
| **Illegal scalarisation** | Ordinal means or cross-unit arithmetic is performed “because we need a number”. | Bind numeric comparison/aggregation to CG‑Spec/MM‑CHR and CSLC; keep partial orders set-valued (CC‑UM.5). |
| **Specialisation breaks SlotKind identity** | Refinements rename SlotKinds or add mandatory parameters to inherited operations. | SlotKinds are invariant; refinements only narrow ValueKinds/guards; add new ops via Extension (CC‑UM.8). |
| **Unknown coerced to 0/false** | Guard failures silently become “false” or scores become 0. | Use tri-state discipline: `unknown → {degrade|abstain}`; probing lives in LOG branches (CC‑UM.7). |
| **In-place minting of BaseType** | A mechanism definition introduces a new `U.Type` ad hoc. | `BaseType` references an existing `U.Type`; mint new types via DRR/LEX outside the mechanism (CC‑UM.6). |
### Consequences (informative)

* **Uniform kernel shape.** Scope, normalization, comparison families can be authored and compared without lexical drift.
* **Auditable reuse.** GateCrossings are UTS-visible via **CrossingBundle** (**E.18**); penalties are transparent (**R only**), with **LanePurity** + **Lexical SD** (E.10) checks runnable (GateChecks in **A.21**; Bridge+UTS discipline **A.27**; BridgeCard **F.9**).
* **Scalarisation avoids illegality.** Partial orders remain set‑valued; cross‑scale arithmetic is blocked by **CG‑Spec/CSLC**.
### Rationale (informative)

Anchoring mechanisms in an explicit **Signature → Realization** discipline (A.6.0 `SignatureManifest` + CC‑UM.2 monotonicity/opacity) keeps reuse safe: signatures are the contract; realizations may vary but cannot relax laws. It also makes cross‑context (Bridge) crossings explicit and costed on `R_eff` (never F/G).
### SoTA-Echoing (post-2015 practice alignment) (informative)

**Purpose.** To show how the FPF concept of a *Mechanism* (law-governed signature with guards and transport) aligns with, and improves upon, leading research and engineering practices after 2015.  
All comparisons are *informative*: they serve didactic continuity, not new normative force.

#### Contemporary references (post-2015 sources)

**SoTA binding note (E.8:11).** No dedicated `SoTA‑Pack(Mechanisms)` (G.2) is registered at the time of writing; until one exists, this section cites primary post‑2015 sources directly and SHOULD later be reduced to ClaimSheet/CorpusLedger/BridgeMatrix ids (to avoid forking untracked SoTA narrative).

1. **Algebraic effects and handlers** (post‑2015 effect systems and handler implementations) — **Adopt/Adapt.** They motivate the split “operation signature vs handling”; A.6.1 keeps `OperationAlgebra` explicit and adds `LawSet`, `AdmissibilityConditions`, and `Γ_time` so legality and time are not implicit. *(e.g., Hillerström & Lindley, 2018; Multicore/OCaml‑5 effect handlers, 2021–2022).*

2. **Typed semantic translation frameworks** (institution‑style morphisms and functorial data migration) — **Adapt.** A.6.1 uses explicit refinement/extension/quotient structure (`U.MechMorph`) but requires cross‑Context transport to be **Bridge‑only** with penalties routed to **R/R_eff**. *(e.g., Spivak & Schultz, 2017; CQL practice, 2017–2023).*

3. **Policy‑as‑Code** (declarative guard/risk rules) — **Adapt.** A.6.1 turns runtime policies into deterministic, fail‑closed `AdmissibilityConditions` with named Γ_time windows; evaluators and tool binding stay out of Core. *(e.g., Open Policy Agent / Rego, 2016+; UL 4600:2020; ISO 21448:2019).*

4. **Session / typestate types** (post‑2015 protocol safety) — **Adapt.** Protocol constraints inform how guards can restrict legal operator sequences, but A.6.1 keeps the contract as signature+laws and surfaces sequencing constraints as explicit guard predicates rather than hidden state. *(e.g., Scalas & Yoshida, 2016–2018; mainstream session‑type toolchains, 2017–2024).*

5. **Lawful measurement and calibrated uncertainty** (monotone and calibrated learning, conformal prediction) — **Adopt/Adapt.** Modern calibrated methods show why comparability must be explicit; A.6.1 binds induced numeric operations to **CG‑Spec/CSLC** and forbids illegal scalarisation (e.g., ordinal means). *(e.g., Romano et al., 2019; Angelopoulos & Bates, 2021).*

Each source corresponds to a distinct *Tradition*: formal semantics, categorical algebra, compliance automation, protocol safety, and lawful AI.
#### Alignment with A.6.1 fields and concepts

| A.6.1 construct (claim) | SoTA practice (post‑2015) | Primary sources (post‑2015) | Alignment delta encoded by A.6.1 | Adopt / Adapt / Reject |
| --- | --- | --- | --- | --- |
| **OperationAlgebra + LawSet** | Algebraic effects & handlers separate operation signatures from handlers. | Hillerström & Lindley (2018); OCaml‑5/Multicore OCaml effect handlers (2021–2022). | FPF keeps operator signatures explicit, adds an explicit `LawSet`, and treats admissibility/time as separate surfaces (no hidden context). | Adopt/Adapt |
| **U.MechMorph** (Refine/Extend/Quotient) | Institution‑style morphisms / functorial data migration provide typed signature translations and quotients. | Spivak & Schultz (2017); CQL ecosystem papers/docs (2017–2023). | FPF reuses the morphism structure but requires cross‑Context use to be stated as `Transport` with an explicit `BridgeId` (F.9) and CL/CL^k/CL^plane regimes; penalties route → `R/R_eff` only (B.3). | Adapt |
| **AdmissibilityConditions + Γ_timePolicy** | Policy‑as‑Code makes guard/risk predicates executable and reviewable. | Open Policy Agent / Rego (2016+); UL 4600:2020; ISO 21448:2019. | FPF treats policy predicates as deterministic, fail‑closed guards with named validity windows; it forbids implicit “latest” and avoids embedding evaluators in Core. | Adapt |
| **AdmissibilityConditions** (sequencing) | Session/typestate disciplines constrain legal operation sequences. | Scalas & Yoshida (2016–2018); post‑2017 multiparty session type toolchains. | FPF uses guards to make sequencing constraints explicit and auditable, while leaving the kernel contract as signature+laws (no hidden automata). | Adapt |
| **CG‑Spec / MM‑CHR binding** | Calibrated/monotone ML and conformal prediction make uncertainty and monotonicity explicit. | Romano et al. (2019); Angelopoulos & Bates (2021). | FPF requires scale legality (CSLC) and forbids ordinal averaging; partial orders remain set‑valued unless a lawful scorer is declared. | Adopt/Adapt |
#### Adopt / Adapt / Reject summary

* **Adopt.** The “explicit operations + explicit laws” stance from modern semantics work, and the calibrated/monotone stance from lawful ML, because both reduce hidden assumptions.

* **Adapt.** Typed translation ideas and policy‑as‑code idioms into a kernel form that is Context‑local by default, with explicit guards (`AdmissibilityConditions`) and explicit time windows (`Γ_timePolicy`) instead of implicit recency.

* **Reject.** Tool‑bound semantics, automatic recency heuristics, and any cross‑scale arithmetic without CSLC proof; A.6.1 also rejects implicit cross‑Context/plane reuse.

* **Cross‑Context/plane delta (E.8:11).** Whenever a SoTA practice would reuse semantics across Contexts/planes, A.6.1 requires an explicit `BridgeId` (F.9) plus CL / `CL^k` / `CL^plane` anchors and Φ/Ψ/Φ_plane policy‑ids (B.3), with penalties routed to `R/R_eff` only (never mutating `F/G`).
#### Holonic repeatability

The same correspondence holds at **every holonic level**:  
a part-holon declares its own `OperationAlgebra/LawSet/AdmissibilityConditions`; a whole-holon merges them via Bridges; a meta-holon re-binds mechanisms under a new Γ-closure. All penalties remain in **R / R_eff**, while **F / G** invariants propagate intact.
### Relations (quick pointers)

Builds on **A.6.0**; instantiates **A.2.6 USM** (ContextSlice, Γ_time, ∩/SpanUnion/translate) and **A.19/C.16 UNM** (classes, ≡\_UNM, validity windows); uses **Part B** (Bridges, CL/CL^k/CL^plane; **no implicit crossings**); binds **CG‑Spec** for any numeric comparison/aggregation; telemetry/publication via **G.10/G.11**.
### A.6.1:End
## U.EffectFreeEpistemicMorphing — Effect‑free morphisms of epistemes

**One‑line summary.** `U.EffectFreeEpistemicMorphing` (EFEM) is the universal class of **effect‑free, law‑governed morphisms between epistemes**. An EFEM morphism rewrites episteme components (ClaimGraph, `describedEntityRef`, optional `groundingHolonRef`, `viewpointRef`, `referenceScheme`, and—where C.2.1+ is in use—`representationSchemeRef` and related slots, plus meta) in a **conservative, functorial, reproducible** way, with an explicit mode for what happens to the **DescribedEntitySlot** (`DescribedEntityChangeMode ∈ {preserve, retarget}`) as defined by `C.2.1 U.EpistemeSlotGraph`.

**Placement.** After **A.6.1 `U.Mechanism`** and before any specialisations (`A.6.3 U.EpistemicViewing`, `A.6.4 U.EpistemicRetargeting`).

**Builds on.**
A.6.0 `U.Signature` (subject/vocabulary/laws/applicability); A.6.1 `U.Mechanism`; A.6.5 `U.RelationSlotDiscipline`; C.2.1 `U.Episteme — Epistemes and their slot graph`; E.10.D2 (I/D/S discipline); C.3.* (Kind‑CAL / KindBridge for described‑entity classes).

**Used by.**
A.6.3 `U.EpistemicViewing`; A.6.4 `U.EpistemicRetargeting`; E.17.0 `U.MultiViewDescribing`; E.17 (MVPK); E.18 (E.TGA StructuralReinterpretation, Transduction graph).

### Problem frame

FPF has many operations that **transform knowledge artifacts** without directly doing work in the world:

* turning an informal method description into a more formal specification;
* projecting a large system description into a smaller “for‑safety‑officer” view;
* re‑expressing the same behavioural model in a different calculus or notation;
* retargeting an analysis from “this subsystem” to “that subsystem” along a known KindBridge.

All of these are **episteme→episteme** transforms: they change what is written in an episteme, but they **do not themselves measure, execute, or actuate**. They are neither Work (A.15) nor Mechanisms in the A.6.1 sense; they are “pure morphisms over epistemes”.

Without a universal pattern for such morphisms:

* every family (KD‑CAL, E.TGA, MVPK, discipline packs) reinvent their own notion of “projection”, “reinterpretation”, or “refinement”;
* laws about what may change in an episteme (content vs described entity vs grounding holon vs reference plane) fragment across the spec;
* cross‑family reasoning (e.g. “this E.TGA StructuralReinterpretation is a retargeting, not a view”) becomes brittle and ad‑hoc.
### Problem

Concretely, without EFEM:

1. **No single place for “effect‑free” discipline.**
   The distinction *“episteme‑only change”* vs *“Work in the world”* is already important (C.2.1 separates episteme components from Work and from presentation surfaces), but the laws for “episteme‑only” operations are scattered or implicit. 

2. **Described entity behaviour is unclear.**
   Many transforms **intend** to keep “what this episteme is about” fixed (viewing), others **intend** to change it under an invariant (retargeting). Without a common *DescribedEntityChangeMode* discipline we get silent breaks in “describedEntity”: an operation that looks like a harmless format change may in fact surreptitiously change the entity‑of‑interest.

3. **No functorial backbone.**
   MVPK, KD‑CAL and E.TGA all implicitly assume that episteme transforms **compose** and respect identities, but the conditions for this (purity, conservativity, idempotence, scope) are not formulated once and reused. Different parts of the spec repeat subtly different sets of laws.

4. **Slot/Ref confusion.**
   With the new `U.EpistemeSlotGraph` and `U.RelationSlotDiscipline`, every episteme now has explicit **SlotKind / ValueKind / RefKind** discipline. Laws for “projection” or “retargeting” that are written against “fields” or unnamed tuple components are now out of alignment.

The result: engineers and tool builders can no longer tell **when they are allowed to transform epistemes without changing what is being claimed about the world**, nor what needs to be witnessed by Bridges and CL‑penalties when describedEntity does change.
### Forces

* **Epistemic purity vs operational power.**
  Effect‑free episteme transforms are attractive precisely because they can be reasoned about algebraically and composed freely. But the more operational power they are given (IO, solver calls, measurements), the less they remain “pure” and the more they belong under `U.Mechanism` / `U.WorkEnactment`.

* **Preserve vs retarget.**
  Viewing is describedEntity‑preserving; reinterpretation along a KindBridge is describedEntity‑retargenting. Both are important, but **they must be distinguished and witnessed differently**.

* **Conservativity vs usefulness.**
  EFEM should be **conservative**: no new intensional commitments beyond what input epistemes already entail. At the same time, we need transformations that can *factor*, *aggregate*, or *normalise* content, which may drop some information or change its representation.

* **Locality vs reference planes and Bridges.**
  Epistemes live on **reference planes** (C.2.1); cross‑plane and cross‑Context reasoning goes via Bridges and CL penalties (Part F/B.3). EFEM must respect this: it cannot smuggle plane changes or transport into “pure” content rewrites.

* **I/D/S strict distinction.**
  Intension (`I`) is not itself an episteme; `…Description` and `…Spec` are epistemes with a `DescriptionContext = ⟨DescribedEntityRef, BoundedContextRef, ViewpointRef⟩`. EFEM must support operations on D/S epistemes while keeping the I/D/S layering intact (A.7, E.10.D2).
### Solution — define U.EffectFreeEpistemicMorphing once

#### Informal definition

> **Definition.** A `U.EffectFreeEpistemicMorphing` (EFEM) is a class of **episteme→episteme morphisms** that:
>
> * operate **only** on the components of an episteme as fixed in `C.2.1 U.EpistemeSlotGraph` (ClaimGraph, slots for described entity, grounding holon, viewpoint, representation/reference schemes, meta); 
> * are **effect‑free** (no Work, no Mechanism application, no mutation of systems or carriers);
> * are **conservative** in what they claim about the described entity (no new intensional commitments beyond logical consequences under the declared ReferenceScheme);
> * are **functorial** (identities and composition behave as expected on the category of epistemes);
> * declare an explicit **DescribedEntityChangeMode ∈ {preserve, retarget}**, controlling how `DescribedEntitySlot` (and associated subjectRef) behaves.

The **objects** of the EFEM universe are epistemes of some `U.EpistemeKind` (typically realised as `U.EpistemeCard` / `U.EpistemeView` / `U.EpistemePublication`). The **arrows** are EFEM morphisms `f : X → Y` satisfying the P0–P5 laws below.

Specialisations:

* `U.EpistemicViewing` (A.6.3) — EFEM with `DescribedEntityChangeMode = preserve`.
* `U.EpistemicRetargeting` (A.6.4) — EFEM with `DescribedEntityChangeMode = retarget`, tied to KindBridges/ReferencePlanes.
#### Signature Block (A.6.0 alignment)

As a `U.Signature`, EFEM publishes the following **SubjectBlock** and the standard four‑row block (“SubjectBlock / Vocabulary / Laws / Applicability”) from A.6.0, specialised to episteme→episteme morphisms.

**SubjectBlock**

```
SubjectBlock
  SubjectKind   = U.EffectFreeEpistemicMorphing
  BaseType      = ⟨X : U.Episteme, Y : U.Episteme⟩        // carrier pair (domain,codomain)
  Quantification= SliceSet:=U.ContextSliceSet; 
  ExtentRule:=admissibleEpistemeMorphisms // Context slices & admissible EFEM per slice
  ResultKind?   = U.Morphism                               // typed morphism f : X→Y
```

This says: EFEM is “about” **morphisms between epistemes**, indexed by Context slices; its results are morphisms of a declared type `U.Morphism` in the `Ep` category.

**Vocabulary (core operators & kinds)**

* **Types**
  * `U.Episteme` (as holon; realised via species `U.EpistemeCard`, `U.EpistemeView`, `U.EpistemePublication` under C.2.1).
  * `U.EpistemeKind` (episteme n‑ary relation signature; slots per A.6.5 / C.2.1).
  * `U.SubjectRef` (subject reference; for D/S epistemes this is `DescriptionContext = ⟨DescribedEntityRef, BoundedContextRef, ViewpointRef⟩` per IDS‑13 (DescriptionContext discipline; C.2.1 §6.1 / E.10.D2)).
  * `U.Morphism` (arrow in `Ep`).
  * `U.DescribedEntityChangeMode = {preserve, retarget}` (enumeration; no new Kernel type for “DescribedEntity”).

* **Operators (arrow algebra)**

  * `id_X : U.Morphism(X→X)` for any episteme `X`.
  * `compose(g,f) : U.Morphism(X→Z)` where `f : X→Y`, `g : Y→Z`.
  * `apply(f, x:U.Episteme) : U.Episteme`.
  * `dom(f), cod(f) : U.Episteme`.
  * `subjectRef(E) : U.SubjectRef`.
  * `describedEntityChangeMode(f) : U.DescribedEntityChangeMode`  // EFEM‑level characteristic from C.2.1.

Each operator that takes epistemes as arguments obeys **SlotSpec discipline** from A.6.5: in particular, laws below are phrased in terms of the **named SlotKinds** (`DescribedEntitySlot`, `GroundingHolonSlot`, `ClaimGraphSlot`, `ViewpointSlot`, `ReferenceSchemeSlot`, `ViewSlot`, and—when the C.2.1+ extension is used—`RepresentationSchemeSlot`) and their associated ValueKind/RefKind; we never speak of “field 1/2/3”.

**Laws row** and **Applicability** are given by P0–P5 and the Scope clause below.
#### Laws P0–P5 (normative)

All laws below are **normative**: any morphism advertised as an instance of `U.EffectFreeEpistemicMorphing` SHALL satisfy them.

##### P0 — Typed signature & component profile (C.2.1‑grounded)

For any EFEM morphism `f : X→Y`:

1. **Typed objects.** `X` and `Y` are epistemes of declared kinds `K_X, K_Y : U.EpistemeKind`, each with a SlotKind signature as per C.2.1 and A.6.5 (at least `DescribedEntitySlot`, `ClaimGraphSlot`, `ViewpointSlot?`, `RepresentationSchemeSlot?`, `ReferenceSchemeSlot?`; `GroundingHolonSlot?`, `ViewSlot?` where relevant).

2. **Component projection.** For each episteme `E`, EFEM laws may refer to:
   * `content(E) : U.ClaimGraph` — value of `ClaimGraphSlot` (stored **by value** in the minimal core);
   * `describedEntityRef(E) : U.EntityRef` — value of the RefKind for `DescribedEntitySlot`;
   * `groundingHolonRef?(E) : U.HolonRef` — if the episteme kind includes `GroundingHolonSlot`;
   * `viewpointRef?(E) : U.ViewpointRef` — if `ViewpointSlot` is present;
   * `referenceScheme?(E) : U.ReferenceScheme` — value of `ReferenceSchemeSlot` (stored **by value** in the minimal core);
   * `representationSchemeRef?(E) : U.RepresentationSchemeRef` — only for episteme kinds that use the C.2.1+ `RepresentationSchemeSlot`;
   * `meta(E)` — edition/provenance/status components (species‑level).

3. **Declared `DescribedEntityChangeMode`.**
   Each EFEM species **declares** a fixed `DescribedEntityChangeMode ∈ {preserve, retarget}`. At the level of individual morphisms:

   * if `describedEntityChangeMode(f) = preserve`, then `describedEntityRef(Y) = describedEntityRef(X)` (and usually `groundingHolonRef(Y) = groundingHolonRef(X)` unless an explicit Grounding Bridge is declared);
   * if `describedEntityChangeMode(f) = retarget`, then `describedEntityRef(Y) ≠ describedEntityRef(X)` in general and a **KindBridge** between the two described entities MUST be named (A.6.4 / F.9).

4. **SubjectRef compatibility.**
   For D/S epistemes (`…Description` / `…Spec`), `subjectRef(E)` is a `DescriptionContext = ⟨DescribedEntityRef, BoundedContextRef, ViewpointRef⟩` (E.10.D2). EFEM species SHALL state how `subjectRef` transforms in terms of these components (usually: preserve or explicitly adjust `ViewpointRef` while preserving `DescribedEntityRef` and `BoundedContextRef`).
##### P1 — Purity (no external effects)

EFEM morphisms are **pure functions on epistemes**:
* Applying `f : X→Y` **does not**:
  * change any `U.System` or `U.Holon` state;
  * execute Work (`U.WorkEnactment`) or run a `U.Mechanism` (A.6.1) with operational guards;
  * mutate `U.PresentationCarrier` (files, databases, message buses, IDEs).
* The **only** state change introduced by EFEM is the replacement of input epistemes by output epistemes according to `apply(f, X) = Y`, with all component changes governed by P2–P5.

Any operation that requires **measurements, simulations, solver calls, or tool use with external side‑effects** SHALL be modelled as a `U.Mechanism`/`U.Work` that **produces new epistemes**, which may then be related by EFEM morphisms.
##### P2 — Conservativity (no new intensional commitments)

Let `content_X = content(X)`, `content_Y = content(Y)`, with associated `referenceScheme_X`, `referenceScheme_Y`, `describedEntityRef_X`, `describedEntityRef_Y`, `groundingHolonRef_X`, `groundingHolonRef_Y`. Interpret each `content` via its `ReferenceScheme` and slots. Then:

> The set of **claims about the described entities** that can be read from `Y` **SHALL NOT introduce new atomic commitments** beyond those that are logical consequences of the claims read from `X`, possibly after applying a declared correspondence between representation/reference schemes.

Intuitively:

* EFEM may:
  * delete information (projection/abstraction);
  * normalise or re‑express information (e.g., reordering ClaimGraph, changing notation via a ReferenceScheme/RepresentationScheme correspondence);
  * add **meta‑claims about the episteme** itself (edition, source, status, witness entries).

* EFEM may **not**:
  * assert new atomic facts about the described entities or grounding holons beyond what is derivable from input ClaimGraphs under the declared ReferenceSchemes;
  * silently widen the scope of claims (e.g., treating local facts as global, changing Context or ReferencePlane without a Bridge).

Where `describedEntityChangeMode(f) = retarget`, conservativity is understood **relative to a declared invariant** of the KindBridge (A.6.4): e.g., conservation of energy for a Fourier transform, or preservation of functional behaviour for a structural reinterpretation.
##### P3 — Functoriality (identity, composition, correspondence)

We work in the category **Ep** whose objects are epistemes (species of `U.Episteme`) and whose arrows are EFEM morphisms satisfying P0–P2, together with the functor

```
α : Ep → Ref
```

that maps each episteme to the object it describes (value of `DescribedEntitySlot`, i.e. `describedEntityRef(E)`) as in the mathematical layer for epistemes. EFEM instances with `describedEntityChangeMode(f) = preserve` are **vertical morphisms** for α (`α(f) = id`), while those with `describedEntityChangeMode(f) = retarget` reindex along a declared `KindBridge` in **Ref**.

1. **Identities.** For each episteme `X`, there exists `id_X : X→X` such that:

   ```text
   apply(id_X, X) = X
   compose(id_Y, f) = f = compose(f, id_X)
   ```

   `id_X` preserves all components (`content`, `describedEntityRef`, `groundingHolonRef`, `viewpointRef`, `representationSchemeRef`, `referenceScheme`, `meta`).

2. **Composition.** For `f : X→Y`, `g : Y→Z`, the composite `h = compose(g,f)` is an EFEM morphism `X→Z` with:

   ```
   apply(h, X) = apply(g, apply(f, X))
   describedEntityChangeMode(h) = combine(describedEntityChangeMode(f), describedEntityChangeMode(g))   // as per species-specific rules
   ```

and P0–P2 hold for `h`. For example, two `preserve` morphisms compose to `preserve`; `preserve` after `retarget` is `retarget` if the KindBridge composition exists.

3. **Correspondence‑aware composition.**
   When EFEM changes `RepresentationScheme` or `ReferenceScheme`, a **CorrespondenceModel** (as in C.2.1 §6 and E.17) may be needed to witness commutativity: composition MUST respect these correspondences up to declared isomorphism/oplax naturality (witness epistemes may be recorded in `meta`).
##### P4 — Idempotence & determinism (on fixed configuration)

For any EFEM morphism `f : X→Y` with fixed configuration (episteme kinds, `DescribedEntityChangeMode` characteristic, KindBridge/CorrespondenceModel where needed):

1. **Determinism.**
   For the same input episteme `X` (identical content, slots, meta), `apply(f, X)` yields the same output episteme `Y` up to declared structural equivalence (normal forms, alpha‑renaming etc.). There is no dependence on ambient time, randomness, network state, or solver heuristics unless these are **encoded as explicit inputs**.

2. **Idempotence (up to declared equivalence).**
   Re‑applying the same EFEM to its own output yields no further essential change:

   ```text
   apply(f, apply(f, X)) ≅ apply(f, X)
   ```

   where `≅` denotes the structural equivalence declared for the episteme kinds in question (e.g., ClaimGraph normalisation).

Species MAY weaken idempotence to “idempotent after normalisation”; if so, the normalisation step MUST itself be specified as an EFEM morphism and the composite be idempotent.
##### P5 — Applicability, scope & compatibility

Each EFEM species **publishes** an Applicability clause:

* **EoI / described entity class.**
  A constraint on the allowed ValueKind of `DescribedEntitySlot` (via `EoIClass ⊑ U.Entity`): e.g., “epistemes describing `U.Holon` that are systems of type X”.

* **Grounding holon & Context.**
  Constraints on `GroundingHolonSlot` and `U.BoundedContext`: where the morphism is valid (lab, runtime environment, organisational context).

* **Representation/ReferenceSchemes.**
  Enumerates supported `RepresentationScheme`/`ReferenceScheme` pairs and any required CorrespondenceModels.

* **Viewpoint discipline.**
  For Descr/Spec epistemes, EFEM SHALL specify which `U.Viewpoint`s (E.17.0) it supports and how it interacts with `U.MultiViewDescribing` families (e.g., “works only on engineering viewpoints from TEVB” or “viewpoint‑agnostic normalisation”).

Applying EFEM **outside** its Applicability (e.g., wrong EoIClass, missing grounding holon, incompatible Viewpoint) is **non‑conformant**: a conformant implementation MUST reject such attempts or model them as different mechanisms/works, not as EFEM.

Cross‑Context or cross‑plane use (changing `U.BoundedContext` or `ReferencePlane`) is **not part of EFEM**; it is handled by Bridges (Part F) and A.6.1 transport, which then feed new epistemes into EFEM.
### Archetypal Grounding (Tell–Show–Show)

The examples below show how EFEM is intended to be used across I/D/S and Viewpoint/MVPK layers.

#### Typed formalisation Specify_DS : D→S (species of EFEM)

*Context.* You have an informal `U.MethodDescription` for a safety check and want a more formal `U.MethodSpec` with test harness obligations, but **about the same method**.

*Shape.*

* Domain: `X = U.MethodDescription` episteme with
  `describedEntityRef(X) : U.MethodRef`, `content(X) : U.ClaimGraph_D`, `viewpointRef(X)` an engineering viewpoint (TEVB), `ReferenceScheme_D`.
* Codomain: `Y = U.MethodSpec` episteme with the **same** `describedEntityRef(Y) = describedEntityRef(X)`, `viewpointRef(Y) = viewpointRef(X)`, more structured `content(Y) : U.ClaimGraph_S`, stronger ReferenceScheme (explicit pre/post, obligations).

`Specify_DS` is a species of EFEM:

* `describedEntityChangeMode(Specify_DS) = preserve`.
* P1 — effect‑free: it transforms epistemes only.
* P2 — conservative: any behavioural claims in the Spec must be logically entailed by the informal Description and the underlying Method Intension; if the spec makes stronger claims, that is modelled as creating a **new Intension with its own D/S pair**, not as a valid EFEM instance.
* P3–P5 — functorial and scoped: specs compose, applicability bound to the appropriate engineering context and Viewpoints.

This matches A.7/E.10.D2 strict distinction: I→D (`Describe_ID`) is not itself an episteme→episteme morphism, but `Specify_DS` is; EFEM supplies its laws.
#### Internal normalisation of a View (species of EFEM, describedEntityChangeMode = preserve)

*Context.* In MVPK you compute a engineering view `V` of a system description; you then normalise the view (sort, factor, put equations into normal form) without changing what it says.

Let `X = V_raw`, `Y = V_norm`, both `U.EpistemeView` instances with the same:

* `describedEntityRef(X) = describedEntityRef(Y)` (same system);
* `groundingHolonRef(X) = groundingHolonRef(Y)` (same environment);
* `viewpointRef(X) = viewpointRef(Y)` (same Viewpoint);
* `representationSchemeRef(X) = representationSchemeRef(Y)` (same notation).

The EFEM `NormalizeView : X→Y`:

* has `describedEntityChangeMode(NormalizeView) = preserve`;
* changes only `content` and maybe `meta` (e.g. “normalised at edition E”);
* is idempotent and deterministic (P4);
* is conservative (P2): no new claims, only re‑expression.

MVPK can then **assume** functoriality of such normalisations without re‑stating the EFEM laws.
#### Retargeting sketch (bridge‑backed, describedEntityChangeMode = retarget)

*Context.* E.TGA’s StructuralReinterpretation maps a physical layout view into a functional behaviour view, changing the described entity from “physical module assembly” to “functional graph” along a KindBridge.

Inside EFEM, this becomes a species with `describedEntityChangeMode = retarget`:
* input episteme describes `S₁` (e.g. a component hierarchy holon);
* output episteme describes `S₂` (e.g. a functional network holon);
* a declared `KindBridge(S₁,S₂)` and invariant (e.g. behavioural equivalence) provide the semantic glue;
* P2 conservativity is checked **w.r.t. that invariant**.

The details belong to A.6.4/E.TGA; EFEM provides the generic discipline.
#### Worked SlotSpec example (engineering SystemDescription episteme kind)

*(informative)*

To make the SlotKind/ValueKind/RefKind discipline and EFEM laws concrete, consider a simple engineering `U.EpistemeKind` for system descriptions over `EoIClass ⊑ U.Entity` with `EoIClass = U.System` in a given Context. A minimal SlotSpec table for such a kind could be:

| SlotKind              | ValueKind                                     | RefKind / refMode   | Notes                                                                 |
| --------------------- | --------------------------------------------- | ------------------- | --------------------------------------------------------------------- |
| `DescribedEntitySlot` | `U.Entity` (constrained by `EoIClass = U.System`) | `U.EntityRef`    | describes which system the episteme is about                          |
| `GroundingHolonSlot`  | `U.Holon`                                     | `U.HolonRef`        | plant / runtime SoS grounding measurements and validation             |
| `ClaimGraphSlot`      | `U.ClaimGraph`                                | ByValue             | KD‑CAL/LOG‑CAL ClaimGraph for the description or spec                 |
| `ViewpointSlot`       | `U.Viewpoint`                                 | `U.ViewpointRef`    | engineering viewpoint (e.g. from TEVB) under which D/S are validated |
| `ReferenceSchemeSlot` | `U.ReferenceScheme`                           | ByValue             | how the ClaimGraph is read against described entity and grounding     |

This table is an instance of A.6.5 `U.RelationSlotDiscipline`: each row is a SlotSpec triple ⟨SlotKind, ValueKind, refMode/RefKind⟩; no additional kernel types are introduced, and C.2.1’s constraints on `DescribedEntitySlot`/`GroundingHolonSlot` are preserved.

Two typical EFEM species over this kind are:
* `Specify_DS_Sys : SystemDescription → SystemSpec` — a `DescribedEntityChangeMode = preserve` species that:
  * **reads** `DescribedEntitySlot`, `GroundingHolonSlot`, `ViewpointSlot`, `ReferenceSchemeSlot` and **writes** a refined `ClaimGraphSlot` and possibly a strengthened `ReferenceSchemeSlot`;
  * satisfies P2 by only adding claims that are logical consequences of the original description plus the fixed Intension (A.7/E.10.D2);
  * satisfies CC‑C.2.1‑5 by explicitly declaring its slot profile and change mode.

* `Normalize_EngView : EpistemeView → EpistemeView` — a view‑normalisation EFEM (again with `DescribedEntityChangeMode = preserve`) that:
  * **reads** all slots and **writes** only `ClaimGraphSlot` (normal form) and `meta`;
  * is idempotent and deterministic (P4) and pure (P1);
  * is conservative (P2) by construction: it never introduces new atoms about the described system.

In later A.6.3/A.6.4/E.17.\* patterns, concrete EpistemeKinds (for specific engineering description/specification idioms) are expected to provide SlotSpecs of this general shape and to state explicitly, per CC‑C.2.1‑5 / CC‑EFEM.\*, which slots their EFEM species read and write.
### Bias & Defaults (informative)

* **Episteme‑first, world‑second.** EFEM is strictly about **epistemes as objects**; any world contact (measurements, executions) lives in `U.Mechanism`/`U.Work` and produces new epistemes that EFEM may subsequently relate.

* **SlotKinds, not “fields”.** Laws talk about `DescribedEntitySlot`, `GroundingHolonSlot`, etc., and their ValueKind/RefKind, as per A.6.5 and C.2.1; they never use unnamed tuple positions or “role 1/2/3”. This keeps EFEM aligned with the slot discipline used for methods, roles, services, and other n‑ary relations.

* **Local‑first semantics.** EFEM is **Context‑local**; crossings of Context or ReferencePlane are always delegated to Bridges / A.6.1 transport (with CL penalties to `R/R_eff` only). No “implicit cross‑Context EFEM” is permitted.

* **I/D/S respect.** EFEM never collapses Intension with Description/Spec: I→D and D→S operations are typed explicitly and either (i) conform to EFEM laws where they are episteme→episteme, or (ii) remain separate morphism classes (A.7) while being described as EFEM‑conformant.
### Conformance Checklist (normative)

| ID                                                  | Requirement                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CC‑EFEM.1 (Typed episteme objects).**             | Every morphism advertised as `U.EffectFreeEpistemicMorphing` SHALL have domain and codomain epistemes whose kinds (`U.EpistemeKind`) publish SlotKinds/ValueKinds/RefKinds according to C.2.1 and A.6.5 (at least `DescribedEntitySlot` and `ClaimGraphSlot`; other slots as declared).                                                                                                               |
| **CC‑EFEM.2 (Declared DescribedEntityChangeMode).** | Each EFEM **species** SHALL declare the `DescribedEntityChangeMode` characteristic `describedEntityChangeMode : U.Morphism → {preserve, retarget}` as per C.2.1. For every instance `f`, `describedEntityChangeMode(f)` MUST be either `preserve` (⇒ `describedEntityRef` unchanged) or `retarget` (⇒ a KindBridge and invariant are explicitly named; see A.6.4 / F.9).                                                                                         |
| **CC‑EFEM.3 (Purity).**                             | EFEM morphisms SHALL be effect‑free: they MUST NOT directly perform Work or run mechanisms with operational guards; they only read input epistemes and construct output epistemes consistent with P2–P5. Any use of external solvers/measurements MUST be modelled as separate Mechanisms/Work that feed new epistemes into EFEM.                                                                     |
| **CC‑EFEM.4 (Conservativity).**                     | Laws for EFEM species SHALL state their conservativity regime: claims in the output MUST be logical consequences of input claims under declared ReferenceSchemes and any CorrespondenceModels/KindBridges. If an operation may strengthen claims (e.g. add commitments not entailed by inputs), it is **not** EFEM and MUST be modelled separately.                                                   |
| **CC‑EFEM.5 (Functoriality & idempotence).**        | EFEM species SHALL support identity and composition with the usual category laws, and SHALL specify any structural equivalence under which idempotence holds. Non‑deterministic or order‑sensitive behaviour (beyond declared structural equivalences) is non‑conformant.                                                                                                                             |
| **CC‑EFEM.6 (Applicability & scope).**              | Each EFEM species SHALL publish Applicability in terms of: allowed EoI classes (ValueKind for `DescribedEntitySlot`), Context/BoundedContext and grounding holon constraints, supported Viewpoints and representation/reference schemes. Applying EFEM outside this Applicability (including cross‑Context or cross‑plane) is non‑conformant. Crossings MUST be delegated to Bridges/A.6.1 transport. |
| **CC‑EFEM.7 (I/D/S & subjectRef discipline).**      | For any episteme that is a `…Description`/`…Spec` (E.10.D2), EFEM laws SHALL be phrased in terms of `DescriptionContext = ⟨DescribedEntityRef, BoundedContextRef, ViewpointRef⟩` and MUST respect the I/D/S discipline **and** DescriptionContext invariants (including IDS‑13 Viewpoint‑locality as defined in E.10.D2/C.2.1): `Describe_ID` lives in A.7; `Specify_DS` MAY be species of EFEM but MUST preserve Intension. |
| **CC‑EFEM.8 (Slot‑level read/write declaration).**  | Any EFEM species that defines morphisms between epistemes SHALL also satisfy C.2.1 checkpoint CC‑C.2.1‑5: it MUST state whether it is a species of `U.EffectFreeEpistemicMorphing`/`U.EpistemicViewing`/`U.EpistemicRetargeting`, declare its `describedEntityChangeMode`, name which SlotKinds it reads and writes, and state its behaviour on `describedEntityRef`, `groundingHolonRef`, `viewpointRef`, and `referenceScheme`. |
### SoTA‑Echoing (informative, lineage)

EFEM is intentionally “thin”: it provides a **minimal categorical and slot‑based discipline** for episteme→episteme morphisms, making it easy to align with several post‑2015 lines of work:

* **Categorical semantics & displayed categories.**
  Treating `Ep` as a category over `Ref` via a functor `α : Ep → Ref` (mapping each episteme to its described entity) matches the *displayed categories* view on fibrations: EFEM arrows are those morphisms in `Ep` that are “vertical” (preserve α) or “structured reindexings” (retarget under a KindBridge). This is exactly the intended alignment with C.2.1’s subjectRef/ReferencePlane picture.

* **Optics as universal projections.**
  Viewing operations (`U.EpistemicViewing`) refine EFEM in a way analogous to **lenses/prisms/traversals** in the optics literature: effect‑free, compositional accessors for parts of a larger structure. EFEM captures the laws that underlie those projections (purity, conservation, functoriality); optics‑style constructions can then be used inside discipline packs without modifying the core.

* **Structured cospans & correspondences.**
  Many correspondence‑based multi‑view patterns (ISO 42010 correspondences, model synchronisation, traceability links) can be seen as spans/cospans between epistemes. EFEM ensures that the legs of such cospans are effect‑free and conservative, while CorrespondenceModels carry the extra structure needed for consistency management.

* **Bidirectional transformations (BX).**
  The “no new commitments” and “functorial & idempotent” constraints mirror modern BX practice around **consistency restoration**: EFEM is the universal core that BX‑like constructions (view updates, synchronisers) must respect when instantiated for epistemes.

EFEM does *not* prescribe a specific calculus (deductive, probabilistic, latent‑space), nor a specific representation (symbolic vs distributed); those choices are captured in `U.ClaimGraph`, `U.RepresentationScheme` and discipline‑level patterns. EFEM only says what it means to transform epistemes **legally** in that chosen substrate.
### Consequences

* **Single place for episteme‑to‑episteme laws.**
  All effect‑free transforms of knowledge artefacts, across KD‑CAL, MVPK, E.TGA, discipline packs, can now be defined as species of EFEM, instead of each family re‑inventing its own law set.

* **Clear separation from mechanisms & work.**
  Anything that touches the world (measurements, execution, simulation) is forced into `U.Mechanism` / `U.WorkEnactment`, with CL‑penalised Bridges and Γ_time; EFEM remains pure and compositional.

* **Stable backbone for Viewing & Retargeting.**
  A.6.3 and A.6.4 do not need to repeat P0–P5; they specialise EFEM with additional constraints (preserve/retarget). Other patterns (e.g. MultiViewDescribing, MVPK, E.TGA StructuralReinterpretation) can depend on EFEM as a stable base.

* **Slot‑level clarity.**
  By formulating EFEM laws in terms of SlotKinds/ValueKinds/RefKinds (A.6.5) and the EpistemeSlotGraph (C.2.1), it becomes much harder for Episteme to confuse “object of talk”, “slot in a relation”, and “reference to that object”.

* **Better didactics.**
  The old “semantic triangle” becomes a didactic projection of EFEM over the EpistemeSlotGraph: EFEM + C.2.1 explain precisely what the triangle was trying to gesture at (symbol, concept, object), while correctly foregrounding operations, viewpoints, grounding holons, and reference schemes.
### Rationale

**Why a separate EFEM pattern (A.6.2) instead of folding into A.6.1 or C.2.1?**

* A.6.1 governs **Mechanisms** (operations with AdmissibilityConditions, Γ_time, transport and Bridges)—too operational for the pure episteme transforms we want here.
* C.2.1 fixes the **ontology of epistemes** (slots, components, ReferencePlane), but does not talk about morphisms. EFEM is explicitly a **morphism‑level** pattern over that ontology.

This split mirrors how Signature (A.6.0) separates “what is declared” from “how it is realised”: C.2.1 says what an episteme is; A.6.2 says what a legal episteme→episteme transform is.

**Why insist on DescribedEntityChangeMode?**

Because almost all subtle errors in multi‑view reasoning show up as **silent retargeting**: a transform that appears to keep the same object‑of‑talk actually changes it (e.g., from “component assembly” to “function bundle”) without naming the bridge or invariant. By forcing every species to declare `preserve` vs `retarget`, EFEM makes those decisions explicit and reviewable.

**Why attach EFEM to SlotKinds instead of informal “fields”?**

FPF already committed to a single SlotKind/ValueKind/RefKind discipline (A.6.5) across relations, methods, roles, and now epistemes. Re‑using that discipline here:

* aligns episteme morphisms with the rest of the framework;
* enables later mechanised checks (e.g., that a viewing only touches slots it promised to touch);
* avoids minting yet another notion of “parameter” or “role in a relation”.
### Relations

* **Specialises / is specialised by.**

  * Builds on A.6.0 `U.Signature` and A.6.1 `U.Mechanism` for the uniform SubjectBlock/vocabulary/laws/applicability structure.
  * Specialised by A.6.3 `U.EpistemicViewing` (describedEntity‑preserving EFEM) and A.6.4 `U.EpistemicRetargeting` (describedEntity‑retargering EFEM).

* **Constrained by.**
  A.6.5 `U.RelationSlotDiscipline` (SlotKind/ValueKind/RefKind); C.2.1 `U.EpistemeSlotGraph` (episteme components, ReferencePlane); E.10.D2 (I/D/S discipline); Part F (Bridges, CL, ReferencePlane crossings); E.10 (LEX‑BUNDLE naming rules, especially on `…Slot` / `…Ref` and ban on Subject/Object in episteme tech names).

* **Consumed by.**
  E.17.0 `U.MultiViewDescribing` (families of D/S epistemes under Viewpoints); E.17 (MVPK — publication as species of Viewing/EFEM); E.18 (E.TGA StructuralReinterpretation and other transductions over epistemes); KD‑CAL/LOG‑CAL rules that reason about episteme transforms categorically.
### A.6.2:End
## U.EpistemicViewing — describedEntity‑preserving morphism

**One‑line summary.** `U.EpistemicViewing` is the **describedEntity‑preserving** species of `U.EffectFreeEpistemicMorphing`: an effect‑free projection between epistemes that may change content and representation, but **never changes what the episteme is about** (the occupant of `DescribedEntitySlot` in C.2.1).

**Placement.** After **A.6.2 `U.EffectFreeEpistemicMorphing`**, before **A.6.4 `U.EpistemicRetargeting`**.

**Builds on.**
A.6.0 `U.Signature`; A.6.2 `U.EffectFreeEpistemicMorphing`; A.6.5 `U.RelationSlotDiscipline`; A.7/E.10.D2 (I/D/S discipline, `DescriptionContext`); C.2.1 `U.Episteme — Epistemes and their slot graph`; C.2 (KD‑CAL/LOG‑CAL, `subjectRef`, ReferencePlane).

**Used by.**
E.17.0 `U.MultiViewDescribing`; E.17 (MVPK — Multi‑View Publication Kit); E.17.1/E.17.2 (Viewpoint bundle libraries, TEVB); B.5.3 (Role‑EpistemicViewing); discipline packs for architecture, safety, and ML/LLM‑based representations.

### Problem frame

Engineers and researchers constantly need **views of the same knowledge artefact**:
* an ISO 42010‑style architectural view for a particular stakeholder group over a shared architecture description;
* a SysML v2 “view‑as‑query” over an underlying model, changing visualisation but not the modelled system;
* a publication view (Plain/Tech/Assurance) in MVPK over a common description/specification;
* an LLM‑friendly episteme derived from a symbolic specification (or vice versa), preserving what system is being described.

All of these are **episteme→episteme** transforms which intend to:
* keep the **DescribedEntity** fixed (`DescribedEntitySlot` in C.2.1), and
* change only **how** the episteme talks about it: sliced `U.ClaimGraph`, different `U.Viewpoint`, alternative `U.RepresentationScheme`, or a different `U.ReferenceScheme` tuned to the same entity and grounding holon.

We need a single, reusable notion of **“epistemic viewing”** that captures these projections as:
* **effect‑free** (no Work/Mechanism side‑effects),
* **describedEntity‑preserving** (no silent retargeting),
* **conservative** (no new intensional commitments about the same entity),
* and **functorial** (compose cleanly in multi‑step pipelines).
### Problem

Without a dedicated pattern for EpistemicViewing:
1. **Views vs retargetings blur.**
   Operations that *intend* to change only representation (viewing) are easily conflated with operations that change the **object‑of‑talk** (retargeting). A Fourier‑style transform or a StructuralReinterpretation in E.TGA can quietly drift from “view of S” into “view of a different S′”, without declaring a `KindBridge`.

2. **“View” vs “viewpoint” vs “surface” collapse.**
   In standards and tools, “view” is often used interchangeably to mean:
   * the **viewpoint** (specification of concerns and conformance rules),
   * the **episteme** produced under that viewpoint, and
   * the **surface** (rendered document or GUI).
     Without a clear episteme‑level notion of viewing, MVPK and E.17.0 cannot cleanly separate these layers.

2. **No describedEntity guarantees.**
   A projection that looks like a harmless slice of a system description may in fact:
   * change `describedEntityRef` (switching to a subsystem or a function),
   * change `groundingHolonRef` (different plant or runtime),
   * or smuggle in new intensional claims.
     Without explicit laws on C.2.1 components, “view” becomes an informal metaphor, not a reliable morphism class.

4. **Multi‑view reasoning has no core discipline.**
   Multi‑view patterns (ISO 42010 viewpoint libraries, SysML v2 view queries, TEVB, MVPK faces) need:
   * **vertical** projections over the same described entity (`α : Ep → Ref` fixed),
   * and **correspondence‑based** projections that rely on explicit cross‑episteme links.
     If each family re‑invents its own notion of “view”, consistency and tool support degrade.
### Forces

* **Same entity, different concerns.**
  Stakeholders want different slices of the same description/specification, sometimes under different viewpoints, without re‑identifying the entity (system, method, role, service) being described.

* **Internal vs cross‑episteme views.**
  Some views depend only on a single episteme (direct viewing); others depend on a **CorrespondenceModel** (e.g. aligning requirements and design models). Both must be supported, but with **different obligations**.

* **Conservativity vs expressivity.**
  A view must not introduce new commitments about the described entity, but it may:

  * aggregate or factor claims,
  * change representation regime (diagrammatic vs symbolic vs latent),
  * or shift to a different inference regime, **as long as this is conservative**.

* **I/D/S strictness.**
  `…Description` and `…Spec` are epistemes with `DescriptionContext = ⟨DescribedEntityRef, BoundedContextRef, ViewpointRef⟩`. Viewing must work over these **DescriptionContexts** without collapsing Intension (`I`) into episteme or confusing D/S with publication surfaces.

* **Slot discipline and modularity.**
  With C.2.1 and A.6.5, epistemes now have explicit `SlotKind`/`ValueKind`/`RefKind` triples. Viewing laws must be stated **at the slot level**, not in terms of ad‑hoc “fields”, so they can be reused across engineering, publication, and discipline packs.
### Solution — U.EpistemicViewing as EFEM profile (describedEntityChangeMode = preserve)

#### Informal definition

> **Definition (informal).**
> `U.EpistemicViewing` is the **describedEntity‑preserving species** of `U.EffectFreeEpistemicMorphing`.
> A `U.EpistemicViewing v : X→Y`:
>
> * takes an input episteme `X` and produces an output episteme `Y`,
> * preserves the occupant of `DescribedEntitySlot` (`describedEntityRef(Y) = describedEntityRef(X)`),
> * may refine or re‑express `content : U.ClaimGraph`, `viewpointRef`, `representationSchemeRef`, and `referenceScheme`,
> * is **effect‑free and conservative** (no new intensional claims about the same described entity),
> * and composes functorially with other epistemic viewings.

In C.2.1 terms `U.EpistemicViewing` behaves like a **lens/optic over the episteme slot graph**: it focuses on some SlotKinds (typically `ClaimGraphSlot`, `ViewpointSlot`, `RepresentationSchemeSlot`, `ReferenceSchemeSlot`) while preserving `DescribedEntitySlot` (and usually `GroundingHolonSlot`).
#### Signature (A.6.0 / A.6.5 alignment)

**Signature header.**
`U.EpistemicViewing` is a **Morphism‑kind** under A.6.0:

```
SubjectBlock
  SubjectKind    = U.EpistemicViewing
  BaseType       = ⟨X:U.Episteme, Y:U.Episteme⟩      // carrier pair
  Quantification = SliceSet := U.ContextSliceSet;
                   ExtentRule := admissible view morphisms
  ResultKind     = U.Morphism                        // an instance v
```

**Vocabulary (re‑uses A.6.2).**
* **Types.** `U.Episteme`, `U.SubjectRef`, `U.Morphism`, `U.EpistemicViewing`.
* **Operators.**
  * `id    : U.Morphism(X→X)`
  * `compose(g,f) : U.Morphism(X→Z)` where `f:X→Y`, `g:Y→Z`
  * `apply(v, x:U.Episteme) : U.Episteme`
  * `dom(v), cod(v) : U.Episteme`
  * `subjectRef(-) : U.SubjectRef`
**Slot‑level discipline.**
Domain and codomain epistemes are instances of some `U.Episteme` species (typically `U.EpistemeCard`, `U.EpistemeView`, or `U.EpistemePublication`) whose episteme kinds each provide SlotSpecs (A.6.5) including at least:
  * `DescribedEntitySlot` (ValueKind `U.Entity`, RefKind `U.EntityRef`),
  * `GroundingHolonSlot?` (ValueKind `U.Holon`, RefKind `U.HolonRef`),
  * `ClaimGraphSlot` (ValueKind `U.ClaimGraph`, by‑value),
  * `ViewpointSlot?` (ValueKind `U.Viewpoint`, RefKind `U.ViewpointRef`),
  * `ReferenceSchemeSlot` (ValueKind `U.ReferenceScheme`, by‑value),
  * and, where C.2.1+ is in use, `RepresentationSchemeSlot`, `ViewSlot` and related slots.

Practical species of EpistemicViewing will very often take `X` and `Y` from the same `U.EpistemeKind`, but the pattern itself only requires that the SlotSpecs of the domain and codomain kinds be **compatible** in the sense of A.6.5, not literally identical.

**Relation to EFEM.**
* Every `U.EpistemicViewing` is an **EFEM morphism** with `describedEntityChangeMode = preserve` in the sense of A.6.2/C.2.1.
* It **inherits** P0–P5 from A.6.2, specialised to the case where the occupant of `DescribedEntitySlot` is unchanged.
#### Laws (EV‑0…EV‑6, over C.2.1 components)

All laws below are **in addition** to A.6.2’s EFEM laws P0–P5 and SHALL be read directly against C.2.1 components and A.6.5 SlotSpecs.

**EV‑0 - Species & DescribedEntityChangeMode.**

* Any morphism `v:X→Y` declared as `U.EpistemicViewing` **MUST**:
  * be a species of `U.EffectFreeEpistemicMorphing` (A.6.2), and
  * declare `describedEntityChangeMode(v) = preserve`.
* Consequently:
  * `DescribedEntitySlot` has the **same ValueKind and RefKind** in the episteme kind of `X` and `Y` (same `EoIClass ⊑ U.Entity`);
  * `describedEntityRef(Y) = describedEntityRef(X)` **by definition** of the species.

**EV‑1 - Typed domain/codomain & DescriptionContext behaviour.**

For any `v:X→Y` in `U.EpistemicViewing`:
1. `X` and `Y` are instances of `U.Episteme` species whose episteme kinds both realise at least the core C.2.1 slots (`DescribedEntitySlot`, `GroundingHolonSlot?`, `ClaimGraphSlot`, `ViewpointSlot?`, `ReferenceSchemeSlot`) and obey A.6.5. Many practical species of EpistemicViewing will take `X` and `Y` from the **same** `U.EpistemeKind`, but the A.6.3 pattern only requires **SlotSpec compatibility** between domain and codomain kinds (in the sense of A.6.5), not literal kind equality.

2. At the SlotKind level:
   * `DescribedEntitySlot` is **read‑only** (no change in `describedEntityRef`).
   * `GroundingHolonSlot`, if present, is:
     * either preserved exactly, or
     * changed only within an explicitly declared **grounding context** (e.g. normalising identifiers for the same plant or runtime), justified via a `Bridge` in the same ReferencePlane.
   * `ViewpointSlot`, if present, is:
     * either preserved (internal normalisation under the same viewpoint), or
     * changed only to another `U.ViewpointRef` **within a declared `U.MultiViewDescribing` family** (E.17.0), with a `CorrespondenceModel` providing witnesses.
3. For any episteme that is a `…Description`/`…Spec` (E.10.D2), `subjectRef` decodes to `DescriptionContext = ⟨DescribedEntityRef, BoundedContextRef, ViewpointRef⟩`. EpistemicViewing MUST:
   * preserve `DescribedEntityRef`,
   * preserve `BoundedContextRef` (unless a Bridge is explicitly cited),
   * treat `ViewpointRef` as in (2) above.

**EV‑2 - Effect‑free boundary (over EpistemeSlotGraph).**
EpistemicViewing remains **pure** in the EFEM sense:
* It may change **only C.2.1 components of the codomain episteme**:
  * `content : U.ClaimGraph` (e.g. filtering, aggregation, normalisation),
  * `viewpointRef` (under the constraints in EV‑1),
  * `representationSchemeRef` and `ReferenceScheme` (within a fixed representation family or under a declared `CorrespondenceModel`),
  * meta‑components (edition, provenance, status flags).
* It **MUST NOT**:
  * invoke `U.Mechanism` or `U.WorkEnactment` (measure, execute, actuate),
  * create or modify `U.PresentationCarrier` (no direct publishing to surfaces),
  * cross ReferencePlanes implicitly (plane crossings go through Bridges with CL penalties in Part F).

Any operational machinery (e.g. SAT/SMT solving, simulation, LLM tool‑use) MUST be modelled as a **separate `U.Mechanism`** that produces input epistemes or auxiliary artefacts consumed by the EpistemicViewing morphism.

**EV‑3 - No new intensional claims about the same DescribedEntity.**

Let `X` and `Y = apply(v,X)` with:
* `content_X`, `referenceScheme_X`,
* `content_Y`, `referenceScheme_Y`,
* shared `describedEntityRef` and (typically) `groundingHolonRef`.

Then:
* The set of claims about `<describedEntityRef, groundingHolonRef>` obtained by reading `content_Y` through `referenceScheme_Y` **MUST NOT strictly extend** what is already entailed, in KD‑CAL/LOG‑CAL, by `content_X` read through `referenceScheme_X` under the same ReferencePlane and context.
* Admissible changes:
  * re‑expression (changing representation, not truth conditions),
  * aggregation (e.g. summarising multiple claims into an explicitly derivable macro‑claim),
  * dropping some information (lossy projection), provided **no new atomic commitments** about the same described entity are introduced.
* Any intended strengthening of behavioural or structural commitments about the same entity **is not a valid EpistemicViewing**; it must be modelled either as:
  * a change in Intension (new D/S pair under A.7/E.10.D2), or
  * an A.6.4 `U.EpistemicRetargeting` plus a new Intension.

**EV‑4 - Functoriality & correspondence alignment.**

EpistemicViewing **inherits EFEM functoriality** and specialises it:

1. **Direct EpistemicViewing (same representation scheme).**
   Where `representationSchemeRef` and `ReferenceScheme` of `X` and `Y` are the same (up to declared normal forms), EpistemicViewing acts as a **strict functor** on ClaimGraphs:
   * `apply(id, X) = X`,
   * `apply(g ∘ f, X) = apply(g, apply(f, X))`,
   * `content` transformation corresponds to a structural ClaimGraph function.

2. **Correspondence‑based EpistemicViewing (representation changes).**
   When viewing relies on a `CorrespondenceModel` between epistemes or representation schemes:
   * the viewing morphism MUST reference that `CorrespondenceModel`,
   * compositions involving such viewings **MUST** publish witnesses (epistemes or proof objects) that squares commute **up to declared isomorphism** (oplax naturality is allowed, but corrections are deterministic and reproducible),
   * `describedEntityRef` and `groundingHolonRef` remain as in EV‑1; any transfer across contexts/planes goes via Bridges, not via hidden behaviour of the viewing.

**EV‑5 - Idempotency & determinism on fixed configuration.**

For any `v:X→Y` in `U.EpistemicViewing`, with fixed:
* `describedEntityRef`,
* `groundingHolonRef`,
* `viewpointRef`,
* `representationSchemeRef`,
* `referenceScheme`,
* and fixed `CorrespondenceModel` (if used),

the following MUST hold:
* **Idempotency.** `apply(v, apply(v, X))` is **isomorphic** to `apply(v, X)`:
  * same DescribedEntity and grounding holon,
  * same viewpoint and representation scheme,
  * ClaimGraphs differ, at most, by declared structural equivalence (e.g. normal form vs source form).
* **Determinism.** For fixed input and configuration, the result is uniquely determined (modulo declared equivalence). Any source of non‑determinism (random seeds, timing, external service state) MUST either:
  * be exposed as part of `content` / `meta` of `X`, or
  * be moved into a Mechanism outside the viewing morphism.

**EV‑6 - Applicability & MultiViewDescribing alignment.**

Each species of `U.EpistemicViewing` MUST:
1. Declare an **Applicability profile** (A.6.0) specifying:
   * permitted `EoIClass ⊑ U.Entity` (ValueKind of `DescribedEntitySlot`),
   * permitted `groundingHolonRef` classes and ReferencePlanes,
   * admissible `viewpointRef` ranges (possibly a named `U.ViewpointBundle`),
   * supported `representationSchemeRef` families.
1. For D/S epistemes in a `U.MultiViewDescribing` family (E.17.0):
   * preserve `DescribedEntityRef` of `DescriptionContext`,
   * either preserve `ViewpointRef` or change it within the declared viewpoint bundle, with any additional constraints recorded in the family’s `CorrespondenceModel`,
   * never widen `ClaimScope` beyond what EV‑3 permits.
3. Treat **any change of DescribedEntity** (even if “intuitively minor”, such as moving from subsystem to system) as **out of scope** for A.6.3; such moves belong to A.6.4 `U.EpistemicRetargeting`.
#### Profiles: U.DirectEpistemicViewing and U.CorrespondenceEpistemicViewing

`U.EpistemicViewing` is further structured into two important species; both inherit EV‑0…EV‑6.

1. **`U.DirectEpistemicViewing` — self‑contained views.**
   * Domain and codomain epistemes share:
     * the same `representationSchemeRef` (up to declared normalisation),
     * the same `ReferenceScheme` (or a refinement which is conservative and structurally documented).
   * No external `CorrespondenceModel` is needed: the view is computed **solely from the input episteme** and, optionally, fixed configuration.
   * Typical cases:
     * internal normalisation (sorting, rewriting) of an engineering view;
     * filtering `U.ClaimGraph` to keep only safety‑relevant claims;
     * simplifying a proof‑oriented specification to a more operational form under the same semantics.

1. **`U.CorrespondenceEpistemicViewing` — views relying on correspondence models.**
   * Viewing depends on:
     * one or more subject epistemes (e.g. requirements and design),
     * an explicit `CorrespondenceModel` that relates their ClaimGraphs and representation schemes.
   * The result is an episteme (often an `U.EpistemeView`) whose `describedEntityRef` matches that of the primary episteme, but whose content is computed **through** the correspondence links.
   * Typical cases:
     * ISO 42010‑style correspondences between architectural descriptions;
     * cross‑model views in model‑based systems engineering (MBSE), where view content is computed from multiple model fragments;
     * traceability‑based views aggregating requirements, design elements, and tests.

In both profiles:
* `CorrespondenceModel` remains an **episteme‑level artefact**, not a new kernel‑type hidden inside A.6.3.
* `U.EpistemicViewing` stays **view‑like**: it reveals what is already there under the correspondence; it does not perform Γ‑style constructions of new Intensions.
### Archetypal grounding (Tell–Show–Show)

#### Engineering system description → safety officer view (DirectEpistemicViewing)

*Context.*
A system team maintains a rich `SystemDescription` episteme for a plant holon `S` under an engineering viewpoint from TEVB. A safety officer needs a concise view showing only safety‑critical components, hazards, and mitigations.

*Shape.*

* **Domain `X`.**
  `X : U.SystemDescription` with:
  * `describedEntityRef(X) : U.SystemRef` (the plant `S`),
  * `groundingHolonRef(X) : U.HolonRef` (runtime environment),
  * `viewpointRef(X) : U.ViewpointRef` (engineering TEVB viewpoint),
  * `content(X) : U.ClaimGraph` (full behavioural & structural claims).
* **Codomain `Y`.**
  `Y : U.EpistemeView` with:
  * `describedEntityRef(Y) = describedEntityRef(X)`,
  * `groundingHolonRef(Y) = groundingHolonRef(X)`,
  * `viewpointRef(Y)` either equal to or a refinement of the original engineering viewpoint (TEVB safety sub‑viewpoint),
  * `content(Y)` containing only safety‑relevant claims, plus explicit aggregation nodes (e.g. hazard summaries).

`SafetyView : X→Y` is a **DirectEpistemicViewing**:
* `describedEntityChangeMode = preserve`,
* only `content`, `viewpointRef` (within TEVB) and `meta` change,
* KD‑CAL/LOG‑CAL checks show that every hazard/mitigation claim in `Y` is entailed by `X`,
* view is idempotent and deterministic given `X` and the selected safety profile.

This is the canonical “engineering view” archetype that later species in E.17.2/TEVB refer back to.
#### MVPK publication view normalisation (DirectEpistemicViewing)

*Context.*
MVPK emits a `TechCard` view `V_raw` for an arrow `f` in a morphism class (e.g. a **gate-checked, crossing-visible** service with `OperationalGate(profile)` + `DecisionLog`). The publication pipeline wants a normalised view `V_norm` where:
* arrows are ordered canonically,
* units and names follow a fixed naming discipline,
* redundant cells are removed.

*Shape.*

* `X = V_raw`, `Y = V_norm`, both `U.EpistemeView` instances with:
  * same `describedEntityRef` (the morphism’s arrow or capability),
  * same `groundingHolonRef` (runtime/plant),
  * same `viewpointRef` (publication viewpoint),
  * same `representationSchemeRef` (TechCard schema).

`NormalizeTechCard : X→Y` is a **DirectEpistemicViewing**:
* changes only `content` and `meta` (e.g. “normalised at edition E”),
* is pure and idempotent (two passes give the same normal form),
* is conservative: no new claims about the arrow `f` appear; information is only reordered or discarded.

MVPK can rely on this as an A.6.3‑conformant step without restating EFEM laws.
#### Cross‑model consistency view (CorrespondenceEpistemicViewing)

*Context.*
A system has:
* a requirements episteme `R` (“what the system should do”), and
* a design episteme `D` (“how the system does it”),

both with `describedEntityRef` pointing to the same system holon `S`, but living in different notations and contexts. A systems engineer wants a view that shows **only those requirements that currently have design coverage**.

*Shape.*

* `R : U.SystemRequirementsDescription` with ClaimGraph `C_R`.
* `D : U.SystemDesignDescription` with ClaimGraph `C_D`.
* `CM : U.CorrespondenceModel` relating requirements to design elements.
* `Y : U.EpistemeView` with:
  * `describedEntityRef(Y) = describedEntityRef(R) = describedEntityRef(D) = S`,
  * `groundingHolonRef(Y)` inherited from `R`/`D` or declared via a Bridge,
  * `content(Y)` aggregating only those requirements in `C_R` for which `CM` records coverage in `C_D`.

`CoveredRequirementsView(R,D,CM) : X→Y` (with `X` a compound episteme or a bundle episteme over `R,D,CM`) is a **CorrespondenceEpistemicViewing**:
* relies essentially on `CM` (without it, the view is undefined — fail‑closed),
* must publish witnesses that two different ways of composing local correspondences give the same result up to declared equivalence,
* remains conservative: it does not assert that any requirement is covered unless that fact is recorded in `CM` and justified in `D`.

This archetype mirrors post‑2015 work on model synchronisation and bidirectional transformations, but anchored in the EpistemeSlotGraph.
### Consequences

* **Clear separation of viewing vs retargeting.**
  `U.EpistemicViewing` and `U.EpistemicRetargeting` (A.6.4) now **cleanly separate**:

  * “view of the same entity” vs “description of a different entity under a bridge”, and
  * vertical morphisms (`α` fixed) vs retargeting morphisms (α changes under KindBridge).

* **Stable backbone for multi‑view patterns.**
  Multi‑view description (E.17.0), viewpoint bundle libraries (E.17.1/E.17.2), and MVPK publication now share a **single notion of view morphism**, aligned with C.2.1 slots and the I/D/S discipline.

* **Slot‑level discipline for tools.**
  Tools implementing views (queries, projections, report generators, LLM‑based summarisation) must declare:

  * which SlotKinds they read,
  * which SlotKinds they may write,
  * and that `DescribedEntitySlot` is preserved.
    This removes ambiguity around “subject/object” changes and supports robust static checking.

* **Alignment with modern view/query practices.**
  The pattern aligns with:
  * ISO 42010:2011/2022 and its focus on **viewpoints**, **views**, and **correspondences** over an entity‑of‑interest;
  * SysML v2 “views‑as‑queries” paradigm, where views are queries over a stable model, not new models;
  * post‑2015 work on **optics** and **displayed categories**, treating views as structured projections over a fibred category of epistemes.
### Rationale & SoTA‑echoing (informative)

* **Optics and displayed categories.**
  In categorical terms, epistemes form a category `Ep` fibred over a category of described entities `Ref` via `α : Ep → Ref`. EpistemicViewing corresponds to **vertical morphisms** that preserve α. Their behaviour closely tracks **profunctor optics**: the DescribedEntitySlot plays the role of the “focus index”, while ClaimGraphs and representation schemes act as the data being transformed. Recent work on optics (2018‑onwards) provides compositional laws that FPF leverages without committing to a specific optic calculus.

* **Multi‑view modelling and viewpoint libraries.**
  ISO 42010 and its successors, as well as MBSE practice from ~2015 onwards, have refined the separation between **viewpoints** (families of concerns, stakeholders, and notations) and **views** (instances under those viewpoints). `U.EpistemicViewing` gives FPF a substrate‑agnostic notion of “view” that can be instantiated for architecture descriptions, safety cases, or even research artefacts, while TEVB and E.17.0 specialise it to engineering holons.

* **Bidirectional transformations and consistency management.**
  Modern BX research treats views and consistency restoration as structured transformations between models, with consistency relations acting as correspondences. `U.CorrespondenceEpistemicViewing` echoes this practice but insists that:
  * viewing is **non‑creative** in intensional terms (no new commitments),
  * any strengthening or change of described entity is explicitly modelled as retargeting or Intension change.

* **Hybrid symbolic/latent representations.**
  Contemporary work on LLMs and neurosymbolic systems often toggles between:
  * symbolic specifications (logical, tabular, diagrammatic), and
  * distributed or latent representations used for computation.
    By treating `U.RepresentationScheme` and `U.RepresentationOperation` as first‑class episteme components, FPF allows EpistemicViewing to range over:
  * purely symbolic projections,
  * latent‑space projections,
  * or hybrids that invoke external mechanisms before applying a pure view, without changing the core laws.
### Conformance checklist (normative)

**CC‑A.6.3‑1 - EFEM species and DescribedEntityChangeMode.**
Any pattern that claims to define `U.EpistemicViewing` **SHALL**:

* declare itself a species of `U.EffectFreeEpistemicMorphing` (A.6.2),
* fix `describedEntityChangeMode = preserve`,
* and state its Applicability profile (EoIClass, contexts, viewpoints, representation schemes).

**CC‑A.6.3‑2 - Slot‑level read/write discipline.**
For each species of EpistemicViewing, authors **MUST**:

* list the SlotKinds it **reads** (typically `DescribedEntitySlot`, `GroundingHolonSlot`, `ClaimGraphSlot`, `ViewpointSlot`, `RepresentationSchemeSlot`, `ReferenceSchemeSlot`),
* list the SlotKinds it **writes** (typically `ClaimGraphSlot`, optionally `ViewpointSlot`, `RepresentationSchemeSlot`, `ReferenceSchemeSlot`, and `meta`),
* assert explicitly that `DescribedEntitySlot` is read‑only,
* and state any constraints on `GroundingHolonSlot` / `ViewpointSlot` changes.

This satisfies A.6.5 and C.2.1 checkpoint CC‑C.2.1‑5.

**CC‑A.6.3‑3 - DescriptionContext discipline (for D/S epistemes).**
When domain/codomain epistemes are `…Description`/`…Spec`:
* viewing laws SHALL be phrased in terms of `DescriptionContext = ⟨DescribedEntityRef, BoundedContextRef, ViewpointRef⟩`,
* `DescribedEntityRef` MUST be preserved,
* `BoundedContextRef` MUST be preserved unless a Bridge is explicitly cited,
* `ViewpointRef` MUST either be preserved or changed within a declared `U.ViewpointBundle`.

**CC‑A.6.3‑4 - Conservativity witness.**
For each species, authoring SHALL provide:
* a clear statement of what counts as a **new intensional claim** in the relevant discipline,
* and a sketch of how conservativity (EV‑3) is checked or approximated (e.g. via KD‑CAL entailment, proof obligations, or structural invariants).

**CC‑A.6.3‑5 - Profile classification.**
* Species that do not require a `CorrespondenceModel` MUST be marked as `U.DirectEpistemicViewing`.
* Species that do require such a model MUST be marked as `U.CorrespondenceEpistemicViewing` and SHALL:
  * document the shape of the `CorrespondenceModel`,
  * describe how witness epistemes ensure oplax naturality of compositions.

**CC‑A.6.3‑6 - Separation from Retargeting and Mechanisms.**
* Any species that may change `describedEntityRef` is **not** a conformant EpistemicViewing; it MUST be treated as `U.EpistemicRetargeting` (A.6.4) or as a different pattern.
* Any species that performs measurements, actuation, or other side‑effects MUST be declared as `U.Mechanism`/`U.WorkEnactment` and cannot be an EpistemicViewing.
### Mini‑checklist (for authors)

When you introduce a new “view” in FPF, check:
1. **Same described entity?**
   Does `describedEntityRef` stay the same? If not, this is **Retargeting**, not Viewing.

2. **Which slots move?**
   Have you listed exactly which SlotKinds you read/write, and shown that `DescribedEntitySlot` is read‑only?

3. **Conservative?**
   Can you explain, in your discipline’s terms, why the view does not introduce new claims about the same entity?

4. **Profile?**
   Is this a self‑contained projection (`U.DirectEpistemicViewing`) or does it depend on a `CorrespondenceModel` (`U.CorrespondenceEpistemicViewing`)?

5. **Context & viewpoint?**
   Have you stated:
   * the EoIClass for `DescribedEntitySlot`,
   * the contexts/ReferencePlanes you assume,
   * and the viewpoint bundle (if any) you operate under?

If all answers are crisp and the laws EV‑0…EV‑6 are satisfied, the pattern is a good candidate for `U.EpistemicViewing`.
### A.6.3:End
## ConservativeRetextualization — same-described-entity textual re-expression

**Placement.** Specialization under `A.6.3 U.EpistemicViewing` for same-described-entity textual re-expression.  
**Builds on.** `A.6.3 U.EpistemicViewing`; `A.6.2 U.EffectFreeEpistemicMorphing`; `A.7`; `E.10.D2`; `E.17.0`; `E.17`; `F.9`; `F.18`; `E.10`.  
**Coordinates with.** `ExplanationFaithfulnessProfile`; `RepresentationTransduction`; `E.17.ID.CR ComparativeReading`; `A.6.4 U.EpistemicRetargeting`; `B.5.2`; `A.15`.

**One-line summary.** `ConservativeRetextualization` is a same-described-entity textual re-expression of an episteme that stays inside `A.6.3 U.EpistemicViewing`: it may shorten, reorder, filter, translate, or restate claims, but it does **not** silently change `describedEntityRef`, add new claims about that entity, or hide bridge work.

### Problem frame

Teams constantly need a second textual form of the same episteme:
- an internal technical statement rewritten as an engineer-manager-readable report;
- a longer source note rewritten as a shorter working summary;
- a source-language statement rewritten into another natural language;
- a dense claim set rewritten as a filtered report that keeps only one declared slice.

These transforms are often treated as harmless editing. In practice they can quietly drift into hidden reinterpretation, hidden bridge work, hidden explanation, or even hidden retargeting. FPF already has `A.6.3` for same-described-entity conservative viewing. What is still needed is a focused named pattern that states when a textual rewrite remains only a conservative viewing case under `A.6.3`.
### Problem

Without a dedicated pattern for conservative textual re-expression:
1. report, summary, translation, and filtered rewrite cases are handled ad hoc;
2. authors treat textual simplification as if it were automatically conservative;
3. the boundary to explanation-facing surfaces stays blurry;
4. correspondence-mediated rewrites are not distinguished from direct rewrites;
5. later reviewers cannot tell whether the result is still a view of the same described entity or a new interpretive artefact.
### Forces

- **Same entity, different wording.** Readers need different textual forms without reopening the described entity.
- **Compression vs loss visibility.** Shorter or plainer forms are often useful, but omission and attenuation must stay explicit.
- **Direct vs correspondence-mediated rewrites.** Some rewrites read from one source episteme; others depend on a declared `CorrespondenceModel`.
- **Textual focus vs family creep.** The pattern should cover same-entity textual re-expression, not explanation, not representation-wide shifts, and not retargeting.
- **Publication discipline.** Admissible faces and surfaces still matter even when the transform looks like "just a rewrite."
### Solution — same-described-entity textual re-expression under A.6.3

#### Informal definition

> `ConservativeRetextualization` is a named pattern specialized under `A.6.3 U.EpistemicViewing` for textual re-expression of the same described entity.
>
> It preserves `describedEntityRef`, keeps the transform effect-free, and allows only claim-preserving or explicitly loss-declared rewriting of already available content.
>
> It may change register, ordering, textual density, language, emphasis, or local wording. It may not silently introduce new claims, new bridge licences, new downstream authority, or a changed object-of-talk.
#### Pattern, case, and publication distinction

`ConservativeRetextualization` is an **intensional pattern** and a named specialization under `A.6.3`. Concrete same-described-entity rewrites are passive episteme-level cases or publication texts reviewed under this pattern; the pattern itself does not act, decide, or publish.

This distinction matters because the pattern governs **how** a rewrite is recognised, justified, and checked. It does **not** require every short report paragraph, summary line, or translation sentence to carry a giant standalone record.
#### Local working vocabulary

This pattern repeatedly uses a small working vocabulary.
- **Source slice** = the already available pinned or otherwise reviewable textual material being restated.
- **Published slice** = the resulting textual rendering that remains under same-described-entity discipline.
- **Ordinary case** = a reviewable same-entity rewrite where source tether, omission notes, and reroute conditions stay readable without a heavyweight review record.
- **Load-bearing case** = a case where dispute, policy, assurance, correspondence burden, or cross-context reliance makes a fuller record worth publishing.

These terms are only local reading aids. They do not create new owners, new publication faces, or a second semantic layer.
#### Scope and exclusions

**In scope**
- same-described-entity report rewrite;
- same-described-entity summary;
- same-described-entity translation between natural-language surfaces;
- declared filtering or foregrounding of already-present claims in textual form.

**Out of scope**
- any change of `describedEntityRef` or hidden change of object-of-talk (`A.6.4`);
- explanation surfaces whose main purpose is explanatory rendering rather than same-entity rewrite (`ExplanationFaithfulnessProfile`);
- representation-regime changes such as text→table, text→diagram, or text→latent form (`RepresentationTransduction`);
- abductive, bridge-mediated, or route-bearing work that introduces new claims rather than restating available ones.
#### Reader guidance

Use this pattern when the object-of-talk stays fixed and the published result still remains textual.
- If the main change is explanatory, move to `ExplanationFaithfulnessProfile`.
- If the main change is a representation-scheme shift, move to `RepresentationTransduction`.
- If the described entity changes, move to `A.6.4`.
#### What a reviewer checks first

A reviewer usually does not begin by filling every field name. The first useful questions are simpler:
1. Is the published result still about the same described entity?
2. Is the result still textual, or has it become explanation or representation change?
3. Can the reader see what was omitted, softened, or foregrounded?
4. If correspondence is doing work, is that burden visible rather than hidden in fluent prose?
5. If any answer is doubtful, is the reroute path explicit?

Only after these questions are answered does a fuller load-bearing review record usually become worth writing.
#### Working-model first; explicit review record only when the case is load-bearing

Most same-described-entity textual rewrites should stay human-usable. This pattern therefore follows **E.14’s working-model-first discipline**: ordinary report, summary, or translation cases do not need a giant inline metadata block. What they do need is enough explicitness that a reviewer can still tell what stayed the same, what was omitted, and where the case would have to reroute.

**Ordinary case (default).** For everyday same-described-entity rewrites, it is usually enough that the text or its surrounding publication keeps explicit:
- which source material is being re-expressed;
- that `describedEntityRef` remains preserved;
- whether the case is direct or correspondence-mediated when that is not obvious;
- what omissions or attenuation matter for the reader;
- where the case exits if it has turned into explanation, representation shift, retargeting, or world/gate-bearing material.

**Explicit review record (only for load-bearing cases).** A fuller record is warranted when the case is assurance-facing, gate-adjacent, cross-context, correspondence-heavy, policy-bearing, or likely to be disputed. The record may inherit host ids and already-pinned metadata instead of restating them inline. When published, that record normally captures:
- transform placement (`landingForm = specialization under A.6.3`, `hostOwner`, `sourceForm`, `targetForm`, `changeLocus`);
- preservation context (`describedEntityPolicy = preserve`, `boundedContextPolicy`, `viewpointPolicy`, `referenceSchemePolicy`, `representationSchemePolicy`, `groundingPolicy`, `referencePlanePolicy`);
- claim and publication discipline (`claimPolicy`, `claimScopePolicy`, `publicationScopePolicy`, `reliabilityTransportPolicy`, `pinningPolicy`, `provenancePolicy`, `lossProfile`);
- continuity and bridge discipline (`claimContinuityClass`, `microtheoryContinuityClass`, `onticContinuityClass`, `bridgeRequirement`, `conservativityWitness`);
- downstream and admissibility discipline (`worldContactPolicy`, `evidencePolicy`, `gatePolicy`, `workCrossing`, `upstreamOwner`, `downstreamOwner`, `admissibleFaces`, `admissibleSurfaces`, `compositionLaw`, `reopenCondition`);
- naming and presentation discipline (`publicNamePolicy`).

The point of this record is not bureaucratic completion for every paragraph. It is to make **load-bearing** cases reviewable without hiding meaning in style, topic familiarity, or editor intuition.
#### Ordinary admissibility defaults

Default admissibility for ordinary same-described-entity textual cases:
- primary admissible faces are `Plain` and `Tech`;
- bounded report-only use is lawful when source pins, provenance, loss notes, and same-described-entity conservativity remain visible;
- `Interop` use is lawful only when the host explicitly permits source-pinned, text-preserving export without added semantics;
- `Assurance` or gate-bearing use is not default and requires host-explicit policy plus source-pinned conservativity without hidden strengthening.
#### Direct and correspondence-mediated profiles

**Direct ConservativeRetextualization**
- source and target are textual re-expressions of one source episteme;
- no `CorrespondenceModelRef` is needed;
- the main burden is explicit loss/provenance discipline.

**CorrespondenceConservativeRetextualization**
- the target text is derived from a declared correspondence between epistemes or views of the same described entity;
- `CorrespondenceModelRef` is required;
- the result remains under `A.6.3` only if the correspondence supports same-described-entity conservativity and no new claims are imported beyond the declared witness set.

Cross-language translation is not automatically direct. If the translation depends on declared correspondence, reference-scheme mediation, or bounded equivalence notes, it must be treated as correspondence-mediated rather than disguised direct rewriting.
#### Recurring same-entity textual moves

The pattern covers a small family of recurring textual moves as long as the same described entity remains explicit:
- **Register shift** — a technical statement is rewritten into plainer engineer-manager prose without changing what is being said about the same entity.
- **Summary or filtered restatement** — a source note is shortened or focused on one declared slice, with omissions stated rather than hidden.
- **Cross-language restatement** — the same source claim is restated in another natural language while the same source tether and same-entity line remain explicit.
- **Correspondence-supported textual synthesis** — one textual rendering is produced from declared same-entity correspondences without importing extra bridge or substitution burden.

These are recurring move shapes, not separate owners. The host relation remains the same: same-described-entity textual re-expression under `A.6.3`.
#### Shared conservative retextualization law packet

##### A.6.3.CR:4.5.a. Preservation law

A case under `ConservativeRetextualization` preserves the same described-entity line, the declared bounded context, and the already available claim-bearing source while changing wording, register, language, ordering, or density. It states what remains preserved about claim scope, publication scope, pins, provenance, grounding, and ontic scaffold, and it says whether the case is `Direct` or `Correspondence`.
##### A.6.3.CR:4.5.b. Loss and reliability law

A reviewed case makes explicit what is omitted, shortened, foregrounded, or attenuated by the rewrite. Reliability transport may remain source-bounded or be explicitly downgraded, but it must never be silently strengthened by cleaner prose, stronger rhetoric, or management-facing polish.
##### A.6.3.CR:4.5.c. Authority and handoff law

A case reviewed under this pattern stays same-entity and episteme-level. It does not own explanation governance, bridge stance, retargeting, gate authority, or work enactment. If the rewrite becomes explanatory, bridge-bearing, gate-bearing, or world-facing, the case must hand off to the appropriate downstream owner and say so explicitly.
##### A.6.3.CR:4.5.d. Composition and reopen law

Repeated direct rewrite over the same source line may be idempotent, but heterogeneous rewrites and correspondence-mediated rewrites are generally order-sensitive. A reviewed case must reopen whenever correspondence support, source pins, provenance, admissible-face assumptions, or same-described-entity conservativity stop being explicit.
##### A.6.3.CR:4.5.e. Non-collapse note for correspondence

Correspondence-mediated retextualization does **not** by itself grant bridge licence, substitution licence, or comparative-reading licence. If the case needs those burdens, they must be declared separately rather than being smuggled in through correspondence language.
##### A.6.3.CR:4.5.f. Local conservativity witness for borderline textual cases

For borderline textual rewrites, a reviewer treats the case as no longer conservative under this pattern unless each point below remains visibly preserved or is explicitly loss-declared with the reroute path stated.
- **Modality and force.** A rewrite may not silently turn possibility, uncertainty, bounded scope, or hypothesis language into stronger commitment.
- **Caveats and qualifications.** A rewrite may not quietly remove conditions, exception notes, uncertainty markers, or temporal qualifiers that still matter for reading the same source.
- **Reliability posture.** Cleaner prose, better ordering, or manager-facing polish may not silently raise confidence, warrant strength, or readiness for action.
- **Bridge and substitution burden.** Same-entity textual fluency may not import cross-context equivalence, substitution, or comparative-reading licence unless that burden is declared elsewhere.
- **Alternative preservation.** A rewrite may not collapse open alternatives, rival hypotheses, or declared plurality into one apparently settled reading unless the loss is stated and still lawful under this pattern.

This witness is local to `ConservativeRetextualization`. It does not replace the broader conservativity laws of `A.6.3`; it makes them inspectable for textual rewrites where fluent prose can otherwise hide strengthening.
### Archetypal Grounding

#### Same-described-entity report rewrite

**Source note slice.** `Service S exceeded the latency threshold in the evening batch window. Trace T-44 and dashboard pin D-17 show the spike. Two low-confidence hypotheses remain open.`

**Published report slice.** `Evening-batch latency for Service S exceeded the threshold. Source pins: Trace T-44, Dashboard D-17. Low-confidence hypotheses are omitted here and remain in the pinned source note.`

This is a lawful direct `ConservativeRetextualization` because the described entity stays fixed, the report remains textual, and the omission is stated rather than hidden. In ordinary internal use, this often needs only source pins plus visible omission notes rather than a full explicit review record.
#### Ordinary inherited-pin summary

**Pinned source cluster.** `Incident note N-14, trace T-44, and dashboard card D-17 are already published together under one incident review bundle.`

**Published stand-up slice.** `Evening-batch latency again exceeded the threshold for Service S. See N-14 / T-44 / D-17 for the pinned source cluster.`

This is still a lawful ordinary case even though the short stand-up slice does not restate every pin and qualifier inline. The didactic point is that lightweight use may inherit already-published pins and provenance when the tether stays visible to the reader.
#### Same-described-entity rewrite via declared correspondence

**Source design slice.** `Cooling loop CL-2 preserves safe temperature margins during standard load.`

**Source safety slice.** `Cooling loop CL-2 maintains the temperature condition required for hazard-control claim HC-7 during standard load.`

**Published joint-review slice.** `For standard load, Cooling loop CL-2 is described in both the design and safety views as maintaining the required temperature condition. This summary relies on CorrespondenceModel CM-12 and does not add claims beyond that declared overlap.`

The synthesis may stay in this pattern only if the source relation remains explicit and the text does not silently strengthen claims beyond the declared correspondence-supported overlap. Because correspondence support is load-bearing here, a fuller explicit review record is usually warranted.
#### Cross-language re-expression without hidden bridge work

**Source slice.** `The backup controller stays in passive watch mode until the primary loop fails two consecutive heartbeat checks.`

**Published slice.** `Резервный контроллер остаётся в режиме пассивного наблюдения, пока основной контур не пропустит две последовательные проверки heartbeat.`

This remains in `ConservativeRetextualization` only if the translation is still tethered to the same source claim, preserves the same described entity, and does not quietly add cross-tradition bridge claims such as "equivalent architecture role" or "same operational guarantee" beyond what the source actually states.
#### Boundary to explanation surfaces

A text is rewritten not mainly to restate the same source, but to explain why it matters, simplify reasoning for a learner, or narrate a mechanism. That move should leave `ConservativeRetextualization` and be reviewed under `ExplanationFaithfulnessProfile`.
#### Boundary to representation transduction

A prose note is rewritten as a table, matrix, diagram, or latent/distributed representation. Even if the described entity stays fixed, this is not only a textual rewrite; it belongs with `RepresentationTransduction`.
### Bias-Annotation

Lenses tested: **Arch**, **Onto/Epist**, **Prag**, **Did**.
This pattern intentionally biases toward same-entity conservativity and away from explanation or retargeting inflation. The main mitigation is explicit reroute discipline to `ExplanationFaithfulnessProfile`, `RepresentationTransduction`, `A.6.4`, and later downstream owners when the same-entity textual reading stops being honest.
### Conformance Checklist

1. **CC-CR-1 — Same described entity remains explicit.**
   The case preserves `describedEntityRef` without special pleading.
2. **CC-CR-2 — Textual re-expression remains the right family.**
   The result stays a textual re-expression rather than explanation or representation shift.
3. **CC-CR-3 — Loss / provenance / pinning / reliability are explicit or inherited by pinned reference.**
   The case states these explicitly or inherits them through already-pinned host material that remains visible to review.
4. **CC-CR-4 — Direct vs correspondence split is explicit.**
   The `Direct / Correspondence` split is explicit and justified.
5. **CC-CR-5 — Correspondence support is named where needed.**
   If correspondence-mediated, `CorrespondenceModelRef` is declared.
6. **CC-CR-6 — Local conservativity witness remains satisfied.**
   The reviewed case does not silently strengthen modality, remove caveats, raise reliability posture, import bridge or substitution licence, or collapse declared alternatives beyond stated loss notes.
7. **CC-CR-7 — Reroute path is explicit on failure.**
   If the case fails any of the checks above, the reroute path is explicit (`ExplanationFaithfulnessProfile`, `RepresentationTransduction`, `A.6.4`, `B.5.2`, or another owner).
8. **CC-CR-8 — Working-model first remains intact.**
   Ordinary same-entity rewrites stay lightweight; fuller explicit review records are reserved for load-bearing cases.
### Common Anti-Patterns and How to Avoid Them

| Anti-pattern | Why it is wrong | How to avoid it |
|---|---|---|
| Treating every summary as automatically conservative | summary pressure hides omission and claim drift | publish loss/provenance discipline explicitly |
| Hiding correspondence in plain paraphrase | correspondence burden disappears into prose | declare `CorrespondenceModelRef` when needed |
| Letting a rewrite become explanation | explanation work quietly becomes a textual “rewrite” | reroute to explanation governance once didactic/explanatory work dominates |
| Letting object-of-talk drift by topic similarity | same topic is not the same described entity | exit to `A.6.4` if `DescribedEntityRef` changes |
### Consequences

- Textual same-entity rewrites get a lawful place without inventing a new heavy owner.
- Direct and correspondence-mediated variants stay visibly separated.
- Loss, provenance, and reliability transport become explicit instead of implicit editorial judgement.
- Ordinary working-model use stays lightweight, while load-bearing cases get a fuller explicit review record when risk warrants it.
- The pattern remains safely bounded by `A.6.3`, `A.6.4`, explanation-facing work, and representation-shift work.
### Rationale

This pattern is worth splitting out because same-entity textual re-expression is common, useful, and safer than many neighboring transform families when it stays explicitly conservative. Keeping it under `A.6.3` as a named specialization preserves owner integrity while making a recurring authoring move easier to review, while still respecting E.14’s working-model-first discipline for ordinary cases.
### SoTA-Echoing

**SoTA note.** This section does not mint an independent second rule layer. It is a load-bearing alignment surface: the Solution, Conformance Checklist, boundary rules, and Relations of this pattern must match the stance stated here or explicitly justify any divergence.

**Traditions covered.** This pattern binds itself to architecture-description governance, summarization factuality, translation-quality governance, and plain-language rewrite practice.

| Claim need | SoTA practice (post-2015) | Primary source (post-2015) | Alignment with `A.6.3.CR` | Adoption status |
|---|---|---|---|---|
| Conservative rewrite must stay visibly tied to the same described content rather than drifting through presentation fluency. | Architecture-description practice separates source artefact, view, viewpoint, and correspondence burden instead of letting rendered prose silently change the object being described. | ISO/IEC/IEEE 42010:2022 | `A.6.3.CR` keeps same-described-entity textual restatement under `A.6.3`, requires explicit reroute when object-of-talk changes, and keeps bridge burden out of fluent rewrite. | **Adopt.** |
| Summary-like rewriting is not automatically harmless; factuality and faithfulness need source-sensitive checking. | Modern summarization work treats unsupported compression, strengthening, and hallucinated linkage as core failure modes rather than editorial noise. | Maynez et al. (2020), *On Faithfulness and Factuality in Abstractive Summarization* | `A.6.3.CR` adopts that stance and adapts it to FPF by making omission, reliability posture, and same-entity bounds explicit review concerns. | **Adopt/Adapt.** |
| Translation quality is governed through declared dimensions such as accuracy, omission, and addition rather than by fluency alone. | Translation-quality governance separates adequacy from surface smoothness and requires explicit treatment of omission/addition error classes. | Lommel et al. (2018), *MQM: A Framework for Declaring Translation Quality Metrics* | `A.6.3.CR` adapts this by treating correspondence-mediated and cross-language rewrites as lawful only when loss, provenance, and same-entity bounds stay explicit. | **Adapt.** |
| Plain-language rewrite may improve readability, but it must not silently change obligations, scope, or force. | Plain-language standards favour reader-oriented rewriting while preserving the original commitments and conditions that matter for use. | ISO 24495-1:2023 | `A.6.3.CR` adopts reader-oriented simplification for ordinary cases and rejects the popular shortcut that “plainer text” alone proves conservativity. | **Adopt/Reject-popular-shortcut.** |

**Architecture-description governance.** `A.6.3.CR` adopts the discipline that rendered text must stay visibly tied to a declared source/view line. It therefore rejects same-topic textual polish as sufficient evidence of same-described-entity conservativity.

**Summarization factuality.** `A.6.3.CR` adapts modern factuality concerns into a local conservativity witness: unsupported strengthening, hidden omission, and rhetorical uplift are treated as load-bearing failures, not as style noise.

**Translation and plain-language traditions.** `A.6.3.CR` adopts the reader-oriented value of translation and plain rewrite, but rejects the still-popular habit of treating cross-language or plain-language textual fluency as automatic proof that no new claim has been introduced.

**Local stance.** Best-known current practice supports a narrow rule: same-described-entity textual restatement is lawful only when source tether, loss, provenance, and same-entity bounds remain explicit enough that the reader can still tell what was preserved, what was omitted, and when the case must exit to another owner.
### Relations

- **Builds on:** `A.6.3`, `A.6.2`, `A.7`, `E.10.D2`, `E.17.0`, `E.17`, `F.9`, `F.18`, `E.10`
- **Coordinates with:** `ExplanationFaithfulnessProfile`, `RepresentationTransduction`, `E.17.ID.CR ComparativeReading`, `A.6.4`, `B.5.2`, `A.15`
- **Impact radius:** primary touch `A.6.3`; secondary review surfaces `E.17.0`, `E.17`, `F.9`; failed conservativity exits to `A.6.4`, `B.5.2`, or `A.15`
- **Boundary notes:** explanation-facing cases exit to `ExplanationFaithfulnessProfile`; representation-regime shifts exit to `RepresentationTransduction`; bounded comparative review units exit to `E.17.ID.CR ComparativeReading`; described-entity changes exit to `A.6.4`.
### A.6.3.CR:End
## RepresentationTransduction — same-described-entity representation-scheme transition

**Placement.** Specialization under `A.6.3 U.EpistemicViewing` for same-described-entity representation-scheme transition.  
**Builds on.** `A.6.3 U.EpistemicViewing`; `A.6.2 U.EffectFreeEpistemicMorphing`; `A.7`; `E.10.D2`; `C.2.7`; `E.17.0`; `E.17`; `F.9`; `F.18`.  
**Coordinates with.** `ConservativeRetextualization`; `ExplanationFaithfulnessProfile`; `E.17.ID.CR ComparativeReading`; `A.6.4 U.EpistemicRetargeting`; `A.15`; `A.20`; `A.21`; explicit decoding-access review.

**One-line summary.** `RepresentationTransduction` is a same-described-entity shift in representation scheme that stays inside `A.6.3 U.EpistemicViewing`: it may move between prose, table, diagram, structured notation, or another declared representation regime, but it does **not** silently change `describedEntityRef`, promote geometry or notation into ontology-by-default, or hide decode-mediated recoverability behind surface fluency.

### Problem frame

The same described entity often needs to be carried across more than one representation regime:
- prose into a table that makes comparison or coverage clearer;
- a table into a diagram that foregrounds dependency or topology;
- a diagram into a structured notation suitable for replay or technical review;
- a source representation into another regime that changes reasoning affordances without changing the underlying object-of-talk.

In practice these shifts are often treated as harmless reformatting. But some representation changes alter reasoning affordances, weaken recoverability, or quietly change what appears to be present in the source. FPF already has `A.6.3` for same-described-entity conservative viewing. This pattern names the recurring same-described-entity case where the published result changes representation scheme while the case still remains inside `A.6.3`.
### Problem

Without a dedicated named pattern for representation-scheme transitions:
1. teams treat text-to-table, table-to-diagram, and notation shifts as if they were all the same kind of harmless rewrite;
2. changes in reasoning medium and recoverability remain implicit;
3. latent/distributed cases tempt authors to treat geometry or feature clusters as ontology-by-default;
4. reviewers cannot tell when a case is still same-entity viewing and when it has become retargeting, explanation, carrier work, or decode-mediated reconstruction;
5. representation factors owned near `C.2.7` are discussed rhetorically rather than as explicit deltas.
### Forces

- **Same entity, different reasoning medium.** Teams need different representational forms without silently changing the described entity.
- **Legibility vs recoverability.** A clearer representation is useful only if readers can still recover how it relates to source claims, anchors, and pins.
- **Representation change vs ontology drift.** A new notation or geometry can make structure more visible, but it must not silently become a new object-of-talk.
- **Recoverability before decode ambition.** Start from cases where recoverability can be reviewed directly before leaning on decode-mediated reconstruction.
- **Owner restraint.** This pattern must stay under `A.6.3`, not swallow explanation governance, retargeting, bridge work, or carrier work.
### Solution — same-described-entity representation-scheme transition under A.6.3

#### Informal definition

> `RepresentationTransduction` is a named pattern specialized under `A.6.3 U.EpistemicViewing` for same-described-entity transitions across declared representation schemes.
>
> It preserves `describedEntityRef`, keeps the transform effect-free, and makes explicit what changes in representation factors, reasoning medium, recoverability, and loss profile.
>
> It may move between prose, table, diagram, structured notation, or another declared representation regime. It may not silently change the described entity, silently import bridge semantics, or treat decode-mediated structure as if it were directly given.
#### Pattern, case, and published rendering distinction

`RepresentationTransduction` is an **intensional pattern** and a named specialization under `A.6.3`. Concrete same-described-entity representation changes are passive episteme-level cases or published renderings reviewed under this pattern; the pattern itself does not act, decide, or publish.

This distinction matters because the pattern governs **how** a representation change is recognised, justified, and checked. It does **not** turn every table, diagram, or structured notation into a giant standalone review object, and it does not reduce review to a mechanical reformatting step.
#### Local working vocabulary

This pattern uses a small local vocabulary for review.
- **Representation scheme** = the published form in which the same entity is rendered (for example prose, table, diagram, or structured notation).
- **Reasoning medium** = the form-specific affordances readers actually use when inspecting the published material.
- **Semiotic mode** = what kind of meaning-bearing support is doing the main work in the rendering, such as structural likeness, trace/index, conventional code, model-mediated correspondence, or decode-mediated recoverability.
- **Factor delta** = the explicit change in representation factors that matters for review.
- **Source tether** = the visible link back to pinned or otherwise reviewable source material that keeps same-entity support honest.
- **Decode-mediated case** = a case where explicit access to the target representation depends on a declared decoding route rather than direct reading from already published source material.

These terms are local review aids. They do not create a new face family or a new ontology owner.
#### Scope and exclusions

**In scope**
- text-to-table shift over the same described entity;
- table-to-diagram shift over the same described entity;
- diagram-to-structured-notation shift where the represented entity and claim-bearing material stay preserved;
- other same-entity representation-scheme changes with explicit recoverability discipline.

**Out of scope**
- any change of `describedEntityRef` or hidden change of object-of-talk (`A.6.4`);
- explanation-facing renderings whose main purpose is didactic or explanatory surface work (`ExplanationFaithfulnessProfile`);
- purely textual rewrites that stay inside one representation regime (`ConservativeRetextualization`);
- carrier work such as rendering, export, upload, serialization, or OCR/parsing-like extraction;
- latent/distributed use without explicit decode route and recoverability evidence.
#### Reader guidance

Use this pattern when the object-of-talk stays fixed but the published result changes representation scheme or reasoning medium.
- If only wording changes, stay in `ConservativeRetextualization`.
- If the target mainly teaches, narrates, or explains, move to `ExplanationFaithfulnessProfile`.
- If same-entity support fails, move to `A.6.4`.
#### What a reviewer checks first

A reviewer usually starts with five questions:
1. Is the described entity still the same, or has the object-of-talk shifted?
2. What changed in representation scheme and reasoning medium?
3. Can the target still be tethered back to source-bearing material strongly enough for same-entity reading?
4. Has the case quietly become explanation, bridge-bearing comparison, retargeting, or carrier work?
5. If decoding is involved, is the evidence class strong enough for the intended face and use?

Only after these questions are answered clearly does a fuller load-bearing review record normally become necessary.
#### Working-model first; explicit review record only when the case is load-bearing

Most same-described-entity representation shifts should stay human-usable and reviewable without turning every table, diagram, or structured rendering into a giant metadata block. This pattern therefore follows **E.14's working-model-first discipline**: ordinary non-latent cases need enough explicitness to show what stayed the same, what changed in representation and reasoning medium, what was lost or foregrounded, and where the case would have to reroute.

**Ordinary case (default).** For everyday same-described-entity representation shifts, it is usually enough that the rendering or its surrounding publication keeps explicit:
- which source material is being re-expressed in a different representation regime;
- that `describedEntityRef` remains preserved;
- what changed in representation scheme or reasoning medium;
- what losses, foregrounding choices, or recoverability limits matter for the reader;
- where the case exits if it has turned into explanation, retargeting, bridge-bearing comparison, carrier work, or decode-mediated reconstruction with insufficient support.

**Explicit review record (only for load-bearing cases).** A fuller record is warranted when the case is assurance-facing, gate-adjacent, cross-context, correspondence-heavy, decode-mediated, policy-bearing, or likely to be disputed. The record may inherit host ids and already-pinned metadata instead of restating them inline. When published, that record normally captures:
- transform placement (`landingForm = specialization under A.6.3`, `hostOwner`, `sourceForm`, `targetForm`, `changeLocus`);
- preservation context (`describedEntityPolicy = preserve`, `boundedContextPolicy`, `viewpointPolicy`, `referenceSchemePolicy`, `representationSchemePolicy`, `groundingPolicy`, `referencePlanePolicy`);
- claim and publication discipline (`claimPolicy`, `claimScopePolicy`, `publicationScopePolicy`, `reliabilityTransportPolicy`, `pinningPolicy`, `provenancePolicy`, `lossProfile`);
- continuity and bridge discipline (`claimContinuityClass`, `microtheoryContinuityClass`, `onticContinuityClass`, `bridgeRequirement`);
- downstream and admissibility discipline (`worldContactPolicy`, `evidencePolicy`, `gatePolicy`, `workCrossing`, `upstreamOwner`, `downstreamOwner`, `admissibleFaces`, `admissibleSurfaces`, `compositionLaw`, `reopenCondition`);
- representation and recoverability discipline (`representationFactorDelta`, `inferenceRegimeDelta`, `semioticModePrimary?`, `semioticModeSupport?`, `semioticModeShift?`, `modeOverreadRisk?`, `salienceShift?`, `topologyShift?`, `actionabilityShift?`, `calibrationShift?`, `interactivityShift?`, `onticScaffoldPreservation`, `onticRecoverabilityClass`, `onticRecoverabilityMode`, `RecoverabilityEvidenceClass`, `decodeMechanismRef`, `CorrespondenceModelRef?` where needed);
- naming and presentation discipline (`publicNamePolicy`).
#### Working admissibility defaults

By default in this pattern:
- primary admissible faces for non-latent cases are `Plain` and `Tech`;
- bounded report-only use is lawful when source pins, provenance, loss notes, and same-described-entity support remain visible;
- `Interop` use is lawful only when the host explicitly permits source-pinned, structure-preserving export without added semantics;
- `Assurance` or gate-bearing use is not default and requires host-explicit policy plus source-pinned same-entity support;
- latent/distributed variants remain bounded until explicit recoverability evidence and decode-route discipline are published.
#### Direct and correspondence-mediated profiles

**Direct RepresentationTransduction**
- source and target are representation-scheme variants over one same-described-entity source line;
- no `CorrespondenceModelRef` is required;
- the main burden is explicit factor delta, reasoning-medium delta, and recoverability discipline.

**CorrespondenceRepresentationTransduction**
- the target representation is derived through a declared correspondence between epistemes or views of the same described entity;
- `CorrespondenceModelRef` is required;
- the result remains under `A.6.3` only if same-entity conservativity is still supportable and the correspondence does not silently import extra claims.

Correspondence-mediated representation work does **not** by itself grant bridge licence, substitution licence, or comparative-reading licence. If the case needs those burdens, they must be declared separately rather than hidden inside representation language.
#### Recurring same-entity representation moves

Recurring same-entity moves under this pattern include:
- **Tabulation** — prose or dispersed claims are rendered into a table that exposes comparison or coverage more clearly.
- **Diagramming** — a table or prose relation set is rendered into a diagram that foregrounds structure while remaining source-tethered.
- **Structured notation shift** — prose, table, or diagram material is rendered into a notation better suited for disciplined replay or technical inspection.
- **Correspondence-supported representation shift** — the target representation depends on declared same-entity correspondence support without thereby becoming a bridge case.

These are recurring move shapes under one host relation. They are not separate owners and they do not override `E.17` face discipline.
#### How a reviewer reads representation-factor and reasoning-medium change

A reviewer should be able to say, in one short paragraph, what changed in representational shape, what changed in reasoning medium, and whether the primary change is also a `semioticModeShift` rather than only a scheme change. Typical read-outs are: "the table foregrounds comparability across rows", "the diagram foregrounds dependency shape", or "the notation foregrounds explicit argument positions."

When the case is more demanding, that paragraph should also name whether salience, topology, actionability, calibration, or interactivity materially changed. If the author cannot name those shifts without slipping into new ontology, hidden bridge work, or a changed described entity, the case is not yet ready to stay here. Use `semioarchitecture-representation-delta-review-crib-sheet.md` and `semioarchitecture-semiotic-mode-axis-note.md` when the deltas need a more normalized read-out.
#### Shared representation law packet

##### A.6.3.RT:4.5.a. Preservation law

`RepresentationTransduction` preserves the same described-entity line, bounded context, and declared claim-bearing source while changing the representation scheme and, often, the reasoning medium. It must state what remains preserved about the ontic scaffold, claim scope, publication scope, pins, provenance, and grounding. It must also state whether the case remains direct or correspondence-mediated.
##### A.6.3.RT:4.5.a.1. Local conservativity witness

For this pattern, a new intensional claim is introduced when the target rendering:
- upgrades a source-visible relation into a stronger relation theory or stronger dependency semantics;
- turns geometry, notation, embedding proximity, or decoder output into ontology-by-default;
- adds bridge, substitution, comparative-reading, or mechanism claims not already licensed by the source line or declared correspondence;
- collapses source alternatives, uncertainty, or bounded scope into one stronger commitment;
- or treats decode-mediated recoverability as if it were direct givenness.

Conservativity is approximated here by checking, together, `describedEntityPolicy = preserve`, source-tether strength, factor delta, reasoning-medium delta, loss profile, ontic scaffold preservation, and whether each target-side connective can be pointed back to pinned source material or declared same-entity correspondence support.
##### A.6.3.RT:4.5.b. Loss and reliability law

A reviewed case under this pattern makes explicit which distinctions, affordances, or local cues are lost, foregrounded, or rearranged by the shift in representation regime. Reliability transport may remain source-bounded or be explicitly downgraded, but it must never be silently strengthened just because the target form looks clearer, more structured, or more formal.
##### A.6.3.RT:4.5.c. Authority and handoff law

A case reviewed under this pattern stays same-entity and episteme-level. It does not own retargeting, bridge stance, explanation governance, executable docking, gate authority, or work enactment. If the shift depends on decode-mediated recovery, intervention-backed extraction, or world/gate consequences, those dependencies must stay explicit and may restrict the target to exploratory or report-only use.
##### A.6.3.RT:4.5.c.1. Same-entity entry condition for decode-mediated cases

A decode-mediated case may stay here only when the target rendering is tethered back to already pinned and provenance-bearing source material for the same described entity. A decode-mediated result alone does not establish the same described entity strongly enough for this pattern.
##### A.6.3.RT:4.5.d. Composition and reopen law

Repeated same-regime normalization may be idempotent, but heterogeneous regime shifts are generally order-sensitive. The case must reopen whenever recoverability assumptions, pins, provenance, correspondence support, or target-face admissibility change. A representation shift also reopens if what looked like one same-entity line turns out to require a new described entity or a decode route stronger than currently declared.
#### Hard boundary rules

A case reviewed under this pattern keeps the following explicit:
- `describedEntityPolicy = preserve` is mandatory;
- any change of `DescribedEntityRef` exits to `A.6.4`;
- purely textual rewrite cases stay with `ConservativeRetextualization`;
- explanation-facing cases stay with `ExplanationFaithfulnessProfile`;
- carrier work stays outside this pattern;
- geometry, notation, embedding space, or feature clustering must not become ontology-by-default;
- the family changes representation scheme, not face ownership, and it therefore stays under existing `E.17.0 / E.17` face discipline rather than creating a new publication family.

If recoverability depends on decoding, probing, or intervention, the evidence class must bound admissible use; otherwise the case stays exploratory, report-only, or outside the admissible same-described-entity path under `A.6.3.RT`. Low-evidence decode-mediated results are not weaker canonical publications; they are bounded exploratory or report-only renderings. Non-latent cases remain the default entry path until decode-mediated recoverability is made explicit.
### Archetypal grounding

#### Same-entity text-to-table shift

**Source slice.** `Service S showed three recurring latency spikes in the evening batch window. Trace T-44 and dashboard pin D-17 identify the same service and time window.`

**Published table slice.** `| Service | Window | Spike count | Source pins |
| Service S | Evening batch | 3 | T-44, D-17 |`

This is a lawful direct `RepresentationTransduction` if no new claims are introduced, the same described entity stays explicit, and the representation-factor delta is declared. In ordinary engineering use, this usually needs a visible source tether, explicit loss notes if anything was omitted, and a clear statement that the table is still about the same service occurrence rather than a new derived object.
#### Same-entity table-to-diagram shift

**Source table slice.** `| Node | Depends on |
| CoolingLoop | Sensor A |
| CoolingLoop | Valve B |`

**Published diagram slice.** `CoolingLoop -> Sensor A; CoolingLoop -> Valve B`

The move stays in this pattern only if the described entity is preserved, the diagram does not silently add new semantic commitments, and reasoning-medium change is declared. If the diagram starts asserting a stronger dependency theory than the source table actually states, the case must reopen and may leave this pattern.
#### Correspondence-mediated text-to-table shift

**Source prose slice.** `In the safety view, CL-2 maintains the required temperature condition during standard load.`

**Published table slice.** `| View | Entity | Condition | Correspondence model |
| Safety | CL-2 | required temperature condition during standard load | CM-12 |`

The move stays in this pattern only if the correspondence remains explicit, the described entity stays preserved, and the resulting table does not quietly import bridge semantics or a changed object-of-talk. Because the correspondence burden is doing real work here, a fuller review record is often warranted instead of relying only on the rendered table.
#### Same-entity diagram-to-structured-notation shift

**Source diagram slice.** `CoolingLoop -> Sensor A; CoolingLoop -> Valve B`

**Published notation slice.** `dependsOn(CoolingLoop, SensorA)`
`dependsOn(CoolingLoop, ValveB)`

This remains under `RepresentationTransduction` when the notation stays tethered to the same relation line already visible in the diagram, the described entity remains preserved, and no stronger dependency theory is silently imported by the notational rendering.
#### Boundary to textual rewrite

A source prose note is shortened, reordered, or translated but remains essentially textual. That case stays with `ConservativeRetextualization`, not this pattern.
#### Boundary to explanation surfaces

A representation shift is performed mainly to teach or narrate rather than to publish another same-entity representation regime. That case should leave this pattern and be reviewed under explanation governance.
#### Boundary to bridge-bearing comparison

**Source slice.** `Local reliability note: Pump P-2 remained within operating range during test window W-3.`

**Published comparative slice.** `Pump P-2 in W-3 behaves like Unit U-7 in Plant B and can therefore be treated as operationally equivalent for this comparison.`

This does **not** stay in `RepresentationTransduction`. The rendering has moved from a same-described-entity representation shift to comparative or bridge-bearing reading across contexts. Once the publication starts asserting cross-context equivalence, substitution, or comparative licence, the case must leave this pattern and move to explicit bridge-governed review.
#### Boundary to carrier/export work

**Source rendering slice.** `| Service | Window | Spike count | Source pins |`

**Published export slice.** `latency-report.csv` and dashboard PNG generated from the same table.

This also stays outside `RepresentationTransduction`. The representation scheme was already chosen; what follows is carrier formatting, export, packaging, or rendering work on that representation. The didactic point is that not every change in visible form is a new same-described-entity representation transition.
#### Boundary to decode-mediated latent cases

A reviewer or decode path tries to restate a latent region or distributed feature cluster as explicit object/relation content. This stays outside the admissible same-described-entity path under `A.6.3.RT` unless an explicit decoding-access profile, `RecoverabilityEvidenceClass`, and an explicit decode route are already present. Readable decode output alone is not enough.
#### Guarded decode-mediated readout

**Pinned source cluster.** `Probe run P-8 is tied to model-state log M-12 and evaluation bundle EV-4 for the same diagnostic case.`

**Published exploratory slice.** `A decode-mediated readout suggests a cluster that may correspond to the same failure episode already pinned in P-8 / M-12 / EV-4. This rendering stays exploratory and report-only until stronger recoverability evidence is published.`

This example remains guarded-open rather than green. The didactic point is that a decode-mediated rendering may still be useful, but it does not become a normal same-entity publication merely because the result looks readable.
### Bias-Annotation

Lenses tested: **Arch**, **Onto/Epist**, **Prag**, **Did**.
This pattern intentionally biases toward same-entity representation shifts and away from hidden retargeting, explanation inflation, or ontology-by-default through notation or geometry. The main mitigation is explicit recoverability discipline, preserve-vs-retarget escape rules, and directly reviewable entry cases before decode-mediated ones.
### Conformance Checklist

1. **CC-RT-1 — Same described entity remains explicit.**
   The case preserves `describedEntityRef` without special pleading.
2. **CC-RT-2 — Representation shift is the right family.**
   The result is genuinely a representation-scheme shift rather than mere textual rewrite or explanation work.
3. **CC-RT-3 — Factor, reasoning-medium, and mode deltas are explicit.**
   `representationFactorDelta`, `inferenceRegimeDelta`, and any load-bearing `semioticModeShift` are explicit.
4. **CC-RT-4 — Extended delta axes are explicit when load-bearing.**
   `salienceShift`, `topologyShift`, `actionabilityShift`, `calibrationShift`, and `interactivityShift` are named whenever they materially shape review or misuse risk.
5. **CC-RT-5 — Recoverability is explicit.**
   Recoverability is stated explicitly through `onticRecoverabilityClass` and `onticRecoverabilityMode`.
6. **CC-RT-6 — Decode-mediated cases carry stronger evidence.**
   If the case is decode-mediated or latent/distributed, `RecoverabilityEvidenceClass` and decode route are explicit.
7. **CC-RT-7 — Loss / provenance / pinning / reliability are explicit.**
   Losses, provenance, pinning, and reliability transport are explicit.
8. **CC-RT-8 — Preserve-vs-retarget reroute is explicit.**
   If the case fails any of the checks above, the reroute path is explicit (`ConservativeRetextualization`, `ExplanationFaithfulnessProfile`, `A.6.4`, or another owner).
9. **CC-RT-9 — Direct vs correspondence split is explicit.**
   The case states whether it is direct or correspondence-mediated; if correspondence-mediated, `CorrespondenceModelRef` is explicit.
10. **CC-RT-10 — Non-default face/surface admissibility is explicit.**
    Any `Interop`, `Assurance`, gate-bearing, or decode-bounded use states host-explicit admissibility and keeps same-entity support visible.
11. **CC-RT-11 — Decode-mediated same-entity entry tether is explicit.**
    A decode-mediated case states how the target rendering is tethered back to already pinned and provenance-bearing source material for the same described entity.
12. **CC-RT-12 — No hidden bridge or face-family inflation.**
    The case makes clear that representation work does not by itself grant bridge, substitution, or comparative-reading licence and does not create a new face family.
13. **CC-RT-13 — Reopen triggers are explicit when recoverability, admissibility, or primary mode changes.**
    If recoverability assumptions, pins, provenance, correspondence support, target-face admissibility, or the primary semiotic mode change, the case records the reopen trigger explicitly.
### Common Anti-Patterns and How to Avoid Them

| Anti-pattern | Why it is wrong | How to avoid it |
|---|---|---|
| Treating every format shift as harmless formatting | representation changes can alter reasoning affordances and recoverability | publish factor delta and reasoning-medium delta explicitly |
| Collapsing representation-scheme shift, semiotic-mode shift, and viewpoint shift into one vague change | reviewers cannot tell what actually changed or what burden is primary | name scheme, mode, and viewpoint separately and use the canonical boundary exemplars when only one of them changed |
| Letting notation become ontology-by-default | diagram or geometry starts pretending to define the world rather than represent it | keep ontic scaffold preservation and recoverability explicit |
| Hiding retargeting under representation language | a changed object-of-talk is mislabeled as same-entity representation work | exit to `A.6.4` whenever `DescribedEntityRef` changes |
| Starting with latent/distributed cases before recoverability is explicit | decode burden overwhelms same-entity review | keep decode-mediated cases out until decoding access and evidence class are explicit |
### Consequences

- Same-entity representation shifts get a lawful place without inventing a new heavy owner.
- Representation-factor and reasoning-medium changes become explicit rather than rhetorical.
- Recoverability and decode dependence become reviewable instead of hidden behind cleaner surfaces.
- The pattern remains safely bounded by `A.6.3`, `A.6.4`, explanation governance, and carrier work.
### Rationale

This pattern is worth splitting out because representation changes are already happening in practice and they are not well served by treating every such case as either mere rewriting or full retargeting. Keeping the family under `A.6.3` preserves owner safety while making representation-factor and recoverability burdens explicit.
### SoTA-Echoing

**SoTA note.** This section does not mint an independent second rule layer. It is a load-bearing alignment surface: the Solution, Conformance Checklist, boundary rules, and Relations of this pattern must match the stance stated here or explicitly justify any divergence.

**Claim 1.** Best-known current architecture-description and model-based practice treats views, representation schemes, and reasoning media as load-bearing rather than as decorative formatting.
**Practice / source / alignment / adoption.** ISO/IEC/IEEE 42010:2022 and current SysML v2 view practice treat viewpoint, view, model kind, and rendering discipline as explicit review objects rather than mere layout choices. This pattern **adopts** explicit representation-scheme review, **adapts** it to same-described-entity viewing under `A.6.3`, and **rejects** the shortcut where a clearer table, diagram, or notation is treated as if it had automatically earned stronger ontology or authority.

**Claim 2.** Best-known contemporary notation-and-reasoning practice treats tables, diagrams, and structured notations as reasoning media with different affordances, not as neutral surface restyling.
**Practice / source / alignment / adoption.** Post-2015 model-based and notation-sensitive review practice treats representational form as something that changes what readers can inspect, compare, or replay. This pattern **adopts** reasoning-medium review, **adapts** it through explicit factor and medium deltas, and **rejects** hidden dependency-theory uplift or silent semantic strengthening by prose-to-diagram or diagram-to-notation moves.

**Claim 3.** Best-known representation-aware AI practice treats latent geometry and decode-mediated structure as evidence-bounded interpretation rather than ontology-by-default.
**Practice / source / alignment / adoption.** Byte Latent Transformer (2024) and Large Concept Model (2024) both reinforce that representation regime matters, but neither licenses silent promotion from geometry, cluster structure, or decoder output to canonical object/relation ontology. This pattern **adopts** representation-aware review, **adapts** it through `RecoverabilityEvidenceClass`, decode-route explicitness, and same-entity source tethering, and **rejects** the popular shortcut where readable decode output is treated as if it were direct givenness.

**Local stance.** The load-bearing SoTA claim for this pattern is narrow: representation regime and reasoning medium are lawful review targets, but geometry, notation, or a decode-mediated result do not become ontology-by-default.
### Relations

- **Builds on:** `A.6.3`, `A.6.2`, `A.7`, `E.10.D2`, `C.2.7`, `E.17.0`, `E.17`, `F.9`, `F.18`
- **Coordinates with:** `ConservativeRetextualization`, `ExplanationFaithfulnessProfile`, `E.17.ID.CR ComparativeReading`, `A.6.4`, `A.15`, `A.20`, `A.21`, explicit decoding-access review
- **Impact radius:** primary touch `A.6.3`; secondary review surfaces `C.2.7`, `E.17.0`, `E.17`, `F.9`, decode-mediated recoverability review; failed same-entity or recoverability conditions exit to `A.6.4`, explanation governance, or later world/gate owners
- **Boundary notes:** textual same-regime rewrites stay with `ConservativeRetextualization`; explanation-facing renderings stay with `ExplanationFaithfulnessProfile`; bounded comparative review units exit to `E.17.ID.CR ComparativeReading`; described-entity changes exit to `A.6.4`; decode-mediated world/gate consequences remain bounded by explicit evidence and downstream handoff.
### A.6.3.RT:End
## U.EpistemicRetargeting — describedEntity‑retargeting morphism

**One‑line summary.** `U.EpistemicRetargeting` is the **describedEntity‑retargetning** species of `U.EffectFreeEpistemicMorphing`: an effect‑free episteme→episteme morphism that **intentionally changes what the episteme is about** (the occupant of `DescribedEntitySlot` in C.2.1) under a declared `KindBridge` and invariant, while remaining conservative with respect to that invariant.

**Placement.** After **A.6.3 `U.EpistemicViewing`**, before **A.6.5 `U.RelationSlotDiscipline`**. 

**Builds on.**
A.6.0 `U.Signature`; A.6.2 `U.EffectFreeEpistemicMorphing`; A.6.3 `U.EpistemicViewing`; A.6.5 `U.RelationSlotDiscipline`; A.7/E.10.D2 (I/D/S discipline, `DescriptionContext`); C.2.1 `U.Episteme — Epistemes and their slot graph`; C.2/C.3 (KD‑CAL/LOG‑CAL, ReferencePlane, Kind‑level reasoning); F.9 (Bridges, `KindBridge`, CL/CL^plane, SquareLaw witnesses).

**Used by.**
E.18 (E.TGA StructuralReinterpretation and other reinterpretation nodes); discipline packs for signal/spectrum transforms, data↔model retargetings, abstraction/refinement under kind‑invariants; KD‑CAL/LOG‑CAL retargeting rules; future species for architecture and governance reinterpretations.

### Problem frame

Many important operations on descriptions **change the object‑of‑talk** while preserving a structural or behavioural invariant:

* **Physical vs functional reinterpretation.**
  An episteme about a physical module (cabinet, rack, device) is re‑interpreted as an episteme about a function‑holon it realises. This is precisely what StructuralReinterpretation nodes in E.TGA attempt to do. 

* **Signal vs spectrum.**
  A time‑domain signal description is re‑targeted to a description of its frequency‑domain spectrum. The underlying invariant (typically energy or inner‑product) is preserved, but the “thing we talk about” changes from `time→value` trajectories to `frequency→amplitude/phase` distributions. 

* **Data vs model.**
  An episteme about raw observations (dataset) is turned into an episteme about a learned or estimated model, keeping an invariant such as likelihood, sufficient statistics, or predictive performance. 

All of these are **Ep→Ep transforms** that:
* do **not** change the Intension (`I`) directly (they operate on descriptions/specifications),
* do **not** merely slice or re‑express an episteme of the same entity (that would be EpistemicViewing, A.6.3),
* but **do change** the **DescribedEntity‑bundle** (`DescribedEntitySlot` and usually `GroundingHolonSlot`) under a formal bridge between kinds.

We need a single, reusable notion of **“epistemic retargeting”** that captures these operations as:
* **effect‑free** at the level of Work/Mechanism (EFEM discipline),
* **describedEntity‑retargeotating** in a controlled way,
* **invariant‑conservative** (no violation of the declared invariant between kinds),
* and **functorial** (retargetings compose cleanly and align with Bridges).
### Problem

Without a dedicated pattern for EpistemicRetargeting:
1. **Retargeting is silently confused with viewing.**
   Structural reinterpretations (e.g., component→function, signal→spectrum, data→model) can be mistakenly treated as “just another view” of the same entity, even though they change `describedEntityRef`. This hides the fact that the **object‑of‑talk** has changed and that a `KindBridge` and invariant are required.

2. **Invariants float untyped.**
   Fourier‑style moves, structural reinterpretations, and abstraction/refinement steps are often justified by “energy is preserved”, “this component realises that function”, or “this model summarises those data” — but these invariants are not connected to the episteme morphism class. Without a dedicated species:

   * invariants live only in text,
   * CL‑penalties and ReferencePlane crossings cannot be tracked systematically (Part F).

3. **Cross‑kind reasoning has no canonical morphism.**
   A general EFEM (A.6.2) can change `describedEntityRef` by setting `describedEntityChangeMode = retarget`, but:

   * nothing states what that means at the level of kinds (`Kind(describedEntityRef(X))` vs `Kind(describedEntityRef(Y))`),
   * nothing connects these moves to `KindBridge` and ReferencePlane policies.

4. **StructuralReinterpretation is ad‑hoc.**
   E.TGA currently hosts StructuralReinterpretation as a special node, but its semantics are much closer to a generic “retargeting under a bridge” pattern than to something specific to graph‑based architectures. Without a core pattern:

   * StructuralReinterpretation risks duplicating retargeting logic,
   * other discipline packs may reinvent their own ad‑hoc re‑targetings.

5. **I/D/S discipline is left underspecified.**
   For descriptions/specifications (`…Description` / `…Spec`), retargeting **changes `DescribedEntityRef` in `DescriptionContext = ⟨DescribedEntityRef, BoundedContextRef, ViewpointRef⟩`** (E.10.D2), but must say what happens to context and viewpoint. Without an explicit pattern, these decisions get scattered across different E‑patterns instead of being governed centrally.
### Forces

* **Changing the object‑of‑talk vs constructing something new.**
  Retargeting should express **“talking about a different but bridge‑related entity”**, not arbitrary construction of a new Intension/episteme. The invariant lives **across** the pair of entities, not inside a single episteme.

* **Invariants may be lossy but must be explicit.**
  A retargeting is often **lossy** (e.g. data→model, signal→spectrum, structural→functional view), but:

  * it must preserve an explicitly declared invariant (energy, behaviour, statistics),
  * any additional strengthening must be modelled as a change of Intension plus new D/S, not as a hidden side‑effect.

* **Bridges and CL‑penalties.**
  Retargeting often crosses:
  * Kind‑planes (different `Kind(U.Entity)`),
  * ReferencePlanes (different observability or abstraction regimes).
    Part F already has `KindBridge`, plane Bridges and CL‑penalties; EpistemicRetargeting must **re‑use** them instead of introducing its own notion of “link”.

* **Functors over `α : Ep → Ref`.**
  In the fibred view of epistemes (C.2 / A.6.2), `α : Ep → Ref` maps each episteme to its described entity. EpistemicViewing preserves α (`α(v) = id`). Retargeting must:
  * change α in a controlled way (`α(r) = b : R₁→R₂` in `Ref`),
  * align with `KindBridge` and plane Bridges used for those base arrows.

* **Slot discipline and modularity.**
  C.2.1 and A.6.5 give epistemes a precise `SlotKind`/`ValueKind`/`RefKind` structure, including `DescribedEntitySlot` and `GroundingHolonSlot`. Retargeting laws must be stated **at the slot level**, not on ad‑hoc “fields”, so they can be reused across E.TGA, MVPK, and discipline packs.
### Solution — U.EpistemicRetargeting as EFEM profile (describedEntityChangeMode = retarget)

#### Informal definition

> **Definition (informal).**
> `U.EpistemicRetargeting` is the **describedEntity‑retargeting species** of `U.EffectFreeEpistemicMorphing`.
> A `U.EpistemicRetargeting r : X→Y`:
>
> * takes an input episteme `X` and produces an output episteme `Y`,
> * **changes** the occupant of `DescribedEntitySlot` (`describedEntityRef(Y) ≠ describedEntityRef(X)`),
> * relates the kinds of the old and new described entities via an explicit `KindBridge` in the appropriate ReferencePlane,
> * preserves a declared **invariant** across the pair of entities (e.g. energy, behaviour, sufficient statistics),
> * is **effect‑free** at the level of Work/Mechanism (EFEM discipline),
> * and composes functorially with other retargetings and viewings.

In C.2.1 terms, `U.EpistemicRetargeting` **re‑indexes** an episteme along a base‑level bridge: it moves the `DescribedEntitySlot` (and often the `<DescribedEntitySlot, GroundingHolonSlot>` bundle) along a `KindBridge`, while re‑expressing `content : U.ClaimGraph` and `referenceScheme` so that the declared invariant continues to hold at the new target.
#### Signature (A.6.0 / A.6.5 alignment)

**Signature header.**
`U.EpistemicRetargeting` is a **Morphism‑kind** under A.6.0, specialised from EFEM:

```
SubjectBlock
  SubjectKind    = U.EpistemicRetargeting
  BaseType       = ⟨X:U.Episteme, Y:U.Episteme⟩      // carrier pair
  Quantification = SliceSet := U.ContextSliceSet;
                   ExtentRule := admissible retargeting morphisms
  ResultKind     = U.Morphism                        // an instance r
```

**Vocabulary (re‑uses A.6.2).**

* **Types.** `U.Episteme`, `U.SubjectRef`, `U.Morphism`, `U.EpistemicRetargeting`.
* **Operators.**

  * `id    : U.Morphism(X→X)`
  * `compose(g,f) : U.Morphism(X→Z)` where `f:X→Y`, `g:Y→Z`
  * `apply(r, x:U.Episteme) : U.Episteme`
  * `dom(r), cod(r) : U.Episteme`
  * `subjectRef(-) : U.SubjectRef`
* **Slot‑level discipline.**
  Domain and codomain epistemes are instances of some `U.Episteme` species (typically `U.EpistemeCard`, `U.EpistemeView`, or `U.EpistemePublication`) whose episteme kinds each provide SlotSpecs (A.6.5) including at least:

  * `DescribedEntitySlot` (ValueKind `U.Entity`, RefKind `U.EntityRef`, usually restricted to an `EoIClass ⊑ U.Entity`),
  * `GroundingHolonSlot?` (ValueKind `U.Holon`, RefKind `U.HolonRef`),
  * `ClaimGraphSlot` (ValueKind `U.ClaimGraph`, by‑value),
  * `ViewpointSlot?` (ValueKind `U.Viewpoint`, RefKind `U.ViewpointRef`),
  * `ReferenceSchemeSlot` (ValueKind `U.ReferenceScheme`, by‑value),
  * and, where C.2.1+ is in use, `RepresentationSchemeSlot`, `ViewSlot` and related slots.

The pattern only requires **SlotSpec compatibility** between domain and codomain kinds (in the sense of A.6.5); they need not be literally the same kind.

**Relation to EFEM and Viewing.**

* Every `U.EpistemicRetargeting` is an **EFEM morphism** with `describedEntityChangeMode = retarget` in the sense of A.6.2/C.2.1.
* It **inherits** EFEM laws P0–P5 and adds retargeting‑specific obligations ER‑0…ER‑6 below.
* `U.EpistemicViewing` (A.6.3) covers the complementary case `describedEntityChangeMode = preserve`, where the object‑of‑talk does not change.
#### Laws (ER‑0…ER‑6, over C.2.1 components)

All laws below are **in addition** to A.6.2’s EFEM laws P0–P5 and SHALL be read directly against C.2.1 components and A.6.5 SlotSpecs. 

**ER‑0 - Species & DescribedEntityChangeMode.**

* Any morphism `r:X→Y` declared as `U.EpistemicRetargeting` **MUST**:
  * be a species of `U.EffectFreeEpistemicMorphing` (A.6.2), and
  * declare `describedEntityChangeMode(r) = retarget`.
* Consequently:
 * the pair `<DescribedEntitySlot, GroundingHolonSlot>` is the **target bundle** for the change (as in C.2.1 §7.3: DescribedEntity‑bundle retargeting),
 * `DescribedEntitySlot` is **write‑enabled** (unlike Viewing) but only under the constraints below,
  * there exist entities `T₁, T₂ : U.Entity` such that:
    * `describedEntityRef(X) = T₁`,
    * `describedEntityRef(Y) = T₂`,
    * `T₁ ≠ T₂` (as Ref/identity), and
    * `Kind(T₁)` and `Kind(T₂)` are related by a `KindBridge` in Part F’s sense (with declared CL^k). 

**ER‑1 - Typed domain/codomain & DescribedEntity‑bundle behaviour.**

For any `r:X→Y` in `U.EpistemicRetargeting`:

1. `X` and `Y` are instances of `U.Episteme` species whose episteme kinds both realise at least the core C.2.1 slots (`DescribedEntitySlot`, `GroundingHolonSlot?`, `ClaimGraphSlot`, `ViewpointSlot?`, `ReferenceSchemeSlot`) and obey A.6.5.

2. At the SlotKind level:

   * `DescribedEntitySlot`:
     * **MUST change** (`describedEntityRef(Y) ≠ describedEntityRef(X)`),
     * the ValueKinds for the slot in the domain and codomain kinds **MUST** be related via an `EoIClass` pair that the `KindBridge` covers (e.g. `PhysicalModule` ↔ `FunctionHolon`, `Signal` ↔ `Spectrum`, `Dataset` ↔ `StatisticalModel`). 

   * `GroundingHolonSlot`, if present:
     * is either preserved exactly (`groundingHolonRef(Y) = groundingHolonRef(X)`), or
     * changed only along a declared holon‑Bridge in the same ReferencePlane (for example, moving from one runtime to another under a deployment bridge) with CL^plane penalties recorded in Part F.

   * `ViewpointSlot`, if present:
     * is either preserved, or
     * changed only within a declared `U.ViewpointBundle` (E.17.1/E.17.2), with the corresponding `CorrespondenceModel` explaining how the invariant is maintained under the new viewpoint.

1. For any episteme that is a `…Description`/`…Spec` (E.10.D2), `subjectRef` decodes to `DescriptionContext = ⟨DescribedEntityRef, BoundedContextRef, ViewpointRef⟩`. Under EpistemicRetargeting:
   * `DescribedEntityRef` **MUST** change from `T₁` to `T₂` as in ER‑0,
   * `BoundedContextRef` is:
     * either preserved, or
     * changed along an explicit Context‑Bridge (E.10.D1, Part F),
   * `ViewpointRef` is treated as in (2) above (preserved or mapped within a bundle), and any resulting change in admissible claims is governed by ER‑2.

The pair `<DescribedEntitySlot, GroundingHolonSlot>` is treated as a **target bundle**: many practical retargetings work at the level of this bundle rather than DescribedEntity alone, especially in E.TGA. 

**ER‑2 - Invariant‑based conservativity (lossy but lawful).**

Let `X` and `Y = apply(r,X)` with:
* `describedEntityRef(X) = T₁`, `describedEntityRef(Y) = T₂`,
* `KindBridge(T₁,T₂)` and associated invariant `Inv` declared for this species (e.g. energy, behavioural relation, likelihood),
* `content_X`, `referenceScheme_X`,
* `content_Y`, `referenceScheme_Y`,
* `groundingHolonRef_X`, `groundingHolonRef_Y`.

Then:
1. There MUST exist a KD‑CAL/LOG‑CAL expression of `Inv` such that:
   * all claims about `Inv` that can be derived by reading `content_Y` through `referenceScheme_Y` relative to `<T₂, groundingHolonRef_Y>`
     **are entailed by**
     claims about `Inv` derivable from `content_X` through `referenceScheme_X` relative to `<T₁, groundingHolonRef_X>`. 

2. Retargeting, as an EFEM instance, **may**:
   * discard information not needed to maintain `Inv` (lossy summarisation),
   * change representation schemes (e.g. time vs frequency domain),
   * move to different abstraction levels or ReferencePlanes (with Bridges and CL penalties declared),
   but **MUST NOT** violate the declared invariant.

3. Any intended change that **strengthens** commitments about `Inv` beyond what is derivable from `X` **is not a valid EpistemicRetargeting**. It must be modelled as:
   * a change of Intension (new D/S pair under A.7/E.10.D2), or
   * a chain of retargetings and Intension updates explicitly recorded in KD‑CAL/LOG‑CAL.

**ER‑3 - Functoriality, α‑reindexing & SquareLaw witnesses.**

EpistemicRetargeting **inherits EFEM functoriality** and specialises it to the retargeting case:

1. At the `Ep` level:
   * `apply(id, X) = X` (no retargeting),
   * `apply(r₂ ∘ r₁, X) = apply(r₂, apply(r₁, X))` whenever domains/codomains match,
   * the composite `r₂∘r₁` has `describedEntityRef(X) = T₁` and `describedEntityRef(cod(r₂∘r₁)) = T₃`, with a composed `KindBridge(T₁,T₃)` whenever the Bridges of `r₁` and `r₂` compose.

2. At the `Ref` level, under `α : Ep → Ref`:
   * each retargeting `r` induces a base arrow `α(r) : R₁→R₂` in `Ref`, compatible with the `KindBridge` used in ER‑0,
   * the square formed by:
     * `X→Y` in `Ep` (retargeting),
     * `α(X)→α(Y)` in `Ref` (base retargeting),
     * any measurement or evaluation morphisms on either side,
       **MUST** commute **up to a declared SquareLaw‑retargeting witness** (Part F / E.TGA), documenting that evaluating then retargeting vs retargeting then evaluating yields equivalent results (modulo CL‑penalties).

2. When retargetings use CorrespondenceModels between epistemes (e.g. aligning detailed hardware layouts with function networks), they MUST:
   * reference the CorrespondenceModel explicitly,
   * publish witness epistemes that certify commutativity of key squares, analogous to EV‑4 but now across **different described entities.**

**ER‑4 - Idempotency & determinism on fixed Bridge/invariant.**

For any `r:X→Y` in `U.EpistemicRetargeting`, with fixed:
* `KindBridge(T₁,T₂)` and ReferencePlane policies,
* invariant `Inv`,
* configuration (ContextSlice, representation families, CorrespondenceModels),

the following MUST hold:

* **Idempotency.**
  Applying `r` twice does not further change the described entity or invariant‑relevant content:
  * `apply(r, apply(r, X))` is **isomorphic** (in the EFEM sense) to `apply(r, X)`,
  * `describedEntityRef` is already `T₂` after the first application,
  * `content` and `referenceScheme` differ at most by declared structural equivalence (e.g. normal forms at the new target).

* **Determinism.**
  For fixed input `X` and fixed Bridge/invariant configuration, the result is uniquely determined modulo declared equivalence. Any source of non‑determinism (randomness, time, external service state) MUST either:
  * be made explicit as part of `content`/`meta` of `X`, or
  * be moved to a `U.Mechanism` outside the retargeting morphism.

**ER‑5 - Applicability, EoI‑pairs & CL‑discipline.**

Each species of `U.EpistemicRetargeting` MUST declare an **Applicability profile** (A.6.0) that includes:

1. **EoI‑pairs.**
   Admissible pairs of `EoIClass`es (ValueKinds of `DescribedEntitySlot` for domain and codomain), for example:
   * `(PhysicalModule, FunctionHolon)`,
   * `(Signal, Spectrum)`,
   * `(Dataset, StatisticalModel)`.

   For each such pair, the pattern MUST reference the appropriate `KindBridge` species in Part F.

2. **Grounding constraints.**
   Permitted classes of `groundingHolonRef` and ReferencePlanes, including whether:
   * grounding must stay within the same holon,
   * or may move along specific holon Bridges with CL^plane penalties.

3. **Viewpoint/context constraints.**
   Whether retargeting is allowed for all viewpoints or only for specific `U.ViewpointBundle`s (TEVB etc.), and any requirements on `BoundedContextRef`.

4. **CL‑discipline.**
   Minimum CL^k and CL^plane required for the Bridges used, aligning with F.9 and E.TGA’s StructuralReinterpretation rules.

Any attempt to apply a retargeting outside this Applicability profile is **ill‑typed**.

**ER‑6 - Compatibility with Viewing and Mechanisms.**

1. **Separation from Viewing.**

   * Any morphism that **does not change** `describedEntityRef` (and keeps `DescribedEntityChangeMode = preserve`) belongs to A.6.3 `U.EpistemicViewing`, not to `U.EpistemicRetargeting`.
   * Any morphism that **does** change `describedEntityRef` **MUST NOT** be declared as `U.EpistemicViewing`; it is either:
     * a `U.EpistemicRetargeting`, or
     * a more general pattern that composes several retargetings and Intension changes.

   In any composite `V∘r` or `r∘V`, describedEntity changes are localised to retargeting steps; Viewing steps are always `describedEntityChangeMode = preserve`.

2. **Separation from Mechanisms.**

   * Retargeting MAY depend on artefacts produced by `U.Mechanism` (e.g., computing a Fourier transform, fitting a model), but those are separate Work/Mechanism steps.
   * `U.EpistemicRetargeting` itself remains **effect‑free**: it rearranges epistemes, slots and ClaimGraphs, but does not perform measurements or actuation.
### Archetypal grounding (Tell–Show–Show)

**Tell.**
EpistemicRetargeting captures **“same invariant, different described entity”** moves:

* we stop talking about “this cabinet” and start talking about “the routing function it realises”;
* we stop talking about “this signal over time” and start talking about “its spectrum over frequency”;
* we stop talking about “this dataset” and start talking about “a model class with parameters θ learned from it”.

In each case, what remains stable is an **invariant** (behaviour, energy, likelihood), not the described entity itself.

**Show 1 — StructuralReinterpretation in E.TGA.** 
* `X` describes a physical module holon `S_phys`.
* `Y` describes a function holon `S_func`.
* A `KindBridge(S_phys, S_func)` expresses “this module realises that function”.
* A StructuralReinterpretation node in E.TGA is an instance of `U.EpistemicRetargeting` whose invariant is the behaviour relation between `S_phys` and `S_func`.

**Show 2 — Signal↔Spectrum.**
* `X` describes a time‑domain signal `s(t)`; `DescribedEntityRef(X) = S_time`.
* `Y` describes its spectrum `S(ω)`; `DescribedEntityRef(Y) = S_freq`.
* `KindBridge(S_time, S_freq)` encodes Fourier duality in the relevant ReferencePlane.
* The invariant is energy (or inner product), expressed as a KD‑CAL statement; EpistemicRetargeting ensures that energy‑related claims in `Y` are entailed by `X`.

**Show 3 — Data→Model.**
* `X` describes a dataset `D` (observations); `DescribedEntityRef(X) = S_data`.
* `Y` describes a model `M` (e.g. a parametric family with learned parameters); `DescribedEntityRef(Y) = S_model`.
* `KindBridge(S_data, S_model)` encodes the intended data→model relation (e.g. MLE, Bayesian posterior).
* The invariant is likelihood or predictive performance; the retargeting laws ensure `Y` does not claim more about this invariant than is supported by `X`.
### Consequences

* **Clear separation of Viewing vs Retargeting.**
  A.6.3 and A.6.4 now jointly distinguish:
  * **views**: same `DescribedEntityRef`, possible representation/viewpoint changes;
  * **retargetings**: different `DescribedEntityRef` under `KindBridge` and invariants.

* **Canonical home for StructuralReinterpretation.**
  E.TGA StructuralReinterpretation becomes a **species of `U.EpistemicRetargeting`**, not an ad‑hoc special node. This reduces duplication and clarifies how CL penalties and Bridges are used.

* **Invariants become first‑class.**
  Retargeting makes invariants explicit and type‑checked: every such morphism must state what it preserves and how that is expressed in KD‑CAL/LOG‑CAL.

* **Safer cross‑plane reasoning.**
  ReferencePlane crossings and kind‑level moves are handled via existing Bridges (Part F), with CL^plane/CL^k penalties and SquareLaw witnesses, instead of hidden in implementation details.

* **Better integration with I/D/S.**
  For `…Description`/`…Spec` epistemes, retargeting is the only place where `DescribedEntityRef` in `DescriptionContext` is allowed to change; all other I/D/S‑level operations (Describe/Specify, Viewing) keep it fixed.
### Rationale & SoTA‑echoing (informative)

* **Fibrations and base‑change (displayed categories, 2017+).**
  With epistemes forming a category `Ep` fibred over `Ref` via `α : Ep → Ref` (C.2 / A.6.2), EpistemicViewing corresponds to **vertical morphisms** (`α(v) = id`), while EpistemicRetargeting corresponds to **reindexing along base arrows** (`α(r) = b : R₁→R₂`). This lines up with base‑change and transport along fibrations in category theory.

* **Structured cospans and reinterpretation.**
  Modern work on structured cospans and open systems uses cospans and their morphisms to move between different presentations of a system while preserving a notion of interface/behaviour. Retargeting plays a similar role: it moves from one entity kind to another while preserving a declared invariant.

* **Fourier‑style dualities.**
  In signal processing and physics, Fourier and related transforms are often treated as isometries between function spaces, preserving energy while changing the domain of discourse. `U.EpistemicRetargeting` abstracts this pattern: the invariant is codified in KD‑CAL/LOG‑CAL; the morphism explicitly changes the described entity along a `KindBridge`.

* **Data/model duality in ML.**
  Contemporary ML workflows cycle between data and models; invariants such as likelihood, risk, and calibration matter more than raw equality of ClaimGraphs. Retargeting gives a structured way to talk about data→model (and, potentially, model→data) moves as episteme morphisms, rather than untyped “training” steps.

* **Consistency management and abstraction.**
  In model‑driven and bidirectional transformation literature, abstraction and refinement transfers information between models with different subject domains. Treating these as retargetings with explicit Bridges and invariants makes their assumptions amenable to CL accounting and KD‑CAL reasoning, instead of hiding them in tooling.
### Conformance checklist (normative)

**CC‑A.6.4‑1 - EFEM species and DescribedEntityChangeMode.**
Any pattern that claims to define `U.EpistemicRetargeting` **SHALL**:

* declare itself a species of `U.EffectFreeEpistemicMorphing` (A.6.2),
* fix `describedEntityChangeMode = retarget`,
* and state its Applicability profile (EoI‑pairs, contexts, viewpoints, representation schemes, invariants).

**CC‑A.6.4‑2 - Slot‑level read/write discipline.**
For each species of EpistemicRetargeting, authors **MUST**:
* list the SlotKinds it **reads** (at least `DescribedEntitySlot`, `GroundingHolonSlot`, `ClaimGraphSlot`, `ViewpointSlot`, `ReferenceSchemeSlot`, plus any C.2.1+ slots used),
* list the SlotKinds it **writes** (at least `DescribedEntitySlot`, typically also `ClaimGraphSlot`, `ReferenceSchemeSlot`, and `meta`),
* state explicitly how `GroundingHolonSlot` and `ViewpointSlot` behave (preserved vs bridged),
* reference A.6.5 to show that SlotSpecs remain consistent across domain/codomain kinds.

**CC‑A.6.4‑3 - Bridge & invariant declaration.**
Each species SHALL:
* identify the relevant `KindBridge` species (and, where applicable, plane Bridges),
* declare the invariant(s) it preserves (in KD‑CAL/LOG‑CAL terms),
* sketch how invariant preservation is checked or approximated (e.g. through proofs, tests, or statistical guarantees).

**CC‑A.6.4‑4 - SquareLaw‑retargeting witnesses.**
For retargetings that interact with E.TGA or other graph‑level transductions, authors **MUST**:
* describe the commutative squares (or more general diagrams) that express “evaluate then retarget = retarget then evaluate” up to equivalence,
* identify the corresponding SquareLaw‑retargeting witnesses and how they are represented as epistemes.

**CC‑A.6.4‑5 - D/S‑context behaviour.**
For retargetings over `…Description`/`…Spec` epistemes:
* laws MUST be phrased in terms of `DescriptionContext = ⟨DescribedEntityRef, BoundedContextRef, ViewpointRef⟩`,
* `DescribedEntityRef` MUST change in a way consistent with the declared `KindBridge`,
* `BoundedContextRef` MUST either be preserved or changed only via explicit Context‑Bridges,
* `ViewpointRef` MUST either be preserved or change within a declared `U.ViewpointBundle`.

**CC‑A.6.4‑6 - Separation from Viewing and Mechanisms.**
* Any species that leaves `describedEntityRef` unchanged is **not** a conformant EpistemicRetargeting; it belongs to `U.EpistemicViewing` (A.6.3) or another EFEM species.
* Any species that performs measurements, actuation, or other side‑effects MUST be declared as `U.Mechanism`/`U.WorkEnactment` and cannot be an EpistemicRetargeting.
### Mini‑checklist (for authors)

When you think you need “retargeting” in FPF, ask:

1. **Does `describedEntityRef` change?**
   If no, this is Viewing (A.6.3), not Retargeting.

2. **Is there a `KindBridge` between old and new entities?**
   If not, you probably need to introduce one in Part F or rethink the Intension, not fudge a retargeting.

3. **What invariant are you preserving?**
   Write it down in KD‑CAL/LOG‑CAL terms. If you cannot, retargeting is underspecified.

4. **How do `GroundingHolonRef`, context and viewpoint behave?**
   Explicitly state whether they stay the same, move along Bridges, or are out of scope.

5. **Can the operation be factored as Mechanism + pure retargeting?**
   If the step needs computation (FFT, model fitting), separate the Mechanism from the EpistemicRetargeting.
### Relations

* **Specialises / is specialised by.**
  * Specialises A.6.2 `U.EffectFreeEpistemicMorphing` as the `describedEntityChangeMode = retarget` profile.
  * Complements A.6.3 `U.EpistemicViewing` (describedEntity‑preserving EFEM) as the “retargeting” counterpart.

* **Constrained by.**
  * A.6.5 `U.RelationSlotDiscipline` for SlotKind/ValueKind/RefKind discipline.
  * C.2.1 `U.EpistemeSlotGraph` for episteme components and `DescribedEntitySlot`/`GroundingHolonSlot`.
  * E.10.D2 (I/D/S discipline; `DescriptionContext`).
  * Part F (Bridges, `KindBridge`, ReferencePlane crossings, CL/CL^plane).
  * E.10 (LEX‑BUNDLE naming rules, especially on `…Slot`/`…Ref` and ban on Subject/Object in episteme tech names).

* **Consumed by.**
  * E.18 (E.TGA StructuralReinterpretation and other cross‑kind architecture transformations).
  * E.17.0/E.17 (for cases where publication needs to move between different entities‑of‑interest but preserve invariants).
  * KD‑CAL/LOG‑CAL rules that reason about retargeting and invariant preservation across different described entities.
### A.6.4:End
## A.6.P — U.RelationalPrecisionRestorationSuite — Relational Precision Restoration (RPR) — Kind‑Explicit Qualified Relation Discipline

> **Type:** Architectural (A)
> **Status:** Stable
> **Normativity:** Normative (Core)

**Plain-name.** Relational precision restoration suite.

**Intent.** Provide a family-level, reusable discipline for repairing a recurring defect in FPF texts: **under‑specified relational language** (often phrased as a seemingly binary verb) that actually hides **(i)** higher arity (missing participant positions), **(ii)** multiple semantic change classes, **(iii)** viewpoint/view asymmetry, **(iv)** boundary obligations (laws vs admissibility vs deontics vs evidence/work), and **(v)** endpoint referential compression (pronominal/metonymic stand‑ins and over‑broad kinds).
RPR patterns turn “umbrella relations” into **kind‑explicit, slot‑explicit, qualified relation records** with an explicit **change-class lexicon** and **lexical guardrails**, while respecting the **A.6 Signature Stack** and **A.6.B Boundary Norm Square** separation. 

**Placement.** Part A → cluster **A.6 Signature Stack & Boundary Discipline** → header pattern for the **relation‑precision restoration family** (A.6.5, A.6.6, A.6.8, A.6.9, A.6.H, and future A.6.x patterns). 

**Builds on.**

* **A.6** (stack layering + boundary discipline requirements). 
* **A.6.B `U.BoundaryNormSquare`** (L/A/D/E routing; claim atomicity; cross‑quadrant references). 
* **A.6.S `U.SignatureEngineeringPair`** (TargetSignature vs ConstructorSignature; canonical constructor verb mapping; effect‑free constructor ops). 
* **A.6.0 `U.Signature`** (SlotSpec requirement for argument positions). 
* **A.6.5 `U.RelationSlotDiscipline`** (SlotKind/ValueKind/RefKind stratification + canonical slot verbs; `bind` reserved for name binding). 
* **E.8** (pattern authoring discipline; Tell–Show–Show; SoTA echoing hygiene).
* **F.18** (promise vs utterance vs commitment; avoids “interface‑as‑promiser” category errors).
* **E.10** (LEX‑BUNDLE discipline; I/D/S vs Surface; L‑SURF token discipline; reserved primitives; Tech↔Plain pairing). *(Referenced conceptually; no extra authoring apparatus implied.)*

**Coordinates with.**

* **A.2.4 `U.EvidenceRole`** (witness semantics: role/timespan/freshness metadata for decision‑relevant witness sets).
* **A.2.6 scope + `Γ_time` discipline** (avoid implicit “current/latest”; make time selectors explicit when time matters). 
* **A.7 Strict Distinction** (Object≠Description≠Carrier; avoid treating evidence/logs as properties of prose). 
* **A.6.2–A.6.4** (effect‑free episteme morphisms, epistemic viewing/retargeting as disciplined slot writes). 
* **A.10 evidence discipline** (witnesses are carrier‑anchored; freshness is adjudicated in work/evidence lanes).
* **C.2.1 `U.EpistemeSlotGraph`** (slot read/write profiles for constructor operators, when declared).
* **C.3.3 `U.KindBridge` + `CL^k` discipline** (repairing endpoint kind mismatches; kind-level congruence + loss notes).
* **E.17 MVPK / multi‑view publication** (faces are views; “no new semantics”; viewpoint accountability).
* **E.19 pattern quality gates** (review/refresh discipline for guardrails and conformance lists).
* **F.17 `UTS`** (when ambiguity clusters become recurring vocabulary: publish stable `RelationKind` tokens and facet head phrases as UTS/LEX‑governed term assets, so rewrites don’t live only inside A‑patterns).
* **F.9 Bridges + CL** for cross‑Context/plane reuse (no silent sameness). 
* **C.2.2a / A.16 / A.16.1 / A.16.2 / B.4.1 / B.5.2.0** for the language-state seam: language-state chart positions, lawful moves, pre-threshold cue preservation, route publication, lawful retreat/reopen, and prompt-shaped continuations that are not yet stable relation publication; use **A.16.0** only when lineage, branch, loss, or handoff history itself must be published as an explicit trajectory account.
* **C.2.LS / C.2.4 / C.2.5 / C.2.6 / C.2.7** for language-state facet ownership: articulation explicitness, closure degree, language-state anchoring mode, and the language-state representation-factor bundle may be cited by RPR patterns but are not re-owned here.

**Specialisations already in Core.**
These retained specialisations are current because they each carry one stable reusable burden family. Their mnemonic heads remain lawful entry points, but generic `A.6.P` does **not** treat token recurrence alone as sufficient to mint one new specialisation per overloaded trigger word.

* **A.6.5**: RPR for n‑ary relations and slot discipline (archetype: “putting something into a place”; explicit SlotKinds + ValueKind/RefKind + slot‑operation lexicon). 
* **A.6.6**: RPR for “relative‑to / basedness” claims (explicit `baseRelation` token + scoped, witnessed base declarations + base‑change lexicon; lexical red‑flags for `anchor*`). 
* **A.6.8 (RPR‑SERV)**: RPR for the “service” cluster polysemy (facet‑explicit `serviceSituation` lens; canonical rewrites for `service`/`server`/`service provider`; routing tests for clause vs access point vs provider commitment vs work+evidence).
* **A.6.9 (RPR‑XCTX)**: RPR for cross‑Context “same / equivalent / align / map” talk (explicit Bridges with direction, endpoint refinement, substitution licence, CL and loss notes; blocks silent inversion and “alignment” umbrella verbs).
* **A.6.H (RPR‑WHOLE)**: RPR for “whole/part/integrity/complete” polysemy (WHOL triggers + Boundary–Parthood–Fold–Order/Time–Completeness lens; routes turnkey/end‑to‑end into A.15 coverage; includes artefact↔referent↔work level test).

### A.6.P:0 — TERM/LEX token guards (local-first)

This pattern reserves the following tokens on Tech (normative) surfaces:

* **RPR** — *Relational Precision Restoration* (the suite recipe; not a new `U.Type`).
* **RelationKind** — a Context-local vocabulary token (signature-level) that fixes polarity and SlotSpecs for participant/qualifier positions. It is a *registry entry/token*, not a relation instance.
* **QualifiedRelationRecord** — the slot-explicit relation instance record kind (Context-local episteme/record kind); instances carry a `relationKind` token reference plus explicit participant/qualifier slots.

**Mint-or-reuse note (recipe-level).** This pattern mints the suite label **RPR**, the role name **RelationKind**, and the generic shape name **QualifiedRelationRecord** as local-first terms for this family. It reuses existing FPF terms (`U.Signature`, SlotKind/ValueKind/RefKind, Bridges/CL, `U.Scope`, `Γ_time`, `U.View`/`U.Viewpoint`, evidence pins/carriers) without changing their meanings.

**Definitions (recipe-level; non-deontic).**

* **RelationKind token** — a declared vocabulary element (signature-level) whose *public surface* fixes polarity and SlotSpecs for participant/qualifier positions, and that is referenced by routed claims (L/A/D/E) that govern admissibility, duties/commitments, and evidence/work.
* **QualifiedRelationRecord** — a Context-local episteme/record kind whose `relationKind` field points (by id/ref) to a RelationKind token and whose instance records make all contract-required participant/qualifier slots explicit.

Rename-guards (common collisions):

* **contract** — Plain shorthand for “published boundary interface description”; a conforming text MUST NOT treat the term *contract* as itself establishing a promise/obligation. Promises, duties, and gates route via A.6.B.
* **bind/binding** — reserved for **name binding** (Identifier → SlotKind/slot-instance) and MUST NOT be used as a synonym for relation instance edits.
* **same/synced/linked/connected/anchored/grounded** — treated as umbrella tokens; allowed as Plain gloss only when immediately mapped to an explicit RelationKind token (Tech) via rewrite rules.
### A.6.P:1 — Problem frame

FPF repeatedly encounters a predictable precision failure mode:

Authors describe a situation with an apparently simple relational phrase:

* “X **is the same as** Y”, “X **is linked to** Y”, “X **is synced with** Y”
* “X **depends on** Y”, “X **is grounded/anchored** in Y”
* “X **maps to** Y”, “X **aligns with** Y”, “X **is connected to** Y”

…but the intended meaning is actually:

1. **Hidden multiarity.** The claim requires additional participant positions (scope, time selector, witness carriers, policy, direction/inverse, reference scheme, representation scheme, mediator artefact).
2. **Kind elision.** The umbrella verb stands in for an unstated family of relation kinds (different invariants; different admissibility; different evidence burdens).
3. **Viewpoint fights.** Different stakeholders describe “the same” relation from incompatible viewpoints, creating polarity flips and silent re‑typing.
4. **Unnameable change semantics.** Authors say “update/bind/anchor/sync”, but mean distinct semantic change classes (retarget vs revise vs rescope vs retime vs witness refresh).
5. **Regression via prose.** Even after ontology repairs, umbrella language re‑enters and collapses distinctions unless structural precision is coupled to lexical guardrails.
6. **Pronominal/metonymic endpoints.** Even when the relation verb is fixed, endpoints may be referred to via pronoun‑like or umbrella tokens (or metonymic pointers), so the relation cannot be typed or audited until endpoint facets/kinds are restored from context.

A.6.P defines a **repeatable precision restoration recipe** that makes this defect repairable and reusable across future A.6.x patterns.
### A.6.P:2 — Problem

How can FPF represent and evolve “relations in prose” that are structurally richer than they appear, so that:

* the **relation kind** is explicit and reviewable,
* missing positions can be made explicit **without semantic drift**,
* changes to the relation can be narrated with **stable semantic change classes**,
* multi‑view publication can exist **without creating multiple incompatible contracts**, and
* cross‑Context/plane reuse cannot silently assume “sameness by label”?
### A.6.P:3 — Forces

| Force                                 | Tension                                                                                                |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Universality vs precision             | The repair must be reusable across domains, but must not hide the distinctions it is meant to recover. |
| Prose convenience vs contract clarity | Humans want short verbs; engineering/assurance needs declared kinds, slots, and invariants.            |
| Kernel minimality vs safety           | Few primitives are good; umbrella relations are cross‑Context safety hazards.                          |
| Multi‑view reality vs coherence       | Viewpoints must be expressible without silent polarity flips or re‑typing.                             |
| Evolution vs auditability             | Relations change; edits must not rewrite meaning invisibly.                                            |
| Stack discipline                      | Laws, admissibility, deontics, and evidence/work must not be mixed (A.6 + A.6.B).                      |
### A.6.P:4 — Solution — The RPR recipe (Lens → Slots → Change Lexicon → Guardrails), aligned to A.6 / A.6.B / A.6.S

A.6.P defines a **suite recipe**. A pattern is a **RPR‑pattern** (member of A.6.P) iff it provides the ingredients below.

#### A.6.P:4.0 — Trigger rule (when A.6.P applies)

A relation mention or relation-bearing phrase is in-scope for A.6.P when **any** of the following holds:

* the predicate/verb phrase is **lexically overloaded** (umbrella tokens such as “same/sync/link/connect/anchor/ground/align/map/depends”), or
* one or more endpoints/qualifiers are expressed via **pronominal / deictic / metonymic stand-ins** or **over-broad kind tokens** (e.g., “it/this/that”, “the service”, “the system”, “at the table”), such that multiple referents/facets remain plausible, or
* a **generic or over-broad head noun** carries its load only through a qualifier, modifier, or surrounding phrase (e.g., “comparative note”, “safe guidance”, “interactive view”, “reliable output”), so the object kind is still ambiguous even though the qualifier sounds informative, or
* the statement implicitly relies on **scope / Γ_time / viewpoint/view / schemes** (reference, representation), or
* the relation is used for **assurance / admissibility / gating / publication** decisions, or
* the relation crosses **Contexts or planes** (requires Bridges + CL; no silent equivalence), or
* different stakeholders interpret endpoints differently (multi-view asymmetry and polarity fights).

**Repair order note.** When a load-bearing phrase is triggered because its **head noun** is too generic, first restore what kind of thing the head actually names (artifact, reading, process, lane, authority use, or another host-local kind) using local object-of-talk discipline (`E.10`, `A.7`, and nearby host law). A narrowing qualifier such as `comparative`, `safe`, `interactive`, or `reliable` may narrow the phrase, but it does **not** by itself restore the head kind. Then apply A.6.P to restore the remaining relation or comparison burden. Mixed-axis checks come **after** those two repairs, not before them.

**Adoption test (review heuristic).** If a reviewer can reasonably ask any of: “Which kind is this?”, “What exactly does this span refer to (which facet/kind, and in which lane: Object vs Description vs Carrier)?”, “What relation or comparison burden is hidden in this qualifier?”, “What else participates?”, “Under what scope/time/view?”, “What changed?”, or “What makes this admissible?”, then authors SHOULD treat the mention as in-scope and rewrite it into explicit kind+slots form before using it for cross-Context reuse or decision/publication claims.

**Precision/relaxation note.** A.6.P is not a blanket demand that every sentence stay maximally explicit forever. It is a trigger-based repair path for **load-bearing** prose. In design-time FPF texts and in run-time texts being prepared for admissible publication, review, gating, or reuse, the repair should be performed before any later didactic plain-language softening or lawful coarsening. Later relaxation is allowed only when the more precise upstream reading remains recoverable and authoritative.

**Generic trigger-word governance rule (normative).** Overloaded words are diagnostic entry points, not default future owners. Generic `A.6.P` therefore requires this order: restore head kind first, restore the remaining relation/comparison burden second, and only then judge whether one reusable burden family is strong enough to justify a new specialization. A new `A.6.P` specialization or broader trigger-word owner is owed only when one stable recurring burden, one reusable lens or rewrite kit, and one `F.18 -> A.6.P`-surviving head already exist by value across more than one worked case. Otherwise token-specific retained knowledge stays with an existing lawful specialization or in one cluster-local / owner-local note rather than expanding generic `A.6.P` into a token bucket store.
#### Language-state entry note

RPR entry normally presupposes enough `C.2.4` articulation explicitness that at least one relation-like skeleton can be named explicitly, and often enough `C.2.5` closure that one candidate reading is worth publishing as a relation record rather than remaining mere cue pressure.

If the material is still best treated as a cue pack, routed cue, or unresolved route pressure, keep it in `A.16.1` / `B.4.1` rather than forcing relation publication prematurely. If the strongest lawful continuation is still an open explanatory question, route it through `B.5.2.0`. If a previously published relation must be reopened or backed off because the articulation/closure support collapses, route that retreat through `A.16.2` rather than silently weakening the published relation in place.
#### A.6.P:4.0a — Operational repair sequence (how repairs actually proceed)

The suite is presented as **lens → slots → change lexicon → guardrails** because the *stable abstraction* is what keeps repairs reusable. In actual editing, repairs often start from a **triggering surface token** and proceed through a context-reconstruction step.

Operationally, authors SHOULD follow this repair sequence when applying an RPR repair:

0. **Restore the head kind if needed.** If the triggering phrase uses a generic or over-broad head noun (`note`, `view`, `guidance`, `output`, `artifact`, and similar placeholders), first state what kind of thing it actually is in local host terms (publication artifact, reading, process, authority use, and so on). Do not let a qualifier do this job by implication alone.
1. **Trigger on surface form.** Detect umbrella relation predicates, pronominal/umbrella endpoint tokens or metonymic pointers, and generic-head-plus-load-bearing-qualifier combinations (including domain clusters such as **service** in A.6.8 and cross-Context “same/equivalent/align/map” in A.6.9).
2. **Reconstruct the situation ontology from local context.** Enumerate candidate referents/facets for endpoints *(including A.7 lane: Object vs Description vs Carrier when it matters)*, candidate head kinds where the phrase is noun-led, and candidate `RelationKind` tokens or comparison burdens for the overloaded predicate/qualifier, plus implied participants (scope/time/view/scheme/mediator artefacts). Capture the result as a **Candidate-Set Note** (A.6.P:4.0b) so review has a checkable artifact: candidates → selected facet/kind → why. When metonymy is plausible, include both the *literal* and the *intended* candidates.
3. **Choose a stable lens** that can represent the reconstructed arity/polarity without ad-hoc role invention.
4. **Refine the ontology under the lens.** Turn implied roles into SlotSpecs; repair endpoint kind mismatches explicitly (narrowing / KindBridge / retargetParticipant); separate object kind, relation burden, and qualifier burden; make qualifiers explicit as slots or routed conditions.
5. **Emit canonical rewrites + routing hooks.** Produce Tech-form rewrites (`relationKind(…)` / arrow form) and state the A.6.B hooks: which parts are L vs A vs D vs E, and which witnesses/commitments/work claims are now demanded.
6. **Only then allow later relaxation.** If a Plain, didactic, or coarsened restatement is still wanted, derive it from the repaired form and keep the repaired form as the authoritative source for any stronger reading.

**Decision/publication fail-closed (normative).** If an in-scope mention is used to justify an admissibility gate, publication claim, or cross-Context reuse, authors MUST resolve the candidate sets to a selected `RelationKind`, selected endpoint facets/kinds, and any required head-kind reconstruction and emit an explicit rewrite. If that cannot be done from available context and witnesses, keep the statement as Plain/informative gloss (or split into multiple explicit alternatives) and do not treat it as admissible input for the gate.

**Informative: referential compression spectrum.** Many triggers live on a spectrum from high to low referential precision:
pronouns/deictics → overloaded polysemes → coarse domain kinds → facet head phrases → precise domain terms.
Metonymy often shifts the denotation (e.g., a place phrase standing in for an object or a role). The repair sequence explicitly treats this as a **candidate-set** problem, not as “the dictionary meaning”.

**Metonymy micro-example (informative; endpoint-side trigger beyond anaphora).**

Draft: “Alice is **at the table**.”

`at the table` → candidates `{place, meeting, artifact, role}` → choose explicitly → rewrite into endpoint-refs + qualifiers:

```
CandidateSetNote(triggerSpan="at the table", role=endpointFacet(p₂)):
- candidates: {PlaceRef(Table#7), MeetingRef(NegotiationSession#3), ArtifactRef(AgendaDoc#12), RoleRef(DecisionMakerSeat#2)}
- selected:   MeetingRef(NegotiationSession#3) + RoleRef(DecisionMakerSeat#2)  // metonymy: place → meeting/role
- consequence: require explicit `meetingRef`, `roleRef`, `Γ_time`, `witnesses` (and route decision/admissibility separately via A.6.B)

participatesInMeetingUnder(
  personRef  = PersonRef(Alice),
  meetingRef = MeetingRef(NegotiationSession#3),
  roleRef    = RoleRef(DecisionMakerSeat#2),
  Γ_time     = snapshot(t),
  witnesses  = {attendanceLogPins}
)
```

If the literal location reading is intended, select `PlaceRef(Table#7)` and rewrite as `locatedAt(…)` with an explicit `Γ_time` qualifier.

This step is intentionally **not lexicon-only**. The lexical rewrite is the *output* of an ontology- and lens-constrained repair, not the starting point. If you cannot state the candidate referents/facets, the selected head kind where needed, and the selected `RelationKind` token, the repair is incomplete.
#### A.6.P:4.0b — Candidate‑Set Note (informative; review artifact)

When endpoint identity (pronoun/deixis/metonymy/coarse kind) or relation-kind selection is ambiguous, reviews can collapse into “lexicon debates”. A.6.P treats this as an ontology reconstruction step with an explicit, checkable intermediate artifact.

**Candidate‑Set Note template (informative).**

> **Collision note.** This “Candidate‑Set Note” is **not** the F.18 naming-process *candidate set* (NQD-front). It is a local disambiguation artifact for endpoint referents/facets and RelationKind selection during RPR repairs.

For each ambiguous role (relation kind, endpoint facet/kind, qualifier, mediator), record:

* **Trigger span:** the exact surface token(s) in the draft (copy/paste).
* **Role being disambiguated:** `headKind` | `relationKind` | `endpointFacet(pᵢ)` | `endpointRef(pᵢ)` | `qualifier(qⱼ)` | `mediator`.
* **Lane (A.7) (when endpoint‑side):** `Object` | `Description` | `Carrier` (state explicitly when live contenders span lanes; lane‑mixing is a common source of “contract” category errors).
* **Candidate set:** a short list of plausible **head kinds**, **kinds/facets**, and/or **RelationKind tokens** (not synonyms), each with the local cue(s) that made it plausible.
* **Selected facet/kind (and selected RelationKind, if relevant):** the chosen candidate(s).
* **Why:** the discriminating test(s) that were applied, plus pointers to the specific local evidence/witness cues used (carriers, claims, artefacts).
* **Consequence:** which SlotSpecs become required/forbidden and which A.6.B hooks are now triggered (L/A/D/E).

Minimal one‑screen representation:

| Candidates (kinds/facets/tokens) | Selected facet/kind | Why (tests + cues) | Consequence (slots + routing hooks) |
| --- | --- | --- | --- |
| C1 …; C2 …; C3 … | … | … | … |

**Notes.**

* For **metonymy**, list both the literal candidate and the intended target candidate (and make the shift explicit).
* Keep the candidate set small: include only live contenders, and state the elimination test for the others.
* This note is **informative**: it does not replace routed L/A/D/E claims. It exists to prevent “lexicon instead of ontology”.
#### A.6.P:4.1 — Stable lens

A RPR‑pattern SHALL name a stable mathematical “lens” that prevents re‑inventing roles per domain. Examples of lenses (illustrative):

* **Kind‑labelled qualified hyperedge / record** (default A.6.P lens)
* **n‑ary relation with distinguished positions** (A.6.5 style)
* **kind‑labelled dependence arrow over a base** (A.6.6 style)
* **span/cospan + declared loss/correspondence notes** (Bridge‑like families)
* **correspondence relation + repair operations** (sync/consistency families)

The lens is a compression device: one stable abstraction that keeps the relation’s **arity and polarity** stable and makes invariants speakable.
#### A.6.P:4.2 — Kind‑explicit relation tokens (no umbrella meaning‑surrogates)

For every in‑scope relational claim, authors SHALL select (or mint) an explicit **RelationKind token** as a declared vocabulary element.

A RelationKind token is authored as a `U.Signature`‑level vocabulary element with explicit SlotSpecs for its participant and qualifier positions (`⟨SlotKind, ValueKind, refMode⟩`). When no suitable token already exists, authors SHALL NOT improvise a one-off string by intuition. They SHALL route mint-or-reuse through **F.18**: use **MintNew** by default, build a seed candidate set, surface an honest NQD-front, run the sense-seed read-through, and record why the selected token is chosen from the non-dominated front. Use **DocumentLegacy** only when the label is externally fixed and that status is stated explicitly.

**RelationKind contract skeleton (minimum, recipe-level).**
For each `RelationKind` token, a conforming Context publication SHALL publish a vocabulary entry whose **signature-level definition** is paired with (or points to) a **routed claim bundle** (“contract skeleton”) that declares (at minimum):

The leading **(L)/(A)/(D)/(E)** tags below indicate the intended **A.6.B quadrant routing** for each element of the skeleton.

* **(L) applicability** (A.6.0): the Context/planes where the kind is defined (local meaning is first-class).
* **(L) polarity**, and (if needed) explicit **inverse tokens** (no silent role flips in Tech prose).
* **(L) SlotSpecs** for all participant positions (and any qualifier slots exposed by the family) (`⟨SlotKind, ValueKind, refMode⟩`, where `refMode` is either `ByValue` or a concrete `RefKind` token per A.6.5).
* **(A) repair path for endpoint kind mismatches** (normative): allowed repairs are (i) explicit narrowing, (ii) a `KindBridge` (+ `CL^k` + loss notes), and/or (iii) explicit `retargetParticipant`. Renaming endpoints is not a repair.
* **(L) qualifier expectations**: which qualifiers are required/optional/forbidden (scope, `Γ_time`, viewpoint/view, reference scheme, representation scheme).
* **(D) qualifier placement discipline**: extra parameters belong in `scope` or explicit qualifier slots, not as adjectives attached to endpoint names.
* **(A/E) witness discipline**: when witnesses are required as an admissibility gate and what carrier-anchored witness sets look like in this family.
* **(L/A) admissible semantic change classes** (see §4.4) and whether they require a new edition.
* **(A/E) cross‑Context/plane policy** when applicable (Bridge ids + CL + loss notes policy).

**Important stack constraint (A.6 / A.6.S / A.6.B).**
Treat “contract” as a routed set of claims, not a single magical object:

* **L‑claims** (laws/invariants; polarity; SlotSpec typing) live in `Signature.Laws`.
* **A‑claims** (admissibility gates) are authored as admissibility predicates (canonically placed in `Mechanism.AdmissibilityConditions` when an explicit mechanism exists) and may reference the RelationKind token by ID.
* **D‑claims** (duties/commitments) name accountable roles/agents and may reference `L-*`/`A-*` by ID.
* **E‑claims** (evidence/work effects) anchor to carriers and observation conditions and may reference `L-*`/`A-*` by ID.
#### A.6.P:4.3 — Slot‑explicit qualified relation records (recover hidden arity)

A conforming text SHALL ensure that each in‑scope relation instance is representable as a **Qualified Relation Record** (a first‑class record/episteme in the relevant Context) that fills the relation’s slots.

Conceptual notation‑neutral shape:

**Notation note (A.6.5 alignment).** In this family `refMode` is a slot‑content mode: either `ByValue` (inline value of the declared ValueKind) or a concrete `RefKind` token (slot holds a reference/pin of that RefKind).
```
QualifiedRelationRecord :=
⟨ relationKind : RelationKind, // vocabulary token / registry entry (signature-level)

  // participant positions (pattern-specific; contract fixes SlotSpecs)
  p₁ : SlotContent(VK₁, refMode₁),
  …,
  pₙ : SlotContent(VKₙ, refModeₙ),

  // qualifier kit (pattern-specific; contract selects subset)
  scope?       : SlotContent(U.Scope, ByValue | RefKind),
  Γ_time?      : SlotContent(U.GammaTimePolicy, ByValue), // time selector/policy; not an evidence freshness proxy
  viewpoint?   : SlotContent(U.Viewpoint, ByValue | RefKind),
  view?        : SlotContent(U.View, ByValue | RefKind),
  refScheme?   : SlotContent(U.ReferenceScheme, ByValue | RefKind),
  reprScheme?  : SlotContent(U.RepresentationScheme, ByValue | RefKind),

  witnesses?   : SlotContent(VK_wit, ByValue | RefKind)
⟩
```

**Slot naming guard.** `*Slot` suffix names positions (SlotKinds), not occupants; prose SHOULD use occupant names (`scope`, `witnesses`, `base`, `dependent`, …) for fillers. This is the same guard used in A.6.6 and A.6.5. 

**Well‑formedness principle.** The record is “typed by contract”: SlotSpecs are fixed by the selected RelationKind token, and missing slots are permitted only if the contract says they are optional. This mirrors A.6.6’s scoped/witnessed declaration move (SWBD): “shape + contract makes a concrete typed signature”.

**Well‑formedness constraints (non‑deontic).**

* **WF‑A6P‑QR‑1 (Required slots are present).** For any QualifiedRelationRecord `r` with `r.relationKind = k`, `r` provides values for every SlotSpec that `k` marks as required.
* **WF‑A6P‑QR‑2 (No silent kind swap).** `relationKind` is part of a record’s identity/edition boundary. If the kind changes, the result is represented as a distinct record/edition linked by an explicit `changeRelationKind` (or an explicit withdrawal + re‑declaration), not as an in-place mutation that preserves identity.

**Normative prose forms (Tech).**
In Tech/normative prose, authors SHALL express an in‑scope relation instance in one of the following equivalent forms:

* **Functional form:** `relationKind(p₁=…, …, pₙ=…, qualifiers…)`
* **Arrow form (binary projection only):** `p_left --relationKind{qualifiers}--> p_right`

Passive umbrella voice (“X is synced/linked/anchored …”) is permitted only as Plain gloss when immediately rewritten into one of the above forms.

**Cross‑Context/plane note (recipe-level).**
If any participant/qualifier implies cross‑Context or cross‑plane reuse, the routed claim bundle MUST cite the relevant Bridge ids + CL policy (and loss notes, when applicable) in the appropriate routed claims (typically `A-*` and/or `E-*`). Label identity is not an admissible substitute.
#### A.6.P:4.4 — Change‑class lexicon (operations are not adjectives)

A RPR‑pattern SHALL publish a **relation‑change lexicon**: a small set of semantic change classes used in normative prose to describe “what changed” without umbrella verbs.

Minimum semantic change classes (conceptual; specialisations may add more):

1. **declareRelation** — mint a new qualified relation record (slot‑explicit).
2. **withdrawRelation** — retire a relation instance (render it inactive for downstream use). If the intent is narrowing (still valid within a smaller scope/window), use `rescope`/`retime` rather than overloading withdrawal.
3. **retargetParticipant(slotKind, newRef)** — change a RefKind slot-content while preserving SlotKind and ValueKind (conceptually corresponds to slot‑level **retarget**). 
4. **reviseByValue(slotKind, newValue)** — edit embedded by‑value content (conceptually corresponds to slot‑level assign/update or “by‑value edit”). 
5. **rescope(newScope)** — change scope explicitly (no “in our context” prose).
6. **retime(newΓ_time)** — change `Γ_time` when time matters; not a substitute for witness freshness claims.
7. **refreshWitnesses(newWitnessSet)** — update witness bindings to point at appropriate carriers; generating evidence is Work, not a constructor op. 
8. **changeRelationKind(newRelationKindToken)** — semantic change; MUST NOT be treated as an edit‑in‑place.

**Edition fence rule (A.6.S / A.6.6 alignment).**
In decision/publication lanes, any semantic change that alters meaning SHALL be represented as a new edition and connected via explicit continuity/withdrawal, rather than mutating the old record in place. 

**Mapping note (informative, conceptual).**
These change classes are semantic; they may be realised by A.6.5 slot verbs (retarget vs by‑value edit) and, when the relation is a basedness family, by A.6.6 base‑change verbs. The semantic story must not collapse into “we edited something”.
#### A.6.P:4.5 — Lexical guardrails (ban umbrella metaphors as meaning‑surrogates)

A RPR‑pattern SHALL define **red‑flag umbrella tokens** for its ambiguity cluster, and SHALL provide canonical rewrite forms.

Normative base rules (suite-level):

* In **Tech / normative prose**, umbrella predicates (e.g., “same”, “synced”, “linked”, “connected”, “anchored/grounded”) MUST NOT substitute for an unnamed RelationKind token.
* **“bind/binding” is reserved for name binding** (Identifier → SlotKind/slot‑instance) and MUST NOT be used as a synonym for declaring/changing a relation instance. Use the change‑class lexicon instead. 
* Pattern-defined carve‑outs MAY exist (reserved primitives elsewhere), but they remain review triggers to ensure the reserved sense is intended (as in A.6.6’s `anchor*` carve‑out rule). 

**Recommended publication move (no extra authoring apparatus implied).** For stable ambiguity clusters, publish the red‑flag token list and canonical rewrites as a LEX‑BUNDLE entry (PTG=Guarded) and, when the cluster introduces new `RelationKind` tokens or stable facet head phrases, include them in the relevant UTS rows (F.17). This keeps rewrite discipline shareable outside the A.6 cluster.
#### A.6.P:4.6 — Progressive elaboration (the “precision dial” rule)

A.6.P supports a controlled escalation path that preserves meaning and prevents drift:

1) Start with a minimal explicit **RelationKind token** + principal endpoints (a binary projection is allowed only if every omitted participant/qualifier slot is contractually optional *and* irrelevant for the downstream lane(s)).

2) When ambiguity emerges, **do one (or more) explicitly**:
   * add missing participants as additional slots (turn the projection into n‑ary),
   * add explicit qualifiers (scope / `Γ_time` / viewpoint/view / schemes / witnesses),
   * refine the RelationKind token to a more specific one (new contract skeleton; `changeRelationKind`),
   * introduce Bridges + CL (and loss notes) when crossing Contexts/planes.

3) Authors MUST keep the transition monotone:
   * no silent re‑typing,
   * no implicit polarity flips,
   * no “edit‑in‑place” that changes meaning (use edition fences + explicit continuity/withdrawal links).
#### A.6.P:4.7 — Two‑view / polarity discipline (no silent role flips)

A RPR‑pattern SHALL specify how the same relation is expressed from both “sides” without polarity flips:

* Either keep both endpoints visible with the same polarity-preserving token, **or**
* declare explicit inverse tokens and require them for inverse prose.

Implicit role flips (“B validates A” without explicit inverse) are prohibited in Tech/normative prose. This is already a core rule for basedness patterns and is generalised here.
#### A.6.P:4.8 — Disambiguation guide (rewrite/selection)

A RPR‑pattern SHALL include an actionable guide:

> “If the draft says *X*, decide between relation kinds A/B/C, expand missing slots, and rewrite into explicit kind+slots notation.”

For basedness families, A.6.6 provides an existence proof of such a guide (select baseRelation family; add scope/time/witnesses). A.6.P requires this move suite‑wide. 

**Recommended format: RPR‑Disambiguation Guide (Winograd‑style, but ontology‑first).**
To keep disambiguation from collapsing into dictionary debates, present the guide as a compact decision scaffold:

* **trigger surface form** → **candidate RelationKinds / candidate facets (kinds)** → **discriminating questions/tests** → **canonical rewrite(s)** → **L/A/D/E routing hooks**

Rules for the guide:

* Triggers may be **relation umbrellas** (“same/synced/linked/anchored…”) *or* **participant umbrellas** (pronominal/metonymic/over‑broad kind tokens). The guide SHALL state which role(s) the trigger is standing in for (relation kind, endpoint kind, qualifier, mediator).
* Candidate sets SHALL be stated as **kinds/facets/RelationKind tokens**, not as synonym lists. “Service” ⇒ {promise content, access point, provider principal, commitment, work+evidence, …} is the archetype (A.6.8).
* When endpoint‑side ambiguity is present, the guide SHOULD recommend producing a **Candidate‑Set Note** (A.6.P:4.0b) as part of the rewrite, so the chosen facet/kind is reviewable.
* Discriminating questions SHOULD be phrased as small **tests** that map directly to slot requirements (e.g., “Can you call it?” ⇒ `accessPointRef`; “Is it deontic?” ⇒ `commitmentRef` + accountable principal; “Is it actuals?” ⇒ `deliveryWorkRef` + witnesses).
* Canonical rewrites SHALL land in the A.6.P Tech forms (functional/arrow) and SHALL specify any newly required qualifiers (scope, Γ_time, viewpoint/view, schemes, witnesses).
* Routing hooks SHALL name which claim(s) are expected in each quadrant (L/A/D/E) so that “unpacking” reliably produces reviewable obligations rather than prose paraphrases.

**Mini-row (metonymy; endpoint-side trigger, illustrative).**

`"at the table"` → `{PlaceRef(Table#7), MeetingRef(NegotiationSession#3), RoleRef(DecisionMakerSeat#2)}` → tests `{Is the claim about physical location? about participation? about accountable role? which carrier-anchored witnesses exist (badge/access log, calendar invite, minutes/recording)?}` → rewrite `{locatedAt(personRef=…, placeRef=…, Γ_time=…, witnesses=…) | participatesInMeetingUnder(personRef=…, meetingRef=…, roleRef?=…, Γ_time=…, witnesses=…)}` → L/A/D/E hooks `{L: publish RelationKind tokens + SlotSpecs + polarity/inverses; A: decision/publication use requires explicit Γ_time + witness set; D: forbid metonymic endpoint spans in Tech prose (require explicit refs); E: cite carrier-anchored witnesses and their observation conditions}`.
#### A.6.P:4.9 — A.6.B routing template for RPR relation families

Any RPR‑pattern that claims “contract-bearing” semantics SHALL route its normative content using **A.6.B**:

* **L‑claims**: signature‑level structure and laws (SlotSpecs, polarity, invariants).
* **A‑claims**: admissibility / “entry gate” rules for *using* relation instances in specified lanes (e.g., decision use requires witnesses; time dependence requires `Γ_time`; cross‑Context use requires Bridges/CL).
* **D‑claims**: deontic obligations on authors/agents (lexical firewall; prohibited umbrella use; rewrite obligations).
* **E‑claims**: work/evidence expectations and carrier anchoring (what counts as a witness; evidence freshness is a property of carriers, not prose). 

A.6.P does not mandate a particular claim‑ID format; it mandates the **separation and cross‑reference discipline**.

**Atomicity + explicit references (normative, recipe-level).**
Per A.6.B, mixed sentences MUST be decomposed into **atomic** claims so each claim routes to exactly one quadrant, and any dependencies MUST be expressed as explicit references (by claim ID or canonical location), not paraphrased duplicates.

**No upward dependencies (normative, recipe-level).**
`L-*` claims MUST NOT reference `A-*`, `D-*`, or `E-*`; `A-*` and `E-*` claims MUST NOT reference `D-*`. Where cross‑quadrant coupling is needed, link by explicit IDs in the allowed directions.
#### A.6.P:4.10 — A.6.S compatibility note (ConstructorSignature is optional but canonical for engineered families)

If a RPR‑pattern is used as an engineered family (created/evolved over time), it SHOULD be expressible as:

* a **TargetSignature**: declared relation kinds + SlotSpecs + laws, and
* a minimal **ConstructorSignature**: effect‑free operations that rewrite under‑specified prose into the explicit form and evolve relation records using the change‑class lexicon (mapped to A.6.5/A.6.6 canonical verbs).

If a ConstructorSignature is provided, it SHOULD (conceptually) declare, for each constructor operator family:

* whether it is a species of **A.6.2 / A.6.3 / A.6.4**, and
* which **`U.EpistemeSlotGraph` slots** (C.2.1) it may read and write (SlotKind/ValueKind/RefKind profile).

**Publication note (recommended).**
If the TargetSignature / relation-kind registry is published via MVPK, treat every face as a **view** (no new semantics), keep viewpoint accountability explicit, and prefer stable claim IDs (Claim Register) so downstream carriers cite claims rather than paraphrasing.
### A.6.P:5 — Archetypal Grounding (System / Episteme)

A.6.P requires Tell–Show–Show grounding in both System and Episteme lanes.

#### A.6.P:5.1 — System archetype: “same system across environments”

**Tell.**
An operations note says: “Staging is the same service as Production.” Months later, incident metrics are aggregated “because it’s the same thing”, and evidence across environments is mixed, producing an incorrect causal story.

**Show.**
Treat “same” as a red-flag umbrella token. Rewrite into an explicit cross-Context relation kind,
typed to the facet the draft actually uses (service delivery system sameness for actuals/evidence aggregation; not about promise contents).

**Show (candidate‑set note; endpoint facet restoration).**

```
CandidateSetNote(triggerSpan="service" in "same service", role=endpointFacet(p₁)):
- candidates: {promiseContent, serviceAccessPoint, serviceProviderPrincipal, serviceDeliverySystem}
- selected:   serviceDeliverySystem
- why:        the claim is later used to justify mixing operational actuals/evidence (metrics + incident logs);
  local cues point to delivery artefacts (manifests/config/test runs), not clause carriers
- consequence: endpoints typecheck as `DeliverySystemRef` participants; clause/provider facets are explicitly out-of-scope

sameDeliverySystemUnder(
  leftDeliverySystemRef  = SystemRef(staging_delivery_system),
  rightDeliverySystemRef = SystemRef(prod_delivery_system),
  scope     = ClaimScope{SLO_family = X, signals = {latency, error_rate}},
  Γ_time    = interval[2025-12-01, 2026-01-31],
  viewpoint = OpsViewpoint,
  witnesses = {deploymentManifestPins, configPins, testRunPins}
)

aggregationAdmissibleIff(
  relationRef  = RelationRef(sameDeliverySystemUnder, SystemRef(staging_delivery_system), SystemRef(prod_delivery_system), ed=…),
  target       = deliveryWorkMetrics,                   // actuals
  Γ_time       = interval[2025-12-01, 2026-01-31],
  witnesses    = {metricCarrierPins, incidentLogPins}   // evidence carriers for the actuals
)
```

**Show.**
Now the relation is auditable: aggregation is admissible only if the relation kind’s admissibility
claims say it preserves the needed characteristics under the declared scope/time, and if witnesses exist.
Cross-Context reuse is explicit and cannot piggyback on label identity.
#### A.6.P:5.2 — Episteme archetype: “the models are synced”

**Tell.**
A draft says: “The simulation model is synced with the physical twin.” Reviewers ask what “synced” means. The authors respond with examples, but downstream users still cannot tell whether the claim is about parameters, structure, calibration, evidence freshness, or mapping quality.

**Show.**
Rewrite “synced” as an explicit correspondence relation kind + explicit qualifiers + witnesses:

```
entityMatchedBy(
  leftRef          = ModelRef(SimModel@ed=12),
  rightRef         = SystemRef(PhysicalTwin@ed=7),
  mappingArtifactRef = AlignmentModel_2025_11,
  scope            = ClaimScope{signals = S, metrics = M},
  Γ_time           = snapshot(t),
  referenceScheme  = RefScheme(CustomerIdRegistry#EU),
  viewpoint        = DataEngineeringViewpoint,
  witnesses        = {evalRunPins, calibrationPins, mappingArtifactPins}
)
```

**Show (change narration).**
Two weeks later, the mapping artefact is replaced and the witness set is refreshed. In decision/publication lanes, represent this as a new edition and narrate the change via change classes (not via “re‑synced”):

```
withdrawRelation( relationRef = RelationRef(entityMatchedBy, leftRef, rightRef, ed=12) )

declareRelation(
  entityMatchedBy(
    leftRef           = ModelRef(SimModel@ed=12),
    rightRef          = SystemRef(PhysicalTwin@ed=7),
    mappingArtifactRef= AlignmentModel_2026_01,
    scope             = ClaimScope{signals = S, metrics = M},
    Γ_time           = snapshot(t₂),
    referenceScheme   = RefScheme(CustomerIdRegistry#EU),
    viewpoint         = DataEngineeringViewpoint,
    witnesses         = {evalRunPins_2026_01, calibrationPins_2026_01, mappingArtifactPins_2026_01}
  )
)
```

**Show.**
Different “sync meanings” become different **RelationKind tokens** (e.g., `entityMatchedBy`, `schemaAlignedUnder`), not adjectives. Subsequent changes become narratable as `retargetParticipant`, `rescope`, `retime`, or `refreshWitnesses`, rather than “we updated the sync”.
### A.6.P:6 — Bias‑Annotation

Lenses tested: **Gov**, **Arch**, **Onto/Epist**, **Prag**, **Did**. Scope: **Universal** for RPR‑style precision restoration in the A.6 cluster.

* **Gov bias:** prefers explicit admissibility and evidence routing; increases auditability but raises authoring cost.
* **Arch bias:** favours reusable structural lenses (records/hyperedges) over narrative prose.
* **Onto/Epist bias:** pushes kind‑explicit relations and polarity discipline; discourages metaphor-first modeling.
* **Prag bias:** reduces rework and cross-team misinterpretation; may feel heavy in exploratory notes.
* **Did bias:** enforces teachable rewrite guides; can be perceived as prescriptive.
### A.6.P:7 — Conformance Checklist (CC‑A.6.P)

A pattern P conforms to A.6.P (i.e., is an RPR‑pattern) iff:

 > **Note.** This checklist defines conformance for **RPR specialisations** (e.g., A.6.5, A.6.6, A.6.8, A.6.9, A.6.C and future A.6.x patterns). A.6.P itself is the **suite recipe**.

1. **CC‑A.6.P‑1 — Lens is explicit.**
   P SHALL name the stable lens used to stabilise the ambiguity cluster and justify its fit.

2. **CC‑A.6.P‑2 — RelationKind is explicit and named through lawful mint-or-reuse.**
   Every in‑scope relation claim SHALL name an explicit RelationKind token, and that token SHALL resolve to a vocabulary entry whose contract skeleton publishes (at minimum): polarity (and explicit inverses if needed), participant SlotSpecs `⟨SlotKind, ValueKind, refMode⟩`, qualifier requirements, witness expectations for decision/publication lanes, admissible semantic change classes, and (when applicable) cross‑Context/plane policy (Bridge + CL + loss notes). Routed claims SHALL respect A.6.B.
   When a suitable token does not already exist, authors SHALL mint or document it through **F.18** rather than inventing a one-off label by intuition: **MintNew** is the default, the seed candidate set and NQD-front SHALL be surfaced, and the final token SHALL be selected from that non-dominated front unless an explicit legacy exception is recorded.
   The contract skeleton SHALL also declare admissible **repair paths for endpoint kind mismatches** (KindBridge / explicit narrowing / explicit retargeting) and enforce **qualifier placement discipline** (no adjective smuggling).

3. **CC‑A.6.P‑3 — Slot‑explicit instances.**
   P SHALL ensure that every in‑scope relation instance is expressible as a Qualified Relation Record filling all contract‑required participant slots (no hidden arity; see WF‑A6P‑QR‑1).

4. **CC‑A.6.P‑4 — Qualifiers are explicit when required.**
   If scope/time/viewpoint/reference-scheme assumptions matter (or the relation kind requires them), they SHALL be explicit; implicit “current/latest/in our context” SHALL NOT substitute.
   When witness freshness/decay matters, it SHALL be expressed explicitly (evidence-role timespans, qualification windows, explicit freshness predicates), not by treating `Γ_time` as a proxy.

5. **CC‑A.6.P‑5 — No silent polarity flips.**
   If inverse wording is used, it SHALL use explicit inverse tokens or polarity‑preserving forms; implicit role flips are forbidden. 

6. **CC‑A.6.P‑6 — Change semantics use a change‑class lexicon.**
   Normative prose about relation evolution SHALL use named semantic change classes (declare/withdraw/retarget/revise/rescope/retime/refreshWitnesses/changeKind), not generic “update/modify/sync/bind/anchor”.
   Any mapping to lower-level slot verbs MUST preserve the A.6.5 retarget vs by‑value edit distinction. 

7. **CC‑A.6.P‑7 — “bind/binding” discipline.**
   `bind/rebind` SHALL be reserved for name binding (Identifier → SlotKind/slot‑instance) and SHALL NOT be used as a synonym for relation edits. 

8. **CC‑A.6.P‑8 — Lexical firewall is normative.**
   P SHALL list red‑flag umbrella tokens for the family and provide rewrite rules; umbrella tokens SHALL NOT function as meaning‑surrogates in Tech/normative prose. If legacy/Plain umbrella wording appears, it SHALL be immediately mapped to an explicit Tech form (`relationKind(…)` or `--relationKind-->`).

9. **CC‑A.6.P‑9 — A.6.B atomicity, routing, and explicit references are respected.**
   Normative text SHALL be decomposed into atomic claims routable to exactly one quadrant (L/A/D/E). Dependencies SHALL be expressed by explicit references (IDs or canonical locations), not paraphrase. No‑upward‑dependency constraints SHALL be preserved.

10. **CC‑A.6.P‑10 — Evidence is carrier‑anchored (A.7 separation).**
    Statements about witnesses/evidence/freshness SHALL be framed as properties/expectations of carriers and work, not as properties of prose. 

11. **CC‑A.6.P‑11 — A.6.S compatibility when engineered.**
    If the pattern family is presented as engineered/evolving, it SHALL be compatible with A.6.S: distinguish TargetSignature vs ConstructorSignature; map constructor verbs to A.6.5/A.6.6 canonical verbs; keep constructor ops effect‑free; and (when a ConstructorSignature is present) declare the C.2.1 slot read/write profile and whether ops are A.6.2/A.6.3/A.6.4 species.

12. **CC‑A.6.P‑12 — Cross‑Context/plane reuse is explicit (no “sameness by label”).**
    If a relation instance crosses Contexts/planes (or requires translation), the carrier SHALL cite Bridge ids + CL policy (and loss notes, when applicable). Label identity or “same anyway” prose SHALL NOT substitute.

13. **CC‑A.6.P‑13 — Disambiguation guide is actionable.**
    P SHALL include an explicit rewrite/selection guide that maps each red-flag umbrella cluster or generic load-bearing head phrase to candidate head kinds, candidate `RelationKind` tokens, and (when the ambiguity is endpoint-side) candidate endpoint facets/kinds, plus required qualifiers and canonical rewrite forms.
    The guide SHOULD follow the RPR‑Disambiguation format: **trigger → candidates → discriminating questions/tests → canonical rewrite → L/A/D/E routing hooks**.
    
    Where endpoint referential compression is a primary risk, the guide SHOULD also include (or point to) the **Candidate‑Set Note** template (A.6.P:4.0b) so instance‑level reviews have an auditable trail: candidates → selected facet/kind → why.

14. **CC‑A.6.P‑14 — Grounding spans System and Episteme.**
    P SHALL include at least one Tell–Show–Show vignette in a **System** lane and at least one in an **Episteme** lane (per E.8), demonstrating a real ambiguity repair and a relation‑change narration using the change‑class lexicon.

15. **CC‑A.6.P‑15 — Trigger rule is explicit.**
    P SHALL include an explicit trigger rule (or selection heuristic) stating when the family applies and what counts as “in-scope” umbrella relational prose.
### A.6.P:8 — Common Anti‑Patterns and How to Avoid Them

| Anti-pattern | Why it fails | Repair |
| ---------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| “Just define the umbrella word” | Definitions do not separate arity, operation classes, or viewpoint asymmetry. | Replace umbrella use with explicit RelationKind + qualified record + change lexicon. |
| Keep the umbrella verb, add adjectives | Adjectives are not contracts; invariants remain unstated. | Mint/select distinct RelationKind tokens; enforce rewrite discipline. |
| Leave a load-bearing generic head uninterpreted | Readers cannot tell what kind of thing the phrase governs, so later qualifiers float without an ontology. | Restore the head kind first in host-local terms; only then repair the remaining relation/comparison burden. |
| Let a qualifier smuggle the real burden | A phrase like “comparative note”, “safe guidance”, or “reliable output” sounds precise while leaving the actual relation, comparison basis, or authority burden implicit. | Unpack the qualifier into explicit comparison basis, relation kind, admissibility condition, or routed claim before stronger use. |
| Leave pronominal/metonymic endpoints implicit | Endpoint identity/facet remains guesswork; slot typing cannot stabilise. | Reconstruct candidate referents/facets (**capture as a Candidate‑Set Note**); add explicit slots/refs; then rewrite (A.6.8 is the archetype for “service” polysemy). |
| Ontology only, no lexical guardrails | Prose re-collapses meaning. | Add red-flag tokens + prohibited umbrella use in Tech/normative prose. |
| Lexicon only, no structural lens | Becomes subjective policing. | Introduce stable lens + slot schema; then attach guardrails. |
| Solve viewpoint mismatch by renaming endpoints | Silent re-typing breaks cross-pattern reuse. | Keep roles stable; use explicit kind selection + explicit repair paths. |
| Using “bind” to mean “edit relation” | Collapses name-binding vs slot-writing layers. | Reserve `bind/rebind` for names; use change lexicon / slot verbs properly. |
| Implicit “current/latest” | Violates explicit time discipline. | Add explicit `Γ_time` where time matters. |
| Treat `Γ_time` as witness freshness | Time selection does not equal evidence freshness/decay; this conflates time discipline with evidence lanes. | Keep `Γ_time` for temporal scope; express freshness/decay via witness metadata and carrier-anchored E-claims. |
| Compare across a mixed ontological axis | Artifact, process, authority use, or owner-lane semantics get ranked on one axis before their kinds and burdens are restored. | First restore head kind, then qualifier burden, then rewrite the sentence through burden/threshold/handoff/owner-lane language so the comparison axis is homogeneous. |
### A.6.P:9 — Consequences

**Benefits**

* **Predictable precision upgrades.** Umbrella relational prose becomes systematically expandable into explicit structure.
* **Viewpoint conflict becomes repairable.** Differences surface as explicit roles/kinds/qualifiers, not silent rewrites.
* **Change becomes speakable.** “What changed?” is a named semantic change class, reducing folklore.
* **Cross‑Context safety improves.** “Same/synced/linked” becomes contract‑bearing and auditable, not rhetorical.

**Trade‑offs / mitigations**

* **Higher authoring overhead.** Mitigated by progressive elaboration: expand only when invariants, reuse, or decisions require it.
* **More explicit qualifiers.** Mitigated by keeping the lens stable and reusing slot templates (A.6.5/A.6.6).
* **Perceived prescriptiveness.** Mitigated by allowing Plain-register glosses that are immediately mapped to Tech tokens (without creating new contracts).
### A.6.P:10 — Rationale

Upper/foundational ontologies optimise for broad applicability via sparse commitments. FPF’s recurring, high-cost failures are often elsewhere: **under‑specified relations** in prose, where ambiguity hides in arity, kind selection, viewpoint, and change semantics.

A.6.P is orthogonal to “add a global taxonomy”:

* It provides a repeatable method to **restore relational precision** without requiring any external formalism or auxiliary authoring apparatus.
* It operationalises A.6’s boundary discipline by ensuring relation talk can be cleanly separated into laws, admissibility, deontics, and evidence/work (A.6.B), rather than becoming “contract soup”.
### A.6.P:11 — SoTA‑Echoing (informative; post‑2015 alignment)

**Evidence binding note.** If your Context maintains a SoTA Synthesis Pack for relation/contract authoring or “qualified relations”, cite it here and keep this section consistent. Otherwise, treat the table below as a seed list (informative only).

A.6.P echoes contemporary practice across independent traditions, while remaining notation‑neutral and Context-local:

| SoTA practice (post‑2015) | Primary source (post‑2015) | Echo | What A.6.P adds | Adoption stance |
| --- | --- | --- | --- | --- |
| Constraint/shape validation over graph assertions | W3C **SHACL** Recommendation (2017) | Separates “assertions” from “constraints” | Couples structural contracts with **lexical guardrails** to prevent prose regression | **Adopt/Adapt** — adopt “explicit contracts”, adapt by binding to Tech↔Plain and rewrite discipline |
| Qualified statements / reification patterns | **RDF‑star / SPARQL‑star** (2017+) practice family | Reification/qualification when hidden arity appears | Requires explicit **RelationKind** + change‑class lexicon (not just representational qualification) | **Adapt** — representation is not enough without kind selection + change semantics |
| Architecture views & correspondences | ISO/IEC/IEEE **42010:2022** | Viewpoints and correspondences as first-class concerns | Forces viewpoint discipline inside relation qualification + prohibits silent polarity flips | **Adopt/Adapt** — adopt viewpoint accountability, adapt by embedding it into relation records |
| Bidirectional transformations / optics | Pickering et al., **Profunctor Optics** (ICFP 2017) and successors | “Pairs of projections + laws” as stable lenses | Uses optics as conceptual stabilisers for multi‑view relations while keeping Core notation‑neutral | **Adapt** — use as a stabilising lens, not as mandated notation |
| Compositional modelling (applied category theory) | Fong & Spivak, **Seven Sketches in Compositionality** (2019) | Stable abstract lenses reusable across domains | Embeds lens choice into an authoring discipline with explicit slots + guardrails | **Adapt** — keep the categorical lens didactic; operationalise via SlotSpecs + change lexicon |

These echoes justify why A.6.P is structured as: **stable lens → explicit slots → explicit change classes → lexical guardrails**, rather than “just define the verb”.
### A.6.P:12 — Relations

**Specialised by**

* **A.6.5 `U.RelationSlotDiscipline`** — slot precision restoration for n‑ary relations. 
* **A.6.6 `U.BaseDeclarationDiscipline`** — base‑dependence precision restoration (SWBD + base‑change lexicon + `anchor*` red‑flags). 
* **A.6.8 (RPR‑SERV)** — service polysemy unpacking as a relation/facet precision restoration discipline (serviceSituation lens + canonical rewrites + service‑specific tests and change narration).
* **A.6.9 (RPR‑XCTX)** - U.CrossContextSamenessDisambiguation - Repairing cross-context “same / equivalent / align / map” via explicit Bridges 
* **A.6.H (RPR‑WHOLE)** — wholeness language unpacking (“whole/part/integrity/complete”) into boundary, typed parthood, explicit Γ selection, order/time routing, and A.15 completeness/coverage claims.

**Coordinates with**

* **A.6.S `U.SignatureEngineeringPair`** — RPR rewrite operations can be packaged as a ConstructorSignature for engineered relation families; must preserve canonical verb mapping and effect‑free constructor semantics. 
* **C.2.2a / A.16 / A.16.1 / A.16.2 / B.4.1 / B.5.2.0 + C.2.LS / C.2.4 / C.2.5 / C.2.6 / C.2.7** - relation publication enters only after lawful language-state chart positioning, articulation, and closure support exist; earlier cue pressure stays on the language-state seam, prompt-shaped continuations stay with `B.5.2.0`, retreat/reopen moves remain owned by `A.16.2`, and `A.16.0` is used only when lineage, branch, loss, or handoff history must itself be published.

**Intended future A.6.x specialisations (illustrative)**

* Cross‑Context equivalence / “sameness” discipline (Bridge + loss notes families)
* Correspondence/consistency + repair discipline (sync/alignment families)
* Transfer/hand‑off discipline (multi‑party “give/assign/ownership” families)
### A.6.P:End
## U.QualityTermPrecisionRestoration — Quality Term Precision Restoration (Q-TERM)

> **Type:** Architectural (A)
> **Status:** Stable
> **Normativity:** Normative (Core / Draft)

**Plain-name.** Quality-term precision restoration.

**Intent.**
Provide a reusable discipline for repairing overloaded uses of the word **quality** in FPF texts.
This pattern is an **A.6.P RPR specialisation**: it routes bare evaluative prose either into an explicit endpoint-owned evaluative form or, when endpoint selection is still being stabilized, into one explicit, slot-explicit **quality ascription** transitional relation family with a declared **sense family**, lawful **normal form** (`SignalPack | Characteristic | Bundle | Objective`), explicit **change semantics**, explicit **reference-plane accountability**, and lexical guardrails.
It allows philosophical, neuro-symbolic, control-theoretic, engineering, and open-ended-search uses to coexist **without false identity by label**.

**Placement.**
Part A > cluster **A.6 Signature Stack & Boundary Discipline** > specialisation of **A.6.P** for overloaded evaluative umbrella terms centered on *quality*.

**Builds on.**
A.6, A.6.B, A.6.P, A.6.S, A.6.0, A.6.5, A.7, A.2.6, A.17, A.18, C.2.1, C.16, C.25, C.17–C.19, E.8, E.10, F.9, F.18.

**Coordinates with.**
**A.6.A** for affordance / action-invitation exits; **C.2.2a / A.16 / A.16.1 / A.16.2 / B.4.1** for language-state chart positions, lawful moves, early cue routing, responsibility handoff, and lawful retreat when an evaluative publication must be reopened; use **A.16.0** only when lineage, branch, loss, or handoff history itself must be published as an explicit trajectory account; **B.5.2.0** when the strongest lawful continuation is still an open explanatory probe rather than a stable endpoint ascription; **C.2.LS / C.2.4 / C.2.5 / C.2.6 / C.2.7** for articulation, closure, anchoring, and representation-factor facets referenced but not owned here; **E.17.0/E.17/E.18** for viewpoint publication; **A.10/B.3** for evidence and assurance; **A.19/CN** for comparability governance; **F.9.1** for bridge-stance annotations; **C.3.3** for explicit kind-bridge repair when endpoint kind mismatches appear.

**Non-goal.**
This pattern does **not** assert that phenomenal character / qualia, phenomenological preconceptual fit, Pirsig-style dynamic/static quality, latent fit in learned representations, explanatory merit, engineering `-ilities`, QD/NQD selector value, and control adequacy are one concept.
Its job is to publish a disciplined **bridge reading** across those traditions while preventing false identity by shared label.
It also does **not** assert that every trigger use of “quality” is lawfully repaired by `evaluativeAscription(...)`: where the repaired statement is primarily about an **action invitation / affordance** rather than an evaluative ascription, or is primarily about a **requirement / commitment over explicit heads** (for example, *quality requirements* over named Characteristics, Q-Bundle heads, or objective heads), the lawful move may be `changeRelationKind(...)` into a different relation family.

### Problem frame

FPF repeatedly encounters a predictable precision failure mode around the token **quality**:

authors say:

* “this design has quality”
* “the model quality improved”
* “quality matters before formalisation”
* “quality characteristics”
* “quality in QD / NQD”
* “the world model is higher quality”
* “the explanation is high-quality”

…but the intended meaning is actually one of several different **evaluative families**, for example:

1. **Phenomenal character / qualia** when the experienced quality itself is the topic of description rather than an externally measured characteristic.
2. **Preconceptual fit / felt rightness** before stable object-characterisation.
3. **Latent / distributed fit signals** in learned representations, world models, or active inference loops.
4. **Explanatory merit** of a theory, problem frame, or conjecture.
5. **Architectural-description fitness / compression merit** of an architecture description or architecture model under a declared viewpoint.
6. **Engineering quality families** such as reliability, maintainability, security, evolvability.
7. **Usefulness / selection value** in open-ended search, novelty–quality–diversity, or portfolio selection.
8. **Control adequacy** of a policy/model/controller in a closed loop.

The failure modes are recurrent:

* **Sense elision.** One umbrella noun hides several non-equivalent evaluative kinds.
* **Carrier confusion.** The bearer of the evaluation is unclear: artifact, episode, model, policy, explanation, candidate, architecture, relation, or action loop.
* **Form confusion.** A non-metric signal is rewritten as a metric; a bundle is treated as one scalar; an objective is mistaken for a characteristic.
* **Substrate confusion.** Embodied/preconceptual, latent/distributed, and symbolic/local representations are silently collapsed.
* **Plane confusion.** Quality of the described entity, quality of the description, quality of the carrier, and quality of the publication face are silently collapsed across `ReferencePlane` / A.7 lanes.
* **Bridge illusion.** Similar wording across traditions is mistaken for sameness.
* **Illegal scalarisation.** Composite engineering families or explanatory merit are compressed into one number without a lawful scoring method.
* **Viewpoint conflict.** One stakeholder means architectural attributes, another means usefulness, another means preconceptual fit.
### Problem

How can FPF let authors use the communicative convenience of the word **quality** while preventing category errors when the term crosses:

* phenomenological / epistemological discourse,
* architecture-description / viewpoint-fit discourse,
* representation-learning / neuro-symbolic discourse,
* Popper/Deutsch-style explanation-and-criticism discourse,
* engineering architecture and quality-characteristic discourse,
* open-ended evolution / NQD / selection discourse,
* control / world-model / active-inference discourse,
* ecological / affordance discourse, including cases that must exit this relation family altogether?
### Forces

* **Breadth vs precision.** “Quality” is attractive because it is broad; that same breadth makes it unsafe at boundaries.
* **Preconceptuality vs auditability.** Some uses refer to something real but not yet stably characterised.
* **Distributed substrate vs local publication.** Some evaluative signals arise in distributed or embodied substrates but must later be published in explicit local forms.
* **Comparability vs non-reduction.** Engineering and selection settings need comparability, but not every evaluative signal is a lawful metric.
* **Cross-tradition dialogue vs false unification.** The framework should support parallels without asserting identity.
* **Progressive articulation.** A term may begin as a felt signal and later become a bundle, proxy set, or objective.
### Solution

**Stable lens > Sense Family > Slots > Normal Form > Change Lexicon > Guardrails**

#### Trigger rule

A use of **quality** is in scope for A.6.Q when any of the following holds:

* the token **quality** or **high-quality / low-quality** appears in Tech or normative prose;
* a boundary statement relies on “quality” for admission, selection, explanation, comparison, assurance, or requirement-setting;
* different traditions are compared using the same word *quality*;
* a draft introduces *quality metric*, *quality score*, *quality characteristic*, *quality requirement*, *model quality*, *architecture quality*, *solution quality*, or *quality in QD* without a declared sense;
* the author intends the word to carry more than one of: evaluative fit, measurable characteristic, bundle, utility, or optimization objective.
#### Operational repair sequence

When the trigger fires, authors SHOULD follow the A.6.P operational repair path:

1. **Capture the trigger span.**
   Copy the exact surface phrase using *quality* (or a red-flag derivative such as *high-quality*, *quality metric*, *quality characteristic*, *model quality*).

2. **Reconstruct the candidate set.**
   Enumerate plausible candidate senses and, when relevant, candidate endpoint owners plus bearer lanes/facets (A.7: `Object | Description | Carrier`).
   If the occurrence is decision-bearing or publication-bearing, record this as a short **Candidate-Set Note** before selecting a repair.

   **Collision note.**
   This **Candidate-Set Note** is a local RPR disambiguation artifact for `quality` repairs; it is **not** the F.18 naming-process candidate set.

2a. **Check for an out-of-family affordance reading.**
   If the occurrence is primarily about an **action invitation / affordance** rather than an evaluative ascription, do **not** force a `QualitySense`.
   Route it by `changeRelationKind(...)` into the appropriate relation family and treat the quality token as token-under-discussion only.

3. **Select one explicit quality sense.**
   Pick one `QualitySense` token and state why rival senses were rejected in this local context.

4. **Emit an endpoint-explicit or transitional rewrite.**
   Rewrite the sentence either into one explicit endpoint-owned evaluative form (`Characteristic | Q-Bundle | Objective | ExplanatoryMeritBundle | selector-value endpoint`) or, when endpoint choice is still being stabilized, into one explicit `evaluativeAscription(...)` transitional record with bearer, frame, evaluator/viewpoint, normal form, and explicit qualifiers.
5. **Route boundary-bearing consequences.**
   If the repaired statement is used for admissibility, commitments, publication, or evidence-bearing decisions, route the resulting `L/A/D/E` hooks through A.6.B instead of letting “quality” carry that burden by itself.
#### Transitional lens: evaluative routing anchored by evaluativeAscription(...)

A.6.Q stabilises the ambiguity cluster by treating every in-scope quality statement as **explicit evaluative material that must route to a named endpoint owner**, not as a bare adjective.
`evaluativeAscription(...)` remains the canonical **transitional/metalinguistic repair record** when the endpoint choice is not yet fixed, but it is not the universal resting place.
Entry into A.6.Q therefore presupposes enough local `AE` to name the bearer, the frame, and at least one candidate evaluative family explicitly. `CD` may remain low while `evaluativeAscription(...)` is still serving as a transitional record, but if the material is still only a cue pack, a routed cue, or an open explanatory probe, it SHOULD remain in `A.16.1` / `B.4.1` / `B.5.2.0` rather than being published here prematurely. If a previously published evaluative record later loses the support needed to keep even that transitional status live, retreat via `A.16.2`.
In A.6.P terms, this pattern fixes one routing discipline plus one canonical transitional relation family:

* **`evaluativeAscription`** — the explicit transitional relation kind for “X has quality / quality improved / high-quality / quality in QD / quality characteristic / model quality” rewrites while routing toward a more specific endpoint owner.
#### RelationKind contract skeleton for evaluativeAscription

The family-specific `RelationKind` token is **`evaluativeAscription`**.
Its contract publication SHALL declare, at minimum:

* **(L)** applicability of the token in the local Context/plane set;
* **(L)** bearer-centred polarity (the bearer is the evaluated participant; inverse prose SHALL NOT silently swap bearer and evaluator);
* **(L)** participant SlotSpecs for bearer, sense, evaluation-frame, evaluator, and normal-form positions;
* **(A)** repair paths for bearer-kind mismatches: explicit narrowing, `KindBridge`, and/or explicit `retargetBearer(...)`;
* **(L)** qualifier expectations for `scope`, `Γ_time`, `viewpoint`, `view`, `referencePlane`, `refScheme`, `reprScheme`, `representationSubstrate`, and `bridgeRef`;
* **(D)** qualifier-placement discipline: frame/scope/time MUST NOT be smuggled into adjectives such as *high-quality*;
* **(A/E)** witness discipline for decision/publication lanes;
* **(L/A)** admissible semantic change classes and their edition-fence expectations;
* **(A/E)** cross-context / cross-plane policy when actual reuse is claimed (Bridge id + CL/loss-note policy).

Each in-scope occurrence SHALL be representable as a pattern-specific **QualifiedRelationRecord**:

```text
evaluativeAscriptionRecord :=
⟨
  relationKind            : evaluativeAscription,
  bearerTuple             : …,
  qualitySense            : QualitySense,
  evaluationFrame         : …,
  evaluator?              : …,
  viewpoint?              : U.Viewpoint,
  view?                   : U.View,
  referencePlane?         : ReferencePlane,
  refScheme?              : U.ReferenceScheme,
  reprScheme?             : U.RepresentationScheme,
  normalForm              : SignalPack | Characteristic | Bundle | Objective,
  scope?                  : U.Scope,
  Γ_time?                 : U.GammaTimePolicy,
  representationSubstrate?: embodied-kinesthetic | latent-distributed | symbolic-local | hybrid,
  bridgeRef?              : BridgeId,
  witnesses?              : EvidenceRefSet
⟩
```

So the sentence “X has quality” is never accepted as a terminal form.
It must be rewritten either into an explicit endpoint-owned evaluative form or into an explicit `evaluativeAscription(...)` transitional record with declared routing to that endpoint.

**Discipline note.**
`QualitySense` is a **slot value inside** the transitional relation family; it is not a replacement for endpoint ownership.
The stable intermediate lens is the ascription relation; the sense token refines **what kind of evaluative ascription** is being made while the endpoint target remains explicit.

**Separation note.**
`evaluator` and `viewpoint` are not synonyms.
When both matter, they SHALL be published separately: the evaluator is the observing / criticising / selecting party or policy, while the viewpoint is the declared `U.Viewpoint` under which the ascription is presented.
#### Polarity discipline (bearer-centred; no silent inverse)

`evaluativeAscription` is bearer-centred.
Tech / normative prose SHALL keep the evaluated participant in the bearer position and SHALL publish evaluator/viewpoint separately.

* “Architects rate the system highly” rewrites to `evaluativeAscription(bearer=System, evaluator=ArchitectureReviewBoard, …)`.
* “The benchmark says model quality is high” rewrites to `evaluativeAscription(bearer=Model, evaluator=BenchmarkPolicy, …)`.

There is no inverse token that silently makes the evaluator the bearer.
If inverse wording is used in Plain prose, authors SHALL rewrite it into the bearer-centred form (or mint an explicit inverse RelationKind token and publish its polarity contract).
#### Endpoint-first discipline

When the lawful endpoint owner is already known, authors SHOULD publish the endpoint-owned evaluative form directly and use `evaluativeAscription(...)` only when preserving the transitional ambiguity is itself informative. `evaluativeAscription(...)` is therefore a routing record, not a shadow endpoint owner.

Typical direct endpoints are:

* engineering `-ility` heads published as one `Characteristic` or one `Q-Bundle`,
* selector-context uses published as an `Objective` headed by `QS.UseValue` unless overridden explicitly,
* architecture-description uses published under the description-side evaluative head already selected by the viewpoint bundle,
* explanatory-merit uses published under the explicit merit bundle when that bundle head is already known.
#### Core construct: QualitySense

Every in-scope use SHALL resolve to an explicit **`QualitySense` token**.

A `QualitySense` token publishes at least:

```text
QualitySense :=
  ⟨
    senseId,
    bearerArity,
    articulationMode,
    representationSubstrate,
    defaultNormalForm,
    admissibleNormalForms,
    evaluationFrameKind,
    admissibleEvidenceModes,
    admissibleChangeClasses,
    bridgePolicy
  ⟩
```

Where:

* **`articulationMode`** ∈
  `{ preconceptual, exemplar-grounded, proxy-grounded, characteristic-bound, bundle-bound, objective-bound }`
* **`representationSubstrate`** ∈
  `{ embodied-kinesthetic, latent-distributed, symbolic-local, hybrid }`
* **`defaultNormalForm`** ∈
  `{ SignalPack, Characteristic, Bundle, Objective }`
* **`admissibleNormalForms`** is the explicitly declared set of lawful publication forms for the sense.
  `defaultNormalForm` names the primary publication form; any additional forms MUST be declared here rather than inferred ad hoc.
#### Normative starter set of sense families

A Context MAY add local senses, but the following starter set is normative as the initial disambiguation menu:

| `QualitySense` token               | Use when “quality” means…                                                                                      | Default normal form | Typical substrate                | Must **not** be silently collapsed into                                    |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------: | -------------------------------- | -------------------------------------------------------------------------- |
| `QS.PreconceptualFit`              | preconceptual fit, felt rightness, “quality before definition”, kinesthetic/embodied salience                |         `SignalPack` | `embodied-kinesthetic` or `hybrid` | Characteristic, utility, fitness score                                     |
| `QS.PhenomenalCharacter`           | phenomenal character / qualia / felt characteristic when the experienced quality itself is described          |         `SignalPack` | `embodied-kinesthetic` or `hybrid` | `QS.PreconceptualFit`, engineering quality, utility                        |
| `QS.LatentFit`                     | distributed fit/tension in learned representations, world models, probes, prediction structures              |         `SignalPack` | `latent-distributed` or `hybrid` | `QS.PreconceptualFit`, engineering quality, explanatory merit              |
| `QS.ExplanatoryMerit`              | epistemic merit of an explanation, conjecture, problem frame, or theory                                      |             `Bundle` | `symbolic-local` or `hybrid`     | engineering `-ilities`, use-value                                          |
| `QS.ArchitecturalDescriptionFitness` | task-fit / compression merit of an architecture description, architecture model, or viewpoint bundle as a description of structure for downstream reasoning |             `Bundle` | `symbolic-local` or `hybrid`     | `QS.EngineeringQualityFamily`, `QS.ExplanatoryMerit`, publication polish   |
| `QS.EngineeringQualityFamily`      | reliability/availability/security/maintainability/evolvability/usability/etc.                                |             `Bundle` | `symbolic-local` or `hybrid`     | function/capability statements, preconceptual fit                          |
| `QS.UseValue`                      | usefulness of a candidate under a declared goal/CG-frame; the “Q” head in NQD/QD by default                  |          `Objective` | `symbolic-local` or `hybrid`     | engineering quality family, explanatory merit                              |
| `QS.ControlAdequacy`               | adequacy of a policy/model/controller in a closed action loop                                                |             `Bundle` | `hybrid`                         | bare model “quality”, felt fit                                             |

**Default-form note.**
`QS.EngineeringQualityFamily` and `QS.ControlAdequacy` default to `Bundle`.
A local Context MAY operationalize one explicit head as a `Characteristic`, but that is a declared operationalization, not a second default normal form.

**Normative rewrite note.**

* In **NQD / QD / selector** contexts, bare *quality* SHALL rewrite to **`QS.UseValue`** unless a different `QualitySense` is explicitly declared.
* In **engineering** contexts, bare *quality* SHALL rewrite either to:

  * one explicit **`U.Characteristic` + CSLC Scale**, or
  * one explicit **`Bundle`**, preferably authored as a **`Q-Bundle`** when composite.
* In **phenomenological** contexts, bare *quality* SHALL rewrite to **`QS.PhenomenalCharacter`** when the experienced quality itself is the topic of description, and to **`QS.PreconceptualFit`** when the talk is about preconceptual fit / felt rightness before stable characterisation.
* In **representation-learning / world-model** contexts, bare *model quality* SHALL rewrite to **`QS.LatentFit`** and/or **`QS.ControlAdequacy`**, with the distinction made explicit.
* In **epistemic evaluation** contexts, “good explanation” SHALL rewrite to **`QS.ExplanatoryMerit`**.
* In **architecture-description / viewpoint** contexts, bare *architecture quality* / *architectural quality* SHALL first disambiguate the bearer lane: if the bearer is the described system, route to **`QS.EngineeringQualityFamily`**; if the bearer is the description/episteme, route to **`QS.ArchitecturalDescriptionFitness`**.
#### Required slots for a conforming evaluativeAscription

A conforming `evaluativeAscription` SHALL make explicit:

1. **Bearer tuple.**
   What is being evaluated, with arity explicit.

2. **`QualitySense`.**
   Which evaluative family is intended.

3. **Evaluation frame.**
   The criterion-basis under which the ascription is made.
   Examples: exemplar pack, probe pack, criticism/test pack, Q-bundle definition, CG-frame, acceptance spec, control horizon.

4. **Evaluator or viewpoint.**
   State the evaluator (observer, critic, selector policy, stakeholder family, or review body) and, when relevant, the `U.Viewpoint`, separately.
   The two SHALL NOT be silently collapsed when they differ.

5. **Normal form.**
   Whether the ascription is published as `SignalPack`, `Characteristic`, `Bundle`, or `Objective`.

6. **Scope and time when relevant.**
   The relevant USM scope (`U.ClaimScope`, `U.WorkScope`, `U.PublicationScope`, or generic `U.Scope`) and `Γ_time` SHALL be explicit when omission changes meaning.
   Freshness windows, qualification windows, or evidence decay windows SHALL be declared in the appropriate evidence or capability lane rather than smuggled into “quality” as an adjective.

7. **Reference plane when relevant.**
   Especially when the same surface phrase can refer to the described entity, its description, its carrier, or a publication face under a different `ReferencePlane`.

8. **Reference / representation scheme when relevant.**
   Especially when the ascription depends on a declared reference scheme, representation scheme, or viewpoint-specific decoding convention.

9. **Representation substrate when relevant.**
   Especially when discussing parallels between preconceptual, latent-distributed, and symbolic-local treatments.

10. **Witness / evidence mode.**
   Exemplars, probes, measurements, bundle members, tests, traces, or closed-loop performance carriers.
#### Normal-form discipline

A `QualitySense` SHALL declare one lawful **default** normal form and MAY declare additional admissible normal forms explicitly.

**QNF-1 — `SignalPack`.**
Use for `QS.PhenomenalCharacter`, `QS.PreconceptualFit`, and many cases of `QS.LatentFit`.

A conforming `SignalPack` publishes:

* exemplar/contrast set or probe set,
* articulation notes,
* source episode / carrier / observer,
* optional ordinal or thresholded summaries,
* explicit warning that the signal is **not** yet a `Characteristic` unless a lawful proxy is later declared.

**QNF-2 — `Characteristic`.**
Use only when the sense is truly one measurable characteristic on one declared scale.
This routes through **A.17/A.18/C.16** and inherits full scale legality.

**QNF-3 — `Bundle`.**
Use when the sense is composite.
Typical for `QS.ExplanatoryMerit`, many engineering quality families, and `QS.ControlAdequacy`.

A conforming bundle publishes:

* member heads,
* whether each head is Characteristic / status / mechanism / scope / test,
* aggregation policy if any,
* prohibition on hidden scalarisation.

**Engineering note.**
For engineering `-ility` families, the preferred bundle form is **`Q-Bundle`** (C.25), because it keeps **Measures[CHR]** distinct from **ClaimScope/WorkScope** and from **Mechanisms/Status**.
`Q-Bundle` is a **C.25 authoring profile of `Bundle`**, not a fifth normal form beside `SignalPack | Characteristic | Bundle | Objective`.
Do not publish a free-floating bundle with hidden metric semantics.

**QNF-4 — `Objective`.**
Use for `QS.UseValue` in selection/generation/search contexts.

A conforming objective publishes:

* CG-frame / objective owner,
* admissible comparators,
* acceptance / selector policy,
* reference plane and window,
* relation to novelty/diversity/constraints.
#### Functional vs quality-family discipline

A.6.Q SHALL prevent the collapse of **function/capability** claims into **quality-family** claims.

* A statement about **what a system does** belongs to functional/procedural description.
* A statement about **how well / how safely / how robustly / how maintainably** it does so belongs to `QS.EngineeringQualityFamily`.
* “Quality characteristic” and “functional characteristic” SHALL NOT be used as interchangeable labels.
* In engineering contexts, `-ility` names are **quality-family labels**, not automatically Characteristics.
  They become lawful only as one explicit `U.Characteristic` or one explicit `Bundle` (preferably authored as `Q-Bundle` when composite).
* Cross-references are allowed; category collapse is not.
#### Bridge discipline across traditions

Whenever two different traditions are compared using the word *quality*, the author SHALL publish an explicit **bridge stance** and loss note.

Allowed bridge stances:

* **`localRename`** — near-synonymous within one Context.
* **`operationalizes`** — one sense is turned into a proxy or measurable form.
* **`partialAnalogy`** — structurally similar but not identical.
* **`projection`** — one richer sense is projected into a narrower evaluative frame.
* **`nonEquivalent`** — same word, no lawful bridge asserted.

Examples:

* `QS.PreconceptualFit` - `QS.LatentFit` is usually `partialAnalogy`, not identity.
* `QS.PreconceptualFit` - `QS.PhenomenalCharacter` is usually a progression-by-articulation relation, not identity.
* `QS.PreconceptualFit` > engineering measures is usually `operationalizes` or `projection`, with loss notes.
* `QS.EngineeringQualityFamily` > `QS.UseValue` is usually `projection` under a CG-frame.
* `QS.ExplanatoryMerit` - `QS.UseValue` is **not** identity unless a Context explicitly defines such a projection.
* Pirsig-style **dynamic quality** usually routes to `QS.PreconceptualFit` (sometimes `QS.LatentFit`) only as `localRename` / `partialAnalogy` under a declared Context; it is not identity by label.
* Pirsig-style **static quality** usually routes to `Characteristic` / `Bundle` publication under some other declared sense; it is not identity with dynamic quality.
* `QS.ArchitecturalDescriptionFitness` - `QS.EngineeringQualityFamily` is usually `projection` or `nonEquivalent` unless the Context explicitly states which heads of description-fitness are intended to proxy which system-side characteristics.
#### Change lexicon

A conforming pattern SHALL narrate changes with a stable change lexicon aligned to A.6.P:

* **`declareevaluativeAscription(...)`** — create a new explicit quality ascription record.
* **`withdrawevaluativeAscription(...)`** — retire a prior record.
* **`retargetBearer(...)`** — change the evaluated bearer tuple while keeping the same relation family.
* **`reviseSense(...)`** — change the value in the `qualitySense` slot.
* **`reArticulate(...)`** — change `articulationMode` while preserving sense family.
* **`reProxy(...)`** — change proxy/probe/operationalisation details.
* **`reBundle(...)`** — change bundle members or aggregation policy.
* **`reScale(...)`** — change characteristic scale or scale type.
* **`reFrame(...)`** — change evaluation frame.
* **`reView(...)`** — change evaluator/viewpoint.
* **`rescope(...)`** — change `U.Scope`.
* **`retime(...)`** — change `Γ_time`.
* **`refreshWitnesses(...)`** — refresh evidence or witness bindings.
* **`changeRelationKind(...)`** — semantic move to a different relation family; never edit in place silently.

A silent **sense rewrite** is a breaking semantic change.
If the ascription ceases to mean “quality ascription” at all, use `changeRelationKind(...)` rather than pretending the same record survived unchanged.

**A.6.P rewrite note.**
`retargetBearer(...)` is the family-specific form of `retargetParticipant(BearerSlot, …)`.
`reviseSense(...)`, `reArticulate(...)`, `reProxy(...)`, `reBundle(...)`, `reScale(...)`, `reFrame(...)`, and `reView(...)` are family-specific refinements of `reviseByValue(...)` and SHALL preserve the A.6.5 distinction between ref retargeting and by-value edits.
#### A.6.B routing template for evaluativeAscription

When a repaired quality statement becomes boundary-bearing, route it explicitly:

* **L** — `evaluativeAscription` contract skeleton, `QualitySense` semantics, normal-form lawfulness, and declared bridge stances;
* **A** — admissibility conditions for using the ascription in selector / gating / publication lanes (required qualifiers, witnesses, thresholds, qualification windows);
* **D** — author / publisher obligations (lexical firewall, mandatory rewrites, publication duties);
* **E** — carrier-anchored evidence/work effects (measurements, traces, critique sheets, probe packs, selector logs).

Where this family is published as a reusable boundary surface, authors SHOULD materialize stable `L-Q*` / `A-Q*` / `D-Q*` / `E-Q*` claim ids (or explicitly cite the reused routed claim set by location) and SHALL avoid paraphrase drift across quadrants.
Do not let the bare word *quality* carry L/A/D/E force by itself.
#### Lexical guardrails

In **Tech / normative prose**:

* bare **quality** MUST NOT appear without immediate resolution to a `QualitySense`;
* **high-quality / low-quality / quality metric / quality score / quality requirement / model quality / architecture quality / solution quality** are red-flag tokens;
* **quality characteristic** MAY appear only as:

  * a bridge label to an external standard/tradition, or
  * a family label immediately rewritten into one explicit `U.Characteristic` or `Q-Bundle`;
* **quality requirement / quality requirements** MUST NOT remain bare noun phrases; authors SHALL rewrite them into explicit `RequirementRole` / `U.Commitment` / `U.PromiseContent.acceptanceSpec` structures over one named `U.Characteristic`, one `Q-Bundle` head, or one explicit objective head;
* **architecture quality / architectural quality** MUST NOT appear without an explicit bearer lane (`Object | Description | Carrier`) and, when omission changes meaning, an explicit `referencePlane`;
* in QD/NQD contexts, bare **quality** MUST default to **`QS.UseValue`**;
* preconceptual uses MUST NOT be presented as if they were already Characteristics;
* latent/distributed fit MUST NOT be presented as if it were automatically explanatory merit;
* if the occurrence is primarily **affordance / action-invitation** talk, authors MUST NOT force a `QualitySense`; they SHALL exit to the appropriate relation family;
* scope words (*applicability*, *envelope*, *generality*, *validity*) MUST NOT be used as hidden substitutes for `U.Scope`, `U.ClaimScope (G)`, or `U.WorkScope`;
* quoted metalinguistic uses of the token *quality* are allowed, but SHALL be marked as **token-under-discussion**, not as a contract-bearing term.
#### Progressive elaboration

A.6.Q supports monotone elaboration:

1. Start by selecting a **`QualitySense`** and capturing rival candidates when ambiguity is live.
2. Declare bearer, frame, viewpoint, and substrate.
3. Choose a lawful **normal form**.
4. Add exemplars / probes / characteristic heads / bundle members / objective pins.
5. Add bridges and loss notes if comparing traditions.
6. If the repaired sentence is boundary-bearing, emit `L/A/D/E` routing hooks rather than letting “quality” carry them implicitly.
7. Never move between sense families silently.
### Archetypal Grounding

#### Tell

If a draft says *quality*, the author has not yet named the evaluative family.
A conforming rewrite publishes either one explicit endpoint-owned evaluative form or one explicit `evaluativeAscription(...)` transitional record with one `QualitySense`, one bearer tuple, one evaluation frame, one evaluator/viewpoint, one lawful normal form, explicit scope/time/bridge qualifiers when they matter, and declared routing toward the target endpoint owner.
#### Show (System lane)

**Draft:** “The model quality improved.”

**Repair A — latent representation line**
`evaluativeAscription(
  bearer = Model_v5,
  qualitySense = QS.LatentFit,
  evaluationFrame = ProbePack_PP2,
  evaluator = RepLearningReviewBoard,
  normalForm = SignalPack,
  Γ_time = Window_W5,
  witnesses = {ProbeSeparationRun_22, AliasRiskCard_9}
)`

**Repair B — closed-loop control line**
`evaluativeAscription(
  bearer = PolicyModelPair_PM5,
  qualitySense = QS.ControlAdequacy,
  evaluationFrame = Horizon_H × EnvClass_E,
  evaluator = ControlReviewBoard,
  viewpoint = ControlView_VP,
  normalForm = Bundle,
  scope = U.WorkScope(ControlDeploymentScope_7),
  Γ_time = RunWindow_RW,
  witnesses = {ClosedLoopTraceSet_41}
)`
#### Show (Episteme lane)

**Draft:** “Quality matters before definition.”

**Repair A — preconceptual / phenomenological line**
`evaluativeAscription(
  bearer = ProblemFramingEpisode_PF3,
  qualitySense = QS.PreconceptualFit,
  evaluationFrame = ExemplarPack_EP3,
  evaluator = ReviewerGroup_A,
  normalForm = SignalPack,
  representationSubstrate = embodied-kinesthetic,
  witnesses = {EpisodeNotes_3}
)`

**Repair B — explanatory line**
`evaluativeAscription(
  bearer = Explanation_N5,
  qualitySense = QS.ExplanatoryMerit,
  evaluationFrame = CriticismBundle_CB4,
  evaluator = TheoryReviewPanel,
  referencePlane = epistemic,
  normalForm = Bundle,
  witnesses = {CritiqueSheet_14, CounterexampleSet_2}
)`
#### Show (Architecture description lane)

**Draft:** “The architecture quality improved.”

**Repair A — quality of the described system**
`evaluativeAscription(
  bearer = PaymentPlatform_v4,
  qualitySense = QS.EngineeringQualityFamily,
  evaluationFrame = Q_Bundle_AvailabilitySecurityEvolvability_3,
  evaluator = ArchitectureReviewBoard,
  viewpoint = TEVB_ArchitectureViewpointSet,
  referencePlane = world/external,
  normalForm = Bundle,
  witnesses = {AvailabilityReport_8, CouplingCheck_3, EvolvabilityNote_2}
)`

**Repair B — quality of the architecture description**
`evaluativeAscription(
  bearer = ArchitectureDescription_AD12,
  qualitySense = QS.ArchitecturalDescriptionFitness,
  evaluationFrame = ViewpointBundle_TEVB × DecisionQuestionSet_DQ7,
  evaluator = ArchitectureReviewBoard,
  viewpoint = TEVB_ArchitectureViewpointSet,
  referencePlane = epistemic,
  normalForm = Bundle,
  witnesses = {CoverageMatrix_4, CorrespondenceCheck_7, ViewConsistencyNote_2}
)`
#### Show (QD / selector lane)

**Draft:** “Quality in our QD loop.”

**Repair**
`evaluativeAscription(
  bearer = Candidate_7,
  qualitySense = QS.UseValue,
  evaluationFrame = CG_Frame_9,
  evaluator = SelectorPolicy_P4,
  normalForm = Objective,
  Γ_time = SelectionWindow_SW,
  witnesses = {ObjectiveCard_9, AcceptanceSpec_4}
)`
### Bias-Annotation

Lenses tested: **Gov**, **Arch**, **Onto/Epist**, **Prag**, **Did**. Scope: **Universal** for overloaded evaluative uses of *quality* in FPF prose.

* **Gov bias:** this pattern favors explicit evaluative publication and explicit routing hooks, which improves auditability but adds authoring overhead.
* **Arch bias:** this pattern prefers one stable ascription relation over free-form philosophical prose, which improves reuse but can feel rigid in exploratory notes.
* **Onto/Epist bias:** this pattern refuses to collapse preconceptual, latent, explanatory, engineering, and selector senses into one concept; that increases honesty at the cost of extra lexical work.
* **Prag bias:** this pattern defaults QD/NQD uses toward `UseValue`, which improves selector clarity but can feel narrower than colloquial “quality”.
* **Did bias:** this pattern is intentionally teachable through repeated rewrites; the risk is over-formalizing early exploratory language.
### Conformance Checklist (CC-A.6.Q)

A text or pattern conforms to A.6.Q iff:

1. **CC-A.6.Q-1 - Explicit endpoint routing and explicit sense.**
   Every in-scope use of *quality* resolves either to one declared endpoint-owned evaluative form or to one declared `evaluativeAscription(...)` transitional record with one declared `QualitySense` and explicit endpoint routing.
2. **CC-A.6.Q-2 - Explicit bearer and arity.**
   The evaluated bearer tuple is explicit.

3. **CC-A.6.Q-3 - Explicit frame.**
   Evaluation frame is explicit and reviewable.

4. **CC-A.6.Q-4 - Evaluator/viewpoint is explicit.**
   The ascription states who evaluates, from which viewpoint, or under which selector/observer policy.

5. **CC-A.6.Q-5 - Substrate and referencePlane are declared when relevant.**
   Cross-talk between preconceptual, latent-distributed, symbolic-local, and world/concept/epistemic uses is not allowed without an explicit substrate and/or `referencePlane` declaration when those distinctions are live.

6. **CC-A.6.Q-6 - Scope and `Γ_time` are explicit when omission changes meaning.**
   If scope or time selection affects interpretation, the ascription declares `U.Scope` and/or `Γ_time` explicitly.

7. **CC-A.6.Q-7 - Lawful normal form.**
   The ascription is published as `SignalPack`, `Characteristic`, `Bundle`, or `Objective`, with the corresponding discipline observed.

8. **CC-A.6.Q-8 - No illegal scalarisation.**
   Composite senses are not collapsed into one score without an explicit scoring method.

9. **CC-A.6.Q-9 - No silent sense rewrite.**
   Any semantic change in the ascription uses the declared change lexicon; changing sense silently is forbidden.

10. **CC-A.6.Q-10 - QD default.**
   In search/selection/NQD contexts, *quality* resolves to `QS.UseValue` unless overridden explicitly.

11. **CC-A.6.Q-11 - Engineering family discipline.**
   Engineering `-ility` uses resolve to one explicit `U.Characteristic` or one explicit `Bundle` (preferably authored as `Q-Bundle` when composite); they are not left as free-floating adjectives.

12. **CC-A.6.Q-12 - Functional separation.**
    Function/capability claims remain distinct from quality-family claims.

13. **CC-A.6.Q-13 - Bridge accountability.**
    Cross-tradition parallels publish bridge stance and loss notes; cross-context or cross-plane reuse cites explicit Bridge ids and CL policy where applicable.

14. **CC-A.6.Q-14 - Boundary-routing hook when needed.**
    If a repaired quality ascription is used for admissibility, commitments, publication, or adjudication, the downstream `L/A/D/E` hooks are explicit rather than carried implicitly by the word *quality*.

15. **CC-A.6.Q-15 - Lexical firewall.**
    Bare *quality* is absent from Tech/normative prose except as quoted metalinguistic discussion.

16. **CC-A.6.Q-16 - `evaluativeAscription` contract skeleton is published.**
    The family-specific `RelationKind` token `evaluativeAscription` resolves to a contract skeleton that publishes polarity, participant SlotSpecs, qualifier expectations, repair paths for bearer-kind mismatches, witness discipline, admissible change classes, and cross-context/plane policy.

17. **CC-A.6.Q-17 - Candidate-Set Note is used when ambiguity is live.**
    If sense selection, bearer facet, or A.7 lane (`Object | Description | Carrier`) is non-obvious, the text records a short Candidate-Set Note before the rewrite is treated as decision-bearing or publication-bearing.

18. **CC-A.6.Q-18 - Evaluator and viewpoint are not silently collapsed.**
    When both an evaluator and a `U.Viewpoint` matter, they are represented as separate slots or fields.

19. **CC-A.6.Q-19 - Family-specific change verbs dock cleanly with A.6.P / A.6.5.**
    `retargetBearer(...)` is used only for ref retargeting; sense/frame/bundle/scale/view edits are narrated as explicit by-value revisions; silent retyping is forbidden.
### Common Anti-Patterns and How to Avoid Them

| Anti-pattern | Symptom | Why it fails | How to avoid / repair |
| --- | --- | --- | --- |
| **Magic scalar quality** | one number silently stands for several evaluative families | collapses senses, carriers, and scoring legality | publish one explicit `QualitySense` and a lawful normal form |
| **Preconceptual-as-metric** | felt fit is presented as if it were already a measured characteristic | erases articulation stage and overstates evidence | keep it as `SignalPack` until a lawful proxy is declared |
| **Engineering adjective drift** | *reliable / maintainable / high-quality* appear with no explicit Characteristic or Q-Bundle | hides measurement shape and scope | rewrite to one `U.Characteristic` or one `Q-Bundle` |
| **Selector ambiguity** | *quality in QD/NQD* is left undefined | breaks comparability and selection semantics | default to `QS.UseValue` unless another objective head is declared explicitly |
| **Model-quality collapse** | latent fit, explanatory merit, and control adequacy are merged under one phrase | destroys carrier and frame distinctions | split into separate `evaluativeAscription(...)` records |
| **Architecture-vs-description collapse** | *architecture quality* is used with no explicit bearer lane | collapses the described system into its description/carrier/publication face | publish the bearer lane explicitly and route to `QS.EngineeringQualityFamily` or `QS.ArchitecturalDescriptionFitness` |
| **Affordance-as-quality** | action invitations are narrated as if they were evaluations | wrong relation family; the rewrite hides action semantics instead of clarifying them | stop the Q-rewrite and `changeRelationKind(...)` into the appropriate affordance/action-invitation family |
| **Bridge-by-label** | two traditions both use *quality*, so the draft implies they are the same | creates false identity and silent loss | publish one bridge stance with loss notes |
### Consequences

**Benefits.**
This pattern makes evaluative language auditable across phenomenology, engineering, and search/selection contexts.
It also makes later lexical migration easier because the repair is carried by one explicit relation family rather than by ad hoc prose rules.

**Trade-offs / mitigations.**
The pattern adds authoring overhead and can feel heavy in exploratory notes.
Mitigation: allow bare *quality* in Plain commentary during exploration, but require repair before the term enters Tech/normative, boundary, selector, or assurance surfaces.
### Rationale

A.6.Q makes one strategic move:

> **The word “quality” is not treated as one concept. It is treated as a family of evaluative ascriptions whose members differ by substrate, articulation mode, bearer, frame, and lawful publication form.**

This lets FPF discuss:

* Pirsig-like preconceptual fit,
* representation-learning and neuro-symbolic latent fit,
* explanation quality in criticism-driven inquiry,
* architecture-description fitness under a viewpoint,
* engineering quality families,
* use-value in open-ended evolution,
* control adequacy in action loops,

without forcing them into one false universal scalar.

It also makes the distributed-vs-local issue explicit:

* some senses originate in **embodied** or **latent-distributed** substrates,
* some are only publishable as **symbolic-local** CHR/bundle/objective forms,
* and some require an explicit **projection** from the first into the second.

It also makes the bearer/plane issue explicit:

* some uses evaluate the **described entity**,
* some evaluate its **description** under a viewpoint,
* some evaluate a **carrier** or **publication face**,
* and those readings must not be collapsed without an explicit bearer lane and, when needed, a declared `referencePlane`.

That is exactly where semantic drift usually starts; A.6.Q turns that drift into an auditable design choice.
### SoTA-Echoing

**Evidence binding note.** If your Context maintains a **SoTA Synthesis Pack** for evaluative language, architecture-quality vocabularies, selector/objective semantics, world-model evaluation, or embodied/preconceptual articulation, this section **SHALL cite** its ClaimSheet IDs / CorpusLedger entries / BridgeMatrix rows and keep the adoption stances below consistent with those IDs. Otherwise, treat the table below as the source-of-truth seed list for this pattern revision.

This section follows the required craft: **claim > practice > source > alignment > adoption status**. A.6.Q aligns with contemporary practice across architecture-description standards, software-quality standards, evolutionary architecture, QD search, active inference/world-model research, phenomenology/TAE, affordance theory, and philosophy of explanation—while making one explicit FPF move that those traditions usually leave implicit: the overloaded token *quality* is repaired into explicit evaluative endpoint forms, with `evaluativeAscription(...)` available as a declared transitional record carrying `QualitySense`, bearer, frame, lawful normal form, and bridge stance while routing remains open.

| Claim (A.6.Q need) | SoTA practice (post-2015) | Primary source (post-2015) | Alignment with A.6.Q | Adoption status |
|---|---|---|---|---|
| Description-side quality must not be confused with system-side quality. | Contemporary architecture-description practice distinguishes the **entity of interest** from the **architecture description** and structures discourse through viewpoints, concerns, and model kinds. | ISO/IEC/IEEE 42010:2022, *Software, systems and enterprise — Architecture description*. | A.6.Q mirrors this split by separating `QS.ArchitecturalDescriptionFitness` from system-side `QS.EngineeringQualityFamily`, and by requiring an explicit bearer lane plus `referencePlane` when phrases such as *architecture quality* appear. | **Adopt/Adapt.** Adopt the entity-vs-description split; adapt by making lexical repair and bearer-lane publication mandatory. |
| Engineering “quality” should resolve to explicit heads, not free adjectives. | Contemporary systems/software quality practice works through named **characteristics** and **subcharacteristics** used to specify, measure, and evaluate quality, and to define acceptance criteria and requirements. | ISO/IEC 25010:2023, *Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — Product quality model*. | A.6.Q adopts the explicit-head discipline by routing engineering uses either to one lawful `Characteristic` or to one explicit `Bundle` / `Q-Bundle`, and by refusing to leave *quality requirement(s)* as bare noun phrases. | **Adopt/Adapt.** Adopt explicit quality heads; adapt by treating composite families as bundles rather than pretending that every family label is already a scalar. |
| Evolutionary architecture needs continuously checked heads rather than generic “quality”. | Evolutionary-architecture practice uses **fitness functions** to drive, manage, and automate change across architectural concerns, and ties structure to the capacity to support change. | Ford, Parsons, Kua, Sadalage (2022), *Building Evolutionary Architectures*, 2nd ed. | A.6.Q aligns by treating engineering quality families and change-support concerns as explicit evaluative heads under declared frames, not as one rhetorical “high quality” scalar. | **Adopt/Adapt.** Adopt the fitness-function discipline; adapt by keeping `QS.EngineeringQualityFamily`, `QS.ControlAdequacy`, and `QS.UseValue` distinct and by forbidding function/quality-family collapse. |
| In QD / NQD / selector settings, “quality” is an objective head under a declared search frame. | Modern QD work is explicit that search returns a **collection** of solutions that are high with respect to an objective and diverse with respect to declared measures / behavior descriptors; the archive is not a synonym for one hidden global score. | Fontaine, Togelius, Nikolaidis, Hoover (2020), *Covariance matrix adaptation for the rapid illumination of behavior space*; Fontaine & Nikolaidis (2023), *Covariance Matrix Adaptation MAP-Annealing*. | A.6.Q therefore defaults selector-context *quality* to `QS.UseValue` in `Objective` form, while keeping novelty/diversity/constraints explicit and separate. | **Adopt/Adapt.** Adopt objective-explicit selector semantics; adapt by making the Q-head a named `QualitySense` and by rejecting unexplained scalar collapse. |
| Latent fit, world-model adequacy, and closed-loop control must not collapse into one phrase. | Contemporary world-model and active-inference work evaluates generative/predictive models, planning, action, uncertainty reduction, and intrinsic objectives in explicitly multi-layered terms rather than through one undifferentiated “model quality”. | Parr, Pezzulo, Friston (2022), *Active Inference: The Free Energy Principle in Mind, Brain, and Behavior*; LeCun (2022), *A Path Towards Autonomous Machine Intelligence*; Friston et al. (2024), *Designing Ecosystems of Intelligence from First Principles*. | A.6.Q adapts this by separating `QS.LatentFit`, `QS.ControlAdequacy`, and `QS.UseValue`, and by requiring explicit evaluation frames and witnesses for each ascription. | **Adapt.** Adapt multi-layer evaluation into one repair discipline; reject the colloquial habit of letting *model quality* silently cover representation, prediction, control, and utility at once. |
| Preconceptual felt fit should remain pre-metric until lawfully articulated. | TAE-style practice treats felt dimensions of thinking as something that can be clarified progressively with tentative language that stays responsive to lived experience and widens conceptual structure. | Schoeller (2022), *Thinking at the Edge in the context of embodied critical thinking: Finding words for the felt dimension of thinking within research*. | A.6.Q uses this as direct support for `QS.PreconceptualFit` in `SignalPack` form, with exemplars, articulation notes, and an explicit ban on premature promotion to `Characteristic`. | **Adopt/Adapt.** Adopt progressive articulation from felt sense to wording; adapt by giving that articulation a lawful publication form and explicit witness discipline. |
| Some trigger uses of “quality” are really about action invitation, not evaluative ascription. | Recent affordance work treats affordances as perceptually available action possibilities, and in some accounts as invitations or action-guiding structures that position the agent to act. | Hansen (2024), *Perceiving affordances and the problem of visually indiscernible kinds*; Jorba & Lopez-Silva (2024), *Mind in action: expanding the concept of affordance*. | A.6.Q adopts this as an explicit carve-out: when the trigger use is primarily affordance / action-invitation talk, the lawful move is to `changeRelationKind(...)` out of `evaluativeAscription` rather than forcing an evaluative reading. | **Adopt/Adapt.** Adopt the action-guiding insight; adapt by making relation-family exit explicit and auditable. |
| Explanation quality is an epistemic merit family, not engineering quality or selector utility. | Contemporary philosophy of explanation treats understanding, explanatory value, and the cognitive significance of explanations as a distinct epistemic topic. | Khalifa (2017), *Understanding, Explanation, and Scientific Knowledge*. | A.6.Q therefore treats explanatory evaluation as `QS.ExplanatoryMerit`, typically `Bundle`-shaped, and rejects silent collapse into engineering `-ilities`, bare usefulness, or one unexplained “high-quality explanation” score. | **Adapt.** Adapt explanatory-value practice into a slot-explicit evaluative family; reject cross-family scalarization by label. |

**Short alignment notes.**

**Architecture-description practice.** ISO 42010 is the clearest contemporary guard against collapsing the described entity into its description. A.6.Q adopts that guardrail and strengthens it lexically: a draft may not say *architecture quality* without publishing which bearer lane is under evaluation and whether the evaluation is description-side or system-side.

**Engineering quality practice.** ISO 25010 gives a mainstream reason not to leave *quality* as a free noun: contemporary quality work is organized around named characteristics and subcharacteristics that are specified, measured, and evaluated. A.6.Q adopts that explicit-head discipline, but adapts it by routing composite cases to `Bundle` / `Q-Bundle` and by treating *quality requirement(s)* as requirements over explicit heads rather than as self-standing nouns.

**Evolutionary-architecture practice.** Fitness functions treat architecture-relevant concerns as continuously monitored heads tied to change and governance, not as one mystical scalar. A.6.Q adopts that operational spirit, but adapts it by keeping engineering-family evaluation, control adequacy, and selector value distinct and by forbidding function/quality-family collapse.

**QD / NQD practice.** Modern QD work is explicit that search returns a collection of solutions that are high with respect to an objective and diverse with respect to declared measures. A.6.Q therefore adopts the default rewrite of selector-context *quality* to `QS.UseValue` in `Objective` form and rejects any rewrite that silently blends novelty, diversity, constraints, and utility into an unexplained scalar.

**World-model and active-inference practice.** Contemporary world-model and active-inference work uses generative/predictive models for perception, planning, learning, and action, which makes evaluation inherently multi-layered: latent representation quality, model evidence or predictive adequacy, policy adequacy, and task/objective value are not one thing. A.6.Q adapts this by separating `QS.LatentFit`, `QS.ControlAdequacy`, and `QS.UseValue`, and by requiring explicit evaluation frames and witnesses for each ascription.

**Phenomenology / TAE practice.** TAE-style work treats a felt sense as something that can be clarified and worded progressively, with tentative language that stays responsive to lived experience. A.6.Q adopts this progressive-articulation stance by giving `QS.PreconceptualFit` a lawful `SignalPack` form and by keeping `QS.PhenomenalCharacter` separately available when the experienced character itself—not action-guiding fit—is the topic.

**Affordance practice.** Recent affordance work emphasizes that affordances can be perceptually experienced as action possibilities that position or invite the agent to act. A.6.Q adopts that insight as a routing rule: when the trigger use of *quality* is really action-invitation talk, the author should `changeRelationKind(...)` out of `evaluativeAscription` rather than forcing an evaluative reading.

**Explanation practice.** Contemporary philosophy of explanation keeps explanatory understanding and epistemic value distinct from engineering performance or utility maximization. A.6.Q adapts this by publishing `QS.ExplanatoryMerit` as its own evaluative family—typically `Bundle`-shaped—and by rejecting hidden scalarization into “high-quality explanation” without explicit heads.

**Scale legality.** The rows above do **not** license free arithmetic on the word *quality*. Whenever A.6.Q operationalizes engineering heads, selector objectives, or control adequacy numerically, it **SHALL** bind the comparison to an explicit `ComparatorSet` / `CG-Spec` / declared aggregation policy and **SHALL** reject covert scalarization of bundles, explanations, or preconceptual signals.

**Cross-Context / plane note.** This section states alignment and non-identity only; it does **not** assert silent sameness across `U.BoundedContext`s or across planes. Any actual reuse of a quality vocabulary, selector head, or viewpoint-bound quality family across Contexts/planes **SHALL** publish `BridgeId` + `CL` / loss-note policy and, where planes differ, the relevant `Φ(CL)` / `Φ_plane` policy-ids.

**Historical-lineage note.** Earlier touchstones such as Pirsig, Popper, and Deutsch remain useful as lineage and local-gloss resources, but A.6.Q does not use them as the formal SoTA anchors here because E.8 requires post-2015 primary sources for Architectural patterns.

This SoTA alignment supports the pattern’s central move: *quality* is not one universal evaluative noun. In contemporary practice, the relevant work is already distributed across explicit characteristics, objectives, viewpoints, world-model criteria, explanatory virtues, felt signals, and action invitations; A.6.Q makes that distribution first-class and auditable.
### Relations

* **Specialises:** **A.6.P** as an RPR pattern for overloaded evaluative language centered on *quality*.
* **Builds on:** **A.2.6** for explicit scope and `Γ_time`, **A.17/A.18/C.16** for lawful measurable characteristics, **C.25** for engineering `Q-Bundle` authoring.
* **Coordinates with:** **A.6.A** for relation-family exits into action-invitation repair; **C.2.2a / A.16 / A.16.1 / A.16.2 / B.4.1** for language-state chart positions, lawful moves, early cue routing, responsibility handoff, and lawful retreat/reopen; use **A.16.0** only when lineage, branch, loss, or handoff history itself must be published as an explicit trajectory account; **B.5.2.0** for prompt-shaped continuations that are not yet stable endpoint publication; **C.2.LS / C.2.4 / C.2.5 / C.2.6 / C.2.7** for language-state facet ownership; **C.17/C.18/C.19** for `QS.UseValue`, novelty/diversity discipline, and selector policy; **E.17.0/E.17.2** for architecture-description/viewpoint bundles; **F.9 / F.9.1** for Bridges, CL, and bridge-stance annotations; **A.6.B** when repaired ascriptions become boundary-bearing.
* **Recommends publication via:** **E.10 / F.17 / F.18** when the `evaluativeAscription` contract skeleton, the `QualitySense` starter set, and the red-flag rewrites become stable shared vocabulary.

#### Language-space refactor note

This pattern uses **endpoint-first routing** rather than universal ownership of all quality language. `evaluativeAscription(...)` remains useful as a transitional repair record, but it is not the required resting place for every repaired use of `quality`.
#### Explicit endpoint routing

Lawful endpoints after repair include:
- a single `Characteristic`,
- a `Q-Bundle`,
- an `Objective`,
- an explanatory-merit bundle,
- a selector-value endpoint.

Bare `quality` on Tech surfaces should therefore be banned or routed immediately to an explicit endpoint owner. If that owner is already known, `evaluativeAscription(...)` need not remain in the published normal form.
#### Ownership boundary

This pattern does not own articulation-state axes, bridge stances, or representation axes. Those remain owned by `A.16`, `C.2.LS`, `C.2.4`, `C.2.5`, `C.2.6`, `C.2.7`, and `F.9.1`.
### A.6.Q:End
## U.ActionInvitationPrecisionRestoration - Affordance / Action-Invitation Precision Restoration (ACT-INV)

> **Type:** Architectural (A)
> **Status:** Draft
> **Normativity:** Normative (Core / Draft)

**Plain-name.** Affordance / action-invitation precision restoration.

**Intent.**
Provide a reusable discipline for repairing overloaded **affordance / action-first** language in FPF texts.

This pattern is an **A.6.P RPR specialisation** for **post-threshold** material: it turns bare action-oriented prose into one explicit, slot-explicit **action invitation** relation family with a declared **sense family**, lawful **normal forms** (`CuePack | ActionOption | OptionSet | PolicyHook`), explicit **change semantics**, and lexical guardrails.
Pre-threshold action-guiding material remains with `A.16.1` / `B.4.1` until the cue is articulated enough for `actionInvitation(...)` publication.
It does **not** mint a parallel execution ontology: whenever an invitation is articulated far enough to reference executable artifacts, publication SHALL dock to **A.15** surfaces (`U.Method`, `U.MethodDescription`, `U.WorkPlan`, and later `U.Work`) rather than inventing new action kinds by prose.

It allows ecological-psychology, phenomenological, active-inference, control-theoretic, interface, engineering-operations, and robotics uses to coexist **without false identity by label**.

**Placement.**
Part A > cluster **A.6 Signature Stack & Boundary Discipline** > specialisation of **A.6.P** for under-specified affordance / action-first language.

**Builds on.**
A.3, A.6, A.6.B, A.6.P, A.6.S, A.6.0, A.6.5, A.2.6, A.7, A.15, E.8, E.10, F.9, F.18.

**Coordinates with.**
**A.6.Q** for evaluative-language repair; **C.2.2a / A.16 / A.16.1 / A.16.2 / B.4.1** for language-state chart positions, articulation/closure coordination, lawful moves, early cue routing, responsibility handoff, and lawful retreat when a published invitation must be reopened; use **A.16.0** only when lineage, branch, loss, or handoff history itself must be published as an explicit trajectory account; **B.5.2.0** when the strongest lawful continuation is still an open probe question rather than an invitation; **C.2.LS / C.2.4 / C.2.5 / C.2.6 / C.2.7** for articulation, closure, anchoring, and representation-factor facets referenced but not owned here; **A.10/B.3** for evidence and assurance; **B.4/B.5** for anomaly-driven cycles; **E.17/E.18** for viewpoint publication; **F.9.1** for bridge-stance annotations; **C.3.3** for kind-bridge repair when endpoint kind mismatches appear.

**Non-goal.**
This pattern does **not** assert that physical affordances, interface affordances, social affordances, epistemic probe moves, articulation-closure moves, latent policy cues, and control opportunities are one concept.

Its job is to publish a disciplined **bridge reading** across those traditions while preventing false identity by shared language.

It also does **not** assert that every trigger use of action-first language is lawfully repaired by `actionInvitation(...)`:

* where the repaired statement is primarily **evaluative**, use **A.6.Q**;
* where it is primarily about **general capability**, use functional / method description;
* where it is primarily **deontic**, route via **A.6.B**;
* where it is primarily about **scheduled or executed enactment**, dock to **A.15** (`U.Method` / `U.MethodDescription` / `U.WorkPlan`, and later `U.Work`) rather than letting `actionInvitation(...)` become a shadow execution model.

### Problem frame

FPF repeatedly encounters a predictable precision failure mode around **affordance / action-first** language.

Authors say:

* “this handle affords pulling”
* “the interface invites confirmation”
* “the alarm calls for rollback”
* “this discrepancy suggests probing deeper”
* “the draft is ready for formalization”
* “the model wants to brake”
* “the situation is actionable”

…but the intended meaning is actually one of several different **action-oriented families**, for example:

1. **Physical affordance** — a material/environmental configuration offers a bodily action to an embodied agent.
2. **Interface affordance** — an interface face, operator panel, alarm, or publication face presents an operator move.
3. **Social affordance** — another agent or interactional setting invites a response or coordination move.
4. **Epistemic probe move** — a problem situation invites asking, comparing, measuring, testing, or instrumenting.
5. **Closure-advance move** — a situation invites naming, rescoping, proxy declaration, or formalization.
6. **Latent policy cue** — a learned/distributed state carries an action-oriented tendency not yet locally articulated.
7. **Control opportunity** — a closed-loop state invites braking, rollback, replan, isolate, escalate, or override.

The recurrent failure modes are:

* **Site confusion.** The locus of the invitation is unclear: object, scene, interface object, description, carrier, policy state, or problem episode.
* **Enactor confusion.** It is unclear **which system / collective system / role-holder** is invited to act: human operator, robot controller, research team, review service, or some unnamed “system”.
* **Action confusion.** The candidate action is hidden behind vague language like *actionable*, *calls for*, *ready for*, *natural next step*.
* **Invitation vs obligation collapse.** A situation that merely invites an action is rewritten as if it already created a duty.
* **Invitation vs capability collapse.** A local, situated action opportunity is rewritten as if it were a general capability claim.
* **Invitation vs work collapse.** Offered action is narrated as if it had already been executed.
* **Substrate confusion.** Ecological, embodied, latent-distributed, and symbolic-local action cues are silently collapsed.
* **Bridge illusion.** Similar language across traditions is mistaken for sameness.
* **Premature closure.** An early cue is published as if it were already a committed method, gate, or policy.
### Problem

How can FPF let authors use the communicative convenience of **affordance / action-first** language while preventing category errors when the language crosses:

* ecological / phenomenological discourse,
* interface and operator-facing discourse,
* active-inference / world-model discourse,
* control / monitoring / incident-response discourse,
* robotics / embodied-AI discourse,
* epistemic exploration and problem-framing discourse?
### Forces

* **Action speed vs auditability.** Action-first language is attractive because it is fast; that same speed makes it unsafe at boundaries.
* **Situated coupling vs explicit publication.** Affordances arise in agent–environment or policy–world coupling, but boundary use requires explicit local publication.
* **Preconceptual cue vs later articulation.** Some invitations are real before they are stably worded.
* **Enactor specificity vs shared discourse.** A cue may be visible to one detector yet relevant to another would-be enactor.
* **Opportunity vs obligation.** Not every invitation is a gate or commitment.
* **Option plurality vs premature scalarisation.** Several candidate actions may co-exist without a lawful total ordering.
* **Cross-tradition dialogue vs false unification.** The framework should support parallels without asserting identity.
* **Progressive closure.** An action cue may later become an option, then a policy hook, and only later a formal gate or work plan.
### Solution - Stable lens -> Sense Family -> Slots -> Normal Form -> Change Lexicon -> Guardrails

#### Trigger rule

A use of affordance / action-first language is in scope for A.6.A when any of the following holds:

* the prose uses tokens such as **affords**, **invites**, **calls for**, **actionable**, **ready for**, **ripe for**, **natural next step**, **the model wants**, **the interface tells**, **this problem asks for**;
* a boundary, gate, incident note, design note, or review note uses such language for admission, selection, triage, or action guidance;
* different traditions are compared using the same action-first wording;
* a draft introduces *model affordance*, *interface affordance*, *actionable insight*, *policy invitation*, or *ready for formalization* without declared sense;
* the author intends the phrase to carry more than one of: situational action opportunity, latent cue, operator move, probe move, closure move, or control move.
#### Operational repair sequence

When the trigger fires, authors SHOULD follow the A.6.P repair path:

1. **Capture the trigger span.**
   Copy the exact surface phrase.

2. **Reconstruct the candidate set.**
   Enumerate plausible candidate interpretations, including:

   * candidate **relation families** (`actionInvitation` vs `evaluativeAscription` vs capability claim vs commitment vs work occurrence),
   * candidate **site lane maps** over A.7 (`Object | Description | Carrier`),
   * candidate **would-be enactor lanes**,
   * candidate **action tuples**.

   If the occurrence is decision-bearing or publication-bearing, record a short **Candidate-Set Note** before selecting a repair.

3. **Select one explicit action-invitation sense.**
   Pick one `ActionInvitationSense` token and state why rivals were rejected in this local context.

4. **Emit a slot-explicit rewrite.**
   Rewrite the sentence into one explicit `actionInvitation(...)` record with site, would-be enactor, candidate action, coupling frame, detector/viewpoint, normal form, and qualifiers.

5. **Route boundary-bearing consequences.**
   If the repaired statement is used for admissibility, commitments, publication, automation, or evidence-bearing decisions, route the downstream hooks through **A.6.B** and, where enactment is implied, through **A.15**, instead of letting the vague action-first phrase carry that burden by itself.
#### Post-threshold lens: action-invitation routing anchored by actionInvitation(...)

A.6.A stabilises the ambiguity cluster by treating in-scope post-threshold affordance/action-first statements as **qualified action-oriented material that must publish an explicit action-invitation normal form and declared downstream routing**, not as bare adjectives or rhetorical verbs.
Early action-guiding material may remain in `A.16.1` / `B.4.1` as cue-pack content, a `RoutedCueSet`, or another typed route-bounded upstream publication before this pattern is entered.
`A.6.A` is therefore entered only once local `AE` is high enough to name site / enactor / action structure explicitly and local `CD` is high enough that one invitation reading is worth publishing as a relation record rather than remaining mere route pressure. If the strongest lawful publication is still a cue pack, routed cue, or open abductive prompt, stay in `A.16.1` / `B.4.1` / `B.5.2.0`.
If a published `actionInvitation(...)` later loses that minimal articulation/closure support, retreat via `A.16.2` rather than leaving a stale invitation record in force.

In A.6.P terms, this pattern fixes one post-threshold relation family and one downstream routing discipline:
* **`actionInvitation`** — the explicit post-threshold relation kind for affordance, invitation, control-opportunity, probe-move, and closure-advance rewrites once the material is articulated enough to publish a relation record.
#### RelationKind contract skeleton for actionInvitation

The family-specific `RelationKind` token is **`actionInvitation`**.
Its contract publication SHALL declare, at minimum:

* **(L)** applicability in the local Context/plane set;
* **(L)** site-centred polarity: the relation is about a **site/situation** inviting a candidate action **for** an enactor; it SHALL NOT be silently rewritten as a monadic property of an object alone;
* **(L)** participant SlotSpecs for site, invited enactor, candidate action, sense, coupling frame, and normal-form positions;
* **(A)** repair paths for site-kind and enactor-kind mismatches: explicit narrowing, `KindBridge`, and/or `retargetSite(...)` / `retargetInvitedEnactor(...)`;
* **(L)** qualifier expectations for `scope`, `Γ_time`, `viewpoint`, `view`, `representationSubstrate`, `bridgeRef`, and (when relevant) `articulationHint`;
* **(D)** detector/enactor separation discipline: the perceiver or detector SHALL NOT be silently collapsed into the invited enactor when they differ;
* **(D)** obligation barrier: invitation language SHALL NOT be silently rewritten as duty language;
* **(A/E)** witness discipline for decision/publication/automation lanes;
* **(L/A)** admissible semantic change classes and edition-fence expectations;
* **(A/E)** cross-context / cross-plane policy when reuse is claimed.

Each in-scope occurrence SHALL be representable as a pattern-specific **QualifiedRelationRecord**:

`ActionInvitationRecord :=`
`⟨`
`  relationKind             : actionInvitation,`
`  siteTuple                : …,`
`  siteFacetMap?            : tuple-member ↦ (Object | Description | Carrier),`
`  invitedEnactorTuple      : …,`
`  candidateActionTuple     : …,`
`  actionInvitationSense    : ActionInvitationSense,`
`  couplingFrame            : …,`
`  detector?                : …,`
`  viewpoint?               : U.Viewpoint,`
`  view?                    : U.View,`
`  normalForm               : CuePack | ActionOption | OptionSet | PolicyHook,`
`  articulationHint?        : open-cue | sketched | option-explicit | hook-explicit,`
`  scope?                   : U.Scope,`
`  Γ_time?                  : U.GammaTimePolicy,`
`  representationSubstrate? : ecological-world-coupled | embodied-kinesthetic | latent-distributed | symbolic-local | hybrid,`
`  bridgeRef?               : BridgeId,`
`  witnesses?               : EvidenceRefSet`
`⟩`

So the sentence “X affords Y” is never accepted as a terminal form.
Within the scope of A.6.A it must be rewritten into an explicit `actionInvitation(...)` instance with declared downstream routing; earlier pre-threshold material may instead remain as cue-pack content, a `RoutedCueSet`, or another typed route-bounded upstream publication before A.6.A entry.

**Discipline note.**
`ActionInvitationSense` is a **slot value inside** the relation family; it is not a replacement for the relation family itself.
The stable intermediate lens is the `actionInvitation(...)` relation; the sense token refines **what kind of invitation** is being published.

**A.7 lane note.**
`siteFacetMap` uses only the A.7 lane distinction `Object | Description | Carrier`.
If a `PublicationSurface` / `InteropSurface` participates, declare it separately under **A.7 / L-SURF** rather than widening the lane set with a generic `Surface` token.

**Separation note.**
`detector` and `invitedEnactor` are not synonyms.
When both matter, they SHALL be published separately.

**Enactor note.**
When `invitedEnactorTuple` is published as an actual would-be enactor, it SHALL resolve to a `U.System` or to a role assignment whose holder is a `U.System`. An episteme, description, publication face, or carrier may participate in the **site**, but not as the acting bearer.

**Episteme non-agency note.**
If the site is a Description/Episteme, any later enactment still occurs on carriers and/or target systems; the description itself never acts.
#### Core construct: ActionInvitationSense

Every in-scope use SHALL resolve to an explicit **`ActionInvitationSense`** token.

An `ActionInvitationSense` token publishes at least:

`ActionInvitationSense :=`
`⟨`
`  senseId,`
`  siteArity,`
`  enactorArity,`
`  candidateActionArity,`
`  defaultArticulationHint,`
`  admissibleArticulationHints,`
`  defaultRepresentationSubstrate,`
`  admissibleRepresentationSubstrates,`
`  defaultNormalForm,`
`  admissibleNormalForms,`
`  couplingFrameKind,`
`  admissibleEvidenceModes,`
`  admissibleChangeClasses,`
`  bridgePolicy`
`⟩`

Where:

* **`defaultArticulationHint`** and **`admissibleArticulationHints`** use the current local alias set
  `{ open-cue, sketched, option-explicit, hook-explicit }`
* **`defaultRepresentationSubstrate`** ∈
  `{ ecological-world-coupled, embodied-kinesthetic, latent-distributed, symbolic-local, hybrid }`
* **`admissibleRepresentationSubstrates`** explicitly declares the lawful publication substrates for the sense;
* **`defaultNormalForm`** ∈
  `{ CuePack, ActionOption, OptionSet, PolicyHook }`
#### A.16 alias-docking note

A.6.A carries `articulationHint` only as a **local alias field**.

This field is deliberately **not** a new formality ladder, **not** a maturity scale, and **not** a surrogate for **F**. Its only job is to preserve local articulation / closure cues until they are docked to `A.16` move logic and the explicit `C.2.4` / `C.2.5` facet owners.

Local `articulationHint` tokens SHALL dock to `A.16` move logic and to the explicit `C.2.4` / `C.2.5` facet owners one-for-one, and A.6.A SHALL treat them as aliases or publication conveniences only.
Until then, local hints SHALL NOT be thresholded, aggregated, or compared across Contexts.
#### Normative starter set of sense families

A Context MAY add local senses, but the following starter set is normative as the initial disambiguation menu:

| `ActionInvitationSense` token | Use when the action-first phrase means…                                                     |            Default normal form | Typical substrate                                    | Must **not** be silently collapsed into                  |
| ----------------------------- | ------------------------------------------------------------------------------------------- | -----------------------------: | ---------------------------------------------------- | -------------------------------------------------------- |
| `AIS.PhysicalAffordance`      | a material/environmental configuration offers a bodily action to an embodied agent          |    `CuePack` or `ActionOption` | `ecological-world-coupled` or `embodied-kinesthetic` | object property alone, generic capability, executed work |
| `AIS.InterfaceAffordance`     | an interface face, operator panel, alarm, or publication face presents an operator move | `ActionOption` or `PolicyHook` | `symbolic-local` or `hybrid`                         | duty/commitment, execution log                           |
| `AIS.SocialAffordance`        | another agent or social situation invites a response or coordination move                   |    `CuePack` or `ActionOption` | `embodied-kinesthetic` or `hybrid`                   | role assignment itself, deontic commitment               |
| `AIS.EpistemicProbe`          | a problem situation invites asking, contrasting, measuring, testing, or instrumenting       |  `ActionOption` or `OptionSet` | `hybrid`                                             | explanatory merit, evidence claim, finished method       |
| `AIS.ClosureAdvance`          | a situation invites naming, rescoping, proxy declaration, or formalization toward closure   |                 `ActionOption` | `symbolic-local` or `hybrid`                         | Formality **F**, acceptance status, quality ascription   |
| `AIS.LatentPolicyCue`         | a learned/distributed state carries an action-oriented tendency not yet locally articulated |       `CuePack` or `OptionSet` | `latent-distributed` or `hybrid`                     | explicit rationale, control adequacy, quality score      |
| `AIS.ControlOpportunity`      | a closed-loop state invites brake / rollback / replan / isolate / escalate / override       |    `OptionSet` or `PolicyHook` | `hybrid`                                             | bare “model wants”, obligation, work occurrence          |

**Normative rewrite note.**

* In **ecological / embodied** contexts, bare *affords* SHALL rewrite to **`AIS.PhysicalAffordance`** unless another sense is explicitly declared.
* In **interface / alarm / operator-panel** contexts, bare action-first phrasing SHALL rewrite to **`AIS.InterfaceAffordance`** and/or **`AIS.ControlOpportunity`**.
* In **epistemic exploration** contexts, “this suggests probing / formalizing / reframing” SHALL rewrite to **`AIS.EpistemicProbe`** and/or **`AIS.ClosureAdvance`**.
* In **learned world-model / active-inference / policy** contexts, bare “the model wants / the state suggests” SHALL rewrite to **`AIS.LatentPolicyCue`** and/or **`AIS.ControlOpportunity`**, with the distinction made explicit.
* If the sentence is chiefly about **better / worse / fit / merit**, use **A.6.Q** instead of A.6.A.
#### Required slots for a conforming actionInvitation

A conforming `actionInvitation` SHALL make explicit:

1. **Site tuple and site-facet docking.**
   What the invitation is *about*: object, scene, interface object, description, carrier, episode, or control state — with per-member A.7 lane annotations when the tuple is mixed.

2. **Invited enactor tuple.**
   Which system / collective system / role-holder is invited to act.

3. **Candidate action tuple.**
   What action is being invited.

4. **`ActionInvitationSense`.**
   Which action-oriented family is intended.

5. **Coupling frame.**
   The relation-basis under which the invitation is published.
   Examples: reach envelope, interface state, incident horizon, control horizon, probe pack, open issue set.

6. **Detector and/or viewpoint.**
   Who or what detected the cue, and under which viewpoint it is published.

7. **Normal form and `articulationHint`.**
   How the invitation is published and how far it has been articulated.

8. **Scope and time when relevant.**
   `U.Scope` and `Γ_time` SHALL be explicit when omission changes meaning.

9. **Representation substrate when relevant.**
   Especially when comparing ecological, embodied, latent-distributed, and symbolic-local treatments.

10. **Witness / evidence mode.**
    Exemplars, sensory traces, probe notes, kinematic data, interface events, controller traces, run logs, or review notes.
#### Normal-form discipline

An `ActionInvitationSense` SHALL declare one lawful default normal form and MAY declare additional admissible normal forms explicitly.

**Docking note.**
Where a published invitation already points to executable artifacts, the record SHOULD reuse existing `U.Method` / `U.MethodDescription` / `U.WorkPlan` identifiers or refs. `PolicyHook` SHALL always be a hook over pre-existing gate / method / protocol surfaces; it does not mint a new execution, admissibility, or deontic ontology.

**ANF-1 — `CuePack`.**
Use for early or weakly articulated invitations, especially `AIS.PhysicalAffordance`, `AIS.SocialAffordance`, and many cases of `AIS.LatentPolicyCue`.

A conforming `CuePack` publishes:

* exemplar or contrast episodes, sensory traces, or probe cues,
* site conditions,
* enactor profile or enactor constraints,
* a small gloss set of candidate actions,
* optional ordinal urgency or salience summaries,
* explicit warning that the cue is **not yet** a commitment, a selected method, a gate, or work,
* explicit note that witness-bearing does **not** by itself make the hinted action correct, required, or selected.

**ANF-2 — `ActionOption`.**
Use when one candidate action tuple is explicit.

A conforming `ActionOption` publishes:

* one candidate action tuple,
* invited enactor / role,
* local guard sketch,
* expected near-field effect,
* optional `U.Method` / `U.MethodDescription` / `U.WorkPlan` refs when those already exist in-context,
* explicit note that the option is **not yet selected**, **not yet obligatory**, and **not yet executed**.

**ANF-3 — `OptionSet`.**
Use when several candidate actions coexist.

A conforming `OptionSet` publishes:

* explicit action members,
* any local comparator, triage rule, or partial order,
* admissible incomparability if no total order is lawful,
* prohibition on hidden scalarisation.

**ANF-4 — `PolicyHook`.**
Use when the invitation is explicitly bound to an existing controller, gate, playbook, method, or override protocol.

A conforming `PolicyHook` publishes:

* referenced policy / method / gate / protocol ids (pre-existing owners only),
* applicable guard or trigger conditions,
* ownership / accountable role,
* escalation or override references when relevant,
* explicit note that the hook is a **binding surface** over existing semantics, not itself a commitment, an admissibility law, or a work occurrence.
#### Separation from quality, capability, commitment, and work

A.6.A SHALL prevent the collapse of action invitation language into neighbouring families.

* A statement about **better / worse / fit / merit** belongs to **A.6.Q**.
* A statement about **what a system can do in general** belongs to capability / method description.
* A statement about **what must be done** belongs to **A.6.B** (`A-*` / `D-*`).
* A statement about **what was actually done** belongs to **A.15 / U.Work**.
* If an invitation targets a description/episteme, any later enactment still occurs on symbol carriers and/or target systems; the description itself never acts.
* Mixed sentences that carry both evaluative and invitational content SHALL be split into `evaluativeAscription(...)` and `actionInvitation(...)` records, with explicit cross-references when the co-occurrence matters.

Mixed sentences SHALL be split.

Examples:

* “This scene is good for grasping” may require **both** `evaluativeAscription(...)` and `actionInvitation(...)`.
* “This alarm requires rollback” is **not** a lawful final affordance record; it needs explicit gate / duty routing.
* “The robot can grasp this handle” is a capability claim unless the situated site/actor/frame and invitation are made explicit.
* “The operator clicked rollback” is work, not invitation.
#### Bridge discipline across traditions

Whenever two traditions are compared using action-first language, the author SHALL publish an explicit **bridge stance** and loss note.

Allowed bridge stances:

* **`localRename`**
* **`operationalizes`**
* **`partialAnalogy`**
* **`projection`**
* **`nonEquivalent`**

Examples:

* `AIS.PhysicalAffordance` - `AIS.InterfaceAffordance` is usually `partialAnalogy`, not identity.
* `AIS.EpistemicProbe` - `AIS.ClosureAdvance` is usually a progression-by-closure relation, not identity.
* `AIS.LatentPolicyCue` > `AIS.ControlOpportunity` is often `operationalizes` or `projection`.
* `AIS.PhysicalAffordance` > `PolicyHook` in robotics is usually `projection` under a controller frame.
* Action invitation and quality ascription may co-occur, but co-occurrence is **not** identity.
#### Change lexicon

A conforming pattern SHALL narrate changes with a stable change lexicon aligned to A.6.P:

* **`declareActionInvitation(...)`** — create a new explicit action invitation record.
* **`withdrawActionInvitation(...)`** — retire a prior record.
* **`retargetSite(...)`** — change the site tuple while keeping the same relation family.
* **`retargetInvitedEnactor(...)`** — change the invited enactor tuple when that slot is ref-backed.
* **`reviseAction(...)`** — change the candidate action tuple by value (or split into the corresponding `retargetParticipant(...)` form if the local contract makes the action slot ref-backed).
* **`reviseSense(...)`** — change the value in the `actionInvitationSense` slot.
* **`reArticulate(...)`** — change the `articulationHint` while preserving sense family.
* **`reFrame(...)`** — change coupling frame.
* **`reGuard(...)`** — change guard sketch or hook condition.
* **`rePolicyHook(...)`** — change policy / gate / method hook details.
* **`reView(...)`** — change detector / viewpoint / view publication.
* **`rescope(...)`** — change `U.Scope`.
* **`retime(...)`** — change `Γ_time`.
* **`refreshWitnesses(...)`** — refresh witness bindings.
* **`changeRelationKind(...)`** — semantic move to a different relation family; never edit in place silently.

A silent move from invitation to commitment, capability, or work is a breaking semantic change.

**A.6.P rewrite note.**
`retargetSite(...)` and `retargetInvitedEnactor(...)` are family-specific refinements of participant retargeting and SHALL be used only when the corresponding slots are ref-backed. `reviseAction(...)`, `reviseSense(...)`, `reArticulate(...)`, `reFrame(...)`, `reGuard(...)`, and `rePolicyHook(...)` are by-value revisions unless the local contract explicitly declares the corresponding slot as ref-backed, in which case the text SHALL use the matching `retargetParticipant(...)` form. This preserves A.6.5’s ref-vs-value discipline.
#### A.6.B routing template for actionInvitation

When an action invitation becomes boundary-bearing, route it explicitly:

* **L** — `actionInvitation` contract skeleton, `ActionInvitationSense` semantics, normal-form lawfulness, actor/site discipline, bridge stances.
* **A** — admissibility conditions for using the invitation in selector, triage, automation, or publication lanes.
* **D** — duties on authors, operators, or owners: lexical firewall, naming the invited actor, naming the hook owner, naming override paths where required.
* **E** — carrier-anchored witnesses: sensory traces, interface events, probe notes, controller logs, run traces, incident records.

Do not let bare action-first language carry L/A/D/E force by itself.
#### Lexical guardrails

In **Tech / normative prose**:

* bare **affords / invites / calls for / actionable / ready for / ripe for / natural next step / the model wants / the interface tells** MUST NOT appear without immediate repair;
* **actionable insight** MUST be rewritten to `ActionOption` / `OptionSet` / `PolicyHook`, or to **A.6.Q** if the use is primarily evaluative;
* **affordance** MUST NOT be treated as a monadic property of an object without actor, site, and frame;
* an invitation MUST NOT be presented as if it were already a duty, gate, or work occurrence;
* a latent policy cue MUST NOT be presented as if it were already an explanation;
* `articulationHint` MUST NOT be read as **F**, as acceptance status, or as a replacement for `A.16` anchors;
* generic `Surface` facet tokens MUST NOT be introduced inside A.6.A; publication-surface participation must be declared under **A.7 / L-SURF**, not by widening the A.7 lane set;
* hidden enactor language inside adjectives such as *graspable*, *deployable*, *actionable*, *ready* SHALL be unpacked;
* quoted metalinguistic uses are allowed, but SHALL be marked as token-under-discussion.
#### Progressive elaboration

A.6.A supports monotone elaboration:

1. Start by selecting an `ActionInvitationSense` and recording rival candidates when ambiguity is live.
2. Declare site, would-be enactor, action, frame, and site-facet docking.
3. Choose a lawful normal form and a local `articulationHint` when omission would hide articulation state.
4. Add guards, method/policy hooks, and witness bindings.
5. If a `CuePack` / `ActionOption` is projected into `OptionSet` / `PolicyHook` or docked to **A.6.Q** / **A.6.B** / **A.15** surfaces, publish an explicit projection / operationalization note rather than silently upgrading the invitation.
6. Add bridges and loss notes if traditions are compared.
7. If the invitation becomes boundary-bearing, emit `L/A/D/E` routing hooks and, where enactment is implied, route into A.15 surfaces.
8. Never move from invitation into capability, commitment, or work silently.
#### Endpoint-first downstream discipline

If a repaired phrase already names a lawful downstream owner such as a gate hook, method surface, work-planning surface, or work occurrence, authors SHOULD publish that owner directly and keep `actionInvitation(...)` only as the preceding repair record when the invitation semantics themselves still matter. `actionInvitation(...)` is therefore a post-threshold invitation record, not a shadow substitute for `A.6.B`, `A.15`, or gate-owner patterns.
### Archetypal Grounding

#### Tell

If a draft says *affords*, *calls for*, *invites*, or *actionable*, the author has not yet named the action-oriented family.

A conforming post-threshold rewrite publishes one explicit `actionInvitation(...)` with one `ActionInvitationSense`, one site tuple, one invited enactor tuple, one candidate action tuple, one coupling frame, one normal form, and explicit articulation / scope / time / substrate qualifiers when they matter. Earlier action-guiding material may still remain outside A.6.A as cue-pack content, a `RoutedCueSet`, or another typed route-bounded upstream publication until threshold conditions are met.
#### Show (System lane)

**Draft:** “The alarm calls for rollback.”

**Repair A — control / incident line**

`actionInvitation(`
`  site = AlarmBundle_AB9 × ServiceState_S7,`
`  siteFacetMap = { AlarmBundle_AB9: Carrier, ServiceState_S7: Object },`
`  invitedEnactor = OpsTeam_Phoenix,`
`  candidateAction = Enact(MethodDescriptionRef = RollbackRunbook_R41, target = Release_R41),`
`  actionInvitationSense = AIS.ControlOpportunity,`
`  couplingFrame = IncidentPolicy_IP2 × Horizon_H15m,`
`  detector = AnomalyPolicy_AP7,`
`  viewpoint = VP.OperationsControl,`
`  normalForm = PolicyHook,`
`  articulationHint = hook-explicit,`
`  scope = U.WorkScope(ProdCluster_EU_1),`
`  Γ_time = RunWindow_RW,`
`  witnesses = {AlertTrace_91, ErrorBudgetSeries_4}`
`)`

**Repair B — ecological / robot line**

**Draft:** “This handle affords pulling.”

`actionInvitation(`
`  site = DoorHandle_17 × DoorState_Closed × ReachEnvelope_RE2,`
`  siteFacetMap = { DoorHandle_17: Object, DoorState_Closed: Object, ReachEnvelope_RE2: Description },`
`  invitedEnactor = ServiceRobot_R2,`
`  candidateAction = PullAlong(Axis_A1),`
`  actionInvitationSense = AIS.PhysicalAffordance,`
`  couplingFrame = GripClass_G1 × ClearanceProfile_CP3,`
`  detector = PerceptionStack_PS4,`
`  normalForm = ActionOption,`
`  articulationHint = option-explicit,`
`  Γ_time = Window_W1,`
`  witnesses = {DepthFrame_883, ContactModelRun_17}`
`)`
#### Show (Episteme lane)

**Draft:** “This problem asks for a better question.”

**Repair A — epistemic probe line**

`actionInvitation(`
`  site = ProblemFramingEpisode_PF3,`
`  siteFacetMap = { ProblemFramingEpisode_PF3: Description },`
`  invitedEnactor = ResearchTeam_A,`
`  candidateAction = Enact(MethodDescriptionRef = ContrastiveQuestioning_Q2),`
`  actionInvitationSense = AIS.EpistemicProbe,`
`  couplingFrame = ExemplarPack_EP3 × OpenIssueSet_O2,`
`  detector = Reviewer_A1,`
`  normalForm = OptionSet,`
`  articulationHint = sketched,`
`  representationSubstrate = hybrid,`
`  witnesses = {EpisodeNotes_3, CounterexampleCard_2}`
`)`

**Repair B — closure-advance line**

**Draft:** “The draft is ready for formalization.”

`actionInvitation(`
`  site = DraftHypothesis_H7,`
`  siteFacetMap = { DraftHypothesis_H7: Description },`
`  invitedEnactor = AuthorCollective_C1,`
`  candidateAction = Formalize_DS(TypedInvariantSet_V1),`
`  actionInvitationSense = AIS.ClosureAdvance,`
`  couplingFrame = AmbiguityMemo_8 × ClaimScope_G1,`
`  detector = ReviewPanel_R4,`
`  normalForm = ActionOption,`
`  articulationHint = option-explicit,`
`  representationSubstrate = symbolic-local,`
`  witnesses = {AmbiguityMemo_8, ReviewCommentSet_5}`
`)`
### Bias-Annotation

Lenses tested: **Gov**, **Arch**, **Onto/Epist**, **Prag**, **Did**. Scope: **Universal** for overloaded affordance / action-first language in FPF prose.

* **Gov bias:** this pattern may tempt authors to smuggle decisions into invitation language.
  *Mitigation:* explicit A.6.B routing and obligation barrier.
* **Arch bias:** this pattern prefers one stable relation family over loose action talk.
  *Mitigation:* allow Plain exploratory prose before Tech / normative publication.
* **Onto/Epist bias:** this pattern insists on separating invitation from evaluation, capability, commitment, and work.
  *Mitigation:* explicit bridge stances and mixed-sentence split rules.
* **Prag bias:** it favors enactor/site/action explicitness, which raises authoring cost.
  *Mitigation:* small starter set, normal-form discipline, and copyable rewrites.
* **Did bias:** repeated rewrites make the pattern teachable, but may over-formalize early cues.
  *Mitigation:* `CuePack` and local `articulationHint` keep early stages lawful without pretending closure.
### Conformance Checklist (CC-A.6.A)

A text or pattern conforms to A.6.A iff:

1. **CC-A.6.A-1 — Explicit post-threshold relation family and explicit sense.**
   Every in-scope post-threshold action-first use resolves to one declared `actionInvitation(...)` instance and one declared `ActionInvitationSense`; earlier cue-like material is routed through `A.16.1` / `B.4.1` instead of being forced into A.6.A prematurely.
2. **CC-A.6.A-2 — Explicit site and site-facet docking.**
   The site tuple is explicit; when ambiguous or mixed, the A.7 lane map (`Object | Description | Carrier`) is explicit.

3. **CC-A.6.A-3 — Explicit invited enactor.**
   The invited enactor tuple is explicit.

4. **CC-A.6.A-4 — Enactor discipline.**
   When the invited enactor is meant as the actual would-be enactor, it resolves to a `U.System` or role assignment with system holder.

5. **CC-A.6.A-5 — Explicit candidate action.**
   The candidate action tuple is explicit and reviewable.

6. **CC-A.6.A-6 — Explicit coupling frame.**
   The coupling frame is explicit.

7. **CC-A.6.A-7 — Detector/viewpoint separation.**
   When both matter, `detector` and `viewpoint` are not silently collapsed.

8. **CC-A.6.A-8 — Lawful normal form.**
   The invitation is published as `CuePack`, `ActionOption`, `OptionSet`, or `PolicyHook`, with corresponding discipline observed.

9. **CC-A.6.A-9 — Articulation-hint discipline.**
   If omission changes meaning, `articulationHint` is explicit and is not treated as **F** or as an acceptance state.

10. **CC-A.6.A-10 — No invitation-as-obligation.**
    An invitation is not silently published as a duty or gate.

11. **CC-A.6.A-11 — No invitation-as-work.**
    An invitation is not silently published as a work occurrence.

12. **CC-A.6.A-12 — No capability collapse.**
    A situated invitation is not silently rewritten as a general capability claim.

13. **CC-A.6.A-13 — No object-property collapse.**
    Affordance language is not published as a monadic object property when actor/site/frame matter.

14. **CC-A.6.A-14 — No hidden scalarisation.**
    `OptionSet` publication does not introduce a hidden total score or ranking without an explicit comparator / policy.

15. **CC-A.6.A-15 — No silent sense rewrite.**
    Sense changes use the declared change lexicon.

16. **CC-A.6.A-16 — No silent relation-family switch.**
    Moving from invitation to quality ascription, capability, commitment, or work uses `changeRelationKind(...)` or an explicit split.

17. **CC-A.6.A-17 — Bridge accountability.**
    Cross-tradition parallels publish bridge stance and loss notes.

18. **CC-A.6.A-18 — Boundary-routing hook when needed.**
    If the repaired invitation is used for admissibility, commitments, publication, or automation, downstream `L/A/D/E` hooks are explicit.

19. **CC-A.6.A-19 — Lexical firewall.**
    Bare action-first trigger tokens are absent from Tech / normative prose except as quoted metalinguistic discussion.

20. **CC-A.6.A-20 — `actionInvitation` contract skeleton is published.**
    The family-specific `RelationKind` token resolves to a contract skeleton with SlotSpecs, enactor/site discipline, qualifier expectations, repair paths, witness discipline, admissible change classes, and cross-context policy.

21. **CC-A.6.A-21 — Candidate-Set Note is used when ambiguity is live.**
    If the site lane map, enactor lane, relation family, or sense selection is non-obvious, the text records a short Candidate-Set Note before decision-bearing use.
### Common Anti-Patterns and How to Avoid Them

| Anti-pattern                   | Symptom                                                                                     | Why it fails                                           | How to avoid / repair                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------- |
| **Object-property affordance** | “The object is actionable” with no enactor or site frame                                    | collapses relationality into monadic property language | publish site + enactor + action + coupling frame               |
| **Invitation-as-obligation**   | “This calls for rollback” is treated as if rollback is already required                     | hides A/D routing and accountability                   | publish `actionInvitation(...)`, then route duty/gate via A.6.B |
| **Invitation-as-work**         | “The system reacted” is used where only a cue or option exists                              | confuses offer with execution                          | keep invitation separate from A.15 / `U.Work`                   |
| **Capability-as-invitation**   | “The robot can do X” stands in for a situated affordance                                    | destroys local enactor/site conditions                 | separate capability description from action invitation          |
| **Latent cue as explanation**  | a model tendency is narrated as if it were already an explicit rationale                    | overstates articulation and evidence                   | keep as `CuePack` or `OptionSet` until further articulation     |
| **Premature automation**       | a weak cue is wired directly into gates or controllers with no explicit hook owner or guard | creates unsafe action pathways                         | require `PolicyHook` + A.6.B routing + witnesses                |
| **ArticulationHint as F proxy**| `hook-explicit` is read as “more formal”                                                    | recreates a forbidden second formality ladder          | keep F in C.2.3; reserve articulation/closure semantics for `A.16` |
### Consequences

**Benefits.**
This pattern gives FPF a lawful **post-threshold repair record family** for **action-first** discourse. It lets embodied, ecological, latent, interface, and control cues be published without pretending they are already commitments, capabilities, metrics, or work.

It also complements A.6.Q cleanly: A.6.Q repairs **evaluative** ambiguity, while A.6.A repairs **action-inviting** ambiguity.

**Trade-offs / mitigations.**
The pattern adds authoring overhead and can feel heavy in early exploration.

Mitigation: allow bare action-first language in Plain exploratory notes, but require repair before it enters Tech / normative, boundary, automation, assurance, or publication surfaces.
### Rationale

A.6.A makes one strategic move:

> **Affordance / action-first language is not treated as a monadic property and not treated as a hidden duty. It is treated as a family of action invitations whose members differ by site, actor, candidate action, coupling frame, substrate, and lawful publication form.**

This bridge reading is intentionally neutral: in ecological settings the site is **not** treated as a literal speaker or norm-giver. “Invitation” is the stable publishable FPF lens for situated opportunity-to-act talk, not a claim that all source traditions use that word or share one ontology.

This gives FPF a lawful path for:

* ecological and embodied affordances,
* interface and operator prompts,
* epistemic “probe this / formalize this / reframe this” moves,
* latent policy cues in learned systems,
* control opportunities in closed loops,

without forcing them into one false universal vocabulary.

It also keeps the larger architecture clean:

* **A.6.Q** owns evaluative repairs,
* **A.6.A** owns action-invitation repairs,
* **A.6.B** owns boundary routing,
* **A.15** owns enactment / work,
* **A.16** owns articulation / closure progression and lawful moves,
* **C.2.3** remains the sole owner of the formality axis **F**.
### SoTA-Echoing

Recent philosophical and ecological work treats affordances as **action-relevant possibilities** perceived in engagement and, in some accounts, as **invitations for action**, rather than as viewpoint-free monadic object properties. A.6.A adopts that relational, action-first stance, adapts it by forcing explicit `siteTuple` / `invitedEnactorTuple` / `couplingFrame` publication, and rejects silent collapse into monadic object labels. ([Frontiers][1], [Springer][2])

Recent empirical review work on affordance perception emphasises **attunement and recalibration** in person-plus-object systems rather than fixed, context-free labels. A.6.A adopts the need for actor- and situation-specific publication, adapts it into `CuePack` / `ActionOption` / `OptionSet` normal forms, and rejects any assumption that an affordance phrase is already a lawful metric or a universally portable invariant. ([Springer][2])

Current active-inference work frames generative models as supporting **action-perception loops** and, in many cases, **action-oriented models** that are for adaptive interaction rather than only detached description. A.6.A adopts the action-oriented emphasis and the separation between model-side cueing and enacted action; it adapts this by making `detector` and `invitedEnactor` explicit and by forbidding latent policy cues from counting as work, commitment, or explicit rationale by default. ([UCL Discovery][3])

Current robotics work increasingly uses affordances as **intermediate representations** between perception/language and low-level action, including compact keypoint or staged affordance plans. A.6.A adopts this as evidence that affordance publication can be a lawful intermediate publication form; it adapts it into `ActionOption`, `OptionSet`, and `PolicyHook`, and rejects silent promotion of such representations into deontic obligation, proof of correctness, or objective value. ([Robotics: Science and Systems][4])

**Coverage note.**
This section already covers the load-bearing relational/action-oriented stance. A fuller canonical corpus package should also bind explicit operator-interaction / operator-alarm / incident-response SoTA-pack material so that operator-facing interface practice is evidenced as directly as the current ecology / active-inference / robotics branch.
### Relations

* **Specialises:** **A.6.P** as an RPR pattern for overloaded affordance / action-first language.
* **Builds on:** **A.3/A.7** for enactor discipline and Object≠Description≠Carrier separation; **A.15** for keeping invitation distinct from enactment; **A.6.B** for boundary routing; **E.17/E.18** for viewpoint publication.
* **Works alongside:** **A.6.Q** for evaluative language; the two are siblings, not substitutes.
* **Coordinates with:** **C.2.2a / A.16 / A.16.1 / A.16.2 / B.4.1** for language-state chart positions, lawful moves before post-threshold repair, and retreat when a published invitation must be reopened; use **A.16.0** only when lineage, branch, loss, or handoff history itself must be published as an explicit trajectory account; **B.5.2.0** for probe-question cases that are still prompt-shaped; **C.2.LS / C.2.4 / C.2.5 / C.2.6 / C.2.7** for language-state facet ownership.
* **Must not replace:** **C.2.3** as the single owner of **F**.
* **Recommends publication via:** **E.10 / F.17 / F.18** when `actionInvitation` tokens, starter senses, and red-flag rewrites become shared vocabulary.



[1]: https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1388852/full "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1388852/full"
[2]: https://link.springer.com/article/10.3758/s13423-023-02319-w "https://link.springer.com/article/10.3758/s13423-023-02319-w"
[3]: https://discovery.ucl.ac.uk/10191719/3/Friston_Neural%20representation%20in%20active%20inference.pdf "https://discovery.ucl.ac.uk/10191719/3/Friston_Neural%20representation%20in%20active%20inference.pdf"
[4]: https://roboticsconference.org/2024/program/papers/62/ "https://roboticsconference.org/2024/program/papers/62/"

#### Language-space refactor note

This pattern is scoped to **action-invitation repair and routing**, not to the whole early cue layer. Early action-guiding material may remain in `A.16.1` as cue-pack content, a `RoutedCueSet`, or another typed route-bounded upstream publication before it stabilizes into `actionInvitation(...)`.
#### Canonical downstream seam

`actionInvitation(...)` should route canonically through `A.6.B` and `A.15` toward gates, commitments, methods, or work. Operator-facing starter senses such as `AIS.AlertInterventionCue` or `AIS.OperatorInterventionCue` should not be buried under generic `AIS.InterfaceAffordance` when human factors and policy hooks materially differ.
#### Ownership boundary

Bridge stances, articulation-state owners, and language-state facet axes are **referenced** by this pattern but remain owned by `F.9.1`, `A.16`, `C.2.LS`, `C.2.4`, `C.2.5`, `C.2.6`, and `C.2.7`.
### A.6.A:End
## U.RelationSlotDiscipline - SlotKind / ValueKind / RefKind discipline for n‑ary relations (with slot‑operation lexicon)

**Plain‑name.** Relation slot discipline.

**Status.** Normative (Core).
**Placement.** Part A, cluster A.IV “Signature Stack & Boundary Discipline”; directly under A.6.0 `U.Signature` and alongside A.6.1–A.6.4.
**Depends on.**
– A.1 `U.Holon` (holonic carrier model).
– A.6.0 `U.Signature` (universal morphism/relationship signatures).
– A.7 (Strict Distinction; I/D/S vs Surface).
– E.8 (pattern authoring order & SoTA discipline).
– E.10 (LEX‑BUNDLE: Tech/Plain registers, naming guards).

**Coordinates with.**
– C.2.1 `U.EpistemeSlotGraph` (episteme slots: DescribedEntity, GroundingHolon, ClaimGraph, Viewpoint, View, ReferenceScheme).
– C.3.* Kind‑CAL (Kinds, KindSignature, KindBridge).
– F.18 (name governance; twin‑register discipline).

### Problem frame

FPF relies heavily on **n‑ary relations and morphisms**:

* episteme component layouts (`U.EpistemeKind` in C.2.1),
* role enactment and assignment,
* method/service signatures,
* guards and bridges in Part B/C,
* publication and view operators in Part E, and any other `U.Signature` whose **Vocabulary** row declares n‑ary relations or operators across Part A/B/C/E.

In practice, existing episteme and drafts **frequently conflate**:

1. the **place/position** in a signatured structure (relation/operator/record/port bundle; e.g. “the 2nd argument, named Subject”),
2. the **kind of value** that may fill that position (`U.Entity`, `U.Holon`, …), and
3. the **reference/identifier** we actually store there (`…Id`, `…Ref`).

This produces subtle bugs (elaborated in A.6.5:2):

* misuse of “Subject/Object” as SlotKind‑like names for very different ValueKinds (explicitly banned for episteme Tech names by E.10),
* the `…Ref` suffix attached to both conceptual values and reference fields, erasing ValueKind vs RefKind,
* mixed reasoning about “role”, “slot”, and “filler” as if they were the same layer,
* fragile substitution questions (“can I plug this module here?”) that depend on informal judgement rather than SlotSpec laws.

A second, subtler conflation appears in prose: authors mix **binding / initialization / assignment / substitution / retargeting / mutation / passing** as if they were synonyms for “put something in a slot”. This blurs the intended discipline precisely in the places where FPF must be crisp (signatures, morphisms, bridges, and viewing operators).

`U.RelationSlotDiscipline` pins a **single, reusable discipline** over `U.Signature` so that **every position in an n‑ary signature** is described with:

* a **SlotKind** — *where* in the signature,
* a **ValueKind** — *what sort of thing* may fill that place, and
* a **RefKind** — *how we point at it* in episteme (identifier / handle), if at all,

**and** it standardises the **lexicon for operations over slots** so that extension texts can describe “early vs late binding”, “retargeting”, and “by‑value edits” without collapsing layers.

This pattern makes slot discipline explicit and shareable across **epistemes, roles, methods, services, bridges, guards, and all other `U.Signature`d calculi**: any “parameter list”, “port list”, “field set”, or “coordinate tuple” for an n‑ary signature in FPF **is** a set of SlotSpecs governed by this discipline.
### Problem (symptoms in FPF)

Typical failure modes the pattern is designed to eliminate:

1. **Slot vs value vs ref confusion.**
   Episteme fields such as `DescribedEntityRef` are sometimes treated as:

   * the **slot** (“the described entity position”),
   * the **value kind** (“the described entity type”), and
   * a **reference field** (“this is the pointer we store”).

   Reasoning about substitution (“can I swap one described entity for another?”) then mixes three levels at once.

2. **Kernel types misused as slot names.**
   Kernel concepts like `U.Entity` or `U.Holon` are used directly as slot names (“the `U.Entity` of this episteme”), hiding the difference between:

   * the abstract **Kind** (`U.Entity` as intensional universe), and
   * the **place** where one such entity is used in a particular relation.

3. **“Role” overloaded as slot.**
   In relation signatures and structural calculi, “role” has crept in as a synonym for “argument position”: “the role of the subject”, “the role of the provider”. This clashes with `U.Role` in RoleEnactment and makes it hard to distinguish:

   * **holonic role** (mask worn by a system), from
   * **slot** (position in a relation).

4. **Ref‑suffix drift.**
   In the absence of a discipline, the suffix `…Ref` is attached to:

   * entity kinds (`U.EntityRef` interpreted as “the entity itself”),
   * episteme fields (`describedEntityRef`),
   * sometimes even to slots (“DescribedEntityRefSlot”).

   That makes it impossible to read signatures and know whether we talk about:

   * a **conceptual value** (by‑value), or
   * a **reference/identifier** (by‑reference via a handle).

5. **Substitution rules not localisable.**
   When the slot/value/ref layers are not separated:

   * we cannot state “you may substitute **any instance of ValueKind V** in Slot S”, nor
   * “this Bridge only changes RefKind, not ValueKind”.

   This blocks clean use of A.6.0 `U.Signature` as a shared calculus for method/role/episteme signatures.

6. **Episteme‑specific slots not standardised.**
   For epistemes, the positions “what is this about?”, “in which holon is it grounded?”, “what ClaimGraph is inside?” re‑appear across patterns. Without a shared slot discipline, each pattern names these ad‑hoc, breaking the ability to state **universal laws** over episteme morphisms (A.6.2–A.6.4).

7. **Operation‑lexicon drift (slot filling spoken as one verb).**
   Extension prose introduces ad‑hoc words for “put something in a slot” and then imports unintended semantics. The most common mistakes are:

   * using a single word (e.g. “fill”, “set”, “occupy”, “attach”) to cover **initialization**, **assignment**, **retargeting**, and **by‑value editing**;
   * using person/role metaphors for slot content (“occupant”) that re‑introduce the “role ≈ slot” confusion;
   * describing “early vs late binding” without stating **which link** is early/late (name→slot binding vs slot→content filling vs ref→referent resolution).

The result: **local convenience, global incoherence** — exactly what A.6.0 and E.10 are supposed to prevent.
### Forces

* **F1 - Simplicity vs expressiveness.**
  Engineers need a **small number of concepts** they can hold in mind while reading a signature; yet we must express:

  * where a parameter sits,
  * which kinds it can take,
  * whether it’s by value/by reference,
  * how substitution behaves,
  * and (in prose) what kind of slot‑operation is being described.

* **F2 - Cross‑disciplinary reuse.**
  Slot discipline must work for:

  * logical relations (KD‑CAL, LOG‑CAL),
  * episteme structures (C.2.1),
  * systems/roles/methods (A/B),
  * services and APIs (including method/service interfaces and ports),
  * cells in tables and databases,
  * guards, bridges, and flows in E.TGA,
  * and publication operations (E.17).

  A scheme that is too domain‑specific (e.g. “database attributes only”) won’t scale; the same discipline must underlie **all** `U.Signature`d argument/port lists.

* **F3 - Alignment with existing tooling.**
  Tooling stacks already operate with:

  * typed parameters and records,
  * identifiers vs values vs references,
  * and (in modern typed settings) explicit distinctions between *binding*, *store update*, and *mutation*.

  FPF must line up with this practice enough that signatures can be implemented without inventing a parallel type system.

* **F4 - I/D/S discipline.**
  Strict distinction (A.7, E.10.D2) already separates **intensional objects**, their **descriptions**, and **specifications**. The same discipline is needed inside relations:

  * slot ≠ value ≠ reference,
  * system role ≠ slot name,
  * describedEntity ≠ guard,
  * and “change the reference” ≠ “change the thing referred to”.

* **F5 - Didactic primacy and naming discipline.**
  E.8 and E.10 demand patterns that are:

  * teachable (Tell‑Show‑Show examples, explicit biases),
  * lexically guarded (Tech/Plain split, explicit head‑nouns).

  Slot discipline must integrate seamlessly with that.

* **F6 - Binding‑time talk must be unambiguous.**
  “Early binding / late binding” is meaningful only if the author states **what is being fixed when**. FPF needs a canonical way to speak about:

  * early/late **slot filling**,
  * early/late **reference resolution / dispatch**,
  * and (where a language surface is in play) early/late **name binding**.
### Solution — SlotKind / ValueKind / RefKind triple (plus a slot‑operation lexicon)

#### Three layers for every argument position

`U.RelationSlotDiscipline` extends `U.Signature` with a **three‑layer description** for every argument position (whether we call it “parameter”, “slot”, “coordinate”, or “port” in colloquial prose).
In **normative** text, the canonical word is **slot**, and the canonical carrier is a **SlotSpec** triple (A.6.0).

1. **SlotKind (place in signature).**
   *How this position is denoted in the Signature and what is fixed about it by the signature’s definition.*
   – Examples: `DescribedEntitySlot`, `GroundingHolonSlot`, `ClaimGraphSlot`, `ViewpointSlot`, `ServiceEndpointSlot`, `CallerHolonSlot`, `MetricSlot`.
   – SlotKind is **structural**: it picks out **one distinguished place** in the argument/port/field list of a given relation, operator, record, or other signatured bundle; it does **not** name a “role” played by whatever fills the slot.
   – For an n‑ary relation/operator declared in a `U.Signature`, the pair *(Signature id, SlotKind)* identifies a **slot**; positional indices are merely a presentation‑level enumeration of these slots.
   – What a filler “does” in that place (its contribution to laws, constraints, effects) is governed by the **laws over the Signature** and by the corresponding ValueKind, not by SlotKind‑as‑“role”.

2. **ValueKind (kind of slot filler).**
   *Which kinds of things may fill this position in principle (at the intensional level).*
   – Examples: `U.Entity`, `U.Holon`, `U.Method`, `U.Episteme`, `U.ClaimGraph`, `U.Viewpoint`, `U.Characteristic`, `U.ReferenceScheme`.
   – ValueKind is a **Kind** (C.3.\*) or another kernel‑level type; it is **not** a slot and never carries `*Slot`/`*Ref` suffixes.

3. **RefKind (how we store / refer).**
   *What reference/identifier we actually store in episteme when we fill this slot.*
   – Examples: `U.EntityRef`, `U.HolonRef`, `U.MethodRef`, `U.EpistemeRef`, `U.ViewpointRef`, `U.SurfaceRef`, (optionally) `U.ClaimGraphRef` if a Context chooses to reference claim graphs rather than store them by value.
   – RefKind is **about references, not values**; it usually points to an editioned artifact (A.7, F.15) and carries the `.edition` field when pinning a phase.

**Discipline:**

* Each declared argument position in a `U.Signature` **MUST** be described by:

  * a SlotKind (name and documentation),
  * a ValueKind (type of permissible fillers),
  * and either a RefKind or an explicit declaration “**by‑value**” (no RefKind; the value is embedded).
* SlotKind and ValueKind are **intensional**; RefKind is **representational**. This mirrors I/D/S: *slot* describes structure, *value* describes what can sit there, *ref* describes how we point to concrete instances.
#### Naming discipline: Slot and Ref

This pattern introduces the following **lexical constraints**, aligned with E.10:

1. **`*Slot` reserved for SlotKind.**

   * Any Tech name ending with `…Slot` **MUST** denote a SlotKind: a named place in a relation/morphism signature.
   * Examples:
     – `DescribedEntitySlot`, `GroundingHolonSlot`, `ClaimGraphSlot`, `ViewpointSlot`, `ViewSlot`, `RepresentationSchemeSlot`, `ReferenceSchemeSlot`.
   * `*Slot` **MUST NOT** appear in names of:
     – ValueKind (e.g. `U.Entity`, `U.Holon`, `U.Method`),
     – RefKind (e.g. `U.EntityRef`),
     – concrete episteme fields (they may be named e.g. `describedEntityRef`, but not `describedEntitySlotField`).

2. **`*Ref` reserved for RefKind and reference fields.**

   * Any Tech name ending with `…Ref` **MUST** denote either:
     – a **RefKind** (type of references/identifiers), or
     – a **field** whose type is a RefKind (`describedEntityRef : U.EntityRef`).
   * `*Ref` **MUST NOT** appear in names of:
     – ValueKinds (e.g. `U.EntityRef` **cannot** mean “an entity”; it is a reference type),
     – SlotKinds,
     – Kinds themselves (`U.Kind`, `U.Entity`, `U.Holon`).

3. **ValueKind names carry no `*Slot`/`*Ref`.**

   * ValueKinds are named using standard FPF conventions (A/E/F, E.10), without `*Slot`/`*Ref`.
   * Examples: `U.Entity`, `U.Holon`, `U.Method`, `U.ClaimGraph`, `U.ReferenceScheme`, `U.Viewpoint`, `U.View`.

4. **No “Role” as SlotKind head.**

   * In the context of relation signatures, **do not** use “Role” as the head noun for SlotKinds (to avoid conflict with `U.Role`).
   * Use “Slot” or a neutral description: e.g. `EnactorHolonSlot` (ValueKind `U.Holon`) rather than `EnactorRoleSlot`.

These rules become part of the **LEX‑BUNDLE guards** and are enforced by F.18 / name‑acceptance harnesses.
#### Integration with U.Signature (A.6.0)

`U.Signature` already provides a generic pattern for declaring morphism/relationship signatures (SubjectKind, BaseType, Quantification, ResultKind, Vocabulary, Laws).

`U.RelationSlotDiscipline` refines this by adding a **SlotSpec** layer:

*For each parameter position `i` in a signature*:

```
SlotSpec_i = ⟨name: SlotKind, value: ValueKind, refMode: {ByValue | RefKind}⟩
```

* **SlotKind** — Tech name with `*Slot` suffix, plus documentation.
* **ValueKind** — a `U.Type` (often a `U.Kind` or kernel type) declaring the intensional universe of admissible fillers.
* **refMode**:

  * `ByValue` — the actual value of ValueKind is embedded (typical for small structured values like `U.ClaimGraph` inside an episteme card).
  * `RefKind` — a **type** of references/identifiers for that ValueKind; e.g. `U.EntityRef` for `U.Entity`, `U.HolonRef` for `U.Holon`. Substitution then operates on references, not directly on the underlying values.

In practice, a `U.Signature` that follows this pattern:

* becomes **self‑documenting**: each parameter has a clear “slot vs value vs ref” story;
* supports **typed substitution**: replacing content within the same SlotKind requires only ValueKind compatibility;
* aligns with **tool signatures** in implementation languages (row‑typed records, dependently typed parameters, effect‑typed arguments). ([13])
#### Typed substitution discipline

Given a relation or morphism `R` with signature Σ and SlotSpecs `{SlotSpec_i}`:

* A **substitution** at slot `i` is a change of the **slot content** that fills SlotKind_i, within or across episteme entries.
* `U.RelationSlotDiscipline` enforces:

1. **SlotKind invariance.**
   A substitution **never** changes SlotKind — only the slot content (Value/Ref).
   – “We put a different dataset into the `DatasetSlot`.”
   – “We switch the grounding holon in `GroundingHolonSlot`.”

2. **ValueKind compatibility.**
   The new content **MUST** be of the same ValueKind (or a declared subkind) as `SlotSpec_i.value`; Kind‑CAL governs this (`⊑` in C.3.1–C.3.2). If a Context uses EoIClass species constraints (C.3.2), those act as additional guards but do **not** change the SlotKind.

3. **RefKind correctness.**
   If `refMode=RefKind`, the stored field is of that RefKind; substitutions operate on references, not on underlying values. Edition pinning is handled as usual by `.edition` fields in F‑patterns (F.15, etc.).

4. **By‑value vs by‑ref awareness.**
   Substitutions at by‑value slots (e.g. `ClaimGraphSlot`) are **content edits** to the episteme or relation instance; they may affect formality F or assurance lanes. Substitutions at ref slots are **retargetings** of describedEntity or context, and their legality is governed by A.6.2–A.6.4 and Bridge/CL rules. Tooling SHOULD surface this difference explicitly in authoring surfaces (e.g. separate “Ref” vs “embedded content” columns).

These rules give a uniform way to say:

> “You may swap component X with Y in this slot, because they share ValueKind and pass the relevant Kind/Bridge constraints.”
#### Slot operation lexicon (binding / filling / assignment / retargeting / mutation)

This subsection standardises **how Core and extensions talk about operations over slots**, without committing FPF to any particular programming language semantics. It is a *lexical* and *didactic* guardrail that preserves the SlotKind/ValueKind/RefKind stratification in prose.

##### Four‑way separation: Identifier vs Slot vs Slot‑content vs Referent

*Diagram is illustrative; the term distinctions are normative.*

To avoid conflating “binding / assignment / passing / mutation”, FPF authors SHALL keep the following separation in mind:

```
(1) Identifier/Name  ──binds-to──>  (2) SlotKind  ──in an instance──>  (2′) Slot‑instance  ──filled-with──>  (3) Slot‑content (Value | Ref)
                                                              └─(if Ref) resolves-to──> (4) Referent value / artifact
```

**Normative terms**:

* **Identifier** (Surface): a name used in a syntax, table column, record field, port label, or parameter label.
* **SlotKind** (I‑plane): the signature‑level label for a distinguished place in a relation.
* **Slot‑instance** (S‑plane / representation): the actual location/cell/position corresponding to a SlotKind inside a specific relation instance, record, port bundle, or episteme card.
* **Slot‑content** (representation): what is stored in a slot‑instance. It is either:

  * a **by‑value value** of ValueKind, or
  * a **reference handle** of RefKind.
* **Referent**: the intensional thing the RefKind points to when resolved (often an editioned artifact).

This separation is the anchor for all “binding time” talk in A.6.5:4.6.
##### Canonical verbs (Tech register) for slot operations (normative)

When a pattern, bridge, or operator description discusses a change or action “with respect to a slot”, it SHALL use (or explicitly map to) the following verbs. Each verb is tied to **which link/layer it affects**.

1. **bind / rebind** (Identifier → SlotKind/slot‑instance).
   *Use when the subject is an Identifier/Name and the effect is changing what that name designates.*
   – **bind**: establish a new association of an Identifier to a SlotKind/slot‑instance (or to a value in a language surface).
   – **rebind**: change an existing association of an Identifier to designate a different slot‑instance or different value.
   **Guard:** do not use “bind” to mean “write into a slot”. Binding is about *names*, not slots.

2. **fill** (Slot‑instance ← Slot‑content).
   *The generic, cross‑domain verb meaning “provide slot‑content for a slot‑instance”.*
   – Fill does **not** by itself imply first‑time vs update, nor by‑value vs by‑ref.
   – Use **fill** when discussing hardware slots, tuple coordinates, ports, record fields, or parameters uniformly.

3. **initialize** (first fill).
   *Use when the slot‑instance previously had no content.*
   – For `refMode=RefKind`: initialization sets the initial reference handle.
   – For `ByValue`: initialization sets the embedded initial value.
   **Guard:** do not call initialization “assignment” in normative text.

4. **assign / set / write / update** (subsequent fill; slot‑content replacement).
   *Use when a slot‑instance already has content and you replace it with new content.*
   – These verbs are allowed as near‑synonyms, but **SHOULD** be used consistently within one pattern family.
   **Guard:** when `refMode=RefKind`, prefer **retarget** (below) if the intent is “change what this ref points to”, not “edit content”.

5. **retarget** (Ref slot update, same SlotKind/ValueKind).
   *Use only for `refMode=RefKind` slots, when the operation replaces one reference handle with another, thereby changing the referent while preserving SlotKind and ValueKind.*
   – “Retarget `DescribedEntitySlot` from `UserService#staging` to `UserService#prod`.”
   Retargeting is the canonical FPF verb for “swap the referenced thing in this slot”.

6. **substitute** (typed replacement with explicit compatibility claim).
   *Use when the statement’s main point is the **compatibility law** (“allowed because ValueKind matches”).*
   – Substitute is a **discipline word**: it signals that SlotKind is fixed and ValueKind compatibility is being asserted/checked.

7. **resolve / dereference** (Ref → Referent).
   *Use when a reference handle is mapped to the intensional referent.*
   – This is where “late binding” often hides in runtime systems (dispatch, dynamic lookup, registry indirection).
   **Guard:** resolving a reference is distinct from retargeting the reference.

8. **mutate / modify** (Referent internal change; content unchanged).
   *Use only when the referent itself changes while the slot‑content (the reference handle) does not.*
   **FPF note:** In edition‑disciplined contexts, prefer to describe intentional change as **revise / re‑edition** + **retarget**, rather than “mutate”, because the Core treats editioned artifacts as stable per edition (A.7, F.15).

9. **pass** (parameter slot filling).
   *Use for method/service signatures when an argument fills a parameter slot at a call boundary.*
   – Passing is a specialised instance of **fill**, typically realised as parameter binding + slot filling in implementation languages. In FPF text, “pass into SlotKind” is acceptable if SlotKind names the parameter position.
##### Canonical nouns (normative)

To prevent role metaphors from re‑entering slot talk:

* Use **slot‑content** (preferred) or **slot filler** for “the thing currently in the slot”.
* Avoid person/role metaphors such as **occupant** in normative writing. If a Context insists on using such a word in Plain register, it SHALL define it explicitly as a synonym for slot‑content and SHALL NOT derive role semantics from it.
* Use **target**/**referent** for what a Ref points to; use **retargeting** for changing the target by changing the Ref.
* Use **by‑value edit** (or **embedded content edit**) for changes to a `ByValue` slot such as `ClaimGraphSlot`.
##### Operator naming guidance for slot‑writing operators (normative, but intentionally lightweight)

When naming an operator/morphism/bridge whose primary effect is a slot change, the Tech name SHOULD make two things legible:

1. **Which SlotKind(s) it writes**, and
2. **Which operation class it is**, using the canonical verbs above.

Recommended patterns (examples only; Contexts may adopt their own naming style via F.18):

* `Retarget<SlotQualifier>` for ref‑slot retargeting (e.g. `RetargetDescribedEntity`, `RetargetGroundingHolon`).
* `Edit<SlotQualifier>` / `Update<SlotQualifier>` for by‑value content edits (e.g. `EditClaimGraph`).
* `Substitute<SlotQualifier>` when the operator exists to enforce/declare ValueKind compatibility (e.g. `SubstituteDataset`).
* `Resolve<SlotQualifier>` when the operator is about resolving a Ref to a referent (e.g. `ResolveServiceEndpoint`).

This rule is a lexical enforcement of A.6.5:4.4 (typed substitution discipline): the name should tell the reader whether the operator is a **retargeting** (ref change) or a **content edit** (by‑value change).
#### Binding time and “early vs late binding” (normative framing, informative examples)

In cross‑domain slot talk, “early binding / late binding” is meaningful only if the author states **which link is being fixed when**. Under A.6.5:4.5, there are three distinct “times” that writers must not conflate:

1. **SlotSpec time (signature time).**
   SlotKind / ValueKind / refMode are fixed when the `U.Signature` is declared. This is “early” by definition in FPF Core.

2. **Slot filling time (initialization / assignment / retargeting).**
   A particular relation instance / episteme card / parameter bundle acquires slot‑content for a SlotKind.
   – *Early‑filled* means: chosen at authoring/spec time (e.g. configuration pins a specific `U.HolonRef`).
   – *Late‑filled* means: chosen at runtime or late in a workflow (e.g. service endpoint selected by policy at deployment).

3. **Resolution / dispatch time (resolve RefKind; select referent).**
   Even if a ref handle is present, the referent may be resolved early or late.
   – *Eager resolution* means: resolve now, cache/commit to a referent.
   – *Lazy resolution* means: resolve on demand.
   – *Dynamic dispatch* is a special case: the “method slot” is resolved at call time based on a receiver/context, rather than being statically selected.

**Rule (lexical guard):**
Any use of “early binding” / “late binding” in Core or extensions SHALL specify which of the above it refers to, using one of:

* **early/late‑filled** (slot filling),
* **eager/lazy‑resolved** (resolution),
* **early/late name‑binding** (Identifier binding, if a language surface is being discussed).

This preserves the A.6.5 stratification and prevents importing accidental semantics from a specific programming language.
### Archetypal Grounding (Tell‑Show‑Show)

Following E.7, we ground the pattern in a **System** example and an **Episteme** example.

#### System example — authentication pipeline signature

Consider an `AuthPipelineSpecKind` (system‑level episteme describing an authentication pipeline for a microservice). Its key slots might be:

* `DescribedEntitySlot` — “which holon the pipeline is about”
  – ValueKind: `U.Holon` (EoIClass = “UserService system”).
  – RefKind: `U.HolonRef` (e.g. `UserService#prod`).

* `AuthProviderComponentSlot` — “which authentication provider component is selected”
  – ValueKind: `U.Holon` (EoIClass = “AuthProviderSystem”).
  – RefKind: `U.HolonRef` (e.g. `Auth_OIDC`, `Auth_LDAP`).

* `ClaimGraphSlot` — “what is asserted about the pipeline”
  – ValueKind: `U.ClaimGraph`.
  – refMode: `ByValue` (ClaimGraph stored inside the episteme card).

Substitutions / retargetings:

* **Retargeting** `AuthProviderComponentSlot` from `Auth_OIDC` to `Auth_LDAP`:
  – SlotKind fixed (`AuthProviderComponentSlot`).
  – ValueKind unchanged (`U.Holon`, `AuthProviderSystem ⊑ U.Holon`).
  – RefKind unchanged (`U.HolonRef`).
  – Semantically: “retarget the ref that fills the same slot”.

* **Retargeting** `DescribedEntitySlot` from `UserService#staging` to `UserService#prod`:
  – Same SlotKind and ValueKind.
  – Different `U.HolonRef` slot‑content.
  – May require different grounding and assurance episteme, but the slot discipline is identical.
#### Episteme example — model evaluation result

Consider `ModelEvaluationResultKind` as an episteme kind:

* `DescribedEntitySlot` — the model being evaluated
  – ValueKind: `U.Method` (intensional ML model).
  – RefKind: `U.MethodRef` (id of `Model_v3`).

* `DatasetSlot` — the dataset on which it is evaluated
  – ValueKind: `U.Entity` (EoIClass = “Dataset”).
  – RefKind: `U.EntityRef` (e.g. `Dataset_A`, `Dataset_B`).

* `TargetCharacteristicSlot` — the characteristic being measured
  – ValueKind: `U.Characteristic` (`Accuracy`, `F1`, `AUROC`).
  – RefKind: `U.CharacteristicRef`.

* `GroundingHolonSlot` — evaluation environment
  – ValueKind: `U.Holon` (e.g. `EvalCluster#1`).
  – RefKind: `U.HolonRef`.

* `ClaimGraphSlot` — evaluation result graph
  – ValueKind: `U.ClaimGraph`.
  – refMode: `ByValue`; the numeric thresholds and results live inside `content : U.ClaimGraph`.

Typical moves:

* `DatasetSlot`: **retarget** `Dataset_A` → `Dataset_B` to test generalisation.
* `TargetCharacteristicSlot`: **retarget** `Accuracy` → `F1` to focus on class imbalance.
* `ClaimGraphSlot`: **by‑value edit** thresholds from “`P95Latency ≤ 200 ms`” to “`≤ 150 ms`” — a `ByValue` content edit, not a ref retargeting.

The SlotKind/ValueKind/RefKind discipline makes these moves **local and explicit**: the pattern describes which moves are allowed where, and A.6.2–A.6.4 then constrain how episteme morphisms may change ClaimGraphs and references.
#### Didactic micro‑examples — substitution by SlotKind / ValueKind / RefKind (informative)

The following short examples are intended for a didactic guide or for cross‑references from A.6.0/A.6.x/C.2.1. In all of them:

* **SlotKind** names the **place/position in the structure** (slot/field/coordinate in a tuple/record/port bundle).
* **ValueKind** is the **kind of value** admissible at that place.
* **RefKind** is the **reference/identifier type** used in episteme when that slot is filled (absent when the slot is by‑value).
* `GroundingHolon` is **not** a separate kernel type: it is simply a `U.Holon` used as the ValueKind of `GroundingHolonSlot`.

Example names like `FurnitureSafetyDescriptionKind`, `AuthPipelineSpecKind`, `ModelEvaluationResultKind`, `IncidentRunbookSpecKind`, `ServiceSLARequirementKind` are **context‑local** kinds, not new kernel tokens.

##### Mechanics — stool on a test rig

*EpistemeKind:* `FurnitureSafetyDescriptionKind`.

*SlotKind / ValueKind / RefKind:*

* `DescribedEntitySlot` — SlotKind “what this description is about”; ValueKind `U.Entity` with EoIClass ⊑ `U.Holon` (stool as a furniture holon); RefKind `U.EntityRef` (identifier of a concrete stool `S_i`).
* `GroundingHolonSlot` — SlotKind “where the test happens”; ValueKind `U.Holon` (test rig `LabRig_j`); RefKind `U.HolonRef`.
* `ClaimGraphSlot` — SlotKind for the internal content; ValueKind `U.ClaimGraph`; refMode `ByValue` (graph embedded in the episteme).

*Substitutions (all under the **same** SlotKinds):*

* Episteme `E₁`: `describedEntityRef = S_1`, `groundingHolonRef = LabRig_A`.
* Episteme `E₂`: `describedEntityRef = S_2`, `groundingHolonRef = LabRig_A` — **substitute another stool in the same `DescribedEntitySlot`** (different `U.EntityRef` slot‑content).
* Episteme `E₃`: `describedEntityRef = S_1`, `groundingHolonRef = LabRig_B` — **substitute another test rig in `GroundingHolonSlot`** while keeping the same object‑of‑talk.

In all three cases the SlotKinds (and ValueKinds) are stable; only the **Refs that fill those slots** change. This matches the engineering idiom “drop another module into the same slot”.
##### Microservices — switching the authentication provider

*EpistemeKind:* `AuthPipelineSpecKind`.

*SlotKind / ValueKind / RefKind:*

* `DescribedEntitySlot` — ValueKind `U.Holon` with EoIClass = “`UserService` holon”; RefKind `U.HolonRef` (e.g. `UserService#prod`).
* `AuthProviderComponentSlot` — SlotKind “which auth provider component is used in this pipeline”; ValueKind `U.Holon` with EoIClass = “`AuthProviderSystem` holon”; RefKind `U.HolonRef` (e.g. `Auth_OIDC`, `Auth_LDAP`).
* `ClaimGraphSlot` — ValueKind `U.ClaimGraph`; refMode `ByValue` (pipeline invariants and flow logic).

*Substitutions / retargetings:*

* Episteme `Spec_OIDC`: `describedEntityRef = UserService#prod`, `authProviderComponentRef = Auth_OIDC`.
* Episteme `Spec_LDAP`: same `describedEntityRef = UserService#prod`, but `authProviderComponentRef = Auth_LDAP`.

Here SlotKind is identical (`AuthProviderComponentSlot`); ValueKind is “any auth‑provider holon”; the episteme change is purely a **retargeting** of the `U.HolonRef` slot‑content.
##### Data/ML — swapping dataset or target characteristic

*EpistemeKind:* `ModelEvaluationResultKind`.

*SlotKind / ValueKind / RefKind:*

* `DescribedEntitySlot` — ValueKind `U.Method`; RefKind `U.MethodRef` (e.g. `Model_v3`).
* `DatasetSlot` — ValueKind `U.Entity` with EoIClass = “dataset”; RefKind `U.EntityRef` (`Dataset_A`, `Dataset_B`, …).
* `TargetCharacteristicSlot` — ValueKind `U.Characteristic`; RefKind `U.CharacteristicRef`.
* `GroundingHolonSlot` — ValueKind `U.Holon`; RefKind `U.HolonRef`.
* `ClaimGraphSlot` — ValueKind `U.ClaimGraph`; refMode `ByValue`.

*Substitutions / retargetings:*

* `Eval_1`: `describedEntityRef = Model_v3`, `datasetRef = Dataset_A`, `targetCharacteristicRef = Accuracy`, `groundingHolonRef = EvalCluster#1`.
* `Eval_2`: same model / characteristic / cluster, but `datasetRef = Dataset_B` — **substitute another dataset in `DatasetSlot`** (retarget the dataset ref).
* `Eval_3`: same model and dataset, but `targetCharacteristicRef = F1` — **substitute another characteristic in `TargetCharacteristicSlot`**.
##### Operational practice — the same runbook in different operating centres

*EpistemeKind:* `IncidentRunbookSpecKind`.

*SlotKind / ValueKind / RefKind:*

* `DescribedEntitySlot` — ValueKind `U.Method`; RefKind `U.MethodRef`.
* `GroundingHolonSlot` — ValueKind `U.Holon`; RefKind `U.HolonRef`.
* `ClaimGraphSlot` — ValueKind `U.ClaimGraph`; refMode `ByValue`.

*Substitutions / retargetings:*

* `Runbook_DC1`: `describedEntityRef = MajorIncidentRunbook`, `groundingHolonRef = DC1_NOC`.
* `Runbook_DC2`: same `describedEntityRef`, but `groundingHolonRef = DC2_NOC`.

This is “one and the same method is specified and validated in two different operational environments”: SlotKind and ValueKind are stable; only the `U.HolonRef` slot‑content differs.
##### SLO/SLA requirements — changing the target characteristic vs changing the threshold

*EpistemeKind:* `ServiceSLARequirementKind`.

*SlotKind / ValueKind / RefKind:*

* `DescribedEntitySlot` — ValueKind `U.Holon`; RefKind `U.HolonRef` (e.g. `CheckoutService#prod`).
* `TargetCharacteristicSlot` — ValueKind `U.Characteristic`; RefKind `U.CharacteristicRef`.
* `ClaimGraphSlot` — ValueKind `U.ClaimGraph`; refMode `ByValue`. Numeric thresholds live **inside the ClaimGraph as literals**, not as RefKinds.

*Moves:*

* `SLA_latency_200`: `describedEntityRef = CheckoutService#prod`, `targetCharacteristicRef = P95Latency`; ClaimGraph contains `P95Latency ≤ 200 ms`.
* `SLA_latency_150`: same refs, but ClaimGraph threshold is `P95Latency ≤ 150 ms`. This is a **by‑value edit** of `ClaimGraphSlot`.
* `SLA_availability_99_9`: same `describedEntityRef`, but `targetCharacteristicRef = Availability`; ClaimGraph states `Availability ≥ 99.9%`. This is a **retargeting** of `TargetCharacteristicSlot`.
### Bias‑Annotation

**Lenses tested and scope.** This pattern was read through all five Principle‑Taxonomy lenses (`Gov`, `Arch`, `Onto/Epist`, `Prag`, `Did`) and is intended as a **universal** discipline for n‑ary relation and morphism signatures across Parts A/B/C/E. It leans toward the `Arch` and `Onto/Epist` lenses (typed signatures, explicit kinds), but mitigates this by (a) keeping the discipline notation‑agnostic, (b) aligning with existing tooling rather than prescribing any, and (c) grounding the rules in System/Episteme examples with clear didactic intent. No domain‑specific scope limitation is claimed.

* **Typed‑language bias.**

  * The pattern leans on intuitions from typed programming languages (parameter types, records, references). This is intentional: it aligns FPF signatures with mainstream tooling and with post‑2015 typed effect/row systems. The pattern remains **notation‑agnostic** and does not commit to any specific PL or logic.

* **Slot‑first bias.**

  * We treat *slot* as the primary abstraction and discourage role‑style or object‑style naming for argument positions. This favours structural clarity over conversational metaphors (“subject/object/role”) and keeps `U.Role` free for RoleEnactment rather than param‑slots.

* **By‑value/by‑ref honesty.**
  We explicitly separate ValueKind and RefKind instead of hiding “by‑reference” behind the type system. This increases verbosity but makes reasoning about edition pinning, caching, and re‑targeting more robust, and keeps I/D/S distinctions visible inside signatures.

* **Lexicon bias (precision over metaphor).**
  We standardise the slot‑operation lexicon (bind/fill/initialize/assign/retarget/resolve/mutate) and discourage metaphors that smuggle role semantics back into SlotKinds. This increases didactic load, but directly reduces cross‑pattern ambiguity, especially in “binding time” discussions.

* **Episteme‑first describedEntity.**
  The examples and cross‑references prioritise episteme use‑cases (C.2.1, A.6.2–A.6.4) where describedEntity and retargeting are subtle. System‑only usages (e.g. method signatures) are absolutely allowed but not the driving case; they inherit the same discipline without additional obligations.
### Conformance Checklist (normative)

**CC‑A.6.5‑1 - SlotSpec for every parameter.**
Every `U.Signature` that declares an n‑ary relation or morphism **SHALL** assign to each parameter position a SlotSpec triple: `⟨SlotKind, ValueKind, refMode⟩`.

**CC‑A.6.5‑2 - `*Slot` discipline.**
Any Tech name ending with `…Slot` **MUST** denote a SlotKind; SlotKinds **MUST NOT** be used as ValueKinds or RefKinds.

**CC‑A.6.5‑3 - `*Ref` discipline.**
Any Tech name ending with `…Ref` **MUST** denote either a RefKind or a field whose type is a RefKind. ValueKinds and SlotKinds **MUST NOT** end in `…Ref`.

**CC‑A.6.5‑4 - ValueKind purity.**
ValueKinds **MUST** be declared without `*Slot`/`*Ref` suffixes and **MUST** be FPF types (often `U.Kind` or kernel‑level types). Any existing type whose name violates this rule must be either:

* reclassified as a RefKind, or
* renamed to drop the suffix.

**CC‑A.6.5‑5 - Episteme core SlotKinds.**
For episteme kinds (`U.EpistemeKind`), the following SlotKinds **SHALL** be used (or their documented refinements) in C.2.1 / C.2.x:

* `DescribedEntitySlot` with ValueKind `U.Entity` **or a declared subkind** (e.g. `U.Method`, `U.Holon`) via Kind‑CAL (EoIClass ⊑ `U.Entity` at species level);
* `GroundingHolonSlot` with ValueKind `U.Holon`;
* `ClaimGraphSlot` with ValueKind `U.ClaimGraph` and `ByValue` mode in the minimal core;
* `ViewpointSlot` with ValueKind `U.Viewpoint`;
* `ViewSlot` with ValueKind `U.View` (`U.EpistemeView`);
* `ReferenceSchemeSlot` with ValueKind `U.ReferenceScheme` and `ByValue` mode in the minimal core.

**CC‑A.6.5‑6 - No “Role” as SlotKind head.**
SlotKinds **MUST NOT** use “Role” as their head noun; use “Slot” with a neutral qualifier instead (e.g., `EnactorHolonSlot`). `U.Role` remains reserved for RoleEnactment patterns.

**CC‑A.6.5‑7 - Substitution checks.**
Any pattern that describes substitution or replacement of arguments **MUST** phrase its rules in terms of SlotKinds and ValueKinds (and, where relevant, RefKinds), not in terms of unstructured parameter indices or ad‑hoc labels.

**CC‑A.6.5‑8 - Cross‑pattern consistency.**
When the same conceptual position is used across patterns (e.g. “describedEntity target”, “grounding holon”, “caller system”), the **same SlotKind name** and ValueKind **SHALL** be reused, unless a documented Bridge declares a different discipline or the pattern explicitly scopes itself to a distinct calculus.

**CC‑A.6.5‑9 - Migration of legacy `…Ref`/`…Slot` usage.**
Contexts adopting this pattern **MUST** maintain a migration table for legacy types/fields whose names contain `Ref` or `Slot` but do not comply with the new discipline. Each entry shall state:

* old name and role,
* new SlotKind/ValueKind/RefKind,
* whether the old name becomes an alias (deprecated) or is removed.

**CC‑A.6.5‑10 - Pattern integration.**
New or revised patterns in Part A/B/C/E that introduce n‑ary relations, morphisms, or signatures **SHALL** reference A.6.5 in their Relations section and attest that they follow SlotKind/ValueKind/RefKind discipline.

**CC‑A.6.5‑11 - Slot‑content terminology.**
Normative text that refers to “what is in a slot” **SHALL** use **slot‑content** (or **slot filler**) and **SHALL NOT** rely on role/person metaphors (e.g. “occupant”) unless explicitly defined as a strict synonym for slot‑content with no added semantics.

**CC‑A.6.5‑12 - Slot‑operation verb discipline.**
Any normative description of a change “to a slot” **MUST** specify which operation class it is (initialize vs assign/set vs retarget vs by‑value edit vs resolve vs mutate/revise), using the canonical verbs in A.6.5:4.5.2 or explicitly mapping local terms to them.

**CC‑A.6.5‑13 - Binding‑time clarity.**
Any use of “early binding / late binding” (or equivalent) **MUST** specify whether it refers to:

* Identifier binding (name‑binding),
* Slot filling (early/late‑filled),
* Reference resolution / dispatch (eager/lazy‑resolved).
### Consequences

**Benefits**

* **Uniform language for arguments and for operations.**
  Any n‑ary relation (episteme, role, method, service, guard) can be described with the same SlotKind/ValueKind/RefKind triple **and** with a stable operation lexicon (fill/initialize/assign/retarget/resolve).

* **Safer substitutions.**
  Substitution, retargeting, and viewing laws (A.6.2–A.6.4) can be stated in terms of *which SlotKinds* they read/write and *which ValueKinds* they preserve or retarget, without accidentally collapsing into “just replace the thing”.

* **Cleaner naming and migration.**
  Misuses of `*Ref`, `*Slot`, “Role”, “Subject”, “Object” in signatures become guard‑detectable; migration strategies can be described as re‑factoring SlotKinds and ValueKinds rather than ad‑hoc renames.

* **Tool alignment.**
  Implementation languages with **row‑typed records, dependent types, and algebraic effects** map naturally to the SlotKind/ValueKind/RefKind layers, easing code generation and static analysis. ([13])

**Trade‑offs / mitigations**

* **Extra metadata in signatures.**
  Every parameter now has three pieces of information instead of one. Mitigation: template support in authoring tools; pattern‑guided macros for common shapes (episteme, role, method, service).

* **Stricter lexical rules.**
  Some legacy names will need migration (`EpistemicObject`, ad‑hoc `…Ref` types). Mitigation: migration notes in F.18 and dedicated anti‑pattern sections; transitional aliases allowed but marked deprecated.

* **Learning curve.**
  Authors must learn to think “SlotKind/ValueKind/RefKind” *and* distinguish “retarget vs edit vs resolve” before writing `id` or `subject`. Mitigation: Tell‑Show‑Show examples and a didactic micro‑guide on slot operations referenced from A.6.0/C.2.1/E.17.0.
### Rationale

**Why a SlotKind/ValueKind/RefKind triple at all.**
In FPF this pattern makes `U.Signature` behave like a lightweight dependently‑typed record discipline: SlotKind plays the role of an index or label, ValueKind is the family of admissible fillers at that position, and RefKind captures the representation choice (by‑value or via a handle). This mirrors the way post‑2015 work on row‑polymorphic data and effect rows treats labels and field kinds as first‑class, while keeping the Core notation‑neutral.

**Why separate ValueKind from RefKind.**
In practice, “Ref” types tend to be quietly used as if they were values, eroding the I/D/S split and making edition discipline invisible. By insisting that ValueKind is always the conceptual kind (“what sort of thing is this about?”) and RefKind is always the reference/identifier kind (“how do we point at it in Episteme?”), the pattern aligns with E.10.D2’s intension/description/specification discipline and with modern resource‑aware logics that keep values and resources distinct.

**Why add a slot‑operation lexicon.**
The triple only buys safety if authors and tools can see it at a glance **and** can narrate changes without collapsing layers. A.6.5:4.5 makes the common “put something in a slot” moves explicit: initialization vs assignment vs retargeting vs by‑value editing vs resolution. This directly reduces ambiguity in episteme morphism descriptions (A.6.2–A.6.4) and prevents accidental imports from a specific PL’s terminology.

**Why standardise episteme SlotKinds.**
describedEntity and grounding recur across epistemes; standard SlotKinds (`DescribedEntitySlot`, `GroundingHolonSlot`, `ClaimGraphSlot`, etc.) let A.6.2–A.6.4 and C.2.1 talk about substitutions and retargetings once, instead of re‑defining “what this is about” in every pattern.

**Why lexical rules (`*Slot`, `*Ref`, operation verbs, no “Role” heads).**
The discipline must be cheap to apply. Reserving `*Slot` for SlotKinds and `*Ref` for RefKinds/fields gives a syntax‑level guard against conflating places, kinds, and handles. Standardising operation verbs (initialize/retarget/resolve) prevents prose from re‑introducing the same conflation by different words.
### SoTA‑Echoing (post‑2015 practice alignment)

**Purpose.** To situate SlotKind/ValueKind/RefKind discipline with respect to contemporary typed and relational approaches, without importing any external calculus into the Core. All items are used as conceptual comparators; concrete reuse in a `U.BoundedContext` would happen only via explicit Bridges (F.9) with declared CL penalties.

1. **Row‑typed, extensible data / effect rows (adopt/adapt).**
   Post‑2015 work on row polymorphism and extensible data/effect rows treats records and variants as labelled collections of fields whose presence and type can evolve independently.
   **Adopted:** the idea that **positions** (labels) are first‑class and carry their own typing discipline.
   **Adapted:** instead of row kinds, FPF uses SlotKind/ValueKind/RefKind triples for n‑ary relations and epistemic slots; the pattern is notation‑agnostic and applies equally to episteme structures, role relations, and service signatures. ([13])

2. **Dependent type systems engineered via macros (adopt/adapt).**
   Macro‑based dependent type systems such as Turnstile+ separate structural indices, value‑level types, and evidence, while allowing them to be related by construction.
   **Adopted:** the separation between **indices/labels** and **values**, and the intuition that signatures should expose both explicitly.
   **Adapted:** SlotKind corresponds to a structural index, ValueKind to the ordinary type of fillers, and RefKind to runtime‑level identifiers; the discipline is phrased at the FPF specification and kept independent of any particular PL.

3. **Relational models of types‑and‑effects (adapt).**
   Relational models for types‑and‑effects distinguish value positions from effect/resource annotations and track substitution separately across these layers.
   **Adopted:** the insistence that reasoning about **substitution and equality** must be stratified (values vs additional structure).
   **Adapted:** A.6.5 stratifies *slot / value / reference* instead of *value / effect*, and applies the discipline not only to programs but also to epistemes, roles, methods, and services. ([15])

4. **Optics / lenses as disciplined projections (echo).**
   Profunctor optics formalise get/put pairs where a fixed “focus” position within a larger structure is manipulated under composition laws.
   **Echoed:** SlotKind plays the role of the focus coordinate; ValueKind is the focus type; RefKind determines whether the focus is stored by value or via a handle. This perspective informs later use of SlotKind discipline in EpistemicViewing (A.6.3) and multi‑view publication (E.17). ([16])

**Cross‑Context reuse and Bridges.** When a `U.BoundedContext` chooses to adopt a concrete row‑typing discipline, relational logic, or optics library, it **SHALL** do so via explicit Bridges (F.9) with CL and (for plane crossings) `Φ(CL)`/`Φ_plane` policy‑ids, keeping numerical policies and notations Context‑local. A.6.5 only constrains the **slot discipline** that such Bridges must respect.
### Relations (with other patterns)

**Specialises A.6.P `U.RelationalPrecisionRestorationSuite`.**
A.6.5 is the RPR specialisation for “n‑ary relation as slots”: it restores hidden arity by making participant positions explicit as SlotKinds, and stabilises change semantics via the slot‑operation lexicon + lexical guards.


**Builds on A.6.0 `U.Signature`.**
Refines parameter declarations with SlotSpec triples `⟨SlotKind, ValueKind, refMode⟩` while leaving the rest of the signature structure (SubjectKind, BaseType, Quantification, ResultKind, Laws) unchanged. SlotKinds become the canonical labels for argument positions.

**Constrains C.2.1 `U.EpistemeSlotGraph`.**
Fixes core episteme SlotKinds (`DescribedEntitySlot`, `GroundingHolonSlot`, `ClaimGraphSlot`, `ViewpointSlot`, `ViewSlot`, `ReferenceSchemeSlot`) and their ValueKinds/`ByValue` vs Ref discipline. C.2.1 and its extensions SHALL use these SlotKinds (or documented refinements) so that episteme morphisms can be expressed uniformly over slots.

**Supports A.6.2–A.6.4 (episteme morphisms and viewing).**
DescribedEntity‑preserving vs describedEntity‑retargeting morphisms can now be stated as constraints on which SlotKinds’ ValueKinds/RefKinds they may change. Retargeting becomes “retargeting at `DescribedEntitySlot` under a Kind‑Bridge” rather than an ad‑hoc parameter tweak. The operation lexicon in A.6.5:4.5 makes “retarget vs edit vs resolve” explicit in these morphism descriptions.

**Coordinates with B.5.* (RoleEnactment).**
Role/assignment relations may declare SlotKinds such as `HolderHolonSlot`, `RoleSlot`, `ContextSlot`, `WindowSlot` with clear ValueKinds/RefKinds, instead of overloading “role” for both holonic roles and relation positions. This keeps `U.Role` semantics (A.2, F.6) separate from slot discipline.

**Coordinates with E.17 `U.MultiViewDescribing`.**
`Viewpoint` and `View` positions are governed by SlotKind/ValueKind/RefKind; view‑changing operations can be described as substitutions at specific SlotKinds that preserve ClaimGraph content while re‑indexing viewpoints and views.

**Feeds F.18 (LEX‑BUNDLE) and E.10 (LEX).**
Provides lexical guards for `*Slot` and `*Ref`, and (via A.6.5:4.5) for operation verbs:

* `*Slot` reserved for SlotKinds only;
* `*Ref` reserved for RefKinds and reference fields;
* ValueKinds and Kind names MUST NOT carry either suffix;
* slot‑operation verbs must not collapse retargeting into “editing”.

**Used by A.19 `CharacteristicSpace` and measurement patterns.**
Characteristic‑space slots already behave as positions with attached kinds; slot discipline in A.6.5 gives a uniform story for how such slots appear inside relation signatures, episteme cards, and service definitions, and how substitution over those slots is checked.

[13] https://dl.acm.org/doi/pdf/10.1145/3290325
[14] https://www.williamjbowman.com/resources/wjb2019-depmacros.pdf
[15] https://iris-project.org/pdfs/2017-popl-effects-final.pdf
[16] https://arxiv.org/pdf/1809.00738
### A.6.5:End
## U.BaseDeclarationDiscipline - Kind-explicit, scoped, witnessed base declaration discipline (with base-change lexicon)

**Plain-name.** Scoped witnessed base declaration discipline.

**Status.** Normative (Core).

**Placement.** Part A, cluster A.IV “Signature Stack & Boundary Discipline”; adjacent to A.6.5 `U.RelationSlotDiscipline`.

**Depends on.**
– A.6.0 `U.Signature` (universal signature carrier).
– A.6.5 `U.RelationSlotDiscipline` (SlotKind/ValueKind/RefKind stratification + slot-operation lexicon).
– A.2.6 (Scope discipline; explicit `Γ_time`; implicit “latest/current” is forbidden).
– A.2.4 `U.EvidenceRole` (timespan + evidence-role discipline for decision-relevant witness sets).
– A.7 (Strict Distinction; I/D/S vs Surface).
– E.8 (pattern authoring order & SoTA discipline).
– E.10 (LEX‑BUNDLE discipline; D.CTX lexical guardrails).

**Coordinates with.**
– A.10 Evidence–Provenance DAG discipline (`verifiedBy`, `validatedBy`).
– A.14 per-edge constructive grounding (`tv:groundedBy`) and `validationMode` discipline.
– C.2.1 `U.EpistemeSlotGraph` grounding slots (`GroundingHolonSlot`, `describedEntity`).
– A.6.3 `U.EpistemicViewing` (describedEntity-preserving view operators; base-relative “how” without retargeting).
– A.6.4 `U.EpistemicRetargeting` (base-change along `KindBridge`; retargeting lexicon and continuity rules).
– C.3.3 `U.KindBridge` & `CL^k` (explicit repair/translation when endpoint kinds or Contexts differ; no silent re-typing).
– E.18 assurance-operations on `U.Transfer` (`CalibrateTo`, `CiteEvidence`, `AttributeTo`, `ConstrainTo`, …).
– F.9 Bridges & CL (cross-context / cross-plane base declarations cite Bridge ids + CL policy).
– F.15 F‑Suite validation harness (SCR/RSCR pins and refresh governance).
– F.18 naming governance (surface rules for Tech/Plain twins).

**Aliases (informative; discouraged for normative prose).**
– “anchoring / anchor” (legacy umbrella colloquial; a red‑flag token for *under-described dependence*). **Prohibited in Tech register** as a meaning‑surrogate; treat it as a defect to be rewritten into an explicit `baseRelation(dependent, base)` form. Allowed only when referring to a **pattern-defined primitive** that already reserves the word (e.g., E.10 MG‑DA *Domain Anchoring*; evidence/pin “anchors” where the term is explicitly reserved), or inside quoted legacy text that is immediately followed by a conformant rewrite.
– “Qualified statement / attributed edge” (knowledge-graph colloquial).
– “Pinning” (when witnesses are edition pins).

**Mint‑or‑Reuse note (informative).**
This pattern **mints** the record shape name `U.ScopedWitnessedBaseDeclaration` (SWBD) and the **base‑change lexicon** operation class names (`declareBase`, `rebase`, `retime`, …) as canonical labels for semantic change classes.
It **reuses** A.6.5 SlotSpec discipline (SlotKind/ValueKind/RefMode), A.2.6 Scope discipline (`U.Scope`, explicit `Γ_time` when time matters), and A.2.4 witness semantics (`U.EvidenceRole`) as the enforcement substrate.

### Problem frame

FPF repeatedly needs to express a family of situations of the form:

> **A dependent content is admissible, usable, or interpretable only relative to an explicit base.**

This family appears across disciplines:

* reference selection and identification (IDs, handles, pointers, registries),
* scale/datums/calibration (measurement traceability, baselines, normalisation),
* grounding of properties and abstractions to objects (attribution; “this property is about that thing”),
* admissibility/assurance (claims linked to evidence, checks, or proofs),
* publication discipline (what a statement is fit to be used for, where, and when).

In drafts, authors often reach for a single umbrella metaphor (frequently “anchor/anchoring”). That metaphor collapses **different ontological situations** and **different operation classes**, blocking precise invariants and making perspective-flips inevitable.

> **Deconfliction note (lexical).** This pattern is about *base-dependence in content* (“X is usable relative to B”). It is not about E.10’s **Domain Anchoring** (MG‑DA), where “anchoring” is a *lexical* primitive meaning “object‑of‑talk anchoring” for token morphology. When you see `anchor*` in a basedness sentence, treat it as a defect unless an explicit baseRelation token is present.
>
> **Deconfliction note (context/meaning).** This pattern is also not a license to reintroduce “anchor” as a surrogate for **Context**, **SenseCell**, or “where meaning lives”. Any such use is an *anchor‑relapse* and SHALL be rewritten into explicit Context/SenseCell/ConceptSet lane constructs (E.10 D.CTX), not into SWBD.

Like A.6.5, this family also triggers **typing conflicts across viewpoints**: an endpoint may be spoken about in its self-kind while the baseRelation contract expects a different ValueKind (or a different `refMode`). If that mismatch is not made explicit (SlotSpec + contract), authors “solve” it by renaming ends or flipping direction, and the ontological obligation (bridge / narrowing / retargeting) is lost.

The structural reason for the collapse is consistent: what looks like “one anchoring” in prose is, in fact, a *based declaration* with at least five components:

1) **Dependent** — what is being made admissible/usable/meaningful,
2) **Base** — what it is relative to (reference frame / evidence carrier / standard / policy / object),
3) **BaseRelation** — the specific relation kind that states *how* dependent depends on base,
4) **Scope/Time** — where/when the declaration holds (`scope` plus explicit `Γ_time` when time matters),
5) **Witnesses / pins** — what justifies or enforces the declaration when it is used for decisions.

Until **BaseRelation** is named, umbrella words (“anchor”, “ground”, “attach”, “based on”) nearly always mean:

> “There is an under-described type of dependence here.”

This pattern introduces a single stable lens — **the based declaration** — and couples it with a strict lexical discipline and an operation lexicon, so that base-dependence can be expressed precisely across domains without collapsing back into metaphor.
### Problem

Typical failure modes this pattern is designed to eliminate:

1. **Relation-kind elision.**  
   One verb phrase is used to cover: ID-to-registry reference, claim-to-evidence admissibility, calibration-to-standard, property-to-object attribution, policy gating, etc. Rules and invariants cannot be stated because the relation family is unspecified.

2. **Perspective flip (dependent-view vs base-view).**  
   The same situation is described alternately as “X is anchored/grounded” and “Y is an anchor/ground”, with incompatible naming, hidden directionality, and silent re-typing of the ends.

3. **Base–witness confusion.**  
   Evidence, pins, certificates, or proofs are treated as “the base”, even when they are only witnesses for a base relation (or conversely: a true base is treated as a mere witness).

4. **Scope/time collapse.**  
   Based declarations are treated as timeless truths; time dependence is smuggled in via “current/latest/recently”, violating explicit `Γ_time` discipline.

5. **`Γ_time` used as a proxy for freshness.**  
   Authors treat `Γ_time` as “freshness” or “evidence decay”, collapsing TimePolicy with witness-timespan/freshness predicates.

6. **Decision use without witnesses.**  
   Declarations that gate work, publication, or assurance are asserted without a witness/pin, breaking auditability and enabling folklore.

7. **Grounding conflation.**  
   “Grounding” is used as if it were one relation, while FPF already distinguishes at least:
   * constructive grounding of a model-edge by a trace (`tv:groundedBy`),
   * situational/empirical grounding of an episteme via a grounding holon (C.2.1),
   * semantic meaning assignment (SenseCell/ConceptSet lane; not a base declaration).

8. **Slot/basing conflation.**  
   A.6.5 disambiguates positions in n-ary relations (SlotKind) vs fillers (ValueKind) vs stored references (RefKind). Umbrella basing language reintroduces confusion at the next layer: “why this link exists” (BaseRelation) is missing, and slot-edit operations are conflated with base-declaration edits.

9. **Anchor relapse (Context/meaning surrogate).**  
   “Anchor/anchoring” is used to mean “the context”, “the meaning”, “the global reference”, or “the thing that makes this true”. This collapses D.CTX + SenseCell/ConceptSet lanes into a metaphor and makes review/tooling impossible.
### Forces

| Force | Tension |
| --- | --- |
| **Universality vs precision** | One discipline must cover calibration, evidence linking, reference selection, attribution, gating, etc., without collapsing them into one pseudo-relation. |
| **Minimal kernel vs decision auditability** | Few primitives are preferred, but decision-relevant declarations must carry witnesses/pins and explicit time selectors where needed. |
| **Two perspectives, one reality** | Dependent-view and base-view must both be expressible without renaming roles or flipping meaning. |
| **Compatibility with A.6.5** | Base declarations introduce slots and edits; they must remain SlotKind/ValueKind/RefKind disciplined and must not collapse slot edits with semantic re-declarations. |
| **Lexical guardrails** | Without strict wording rules, umbrella metaphors will return and erase the structure. |
| **Cross-context integrity** | When dependent and base cross Contexts or planes, the declaration must remain explicit and reviewable; no silent semantic drift. |
### Solution — The U.ScopedWitnessedBaseDeclaration object and its lexicon

#### Canonical object

**Definition.** A **`U.ScopedWitnessedBaseDeclaration`** (SWBD) is a first-class base-declaration record *shape* (a signature in the A.6.0/A.6.5 sense): it reifies “dependent is usable relative to base via baseRelation, under scope/time, witnessed by pins”.

```
U.ScopedWitnessedBaseDeclaration ::=
  〈 * DependentSlot     : SlotContent(VK_dep,  refMode_dep),
    * BaseSlot          : SlotContent(VK_base, refMode_base),
    * BaseRelationSlot  : SlotContent(U.NameToken, ByValue),     // contract-bearing token; not free text; not U.Surface*
    * ScopeSlot         : SlotContent(U.Scope, ByValue),         // concretely: ClaimScope | WorkScope | PublicationScope
    * GammaTimeSlot?    : SlotContent(U.GammaTimePolicy, ByValue)?,
    * WitnessSetSlot?   : SlotContent(VK_wit,  refMode_wit)? 〉
 ```

Where:

* **`DependentSlot`** is the dependent content whose admissibility/usability/interpretation is being constrained.
* **`BaseSlot`** is the base (reference frame / target / object / standard / policy / evidence-carrier) that the dependent is declared relative to.
* **`BaseRelationSlot`** is a **declared relation/predicate/operator token** (a vocabulary element with a signature/contract) that states the precise kind of dependence. It is not a prose metaphor and is not a `U.Surface`/publication carrier.
* **`ScopeSlot`** is an explicit USM scope object (`U.Scope`): Claim scope (**G**), Work scope, or Publication scope.
* **`GammaTimeSlot`** is an explicit time selector/policy when time-dependent assumptions exist.
* **`WitnessSetSlot`** is a set of witness references/pins establishing justification or enforcement when the declaration is used for decisions.

**Notation.** `SlotContent(VK, refMode)` is a compact shorthand for “a slot whose SlotSpec declares `ValueKind=VK` and `refMode ∈ {ByValue | RefKind}` (A.6.5)”.

**SlotSpec note.** `VK_*` / `RK_*` / `refMode_*` above are **not** “anything goes”: they are fixed by the chosen `BaseRelationSlot` contract and must be declared as SlotSpecs (A.6.5). In other words, SWBD is a reusable *shape*, but each Context’s baseRelation family makes it a concrete, typed signature.

**Instance/prose notation note (convention).** In the prose and examples below, the *occupants* are written as `dependent`, `base`, `baseRelation`, `scope`, `Γ_time`, `witnesses` (no `*Slot` suffix). The `*Slot` suffix is reserved for SlotKinds/positions only (A.6.5 / E.10).

**Well-formedness constraints.**
* **WF‑BD‑1 (No kind-elision).** A base declaration is well-formed only if `BaseRelationSlot` is present and points to a declared vocabulary element with a known signature.
* **WF‑BD‑2 (No silent re-typing).** `DependentSlot` and `BaseSlot` type-check against the `baseRelation` contract (ValueKinds + `refMode`). If the intended endpoint kinds do not match, the repair path is explicit (Bridge / narrowing / explicit retargeting), rather than a rename.
* **WF‑BD‑3 (Time explicit when time matters).** If the declaration’s interpretation depends on time, `GammaTimeSlot` is explicit; “latest/current” is not a substitute.
* **WF‑BD‑4 (Decision use requires witnesses).** If the declaration is used for assurance, gating, or admissibility decisions, `WitnessSetSlot` is non-empty and resolvable.
* **WF‑BD‑5 (Edition fence for decision/publication).** An SWBD that is cited by PublicationScope or used for decision is immutable per edition: any permitted change class is represented as a new declaration linked via explicit continuity/withdrawal, not as an in-place rewrite.
* **WF‑BD‑6 (No silent cross-context reuse).** An SWBD that relates dependent and base across Contexts/planes (or requires scope translation) is admissible only if it cites the Bridge ids + CL policy that make the reuse admissible (F.9). No “it’s the same thing anyway” prose is an admissible substitute.

This is the discipline-level analogue of A.6.5’s move: disambiguation is achieved by making the missing structural component explicit and non-optional in decision-relevant contexts.
#### Underlying mathematical lens

SWBD reifies a **kind-labelled dependence arrow over a base**:

* a dependence edge **(dependent → base)**,
* labelled by a declared **relation token** (`baseRelation`),
* qualified by explicit **scope** and (when time matters) explicit **`Γ_time`**,
* optionally supported by a **witness set** (mandatory for decision use).

This “object over a base” lens is stable across disciplines:
calibration is “measurement over standard”, admissibility is “claim over evidence”, attribution is “property over object”, and constructive grounding is “edge over trace”.
#### Slot discipline for SWBD

Any signature that introduces SWBD (or SWBD-like relations) SHALL define SlotSpecs per A.6.5: every position declares **SlotKind / ValueKind / RefKind-or-ByValue**.

Recommended canonical SlotKinds for SWBD:

* `DependentSlot`
* `BaseSlot`
* `BaseRelationSlot`
* `ScopeSlot`
* `GammaTimeSlot`
* `WitnessSetSlot`

**Slot vs filler guard.** `*Slot` names the **position** (SlotKind), not the occupant. In prose, say “fills `BaseSlot` with …” rather than calling the base itself “a BaseSlot”. (`Slot` suffix is structural; E.10.)

**Slot-level invariants (derived from WF‑BD‑1..4; testable).**
* **Invariant (SlotSpec completeness).** In any SWBD signature, the SlotSpec for `DependentSlot` and `BaseSlot` declares admissible `ValueKind` and `refMode` explicitly (A.6.5). If those types cannot be stated, the `baseRelation` contract is not yet defined.
* **Invariant (Relation tokenness).** `BaseRelationSlot` holds a declared `U.NameToken` that resolves to a vocabulary entry with a known signature/contract (A.6.0 + A.6.5). It is not free text and is not typed as a publication surface (`U.Surface*`).
* **Invariant (Scope objectness).** `ScopeSlot` holds a `U.Scope` object (ClaimScope/WorkScope/PublicationScope) and is not replaced by “where it applies” prose.
* **Invariant (Time gating).** If time-dependent assumptions exist, the SWBD includes `GammaTimeSlot` carrying a `U.GammaTimePolicy` (WF‑BD‑3).
* **Invariant (Witness gating).** If the declaration participates in assurance/gating/admissibility decisions, the SWBD includes a non-empty, resolvable `WitnessSetSlot` (WF‑BD‑4).

**Field naming guard (implementation; informative).** When materialising SWBD as a record/card, implementations SHOULD avoid naming data fields with the `*Slot` suffix. Prefer `dependentRef`, `baseRef`, `baseRelationRef`, `scope`, `gammaTime`, `witnesses` (or Context‑local equivalents). `*Slot` remains reserved for SlotKinds/SlotSpecs (A.6.5).
#### BaseRelation contract

A `baseRelation` token is not “just a label”. For each baseRelation declared in a Context, its definition SHALL include:

* **Role polarity.** Which end is dependent and which end is base (or declare symmetry explicitly).
* **Typing expectations.** Admissible ValueKinds and `refMode` for `DependentSlot` and `BaseSlot`.
* **Token discipline (LEX).** The token SHALL satisfy E.10 token-class morphology for relations/verbs; it SHALL NOT use metaphor heads (`Anchor*`, `Ground*`, `Attach*`) as a meaning-surrogate. If a legacy synonym exists, record it as an alias but keep the contract-bearing token specific.
* **Repair path for mismatches.** If an endpoint’s self-kind does not match the expected ValueKind, the allowed repairs are declared (KindBridge, explicit narrowing, or explicit retargeting); “renaming the endpoint” is not a repair.
* **Parameter placement.** Any additional qualifiers required by the relation kind (ranges, metrics, reference planes, policies) SHALL be represented either inside `scope` (preferred) or as explicit additional slots in an extended base-declaration signature; they MUST NOT be smuggled as adjectives on the endpoints.
* **Scope class.** Whether the declaration is claim-scoped (**G**), work-scoped, or publication-scoped.
* **Time discipline.** Whether `Γ_time` is required, optional, or forbidden for this relation kind.
* **Witness discipline.** Whether witnesses are always required vs required only for decision use, and what witness classes are admissible (`U.EvidenceRole`, edition pins, calibration cert pins, proof artefacts, policy pins).
* **Admissible change classes.** Which base-change operations are permitted (below) and what continuity requirements apply.
* **Cross-context / cross-plane policy.** Whether this baseRelation family may cross Contexts/planes at all; if yes, what Bridge ids/CL thresholds must be cited and what loss notes are required (F.9 / C.3.3).

This mirrors A.6.5: a SlotKind without ValueKind/RefMode is underspecified; a baseRelation without its contract is equally underspecified.
#### Perspective/voice discipline (dependent-view vs base-view)

**Normative rule.** In Tech / normative prose, authors SHALL express a based declaration in one of the following explicit forms:

* `baseRelation(dependent, base)` (functional notation), or
* `dependent --baseRelation--> base` (arrow notation).

Authors SHALL NOT use passive/umbrella voice (“X is anchored/grounded/attached”) as a substitute for an explicit `baseRelation(dependent, base)` form, because it invites direction flips and silent re-typing.

**Base-view is allowed only if the polarity is preserved.** If authors use base-view wording (“B validates X”), they SHALL either (i) keep both endpoints visible using the same polarity-preserving token (e.g., `validatedBy(X,B)`), or (ii) use an explicit inverse token that is declared in the baseRelation contract. Authors SHALL NOT flip roles implicitly in prose.
#### Lexical discipline

**Normative lexical rule.** In Tech / normative prose and Tech register naming, authors MUST NOT use umbrella metaphors (“anchor/anchoring”, “attach/attachment”, “ground/grounding”) as substitutes for an explicit `baseRelation` token.

**Red-flag rule (`anchor*` as dependence metaphor).**
* In **Tech / normative** prose: authors MUST treat `anchor*` as **prohibited** as a meaning-surrogate for an unnamed dependence kind. Authors SHALL rewrite into explicit `baseRelation(dependent, base)` form (or move to the correct reserved primitive lane).
* In **Plain / legacy** commentary only: authors MAY quote `anchor*` as a legacy umbrella *only if* it is immediately paired with an explicit baseRelation token (e.g., “legacy ‘anchored’ ⇒ `validatedBy(...)`”) and does not introduce a new contract-bearing token.

**Carve-outs (pattern-defined primitives).** This red-flag rule does **not** ban uses where “anchoring” is already a *pattern-defined primitive* elsewhere in the spec (e.g., E.10 MG‑DA “object‑of‑talk anchoring”, or A.10 evidence “anchors”). It still acts as a review trigger: confirm you are using the reserved sense, not smuggling a basedness meaning.

**Naming guard for baseRelation tokens.** Do not mint new baseRelation tokens whose head noun is a metaphor (`Anchor*`, `Ground*`, `Attach*`). If you are tempted to do so, you either (i) have not named the relation kind yet, or (ii) are introducing a legacy alias that must map onto an existing, more specific relation family.

Instead:
1) Name the **BaseRelation token** (declared vocabulary element), and
2) Use a **relation-specific verb phrase** that corresponds to that token.

**Lane guard for meaning.** If the intent is “attach meaning to a term”, do not introduce a baseRelation named `Anchor…` or `Ground…`. Use SenseCell/ConceptSet discipline; semantic meaning assignment is not expressed by SWBD.

**Grounding disambiguation rule.** If the prose says “grounded”, it MUST be rewritten into one of:
* constructive grounding (`tv:groundedBy`, base is a trace),
* situational/empirical grounding (base is a grounding holon or experimental setup),
* meaning lane (SenseCell/ConceptSet; not SWBD).

**Bind deconfliction note.** Authors MUST NOT use the verb “bind/binding” as a synonym for declaring/refreshing/changing a base declaration. “bind/binding” is reserved for **name binding** (LEX discipline). For SWBD edits, authors SHALL use the base‑change lexicon (below) instead.
#### Base-change operation lexicon

As A.6.5 distinguishes slot operations by whether they change a stored reference, resolve a reference, or replace a value, A.6.6 distinguishes **base declaration changes** by which component changes and what semantics are affected.

Operation classes (conceptual):

These names denote **semantic change classes**. In decision/publication lanes, implementations MUST represent these changes by minting a new SWBD (new id/edition) and linking it to the prior one via explicit continuity/withdrawal (WF‑BD‑5 / CC‑BD‑10), rather than mutating the old record.

1. **declareBase** — create a new base declaration with explicit `dependent`, `base`, `baseRelation`, `scope`, and, when applicable, `Γ_time`, plus witnesses when decision-relevant.
2. **withdrawBaseDecl** — retire a declaration (or render it inapplicable by scope narrowing or time restriction, depending on baseRelation contract).
3. **rebase** — change `base` while keeping the same `dependent` and `baseRelation` (legality depends on the baseRelation contract; often requires witness refresh).
4. **repointDependent** — change `dependent` while keeping the same `base` and `baseRelation`.
5. **rescope** — change `scope` (widen/narrow/translate) under the baseRelation’s scope contract; widening often triggers witness refresh.
6. **retime** — change `Γ_time` selector/policy when time matters; not a substitute for witness-timespan/freshness predicates.
7. **refreshWitnesses** — add/refresh witnesses/pins when decision use continues across time advances, scope widening, or evidence refresh.
8. **changeBaseRelation** — not an edit-in-place. Changing `baseRelation` changes meaning; mint a new declaration and relate them via an explicit continuity relation (F.13 discipline), rather than silently rewriting the kind.

**Relation to A.6.5 slot operations (non-normative mapping).** These are *semantic change classes*; an implementation may realise them using A.6.5 slot operations on the SWBD record fields. Example: a **rebase** may be implemented as a `retarget` of `baseRef` on a *new* SWBD edition. The point of A.6.6 is that “we retargeted a ref” is not the semantic story; “we rebased the declaration” is.

**Relation to E.18 assurance ops (informative).** On `U.Transfer`, the allowed ops (`ConstrainTo/CalibrateTo/CiteEvidence/AttributeTo`) can be viewed as Context-approved specialisations of `declareBase/rescope/rebase/refreshWitnesses` for specific baseRelation families, with stricter contracts and lintability.
#### Disambiguation guide for selecting a baseRelation

When a draft uses an umbrella phrase (“anchored”, “attached”, “grounded”), replace it by selecting a baseRelation family:

| Colloquial intent | BaseRelation family (illustrative) | Dependent | Base | Typical witnesses |
| --- | --- | --- | --- | --- |
| “This ID refers to that thing” | **Identification / indexing** (`identifies`, `indexedBy`, `registeredIn`) | entity-ref / slot-content | identifier / registry entry | issuance record, registry pin |
| “Make measurements comparable” | **Calibration / datum** (`calibratedTo`, `datumOf`, `normalisedTo`) | instrument/model/output | standard / datum | calibration work + certificate pin |
| “This claim is admissible because …” | **Evidence admissibility** (`validatedBy`, `verifiedBy`) | claim | evidence carrier / proof | SCR/RSCR pins, proof artefacts |
| “This edge is grounded in construction” | **Constructive grounding** (`tv:groundedBy`) | WM edge | constructor trace (`Γ_m`) | trace pins, edition pins |
| “This description is about X under a view” | **Viewing / retargeting (specialised)** (`viewedVia`, `retargetedAlong`) | episteme/view | described entity | view operator pins, Bridge ids (if retargeting) |
| “Allowed only under policy P” | **Constraint / policy** (`constrainedBy`, `permittedUnder`) | work-step / publication item | policy/rule | policy pin, waiver/work ref |
| “Property belongs to object” | **Attribution / aboutness** (`attributedTo`, `aboutEntity`, `characterises`) | property/abstraction | object | observation/derivation witnesses |
| “Meaning of this term is …” | **Meaning lane** (SenseCell/ConceptSet) | term occurrence | SenseCell/Concept row | definition/usage witnesses |

This table is illustrative; the discipline requirement is that the chosen baseRelation be explicit, declared, and contract-bearing. The “Meaning lane” row is included only as a **do-not-model-with-SWBD** reminder.

*Note.* The `viewedVia` / `retargetedAlong` families are defined by the A.6.3/A.6.4 viewing/retargeting operators; this table only classifies them as “relative-to-base” cases.
### Archetypal Grounding

#### System archetype: calibration to a standard

**Tell.** A lab instrument channel `TC‑17` is described as “anchored to ITS‑90”. Later, the reference standard is swapped, the phrase “still anchored” is kept, and the applicability window silently expands. Downstream work disagrees and nobody can reconstruct what changed.

**Show.** Express it as a base declaration:

```
BD#Calib_TC17_v5 :=
〈 dependent    = ThermocoupleChannelRef(TC-17),
base         = StandardRef(ITS-90 / CalStd-2025-09),
baseRelation = calibratedTo,
scope        = WorkScope{rig=R3, range=[0..200]°C},
Γ_time       = interval[2025-09-01, 2026-03-01],
witnesses    = { WorkRef(CalibrationRun#8841), CertRef(CalCert@edition=5) } 〉
```

**Show.** Disambiguate edits by operation class:

* New standard ⇒ **rebase** + **refreshWitnesses**.
* Wider applicability window ⇒ **retime** and likely **refreshWitnesses**.
* Relation-kind change (“not calibration, just normalisation”) ⇒ **changeBaseRelation** is not an edit; mint a new declaration and relate via continuity.
#### Episteme archetype: claim admissibility via evidence relations

**Tell.** A report asserts: “Model M improves accuracy by 4%.” The team says the claim is “anchored in an experiment”, but dataset version, evaluation harness, and time selector are unclear, and no resolvable evidence is linked.

**Show.**

```
BD#AccGainClaim_2025Q4 :=
〈 dependent    = ClaimRef(CG:Claim#acc_gain_4pct),
base         = EvidenceCarrierRef(Work:EvalRun#2025-10-12),
baseRelation = validatedBy,
scope        = ClaimScope{dataset=BenchX@v3, metric=Top1, hardware=A100},
Γ_time       = snapshot(2025-10-12),
witnesses    = { SCRRef(EvalLog@edition=12), ComparatorSetRef@edition=7 } 〉
```

What becomes explicit is not “anchoring”, but:
* the relation kind (`validatedBy`),
* the scope slice,
* the time selector,
* the witness carriers that make the declaration admissible for decision use.
#### Structural archetype: constructive grounding of a model edge

**Tell.** A structural edge is published (“A componentOf B”) without a constructor trace. It becomes treated as “obvious”, while the construction chain is not recoverable.

**Show.**

```
BD#EdgeGrounding_ComponentOf_17 :=
〈 dependent    = WMEdgeRef(Edge:componentOf#17),
base         = TraceRef(Γ_m:ComposeCAL#c17),
baseRelation = tv:groundedBy,
scope        = PublicationScope{view=WMCardLite, system=S, line=L3},
Γ_time       = snapshot(2025-11-02),
witnesses    = { WorkRef(AssemblyRun#7712), EditionPin(Γ_m:ComposeCAL@edition=4) } 〉
```

This example shows why “grounding” must be disambiguated: here it is a declared constructive relation with an explicit base (trace), not a vague claim of “stability”.
### Bias-Annotation

| Lens | Bias introduced by this pattern |
| --- | --- |
| **Governance / assurance** | Prefers explicit witnesses and explicit time selectors for decision-relevant declarations; increases auditability but adds authoring overhead. |
| **Architecture** | Encourages reifying “relative-to” facts as first-class records rather than implicit prose. |
| **Onto-epistemic** | Treats “kind of base relation” as first-order; pushes authors to mint explicit baseRelation tokens instead of hiding semantics in adjectives. |
| **Didactic** | Introduces a new stable vocabulary (“dependent/base/baseRelation”) and requires authors to maintain it consistently across views. |
### Conformance Checklist

A carrier (pattern, spec, schema, code artefact, or publication) conforms to A.6.6 iff:

1. **CC‑BD‑1 — Base relation kind is explicit.**  
   Every base-declaration-like statement SHALL name an explicit `baseRelation` token (a declared vocabulary element). No umbrella metaphor SHALL substitute for a relation kind.

2. **CC‑BD‑2 — Dependent and base are explicit and typed.**  
   Every based declaration SHALL make both `dependent` and `base` explicit, and SHALL be SlotKind/ValueKind/RefMode disciplined per A.6.5.

3. **CC‑BD‑3 — Scope is explicit.**  
   Every based declaration SHALL include an explicit `scope` (Claim scope (**G**) / Work scope / Publication scope).

4. **CC‑BD‑4 — `Γ_time` is explicit when time matters.**  
   If any time-dependent assumption exists, the based declaration SHALL include an explicit `Γ_time`; implicit “latest/current” SHALL NOT be used as a substitute.

5. **CC‑BD‑5 — Decision use is witnessed.**  
   If a base declaration participates in assurance, gating, or admissibility decisions, it SHALL include a non-empty, resolvable `witnesses` set (pins).

6. **CC‑BD‑6 — No silent kind edits.**  
   Changing `baseRelation` SHALL be treated as a semantic change: it SHALL be represented as a new declaration plus explicit continuity, not as an edit-in-place.

7. **CC‑BD‑7 — Grounding is disambiguated.**  
   Any use of “grounding/grounded” SHALL be disambiguated to a specific declared relation kind or moved to the meaning lane (SenseCell/ConceptSet).

8. **CC‑BD‑8 — Cross-context use is explicit.**  
   If dependent and base reside in different Contexts (or scope translation is required), the declaration’s reuse SHALL cite Bridge ids plus CL policy (no silent reuse across Contexts/planes).

9. **CC‑BD‑9 — `Γ_time` is not treated as freshness.**  
   When witness freshness/decay matters, it SHALL be expressed explicitly (evidence-role timespans, qualification windows, explicit freshness predicates), not by treating `Γ_time` as a proxy.

10. **CC‑BD‑10 — Edition fence for decision/publication.**  
   If a base declaration is used for decision or cited in PublicationScope, it SHALL be immutable per edition: updates SHALL mint a new declaration and connect it via explicit continuity/withdrawal.

11. **CC‑BD‑11 — Slot suffix discipline is respected.**  
   The `*Slot` suffix SHALL be used only for SlotKinds/positions, never for endpoint values or references.

12. **CC‑BD‑12 — No “anchor” relapse.**  
   `anchor*` / `ground*` / `attach*` SHALL NOT be used as surrogates for Context/SenseCell/ConceptSet or for an unnamed dependence kind. Authors SHALL either use the reserved primitive sense (where explicitly defined elsewhere) or rewrite into explicit `baseRelation(dependent, base)` form. Metaphor-head tokens SHALL NOT be minted as new contract-bearing `baseRelation` vocabulary entries (record them only as legacy aliases that map onto a specific, non-metaphor token).

13. **CC‑BD‑13 — BaseRelation contracts are explicit.**  
    Every `baseRelation` token used in an SWBD SHALL resolve to a vocabulary entry whose contract declares (at minimum): polarity; typing expectations (ValueKind + `refMode`) for `DependentSlot`/`BaseSlot`; admissible repair paths (KindBridge / narrowing / explicit retargeting); scope class; time discipline (`Γ_time` required/optional/forbidden); witness discipline; admissible change classes; and cross-context / cross-plane policy (Bridge ids + CL threshold + loss notes where applicable).

14. **CC‑BD‑14 — Authoring voice is explicit.**  
    In Tech / normative prose, based declarations SHALL be written as `baseRelation(dependent, base)` or `dependent --baseRelation--> base`. Base-view prose SHALL be used only if polarity is preserved via explicit inverse-token use; implicit role flips SHALL NOT be used.

15. **CC‑BD‑15 — Meaning lane separation.**  
    Semantic meaning assignment SHALL be modeled via SenseCell/ConceptSet lane constructs (E.10 D.CTX), not via SWBD. SWBD SHALL be used only for non-semantic base-dependence (admissibility, calibration, attribution, policy gating, constructive grounding, viewing/retargeting specialisations).

16. **CC‑BD‑16 — Reserved “bind” discipline.**  
    `bind/binding` SHALL be reserved for **name binding** (LEX discipline) and SHALL NOT be used as a synonym for declaring/refreshing/changing a base declaration. Authors SHALL use the base‑change lexicon (`declareBase`, `rebase`, `rescope`, `retime`, `refreshWitnesses`, …) and explicit continuity/withdrawal relations instead.
### Common Anti-Patterns and How to Avoid Them

| Anti-pattern | Why it fails | Repair |
| --- | --- | --- |
| **Umbrella “anchored/attached/grounded” with no baseRelation** | Hides relation kind; cannot state invariants | Introduce a declared baseRelation token and rewrite prose to use it |
| **Perspective flip without role names** | Directionality and typing become ambiguous | Use `dependent/base` roles consistently; declare polarity in baseRelation contract |
| **Treating evidence as “the base”** | Confuses base with witnesses | Make evidence/pins witnesses unless the relation kind’s base is explicitly an evidence carrier |
| **Implicit “current/latest”** | Violates explicit time discipline | Declare `Γ_time` explicitly and use witness timespans for freshness where needed |
| **Decision gating without witnesses** | Becomes folklore; not reviewable | Add resolvable witnesses (`U.EvidenceRole`, SCR/RSCR pins, cert pins, proof artefacts) |
| **Semantic meaning expressed as a base declaration** | Confuses meaning lane with admissibility lane | Use SenseCell/ConceptSet; keep SWBD for non-semantic basedness |
| **Change baseRelation in place** | Semantic shift masquerades as update | Mint a new declaration and connect via continuity |
| **Using `*Slot` to name an endpoint/value** | Confuses SlotKind with ValueKind/RefKind; breaks substitution and tooling | Keep `*Slot` for positions; use `base`/`dependent` for values and `*Ref` for stored references |
| **Typing `baseRelation` as a `U.Surface*` carrier** | Confuses a contract-bearing relation token with a publication surface; invites “free text as relation kind” | Store `baseRelation` as a declared `NameToken` that resolves to a vocabulary entry with an explicit signature/contract |
### Consequences

**Benefits**
* Disambiguation by construction: base-dependence becomes explicit via `baseRelation`.
* Cross-domain reuse: one stable record shape works for calibration, evidence admissibility, attribution, policy gating, and constructive grounding.
* Determinism where required: explicit scope and `Γ_time` prevent silent “latest/current” assumptions.
* Reduced “grounding” confusion: multiple grounding senses become distinguishable relation kinds.

**Trade-offs / mitigations**
* More explicit metadata and vocabulary: mitigated by defining baseRelation families once per Context and reusing them.
* Authoring overhead for witnesses in decision contexts: mitigated by pointing to already-existing artefacts (Work refs, pins) instead of creating new documents.

**Adoption test (informative).**
A team has adopted A.6.6 if, for any decision-relevant “relative-to” statement, it can produce a resolvable tuple
`〈dependent, base, baseRelation, scope, Γ_time?, witnesses?〉`
and can classify any update as one of:
`declareBase / withdrawBaseDecl / rebase / repointDependent / rescope / retime / refreshWitnesses / changeBaseRelation`.
### Rationale

**Why focus on base declaration rather than a metaphor.**  
The recurring ambiguity is not “how to attach”, but “what is the declared base, and what kind of dependence is being asserted”. Naming the baseRelation token makes the dependence explicit and reviewable.

**Why separate base from witnesses.**  
Bases are semantic reference frames; witnesses are justifiers/enforcers for decision use. Conflating them makes both reasoning and audit impossible.

**Why include scope and `Γ_time`.**  
A declaration is never “everywhere forever” by default in FPF. Scope makes applicability explicit; `Γ_time` prevents hidden time dependence (“recent”, “current”, “latest”).

**Why prohibit kind edits.**  
Changing the relation kind changes meaning; treating it as an update erases history and breaks continuity discipline.

**Why the base-change lexicon.**  
Without explicit change classes, prose collapses distinct edits (rebase vs retime vs rescope vs witness refresh) and recreates the same ambiguity A.6.5 removed at the slot layer.
### SoTA-Echoing

1. **RDF-star and statement qualification.**  
   **Adopt/Adapt.** RDF-star/SPARQL-star continues the semantic-web tradition of attaching qualifiers/provenance to statements and edges. We adopt the “qualified statement” intuition, but adapt it by requiring an explicit relation kind token and by tying time and scope discipline to FPF’s explicit `Γ_time` and USM scopes rather than leaving them implicit or purely notational.  
   *Primary source:* Hartig et al., “Foundations of RDF* and SPARQL*” (2017+).

2. **Wikidata-style statements with qualifiers and references.**  
   **Adopt/Adapt.** The Wikidata model popularised practical “statement + qualifiers + references” structures at scale. We adopt the separation of the core statement from its qualifiers/references, and adapt it by making decision-relevant witness requirements explicit via `U.EvidenceRole` and by requiring explicit scope/time where time-dependent assumptions exist.  
   *Primary sources:* Wikidata statement model documentation and design lineage (post‑2015 practice).

3. **Metrology traceability and calibration competence.**  
   **Adopt/Adapt.** Laboratory competence standards treat calibration as traceability to standards with documented evidence and bounded validity. We adopt the expectation that calibration-to-standard is not timeless, and adapt it by representing the validity window via explicit `Γ_time` plus witnesses as pinned calibration artefacts.  
   *Primary source:* ISO/IEC 17025:2017.

4. **Assurance case metamodels for claim–evidence structure.**  
   **Adopt/Adapt.** SACM formalises claim/evidence structures and emphasises structured support relations. We adopt the idea that decision-relevant admissibility links should be explicit, and adapt it by using FPF’s scope/time discipline and by treating relation-kind elision as a first-order defect.  
   *Primary sources:* OMG Structured Assurance Case Metamodel (SACM), 2018+.

5. **Objects over a base as a stable mathematical lens.**  
   **Adopt/Adapt.** Modern category-theory texts make “objects over a base” (slice categories) a reusable pattern for “X relative to B”. We adopt that lens as the stable abstraction behind base declarations, and adapt it with explicit scope/time and witness semantics needed for engineering governance.  
   *Primary source:* Riehl, *Category Theory in Context* (2016).

**SoTA binding note (informative).** This pattern’s “qualified statement + explicit relation kind + references” move aligns with RDF*/Wikidata practice (items 1–2); the explicit time-window + witness semantics in decision use align with metrology traceability and assurance-case structures (items 3–4); the “object over a base” lens is the abstraction used to keep the pattern stable across domains (item 5).
### Relations

**Specialises A.6.P `U.RelationalPrecisionRestorationSuite`.**
A.6.6 is the RPR specialisation for “basedness / relative‑to” claims: it makes the relation kind explicit via `baseRelation`, qualifies it with scope/`Γ_time`/witnesses, and standardises evolution via a base‑change lexicon plus lexical red‑flags (`anchor*`).


**Builds on A.6.5 `U.RelationSlotDiscipline`.**  
SWBD introduces a structured record with slots; those slots must be SlotKind/ValueKind/RefKind disciplined, and its change classes must not be confused with slot-edit operations (A.6.5) or name-binding terminology (E.10 / L‑BIND).

**Constrains A.10 evidence admissibility links.**  
`verifiedBy` and `validatedBy` are treated as baseRelation tokens; their scope/time and witnesses become explicit when used for decisions.

**Aligns with A.2.4 `U.EvidenceRole`.**  
Decision-relevant witness sets should be representable as EvidenceRoles with explicit timespans and provenance discipline, not as ad‑hoc prose references.

**Aligns with A.14 constructive grounding (`tv:groundedBy`).**  
Constructive grounding is one specific baseRelation family: dependent is a model edge, base is a constructor trace; witnesses pin the trace and work artefacts.

**Coordinates with C.2.1 grounding holons.**  
Situational/empirical grounding via `GroundingHolonSlot` is treated as a distinct baseRelation family; it must not be collapsed with `tv:groundedBy` or with semantic meaning assignment.

**Coordinates with A.6.3–A.6.4 viewing/retargeting.**  
Viewing and retargeting are specialised “relative-to-base” moves (preserve describedEntity vs change it along a declared bridge). They should reuse SWBD vocabulary where an explicit base declaration is required (scope/time/witness), without collapsing into generic “anchoring” prose.

**Coordinates with A.2.6 and `Γ_time`.**  
Base declarations inherit the rule that time-dependent assumptions require explicit `Γ_time`; “current/latest” is not admissible.

**Feeds E.10 / F.18 lexical governance.**  
Umbrella metaphors are disallowed as substitutes for baseRelation tokens; prose must name explicit relation kinds and keep the meaning lane separate (SenseCell/ConceptSet).
### A.6.6:End
## MechSuiteDescription — Description of a set of distinct mechanisms

> **Type:** Architectural pattern.
> **Status:** Stable.
> **Normativity:** Normative [A] (Core).

**One-line summary.** A `MechSuiteDescription` is a Kernel **Description** token that names a **set of distinct** `U.Mechanism.Intension` (different mechanisms, not realizations of one mechanism) and declares **suite-level obligations**, **required contract pins**, and **allowed usage protocols**, without conflating this with `MechFamilyDescription` or with publication `Pack`s.

**Plain-name.** mechanism suite description; mechanism suite passport.
**Placement.** Part A → cluster A.IV (A.6), immediately after A.6.5.

**Builds on.** E.8 (pattern template discipline), A.6.1 (`U.Mechanism.Intension` canonical form), A.6.5 (slot/ref discipline), E.10 (lexical + ontological rules; strict distinction; minimal specificity; kind suffixes), E.19 (conformance checks), E.18 (TGA / P2W graph discipline; crossing visibility), A.21 (OperationalGate(profile) and gate-level decisions).

**Used by.** Any framework area that needs a stable “universal kernel” shared across multiple mechanisms (notably the universalization of Part G patterns, including but not limited to G.5), and any “mechanism stack” whose correctness is defined by **shared legality + transport + audit obligations** rather than by a single shared `BaseType`.

**Mint vs reuse.**

* **Mints:** `MechSuiteDescription` (KernelToken, Description) and the record names used by its canonical form: `MechSuiteId`, `SuiteObligation`, `SuiteObligations`, `SuiteContractPins`, `SuiteProtocol`, `ProtocolStep`, `SuiteAuditObligations`.
* **Reuses (by reference):** `U.Mechanism.Intension` (members), `MechFamilyDescription` / `MechInstanceDescription` (optional citations), existing pinned references such as `CN‑Spec` / `CG‑Spec` (as pins), and E.TGA/P2W notions (as obligations/pins), without introducing new `U.*` kernel types.

**LEX.TokenClass.**
* `LEX.TokenClass(MechSuiteDescription) = KernelToken.`
* `LEX.TokenClass(MechSuiteId) = KernelToken.`
* `LEX.TokenClass(SuiteObligations) = KernelToken.`
* `LEX.TokenClass(SuiteContractPins) = KernelToken.`
* `LEX.TokenClass(SuiteProtocol) = KernelToken.`
* `LEX.TokenClass(SuiteAuditObligations) = KernelToken.`

**I/D/S.** Description (D); Tech name ends with `…Description`.
Lexical note: do **not** prefix this token with `U.` — `U.*` is reserved for Kernel **types**, while `MechSuiteDescription` is a Kernel **descriptor** (Description token).

### Problem frame

In FPF, a **mechanism** is a node-level intensional object (`U.Mechanism.Intension`) with explicit SlotSpecs inside operator signatures, and a declared LawSet/guards/transport/audit (A.6.1, A.6.5). Many architectures, however, require **a stable bundle of multiple different mechanisms** that are intended to be used together under shared legality and crossing discipline (e.g., a characterization chain, a legality-gated selection pipeline, or a universal Part‑G kernel that multiple G.* patterns must reuse).

FPF already has `MechFamilyDescription`, but its meaning is: **many realizations of one and the same `U.Mechanism.Intension`**. That construct cannot correctly represent a bundle of different mechanisms (different intensions), and trying to overload it creates a level error.

Additionally, FPF reserves “Pack” for publication/shipping bundling (e.g., G.10); using “Pack” to mean “container of mechanisms” creates ontological collisions and downstream confusion.
### Problem

We need a Kernel-level descriptor that can:

1. represent a **set of distinct mechanisms** (distinct `U.Mechanism.Intension`),
2. declare **shared obligations** that must hold across the set (e.g., crossing visibility, legality citation discipline, guard decision format, penalty routing),
3. provide **shared contract pins** (e.g., “this suite is contract-bound by CN‑Spec + CG‑Spec”), without duplicating those contract contents,
4. constrain **allowed protocols** of use (allowed pipelines / permitted ordering), without turning the suite into a mechanism, and
5. preserve strict distinction among:

   * a suite of mechanisms (`MechSuiteDescription`),
   * a family of realizations of one mechanism (`MechFamilyDescription`),
   * a publication bundle (`Pack`, e.g., G.10).
### Forces

1. **Strict distinction (level hygiene).**
   *“many mechanisms”* must not be encoded as *“many realizations of one mechanism”*.
   Violating this blurs specialization laws, SlotKind invariance expectations, and audit/crossing responsibilities.

2. **Minimal specificity + kind suffix discipline (E.10).**
   The token name should encode only what is essential: it is a description, it is about mechanisms, it is a suite.
   It must not capture a particular domain (e.g., CHR) in the Kernel name.

3. **Contract-surface centrality (CN‑Spec / CG‑Spec).**
   Suites must cite contract surfaces as pins, not duplicate their internals, otherwise multiple competing “centers of legality” arise.

4. **Transport and crossing visibility discipline.**
   Cross-context and cross-plane steps must be visible and bridge-only; penalties must route to `R/R_eff` only; suites must not embed CL/Φ/Ψ/Φ_plane tables. Visibility is mediated via E.TGA / P2W (crossing bundles + UTS/Path pins), not by “implicit semantics”.

5. **Guard vs gate separation.**
   Mechanisms can output tri-state guard outcomes and explanations; **gate decisions** (including `block`) and `DecisionLog` remain gate-level (`OperationalGate(profile)`). A suite must not collapse these layers.

6. **FPF is conceptual.**
   The suite is a conceptual descriptor: no implementation fields, no “lint rules”, no machine governance. The suite expresses obligations as conceptual constraints and required pins/anchors.
### Solution

Introduce a new Kernel description token:

#### A.6.7:4.1 MechSuiteDescription (data model)

`MechSuiteDescription` declares:

1. **Suite identifier:** a stable identifier for downstream citation.
2. **Membership:** a finite set of distinct mechanism intensions.
3. **Suite obligations:** shared invariants that every member (and any permitted composition of members) must respect.
4. **Suite contract pins:** required citations/pins to contract surfaces and other “anchor” references.
5. **Suite protocols:** allowed pipelines of use (permitted ordering and optional steps), expressed at the descriptive level.
6. **Suite audit obligations:** required audit/pin visibility for downstream uses (UTS/Path pins, crossing pins, guard pins), expressed as required anchors (not run-time values).
7. **Notes:** didactic boundaries and anti-pattern warnings.

A minimal canonical form:

```
MechSuiteId := Identifier  // PascalCase; stable citation handle. Versioning MAY be carried externally.

SuiteObligation := one of {
   * bridge_only_crossings,
   * two_bridge_rule_for_described_entity_change,
   * transport_declarative_only,
   * penalties_route_to_r_eff_only,
   * guard_decision_tristate(pass|degrade|abstain),
   * unknown_never_coerces_to_pass,
   * gate_decision_separation,
   * guard_lexeme_reservations,
   * cg_spec_cite_required_for_numeric_ops,
   * no_silent_scalarisation_of_partial_orders,
   * no_silent_totalisation,
   * no_thresholds_in_suite_core,
   * crossing_visibility_required,
   * planned_slot_filling_in_work_planning_only,
   * finalize_launch_values_in_work_enactment_only,
   * implementation_export_discipline_when_cited
  +}

SuiteObligations := { SuiteObligation[*] } // clause set; duplicates-free.

MechSuiteDescription := ⟨
  mech_suite_id: MechSuiteId ,
  mechanisms: U.Mechanism.IntensionRef[+] ,     // distinct members; references preferred
  suite_obligations: SuiteObligations ,
  suite_contract_pins: SuiteContractPins ,
  suite_protocols?: SuiteProtocol[*] ,
  suite_audit_obligations?: SuiteAuditObligations ,
  suite_notes?: DidacticNotes
⟩
```

**Norms.**

* **Suite identifier.**
  `mech_suite_id` MUST be present and stable: it is the citation handle for downstream planning and `U.Work.Audit`.

**Well-formedness constraints (admissibility; non-deontic).**

* **WF‑MS‑1 (Membership set semantics).** `mechanisms` denotes a duplicates‑free set; order carries no semantics.
* **WF‑MS‑2 (Protocol closure).** If `suite_protocols` is present, then for every `ProtocolStep` in every `SuiteProtocol`, `step.mechanism ∈ mechanisms`.
* **WF‑MS‑3 (Suite ≠ Pack).** `MechSuiteDescription` does not carry shipping/publication payloads; publication remains the role of `Pack` patterns.
* **WF‑MS‑4 (Suite ≠ Mechanism).** `MechSuiteDescription` contains no `OperationAlgebra`/`LawSet`/execution semantics and is not admissible where a `U.Mechanism.*` node is required.

* **Membership is by mechanism intension (order-free).**
  `mechanisms` MUST denote a duplicates-free set of distinct `U.Mechanism.Intension` members. Membership order has no semantics; any intended ordering is expressed only in `suite_protocols`. A suite is **not** defined by a shared `BaseType`.

* **No substitution by `MechFamilyDescription`.**
  A suite MUST NOT be encoded as a `MechFamilyDescription`.
  If desired, a suite MAY additionally **cite** `MechFamilyDescription` / `MechInstanceDescription` for particular members (e.g., “preferred realization for this context”), but such citations do not redefine membership.

* **No “Pack” meaning.**
  A suite MUST NOT be named or treated as a publication pack. `Pack` remains reserved for publication/shipping bundling (e.g., G.10).

* **No mechanism semantics in the suite.**
  A suite is a **Description**, not a mechanism: it does not define `OperationAlgebra`, it does not execute, and it does not absorb gate logic.
#### A.6.7:4.2 SuiteObligations (canonical obligation vocabulary)

`MechSuiteDescription` MAY declare any obligations, but the following obligation vocabulary is **canonical** and is intended to be reused across the universalization of Part G and legality-gated characterization stacks.

`SuiteObligations` SHOULD be written as an explicit clause set, e.g.:

```
SuiteObligations := {
  bridge_only_crossings,
  two_bridge_rule_for_described_entity_change,
  transport_declarative_only,
  penalties_route_to_r_eff_only,
  guard_decision_tristate(pass|degrade|abstain),
  unknown_never_coerces_to_pass,
  gate_decision_separation,
  guard_lexeme_reservations,
  cg_spec_cite_required_for_numeric_ops,
  no_silent_scalarisation_of_partial_orders,
  no_silent_totalisation,
  no_thresholds_in_suite_core,
  crossing_visibility_required,
  planned_slot_filling_in_work_planning_only,
  finalize_launch_values_in_work_enactment_only,
  implementation_export_discipline_when_cited
}
```

**Obligation meanings (normative).**

1. **`bridge_only_crossings`.**
   Well-formedness constraint: cross-context / cross-plane reuse performed by any member mechanism is represented via that member’s published `Transport` as Bridge-only (no implicit crossings). A suite does not create transport exceptions.

1.1. **`two_bridge_rule_for_described_entity_change`.**

 * If a suite member’s lawful use requires changing the described entity (kind/identity change, `CL^k`), the crossing MUST be explicit and MUST satisfy the two-bridge rule: plane/context transfer and kind transfer are distinct, both are Bridge-mediated, and both remain penalty-routed to `R/R_eff` only.
 
1.2. **`transport_declarative_only`.**
 * Well-formedness constraint: suite obligations do not add transfer edges or embed CL/Φ/Ψ/Φ_plane tables. Any transport-related obligation is expressed only as referenced pins/anchors whose realization is mediated by E.TGA / gate surfaces.
 
2. **`penalties_route_to_r_eff_only`.**
   Well-formedness constraint: CL/Φ/Ψ/Φ_plane penalties associated with crossing discipline route to `R/R_eff` only; suites do not define transport penalties that alter `F/G`.

3. **`guard_decision_tristate(pass|degrade|abstain)` and `unknown_never_coerces_to_pass`.**
   Well-formedness constraint: admissibility/eligibility outcomes use a tri-state guard result `GuardDecision := {pass|degrade|abstain}`. Unknown/insufficient evidence is not coerced to `pass`; it resolves to `{degrade|abstain}` under declared failure behavior (e.g., probe-only as a SoS‑LOG branch id, not as a new decision value).

4. **`gate_decision_separation`.**
   Well-formedness constraint: suites do not define or use `GateDecision` values (including `block`) as part of mechanism/suite semantics. Gate-level outcomes and `DecisionLog` remain on `OperationalGate(profile)`.

5. **`guard_lexeme_reservations`.**
   Well-formedness constraint: `USM.CompareGuard` and `USM.LaunchGuard` denote gate-owned guard events/pins; member mechanisms and suite protocols use `…Admissibility` / `…Eligibility` for guard predicates, not the reserved gate lexemes.

6. **`cg_spec_cite_required_for_numeric_ops`.**
   Well-formedness constraint: any member operation that performs numeric comparison/aggregation/legality-sensitive scoring cites the applicable `CG‑Spec` (and relevant subrefs) as contract pins, rather than embedding equivalent “local legality” content.

7. **`no_silent_scalarisation_of_partial_orders` and `no_silent_totalisation`.**
   Well-formedness constraint: if a member mechanism induces a partial order, it preserves set-/relation-valued semantics; it does not silently reduce to a scalar/total order. Any totalization is explicit and policy-bound.

8. **`no_thresholds_in_suite_core`.**
   Well-formedness constraint: suite core does not publish acceptance thresholds (“passing scores” / hidden cutoffs). Thresholds belong to acceptance clauses / task signatures / gate profiles.

9. **`crossing_visibility_required`.**
   Well-formedness constraint: any GateCrossing relevant to suite use publishes a `CrossingBundle` (E.18) and can be cited as an audit anchor.
   GateCrossing includes (at minimum) cross-context, cross-plane, and cross-kind/described-entity changes, entry into `U.WorkEnactment` (LaunchGate), and any `edition_key` change of pinned `editions{…}` vectors.
   Suites may require `CrossingBundleRef` / UTS / Path pins and policy-id pins as anchors, and MUST NOT embed CL/Φ/Ψ/Φ_plane tables.

10. **`planned_slot_filling_in_work_planning_only`.**
   Well-formedness constraint: any planned slot filling used as a baseline for suite use is authored in `WorkPlanning` as a planned baseline (no run-time slot instances; no launch values).

11. **`finalize_launch_values_in_work_enactment_only`.**
   Well-formedness constraint: `FinalizeLaunchValues` (and any witness of actual launch values) occurs only in `U.WorkEnactment`; neither the suite nor any planned-baseline artifact is a place for launch values.
#### A.6.7:4.3 SuiteContractPins

A `MechSuiteDescription` MUST be able to declare required contract pins as references, not as duplicated content. Canonically:

```
SuiteContractPins := ⟨
  required_spec_refs?: {CNSpecRef?, CGSpecRef?, ...},
  required_edition_pins?: EditionPin[*],
  required_policy_id_pins?: PolicyIdPin[*],
  required_planned_baseline_ref?: PlannedBaselineRef?
⟩
```

**Norms.**

* If the suite is legality-gated for characterization, `CNSpecRef` and `CGSpecRef` MUST be required (as references/pins).
* Contract pins are citations and anchors. They do not replace the underlying `…Spec` objects.
* A suite MAY require the presence of a planned-baseline artifact in P2W (e.g., a WorkPlanning plan item such as `…SlotFillingsPlanItem` that pins chosen refs/editions), but MUST treat it as a **reference/pin requirement**, not as a place to store launch values or gate decisions.
  When required, the planned-baseline artifact is authored in `WorkPlanning` and is citeable by downstream `U.Work.Audit`; any `FinalizeLaunchValues` witness remains `U.WorkEnactment`-only.
* A suite MAY serve as `TargetSlotOwnerRef` for a planned-baseline plan item (planned slot filling owner role), but this does not make the suite a mechanism and does not create run-time slot instances.
#### A.6.7:4.4 SuiteProtocols

A suite MAY describe allowed protocols (pipelines) as descriptive constraints on how suite members are intended to be composed. A protocol description:

* MUST name the member mechanisms it uses (explicitly; no “implicit use”),
* MAY mark steps as optional,
* MUST NOT introduce hidden crossings or hidden legality steps,
* MUST treat “publish/telemetry” as an external protocol step that is realized through existing publication surfaces (e.g., Part G shipping), rather than as a hidden tail inside a mechanism.

A canonical shape for protocols:

```
SuiteProtocol := ⟨
  steps: [ ProtocolStep₁, …, ProtocolStepₙ ],
  invariants?: ProtocolInvariant[*],
  notes?: DidacticNotes
⟩

ProtocolStep := ⟨
  mechanism: U.Mechanism.IntensionRef,
  operation: OperationName,
  optionality: {required|optional},
  requires_pins?: PinRef[*]
⟩
```
#### A.6.7:4.5 SuiteAuditObligations

A suite MAY require that downstream use provide certain audit anchors. These are **requirements**, not run-time values. A suite audit obligation MAY include:

* required `UTS` + `Path` pins,
* required crossing-surface visibility pins for any crossing relevant to suite use,
* required presence of `USM.CompareGuard` and/or `USM.LaunchGuard` **pins** (not gate checks),
* required declaration of guard ownership (e.g., a `GuardOwnerGateSlot` anchor),
* required expression of guard violations as `GuardFail` events aggregated by the guard-owning gate (per `GuardOwnerGateSlot`), not as extra mechanism/suite states,
* required policy-id pins for any degrade/sandbox/probe-only branches (SoS‑LOG branch id anchors).
* required parity/selection-grade pins when applicable (e.g., when suite use claims parity-grade comparison/selection surfaces downstream).

**Norm.** A suite must never publish a `DecisionLog` or `GateDecision`. If the suite requires guard pins, it requires their **presence** as anchors so that the gate-level owner can aggregate `GuardFail`s and decide `degrade|block` per gate profile.
#### A.6.7:4.6 Examples (tell–show–show discipline)

**Example 1 (conformant).** A characterization legality suite:

```
CHRMechanismSuiteDescription : MechSuiteDescription :=
  mech_suite_id = CHRMechanismSuiteId
  mechanisms = { UNM, UINDM, USCM, ULSAM, CPM, SelectorMechanism }
  suite_obligations includes:
    bridge_only_crossings,
    penalties_route_to_r_eff_only,
    guard_decision_tristate(pass|degrade|abstain),
    gate_decision_separation,
    cg_spec_cite_required_for_numeric_ops,
    no_silent_scalarisation_of_partial_orders,
    crossing_visibility_required,
    planned_slot_filling_in_work_planning_only,
    finalize_launch_values_in_work_enactment_only
  suite_contract_pins requires: {CNSpecRef, CGSpecRef}
  suite_protocols includes:
    normalize → indicatorize → score → (fold_Γ?) → compare → select → publish/telemetry
```

This description is not a `MechFamilyDescription` (because it contains multiple distinct mechanisms), and it is not a `Pack` (because it does not ship artifacts; it only declares membership and shared obligations/pins/protocols).

**Example 2 (non-conformant).** Misusing a family as a suite:

```
CHRMechanismFamily : MechFamilyDescription := { UNM, UINDM, USCM, ... }
```

This is a level error: `MechFamilyDescription` is reserved for realizations of a single mechanism intension.

**Example 3 (non-conformant).** Turning a suite into a hidden gate:

* The suite declares `GateDecision` values or embeds a `DecisionLog`.
* The suite defines acceptance thresholds (“pass score ≥ 0.7”) as part of suite obligations.
* The suite embeds Φ/CL tables or invents ad-hoc “transfer edges”.

All violate the separation between mechanism/suite descriptions and gate-level operational control.
### Archetypal Grounding

A suite is an archetypal “passport” or “capability bundle descriptor”:

* It answers **what mechanisms exist in the bundle** and **what shared invariants** make their composition lawful.
* It provides **shared contract anchors** (pins) that downstream planning and work must cite.
* It remains descriptive: it does not execute, it does not contain run-time outputs, and it does not replace the E.TGA subgraph that actually connects nodes by `Uses` and manages crossings.
### Bias-Annotation

Common biases this pattern guards against:

* **Overloading “family”.** Treating “many different mechanisms” as “many realizations of one mechanism” destroys level hygiene and encourages semantic drift across members.
* **Publication conflation.** Using “pack” semantics to smuggle publication/shipping obligations into the meaning of a mechanism bundle.
* **Gate conflation.** Treating suite-level obligations as gate decisions (“block”) instead of keeping `block` at the gate layer.
* **Convenience totalization.** Collapsing partial orders into scalars “for ease of selection”, which undermines set-return semantics and legality gating.
### Conformance Checklist

A `MechSuiteDescription` is conformant iff all applicable items hold:

**CC‑A.6.7‑1 (Correct level).** The suite’s `mechanisms` enumerate **distinct** `U.Mechanism.Intension` members. The suite is not encoded as `MechFamilyDescription`.

**CC‑A.6.7‑2 (Description token, not `U.*`).** The suite token is a Description token and MUST NOT be introduced under `U.*`. Its name ends with `…Description`.

**CC‑A.6.7‑3 (No execution semantics).** The suite MUST NOT define mechanism blocks (`OperationAlgebra`, `LawSet`, etc.) and MUST NOT be used as a mechanism node.

**CC‑A.6.7‑4 (No gate decisions).** The suite MUST NOT define `GateDecision`, MUST NOT publish `DecisionLog`, and MUST preserve gate/mechanism separation.

**CC‑A.6.7‑5 (Contract pins, not duplication).** If the suite is legality-gated for numeric comparison/aggregation/scoring, it MUST require `CG‑Spec` citation pins (and SHOULD require `CN‑Spec` pins where applicable). It MUST NOT duplicate contract content as “local CG‑Spec”.

**CC‑A.6.7‑5a (CN+CG pins for legality-gated characterization).** If the suite is legality-gated for characterization, it MUST require both `CNSpecRef` and `CGSpecRef` as pins (references), consistent with A.6.7:4.3.

**CC‑A.6.7‑6 (Transport discipline preserved).** The suite MUST NOT introduce transport exceptions. Any crossing obligations must remain Bridge-only and must route penalties to `R/R_eff` only.

**CC‑A.6.7‑7 (Tri-state guard discipline when used).** If the suite declares admissibility/eligibility semantics, it MUST use `GuardDecision := {pass|degrade|abstain}` and MUST NOT coerce unknown to pass.

**CC‑A.6.7‑8 (No thresholds in core).** The suite MUST NOT publish acceptance thresholds or “passing scores”. Thresholds must remain in acceptance clauses / task signatures / gate profiles.

**CC‑A.6.7‑9 (Crossing visibility anchors).** If suite use depends on crossings (context/plane/kind, entry into `U.WorkEnactment` (LaunchGate), or edition-key changes), the suite MUST require crossing visibility anchors (BridgeId/channel, ReferencePlane, CL mode, policy-id pins, UTS/Path pins) as audit obligations, without embedding the tables.

**CC‑A.6.7‑10 (Suite id present).** The suite MUST declare `mech_suite_id: MechSuiteId` so that downstream planning/audit can cite it stably.

**CC‑A.6.7‑11 (Two-bridge discipline preserved).** If suite obligations claim cross-kind/described-entity validity, they MUST require explicit `CL^k` handling (two-bridge rule) and MUST NOT allow implicit described-entity changes.

**CC‑A.6.7‑12 (Implementation export hygiene when cited).** If the suite cites realizations/implementations, the citations MUST preserve export/import discipline (LOG/CHR: no Γ export; CAL: exactly one Γ; imports acyclic).

**CC‑A.6.7‑13 (No Pack conflation).** The suite MUST NOT be introduced, named, or used as a publication/shipping `Pack`.

**CC‑A.6.7‑14 (Protocol closure & explicitness).** If `suite_protocols` is present, every `ProtocolStep.mechanism` MUST be a member of `mechanisms` (WF‑MS‑2) and the protocol MUST NOT rely on implicit mechanism steps or implicit crossings.

**CC‑A.6.7‑15 (P2W split preserved when applicable).** If the suite requires a planned-baseline pin (e.g., a planned slot-fillings artifact), that baseline MUST be a `WorkPlanning` artifact and MUST NOT contain launch values or `FinalizeLaunchValues` witnesses; such witnesses remain `U.WorkEnactment`-only.
### Common Anti-Patterns and How to Avoid Them

1. **Anti-pattern: “Family-as-suite”.**
   Using `MechFamilyDescription` to list multiple distinct mechanisms.
   **Fix:** use `MechSuiteDescription` for “many mechanisms”, and keep `MechFamilyDescription` for “many realizations of one mechanism”.

2. **Anti-pattern: “Pack-as-suite”.**
   Naming/using the suite as a `Pack`.
   **Fix:** reserve `Pack` for publication/shipping bundling; use `Suite` for mechanism bundles.

3. **Anti-pattern: “Suite contains legality tables”.**
   Duplicating CG‑Spec or embedding CL/Φ/Ψ tables in suite obligations.
   **Fix:** publish pins and references only; keep legality content in `…Spec` and policy registries; keep crossing realization in E.TGA/gate surfaces.

4. **Anti-pattern: “Suite is a hidden gate”.**
   Introducing thresholds, `block`, or `DecisionLog` in the suite.
   **Fix:** suite declares guard formats and required pins; the gate owns decisions.

5. **Anti-pattern: “Implicit calls”.**
   A protocol implies “normalize happens somewhere” without explicit member and pin visibility.
   **Fix:** protocols enumerate steps and required pins; E.TGA `Uses` edges remain explicit.
### Consequences

**Benefits.**

* Eliminates level confusion between “family of realizations” vs “bundle of mechanisms”.
* Provides a Kernel home for universal obligations reused across multiple patterns (notably Part G universalization).
* Makes legality/transport/audit obligations shared and explicit, reducing semantic drift across member mechanisms.

**Costs.**

* Introduces an additional descriptive artifact that must be maintained as suites evolve.
* Requires discipline: suites must remain descriptive and must not become “meta-mechanisms” or “hidden gates”.
### Rationale

Characterization and legality-gated selection pipelines are not unified by a single shared `BaseType`; they are unified by:

* shared contract surfaces (e.g., CN‑Spec / CG‑Spec),
* shared transport and crossing discipline (Bridge-only; penalties to `R_eff`),
* shared guard semantics (tri-state, no coercion),
* and explicit protocol constraints (allowed pipelines).

Encoding this unity as “one mechanism” or “one family” forces false commonality and invites hidden semantics. A dedicated **suite descriptor** preserves modularity and keeps the level separation clean.
### SoTA-Echoing

This pattern echoes post‑2015 best practice in modular reasoning systems: separation of **contract surfaces** from **operators**, explicit composition protocols, and strong boundaries between **decision procedures** and **gating/acceptance control**.

In modern multi-step evaluation pipelines (e.g., calibrated scoring, uncertainty-aware comparison, portfolio/pareto selection, and quality-diversity archives), correctness typically relies more on explicit contracts and lawful composition than on a single monolithic “universal metric”. `MechSuiteDescription` provides the Kernel representation that allows such pipelines to be described with stable obligations while keeping domain methods and FPF patterns generators outside the universal core.
### Relations

* **Relates to A.6.1:** suite members are `U.Mechanism.Intension`; the suite does not replace the mechanism definition.
* **Relates to A.6.5:** suites must not weaken slot/ref discipline; any suite protocol assumes member mechanisms follow A.6.5 invariants (SlotKind stability, correct refMode, no semantic meaning in SlotIndex).
* **Relates to E.18 / P2W:** suite protocols describe intended composition; actual composition and crossings are expressed in E.TGA subgraphs and P2W flow.
* **Relates to E.19:** suite-level conformance is a conceptual review checklist; suites require pins/anchors rather than procedural validation.
* **Relates to G.10:** suites are not packs; publication/shipping is handled via G.10 and MVPK faces.
### A.6.7:End
## Service Polysemy Unpacking (RPR‑SERV)

**Plain-name.** Service situation unpacking.
**One-liner:** “service” ⇒ clause | promised work‑kind | provider principal/system | access point | access spec | commitment | promise act | delivery method/work

> **Type:** Architectural (A) — A.6.P specialisation (RPR)
> **Status:** Stable
> **Normativity:** Normative
> **Placement:** Part A → A.6 (Precision restoration / stack discipline)
> **Builds on:** A.6.P (RPR recipe), A.6.5 (slot discipline), A.6.B (routing), A.2.3 (`U.PromiseContent`), A.2.8 (`U.Commitment`), A.2.9 (`U.SpeechAct`), A.15 (`U.Work`), E.10 (LEX, incl. L‑SERV, LEX‑BUNDLE & PTG stances), F.17 (UTS — Unified Term Sheet), F.18 (Name Cards / NQD‑front; promise ≠ utterance ≠ commitment).
> **Coordinates with:** A.6.C (contract bundle unpacking), A.7 (Object≠Description≠Carrier), G.* evidence discipline (EvidenceGraph / SCR), Context/Bridge policy for cross‑Context reuse, F.8 (Mint/Reuse), E.15 (LEX‑AUTH when refactoring existing prose at scale).
> **Delta-Class:** Δ‑3 (new normative pattern; corpus‑wide lexical refactor expected when adopted in Core)
> **Impact radius:** Any normative prose that uses the “service” cluster (`service`, `service provider`, `server`); LEX rules (L‑SERV / LEX‑BUNDLE); UTS blocks (F.17); contract/boundary patterns that already talk about services (esp. A.6.C); any automated repair/lint pipeline used for bulk refactors (E.15 / LEX‑AUTH).
 **Mint vs reuse:** Mints the `serviceSituation(…)` QRR lens id and the facet headphrase set defined in §4.3. Reuses `U.PromiseContent`, `U.Commitment`, `U.SpeechAct`, `U.System`, `U.Work`, `U.MethodDescription`, and the A.6.P/QRR recipe.
 **DRR pointer:** **REQUIRED before Core admission.** `DRR‑SERV‑POLYSEMY‑<id>` (TBD in draft; must cite the PQG run + refactor/harness plan).

**Intent.** Prevent category errors and metonymic drift caused by the borderline word “service” by forcing every normative mention to name the **facet** (promise content vs promised work‑kind/effect vs accountable principal vs realization system vs access object vs interface vs binding vs act vs run‑time work/evidence) and by providing a stable “service situation” lens that keeps those facets related without collapsing them.

**Non‑goal (modularity guard).** This pattern does **not** redefine the semantics or field structure of the promise‑content object (the **promise content**). That kernel meaning is defined in **A.2.3 (`U.PromiseContent`)**. A.6.8 is a precision‑restoration + lexicon discipline that (i) forces facet‑typed head phrases and (ii) provides an optional QRR lens to bind already‑defined kinds without collapsing them. Contract‑talk unpacking is handled by **A.6.C**, which invokes this pattern when contract language contains the service cluster.

### Problem frame

In real engineering language, *service* can denote (and routinely collapses) multiple **facets** that admit different predicates and different governance rules:

* a **promise content** (`U.PromiseContent`),
* a **promised work‑kind / effect‑kind** (“what is to be delivered”, as a kind/template),
* a **service provider role** (role kind in the clause),
* a **service provider principal** (role‑enactor accountable for delivery and capable of holding commitments),
* a **service access point** (an addressable system/facility/desk/endpoint host),
* a **service access spec** (API surface / endpoint set / SOP visible to consumers),
* a **service delivery / realization system** (the socio‑technical system that actually performs fulfillment work),
* a **service delivery method** (workflow/runbook/procedure used to fulfill),
* a **service commitment** (deontic binding, e.g., SLA/SLO as obligation),
* a **service promise act** (promissory speech act: offer/promise/accept/agree/publish),
* a **service delivery work** episode (run/incident/fulfillment work + evidence).

FPF’s kernel uses `U.PromiseContent` as **promise content**, which is SoTA‑consistent for contracts and decision lanes, but clashes with the everyday addressability-centric use of “service”. This makes “service” a high‑risk metonymy attractor: authors start using the same word for (a) the clause, (b) the provider system, and (c) the delivery work, and readers cannot reliably recover which is meant.

In addition, lived “service talk” is rarely isolated to the token *service*: it co‑moves with **server** and **service provider** (and with “API service”, “service desk”, “service team”). Treating only the word *service* as ambiguous is an underfit to the domain.

Critically, everyday “service” often conflates **three different participants** that are frequently *not identical*:

1. the **provider principal** (accountable role‑enactor: a team/org/vendor),
2. the **delivery / realization system** (the socio‑technical system that does the work),
3. the **access point** (the addressable entrypoint/gateway/front desk/endpoint host).

This pattern forces those participants apart, because different predicates and different governance rules apply to each.

This pattern makes “service” an **always‑unpack token** in normative prose: you may use it only as part of a **qualified head phrase** that states which facet is meant.
### Problem

Unqualified “service” in normative prose causes **referent ambiguity** that cannot be repaired by reader intuition, because the ambiguity is structural:

1. **Addressability mismatch:** you can *call/visit* an access point, but you cannot call a clause.
2. **Type mismatch:** work/telemetry/incidents are properties of **work + carriers**, not of promise content.
3. **Deontic mismatch:** “must/shall/guarantee” binds **actors/roles** via commitments, not abstract clauses.
4. **Speech‑act mismatch:** “promise/offer/accept” are **events/acts**, not the promise content itself.
5. **Evolution mismatch:** changing an API endpoint or deployment is not “changing the service” unless you declare which facet changed and narrate that change with stable change classes.

Result: reviewers can’t apply A.6.B routing, and engineers are incentivized to preserve ambiguity (“service” as a convenient metonym) because it avoids committing to a model.
### Forces

| Force                                   | Tension                                                                                                 |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Precision vs readability                | Always‑unpacking improves auditability, but increases wordiness.                                        |
| Kernel minimality vs safety             | Avoid introducing new core primitives; still prevent category errors.                                   |
| Everyday language vs normative contract | Teams naturally say “service is down”; normative text must point to *what* is down.                     |
| Cross‑domain applicability              | Must work for microservices, human services, public services, and physical services.                    |
| Evolution vs continuity                 | Service facets evolve at different rates; prose must narrate changes without silently shifting meaning. |
### Solution

#### A.6.8:4.0 — UTS + LEX preparation (mandatory for authoring/repair)

“Service” is a **polysemy cluster**, not a single token. Therefore, before applying the rewrite rules below to normative prose, the author/editor SHALL create or update a **thread‑local UTS block** (F.17) and its paired **LEX‑BUNDLE entries** (E.10) for the **service cluster** (Tech/Plain twins and PTG stance).

**Required cluster coverage (minimum).** The UTS block MUST cover, at minimum, the co‑moving surface forms:

* `service` / `services`
* `service provider` (and the corresponding provider term in the domain: team/shop/department/vendor, etc.)
* `server` (including “daemon”, “host”, “endpoint host” where those appear)
* `microservice` / `microservices` (and spelling variants such as “micro-service”) **when they appear in the source prose** as a stand‑in for the addressable system facet (“the thing you can call/deploy”) or as a collapsed bundle token
* “API service” / “service interface” / “service access” (when present in the source prose)
* “SLA/SLO/service level” language (when present)

**Context selection (universality guard).** The UTS block MUST cite **ContextName@Edition** in each SenseCell (F.17), and the cited contexts SHOULD span at least **three** distinct “service traditions” reflected in this pattern’s SoTA‑Echoing set (e.g., ITSM/service management, EA/modelling, speech‑act/coordination, microservices/SRE practice). This prevents a “FPF‑only” meaning loop and keeps facet names portable.

**Headphrase governance (no ad‑hoc synonyms).**

* Each facet head phrase used by this pattern (e.g., “promise content”, “service access point”) SHALL appear as a **UTS twin** (Tech/Plain) in the local UTS block, not as an author‑invented one‑off.
* Both the **Tech** and **Plain** twin for a facet head phrase SHALL carry an explicit **head kind word** that signals the facet category (**clause / role / principal / system / access point / spec / method / commitment / act / work**). Plain synonyms are permitted only if they preserve the head kind (e.g., “endpoint” as an access‑point head kind; “API spec” as an access‑spec head kind). This is the readability guard that prevents “mathematician renamings”.
* A conforming **normative Tech** text SHALL treat the bare word **service** (unqualified) as **PTG=Guarded** (E.10): it is allowed only under this pattern’s rewrite rules and only as part of a qualified head phrase.
* If a new facet head phrase must be introduced, it SHALL be treated as a **LexicalAct** with an explicit **Mint/Reuse** decision (F.8), and its **CandidateSet + rationale** SHOULD be recorded via a Name Card (F.18 / NQD‑front) to avoid “clever” but unstable vocabulary.

This preparation step is intentionally “linguistic”: it binds the pattern to how engineers actually write (service/provider/server), rather than to an isolated kernel token.

**SoTA binding (informative audit anchor).** The major disambiguation rules in §4.4–§4.7 are aligned with the SoTA‑Echoing rows in §11:
* “offering / promise content” vs “delivery operations” split → ITIL 4 + EA modeling,
* “interface/access” vs “realization/implementation” split → ArchiMate + SRE practice,
* “promissory act” vs “promise content” split → ISO 24617‑2 dialogue acts,
* “offering/commitment” vs “delivery event” split → service ontologies (e.g., S‑OPL / UFO),
* “actuals/telemetry” vs “targets/obligations” split → SRE evidence discipline,
* “roles + context” emphasis when discussing “service quality” → service science / service‑dominant logic.
(These anchors are informative; they do not assert cross‑Context identity and require Bridges when imported as terms.)
#### A.6.8:4.1 — Trigger rule

This pattern applies whenever **“service”** appears in **Tech/normative prose** as a head noun (including compounds like “X service”, “the service”, “our service”, “this service”), **even when the intended referent is `U.PromiseContent`**.

It also applies to the adjacent cluster terms **“service provider”** and **“server”** when they are used as stand‑ins for the same collapsed bundle (clause/access/provider/work). The rewrite outcome for those terms is facet‑typed (see §4.3 and §4.9).

**Carve‑out (informative, narrow):** quotations of external material may retain “service”, but SHALL be followed immediately by an unpacking rewrite in the surrounding normative text.
#### A.6.8:4.2 — Stable lens: the Service Situation Bundle

Define a stable, kind‑labelled qualified record (hyperedge lens) that makes the bundle explicit **without introducing a new core entity kind**. This record binds already‑defined referents so prose can talk about multiple facets without collapsing them:

**`serviceSituation(…)` — Qualified Relation Record (QRR) lens id**

Participant slots (principal facets). The slot names are intentionally *prose-facing* (engineer-readable): they are meant to make it hard to “silently collapse” clause/principal/system/access/work.

* `promiseContentRef : PromiseContentRef`
  *Promise content* — the `U.PromiseContent` referent (A.2.3). **Plain head:** *promise content* / *service offering clause* / *service promise clause*.
* `promisedOutcomeSpecRef? : OutcomeSpecRef`
  The **promised outcome template** described by the clause (`U.OutcomeSpec`, A.7:5.10). It may constrain:
  - **delivery work** (work‑only: “do X for ≥5 minutes”),
  - **delivered state / artifact** (result‑only: “a hole of depth ≥1 m exists”),
  - or **both** (composite).
  This is **not** a concrete `U.Work` run and **not** the delivered world object; it is the spec used to judge delivery work and evidence.
**Invariant: SERV‑INV‑1 (OutcomeSpecness).**
  `promisedOutcomeSpecRef` MUST denote a `U.OutcomeSpec` (kind‑labelled episteme), not a `U.Work` episode and not an extensional result object.
* `providerRoleRef : RoleRef`
  The provider **role kind** named by the clause (typically `clauseRef.providerRole`).
* `providerAssignmentRef? : RoleAssignmentRef`
  The concrete **role enactor assignment** that holds `providerRoleRef` in the relevant Context/window (E.10 / A.2.1). This is what everyday talk calls “the service provider” (team/shop/vendor/system).
* `providerPrincipalRef? : EntityRef`
  Convenience alias: the **accountable principal** extracted from `providerAssignmentRef` (when you need to name the accountable party explicitly).
  - Normative default: commitments attach here (or to the relevant role assignment), not to the access point.
* `consumerRoleRef? : RoleRef`
  The consumer **role kind** named by the clause (typically `clauseRef.consumerRole`, if present).
* `consumerAssignmentRef? : RoleAssignmentRef`
  The concrete **role enactor** of `consumerRoleRef` (when needed for accountability/evidence narratives).
* `accessSpecRef? : MethodDescriptionRef`
  The **service access spec** / request‑facing interface description (API signature, OpenAPI, endpoint contract, intake SOP, desk procedure). This is typically `promiseContentRef.accessSpec` (A.2.3) and is a `U.MethodDescription`.
* `accessPointRef? : SystemRef`
  The **service access point** — an addressable system/facility/desk/endpoint host through which requests arrive. In lived language this is often called “the service” or “the server”.
* `deliverySystemRef? : SystemRef`
  The **service delivery / realization system** that actually performs the delivery work. In software, this is usually the deployed application + dependencies (and may be behind gateways); in human services, this is the socio‑technical organisation + tooling that does the work.
* `deliveryMethodRef? : MethodDescriptionRef`
  The **service delivery method** / internal procedure/runbook/workflow used to fulfil the clause. This is distinct from `accessSpecRef` (request‑facing access).
* `commitmentRef? : CommitmentRef`
  Deontic binding to deliver the clause (required when the prose uses must/shall/guarantee/SLA force).
* `promiseActRef? : SpeechActRef`
  The instituting/promissory act (offer/promise/accept/agree/publish) when relevant.

  **Invariant: SERV‑INV‑2 (Responsibility alignment).**
  When the surrounding passage is normative about responsibility (D‑quadrant language), the promissory actor/authorizer of `promiseActRef` aligns with `providerPrincipalRef` (or the corresponding `providerAssignmentRef`), rather than being silently shifted to `accessPointRef`.
* `deliveryWorkRef? : WorkRef`
  The delivery / fulfillment work episode(s) (including incidents, runs, requests) when relevant.

  **Invariant: SERV‑INV‑3 (Outcome anchoring).**
  If both `deliveryWorkRef` and `promisedOutcomeSpecRef` are present, then the cited Work instance(s) either:
  (i) explicitly assert `deliversPromisedOutcome(deliveryWorkRef, promisedOutcomeSpecRef)` (A.2.3:8.1), or
  (ii) provide sufficient I/O/Δ evidence anchors for that relation to be derived in the Context.

  **Invariant: SERV‑INV‑4 (Unit-of-delivery measurability).**
  If `promiseContentRef.unitOfDelivery` is present, then its `countingRule` is stated (per A.7:5.10.3, with defaults allowed) and the cited Work carries the measurements required by that rule (duration, quantity, cases, kWh, etc).
* `adjudication? : AdjudicationHooks`
  Evidence anchors (e.g., `evidenceRefs`, `carrierRefs`) used for acceptance/breach evaluation when the passage asserts actuals.

Qualifier slots (as needed per A.6.P/A.6.B):

* `scope? : ClaimScope`
* `Γ_time?` (explicit Γ_time selector per A.2.6; time windows are explicit when the surrounding passage is time‑sensitive)
* `viewpoint? : ViewpointRef`
* `referenceScheme? / representationScheme?` (only when needed)

**Guidance (didactic).** In normative prose, prefer facet‑explicit predicates: if a predicate targets a specific facet (addressability, deontic force, actuals, mechanism), apply it to the corresponding slot rather than to an untyped “service” noun phrase. (Enforced by CC‑A.6.8‑3/4/6/9.)

**Agency + grounding clarifications (normative).**

* The **promise content** (`promiseContentRef`) is *promise content*; it does not act, deploy, crash, or guarantee. It can be **published** (via a carrier) and **used as payload** of a commitment.
* The **promisor / commitment‑holder** is the **provider principal** (or its role assignment) unless the Context explicitly models a system as an agent with standing. *(See CC‑A.6.8‑8.)*
* The **access point** and **delivery system** are typically *instruments/realizers*. The linkage to the accountable principal is expressed via an explicit relation kind (e.g., operated‑by / owned‑by / authorized‑by / fronts / routes‑to). *(See SERV‑WF‑1.)*

**Well‑formedness constraint: SERV‑WF‑1 (Explicit relation typing in bundles).**
When a `serviceSituation(…)` binds a principal/role assignment to systems (access point / delivery system), the relation kinds are explicit (prefer A.6.6 base relations when available). **Implicit “system implies provider” readings are invalid.**
* Mechanism/process claims target `deliverySystemRef` and/or `deliveryMethodRef` (and sometimes `accessSpecRef` if the claim is strictly about interface signature), not `promiseContentRef`. *(See CC‑A.6.8‑9.)*

**Well‑formedness constraint: SERV‑WF‑2 (Accountable subject present when binding is asserted).**
If `serviceSituation(…)` includes `commitmentRef` and/or `promiseActRef`, then it also includes an accountable subject slot:
`(commitmentRef ∨ promiseActRef) ⇒ (providerAssignmentRef ∨ providerPrincipalRef)`.
This prevents “floating” commitments/acts that can’t be routed to a holder/authorizer.

**Facet→Kind map (didactic, normative).** The bundle exists precisely because these facets are **different kinds** and therefore admit different predicates:

| Facet (slot) | Canonical FPF object | Kind family (A.7 / I‑D‑S) | Typical predicates that *belong* here |
| --- | --- | --- | --- |
| `promiseContentRef` | `U.PromiseContent` | **Episteme** (promise content) | states preconditions/outcomes; defines acceptance criteria; constrains what counts as fulfilment |
| `promisedOutcomeSpecRef` | `U.OutcomeSpec` | **Episteme** (outcome template) | constrains delivery work and/or delivered state; supplies the outcome target for acceptance; can be decomposed into work/result clauses |
| `providerAssignmentRef` | `U.RoleAssignment` | **Role assignment** (who is accountable) | is accountable; is the provider; bears duty; is authorized to promise |
| `providerPrincipalRef` | (derived from role assignment) | **Agent / principal** (responsible party) | holds commitments; is liable; delegates; authorizes carriers/systems |
| `deliverySystemRef` | `U.System` | **System** (realizer) | implements/realizes; contains components; has failure modes; produces operational evidence |
| `accessPointRef` (“server”) | `U.System` | **System** (addressable) | call/invoke/restart/down/latency |
| `accessSpecRef` | `U.MethodDescription` | **Episteme** (interface/spec) | versioned; published; compatible |
| `deliveryMethodRef` | `U.MethodDescription` | **Episteme** (procedure/runbook) | steps/controls; escalation; timing model; safety constraints |
| `commitmentRef` | `U.Commitment` | **Deontic object** (binding) | must/shall/obligated; breachable; has holder and counterparty |
| `promiseActRef` | `U.SpeechAct` | **Work event** (communicative) | promised/accepted/announced |
| `deliveryWorkRef` | `U.Work` | **Work event** (operational) | executed; incident occurred; evidence produced |
#### A.6.8:4.3 — Facet headwords (mandatory lexical rule)

In normative prose, **replace the head word “service”** with one of the following facet head phrases:

1. **promise content** (or **service offering clause** / **service promise clause**) — promise content (`promiseContentRef : PromiseContentRef`, i.e., `U.PromiseContent`)
2. **promised outcome spec** (or **promised deliverable spec**) — what is promised as an outcome template (work‑only / result‑only / composite) (`promisedOutcomeSpecRef`)
3. **service provider role** — the provider role kind (`providerRoleRef : RoleRef`) when the text is about role structure (not about actuals)
4. **service provider principal** (or **service provider (role enactor)**) — the accountable provider that can hold commitments (`providerAssignmentRef` / `providerPrincipalRef`)
5. **service delivery system** (or **service realization system**) — the system that performs/realizes delivery (`deliverySystemRef : SystemRef`)
6. **service access point** (or **service endpoint**) — addressable entrypoint (`accessPointRef : SystemRef`); this is the “thing you can call/visit”
7. **service access spec** (or **service interface spec**) — request‑facing interface/method description (`accessSpecRef : MethodDescriptionRef`)
8. **service delivery method** (or **service method** / **service runbook** / **procedure**) — internal procedure for fulfilment (`deliveryMethodRef : MethodDescriptionRef`)
9. **service commitment** — deontic binding (`commitmentRef : CommitmentRef`)
10. **service promise act** (or **promissory speech act**) — speech act (`promiseActRef : SpeechActRef`)
11. **service delivery work** (or **service run / fulfillment work**) — execution episode (`deliveryWorkRef : WorkRef`)

**SERV‑LEX‑3 (Family‑name modifier + shorthand, normative).**
The facet head phrases above are **canonical** for RPR‑SERV. In normative prose, authors SHALL use these phrases (including the family‑name modifier **service**) as the primary surface forms for the facets.
The modifier **service** inside these phrases is not an “unqualified service” use and does not itself trigger further unpacking.
For readability, a local shorthand MAY be introduced by parenthetical declaration immediately after the canonical phrase, and then used consistently within that declared scope (for example: “service delivery system (delivery system)”). A conforming text SHALL NOT introduce multiple shorthands for the same facet, and SHALL NOT reuse a shorthand for a different facet.
In code identifiers, slot names (e.g., `deliverySystemRef` in `serviceSituation(…)`), and diagrams/tables, the modifier MAY be omitted without an explicit shorthand declaration, because the surrounding construct already binds the facet.

**Cluster note (server/provider) — heuristics (informative).**
* If the draft uses **server** as a synonym for “the service”, it usually denotes the **service access point** (or host system), unless the domain’s “server” is explicitly a person (e.g., restaurant).
* If the draft uses **service provider** but then predicates deployment/restart/latency, it usually denotes a **service delivery system** or **service access point**, not an accountable principal.
* If the draft uses **service provider** but then predicates “guarantees / obligated”, it usually denotes the **service provider principal** plus an explicit **service commitment**.
* If a passage attributes promissory agency to a machine (“the server promises”), treat the machine as a carrier/witness unless the Context explicitly grants it standing as an agent.

(Normative enforcement is via CC‑A.6.8‑1 and CC‑A.6.8‑8.)
#### A.6.8:4.4 — Addressability rule (the “can you call it?” test)

If the draft sentence implies *addressability* (verbs like **call/invoke/request/visit/go to/connect to/route to/deploy/restart/scale**), then the referent MUST be a **service access point** (`accessPointRef : SystemRef`) or a **work episode** (`deliveryWorkRef`), never the promise content.
#### A.6.8:4.4b — Method/mechanism rule (the “how does it work?” test)

If the draft sentence asserts or explains *how the service works* (verbs like **implement/realize/work by/uses/consists of/pipeline/algorithm/workflow/runbook/process steps**) then the referent MUST be a **service delivery system** (`deliverySystemRef`) and/or a **service delivery method** (`deliveryMethodRef`).

If the draft uses *service* as the name of a **promised work method** (common in plain language: “cleaning”, “repair”, “haircutting”), treat that as part of the promise by constraining the `U.OutcomeSpec.workSpec.methodConstraintRef` (what is promised). Keep `deliveryMethodRef` for the provider‑internal runbook/procedure that realizes the promise (how it is executed).

If the draft sentence is specifically about the **externally visible signature/shape** (endpoints, request/response schema, SOP steps visible to consumers), route it to **service access spec** (`accessSpecRef`).

A conforming text **SHALL NOT** attach mechanism/process predicates to the **promise content**; the clause may constrain outcomes or acceptance criteria, but mechanism claims belong to design/method artefacts. *(See CC‑A.6.8‑9.)*
#### A.6.8:4.5 — Deontic rule (the “must/shall” test)

If the sentence contains deontic force (**must/shall/guarantee/obligated/SLA**), the referent MUST include a **service commitment** slot, and the deontic language MUST attach to the commitment/holder, not to the clause or to the access point.

When the prose needs a subject, prefer: **“the service provider principal SHALL … under commitment C”** rather than “the service SHALL …”.

**No hidden agency rule (normative):** A conforming text **SHALL NOT** use an access object (e.g., endpoint/access point) as the grammatical subject of an RFC‑keyword sentence. It **SHALL** use the accountable principal (or role assignment) as subject and then state the operational condition on the access point as a predicate/evidence claim. *(See CC‑A.6.8‑4 and CC‑A.6.8‑8.)*
#### A.6.8:4.6 — Speech‑act rule (the performative verb test)

If the sentence uses performatives (**promise/offer/accept/agree/commit/announce/publish**), the referent MUST include a **service promise act** (`promiseActRef`) and must not collapse the act into the clause.

If a server/webpage/API response is involved, a conforming text **SHALL** treat it as a **carrier/witness** of the promise act unless the Context explicitly grants it standing as an agent. A conforming text **SHALL** keep the promissory actor/authorizer aligned with the provider principal.
#### A.6.8:4.7 — Runtime/telemetry rule (the “actuals” test)

If the sentence asserts actuals (**down/slow/99.9% last week/latency is X/incident occurred**), the claim MUST be routed to **work + carriers/evidence** (deliveryWorkRef + witnesses), not to the clause.

If an actual is used in a conformance block, KPI, or acceptance argument, it MUST cite the underlying `U.Characteristic` and measurement procedure/evidence carrier (C.16/C.25), with pinned `{UnitType, ScaleKind, ReferencePlane, EditionId}`; otherwise it is prose only and MUST NOT be treated as a verified SLO/SLA measurement.

When needed, also name whether the actual is about the **access point** (entrypoint symptoms) or the **delivery system** (realizer symptoms). “Down” can be about the gateway even when the backend is fine; the pattern forbids collapsing those.
#### A.6.8:4.8 — Change‑class lexicon (service‑specific narrations)

When the draft describes “service changes”, narrate changes using stable change classes (A.6.P), specialized to the serviceSituation lens:

* `declareRelation(serviceSituation(…))` (introduce the bundle)
* `withdrawRelation(serviceSituation@ed=k)` (retire the bundle)
* `retargetParticipant(accessPointRef := …)` (move the access point / endpoint host)
* `retargetParticipant(deliverySystemRef := …)` (change the realizing delivery system; e.g., re‑platforming)
* `retargetParticipant(providerAssignmentRef := …)` (change provider role‑enactor; outsourcing / org change)
* `reviseByValue(accessSpecRef := …)` (edit interface description content)
* `reviseByValue(deliveryMethodRef := …)` (edit runbook/workflow/procedure)
* `reviseByValue(promiseContentRef := …)` (edit promise content; typically new edition)
* `changeRelationKind` is not applicable here unless splitting the family (rare)
* `rescope`, `retime(Γ_time)`, `refreshWitnesses(witnesses := …)` as required
#### A.6.8:4.9 — Disambiguation guide (rewrite/selection)

If the draft says:

* “**the service** is deployed/restarted/scaled/called” → rewrite as **service access point** (system) or **service delivery work** (deployment work), and (optionally) attach it to a `serviceSituation`.
* “**the service** promises/guarantees X” → rewrite as **promise content** (promise content), and if “guarantees” is deontic, also introduce **service commitment** held by the **service provider principal**.
* “**the service** is down/slow/has 5xx” → rewrite as **service access point** (down) and/or **service delivery work** (incident/run), with evidence.
* “we **promised** the service” / “we **agreed** the service” → rewrite as **service promise act** + **promise content** (+ commitment if binding).
* “**the service provider** guarantees X” → rewrite as **service provider (role enactor)** + **service commitment** (+ promise content as payload).
* “**the server** is down / slow / restarted” → rewrite as **service access point** (server/host system) and/or delivery work, not as clause.
* “**the service** is implemented by / realized by / works by doing Y” → rewrite as **service delivery system** and/or **service delivery method** (and keep the clause separate as the outcome constraint).
* “**the service** API signature / endpoint schema / request format is …” → rewrite as **service access spec**.
* “the service ticket / service request” → rewrite as **ticket** / **request work item**; “service” is adjectival legacy and must be eliminated or mapped via LEX.
### Archetypal grounding

**Tell.** A “service” is not a single thing. In normative prose you MUST name which facet you mean, and (when needed) tie facets together via a `serviceSituation(…)` record so readers can follow accountability, access, deontics, and evidence without guessing.

#### Show 1 — System archetype (microservices + SRE)

**Draft (ambiguous):**
“Payments service is down; the service guarantees 99.9% uptime; we will restart the service.”

**Unpacked (facet‑explicit):**

* “The **Payments service access point** (the Payments API ingress/endpoint host) is down.”
* “The **Payments service delivery system** (the Payments backend realizer) is degraded (symptom attribution is explicit).”
* “The **Payments service access spec** (e.g., OpenAPI/endpoint contract) defines the request/response interface.”
* “The **Payments promise content** states target availability `SLO=99.9%` over `Γ_time=30d` (promise content).”
* “The **service commitment** held by the **service provider principal** binds them to that clause.”
* “The **service delivery work** `Incident#2025‑…` records outage evidence and the restart action; the runbook used is the **service delivery method**.”

**Optional `serviceSituation` bundle (sketch):**

* `serviceSituation( promiseContentRef=PaymentsAvailabilityClause, providerRoleRef=PaymentsPlatform#ServiceProviderRole, providerPrincipalRef=PaymentsPlatformTeam, accessSpecRef=PaymentsAPIv2, accessPointRef=PaymentsAPIIngressProd, deliverySystemRef=PaymentsBackendProd, deliveryMethodRef=PaymentsIncidentRunbook@ed=…, commitmentRef=AvailabilityCommitment@ed=…, deliveryWorkRef=Incident#…, Γ_time=Rolling30d, witnesses={SLOReport#…, IncidentLog#…} )`
#### Show 2 — Episteme archetype (physical/human service)

**Draft (ambiguous):**
“The auto service accepts walk‑ins and promises repair in 2 days.”

**Unpacked (facet‑explicit):**

* “The **service access point** is the *Auto Repair Shop front desk* (an addressable facility).”
* “The **service access spec** is the *intake procedure* (how to request/submit a car).”
* “The **promise content** promises ‘repair completed within 2 business days’ given stated preconditions.”
* “The **service delivery method** is the *shop workflow* (inspection → parts ordering → repair → QA → handover).”
* “The **service provider principal** is the shop entity that can hold a commitment (not the front desk as an access point).”
* “If advertised as binding, introduce a **service commitment** held by the shop’s provider role.”
* “Each repair job is **service delivery work** with evidence (work order, timestamps, acceptance sign‑off).”
### Bias-Annotation

Lenses tested: **Gov**, **Arch**, **Onto/Epist**, **Prag**, **Did**.

* **Gov bias:** favors explicit accountability (provider role + commitment) and audit surfaces (witnesses); increases enforceability but raises authoring burden.
* **Arch bias:** encourages bundle/record lenses and explicit interfaces; may feel heavyweight for informal notes.
* **Onto/Epist bias:** strongly separates clause vs system vs work vs deontic; prevents category errors but reduces metaphor-friendly storytelling.
* **Prag bias:** optimizes for cross-team readability and reduced rework; may require refactoring existing prose at scale.
* **Did bias:** enforces teachable tests (“can you call it?”, “is it deontic?”, “is it actuals?”); can appear prescriptive but improves onboarding.
### Conformance Checklist (CC‑A.6.8)

0. **CC‑A.6.8‑0 — UTS/LEX block exists for the service cluster.**
   Any document that applies this pattern (or that introduces normative “service” language) SHALL publish:
   (a) a local **UTS block** (F.17), and
   (b) paired **LEX‑BUNDLE entries** (E.10) for the Tech/Plain twins and PTG stances used here.
   +   Minimum cluster coverage SHALL include: `service`/`services`, `service provider`, `server`, `microservice`/`microservices` **when present in the source prose**, plus the chosen facet head phrases. If the document uses “API service / service interface / service access” or SLA/SLO/service‑level language, the local UTS/LEX block SHALL include those surface forms as well.
   Each SenseCell SHALL cite ContextName@Edition; cited contexts SHOULD not be “FPF only”.
   Any newly introduced facet head phrase SHALL have an explicit Mint/Reuse decision (F.8) and SHOULD have a Name Card rationale (F.18).

1. **CC‑A.6.8‑1 — Unqualified “service” (and cluster stand‑ins) is forbidden in normative prose.**
   A conforming boundary/spec text SHALL NOT use **service** as an unqualified head noun, and SHALL NOT use **server** or bare **service provider** as untyped stand‑ins for the same collapsed bundle.
   Every such occurrence SHALL be rewritten to a facet head phrase (promise content / promised work‑kind / service provider role or principal / service delivery system / service access point / service access spec / service commitment / service promise act / service delivery work) or replaced with the correct underlying FPF object (team, ticket, workflow, system, etc.).
   The facet head phrases in §4.3 are **canonical**; using **service** as the family‑name modifier inside those phrases is permitted and does not itself trigger further unpacking. Any local shorthand that drops the modifier is allowed only under SERV‑LEX‑3.
   *Exception:* direct quotations may retain the original surface form, but the surrounding normative prose SHALL immediately provide an unpacking rewrite.

2. **CC‑A.6.8‑2 — `U.PromiseContent` is referred to as a “promise content” in prose.**
   When the intended referent is `U.PromiseContent`, authors SHALL use “promise content” (or “service promise clause”) as the head phrase and SHALL NOT rely on the bare word “service”.

3. **CC‑A.6.8‑3 — Addressability implies `accessPointRef` (system), not clause.**
   Any statement implying invocation/connection/deployment/restart SHALL target a service access point (`SystemRef`) and/or delivery work, never a promise content (`U.PromiseContent`).

4. **CC‑A.6.8‑4 — Deontic language requires a commitment.**
   Any normative “must/shall/guarantee/SLA” statement about service delivery SHALL introduce (or reference) a `U.Commitment` and attach the deontic force to that commitment/holder.
   In addition, a conforming text SHALL NOT use a service access point / server as the grammatical subject of an RFC‑keyword sentence; the subject is the accountable provider principal (or role assignment), with access‑point conditions stated as predicates/evidence.

5. **CC‑A.6.8‑5 — Performative verbs require a speech act.**
   Any statement using “promise/offer/accept/agree/announce/publish” about the service SHALL reference a `U.SpeechAct` (promise act) and SHALL NOT collapse it into the clause.

6. **CC‑A.6.8‑6 — Actuals require work + evidence.**
   Any claim about runtime state/telemetry/incidents SHALL be routed to `U.Work` plus carrier/evidence references; it SHALL NOT be stated as a property of the promise content.

7. **CC‑A.6.8‑7 — Bundle lens is used when multiple facets are in play.**
   When a passage simultaneously discusses two or more facets (e.g., clause + endpoint + SLA + incident), the author SHOULD provide a `serviceSituation(…)` record (or equivalent explicit slot binding) so readers can track the linkage without guesswork.
   When a `serviceSituation(…)` record is provided, it SHALL satisfy SERV‑INV‑1, SERV‑INV‑2, and SERV‑WF‑1 from §4.2.
   When a `serviceSituation(…)` record is provided and it includes `commitmentRef` and/or `promiseActRef`, it SHALL also satisfy SERV‑WF‑2.

8. **CC‑A.6.8‑8 — Commitments and promises have an accountable principal.**
   Any statement that introduces a **service commitment** or **service promise act** SHALL name (directly or via role assignment) the **service provider principal** who is the holder/authorizer. A conforming text SHALL NOT attribute commitments/promises to a bare access point/server unless the Context explicitly models it as an agent with standing (and that modelling is declared).

9. **CC‑A.6.8‑9 — “How it works” claims route to method/system, not to the clause.**
   Any statement about implementation, mechanism, workflow, runbook, or process SHALL target **service delivery system** and/or **service delivery method** (or **access spec** if it is strictly interface‑signature). It SHALL NOT be stated as a property of the promise content.
### Common Anti-Patterns and How to Avoid Them

* **Anti‑pattern:** “The service is deployed on Kubernetes.”
  **Fix:** “The **service access point** (deployment) is deployed on Kubernetes.”

* **Anti‑pattern:** “The service guarantees X.”
  **Fix:** “The **promise content** states target X; the **service commitment** guarantees X.”

* **Anti‑pattern:** “The service provider guarantees X.”
  **Fix:** “The **service provider (role enactor)** holds a **service commitment** that guarantees X; the **promise content** is the promise content.”

* **Anti‑pattern:** “The server provides the service (as if server=promise).”
  **Fix:** “The **service access point** (server/host system) provides access; the **promise content** is promise content; any ‘must/shall’ binds via **service commitment**.”

* **Anti‑pattern:** “The service works by doing Y / is implemented with Z.”
  **Fix:** “The **service delivery system** works by doing Y / is implemented with Z; the **service delivery method** (runbook/workflow) is …; the **promise content** constrains outcomes/acceptance.”

* **Anti‑pattern:** “We promised the service.”
  **Fix:** “We performed a **service promise act** that published the **promise content** (and instituted a commitment if binding).”

* **Anti‑pattern:** “Service is down (therefore contract violated).”
  **Fix:** “The **service access point** is down (actual). Contract breach evaluation is a separate claim comparing actuals (work/evidence) to the clause + commitment.”

* **Anti‑pattern:** “Service and API are used interchangeably.”
  **Fix:** Use **service access spec** for the API description; use **service access point** for the addressable system; use **promise content** for promise content.
### Consequences

* **Pros:**

  * Removes the incentive to keep “service” conveniently vague.
  * Enables A.6.B routing: clause (L), commitment (D), acts/work/evidence (E), mechanisms/interfaces (A/L depending on placement).
  * Makes incident/SLO/SLA discourse structurally sound and reviewable.

* **Cons:**

  * Increases verbosity and requires refactoring existing prose.
  * Requires authors to learn (and consistently apply) facet headwords.

**Adoption test (1 minute).**
After refactoring any normative section that contains ≥ 10 occurrences of the “service” cluster, you can answer “yes” to all of:
1) Unqualified head‑noun “service” occurrences in normative prose are **0** (CC‑A.6.8‑1).
2) Every deontic (“must/shall/guarantee/SLA”) sentence about service delivery references a **service commitment** / `U.Commitment` (CC‑A.6.8‑4).
3) Every runtime/telemetry “service is down/slow/…” claim is routed to **work + evidence** and, when relevant, distinguishes access‑point symptoms from delivery‑system symptoms (CC‑A.6.8‑6 + §4.7).
### Rationale

The ambiguity here is not a simple synonym problem; it is a **bundle‑collapse problem**. “Service” routinely stands in for different ontological categories (episteme content, system, event, deontic binding). Since the word is too entrenched to ban entirely, the least‑surprising stable repair is:

* keep “service” only as a *family name* in informal discussion, but
* in normative prose always name the **facet** and, when needed, explicitly bind facets via a stable bundle lens.

This aligns with A.6.P’s requirement to replace umbrella tokens with explicit kind+slots forms and to provide rewrite guides and guardrails.
### SoTA-Echoing

> **Informative.** Alignment notes; not normative requirements. This section is written to satisfy the SoTA‑Echo obligations for Architectural patterns (post‑2015, multi‑Tradition; adopt/adapt/reject with reasons).

**Bridge hygiene note.** This section makes **no cross‑Context identity claims** (no implicit “same thing across traditions”). If a later edit wants cross‑Context reuse of terms or structures from external traditions, it must be mediated by explicit Bridges with declared CL (and plane policy where relevant), per the general SoTA/Bridge discipline.

| Tradition (Context) | What this pattern uses | Stance | Primary sources (post‑2015) | Notes / divergence |
|---|---|---|---|---|
| IT service management (ITSM) | Separates promise/value proposition (“offering”) from delivery/operations talk; motivates forcing facet headwords instead of letting “service” float. | Adapt | ITIL 4 Foundation (AXELOS, 2019) | FPF diverges by treating bare “service” as an always‑unpack token in **normative** prose, because ITSM vocabulary is intentionally managerial and polysemous. |
| Enterprise architecture modeling | Distinguishes “service” from “interface” and from “realization/implementation”; motivates the access‑spec vs access‑point vs delivery‑system split. | Adopt/Adapt | The Open Group ArchiMate® 3.1 Specification (2019) | FPF adapts the split by making **promise content** (`U.PromiseContent`) explicit and by making “addressability” a first‑class disambiguation test. |
| Ontology‑driven conceptual modeling (service ontologies) | Distinguishes service offering/commitment from service delivery events; motivates the “PromiseContent + Commitment + Work+Evidence” separation and prevents metonymy between SLA text, promissory act, and delivered outcome. | Adopt/Adapt | *S‑OPL: An Ontology Pattern Language for Service Modeling* (Falbo et al., 2016); *Unified Foundational Ontology (UFO): A Multi‑layered Ontology for Conceptual Modeling* (Guizzardi et al., 2022) | FPF uses this as a semantic anchor for precision restoration, but stays neutral on any single foundational ontology by treating `U.OutcomeSpec` / `U.Commitment` / `U.Work` as minimal cross‑domain pivots. |
| Service‑dominant logic / service science | Treats service as applied capability for another actor’s benefit and emphasizes co‑creation and context; motivates being explicit about roles (provider/customer/beneficiary) and claim scope when “service quality” is discussed. | Adapt | Vargo & Lusch (2016); Vargo & Lusch (2017); *The SAGE Handbook of Service‑Dominant Logic* (Vargo & Lusch, eds., 2018) | FPF does not bake “value co‑creation” into kernel types; it supports it via role modeling + claimScope + explicit commitments rather than via the bare token “service”. |
| Dialogue‑act / speech‑act operationalization | Treats promissory moves as explicit act types; motivates separating promise‑act from promise‑content. | Adopt | ISO 24617‑2:2020 (Dialogue Act Annotation) | FPF diverges by requiring that binding effects are represented as explicit `U.Commitment` objects rather than being inferred from the act alone. |
| SRE / modern operations practice | Keeps interface specs, SLO targets, deployments/endpoints, and incident evidence as separate artefact families; motivates the “actuals → work+evidence” rule and the “access point vs delivery system” split. | Adopt/Adapt | *Site Reliability Engineering* (Beyer et al., 2016); *The Site Reliability Workbook* (Beyer et al., 2018) | FPF adapts SRE practice by routing deontics to commitments (D) and keeping telemetry/incidents as evidence (E), rather than letting “SLO/SLA” prose collapse into the word “service”. |


**Pack binding (status).** No dedicated SoTA Synthesis Pack is cited here yet for the “service polysemy” cluster; if/when such a pack is published, this section SHOULD be updated to cite the relevant ClaimSheet IDs / CorpusLedger entries (and Bridge ids where reuse is asserted) as the auditable anchors for the alignment statements above.
### Relations

* **Specialises:** A.6.P (RPR) for the lexical/semantic ambiguity cluster around “service”.
* **Operationalises + extends:** the lexical disambiguation intent of L‑SERV by making “service” **always‑unpack** in normative prose (and by expanding the cluster to include *service provider* and *server* as co‑moving stand‑ins).
* **Requires (authoring discipline):** a local UTS block (F.17) and published Tech/Plain twins (E.10) for the service/provider/server cluster; this is the “anti‑FPF‑only loop” guard.
* **Coordinates with:** A.6.C (contract bundle unpacking). When contract-language includes *service* tokens, apply RPR‑SERV first to select **promise content** vs **commitment** vs **access point/system** vs **work/evidence**, then route the resulting atomic statements through A.6.C → A.6.B (L/A/D/E).
### A.6.8:End
## U.CrossContextSamenessDisambiguation - Repairing cross-context “same / equivalent / align” via explicit Bridges (RPR‑XCTX)

> **Type:** Architectural (A) — A.6.P specialisation (RPR)
> **Status:** Stable
> **Normativity:** Normative
> **Placement:** A.6 cluster; immediately after A.6.8
> **Builds on:** A.6.P (RPR); F.0.1:2.3 (Explicit Bridge Principle); E.10.D1 (Context discipline); E.10.U9 (Alignment/Bridge lexical discipline); F.9 (Bridge discipline + reasoning primitives); F.7/F.8 (Concept‑Set rows & weakest‑link); F.5 (labels); A.7 (Strict Distinction: lanes + stance hygiene); E.19 (normative precision)
> **Coordinates with:** E.17 (Viewpoints / Views / Correspondences, when the prose is really about views/projections); C.3.3 (KindBridge, when the claim is about kind/classification transfer); A.6.6 (Identification/indexing, when the umbrella is really about IDs); Concept‑Set row scope rules; E.10 lexical SD (umbrella tokens); B.3 penalty conversion (if used)
> **Delta‑Class:** Δ‑3 (new normative pattern; additive; does not change existing kernel semantics)
> **Impact radius:** any document, table row, or boundary statement that asserts cross‑context sameness/compatibility/alignment between SenseCells, or collapses **A.7 lanes** / `CHR:ReferencePlane`s under umbrella “same/equivalent/…” wording
> **Mint vs reuse:** reuses `Bridge`, `BridgeKind`, `dir`, `CL`, `Loss`, `scope`; adds A.6.9‑specific Bridge‑Card qualifiers (`Γ_time`, `facetSpan`) (annotation slots; do not alter the kernel Bridge predicate); does not mint new kernel relations
> **Rationale witness:** required (in decision/publication lanes) for (i) declaring any Bridge with `scope` stronger than **Naming‑only**, and (ii) any strengthening edit (`scope` upgrade or `CL` increase). Provide the rationale as `witnessRefs` (review note, evaluation suite, decision log excerpt, etc.) and, where your process uses it, link the change to a DRR entry.

### Problem frame

Cross‑Context prose routinely uses umbrella predicates (“same”, “equivalent”, “align”, “map”, “matches”, “corresponds”) to compress a multi‑dimensional claim into a single adjective.

In FPF terms, this is almost never a single claim. It is a *Bridge situation* that typically contains, at minimum:

* two (or more) **Contexts** (`U.BoundedContext`; each with its own idiom);
* a potentially hidden **direction** (A→B is not B→A);
* a hidden **degree of fit** (≈ vs ⊑/⊒ vs ⋂ vs ⊥, or interpretation‑only);
* near‑inevitable **loss/distortion** on transfer;
* a (usually implicit) **edition / time‑slice basis** for both endpoints and the correspondence judgement (`Γ_time`);
* a usually implicit **facet span** (`facetSpan`; “which aspects are being aligned?”) — the correspondence is often a *partial lens*, not whole‑cell sameness;
* a critical ambiguity between **lexical synonymy / translation** (“same word/label”), **referential co‑denotation** (“same referent under different IDs”), and **value‑level normalization** (“equivalent after φ‑normalization / unit conversion”).
* a critical ambiguity between **explaining** a correspondence and **licensing substitution**.

A.6.9 is the RPR specialisation that makes this structure explicit and prevents accidental “global identity” claims when the author’s intent is merely naming convenience or interpretive help.
### Problem

When an umbrella predicate is used as if it were a single relation, readers (and downstream editors) silently choose defaults:

* **Symmetry hallucination:** “equivalent” is read as symmetric even when the intended relation is ⊑/⊒ (directional).
* **Scope creep:** “align/map” is read as substitution‑eligible, leaking into Role Assignment & Enactment or Concept‑Set row scopes.
* **Loss erasure:** “same” implies lossless transfer even when units, granularity, preconditions, or stance differ.
* **License confusion:** “explain X using Y” is mistaken for “Y can stand in for X”.
* **Implicit inversion:** later prose uses the inverse direction without an explicit redeclaration, breaking the “no silent inversion” rule.

The result is not merely imprecise wording: it changes what inferences are considered safe, and it pollutes Concept‑Set row scopes via unnoticed weakest‑link violations.

It also breaks **temporal coherence**: if the underlying canons (glossaries, schemas, code lists, ontologies) evolve, an un‑pinned “equivalent” claim silently becomes a claim about *two different editions at once*.
### Forces

| Force                      | Pull                                            | Push                                                                      |
| -------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------- |
| Brevity                    | One word (“same”) is fast.                      | Fast words hide multi‑slot claims and create accidental licences.         |
| Practical interoperability | Teams want “one label” across artefacts.        | Shared labels are not structural sameness; they require scope discipline. |
| Direction sensitivity      | Many correspondences are one‑way.               | Natural language defaults to symmetry (“equivalent”).                     |
| Partial overlap is common  | Real systems rarely coincide perfectly.         | “Same” collapses overlap vs inclusion vs disjointness.                    |
| Evidence evolves           | Fit changes as counter‑examples are discovered. | Without change classes, people “re‑align” without recording what changed. |
| Version drift              | Canons/models are versioned and revised.        | Without `Γ_time` pinning, “equivalent” becomes temporally incoherent.     |
| Safety of reuse            | Substitution can reduce work.                   | Substitution without explicit `CL`/Loss is a latent defect.               |
### Solution

Treat every cross‑Context umbrella‑sameness statement as an **RPR trigger** that must be rewritten into an explicit **Bridge claim** (F.9) with declared attributes.

This specialisation follows the A.6.P RPR envelope: it (i) defines a **trigger rule**, (ii) fixes the **stable lens** (Bridge Card), (iii) fixes a **minimal contract skeleton**, (iv) provides a **disambiguation guide**, and (v) standardises **change narration** for this class of ambiguity.

#### Trigger rule (normative)

An occurrence SHALL be treated as an A.6.9 trigger when **either** (i) `CtxA ≠ CtxB`, **or** (ii) the statement collapses **A.7 lanes** (`Object | Description | Carrier`) or `CHR:ReferencePlane`s under an umbrella sameness predicate, and the prose (or a table row comment) uses any of the following as if they were a single relation:

* **Umbrella predicates**: “same”, “identical”, “equivalent”, “align”, “map”, “match”, “correspond(s)”, and close variants.
* **Reuse‑intent shorthands** that often smuggle licences: “treat as”, “reuse”, “share”, “unify”, “canonical”, “single source of truth”, “synced”, “normalized”, “one‑to‑one”, “same ID”, “mirrors”.
* **Endpoint umbrellas** in the presence of a cross‑context sameness claim (e.g., “the system/service/model/table/class”) — this is simultaneously an endpoint‑identity problem and a Bridge problem.

**ID/reference caveat.** Tokens like “same ID”, “same key”, “one‑to‑one”, “synced”, or “mirrors” often denote an **identification/indexing** claim or an **operational mapping artefact** rather than a sense‑level correspondence. If an ID claim is being used as a proxy for meaning (“same ID ⇒ same thing/role”), split it into (i) an explicit identification/indexing claim (A.6.6) and (ii) any Bridge claim about meaning (this pattern). Keep code/ETL facts as `witnessRefs`; they do not determine `kind/CL/Loss/scope` by themselves.

**Multilingual caveat.** In non‑English prose, treat local‑language equivalents of the umbrella tokens as the same trigger class (e.g., Russian “эквивалентно”, “соответствует”, “это одно и то же”).

**Lane/plane‑only caveat.** If `CtxA = CtxB` and the trigger is solely a lane/plane collapse, repair lane/plane typing first (A.7 / declared `Φ_plane`). You MAY satisfy this pattern by re‑typing endpoints + adding an explicit non‑licensing marker; do not invent a Bridge unless you actually need an auditable cross‑Context licence record.

When triggered, the author SHALL do exactly one of:

1. **Rewrite into an explicit Bridge** (BridgeId or inline Bridge Card) with the required slots (`kind/dir/CL/Loss/scope` at minimum), or
2. **Rewrite into an Explanation‑only form**: either declare an **Explanation‑only Bridge** (`scope=Explanation‑only`) or keep the statement as Plain explanatory prose with an explicit **non‑licensing marker** (“no Bridge licence; do not substitute; do not justify rows”). In either form, it MUST NOT be used to justify Concept‑Set rows, cross‑Context reuse, or substitution.

The repair has three moves:

**Terminology discipline (Tech register).**
* In this spec, **Context** means `U.BoundedContext` (E.10.D1 / D.CTX).
* Use **lane** for the A.7 split (**Object | Description | Carrier**).
* **CHR:ReferencePlane** is reserved for world/concept/episteme crossings; do **not** use it as a synonym for lane.

0. **Resolve endpoints as SenseCells (and pin editions where relevant).** If the surface text uses pronominal/metonymic bundles (“the system”, “the model”, “it”, “this class”, “that table”, “the service”), treat this as an endpoint‑identity problem first: enumerate candidates and select the intended `σ@Ctx` endpoints (Candidate‑Set Note, A.6.P:4.0b). Also check **lane** and **stance/time tags**: ensure each candidate sits on the intended A.7 lane (**Object | Description | Carrier**) and record any time‑stance tags on the relevant artefacts/sources (e.g., `DesignRunTag = design | run`) that affect substitution safety. Do not treat `DesignRunTag` as a separate Context; it is a time tag on artefacts/sources. If the only crossing is design↔run, route via an Interpretation Bridge (`kind=⇄ᴅʀ`, `scope=Explanation‑only`) unless you have a separately justified substitution Bridge within a fixed lane. If the triggering token is an identifier/key/code, repair it as a Carrier‑lane identification/indexing claim first (A.6.6), and only then decide whether there is also a sense‑level Bridge claim. If the ambiguity is actually a **CHR:ReferencePlane** mix (e.g., “a database column” vs “a real‑world attribute”), treat that as a ReferencePlane issue: restate endpoints on a single `CHR:ReferencePlane`, or route the crossing through a declared `Φ_plane` policy before attempting any substitution licence. In decision/publication lanes, endpoint ambiguity is fail‑closed: if the intended endpoints cannot be resolved from local cues and `witnessRefs`, keep the sentence as Plain explanatory prose (or an Explanation‑only Bridge) and do not use it to justify cross‑Context reuse, Concept‑Set rows, or substitution.
   * **Modularity note:** if the endpoint token itself is a known umbrella term (e.g., “service”), apply the relevant endpoint‑disambiguation RPR first (e.g., A.6.8 for “service”), then return here for the cross‑context sameness predicate.
   * **View/projection note:** if the prose is primarily about **views/projections/correspondences** rather than sameness licences, coordinate with E.17 (multi‑view describing). You may still need a Bridge for naming/substitution licences, but do not let “is a view of” silently become “is the same as”.
   * **Edition / canon pinning (Γ_time).** If either endpoint’s meaning is fixed by a versioned canon (glossary, schema, code list, ontology, model release), record the specific editions (or “as‑of” date) used to make the correspondence judgement, and carry that as `Γ_time` on the Bridge Card. If you cannot state `Γ_time` in decision/publication lanes, fail‑closed: keep the prose Explanation‑only and do not justify rows or substitution.
   * **Ontology category sanity (Kinds vs instances vs values).** Before declaring `kind/dir/CL/scope`, check that the endpoints live at compatible ontological strata (e.g., *Kind/classification* vs *instance* vs *measurement value*). If the “equivalence” is really a kind/classification transfer, coordinate with **C.3.3 KindBridge**; if it is a value‑normalization claim, treat it as a Measurement‑family bridge and make the normalization channel explicit in `Loss` (and/or `witnessRefs`).

1. **Replace the umbrella predicate with a Bridge reference** (or an inline Bridge Card).
2. **Choose the Bridge’s kind, direction, licence scope, `CL`, and Loss notes explicitly**, instead of letting readers infer them.
3. **Separate “interpretation” from “licence”** by using the Bridge scope rules: Explanation‑only vs Naming‑only vs Substitution‑eligible.

This is a pattern specialisation of A.6.P: it provides the stable lens, contract skeleton, change‑class lexicon, and a disambiguation guide tailored to cross‑Context “sameness”.
#### Stable lens

**Stable lens (QRR):** the **Bridge Card** (F.9) used as a qualified relation record for cross‑Context sameness claims.

A conforming cross‑Context claim is expressed as a Bridge declaration:

```
⊢ Bridge(σA@CtxA, σB@CtxB) : ⟨senseFamily, kind, dir, CL, Loss, scope⟩
```

**A.6.9 qualifiers (pattern‑level; Bridge‑Card annotations).** A.6.9 additionally requires:
* `Γ_time` — edition/as‑of basis for the correspondence judgement (MUST in decision/publication lanes),
* `facetSpan` — the facet‑preservation span when the correspondence is not whole‑cell.
These live on the Bridge Card as qualifiers; they do **not** change the kernel Bridge predicate signature.

This record is a **conceptual judgement and licensed‑use record** (a thought‑format), not an ETL pipeline, API guarantee, or a “mapping implementation”. Operational mapping artefacts (aligner models, lookup tables, transformation code) belong in `witnessRefs` and do not erase `Loss` or relax `scope` by themselves.

**Non‑inheritance note.** A Bridge relates two local senses; it does **not** make `CtxA` a sub‑Context of `CtxB` (or vice versa), and it does not create “global identity” between Contexts.

**Kernel restraint reminder.** Bridges translate between local senses; they do **not** justify minting a new global `U.Type` by “sameness”. If the desired outcome is a new shared type/kind, route to the type‑minting discipline (A.11) and keep Bridges as translators.

**Direction note (avoid a common misread).** `dir = A↔B` expresses *symmetry of the correspondence* (e.g., for `kind∈{≈,⋂,⊥}` or for `kind=⇄ᴅʀ`), not “two substitution licences for free”. **Role Assignment & Enactment substitution is always directional** and must be stated as such (A→B). `scope=Type‑structure` is structural reuse, not substitution.

**Memory hook:** if the Bridge Card does not fit on one screen, you are describing the Contexts, not the Bridge.
#### Explicit contract skeleton

A.6.9 fixes the minimal slot set that must be made explicit whenever a cross‑Context (or cross‑lane / cross‑plane) “same/equivalent/align/map/…” assertion appears.
| Slot                 |               Required | Meaning / constraints                                                                                                                  |
| -------------------- | ---------------------: | -------------------------------------------------------------------------------------------------------------------------------------- |
| `BridgeId`           |          Yes (if cited) | Required whenever the Bridge is referenced from multiple places, used to justify row scope, or used as a licence in decision/publication lanes. Inline cards MAY omit an id for a single‑use didactic gloss. **When present, the id is a registry reference** (per the F.9 registry‑reference note): check existence / edition pinning, not signature export. |
| `σA@CtxA`, `σB@CtxB` |                    Yes | Endpoints are **SenseCells** (not strings, not “the systems”).                                                                         |
| `senseFamily`        |                    Yes | Use a named family (F.9). For substitution‑capable Bridges, this MUST be a single family (Role / Status / Measurement / Type‑structure / …). If the correspondence crosses families, use an **Interpretation** kind (`⇄ᴅʀ / →ᴍᴇᵃ / →ᴅᵉᵒ`) and record the channel explicitly (e.g., `Method ⇄ᴅʀ Execution`, `Measurement →ᴍᴇᵃ Requirement/Clause`, `Deontic →ᴅᵉᵒ Execution`), keeping `scope=Explanation‑only`. |
| `kind`               |                    Yes | One of the F.9 kinds: `≈ / ⊑ / ⊒ / ⋂ / ⊥ / ⇄ᴅʀ / →ᴍᴇᵃ / →ᴅᵉᵒ`. Use `⊑/⊒` only for defensible inclusion. If you can name a counter‑case that violates inclusion for these endpoints, you do **not** have `⊑/⊒` — use `⋂` or refine endpoints (SenseCell split). |
| `dir`                |                    Yes | Always explicit (F.9). Use `A→B` for any **substitution** claim (Role Assignment & Enactment‑eligible), even when `kind=≈`. Use `A↔B` only to express a symmetric correspondence (or Type‑structure reuse); it does **not** imply bidirectional substitution. **No implicit inversion.** **Inclusion sanity:** when `kind∈{⊑,⊒}`, ensure `dir` matches the intended safe reading (substitution, when allowed, goes **from narrower to broader**); if needed, swap endpoints or declare the inverse Bridge explicitly rather than relying on prose. |
| `Γ_time`             | Yes (in decision/publication lanes); otherwise Should | **Edition / time‑slice basis** for the Bridge judgement. Pin (or reference) the editions of the canons that fix the endpoints’ meanings (glossary/schema/code list/ontology/model release), or state an “as‑of” date for both sides. If endpoint notation already pins editions unambiguously, you MAY set `Γ_time = =endpointPins`. If the correspondence is intentionally *rolling*, say so explicitly and attach an update policy + witnesses; rolling claims MUST NOT justify substitution unless a specific edition pair is pinned for the decision being justified. |
| `CL`                 |                    Yes | Integer `0–3` with label (`0 Opposed`, `1 Comparable`, `2 Translatable`, `3 Near‑identity`) and a one‑line “why”. For `CL=3`, the “why” MUST cite matched invariants (see below). |
| `Loss`               |                    Yes | **Non‑empty Loss Notes** stating what fails to carry (units, scope, granularity, preconditions, stance). `Loss: none` is permitted **only** when `CL=3` and matched invariants are cited; for `kind=⊥`, use `Loss: n/a (incompatibility claim)` (F.9). |
| `facetSpan`          | Yes (if not whole‑cell); otherwise May | The **facet span** of the correspondence (what is being aligned / preserved): e.g., `{label}`, `{identifier semantics}`, `{membership}`, `{value after unit normalization}`, `{role qualifiers}`, `{status lattice}`. If the bridge is facet‑limited, either (a) refine endpoints into facet SenseCells (preferred), or (b) declare `facetSpan` explicitly and keep `scope` capped appropriately. |
| `counterExample`     |           Yes (if CL≤2) | The crispest case where the next‑stronger reading would mislead (substitution, row scope, or type reuse). For `CL=3`, state “no known counterexamples under invariants” (and cite the invariant set). |
| `invariants`         |           Yes (if CL=3) | A short list of the invariants that justify `CL=3` (domain + measurement + stance constraints as applicable), with pointers (`witnessRefs`) to where they are checked or argued. |
| `scope`              |                    Yes | Allowed use (F.9): `Explanation‑only / Naming‑only / Role Assignment & Enactment‑eligible / Type‑structure`. This is a **maximum licence** for how the Bridge may be used in reasoning and tables. Do not confuse it with **Claim scope (G)** from USM (A.2.6), and do not encode “sometimes substitution” by mixing scopes—narrow endpoints instead (see below). |
| `witnessRefs`        | Should (MUST in decision/publication lanes for any Bridge used beyond Explanation‑only) | Evidence artefacts / witness set (rules, tests, audits, empirical evaluations, review notes, alignment reports). `witnessRefs` are how readers distinguish “declared” from “demonstrated”. |
| `didacticHook`       |                    May | A single sentence that teaches the safe reading.                                                                                       |

**Hard separation:** “shared label” is `Naming‑only`; “can replace in decisions/enactment” is `Role Assignment & Enactment‑eligible` and requires the substitution conditions; “can be treated as the same class/type for structural inference” is `Type‑structure` and requires near‑identity under invariants.

**Two “scopes” warning.** `scope` is a **licence scope** (how the Bridge may be used). The *facet span* of the correspondence (“which aspects are aligned?”) MUST be carried either by endpoint refinement (preferred) or by an explicit `span` + consistent `Loss`. Do not overload `scope` to mean facet span.
**Naming note.** Use `facetSpan` for facet limitation to avoid confusion with other “span” operators/vocabulary elsewhere in the spec.

**Kind/scope admissibility (concept‑level; non‑deontic).**

The following constraints are stated as *admissibility conditions* (E.19): they define when a Bridge Card is well‑formed for a claimed licence.

* **INV‑XCTX‑KS‑0 (Kind/CL sanity).** If `kind=⊥`, then `CL=0`. If `CL=3`, then `kind=≈` and `invariants` are stated.
* **INV‑XCTX‑KS‑1 (Overlap caps scope).** If `kind=⋂`, then `scope ∈ {Explanation‑only, Naming‑only}`.
* **INV‑XCTX‑KS‑2 (Disjoint embargo).** If `kind=⊥`, then `scope = Explanation‑only`, and the Bridge cannot support Concept‑Set rows or substitution (F.9:13.4).
* **INV‑XCTX‑KS‑3 (Interpretation embargo).** If `kind∈{⇄ᴅʀ, →ᴍᴇᵃ, →ᴅᵉᵒ}`, then `scope = Explanation‑only`, and the Bridge cannot support Concept‑Set rows or substitution (F.9:13.5).
* **INV‑XCTX‑KS‑4 (Role Assignment & Enactment substitution).** If `scope = Role Assignment & Enactment‑eligible`, then `kind∈{≈,⊑,⊒}`, `dir = A→B`, `CL≥2`, the Bridge is senseFamily‑preserving, endpoints are stance‑compatible, Loss notes are non‑empty, and a counter‑example is stated (F.9:13.2, F.9:13.8, F.9:16.1).
* **INV‑XCTX‑KS‑5 (Type‑structure reuse).** If `scope = Type‑structure`, then `senseFamily = Type‑structure`, `kind=≈`, `dir=A↔B`, `CL=3`, and matched invariants are stated (Type‑structure is only supported by near‑identity; see F.9:6.1 and F.9:16.1).
* **INV‑XCTX‑KS‑6 (Inclusion honesty).** `kind∈{⊑,⊒}` implies: the Bridge does not cite any membership counter‑case that violates inclusion for the stated endpoints. If such a counter‑case exists, then (for these endpoints) `kind=⋂`, or the endpoints are refined (SenseCell split) before any inclusion kind is stated.

**No “conditional scope” in one Bridge.** Authors SHALL NOT encode two licences in one Bridge (e.g., “Naming‑only generally; substitution in workflow X”). Instead, refine endpoints into the guarded subset SenseCells (SenseCell split) and declare a **separate** Bridge for the refined endpoints (new id or new edition), keeping the broad Bridge at the weaker scope.
#### Change‑class lexicon

A.6.9 forbids “re‑align / re‑map / now equivalent” as a change description. Changes are narrated using the **A.6.P change classes**; the Bridge‑specific verbs below are narrative shorthands that map to A.6.P:4.4 (`declareRelation`, `withdrawRelation`, `retargetParticipant`, `reviseByValue`, `rescope`, `retime`, `refreshWitnesses`).
Authors SHALL NOT use umbrella verbs (“re‑align”, “re‑map”, “now equivalent”, …) as change narration. Narrate changes using the change‑class lexicon below (mapped to A.6.P:4.4).

1. `declareBridge(BridgeId, σA@CtxA, σB@CtxB, …slots…)`
2. `withdrawBridge(BridgeId)`
3. `retargetEndpoint(BridgeId, σA→σA', σB→σB')` (edition pinning or SenseCell split/merge)
4. `retime(BridgeId, Γ_time→Γ_time')` (maps to A.6.P `retime(newΓ_time)`; semantic; edition‑fenced in decision/publication lanes)
5. `changeBridgeKind(BridgeId, kind→kind')` (maps to A.6.P `changeRelationKind`)
6. `adjustCL(BridgeId, CL→CL')` (raise/lower, with at least one new invariant or counter‑example)
7. `rescope(BridgeId, scope→scope')` (Naming‑only → Role Assignment & Enactment‑eligible / Type‑structure is a strengthening; requires DRR and MUST be unconditional for the same endpoints)
8. `reviseLossNotes(BridgeId, Loss→Loss')`
9. `reviseFacetSpan(BridgeId, facetSpan→facetSpan')` (maps to A.6.P `reviseByValue`; semantic; edition‑fenced in decision/publication lanes)
10. `refreshWitnesses(BridgeId, witnessRefs→witnessRefs')` (adding one witness is a special case: set‑union + re‑publish)

**Edition fence (decision/publication lanes).** Any semantic edit to a Bridge’s slots (endpoints, kind, dir, CL, scope, invariants) SHALL be published as a **new Bridge edition** (with an explicit supersedes/withdraws note) rather than rewriting a prior edition in place. This preserves auditability and prevents “silent strengthening” through edits.

Semantic edits include changes to `Γ_time` or declared `facetSpan` (because they change what editions/aspects the correspondence judgement is about).

**Workflow/guard‑scoped strengthening is not a plain `rescope`.** If the stronger licence holds only after filtering/guards (e.g., “human users only”), represent that by **refining endpoints** (SenseCell split) and declaring a Bridge for the refined endpoints (new id or new edition), rather than upgrading the broad Bridge’s scope.

**Direction inversion is not an edit.** If the inverse relation is needed, declare a *new* Bridge (new `BridgeId`) with its own `dir`, `kind`, `CL`, and Loss; optionally withdraw the old one.
#### Lexical guardrails and name selection

**Umbrella tokens (red‑flag triggers):** “same”, “identical”, “equivalent”, “align”, “map”, “match”, “correspond(s)”, and close variants.

These are only in‑scope here when used as **cross‑Context predicates** (`CtxA ≠ CtxB`) or when the prose collapses **A.7 lanes** / `CHR:ReferencePlane`s under an umbrella sameness predicate. For that case:
* In **Tech register** (normative / decision‑carrying prose), authors SHALL NOT use umbrella tokens as standalone cross‑Context predicates. Use a Bridge reference and a licence‑revealing verb instead (“share a label”, “substitutes for”, “explain in terms of”).
* In **Plain didactic** or quoted legacy prose, umbrella tokens MAY appear, but only if the paragraph also includes an explicit Bridge reference (BridgeId or inline Bridge Card) so readers are not forced to infer `kind/dir/CL/Loss/scope`.

Instead, choose a phrase that reveals the intended licence:

| Intended meaning                | Use this (canonical)                                                               | Avoid                                             |
| ------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------- |
| Interpretation only             | “Explain σB in terms of σA under an *Interpretation Bridge* (kind∈{⇄ᴅʀ,→ᴍᴇᵃ,→ᴅᵉᵒ}, scope=Explanation‑only).” | “σA is the same as σB.” |
| Naming convenience              | “Share a label under a *Naming‑only* Bridge (scope=Naming‑only; kind∈{⋂,⊑,⊒} (and **≈ only when you state why substitution is still forbidden); CL≥1; Loss + counterexample).” | “σA corresponds to σB (so we can treat them as…)” |
| Safe substitution (directional) | “Licence substitution A↠B under a *Substitution Bridge* (kind∈{≈,⊑,⊒}, dir A→B, CL≥2, same senseFamily + stance; Loss + counterexample; scope=Role Assignment & Enactment‑eligible).” | “σA and σB are equivalent.” |
| Type‑structure reuse (strong)   | “Declare a *Type‑structure* Bridge (senseFamily=Type‑structure; kind=≈; dir A↔B; CL=3; invariants; scope=Type‑structure).” | “They are literally the same class everywhere.” |
| Disjoint / contrast             | “Declare kind=⊥ with scope=Explanation‑only (contrast only).”                       | “Almost the same” / “basically equivalent”        |

**Name selection rule:** if the author wants “the same name”, choose *Naming‑only* and keep the verb “share a label”; if the author wants “can be substituted”, use *Substitution* and keep the verb “substitutes for” with explicit direction.
#### RPR Disambiguation Guide (XCTX)

Use this table when you encounter umbrella‑sameness wording.

| Trigger in text                    | Candidate Bridges (default first)                                                                 | Discriminating questions / tests                                                                 | Canonical rewrite                                                                 | Routing hooks                                              |
| ---------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| “A is the same as B” (CtxA ≠ CtxB) | Explanation‑only (interpretation) → Naming‑only (⋂/⊑/⊒/≈) → Substitution (≈/⊑/⊒, CL≥2)            | Is this a licence or a teaching gloss? What direction is safe? What is lost? What is the counter‑example? | `Bridge(σA@CtxA, σB@CtxB): ⟨kind=?, dir=?, CL=?, Loss=?, scope=?⟩`                | E (witness), D (naming), A (admissibility if substitution) |
| “Align A and B”                    | Naming‑only with overlap (⋂)                                                                        | Do we only need a shared label, or do we need safe substitution/type reuse?                       | `Bridge(σA,σB): kind=⋂, dir=A↔B, CL=1, Loss + counterExample, scope=Naming‑only`   | D (labeling), E (counterexample)                           |
| “Map A to B”                       | (i) semantic Bridge (this pattern) vs (ii) operational artefact (ETL/transform/lookup)             | Is “map” about a thinking move (licence) or about code/execution? What is the substitution direction (if any) vs code direction? | `Bridge(σA,σB): dir A→B, kind chosen for that direction, Loss bullets + counterExample` | E (artefact), A (if substitution proposed)                 |
| “Same ID / same key / 1‑to‑1”      | Identification/indexing claim (A.6.6) ± semantic Bridge                                              | Is the claim about **Carrier‑lane equality** (identifier scheme), or about **sense/meaning**? What is the reference scheme? Are collisions/aliases possible? | First: repair as an identification/indexing relation (A.6.6). Then (only if needed): declare a Bridge for meaning with explicit `kind/dir/CL/Loss/scope`. | A.6.6 (Carrier), E (reference scheme), A.6.9 (meaning)     |
| “B is a view/projection of A”      | Explanation‑only or Naming‑only by default; substitution only after explicit guards/refined endpoints | Is this a view/correspondence statement (E.17), or a reuse licence? Does projection drop constraints/fields/stance? | `Bridge(σA,σB): kind=⊑ (if A is narrower), dir A→B (if substitution is intended), Loss states dropped structure/constraints, scope capped unless proven` | E.17 (views), E (artefact), A (if substitution proposed)   |
| “A matches B” / “corresponds to”   | Naming‑only overlap (⋂)                                                                             | Is it overlap (⋂) or inclusion (⊑/⊒)? What breaks under substitution?                              | `kind=⋂, scope=Naming‑only, CL=1 (or CL=2 if translatable), Loss + counterExample` | D, E                                                       |
| “Equivalent”                       | ≈ only under explicit invariants; otherwise overlap/inclusion                                       | Equivalent in what **senseFamily** and under what invariants? Any counter‑examples?               | Prefer `⋂ + Naming‑only`, or specify `≈` with invariants & CL                       | L (invariant claim), E                                     |

Updates:

* For “Align A and B”, default to `kind=⋂`, `scope=Naming‑only`, `dir=A↔B`, `CL=1`, with explicit Loss + counterexample. Use `kind=≈` only when you can state the equivalence criterion; invariants are mandatory for `CL=3` (and recommended whenever you use `≈`). Use `scope=Type‑structure` only when `kind=≈` and `CL=3` with matched invariants (INV‑XCTX‑KS‑5).
* For “Map A to B”, first decide whether “map” denotes (i) a semantic Bridge claim (this pattern) or (ii) an operational transformation artefact (ETL, id translation, schema mapping). If (ii), keep the artefact as `witnessRefs` and still declare the Bridge kind/dir/Loss separately; do not let “there exists a map” collapse into substitution.

**Default safety rule (normative):** authors SHALL NOT assign `CL≥1` (nor claim Naming‑only or substitution) unless they can state `Loss` notes and (for `CL≤2`) a `counterExample`. Otherwise, keep the statement as Explanation‑only (didactic gloss) or postpone the cross‑Context claim until evidence exists.
If the stable intent is **anti‑conflation** (“do not treat them as the same”), make that explicit as `kind=⊥` with `scope=Explanation‑only` (contrast), or—when the contrast is stable and repeatedly needed—publish a contrast row per the Concept‑Set discipline instead of relying on “not the same” prose.

When endpoint meanings are versioned, the same rule applies to `Γ_time`: if you cannot state the edition/as‑of basis, keep the claim Explanation‑only and do not justify rows or substitution.
#### Mapping artefacts are not Bridges (normative clarification)

Many projects use “map” to mean an implementation artefact: a lookup table, aligner model, transformation function, or ETL step. A.6.9 treats such artefacts as **witnesses**, not as semantics. The Bridge is where you record:

* what correspondence is claimed (`kind/dir/senseFamily`);
* how strong it is (`CL`, invariants for `CL=3`);
* what breaks (`Loss`, counterexample);
* what it licenses (`scope`).

**Direction reminder.** A transformation artefact may be written `f:A→B` while the safe semantic substitution (if any) is `B↠A` (or none at all). Treat `dir` as the direction of the licensed **reading/substitution move**, not the direction of code execution.

If the artefact changes, narrate the update as `refreshWitness` / `reviseLossNotes` / `adjustCL` (editioned), not as “re‑mapped”.
#### Coordination notes (keep A.6.9 modular)

* **Views / projections / correspondences:** if the core intent is multi‑view description (“this diagram is a view of that system”, “these views correspond”), route the modelling discipline to **E.17** and keep A.6.9 focused on preventing umbrella‑token licence smuggling. A.6.9 may still be used to declare any *naming/substitution* licence between view elements, but it MUST NOT replace E.17’s correspondence discipline.
* **Kinds / classifications:** if the cross‑context claim is about **kind transfer** (“Class X in A is the same kind as Class Y in B” as a classification move), consider recording the classification channel using **C.3.3 KindBridge**. Do not conflate Bridge‑CL with kind‑mapping CL^k.
### Archetypal Grounding

#### System archetype: identity “sameness” across products

**Tell (ambiguous):**
“An IAM *User* is the same as a CRM *Customer*.”

**Show A (Bridge Card repair):**

```
BridgeId: β-IAM→CRM-UserCustomer (edition-pinned)
Cells: “User”@IAM ↔ “Customer”@CRM
senseFamily: Role
kind: ⋂
dir: IAM↔CRM
CL: 2 (Translatable) — high overlap; service accounts and leads/prospects are counterexamples
Loss:
  - CRM “Customer” includes leads/prospects with no IAM account
  - IAM “User” includes service accounts and disabled identities not treated as customers
Counter-example: “svc-billing@” is a User@IAM but not a Customer@CRM
scope: Naming-only
Didactic hook: “Overlap only: share labels; do not substitute without guards/refinement.”
```

**Effect:** dashboards and prose may share labels (Naming‑only). Workflow substitution is *not* implied globally; it is gated by scope and guards.

**Show B (change narration, later evidence):**
After hard constraints are added (e.g., “human‑verified email”, “not a service account”), a team wants stronger reuse in the ticketing integration.

*Do not write:* “Now they are equivalent / now the mapping is fixed.”
*Write:*

0. Keep the broad Bridge **as‑is** (Naming‑only, overlap): it remains the correct “shared label” relation for the unguarded endpoints.
1. `refreshWitnesses(β-IAM→CRM-UserCustomer, witnessRefs→witnessRefs ∪ {TicketingIntegrationTestSuite_v3})`
2. `declareBridge(β-IAM→CRM-HumanVerifiedUser→VerifiedCustomer, HumanVerifiedUser@IAM, VerifiedCustomer@CRM, …slots…)` (new Bridge id or new edition family)
3. In that new Bridge: state `kind=⊑` (if inclusion is now true for the refined endpoints), `dir=IAM→CRM`, keep `CL=2`, restate Loss (remaining exclusions), and provide a crisp counter‑example for where substitution would still break.
4. `rescope(β-IAM→CRM-HumanVerifiedUser→VerifiedCustomer, Naming‑only → Role Assignment & Enactment‑eligible)` with DRR explaining why `CL=2` suffices for the refined endpoints.

Direction remains IAM→CRM; if the inverse is required, declare a separate Bridge with its own loss/counterexamples.
#### Episteme archetype: schema/ontology alignment between knowledge graphs (class-level)

**Tell (ambiguous):**
“`Person` in KG‑A is equivalent to `Person` in KG‑B.”

**Show A (Bridge Card repair):**

```
BridgeId: β-KGA↔KGB-Person (edition-pinned)
Cells: Person@KG-A ↔ Person@KG-B
senseFamily: Type-structure
kind: ⋂
dir: A↔B
CL: 2 (Translatable) — overlap is high but invariants differ
Loss:
  - KG-A “Person” includes fictional characters; KG-B excludes them
  - KG-B requires a stable external identifier; KG-A does not
Counter-example: “Sherlock Holmes” ∈ Person@KG-A but ∉ Person@KG-B
scope: Naming-only
Didactic hook: “Shared label does not grant type-structure or substitution; the sets only overlap until invariants and membership rules are aligned.”
```

**Show B (strengthening attempt and rejection):**
A reviewer proposes Type‑structure reuse (“treat them as the same class across graphs”). Under A.6.9, this triggers a required invariant check:

* Since Type‑structure reuse requires CL=3 and matched invariants, the proposal is rejected unless the invariants are aligned and the counterexample class is eliminated (e.g., by refining `Person@KG-A` into `FictionalPerson` vs `RealPerson`).
* The correct change narrative is: `changeBridgeKind` (if kind changes), `adjustCL` only if the counterexample disappears and invariants are shown, else keep CL=2 and Naming‑only scope.
### Bias‑Annotation

This pattern is biased toward:

* **Explicitness over fluency.** It intentionally slows down prose that would otherwise smuggle licences.
* **Safety in substitution.** It treats substitution as a high‑risk claim requiring declared direction, `CL`, and Loss notes.
* **Locality of meaning.** It assumes meanings are Context‑local unless bridged explicitly; it rejects label‑driven identity.
* **Ordinal confidence.** `CL` is treated as an ordinal safety ladder, not a probability; it is deliberately coarse.

Consequently, A.6.9 may feel “heavy” in early drafts, but it prevents latent cross‑Context defects that are costly to discover later.
### Conformance Checklist

A document or boundary statement conforms to A.6.9 iff:

* **CC‑A.6.9‑0 (UTS/LEX trigger coverage).** The local lexicon treats umbrella‑sameness tokens as RPR triggers and points authors to Bridge‑explicit rewrites.
* **CC‑A.6.9‑1 (No standalone umbrella predicate).** Cross‑Context umbrella tokens SHALL NOT be used as standalone cross‑Context predicates unless either:
  * (a) the paragraph includes an explicit Bridge reference (BridgeId or inline Bridge Card), or
  * (b) the statement is explicitly marked as non‑licensing explanatory prose (“no Bridge licence; do not substitute; do not justify rows”).
* **CC‑A.6.9‑2 (SenseCell endpoints).** Every such claim names endpoints as `σ@Context` (edition‑pinned where relevant), not as strings or system names.
* **CC‑A.6.9‑3 (Direction explicitness).** `dir` is stated on every Bridge. If `kind` is non‑symmetric, any inverse use without redeclaration is non‑conformant.
* **CC‑A.6.9‑4 (Licence separation).** If the intent is explanation only, authors SHALL either (a) declare `scope = Explanation‑only` on a Bridge, or (b) use explicit non‑licensing prose (no Bridge licence). If the intent is naming compatibility, authors SHALL declare a Bridge with `scope = Naming‑only`. In all cases, the text SHALL NOT invite substitution unless a substitution‑eligible Bridge exists.
* **CC‑A.6.9‑5 (Substitution thresholds).** Any statement that implies substitution MUST be backed by a substitution‑eligible Bridge (`kind∈{≈,⊑,⊒}`, `CL≥2`, same `senseFamily`, stance‑compatible), with Loss notes and a counter‑example discipline.
* **CC‑A.6.9‑6 (Weakest‑link respect).** Any Concept‑Set row or composed claim that depends on multiple Bridges MUST bound its scope and `CL` by the weakest participating Bridge.
* **CC‑A.6.9‑7 (Loss visibility).** Loss notes are present and **non‑empty**. `Loss: none` is permitted only for `CL=3` with cited invariants; `Loss: n/a` is permitted for `kind=⊥`. Loss must be consistent with the allowed scope.
* **CC‑A.6.9‑8 (Change narration).** Changes to cross‑Context fit are narrated using the change‑class lexicon (declare/withdraw/adjustCL/rescope/…) rather than umbrella verbs.
* **CC‑A.6.9‑9 (Kind/scope admissibility).** Any Bridge used to justify cross‑Context sameness satisfies the admissibility constraints INV‑XCTX‑KS‑1 … INV‑XCTX‑KS‑5 (no overlap‑to‑substitution; no disjoint/interpretation rows; substitution is directional; Type‑structure only under `≈` + `CL=3` + invariants).
* **CC‑A.6.9‑10 (Registry reference hygiene).** If a BridgeId (or policy/edition id) is cited, it is treated as a **registry reference** (existence / edition pinning), not as a semantic symbol exported by signatures.
* **CC‑A.6.9‑11 (Edition basis).** In decision/publication lanes, any Bridge used to justify Naming‑only / substitution / Type‑structure SHALL state `Γ_time` (edition pins or “as‑of” basis). If `Γ_time` cannot be stated, the claim MUST remain Explanation‑only and MUST NOT justify rows or substitution.
* **CC‑A.6.9‑12 (Facet honesty).** If the correspondence holds only on a subset of facets, the author SHALL either (a) refine endpoints into the facet SenseCells (preferred) or (b) declare `facetSpan` explicitly, with `Loss` consistent with that facet span. Whole‑cell Bridges MUST NOT be used to smuggle facet‑only correspondences.
### Common Anti‑Patterns and How to Avoid Them

| ID            | Anti‑pattern           | Example                                              | Why it breaks                                           | Remedy                                                               |
| ------------- | ---------------------- | ---------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------- |
| **AP‑XCTX‑1** | Bridge‑by‑adjective    | “A is the same as B (across contexts).”              | Smuggles scope + direction + loss as implicit defaults. | Replace with Bridge Card + explicit `scope`.                         |
| **AP‑XCTX‑3** | Stealth substitution   | “We’ll just treat A like B for now.”                 | Introduces implicit licence without CL/Loss gates.      | Publish Bridge Card; if CL<2, keep `Naming‑only`.                    |
| **AP‑XCTX‑2** | Symmetry hallucination | Treating `⊑/⊒` as symmetric “equivalence”.           | Causes unsafe inverse substitution.                     | Record `kind` and `dir`. Only symmetric kinds (`≈`, `⋂`, `⊥`, `⇄ᴅʀ`) may be written as `A↔B`; inclusion kinds require direction; substitution is always directional. |
| **AP‑XCTX‑4** | Lossless fantasy       | “Equivalent” with no loss note.                      | Loss is almost always present; hiding it misleads decisions.       | State Loss notes (even if “none”), add a counter‑example (CL≤2) or invariants (CL=3); adjust CL/scope accordingly. |
| **AP‑XCTX‑5** | Silent inversion       | Later prose uses B→A without redeclaration.          | Violates direction guard; breaks auditability.          | Declare inverse Bridge (new id) or withdraw+replace.                 |
| **AP‑XCTX‑6** | Confidence laundering  | Raising CL or scope without new invariants/evidence. | Inflates trust; expands row scopes illegitimately.      | Use `adjustCL`/`rescope` with witnessRefs + DRR.                     |
| **AP‑XCTX‑7** | Chain upgrade          | Treating A↠B and B↠C as “therefore A≈C”.             | Violates weakest‑link and loss accumulation.            | Use min‑CL and accumulated Loss; avoid chaining unless justified.    |
| **AP‑XCTX‑8** | Conditional scope smuggling | “Naming‑only generally; substitution in workflow X.” | Encodes two licences in one record; leaks into row scope and downstream reasoning. | Refine endpoints (SenseCell split) and declare a separate Bridge for the guarded subset; keep broad Bridge Naming‑only. |
| **AP‑XCTX‑9** | Artefact⇒equivalence fallacy | “There is a mapping table, so they are the same.” | Confuses operational transformation with semantic licence; hides Loss and direction. | Record artefact in `witnessRefs`, keep Bridge kind/dir/Loss explicit, and keep scope capped until CL+counterexamples justify promotion. |
| **AP‑XCTX‑10** | Two‑way substitution by symmetry | “The Bridge is A↔B, so we can substitute both ways.” | `A↔B` expresses correspondence symmetry, not two substitution licences; substitution is directional and must be stated (F.9:13.2). | Declare both substitution directions explicitly (two licences / two Bridges / two editions), each with Loss + counter‑examples. |
| **AP‑XCTX‑11** | Kind/dir mismatch | `kind=⊒` but `dir=A→B` is used as if it licensed substitution. | Inverts narrower/broader; encourages unsafe “narrowing substitution” and silent information loss. | Swap endpoints (so the intended safe direction is written as `A→B` with `kind=⊑`), or declare an explicit inverse Bridge; keep scope ≤ Naming‑only until the direction is justified. |
| **AP‑XCTX‑12** | Kernel promotion by Bridge | “Since A≈B, we can mint a unified global type and treat both as instances.” | Bridges translate local senses; they do not mint global meaning or new `U.Type`s. | If you need a new shared type/kind, follow A.11; keep Bridges as translators between Context-local senses. |
| **AP‑XCTX‑13** | Edition drift / timeless equivalence | “A is equivalent to B” with no edition/as‑of basis. | Makes the claim temporally incoherent as canons evolve; readers silently compare different revisions. | Pin editions via `Γ_time`; publish Bridge edits as new editions; fail‑closed to Explanation‑only when `Γ_time` cannot be stated. |
| **AP‑XCTX‑14** | Facet‑only alignment masquerading as whole‑cell sameness | “Customer corresponds to User” (but only `email` or an external ID aligns). | Collapses a partial lens into global sameness; invites unsafe substitution and row scope creep. | Refine endpoints to the facet SenseCells, or declare `facetSpan` explicitly and keep `scope` capped (usually Naming‑only). |
| **AP‑XCTX‑15** | Lexical translation ⇒ semantic identity | “Term A is the same as term B” (just a translation / synonym). | Confuses labels with referents; erases loss and context. | Use `scope=Naming‑only` with explicit `Loss` (incl. language/canon notes) and a counter‑example; do not imply substitution. |
### Consequences

* **Pros**

  * Removes ambiguity between explanation, naming compatibility, and substitution.
  * Makes directionality explicit; prevents accidental inverse reasoning.
  * Forces Loss disclosure early; reduces later integration surprises.
  * Provides a disciplined evolution path (change classes) when evidence changes.

* **Cons**

  * Adds visible structure to prose; authors must choose `kind/dir/CL/scope` explicitly.
  * Requires reviewers to engage with counter‑examples and loss notes.
  * Can surface uncomfortable truth: many “same” claims are only Naming‑only.

**Adoption test (PRAG).** Take any cross‑Context sentence that uses an umbrella predicate (“same/equivalent/align/map/…”). If the team cannot (a) name the two SenseCell endpoints, (b) state `dir`, (c) write at least one Loss bullet, and (d) give a crisp counter‑example (for CL≤2), then the claim is not ready to be treated as Naming‑only or substitution‑eligible. Keep it as Explanation‑only (or explicit non‑licensing prose) until evidence exists.

If the endpoints’ canons are versioned and the team cannot state `Γ_time` (edition/as‑of basis), treat that as the same kind of “evidence missing”: keep the claim Explanation‑only.
### Rationale

Cross‑Context “sameness” is a *family of relations*, not a single predicate. Making the Bridge explicit:

* preserves the locality of meaning (SenseCells are context‑bound);
* prevents licence creep (Naming‑only does not silently become substitution);
* supports auditability (BridgeId + slots, not adjectives);
* aligns prose with the formal reasoning primitives that govern safe substitution and row scopes.

A.6.9 turns a dangerous linguistic convenience into an explicit, reviewable, evolvable claim.
### SoTA‑Echoing

(informative; post‑2015 alignment)

| SoTA practice                                                            | Primary source (post‑2015)                                              | What A.6.9 echoes                                                   | What A.6.9 adds                                                                                               | Stance                   |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------ |
| Correspondences between viewpoints in architecture descriptions          | ISO/IEC/IEEE 42010:2022                                                 | Correspondences are not identity; they have intent and constraints. | Forces direction/degree/loss to be explicit via Bridge Card slots.                                            | **Adopt + specialise**   |
| Declarative constraint systems and validation shapes                     | W3C SHACL (Recommendation, 2017)                                        | Make implicit semantics checkable by explicit structure.            | Uses Bridge Cards as “shape of correspondence”: explicit slots + counterexample discipline.                   | **Adapt**                |
| Entity alignment as scored correspondences with errors (embedding‑based) | BootEA (Sun et al., 2018) and related post‑2015 KG alignment literature | Alignment is graded, not binary; error analysis matters.            | Replaces raw scores with a coarse, auditable ordinal (`CL`) + explicit Loss notes and scope licences.         | **Adapt**                |
| Entity alignment using textual encoders (transformer‑based)              | BERT‑INT (Tang et al., IJCAI 2020); Ditto (Li et al., PVLDB 2021)        | Modern matchers output scored/conditional correspondences.          | Turns “score” into an auditable licence (`CL/scope`) plus explicit error modes (`Loss` + counterexamples).    | **Adopt (conceptually)** |
| Deep learning for schema matching as a family of match types             | SMAT (Zhang et al., 2021) and post‑2020 neural/LLM schema matching lines | “Matches” are heterogeneous and directional in practice.            | Makes match type explicit as Bridge kind + direction + licence scope (separating semantics from artefacts).   | **Adapt**                |
| Human‑in‑the‑loop entity matching (thresholding + error analysis)        | “Deep Learning for Entity Matching: A Design Space Exploration” (Mudgal et al., SIGMOD 2018) and follow‑on work | Scores are not licences; practice needs thresholds, abstention, and curated error cases. | Mirrors the “explain vs name vs substitute” split: scores stay in `witnessRefs`; promotion requires Loss + counter‑examples and an explicit scope upgrade. | **Adapt** |
### Relations

* **Specialises:** A.6.P (Relational Prose Repair) by fixing the contract skeleton for cross‑Context sameness claims.
* **Uses:** F.9 Bridge discipline (Bridge Card, `BridgeKind`, `dir`, `CL`, Loss notes, scope licences, weakest‑link).
* **Coordinates with:** E.10 lexical discipline (umbrella tokens) and F.5 label discipline (Tech/Plain labels do not imply bridges).
* **Constrains:** Any cross‑Context Concept‑Set row scope claims via weakest‑link and substitution thresholds.
### A.6.9:End
## U.SignatureEngineeringPair - Signature engineering via a ConstructorSignature and a TargetSignature

> **Type:** Architectural (A)
> **Status:** Stable
> **Normativity:** Mixed (normative where RFC 2119 keywords appear; quadrant routing is governed by A.6.B)
> **One-liner:** **explicitly modelling signature engineering as a two‑signature arrangement** (TargetSignature + ConstructorSignature), with strict separation between **operator description** and **enactment as Work by transformer Systems**.

### PCP-TERM/LEX token guards (local-first)

This pattern reserves the following tokens on Tech (normative) surfaces:

* **TargetSignature** — the engineered signature episteme (and its editions) under construction/stabilisation (**not** the described entity, and **not** a Bridge “target Context”).
* **ConstructorSignature** — the enabling signature that describes constructor operations for TargetSignature evolution (do **not** mint a second Tech token such as `EnablingSignature`).

Rename-guards (common collisions):

* **enabling** — Plain adjective meaning “producing/maintaining the TargetSignature”; it is not a `U.*` token.
* **constructor** — MUST be disambiguated as one of: `ConstructorSignature` (episteme), `constructor op` (EFEM), or `constructor System`/`enactor` (transformer). If the physics term is intended, spell **“Constructor Theory”** explicitly.
* **target** — avoid bare “target” in Tech clauses; use `TargetSignature` or qualify the target (e.g., “Bridge target Context”, “target holon”).
* **contract** — Plain shorthand for “published boundary interface description”; it MUST NOT be read as a promise/obligation. Promises, duties, and gates route via A.6.B.
### Problem frame

Boundary descriptions rarely arrive as fully formed signatures. They show up as “half‑signatures”: an n‑ary relation in natural language, a few overloaded markers (“binding”, “anchoring”, “contract”), and implicit assumptions about bases, scope, and viewpoints. Teams then evolve the boundary through incremental edits, reviews, and partial publications.

FPF already provides local disciplines that help unpack such text into well‑formed components: slot discipline (A.6.5) and explicit base declarations (A.6.6). What is usually missing is a *first‑class* description of the engineering interface that turns half‑signatures into stable, publishable boundary interface descriptions (“contracts” in Plain shorthand; see §0 guards)—an explicit ConstructorSignature for constructing and evolving a TargetSignature.

When signature construction is not explicitly modeled, three failures recur:

1. the target boundary contract and the engineering workflow get conflated;
2. semantic changes happen without being made explicit as retargeting or edition changes;
3. published faces (views) drift into adding semantics, making “the contract” ambiguous.

Additionally, authors often (implicitly) treat a signature as if it *acts* (“the constructor builds the signature”).
In FPF this is a category error: an Episteme describes; any change is enacted by a System in a transformer role.
A.6.S therefore must keep **operator descriptions** separate from their **enactment as work**.
### Problem

FPF needs a pattern for **engineering signatures as boundary artifacts**: a disciplined way to construct, revise, and publish a target `U.Signature` from partial input, while maintaining:

* separation between *signature* and *mechanism* (A.6.0 vs A.6.1),
* separation between *laws*, *admissibility*, *deontics*, and *work evidence* (A.6.B),
* explicit multi‑view publication without semantic drift (E.17),
* reproducible evolution across editions without silent mutation.
### Forces

* **Stability vs evolution.** Boundary contracts must be stable enough to coordinate, yet change as understanding improves.
* **Explicitness vs overhead.** Unpacking slots/bases/views increases clarity but also increases authoring effort.
* **Effect‑free operators vs enacted work.** The construction/change language should be expressible as effect‑free epistemic morphisms (no measurement/actuation),
  yet the act of applying them to artifacts is still Work done by transformer Systems and must be auditable.
* **Multi‑view richness vs semantic coherence.** Views help stakeholders, but they risk becoming divergent “versions of truth”.
* **Local meaning vs cross‑context reuse.** Signatures should keep meaning local to a context; reuse across contexts requires explicit bridges and declared loss/penalty policy.
* **Contract talk vs ontology.** “Contract” language invites mixing promises, norms, and invariants; FPF requires quadrant discipline.
* **No epistemic agency.** It is tempting to phrase “the ConstructorSignature constructs…”. In FPF, only Systems act; epistemes do not.
### Solution — two signatures and a small constructor vocabulary

#### Ontology and effect profile — constructor operators are epistemes; enactment is Work by transformer Systems

This pattern relies on **Strict Distinction** (A.7) and the **transformer quartet** (A.3):

* **ConstructorSignature (operator description; intensional, D/S-plane).**
  The ConstructorSignature is an **Episteme** (typically a Description/Spec) that *describes* a small family of constructor operations for signature evolution.
  The ConstructorSignature SHALL specify each constructor operation family as an instance/species of `U.EffectFreeEpistemicMorphing` (EFEM; A.6.2) or a declared sub‑species (e.g., A.6.3/A.6.4): **episteme→episteme** morphisms over the `C.2.1 U.EpistemeSlotGraph` positions (`ClaimGraphSlot`, `DescribedEntitySlot`, `GroundingHolonSlot`, `ViewpointSlot`, `ViewSlot`, `ReferenceSchemeSlot`) plus attached meta/edition fields.
  As EFEM, constructor ops are **effect‑free** in the strict A.6.2 sense: **no Work, no Mechanism application, and no mutation of systems or carriers**.
  Concretely: an EFEM step *derives* a successor episteme (often a new edition) and its structured delta; the physical act of materialising that successor on carriers (files, repos, registries, releases, SCR/RSCR pins) is **Work** enacted by a transformer System.

  Slot discipline alignment requirement (A.6.5 / C.2.1:7.1): a conforming ConstructorSignature SHALL state (for each constructor operator family) which `C.2.1` slots it may read and which it may write, expressed in SlotKind/ValueKind/RefKind terms, and SHALL declare whether the operator family is a species of A.6.2 / A.6.3 / A.6.4.

* **Enactor (capability) vs enactment (world-contact).**
  A **System** in a transformer role bears a **Method** that realises the constructor operations (A.3), and it enacts particular steps as **Work / WorkEnactment** on carriers (repos, releases, pins, SCR/RSCR references).
  This is where traces, review records, evidence bindings, and publication artifacts appear.

Therefore:

* A ConstructorSignature **describes** how a TargetSignature may be constructed/evolved; it MUST NOT be written as if it *performs* the construction.
* Any step that performs measurements, actuation, validation runs, or other side‑effects is **not** an EFEM; model it as Work/Mechanism and route resulting claims via A.6.B.
#### Core move: model signature engineering as a separate boundary

In a conforming design, model **two signatures**:

1. **TargetSignature.**
   The *target* boundary contract you want to stabilize. It is a `U.Signature` per A.6.0: `SubjectBlock`, `Vocabulary`, `Laws`, `Applicability`. It does **not** contain admissibility gates, deontic obligations, or evidence claims (those are routed per A.6.B).

2. **ConstructorSignature.**
   A *separate* `U.Signature` whose purpose is to describe the **engineering operations** used to construct and evolve the SoI. Intuitively: it is the “interface” of the enabling activity that produces the target interface.

A.6.S names this pairing discipline **U.SignatureEngineeringPair**: a signature engineering arrangement where a ConstructorSignature is explicitly defined for (at least) one Signature‑of‑Interest.
A.6.S names this pairing discipline **U.SignatureEngineeringPair**: a signature engineering arrangement where a ConstructorSignature is explicitly defined for (at least) one TargetSignature.

Minimal definition (informative): a `U.SignatureEngineeringPair` binds exactly two signature artifacts in the same Context: a **TargetSignature** (the contract under stabilization) and a **ConstructorSignature** (the enabling signature describing the constructor operations used to build/evolve the TargetSignature).

**Terminology note (C.2.1 alignment + twin discipline).**
This pattern uses `TargetSignature` as the **Tech role label** for “the signature artifact under construction / stabilisation”.
If a Context wants an explanatory alias, it MAY use **“signature of interest (SoI)”** as a **Plain twin** for `TargetSignature`, but Plain twins are didactic only and MUST NOT appear in conformance/acceptance clauses.

Do not conflate:
* the **TargetSignature** (an episteme artifact that is engineered and published), with
* the TargetSignature’s **`DescribedEntitySlot`** (C.2.1), which refers to the boundary/entity the signature is *about* (a.k.a. “object‑of‑talk / entity‑of‑interest / describedEntity” in C.2.1 commentary).

In C.2.1 terms:
* the TargetSignature is the **episteme** (and its editions) that we engineer and publish;
* the TargetSignature’s `DescribedEntitySlot` refers to the **entity‑of‑interest / object‑of‑talk** (the boundary in the world or model);
* the TargetSignature’s `GroundingHolonSlot` anchors where/how that boundary description is grounded.

If the “SoI” phrasing risks confusion with C.2.1 “entity‑of‑interest” talk, keep it out of Tech/normative prose and use **TargetSignature** vs **ConstructorSignature** consistently.

**Mint-or-Reuse note (informative).**
This pattern introduces the following **Tech role labels** in the A.6 cluster:
* **TargetSignature** — the target boundary contract episteme being stabilised;
* **ConstructorSignature** — the enabling signature (episteme) describing constructor operations for TargetSignature evolution;
* **U.SignatureEngineeringPair** — the two‑signature arrangement (TargetSignature + ConstructorSignature).

If any Plain twins are used (e.g., “signature of interest”), they MUST follow the E.10/F.* twin discipline (1:1 mapping per Context, registry entry, and no use on normative surfaces).

The intended shape is:

* TargetSignature is the boundary contract used by downstream design and realization work.
* ConstructorSignature is the boundary contract used by authors/reviewers to produce and revise the SoI in a disciplined, reproducible way.

This directly operationalises the idea already hinted in the A.6 cluster relations: A.6.5 and A.6.6 can be read as constructor/enabling operations for building well‑formed signatures. The new step is to **bundle those operations into an explicit ConstructorSignature** rather than leaving them as implicit editorial practice.
#### Minimal constructor operation vocabulary

A conforming ConstructorSignature **SHALL** (conceptually) expose a *small, composable* set of operations. At minimum, include two groups of constructor operations, drawn from existing A.6 subpatterns:

**(A) Slot‑level constructor operations** (from A.6.5)

Use the canonical slot verbs to express “what changed” without ambiguity:

* `bind` / `rebind` (Identifier → SlotKind/slot‑instance; name binding only)
* `fill`
* `initialize` (first fill)
* `assign` / `set` / `write` / `update` (subsequent fill; by‑value replacement)
* `retarget` (Ref slot update; same SlotKind/ValueKind)
* `substitute` (typed replacement with explicit compatibility claim)
* `resolve` / `dereference` (Ref → referent)
* `pass` (parameter filling at call boundaries)

**Avoid “mutate” as a generic edit verb.**
In Core, `mutate/modify` denotes **referent‑internal change while the slot‑content (Ref handle) stays the same**.
In edition‑disciplined contexts, prefer “revise / re‑edition + retarget” rather than “mutate”.

Guidance for naming (by slot qualifier) is inherited from A.6.5: e.g., `Edit<SlotQualifier>` for by‑value changes, `Retarget<SlotQualifier>` for ref changes, and avoid collapsing retargeting into generic “editing”.

**(B) Base‑level constructor operations** (from A.6.6)

Make base declarations and their evolution explicit via base‑change verbs such as:

* `declareBase`
* `withdrawBaseDecl`
* `rebase`
* `repointDependent`
* `rescope`
* `retime`
* `refreshWitnesses`
* `changeBaseRelation`

A ConstructorSignature does not need *all* of these in every use, but it must provide enough to express “what changed” when the SoI’s grounding base, scope, or anchoring assumptions shift.

**Witness refresh note.**
`refreshWitnesses` is an **edit of witness bindings**, not the generation of new evidence: producing/collecting new witness carriers is **Work**; `refreshWitnesses` only updates the base declaration to reference them.

**Optional but common: view construction operations (A.6.3)**

If the TargetSignature is published via MVPK (recommended), include constructor operations that produce views as **EpistemicViewing** (A.6.3) of the TargetSignature:

* “Emit MVPK faces” as views (PlainView, TechCard, InteropCard, AssuranceLane), explicitly treated as views and governed by E.17 “no new semantics”.
  In particular:
  * `PlainView` / `TechCard` / `InteropCard` MUST add no new claims beyond the underlying TargetSignature/Mechanism claim set.
  * `AssuranceLane` MAY include procedural adjudication guidance and carrier pointers, but any normative pass/fail criteria MUST live canonically in `E-*` claims and be cited by ID.

These are best modeled as view‑producing operations whose output is an MVPK face, with the explicit constraint that the face is a view and therefore does not introduce new claims about the described entity.
Publishing those faces (commits, releases, registry writes) is Work on carriers; it is not “the signature doing things”.
#### Change discipline: Viewing vs Retargeting vs editing

To connect signature engineering to A.6.2–A.6.6, treat changes in four buckets:

1. **Viewing (A.6.3).**
   Use when you change *presentation* (views, stakeholder cards, projections) while preserving the described entity.

2. **Slot/base construction edits (A.6.5 / A.6.6).**
   Use when you unpack and make explicit what was implicit (slot kinds, ref modes, base declarations), or when you adjust the SoI’s internal structure without changing what it is “about”.

3. **Editioning + reference retargeting (A.6.5).**
   Use when the contract meaningfully changes and you need a **new SoI edition** for downstream coordination. In that case, do not silently mutate the existing edition: mint a successor edition and **retarget references** (`Retarget<…>` in the relevant Ref slots) to the new edition.

4. **Epistemic retargeting / Structural reinterpretation (A.6.4; rarer).**
   Use only when `DescribedEntityRef` itself changes under an explicit `KindBridge` and stated invariants (e.g., reinterpretation across kinds/planes). This is distinct from ordinary “new version of the same contract”.

Rule of thumb:

* If the change can be defended as “same contract, clearer surface”, prefer slot/base construction plus viewing.
* If the change is “new contract version for consumers”, require a new edition plus explicit reference retargeting.
* If the change is “different described entity / different kind”, use A.6.4 retargeting under `KindBridge` with explicit invariants.

**EFEM discipline.**
Every constructor operation family declared as an EFEM MUST declare `describedEntityChangeMode ∈ {preserve, retarget}` (A.6.2).
**Editioning is orthogonal**: you MAY mint a new edition even under `preserve`, but if you do, downstream references MUST be updated explicitly via slot discipline (A.6.5).
Any operation that performs measurements/actuation/side‑effects MUST be modeled as Work/Mechanism, not as a constructor op.
#### Publication and claim discipline for reproducibility

A conforming signature engineering arrangement **SHOULD** include two publication‑adjacent constraints:

1. **MVPK publication for the TargetSignature (E.17).**
   Publish the TargetSignature through MVPK faces as `U.View` projections with viewpoint accountability (`viewRef` + `viewpointRef`). Each face must be explicitly treated as a view and must not introduce new semantic commitments beyond the underlying signature/mechanism claim set (per E.17 “no new semantics”).

2. **Claim Register for boundary discipline (A.6.B).**
   Maintain a claim register that assigns stable identifiers to atomic claims and routes them into the correct quadrant (L/A/D/E). The engineering benefit is that changes to the SoI can be tracked as changes to specific claims rather than as unstructured prose diffs.

This keeps signature engineering aligned with A.6.B’s separation:

* **Laws** live in the SoI (L‑claims).
* **Admissibility** and operational gate conditions live in mechanisms (A‑claims).
* **Deontics** are about agents (D‑claims), not about epistemes.
* **Evidence/work effects** are recorded as outcomes of work (E‑claims), not smuggled into signatures.
#### Construction flow as a transduction graph fragment (informative)

If a team already models workflows as E.TGA transduction graphs, the “constructor graph” of A.6.S is a special case:

* EFEM constructor steps can be represented as `U.Transduction(kind=Signature)` vertices (A.6.0), because they are intensional episteme→episteme morphisms (A.6.2).
* Concrete carrier writes (commits, releases, registry writes, SCR/RSCR pinning) are `U.Transduction(kind=Work)` / `U.WorkEnactment` vertices (world‑contact).
* Validations/admission checks live at `U.Transduction(kind=Check)` nodes realised as `OperationalGate(profile)` with a `DecisionLog`.
* Any `DescribedEntityRef`/kind change is a `StructuralReinterpretation` vertex (E.TGA’s use of A.6.4), with explicit `KindBridge` + invariants/witnesses.

This mapping is optional; A.6.S stays usable as a lightweight discipline even without adopting E.TGA structure.
#### State during construction (informative)

Do not mint a new kernel “signature state” unless you need it.
In most cases, use:

* **edition** + explicit continuity/withdrawal links for semantic evolution, and
* a coarse **status** (`Draft`/`Review`/`Stable`/`Deprecated`) for process signalling.

If a Context needs a finer lifecycle (e.g., “proposed → reviewed → published → frozen”), model it as Work policy in the ConstructorSignature’s Applicability or as a Context‑local workflow episteme; keep the TargetSignature semantics unchanged.
Where lifecycle is normative, prefer expressing it as a **role-state graph** (A.2.1) borne by the relevant episteme role, rather than minting a new core “signature state”.
### Archetypal Grounding — Tell–Show–Show

**Tell.** A boundary contract becomes stable and evolvable when you model both the *target signature* and the *engineering signature* that constructs it, and you force every change to be expressed as either (a) a view, (b) a disciplined slot/base construction step, or (c) an explicit retargeting to a new edition.

#### Show — System archetype

**Context.** A payments microservice exposes an external boundary used by multiple client systems.

**Half‑signature input (what arrives).**
“Service binds a `User` to a `PaymentMethod`, anchors charges to the `Ledger`, and guarantees idempotency.”

**Constructed artifacts.**

* **TargetSignature:** `PaymentBoundarySignature`

  * **Vocabulary:** operations like `Authorize`, `Charge`, `Refund`; slots made explicit (e.g., `UserRefSlot`, `PaymentMethodRefSlot`, `LedgerEntryRefSlot`).
  * **Laws (examples):** “Charge is idempotent under IdempotencyKey”; “Refund does not increase net balance”.
  * **Applicability:** bounded context = “Payments”, scope = “External API”.

* **ConstructorSignature:** `PaymentSignatureEngineering`

  * Transformer system (enactor): `PaymentSignatureEngineeringPipeline` (team + repo + linters + review protocol).
    It enacts the constructor operations as Work and produces new editions and publication carriers.

  * Slot operations used (as operator descriptions; enacted via Work):

    * `bind/rebind` to bind API field names (e.g., `userId`, `paymentMethodId`) to SlotKinds (`UserRefSlot`, `PaymentMethodRefSlot`) where a language surface exists,
    * `initialize` / `edit<…>` to introduce SlotSpecs and to by‑value edit Vocabulary/Laws in the TargetSignature,
    * `resolve<…>` to disambiguate overloaded prose markers (e.g., “idempotency”) into explicit SlotKinds + laws,
    * `retarget<LedgerRefSlot>` when switching the referenced ledger holon/edition (ref change, not by‑value editing).
  * Base operations used:

    * `declareBase` to ground “Ledger” via an explicit baseRelation and scope,
    * `rescope` when moving from “internal ledger view” to “external client view”,
    * `refreshWitnesses` when decision‑relevant evidence/pins must be updated for continued use.

* **Publication.**
  MVPK faces published as views of the TargetSignature: a PlainView for non‑specialists, a TechCard for implementers, and an InteropCard for integrators, all derived without adding new claims beyond the canonical claim set.

**What A.6.S prevents here.** The phrase “guarantees idempotency” does not silently become a deontic promise or an operational gate. It becomes: (a) an L‑claim (law) in the SoI; (b) if needed, a mechanism‑level admissibility condition for when the guarantee holds; and (c) evidence claims in work logs when validated.
#### Show — Episteme archetype

**Context.** A research group publishes a “signature” for a boundary concept used across multiple theories (a common “interface” between models).

**Half‑signature input.**
“We define correspondence between model A and model B; parameters are anchored to a reference dataset.”

**Constructed artifacts.**

* **TargetSignature:** `ModelCorrespondenceSignature`

  * **Vocabulary:** relation `Corresponds(A_model, B_model, Φ_bridge)` with explicit slot kinds and ref/value modes.
  * **Laws:** invariants about correspondence preservation (“observable X is preserved up to tolerance ε”).
  * **Applicability:** bounded context = “Model alignment”.

* **ConstructorSignature:** `CorrespondenceSignatureEngineering`

  * Transformer system (enactor): `CorrespondenceSignatureWorkbench` (authors + toolchain) enacts constructor ops as Work.

  * Slot operations used: `resolve` to unpack “correspondence” into an explicit bridge slot; `edit<Laws>` (by‑value) to make tolerance explicit; `retarget<ModelRefSlot>` when moving from a draft model edition to a published edition.
* Base operations used: `declareBase` to ground “reference dataset” as an explicit base with scope/time policy; `retime` when updating the reference window.

* **Publication.**
  The SoI is published in multiple viewpoints (e.g., a mathematical view and an engineering view). Differences are handled as views, not as semantic drift.

**What A.6.S prevents here.** “Anchored to a dataset” does not remain a vague metaphor. It becomes a declared base and, when the dataset changes, an explicit base‑change operation rather than a silent reinterpretation.
### Bias-Annotation

Lenses tested: **Gov**, **Arch**, **Onto/Epist**, **Prag**, **Did**. Scope: **Universal** for signature engineering within the A.6 cluster.

* **Architecture bias (Arch):** pushing a two‑signature structure can feel heavy for small boundaries.
  *Mitigation:* keep the ConstructorSignature minimal; reuse A.6.5/A.6.6 verb sets; treat views as optional unless publication demands them.

* **Onto/Epist bias (Onto/Epist):** treating “editing the signature” as harmless can hide semantic change.
  *Mitigation:* use the Viewing vs Retargeting rule; material meaning changes become explicit retargetings.

* **Pragmatic bias (Prag):** increasing discipline may slow down exploratory work.
  *Mitigation:* allow lightweight ConstructorSignatures early, and tighten conformance as assurance requirements rise.
### Conformance Checklist

|             ID | Requirement                                                                                                                                                                                                                                                               | Purpose                                                               |
| -------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **CC‑A.6.S‑1** | A conforming boundary description **SHALL** identify a **TargetSignature** and (when the boundary is being actively constructed or evolved) a **ConstructorSignature** that describes how the TargetSignature is produced and revised.                                     | Prevents conflating the target contract with the engineering process. |
| **CC‑A.6.S‑2** | The ConstructorSignature **SHALL** use (or explicitly map to) the canonical **slot operation verbs** from A.6.5 and the **base‑change lexicon** from A.6.6 (`declareBase`, `rebase`, `rescope`, `retime`, …). It **MUST NOT** use umbrella metaphors (e.g., `anchor*`) or “bind/binding” as substitutes for explicit baseRelation/base‑change talk, and it **MUST NOT** collapse distinct meanings (e.g., using “edit” for both by‑value updates and ref retargeting). Context‑specific shorthands MAY exist, but they MUST have an explicit mapping entry to the canonical verb classes and be registered per LEX discipline. | Keeps change semantics explicit and reviewable.                       |
| **CC‑A.6.S‑3** | Any TargetSignature change that alters contract meaning **SHALL** mint a **new TargetSignature edition** and downstream references **SHALL** be updated via explicit **ref retargeting** (A.6.5), not by silent in‑place mutation. Use A.6.4 retargeting only when `DescribedEntityRef` changes under a `KindBridge`. | Makes semantic evolution explicit without confusing editioning with described‑entity retargeting. |
| **CC‑A.6.S‑4** | If MVPK is used, each published face (`U.View`) **SHALL** be constructed as a **view** of the canonical routed claim set and **MUST NOT** introduce new semantic commitments. `AssuranceLane` MAY add procedural adjudication guidance and evidence pointers, but any normative criteria MUST live in canonical `E-*` claims and be cited by ID. | Prevents “multiple contracts” emerging from views.                    |
| **CC‑A.6.S‑5** | Claims about laws, admissibility, deontics, and work evidence **SHALL** be routed using A.6.B’s quadrant discipline and (where used) recorded with stable claim IDs in a claim register.                                                                                  | Prevents quadrant mixing and “contract soup”.                         |
| **CC‑A.6.S‑6** | The TargetSignature **SHALL NOT** contain operational gate predicates or deontic obligations; such constraints belong to mechanisms and agent norms respectively (A.6.1, A.6.B).                                                                                         | Preserves the signature/mechanism boundary.                           |
| **CC‑A.6.S‑7** | Constructor operations described by the ConstructorSignature **SHALL** be expressible as **effect‑free epistemic morphisms** (A.6.2). For each EFEM constructor operation family, the ConstructorSignature **MUST** declare `describedEntityChangeMode` and the `C.2.1` slot read/write profile. Any step that performs measurements, actuation, validation runs, or other side‑effects **MUST** be modeled as Work/Mechanism and cannot be a constructor op. | Prevents smuggling mechanisms/work into “signature editing”.          |
| **CC‑A.6.S‑8** | Any concrete change to a TargetSignature edition or its MVPK faces **SHALL** be represented as Work enacted by a transformer System (A.3/A.12); normative text **MUST NOT** ascribe agency to epistemes (“the signature constructs/validates itself”).              | Aligns with “no epistemic agency” and the external transformer principle. |
### Common Anti‑Patterns and How to Avoid Them — Failure Modes

| Anti-pattern                                    | Symptom                                                                                                   | Why it fails                                                                | How to avoid / repair                                                                       |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **One artifact tries to be contract + process** | The same doc mixes “what the interface is” with “how we built it”, reviewer notes, and operational gates. | Collapses SoI and ConstructorSignature; quadrant mixing becomes inevitable. | Split into SoI + ConstructorSignature; route gates to mechanisms; route duties to deontics. |
| **Silent semantic edits**                       | A law or applicability quietly changes; consumers discover it through breakage.                           | Treats a new contract as the same contract.                                 | Require retargeting to a new SoI edition for semantic changes.                              |
| **Retargeting disguised as “editing”**          | Ref changes and by‑value edits are described with the same verb.                                          | Loses the slot discipline stratification and review clarity.                | Use A.6.5 canonical verbs and `Edit<SlotQualifier>` vs `Retarget<SlotQualifier>`.           |
| **Views become “alternative truths”**           | PlainView says one thing, TechCard says another, and nobody knows which is canonical.                     | A view gained semantics rather than projecting them.                        | Treat MVPK faces as viewings; put canonical semantics in the SoI and reference it.          |
| **Contract talk without quadrant discipline**   | “The interface promises…” is used to state invariants, obligations, and entry conditions interchangeably. | Blends laws, deontics, admissibility, and evidence.                         | Use A.6.B tags and claim register entries; rewrite claims into the proper quadrant.         |
| **Episteme‑as‑actor**                           | Text says “the ConstructorSignature builds/validates/publishes the SoI”.                                 | Violates “no epistemic agency”; hides the transformer System and the Work.  | Rewrite: constructor ops are described by epistemes; enactment is Work by a transformer System; publish traces/pins explicitly. |
### Consequences

| Benefits                                                                                                                                | Trade-offs / Mitigations                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Reproducible signature evolution.** Changes are expressed as explicit constructor operations and, when needed, explicit retargeting.  | **More artifacts.** You now maintain two signatures. *Mitigation:* keep ConstructorSignature minimal; treat it as a thin “change vocabulary” early.  |
| **Boundary discipline becomes teachable.** Reviewers can ask “which constructor op happened here?” instead of arguing over prose diffs. | **Upfront cost.** Slot/base unpacking requires attention. *Mitigation:* reuse A.6.5/A.6.6 templates and canonical verbs.                             |
| **Cleaner separation of concerns.** Signatures stay free of gates and obligations; mechanisms and norms stay explicit.                  | **Temptation to over‑formalize.** Some contexts do not need deep formality. *Mitigation:* apply assurance‑appropriate depth; keep views lightweight. |
| **Multi‑view publication stays coherent.** Views are projections, not semantic forks.                                                   | **Discipline enforcement needed.** Without review habits, teams regress. *Mitigation:* make CC items part of boundary review checklists.             |

**Adoption test (informative).** A Context is “A.6.S‑ready” when, for every TargetSignature change, reviewers can point to (i) the constructor verb(s) used (A.6.5/A.6.6), (ii) the EFEM metadata (`describedEntityChangeMode`, slot read/write profile), and (iii) the Work artefacts that enacted publication (A.3/A.12).
### Rationale

The two‑signature move mirrors a recurring engineering insight: stable interfaces often require an explicit description of the *enabling* interface that produces and maintains them. Without this, “engineering the contract” happens implicitly, and the project loses semantic accountability.

A.6.S treats A.6.5 and A.6.6 as *constructor primitives* and makes them explicit in a ConstructorSignature. This yields a compositional change language: reviewers reason about a boundary’s evolution as sequences of named operations, instead of reverse‑engineering intent from prose.

Connecting signature engineering to A.6.2–A.6.4 provides a principled way to separate:

* **Viewing**: change the view, keep the described entity.
* **Construction edits**: unpack structure without silently changing meaning.
* **Retargeting**: acknowledge a new contract and make the transition explicit.

Finally, routing claims through A.6.B makes “contract” talk ontologically safe: laws, gates, norms, and evidence stop competing for the same paragraph.

**SoTA binding note (informative).** The separation between an operation surface and its effectful realization is adopted from modern algebraic effects/handlers; the view/viewpoint responsibility discipline is adapted from ISO/IEC/IEEE 42010; and the “preservation under change” intuition is adapted from categorical optics (see A.6.S:11).
### SoTA-Echoing

* **Adopt: algebraic effects and effect systems separate operation signatures from handler semantics.**
  Contemporary effect systems emphasise that an operation surface can be described independently of how effects are handled. A.6.S adopts the same separation at the signature‑engineering level: the SoI remains the conceptual boundary surface, while construction work and operational enforcement are handled elsewhere (mechanisms, realizations, work evidence). This echoes row‑typed algebraic effects and modern handler formulations (Leijen 2017; Hillerström & Lindley 2018).

* **Adapt: categorical optics treat “focus” and “round‑trip laws” as a disciplined interface for bidirectional structure.**
  Optics offer a compact mathematical language for “what is preserved” under a transformation and when updates are coherent. A.6.S adapts this mindset to boundary evolution: viewing corresponds to projection, and retargeting corresponds to an explicit transition with stated preservation claims. Profunctor optics provide a post‑2015 reference point for this style of interface reasoning (Pickering, Gibbons & Wu 2017).

* **Adapt: architecture description standards formalise viewpoint/view responsibility and reduce semantic drift across representations.**
  ISO/IEC/IEEE 42010 treats views as products of viewpoints, with explicit stakeholder concerns and responsibility. A.6.S adapts that discipline to signature publication: MVPK faces are explicit views derived from the SoI, and the ConstructorSignature makes “how we got this view” part of the engineering surface (ISO/IEC/IEEE 42010:2022).

* **Adopt in spirit: behavioural protocol disciplines treat boundaries as safe interaction contracts.**
  Session and behavioural type practice treats boundaries as protocols with progress and safety properties, which matches the A.6 split between signature laws and mechanism entry gates. A.6.S does not import tooling or typechecking, but it adopts the practice of making boundary interactions explicit and law‑governed (e.g., modern MPST practice as cited in A.6.1).
### Relations

* **Depends on:**

  * A.3 — Transformer quartet (MethodDescription / Method / Work / WorkEnactment separation)
  * A.7 — Strict Distinction (object ≠ description ≠ carrier; Face ≠ Surface)
  * A.6 — Signature Stack & Boundary Discipline
  * A.6.0 — `U.Signature`
  * A.6.2 — `U.EffectFreeEpistemicMorphing` (constructor ops are EFEM species)
  * A.12 — Transformer role (enactment is by Systems, not epistemes)
  * C.2.1 — Episteme slots (`DescribedEntitySlot`, `ViewpointSlot`, `ViewSlot`) and naming deconfliction
  * (optional) E.18 — E.TGA, if the constructor flow is represented as a transduction graph fragment
  * E.10 / LEX discipline — if the Context uses Plain twins (“SoI”) or shorthands, they must be registered and kept off normative surfaces
  * A.6.3 — `U.EpistemicViewing`
  * A.6.4 — `U.EpistemicRetargeting`
  * A.6.5 — `U.RelationSlotDiscipline`
  * A.6.6 — `U.AnchorAndBaseDiscipline`
  * A.6.B — Boundary Norm Square & Claim Register discipline
  * E.17 / E.17.0 — MVPK and multi‑view describing

* **Strengthens:** A.6.5 and A.6.6 by making their operation vocabularies first‑class as constructor operations.

* **Constrains:** Any signature evolution narrative: semantic changes must be explicit new editions + reference retargeting; publication faces must be viewings.

#### Integration pointers (informative)

Grounding pointers in the current FPF draft (for alignment while integrating):

* Canonical pattern template order and section requirements (E.8).
* SoTA‑Echoing requirements and avoidance of data governance/tool binding (E.8:11, E.8:8).
* A.6 cluster explicitly treats A.6.5/A.6.6 as constructor/enabling operations (motivation for A.6.S).
* A.6.2 “effect‑free episteme morphisms” boundary (constructor ops are EFEM; work/mechanisms are separate).
* A.3 transformer quartet (MethodDescription vs Method vs Work) for “constructor described vs enacted”.
* A.7 strict distinction and Face/Surface separation (no object–description–carrier soup).
* A.12 external transformer / transformer role discipline (enactment is by Systems; no epistemic agency).
* Slot operation lexicon and naming guidance (A.6.5).
* Base‑change operation lexicon (A.6.6).
* MVPK faces as fixed view kinds with “no new semantics” intent (E.17).
* Claim register and quadrant separation discipline (A.6.B).
### A.6.S:End
## Wholeness Language Unpacking — RPR-WHOLE

**Plain-name.** Wholeness / integrity / part / boundary disambiguation
**One-liner.** Treat “whole/part/complete/holistic” as *trigger words* that force an explicit choice among **reference level (referent vs description vs work)**, **boundary**, **parthood kind**, **aggregation (Γ)**, **order/time**, and **completeness (capability/spec/evidence)**.

> **Type:** Architectural (A)
> **Status:** Stable
> **Normativity:** Normative

**Placement.** A.6 precision-restoration cluster; a lexical front-end to mereology and Γ selection.
**Specialises.** A.6.P Relational Precision Restoration Suite. 
**Works alongside.** A.14 (mereology extension), B.1.1 (edge selection), B.1.4 (Γ_ctx/Γ_time), A.15 (role–method–work).
**Template discipline.** Canonical section order and headings follow E.8.

### Problem frame

Teams routinely use compact natural-language tokens like *whole*, *part*, *integrity*, *holistic*, and *complete* to gesture at multiple different things at once: a boundary, a bill-of-materials, a collective, a workflow, a lifecycle, or “end-to-end” capability. The same sentence then gets interpreted as **structure**, **procedure**, **history**, or **competence**, and the disagreement is not resolvable because the referent is under-specified.

This matters because FPF’s core moves are boundary-grounded wholes (holons) and explicit composition operators (Γ). A holon is individuated by a **boundary that separates inside from environment**, with interactions crossing that boundary.  When language collapses “whole” into a rhetorical flourish, the modeler is tempted to smuggle order, time, membership, or capability into part–whole edges, causing the classic category errors that later break Γ composition and audits.

This pattern is a practical repair protocol: it does not fight natural language; it **treats its vague words as triggers** that force an explicit unpacking into the minimal, typed vocabulary for wholeness claims.
### Problem

Without an unpacking discipline, the following failure modes recur:

1. **Boundary ambiguity.** “The whole system” is asserted with no statement of what is inside vs outside, so “environment” and “interface” debates become circular.
2. **Parthood overload.** “Part of” is used for physical parts, logical subsections, group membership, fractions of a stock, and lifecycle stages—then encoded as one generic inclusion.
3. **Order-as-part.** Teams say “Step B is part of the process” and model it as a structural inclusion, reproducing the structure-as-sequence anti-pattern. 
4. **History-as-part.** Versions or phases are treated as subcomponents instead of time-slices of the same carrier, erasing coverage/overlap constraints.
5. **Completeness conflation.** “Complete/turnkey/end-to-end” is treated as “has all parts,” when the intent was capability coverage, specification coverage, or evidence coverage (role–method–work confusion).
6. **Discipline/context drift.** “Chemistry as a whole” alternates between meaning a method family, a social community, and a bounded context—leading to incompatible nesting stories.
7. **Integrity misrouting.** “Integrity” is read as “wholeness/coherence” when the author meant **security/data integrity** (CIA-style integrity, constraint satisfaction, tamper-resistance), producing the wrong facet unpacking and the wrong remediation.
8. **Artefact–referent collapse.** “The whole system is documented” / “the whole model is deployed” slides between a system and its description artefact, so inclusion edges and completeness claims get attached to the wrong level (A.15: referent vs description vs work/evidence).

The result is not merely imprecise prose; it is **non-auditable modeling**, because different readers (or validators) infer different decomposition rules.
### Forces

| Force                                                        | Tension                                                                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| **Conversational economy vs. auditability**                  | One short word (“whole”) ↔ a reviewable statement of boundary, part-kinds, and composition rule.             |
| **Cross-domain portability vs. local idiom**                 | Domain jargon (“module”, “pipeline”, “discipline”) ↔ stable typed distinctions that travel between contexts. |
| **Structural clarity vs. procedural realism**                | “Parts of X” feels intuitive for workflows ↔ order and time have different semantics than mereology.         |
| **Wholeness as individuation vs. wholeness as completeness** | “A whole thing” can mean “one bounded entity” ↔ “covers everything we care about.”                           |
| **Parsimony vs. expressivity**                               | Too many relation kinds overwhelm ↔ too few makes “part-of” a semantic dumping ground.                       |
### Solution

This pattern applies the A.6.P repair recipe to the **wholeness polysemy cluster** by introducing a stable lens, a trigger list, a facet vocabulary, and an always-unpack rewrite discipline.

#### A.6.P crosswalk (what this pattern adds)

This is a wholeness-specific binding of the generic A.6.P repair sequence:

1. **Detect.** WHOL triggers mark a sentence as semantically overloaded.
2. **Expand.** Enumerate candidate meanings along the facets (boundary, parthood, fold/Γ, order/time, completeness).
3. **Discriminate.** Apply the table tests (level-of-reference, transitivity, swap-test, carrier-identity test, coverage test) to eliminate candidates.
4. **Rewrite.** Replace the trigger token with facet headphrases + typed relations.
5. **Lock-in.** Record the choice (optionally via a wholenessSituation record) so the document stops re-litigating the same ambiguity.
#### Lens: Boundary–Parthood–Fold–Order/Time–Completeness

When any of the trigger words below appear on a **load-bearing surface**, interpret the sentence through this ordered checklist and rewrite until the claim is decidable *for the current purpose* (i.e., the remaining ambiguity would not change the model edge(s), Γ choice, or review decision). Multiple facets may legitimately apply; “stop” only when the residual facets are irrelevant to the claim being made.

```text
Definition WHOL-LBS-1 (load-bearing surface).
A sentence is on a load-bearing surface if it functions as a requirement ("SHALL"/"MUST"),
an invariant, an interface/boundary claim, a model edge/label, a decision record, a test oracle,
or any statement that downstream reasoning or audits depend on.
```

0. **Term-of-art override.** Is the trigger part of a defined term-of-art (glossary entry, standard term, contract term)? If yes, cite that definition and do not force WHOL facet unpacking unless the definition itself contains unresolved WHOL triggers.
   *Clarification:* this override applies to the *term itself*. Still unpack any separate wholeness claim the sentence makes *about* the term (e.g., boundary, composition, or coverage).
0.5 **Reference level.** Is the sentence about (i) a holon-level referent, (ii) a description artefact (spec/model/document), or (iii) an executed run/work/evidence? State the level explicitly when it affects relation choice (e.g., ConstituentOf for document structure vs StepOf/SerialStepOf for the procedure itself).
1. **Boundary.** If the claim is holon-level: what is the *inside* and what is the *environment* (boundary-based individuation)? Name at least one cross-boundary interaction, interface, dependency, or external constraint relevant to the claim. If there are multiple plausible boundaries (levels/resolutions), list candidates and state which boundary this claim is about.
2. **Parthood kind.** If “part-of” is intended, which kind is meant: **ComponentOf, ConstituentOf, PortionOf**, or **MemberOf** (collection membership)? If the claim is about a description artefact, default to **ConstituentOf** and keep the referent explicit (model-of vs modeled).
3. **Fold.** If the sentence asserts a whole-level property that depends on how parts are “glued” (not merely listed), what composition operator (Γ flavour) is implied: structure, episteme, context, time/history, method, or work/cost?
4. **Order/time routing.** Is the claim about a procedure graph (**StepOf** + order/concurrency constraints such as **SerialStepOf / ParallelFactorOf**), or about **temporal continuity/coverage** (**PhaseOf** aggregated via Γ_time), rather than structural containment? If the claim is about *observed* concurrency in a specific run, route it to work/evidence (A.15) rather than treating it as ParallelFactorOf.
5. **Completeness.** Is “whole/complete/end-to-end” actually about **completeness in a scope**: capability coverage, specification coverage, and/or evidence coverage (A.15 layer), rather than “has all parts”?

A “wholeness” statement is considered precise only after the sentence has been rewritten to answer the subset of these questions that actually matters.
#### Trigger words and phrases

Treat the following as **WHOL triggers** on normative surfaces and in Working-Model claims.

**Hard triggers (always unpack on load-bearing surfaces):**

* **Whole / entire / as a whole / integrated / unified / coherent**
* **Part / piece / component / module / element / subsystem**
* **Includes / consists of / composed of / contains / comprises**
* **Complete / end-to-end / turnkey / fully specified / self-contained**
* **Integrity** (always classify first; see CC-A6H-10)

**Conditional triggers (unpack when coupled to a wholeness frame such as “as a whole”, “part of”, “composed of”, “end-to-end”, “integrated”, or “complete”):**

* **Pipeline / workflow / process / step / stage**
* **Phase / version / revision / lifecycle**
* **Collection / group / team / set of**

**Soft triggers (unpack only when used as a wholeness predicate, not as a term-of-art):**

* **Holistic / holonic**
* **Context / environment** (when asserted “as a whole” or treated as a bounded entity)

**Term-of-art override.** If a trigger occurs inside a defined term-of-art (e.g., “data integrity”, “integrity constraint”, “referential integrity”), cite the glossary definition and do not force WHOL unpacking unless that definition itself contains unresolved WHOL triggers.

In running prose you can still say “whole” informally, but on load-bearing surfaces these words are treated as a lintable signal: “this sentence needs a facet rewrite.”
#### Canonical facet headphrases

Use these headphrases to replace the ambiguous word with the intended semantics:

**A) Boundary & environment**

* “the holon boundary of X is …”
* “the environment of X includes …”
* “interaction across X’s boundary is …” (not parthood)

**B) Parthood kinds**

* “A is ComponentOf B” for physical assembly
* “A is ConstituentOf B” for conceptual/content inclusion
* “A is PortionOf B with μ=…” for a quantitative fraction
* “A is MemberOf C” for membership in a collective (not a part–whole chain)

**C) Order/time**

* “A is PhaseOf carrier B over window τ” for a lifecycle slice of the same carrier (temporal continuity/coverage; not inside/outside containment)
* “Step s is StepOf procedure P” for step membership in a procedure graph (not a part–whole claim)
* “Step i is SerialStepOf Step j” for precedence constraints in order-sensitive procedures (directed; read as “i precedes j”, not as containment; use an adjacency variant if you need “immediately before”)
* “Step u is ParallelFactorOf Step v” for parallelizability/concurrency potential (often symmetric; state synchronization/independence/resource constraints)
* “In run r, Step u ExecutedConcurrentlyWith Step v” for observed concurrency in a specific work/evidence instance (A.15); do not infer this from ParallelFactorOf alone

**Semantics cues (review-time, minimal invariants).**

* **ComponentOf**: typically transitive within a bill-of-materials; removing A changes the assembled carrier; do not use for sequences or memberships.
* **ConstituentOf**: transitive within an information/conceptual artefact; supports “section/chapter/lemma is part of paper/proof” without implying physical assembly.
* **PortionOf**: requires an explicit extensive measure μ and an additivity story (non-overlap + sum); avoid if you cannot state μ.
* **MemberOf**: not transitive; does not imply the collective is an assembly; membership can change without “recomposition”.
* **PhaseOf**: same carrier across time; requires an explicit window τ and a coverage/overlap story; aggregate with Γ_time when composing the history narrative.
* **StepOf**: membership of a step node in a procedure graph; does not imply physical assembly or conceptual containment. Pair with precedence/concurrency constraints rather than “part-of”.
* **SerialStepOf**: directed precedence constraint on step nodes (read as “i precedes j”). For a single execution trace/iteration, the precedence constraint set should be acyclic (strict partial order). If the procedure includes iteration/loops, model the loop explicitly (e.g., as a loop/control-flow construct or by time-indexing step instances) rather than introducing cycles into SerialStepOf. If you mean “adjacent in sequence”, use an explicit adjacency form.
* **ParallelFactorOf**: parallelizability constraint between step nodes under stated assumptions (resources, independence, synchronization). Treat it as *potential* parallelism (a property of the procedure design), not as evidence that two steps were executed concurrently. If you need to record observed concurrency, use a run-anchored work/evidence relation (e.g., ExecutedConcurrentlyWith in run r). ParallelFactorOf is typically symmetric and not transitive; say so if you rely on those properties.

**D) Fold / aggregation**

* “Γ_sys / Γ_epist / Γ_ctx / Γ_time / Γ_method / Γ_work” as the explicit “gluing rule” (the operator that produces the composite)

**E) Completeness**

* “capability coverage is …”
* “specification coverage is …”
* “evidence coverage is …”
  with explicit scope (G) if relevant.
#### Optional bundling record: wholenessSituation

This is a didactic bundling device for prose and review; it adds no new kernel semantics (the semantics remain in boundary + relation kinds + Γ choices). 

```text
Definition WHOL-REC-1 (wholenessSituation record).
wholenessSituation ::= ⟨
  wholeRef,
  referenceLevel ∈ {referent, description, work},
  boundaryRefs (0..*),
  environmentRefs (0..*),
  carrierRef (0..1),       // required if PhaseOf is asserted
  parthoodKinds ⊆ {ComponentOf, ConstituentOf, PortionOf, MemberOf},
  measureRef (0..1),       // μ if PortionOf is asserted
  foldRef (0..1),          // Γ_* if a fold is asserted
  orderTimeKinds ⊆ {StepOf, SerialStepOf, ParallelFactorOf, PhaseOf},
  orderTimeRef (0..1),     // the step graph / timeline segment being referenced
  completenessKinds ⊆ {capability, spec, evidence},
  scopeRef (0..1)          // ClaimScope (G) if relevant
⟩

Note: if the trigger token is “integrity” and the intent is security/data integrity (CIA integrity, constraint satisfaction), do not treat it as a WHOL situation; route it as an integrity-as-quality statement instead of forcing boundary/parthood semantics.
```

Use it when a document keeps repeating “the whole X”; a single record makes the intended wholeness facets stable across pages.
#### Always-unpack rule for normative surfaces

**D-WHOL-UNPACK.** In any normative or Working-Model sentence, if a WHOL trigger appears, the author SHALL rewrite the sentence using facet headphrases and typed relations, or attach a Candidate-Set Note while the choice remains open.

This keeps “whole/part” as natural-language scaffolding while preventing it from becoming semantic authority.

```text
Definition WHOL-CSN-1 (Candidate-Set Note).
CandidateSetNote ::= ⟨
  triggerToken,
  excerptRef,
  candidates,              // explicit candidate meanings (facet combinations)
  discriminatorsPending,   // questions/tests to run before committing
  noSmugglingConstraints   // what must NOT be asserted while open (e.g., “do not encode as generic PartOf”)
⟩
```

A Candidate-Set Note is conformant only if it explicitly blocks semantic smuggling (e.g., forbids encoding an unresolved “part-of” as a generic inclusion edge).
#### Disambiguation guide

Use the following format when reviewing or rewriting: trigger → candidates → discriminating questions/tests → canonical rewrite → routing hooks. 

**Minimal discriminator kit (lintable tests).**

* **Level-of-reference test:** Is the sentence about the referent holon, a description artefact (spec/model/document), or a work/evidence instance? If the level changes the edge type, make it explicit before choosing relations.
* **Boundary test:** Can you point to an inside/outside cut and name at least one cross-boundary interaction, interface, dependency, or external constraint that matters for this claim? If not, either “whole” is rhetorical, or the boundary is intentionally out of scope (say so), or you are not making a holon-level claim (see level-of-reference).
* **Transitivity test (parthood):** Would “A part-of B” and “B part-of C” normally license “A part-of C” under the intended meaning? If yes, you likely mean a typed parthood (ComponentOf/ConstituentOf). If no, suspect MemberOf, PortionOf, or an order/time relation.
* **Swap test (order):** If you swap A and B, does the meaning change? If yes, encode precedence/concurrency, not containment.
* **Carrier-identity test (history):** Is it the *same carrier* across time with windows/coverage constraints? If yes, PhaseOf + Γ_time. If not, model a transformation that yields a new holon identity.
* **Coverage test (completeness):** “Complete” with respect to what scope (G), and is it capability/spec/evidence coverage (A.15) rather than “has all parts”?

| Trigger in prose                                           | Candidate meanings                                                               | Discriminating questions/tests                                                                                                      | Canonical rewrite                                                                                                                         | Routing hooks                                                           |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| “X is a whole / integrated / coherent”                     | (a) boundary individuation, (b) a Γ fold exists, (c) completeness claim          | What is the boundary? What is outside? What is the “glue” (Γ) if parts exist? Is this about capability coverage instead?            | “The holon boundary of X is …; X interacts with … across boundary; X is produced by Γ_* over …” OR “capability coverage for X is …”       | A.1 boundary; B.1 Γ; A.15 completeness                                  |
| “X has integrity / data integrity / integrity constraint”  | (a) wholeness/coherence claim, (b) security/data integrity quality, (c) term-of-art | Is integrity about CIA/security, tamper-resistance, or constraint satisfaction? If yes, it is a quality claim, not wholeness. If not, what boundary/fold is implied? | “Integrity-of(X) w.r.t. constraints/threat model is …” OR (if wholeness) apply boundary + Γ + typed relations as above                     | Quality-attribute routing; A.1 boundary if applicable                   |
| “A is part of B / B contains A”                            | ComponentOf vs ConstituentOf vs PortionOf vs PhaseOf vs MemberOf                 | Is A a physical assembly element, a content section, a quantity slice, a time slice, or a team member? Would transitivity be valid? | Replace “part of” with the chosen typed relation and, if needed, declare μ or τ                                                           | A.14 / B.1.1 selection guide                                            |
| “Step A is part of the process/pipeline”                   | (a) StepOf + SerialStepOf/ParallelFactorOf (procedure graph), (b) PhaseOf (lifecycle slice), (c) ConstituentOf (description artefact), (d) mereology incorrectly used | Level-of-reference: procedure vs description vs run? If swapping steps changes meaning, it is order. If it is a lifecycle slice of the same carrier, it is PhaseOf. If it is “step text is in the document”, it is ConstituentOf. | “Step A StepOf procedure P; (constraints:) Step A SerialStepOf Step B / Step A ParallelFactorOf Step B …” aggregated via Γ_method/Γ_ctx. OR (description-level) “StepDescription(A) ConstituentOf MethodDoc D”. Do not express procedure order as ComponentOf. | B.1.4 anti-pattern fix; A.15 (description vs work)                      |
| “v2 is part of v1 / the new version is inside the old one” | (a) PhaseOf timeline, (b) new holon identity, (c) conceptual inclusion           | Is it the *same carrier* across time with coverage/no-overlap? Or did identity change (new thing produced)?                         | “v2 PhaseOf carrier over τ2” aggregated via Γ_time, or model a Transformer producing a new holon                                          | A.14 PhaseOf + Γ_time; B.2 if identity changes                          |
| “The team/system is composed of people”                    | (a) MemberOf collective, (b) ComponentOf physical assembly, (c) role assignments | Do the people form a collective that can act? If so, treat membership separately from structure; roles are not parts.               | “Person p MemberOf Team T” and, if T acts, model it as a bounded system with its own method/work                                          | MemberOf note + A.15 role-as-part warning                               |
| “The method is complete / turnkey / end-to-end”            | capability coverage vs spec coverage vs evidence coverage                        | Complete with respect to which scope (G)? Is the claim about a description, an ability, or an executed run?                         | “MethodDescription coverage is …” or “System capability covers required steps …” or “Work evidence covers …”                              | A.15 role–method–work alignment; L-PROC/L-FUNC/L-SCHED family if needed |
| “The discipline/context as a whole”                        | (a) method family, (b) community/institution, (c) bounded context of norms       | Are we talking about knowledge artefacts, acting organizations, or contextual rules that constrain roles/methods?                   | Rewrite as “episteme family …” OR “collective system …” OR “bounded context …” and then apply boundary/parthood/order rules appropriately | A.7 strict distinction; boundary + membership + A.15                    |

**Candidate-Set Note.** If you cannot yet decide which candidate meaning is intended, record a Candidate-Set Note and proceed without silently collapsing meanings.
#### Change lexicon for wholeness narratives

When “the whole” evolves, narrate the change as an explicit change-class, not as “it’s still the same whole” rhetoric:

* **reboundary**: boundary/interface changed (inside/outside changed)
* **recompose**: a parthood edge was added/removed or its kind changed (ComponentOf ↔ ConstituentOf, etc.)
* **repartition**: PortionOf distribution changed (with explicit μ)
* **rephase**: PhaseOf windows changed (coverage/overlap story)
* **reorder / reparallelize**: SerialStepOf / ParallelFactorOf graph changed
* **redescribe**: the claim’s reference level shifted (system ↔ description ↔ work/evidence) while retaining the same noun phrase (“the whole X”)
* **recomplete**: capability/spec/evidence coverage changed (scope pin updated)

If the identity criterion fails (it is no longer “the same carrier”), escalate: do not hide it behind “whole/integrity” language.
#### Guardrails

1. **No “part-of” as a universal relation.** “Part of” is a prompt to choose a typed relation, not a final answer. 
2. **No order/time smuggling.** Steps and histories must not be encoded as structural inclusion.
3. **No membership upgrade.** A set of members is not automatically a composed artefact; keep MemberOf distinct from ComponentOf. 
4. **No role-as-part.** Role boundaries are scope and authorization boundaries, not BoM structure.
5. **Cross-boundary influence is interaction.** If something crosses a boundary, it is an interaction/interface story, not a parthood story.
6. **No integrity-as-wholeness by default.** If “integrity” appears, first classify it as (a) wholeness/coherence, or (b) security/data integrity quality (CIA/constraints). Route accordingly before invoking parthood or Γ.
7. **No artefact–referent drift.** Do not slide between a system, its description artefacts, and observed runs under the same “whole X” phrase; state the reference level and use the appropriate relations (ConstituentOf vs ComponentOf vs work/evidence predicates).
### Archetypal Grounding

**Tell.** “Wholeness” is not one concept in practice; it is a shorthand for boundary, composition rule, and coverage. Precision comes from unpacking the shorthand into the smallest set of explicit claims that make disagreements decidable.

**Show — System vignette (lab automation).**
A team says: “The whole chromatography pipeline is turnkey, and the chemist owns the whole thing.” This collapses three meanings: workflow order, capability completeness, and role boundary. A precise rewrite becomes:

* “Pipeline” is a **MethodDescription** with steps connected by **SerialStepOf**; the composite procedure is aggregated by **Γ_method / Γ_ctx**.
* “Turnkey” is **capability/spec coverage**: which required roles/capabilities cover which steps under which scope (G).
* “Chemist owns” is a **role assignment boundary** inside a bounded context (who is authorized/required), not a ComponentOf structure.

Now the discussion can separate: “Is the workflow correct?” vs “Do we have capability coverage?” vs “Who is responsible in this context?”

**Show — Episteme vignette (paper + proof + revision).**
A reviewer writes: “Section 3 is part of the proof, and v2 is part of v1.” Both “part” usages differ.

* “Section 3” is typically **ConstituentOf** the paper (content inclusion), while “step 3 of the proof” is **SerialStepOf** in the proof’s reasoning order.
* “v2 part of v1” is usually **PhaseOf** the same carrier across time, aggregated by **Γ_time**—unless the identity changed, in which case it is a new artefact produced by an explicit transformation.

The author can now fix the prose and the model without guessing what “part” meant.
### Bias-Annotation

Lenses tested: **Gov**, **Arch**, **Onto/Epist**, **Prag**, **Did**. Scope: **Universal**.

* **Gov bias.** Prefers auditable, reviewable claims over rhetorically satisfying language; mitigated by allowing Candidate-Set Notes when decisions are intentionally deferred. 
* **Arch bias.** Prefers small, typed vocabularies and explicit operator selection (Γ flavours), which can feel “heavy” in early drafts; mitigated by “always-unpack only on load-bearing surfaces.”
* **Onto/Epist bias.** Privileges clear category boundaries (structure vs order vs history vs capability); mitigated by permitting multiple facets when the situation genuinely requires them.
* **Prag bias.** Optimizes for fewer downstream refactors by forcing early disambiguation; mitigated by the change lexicon, which makes late changes explicit and safe.
* **Did bias.** Prefers teachability and lintable triggers; mitigated by keeping the facet set small and using domain-native examples.
### Conformance Checklist

| ID                                         | Requirement                                                                                                                                                                                                                  | Purpose                                                          |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **CC-A6H-1 (Trigger discipline).**         | Authors of normative or Working-Model text SHALL treat WHOL triggers as disambiguation triggers and apply the facet rewrite or attach a Candidate-Set Note.                                                                  | Prevents “whole/part” from becoming semantic authority.          |
| **CC-A6H-2 (Typed parthood).**             | When “part-of/contains/composed-of” is meant as inclusion, authors SHALL choose a typed relation kind consistent with the edge selection guide (ComponentOf / ConstituentOf / PortionOf; MemberOf if collective). If the prose is actually asserting temporal slicing/versioning, authors SHALL use PhaseOf + Γ_time and SHALL NOT encode it as inclusion. | Eliminates universal “part-of” dumping.                          |
| **CC-A6H-3 (No order/time in mereology).** | Authors SHALL NOT express step order, concurrency, or temporal coverage as structural inclusion; they SHALL use ordered relations and Γ_ctx/Γ_method or PhaseOf and Γ_time.                                                  | Blocks the structure-as-sequence and history-as-structure traps. |
|                                            | *Note:* ConstituentOf is allowed when the claim is about the *description artefact* (e.g., step descriptions inside a method document); StepOf/SerialStepOf/ParallelFactorOf are for the procedure graph itself.            |                                                                         |
| **CC-A6H-4 (Membership separation).**      | Authors SHALL keep MemberOf claims distinct from ComponentOf/ConstituentOf and SHALL NOT infer composition from membership without an explicit construction claim.                                                           | Prevents accidental upgrade from set to assembly.                |
| **CC-A6H-5 (Completeness routing).**       | When “complete/end-to-end/turnkey” is used, authors SHALL state whether the claim is about capability coverage, specification coverage, or evidence coverage, and route terms to A.15 vocabulary.                            | Prevents wholeness-as-rhetoric in method/role discourse.         |
| **CC-A6H-6 (Boundary clarity).**           | If “whole/integrity/environment” is asserted at holon-level, authors SHALL name the relevant boundary and at least one interface/interaction/dependency/constraint concern, or explicitly state that boundary is out of scope for the claim. | Makes inside/outside explicit and reviewable.                    |
| **CC-A6H-7 (Change-class narration).**     | When a wholeness story changes across editions, authors SHOULD use the change lexicon (reboundary/recompose/rephase/reorder/recomplete) rather than reusing “whole” rhetoric.                                                | Keeps evolution auditable.                                       |
| **CC-A6H-8 (Review lint).**                | Reviewers and validators SHOULD flag un-unpacked WHOL triggers on normative surfaces as nonconformant, unless an explicit Candidate-Set Note exists.                                                                         | Makes the discipline enforceable at low cost.                    |
| **CC-A6H-9 (Term-of-art override).**       | If a WHOL trigger appears inside a defined term-of-art, authors SHALL cite or inline the definition and SHALL NOT treat the occurrence as a WHOL trigger unless the definition itself contains unresolved WHOL triggers.       | Prevents linter noise and misrouting.                            |
| **CC-A6H-10 (Integrity classification).**  | When “integrity” appears, authors SHALL explicitly classify it as (a) wholeness/coherence, (b) security/data integrity quality, or (c) another defined term-of-art, and route the rewrite accordingly.                      | Avoids integrity-as-wholeness category errors.                    |
| **CC-A6H-11 (Reference level).**           | On normative or Working-Model surfaces, authors SHALL state whether a wholeness claim is about the referent holon, a description artefact (spec/model/document), or a work/evidence instance whenever that distinction affects relation choice, completeness meaning, or validation. | Prevents artefact–referent drift and A.15 level errors.          |
### Common Anti-Patterns and How to Avoid Them

| Anti-pattern                 | Symptom                                                                | Why it fails (force violated)                                        | How to avoid / repair                                                                             |
| ---------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Holistic-as-evasion**      | “We took a holistic view” replaces boundary/scope detail               | Sacrifices auditability for conversational economy                   | State the boundary, environment, and scope (G); use wholeness facets explicitly                   |
| **Universal part-of**        | Everything is “part of” everything                                     | Breaks portability; different readers infer different relations      | Replace with ComponentOf/ConstituentOf/PortionOf/PhaseOf/MemberOf                                 |
| **Structure-as-sequence**    | Step order encoded as containment                                      | Collapses procedure into structure; causes Γ errors                  | Use SerialStepOf/ParallelFactorOf + Γ_ctx/Γ_method                                                |
| **History-as-structure**     | Versions modeled as parts                                              | Erases temporal coverage and identity discipline                     | Use PhaseOf + Γ_time; if identity changed, model a new artefact                                   |
| **Collection-as-assembly**   | A team “consists of” people encoded as ComponentOf                     | Confuses membership with assembly                                    | Use MemberOf and, if the group acts, model it as a bounded system with its own work               |
| **Completeness-by-rhetoric** | “Method is complete” without stating what it covers                    | Confuses structural wholeness with capability/spec/evidence coverage | Rewrite using A.15: MethodDescription vs Method vs Work, plus explicit coverage                   |
| **Module vs component blur** | “Module” used sometimes as physical part, sometimes as deployment unit | Breaks cross-team comparability                                      | Use a mini-definition on first mention and route: component vs constituent vs deployment artefact |
| **Artefact–referent drift**   | “The whole X” alternates between a system and its spec/model/document   | Breaks auditability; smuggles relations across A.15 levels            | State the reference level explicitly; use ConstituentOf for document parts; keep model-of separate |
### Consequences

| Benefits                                                                                                                            | Trade-offs / Mitigations                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Decidable disagreements.** People can disagree about a boundary, a fold, or a coverage criterion without talking past each other. | **More words on the page.** Mitigate by applying always-unpack mainly to normative surfaces and repeating a single wholenessSituation record. |
| **Fewer category errors.** Order/time and membership stop leaking into part–whole chains.                                           | **Up-front effort.** Mitigate with the disambiguation table and lintable trigger list.                                                        |
| **Better evolution stories.** Reboundary/rephase/reorder changes are narratable without “it’s still the whole” confusion.           | **Temporary uncertainty.** Mitigate via Candidate-Set Notes rather than premature hardening.                                                  |
| **Cleaner role/method discourse.** “Turnkey” becomes a coverage statement tied to A.15 rather than a vague wholeness claim.         | **Learning curve.** Mitigate with the System/Episteme examples and consistent headphrases.                                                    |

Quotable closer: **If “whole” matters, say what makes it one.**
### Rationale

Natural language compresses multiple modeling dimensions into a single word because that is efficient in conversation. In engineering and research, the same compression becomes a fault-line: boundary individuation, mereological inclusion, collection membership, procedural order, and lifecycle continuity behave differently under reasoning and composition.

FPF’s kernel already provides small, orthogonal “axes” to separate these dimensions: boundaries and interactions for inside/outside, typed parthood for different inclusion families, Γ flavours for different kinds of composition, and role–method–work for capability vs description vs occurrence.  A.6.H simply supplies the **linguistic steering wheel** that keeps authors from driving those axes with one overloaded noun.

The result is not pedantry; it is a mechanism for preventing downstream refactors and for making disagreements reviewable.
### SoTA-Echoing

SoTA-Pack: Viewpoint discipline + relation typing + boundary-aware responsibility (lexically enforced).

This section follows the required craft: claim → practice → source → alignment → adoption status.

| Tradition                                     | SoTA practice (post‑2015)                                                                                                                                                              | Primary source (post‑2015)                       | Alignment with this pattern                                                                                                                                                                           | Adoption status                                                                                                       |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Systems and software architecture description | Architecture descriptions distinguish the entity-of-interest from its description and structure the discussion around concerns/viewpoints, including boundary and environment notions. | ISO/IEC/IEEE 42010:2022 ([ISO][1])               | A.6.H adopts the same “make the viewpoint explicit” stance, but operationalizes it at the lexical level: “whole” requires a boundary/environment clause rather than a rhetorical claim.               | **Adopt/Adapt.** Adopt viewpoint discipline; adapt by using trigger-word linting as an authoring aid.                 |
| Formal ontology and top-level standards       | Top-level ontology standards require explicit definitions of relations and discourage conflating distinct relation types under one label.                                              | ISO/IEC 21838-2:2021 ([ISO][2])                  | A.6.H aligns by forcing “part-of” to resolve into a typed relation family, and by separating continuants (structure) from occurrent-like narratives (order/time).                                     | **Adopt.** Adopt explicit relation typing; keep the facet set minimal to preserve usability.                          |
| Enterprise architecture modeling languages    | Modeling standards distinguish structural relations such as composition vs aggregation, but many organizations still overload them informally.                                         | ArchiMate 3.2 Specification ([opengroup.org][3]) | A.6.H adapts the idea of “different structural relations,” but extends it with Portion/Phase and with a strict routing of order/time outside structure, which is often underspecified in EA practice. | **Adapt.** Adopt the “don’t overload one relation” instinct; adapt by adding explicit order/time and coverage facets. |
| Sociotechnical team boundary practice         | Organizational design methods treat team boundaries and cognitive load as first-class, because “a team as a whole” depends on coordination interfaces and role clarity.                | Team Topologies ([teamtopologies.com][4])        | A.6.H uses this as support for separating “collective membership” from “structural assembly” and for treating “ownership of the whole” as a boundary-and-responsibility claim, not a part claim.      | **Adopt/Adapt.** Adopt boundary salience; adapt by binding it to explicit wholeness facets and typed relations.       |
| Requirements engineering and specification quality | Requirements standards emphasize unambiguous, verifiable statements and explicit identification of the item being specified vs its documentation (referent vs description).        | ISO/IEC/IEEE 29148:2018                          | A.6.H operationalizes this at the lexical level by defining load-bearing surfaces and requiring rewrites into typed relations instead of overloaded “whole/part” prose.                               | **Adopt/Adapt.** Adopt verifiability discipline; adapt via WHOL triggers + Candidate-Set Notes.                       |
| Security engineering vocabulary               | “Integrity” is treated as a security property (unauthorized modification) and as constraint satisfaction, requiring explicit threat/assumption models.                                | NIST SP 800-53 Rev.5 (2020) ([NIST][5])          | A.6.H’s integrity classification step prevents misrouting security/data integrity into wholeness/mereology and supports correct remediation.                                                         | **Adopt.** Treat integrity as quality unless explicitly wholeness/coherence.                                          |

Scale legality note: whenever “fraction/percentage/share” appears in wholeness talk, treat it as PortionOf with an explicit extensive measure μ and an additive rule, not as “a component,” to avoid covert scalarization and category mistakes.
### Relations

* **Specialises:** A.6.P Relational Precision Restoration Suite.
* **Front-ends:** A.14 Advanced Mereology; B.1.1 edge selection guide — by turning prose triggers into typed edge choices.
* **Coordinates with:** B.1.4 Γ_ctx/Γ_time — to route order/time away from structure; A.15 Role–Method–Work Alignment — for “completeness/end-to-end” coverage language (capability/spec/evidence).
* **Informs examples:** F.18 vocabulary pitfalls (module/component, batch/lot) as recurring wholeness-word traps.

[1]: https://www.iso.org/standard/74393.html "ISO/IEC/IEEE 42010:2022 - Software, systems and enterprise"
[2]: https://www.iso.org/standard/74572.html "ISO/IEC 21838-2:2021 - Information technology"
[3]: https://www.opengroup.org/sites/default/files/docs/downloads/n221p.pdf "ArchiMate 3.2 Specification Reference Cards"
[4]: https://teamtopologies.com/ "Team Topologies - Organizing for fast flow of value"
[5]: https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final "NIST SP 800-53 Rev. 5 - Security and Privacy Controls"
### A.6.H: End
