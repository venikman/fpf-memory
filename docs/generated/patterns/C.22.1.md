---
title: "Task-family adaptation signature"
description: "Part C - Kernel Extension Specifications"
---

# Task-family adaptation signature
> Pattern `C.22.1` · Stable
> Part C - Kernel Extension Specifications

**One-screen purpose (manager-first).**
Make a specialization claim publishable as one typed adaptation record over a declared `TaskFamilyRef` or `TaskSignature`, so later selector and parity work compares the same threshold target, budget burn, prior exposure, transfer, durability, downside, and corridor-entry burden rather than reconstructing that story from narrative prose.

**Builds on.** `C.22` (TaskSignature attachment and task-family anchoring), `C.19.1` (`BLP` compatibility), `A.15` (role/method/work split for scout/probe work), `C.24` (`CheckpointReturn` planning semantics), `E.16` (budget enforcement).
**Coordinates with.** `G.5` (selector specialization profiles), `G.9` (adaptation parity), `G.11` (later telemetry / refresh reuse).
**Keywords.** adaptation signature; task-family specialization; time-to-threshold; budget-to-threshold; prior exposure; corridor entry; stepping stone; transfer; retention; downside burden.

Final task score alone does not tell whether a holder, dyad, or bounded specialist portfolio acquired usable specialization quickly, under what budget, with what prior exposure, whether the resulting competence transferred, or whether it entered a genuinely new solution corridor. If those elements are not published together, the adaptation claim splinters across task typing, probe notes, selector prose, and parity notes, and later readers can no longer tell what exactly was being compared.

## Keywords

- adaptation signature
- time-to-threshold
- budget-to-threshold
- prior exposure
- corridor entry
- stepping stone.

## Relations

- `C.22.1` --builds_on--> [Problem Typing & TaskSignature Assignment (Problem‑CHR)](/generated/patterns/C.22)
- `C.22.1` --builds_on--> [Bitter‑Lesson Preference (BLP)](/generated/patterns/C.19.1)
- `C.22.1` --builds_on--> [Role–Method–Work Alignment (Contextual Enactment)](/generated/patterns/A.15)
- `C.22.1` --builds_on--> [Agentic Tool‑Use & Call‑Planning (C.Agent‑Tools‑CAL)](/generated/patterns/C.24)
- `C.22.1` --builds_on--> [RoC‑Autonomy Budget & Enforcement](/generated/patterns/E.16)
- `C.22.1` --coordinates_with--> [Multi‑Method Dispatcher & MethodFamily Registry](/generated/patterns/G.5)
- `C.22.1` --coordinates_with--> [Parity / Benchmark Harness](/generated/patterns/G.9)
- `C.22.1` --coordinates_with--> [Telemetry-Driven Refresh & Decay Orchestrator](/generated/patterns/G.11)
- `C.22.1` --constrained_by--> [LEX-BUNDLE: Unified Lexical Rules for FPF](/generated/patterns/E.10)
- `C.22.1` --constrained_by--> [Pattern Quality Gates: Review & Refresh Profiles](/generated/patterns/E.19)
- `C.22.1` --outline_parent--> [Problem Typing & TaskSignature Assignment (Problem‑CHR)](/generated/patterns/C.22)
- `C.22.1` --explicit_reference--> [Problem Typing & TaskSignature Assignment (Problem‑CHR)](/generated/patterns/C.22)
- `C.22.1` --explicit_reference--> [Bitter‑Lesson Preference (BLP)](/generated/patterns/C.19.1)
- `C.22.1` --explicit_reference--> [Role–Method–Work Alignment (Contextual Enactment)](/generated/patterns/A.15)
- `C.22.1` --explicit_reference--> [Agentic Tool‑Use & Call‑Planning (C.Agent‑Tools‑CAL)](/generated/patterns/C.24)
- `C.22.1` --explicit_reference--> [RoC‑Autonomy Budget & Enforcement](/generated/patterns/E.16)
- `C.22.1` --explicit_reference--> [Multi‑Method Dispatcher & MethodFamily Registry](/generated/patterns/G.5)
- `C.22.1` --explicit_reference--> [Parity / Benchmark Harness](/generated/patterns/G.9)
- `C.22.1` --explicit_reference--> [Telemetry-Driven Refresh & Decay Orchestrator](/generated/patterns/G.11)
- `C.22.1` --explicit_reference--> [LEX-BUNDLE: Unified Lexical Rules for FPF](/generated/patterns/E.10)
- `C.22.1` --explicit_reference--> [Pattern Quality Gates: Review & Refresh Profiles](/generated/patterns/E.19)

## Content

## Problem frame

