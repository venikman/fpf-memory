import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import readline from 'node:readline';

import { afterEach, describe, expect, it } from '@rstest/core';

import { createHonoMastraRuntime } from '../src/mastra.js';

interface JsonRpcResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  result?: Record<string, unknown>;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

class StdioMcpHarness {
  private readonly pending = new Map<
    number,
    {
      resolve: (value: JsonRpcResponse) => void;
      reject: (error: Error) => void;
      timeout: NodeJS.Timeout;
    }
  >();
  private readonly rl: readline.Interface;
  private nextId = 1;
  readonly stderr: string[] = [];

  constructor(private readonly child: ChildProcessWithoutNullStreams) {
    this.rl = readline.createInterface({
      input: child.stdout,
      crlfDelay: Infinity,
    });
    this.rl.on('line', (line) => this.handleLine(line));
    this.child.stderr.on('data', (chunk) => {
      this.stderr.push(chunk.toString());
    });
    this.child.once('exit', (code, signal) => {
      for (const { reject, timeout } of this.pending.values()) {
        clearTimeout(timeout);
        reject(
          new Error(
            `MCP stdio process exited before responding (code=${code ?? 'null'}, signal=${signal ?? 'null'})\n${this.stderr.join('')}`,
          ),
        );
      }
      this.pending.clear();
    });
  }

  async request(method: string, params?: Record<string, unknown>): Promise<JsonRpcResponse> {
    const id = this.nextId++;
    const payload = JSON.stringify({
      jsonrpc: '2.0',
      id,
      method,
      ...(params ? { params } : {}),
    });

    const response = new Promise<JsonRpcResponse>((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(
          new Error(`Timed out waiting for MCP response to ${method}\n${this.stderr.join('')}`),
        );
      }, 15_000);
      this.pending.set(id, { resolve, reject, timeout });
    });

    this.child.stdin.write(`${payload}\n`);
    return response;
  }

  notify(method: string, params?: Record<string, unknown>): void {
    const payload = JSON.stringify({
      jsonrpc: '2.0',
      method,
      ...(params ? { params } : {}),
    });
    this.child.stdin.write(`${payload}\n`);
  }

  async close(): Promise<void> {
    this.rl.close();
    if (this.child.exitCode !== null) {
      return;
    }

    await new Promise<void>((resolve) => {
      this.child.once('exit', () => resolve());
      this.child.kill();
    });
  }

  private handleLine(line: string): void {
    const trimmed = line.trim();
    if (!trimmed) {
      return;
    }

    const message = JSON.parse(trimmed) as JsonRpcResponse;
    const id = typeof message.id === 'number' ? message.id : undefined;
    if (id === undefined) {
      return;
    }

    const pending = this.pending.get(id);
    if (!pending) {
      return;
    }

    clearTimeout(pending.timeout);
    this.pending.delete(id);
    pending.resolve(message);
  }
}

