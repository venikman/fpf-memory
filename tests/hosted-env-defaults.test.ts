import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';

import { parseRuntimeCoreConfig } from '../src/adapters/infra/config/env.js';
import {
  DEFAULT_ARTIFACT_DIR,
  DEFAULT_SOURCE_PATH,
  HOSTED_STAGED_ARTIFACT_DIR,
  HOSTED_STAGED_SOURCE_PATH,
} from '../src/core/constants.js';
import { applyHostedEnvDefaults } from '../src/composition/hosted-env.js';

/**
 * Hosted deploys run from a Mastra bundle whose working directory contains
 * `hosted/FPF-Spec.md` and `hosted/fpf-index/snapshot.json`. Local repo runs
 * do not. `applyHostedEnvDefaults` should only redirect to the hosted staged
 * paths when those files are actually present relative to the runtime root.
 */
describe('applyHostedEnvDefaults', () => {
  let tempRoot: string;

  beforeEach(async () => {
    tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-hosted-env-'));
  });

  afterEach(async () => {
    await rm(tempRoot, { recursive: true, force: true });
  });

  async function writeHostedStage(root: string) {
    await mkdir(resolve(root, HOSTED_STAGED_ARTIFACT_DIR), { recursive: true });
    await writeFile(resolve(root, HOSTED_STAGED_SOURCE_PATH), '# staged spec\n');
    await writeFile(
      resolve(root, HOSTED_STAGED_ARTIFACT_DIR, 'snapshot.json'),
      '{"sourceHash":"sha256:deadbeef"}\n',
    );
  }

  it('falls back to the repo runtime defaults when hosted staged files are absent', () => {
    const runtime = parseRuntimeCoreConfig(
      applyHostedEnvDefaults({} as NodeJS.ProcessEnv, { cwd: tempRoot }),
    );

    expect(runtime.sourcePath).toBe(DEFAULT_SOURCE_PATH);
    expect(runtime.artifactDir).toBe(DEFAULT_ARTIFACT_DIR);
  });

  it('defaults both runtime path env vars to the hosted staged locations when hosted files exist', async () => {
    await writeHostedStage(tempRoot);

    const runtime = parseRuntimeCoreConfig(
      applyHostedEnvDefaults({} as NodeJS.ProcessEnv, { cwd: tempRoot }),
    );

    expect(runtime.sourcePath).toBe(HOSTED_STAGED_SOURCE_PATH);
    expect(runtime.artifactDir).toBe(HOSTED_STAGED_ARTIFACT_DIR);
  });

  it('discovers hosted staged files from the bundle module root when cwd lacks them', async () => {
    const bundleRoot = resolve(tempRoot, '.mastra/output');
    const bundleModulePath = resolve(bundleRoot, 'chunks/runtime.mjs');

    await writeHostedStage(bundleRoot);
    await mkdir(dirname(bundleModulePath), { recursive: true });
    await writeFile(bundleModulePath, '// bundle stub\n');

    const runtime = parseRuntimeCoreConfig(
      applyHostedEnvDefaults(
        {} as NodeJS.ProcessEnv,
        {
          cwd: tempRoot,
          moduleUrl: pathToFileURL(bundleModulePath).href,
        },
      ),
    );

    expect(runtime.sourcePath).toBe(HOSTED_STAGED_SOURCE_PATH);
    expect(runtime.artifactDir).toBe(HOSTED_STAGED_ARTIFACT_DIR);
  });

  it('leaves explicit env vars untouched when hosted files exist', async () => {
    await writeHostedStage(tempRoot);

    const env = applyHostedEnvDefaults({
      FPF_SPEC_SOURCE_PATH: '/custom/path/to/FPF-Spec.md',
      FPF_RUNTIME_ARTIFACT_DIR: '/custom/artifact/dir',
    } as NodeJS.ProcessEnv, { cwd: tempRoot });
    expect(env.FPF_SPEC_SOURCE_PATH).toBe('/custom/path/to/FPF-Spec.md');
    expect(env.FPF_RUNTIME_ARTIFACT_DIR).toBe('/custom/artifact/dir');
  });

  it('fills only the missing half when hosted files exist and the caller sets one of the vars', async () => {
    await writeHostedStage(tempRoot);

    const env = applyHostedEnvDefaults({
      FPF_SPEC_SOURCE_PATH: '/custom/spec.md',
    } as NodeJS.ProcessEnv, { cwd: tempRoot });
    expect(env.FPF_SPEC_SOURCE_PATH).toBe('/custom/spec.md');
    expect(env.FPF_RUNTIME_ARTIFACT_DIR).toBe(HOSTED_STAGED_ARTIFACT_DIR);
  });

  it('treats whitespace-only values as unset when hosted files exist', async () => {
    await writeHostedStage(tempRoot);

    const env = applyHostedEnvDefaults({
      FPF_SPEC_SOURCE_PATH: '   ',
      FPF_RUNTIME_ARTIFACT_DIR: '',
    } as NodeJS.ProcessEnv, { cwd: tempRoot });
    expect(env.FPF_SPEC_SOURCE_PATH).toBe(HOSTED_STAGED_SOURCE_PATH);
    expect(env.FPF_RUNTIME_ARTIFACT_DIR).toBe(HOSTED_STAGED_ARTIFACT_DIR);
  });

  it('preserves unrelated env vars', () => {
    const env = applyHostedEnvDefaults({
      SOMETHING_ELSE: 'keep-me',
      FPF_MCP_SURFACE: 'full',
    } as NodeJS.ProcessEnv, { cwd: tempRoot });
    expect(env.SOMETHING_ELSE).toBe('keep-me');
    expect(env.FPF_MCP_SURFACE).toBe('full');
  });
});
