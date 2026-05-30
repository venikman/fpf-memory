import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { performance } from 'node:perf_hooks';

import { HOSTED_MCP_ENDPOINT } from '../src/adapters/hosted/endpoints.js';
import {
  asArray,
  asOptionalString,
  asRecord,
  assert,
  parseFlagMap,
  readNonNegativeInteger,
  readOptionalString,
  readPositiveInteger,
  readString,
  round,
} from './_args.js';

const EXPECTED_PUBLIC_TOOLS = [
  'browse_fpf_catalog',
  'search_fpf',
  'ask_fpf',
  'query_fpf_spec',
  'read_fpf_doc',
  'get_fpf_index_status',
] as const;

const PROTOCOL_VERSION = '2025-06-18';
const DEFAULT_REQUESTS = 60;
const DEFAULT_CLIENTS = 5;
const DEFAULT_WARMUP = 5;
const DEFAULT_TIMEOUT_MS = 60_000;

type Scenario = 'mixed' | 'query' | 'read' | 'discovery' | 'status';
type OutputFormat = 'json' | 'markdown';
type OperationName = 'status' | 'browse' | 'search' | 'read' | 'query';

export interface BenchOptions {
  name: string;
  url: string;
  requests: number;
  clients: number;
  warmup: number;
  timeoutMs: number;
  scenario: Scenario;
  format: OutputFormat;
  outputPath?: string;
}

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

export interface RpcResult {
  result: unknown;
  httpStatus: number;
  contentType: string;
  vercelId?: string;
  bodyBytes: number;
}

export interface ToolCallResult {
  structuredContent?: unknown;
  content?: unknown;
  isError?: unknown;
}

export interface BenchSample {
  operation: OperationName;
  ok: boolean;
  durationMs: number;
  httpStatus?: number;
  contentType?: string;
  bodyBytes?: number;
  error?: string;
}

export interface LatencyStats {
  count: number;
  min: number;
  mean: number;
  p50: number;
  p90: number;
  p95: number;
  p99: number;
  max: number;
}

export interface BenchSummary {
  name: string;
  endpoint: string;
  scenario: Scenario;
  clients: number;
  requestedOperations: number;
  warmupOperations: number;
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  throughputPerSecond: number;
  ok: number;
  failed: number;
  errorRate: number;
  latencyMs: LatencyStats;
  byOperation: Record<OperationName, LatencyStats | undefined>;
  correctness: {
    publicTools: string[];
    sourceHash?: string;
    builtAt?: string;
    sseGet: {
      status: number;
      contentType: string;
    };
  };
  failures: Array<Pick<BenchSample, 'operation' | 'durationMs' | 'httpStatus' | 'error'>>;
}

interface ToolOperation {
  name: OperationName;
  toolName: string;
  arguments: Record<string, unknown>;
  validate: (structuredContent: unknown) => void;
}

export class McpHttpClient {
  private nextId = 1;
  private sessionId: string | undefined;

  constructor(
    private readonly endpoint: string,
    private readonly timeoutMs: number,
  ) {}

  async initialize(clientName: string): Promise<void> {
    const initialize = asRecord(
      (await this.rpc('initialize', {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: {},
        clientInfo: {
          name: clientName,
          version: '1.0.0',
        },
      })).result,
      'initialize result',
    );
    assert(initialize.serverInfo !== undefined, 'initialize did not return serverInfo.');
    assert(
      asRecord(initialize.serverInfo, 'serverInfo').name === 'fpf_memory',
      'initialize returned an unexpected server name.',
    );
    await this.notify('notifications/initialized');
  }

  async listTools(): Promise<string[]> {
    const toolsList = asRecord((await this.rpc('tools/list')).result, 'tools/list result');
    const tools = asArray(toolsList.tools, 'tools/list tools');
    return tools.map((tool) => asRecord(tool, 'tool').name).filter(isString);
  }

  async callTool(
    name: string,
    toolArguments: Record<string, unknown>,
  ): Promise<RpcResult & { structuredContent: unknown }> {
    const rpcResult = await this.rpc('tools/call', {
      name,
      arguments: toolArguments,
    });
    const result = asRecord(rpcResult.result, `${name} result`) as ToolCallResult;
    if (result.isError === true) {
      throw new Error(`${name} returned isError=true: ${extractToolError(result)}`);
    }
    return {
      ...rpcResult,
      structuredContent: result.structuredContent,
    };
  }

