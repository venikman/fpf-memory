import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

interface VercelConfig {
  buildCommand?: string | null;
  framework?: string | null;
  installCommand?: string | null;
  outputDirectory?: string | null;
  headers?: Array<{
    source: string;
    headers: Array<{ key: string; value: string }>;
  }>;
  rewrites?: Array<{
    source: string;
    destination: string;
  }>;
}

describe('Vercel MCP proxy config', () => {
  const retiredCloudHost = ['mastra', 'cloud'].join('.');

  it('uses the hosted MCP origin build command for GitHub preview builds', async () => {
    const config = JSON.parse(
      await readFile(resolve(process.cwd(), 'vercel.json'), 'utf8'),
    ) as VercelConfig;

    expect(config.buildCommand).toBe('bun run vercel:origin:build');
  });

  it('proxies every public route to the validated Vercel origin', async () => {
    const config = JSON.parse(
      await readFile(resolve(process.cwd(), 'deploy/vercel-proxy/vercel.json'), 'utf8'),
    ) as VercelConfig;

    expect(config.framework).toBe(null);
    expect(config.buildCommand).toBe(null);
    expect(config.rewrites).toEqual([
      {
        source: '/api/mcp/fpf_memory/mcp',
        destination: 'https://fpf-memory-mcp-vercel-origin.vercel.app/api/mcp/fpf_memory/mcp',
      },
      {
        source: '/connect-mcp',
        destination: 'https://fpf-memory-mcp-vercel-origin.vercel.app/connect-mcp',
      },
      {
        source: '/',
        destination: 'https://fpf-memory-mcp-vercel-origin.vercel.app/',
      },
    ]);
    expect(JSON.stringify(config)).not.toContain(retiredCloudHost);
  });

  it('disables Vercel build steps so the rewrite-only deploy does not need a public/ directory', async () => {
    // The proxy project is just a rewrite-only edge proxy. Without these
    // directives Vercel may auto-detect a build and then fail looking for
    // a static output directory.
    const config = JSON.parse(
      await readFile(resolve(process.cwd(), 'deploy/vercel-proxy/vercel.json'), 'utf8'),
    ) as VercelConfig;

    expect(config.installCommand).toBe(null);
    expect(config.buildCommand).toBe(null);
    expect(config.outputDirectory).toBe('.');
  });

  it('marks the MCP route as non-cacheable at browser and CDN layers', async () => {
    const config = JSON.parse(
      await readFile(resolve(process.cwd(), 'deploy/vercel-proxy/vercel.json'), 'utf8'),
    ) as VercelConfig;

    const mcpHeaders = config.headers?.find(
      (entry) => entry.source === '/api/mcp/fpf_memory/mcp',
    );
    const headerMap = new Map(
      mcpHeaders?.headers.map((header) => [header.key, header.value]) ?? [],
    );

    expect(headerMap.get('Cache-Control')).toBe('no-store, max-age=0');
    expect(headerMap.get('CDN-Cache-Control')).toBe('no-store');
    expect(headerMap.get('Vercel-CDN-Cache-Control')).toBe('no-store');
  });
});
