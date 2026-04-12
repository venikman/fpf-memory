---
title: "Pattern Quality Gates: Review & Refresh Profiles"
description: "Part E - The FPF Constitution and Authoring Guides"
---

# Pattern Quality Gates: Review & Refresh Profiles
> Pattern `E.19` · Stable · Architectural pattern · Normative
> Part E - The FPF Constitution and Authoring Guides

> **Type:** Architectural pattern
> **Status:** Stable
> **Normativity:** Normative

FPF evolves by adding and revising patterns. Over time, the framework accumulates two kinds of risk:

## Keywords

- pattern review
- quality gates
- admission
- refresh
- staleness
- profile-based checks
- PQG
- PCP
- suite-level review (PCP-SUITE)
- planned baseline & P2W seam (PCP-P2W)
- SlotFillingsPlanItem
- MVPK projections
- guard vs gate separation.

## Relations

- `E.19` --builds_on--> [FPF Authoring Conventions & Style Guide](/generated/patterns/E.8)
- `E.19` --builds_on--> [LEX-BUNDLE: Unified Lexical Rules for FPF](/generated/patterns/E.10)
- `E.19` --builds_on--> [Design-Rationale Record (DRR) Method](/generated/patterns/E.9)
- `E.19` --builds_on--> [Lexical Authoring & Evolution Protocol (LEX-AUTH)](/generated/patterns/E.15)
- `E.19` --builds_on--> [U.RelationSlotDiscipline - SlotKind / ValueKind / RefKind discipline for n‑ary relations (with slot‑operation lexicon)](/generated/patterns/A.6.5)
- `E.19` --coordinates_with--> [Mint or Reuse? (U.Type vs Concept-Set vs Role Description vs Alias)](/generated/patterns/F.8)
- `E.19` --coordinates_with--> [Local-First Unification Naming Protocol](/generated/patterns/F.18)
- `E.19` --coordinates_with--> [Alignment & Bridge across Contexts](/generated/patterns/F.9)
- `E.19` --coordinates_with--> [SCR/RSCR Harness for Unification](/generated/patterns/F.15)
- `E.19` --coordinates_with--> [Multi‑View Publication Kit (for Morphisms)](/generated/patterns/E.17)
- `E.19` --coordinates_with--> [MechSuiteDescription — Description of a set of distinct mechanisms](/generated/patterns/A.6.7)
- `E.19` --coordinates_with--> [SlotFillingsPlanItem — Planned Slot-Fillings Baseline (WorkPlanning PlanItem)](/generated/patterns/A.15.3)
- `E.19` --coordinates_with--> [Telemetry-Driven Refresh & Decay Orchestrator](/generated/patterns/G.11)
- `E.19` --explicit_reference--> [U.RelationSlotDiscipline - SlotKind / ValueKind / RefKind discipline for n‑ary relations (with slot‑operation lexicon)](/generated/patterns/A.6.5)
- `E.19` --explicit_reference--> [U.Mechanism - Law‑governed application to a SubjectKind over a BaseType](/generated/patterns/A.6.1)
- `E.19` --explicit_reference--> [Lexical Authoring & Evolution Protocol (LEX-AUTH)](/generated/patterns/E.15)
- `E.19` --explicit_reference--> [SCR/RSCR Harness for Unification](/generated/patterns/F.15)
- `E.19` --explicit_reference--> [Alignment & Bridge across Contexts](/generated/patterns/F.9)
- `E.19` --explicit_reference--> [Local-First Unification Naming Protocol](/generated/patterns/F.18)
- `E.19` --explicit_reference--> [U.RelationalPrecisionRestorationSuite — Relational Precision Restoration (RPR) — Kind-Explicit Qualified Relation Discipline](/generated/patterns/A.6.P)
- `E.19` --explicit_reference--> [FPF Authoring Conventions & Style Guide](/generated/patterns/E.8)
- `E.19` --explicit_reference--> [Didactic Primacy & Cognitive Ergonomics](/generated/patterns/E.12)
- `E.19` --explicit_reference--> [Pragmatic Utility & Value Alignment](/generated/patterns/E.13)
- `E.19` --explicit_reference--> [Human-Centric Working-Model](/generated/patterns/E.14)
- `E.19` --explicit_reference--> [Multi‑View Publication Kit (for Morphisms)](/generated/patterns/E.17)
- `E.19` --explicit_reference--> [Worked‑Example Template (Cross‑Domain)](/generated/patterns/F.16)
- `E.19` --explicit_reference--> [LEX-BUNDLE: Unified Lexical Rules for FPF](/generated/patterns/E.10)
- `E.19` --explicit_reference--> [Design-Rationale Record (DRR) Method](/generated/patterns/E.9)
- `E.19` --explicit_reference--> [Mint or Reuse? (U.Type vs Concept-Set vs Role Description vs Alias)](/generated/patterns/F.8)
- `E.19` --explicit_reference--> [MechSuiteDescription — Description of a set of distinct mechanisms](/generated/patterns/A.6.7)
- `E.19` --explicit_reference--> [SlotFillingsPlanItem — Planned Slot-Fillings Baseline (WorkPlanning PlanItem)](/generated/patterns/A.15.3)
- `E.19` --explicit_reference--> [Telemetry-Driven Refresh & Decay Orchestrator](/generated/patterns/G.11)

## Content

## Problem frame

FPF evolves by adding and revising patterns. Over time, the framework accumulates two kinds of risk:

1. **Admission risk** — a newly authored pattern can be structurally compliant yet still fail on ontology, semantics, terminology conflicts and vagueness, scope, SoTA in related disciplines, or cross-context hygiene.

2. **Staleness risk** — older patterns can remain internally consistent while drifting away from contemporary practice and newer parts of FPF, current internal vocabulary, or updated neighboring patterns. The result is “quiet decay”: the pattern still reads well, but becomes misleading, incomplete, or incompatible.

FPF already contains many checklists and constraints, but they are distributed across patterns and suites. Authors and reviewers therefore lack a single, repeatable way to answer: *What should be checked, and how deep, before a pattern is admitted or kept?*
## Problem

Without a unified, explicit review pattern:

* Different reviewers optimize for formal/template compliance and miss deeper ontological, semantic, and naming issues, producing bureaucratic output that does not improve the enforceable contract.
* Authors “optimize for the visible checklist” and miss hidden obligations (lexical discipline, Bridge hygiene, SoTA‑Echoing quality, scope claims, delta‑class impact).
* Legacy patterns accumulate “conceptual bit-rot” and diverge from current practice, current terminology, or current internal invariants.
* The specification’s normative surface becomes harder to trust: compliance becomes a matter of reviewer taste rather than a repeatable gate.
## Forces

