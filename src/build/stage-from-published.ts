import { copyFile, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import type { BuildConfig } from '../adapters/infra/config/types.js';
import { parseBuildConfig } from '../adapters/infra/config/env.js';
import {
  ARTIFACT_FILENAMES,
  HOSTED_STAGED_ARTIFACT_DIR,
  HOSTED_STAGED_SOURCE_PATH,
  PUBLISHED_ARTIFACT_DIR,
  PUBLISHED_MANIFEST_PATH,
  PUBLISHED_SPEC_PATH,
} from '../core/constants.js';
import type { BuildArtifactManifest } from './artifact-manifest.js';
import { validatePublishedSurface } from './published-surface.js';

export interface StageFromPublishedOverrides {
  /** Override for tests. Defaults to `published/current/FPF-Spec.md`. */
  publishedSpecPath?: string;
  /** Override for tests. Defaults to `published/current/fpf-index`. */
  publishedArtifactDir?: string;
  /** Override for tests. Defaults to `published/current/manifest.json`. */
  publishedManifestPath?: string;
}

/**
 * Copy the committed `published/current/**` publication surface into the
 * hosted staging tree that `bun run build:vercel-origin` copies into the
 * Vercel function bundle.
 *
 * No runtime compile, no spec download — if `published/current/` is
 * missing or incomplete, fail fast so CI catches an un-prepared push
 * rather than silently shipping an empty bundle.
 */
export async function stageFromPublished(
  config: BuildConfig,
  overrides: StageFromPublishedOverrides = {},
): Promise<BuildArtifactManifest> {
  const cwd = process.cwd();
  const hostedPublicDir = resolve(cwd, config.hostedPublicDir);
  const hostedRuntimeDir = resolve(hostedPublicDir, HOSTED_STAGED_ARTIFACT_DIR);
  const stagedSourcePath = resolve(hostedPublicDir, HOSTED_STAGED_SOURCE_PATH);
  const stagedSnapshotPath = resolve(hostedRuntimeDir, ARTIFACT_FILENAMES.snapshot);

  const publishedSurface = await validatePublishedSurface({
    cwd,
    publishedSpecPath: overrides.publishedSpecPath ?? PUBLISHED_SPEC_PATH,
    publishedArtifactDir: overrides.publishedArtifactDir ?? PUBLISHED_ARTIFACT_DIR,
    publishedManifestPath: overrides.publishedManifestPath ?? PUBLISHED_MANIFEST_PATH,
  });
  const { publishedSpecPath, publishedSnapshotPath } = publishedSurface.paths;

  // Scrub legacy dotfile staging paths so a stale local checkout can't mask
  // a broken staging pipeline. Harmless on a clean tree.
  await rm(resolve(hostedPublicDir, '.fpf-upstream'), { recursive: true, force: true });
  await rm(resolve(hostedPublicDir, '.runtime'), { recursive: true, force: true });
  await rm(resolve(hostedPublicDir, 'FPF-spec.md'), { force: true });

  await mkdir(hostedRuntimeDir, { recursive: true });
  await mkdir(dirname(stagedSourcePath), { recursive: true });
  await copyFile(publishedSpecPath, stagedSourcePath);
  await copyFile(publishedSnapshotPath, stagedSnapshotPath);

  return {
    builtAt: new Date().toISOString(),
    lifecycleState: 'operation',
    ownerContext: 'Ctx.Build',
    artifacts: [
      {
        kind: 'runtime_source',
        sourcePath: publishedSpecPath,
        outputPath: stagedSourcePath,
        consumer: 'hosted',
      },
      {
        kind: 'runtime_snapshot',
        sourcePath: publishedSnapshotPath,
        outputPath: stagedSnapshotPath,
        consumer: 'hosted',
      },
    ],
  };
}

export function parseBuildConfigFromEnv(env: NodeJS.ProcessEnv): BuildConfig {
  return parseBuildConfig(env);
}
