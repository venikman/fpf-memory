import { defineConfig } from '@rstest/core';

export default defineConfig({
  include: ['tests/**/*.test.ts'],
  testEnvironment: 'node',
  clearMocks: true,
  restoreMocks: true,
  testTimeout: 20_000,
});
