import { validatePublishedSurface } from './published-surface.js';
import {
  HOSTED_FPF_STATUS_ROUTE,
  HOSTED_MCP_ROUTE,
} from '../composition/hosted.js';

export const DEFAULT_PRODUCTION_SMOKE_WEBSITE_BASE_URL = 'https://fpf.sh';
export const DEFAULT_PRODUCTION_SMOKE_MCP_BASE_URL = 'https://mcp.fpf.sh';
export const PRODUCTION_SMOKE_CANONICAL_MCP_ENDPOINT =
  `${DEFAULT_PRODUCTION_SMOKE_MCP_BASE_URL}${HOSTED_MCP_ROUTE}`;
export const PRODUCTION_SMOKE_TIMEOUT_MS = 30_000;

export const PRODUCTION_SMOKE_PUBLIC_TOOLS = [
  'browse_fpf_catalog',
  'search_fpf',
  'ask_fpf',
  'query_fpf_spec',
  'read_fpf_doc',
  'get_fpf_index_status',
] as const;

export interface ProductionSmokeConfig {
  websiteBaseUrl?: string;
  mcpBaseUrl?: string;
  cwd?: string;
  now?: Date;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
  expectedPublication?: ExpectedPublication;
}

export interface ExpectedPublication {
  upstreamRef: string;
  sourceHash: string;
  publishedAt?: string;
}

export type ProductionSmokeState = 'ok' | 'breach';
export type ProductionSmokeStatus = 'pass' | 'fail';

export interface ProductionSmokeCheck {
  characteristic: string;
  status: ProductionSmokeStatus;
  evidence: string;
  url?: string;
}

export interface ProductionSmokeReport {
  state: ProductionSmokeState;
  ok: boolean;
  breached: boolean;
  generatedAt: string;
  websiteBaseUrl: string;
  mcpBaseUrl: string;
  expected: ExpectedPublication;
  observed: {
    statusEndpoint?: ObservedStatusEndpoint;
    canonicalMcp?: ObservedMcpEndpoint;
    standaloneMcpGet?: ObservedStandaloneGet;
  };
  checks: ProductionSmokeCheck[];
  summary: string;
}

export interface ObservedStatusEndpoint {
  servedAt?: string;
  status: string;
  publicationUpstreamRef?: string;
  publicationSourceHash?: string;
  publicationPublishedAt?: string;
  runtimeBuiltAt?: string;
  runtimeFresh?: boolean;
  runtimeSourceHash?: string;
  runtimeCurrentSourceHash?: string;
  runtimeSnapshotSourceHash?: string;
}

export interface ObservedMcpEndpoint {
  serverName?: string;
  toolNames: string[];
  statusToolSourceHash?: string;
  statusToolFresh?: boolean;
}

export interface ObservedStandaloneGet {
  status: number;
  allow: string;
  message?: string;
}

interface PageEvidence {
  url: string;
  status: number;
  text: string;
}

interface JsonRpcResponse {
  jsonrpc?: string;
  id?: number | string | null;
  result?: unknown;
  error?: {
    code?: number;
    message?: string;
  };
}

