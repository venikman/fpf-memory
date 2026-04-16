import {
  HOSTED_STAGED_ARTIFACT_DIR,
  HOSTED_STAGED_SOURCE_PATH,
} from '../core/constants.js';

/**
 * Layer hosted defaults on top of the caller env so the runtime finds
 * the spec + pre-compiled snapshot that `stage-deploy-assets.ts` put
 * inside `src/mastra/public/hosted/…`. After `bunx mastra build`
 * + `bunx mastra server deploy`, those files land at
 * `/app/.mastra/output/hosted/FPF-Spec.md` and
 * `/app/.mastra/output/hosted/fpf-index/snapshot.json` in the
 * container. Defaulting the runtime path env vars here means the
 * container boots with a warm snapshot (first tool call ~1-2 s)
 * rather than doing a 16-18 s full compile on cold start.
 *
 * Explicit env vars still win — Mastra Cloud / local overrides pass
 * through untouched.
 */
export function applyHostedEnvDefaults(env: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
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
