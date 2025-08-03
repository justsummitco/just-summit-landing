'use client'

import { StarIcon } from '@heroicons/react/24/solid'

const testimonials = [
  {
    name: 'Maya U.',
    role: 'Cognitive Science Researcher',
    content: 'Just Summit surfaces my old research notes in seconds. Game‑changer for my PhD.',
    rating: 5,
    avatar: 'MU'
  },
  {
    name: 'Jordan K.',
    role: 'Early Adopter',
    content: 'I\'ve always wanted something like this and am happy to be part of bringing it to life.',
    rating: 5,
    avatar: 'JK'
  }
]

export default function Testimonials() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by knowledge workers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Early feedback from researchers, product managers, and knowledge professionals
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-accent-400" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed text-lg">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to shape the future of learning?
            </h3>
            <p className="text-gray-600 mb-6">
              Join the Genesis 50 and help us build the knowledge management tool you've always wanted.
            </p>
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-xl"
            >
              Pre-Order Genesis 50
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

