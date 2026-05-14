import { test, expect } from '@playwright/test'

const baseUrl = (process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

test('Navigation can go to About, Blog, and back to Home', async ({ page }) => {
  await page.goto(`${baseUrl}/`)
  await page.waitForLoadState('networkidle')

  await page.getByRole('navigation').getByRole('link', { name: 'About' }).click()
  await expect(page).toHaveURL(/.*\/about/)
  await expect(
    page.getByRole('heading', { name: /A small project trying to fix a small frustration/i })
  ).toBeVisible()

  await Promise.all([
    page.waitForURL(/.*\/blog/),
    page.locator('header nav').getByRole('link', { name: 'Blog' }).click(),
  ])

  await page.getByRole('link', { name: 'Just Summit home' }).click()
  await expect(page).toHaveURL(`${baseUrl}/`)
  await expect(
    page.getByRole('heading', { name: /Don't lose the best things you only hear once/i })
  ).toBeVisible()
})

test('Navigation links target product, roadmap, preorder, and FAQ sections', async ({ page }) => {
  await page.goto(`${baseUrl}/`)
  await page.waitForLoadState('networkidle')

  await page.getByRole('navigation').getByRole('link', { name: 'Product' }).click()
  await expect(page.locator('#product')).toBeInViewport()

  await page.getByRole('navigation').getByRole('link', { name: 'Roadmap' }).click()
  await expect(page.locator('#roadmap')).toBeInViewport()

  await page.getByRole('navigation').getByRole('link', { name: 'Preorder' }).click()
  await expect(page.locator('#pricing')).toBeInViewport()

  await page.getByRole('navigation').getByRole('link', { name: 'FAQ' }).click()
  await expect(page.locator('#faq')).toBeInViewport()
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
