'use client'

import { CheckIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

const pricingTiers = [
  {
    name: 'Basic',
    price: '£25',
    originalPrice: '£35',
    description: 'Perfect for casual listeners who want to remember more',
    features: [
      '50 AI summaries per month',
      'Basic retention tracking',
      'Mobile app access',
      'Email support',
      'Standard processing speed',
      'ADHD-friendly interface'
    ],
    stripeLink: process.env.NEXT_PUBLIC_STRIPE_LINK_BASIC || '#',
    popular: false,
    savings: '29%'
  },
  {
    name: 'Advanced',
    price: '£49',
    originalPrice: '£69',
    description: 'For serious learners who struggle with information overload',
    features: [
      '200 AI summaries per month',
      'Advanced retention analytics',
      'Priority processing',
      'Custom summary lengths',
      'Spaced repetition system',
      'Export to note-taking apps',
      'Priority support',
      'ADHD learning strategies'
    ],
    stripeLink: process.env.NEXT_PUBLIC_STRIPE_LINK_ADVANCED || '#',
    popular: true,
    savings: '29%'
  },
  {
    name: 'Pro',
    price: '£99',
    originalPrice: '£139',
    description: 'For teams and power users who need maximum retention',
    features: [
      'Unlimited AI summaries',
      'Team collaboration features',
      'Custom AI training',
      'API access',
      'Advanced integrations',
      'Personal learning coach',
      'White-label options',
      'Dedicated account manager',
      'Memory optimization coaching'
    ],
    stripeLink: process.env.NEXT_PUBLIC_STRIPE_LINK_PRO || '#',
    popular: false,
    savings: '29%'
  }
]

export default function Pricing() {
  const handlePurchase = (stripeLink: string, tierName: string) => {
    // Track the purchase attempt
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture('pricing_tier_clicked', {
        tier: tierName,
        price: tierName === 'Basic' ? 25 : tierName === 'Advanced' ? 49 : 149
      })
    }
    
    // Open Stripe payment link
    window.open(stripeLink, '_blank')
  }

  return (
    <section id="pricing" className="section-padding bg-gray-50">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Stop Forgetting What You Learn
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pre-order now and save up to 40%. Built by someone who understands memory struggles. 
            All plans include lifetime updates and our 30-day money-back guarantee.
          </p>
          
          {/* Limited Time Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-100 text-accent-700 text-sm font-medium mt-6">
            <span className="w-2 h-2 bg-accent-500 rounded-full mr-2 animate-pulse"></span>
            Limited time: Pre-order pricing for memory-challenged brains
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-8 ${
                tier.popular
                  ? 'bg-white border-2 border-primary-500 shadow-xl scale-105'
                  : 'bg-white border border-gray-200 shadow-lg'
              } hover:shadow-xl transition-all duration-300`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <StarIcon className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Savings Badge */}
              <div className="absolute top-4 right-4">
                <div className="bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Save {tier.savings}
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 mb-4">{tier.description}</p>
                
                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-lg text-gray-500 line-through">{tier.originalPrice}</span>
                  </div>
                  <p className="text-sm text-gray-500">One-time payment • Lifetime access</p>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handlePurchase(tier.stripeLink, tier.name)}
                className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  tier.popular
                    ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
              >
                Pre-order {tier.name}
              </button>

              {/* Trust Signals */}
              <div className="text-center mt-4 text-xs text-gray-500">
                <p>✓ 30-day money-back guarantee</p>
                <p>✓ Secure payment via Stripe</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Questions about pricing? <a href="mailto:hello@justsummit.co" className="text-primary-600 hover:underline">Contact us</a>
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckIcon className="w-4 h-4 mr-1" />
              No subscription fees
            </div>
            <div className="flex items-center">
              <CheckIcon className="w-4 h-4 mr-1" />
              Lifetime updates
            </div>
            <div className="flex items-center">
              <CheckIcon className="w-4 h-4 mr-1" />
              Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