  async checkSseGet(): Promise<{ status: number; contentType: string }> {
    const response = await fetch(this.endpoint, {
      method: 'GET',
      headers: {
        Accept: 'text/event-stream',
        'MCP-Protocol-Version': PROTOCOL_VERSION,
        ...(this.sessionId ? { 'MCP-Session-Id': this.sessionId } : {}),
      },
      signal: AbortSignal.timeout(Math.min(this.timeoutMs, 10_000)),
    });
    this.captureSessionId(response);
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

  private async rpc(method: string, params?: Record<string, unknown>): Promise<RpcResult> {
    const id = this.nextId++;
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.requestHeaders(),
      body: JSON.stringify({
        jsonrpc: '2.0',
        id,
        method,
        ...(params ? { params } : {}),
      }),
      signal: AbortSignal.timeout(this.timeoutMs),
    });
    this.captureSessionId(response);

    const contentType = response.headers.get('content-type') ?? '';
    const body = await response.text();
    const message = readJsonRpcResponse(response.status, contentType, body, id);
    assert(
      response.ok,
      `${method} returned HTTP ${response.status}: ${message.error?.message ?? 'no JSON-RPC error'}`,
    );
    assert(message.id === id, `${method} returned response id ${String(message.id)} instead of ${id}.`);
    assert(message.error === undefined, `${method} returned JSON-RPC error: ${message.error?.message}`);

    return {
      result: message.result,
      httpStatus: response.status,
      contentType,
      vercelId: response.headers.get('x-vercel-id') ?? undefined,
      bodyBytes: new TextEncoder().encode(body).byteLength,
    };
  }

  private async notify(method: string, params?: Record<string, unknown>): Promise<void> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.requestHeaders(),
      body: JSON.stringify({
        jsonrpc: '2.0',
        method,
        ...(params ? { params } : {}),
      }),
      signal: AbortSignal.timeout(this.timeoutMs),
    });
    this.captureSessionId(response);

    if ([200, 202, 204].includes(response.status)) {
      await response.body?.cancel().catch(() => undefined);
      return;
    }

    const body = await response.text().catch(() => '');
    throw new Error(`${method} notification returned HTTP ${response.status}: ${body}`);
  }

  private requestHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
      'MCP-Protocol-Version': PROTOCOL_VERSION,
      ...(this.sessionId ? { 'MCP-Session-Id': this.sessionId } : {}),
    };
  }

  private captureSessionId(response: Response): void {
    this.sessionId = response.headers.get('MCP-Session-Id') ?? this.sessionId;
  }
}

export function parseBenchArgs(
  args: string[],
  env: NodeJS.ProcessEnv = process.env,
): BenchOptions {
  const values = parseFlagMap(args);
  const url = readString(values, 'url', env.FPF_MCP_BENCH_URL ?? HOSTED_MCP_ENDPOINT);
  const name = readString(values, 'name', env.FPF_MCP_BENCH_NAME ?? new URL(url).hostname);
  const scenario = readScenario(readString(values, 'scenario', env.FPF_MCP_BENCH_SCENARIO ?? 'mixed'));
  const format = readOutputFormat(readString(values, 'format', env.FPF_MCP_BENCH_FORMAT ?? 'json'));

  return {
    name,
    url,
    requests: readPositiveInteger(values, 'requests', env.FPF_MCP_BENCH_REQUESTS, DEFAULT_REQUESTS),
    clients: readPositiveInteger(values, 'clients', env.FPF_MCP_BENCH_CLIENTS, DEFAULT_CLIENTS),
    warmup: readNonNegativeInteger(values, 'warmup', env.FPF_MCP_BENCH_WARMUP, DEFAULT_WARMUP),
    timeoutMs: readPositiveInteger(values, 'timeout-ms', env.FPF_MCP_BENCH_TIMEOUT_MS, DEFAULT_TIMEOUT_MS),
    scenario,
    format,
    outputPath: readOptionalString(values, 'output', env.FPF_MCP_BENCH_OUTPUT),
  };
}

