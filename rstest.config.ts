import { defineConfig } from '@rstest/core';

export default defineConfig({
  include: ['tests/**/*.test.ts'],
  testEnvironment: 'node',
  clearMocks: true,
  restoreMocks: true,
  testTimeout: 20_000,
  pool: {
    type: 'forks',
    // The suite compiles and serves the full FPF surface in multiple files.
    // Keep CI below the GitHub runner memory cliff while preserving local speed.
    maxWorkers: process.env.CI ? 1 : '50%',
  },
});
