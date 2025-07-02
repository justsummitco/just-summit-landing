'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "When does Summit launch?",
    answer: "Summit is currently in development with a planned launch in Q2 2025. Early-adopter pre-order customers will get beta access 2-3 months before the public launch, giving you first access to test and provide feedback."
  },
  {
    question: "How will I access my included subscription time?",
    answer: "Once Summit launches, your account will automatically be upgraded to Premium for the duration included in your pre-order (1, 6, or 12 months). You'll receive an email with login instructions and your premium features will be immediately available."
  },
  {
    question: "What happens after my included months end?",
    answer: "After your included premium time expires, you can continue using Summit with our standard pricing (approximately £12.99/month for premium features). There's no obligation to continue, and you'll always have access to basic features."
  },
  {
    question: "Is there a refund policy?",
    answer: "Yes! We offer a 30-day no-risk guarantee. If Summit doesn't improve your learning experience within 30 days of launch, we'll provide a full refund of your pre-order. No questions asked, no hassle."
  },
  {
    question: "How can I influence the roadmap?",
    answer: "Early-adopters get exclusive access to our product development process. Advanced and Professional pre-order customers can join monthly product-shaping calls where you'll directly influence features, priorities, and the overall direction of Summit. Your feedback shapes the product."
  }
]

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Summit's early-adopter program
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Disclosure key={index} as="div" className="border border-gray-200 rounded-lg">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4 text-left text-lg font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset">
                    <span>{faq.question}</span>
                    <ChevronDownIcon
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-gray-500 transition-transform duration-200`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-6 pb-4 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Still have questions?{' '}
            <a 
              href="mailto:hello@justsummit.co" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Contact us directly
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

