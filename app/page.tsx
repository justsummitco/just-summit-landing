'use client'

import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your email capture logic here
    console.log('Email submitted:', email)
    setIsSubmitted(true)
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail('')
    }, 3000)
  }

  const handlePreOrder = () => {
    // Replace with your actual Stripe payment link
    window.open('https://buy.stripe.com/your_actual_payment_link', '_blank')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="relative z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src="/just-summit-logo.png" alt="Just Summit" className="h-8 w-auto" />
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-teal-600 transition-colors">Features</a>
              <a href="#specs" className="text-gray-700 hover:text-teal-600 transition-colors">Specs</a>
              <a href="#blog" className="text-gray-700 hover:text-teal-600 transition-colors">Blog</a>
              <a href="#story" className="text-gray-700 hover:text-teal-600 transition-colors">Our Story</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - New Edge-to-Edge Design */}
      <section className="relative w-full h-screen min-h-[520px] overflow-hidden">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/final_hero_image_complete.png)'
          }}
        />
        
        {/* Optional overlay for better text contrast if needed */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Content positioned over the image */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              {/* This content is already in the image, but keeping for accessibility */}
              <div className="sr-only">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                  Capture every insight.
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 font-light max-w-lg">
                  AI-summarised on device — privacy-first
                </p>
                <button 
                  onClick={handlePreOrder}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200"
                  aria-label="Pre-order Just Summit AI Headphones"
                >
                  Pre-Order Headphones
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Clickable area for the CTA button (positioned over the button in the image) */}
        <button
          onClick={handlePreOrder}
          className="absolute bottom-[25%] left-[3%] w-[280px] h-[60px] bg-transparent hover:bg-white/10 transition-all duration-200 rounded-lg z-20"
          aria-label="Pre-order Just Summit AI Headphones"
        />
      </section>

      {/* Video Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">See It In Action</h2>
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-600">Product Demo Video</p>
              <p className="text-sm text-gray-500 mt-2">Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reserve Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Reserve Your Headphones</h2>
          <p className="text-xl text-gray-600 mb-12">Join the waitlist for early access and exclusive pricing</p>
          
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 text-white mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-4">Pre-Order Now</h3>
                <p className="text-teal-100 mb-6">Secure your Just Summit AI Headphones with early bird pricing</p>
                <div className="space-y-2 text-sm text-teal-100">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Early bird pricing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Priority shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Exclusive updates</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">£299</div>
                <div className="text-teal-200 text-sm mb-6">Early Bird Price</div>
                <button 
                  onClick={handlePreOrder}
                  className="bg-white text-teal-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
                >
                  Reserve Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Revolutionary Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of audio with AI-powered summarization that transforms how you consume information
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Summarization</h3>
              <p className="text-gray-600">
                Advanced on-device AI processes audio in real-time, extracting key insights and actionable information from meetings, podcasts, and calls.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Privacy-First Design</h3>
              <p className="text-gray-600">
                All processing happens locally on your device. Your conversations and data never leave your headphones, ensuring complete privacy and security.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">All-Day Battery</h3>
              <p className="text-gray-600">
                Up to 30 hours of continuous use with AI processing enabled. Quick charge technology provides 5 hours of use with just 15 minutes of charging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
            <p className="text-xl text-gray-600">
              Engineered for performance, designed for comfort
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Audio Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Driver Size</span>
                  <span className="font-medium">40mm Dynamic</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frequency Response</span>
                  <span className="font-medium">20Hz - 20kHz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Impedance</span>
                  <span className="font-medium">32Ω</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sensitivity</span>
                  <span className="font-medium">105dB SPL</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">AI & Connectivity</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">AI Processor</span>
                  <span className="font-medium">Custom Neural Chip</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bluetooth</span>
                  <span className="font-medium">5.3 with aptX HD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Battery Life</span>
                  <span className="font-medium">30hrs (AI on)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Charging</span>
                  <span className="font-medium">USB-C Fast Charge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-xl text-gray-600">
              Building the future of intelligent audio
            </p>
          </div>

          <div className="prose prose-lg mx-auto text-gray-600">
            <p>
              At Just Summit, we believe that technology should enhance human capability, not replace it. 
              Our team of audio engineers and AI researchers came together with a simple mission: to help 
              people capture and retain the most important information from their daily audio experiences.
            </p>
            <p>
              After years of research and development, we've created the world's first headphones with 
              built-in AI summarization. Our patent-pending technology processes audio locally on your 
              device, ensuring your privacy while delivering unprecedented insights from meetings, 
              podcasts, lectures, and calls.
            </p>
            <p>
              We're not just building headphones – we're creating a new category of intelligent audio 
              devices that will transform how we learn, work, and communicate.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Capture Every Insight?</h2>
          <p className="text-xl text-teal-100 mb-8">
            Join thousands of early adopters who are revolutionizing how they consume audio content
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handlePreOrder}
              className="bg-white text-teal-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Pre-Order Now - £299
            </button>
            <button 
              onClick={handlePreOrder}
              className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Reserve with Deposit - £49
            </button>
          </div>
          
          <p className="text-teal-200 text-sm mt-4">
            30-day money-back guarantee • Free shipping worldwide
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src="/just-summit-logo.png" alt="Just Summit" className="h-8 w-auto mb-4" />
              <p className="text-gray-400 text-sm">
                The world's first AI-powered summarization headphones
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#specs" className="hover:text-white transition-colors">Specifications</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#story" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Patents</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Just Summit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

