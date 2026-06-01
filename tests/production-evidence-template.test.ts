import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

const REQUIRED_PACKET_FIELDS = [
  '## Production evidence packet',
  '### Promise checked',
  '### URLs checked',
  '### Commands run',
  '### Expected semantic invariants',
  'HTTP availability:',
  'semantic correctness:',
  'freshness/currentness:',
  'route naming:',
  'live behavior:',
  'cost/risk guardrails:',
  '### Actual output excerpt',
  '### Upstream ref / source hash',
  '### Deployment URL / alias checked',
  '### Rollback target',
  '### Known caveats',
  '### What would falsify this success claim?',
];

const PRIVATE_ARTIFACT_BOUNDARY =
  'No raw user questions, prompts, answer text, selectors, markdown bodies, session IDs, IPs, or user identifiers included.';

async function readRepoFile(path: string): Promise<string> {
  return readFile(resolve(process.cwd(), path), 'utf8');
}

describe('production evidence packet template', () => {
  it('requires semantic production evidence in PRs', async () => {
    const template = await readRepoFile('.github/pull_request_template.md');

    for (const field of REQUIRED_PACKET_FIELDS) {
      expect(template).toContain(field);
    }

    expect(template).toContain('production-facing behavior');
    expect(template).toContain(PRIVATE_ARTIFACT_BOUNDARY);
    expect(template).not.toContain('| Session |');
    expect(template).not.toContain('| Prompt  |');
  });

  it('documents the same packet in the automation playbook', async () => {
    const playbook = await readRepoFile('docs/automation-playbook.md');

    for (const field of REQUIRED_PACKET_FIELDS) {
      expect(playbook).toContain(field);
    }

    expect(playbook).toContain('production-affecting PRs');
    expect(playbook).toContain('semantic correctness');
    expect(playbook).toContain('freshness/currentness');
    expect(playbook).toContain('cost/risk guardrails');
    expect(playbook).toContain(
      'Do not include raw user questions, prompts, answer text, selectors, markdown bodies, session IDs, IPs, or user identifiers.',
    );
  });
});
