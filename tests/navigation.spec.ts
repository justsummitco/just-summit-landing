import { test, expect } from '@playwright/test'

test('Navigation › can go to Blog and back to Home', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.click('text=Blog')
  await expect(page).toHaveURL(/.*\/blog/)

  await page.click('text=Summit') // back to home via logo
  await expect(page).toHaveURL('http://localhost:3000/')
  await expect(
    page.getByRole('heading', { name: /stay in the loop/i })
  ).toBeVisible()
})

test('Navigation › can go from Home to Story anchor', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.click('text=Story')
  await page.waitForTimeout(500) // allow time for scroll animation
  await expect(page.locator('#story')).toBeVisible()
})