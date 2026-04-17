import { Mastra } from '@mastra/core/mastra';

import { parseHostedConfig } from '../../adapters/infra/config/env.js';
import {
  buildHostedMastraRuntimeOptions,
  type HostedMastraRuntimeDependencies,
} from '../../adapters/hosted/mastra-runtime.js';
import { applyHostedEnvDefaults } from '../../composition/hosted-env.js';
import { getSharedMcpComposition } from '../../composition/mcp.js';

export function createMastraRuntime(env: NodeJS.ProcessEnv = process.env) {
  return new Mastra(
    resolveMastraRuntimeOptions(env),
  );
}

/**
 * Compat resolver for the documented Mastra entry shims.
 * Canonical hosted composition still lives under `src/composition`.
 */
export function resolveMastraRuntimeDependencies(
  env: NodeJS.ProcessEnv = process.env,
): HostedMastraRuntimeDependencies {
  const hostedEnv = applyHostedEnvDefaults(env, { moduleUrl: import.meta.url });
  const hostedConfig = parseHostedConfig(hostedEnv);
  const mcpComposition = getSharedMcpComposition(hostedEnv);

  return {
    logger: mcpComposition.logger,
    observability: mcpComposition.observability,
    mcpServer:
      hostedConfig.surface === 'full'
        ? mcpComposition.fpfMemory
        : mcpComposition.fpfMemoryPublic,
  };
}

export function resolveMastraRuntimeOptions(env: NodeJS.ProcessEnv = process.env) {
  return buildHostedMastraRuntimeOptions(resolveMastraRuntimeDependencies(env));
}
