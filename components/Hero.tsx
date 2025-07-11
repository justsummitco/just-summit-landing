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
        setMessage('Welcome to Genesis 50! Check your email for next steps.')
        setEmail('')
        
        // Track successful signup
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
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgb(47, 91, 154) 0%, rgb(37, 71, 134) 50%, rgb(27, 51, 114) 100%)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] -z-10" />
      
      <div className="relative section-padding">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              🥇 Genesis 50 Early Access Program
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Did you know 90% of what we hear is{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">
                forgotten....
              </span>{' '}
              in less than a week?
            </h1>

            {/* Sub-headline */}
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Summit ensures you're part of the 10% who put it to use. Auto-tag insights from podcasts and audiobooks—recall them instantly.
            </p>

            {/* Social Proof Logos */}
            <div className="flex justify-center items-center space-x-8 mb-8 opacity-70">
              <div className="text-white/80 text-sm font-medium px-4 py-2 bg-white/10 rounded-lg border border-white/20">
                Product Hunt Upcoming
              </div>
              <div className="text-white/80 text-sm font-medium px-4 py-2 bg-white/10 rounded-lg border border-white/20">
                London AI Hub
              </div>
              <div className="text-white/80 text-sm font-medium px-4 py-2 bg-white/10 rounded-lg border border-white/20">
                Techstars Mentor Network
              </div>
            </div>

            {/* Problem Statement */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20 max-w-3xl mx-auto">
              <p className="text-white/90 text-lg">
                Most notes disappear into forgotten folders. When you finally need that quote or idea, it's faster to re‑search the web than your own vault.
              </p>
            </div>

            {/* Solution Highlights */}
            <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-white font-semibold mb-2">Auto‑tags by topic</div>
                <div className="text-white/80 text-sm">AI categorizes your notes automatically</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-white font-semibold mb-2">One‑tap contextual recall</div>
                <div className="text-white/80 text-sm">Find exactly what you need instantly</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-white font-semibold mb-2">Learns what you value</div>
                <div className="text-white/80 text-sm">Gets smarter with every note you save</div>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="max-w-md mx-auto mb-8 animate-slide-up">
              <button
                onClick={scrollToPricing}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-xl"
              >
                Pre-Order Genesis 50
              </button>
              <p className="text-white/70 text-sm mt-3">
                Only 50 slots available • 20% lifetime discount • Exclusive perks
              </p>
            </div>

            {/* Credibility Statement */}
            <div className="text-center text-white/80 animate-fade-in">
              <p className="text-sm mb-4">Trained on 12M+ public documents • GDPR-ready • SOC 2 in progress</p>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-8">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Press the Summit button while listening</h3>
                <p className="text-white/80">Capture insights from podcasts and audiobooks</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Summit AI captures, tags, and organizes key insights</h3>
                <p className="text-white/80">Automatic organization by your interests</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Search and get instant answers with full context</h3>
                <p className="text-white/80">Knowledge at your fingertips</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

