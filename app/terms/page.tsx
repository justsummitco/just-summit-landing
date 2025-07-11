import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Just Summit',
  description: 'Terms and conditions for Just Summit services and the Genesis 50 program.',
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
            <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using the Just Summit website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Genesis 50 Program</h2>
              <div className="text-gray-700 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">2.1 Program Overview</h3>
                <p>
                  The Genesis 50 program is a limited pre-order offering with only 50 slots available (25 Advanced, 25 Professional). This is a one-time program that will never be repeated.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900">2.2 Program Benefits</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Advanced tier: 6 months free premium subscription (£77.94 value)</li>
                  <li>Professional tier: 12 months free premium subscription (£155.88 value)</li>
                  <li>20% lifetime discount on all future subscriptions</li>
                  <li>Exclusive Genesis 50 badge and recognition</li>
                  <li>Private Slack community access</li>
                  <li>Direct roadmap influence and priority beta access</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900">2.3 Exclusivity</h3>
                <p>
                  Genesis 50 benefits are exclusive to the first 50 purchasers and will never be offered again. Future cohorts, including Kickstarter backers, will not receive these specific benefits or pricing.
                </p>

                <h3 className="text-xl font-semibold text-gray-900">2.4 Slot Allocation</h3>
                <p>
                  Slots are allocated on a first-come, first-served basis. Payment confirmation secures your slot. Abandoned checkout sessions will release reserved slots after 30 minutes.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Payment Terms</h2>
              <div className="text-gray-700 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">3.1 Pricing</h3>
                <p>
                  Genesis 50 Advanced: £49 one-time payment<br/>
                  Genesis 50 Professional: £99 one-time payment
                </p>

                <h3 className="text-xl font-semibold text-gray-900">3.2 Payment Processing</h3>
                <p>
                  All payments are processed securely through Stripe. We do not store your payment information on our servers.
                </p>

                <h3 className="text-xl font-semibold text-gray-900">3.3 Refund Policy</h3>
                <p>
                  We offer a 30-day money-back guarantee from the date of purchase. Refunds will be processed to the original payment method within 5-10 business days. Refunded slots may be made available to other customers.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Service Availability</h2>
              <div className="text-gray-700 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">4.1 Development Timeline</h3>
                <p>
                  Just Summit is currently in development. Private beta access is planned for Q4 2025, with public launch to follow. These timelines are estimates and may be subject to change.
                </p>

                <h3 className="text-xl font-semibold text-gray-900">4.2 Service Delivery</h3>
                <p>
                  Genesis 50 benefits will be activated upon the launch of the Just Summit platform. We will notify all Genesis 50 members via email when services become available.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Responsibilities</h2>
              <div className="text-gray-700 space-y-4">
                <p>You agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete information when making purchases</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Use the service in compliance with all applicable laws</li>
                  <li>Not share Genesis 50 exclusive benefits with non-members</li>
                  <li>Respect the private nature of the Genesis 50 Slack community</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700">
                All content, features, and functionality of Just Summit, including but not limited to text, graphics, logos, and software, are owned by Just Summit and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700">
                Just Summit shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
              <p className="text-gray-700">
                We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
              <p className="text-gray-700">
                These Terms shall be interpreted and governed by the laws of England and Wales, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms & Conditions, please contact us at{' '}
                <a href="mailto:hello@justsummit.co" className="text-blue-600 hover:text-blue-800">
                  hello@justsummit.co
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

