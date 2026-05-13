import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for Just Summit AI Headphones presales.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <h1>Terms & Conditions</h1>
            <p className="text-gray-600">Last updated: 11 May 2026</p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By using the Just Summit website or placing a preorder, you agree to these terms. If you do not agree, please do not use the website or place a preorder.
            </p>

            <h2>2. Product Presale</h2>
            <p>
              Just Summit AI Headphones are available for presale. The product is in development, and specifications, features, production timing, and delivery timing may change before shipment.
            </p>

            <h2>3. Pricing and Payment</h2>
            <p>
              The full-payment preorder is £249 today. The deposit preorder is £49 today plus £250 later, for a £299 total. Deposit balances are due 60 days before shipping.
            </p>
            <p>
              Payments are processed securely by Stripe. Just Summit does not store complete card details on its servers.
            </p>

            <h2>4. Delivery</h2>
            <p>
              Estimated first-batch delivery window: Q4 2026. This is an estimate, not a guaranteed delivery date. We will share meaningful production updates with preorder customers by email.
            </p>

            <h2>5. Refunds</h2>
            <p>
              Presales are covered by a 30-day money-back guarantee. Refund requests should be sent to{" "}
              <a href="mailto:hello@justsummit.co">hello@justsummit.co</a>.
              Please see the Refund Policy for more detail.
            </p>

            <h2>6. Product Claims</h2>
            <p>
              Feature descriptions are based on the product direction and development goals. Final hardware, software, performance, battery life, app support, and AI capabilities may differ from descriptions shown before shipment.
            </p>

            <h2>7. Intellectual Property</h2>
            <p>
              The Just Summit name, branding, product content, images, website, and related materials are owned by Just Summit or its licensors and are protected by applicable intellectual property laws.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Just Summit will not be liable for indirect, incidental, special, consequential, or punitive damages arising from use of the website or presale process.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These terms are governed by the laws of England and Wales.
            </p>

            <h2>10. Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a href="mailto:hello@justsummit.co">hello@justsummit.co</a>.
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
