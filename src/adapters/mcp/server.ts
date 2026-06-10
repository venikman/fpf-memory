import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import type { IncomingMessage, ServerResponse } from 'node:http';

import { renderToolContent } from './tool-text.js';
import type { createMcpTools, FpfMcpTool, FpfMcpToolMap } from './tools.js';

export interface FpfMcpServerOptions {
  name: string;
  version: string;
  description: string;
  instructions?: string;
  tools: FpfMcpToolMap;
}

export class FpfMcpServer {
  constructor(private readonly options: FpfMcpServerOptions) {}

  async startStdio(): Promise<void> {
    const server = this.createSdkServer();
    await server.connect(new StdioServerTransport());
  }

  async handleStreamableHttp(request: Request): Promise<Response> {
    if (isStandaloneMcpGet(request.method)) {
      return createMcpGetDisabledResponse();
    }

    const transport = new WebStandardStreamableHTTPServerTransport({
      enableJsonResponse: true,
    });
    // The SDK Protocol owns exactly one transport and throws on reconnect,
    // so each Streamable HTTP request gets a distinct server instance.
    const server = this.createSdkServer();
    await server.connect(transport);
    return transport.handleRequest(request);
  }

  async handleNodeStreamableHttp(
    request: IncomingMessage,
    response: ServerResponse,
  ): Promise<void> {
    if (isStandaloneMcpGet(request.method)) {
      writeMcpGetDisabledNodeResponse(response);
      return;
    }

    const transport = new StreamableHTTPServerTransport({
      enableJsonResponse: true,
    });
    // Vercel functions expose Node request/response objects. Use the SDK's
    // Node adapter there so streaming headers and request bodies are flushed
    // through the platform's native path instead of a manual Web conversion.
    const server = this.createSdkServer();
    await server.connect(transport);
    await transport.handleRequest(request, response);
  }

  createSdkServer(): McpServer {
    const server = new McpServer({
      name: this.options.name,
      version: this.options.version,
    }, {
      instructions: this.options.instructions,
    });

    for (const tool of Object.values(this.options.tools)) {
      registerFpfTool(server, tool);
    }

    return server;
  }
}

export function isStandaloneMcpGet(method: string | undefined): boolean {
  return method?.toUpperCase() === 'GET';
}

export function createMcpGetDisabledResponse(): Response {
  return new Response(JSON.stringify(createMcpGetDisabledPayload()), {
    status: 405,
    headers: mcpGetDisabledHeaders(),
  });
}

export function writeMcpGetDisabledNodeResponse(response: ServerResponse): void {
  response.statusCode = 405;
  for (const [key, value] of Object.entries(mcpGetDisabledHeaders())) {
    response.setHeader(key, value);
  }
  response.end(JSON.stringify(createMcpGetDisabledPayload()));
}

export function createMcpServerSet(
  tools: ReturnType<typeof createMcpTools>,
) {
  const fpfReference = new FpfMcpServer({
    name: 'fpf_reference',
    version: '1.0.0',
    description: 'Local vectorless MCP reference runtime for the FPF spec with full tool surface.',
    instructions: FPF_REFERENCE_SERVER_INSTRUCTIONS,
    tools: tools.fpfMcpTools,
  });

  const fpfReferencePublic = new FpfMcpServer({
    name: 'fpf_reference',
    version: '1.0.0',
    description:
      'FPF spec reference runtime with public discovery surface (browse, search, ask, query, read, status).',
    instructions: FPF_REFERENCE_SERVER_INSTRUCTIONS,
    tools: tools.fpfPublicTools,
  });

  return {
    fpfReference,
    fpfReferencePublic,
  };
}

function mcpGetDisabledHeaders(): Record<string, string> {
  return {
    Allow: 'POST, DELETE',
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
  };
}

function createMcpGetDisabledPayload() {
  return {
    jsonrpc: '2.0',
    error: {
      code: -32000,
      message:
        'Standalone MCP SSE GET is disabled on this endpoint; use POST Streamable HTTP JSON-RPC requests.',
    },
    id: null,
  } as const;
}

const FPF_REFERENCE_SERVER_INSTRUCTIONS = [
  'Use fpf_reference only for First Principles Framework lookup and grounding:',
  'exact FPF IDs, canonical terms, route suggestions, citations, exact generated docs, and index freshness.',
  'Do not treat this MCP server as the workflow owner, persistent agent memory, project policy, or job-local context source.',
  'For planning, review, shipping, QA, browser work, repo memory, or virtual-team roles, defer to active Claude Code skills and project instructions such as GStack and Superpowers.',
  'Prefer get_fpf_index_status before trust-sensitive FPF use, query_fpf_spec for route and ID discovery, and read_fpf_doc for exact wording.',
].join(' ');

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

