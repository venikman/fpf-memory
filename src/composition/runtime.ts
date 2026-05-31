import { readFileSync } from 'node:fs';

import { FpfRuntime } from '../runtime/runtime.js';
import {
  parseRuntimeCoreConfig,
} from '../adapters/infra/config/env.js';
import { publishCurrentManifestSchema } from '../build/published-surface.js';
import {
  HOSTED_STAGED_MANIFEST_PATH,
  PUBLISHED_MANIFEST_PATH,
} from '../core/constants.js';
import { resolveRuntimePath } from '../runtime/path-resolution.js';

export interface RuntimeComposition {
  runtime: FpfRuntime;
}

export function createConfiguredRuntime(
  env: NodeJS.ProcessEnv,
): RuntimeComposition {
  const runtimeConfig = parseRuntimeCoreConfig(env);
  const compilerFingerprint = readPublishedCompilerFingerprint();

  return {
    runtime: new FpfRuntime({
      sourcePath: runtimeConfig.sourcePath,
      artifactDir: runtimeConfig.artifactDir,
      artifactSeedDir: runtimeConfig.artifactSeedDir,
      maxSessions: runtimeConfig.maxSessions,
      persistSessionCache: runtimeConfig.persistSessionCache,
      compilerFingerprint,
    }),
  };
}

// In bundled environments (Vercel function) the compiler TypeScript source
// isn't on disk, so the runtime's default `computeCompilerFingerprint()` path
// silently returns undefined and compiler-drift detection becomes a no-op. The
// staged or published manifest already records the correct fingerprint at
// build time — read it once at composition and pass it through so the runtime
// can refuse to serve a snapshot that was compiled by a different version.
function readPublishedCompilerFingerprint(): string | undefined {
  for (const candidate of [HOSTED_STAGED_MANIFEST_PATH, PUBLISHED_MANIFEST_PATH]) {
    const resolved = resolveRuntimePath(candidate, { kind: 'file' });
    if (!resolved.existed) {
      continue;
    }
    try {
      const parsed = publishCurrentManifestSchema.parse(
        JSON.parse(readFileSync(resolved.path, 'utf8')),
      );
      return parsed.compilerFingerprint;
    } catch {
      // Manifest exists but is malformed — fall through to the next candidate
      // rather than crashing composition; the runtime will still rebuild from
      // source if it can derive the fingerprint that way.
    }
  }
  return undefined;
}
