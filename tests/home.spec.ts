import { test, expect } from '@playwright/test'

const baseUrl = (process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

test('Home Page shows the hardware presale funnel', async ({ page }) => {
  await page.goto(`${baseUrl}/`)
  await page.waitForLoadState('networkidle')

  await expect(page).toHaveTitle(/Just Summit AI Headphones/i)
  await expect(
    page.getByRole('heading', { name: /AI headphones that turn listening into recall/i })
  ).toBeVisible()
  await expect(page.getByTestId('checkout-headphones-full-hero')).toBeVisible()
  await expect(page.getByTestId('checkout-headphones-full-pricing')).toBeVisible()
  await expect(page.getByTestId('checkout-headphones-deposit-pricing')).toBeVisible()
  await expect(page.getByText(/Estimated delivery Q4 2026/i)).toBeVisible()
  await expect(
    page.getByText(/Planned capture, transcription, and structured summaries/i)
  ).toBeVisible()
  await expect(
    page.getByAltText(/Studio product view of the Just Summit headphones/i)
  ).toBeVisible()
  await expect(
    page.getByAltText(/Three-quarter view of the Just Summit headphones/i)
  ).toBeVisible()
  await expect(
    page.getByAltText(/Close-up detail of the Just Summit headphones/i)
  ).toBeVisible()
})

test('Home Page sends the expected checkout payload', async ({ page }) => {
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
  await page.getByTestId('checkout-headphones-full-hero').click()
  const checkoutPayload = (await checkoutRequest).postDataJSON()

  expect(checkoutPayload).toEqual({
    offerId: 'headphones-full',
    source: 'hero_primary',
  })
  await expect(
    page.getByText(/Checkout is not available right now/i)
  ).toBeVisible()
})
