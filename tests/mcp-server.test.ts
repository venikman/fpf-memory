import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import readline from 'node:readline';

import { afterEach, describe, expect, it } from '@rstest/core';

import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';
import { createMastraRuntime } from '../src/mastra/index.js';

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
    // Spawn failures (e.g. binary not on PATH) emit 'error' without ever
    // firing 'exit' — reject pending requests so the test fails fast
    // instead of blocking on the 15s request timeout.
    this.child.on('error', (err) => {
      for (const { reject, timeout } of this.pending.values()) {
        clearTimeout(timeout);
        reject(new Error(`MCP stdio spawn failed: ${err.message}\n${this.stderr.join('')}`));
      }
      this.pending.clear();
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

    // Escalate to SIGKILL if the child ignores SIGTERM so afterEach never
    // blocks the whole test process on an unresponsive MCP server.
    await new Promise<void>((resolve) => {
      const killTimer = setTimeout(() => {
        this.child.kill('SIGKILL');
        resolve();
      }, 3_000);
      this.child.once('exit', () => {
        clearTimeout(killTimer);
        resolve();
      });
      this.child.kill();
    });
  }

  private handleLine(line: string): void {
    const trimmed = line.trim();
    if (!trimmed) {
      return;
    }

    // The MCP server occasionally emits non-JSON banner lines. A JSON.parse
    // throw here would crash the harness without ever rejecting the pending
    // request — swallow, log, and keep listening.
    let message: JsonRpcResponse;
    try {
      message = JSON.parse(trimmed) as JsonRpcResponse;
    } catch {
      this.stderr.push(`[non-JSON stdout] ${line}\n`);
      return;
    }
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

  async function startHarness(surface: 'public' | 'full' = 'full'): Promise<StdioMcpHarness> {
    const tempDir = await mkdtemp(resolve(tmpdir(), 'fpf-mcp-stdio-'));
    tempDirs.push(tempDir);

    const child = spawn('bun', ['src/mastra/stdio.ts'], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        // Isolate the child from any ambient host/CI state so the test is
        // hermetic: no live LM Studio call, a per-harness artifact dir
        // (avoids sharing `.runtime/fpf-index` with parallel workers), a
        // pinned spec source, and no persistent session cache.
        FPF_LOCAL_LLM_BASE_URL: '',
        FPF_LOCAL_LLM_MODEL: '',
        FPF_LOCAL_LLM_API_KEY: '',
        FPF_SPEC_SOURCE_PATH: resolve(process.cwd(), DEFAULT_SOURCE_PATH),
        FPF_RUNTIME_ARTIFACT_DIR: resolve(tempDir, 'fpf-index'),
        FPF_PERSIST_SESSION_CACHE: 'false',
        ...(surface === 'full' ? { FPF_MCP_SURFACE: 'full' } : {}),
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
      'browse_fpf_catalog',
      'search_fpf',
      'ask_fpf',
      'query_fpf_spec',
      'read_fpf_doc',
      'get_fpf_index_status',
      'inspect_fpf_node',
      'inspect_fpf_anchor',
      'expand_fpf_citations',
      'trace_fpf_path',
      'refresh_fpf_index',
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

  it('defaults to public tools when FPF_MCP_SURFACE is unset', async () => {
    const harness = await startHarness('public');
    await initializeHarness(harness);

    const toolsList = await harness.request('tools/list');
    const tools = (toolsList.result?.tools ?? []) as Array<{ name: string }>;
    expect(tools.map((tool) => tool.name)).toEqual([
      'browse_fpf_catalog',
      'search_fpf',
      'ask_fpf',
      'query_fpf_spec',
      'read_fpf_doc',
      'get_fpf_index_status',
    ]);
  });

  it('initializes the Mastra runtime', () => {
    const mastra = createMastraRuntime();
    expect(mastra).toBeDefined();
  });
});

function asToolPayload(message: JsonRpcResponse): Record<string, unknown> {
  expect(message.error).toBeUndefined();
  const result = message.result ?? {};
  expect(result.isError).not.toBe(true);
  return (result.structuredContent ?? {}) as Record<string, unknown>;
}