| Force                                   | Tension                                                                             |
| --------------------------------------- | ----------------------------------------------------------------------------------- |
| **Uniformity vs Fit**                   | One universal checklist is simple ↔ different pattern kinds carry different risks.  |
| **Rigor vs Editorial cost**             | Deep audits increase quality ↔ they must remain feasible for routine updates.       |
| **Stability vs Evolution**              | Canon should stay stable ↔ it must absorb new SoTA and correct mistakes.            |
| **Conceptual purity vs Enforceability** | Core must stay implementation-agnostic ↔ gates must still be actionable and auditable.     |
| **Local meaning vs Reuse**              | Patterns must remain context‑anchored ↔ authors want to reuse ideas across domains. |
| **Freshness vs timelessness**           | Some claims should be evergreen ↔ others decay and must be refreshed on cadence.    |
## Solution — Profile-based gates for admission and refresh

Establish **Pattern Quality Gates (PQG)**: a conceptual review mechanism that applies **profiles of checks** rather than a single monolithic checklist.

A **Pattern Check Profile (PCP)** is a named bundle of check families. Profiles are **additive**: every review applies a baseline profile, then adds risk-driven profiles as needed.

**Terminology note (disambiguation).** PQG/PCP are editorial review constructs in the authoring plane (Part E). They are distinct from enactment/runtime gating constructs such as `OperationalGate(profile)` / `GateProfile` (A.21), which govern Work transitions and gate decision policies elsewhere in FPF.

**Mint vs reuse.** This pattern mints **PQG**, **PCP**, and the profile IDs **PCP‑BASE/MOD/PRAG/NORM/SOTA/BRIDGE/SUITE/P2W/TERM/DEONT/REFRESH**. It reuses existing FPF terms (e.g., **Delta‑Class**, **DRR**, **Bridge**, **CL**, **SoTA Synthesis Pack**) without changing their meanings.

### Define the review target

A review **SHOULD** leave one findings-first run record against a named target pattern or landing subset. The run MAY propose didactic restructuring or compact repair direction, but its primary obligation is to leave an independent review record that improves downstream usage and interoperability without relying on chat memory or reviewer taste.

Formal/template defects (e.g. non-compliance with E.8 structure or not conforming to RFC deontic terminology) have lower review priority than semantic/ontological defects or non-SoTA Solutions, but they also **MUST** be recorded and later repaired.

