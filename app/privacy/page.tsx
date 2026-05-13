import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Just Summit website and AI Headphones presale.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <h1>Privacy Policy</h1>
            <p className="text-gray-600">Last updated: 11 May 2026</p>

            <h2>1. Overview</h2>
            <p>
              Just Summit collects only the information needed to operate the website, manage AI Headphones presales, send product updates, provide support, and improve the customer experience.
            </p>

            <h2>2. Information We Collect</h2>
            <ul>
              <li>Name and email address when you join the updates list or contact us.</li>
              <li>Checkout details provided through Stripe, such as billing information and payment status.</li>
              <li>Basic website analytics, device, and usage data where analytics are enabled.</li>
              <li>Messages or support requests you send to us.</li>
            </ul>

            <h2>3. How We Use Information</h2>
            <ul>
              <li>To process and manage presales.</li>
              <li>To send preorder, production, delivery, and product updates.</li>
              <li>To respond to questions and support requests.</li>
              <li>To understand website performance and improve conversion paths.</li>
              <li>To comply with legal, tax, fraud-prevention, and security obligations.</li>
            </ul>

            <h2>4. Service Providers</h2>
            <p>
              We use trusted service providers for payment processing, email updates, hosting, and analytics if configured. These providers process data according to their own privacy and security terms.
            </p>

            <h2>5. Payment Data</h2>
            <p>
              Card payments are handled by Stripe. Just Summit does not store complete card details on its servers.
            </p>

            <h2>6. Marketing Email</h2>
            <p>
              If you join the updates list or preorder, we may send relevant product and production updates. You can unsubscribe from marketing emails at any time using the unsubscribe link in those emails.
            </p>

            <h2>7. Your Rights</h2>
            <p>
              Depending on your location, you may have rights to access, correct, delete, restrict, or object to the processing of your personal data. To make a request, email{" "}
              <a href="mailto:hello@justsummit.co">hello@justsummit.co</a>.
            </p>

            <h2>8. Data Retention</h2>
            <p>
              We retain personal information for as long as needed to manage presales, provide support, meet legal obligations, resolve disputes, and maintain appropriate business records.
            </p>

            <h2>9. Contact</h2>
            <p>
              Questions about this policy can be sent to{" "}
              <a href="mailto:hello@justsummit.co">hello@justsummit.co</a>.
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
