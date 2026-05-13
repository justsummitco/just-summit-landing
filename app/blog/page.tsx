import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "../../lib/mdx";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Just Summit Blog",
  description:
    "Notes on audio learning, recall, privacy-first AI, and the Just Summit AI Headphones journey.",
  openGraph: {
    title: "Just Summit Blog",
    description:
      "Notes on audio learning, recall, privacy-first AI, and the Just Summit AI Headphones journey.",
    images: ["/hero-headphones-clean.png"],
  },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="mb-6 text-4xl font-semibold tracking-tight text-gray-950 md:text-5xl">
              Just Summit Blog
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-8 text-gray-600">
              Notes on better listening, recall, privacy-first AI, and the hardware journey behind Just Summit AI Headphones.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <div className="py-12 text-center">
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  Coming soon
                </h2>
                <p className="text-gray-600">
                  We are preparing useful notes on audio learning and product development.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="p-6">
                      {post.tags.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-block rounded-full bg-teal-50 px-2 py-1 text-xs font-medium text-teal-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <h2 className="mb-3 text-xl font-semibold text-gray-950">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="transition hover:text-teal-700"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      <p className="mb-4 line-clamp-3 text-gray-600">
                        {post.excerpt}
                      </p>

                      <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span>{post.readingTime}</span>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center font-medium text-teal-700 transition hover:text-teal-900"
                      >
                        Read more
                        <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="bg-gray-950 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-semibold text-white">
              Ready to turn listening into recall?
            </h2>
            <p className="mb-8 text-xl text-white/70">
              Just Summit AI Headphones are available for presale with full-payment and deposit options.
            </p>
            <Link
              href="/#pricing"
              className="inline-flex min-h-12 items-center rounded-md bg-white px-6 text-sm font-semibold text-gray-950 transition hover:bg-gray-100"
            >
              Preorder the AI Headphones
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
