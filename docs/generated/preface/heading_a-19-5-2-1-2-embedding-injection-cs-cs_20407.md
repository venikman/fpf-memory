---
title: "A.19:5.2.1.2 Embedding – Injection ι : CS₁ ↪ CS₂."
description: "Generated reference page for heading:a-19-5-2-1-2-embedding-injection-cs-cs:20407."
---

# A.19:5.2.1.2 Embedding – Injection ι : CS₁ ↪ CS₂.
> Preface node `heading:a-19-5-2-1-2-embedding-injection-cs-cs:20407`

## Content

An **embedding** is a structure-preserving **injection** from one space CS₁ into another space CS₂. It consists of two parts: (a) an injective **slot correspondence** from CS₁ to CS₂, and (b) (only where needed) cited **normalization instances** that make the correspondence semantically safe. Formally, let CS₁ have basis _I₁_ and CS₂ have _I₂_. An embedding declares an injective function _m: I₁ → I₂_ that identifies each slot of CS₁ with a corresponding slot in CS₂. 

For each slot _i ∈ I₁_ where the scale/unit differs from the target slot _m(i)_ in CS₂, the embedding **MUST cite** a `NormalizationMethodInstanceId` (per **A.19.UNM**) that re‑expresses values from `ValueSet(slot_i)` into `ValueSet(slot_{m(i)})` within the declared invariants and validity window. The embedding does **not** define normalization semantics; it only references the required instances.

Intuitively, an embedding says: “Any coordinate tuple from CS₁ can be interpreted as a coordinate tuple in CS₂, possibly after converting units or re‑scaling, and without losing any information except what the declared **NormalizationMethods** intentionally **coarse‑grain**.” If there is no loss at all (**NormalizationMethods** are identity or strict conversions), the embedding is essentially an inclusion of one space into a larger one; if there is some information loss (e.g., converting a fine‑grained scale to a coarse one), that loss is explicit in the **NormalizationMethodDescription**. **Locality:** 

Embeddings are defined **within a single `U.BoundedContext`** (i.e., both CS₁ and CS₂ are in the same context). Using an embedding across contexts requires an **Alignment Bridge** (see F.9) and **MUST** be declared via the relevant mechanism’s **A.6.1 Transport** clause (BridgeId + channel + `ReferencePlane(src,tgt)` + any `CL^plane`; no implicit crossings).  

**Normalization declaration duties (MUST):** Each cited `NormalizationMethodInstanceId` **MUST** satisfy the declaration/admissibility obligations owned by **A.19.UNM** (incl. method‑class token and validity window). If such normalization artifacts are used for gating or assurance, their evidence/calibration backing and waiver rules are governed by **C.16 (MM‑CHR)**. In other words, you cannot assume one context’s space fits into another’s without an explicit Bridge; any attempt to do so must treat it as a cross‑context alignment with potential loss.
