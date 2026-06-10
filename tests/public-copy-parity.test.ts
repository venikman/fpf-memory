import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

import { renderHostedHomePage } from '../src/adapters/hosted/home-page.js';
import {
  FIRST_SUCCESSFUL_CALL_HEADING,
  FIRST_SUCCESSFUL_CALL_PROMPT,
  FPF_VS_MCP_EXPLAINER_MARKDOWN,
  FPF_REFERENCE_INTERFACE_CONTRACT,
  HOSTED_MCP_ENDPOINT,
  HOSTED_MCP_STATUS_URL,
  LEGACY_HOSTED_MCP_ENDPOINT,
  MCP_SERVER_NAME,
  PUBLIC_MCP_TOOLS,
  WIKI_CONNECT_MCP_URL,
  WIKI_INTERFACE_CONTRACT_URL,
} from '../src/core/public-copy.js';
import * as toolContracts from '../src/mcp/tool-contracts.js';

describe('public adoption copy parity', () => {
  it('keeps connect-mcp.md aligned with the canonical SSOT strings', async () => {
    const connectMcp = await readFile(resolve(process.cwd(), 'docs/connect-mcp.md'), 'utf8');

    expect(connectMcp).toContain(`## ${FIRST_SUCCESSFUL_CALL_HEADING}`);
    expect(connectMcp).toContain(FIRST_SUCCESSFUL_CALL_PROMPT);
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
    expect(html).toContain(WIKI_INTERFACE_CONTRACT_URL);
    expect(html).toContain('stable FPF IDs');
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
    expect(startHere).toContain(FIRST_SUCCESSFUL_CALL_PROMPT);
    expect(startHere).toContain(MCP_SERVER_NAME);
    expect(startHere).toContain('query_fpf_spec');
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

  it('keeps interface-contract.md aligned with canonical interface contract copy', async () => {
    const interfaceContract = await readFile(
      resolve(process.cwd(), 'docs/interface-contract.md'),
      'utf8',
    );

    expect(interfaceContract).toContain(HOSTED_MCP_ENDPOINT);
    expect(interfaceContract).toContain(LEGACY_HOSTED_MCP_ENDPOINT);
    expect(interfaceContract).toContain(MCP_SERVER_NAME);
    expect(interfaceContract).toContain('source repo name `fpf-memory` is historical');
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
      expect(interfaceContract).toContain(`- ${item}`);
    }
    for (const item of FPF_REFERENCE_INTERFACE_CONTRACT.outputExpectation) {
      expect(interfaceContract).toContain(`- ${item}`);
    }
    // The doc wraps code terms in backticks that the canonical strings omit,
    // so strip them before exact-wording comparison.
    const plainInterfaceContract = interfaceContract.replaceAll('`', '');
    for (const ref of FPF_REFERENCE_INTERFACE_CONTRACT.governingFpf) {
      expect(interfaceContract).toContain(`\`${ref.id}\``);
      expect(plainInterfaceContract).toContain(ref.purpose);
    }
    for (const item of FPF_REFERENCE_INTERFACE_CONTRACT.relianceGate) {
      expect(plainInterfaceContract).toContain(item);
    }
    for (const item of FPF_REFERENCE_INTERFACE_CONTRACT.freshnessSemantics) {
      expect(plainInterfaceContract).toContain(item);
    }
    for (const tool of FPF_REFERENCE_INTERFACE_CONTRACT.publicTools) {
      expect(interfaceContract).toContain(`| \`${tool.name}\` |`);
      expect(interfaceContract).toContain(tool.inputSchema);
      expect(interfaceContract).toContain(tool.outputSchema);
    }
  });
});
