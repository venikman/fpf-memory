import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

import { renderHostedHomePage } from '../src/adapters/hosted/home-page.js';
import {
  FIRST_SUCCESSFUL_CALL_HEADING,
  FPF_VS_MCP_EXPLAINER_MARKDOWN,
  HOSTED_MCP_ENDPOINT,
  HOSTED_MCP_STATUS_URL,
  LEGACY_HOSTED_MCP_ENDPOINT,
  MCP_SERVER_NAME,
  PUBLIC_MCP_TOOLS,
  WIKI_CONNECT_MCP_URL,
} from '../src/core/public-copy.js';

describe('public adoption copy parity', () => {
  it('keeps connect-mcp.md aligned with the canonical SSOT strings', async () => {
    const connectMcp = await readFile(resolve(process.cwd(), 'docs/connect-mcp.md'), 'utf8');

    expect(connectMcp).toContain(`## ${FIRST_SUCCESSFUL_CALL_HEADING}`);
    expect(connectMcp).toContain(HOSTED_MCP_ENDPOINT);
    expect(connectMcp).toContain(LEGACY_HOSTED_MCP_ENDPOINT);
    expect(connectMcp).toContain(HOSTED_MCP_STATUS_URL);
    expect(connectMcp).toContain(MCP_SERVER_NAME);
    expect(connectMcp).toContain('FPF vs MCP in one paragraph');
    expect(connectMcp).toContain('not agent memory');
    expect(connectMcp).toContain('stable FPF IDs');
    for (const tool of PUBLIC_MCP_TOOLS) {
      expect(connectMcp).toContain(tool);
    }
  });

  it('keeps hosted HTML aligned with the canonical SSOT strings', () => {
    const html = renderHostedHomePage();

    expect(html).toContain(HOSTED_MCP_ENDPOINT);
    expect(html).toContain(LEGACY_HOSTED_MCP_ENDPOINT);
    expect(html).toContain(WIKI_CONNECT_MCP_URL);
    expect(html).toContain(MCP_SERVER_NAME);
    expect(html).toContain(HOSTED_MCP_STATUS_URL);
    expect(html).toContain('stable FPF IDs');
    expect(html).toContain('<html lang="en">');
    expect(html).toContain('<main>');
    for (const tool of PUBLIC_MCP_TOOLS) {
      expect(html).toContain(`<code>${tool}</code>`);
    }
  });

  it('documents the FPF vs MCP explainer contract for wiki surfaces', () => {
    expect(FPF_VS_MCP_EXPLAINER_MARKDOWN).toContain('not agent memory');
    expect(FPF_VS_MCP_EXPLAINER_MARKDOWN).toContain(MCP_SERVER_NAME);
  });
});
