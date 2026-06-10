import { describe, expect, it } from '@rstest/core';

import {
  formatProductionSmokeMarkdown,
  runProductionSmoke,
  type ExpectedPublication,
} from '../src/build/production-smoke.js';
import {
  MCP_ORIGIN_HOME_URL,
  WIKI_BASE_URL,
} from '../src/core/public-copy.js';

const EXPECTED: ExpectedPublication = {
  upstreamRef: '1234567890abcdef1234567890abcdef12345678',
  sourceHash: 'sha256:expected',
  publishedAt: '2026-05-31T09:25:05.436Z',
};

describe('semantic production smoke', () => {
  it('passes only when naming, route, freshness, MCP POST, and GET semantics agree', async () => {
    const report = await runProductionSmoke({
      websiteBaseUrl: 'https://docs.example.test',
      mcpBaseUrl: 'https://mcp.example.test',
      expectedPublication: EXPECTED,
      fetchImpl: createSmokeFetch(),
    });

    expect(report.ok).toBe(true);
    expect(report.state).toBe('ok');
    expect(report.observed.statusEndpoint?.publicationUpstreamRef).toBe(EXPECTED.upstreamRef);
    expect(report.observed.canonicalMcp?.serverName).toBe('fpf_reference');
    expect(report.observed.standaloneMcpGet?.status).toBe(405);
    expect(JSON.stringify(report)).not.toContain('session');
  });

  it('breaches when status is internally fresh but not current against the expected artifact', async () => {
    const report = await runProductionSmoke({
      websiteBaseUrl: 'https://docs.example.test',
      mcpBaseUrl: 'https://mcp.example.test',
      expectedPublication: EXPECTED,
      fetchImpl: createSmokeFetch({
        statusSourceHash: 'sha256:old',
        statusUpstreamRef: 'fedcba0987654321fedcba0987654321fedcba09',
        statusSnapshotConsistent: true,
      }),
    });

    expect(report.ok).toBe(false);
    expect(report.summary).toContain('status endpoint publication artifact');
    expect(report.summary).toContain('status endpoint runtime source');
    expect(formatProductionSmokeMarkdown(report)).toContain(
      'freshnessBasis=source_hash_match, upstreamCurrentness=unknown',
    );
  });

  it('accepts transitional legacy runtime.fresh status payloads', async () => {
    const report = await runProductionSmoke({
      websiteBaseUrl: 'https://docs.example.test',
      mcpBaseUrl: 'https://mcp.example.test',
      expectedPublication: EXPECTED,
      fetchImpl: createSmokeFetch({ legacyStatusFresh: true }),
    });

    expect(report.ok).toBe(true);
    expect(formatProductionSmokeMarkdown(report)).toContain('legacy_runtime_fresh');
  });

  it('breaches when the wiki root loses the orientation doorway', async () => {
    const report = await runProductionSmoke({
      websiteBaseUrl: 'https://docs.example.test',
      mcpBaseUrl: 'https://mcp.example.test',
      expectedPublication: EXPECTED,
      fetchImpl: createSmokeFetch({
        websiteRootText: mcpLandingText(),
      }),
    });

    expect(report.ok).toBe(false);
    expect(report.summary).toContain('fpf.sh root orientation doorway');
  });

  it('breaches when old fpf_memory onboarding is primary or unlabeled', async () => {
    const report = await runProductionSmoke({
      websiteBaseUrl: 'https://docs.example.test',
      mcpBaseUrl: 'https://mcp.example.test',
      expectedPublication: EXPECTED,
      fetchImpl: createSmokeFetch({
        mcpRootText:
          'Hosted fpf-memory MCP server. Use fpf_memory at https://mcp.example.test/api/mcp/fpf_memory/mcp before fpf_reference.',
      }),
    });

    expect(report.ok).toBe(false);
    expect(report.summary).toContain('mcp.fpf.sh root public product name');
    expect(report.summary).toContain('mcp.fpf.sh root legacy route boundary');
  });

  it('breaches when docs say 406 while runtime returns the expected 405 payload', async () => {
    const report = await runProductionSmoke({
      websiteBaseUrl: 'https://docs.example.test',
      mcpBaseUrl: 'https://mcp.example.test',
      expectedPublication: EXPECTED,
      fetchImpl: createSmokeFetch({
        websiteConnectText: wikiConnectText(),
        mcpConnectText: mcpLandingText('406 Not Acceptable'),
      }),
    });

    expect(report.ok).toBe(false);
    expect(report.summary).toContain('standalone MCP GET documentation');
    expect(report.observed.standaloneMcpGet?.status).toBe(405);
  });

  it('does not require standalone MCP GET wording on the fpf.sh bridge page', async () => {
    const report = await runProductionSmoke({
      websiteBaseUrl: 'https://docs.example.test',
      mcpBaseUrl: 'https://mcp.example.test',
      expectedPublication: EXPECTED,
      fetchImpl: createSmokeFetch({
        websiteConnectText: wikiConnectText(),
        mcpConnectText: mcpLandingText('405 Method Not Allowed'),
      }),
    });

    expect(report.ok).toBe(true);
    expect(report.summary).not.toContain('fpf.sh connect-mcp standalone MCP GET documentation');
  });
});

