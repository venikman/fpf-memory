---
title: "External Interop Hooks for SoTA Discipline Packs (conceptual; normative when used)"
description: "Part G - Discipline SoTA Patterns Kit"
---

# External Interop Hooks for SoTA Discipline Packs (conceptual; normative when used)
> Pattern `G.13` · Draft
> Part G - Discipline SoTA Patterns Kit

**Tag.** Architectural kit pattern (conceptual interop kit; notation‑independent; normative when used)
**Stage.** *design‑time registration & alignment* → *run‑time ingestion, telemetry, refresh*
**Primary hooks.** `G.Core` (Part‑G core invariants + trigger catalogue + default ownership), `G.2` (SoTA Synthesis Pack), `G.3` (CHR Pack), `G.4` (CAL Pack), `G.5` (selector & registries), `G.6` (EvidenceGraph + PathId/PathSliceId), `G.7` (BridgeMatrix + CL/planes), `G.8` (SoS‑LOG bundle surfaces), `G.9` (parity harness), `G.10` (shipping), `G.11` (refresh orchestration), `G.12` (dashboards), `A.19` (CN‑Spec), `A.18` (CSLC legality), `G.0` (CG‑Spec), `F.17` (UTS), `E.5.2` (notation independence), `E.18/A.21/A.27` (GateCrossing/CrossingBundle checks).

**Status.** Draft (Phase‑2 universalized; `G.Core` linkage explicit)
**Normativity.** Normative when used (when any `G.13` surface is authored/emitted/consumed); informative otherwise.

**Non‑duplication note (Phase‑2 universalization).** This pattern **does not restate** Part‑G‑wide invariants (contract‑surface single‑ownership, crossing visibility, penalty routing, set‑return discipline, typed RSCR triggers, default ownership, Δ‑discipline). Those are **single‑owned** in `G.Core` and referenced here via the linkage manifest and CC delegations (*cite, don’t duplicate*).

FPF already supports lawful characterization, evidence wiring, selector‑side set returns, parity, shipping, dashboards, and refresh. What remains frictionful in practice is **interoperability with external scholarly indexes and discipline repositories** (concept registries, paper/claim graphs, dataset registries, taxonomy stores, “science‑of‑science” indicator feeds), which teams routinely use as *inputs* when authoring a SoTA discipline pack.

## Keywords

- interop
- external index
- claim mapper
- mapping policy
- plane map
- embedding spec
- ExternalIndexCard@Context
- ClaimMapperCard@Context
- InteropSurface@Context
- CHR-typed SoS features
- edition pins
- UTS twins
- RSCRTriggerKindId
- telemetry pin.

## Relations

- `G.13` --explicit_reference--> [SoTA Harvester & Synthesis](/generated/patterns/G.2)
- `G.13` --explicit_reference--> [CHR Authoring: Characteristics - Scales - Levels - Coordinates](/generated/patterns/G.3)
- `G.13` --explicit_reference--> [CAL Authoring: Calculi - Acceptance - Evidence](/generated/patterns/G.4)
- `G.13` --explicit_reference--> [Multi‑Method Dispatcher & MethodFamily Registry](/generated/patterns/G.5)
- `G.13` --explicit_reference--> [Evidence Graph & Provenance Ledger](/generated/patterns/G.6)
- `G.13` --explicit_reference--> [Cross-Tradition Bridge Calibration Kit (BridgeMatrix → BridgeCards + BCT/Sentinels)](/generated/patterns/G.7)
- `G.13` --explicit_reference--> [SoS-LOG Bundles & Maturity Ladders](/generated/patterns/G.8)
- `G.13` --explicit_reference--> [Parity / Benchmark Harness](/generated/patterns/G.9)
- `G.13` --explicit_reference--> [SoTA Pack Shipping (pack-boundary owner; SoTA-Pack(Core))](/generated/patterns/G.10)
- `G.13` --explicit_reference--> [Telemetry-Driven Refresh & Decay Orchestrator](/generated/patterns/G.11)
- `G.13` --explicit_reference--> [DHC Dashboards — Discipline-Health Time-Series (lawful telemetry, generation-first)](/generated/patterns/G.12)
- `G.13` --explicit_reference--> [A.CHR-SPACE — CharacteristicSpace & Dynamics hook](/generated/patterns/A.19)
- `G.13` --explicit_reference--> [A.CSLC-KERNEL — Minimal CSLC in Kernel (Characteristic/Scale/Level/Coordinate)](/generated/patterns/A.18)
- `G.13` --explicit_reference--> [CG-Spec — Frame Standard & Comparability Governance](/generated/patterns/G.0)
- `G.13` --explicit_reference--> [Unified Term Sheet (UTS)](/generated/patterns/F.17)
- `G.13` --explicit_reference--> [Notational Independence](/generated/patterns/E.5.2)
- `G.13` --explicit_reference--> [Transduction Graph Architecture (E.TGA)](/generated/patterns/E.18)
- `G.13` --explicit_reference--> [GateProfilization: OperationalGate(profile) (GateFit core)](/generated/patterns/A.21)
- `G.13` --explicit_reference--> [LEX-BUNDLE: Unified Lexical Rules for FPF](/generated/patterns/E.10)

