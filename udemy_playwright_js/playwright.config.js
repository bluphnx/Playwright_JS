// @ts-check
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  retries:2,
  timeout: 35 * 1000,
  reporter:'html',
  expect: {
    timeout: 45 * 1000
  },
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    trace:'on'

  }
});