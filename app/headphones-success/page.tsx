import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Preorder Confirmed",
  description: "Your Just Summit AI Headphones preorder has been confirmed.",
};

export default function HeadphonesSuccess() {
  return (
    <>
      <Header />
      <main className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="mt-8 text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-950">
              Preorder confirmed
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Thank you for securing your Just Summit AI Headphones. Stripe has processed your payment and will send a receipt to the email used at checkout.
            </p>
          </div>

          <div className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-lg font-semibold text-gray-950">What happens next</h2>
            <div className="mt-6 grid gap-5">
              {[
                ["Confirmation", "You will receive payment confirmation from Stripe."],
                ["Production updates", "We will share development and production milestones by email."],
                ["Delivery window", "Estimated first-batch delivery window: Q4 2026."],
                ["Deposit balance", "Deposit customers pay the remaining £250 60 days before shipping."],
              ].map(([title, body]) => (
                <div key={title} className="flex gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                  <div>
                    <h3 className="font-medium text-gray-950">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-teal-100 bg-teal-50 p-5 text-sm leading-6 text-teal-900">
            Your preorder is covered by a 30-day money-back guarantee. To request help, email{" "}
            <a href="mailto:hello@justsummit.co" className="font-semibold underline">
              hello@justsummit.co
            </a>
            .
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/#product"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-gray-950 px-5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              View product details
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-gray-300 px-5 text-sm font-semibold text-gray-950 transition hover:bg-gray-50"
            >
              Return home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
