import type { IncomingHttpHeaders, IncomingMessage, ServerResponse } from 'node:http';
import { Readable } from 'node:stream';
import type { ReadableStream as NodeReadableStream } from 'node:stream/web';

import { createHostedComposition } from '../composition/hosted.js';

const { app } = createHostedComposition(process.env);

export default async function handler(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  const webRequest = toWebRequest(request);
  const webResponse = await app.fetch(webRequest);
  await sendWebResponse(response, webResponse);
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
  await new Promise<void>((resolve, reject) => {
    nodeStream.on('error', reject);
    response.on('error', reject);
    response.on('finish', resolve);
    nodeStream.pipe(response);
  });
}

function firstHeader(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
