import { expect, test } from 'bun:test';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { loadCorpus } from './corpus.js';

const sourceHash = 'sha256:unchanged-source';

function fixture() {
  const directory = mkdtempSync(path.join(tmpdir(), 'fpf-corpus-'));
  const snapshotPath = path.join(directory, 'snapshot.json');
  const cacheDir = path.join(directory, 'cache');
  return {
    snapshotPath, cacheDir,
    write(ids: string[], metadata: Record<string, unknown> = { compilerFingerprint: 'compiler-a' }) {
      writeFileSync(snapshotPath, JSON.stringify({
        sourceHash, ...metadata,
        compiledNodes: Object.fromEntries(ids.map((id) => [id, { id, kind: 'pattern', title: id }])),
      }));
    },
    dispose() { rmSync(directory, { recursive: true, force: true }); },
  };
}

test('compiler changes invalidate a cache for unchanged source bytes', async () => {
  const f = fixture();
  try {
    f.write(['old-projection']);
    expect((await loadCorpus(f)).docs.map(({ id }) => id)).toEqual(['old-projection']);
    expect(readdirSync(f.cacheDir)).toHaveLength(1);
    f.write(['new-projection'], { compilerFingerprint: 'compiler-b' });
    expect((await loadCorpus(f)).docs.map(({ id }) => id)).toEqual(['new-projection']);
    expect(readdirSync(f.cacheDir)).toHaveLength(2);
    expect((await loadCorpus(f)).docs.map(({ id }) => id)).toEqual(['new-projection']);
  } finally { f.dispose(); }
});

test('legacy source-only cache cannot supply the current projection', async () => {
  const f = fixture();
  try {
    f.write(['current-projection']);
    mkdirSync(f.cacheDir);
    const oldKey = createHash('sha256').update(sourceHash).digest('hex').slice(0, 16);
    writeFileSync(path.join(f.cacheDir, `corpus-${oldKey}.json`), JSON.stringify({
      sourceHash, docs: [{ id: 'legacy-projection', kind: 'pattern', title: 'legacy', aliases: [], text: '', neighbors: [] }],
    }));
    expect((await loadCorpus(f)).docs.map(({ id }) => id)).toEqual(['current-projection']);
  } finally { f.dispose(); }
});

test('corpus IDs use locale-independent lexical ordering', async () => {
  const f = fixture();
  try {
    f.write(['a.2', 'a', '_', 'Z', 'a.10']);
    const expected = ['Z', '_', 'a', 'a.10', 'a.2'];
    expect((await loadCorpus(f)).docs.map(({ id }) => id)).toEqual(expected);
    expect((await loadCorpus(f)).docs.map(({ id }) => id)).toEqual(expected);
  } finally { f.dispose(); }
});

for (const metadata of [{}, { padding: 'x'.repeat(4096), compilerFingerprint: 'compiler-a' }]) {
  test(`skip caching when compiler identity is absent from bounded header (padded=${'padding' in metadata})`, async () => {
    const f = fixture();
    try {
      f.write(['first'], metadata);
      expect((await loadCorpus(f)).docs.map(({ id }) => id)).toEqual(['first']);
      expect(existsSync(f.cacheDir)).toBe(false);
      f.write(['second'], metadata);
      expect((await loadCorpus(f)).docs.map(({ id }) => id)).toEqual(['second']);
    } finally { f.dispose(); }
  });
}
