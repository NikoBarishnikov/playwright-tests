import { defineConfig, devices } from '@playwright/test';

// Read HEADLESS from environment variable (default: true)
const headless = process.env.HEADLESS !== 'false';

export default defineConfig({
  // Directory where tests are located
  testDir: './tests',

  // Maximum time for each test
  timeout: 30_000,

  // Timeout for expect() assertions
  expect: { timeout: 5000 },

  // Test reporters
  reporter: [['list'], ['html']],

  use: {
    // Run tests headless by default; can override with HEADLESS=false
    headless,

    // Viewport size
    viewport: { width: 1280, height: 720 },

    // Ignore HTTPS errors
    ignoreHTTPSErrors: true,

    // Capture video only on failure
    video: 'retain-on-failure',

    // Capture screenshot only on failure
    screenshot: 'only-on-failure',

    // Timeout for actions like click/fill
    actionTimeout: 5000,

    // Enable verbose logging and tracing
    trace: 'on-first-retry', // capture trace on first retry
    // Optional: log all console messages
    // launchOptions: { args: ['--enable-logging'] },

    // Base URL (optional)
    baseURL: '',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless,
        // Optional: maximize window
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        headless,
        launchOptions: {
          args: ['--width=1280', '--height=720'],
        },
      },
    },
    {
      name: 'chrome',
      use: {
        channel: 'chrome',
        ...devices['Desktop Chrome'],
        headless,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
  ],
});