function createSmokeFetch(overrides: {
  websiteRootText?: string;
  websiteConnectText?: string;
  mcpRootText?: string;
  mcpConnectText?: string;
  statusSourceHash?: string;
  statusUpstreamRef?: string;
  statusSnapshotConsistent?: boolean;
  legacyStatusFresh?: boolean;
} = {}): typeof fetch {
  const statusSourceHash = overrides.statusSourceHash ?? EXPECTED.sourceHash;
  const statusUpstreamRef = overrides.statusUpstreamRef ?? EXPECTED.upstreamRef;
  const statusSnapshotConsistent = overrides.statusSnapshotConsistent ?? true;

  const fakeFetch = async (input: string | URL | Request, init?: RequestInit): Promise<Response> => {
    const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url);
    const method = init?.method ?? (input instanceof Request ? input.method : 'GET');

    if (url.pathname === '/api/fpf/status') {
      return jsonResponse({
        status: 'ok',
        servedAt: '2026-05-31T10:00:00.000Z',
        publication: {
          upstreamRef: statusUpstreamRef,
          sourceHash: statusSourceHash,
          publishedAt: EXPECTED.publishedAt,
        },
        runtime: {
          sourceHash: statusSourceHash,
          snapshotSourceHash: statusSourceHash,
          currentSourceHash: statusSourceHash,
          builtAt: '2026-05-31T09:25:00.097Z',
          snapshotExists: true,
          ...(overrides.legacyStatusFresh
            ? { fresh: statusSnapshotConsistent }
            : { snapshotConsistent: statusSnapshotConsistent }),
        },
        ...(overrides.legacyStatusFresh
          ? {}
          : {
            freshness: {
              snapshotConsistent: statusSnapshotConsistent,
              publicationCurrentAgainstConfiguredSource: statusSnapshotConsistent,
              freshnessBasis: statusSnapshotConsistent ? 'source_hash_match' : 'unknown',
              upstreamCurrentness: 'unknown',
            },
          }),
      });
    }

    if (url.pathname === '/api/mcp/fpf_reference/mcp' && method === 'GET') {
      return jsonResponse(
        {
          jsonrpc: '2.0',
          error: {
            code: -32000,
            message:
              'Standalone MCP SSE GET is disabled on this endpoint; use POST Streamable HTTP JSON-RPC requests.',
          },
          id: null,
        },
        {
          status: 405,
          headers: { Allow: 'POST, DELETE' },
        },
      );
    }

    if (url.pathname === '/api/mcp/fpf_reference/mcp' && method === 'POST') {
      return handleMcpPost(init);
    }

    if (url.hostname === 'docs.example.test' && url.pathname === '/') {
      return htmlResponse(overrides.websiteRootText ?? websiteOrientationText());
    }
    if (url.hostname === 'docs.example.test' && url.pathname === '/connect-mcp') {
      return htmlResponse(overrides.websiteConnectText ?? wikiConnectText('405 Method Not Allowed'));
    }
    if (url.hostname === 'mcp.example.test' && url.pathname === '/') {
      return htmlResponse(overrides.mcpRootText ?? mcpLandingText('405 Method Not Allowed'));
    }
    if (url.hostname === 'mcp.example.test' && url.pathname === '/connect-mcp') {
      return htmlResponse(overrides.mcpConnectText ?? mcpLandingText('405 Method Not Allowed'));
    }

    return new Response('not found', { status: 404 });
  };
  return fakeFetch as unknown as typeof fetch;
}

function handleMcpPost(init: RequestInit | undefined): Response {
  const payload = JSON.parse(String(init?.body ?? '{}')) as { method?: string; id?: number };
  if (payload.method === 'notifications/initialized') {
    return new Response('', {
      status: 202,
      headers: { 'mcp-session-id': 'private-session-id' },
    });
  }
  if (payload.method === 'initialize') {
    return jsonResponse(
      {
        jsonrpc: '2.0',
        id: payload.id,
        result: {
          protocolVersion: '2025-06-18',
          capabilities: {},
          serverInfo: { name: 'fpf_reference', version: '1.0.0' },
        },
      },
      { headers: { 'mcp-session-id': 'private-session-id' } },
    );
  }
  if (payload.method === 'tools/list') {
    return jsonResponse({
      jsonrpc: '2.0',
      id: payload.id,
      result: {
        tools: [
          'browse_fpf_catalog',
          'search_fpf',
          'ask_fpf',
          'query_fpf_spec',
          'read_fpf_doc',
          'get_fpf_index_status',
        ].map((name) => ({ name })),
      },
    });
  }
  if (payload.method === 'tools/call') {
    return jsonResponse({
      jsonrpc: '2.0',
      id: payload.id,
      result: {
        structuredContent: {
          fresh: true,
          currentSourceHash: EXPECTED.sourceHash,
        },
      },
    });
  }

  return jsonResponse({
    jsonrpc: '2.0',
    id: payload.id,
    error: { code: -32601, message: 'method not found' },
  }, { status: 400 });
}

function websiteOrientationText(extra = ''): string {
  return [
    '<title>FPF Reference</title>',
    'FPF Reference',
    'Choose your entry point',
    'Pattern Catalog',
    '/patterns',
    extra,
  ].join(' ');
}

function wikiConnectText(extra = ''): string {
  return [
    '<title>Connect MCP</title>',
    'FPF Reference',
    'FPF is the specification',
    MCP_ORIGIN_HOME_URL,
    'fpf_reference',
    'compatibility bridge',
    'not agent memory',
    extra,
  ].join(' ');
}

function mcpLandingText(extra = ''): string {
  return [
    '<title>FPF Reference MCP</title>',
    'FPF Reference',
    'https://mcp.fpf.sh/api/mcp/fpf_reference/mcp',
    'fpf_reference',
    WIKI_BASE_URL,
    'Legacy https://mcp.fpf.sh/api/mcp/fpf_memory/mcp is blocked during mitigation.',
    extra,
  ].join(' ');
}

function htmlResponse(body: string): Response {
  return new Response(body, {
    status: 200,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}

function jsonResponse(
  body: unknown,
  init: { status?: number; headers?: Record<string, string> } = {},
): Response {
  return new Response(JSON.stringify(body), {
    status: init.status ?? 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...init.headers,
    },
  });
}
