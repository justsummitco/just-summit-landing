'use client'

import { StarIcon } from '@heroicons/react/24/solid'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Graduate Student with ADHD',
    content: 'Just Summit has completely transformed how I consume educational content. The 15-second summaries help me actually remember what I learn, and the spaced repetition keeps it fresh in my mind.',
    rating: 5,
    avatar: 'SM'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Product Manager',
    content: 'As someone who listens to 10+ hours of podcasts weekly, Just Summit saves me so much time. I can quickly review key insights and decide what deserves a deeper dive.',
    rating: 5,
    avatar: 'MR'
  },
  {
    name: 'Dr. Emily Chen',
    role: 'Learning Specialist',
    content: 'The science behind Just Summit is solid. Breaking down audio into structured, bite-sized pieces aligns perfectly with how our brains process and retain information.',
    rating: 5,
    avatar: 'EC'
  },
  {
    name: 'James Thompson',
    role: 'Entrepreneur',
    content: 'I was skeptical about AI summaries, but Just Summit captures the nuance and context that other tools miss. It feels like having a personal learning assistant.',
    rating: 5,
    avatar: 'JT'
  },
  {
    name: 'Lisa Park',
    role: 'Teacher & Parent',
    content: 'My teenage son with ADHD went from avoiding audiobooks to actively seeking them out. Just Summit makes learning feel achievable rather than overwhelming.',
    rating: 5,
    avatar: 'LP'
  },
  {
    name: 'David Kumar',
    role: 'Software Engineer',
    content: 'The retention analytics are incredible. I can actually see my learning progress and identify which topics need more reinforcement. Game-changer for professional development.',
    rating: 5,
    avatar: 'DK'
  }
]

export default function Testimonials() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by learners everywhere
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of people who've transformed their learning with Just Summit
          </p>
          
          {/* Overall Rating */}
          <div className="flex items-center justify-center mt-8 space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-6 h-6 text-accent-400" />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-900">4.9/5</span>
            <span className="text-gray-600">from 500+ reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-accent-400" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
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

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">98%</div>
              <div className="text-sm text-gray-600">Retention improvement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">15 sec</div>
              <div className="text-sm text-gray-600">Average summary time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">500+</div>
              <div className="text-sm text-gray-600">Happy customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">4.9★</div>
              <div className="text-sm text-gray-600">Average rating</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to transform your learning?
            </h3>
            <p className="text-gray-600 mb-6">
              Join the community of learners who've discovered the power of structured audio learning.
            </p>
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary text-lg px-8 py-4"
            >
              Start your journey
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

