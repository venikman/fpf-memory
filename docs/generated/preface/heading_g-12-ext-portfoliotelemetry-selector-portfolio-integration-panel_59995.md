---
title: "G.12:Ext.PortfolioTelemetry — selector/portfolio integration panel"
description: "Generated reference page for heading:g-12-ext-portfoliotelemetry-selector-portfolio-integration-panel:59995."
---

# G.12:Ext.PortfolioTelemetry — selector/portfolio integration panel
> Preface node `heading:g-12-ext-portfoliotelemetry-selector-portfolio-integration-panel:59995`

## Content

**PatternScopeId:** `G.12:Ext.PortfolioTelemetry`
**GPatternExtensionId:** `PortfolioTelemetry`
**GPatternExtensionKind:** `MethodSpecific`
**SemanticOwnerPatternId:** `G.5` *(portfolio semantics and set‑return discipline)*
**Uses:** `{G.5, G.6}`
**⊑/⊑⁺:** `∅`

**RequiredPins/EditionPins/PolicyPins (minimum):**

* `TaskSignatureRef?` *(when portfolio semantics depend on TaskSignature traits)*
* `DominanceRegime` *(resolved via `DefaultId.DominanceRegime` owner routing; publish the resolved regime, do not invent a local default)*
* `PortfolioMode` *(resolved via `DefaultId.PortfolioMode` owner routing; publish the resolved mode)*
* `SCRId/DRRId` *(or equivalent selector evidence pins, when dashboard row depends on selector outcomes)*

**DefaultsConsumed:** {`DefaultId.DominanceRegime`, `DefaultId.PortfolioMode`} *(owners routed via `G.Core.DefaultOwnershipIndex`; no local defaults)*

**RSCRTriggerKindIds (delta):** `∅` *(base triggers suffice; any extra triggers must be explicit)*

**Notes (wiring‑only):**

* The dashboard may visualise portfolio/Archive telemetry, but MUST keep set‑returning semantics; any scalar “headline number” is a view projection, not a legality‑bearing decision.
