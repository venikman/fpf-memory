---
title: "A.6.P:5 — Archetypal Grounding (System / Episteme)"
description: "Generated reference page for heading:a-6-p-5-archetypal-grounding-system-episteme:10913."
---

# A.6.P:5 — Archetypal Grounding (System / Episteme)
> Preface node `heading:a-6-p-5-archetypal-grounding-system-episteme:10913`

## Content

A.6.P requires Tell–Show–Show grounding in both System and Episteme lanes.

## A.6.P:5.1 — System archetype: “same system across environments”

**Tell.**
An operations note says: “Staging is the same service as Production.” Months later, incident metrics are aggregated “because it’s the same thing”, and evidence across environments is mixed, producing an incorrect causal story.

**Show.**
Treat “same” as a red-flag umbrella token. Rewrite into an explicit cross-Context relation kind,
typed to the facet the draft actually uses (service delivery system sameness for actuals/evidence aggregation; not about promise contents).

**Show (candidate‑set note; endpoint facet restoration).**

```
CandidateSetNote(triggerSpan="service" in "same service", role=endpointFacet(p₁)):
- candidates: {promiseContent, serviceAccessPoint, serviceProviderPrincipal, serviceDeliverySystem}
- selected:   serviceDeliverySystem
- why:        the claim is later used to justify mixing operational actuals/evidence (metrics + incident logs);
  local cues point to delivery artefacts (manifests/config/test runs), not clause carriers
- consequence: endpoints typecheck as `DeliverySystemRef` participants; clause/provider facets are explicitly out-of-scope

sameDeliverySystemUnder(
  leftDeliverySystemRef  = SystemRef(staging_delivery_system),
  rightDeliverySystemRef = SystemRef(prod_delivery_system),
  scope     = ClaimScope{SLO_family = X, signals = {latency, error_rate}},
  Γ_time    = interval[2025-12-01, 2026-01-31],
  viewpoint = OpsViewpoint,
  witnesses = {deploymentManifestPins, configPins, testRunPins}
)

aggregationAdmissibleIff(
  relationRef  = RelationRef(sameDeliverySystemUnder, SystemRef(staging_delivery_system), SystemRef(prod_delivery_system), ed=…),
  target       = deliveryWorkMetrics,                   // actuals
  Γ_time       = interval[2025-12-01, 2026-01-31],
  witnesses    = {metricCarrierPins, incidentLogPins}   // evidence carriers for the actuals
)
```

**Show.**
Now the relation is auditable: aggregation is admissible only if the relation kind’s admissibility
claims say it preserves the needed characteristics under the declared scope/time, and if witnesses exist.
Cross-Context reuse is explicit and cannot piggyback on label identity.
## A.6.P:5.2 — Episteme archetype: “the models are synced”

**Tell.**
A draft says: “The simulation model is synced with the physical twin.” Reviewers ask what “synced” means. The authors respond with examples, but downstream users still cannot tell whether the claim is about parameters, structure, calibration, evidence freshness, or mapping quality.

**Show.**
Rewrite “synced” as an explicit correspondence relation kind + explicit qualifiers + witnesses:

```
entityMatchedBy(
  leftRef          = ModelRef(SimModel@ed=12),
  rightRef         = SystemRef(PhysicalTwin@ed=7),
  mappingArtifactRef = AlignmentModel_2025_11,
  scope            = ClaimScope{signals = S, metrics = M},
  Γ_time           = snapshot(t),
  referenceScheme  = RefScheme(CustomerIdRegistry#EU),
  viewpoint        = DataEngineeringViewpoint,
  witnesses        = {evalRunPins, calibrationPins, mappingArtifactPins}
)
```

**Show (change narration).**
Two weeks later, the mapping artefact is replaced and the witness set is refreshed. In decision/publication lanes, represent this as a new edition and narrate the change via change classes (not via “re‑synced”):

```
withdrawRelation( relationRef = RelationRef(entityMatchedBy, leftRef, rightRef, ed=12) )

declareRelation(
  entityMatchedBy(
    leftRef           = ModelRef(SimModel@ed=12),
    rightRef          = SystemRef(PhysicalTwin@ed=7),
    mappingArtifactRef= AlignmentModel_2026_01,
    scope             = ClaimScope{signals = S, metrics = M},
    Γ_time           = snapshot(t₂),
    referenceScheme   = RefScheme(CustomerIdRegistry#EU),
    viewpoint         = DataEngineeringViewpoint,
    witnesses         = {evalRunPins_2026_01, calibrationPins_2026_01, mappingArtifactPins_2026_01}
  )
)
```

**Show.**
Different “sync meanings” become different **RelationKind tokens** (e.g., `entityMatchedBy`, `schemaAlignedUnder`), not adjectives. Subsequent changes become narratable as `retargetParticipant`, `rescope`, `retime`, or `refreshWitnesses`, rather than “we updated the sync”.
