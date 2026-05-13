import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPostSlugs, getPostBySlug } from "../../../lib/mdx";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: ["/hero-headphones-clean.png"],
      type: "article",
      publishedTime: post.date,
    },
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderMarkdownContent(content: string) {
  return content
    .replace(/^# (.*$)/gim, '<h1 class="mb-6 text-3xl font-bold text-gray-900">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="mb-4 mt-8 text-2xl font-bold text-gray-900">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="mb-3 mt-6 text-xl font-semibold text-gray-900">$1</h3>')
    .replace(/^\* (.*$)/gim, '<li class="leading-relaxed">$1</li>')
    .replace(/^\- (.*$)/gim, '<li class="leading-relaxed">$1</li>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed text-gray-700">')
    .replace(/^(?!<[h|l|p])/gm, '<p class="mb-4 leading-relaxed text-gray-700">');
}

export default function BlogPost({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const htmlContent = renderMarkdownContent(post.content);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <nav className="bg-gray-50 py-4">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-teal-700">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-teal-700">
                Blog
              </Link>
              <span>/</span>
              <span className="text-gray-950">{post.title}</span>
            </div>
          </div>
        </nav>

        <article className="py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <header className="mb-8">
              {post.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="mb-4 text-4xl font-semibold leading-tight tracking-tight text-gray-950 md:text-5xl">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-gray-600">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
            </header>

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            <div className="mt-12 rounded-lg bg-gray-950 p-8 text-center">
              <h3 className="mb-4 text-2xl font-semibold text-white">
                Ready to retain more of what you hear?
              </h3>
              <p className="mb-6 text-white/70">
                Just Summit AI Headphones are available for presale with full-payment and deposit options.
              </p>
              <Link
                href="/#pricing"
                className="inline-flex min-h-12 items-center rounded-md bg-white px-6 text-sm font-semibold text-gray-950 transition hover:bg-gray-100"
              >
                Preorder the AI Headphones
              </Link>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center font-medium text-teal-700 hover:text-teal-900"
              >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
