import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

import { HOSTED_FPF_STATUS_ROUTE } from '../src/adapters/hosted/status-page.js';
import {
  createVercelFunctionConfig,
  createVercelMcpOutputConfig,
  createVercelWebsiteOutputConfig,
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

describe('Vercel deployment configs', () => {
  it('uses a project-aware Git build command for Vercel previews', async () => {
    const config = JSON.parse(
      await readFile(resolve(process.cwd(), 'vercel.json'), 'utf8'),
    ) as VercelConfig;
    const packageJson = JSON.parse(
      await readFile(resolve(process.cwd(), 'package.json'), 'utf8'),
    ) as { scripts: Record<string, string> };
    const gitBuild = await readFile(
      resolve(process.cwd(), 'scripts/build-vercel-git-preview.ts'),
      'utf8',
    );

    expect(config.framework).toBeNull();
    expect(config.installCommand).toBe('bun install --frozen-lockfile');
    expect(config.buildCommand).toBe('bun run vercel:git:build');
    expect(packageJson.scripts['vercel:git:build']).toBe(
      'bun scripts/build-vercel-git-preview.ts',
    );
    expect(gitBuild).toContain('FPF_VERCEL_SURFACE');
    expect(gitBuild).toContain('VERCEL_PROJECT_PRODUCTION_URL');
    expect(gitBuild).not.toContain('VERCEL_GIT_COMMIT_REF');
    expect(gitBuild).toContain('vercel:mcp:build');
    expect(gitBuild).toContain('vercel:website:build');
  });

  it('keeps a separate MCP Vercel config for the API project', async () => {
    const config = JSON.parse(
      await readFile(resolve(process.cwd(), 'vercel.mcp.json'), 'utf8'),
    ) as VercelConfig;

    expect(config.framework).toBeNull();
    expect(config.installCommand).toBe('bun install --frozen-lockfile');
    expect(config.buildCommand).toBe('bun run vercel:mcp:build');
  });

  it('keeps package deploy scripts split by deployment surface', async () => {
    const packageJson = JSON.parse(
      await readFile(resolve(process.cwd(), 'package.json'), 'utf8'),
    ) as { scripts: Record<string, string> };

    expect(packageJson.scripts['vercel:website:link']).toBe(
      'vercel link --project fpf-sh',
    );
    expect(packageJson.scripts['vercel:website:build']).toBe(
      'bun run docs:build && bun run build:vercel-website',
    );
    expect(packageJson.scripts['vercel:mcp:link']).toBe(
      'vercel link --project fpf-reference-mcp',
    );
    expect(packageJson.scripts['vercel:mcp:build']).toBe(
      'bun run predeploy && bun run build:vercel-mcp && bun run bench:vercel:function-size',
    );
    expect(packageJson.scripts['deploy:validate']).toBe(
      'bun run validate:published && bun run monitor:content -- --mode local --format markdown --fail-on-breach',
    );
    expect(packageJson.scripts.deploy).toBe('bun run deploy:prod');
    expect(packageJson.scripts['deploy:prod']).toBe(
      'bun scripts/deploy-production-surfaces.ts',
    );
    expect(packageJson.scripts['vercel:website:deploy:prod']).toContain(
      'bun run deploy:validate &&',
    );
    expect(packageJson.scripts['vercel:website:deploy:prod']).toContain(
      'bun scripts/deploy-vercel-prebuilt.ts --project fpf-sh --config vercel.json --prod',
    );
    expect(packageJson.scripts['vercel:mcp:deploy:prod']).toContain(
      'bun run deploy:validate &&',
    );
    expect(packageJson.scripts['vercel:mcp:deploy:prod']).toContain(
      'bun scripts/deploy-vercel-prebuilt.ts --project fpf-reference-mcp --config vercel.mcp.json --prod',
    );
    expect(packageJson.scripts['vercel:website:deploy:prod']).not.toContain(
      'vercel deploy --prebuilt --prod --yes --project',
    );
    expect(packageJson.scripts['vercel:mcp:deploy:prod']).not.toContain(
      'vercel deploy --prebuilt --prod --yes --project',
    );
    const deployHelper = await readFile(
      resolve(process.cwd(), 'scripts/deploy-vercel-prebuilt.ts'),
      'utf8',
    );
    const prodDeploy = await readFile(
      resolve(process.cwd(), 'scripts/deploy-production-surfaces.ts'),
      'utf8',
    );
    expect(deployHelper).toContain('FPF_VERCEL_SCOPE');
    expect(deployHelper).toContain("'--scope'");
    expect(deployHelper).toContain('vercelScopeArgs(args.scope)');
    expect(prodDeploy).toContain("'--skip-domain'");
    expect(prodDeploy).toContain("'promote'");
    expect(prodDeploy).toContain('extractStagedDeploymentUrl');
    expect(prodDeploy).toContain('extractLatestProductionDeploymentUrl');
    expect(prodDeploy).toContain('rollbackPromotions');
    expect(prodDeploy).toContain('monitor:sync');
    expect(prodDeploy).toContain('monitor:content');
    expect(
      Object.keys(packageJson.scripts).some((script) => script.startsWith('vercel:origin')),
    ).toBe(false);
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
    expect(readme).toContain('Historical pre-rename project-origin URLs are audit records only');
    expect(readme).toContain('Historical errored preview deployments can remain in Vercel');
    expect(codexConfig).toContain(
      'url = "https://mcp.fpf.sh/api/mcp/fpf_reference/mcp"',
    );
    expect(codexConfig).not.toMatch(/vercel-origin\.vercel\.app/u);
  });

  it('routes the hosted freshness status endpoint through the MCP deployment function', () => {
    const config = createVercelMcpOutputConfig();

    expect(config.routes).toContainEqual({
      src: `^${HOSTED_FPF_STATUS_ROUTE}$`,
      dest: '/_mcp',
    });
  });

  it('keeps website output static-only with clean URL fallback', () => {
    const config = createVercelWebsiteOutputConfig();
    const srcRoutes = config.routes.flatMap((route) =>
      'src' in route ? [route.src] : [],
    );
    const handles = config.routes.flatMap((route) =>
      'handle' in route ? [route.handle] : [],
    );

    expect(handles).toEqual(['filesystem', 'miss']);
    expect(srcRoutes).toContain('^/(.*)$');
    expect(srcRoutes).not.toContain('^/$');
    expect(srcRoutes).not.toContain('^/connect-mcp$');
    expect(srcRoutes).not.toContain(`^${HOSTED_FPF_STATUS_ROUTE}$`);
    expect(srcRoutes).not.toContain(`^${HOSTED_MCP_ROUTE}$`);
    expect(srcRoutes).not.toContain(`^${LEGACY_HOSTED_MCP_ROUTE}$`);
  });

  it('publishes a website-side publication manifest for live freshness checks', async () => {
    const constants = await readFile(resolve(process.cwd(), 'src/core/constants.ts'), 'utf8');
    const build = await readFile(resolve(process.cwd(), 'src/build/vercel-origin-build.ts'), 'utf8');
    const ci = await readFile(resolve(process.cwd(), '.github/workflows/ci.yml'), 'utf8');

    expect(constants).toContain(
      "WEBSITE_PUBLICATION_MANIFEST_PATH = 'fpf-publication-manifest.json'",
    );
    expect(build).toContain('PUBLISHED_MANIFEST_PATH');
    expect(build).toContain('WEBSITE_PUBLICATION_MANIFEST_PATH');
    expect(ci).toContain('test -f .vercel/output/static/fpf-publication-manifest.json');
  });

  it('keeps MCP output API-only without static docs routes', () => {
    const config = createVercelMcpOutputConfig();
    const srcRoutes = config.routes.flatMap((route) =>
      'src' in route ? [route.src] : [],
    );

    expect(config.routes.some((route) => 'handle' in route)).toBe(false);
    expect(srcRoutes).toContain(`^${HOSTED_FPF_STATUS_ROUTE}$`);
    expect(srcRoutes).toContain(`^${HOSTED_MCP_ROUTE}$`);
    expect(srcRoutes).toContain(`^${LEGACY_HOSTED_MCP_ROUTE}$`);
    expect(srcRoutes).not.toContain('^/(.*)$');
    expect(
      config.routes.every((route) => !('dest' in route) || route.dest === '/_mcp'),
    ).toBe(true);
  });

  it('runs the filesystem phase first in the website deployment', () => {
    const config = createVercelWebsiteOutputConfig();
    const filesystemIndex = config.routes.findIndex(
      (route) => 'handle' in route && route.handle === 'filesystem',
    );

    expect(filesystemIndex).toBe(0);
  });
});
