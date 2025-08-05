'use client'

import { useState } from 'react'

export default function StripeCheckout({ productType, tier, price, depositAmount }) {
  const [loading, setLoading] = useState(false)

  const handlePreOrder = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productType: productType,
          tier: tier,
          price: price,
          depositAmount: depositAmount,
          successUrl: `${window.location.origin}/headphones-success`,
          cancelUrl: `${window.location.origin}/headphones-cancel`,
        }),
      })

      const { url } = await response.json()
      
      if (url) {
        window.location.href = url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePreOrder}
      disabled={loading}
      className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </div>
       ) : (
        `Pre-Order Now - £${(depositAmount / 100).toFixed(0)} Deposit`
      )}
    </button>
  )
}
