import { describe, expect, it } from '@rstest/core';

import { renderHostedHomePage } from '../src/adapters/hosted/home-page.js';
import {
  createHostedComposition,
  HOSTED_HOME_ROUTES,
} from '../src/composition/hosted.js';
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

  it('serves the connection page from the hosted root', async () => {
    const { app } = createHostedComposition({
      ...process.env,
      PORT: '0',
    } as NodeJS.ProcessEnv);

    const response = await app.request('/');
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(html).toContain('<title>fpf-memory MCP</title>');
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
    expect(html).toContain('<title>fpf-memory MCP</title>');
    expect(html).toContain(HOSTED_MCP_ENDPOINT);
  });
});