Final task score alone does not tell whether a holder, dyad, or bounded specialist portfolio acquired usable specialization quickly, under what budget, with what prior exposure, whether the resulting competence transferred, or whether it entered a genuinely new solution corridor. If those elements are not published together, the adaptation claim splinters across task typing, probe notes, selector prose, and parity notes, and later readers can no longer tell what exactly was being compared.
## Problem

FPF needs one compact way to publish a bounded specialization claim on the same declared task family and work target without retyping the task anchor from `C.22` or silently pushing the adaptation burden into selector/parity prose.
## Use this when

- the governed claim is not only that a holder or dyad solved a task, but how fast it acquired usable specialization on a declared task family
- comparison must stay honest about the work-measure threshold target, prior exposure, adaptation budget, transfer burden, and reuse window
- movement into a new solution corridor or stepping-stone family is part of the real novelty burden
## What goes wrong if missed

- adaptation claims collapse into vague `got better` language with no declared work-measure threshold target or budget-to-threshold account
- parity later compares outcomes that were reached under different prior exposure, different work-measure threshold targets, or different reuse windows
- nonhuman or unfamiliar solution corridors are either romanticized as novelty or dismissed as noise because the corridor entry was never typed
## What this buys

- adaptation speed becomes reviewable by value on the same declared `TaskFamily` and work target
- later `G.5 / G.9` portfolio and parity work can compare the same specialization object instead of reconstructing it from narrative prose
- stepping-stone or solution-corridor movement becomes visible as one typed part of the adaptation claim rather than one afterthought
## Forces

| Force | Tension |
| :--- | :--- |
| Threshold crossing vs final score | A static outcome can look similar even when one system specialized much faster or more cheaply than another. |
| Local novelty vs reproducible evidence | Corridor-entry claims matter, but they are easy to over-romanticize when no baseline or entry evidence is published. |
| Task anchor vs adaptation burden | The section must keep the adaptation-signature burden readable without retyping task anchoring from `C.22` or turning selector/parity law into the same pattern. |
| Reuse upside vs specialization cost | Transfer, retention, and downside matter to the same claim even when the first threshold crossing looks impressive. |
## Solution — one adaptation signature over the C.22 anchor

- Use one shared adaptation-signature field set for this burden. `G.5`, `G.9`, and later notes may cite or consume it, but they should not silently rename threshold, prior-exposure, transfer, downside, or corridor-entry terms.
- When specialization is the governed burden, publish one adaptation signature bound to the declared `TaskFamilyRef` or `TaskSignature`, not one generic improvement claim.
- The signature should expose at least:
  - `thresholdTarget`
  - `timeToThreshold`
  - `budgetToThreshold`
  - `postThresholdEfficiency?`
  - `priorExposureDeclaration`
  - `transferTarget?`
  - `transferGain?`
  - `retentionWindow?`
  - `downsideBurden?`
  - `corridorEntryBaseline?`
  - `corridorEntryEvidence?`
  - `steppingStoneEvidence?`
- These fields stay anchored to the same work target and work-measure threshold semantics already declared by `C.22`, so adaptation is typed as movement toward usable specialization rather than as an ungrounded growth story.
- `C.22` continues to carry the declared task-family anchor, task typing, and baseline `TaskSignature`. `C.22.1` narrows the adaptation burden to threshold timing, reuse, downside, and corridor-entry disclosure over that existing anchor.
## Corridor, transfer, and durability discipline

- If the adaptation claim depends on entering a new solution corridor, publish the `corridorEntryBaseline` first: the prior repertoire, baseline set, or comparison family relative to which corridor entry is being claimed.
- Then publish the `corridorEntryEvidence` that marks real entry into that corridor rather than exotic accident, for example a reproducible solution class, a stable descriptor shift, or one explicit stepping-stone sequence.
- If a stepping stone mattered, publish the stepping-stone evidence as part of the adaptation signature rather than treating it as retrospective color.
- Corridor or stepping-stone notes do not replace the work-measure threshold account; they explain why the adaptation path matters, not whether the threshold was actually reached.
- A fast threshold result is not yet enough to claim durable specialization.
- If transfer to a neighboring task family is claimed, name the transfer target and the observed gain explicitly.
- If retention is claimed, name the reuse or retention window rather than letting durability hide inside one isolated run.
- If specialization harms neighboring task families, narrows reusable competence, or creates de-specialization cost, publish that in `downsideBurden?` rather than telling only the upside story.
- If post-threshold performance matters to later exploitation, publish `postThresholdEfficiency?` so the claim is not trapped at the threshold-crossing moment only.
## Worked moment

- Two agentic research setups both eventually reach an acceptable threshold on a new catalyst-search task family.
- One of them reaches threshold after a small probe budget, shows a declared transfer gain on one adjacent task family, and records that the winning path entered a previously unused solution corridor.
- The other reaches threshold only after much larger budget and without any reusable transfer.
- The adaptation signature makes that difference publishable without pretending that both runs express the same specialization story.
## Consequences

