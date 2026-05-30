import { HOSTED_MCP_ENDPOINT } from '../src/adapters/hosted/endpoints.js';
import { asRecord, assert } from './_args.js';
import {
  EXPECTED_PUBLIC_TOOLS,
  McpHttpClient,
} from './bench-hosted-mcp.js';

const endpoint = process.env.FPF_MCP_SMOKE_URL ?? process.argv[2] ?? HOSTED_MCP_ENDPOINT;
const requestTimeoutMs = parseIntegerEnv('FPF_MCP_SMOKE_TIMEOUT_MS', 60_000);

await main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});

async function main(): Promise<void> {
  assert(endpoint.startsWith('https://'), 'FPF_MCP_SMOKE_URL must be an https:// URL.');

  const client = new McpHttpClient(endpoint, requestTimeoutMs);
  await client.initialize('fpf-reference-http-smoke');

  const toolNames = await client.listTools();
  assertArrayEquals(toolNames, EXPECTED_PUBLIC_TOOLS, 'tools/list did not return the public surface.');

  const statusCall = await client.callTool('get_fpf_index_status', {});
  const status = asRecord(statusCall.structuredContent, 'get_fpf_index_status structuredContent');
  assert(status.snapshotExists === true, 'get_fpf_index_status did not report snapshotExists=true.');
  assert(status.fresh === true, 'get_fpf_index_status did not report fresh=true.');
  assert(
    status.compilerMode === 'local_vectorless',
    'get_fpf_index_status did not report compilerMode=local_vectorless.',
  );

  const queryCall = await client.callTool('query_fpf_spec', {
    question:
      'Project kickoff: align a project information system with roles and adoption next steps',
    mode: 'compact',
  });
  const query = asRecord(queryCall.structuredContent, 'query_fpf_spec structuredContent');
  assert(query.status === 'ok', 'query_fpf_spec did not return status=ok.');
  assert(
    Array.isArray(query.ids) && query.ids.includes('route:project-alignment'),
    'query_fpf_spec did not include route:project-alignment.',
  );

  const sseStatus = await client.checkSseGet();

  process.stdout.write(
    `${JSON.stringify(
      {
        endpoint,
        initialized: true,
        sessionId: client.getSessionId() ?? null,
        publicTools: toolNames,
        index: {
          sourceHash: status.sourceHash ?? null,
          builtAt: status.builtAt ?? null,
          fresh: status.fresh,
        },
        query: {
          status: query.status,
          ids: query.ids,
        },
        sseGet: sseStatus,
      },
      null,
      2,
    )}\n`,
  );
}

function parseIntegerEnv(name: string, fallback: number): number {
  const value = process.env[name]?.trim();
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function assertArrayEquals(
  actual: readonly unknown[],
  expected: readonly unknown[],
  message: string,
): void {
  assert(
    actual.length === expected.length &&
      actual.every((value, index) => value === expected[index]),
    `${message} Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}.`,
  );
}
