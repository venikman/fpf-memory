import { parseLoggingConfig } from '../adapters/infra/config/env.js';
import { getRuntimeLogger } from '../adapters/infra/logging/runtime-logger.js';
import { createConfiguredRuntime } from './runtime.js';

export function createCliComposition(env: NodeJS.ProcessEnv) {
  const runtimeComposition = createConfiguredRuntime(env);
  const logger = getRuntimeLogger(parseLoggingConfig(env));

  return {
    ...runtimeComposition,
    logger,
  };
}
