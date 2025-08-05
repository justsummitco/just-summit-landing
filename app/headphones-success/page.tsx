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
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded mr-3 mt-0.5">1</span>
              <p className="text-gray-700">You'll receive regular development updates via email</p>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded mr-3 mt-0.5">2</span>
              <p className="text-gray-700">We'll charge the remaining balance 30 days before shipping</p>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded mr-3 mt-0.5">3</span>
              <p className="text-gray-700">Expected shipping: <strong>Q2 2026</strong></p>
            </div>
          </div>
        </div>

        {/* Refund Policy */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <p className="text-green-800 text-sm">
            <strong>Full Refund Available:</strong> You can request a complete refund anytime before production begins.
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
            href="mailto:support@justsummit.co"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
