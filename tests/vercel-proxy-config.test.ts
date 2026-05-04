import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

interface VercelConfig {
  buildCommand?: string | null;
  framework?: string | null;
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
      await readFile(resolve(process.cwd(), 'deploy/vercel-proxy/vercel.json'), 'utf8'),
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
