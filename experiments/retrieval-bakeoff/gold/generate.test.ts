import { expect, test } from 'bun:test';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import type { GoldCase } from '../harness/types.js';

for (const scenario of [
  { split: 'dev', patterns: 140, lexemes: 34 },
  { split: 'test', patterns: 140, lexemes: 34 },
  { split: 'dev', patterns: 0, lexemes: 0, incomplete: 'dev' },
  { split: 'test', patterns: 0, lexemes: 0, incomplete: 'dev' },
  { split: 'test', patterns: 70, lexemes: 17, incomplete: 'test' },
]) {
  test(`generator ${scenario.split} CLI checks completeness (${scenario.patterns} patterns)`, async () => {
    const directory = mkdtempSync(path.join(tmpdir(), 'fpf-gold-completeness-'));
    try {
      const experiment = path.join(directory, 'experiments/retrieval-bakeoff');
      mkdirSync(path.join(experiment, 'gold'), { recursive: true });
      cpSync(path.join(import.meta.dir, 'generate.ts'), path.join(experiment, 'gold/generate.ts'));
      cpSync(path.resolve(import.meta.dir, '../harness'), path.join(experiment, 'harness'), { recursive: true });
      const nodes: Record<string, unknown> = {};
      for (let i = 0; i < scenario.patterns; i++) {
        const id = `fixture-pattern-${i}`;
        nodes[id] = {
          id, kind: 'pattern', title: `Fixture pattern ${i}`, part: 'Part A - fixture',
          aliases: [`AlternateFixture${i}`],
          neighborEdges: [{ from: id, to: 'fixture-pattern-0', relation: 'builds_on' }],
        };
      }
      for (let i = 0; i < scenario.lexemes; i++) {
        const id = `fixture-lexeme-${i}`;
        const suffix = String.fromCharCode(97 + Math.floor(i / 26), 97 + i % 26);
        nodes[id] = {
          id, kind: 'lexeme', title: `Fixture concept${suffix}`,
          neighborEdges: [{ from: id, to: 'fixture-pattern-0', relation: 'defines' }],
        };
      }
      const snapshotPath = path.join(directory, 'published/current/fpf-index/snapshot.json');
      mkdirSync(path.dirname(snapshotPath), { recursive: true });
      writeFileSync(snapshotPath, JSON.stringify({
        sourceHash: 'fixture-source', compilerFingerprint: 'fixture-compiler', compiledNodes: nodes,
      }));
      const output = path.join(directory, 'existing-output.json');
      const previous = 'preserve existing output\n';
      writeFileSync(output, previous);
      const child = Bun.spawn([
        process.execPath, path.join(experiment, 'gold/generate.ts'),
        '--split', scenario.split, '--seed', '20260831', '--out', output,
      ], { stdout: 'pipe', stderr: 'pipe' });
      const [exitCode, stdout, stderr] = await Promise.all([
        child.exited, new Response(child.stdout).text(), new Response(child.stderr).text(),
      ]);
      if (scenario.incomplete) {
        expect(exitCode).not.toBe(0);
        expect(stderr).toContain(`Incomplete generated ${scenario.incomplete} split: expected 110 cases`);
        expect(stderr).toContain('id-lookup: expected 17, got');
        expect(stderr).toContain('definition: expected 17, got');
        expect(stdout).toBe('');
        expect(readFileSync(output, 'utf8')).toBe(previous);
      } else {
        expect({ exitCode, diagnostics: exitCode === 0 ? '' : stdout + stderr }).toEqual({ exitCode: 0, diagnostics: '' });
        const cases = JSON.parse(readFileSync(output, 'utf8')) as GoldCase[];
        expect(cases).toHaveLength(110);
        const counts: Record<string, number> = {};
        for (const entry of cases) counts[entry.category] = (counts[entry.category] ?? 0) + 1;
        expect(counts).toEqual({
          'id-lookup': 17, title: 17, alias: 16, typo: 17,
          definition: 17, 'multi-hop': 16, negative: 10,
        });
      }
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  }, 60_000);
}
