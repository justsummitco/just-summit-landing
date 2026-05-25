import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { noindexMetadata } from "@/lib/seo";

export const metadata: Metadata = noindexMetadata(
  "Presale Status",
  "Current Just Summit Headphones presale status and preorder options."
);

export default function SoldOutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl rounded-lg bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
            Presale status
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-950">
            Current preorder options are on the main product page.
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            This status page is kept for older links. Visit the current Just Summit Headphones presale section to see the available reservation and full-payment options.
          </p>
          <Link
            href="/#pricing"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-gray-950 px-5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            View preorder options
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
