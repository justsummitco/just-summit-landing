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

      {/* NEW FULL-BLEED HERO SECTION WITH EDGE-TO-EDGE IMAGE */}
      <section className="relative w-full h-screen min-h-[520px] overflow-hidden">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/final_hero_image_complete.png)'
          }}
        />
        
        {/* Optional overlay for better text contrast if needed */}
        <div className="absolute inset-0 bg-black/5" />

        {/* Content positioned over the image - Hidden since it's in the image */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              {/* Screen reader content only */}
              <div className="sr-only">
                <h1>Capture every insight.</h1>
                <p>AI-summarised on device — privacy-first</p>
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

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Volume2 className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Audio Quality</h3>
                  <p className="text-gray-600 text-sm">High-fidelity drivers with noise cancellation</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Privacy & Security</h3>
                  <p className="text-gray-600 text-sm">End-to-end encryption with local processing</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">App Integration</h3>
                  <p className="text-gray-600 text-sm">iOS and Android companion apps included</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Build Quality</h3>
                  <p className="text-gray-600 text-sm">Premium materials with durable construction</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Support</h3>
                  <p className="text-gray-600 text-sm">Dedicated customer support and regular updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-xl text-gray-600">
              Building the future of intelligent audio
            </p>
          </div>

          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="text-lg leading-relaxed mb-6">
              At Just Summit, we believe that technology should enhance human capability, not replace it. 
              Our team of audio engineers and AI researchers came together with a simple mission: to help 
              people capture and retain the most important information from their daily audio experiences.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              After years of research and development, we've created the world's first headphones with 
              built-in AI summarization. Our patent-pending technology processes audio locally on your 
              device, ensuring your privacy while delivering unprecedented insights from meetings, 
              podcasts, lectures, and calls.
            </p>
            <p className="text-lg leading-relaxed">
              We're not just building headphones – we're creating a new category of intelligent audio 
              devices that will transform how we learn, work, and communicate.
            </p>
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the latest updates on development progress and exclusive early access opportunities
          </p>
          
          {!isSubmitted ? (
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </button>
            </form>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-center justify-center text-green-800">
                <CheckCircle className="w-5 h-5 mr-2" />
                Thanks for subscribing! We'll keep you updated.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Audio Experience?</h2>
          <p className="text-xl text-teal-100 mb-8">
            Join the revolution in intelligent audio technology
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handlePreOrder}
              className="bg-white text-teal-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Reserve Now - £49 Today
            </button>
            <button 
              onClick={handlePreOrder}
              className="bg-orange-500 text-white font-semibold px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Full Payment - £299
            </button>
          </div>
          
          <p className="text-teal-200 text-sm mt-6">
            30-day money-back guarantee • Free worldwide shipping • Expected delivery Q2 2026*
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src="/just-summit-logo.png" alt="Just Summit" className="h-8 w-auto mb-4" />
              <p className="text-gray-400 text-sm">
                The world's first AI-powered audio summarization headphones
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection('specs')} className="hover:text-white transition-colors">Specifications</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection('story')} className="hover:text-white transition-colors">About Us</button></li>
                <li><a href="https://www.justsummit.co/blog" className="hover:text-white transition-colors">Blog</a></li>
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
            <p className="mt-2">*Features and specifications subject to change. Expected delivery dates are estimates.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

