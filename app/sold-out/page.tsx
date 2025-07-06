import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Genesis 50 Sold Out | Just Summit',
  description: 'Genesis 50 early access program is sold out. Join our waitlist for future opportunities.',
}

export default function SoldOutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Genesis 50 Sold Out
          </h1>
          <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full text-red-800 text-sm font-medium mb-6">
            🔥 All 50 slots claimed
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              You missed Genesis 50
            </h2>
            <p className="text-gray-600 mb-6">
              All 50 Genesis 50 slots have been claimed. This was a one-time offer with exclusive benefits that will never be repeated.
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 text-sm font-semibold">
                ⚠️ Genesis 50 benefits (20% lifetime discount, exclusive badge, private Slack) are permanently unavailable
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What's next?
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Join our waitlist for future pre-order opportunities</li>
                <li>• Follow our progress toward public launch</li>
                <li>• Get notified about beta access</li>
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Join the waitlist
              </h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Join Waitlist
                </button>
              </form>
              <p className="text-xs text-gray-500 text-center mt-3">
                ✓ No spam ✓ Product updates ✓ Early access opportunities
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6 text-center">
              <Link 
                href="/"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to homepage
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Genesis 50 Final Stats
          </h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-2xl font-bold text-blue-600">25</div>
              <div className="text-sm text-gray-600">Advanced slots</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-2xl font-bold text-blue-600">25</div>
              <div className="text-sm text-gray-600">Pro slots</div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Sold out in record time • Thank you to our founding community
          </p>
        </div>
      </div>
    </div>
  )
}
