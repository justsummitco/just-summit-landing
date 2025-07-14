import { test, expect } from '@playwright/test'

test('Newsletter › CTA submits with valid data', async ({ page }) => {
  await page.route('**/api/subscribe', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'ok' }),
    })
  })

  await page.goto('http://localhost:3000/')

  const nameInput = page.getByLabel('First Name')
  const emailInput = page.getByLabel('Email Address')
  const cta = page.getByTestId('main-cta')

  await nameInput.fill('Tom')
  await emailInput.fill('tom@example.com')
  await cta.click()

  await expect(
    page.getByText('Welcome to the Just Summit community!', { exact: false })
  ).toBeVisible({ timeout: 10000 })
})