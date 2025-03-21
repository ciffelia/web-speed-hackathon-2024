import { defineConfig, devices } from '@playwright/test';

const BASE_URL = process.env['E2E_BASE_URL'] ?? 'http://localhost:8000';

export default defineConfig({
  expect: {
    timeout: 30_000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.03,
    },
  },
  forbidOnly: !!process.env['FORBID_ONLY'],
  fullyParallel: true,
  projects: [
    {
      name: 'Mobile Chrome',
      testMatch: '**/client/**/*.spec.ts',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'Desktop Chrome',
      testMatch: '**/admin/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  reporter: process.env['CI'] ? [['list'], ['blob'], ['./reporter.ts']] : 'list',
  retries: 0,
  testDir: './src',
  timeout: 60_000,
  use: {
    baseURL: BASE_URL,
    headless: true,
    trace: 'off',
  },
});
