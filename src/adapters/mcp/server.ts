import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import type { IncomingMessage, ServerResponse } from 'node:http';

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

  async handleNodeStreamableHttp(
    request: IncomingMessage,
    response: ServerResponse,
  ): Promise<void> {
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
    return renderReadFpfDocFallback(structuredContent);
  }

  const status = structuredContent.status;
  const summary = status ? ` status=${String(status)}` : '';
  return `${toolId} returned structured content.${summary}`;
}

/**
 * Build the text-content fallback for `read_fpf_doc`. Earlier this
 * was a single sentence pointing at structuredContent.markdown;
 * callers reading only the text channel got nothing actionable.
 *
 * The fallback now mirrors the structured payload: title, node ID,
 * canonical doc paths, full markdown size, and the first few
 * outline headings so a reader can decide whether to fetch the
 * full body or follow the docRef link.
 */
function renderReadFpfDocFallback(
  structuredContent: Record<string, unknown>,
): string {
  const nodeId = stringField(structuredContent.nodeId);
  const title = stringField(structuredContent.title);
  const status = stringField(structuredContent.status);

  if (!nodeId || status === 'not_found') {
    return `read_fpf_doc: selector did not resolve to a known FPF node.${
      status ? ` status=${status}` : ''
    }`;
  }

  const docRef = (structuredContent.docRef ?? {}) as Record<string, unknown>;
  const staticPath = stringField(docRef.staticPath);
  const markdownPath = stringField(docRef.markdownPath);
  const markdownChars = numberField(structuredContent.markdownChars);
  const truncated = structuredContent.truncated === true;
  const headings = arrayOfStrings(structuredContent.headings);
  const preview = stringField(structuredContent.preview);

  const lines: string[] = [];
  lines.push(`# ${title ?? nodeId}`);
  const meta: string[] = [`node \`${nodeId}\``];
  if (staticPath) meta.push(`page \`${staticPath}\``);
  if (markdownPath) meta.push(`markdown \`${markdownPath}\``);
  if (markdownChars !== undefined) {
    meta.push(`${markdownChars} chars${truncated ? ' (truncated)' : ''}`);
  }
  lines.push(meta.join(' · '));

  if (headings && headings.length > 0) {
    lines.push('');
    lines.push('Outline:');
    for (const heading of headings.slice(0, 8)) {
      lines.push(`- ${heading}`);
    }
    if (headings.length > 8) {
      lines.push(`- … (${headings.length - 8} more)`);
    }
  }

  if (preview) {
    lines.push('');
    lines.push(preview);
  } else {
    lines.push('');
    lines.push('Full markdown is in `structuredContent.markdown`.');
  }

  return lines.join('\n');
}

function stringField(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function numberField(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function arrayOfStrings(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const filtered = value.filter((item): item is string => typeof item === 'string');
  return filtered.length > 0 ? filtered : undefined;
}
