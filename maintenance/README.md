# FPF Reference — Maintenance Strategy

Operator-internal strategy for keeping FPF Reference **current, available, accessible, and
drivable** with a steward who is present only intermittently (roughly every 2–4 weeks).

> **This directory is deliberately outside `docs/`.** `docs/` is the Rspress publish root; any
> `.md` there becomes a public page on `fpf.sh`. These notes reference deployment specifics,
> cadence, and internal operating decisions, so they stay in-repo and out of the public site.
> The *public* operating model is [`docs/automation-playbook.md`](../docs/automation-playbook.md);
> this directory is the private *cadence + direction* layer above it.

## Contents

| Doc | Question it answers |
| --- | --- |
| [`maintenance-strategy.md`](./maintenance-strategy.md) | How does FPF Reference stay alive and trustworthy when the maintainer is mostly away? What runs itself, what waits for a human, and what does the biweekly return session look like? |
| [`index-vs-ontology.md`](./index-vs-ontology.md) | "What if ontology is the key?" Should the retrieval substrate move off "indexing" toward an ontology — and is that RAG? (Answer: the ontology already exists latently; promote it, don't add RAG.) |
| [`vercel-operations.md`](./vercel-operations.md) | The three Vercel workstreams: deployment cleanup, validation environments, and logging/telemetry — grounded in the live deployment state. |

## The one thing to read first

As of **2026-07-04**, the hosted MCP production (`mcp.fpf.sh`) is serving a spec **published
2026-06-08** while upstream `ailev/FPF` HEAD is **2026-07-03** — roughly **26 days of drift**,
far past the 10-hour drift SLO. The self-sustaining sync loop has, in practice, stalled. The
maintenance strategy exists precisely so this is caught in the first five minutes of a return
session, not by a user. See [`maintenance-strategy.md` §"Live health snapshot"](./maintenance-strategy.md#live-health-snapshot-2026-07-04).
