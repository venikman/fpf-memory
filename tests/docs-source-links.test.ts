import { describe, expect, it } from '@rstest/core';

import { buildDocsProjection } from '../src/core/documents.js';
import { compileFpfSource } from '../src/runtime/compiler.js';

function project(body: string) {
  const sourceText = [
    '**Part A - Fixture**',
    '| ID | Title | Status | Keywords | Dependencies |',
    '| --- | --- | --- | --- | --- |',
    '| A.1 | Reference fixture | Draft | links | |',
    '| B.5 | Canonical Reasoning Cycle | Draft | reasoning | |',
    '| C.28 | CausalUse-CAL | Draft | causality | |',
    '',
    '# A.1 - Reference fixture',
    '',
    body,
    '',
    '# B.5 - Canonical Reasoning Cycle',
    '',
    '## B.5:5.1 - A Counterexample Becomes a Constructive Mathematical Question',
    '',
    'Reasoning content.',
    '',
    '# C.28 - CausalUse-CAL: Causal-Use Questions, Identification, and Realizability',
    '',
    '## C.28:4 - Solution',
    '',
    '### C.28:4.4 - Identification result',
    '',
    'Identification content.',
  ].join('\n');
  const page = projectSource(sourceText).pagesByMarkdownPath['docs/generated/patterns/A.1.md'];
  expect(page).toBeDefined();
  return page!.markdown;
}

function projectSource(sourceText: string) {
  const { snapshot } = compileFpfSource({
    sourcePath: '/fixture/FPF-Spec.md',
    sourceHash: 'sha256:fixture',
    builtAt: '2026-10-09T00:00:00.000Z',
    sourceText,
  });
  return buildDocsProjection(snapshot);
}

