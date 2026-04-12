---
title: "M3 — VariantPool (candidate inventory + emitter trace)"
description: "Generated reference page for heading:m3-variantpool-candidate-inventory-emitter-trace:55205."
---

# M3 — VariantPool (candidate inventory + emitter trace)
> Preface node `heading:m3-variantpool-candidate-inventory-emitter-trace:55205`

## Content

**Owns (kit surface):**

* `VariantPoolId` bound to `CG‑FrameContext`
* per‑candidate minimal traceability fields (emitter identity, `EmitterPolicyRef` (policy‑id/ref; owner‑defined), method/generator refs when declared, edition pins, provenance anchors)
* optional, per‑candidate **assurance preview pointers** (e.g., `PathSliceId?` and/or `SCRId?` when early assurance is recorded) and optional **QD/Open‑Ended scaffolding stubs** (only when introduced by explicit `GPatternExtension` blocks)

**Guardrails (via G.Core):**

* tri‑state eligibility handling, penalties routing, crossing visibility, and set‑return constraints are not defined here; they are enforced via `G.Core` conformance.

**Semantic owner of method payload:** method‑specific emitter semantics live in `Extensions` (e.g., `C.17`, `C.18`, `C.19`).
M3 MUST remain method‑agnostic in its core definition: it is an inventory surface, not an algorithm spec.
