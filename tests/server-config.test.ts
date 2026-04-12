import { describe, expect, it } from '@rstest/core';

import {
  DEFAULT_SERVER_PORT,
  MAX_TCP_PORT,
  parsePort,
} from '../src/server-config.js';

describe('server-config', () => {
  it('defaults when the port is missing, blank, or invalid', () => {
    expect(parsePort(undefined)).toBe(DEFAULT_SERVER_PORT);
    expect(parsePort('')).toBe(DEFAULT_SERVER_PORT);
    expect(parsePort('   ')).toBe(DEFAULT_SERVER_PORT);
    expect(parsePort('nope')).toBe(DEFAULT_SERVER_PORT);
    expect(parsePort('-1')).toBe(DEFAULT_SERVER_PORT);
  });

  it('preserves port zero and clamps oversized ports', () => {
    expect(parsePort('0')).toBe(0);
    expect(parsePort('4111')).toBe(4111);
    expect(parsePort('70000')).toBe(MAX_TCP_PORT);
  });
});
