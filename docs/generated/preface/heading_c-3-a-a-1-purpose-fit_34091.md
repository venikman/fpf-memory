---
title: "C.3.A:A.1 Purpose & fit"
description: "Generated reference page for heading:c-3-a-a-1-purpose-fit:34091."
---

# C.3.A:A.1 Purpose & fit
> Preface node `heading:c-3-a-a-1-purpose-fit:34091`

## Content

**What this solves.** Regulations and standards name classes of things (“**Adult person**,” “**Class II medical device**,” “**Personal data**,” “**Lease**”). In one context they are native; in another they are foreign. Without typed reasoning, teams either (a) hand‑translate terms (silently changing meaning), or (b) reduce everything to Context labels (“domain = EU”), which cannot be checked by guards.

**What we add.**

1. Model regulatory categories as **Kinds** (with `KindSignature` and `⊑`),
2. map them across Contexts with **KindBridges** and **type‑congruence `CL^k`**,
3. express **Claim scope (G)** over **Context slices** that explicitly list *jurisdiction, version, and a time selector (Γ_time)*, and
4. apply **R‑penalties** (`Ψ(CL^k)`and, if scope is bridged,`Φ(CL)`) while **keeping F and G unchanged**.
