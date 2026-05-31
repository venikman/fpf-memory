import type { IncomingHttpHeaders, IncomingMessage, ServerResponse } from 'node:http';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import type { ReadableStream as NodeReadableStream } from 'node:stream/web';

import {
  createHostedComposition,
  createHostedErrorLogger,
  HOSTED_FPF_STATUS_ROUTE,
  HOSTED_MCP_ROUTES,
  tryHandleHostedMcpNodeGuard,
  writeHostedStatusNodeResponse,
} from '../composition/hosted.js';

type HostedComposition = ReturnType<typeof createHostedComposition>;

let hostedCompositionPromise: Promise<HostedComposition> | undefined;

export default async function handler(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  try {
    if (isMcpRoute(request)) {
      if (tryHandleHostedMcpNodeGuard(request, response)) {
        return;
      }

      const { mcpServer } = await getHostedComposition();
      await mcpServer.handleNodeStreamableHttp(request, response);
      return;
    }

    if (isHostedStatusRoute(request)) {
      await writeHostedStatusNodeResponse(response);
      return;
    }

    const { app } = await getHostedComposition();
    const webRequest = toWebRequest(request);
    const webResponse = await app.fetch(webRequest);
    await sendWebResponse(response, webResponse);
  } catch (error) {
    await logHandlerError(error);
    if (!response.headersSent) {
      response.statusCode = 500;
      response.setHeader('content-type', 'application/json; charset=utf-8');
      response.end(JSON.stringify({ error: 'internal_server_error' }));
      return;
    }
    response.destroy(error instanceof Error ? error : undefined);
  }
}

function getHostedComposition(): Promise<HostedComposition> {
  hostedCompositionPromise ??= Promise.resolve()
    .then(() => createHostedComposition(process.env))
    .catch((error) => {
      hostedCompositionPromise = undefined;
      throw error;
    });
  return hostedCompositionPromise;
}

function isMcpRoute(request: IncomingMessage): boolean {
  const url = new URL(request.url ?? '/', 'https://localhost');
  return HOSTED_MCP_ROUTES.includes(
    url.pathname as (typeof HOSTED_MCP_ROUTES)[number],
  );
}

function isHostedStatusRoute(request: IncomingMessage): boolean {
  const url = new URL(request.url ?? '/', 'https://localhost');
  return url.pathname === HOSTED_FPF_STATUS_ROUTE;
}

function toWebRequest(request: IncomingMessage): Request {
  const method = request.method ?? 'GET';
  const url = requestUrl(request);
  const headers = toHeaders(request.headers);
  const hasBody = method !== 'GET' && method !== 'HEAD';

  return new Request(url, {
    method,
    headers,
    body: hasBody ? Readable.toWeb(request) : undefined,
    ...(hasBody ? { duplex: 'half' } : {}),
  } as RequestInit & { duplex?: 'half' });
}

function requestUrl(request: IncomingMessage): string {
  const headers = request.headers;
  const protocol = firstHeader(headers['x-forwarded-proto']) ?? 'https';
  const host = firstHeader(headers.host) ?? 'localhost';
  return `${protocol}://${host}${request.url ?? '/'}`;
}

function toHeaders(input: IncomingHttpHeaders): Headers {
  const headers = new Headers();
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) {
      continue;
    }
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(key, item);
      }
      continue;
    }
    headers.set(key, value);
  }
  return headers;
}

async function sendWebResponse(
  response: ServerResponse,
  webResponse: Response,
): Promise<void> {
  response.statusCode = webResponse.status;
  response.statusMessage = webResponse.statusText;
  webResponse.headers.forEach((value, key) => {
    response.setHeader(key, value);
  });

  if (!webResponse.body) {
    response.end();
    return;
  }

  const nodeStream = Readable.fromWeb(
    webResponse.body as unknown as NodeReadableStream,
  );
  await pipeline(nodeStream, response);
}

function firstHeader(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

async function logHandlerError(error: unknown): Promise<void> {
  const logger = createHostedErrorLogger(process.env);
  logger.error('Vercel MCP function failed', {
    error: normalizeErrorMessage(error),
    cause: error instanceof Error ? error.stack ?? error : error,
  });
  await logger.flush?.();
}

function normalizeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}
