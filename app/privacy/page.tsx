import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Just Summit',
  description: 'Privacy policy for Just Summit services and data protection practices.',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Just Summit ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services, including the Genesis 50 program.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              <div className="text-gray-700 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">2.1 Personal Information</h3>
                <p>We may collect personal information that you voluntarily provide to us when you:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Purchase a Genesis 50 slot</li>
                  <li>Subscribe to our email newsletter</li>
                  <li>Contact us via email</li>
                  <li>Join our Slack community</li>
                </ul>
                <p>This information may include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name and email address</li>
                  <li>Billing address and payment information</li>
                  <li>Communication preferences</li>
                  <li>Any information you provide in communications with us</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900">2.2 Automatically Collected Information</h3>
                <p>When you visit our website, we may automatically collect certain information about your device, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP address and browser type</li>
                  <li>Operating system and device information</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website addresses</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900">2.3 Cookies and Tracking Technologies</h3>
                <p>
                  We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <div className="text-gray-700 space-y-4">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process Genesis 50 purchases and deliver program benefits</li>
                  <li>Send welcome emails and program updates</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                  <li>Prevent fraud and ensure security</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Services</h2>
              <div className="text-gray-700 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">4.1 Payment Processing</h3>
                <p>
                  We use Stripe to process payments. Stripe may collect and use your payment information in accordance with their privacy policy. We do not store your complete payment card information on our servers.
                </p>

                <h3 className="text-xl font-semibold text-gray-900">4.2 Email Marketing</h3>
                <p>
                  We use Brevo (formerly Sendinblue) for email marketing and automation. Your email address and related information may be stored and processed by Brevo in accordance with their privacy policy.
                </p>

                <h3 className="text-xl font-semibold text-gray-900">4.3 Analytics</h3>
                <p>
                  We may use analytics services to understand how visitors interact with our website. These services may collect information about your usage patterns.
                </p>

                <h3 className="text-xl font-semibold text-gray-900">4.4 Hosting and Infrastructure</h3>
                <p>
                  Our website is hosted on Vercel, and we may use other cloud services for data storage and processing.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Sharing and Disclosure</h2>
              <div className="text-gray-700 space-y-4">
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To trusted service providers who assist us in operating our website and conducting our business</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a business transfer or acquisition</li>
                  <li>With your explicit consent</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
              <p className="text-gray-700">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. Genesis 50 member information will be retained to honor lifetime benefits.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Rights</h2>
              <div className="text-gray-700 space-y-4">
                <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access: Request a copy of the personal information we hold about you</li>
                  <li>Rectification: Request correction of inaccurate or incomplete information</li>
                  <li>Erasure: Request deletion of your personal information</li>
                  <li>Portability: Request transfer of your data to another service</li>
                  <li>Objection: Object to certain processing of your information</li>
                  <li>Restriction: Request limitation of processing in certain circumstances</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at{' '}
                  <a href="mailto:hello@justsummit.co" className="text-blue-600 hover:text-blue-800">
                    hello@justsummit.co
                  </a>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
              <p className="text-gray-700">
                Your information may be transferred to and processed in countries other than your own. We ensure that such transfers are conducted in accordance with applicable data protection laws and with appropriate safeguards in place.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
              <p className="text-gray-700">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4">
                <p className="text-gray-700">
                  Email:{' '}
                  <a href="mailto:hello@justsummit.co" className="text-blue-600 hover:text-blue-800">
                    hello@justsummit.co
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

