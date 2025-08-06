'use client';

import React, { useState } from 'react';
import { 
  Headphones, 
  Brain, 
  Shield, 
  Battery, 
  Smartphone, 
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Zap,
  Award,
  Users,
  Clock,
  Wifi,
  Volume2,
  Mail,
  CreditCard,
  Lock,
  TrendingUp
} from 'lucide-react';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Integrate with your email service here
      console.log('Email submitted:', email);
    }
  };

  const handlePreOrder = () => {
    // Replace with your actual Stripe payment link
    window.open('https://buy.stripe.com/test_your_payment_link', '_blank');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src="/just-summit-logo.png" alt="Just Summit" className="h-8 w-auto" />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-teal-600 transition-colors">Features</button>
              <button onClick={() => scrollToSection('specs')} className="text-gray-700 hover:text-teal-600 transition-colors">Specs</button>
              <a href="https://www.justsummit.co/blog" className="text-gray-700 hover:text-teal-600 transition-colors">Blog</a>
              <button onClick={() => scrollToSection('story')} className="text-gray-700 hover:text-teal-600 transition-colors">Our Story</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Urgency Banner */}
      <div className="urgency-banner mt-16">
        <Clock className="w-4 h-4 mr-2" />
        Early Bird Pricing: Save £100 - Limited Time Only
      </div>

      {/* Hero Section */}
      <section className="relative pt-8 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {/* Patent Pending Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium mb-6">
              <Award className="w-4 h-4 mr-2" />
              Patent Pending Technology
            </div>
            {/* HERO IMAGE */}
            <img 
              src="/summit-hero.png" 
              alt="World's First On-device AI Summarization Headphones" 
              className="mx-auto mb-6 rounded-xl shadow-lg max-w-3xl w-full object-cover"
              style={{ maxHeight: 380 }}
            />
            {/* Supporting Text */}
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Never miss important information again. Transform hours of audio into actionable insights.
            </p>
            {/* Email Capture */}
            <div className="max-w-md mx-auto mb-8">
              {!isSubmitted ? (
                <form onSubmit={handleEmailSubmit} className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    style={{ color: '#1f2937' }}
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
                  >
                    Get Early Access
                  </button>
                </form>
              ) : (
                <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4 text-green-100">
                  <CheckCircle className="w-5 h-5 inline mr-2" />
                  Thank you! You&apos;ll be among the first to know when we launch.
                </div>
              )}
            </div>
            <p className="text-teal-200 text-sm">
              Join 1,000+ innovators securing their spot. Early bird pricing ends soon.
            </p>
          </div>
          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-8 mb-12 text-teal-200">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              <span className="text-sm">Privacy-First</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              <span className="text-sm">On-Device Processing</span>
            </div>
            <div className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              <span className="text-sm">Patent Pending</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- EVERYTHING BELOW THIS LINE IS UNCHANGED --- */}

      {/* Video Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">See It In Action</h2>
          <p className="text-xl text-gray-600 mb-8">
            Watch how AI-powered summarization transforms your audio experience
          </p>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <video 
              controls 
              poster="/headphones-hero.png"
              className="w-full h-auto"
            >
              <source src="/headphones-showcase.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/90 rounded-full p-4">
                <Play className="w-8 h-8 text-teal-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reserve Section */}
      {/* ...rest of your original code, unchanged... */}

      {/* Features, Specs, Social Proof, Story, CTA, Support, Footer */}
      {/* ...all sections below remain exactly as in your original code... */}
    </div>
  );
}