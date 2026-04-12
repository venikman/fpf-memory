---
title: "Show #2 (U.Episteme): published evaluation protocol boundary (multi‑view + evidence)"
description: "Generated reference page for heading:show-2-u-episteme-published-evaluation-protocol-boundary-multi-view-evidence:6875."
---

# Show #2 (U.Episteme): published evaluation protocol boundary (multi‑view + evidence)
> Preface node `heading:show-2-u-episteme-published-evaluation-protocol-boundary-multi-view-evidence:6875`

## Content

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
