import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import {
  ARTIFACT_FILENAMES,
  HOSTED_STAGED_ARTIFACT_DIR,
  HOSTED_STAGED_SOURCE_PATH,
} from '../core/constants.js';

/**
 * Layer hosted defaults on top of the caller env only when the runtime
 * root actually contains the staged `hosted/…` inputs. That is true in
 * the built Mastra bundle (`.mastra/output/hosted/…`) and false in a
 * normal repo checkout, where falling back to `published/current/…`
 * keeps local startup working.
 *
 * Explicit env vars still win — Mastra Cloud / local overrides pass
 * through untouched.
 */
export function applyHostedEnvDefaults(
  env: NodeJS.ProcessEnv,
  options: { cwd?: string } = {},
): NodeJS.ProcessEnv {
  if (!hasHostedStage(options.cwd ?? process.cwd())) {
    return env;
  }

  const overrides: NodeJS.ProcessEnv = {};
  if (!env.FPF_SPEC_SOURCE_PATH || env.FPF_SPEC_SOURCE_PATH.trim() === '') {
    overrides.FPF_SPEC_SOURCE_PATH = HOSTED_STAGED_SOURCE_PATH;
  }
  if (!env.FPF_RUNTIME_ARTIFACT_DIR || env.FPF_RUNTIME_ARTIFACT_DIR.trim() === '') {
    overrides.FPF_RUNTIME_ARTIFACT_DIR = HOSTED_STAGED_ARTIFACT_DIR;
  }
  if (Object.keys(overrides).length === 0) {
    return env;
  }
  return { ...env, ...overrides };
}

function hasHostedStage(cwd: string): boolean {
  return existsSync(resolve(cwd, HOSTED_STAGED_SOURCE_PATH))
    && existsSync(resolve(cwd, HOSTED_STAGED_ARTIFACT_DIR, ARTIFACT_FILENAMES.snapshot));
}
