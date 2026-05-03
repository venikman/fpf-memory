import { FpfRuntime } from '../runtime/runtime.js';
import {
  createSynthesizerFromConfig,
  type LmStudioHealthCheckOptions,
} from '../runtime/lm-studio-synthesizer.js';
import {
  parseLmStudioConfig,
  parseObservabilityConfig,
  parseRuntimeCoreConfig,
} from '../adapters/infra/config/env.js';
import {
  getRuntimeObservability,
  getRuntimeObservabilitySummary,
} from '../adapters/infra/observability/runtime-observability.js';

export interface RuntimeComposition {
  runtime: FpfRuntime;
  observability: ReturnType<typeof getRuntimeObservability>;
  lmStudioHealthCheckOptions: LmStudioHealthCheckOptions;
}

export function createConfiguredRuntime(
  env: NodeJS.ProcessEnv,
): RuntimeComposition {
  const runtimeConfig = parseRuntimeCoreConfig(env);
  const observabilityConfig = parseObservabilityConfig(env);
  const lmStudioConfig = parseLmStudioConfig(env);
  const observability = getRuntimeObservability(observabilityConfig);

  return {
    runtime: new FpfRuntime({
      sourcePath: runtimeConfig.sourcePath,
      artifactDir: runtimeConfig.artifactDir,
      maxSessions: runtimeConfig.maxSessions,
      persistSessionCache: runtimeConfig.persistSessionCache,
      synthesizer: lmStudioConfig.enabled
        ? createSynthesizerFromConfig({
            baseUrl: lmStudioConfig.baseUrl,
            model: lmStudioConfig.model,
            apiKey: lmStudioConfig.apiKey,
            timeoutMs: lmStudioConfig.timeoutMs,
            traceLogPath: lmStudioConfig.traceLogPath,
            observabilityConfig,
          })
        : undefined,
      observability: getRuntimeObservabilitySummary(observabilityConfig),
    }),
    observability,
    lmStudioHealthCheckOptions: {
      baseUrl: lmStudioConfig.baseUrl,
      model: lmStudioConfig.model,
      apiKey: lmStudioConfig.apiKey,
      timeoutMs: lmStudioConfig.timeoutMs,
    },
  };
}
