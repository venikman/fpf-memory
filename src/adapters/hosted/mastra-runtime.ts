import { Mastra } from '@mastra/core/mastra';
import type { MCPServerBase } from '@mastra/core/mcp';
import type { ApiRoute } from '@mastra/core/server';
import type { Handler } from 'hono';

import type { getRuntimeLogger } from '../infra/logging/runtime-logger.js';
import type { getRuntimeObservability } from '../infra/observability/runtime-observability.js';
import { renderHostedHomePage } from './home-page.js';

export interface HostedMastraRuntimeDependencies {
  logger: ReturnType<typeof getRuntimeLogger>;
  observability: ReturnType<typeof getRuntimeObservability>;
  mcpServer: MCPServerBase;
}

const hostedHomeHandler: Handler = (c) => c.html(renderHostedHomePage());

export const HOSTED_HOME_API_ROUTES = [
  {
    path: '/',
    method: 'GET',
    handler: hostedHomeHandler,
    requiresAuth: false,
  },
  {
    path: '/connect-mcp',
    method: 'GET',
    handler: hostedHomeHandler,
    requiresAuth: false,
  },
] satisfies ApiRoute[];

export function buildHostedMastraRuntimeOptions(
  options: HostedMastraRuntimeDependencies,
) {
  return {
    logger: options.logger,
    observability: options.observability.observability,
    mcpServers: {
      fpf_memory: options.mcpServer,
    },
    server: {
      apiRoutes: HOSTED_HOME_API_ROUTES,
      mcpOptions: { serverless: true },
    },
  };
}

export function createHostedMastraRuntime(options: HostedMastraRuntimeDependencies) {
  return new Mastra({
    ...buildHostedMastraRuntimeOptions(options),
  });
}
