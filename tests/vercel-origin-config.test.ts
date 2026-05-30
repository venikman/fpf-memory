import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

import { HOSTED_FPF_STATUS_ROUTE } from '../src/adapters/hosted/status-page.js';
import {
  createVercelFunctionConfig,
  createVercelOriginOutputConfig,
} from '../src/build/vercel-origin-build.js';
import {
  HOSTED_MCP_ROUTE,
  LEGACY_HOSTED_MCP_ROUTE,
} from '../src/composition/hosted.js';

interface VercelConfig {
  buildCommand?: string | null;
  framework?: string | null;
  installCommand?: string | null;
}

describe('Vercel MCP origin config', () => {
  it('uses the hosted MCP origin build command for GitHub preview builds', async () => {
    const config = JSON.parse(
      await readFile(resolve(process.cwd(), 'vercel.json'), 'utf8'),
    ) as VercelConfig;

    expect(config.framework).toBeNull();
    expect(config.installCommand).toBe('bun install --frozen-lockfile');
    expect(config.buildCommand).toBe('bun run vercel:origin:build');
  });

  it('keeps package deploy scripts on the direct Vercel origin only', async () => {
    const packageJson = JSON.parse(
      await readFile(resolve(process.cwd(), 'package.json'), 'utf8'),
    ) as { scripts: Record<string, string> };

    expect(packageJson.scripts['vercel:origin:link']).toBe(
      'vercel link --project fpf-sh',
    );
    expect(packageJson.scripts['vercel:origin:build']).toBe(
      'bun run predeploy && bun run docs:build && bun run build:vercel-origin && bun run bench:vercel:function-size',
    );
    expect(packageJson.scripts.deploy).toBe('bun run vercel:origin:deploy:prod');
    const retiredScriptPrefix = ['vercel', 'pro' + 'xy'].join(':');
    expect(
      Object.keys(packageJson.scripts).some((script) => script.startsWith(retiredScriptPrefix)),
    ).toBe(false);
  });

  it('keeps the package Node floor separate from the generated Vercel function runtime', async () => {
    const packageJson = JSON.parse(
      await readFile(resolve(process.cwd(), 'package.json'), 'utf8'),
    ) as { engines: Record<string, string> };
    const functionConfig = createVercelFunctionConfig();

    expect(packageJson.engines.node).toBe('>=22.13.0');
    expect(functionConfig.runtime).toBe('nodejs24.x');
  });

  it('keeps the origin function on cost guardrails for memory and duration', () => {
    const functionConfig = createVercelFunctionConfig();

    expect(functionConfig.memory).toBe(1024);
    expect(functionConfig.maxDuration).toBe(20);
  });

  it('documents canonical Vercel aliases and historical preview-error policy', async () => {
    const readme = await readFile(resolve(process.cwd(), 'README.md'), 'utf8');
    const codexConfig = await readFile(resolve(process.cwd(), '.codex/config.toml'), 'utf8');

    expect(readme).toContain('https://fpf.sh/');
    expect(readme).toContain('https://mcp.fpf.sh/api/mcp/fpf_reference/mcp');
    expect(readme).toContain('https://mcp.fpf.sh/api/mcp/fpf_memory/mcp');
    expect(readme).toContain(
      '`fpf-memory-mcp-vercel-origin.vercel.app` is a legacy compatibility alias only',
    );
    expect(readme).toContain('Historical errored preview deployments can remain in Vercel');
    expect(codexConfig).toContain(
      'url = "https://mcp.fpf.sh/api/mcp/fpf_reference/mcp"',
    );
    expect(codexConfig).not.toContain('fpf-memory-mcp-vercel-origin.vercel.app');
  });

  it('routes the hosted freshness status endpoint through the Vercel origin function', () => {
    const config = createVercelOriginOutputConfig();

    expect(config.routes).toContainEqual({
      src: `^${HOSTED_FPF_STATUS_ROUTE}$`,
      dest: '/_origin',
    });
  });

  it('only sends API surfaces to the function — everything else falls through to static docs', () => {
    const config = createVercelOriginOutputConfig();
    // The function only owns /api/* surfaces. Home and /connect-mcp are now
    // served from the Rspress build output in .vercel/output/static, so
    // they must NOT be listed in routes (otherwise Vercel routes them to
    // the function and the static page is shadowed).
    const srcRoutes = config.routes.flatMap((route) =>
      'src' in route ? [route.src] : [],
    );
    expect(srcRoutes).not.toContain('^/$');
    expect(srcRoutes).not.toContain('^/connect-mcp$');
    // API routes remain, including the blocked legacy MCP alias.
    expect(srcRoutes).toContain(`^${HOSTED_MCP_ROUTE}$`);
    expect(srcRoutes).toContain(`^${LEGACY_HOSTED_MCP_ROUTE}$`);
  });

  it('runs the filesystem phase before function routes so static docs win', () => {
    const config = createVercelOriginOutputConfig();
    // Vercel evaluates `routes` in order. To let .vercel/output/static
    // serve `/`, `/start-here`, `/generated/patterns/A.6.9.html`, etc.
    // before any function route fires, the filesystem-phase marker must
    // come first. PR #106's initial push omitted this and the static
    // tree was shadowed by the function — guard against regression.
    const filesystemIndex = config.routes.findIndex(
      (route) => 'handle' in route && route.handle === 'filesystem',
    );
    expect(filesystemIndex).toBe(0);
    const firstFunctionRouteIndex = config.routes.findIndex(
      (route) => 'src' in route,
    );
    expect(firstFunctionRouteIndex).toBeGreaterThan(filesystemIndex);
  });
});
