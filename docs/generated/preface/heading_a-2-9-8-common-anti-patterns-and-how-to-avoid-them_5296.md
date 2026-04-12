---
title: "A.2.9:8 — Common Anti-Patterns and How to Avoid Them"
description: "Generated reference page for heading:a-2-9-8-common-anti-patterns-and-how-to-avoid-them:5296."
---

# A.2.9:8 — Common Anti-Patterns and How to Avoid Them
> Preface node `heading:a-2-9-8-common-anti-patterns-and-how-to-avoid-them:5296`

## Content

| Anti-pattern                                                              | Why it fails                         | Repair                                                                                   |
| ------------------------------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------- |
| **Episteme-as-actor** (“the spec approves/declares”)                      | assigns agency to descriptions       | represent the publishing/approving act as `U.SpeechAct(performedBy=RoleAssignment)`      |
| **Carrier-as-act** (“the signed PDF is the approval”)                     | conflates carrier with act           | model `U.SpeechAct` and point to PDF as `carrier`/`utteranceSurface`                     |
| **Free-text type** (“type=‘approved-ish’”)                                | not lintable; drifts across faces    | register `SpeechActTypeRef` in the context and use it                                    |
| **Act carries obligations** (obligations embedded as prose in speech act) | collapses act and deontic binding    | model obligations as `U.Commitment` objects instituted by the act                        |
| **Gating without window**                                                 | cannot evaluate freshness            | add explicit `window` and reference it in the guard/checklist                            |
| **Hidden multi-act** (one event silently creates multiple commitments)    | loses traceability; creates disputes | represent multi-function via `actTypes` set or multiple speech acts sharing the same carrier |
