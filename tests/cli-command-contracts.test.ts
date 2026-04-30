import { describe, expect, it } from '@rstest/core';

import { parseCliCommand } from '../src/adapters/cli/command-contracts.js';

describe('CLI command contracts', () => {
  it('keeps option values out of positional query questions', () => {
    const command = parseCliCommand([
      'query',
      'What',
      'is',
      'U.BoundedContext?',
      '--mode',
      'compact',
      '--session',
      's1',
    ]);

    expect(command).toEqual({
      kind: 'query',
      question: 'What is U.BoundedContext?',
      mode: 'compact',
      forceRefresh: false,
      sessionId: 's1',
    });
  });

  it('keeps option values out of positional inspect selectors', () => {
    const command = parseCliCommand(['inspect', 'A.1.1', '--kind', 'id']);

    expect(command).toEqual({
      kind: 'inspect',
      selector: 'A.1.1',
      selectorKind: 'id',
      forceRefresh: false,
    });
  });

  it('rejects missing explicit flag values instead of consuming the next flag', () => {
    let thrown: unknown;
    try {
      parseCliCommand(['query', '--question', '--mode', 'verbose']);
    } catch (error) {
      thrown = error;
    }

    expect(thrown).toBeDefined();
  });

  it('parses evaluate-work defaults', () => {
    const command = parseCliCommand(['evaluate-work']);

    expect(command).toEqual({
      kind: 'evaluate-work',
      target: 'current-pr',
      baseRef: 'origin/main',
      format: 'markdown',
      out: undefined,
      specPath: undefined,
    });
  });

  it('parses evaluate-work options', () => {
    const command = parseCliCommand([
      'evaluate-work',
      '--target',
      'working-tree',
      '--base',
      'main',
      '--format',
      'json',
      '--spec',
      '/tmp/FPF-Spec.md',
      '--out',
      'reports/fpf-work.json',
    ]);

    expect(command).toEqual({
      kind: 'evaluate-work',
      target: 'working-tree',
      baseRef: 'main',
      format: 'json',
      specPath: '/tmp/FPF-Spec.md',
      out: 'reports/fpf-work.json',
    });
  });

  it('rejects invalid evaluate-work formats', () => {
    let thrown: unknown;
    try {
      parseCliCommand(['evaluate-work', '--format', 'html']);
    } catch (error) {
      thrown = error;
    }

    expect(thrown).toBeDefined();
  });
});
