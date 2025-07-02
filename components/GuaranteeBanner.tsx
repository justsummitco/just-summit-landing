'use client'

import { ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function GuaranteeBanner() {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <ShieldCheckIcon className="w-8 h-8 text-green-600 mr-4 flex-shrink-0" />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-green-900 mb-1">
                30-Day No-Risk Guarantee
              </h3>
              <p className="text-green-800">
                If Summit doesn't improve your learning experience within 30 days, 
                we'll refund your pre-order. No hassle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

