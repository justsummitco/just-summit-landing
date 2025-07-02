'use client'

import { useState } from 'react'
import Image from 'next/image'
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
          name: email.split('@')[0] // Use email prefix as name fallback
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Welcome to early access! Check your email for next steps.')
        setEmail('')
        
        // Track successful signup
        if (typeof window !== 'undefined' && (window as any).posthog) {
          (window as any).posthog.capture('hero_email_signup_success', {
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
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgb(47, 91, 154) 0%, rgb(37, 71, 134) 50%, rgb(27, 51, 114) 100%)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] -z-10" />
      
      <div className="relative section-padding">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Built by people who understand memory struggles
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              INSTANTLY REMEMBER WHAT YOU{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                HEAR
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Capture, summarise, and revisit key insights from audiobooks & podcasts — built with our early-adopter community.
            </p>

            {/* Founder credibility */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20 max-w-3xl mx-auto">
              <p className="text-white/90 text-lg italic">
                "In 2014, a car accident left me in a coma with severe memory loss. During recovery, I discovered what ADHD brains have always known: 
                traditional learning doesn't work for us. Summit uses the exact techniques that helped me rebuild my memory."
              </p>
              <p className="text-white font-semibold text-lg mt-3">— Tom, Summit Co-Founder</p>
            </div>

            {/* Email Capture Form */}
            <div className="max-w-md mx-auto mb-8 animate-slide-up">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                  Join 1,000+ People Taking Control of Their Learning
                </h3>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  Get early access + save 40% on pre-order pricing
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors text-center"
                    required
                    disabled={status === 'loading'}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    {status === 'loading' ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Joining...
                      </div>
                    ) : (
                      'Pre-Order Now — Limited Spots'
                    )}
                  </button>
                </form>
                
                {/* Status Messages */}
                {status === 'success' && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 text-sm text-center font-medium">
                      {message}
                    </p>
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm text-center">
                      {message}
                    </p>
                  </div>
                )}
                
                <p className="text-xs text-gray-500 text-center mt-3">
                  ✓ No spam ✓ ADHD-friendly tips ✓ Exclusive pre-order pricing
                </p>
              </div>
            </div>

            {/* Secondary CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up">
              <button
                onClick={scrollToPricing}
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center group"
              >
                View Pricing
                <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="text-primary-600 hover:text-primary-700 font-medium text-lg px-4 py-2 underline">
                Watch demo
              </button>
            </div>

            {/* Social Proof */}
            <div className="text-center text-gray-500 animate-fade-in">
              <p className="text-sm mb-4">Trusted by 1,000+ people who struggle with information overload</p>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                <div className="text-xs font-medium">★★★★★ 4.9/5</div>
                <div className="text-xs">•</div>
                <div className="text-xs font-medium">500+ pre-orders</div>
                <div className="text-xs">•</div>
                <div className="text-xs font-medium">ADHD-tested</div>
              </div>
            </div>
          </div>

          {/* Hero Image/Video Placeholder */}
          <div className="mt-16 max-w-5xl mx-auto animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800">
              <div className="aspect-video bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-lg font-medium">Watch Just Summit in Action</p>
                  <p className="text-sm opacity-80 mt-1">See how AI summaries boost retention</p>
                </div>
              </div>
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-primary-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

