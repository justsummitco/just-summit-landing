import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPostSlugs, getPostBySlug } from '@/lib/mdx'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | Summit Blog',
    }
  }

  return {
    title: `${post.title} | Summit Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: ['/og-blog.png'],
      type: 'article',
      publishedTime: post.date,
    },
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function renderMarkdownContent(content: string) {
  // Simple markdown to HTML conversion for basic formatting
  return content
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mb-6">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-900 mb-3 mt-6">$1</h3>')
    .replace(/^\* (.*$)/gim, '<li class="leading-relaxed">$1</li>')
    .replace(/^\- (.*$)/gim, '<li class="leading-relaxed">$1</li>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/\n\n/g, '</p><p class="text-gray-700 mb-4 leading-relaxed">')
    .replace(/^(?!<[h|l|p])/gm, '<p class="text-gray-700 mb-4 leading-relaxed">')
    .replace(/<li class="leading-relaxed">(.*?)<\/li>/g, (match, content) => {
      return `<li class="leading-relaxed">${content}</li>`
    })
}

export default function BlogPost({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const htmlContent = renderMarkdownContent(post.content)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <nav className="bg-gray-50 py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-blue-600">
                Blog
              </Link>
              <span>/</span>
              <span className="text-gray-900">{post.title}</span>
            </div>
          </div>
        </nav>

        {/* Article */}
        <article className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <header className="mb-8">
              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center space-x-4 text-gray-600">
                <time dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
            </header>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* CTA Banner */}
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to retain more of what you hear?
              </h3>
              <p className="text-blue-100 mb-6">
                Join thousands who've transformed their audio learning with Summit's 15-second summaries.
              </p>
              <Link
                href="/#pricing"
                className="inline-flex items-center px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors"
              >
                Pre-order Summit from £25
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>

            {/* Back to Blog */}
            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg
                  className="mr-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Blog
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}

