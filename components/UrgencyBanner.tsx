'use client'

export default function UrgencyBanner() {
  return (
    <div className="bg-yellow-400 border-l-4 border-yellow-500">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <span className="text-2xl mr-2">⚡</span>
            <p className="text-gray-900 font-medium">
              Limited early-adopter spots available. Secure yours now.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

