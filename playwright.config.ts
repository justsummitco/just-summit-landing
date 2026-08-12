import { defineConfig, devices } from '@playwright/test'

const port = Number(process.env.PLAYWRIGHT_PORT ?? 3000)
const localBaseUrl = `http://localhost:${port}`
const baseURL = (process.env.PLAYWRIGHT_BASE_URL ?? localBaseUrl).replace(/\/$/, '')
const managesLocalServer = !process.env.PLAYWRIGHT_BASE_URL

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [
        ['line'],
        ['html', { open: 'never' }],
      ]
    : [['list']],
  outputDir: 'test-results/playwright',
  use: {
    baseURL,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },
  webServer: managesLocalServer
    ? {
        command: `npm run build && npm run start -- --hostname localhost --port ${port}`,
        reuseExistingServer: false,
        timeout: 180_000,
        url: localBaseUrl,
      }
    : undefined,
  projects: [
    {
      name: 'desktop-chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: 'tablet-900-chromium',
      grep: /@responsive/,
      use: {
        browserName: 'chromium',
        hasTouch: true,
        viewport: { width: 900, height: 1100 },
      },
    },
    {
      name: 'mobile-390-chromium',
      grep: /@responsive/,
      use: {
        browserName: 'chromium',
        hasTouch: true,
        isMobile: true,
        viewport: { width: 390, height: 844 },
      },
    },
  ],
})
