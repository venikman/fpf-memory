import { expect, test } from 'bun:test';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import type { CandidateReport, GoldCase } from './types.js';

const gold = JSON.parse(readFileSync(path.resolve(import.meta.dir, '../gold/dev.json'), 'utf8')) as GoldCase[];
const target = gold.find((entry, index) => index % 7 !== 0 && entry.expectedIds.length > 0)!;

test('default reports for dev, test, and all preserve archived results', async () => {
  const directory = mkdtempSync(path.join(tmpdir(), 'fpf-default-reports-'));
  const experiment = path.join(directory, 'experiments/retrieval-bakeoff');
  const harness = path.join(experiment, 'harness');
  try {
    // Run the real CLI in an isolated checkout layout so a regression cannot
    // overwrite this repository's historical evidence or existing local runs.
    cpSync(import.meta.dir, harness, { recursive: true });
    cpSync(path.resolve(import.meta.dir, '../gold'), path.join(experiment, 'gold'), { recursive: true });
    const snapshotDirectory = path.join(directory, 'published/current/fpf-index');
    mkdirSync(snapshotDirectory, { recursive: true });
    symlinkSync(
      path.resolve(import.meta.dir, '../../../published/current/fpf-index/snapshot.json'),
      path.join(snapshotDirectory, 'snapshot.json'),
    );
    const archive = path.join(experiment, 'results/dev-latest.json');
    mkdirSync(path.dirname(archive), { recursive: true });
    const archivedBytes = readFileSync(path.resolve(import.meta.dir, '../results/dev-latest.json'));
    writeFileSync(archive, archivedBytes);
    const factory = path.join(directory, 'fixture.ts');
    writeFileSync(factory, `
      export default class Fixture {
        name = 'default-output-fixture';
        build(docs) { return { buildMs: 1, docCount: docs.length }; }
        query() { return []; }
      }
    `);
    for (const goldSet of ['dev', 'test', 'all']) {
      const child = Bun.spawn([
        process.execPath, path.join(harness, 'run.ts'),
        '--gold', goldSet, '--factory', factory, '--quiet',
      ], { stdout: 'pipe', stderr: 'pipe' });
      const [exitCode, stdout, stderr] = await Promise.all([
        child.exited, new Response(child.stdout).text(), new Response(child.stderr).text(),
      ]);
      expect({ exitCode, diagnostics: exitCode === 0 ? '' : stdout + stderr }).toEqual({ exitCode: 0, diagnostics: '' });
      expect(readFileSync(archive)).toEqual(archivedBytes);
      const output = path.join(experiment, '.cache/runs', `${goldSet}-latest.json`);
      const packet = JSON.parse(readFileSync(output, 'utf8')) as { goldSet: string; reports: CandidateReport[] };
      expect(packet.goldSet).toBe(goldSet);
      expect(packet.reports[0]!.cases.length).toBe(goldSet === 'all' ? 300 : 150);
      expect(stdout).toContain(`report: .cache/runs/${goldSet}-latest.json`);
    }
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}, 60_000);

for (const { changesOnRepeat, goldSet } of [
  { changesOnRepeat: false, goldSet: 'dev' },
  { changesOnRepeat: true, goldSet: 'dev' },
  { changesOnRepeat: false, goldSet: 'all' },
]) {
  test(`runner checks every case for repeatability (${goldSet}, changing=${changesOnRepeat})`, async () => {
    const directory = mkdtempSync(path.join(tmpdir(), 'fpf-repeatability-'));
    try {
      const factory = path.join(directory, 'fixture.ts');
      const counts = path.join(directory, 'calls.json');
      const output = path.join(directory, 'report.json');
      writeFileSync(factory, `
        import { writeFileSync } from 'node:fs';
        export default class Fixture {
          name = 'repeatability-fixture';
          calls = 0;
          targetCalls = 0;
          build(docs) { return { buildMs: 1, docCount: docs.length }; }
          query(question) {
            this.calls++;
            writeFileSync(${JSON.stringify(counts)}, JSON.stringify(this.calls));
            if (question !== ${JSON.stringify(target.question)}) return [];
            this.targetCalls++;
            if (${changesOnRepeat} && this.targetCalls > 1) return [];
            return [{ id: ${JSON.stringify(target.expectedIds[0])}, score: 1 }];
          }
        }
      `);
      const child = Bun.spawn([
        process.execPath, path.join(import.meta.dir, 'run.ts'),
        '--gold', goldSet, '--factory', factory, '--out', output, '--quiet',
      ], { stdout: 'pipe', stderr: 'pipe' });
      const [exitCode, stdout, stderr] = await Promise.all([
        child.exited, new Response(child.stdout).text(), new Response(child.stderr).text(),
      ]);
      expect({ exitCode, diagnostics: exitCode === 0 ? '' : stdout + stderr }).toEqual({ exitCode: 0, diagnostics: '' });
      const packet = JSON.parse(readFileSync(output, 'utf8')) as { reports: CandidateReport[] };
      const cases = packet.reports[0]!.cases;
      const targetId = goldSet === 'all' ? `dev:${target.id}` : target.id;
      expect(cases.find((entry) => entry.caseId === targetId)!.rank).toBe(1);
      expect(packet.reports[0]!.deterministic).toBe(!changesOnRepeat);
      const testGold = goldSet === 'all'
        ? JSON.parse(readFileSync(path.resolve(import.meta.dir, '../gold/test.json'), 'utf8')) as GoldCase[]
        : [];
      expect(cases.length).toBe(gold.length + testGold.length);
      expect(new Set(cases.map((entry) => entry.caseId)).size).toBe(cases.length);
      if (goldSet === 'all') {
        expect(cases.map((entry) => entry.caseId)).toEqual([
          ...gold.map((entry) => `dev:${entry.id}`), ...testGold.map((entry) => `test:${entry.id}`),
        ]);
        const combinedGold = new Map<string, GoldCase>([
          ...gold.map((entry) => [`dev:${entry.id}`, entry] as const),
          ...testGold.map((entry) => [`test:${entry.id}`, entry] as const),
        ]);
        const misses = cases.filter((entry) => entry.rank === null && combinedGold.get(entry.caseId)!.expectedIds.length > 0);
        const analyze = async (args: string[]) => {
          const analyzerChild = Bun.spawn([
            process.execPath, path.join(import.meta.dir, 'analyze.ts'), output, ...args,
          ], { stdout: 'pipe', stderr: 'pipe' });
          const [exitCode, stdout, stderr] = await Promise.all([
            analyzerChild.exited, new Response(analyzerChild.stdout).text(), new Response(analyzerChild.stderr).text(),
          ]);
          expect({ exitCode, diagnostics: exitCode === 0 ? '' : stderr }).toEqual({ exitCode: 0, diagnostics: '' });
          return stdout;
        };
        const summary = await analyze([]);
        expect(summary).toContain(`— ${misses.length} miss(es) beyond rank 5`);
        expect(misses.length).toBeGreaterThan(0);
        for (const entry of misses) expect(summary).toContain(`${entry.caseId} rank=`);
        packet.reports.push({
          ...packet.reports[0]!, name: 'all-hits-fixture',
          cases: cases.map((entry) => ({
            ...entry, rank: combinedGold.get(entry.caseId)!.expectedIds.length ? 1 : null,
          })),
        });
        writeFileSync(output, JSON.stringify(packet));
        const differences = await analyze(['--diff', 'repeatability-fixture,all-hits-fixture']);
        for (const entry of misses) expect(differences).toContain(`${entry.caseId}:`);
      }
      expect(JSON.parse(readFileSync(counts, 'utf8'))).toBe(cases.length * 2);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  }, 60_000);
}
