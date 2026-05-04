import { parseLoggingConfig } from '../adapters/infra/config/env.js';
import { getRuntimeLogger } from '../adapters/infra/logging/runtime-logger.js';
import { QueryAppService } from '../app/services/query-app-service.js';
import { TraceAppService } from '../app/services/trace-app-service.js';
import { InspectAppService } from '../app/services/inspect-app-service.js';
import { RefreshAppService } from '../app/services/refresh-app-service.js';
import { createConfiguredRuntime } from './runtime.js';

export function createCliComposition(env: NodeJS.ProcessEnv) {
  const runtimeComposition = createConfiguredRuntime(env);
  const logger = getRuntimeLogger(parseLoggingConfig(env));

  return {
    ...runtimeComposition,
    logger,
    queryAppService: new QueryAppService(runtimeComposition.runtime),
    traceAppService: new TraceAppService(runtimeComposition.runtime),
    inspectAppService: new InspectAppService(runtimeComposition.runtime),
    refreshAppService: new RefreshAppService(runtimeComposition.runtime),
  };
}
