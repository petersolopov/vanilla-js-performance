// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Maximum execution time for each test */
  timeout: 30 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Do not stop after the first error */
  forbidOnly: !!process.env.CI,
  /* Retry each test only once */
  retries: process.env.CI ? 2 : 0,
  /* Parallel execution of tests in one file */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter for outputting test results */
  reporter: 'html',
  /* Shared settings for all projects below. Override in specific projects if necessary. */
  use: {
    /* Maximum time for each action in the test */
    actionTimeout: 0,
    /* Base URL for use in navigation.goto() */
    baseURL: 'http://localhost:8081',

    /* Collect trace on test retry. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Project configuration for different browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Add other browsers as needed
  ],

  /* Launch your local dev server before starting the tests */
  webServer: {
    command: 'npm run static-server -- -p 8081',
    port: 8081,
    reuseExistingServer: !process.env.CI,
  },
});