export async function runProductionSmoke(
  config: ProductionSmokeConfig = {},
): Promise<ProductionSmokeReport> {
  const fetchImpl = config.fetchImpl ?? fetch;
  const timeoutMs = config.timeoutMs ?? PRODUCTION_SMOKE_TIMEOUT_MS;
  const websiteBaseUrl = normalizeBaseUrl(
    config.websiteBaseUrl ?? DEFAULT_PRODUCTION_SMOKE_WEBSITE_BASE_URL,
  );
  const mcpBaseUrl = normalizeBaseUrl(
    config.mcpBaseUrl ?? DEFAULT_PRODUCTION_SMOKE_MCP_BASE_URL,
  );
  const expected = config.expectedPublication ?? await readExpectedPublication(config.cwd);
  const urls = buildSmokeUrls(websiteBaseUrl, mcpBaseUrl);

  const checks: ProductionSmokeCheck[] = [];
  const [websiteRoot, websiteConnect, mcpRoot, mcpConnect] = await Promise.all([
    fetchPage(fetchImpl, urls.websiteRoot, timeoutMs),
    fetchPage(fetchImpl, urls.websiteConnect, timeoutMs),
    fetchPage(fetchImpl, urls.mcpRoot, timeoutMs),
    fetchPage(fetchImpl, urls.mcpConnect, timeoutMs),
  ]);

  checks.push(
    ...checkCanonicalOnboardingPage('fpf.sh root', websiteRoot),
    ...checkCanonicalOnboardingPage('fpf.sh connect-mcp', websiteConnect),
    ...checkCanonicalOnboardingPage('mcp.fpf.sh root', mcpRoot),
    ...checkCanonicalOnboardingPage('mcp.fpf.sh connect-mcp', mcpConnect),
    ...checkGetDocs(websiteConnect),
    ...checkGetDocs(mcpConnect),
  );

  const statusEndpoint = await fetchStatusEndpoint(fetchImpl, urls.mcpStatus, timeoutMs);
  checks.push(...checkStatusEndpoint(statusEndpoint, expected, urls.mcpStatus));

  const canonicalMcp = await checkCanonicalMcpEndpoint(
    fetchImpl,
    urls.canonicalMcp,
    expected,
    timeoutMs,
  );
  checks.push(...canonicalMcp.checks);

  const standaloneMcpGet = await fetchStandaloneMcpGet(fetchImpl, urls.canonicalMcp, timeoutMs);
  checks.push(...checkStandaloneMcpGet(standaloneMcpGet, urls.canonicalMcp));

  const breached = checks.some((check) => check.status === 'fail');
  const state: ProductionSmokeState = breached ? 'breach' : 'ok';

  return {
    state,
    ok: !breached,
    breached,
    generatedAt: (config.now ?? new Date()).toISOString(),
    websiteBaseUrl,
    mcpBaseUrl,
    expected,
    observed: {
      statusEndpoint,
      canonicalMcp: canonicalMcp.observed,
      standaloneMcpGet,
    },
    checks,
    summary: summarizeSmoke(state, checks),
  };
}

export function formatProductionSmokeMarkdown(report: ProductionSmokeReport): string {
  const rows = report.checks
    .map((check) =>
      `| ${check.characteristic} | ${check.status} | ${escapeTableCell(check.evidence)} | ${check.url ?? ''} |`,
    )
    .join('\n');

  return `# Semantic Production Smoke

State: **${report.state}**

${report.summary}

- Website base URL: ${report.websiteBaseUrl}
- MCP base URL: ${report.mcpBaseUrl}
- Expected upstream ref: ${report.expected.upstreamRef}
- Expected source hash: ${report.expected.sourceHash}

| Characteristic | Status | Evidence | URL |
| --- | --- | --- | --- |
${rows}
`;
}

function buildSmokeUrls(websiteBaseUrl: string, mcpBaseUrl: string) {
  return {
    websiteRoot: buildUrl(websiteBaseUrl, '/'),
    websiteConnect: buildUrl(websiteBaseUrl, '/connect-mcp'),
    mcpRoot: buildUrl(mcpBaseUrl, '/'),
    mcpConnect: buildUrl(mcpBaseUrl, '/connect-mcp'),
    mcpStatus: buildUrl(mcpBaseUrl, HOSTED_FPF_STATUS_ROUTE),
    canonicalMcp: buildUrl(mcpBaseUrl, HOSTED_MCP_ROUTE),
  };
}

async function readExpectedPublication(cwd?: string): Promise<ExpectedPublication> {
  const surface = await validatePublishedSurface({ cwd });
  return {
    upstreamRef: surface.manifest.upstreamRef,
    sourceHash: surface.manifest.sourceHash,
    publishedAt: surface.manifest.publishedAt,
  };
}

async function fetchPage(
  fetchImpl: typeof fetch,
  url: string,
  timeoutMs: number,
): Promise<PageEvidence> {
  const response = await fetchImpl(url, {
    method: 'GET',
    signal: AbortSignal.timeout(timeoutMs),
  });
  return {
    url,
    status: response.status,
    text: await response.text(),
  };
}

