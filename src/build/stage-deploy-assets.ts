import { copyFile, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import type { BuildConfig } from '../adapters/infra/config/types.js';
import { parseBuildConfig, parseRuntimeCoreConfig } from '../adapters/infra/config/env.js';
import {
  HOSTED_STAGED_ARTIFACT_DIR,
  HOSTED_STAGED_SOURCE_PATH,
} from '../core/constants.js';
import { createConfiguredRuntime } from '../composition/runtime.js';
import type { BuildArtifactManifest } from './artifact-manifest.js';

export async function stageDeployAssets(
  config: BuildConfig,
  env: NodeJS.ProcessEnv,
): Promise<BuildArtifactManifest> {
  const runtimeConfig = parseRuntimeCoreConfig(env);
  const { runtime } = createConfiguredRuntime(env);
  await runtime.refresh(false);

  const sourcePath = resolve(process.cwd(), config.sourcePath);
  const hostedPublicDir = resolve(process.cwd(), config.hostedPublicDir);
  const runtimeArtifactDir = resolve(process.cwd(), runtimeConfig.artifactDir);
  const hostedRuntimeDir = resolve(hostedPublicDir, HOSTED_STAGED_ARTIFACT_DIR);
  const stagedSourcePath = resolve(hostedPublicDir, HOSTED_STAGED_SOURCE_PATH);
  const stagedSnapshotPath = resolve(hostedRuntimeDir, 'snapshot.json');
  const snapshotSourcePath = resolve(runtimeArtifactDir, 'snapshot.json');

  // Clean up legacy dotfile staging paths so dev checkouts don't accumulate
  // stale copies that could mask a broken staging pipeline. Harmless on a
  // clean tree (rm -rf --force semantics via `force: true`).
  await rm(resolve(hostedPublicDir, '.fpf-upstream'), { recursive: true, force: true });
  await rm(resolve(hostedPublicDir, '.runtime'), { recursive: true, force: true });

  await mkdir(hostedRuntimeDir, { recursive: true });
  await mkdir(dirname(stagedSourcePath), { recursive: true });
  await copyFile(sourcePath, stagedSourcePath);
  await copyFile(snapshotSourcePath, stagedSnapshotPath);

  return {
    builtAt: new Date().toISOString(),
    lifecycleState: 'operation',
    ownerContext: 'Ctx.Build',
    artifacts: [
      {
        kind: 'runtime_source',
        sourcePath,
        outputPath: stagedSourcePath,
        consumer: 'hosted',
      },
      {
        kind: 'runtime_snapshot',
        sourcePath: snapshotSourcePath,
        outputPath: stagedSnapshotPath,
        consumer: 'hosted',
      },
    ],
  };
}

export function parseBuildConfigFromEnv(env: NodeJS.ProcessEnv): BuildConfig {
  return parseBuildConfig(env);
}
