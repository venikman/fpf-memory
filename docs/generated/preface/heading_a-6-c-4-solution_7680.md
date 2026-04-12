---
title: "A.6.C:4 — Solution"
description: "Generated reference page for heading:a-6-c-4-solution:7680."
---

# A.6.C:4 — Solution
> Preface node `heading:a-6-c-4-solution:7680`

## Content

A.6.C introduces a **Contract Bundle** lens for boundary writing. It is not a new foundational entity kind; it is a disciplined way to interpret and rewrite contract-language so it becomes routable under A.6.B.

## A.6.C:4.1 — The Contract Bundle (four-part unpacking)

Whenever a text uses “contract / guarantee / promise / SLA / interface agreement” language, unpack it into four parts:

1. **Promise Content (Promise content)**

   * The promised value/effect (the promise *content*) in the intended scope.
 * In FPF terms (A.2.3), **`U.PromiseContent` is promise content**—a **promise content**, not an execution event (`U.Work`) and not (by itself) an accountable deontic binding (`U.Commitment`). 
 * **Prose head rule (normative).** When referring to `U.PromiseContent` in normative prose, authors SHALL use the head phrase **promise content** (or **service offering clause** / **service promise clause**) and SHALL NOT rely on the bare head noun *service*. If the surrounding text also talks about endpoints/systems/operations, apply **A.6.8** to select facet‑typed phrases (service access point / service delivery system / service delivery work / …) rather than collapsing them into “service”.
   * **Recommendation:** give the promise-content a stable local ID (e.g., `SVC-*`) so it can be cited from commitments, gates, evidence, and MVPK faces without paraphrase drift.
 * **Routing discipline:** keep the semantics/definitions of the promised behavior in **L**; express *who is accountable for satisfying the promise* as a **D** claim (`U.Commitment`) that **references** the `U.PromiseContent` (plus any `A-*`/`E-*` claims as needed).

2. **Utterance Package (speech act + published descriptions)**

   * The work occurrence of stating/publishing/approving (a `U.SpeechAct <: U.Work`, A.2.9) **and** the utterance descriptions it produces or updates (versioned **epistemes** on carriers) that host the routed claim set.
   * A speech act **may** institute/update commitments, but only under an explicit context policy that recognizes that `actType` as having such institutional force.
   * The published utterance descriptions (signature/mechanism spec + MVPK faces) host routed claims (L/A/D/E). The act is not “the contract”; it is the work occurrence that created/updated the descriptions and (when recognized) the associated commitments.
   * **Default interpretation rule (normative).** A conformant boundary model **MUST NOT** infer or assume any `U.Commitment` objects solely from the presence of a `Publish`/`Approve` `U.SpeechAct`. Publication creates/updates utterance descriptions and MAY institute publication/status claims (e.g., “Published”, “Approved as Standard”, “Deprecated”), but commitments exist only when represented explicitly as `U.Commitment` records (A.2.8).
   * If a bounded context defines a policy that maps certain publish/approve act types to commitment-instituting effects (e.g., a named `SpecPublicationPolicy@Context`), the model **MUST** cite that policy, and any resulting commitments **MUST** still be represented explicitly as one or more `U.Commitment` objects with accountable subjects (not inferred from publication alone).

3. **Commitment (Deontic accountability relation)**

   * The accountable agent/role bound to obligations/permissions/prohibitions (including being accountable for satisfying a promise content).
   * This bundle part is the **D‑side commitment object**: by default, one or more `U.Commitment` records (A.2.8).
   * **Default checklist (A.2.8 minimal structure):**
     * `id` (stable; often the `D-*` claim ID),
     * `subject` (accountable role/party; never an episteme),
     * `modality` (normalized deontic token / BCP‑14 family),
     * `scope` (`U.ClaimScope`) and `validityWindow` (`U.QualificationWindow`),
     * `referents` (by reference/ID: promise content IDs like `SVC-*`, plus `L-*`/`A-*`/`MethodDescriptionRef(...)`/`ServiceRef(...)` as needed),
   * `referents` (by reference/ID: promise content IDs like `SVC-*`, plus `L-*`/`A-*`/`MethodDescriptionRef(...)`/`PromiseContentRef(...)` as needed),
     * optional `owedTo` (beneficiary/counterparty),
     * optional `adjudication.evidenceRefs` when the commitment is meant to be auditable (point to `E-*`),
     * optional `source` when authority/provenance matters (issuer + instituting `speechActRef` + description reference),
     * optional `notes` for explicitly informative commentary (not part of the binding).
   * A commitment is not “the spec text”: utterance descriptions carry the statement, but the binding is the `U.Commitment` object (A.7 / A.2.8).
4. **Work + Evidence (Adjudication substrate)**

   * The executed work and the observable carriers/traces that can adjudicate whether a commitment was met.
   * This is **E quadrant**: “what evidence is produced/exposed/retained, under what conditions, and how it is interpreted”.
   * Work is not “the contract”; it is what makes any operational claim testable.
   * In FPF terms, evidence is normally expressed as **carrier‑anchored `E-*` claims** (often backed by `U.EvidenceRole` assignments on epistemes with provenance from Work).
