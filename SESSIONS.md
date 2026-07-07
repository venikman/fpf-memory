# SESSIONS.md — cross-session orchestration registry

This file is the single coordination surface for the human-driven Claude
sessions that touch FPF Reference work (Claude Desktop / Cowork / Claude Code,
across the `fpf-memory`, `memory-sql`, and `wiki-index` projects). It applies
the [Automation Playbook](docs/automation-playbook.md) role map to interactive
sessions, which previously had no shared state and drifted the same way
rotating agents did.

It is a private operating record, not wiki content: it lives at the repo root,
outside the `docs/` Rspress content root, and must never contain credentials,
thread IDs, prompts pasted from users, or personal scheduling details.

## Operating rules

1. **The repo is the memory; sessions are workers.** Nothing durable may live
   only in a chat session. Anything worth keeping leaves the session as a PR,
   an issue, a Discussion, an `AGENTS.md` learned fact, or a row update in
   this file. A session that ends without externalizing its output produced
   nothing.
2. **One durable session per project, everything else bounded.** Each project
   keeps at most one long-lived "maintainer" session. Every other session is
   opened with a work-packet kickoff (goal, role, inputs, done-when), and is
   closed when its done condition is met. Sessions are cattle, not pets.
3. **Roles come from the Automation Playbook.** A session must name its role
   before it gets write authority. Discovery sessions stay read-only;
   implementation sessions end in one bounded PR; merge authority stays with
   the review/merge policy in the playbook.
4. **No duplicate monitors.** Work that repo automation already performs
   (`fpf-sync-monitor.yml` hourly upstream drift, `vercel-spend-monitor.yml`
   hourly spend, `sync-fpf.yml` guarded sync) is not re-done in chat sessions.
   A session may *read* monitor evidence; it does not re-implement the loop.
5. **Consumers use the hosted MCP, not pasted specs.** Sessions in other
   projects (`wiki-index`, `memory-sql`) that need FPF grounding connect to
   `https://mcp.fpf.sh/api/mcp/fpf_reference/mcp` and retrieve bounded IDs.
   That is the product's own adoption rule, applied to ourselves first.

## Session registry

Status is one of: **active** (durable, keep), **consolidate** (merge into the
named target, then close), **retire** (extract residue, then close),
**triage** (contents unknown; extract-or-retire on next open).

| Session (project) | Playbook role | Status | Disposition |
| --- | --- | --- | --- |
| Adoption strategy (fpf-memory) | Technical architect + Growth/publishing scout (draft-only) | **active** | The single strategy session. Absorbs "FPF-based projects for knowledge work" and "Strategy scaling research". Output lands as Discussions / issues / draft share packets, never as chat-only conclusions. |
| FPF server update check (fpf-memory) | FPF sync monitor | **retire** | Fully superseded by `fpf-sync-monitor.yml` + `vercel-spend-monitor.yml` (hourly, evidence-gated). Reopen only to debug the monitors themselves, as a bounded packet. |
| FPF Reference MCP setup (fpf-memory) | Implementation PR agent | **retire** | Setup shipped and is documented (`docs/connect-mcp.md`, https://fpf.sh/connect-mcp). Any residual setup friction becomes a product-role feedback packet, not a standing session. |
| Project context exploration (fpf-memory) | Dogfood/product scout | **retire** | Context now lives in `AGENTS.md` / `CLAUDE.md` / this file. On last open: extract any durable fact into `AGENTS.md` "Learned Workspace Facts", then close. |
| FPF memory and Glaze … (fpf-memory) | unknown (title truncated) | **triage** | On next open: state the session's role and one done condition. If neither exists, extract residue and close. |
| A2UI Composer gallery (memory-sql) | out of scope for this repo | **active** | The single `memory-sql` session. Keep separate; do not route FPF Reference decisions through it. If it needs FPF grounding, connect it to the hosted `fpf_reference` MCP. |
| Knowledge base indexing (wiki-index) | consumer / dogfood surface | **active** | The single `wiki-index` build session. Consumes FPF via hosted MCP (rule 5). Friction it hits is first-party adoption feedback — file it as a product-role feedback packet against this repo. |
| FPF-based projects for knowledge work (wiki-index) | Technical architect (strategy) | **consolidate → Adoption strategy** | Strategy about FPF-based projects is FPF Reference strategy. Move open threads into the Adoption strategy session, then close. |
| Strategy scaling research (wiki-index) | Growth/publishing scout | **consolidate → Adoption strategy** | Same consolidation. Research findings worth keeping become a Discussion or a draft share packet per the playbook's publishing rules. |

Target steady state: **three durable sessions** (Adoption strategy ·
Knowledge base indexing · A2UI Composer), plus short-lived work-packet
sessions that open and close per task. Claude Code sessions on this repo act
as the Implementation PR agent / maintainer and are inherently bounded by
their branch and PR.

## Session kickoff packet (template)

Open every new bounded session with this, filled in:

```txt
Role: <one row from the Automation Playbook role map>
Goal: <one sentence, one job>
Inputs: <repo paths, URLs, issue/PR/Discussion links — no pasted specs>
FPF grounding: hosted fpf_reference MCP; retrieve 3-8 exact IDs, on demand
Authority: <read-only | one bounded PR | draft-only>
Done when: <externalized artifact exists: PR / issue / Discussion / registry row>
On close: update SESSIONS.md registry row in the same PR, or state "no durable output".
```

## Consolidation kickoff prompts (paste-able)

**Into "Adoption strategy"** (after skimming the two wiki-index strategy sessions):

```txt
You are the single strategy session for FPF Reference (role: Technical
architect + draft-only Growth scout, per docs/automation-playbook.md). Two
other sessions are being folded into you: "FPF-based projects for knowledge
work" and "Strategy scaling research". Here are their open threads: <paste>.
Dedupe against what already exists in the fpf-memory repo (Discussions,
docs/start-here.md, docs/work-packets.md). Output: a Top 3 next-actions list
with owner and evidence path for each — as a GitHub Discussion or issue, not
as chat text. You may not publish externally; share packets stay drafts.
```

**Closing a retired session** (paste into each session marked retire/triage):

```txt
This session is being closed under SESSIONS.md in venikman/fpf-memory. Before
we close: list any conclusion, fact, or open thread from this conversation
that is not yet in the repo (AGENTS.md, docs/, an issue, a PR, or a
Discussion). For each, give me the one-line externalization (file + wording,
or issue title + body). If nothing qualifies, say "no durable output".
```

## Maintenance

- Update a registry row in the same PR as the work that changes it.
- When a monitor, workflow, or doc makes a session redundant, retire the
  session in this file first, then close it — never the reverse.
- Review this registry when a new durable session is created or roughly
  monthly; if the registry and the sidebar disagree, the sidebar is wrong.
