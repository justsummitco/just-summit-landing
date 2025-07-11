import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Refund Policy | Just Summit',
  description: 'Refund policy for Just Summit Genesis 50 program and services.',
}

export default function RefundsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">30-Day Money-Back Guarantee</h2>
              <p className="text-gray-700 mb-4">
                We stand behind the Genesis 50 program with a comprehensive 30-day money-back guarantee. If you're not completely satisfied with your purchase, you can request a full refund within 30 days of your purchase date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Eligibility</h2>
              <div className="text-gray-700 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Eligible for Refund:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Genesis 50 Advanced purchases (£49)</li>
                  <li>Genesis 50 Professional purchases (£99)</li>
                  <li>Requests made within 30 days of purchase</li>
                  <li>Any reason - no questions asked</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900">Important Notes:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Refunded Genesis 50 slots may be made available to other customers</li>
                  <li>Access to the Genesis 50 Slack community will be revoked upon refund</li>
                  <li>Genesis 50 benefits and lifetime discounts are forfeited with refund</li>
                  <li>You cannot repurchase Genesis 50 after receiving a refund (limited to 50 total slots)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Request a Refund</h2>
              <div className="text-gray-700 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Step 1: Contact Us</h3>
                <p>
                  Email us at{' '}
                  <a href="mailto:hello@justsummit.co" className="text-blue-600 hover:text-blue-800">
                    hello@justsummit.co
                  </a>{' '}
                  with the subject line "Genesis 50 Refund Request"
                </p>

                <h3 className="text-xl font-semibold text-gray-900">Step 2: Provide Information</h3>
                <p>Please include the following in your refund request:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your full name</li>
                  <li>Email address used for purchase</li>
                  <li>Purchase date</li>
                  <li>Genesis 50 tier (Advanced or Professional)</li>
                  <li>Reason for refund (optional)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900">Step 3: Confirmation</h3>
                <p>
                  We will confirm your refund request within 24 hours and process the refund within 5-10 business days.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Processing</h2>
              <div className="text-gray-700 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Processing Time</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Refund approval: Within 24 hours of request</li>
                  <li>Refund processing: 5-10 business days</li>
                  <li>Bank/card processing: Additional 3-5 business days (varies by bank)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900">Refund Method</h3>
                <p>
                  All refunds will be processed to the original payment method used for the purchase. We cannot process refunds to different payment methods or accounts.
                </p>

                <h3 className="text-xl font-semibold text-gray-900">Refund Amount</h3>
                <p>
                  You will receive a full refund of the amount paid, including any applicable taxes. Payment processing fees are non-refundable.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Special Circumstances</h2>
              <div className="text-gray-700 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Service Launch Delays</h3>
                <p>
                  If the Just Summit platform launch is delayed beyond Q4 2025, Genesis 50 members will be eligible for refunds regardless of the 30-day window, until the service launches.
                </p>

                <h3 className="text-xl font-semibold text-gray-900">Technical Issues</h3>
                <p>
                  If technical issues prevent you from accessing Genesis 50 benefits after service launch, we will work to resolve the issue or provide a full refund.
                </p>

                <h3 className="text-xl font-semibold text-gray-900">Disputed Charges</h3>
                <p>
                  If you dispute a charge with your bank or credit card company, please contact us first. We're committed to resolving any issues directly and quickly.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Non-Refundable Items</h2>
              <div className="text-gray-700 space-y-4">
                <p>The following are not eligible for refunds:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment processing fees charged by Stripe</li>
                  <li>Benefits already consumed (e.g., months of service already used)</li>
                  <li>Requests made after the 30-day window (except in special circumstances)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700">
                For any questions about our refund policy or to request a refund, please contact us:
              </p>
              <div className="mt-4">
                <p className="text-gray-700">
                  Email:{' '}
                  <a href="mailto:hello@justsummit.co" className="text-blue-600 hover:text-blue-800">
                    hello@justsummit.co
                  </a>
                </p>
                <p className="text-gray-700 mt-2">
                  Subject: "Genesis 50 Refund Request"
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Refund Policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