## A.6.C:4.2 — Routing recipe into A.6.B (L/A/D/E)

After unpacking, route each **atomic** statement using the Boundary Norm Square as defined normatively in **A.6.B** (quadrant semantics + form constraints + cross‑quadrant reference discipline). A.6.C does not redefine `L/A/D/E`; it applies them to contract-language as follows:

* **Promise content → L/A (promise semantics + eligibility).**
  * Put meanings, invariants, and metric definitions for what is promised in **L** (`L-*` in signature laws/definitions).
  * Put “eligible/covered/valid iff …” predicates as **A** (`A-*` admissibility/gate predicates), not as deontic obligations.
* **Commitment → D (who is accountable).**
  * Put “MUST/SHALL/commits to …” statements as **D** (`D-*`), preferably as `U.Commitment` payloads (A.2.8).
  * If compliance requires satisfying/enforcing a gate, the commitment **MUST** reference the relevant `A-*` ID(s) (D→A).
  * If the commitment is meant to be auditable, include evidence hooks by referencing `E-*` (D→E), preferably via `U.Commitment.adjudication.evidenceRefs`.
* **Work + Evidence → E (how we can tell).**
  * Put observable traces, audit records, measurement windows, and carrier semantics as **E** (`E-*`) with explicit carrier and observation/measurement conditions (A.6.B:5.4).
**Keyword placement rule (canonical claim set).**
Within the canonical routed claim set, BCP‑14 norm keywords (RFC 2119 + RFC 8174)—and their common synonyms (e.g., SHALL, REQUIRED, RECOMMENDED, OPTIONAL)—belong in **D** claims only, expressed as `U.Commitment.modality` and normalized per **A.2.8**. Authors **SHOULD** avoid using these keywords in **L/A/E** claims; phrase **L** as definitions/invariants (“is defined as…”, “holds iff…”), **A** as predicates (“is admissible iff…”), and **E** as observable/evidenced properties. If a BCP‑14 keyword (or synonym) appears in an **L/A/E** claim, it **SHOULD** be rewritten into predicate/definition form (or explicitly marked informative) before publication.

A helpful rewrite rule:

> If a sentence mixes “when allowed” + “who must comply” + “how we can tell”, decompose it into an **A** predicate, a **D** duty referencing that predicate, and an **E** evidence claim referencing that predicate (per A.6.B triangle decomposition).
## A.6.C:4.3 — “Guarantee” disambiguation

Treat “guarantee” as ambiguous until routed:

* **Semantic guarantee** → **L** (“by definition / invariant”).
* **Governance guarantee** → **D** (“provider commits / implementer must”).
* **Operational guarantee** → **E** (measured property with evidence expectations; optionally referenced by D as the adjudication target).

If none of these fits, the statement is likely rhetorical and should be rewritten or explicitly marked as aspirational/informative.
## A.6.C:4.4 — MVPK faces are not second contracts

A contract bundle has one canonical claim set. Publication faces are **views** of that set under viewpoints:

* Faces may **select, summarize, and render** claims for audiences.
* Faces must not **introduce new semantic commitments** beyond the underlying claim set.
* Any face-level decision-relevant / normative-looking statement **SHOULD** cite the underlying claim ID(s). If it cannot be traced to claim IDs, it **MUST** be explicitly presented as informative commentary.

**Keyword rule (faces).**
If a face contains BCP‑14 norm keywords (RFC 2119 + RFC 8174), including common synonyms (SHALL, REQUIRED, RECOMMENDED, OPTIONAL), then each such sentence MUST be a projection of an existing **D‑*** claim (`U.Commitment`) and MUST cite the underlying **D** claim ID(s).
If a sentence cannot be traced to **D‑*** claim IDs, it MUST be rewritten to remove BCP‑14 keywords (e.g., turn it into explanatory prose that cites the relevant claim IDs) or moved out of the face.
To avoid keyword‑evasion, equivalent deontic phrasings (e.g., “is required to…”, “is prohibited from…”) SHOULD follow the same trace-by-ID discipline even when no BCP‑14 keyword is present.

Projection may be paraphrased for audience fit, but it **MUST NOT** change the deontic/semantic content; if exactness is critical or disputed, use verbatim.

This prevents faces from becoming “second contracts” by paraphrase drift.
## A.6.C:4.5 — Default artefact: Contract Claim Register (recommended)

Use the **A.6.B Claim Register** (IDs + statements + quadrant + anchor). Add two optional columns that make A.6.C auditable without adding new ontology:

* `bundleId: ContractBundleId` (local stable ID grouping the claims that constitute one boundary “contract bundle”)
* `bundlePart ∈ {PromiseContent, Utterance, Commitment, WorkEvidence}`
* `faceRefs = {PlainView|TechCard|InteropCard|AssuranceLane : …}` (where the claim is rendered)
