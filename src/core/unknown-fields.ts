/**
 * Coercion helpers for fields of `unknown` JSON-shaped values.
 *
 * Shared by the surfaces that render or inspect structured tool payloads
 * (MCP text mirrors, usage telemetry) so the narrowing rules live in one
 * place. All helpers return `undefined` on a shape mismatch; callers that
 * want empty-collection semantics add `?? []`.
 */

export function stringField(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

export function numberField(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

export function recordField(value: unknown): Record<string, unknown> | undefined {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

export function arrayOfRecords(value: unknown): Array<Record<string, unknown>> | undefined {
  if (!Array.isArray(value)) return undefined;
  return value.filter(
    (item): item is Record<string, unknown> => recordField(item) !== undefined,
  );
}

export function arrayOfStrings(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const filtered = value.filter((item): item is string => typeof item === 'string');
  return filtered.length > 0 ? filtered : undefined;
}
