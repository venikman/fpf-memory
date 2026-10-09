# Proposal: support the current FPF Library

Date: 2026-10-09, America/New_York. Status: **proposal only**; no corpus implementation, public contract change, or publication is authorized by this document. The production recovery work is separate.

## Recommendation

Keep the existing Core compiler and its callers working. Add a versioned, multi-publication source inventory and an exact section reader, then deterministic search over the declared inventory. Only after those pass their gates should we extend question routing and the hosted public interface. Do not concatenate the Library into `FPF-Spec.md` or imply that the current Core runtime already covers it.

The first useful result is modest: a user can discover the available publications, find a passage in any admitted publication, read its complete context in bounded pages, and cite the exact edition. Cross-publication synthesis remains a later, separately evaluated capability.

## What changed upstream: observed facts

Research pinned `ailev/FPF` to commit [`0c6ade275e9360f0c5ab9715d8f05c0dbaa13cf8`](https://github.com/ailev/FPF/tree/0c6ade275e9360f0c5ab9715d8f05c0dbaa13cf8), committed 2026-10-07T22:29:00Z. Its recursive Git tree contains 44 files: **40 publication Markdown files, 31,945,891 bytes**, plus two `LICENSE` and two `LICENSING.md` files. This is an observed inventory at one commit, not a permanent count.

| Publication group | Files | What the inventory contains |
| --- | ---: | --- |
| FPF Core | 1 | `FPF-Spec.md`, 16,125,961 bytes |
| Engineering DPF Suite | 29 | 27 DPFs, Suite README, Suite Reference |
| Foundational Thinking DPF Suite | 7 | 5 DPFs, Suite README, Suite Reference |
| Independent Narrativization DPF | 1 | Root publication outside the two Suite directories |
| Common entry and use material | 2 | Root `Readme.md`, `USING-FPF.md` |

The [upstream README](https://github.com/ailev/FPF/blob/0c6ade275e9360f0c5ab9715d8f05c0dbaa13cf8/Readme.md) names this collection **FPF Library** and directly recommends [fpf.tools](https://fpf.tools/) for browser and read-only MCP access. It does not identify this repository as that service's implementation. The [service's about page](https://fpf.tools/about) separates the publication collection, service, index, and snapshot; service ownership and a software-repository relationship to `venikman/fpf-memory` were not established.

The [machine-readable fpf.tools status](https://fpf.tools/api/status), retrieved during the audit, reported the same upstream commit, snapshot `20261007T222953Z-a9741b4ecd6fb49a`, 40 publications, 859 patterns/other named entries, and 22,345 sections. Its [connection documentation](https://fpf.tools/connect) describes search, publication discovery, exact section/pattern reading, backlinks, and snapshot-bound continuation. These are useful comparison points; they are not independently reproduced counts from our compiler or permission to claim feature parity.

Source shapes are materially different:

- Core uses IDs such as `A.1.1`; DPFs also use multi-letter numeric IDs such as `CHK.1` and `MATH.16`, and word suffixes such as `KCAE.SOURCE`.
- A pattern body can start at `## SYSE.24 - ...` and finish at `### SYSE.24:End`. Contents rows and references repeat IDs and must not be mistaken for bodies.
- Practical-entry anchors such as `MP-FRAME`, worked examples, ordinary headings, References, and usage instructions also contain substantive material. A practical-entry label is not automatically a PatternID.
- Relative cross-file links contain spaces, percent encoding, and anchors. Suite membership and a reference to another publication are different relations.

The [common usage instruction](https://github.com/ailev/FPF/blob/0c6ade275e9360f0c5ab9715d8f05c0dbaa13cf8/USING-FPF.md) emphasizes searching the declared available set, reading substantive passages with their conditions, and exposing incomplete access. The directly read [KCAE.SOURCE pattern](https://github.com/ailev/FPF/blob/0c6ade275e9360f0c5ab9715d8f05c0dbaa13cf8/Engineering%20DPF%20Suite/KNOWLEDGE-CORPUS-ACCESS-ENGINEERING-PRINCIPLES-FRAMEWORK.md#kcaesource---prepare-addressable-sources-without-losing-their-context) is particularly relevant: its sections 4.1–4.4 distinguish immutable sources, derived finding units, complete reading context, and edition-bound continuation. These sources support the proposed boundaries; they do not validate an implementation.

## Current repository boundary

The following is based on the checked-out source, not an assumption about future recovery commits:

- [README](../README.md) explicitly scopes the runtime to one Markdown specification.
- [Upstream acquisition](../src/build/upstream-source.ts) resolves one `specPath` and pins its raw GitHub URL to declared provenance.
- [Publication validation](../src/build/published-surface.ts) validates one spec, manifest and snapshot with one `sourceHash`.
- [Compiler](../src/runtime/compiler.ts) assembles one `Snapshot`; [types](../src/core/types.ts) use bare node IDs and one top-level source path/hash.
- [Source parser](../src/runtime/source-parser.ts) expects one uppercase letter followed by a dot and number for structured IDs. Expanding this grammar alone would not provide publication identity, generic section coverage, or reliable cross-file resolution.
- Core route heuristics and the deterministic evaluator are Core-specific. Their semantics should not be silently applied to new DPF text.

`fpf_reference.get_fpf_index_status({})` was checked during this research. It reported an internally consistent snapshot built 2026-09-08T11:43:42Z with hash `sha256:1f35c51ab93aa94e1a2ce7358b5ffd06ab024be6d251b5058ffcc6f764443b32`. That runtime is not evidence for the newer Library inventory or exact KCAE wording; those were inspected in the pinned upstream files.

## Options and decision

| Option | Benefit | Limit | Decision |
| --- | --- | --- | --- |
| Keep Core only and refer Library requests to upstream/fpf.tools | Small operational burden; immediate access to new material | No local, reproducible Library retrieval through this runtime | Valid fallback while recovery and a pilot proceed |
| Add a local, deterministic publication layer while preserving Core | Exact source control, offline use, common website/CLI/MCP evidence | Requires identities, a section reader, packaging and change tests | **Recommended staged route** |
| Replace our runtime with a remote fpf.tools dependency | Reuses a published reading service | Couples availability, contracts and provenance to a separately operated service; no migration agreement or SLA established | Do not adopt as the default without a separate product decision |
| Concatenate files or extend Core regexes and route heuristics globally | Superficially small patch | Colliding locators, lost file/license boundaries, misleading coverage and relationships | Reject |

## Source inventory and identity

All names and fields in this section are **proposed**, not existing APIs.

Introduce a corpus manifest version alongside the existing Core publication format. One build resolves the upstream branch to an immutable commit, inventories and downloads every admitted path from that commit, verifies bytes, compiles in staging, and activates the completed corpus atomically. Never fetch different files from a moving `main` within one candidate.

The manifest should record:

- Corpus schema version, corpus digest, source repository and resolved commit, selected publication set and exclusions, compiler fingerprint, dependency/format versions, upstream commit time, and separately the actual acquisition/build/publication times. A commit timestamp must not masquerade as deployment time.
- For each publication: a persistent locally assigned `publicationId`, exact title, publication kind, optional declared Suite membership, current source path, Git blob object ID, SHA-256 of original bytes, byte count, source language when evidenced, and links to the pinned source and applicable rights notices.
- An edition identity binds repository, commit, path and content digest. The persistent publication identity survives a reviewed file rename; title equality or equal bytes alone cannot establish identity. Renames, splits and merges need explicit mappings and provenance.
- A corpus digest covers a canonical ordered inventory of publication identities, editions, selection rules, and applicable compiler schema. Keep source-content identity distinct from a compiled-build identity so recompilation does not imply upstream change.

Initially admit only the publication set in the pinned public `ailev/FPF` tree, excluding license files from search but retaining them with the sources. New paths should generate an inventory diff and a proposed classification; unknown or ambiguous membership requires review instead of silent omission or automatic ingestion. Out of scope: third-party DPFs, external cited literature, private documents, PDFs/OCR, audio/video, machine-specific folders, and arbitrary URLs.

Upstream's [licensing notice](https://github.com/ailev/FPF/blob/0c6ade275e9360f0c5ab9715d8f05c0dbaa13cf8/LICENSING.md) labels the author's original framework content CC BY 4.0, while retaining separate terms for third-party material and excluding unrelated software. Preserve attribution, source and license links, supplied notices, and whether content was transformed. Keep original Markdown separate from generated summaries. This proposal does not choose a license for our software or assert that every cited external work may be copied.

## Compilation, exact reading and retrieval

Use a common structural parser for all admitted Markdown: headings, hierarchy, exact source spans, lists/tables/code blocks, links and explicit HTML anchors. Build a publication catalog and section index even where no PatternID is recognizable. Retain original bytes and line ranges for citations; any normalized search representation records its mapping back to those bytes.

Layer publication-specific pattern recognition over that structure. Preserve the current Core compiler behind an adapter. Add DPF grammar fixtures for numeric and word-suffix IDs, prefaces, `:End`, multiple dash styles and ordinary headings. Recognize named patterns from their body structure and catalog evidence, not every capitalized token. Keep Core-generated routes separate from source-authored Reference passages and practical entries.

Use qualified node keys internally: `(publicationId, localLocator)` plus edition on every evidence-bearing result. Bare `A.1.1` remains a Core lookup for existing callers; a new bare ID with multiple candidates returns ambiguity. Heading slugs are edition-local locators, not promises of permanent identity. Duplicate headings need deterministic disambiguation.

The exact reader returns original Markdown, enclosing context, precise citation, selected corpus/edition, completeness and continuation. A cursor binds the publication, edition, locator and offset; it cannot continue into a new snapshot. Retain immutable released artifacts for rollback and citation reproduction. Initially the public live service can reject an old cursor with an explicit edition-mismatch result; it must not silently read the latest text or promise arbitrary historical online access. Operators can inspect retained artifacts offline.

Search first supports literal IDs, words, phrases and explicit publication/Suite/kind filters, with documented semantics. Rank identifiers and substantive sections while retaining an independent original-text route. A hit includes enough surrounding context and a reader locator; it does not stand in for a complete method. Report the searched set and any exclusions. No embedding service, vector database, generated routing, translation or synonym expansion is required for the first release.

Resolve cross-file links against the pinned source tree. Store link evidence separately from claims such as `builds_on` or Suite membership. Preserve unresolved links with reason and source span. An unavailable external source must not become a broken internal node or an invented semantic relation. Inferred relations, if later introduced, need explicit origin and validation separate from source-authored links.

## Delivery stages and gates

| Stage | Deliverable | Gate and proposed verification profile |
| --- | --- | --- |
| 0. Recover existing service | Current Core publication, coherent artifacts, working sync and cost visibility | Separate recovery work; do not bundle the Library architecture into its repair |
| 1. Inventory and source reader pilot | Versioned manifest, original files, catalog, exact sections, source citations and offline CLI | P2 local feature; two identical pinned builds agree; mutation/cursor fixtures pass; existing Core checks unchanged |
| 2. Complete Library search | All 40 publications at the researched commit, generic section search and explicit link resolution | P2 local feature; full inventory accounting and representative retrieval workload; no claim that 859 service entries equal our pattern definition |
| 3. Preview website and MCP | Publication discovery, exact reading and corpus search through explicit opt-in contracts | P3; contract and compatibility tests, preview E2E, measured bundle/memory/latency evidence, source-return inspection |
| 4. Operated publication | Guarded corpus sync, rollback, corpus-aware monitoring and public scope copy | P4; bounded retries/spend, inventory-diff review, independent currentness check, production evidence packet and explicit publishing approval |
| 5. Broader question routing | Optional cross-publication candidate selection and synthesis support | Separate usefulness evaluation against exact search + reading; no promotion merely because indexing succeeds |

For Stage 1, select a small test set spanning Core, `USING-FPF.md`, Engineering README/Reference, Systems Engineering, Knowledge-Corpus Access Engineering, Foundational Reference and Mathematical Thinking. These eight files exercise numeric/word IDs, practical entries, guide/reference content, spaces in paths and cross-file links. Stage 2 then covers the entire admitted inventory and its unrecognized shapes.

Preserve the existing six-tool hosted contract during local work. Prototype Library functions in local CLI/full runtime first. Before public release, review an additive opt-in corpus interface with explicit versioning and contract tests; do not silently widen existing Core query semantics or its `sourceHash` meaning. Tool names and response schemas remain a Stage 3 design decision. Public setup/coverage copy belongs in `src/core/public-copy.ts` when implementation is approved.

## Acceptance criteria and falsification tests

1. **Inventory completeness:** each selected upstream publication is admitted or explicitly excluded with a reason. The pinned research commit yields 40 admitted publications and 31,945,891 source bytes under the stated selection rule. A new file or deletion changes the manifest and is visible in the review.
2. **Exact source return:** test a Core pattern, `SYSE.24`, `KCAE.SOURCE`, `MATH.16`, `USING-FPF`, a Suite Reference section and a practical entry. Reader output maps to exact source spans; tables/code/links and terminal conditions survive pagination. A preview cannot claim complete reading.
3. **Change safety:** rename, changed parent context, duplicate heading, deleted locator, split section and midway publication update fixtures produce explicit correct outcomes. No cursor mixes editions and no candidate with a missing/hash-mismatched file becomes current.
4. **Relations:** local links resolve in their publication, encoded cross-file links resolve to the intended edition, external/unresolved links remain labeled, and a cross-reference does not imply membership or equivalence.
5. **Compatibility:** existing Core CLI, exact-doc URLs, public MCP schemas/tool list, query expectations and evaluator behavior still pass. Library absence yields a declared coverage limit, not unsupported claims about upstream.
6. **Useful retrieval:** a maintained set of 20 concrete tasks includes 5 Core lookups, 5 DPF lookups, 5 cross-publication Reference questions and 5 negative/ambiguous/change cases. Reviewers record candidate relevance, sufficient readable context, citations and failures. Mechanical exactness must pass all 20; usefulness claims wait for actual scores and a documented release threshold.
7. **Operational feasibility:** measure full-corpus artifact size, peak build/runtime memory, cold and warm requests, retrieval/reading latency, deploy limits and spend against the recovered Core baseline. No latency, adoption or cost advantage is claimed now. If a current hosting limit or agreed spend ceiling is exceeded, stop before public rollout and choose sharding/lazy publication loading or a different deployment design through a separate decision.
8. **Independent freshness:** status distinguishes source/snapshot integrity, corpus completeness, newest upstream commit checked, last successful check and check failure. A failed or stalled refresh keeps the last good edition visible and makes drift actionable; it never reports latest solely from matching local hashes.

Required implementation evidence, when stages exist: focused parser/manifest/reader tests, actual CLI inventory → search → read including continuation, existing `bun run check`, docs build for changed docs, MCP QA plus preview contract E2E for hosted changes, deploy dry-run and production evidence per `AGENTS.md`. These checks have **not** been run for an unimplemented design.

## Risks, decisions and stop conditions

The main risks are publication identity drift, incomplete section parsing, treating search matches as sufficient context, copying Core assumptions into DPFs, runtime growth, and widening automated publication while recovery is still fragile. Each stage has a reversible output and a gate above. No new dependency is justified until the parser/packaging pilot demonstrates its need.

Recommended decisions now: support the declared upstream Library locally; preserve Core compatibility; start with exact source access; keep `fpf.tools` a documented external option. Decisions before public release: the additive MCP contract, historical-serving promise, measured hosting budget, automatic-admission policy for new publications, and ownership of corpus/schema changes. A relationship or migration agreement with fpf.tools would reopen the build-versus-dependency decision.

Stop or replan if recovery remains red, source rights/provenance cannot be identified, an upstream source cannot be read completely, IDs cannot be disambiguated without invention, the whole-corpus build exceeds agreed limits, or the new interface degrades existing Core behavior. Do not lower evidence gates to make publication proceed.

## Performed research and remaining uncertainty

Performed: read repository instructions, README, acquisition/publication/compiler/parser/types; queried GitHub HEAD and the commit-pinned recursive tree; downloaded and inspected the root README, common use instruction, rights notices, both Suite READMEs, selected DPF bodies and a Suite Reference; read fpf.tools about/status/connect; checked hosted `fpf_reference` freshness. No Library code, MCP registration, published artifact, workflow or deployment was changed for this proposal.

Reproduce the inventory reads with:

```sh
gh api repos/ailev/FPF/commits/main --jq '{sha: .sha, committedAt: .commit.committer.date}'
gh api 'repos/ailev/FPF/git/trees/0c6ade275e9360f0c5ab9715d8f05c0dbaa13cf8?recursive=1' \
  --jq '.tree[] | select(.type=="blob") | [.path,.size] | @tsv'
```

Source texts were read from `https://raw.githubusercontent.com/ailev/FPF/<pinned-commit>/<encoded-path>`. The complete 40-file body set was not parsed or benchmarked here. Counts of 859 entries and 22,345 sections remain fpf.tools-reported, while the file/byte inventory was independently counted from GitHub. Public web extraction had intermittent failures; pinned GitHub API/raw reads succeeded. Research source files and the tree response are retained temporarily under `/tmp/fpf-materials-proposal-evidence/`; durable citations above point to the immutable upstream commit.

## Optional external GPT-5.5 Pro critique prompt

Run manually with this proposal and the cited source/code excerpts attached:

> Critique this proposal to extend a deterministic, single-spec FPF runtime to a multi-publication FPF Library. Our immediate user need is to find and read current Core, DPF, Suite Reference and usage material with exact edition citations. The existing Core service must remain compatible. Compare (1) a local publication/section layer, (2) remaining Core-only with an upstream service handoff, and (3) depending on the external fpf.tools service. Attack the identity, continuation, source-return, cross-publication relation and operating-cost assumptions. Identify the smallest useful first release, any hidden public promises, and the tests that could falsify its usefulness. Separate supplied facts from assumptions; do not claim repository tests, deploys, permissions, service ownership, or upstream content were verified. Return your five most consequential findings, a revised recommendation if warranted, and explicit release/stop criteria.

This critique is optional judgment support. It is not a dependency for repository facts, tests, recovery or deployment evidence.
