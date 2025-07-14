'use client'

import { useState } from 'react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Welcome to the Just Summit community!')
        setEmail('')
        setName('')
        
        // Track successful signup
        if (typeof window !== 'undefined' && (window as any).posthog) {
          (window as any).posthog.capture('email_signup_success', {
            email,
            name,
            source: 'landing_page'
          })
        }
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please check your connection and try again.')
    }
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="container-max">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Stay in the loop
          </h2>
          <p className="text-xl text-primary-100 mb-12 max-w-2xl mx-auto">
            Get early access to new features, learning tips, and exclusive content 
            designed for ADHD brains and audio learners.
          </p>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Enter your first name"
                    required
                    disabled={status === 'loading'}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                    required
                    disabled={status === 'loading'}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                data-testid="main-cta"
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                {status === 'loading' ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Subscribing...
                  </div>
                ) : (
                  'Join the community'
                )}
              </button>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="flex items-center justify-center text-green-600 bg-green-50 p-4 rounded-lg">
                  <CheckIcon className="w-5 h-5 mr-2" />
                  {message}
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center justify-center text-red-600 bg-red-50 p-4 rounded-lg">
                  <XMarkIcon className="w-5 h-5 mr-2" />
                  {message}
                </div>
              )}
            </form>

            {/* Benefits */}
            <div className="mt-8 grid md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-center">
                <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                Early access to features
              </div>
              <div className="flex items-center justify-center">
                <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                Learning tips & strategies
              </div>
              <div className="flex items-center justify-center">
                <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                No spam, unsubscribe anytime
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <p className="text-primary-100 mb-4">
              Join 2,500+ subscribers who get our weekly insights
            </p>
            <div className="flex justify-center items-center space-x-8 text-primary-200">
              <div className="text-sm">📧 Weekly newsletter</div>
              <div className="text-sm">•</div>
              <div className="text-sm">🧠 ADHD-friendly tips</div>
              <div className="text-sm">•</div>
              <div className="text-sm">🚀 Product updates</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

