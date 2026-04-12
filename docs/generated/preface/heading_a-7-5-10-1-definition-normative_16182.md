---
title: "A.7:5.10.1 — Definition (normative)"
description: "Generated reference page for heading:a-7-5-10-1-definition-normative:16182."
---

# A.7:5.10.1 — Definition (normative)
> Preface node `heading:a-7-5-10-1-definition-normative:16182`

## Content

`U.OutcomeSpec` is an **Episteme** that specifies the promised outcome template referenced by `U.PromiseContent.promisedOutcomeSpecRef` (A.2.3). It is the “content of what is promised” *as a judgement target*.

It MAY constrain:

1. **delivery work** — predicates over `U.Work` episodes (A.15.1), e.g., duration, step coverage, resources used, method constraint;
2. **delivered state / artefact** — predicates over the post‑state of affected referents (via `U.Work.Δ` / evidence anchors), e.g., geometry/appearance/correctness;
3. **both** (composite).

`U.OutcomeSpec` is **not** a `U.Work` episode and **not** the extensional delivered object. It exists so a promise clause can be evaluated without confusing *spec* with *actuals*.

**Reference type.**  
`OutcomeSpecRef ::= ObjectIdRef` and MUST resolve to a `U.OutcomeSpec`.