function checkCanonicalOnboardingPage(
  label: string,
  page: PageEvidence,
): ProductionSmokeCheck[] {
  const lower = page.text.toLowerCase();
  const hasLegacyName = page.text.includes('fpf_memory');
  const canonicalIndex = page.text.indexOf('fpf_reference');
  const legacyIndex = page.text.indexOf('fpf_memory');
  const legacyLabeled =
    !hasLegacyName || /\b(legacy|compatibility|blocked|mitigation|old clients?)\b/iu.test(page.text);
  const legacyNotPrimary =
    legacyIndex < 0 || (canonicalIndex >= 0 && canonicalIndex < legacyIndex);
  const oldProductPrimary =
    /hosted\s+fpf-memory\s+mcp|fpf-memory\s+mcp\s+server/iu.test(page.text);

  return [
    {
      characteristic: `${label} HTTP availability`,
      status: page.status === 200 ? 'pass' : 'fail',
      evidence: `HTTP ${page.status}`,
      url: page.url,
    },
    {
      characteristic: `${label} public product name`,
      status: page.text.includes('FPF Reference') && !oldProductPrimary ? 'pass' : 'fail',
      evidence: page.text.includes('FPF Reference')
        ? 'names FPF Reference without old hosted fpf-memory primary copy'
        : 'missing FPF Reference',
      url: page.url,
    },
    {
      characteristic: `${label} canonical MCP route`,
      status:
        page.text.includes('fpf_reference')
        && page.text.includes('/api/mcp/fpf_reference/mcp')
        && page.text.includes(PRODUCTION_SMOKE_CANONICAL_MCP_ENDPOINT)
          ? 'pass'
          : 'fail',
      evidence: 'canonical server name and hosted endpoint are present',
      url: page.url,
    },
    {
      characteristic: `${label} legacy route boundary`,
      status: legacyLabeled && legacyNotPrimary && !lower.includes('use fpf_memory') ? 'pass' : 'fail',
      evidence: hasLegacyName
        ? 'legacy fpf_memory mention is labeled and follows fpf_reference'
        : 'no legacy fpf_memory onboarding path presented',
      url: page.url,
    },
  ];
}

function checkGetDocs(page: PageEvidence): ProductionSmokeCheck[] {
  const mentions405 = /405|Method Not Allowed/iu.test(page.text);
  const mentions406 = /406|Not Acceptable/iu.test(page.text);

  return [
    {
      characteristic: `${shortUrlLabel(page.url)} standalone MCP GET documentation`,
      status: mentions405 && !mentions406 ? 'pass' : 'fail',
      evidence: mentions405
        ? 'documents standalone MCP GET as 405 Method Not Allowed'
        : 'does not document standalone MCP GET as 405 Method Not Allowed',
      url: page.url,
    },
  ];
}

async function fetchStatusEndpoint(
  fetchImpl: typeof fetch,
  url: string,
  timeoutMs: number,
): Promise<ObservedStatusEndpoint> {
  const response = await fetchImpl(url, {
    method: 'GET',
    signal: AbortSignal.timeout(timeoutMs),
  });
  const body = asRecord(await response.json(), 'status endpoint response');
  const publication = asRecord(body.publication, 'status publication');
  const runtime = asRecord(body.runtime, 'status runtime');

  return {
    servedAt: stringField(body.servedAt),
    status: String(body.status ?? `http_${response.status}`),
    publicationUpstreamRef: stringField(publication.upstreamRef),
    publicationSourceHash: stringField(publication.sourceHash),
    publicationPublishedAt: stringField(publication.publishedAt),
    runtimeBuiltAt: stringField(runtime.builtAt),
    runtimeFresh: booleanField(runtime.fresh),
    runtimeSourceHash: stringField(runtime.sourceHash),
    runtimeCurrentSourceHash: stringField(runtime.currentSourceHash),
    runtimeSnapshotSourceHash: stringField(runtime.snapshotSourceHash),
  };
}