E.g. if the header block is missing or incomplete, **continue with ontology and semantic review first**. Treat missing header fields as one mechanical defect to record and route for repair (PCP-BASE #7), not as a reason to stop.

The run **SHOULD** give best-known **Delta-Class (Δ-0…Δ-3)** and record an initial **impact radius** (dependent patterns/tests/relations that need be changed due to pattern norms), using existing definitions where available (e.g., the LEX-AUTH protocol).

If the local workflow separates review from repair, direct target-text patching, unified-diff output, or immediate remediation edits are optional local tactics rather than part of the core `E.19` contract. The core obligation is one findings-first run record plus sufficiently precise repair direction.
### Apply the baseline profile to every run

Every run MUST include **PCP‑BASE**, reviewer depth SHOULD prioritize the load-bearing surfaces in E.19:4.2.1.

1. **Internal coherence (problem ↔ contract ↔ solution)**
   The Conformance Checklist matches Problem statement and the Solution (no “orphan requirements” and no “unclaimed obligations”).
2. **Lexical discipline & reserved vocabulary**
   Terms and registers follow lexical rules; ambiguous “everyday” synonyms do not silently replace kernel vocabulary.
3. **SoTA‑Echoing minimum compliance (E.8)**
   SoTA‑Echoing satisfies the E.8 obligations applicable to the pattern kind (Architectural vs Definitional), including post‑2015 sourcing and explicit adopt/adapt/reject stances. If a SoTA Synthesis Pack exists for the topic, SoTA‑Echoing binds to it rather than forking an untracked narrative; any divergence of pattern norms from contemporary practice is explicitly stated as such. SoTA‑Echoing **MUST** be non‑decorative and **MUST** reflect best-known current practice rather than merely popular defaults for the declared problem. It does not create a second rule layer, but it **MUST** govern the Solution and other load-bearing sections, or those sections **MUST** justify divergence explicitly.
4. **Cross-pattern compatibility & impact radius**
   Relations are consistent with declared dependencies and dependents; declared scope/impact is compatible or explicitly limited.
5. **Didactic grounding**
   Archetypal Grounding is present and teaches the concept with concrete anchors, not only abstractions.
6. **Reader-role fit**
   The live pattern body stays addressed to the intended FPF user rather than to FPF developers or package architects. Load-bearing sections explain lawful use, costs, boundaries, reroutes, and neighbouring relations in user terms. Architecture-placement, freeze/merge posture, and broader package-development rationale stay in separate companions or clearly marked informative placement notes when needed.
7. **Template & section integrity**
   This is lowest priority for review depth and **SHOULD NOT** consume effort that would displace ontology/semantics/modularity/slots/SoTA checks. 
8. **Modularity & contradiction hygiene**
   The pattern **SHOULD NOT** be overloaded or significantly expand obligations/dependencies without an explicit reason and impact record.
   Checks include: scope containment, split/refactor recommendations when warranted, and contradiction scans against neighbor patterns in Relations.
   The pattern SHOULD balance cohesion and coupling across FPF.
   If the pattern defines specialization or layering, it SHOULD NOT mix slot interfaces or parameters from different levels; use explicit `⊑/⊑⁺` or `Uses` cuts instead.

#### Triage: spend depth on load-bearing surfaces without making reviews heavier

PQG is meant to increase *semantic and ontological trust*, not to turn every review into an exhaustive editorial audit on form. To keep reviews feasible while improving the important parts:

* Treat **load-bearing surfaces** as the primary depth targets:
  * the pattern’s **Problem frame**, **Rationale**, and **worked slices** when a new family/profile/specialization would otherwise be intelligible only from project context,
  * reader-role fit in **Problem**, **Solution**, **Consequences**, **Rationale**, and worked slices whenever the draft risks mixing user guidance with package-development rationale,
  * the pattern’s **Conformance Checklist** (the enforceable contract): keep items universal, cognitively ergonomic, not overly prohibitive, and avoid duplicating checks that belong to other patterns (modularity),
  * **deontic clauses** (`MUST/SHALL/SHOULD/MAY`) that define obligations on the authoring/validation plane (not laws of nature or mathematical facts; ensure an explicit conformance subject),
  * **admissibility constraints** (`Invariant:` / `Well-formedness constraint:`) that define valid models (cardinality, typing/kinds, totality) and are written as non-deontic predicates (no RFC keywords inside the predicate),
  * **definitions and mint/reuse decisions** (new terms, renamed terms, scope claims baked into names, names that are not overloaded and are properly chosen),
  * **cross-context / cross-plane claims** (Bridge hygiene and “sameness” assertions),
  * **SoTA** (when the pattern claims state-of-the-art rather than a popular-but-outdated solution or vocabulary),
  * **modularity and Slot discipline of A.6.5** that provide evolvability of FPF,
  * **absence of contradictions in a pattern**,
  * **Relations** that define compatibility and impact radius.
* Treat **low-signal surfaces** as “quick-pass” unless they change meaning: headings, micro-typos, stylistic polish, and non-load-bearing narrative refactors, including RFC-form deontic cleanup.
* **Do not block semantic review on template and RFC compliance defects.** Missing header block fields (E.8 H-5), missing canonical sections, or a missing footer marker are fixable integrity defects. Record them as repair items and continue with the load-bearing surface checks in the same run.
* **Sentence-level precision matters on load-bearing prose.** Reviewers SHOULD inspect load-bearing sentences for generic heads, burden-carrying qualifiers, overloaded trigger words, bare relation shorthand, and hidden process/API metaphors. The default repair order is: restore head kind, then qualifier burden, then comparison/escalation axis homogeneity, and only then judge whether a later Plain or coarsened rendering is lawful.
* **Design-time and run-time both count.** The same precision discipline applies to live FPF pattern prose and to any target publication text, worked slice, or governed runtime exemplar when that text is being assessed for stronger admissibility, guidance, reuse, or gating.
* **Report ordering (impact-first).** In run outputs and remediation direction, prioritize findings on ontology, semantic, modularity and SoTA-related load-bearing surfaces first; group low-signal formatting/typos into one compact tail finding unless they change meaning.
### Add risk-driven profiles

**PCP‑PRAG (Pragmatic utility & adoption)** — Trigger: the pattern is Normative and claims practice guidance.
Checks include: a visible recognition surface early enough for a cold working reader; a recognisable first-minute working situation; one short `Use this when` or equivalent entry; a plain statement of what goes wrong if the pattern is missed; a plain statement of what the pattern buys in practice; a visible ordinary `not this pattern when` boundary; a minimally viable example; non-decorative Consequences/Anti-Patterns; at least one worked slice when the pattern is easy to misuse; a visible assurance surface carrying declaration, law, modeling, and review burden; surface consistency so that the assurance surface does not silently strengthen or universalize the recognition-surface claim; explicit practical payoff in user-facing prose; a short user-facing statement of the governed object and any minimal modeling lens when typed declaration support is load-bearing; nearby pairwise plain glosses for high-pressure technical terms that appear before the heavier harness; a short working-reader implication for any `SoTA-Echoing` rows that carry live explanatory load plus visible linkage to the worked cases or boundary slices they discipline; an explicit primary working reader / concern / viewpoint when several reader families are being served; an explicit `So what?` adoption test; and, when the pattern claims universal or transdisciplinary reach, at least three heterogeneous recognition-surface situations with `F.16` preferred as the compact example-matrix template.
**PCP‑MOD (Modularity & layering discipline)** — Trigger: the review target shows scope creep or level-mixing (e.g., one pattern bundles universal core rules with frame-specific content and discipline-specific method semantics; or it mixes Intension/Description/Spec roles in one object).
Checks include:

* an explicit **core vs extensions** cut (universal invariants are factored into one stable “core”, and extensions reference it rather than re-stating or mutating it),
* no conflation of **specialization vs dependency**: use `⊑/⊑⁺` for refinement/extension and `Uses` for pipelines; do not mix their semantics,
* no conflation of package-form and host-relation roles: **Pack vs Kit vs Suite vs Family vs Bundle vs Cluster vs Profile vs Overlay vs Record vs Umbrella** are not interchanged, and the review states owner status / host relation explicitly instead of leaving it implicit or varying it for style,
* level hygiene: Description-level artefacts do not grow mechanism semantics; MVPK faces remain projections and do not become “the place of truth”,
* slot-discipline hygiene for any ladder: SlotKind invariance is preserved and inherited operations do not gain new mandatory inputs (A.6.5 / A.6.1 specialization discipline).

**PCP‑REFRESH (Staleness & compatibility refresh)** — Trigger: staleness signals are present (e.g., outdated SoTA rows, renamed/superseded Relations targets, terminology drift, or an explicit refresh window in LAT/DRR).
Checks include:

* refresh‑sensitive claims are identified (time‑bounded or ecosystem‑bounded) and either (a) updated with post‑2015 evidence **and** matching Solution changes, or (b) explicitly scope‑limited and labeled as historical lineage,
* Relations are updated to current pattern IDs; deprecations/renames are handled via explicit continuity notes (no silent relabeling),
* when one new or substantially revised pattern subset is being prepared for send or landing, the run explicitly checks which neighboring patterns, host-owner laws, companion patterns, Relations targets, or monolith-backed loci require aligned edits so the subset does not land as one isolated local improvement; the run record states which of those updates landed now, which remain deferred, and why that deferral is still lawful,
* the run records a Delta‑Class and impact radius; if the refresh causes Δ‑2/Δ‑3, it emits/updates a DRR pointer and triggers any required refresh and Bridge obligations defined elsewhere (E.15/F.15/F.9).

Trigger overrides are permitted but intentionally rare: a run MAY override a triggered profile only when it can show the trigger’s risk is genuinely absent *in this case*, and the record MUST name (a) why the trigger is a false positive here and (b) what compensating check(s) were applied instead.

**PCP‑NORM (Normative contract integrity)** — Trigger: the pattern introduces or changes normative requirements, introduces new conformance items, or shifts downstream obligations.
Checks include:

* **Delta‑Class (Δ‑0…Δ‑3)** and **impact radius** are explicit (what breaks, who depends on this),
* requirements are testable in principle (conceptually), scoped, and non-contradictory,
* downstream patterns cited in Relations are compatible with the new contract.
* where the change is Δ‑2/Δ‑3 or a new normative pattern is being admitted: a DRR exists and references the PQG findings (pointer is sufficient; no duplicated prose).

**PCP‑SOTA (Evidence & SoTA alignment)** — Trigger: the pattern’s Solution asserts “best practice”, “state-of-the-art”, or introduces new synthesis claims.
Checks include:

* each “best practice / SoTA” claim in the Solution is explicitly **bound** to SoTA‑Echoing rows (or to SoTA Synthesis Pack identifiers when used), rather than floating as ungrounded prescription, and those rows identify best-known current practice rather than popularity alone,
* novel synthesis is not presented as established SoTA: it is either (a) framed as a scoped hypothesis with explicit limits, or (b) promoted into/registered as a SoTA Synthesis Pack entry before the pattern is admitted as normative guidance; a merely explanatory SoTA note that leaves the load-bearing sections untouched is non-conforming,
* where traditions disagree materially, the pattern surfaces the disagreement and states why it adopts/adapts/rejects (instead of silently selecting one tradition),
* refresh‑sensitive claims (those likely to decay) are explicitly marked with scope limits, timespan notes, or lineage labeling when appropriate.

**PCP‑BRIDGE (Cross‑context/plane reuse integrity)** — Trigger: the pattern imports claims, terms, or norms across contexts, disciplines, or reference planes.
Checks include:

* explicit Bridge usage where required (no silent identity by spelling),
* Congruence / loss is surfaced where applicable,
* any cross-plane reuse is explicitly acknowledged and its penalties do not leak into unrelated assurances.

**PCP‑SUITE (Mechanism-suite integrity)** — Trigger: the review target introduces or revises a suite-level Description that enumerates multiple distinct mechanisms (e.g., `MechSuiteDescription` or a suite specialization) and/or changes suite obligations, contract pins, or suite protocols.
Checks include:

* the suite remains a **Description-level** object: it enumerates member `U.Mechanism.Intension` refs and declares shared obligations/pins, but does **not** define mechanism blocks (`OperationAlgebra`, `Transport`, `Audit`, …) and is not used as a mechanism node,
* membership has **set semantics**: `mechanisms` is duplicates-free and order carries no semantics; any intended ordering is expressed only in `suite_protocols`,
* suite protocols are **closed over membership**: if `suite_protocols` is present, each protocol step references a member mechanism (no “step points outside the suite”),
* the suite is not a family of implementations: it MUST NOT be encoded as a `MechFamilyDescription` (families remain “many realizations of one mechanism”, not “many mechanisms”),
* the suite does **not** mint transport exceptions: any cross-context/plane/kind obligation remains Bridge-only; loss/penalties route to `R/R_eff` only; the suite does not embed CL/Φ/Ψ/Φ_plane tables (references/pins only),
* CG/CN contract pins remain explicit references to the single governance card and legality gate: if suite protocols include numeric comparison/aggregation/scoring, they cite `CG‑Spec` (SCP + Γ-fold + MinimalEvidence) and (where applicable) `CN‑Spec`, rather than duplicating “local CG‑Spec-like” content,
* suite protocols contain **no hidden tails**: if UNM/UINDM/ULSAM are required, the protocol expresses them as explicit `Uses` steps and suite audit obligations cite the chosen mechanism ids/refs (no “implicit normalization/aggregation inside score/compare/select”),
* gate separation is preserved: mechanisms/guards use tri-state `GuardDecision := {pass|degrade|abstain}` and MUST NOT publish `GateDecision` / `DecisionLog`; `block` remains gate-level only (`OperationalGate(profile)`),
* defaults remain single-sourced: portfolio mode, dominance regime, and unknown/failure behavior are either pinned in `TaskSignature` / a single policy map or not claimed; the suite does not define competing defaults,
* when the suite claims reusable outputs, publish/telemetry is explicit and terminates via existing publication surfaces (e.g., G.10 and/or PTM), not as a hidden tail inside a selection step.

**PCP‑P2W (Planned baseline & slot-fillings seam integrity)** — Trigger: the review target introduces or revises WorkPlanning artifacts that pin planned fillers for an owner’s slots (e.g., `SlotFillingsPlanItem` or specializations), and/or introduces view projections of such artifacts.
Checks include:

* the PlanItem remains a **WorkPlanning baseline** (`U.WorkPlan.PlanItem`, `kind = SlotFillingsPlanItem`), not an execution log and not a mechanism,
* planned slot filling stays **WorkPlanning-only**: plan items publish planned fillers/pins (ByValue or `<RefKind>`) and MUST NOT include launch values, `FinalizeLaunchValues` witnesses, gate decisions, or decision logs (these are `U.WorkEnactment` / gate-level only),
* ownership and scope are explicit and non-leaky:
  * the item targets exactly one slot owner via `target_slot_owner_ref`,
  * `target_slot_owner_ref` is a **Description-level, edition-addressable** slot-owner ref (kit/suite) and MUST NOT be a `U.Mechanism.IntensionRef`,
  * the item carries explicit P2W anchors (bounded context; and CG-frame/path-slice/scope anchors when used for legality/selection baselines),
* time is explicit: the item includes `Γ_time_selector` or `Γ_time_rule_ref` (XOR); implicit “latest/current” is nonconformant,
* `planned_fillings` is the authority: duplicate `slot_kind` rows are nonconformant unless the slot owner declares the slot multi-valued; any “indices” are derivable projections and are not maintained independently,
* crossing information is referenced, not duplicated: the plan item (and any associated views) cite CrossingBundle/Bridge/policy-id pins rather than embedding CL/Φ/Ψ/Φ_plane tables or defining transport edges,
* MVPK projections remain projections: any `U.View` face (TechCard/PlainView/InteropCard/AssuranceLane) over a plan item MUST NOT add new claims, MUST NOT introduce “shadow defaults”, and MUST avoid “signature” language (signatures belong to intensional objects),
* if a view publishes edition pins or makes claims about crossing/comparability/selection/launch, it MUST also carry the required audit/ownership pins (UTS + Path pins, crossing pins, applicable guard-owner pins); missing pins are treated as nonconformance and read fail-closed downstream.

**PCP-TERM (Terminology & naming protocol)** — Trigger: the pattern introduces new terms, new U.Types, new “unified names”, redefines existing labels, or leans on load-bearing phrases whose head kind or qualifier burden is not yet restored.
Checks include:

* “mint vs reuse” decision is explicit,
* naming follows the local-first naming protocol and avoids scope smuggling (roles/metrics/stages baked into labels; overloaded words used as terms with a local sense). Remediation **SHOULD** use F.18,
* when PCP-TERM is live, `F.18` winner selection and `A.6.P` follow-through are one mandatory chain rather than two optional passes: the run records candidate heads or phrases reviewed, any kind-conflict / lexical-conflict findings, the provisional F.18 winner plus rejected candidates, and the later `A.6.P` survival result on the repaired phrase,
* generic heads and burden-carrying qualifiers are not accepted at face value on load-bearing surfaces: the review restores the head kind first, and a narrowing qualifier by itself does **not** count as that restoration; only then does the review restore the qualifier burden before deciding whether the phrase is lawful,
* if a sentence compares, escalates, downgrades, or otherwise puts pressure on a phrase after that restoration, the review checks that the comparison axis is ontologically homogeneous,
* the run leaves one explicit account of the resulting governed object, governed move, outside work, and any role-word / package-form decision when the repaired wording still carries architectural burden,
* deprecated aliases and continuity rules are respected.

**PCP‑DEONT (Deontic clause hygiene: RFC keywords)** — Trigger: the pattern conflates admissibility/validity constraints with deontic obligations (e.g., uses RFC keywords where a non-deontic Invariant: predicate is required).
Checks include:
* Deontic requirements are expressed with RFC-style keywords (see H‑8); 
* obligations are not smuggled into prose as informal imperatives. Admissibility/validity constraints are stated non‑deontically as `Invariant:` / `Well‑formedness constraint:` predicates and referenced from the Conformance Checklist when enforceable. 
* **Subject discipline for RFC keywords.** If a sentence uses RFC keywords, its grammatical subject **MUST** be an agent or a publishable artefact (author, reviewer, record, published model). RFC keywords **MUST NOT** modify modeled‑world entities (e.g., “Earth”, “RoleAssignment”, “Role”, “holon”) — express those as `Invariant:` / `Well‑formedness constraint:` predicates instead, and (if needed) reference them from CC items.
### Common cross-source hardening accounts must be explicit in the run record

When the review target is one new or substantially revised live pattern subset, the run record **MUST** leave explicit by-value accounts for the common hardening burdens that otherwise get “remembered manually” by reviewers:

1. **Usability and working-reader fit.** The run must say how the target performed on recognition-surface vs assurance-surface ordering, first-minute working-reader usability, practical payoff, worked slices, primary-reader fit, and the relevant human-facing checks from `E.8`, `E.12`, `E.13`, `E.14`, `E.17.*`, `F.16`, or other applicable pattern-side sources.
2. **Scenario / anti-case / utility-fit basis.** When the current domain or workstream has a scenario pack, anti-case corpus, pilot bank, utility tree, or fitness catalog, the run must say which of those sources were actually checked, which scenarios or anti-cases were exercised, what qualities were under pressure, and what still remains deferred.
3. **Packaging / host-relation / shipping-fit.** The run must say whether host relation, package form, owner-lane placement, send posture, landing posture, monolith posture, and other shipping-facing claims were checked by value, and whether any of those remain blockers or lawful deferrals.
4. **Domain-tightened profile depth.** When a domain-specific mapping note or support stack exists (for example semio `FIT-*` under `E.19`), the run must say which local depth checks were actually used and what they found. Mentioning the mapping note or the PCP stack in the abstract is not enough.

These accounts may conclude `not applicable`, but silent omission is nonconforming.
### Decision outcomes

A PQG run **MUST** end with (a) one compact list of blocking findings and (b) one concrete remediation-direction account.

**Remediation payload.** The run **MUST** provide repair direction precise enough that a later independent repair pass can adopt it into the target text without reinventing the diagnosis. The core obligation is findings-first traceability, not direct patch emission.

**Precision-remediation order.** When a defect sentence combines a generic head, a burden-carrying qualifier, and mixed-axis comparison pressure, remediation SHOULD repair them in that order: restore head kind, then qualifier burden, then comparison-axis homogeneity. A narrowing qualifier does **not** by itself repair the head-kind defect. Only after those repairs may the run keep or reintroduce a Plain, didactic, or coarsened restatement, and only if the more precise upstream reading remains recoverable.

**Report ordering (impact-first).** The blocking findings are the primary artifact. Remediation directions accompany them and SHOULD be listed in descending order of expected impact on semantic trust (load-bearing surfaces first). Template-only issues belong at the end unless they hide missing content.

**Budget discipline (anti-surface-only review).** If the run identifies semantic defects in load-bearing surfaces, remediation direction **MUST** prioritize those fixes; purely mechanical edits (formatting, micro-typos) **MUST** be minimized and **MUST NOT** dominate the review by volume.

**Noise discipline.** The run record is a human-facing audit trail. It **SHOULD** stay sparse: list findings, deferrals, repair direction, and decisions; no per-check pass recital is needed when no defect was found.
## Archetypal Grounding — Tell–Show–Show: System / Episteme

| Scenario | U.System grounding | U.Episteme grounding |
|---|---|
| **Tell** | A safety-critical engineering team proposes a new pattern describing how to gate a subsystem before deployment. The draft looks polished, but it quietly imports domain terms, assumes cross-team equivalences, and introduces obligations that are not listed in its own checklist. | A research group refreshes an older pattern that summarizes how to evaluate evidence strength. The pattern still reads well, but its SoTA references and terminology no longer match current practice, and its Relations point to patterns that were renamed or superseded. |
| **Show (failure without PQG)** | Reviewers focus on whether the idea is good and whether the template exists. The pattern is admitted, but later users disagree on what it requires because the Conformance Checklist is incomplete and key constraints are only in prose. | The pattern remains unchanged because “nothing looks broken”. Over time, it becomes a conceptual fossil: newcomers treat it as current guidance, but it encodes an outdated stance and stale vocabulary. |
| **Show (repair with PQG profiles)** | PCP‑BASE finds missing internal coherence (requirements in prose not reflected in CC). PCP‑TERM finds naming drift and scope-smuggling in new terms. PCP‑BRIDGE finds implicit cross-context identity claims without explicit alignment. The findings-first run record then routes one repair pass before admission, and the final CC becomes the canonical contract. | The run record leaves one explicit decision: update SoTA‑Echoing with post‑2015 guidance and appropriate Solution changes, limit the scope to “historical lineage” where appropriate, and update Relations to current dependencies. The refreshed pattern becomes trustworthy again, and any remaining historical material is clearly labeled as such. |
## Bias-Annotation

Lenses tested: **Gov**, **Arch**, **Onto/Epist**, **Prag**, **Did**. Scope: **Universal** (applies to all patterns and all clusters).

Bias risks and mitigations:

* **Governance bias (Gov):** reviewers may over-prioritize “compliance posture” and under-prioritize teaching value.
  *Mitigation:* PCP‑BASE includes didactic grounding and internal coherence checks and priority for ontology and semantics, not to form.
* **Epistemic monoculture (Onto/Epist):** SoTA‑Echoing can become single-tradition name-dropping.
  *Mitigation:* require explicit multi-tradition coverage and usage of F.18 for neutral naming.
* **Pragmatic bias (Prag):** a pattern can be “correct” yet unusable.
  *Mitigation:* consequences and anti-patterns remain mandatory sections, surfacing trade-offs and misuse paths.
* **Didactic bias (Did):** narrative quality can be mistaken for truth.
  *Mitigation:* conformance and SoTA‑Echoing sections bind claims to explicit obligations and lineage.
## Conformance Checklist

| ID | Requirement | Purpose |
| --- | --- | --- |
| **CC-E19-1 (Baseline is mandatory).** | Every PQG run **MUST** apply **PCP-BASE** to the review target. | Ensures a uniform minimum gate across all pattern kinds. |
| **CC-E19-2 (Profile selection is auditable).** | The run record **MUST** state (a) the selected PCPs, (b) the trigger(s) for each non-BASE profile, and (c) any override decisions. Any override of a triggered profile **MUST** record why the trigger is a false positive and what compensating check(s) were applied instead. The run record **MUST** account for the whole current profile set rather than only the selected profiles or the easiest visible trigger family; a deontic-only or selected-stack-only recital is nonconforming. | Makes depth decisions repeatable and reviewable. |
| **CC-E19-3 (Delta-Class & impact for breaking change levels).** | If the run proposes or accepts a change that is **Δ-2/Δ-3** (per E.15), the run record **MUST** include Delta-Class, an impact radius, and a DRR pointer; it **MUST** confirm that required refresh and Bridge obligations are triggered where applicable. | Keeps evolution controlled and compatible with downstream dependencies. |
| **CC-E19-4 (Contract coherence is enforced).** | Remediation **MUST** eliminate “orphan” obligations and “unclaimed” requirements by aligning the target pattern’s Conformance Checklist, deontic clauses, and admissibility constraints with its Solution. | Preserves the CC as the enforceable contract surface. |
| **CC-E19-5 (Triage & noise discipline).** | The run **SHOULD** prioritize load-bearing surfaces (e.g. CC, content of deontic clauses and content of admissibility constraints, definitions, Relations, SoTA, modularity) and keep purely mechanical edits (e.g. RFC-form deontic cleanup) minimal. Template defects **MUST** be fixed before admission (or before closing a refresh run) but **MUST NOT** be used to skip semantic review. | Improves semantic trust without turning review into surface-only compliance. |
| **CC-E19-6 (Findings-first remediation direction).** | The run output **MUST** include one compact list of blocking findings plus concrete remediation direction, ordered by semantic impact (load-bearing surfaces first). Findings stay primary; direct patch text is optional local workflow, not the core `E.19` artifact. | Ensures actionability and independent repeatability without collapsing review into repair. |
| **CC-E19-7 (Recognition surface, assurance surface, and self-containment).** | Admission or refresh runs for new and substantially revised patterns **MUST** check that a recognition surface appears early enough for the intended reader, that the heavier assurance surface remains visibly second rather than becoming the first real point of entry, and that the assurance surface does not silently shift the recognition-surface claim. The run **MUST** check for a recognisable working situation, what goes wrong if the pattern is missed, what the pattern buys, and an ordinary `not this pattern when` boundary; for any load-bearing typed declaration or modeling lens, the run **MUST** confirm that a short user-facing statement surfaces the governed object and the minimal lens that keeps it reviewable; the run **MUST** also check that the governed object keeps one stable kind across title, opening surface, declaration surface, worked slices, and neighbouring-owner guidance rather than drifting between object, act, work-product, and owner-lane labels. When a broader umbrella name and a narrower operative branch are both live, the run **MUST** check that the recognition surface makes that stack explicit enough to identify the umbrella, the active branch, the governed object, the move, and the wider work or process that still remains outside. The recognition surface **MUST** start from a recognisable problem-owning domain or practice moment whenever that can be done without loss of precision, rather than opening first with internal package architecture or taxonomy language. Early high-pressure technical terms **MUST** receive nearby pairwise plain glosses; transform-like families **MUST** carry concrete worked slices plus ordinary-vs-load-bearing guidance where needed; and any `SoTA-Echoing` used as live explanatory support **MUST** state a short practitioner or manager implication plus visible linkage to the worked cases or boundary slices it disciplines. If SoTA or practice tradition is load-bearing, the run **MUST** check that governed-object choice, narrowed-branch choice, and practical payoff remain answerable to the relevant domain or practice rather than only to internal package architecture. If a pattern claims universal or transdisciplinary usefulness, the run **MUST** check that this breadth is already demonstrated in the recognition surface through at least three heterogeneous situations, with `F.16` preferred as the example-matrix template. | Prevents architecturally correct but reader-opaque patterns and keeps broad claims from appearing only late in the assurance surface. |
| **CC-E19-8 (Sentence-level precision restoration).** | Load-bearing sentences **MUST** be reviewed for generic heads, burden-carrying qualifiers, overloaded trigger words, bare relation shorthand, and hidden process/API metaphors. A narrowing qualifier does **not** by itself restore head kind. The default repair order is head kind first, qualifier burden second, comparison-axis homogeneity third. When broad umbrella words such as `interpretation`, `reading`, `review`, `surface`, `document`, or `artifact` are carrying live architectural or semantic load, the run **MUST** also restore whether the text names an umbrella, a narrowed branch, a governed object, a move, or a wider work/process lane before that wording is allowed to carry architectural burden. When naming or terminology repair is load-bearing, the run record **MUST** leave one explicit `F.18 -> A.6.P` account on disk: candidate heads or phrases reviewed, mint-vs-reuse decision, provisional F.18 winner plus rejected candidates, any kind-conflict / lexical-conflict findings, the `A.6.P` survival result on the repaired phrase, and the resulting governed object / governed move / outside-work reading if the wording still carries architectural burden. | Keeps controlled technical writing from collapsing into free shorthand or false precision. |
| **CC-E19-9 (Package-form and host-relation role-word discipline).** | Reviews **MUST** check that role words such as `owner`, `specialization`, `profile`, `overlay`, `family`, `bundle`, `cluster`, `suite`, `pack`, `kit`, `record`, and `umbrella` match the actual ontology of the case and do not drift by stylistic substitution. When naming or ontology repair introduces or retains one head already occupied elsewhere in FPF, the run **MUST** explicitly account for that occupied-kind / occupied-head conflict and say whether the same occupied meaning is intentionally reused or instead blocked as a collision. | Keeps host relations, review surfaces, and package forms semantically legible. |
| **CC-E19-10 (Reader-role discipline).** | Reviews **MUST** check that live pattern sections are written for the intended FPF user, that any multi-reader draft makes its primary working reader / concern / viewpoint explicit enough, and that package-development reasoning about isolation, landing form, freeze, merge posture, later promotion, safest move, blast radius, or defer posture stays in separate companions or clearly marked informative placement notes. The run record **MUST** name the user-facing sections scanned for this leak family and any repaired or still-informative exceptions. | Keeps reviews from accepting conceptually correct but role-confused patterns. |
| **CC-E19-11 (Precision before relaxation).** | If remediation preserves or introduces a Plain, didactic, or coarsened restatement of a repaired load-bearing sentence, the run **MUST** keep a more precise upstream reading recoverable and must not let the softened form become the only authority-bearing surface. | Keeps later readability aids subordinate to an explicit stronger reading. |
| **CC-E19-12 (Integration impact is accounted for).** | Before send or monolith-facing motion for one new or substantially revised pattern subset, the run record **MUST** explicitly account for neighboring patterns, host-owner laws, companion notes, Relations targets, or current monolith sections that now require aligned edits. The run **MUST** say which such updates landed now, which are deferred, and why any deferral is still lawful for the claimed boundary. | Prevents one locally stronger pattern from landing as an isolated mismatch in the wider FPF pattern set. |
| **CC-E19-13 (Usability account is explicit).** | For one new or substantially revised live pattern subset, the run record **MUST** leave one explicit usability / working-reader-fit account by value: recognition-surface vs assurance-surface verdict, first-minute working situation, practical payoff, ordinary boundary, worked-slice coverage, primary reader or viewpoint, and the applicable pattern-side human-facing checks used (`E.8`, `E.12`, `E.13`, `E.14`, `E.17.*`, `F.16`, or clearly named local equivalents). | Prevents cold-reader usability from being treated as something the reviewer “just kept in mind”. |
| **CC-E19-14 (Scenario / anti-case / utility-fit account is explicit).** | When the current domain or workstream has a scenario pack, anti-case corpus, pilot bank, utility tree, fitness catalog, or analogous common check source, the run record **MUST** explicitly state which of those sources were consulted, which scenarios or anti-cases were actually checked, which qualities or fitness pressures were load-bearing, and what remains deferred. | Prevents scenario, anti-case, and fitness checks from disappearing into reviewer memory or external-review folklore. |
| **CC-E19-15 (Packaging / host-relation / shipping-fit account is explicit).** | Before any send-facing, landing-facing, or monolith-facing posture claim, the run record **MUST** explicitly account for host relation, package form, owner-lane placement, send posture, landing posture, monolith posture, and other shipping-facing claims that matter for this target. It **MUST** say what was checked, what was blocked, what was cleared, and why the claimed boundary is lawful now. | Keeps packaging and shipping checks from being inferred loosely after one local text improvement. |
| **CC-E19-16 (Domain-tightened profile depth is explicit).** | When a domain-specific mapping note or support stack exists under `E.19` (for example semio `FIT-*` or equivalent local depth checks), the run record **MUST** explicitly state which such local checks were used, which PCP load they tightened, and what they found or explicitly did not find. | Keeps local review depth auditable and prevents domain-specific checks from becoming optional folklore around the PCP stack. |
## Common Anti-Patterns and How to Avoid Them

| Anti-pattern | Symptom | Why it fails (force violated) | How to avoid / repair |
| ---------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------- |
| **Governed-object drift** | The draft appears to govern one thing in the opening, another in the declaration block, and a third in the examples or neighbouring-owner guidance. | Review cannot tell whether the pattern governs an object, a reading move, a work-product, or a whole process, so later naming and boundary decisions become unstable. | Stabilise one governed object early, keep its head kind explicit, and mark note/sheet/UI/rendering/process labels as either examples of that object or separate neighbouring entities rather than stylistic substitutes. |
| **Role-clean but pragmatically foggy** | The draft is addressed to the right reader in principle, but cold working readers still cannot recognise the situation, practical payoff, governed object, or first useful move early enough. | The run passes role hygiene while still failing pragmatic fit and first-minute usability. | Pull a recognisable working situation upward, add one minimally viable worked case, make the practical payoff explicit in nearby user-facing prose, surface the governed object and any minimal modeling lens in plain terms, add plain glosses for early high-pressure terms, and require `SoTA-Echoing` rows that carry live load to name the practitioner or manager implication plus the case they discipline. |
| **Architecture-clean but domain-thin** | The text is internally well placed in the package, but the governed object, narrowed branch, or practical payoff are justified mainly through package architecture while the problem-owning domain, practice, or SoTA appears late or decoratively. | The pattern passes internal architecture checks while drifting away from the domain whose work it claims to improve. | Pull the problem-owning domain moment into the recognition surface, make the narrowed branch and governed object answerable to the relevant domain or practice, and require load-bearing `SoTA-Echoing` to discipline the practical cases rather than merely bless them after the fact. |
| **Verdict-only review** | The run ends with “pass/fail” and prose complaints, but no precise findings-first repair direction. | Raises editorial cost; reduces repeatability. | Require one findings-first run record plus concrete remediation direction; do not rely on direct patch text as the primary artifact. |
| **Single giant checklist** | Review becomes a long, unfocused ritual that few complete. | Increases cost; reduces fit and rigor in practice. | Use a minimal baseline plus triggered profiles. |
| **Template-only compliance** | All headings exist, but obligations are vague and untestable. | Looks uniform; fails enforceability and auditability. | Enforce normative clause hygiene and CC/Solution coherence. |
| **SoTA name-dropping** | SoTA-Echoing is a list of buzzwords with no stance. | Breaks evidence lineage; invites monoculture. | Require adopt/adapt/reject with reasons per item. |
| **Terminology drift by “synonym”** | Authors swap kernel terms for nicer-sounding words. | Increases ambiguity; harms cross-pattern composability. | Apply PCP-TERM and require explicit mini-definitions on first use. |
| **Surface-only review** | Review time goes to formatting and micro-edits while the normative surface, terms, Bridges, modularity, slot discipline and SoTA stance are barely checked. | Raises editorial cost without raising semantic trust. | Use the triage rule: treat load-bearing surfaces as depth targets and keep mechanical cleanup subordinate to semantic correction. |
| **Architecturally right, didactically thin** | The family is lawful, but readers still need project notes to understand what the pattern really governs. | Trust in the monolith depends on external context rather than the pattern text. | Strengthen problem frame, worked slices, local definitions, and reroute guidance before admission. |
| **Scenario-name grounding** | Grounding names a situation but does not show what the source and resulting publication actually look like. | Readers cannot tell why the case stays in the family or where it exits. | Add concrete source/result slices, especially for transform families and easy boundary confusions. |
| **Generic-head underspecification** | A load-bearing phrase uses a generic head such as `note`, `view`, `guidance`, `output`, or `artifact`, but the run leaves that head uninterpreted. | Review discusses the sentence before the object kind is even stable. | Restore the head kind first in host-local terms before accepting or comparing the sentence. |
| **Qualifier-smuggled burden** | A modifier such as `comparative`, `safe`, `interactive`, `reliable`, or `faithful` is doing the semantic work while the run treats the phrase as already precise. | The review blesses apparent precision without recovering the actual burden. | Unpack the qualifier into explicit burden, comparison basis, or stronger-use boundary before acceptance. |
| **Mixed comparison axis** | One sentence compares or ranks artifact-like, process-like, authority-like, or owner-like things on one axis. | The sentence remains ontologically incoherent even after local wording is polished. | Restore head kind, then qualifier burden, then rewrite the comparison through a homogeneous burden/threshold/handoff axis. |
| **Sentence-level shorthand drift** | A few innocent-looking words (“species”, “branch”, “flow”, “input/output”) quietly carry the semantic burden. | Review passes while key relations remain implicit or wrong. | Inspect load-bearing sentences one by one and replace shorthand with explicit host relations or publication language. |
| **Package-form and host-relation drift** | The text slides between `family`, `bundle`, `cluster`, `profile`, `overlay`, `suite`, `kit`, or `record` without showing that the ontology changed. | Reviews miss owner blur because each local sentence still sounds plausible. | Require one intended role word, check host relation explicitly, and treat stylistic noun-swapping as a semantic defect. |
| **Reader-role leakage** | Live sections explain why the pattern was isolated, what landing form is safest, or why merge/freeze is premature. | Review accepts a package memo disguised as a user pattern. | Move package-development reasoning to companions; rewrite live sections in terms of what the user may do, must avoid, and when the case reroutes. |
## Consequences

| Benefits                                                                         | Trade-offs / Mitigations                                                                   |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Repeatable admission decisions** — reviewers share a common gate language.     | More explicit editorial work; mitigated by a small baseline and triggered profiles.        |
| **Higher trust in the normative surface** — CC becomes the enforceable contract. | Authors must align prose and CC carefully; mitigated by coherence checks.                  |
| **Controlled evolution** — runs prevent conceptual bit-rot.              | Periodic workload; mitigated by prioritizing high-dependency and high-risk patterns first. |
| **Less hidden drift** — terminology and cross-context reuse become explicit.     | Some drafts will be delayed; mitigated by early profile selection during authoring.        |
## Rationale

Patterns are both **teaching artifacts** and **normative contracts**. A specification that grows without explicit quality gates becomes a patchwork: locally good, globally inconsistent. A profile-based gate is the smallest structure that keeps reviews repeatable while remaining sensitive to risk and pattern kind.

The baseline profile protects cross-pattern comparability and editorial sanity. Triggered profiles keep depth where it matters: norms, SoTA claims, cross-context reuse, terminology changes, legacy refresh, and reader-role fit. A pattern that is lawful in package terms but speaks to the wrong reader is still a review defect.
## SoTA-Echoing — post-2015 review/validation practice alignment

**Evidence binding note.** If a SoTA Synthesis Pack exists for review/validation or refresh discipline in your Context, cite it and keep this section consistent with it; otherwise treat the table below as a provisional seed that should not be duplicated elsewhere without an explicit update record.

| Claim (E.19 need)                                                      | SoTA practice (post‑2015)                                                                                   | Primary source (post‑2015)                                                                  | Alignment with E.19                                                                       | Adoption status                                                                                              |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Reviews need explicit criteria, not informal taste.                    | Move from folklore validation to explicit validation methods and documented criteria.                       | Riehle et al. (2020), “Pattern Discovery and Validation Using Scientific Research Methods”. | PCPs make criteria explicit; CC coherence is enforced.                                    | **Adopt.** Keep methods lightweight but explicit.                                                            |
| A stable structure improves comparability and reduces ambiguity.       | Standards specify required viewpoints/concerns and consistency rules for descriptions.                      | ISO/IEC/IEEE 42010:2022 (architecture description).                                         | PCP‑BASE includes structural integrity and internal consistency.                          | **Adopt/Adapt.** Adopt conformance mindset; adapt to pattern-language template and didactic grounding.       |
| Pattern writing benefits from explicit guidance plus critique culture. | Pattern-language communities emphasize clear template usage, consequences, and critique for quality.        | Iba (2021), “How to Write Patterns …” (PLoP 2021).                                          | Baseline checks enforce meaningful sections; anti-patterns make critique concrete.        | **Adopt.** Directly supports admission quality.                                                              |
| “Living” guidance needs refresh discipline.                            | Reporting and review guidance is updated and versioned; reviewers track changes and report deltas clearly. | Page et al. (2021), PRISMA 2020 statement and explanation papers.                           | Runs require explicit decisions and deltas in SoTA‑Echoing. | **Adapt.** Use the “versioned guidance + explicit deltas” principle without importing implementation or process mandates. |
## Relations

* **Builds on:**

  * `E.8` (authoring conventions; canonical section order; SoTA‑Echoing obligations)
  * `E.10` (lexical discipline and reserved vocabulary)
  * `E.9` (design rationale records for changes that affect semantics)
  * `E.15` (authoring/evolution protocol; harness mindset; refresh planning)
  * `A.6.5` (slot discipline; SlotKind/ValueKind/refMode invariants)
* **Coordinates with:**

  * `F.8` (mint vs reuse decisions)
  * `F.18` (local-first naming protocol)
  * `F.9` (cross-context alignment discipline)
  * `F.15` (conceptual harness and regression framing)
  * `E.17` (MVPK / `U.View` projection discipline)
  * `A.6.7` (`MechSuiteDescription` suite-level semantics)
  * `A.15.3` (`SlotFillingsPlanItem` P2W planned-baseline seam)
  * `G.11` (refresh/decay orchestration principles, where applicable)
## E.19:End
