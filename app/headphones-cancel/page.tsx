import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Checkout Cancelled",
  description: "Your Just Summit AI Headphones preorder checkout was cancelled.",
};

export default function HeadphonesCancel() {
  return (
    <>
      <Header />
      <main className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl rounded-lg bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-700">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <h1 className="mt-8 text-4xl font-semibold tracking-tight text-gray-950">
            Checkout cancelled
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            No payment was processed. You can return to the presale options or join the updates list if you want more product news first.
          </p>

          <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
            {[
              ["Full payment", "£249 today with priority allocation."],
              ["Deposit", "£49 today and £250 due 60 days pre-ship."],
              ["Guarantee", "30-day money-back guarantee."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h2 className="font-semibold text-gray-950">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/#pricing"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-gray-950 px-5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Try preorder again
            </Link>
            <Link
              href="/#updates"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-gray-300 px-5 text-sm font-semibold text-gray-950 transition hover:bg-gray-50"
            >
              Get product updates
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