function checkStatusEndpoint(
  status: ObservedStatusEndpoint,
  expected: ExpectedPublication,
  url: string,
): ProductionSmokeCheck[] {
  const publicationMatches =
    status.publicationUpstreamRef === expected.upstreamRef
    && status.publicationSourceHash === expected.sourceHash;
  const runtimeInternallyConsistent =
    status.runtimeSourceHash === status.runtimeCurrentSourceHash
    && status.runtimeSnapshotSourceHash === status.runtimeCurrentSourceHash
    && status.runtimeFresh === true;
  const runtimeMatchesExpected = status.runtimeCurrentSourceHash === expected.sourceHash;

  return [
    {
      characteristic: 'status endpoint publication artifact',
      status: publicationMatches ? 'pass' : 'fail',
      evidence:
        `published upstreamRef=${status.publicationUpstreamRef ?? 'unknown'}, sourceHash=${status.publicationSourceHash ?? 'unknown'}`,
      url,
    },
    {
      characteristic: 'status endpoint runtime source',
      status: runtimeInternallyConsistent && runtimeMatchesExpected ? 'pass' : 'fail',
      evidence:
        `runtime internalFresh=${String(status.runtimeFresh)}, runtimeSourceHash=${status.runtimeCurrentSourceHash ?? 'unknown'}`,
      url,
    },
    {
      characteristic: 'status freshness basis',
      status: publicationMatches && runtimeInternallyConsistent && runtimeMatchesExpected ? 'pass' : 'fail',
      evidence:
        'freshness requires both internal snapshot consistency and match to the expected published/current artifact',
      url,
    },
  ];
}

async function checkCanonicalMcpEndpoint(
  fetchImpl: typeof fetch,
  endpoint: string,
  expected: ExpectedPublication,
  timeoutMs: number,
): Promise<{
  observed: ObservedMcpEndpoint;
  checks: ProductionSmokeCheck[];
}> {
  const client = new JsonRpcMcpSmokeClient(fetchImpl, endpoint, timeoutMs);
  const initialize = asRecord(
    await client.rpc('initialize', {
      protocolVersion: '2025-06-18',
      capabilities: {},
      clientInfo: {
        name: 'fpf-reference-production-smoke',
        version: '1.0.0',
      },
    }),
    'initialize result',
  );
  const serverInfo = asRecord(initialize.serverInfo, 'initialize serverInfo');
  await client.notify('notifications/initialized');

  const toolsResult = asRecord(await client.rpc('tools/list'), 'tools/list result');
  const tools = asArray(toolsResult.tools, 'tools/list tools');
  const toolNames = tools.map((tool, index) => {
    const record = asRecord(tool, `tool ${index}`);
    return String(record.name ?? '');
  });

  const statusResult = asRecord(
    await client.rpc('tools/call', {
      name: 'get_fpf_index_status',
      arguments: {},
    }),
    'get_fpf_index_status result',
  );
  const structuredContent = asRecord(
    statusResult.structuredContent,
    'get_fpf_index_status structuredContent',
  );
  const observed: ObservedMcpEndpoint = {
    serverName: stringField(serverInfo.name),
    toolNames,
    statusToolSourceHash: stringField(structuredContent.currentSourceHash)
      ?? stringField(structuredContent.sourceHash),
    statusToolFresh: booleanField(structuredContent.fresh),
  };
  const toolSurfaceMatches =
    toolNames.length === PRODUCTION_SMOKE_PUBLIC_TOOLS.length
    && PRODUCTION_SMOKE_PUBLIC_TOOLS.every((tool) => toolNames.includes(tool));
  const statusToolMatches =
    observed.statusToolFresh === true
    && observed.statusToolSourceHash === expected.sourceHash;

  return {
    observed,
    checks: [
      {
        characteristic: 'canonical MCP POST server identity',
        status: observed.serverName === 'fpf_reference' ? 'pass' : 'fail',
        evidence: `serverInfo.name=${observed.serverName ?? 'unknown'}`,
        url: endpoint,
      },
      {
        characteristic: 'canonical MCP public tool surface',
        status: toolSurfaceMatches ? 'pass' : 'fail',
        evidence: `${toolNames.length} public tools advertised`,
        url: endpoint,
      },
      {
        characteristic: 'canonical MCP status tool artifact',
        status: statusToolMatches ? 'pass' : 'fail',
        evidence:
          `get_fpf_index_status fresh=${String(observed.statusToolFresh)}, sourceHash=${observed.statusToolSourceHash ?? 'unknown'}`,
        url: endpoint,
      },
    ],
  };
}

async function fetchStandaloneMcpGet(
  fetchImpl: typeof fetch,
  url: string,
  timeoutMs: number,
): Promise<ObservedStandaloneGet> {
  const response = await fetchImpl(url, {
    method: 'GET',
    headers: {
      Accept: 'text/event-stream',
      'MCP-Protocol-Version': '2025-06-18',
    },
    signal: AbortSignal.timeout(timeoutMs),
  });
  const contentType = response.headers.get('content-type') ?? '';
  const text = await response.text();
  let message: string | undefined;
  if (contentType.includes('json')) {
    try {
      const body = asRecord(JSON.parse(text), 'standalone GET response');
      const error = asRecord(body.error, 'standalone GET error');
      message = stringField(error.message);
    } catch {
      message = undefined;
    }
  }
  return {
    status: response.status,
    allow: response.headers.get('allow') ?? '',
    message,
  };
}

