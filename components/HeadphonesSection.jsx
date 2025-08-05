'use client'

import { useState } from 'react'
import StripeCheckout from './StripeCheckout'

export default function HeadphonesSection() {
  return (
    <section id="headphones" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full mb-6">
            🚀 Ships Q2 2026
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI Headphones
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Privacy-first AI transcription and summaries. Process everything on-device. 
            Never send your conversations to the cloud.
          </p>
          
          {/* Hero Image */}
          <div className="relative max-w-2xl mx-auto">
            <img 
              src="/headphones-hero.png" 
              alt="Just Summit AI Headphones"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Video Showcase */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            See It In Action
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <video 
                className="w-full h-auto rounded-xl"
                autoPlay 
                muted 
                loop 
                playsInline
                poster="/headphones-hero.png"
              >
                <source src="/headphones-showcase.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-center text-gray-600 mt-4">
              Experience the future of AI-powered audio technology
            </p>
          </div>
        </div>

        {/* Product Gallery */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="text-center">
            <img 
              src="/headphones-side-view.png" 
              alt="Premium Design"
              className="w-full h-64 object-cover rounded-xl shadow-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Design</h3>
            <p className="text-gray-600">Sleek, professional design with premium materials and comfortable fit for all-day wear.</p>
          </div>
          <div className="text-center">
            <img 
              src="/headphones-features.png" 
              alt="AI Technology"
              className="w-full h-64 object-cover rounded-xl shadow-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Technology</h3>
            <p className="text-gray-600">Advanced on-device AI processing ensures your conversations stay private and secure.</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time AI Transcription</h3>
            <p className="text-gray-600">Instantly convert speech to text with 95%+ accuracy</p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy-First Processing</h3>
            <p className="text-gray-600">All AI processing happens on-device, never in the cloud</p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">30-Hour Battery Life</h3>
            <p className="text-gray-600">All-day usage with fast charging capabilities</p>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pre-Order Now
          </h2>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-200">
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                Recommended
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Headphones</h3>
              <p className="text-gray-600 mb-6">Complete hardware package with all AI features</p>
              
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-gray-900">£299</span>
                <span className="text-gray-600 ml-2">full price</span>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Real-time AI transcription</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Premium noise cancellation</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">30-hour battery life</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Bluetooth 5.3 connectivity</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Mobile app included</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Privacy-first, on-device processing</span>
              </div>
            </div>

            {/* Pre-Order Button */}
            <StripeCheckout 
              productType="headphones"
              tier="standard"
              price={29900}
              depositAmount={4900}
            />
          </div>
        </div>

        {/* Deposit Information */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">How Pre-Orders Work</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="font-medium text-blue-900 mb-2">1. Secure Your Spot</div>
                <p className="text-blue-700">Pay just £49 deposit to reserve your headphones</p>
              </div>
              <div>
                <div className="font-medium text-blue-900 mb-2">2. Development Updates</div>
                <p className="text-blue-700">Receive regular progress updates throughout development</p>
              </div>
              <div>
                <div className="font-medium text-blue-900 mb-2">3. Final Payment</div>
                <p className="text-blue-700">We'll charge the remaining balance 30 days before shipping in Q2 2026</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-blue-700 text-sm">
                <strong>Full refund available</strong> anytime before production begins. No questions asked.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