export function buildOperationPlan(scenario: Scenario, requests: number): OperationName[] {
  const weighted = operationWeights(scenario);
  const plan: OperationName[] = [];
  while (plan.length < requests) {
    plan.push(...weighted);
  }
  return plan.slice(0, requests);
}

export function summarizeDurations(samples: Array<Pick<BenchSample, 'durationMs'>>): LatencyStats {
  if (samples.length === 0) {
    return {
      count: 0,
      min: 0,
      mean: 0,
      p50: 0,
      p90: 0,
      p95: 0,
      p99: 0,
      max: 0,
    };
  }

  const values = samples.map((sample) => sample.durationMs).sort((left, right) => left - right);
  const sum = values.reduce((total, value) => total + value, 0);
  return {
    count: values.length,
    min: round(values[0]),
    mean: round(sum / values.length),
    p50: round(percentile(values, 0.50)),
    p90: round(percentile(values, 0.90)),
    p95: round(percentile(values, 0.95)),
    p99: round(percentile(values, 0.99)),
    max: round(values[values.length - 1]),
  };
}

export async function runBenchmark(options: BenchOptions): Promise<BenchSummary> {
  assert(options.url.startsWith('https://'), 'Benchmark URL must be an https:// URL.');
  const startedAt = new Date();
  const correctnessClient = new McpHttpClient(options.url, options.timeoutMs);
  await correctnessClient.initialize(`fpf-memory-bench-${options.name}-correctness`);
  const publicTools = await correctnessClient.listTools();
  assertArrayEquals(publicTools, EXPECTED_PUBLIC_TOOLS, 'tools/list did not return the public surface.');

  const status = await runValidatedTool(correctnessClient, toolOperations.status);
  const query = await runValidatedTool(correctnessClient, toolOperations.query);
  const sseGet = await correctnessClient.checkSseGet();
  const statusContent = asRecord(status.structuredContent, 'status structuredContent');
  asRecord(query.structuredContent, 'query structuredContent');

  const clients = await Promise.all(
    Array.from({ length: options.clients }, async (_, index) => {
      const client = new McpHttpClient(options.url, options.timeoutMs);
      await client.initialize(`fpf-memory-bench-${options.name}-${index + 1}`);
      return client;
    }),
  );

  const warmupPlan = buildOperationPlan(options.scenario, options.warmup);
  for (let index = 0; index < warmupPlan.length; index += 1) {
    await runSample(clients[index % clients.length], warmupPlan[index]);
  }

  const plan = buildOperationPlan(options.scenario, options.requests);
  const samples: BenchSample[] = [];
  let nextIndex = 0;
  const benchmarkStarted = performance.now();

  await Promise.all(
    clients.map(async (client) => {
      while (true) {
        const index = nextIndex;
        nextIndex += 1;
        if (index >= plan.length) {
          return;
        }
        samples.push(await runSample(client, plan[index]));
      }
    }),
  );

  const durationMs = performance.now() - benchmarkStarted;
  const finishedAt = new Date();
  const okSamples = samples.filter((sample) => sample.ok);
  const failedSamples = samples.filter((sample) => !sample.ok);
  const byOperation = Object.fromEntries(
    (Object.keys(toolOperations) as OperationName[]).map((operation) => [
      operation,
      summarizeDurations(okSamples.filter((sample) => sample.operation === operation)),
    ]),
  ) as Record<OperationName, LatencyStats>;

  return {
    name: options.name,
    endpoint: options.url,
    scenario: options.scenario,
    clients: options.clients,
    requestedOperations: options.requests,
    warmupOperations: options.warmup,
    startedAt: startedAt.toISOString(),
    finishedAt: finishedAt.toISOString(),
    durationMs: round(durationMs),
    throughputPerSecond: round(okSamples.length / (durationMs / 1_000)),
    ok: okSamples.length,
    failed: failedSamples.length,
    errorRate: round(failedSamples.length / Math.max(samples.length, 1)),
    latencyMs: summarizeDurations(okSamples),
    byOperation,
    correctness: {
      publicTools,
      sourceHash: asOptionalString(statusContent.sourceHash),
      builtAt: asOptionalString(statusContent.builtAt),
      sseGet,
    },
    failures: failedSamples.slice(0, 10).map((sample) => ({
      operation: sample.operation,
      durationMs: round(sample.durationMs),
      httpStatus: sample.httpStatus,
      error: sample.error,
    })),
  };
}