## Content

## Problem frame

FPF already supports lawful characterization, evidence wiring, selector‑side set returns, parity, shipping, dashboards, and refresh. What remains frictionful in practice is **interoperability with external scholarly indexes and discipline repositories** (concept registries, paper/claim graphs, dataset registries, taxonomy stores, “science‑of‑science” indicator feeds), which teams routinely use as *inputs* when authoring a SoTA discipline pack.

Without an explicit **conceptual interop kit**, authors tend to build one‑off pipelines whose “implied semantics” leak into the framework: edition drift becomes invisible, cross‑plane/context reuse becomes implicit, and external signals quietly start acting like a shadow contract surface.

`G.13` provides the missing kit: **conceptual registration, alignment, and telemetry hooks** that let external sources be wired into the Part‑G pipeline (**G.2 → G.5 → G.9 → G.10 → G.11**, and optionally **G.12**) while preserving Part‑G invariants via `G.Core`.
## Problem

External sources publish **claim‑adjacent signals** (citations, concept graphs, “task/method” tags, replication links, dataset usage, disruption‑style indicators, benchmark metadata). These are useful for *generation* (palette building, portfolio exploration, candidate bridge discovery), not only for audit. But typical interop practices create predictable failure modes:

* **Contract‑surface leakage.** External numeric signals get treated as if they were lawful “scores” without explicit binding to CHR/CAL/CG surfaces.
* **Implicit crossings.** Cross‑context and cross‑plane reuse happens through opaque transformations, without explicit exposure of the crossing bundle pins needed downstream.
* **Edition drift + refresh brittleness.** Snapshots change, schemas drift, indicator definitions get revised; without edition‑pinned interop surfaces and typed trigger causes, parity and dashboard stability degrade.
* **Evidence disconnect.** “Derived features” are produced without explicit EvidenceGraph anchoring, making later refutation/repair expensive.
* **Format‑as‑norm.** A convenient serialisation (KG export, JSON schema, RO‑Crate, etc.) becomes treated as the specification, undermining notation independence.
## Forces

| Force                           | Tension                                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Notation independence**       | Useful serialisations vs the requirement that conformance is judged on **conceptual** surfaces.        |
| **Pluralism vs parity**         | Diverse scholarly traditions and indexes vs lawful, edition‑aware comparability and reproducibility.   |
| **Interop as generation input** | Interop should speed SoTA authoring, not merely decorate audit reports.                                |
| **Planes & bridges**            | Cross‑plane/context reuse must remain explicit and auditable rather than implicit in “aligners”.       |
| **Telemetry vs dominance**      | External telemetry should inform exploration and refresh without silently changing selector semantics. |
| **Operational drift**           | External sources evolve; interop must be refresh‑ready by construction (typed causes + payload pins).  |
## Solution — Conceptual interop kit: registered sources, alignment cards, feature derivations, and RSCR‑wired telemetry

### G.Core linkage (normative)

**Builds on:** `G.Core`.

**GCoreLinkageManifest (normative).**
*(Canonical form, Nil‑elision, and Expansion rule are defined in `G.Core`.)*