- Threshold speed, budget burn, prior exposure, and post-threshold efficiency become part of the same reviewable object instead of one after-the-fact prose explanation.
- Selector and parity surfaces can consume a stable upstream specialization object without minting shadow vocabularies.
- Corridor-entry and downside burdens stay visible in the same claim that celebrates the specialization gain, reducing romanticized novelty talk.
## Rationale

The reader needs one place where the adaptation claim stays whole. `C.22` keeps the task family and work target explicit. `A.15`, `C.24`, and `E.16` may generate the probe, checkpoint, and budget evidence. `G.5` and `G.9` later compare several candidates or parity runs. `C.22.1` keeps the specialization story readable across those surfaces by making threshold timing, reuse, downside, and corridor-entry burden recoverable in one short read instead of forcing the reader to reconstruct it from scattered notes.
## SoTA-Echoing

**Claim 1.** Current frontier adaptation work judges usable specialization by threshold-crossing under bounded resources, not by terminal score alone.

**Practice / source / alignment / adoption.** Contemporary frontier lines in refinement-heavy `QD`, self-play/task-discovery, and agentic adaptation repeatedly separate threshold target, budget burn, transfer, and reuse burden from one final benchmark score. This pattern **adopts** that practical burden, **adapts** it through one `TaskFamilyRef` or `TaskSignature`-bound adaptation signature, and **rejects** generic `got better` narratives that leave threshold and budget semantics implicit.

**Claim 2.** Current open-ended exploration work treats corridor entry and stepping stones as evidence-bearing novelty signals rather than decorative commentary.

**Practice / source / alignment / adoption.** Contemporary `QD`/`OEE` and nonhuman-domain exploration lines distinguish real corridor entry from one exotic sample by asking for explicit baseline, stable descriptor shift, reproducible solution class, or an explicit stepping-stone trace. This pattern **adopts** explicit corridor baseline/evidence discipline, **adapts** it as declared adaptation-signature fields, and **rejects** novelty talk that names no baseline or evidence basis.

**Claim 3.** Current selector and parity practice needs one stable shared field set for specialization claims.

**Practice / source / alignment / adoption.** Current selector and parity surfaces stay reviewable only when compared candidates reuse the same published field set for threshold, prior exposure, transfer, retention, downside, and corridor-entry burden. This pattern **adopts** that reuse discipline, **adapts** it by publishing one stable adaptation-signature field set here, and **rejects** silent downstream field redefinition in `G.5` or `G.9`.

**Evidence-tier note.** Peer-reviewed frontier anchors carry the strongest support for threshold/budget/parity burdens, while fast-moving frontier lines remain explicit support for corridor-entry and open-ended exploration pressure rather than a flattened single evidence tier.
## Relations

**Builds on:** `C.22` TaskSignature anchoring, `C.19.1` `BLP` compatibility, `A.15` role/method/work separation, `C.24` scout/probe and `CheckpointReturn` semantics, `E.16` budget enforcement.
**Coordinates with:** `G.5` selector specialization profiles, `G.9` adaptation parity, `G.11` later telemetry/refresh reuse.
**Constrained by:** `E.10` lexical discipline and `E.19` pattern-quality review when this child section is newly landed or materially revised.
## Not this pattern when

- the burden is only to name the task family and work-measure threshold target, with no adaptation-speed or transfer claim at all; ordinary `C.22` anchoring is enough
- the live question is already selector or parity law across candidate portfolios; that belongs to `G.5 / G.9`
- the text cannot yet declare one work-measure threshold target, one prior-exposure stance, or one evidence basis for corridor entry
## Conformance checklist

- `CC-C22.1-1` An adaptation signature **SHALL** bind to one declared `TaskFamily` or `TaskSignature`, one work target, and one work-measure threshold target rather than one generic improvement story.
- `CC-C22.1-2` An adaptation signature **SHALL** publish `timeToThreshold`, `budgetToThreshold`, and `priorExposureDeclaration`; if threshold was not reached, the signature **SHALL** say so explicitly instead of implying success.
- `CC-C22.1-3` Any declared transfer, retention, post-threshold-efficiency, downside, corridor-entry, or stepping-stone claim **SHALL** be explicit by value with the target, baseline, or evidence basis named, not left as narrative garnish.
- `CC-C22.1-4` This pattern may refine specialization timing and reuse claims over the declared `C.22` anchor, but it **SHALL NOT** redefine acceptance-gate thresholds, task-family attachment, or selector/parity law owned elsewhere.
- `CC-C22.1-5` Downstream selector/parity surfaces **SHALL** cite or consume the same published adaptation-signature field set rather than silently redefining threshold, prior-exposure, transfer, retention, downside, or corridor-entry terms.
## C.22.1:End
