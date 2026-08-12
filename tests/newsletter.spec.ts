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
  const foundingListForm = page.getByTestId('founding-list-form-home_roadmap')
  await foundingListForm.getByRole('textbox', { name: /First name/i }).fill('Tom')
  await foundingListForm.getByRole('textbox', { name: 'Email address' }).fill('tom@example.com')
  const subscribeRequest = page.waitForRequest('**/api/subscribe')
  await page.getByTestId('founding-list-submit-home_roadmap').click()
  const subscribePayload = (await subscribeRequest).postDataJSON()

  expect(subscribePayload).toEqual(expect.objectContaining({
    name: 'Tom',
    email: 'tom@example.com',
    source: 'home_roadmap',
    page_url: `${baseUrl}/`,
  }))
  await expect(
    page.getByText(/You're on the Just Summit updates list/i)
  ).toBeVisible()
})
