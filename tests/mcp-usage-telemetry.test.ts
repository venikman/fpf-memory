import { describe, expect, it } from '@rstest/core';
import { z } from 'zod';

import type { RuntimeLogger } from '../src/adapters/infra/logging/runtime-logger.js';
import type { FpfMcpTool } from '../src/adapters/mcp/tools.js';
import {
  createMcpUsageTelemetryEvent,
  withMcpUsageTelemetry,
} from '../src/adapters/mcp/usage-telemetry.js';

describe('MCP usage telemetry', () => {
  it('summarizes query usage without logging raw questions or answer text', () => {
    const rawQuestion = 'Which private customer rollout should use bounded context?';
    const rawAnswer = 'Private customer rollout should not appear in telemetry.';

    const event = createMcpUsageTelemetryEvent({
      toolName: 'query_fpf_spec',
      outcome: 'ok',
      durationMs: 12,
      input: {
        question: rawQuestion,
        mode: 'proof',
        sessionId: 'private-session-id',
      },
      output: {
        question: rawQuestion,
        answer: rawAnswer,
        mode: 'proof',
        status: 'ok',
        ids: ['A.1.1', 'route:project-alignment'],
        candidateIds: ['A.15'],
        citations: ['A.1.1:4.1'],
        constraints: ['Keep raw prompt private.'],
        gaps: [],
      },
    });

    expect(event.toolName).toBe('query_fpf_spec');
    expect(event.schemaVersion).toBe(3);
    expect(event.input).toEqual({
      intentCategory: 'pattern_lookup',
      mode: 'proof',
      question: { shape: 'short' },
      sessionPresent: true,
    });
    expect(event.output?.servedIds).toEqual(['A.1.1', 'route:project-alignment']);
    expect(event.output?.servedPatternIds).toEqual(['A.1.1']);
    expect(event.output?.candidateIds).toEqual(['A.15']);
    expect(event.output?.candidatePatternIds).toEqual(['A.15']);
    expect(event.output?.citedIds).toEqual(['A.1.1']);
    expect(event.output?.resolvedIds).toEqual(['A.1.1', 'route:project-alignment']);
    expect(event.output?.idsCount).toBe(2);
    expect(event.output?.candidateIdsCount).toBe(1);
    expect(event.output?.citationsCount).toBe(1);
    expect(event.privacy).toEqual({
      rawInputLogged: false,
      rawQuestionLogged: false,
      rawSelectorLogged: false,
      rawOutputTextLogged: false,
    });

    const serialized = JSON.stringify(event);
    expect(serialized).not.toContain(rawQuestion);
    expect(serialized).not.toContain(rawAnswer);
    expect(serialized).not.toContain('private-session-id');
    expect(serialized).not.toContain('Keep raw prompt private');
  });

  it('logs resolved document IDs while redacting raw selectors', async () => {
    const records: Array<{ message: string; data?: Record<string, unknown> }> = [];
    const logger: RuntimeLogger = {
      debug: () => undefined,
      info: (message, data) => records.push({ message, data }),
      warn: (message, data) => records.push({ message, data }),
      error: () => undefined,
    };
    const rawSelector = 'private phrase that should not appear';
    const tool: FpfMcpTool = {
      id: 'read_fpf_doc',
      description: 'test tool',
      inputSchema: z.any(),
      outputSchema: z.record(z.string(), z.unknown()),
      execute: async () => ({
        selector: rawSelector,
        status: 'ok',
        resolvedAs: 'id',
        nodeId: 'A.1.1',
        title: 'U.BoundedContext: The Semantic Frame',
        markdown: 'full markdown body should not appear',
        headings: ['Heading one', 'Heading two'],
      }),
    };

    const instrumented = withMcpUsageTelemetry(tool, logger);
    await instrumented.execute({
      selector: rawSelector,
      mode: 'full',
      maxChars: 500,
    });

    expect(records.length).toBe(1);
    expect(records[0]?.message).toBe('MCP tool usage');
    expect(records[0]?.data?.input).toEqual({
      intentCategory: 'pattern_lookup',
      mode: 'full',
      maxChars: 500,
      selector: { shape: 'phrase' },
    });
    expect(records[0]?.data?.output).toEqual({
      status: 'ok',
      resolvedAs: 'id',
      resolvedIds: ['A.1.1'],
      resolvedIdCount: 1,
      resolvedPatternIds: ['A.1.1'],
      resolvedPatternIdCount: 1,
      servedIds: ['A.1.1'],
      servedIdCount: 1,
      servedPatternIds: ['A.1.1'],
      servedPatternIdCount: 1,
      docSurfaceIds: ['A.1.1'],
      docSurfaceIdCount: 1,
      docSurfacePatternIds: ['A.1.1'],
      docSurfacePatternIdCount: 1,
      headingsCount: 2,
    });

    const serialized = JSON.stringify(records);
    expect(serialized).not.toContain(rawSelector);
    expect(serialized).not.toContain('full markdown body');
    expect(serialized).not.toContain('U.BoundedContext: The Semantic Frame');
  });

  it('logs tool failures without leaking raw input or error messages', async () => {
    const records: Array<{ message: string; data?: Record<string, unknown> }> = [];
    const logger: RuntimeLogger = {
      debug: () => undefined,
      info: (message, data) => records.push({ message, data }),
      warn: (message, data) => records.push({ message, data }),
      error: () => undefined,
    };
    const rawQuery = 'secret failed search query';
    const tool: FpfMcpTool = {
      id: 'search_fpf',
      description: 'test tool',
      inputSchema: z.any(),
      outputSchema: z.record(z.string(), z.unknown()),
      execute: async () => {
        throw new Error(`failed on ${rawQuery}`);
      },
    };

    const instrumented = withMcpUsageTelemetry(tool, logger);
    await expect(instrumented.execute({ query: rawQuery })).rejects.toThrow(rawQuery);

    expect(records.length).toBe(1);
    expect(records[0]?.data?.outcome).toBe('error');
    expect(records[0]?.data?.input).toEqual({
      intentCategory: 'troubleshooting',
      query: { shape: 'short' },
    });
    expect(records[0]?.data?.error).toEqual({ name: 'Error' });

    const serialized = JSON.stringify(records);
    expect(serialized).not.toContain(rawQuery);
  });

  it('categorizes setup questions without logging the raw question', () => {
    const rawQuestion = 'How do I connect fpf_reference MCP in Claude?';

    const event = createMcpUsageTelemetryEvent({
      toolName: 'ask_fpf',
      outcome: 'ok',
      durationMs: 15,
      input: {
        question: rawQuestion,
      },
      output: {
        status: 'ok',
        servedPatternIds: ['A.1'],
      },
    });

    expect(event.schemaVersion).toBe(3);
    expect(event.input).toEqual({
      intentCategory: 'adoption_setup',
      question: { shape: 'short' },
    });
    expect(JSON.stringify(event)).not.toContain(rawQuestion);
  });
});