`GCoreLinkageManifest := ⟨
  CoreConformanceProfileIds := {
    GCoreConformanceProfileId.PartG.AuthoringBase,
    GCoreConformanceProfileId.PartG.UTSWhenPublicIdsMinted,
    GCoreConformanceProfileId.PartG.ShippingBoundary
  },
  RSCRTriggerSetIds := {GCoreTriggerSetId.SoTAHarvestSynthesis},
  RSCRTriggerKindIds := {RSCRTriggerKindId.BaselineBindingEdit},   // delta: planned‑baseline linkage edits can be interop‑relevant

  CorePinSetIds := {
    GCorePinSetId.PartG.AuthoringMinimal,
    GCorePinSetId.PartG.CrossingVisibilityPins
  },

  CorePinsRequired := {
    // Interop pins (G.13‑specific; avoid duplicating `GCorePinSetId.PartG.CrossingVisibilityPins`)
    ExternalIndexRef.edition,
    ClaimMapperRef.edition?,
    MappingPolicyRef?,
    PlaneMapRef.edition?,
    ScaleEmbeddingSpecRef.edition?,

    EvidenceGraphId?,
    InteropSurfaceId?
  },

  DefaultsConsumed := {DefaultId.PortfolioMode, DefaultId.DominanceRegime}
⟩`

**Payload‑pin note (informative).** When emitting RSCR triggers for interop‑driven changes, payload pins should include the edited edition/policy identifiers, the impacted scope, and the applicable crossing‑visibility pins (per `GCorePinSetId.PartG.CrossingVisibilityPins`) when crossings/UTS/paths are involved.
### Interop kit objects & surfaces (pattern‑owned; notation‑independent)

All objects below are **conceptual**. Any concrete serialisation belongs to Annex/Interop or tooling notes and is not normative for Part‑G conformance.

* **`ExternalIndexCard@Context`** — registration of an external source and its snapshot.

  **Shape (conceptual):**
  `⟨ ExternalIndexId, ProviderName?, ExternalIndexType, CoverageScope, Licence?, ExternalEdition, FreshnessWindow?, describedEntity := ⟨GroundingHolon, ReferencePlane⟩, Notes? ⟩`

  **Intent.** Create a stable, citable “source card” so downstream artefacts can pin the *card edition* via `ExternalIndexRef.edition`, while the provider snapshot remains visible as `ExternalEdition` (do not echo provider snapshot ids into downstream cards; cite refs instead).

* **`ClaimMapperCard@Context`** — a conceptual “mapping recipe” that yields FPF‑native artefacts from an external source.

  **Shape (conceptual):**
  `⟨ MapperId, ExternalIndexId, MappingPolicyRef, Targets{ClaimSheet|BridgeHints|SoSFeatureSet|UTSProposals}, PlaneMapRef?, ScaleEmbeddingSpecRef?, EvidenceGraphId?, CSLCProofStubs? ⟩`

  **Notes.**

  * This is **not** a shadow legality gate. It is an interop surface that **cites** owners (`A.19`, `G.0`, `G.3`, `G.4`) and publishes the required pins for downstream audit/refresh.
  * When cross‑plane or cross‑context reuse is implicated, the alignment outputs must route via the existing crossing bundles (see `G.Core` linkage).
  * Avoid “edition echo”: downstream artefacts cite `ExternalIndexRef.edition` and `ClaimMapperRef.edition` (and optional `PlaneMapRef.edition` / `ScaleEmbeddingSpecRef.edition`) rather than copying snapshot ids/editions as free fields.

* **`SoSFeatureTransform@Context`** — declares how external signals become **CHR‑typed** SoS features (for DHC/dashboard usage and/or SoS‑LOG rule evaluation).

  **Shape (conceptual):**
  `⟨ SoSFeatureTransformId, Inputs{ClaimSheetId[] | ExternalSignalsRef}, SoSFeatureSetId, FeatureTypingRefs{CharacteristicId/ScaleId/CoordinateId}, ReferencePlane, EvidenceGraphId?, PathSliceId[]?, ProofHooks? ⟩`

  **Notes.**

  * The derivation is a **typing + provenance** surface; it does not introduce new comparators or new governance cards or legality gates.

