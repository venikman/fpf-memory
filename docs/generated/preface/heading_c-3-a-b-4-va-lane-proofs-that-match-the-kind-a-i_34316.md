---
title: "C.3.A:B.4 VA lane — proofs that match the kind \\[A/I]"
description: "Generated reference page for heading:c-3-a-b-4-va-lane-proofs-that-match-the-kind-a-i:34316."
---

# C.3.A:B.4 VA lane — proofs that match the kind \[A/I]
> Preface node `heading:c-3-a-b-4-va-lane-proofs-that-match-the-kind-a-i:34316`

## Content

**What VA contributes.** Proofs reduce ambiguity and eliminate many LA burdens when they **truly quantify over the intended kind** and **live in the declared Scope**.

**VA‑patterns (informative):**

* **Proof over the Kind (F7–F8).** “For every **PassengerCar**, the property holds” (notation hint: ∀x:PassengerCar). If the property depends on subkind‑specific rules, split lemmas per subkind.
* **Proof‑carrying components.** When the content is **F8** (dependent types), the build rejects violations; LA can shrink to **conformance smoke** within the slices.
* **Up‑to‑iso (AT K3).** Equational reasoning “up‑to‑iso” is acceptable **only** if the KindSignature works at that level and receivers accept **KindBridge** that preserves equivalences.

**VA‑obligations (normative):**

* **VA‑1.** A proof artifact **SHALL** cite the **Kind** it quantifies over and reference the **Claim scope** slices it assumes.
* **VA‑2.** Cross‑context acceptance of proofs **SHALL** use both bridges (Scope+Kind) and apply **Φ/Ψ** penalties to **R** (never to F/G).
* **VA‑3.** If the proof relies on **tool kernels**, their **TA** status **SHALL** be disclosed; weakening TA **MUST NOT** be “paid for” by silent scope widening.

**Mini‑example (VA).**
Policy P: “∀ x: PassengerCar. stoppingDistance(x) ≤ 50 m on dry at speed≤50.”
— **Kind**: `PassengerCar ⊑ Vehicle` (K2), signature F4 (predicates).
— **Scope**: `{surface=dry, speed≤50, rig=v3, Γ_time=rolling 180 d}`.
— **Proof**: a proof assistant lemma over `PassengerCar` (tool choice is context‑local).
— **Reuse** to Plant‑B: a Scope Bridge with **CL=2** (rig bias) and a KindBridge with **CL^k=3** (same classification). Apply the **scope‑bridge penalty** for CL=2 and the **kind‑bridge penalty** for CL^k=3 to **R**.
