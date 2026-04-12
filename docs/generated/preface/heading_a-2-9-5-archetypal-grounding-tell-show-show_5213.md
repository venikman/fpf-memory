---
title: "A.2.9:5 — Archetypal Grounding (Tell–Show–Show)"
description: "Generated reference page for heading:a-2-9-5-archetypal-grounding-tell-show-show:5213."
---

# A.2.9:5 — Archetypal Grounding (Tell–Show–Show)
> Preface node `heading:a-2-9-5-archetypal-grounding-tell-show-show:5213`

## Content

## A.2.9:5.1 — Tell (universal rule)

When governance or gating depends on “someone said/did X”, model **that saying/doing** as a `U.SpeechAct` (a Work occurrence), and keep the utterance text and carriers separate. If the saying/doing creates obligations, model those obligations as `U.Commitment` objects instituted by the speech act.
## A.2.9:5.2 — Show #1 (system archetype: change-control approval gates a deployment)

**Situation (messy prose):**
“Change is approved, so the pipeline may deploy.”

**Conformant modeling sketch:**

* `U.SpeechAct SA-Approve-4711`

  * `actTypes = {SpeechActTypeRef(Approval@ChangeControl)}`
  * `performedBy = RoleAssignmentRef(CAB_Chair as ApproverRole@ChangeControl)`
  * `isExecutionOf = MethodDescriptionRef(ChangeApprovalProcedure_v3)`
  * `executedWithin = ChangeControlBoardSystem`
  * `window = [t,t]`
  * `affected = {ChangeRequestId(4711), WorkRef(Deploy-4711)}`
  * `utteranceRefs = {EpistemeRef(ChangeTicket#4711)}`
  * `carrierRefs = {CarrierRef(TicketSystemRecord#4711)}`
  * `institutes.commitments = {CommitmentIdRef(D-Deploy-Authorized)}`

* `U.Commitment D-Deploy-Authorized`

  * `subject = RoleAssignmentRef(OpsBot#DeployerRole:CD_Pipeline_v7)`
  * `modality = MAY` (permission to enact)
  * `referents = {A-Gate-Deploy-4711}`
  * `source.speechActRef = SA-Approve-4711`

* Gate predicate `A-Gate-Deploy-4711` may include:
  `exists SpeechAct(type=Approval, affected includes ChangeRequestId(4711), performedBy role=ApproverRole, within 90d)`.

This preserves:

* act vs text vs carrier,
* explicit performer,
* time window for freshness,
* explicit provenance from commitment back to the instituting act.
## A.2.9:5.3 — Show #2 (episteme archetype: publishing a spec edition without making the spec an agent)

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