* **`ScaleEmbeddingSpec@Context`** — optional constraints for representation/space alignment used inside an alignment recipe.

  **Shape (conceptual):**
  `⟨ ScaleEmbeddingSpecId, IntendedUse, AllowedTransformFamily, RequiredPins{NormalizationMethodRef.edition?}, ProhibitedCoercions ⟩`

  **Design intent.** Make any representation alignment *explicitly constrained* and edition‑pinned, instead of silently “creating a new scale”.
  **LEX/UTS note (informative).** `ScaleEmbeddingSpec` is a new LEX head; when it mints a public id it must be published to UTS with twin labels (see `G.Core` / UTS profile).

* **`IndexTelemetryPin`** — an emitted refresh input that makes interop changes RSCR‑visible.

  **Shape (conceptual; RSCR‑typed):**
  `⟨ triggerKindId: RSCRTriggerKindId, scope: PathSliceId[] | PathId[] | PatternScopeId, payloadPins{ExternalIndexId, ExternalIndexRef.edition, ClaimMapperRef.edition?, MappingPolicyRef?, PlaneMapRef.edition?, ScaleEmbeddingSpecRef.edition?, PathId[]?, PathSliceId[]?, UTSRowId[]?, …} ⟩`

  **Routing.** Emitted to `G.11` as refresh input; recorded with canonical `RSCRTriggerKindId` causes.

* **`InteropSurface@Context`** — a selector‑/dashboard‑facing summary of what interop artefacts exist and how they are pinned.

  **Shape (conceptual):**
  `⟨ InteropSurfaceId, ExternalIndexId, ExternalIndexRef.edition, MapperId?, ClaimMapperRef.edition?, MappingPolicyRef?, SoSFeatureSetId?, EvidenceGraphId?, PathSliceId[]?, PlaneMapRef.edition?, ScaleEmbeddingSpecRef.edition?, UTSRowId[] ⟩`

  **Publication.** Published to UTS with twin labels as applicable.
### Generation‑first interop flow (notation‑independent; owner‑delegating)

1. **Register source editions.** Author `ExternalIndexCard@Context` for each external source/snapshot used for SoTA authoring, including `ExternalEdition` and the `describedEntity` plane anchor.
2. **Author mapping recipes.** Create `ClaimMapperCard@Context` describing which FPF artefacts are produced (ClaimSheets, BridgeHints, feature sets, UTS proposals), and which policies/specs constrain the mapping (policy refs + optional `PlaneMapRef` / `ScaleEmbeddingSpecRef`).
3. **Produce FPF‑native inputs.** Use the alignment recipe outputs as inputs to:

   * `G.2` harvesting (ClaimSheets / operator & object inventories / candidate bridge hints),
   * `G.3` CHR typing (when numeric signals are formalized as CHR characteristics/scales/coordinates),
   * `G.4` acceptance/threshold policies (when a downstream decision requires explicit CAL policy rather than telemetry),
   * `G.12` dashboards (when derived SoS features are used as DHC slots).
4. **Feed selection/parity/shipping without smuggling semantics.**

   * `G.5` consumes the produced artefacts under its own contract surfaces and returns set‑valued outcomes (selector semantics remain owned by `G.5` + `G.Core`).
   * `G.9` parity consumes pinned editions/windows and produces traceable parity reports.
   * `G.10` shipping may include interop surfaces **as cited artefacts**; `G.13` does not own shipping.
5. **Emit telemetry and refresh causes.** Any change in external editions, alignment policies, plane maps, or embedding specs emits:

   * a canonical `RSCRTriggerKindId` (per `G.Core`),
   * a scope (`PathSliceId[]` and/or `PatternScopeId`),
   * payload pins (editions/policies/UTS rows),
     enabling `G.11` to plan slice‑scoped refresh.
### Interfaces — minimal I/O standard (conceptual; kit‑only)

