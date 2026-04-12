import { MCPServer } from '@mastra/mcp';

import { fpfMcpTools } from './tools.js';

export function createFpfMcpServer(): MCPServer {
  return new MCPServer({
    name: 'fpf_memory',
    version: '1.0.0',
    description:
      'Local vectorless MCP runtime for FPF-spec.md with refresh, query, trace, status, node inspect, direct doc read, anchor inspect, citation expansion, and markdown answer tools.',
    tools: fpfMcpTools,
  });
}

export const fpfMcpServer = createFpfMcpServer();

export async function startStdioMcpServer(): Promise<void> {
  await fpfMcpServer.startStdio();
}
