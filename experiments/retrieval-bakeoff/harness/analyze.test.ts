import { expect, test } from 'bun:test';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

function fixture() {
  const directory = mkdtempSync(path.join(tmpdir(), 'fpf-analysis-'));
  const experiment = path.join(directory, 'experiments/retrieval-bakeoff');
  const harness = path.join(experiment, 'harness');
  const snapshotDir = path.join(directory, 'published/current/fpf-index');
  mkdirSync(harness, { recursive: true });
  mkdirSync(path.join(experiment, 'gold'));
  mkdirSync(snapshotDir, { recursive: true });
  for (const file of ['analyze.ts', 'corpus.ts', 'gold.ts', 'run.ts', 'metrics.ts', 'registry.ts', 'types.ts']) {
    copyFileSync(path.join(import.meta.dir, file), path.join(harness, file));
  }
  const sourceHash = 'sha256:analysis-fixture';
  writeFileSync(path.join(snapshotDir, 'snapshot.json'), JSON.stringify({
    sourceHash, compilerFingerprint: 'compiler-fixture', compiledNodes: {
      'A.1': { id: 'A.1', kind: 'pattern', title: 'Alpha' },
      'A.2': { id: 'A.2', kind: 'pattern', title: 'Beta' },
    },
  }));
  writeFileSync(path.join(experiment, 'gold/dev.json'), JSON.stringify([
    { id: 'hit', question: 'Explain Alpha', expectedIds: ['A.1'], category: 'definition', source: 'generated' },
    { id: 'miss', question: 'Explain Beta', expectedIds: ['A.2'], category: 'definition', source: 'generated' },
  ]));
  const reportPath = path.join(directory, 'report.json');
  const packet = { sourceHash, goldSet: 'dev', reports: [{ name: 'fixture', goldSet: 'dev', cases: [
    { caseId: 'hit', category: 'definition', rank: 1 as number | null, latencyMs: 1, topIds: ['A.1'] },
    { caseId: 'miss', category: 'definition', rank: null as number | null, latencyMs: 1, topIds: [] as string[] },
  ] }] };
  return {
    directory, harness, reportPath, packet,
    async analyze(args: string[] = []) {
      writeFileSync(reportPath, JSON.stringify(packet));
      return run(path.join(harness, 'analyze.ts'), [reportPath, ...args]);
    },
    dispose() { rmSync(directory, { recursive: true, force: true }); },
  };
}

async function run(script: string, args: string[]) {
  const child = Bun.spawn([process.execPath, script, ...args], { stdout: 'pipe', stderr: 'pipe' });
  const [exitCode, stdout, stderr] = await Promise.all([
    child.exited, new Response(child.stdout).text(), new Response(child.stderr).text(),
  ]);
  return { exitCode, stdout, stderr };
}

test('valid matching report still produces its actual misses', async () => {
  const f = fixture();
  try {
    const result = await f.analyze(['--candidate', 'fixture']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('fixture — 1 miss(es) beyond rank 5');
    expect(result.stdout).toContain('miss rank=∅');
    expect(result.stdout).toContain('A.2 (Beta)');
    expect(result.stdout).not.toContain('hit rank=');
  } finally { f.dispose(); }
});

for (const [problem, diagnostic] of Object.entries({
  source: 'report sourceHash',
  'unknown case': 'unknown gold case',
  'duplicate case': 'duplicate case',
  'incomplete cases': 'incomplete cases',
  'gold set': 'goldSet does not match',
  'empty reports': 'at least one candidate report',
  'unknown candidate': 'candidate not found',
})) {
  test(`analyzer rejects ${problem} before printing any miss summary`, async () => {
    const f = fixture();
    try {
      if (problem === 'source') f.packet.sourceHash = 'sha256:different-corpus';
      if (problem === 'unknown case') f.packet.reports[0]!.cases[1]!.caseId = 'unknown';
      if (problem === 'duplicate case') f.packet.reports[0]!.cases[1]!.caseId = 'hit';
      if (problem === 'incomplete cases') f.packet.reports[0]!.cases.pop();
      if (problem === 'gold set') f.packet.reports[0]!.goldSet = 'test';
      if (problem === 'empty reports') f.packet.reports = [];
      const result = await f.analyze(problem === 'unknown candidate' ? ['--candidate', 'missing'] : []);
      expect(result.exitCode).not.toBe(0);
      expect(result.stderr).toContain(diagnostic);
      expect(result.stdout).not.toContain('miss(es)');
    } finally { f.dispose(); }
  });
}

test('--gold all rejects a missing test split instead of writing a partial report', async () => {
  const f = fixture();
  try {
    const factory = path.join(f.directory, 'candidate.ts');
    writeFileSync(factory, `export default class { name = 'fixture'; build(docs) { return {buildMs:1,docCount:docs.length}; } query() { return []; } }`);
    const result = await run(path.join(f.harness, 'run.ts'), [
      '--gold', 'all', '--factory', factory, '--out', f.reportPath, '--quiet',
    ]);
    expect(result.exitCode).not.toBe(0);
    expect(result.stderr).toContain('gold set not found:');
    expect(result.stderr).toContain('test.json');
    expect(existsSync(f.reportPath)).toBe(false);
  } finally { f.dispose(); }
});
