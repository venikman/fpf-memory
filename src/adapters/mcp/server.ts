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
