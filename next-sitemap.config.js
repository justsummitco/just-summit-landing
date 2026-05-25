/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.justsummit.co',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  exclude: ['/api/*', '/headphones-success', '/headphones-cancel', '/sold-out'],
  transform: async (config, path) => {
    const legalPages = ['/privacy', '/terms', '/refunds']
    const commercialPages = [
      '/ai-headphones',
      '/ai-meeting-recorder',
      '/ai-voice-recorder',
      '/ai-note-taker-for-in-person-meetings',
      '/private-ai-transcription',
      '/privacy-first-ai-notetaker',
      '/on-device-transcription',
      '/ai-headphones-for-meetings',
      '/transcription-headphones',
      '/compare',
    ]
    const isComparisonPage = path.startsWith('/compare/')
    const isBlogPage = path === '/blog' || path.startsWith('/blog/')

    let priority = 0.7

    if (path === '/') {
      priority = 1.0
    } else if (commercialPages.includes(path) || isComparisonPage) {
      priority = 0.9
    } else if (isBlogPage || path === '/build-log' || path === '/about') {
      priority = 0.8
    } else if (legalPages.includes(path)) {
      priority = 0.3
    }

    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority,
      lastmod: new Date().toISOString(),
    }
  },
}

