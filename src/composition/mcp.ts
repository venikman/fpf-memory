import {
  parseLoggingConfig,
  parseMcpConfig,
  parseRuntimeCoreConfig,
} from '../adapters/infra/config/env.js';
import { getRuntimeLogger } from '../adapters/infra/logging/runtime-logger.js';
import { createMcpServerSet } from '../adapters/mcp/server.js';
import { createMcpTools } from '../adapters/mcp/tools.js';
import { createConfiguredRuntime } from './runtime.js';

let sharedMcpComposition: ReturnType<typeof createMcpComposition> | undefined;
let sharedMcpCompositionKey: string | undefined;

/**
 * One MCP/runtime stack per process for the ambient `process.env` path so
 * stdio and hosted entrypoints do not construct duplicate runtimes.
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

  const tools = createMcpTools({
    defaultQueryMode: mcpConfig.defaultQueryMode,
    runtime: runtimeComposition.runtime,
    logger,
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
    mcp: parseMcpConfig(env),
  });
}
