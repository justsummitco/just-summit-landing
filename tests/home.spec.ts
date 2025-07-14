import { test, expect } from '@playwright/test'

test('Home Page › has correct page title', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await expect(page).toHaveTitle(/Just Summit/i)
})

test('Home Page › shows CTA button', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  const cta = page.getByTestId('main-cta')
  await expect(cta).toBeVisible({ timeout: 5000 })
  await expect(cta).toHaveText(/join the community/i)
})