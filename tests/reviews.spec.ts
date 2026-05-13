import { test, expect } from '@playwright/test'

const baseUrl = (process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

test('FAQ section is reachable from the homepage', async ({ page }) => {
  await page.goto(`${baseUrl}/`)
  await page.waitForLoadState('networkidle')

  await page.getByRole('navigation').getByRole('link', { name: 'FAQ' }).click()

  await expect(page.locator('#faq')).toBeInViewport()
  await expect(
    page.getByRole('heading', { name: /Presale questions, answered plainly/i })
  ).toBeVisible()
})
