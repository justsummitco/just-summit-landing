'use client'

import { CheckIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'

interface SlotData {
  advancedRemaining: number;
  proRemaining: number;
  advancedTotal: number;
  proTotal: number;
  lastUpdated: string;
}

const pricingTiers = [
  {
    name: 'Genesis 50 Advanced',
    price: '£49',
    originalPrice: '£77.94',
    description: '6 months free + 20% lifetime software discount',
    features: [
      '6 Months Premium Subscription (£77.94 value)',
      '20% lifetime software discount after free period',
      '🥇 Genesis 50 badge & recognition',
      'Private Slack community access',
      'Direct roadmap influence',
      'Priority beta access',
      'Exclusive Genesis 50 perks',
    ],
    tierName: 'Advanced Pre-Order',
    slotType: 'advanced' as const,
  },
  {
    name: 'Genesis 50 Pro',
    price: '£99',
    originalPrice: '£155.88',
    description: '12 months free + 20% lifetime software discount',
    features: [
      '12 Months Premium Subscription (£155.88 value)',
      '20% lifetime software discount after free period',
      '🥇 Genesis 50 badge & recognition',
      'Private Slack community access',
      'Direct roadmap influence',
      'Team collaboration features',
      'Priority support & onboarding',
      'Exclusive Genesis 50 perks',
    ],
    tierName: 'Professional Pre-Order',
    popular: true,
    slotType: 'pro' as const,
  },
]

export default function Pricing() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [slotData, setSlotData] = useState<SlotData | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch slot data on component mount and periodically
  useEffect(() => {
    const fetchSlotData = async () => {
      try {
        const response = await fetch('/api/slots')
        const result = await response.json()
        
        if (result.success) {
          setSlotData(result.data)
        } else {
          setError('Failed to load slot data')
        }
      } catch (err) {
        console.error('Error fetching slot data:', err)
        setError('Failed to load slot data')
      }
    }

    fetchSlotData()
    
    // Refresh slot data every 30 seconds
    const interval = setInterval(fetchSlotData, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const getSlotInfo = (slotType: 'advanced' | 'pro') => {
    if (!slotData) {
      return { remaining: 25, total: 25 } // Default values while loading
    }
    
    if (slotType === 'advanced') {
      return { remaining: slotData.advancedRemaining, total: slotData.advancedTotal }
    } else {
      return { remaining: slotData.proRemaining, total: slotData.proTotal }
    }
  }

  const handlePurchase = async (tierName: string, displayName: string) => {
    setIsLoading(tierName)
    
    // Track the purchase attempt
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture('genesis_50_tier_clicked', {
        tier: tierName,
        displayName: displayName,
        price: tierName === 'Advanced Pre-Order' ? 49 : 99
      })
    }
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tierName }),
      })

      const data = await response.json()

      if (response.ok && data.sessionId) {
        // Redirect to Stripe Checkout
        const stripe = await import('@stripe/stripe-js').then(mod => 
          mod.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
        )
        
        if (stripe) {
          await stripe.redirectToCheckout({ sessionId: data.sessionId })
        }
      } else {
        console.error('Failed to create checkout session:', data.error)
        if (data.error.includes('No slots available')) {
          alert('Sorry, this tier is now sold out! Please try the other tier or join our waitlist.')
          // Refresh slot data to show updated counts
          window.location.reload()
        } else {
          alert('Something went wrong. Please try again.')
        }
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsLoading(null)
    }
  }

  // Check if all slots are sold out
  const allSoldOut = slotData && slotData.advancedRemaining === 0 && slotData.proRemaining === 0

  if (allSoldOut) {
    // Redirect to sold out page
    if (typeof window !== 'undefined') {
      window.location.href = '/sold-out'
    }
    return null
  }

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-black text-sm font-bold mb-6">
            🥇 Genesis 50 Early Access Program
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Genesis 50 (Site-Only)
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            50 total slots – 25 Advanced (£49, 6 months free) · 25 Pro (£99, 12 months free)<br/>
            20% lifetime software discount after the free period<br/>
            🥇 Genesis 50 badge, private Slack, roadmap influence
          </p>
          
          {/* Scarcity Indicator */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-red-800 font-semibold text-sm">
              ⚠️ Only 50 slots will ever exist • No future cohort will get these benefits
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto mb-8">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-8 max-w-4xl mx-auto pt-16">
          {pricingTiers.map((tier) => {
            const slotInfo = getSlotInfo(tier.slotType)
            const isSoldOut = slotInfo.remaining === 0
            
            return (
              <div
                key={tier.name}
                className={`relative bg-white rounded-2xl shadow-lg overflow-visible ${
                  tier.popular 
                    ? 'border-2 border-blue-600 ring-2 ring-blue-600 ring-opacity-50' 
                    : 'border border-gray-200'
                } ${isSoldOut ? 'opacity-75' : ''}`}
              >
                {tier.popular && !isSoldOut && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-lg">
                      <StarIcon className="w-4 h-4 mr-1" />
                      Best Value
                    </div>
                  </div>
                )}

                {isSoldOut && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      Sold Out
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Tier Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {tier.name}
                  </h3>

                  {/* Slots Remaining */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Slots remaining:</span>
                      <span className={`font-bold ${isSoldOut ? 'text-red-600' : 'text-green-600'}`}>
                        {slotInfo.remaining}/{slotInfo.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          isSoldOut ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(slotInfo.remaining / slotInfo.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6">
                    {tier.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold text-gray-900">
                        {tier.price}
                      </span>
                      <span className="text-gray-500 ml-2">one-time</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      <span className="line-through">{tier.originalPrice} value</span>
                      <span className="text-green-600 font-semibold ml-2">Save {Math.round(((parseFloat(tier.originalPrice.replace('£', '')) - parseFloat(tier.price.replace('£', ''))) / parseFloat(tier.originalPrice.replace('£', ''))) * 100)}%</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePurchase(tier.tierName, tier.name)}
                    disabled={isLoading === tier.tierName || isSoldOut}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                      isSoldOut
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : tier.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    {isLoading === tier.tierName ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : isSoldOut ? (
                      'Sold Out'
                    ) : (
                      'Pre-Order Genesis 50'
                    )}
                  </button>

                  {/* Guarantee */}
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                      ✓ 30-day money-back guarantee
                    </p>
                    <p className="text-sm text-gray-500">
                      ✓ Secure payment via Stripe
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Questions about Genesis 50?{' '}
            <a href="#faq" className="text-blue-600 hover:text-blue-800 font-medium">
              Check our FAQ
            </a>
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-yellow-800 font-semibold">
              🚨 When Genesis 50 slots sell out, the offer is removed site-wide and new visitors see a "Sold Out – join wait-list" page.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

