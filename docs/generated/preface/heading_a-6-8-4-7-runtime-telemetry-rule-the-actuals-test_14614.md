---
title: "A.6.8:4.7 — Runtime/telemetry rule (the “actuals” test)"
description: "Generated reference page for heading:a-6-8-4-7-runtime-telemetry-rule-the-actuals-test:14614."
---

# A.6.8:4.7 — Runtime/telemetry rule (the “actuals” test)
> Preface node `heading:a-6-8-4-7-runtime-telemetry-rule-the-actuals-test:14614`

## Content

If the sentence asserts actuals (**down/slow/99.9% last week/latency is X/incident occurred**), the claim MUST be routed to **work + carriers/evidence** (deliveryWorkRef + witnesses), not to the clause.

If an actual is used in a conformance block, KPI, or acceptance argument, it MUST cite the underlying `U.Characteristic` and measurement procedure/evidence carrier (C.16/C.25), with pinned `{UnitType, ScaleKind, ReferencePlane, EditionId}`; otherwise it is prose only and MUST NOT be treated as a verified SLO/SLA measurement.

When needed, also name whether the actual is about the **access point** (entrypoint symptoms) or the **delivery system** (realizer symptoms). “Down” can be about the gateway even when the backend is fine; the pattern forbids collapsing those.
