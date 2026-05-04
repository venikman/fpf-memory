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
  it('proxies only the hosted MCP and connection page paths to Mastra Cloud', async () => {
    const config = JSON.parse(
      await readFile(resolve(process.cwd(), 'vercel.json'), 'utf8'),
    ) as VercelConfig;

    expect(config.framework).toBe(null);
    expect(config.buildCommand).toBe(null);
    expect(config.rewrites).toEqual([
      {
        source: '/api/mcp/fpf_memory/mcp',
        destination: 'https://fpf-memory.server.mastra.cloud/api/mcp/fpf_memory/mcp',
      },
      {
        source: '/connect-mcp',
        destination: 'https://fpf-memory.server.mastra.cloud/connect-mcp',
      },
      {
        source: '/',
        destination: 'https://fpf-memory.server.mastra.cloud/',
      },
    ]);
  });

  it('disables Vercel build steps so the rewrite-only deploy does not need a public/ directory', async () => {
    // The repo root has a Node project that builds to dist/, but Vercel
    // is just acting as a rewrite-only edge proxy here — no static
    // assets to ship. Without these directives Vercel's auto-detected
    // build runs and then fails with `No Output Directory named "public"
    // found`. Setting installCommand/buildCommand to null and
    // outputDirectory to "." tells Vercel to skip install + build and
    // treat the repo root as the (empty) static surface.
    const config = JSON.parse(
      await readFile(resolve(process.cwd(), 'vercel.json'), 'utf8'),
    ) as VercelConfig;

    expect(config.installCommand).toBe(null);
    expect(config.buildCommand).toBe(null);
    expect(config.outputDirectory).toBe('.');
  });

  it('marks the MCP route as non-cacheable at browser and CDN layers', async () => {
    const config = JSON.parse(
      await readFile(resolve(process.cwd(), 'vercel.json'), 'utf8'),
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
