import { describe, expect, it } from '@rstest/core';

import { renderHostedHomePage } from '../src/adapters/hosted/home-page.js';
import {
  createHostedComposition,
  HOSTED_HOME_ROUTES,
} from '../src/composition/hosted.js';
import {
  HOSTED_MCP_ENDPOINT,
  LEGACY_HOSTED_MCP_ENDPOINT,
} from '../src/adapters/hosted/endpoints.js';
import {
  MCP_INTERFACE_CONTRACT_URL,
  MCP_ORIGIN_HOME_URL,
  WIKI_BASE_URL,
  WIKI_CONNECT_MCP_URL,
} from '../src/core/public-copy.js';

describe('hosted home page', () => {
  it('renders connection instructions for the hosted MCP endpoint', () => {
    const html = renderHostedHomePage();

    expect(html).toContain('<title>FPF Reference MCP</title>');
    expect(html).toContain(HOSTED_MCP_ENDPOINT);
    expect(html).toContain(LEGACY_HOSTED_MCP_ENDPOINT);
    expect(html).toContain('ChatGPT');
    expect(html).toContain('Claude');
    expect(html).toContain('VS Code');
    expect(html).toContain('Zed');
    expect(html).toContain('Codex CLI');
    expect(html).toContain('Claude Code');
    expect(html).toContain('Pi');
    expect(html).toContain('&quot;fpf_reference&quot;:');
    expect(html).not.toContain('&quot;fpf-reference&quot;:');
    expect(html).toContain('codex mcp add fpf_reference --url');
    expect(html).toContain('claude mcp add --transport http fpf_reference');
    expect(html).toContain('pi install npm:pi-mcp-extension');
    expect(html).toContain('Package And Self-Hosting');
    expect(html).toContain('Recipes');
    expect(html).toContain('Operator Packaging');
    expect(html).toContain('Legacy Compatibility');
    expect(html).toContain('https://mcp.vercel.com/venikmans-projects/fpf-reference-mcp');
    expect(html).toContain('git clone https://github.com/venikman/fpf-memory.git');
    expect(html).toContain('bun run mcp');
    expect(html).toContain('FPF_MCP_SURFACE=full bun run mcp');
    expect(html).toContain('http://localhost:4111/api/mcp/fpf_reference/mcp');
    expect(html).toContain('get_fpf_index_status');
    expect(html).toContain('query_fpf_spec');
    expect(html).toContain('read_fpf_doc');
    expect(html).toContain('405 Method Not Allowed');
    expect(html).toContain('Interface Contract');
    expect(html).toContain(MCP_INTERFACE_CONTRACT_URL);
    expect(html).toContain('Proceed only when snapshotExists is true');
    expect(html).toContain('Internal consistency is not global upstream currentness');
    expect(html).not.toContain('406');
  });

  it('serves the connection page from the hosted root', async () => {
    const { app } = createHostedComposition({
      ...process.env,
      PORT: '0',
    } as NodeJS.ProcessEnv);

    const response = await app.request('/');
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(html).toContain('<title>FPF Reference MCP</title>');
    expect(html).toContain(HOSTED_MCP_ENDPOINT);
  }, 20_000);

  it('registers the connection page on direct hosted home routes', async () => {
    const { app } = createHostedComposition({
      ...process.env,
      PORT: '0',
    } as NodeJS.ProcessEnv);

    expect([...HOSTED_HOME_ROUTES]).toEqual(['/', '/connect-mcp']);
    const response = await app.request('/connect-mcp');
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(html).toContain('<title>FPF Reference MCP</title>');
    expect(html).toContain(HOSTED_MCP_ENDPOINT);
  });

  it('caches the home page at the edge and emits baseline security headers', async () => {
    const { app } = createHostedComposition({
      ...process.env,
      PORT: '0',
    } as NodeJS.ProcessEnv);

    const response = await app.request('/');

    expect(response.status).toBe(200);
    const cacheControl = response.headers.get('Cache-Control') ?? '';
    expect(cacheControl).toContain('public');
    expect(cacheControl).toContain('s-maxage=86400');
    expect(cacheControl).toContain('stale-while-revalidate=604800');
    expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(response.headers.get('Referrer-Policy')).toBe('no-referrer');
    expect(response.headers.get('X-Frame-Options')).toBe('DENY');
    expect(response.headers.get('Strict-Transport-Security')).toContain('max-age=31536000');
  });

  it('keeps Cache-Control: no-store on the dynamic /api/fpf/status route', async () => {
    const { app } = createHostedComposition({
      ...process.env,
      PORT: '0',
    } as NodeJS.ProcessEnv);

    const response = await app.request('/api/fpf/status');
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    // The freshness endpoint should still get the baseline security headers.
    expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
  });

  it('points the footer at the MCP setup home and FPF reference site', () => {
    const html = renderHostedHomePage();
    expect(html).not.toContain('venikman.github.io/fpf-memory/connect-mcp');
    expect(html).toContain(MCP_ORIGIN_HOME_URL);
    expect(html).toContain(WIKI_BASE_URL);
    expect(html).not.toContain(WIKI_CONNECT_MCP_URL);
    expect(html).not.toContain('href="/connect-mcp"');
  });
});
