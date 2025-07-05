'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "What is Genesis 50?",
    answer: "Genesis 50 is our founding pre-sale group. Only 50 will ever exist, with a 20% lifetime software discount and exclusive perks. No future cohort—including Kickstarter backers—will ever get these benefits."
  },
  {
    question: "How do I keep my discount?",
    answer: "Your account is tagged as genesis_50. The system automatically applies your discount on every renewal."
  },
  {
    question: "What happens when Genesis 50 slots sell out?",
    answer: "The offer is removed site-wide and new visitors see a 'Sold Out – join wait-list' page. Future cohorts will have different pricing and perks."
  },
  {
    question: "Why not use Notion or Otter?",
    answer: "Notion stores; Summit remembers. Auto‑tagging and recall speed mean zero manual filing."
  },
  {
    question: "When will the app launch?",
    answer: "Private beta in Q4 2025; public launch to follow."
  },
  {
    question: "What platforms are supported?",
    answer: "Mobile (Android/iOS) and in-car integrations at launch."
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
            Everything you need to know about the Genesis 50 program
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
