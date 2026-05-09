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
  for (const route of HOSTED_HOME_ROUTES) {
    app.get(route, (c) => c.html(renderHostedHomePage()));
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
