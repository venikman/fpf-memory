import {
  ARTIFACT_FILENAMES,
  HOSTED_STAGED_ARTIFACT_DIR,
  HOSTED_STAGED_SOURCE_PATH,
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
  if (shouldUseHostedDefault(env.FPF_RUNTIME_ARTIFACT_DIR, options, 'directory')) {
    overrides.FPF_RUNTIME_ARTIFACT_DIR = HOSTED_STAGED_ARTIFACT_DIR;
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
  const normalized = value.replace(/\\/gu, '/').replace(/^\.\//u, '');

  if (kind === 'file') {
    return normalized === 'FPF-spec.md' || normalized === '/app/FPF-spec.md';
  }

  return normalized === '.runtime/fpf-index' || normalized === '/app/.runtime/fpf-index';
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
