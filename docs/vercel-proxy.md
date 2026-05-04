---
title: "Vercel MCP Hosting"
description: "Vercel proxy and direct-origin hosting notes for the fpf-memory MCP endpoint."
outline: false
---

# Vercel MCP hosting

Use this page to operate the Vercel-managed hostname that forwards the public MCP endpoint to the validated direct Vercel-origin runtime. The hosted client path is Vercel-only.

## Current state

Canonical MCP endpoint:

```txt
https://fpf-memory-mcp-proxy.vercel.app/api/mcp/fpf_memory/mcp
```

Vercel proxy config:

```txt
deploy/vercel-proxy/vercel.json
```

Direct Vercel-origin candidate:

```txt
https://fpf-memory-mcp-vercel-origin.vercel.app/api/mcp/fpf_memory/mcp
```

The proxy is still the canonical client endpoint. The direct origin is the lower-level runtime target behind that proxy and remains useful as a canary and lower-latency comparison endpoint.

Validation snapshot on 2026-05-04:

| Endpoint | Smoke | Q&A gate | Mixed latency | Notes |
| --- | --- | --- | --- | --- |
| Proxy | pass | pass, 8/8 | 30/0, 1.38 ops/s, mean 3469.83 ms, p95 7300.85 ms | Canonical client URL. The production proxy forwards the MCP route to the direct Vercel origin, so hosted clients do not depend on the retired cloud origin. |
| Direct Vercel origin | pass | pass, 8/8 | 30/0, 1.35 ops/s, mean 3482.94 ms, p95 12010.25 ms | Deployed production origin includes the `C.16` retrieval fix and passes the Q&A benchmark. |

In the current 30-call mixed sample, the proxy measured slightly faster than the direct origin, so no positive proxy overhead was observed. Treat that as live serverless variance rather than a permanent latency claim; keep comparing both endpoints before migration decisions.

Earlier short no-idle series checks also passed for both endpoints: direct origin 36/0, proxy 36/0. Treat those as script-gate validation only; they are not a real idle soak because `--interval-ms 0` was used.

The proxy preserves the MCP path:

```txt
https://<your-vercel-domain>/api/mcp/fpf_memory/mcp
```

## Vercel setup

1. Authenticate the Vercel CLI with `vercel login` if needed.
2. Link the proxy as a separate Vercel project with `bun run vercel:proxy:link`.
3. Disable Vercel Authentication for this public MCP proxy.
4. Attach the trusted custom domain, for example `mcp.<your-domain>`, when ready.
5. Deploy with `bun run vercel:proxy:deploy`.
6. Smoke-test the Vercel URL before changing client docs or local configs.

The proxy config forwards only to the direct Vercel origin:

- `/api/mcp/fpf_memory/mcp` to the direct Vercel origin
- `/connect-mcp` to the direct Vercel origin
- `/` to the direct Vercel origin

The MCP route sets `Cache-Control`, `CDN-Cache-Control`, and `Vercel-CDN-Cache-Control` to `no-store`.

## Direct Vercel origin

The direct-origin project runs the Mastra MCP runtime on Vercel using `@mastra/deployer-vercel`.
The repo-root `vercel.json` pins GitHub preview builds to `bun run vercel:origin:build`, which stages the hosted spec snapshot, creates the Vercel Build Output API bundle, and runs the bundle-size guard.

```bash
bun run vercel:origin:link
bun run vercel:origin:build
bun run vercel:origin:deploy:prod
FPF_MCP_SMOKE_URL=https://fpf-memory-mcp-vercel-origin.vercel.app/api/mcp/fpf_memory/mcp bun run smoke:mcp:http
```

Validated production deployment:

```txt
https://fpf-memory-mcp-vercel-origin.vercel.app/api/mcp/fpf_memory/mcp
```

Known direct-origin constraints:

- The local prebuilt Vercel function bundle is about 211 MB, close enough to Vercel's 250 MB function bundle limit that `bun run bench:vercel:function-size` remains a release gate.
- Vercel functions can read the bundled `hosted/FPF-Spec.md` and seed the bundled snapshot into `/tmp`; mutable runtime artifacts and logs must use `/tmp`.
- Preview deployments may be protected by Vercel Authentication; smoke the production alias or use an automation bypass token.
- Keep `@mastra/deployer-vercel`, `@mastra/deployer`, `@mastra/server`, and `@mastra/core` on compatible Mastra minor lines. This repo currently pins the Vercel deployer and overrides deployer/server packages to match `@mastra/core@1.24.x`.

## Cost comparison

Sources checked on 2026-05-04:

