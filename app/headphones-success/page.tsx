import Link from 'next/link'

export default function HeadphonesSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl shadow-xl p-8">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Pre-Order Confirmed! 🎉
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Thank you for pre-ordering your AI Headphones. Your £49 deposit has been secured.
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-4">What happens next:</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">1</span>
              <div>
                <p className="font-medium text-gray-900">Confirmation Email</p>
                <p className="text-gray-600 text-sm">You'll receive a detailed confirmation email within 5 minutes</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">2</span>
              <div>
                <p className="font-medium text-gray-900">Development Updates</p>
                <p className="text-gray-600 text-sm">Monthly progress updates on hardware development and features</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">3</span>
              <div>
                <p className="font-medium text-gray-900">Final Payment</p>
                <p className="text-gray-600 text-sm">Remaining £250 charged 30 days before shipping</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">4</span>
              <div>
                <p className="font-medium text-gray-900">Delivery</p>
                <p className="text-gray-600 text-sm">Expected delivery: Q2 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Summary */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-3">Your Pre-Order</h3>
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="font-medium text-blue-900">AI Headphones</p>
              <p className="text-blue-700 text-sm">Privacy-first AI processing</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-blue-900">£299</p>
              <p className="text-blue-700 text-sm">£49 paid today</p>
            </div>
          </div>
        </div>

        {/* Refund Policy */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-yellow-800 text-sm">
            <strong>Full Refund Available:</strong> You can request a complete refund anytime before production begins. 
            No questions asked. Simply email us at support@justsummit.co
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Return to Homepage
          </Link>
          <Link 
            href="/#headphones"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            View Product Details
          </Link>
        </div>

        {/* Contact Support */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Have questions? <Link href="mailto:support@justsummit.co" className="text-blue-600 hover:underline">Contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

