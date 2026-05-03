import {
  parseLmStudioConfig,
  parseLoggingConfig,
  parseMcpConfig,
  parseObservabilityConfig,
  parseRuntimeCoreConfig,
} from '../adapters/infra/config/env.js';
import { getRuntimeLogger } from '../adapters/infra/logging/runtime-logger.js';
import { DiscoveryAppService } from '../app/services/discovery-app-service.js';
import { InspectAppService } from '../app/services/inspect-app-service.js';
import { QueryAppService } from '../app/services/query-app-service.js';
import { RefreshAppService } from '../app/services/refresh-app-service.js';
import { TraceAppService } from '../app/services/trace-app-service.js';
import { createMcpServerSet } from '../adapters/mcp/server.js';
import { createMcpTools } from '../adapters/mcp/tools.js';
import { createConfiguredRuntime } from './runtime.js';

let sharedMcpComposition: ReturnType<typeof createMcpComposition> | undefined;
let sharedMcpCompositionKey: string | undefined;

/**
 * One MCP/runtime stack per process for the ambient `process.env` path so Mastra compat,
 * stdio, hosted, and legacy `fpf_memory` exports do not construct duplicate runtimes.
 * Callers that provide a custom env object get an isolated composition instead of reusing
 * process-global state derived from another environment.
 */
export function getSharedMcpComposition(env: NodeJS.ProcessEnv = process.env) {
  if (env !== process.env) {
    return createMcpComposition(env);
  }

  const cacheKey = buildMcpCompositionCacheKey(env);
  if (!sharedMcpComposition || sharedMcpCompositionKey !== cacheKey) {
    sharedMcpComposition = createMcpComposition(env);
    sharedMcpCompositionKey = cacheKey;
  }
  return sharedMcpComposition;
}

export function createMcpComposition(env: NodeJS.ProcessEnv) {
  const runtimeComposition = createConfiguredRuntime(env);
  const mcpConfig = parseMcpConfig(env);
  const logger = getRuntimeLogger(parseLoggingConfig(env));

  const queryAppService = new QueryAppService(runtimeComposition.runtime);
  const traceAppService = new TraceAppService(runtimeComposition.runtime);
  const inspectAppService = new InspectAppService(runtimeComposition.runtime);
  const refreshAppService = new RefreshAppService(runtimeComposition.runtime);
  const discoveryAppService = new DiscoveryAppService(runtimeComposition.runtime);
  const tools = createMcpTools({
    defaultQueryMode: mcpConfig.defaultQueryMode,
    queryAppService,
    traceAppService,
    inspectAppService,
    refreshAppService,
    discoveryAppService,
  });

  return {
    ...runtimeComposition,
    mcpConfig,
    logger,
    tools,
    ...createMcpServerSet(tools),
  };
}

function buildMcpCompositionCacheKey(env: NodeJS.ProcessEnv): string {
  return JSON.stringify({
    runtime: parseRuntimeCoreConfig(env),
    logging: parseLoggingConfig(env),
    observability: parseObservabilityConfig(env),
    lmStudio: parseLmStudioConfig(env),
    mcp: parseMcpConfig(env),
  });
}
