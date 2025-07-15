'use client'

import { StarIcon } from '@heroicons/react/24/solid'

const testimonials = [
  {
    content: "It's great to see a data-driven approach to solving this problem. The potential to help people with memory challenges, including those with Alzheimer's, is significant. This could be a real step forward.",
    author: "Dr. Tom s P",
    role: "PhD in Alzheimer's Research, Advisor",
    rating: 5,
  },
  {
    content: "I've always wanted something like this and am happy to be part of bringing it to life.",
    author: "Jordan K.",
    role: "Early Adopter",
    rating: 5,
  },
  {
    content: "Finally, a tool that understands how knowledge workers actually think. The auto-tagging could save me hours every week.",
    author: "Maya U.",
    role: "Research Analyst",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Early Users Say
          </h2>
          <p className="text-xl text-gray-600">
            Feedback from researchers, advisors, and early adopters 👀...
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200"
            >
              {/* Stars */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-gray-200 pt-4">
                <div className="font-semibold text-gray-900">
                  {testimonial.author}
                </div>
                <div className="text-sm text-gray-600">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
