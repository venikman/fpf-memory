import { readFileSync } from 'node:fs';

import { describe, expect, it } from '@rstest/core';

import { DEFAULT_SYNC_MONITOR_MAX_DRIFT_HOURS } from '../src/build/sync-monitor.js';

/**
 * The freshness SLO is a public promise, so every copy of the number has to
 * agree with the code. It did not: the workflow and the compiled default said
 * 26 while README, .env.example and the published automation playbook said 10.
 * Nothing detected the split because nothing compared them.
 */
describe('freshness SLO is stated consistently', () => {
  const expected = String(DEFAULT_SYNC_MONITOR_MAX_DRIFT_HOURS);

  it('matches in the monitor workflow default', () => {
    const yaml = readFileSync('.github/workflows/fpf-sync-monitor.yml', 'utf8');
    const found = [...yaml.matchAll(/max_drift_hours\s*\|\|\s*'(\d+)'/gu)].map((m) => m[1]);
    expect(found.length).toBeGreaterThan(0);
    expect([...new Set(found)]).toEqual([expected]);
  });

  it('matches in .env.example', () => {
    const env = readFileSync('.env.example', 'utf8');
    const match = /^FPF_SYNC_MONITOR_MAX_DRIFT_HOURS=(\d+)$/mu.exec(env);
    expect(match?.[1]).toBe(expected);
  });

  it('matches in the README env table', () => {
    const readme = readFileSync('README.md', 'utf8');
    const row = readme
      .split('\n')
      .find((line) => line.includes('`FPF_SYNC_MONITOR_MAX_DRIFT_HOURS`'));
    expect(row).toBeDefined();
    expect(/\|\s*`(\d+)`\s*\|/u.exec(row ?? '')?.[1]).toBe(expected);
  });

  it('matches in the published automation playbook', () => {
    const playbook = readFileSync('docs/automation-playbook.md', 'utf8');
    const match = /default drift SLO is (\d+)\s*hours?/u.exec(playbook);
    expect(match?.[1]).toBe(expected);
  });

  it('matches the acceptance criterion in the roadmap promise clause', () => {
    // ROADMAP.md states the promise as an explicit FPF A.2.3 clause. Its
    // acceptance criterion is the same number the code enforces, or the
    // published promise and the gate have quietly diverged again.
    const roadmap = readFileSync('ROADMAP.md', 'utf8');
    const row = roadmap.split('\n').find((line) => line.includes('Acceptance criterion'));
    expect(row).toBeDefined();
    expect(/≤\s*(\d+)h/u.exec(row ?? '')?.[1]).toBe(expected);
  });
});