describe('source links in generated docs', () => {
  // These destination shapes are from upstream 0c6ade27. Reference
  // definitions previously had their filenames corrupted by ID autolinking.
  const causalFile = 'C.28-CausalUse-CAL-Causal-Use-Questions-Causality-Ladder-Rungs-Identification-and-Realizability.md';
  const causalFragment = 'c2844---identification-result';
  const causalUrl = '/generated/patterns/C.28#identification-result';

  it('projects extracted-pattern reference definitions and protects their labels', () => {
    const markdown = project([
      'Read [C.28][fpf-c28-4-4-ref] and [B.5][reasoning].',
      '',
      `[fpf-c28-4-4-ref]: ${causalFile}#${causalFragment} "C.28 result"`,
      '[reasoning]: B.5-Canonical-Reasoning-Cycle.md#b551---a-counterexample-becomes-a-constructive-mathematical-question',
    ].join('\n'));
    expect(markdown).toContain('Read [C.28][fpf-c28-4-4-ref] and [B.5][reasoning].');
    expect(markdown).toContain(`[fpf-c28-4-4-ref]: ${causalUrl} "C.28 result"`);
    expect(markdown).toContain('[reasoning]: /generated/patterns/B.5#a-counterexample-becomes-a-constructive-mathematical-question');
    expect(markdown).not.toContain(']([C.28]');
  });

  it('projects monolith fragments and inline angle-bracket destinations', () => {
    const markdown = project([
      `Read [C.28 result](<${causalFile}#${causalFragment}> "exact result").`,
      `[result]: #${causalFragment}`,
      '[whole pattern](./C.28-CausalUse-CAL.md)',
    ].join('\n'));
    expect(markdown).toContain(`[C.28 result](<${causalUrl}> "exact result")`);
    expect(markdown).toContain(`[result]: ${causalUrl}`);
    expect(markdown).toContain('[whole pattern](/generated/patterns/C.28)');
  });

  it('resolves named pattern anchors placed before their headings to the named patterns', () => {
    // Actual upstream shape: C.39's anchor follows C.38:End, so its parser
    // container is the previous section. The explicit pattern ID, not that
    // incidental container, owns the destination.
    const projection = projectSource([
      '**Part C - Fixture**',
      '| ID | Title | Status | Keywords | Dependencies |',
      '| --- | --- | --- | --- | --- |',
      '| A.1 | Practical entries | Draft | entry | |',
      '| C.38 | Previous pattern | Draft | previous | |',
      '| C.39 | Find and Develop a Way to Obtain a Result | Draft | method | |',
      '| C.40 | Develop Material | Draft | material | |',
      '',
      '# A.1 - Practical entries',
      '[C.39:4](#fpf-pattern-C.39) and [C.40](#fpf-pattern-C.40).',
      '[Ordinary anchor](#local-note).',
      '[Uncompiled name](#fpf-pattern-C.99).',
      '',
      '# C.38 - Previous pattern',
      '## C.38:End',
      '<a id="local-note"></a>',
      '<a id="fpf-pattern-C.99"></a>',
      '<a id="fpf-pattern-C.39"></a>',
      '',
      '# C.39 - Find and Develop a Way to Obtain a Result',
      'Method construction content.',
      '## C.39:End',
      '<a id="fpf-pattern-C.40"></a>',
      '',
      '# C.40 - Develop Material',
      'Material development content.',
    ].join('\n'));
    const entry = projection.pagesByMarkdownPath['docs/generated/patterns/A.1.md']!.markdown;
    expect(entry).toContain('[C.39:4](/generated/patterns/C.39)');
    expect(entry).toContain('[C.40](/generated/patterns/C.40)');
    expect(entry).not.toContain('#fpf-pattern-C.39');
    expect(entry).not.toContain('#fpf-pattern-C.40');
    // Arbitrary explicit anchors retain their actual owning page; names are
    // not heuristically associated with the following pattern.
    expect(entry).toMatch(/\[Ordinary anchor\]\([^)]*#local-note\)/);
    expect(entry).not.toContain('[Ordinary anchor](/generated/patterns/C.39)');
    expect(entry).toMatch(/\[Uncompiled name\]\([^)]*#fpf-pattern-C\.99\)/);
    expect(entry).not.toContain('/generated/patterns/C.99');
  });

  it('preserves shortcut and collapsed references while projecting their definitions', () => {
    const markdown = project([
      'Read [C.28] and [C.28][].',
      `[C.28]: ${causalFile}#${causalFragment}`,
    ].join('\n'));
    expect(markdown).toContain('Read [C.28] and [C.28][].');
    expect(markdown).toContain(`[C.28]: ${causalUrl}`);
  });

  it('does not nest links in code-formatted table links, reference links or nested labels', () => {
    const markdown = project([
      '## A.1:1 - Links',
      '',
      '| Existing | Bare | Reference |',
      '| --- | --- | --- |',
      `| [\`C.28\`](${causalFile}#${causalFragment}) | \`B.5\` | [\`C.28\`][result] |`,
      '',
      '[Start Here [C.28]](https://example.com/path_(C.28))',
      `[result]: ${causalFile}#${causalFragment}`,
    ].join('\n'));
    expect(markdown).toContain(`[\`C.28\`](${causalUrl})`);
    expect(markdown).toContain('[`B.5`](/generated/patterns/B.5)');
    expect(markdown).toContain('[`C.28`][result]');
    expect(markdown).toContain('[Start Here [C.28]](https://example.com/path_(C.28))');
    expect(markdown).not.toContain('[[`');
  });

  it('preserves links inside multiline code spans and backtick or tilde fences', () => {
    const examples = [
      `\`\`[C.28](${causalFile}#${causalFragment})\nwith \`ticks\` \`\``,
      `~~~md\n| \`C.28\` |\n[result]: ${causalFile}#${causalFragment}\n~~~`,
      `\`\`\`\`md\n\`\`\`\n[C.28](${causalFile}#${causalFragment})\n\`\`\`\``,
    ];
    for (const example of examples) expect(project(example)).toContain(example);
  });

  it('labels unavailable relative source documents while preserving their citation', () => {
    const target = '../_change-campaigns/example/DECISION.md';
    const markdown = project(`[settlement decision](${target}).`);
    expect(markdown).toContain(`settlement decision (source document not included in this publication: \`${target}\`).`);
    expect(markdown).not.toContain(`](${target})`);
  });

  it('preserves source order across adjacent destination and unavailable-document edits', () => {
    const markdown = project(`[first](${causalFile}#${causalFragment})[missing](../notes/DECISION.md)[second](B.5-Canonical-Reasoning-Cycle.md).`);
    expect(markdown).toContain(`[first](${causalUrl})missing (source document not included in this publication: \`../notes/DECISION.md\`)[second](/generated/patterns/B.5).`);
  });

  it('keeps unknown pattern fragments and site routes available to dead-link validation', () => {
    const knownFileUnknownFragment = `[result](${causalFile}#missing-section)`;
    const unknownSiteRoute = '[missing route](/generated/patterns/MISSING.md)';
    const external = '[C.28](https://example.com/C.28.md#fragment)';
    const markdown = project([knownFileUnknownFragment, unknownSiteRoute, external].join('\n'));
    expect(markdown).toContain(knownFileUnknownFragment);
    expect(markdown).toContain(unknownSiteRoute);
    expect(markdown).toContain(external);
  });
});