| ID   | Interface   | Consumes  | Produces   |
| ---- | ----------- | --------- | ---------- |
| **G.13‑1 `Register_ExternalIndex`**  | Register `ExternalIndexCard@Context` | Provider metadata, scope, **ExternalEdition**, freshness, describedEntity anchor   | `ExternalIndexCard@Context` (+ UTS row when published)   |
| **G.13‑2 `Map_ClaimsToFPF`**   | Apply `ClaimMapperCard@Context`   | `ExternalIndexCard@Context`, `MappingPolicyRef`, optional `PlaneMapRef`/`ScaleEmbeddingSpecRef`, optional EvidenceGraph hooks | `ClaimSheet@Context`, `BridgeHints`, optional `SoSFeatureSet@Context`, optional UTS proposals |
| **G.13‑3 `Derive_SoSFeatures`**  | Produce CHR‑typed SoS features  | ClaimSheets / external signals refs, CHR typing refs, legality proof hooks | `SoSFeatureSet@Context` (CHR‑typed; provenance pinned)   |
| **G.13‑4 `Publish_InteropSurface`**  | Publish interop summary | outputs of G.13‑2/‑3, UTS refs | `InteropSurface@Context` (+ UTS rows/twins) |
| **G.13‑5 `Emit_IndexTelemetryPin`** | Emit refresh input  | edition/policy changes + scope + payload pins  | telemetry to `G.11` (typed causes + payload pins)   |
| **G.13‑6 `Wire_To_SoTA_Pack`** | Provide shipping hook  | `InteropSurface@Context` + citations to upstream artefacts  | `G.10` pack hooks (as cited payload; no serialisation mandated)  |
## Extensions (pattern‑scoped; non‑core)

`G.13` keeps provider/method specifics out of the kit core. Any such specificity appears as `GPatternExtension` blocks with stable **PatternScopeId**s. These modules are **wiring‑only**: they bind pins/editions/policies and cite the semantic owner rather than redefining semantics.

### G.13:Ext.ExternalIndexProviderWiring (Phase‑3 seed)

**PatternScopeId:** `G.13:Ext.ExternalIndexProviderWiring`
**GPatternExtensionId:** `ExternalIndexProviderWiring`
**GPatternExtensionKind:** `Phase3Seed`
**SemanticOwnerPatternId:** `owner TBD` *(Annex/Interop or a future dedicated interop owner)*
**Uses:** `{G.13}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `ExternalIndexType`
* `ExternalEdition` *(as published on `ExternalIndexCard@Context`)*
* `Licence?`
* `CoverageScope`
* `ProviderChangePolicyId?` *(if provider‑specific “schema drift” handling exists)*

**RSCRTriggerSetIds / RSCRTriggerKindIds:** `∅` *(covered by `G.13:4.1`)*
**Notes (seed; wiring‑only):**

* Provider‑specific ingestion choices (e.g., OpenAlex‑class, Crossref‑class, ORKG‑class, discipline repositories) **must not** become Part‑G‑wide norms in Phase‑2. This module only records which provider cards exist and which editions/policies are pinned.
### G.13:Ext.EmbeddingBasedAlignment (Phase‑3 seed; method‑specific wiring stub)

**PatternScopeId:** `G.13:Ext.EmbeddingBasedAlignment`
**GPatternExtensionId:** `EmbeddingBasedAlignment`
**GPatternExtensionKind:** `Phase3Seed`
**SemanticOwnerPatternId:** `owner TBD` *(Annex/Interop or a future dedicated interop owner; Phase‑3 owner decision required)*
**Uses:** `{G.13, A.19, E.5.2}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `ScaleEmbeddingSpecRef.edition`
* `NormalizationMethodRef.edition?` *(when a declared normalization/representation transform is used)*
* `MappingPolicyRef`
* `EvidenceGraphId?` *(when evidence paths for alignment decisions are published)*

**RSCRTriggerSetIds / RSCRTriggerKindIds:** `∅` *(covered by `G.13:4.1`)*
**Notes (wiring‑only; post‑2015 practice orientation):**

* “Embedding‑based” techniques are treated as **declared transforms** constrained by `ScaleEmbeddingSpec` and/or `NormalizationMethod` references, rather than as implicit semantics.
* The module binds editions and policies; it does not define what is “similar enough”.
### G.13:Ext.EntityResolutionAndAliasDocking (interop‑specific; Phase‑3 seed)

