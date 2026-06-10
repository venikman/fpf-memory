import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

import { renderHostedHomePage } from '../src/adapters/hosted/home-page.js';
import {
  FIRST_SUCCESSFUL_CALL_PROMPT,
  FPF_VS_MCP_EXPLAINER_MARKDOWN,
  FPF_REFERENCE_INTERFACE_CONTRACT,
  HOSTED_MCP_ENDPOINT,
  HOSTED_MCP_STATUS_URL,
  LEGACY_HOSTED_MCP_ENDPOINT,
  MCP_INTERFACE_CONTRACT_URL,
  MCP_ORIGIN_HOME_URL,
  MCP_SERVER_NAME,
  PUBLIC_MCP_TOOLS,
  WIKI_CONNECT_MCP_MARKDOWN_LINK,
} from '../src/core/public-copy.js';
import * as toolContracts from '../src/mcp/tool-contracts.js';

describe('public adoption copy parity', () => {
  it('keeps connect-mcp.md as a bridge to the MCP-owned setup surface', async () => {
    const connectMcp = await readFile(resolve(process.cwd(), 'docs/connect-mcp.md'), 'utf8');

    expect(connectMcp).toContain(MCP_ORIGIN_HOME_URL);
    expect(connectMcp).toContain(MCP_SERVER_NAME);
    expect(connectMcp).toContain('compatibility bridge');
    expect(connectMcp).toContain('FPF** is the specification');
    expect(connectMcp).toContain('not agent memory');
    expect(connectMcp).not.toContain('## ChatGPT');
    expect(connectMcp).not.toContain('codex mcp add');
  });

  it('keeps hosted HTML aligned with the canonical SSOT strings', () => {
    const html = renderHostedHomePage();

    expect(html).toContain(HOSTED_MCP_ENDPOINT);
    expect(html).toContain(LEGACY_HOSTED_MCP_ENDPOINT);
    expect(html).toContain(MCP_ORIGIN_HOME_URL);
    expect(html).toContain(MCP_SERVER_NAME);
    expect(html).toContain(HOSTED_MCP_STATUS_URL);
    expect(html).toContain(MCP_INTERFACE_CONTRACT_URL);
    expect(html).toContain('stable FPF IDs');
    expect(html).toContain('Package And Self-Hosting');
    expect(html).toContain('Recipes');
    expect(html).toContain('Operator Packaging');
    expect(html).toContain('Legacy Compatibility');
    expect(html).toContain('bun run mcp');
    expect(html).toContain('http://localhost:4111/api/mcp/fpf_reference/mcp');
    expect(html).toContain('<html lang="en">');
    expect(html).toContain('<main>');
    for (const tool of PUBLIC_MCP_TOOLS) {
      expect(html).toContain(`<code>${tool}</code>`);
    }
    for (const item of FPF_REFERENCE_INTERFACE_CONTRACT.relianceGate) {
      expect(html).toContain(item);
    }
    for (const item of FPF_REFERENCE_INTERFACE_CONTRACT.freshnessSemantics) {
      expect(html).toContain(item);
    }
  });

  it('keeps start-here.md aligned with the canonical first-call copy', async () => {
    const startHere = await readFile(resolve(process.cwd(), 'docs/start-here.md'), 'utf8');

    expect(startHere).toContain('First Principles Framework (FPF)');
    expect(startHere).not.toContain(WIKI_CONNECT_MCP_MARKDOWN_LINK);
    expect(startHere).not.toContain(MCP_ORIGIN_HOME_URL);
    expect(startHere).toContain(FIRST_SUCCESSFUL_CALL_PROMPT);
    expect(startHere).toContain(MCP_SERVER_NAME);
    expect(startHere).toContain('query_fpf_spec');
  });

  it('keeps direct wiki-to-MCP markdown setup links constrained to the bridge page', async () => {
    const bridge = await readFile(resolve(process.cwd(), 'docs/connect-mcp.md'), 'utf8');
    const directBridgeLinks = bridge.match(/\]\(https:\/\/mcp\.fpf\.sh\/\)/g) ?? [];
    expect(directBridgeLinks).toHaveLength(1);

    const docsRoot = resolve(process.cwd(), 'docs');
    const files = await readdir(docsRoot, { withFileTypes: true });
    for (const file of files) {
      if (!file.isFile() || !file.name.endsWith('.md') || file.name === 'connect-mcp.md') {
        continue;
      }
      const markdown = await readFile(resolve(docsRoot, file.name), 'utf8');
      // Operator runbooks may mention status or endpoint literals as evidence;
      // public setup/home links should go through the compatibility bridge.
      expect(markdown).not.toMatch(/\]\(https:\/\/mcp\.fpf\.sh\/(?:#[^)]+)?\)/);
      expect(markdown).not.toMatch(/MCP setup:\s+https:\/\/mcp\.fpf\.sh\/(?=\s|$)/);
    }
  });

  it('documents the FPF vs MCP explainer contract for wiki surfaces', () => {
    expect(FPF_VS_MCP_EXPLAINER_MARKDOWN).toContain('not agent memory');
    expect(FPF_VS_MCP_EXPLAINER_MARKDOWN).toContain(MCP_SERVER_NAME);
  });

  it('keeps the interface contract card aligned with public tool and schema contracts', () => {
    const contractToolNames = FPF_REFERENCE_INTERFACE_CONTRACT.publicTools.map((tool) => tool.name);

    expect(contractToolNames).toEqual([...PUBLIC_MCP_TOOLS]);
    expect(FPF_REFERENCE_INTERFACE_CONTRACT.canonicalEndpoint).toBe(HOSTED_MCP_ENDPOINT);
    expect(FPF_REFERENCE_INTERFACE_CONTRACT.legacyEndpoint).toBe(LEGACY_HOSTED_MCP_ENDPOINT);
    expect(FPF_REFERENCE_INTERFACE_CONTRACT.nonAdmissibleUse.join('\n')).toContain(
      'agent memory',
    );
    expect(FPF_REFERENCE_INTERFACE_CONTRACT.freshnessSemantics.join('\n')).toContain(
      'not global upstream currentness',
    );

    for (const tool of FPF_REFERENCE_INTERFACE_CONTRACT.publicTools) {
      expect(toolContracts[tool.inputSchema as keyof typeof toolContracts]).toBeDefined();
      expect(toolContracts[tool.outputSchema as keyof typeof toolContracts]).toBeDefined();
    }
  });

  it('keeps the hosted interface contract section aligned with canonical interface contract copy', () => {
    const interfaceContract = renderHostedHomePage();

    expect(interfaceContract).toContain(HOSTED_MCP_ENDPOINT);
    expect(interfaceContract).toContain(LEGACY_HOSTED_MCP_ENDPOINT);
    expect(interfaceContract).toContain(MCP_SERVER_NAME);
    expect(interfaceContract).toContain('not agent memory');
    expect(interfaceContract).toContain('not global upstream currentness');

    const normalizedInterfaceContract = interfaceContract.toLowerCase();
    for (const use of FPF_REFERENCE_INTERFACE_CONTRACT.admissibleUse) {
      expect(normalizedInterfaceContract).toContain(use.toLowerCase());
    }
    for (const use of FPF_REFERENCE_INTERFACE_CONTRACT.nonAdmissibleUse) {
      expect(normalizedInterfaceContract).toContain(use.toLowerCase());
    }

    for (const item of FPF_REFERENCE_INTERFACE_CONTRACT.acceptanceTests) {
      expect(interfaceContract).toContain(item);
    }
    for (const item of FPF_REFERENCE_INTERFACE_CONTRACT.outputExpectation) {
      expect(interfaceContract).toContain(item);
    }
    // The doc wraps code terms in backticks that the canonical strings omit,
    // so strip them before exact-wording comparison.
    const plainInterfaceContract = interfaceContract
      .replaceAll('<code>', '')
      .replaceAll('</code>', '');
    for (const ref of FPF_REFERENCE_INTERFACE_CONTRACT.governingFpf) {
      expect(interfaceContract).toContain(`<code>${ref.id}</code>`);
      expect(plainInterfaceContract).toContain(ref.purpose);
    }
    for (const item of FPF_REFERENCE_INTERFACE_CONTRACT.relianceGate) {
      expect(plainInterfaceContract).toContain(item);
    }
    for (const item of FPF_REFERENCE_INTERFACE_CONTRACT.freshnessSemantics) {
      expect(plainInterfaceContract).toContain(item);
    }
    for (const tool of FPF_REFERENCE_INTERFACE_CONTRACT.publicTools) {
      expect(interfaceContract).toContain(`<code>${tool.name}</code>`);
      expect(interfaceContract).toContain(tool.inputSchema);
      expect(interfaceContract).toContain(tool.outputSchema);
    }
  });
});
