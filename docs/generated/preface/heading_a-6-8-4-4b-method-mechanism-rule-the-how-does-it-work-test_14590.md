---
title: "A.6.8:4.4b — Method/mechanism rule (the “how does it work?” test)"
description: "Generated reference page for heading:a-6-8-4-4b-method-mechanism-rule-the-how-does-it-work-test:14590."
---

# A.6.8:4.4b — Method/mechanism rule (the “how does it work?” test)
> Preface node `heading:a-6-8-4-4b-method-mechanism-rule-the-how-does-it-work-test:14590`

## Content

If the draft sentence asserts or explains *how the service works* (verbs like **implement/realize/work by/uses/consists of/pipeline/algorithm/workflow/runbook/process steps**) then the referent MUST be a **service delivery system** (`deliverySystemRef`) and/or a **service delivery method** (`deliveryMethodRef`).

If the draft uses *service* as the name of a **promised work method** (common in plain language: “cleaning”, “repair”, “haircutting”), treat that as part of the promise by constraining the `U.OutcomeSpec.workSpec.methodConstraintRef` (what is promised). Keep `deliveryMethodRef` for the provider‑internal runbook/procedure that realizes the promise (how it is executed).

If the draft sentence is specifically about the **externally visible signature/shape** (endpoints, request/response schema, SOP steps visible to consumers), route it to **service access spec** (`accessSpecRef`).

A conforming text **SHALL NOT** attach mechanism/process predicates to the **promise content**; the clause may constrain outcomes or acceptance criteria, but mechanism claims belong to design/method artefacts. *(See CC‑A.6.8‑9.)*