function checkStandaloneMcpGet(
  observed: ObservedStandaloneGet,
  url: string,
): ProductionSmokeCheck[] {
  return [
    {
      characteristic: 'standalone MCP GET runtime behavior',
      status:
        observed.status === 405
        && observed.allow.includes('POST')
        && observed.message?.includes('Standalone MCP SSE GET is disabled') === true
          ? 'pass'
          : 'fail',
      evidence:
        `GET status=${observed.status}, allow=${observed.allow || 'unknown'}, disabledPayload=${String(Boolean(observed.message))}`,
      url,
    },
  ];
}

class JsonRpcMcpSmokeClient {
  private nextId = 1;
  private sessionId: string | undefined;

  constructor(
    private readonly fetchImpl: typeof fetch,
    private readonly endpoint: string,
    private readonly timeoutMs: number,
  ) {}

  async rpc(method: string, params?: Record<string, unknown>): Promise<unknown> {
    const id = this.nextId++;
    const response = await this.fetchImpl(this.endpoint, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({
        jsonrpc: '2.0',
        id,
        method,
        ...(params ? { params } : {}),
      }),
      signal: AbortSignal.timeout(this.timeoutMs),
    });
    this.captureSessionId(response);

    const body = await readJson(response, `${method} response`);
    if (!response.ok || body.error) {
      throw new Error(`${method} returned HTTP ${response.status}: ${body.error?.message ?? 'unknown JSON-RPC error'}`);
    }
    return body.result;
  }

  async notify(method: string, params?: Record<string, unknown>): Promise<void> {
    const response = await this.fetchImpl(this.endpoint, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({
        jsonrpc: '2.0',
        method,
        ...(params ? { params } : {}),
      }),
      signal: AbortSignal.timeout(this.timeoutMs),
    });
    this.captureSessionId(response);
    await response.body?.cancel().catch(() => undefined);
  }

  private headers(): HeadersInit {
    return {
      'content-type': 'application/json',
      accept: 'application/json, text/event-stream',
      'MCP-Protocol-Version': '2025-06-18',
      ...(this.sessionId ? { 'MCP-Session-Id': this.sessionId } : {}),
    };
  }

  private captureSessionId(response: Response): void {
    this.sessionId = response.headers.get('mcp-session-id') ?? this.sessionId;
  }
}

async function readJson(response: Response, label: string): Promise<JsonRpcResponse> {
  const text = await response.text();
  try {
    return JSON.parse(text) as JsonRpcResponse;
  } catch {
    throw new Error(`${label} was not JSON.`);
  }
}

function normalizeBaseUrl(value: string): string {
  return value.replace(/\/+$/u, '');
}

function buildUrl(baseUrl: string, path: string): string {
  return new URL(path, `${baseUrl}/`).toString();
}

function shortUrlLabel(url: string): string {
  const parsed = new URL(url);
  return `${parsed.hostname}${parsed.pathname}`;
}

function asRecord(value: unknown, label: string): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`${label} was not an object.`);
  }
  return value as Record<string, unknown>;
}

function asArray(value: unknown, label: string): unknown[] {
  if (!Array.isArray(value)) {
    throw new Error(`${label} was not an array.`);
  }
  return value;
}

function stringField(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function booleanField(value: unknown): boolean | undefined {
  return typeof value === 'boolean' ? value : undefined;
}

function summarizeSmoke(
  state: ProductionSmokeState,
  checks: ProductionSmokeCheck[],
): string {
  if (state === 'ok') {
    return `${checks.length} semantic production checks passed.`;
  }
  const failed = checks.filter((check) => check.status === 'fail');
  return `${failed.length}/${checks.length} semantic production checks failed: ${failed.map((check) => check.characteristic).join('; ')}`;
}

function escapeTableCell(value: string): string {
  return value.replace(/\|/gu, '\\|').replace(/\r?\n/gu, ' ');
}