- [Vercel pricing](https://vercel.com/pricing): Pro is $20/month plus additional usage, with $20 included usage credit. Vercel Functions list 4 hours active CPU, 360 GB-hours provisioned memory, and 1 million invocations included before usage pricing.
- [Vercel function limits](https://vercel.com/docs/functions/limitations): Node functions have a 250 MB uncompressed bundle limit, 2 GB memory on Hobby, up to 4 GB on Pro/Enterprise, and function usage is billed on active CPU time plus provisioned memory time.

Comparison:

| Option | Fixed platform cost | Usage cost | Operational notes |
| --- | ---: | --- | --- |
| Vercel proxy + direct Vercel origin | $0 on Hobby if eligible and within limits; Pro starts at $20/month plus usage | Vercel Functions active CPU, provisioned memory, invocations, and data transfer after included quota, plus small proxy forwarding usage if it exceeds included limits | Keeps the canonical proxy URL while making runtime ownership Vercel-only; current bundle is close to the 250 MB limit; Vercel `/tmp` cache is per instance and seeded from the bundled snapshot on cold start |

Current pick: keep the proxy URL canonical, back every public proxy route with the direct Vercel origin, and keep the direct origin URL available as a canary/reference endpoint.

## LLM support cost comparison

This is separate from the hosting cost above. The hosted MCP runtime can answer deterministically without an LLM. Only `query_fpf_spec` and `ask_fpf` can use the optional synthesis layer, and compact route answers often stay deterministic.

Sources checked on 2026-05-04:

- [LM Studio for Teams](https://lmstudio.ai/pricing): Community use is free for personal and work use; the local server runs on your own hardware.
- [LM Studio free for work announcement](https://lmstudio.ai/blog/free-for-work): LM Studio removed the separate commercial-license requirement for work use.
- [xAI Models and Pricing](https://docs.x.ai/docs/models?cluster=us-west-1): xAI recommends `grok-4.3` for API callers, bills token usage, and charges server-side tools separately.
- [Pi model registry for Grok 4.3](https://pi.dev/models/xai/grok-4-3): lists `grok-4.3` at $1.25 / 1M input tokens, $2.50 / 1M output tokens, and $0.20 / 1M cache-read tokens.
- [VentureBeat Grok 4.3 launch coverage](https://venturebeat.com/technology/xai-launches-grok-4-3-at-an-aggressively-low-price-and-a-new-fast-powerful-voice-cloning-suite): reports the same $1.25 / $2.50 per 1M token pricing, with higher pricing above 200,000 input tokens.
- [EIA Electric Power Monthly table 5.3](https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=table_5_03): U.S. residential electricity averaged 17.65 cents/kWh in February 2026.

Cost model:

```txt
LM Studio monthly electricity = watts / 1000 * hours_per_month * electricity_rate
Grok 4.3 request cost = input_tokens / 1_000_000 * 1.25 + output_tokens / 1_000_000 * 2.50
```

Example monthly electricity cost for local LM Studio at 17.65 cents/kWh:

| Local host load | 1 h/day | 8 h/day | 24/7 |
| --- | ---: | ---: | ---: |
| 80 W laptop or Apple Silicon light load | $0.42 | $3.39 | $10.17 |
| 150 W desktop or heavier laptop load | $0.79 | $6.35 | $19.06 |
| 450 W GPU workstation load | $2.38 | $19.06 | $57.19 |

Example Grok 4.3 API cost:

| Synthesis shape | Input | Output | Cost / call | 1,000 calls | 10,000 calls |
| --- | ---: | ---: | ---: | ---: | ---: |
| Light bounded answer | 4,000 tokens | 700 tokens | $0.00675 | $6.75 | $67.50 |
| Typical FPF synthesis | 12,000 tokens | 1,000 tokens | $0.01750 | $17.50 | $175.00 |
| Heavy long-context answer | 50,000 tokens | 3,000 tokens | $0.07000 | $70.00 | $700.00 |

Operational comparison:

| Option | Marginal token cost | Fixed cost | Fit | Risk |
| --- | ---: | ---: | --- | --- |
| Deterministic only | $0 | hosting only | Best default for exact FPF lookup, docs reads, catalog/search, and route IDs | Less fluent prose when a synthesized narrative is useful |
| LM Studio local synthesizer | $0 API fee; electricity only | Existing machine, or hardware depreciation if buying hardware | Best for private local development and high-volume experiments when you already own the hardware | Hosted Vercel functions cannot call `localhost`; exposing a home LM Studio server is operationally and security risky |
| Grok 4.3 API | $1.25/M input + $2.50/M output | no local hardware required | Best for hosted public MCP synthesis and predictable production availability | Token bills scale with usage; current repo needs an xAI/OpenAI-compatible provider adapter because the existing synthesizer is LM Studio Anthropic-compatible |

Current pick: keep deterministic answers as the hosted default. Use LM Studio for local synthesis while developing. Add a hosted xAI/Grok provider only if synthesized prose becomes a real production requirement; otherwise it adds cost without improving the deterministic FPF evidence surface.

## Smoke test

Run the hosted HTTP smoke against the canonical proxy:

```bash
bun run smoke:mcp:http
```

Run the same smoke against the Vercel preview or production domain:

```bash
FPF_MCP_SMOKE_URL=https://fpf-memory-mcp-proxy.vercel.app/api/mcp/fpf_memory/mcp bun run smoke:mcp:http
```

The smoke verifies:

- `initialize` returns server `fpf_memory`
- `tools/list` returns the six public tools only
- `get_fpf_index_status` reports a fresh `local_vectorless` snapshot
- `query_fpf_spec` returns `route:project-alignment`
- `GET` with `Accept: text/event-stream` returns SSE or a valid method rejection

## Benchmark

Run the benchmark after the smoke test passes:

```bash
bun run bench:mcp -- --name proxy --url https://fpf-memory-mcp-proxy.vercel.app/api/mcp/fpf_memory/mcp --clients 5 --requests 75
bun run bench:mcp -- --name vercel-origin --url https://fpf-memory-mcp-vercel-origin.vercel.app/api/mcp/fpf_memory/mcp --clients 5 --requests 75
```

Useful benchmark knobs:

- `--clients <n>` controls concurrent MCP clients.
- `--requests <n>` controls measured tool calls, excluding setup and warmup.
- `--warmup <n>` controls unreported warmup tool calls.
- `--scenario mixed|query|read|discovery|status` controls the operation mix.
- `--format json|markdown` controls stdout format.

Treat a benchmark as invalid if any measured call fails, returns `isError=true`, reports a stale snapshot, or exposes the wrong public tool surface.

For cold-start, idle, and soak checks, run repeated bench-lite samples instead of a single burst:

```bash
bun run bench:mcp:series -- --name proxy --url https://fpf-memory-mcp-proxy.vercel.app/api/mcp/fpf_memory/mcp --iterations 3 --interval-ms 60000 --format json
bun run bench:mcp:series -- --name vercel-origin --url https://fpf-memory-mcp-vercel-origin.vercel.app/api/mcp/fpf_memory/mcp --iterations 6 --interval-ms 300000 --format jsonl --output reports/mcp-origin-soak.jsonl
```

Series-specific knobs:

- `--iterations <n>` controls how many samples to run.
- `--interval-ms <n>` controls the idle wait between samples; use `0` for fast local validation.
- `--format json|jsonl` controls whether stdout is one final JSON summary or JSON lines with per-iteration records plus a final summary.
- `--output <path>` writes the same JSON or JSONL payload to disk.

Each series iteration defaults to `--requests 12 --clients 1 --warmup 0`; pass the normal benchmark knobs to override the bench-lite workload.

Run the Q&A benchmark as the correctness gate for the migration decision:

```bash
bun run bench:mcp:qa -- --name proxy --url https://fpf-memory-mcp-proxy.vercel.app/api/mcp/fpf_memory/mcp --format markdown
bun run bench:mcp:qa -- --name vercel-origin --url https://fpf-memory-mcp-vercel-origin.vercel.app/api/mcp/fpf_memory/mcp --format markdown
```

The Q&A gate accepts `status: "degraded"` only when the answer exposes expected retrieval candidates in `candidateIds`, keeps committed `ids` empty, and confidence stays low. Deterministic citations, relations, and constraints remain valid evidence in degraded answers. A synthesis failure with `status: "ok"` is a benchmark failure.

## Cutover rule

Do not update `HOSTED_MCP_ENDPOINT`, `.mcp.json`, `.codex/config.toml`, or public client snippets until the Vercel proxy passes the smoke test from a deployed preview or production URL.

The Vercel proxy has passed this smoke against `https://fpf-memory-mcp-proxy.vercel.app/api/mcp/fpf_memory/mcp`. ChatGPT, Claude, Codex, editor, and CLI clients register exact URLs, so keep clients on the proxy URL and move the proxy target behind that stable address.

The direct Vercel origin has passed the same smoke against `https://fpf-memory-mcp-vercel-origin.vercel.app/api/mcp/fpf_memory/mcp`. Keep clients on the proxy URL so future upstream changes do not require client reconfiguration.
