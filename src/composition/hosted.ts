import { Hono } from 'hono';
import type { IncomingMessage, ServerResponse } from 'node:http';

import {
  parseHostedConfig,
  parseLoggingConfig,
} from '../adapters/infra/config/env.js';
import { getRuntimeLogger } from '../adapters/infra/logging/runtime-logger.js';
import { renderHostedHomePage } from '../adapters/hosted/home-page.js';
import {
  HOSTED_FPF_STATUS_ROUTE,
  readHostedFpfStatus,
} from '../adapters/hosted/status-page.js';
import {
  isStandaloneMcpGet,
  writeMcpGetDisabledNodeResponse,
} from '../adapters/mcp/server.js';
import { applyHostedEnvDefaults } from './hosted-env.js';
import { getSharedMcpComposition } from './mcp.js';

export const HOSTED_HOME_ROUTES = ['/', '/connect-mcp'] as const;
export const HOSTED_MCP_ROUTE = '/api/mcp/fpf_reference/mcp';
export const LEGACY_HOSTED_MCP_ROUTE = '/api/mcp/fpf_memory/mcp';
export const HOSTED_MCP_ROUTES = [
  HOSTED_MCP_ROUTE,
  LEGACY_HOSTED_MCP_ROUTE,
] as const;
export { HOSTED_FPF_STATUS_ROUTE };

export function createHostedComposition(env: NodeJS.ProcessEnv) {
  const hostedEnv = applyHostedEnvDefaults(env, { moduleUrl: import.meta.url });
  const hostedConfig = parseHostedConfig(hostedEnv);
  const mcpComposition = getSharedMcpComposition(hostedEnv);
  const mcpServer =
    hostedConfig.surface === 'full'
      ? mcpComposition.fpfReference
      : mcpComposition.fpfReferencePublic;

  const app = new Hono();

  // Apply baseline security headers to every response. Values are conservative
  // for an unauthenticated public docs endpoint: the MCP API is not credentialed
  // and the home page is fully self-contained, so DENY/no-referrer don't break
  // legitimate flows. Per-response Cache-Control overrides are still applied
  // on routes below.
  app.use('*', async (c, next) => {
    await next();
    c.header('X-Content-Type-Options', 'nosniff');
    c.header('Referrer-Policy', 'no-referrer');
    c.header('X-Frame-Options', 'DENY');
    c.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  });

  for (const route of HOSTED_HOME_ROUTES) {
    app.get(route, (c) => {
      // Static HTML, regenerated only on deploy. Let the CDN serve it directly
      // from the edge so the first visitor in each region doesn't pay the
      // function cold-start tax. Vercel's deploy pipeline invalidates the
      // cache on each new build.
      c.header(
        'Cache-Control',
        'public, max-age=300, s-maxage=86400, stale-while-revalidate=604800',
      );
      return c.html(renderHostedHomePage());
    });
  }
  app.get(HOSTED_FPF_STATUS_ROUTE, async (c) => {
    try {
      const status = await readHostedFpfStatus({ moduleUrl: import.meta.url });
      c.header('Cache-Control', 'no-store');
      return c.json(status, status.status === 'ok' ? 200 : 503);
    } catch (error) {
      c.header('Cache-Control', 'no-store');
      return c.json(
        {
          status: 'error',
          servedAt: new Date().toISOString(),
          message: error instanceof Error ? error.message : String(error),
        },
        500,
      );
    }
  });
  for (const route of HOSTED_MCP_ROUTES) {
    if (hostedConfig.mcpDisabled) {
      app.all(route, () => createHostedMcpDisabledResponse());
    } else if (route === LEGACY_HOSTED_MCP_ROUTE) {
      app.all(route, () => createHostedLegacyMcpDisabledResponse());
    } else {
      app.all(route, (c) => mcpServer.handleStreamableHttp(c.req.raw));
    }
  }

  return {
    ...mcpComposition,
    hostedConfig,
    app,
    mcpServer,
  };
}

export function createHostedErrorLogger(env: NodeJS.ProcessEnv) {
  return getRuntimeLogger(parseLoggingConfig(env));
}

export function tryHandleHostedMcpNodeGuard(
  request: IncomingMessage,
  response: ServerResponse,
): boolean {
  if (parseHostedConfig(process.env).mcpDisabled) {
    writeHostedMcpDisabledNodeResponse(response);
    return true;
  }

  if (isHostedMcpRoute(request, LEGACY_HOSTED_MCP_ROUTE)) {
    writeHostedLegacyMcpDisabledNodeResponse(response);
    return true;
  }

  if (!isStandaloneMcpGet(request.method)) {
    return false;
  }

  writeMcpGetDisabledNodeResponse(response);
  return true;
}

function isHostedMcpRoute(
  request: IncomingMessage,
  route: (typeof HOSTED_MCP_ROUTES)[number],
): boolean {
  const url = new URL(request.url ?? '/', 'https://localhost');
  return url.pathname === route;
}

function createHostedLegacyMcpDisabledResponse(): Response {
  return createHostedMcpBlockedResponse(
    403,
    'Legacy FPF MCP endpoint is disabled; use https://mcp.fpf.sh/api/mcp/fpf_reference/mcp.',
    {
      'X-Vercel-Mitigated': 'deny',
      Link: '<https://mcp.fpf.sh/api/mcp/fpf_reference/mcp>; rel="successor-version"',
    },
  );
}

function createHostedMcpDisabledResponse(): Response {
  return createHostedMcpBlockedResponse(503, 'Hosted FPF MCP is temporarily disabled.', {
    'Retry-After': '3600',
  });
}

function createHostedMcpBlockedResponse(
  status: number,
  message: string,
  headers: Record<string, string>,
): Response {
  return new Response(JSON.stringify(createHostedMcpBlockedPayload(message)), {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8',
      ...headers,
    },
  });
}

function writeHostedLegacyMcpDisabledNodeResponse(response: ServerResponse): void {
  response.statusCode = 403;
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('X-Vercel-Mitigated', 'deny');
  response.setHeader(
    'Link',
    '<https://mcp.fpf.sh/api/mcp/fpf_reference/mcp>; rel="successor-version"',
  );
  response.end(JSON.stringify(createHostedMcpBlockedPayload(
    'Legacy FPF MCP endpoint is disabled; use https://mcp.fpf.sh/api/mcp/fpf_reference/mcp.',
  )));
}

function writeHostedMcpDisabledNodeResponse(response: ServerResponse): void {
  response.statusCode = 503;
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Retry-After', '3600');
  response.end(JSON.stringify(createHostedMcpBlockedPayload(
    'Hosted FPF MCP is temporarily disabled.',
  )));
}

function createHostedMcpBlockedPayload(message: string) {
  return {
    jsonrpc: '2.0',
    error: {
      code: -32000,
      message,
    },
    id: null,
  } as const;
}
