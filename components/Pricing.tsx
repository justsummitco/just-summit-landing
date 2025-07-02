'use client'

import { CheckIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

const pricingTiers = [
  {
    name: 'Basic Pre-Order',
    price: '£25',
    description: 'Support Summit early and get 1-month premium on launch.',
    features: [
      '1 Month Premium Subscription (£12.99 value)',
      'Early Beta Access to Summit App',
      'Exclusive Early-Adopter Community',
      'Early Supporter Recognition',
    ],
    stripeLink: process.env.NEXT_PUBLIC_STRIPE_LINK_BASIC || '#',
  },
  {
    name: 'Advanced Pre-Order',
    price: '£49',
    description: '6 months premium, lifetime upgrades, priority support.',
    features: [
      '6 Months Premium Subscription (~£77.94 value)',
      'Unlimited Summaries during beta',
      'Lifetime Premium Feature Upgrades',
      'Monthly Behind-the-Scenes Updates',
      'Priority Email Support (24 h)',
      'Advanced Early-Adopter Recognition',
    ],
    stripeLink: process.env.NEXT_PUBLIC_STRIPE_LINK_ADVANCED || '#',
    popular: true,
  },
  {
    name: 'Professional Pre-Order',
    price: '£99',
    description: '12 months premium, team seats, product-shaping access.',
    features: [
      '12 Months Premium Subscription (£155.88 value)',
      'Unlimited Summaries',
      '3 Team Seats',
      'Early API & Zapier Access (beta)',
      'Monthly Product-Shaping Group Calls',
      'Founder Welcome Video Onboarding',
      'Professional Early-Adopter Recognition',
    ],
    stripeLink: process.env.NEXT_PUBLIC_STRIPE_LINK_PRO || '#',
  },
]

export default function Pricing() {
  const handlePurchase = (stripeLink: string, tierName: string) => {
    // Track the purchase attempt
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture('pricing_tier_clicked', {
        tier: tierName,
        price: tierName === 'Basic Pre-Order' ? 25 : tierName === 'Advanced Pre-Order' ? 49 : 99
      })
    }
    
    // Open Stripe link
    if (stripeLink && stripeLink !== '#') {
      window.open(stripeLink, '_blank')
    }
  }

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Early-Adopter Pre-Orders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join our founding community and get premium access at early-adopter pricing. 
            Help shape Summit while securing your spot before launch.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                tier.popular 
                  ? 'border-2 border-blue-600 ring-2 ring-blue-600 ring-opacity-50' 
                  : 'border border-gray-200'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <StarIcon className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Tier Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {tier.name}
                </h3>

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
                  onClick={() => handlePurchase(tier.stripeLink, tier.name)}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                    tier.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  Pre-Order Now — Limited Spots
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
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Questions about early-adopter pricing?{' '}
            <a href="#faq" className="text-blue-600 hover:text-blue-800 font-medium">
              Check our FAQ
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

