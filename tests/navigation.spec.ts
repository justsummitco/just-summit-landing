import { test, expect } from '@playwright/test'

const baseUrl = (process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

test('Navigation can go to Blog and back to Home', async ({ page }) => {
  await page.goto(`${baseUrl}/`)
  await page.waitForLoadState('networkidle')
  await page.getByRole('navigation').getByRole('link', { name: 'Blog' }).click()
  await expect(page).toHaveURL(/.*\/blog/)

  await page.getByRole('link', { name: 'Just Summit home' }).click()
  await expect(page).toHaveURL(`${baseUrl}/`)
  await expect(
    page.getByRole('heading', { name: /AI headphones that turn listening into recall/i })
  ).toBeVisible()
})

test('Navigation links target product and preorder sections', async ({ page }) => {
  await page.goto(`${baseUrl}/`)
  await page.waitForLoadState('networkidle')

  await page.getByRole('navigation').getByRole('link', { name: 'Product' }).click()
  await expect(page.locator('#product')).toBeInViewport()

  await page.getByRole('navigation').getByRole('link', { name: 'Preorder' }).click()
  await expect(page.locator('#pricing')).toBeInViewport()
})

test('Mobile navigation opens and reaches FAQ', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(`${baseUrl}/`)
  await page.waitForLoadState('networkidle')

  await page.getByRole('button', { name: 'Open navigation menu' }).click()
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()

  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'FAQ' }).click()
  await expect(page.locator('#faq')).toBeInViewport()
})
