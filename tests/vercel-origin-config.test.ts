import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

import { HOSTED_FPF_STATUS_ROUTE } from '../src/adapters/hosted/status-page.js';
import {
  collectWebsiteSitemapPaths,
  createVercelFunctionConfig,
  createVercelLegacyMcpBlockedRoute,
  createVercelMcpOutputConfig,
  createVercelWebsiteOutputConfig,
  createWebsiteRobotsTxt,
  createWebsiteSitemapXml,
  WEBSITE_CANONICAL_ORIGIN,
} from '../src/build/vercel-origin-build.js';
import {
  HOSTED_HOME_ROUTES,
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
    expect(prodDeploy).toContain("'alias', 'set'");
    expect(prodDeploy).toContain('currentDomainDeploymentUrl');
    expect(prodDeploy).toContain('aliasCanonicalDomain');
    expect(prodDeploy).toContain('extractStagedDeploymentUrl');
    expect(prodDeploy).toContain('extractLatestProductionDeploymentUrl');
    expect(prodDeploy).toContain('extractInspectedDeploymentUrl');
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

  it('routes hosted home pages through the MCP deployment function', () => {
    const config = createVercelMcpOutputConfig();

    for (const route of HOSTED_HOME_ROUTES) {
      expect(config.routes).toContainEqual({
        src: `^${route}$`,
        dest: '/_mcp',
      });
    }
  });

  it('keeps website output static-only with clean URL fallback', () => {
    const config = createVercelWebsiteOutputConfig();
    const srcRoutes = config.routes.flatMap((route) =>
      'src' in route ? [route.src] : [],
    );
    const handles = config.routes.flatMap((route) =>
      'handle' in route ? [route.handle] : [],
    );

    expect(handles).toEqual(['filesystem', 'miss', 'hit', 'error']);
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

  it('keeps MCP output function-only without static docs fallback routes', () => {
    const config = createVercelMcpOutputConfig();
    const srcRoutes = config.routes.flatMap((route) =>
      'src' in route ? [route.src] : [],
    );
    const functionRoutes = config.routes.filter((route) =>
      'dest' in route && route.dest === '/_mcp'
    );

    expect(config.routes.some((route) => 'handle' in route)).toBe(false);
    for (const route of HOSTED_HOME_ROUTES) {
      expect(srcRoutes).toContain(`^${route}$`);
    }
    expect(srcRoutes).toContain(`^${HOSTED_FPF_STATUS_ROUTE}$`);
    expect(srcRoutes).toContain(`^${HOSTED_MCP_ROUTE}$`);
    expect(srcRoutes).toContain(`^${LEGACY_HOSTED_MCP_ROUTE}$`);
    expect(functionRoutes).not.toContainEqual({
      src: `^${LEGACY_HOSTED_MCP_ROUTE}$`,
      dest: '/_mcp',
    });
    expect(srcRoutes).not.toContain('^/(.*)$');
    // The only non-function dest is the static legacy-gone migration body.
    expect(
      config.routes.every(
        (route) =>
          !('dest' in route) ||
          route.dest === '/_mcp' ||
          route.dest === '/legacy-mcp-gone.json',
      ),
    ).toBe(true);
  });

  it('blocks the legacy MCP route at Vercel routing before the function runs', () => {
    const config = createVercelMcpOutputConfig();
    const legacyBlock = createVercelLegacyMcpBlockedRoute();

    expect(config.routes[0]).toEqual(legacyBlock);
    expect(legacyBlock).toEqual({
      src: `^${LEGACY_HOSTED_MCP_ROUTE}$`,
      dest: '/legacy-mcp-gone.json',
      status: 410,
      headers: {
        'Cache-Control': 'no-store',
        Link: '<https://mcp.fpf.sh/api/mcp/fpf_reference/mcp>; rel="successor-version"',
      },
    });
  });

  it('runs the filesystem phase first in the website deployment', () => {
    const config = createVercelWebsiteOutputConfig();
    const filesystemIndex = config.routes.findIndex(
      (route) => 'handle' in route && route.handle === 'filesystem',
    );

    expect(filesystemIndex).toBe(0);
  });

  it('serves the branded rspress 404 page with a real 404 status on website misses', () => {
    const config = createVercelWebsiteOutputConfig();
    const errorIndex = config.routes.findIndex(
      (route) => 'handle' in route && route.handle === 'error',
    );

    expect(errorIndex).toBeGreaterThan(-1);
    expect(config.routes[errorIndex + 1]).toEqual({
      src: '^/.*$',
      dest: '/404.html',
      status: 404,
    });
  });

  it('serves content-hashed static assets with immutable cache headers', () => {
    const config = createVercelWebsiteOutputConfig();
    const hitIndex = config.routes.findIndex(
      (route) => 'handle' in route && route.handle === 'hit',
    );

    expect(hitIndex).toBeGreaterThan(-1);
    expect(config.routes[hitIndex + 1]).toEqual({
      src: '^/static/(.*)$',
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
      continue: true,
      important: true,
    });
  });

  it('maps built html files to clean sitemap paths', async () => {
    const dir = await mkdtemp(resolve(tmpdir(), 'fpf-sitemap-'));
    try {
      await mkdir(resolve(dir, 'generated/patterns'), { recursive: true });
      await mkdir(resolve(dir, 'static/css'), { recursive: true });
      await writeFile(resolve(dir, 'index.html'), '<!doctype html>');
      await writeFile(resolve(dir, '404.html'), '<!doctype html>');
      await writeFile(resolve(dir, 'connect-mcp.html'), '<!doctype html>');
      await writeFile(resolve(dir, 'generated/patterns/A.6.9.html'), '<!doctype html>');
      await writeFile(resolve(dir, 'static/css/styles.css'), '');

      const paths = await collectWebsiteSitemapPaths(dir);

      expect(paths).toEqual(['/', '/connect-mcp', '/generated/patterns/A.6.9']);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it('generates the sitemap rooted at the canonical website origin', () => {
    const xml = createWebsiteSitemapXml(['/', '/connect-mcp']);

    expect(WEBSITE_CANONICAL_ORIGIN).toBe('https://fpf.sh');
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain('<loc>https://fpf.sh/</loc>');
    expect(xml).toContain('<loc>https://fpf.sh/connect-mcp</loc>');
  });

  it('points robots.txt at the canonical sitemap', () => {
    const robots = createWebsiteRobotsTxt();

    expect(robots).toContain('User-agent: *');
    expect(robots).toContain('Allow: /');
    expect(robots).toContain('Sitemap: https://fpf.sh/sitemap.xml');
  });

  it('emits the SEO files into the website static output during build', async () => {
    const build = await readFile(
      resolve(process.cwd(), 'src/build/vercel-origin-build.ts'),
      'utf8',
    );

    expect(build).toContain("WEBSITE_SITEMAP_FILENAME = 'sitemap.xml'");
    expect(build).toContain("WEBSITE_ROBOTS_FILENAME = 'robots.txt'");
    expect(build).toContain('writeWebsiteSeoFiles(staticDir)');
  });
});
