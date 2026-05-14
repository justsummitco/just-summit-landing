import { test, expect } from '@playwright/test'

const baseUrl = (process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

test('About page renders the credibility-lite company story', async ({ page }) => {
  await page.goto(`${baseUrl}/about`)
  await page.waitForLoadState('networkidle')

  await expect(page).toHaveTitle(/About Just Summit/i)
  await expect(
    page.getByRole('heading', { name: /A small project trying to fix a small frustration/i })
  ).toBeVisible()
  await expect(page.getByText(/We are building Just Summit/i)).toBeVisible()
  await expect(page.getByText(/A few small principles/i)).toBeVisible()
  await expect(page.getByText(/Writing about Just Summit/i)).toBeVisible()
  await expect(page.getByRole('link', { name: /Email the team/i })).toHaveAttribute(
    'href',
    'mailto:hello@justsummit.co'
  )
  await expect(page.getByRole('link', { name: /press@justsummit.co/i })).toHaveAttribute(
    'href',
    'mailto:press@justsummit.co'
  )
  await expect(page.getByText(/partner logo/i)).toHaveCount(0)
})
