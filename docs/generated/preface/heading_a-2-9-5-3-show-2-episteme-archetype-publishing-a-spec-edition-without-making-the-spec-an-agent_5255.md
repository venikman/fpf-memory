---
title: "A.2.9:5.3 — Show #2 (episteme archetype: publishing a spec edition without making the spec an agent)"
description: "Generated reference page for heading:a-2-9-5-3-show-2-episteme-archetype-publishing-a-spec-edition-without-making-the-spec-an-agent:5255."
---

# A.2.9:5.3 — Show #2 (episteme archetype: publishing a spec edition without making the spec an agent)
> Preface node `heading:a-2-9-5-3-show-2-episteme-archetype-publishing-a-spec-edition-without-making-the-spec-an-agent:5255`

## Content

**Situation (anti-pattern):**
“The interface spec declares MUST/SHALL requirements.”

**Conformant modeling sketch:**

* `U.SpeechAct SA-Publish-API-v12`

  * `actTypes = {SpeechActTypeRef(Publish@APISpecContext), SpeechActTypeRef(DeclareNorms@APISpecContext)}`
  * `performedBy = RoleAssignmentRef(StandardsEditor as PublisherRole@APISpecContext)`
  * `isExecutionOf = MethodDescriptionRef(SpecReleaseProcedure_v12)`
  * `executedWithin = SpecPublicationSystem`
  * `window = [t,t]`
  * `affected = {EpistemeRef(APISpec_v12)}`
  * `utteranceRefs = {EpistemeRef(APISpec_v12)}`
  * `carrierRefs = {CarrierRef(GitTag:v12), CarrierRef(SignedReleaseArtifact:v12)}`
  * `institutes.statusClaims = {ClaimIdRef(D-StdStatus-APISpec_v12-Published)}` (if modeled)

Norms live in the **published utterance surfaces** (spec clauses as routed claims), but the **act of publication** is a speech act performed by an accountable role. This avoids “the spec promises/commits” category errors while preserving auditability.
