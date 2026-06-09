# Prompt: Create an FPF Reference MCP Skill

Use this prompt to start a focused implementation or design discussion for a packaged agent skill that teaches coding agents how to leverage FPF Reference MCP.

```text
You are working in the FPF Reference runtime repository.

Objective
Create a small, registry-ready agent skill that helps coding agents use the hosted FPF Reference MCP server well. The skill should make agents better at bounded FPF lookup, exact ID/doc retrieval, and citation-backed reasoning without turning FPF Reference into agent memory, a workflow engine, or repo policy.

Bounded context
- FPF is the upstream framework specification.
- FPF Reference is the public reference surface.
- fpf_reference is the MCP server name.
- fpf-memory is the repository/runtime name, not the public MCP server name.
- The hosted MCP endpoint is https://mcp.fpf.sh/api/mcp/fpf_reference/mcp.
- The browser-readable health endpoint is https://mcp.fpf.sh/api/fpf/status.
- The legacy fpf_memory name or endpoint may appear only in explicit migration/compatibility text.

Primary users
- Coding agents working in repos that need FPF-grounded reasoning.
- Maintainers reviewing PRs, specs, plans, adoption docs, or coordination packets.
- Agents that can call MCP tools and need a short workflow for when to query FPF Reference.

Core behavior the skill should teach
1. Name the task's bounded context before using FPF terms.
2. Keep these layers separate: the thing, its description, its specification, and actual work.
3. Before trust-sensitive FPF use, call get_fpf_index_status.
4. Use query_fpf_spec in compact mode for route and FPF ID discovery.
5. Use read_fpf_doc only when exact generated wording is needed.
6. Use browse_fpf_catalog or search_fpf for discovery when the user has no selector or route.
7. Return compact work guidance with FPF IDs, citations or selectors, acceptance checks, and a next move.
8. Do not paste broad chunks of FPF into chat. Retrieve the smallest useful context.
9. Treat a browser GET returning 405 on the hosted MCP URL as expected; it is a streamable HTTP MCP endpoint, not a web page.
10. Keep promise, ability, and measured performance separate in final reports.

Recommended skill trigger language
Use this skill when the user asks for FPF-grounded planning, exact FPF IDs, canonical FPF wording, route suggestions, MCP connection checks, citation-backed FPF context, or review/evaluation language that should be grounded in the First Principles Framework.

Do not trigger it for generic project management, memory lookup, local repo policy, deployment work, browser testing, or code review unless the user explicitly asks for FPF grounding or stable FPF IDs.

Suggested workflow in SKILL.md
Explore:
- Read local AGENTS.md first when inside a repo.
- Identify the actual work surface and the FPF lookup need.
- If MCP tools are available, call get_fpf_index_status before relying on results.

Shape:
- Use query_fpf_spec with mode "compact" to find the smallest route or ID set.
- Prefer route packets and selectors over full generated documents.
- If wording matters, call read_fpf_doc for one selector at a time.

Evidence:
- Report which MCP tool was used and the relevant FPF IDs/selectors returned.
- Separate local repo evidence from FPF Reference evidence.
- Do not claim currentness unless get_fpf_index_status or the health endpoint was checked.

Operate:
- Apply the retrieved FPF context to the user's task.
- Return: Context | FPF IDs | Friction avoided | Acceptance check | Next move.
- Mention remaining uncertainty instead of expanding scope.

Candidate package shape
- A minimal SKILL.md is required.
- Add agents/openai.yaml or other registry metadata only if the target registry format requires it.
- Add references only if they remove real repetition; keep SKILL.md short.
- Do not add dependencies.
- Do not create broad tutorial docs unless the registry requires them.

Before implementation
- Inspect the current Vercel skills registry documentation and the current local skill-packaging conventions.
- Confirm whether this skill should live in this repo, a separate skills registry repo, or a personal/private skill directory.
- If the answer is not obvious, prepare the skill as a patch plus an explicit discussion note rather than claiming it is ready to publish.

Discussion items to surface
- Public name: fpf-reference-mcp, fpf-reference, or another registry-safe name?
- Audience: Codex-only, Claude Code, Cursor, or agent-agnostic?
- Default connection path: hosted endpoint only, with local stdio reserved for operators?
- Should the skill include example prompts, or only workflow guidance?
- What verification does the registry expect before merge?

Acceptance criteria
- The skill consistently uses "FPF Reference" and fpf_reference for the public MCP surface.
- It teaches agents to check index status before trust-sensitive FPF use.
- It keeps FPF lookup separate from memory, policy, planning ownership, and repo evidence.
- It includes a compact output contract with FPF IDs/selectors and next steps.
- It contains no legacy fpf_memory setup snippets except explicit migration notes.
- It can be installed or linted using the smallest real check available for the chosen registry format.
- Any PR or merge-readiness claim separates package-format validation from actual MCP runtime behavior.

Suggested smoke prompts for validation
1. "Use FPF Reference to ground a project kickoff packet for a new MCP adoption docs PR. Return IDs and an acceptance check."
2. "I found A.15 in a review. Read the exact generated doc preview and tell me whether it is enough for plan/run separation."
3. "My browser says the MCP endpoint returns 405. Is FPF Reference broken?"
4. "Do not use FPF; just review this TypeScript diff." The skill should not over-trigger.

Stop or replan trigger
Stop and ask before publishing if the registry package format is unclear, if the skill location is disputed, or if validation requires credentials or a non-Docker/untrusted MCP setup.
```

Grounding notes:

- Current Vercel agent-skills docs describe skills as packaged capabilities and document `npx skills add <owner/repo>` plus `--skill <skill-name>` for multi-skill repositories.
- This repository's public copy source keeps the canonical endpoint, server name, public tool list, and first-successful-call prompt in `src/core/public-copy.ts`.
- A live `fpf_reference.get_fpf_index_status` check on 2026-06-09 reported a fresh hosted index built from source hash `sha256:7b45ba487aa7b33aee51ad35462d0a700d05d351fef03dcb63998001af0a9afc`.
- A compact `query_fpf_spec` call for the skill scope returned `route:project-alignment`, `A.1.1`, `A.15`, `B.5.1`, optional `A.15.2` and `A.15.3`, and `F.17` as relevant grounding.
