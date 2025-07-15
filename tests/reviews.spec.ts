import { test, expect } from '@playwright/test'

test('Navigation › can go to Reviews section from Home', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  await page.click('text=Reviews') // Assuming this is your nav label

  // Wait for scroll animation if any
  await page.waitForTimeout(500)

  // Expect the heading inside the testimonials section to be visible
  await expect(
    page.getByRole('heading', { name: /What Early Users Say/i })
  ).toBeVisible({ timeout: 5000 })
})