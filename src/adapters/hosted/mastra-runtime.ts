import { Mastra } from '@mastra/core/mastra';
import type { MCPServerBase } from '@mastra/core/mcp';

import type { getRuntimeLogger } from '../infra/logging/runtime-logger.js';
import type { getRuntimeObservability } from '../infra/observability/runtime-observability.js';

export interface HostedMastraRuntimeDependencies {
  logger: ReturnType<typeof getRuntimeLogger>;
  observability: ReturnType<typeof getRuntimeObservability>;
  mcpServer: MCPServerBase;
}

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
      mcpOptions: { serverless: true },
    },
  };
}

export function createHostedMastraRuntime(options: HostedMastraRuntimeDependencies) {
  return new Mastra({
    ...buildHostedMastraRuntimeOptions(options),
  });
}
