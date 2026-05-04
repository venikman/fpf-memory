import { HOSTED_MCP_ENDPOINT } from '../src/core/constants.js';

const EXPECTED_PUBLIC_TOOLS = [
  'browse_fpf_catalog',
  'search_fpf',
  'ask_fpf',
  'query_fpf_spec',
  'read_fpf_doc',
  'get_fpf_index_status',
] as const;

const endpoint = process.env.FPF_MCP_SMOKE_URL ?? process.argv[2] ?? HOSTED_MCP_ENDPOINT;
const requestTimeoutMs = parseIntegerEnv('FPF_MCP_SMOKE_TIMEOUT_MS', 60_000);

let nextId = 1;
let sessionId: string | undefined;

interface JsonRpcError {
  code: number;
  message: string;
  data?: unknown;
}

interface JsonRpcResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  result?: unknown;
  error?: JsonRpcError;
}

interface ToolListResult {
  tools?: Array<{ name?: unknown }>;
}

interface ToolCallResult {
  structuredContent?: unknown;
  isError?: unknown;
}

await main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});

async function main(): Promise<void> {
  assert(endpoint.startsWith('https://'), 'FPF_MCP_SMOKE_URL must be an https:// URL.');

  const initialize = asRecord(
    await rpc('initialize', {
      protocolVersion: '2025-06-18',
      capabilities: {},
      clientInfo: {
        name: 'fpf-memory-http-smoke',
        version: '1.0.0',
      },
    }),
    'initialize result',
  );
  assert(initialize.serverInfo !== undefined, 'initialize did not return serverInfo.');
  assert(
    asRecord(initialize.serverInfo, 'serverInfo').name === 'fpf_memory',
    'initialize returned an unexpected server name.',
  );

  await notify('notifications/initialized');

  const toolsList = asRecord(await rpc('tools/list'), 'tools/list result') as ToolListResult;
  const toolNames = (toolsList.tools ?? []).map((tool) => tool.name);
  assertArrayEquals(toolNames, EXPECTED_PUBLIC_TOOLS, 'tools/list did not return the public surface.');

  const statusCall = asRecord(
    await rpc('tools/call', {
      name: 'get_fpf_index_status',
      arguments: {},
    }),
    'get_fpf_index_status result',
  ) as ToolCallResult;
  assert(statusCall.isError !== true, 'get_fpf_index_status returned isError=true.');
  const status = asRecord(statusCall.structuredContent, 'get_fpf_index_status structuredContent');
  assert(status.snapshotExists === true, 'get_fpf_index_status did not report snapshotExists=true.');
  assert(status.fresh === true, 'get_fpf_index_status did not report fresh=true.');
  assert(
    status.compilerMode === 'local_vectorless',
    'get_fpf_index_status did not report compilerMode=local_vectorless.',
  );

  const queryCall = asRecord(
    await rpc('tools/call', {
      name: 'query_fpf_spec',
      arguments: {
        question:
          'Project kickoff: align a project information system with roles and adoption next steps',
        mode: 'compact',
      },
    }),
    'query_fpf_spec result',
  ) as ToolCallResult;
  assert(queryCall.isError !== true, 'query_fpf_spec returned isError=true.');
  const query = asRecord(queryCall.structuredContent, 'query_fpf_spec structuredContent');
  assert(query.status === 'ok', 'query_fpf_spec did not return status=ok.');
  assert(
    Array.isArray(query.ids) && query.ids.includes('route:project-alignment'),
    'query_fpf_spec did not include route:project-alignment.',
  );

  const sseStatus = await checkSseGet();

  process.stdout.write(
    `${JSON.stringify(
      {
        endpoint,
        initialized: true,
        sessionId: sessionId ?? null,
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

async function rpc(method: string, params?: Record<string, unknown>): Promise<unknown> {
  const id = nextId++;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: requestHeaders(),
    body: JSON.stringify({
      jsonrpc: '2.0',
      id,
      method,
      ...(params ? { params } : {}),
    }),
    signal: AbortSignal.timeout(requestTimeoutMs),
  });
  captureSessionId(response);

  const message = await readJsonRpcResponse(response);
  assert(
    response.ok,
    `${method} returned HTTP ${response.status}: ${message.error?.message ?? 'no JSON-RPC error'}`,
  );
  assert(message.id === id, `${method} returned response id ${String(message.id)} instead of ${id}.`);
  assert(message.error === undefined, `${method} returned JSON-RPC error: ${message.error?.message}`);
  return message.result;
}

async function notify(method: string, params?: Record<string, unknown>): Promise<void> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: requestHeaders(),
    body: JSON.stringify({
      jsonrpc: '2.0',
      method,
      ...(params ? { params } : {}),
    }),
    signal: AbortSignal.timeout(requestTimeoutMs),
  });
  captureSessionId(response);

  if ([200, 202, 204].includes(response.status)) {
    await response.body?.cancel().catch(() => undefined);
    return;
  }

  const body = await response.text().catch(() => '');
  throw new Error(`${method} notification returned HTTP ${response.status}: ${body}`);
}

async function checkSseGet(): Promise<{ status: number; contentType: string }> {
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'text/event-stream',
      'MCP-Protocol-Version': '2025-06-18',
      ...(sessionId ? { 'MCP-Session-Id': sessionId } : {}),
    },
    signal: AbortSignal.timeout(5_000),
  });
  captureSessionId(response);
  const contentType = response.headers.get('content-type') ?? '';
  await response.body?.cancel().catch(() => undefined);

  assert(
    response.status === 200 || response.status === 405,
    `GET SSE returned unexpected HTTP ${response.status}.`,
  );
  if (response.status === 200) {
    assert(
      contentType.includes('text/event-stream'),
      `GET SSE returned content-type ${contentType || '<empty>'}.`,
    );
  }

  return { status: response.status, contentType };
}

async function readJsonRpcResponse(response: Response): Promise<JsonRpcResponse> {
  const contentType = response.headers.get('content-type') ?? '';
  const body = await response.text();

  if (contentType.includes('text/event-stream')) {
    return parseSseJsonRpc(body);
  }

  assert(body.trim().length > 0, `HTTP ${response.status} returned an empty response body.`);
  return JSON.parse(body) as JsonRpcResponse;
}

function parseSseJsonRpc(body: string): JsonRpcResponse {
  const dataLines = body
    .split('\n')
    .map((line) => line.trimEnd())
    .filter((line) => line.startsWith('data:'))
    .map((line) => line.slice('data:'.length).trim());
  assert(dataLines.length > 0, 'SSE response did not contain any data lines.');
  return JSON.parse(dataLines.join('\n')) as JsonRpcResponse;
}

function requestHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/event-stream',
    'MCP-Protocol-Version': '2025-06-18',
    ...(sessionId ? { 'MCP-Session-Id': sessionId } : {}),
  };
}

function captureSessionId(response: Response): void {
  sessionId = response.headers.get('MCP-Session-Id') ?? sessionId;
}

function parseIntegerEnv(name: string, fallback: number): number {
  const value = process.env[name]?.trim();
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function asRecord(value: unknown, label: string): Record<string, unknown> {
  assert(
    typeof value === 'object' && value !== null && !Array.isArray(value),
    `${label} was not an object.`,
  );
  return value as Record<string, unknown>;
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function assertArrayEquals(
  actual: readonly unknown[],
  expected: readonly string[],
  message: string,
): void {
  assert(
    actual.length === expected.length && expected.every((value, index) => actual[index] === value),
    `${message}\nexpected: ${expected.join(', ')}\nactual: ${actual.join(', ')}`,
  );
}
