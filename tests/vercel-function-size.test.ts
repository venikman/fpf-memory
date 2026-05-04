import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';

import {
  formatBundleBudgetResult,
  measureBundleBudget,
  parseBundleBudgetArgs,
} from '../scripts/check-vercel-function-size.js';

describe('Vercel function bundle size budget', () => {
  let tempRoot: string;
  let functionDir: string;

  beforeEach(async () => {
    tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-vercel-function-size-'));
    functionDir = resolve(tempRoot, '.vercel/output/functions/index.func');
    await mkdir(resolve(functionDir, 'nested'), { recursive: true });
  });

  afterEach(async () => {
    await rm(tempRoot, { recursive: true, force: true });
  });

  it('parses CLI options over environment defaults', () => {
    const options = parseBundleBudgetArgs(
      ['--path', 'custom.func', '--warn-mb=10', '--fail-mb', '12.5'],
      {
        VERCEL_FUNCTION_BUNDLE_PATH: 'env.func',
        VERCEL_FUNCTION_WARN_MB: '9',
        VERCEL_FUNCTION_FAIL_MB: '11',
      },
    );

    expect(options).toEqual({
      functionPath: 'custom.func',
      warnBytes: 10_000_000,
      failBytes: 12_500_000,
    });
  });

  it('measures nested bundle files and classifies pass, warn, and fail states', async () => {
    await writeFile(resolve(functionDir, 'index.js'), 'x'.repeat(7));
    await writeFile(resolve(functionDir, 'nested/chunk.js'), 'y'.repeat(5));

    await expect(
      measureBundleBudget(
        {
          functionPath: '.vercel/output/functions/index.func',
          warnBytes: 20,
          failBytes: 30,
        },
        tempRoot,
      ),
    ).resolves.toMatchObject({
      sizeBytes: 12,
      status: 'pass',
    });

    await expect(
      measureBundleBudget(
        {
          functionPath: '.vercel/output/functions/index.func',
          warnBytes: 10,
          failBytes: 30,
        },
        tempRoot,
      ),
    ).resolves.toMatchObject({
      sizeBytes: 12,
      status: 'warn',
    });

    await expect(
      measureBundleBudget(
        {
          functionPath: '.vercel/output/functions/index.func',
          warnBytes: 10,
          failBytes: 12,
        },
        tempRoot,
      ),
    ).resolves.toMatchObject({
      sizeBytes: 12,
      status: 'fail',
    });
  });

  it('formats budget output with the configured thresholds', () => {
    expect(
      formatBundleBudgetResult({
        functionPath: '.vercel/output/functions/index.func',
        sizeBytes: 236_000_000,
        sizeMb: 236,
        warnMb: 235,
        failMb: 240,
        status: 'warn',
      }),
    ).toContain('WARN: bundle exceeds the configured warning threshold.');
    expect(
      formatBundleBudgetResult({
        functionPath: '.vercel/output/functions/index.func',
        sizeBytes: 236_000_000,
        sizeMb: 236,
        warnMb: 235,
        failMb: 240,
        status: 'warn',
      }),
    ).toContain('Fail-threshold headroom 4 MB.');
  });
});
