import { describe, expect, it } from '@rstest/core';

import { resolveOptionalTermPatternId } from '../src/core/optional-term-links.js';

describe('optional term links', () => {
  it('resolves the glossary from the glossary part instead of any glossary title', () => {
    const patterns = [
      {
        id: 'A.0',
        title: 'Onboarding Glossary',
        aliases: ['Onboarding Glossary'],
        part: 'Part A - Kernel Architecture Cluster',
      },
      {
        id: 'H.renumbered',
        title: 'Glossary',
        aliases: ['Glossary'],
        part: 'Part H - Glossary & Definitional Pattern Index',
      },
    ];

    expect(resolveOptionalTermPatternId(patterns, 'glossary')).toBe('H.renumbered');
  });

  it('resolves a retitled changelog from the annex part', () => {
    const patterns = [
      {
        id: 'A.3.3',
        title: 'U.Dynamics: The Law of Change',
        aliases: ['U.Dynamics: The Law of Change'],
        part: 'Part A - Kernel Architecture Cluster',
      },
      {
        id: 'I.renumbered',
        title: 'Changelog',
        aliases: ['Changelog'],
        part: 'Part I - Annexes & Extended Tutorials',
      },
    ];

    expect(resolveOptionalTermPatternId(patterns, 'changeLog')).toBe('I.renumbered');
  });
});