export function formatMarkdownSummary(summary: BenchSummary): string {
  const rows: Array<readonly [string, LatencyStats | undefined]> = [
    ['all', summary.latencyMs],
    ...Object.entries(summary.byOperation).map(([operation, stats]) => [operation, stats] as const),
  ];
  return [
    `# MCP benchmark: ${summary.name}`,
    '',
    `Endpoint: ${summary.endpoint}`,
    `Scenario: ${summary.scenario}`,
    `Clients: ${summary.clients}`,
    `Requests: ${summary.requestedOperations}`,
    `OK/failed: ${summary.ok}/${summary.failed}`,
    `Throughput: ${summary.throughputPerSecond} ops/s`,
    '',
    '| operation | count | mean ms | p50 ms | p90 ms | p95 ms | p99 ms | max ms |',
    '| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |',
    ...rows.map(([operation, stats]) =>
      `| ${operation} | ${stats?.count ?? 0} | ${stats?.mean ?? 0} | ${stats?.p50 ?? 0} | ${stats?.p90 ?? 0} | ${stats?.p95 ?? 0} | ${stats?.p99 ?? 0} | ${stats?.max ?? 0} |`,
    ),
    '',
    `Fresh source hash: ${summary.correctness.sourceHash ?? '<unknown>'}`,
    `SSE GET: ${summary.correctness.sseGet.status} ${summary.correctness.sseGet.contentType}`,
    '',
  ].join('\n');
}

