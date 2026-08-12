import { expect, test } from '@playwright/test'

test.describe('@responsive homepage', () => {
  test('keeps the core presale journey usable without horizontal overflow', async ({ page }) => {
    const browserErrors: string[] = []

    page.on('console', (message) => {
      if (message.type() === 'error') {
        browserErrors.push(message.text())
      }
    })
    page.on('pageerror', (error) => browserErrors.push(error.message))

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await expect(
      page.getByRole('heading', { name: /Don't lose the best things you only hear once/i })
    ).toBeVisible()
    await expect(page.locator('#roadmap')).toBeVisible()
    await expect(page.locator('#pricing article[data-offer-id]')).toHaveCount(2)
    await expect(page.getByTestId('checkout-headphones-deposit-pricing')).toBeVisible()
    await expect(page.getByTestId('checkout-headphones-full-pricing')).toBeVisible()

    const viewport = page.viewportSize()
    expect(viewport).not.toBeNull()

    if ((viewport?.width ?? 0) < 1280) {
      const navigationButton = page.getByRole('button', { name: 'Open navigation menu' })
      await expect(navigationButton).toBeVisible()
      await navigationButton.click()
      await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
    } else {
      await expect(page.getByRole('navigation').getByRole('link', { name: 'Preorder' })).toBeVisible()
    }

    const horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    )
    expect(horizontalOverflow).toBeLessThanOrEqual(1)
    expect(browserErrors).toEqual([])
  })
})
