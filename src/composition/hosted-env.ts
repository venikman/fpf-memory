import {
  ARTIFACT_FILENAMES,
  HOSTED_STAGED_ARTIFACT_DIR,
  HOSTED_STAGED_SOURCE_PATH,
  SERVERLESS_ARTIFACT_DIR,
} from '../core/constants.js';
import { resolveRuntimePath } from '../runtime/path-resolution.js';

export interface HostedEnvDefaultsOptions {
  cwd?: string;
  moduleUrl?: string;
}

/**
 * Layer hosted defaults on top of the caller env only when the runtime
 * root actually contains the staged `hosted/…` inputs. That is true in
 * the built Mastra bundle (`.mastra/output/hosted/…`) and false in a
 * normal repo checkout, where falling back to `published/current/…`
 * keeps local startup working.
 *
 * Explicit env vars still win when they resolve to real runtime inputs.
 * Stale hosted env vars from older deploys should not strand production
 * when the bundle already contains the staged source and snapshot.
 */
export function applyHostedEnvDefaults(
  env: NodeJS.ProcessEnv,
  options: HostedEnvDefaultsOptions = {},
): NodeJS.ProcessEnv {
  if (!hasHostedStage(options)) {
    return env;
  }

  const overrides: NodeJS.ProcessEnv = {};
  if (shouldUseHostedDefault(env.FPF_SPEC_SOURCE_PATH, options, 'file')) {
    overrides.FPF_SPEC_SOURCE_PATH = HOSTED_STAGED_SOURCE_PATH;
  }
  const artifactDir = defaultHostedArtifactDir(env);
  if (
    shouldUseHostedDefault(env.FPF_RUNTIME_ARTIFACT_DIR, options, 'directory')
    || shouldMoveHostedArtifactsToServerlessTmp(env.FPF_RUNTIME_ARTIFACT_DIR, env)
  ) {
    overrides.FPF_RUNTIME_ARTIFACT_DIR = artifactDir;
  }
  if (
    isVercelRuntime(env)
    && shouldUseArtifactSeedDefault(env.FPF_RUNTIME_ARTIFACT_SEED_DIR, options)
  ) {
    overrides.FPF_RUNTIME_ARTIFACT_SEED_DIR = HOSTED_STAGED_ARTIFACT_DIR;
  }
  if (Object.keys(overrides).length === 0) {
    return env;
  }
  return { ...env, ...overrides };
}

function shouldUseHostedDefault(
  value: string | undefined,
  options: HostedEnvDefaultsOptions,
  kind: 'file' | 'directory',
): boolean {
  const configured = value?.trim();
  if (!configured) {
    return true;
  }
  if (isKnownHostedLegacyPath(configured, kind)) {
    return true;
  }

  return !resolveRuntimePath(configured, {
    cwd: options.cwd,
    moduleUrl: options.moduleUrl,
    kind,
  }).existed;
}

function isKnownHostedLegacyPath(value: string, kind: 'file' | 'directory'): boolean {
  const normalized = normalizeRuntimePath(value);

  if (kind === 'file') {
    return normalized === 'FPF-spec.md' || normalized === '/app/FPF-spec.md';
  }

  return normalized === '.runtime/fpf-index' || normalized === '/app/.runtime/fpf-index';
}

function defaultHostedArtifactDir(env: NodeJS.ProcessEnv): string {
  return isVercelRuntime(env) ? SERVERLESS_ARTIFACT_DIR : HOSTED_STAGED_ARTIFACT_DIR;
}

function shouldMoveHostedArtifactsToServerlessTmp(
  value: string | undefined,
  env: NodeJS.ProcessEnv,
): boolean {
  return isVercelRuntime(env)
    && normalizeRuntimePath(value) === HOSTED_STAGED_ARTIFACT_DIR;
}

function shouldUseArtifactSeedDefault(
  value: string | undefined,
  options: HostedEnvDefaultsOptions,
): boolean {
  const configured = value?.trim();
  if (!configured) {
    return true;
  }

  return !resolveRuntimePath(configured, {
    cwd: options.cwd,
    moduleUrl: options.moduleUrl,
    kind: 'directory',
  }).existed;
}

function isVercelRuntime(env: NodeJS.ProcessEnv): boolean {
  return env.VERCEL === '1';
}

function normalizeRuntimePath(value: string | undefined): string {
  const normalized = value?.trim().replace(/\\/gu, '/').replace(/^\.\//u, '') ?? '';
  return normalized === '/' ? normalized : normalized.replace(/\/+$/u, '');
}

function hasHostedStage(options: HostedEnvDefaultsOptions): boolean {
  const specResolution = resolveRuntimePath(HOSTED_STAGED_SOURCE_PATH, {
    cwd: options.cwd,
    moduleUrl: options.moduleUrl,
    kind: 'file',
  });
  const snapshotResolution = resolveRuntimePath(
    `${HOSTED_STAGED_ARTIFACT_DIR}/${ARTIFACT_FILENAMES.snapshot}`,
    {
      cwd: options.cwd,
      moduleUrl: options.moduleUrl,
      kind: 'file',
    },
  );

  return specResolution.existed && snapshotResolution.existed;
}
