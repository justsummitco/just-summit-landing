import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund policy for Just Summit AI Headphones presales.",
};

export default function RefundsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <h1>Refund Policy</h1>
            <p className="text-gray-600">Last updated: 11 May 2026</p>

            <h2>30-Day Money-Back Guarantee</h2>
            <p>
              Just Summit AI Headphones presales are covered by a 30-day money-back guarantee. If you are not satisfied with your preorder, you can request a refund within 30 days of your purchase date.
            </p>

            <h2>Eligible Purchases</h2>
            <ul>
              <li>Full-payment preorder: £249 today.</li>
              <li>Deposit preorder: £49 today plus £250 later.</li>
              <li>Requests made within 30 days of the original purchase date.</li>
            </ul>

            <h2>How to Request a Refund</h2>
            <p>
              Email{" "}
              <a href="mailto:hello@justsummit.co">hello@justsummit.co</a>{" "}
              with the subject line "Headphones Refund Request". Include the name and email address used at checkout and your purchase date if available.
            </p>

            <h2>Processing</h2>
            <p>
              Approved refunds are processed to the original payment method. Stripe and bank processing times can vary, but refunds usually appear within 5-10 business days after processing.
            </p>

            <h2>Deposit Balance</h2>
            <p>
              Deposit customers pay the remaining £250 60 days before shipping. If you receive a refund for your deposit, your preorder allocation may be released.
            </p>

            <h2>Delivery Timing</h2>
            <p>
              Estimated first-batch delivery window: Q4 2026. Delivery dates are estimates and may change as production progresses. Material changes will be communicated to preorder customers by email.
            </p>

            <h2>Questions</h2>
            <p>
              For refund questions, contact{" "}
              <a href="mailto:hello@justsummit.co">hello@justsummit.co</a>.
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
