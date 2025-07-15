'use client'

import { useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          name: email.split('@')[0]
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Welcome to Genesis 50! Check your email for next steps.')
        setEmail('')

        if (typeof window !== 'undefined' && (window as any).posthog) {
          (window as any).posthog.capture('genesis_50_email_signup_success', {
            email,
            source: 'hero_section'
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
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgb(47, 91, 154), rgb(27, 51, 114))' }}>
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] -z-10" />
      <div className="relative section-padding">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              🥇 Genesis 50 Early Access Program
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Did you know 90% of what we hear is{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">
                forgotten
              </span>{' '}
              in less than a week?
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Summit ensures you're part of the 10% who put it to use. Auto-tag insights from podcasts and audiobooks—recall them instantly.
            </p>

            <form
              onSubmit={handleEmailSubmit}
              className="flex flex-col md:flex-row items-center gap-3 justify-center max-w-xl mx-auto mb-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full md:w-72 px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:shadow-[0_0_0.5rem_#fde047] transition-all"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-yellow-400 text-black font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-yellow-500 transition-colors duration-200 shadow-md flex items-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  'Join Waitlist'
                )}
              </button>
            </form>

            <p className="text-white/60 text-sm text-center mb-6">
              Get notified when we're live. No spam, ever.
            </p>

            {message && (
              <p className={`text-sm text-center ${status === 'success' ? 'text-green-300' : 'text-red-300'}`}>
                {message}
              </p>
            )}

            {/* rest of your hero content follows... */}
          </div>
        </div>
      </div>
    </section>
  )
}