**PatternScopeId:** `G.13:Ext.EntityResolutionAndAliasDocking`
**GPatternExtensionId:** `EntityResolutionAndAliasDocking`
**GPatternExtensionKind:** `Phase3Seed`
**SemanticOwnerPatternId:** `owner TBD` *(likely UTS‑adjacent; requires Phase‑3 owner decision)*
**Uses:** `{F.17, E.10}`
**⊑/⊑⁺:** `∅`
**RequiredPins/EditionPins/PolicyPins (minimum):**

* `UTSRowId[]` *(for externally‑sourced entities that become publicly citable)*
* `ExternalIdAliasSetId?` *(labels only; canonical ids remain UTS ids)*
* `TokenizationPolicyId?`

**RSCRTriggerSetIds / RSCRTriggerKindIds:** `∅` *(covered by `G.13:4.1`)*
**Notes (seed; wiring‑only):**

* This module exists to prevent “ID drift by renaming” for externally sourced entities. It is intentionally a Phase‑3 seed until a single semantic owner is chosen.
## Archetypal grounding (informative; SoTA‑oriented)

**System.** *Software architecture portfolio design.*
Register an external scholarly index edition for “software architecture” concept neighborhoods. Align extracted technique/tactic claims into ClaimSheets and derive a CHR‑typed feature set (e.g., evidence depth, maturity). Use `G.5` to select a **set** of tactics under multi‑objective tradeoffs, and ship a SoTA pack that cites the interop surface.

**Episteme.** *Science‑of‑science discipline dashboard.*
Align external claim graphs (replication, standardisation, disruption‑style proxies) into CHR‑typed features for DHC series. Publish a dashboard slice that cites the external edition and alignment policy; refresh triggers fire when the external edition updates.

**OEE/QD.** *Open‑ended environment generation.*
Register external environment/task taxonomies as index cards. Align them into generator‑family registries (as cited artefacts), keeping coverage/regret strictly as telemetry inputs. Use refresh to re‑align when the taxonomy edition changes.
## Bias‑Annotation (informative)

* **Vendor/tool bias.** The kit names conceptual surfaces only; it avoids vendor‑specific file formats or tooling claims.
* **Metric‑authority bias.** External indicators are treated as *inputs* that must be typed, pinned, and evidenced; they are not authority by default.
* **Representation bias.** Representation/embedding choices are forced into explicit `Spec` + edition pins (no hidden semantics).
* **Discipline bias.** Interop supports pluralism by preserving explicit crossings and versioned alignments instead of forcing a single canonical external ontology.
## Conformance Checklist (CC‑G13; applies when G.13 surfaces are used)

1. **CC‑G13‑CoreRef.** *(normative)* `G.13` implementations **MUST** satisfy the *effective* `G.Core` obligations declared by `G.13:4.1` (`GCoreLinkageManifest`), including trigger typing, default‑ownership routing, and crossing‑visibility pin discipline.

2. **CC‑G13‑InteropIsNotAContractSurface.** *(delegated)* Interop surfaces **MUST NOT** introduce shadow legality/comparability gates; they cite `CN‑Spec`/`CG‑Spec`/CHR/CAL owners and publish pins instead.
   → delegate to `CC‑GCORE‑CN‑CG‑1`.

3. **CC‑G13‑CrossingsAreExplicitWhenInteropTouchesPlanesOrContexts.** *(delegated)* Any cross‑plane/context reuse implied by alignment **MUST** be made explicit through the crossing visibility discipline.
   → delegate to `CC‑GCORE‑CROSS‑1`.

4. **CC‑G13‑PlanePenaltyPoliciesAreOwneredAndPinned.** *(local; owner‑citing)* If `PlaneMapRef` is used (or alignment implies plane‑level penalties), interop surfaces **MUST** publish the relevant policy‑id pins via the crossing‑visibility discipline, and any such policies **MUST** satisfy the constraints owned by `CG‑Spec` (cite `CC‑G0‑Φ`). Interop surfaces **MUST NOT** define interop‑local penalty functions.

5. **CC‑G13‑SetReturnPreserved.** *(delegated)* Interop **MUST NOT** introduce hidden scalarisation or forced single‑winner selection.
   → delegate to `CC‑GCORE‑SET‑1`.

