import { test, expect } from '@playwright/test'

const baseUrl = (process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '')
const canonicalOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.justsummit.co'

function canonicalFor(path: string) {
  return `${canonicalOrigin.replace(/\/$/, '')}${path}`
}

function parseJsonLdItems(texts: string[]) {
  return texts.flatMap((text) => {
    const data = JSON.parse(text)
    return Array.isArray(data) ? data : [data]
  })
}

test('homepage exposes self canonical and product organisation JSON-LD', async ({ page }) => {
  await page.goto(`${baseUrl}/`)
  await page.waitForLoadState('networkidle')

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonicalFor('/'))

  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents()
  const parsed = parseJsonLdItems(jsonLd)

  expect(parsed.some((item) => item['@type'] === 'Product' && item.name === 'Just Summit Headphones')).toBe(true)
  expect(parsed.some((item) => item['@type'] === 'OnlineStore' && item.legalName === 'Just Summit Ltd')).toBe(true)
})

test('blog routes expose self canonicals and article structured data', async ({ page }) => {
  await page.goto(`${baseUrl}/blog`)
  await page.waitForLoadState('networkidle')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonicalFor('/blog'))

  const postPath = '/blog/2026-05-19-ai-meeting-recorder-vs-ai-note-taker'
  await page.goto(`${baseUrl}${postPath}`)
  await page.waitForLoadState('networkidle')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonicalFor(postPath))

  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents()
  const parsed = parseJsonLdItems(jsonLd)

  expect(parsed.some((item) => item['@type'] === 'Article' && /AI Meeting Recorder vs AI Note Taker/i.test(item.headline))).toBe(true)
})

test('checkout utility pages are noindexed', async ({ page }) => {
  for (const path of ['/headphones-success', '/headphones-cancel']) {
    await page.goto(`${baseUrl}${path}`)
    await page.waitForLoadState('networkidle')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/i)
  }
})

test('commercial SEO pages render unique buyer-intent flows', async ({ page }) => {
  const pages = [
    ['/ai-meeting-recorder', /AI meeting recorder/i],
    ['/ai-voice-recorder', /AI voice recorder/i],
    ['/ai-note-taker-for-in-person-meetings', /AI note taker for in-person meetings/i],
    ['/private-ai-transcription', /Private AI transcription/i],
    ['/transcription-headphones', /Transcription headphones/i],
  ] as const

  for (const [path, heading] of pages) {
    await page.goto(`${baseUrl}${path}`)
    await page.waitForLoadState('networkidle')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonicalFor(path))
    await expect(page.getByRole('heading', { level: 1 })).toContainText(heading)
    await expect(page.getByRole('link', { name: /Reserve for £49/i }).first()).toHaveAttribute('href', '/#pricing')
  }
})

test('ADHD persona pages render safe, indexable content', async ({ page }) => {
  const pages = [
    ['/adhd-meeting-notes', /ADHD-friendly meeting notes/i],
    ['/meeting-notes-for-adhd', /Meeting notes for ADHD-friendly workdays/i],
    ['/adhd-productivity-tools', /ADHD-friendly productivity tools/i],
    ['/ai-note-taker-for-adhd', /AI note taker for ADHD-friendly work/i],
    ['/forgot-meeting-action-items', /Forgot the meeting action items/i],
    ['/neurodivergent-meeting-notes', /Neurodivergent meeting notes/i],
  ] as const

  const unsafeClaims = /\b(treat|cure|clinically proven|ADHD-tested|symptom relief|medical device)\b/i

  for (const [path, heading] of pages) {
    await page.goto(`${baseUrl}${path}`)
    await page.waitForLoadState('networkidle')

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonicalFor(path))
    await expect(page.getByRole('heading', { level: 1 })).toContainText(heading)
    await expect(page.getByRole('main')).toContainText(/not healthcare advice/i)
    await expect(page.getByRole('main')).not.toContainText(unsafeClaims)

    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents()
    const parsed = parseJsonLdItems(jsonLd)

    expect(parsed.some((item) => item['@type'] === 'BreadcrumbList')).toBe(true)
    expect(parsed.some((item) => item['@type'] === 'FAQPage')).toBe(true)
  }
})

test('sitemap includes ADHD pages and excludes noindex utility pages', async ({ request }) => {
  const response = await request.get(`${baseUrl}/sitemap.xml`)
  expect(response.ok()).toBe(true)

  const sitemap = await response.text()
  const included = [
    '/adhd-meeting-notes',
    '/meeting-notes-for-adhd',
    '/adhd-productivity-tools',
    '/ai-note-taker-for-adhd',
    '/forgot-meeting-action-items',
    '/neurodivergent-meeting-notes',
  ]

  for (const path of included) {
    expect(sitemap).toContain(`<loc>${canonicalFor(path)}</loc>`)
  }

  for (const path of ['/headphones-success', '/headphones-cancel', '/sold-out']) {
    expect(sitemap).not.toContain(path)
  }
})

test('comparison pages render factual alternative pages', async ({ page }) => {
  const pages = [
    ['/compare/plaud-alternative', /Plaud alternative/i],
    ['/compare/otter-ai-alternative', /Otter\.ai alternative/i],
    ['/compare/limitless-alternative', /Limitless alternative/i],
    ['/compare/fireflies-ai-alternative', /Fireflies\.ai alternative/i],
  ] as const

  for (const [path, heading] of pages) {
    await page.goto(`${baseUrl}${path}`)
    await page.waitForLoadState('networkidle')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonicalFor(path))
    await expect(page.getByRole('heading', { level: 1 })).toContainText(heading)
    await expect(page.getByText(/pre-production|presale/i).first()).toBeVisible()
    await expect(page.getByRole('main').getByRole('link', { name: /Reserve for £49/i })).toHaveAttribute('href', '/#pricing')
  }
})
