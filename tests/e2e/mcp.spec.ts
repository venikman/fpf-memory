import { expect, test } from '@playwright/test';

const MCP_PATH = '/api/mcp/fpf_reference/mcp';
const LEGACY_MCP_PATH = '/api/mcp/fpf_memory/mcp';
const MCP_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json, text/event-stream',
};

interface JsonRpcEnvelope<T> {
  jsonrpc: '2.0';
  id: number | string | null;
  result?: T;
  error?: { code: number; message: string };
}

interface ServerInfoResult {
  protocolVersion: string;
  capabilities: { tools?: { listChanged: boolean } };
  serverInfo: { name: string; version: string };
}

interface ToolsListResult {
  tools: Array<{ name: string }>;
}

interface QueryResult {
  status: string;
  ids: string[];
}

const EXPECTED_PUBLIC_TOOLS = [
  'browse_fpf_catalog',
  'search_fpf',
  'ask_fpf',
  'query_fpf_spec',
  'read_fpf_doc',
  'get_fpf_index_status',
];

test('MCP initialize returns valid serverInfo', async ({ request }) => {
  const response = await request.post(MCP_PATH, {
    headers: MCP_HEADERS,
    data: {
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2025-06-18',
        capabilities: {},
        clientInfo: { name: 'fpf-e2e', version: '1.0.0' },
      },
    },
  });
  expect(response.status()).toBe(200);
  const body = (await response.json()) as JsonRpcEnvelope<ServerInfoResult>;
  expect(body.error).toBeUndefined();
  expect(body.result?.serverInfo.name).toBe('fpf_reference');
});

test('legacy MCP alias still initializes during compatibility window', async ({
  request,
}) => {
  const response = await request.post(LEGACY_MCP_PATH, {
    headers: MCP_HEADERS,
    data: {
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2025-06-18',
        capabilities: {},
        clientInfo: { name: 'fpf-e2e-legacy', version: '1.0.0' },
      },
    },
  });
  expect(response.status()).toBe(200);
  const body = (await response.json()) as JsonRpcEnvelope<ServerInfoResult>;
  expect(body.error).toBeUndefined();
  expect(body.result?.serverInfo.name).toBe('fpf_reference');
});

test('MCP tools/list exposes the public surface', async ({ request }) => {
  const response = await request.post(MCP_PATH, {
    headers: MCP_HEADERS,
    data: { jsonrpc: '2.0', id: 1, method: 'tools/list' },
  });
  expect(response.status()).toBe(200);
  const body = (await response.json()) as JsonRpcEnvelope<ToolsListResult>;
  const names = (body.result?.tools ?? []).map((tool) => tool.name).sort();
  expect(names).toEqual([...EXPECTED_PUBLIC_TOOLS].sort());
});

test('MCP query_fpf_spec resolves project alignment to its route', async ({
  request,
}) => {
  // The smoke target the runtime test pins. With routes parsed correctly
  // (PR #104) and routing scored correctly (PR #93), this question must
  // resolve to route:project-alignment plus its ordered IDs.
  const response = await request.post(MCP_PATH, {
    headers: MCP_HEADERS,
    data: {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'query_fpf_spec',
        arguments: {
          question:
            'Project kickoff: align a project information system with roles and adoption next steps',
          mode: 'compact',
        },
      },
    },
  });
  expect(response.status()).toBe(200);
  const body = (await response.json()) as JsonRpcEnvelope<{
    structuredContent: QueryResult;
  }>;
  const query = body.result?.structuredContent;
  expect(query?.status).toBe('ok');
  expect(query?.ids).toEqual(
    expect.arrayContaining(['route:project-alignment']),
  );
});

test('MCP rejects oversized question payloads at the schema boundary', async ({
  request,
}) => {
  // PR #98 added a 2000-char cap on the question field. A 2500-char payload
  // must produce a structured validation error in milliseconds, not silently
  // drive the function to its 300s maxDuration.
  const huge = 'x'.repeat(2500);
  const response = await request.post(MCP_PATH, {
    headers: MCP_HEADERS,
    data: {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'query_fpf_spec',
        arguments: { question: huge },
      },
    },
  });
  expect(response.status()).toBe(200);
  const body = (await response.json()) as JsonRpcEnvelope<{
    isError: boolean;
    content: Array<{ type: string; text: string }>;
  }>;
  expect(body.result?.isError).toBe(true);
  const message = body.result?.content?.[0]?.text ?? '';
  expect(message).toMatch(/too big|maximum|2000/i);
});
