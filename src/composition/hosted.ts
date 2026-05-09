import { Hono } from 'hono';

import {
  parseHostedConfig,
  parseLoggingConfig,
} from '../adapters/infra/config/env.js';
import { getRuntimeLogger } from '../adapters/infra/logging/runtime-logger.js';
import { renderHostedHomePage } from '../adapters/hosted/home-page.js';
import { applyHostedEnvDefaults } from './hosted-env.js';
import { getSharedMcpComposition } from './mcp.js';

export const HOSTED_HOME_ROUTES = ['/', '/connect-mcp'] as const;
export const HOSTED_MCP_ROUTE = '/api/mcp/fpf_memory/mcp';

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
