import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

import {
  FPF_VERCEL_TEAM_ID,
  FPF_VERCEL_TEAM_SLUG,
} from '../src/core/constants.js';

/**
 * Vercel team identity is one source of truth: the live team slug
 * `venikmans-projects` and its live team id are equivalent aliases, not
 * competing scopes. Workflows may use either literal; they must not invent a
 * third value. The id is live (confirmed 2026-08-29 via Vercel list_teams) —
 * it is not an obsolete truncated leftover.
 */
describe('Vercel team scope is one source of truth', () => {
  it('keeps the live slug and team id as equivalent aliases', () => {
    expect(FPF_VERCEL_TEAM_SLUG).toBe('venikmans-projects');
    expect(FPF_VERCEL_TEAM_ID).toBe('team_CnO1I5xd2OS0lzbbc4RkW7Ym');
  });

  it('matches .env.example to the canonical slug', async () => {
    const env = await readFile(resolve(process.cwd(), '.env.example'), 'utf8');
    const match = /^FPF_VERCEL_SCOPE=(.+)$/mu.exec(env);
    expect(match?.[1]).toBe(FPF_VERCEL_TEAM_SLUG);
  });

  it('uses only the live slug or live team id in GitHub workflows', async () => {
    const workflowsDir = resolve(process.cwd(), '.github/workflows');
    const files = (await readdir(workflowsDir)).filter((name) => name.endsWith('.yml'));
    expect(files.length).toBeGreaterThan(0);

    const allowed = new Set([FPF_VERCEL_TEAM_SLUG, FPF_VERCEL_TEAM_ID]);
    const found: Array<{ file: string; value: string }> = [];

    for (const file of files) {
      const yaml = await readFile(resolve(workflowsDir, file), 'utf8');
      for (const match of yaml.matchAll(/FPF_VERCEL_SCOPE:\s*(\S+)/gu)) {
        found.push({ file, value: match[1]! });
      }
    }

    expect(found.length).toBeGreaterThan(0);
    for (const entry of found) {
      expect(
        allowed.has(entry.value),
        `${entry.file} uses unknown FPF_VERCEL_SCOPE ${entry.value}`,
      ).toBe(true);
    }
  });
});
