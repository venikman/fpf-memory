import { normalizeForLookup } from './text.js';

export type OptionalTermLinkKey = 'glossary' | 'changeLog';

export interface OptionalTermLinkDefinition {
  key: OptionalTermLinkKey;
  label: string;
}

export interface OptionalTermPatternCandidate {
  id: string;
  title?: string;
  aliases?: string[];
  part?: string;
}

export const OPTIONAL_TERM_LINKS: OptionalTermLinkDefinition[] = [
  { key: 'glossary', label: 'Glossary' },
  { key: 'changeLog', label: 'Change log' },
];

const OPTIONAL_TERM_MATCHERS: Record<
  OptionalTermLinkKey,
  { partIncludes: string[]; titleIncludes: string[] }
> = {
  glossary: {
    partIncludes: ['glossary'],
    titleIncludes: ['glossary'],
  },
  changeLog: {
    partIncludes: ['annex'],
    titleIncludes: ['change log', 'changelog'],
  },
};

export function resolveOptionalTermPatternId(
  patterns: Iterable<OptionalTermPatternCandidate>,
  key: OptionalTermLinkKey,
): string | undefined {
  const matcher = OPTIONAL_TERM_MATCHERS[key];
  return Array.from(patterns).find(
    (pattern) =>
      matchesAny(pattern.part, matcher.partIncludes)
      && [pattern.title, ...(pattern.aliases ?? [])].some((label) =>
        matchesAny(label, matcher.titleIncludes),
      ),
  )?.id;
}

function matchesAny(value: string | undefined, needles: string[]): boolean {
  if (!value) return false;
  const normalizedValue = normalizeOptionalTermLabel(value);
  return needles.some((needle) => normalizedValue.includes(normalizeOptionalTermLabel(needle)));
}

function normalizeOptionalTermLabel(value: string): string {
  return normalizeForLookup(value)
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
