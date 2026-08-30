import { readFileSync, readdirSync } from 'node:fs';

import { describe, expect, it } from '@rstest/core';

/**
 * GitHub disables every scheduled workflow in a public repository after 60
 * days without repository activity, which would silence the sync worker and
 * all monitors at once — including the alarms. workflow-keepalive.yml is the
 * guard against that, so its own structural invariants must not drift: a
 * keepalive that runs too rarely, skips a state, touches main, or grows a
 * toolchain dependency fails exactly when it is finally needed.
 */
describe('workflow keepalive guards the scheduled fleet', () => {
  const keepalivePath = '.github/workflows/workflow-keepalive.yml';
  const yaml = readFileSync(keepalivePath, 'utf8');

  it('is itself scheduled at least weekly', () => {
    const crons = [...yaml.matchAll(/-\s*cron:\s*'([^']+)'/gu)].map((m) => m[1] ?? '');
    expect(crons).toHaveLength(1);
    const fields = (crons[0] ?? '').trim().split(/\s+/u);
    expect(fields).toHaveLength(5);
    // At-least-weekly means: any day-of-month, any month, and a day-of-week
    // that is either unrestricted (daily) or a single fixed day (weekly).
    expect(fields[2]).toBe('*');
    expect(fields[3]).toBe('*');
    expect(fields[4]).toMatch(/^(\*|\d)$/u);
  });

  it('keeps the quiet-threshold plus two missed weekly slots under the 60-day cliff', () => {
    const match = /KEEPALIVE_MAX_QUIET_DAYS:\s*'(\d+)'/u.exec(yaml);
    const quietDays = Number(match?.[1]);
    expect(Number.isFinite(quietDays)).toBe(true);
    expect(quietDays + 14).toBeLessThanOrEqual(60);
    // A very low threshold would push marker commits during normal
    // operation, turning the fallback into noise.
    expect(quietDays).toBeGreaterThanOrEqual(30);
  });

  it('has the permission each leg needs', () => {
    expect(yaml).toMatch(/^\s*actions: write$/mu);
    expect(yaml).toMatch(/^\s*contents: write$/mu);
    expect(yaml).toMatch(/^\s*issues: write$/mu);
  });

  it('re-enables exactly the auto-disable states and spares deliberate disables', () => {
    expect(yaml).toContain('select(.state == "active" or .state == "disabled_inactivity")');
    expect(yaml).not.toContain('"disabled_manually"');
  });

  it('filters to real workflow files so dynamic agent pseudo-workflows are not touched', () => {
    expect(yaml).toContain('select(.path | startswith(".github/workflows/"))');
  });

  it('paginates the workflow enumeration', () => {
    expect(yaml).toContain('--paginate');
  });

  it('pushes its marker to a dedicated branch, never main', () => {
    const branch = /KEEPALIVE_BRANCH:\s*(\S+)/u.exec(yaml)?.[1];
    expect(branch).toBeDefined();
    expect(branch).not.toBe('main');
    // The contents PUT must target that branch variable, not a literal.
    expect(yaml).toContain('-f branch="$KEEPALIVE_BRANCH"');
  });

  it('stays self-contained: no checkout, no package install, no bun', () => {
    // The keepalive must survive states that break every other workflow
    // (bad lockfile, registry outage, broken checkout) — gh + jq only.
    expect(yaml).not.toContain('actions/checkout');
    expect(yaml).not.toContain('setup-bun');
    expect(yaml).not.toContain('bun install');
  });

  it('enumerates the fleet dynamically instead of hardcoding workflow files', () => {
    // A static list would silently rot as workflows are added or renamed.
    const others = readdirSync('.github/workflows')
      .filter((file) => file.endsWith('.yml') && file !== 'workflow-keepalive.yml');
    expect(others.length).toBeGreaterThan(0);
    for (const file of others) {
      expect(yaml).not.toContain(file);
    }
  });

  it('escalates its own failure to an issue', () => {
    expect(yaml).toContain('if: failure()');
    expect(yaml).toContain('gh issue create');
  });

  it('keeps the escalation reachable and honest', () => {
    // A hung API call must fail its step, not eat the job timeout — a job
    // cancellation would take the failure-issue step down with it.
    const stepTimeouts = [...yaml.matchAll(/^ {8}timeout-minutes: (\d+)$/gmu)]
      .map((m) => Number(m[1]));
    const jobTimeout = Number(/^ {4}timeout-minutes: (\d+)$/mu.exec(yaml)?.[1]);
    expect(stepTimeouts.length).toBeGreaterThanOrEqual(2);
    expect(Math.max(...stepTimeouts) * 2).toBeLessThanOrEqual(jobTimeout);
    // A green dry run repairs nothing, so it must not close a live
    // failure issue.
    expect(yaml).toContain("if: success() && env.DRY_RUN != 'true'");
  });
});
