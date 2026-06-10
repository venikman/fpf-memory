import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

describe('newcomer adoption surface', () => {
  it('provides a real glossary page that defines core FPF jargon in plain language', async () => {
    const glossary = await readFile(resolve(process.cwd(), 'docs/glossary.md'), 'utf8');

    for (const term of [
      'First Principles Framework (FPF)',
      'Pattern',
      'Part',
      'Route',
      'Work packet',
      'Holon',
      'Bounded context',
      'Episteme',
      'Unified Term Sheet (UTS)',
      'Multi-View Publication Kit (MVPK)',
    ]) {
      expect(glossary).toContain(`### ${term}`);
    }
    // Each jargon entry points at the canonical pattern page, and the page
    // hands off to the spec's own exhaustive term index.
    expect(glossary).toContain('(/generated/patterns/A.1)');
    expect(glossary).toContain('(/generated/patterns/A.1.1)');
    expect(glossary).toContain('(/generated/patterns/F.17)');
    expect(glossary).toContain('(/generated/patterns/E.17)');
    expect(glossary).toContain('(/generated/patterns/H.1)');
  });

  it('start-here expands the FPF acronym and walks a worked example before the catalog', async () => {
    const startHere = await readFile(resolve(process.cwd(), 'docs/start-here.md'), 'utf8');

    const intro = startHere.slice(0, startHere.indexOf('## Pick a doorway'));
    expect(intro).toContain('First Principles Framework (FPF)');
    expect(intro).toContain('## A worked example');
    expect(startHere).toContain('route:project-alignment');
    expect(startHere).toContain('(/generated/routes/route_project-alignment)');
    expect(startHere).toContain('[Glossary](/glossary)');
    // Doorway CTAs carry human labels, not bare machine IDs (audit finding 4).
    expect(startHere).not.toMatch(/\|\s*\[E\.\d+\]\(/);
  });
});
