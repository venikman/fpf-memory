import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

interface VercelConfig {
  buildCommand?: string | null;
}

describe('Vercel MCP origin config', () => {
  it('uses the hosted MCP origin build command for GitHub preview builds', async () => {
    const config = JSON.parse(
      await readFile(resolve(process.cwd(), 'vercel.json'), 'utf8'),
    ) as VercelConfig;

    expect(config.buildCommand).toBe('bun run vercel:origin:build');
  });

  it('keeps package deploy scripts on the direct Vercel origin only', async () => {
    const packageJson = JSON.parse(
      await readFile(resolve(process.cwd(), 'package.json'), 'utf8'),
    ) as { scripts: Record<string, string> };

    expect(packageJson.scripts['vercel:origin:link']).toBe(
      'vercel link --project fpf-memory-mcp-vercel-origin',
    );
    expect(packageJson.scripts['vercel:origin:build']).toBe(
      'bun run predeploy && bun run build:vercel-origin && bun run bench:vercel:function-size',
    );
    expect(packageJson.scripts.deploy).toBe('bun run vercel:origin:deploy:prod');
    const retiredScriptPrefix = ['vercel', 'pro' + 'xy'].join(':');
    expect(
      Object.keys(packageJson.scripts).some((script) => script.startsWith(retiredScriptPrefix)),
    ).toBe(false);
  });
});
