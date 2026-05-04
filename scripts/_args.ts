export type FlagValues = Map<string, string | true>;

export function parseFlagMap(args: string[]): FlagValues {
  const values: FlagValues = new Map();
  for (let index = 0; index < args.length; index += 1) {
    const token = args[index];
    if (!token.startsWith('--')) {
      throw new Error(`Unexpected positional argument: ${token}`);
    }
    const [rawKey, inlineValue] = token.slice(2).split('=', 2);
    if (inlineValue !== undefined) {
      values.set(rawKey, inlineValue);
      continue;
    }
    const next = args[index + 1];
    if (!next || next.startsWith('--')) {
      values.set(rawKey, true);
      continue;
    }
    values.set(rawKey, next);
    index += 1;
  }
  return values;
}

export function readString(values: FlagValues, key: string, fallback: string): string {
  const value = values.get(key);
  if (value === undefined || value === true || value.trim() === '') {
    return fallback;
  }
  return value.trim();
}

export function readOptionalString(
  values: FlagValues,
  key: string,
  fallback: string | undefined,
): string | undefined {
  const value = values.get(key);
  if (value === true) {
    throw new Error(`--${key} requires a value.`);
  }
  return value?.trim() || fallback?.trim() || undefined;
}

export function readPositiveInteger(
  values: FlagValues,
  key: string,
  envValue: string | undefined,
  fallback: number,
): number {
  const value = readOptionalString(values, key, envValue) ?? `${fallback}`;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`--${key} must be a positive integer.`);
  }
  return parsed;
}

export function readNonNegativeInteger(
  values: FlagValues,
  key: string,
  envValue: string | undefined,
  fallback: number,
): number {
  const value = readOptionalString(values, key, envValue) ?? `${fallback}`;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`--${key} must be a non-negative integer.`);
  }
  return parsed;
}

export function asRecord(value: unknown, label: string): Record<string, unknown> {
  assert(
    typeof value === 'object' && value !== null && !Array.isArray(value),
    `${label} was not an object.`,
  );
  return value as Record<string, unknown>;
}

export function asArray(value: unknown, label: string): unknown[] {
  assert(Array.isArray(value), `${label} was not an array.`);
  return value;
}

export function asOptionalString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

export function round(value: number): number {
  return Math.round(value * 100) / 100;
}

export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