describe('Mastra MCP server', () => {
  const harnesses: StdioMcpHarness[] = [];
  const tempDirs: string[] = [];

  afterEach(async () => {
    await Promise.all(harnesses.splice(0).map((harness) => harness.close()));
    await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
  });

  async function startHarness(): Promise<StdioMcpHarness> {
    const tempDir = await mkdtemp(resolve(tmpdir(), 'fpf-mcp-stdio-'));
    tempDirs.push(tempDir);

    const child = spawn('bun', ['src/mcp-stdio.ts'], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        FPF_MASTRA_LOG_PATH: resolve(tempDir, 'mastra.log'),
        FPF_MASTRA_OBSERVABILITY_PATH: resolve(tempDir, 'mastra-observability.json'),
      },
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    const harness = new StdioMcpHarness(child);
    harnesses.push(harness);
    return harness;
  }

  async function initializeHarness(harness: StdioMcpHarness): Promise<void> {
    const initialize = await harness.request('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: {
        name: 'rstest',
        version: '0.9.7',
      },
    });

    expect(initialize.error).toBeUndefined();
    expect(initialize.result?.protocolVersion).toBe('2024-11-05');
    expect(initialize.result?.serverInfo).toEqual({
      name: 'fpf_memory',
      version: '1.0.0',
    });
    harness.notify('notifications/initialized');
  }

  it('starts stdio through Mastra and answers initialize plus ping', async () => {
    const harness = await startHarness();
    await initializeHarness(harness);

    const ping = await harness.request('ping');
    expect(ping.error).toBeUndefined();
    expect(ping.result).toEqual({});
  });

  it('lists the canonical snake_case tools with plain JSON Schemas', async () => {
    const harness = await startHarness();
    await initializeHarness(harness);

    const toolsList = await harness.request('tools/list');
    expect(toolsList.error).toBeUndefined();

    const tools = (toolsList.result?.tools ?? []) as Array<{
      name: string;
      inputSchema: Record<string, unknown>;
    }>;

    expect(tools.map((tool) => tool.name)).toEqual([
      'refresh_fpf_index',
      'get_fpf_index_status',
      'query_fpf_spec',
      'trace_fpf_path',
      'inspect_fpf_node',
      'read_fpf_doc',
      'inspect_fpf_anchor',
      'expand_fpf_citations',
      'ask_fpf',
    ]);

    for (const tool of tools) {
      expect(tool.name).toMatch(/^[a-z0-9_]+$/);
      expect(typeof tool.inputSchema).toBe('object');
      expect(tool.inputSchema).not.toBe(null);
      expect(tool.inputSchema['~standard']).toBeUndefined();
    }

    const statusSchema = tools.find((tool) => tool.name === 'get_fpf_index_status')?.inputSchema;
    expect(statusSchema?.type).toBe('object');
    expect(statusSchema?.properties).toEqual({});
    expect(statusSchema?.additionalProperties).toBe(false);
  });

  it('serves status, query, and ask surfaces without schema failures', async () => {
    const harness = await startHarness();
    await initializeHarness(harness);

    const status = await harness.request('tools/call', {
      name: 'get_fpf_index_status',
      arguments: {},
    });
    const statusPayload = asToolPayload(status);
    expect(typeof statusPayload.snapshotExists).toBe('boolean');
    expect(statusPayload.compilerMode).toBe('local_vectorless');

    const query = await harness.request('tools/call', {
      name: 'query_fpf_spec',
      arguments: {
        question: 'What is U.BoundedContext?',
      },
    });
    const queryPayload = asToolPayload(query);
    expect(queryPayload.mode).toBe('verbose');
    expect((queryPayload.ids as string[])).toContain('A.1.1');
    expect(
      (queryPayload.citations as string[]).some((citation) => citation.startsWith('A.1.1')),
    ).toBe(true);

    const trace = await harness.request('tools/call', {
      name: 'trace_fpf_path',
      arguments: {
        question: 'What is U.BoundedContext?',
      },
    });
    const tracePayload = asToolPayload(trace);
    expect(tracePayload.mode).toBe('compact');

    const readDoc = await harness.request('tools/call', {
      name: 'read_fpf_doc',
      arguments: {
        selector: 'A.1.1',
      },
    });
    const readDocPayload = asToolPayload(readDoc);
    expect(readDocPayload.nodeId).toBe('A.1.1');
    expect(readDocPayload.markdown).toContain('# U.BoundedContext: The Semantic Frame');

    const ask = await harness.request('tools/call', {
      name: 'ask_fpf',
      arguments: {
        question: 'Give me a checklist for how to model my project information system.',
      },
    });
    const askPayload = asToolPayload(ask);
    expect(askPayload.mode).toBe('verbose');
    expect(askPayload.markdown).toContain('## Result');
    expect(askPayload.markdown).toContain('## Grounding');
  });

  it('initializes the hosted Mastra runtime on the Hono engine', async () => {
    const runtime = await createHonoMastraRuntime();

    expect(typeof runtime.app.fetch).toBe('function');
    expect(runtime.mastra).toBeDefined();
    expect(runtime.server).toBeDefined();
  });
});

function asToolPayload(message: JsonRpcResponse): Record<string, unknown> {
  expect(message.error).toBeUndefined();
  const result = message.result ?? {};
  expect(result.isError).not.toBe(true);
  return (result.structuredContent ?? {}) as Record<string, unknown>;
}
