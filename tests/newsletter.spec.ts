import { test, expect } from '@playwright/test'

const baseUrl = (process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

test('Waitlist form submits with valid data', async ({ page }) => {
  await page.route('**/api/subscribe', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        message: "You're on the Just Summit updates list.",
      }),
    })
  })

  await page.goto(`${baseUrl}/`)
  await page.waitForLoadState('networkidle')
  await page.getByLabel('First name').fill('Tom')
  await page.getByLabel('Email address').fill('tom@example.com')
  const subscribeRequest = page.waitForRequest('**/api/subscribe')
  await page.getByTestId('waitlist-submit').click()
  const subscribePayload = (await subscribeRequest).postDataJSON()

  expect(subscribePayload).toEqual({
    name: 'Tom',
    email: 'tom@example.com',
    source: 'homepage_waitlist',
  })
  await expect(
    page.getByText(/You're on the Just Summit updates list/i)
  ).toBeVisible()
})
