# Install: local FPF runtime (self-host / full expert surface)

Use when the user wants local artifacts, self-hosting, or the **full** expert
tool surface (`inspect_*`, `trace_fpf_path`, `refresh_fpf_index`) that the hosted
endpoint does not expose. This runs the same runtime that backs `mcp.fpf.sh`,
as a local stdio MCP server.

## Prerequisites

- [Bun](https://bun.sh) (`bun@1.3.5` per the repo `packageManager`), Node.js >= 22.13.
- A local clone of `https://github.com/venikman/fpf-memory`.

## Steps

```bash
git clone https://github.com/venikman/fpf-memory
cd fpf-memory
bun install --frozen-lockfile

# The committed spec surface under published/current/** is the default source.
# To refresh from upstream ailev/FPF first:
#   bun run spec:download && bun run publish:current

# Run the local full-surface stdio MCP server:
FPF_MCP_SURFACE=full bun run mcp
```

## Register in a client

Register as `fpf_reference_local` so it does not collide with the hosted
`fpf_reference` key (see the collision rule below). Example `.mcp.json` entry:

```json
{
  "mcpServers": {
    "fpf_reference_local": {
      "command": "bun",
      "args": ["src/entrypoints/mcp-stdio.ts"],
      "env": {
        "FPF_SPEC_SOURCE_PATH": "published/current/FPF-Spec.md",
        "FPF_RUNTIME_ARTIFACT_DIR": ".runtime/fpf-index",
        "FPF_MCP_SURFACE": "full"
      }
    }
  }
}
```

`server.json` in the repo carries the same stdio definition (`FPF_MCP_SURFACE=full`).
The protocol `serverInfo.name` remains `fpf_reference`; the client key is what you
name it (`fpf_reference_local`).

## Tool surfaces

- **Public** (also on hosted): `browse_fpf_catalog`, `search_fpf`, `ask_fpf`, `query_fpf_spec`, `read_fpf_doc`, `get_fpf_index_status`.
- **Expert** (local full only): `inspect_fpf_node`, `inspect_fpf_anchor`, `expand_fpf_citations`, `trace_fpf_path`.
- **Admin** (local): `refresh_fpf_index`.

Never assume expert tools exist on the hosted endpoint.

## Collision rule

Do not register the hosted HTTP server and the local stdio server under the same
client key in one session. Prefer one active server per session, or use distinct
keys: `fpf_reference` (hosted) vs. `fpf_reference_local` (local full).

## Validate

Run `get_fpf_index_status` against the runtime you are about to rely on, then the
compact `query_fpf_spec` kickoff query. See `SKILL.md` for the validation contract.
