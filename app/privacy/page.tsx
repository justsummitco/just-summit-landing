import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Just Summit website and Just Summit Headphones presale.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <h1>Privacy Policy</h1>
            <p className="text-gray-600">Last updated: 22 August 2026</p>

            <h2>1. Overview</h2>
            <p>
              Just Summit collects only the information needed to operate the website, manage Just Summit Headphones presales, send product updates, provide support, and improve the customer experience.
            </p>

            <h2>2. Information We Collect</h2>
            <ul>
              <li>Name and email address when you join the Founding List or contact us.</li>
              <li>Checkout details provided through Stripe, such as billing information and payment status.</li>
              <li>Basic website analytics, device, and usage data where analytics are enabled.</li>
              <li>Messages or support requests you send to us.</li>
              <li>
                If you choose Sign in with Google, the basic account details Google makes available for authentication, such as your Google account identifier, email address, name, and profile image.
              </li>
            </ul>

            <h2>3. How We Use Information</h2>
            <ul>
              <li>To process and manage presales.</li>
              <li>To send preorder, production, delivery, and product updates.</li>
              <li>To respond to questions and support requests.</li>
              <li>To understand website performance and improve conversion paths.</li>
              <li>To create, authenticate, secure, and support your Summit account.</li>
              <li>To comply with legal, tax, fraud-prevention, and security obligations.</li>
            </ul>

            <h2>4. Google Sign-In</h2>
            <p>
              If you choose Sign in with Google, we use the standard Google identity information described above only to create or authenticate your Summit account, associate your Summit data with that account, and protect access to it. Summit does not receive your Google password, and this sign-in flow does not request access to your Gmail, Google Drive, Google Calendar, or other Google content.
            </p>
            <p>
              Google and Supabase process the authentication request and session as service providers. We do not sell Google sign-in data or use it for advertising. We retain the account details for as long as your Summit account remains active, subject to legal, security, and fraud-prevention requirements. You can request deletion through the app&apos;s account controls or by emailing{" "}
              <a href="mailto:hello@justsummit.co">hello@justsummit.co</a>.
            </p>
            <p>
              Summit&apos;s use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including its Limited Use requirements.
            </p>

            <h2>5. Service Providers</h2>
            <p>
              We use trusted service providers for payment processing, email updates, hosting, and analytics if configured. These providers process data according to their own privacy and security terms.
            </p>

            <h2>6. Payment Data</h2>
            <p>
              Card payments are handled by Stripe. Just Summit does not store complete card details on its servers.
            </p>

            <h2>7. Marketing Email</h2>
            <p>
              If you join the Founding List or preorder, we may send relevant product, prototype and production updates. You can unsubscribe from marketing emails at any time using the unsubscribe link in those emails.
            </p>

            <h2>8. Your Rights</h2>
            <p>
              Depending on your location, you may have rights to access, correct, delete, restrict, or object to the processing of your personal data. To make a request, email{" "}
              <a href="mailto:hello@justsummit.co">hello@justsummit.co</a>.
            </p>

            <h2>9. Data Retention</h2>
            <p>
              We retain personal information for as long as needed to manage presales, provide support, meet legal obligations, resolve disputes, and maintain appropriate business records.
            </p>

            <h2>10. Contact</h2>
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
