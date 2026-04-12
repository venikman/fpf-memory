---
title: "Didactic Architecture of the Spec"
description: "Part E - The FPF Constitution and Authoring Guides"
---

# Didactic Architecture of the Spec
> Pattern `E.6` · Stable
> Part E - The FPF Constitution and Authoring Guides

FPF addresses readers from at least two characteristics of diversity:

## Keywords

- didactic
- pedagogy
- structure
- narrative flow
- on-ramp
- learning.

## Content

## Problem frame

FPF addresses readers from at least two characteristics of diversity:

* **Disciplinary** – systems engineers, knowledge scientists, ethicists.  
* **Experience** – newcomers need intuition; experts need rigour.

Past drafts mixed governance mandates with domain examples, producing a
steep learning curve and repeated “forward‑reference” detours.
## Problem

If core ideas are buried under formalism or scattered across parts,
readers either give up or misuse the framework. We need a didactic
macro-order that guides cognitive load from low to high while keeping
normative sections discoverable, without letting readers confuse
document order with one universal first-practical workflow.
## Forces

| Force | Tension |
|-------|---------|
| **Cognitive Load** | Early clarity ↔ eventual formal depth. |
| **Conceptual Integrity** | Foregoing examples risks abstraction ↔ too many examples delay axioms. |
| **Didactic order vs practical entry** | Stable document macro-order ↔ truthful first-practical routes that may cross parts. |
## Solution — “On‑Ramp to Archetypes first, Authoring last” sequence

### Document order is not the same thing as first-practical entry

The macro-order of the document is a didactic scaffold, not a universal practical workflow. Route-bearing navigation surfaces such as the `Preface`, `J.4`, route-bearing owner patterns, and route-indexed walkthroughs are informative navigation only: they may cross Parts when that is the first honest entry for the burden at hand, and they do not create a second normative lifecycle.

The "On-Ramp First" Macro-Structure: The specification is ordered to create a smooth cognitive ramp:
* It begins with an informal, non-normative Preface (The On-Ramp), which uses storytelling and concrete examples (System and Episteme) to build intuition.
* It then proceeds through the normative Parts (A-D), moving from the foundational kernel to the rich patterns of trans-disciplinary reasoning.
* It concludes with the authoring rules (Part E) and appendices, ensuring that this "meta" content does not obstruct the primary learning path.

1. **Preface (On‑Ramp)**  
   Informal tour; introduces `U.System` and `U.Episteme` via concrete
   stories before any normative language appears.

2. **Part A Kernel**  
   Minimal holonic ontology and the Transformer principle give readers
   the essential vocabulary.

3. **Part B Trans‑disciplinary Reasoning**  
   Tell‑Show‑Show pedagogy: universal rule → Sys‑CAL example →
   KD‑CAL example.

4. **Part C Extension Patterns**  
   Domain‑specific calculi expand on the examples already seen.

5. **Part D Ethics & Conflict Optimisation**  
   Shows reflective patterns only after readers grasp holonic reasoning.

6. **Part E Authoring**  
   Constitution, guard‑rails, and contributor rules come last; novices
   can postpone reading.

7. **Appendices (Annexes)**  
   Tutorials, tooling guides, and migration scripts live here.
## Archetypal Grounding (System / Episteme)

| Narrative layer | First sight of `U.System` | First sight of `U.Episteme` |
|-----------------|---------------------------|-----------------------------|
| Preface | Coffee‑machine story (pump as system). | Meta‑analysis story (study bundle as episteme). |
| Part A | Formal definition inherits boundary invariant. | Formal definition inherits F‑G‑R coordinates. |
| Part B Tell‑Show‑Show | Γ\_sys example: assemble pump. | Γ_epist example: merge study bundle. |
## Conformance Checklist

| ID | Requirement |
|----|-------------|
| **CC‑DA.1** | Each Part **SHALL** open with a one‑paragraph situational “hook” before formal text. |
| **CC‑DA.2** | Every architectural pattern **MUST** implement Tell‑Show‑Show: universal rule plus System & Episteme illustrations. |
| **CC‑DA.3** | Governance patterns (**Part E**) **SHALL NOT** appear before the Kernel in the main document flow. |
| **CC‑DA.4** | Navigation aids **SHALL** distinguish document order from first-practical entry routes; entry routes are informative and MAY cross Parts without implying a universal lifecycle. |
## Consequences

| Benefits | Trade‑offs / Mitigations |
|----------|-------------------------|
| Smooth learning curve; readers can stop at their needed depth. | Template discipline required; mitigated by authoring guide (E.8). |
| Reduces forward‑reference clutter; each concept is primed before formal use. | Preface evolves when new archetypes added; handled via On‑Ramp revision DRR. |
## Rationale

Educational research shows retention improves when abstract rules are
immediately paired with contrasting illustrations. By fixing the reading
order and mandating Tell‑Show‑Show inside every architectural pattern, FPF
embeds pedagogy into its architecture, realising Pillars **P‑2 Didactic
Primacy** and **P‑1 Cognitive Elegance** without weakening rigour.
## Relations

* **Depends on:** `pat:constitution/guard‑rails` (GR‑1 ensures example jargon stays outside Core).  
* **Constrains:** Placement of all Parts, patterns, and appendices.  
* **Instantiates pillars:** P‑1, P‑2
## E.6:End
