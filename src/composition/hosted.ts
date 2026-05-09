import { Hono } from 'hono';

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
import { applyHostedEnvDefaults } from './hosted-env.js';
import { getSharedMcpComposition } from './mcp.js';

export const HOSTED_HOME_ROUTES = ['/', '/connect-mcp'] as const;
export const HOSTED_MCP_ROUTE = '/api/mcp/fpf_memory/mcp';
export { HOSTED_FPF_STATUS_ROUTE };

export function createHostedComposition(env: NodeJS.ProcessEnv) {
  const hostedEnv = applyHostedEnvDefaults(env, { moduleUrl: import.meta.url });
  const hostedConfig = parseHostedConfig(hostedEnv);
  const mcpComposition = getSharedMcpComposition(hostedEnv);
  const mcpServer =
    hostedConfig.surface === 'full'
      ? mcpComposition.fpfMemory
      : mcpComposition.fpfMemoryPublic;

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
  app.all(HOSTED_MCP_ROUTE, (c) => mcpServer.handleStreamableHttp(c.req.raw));

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
