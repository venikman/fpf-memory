---
title: "A.6.C:4.5 — Default artefact: Contract Claim Register (recommended)"
description: "Generated reference page for heading:a-6-c-4-5-default-artefact-contract-claim-register-recommended:7774."
---

# A.6.C:4.5 — Default artefact: Contract Claim Register (recommended)
> Preface node `heading:a-6-c-4-5-default-artefact-contract-claim-register-recommended:7774`

## Content

Use the **A.6.B Claim Register** (IDs + statements + quadrant + anchor). Add two optional columns that make A.6.C auditable without adding new ontology:

* `bundleId: ContractBundleId` (local stable ID grouping the claims that constitute one boundary “contract bundle”)
* `bundlePart ∈ {PromiseContent, Utterance, Commitment, WorkEvidence}`
* `faceRefs = {PlainView|TechCard|InteropCard|AssuranceLane : …}` (where the claim is rendered)
