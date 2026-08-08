import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPostSlugs, getPostBySlug, stripLeadingTitle } from "../../../lib/mdx";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import MarkdownArticle from "@/components/MarkdownArticle";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

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
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      images: ["/hero-headphones-clean.png"],
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
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

export default function BlogPost({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const articleContent = stripLeadingTitle(post.content, post.title);
  const postPath = `/blog/${post.slug}`;

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd(post, postPath),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: postPath },
          ]),
        ]}
      />
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

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-600">
                <span>By <Link className="font-medium text-teal-700 hover:text-teal-900" href="/about">{post.author}</Link></span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.date}>Published {formatDate(post.date)}</time>
                {post.updated && <><span aria-hidden="true">·</span><time dateTime={post.updated}>Updated {formatDate(post.updated)}</time></>}
                <span aria-hidden="true">·</span>
                <span>{post.readingTime}</span>
              </div>
            </header>

            <MarkdownArticle content={articleContent} />

            <aside className="mt-10 border-t border-gray-200 pt-6 text-sm leading-6 text-gray-600">
              <p className="font-semibold text-gray-900">Editorial process</p>
              <p>Just Summit may use AI-assisted research and editing. Our publishing workflow checks each article against its linked sources and the product&apos;s current public status before it goes live.</p>
            </aside>

            <div className="mt-12 rounded-lg bg-gray-950 p-8 text-center">
              <h3 className="mb-4 text-2xl font-semibold text-white">
                Ready to retain more of what you hear?
              </h3>
              <p className="mb-6 text-white/70">
                Just Summit Headphones are available for presale with full-payment and deposit options.
              </p>
              <Link
                href="/#pricing"
                className="inline-flex min-h-12 items-center rounded-md bg-white px-6 text-sm font-semibold text-gray-950 transition hover:bg-gray-100"
              >
                Preorder Just Summit Headphones
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
