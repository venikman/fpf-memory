import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { describe, expect, it } from '@rstest/core';

import {
  APP_ENABLED_TOOL_IDS,
  FPF_APP_RESOURCE_URI,
  getFpfAppToolMeta,
  MCP_APP_MIME_TYPE,
  renderFpfAppHtml,
} from '../src/adapters/mcp/app-ui.js';
import { createMcpComposition } from '../src/composition/mcp.js';
import { PUBLIC_MCP_TOOLS } from '../src/core/public-copy.js';

/**
 * Drives the public server over a real in-memory MCP client so the asserted
 * wire shapes (tools/list `_meta`, resources/list, resources/read) are what
 * MCP Apps hosts such as the AI SDK's `experimental_MCPAppRenderer` actually
 * receive.
 */
async function connectPublicServer() {
  const composition = createMcpComposition({
    FPF_MCP_SURFACE: 'public',
  } as NodeJS.ProcessEnv);
  const server = composition.fpfReferencePublic.createSdkServer();
  const client = new Client({ name: 'mcp-app-ui-test', version: '1.0.0' });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.connect(serverTransport);
  await client.connect(clientTransport);
  return client;
}

describe('MCP Apps UI surface', () => {
  it('advertises the app on discovery/answer tools and nowhere else', async () => {
    const client = await connectPublicServer();
    const { tools } = await client.listTools();

    expect(tools.length).toBe(PUBLIC_MCP_TOOLS.length);
    for (const tool of tools) {
      const uiMeta = tool._meta?.ui as { resourceUri?: string } | undefined;
      if (APP_ENABLED_TOOL_IDS.has(tool.name)) {
        // Current spec key plus the legacy flat key for older hosts.
        expect(uiMeta?.resourceUri).toBe(FPF_APP_RESOURCE_URI);
        expect(tool._meta?.['ui/resourceUri']).toBe(FPF_APP_RESOURCE_URI);
      } else {
        expect(uiMeta).toBeUndefined();
        expect(tool._meta?.['ui/resourceUri']).toBeUndefined();
      }
    }
  });

  it('serves the viewer resource with the MCP Apps MIME type', async () => {
    const client = await connectPublicServer();

    const listed = await client.listResources();
    const resource = listed.resources.find((entry) => entry.uri === FPF_APP_RESOURCE_URI);
    expect(resource?.mimeType).toBe(MCP_APP_MIME_TYPE);

    const read = await client.readResource({ uri: FPF_APP_RESOURCE_URI });
    const content = read.contents.find((entry) => entry.uri === FPF_APP_RESOURCE_URI);
    expect(content?.mimeType).toBe(MCP_APP_MIME_TYPE);
    expect(typeof content?.text).toBe('string');
    expect(content?.text).toContain('<!doctype html>');
  });

  it('keeps the app HTML self-contained and bridge-complete', () => {
    const html = renderFpfAppHtml();

    // Sandboxed app iframes cannot fetch — no external references allowed.
    expect(html).not.toMatch(/\bsrc="https?:/);
    expect(html).not.toMatch(/\bhref="https?:/);
    expect(html).not.toMatch(/@import|url\(/);
    expect(html).not.toContain('fetch(');

    // Bridge lifecycle: initialize handshake plus the notifications the host
    // sends (tool-input/tool-result) and the app emits (size-changed).
    for (const marker of [
      'ui/initialize',
      'ui/notifications/initialized',
      'ui/notifications/tool-input',
      'ui/notifications/tool-result',
      'ui/notifications/size-changed',
      'ui/notifications/host-context-changed',
    ]) {
      expect(html).toContain(marker);
    }

    // Renderers for every app-enabled result shape.
    expect(html).toContain('renderSearch');
    expect(html).toContain('renderCatalog');
    expect(html).toContain('renderAnswer');
  });

  it('emits app _meta only for the curated tool list', () => {
    expect(getFpfAppToolMeta('search_fpf')).toBeDefined();
    expect(getFpfAppToolMeta('get_fpf_index_status')).toBeUndefined();
    expect(getFpfAppToolMeta('read_fpf_doc')).toBeUndefined();
    // Every app-enabled tool must be on the public surface — the viewer is
    // part of the hosted adoption story, not an expert-only extra.
    for (const toolId of APP_ENABLED_TOOL_IDS) {
      expect(PUBLIC_MCP_TOOLS).toContain(toolId);
    }
  });
});