6. **CC‑G13‑DefaultClaimsAreCitationsOnly.** *(delegated)* Any mention of defaults (e.g., dominance regime, portfolio mode) is a **citation** to the single owner in `G.Core.DefaultOwnershipIndex`, not a local default statement.
   → delegate to `CC‑GCORE‑DEF‑1`.

7. **CC‑G13‑EditionDisciplineForInteropCards.** *(local)* `ExternalIndexCard@Context` and `ClaimMapperCard@Context` **MUST** expose edition pins (`ExternalIndexRef.edition`, `ClaimMapperRef.edition`). Any interop surface published to UTS **MUST** cite the relevant `…Ref.edition` values (incl. `PlaneMapRef.edition?`, `ScaleEmbeddingSpecRef.edition?`) when present.
   FPF edition keys **MUST** appear only on `…Ref.edition` pins when a reference is present. Provider snapshot labels (e.g., `ExternalEdition` on `ExternalIndexCard@Context`) may exist on the source card, but **MUST NOT** be copied into downstream artefacts as free‑floating “edition fields”; downstream artefacts cite the corresponding `…Ref.edition` pins instead.
   In particular, interop transforms **MUST NOT** perform illicit arithmetic on ordinal/compare‑only scales (e.g., averaging or subtraction); any aggregation must be via lawful CAL operators with explicit scale legality (cite `A.18` / `CC‑G0‑CSLC`).

8. **CC‑G13‑SoSFeaturesAreCHRTypedAndLegal.** *(local; owner‑citing)* If `SoSFeatureTransform@Context` is used, produced SoS features **MUST** be CHR‑typed via `FeatureTypingRefs{CharacteristicId/ScaleId/CoordinateId}` (owner: `G.3`) and any legality/units obligations must be satisfied via CSLC/CG owners (cite `A.18` / `G.0` / `G.4`; do not invent interop‑local legality gates).

9. **CC‑G13‑TelemetryEmitsCanonicalTriggerKinds.** *(delegated)* Interop‑driven changes (external edition bumps, mapping policy changes, plane‑map edits, embedding‑spec edits) **MUST** emit canonical `RSCRTriggerKindId` causes with explicit scope and payload pins.
   → delegate to `CC‑GCORE‑TRIG‑1`, `CC‑GCORE‑TRIG‑2`, `CC‑GCORE‑TRIG‑3`, `CC‑GCORE‑TRIG‑4`.

10. **CC‑G13‑IDContinuityForExternallySourcedIdentifiers.** *(delegated)* Interop publication **MUST** follow Δ‑discipline: no “renaming by meaning”; use aliases/deprecations as required.
   → delegate to `CC‑GCORE‑ID‑1`, `CC‑GCORE‑ID‑2`.

11. **CC‑G13‑NotationIndependence.** *(local)* Conformance is judged on the conceptual objects in `G.13:4.2`. Any serialisation is non‑normative and must not redefine semantics.
   *(Cites `E.5.2` for notation independence.)*
## Common Anti‑Patterns and How to Avoid Them

* **Anti‑pattern: “Format == spec”.** Treating an export schema (KG dump, JSON, RO‑Crate, etc.) as the normative definition.
  **Remedy:** Keep `ExternalIndexCard` / `ClaimMapperCard` / `InteropSurface` as the conceptual contract; treat serialisation as an appendix/tooling concern.

* **Anti‑pattern: Hidden scale invention.** An embedding similarity becomes a “score” without explicit typing/binding.
  **Remedy:** Require `ScaleEmbeddingSpecRef` + edition pins and bind any derived features through CHR/CAL owners.

* **Anti‑pattern: Implicit plane/context reuse.** Reusing external concept graphs across contexts without explicit crossing pins.
  **Remedy:** Publish crossing visibility pins and route through bridge/plane owners; never fuse contexts “inside the aligner”.

* **Anti‑pattern: Edition‑free dashboards.** Feeding externally derived rows into dashboards without pinned editions/policies.
  **Remedy:** Pin `ExternalIndexRef.edition` and `ClaimMapperRef.edition`; emit RSCR triggers on changes.

* **Anti‑pattern: Interop asserts defaults.** “Interop decides dominance regime / portfolio mode.”
  **Remedy:** Treat defaults as citations only (single owner in `G.Core.DefaultOwnershipIndex`).