async function runSample(client: McpHttpClient, operationName: OperationName): Promise<BenchSample> {
  const operation = toolOperations[operationName];
  const started = performance.now();
  try {
    const result = await runValidatedTool(client, operation);
    return {
      operation: operation.name,
      ok: true,
      durationMs: performance.now() - started,
      httpStatus: result.httpStatus,
      contentType: result.contentType,
      bodyBytes: result.bodyBytes,
    };
  } catch (error) {
    return {
      operation: operation.name,
      ok: false,
      durationMs: performance.now() - started,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function runValidatedTool(
  client: McpHttpClient,
  operation: ToolOperation,
): Promise<RpcResult & { structuredContent: unknown }> {
  const result = await client.callTool(operation.toolName, operation.arguments);
  operation.validate(result.structuredContent);
  return result;
}

const toolOperations: Record<OperationName, ToolOperation> = {
  status: {
    name: 'status',
    toolName: 'get_fpf_index_status',
    arguments: {},
    validate(structuredContent) {
      const status = asRecord(structuredContent, 'status structuredContent');
      assert(status.snapshotExists === true, 'status snapshotExists was not true.');
      assert(status.fresh === true, 'status fresh was not true.');
      assert(status.compilerMode === 'local_vectorless', 'status compilerMode was not local_vectorless.');
    },
  },
  browse: {
    name: 'browse',
    toolName: 'browse_fpf_catalog',
    arguments: {
      kind: 'route',
      limit: 8,
    },
    validate(structuredContent) {
      const result = asRecord(structuredContent, 'browse structuredContent');
      assert(asArray(result.entries, 'browse entries').length > 0, 'browse returned no entries.');
    },
  },
  search: {
    name: 'search',
    toolName: 'search_fpf',
    arguments: {
      query: 'role assignment project alignment bounded context',
      limit: 8,
    },
    validate(structuredContent) {
      const result = asRecord(structuredContent, 'search structuredContent');
      assert(asArray(result.hits, 'search hits').length > 0, 'search returned no hits.');
    },
  },
  read: {
    name: 'read',
    toolName: 'read_fpf_doc',
    arguments: {
      selector: 'A.1.1',
    },
    validate(structuredContent) {
      const result = asRecord(structuredContent, 'read structuredContent');
      assert(result.status === 'ok', 'read status was not ok.');
      assert(
        typeof result.markdown === 'string' && result.markdown.includes('A.1.1'),
        'read did not return markdown for A.1.1.',
      );
    },
  },
  query: {
    name: 'query',
    toolName: 'query_fpf_spec',
    arguments: {
      question:
        'Project kickoff: align a project information system with roles and adoption next steps',
      mode: 'compact',
    },
    validate(structuredContent) {
      const result = asRecord(structuredContent, 'query structuredContent');
      assert(result.status === 'ok', 'query status was not ok.');
      assert(
        asArray(result.ids, 'query ids').includes('route:project-alignment'),
        'query did not include route:project-alignment.',
      );
    },
  },
};

function operationWeights(scenario: Scenario): OperationName[] {
  switch (scenario) {
    case 'query':
      return ['query'];
    case 'read':
      return ['read'];
    case 'discovery':
      return ['browse', 'search', 'search', 'status'];
    case 'status':
      return ['status'];
    case 'mixed':
      return [
        'status',
        'browse',
        'search',
        'search',
        'read',
        'read',
        'read',
        'query',
        'query',
        'query',
      ];
  }
}

export function readJsonRpcResponse(
  status: number,
  contentType: string,
  body: string,
  expectedId?: string | number,
): JsonRpcResponse {
  assert(body.trim().length > 0, `HTTP ${status} returned an empty response body.`);
  try {
    if (contentType.includes('text/event-stream')) {
      return parseSseJsonRpc(body, expectedId);
    }
    return JSON.parse(body) as JsonRpcResponse;
  } catch (error) {
    if (status >= 400) {
      return {
        jsonrpc: '2.0',
        id: expectedId ?? null,
        error: {
          code: -32000,
          message: body.slice(0, 500) || String(error),
        },
      };
    }
    throw error;
  }
}

function parseSseJsonRpc(body: string, expectedId?: string | number): JsonRpcResponse {
  const messages = body
    .split(/\r?\n\r?\n/u)
    .map((event) => event
      .split(/\r?\n/u)
      .map((line) => line.trimEnd())
      .filter((line) => line.startsWith('data:'))
      .map((line) => line.slice('data:'.length).trim())
      .join('\n'))
    .filter((data) => data.length > 0)
    .map((data) => parseJsonRpcMaybe(data))
    .filter((message): message is JsonRpcResponse => message !== undefined);

  assert(messages.length > 0, 'SSE response did not contain any JSON-RPC data events.');
  return messages.find((message) => message.id === expectedId) ?? messages[messages.length - 1];
}

function parseJsonRpcMaybe(data: string): JsonRpcResponse | undefined {
  try {
    return JSON.parse(data) as JsonRpcResponse;
  } catch {
    return undefined;
  }
}

function extractToolError(result: ToolCallResult): string {
  const content = Array.isArray(result.content) ? result.content : [];
  const text = content
    .map((item) => asRecord(item, 'tool content').text)
    .filter(isString)
    .join('\n');
  return text || 'no tool error text';
}

function readScenario(value: string): Scenario {
  if (
    value === 'mixed' ||
    value === 'query' ||
    value === 'read' ||
    value === 'discovery' ||
    value === 'status'
  ) {
    return value;
  }
  throw new Error(`Unknown scenario: ${value}`);
}

function readOutputFormat(value: string): OutputFormat {
  if (value === 'json' || value === 'markdown') {
    return value;
  }
  throw new Error(`Unknown format: ${value}`);
}

function percentile(sortedValues: number[], rank: number): number {
  if (sortedValues.length === 1) {
    return sortedValues[0];
  }
  const index = (sortedValues.length - 1) * rank;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) {
    return sortedValues[lower];
  }
  const weight = index - lower;
  return sortedValues[lower] * (1 - weight) + sortedValues[upper] * weight;
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
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

async function main(): Promise<void> {
  const options = parseBenchArgs(process.argv.slice(2));
  const summary = await runBenchmark(options);
  const output = options.format === 'json'
    ? `${JSON.stringify(summary, null, 2)}\n`
    : formatMarkdownSummary(summary);

  if (options.outputPath) {
    await mkdir(dirname(options.outputPath), { recursive: true });
    await writeFile(options.outputPath, output, 'utf8');
  }

  process.stdout.write(output);
  if (summary.failed > 0) {
    process.exitCode = 1;
  }
}

if (import.meta.main) {
  await main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
}
