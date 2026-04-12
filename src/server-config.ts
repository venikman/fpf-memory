export const DEFAULT_SERVER_PORT = 4111;
export const MAX_TCP_PORT = 65_535;

export function parsePort(value: string | undefined): number {
  if (value === undefined || value.trim() === '') {
    return DEFAULT_SERVER_PORT;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) {
    return DEFAULT_SERVER_PORT;
  }

  return Math.min(MAX_TCP_PORT, parsed);
}
