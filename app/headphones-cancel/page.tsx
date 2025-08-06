import Link from 'next/link'

export default function HeadphonesCancel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl shadow-xl p-8">
        {/* Cancel Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        {/* Cancel Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Pre-Order Cancelled
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          No worries! Your pre-order was cancelled and no payment was processed.
        </p>

        {/* Why People Cancel */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-4">Common reasons people come back:</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div>
                <p className="font-medium text-gray-900">Privacy Concerns</p>
                <p className="text-gray-600 text-sm">All AI processing happens on-device. Your data never leaves your headphones.</p>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium text-gray-900">Full Refund Policy</p>
                <p className="text-gray-600 text-sm">Complete refund available anytime before production begins. No questions asked.</p>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-purple-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div>
                <p className="font-medium text-gray-900">Just £49 Deposit</p>
                <p className="text-gray-600 text-sm">Secure your spot with a small deposit. Final payment only 30 days before shipping.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Highlights */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-3">What You're Missing</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-left">
              <p className="font-medium text-blue-900">✓ Real-time AI transcription</p>
              <p className="font-medium text-blue-900">✓ Premium noise cancellation</p>
              <p className="font-medium text-blue-900">✓ 30-hour battery life</p>
            </div>
            <div className="text-left">
              <p className="font-medium text-blue-900">✓ On-device privacy</p>
              <p className="font-medium text-blue-900">✓ Mobile app included</p>
              <p className="font-medium text-blue-900">✓ Ships Q2 2026</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/#headphones"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Try Pre-Order Again
          </Link>
          <Link 
            href="/"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Return to Homepage
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