## Consequences

* **Interop becomes refresh‑ready.** External source drift produces typed RSCR causes with scopes/payload pins; refresh becomes slice‑scoped rather than global guesswork.
* **Generation‑first authoring becomes cheaper.** External sources become controlled inputs into SoTA synthesis and portfolio exploration, not ad‑hoc audit decoration.
* **Conceptual hygiene improves.** Explicit cards + edition pins reduce semantic leakage from tools/formats/providers.
* **Cross‑tradition reuse becomes auditable.** Plane/context reuse is surfaced as crossings rather than embedded assumptions.
## Rationale

FPF is a conceptual framework for disciplined creative work, not a data governance system. External scholarly infrastructure is valuable precisely because it provides fast, wide coverage—but without an explicit interop kit, that value is purchased by silently importing semantics (implicit comparisons, unpinned editions, hidden transformations).

`G.13` resolves the tension by turning “interop” into **first‑class conceptual wiring**: cards/surfaces that pin editions, cite owners, expose provenance hooks, and produce typed refresh causes, while leaving domain/tool specifics in `Extensions` (or Phase‑3 owners).
## SoTA‑Echoing (post‑2015, for orientation; non‑normative)

* **Scholarly claim graphs & open indexes.** Open research KGs and open scholarly indexes encourage claim‑level representations and concept taxonomies as interop substrates (post‑2015 ecosystem: KG‑style contribution graphs; open indexing initiatives). Treat these as *sources* registered via `ExternalIndexCard`, not as semantic owners.

* **Neural representations for scientific text.** Transformer‑based scientific encoders (e.g., SciBERT‑class; citation‑aware paper representations such as SPECTER‑class; later retrieval‑oriented scientific embedding families) are useful as *alignment heuristics*. In FPF terms, they belong behind `ScaleEmbeddingSpec` + pinned editions/policies (see `G.13:Ext.EmbeddingBasedAlignment`).

* **Schema matching & entity resolution (deep‑learning era).** Modern matcher families (deep entity matching, contrastive representation alignment, GNN‑assisted graph alignment) help populate interop cards, but must not become “implicit semantics”; record their use as policy‑bound wiring in extensions.

* **Systematic review process modernisation.** PRISMA‑2020‑class workflow records (post‑2015 practice) are valuable as evidence anchors and coverage telemetry; treat them as evidenced inputs (EvidenceGraph anchors + pinned editions/windows), not as legality gates.

* **QD / Illumination and OEE portfolios.** Post‑2015 QD (MAP‑Elites successors, CMA‑ME line, differentiable QD toolkits) and OEE (POET‑class and related environment/method co‑evolution lines) often rely on external taxonomies and environment corpora. Interop should expose those as pinned external editions and keep coverage/regret as telemetry inputs—never as implicit dominance.
## Relations

**Builds on:** `G.Core`.
**Imports:** `G.2`, `G.3`, `G.4`, `G.5`, `G.6`, `G.7`, `G.9`, `G.10`, `G.11`, `A.19`, `A.18`, `G.0`, `F.17`, `E.5.2`, `E.18`.
**Publishes to:** UTS (twin labels where applicable); refresh inputs to `G.11`; shipping hook surfaces to `G.10` (as cited artefacts).
**Relates to:** `G.12` (dashboards), `G.8` (SoS‑LOG bundle surfaces) when interop‑derived artefacts are consumed there.
## Author’s quick checklist (informative)

1. Register each external source snapshot as an `ExternalIndexCard@Context` with explicit `ExternalEdition`.
2. Author a `ClaimMapperCard@Context` with explicit `MappingPolicyRef` and required edition pins.
3. If you derive SoS features, declare a `SoSFeatureTransform@Context` and cite CHR typing refs and provenance hooks.
4. Publish an `InteropSurface@Context` that cites all active `…Ref.edition` values and UTS rows.
5. On any external edition or policy change, emit canonical RSCR trigger causes with explicit scope + payload pins.
6. Keep provider/tool specifics in `Extensions` (or Phase‑3 seed) and do not let formats redefine semantics.
## G.13:End
