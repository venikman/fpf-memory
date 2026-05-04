import { describe, expect, it } from '@rstest/core';
import { Hono } from 'hono';

import { renderHostedHomePage } from '../src/adapters/hosted/home-page.js';
import {
  buildHostedMastraRuntimeOptions,
  HOSTED_HOME_API_ROUTES,
} from '../src/adapters/hosted/mastra-runtime.js';
import { createHostedComposition } from '../src/composition/hosted.js';
import { HOSTED_MCP_ENDPOINT } from '../src/core/constants.js';

describe('hosted home page', () => {
  it('renders connection instructions for the hosted MCP endpoint', () => {
    const html = renderHostedHomePage();

    expect(html).toContain('<title>fpf-memory MCP</title>');
    expect(html).toContain(HOSTED_MCP_ENDPOINT);
    expect(html).toContain('ChatGPT');
    expect(html).toContain('Claude');
    expect(html).toContain('VS Code');
    expect(html).toContain('Zed');
    expect(html).toContain('Codex CLI');
    expect(html).toContain('Claude Code');
    expect(html).toContain('Pi');
    expect(html).toContain('codex mcp add fpf_memory --url');
    expect(html).toContain('claude mcp add --transport http fpf_memory');
    expect(html).toContain('pi install npm:pi-mcp-extension');
    expect(html).toContain('get_fpf_index_status');
    expect(html).toContain('query_fpf_spec');
    expect(html).toContain('read_fpf_doc');
  });

  it('serves the connection page from the hosted root before Mastra fallback HTML', async () => {
    const { app, server } = createHostedComposition({
      ...process.env,
      PORT: '0',
    } as NodeJS.ProcessEnv);

    await server.init();
    const response = await app.request('/');
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(html).toContain('<title>fpf-memory MCP</title>');
    expect(html).toContain(HOSTED_MCP_ENDPOINT);
    expect(html).not.toContain('<title>Mastra Server</title>');
  }, 20_000);

  it('registers the connection page on the Mastra CLI server config path', async () => {
    const options = buildHostedMastraRuntimeOptions({
      logger: {} as never,
      observability: { observability: {} } as never,
      mcpServer: {} as never,
    });

    expect(options.server.apiRoutes).toBe(HOSTED_HOME_API_ROUTES);
    expect(HOSTED_HOME_API_ROUTES.map((route) => route.path)).toEqual([
      '/',
      '/connect-mcp',
    ]);

    const app = new Hono();
    for (const route of HOSTED_HOME_API_ROUTES) {
      app.get(route.path, route.handler);
    }

    const response = await app.request('/connect-mcp');
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(html).toContain('<title>fpf-memory MCP</title>');
    expect(html).toContain(HOSTED_MCP_ENDPOINT);
  });
});
