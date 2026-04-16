import { describe, expect, it } from '@rstest/core';

import {
  HOSTED_STAGED_ARTIFACT_DIR,
  HOSTED_STAGED_SOURCE_PATH,
} from '../src/core/constants.js';
import { applyHostedEnvDefaults } from '../src/composition/hosted-env.js';

/**
 * Hosted deploys run inside Mastra Cloud's container. After
 * `bunx mastra build` + `bunx mastra server deploy`, the files staged
 * by `stage-deploy-assets.ts` land at `/app/.mastra/output/hosted/…`.
 * `applyHostedEnvDefaults` wires the runtime to those locations unless
 * the operator has opted in to an explicit override via env.
 */
describe('applyHostedEnvDefaults', () => {
  it('defaults both runtime path env vars to the hosted staged locations', () => {
    const env = applyHostedEnvDefaults({} as NodeJS.ProcessEnv);
    expect(env.FPF_SPEC_SOURCE_PATH).toBe(HOSTED_STAGED_SOURCE_PATH);
    expect(env.FPF_RUNTIME_ARTIFACT_DIR).toBe(HOSTED_STAGED_ARTIFACT_DIR);
  });

  it('leaves explicit env vars untouched', () => {
    const env = applyHostedEnvDefaults({
      FPF_SPEC_SOURCE_PATH: '/custom/path/to/FPF-Spec.md',
      FPF_RUNTIME_ARTIFACT_DIR: '/custom/artifact/dir',
    } as NodeJS.ProcessEnv);
    expect(env.FPF_SPEC_SOURCE_PATH).toBe('/custom/path/to/FPF-Spec.md');
    expect(env.FPF_RUNTIME_ARTIFACT_DIR).toBe('/custom/artifact/dir');
  });

  it('fills only the missing half when the caller sets one of the two vars', () => {
    const env = applyHostedEnvDefaults({
      FPF_SPEC_SOURCE_PATH: '/custom/spec.md',
    } as NodeJS.ProcessEnv);
    expect(env.FPF_SPEC_SOURCE_PATH).toBe('/custom/spec.md');
    expect(env.FPF_RUNTIME_ARTIFACT_DIR).toBe(HOSTED_STAGED_ARTIFACT_DIR);
  });

  it('treats whitespace-only values as unset', () => {
    const env = applyHostedEnvDefaults({
      FPF_SPEC_SOURCE_PATH: '   ',
      FPF_RUNTIME_ARTIFACT_DIR: '',
    } as NodeJS.ProcessEnv);
    expect(env.FPF_SPEC_SOURCE_PATH).toBe(HOSTED_STAGED_SOURCE_PATH);
    expect(env.FPF_RUNTIME_ARTIFACT_DIR).toBe(HOSTED_STAGED_ARTIFACT_DIR);
  });

  it('preserves unrelated env vars', () => {
    const env = applyHostedEnvDefaults({
      SOMETHING_ELSE: 'keep-me',
      FPF_MCP_SURFACE: 'full',
    } as NodeJS.ProcessEnv);
    expect(env.SOMETHING_ELSE).toBe('keep-me');
    expect(env.FPF_MCP_SURFACE).toBe('full');
  });
});
