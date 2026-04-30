import { spawnSync } from 'node:child_process';

import { describe, expect, it } from '@rstest/core';

describe('CLI entrypoint', () => {
  it('prints help and exits zero with no args', () => {
    const result = runCli([]);

    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Usage:');
  });

  it('prints help and exits zero for the explicit help command', () => {
    const result = runCli(['help']);

    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Usage:');
    expect(result.stdout).toContain('evaluate-work');
  });

  it('prints help and exits nonzero for an unknown subcommand', () => {
    const result = runCli(['nope']);

    expect(result.status).toBe(1);
    expect(result.stdout).toContain('Usage:');
  });
});

function runCli(args: string[]) {
  return spawnSync('bun', ['src/cli.ts', ...args], {
    cwd: process.cwd(),
    env: process.env,
    encoding: 'utf8',
  });
}
