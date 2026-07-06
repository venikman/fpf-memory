import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';
import { compileFpfSource } from '../src/runtime/compiler.js';

/**
 * Lexicon hygiene guard.
 *
 * `shouldIndexLexeme` (src/runtime/index-projector.ts) drops compiler
 * artifacts the source parser mis-files as vocabulary — bare notation,
 * punctuation-led fragments, and prose/multi-sentence blocks. Those "hard"
 * artifacts pollute retrieval (each becomes a searchable node + inherited
 * aliases). This test compiles the committed spec and asserts none survive,
 * so a future compiler change can't silently reintroduce the ~29% floor that
 * tools/lexicon-audit measured on the 2026-07-03 snapshot.
 */
describe('lexicon hygiene', () => {
  it('emits no hard-artifact lexemes from the committed spec', async () => {
    const sourcePath = resolve(process.cwd(), DEFAULT_SOURCE_PATH);
    const sourceText = await readFile(sourcePath, 'utf8');
    const sourceHash = `sha256:${createHash('sha256').update(sourceText).digest('hex')}`;
    const { snapshot } = compileFpfSource({
      sourcePath,
      sourceHash,
      builtAt: 'hygiene-check',
      sourceText,
    });

    const canonicals = Object.values(snapshot.lexicon).map((entry) => entry.canonical);

    // Sanity: the filter must not collapse the catalog. The 07-03 spec keeps
    // ~6.4k lexemes after filtering; a floor well below that means over-drop.
    expect(canonicals.length).toBeGreaterThan(4000);

    const offenders = canonicals.filter((canonical) => {
      const trimmed = canonical.trim();
      if (!/[A-Za-z]/.test(trimmed)) return true; // no Latin letter
      if (!/^[\p{L}\p{N}]/u.test(trimmed)) return true; // punctuation-led
      const words = trimmed.split(/\s+/).filter(Boolean);
      if (trimmed.length > 120 || words.length > 12) return true; // prose block
      if (words.length > 10 && /[.:;]\s+\S/.test(trimmed)) return true;
      return false;
    });

    expect(offenders).toEqual([]);
  });
});
