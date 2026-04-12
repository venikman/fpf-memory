---
title: "A.19:5.2.2.2 Normalization‑based comparability (≼_normalization)"
description: "Generated reference page for heading:a-19-5-2-2-2-normalization-based-comparability-normalization:20443."
---

# A.19:5.2.2.2 Normalization‑based comparability (≼_normalization)
> Preface node `heading:a-19-5-2-2-2-normalization-based-comparability-normalization:20443`

## Content

When two state vectors do not meet the strict conditions for coordinatewise comparison (e.g. they come from different spaces, or the “same” Characteristics are measured on different scales/units), the only sanctioned way to compare them is: **normalize, then compare**.

Concretely: if we have state _x_ in CS₁ and state _y_ in CS₂, a normalization‑based comparison is permitted only if the model can cite a set of `NormalizationMethodInstanceId`(s) under a chosen **UNM** (per **A.19.UNM**) that lands the relevant coordinates of _x_ into CS₂ (or lands both into a declared common target space). The result is understood as **NCVs** (or an `≡_UNM` quotient class) per A.19.UNM.

**Comparability rule (normalize‑then‑compare).** We say _x_ **≼<sub>normalization</sub>** _y_ only if, after applying the cited normalization instances to produce a representation of _x_ in CS₂ (or a common target), the mapped state can be compared **coordinatewise** under `≼_coord`. In other words, we never compare raw _x_ and _y_; we compare *after landing in a common, well‑typed space*.

If the normalization crosses context boundaries (i.e., CS₁ and CS₂ are in different bounded contexts), then by FPF policy this mapping MUST be treated as a formal **Alignment Bridge** (F.9) with an associated **congruence‑loss (CL)** level and MUST be declared via the relevant mechanism’s **A.6.1 Transport** (BridgeId + channel + `ReferencePlane(src,tgt)`; no implicit crossings). In such cases, any conclusions drawn carry an assurance penalty per **B.3** (`Φ(CL)`).

**Auditability.** Each cited `NormalizationMethodInstanceId` used for comparison SHOULD be transparent via its referenced description/edition (per **A.19.UNM**). Evidence/calibration backing and waiver discipline are owned by **C.16 (MM‑CHR)**. The key here is that **no comparison is magic** – if values differ in scale or context, the normalization route and its limitations must be explicit.

> **Mnemonic:** _“Never compare before you **land** both points in the **same** well-typed space.”_ In other words, always map measurements to a common basis (same CharacteristicSpace and units) before attempting to say one state is ≥ or ≤ another. Directly comparing raw numbers from different scales or contexts is not allowed.
