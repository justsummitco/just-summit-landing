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
      // Here you would integrate with your email service
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

      {/* NEW FULL-BLEED HERO SECTION */}
      <section className="relative w-full h-screen min-h-[520px] overflow-hidden">
        {/* Full-screen background image */}
        <div className="absolute inset-0">
          <img 
            src="/headphones-hero.png" 
            alt="Just Summit AI Headphones" 
            className="w-full h-full object-cover object-center"
            style={{ objectPosition: '60% center' }}
          />
          
          {/* Gradient overlay for text contrast - left side only */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
          
          {/* Teal overlay to maintain brand colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/40 via-teal-800/20 to-transparent"></div>
        </div>

        {/* Patent Pending Badge */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
            <div className="flex items-center gap-2 text-white text-sm font-medium">
              <Award className="w-4 h-4" />
              Patent Pending Technology
            </div>
          </div>
        </div>

        {/* Main content - positioned on left side */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              {/* Main Headline */}
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                Capture every insight.
              </h1>
              
              {/* Supporting Subheadline */}
              <p className="text-xl md:text-2xl text-white/90 mb-8 font-light max-w-lg">
                AI-summarised on device — privacy-first.
              </p>
              
              {/* Primary CTA */}
              <button 
                onClick={handlePreOrder}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-xl mb-8"
              >
                Pre-Order Headphones
              </button>
              
              {/* Trust Indicators Row */}
              <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span>Privacy-First</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span>On-Device Processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>Patent Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product badges - positioned over the headphones */}
        <div className="absolute top-1/4 right-12 z-20 hidden lg:block">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-gray-800 text-sm font-medium flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            AI Powered
          </div>
        </div>
        <div className="absolute top-1/3 right-12 z-20 hidden lg:block">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-gray-800 text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            All-day Battery*
          </div>
        </div>
      </section>

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
      <section id="reserve" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Reserve Your AI Headphones</h2>
            <p className="text-xl text-gray-600">
              Secure your spot with just £49 today. Pay the remaining £250 before shipping.
            </p>
          </div>

          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-8 border border-teal-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="/headphones-side-view.png" 
                  alt="AI Headphones Side View" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              
              <div>
                <div className="urgency-indicator mb-4">
                  <TrendingUp className="w-4 h-4 mr-2 text-orange-600" />
                  <span className="text-orange-800">High demand - Reserve now to guarantee delivery</span>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                  <div className="text-2xl font-bold text-gray-900 mb-2">£299 Total</div>
                  <div className="text-gray-600 mb-4">
                    <span className="text-lg font-semibold text-teal-600">£49 today</span> + £250 before shipping
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      AI-powered audio summarization technology*
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Privacy-first on-device processing
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Memory-friendly ergonomic design
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Mobile app integration included
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Priority support & product updates
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Full refund guarantee
                    </div>
                  </div>

                  <button
                    onClick={handlePreOrder}
                    className="w-full pre-order-button large bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Reserve Now - Only £49 Today
                  </button>
                  
                  <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
                    <Lock className="w-3 h-3 mr-1" />
                    Secured by Stripe
                  </div>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Early access to product updates and beta features</p>
                  <p>• 30-day money-back guarantee</p>
                  <p>• Expected delivery: Q2 2026*</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionary Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Revolutionary Features</h2>
            <p className="text-xl text-gray-600">
              Cutting-edge technology designed for the modern knowledge worker
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Audio Summarization</h3>
              <p className="text-gray-600 text-sm">Real-time summaries of podcasts, audiobooks, and meetings*</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy-First Processing</h3>
              <p className="text-gray-600 text-sm">On-device AI designed to keep your conversations private</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Battery className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">All-Day Intelligence</h3>
              <p className="text-gray-600 text-sm">Extended battery life for continuous AI processing*</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Headphones className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Memory-Friendly Design</h3>
              <p className="text-gray-600 text-sm">Ergonomic comfort designed for extended focus sessions</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <img 
              src="/headphones-features.png" 
              alt="AI Headphones Technical Features" 
              className="max-w-2xl mx-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section id="specs" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
            <p className="text-xl text-gray-600">
              Professional-grade hardware meets cutting-edge AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI Processing</h3>
                  <p className="text-gray-600 text-sm">On-device neural processing unit for real-time audio analysis*</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Battery className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">All-day Battery Performance*</h3>
                  <p className="text-gray-600 text-sm">Extended usage with fast-charge capability*</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wifi className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Connectivity</h3>
                  <p className="text-gray-600 text-sm">Bluetooth 5.3, USB-C, 3.5mm jack compatibility</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Volume2 className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Audio Quality</h3>
                  <p className="text-gray-600 text-sm">Premium drivers with adaptive noise cancellation*</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">App Integration</h3>
                  <p className="text-gray-600 text-sm">iOS and Android companion app with cloud sync</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Headphones className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Comfort Design</h3>
                  <p className="text-gray-600 text-sm">Lightweight materials, adjustable fit, memory foam padding</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              *Specifications subject to final testing and optimization. Patent pending technology.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join the Innovation</h2>
            <p className="text-xl text-gray-600">Be Among the First - Founding Members</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">1,000+</div>
              <div className="text-gray-600">Early Supporters</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">95%</div>
              <div className="text-gray-600">Target Accuracy Rate*</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">Q2 2026</div>
              <div className="text-gray-600">Expected Delivery</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Early Supporter</div>
                  <div className="text-sm text-gray-500">Sarah M., Knowledge Worker</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "Finally, a solution for my ADHD brain! The AI summaries help me retain information from long podcasts without getting overwhelmed."
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                  <Shield className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Beta Tester</div>
                  <div className="text-sm text-gray-500">David L., Executive</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "The on-device processing gives me confidence that my private meetings stay private. Game-changing technology."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-xl text-gray-600">Born from personal experience with memory challenges</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <blockquote className="text-lg text-gray-700 mb-6">
                "After my brain injury, I struggled to retain information from audio content. I knew there had to be a better way to capture and remember what matters most."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Tom Mitchell</div>
                  <div className="text-gray-600">Founder & CEO</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center">
                <Brain className="w-8 h-8 text-teal-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900">Memory-Friendly</h3>
                  <p className="text-gray-600 text-sm">Designed for cognitive accessibility</p>
                </div>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-teal-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900">ADHD-Tested</h3>
                  <p className="text-gray-600 text-sm">Validated with neurodivergent users</p>
                </div>
              </div>
              <div className="flex items-center">
                <Shield className="w-8 h-8 text-teal-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900">Privacy-First</h3>
                  <p className="text-gray-600 text-sm">Your data stays on your device</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Don&apos;t Miss Out on Revolutionary Audio Intelligence
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Join the founding members securing their AI headphones today
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handlePreOrder}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg transition-colors flex items-center"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Reserve Now - £49 Deposit
            </button>
            
            <div className="text-center">
              {!isSubmitted ? (
                <form onSubmit={handleEmailSubmit} className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    style={{ color: '#1f2937' }}
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Join Waitlist
                  </button>
                </form>
              ) : (
                <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4 text-green-100">
                  <CheckCircle className="w-5 h-5 inline mr-2" />
                  You&apos;re on the list! We&apos;ll be in touch soon.
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-teal-200 text-sm">
            30-day money-back guarantee • Expected delivery Q2 2026 • Patent pending technology
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-4">Questions? We&apos;re Here to Help</h3>
            <p className="text-gray-400 mb-4">
              Get in touch with our team for any questions about your AI headphones
            </p>
            <a 
              href="mailto:hello@justsummit.co" 
              className="text-teal-400 hover:text-teal-300 transition-colors flex items-center justify-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              hello@justsummit.co
            </a>
            <p className="text-gray-500 text-sm mt-2">We respond within 24 hours</p>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2024 Just Summit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

