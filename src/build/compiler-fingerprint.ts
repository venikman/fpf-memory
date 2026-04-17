import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

/**
 * Files that directly determine the persisted snapshot semantics. Changes in
 * this set must force `published/current/**` to be republished even when the
 * upstream spec text is unchanged.
 */
export const SNAPSHOT_COMPILER_FINGERPRINT_INPUTS = [
  'src/core/constants.ts',
  'src/runtime/compiler.ts',
  'src/runtime/source-parser.ts',
  'src/runtime/graph-compiler.ts',
  'src/runtime/index-projector.ts',
  'src/runtime/validation-runner.ts',
  'src/runtime/text.ts',
] as const;

export async function computeCompilerFingerprint(
  options: { cwd?: string } = {},
): Promise<string> {
  const cwd = resolve(options.cwd ?? process.cwd());
  const hash = createHash('sha256');

  for (const relativePath of SNAPSHOT_COMPILER_FINGERPRINT_INPUTS) {
    const absolutePath = resolve(cwd, relativePath);
    const bytes = await readFile(absolutePath);
    hash.update(relativePath);
    hash.update('\0');
    hash.update(bytes);
    hash.update('\0');
  }

  return `sha256:${hash.digest('hex')}`;
}
