import { test, expect } from '@playwright/test'

const baseUrl = (process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

test('Home Page shows the trust-focused hardware presale funnel', async ({ page }) => {
  await page.goto(`${baseUrl}/`)
  await page.waitForLoadState('networkidle')

  await expect(page).toHaveTitle(/Just Summit AI Headphones/i)
  await expect(
    page.getByRole('heading', { name: /Don't lose the best things you only hear once/i })
  ).toBeVisible()
  await expect(page.getByTestId('checkout-headphones-deposit-hero')).toBeVisible()
  await expect(page.getByText(/Founding edition/i)).toBeVisible()
  await expect(page.locator('#roadmap')).toContainText('Prototype build')
  await expect(page.locator('#how-this-works')).toContainText('An honest note about the funding model')
  await expect(page.getByText(/Best value for first batch/i)).toBeVisible()
  await expect(page.getByTestId('checkout-headphones-deposit-pricing')).toBeVisible()
  await expect(page.getByTestId('checkout-headphones-full-pricing')).toBeVisible()
  await expect(page.getByText(/Concept render/i)).toBeVisible()
  await expect(page.getByText(/Real photo coming soon/i)).toBeVisible()
  await expect(page.getByText(/Real app preview coming soon/i)).toBeVisible()
  await expect(page.getByText(/Just Summit Ltd · Registered in England · Company no\. 15449136/i)).toBeVisible()
})

test('Home Page sends the expected deposit checkout payload', async ({ page }) => {
  await page.route('**/api/create-checkout-session', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Stripe price is not configured' }),
    })
  })

  await page.goto(`${baseUrl}/`)
  await page.waitForLoadState('networkidle')
  const checkoutRequest = page.waitForRequest('**/api/create-checkout-session')
  await page.getByTestId('checkout-headphones-deposit-hero').click()
  const checkoutPayload = (await checkoutRequest).postDataJSON()

  expect(checkoutPayload).toEqual({
    offerId: 'headphones-deposit',
    source: 'hero_primary',
  })
  await expect(
    page.getByText(/Checkout is not available right now/i)
  ).toBeVisible()
})
