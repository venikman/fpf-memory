import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';
import {
  buildSearchIdRegistry,
  renderSearchIdRegistryModule,
} from '../src/core/documents.js';
import { compileFpfSource } from '../src/runtime/compiler.js';

/**
 * R5-P1-005 drift guard.
 *
 * `src/docs/generated-search-id-registry.ts` is generated from the
 * committed FPF spec snapshot at config-load time and at
 * `bun run docs:generate`. The committed file is the source of truth at
 * build time so:
 *   - dev workflows don't need to run docs:generate before tests
 *   - rspress.config.ts can write idempotently (no working-tree churn)
 *
 * This test ensures the committed file stays in sync with the spec.
 * If someone updates `published/current/FPF-Spec.md` without
 * regenerating the registry, this fires and tells them to run
 * `bun run docs:generate`.
 */

describe('search-id registry drift', () => {
  it('the committed registry matches what build would produce from the current spec', async () => {
    const sourcePath = resolve(process.cwd(), DEFAULT_SOURCE_PATH);
    const sourceText = await readFile(sourcePath, 'utf8');
    const sourceHash = `sha256:${createHash('sha256').update(sourceText).digest('hex')}`;
    const { snapshot } = compileFpfSource({
      sourcePath,
      sourceHash,
      builtAt: 'drift-check',
      sourceText,
    });

    const expected = renderSearchIdRegistryModule(buildSearchIdRegistry(snapshot));
    const committed = await readFile(
      resolve(process.cwd(), 'src/docs/generated-search-id-registry.ts'),
      'utf8',
    );

    if (committed !== expected) {
      throw new Error(
        'src/docs/generated-search-id-registry.ts is stale versus the current FPF spec. ' +
          'Run `bun run docs:generate` (or `bun run docs:build`) to refresh it, then commit.',
      );
    }
    expect(committed).toBe(expected);
  });
});
