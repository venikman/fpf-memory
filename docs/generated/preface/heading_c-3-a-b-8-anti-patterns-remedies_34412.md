---
title: "C.3.A:B.8 Anti‑patterns & remedies"
description: "Generated reference page for heading:c-3-a-b-8-anti-patterns-remedies:34412."
---

# C.3.A:B.8 Anti‑patterns & remedies
> Preface node `heading:c-3-a-b-8-anti-patterns-remedies:34412`

## Content

| Anti‑pattern                       | Why it’s risky                                | Remedy                                                              |
| ---------------------------------- | --------------------------------------------- | ------------------------------------------------------------------- |
| “We tested one golden case.”       | Hides variant risk; ignores subkinds.         | Build a subkind‑indexed matrix; add boundary tests per column.      |
| “Latest data suffices.”            | Non‑deterministic; un‑auditable.              | Declare `Γ_time` windows; fail closed on expiry.                    |
| “Tool is trusted, so we’re done.”  | Confuses TA with VA/LA; misses content risk.  | Keep TA separate; add VA proofs or LA tests as needed.              |
| Bridging without penalties         | Understates risk; mapping gaps surface later  | Apply **scope‑bridge** and **kind‑bridge** penalties to **R**; publish loss notes. |
| Widening G to cover evidence gaps. | Conflates applicability with available tests. | Keep G honest; expand matrix or lower claim scope explicitly (ΔG−). |
| Inferring scope from how many items match    | Scope is not the same as membership      | Keep **Scope** (where it applies) distinct from **membership** (which items match in the slice). |
