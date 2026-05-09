import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

import type { createMcpTools, FpfMcpTool, FpfMcpToolMap } from './tools.js';

export interface FpfMcpServerOptions {
  name: string;
  version: string;
  description: string;
  tools: FpfMcpToolMap;
}

export class FpfMcpServer {
  constructor(private readonly options: FpfMcpServerOptions) {}

  async startStdio(): Promise<void> {
    const server = this.createSdkServer();
    await server.connect(new StdioServerTransport());
  }

  async handleStreamableHttp(request: Request): Promise<Response> {
    const transport = new WebStandardStreamableHTTPServerTransport({
      enableJsonResponse: true,
    });
    // The SDK Protocol owns exactly one transport and throws on reconnect,
    // so each Streamable HTTP request gets a distinct server instance.
    const server = this.createSdkServer();
    await server.connect(transport);
    return transport.handleRequest(request);
  }

  createSdkServer(): McpServer {
    const server = new McpServer({
      name: this.options.name,
      version: this.options.version,
    });

    for (const tool of Object.values(this.options.tools)) {
      registerFpfTool(server, tool);
    }

    return server;
  }
}

export function createMcpServerSet(
  tools: ReturnType<typeof createMcpTools>,
) {
  const fpfMemory = new FpfMcpServer({
    name: 'fpf_memory',
    version: '1.0.0',
    description: 'Local vectorless MCP runtime for the FPF spec with full tool surface.',
    tools: tools.fpfMcpTools,
  });

  const fpfMemoryPublic = new FpfMcpServer({
    name: 'fpf_memory',
    version: '1.0.0',
    description:
      'FPF spec query runtime with public discovery surface (browse, search, ask, query, read, status).',
    tools: tools.fpfPublicTools,
  });

  return {
    fpfMemory,
    fpfMemoryPublic,
  };
}

function registerFpfTool(server: McpServer, tool: FpfMcpTool): void {
  server.registerTool(
    tool.id,
    {
      description: tool.description,
      inputSchema: tool.inputSchema,
      outputSchema: tool.outputSchema,
    },
    async (input) => {
      const structuredContent = await tool.execute(input);
      return {
        structuredContent,
        content: [
          {
            type: 'text',
            text: renderToolContent(tool.id, structuredContent),
          },
        ],
      } satisfies CallToolResult;
    },
  );
}

function renderToolContent(
  toolId: string,
  structuredContent: Record<string, unknown>,
): string {
  const markdown = structuredContent.markdown;
  if (typeof markdown === 'string' && toolId === 'ask_fpf') {
    return markdown;
  }

  const answer = structuredContent.answer;
  if (typeof answer === 'string') {
    return answer;
  }

  const nodeId = structuredContent.nodeId;
  if (toolId === 'read_fpf_doc' && typeof nodeId === 'string') {
    return `read_fpf_doc returned markdown for ${nodeId} in structuredContent.markdown.`;
  }

  const status = structuredContent.status;
  const summary = status ? ` status=${String(status)}` : '';
  return `${toolId} returned structured content.${summary}`;
}
